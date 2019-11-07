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


router.get('/',(req,res)=>{
    console.log('???');
    res.json({
        data:'data???'
    })
})
const encode = "utf-8";
//결재문서 조회시 버튼에 대한 권한, 수정가능 여부
router.post('/', (req, res) => {
    console.log('router.post 여기가 article인데...')
    var form = formidable.IncomingForm();
    form.multiples = true;
    //content 등, 기본 메모리 2MB
    // form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, async (err, fields, files) => {
        console.log('fields > ',fields)
        if(files.upload){
            console.log('여기안옴',files.upload.length)
            let uploadList = files.upload;
            uploadList.forEach(async (file,idx,arr)=>{
                var title = file.name;
                let real_path = file.path;
                let size = file.size;
                var date = new Date();
                var newImageName = date.getTime();
                var ext = pathUtil.parse(title).ext;
                console.log(title, real_path, size, ext);
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
                const url = 'http://127.0.0.1:3000/temp/' + newImageName + ext;
                console.log(`post : url`, url, '여기온거맞지??');
            })
        }
        res.json({
            'test':'test'
        })

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