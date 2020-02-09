import { makeStyles } from '@material-ui/core/styles'
import {
  AVATAR_SIZE_MID,
  CONTAINER_HEADER_BG_COLOR,
  CONTAINER_HEADER_TEXT_COLOR,
  BTN_PRIMARY_TEXT_COLOR, BTN_BG_COLOR, BTN_SHADOW, BTN_BG_HOVER, BTN_BG_ACTIVE, BTN_SHADOW_ACTIVE
} from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 20
  },
  header: {
    padding: '8px 10px',
    paddingRight: 24,
    background: CONTAINER_HEADER_BG_COLOR,
    borderBottom: '1px solid #dddfe2',
    borderRadius: '4px 4px 0 0',
    fontWeight: 900,
    color: CONTAINER_HEADER_TEXT_COLOR
  },
  textContainer: {
    padding: 5
  },
  avatar: {
    height: AVATAR_SIZE_MID,
    width: AVATAR_SIZE_MID,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
  },
  postInput: {
    borderStyle: 'none',
    borderRadius: 0,
    background: 'white'
  },
  imgPreviewContainer: {
    padding: 5
  },
  titleBar: {
    height: 30,
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, ' +
      'rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)'
  },
  iconButton: {
    color: 'white'
  },
  toolsContainer: {
    padding: 5
  },
  errorImg: {
    border: '3px solid red'
  },
  button: {
    position: 'relative',
    color: BTN_PRIMARY_TEXT_COLOR,
    textShadow: '0 -1px 2px rgba(0,0,0,.2)',
    padding: 0,
    margin: 5,
    background: BTN_BG_COLOR,
    boxShadow: BTN_SHADOW,
    transition: '.2s ease-in-out',
    '&:hover:not(:active)': {
      background: BTN_BG_HOVER,
    },
    '&:active': {
      top: 1,
      background: BTN_BG_ACTIVE,
      boxShadow: BTN_SHADOW_ACTIVE,
    },
  },
  label: {
    padding: '5px 10px',
  },
  icon: {
    verticalAlign: 'middle',
    display: 'inline-block'
  },
  labelText: {
    verticalAlign: 'middle',
    display: 'inline-block',
    lineHeight: '18px',
  },
  fileInput: {
    display: 'none'
  }
}))

export default useStyles
