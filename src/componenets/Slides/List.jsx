import React, {Component} from 'react';
// import {slideActions} from '../../actions/slideActions';
import {Table, Divider, Modal, Tooltip} from 'antd';
import Show from './Show';
import Edit from './Edit';
import {Link} from 'react-router-dom';
import {EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {success, error} from '../../helpers/Notification';

const {confirm} = Modal;

export default class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      slides: props.table_data,
      editVisible: false,
      showVisible: false,
      editButton: false,
      slide: {},
    };
  }

  setShowModalVisible = slide => {
    this.setState ({showVisible: true});
    this.setState ({slide});
  };

  setEditModalVisible = slide => {
    this.setState ({editVisible: true});
    this.setState ({slide});
  };

  handleCancel = () => {
    this.setState ({editVisible: false, showVisible: false});
  };

  // deleteSlide = slideId => {
  //   slideActions.deleteSlide (slideId).then (response => {
  //     if (response.status === 204) {
  //       slideActions.fetchSlides ().then (response => {
  //         this.setState ({slides: response.data});
  //         success ('Slide has been sucessfully deleted.');
  //       });
  //     } else {
  //       error (
  //         response.data.error || 'Something went wrong. Please try again.'
  //       );
  //     }
  //   });
  // };

  // showConfirm = slide => {
  //   confirm ({
  //     title: 'Do you Want to delete this slide ?',
  //     content: `Slide title =>  ${slide.title}`,
  //     onOk: () => this.deleteSlide (slide.id),
  //     onCancel () {
  //       console.log ('Cancel');
  //     },
  //   });
  // };

  formatValues = values => {
    Object.entries (values).forEach (([key, value]) => {
      if (!value) {
        delete values[key];
      }
    });
    return values;
  };

  handleEdit = e => {
    // e.preventDefault ();
    // const {form} = this.formRef.props;
    // form.validateFields ((err, values) => {
    //   if (!err) {
    //     this.setState ({editButton: true});
    //     slideActions
    //       .updateSlide (
    //         this.formatValues (values),
    //         this.state.slide.id
    //       )
    //       .then (response => {
    //         if (response.status === 200) {
    //           slideActions.fetchSlides ().then (response => {
    //             this.setState ({
    //               slides: response.data,
    //               editVisible: false,
    //             });
    //           });
    //           success ('Slide has been sucessfully updated.');
    //         } else {
    //           error (
    //             response.data.error || 'Something went wrong. Please try again.'
    //           );
    //         }
    //         this.setState ({editButton: false});
    //       });
    //   }
    // });
  };

  componentDidUpdate (prevProps) {
    if (this.props.table_data !== prevProps.table_data) {
      this.setState ({slides: this.props.table_data});
    }
  }

  render () {
    const columns = [
      {
        title: 'Slide Tittle',
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
              <Tooltip title="`View Slide">
                <Link onClick={() => this.setShowModalVisible (record)}>
                  <EyeOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Edit Slide">
                <Link onClick={() => this.setEditModalVisible (record)}>
                  <EditOutlined />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip title="Delete Slide">
                <Link onClick={() => this.showConfirm (record)}>
                  <DeleteOutlined />
                </Link>
              </Tooltip>
            </span>
          );
        },
      },
    ];
    const {slides} = this.state;

    return (
      <div>
        <Table
          columns={columns}
          dataSource={slides}
          rowKey={column => column.id}
          bordered
        />

        {this.state.editVisible &&
          <Edit
            editVisible={this.state.editVisible}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
            slide={this.state.slide}
            editButton={this.state.editButton}
          />}

        {this.state.showVisible &&
          <Show
            showVisible={this.state.showVisible}
            onCancel={this.handleCancel}
            slide={this.state.slide}
          />}
      </div>
    );
  }
}
