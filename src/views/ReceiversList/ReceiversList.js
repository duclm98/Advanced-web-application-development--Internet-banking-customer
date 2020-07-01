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

function createData(_id, accountNumber, accountName, accountNameReminiscent) {
  return { _id, accountNumber, accountName, accountNameReminiscent };
}
const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];
const headCells = [
  { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'accountNumber', numeric: true, disablePadding: false, label: 'Số tài khoản' },
  { id: 'accountName', numeric: true, disablePadding: false, label: 'Tên tài khoản' },
  { id: 'accountNameReminiscent', numeric: true, disablePadding: false, label: 'Tên gợi nhớ' },
];

const ReceiversList = ({ accountNameFromState, msgFromState, receiversFromState, changeReceiversFromState, dispatch}) => {
  const classes = useStyles();

  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName]=useState('');
  const [accountNameReminiscent, setAccountNameReminiscent] = useState('');
  const [status, setStatus] = useState('');

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
    if (accountNumber === '' || accountName === '' || accountNameReminiscent === '') {
      return setStatus('Vui lòng điền đầy đủ thông tin');
    }
    return dispatch(action.addReceiver({
      accountNumber,
      accountName,
      accountNameReminiscent
    }));
  }

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
                  {/* <Table
                    tableHeaderColor="warning"
                    tableHead={["Số tài khoản", "Tên tài khoản", "Tên gợi nhớ"]}
                    tableData={receiversFromState}
                  /> */}
                  <Table1
                    rows={receiversFromState}
                    headCells={headCells}
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