import {
  ComponentStyleConfig,
  extendTheme,
  StyleFunctionProps,
  ThemeConfig,
} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

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
  }
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("gray.50", "gray.900")(props), 
    }
  })
}

// 3. extend the theme
const theme = extendTheme({ config, components, styles });

export default theme;
