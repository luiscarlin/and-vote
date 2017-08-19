import chalk from 'chalk'

export default function (err, req, res, next) {
  if (err) {
    res.status(500).json({
      message: 'An internal server error occurred'
    })
    console.log(chalk.red(`An internal server error ocurred: ${err}`))
  } else {
    next()
  }
}
