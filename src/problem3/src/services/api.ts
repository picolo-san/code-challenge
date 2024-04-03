import { BASE_URLS } from "configs";
import { Price } from "types";

class ApiClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  getPrices = (): Promise<Price[]> => {
    return fetch(this.url).then((response) => response.json());
  };
}

const Datasource = new ApiClient(BASE_URLS.GET_PRICES);

export default Datasource;
