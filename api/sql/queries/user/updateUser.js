const query = `
update Users
set
  name=?,
  email=?
where
  id=?
`


export default query;