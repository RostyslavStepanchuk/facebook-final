import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    overflow: 'hidden'
  },

  chatList: {
    width: 350,
    flexBasis: 300,
    flexShrink: 0,
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

export default useStyles
