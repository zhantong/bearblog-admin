import React, { Component } from "react";
import { Form, Input } from "antd";
import request from "../../utils/ApiClient";

class Edit extends Component {
  state = { article: null };
  constructor(props) {
    super(props);
    // this.state = { articles: [] };
    // this.expandedRowRender = this.expandedRowRender.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.number !== state.prevNumber) {
      return {
        prevNumber: props.number,
        article: null
      };
    }
    return null;
  }
  componentDidMount() {
    if (this.props.number) {
      this._fetchArticle(this.props.number);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.article === null &&
      !this._asyncRequest &&
      this.props.number
    ) {
      this._fetchArticle(this.props.number);
    }
  }

  render() {
    const { article = null } = this.state;
    return (
      <div>
        <Form.Item label="标题">
          <Input value={article && article.title} />
        </Form.Item>
        <Form.Item label="内容">
          <Input.TextArea rows={10} value={article && article.body} />
        </Form.Item>
      </div>
    );
  }
  _fetchArticle(number) {
    this._asyncRequest = request({
      url: `article/${number}`,
      method: "GET"
    }).then(res => {
      this.setState({ article: res });
    });
  }
}

export default Edit;
