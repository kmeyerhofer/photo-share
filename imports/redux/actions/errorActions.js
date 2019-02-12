export function addError(error) {
  return {
    type: 'ADD_ERROR_OBJECT',
    payload: error,
  };
}

export function removeError(error) {
  return {
    type: 'REMOVE_ERROR_OBJECT',
    payload: error,
  };
}
