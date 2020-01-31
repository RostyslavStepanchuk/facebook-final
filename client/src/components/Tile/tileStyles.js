import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  image: props => ({
    paddingTop: '100%',
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    position: 'relative'
  }),
  userLink: {
    textDecoration: 'none',
    color: 'black'
  },
  title: {
    margin: 0,
    wordBreak: 'break-word'
  },
  imageModal: {
    width: '100%',
  }
}))

export default useStyles
