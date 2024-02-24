module.exports = function SortMiddleware(req, res, next){
    res.locals._sort = {
        enabled: false,
        type: 'default'
    }

    if(req.query.hasOwnProperty('_sort')){
        res.locals._sort.enabled = true;
        if(req.query.hasOwnProperty('type')) {
            res.locals._sort.type = req.query.type;
        }
        if(req.query.hasOwnProperty('column')) {
            res.locals._sort.column = req.query.column;
        }
    }

    next();
}
