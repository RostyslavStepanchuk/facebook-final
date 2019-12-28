import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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