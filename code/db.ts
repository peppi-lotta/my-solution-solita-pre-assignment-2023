import mysql from 'mysql2/promise';

interface QueryOptions {
    query: string;
    values?: any[];
}

export async function query(options: QueryOptions) {
    const connection = await mysql.createConnection({
        host: process.env.NEXT_PUBLIC_HOST,
        user: process.env.NEXT_PUBLIC_USER,
        password: process.env.NEXT_PUBLIC_PASSWORD,
        database: process.env.NEXT_PUBLIC_DATABASE,
    });
    try {    
        const results = await connection.execute(options.query, options.values || []);
        connection.end();
        return results;

    } catch (error) {
        return { error };
    }
}
