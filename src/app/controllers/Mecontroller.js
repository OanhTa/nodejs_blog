const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res) {
        try {
            let courses = await Course.find({});
        
            res.render('me/storedCourses',  
            { 
                courses: mutipleMongooseToObject(courses)  //chuyển mảng thành object
            });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new MeController();
// Tạo ra một đối tượng của NewsController và xuất ra ngoài
