/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Create from "@material-ui/icons/CreateOutlined";
import History from "@material-ui/icons/HistoryOutlined";
import Add from "@material-ui/icons/Add";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import CustomersListPage from 'views/CustomersList/CustomersList.js';
import CustomerCreationPage from 'views/CustomerCreation/CustomerCreation.js';
import RechargeAccountPage from 'views/RechargeAccount/RechargeAccount.js';
import TransactionHistoryPage from 'views/TransactionHistory/TransactionHistory.js';
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import NotificationsPage from "views/Notifications/Notifications.js";

const dashboardRoutes = [
  {
    path: "/customers-list",
    name: "Danh sách khách hàng",
    icon: LibraryBooks,
    component: CustomersListPage,
  },
  {
    path: "/customer-creation",
    name: "Taọ tài khoản khách hàng",
    icon: Create,
    component: CustomerCreationPage,
  },
  {
    path: "/recharge-account",
    name: "Nạp tiền vào tài khoản",
    icon: Add,
    component: RechargeAccountPage,
  },
  {
    path: "/transaction-history",
    name: "Lịch sử giao dịch",
    icon: History,
    component: TransactionHistoryPage,
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  // }
];

export default dashboardRoutes;
