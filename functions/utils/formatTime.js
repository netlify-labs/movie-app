
export default function formatTime(dateObj) {
  var hour = dateObj.getHours()
  var minute = dateObj.getMinutes()
  var amPM = (hour > 11) ? 'pm' : 'am'
  if (hour > 12) {
    hour -= 12
  } else if (hour == 0) {
    hour = '12'
  }
  if (minute < 10) {
    minute = `0${minute}`
  }
  return `${hour}:${minute} ${amPM}`
}
