import mongoose from "mongoose";

const Database = async () => {
  try {
    const databaseConnectionString  = process.env.MONGODB_CONNECTION_STRING
    if(!databaseConnectionString){
      throw new Error("Database connection string missing!")
    }
    const connection = await mongoose.connect(databaseConnectionString)
    if(connection){
      console.log('Database Connected Successfully')
    }else{
      console.log('Failed to connected Database!')
    }
  } catch (error) {
    console.log(error)
  }
}
export default Database