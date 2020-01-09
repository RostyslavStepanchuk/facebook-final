import React, { Component } from 'react'

import { Container, Grid } from '@material-ui/core'
import CreatePost from '../../components/CreatePost/CreatePost'

import { withStyles } from '@material-ui/styles'
import styles from './HomePageStyles'
import PostFeed from '../../components/PostFeed/PostFeed'

import apiRequest from '../../utils/helpers/apiRequest'

class HomePage extends Component {

  componentDidMount () {
    apiRequest.get('/users/currentttt').then(result => console.log('result:', result))
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.background}>
        <Container className={classes.container} maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item md={2}>
              <div className={classes.leftSectionPlaceholder}>Menu section</div>
            </Grid>
            <Grid item md={6}>
              <CreatePost/>
              <PostFeed origin='homepage'/>
            </Grid>
            <Grid item md={4}>
              <div className={classes.rightSectionPlaceholder}/>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}

HomePage.propTypes = {}

export default withStyles(styles)(HomePage)