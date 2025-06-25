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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersMailCloud = void 0;
const request = __importStar(require("superagent"));
const transaction_1 = __importDefault(require("./transaction"));
class CustomersMailCloud {
    constructor(apiUser, apiKey) {
        this._type = 0;
        this._to = [];
        this._cc = [];
        this._bcc = [];
        this._from = {};
        this._envfrom = null;
        this._replyto = null;
        this._headers = {};
        this._charset = 'UTF-8';
        this._attachments = [];
        this.apiUser = apiUser;
        this.apiKey = apiKey;
        this._subdomain = null;
        this._subject = null;
        this._text = null;
        this._html = null;
    }
    pro(subdomain) {
        this._subdomain = subdomain;
        this._type = 3;
        return this;
    }
    trial() {
        this._type = 1;
        return this;
    }
    standard() {
        this._type = 2;
        return this;
    }
    addTo(name, address) {
        this._to.push({ name, address });
        return this;
    }
    addCC(name, address) {
        this._cc.push({ name, address });
        return this;
    }
    addBcc(name, address) {
        this._bcc.push({ name, address });
        return this;
    }
    setFrom(name, address) {
        this._from = { name, address };
        return this;
    }
    setEnvFrom(address) {
        this._envfrom = address;
        return this;
    }
    setReplyTo(address) {
        this._replyto = address;
        return this;
    }
    setHeader(key, value = null) {
        if (value === null) {
            if (!this._headers[key])
                return this;
            delete this._headers[key];
            return this;
        }
        this._headers[key] = value;
        return this;
    }
    setCharset(str) {
        this._charset = str;
        return this;
    }
    setSubject(str) {
        this._subject = str;
        return this;
    }
    setText(str) {
        this._text = str;
        return this;
    }
    setHtml(str) {
        this._html = str;
        return this;
    }
    addAttachments(path) {
        this._attachments.push(path);
        return this;
    }
    url() {
        switch (this._type) {
            case 1:
                return 'https://sandbox.smtps.jp/api/v2/emails/send.json';
            case 2:
                return 'https://te.smtps.jp/api/v2/emails/send.json';
            case 3:
                return `https://${this._subdomain}.smtps.jp/api/v2/emails/send.json`;
            default:
                throw new Error('利用種別を選んでください。 trial() / standard() / pro(subdomain)');
        }
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                api_user: this.apiUser,
                api_key: this.apiKey,
                to: this._to,
                cc: this._cc,
                bcc: this._bcc,
                from: this._from,
                subject: this._subject,
                text: this._text,
            };
            if (this._html)
                params.html = this._html;
            if (this._envfrom)
                params.envfrom = this._envfrom;
            if (this._replyto)
                params.replyto = this._replyto;
            if (this._headers && Object.keys(this._headers).length > 0) {
                params.headers = this._headers;
            }
            if (this._charset)
                params.charset = this._charset;
            const req = request.post(this.url());
            if (this._attachments.length > 0) {
                req.type('form');
                params.attachments = this._attachments.length;
                for (let key in params) {
                    req.field(key, typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]);
                }
                for (let i = 0; i < this._attachments.length; i++) {
                    req.attach(`attachment${i + 1}`, this._attachments[i]);
                }
            }
            else {
                req.send(params);
            }
            try {
                const result = yield req;
                return result.body;
            }
            catch (e) {
                return {};
            }
        });
    }
    bounce() {
        return new transaction_1.default('bounces', this);
    }
    block() {
        return new transaction_1.default('blocks', this);
    }
    delivery() {
        return new transaction_1.default('deliveries', this);
    }
}
exports.CustomersMailCloud = CustomersMailCloud;
