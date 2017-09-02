import React from 'react'
import './style.scss'

class Browser extends React.Component {

  componentDidMount() {
    console.log(this.refs.browser)
  }

  render () {
    return (
      <div className="browser">
        <object ref="browser" className="browser-frame" type="text/html" data="http://validator.w3.org/" width="800px" height="600px">
        </object>
      </div>
    )
  }
}

export default Browser
