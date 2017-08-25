import React from 'react'
import $ from 'jquery'
import { Link, browserHistory } from 'react-router'

class VotePoll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      question: null,
      pollOptions: null,
      loading: true,
      error: false,
      optionIdChecked: ''
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
    const { pollId } = this.props.params
    const { question, pollOptions, loading, error } = this.state

    return (
      <div className='text-center'>
        <h2>VotePoll</h2>
        <h4>QUESTION: {question}</h4>
        <form onSubmit={this.castVote.bind(this)}>
          {!loading && !error ? pollOptions.map((pollOption, i) => {
            const { optionId, text } = pollOption
            return (
              <div key={i} style={{border: '1px solid black'}}>
                <p>Id: {optionId}</p>
                <p>Option: {text}</p>
                <input type='radio' name='option' onClick={this.checkedOption.bind(this, optionId)} />
              </div>
            )
          }) : null}
          <button type='submit' style={{margin: 12}} className='btn btn-lg btn-primary'>Cast Vote</button>
        </form>
        {!loading && !error ? <Link to={`/r/${pollId}`}>Results on the Poll</Link> : null }
      </div>
    )
  }

  checkedOption (id) {
    this.setState({optionIdChecked: id})
  }

  castVote (event) {
    event.preventDefault()
    const { optionIdChecked } = this.state
    const { alert } = window
    const { pollId } = this.props.params

    if (!optionIdChecked) {
      return alert('Please select an option')
    }

    const data = {
      pollOptionId: optionIdChecked
    }

    $.ajax({
      method: 'POST',
      url: '/api/vote',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json'
    }).always((data) => {
      const { status, responseText } = data
      if (status === 400) {
        return alert(JSON.parse(responseText).message)
      }

      if (status === 201) {
        return browserHistory.push(`/r/${pollId}`)
      }
    })
  }
}

module.exports = VotePoll
