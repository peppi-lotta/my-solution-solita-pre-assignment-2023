import mysql from 'mysql2/promise';

interface QueryOptions {
    query: string;
    values?: any[];
}

export async function query(options: QueryOptions) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'weqrok-syxpe4-hIrkam',
        database: 'solita_pre_assignmentdb',
    });
    try {    
        const results = await connection.execute(options.query, options.values || []);
        connection.end();
        return results;

    } catch (error) {
        return { error };
    }
}
