import React, { Component } from "react";
import { Menu, Row, Col, Input, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import "./AppHeader.css";
import NewPost from "../post/newpost/NewPost";

const Search = Input.Search;

class AppHeader extends Component {
  state = {};

  render() {
    let menuItems = [
      <Menu.Item title="Find friends" key="discover">
        <Link to="/discover">
          <Icon type="compass" />
        </Link>
      </Menu.Item>,
      <Menu.Item key="notification">
        <Icon type="heart" />
      </Menu.Item>,
      <Menu.Item key="userProfile">
        <Link to={`/users/me`}>
          <Icon type="user" />
        </Link>
      </Menu.Item>
    ];

    return (
      <div style={{ marginLeft: "17%", marginRight: "17%" }}>
        <Row>
          <Col span={8}>
            <div className="app-logo-container">
              <Link to="/">
                <span>𝓜𝔂 𝓜𝓸𝓶𝓮𝓷𝓽𝓼</span>
              </Link>
            </div>
          </Col>

          <Col span={6}>
            <Search />
          </Col>
          <Col span={2}>
            <NewPost onGetUserPosts={this.props.onGetUserPosts} />
          </Col>

          <Col span={8} push={4}>
            <Menu
              mode="horizontal"
              className="app-menu"
              selectable={false}
              onClick={this.handleMenuItemClick}
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
