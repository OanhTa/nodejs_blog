const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // [GET] /news
    async index(req, res, next) {

        try {
            let courses = await Course.find({});
        
            res.render('home', 
            { 
                courses: mutipleMongooseToObject(courses)  //chuyển mảng thành object
            });
        } catch (err) {
            next(err);
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
// Tạo ra một đối tượng của NewsController và xuất ra ngoài
