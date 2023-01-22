import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
  query: string;
}

export default async function getStations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pageSize = 10;
    const page = req.body.page;

    const sqlQuery: QueryOptions = {
      query: `SELECT * FROM stations LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}