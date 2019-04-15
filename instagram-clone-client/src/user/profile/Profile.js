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
import ProfileModal from "./ProfileModal";
import { uploadImage, updateProfilePicture } from "../../util/ApiUtil";

const TabPane = Tabs.TabPane;

class Profile extends Component {
  state = {
    settingModalVisible: false,
    profilePicModalVisible: false,
    currentUser: { ...this.props.currentUser }
  };

  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
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
  };

  render() {
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
                      onClick={this.showProfilePicModal}
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
                          { num: 0, str: " posts" },
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
                <Empty
                  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                  description={<span>No Posts Yet</span>}
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
      </div>
    );
  }
}

export default Profile;
