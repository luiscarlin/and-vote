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
      <div className='container'>
        <div className='row'>
          <div className='panel panel-default col-sm-offset-3 col-sm-6' style={{marginBottom: 4}}>
            <div className='panel-body'>
              <h2 className='text-center' style={{marginTop: 0}}>{question}</h2>
              {error ? <h4 style={{color: 'red'}}>Cannot find poll</h4> : null}
              <form onSubmit={this.castVote.bind(this)}>
                {!loading ? pollOptions.map((pollOption, i) => {
                  const { optionId, text } = pollOption
                  return (
                    <div key={i} className='radio text-center' style={{margin: 12}}>
                      <label style={{fontSize: 24}}>
                        <input
                          type='radio'
                          onClick={this.checkedOption.bind(this, optionId)}
                          name='option'
                          value={optionId}
                          style={{marginTop: 10}}
                        /> {text}
                      </label>
                    </div>
                  )
                }) : null}
                <div className='row'>
                  <div className='col-sm-4 col-sm-offset-4'>
                    <button className='btn btn-block btn-primary center-block' type='submit'>Vote</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Link className='text-center center-block' to={`/r/${pollId}`}>Poll Results</Link>
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
