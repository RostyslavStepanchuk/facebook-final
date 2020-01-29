import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '10px 10px 0',
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  image: props => ({
    width: 60,
    height: 60,
    alignSelf: 'center',
    backgroundImage: `url(${props.avatar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    position: 'relative'
  }),
  name: {
    paddingTop: 20,
    marginLeft: 5,
    boxSizing: 'border-box',
    fontWeight: '900',
    color: '#1c1e21'
  },
  sendRequestBtn: {
    padding: 20
  },
  requestSentIcon: {
    padding: 20,
    color: '#8bc34a'
  },
  commonFriendAvatar: {
    width: 20,
    height: 20,
    marginRight: 2
  }
}))

export default useStyles
