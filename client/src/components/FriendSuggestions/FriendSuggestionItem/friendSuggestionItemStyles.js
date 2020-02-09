import { makeStyles } from '@material-ui/core'
import { CONTAINER_TEXT_COLOR } from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  container: {
    borderBottom: '1px solid rgb(188,188,189)',
    padding: '5px 10px'
  },
  image: {
    borderRadius: '50%',
    width: 48,
    height: 48,
    marginRight: 15,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
  },
  name: {
    paddingTop: 12,
    boxSizing: 'border-box',
    fontWeight: '600'
  },
  link: {
    textDecoration: 'none',
    color: CONTAINER_TEXT_COLOR,
  },
  requestSentIcon: {
    padding: 10,
    color: '#8bc34a'
  },
  commonFriendAvatar: {
    borderRadius: '50%',
    width: 25,
    height: 25,
    margin: '0 2px',
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
  }
}))

export default useStyles
