import React, { Component } from "react";
import { Menu, Row, Col, Input } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./AppHeader.css";

const Search = Input.Search;

class AppHeader extends Component {
  state = {};
  render() {
    let menuItems = [
      <Menu.Item key="/login">
        <Link to="/login">Login</Link>{" "}
      </Menu.Item>,
      <Menu.Item key="/signup">
        <Link to="/signup"> Signup</Link>
      </Menu.Item>
    ];

    return (
      <div style={{ marginLeft: "17%", marginRight: "17%" }}>
        <Row>
          <Col span={8}>
            <div className="app-logo-container">
              <img
                alt="logo"
                src={
                  "http://parlezlocal.com/wp-content/uploads/2015/09/insta-logo.png"
                }
              />
            </div>
          </Col>
          <Col span={8} push={12}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              className="app-menu"
            >
              {menuItems}
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(AppHeader);
