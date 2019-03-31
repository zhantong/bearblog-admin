import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Collapse,
  DatePicker,
  TimePicker,
  Button
} from "antd";
import request from "utils/ApiClient";
import moment from "moment";
import { Redirect } from "react-router";

import pluginManager from "plugins";

class Edit extends Component {
  state = { article: null };

  componentDidMount() {
    if (this.props.id) {
      this._fetchArticle(this.props.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this._fetchArticle(this.props.id);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/article/list" />;
    }
    const { article = null } = this.state;
    return (
      <Row>
        <Col span={16}>
          <Form.Item label="标题">
            <Input
              value={this.state.article && this.state.article.title}
              onChange={event => {
                this.setState({
                  article: { ...this.state.article, title: event.target.value }
                });
              }}
            />
          </Form.Item>
          <Form.Item label="内容">
            <Input.TextArea
              rows={10}
              value={this.state.article && this.state.article.body}
              onChange={event => {
                this.setState({
                  article: { ...this.state.article, body: event.target.value }
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Collapse defaultActiveKey="1">
            <Collapse.Panel header="发布" key="1">
              <Form.Item label="发布时间">
                <DatePicker value={article && moment(article.timestamp)} />
                <TimePicker value={article && moment(article.timestamp)} />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  this._updateArticle(this.state.article);
                }}
              >
                发布
              </Button>
            </Collapse.Panel>
          </Collapse>
          {pluginManager.plugins.map(plugin => {
            if (
              plugin.attach &&
              plugin.attach.article &&
              plugin.attach.article.edit
            ) {
              const Element = plugin.attach.article.edit.component;
              return (
                <Element
                  article={this.state.article}
                  data={
                    this.state.article && this.state.article.plugin[plugin.id]
                  }
                  onDataChange={this._handlePluginDataChange(plugin.id)}
                />
              );
            }
          })}
        </Col>
      </Row>
    );
  }
  _handlePluginDataChange(pluginName) {
    return function(data) {
      this.setState(prevState => {
        return (prevState.article.plugin[pluginName] = data);
      });
    }.bind(this);
  }
  _fetchArticle(id) {
    this._asyncRequest = request({
      url: `article/${id}`,
      method: "GET"
    }).then(res => {
      this.setState({ article: res });
    });
  }
  _updateArticle(article) {
    this._asyncRequest = request({
      url: `article/${article.id}`,
      method: "PATCH",
      data: article
    }).then(res => {
      this.setState({ redirect: true });
    });
  }
}

export default Edit;
