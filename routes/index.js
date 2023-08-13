var express = require('express');
var router = express.Router();
const Session = require("supertokens-node/recipe/session/framework/express");

router.get('/session', Session.verifySession({sessionRequired: false}), async (req, res, next) => {
    const session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData(),
    });
});
  
module.exports = router;