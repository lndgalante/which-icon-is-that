import {
  Stack,
  Text,
  Accordion,
  SimpleGrid,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

//types
import { IconsRelated } from "@modules/common/utils/types";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";

// utils
import { getIconComponent } from "@modules/common/utils/getIconComponent";

type IconRelatedProps = {
  relatedIcons: IconsRelated[];
};

export function IconRelated({ relatedIcons }: IconRelatedProps) {
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
            <SimpleGrid gridTemplateColumns="repeat(auto-fit, 80px)" spacing={{ base: "14px", md: "28px" }}>
              {relatedIcons?.map(({ iconName, packName, iconType, reactIconName }) => {
                return (
                  <BoxIcon
                    key={reactIconName}
                    href={{
                      pathname: "/[packName]/[iconType]/[iconName]",
                      query: { packName, iconType, iconName },
                    }}
                    icon={getIconComponent(packName, reactIconName)}
                    label={iconName}
                    displayLabel
                  />
                );
              })}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
