import {
  Tabs,
  Portal,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import { Quote } from "@database/mongo";
import React, { Ref, RefObject } from "react";
import Card from "@components/Card";

interface ITabComponent {
  quotes: Quote[];
  portalRef: RefObject<HTMLElement>;
}

export default function TabComponent({
  portalRef,
  quotes
}: ITabComponent): JSX.Element {
  return (
    <Tabs variant="soft-rounded" colorScheme="green" justifyContent="center">
      <TabList justifyContent="center">
        <Tab id="dayid">12/08/2021</Tab>
      </TabList>
      <Portal containerRef={portalRef}>
        <TabPanels>
          <TabPanel display="flex" flexWrap="wrap" padding="5px">
            {quotes?.length ? (
              quotes.map((quote) => <Card quote={quote} key={quote._id} />)
            ) : (
              <div>Sem quotes para este dia =/</div>
            )}
          </TabPanel>
        </TabPanels>
      </Portal>
    </Tabs>
  );
}
