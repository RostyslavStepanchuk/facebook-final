import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  header: {
    color: '#1c1e21',
    padding: '8px 10px',
    fontWeight: 900,
    borderBottom: '1px solid #dddfe2',
    borderRadius: '4px 4px 0 0',
    paddingRight: 24,
    backgroundColor: '#f5f6f7'
  },
  count: {
    color: '#90949c',
    fontWeight: 500
  },
  user: {
    display: 'flex',
    margin: 'auto 0',
    borderBottom: '1px solid #e6e6e6'
  },
  userPhoto: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 15px 5px 10px'
  },
  userName: {
    margin: 'auto 0',
  },
  userFullName: {
    display: 'flex',
    fontWeight: 600,
    margin: 0,
    textAlign: 'left'
  },
  activeTime: {
    margin: 0,
    textAlign: 'left',
    lineHeight: '16px'
  },

}))

export default useStyles
