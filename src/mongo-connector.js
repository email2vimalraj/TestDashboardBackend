const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://127.0.0.1:27017/test-dashboard';

module.exports = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL);
    return {
      Executions: db.collection('executions'),
      Suites: db.collection('suites'),
    };
  } catch (error) {
    console.log(`Error in connecting to Mongo`);
  }
};
