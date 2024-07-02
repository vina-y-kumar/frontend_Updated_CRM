import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you are using react-router-dom v6 or higher

const InstaAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the fragment identifier (everything after the #)
    const hash = window.location.hash;
    // Remove the # at the beginning of the fragment identifier
    const hashParams = new URLSearchParams(hash.slice(1));
    // Get the access token
    const token = hashParams.get('access_token');


    if (token) {
      // Store the token in local storage
      localStorage.setItem('accessToken', token);
      // Redirect to the instapost page
      navigate('/instapost');
    }
  }, [navigate]);

  return (
    <div className='Instagramauth' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Optionally, you can add some loading text or spinner here */}
      <p>Authenticating...</p>
    </div>
  );
}

export default InstaAuth;
