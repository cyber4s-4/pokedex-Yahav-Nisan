const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
pool.connect()
    .then(() => console.log('connected to remote DB'))
    .catch((err: any) => console.log('unable connect to DB : ', err));



export async function getPokeData(offset: number) {
    const queryText = `SELECT * FROM pokeDataTable ORDER BY id LIMIT 20 OFFSET $1`;
    try {
        return await pool.query(queryText, [offset]).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    }
}

export async function getDataForPokemonPage(id: number) {
    const queryText = `SELECT * FROM pokeDataTable WHERE id=$1 LIMIT 1`;
    try {
        return await pool.query(queryText, [id]).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    }
}

export async function getPokemonsViaSearchBar(str: string, offset: number) {
    const queryText = `SELECT * FROM pokeDataTable WHERE name~$1 LIMIT 20 OFFSET $2`;
    try {
        return await pool.query(queryText, [str, offset]).then((res: any) => res.rows);
    } catch (e) {
        console.error(e);
    }
}
