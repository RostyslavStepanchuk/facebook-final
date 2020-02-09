import { makeStyles } from '@material-ui/core/styles'
import {
  CONTAINER_BG_COLOR,
  CONTAINER_TEXT_COLOR
} from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
  post: {
    color:  CONTAINER_TEXT_COLOR,
    background: CONTAINER_BG_COLOR,
    borderRadius: 4,
    textAlign: 'center',
    marginBottom: 20,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)',
  },
  image: {
    width: '100%'
  }
}))

export default useStyles
