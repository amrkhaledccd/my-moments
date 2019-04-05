import React, { Component } from "react";
import "./profile.css";
import { Row, Col, Avatar, Tabs, Icon } from "antd";
import photo from "../../images/amr.jpg";

const TabPane = Tabs.TabPane;

class Profile extends Component {
  state = {};

  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
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
                    <Avatar src={photo} className="user-avatar-circle" />
                  </div>
                </Col>
                <Col span={16} />
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
              />
              <TabPane
                tab={
                  <span>
                    <Icon type="save" />
                    SAVED
                  </span>
                }
                key="2"
              />
              <TabPane
                tab={
                  <span>
                    <Icon type="robot" />
                    TAGGED
                  </span>
                }
                key="3"
              />
            </Tabs>
            ,
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
