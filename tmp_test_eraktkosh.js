const https = require('https');

https.get('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    if(data.includes('camps')) {
        console.log("Found 'camps' in response body");
        console.log("Body snippet:", data.substring(data.indexOf('<table'), data.indexOf('<table') + 500));
    } else {
        console.log("Did not find 'camps'. Snippet:");
        console.log(data.substring(0, 500));
    }
  });

}).on('error', (err) => {
  console.log("Error: " + err.message);
});
