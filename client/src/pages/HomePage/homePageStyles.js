import { makeStyles } from '@material-ui/core/styles'
import { CONTAINER_BG_COLOR, CONTAINER_TEXT_COLOR } from '../../utils/constants/styleConstants'

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
  paper: {
    textAlign: 'left',
    color:  CONTAINER_TEXT_COLOR,
    background: CONTAINER_BG_COLOR,
    borderRadius: 4,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)',
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
