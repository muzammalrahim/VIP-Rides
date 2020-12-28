import React from "react"
import { Row, Col, Collapse, Icon } from "antd"
import "./faqs.css"

const Panel = Collapse.Panel

const FaqsSnippet = () => (
  <section className="faqs-snippet">
    <Row>
      <Col xs={24} lg={{ span: 18 }} className="snippet-content">
        <Icon type="wechat"/>
        <h1>Frequently Asked Questions</h1>
        <br/>
        <Collapse bordered={false} accordion>
          <Panel header="What cars do you have available?" key="1">
            <p>As of July 2019, we are running with a Holden Calais</p>
          </Panel>
          <Panel header="What benefits does VIP Rides bring compared to other services?" key="2">
            <p>VIP Rides is a Bendigo owned and operated driving service without the awkward drivers ruining your
              night</p>
          </Panel>
          <Panel header="What are the availabilities of your drivers?" key="3">
            <p>Any Time by Appointment. Give us a call or send us an email.</p>
          </Panel>
          <Panel header="How many passengers do you take?" key="4">
            <p>We are limited to four passengers per car</p>
          </Panel>
          <Panel header="Are you handicap accessible?" key="5">
            <p>If your wheelchair can be detached and packed, our highly trained and caring drivers are able to assist
              you and your party</p>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  </section>
)

export default FaqsSnippet
