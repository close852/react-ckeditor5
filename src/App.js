import React from 'react';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import MWEditor from './components/editor/MWEditor'
import MWFileReader from './components/filereader/MWFileReader';
import BbsView from './components/BbsView'
function App() {


  const mode = 'edit';// 'edit'!=='edit';
  const styles = {
    root: {
      width: '700px'
    },
  }
  return (
    <div>
      <div style={styles.root}>
        <BbsView/>
      </div>
    </div>
  );
}

export default App;
