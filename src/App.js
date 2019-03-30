import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import queryString from "query-string";
import pluginManager from "./plugins";

class App extends Component {
  render() {
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
                        const Element = entry.main;
                        return <Element {...params} />;
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
}

export default App;
