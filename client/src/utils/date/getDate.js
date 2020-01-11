import moment from 'moment'

const getDate = ( dateMilliseconds ) => {

  return moment(dateMilliseconds).format('Do MMM YYYY [at] h:mm')
}

export default getDate