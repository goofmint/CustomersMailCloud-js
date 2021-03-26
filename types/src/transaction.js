"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mail_1 = require("./mail");
var request = require("superagent");
var Transaction = /** @class */ (function () {
    function Transaction(type, client) {
        this._serverComposition = null;
        this._params = {};
        this._baseUrl = 'https://api.smtps.jp/transaction/v2/__TYPE__/__ACTION__.json';
        this._type = type;
        this._client = client;
    }
    Transaction.prototype.url = function (action) {
        return this._baseUrl.replace('__TYPE__', this._type).replace('__ACTION__', action);
    };
    Transaction.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, result, bounces, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = this._params;
                        params.api_user = this._client.apiUser;
                        params.api_key = this._client.apiKey;
                        if (this._serverComposition) {
                            params.server_composition = this._serverComposition;
                        }
                        else {
                            throw new Error('Server Composition is required.');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request
                                .post(this.url('list'))
                                .send(params)];
                    case 2:
                        result = _a.sent();
                        if (!result.body[this._type]) {
                            return [2 /*return*/, []];
                        }
                        bounces = result.body[this._type];
                        return [2 /*return*/, bounces.map(function (params) { return new mail_1.CMCMail(params); })];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error(e_1.response.text);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Transaction.prototype.setServerComposition = function (name) {
        this._serverComposition = name;
    };
    Transaction.prototype.setEmail = function (address) {
        this._params.email = address;
    };
    Transaction.prototype.setStatus = function (status) {
        this._params.status = status;
    };
    Transaction.prototype.setStartDate = function (date) {
        this._params.start_date = this.getDate(date);
    };
    Transaction.prototype.setEndDate = function (date) {
        this._params.end_date = this.getDate(date);
    };
    Transaction.prototype.setDate = function (date) {
        this._params.date = this.getDate(date);
    };
    Transaction.prototype.setHour = function (hour) {
        if (hour < 0 || hour > 23) {
            throw new Error('setHour allows the range from 0 to 23.');
        }
        this._params.hour = hour;
    };
    Transaction.prototype.setMinute = function (minute) {
        if (minute < 0 || minute > 59) {
            throw new Error('setMinute allows the range from 0 to 59.');
        }
        this._params.minute = minute;
    };
    Transaction.prototype.setPage = function (page) {
        this._params.p = page;
    };
    Transaction.prototype.setLimit = function (limit) {
        this._params.r = limit;
    };
    Transaction.prototype.getDate = function (d) {
        return d.getFullYear() + "-" + ('00' + (d.getMonth() + 1)).slice(-2) + "-" + ('00' + d.getDate()).slice(-2);
    };
    return Transaction;
}());
exports["default"] = Transaction;
