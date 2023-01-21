import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
  query: string;
  values?: any[];
}

export default async function getSations(req: NextApiRequest, res: NextApiResponse<Stations>) {
  try {
    const pageSize = 10;
    const page = req.body.page;

    const sqlQuery: QueryOptions = {
      query: `SELECT * FROM trips LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
      values: []
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}