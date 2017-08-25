import React from 'react'

class NotFoundPage extends React.Component {
  render () {
    const content = this.props.children
    return (
      <div className='container'>
        <h2>Page not found</h2>
        {content}
      </div>
    )
  }
}

module.exports = NotFoundPage
