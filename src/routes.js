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
import SendOutlined from '@material-ui/icons/SendOutlined';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ListAltOutlined from '@material-ui/icons/ListAltOutlined';
import SettingsApplicationsOutlined from '@material-ui/icons/SettingsApplicationsOutlined';

// core components/views for Admin layout
import AccountsListPage from 'views/AccountsList/AccountsList.js';
import ReceiversListPage from 'views/ReceiversList/ReceiversList.js';
import TransactionPage from 'views/Transaction/Transaction.js';
import SettingPage from 'views/Setting/Setting.js';

const dashboardRoutes = [
  {
    path: "/home",
    name: "Danh sách tài khoản",
    icon: LibraryBooks,
    component: AccountsListPage,
  },
  {
    path: "/receivers-list",
    name: "Danh bạ thụ hưởng",
    icon: ListAltOutlined,
    component: ReceiversListPage,
  },
  {
    path: "/transaction",
    name: "Chuyển khoản",
    icon: SendOutlined,
    component: TransactionPage,
  },
  {
    path: "/setting",
    name: "Cài đặt",
    icon: SettingsApplicationsOutlined,
    component: SettingPage,
  },
];

export default dashboardRoutes;