import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import useStyles from './createCommentStyles'
import PropTypes from 'prop-types'
import { Avatar, Grid, TextField } from '@material-ui/core'

import { createComment } from '../../../actions/post'

const CreateComent = ( { postId, user } ) => {
  const classes = useStyles()

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
      let comment = e.target.value
      createComment(postId, comment)
    }
  }

  return (
    <Fragment>
      <Grid container className={classes.panel}>
        <Grid container item xs={1}  justify='center' alignItems='flex-start'>
          <Avatar className={classes.avatar} src={user.avatar}/>
        </Grid>
        <Grid item xs={11} >
          <TextField
            className={classes.createInput}
            variant='outlined'
            placeholder={'Write a comment...'}
            multiline
            fullWidth
            onKeyPress={handleKeyPress}
          />
          <p className={classes.footerText}>Press Enter to post.</p>
        </Grid>
      </Grid>
    </Fragment>
  )
}

CreateComent.propTypes = {
  postId: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

//export default connect(mapStateToProps, { createComment } )(CreateComent)
export default connect(mapStateToProps, null )(CreateComent)