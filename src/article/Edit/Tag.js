import React, { Component } from "react";
import { Collapse, Select } from "antd";
import request from "../../utils/ApiClient";

class Tag extends Component {
  state = { allTags: [] };

  componentDidMount() {
    this._fetchAllTags();
  }
  render() {
    return (
      <Collapse defaultActiveKey="1">
        <Collapse.Panel header="标签" key="1">
          <Select
            mode="tags"
            placeholder="标签"
            style={{ width: "100%" }}
            onChange={value => this.handleChange(value)}
            value={this.props.data}
          >
            {this.state.allTags.map(tag => (
              <Select.Option key={tag}>{tag}</Select.Option>
            ))}
          </Select>
        </Collapse.Panel>
      </Collapse>
    );
  }
  handleChange(tags) {
    this.props.onDataChange(tags);
  }
  _fetchAllTags() {
    request({
      url: `tags`,
      method: "GET"
    }).then(res => {
      this.setState({ allTags: res.value });
    });
  }
}

export default Tag;
