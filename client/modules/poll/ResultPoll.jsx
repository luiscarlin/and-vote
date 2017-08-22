import React from 'react'
import $ from 'jquery'

class ResultPoll extends React.Component {
  componentWillMount () {
    const { pollId } = this.props.params
    this.serverHandler = $.get(`/api/poll/${pollId}`, (result) => {
      console.log(result)
    })
  }
  render () {
    return (
      <div>
        <h2>ResultPoll</h2>
      </div>
    )
  }
}

module.exports = ResultPoll
