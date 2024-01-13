const newsRouter = require('./news');
const siteRouter = require('./site');
function routes(app) {
    app.use('/news', newsRouter);
    app.use('/', siteRouter);

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', function (req, res) {
        console.log(req.body);
        res.send('');
    });
}
module.exports = routes;
