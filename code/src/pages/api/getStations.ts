import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface Station {
  id: number;
  name_fi: string;
  name_sw: string;
  name_en: string;
  address_fi: string;
  address_sw: string;
  city_fi: string;
  city_sw: string;
  operator: string;
  capacity: number;
  x_cord: number;
  y_cord: number;
}

interface Stations {
  results: Station[];
}

interface QueryOptions {
  query: string;
  values?: any[];
}

export default async function getSations(req: NextApiRequest, res: NextApiResponse<Stations>) {
  try {
    const pageSize = 10;
    const page = req.body.page;

    const sqlQuery: QueryOptions = {
      query: `SELECT * FROM stations LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
      values: []
    }

    const [results] = await query(sqlQuery);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch data" })
  }
}