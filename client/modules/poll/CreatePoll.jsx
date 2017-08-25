import React from 'react'
import $ from 'jquery'
import { browserHistory } from 'react-router'

class CreatePoll extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      optionCount: 2
    }
  }

  render () {
    const options = this.createOPtions()

    return (
      <div className='container'>
        <div className='row'>
          <div className='panel panel-default col-sm-6 col-sm-offset-3'>
            <div className='panel-body'>
              <h2 className='text-center'>Create Poll</h2>
              <form onSubmit={this.createPoll.bind(this)}>
                <div className='form-group'>
                  <label>Question</label>
                  <input className='form-control' ref='question' placeholder='Enter a question...' /> <br />
                </div>
                {options}
                <div className='row'>
                  <div className='col-sm-4 col-sm-offset-4'>
                    <button className='btn btn-block btn-primary center-block'type='submit'>Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  createOPtions () {
    const { optionCount } = this.state
    let options = []

    for (var i = 0; i < optionCount; i++) {
      const index = i + 1

      let addOption
      let removeOption

      if (index === optionCount) {
        addOption = this.addOption.bind(this)
      }

      if (index === optionCount - 1) {
        removeOption = this.removeOption.bind(this)
      }

      const optionInput = (
        <div key={index} className='form-group'>
          <label>Option {index}</label>
          <input
            className='form-control'
            type='text'
            ref={`option${index}`}
            placeholder='Enter an option...'
            onFocus={addOption}
            onBlur={removeOption}
          />
        </div>
      )
      options.push(optionInput)
    }
    return options
  }

  addOption () {
    this.setState({optionCount: this.state.optionCount + 1})
  }

  removeOption () {
    const { optionCount } = this.state
    const secondLastOption = this.refs[`option${optionCount - 1}`].value
    if (optionCount > 2 && !secondLastOption) {
      this.setState({optionCount: this.state.optionCount - 1})
    }
  }

  createPoll (event) {
    event.preventDefault()
    const { question } = this.refs
    const { alert } = window

    const data = {
      question: question.value.trim(),
      options: []
    }

    for (const option in this.refs) {
      const trimmedOptionVal = this.refs[option].value.trim()

      if (option !== 'question' && trimmedOptionVal !== '') {
        data.options.push(trimmedOptionVal)
      }
    }

    const error = this.validatePoll.bind(this)(data)

    if (error) {
      return alert(error)
    }

    $.ajax({
      method: 'POST',
      url: '/api/poll',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json'
    }).always((data) => {
      if (data.status === 400) {
        return alert('There was a problem creating the poll')
      }
      const { createdPollId } = data
      browserHistory.push(`/v/${createdPollId}`)
    })
  }

  validatePoll (pollData) {
    const { question, options } = pollData

    if (question.length < 8) {
      return 'Question must be at least 8 characters long'
    }

    if (options.length < 2) {
      return 'At least 2 options are required for a poll'
    }
    // everything is good
    return false
  }
}

module.exports = CreatePoll
