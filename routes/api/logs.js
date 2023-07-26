var router = require('express').Router();
const LOGSMODEL = require('../../Models/logs.model')

/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     tags: [LOGS]
 *     summary: Return a Logs
 *     responses:
 *       200:
 *         description: Asset For Landing Page
 */
router.get('/', async (req, res) => {
    const result = await LOGSMODEL.find()
    if(result) {
        res.status(200).send(result)
    }
})

module.exports = router