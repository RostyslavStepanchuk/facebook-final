import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  scrollContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
  container: {
    padding: '10px 0'
  },
  mainSectionPlaceholder: {
    height: '1000px',
    backgroundColor: 'green'
  },
  rightSectionPlaceholder: {
    height: '300px',
    backgroundColor: 'blue'
  }
}))

export default useStyles
