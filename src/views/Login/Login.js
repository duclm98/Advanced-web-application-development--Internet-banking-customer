import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { action } from '../../redux/AccountRedux';
import instance from '../../services/AxiosServices';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const Login = ({msg, dispatch}) => {
  const classes = useStyles();

  const [process, setProcess] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [reCAPTCHA, setReCAPTCHA] = useState();
  const [status, setStatus] = useState('');
  const [otp, setOtp] = useState('');
  const [passwordResetting, setPasswordResetting] = useState('');
  const [confirmPasswordResetting, setConfirmPasswordResetting] = useState('');
  const [statusSendOtp, setStatusSendOtp] = useState('');
  const [statusResetPassword, setStatusResetPassword] = useState('');

  // Nếu có lỗi trả về sau khi đăng nhập
  useEffect(() => {
    if (msg) {
      setStatus(msg);
      setUsername('');
      setPassword('');
      setReCAPTCHA(null);
    }
  }, [msg]);

  const HandleLogin = () => {
    if(reCAPTCHA){
      dispatch(action.login({username,password}));
      document.getElementById('username').value='';
      document.getElementById('password').value='';
      setUsername('');
      setPassword('');
      setReCAPTCHA(null);
    } else{
      setStatus('CAPTCHA không chính xác.')
    }
  }

  const HandleForgotPassword = () => {
    setProcess(1)
  }

  const HandleBack = () => {
    setProcess(process - 1);
  }

  const HandleSendOtp = async () => {
    try {
      await instance.post('accounts/send-confirmative-code', {
        email
      });
      return setProcess(2);
    } catch (error) {
      return setStatusSendOtp(error.response.data);
    }
  }

  const HandleResetPassword = async () => {
    if(passwordResetting!==confirmPasswordResetting){
      return setStatusResetPassword('Mật khẩu không khớp');
    }
    try {
      await instance.post('accounts/reset-password', {
        email,
        otp,
        password: passwordResetting
      });
      setProcess(0);
    } catch (error) {
      return setStatusResetPassword(error.response.data);
    }
  }

  function onChangeReCaptcha(value) {
    setStatus('');
    setReCAPTCHA(value);
  }

  return (
    <div style={{paddingTop: 150}}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}></GridItem>
          <GridItem xs={12} sm={12} md={4}>
          {process === 0 ? (
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Đăng nhập</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Tên đăng nhập"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event)=>{setUsername(event.target.value)}}
                    />
                    <CustomInput
                      labelText="Mật khẩu"
                      id="password"
                      type='password'
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(event)=>{setPassword(event.target.value)}}
                    />
                    <ReCAPTCHA
                      sitekey="6LfrhKkZAAAAAPm06f6x6RF_ZHBNtc2dI1hIwpbK"
                      onChange={onChangeReCaptcha}
                    />  
                    <h6 style={{color: 'red'}}>{status}</h6>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={HandleLogin}>Đăng nhập</Button>
                <Button color="primary" onClick={HandleForgotPassword}>Quên mật khẩu</Button>
              </CardFooter>
            </Card>
          ):(
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Quên mật khẩu</h4>
              </CardHeader>
              {process === 1 ? (
                <div>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          type='email'
                          onChange={(event)=>{setEmail(event.target.value)}}
                        />
                        <h6 style={{color: 'red'}}>{statusSendOtp}</h6>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={HandleBack}>Trở lại</Button>
                    <Button color="primary" onClick={HandleSendOtp}>Tiếp tục</Button>
                  </CardFooter>
                </div>
              ):(
                <div>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                          labelText="Email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          type='email'
                          inputProps={{
                            disabled: true
                          }}
                        />
                        <CustomInput
                          labelText="OTP"
                          id='otp'
                          formControlProps={{
                            fullWidth: true
                          }}
                          onChange={(event)=>{setOtp(event.target.value)}}
                        />
                        <CustomInput
                          labelText="Mật khẩu"
                          formControlProps={{
                            fullWidth: true
                          }}
                          type='password'
                          onChange={(event)=>{setPasswordResetting(event.target.value)}}
                        />
                        <CustomInput
                          labelText="Xác nhận mật khẩu"
                          formControlProps={{
                            fullWidth: true
                          }}
                          type='password'
                          onChange={(event)=>{setConfirmPasswordResetting(event.target.value)}}
                        />
                        <h6 style={{color: 'red'}}>{statusResetPassword}</h6>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={HandleBack}>Trở lại</Button>
                    <Button color="primary" onClick={HandleResetPassword}>Xác nhận</Button>
                  </CardFooter>                  
                </div>
              )}
            </Card>
          )}
          </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    msg: state.msg
  }
}

export default connect(mapStateToProps)(Login);