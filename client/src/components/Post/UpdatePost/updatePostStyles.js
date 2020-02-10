import { makeStyles } from '@material-ui/core/styles'
import styleConstants from '../../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  container: {
    width: 500
  },
  header: {
    padding: '8px 10px',
    paddingRight: '24px',
    backgroundColor: '#f5f6f7',
    borderRadius: '4px 4px 0 0',
    borderBottom: '1px solid #dddfe2',
    fontWeight: '900',
    color: '#1c1e21'
  },
  textContainer: {
    padding: '5px'
  },
  avatar: {
    height: styleConstants.AVATAR_SIZE_MID,
    width: styleConstants.AVATAR_SIZE_MID
  },
  postInput: {
    borderStyle: 'none',
    borderRadius: '0px'
  },
  imgPreviewContainer: {
    padding: '5px'
  },
  titleBar: {
    height: '30px',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, ' +
      'rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)'
  },
  iconButton: {
    color: 'white'
  },
  toolsContainer: {
    padding: '5px'
  },
  errorImg: {
    border: '3px solid red'
  },
  button: {
    padding: 0,
    marginRight: '5px'
  },
  label: {
    padding: '5px 10px'
  },
  icon: {
    verticalAlign: 'middle',
    display: 'inline-block'
  },
  labelText: {
    verticalAlign: 'middle',
    display: 'inline-block',
    lineHeight: '18px'
  },
  fileInput: {
    display: 'none'
  }
}))

export default useStyles
