import React from 'react';
import { useGoogleLogin } from 'react-google-login';

// refresh token
import { refreshTokenSetup } from './refreshToken';

const clientId =
  '636990724842-6f5rkktdm4lgadl5qr7rhnhc014vq4i8.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    refreshTokenSetup(res);
    console.log(res.profileObj)
    localStorage.setItem("name",  res.profileObj.name);
    localStorage.setItem("url", res.profileObj.imageUrl);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <button  onClick={signIn}
        type="button" class="login-with-google-btn" >
        Sign in with Google
    </button>
    
  );
}

export default Login;