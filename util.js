import tz from 'timezone';

export const seconds = 1000
export const minutes = 60*seconds
export const hours = 60*minutes
export const days = 24*hours

export function formatHours (hours) {
    if(!hours) return '--'
    const roundedMinutes = Math.floor(hours*60)
    const wholeHours = (roundedMinutes - roundedMinutes % 60)/60
    return `${wholeHours}hrs ${Math.floor(hours *60) % 60}min`
}

export function fractionalHoursToHoursMinutes (hours) {
    const totalMinutes = Math.floor(hours * 60)
    const minutes = totalMinutes % 60
    const wholeHours = (totalMinutes - minutes) / 60
    return `${wholeHours < 10 ? '0'+wholeHours : wholeHours}:${minutes < 10 ? '0'+minutes : minutes}`
}

export const calculateSunriseSunset = ({lat, lng}, date) => {
    const { sin, cos, tan,  acos, PI } = Math
    const degrees = PI / 180
    const radians = 180 / PI
    const dayOfYear = Number.parseInt(tz(date, "%j"))
    const hour = 0
    const timeOffset = date.getTimezoneOffset()
    
    const fracYear = 2*PI / 365 * (dayOfYear -1 + (hour - 12)/24)

    const equationOfTime = 229.18 * (7.5e-5 
                                  + 1.868e-3 * cos(fracYear) 
                                  - 3.2e-2 * sin(fracYear) 
                                  - 1.4615e-2 * cos(2*fracYear) 
                                  - 4.0849e-2 * sin(2*fracYear)
                                  )
    const declination = 6.918e-3 
                      - 3.99912e-1 * cos(fracYear) 
                      + 7.0257e-2 * sin(fracYear) 
                      - 6.758e-3 * cos(2*fracYear) 
                      + 9.07e-4 * sin(2*fracYear) 
                      - 2.697e-3 * cos(3*fracYear) 
                      + 1.48e-3 * sin(3*fracYear)
    const hourAngle = acos(
      cos(90.833*degrees) 
      / (cos(lat*degrees) * cos(declination)) 
      - (tan(lat*degrees) * tan(declination))
    )

    const sunrise = ((720 - 4 * (lng + hourAngle*radians) - equationOfTime) - timeOffset)/60
    const sunset = ((720 - 4 * (lng - hourAngle*radians) - equationOfTime) - timeOffset)/60

    return { sunrise, sunset }
} 