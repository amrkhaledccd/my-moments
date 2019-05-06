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
import {
  getUserProfile,
  getUserPosts,
  getfollowersAndFollowing,
  follow,
  isFollowing,
  getfollowers,
  getfollowing
} from "../../util/ApiUtil";
import PostGrid from "../../post/postgrid/PostGrid";
import FollowModal from "./FollowModal";
import { ACCESS_TOKEN } from "../../common/constants";

const TabPane = Tabs.TabPane;

class Profile extends Component {
  state = {
    isLoading: false,
    followers: 0,
    following: 0,
    followersModalVisible: false,
    followingModalVisible: false,
    currentUser: {},
    loggedInUser: this.props.currentUser,
    posts: [],
    followLoading: false,
    isFollowing: false,
    followText: "Follow"
  };

  componentDidMount = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      this.props.history.push("/login");
    }

    const username = this.props.match.params.username;
    this.loadUserProfile(username);
    this.getfollowersAndFollowing(username);
    if (this.props.currentUser !== null) {
      this.isFollowing(this.props.currentUser.username, username);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.handleFollowersCancel();
      this.handleFollowingCancel();
      const username = this.props.match.params.username;
      this.loadUserProfile(username);
      this.getfollowersAndFollowing(username);

      this.isFollowing(this.props.currentUser.username, username);
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

  getfollowersAndFollowing = username => {
    getfollowersAndFollowing(username).then(response =>
      this.setState({
        followers: response.inDegree,
        following: response.outDegree
      })
    );
  };

  isFollowing = (usernameA, usernameB) => {
    isFollowing(usernameA, usernameB).then(response => {
      if (response) {
        this.setState({ isFollowing: true });
      } else {
        isFollowing(usernameB, usernameA).then(res => {
          if (res) {
            this.setState({ isFollowing: false, followText: "Follow Back" });
          } else {
            this.setState({ isFollowing: false, followText: "Follow" });
          }
        });
      }
    });
  };

  handleGetUserPosts = () => {
    const username = this.props.match.params.username;
    getUserPosts(username).then(response => this.setState({ posts: response }));
  };

  handleFollow = () => {
    this.setState({ followLoading: true });

    const followRequest = {
      follower: this.props.currentUser,
      following: this.state.currentUser
    };

    follow(followRequest).then(response => {
      this.setState({ followLoading: false, isFollowing: true });
      this.getfollowersAndFollowing(this.state.currentUser.username);
    });
  };

  handleFollowersClick = () => {
    if (this.state.followers > 0) {
      getfollowers(this.state.currentUser.username).then(response =>
        this.setState({ followerList: response, followersModalVisible: true })
      );
    }
  };

  handleFollowingClick = () => {
    if (this.state.following > 0) {
      getfollowing(this.state.currentUser.username).then(response =>
        this.setState({ followingList: response, followingModalVisible: true })
      );
    }
  };

  handleFollowersCancel = () => {
    this.setState({ followersModalVisible: false, followerList: [] });
  };

  handleFollowingCancel = () => {
    this.setState({ followingModalVisible: false, followingList: [] });
  };

  handleOnItemClick = username => {
    this.props.history.push("/users/" + username);
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    let numOfPosts = 0;

    if (Array.isArray(this.state.posts)) {
      numOfPosts = this.state.posts.length;
    }

    let followBtn;

    if (!this.state.isFollowing) {
      followBtn = (
        <Button
          type="primary"
          className="follow-btn"
          loading={this.state.followLoading}
          onClick={this.handleFollow}
        >
          {this.state.followText}
        </Button>
      );
    } else {
      followBtn = (
        <Button type="secondary" className="follow-btn">
          Following
        </Button>
      );
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
                    <Col span={4}>{followBtn}</Col>
                  </Row>
                  <Row>
                    <Col span={15}>
                      <List
                        grid={{ gutter: 2, column: 3 }}
                        split={false}
                        dataSource={[
                          {
                            content: (
                              <span>
                                <span
                                  style={{ fontWeight: 700, marginRight: 5 }}
                                >
                                  {numOfPosts}
                                </span>
                                posts
                              </span>
                            )
                          },
                          {
                            content: (
                              <span>
                                <span
                                  style={{ fontWeight: 700, marginRight: 5 }}
                                >
                                  {this.state.followers}
                                </span>
                                followers
                              </span>
                            ),
                            onClick: this.handleFollowersClick,
                            className: "pointer"
                          },
                          {
                            content: (
                              <span>
                                <span
                                  style={{ fontWeight: 700, marginRight: 5 }}
                                >
                                  {this.state.following}
                                </span>
                                following
                              </span>
                            ),
                            onClick: this.handleFollowingClick,
                            className: "pointer"
                          }
                        ]}
                        renderItem={item => (
                          <List.Item
                            className={item.className}
                            onClick={item.onClick}
                          >
                            {item.content}
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
        <FollowModal
          visible={this.state.followersModalVisible}
          title="Followers"
          dataSource={this.state.followerList}
          onCancel={this.handleFollowersCancel}
          onItemClick={this.handleOnItemClick}
        />
        <FollowModal
          visible={this.state.followingModalVisible}
          title="Following"
          dataSource={this.state.followingList}
          onCancel={this.handleFollowingCancel}
          onItemClick={this.handleOnItemClick}
        />
      </div>
    );
  }
}

export default Profile;
