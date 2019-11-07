import React, { useState } from 'react';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';     // <--- ADDED
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Table from '@ckeditor/ckeditor5-table/src/table';

import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';


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
        console.log('editor.ui.componentFactory',editor.ui.componentFactory.names())
    }
    console.log('mode',mode , mode === "edit")
    const defaultToolbar = mode === "edit" ? ['heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'imageUpload', 'insertTable', '|', 'undo', 'redo','|','alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify'] : [];
    const editorConfig = {
        plugins:[Essentials,Table,Link,Paragraph,Alignment,Heading,Image,Bold,ImageResize,Italic,ImageUpload,ImageToolbar,ImageStyle,ImageCaption,BlockQuote,List],
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
        },
        image: {
            toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
            resizeUnit: 'px',
            styles: [
                // This option is equal to a situation where no style is applied.
                'full',
                // This represents an image aligned to the left.
                'alignLeft',
                // This represents an image aligned to the right.
                'alignRight'
            ]

        },
        alignment: {
            options: [ 'left', 'right','center','justify' ]
        },
    }
    return (
        <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={content}
            onInit={_init}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            disabled={mode !== "edit"} //readOnly
        />
    )
}

export default MWEditor
