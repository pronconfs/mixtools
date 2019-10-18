module.exports = (() => {

    const Pg = require('./utils/mPg/pg');

    /**
     * Gets all the breaks for the given domain.
     * @param domain
     * @returns {*}
     */
    function fnGetAll(domain) {
        const query =
            'SELECT * ' +
            'FROM fscontact.menu limit 1';//            'WHERE domain = $1 AND NOT deleted';

        return Pg.query({
            text: query//,
            //values: [domain]
        });
    }

    function fnGetAllTickets(domain) {
        const query = `
            SELECT TO_TIMESTAMP(t.timestamp / 1000) as "TicketDate", 
                t.id as "TicketId",
                    t.subject,
                t.status as "TicketStatus",
                q.name as "QueueName",
                cqu.username as "Agent",
                tc.commments as "ALLComments",
                te.episodes as "InPublicEp"
                FROM "fstickets"."ticket"  as t
                INNER join "fstickets"."queue" as q ON (t.queue_uuid = q.uuid )
                left JOIN LATERAL (
                    select array_agg(row_to_json(_tc1)) as commments
                from ( SELECT TO_TIMESTAMP(timestamp / 1000) as "date", comment
                FROM fstickets.ticket_comment as _tc
                Where _tc.ticket_uuid=t.uuid and comment ilike '%hel-%'
                ORDER BY _tc.timestamp desc
            )    _tc1
            ) as tc ON True
                left JOIN LATERAL (
                    select array_agg(row_to_json(_te1)) as episodes
                from (     SELECT TO_TIMESTAMP(timestamp / 1000) as "date", text_part
                FROM "fstickets"."ticket_episode"
                WHERE "object_type" = 'MAIL'
                AND ticket_uuid = t.uuid
                AND "type" = 'INBOUND'
                AND "visibility" = 'PUBLIC'
            )    _te1
            ) as te ON True
                left JOIN LATERAL (
                    SELECT u.username
                FROM "fstickets"."ticket_episode"
                inner join fscontact.users as u ON (u.id=user_id )
                WHERE "object_type" = 'CHANGEQUEUE'
                AND ticket_uuid = t.uuid AND "visibility" = 'PRIVATE'
                order by timestamp DESC Limit 1
            ) as cqu ON True
                WHERE --t.domain = '475a6370-edf3-4de6-a292-022928a6f7f2'
                --and
                t.status not in ('SPAM','CLOSED', 'MERGED')
                --and q.uuid = 'c9577a8c-8d13-4c42-9d4e-d97d9dda5a31'
                --  and q.name in ('L3 DEV', 'L2 DEV')';//            'WHERE domain = $1 AND NOT deleted';
            `;
        return Pg.query({
            text: query//,
            //values: [domain]
        });
    }


    /**
     * Gets all the breaks for the given user group of the given domain
     * @param domain
     * @param groupId
     * @returns {*}
     */
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

    function fnTiraCafe() {
        for(let i=0;i<1000;i++) {
        //    console.log('===================>' + i + '\n');
        }
    }

    return {
        getAll: fnGetAll,
        getUsersGroupBreaks: fnGetUsersGroupBreaks,
        TiraCafe: fnTiraCafe,
        fnGetAllTickets
    };

})();