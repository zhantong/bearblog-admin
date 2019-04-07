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
import { client as apiClient } from "utils/ApiClient";
import Login from "./Login";

class App extends Component {
  constructor(props) {
    super(props);
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
    return (
      <Router>
        <Layout>
          <Layout.Header />
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
}

export default App;
