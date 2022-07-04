"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const http_exception_filter_1 = require("./../http-exception.filter");
const cats_service_1 = require("./cats.service");
const common_1 = require("@nestjs/common");
let CatsController = class CatsController {
    constructor(CatsService) {
        this.CatsService = CatsService;
    }
    getAllcat() {
        throw new common_1.HttpException({ success: false, message: 'api is broken' }, 401);
        return 'all cat';
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getAllcat", null);
__decorate([
    (0, common_1.Get)(':id'),
    __metadata("design:type", Object)
], CatsController.prototype, "", void 0);
CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [cats_service_1.CatsService])
], CatsController);
exports.CatsController = CatsController;
{
    getOneCat();
    {
        return 'one cat';
    }
}
createCat();
{
    return 'create cat';
}
updateCat();
{
    return 'update cat';
}
updatePartialCat();
{
    return;
}
deleteCat();
{
    return 'delete cat';
}
//# sourceMappingURL=cats.controller.js.map