import React from 'react';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import MWEditor from './components/editor/MWEditor'
import MWFileReader from './components/filereader/MWFileReader';
function App() {


  const mode = 'edit';// 'edit'!=='edit';
  const styles = {
    root: {
      width: '700px'
    },
    editor: {
      width: '100%',
      'padding': '2px'
    },
    fileattach: {
      width: '100%',
      height: '100px',
      border: '1px solid #c4c4c4'
    }
  }
  return (
    <div>
      <h2>File Upload</h2>
      <div style={styles.root}>
        <div><input name="title" type="text"></input></div>
        <div id="_editor" style={styles.editor}>
          <MWEditor mode={mode} />
        </div>
        <div id="fileAttach" style={styles.fileattach}>
          <MWFileReader />
        </div>
      </div>
    </div>
  );
}

export default App;
