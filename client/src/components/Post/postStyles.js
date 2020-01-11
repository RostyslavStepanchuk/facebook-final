import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  post: {
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    borderRadius: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  postImg: {
    width: '100%',
  },
}))

export default useStyles