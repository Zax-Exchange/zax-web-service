import { Category, GetCategoryInput } from "../../../resolvers-types.generated";
import buildCategories from "../categoryParser";

const getCategory = async (
  parent: any,
  { data }: { data: GetCategoryInput },
  context: any
) => {
  const categories = buildCategories();
  const { id } = data;
  return categories.get(id);
};

export default {
  Query: {
    getCategory,
  },
};
