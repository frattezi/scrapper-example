import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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
import Card from "@components/Card";
import { ColorModeSwitcher } from "@components/ColorModeSwitcher";

const Home: NextPage = () => {
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
      <Box className="body" ref={ref}></Box>
    </ChakraProvider>
  );
};

export default Home;
