const fs = require('fs');
const content = fs.readFileSync('eraktkosh_page.html', 'utf8');

const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
let m;

while ((m = regex.exec(content)) !== null) {
    if (m[1].includes('GETNEARBYCAMPS')) {
        console.log(m[1].substring(m[1].indexOf('GETNEARBYCAMPS') - 200, m[1].indexOf('GETNEARBYCAMPS') + 500));
    }
}
