import mysql from 'mysql2/promise';

interface QueryOptions {
    query: string;
    values?: any[];
}

export async function query(options: QueryOptions) {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
    try {    
        const results = await connection.execute(options.query, options.values || []);
        connection.end();
        return results;

    } catch (error) {
        return { error };
    }
}
