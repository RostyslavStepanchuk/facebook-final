import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(() => ({
  avatar: props => ({
    paddingTop: 100,
    width: 100,
    backgroundImage: `url(${props.avatar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    position: 'relative'
  }),
  gridItem: {
    display: 'flex',
    border: '1px solid',
    borderColor: 'rgb(126,126,127)',
    margin: '8px auto',
    minWidth: 370,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)'
  },
  friendInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 10px'
  },
  userName: {
    color: styleConstants.CONTAINER_TEXT_COLOR,
    fontWeight: 600,
    margin: 0,
    wordBreak: 'break-word'
  },
  link: {
    textDecoration: 'none',
    color: styleConstants.CONTAINER_TEXT_COLOR
  },
  requestDate: {
    margin: 0,
    wordBreak: 'break-word'
  },
  confirmBtn: {
    color: '#8bc34a'
  }

}))

export default useStyles
