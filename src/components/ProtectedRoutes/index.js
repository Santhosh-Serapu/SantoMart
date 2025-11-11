import {useHistory, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoutes = props => {
  const history = useHistory()
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    history.replace('/login')
  }
  return <Route {...props} />
}
export default ProtectedRoutes
