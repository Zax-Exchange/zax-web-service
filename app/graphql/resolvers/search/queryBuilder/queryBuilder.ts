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

    const {
      userInput,
      targetPriceRange,
      orderQuantities,
      deliveryDate,
      countries,
    } = data;

    const filter = [];

    if (targetPriceRange) {
      let lowerBound = parseFloat(targetPriceRange[0]);
      let upperBound = parseFloat(targetPriceRange[1]);
      filter.push({
        range: {
          targetPrice: {
            gte: lowerBound,
            lte: upperBound,
          },
        },
      });
    }

    if (orderQuantities) {
      let lowerBound = parseInt(orderQuantities[0], 10);
      let upperBound = parseInt(orderQuantities[1], 10);
      filter.push({
        range: {
          orderQuantities: {
            gte: lowerBound,
            lte: upperBound,
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

    if (countries) {
      filter.push({
        match: {
          country: countries.join(" "),
        },
      });
    }

    const decodedInput = decodeURIComponent(userInput);
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
                    query: decodedInput,
                    type: "bool_prefix",
                    fields: [
                      "products",
                      "products._2gram",
                      "products._3gram",
                      "products._index_prefix",
                    ],
                  },
                },
                {
                  multi_match: {
                    query: decodedInput,
                    fuzziness: 2,
                    fields: [
                      "products",
                      "products._2gram",
                      "products._3gram",
                      "products._index_prefix",
                    ],
                  },
                },
                {
                  multi_match: {
                    query: decodedInput,
                    type: "bool_prefix",
                    fields: [
                      "category",
                      "category._2gram",
                      "category._3gram",
                      "category._index_prefix",
                    ],
                  },
                },
                {
                  multi_match: {
                    query: decodedInput,
                    fuzziness: 2,
                    fields: [
                      "category",
                      "category._2gram",
                      "category._3gram",
                      "category._index_prefix",
                    ],
                  },
                },
              ],
            },
          },
        ],
        filter,
      },
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
    const { userInput, countries, factoryLocations, leadTime } = data;

    const filter = [];

    if (countries) {
      filter.push({
        terms: {
          country: countries.map((val, _) => val.toLowerCase()),
        },
      });
    }
    if (factoryLocations) {
      const terms = factoryLocations.map((location) => {
        term: {
          locations: location;
        }
      });
      const locationsFilter = {
        bool: {
          must: terms,
        },
      };
      filter.push(locationsFilter);
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

    const decodedInput = decodeURIComponent(userInput);
    const query = {
      bool: {
        must: {
          bool: {
            should: [
              {
                multi_match: {
                  query: decodedInput,
                  type: "bool_prefix",
                  fields: [
                    "products",
                    "products._2gram",
                    "products._3gram",
                    "products._index_prefix",
                  ],
                },
              },
              {
                multi_match: {
                  query: decodedInput,
                  fuzziness: 2,
                  fields: [
                    "products",
                    "products._2gram",
                    "products._3gram",
                    "products._index_prefix",
                  ],
                },
              },
              ...this.getVendorNameMatchers(decodedInput),
            ],
          },
        },
        filter,
      },
    };
    return query;
  }

  static buildVendorSearchByNameQuery(data: string) {
    const decodedInput = decodeURIComponent(data);
    return {
      bool: {
        should: this.getVendorNameMatchers(decodedInput)
      }
    }                                                                                                                                                                                       
  }

  private static getVendorNameMatchers(name:string) {
    return [{
      multi_match: {
        query: name,
        type: "bool_prefix",
        fields: [
          "name",
          "name._2gram",
          "name._3gram",
          "name._index_prefix",
        ],
      },
    },
    {
      multi_match: {
        query: name,
        fuzziness: 2,
        fields: [
          "name",
          "name._2gram",
          "name._3gram",
          "name._index_prefix",
        ],
      },
    }]
  }
}
