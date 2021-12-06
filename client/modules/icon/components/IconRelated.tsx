import {
  Stack,
  Text,
  Accordion,
  SimpleGrid,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

//types
import { IconsRelated } from "@modules/common/utils/types";

// components
import { BoxIcon } from "@modules/common/components/BoxIcon";

// utils
import { getIconComponent } from "@modules/common/utils/getIconComponent";

type Props = {
  relatedIcons: IconsRelated[];
};

export function IconRelated({ relatedIcons }: Props) {
  return (
    <Stack as="article" order={{ base: 3, md: 3, lg: "inherit" }}>
      <Accordion allowToggle borderColor="brand.softGrey">
        <AccordionItem>
          <AccordionButton
            paddingX={0}
            paddingY={4}
            _focus={{ boxShadow: "0 0 0 3px brand.softOrange" }}
            _hover={{ backgroundColor: "transparent" }}
            role="group"
            aria-label="Related Icons"
          >
            <Text
              fontWeight={700}
              mr={1}
              fontSize="lg"
              color="brand.darkRed"
              _groupHover={{ color: "brand.orange" }}
              transition="color 200ms ease-in-out"
            >
              Related Icons
            </Text>
            <AccordionIcon
              color="brand.darkRed"
              _groupHover={{ color: "brand.orange" }}
              transition="all 200ms ease-in-out"
            />
          </AccordionButton>
          <AccordionPanel pb={4} px={0}>
            {!relatedIcons || relatedIcons?.length === 0 ? (
              <Text>No related icons found</Text>
            ) : (
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
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
