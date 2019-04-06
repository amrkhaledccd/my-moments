import React, { Component } from "react";
import "./profile.css";
import { Row, Col, Avatar, Tabs, Icon, Button, List, Empty } from "antd";
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
                <Col span={16}>
                  <Row>
                    <Col span={9}>
                      <h1 className="username">AmrKhaledccd</h1>
                    </Col>
                    <Col span={4}>
                      <Button>Edit profile</Button>
                    </Col>
                    <Col span={11}>
                      <Icon className="setting" type="setting" />
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
                      <h1 className="name">Amr Khaled</h1>
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
                  imageStyle={{
                    height: 200
                  }}
                  description={<span>No Posts Yet</span>}
                >
                  <Button type="primary">Create Now</Button>
                </Empty>
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
                  imageStyle={{
                    height: 200
                  }}
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
                  imageStyle={{
                    height: 200
                  }}
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
      </div>
    );
  }
}

export default Profile;
