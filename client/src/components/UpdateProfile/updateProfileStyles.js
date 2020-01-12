import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  header: {
    padding: '8px 10px',
    paddingRight: '24px',
    backgroundColor: '#f5f6f7',
    borderBottom: '1px solid #dddfe2',
    borderRadius: '4px 4px 0 0',
    fontWeight: '900',
    color: '#1c1e21',
  },
  avatarBg: {
    backgroundImage: `url('https://s3.us-west-2.amazonaws.com/fs-8/1576923813421-avatar-bg.jpg')`,
    height: 250,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative'
  },
  hidden: {
    display: 'none',
  },
  uploadImgBtn: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#EAEAEA',
  },
  uploadAvatarBtn: {
    bottom: 0,
    left:'50%',
    transform:'translate(-50%, 30%)'
  },
  uploadBgBtn: {
    top: 10,
    left: 10
  },
  avatarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  avatarImg: {
    width: 125,
    height: 125,
    border: '3px solid white',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  sectionContainer: {
    padding: '15px 20px 5px'
  },
  textInput: {
    margin: '5px 10px'
  },
  ageRadioSet: {
    paddingLeft: 30
  },
  ageRadioBtn: {
    height: 30
  },
  btnSection: {
    padding: '10px 20px'
  },
  summaryBtn: {
    padding: '5px 15px',
    marginRight: 5
  }
}))

export default useStyles