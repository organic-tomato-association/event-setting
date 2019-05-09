import firebase from 'firebase';
import '@firebase/firestore';
import firebaseConfig from './config.js';
import ReduxSagaFirebase from 'redux-saga-firebase';

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);