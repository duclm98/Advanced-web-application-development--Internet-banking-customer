# Ứng dụng internet banking, phân hệ khách hàng
## Cách cài đặt và khởi chạy
### Môi trường local (development)
1. npm install
2. npm run dev
### Môi trường production (Heroku)
1. npm install
2. npm run build
3. serve -s build
### Môi trường production (Jenkins)
1. npm install pm2 -g
2. npm install
3. BUILD_ID=Internet_Banking_Customer pm2 restart internet_banking_customer || BUILD_ID=Internet_Banking_Customer pm2 start 'npm run jenkins' --name internet_banking_customer
## URL
### Môi trường production (Heroku): https://internet-banking-customer.herokuapp.com
### Môi trường production (Jenkins): http://34.92.149.125:3001
## Tài khoản demo:
### Username: duc
### Password: 12345
