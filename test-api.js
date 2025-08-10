// Simple API test script
const https = require('http');

function testSubscriptionAPI() {
  console.log('🧪 Testing Subscription API...\n');

  // Test 1: Valid email subscription
  const testData1 = JSON.stringify({ email: 'test@example.com' });
  
  const options1 = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/subscribe',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData1.length
    }
  };

  const req1 = https.request(options1, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Test 1 - Valid Email Subscription:');
      console.log('Status:', res.statusCode);
      console.log('Response:', JSON.parse(data));
      console.log('');
      
      // Test 2: Duplicate email subscription
      testDuplicateEmail();
    });
  });

  req1.on('error', (err) => {
    console.log('❌ Test 1 Failed:', err.message);
  });

  req1.write(testData1);
  req1.end();
}

function testDuplicateEmail() {
  const testData2 = JSON.stringify({ email: 'test@example.com' });
  
  const options2 = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/subscribe',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData2.length
    }
  };

  const req2 = https.request(options2, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Test 2 - Duplicate Email (Should Fail):');
      console.log('Status:', res.statusCode);
      console.log('Response:', JSON.parse(data));
      console.log('');
      
      // Test 3: Invalid email
      testInvalidEmail();
    });
  });

  req2.on('error', (err) => {
    console.log('❌ Test 2 Failed:', err.message);
  });

  req2.write(testData2);
  req2.end();
}

function testInvalidEmail() {
  const testData3 = JSON.stringify({ email: 'invalid-email' });
  
  const options3 = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/subscribe',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData3.length
    }
  };

  const req3 = https.request(options3, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Test 3 - Invalid Email (Should Fail):');
      console.log('Status:', res.statusCode);
      console.log('Response:', JSON.parse(data));
      console.log('');
      
      // Test 4: Get subscriber count
      testSubscriberCount();
    });
  });

  req3.on('error', (err) => {
    console.log('❌ Test 3 Failed:', err.message);
  });

  req3.write(testData3);
  req3.end();
}

function testSubscriberCount() {
  const options4 = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/subscribers/count',
    method: 'GET'
  };

  const req4 = https.request(options4, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Test 4 - Subscriber Count:');
      console.log('Status:', res.statusCode);
      console.log('Response:', JSON.parse(data));
      console.log('');
      console.log('🎉 All tests completed!');
    });
  });

  req4.on('error', (err) => {
    console.log('❌ Test 4 Failed:', err.message);
  });

  req4.end();
}

// Start testing
console.log('🚀 Starting API Tests...');
console.log('Make sure the server is running on port 3001\n');

setTimeout(() => {
  testSubscriptionAPI();
}, 1000);
