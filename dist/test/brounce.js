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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src/");
const fs_1 = __importDefault(require("fs"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = JSON.parse(fs_1.default.readFileSync('./config.json', 'utf-8'));
    const api_user = config.api_user;
    const api_key = config.api_key;
    const client = new src_1.CustomersMailCloud(api_user, api_key);
    const bounce = client.bounce();
    bounce.setServerComposition('sandbox');
    bounce.setStartDate(new Date(2020, 10, 5));
    bounce.setLimit(100);
    const res = yield bounce.list();
    console.log(res);
    const delivery = client.delivery();
    delivery.setServerComposition('sandbox');
    delivery.setDate(new Date(2020, 10, 5));
    delivery.setLimit(100);
    const res2 = yield delivery.list();
    console.log(res2);
}))();
