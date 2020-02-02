import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '94vh',
    backgroundColor: theme.palette.white
  },
  searchInput: {
    flexGrow: 1
  }
}))

export default useStyles
