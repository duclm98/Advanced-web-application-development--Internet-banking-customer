import React, { useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function TransactionHistory() {
  const classes = useStyles();
  const [tableName, setTableName] = useState('Giao dịch nhận tiền');

  const Handle1 = () =>{
    setTableName('Giao dịch nhận tiền')
  }

  const Handle2 = () =>{
    setTableName('Giao dịch chuyển khoản')
  }

  const Handle3 = () =>{
    setTableName('Giao dịch thanh toán nhắc nợ')
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Lịch sử giao dịch</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <br/>
                  <Button color="primary" onClick={Handle1}>Giao dịch nhận tiền</Button>
                  <Button color="primary" onClick={Handle2}>Giao dịch chuyển khoản</Button>
                  <Button color="primary" onClick={Handle3}>Giao dịch thanh toán nhắc nợ</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <h4>{tableName}</h4>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["ID", "Name", "Salary", "Country"]}
                    tableData={[
                      ["1", "Dakota Rice", "$36,738", "Niger"],
                      ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                      ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                      ["4", "Philip Chaney", "$38,735", "Korea, South"]
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