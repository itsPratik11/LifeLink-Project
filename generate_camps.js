const fs = require('fs');

const cities = [
  "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", 
  "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", 
  "Delhi", "New Delhi", "Noida", "Gurugram", "Faridabad",
  "Bangalore", "Mysore", "Mangalore", "Hubli",
  "Chennai", "Coimbatore", "Madurai", "Salem",
  "Kolkata", "Howrah", "Darjeeling", "Siliguri",
  "Hyderabad", "Warangal", "Nizamabad",
  "Ahmedabad", "Surat", "Vadodara", "Rajkot",
  "Jaipur", "Jodhpur", "Udaipur", "Kota",
  "Lucknow", "Kanpur", "Varanasi", "Agra",
  "Patna", "Gaya", "Bhagalpur",
  "Chandigarh", "Ludhiana", "Amritsar",
  "Bhubaneswar", "Cuttack", "Rourkela",
  "Guwahati", "Dibrugarh"
];

const organizations = [
  "Indian Red Cross Society", "Rotary Club", "Lions Club", "Govt Hospital Blood Bank", 
  "Corporate CSR Wing", "Local Community Center", "District Health Office", "NSS Unit",
  "HDFC Bank CSR", "Infosys Foundation", "State Blood Transfusion Council"
];

const names = [
  "Mega Blood Donation Drive", "Save a Life Camp", "Community Blood Drive", "Emergency Blood Camp",
  "Voluntary Blood Donation", "Youth Blood Camp", "Corporate Blood Drive", "District Mega Camp"
];

const generateCamps = () => {
    const camps = [];
    let idCounter = 1;
    
    // Generate dates around today
    const today = new Date();
    
    cities.forEach(city => {
        // Generate 3-8 camps per city
        const numCamps = Math.floor(Math.random() * 6) + 3;
        
        for(let i=0; i<numCamps; i++) {
            const dateOffset = Math.floor(Math.random() * 30) - 5; // -5 to +25 days
            const campDate = new Date(today);
            campDate.setDate(campDate.getDate() + dateOffset);
            
            const org = organizations[Math.floor(Math.random() * organizations.length)];
            const name = names[Math.floor(Math.random() * names.length)];
            
            const total = Math.floor(Math.random() * 200) + 50;
            const booked = Math.floor(Math.random() * total);
            
            camps.push({
                id: `mock-${idCounter++}`,
                name: `${city} ${name}`,
                organizer: org,
                location: `${['Main Road', 'Civil Lines', 'MG Road', 'Station Road', 'City Center'][Math.floor(Math.random()*5)]}, ${city}`,
                date: campDate.toISOString().split('T')[0],
                time: "09:00 AM - 04:00 PM",
                distance: `${(Math.random() * 15).toFixed(1)} km`,
                slotsTotal: total,
                slotsBooked: booked
            });
        }
    });
    return camps;
};

const data = generateCamps();
const content = `export const FALLBACK_CAMPS_DATA = ${JSON.stringify(data, null, 2)};`;

fs.writeFileSync('e:/lifelink/src/app/api/camps/fallbackData.ts', content);
console.log(`Generated ${data.length} camps across ${cities.length} cities.`);
