import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  IconButton,
  Input,
  Paper,
  Tooltip
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import useStyles from './sendMessageStyles'
import { getAvatarLink } from '../../../../utils/helpers/imageLinkHelpers'
import { createPost, uploadImages } from '../../../../actions/post'
import { Toastr } from '../../../../utils/toastr/Toastr'

const SendMessage = ({ authUser }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }
  const handleSubmit = e => {
    console.log(e)
    console.log(value)
    // e.preventDefault()
    // uploadImages(imagesToUpload).then(
    //   imgLinks => createPost(uploadForm.textToUpload, imgLinks, true),
    //   images => {
    //     Toastr.error('One or more images weren\'t uploaded')
    //     setUploadForm({...uploadForm, imagesToUpload: images})
    //   })
  }
  return (
    <div className={classes.root}>
      <Avatar
        alt='User avatar'
        src={getAvatarLink(authUser)}
      />
      <Paper className={classes.paper}>
        <Input
          disableUnderline
          multiline
          fullWidth
          onChange={handleChange}
          placeholder='Send a message'
        />
      </Paper>
      <Tooltip title='Send'>
        <IconButton
          onClick={handleSubmit}
          color={value.length > 0 ? 'primary' : 'default'}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

SendMessage.propTypes = {
  authUser: PropTypes.object.isRequired
}

export default SendMessage
