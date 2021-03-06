import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
  container: {
    padding: '5px 5px'
  },
  user: {
    display: 'flex',
    margin: 'auto 0'
  },
  userPhoto: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 15px 5px 10px',
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
  },
  userName: {
    margin: '5px 0 0'
  },
  arrowRight: {
    size: '5px',
    width: 20,
    height: 20
  },
  lineBelowUsername: {
    display: 'flex',
    margin: '0 0 3px'
  },
  userFullName: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    textAlign: 'left'
  },
  authorLink: {
    fontWeight: 600,
    textDecoration: 'none',
    color: styleConstants.CONTAINER_TEXT_COLOR
  },
  tagLink: {
    fontWeight: 600,
    color: styleConstants.PRIMARY_COLOR,
    textDecoration: 'none'
  },
  postDate: {
    margin: '3px 0',
    textAlign: 'left',
    lineHeight: '16px',
    fontSize: 14
  }
}))

export default useStyles
