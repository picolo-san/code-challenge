import { Amount } from "types";

export const useComputedAmounts = () => {
  const caculateAmountCounterPartByItself = (
    amountToBeCaculated: Amount,
    amountToBeCaculatedBy: Amount,
  ): number => {
    const isAmountToBeCaculated =
      amountToBeCaculated.currency && amountToBeCaculated.price > 0;
    const isAmountToBeCaculatedBy =
      amountToBeCaculatedBy.currency &&
      amountToBeCaculatedBy.price > 0 &&
      amountToBeCaculatedBy.number > 0;

    if (isAmountToBeCaculated && isAmountToBeCaculatedBy)
      return Number(
        (
          (amountToBeCaculatedBy.number * amountToBeCaculatedBy.price) /
          amountToBeCaculated.price
        ).toFixed(10),
      );

    return amountToBeCaculated.number;
  };

  const caculateAmountByItsCounterPart = (
    amountToBeCaculated: Amount,
    amountToBeCaculatedBy: Amount,
  ): number => {
    const isAmountToBeCaculated =
      amountToBeCaculated.currency && amountToBeCaculated.price > 0;
    const isAmountToBeCaculatedBy =
      amountToBeCaculatedBy.currency &&
      amountToBeCaculatedBy.price > 0 &&
      amountToBeCaculatedBy.number > 0;

    if (isAmountToBeCaculated && isAmountToBeCaculatedBy)
      return Number(
        (
          (amountToBeCaculatedBy.number * amountToBeCaculatedBy.price) /
          amountToBeCaculated.price
        ).toFixed(10),
      );

    return 0;
  };

  return {
    caculateAmountCounterPartByItself,
    caculateAmountByItsCounterPart,
  };
};
