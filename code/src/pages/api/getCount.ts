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

        let sqlQuery: QueryOptions = {
            query: ""
        }
        if (!attribute || !value) {
            sqlQuery = {
                query: `SELECT COUNT(*) AS count FROM ${table}`
            }
        } else {
            sqlQuery = {
                query: `SELECT COUNT(*) AS count FROM ${table} WHERE ${attribute} = ${value}`
            }
        }

        const [results] = await query(sqlQuery);

        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data" })
    }
}