import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
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
  checkedIcon: {
    paddingTop: 5,
    width: 18,
    height: 18,
    color: '#8bc34a'
  },
  userPic: {
    borderRadius: '50%',
    width: 25,
    height: 25,
    marginRight: 5
  }
}))

export default useStyles
