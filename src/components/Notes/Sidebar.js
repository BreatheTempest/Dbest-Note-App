import React from 'react';
import remove from '../../images/remove.svg';
import { Link } from 'react-router-dom';

export default function Sidebar(props) {
	const noteElements = props.notes.map((note, index) => (
		<div className="note-container" key={note.id}>
			<Link to={note.id}>
				<div
					className={`note ${
						note.id === props.currentNote.id ? 'selected-note' : ''
					}`}
					onClick={() => props.setCurrentNoteId(note.id)}
					style={{ animationDuration: `${0.5 + index / 10}s` }}
				>
					<h2 className="note-title">{note.title}</h2>
					<p className="note-description">
						{note.body.split('\n')[0].match(/[\w\s.,]/g, '') || `Empty note`}
					</p>
					<p className="note-date">{note.date}</p>
				</div>
			</Link>
			<button
				className="delete-btn"
				onClick={(e) => {
					e.stopPropagation();
					props.deleteNote(e, note.id);
				}}
			>
				<img src={remove} alt="" />
			</button>
		</div>
	));
	return (
		<section className={`pane sidebar`}>
			<button className="button" onClick={props.newNote}>
				Create Note
			</button>
			<h3>Notes</h3>
			<div className="notes">{noteElements}</div>
		</section>
	);
}
