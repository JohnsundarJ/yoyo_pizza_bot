"use strict";
exports.__esModule = true;
exports.WatsonAssistant = void 0;
var auth_1 = require("ibm-watson/auth");
var assistantV1 = require("ibm-watson/assistant/v1");
var mongoClient = require("mongodb");
var dbo;
var WatsonAssistant = /** @class */ (function () {
    function WatsonAssistant() {
    }
    WatsonAssistant.prototype.connectWatson = function () {
        var assistant = new assistantV1({
            authenticator: new auth_1.IamAuthenticator({ apikey: '-XMq3n2VEscf2pDwtB4XztBN0MRH2_1VIBSr7mX8nu6e' }),
            version: '2018-09-20',
            url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com'
        });
        //  new watson.AssistantV1({
        //     iam_apikey: '',
        //     version: '2018-09-20',
        //     url: 'https://gateway.watsonplatform.net/assistant/api'
        //     });
        return assistant;
    };
    WatsonAssistant.prototype.connectDB = function () {
        var Obj;
        mongoClient.connect("mongodb://ramakrishna7032:LOtoqYvDI8TzIVQ46A6ydjVbHiliLvWfzwUejI7KFUbhucgIfzivlXeG2WTDOKPr0hHPySzFbpbenmWksnLVxw==@ramakrishna7032.documents.azure.com:10255/?ssl=true&replicaSet=globaldb", { useNewUrlParser: true }, function (err, db) {
            dbo = db.db("ContactDetails");
        });
        return dbo;
    };
    return WatsonAssistant;
}());
exports.WatsonAssistant = WatsonAssistant;
