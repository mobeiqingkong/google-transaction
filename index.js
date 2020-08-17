const translate = require('./google-translate-api');
let fs = require("fs");
let _ = require("lodash")
let oriData = require('./testJson.json');
async function trans(oriData) {
    let transData = {};
    for (let key in oriData) {
        if (_.isObject(oriData[key])) {
            transData[key] = await trans(oriData[key]);
        } else {
            let trans = await translate(oriData[key], {
                to: 'en'
            })
            transData[key] = trans.text;
            console.log("trans", trans);
        }
        // .then(res => {
        //     console.log(res.text);
        //     //=> I speak English
        //     console.log(res.from.language.iso);
        //     //=> nl
        // }).catch(err => {
        //     console.error(err);
        // });
    }
    return transData;
    // writeData('.', "transData.json", transData)
}

function writeData(path, dataName, data) {
    fs.writeFile('./' + path + '/' + dataName, JSON.stringify(data), function (err) {
        if (err) console.log('写' + dataName + '数据操作失败')
        else {
            console.log('写' + dataName + '数据操作成功')
        }
    })
}

let init = async () => {
    let data = await trans(oriData);

    writeData('.', "transData.json", data)
}

init()