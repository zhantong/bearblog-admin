import React, { Component } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import request from "utils/ApiClient";
import { Redirect } from "react-router";

class Edit extends Component {
  state = { category: null };

  componentDidMount() {
    if (this.props.id) {
      this._fetchCategory(this.props.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this._fetchCategory(this.props.id);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/category/list" />;
    }
    const { category = null } = this.state;
    return (
      <Row>
        <Col span={16}>
          <Form.Item label="名称">
            <Input
              value={category && category.name}
              onChange={event => {
                event.persist();
                this.setState(prevState => ({
                  category: { ...prevState.category, name: event.target.value }
                }));
              }}
            />
          </Form.Item>
          <Form.Item label="描述">
            <Input.TextArea
              rows={3}
              value={category && category.description}
              onChange={event => {
                event.persist();
                this.setState(prevState => ({
                  category: {
                    ...prevState.category,
                    description: event.target.value
                  }
                }));
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                this._updateCategory(category);
              }}
            >
              发布
            </Button>
          </Form.Item>
        </Col>
      </Row>
    );
  }

  _fetchCategory(id) {
    this._asyncRequest = request({
      url: `category/${id}`,
      method: "GET"
    }).then(res => {
      this.setState({ category: res });
    });
  }
  _updateCategory(category) {
    this._asyncRequest = request({
      url: `category/${category.id}`,
      method: "PATCH",
      data: category
    }).then(res => {
      this.setState({ redirect: true });
    });
  }
}

export default Edit;
