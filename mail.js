"use strict";
exports.__esModule = true;
exports.CMCMail = void 0;
var CMCMail = /** @class */ (function () {
    function CMCMail(params) {
        this.fields = {};
        for (var key in params) {
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
    return CMCMail;
}());
exports.CMCMail = CMCMail;
