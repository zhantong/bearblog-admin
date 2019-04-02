import React, { Component } from "react";
import request from "utils/ApiClient";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import pluginManager from "plugins";

class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = { pages: [] };
    this.expandedRowRender = this.expandedRowRender.bind(this);
  }
  componentDidMount() {
    request({
      url: `pages`,
      method: "GET"
    }).then(res => {
      this.setState({ pages: res.value });
    });
  }
  expandedRowRender(record) {
    const columns = [
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        render: (text, page) => (
          <Link
            to={{
              pathname: "/page/edit",
              search: `?id=${page.id}`
            }}
          >
            {text}
          </Link>
        )
      },
      { title: "时间", dataIndex: "timestamp", key: "timestamp" },
      { title: "状态", dataIndex: "status", key: "status" },
      {
        title: "版本时间",
        dataIndex: "versionTimestamp",
        key: "versionTimestamp"
      },
      {
        title: "操作",
        key: "action",
        render: (text, page) => (
          <Button
            type="danger"
            onClick={() => {
              this.deletePage(page.id);
            }}
          >
            删除
          </Button>
        )
      }
    ];
    pluginManager.getAttaches("page").forEach(attach => {
      if (attach.attach.list) {
        columns.push({
          title: attach.attach.list.column.title,
          key: attach.attach.list.column.title,
          render: (text, page) => {
            const Element = attach.attach.list.column.component;
            return <Element page={page} data={page.plugin[attach.pluginId]} />;
          }
        });
      }
    });
    return (
      <Table columns={columns} dataSource={record.pages} pagination={false} />
    );
  }
  render() {
    const columns = [
      { title: "Repository ID", dataIndex: "repositoryId", key: "repositoryId" }
    ];
    return (
      <Table
        columns={columns}
        expandedRowRender={this.expandedRowRender}
        dataSource={this.state.pages}
      />
    );
  }
  deletePage(id) {
    request({
      url: `page/${id}`,
      method: "DELETE"
    }).then(() => {
      request({
        url: `pages`,
        method: "GET"
      }).then(res => {
        this.setState({ pages: res.value });
      });
    });
  }
}

export default PageList;
