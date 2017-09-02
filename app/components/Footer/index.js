import React from 'react'
import './style.scss'

class Footer extends React.Component {
  render () {
    return (
      <div className='footer-container'>
        <div className='content'>
          <p className={'text' + (this.props.color ? ' white' : '')}>Handcrafted with <span title='53' style={{color: 'red', fontSize: '10px'}}>♥️</span> by Ana & Răzvan</p>
        </div>
      </div>
    )
  }
}

export default Footer
