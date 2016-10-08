import { connect } from 'react-redux';
import AppRouter from './router';

const mapStateToProps = state => {
  const currentUser = state.session.currentUser;
  return (
    currentUser
  );
};

export default connect(
  mapStateToProps
)(AppRouter);
