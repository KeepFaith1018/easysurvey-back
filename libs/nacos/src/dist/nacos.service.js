"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.NacosService = void 0;
var common_1 = require("@nestjs/common");
var nacos_1 = require("nacos");
var NacosService = /** @class */ (function () {
    function NacosService() {
        this.logger = new common_1.Logger();
        var logger = console;
        this.client = new nacos_1.NacosNamingClient({
            logger: logger,
            serverList: '127.0.0.1:8848',
            namespace: 'public',
            username: 'nacos',
            password: 'nacos'
        });
    }
    NacosService.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.ready()];
                    case 1:
                        _a.sent();
                        this.logger.debug('Nacos连接成功');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 注册服务实例到 Nacos
     */
    NacosService.prototype.registerService = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Nacos] Registering service: " + instance.serviceName);
                        return [4 /*yield*/, this.client.registerInstance(instance.serviceName, {
                                ip: instance.ip,
                                port: instance.port,
                                instanceId: '',
                                healthy: true,
                                enabled: true
                            })];
                    case 1:
                        _a.sent();
                        this.logger.debug(instance.serviceName + "," + instance.ip + "," + instance.port + "\u6CE8\u518C\u6210\u529F");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 注销服务实例
     */
    NacosService.prototype.deregisterService = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("[Nacos] Deregistering service: " + instance.serviceName);
                        return [4 /*yield*/, this.client.deregisterInstance(instance.serviceName, {
                                ip: instance.ip,
                                port: instance.port,
                                instanceId: '',
                                healthy: false,
                                enabled: false
                            })];
                    case 1:
                        _a.sent();
                        this.logger.debug(instance.serviceName + "," + instance.ip + "," + instance.port + "\u9500\u6BC1\u6210\u529F");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 服务发现
     */
    NacosService.prototype.discoverService = function (serviceName) {
        return __awaiter(this, void 0, Promise, function () {
            var instances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAllInstances(serviceName)];
                    case 1:
                        instances = _a.sent();
                        console.log("[Nacos] Discovered instances for " + serviceName + ":", instances);
                        return [2 /*return*/, instances.map(function (instance) { return ({
                                ip: instance.ip,
                                port: instance.port,
                                serviceName: serviceName
                            }); })];
                }
            });
        });
    };
    NacosService = __decorate([
        common_1.Injectable()
    ], NacosService);
    return NacosService;
}());
exports.NacosService = NacosService;
