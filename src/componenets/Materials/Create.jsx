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
              <Alert message="Add New Material" type="default" />
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
                    <Tooltip title="Material Title">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Description&nbsp;
                    <Tooltip title="Material Description">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Description!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Author&nbsp;
                    <Tooltip title="Material Author">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="author"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Author!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Type&nbsp;
                    <Tooltip title="Material Type">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Type!',
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
                    <Tooltip title="Upload Material File">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                valuePropName="fileList"
                // getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Title!',
                    whitespace: true,
                  },
                ]}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Link&nbsp;
                    <Tooltip title="Material Link">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="link"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Material Link!',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
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
