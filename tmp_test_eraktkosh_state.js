const https = require('https');

function testEndpoint(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
         console.log(`URL: ${url}`);
         console.log(`Response length: ${data.length}`);
         console.log(`Snippet: ${data.substring(0, 300)}\n`);
         resolve();
      });
    });
  });
}

async function run() {
  // Test Rajasthan (stateCode=33) default date today and tomorrow
  const today = new Date().toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'});
  
  await testEndpoint(`https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYCAMPS&stateCode=33&districtCode=-1&campDate=${today}`);
  
  // Actually, standard eRaktKosh camp search doesn't use GETNEARBYCAMPS for the MAIN list.
  // It usually is a POST request or it's form submitted. Wait, I saw GETNEARBYCAMPS in the JS.
  // What if we try another test:
  await testEndpoint(`https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt?hmode=GETCAMPLIST&stateCode=33&districtCode=-1&campDate=${today}`);
}

run();
