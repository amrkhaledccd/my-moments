import React, { Component } from "react";
import "./App.css";
import LoadingIndicator from "../common/LoadingIndicator";
import { Route, withRouter, Switch } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

class App extends Component {
  state = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <Layout className="layout">
        {/* <Header> */}
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
        {/* </Header> */}
        <Content>
          {/* <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            Content
          </div> */}
        </Content>
      </Layout>
    );
  }
}

export default App;
