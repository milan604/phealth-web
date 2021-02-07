import React from 'react'
import { Row, Col, Divider, Alert, Modal } from "antd";

const Show = (showVisible, onCancel, video) => {
  return (
<Modal
        title=""
        centered
        visible={showVisible}
        onCancel={onCancel}
        footer={null}
      >
        <div>
          <br />
          <Row>
            <Col
              offset={2}
              span={20}
              style={{ background: "rgb(217, 217, 217)", height: 35 }}
            >
              <b>
                <Alert message="Video Information" type="default" />
              </b>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col offset={3} span={18}>
              <Alert
                message="Video Title"
                description={video.title}
                type="info"
                showIcon
              />
              <Divider />
              <Alert
                message="Description"
                description={video.description}
                type="info"
                showIcon
              />
            </Col>
          </Row>
        </div>
      </Modal>
  )
}

export default Show
