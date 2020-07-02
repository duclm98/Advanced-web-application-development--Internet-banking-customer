import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

import { CircularProgress, Menu, MenuItem, Fade } from "@material-ui/core";

import * as localStorageVariable from "../../variables/LocalStorage";
import instance from "../../services/AxiosServices";

import { accountAction, transactionAction } from "../../redux";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const Transaction = ({ dispatch, desAccountNameFromState }) => {
  const classes = useStyles();

  const [textTransactionType, setTextTransactionType] = useState(
    "Chuyển khoản cùng ngân hàng"
  );
  const [transactionType, setTransactionType] = useState(0);
  const [
    disableButtonTransactionType,
    setDisableButtonTransactionType,
  ] = useState(false);
  const [textFormOfFeePayment, setTextFormOfFeePayment] = useState(
    "Người chuyển trả phí chuyển khoản"
  );
  const [textButton, setTextButton] = useState("Tiếp tục");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const account = JSON.parse(
    localStorage.getItem(localStorageVariable.storeAccount)
  );

  const srcAccountNumber = account.accountNumber;
  const srcAccountName = account.accountName;
  const [desAccountNumber, setDesAccountNumber] = useState("");
  const [desAccountName, setDesAccountName] = useState("");
  const [money, setMoney] = useState();
  const [content, setContent] = useState();

  const [formOfFeePayment, setFormOfFeePayment] = useState(0);
  const [otp, setOtp] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const HandleMainButtonClick = async () => {
    if (progress < 3) {
      if (
        progress === 1 &&
        (desAccountNumber === "" || desAccountName === "")
      ) {
        setStatus("Vui lòng nhập số tài khoản cần chuyển đến");
        return;
      } else if (progress === 2 && (!money || !content)) {
        setStatus("Vui lòng nhập đầy đủ thông tin cần thiết");
        return;
      }
      if (progress === 2) {
        instance.defaults.headers.common[
          "x_authorization"
        ] = localStorage.getItem(localStorageVariable.storeAccessToken);
        try {
          await instance.post("transactions/send-otp");
          setStatus("");
          setProgress(progress + 1);
        } catch (error) {
          return setStatus(error.response.data);
        }
      } else if (progress === 3) {
      } else {
        setStatus("");
        setProgress(progress + 1);
      }
    } else {
      if (progress === 3 && !otp) {
        setStatus("Vui lòng nhập đầy đủ thông tin cần thiết");
        return;
      }
      setStatus("");
    }
  };

  // Gọi action lấy account khi account number thay đổi
  useEffect(() => {
    if (transactionType === 0) {
      dispatch(accountAction.getAccount(desAccountNumber));
    } else if (transactionType === 1) {
    }
  }, [desAccountNumber]);

  useEffect(() => {
    if (progress === 0) {
      setTextButton("Tiếp tục");
      setDisableButtonTransactionType(false);
    } else if (progress === 1) {
      setTextButton("Tiếp tục");
      setDisableButtonTransactionType(true);
    } else if (progress === 2) {
      setTextButton("Tiếp tục");
      setDisableButtonTransactionType(true);
    } else if (progress === 3) {
      setTextButton("Chuyển ngay");
      setDisableButtonTransactionType(true);
    }
  }, [progress]);

  // Set des account name khi state thay đổi
  useEffect(() => {
    setDesAccountName(desAccountNameFromState);
  }, [desAccountNameFromState]);

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
                  <br />
                  <Button
                    color="primary"
                    style={{
                      width: "250px",
                    }}
                    disabled={disableButtonTransactionType}
                    onClick={() => {
                      setTextTransactionType("Chuyển khoản cùng ngân hàng");
                      setTransactionType(0);
                    }}
                  >
                    Chuyển khoản cùng ngân hàng
                  </Button>
                  <Button
                    color="primary"
                    style={{
                      width: "250px",
                    }}
                    disabled={disableButtonTransactionType}
                    onClick={() => {
                      setTextTransactionType("Chuyển khoản liên ngân hàng");
                      setTransactionType(1);
                    }}
                  >
                    Chuyển khoản liên ngân hàng
                  </Button>
                  <CircularProgress
                    size={200}
                    style={{
                      paddingTop: 50,
                    }}
                    variant="static"
                    color="secondary"
                    value={(progress * 100) / 3}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <h4>{textTransactionType}</h4>

                  {progress === 0 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Số tài khoản nguồn"
                          id="srcAccountNumber"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            disabled: true,
                          }}
                          value={srcAccountNumber}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Tên tài khoản nguồn"
                          id="srcAccountName"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          value={srcAccountName}
                          inputProps={{
                            disabled: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  ) : null}

                  {progress === 1 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Số tài khoản đích"
                          id="desAccountNumber"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          onChange={(event) => {
                            setDesAccountNumber(event.target.value);
                          }}
                          inputProps={{
                            disabled: false,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Tên tài khoản đích"
                          id="desAccountName"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          value={desAccountName}
                          inputProps={{
                            disabled: true,
                          }}
                          value={desAccountName}
                        />
                      </GridItem>
                    </GridContainer>
                  ) : null}

                  {progress === 2 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Số tiền"
                          id="money"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          type="number"
                          value={money}
                          onChange={(event) => {
                            setMoney(event.target.value);
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Nội dung"
                          id="content"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          value={content}
                          onChange={(event) => {
                            setContent(event.target.value);
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  ) : null}

                  {progress === 2 ? (
                    <GridContainer
                      style={{
                        paddingTop: 20,
                      }}
                    >
                      <GridItem xs={12} sm={12} md={4}>
                        <Button
                          aria-controls="fade-menu"
                          aria-haspopup="true"
                          onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                          }}
                        >
                          {textFormOfFeePayment}
                        </Button>
                        <Menu
                          id="fade-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={open}
                          onClose={() => {
                            setAnchorEl(null);
                          }}
                          TransitionComponent={Fade}
                        >
                          <MenuItem
                            onClick={() => {
                              setTextFormOfFeePayment(
                                "Người chuyển trả phí chuyển khoản"
                              );
                              setFormOfFeePayment(0);
                              setAnchorEl(null);
                            }}
                          >
                            Người chuyển trả
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setTextFormOfFeePayment(
                                "Người nhận trả phí chuyển khoản"
                              );
                              setFormOfFeePayment(1);
                              setAnchorEl(null);
                            }}
                          >
                            Người nhận trả
                          </MenuItem>
                        </Menu>
                      </GridItem>
                    </GridContainer>
                  ) : null}

                  {progress === 3 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="OTP"
                          id="otp"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          value={otp}
                          onChange={(event) => {
                            setOtp(event.target.value);
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  ) : null}

                  {progress === 3 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <h6
                          style={{
                            color: "green",
                          }}
                        >
                          Vui lòng kiểm tra email để lấy mã xác thực
                        </h6>
                      </GridItem>
                    </GridContainer>
                  ) : null}

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <h6
                        style={{
                          color: "red",
                        }}
                      >
                        {status}
                      </h6>
                      {progress !== 0 ? (
                        <Button
                          color="primary"
                          onClick={() => {
                            if (progress > 0) {
                              setProgress(progress - 1);
                              setStatus("");
                            }
                          }}
                        >
                          Trở lại
                        </Button>
                      ) : null}
                      <Button color="primary" onClick={HandleMainButtonClick}>
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
};

const mapStateToProps = (state) => {
  const desAccountNameFromState = state.desAccount
    ? state.desAccount.accountName
    : "";
  return {
    desAccountNameFromState,
  };
};

export default connect(mapStateToProps)(Transaction);
