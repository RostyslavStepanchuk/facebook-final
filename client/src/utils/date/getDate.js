import moment from 'moment'

export const getDate = (dateMilliseconds) => {
  return moment(dateMilliseconds).format('Do MMM YYYY [at] H:mm')
}

export const getDateWithoutTime = (dateMilliseconds) => {
  return moment(dateMilliseconds).format('Do MMM YYYY')
}

export const getActiveTime = (dateMilliseconds) => {
  return moment(dateMilliseconds).startOf('hour').fromNow()
}
