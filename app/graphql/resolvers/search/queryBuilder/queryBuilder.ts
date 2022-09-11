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
              products: userInput,
            },
          },
          {
            match: {
              deleted: false,
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
            match: {
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
