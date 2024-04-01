import { BASE_URLS } from "configs";
import { Price } from "types";

class Datasource {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getPrices = (): Promise<Price[]> => {
    return fetch(this.url).then((response) => response.json());
  };
}

const datasource = new Datasource(BASE_URLS.GET_PRICES);

export default datasource;
