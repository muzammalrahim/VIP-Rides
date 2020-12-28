import React from "react"
import { Row, Col, Rate, Carousel, Icon } from "antd"
import "./reviews.css"
import Client1 from "../../images/reviewers/1.jpg"

const settings = {
  infinite: true,
  speed: 500,
  dots: false,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  draggable: true,
  accessibility: true,
}

export default class ReviewsSnippet extends React.Component {
  constructor(props) {
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.carousel = React.createRef()
  }

  next() {
    this.carousel.next()
  }

  previous() {
    this.carousel.prev()
  }

  render() {
    const props = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <section className="reviews-snippet">
        <Row>
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <Col xs={24} lg={{ span: 9 }} className="snippet-content">
            <h1>Reviews</h1>
            {/*<span className="subtitle">Subtitle</span>*/}
            <div className="carousel-container">
              <Icon type="left" onClick={this.previous}/>
              <Carousel autoplay ref={node => (this.carousel = node)} {...props} {...settings}>
                <div className="slide">
                  <img src={Client1} alt="Jane Doe"/>
                  <h2>Adam Brooks</h2>
                  <div className="bar">
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                  </div>
                  <p>Great Driver and always on time. VIP Rides is the way to go if you’re looking for a reliable
                    service. </p>
                  <Rate disabled allowHalf defaultValue={5}/>
                </div>
              </Carousel>
              <Icon type="right" onClick={this.next}/>
            </div>
          </Col>
        </Row>
      </section>
    )
  }
}