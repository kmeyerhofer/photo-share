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

export function removeErrorById(errorId) {
  return {
    type: 'REMOVE_ERROR_BY_ID',
    payload: errorId,
  };
}
