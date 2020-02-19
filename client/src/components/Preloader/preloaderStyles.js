import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.fullScreen': {
      paddingTop: '30%'
    }
  }
}))

export default useStyles
