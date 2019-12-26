import React from 'react'
import PropTypes from 'prop-types'

import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core'
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

import useStyles from './CreatePostStyles'
import Grid from '@material-ui/core/Grid'


const CreatePost = props => {
  const classes = useStyles()
  return (
    <Paper elevation={1} className={classes.paper}>
      <div >
        <Typography variant='subtitle1' component='div' className={classes.header}>
          Create post
        </Typography>
        <form className={classes.form}>
          <Grid container className={classes.textContainer}>
            <Grid container item xs={1} justify='center' alignItems='center'>
              <Avatar className={classes.avatar} src='https://s3.us-west-2.amazonaws.com/fs-8/1576923750814-avatar.jpg'/>
            </Grid>
            <Grid item xs={11} >
              <TextField
                className={classes.postInput}
                autoComplete='lastName'
                name='lastName'
                variant='outlined'
                placeholder={'\n What you\'d like to share'}
                rows='3'
                multiline
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container className={classes.toolsContainer}>
            <Grid item xs={10}>
              <Button color="primary" className={classes.button}>
                <label htmlFor="file_upload" className={classes.label}>
                  <CropOriginalOutlinedIcon className={classes.icon}/>
                  <div className={classes.labelText}> Add image</div>
                </label>
                <input id='file_upload' className={classes.fileInput} multiple type="file"/>
              </Button>
              <Button color="primary" className={classes.button}>
                <div className={classes.label}>
                  <AssignmentIndOutlinedIcon className={classes.icon}/>
                  <div className={classes.labelText}> Tag a friend</div>
                </div>
              </Button>
            </Grid>
            <Grid container item xs={2} justify='flex-end'>
              <Button type='submit' variant='contained' color='primary'>
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

}

export default CreatePost