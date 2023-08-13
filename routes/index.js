var express = require('express');
var router = express.Router();
const Session = require("supertokens-node/recipe/session");
const SessionMiddleware = require("supertokens-node/recipe/session/framework/express");

router.get('/login', SessionMiddleware.verifySession({sessionRequired: false}), async (req, res, next) => {
    let session = req.session;
    if(!session) {
        session = await Session.createNewSession(res, '1234');
    }
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData(),
    });
});

router.get('/refresh', Session.verifySession({sessionRequired: true}), async (req, res) => {
    await Session.refreshSession(req, res)
        .then(async refreshedSession => {
            console.log(refreshedSession);
            res.end('Session refreshed');
        })
        .catch(err => {
            console.log('refresh Error:', err);
            res.end('could not refresh:\n\r' + JSON.stringify(err));
        });
})
  
module.exports = router;