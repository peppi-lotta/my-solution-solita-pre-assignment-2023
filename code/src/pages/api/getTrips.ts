import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions {
  query: string;
}

export default async function getTrips(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pageSize = 25;
    const page = req.body.page;

    const sqlQuery: QueryOptions = {
      query: `SELECT t.*, ss.name_fi AS start_name_fi, es.name_fi AS end_name_fi FROM trips AS t LEFT JOIN stations AS ss ON t.start_location_id = ss.id  LEFT JOIN stations AS es ON t.end_location_id = es.id LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}