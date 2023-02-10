import { Client } from '@elastic/elasticsearch'

// either process.env.ELASTIC_CLOUD_ENDPOINT or process.env.ELASTIC_CLOUD_ID 
// must be supplied to create an Elastic Connection

const client: Client = (process.env.ELASTIC_CLOUD_ENDPOINT) ? 
  new Client({
    node: {
      url: new URL(process.env.ELASTIC_CLOUD_ENDPOINT),
    },
    auth: { 
      username: process.env.ELASTIC_USERNAME!,
      password: process.env.ELASTIC_PASSWORD!
    },
  }) : 
  new Client({
    cloud: { id: process.env.ELASTIC_CLOUD_ID! },
    auth: { 
      username: process.env.ELASTIC_USERNAME!,
      password: process.env.ELASTIC_PASSWORD!
    },
  });


export default client;