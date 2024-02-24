const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/coursescontroller');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);

router.get('/:id/edit', coursesController.edit);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.forceDelete);

router.get('/:slug', coursesController.show);
// match với tất cả - lưu slug = html..(trên url) - để thực hiện findOne

module.exports = router;
