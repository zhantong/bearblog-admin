import React, { Component } from "react";
import { Collapse, Select } from "antd";
import request from "../../../utils/ApiClient";

class Category extends Component {
  state = { allCategories: [] };

  componentDidMount() {
    this._fetchAllCategories();
  }

  render() {
    return (
      <Collapse defaultActiveKey="1">
        <Collapse.Panel header="分类" key="1">
          <Select
            mode="multiple"
            placeholder="分类"
            style={{ width: "100%" }}
            onChange={value => this.handleChange(value)}
            value={this.props.data}
          >
            {this.state.allCategories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Collapse.Panel>
      </Collapse>
    );
  }
  handleChange(categories) {
    this.props.onDataChange(categories);
  }
  _fetchAllCategories() {
    request({
      url: `categories`,
      method: "GET"
    }).then(res => {
      this.setState({ allCategories: res.value });
    });
  }
}

export default Category;
