import React from 'react';
import remove from '../../images/remove.svg';

export default function Sidebar(props) {
	const noteElements = props.notes.map((note, index) => (
		<div key={note.id}>
			<div
				className={`note ${
					note.id === props.currentNote.id ? 'selected-note' : ''
				}`}
				onClick={() => props.setCurrentNoteId(note.id)}
				style={{ animationDuration: `${0.5 + index / 10}s` }}
			>
				<div className="top-row">
					<h2 className="note-title">{note.title}</h2>
					<button
						className="delete-btn"
						onClick={(e) => props.deleteNote(e, note.id)}
					>
						<img src={remove} alt="" />
					</button>
				</div>
				<p className="note-description">
					{note.body.split('\n')[0].match(/[\w\s.,]/g, '') || `Empty note`}
				</p>
				<p className="note-date">{note.date}</p>
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
