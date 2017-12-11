import React from 'react';
import Popup from './Popup';
import Actions from '../../actions';

class LoginPopup extends React.Component {
  handleLogin = () => {
    Actions.login();
    this.props.hidePopup();
};

  render() {
    return (
      <Popup {...this.props} style="login-popup">
        <img src="/img/logo.png" className='logo'/>
        <h1>Login to Join The Community</h1>
        <br/>
        <p>The Endorsed is an online community where you can share and geek out about the latest websites and products. Join us today!</p>
        <button className="facebook-btn" onClick={this.handleLogin} >Login with Facebook</button>
        <p>We'll never post to Facebook without your permission.</p>
      </Popup>
    );
  }
}

export default LoginPopup;
