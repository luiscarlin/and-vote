import React from 'react'
import { Link } from 'react-router'

class Navbar extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1 style={{margin: 12}}><Link to='/'>And... Vote!</Link></h1>
      </div>
    )
  }
}

module.exports = Navbar
