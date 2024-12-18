import { useTheme } from "../contexts/ThemeContext";
import { lightColors, darkColors } from "../theme/colors";

export const useThemeColors = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? darkColors : lightColors;
};
