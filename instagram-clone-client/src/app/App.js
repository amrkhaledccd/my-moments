import React, { Component } from "react";
import "./App.css";
import LoadingIndicator from "../common/LoadingIndicator";
import { Route, withRouter, Switch } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "../common/AppHeader";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import NewsFeed from "../post/newsfeed/NewsFeed";
import { getCurrentUser } from "../util/ApiUtil";
import { ACCESS_TOKEN } from "../common/constants";
import Profile from "../user/profile/Profile";
import Discover from "../post/discover/Discover";

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
        this.logout();
        this.setState({
          isLoading: false
        });
      });
  }

  handleLogout = (redirectTo = "/login") => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push(redirectTo);
  };

  logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
  };

  handleLogin = () => {
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
          <AppHeader
            isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout}
            {...this.props}
          />
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
              <Route
                path="/users/:username"
                render={props => (
                  <Profile
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/discover"
                render={props => (
                  <Discover
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
