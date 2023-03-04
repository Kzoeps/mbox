import {
  ComponentStyleConfig,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const components: Record<string, ComponentStyleConfig> = {
  Button: {
    defaultProps: {
      colorScheme: "orange",
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, components });

export default theme;
