
const getDate = ( dateMilliseconds ) => {
  let date = new Date(dateMilliseconds)

  let day = date.getDate()
  day = (day < 10) ? '0' + day : day

  let month = date.getMonth() + 1
  month = (month < 10) ? '0' + month : month

  let year = date.getFullYear() % 100
  year = (year < 10) ? '0' + year : year

  let minutes = parseInt((dateMilliseconds / (1000 * 60)) % 60)
  minutes = (minutes < 10) ? '0' + minutes : minutes

  let hours = parseInt((dateMilliseconds / (1000 * 60 * 60)) % 24)
  hours = (hours < 10) ? '0' + hours : hours

  return day + '.' + month + '.' + year + " at " + hours + ":" + minutes
}

export default getDate