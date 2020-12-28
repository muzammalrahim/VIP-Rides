import React, { Component } from "react"
import { Element, scroller } from "react-scroll"
import SEO from "../components/seo"
import "./services.css"
import Navbar from "../components/navbar"
import HomeBanner from "../components/banners/home"
import Footer from "../components/footer"
import ContactBox from "../components/contactBox"
import ServiceSnippet from "../components/snippets/services"
import PrivateHireSnippet from "../components/snippets/privateHire"
import ServicesOverviewSnippet from "../components/snippets/servicesOverview"

class Services extends Component {

  componentDidMount() {
    scroller.scrollTo("scroll-to-element", {
      duration: 1000,
      delay: 0,
      smooth: true,
    })
  }

  render() {
    return (
      <div id="services">
        <SEO title="Services"/>
        <Navbar/>
        <HomeBanner title="VIPRides Company"
                    subtitle="Providing you with your own chauffeur. Giving you the treatment you deserve."/>
        <Element name="scroll-to-element" className="element">
          <ServiceSnippet/>
        </Element>
        <ServicesOverviewSnippet/>
        <PrivateHireSnippet/>
        <Footer/>
        <ContactBox/>
      </div>
    )
  }
}

export default Services
