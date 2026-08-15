import PropTypes from 'prop-types';

function UserLogin(props) {
    const loginWelcomeMessage = <h2>Welcome, {props.username}!</h2>
    const loginPromptMessage = <h2>Please log in to continue.</h2>

    return (
        props.isLoggedIn ? loginWelcomeMessage : loginPromptMessage
    )
}

UserLogin.PropTypes = {
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string
}

UserLogin.defaultProps = {
    isLoggedIn: false,
    username: 'Guest'
}

export default UserLogin