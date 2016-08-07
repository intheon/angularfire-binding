# angularfire-binding
learning both the angularfire flow &amp; firebases api reference

- needed to see how the $firebaseObject reads/writes to the db,
- also needed to handle the user case of retrieving a guest profile if logged out,and the actual user profile when logged in
- used $firebaseAuth with signInWithEmailAndPassword for the guest (just set up a dummy account), and $signInWithPopup("google") for the actual account.

###to build###

- install npm and jspm globally (jspm is wayyyyy better than the others!! :))
- run `npm install` then `jspm install`
- change your details if need be in `client/js/src/mainController.js`
- finally run `npm start`
