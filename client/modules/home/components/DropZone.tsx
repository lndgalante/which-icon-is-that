import { Stack, Text, Button } from '@chakra-ui/react';

export function DropZone() {
  return (
    <Stack minWidth={{ base: 335, md: 454 }} minHeight={{ base: 208, md: 262 }} borderRadius={24} bottom={-122} padding={6} transition="all 400ms ease" willChange="transform" _hover={{ transform: 'scale(1.025)', boxShadow: 'xl' }} position="absolute" backgroundColor="white" boxShadow="lg">
      <Stack flex={1} borderWidth={2} borderRadius={18} paddingTop={{ base: 0, md: 12 }} spacing={4} borderColor="brand.grey" borderStyle="dashed" justifyContent="center" alignItems="center" >
        <Button variant="brand.solid" >Upload Icon</Button>
        <Text display={{ base: 'none', md: 'block' }} maxWidth={204} fontSize="sm">Drag &amp; Drop the SVG file, paste the SVG code or the icon URL</Text>
      </Stack>
    </Stack>
  );
}
