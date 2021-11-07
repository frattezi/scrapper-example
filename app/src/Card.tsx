// Sample card from Airbnb
import * as React from "react";
import { Badge, Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function Card() {
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    text: "... that the women's race at today's New York City Marathon will feature two of the medalists from this year's Olympic marathon",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="center"
        padding="10px 0px"
      >
        <Badge borderRadius="full" px="2" colorScheme="teal">
          Did you Know ?
        </Badge>
      </Box>

      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {property.text}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
