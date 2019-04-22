import React, { Component } from "react";
import "./profile.css";
import {
  Row,
  Col,
  Avatar,
  Tabs,
  Icon,
  Button,
  List,
  Empty,
  notification
} from "antd";
import LoadingIndicator from "../../common/LoadingIndicator";
import { getUserProfile, getUserPosts } from "../../util/ApiUtil";
import PostGrid from "../../post/postgrid/PostGrid";
import { ACCESS_TOKEN } from "../../common/constants";

const TabPane = Tabs.TabPane;

class Profile extends Component {
  state = {
    isLoading: false,
    currentUser: {},
    posts: []
  };

  componentDidMount = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      this.props.history.push("/login");
    }

    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  };

  componentDidUpdate = prevProps => {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      const username = this.props.match.params.username;
      this.loadUserProfile(username);
    }
  };

  loadUserProfile = username => {
    console.log("inside load profile");
    this.setState({ isLoading: true });

    getUserProfile(username)
      .then(response => {
        this.setState({ currentUser: response, isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });

        if (error.status === 404) {
          notification.error({
            message: "MyMoments",
            description: "user not found"
          });
        }
      });
  };

  handleGetUserPosts = () => {
    const username = this.props.match.params.username;
    getUserPosts(username).then(response => this.setState({ posts: response }));
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    let numOfPosts = 0;

    if (Array.isArray(this.state.posts)) {
      numOfPosts = this.state.posts.length;
    }

    return (
      <div className="profile-container">
        <Row>
          <Col span={24}>
            <div className="user-details">
              <Row>
                <Col span={8}>
                  <div className="user-avatar">
                    <Avatar
                      src={this.state.currentUser.profilePicture}
                      className="user-avatar-circle"
                    />
                  </div>
                </Col>
                <Col span={16}>
                  <Row>
                    <Col span={9}>
                      <h1 className="username">
                        {this.state.currentUser.username}
                      </h1>
                    </Col>
                    <Col span={4}>
                      <Button type="primary" className="follow-btn">
                        Follow
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={15}>
                      <List
                        grid={{ gutter: 2, column: 3 }}
                        split={false}
                        dataSource={[
                          { num: numOfPosts, str: " posts" },
                          { num: 0, str: " followers" },
                          { num: 0, str: " following" }
                        ]}
                        renderItem={item => (
                          <List.Item>
                            <span style={{ fontWeight: 700 }}>{item.num}</span>
                            {item.str}
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h1 className="name">{this.state.currentUser.name}</h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Tabs
              animated={false}
              tabBarStyle={{
                textAlign: "center",
                borderTop: "1px solid #e8e8e8",
                borderBottom: 0,
                color: "#999"
              }}
            >
              <TabPane
                tab={
                  <span>
                    <Icon type="table" />
                    POSTS
                  </span>
                }
                key="1"
              >
                <PostGrid
                  onGetUserPosts={this.handleGetUserPosts}
                  posts={this.state.posts}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="robot" />
                    TAGGED
                  </span>
                }
                key="3"
              >
                <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={<span>No Posts Yet</span>}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
