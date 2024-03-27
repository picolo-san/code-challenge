// change the type and name of param to match with the outside scope from "blockchain" to "currency"
export const getPriority = (currency: string): number => {
  switch (currency) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};
