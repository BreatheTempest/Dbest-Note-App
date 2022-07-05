import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import Editor from './Editor';
import './Notes.css';
import chevron from '../../images/chevron.svg';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
	const [notes, setNotes] = useState(
		() => JSON.parse(localStorage.getItem('notes')) || []
	);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

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

	function createNewNote() {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		const date = new Date();
		const newNote = {
			id: nanoid(),
			body: 'Compose an epic...',
			date: `${new Intl.DateTimeFormat('en-US', options).format(date)}`,
			title: `New Note ${notes.length + 1}`,
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	}

	function updateNote(text) {
		setNotes((oldNotes) => {
			const newArray = [];
			for (let note of oldNotes) {
				if (note.id === currentNoteId) {
					if (typeof text === 'string')
						newArray.unshift({ ...note, body: text });
					else {
						newArray.unshift({ ...note, title: text.target.value });
					}
				} else {
					newArray.push(note);
				}
			}
			return newArray;
		});
	}

	function deleteNote(event, noteId) {
		event.stopPropagation();
		setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
	}

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
					{sidebarOpen && (
						<Sidebar
							notes={notes}
							currentNote={findCurrentNote()}
							setCurrentNoteId={setCurrentNoteId}
							currentNoteId={currentNoteId}
							newNote={createNewNote}
							deleteNote={deleteNote}
							sidebarOpen={sidebarOpen}
						/>
					)}
					<button
						className={`chevron `}
						onClick={() => setSidebarOpen((prevStatus) => !prevStatus)}
					>
						<img
							src={chevron}
							className={!sidebarOpen ? 'closed' : ''}
							alt=""
						/>
					</button>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
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
