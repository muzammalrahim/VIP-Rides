import React from "react"
import { Link } from "gatsby"
import { Layout } from "antd"
import Banner from "../components/banners/home"
import SEO from "../components/seo"
import "./index.css"
import "antd/dist/antd.css"
import ServiceSnippet from "../components/snippets/services.js"
import ExperienceSnippet from "../components/snippets/experience"
import ReviewsSnippet from "../components/snippets/reviews"
import FaqsSnippet from "../components/snippets/faqs"
import AboutSnippet from "../components/snippets/about"
import SocialSnippet from "../components/snippets/social"
import Footer from "../components/footer"
import ContactBox from "../components/contactBox"
import Navbar from "../components/navbar"

const { Content } = Layout

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`VIP`, `rides`, `rent`, `car`, `bendigo`]}/>
    <Navbar/>
    <Content>
      <Banner title="VIPRides Company"
              subtitle="Providing you with your own chauffeur. Giving you the treatment you deserve."/>
      <ServiceSnippet/>
      <ExperienceSnippet/>
      <ReviewsSnippet/>
      {/*<ContactSnippet/>*/}
      <AboutSnippet/>
      <FaqsSnippet/>
      <SocialSnippet/>
      <Link to="/services/">Services</Link>
      <Link to="/company/">Company</Link>
    </Content>
    <Footer/>
    <ContactBox/>
  </Layout>
)

export default IndexPage
