import React from "react";

import Button from "components/comon/Button";
import { HeaderWraper } from "./styles";

const Header: React.FunctionComponent<React.HTMLAttributes<HTMLElement>> = (
  props,
) => {
  return (
    <HeaderWraper {...props}>
      <Button size="small">Connect Wallet</Button>
    </HeaderWraper>
  );
};

export default Header;
