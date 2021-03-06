import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  panel: {
    borderTop: '1px solid rgb(188,188,189)',
    borderBottom: '1px solid rgb(188,188,189)'
  },
  container: {
    display: 'flex'
  },
  userPhoto: {
    borderRadius: '50%',
    width: 30,
    height: 30,
    margin: '3px 7px 3px 3px'
  },
  userContainer: {
    margin: 'auto 0'
  },
  text: {
    display: 'flex',
    margin: 0,
    textAlign: 'left'
  }

}))

export default useStyles
