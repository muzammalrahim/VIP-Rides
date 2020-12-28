import React from "react"
import { Row, Col, Icon } from "antd"
import "./about.css"

const AboutSnippet = () => (
  <section className="about-snippet">
    <Row>
      <Col xs={24} className="snippet-content">
        <Col xs={24} lg={{ span: 12 }} className="checklist-container">
          {/*<div className="bar">*/}
          {/*  <div className="emptybar"></div>*/}
          {/*  <div className="filledbar"></div>*/}
          {/*</div>*/}
          <h1>Why Us?</h1>

          <div className="checklist">
            <div>
              <Icon type="check-circle" theme="filled"/>
              <p>Guaranteed price for time period used</p>
            </div>
            <div>
              <Icon type="check-circle" theme="filled"/>
              <p>Your own driver</p>
            </div>
            <div>
              <Icon type="check-circle" theme="filled"/>
              <p>Drinks and snacks provided</p>
            </div>
            <div>
              <Icon type="check-circle" theme="filled"/>
              <p>No set travel times</p>
            </div>
            <div>
              <Icon type="check-circle" theme="filled"/>
              <p>Commercial Passenger Licenced Driver</p>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={{ span: 12 }} className="image-container">
          <div className="image-wrapper"></div>
        </Col>
      </Col>
    </Row>
  </section>
)

export default AboutSnippet
