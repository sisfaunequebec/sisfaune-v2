'use client'
import { useWindowScroll } from '@uidotdev/usehooks'

import { Box, Flex, Container, Stack, VStack, Collapsible, Tabs, IconButton, HStack  } from '@chakra-ui/react'
import { Button } from "@/components/ui/button"

import { RxPlus, RxDownload, RxUpload  } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import { RiFilterLine } from "react-icons/ri";

const NewEventButton = () => {
  return (
    <>
    <Button rounded="full"  variant={'solid'} colorPalette={'blue'} display={['none', null, null, 'inherit']}><RxPlus />Nouvel événement</Button>
    <IconButton size={'sm'} rounded="full"  variant={'solid'} colorPalette={'blue'} aria-label="Search database" display={['inherit', null, null, 'none']}><RxPlus /></IconButton>
    </>
  )
}

const Toolbar = () => {
  const [{ x, y }, scrollTo] = useWindowScroll()

  const toolbarShadowSize = y > 70 ? 'md' : null
  // const paddingTop = y > 70 ? 2 : null

  return (
    <Flex
      flex={1}
      position={'sticky'}
      top={'70px'}
      alignSelf={'flex-start'}
      width={'full'}
      zIndex={1}
      shadow={toolbarShadowSize}
    >
      <Flex 
        flex={1}
        bg={'white'}
        py={1}
      >
        {/* <Stack direction={['column', null, 'row']} flex={1}> */}
          <Container maxWidth={'4xl'} py={2} >

            <HStack justifyContent={'space-between'} gap={2}>

              <HStack justifyContent={'space-between'} gap={2}>

              <IconButton size={'sm'} rounded="full" variant={'solid'} colorPalette={'blue'} aria-label="Search database" display={['inherit', null, 'none']}><RiFilterLine /></IconButton>

                <Tabs.Root defaultValue='evenement' variant={'subtle'} size={'sm'} colorPalette={'blue'}>
                  <Tabs.List>
                    <Tabs.Trigger value='evenement' borderRadius={'full'}>
                      {/* <LuUser /> */}
                      Événements
                    </Tabs.Trigger>
                    <Tabs.Trigger value='specimens' borderRadius={'full'}>
                      {/* <LuFolder /> */}
                      Spécimens
                    </Tabs.Trigger>
                  </Tabs.List>
                </Tabs.Root>

              </HStack>

              <HStack justifyContent={'space-between'} gap={1}>
                <IconButton size={'sm'} rounded="full" variant={'solid'} colorPalette={'blue'} aria-label="Search database"  ><RxDownload /></IconButton>
                {/* <IconButton size={'sm'} rounded="full"  variant={'subtle'} colorPalette={'blue'} aria-label="Search database"  ><RxUpload /></IconButton> */}
                {/* <IconButton size={'sm'} rounded="full"  variant={'solid'} colorPalette={'blue'} aria-label="Search database"  ><RxPlus /></IconButton> */}
                <NewEventButton/>
              </HStack>

            </HStack>

          </Container>
          {/* <Container>
            Filters
          </Container> */}
        {/* </Stack> */}
    </Flex>

  </Flex>

  )

}

export default Toolbar