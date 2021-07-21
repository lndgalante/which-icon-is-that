import { Stack } from '@chakra-ui/react'

// components
import { Header } from '@modules/home/components/Header'
import { Navbar } from '@modules/common/components/Navbar'

export default function Demo() {
  return (
    <Stack paddingX={{ base: 0, md: 12 }}>
      <Navbar />
      <Header />
    </Stack>
  )
}
