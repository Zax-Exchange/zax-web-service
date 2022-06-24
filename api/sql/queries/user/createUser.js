const query = `insert into Users (name, email, companyId, isAdmin, password)
values(?, ?, ?, ?, ?);`


export default query;