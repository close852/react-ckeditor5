
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
//예제
//https://medium.com/@habibmahbub/basic-file-reader-with-react-js-80bf48d574da
//https://dotnetthoughts.net/how-to-upload-multiple-files-with-html5-and-jquery/
function MWFileReader({ accept, capture, multiple, fileQueue, setFileQueue }) {
    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }));
    const classes = useStyles();

    const styles = {
        root: {
            display: 'flex',
            width: '100%',
            height: '100%'
        },
        fileattach: {
            border: '1px solid #c4c4c4',
            width: '100%',
            height: '100%',
            'overflowY': 'auto',
        },
        fileselect: {
            border: '1px solid #c4c4c4',
            width: '10%',
            display: 'flex',
            'alignItems': 'center',
            'flexDirection': 'column',
            'justifyContent': 'space-around',
        },
        button: {
            width: '30px',
            height: '30px'
        },
        checkbox: {
            width: '15px',
            height: '15px'
        },
        fileItem: {
            width:'100%',
            display:'flex',
            flexBasis:'auto'
        },
        fileTitle: {
            width:'100%',
        }

    }

    const fileQueueMap = fileQueue.map(file => (
        <div key={file.name} >
            <label style={styles.fileItem}>
                <input style={styles.checkbox} name="filechk" type='checkbox' value={file.name} />
                <span style={styles.fileTitle}>{file.name}</span>
                <span >{Math.round(Number(file.size) / 1024, 2) + 'KB'}</span>
            </label>
        </div>
    ))

    const inputFileChanged = (e) => {
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            _addFileQueue(file);

            const data = new FormData();
            data.append('upload', file);
            data.append('filename', '이름1');
            data.append('test', 'test');

            console.log('data', data);
            axios.post('/api/upload', data).then(res => {
                console.log('success', res)
            }).catch(e => {
                console.log(e)
            })
        }
    }

    const removeFileHandler = () => {
        let files = document.getElementsByName("filechk");
        let tempQueue = [...fileQueue];
        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            if (fileName.checked) {
                tempQueue = _removeFileQueue(tempQueue, fileName.value);
            }
        }
        setFileQueue(queue => [...tempQueue]);
    }

    const _addFileQueue = file => {
        //[중복파일 체크]
        if (fileQueue.some(f => f.name === file.name)) {
            alert('이미 파일이 있습니다.!')
            return false;
        }
        setFileQueue(queue => [...queue, file]);
    }

    const _removeFileQueue = (tempQueue, fileName) => {
        tempQueue.forEach((item, idx, arr) => {
            console.log(idx, item)
            if (item.name === fileName) {
                console.log('correct!')
                tempQueue.splice(idx, 1);
            }
        })
        return tempQueue;
    }

    const dropHandler = (e) => {
        e.preventDefault();
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (e.dataTransfer.items[i].kind === 'file') {
                    var file = e.dataTransfer.items[i].getAsFile();
                    console.log('1> ... file[' + i + '].name = ' + file.name, file);
                    _addFileQueue(file);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                let file = e.dataTransfer.files[i];
                _addFileQueue(file);
                console.log('2> ... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
            }
        }
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    //1.더할때, 파일 빼기 목록에서 지우고, 더한다. 2. 뺄때, 빼기목록에 추가
    //3. 업로드시, 빼기목록에 없는 애들만 넘김
    return (
        <div style={styles.root}>
            <input type="file" id="contained-button-file" onChange={inputFileChanged} accept={Array.isArray(accept) ? accept.join(',') : accept} multiple={multiple} capture={capture} style={{ display: 'none' }} />
            <div style={styles.fileattach} onDrop={dropHandler} onDragOver={dragOverHandler}>{fileQueueMap}</div>
            <div style={styles.fileselect}>
                <label htmlFor="contained-button-file">
                    <Button variant="outlined" component="span" className={classes.button}>
                        +
                    </Button>
                </label>
                {/* <button style={styles.button} onClick={removeFileHandler}>-</button> */}
                {/* <span onClick={removeFileHandler}>-</span> */}
                <Button variant="outlined" component="span" className={classes.button} onClick={removeFileHandler}>
                    -
                </Button>

            </div>
        </div>
    );
}

MWFileReader.defaultProps = {
    accept: '*',
    capture: true,
    multiple: true
}
MWFileReader.propTypes = {
    accept: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    capture: PropTypes.bool,
    multiple: PropTypes.bool
}
export default MWFileReader;