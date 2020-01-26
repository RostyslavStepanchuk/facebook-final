import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: 250,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: '10px'
  },
  header: {
    padding: '8px 10px',
    paddingRight: '24px',
    backgroundColor: '#f5f6f7',
    borderBottom: '1px solid #dddfe2',
    borderRadius: '4px 4px 0 0',
    fontWeight: '900',
    color: '#1c1e21'
  }
}))

export default useStyles
