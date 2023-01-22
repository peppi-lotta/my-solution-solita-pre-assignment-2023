import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
  query: string;
}

export default async function getStations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const table = req.body.table;
    const attribute = req.body.attribute;
    const value = req.body.value;

    const sqlQuery: QueryOptions = {
      query: `SELECT COUNT(*) AS count FROM ${table} WHERE ${attribute} = ${value}`
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}