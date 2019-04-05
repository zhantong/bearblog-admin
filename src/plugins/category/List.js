import React, { Component } from "react";
import request from "utils/ApiClient";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }
  componentDidMount() {
    request({
      url: `categories`,
      method: "GET"
    }).then(res => {
      this.setState({ categories: res.value });
    });
  }
  render() {
    const columns = [
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        render: (text, category) => (
          <Link
            to={{
              pathname: "/category/edit",
              search: `?id=${category.id}`
            }}
          >
            {text}
          </Link>
        )
      },
      {
        title: "文章数",
        dataIndex: "countArticle",
        key: "countArticle",
        render: (text, category) => (
          <Link
            to={{
              pathname: "/article/list",
              search: `?category=${category.slug}`
            }}
          >
            {text}
          </Link>
        )
      },
      {
        title: "操作",
        key: "action",
        render: (text, category) => (
          <Button
            type="danger"
            onClick={() => {
              this.deleteCategory(category.id);
            }}
          >
            删除
          </Button>
        )
      }
    ];
    return <Table columns={columns} dataSource={this.state.categories} />;
  }
  deleteCategory(id) {
    request({
      url: `category/${id}`,
      method: "DELETE"
    }).then(() => {
      request({
        url: `categories`,
        method: "GET"
      }).then(res => {
        this.setState({ categories: res.value });
      });
    });
  }
}

export default CategoryList;
