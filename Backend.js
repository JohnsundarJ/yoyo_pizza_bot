"use strict";
exports.__esModule = true;
exports.Server = void 0;
var express = require("express");
var http = require("http");
var WatsonAssistant_1 = require("./WatsonAssistant");
var mongoClient = require("mongodb");
var path = require("path");
var dbo;
var orderID = 1000;
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.app.set("port", process.env.PORT || 5000);
        this.app.use(express.static(path.join(__dirname, '/dist/')));
        this.app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        });
        this.serv = http.createServer(this.app);
        this.serv.listen(5000, function () {
            console.log('started on port 5000');
        });
    }
    Server.prototype.SendBotMessage = function (msg) {
        io.emit('message', { type: 'new-message', text: msg });
    };
    Server.prototype.SendDBMessage = function (msg) {
        console.log(msg);
        io.emit('message', { type: 'new-message', text: msg });
    };
    Server.prototype.SendOption = function () {
        io.emit('message1', { type: 'new-message', option1: "Yes", option2: "No" });
    };
    return Server;
}());
exports.Server = Server;
var Ser = new Server();
var io = require('socket.io')(Ser.serv);
Ser.app.get('/', function (req, res) {
    res.redirect('http://localhost:4200/');
});
var uri = "mongodb+srv://john:john@cluster0.t1zs6.mongodb.net/yoyo?retryWrites=true&w=majority";
mongoClient.connect(uri, { useUnifiedTopology: true }, function (err, db) {
    dbo = db.db("yoyo");
});
io.on('connection', function (socket) {
    //let orderID = 0;
    console.log('user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    var context1;
    socket.on('message', function (message) {
        console.log("reached");
        // console.log("Message Received: " + message.text);
        var watsonAssistantObj = new WatsonAssistant_1.WatsonAssistant();
        var assistant = watsonAssistantObj.connectWatson();
        assistant.message({
            workspaceId: 'e4203e9d-7e37-4214-aebf-77bb9b0a152a',
            input: { 'text': message.text },
            context: context1
        }, function (err, response) {
            if (err)
                console.log('error:' + err);
            else {
                try {
                    context1 = response.result.context;
                    // console.log(context1);
                    if (context1.OrderPizza == true) {
                        // let OrderID = orderID+=1;
                        console.log(context1.pizza + "\n" + context1.mobile + "\n" + context1.quantity);
                        try {
                            // var temp;
                            // var max=dbo.collection("pizza").find({}).sort({OrderID:-1}).toArray();
                            // if(max.length==undefined){
                            // temp=10001;
                            // console.log(max.length)
                            // }
                            // else {
                            //     console.log(max[0].OrderID)
                            //     temp=max[0].OrderID+1;
                            // }
                            var max;
                            while (true) {
                                var te = 0;
                                max = Math.floor(100000 + Math.random() * 900000);
                                // max=275904;
                                var m1 = { OrderID: max };
                                dbo.collection("pizza").find(m1).toArray(function (err, result) {
                                    console.log(result.length);
                                    if (result.length > 0)
                                        te = 1;
                                });
                                if (te == 0)
                                    break;
                            }
                            dbo.collection("pizza").insertOne({ "OrderID": max, "Item": context1.pizza, "Quantity": context1.quantity, "mobile": context1.mobile, "OrderStatus": "Accepted" }, function (err, res) {
                                if (err) {
                                    Ser.SendDBMessage("Oops!Unable to process your request! Please try again after some time.");
                                }
                                else {
                                    Ser.SendDBMessage("Order Successful and Your Order ID: " + (max) + "\nYou can check your order status by using orderid\nWe will contact you soon");
                                }
                            });
                            context1 = {};
                        }
                        catch (err) {
                            console.log(err);
                            Ser.SendDBMessage("DB Error");
                        }
                    }
                    else if (context1.Track == true) {
                        dbo.collection("pizza").find({ "OrderID": context1.orderid }).toArray(function (err, result) {
                            if (err) {
                                Ser.SendDBMessage("Provided ID is not found or There is some technical issue, Please try later!");
                            }
                            else {
                                console.log(result[0]);
                                Ser.SendDBMessage("Order Details :\r\nOrder ID: " + result[0].OrderID + "\nItem Name: " + result[0].Item + "\nQuantity: " + result[0].Quantity + "\nOrder Status: " + result[0].OrderStatus);
                            }
                        });
                    }
                    else {
                        Ser.SendBotMessage(response.result.output.text);
                    }
                }
                catch (err) {
                    console.log(err);
                    Ser.SendBotMessage(response.result.output.text);
                }
            }
        });
    });
});
