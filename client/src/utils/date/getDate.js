import moment from 'moment'

export const getDate = (dateMilliseconds) => {
  return moment(dateMilliseconds).format('Do MMM YYYY [at] H:mm')
}

export const getDateForBirthday = (dateMilliseconds) => {
  return moment(dateMilliseconds).format('Do MMM YYYY')
}
