import React, { useState, useEffect} from "react";
import { connect } from 'react-redux';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import Table1 from "views/ReceiversList/Table";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { action } from '../../redux/AccountRedux';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const ReceiversList = ({ accountNameFromState, msgFromState, receiversFromState, changeReceiversFromState, dispatch}) => {
  const classes = useStyles();

  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName]=useState('');
  const [accountNameReminiscent, setAccountNameReminiscent] = useState('');
  const [status, setStatus] = useState('');
  const [submit, setSubmit] = useState(false);

  if(changeReceiversFromState === true){
    dispatch(action.getReceivers());
  }

  useEffect(() => {
    dispatch(action.getAccount(accountNumber));
  }, [accountNumber]);

  useEffect(() => {
    if (accountNameFromState) {
      setAccountName(accountNameFromState);
    } else {
      setAccountName('');
    }
  }, [accountNameFromState]);

  const handleAddReceiver = () => {
    if (accountNumber === '' || accountName === '') {
      return setStatus('Vui lòng điền đầy đủ thông tin');
    }
    if (accountNameReminiscent === '') {
      setAccountNameReminiscent(accountName)
    }
    setSubmit(true);
  }
  useEffect(() => {
    if (submit) {
      dispatch(action.addReceiver({
        accountNumber,
        accountName,
        accountNameReminiscent
      }));
      setSubmit(false);
    }
  }, [submit])

  useEffect(() => {
    setStatus(msgFromState);
  }, [msgFromState])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Danh sách tài khoản người nhận</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <br/>
                  <CustomInput
                    labelText="Số tài khoản"
                    id="accountNumber"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false
                    }}
                    onChange={(event)=>{setAccountNumber(event.target.value)}}
                  />
                  <CustomInput
                    labelText="Tên tài khoản"
                    id="accountName"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                    value={accountName}
                  />
                  <CustomInput
                    labelText="Tên gợi nhớ"
                    id="accountNameReminiscent"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: false
                    }}
                    onChange={(event)=>{setAccountNameReminiscent(event.target.value)}}
                  />
                  <h6 style={{color: 'red'}}>{status}</h6>
                  <Button color="primary" onClick={handleAddReceiver}>Thêm người nhận</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <Table1
                    rows={receiversFromState}
                  ></Table1>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    accountNameFromState: state.account.accountName,
    msgFromState: state.msg,
    receiversFromState: state.receivers,
    changeReceiversFromState: state.changeReceivers
  }
}

export default connect(mapStateToProps)(ReceiversList);