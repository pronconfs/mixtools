var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var readLogStr = require('./searchLog');

var instream = fs.createReadStream('baseData.txt');
var outstream = new stream;

var cart = [];

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
    //    console.log(line);
    //    console.log('-------------------------------------------');

        let arrLine = line.split(' ');
        //console.log(arrLine[3]);

        let element = {};
        element.date = arrLine[0];
        element.uuid = arrLine[3];
        cart.push(element);
});

rl.on('close', function(line) {
        let final = [];
        // cart.forEach(function(item, index, array) {
        //     //console.log(item, index);
        //     console.log('log_'+item.date.replace(/-/gi,'') + ' => ' + item.uuid.replace(/callUuid:/gi,''));
        // });

         function workMyCollection(arr) {
            return arr.reduce((promise, item) => {
              return promise
                .then((result) => {
                  //console.log(`item ${item.uuid}`);
                  return readLogStr.ReadlogFile('log_'+item.date.replace(/-/gi,''),  item.uuid.replace(/callUuid:/gi,''))
                      .then (function (res) {
                        //console.log(res);
                        let str = '';
                        res.forEach(function(item, index, array) {
                            //console.log(item, index);
                            str = str + item.step + " ; ";
                        });  
                        console.log ('log_'+item.date.replace(/-/gi,'') + ' ; '+ item.uuid + ' ; ' +str);
                    }) //.then(result => final.push(result));
                })
                .catch(console.error);
            }, Promise.resolve());
          }
          
          workMyCollection(cart)
            .then(() => console.log(`FINAL RESULT is ${final}`));

})

rl.on('end', function() {

});

rl.on('error', function(line) {
        console.log('balllzz');
})

// readLogStr.ReadlogFile('log_20190123','402cf754-1f1a-11e9-8424-c71bca9734f4')
// .then (function (res) {
//     console.log(res);
//     let str = '';
//     res.forEach(function(item, index, array) {
//         //console.log(item, index);
//         str = str + item.step + " ; ";
//     });  
//     console.log ('log_20190123' + '=>'+ str);
// })
// .then (() => {
//     console.log('the endy.');
// })
// .catch(function (error) {
//     // oops, mom don't buy it
//     console.log(error.message);
//  // output: 'mom is not happy'
// });
