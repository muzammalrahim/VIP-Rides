import React from "react"
import { Row, Col } from "antd"
import "./services.css"
import icon1 from "../../images/icons/business_and_events.png"
import icon2 from "../../images/icons/airport_transfers.png"
import icon3 from "../../images/icons/onw_way_trips.png"
import icon4 from "../../images/icons/out_of_town.png"

const ServiceSnippet = () => (
  <section className="services-snippet">
    <Row>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Col xs={24} lg={{ span: 18 }} className="snippet-content">
        <h1>Our Services</h1>
        <ul className="services">
          <li className="service">
            <img src={icon1} className="icon" alt="Business Events"/>
            <h3>Business/Events</h3>
            <span>Private event? Wedding?</span>
            <span>Heading to the footy? We've got you covered.</span>
          </li>
          <li className="service">
            <img src={icon2} className="icon" alt="Business Events"/>
            <h3>Airport Transfers</h3>
            <span>Melbourne Airport - $120</span>
            <span>Return Trips - $190</span>
          </li>
          <li className="service">
            <img src={icon3} className="icon" alt="Business Events"/>
            <h3>One Way Trips</h3>
            <span>30 Minute Trip - $35</span>
            <span>Additional Hours - $60</span>
          </li>
          <li className="service">
            <img src={icon4} className="icon" alt="Business Events"/>
            <h3>Out of Town</h3>
            <span>4 Hours - $220</span>
            <span>8 Hours - $400</span>
            <span>12 Hours - $600</span>
            <span><strong>*Whole day bookings are from 7am - 7pm</strong></span>
          </li>
        </ul>
      </Col>
    </Row>
  </section>
)

export default ServiceSnippet
