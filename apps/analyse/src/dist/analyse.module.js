"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnalyseModule = void 0;
var common_1 = require("@nestjs/common");
var analyse_controller_1 = require("./analyse.controller");
var analyse_service_1 = require("./analyse.service");
var nacos_1 = require("@libs/nacos");
var nest_winston_1 = require("nest-winston");
var winston = require("winston");
var AnalyseModule = /** @class */ (function () {
    function AnalyseModule() {
    }
    AnalyseModule = __decorate([
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
                nacos_1.NacosModule,
            ],
            controllers: [analyse_controller_1.AnalyseController],
            providers: [analyse_service_1.AnalyseService]
        })
    ], AnalyseModule);
    return AnalyseModule;
}());
exports.AnalyseModule = AnalyseModule;
