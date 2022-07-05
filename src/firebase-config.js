import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBoLg_iFHzcGHfn2ByC4HsWEKE1t5urfOo',
	authDomain: 'test-project-653cc.firebaseapp.com',
	projectId: 'test-project-653cc',
	storageBucket: 'test-project-653cc.appspot.com',
	messagingSenderId: '847613848991',
	appId: '1:847613848991:web:7ba5ff4d3016cb9bcb21aa',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
