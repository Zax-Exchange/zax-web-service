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
    //filters include: deliveryCountries, deliveryCities, products, budget, leadTime
    const { userInput, deliveryCountries, deliveryCities, budget, leadTime } =
      data;
    // : estypes.QueryDslQueryContainer

    const filter = [];
    if (deliveryCountries) {
      filter.push({
        match: {
          deliveryCountry: deliveryCountries.join(" "),
        },
      });
    }

    if (deliveryCities) {
      filter.push({
        match: {
          deliveryCity: deliveryCities.join(" "),
        },
      });
    }

    if (budget) {
      filter.push({
        range: {
          budget: {
            lte: budget,
          },
        },
      });
    }

    if (leadTime) {
      const today = new Date();
      const newDate = new Date(today.setMonth(today.getMonth() + leadTime))
        .toISOString()
        .slice(0, 10);
      filter.push({
        range: {
          deliveryDate: {
            lte: newDate,
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
    const { userInput, locations, moq, leadTime } = data;

    const filter = [];
    if (locations) {
      filter.push({
        match: {
          locations: locations.join(" "),
        },
      });
    }

    if (moq) {
      filter.push({
        range: {
          moqMax: {
            gte: moq,
          },
        },
      });
      filter.push({
        range: {
          moqMin: {
            lte: moq,
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
