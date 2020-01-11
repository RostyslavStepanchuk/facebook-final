import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  comment: {
    textAlign: 'left',
    padding: '5px 10px',
    borderBottom: '1px solid #e6e6e6',
  },
  commentText: {
    margin: 0,
    wordBreak: 'break-word',
  },
  commentAuthor: {
    fontWeight: 600,
    marginRight: 5,
  },
  commentDate: {
    margin: 0,
    fontSize: 10,
    color: '#999',
  },
}))

export default useStyles