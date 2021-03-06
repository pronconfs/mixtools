module.exports = (() => {

    const Pg = require('./utils/mPg/pg');

    function fnGetUsersGroupBreaks(domain, groupId) {

        const query =
            'SELECT name, max_time, start_time, end_time, billable, agent_permission, comments ' +
            'FROM fscontact.group_breaks ' +
            'WHERE domain = $1 AND group_id = $2 AND NOT deleted';

        return Pg.query({
            text: query,
            values: [domain, groupId]
        });
    }


    function fnInsertIssues(issueObj) {

        const query =
            'insert into jira.issues (issuekey, summary, assignee, createddate, updateddate, project, status) ' +
            'values ($1, $2, $3, $4, $5, $6, $7) RETURNING id';

        return Pg.query({
            text: query,
            values: [issueObj.issueKey, issueObj.summary, issueObj.assignee, issueObj.createddate, issueObj.updateddate, issueObj.project, issueObj.status]
        });
    }

    function fnInsertWorklog(wlogObj) {

        const query =
            'insert into jira.worklog (issuekey, reporter, updateddate, seconds, project) ' +
            'values ($1, $2, $3, $4, $5) RETURNING uuid';

        return Pg.query({
            text: query,
            values: [wlogObj.issueKey, wlogObj.reporter, wlogObj.updateddate, wlogObj.seconds, wlogObj.project]
        });
    }

    return {
        getUsersGroupBreaks: fnGetUsersGroupBreaks,
        InsertIssues: fnInsertIssues,
        InsertWorklog: fnInsertWorklog,

    };

})();