import React, { Component } from "react";
import "./newsfeed.css";
import { Row, Col, Avatar, Card, Empty } from "antd";
import { ACCESS_TOKEN } from "../../common/constants";
import PostList from "./PostList";

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
            <PostList currentUser={this.state.currentUser} />
          </Col>
          <Col className="feed-user-detail-col" span={8}>
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
