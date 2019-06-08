import React, { Component } from "react";
import "./App.css";
import LoadingIndicator from "../common/LoadingIndicator";
import { Route, withRouter, Switch } from "react-router-dom";
import { Layout, Affix } from "antd";
import AppHeader from "../common/AppHeader";
import Login from "../user/login/Login";
import Signup from "../user/signup/Signup";
import NewsFeed from "../post/newsfeed/NewsFeed";
import { getCurrentUser } from "../util/ApiUtil";
import { ACCESS_TOKEN } from "../common/constants";
import MeProfile from "../user/profile/MeProfile";
import Profile from "../user/profile/Profile";
import Discover from "../post/discover/Discover";
import { getCurrentUserPosts } from "../util/ApiUtil";

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
        console.log("Current profile picture: " + response.profilePicture);
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

  handleUpdateCurrentuser = currentuser => {
    this.setState({ currentUser: { ...currentuser } });
  };

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

  handleGetUserPosts = () => {
    getCurrentUserPosts().then(response => this.setState({ posts: response }));
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    let layoutHeader;

    if (this.state.isAuthenticated) {
      layoutHeader = (
        <Affix offsetTop={0}>
          <Header>
            <AppHeader
              isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
              onGetUserPosts={this.handleGetUserPosts}
              {...this.props}
            />
          </Header>
        </Affix>
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
                exact
                path="/users/me"
                render={props => (
                  <MeProfile
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    onLogout={this.handleLogout}
                    onUpdateCurrentUser={this.handleUpdateCurrentuser}
                    onGetUserPosts={this.handleGetUserPosts}
                    posts={this.state.posts}
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
