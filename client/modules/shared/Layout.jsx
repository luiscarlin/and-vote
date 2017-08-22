import React from 'react'

class Layout extends React.Component {
  render () {
    const content = this.props.children
    return (
      <div className='container'>
        <h2>Layout</h2>
        {content}
      </div>
    )
  }
}

module.exports = Layout
