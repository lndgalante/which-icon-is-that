import {
  Wrap,
  WrapItem,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

// icons
import { FiHome, FiSearch, FiClock, FiStar } from "react-icons/fi";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";

export function IconRelated() {
  return (
    <Stack as="article" order={{ base: 3, md: 3, lg: "inherit" }}>
      <Accordion allowToggle borderColor="brand.softGrey">
        <AccordionItem>
          <AccordionButton
            paddingX={0}
            paddingY={4}
            _focus={{ boxShadow: "0 0 0 3px brand.softOrange" }}
            _hover={{ backgroundColor: "brand.lightOrange" }}
          >
            <Text fontWeight={700} mr={1} fontSize="lg" color="brand.darkRed">
              Related Icons
            </Text>
            <AccordionIcon color="brand.darkRed" />
          </AccordionButton>
          <AccordionPanel pt={1} pb={6}>
            <Wrap spacing={5}>
              <WrapItem>
                <BoxIcon href="/feather/regular/home" icon={FiHome} label="Home" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/search" icon={FiSearch} label="Search" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/clock" icon={FiClock} label="Clock" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/star" icon={FiStar} label="Star" displayLabel />
              </WrapItem>
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
