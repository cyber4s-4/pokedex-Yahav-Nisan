const { Client, Pool } = require('pg');
const fs = require('fs');

let data = JSON.parse(fs.readFileSync('/home/student/Desktop/code/pokedex-Yahav-Nisan/src/server/data.json', 'utf-8'));
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://animunfopwzyfs:14b4975716ce739fb342dbc235d2924ac2f6638a1b658f48c15ad727b72492c1@ec2-52-204-157-26.compute-1.amazonaws.com:5432/d1djfoalkakaid',
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect();

async function addArrayToDb(arr) {
    await pool.query('DROP TABLE IF EXISTS pokeDataTable');
    await pool.query(`
		CREATE TABLE pokeDataTable (
			id SERIAL PRIMARY KEY,
			"name" text DEFAULT NULL,
			"height" integer DEFAULT NULL,
            "weight" integer DEFAULT NULL,
			"types" text[] DEFAULT NULL,
            "abilities" text[] DEFAULT NULL,
            "imageUrl" text DEFAULT NULL
		)
	`);
    let queryStr = `INSERT INTO
     pokeDataTable ("name","height","weight","types", "abilities", "imageUrl") 
     VALUES `;
    arr = arr.map((x) => [
        x.name,
        x.height,
        x.weight,
        x.types,
        x.abilities,
        x.imageUrl
    ]);
    let index = 1;
    let values = `(${arr
        .map(
            (x) =>
                `$${index++},$${index++},$${index++},$${index++},$${index++},$${index++} `
        )
        .join('),(')})`;
    queryStr += values + 'returning id';
    if (arr.length) await pool.query(queryStr, arr.flat(1));
}

addArrayToDb(data);