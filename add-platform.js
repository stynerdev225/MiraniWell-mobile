const { Client, Projects } = require('node-appwrite');

// Initialize the client
const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68683fa6000c18b4ce3c')
    .setKey(''); // You'll need to add your API key here

const projects = new Projects(client);

async function addPlatform() {
    try {
        // Add the Vercel production domain as a web platform
        const result = await projects.createPlatform(
            '68683fa6000c18b4ce3c', // Project ID
            'web', // Platform type
            'Vercel Production', // Platform name
            '', // Bundle ID (not needed for web)
            'https://miriani-well-mobile.vercel.app' // Domain
        );
        
        console.log('✅ Platform added successfully:', result);
    } catch (error) {
        console.error('❌ Error adding platform:', error);
    }
}

addPlatform();
