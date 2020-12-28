import React from "react"
import { Row, Col } from "antd"
import "./privateHire.css"

const PrivateHireSnippet = () => (
  <section className="private-hire-snippet">
    <Row>
      <Col xs={24} lg={{ span: 16 }} className="snippet-content">
        <h1>Private Hire</h1>
        <p>On Time, On Demand</p>
        <p>Looking to book us for a longer period of time while you're down? No worries, we've got you covered.</p>
      </Col>
    </Row>
  </section>
)

export default PrivateHireSnippet
