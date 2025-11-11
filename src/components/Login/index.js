import {CgProfile} from 'react-icons/cg'
import {RiLockLine, RiLockUnlockLine} from 'react-icons/ri'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory, Redirect} from 'react-router-dom'
import './index.css'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setIschecked] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const onUserNameChange = event => setUsername(event.target.value)
  const onPasswordChange = event => setPassword(event.target.value)
  const onshowPassword = () => setIschecked(prev => !prev)
  const isFormFilled = username && password
  const onLogin = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token)
      history.push('/')
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  const jwtToke = Cookies.get('jwt_token')
  if (jwtToke !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <div className="container container1"> </div>
      <div className="container container2"> </div>
      <div className="container container3"> </div>
      <div className="container container4"> </div>
      <div>
        <form className="login-form" onSubmit={onLogin} autoComplete="on">
          <img
            src="https://res.cloudinary.com/drji3ydue/image/upload/v1761320602/6fad20838855997d164dd88d885fad87bdfa3be6_or1vpx.png"
            alt="login website logo"
            className="login-website-logo"
          />
          <label htmlFor="username" className="login-labels">
            Username
          </label>
          <div className="username-container">
            <CgProfile className="profile-icon" />
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="login-inputs"
              onChange={onUserNameChange}
              value={username}
              autoComplete="username"  
            />
          </div>

          <label htmlFor="password" className="login-labels">
            Password
          </label>
          <div className="username-container">
            {isChecked ? (
              <RiLockUnlockLine className="profile-icon" />
            ) : (
              <RiLockLine className="profile-icon" />
            )}
            <input
              type={isChecked ? 'text' : 'password'}
              id="password"
              placeholder="Enter password"
              className="login-inputs"
              onChange={onPasswordChange}
              value={password}
               autoComplete="current-password"
            />
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox-input"
              onChange={onshowPassword}
            />
            <label htmlFor="checkbox" className="show-password-lable">
              Show Password
            </label>
          </div>
          <button
            type="submit"
            disabled={!isFormFilled}
            className={isFormFilled ? 'active-login-btn' : 'login-btn'}
          >
            Login
          </button>
          <p>{errorMsg}</p>
        </form>
      </div>
    </div>
  )
}
export default Login
