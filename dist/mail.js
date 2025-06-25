"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMCMail = void 0;
class CMCMail {
    constructor(params) {
        this.fields = {};
        for (let key in params) {
            switch (key) {
                case 'created':
                    this.fields.created = new Date(params[key]);
                    break;
                case 'status':
                    this.fields.status = parseInt(params[key]);
                    break;
                default:
                    this.fields[key] = params[key];
                    break;
            }
        }
    }
}
exports.CMCMail = CMCMail;
