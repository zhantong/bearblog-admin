import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

class Theme extends Component {
  state = { configUrl: "", config: "", secretKey: "" };
  constructor(props) {
    super(props);
    this.handleConfigUrlChange = this.handleConfigUrlChange.bind(this);
    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handleLoadConfig = this.handleLoadConfig.bind(this);
    this.handleSaveConfig = this.handleSaveConfig.bind(this);
    this.handleSecretKeyChange = this.handleSecretKeyChange.bind(this);
  }
  render() {
    return (
      <>
        <Form.Item label="配置文件URL">
          <Input
            value={this.state.configUrl}
            onChange={this.handleConfigUrlChange}
          />
        </Form.Item>
        <Form.Item label="Secret Key">
          <Input
            value={this.state.secretKey}
            onChange={this.handleSecretKeyChange}
          />
        </Form.Item>
        <Button onClick={this.handleLoadConfig}>读取</Button>
        <Button onClick={this.handleSaveConfig}>写入</Button>
        <Input.TextArea
          autosize={{ minRows: 4 }}
          value={this.state.config}
          onChange={this.handleConfigChange}
        />
      </>
    );
  }
  handleConfigUrlChange(event) {
    this.setState({ configUrl: event.target.value });
  }
  handleConfigChange(event) {
    this.setState({ config: event.target.value });
  }
  handleSecretKeyChange(event) {
    this.setState({ secretKey: event.target.value });
  }
  handleLoadConfig() {
    axios({
      url: this.state.configUrl,
      method: "GET",
      headers: { Authorization: this.state.secretKey }
    }).then(res => {
      this.setState({ config: JSON.stringify(res.data, null, 2) });
    });
  }
  handleSaveConfig() {
    axios({
      url: this.state.configUrl,
      method: "POST",
      data: JSON.parse(this.state.config),
      headers: { Authorization: this.state.secretKey }
    }).then(res => {
      console.log(res);
    });
  }
}

export default Theme;
