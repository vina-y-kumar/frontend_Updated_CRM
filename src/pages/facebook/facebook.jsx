import React, { useEffect } from 'react';

function FaceB() {
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1546607802575879',
        cookie     : true,
        xfbml      : true,
        version    : 'v19.0'
      });
        
      FB.AppEvents.logPageView();   
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []); // Ensure useEffect runs only once when the component mounts

  return null; // You can return null or a placeholder component
}

export default FaceB;
