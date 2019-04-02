import React, { Component } from "react";
import "./App.css";
import LoadingIndicator from "../common/LoadingIndicator";
import { Route, withRouter, Switch } from "react-router-dom";
import { Layout, notification } from "antd";
import AppHeader from "../common/AppHeader";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import NewsFeed from "../post/NewsFeed";
import { getCurrentUser } from "../util/ApiUtil";

const { Header, Content } = Layout;

class App extends Component {
  state = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false
  };

  componentDidMount = () => {
    this.loadCurrentUser();
  };

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleLogin = () => {
    notification.success({
      message: "Polling App",
      description: "You're successfully logged in."
    });
    this.loadCurrentUser();
    this.props.history.push("/");
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
              <Route
                exact
                path="/"
                render={props => (
                  <NewsFeed
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/login"
                render={props => (
                  <Login
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    onLogin={this.handleLogin}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/signup"
                render={props => (
                  <Signup
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
