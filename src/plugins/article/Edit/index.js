import React, { Component } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import request from "utils/ApiClient";
import { Redirect } from "react-router";
import pluginManager from "plugins";
import Timestamp from "./Timestamp";
import Status from "./Status";

class Edit extends Component {
  state = { article: { plugin: {} } };

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
          <Button
            type="primary"
            block
            onClick={() => {
              this.handleSubmitArticle(this.state.article);
            }}
          >
            发布
          </Button>
          <Timestamp
            data={this.state.article["timestamp"]}
            onDataChange={this._handleArticleDataChange("timestamp")}
          />
          <Status
            data={this.state.article["status"]}
            onDataChange={this._handleArticleDataChange("status")}
          />
          {pluginManager.getAttaches("article").map(attach => {
            if (attach.attach.edit) {
              const Element = attach.attach.edit.component;
              return (
                <Element
                  article={this.state.article}
                  data={
                    this.state.article &&
                    this.state.article.plugin[attach.pluginId]
                  }
                  onDataChange={this._handlePluginDataChange(attach.pluginId)}
                />
              );
            }
          })}
        </Col>
      </Row>
    );
  }
  _handleArticleDataChange(name) {
    return function(data) {
      this.setState(prevState => {
        return (prevState.article[name] = data);
      });
    }.bind(this);
  }
  _handlePluginDataChange(pluginName) {
    return function(data) {
      this.setState(prevState => {
        return (prevState.article.plugin[pluginName] = data);
      });
    }.bind(this);
  }
  _fetchArticle(id) {
    if (id) {
      this._asyncRequest = request({
        url: `article/${id}`,
        method: "GET"
      }).then(res => {
        this.setState({ article: res });
      });
    } else {
      this.setState({ article: { plugin: {} } });
    }
  }

  handleSubmitArticle(article) {
    if (article.id) {
      this._updateArticle(article);
    } else {
      this._create_article(article);
    }
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
  _create_article(article) {
    request({
      url: `articles`,
      method: "POST",
      data: article
    }).then(res => {
      this.setState({ redirect: true });
    });
  }
}

export default Edit;
