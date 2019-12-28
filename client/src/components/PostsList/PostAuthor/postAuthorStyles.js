import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  user: {
    display: 'flex',
    margin: 'auto 0',
  },
  user_photo: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 15px 5px 10px',
  },
  user_name: {
    margin: 'auto 0',
  },
  user_fullname: {
    fontWeight: 600,
    margin: 0,
    textAlign: 'left',
    lineHeight: '16px',
  },
  post_date: {
    margin: 0,
    textAlign: 'left',
    lineHeight: '16px',
  },
}))

export default useStyles