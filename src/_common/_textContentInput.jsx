import React, { Component } from "react";
import PropType from "prop-types";
import { useState, useEffect, useRef } from "react";

import { Editor } from '@tinymce/tinymce-react';

export default function TextContentEditor(props) {
	const [state, setState] = useState(props.value)
	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			console.debug(editorRef.current.getContent());
		}
	};

	function onChange(value, editor) {
		props.onChange(props.name, editor.getContent({ format: 'html' }));
	}

	return (
		<div>
			{props.isAdmin && <Editor
				apiKey="6a3ogrkehpwf1monrucbwhg2ltwph29lgixnnqqwa5d79x30"
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue={state}
				onEditorChange={onChange}
				init={{
					plugins: 'link directionality lists advlist',
					menubar: false,
					directionality: 'ltr',
					link_default_protocol: 'https',
					link_assume_external_targets: 'https',
					default_link_target: '_self',
					fontsize_formats: "64px",
					toolbar: 'undo redo | formatselect | ' +
						'fontsizeselect | ' +
						'bold italic underline | link unlink | ' +
						'bullist numlist | ' + 'ltr rtl | ' +
						'alignleft aligncenter alignright alignjustify | ' +
						'removeformat',
					inline: true,
					link_context_toolbar: true
				}}
			/>}
			{!props.isAdmin && <div dangerouslySetInnerHTML={{ __html: props.value }}></div>}
		</div>
	);
}