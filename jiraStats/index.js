var JiraApi = require('jira-client');
var db = require ('./dbJira');
var Q = require('q');

// Initialize
var jira = new JiraApi({
  protocol: 'https',
  host: 'jira.go-contact.com',
  username: 'proncon',
  password: 'n0qa',
  apiVersion: '2',
  strictSSL: false
});

  async function getIssuesByQuery(jql, returnFields) {
    try {
      const issue = await jira.searchJira(jql, returnFields);
      return issue;
      //console.log(JSON.stringify(issue));
    } catch (err) {
      console.error(err);
    }
  }

  function echoIssue(key, summary, eName, eStatus, eCreated, eUpdated) {
    console.log(key);
    console.log(summary);
    console.log(eName);
    console.log(eStatus);
    console.log(eCreated);
    console.log(eUpdated);
    console.log('WORKLOG');
  } 

  function echoWorkLog(eAuthor, eUpdated, eTimeSpent) {
    console.log(eAuthor);
    console.log(eUpdated);
    console.log(eTimeSpent);

  }

  function to(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
 }

  (async () => {
    let arrIssues = [];
    let arrLogs = [];
  //logIssueName('HEL-2803');
    let results;
    results = await getIssuesByQuery(
      //'project in ("GoContact - Contact Center", HEL)  and status changed TO "done" AFTER 2019-07-01', 
      'project in ("DES") and updated >= 2019-01-01', 
      {"maxResults":100000,"fields": ["summary", "status", "assignee", "description", "created", "updated"]}
    );

    for (const element of results.issues) {
      let eName = element.fields.assignee ? element.fields.assignee.name : null;
      let eStatus = element.fields.status ? element.fields.status.name : null;
      let eCreated = element.fields.created ? element.fields.created.split("T")[0] : null;
      let eUpdated = element.fields.updated ? element.fields.updated.split("T")[0] : null
      //echoIssue(element.key, element.fields.summary, eName, eStatus, eCreated, eUpdated)
      arrIssues.push([element.key,element.fields.summary, eName,
                      eStatus, eCreated, eUpdated]);

      let worklogs = await jira.getIssueWorklogs(element.id);
      for (const detailedLog of worklogs.worklogs) {
        let eUpdated = detailedLog.updated ? detailedLog.updated.split("T")[0] : null; 
        let eAuthor = detailedLog.updateAuthor ? detailedLog.updateAuthor.name : null;
        let eTimeSpent = detailedLog.timeSpentSeconds ? detailedLog.timeSpentSeconds : null; 
        //echoWorkLog(eAuthor, eUpdated, eTimeSpent)
        arrLogs.push([element.key, eAuthor, eUpdated, eTimeSpent]);
      }
      //console.log('\n----------------------------------------------\n');
    };
    //console.log(arrIssues);
    //console.log(arrLogs);
    for (const item of arrIssues) {
      console.log (item[0]);
   
        let obj = new Object();
        obj.issueKey = item[0];
        obj.summary = item[1];
        obj.assignee = item[2];
        obj.createddate = item[4];
        obj.updateddate = item[5];
        obj.status = item[3];
        obj.project =  item[0].split("-")[0];

        [err, res] = await to(db.InsertIssues(obj));
        if (err) console.log('!!!!!!!!!!!!!!!!!!!!!!!');
        console.log ('====>' + JSON.stringify(res));
    }

    for (const item of arrLogs) {
      console.log (item[0]);

      let obj = new Object();
      obj.issueKey = item[0];
      obj.reporter = item[1];
      obj.updateddate = item[2];
      obj.seconds = item[3]
      obj.project =  item[0].split("-")[0];
      console.log (JSON.stringify(obj));
      [err, res] = await to(db.InsertWorklog(obj));
      if (err) console.log('!!!!!!!!!!!!!!!!!!!!!!!');
      console.log ('====>' + JSON.stringify(res));
    }

  })()
