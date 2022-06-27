import sql from "./dbconnection";

const sendQueryWithVars = async (query: string, variables: any[]): Promise<Boolean> => new Promise((res, rej) => {
  
});

const sendSimpleQuery = (query: string) => new Promise(async(res, rej) => {
  const result = await sql`select * from users`;
  res(result);
});

export {
  sendQueryWithVars,
  sendSimpleQuery
}