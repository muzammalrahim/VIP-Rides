import React from "react"
import { Row, Col } from "antd"
import "./location.css"
import PremiumButton from "../buttons/premiumButton"

const LocationSnippet = () => (
  <section className="location-snippet">
    <Row>
      <Col xs={24} className="snippet-content">
        <Col xs={24} lg={{ span: 12 }}>
          <div className="snippet-wrapper">
            <h1>Location</h1>
            <PremiumButton text="91 McIvor Hwy" to="https://goo.gl/maps/XQaXCpqgddRNAmTF8"/>
            <span className="location-area">Bendigo, VIC 3550</span>
            <p>Parking is available at our building</p>
            <p>Have any questions on how we help drivers and riders connect? We're here to help!</p>
          </div>
        </Col>
        <Col xs={24} lg={{ span: 12 }} className="image-container">
          <iframe title="map" width="100%" height="600px" frameBorder="0" allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.5147676282454!2d144.29665591528868!3d-36.75821657995718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad759a1956e8989%3A0xfd89c22d6c6b1b9a!2s91+McIvor+Hwy%2C+East+Bendigo+VIC+3550!5e0!3m2!1sen!2sau!4v1558790201150!5m2!1sen!2sau"/>
        </Col>
      </Col>
    </Row>
  </section>
)

export default LocationSnippet