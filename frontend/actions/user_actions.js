export const UserConstants = {
  RECEIVE_USER: "RECEIVE_USER",
  REQUEST_USER: "REQUEST_USER",
  REQUEST_USERS: "REQUEST_USERS",
  RECEIVE_USERS: "RECEIVE_USERS",
};

export const requestUser = id => ({
  type: UserConstants.REQUEST_USER,
  id
});

export const receiveUser = user => ({
  type: UserConstants.RECEIVE_USER,
  user
});

export const requestUsers = () => ({
  type: UserConstants.REQUEST_USERS
});

export const receiveUsers = users => ({
  type: UserConstants.RECEIVE_USERS,
  users
});
