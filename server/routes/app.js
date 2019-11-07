import express from 'express'
import fs from 'fs'
const router = express.Router();

const encode="utf-8";
//결재문서 조회시 버튼에 대한 권한, 수정가능 여부
router.get('/',   (req, res) => {
    console.log('여긴데..')
    const {
        appid,
        formid
    } = req.query;
    console.log(req.query)
    const query=req.query;
    let contentHTML="";
    //formid를 기준으로 DB에서 html 파일 가져와서 뿌려준다.
    //validation 스크립트 찾아서 실행하게 한다.
    if (!isEmpty(appid)) {
        console.log('왜 여기옴?',appid);
        contentHTML = appView(query);

    } else if (!isEmpty(formid)) {
        contentHTML =  draft(query);
        // console.log('contentHTML', contentHTML);
    } else {
        return res.status(500).send({error : "appid is null and formid is null"})
    }
    // contentHTML=`<html><body><div style='border:1px solid gray;width:700px;min-height:1000px;'></div></body></html>`
    return res.json({
        query,
        content : contentHTML
    })
})

const isEmpty=(object)=>{
    return object==="undefined" || object===undefined || object === null || object ==="null" || object ===""
}
const draft=  ({formid})=> {
    console.log('draft > formid',formid);
    // return fs.readFileSync('repository/FORM1.html',encode);
    return fs.readFileSync('D:/git/NOTEPAD/react-material-alpha/server/repository/FORM1.html',encode);
}

const appView=({appid, formid})=>{
    console.log('appView >',appid,formid);
}

export default router;