import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Tooltip,
  Row,
  Col,
  Alert,
  Divider,
  Upload,
} from 'antd';
import {QuestionCircleOutlined, UploadOutlined} from '@ant-design/icons';
const { TextArea } = Input;

const Edit = ({editVisible, onCancel, onEdit, editButton, video}) => {
  Form.useForm ();

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };
  return (
    <Modal
      title=""
      centered
      visible={editVisible}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <Row>
          <Col
            offset={2}
            span={20}
            style={{background: 'rgb(217, 217, 217)', height: 35}}
          >
            <b>
              <Alert message="Edit Video" type="default" />
            </b>
          </Col>
        </Row>
        <Divider />
        <Form
          name="basic"
          layout={'vertical'}
          initialValues={{title: video.title, description: video.description}}
          onFinish={onEdit}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col offset={3} span={18}>
              <Form.Item
                label={
                  <span>
                    Title&nbsp;
                    <Tooltip title="Video Title">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Video Title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Description&nbsp;
                    <Tooltip title="Video Description">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Video Description!',
                    whitespace: true,
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={3} span={18}>
              <Divider />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-right"
                  id="submit-button"
                  disabled={editButton}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default Edit;
