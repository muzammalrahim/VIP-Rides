import React from "react"
import { Row, Col } from "antd"
import "./experience.css"

import car from "../../images/home/car.png"

const ExperienceSnippet = () => (
  <section className="experience-snippet">
    <Row>
      <Col xs={24} lg={{ span: 22 }} className="snippet-content">
        <Col xs={24} lg={{ span: 8, offset: 2 }}>
          <h1>The Ultimate Ride Experience</h1>
          <p>We offer comfortable, safe and fast top class car pickup and drop service.</p>
          <span className="subtitle">Proudly Australian Owned & Operated.</span>
          <p>We provide services for private use, companies and foreign guests.</p>
        </Col>
        <Col xs={24} lg={14} className="image-container">
          <img src={car} alt="Sample Car"/>
        </Col>
        <br/>
      </Col>
    </Row>
  </section>
)

export default ExperienceSnippet