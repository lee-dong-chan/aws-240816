"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var supertest_1 = require("supertest");
var express_1 = require("express");
var sequelize_typescript_1 = require("sequelize-typescript");
var dotenv_1 = require("dotenv");
var todo_1 = require("./todo");
var Todo_1 = require("../models/Todo");
(0, dotenv_1.config)();
// jest.mock("../model/Todo");
jest.mock("sequelize-typescript", function () {
    var _a;
    var actual = jest.requireActual("sequelize-typescript");
    return __assign(__assign({}, actual), { Sequelize: jest.fn(function () { return ({
            sync: jest.fn(),
        }); }), Model: (_a = /** @class */ (function (_super) {
                __extends(MocKModel, _super);
                function MocKModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return MocKModel;
            }(actual.Model)),
            _a.create = jest.fn(),
            _a.findByPk = jest.fn(),
            _a.findAll = jest.fn(),
            _a) });
}); // 모조품으로 대체
// jest.mock("../services/todo", () => ({
//   add: jest.fn().mockReturnValue(1), // 1내보냄
//   getList: jest.fn().mockResolvedValue(1).mockRejectedValue(2), //프로미스 함수 성공 실패 결과
//   patchTodo: jest.fn((num: number) => {
//     if (num == 1) return "one";
//     if (num == 2) return "two";
//     if (num == 3) return "three";
//   }),
//   deleteTodo: jest.fn(),
// }));
describe("Test Todo", function () {
    var app;
    var todoInstance;
    beforeEach(function () {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use("/todo", todo_1.default);
        todoInstance = {
            id: 1,
            title: "test todo list",
            isCompleted: false,
            save: jest.fn(),
            destroy: jest.fn(),
        };
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    test("test Mock", function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockFunk, sequelize;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockFunk = jest.fn().mockReturnValue("hi!");
                    sequelize = new sequelize_typescript_1.Sequelize({
                        dialect: "mysql",
                        host: process.env.MYSQL_HOST,
                        username: process.env.MYSQL_USER,
                        password: process.env.MYSQL_PASSWORD,
                        database: process.env.MYSQL_DATABASE,
                        port: 3334,
                    });
                    return [4 /*yield*/, sequelize.sync()];
                case 1:
                    _a.sent();
                    expect(mockFunk()).toBe("hi!");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Test Add Todo Item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Todo_1.default.create.mockResolvedValue(todoInstance);
                    return [4 /*yield*/, (0, supertest_1.default)(app)
                            .post("/todo")
                            .send({ title: "test todo list" })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body).toEqual({
                        id: 1,
                        title: "test todo list",
                        isCompleted: false,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test("Test Failed Add Todo Item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).post("/todo").send({})];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.body).toEqual({
                        errorMsg: "plz input title",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test("Test Get List", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Todo_1.default.findAll.mockResolvedValue([todoInstance]);
                    return [4 /*yield*/, (0, supertest_1.default)(app).get("/todo")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual([
                        {
                            id: 1,
                            title: "test todo list",
                            isCompleted: false,
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Test Update Todo Item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Todo_1.default.findByPk.mockResolvedValue(todoInstance);
                    return [4 /*yield*/, (0, supertest_1.default)(app)
                            .patch("/todo")
                            .send({ id: 1, isCompleted: true })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual({
                        id: 1,
                        title: "test todo list",
                        isCompleted: true,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test("Test Delete Todo Item", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Todo_1.default.findByPk.mockResolvedValue(todoInstance);
                    Todo_1.default.findAll.mockResolvedValue([]);
                    return [4 /*yield*/, (0, supertest_1.default)(app).delete("/todo/1")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Test Add Todo Items", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Todo_1.default.findAll.mockResolvedValue([
                        {
                            id: 2,
                            title: "test todo list",
                            isCompleted: false,
                        },
                        {
                            id: 3,
                            title: "test todo list",
                            isCompleted: false,
                        },
                    ]);
                    return [4 /*yield*/, (0, supertest_1.default)(app).post("/todo").send({ title: "test todo list" })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app).post("/todo").send({ title: "test todo list" })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app).get("/todo")];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual([
                        {
                            id: 2,
                            title: "test todo list",
                            isCompleted: false,
                        },
                        {
                            id: 3,
                            title: "test todo list",
                            isCompleted: false,
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
