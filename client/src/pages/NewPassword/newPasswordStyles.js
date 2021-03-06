import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    paddingTop: theme.spacing(8)
  },
  paper: {
    width: 440,
    color: styleConstants.CONTAINER_TEXT_COLOR,
    background: styleConstants.CONTAINER_BG_COLOR,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: styleConstants.PRIMARY_COLOR,
    boxShadow: styleConstants.BTN_SHADOW
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    position: 'relative',
    margin: theme.spacing(3, 0, 2),
    color: styleConstants.BTN_PRIMARY_TEXT_COLOR,
    textShadow: '0 -1px 2px rgba(0,0,0,.2)',
    background: styleConstants.BTN_BG_COLOR,
    boxShadow: styleConstants.BTN_SHADOW,
    transition: '.2s ease-in-out',
    '&:hover:not(:active)': {
      background: styleConstants.BTN_BG_HOVER
    },
    '&:active': {
      top: 1,
      background: styleConstants.BTN_BG_ACTIVE,
      boxShadow: styleConstants.BTN_SHADOW_ACTIVE
    }
  },
  linkBtn: {
    width: '100%',
    textDecoration: 'none'
  },
  center: {
    textAlign: 'center'
  },
  cssLabel: {
    color: styleConstants.PRIMARY_COLOR
  },
  cssOutlinedInput: {
    background: 'none',
    borderRadius: 4,
    '&$cssFocused': {
      background: 'white'
    },
    '&$cssFocused $notchedOutline': {
      borderColor: `${styleConstants.ICON_COLOR} !important`
    }
  },
  cssFocused: {
    color: `${styleConstants.PRIMARY_COLOR} !important`
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${styleConstants.PRIMARY_COLOR} !important`
  }
}))

export default useStyles
