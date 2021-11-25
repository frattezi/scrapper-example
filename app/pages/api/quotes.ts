import { connect } from 'mongoose';
import Quote from "@database/mongo"
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect(process.env.MONGODB_URL || "");
    const results = await Quote.find({ date: { "$gte": "2021-11-24T00:00:00.000Z" } }).exec()
    console.log(`Resuls ${JSON.stringify(results)}`)
    if (results.length) return res.status(200).json(results)
    return res.status(200).json({})
  } catch (error) {
    return res.status(500).json({ error: `client DB is not connected ${error}` })
  }
}

