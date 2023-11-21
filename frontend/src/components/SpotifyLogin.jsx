import React from 'react';
import { loginEndpoint } from '../spotify';

function SpotifyLogin() {
  return (
    <div className='spotify-login'>
      <p>Authorize to Spotify to get access to vast library of music</p>
      <a href={loginEndpoint}><button className='front-page-button front-page-button-main'>LOG IN</button></a>
    </div>
  )
}

export default SpotifyLogin;
