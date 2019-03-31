import React, { Component } from "react";
import "./login.css";
import { Form, Input, Button, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";

const FormItem = Form.Item;

class Login extends Component {
  state = {};
  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <React.Fragment>
        <div className="login-container">
          <Row type="flex" justify="center">
            <Col pan={24}>
              <div className="logo-container">
                <img
                  alt="logo"
                  src={
                    "http://parlezlocal.com/wp-content/uploads/2015/09/insta-logo.png"
                  }
                />
              </div>
            </Col>
            <Col pan={24}>
              <AntWrappedLoginForm onLogin={this.props.onLogin} />
            </Col>
          </Row>
        </div>
        <div className="signup-link-container">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </React.Fragment>
    );
  }
}

class LoginForm extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your username!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="username"
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              name="password"
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
          >
            Login
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Login;
