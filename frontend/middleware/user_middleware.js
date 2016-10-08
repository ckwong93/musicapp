import { fetchUser, fetchUsers } from '../util/user_api_util';
import { requestUser, receiveUser, requestUsers, receiveUsers, UserConstants } from '../actions/user_actions';

export default ({getState, dispatch}) => next => action => {
  const userSuccess = data => dispatch(receiveUser(data));
  const usersSuccess = data => dispatch(receiveUsers(data));
  const result = next(action);
  switch(action.type){
    case UserConstants.REQUEST_USER:
      fetchUser(action.id, userSuccess);
      break;
    case UserConstants.REQUEST_USERS:
      fetchUsers(usersSuccess);
      break;
    default:
      break;
  }
  return result;
};
