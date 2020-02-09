import { makeStyles } from '@material-ui/core'
import {
  BTN_BG_ACTIVE,
  BTN_BG_COLOR,
  BTN_BG_HOVER,
  BTN_PRIMARY_TEXT_COLOR,
  BTN_SHADOW, BTN_SHADOW_ACTIVE
} from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
  button: {
    position: 'relative',
    color: BTN_PRIMARY_TEXT_COLOR,
    textShadow: '0 -1px 2px rgba(0,0,0,.2)',
    padding: 0,
    marginRight: 5,
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
    padding: '5px 10px'
  },
  icon: {
    verticalAlign: 'middle',
    display: 'inline-block'
  },
  labelText: {
    verticalAlign: 'middle',
    display: 'inline-block',
    lineHeight: '18px'
  },
  checkedIcon: {
    paddingTop: 5,
    width: 18,
    height: 18,
    color: '#8bc34a',
  },
  userPic: {
    borderRadius: '50%',
    width: 25,
    height: 25,
    marginRight: 5
  }
}))

export default useStyles
