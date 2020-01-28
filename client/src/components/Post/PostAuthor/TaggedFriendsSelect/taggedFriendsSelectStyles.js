import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginRight: theme.spacing(2),
    maxHeight: 350,
    overflowY: 'scroll'
  },
  tagLink: {
    color: '#4154B3',
    textDecoration: 'none',
    '&:visited': {
      color: '#4154B3'
    }
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
