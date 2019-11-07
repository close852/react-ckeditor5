import React, { useState } from 'react'
import MWEditor from '../components/editor/MWEditor'
import MWFileReader from '../components/filereader/MWFileReader'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
function BbsView() {
  const [content, setContent] = useState('');
  const [fileQueue, setFileQueue] = useState([]);


  const mode = 'edit';// 'edit'!=='edit';
  const styles = {
    root: {
      width: '700px'
    },
    editor: {
      width: '100%',
    },
    fileattach: {
      width: '100%',
      height: '100px',
    },

  }
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
    },
    textFieldInput: {
      width: '150px',
    },
    button: {
      margin: theme.spacing(1),
    },
    buttonInc: {
      display: 'flex',
      justifyContent: 'flex-end'
    }

  }));
  const classes = useStyles();

  //1. 본문내용 전송(기본항목, 에디터 본문)
  //2. file있다면, return 받은 articleid로 fileUpload
  const handlePreview = (e) => {
    e.preventDefault();
    console.log('handlePreview');
  }
  const handleTempSave = (e) => {
    e.preventDefault();
    console.log('handleTempSave');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('handleSubmit',e.target);
    // console.log(data,e.target.writer,e.target.title.value);
    const data = new FormData(e.target);
    //파일추가만포함
    //더 추가되야하는것 : 수정로직에서 기존 파일,신규파일,삭제파일 구분처리 필요,
    fileQueue.forEach((value,idx,arr)=>{
      data.append('upload',value);
    })
    console.log(data.entries());
    for (var pair of data.entries()) {
      console.log(pair[0] + ',, ' + pair[1]);
    }


    axios.post('/api/article',data)
    .then(res=>{
      console.log(res)
    });
  }

  return (
    <div>
      <form id="bbsForm" name="bbsForm" onSubmit={handleSubmit}>
        <div>
          <TextField
            id="title"
            name="title"
            label="문서제목"
            className={classes.textField}
            margin="normal"
            variant="outlined" />
        </div>
        <div>
          <TextField
            id="writerDisp"
            name="writerDisp"
            label="게시자"
            defaultValue="최지우"
             className={classes.textFieldInput}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />&nbsp;
          <TextField
            id="deptDisp"
            name="deptDisp"
            label="부서명"
            defaultValue="고객지원팀"
             className={classes.textFieldInput}
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <input type="hidden" id="writer" name="writer" value="jiwoo" />
          <input type="hidden" id="deptid" name="deptid" value="DEPT01" />
        </div>
        <div id="_editor" style={styles.editor}>
        <input type="hidden" id="content" name="content" value={content} />
          <MWEditor mode={mode} content={content} setContent={setContent} />
        </div>
        <div id="fileAttach" style={styles.fileattach}>
          <MWFileReader fileQueue={fileQueue} setFileQueue={setFileQueue} />
        </div>
        <div className={classes.buttonInc}>
          <Button variant="contained" color="default" className={classes.button} onClick={handlePreview}>미리보기</Button>
          <Button variant="contained" color="default" className={classes.button} onClick={handleTempSave}>임시저장</Button>
          <Button variant="contained" type="submit" color="secondary" className={classes.button} >글쓰기</Button>
        </div>
      </form>
    </div>
  )
}

export default BbsView
