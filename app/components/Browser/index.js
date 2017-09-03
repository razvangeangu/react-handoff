import React from 'react'
import './style.scss'

import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.0.29:8000');

var Shake = require('shake.js');
var myShakeEvent = new Shake({
  threshold: 15
});

class Browser extends React.Component {

  constructor() {
    super();

    this.state = {
      shouldRender: false,
      isMobile: this.isMobile(),
      renderBrowser: false,
      toRender: undefined,
      animated: false,
      hasTwoFingers: false
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

    // window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('touchstart', this.hasTwoFingers.bind(this));

    // setTimeout(() => {
    //   this.refs.browser.addEventListener('mousedown', (e) => {
    //     alert("mousedown");
    //   })
    // }, 1500)

    // myShakeEvent.start()
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }

  shakeEventDidOccur() {
    alert('shake!');
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

  hasTwoFingers(e) {
    if (e.touches.length == 2) {
      this.setState({ hasTwoFingers: true });
    }
  }

  handleScroll(e) {
    if (this.state.hasTwoFingers) {
      this.refs.anutica.style.display = "none"
      this.setState({ hasTwoFingers: false })
    }

    console.log(document.getElementsByTagName('body')[0].scrollTop)

    if (document.getElementsByTagName('body')[0].scrollTop > 60) {
      this.test()
    }
  }

  render() {
    return (
      <div className="browser">
        {/* <button className="button" onClick={this.test.bind(this)}>Test</button>
        <button className="button" onClick={this.anutica.bind(this)}>Anuta</button> */}

        <div ref="anutica" className="anutica" onTouchStart={this.hasTwoFingers.bind(this)}></div>

        {/* <div className="fade-container">
          <p className={this.state.animated ? "fade-enter-active" : "fade-enter"}>Anutica e animata</p>
        </div> */}

          {this.state.renderBrowser && !this.state.isMobile ?
            <div className="browser-frame-container" dangerouslySetInnerHTML={{ __html: this.state.toRender }} />
            :
            <div></div>
          }

        {this.state.shouldRender ?
          <div ref="browserContainer" className="browser-frame-container">
            <object ref="browser" className="browser-frame" type="text/html" data="https://razvangeangu.com"></object>
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