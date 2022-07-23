const { Pool } = require('pg');

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL ||
        "postgres://animunfopwzyfs:14b4975716ce739fb342dbc235d2924ac2f6638a1b658f48c15ad727b72492c1@ec2-52-204-157-26.compute-1.amazonaws.com:5432/d1djfoalkakaid",
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect();

export async function getPokeData(offset: number) {
    let queryText = `SELECT * FROM pokeDataTable ORDER BY id LIMIT 20 OFFSET ${offset}`;
    try {
        return await pool.query(queryText).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    }
}

export async function getDataForPokemonPage(id: number) {
    let queryText = `SELECT * FROM pokeDataTable WHERE id=${id} LIMIT 1`
    try {
        return await pool.query(queryText).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    }
}

export async function getPokemonsViaSearchBar(str: string, offset: number) {
    let queryText = `SELECT * FROM pokeDataTable WHERE name~'${str}' LIMIT 20 OFFSET ${offset}`;
    try {
        return await pool.query(queryText).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    }
}