import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'black'
  },

  userPhoto: {
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 15px 5px 10px'
  },

  optionWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  searchInput: {
    width: 420,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 4,
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      height: 45,
      '& .MuiAutocomplete-input': {
        padding: '5px 4px'
      }
    }
  }
}))

export default useStyles
