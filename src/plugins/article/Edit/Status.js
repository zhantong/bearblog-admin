import React, { Component } from "react";
import { Collapse, Select } from "antd";

class Status extends Component {
  constructor(props) {
    super(props);
    this._handleStatusChange = this._handleStatusChange.bind(this);
  }
  componentDidUpdate() {
    if (!this.props.data) {
      this._handleStatusChange("published");
    }
  }
  render() {
    return (
      <Collapse defaultActiveKey="1">
        <Collapse.Panel header="状态" key="1">
          <Select
            style={{ width: "100%" }}
            placeholder="状态"
            onChange={value => this._handleStatusChange(value)}
            value={this.props.data}
          >
            <Select.Option key="published" value="published">
              Published
            </Select.Option>
            <Select.Option key="archived" value="archived">
              Archived
            </Select.Option>
            <Select.Option key="draft" value="draft">
              Draft
            </Select.Option>
            <Select.Option key="hidden" value="hidden">
              Hidden
            </Select.Option>
          </Select>
        </Collapse.Panel>
      </Collapse>
    );
  }
  _handleStatusChange(status) {
    this.props.onDataChange(status);
  }
}

export default Status;
