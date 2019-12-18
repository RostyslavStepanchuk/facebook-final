import React from 'react';
import PropTypes from 'prop-types';

const ConfirmEmail = props => {
    console.log(props)
    return (
        <div>
            Your email is confirmed
            <p>{props.match.params.token}</p>
        </div>
    );
};

ConfirmEmail.propTypes = {
  match: PropTypes.object
};

export default ConfirmEmail;