import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  avatarBg: {
    backgroundImage: `url('https://s3.us-west-2.amazonaws.com/fs-8/1576923813421-avatar-bg.jpg')`,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative'
  },
  avatarImg: {
    width: 175,
    height: 175,
    border: '3px solid white',
    backgroundPosition: 'center',
    position: 'absolute',
    bottom: -30,
    left: 20,
    backgroundSize: 'cover',
  },
  editProfileBtn: {
    position: 'absolute',
    padding: '2px 4px',
    bottom: '5px',
    right: '5px'
  },
  label: {
    padding: 0
  },
  icon: {
    verticalAlign: 'middle',
    display: 'inline-block',
    paddingRight: '2px'
  },
  labelText: {
    verticalAlign: 'middle',
    display: 'inline-block',
    lineHeight: '25px'
  },
  avatarName: {
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
  submenuItem: {
    borderLeft: '1px solid #e9eaed',
    minWidth: 120,
  },
}))

export default useStyles