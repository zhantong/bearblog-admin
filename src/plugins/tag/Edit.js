import React, { Component } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import request from "utils/ApiClient";
import { Redirect } from "react-router";

class Edit extends Component {
  state = { tag: null };

  componentDidMount() {
    if (this.props.id) {
      this._fetchTag(this.props.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this._fetchTag(this.props.id);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/tag/list" />;
    }
    const { tag = null } = this.state;
    return (
      <Row>
        <Col span={16}>
          <Form.Item label="名称">
            <Input
              value={tag && tag.name}
              onChange={event => {
                event.persist();
                this.setState(prevState => ({
                  tag: { ...prevState.tag, name: event.target.value }
                }));
              }}
            />
          </Form.Item>
          <Form.Item label="描述">
            <Input.TextArea
              rows={3}
              value={tag && tag.description}
              onChange={event => {
                this.setState(prevState => ({
                  tag: { ...prevState.tag, description: event.target.value }
                }));
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                this._updateTag(tag);
              }}
            >
              发布
            </Button>
          </Form.Item>
        </Col>
      </Row>
    );
  }

  _fetchTag(id) {
    this._asyncRequest = request({
      url: `tag/${id}`,
      method: "GET"
    }).then(res => {
      this.setState({ tag: res });
    });
  }
  _updateTag(tag) {
    this._asyncRequest = request({
      url: `tag/${tag.id}`,
      method: "PATCH",
      data: tag
    }).then(res => {
      this.setState({ redirect: true });
    });
  }
}

export default Edit;
