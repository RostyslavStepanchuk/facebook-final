import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  user: {
    display: 'flex',
    margin: 'auto 0',
  },
  userPhoto: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 15px 5px 10px',
  },
  userName: {
    margin: 'auto 0',
  },
  userFullname: {
    display: 'flex',
    fontWeight: 600,
    margin: 0,
    textAlign: 'left',
  },
  postDate: {
    margin: 0,
    textAlign: 'left',
    lineHeight: '16px',
  },
}))

export default useStyles