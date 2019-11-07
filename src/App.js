import React from 'react';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import BbsView from './components/BbsView'
function App() {


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
