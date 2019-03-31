import React, { Component } from "react";
import request from "utils/ApiClient";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
  }
  componentDidMount() {
    request({
      url: `tags`,
      method: "GET"
    }).then(res => {
      this.setState({ tags: res.value });
    });
  }
  render() {
    const columns = [
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        render: (text, tag) => (
          <Link
            to={{
              pathname: "/tag/edit",
              search: `?id=${tag.id}`
            }}
          >
            {text}
          </Link>
        )
      },
      { title: "文章数", dataIndex: "countArticle", key: "countArticle" },
      {
        title: "操作",
        key: "action",
        render: (text, tag) => (
          <Button
            type="danger"
            onClick={() => {
              this.deleteTag(tag.id);
            }}
          >
            删除
          </Button>
        )
      }
    ];
    return <Table columns={columns} dataSource={this.state.tags} />;
  }
  deleteTag(id) {
    request({
      url: `tag/${id}`,
      method: "DELETE"
    }).then(() => {
      request({
        url: `tags`,
        method: "GET"
      }).then(res => {
        this.setState({ tags: res.value });
      });
    });
  }
}

export default TagList;
