import React, { Component } from "react";
import "./newsfeed.css";
import { Row, Col, Avatar } from "antd";
import { ACCESS_TOKEN } from "../../common/constants";

class NewsFeed extends Component {
  state = { currentUser: { ...this.props.currentUser } };

  componentDidMount = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="feed-container">
        <Row>
          <Col span={16}>Hello there</Col>
          <Col span={8}>
            <Row>
              <Col span={6}>
                <div className="user-avatar">
                  <Avatar
                    src={this.state.currentUser.profilePicture}
                    className="feed-user-avatar-circle"
                  />
                </div>
              </Col>
              <Col className="feed-user-details-container" span={18}>
                <div className="feed-username">
                  {this.state.currentUser.username}
                </div>
                <div className="feed-name">{this.state.currentUser.name}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewsFeed;
