const https = require('https');

https.get('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    
    // find any occurrences of ".cnt" inside the HTML to see where the ajax calls go
    const lines = data.split('\n');
    lines.forEach((line) => {
        if(line.includes('.cnt') || line.includes('ajax') || line.includes('fetch')) {
            console.log(line.trim());
        }
    });

  });

}).on('error', (err) => {
  console.log("Error: " + err.message);
});
