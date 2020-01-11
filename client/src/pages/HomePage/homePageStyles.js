import { makeStyles } from '@material-ui/core/styles'
import { BACKGROUND_COLOR } from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: BACKGROUND_COLOR,
    minHeight: '100vh'
  },
  container: {
    padding: '10px 0',
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