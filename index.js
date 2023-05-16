import clientPromise from "../../../lib/mongodb"

export default async ( req, res ) => {
  try {
    const client = await clientPromise

    const db = client.db( "rawData" )

    const schools = await db
      .collection( "school" )
      .find( { inState: true } )
      .sort()
      .toArray()

    res.json( schools )

  } catch ( error ) {
    console.error( error )
  }
}