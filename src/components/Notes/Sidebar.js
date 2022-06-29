import React from 'react';

export default function Sidebar(props) {
	console.log(props);
	const noteElements = props.notes.map((note, index) => (
		<div key={note.id}>
			<div
				className={`title ${
					note.id === props.currentNote.id ? 'selected-note' : ''
				}`}
				onClick={() => props.setCurrentNoteId(note.id)}
			>
				<h4 className="text-snippet">
					{note.body.split('\n')[0] || `Empty note ${index + 1}`}
				</h4>
				<p>{note.date}</p>
				<button
					className="delete-btn"
					onClick={(e) => props.deleteNote(e, note.id)}
				>
					<i className="gg-trash trash-icon"></i>
				</button>
			</div>
		</div>
	));
	return (
		<section className="pane sidebar">
			<button className="button" onClick={props.newNote}>
				Create Note
			</button>
			<h3>Notes</h3>
			<div className="notes">{noteElements}</div>
		</section>
	);
}
