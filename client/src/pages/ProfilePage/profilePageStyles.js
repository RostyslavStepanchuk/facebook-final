import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  scrollContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },
  feedColumn: {
    paddingRight: 30
  },
  paper: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0 2px 4px rgba(0, 0, 0, .25)',
    marginRight: 30
  }
}))

export default useStyles
