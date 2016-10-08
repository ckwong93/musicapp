import { connect } from 'react-redux';
import { login, logout, signup } from '../../actions/session_actions';
import Nav from './nav';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
