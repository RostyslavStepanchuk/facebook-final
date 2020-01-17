import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(8)
  },
  header: {
    marginBottom: theme.spacing(5)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5)
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
    margin: theme.spacing(1, 0, 2)
  },

  link: {
    textDecoration: 'none',
    color: 'grey'
  },
  center: {
    textAlign: 'center'
  }

}))

export default useStyles
