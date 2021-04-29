import React from "react"
import { Row, Col ,Icon } from "antd"
import "./services.css"
import { MdPhone, MdNavigateNext } from "react-icons/md"
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
            <span>Melbourne Airport one way - $150</span>
            <span>Return Trips - $280</span>
            <span>Up to 4 passengers</span>
          </li>
         {/* <li className="service">
            <img src={icon3} className="icon" alt="Business Events"/>
            <h3>One Way Trips</h3>
            <span>30 Minute Trip - $35</span>
            <span>Additional Hours - $60</span>
          </li>*/}
          <li className="service" >
            <img src={icon4} className="icon" alt="Business Events"/>
            <h3>Out of Town</h3>
            <span>Melbourne $180 or $300 return</span>
            <span>Available for day trips for Work or AFL games etc. (Maximum 12 hours)</span>
            <span>Up to 4 passengers</span>
          {/*  <span><strong>*Whole day bookings are from 7am - 7pm</strong></span>*/}
          </li>
        
        </ul>
        
        <a href="tel:0413373589" className="premium-button"><MdPhone/><em> Call For Booking! </em><MdNavigateNext/></a>

         
      </Col>
    </Row>
  </section>
)

export default ServiceSnippet
