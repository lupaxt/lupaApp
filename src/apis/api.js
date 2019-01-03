import firebase from "firebase/app";
// import * as moment from "moment";

//TODO
/** createReview createGroup
 createComment (BE: connect with Review, connect with User)

 **/

const api = {
  signOut: () => firebase.auth().signOut(),
  signIn: (username, password) =>
    firebase.auth().signInWithEmailAndPassword(username, password),
  register: (username, password) =>
    new Promise(function(resolve, reject) {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(response => {
          resolve(response.user);
          firebase.auth().currentUser.sendEmailVerification();
        })
        .catch(error => {
          reject(error);
          throw error;
        });
    }),

  resendEmailVerification: () =>
    firebase.auth().currentUser.sendEmailVerification(),
  sendPasswordResetEmail: email => firebase.auth().sendPasswordResetEmail(email)
};

export default api;
