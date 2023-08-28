import {Component} from 'react'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userEmail: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isSubmitSuccess:false
  }

  onChangeUsername = event => {
    this.setState({userEmail: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("AccessToken", jwtToken, {expires:30})
    this.setState({isSubmitSuccess:true})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userEmail, password} = this.state
    const userDetails = {userEmail, password}
    const url = 'http://localhost:9000/login'
    const options = {
      method: 'POST',
      headers:{
        "Content-type":"application/json"
        },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      console.log(data)
      this.onSubmitSuccess(data.jwtToken)
    } else {
      this.onSubmitFailure(data)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {userEmail} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USEREMAIL
        </label>
        <input
          type="email"
          id="useremail"
          className="username-input-field"
          value={userEmail}
          onChange={this.onChangeUsername}
          placeholder="Useremail"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg,isSubmitSuccess} = this.state
    const checkToken = Cookies.get("AccessToken")
    if (checkToken !== undefined){
        return <Navigate to="/"/>
    }
    
    return ( (isSubmitSuccess ? <Navigate to='/'/> : ( 
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
                Login
            </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
      ))
    ) 
  }
}

export default Login
