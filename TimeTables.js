import { formatHours } from "./util"
import { View, Text } from 'react-native';
import { h2Style } from "./styles";


export const TimeTables = ({
    hoverDate, 
    riseLabel, 
    middayLabel, 
    setLabel, 
    hoursOfDaylight, 
    remainingHours, location
}) => {
    return (
    <View>
    <Text style={{ ...h2Style }}>
    🌎 { `Lat: ${Number(location.lat).toFixed(2)}, Lon: ${Number(location.lng).toFixed(2)}` }
    </Text>
    <Text style={{ ...h2Style }}>
    📅 Date: {hoverDate.getMonth() + 1}/{hoverDate.getDate()}/{hoverDate.getFullYear()}
    </Text>
    <Text style={{ ...h2Style }}>
       🌞 Sunrise: {riseLabel}AM
    </Text>
    <Text style={{ ...h2Style }}>
      🌤 Midday: {middayLabel}
    </Text>
    <Text style={{ ...h2Style}}>
    🌇 Sunset: {setLabel}PM
    </Text>
    <Text style={{ ...h2Style }}>
        ⏰ Daylight Hours: { formatHours(hoursOfDaylight) }
    </Text>
    <Text style={{ ...h2Style }}>
    ⌚ Remaining Hours: {formatHours(remainingHours)}
    </Text>
    </View>
    )
    }