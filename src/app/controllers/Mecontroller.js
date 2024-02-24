const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {

      let courseQuery = Course.find({});

      if(req.query.hasOwnProperty('_sort')){
        courseQuery = courseQuery.sort({
            [req.query.column]: req.query.type,
        })
      }

      Promise.all([await courseQuery, await Course.countDocumentsDeleted()])
        .then(([courses, deletedCount]) => 
            res.render('me/storedCourses', { 
                deletedCount,
                courses: mutipleMongooseToObject(courses)  //chuyển mảng thành object
            })
        )
        .catch(next);
    }

    // [GET] /me/trash/courses
    async trashCourses(req, res, next) {
        await Course.findDeleted()
          .then((courses) => 
              res.render('me/trashCourses', { 
                  courses: mutipleMongooseToObject(courses)  //chuyển mảng thành object
               })
          )
          .catch(next);
      }

}

module.exports = new MeController();
// Tạo ra một đối tượng của NewsController và xuất ra ngoài
