import React from 'react';
import App from './App';
import './style.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const container = document.getElementById('root');
const root = createRoot(container);

const firebaseConfig = {
	apiKey: 'AIzaSyBoLg_iFHzcGHfn2ByC4HsWEKE1t5urfOo',
	authDomain: 'test-project-653cc.firebaseapp.com',
	projectId: 'test-project-653cc',
	storageBucket: 'test-project-653cc.appspot.com',
	messagingSenderId: '847613848991',
	appId: '1:847613848991:web:7ba5ff4d3016cb9bcb21aa',
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'books');
getDocs(colRef)
	.then((snapshots) => {
		let books = [];
		snapshots.docs.forEach((doc) => {
			books.push({ ...doc.data(), id: doc.id });
		});
		console.log(books[0].author);
	})
	.catch((err) => {
		console.log(err.message);
	});

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
