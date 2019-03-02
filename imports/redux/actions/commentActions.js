export function commentLoad() {
  return {
    type: 'ALLOW_COMMENT_LOAD',
    payload: true,
  };
}

export function resetCommentLoad() {
  return {
    type: 'DISALLOW_COMMENT_LOAD',
    payload: false,
  };
}
