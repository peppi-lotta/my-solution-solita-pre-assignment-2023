import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions { //defining interface for query options
  query: string;
}

//get 25 trips based on current page
export default async function getPopular(req: NextApiRequest, res: NextApiResponse) {
  try {
    const amount = 5; //page number from the request body
    const type = req.body.type;
    const id = req.body.id;
    
    //query options
    let sqlQuery: QueryOptions = {
      query: ''
    };

    switch (type) {
      case 'start':
          sqlQuery = {
              query: `SELECT s.name_fi, COUNT(t.start_location_id) AS locations_count
              FROM trips AS t
              JOIN stations AS s ON t.start_location_id = s.id
              WHERE t.end_location_id = ${id}
              GROUP BY t.start_location_id
              ORDER BY locations_count DESC
              LIMIT ${amount}`
          }
          break;
      case 'end':
          sqlQuery = {
              query: `SELECT s.name_fi, COUNT(t.end_location_id) AS locations_count
              FROM trips AS t
              JOIN stations AS s ON t.end_location_id = s.id
              WHERE t.start_location_id = ${id}
              GROUP BY t.end_location_id
              ORDER BY locations_count DESC
              LIMIT ${amount}`
          }
          break;
    }

    const [results] = await query(sqlQuery); //executing query

    res.status(200).json({ results }); //sending results as json in the response

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" }); //sending error message as json in the response
  }
}