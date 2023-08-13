const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");

function init() {
    supertokens.init({
        framework: 'express',
        supertokens: {
            connectionURI: 'https://try.supertokens.io',
            apiKey: null
          },
        appInfo: {
            appName: 'test',
            websiteDomain:`http://localhost:3000`,
            apiDomain: `http://localhost:3001`,
        },
        recipeList: [
            EmailVerification.init({ mode: "REQUIRED" }),
            EmailPassword.init(),
            Session.init({
                errorHandlers: {
                    onUnauthorised: (message, request, response, next) => {
                        console.log(message)
                    },
                }
            })
        ]
    });
}

module.exports = init;