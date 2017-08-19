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
    res.status(201).json({
      createdPollId: createdPoll.dataValues.id
    })
  }).catch(next)
}

pollController.handleGet = async function (req, res, next) {
  try {
    const foundPoll = await db.models.poll.findOne({
      where: {
        id: req.params.pollId
      },
      group: ['pollOptions.id'],
      attributes: ['question'],
      include: {
        model: db.models.pollOption,
        attributes: [
          ['id', 'optionId'],
          'text',
          [db.sequelize.fn('COUNT', db.sequelize.col('pollOptions.votes.id')), 'voteCount']
        ],
        include: {
          model: db.models.vote,
          attributes: []
        }
      }
    })
    res.status(200).json(foundPoll.dataValues)
  } catch (err) {
    next(err)
  }
}
export default pollController
