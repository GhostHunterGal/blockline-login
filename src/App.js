import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
   // console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
   // console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handlesignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(()=> {
    /* global google */
    google.accounts.id.initialize({
      client_id: "511643028320-lusrnlb8pmqs4hef552edljphvtekppl.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    if (Object.keys(user).length === 0) { // Add this condition to show the prompt when the user is signed out
      google.accounts.id.prompt();
    }

    // added a new event listener to prevent the prompt from disappearing when the user clicks anywhere on the page
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", cancel_on_tap_outside: false } // added the cancel_on_tap_outside option and set it to false
    );
  }, [user]);
  //if we have no user: sign in button
  //If we have aus user: show the log out button

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length !==0 &&
        <button onClick={ (e) => handlesignOut() }>Sign Out</button>
      }
   
      {
        user &&
        <div>
          <img src={user.picture} alt=""></img>
          <h3>{ user.name }</h3>
        </div>
      }
    </div>
  );
}

export default App;
