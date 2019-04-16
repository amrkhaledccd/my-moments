import React, { Component } from "react";
import "./login.css";
import { Form, Input, Button, Icon, Row, Col, notification } from "antd";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../../common/constants";
import { login } from "../../util/ApiUtil";

const FormItem = Form.Item;

class Login extends Component {
  state = {};

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <React.Fragment>
        <div className="login-container">
          <Row type="flex" justify="center">
            <Col pan={24}>
              <div className="logo-container">
                <span>𝓜𝔂 𝓜𝓸𝓶𝓮𝓷𝓽𝓼</span>
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

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
          })
          .catch(error => {
            if (error.status === 401) {
              notification.error({
                message: "MyMoments",
                description:
                  "Username or Password is incorrect. Please try again!"
              });
            } else {
              notification.error({
                message: "MyMoments",
                description:
                  error.message ||
                  "Sorry! Something went wrong. Please try again!"
              });
            }
          });
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
