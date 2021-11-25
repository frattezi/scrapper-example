import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

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
import { Quote } from "@database/mongo";
import { ColorModeSwitcher } from "@components/ColorModeSwitcher";

function shuffle(array: []): [] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

const Home: NextPage = () => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [quotes, setQuotes] = useState<Quote[]>();
  useEffect(() => {
    async function fetchQuotes() {
      const req = await fetch("http://localhost:3000/api/quotes");
      const data = await req.json();
      setQuotes(shuffle(data));
    }
    fetchQuotes();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" justifyContent="center" maxW="100vw">
        <Grid
          maxWidth="50%"
          margin="0 auto"
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
              </TabList>
              <Portal containerRef={ref}>
                <TabPanels>
                  <TabPanel display="flex" flexWrap="wrap" padding="5px">
                    {quotes?.length ? (
                      quotes.map((quote) => (
                        <Card quote={quote} key={quote._id} />
                      ))
                    ) : (
                      <div>Sem quotes para este dia =/</div>
                    )}
                  </TabPanel>
                </TabPanels>
              </Portal>
            </Tabs>
          </Box>
          <ColorModeSwitcher justifySelf="flex-end" alignContent="center" />
        </Grid>
      </Box>
      <Box
        className="body"
        display="flex"
        flexWrap="wrap"
        ref={ref}
        maxWidth="50%"
        margin="0 auto"
      ></Box>
    </ChakraProvider>
  );
};

export default Home;
