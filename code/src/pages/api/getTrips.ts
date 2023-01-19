
import { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '../../../db';

interface Trip {
  id: number;
  start_time: string;
  end_time: string;
  start_location_id: number;
  end_location_id: number;
  duration: string;
  distance: number;
}

interface Trips {
  results: Trip[];
}

export default async function getTrips(req: NextApiRequest, res: NextApiResponse<Trips>) {
  try {
    const c = await connection;

    const pageSize = 10;
    const page = 3;

    const [results] = await c.execute(`SELECT * FROM trips LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`);
    c.end();
    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}