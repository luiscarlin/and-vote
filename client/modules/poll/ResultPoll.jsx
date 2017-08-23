import React from 'react'
import $ from 'jquery'

class ResultPoll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      question: null,
      pollOptions: null,
      loading: true,
      error: false
    }
  }

  componentWillMount () {
    const { pollId } = this.props.params
    this.serverHandler = $.get(`/api/poll/${pollId}`, (result) => {
      const { question, pollOptions } = result
      this.setState({
        question,
        pollOptions,
        loading: false
      })
    }).fail(() => {
      this.setState({
        error: true,
        loading: false
      })
    })
  }

  componentWillUnmount () {
    this.serverHandler.abort()
  }

  render () {
    const { question, pollOptions, loading, error } = this.state
    return (
      <div className='text-center'>
        <h2>ResultPoll</h2>
        <h4>QUESTION: {question}</h4>
        {!loading && !error ? pollOptions.map((pollOption, i) => {
          const { optionId, text, voteCount } = pollOption
          return (
            <div key={i} style={{border: '1px solid black'}}>
              <p>Id: {optionId}</p>
              <p>Option: {text}</p>
              <p>Votes: {voteCount}</p>
            </div>
          )
        }) : null}
      </div>
    )
  }
}

module.exports = ResultPoll
