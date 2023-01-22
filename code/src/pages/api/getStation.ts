import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
  query: string;
}

export default async function getStation(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.body.id;

    const sqlQuery: QueryOptions = {
      query: `SELECT * FROM stations WHERE id = ${id}`
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}