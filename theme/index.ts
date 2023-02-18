import { extendTheme, theme as baseTheme, type ThemeConfig } from "@chakra-ui/react";

import { styles } from "./styles";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  primary: baseTheme.colors["telegram"],
};

export default extendTheme({
  config,
  colors,
  styles,
});
