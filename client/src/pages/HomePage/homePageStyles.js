import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    padding: '10px 0'
  },
  leftSectionPlaceholder: {
    height: '200px',
    backgroundColor: 'yellow'
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
