const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')

class Coursescontroller {
    // [GET] /courses/:slug
    async show(req, res, next) {
        await Course.findOne({ slug: req.params.slug})
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
        req.body.img = `https://img.youtube.com/vi/${req.body.videoID}/hqdefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next)            
    }

    // [GET] /courses/:id/edit
    async edit(req, res, next){
        await Course.findById(req.params.id)
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

    // [DELETE] /courses/:id/force
    async forceDelete(req, res, next){
        await Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // Dùng tư viện moogose-delete - xóa mềm, khôi phục, xóa thật
    // [DELETE] /courses/:id
    async delete(req, res, next){
        await Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    async restore(req, res, next){
        await Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //// [POST] /courses/handle-form-actions
    async handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                await Course.delete({ _id: { $in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: 
                res.json({message: 'Action is invalid'})
        }
    }
}

module.exports = new Coursescontroller();
// Tạo ra một đối tượng của NewsController và xuất ra ngoài
