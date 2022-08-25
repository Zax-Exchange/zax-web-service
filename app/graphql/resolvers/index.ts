import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath } from "url";
import { GraphQLUpload } from "graphql-upload";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function getResolvers() {
  try {
    // loads all resolves files
    let loadedFiles = await loadFiles(`${__dirname}/**/*.ts`, {
      extensions: ["ts"],
    });

    return mergeResolvers(loadedFiles);
  } catch (error) {
    console.log(error);
  }
}

export default getResolvers;
