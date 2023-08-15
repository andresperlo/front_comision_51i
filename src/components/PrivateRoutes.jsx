
function PrivateRoute({ children, role }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const roleUser = JSON.parse(localStorage.getItem('role'))
 
  if (token) {
    if(role === roleUser){
      return children;
    }else{
      if(roleUser === 'admin'){
        location.href = '/admin'
      }else{
        location.href = '/user'
      }
    }
  } else {
    location.href = '/'
  }
}

export default PrivateRoute;
