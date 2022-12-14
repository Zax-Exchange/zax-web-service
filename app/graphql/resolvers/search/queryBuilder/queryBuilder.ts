// builds elastic search query based on filters
import {
  SearchVendorCompanyInput,
  SearchCustomerProjectInput,
} from "../../../resolvers-types.generated";
export default class QueryBuilder {
  /**
   * Builds a project query object for Elastic Search to consume
   * @param data
   * @returns
   */
  static buildProjectSearchQuery(data: SearchCustomerProjectInput) {
    // TODO: finish filters implementation

    const { userInput, targetPrice, deliveryDate } = data;

    const filter = [];

    if (targetPrice) {
      filter.push({
        range: {
          targetPrice: {
            gte: parseInt(targetPrice, 10),
          },
        },
      });
    }

    if (deliveryDate) {
      filter.push({
        range: {
          deliveryDate: {
            lte: deliveryDate,
          },
        },
      });
    }
    const query = {
      bool: {
        must: [
          {
            match: {
              deleted: false,
            },
          },
          {
            bool: {
              should: [
                {
                  multi_match: {
                    query: userInput,
                    type: "bool_prefix",
                    fields: [
                      "products",
                      "products._2gram",
                      "products._3gram",
                      "products._index_prefix"
                    ]
                  }
                },
                {
                  multi_match: {
                    query: userInput,
                    fuzziness: 2,
                    fields: [
                      "products",
                      "products._2gram",
                      "products._3gram",
                      "products._index_prefix"
                    ]
                  }
                },
                {
                  multi_match: {
                    query: userInput,
                    type: "bool_prefix",
                    fields: [
                      "category",
                      "category._2gram",
                      "category._3gram",
                      "category._index_prefix"
                    ]
                  }
                },
                {
                  multi_match: {
                    query: userInput,
                    fuzziness: 2,
                    fields: [
                      "category",
                      "category._2gram",
                      "category._3gram",
                      "category._index_prefix"
                    ]
                  }
                },
              ],
            },
          },
        ],
        filter,
      }
    };

    return query;
  }

  /**
   * Builds a vendor query object for Elastic Search to consume
   * @param data
   * @returns
   */
  static buildVendorCompanySearchQuery(data: SearchVendorCompanyInput) {
    //filters include: location, moq, leadtime, products
    const { userInput, countries, factoryLocations, moqMin, moqMax, leadTime } =
      data;

    const filter = [];

    if (countries) {
      filter.push({
        match: {
          country: countries.join(" "),
        },
      });
    }
    if (factoryLocations) {
      filter.push({
        match: {
          locations: factoryLocations.join(" "),
        },
      });
    }

    if (moqMin) {
      filter.push({
        range: {
          moqMin: {
            gte: moqMin,
          },
        },
      });
    }

    if (moqMax) {
      filter.push({
        range: {
          moqMax: {
            lte: moqMax,
          },
        },
      });
    }
    if (leadTime) {
      filter.push({
        range: {
          leadTime: {
            lte: leadTime,
          },
        },
      });
    }
    const query = {
      bool: {
        must: [
          {
            fuzzy: {
              products: userInput,
            },
          },
        ],
        filter,
      },
    };

    return query;
  }
}
