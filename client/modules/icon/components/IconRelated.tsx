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
import * as FeatherIcons from "react-icons/fi";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";

export function IconRelated() {
  return (
    <Stack as="article" order={{ base: 3, md: 3, lg: "inherit" }}>
      <Accordion borderColor="brand.softGrey">
        <AccordionItem>
          <AccordionButton paddingX={0} paddingY={4} _focus={{ boxShadow: "0 0 0 3px brand.softOrange" }}>
            <Text fontWeight={800} mr={1} fontSize="lg" color="brand.darkRed">
              Related Icons
            </Text>
            <AccordionIcon color="brand.darkRed" />
          </AccordionButton>
          <AccordionPanel pt={1} pb={6}>
            <Wrap spacing={5}>
              <WrapItem>
                <BoxIcon href="/feather/regular/home" icon={<FeatherIcons.FiHome />} label="Home" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/search" icon={<FeatherIcons.FiSearch />} label="Search" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/clock" icon={<FeatherIcons.FiClock />} label="Clock" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/star" icon={<FeatherIcons.FiStar />} label="Star" displayLabel />
              </WrapItem>
            </Wrap>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton paddingX={0} paddingY={4} _focus={{ boxShadow: "0 0 0 3px brand.softOrange" }}>
            <Text fontWeight={800} mr={1} fontSize="lg" color="brand.darkRed">
              Similar Icons
            </Text>
            <AccordionIcon color="brand.darkRed" />
          </AccordionButton>
          <AccordionPanel pt={1} pb={6}>
            <Wrap spacing={5}>
              <WrapItem>
                <BoxIcon href="/feather/regular/home" icon={<FeatherIcons.FiHome />} label="Home" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/search" icon={<FeatherIcons.FiSearch />} label="Search" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/clock" icon={<FeatherIcons.FiClock />} label="Clock" displayLabel />
              </WrapItem>
              <WrapItem>
                <BoxIcon href="/feather/regular/star" icon={<FeatherIcons.FiStar />} label="Star" displayLabel />
              </WrapItem>
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
