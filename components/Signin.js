import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>HOMEWORK!!</h1>
      <p>Time To Put The Work In At Home</p>
      <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
        Lets Work
      </button>
    </div>
  );
}

export default Signin;
