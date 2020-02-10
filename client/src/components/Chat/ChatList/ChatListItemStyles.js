import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  active: {
    boxShadow: `inset 7px 0px 0px ${styleConstants.BTN_PRIMARY_TEXT_COLOR}`,
    backgroundColor: colors.grey[50]
  },
  avatar: {
    height: 40,
    width: 40
  },
  details: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  unread: {
    marginTop: 2,
    padding: 2,
    height: 18,
    minWidth: 18
  }
})

)

export default useStyles
