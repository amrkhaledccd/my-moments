import React, { Component } from "react";
import "./meprofile.css";
import {
  Row,
  Col,
  Avatar,
  Tabs,
  Icon,
  Button,
  List,
  Empty,
  notification,
  Spin
} from "antd";
import ProfileModal from "./ProfileModal";
import FollowModal from "./FollowModal";
import {
  uploadImage,
  updateProfilePicture,
  getfollowersAndFollowing,
  getfollowers,
  getfollowing
} from "../../util/ApiUtil";
import PostGrid from "../../post/postgrid/PostGrid";
import { ACCESS_TOKEN } from "../../common/constants";

const TabPane = Tabs.TabPane;

class MeProfile extends Component {
  state = {
    settingModalVisible: false,
    profilePicModalVisible: false,
    profilePicUploading: false,
    followersModalVisible: false,
    followingModalVisible: false,
    followers: 0,
    following: 0,
    currentUser: { ...this.props.currentUser }
  };

  componentDidMount = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      this.props.history.push("/login");
    }

    this.getfollowersAndFollowing(this.state.currentUser.username);
  };

  getfollowersAndFollowing = username => {
    getfollowersAndFollowing(username).then(response =>
      this.setState({
        followers: response.inDegree,
        following: response.outDegree
      })
    );
  };

  showSettingModal = () => {
    this.setState({ settingModalVisible: true });
  };

  hideSettingModal = () => {
    this.setState({ settingModalVisible: false });
  };

  handleLogout = () => {
    this.setState({ settingModalVisible: false });
    this.props.onLogout();
  };

  showProfilePicModal = () => {
    this.setState({ profilePicModalVisible: true });
  };

  hideProfilePicModal = () => {
    this.setState({ profilePicModalVisible: false });
  };

  handleUpload = file => {
    this.setState({ profilePicUploading: true });
    this.hideProfilePicModal();

    const data = new FormData();
    data.append("image", file);

    uploadImage(data)
      .then(response => {
        updateProfilePicture(response.uri)
          .then(res => {
            let currentUser = { ...this.state.currentUser };
            currentUser.profilePicture = response.uri;

            this.setState({
              currentUser: { ...currentUser }
            });

            this.props.onUpdateCurrentUser(currentUser);

            notification.success({
              message: "MyMoments",
              description: "Profile picture updated"
            });
          })
          .catch(error => {
            notification.error({
              message: "MyMoments",
              description: "Something went wrong. Please try again!"
            });
          });
      })
      .catch(error => {
        notification.error({
          message: "MyMoments",
          description:
            error.message || "Something went wrong. Please try again!"
        });
      });

    this.setState({ profilePicUploading: false });
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
    let numOfPosts = 0;

    if (Array.isArray(this.props.posts)) {
      numOfPosts = this.props.posts.length;
    }

    return (
      <div className="profile-container">
        <Row>
          <Col span={24}>
            <div className="user-details">
              <Row>
                <Col span={8}>
                  <div className="user-avatar">
                    <Spin
                      spinning={this.state.profilePicUploading}
                      tip="Uploading..."
                    >
                      <Avatar
                        src={this.state.currentUser.profilePicture}
                        className="user-avatar-circle"
                        onClick={this.showProfilePicModal}
                      />
                    </Spin>
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
                      <Button className="edit-profile">Edit profile</Button>
                    </Col>
                    <Col span={11}>
                      <Icon
                        className="setting"
                        type="setting"
                        onClick={this.showSettingModal}
                      />
                    </Col>
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
                  onGetUserPosts={this.props.onGetUserPosts}
                  posts={this.props.posts}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type="save" />
                    SAVED
                  </span>
                }
                key="2"
              >
                <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={
                    <span>
                      Save photos and videos that you want to see again
                    </span>
                  }
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
                  description={
                    <span>
                      When people tag you in photos, they'll appear here.
                    </span>
                  }
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <ProfileModal
          visible={this.state.settingModalVisible}
          title={null}
          dataSource={[
            { onClick: null, text: "Change password" },
            { onClick: null, text: "Nametag" },
            { onClick: null, text: "Authorized App" },
            { onClick: null, text: "Notifications" },
            { onClick: null, text: "Privacy and Security" },
            { onClick: this.handleLogout, text: "Logout" },
            { onClick: this.hideSettingModal, text: "Cancel" }
          ]}
        />
        <ProfileModal
          visible={this.state.profilePicModalVisible}
          title="Change profile photo"
          dataSource={[
            {
              onClick: null,
              text: "Upload Photo",
              isUpload: true,
              onUpload: this.handleUpload
            },
            { onClick: this.hideProfilePicModal, text: "Cancel" }
          ]}
        />
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

export default MeProfile;
