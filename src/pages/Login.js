import { useLayoutEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { useHistory } from 'react-router-dom';
function Login({ authenticatedUser, logIn }) {
  const history = useHistory();

  useLayoutEffect(() => {
    if (!!authenticatedUser) history.push('/');
  }, [authenticatedUser]);

  const onFinish = (accountInfo) => {
    logIn(accountInfo);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ marginTop: '80px' }}>
      <Col span={12} offset={6}>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
const mapStateToProps = ({ account }) => {
  return { ...account };
};
const mapDispatchToProps = (dispatch) => {
  return { logIn: (accountInfo) => dispatch(login(accountInfo)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
