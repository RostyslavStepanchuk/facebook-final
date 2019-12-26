import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Avatar,
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined'
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import useStyles from './CreatePostStyles'

const CreatePost = ({ user }) => {

  const classes = useStyles()
  const [uploadedImages, setUploadedImages] = useState([])
  const [textInput, setTextInput] = useState('')

  const handleFileInputChange = (e) => {
    let addedUrls = [].map.call(e.target.files, file => ({file, url: URL.createObjectURL(file)}))
    setUploadedImages(uploadedImages.concat(addedUrls))
  }

  const removeImage = (url) => {
    const filteredImages = uploadedImages.filter(img => img.url !== url)
    setUploadedImages(filteredImages)
  }

  const handleTextInputChange = e => {
    setTextInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(textInput)
    console.log(uploadedImages)
  }

  const images = uploadedImages.map((img, index) => (
    <GridListTile key={img.url} cols={1}>
      <img src={img.url} alt={'userImage' + index}/>
      <GridListTileBar
        titlePosition="top"
        actionIcon={
          <IconButton
            onClick={()=>removeImage(img.url)}
            className={classes.iconButton}
            size='small'>
            <CloseOutlinedIcon/>
          </IconButton>
        }
        className={classes.titleBar}
        actionPosition="right"
      />
    </GridListTile>
  ))

  return (
    <Paper elevation={1} className={classes.paper}>
      <div >
        <Typography variant='subtitle1' component='div' className={classes.header}>
          Create post
        </Typography>
        <form className={classes.form}>
          <Grid container className={classes.textContainer}>
            <Grid container item xs={2} lg={1} justify='center' alignItems='flex-start'>
              <Avatar className={classes.avatar} src={user.avatar}/>
            </Grid>
            <Grid item xs={10} lg={11} >
              <TextField
                className={classes.postInput}
                autoComplete='lastName'
                name='lastName'
                variant='outlined'
                placeholder={'\n What you\'d like to share, ' + user.firstName + '?'}
                rows='3'
                onChange={handleTextInputChange}
                multiline
                required
                fullWidth
              />
              <GridList spacing={3} cellHeight={80} cols={5} className={classes.imgPreviewContainer}>
                {images}
              </GridList>
            </Grid>
          </Grid>
          <Grid container className={classes.toolsContainer}>
            <Grid item xs={10}>
              <Button color="primary" className={classes.button}>
                <label htmlFor="file_upload" className={classes.label}>
                  <CropOriginalOutlinedIcon className={classes.icon}/>
                  <div className={classes.labelText}> Add image</div>
                </label>
                <input id='file_upload'
                       className={classes.fileInput}
                       multiple
                       type="file"
                       onChange={handleFileInputChange}
                />
              </Button>
              <Button color="primary" className={classes.button}>
                <div className={classes.label}>
                  <AssignmentIndOutlinedIcon className={classes.icon}/>
                  <div className={classes.labelText}> Tag a friend</div>
                </div>
              </Button>
            </Grid>
            <Grid container item xs={2} justify='flex-end'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
              >
                POST
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
)
}

CreatePost.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, null)(CreatePost)