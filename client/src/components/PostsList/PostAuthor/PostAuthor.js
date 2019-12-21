import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostAuthor extends Component {
  render() {
    const author = this.props.author;
      return (
        <div className='user d-flex'>
          <img className='user_photo' src={author.src} alt='User' />
          <div className='user_name'>
            <p className='user_fullname'>{author.login}</p>
            <p className='user-name_fullname'>{author.surname} {author.name}</p>
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostAuthor)