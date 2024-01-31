const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')

class Coursescontroller {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug})
        .then(course =>
            res.render('courses/show', { course: mongooseToObject(course) })
        )
        .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next){
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/hqdefault.jpg`;
        
        const course = new Course(formData)
        course.save()
            .then(()=> res.redirect('/'))
            .catch(error=>{
                
            })
    }

    // [GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then((course) => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    async update(req, res, next){
        await Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    async delete(req, res, next){
        await Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new Coursescontroller();
// Tạo ra một đối tượng của NewsController và xuất ra ngoài
