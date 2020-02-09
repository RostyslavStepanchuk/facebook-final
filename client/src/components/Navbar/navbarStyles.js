import { fade, makeStyles } from '@material-ui/core/styles'
import { PRIMARY_COLOR } from '../../utils/constants/styleConstants'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    background: PRIMARY_COLOR,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  searchContainer: {
    width: '300px',
    marginLeft: '20px'
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navbarButton: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-block',
    color: 'rgb(48, 213, 200)',
    textShadow: '0 -1px 2px rgba(0,0,0,.2)',
    padding: 7,
    height: 'min-content',
    outline: 'none',
    background: PRIMARY_COLOR,
    boxShadow: '0 1px rgba(255,255,255,.2) inset,  0 3px 5px rgba(0,1,6,.5),  0 0 1px 1px rgba(0,1,6,.2)',
    transition: '.2s ease-in-out',
    '&:hover:not(:active)': {
      background: 'linear-gradient(rgb(65,128,135), rgb(23,62,74)) rgb(65,128,135)'
    },
    '&:active': {
      top: 1,
      background: 'linear-gradient(rgb(39,83,96), rgb(19,41,48)) rgb(39,83,96)',
      boxShadow: '0 0 1px rgba(0,0,0,.5) inset,  0 2px 3px rgba(0,0,0,.5) inset,  0 1px 1px rgba(255,255,255,.1)',
    },
  },

}))

export default useStyles
