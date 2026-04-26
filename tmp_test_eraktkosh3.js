const https = require('https');

https.get('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const lines = data.split('\n');
    let inScript = false;
    for(let i=0; i<lines.length; i++) {
        if(lines[i].includes('<script')) inScript = true;
        if(inScript) console.log(lines[i].trim());
        if(lines[i].includes('</script')) inScript = false;
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
