import React, { Component } from "react";
import { Modal, List, Upload } from "antd";
import "./profilemodal.css";

class ProfileModal extends Component {
  state = {};

  getItemRender = item => {
    let listItem = (
      <List.Item centered className="setting-modal-item" onClick={item.onClick}>
        {item.icon}
        {item.text}
      </List.Item>
    );

    if (item.isUpload) {
      listItem = (
        <Upload
          name="file"
          action={item.onUpload}
          multiple={false}
          showUploadList={false}
          className="setting-modal-item"
        >
          <List.Item
            centered
            className="setting-modal-item"
            onClick={item.onClick}
          >
            {item.icon}
            {item.text}
          </List.Item>
        </Upload>
      );
    }

    return listItem;
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        title={this.props.title}
        footer={null}
        closable={false}
        width={400}
        bodyStyle={{ padding: 0 }}
        centered
      >
        <List
          dataSource={this.props.dataSource}
          renderItem={item => this.getItemRender(item)}
        />
      </Modal>
    );
  }
}

export default ProfileModal;
