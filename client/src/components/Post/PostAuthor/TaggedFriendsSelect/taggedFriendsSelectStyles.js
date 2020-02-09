import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginRight: theme.spacing(2),
    maxHeight: 350,
    overflowY: 'scroll'
  },
  tagLink: {
    fontWeight: 600,
    color: 'rgba(48,213,200,0.78)',
    textDecoration: 'none',
  },
  menuLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit'
    }
  },
  userPic: {
    borderRadius: '50%',
    width: 25,
    height: 25,
    marginRight: 5
  },
  selectFullName: {
    margin: 0
  }
}))

export default useStyles
