import React from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import { getDefaultToolbarCommands } from 'react-mde';

export default function Editor({ currentNote, updateNote }) {
	const [selectedTab, setSelectedTab] = React.useState('write');

	const converter = new Showdown.Converter({
		tables: true,
		simplifiedAutoLink: true,
		strikethrough: true,
		tasklists: true,
	});

	const commands = getDefaultToolbarCommands();

	return (
		<section className="pane editor">
			<input
				className="editor-title"
				type="text"
				placeholder="Change Title"
				value={currentNote.title}
				onChange={(e) => updateNote(e)}
			/>
			<ReactMde
				value={currentNote.body}
				onChange={updateNote}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
				generateMarkdownPreview={(markdown) =>
					Promise.resolve(converter.makeHtml(markdown))
				}
				minEditorHeight={80}
				heightUnits="vh"
				toolbarCommands={commands}
			/>
		</section>
	);
}
