export default {
  isAuthenticated: () => {
      return localStorage.getItem('token') ? true : false
  },
}
