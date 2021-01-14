import firebase from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: 'AIzaSyCoNlsz2Dj-SrVTvRxo4qY8jfDnruU6c7g',
    authDomain: 'imageify-3a9bb.firebaseapp.com',
    projectId: 'imageify-3a9bb',
    storageBucket: 'imageify-3a9bb.appspot.com',
    messagingSenderId: '913598373927',
    appId: '1:913598373927:web:e10d408a85ae5cf1746e02',
    measurementId: 'G-8BXTFNQKL5',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const projectStorage = firebase.storage();

export { projectStorage };
