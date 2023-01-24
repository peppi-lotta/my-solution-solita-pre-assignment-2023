import { NextApiRequest, NextApiResponse } from 'next'; 
import { query } from '../../../db';

interface QueryOptions { //defining interface for query options
  query: string; //query string
}

//Return list of 10 stations based on currentpage 
export default async function getStations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pageSize = 10; //number of items per page
    const page = req.body.page; //page number from the request body
    const order = req.body.order; //sorting type from the request body
    
    let sqlQuery: QueryOptions;
    //query options

    if (order != '') {
      sqlQuery = {
        query: `SELECT * FROM stations ORDER BY ${order} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
      }
  } else {
      sqlQuery = {
        query: `SELECT * FROM stations LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
      }
  }

    const [results] = await query(sqlQuery); //executing query

    res.status(200).json({ results }); //sending results as json in the response

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" }); //sending error message as json in the response
  }
}
