const initialState = {
  loadComments: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALLOW_COMMENT_LOAD':
      return {
        ...state,
        loadComments: action.payload,
      };
    case 'DISALLOW_COMMENT_LOAD':
      return {
        ...state,
        loadComments: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
