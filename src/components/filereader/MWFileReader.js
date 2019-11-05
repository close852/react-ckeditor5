import React from 'react'
import ReactFileReader from 'react-file-reader';
import axios from 'axios'
function MWFileReader() {
    let newFileList = [];
    let delFileList = [];
    let handleFileList = [];
    // const handleFiles = files => {

    //     let reader = new FileReader();


    //     console.log(files, files.length)
    //     for (let i = 0; i < files.length; i++) {
    //         let file = files[i];

    //         console.log('file', file);
    //         handleFileList.push(file);
    //     }
    //     console.log(handleFileList);
    //     // handleFileList
    // }
    const handleFiles = files => {
        var reader = new FileReader();
        reader.onload = (e) => {
            //Split csv file data by new line so that we can skip first row which is header
            let jsonData = reader.result.split('\n');
            console.log('jsonData > ', jsonData);
            let data = [];
            jsonData.forEach((element, index) => {
                if (index) {
                    //Split csv file data by comma so that we will have column data
                    const elementRaw = element.split(',');
                    console.log(element, index);
                    if (element) {
                        let param = {
                            'id': elementRaw[0],
                            'name': elementRaw[1],
                            'age': elementRaw[2],
                            'address': elementRaw[3]
                        }
                        data.push(param);
                    }
                }
            });
        }
        console.log("TCL: Dashboard -> reader.readyState", reader.readyState, files[0])
        reader.readAsText(files[0]);
    }


    const uploadFile = () => {
        console.log('uploadFile > ')
        console.log(handleFileList);
        let data = new FormData();
        data.append('data', '1234');
        axios.post('/api/upload/files', {
            data: 'aaa',
            files: handleFileList[0],
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }
    return (
        <div>
            <ReactFileReader fileTypes={["*"]} multipleFiles={true} handleFiles={handleFiles}>
                <button className='btn'>+</button>
            </ReactFileReader>
            <button onClick={uploadFile}>Upload</button>
        </div>

    )
}

export default MWFileReader
