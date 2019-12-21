import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostComments extends Component {
    render() {

        const post = this.props.post;

        const comment = post.post.comments.map(item =>
            <div className='comment'>
                <p className='comment_text'><span className='comment_autor'>{item.author}</span>{item.comment}</p>
                <p className='comment_date'>{item.date}</p>
            </div>
        )

        return (
            <div className='comments'>
                {comment}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComments)