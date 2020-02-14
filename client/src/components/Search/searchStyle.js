import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    width: '100%',
    height: 45,
    display: 'inherit',
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
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      height: 45,
      '& .MuiAutocomplete-input': {
        color: 'white',
        padding: '5px 0 5px 35px'
      }
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    '& .MuiOutlinedInput-root': {
      border: '1px solid rgba(33,43,52,1)',
      boxShadow: 'inset 0 1px rgba(101,114,126,1),  ' +
        'inset 0 0 1px rgba(140,150,170,.8),  ' +
        '0 1px rgb(83,94,104),  0 0 1px rgb(86,96,106)',
      '&:hover fieldset': {
        border: '1px solid #2f363e'
      }
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
}))

export default useStyles
