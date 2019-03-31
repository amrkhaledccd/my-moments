import React, { Component } from "react";
import "./App.css";
import LoadingIndicator from "../common/LoadingIndicator";
import { Route, withRouter, Switch } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../common/AppHeader";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";

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

    let layoutHeader;

    if (this.state.isAuthenticated) {
      layoutHeader = (
        <Header>
          <AppHeader />
        </Header>
      );
    }

    return (
      <Layout className="layout">
        {layoutHeader}
        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
