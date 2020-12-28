import React, {useState} from 'react';
import {Modal, Button, Result} from 'antd';

const Login = () => {
  const [visible, setVisible] = useState (true);
  return (
    <Modal
      title=""
      centered
      visible={visible}
      footer={null}
      width="95%"
      closable={false}
      // onCancel={() => this.handleCancel()}
    >
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    </Modal>
  );
};

export default Login;
