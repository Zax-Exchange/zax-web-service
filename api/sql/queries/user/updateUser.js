const query = `
update Users
set
  name=?,
  email=?
where
  id=?
`


module.exports = query;