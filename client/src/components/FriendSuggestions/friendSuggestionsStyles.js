import { makeStyles } from '@material-ui/core'
import {
  CONTAINER_HEADER_BG_COLOR,
  CONTAINER_HEADER_TEXT_COLOR
} from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: 250,
    marginBottom: 20
  },
  header: {
    padding: '8px 10px',
    paddingRight: '24px',
    background: CONTAINER_HEADER_BG_COLOR,
    borderBottom: '1px solid #dddfe2',
    borderRadius: '4px 4px 0 0',
    fontWeight: '900',
    color: CONTAINER_HEADER_TEXT_COLOR
  }
}))

export default useStyles
