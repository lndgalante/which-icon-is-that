import { TabPanel, TabPanelProps } from "@chakra-ui/react";


type CustomTabPanelProps = {
  children?: React.ReactNode;
  otherProps?: TabPanelProps;
};

export function CustomTabPanel({ children, ...otherProps }: CustomTabPanelProps) {
  return (
    <TabPanel
      padding={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={233}
      backgroundClip="content-box"
      backgroundImage="radial-gradient(rgba(196,196,196,0.4) 1px, transparent 0)"
      backgroundSize="8px 8px"
      borderWidth={1}
      borderColor="brand.softGrey"
      borderBottomLeftRadius={8}
      borderBottomRightRadius={8}
      {...otherProps}
    >
      {children}
    </TabPanel>
  );
}
