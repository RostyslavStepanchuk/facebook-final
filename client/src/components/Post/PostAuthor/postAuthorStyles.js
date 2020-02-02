import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  user: {
    display: 'flex',
    margin: 'auto 0'
  },
  userPhoto: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 15px 5px 10px'
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
    margin: '0 0 3px',
    fontWeight: 600
  },
  userFullName: {
    display: 'flex',
    fontWeight: 600,
    alignItems: 'center',
    margin: 0,
    textAlign: 'left'
  },
  authorLink: {
    textDecoration: 'none',
    color: 'black'
  },
  tagLink: {
    color: '#4154B3',
    textDecoration: 'none',
    '&:visited': {
      color: '#4154B3'
    }
  },
  postDate: {
    margin: '0 0 3px',
    textAlign: 'left',
    lineHeight: '16px'
  }
}))

export default useStyles
