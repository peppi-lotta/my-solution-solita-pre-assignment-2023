import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'weqrok-syxpe4-hIrkam',
    database: 'solita_pre_assignmentdb',
});