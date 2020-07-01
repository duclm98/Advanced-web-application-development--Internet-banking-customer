import React, {useState} from "react";
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

export default function AccountsList() {
  const classes = useStyles();
  const [tableName, setTableName] = useState('Tài khoản thanh toán');

  const Handle1 = () =>{
    setTableName('Tài khoản thanh toán')
  }

  const Handle2 = () =>{
    setTableName('Tài khoản tiết kiệm')
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Danh sách tài khoản</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <br/>
                  <Button color="primary" style={{width: '200px'}} onClick={Handle1}>Tài khoản thanh toán</Button>
                  <Button color="primary" style={{width: '200px'}} onClick={Handle2}>Tài khoản tiết kiệm</Button>
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