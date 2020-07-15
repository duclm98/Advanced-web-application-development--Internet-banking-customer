import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Table from "views/ReceiversList/Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { accountAction } from "../../redux";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const DebtReminders = ({ dispatch, desAccountNameFromState }) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    accountNumber: "",
    accountName: "",
    debtMoney: 0,
    debtContent: "",
    status:""
  });

  useEffect(() => {
    dispatch(accountAction.getAccount(input.accountNumber));
  }, [input.accountNumber]);

  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      accountName: desAccountNameFromState,
    }));
  }, [desAccountNameFromState]);

  const HandleCreatDebtReminders = () => {
    if(input.accountNumber===""||input.accountName===""||input.debtMoney===0||input.debtContent===""){
      return setInput((prev) => ({
        ...prev,
        status: "Vui lòng nhập đầy đủ thông tin cần thiết!",
      }));
    }
    
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Quản lý nhắc nợ</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <br />
                  <CustomInput
                    labelText="Số tài khoản"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                    }}
                    onChange={(event) => {
                      const accountNumber = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        accountNumber,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Tên tài khoản"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={input.accountName}
                  />
                  <CustomInput
                    labelText="Số tiền nợ"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                    }}
                    type="number"
                    onChange={(event) => {}}
                  />
                  <CustomInput
                    labelText="Nội dung nhắc nợ"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                    }}
                    onChange={(event) => {}}
                  />
                  <h6 style={{ color: "red" }}>{input.status}</h6>
                  <Button color="primary" onClick={HandleCreatDebtReminders}>
                    Tạo nhắc nợ
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  {/* <Table rows={receiversFromState}></Table> */}
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

export default connect(mapStateToProps)(DebtReminders);
