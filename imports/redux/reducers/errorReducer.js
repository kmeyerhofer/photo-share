const initialState = {
  errors: [],
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ERROR_OBJECT':
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case 'REMOVE_ERROR_OBJECT':
      return {
        ...state,
        errors: state.errors.filter(item => item.id !== action.payload.id),
      };
    default:
    return state;
  }
  // return state;
};

export default errorReducer;
