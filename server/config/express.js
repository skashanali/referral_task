var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Cross Domain Method
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Cache-Control, Authorization");
        if (req.method === 'OPTIONS') return res.status(204).end();
        return next();
    });
}
