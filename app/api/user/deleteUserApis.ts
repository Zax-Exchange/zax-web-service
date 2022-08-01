import sequelize from "../../postgres/dbconnection"


const deactivateUser = async (email: string) => {
  const users = sequelize.models.users;

  try {
    await users.update({
      isActive: false
    }, {
      where: { email }
    });
    await users.destroy({
      where: {
        email
      },
      individualHooks: true
    });
    return true;
  } catch (e) {
    return Promise.reject(e);
  }
}


export {
  deactivateUser
}