const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8081,
  path: '/api/patients/profile',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE' // I need a token
  }
};

// Instead of a formal test, I'll just check if the service is alive through its health check
const checkHealth = (port, path) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}${path}`, (res) => {
      console.log(`Status ${path}: ${res.statusCode}`);
      resolve();
    }).on('error', (e) => reject(e));
  });
};

checkHealth(8081, '/api/patients/profile').catch(console.error);
