import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId =
  '636990724842-6f5rkktdm4lgadl5qr7rhnhc014vq4i8.apps.googleusercontent.com';

function Logout() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
    localStorage.removeItem("name");
    localStorage.removeItem("url");
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="logoutButton">
      <span className="logoutText">Log out</span>
    </button>
  );
}

export default Logout;