import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  gridItem: {
    display: 'flex',
    border: '1px solid #e9ebee',
    margin: '8px auto',
    minWidth: 370
  },
  friendInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 10px'
  },
  userName: {
    color: '#000',
    fontWeight: 600,
    margin: 0,
    wordBreak: 'break-word'
  },
  requestDate: {
    margin: 0,
    wordBreak: 'break-word'
  },
  confirmBtn: {
    color: '#8bc34a'
  }

}))

export default useStyles
