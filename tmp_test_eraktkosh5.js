const https = require('https');
const fs = require('fs');

https.get('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('eraktkosh_page.html', data);
  });
});
