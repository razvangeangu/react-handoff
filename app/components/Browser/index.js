import React from 'react'
import './style.scss'

import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.0.29:8000');

class Browser extends React.Component {

  constructor() {
    super();

    this.state = {
      shouldRender: false,
      isMobile: this.isMobile(),
      renderBrowser: false,
      toRender: undefined,
      animated: false
    }

    socket.on('testing', data => {
      this.setState({ toRender: data });

      if (this.isMobile()) {
        this.setState({ shouldRender: false });
      } else {
        this.setState({ shouldRender: false });
        this.setState({ renderBrowser: true });
      }
    });
  }

  componentDidMount() {
    if (this.isMobile()) {
      this.setState({ shouldRender: true });
    }
  }

  isMobile() {
    return window.innerWidth < 640;
  };

  test() {
    socket.emit('testing', this.refs.browser.outerHTML);
  }

  anutica() {
    this.setState({ animated: true });
  }

  render() {
    return (
      <div className="browser">
        <button className="button" onClick={this.test.bind(this)}>Test</button>
        <button className="button" onClick={this.anutica.bind(this)}>Anuta</button>

        {/* <div className="fade-container">
          <p className={this.state.animated ? "fade-enter-active" : "fade-enter"}>Anutica e animata</p>
        </div> */}

        {this.state.renderBrowser && !this.state.isMobile ?
          <div className="fade-container browser-frame-container" dangerouslySetInnerHTML={{ __html: this.state.toRender }} />
          :
          <div></div>
        }

        {this.state.shouldRender ?
          <div className="browser-frame-container">
            <object ref="browser" className={this.state.animated ? "fade-enter-active browser-frame" : "fade-enter browser-frame"} type="text/html" data="https://razvangeangu.com"></object>
          </div>
          :
          ''
        }
      </div>
    )
  }
}

export default Browser

// { this.isMobile() ?
//   <div className="browser-frame-container">
//     <object ref="browser" className="browser-frame" type="text/html" data="http://validator.w3.org/" width="800px" height="600px"></object>
//   </div>
//   :
//   <div></div>
// }