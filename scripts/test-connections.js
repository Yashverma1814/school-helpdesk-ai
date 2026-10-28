require('dotenv').config();
const { Client } = require('pg');
const Redis = require('ioredis');

async function testDatabase() {
  console.log('Testing Supabase PostgreSQL connection...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT version();');
    console.log('✅ PostgreSQL Connected successfully!');
    console.log('   Server version:', res.rows[0].version.split(',')[0]);

    // Check pgvector extension
    const extRes = await client.query("SELECT * FROM pg_extension WHERE extname = 'vector';");
    if (extRes.rows.length > 0) {
      console.log('✅ pgvector extension is ENABLED in PostgreSQL!');
    } else {
      console.log('⚠️ pgvector extension is NOT enabled yet.');
      console.log('   Attempting to enable pgvector extension...');
      try {
        await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
        console.log('✅ Successfully enabled pgvector extension!');
      } catch (err) {
        console.log('   Please enable it in Supabase dashboard -> Database -> Extensions -> search "vector"');
      }
    }
    await client.end();
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
  }
}

async function testRedis() {
  console.log('\nTesting Upstash Redis connection...');
  try {
    const redis = new Redis(process.env.REDIS_URL);
    const pong = await redis.ping();
    console.log(`✅ Redis Connected successfully! Response: ${pong}`);
    await redis.set('school_helpdesk_test_key', 'ok', 'EX', 10);
    const val = await redis.get('school_helpdesk_test_key');
    console.log(`✅ Redis write & read verified: value="${val}"`);
    redis.disconnect();
  } catch (err) {
    console.error('❌ Redis connection failed:', err.message);
  }
}

async function main() {
  await testDatabase();
  await testRedis();
  console.log('\nAll connection checks finished!');
}

main();
