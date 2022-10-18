import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    // console.log('google coming soon');
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error: ', error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      })

  }

  return (
    <div className="App">
      {/* condition ? true : false */}

      {user.email ?
        <button onClick={handleSignOut}>Sign Out</button> :

        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button>Github Sign In</button>

        </>
      }

      {user.email &&
        <div>
          <h3>
            User name: {user.displayName}
          </h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
