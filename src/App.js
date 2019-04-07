import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import queryString from "query-string";
import pluginManager from "./plugins";
import request, { client as apiClient } from "utils/ApiClient";
import Login from "./Login";

class App extends Component {
  state = { me: null };

  constructor(props) {
    super(props);
    this._handleLogout = this._handleLogout.bind(this);

    let that = this;
    apiClient.interceptors.request.use(
      config => {
        if (localStorage.getItem("JWT_TOKEN")) {
          config.headers.Authorization = `Bearer ${localStorage.getItem(
            "JWT_TOKEN"
          )}`;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
    apiClient.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (error.response.status === 401) {
          that.handle401();
        }
        return Promise.reject(error);
      }
    );
  }
  componentDidMount() {
    this._fetchMe();
  }

  render() {
    if (!localStorage.getItem("JWT_TOKEN")) {
      return (
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect to={`/login?redirect=${window.location.pathname}`} />
          </Switch>
        </Router>
      );
    }
    let meMenuItem;
    if (this.state.me) {
      meMenuItem = (
        <Menu.SubMenu title={this.state.me.name}>
          <Menu.Item key="setting:1">
            <a onClick={() => this._handleLogout()}>注销</a>
          </Menu.Item>
        </Menu.SubMenu>
      );
    }
    console.log(this.state);
    return (
      <Router>
        <Layout>
          <Layout.Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px", float: "right" }}
            >
              {meMenuItem}
            </Menu>
          </Layout.Header>
          <Layout>
            <Layout.Sider style={{ background: "#fff" }}>
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                {pluginManager.plugins.map(plugin => (
                  <Menu.SubMenu key={plugin.id} title={plugin.name}>
                    {plugin.entries.map(entry => (
                      <Menu.Item key={entry.slug}>
                        <Link to={`/${plugin.id}/${entry.slug}`}>
                          {entry.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ))}
              </Menu>
            </Layout.Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Layout.Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0
                }}
              >
                {pluginManager.plugins.map(plugin => {
                  return plugin.entries.map(entry => (
                    <Route
                      key={`/${plugin.id}/${entry.slug}`}
                      path={`/${plugin.id}/${entry.slug}`}
                      component={props => {
                        let params = queryString.parse(props.location.search);
                        const Element = entry.main.component || entry.main;
                        return <Element {...params} {...entry.main.params} />;
                      }}
                    />
                  ));
                })}
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
  handle401() {
    localStorage.removeItem("JWT_TOKEN");
  }
  _fetchMe() {
    request({
      url: `me`,
      method: "GET"
    }).then(res => {
      this.setState({
        me: res
      });
    });
  }
  _handleLogout() {
    request({
      url: `logout`,
      method: "DELETE"
    }).then(res => {
      window.location.reload(false);
    });
  }
}

export default App;
