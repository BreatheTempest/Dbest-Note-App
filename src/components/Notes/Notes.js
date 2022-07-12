import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import Editor from './Editor';
import './Notes.css';
import chevron from '../../images/chevron.svg';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { useAuth } from '../../context/AuthContext';
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	setDoc,
	onSnapshot,
	query,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';

export default function Notes() {
	const { currentUser } = useAuth();
	const userId = currentUser.uid;
	const notesRef = collection(db, `${userId}-notes`);
	const orderedNotes = query(notesRef, orderBy('createdAt', 'desc'));

	useEffect(() => {
		onSnapshot(orderedNotes, async () => {
			const data = await getDocs(orderedNotes);
			const notesArray = data.docs.map((doc) => doc.data());
			setNotes(notesArray);
		});
	}, []);

	const [notes, setNotes] = useState(() => []);

	const [currentNoteId, setCurrentNoteId] = useState(
		(notes[0] && notes[0].id) || ''
	);

	const [sidebarOpen, setSidebarOpen] = useState(true);

	const navigate = useNavigate();

	// Change route when note changes
	useEffect(() => {
		if (notes.length > 0) {
			navigate(`${findCurrentNote().id}`);
		}
		if (notes.length === 0) {
			navigate('');
		}
	}, [notes]);

	const createNewNote = async () => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		const date = new Date();
		const id = nanoid();
		const newNote = {
			id: id,
			title: `New Note ${notes.length + 1}`,
			body: 'Compose an epic...',
			date: `${new Intl.DateTimeFormat('en-US', options).format(date)}`,
			createdAt: serverTimestamp(),
		};
		await setDoc(doc(db, `${userId}-notes`, id), newNote);
		setCurrentNoteId(newNote.id);
	};

	const updateNote = async (text) => {
		const userDoc = doc(db, `${userId}-notes`, currentNoteId);
		const update =
			typeof text === 'string' ? { body: text } : { title: text.target.value };
		await updateDoc(userDoc, update);
	};

	const deleteNote = async (event, noteId) => {
		event.stopPropagation();
		const userDoc = doc(db, `${userId}-notes`, noteId);
		await deleteDoc(userDoc);
	};

	function findCurrentNote() {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	return (
		<main>
			{notes.length > 0 ? (
				<>
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						currentNoteId={currentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
						sidebarOpen={sidebarOpen}
					/>
					<button
						className={`chevron ${!sidebarOpen ? '' : 'closed'}`}
						onClick={() => setSidebarOpen((prevStatus) => !prevStatus)}
					>
						<img
							src={chevron}
							className={!sidebarOpen ? 'closed' : ''}
							alt=""
						/>
					</button>
					{notes.length > 0 && (
						<Editor
							currentNote={findCurrentNote()}
							updateNote={updateNote}
							sidebarOpen={sidebarOpen}
						/>
					)}
				</>
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="button" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
