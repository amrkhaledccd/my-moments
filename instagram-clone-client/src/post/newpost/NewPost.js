import React, { Component } from "react";
import "./newpost.css";
import {
  Button,
  Modal,
  Upload,
  Icon,
  notification,
  Spin,
  Input,
  Row,
  Col
} from "antd";
import { uploadImage, createPost } from "../../util/ApiUtil";

const Dragger = Upload.Dragger;
const { TextArea } = Input;

class NewPost extends Component {
  state = {
    visible: false,
    loading: false,
    imageUrl: null,
    caption: "",
    uploading: false
  };

  hideModal = () => {
    this.setState({
      loading: false,
      visible: false,
      imageUrl: null,
      caption: "",
      uploading: false
    });
  };

  showModal = () => {
    this.setState({
      loading: false,
      visible: true,
      imageUrl: null,
      caption: "",
      uploading: false
    });
  };

  handleUpload = file => {
    this.setState({ uploading: true });

    const data = new FormData();
    data.append("image", file);

    uploadImage(data)
      .then(response => {
        this.setState({ imageUrl: response.uri, uploading: false });
      })
      .catch(error => {
        this.setState({ uploading: false });
        notification.error({
          message: "MyMoments",
          description:
            error.message || "Something went wrong. Please try again!"
        });
      });
  };

  handleInputChange = event => {
    this.setState({ caption: event.target.value });
  };

  handleShare = () => {
    this.setState({ loading: true });

    const createPostRequest = {
      imageUrl: this.state.imageUrl,
      caption: this.state.caption
    };

    createPost(createPostRequest)
      .then(response => {
        this.hideModal();
        this.props.onGetUserPosts();

        notification.success({
          message: "MyMoments",
          description: "New post shared"
        });
      })
      .catch(error => {
        this.setState({ loading: false });

        notification.error({
          message: "MyMoments",
          description:
            error.message || "Something went wrong. Please try again!"
        });
      });
  };

  render() {
    let modalContent;

    if (this.state.imageUrl === null) {
      modalContent = (
        <div>
          <Spin spinning={this.state.uploading} tip="Uploading...">
            <Dragger
              name="file"
              action={this.handleUpload}
              multiple={false}
              showUploadList={false}
              className="setting-modal-item"
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single upload. Strictly prohibit from uploading
                company data or other band files
              </p>
            </Dragger>
          </Spin>
        </div>
      );
    } else {
      modalContent = (
        <div visible={this.state.imageUrl !== null}>
          <Row>
            <Col span={8}>
              <img
                alt="postImage"
                style={{ width: 150, height: 150 }}
                src={this.state.imageUrl}
              />
            </Col>
            <Col span={16}>
              <TextArea
                style={{ maxHeight: 110 }}
                autosize={{ minRows: 4, maxRows: 6 }}
                placeholder="Add a caption"
                value={this.state.caption}
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div>
        <Button
          type="default"
          shape="circle"
          icon="plus"
          className="new-post"
          onClick={this.showModal}
        />

        <Modal
          visible={this.state.visible}
          title="Create New Post"
          closable={false}
          footer={[
            <Button key="back" onClick={this.hideModal}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              disabled={this.state.imageUrl === null}
              loading={this.state.loading}
              onClick={this.handleShare}
            >
              Share
            </Button>
          ]}
        >
          {modalContent}
        </Modal>
      </div>
    );
  }
}

export default NewPost;
