import React, { Component } from "react";
import { Tag } from "antd";

class Category extends Component {
  render() {
    return (
      <div>
        {this.props.data.map(category => (
          <Tag>{category.name}</Tag>
        ))}
      </div>
    );
  }
}

export default Category;
