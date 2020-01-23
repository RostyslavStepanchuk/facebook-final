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
  title: {
    margin: 0,
    wordBreak: 'break-word'
  }
}))

export default useStyles
