import React, { Component } from "react";
import { Element, scroller } from "react-scroll";
import SEO from "../components/seo";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ContactBox from "../components/contactBox";
import RideSocialSnippet from "../components/snippets/rideSocial";
import BookFormSnippet from "../components/snippets/bookForm";
import BookServicesSnippet from "../components/snippets/bookServices";
import "../css/style.css";
import "../css/fontAwesome.css";
import { Modal } from 'antd';

class BookRide extends Component {
  constructor(){
    super();
    this.state={
      password:'',
      visible: true,
      invalid:false
    }
  }
  componentDidMount() {
    scroller.scrollTo('scroll-to-element', {
      duration: 1000,
      delay: 0,
      smooth: true
    });
  }
  handleOk = e => {
    if(this.state.password == "password@bookride"){
      this.setState({
        visible: false,
      });
    }else{
      this.setState({
        invalid:true
      })
    }
  };

  handleCancel = e => {
    window.location.assign('/')
  };
  render() {
      return (
        <>
        <div>
          <SEO title="Book a Ride"/>
          <Navbar/>
            <Element name="scroll-to-element" className="element">
              <RideSocialSnippet/>
            </Element>
            <BookFormSnippet/>
            <BookServicesSnippet/>
            <Footer/>
          <ContactBox/>
        </div>
         <Modal
           title="Enter password to access this page"
           visible={this.state.visible}
           onOk={this.handleOk}
           onCancel={()=>{this.handleCancel()}}
         >
           <input 
             name="password" 
             onChange={(e)=>{this.setState({password:e.target.value})}} 
             type="password" 
             placeholder="Password" 
             style={{width:"100%", border:'1px solid gray', padding:'5px'}}
           />
           {this.state.invalid && <strong style={{color:'red'}}>Invalid Password</strong>}
         </Modal>
       </>
      )
  }
}

export default BookRide;