const http = require('http');

const data = JSON.stringify({
  email: 'test_fix_final@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'Fix',
  role: 'patient',
  phone: '0123456789'
});

const options = {
  hostname: 'localhost',
  port: 8081,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
