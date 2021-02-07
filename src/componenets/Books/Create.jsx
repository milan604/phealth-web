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

const Create = ({visible, onCancel, onCreate, createButton}) => {
  Form.useForm ();

  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };
  return (
    <Modal
      title=""
      centered
      visible={visible}
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
              <Alert message="Add New Book" type="default" />
            </b>
          </Col>
        </Row>
        <Divider />
        <Form
          name="basic"
          layout={'vertical'}
          onFinish={onCreate}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col offset={3} span={18}>
              <Form.Item
                label={
                  <span>
                    Title&nbsp;
                    <Tooltip title="Book Title">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Book Title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Description&nbsp;
                    <Tooltip title="Book Description">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Book Description!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="upload"
                label={
                  <span>
                    File&nbsp;
                    <Tooltip title="Upload Book File">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Book Title!',
                    whitespace: true,
                  },
                ]}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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
                  disabled={createButton}
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

export default Create;
