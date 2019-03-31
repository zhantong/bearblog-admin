import React from "react";
import { Tag } from "antd";

export default ({ data }) => {
  return (
    <div>
      {data.map(tag => (
        <Tag>{tag.name}</Tag>
      ))}
    </div>
  );
};
