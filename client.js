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
var request = require("superagent");
var bounce_1 = require("./bounce");
var CustomersMailCloud = /** @class */ (function () {
    function CustomersMailCloud(apiUser, apiKey) {
        this._type = 0;
        this._subdomain = null;
        this._to = [];
        this._from = {};
        this._subject = null;
        this._text = null;
        this._html = null;
        this._attachments = [];
        this.apiUser = apiUser;
        this.apiKey = apiKey;
    }
    CustomersMailCloud.prototype.pro = function (subdomain) {
        this._subdomain = subdomain;
        this._type = 3;
        return this;
    };
    CustomersMailCloud.prototype.trial = function () {
        this._type = 1;
        return this;
    };
    CustomersMailCloud.prototype.standard = function () {
        this._type = 2;
        return this;
    };
    CustomersMailCloud.prototype.addTo = function (name, address) {
        this._to.push({ name: name, address: address });
        return this;
    };
    CustomersMailCloud.prototype.setFrom = function (name, address) {
        this._from = { name: name, address: address };
        return this;
    };
    CustomersMailCloud.prototype.setSubject = function (str) {
        this._subject = str;
        return this;
    };
    CustomersMailCloud.prototype.setText = function (str) {
        this._text = str;
        return this;
    };
    CustomersMailCloud.prototype.setHtml = function (str) {
        this._html = str;
        return this;
    };
    CustomersMailCloud.prototype.addAttachments = function (path) {
        this._attachments.push(path);
        return this;
    };
    CustomersMailCloud.prototype.url = function () {
        switch (this._type) {
            case 1:
                return 'https://sandbox.smtps.jp/api/v2/emails/send.json';
            case 2:
                return 'https://te.smtps.jp/api/v2/emails/send.json';
            case 3:
                return "https://" + this._subdomain + ".smtps.jp/api/v2/emails/send.json";
            default:
                throw new Error('利用種別を選んでください。 trial() / standard() / pro(subdomain)');
        }
    };
    CustomersMailCloud.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, req, key, i, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            api_user: this.apiUser,
                            api_key: this.apiKey,
                            to: this._to,
                            from: this._from,
                            subject: this._subject,
                            text: this._text
                        };
                        if (this._html)
                            params.html = this._html;
                        req = request.post(this.url());
                        if (this._attachments.length > 0) {
                            req.type('form');
                            params.attachments = this._attachments.length;
                            for (key in params) {
                                req.field(key, typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]);
                            }
                            for (i = 0; i < this._attachments.length; i++) {
                                req.attach("attachment" + (i + 1), this._attachments[i]);
                            }
                        }
                        else {
                            req.send(params);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, req];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.body];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, {}];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CustomersMailCloud.prototype.bounce = function () {
        return new bounce_1["default"](this);
    };
    return CustomersMailCloud;
}());
exports["default"] = CustomersMailCloud;
