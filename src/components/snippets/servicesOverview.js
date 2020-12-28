import React from "react"
import { Row, Col } from "antd"
import "./servicesOverview.css"

const ServicesOverviewSnippet = () => (
  <section className="services-overview-snippet">
    <Row>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <Col xs={24} lg={16} className="snippet-content">
        <Col xs={24} lg={12}>
          <h1>Personal</h1>
          <h2>To and From Work</h2>
          <p>Got a bad knee? Currently in crutches? We'll get you there on time, in style.</p>
          <h2>Footy Night</h2>
          <p>Can't miss your teams games, we've got you covered. Couple of bevs of your choice, on us.</p>
          <h2>Night Out</h2>
          <p>Looking for a great night out? No worries, v line stops the fun early, we've got you covered.</p>
        </Col>
        <Col xs={24} lg={12}>
          <h1>Business</h1>
          <h2>Scheduled Footy Trips</h2>
          <p>Looking to treat your hardworking team? We are able to take as many of your employees down to the footy.</p>
          <h2>Airport Trips</h2>
          <p>Your executives are down? Need to be picked up? Sent out? No worries, we've got it covered.</p>
          <h2>Personalised Trips</h2>
          <p>Want an easy to book chauffeur for your company? This one is for you.</p>
        </Col>
      </Col>
    </Row>
  </section>
)

export default ServicesOverviewSnippet
