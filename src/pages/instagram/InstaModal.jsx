import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import './InstaModal.css';

const InstaModal = ({ show, onClose, onLoginSuccess }) => {
  if (!show) {
    return null;
  }

  const handleFacebookLogin = (response) => {
    if (response.status === 'connected') {
      onLoginSuccess(response.authResponse.accessToken);
      onClose();
    } else {
      console.error('Facebook login error:', response);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login with Facebook</h2>
        <FacebookProvider appId="1644966666244727">
          <LoginButton
            scope="public_profile,email,pages_manage_posts"
            onCompleted={handleFacebookLogin}
            onError={(error) => console.error('Facebook login error:', error)}
          >
            Login with Facebook
          </LoginButton>
        </FacebookProvider>
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InstaModal;
