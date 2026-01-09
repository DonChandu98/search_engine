const { Client } = require('pg');

// Database connection string
const connectionString = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_7LUcy0TaYRPQ@ep-plain-feather-adtd1w88-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function fetchVotersData() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Fetch data for specific voter ID
    const voterId = 'NCT4450102';
    const query = `
      SELECT 
        epic_number,
        full_name,
        age,
        gender,
        dob,
        relation_type,
        relative_full_name,
        ps_name,
        ps_address,
        locality_street,
        town_village,
        ward_no,
        booth_no,
        sr_no
      FROM voters
      WHERE epic_number = $1
      LIMIT 1;
    `;

    const result = await client.query(query, [voterId]);

    if (result.rows.length === 0) {
      console.log(`❌ No voter found with EPIC Number: ${voterId}\n`);
      await client.end();
      process.exit(0);
    }

    const voter = result.rows[0];
    
    console.log(`✅ Found voter with EPIC Number: ${voterId}\n`);
    console.log('='.repeat(100));
    console.log(`\nVoter Details:`);
    console.log(`  EPIC Number: ${voter.epic_number}`);
    console.log(`  Full Name: ${voter.full_name}`);
    console.log(`  Age: ${voter.age || 'N/A'}`);
    console.log(`  Gender: ${voter.gender || 'N/A'}`);
    console.log(`  Date of Birth: ${voter.dob || 'N/A'}`);
    console.log(`  Relation Type: ${voter.relation_type || 'N/A'}`);
    console.log(`  Relative Full Name: ${voter.relative_full_name || 'N/A'}`);
    console.log(`  Polling Station Name: ${voter.ps_name || 'N/A'}`);
    console.log(`  Polling Station Address: ${voter.ps_address || 'N/A'}`);
    console.log(`  Locality/Street: ${voter.locality_street || 'N/A'}`);
    console.log(`  Town/Village: ${voter.town_village || 'N/A'}`);
    console.log(`  Ward No: ${voter.ward_no || 'N/A'}`);
    console.log(`  Booth No: ${voter.booth_no || 'N/A'}`);
    console.log(`  SR No: ${voter.sr_no || 'N/A'}`);
    console.log('='.repeat(100));

    // Also export as JSON for easy use
    console.log('\n\nJSON Format:');
    console.log(JSON.stringify(voter, null, 2));

    await client.end();
    console.log('\n✅ Connection closed');

  } catch (error) {
    console.error('❌ Error fetching voters data:', error);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

// Run the function
fetchVotersData();

