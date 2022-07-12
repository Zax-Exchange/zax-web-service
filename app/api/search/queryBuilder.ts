// builds elastic search query based on filters
import { materials } from "../models/materials";
import * as projectTypes from "../types/common/projectTypes";
import * as companyTypes from "../types/common/companyTypes";
import type { estypes } from "@elastic/elasticsearch"
export default class QueryBuilder {
  static buildProjectSearchQuery(data: projectTypes.SearchProjectInput) {
    //filters include: deliveryCountries, deliveryCities, materials, budget, leadTime
    const { userInput, deliveryCountries, deliveryCities, budget, leadTime } = data;
    // : estypes.QueryDslQueryContainer

    const filter = [];
    if (deliveryCountries) {
      filter.push({
        match: {
          deliveryCountry: deliveryCountries.join(" ")
        }
      });
    }

    if (deliveryCities) {
      filter.push({
        match: {
          deliveryCity: deliveryCities.join(" ")
        }
      });
    }

    if (budget) {
      filter.push({
        range: {
          budget: {
            lte: budget
          }
        }
      })
    }

    if (leadTime) {
      const today = new Date();
      const newDate = new Date(today.setMonth(today.getMonth() + leadTime)).toISOString().slice(0, 10);
      filter.push({
        range: {
          deliveryDate: {
            lte: newDate
          }
        }
      })
    }
    
    const query = {
      bool: {
        must:[
          {
            match: {
              materials: userInput
            }
          }
        ],
        filter     
      }
    };

    return query;
  }
  
  
  static buildVendorCompanySearchQuery(data: companyTypes.SearchVendorInput) {
    //filters include: location, moq, leadtime, materials
    const { userInput, locations, moq, leadTime } = data;

    const filter = [];
    if (locations) {
      filter.push({
        match: {
          locations: locations.join(" ")
        }
      });
    }

    if (moq) {
      filter.push({
        range: {
          moq: {
            lte: moq
          }
        }
      });
    }

    if (leadTime) {
      filter.push({
        range: {
          leadTime: {
            lte: leadTime
          }
        }
      })
    }
    const query = {
      bool: {
        must: [
          {
            match: {
              materials: userInput,
            },
          }
        ],
        filter
      }
    }

    return query;
  }

}