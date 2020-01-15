import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '80px',

    '&.fullScreen': {
      height: '80vh',
      paddingTop: 0
    }
  }
}))

export default useStyles
