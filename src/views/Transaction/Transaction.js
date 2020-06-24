import React, { useState, useEffect } from "react";
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

import { CircularProgress, Menu, MenuItem, Fade} from '@material-ui/core';

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

export default function Transaction() {
  const classes = useStyles();

  const [transactionType, setTransactionType] = useState('Chuyển khoản cùng ngân hàng');
  const [textFormOfFeePayment, setTextFormOfFeePayment] = useState('Người chuyển trả phí chuyển khoản');
  const [textButton, setTextButton]=useState('Tiếp tục');
  const [progress, setProgress] = useState(0);
  const [isIncreasedProgress, setIsIncreasedProgress] = useState(true);
  const [status, setStatus]=useState('');

  const [srcAccountNumber] = useState();
  const [desAccountNumber, setDesAccountNumber] = useState();
  const [desAccountName, setDesAccountName] = useState();
  const [money, setMoney] = useState();
  const [content, setContent] = useState();
  const [formOfFeePayment, setFormOfFeePayment]=useState(0);
  const [otp, setOtp] = useState();

  const [disableStep1, setDisableStep1] = useState(false);
  const [disableStep2, setDisableStep2] = useState(false);
  const [disableStep3, setDisableStep3] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!desAccountNumber) {
      setIsIncreasedProgress(false);
    } else {
      setIsIncreasedProgress(true);
    }
  }, [desAccountNumber, desAccountName]);

  useEffect(() => {
    if (!money || !content || !formOfFeePayment) {
      setIsIncreasedProgress(false);
    } else {
      setIsIncreasedProgress(true);
    }
  }, [money, content, formOfFeePayment]);

  useEffect(() => {
    if (!otp) {
      setIsIncreasedProgress(false);
    } else {
      setIsIncreasedProgress(true);
    }
  }, [otp]);
  
  useEffect(() => {
    if (progress === 0) {
      setTextButton('Tiếp tục');
      setDisableStep1(false);
      setDisableStep2(true);
      setDisableStep3(true);
    } else if (progress === 1) {
      setTextButton('Tiếp tục');
      setDisableStep1(true);
      setDisableStep2(false);
      setDisableStep3(true);
    } else if (progress === 2) {
      setTextButton('Tiếp tục');
      setDisableStep1(true);
      setDisableStep2(true);
      setDisableStep3(false);
      setStatus('Vui lòng kiểm tra email để lấy OTP');
    } else if (progress === 3){
      setTextButton('Chuyển ngay');
      setDisableStep1(true);
      setDisableStep2(true);
      setDisableStep3(true);
    }
  }, [progress]);

  const HandleMainButtonClick = () =>{
    if(progress<3 && isIncreasedProgress){
      setProgress(progress + 1);
    } else if(progress===3 && isIncreasedProgress){

    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Chuyển khoản</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <br/>
                  <Button color="primary" style={{width:'250px'}} onClick={()=>{setTransactionType('Chuyển khoản cùng ngân hàng')}}>Chuyển khoản cùng ngân hàng</Button>
                  <Button color="primary" style={{width:'250px'}} onClick={()=>{setTransactionType('Chuyển khoản liên ngân hàng')}}>Chuyển khoản liên ngân hàng</Button>
                  <CircularProgress size={200} style={{ paddingTop: 50}} variant="static" color='secondary' value={progress*100/3} />
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <h4>{transactionType}</h4>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Số tài khoản nguồn"
                        id="srcAccountNumber"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Số tài khoản đích"
                        id="desAccountNumber"
                        formControlProps={{
                          fullWidth: true
                        }}
                        onChange={(event)=>{setDesAccountNumber(event.target.value)}}
                        inputProps={{
                          disabled: disableStep1
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Tên tài khoản đích"
                        id="desAccountName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Số tiền"
                        id="money"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: disableStep2
                        }}
                        onChange={(event)=>{setMoney(event.target.value)}}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Nội dung"
                        id="content"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: disableStep2
                        }}
                        onChange={(event)=>{setContent(event.target.value)}}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer style={{paddingTop: 20}}>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button aria-controls="fade-menu" aria-haspopup="true" disabled={disableStep2} onClick={(event)=>{setAnchorEl(event.currentTarget)}}>
                        {textFormOfFeePayment}
                      </Button>
                      <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={()=>{setAnchorEl(null)}}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={()=>{setTextFormOfFeePayment('Người chuyển trả phí chuyển khoản'); setFormOfFeePayment(0); setAnchorEl(null);}}>Người chuyển trả</MenuItem>
                        <MenuItem onClick={()=>{setTextFormOfFeePayment('Người nhận trả phí chuyển khoản'); setFormOfFeePayment(1); setAnchorEl(null);}}>Người nhận trả</MenuItem>
                      </Menu>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="OTP"
                        id="otp"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: disableStep3
                        }}
                        onChange={(event)=>{setOtp(event.target.value)}}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <h6 style={{color:'green'}}>{status}</h6>
                      {progress!==0?(
                        <Button color="primary" onClick={()=>{if(progress>0){setProgress(progress-1)}}}>Trở lại</Button>
                      ):(null)}
                      < Button color = "primary" onClick={HandleMainButtonClick}>
                        {textButton}
                      </Button>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
