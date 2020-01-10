import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  paper: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0 2px 4px rgba(0, 0, 0, .25)',
    marginRight: 30,
  },
}))

export default useStyles