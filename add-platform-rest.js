import https from 'https';

const projectId = '68683fa6000c18b4ce3c';
const devKey = 'eaad71996816c0ab7526d817600ce40cf91f6f9e606d962cbd21f2d572482f4f5cc4f93cc1e54dc8aca5a1b47496d7c09913d5b11ada098fbdbba83ad8b6d3d1830572af2d58046aba3eb0fe7623cd9ba55aed28698cde37052a373b1b4ad8459cd6051bbbfae24ee447d32f58abc94274adeccf932af7105be4ee8b6883d35f';

// First, let's try to list existing platforms to understand the structure
const listPlatforms = () => {
  const postData = JSON.stringify({});
  
  const options = {
    hostname: 'nyc.cloud.appwrite.io',
    port: 443,
    path: `/v1/projects/${projectId}/platforms`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': devKey
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Current platforms:', JSON.parse(data));
      // Now try to add the new platform
      addPlatform();
    });
  });

  req.on('error', (error) => {
    console.error('Error listing platforms:', error);
  });

  req.write(postData);
  req.end();
};

// Add the Vercel platform
const addPlatform = () => {
  const postData = JSON.stringify({
    type: 'web',
    name: 'Vercel Production',
    hostname: 'miriani-well-mobile.vercel.app'
  });
  
  const options = {
    hostname: 'nyc.cloud.appwrite.io',
    port: 443,
    path: `/v1/projects/${projectId}/platforms`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': devKey,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Add platform response:', JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    console.error('Error adding platform:', error);
  });

  req.write(postData);
  req.end();
};

// Start by listing platforms
listPlatforms();
