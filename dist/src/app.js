"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Restify = require("restify");
const restify_1 = require("restify");
var bodyParser = restify_1.plugins.bodyParser;
var queryParser = restify_1.plugins.queryParser;
const micromatch = require("micromatch");
const minimatch = require("minimatch");
/*const patterns = micromatch.braces('{config/!**!/{test-,test1}*.json,src/!**,/lib/!**}');
const result = micromatch(['src/app.ts', 'config/dir1/test-glob.json', 'config/dir2/some-other-file.json'], patterns);
const miniMatchResult = minimatch('src/app.ts', '{/config/!**!/{test-,test1}*.json,src/!**,/lib/!**}');

const defectPatterns = micromatch.braces('{services/go/{backup-*,common,org-{engine,worker,api},vendor},services/{mon-*,org-{ui,gateway}}}/!**');
const defectResult = micromatch(['services/go/org-api/cmd/robot/main.go', 'services/go/saas-api/pkg/statuspage/statuspage.go'], defectPatterns);*/
const fileList = ['src/app.ts', 'config/dir1/test-glob.json', 'config/dir2/some-other-file.json'];
//const pattern = '{config/**/{test-*,job-*}.json,src/**}';
const pattern = '{config/**,src/**}';
const patterns1 = micromatch.braces(pattern);
const patterns2 = ['config/**', 'apple/**'];
const resul1t = micromatch(fileList, patterns1);
const minimatchResult = fileList.filter(minimatch.filter(pattern));
const server = Restify.createServer();
/*server.use(
stam
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        // Sets expose-headers.
        return next();
    }
);*/
const corsMiddleware = require('restify-cors-middleware');
console.log("sa");
const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});
server.pre(cors.preflight);
server.use(cors.actual);
const users = {
    '1': { name: "noam", yearOfBirth: "1986", email: "noam.doron@microfocus.com" }
};
server.get('/dummy/:name', respond);
server.get('/noam', respond);
server.get('/users/:userId', userHandler);
server.post('/security/rest/client/login', respond);
server.post('/login', loginHandler);
server.post('/loginError', loginHandler);
server.use(bodyParser());
server.use(queryParser());
server.listen(4000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
function respond(req, res, next) {
    console.log("headers", req.headers);
    res.send('hello ' + req.params.name);
    next();
}
function userHandler(req, res, next) {
    const user = users[req.params.userId];
    if (!user) {
        res.send(404, { error: "user not found" });
        return next();
    }
    try {
        res.send(user);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        next();
    }
}
function loginHandler(req, res, next) {
    const token = "123-456-789";
    try {
        if (req.path() === "/loginError") {
            throw new Error();
        }
        res.send({ token });
    }
    catch (e) {
        console.error(e);
        res.send(400, e);
    }
    finally {
        next();
    }
}
//# sourceMappingURL=app.js.map