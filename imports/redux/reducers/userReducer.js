const initialState = {
  userAuthed: false
}

const userReducer = (state=initialState, action) => {
  switch(action.type){
    case 'ALLOW_USER':
      return Object.assign({}, state, {userAuthed: true});

    case 'RESET_USER':
      return Object.assign({}, state, {userAuthed: false});

    default:
      return state
  }
}

export default userReducer;
