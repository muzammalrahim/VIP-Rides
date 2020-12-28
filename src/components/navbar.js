import React, {Component} from "react"
import {Link} from "gatsby"
import {Icon, Menu, Layout} from "antd"
import "./navbar.css"
import logo from "../images/logo.png" // Tell Webpack this JS file uses this image
import {FaPhoneSquare} from "react-icons/fa"

const ResponsiveNavbar = () => {
    return (
        <div className="responsive-navbar">
            <Link to="/" activeClassName="menu-active" className="logo">
                <img src={logo} alt=""/>
            </Link>
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
                <li>
                    <Link to="/" activeClassName="menu-active">
                        <span className="nav-text">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/services" activeClassName="menu-active">
                        <span className="nav-text">Servicese</span>
                    </Link>
                </li>
                <li>
                    <Link to="/book-ride" activeClassName="menu-active">
                        <span className="nav-text">Book a Ride</span>
                    </Link>
                </li>
            </ul>
            <a href="tel:0413373589"><FaPhoneSquare className="floating-phone"/></a>
        </div>
    )
}

const LargeNavbar = () => {
    return (
        <Layout.Header className="nav-bar">
            <Link to="/" activeClassName="menu-active" className="logo">
                <img src={logo} alt=""/>
            </Link>
            <Menu mode="horizontal">
                <Menu.Item key="/">
                    <Link to="/" activeClassName="menu-active">
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/services">
                    <Link to="/services" activeClassName="menu-active">
                        <span className="nav-text">Services</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/book-ride">
                    <Link to="/book-ride" activeClassName="menu-active">
                        <span className="nav-text">Book a Ride</span>
                    </Link>
                </Menu.Item>
            </Menu>
            <div className="icons">
                <a href="tel:0413373589"><Icon type="phone"/></a>
            </div>
        </Layout.Header>
    )
}

class Navbar extends Component {
    render() {
        return (
            <div className="menu">
                <LargeNavbar/>
                <ResponsiveNavbar/>
            </div>
        )
    }
}

export default Navbar