import { ViewStyle, TextStyle } from 'react-native';

export const buttonStyle: ViewStyle = { 

    height: 60,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto', 
    borderBottomWidth: 2,
    borderBottomColor: 'steelblue',
    backgroundColor: '#101c24',
  };
  
export const buttonTextStyle: TextStyle = {
    color: 'white',
    padding: 15,
    fontFamily: 'monospace',
    fontSize: 18,
    textAlign: 'left', 
  }
  
export const h2Style: TextStyle = { 
    padding: 15,
    borderWidth: 1,
    backgroundColor: '#101c24',
    borderColor: 'steelblue',
    borderLeftWidth: 5,
    color: 'white',
    borderRadius: 5,
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'monospace'
  }

export const titleStyle: TextStyle = { 
    textAlign: 'center',
    padding: 15,
    color: 'white',
    marginBottom: 10,
    fontSize: 28,
    fontFamily: 'monospace'
  }
  