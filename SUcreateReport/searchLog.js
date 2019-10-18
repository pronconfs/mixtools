var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

function ReadlogFile(filePath, uuid, promise) {
    return new Promise((resolve, reject) => {

    var cart = [];
    let lastItem;

    var instream = fs.createReadStream('/var/log/fscontact/'+filePath);
    var outstream = new stream;

    outstream.readable = true;
    outstream.writable = true;

    var rl = readline.createInterface(
        {
            input: instream,
            output: outstream,
            terminal: false
        }
    );

    rl.on('line', function(line) {
        let element = {};
        if (line.indexOf(uuid)!==-1 && line.indexOf('ownerName')!==-1) {
            let tempStr = line.split('ownerName":"');
            let tempStr2= tempStr[1].split('","');
            if (tempStr2[0].length>1) {
                if (lastItem !== tempStr2[0]) {
                    lastItem = tempStr2[0]
                    element.step = tempStr2[0];
                    cart.push(element);
                    //console.log(tempStr2[0]);
                    //console.log('-------------------------------------------');
                }
            }
        }
    });
    rl.on('close', function(line) {
        //console.log(str);
        arr = cart;
        resolve(arr);
    })
    rl.on('error', function(line) {
        console.log('balllzz');
    })
    rl.on("finish", () => { resolve(true) });
    })
};

// ReadlogFile('log_20190123','402cf754-1f1a-11e9-8424-c71bca9734f4')
//     .then (function (res) {
//         console.log(res);
//         let str = '';
//         res.forEach(function(item, index, array) {
//             //console.log(item, index);
//             str = str + item.step + " ; ";
//         });  
//         console.log ('log_20190123' + '=>'+ str);
//     })
//     .then (() => {
//         console.log('the endy.');
//     })
//     .catch(function (error) {
//         // oops, mom don't buy it
//         console.log(error.message);
//      // output: 'mom is not happy'
//     });

    module.exports = {  
        ReadlogFile: ReadlogFile
    }
