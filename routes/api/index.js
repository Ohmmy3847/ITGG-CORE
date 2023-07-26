var router = require('express').Router();

router.use('/gates', require('./gates'));
router.use('/info', require('./info'));
router.use('/lives', require('./lives'))
router.use('/logs', require('./logs'))

module.exports = router;