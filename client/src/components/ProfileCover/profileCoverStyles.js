import { makeStyles } from '@material-ui/core/styles'
import {
  CONTAINER_HEADER_BG_COLOR,
  CONTAINER_HEADER_TEXT_COLOR
} from '../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
  container: {
    boxSizing: 'border-box',
  },
  avatarBg: props => ({
    backgroundImage: `url(${props.profileCover})`,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative'
  }),
  avatarImg: {
    width: 175,
    height: 175,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)',
    border: '3px solid',
    borderColor: CONTAINER_HEADER_TEXT_COLOR,
    backgroundPosition: 'center',
    position: 'absolute',
    bottom: -30,
    left: 20,
    backgroundSize: 'cover'
  },
  editProfileBtn: {
    position: 'absolute',
    padding: '2px 4px',
    bottom: '5px',
    right: '5px'
  },
  label: {
    padding: 0
  },
  icon: {
    verticalAlign: 'middle',
    display: 'inline-block',
    paddingRight: '2px'
  },
  labelText: {
    verticalAlign: 'middle',
    display: 'inline-block',
    lineHeight: '25px'
  },
  modalContainer: {
    padding: 0,
    margin: '50px auto',
    backgroundColor: 'white'
  },
  avatarName: {
    fontSize: 26,
    position: 'absolute',
    color: CONTAINER_HEADER_TEXT_COLOR,
    bottom: 0,
    left: 240
  },
  tabContainer: {
    background: CONTAINER_HEADER_BG_COLOR
  },
  submenu: {
    maxWidth: 635,
    margin: '0 0 0 auto',
    paddingLeft: 200
  },
  submenuItem: {
    color: CONTAINER_HEADER_TEXT_COLOR,
    minWidth: 120,
  },
}))

export default useStyles
