import React, { useState } from "react";
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

const Login = ({state, dispatch}) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [reCAPTCHA, setReCAPTCHA] = useState();

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

  function onChangeReCaptcha(value) {
    setStatus('');
    setReCAPTCHA(value);
  }

  return (
    <div style={{paddingTop: 150}}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}></GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login</h4>
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
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(Login);