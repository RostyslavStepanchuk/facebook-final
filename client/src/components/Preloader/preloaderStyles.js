import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.fullScreen': {
      height: '80vh',
      paddingTop: '40vh'
    }
  }
}))

export default useStyles
