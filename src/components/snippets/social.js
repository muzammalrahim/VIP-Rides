import React from "react"
import { Row, Col } from "antd"
import "./social.css"
import PremiumButton from "../buttons/premiumButton"

const SocialSnippet = () => (
  <section className="social-snippet">
    <Row>
      <Col xs={24} lg={{ span: 16 }} className="snippet-content">
        <h1>Social</h1>
        <div className="buttons-container">
          <PremiumButton to="https://www.facebook.com/VIP-Rides-519503695122009/" text="Facebook"/>
          <PremiumButton to="https://www.facebook.com/VIP-Rides-519503695122009/" text="Instagram"/>
          <PremiumButton to="https://www.facebook.com/VIP-Rides-519503695122009/" text="Google"/>
        </div>
      </Col>
    </Row>
  </section>
)

export default SocialSnippet
