import db from 'sequelize-connect'

const pollController = { }

pollController.handlePost = function (req, res, next) {
  db.sequelize.transaction(async transaction => {
    const createdPoll = await db.models.poll.create({
      question: req.body.question
    }, {
      transaction
    })
    const pollOption = req.body.options.map(option => {
      return {
        text: option,
        pollId: createdPoll.dataValues.id
      }
    })
    await db.models.pollOption.bulkCreate(pollOption, {
      transaction
    })
    res.sendStatus(201)
  }).catch(next)
}

export default pollController
