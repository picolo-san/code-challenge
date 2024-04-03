//missing import statement for iterface, react, custom hooks and built in hooks

interface WalletBalance {
  currency: string;
  amount: number;
}

// the "FormattedWalletBalance" inteface could extend "WalletBalance"
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

class Datasource {
  // TODO: Implement datasource class
}

// Interface "BoxProps" is not imported.
// Make sure "BoxProps" is extended from React.HTMLAttributes<HTMLDivElement> since it used "...rest" to pass into div element.
interface Props extends BoxProps {}

// The "Props" is assigned twice in here. Chose one or the other way.
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  //"useWalletBalances" hook was not imported.
  const balances = useWalletBalances();
  //"useState" was not imported and there is not type declaration for "prices" in here.
  //It is really confusing  "prices" is supposed to be an array but it is a object by default.
  const [prices, setPrices] = useState({});
  //We can combie the state "prices" and the below useEffect hook to create a custom hook call "usePrices()"
  useEffect(() => {
    const datasource = new Datasource(
      "https://interview.switcheo.com/prices.json"
    );
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.err(error);
      });
  }, []);
  // This "getPriority" can stand alone please consider to take it as a ultility function
  // Avoid typpe "any" as much as possible
  // Seems like parameter "blockchain" is link to "WalletBalance". However there is no "blockchain" property in "WalletBalance" at line 69.
  // This is may be there is a "blockchain" inside "WalletBalance". Consider to add "blockchain" into WalletBalance.
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
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

  //no "useMemo" was imported
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // The "balancePrioriy" in unused and TS may raise error since there is no "blockchain" property inside "WalletBalance".
        const balancePriority = getPriority(balance.blockchain);
        // "lhsPriority" is not declared, it may be the above "balancePriority" variable.
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        //again TS may raise error since there is no "blockchain" property inside "WalletBalance".
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]); //"prices" in here is not related to the calculation should not be a dependency.
  //Another heavy calculation to format band return the last result "formattedBalances".
  //We should put this to the inside the above "useMemo";
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  //"render function" avoid this as much as posible since it is really hard to main tain the code with multi render functions.
  //Just use JSX please
  //TS may raise error since sortedBalances is just a "WalletBalance[]" type.
  //Cause at line 115, "balance" has no "formatted" property.
  //Should change the "sortedBalances" at line 104 into "formattedBalance" at line 93.
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          //There is no "classes" to be defined.
          className={classes.row}
          //the sortedBalances is an array that will be reorder index alot should not set the index as key in here may be changed into balance currency.
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

// there is no export statement in here
