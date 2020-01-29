import React, { Fragment, useState } from 'react'
import { Grid, Dialog, Slide } from '@material-ui/core'
import useStyles from './tileStyles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Tile = ({ imageSrc, title, username }) => {
  const classes = useStyles({image: imageSrc})
  const [openDialog, setOpenDialog] = useState(false)

  const handleModal = () => {
    setOpenDialog(!openDialog)
  }

  const content = (imageSrc, title) => {
    return <Grid item xs={4}>
      { title
        ? (
          <Fragment>
            <Link to={'/profile/' + username} className={classes.userLink}>
              <div className={classes.image}/>
              <p className={classes.title}>{title}</p>
            </Link>
          </Fragment>
        )
        : (
          <Fragment>
            <div className={classes.image} onClick={handleModal}/>
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleModal}
            >
              <img className={classes.imageModal} src={imageSrc} onClick={handleModal} alt="UserPhoto"/>
            </Dialog>
          </Fragment>
        )
      }
    </Grid>
  }

  return (
    <Fragment>
      {content(imageSrc, title)}
    </Fragment>
  )
}

Tile.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  username: PropTypes.string,
  title: PropTypes.string
}

export default Tile
