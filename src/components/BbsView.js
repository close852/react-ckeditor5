import React,{useState} from 'react'
import MWEditor from '../components/editor/MWEditor'
import MWFileReader from '../components/filereader/MWFileReader'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
            width: '100%',
          },
          button: {
            margin: theme.spacing(1),
          },
          buttonInc:{
              display:'flex',
              justifyContent:'flex-end'
          }
    
      }));
      const classes = useStyles();

    //1. 본문내용 전송(기본항목, 에디터 본문)
    //2. file있다면, return 받은 articleid로 fileUpload
    const handlePreview=(e) => {
        e.preventDefault();
        console.log('handlePreview');
    }
    const handleTempSave=(e) => {
        e.preventDefault();
        console.log('handleTempSave');
    }
    const handleSubmit=(e) => {
        e.preventDefault();
        const {
            writer,
            title
        } = e.target;
        // console.log('handleSubmit',e.target);
        // console.log(data,e.target.writer,e.target.title.value);
        const data  = new FormData();
        const data2  = new FormData(e.target);
        data.append('test','test');
        data.append('title',title.value);
        data.append('writer',writer.value);
        data.append('content',content);
        console.log(data2.entries(),data.entries());
        for(var pair of data2.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
         }
         console.log('-------------------')
         for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
         }

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
                        variant="outlined"/>
                </div>
                <div>
                    <TextField
                        disabled //disabled 는 가져오질 않네... readonly로 해야하겠네
                        id="writer"
                        name="writer"
                        label="게시자"
                        defaultValue="최지우-고객지원팀"
                        // className={classes.textFieldInput}
                        margin="normal"
                        variant="outlined"/>
                </div>
                <div id="_editor" style={styles.editor}>
                    <MWEditor mode={mode} content={content} setContent={setContent}/>
                </div>
                <div id="fileAttach" style={styles.fileattach}>
                    <MWFileReader fileQueue={fileQueue} setFileQueue={setFileQueue}/>
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
