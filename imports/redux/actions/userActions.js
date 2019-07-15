export function toggleUserAdmin(userAuthed) {
  return{
    type: 'ALLOW_USER',
    payload: {userAuthed: true},
  };
}

export function resetUser() {
  return {
    type: 'RESET_USER',
    payload: {userAuthed: false},
  };
}
