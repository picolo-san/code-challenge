//missing import statement for iterface, react, custom hooks and built in hooks

interface WalletBalance {
  currency: string;
  amount: number;
}
// this inteface could extend WalletBalance
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
// seems like props is unused in the whole component. We should remove it.
interface Props extends BoxProps {}
// init Props interface twices this will not cause any warning but it is uncessary.
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // unused "children" props it will not cause bug but typescript may raise it
  const balances = useWalletBalances();
  const prices = usePrices();

  //using any type as a workaround for avoid TS warning, but if we using any type why we need TS at the first place ?
  //this could be a string type
  // this could be an utility function.

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

  // no import statement for useMemo hook.
  // this a quite long hook, please consider to turn it into a custom hook.
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        //there is no blockchain property in the "WalletBalance" interface.
        const balancePriority = getPriority(balance.blockchain);
        // un-defined variable.
        // this shoule be the balancePriority.
        if (lhsPriority > -99) {
          // magic number
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        //there is no blockchain property in the "WalletBalance" interface.
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
    //no depency "prices" inside the hook.
    // need to remove this "prices" dependency.
    // shadowing comparing this may not run again when balances change its item.
  }, [balances, prices]);

  // this is a format data function could defnitely put it inside the above hook.
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  // render function please, it's really hard to this at a large component. In this case, please turn this into JSX
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        //no import statement for this compnent
        <WalletRow
          // no import statement for class name for styling
          className={classes.row}
          key={index} // key should not be index dude the index may change when the a new array is used.
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  // {... rest} object is put into div may be we don't need props in here
  return <div {...rest}>{rows}</div>;
};

// no export WalletPage component
