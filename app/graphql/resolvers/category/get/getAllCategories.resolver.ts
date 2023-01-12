import buildCategories from "../categoryParser";

export const getAllCategories = () => {
  return buildCategories().values();
}

export default {
  Query: {
    getAllCategories
  }
}
