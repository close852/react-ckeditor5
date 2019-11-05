
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//예제
//https://medium.com/@habibmahbub/basic-file-reader-with-react-js-80bf48d574da
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
    inputFileChanged(e) {
        if (window.FileReader) {
            let file = e.target.files[0];
            let reader = new FileReader()
            let self = this;
            console.log(e.target.files);
            // reader.onload = function (r) {
            //     self.setState({
            //         src: r.target.result
            //     });
            // }
            // reader.readAsDataURL(file);
            // self.setState({ value: reader });
        }
        else {
            alert('Soryy, your browser does\'nt support for preview');
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