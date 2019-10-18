var db = require ('./dbJira');

// Initialize

    const Pg = require('./utils/mPg/pg');

    function fnGetAll() {
        const query =
            //'SELECT id FROM  fscontact.call_log where sysdate is null limit 100';//            'WHERE domain = $1 AND NOT deleted';

            'SELECT id FROM  fscontact.call_log cl where to_char(cl.sysdate, \'YYYY-MM-DD HH24:MI:SS\')=\'2019-10-18 01:52:48\' limit 100';
            return Pg.query({
            text: query
        });
                  
    }

    function updateCall_log(dateTime, arrIDs) {

        const query =
            //'update fscontact.call_log set sysdate=$1 where id in ($2)';
            'update fscontact.call_log set sysdate=\''+dateTime+'\' where id in ('+arrIDs+')';

            console.log (query);
        return Pg.query({
            text: query//,
            //values: [dateTime, arrIDs]
        });
    }


function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function getDateTime() {
    let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

  function to(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
 }


  (async () => {

    //for (const element of results.issues) {
    //};
    let x=0;
    while (x!=1) {

        await sleep(1000);
        [err, res] = await to(fnGetAll());
        if (err) {
            console.log('!!!!!!!!!!!!!!!!!!!!!!!');
            x=1;
            process.exit(1);
        }

        let arr='';
        for (const element of res) {
            //console.log(JSON.stringify(element.id));
            arr= arr + element.id+',';
        };

        arr= arr.substring(0,arr.length - 1);
        if (arr.length==0) {
            x=1;
            console.log('-----------------------------------------');
            console.log('The End :)');
            console.log('-----------------------------------------');
                process.exit(0);
        }
        console.log('-----------------------------------------');
        console.log('-----------------------------------------');
        console.log(arr);
        console.log(getDateTime());
        [err, res] = await to(updateCall_log(getDateTime(), arr));
        if (err) console.log(err);
    }

})()
