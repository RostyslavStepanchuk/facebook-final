import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'left'
  },
  header: {
    color: '#1c1e21',
    padding: '8px 10px',
    fontWeight: 900,
    borderBottom: '1px solid #dddfe2',
    paddingRight: 24,
    backgroundColor: '#f5f6f7'
  },
  count: {
    color: '#90949c',
    fontWeight: 500
  },
  gridContainer: {
    padding: '8px 10px'
  },
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
  }

}))

export default useStyles
