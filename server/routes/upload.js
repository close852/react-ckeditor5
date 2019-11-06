import express from 'express'
import fs from 'fs'
import formidable from 'formidable';
import pathUtil from 'path';

var uploadDir = __dirname + '/upload';
var imageDir = __dirname + '/image';
var publicDir = 'public/temp'
// 업로드 된 데이터 목록
var paintList = [];

const router = express.Router();


const encode = "utf-8";
//결재문서 조회시 버튼에 대한 권한, 수정가능 여부
router.post('/', (req, res) => {
    var form = formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const {filename} = fields;
        console.log('fields > ',fields)
        var title = files.upload.name;
        let real_path = files.upload.path;
        let size = files.upload.size;
        // console.log('files.upload',files.upload);
        var date = new Date();
        var newImageName = date.getTime();
        // console.log(newImageName);
        var ext = pathUtil.parse(title).ext;
        console.log(title, real_path, size, ext);
        // let lastDot = title.lastIndexOf(".");
        // let ext = title.substring(lastDot).toLowerCase();

        var newPath = publicDir + '/' + newImageName + ext;
        console.log(real_path, 'newPath ', newPath)
        console.log('--------fs.renameSync-------')
        await fs.rename(real_path, newPath, (err, data) => {
            if (err) {
                console.log('err.code !!!!', err.code)
                if (err.code === 'EXDEV') {
                    copy_and_delete(real_path, newPath);
                }
            }
        });
        // fs.move(real_path, newPath, function (err) { if (err) { console.error(err); } else { console.log("success!") } });
        //Cannot upload file: Login 화면.PNG.
        // console.log(uploadDir,imageDir,req.headers);
        // const url = 'http://192.168.1.176:3000/temp/' + newImageName + ext;
        const url = 'http://127.0.0.1:3000/temp/' + newImageName + ext;
        console.log(`post : url`, url, '여기온거맞지??');
        res.json({
            url
        })

    })

})
//결재문서 조회시 버튼에 대한 권한, 수정가능 여부
router.post('/files', (req, res) => {
    var form = formidable.IncomingForm();
    console.log('files', req.body, form);

    form.parse(req, (err, fields, files) => {
        console.log('여긴 안옴?')
        console.log('files', files)
        // console.log(files)
        //     // fs.move(real_path, newPath, function (err) { if (err) { console.error(err); } else { console.log("success!") } });
        //     //Cannot upload file: Login 화면.PNG.
        //     // console.log(uploadDir,imageDir,req.headers);
        //     const url = 'http://192.168.1.176:3000/temp/';
        //     console.log(`post : url`, url, '여기온거맞지??');
        //     res.json({
        //         url
        //     })

    })
    res.send({
        data: 'aa'
    })
})

function copy_and_delete(oldPath, newPath) {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    // readStream.on('error', callback);
    // writeStream.on('error', callback);
    // readStream.on('close', 
    //       function () {
    //         fs.unlink(oldPath, callback);
    //       }
    // );

    readStream.pipe(writeStream);
}



export default router;