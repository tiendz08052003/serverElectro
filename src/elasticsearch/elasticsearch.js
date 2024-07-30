
import { Client } from "@elastic/elasticsearch";
import dotenv from 'dotenv';

// Nạp các biến môi trường từ tệp .env
dotenv.config();

function elasticsearch () {
  const client = new Client({
      node: process.env.ELASTICSEARCH_URL,
      auth: {
          username: process.env.USERNAME_ELASTICSEARCH,
          password: process.env.PASSWORD_ELASTICSEARCH,
      },
      tls: {
        rejectUnauthorized: false // Bỏ qua chứng chỉ không hợp lệ
      },
      sniffOnStart: true,
      sniffInterval: 60000
  })
  
  

  client.info()   
    .then(response => console.log('Elasticsearch client: success'))
    .catch(error => console.error('Elasticsearch client: error'));

  return client;
}

export default elasticsearch