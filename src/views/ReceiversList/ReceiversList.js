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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { action } from '../../redux/AccountRedux';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const ReceiversList = ({ accountNameFromState, dispatch}) => {
  const classes = useStyles();

  const [accountNumber, setAccountNumber] = useState('');
  const [accountname, setAccountName]=useState('');
  const [accountNameReminiscent, setAccountNameReminiscent] = useState('');
  
  useEffect(()=>{
    if(accountNameFromState){
      setAccountName(accountNameFromState);
    } else{
      setAccountName('');
    }
  },[accountNameFromState])

  useEffect(()=>{
    dispatch(action.getAccount(accountNumber));
  },[accountNumber])

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
                    value={accountname}
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
                  <Button color="primary">Thêm người nhận</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <h4>Danh sách tài khoản người nhận</h4>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["Số tài khoản", "Tên tài khoản", "Tên gợi nhớ"]}
                    tableData={[
                      ["Dakota Rice", "$36,738", "Niger"],
                      ["Minerva Hooper", "$23,789", "Curaçao"],
                      ["Sage Rodriguez", "$56,142", "Netherlands"],
                      ["Philip Chaney", "$38,735", "Korea, South"]
                    ]}
                  />
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
    accountNameFromState: state.account.accountName
  }
}

export default connect(mapStateToProps)(ReceiversList);