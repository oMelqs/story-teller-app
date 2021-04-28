"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var Poetry_1 = __importDefault(require("./services/Poetry"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
function logRequests(request, response, next) {
    var method = request.method, url = request.url;
    var logLabel = "[" + method.toUpperCase + " " + url + "]";
    console.time(logLabel);
    next(); // Próximo middleware
    console.timeEnd(logLabel);
}
app.use(logRequests);
app.get('/daily', function (req, res) {
    Poetry_1.default.get('random').then(function (data) {
        res.json(data.data);
    });
});
//GET all author from poetry
app.get('/authors', function (req, res) {
    Poetry_1.default.get('author').then(function (response) {
        res.json(response.data);
    });
});
//GET all titles of a specific author from poetry
app.post('/author', function (req, res) {
    var author = req.body.author;
    console.log(req.body);
    Poetry_1.default.get('author/' + author + '/title').then(function (response) {
        res.json(response.data);
    });
});
app.post('/title', function (req, res) {
    var title = req.body.title;
    Poetry_1.default.get('title/' + title).then(function (response) {
        res.json(response.data);
    });
});
app.listen(3333, function () {
    console.log('Pikachu, i choose you!');
});
