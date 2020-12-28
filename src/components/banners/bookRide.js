import PropTypes from "prop-types"
import React from "react"

const BookRideBanner = ({ title, subtitle }) => (
  <section className="first-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="text-content ultimate-ride">
                <h2>The Ultimate Ride Experience</h2>
                <span>We offer comfortable, safe and fast top class pickup and drop service</span>
                <span>We provide services for private use, comapnies and foreign guests</span>
              </div>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-sm-6">
              <div className="col-md-12">
                <div className="text-content visit-social" style={{color: 'black'}}>
                  <h2>visit our<br />social platforms</h2>
                  {/* <div class="line-dec"></div> */}
                  <span>dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's<br /> dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's</span>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <div className="col-md-12">
                <div className="text-content vip-fb" style={{color: 'black'}}>
                  <img className src="img/facebook.png" alt="" />
                  <span>Facebook.com/VIPrides</span>
                </div>
                <div className="text-content vip-insta" style={{color: 'black'}}>
                  <img className src="img/insta.png" alt="" />
                  <span>@VIPrides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
)

BookRideBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

BookRideBanner.defaultProps = {
  siteTitle: ``,
}

export default BookRideBanner
