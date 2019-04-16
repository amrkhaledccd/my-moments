import React, { Component } from "react";
import "./signup.css";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { Link } from "react-router-dom";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from "../../common/constants";
import { signup } from "../../util/ApiUtil";

const FormItem = Form.Item;

class Signup extends Component {
  state = {
    name: {
      value: ""
    },
    username: {
      value: ""
    },
    email: {
      value: ""
    },
    password: {
      value: ""
    }
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const signupRequest = {
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value
    };
    signup(signupRequest)
      .then(response => {
        notification.success({
          message: "MyMoments",
          description:
            "Thank you! You're successfully registered. Please Login to continue!"
        });
        this.props.history.push("/login");
      })
      .catch(error => {
        notification.error({
          message: "MyMoments",
          description:
            error.message || "Sorry! Something went wrong. Please try again!"
        });
      });
  };

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }

  isFormInvalid() {
    return !(
      this.state.name.validateStatus === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="signup-container">
          <Row type="flex" justify="center">
            <Col pan={24}>
              <div className="logo-container">
                <span>𝓜𝔂 𝓜𝓸𝓶𝓮𝓷𝓽𝓼</span>
              </div>
            </Col>
            <Col pan={24}>
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <FormItem
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}
                  hasFeedback
                >
                  <Input
                    size="large"
                    name="name"
                    placeholder="Name"
                    value={this.state.name.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateName)
                    }
                  />
                </FormItem>
                <FormItem
                  validateStatus={this.state.email.validateStatus}
                  help={this.state.email.errorMsg}
                  hasFeedback
                >
                  <Input
                    size="large"
                    name="email"
                    placeholder="Email"
                    value={this.state.email.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateEmail)
                    }
                  />
                </FormItem>
                <FormItem
                  validateStatus={this.state.username.validateStatus}
                  help={this.state.username.errorMsg}
                  hasFeedback
                >
                  <Input
                    size="large"
                    name="username"
                    placeholder="Username"
                    value={this.state.username.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validateUsername)
                    }
                  />
                </FormItem>
                <FormItem
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}
                  hasFeedback
                >
                  <Input
                    size="large"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password.value}
                    onChange={event =>
                      this.handleInputChange(event, this.validatePassword)
                    }
                  />
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="signup-form-button"
                    disabled={this.isFormInvalid()}
                  >
                    Signup
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="login-link-container">
          Have an account? <Link to="/login">Login</Link>
        </div>
      </React.Fragment>
    );
  }

  validateName = name => {
    if (!name) {
      return {
        validateStatus: "warning",
        errorMsg: `Please input your name`
      };
    }
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters)`
      };
    }

    if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters)`
      };
    }

    return {
      validateStatus: "success",
      errorMsg: null
    };
  };

  validateEmail = email => {
    if (!email) {
      return {
        validationStatus: "warning",
        errorMsg: "Please input your email"
      };
    }
    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters)`
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email not valid"
      };
    }

    return {
      validateStatus: "success",
      errorMsg: null
    };
  };

  validateUsername = username => {
    if (!username) {
      return {
        validateStatus: "warning",
        errorMsg: "Please input a username"
      };
    }
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters)`
      };
    }

    if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters)`
      };
    }
    return {
      validateStatus: "success",
      errorMsg: null
    };
  };

  validatePassword = password => {
    if (!password) {
      return {
        validateStatus: "warning",
        errorMsg: `Please input a poassword`
      };
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };
}

export default Signup;
