import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    borderBottom: '1px solid #e6e6e6',
    padding: '5px 10px'
  },
  image: {
    borderRadius: '50%',
    width: 48,
    height: 48,
    marginRight: 15
  },
  name: {
    paddingTop: 12,
    boxSizing: 'border-box',
    fontWeight: '600'
  },
  link: {
    textDecoration: 'none',
    color: '#1c1e21'
  },
  requestSentIcon: {
    padding: 10,
    color: '#8bc34a'
  },
  commonFriendAvatar: {
    borderRadius: '50%',
    width: 25,
    height: 25,
    margin: '0 2px'
  }
}))

export default useStyles
