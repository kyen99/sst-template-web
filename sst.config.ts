import { Functions } from "./stacks/Functions";
import { Database } from "./stacks/Database";
import { Web } from "./stacks/Web";
import { SSTConfig } from "sst";

/*
  TODO:
  - Add service to run drizzle-kit in a container (for db admin)

*/

export const region = "us-east-2";

export default {
  config(_input) {
    return {
      name: "sst-template2",
      region,
    };
  },
  stacks(app) {
    app.stack(Database).stack(Web).stack(Functions);
  },
} satisfies SSTConfig;
