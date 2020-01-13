import { Container, Grid } from '@material-ui/core'
import useStyles from './homePageStyles'

import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import React from 'react'

const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Container className={classes.container} maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <div className={classes.leftSectionPlaceholder}>Menu section</div>
          </Grid>
          <Grid item md={6}>
            <CreatePost />
            <PostFeed origin='homepage' />
          </Grid>
          <Grid item md={4}>
            <div className={classes.rightSectionPlaceholder} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

HomePage.propTypes = {

}

export default HomePage
