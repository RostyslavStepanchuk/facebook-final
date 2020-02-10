import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  },
  chatListContainer: {
    height: 'calc(100vh - 128px)',
    overflowX: 'hidden',
    overflowY: 'scroll'
  }
}))

export default useStyles
