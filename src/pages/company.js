import React, { Component } from "react"
import { Element, scroller } from "react-scroll"
import "./company.css"
import SEO from "../components/seo"
import Navbar from "../components/navbar"
import HomeBanner from "../components/banners/home"
import AboutSnippet from "../components/snippets/about"
import LocationSnippet from "../components/snippets/location"
import SocialSnippet from "../components/snippets/social"
import Footer from "../components/footer"
import ContactBox from "../components/contactBox"



class Company extends Component {

  componentDidMount() {
    scroller.scrollTo('scroll-to-element', {
      duration: 1000,
      delay: 0,
      smooth: true
    })
  }

  render() {
    return (
      <div id="company">
        <SEO title="Company"/>
        <Navbar/>
        <HomeBanner title="VIPRides Company"
                    subtitle="Providing you with your own chauffeur. Giving you the treatment you deserve."/>
        <Element name="scroll-to-element" className="element">
          <LocationSnippet/>
        </Element>
        <SocialSnippet/>
        <AboutSnippet/>
       
        <ContactBox/>
      </div>
    )
  }
}

export default Company