import React, { useEffect, useState } from 'react';
// import Button from '@material-ui/core/Button';
import { shadows } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';

import { Button, Container, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { login } from '../actions/index';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inputField: {
    width: '100%',
  },
}));

function Login({ authenticatedUser, logIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (!!authenticatedUser) history.push('/overview');
  }, [authenticatedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn({ username, password });
  };

  return (
    <Container maxWidth="sm">
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        mt={10}
        p={4}
        style={{ width: '100%' }}
      >
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <TextField
            id="standard-basic"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
            className={classes.inputField}
          />
          <TextField
            id="standard-basic"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
            className={classes.inputField}
          />
          <Button variant="contained" type="submit" color="primary">
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
const mapStateToProps = ({ account }) => {
  return { ...account };
};
const mapDispatchToProps = (dispatch) => {
  return { logIn: (accountInfo) => dispatch(login(accountInfo)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// import React, { useEffect } from 'react';
// import { Form, Input, Button } from 'antd';
// import { Row, Col } from 'antd';
// import { connect } from 'react-redux';
// import { login } from '../actions/index';
// import { useHistory } from 'react-router-dom';
// function Login({ authenticatedUser, logIn }) {
//   const history = useHistory();

//   useEffect(() => {
//     if (!!authenticatedUser) history.push('/overview');
//   }, [authenticatedUser]);

//   const onFinish = (accountInfo) => {
//     logIn(accountInfo);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <Row style={{ marginTop: '80px' }}>
//       <Col span={12} offset={6}>
//         <Form
//           labelCol={{
//             span: 8,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           name="basic"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your username!',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your password!',
//               },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             wrapperCol={{
//               offset: 8,
//               span: 16,
//             }}
//           >
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Col>
//     </Row>
//   );
// }
// const mapStateToProps = ({ account }) => {
//   return { ...account };
// };
// const mapDispatchToProps = (dispatch) => {
//   return { logIn: (accountInfo) => dispatch(login(accountInfo)) };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
