import React, { Component } from "react";
import "./newsfeed.css";
import { Row, Col, Avatar, Card, Icon, Input, Empty } from "antd";
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
          <Col span={16}>
            <Card bodyStyle={{ padding: 0 }} className="post-card">
              <div className="post-user-container">
                <Avatar
                  src={this.state.currentUser.profilePicture}
                  className="post-user-avatar-circle"
                />
                <span className="post-username">AmrKhaled</span>
              </div>
              <div>
                <img
                  className="post-img"
                  src="http://amr-hp-probook-450-g2:8000/images/amrkhaled/ed03dc30-26fa-4298-bfff-c3557ac32523.jpg"
                />
              </div>
              <div className="post-actions">
                <Icon type="heart" />
                <Icon type="message" />
                <Icon type="upload" />
                <Icon type="book" className="post-action-book" />
              </div>
              <div className="comment-input-container">
                <Input placeholder="Add comment" />
              </div>
            </Card>
          </Col>
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
            <Row>
              <Card
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 20
                }}
              >
                <p style={{ color: "#999" }}>Suggestions For You</p>
                <Empty />
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewsFeed;
