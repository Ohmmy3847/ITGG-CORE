var router = require('express').Router();
const GATEMODEL = require('../../Models/gate.model')
const LOGSMODEL = require('../../Models/logs.model')

/**
 * @swagger
 * /api/v1/gates:
 *   get:
 *     tags: [GATES]
 *     summary: Returns a Gates Info
 *     responses:
 *       200:
 *         description: Fetch Successfully
 */
router.get('/', async (req, res) => {
  const result = await GATEMODEL.find()
  res.status(200).json({ items: result })
})

/**
 * @swagger
 * /api/v1/gates/{_id}:
 *   get:
 *     tags: [GATES]
 *     summary: Returns a Gate Info By Id
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
  const result = await GATEMODEL.findOne({ _id: req.params._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if(result) {
    res.status(200).json(result)
  }
})

/**
 * @swagger
 * /api/v1/gates:
 *   post:
 *     tags: [GATES]
 *     summary: Create a new Gate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gate_name:
 *                 type: string
 *               token_amount:
 *                 type: number
 *               hex:
 *                 type: string
 *               backgroundURL:
 *                 type: string
 *               mascotURL:
 *                 type: string
 *               logoURL:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully Create Gate!
 *       400:
 *         description: Invalid Body!
 */
router.post('/', (req, res) => {
  const body = req.body
  if (!body.gate_name || !body.token_amount || !body.hex || !body.backgroundURL || !body.mascotURL || !body.logoURL) return res.status(400).send({ message: "Invalid Body!" })
  const creator = new GATEMODEL({
    gate_name: body.gate_name,
    token_amount: body.token_amount,
    hex: body.hex,
    backgroundURL: body.backgroundURL,
    mascotURL: body.mascotURL,
    logoURL: body.logoURL
  }).save()
  new LOGSMODEL({
    action: "CREATE GATE INFO",
    payload: req.body,
    method: "POST",
    type: "GATE"
  }).save()
  if (creator) {
    res.status(200).json({
      message: "Successfully Create Gate!"
    })
  }
})

/**
 * @swagger
 * /api/v1/gates:
 *   put:
 *     tags: [GATES]
 *     summary: Update Gate Value
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               gate_name:
 *                 type: string
 *               token_amount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully Update Gate!
 *       400:
 *         description: Invalid Body!
 *       404:
 *         description: Value Not Found
 */
router.put('/', async (req, res) => {
  const body = req.body
  if (!body.gate_name || !body.token_amount || !body._id) return res.status(400).send({ message: "Invalid Body!" })
  const checker = await GATEMODEL.findOne({ _id: body._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if (checker) {
    const updater = await GATEMODEL.findOneAndUpdate({ _id: body._id }, { gate_name: body.gate_name, token_amount: body.token_amount })
    new LOGSMODEL({
      action: "UPDATE GATE INFO",
      payload: req.body,
      method: "PUT",
      type: "GATE"
    }).save()
    if (updater) {
      res.status(200).json({
        message: "Successfully Update Gate!"
      })
    }
  }
})

/**
 * @swagger
 * /api/v1/gates/increment:
 *   put:
 *     tags: [GATES]
 *     summary: Increment Token For Gates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully Create Gate!
 *       400:
 *         description: Invalid Body!
 *       404:
 *         description: Value Not Found
 */
router.put('/increment', async (req, res) => {
  const body = req.body
  if (!body.amount || !body._id) return res.status(400).send({ message: "Invalid Body!" })
  const checker = await GATEMODEL.findOne({ _id: body._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if (checker) {
    const updater = await GATEMODEL.findOneAndUpdate({ _id: body._id }, { $inc: { token_amount: Number(body.amount) } })
    new LOGSMODEL({
      action: "INCREMENT GATE TOKEN",
      payload: req.body,
      method: "PUT",
      type: "GATE"
    }).save()
    if (updater) {
      res.status(200).json({
        message: `Increment Token Value For ${checker.gate_name}`
      })
    }
  }

})

/**
 * @swagger
 * /api/v1/gates/{_id}:
 *   delete:
 *     tags: [GATES]
 *     summary: Delete Gate Value
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
  const checker = await GATEMODEL.findOne({ _id: req.params._id }).catch(() => { return res.status(404).json({ message: "Value Not Found" }) })
  if(checker) {
    const deleter = await GATEMODEL.deleteOne({ _id: req.params._id })
    new LOGSMODEL({
      action: "DELETE GATE INFO",
      payload: req.params._id,
      method: "DELETE",
      type: "GATE"
    }).save()
    if(deleter) {
      res.status(200).json({
        message: "Successfully Delete Gate"
      })
    }
  }
})

module.exports = router