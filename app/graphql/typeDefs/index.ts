import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function getTypeDefs() {
  try {
    // loads all typeDefs
    let loadedFiles = await loadFiles(`${__dirname}/**/*.gql`, {
      extensions: ["gql"],
    });
    return mergeTypeDefs(loadedFiles);
  } catch (error) {
    console.log(error);
  }
}

export default getTypeDefs;
