import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@Root/tailwind.config'; // Fix the path

const fullConfig = resolveConfig(tailwindConfig);

export const getBreakpointValue = (value) =>
  +fullConfig.theme.screens[value].slice(
    0,
    fullConfig.theme.screens[value].indexOf('px')
  );

export const getCurrentBreakpoint = () => {
  let currentBreakpoint;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
    const breakpointValue = getBreakpointValue(breakpoint);
    if (
      breakpointValue > biggestBreakpointValue &&
      ((typeof window !== "undefined" && window?.innerWidth) >= breakpointValue)
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint;
    }
  }
  return currentBreakpoint;
};