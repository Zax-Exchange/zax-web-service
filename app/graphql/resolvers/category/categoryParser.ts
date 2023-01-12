import { CATEGORIES } from "../../../constants/categories";
import { Category } from "../../resolvers-types.generated";

export default function buildCategories() {
  const categoriesMap: Map<string, Category> = new Map<string, Category>();
  CATEGORIES.forEach((category) => buildCategory(category, "", categoriesMap))
  return categoriesMap;
}

function buildCategory(ob : any, parent: string, accCategories: Map<string, Category>) {
  if (!ob) return null;

  const parsedChildren: string[] = [];
  const name = ob.name;
  for (const child of ob.children) {
    const parsedChild = buildCategory(child, name, accCategories);
    if (parsedChild) {
      parsedChildren.push(parsedChild);
    }
  }

  accCategories.set(name, {
    name: ob.name,
    parent,
    children: parsedChildren,
  } as Category);
  return ob.name
}