import React, { Component } from "react";
import { Avatar, Card, Icon, Input, List } from "antd";
import "./postlist.css";

class PostList extends Component {
  state = { currentUser: { ...this.props.currentUser } };

  getPostRender = item => {
    return (
      <List.Item className="post-list-item ">
        <Card bodyStyle={{ padding: 0 }} className="post-card">
          <div className="post-user-container">
            <Avatar src={item.userPic} className="post-user-avatar-circle" />
            <span className="post-username">{item.username}</span>
          </div>
          <div>
            <img alt="postId" className="post-img" src={item.imageUrl} />
          </div>
          <div className="post-actions">
            <Icon type="heart" />
            <Icon type="message" />
            <Icon type="upload" />
            <Icon type="book" className="post-action-book" />
          </div>
          <div className="comment-input-container">
            <Input placeholder="Add comment" />
          </div>
        </Card>
      </List.Item>
    );
  };

  render() {
    const data = [
      {
        username: "mosalah",
        imageUrl:
          "https://scontent-ber1-1.cdninstagram.com/vp/4134f3fda8274d81d2b9a230363ab726/5D9CAA3E/t51.2885-15/e35/p1080x1080/60962985_711959852552300_2236926061042845839_n.jpg?_nc_ht=scontent-ber1-1.cdninstagram.com",
        userPic:
          "https://scontent-ber1-1.cdninstagram.com/vp/b0a604cf102c8c80050f80e5adb5bc28/5D784DBD/t51.2885-19/s150x150/61448296_852636165097426_3602678044591915008_n.jpg?_nc_ht=scontent-ber1-1.cdninstagram.com"
      },
      {
        username: "nicole",
        imageUrl:
          "https://scontent-ber1-1.cdninstagram.com/vp/0516d2a92728efe36745da33a2b2a80d/5D85C338/t51.2885-15/sh0.08/e35/s640x640/62407036_141431193672906_7348878471045387426_n.jpg?_nc_ht=scontent-ber1-1.cdninstagram.com",
        userPic:
          "https://scontent-ber1-1.cdninstagram.com/vp/7056d98b38fbb4385aa21db6ab0a8ad3/5D8DD45F/t51.2885-19/s150x150/16465350_1655196611444099_5930266198347350016_a.jpg?_nc_ht=scontent-ber1-1.cdninstagram.com"
      },
      {
        username: "josefrakich",
        imageUrl:
          "https://scontent-ber1-1.cdninstagram.com/vp/96f47fe1d56eb213965f87e0998f7ac0/5D9200C4/t51.2885-15/e35/p1080x1080/61161464_1419345244896650_279110253350909451_n.jpg?_nc_ht=scontent-ber1-1.cdninstagram.com",
        userPic:
          "https://scontent-ber1-1.cdninstagram.com/vp/4c73211a69f4f4d670de1c4e4580c604/5D9E99C7/t51.2885-19/s150x150/30591366_2555910804633524_5260868190619041792_n.jpg?_nc_ht=scontent-ber1-1.cdninstagram.com"
      }
    ];

    return (
      <List
        dataSource={data}
        renderItem={item => this.getPostRender(item)}
        split={false}
      />
    );
  }
}

export default PostList;
