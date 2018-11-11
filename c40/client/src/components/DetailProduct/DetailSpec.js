import React, { Component } from 'react'

export default class DetailSpec extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      move: false
    }
  }

  handleTestChange() {
    this.setState({move: true})
  }

  handleProChange() {
    this.setState({move: false})
  }

  render() {
    if(this.state.move){
      return(
        <div>
          <ul className="nav nav-tabs">
            <li className="btn btn-primary-outline" onClick={this.handleProChange.bind(this)}>Product Detail</li>
            <li className="btn btn-primary-outline active">Testimonial</li>
          </ul>
          <br />

          <b>Stay connected either on the phone or web with the galaxy s4 1337 from Samsung. With 16 GB memory and a 4G connection, this phones stores precious photos and video and let you upload them to a cloud or social network at blinding-fast speed</b>
          <ul><br />
            <li>This is awesome</li>
          </ul>
        </div>
      )
    }else {
      return(
        <div>
          <ul className="nav nav-tabs">
            <li className="btn btn-primary-outline active">Product Detail</li>
            <li className="btn btn-primary-outline" onClick={this.handleTestChange.bind(this)}>Testimonial</li>
          </ul>
          <br />

          <b>Stay connected either on the phone or web with the galaxy s4 1337 from Samsung. With 16 GB memory and a 4G connection, this phones stores precious photos and video and let you upload them to a cloud or social network at blinding-fast speed</b>
          <ul><br />
            <li>Android 4.2 (Jelly Bean) with TouchWiz Nature UI 1.9 GHz quad-core processor 16 GB/32 GB/64 GB; 2 GB RAM External memory up to 64 GB (microSD) Micro-SIM Card</li>
            <li>2600 mAh Talk Time: Up to 17 hours Standby Time: Up to 23 days</li>
            <li>13.0 MP autofocus camera with LED flash 2.0 MP front-facing camera with flash HD video recording (1080p)</li>
            <li>Bar with touchscreen White Frost, Black Mist, Aurora Red 130 grams 13.7 x 7.0 x 0.8 cm</li>
            <li>LTE 700/850/1900/2100/2600 HSPA/UMTS 850/1900/2100 GSM 850/900/2100 Download speeds up to 100 Mbps A-GPS, GLONASS NFC Wi-Fi 802.11 a/b/g/n/ac Mobile hotspot Bluetooth 4.0 with A2DP, EDR, LE</li>
            <li>SAR Value: 0.65 W/kg</li>
          </ul>
        </div>
      )
    }
  }
}
