import React from 'react';
import moment from 'moment';
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
  DatePicker,
  Switch,
  Upload,
} from 'antd';
import {QuestionCircleOutlined, UploadOutlined} from '@ant-design/icons';
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Edit = ({editVisible, onCancel, onEdit, editButton, scholarship}) => {
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
              <Alert message="Edit Scholarship" type="default" />
            </b>
          </Col>
        </Row>
        <Divider />
        <Form
          name="basic"
          layout={'vertical'}
          initialValues={{title: scholarship.title, description: scholarship.description, post: scholarship.post, location: scholarship.location, issuer: scholarship.issuer, startDate: scholarship.startDate,endDate: scholarship.endDate, date: [moment(scholarship.startDate,'YYYY-MM-DD'),moment(scholarship.endDate,'YYYY-MM-DD')],recurring: scholarship.recurring,link: scholarship.link}}
          onFinish={onEdit}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col offset={3} span={18}>
              <Form.Item
                label={
                  <span>
                    Scholarship Title&nbsp;
                    <Tooltip title="Vacancy Title">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Scholarship Title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Description&nbsp;
                    <Tooltip title="Vacancy Description">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Scholarship Description!',
                    whitespace: true,
                  },
                ]}
              >
                <TextArea />

              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Scholarship for which Program&nbsp;
                    <Tooltip title="Post">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="post"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Scholarship Program!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Location&nbsp;
                    <Tooltip title="Location">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="location"
                rules={[
                  {
                    required: false,
                    message: 'Please enter a Location!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Issuer Organization&nbsp;
                    <Tooltip title="Issuer Organization">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="issuer"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Issuer Organization!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Scholarship Apply Date&nbsp;
                    <Tooltip title="Vacancy Date">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a Vacancy Date Range!',
                  },
                ]}
              >
                <RangePicker />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Recurring Yearly&nbsp;
                    <Tooltip title="Scholarship recurring yearly">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="recurring"
                rules={[
                  {
                    required: false,
                    message: 'Please enter a whether scholarship is recurring',
                  },
                ]}
              >
                <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={scholarship.recurring}/>
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Site Link&nbsp;
                    <Tooltip title="Site Link">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="link"
                rules={[
                  {
                    required: false,
                    message: 'Please enter a scholarship site link',
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
