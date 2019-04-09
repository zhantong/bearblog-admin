import React, { Component } from "react";
import { Collapse, DatePicker, TimePicker } from "antd";
import moment from "moment";

class Timestamp extends Component {
  constructor(props) {
    super(props);
    this._handleDatetimeChange = this._handleDatetimeChange.bind(this);
  }
  componentDidUpdate() {
    if (!this.props.data) {
      this._handleDatetimeChange(moment());
    }
  }
  render() {
    const timestamp = this.props.data;
    return (
      <Collapse defaultActiveKey="1">
        <Collapse.Panel header="发布时间" key="1">
          <DatePicker
            value={moment(timestamp)}
            onChange={this._handleDatetimeChange}
          />
          <TimePicker
            value={moment(timestamp)}
            onChange={this._handleDatetimeChange}
          />
        </Collapse.Panel>
      </Collapse>
    );
  }
  _handleDatetimeChange(datetime) {
    this.props.onDataChange(datetime.toISOString());
  }
}

export default Timestamp;
