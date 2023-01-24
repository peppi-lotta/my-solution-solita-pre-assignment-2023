import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions { //defining interface for query options
  query: string;
}

//get 25 trips based on current page
export default async function getTrips(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = req.body.page; //page number from the request body
    const attribute = req.body.attribute;
    const value = req.body.value;
    const pageSize = req.body.pageSize//number of items per page
    
    //query options
    let sqlQuery: QueryOptions;

    if (!attribute || !value) {
      sqlQuery = {
          query: `SELECT t.*, ss.name_fi AS start_name_fi, es.name_fi AS end_name_fi FROM trips AS t LEFT JOIN stations AS ss ON t.start_location_id = ss.id  LEFT JOIN stations AS es ON t.end_location_id = es.id LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
      }
  } else {
      sqlQuery = {
        query: `SELECT t.*, ss.name_fi AS start_name_fi, es.name_fi AS end_name_fi FROM trips AS t LEFT JOIN stations AS ss ON t.start_location_id = ss.id  LEFT JOIN stations AS es ON t.end_location_id = es.id WHERE t.${attribute} = ${value} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
      }
  }


    const [results] = await query(sqlQuery); //executing query

    res.status(200).json({ results }); //sending results as json in the response

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" }); //sending error message as json in the response
  }
}