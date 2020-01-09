import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  avatar_bg: {
    backgroundImage: `url('https://s3.us-west-2.amazonaws.com/fs-8/1576923813421-avatar-bg.jpg')`,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative'
  },
  avatar_img: {
    width: 175,
    height: 175,
    border: '3px solid white',
    backgroundPosition: 'center',
    position: 'absolute',
    bottom: -30,
    left: 20,
    backgroundSize: 'cover',
  },
  avatar_name: {
    fontSize: 26,
    position: 'absolute',
    color: 'white',
    bottom: 0,
    left: 240,
  },
  submenu: {
    flexGrow: 1,
    maxWidth: 600,
    margin: '0 0 0 auto',
    paddingLeft: 200,
  },
  submenu_item: {
    borderLeft: '1px solid #e9eaed',
    minWidth: 120,
  },
}))

export default useStyles