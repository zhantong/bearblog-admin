import React, { Component } from "react";
import request from "../utils/ApiClient";
import { Table, Button } from "antd";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
    this.expandedRowRender = this.expandedRowRender.bind(this);
  }
  componentDidMount() {
    request({
      url: `articles`,
      method: "GET"
    }).then(res => {
      this.setState({ articles: res.value });
    });
  }
  expandedRowRender(record) {
    const columns = [
      { title: "标题", dataIndex: "title", key: "title" },
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
        render: (text, article) => (
          <Button
            type="danger"
            onClick={() => {
              this.deleteArticle(article.number);
            }}
          >
            删除
          </Button>
        )
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={record.articles}
        pagination={false}
      />
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
        dataSource={this.state.articles}
      />
    );
  }
  deleteArticle(number) {
    request({
      url: `article/${number}`,
      method: "DELETE"
    }).then(() => {
      request({
        url: `articles`,
        method: "GET"
      }).then(res => {
        this.setState({ articles: res.value });
      });
    });
  }
}

export default ArticleList;
