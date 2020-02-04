import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(8)
  },
  paper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 0)
  },
  googleBtn: {
    margin: theme.spacing(1, 0)
  },
  googleIcon: {
    marginRight: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export default useStyles
