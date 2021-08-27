import React, {Component} from 'react';
import {Table, Divider, Modal, Tooltip} from 'antd';
import Show from './Show';
import Edit from './Edit';
import {Link} from 'react-router-dom';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {success, error} from '../../helpers/Notification';
import { videoActions } from "../../actions/VideoActions";

const {confirm} = Modal;

export default class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      videos: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      video: {},
    };
  }

  setShowModalVisible = video => {
    this.setState ({showVisible: true});
    this.setState ({video});
  };

  setEditModalVisible = video => {
    this.setState ({editVisible: true});
    this.setState ({video});
  };

  handleCancel = () => {
    this.setState ({editVisible: false, showVisible: false});
  };

  deleteVideo = videoId => {
    videoActions.deleteVideo(videoId).then (response => {
      if (response.status === 200) {
        videoActions.fetchVideos ().then (response => {
          this.setState ({videos: response.data});
          success ('Video has been sucessfully deleted.');
        });
      } else {
        error (
          response.data.error || 'Something went wrong. Please try again.'
        );
      }
    });
  };

  showConfirm = video => {
    confirm ({
      title: 'Do you Want to delete this video ?',
      content: `Video title =>  ${video.title}`,
      onOk: () => this.deleteVideo(video.id),
      onCancel () {
        console.log ('Cancel');
      },
    });
  };

  formatValues = values => {
    Object.entries (values).forEach (([key, value]) => {
      if (!value) {
        delete values[key];
      }
    });
    return values;
  };

  handleEdit = (values) => {
    this.setState({ editButton: true });
        videoActions.updateVideo(values, this.state.video.id).then((response) => {
          if (response.status === 200) {
            videoActions.fetchVideos().then((response) => {
              this.setState({
                videos: response.data,
                editVisible: false,
              });
            });
            success("Video has been sucessfully updated.");
          } else {
            error(
              response.data.error || "Something went wrong. Please try again."
            );
          }
          this.setState({ editButton: false });
        });
  };

  componentDidUpdate (prevProps) {
    if (this.props.table_data !== prevProps.table_data) {
      this.setState ({videos: this.props.table_data});
    }
  }

  render () {
    const columns = [
      {
        title: 'Video Tittle',
        dataIndex: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <Tooltip title="`View Video">
                <Link onClick={() => this.setShowModalVisible (record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Edit Video">
                <Link onClick={() => this.setEditModalVisible (record)}>
                  <EditOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete Video">
                <Link onClick={() => this.showConfirm (record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const {videos} = this.state;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={videos}
          rowKey={column => column.id}
          bordered
        />

        {this.state.editVisible &&
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            video={this.state.video}
            editButton={this.state.editButton}
          />}

        {this.state.showVisible &&
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            video={this.state.video}
          />}
      </div>
    );
  }
}
