import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from './MyUploadAdapter'
import './MWEditor.css'
function MWEditor({ mode, content, setContent }) {
    const _onChange = (event, editor) => {
        // console.log('data : ', editor.getData());
        // console.log('_onChange.', editor);
        setContent(editor.getData())
    }

    const _onBlur = (event, editor) => {
        console.log('Blur.', editor);
    }

    const _onFocus = (event, editor) => {
        console.log('_onFocus.', editor);
    }
    const _init = (editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };

    }
    const defaultToolbar = mode === "edit" ? ['heading', '|', 'bold', 'italic', 'underline', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'imageUpload', 'insertTable', '|', 'undo', 'redo'] : [];
    const editorConfig = {
        toolbar: defaultToolbar,
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        },
        ckfinder: {
            uploadUrl: '/api/upload',
            options: {
                resourceType: 'Images'
            }
        }
    }
    return (
        <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={content}
            onInit={editor => { _init(editor) }}
            onChange={(event, editor) => { _onChange(event, editor) }}
            onBlur={(event, editor) => { _onBlur(event, editor) }}
            onFocus={(event, editor) => { _onFocus(event, editor) }}
            disabled={mode !== "edit"} //readOnly
        />
    )
}

export default MWEditor
