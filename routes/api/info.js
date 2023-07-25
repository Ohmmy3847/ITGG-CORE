const { default: mongoose } = require('mongoose');
const LIVEMODEL = require('../../Models/live.model');
var router = require('express').Router();
const GATEMODEL = require('../../Models/gate.model')
/**
 * @swagger
 * /api/v1/info:
 *   get:
 *     tags: [INFO]
 *     summary: Return a Decorator Asset for Landing Page
 *     responses:
 *       200:
 *         description: Asset For Landing Page
 */
router.get('/', async (req, res) => {
    const [gate_infos, live_infos] = await Promise.all([
      GATEMODEL.find(),
      LIVEMODEL.find()
    ])
    res.status(200).json({
      live: live_infos,
      gates: gate_infos.sort((a,b) => b.token_amount - a.token_amount)
    })
  })
module.exports = router