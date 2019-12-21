import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  posts: {
    flexGrow: 1,
  },
  posts_item: {
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    borderRadius: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
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
  post_img: {
    width: '100%',
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
  comments: {

  },
  comment: {
    textAlign: 'left',
    padding: '5px 10px',
    borderTop: '1px solid #e6e6e6',
  },
  comment_text: {
    marginBottom: 0,
  },
  comment_author: {
    fontWeight: 600,
    marginRight: 5,
  },
  comment_date: {
    marginBottom: 0,
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
  },
}))

export default useStyles