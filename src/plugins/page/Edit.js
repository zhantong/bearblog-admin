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
  state = { page: null };

  componentDidMount() {
    if (this.props.id) {
      this._fetchPage(this.props.id);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this._fetchPage(this.props.id);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/page/list" />;
    }
    const { page = null } = this.state;
    return (
      <Row>
        <Col span={16}>
          <Form.Item label="标题">
            <Input
              value={this.state.page && this.state.page.title}
              onChange={event => {
                this.setState({
                  page: { ...this.state.page, title: event.target.value }
                });
              }}
            />
          </Form.Item>
          <Form.Item label="内容">
            <Input.TextArea
              rows={10}
              value={this.state.page && this.state.page.body}
              onChange={event => {
                this.setState({
                  page: { ...this.state.page, body: event.target.value }
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Collapse defaultActiveKey="1">
            <Collapse.Panel header="发布" key="1">
              <Form.Item label="发布时间">
                <DatePicker value={page && moment(page.timestamp)} />
                <TimePicker value={page && moment(page.timestamp)} />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  this._updatePage(this.state.page);
                }}
              >
                发布
              </Button>
            </Collapse.Panel>
          </Collapse>
          {pluginManager.getAttaches("page").map(attach => {
            if (attach.attach.edit) {
              const Element = attach.attach.edit.component;
              return (
                <Element
                  page={this.state.page}
                  data={
                    this.state.page && this.state.page.plugin[attach.pluginId]
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
  _handlePluginDataChange(pluginName) {
    return function(data) {
      this.setState(prevState => {
        return (prevState.page.plugin[pluginName] = data);
      });
    }.bind(this);
  }
  _fetchPage(id) {
    this._asyncRequest = request({
      url: `page/${id}`,
      method: "GET"
    }).then(res => {
      this.setState({ page: res });
    });
  }
  _updatePage(page) {
    this._asyncRequest = request({
      url: `page/${page.id}`,
      method: "PATCH",
      data: page
    }).then(res => {
      this.setState({ redirect: true });
    });
  }
}

export default Edit;
