import React, { Component } from "react";
import request from "utils/ApiClient";
import { Form, Input, Button } from "antd";
import cloneDeep from "clone-deep";

class ArticleList extends Component {
  state = {
    initialSettings: [],
    settings: []
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this._updateSetting = this._updateSetting.bind(this);
  }

  componentDidMount() {
    this._fetchSettings(this.props.settingsCategory);
  }

  render() {
    return (
      <Form>
        {this.state.settings.map(setting => {
          let initialSetting = this.state.initialSettings.find(
            initialSetting => setting.id === initialSetting.id
          );
          return (
            <Form.Item label={`${setting.name} (${setting.slug})`}>
              <Input
                name={setting.id}
                value={setting.rawValue}
                onChange={this.handleInputChange}
              />
              <Button
                type="primary"
                disabled={setting.rawValue === initialSetting.rawValue}
                onClick={() => {
                  this._updateSetting(setting.id, setting.rawValue);
                }}
              >
                更新
              </Button>
            </Form.Item>
          );
        })}
      </Form>
    );
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => {
      prevState.settings.forEach(setting => {
        if (setting.id === Number(name)) {
          setting.rawValue = value;
        }
      });
      return prevState;
    });
  }
  _fetchSettings(settingsCategory) {
    request({
      url: `settings/${settingsCategory}`,
      method: "GET"
    }).then(res => {
      this.setState({
        initialSettings: cloneDeep(res.value),
        settings: res.value
      });
    });
  }
  _updateSetting(id, rawValue) {
    request({
      url: `settings/${id}`,
      method: "PATCH",
      data: {
        rawValue
      }
    }).then(res => {
      this._fetchSettings(this.props.settingsCategory);
    });
  }
}

export default ArticleList;
