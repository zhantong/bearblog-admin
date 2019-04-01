import React, { Component } from "react";
import request from "utils/ApiClient";
import { Table, Button } from "antd";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }
  componentDidMount() {
    request({
      url: `comments`,
      method: "GET"
    }).then(res => {
      this.setState({ comments: res.value });
    });
  }
  render() {
    const columns = [
      {
        title: "标题",
        key: "title",
        render: (text, comment) => <span>{comment.to && comment.to.title}</span>
      },
      {
        title: "作者",
        key: "author",
        render: (text, comment) => <span>{comment.author.name}</span>
      },
      {
        title: "邮箱",
        key: "email",
        render: (text, comment) => <span>{comment.author.email}</span>
      },
      {
        title: "时间",
        dataIndex: "timestamp",
        key: "timestamp"
      },
      {
        title: "IP",
        dataIndex: "ip",
        key: "ip"
      },
      {
        title: "内容",
        dataIndex: "body",
        key: "body",
        render: text => <p>{text}</p>
      },
      {
        title: "操作",
        key: "action",
        render: (text, comment) => (
          <Button
            type="danger"
            onClick={() => {
              this.deleteComment(comment.id);
            }}
          >
            删除
          </Button>
        )
      }
    ];
    return <Table columns={columns} dataSource={this.state.comments} />;
  }
  deleteComment(id) {
    request({
      url: `comment/${id}`,
      method: "DELETE"
    }).then(() => {
      request({
        url: `comments`,
        method: "GET"
      }).then(res => {
        this.setState({ comments: res.value });
      });
    });
  }
}

export default CommentList;
