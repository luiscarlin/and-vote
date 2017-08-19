import express from 'express'
import db from 'sequelize-connect'
import path from 'path'

async function connect () {
  db.discover = path.join(__dirname, 'models')
  db.matcher = function shouldImportModel (modelFileName) {
    return true
  }
  await db.connect('andvote_schema', 'root', 'root', {
    port: 3306,
    force: false
  })
}

(async function () {
  try {
    await connect()
  } catch (err) {
    console.log(`An error occurred when connecting: ${err}`)
  }
  const app = express()
  const port = 3000
  app.listen(port, () => console.log(`Running on port ${port}`))
})()
