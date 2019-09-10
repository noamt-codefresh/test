import Restify = require("restify");
import {plugins} from "restify";
import bodyParser = plugins.bodyParser;
import queryParser = plugins.queryParser;


const server = Restify.createServer();

/*server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        // Sets expose-headers.
        return next();
    }
);*/

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);


const users = {
    '1': {name: "noam", yearOfBirth: "1986", email: "noam.doron@microfocus.com"}
};

server.get('/dummy/:name', respond);
server.get('/noam', respond);
server.get('/users/:userId', userHandler);
server.post('/security/rest/client/login', respond);
server.post('/login', loginHandler);
server.post('/loginError', loginHandler);

server.use(bodyParser());
server.use(queryParser());
server.listen(4000, function() {
    console.log('%s listening at %s', server.name, server.url);
});

function respond(req: Restify.Request, res, next) {
    console.log("headers", req.headers);
    res.send('hello ' + req.params.name);
    next();
}

function userHandler(req: Restify.Request, res: Restify.Response, next) {
    const user = users[req.params.userId];
    if (!user){
        res.send(404,{error:"user not found"});
        return next();
    }

    try {
        res.send(user);
    } catch (e) {
        console.error(e);
    }finally {
        next();
    }

}

function loginHandler(req: Restify.Request, res, next) {
    const token = "123-456-789";
    try {
        if (req.path() === "/loginError") {
            throw new Error()
        }
        res.send({token});
    } catch (e) {
        console.error(e);
        res.send(400, e);
    }finally {
        next();
    }
}