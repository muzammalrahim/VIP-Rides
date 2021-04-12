import React from "react"
import fbicon from "../../images/bookride/facebook.png"
import instaicon from "../../images/bookride/insta.png"
import { Col, Row } from "antd";
import {Fade, Slide} from 'react-reveal';

const RideSocialSnippet = () => (
	<>
	 	<section className="home-banner banner">
			<div className="banner-content">
				<span className="title">The Ultimate Ride Experience</span>
				<span className="subtitle" style={{maxWidth:'1000px'}}>We offer comfortable, safe and fast top class pickup and drop service <br/> We provide services for private use, comapnies and foreign guests</span>
				<div className="description"><br/>
					<a className="premium-button md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">Read More</a>
				</div>
			</div>
		</section>
		{/*<section className="about-snippet">
			<Row>
				<Col className="snippet-content sec_section">
					<Col xs={24} className="checklist-container sec_heading_st">
						 <Fade left>
							
						<h1>visit our<br />social platforms</h1>
						
						<span>dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
									<br/> dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
								</span>
						 </Fade>
					</Col>
					<Col xs={24} className="media_icons">
						<Col xs={24} md={12}>
							<img src={fbicon} alt="" />
							<a href='https://www.facebook.com/VIPrides' target="blank">
							<span>Facebook.com/VIPrides</span>
							</a>
						</Col>
						<Col xs={24} md={12}>
							<img src={instaicon} alt="" />
							<a href='https://www.instagram.com/VIPrides/' target="blank">
							<span>@VIPrides</span>
							</a>
						</Col>
					</Col>
				</Col>
			</Row>
		</section>*/}
	</>
)

export default RideSocialSnippet
