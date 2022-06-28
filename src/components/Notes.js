import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Split from 'react-split';

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

	function createNewNote() {
		const newNote = {
			id: nanoid(),
			body: "# Type your markdown note's title here",
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

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
					)}
				</Split>
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="first-note" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
