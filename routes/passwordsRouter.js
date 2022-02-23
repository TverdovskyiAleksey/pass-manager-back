const Router = require('express');
const router = new Router();
const controller = require('../passwordsController');
const { authenticate } = require('../middleware');

router.post('/', authenticate, controller.addPassword);
router.get('/', authenticate, controller.getPasswords);
router.delete('/:id', authenticate, controller.deletePassword);
router.get('/current', authenticate, controller.getCurrent);
router.put('/:id', controller.updatePassword);

module.exports = router;
