import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity} from 'react-native';
import React from "react";
import * as Location from 'expo-location';
import { days, fractionalHoursToHoursMinutes, calculateSunriseSunset } from './util'
import { TimeTables } from './TimeTables';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native'
import { buttonStyle, buttonTextStyle, titleStyle } from './styles'

const NavButton = ({direction, handleNav}) => {

  
  const data = {
    text: direction == 'next' ? 'Next >' : '< Previous',
    shift: direction == 'next' ? 1 : -1,
    align: direction == 'next' ? 'right' : 'left'
  }
  return (
  <TouchableOpacity 
    title={direction}
    onPress={()=>handleNav(data.shift)} 
    style={buttonStyle}>
      <Text style={{textAlign: data.align, ...buttonTextStyle}}>
        {data.text}
      </Text>
    </TouchableOpacity>
  )
}


class App extends React.Component {
  constructor (props){
    super(props);
    this.onObtainLocation = this.onObtainLocation.bind(this)
    this.handleNav = this.handleNav.bind(this)
    
    const window = 240*days
    const defaultTimeRange = [Date.now()-window/2, Date.now()+3*window/2]
    const initialLocation = { lat: 35.835, lng: -78.783 }
    const series = this.generateSunSeries(initialLocation, defaultTimeRange)
    
    this.state = { 
      timeRange: defaultTimeRange,
      location: initialLocation,
      series
    }
    this.getSolstice()
    this.getEquinox()
  }
  async componentDidMount () {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('location not granted')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    this.onObtainLocation(location)
  }
  onObtainLocation ({ coords }){
    const location = { lat: coords.latitude, lng: coords.longitude}
    const sunSeries = this.generateSunSeries(location, this.state.timeRange)
    this.setState({ sunSeries, location })
    this.getSolstice()
    this.getEquinox()
  }
  handleNav () {
    return true // TODO: update current date
  }
  formatRelativeTicks (d) {
    if(!d) return 'None'
    const delta = (d - Date.now())
    return `${Math.floor(delta/days)} d` 
  } 
  generateSunSeries ({lat, lng}, timeRange) {
    const dateArray = []
    for(let currentDate = timeRange[0]; currentDate < timeRange[1]; currentDate += 1*days) {
      dateArray.push(new Date(currentDate))
    }
    return dateArray.map(date => {
      const { sunrise, sunset } = calculateSunriseSunset({lat, lng}, date)
      return { date, sunrise, sunset }
    })
  }
  getHoursOfDaylight () {
    return this.state.series.map(({ date, sunrise, sunset }) => {
      return {date, hours: sunrise - sunset}
    })
  }
  getSolstice() { 
    const hoursArray = this.getHoursOfDaylight()
    const {date: longestDay} = hoursArray.indexOf(Math.max(hoursArray))
    const {date: shortestDay} = hoursArray.indexOf(Math.min(hoursArray))
    return { summer: longestDay, winter: shortestDay }
  }
  getEquinox () {
    const hoursArray = this.getHoursOfDaylight()
    const eps = 0.005
    const equinoxes = []
    for(let {date, hours} of hoursArray) {
      if(Math.abs(hours - 12) < eps) equinoxes.push(date)
    }
    return equinoxes
  }
  render() {
    const todaysDate = (new Date()).setHours(0,0,0,0)
    const { sunrise, sunset } = this.state.series.find(({date}) => {
      return date.setHours(0,0,0,0) == todaysDate
    })
    const midday = (sunset - sunrise)/2 + sunrise
    const now = new Date()
    const nowHours = now.getHours() + now.getMinutes()/60 + now.getSeconds()/(60*60)
    const remainingHours = sunset > nowHours ? sunset - nowHours : 0
    const riseLabel = fractionalHoursToHoursMinutes(sunrise)
    const middayLabel = fractionalHoursToHoursMinutes(midday)
    const setLabel = fractionalHoursToHoursMinutes(sunset-12)
    const hoursOfDaylight = (sunset - sunrise);
    
    return (
    <ScrollView style={{padding: '5%', backgroundColor: '#151d30', height: '100%' }}>
      <Text style={{ fontSize: 32, textAlign: 'center'}}>🌞</Text>
      <Text style={titleStyle}>Sunsettr</Text>
      <TimeTables {...{
        location: this.state.location,
        hoverDate: new Date(),
        riseLabel, 
        middayLabel, 
        setLabel, 
        hoursOfDaylight, 
        remainingHours
        }}/>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 15 }}>
            <NavButton direction='previous' handleNav={this.handleNav}/>
            <TouchableOpacity 
              style={{...buttonStyle, textAlign: 'center', borderBottom: '5px solid grey'}} 
              onPress={()=>this.setState({tracker: new Date()})}
            >
              <Text style={buttonTextStyle}>Today</Text>
            </TouchableOpacity>
            <NavButton direction='next' handleNav={this.handleNav}/>
          </View>
      <View style={{width: '100%', border: '1px solid black', overflow: 'hidden'}}>
        <VictoryChart style={{background: { fill: 'steelblue' }}}>           
          <VictoryLine
            style={{
              data: { stroke: "red", strokeWidth: 2 },
              labels: { angle: -90, fill: "red", fontSize: 20 }
            }}
            x={() => todaysDate}
          />
          <VictoryAxis tickCount={24} dependentAxis domain={[0,24]} style={{ axis: { stroke: 'white'}, grid: { stroke: 'grey', strokeDasharray: 2 }, tickLabels: { fontSize: 8, stroke: 'none', fill: 'white'} }}/>
          <VictoryAxis tickCount={12} tickFormat={x => (new Date(x)).toLocaleString('default', { month: 'short'})} style={{axis: { stroke: 'white'}, grid: { stroke: 'grey', strokeDasharray: 4}, tickLabels: { fontSize: 8, stroke: 'none', fill: 'white'} }}/>
          <VictoryLine style={{data: { strokeWidth: 1, stroke: 'blue' }}} data={this.state.series} x={'date'} y={'sunrise'}/>
          <VictoryLine style={{data: { strokeWidth: 1, stroke: 'orange'}}} data={this.state.series} x={'date'} y={'sunset'}/>
        </VictoryChart>
        </View>
      </ScrollView>
    );
  }
}

export default App;