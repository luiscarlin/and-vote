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
        <h2>CreatePoll</h2>
        <form style={{border: '1px solid black'}} onSubmit={this.createPoll.bind(this)}>
          <label>Question:</label>
          <input type='text' ref='question' placeholder='Enter a question...' /> <br />
          {options}
          <button type='submit'>Create Poll</button>
        </form>
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
        <div key={index}>
          <label>Option {index}</label>
        <input
          type='text'
          ref={`option${index}`}
          placeholder='Enter an option...'
          onFocus={addOption}
          onBlur={removeOption}
        /> <br />
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
    // validation

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
}

module.exports = CreatePoll
