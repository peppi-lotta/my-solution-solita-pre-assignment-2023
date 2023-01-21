import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
  query: string;
  values?: any[];
}

export default async function getSations(req: NextApiRequest, res: NextApiResponse<Stations>) {
  try {
    const pageSize = 50;
    const page = req.body.page;

    const sqlQuery: QueryOptions = {
      query: `SELECT t.*, ss.name_fi AS start_name_fi, es.name_fi AS end_name_fi FROM trips AS t LEFT JOIN stations AS ss ON t.start_locatin_id = ss.id  LEFT JOIN stations AS es ON t.end_location_id = es.id LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
      values: []
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}