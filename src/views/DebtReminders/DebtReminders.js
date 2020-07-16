import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CreatingDebtRemindersTable from "views/DebtReminders/CreatingDebtRemindersTable";
import CreatedDebtRemindersTable from "views/DebtReminders/CreatedDebtRemindersTable";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { accountAction, debtRemindersAction, isChange } from "../../redux";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

let data = {};
const sse = () => {
  if (typeof EventSource === "undefined") {
      console.log("not support");
      return;
  }

  var src = new EventSource(
      `${process.env.REACT_APP_BASE_BACKEND_URL}debt-reminders/debt-reminders-add-event`
  );

  src.onerror = function (e) {
      console.log("error: " + e);
  };

  src.addEventListener("DEBT_REMINDERS_ADDED", function (e) {
          const response = JSON.parse(e.data);
          data = response;
      },
      false
  );
}
sse();

const DebtReminders = ({
  dispatch,
  desAccountNameFromState,
  debtRemindersFromState,
  createdDebtRemindersFromState,
}) => {
  const classes = useStyles();

  const [input, setInput] = useState({
    accountNumber: "",
    accountName: "",
    debtMoney: 0,
    debtContent: "",
    status: "",
  });

  const [table, setTable] = useState({
    name: "Nhắc nợ đã tạo",
    type: 0,
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
    if (
      input.accountNumber === "" ||
      input.accountName === "" ||
      input.debtMoney === 0 ||
      input.debtContent === ""
    ) {
      return setInput((prev) => ({
        ...prev,
        status: "Vui lòng nhập đầy đủ thông tin cần thiết!",
      }));
    }
    dispatch(
      debtRemindersAction.createDebtReminders({
        accountNumber: input.accountNumber,
        debtContent: input.debtContent,
        debtMoney: input.debtMoney,
      })
    );
    setInput({
      accountNumber: "",
      accountName: "",
      debtMoney: 0,
      debtContent: "",
      status: "Tạo nhắc nợ thành công.",
    });
  };

  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      status: debtRemindersFromState.msg,
    }));
  }, [debtRemindersFromState.msg]);

  useEffect(() => {
    if (debtRemindersFromState.changeList === true) {
      dispatch(debtRemindersAction.getCreatingDebtReminders());
    }
    if(createdDebtRemindersFromState.changeList === true){
      dispatch(debtRemindersAction.getCreatedDebtReminders());
    }
  }, [debtRemindersFromState.changeList, createdDebtRemindersFromState.changeList]);

  useEffect(()=>{
    console.log('abc')
  },[data])

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
                    onChange={(event) => {
                      const debtMoney = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        debtMoney,
                      }));
                    }}
                  />
                  <CustomInput
                    labelText="Nội dung nhắc nợ"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: false,
                    }}
                    onChange={(event) => {
                      const debtContent = event.target.value;
                      setInput((prev) => ({
                        ...prev,
                        debtContent,
                      }));
                    }}
                  />
                  <h6 style={{ color: "red" }}>{input.status}</h6>
                  <Button
                    color="primary"
                    style={{ width: "200px" }}
                    onClick={HandleCreatDebtReminders}
                  >
                    Tạo nhắc nợ
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        color="primary"
                        style={{ width: "200px" }}
                        onClick={() => {
                          setTable((prev) => ({
                            ...prev,
                            name: "Nhắc nợ đã tạo",
                            type: 0,
                          }));
                        }}
                      >
                        Nhắc nợ đã tạo
                      </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        color="primary"
                        style={{ width: "200px" }}
                        onClick={() => {
                          setTable((prev) => ({
                            ...prev,
                            name: "Nợ chưa thanh toán",
                            type: 1,
                          }));
                        }}
                      >
                        Nợ chưa thanh toán
                      </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        color="primary"
                        style={{ width: "200px" }}
                        onClick={() => {
                          setTable((prev) => ({
                            ...prev,
                            name: "Nợ đã thanh toán",
                            type: 2,
                          }));
                        }}
                      >
                        Nợ đã thanh toán
                      </Button>
                    </GridItem>
                  </GridContainer>
                  {table.type === 0 ? (
                    <CreatingDebtRemindersTable
                      tablename={table.name}
                      rows={debtRemindersFromState.list || []}
                    ></CreatingDebtRemindersTable>
                  ) : (
                    <CreatedDebtRemindersTable
                      tablename={table.name}
                      rows={createdDebtRemindersFromState.list || []}
                    ></CreatedDebtRemindersTable>
                  )}
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
    debtRemindersFromState: state.debtReminders,
    createdDebtRemindersFromState: state.createdDebtReminders,
  };
};

export default connect(mapStateToProps)(DebtReminders);
