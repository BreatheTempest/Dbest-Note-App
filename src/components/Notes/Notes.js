import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Split from 'react-split';
import './Notes.css';

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

	const [currentTitle, setCurrentTitle] = useState();

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
			title: `New Note`,
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	}

	function updateNote(text) {
		setNotes((oldNotes) => {
			const newArray = [];
			for (let note of oldNotes) {
				if (note.id === currentNoteId) {
					newArray.unshift({ ...note, body: text });
				} else {
					newArray.push(note);
				}
			}
			return newArray;
		});
	}

	function updateTitle(e) {
		setNotes((oldNotes) => {
			const newArray = [];
			for (let note of oldNotes) {
				if (note.id === currentNoteId) {
					newArray.unshift({ ...note, title: e.target.value });
				} else {
					newArray.push(note);
				}
			}
			return newArray;
		});
	}

	function findCurrentNote() {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	function deleteNote(event, noteId) {
		event.stopPropagation();
		setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
	}

	useEffect(() => {
		const currentNote = findCurrentNote();
		setCurrentTitle(currentNote ? currentNote.title : 'New Note');
	}, [notes, currentNoteId]);

	return (
		<main>
			{notes.length > 0 ? (
				<Split
					sizes={[25, 75]}
					direction="horizontal"
					className="split"
					gutterStyle={() => ({
						width: '1px',
					})}
				>
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor
							currentNote={findCurrentNote()}
							updateNote={updateNote}
							updateTitle={updateTitle}
							title={currentTitle}
						/>
					)}
				</Split>
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
