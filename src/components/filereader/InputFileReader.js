
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//예제
//https://medium.com/@habibmahbub/basic-file-reader-with-react-js-80bf48d574da
//https://dotnetthoughts.net/how-to-upload-multiple-files-with-html5-and-jquery/
class InputFileReader extends Component {
    constructor() {
        super();
        this.state = {
            src: '',
            value: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.inputFileChanged = this.inputFileChanged.bind(this);
    };
    handleClick() {
        let input = this.refs.input_reader;
        input.click();
    };
    inputFileChanged_new(e) {
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            /*
            const xhr = this.xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/upload/files', true);
            xhr.responseType = 'json';
            
            const data = new FormData();
            data.append('upload', file);
            this.xhr.send(data);
         */
            const data = new FormData();
            data.append('upload', file);

            axios.post('/api/upload/files', data)
        }
    }
    inputFileChanged(e) {
        console.log('inputFileChanged22!')
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const data = new FormData();
            data.append('upload', file);
            axios.post('/api/upload', data).then(res => {
                console.log('success', res)
            }).catch(e => {
                console.log(e)
            })
        }
    }
    inputFileChanged_single(e) {
        console.log('inputFileChanged!')
        let files = e.target.files;
        console.log('files.length', files.length);
        let self = this;
        for (let i = 0; i < files.length; i++) {
            console.log('files[i]', files[i]);
            let file = files[i];
            console.log('실행함?', file);
            let reader = new FileReader();
            console.log('onload!! 전', file.name);
            // console.log('reader.onload', f.target.result, file.name)
            const data = new FormData();
            data.append('upload', file);
            axios.post('/api/upload/files', data).then(res => {
                console.log('success', res)
            }).catch(e => {
                console.log(e)
            })
        }
    }
    //1.더할때, 파일 빼기 목록에서 지우고, 더한다. 2. 뺄때, 빼기목록에 추가
    //3. 업로드시, 빼기목록에 없는 애들만 넘김
    render() {
        const { accept, capture, multiple } = this.props, { src, value } = this.state;
        return (
            <div>
                <button onClick={this.handleClick}>+</button>
                <button >-</button>
                <input type="file" ref="input_reader" accept={Array.isArray(accept) ? accept.join(',') : accept} multiple={multiple} capture={capture} style={{ display: 'none' }} onChange={this.inputFileChanged} />

            </div>
        );
    }
}
InputFileReader.defaultProps = {
    accept: '*',
    capture: true,
    multiple: true
}
InputFileReader.propTypes = {
    accept: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    capture: PropTypes.bool,
    multiple: PropTypes.bool
}
export default InputFileReader;