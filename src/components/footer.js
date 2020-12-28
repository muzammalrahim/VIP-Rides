import React, { Component } from "react"
import "./footer.css"
import { Layout, Row, Col, Icon } from "antd"
import { Link } from "gatsby"

class Footer extends Component {
  render() {
    return (
      <Layout.Footer>
        <Row>
          <Col xs={24} lg={8}>
            <ul>
              <li>
                <Link to="/">Home <Icon type="right"/></Link>
              </li>
              {/*<li>*/}
              {/*  <Link to="/company/">Company <Icon type="right"/></Link>*/}
              {/*</li>*/}
              <li>
                <Link to="/services/">Services <Icon type="right"/></Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} lg={8}>
            <div className="details-wrapper">
              <p> *Kilometre restrictions apply based on booking duration.</p>
              <a href="mailto:chris@viprides.com.au"><Icon type="mail"/>chris@viprides.com.au</a>
              <br/>
              <a href="tel:0413373589"><Icon type="phone"/>0413373589</a>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <ul>
              <h2>Get in touch!</h2>
              <li>
                <a href="https://www.facebook.com/VIP-Rides-519503695122009/" target="_blank">
                  Google Reviews<Icon type="right"/>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/VIP-Rides-519503695122009/" target="_blank">
                  Facebook<Icon type="right"/>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/VIP-Rides-519503695122009/" target="_blank">
                  Deals<Icon type="right"/>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <span className="copyright">© {new Date().getFullYear()} Viprides - All Rights Reserved | Bendigo Ride Share
          {` `}</span>
        <span className="copyright">VIPRides is a registered booking service provider with commercial passenger vehicles victoria | Registration: V233965</span>
        <div className="author">A website Built by <a href="http://lavon.com.au/" target="_blank">Lavon Global</a></div>
      </Layout.Footer>
    )
  }
}

export default Footer