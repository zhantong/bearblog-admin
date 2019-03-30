import React, { Component } from "react";
import { Collapse, Select,Switch } from "antd";
import request from "../../utils/ApiClient";

class Template extends Component {
  state = { allTemplates: [] };

  componentDidMount() {
    this._fetchAllTemplates();
  }

  render() {
    return (
      <Collapse defaultActiveKey="1">
        <Collapse.Panel header="模板" key="1">
          <Select
            placeholder="模板"
            style={{ width: "100%" }}
            onChange={value => this.handleChange(value)}
            value={this.props.data}
          >
            {this.state.allTemplates.map(template => (
              <Select.Option key={template.id} value={template.id}>
                {template.name}
              </Select.Option>
            ))}
          </Select>
        </Collapse.Panel>
      </Collapse>
    );
  }
  handleChange(templateId) {
    this.props.onDataChange(templateId);
  }
  _fetchAllTemplates() {
    request({
      url: `templates`,
      method: "GET"
    }).then(res => {
      this.setState({ allTemplates: res.value });
    });
  }
}

export default Template;
