import moment from 'moment'

export const getDate = dateMilliseconds => {
  return moment(dateMilliseconds).format('Do MMM YYYY [at] H:mm')
}

export const getDateWithoutTime = dateMilliseconds => {
  return moment(dateMilliseconds).format('Do MMM YYYY')
}

export const getDateForChat = (dateMilliseconds) => {
  return moment(dateMilliseconds).isSame(moment(), 'day')
    ? moment(dateMilliseconds).format('LT')
    : moment(dateMilliseconds).fromNow()
}
