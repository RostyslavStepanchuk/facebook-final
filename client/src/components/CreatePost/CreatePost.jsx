/* global URL */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPost, uploadImages } from '../../actions/post'

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
import { Toastr } from '../../utils/toastr/Toastr'

const CreatePost = ({ user }) => {
  const classes = useStyles()
  const { firstName, avatar } = user;
  const [uploadForm, setUploadForm] = useState({
    imagesToUpload: [],
    textToUpload: ''
  })

  const {
    imagesToUpload
  } = uploadForm

  const handleFileInputChange = (e) => {
    let addedUrls = [].map.call(e.target.files, file => ({
      file,
      url: URL.createObjectURL(file),
      uploadError: false}))
    setUploadForm({...uploadForm, imagesToUpload: imagesToUpload.concat(addedUrls)})
  }

  const removeImage = (url) => {
    const filteredImages = imagesToUpload.filter(img => img.url !== url)
    setUploadForm({...uploadForm, imagesToUpload: filteredImages})
  }

  const handleTextInputChange = e => {
    setUploadForm({...uploadForm, textToUpload: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    uploadImages(imagesToUpload).then(
      imgLinks => createPost(uploadForm.textToUpload, imgLinks, true),
      images => {
        Toastr.error('One or more images weren\'t uploaded')
        setUploadForm({...uploadForm, imagesToUpload: images})
      })
  }

  const images = imagesToUpload.map((img, index) => (
    <GridListTile key={img.url} className={img.uploadError ? classes.errorImg : null} cols={1}>
      <img src={img.url} alt={'userImage' + index} />
      <GridListTileBar
        titlePosition='top'
        actionIcon={
          <IconButton
            onClick={() => removeImage(img.url)}
            className={classes.iconButton}
            size='small'>
            <CloseOutlinedIcon />
          </IconButton>
        }
        className={classes.titleBar}
        actionPosition='right'
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
              <Avatar className={classes.avatar} src={avatar.src} />
            </Grid>
            <Grid item xs={10} lg={11} >
              <TextField
                className={classes.postInput}
                autoComplete='lastName'
                name='lastName'
                variant='outlined'
                placeholder={'\n What you\'d like to share, ' + firstName + '?'}
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
              <Button color='primary' className={classes.button}>
                <label htmlFor='file_upload' className={classes.label}>
                  <CropOriginalOutlinedIcon className={classes.icon} />
                  <div className={classes.labelText}> Add image</div>
                </label>
                <input id='file_upload'
                  className={classes.fileInput}
                  multiple
                  type='file'
                  onChange={handleFileInputChange}
                />
              </Button>
              <Button color='primary' className={classes.button}>
                <div className={classes.label}>
                  <AssignmentIndOutlinedIcon className={classes.icon} />
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
