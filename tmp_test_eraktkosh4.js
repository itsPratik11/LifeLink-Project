const fs = require('fs');
const https = require('https');

https.get('https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    let output = '';
    const lines = data.split('\n');
    let inScript = false;
    for(let i=0; i<lines.length; i++) {
        if(lines[i].includes('<script')) inScript = true;
        if(inScript) {
            let line = lines[i].trim();
            if(line.includes('ajax') || line.includes('url:') || line.includes('.cnt')) {
                 output += line + '\n';
            }
        }
        if(lines[i].includes('</script')) inScript = false;
    }
    console.log(output);
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
