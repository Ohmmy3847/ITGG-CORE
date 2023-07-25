const { default: mongoose } = require('mongoose');
var router = require('express').Router();
const LIVEMODEL = require('../../Models/live.model')

/**
 * @swagger
 * /api/v1/lives:
 *   get:
 *     tags: [LIVES]
 *     summary: Returns a Lives Info
 *     responses:
 *       200:
 *         description: Fetch Successfully
 */
router.get('/', async (req, res) => {
  const result = await LIVEMODEL.find()
  res.status(200).json({ items: result })
})

/**
 * @swagger
 * /api/v1/lives/{_id}:
 *   get:
 *     tags: [LIVES]
 *     summary: Returns a Live Info By Id
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch Successfully
 */
router.get('/:_id', async (req, res) => {
  const result = await LIVEMODEL.findOne({ _id: req.params._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if(result) {
    res.status(200).json(result)
  }
})

/**
 * @swagger
 * /api/v1/lives:
 *   post:
 *     tags: [LIVES]
 *     summary: Create a new Live
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               live_url:
 *                 type: string
 *               order:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully Create Gate!
 *       400:
 *         description: Invalid Body!
 */
router.post('/', (req, res) => {
  const body = req.body
  console.log(body)
  if (!body.live_url || !body.order) return res.status(400).send({ message: "Invalid Body!" })
  const creator = new LIVEMODEL({
    live_url: body.live_url,
    order: body.order,
  }).save()
  if (creator) {
    res.status(200).json({
      message: "Successfully Create Gate!"
    })
  }
})

/**
 * @swagger
 * /api/v1/lives:
 *   put:
 *     tags: [LIVES]
 *     summary: Update Live Value
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               live_url:
 *                 type: string
 *               order:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully Update Live!
 *       400:
 *         description: Invalid Body!
 *       404:
 *         description: Value Not Found
 */
router.put('/', async (req, res) => {
  const body = req.body
  if (!body.live_url || !body.order || !body._id) return res.status(400).send({ message: "Invalid Body!" })
  const checker = await LIVEMODEL.findOne({ _id: body._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if (checker) {
    const updater = await LIVEMODEL.findOneAndUpdate({ _id: body._id }, { gate_name: body.gate_name, token_amount: body.token_amount })
    if (updater) {
      res.status(200).json({
        message: "Successfully Update Gate!"
      })
    }
  }
})

/**
 * @swagger
 * /api/v1/lives/{_id}:
 *   delete:
 *     tags: [LIVES]
 *     summary: Delete Live Value
 *     parameters:
 *       - name: _id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch Successfully
 */
router.delete('/:_id', async (req, res) => {
  if (!req.params._id) return res.status(400).send({ message: "Invalid Body!" })
  const checker = await LIVEMODEL.findOne({ _id: req.params._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if(checker) {
    const deleter = await LIVEMODEL.deleteOne({ _id: req.params._id })
    if(deleter) {
      res.status(200).json({
        message: "Successfully Delete Gate"
      })
    }
  }
})

module.exports = router