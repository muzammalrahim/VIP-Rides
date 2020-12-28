import React, { Component } from "react"
import "./contactBox.css"
import $ from "jquery"
import { Card, Form, Input, Select, message, Icon } from "antd"

const FormItem = Form.Item
const Option = Select.Option
const {TextArea} = Input;

class ContactForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const hide = message.loading("Your message is being sent", 0)
        setTimeout(hide, 2500)
        const form = $(".contact-form")
        form.submit()
      } else if (err) {
        message.error("Please enter the required fields!")
      }
    })
  }

  //prevent from entering anything other than numbers in phone input
  preventAlphabets(e) {
    const re = /[0-9]+/g
    if (!re.test(e.key)) {
      e.preventDefault()
    }
  };

  createOptions = () => {
    const options = []
    for (let i = 1; i < 100; i++) {
      options.push(<Option key={i} value={i}>+{i}</Option>)
    }
    return options
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const prefixSelector = getFieldDecorator("countryCode", {
      initialValue: "+61",
    })(
      <Select style={{ width: 70 }}>
        {this.createOptions()}
      </Select>,
    )
    return (
      <form onSubmit={this.handleSubmit} action="https://formspree.io/chris@viprides.com.au" method="POST"
            className="contact-form">
        <FormItem>
          {getFieldDecorator("name", {
            rules: [{
              required: true,
              message: "No name entered!",
            }],
          })(
            <Input name="Name" placeholder="Name"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{
              type: "email", message: "The email you entered is not valid!",
            }, {
              required: true, message: "Please input your E-mail!",
            }],
          })(
            <Input name="Email" placeholder="Email"/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("phone", {
            rules: [{
              message: "Giving us your telephone number will help us assist you!",
            }],
          })(
            <Input name="Phone Number" addonBefore={prefixSelector} style={{ width: "100%" }}
                   placeholder="Phone Number" maxLength={10} onKeyPress={(e) => this.preventAlphabets(e)}/>,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('message', {
            rules: [{required: true, message: 'We need to know what your query is please!'}],
          })(
            <TextArea name="Message" placeholder="Which service are you interested in?" autoSize={{minRows: 2, maxRows: 6}}/>
          )}
        </FormItem>
        <FormItem>
          <button type="submit" className="submit-button">Submit</button>
        </FormItem>
      </form>
    )
  }
}

const WrappedForm = Form.create()(ContactForm)

class ContactBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
    }
  }

  openBox = () => {
    this.setState({
      visible: true,
    })
  }

  closeBox = e => {
    this.setState({
      visible: false,
    })
  }

  render() {
    if (this.state.visible) {
      return (
        <Card className="contact-box">
          <Icon type="close-circle" theme="filled" onClick={this.closeBox} className="close"/>
          <div className="image-container"></div>
          <h2>Send us a message!</h2>
          <WrappedForm/>
        </Card>
      )
    } else if (!this.state.visible) {
      return (
        <Icon type="wechat" theme="filled" onClick={this.openBox} className="contact-box-toggle"/>
      )
    }
  }
}

export default ContactBox