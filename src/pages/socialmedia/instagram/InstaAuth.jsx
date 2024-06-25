import React from 'react';


const InstaAuth = () => {
 


  
  const handleInstaAuth = () => {
    window.location.href = 'https://www.facebook.com/v20.0/dialog/oauth?client_id=1546607802575879&redirect_uri=https://crm.nuren.ai/instagrampost/&scope=pages_show_list,instagram_basic&response_type=token';
  };

  

  return (
    <div className='Instagramauth' style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <h1>Instagram Authentication</h1>
      
        <button onClick={handleInstaAuth} style={{padding:'2rem', backgroundColor:'red',borderRadius:'8px',color:'white',fontSize:'20px'}}>Get Instagram Auth</button>
    
    </div>
  );
}

export default InstaAuth;
