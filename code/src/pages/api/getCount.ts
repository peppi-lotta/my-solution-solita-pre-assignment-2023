import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
    query: string;
}

export default async function getCount(req: NextApiRequest, res: NextApiResponse) {
    try {
        const table = req.body.table;
        const attribute = req.body.attribute;
        const value = req.body.value;
        const search = req.body.search;

        let sqlQuery: QueryOptions;
        let q: string = `SELECT COUNT(*) AS count FROM ${table} `
        
        if ((attribute && attribute != '') && (value && value != '')) {
            q = q + `WHERE ${attribute} = ${value} `
        } 
        if (search && search != '') {
            q = q + `WHERE name_fi LIKE '%${search}%' OR address_fi LIKE '%${search}%' OR capacity LIKE '%${search}%' `;
        }

        sqlQuery = {
            query: q
        }
        console.log(q);
        const [results] = await query(sqlQuery);

        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data" })
    }
}