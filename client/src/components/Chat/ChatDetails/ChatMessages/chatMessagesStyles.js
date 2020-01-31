import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    maxHeight: '100%'
  },
  inner: {
    padding: theme.spacing(2)
  }
}))

export default useStyles
