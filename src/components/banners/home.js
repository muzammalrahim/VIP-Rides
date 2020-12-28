import PropTypes from "prop-types"
import React from "react"
import { MdPhone, MdNavigateNext } from "react-icons/md"
import "./home.css"

const HomeBanner = ({ title, subtitle }) => (
  <div className="home-banner banner">
    <div className="banner-content">
      <span className="title">{title}</span>
      <span className="subtitle">{subtitle}</span>
      <div className="description">
        <br/>
        <a href="tel:0413373589" className="premium-button"><MdPhone/> Call Now! <MdNavigateNext/></a>
      </div>
      {/*<PremiumButton to="/contact-us" text="Get In Touch"/>*/}
    </div>
  </div>
)

HomeBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

HomeBanner.defaultProps = {
  siteTitle: ``,
}

export default HomeBanner
