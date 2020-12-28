import React from "react"
import {Row, Col} from 'antd';
import "./contact.css"

const ContactSnippet = () => (
  <section className="contact-snippet">
    <Row>
      <Col xs={24} lg={{span: 18}} className="snippet-content">
        <h1>Contact</h1>
        <span className="subtitle">Subtitle</span>
        <br/>
      </Col>
    </Row>
  </section>
)

export default ContactSnippet
