
function PrivateRoute({ children, role }) {
  const token = JSON.parse(localStorage.getItem('token'))
 
  if (token && role === 'admin' || token && role === 'user') {
   return children;
  } else {
    location.href = '/'
  }
}

export default PrivateRoute;
