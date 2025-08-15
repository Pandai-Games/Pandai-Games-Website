// Simple script to check image dimensions
// You can run this with: node check-image-dimensions.js

const https = require('https');

const imageUrl = 'https://www.pandaigames.com/web/image/1865-5a648ca5/ArkleitToE.png';

console.log('Checking image dimensions...');
console.log('Image URL:', imageUrl);

// Make a HEAD request to get image info
const options = {
  method: 'HEAD',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

https.request(imageUrl, options, (res) => {
  console.log('\nImage Response Headers:');
  console.log('Content-Type:', res.headers['content-type']);
  console.log('Content-Length:', res.headers['content-length'] ? `${res.headers['content-length']} bytes` : 'Unknown');
  
  if (res.headers['content-length']) {
    const sizeInKB = Math.round(parseInt(res.headers['content-length']) / 1024);
    console.log('File Size:', `${sizeInKB} KB`);
  }
  
  console.log('\nTo get exact pixel dimensions, please check the HTML file in your browser.');
  console.log('The image-dimensions-checker.html file will show:');
  console.log('- Natural Width (pixels)');
  console.log('- Natural Height (pixels)');
  console.log('- Aspect Ratio');
  
}).on('error', (err) => {
  console.error('Error fetching image:', err.message);
}).end();

console.log('\nNote: Run the HTML file in your browser for precise pixel dimensions.');
