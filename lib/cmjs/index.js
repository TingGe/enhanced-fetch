"use strict";
/**
 * @file 对 window.fetch api封装，统一处理基于http的数据请求端与数据端的通信
 * @author 听歌<505253293@163.com>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions = {
    params: {},
    method: 'get',
    timeout: 0,
};
function createRequest(middlewares) {
    var _this = this;
    /** 检测response状态 */
    function checkStatus(response) {
        if (!response) {
            return Promise.reject(new Error("Invalid or null response data."));
        }
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error["response"] = response;
            return Promise.reject(error);
        }
    }
    /** 解析response数据 */
    function parseJSON(response) {
        var promise = Promise.resolve(response.text());
        return promise.then(function (data) {
            try {
                var _tmp = JSON.parse(data);
                data = _tmp;
            }
            catch (ex) {
                console.error("enhanced-fetch: parseJSON Failed", ex, response);
                return Promise.reject(new Error("Failed to parse JSON."));
            }
            return Promise.resolve({
                status: response.status,
                statusText: response.statusText,
                data: data,
                body: data,
                headers: response.headers
            });
        });
    }
    return function (url, options) {
        if (options === void 0) { options = defaultOptions; }
        return __awaiter(_this, void 0, void 0, function () {
            var response, res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, checkStatus(response)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, parseJSON(res)];
                    case 3:
                        json = _a.sent();
                        console.log(json);
                        return [2 /*return*/, json];
                }
            });
        });
    };
}
exports.createRequest = createRequest;
/**
 * 将各个中间件列表参数转换成中间件数组
 * @param middlewares 中间件参数列表
 */
function applyRequestMiddleware() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return middlewares;
}
exports.applyRequestMiddleware = applyRequestMiddleware;
//# sourceMappingURL=index.js.map