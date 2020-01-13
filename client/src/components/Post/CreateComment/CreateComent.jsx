import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import useStyles from './createCommentStyles'
import PropTypes from 'prop-types'
import { Avatar, Grid, TextField } from '@material-ui/core'

const CreateComent = ({ id, user }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Grid container className={classes.panel}>
        <Grid container item xs={1} justify='center' alignItems='flex-start'>
          <Avatar className={classes.avatar} src={user.avatar} />
        </Grid>
        <Grid item xs={11} >
          <TextField
            className={classes.createInput}
            variant='outlined'
            placeholder={'Write a comment...'}
            multiline
            fullWidth
          />
          <p className={classes.footerText}>Press Enter to post.</p>
        </Grid>
      </Grid>
    </Fragment>
  )
}

CreateComent.propTypes = {
  id: PropTypes.number,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.auth.user
})

// export default connect(mapStateToProps, { createComment } )(CreateComent)
export default connect(mapStateToProps, { })(CreateComent)
