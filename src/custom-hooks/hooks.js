import { useMediaQuery as mediaQuery } from "react-responsive";

export const useMediaQuery = () => {
  const Desktop = ({ children }) => {
    const isDesktop = mediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = mediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = mediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = mediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };

  return { Desktop, Tablet, Mobile, Default };
};
