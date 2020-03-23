import app from 'firebase/app';

const config = {
  apiKey: "AIzaSyC-YOg7KgP4wgOqajU-yMFArCAtP9ejLR4",
  authDomain: "covid-pk-dd7eb.firebaseapp.com",
  databaseURL: "https://covid-pk-dd7eb.firebaseio.com",
  projectId: "covid-pk-dd7eb",
  storageBucket: "covid-pk-dd7eb.appspot.com",
  messagingSenderId: "285718882243",
  appId: "1:285718882243:web:ab9fe3e8a0dbce754fbf76"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;