import React,{useState} from 'react';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import MyUploadAdapter from './MyUploadAdapter'
function App() {

  const [content , setContent] =useState('<p>Hello from CKEditor 5!</p>');
  const _onChange=(event,editor)=>{
    console.log('data : ',editor.getData());
    console.log( '_onChange.', editor );
    setContent(editor.getData())
  }

  const _onBlur=(event,editor)=>{
    console.log( 'Blur.', editor );
  }

  const _onFocus=(event,editor)=>{
    console.log( '_onFocus.', editor );
  }
  const _init =(editor)=>{
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
              return new MyUploadAdapter( loader );
          };
          
  }
  const editorConfig = {
      toolbar: [ 'heading', '|', 'bold', 'italic','underline' ,'|', 'link', 'bulletedList', 'numberedList', 'blockQuote','|','imageUpload','insertTable','|','undo','redo'],
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
  const mode = false;// 'edit'!=='edit';

  return (
    <div>
      <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          editor = { ClassicEditor }
          config ={editorConfig}
          data = {content}
          onInit = { editor => {_init(editor)}}
          onChange = {(event,editor)=>{_onChange(event,editor)}}
          onBlur =  {(event,editor)=>{_onBlur(event,editor)}}
          onFocus = {(event,editor)=>{_onFocus(event,editor)}}
          disabled ={mode} //readOnly
        />

    </div>
  );
}

export default App;
