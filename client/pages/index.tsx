import { Stack } from '@chakra-ui/react'

// components
import { Navbar } from '@modules/common/components/Navbar'
import { Header } from '@modules/home/components/Header'
import { ExampleIcons } from '@modules/home/components/ExampleIcons'

export default function Demo() {
  return (
    <Stack paddingX={{ base: 0, md: 12 }}>
      <Navbar />
      <Header />
      <ExampleIcons />
    </Stack>
  )
}
