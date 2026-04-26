const fs = require('fs');
const content = fs.readFileSync('eraktkosh_page.html', 'utf8');

const regex = /"ajax"\s*:\s*([^,]+)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log("Found ajax reference:", match[1]);
}

const hmodeRegex = /hmode=[A-Z_]+/g;
let hmodeMatch;
const hmodes = new Set();
while ((hmodeMatch = hmodeRegex.exec(content)) !== null) {
  hmodes.add(hmodeMatch[0]);
}
console.log("HMODES:", Array.from(hmodes));
