"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = require("./mail");
const request = __importStar(require("superagent"));
class Transaction {
    constructor(type, client) {
        this._serverComposition = null;
        this._params = {};
        this._baseUrl = 'https://api.smtps.jp/transaction/v2/__TYPE__/__ACTION__.json';
        this._type = type;
        this._client = client;
    }
    url(action) {
        return this._baseUrl.replace('__TYPE__', this._type).replace('__ACTION__', action);
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this._params;
            params.api_user = this._client.apiUser;
            params.api_key = this._client.apiKey;
            if (this._serverComposition) {
                params.server_composition = this._serverComposition;
            }
            else {
                throw new Error('Server Composition is required.');
            }
            try {
                const result = yield request
                    .post(this.url('list'))
                    .send(params);
                if (!result.body[this._type]) {
                    return [];
                }
                const bounces = result.body[this._type];
                return bounces.map(params => new mail_1.CMCMail(params));
            }
            catch (e) {
                throw new Error(e.response.text);
            }
        });
    }
    setServerComposition(name) {
        this._serverComposition = name;
    }
    setEmail(address) {
        this._params.email = address;
    }
    setStatus(status) {
        this._params.status = status;
    }
    setStartDate(date) {
        this._params.start_date = this.getDate(date);
    }
    setEndDate(date) {
        this._params.end_date = this.getDate(date);
    }
    setDate(date) {
        this._params.date = this.getDate(date);
    }
    setHour(hour) {
        if (hour < 0 || hour > 23) {
            throw new Error('setHour allows the range from 0 to 23.');
        }
        this._params.hour = hour;
    }
    setMinute(minute) {
        if (minute < 0 || minute > 59) {
            throw new Error('setMinute allows the range from 0 to 59.');
        }
        this._params.minute = minute;
    }
    setPage(page) {
        this._params.p = page;
    }
    setLimit(limit) {
        this._params.r = limit;
    }
    getDate(d) {
        return `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${('00' + d.getDate()).slice(-2)}`;
    }
}
exports.default = Transaction;
