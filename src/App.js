import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import List from "./article/List";
import Edit from "./article/Edit";

class App extends Component {
  render() {
    const routes = [
      {
        path: "/article/list",
        main: List
      },
      {
        path: "/article/edit",
        main: props => {
          let params = new URLSearchParams(props.location.search);
          return <Edit id={params.get("id")} />;
        }
      }
    ];
    return (
      <Router>
        <Layout>
          <Layout.Header />
          <Layout>
            <Layout.Sider style={{ background: "#fff" }}>
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                <Menu.SubMenu title="文章">
                  <Menu.Item key="1">
                    <Link to="/article/list">列表</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/article/edit">编辑</Link>
                  </Menu.Item>
                </Menu.SubMenu>
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
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </Layout.Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
