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
    borderRadius: '4px 4px 0 0',
    paddingRight: 24,
    backgroundColor: '#f5f6f7'
  },
  count: {
    color: '#90949c',
    fontWeight: 500
  },
  gridContainer: {
    padding: '8px 10px'
  }

}))

export default useStyles
