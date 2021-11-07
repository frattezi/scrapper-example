import * as React from "react";
import {
  ChakraProvider,
  Box,
  theme,
  Tabs,
  Portal,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid
} from "@chakra-ui/react";
import Card from "./Card";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const App = () => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" justifyContent="center" maxW="100vw">
        <Grid
          width="80%"
          justifyContent="center"
          display="inline-grid"
          gridTemplateColumns="1fr 1fr"
        >
          <Box className="Tabs" justifyContent="center">
            <Tabs
              variant="soft-rounded"
              colorScheme="green"
              justifyContent="center"
            >
              <TabList justifyContent="center">
                <Tab>12/08/2021</Tab>
                <Tab>12/08/2021</Tab>
              </TabList>
              <Portal containerRef={ref}>
                <TabPanels>
                  <TabPanel>
                    <Card />
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Portal>
            </Tabs>
          </Box>
          <ColorModeSwitcher justifySelf="flex-end" alignContent="center" />
        </Grid>
      </Box>
      <Box class="body" ref={ref}></Box>
    </ChakraProvider>
  );
};
