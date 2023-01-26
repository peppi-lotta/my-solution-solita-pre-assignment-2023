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
    const search = req.body.search;

    let sqlQuery: QueryOptions;
    let q: string = `SELECT * FROM stations `;

    //build the query based on the values given
    if (search != '') {
      q = q + `WHERE name_fi LIKE '%${search}%' OR address_fi LIKE '%${search}%' OR capacity LIKE '%${search}%' `;
    }
    if (order != '') {
      q = q + `ORDER BY ${order} `;
    }

    q = q + `LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`

    sqlQuery = {
      query: q,
    }

    const [results] = await query(sqlQuery); //executing query

    res.status(200).json({ results }); //sending results as json in the response

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" }); //sending error message as json in the response
  }
}
