import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../db';

interface QueryOptions { //defining interface for query options
  query: string;
}

//Get one station's data based on id 
export default async function getStation(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.body.id; //id number from the request body

    //query options
    const sqlQuery: QueryOptions = {
      query: `SELECT * FROM stations WHERE id = ${id}`
    }

    const [results] = await query(sqlQuery);//executing query

    res.status(200).json({ results });//sending results as json in the response
  } catch (error) {

    res.status(500).json({ message: "Failed to fetch data" }); //sending error message as json in the response
  }
}