import React from "react"
import icon1 from "../../images/bookride/secure.png";
import icon2 from "../../images/bookride/private.png";
import icon3 from "../../images/bookride/sustain.png";
import Zoom from 'react-reveal/Zoom';
import { 
  Row, 
  Col, 
  Card 
} from "antd";

const BookServicesSnippet = () => (
  <section className="fourth-section">
    <div style={{width:"80%", margin:"0 auto"}}>
    <Row gutter={16}>
    <Zoom>
      <Col xs={24} md={12} lg={8}>
        <div className="service-item" style={{width:"80%", margin:'0 auto'}}>
          <div className="icon">
            <img src={icon1} alt="" style={{height: '133px'}} />
          </div>
          <h4>Safe and secure travel</h4>
          <p style={{textAlign:'justify'}}>Travel safe knowing you are in a sanitized vehicle driven by an insured professional in your local community</p>
        </div>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <div className="service-item" style={{width:"80%", margin:'0 auto'}}>
          <div className="icon">
            <img src={icon2} alt="" />
          </div>
          <h4>Private travel solutions</h4>
          <p style={{textAlign:'justify'}}>VIPRides is a proudly owned Bendigo private travel solution for all your travelling needs</p>
        </div>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <div className="service-item" style={{width:"80%", margin:'0 auto'}}>
          <div className="icon">
            <img src={icon3} alt="" />
          </div>
          <h4>Door-to-door travel</h4>
          <p style={{textAlign:'justify'}}>Enjoy the experience with door-to-door pickup and dropoff.</p>
        </div>
      </Col>
    </Zoom>
    </Row>
    </div>
</section>
)

export default BookServicesSnippet
