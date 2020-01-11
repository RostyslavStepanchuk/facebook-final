import moment from 'moment'

const getDate = ( dateMilliseconds ) => {

  return moment(dateMilliseconds).format('Do MMM YYYY [at] H:mm')
}

export default getDate