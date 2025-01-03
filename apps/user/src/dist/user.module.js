"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var user_controller_1 = require("./user.controller");
var user_service_1 = require("./user.service");
var prisma_1 = require("@libs/prisma");
var redis_1 = require("@libs/redis");
var nacos_1 = require("@libs/nacos");
var nest_winston_1 = require("nest-winston");
var winston = require("winston");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        common_1.Module({
            imports: [
                nest_winston_1.WinstonModule.forRootAsync({
                    useFactory: function () { return ({
                        level: 'debug',
                        transports: [
                            new winston.transports.File({
                                filename: process.cwd() + "/log"
                            }),
                            new winston.transports.Console({
                                format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike())
                            }),
                        ]
                    }); }
                }),
                prisma_1.PrismaModule,
                redis_1.RedisModule,
                nacos_1.NacosModule,
            ],
            controllers: [user_controller_1.UserController],
            providers: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
