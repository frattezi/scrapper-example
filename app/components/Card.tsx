// Sample card from Airbnb
import * as React from "react";
import { Badge, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { Quote } from "@database/mongo";
import { IQuoteTypes } from "@components/ICard";
import { ArrowUpIcon, CheckIcon, SunIcon } from "@chakra-ui/icons";

const quoteTypes: IQuoteTypes = {
  didYouKnow: {
    text: "Did you Know?",
    color: "#b2f5ea",
    icon: <CheckIcon w={6} h={6} />,
    colorScheme: "teal"
  },
  inTheNews: {
    text: "In the News!",
    color: "#c6f6d5",
    icon: <SunIcon w={6} h={6} />,
    colorScheme: "green"
  },
  onThisDay: {
    text: "On this Day",
    color: "#bee3f8",
    icon: <ArrowUpIcon w={6} h={6} />,
    colorScheme: "blue"
  }
};
interface ICard {
  quote: Quote;
}

export default function Card({ quote }: ICard, ...restProps: any): JSX.Element {
  const quoteType = quoteTypes[quote.type];

  return (
    <Box
      maxW="270px"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      margin="5px"
    >
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="center"
        padding="10px 0px"
      >
        <Badge borderRadius="full" px="2" colorScheme={quoteType.colorScheme}>
          {quoteType.text}
        </Badge>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
        backgroundColor={quoteType.color}
        minH="100px"
      >
        {quoteType.icon}
      </Box>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {quote.fullText}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < quote.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {quote.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
