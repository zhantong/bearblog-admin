import React, { Component } from "react";
import { Collapse, Select, Upload, Icon, List, Button } from "antd";
import request from "../../../utils/ApiClient";
import { client as ApiClient } from "../../../utils/ApiClient";

class Attachment extends Component {
  state = { allAttachments: [] };

  componentDidMount() {
    this._fetchAllAttachments();
  }

  customRequest = async ({ action, file, onSuccess, onError, onProgress }) => {
    const { base64, filename } = await new Promise(resolve => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve({
          base64: fileReader.result.split(",")[1],
          filename: file.name
        });
      };
    });
    ApiClient.post(
      `article/${this.props.articleId}/attachment`,
      {
        base64,
        filename
      },
      { onUploadProgress: onProgress }
    ).then(response => {
      onSuccess(response.data);
      this._fetchAllAttachments();
    }, onError);
    return {
      abort() {
        alert("image uploader aborted");
      }
    };
  };

  render() {
    return (
      <Collapse defaultActiveKey="1">
        <Collapse.Panel header="附件" key="1">
          <Upload.Dragger customRequest={this.customRequest}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
          <List
            itemLayout="horizontal"
            dataSource={this.state.allAttachments}
            renderItem={attachment => (
              <List.Item
                actions={[
                  <Button
                    type="danger"
                    onClick={() => this._deleteAttachment(attachment.id)}
                  >
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={attachment.filename} />
              </List.Item>
            )}
          />
        </Collapse.Panel>
      </Collapse>
    );
  }
  _deleteAttachment(id) {
    request({
      url: `article/${this.props.articleId}/attachment/${id}`,
      method: "DELETE"
    }).then(res => {
      this._fetchAllAttachments();
    });
  }
  _fetchAllAttachments() {
    request({
      url: `article/${this.props.articleId}/attachments`,
      method: "GET"
    }).then(res => {
      this.setState({ allAttachments: res.value });
    });
  }
}

export default Attachment;
