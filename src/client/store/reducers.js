import { combineReducers } from 'redux';

function currentUserReducer(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

export default rootReducer;
