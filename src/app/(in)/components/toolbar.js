import { auth } from '@/auth'

import { Flex, HStack, Image } from '@chakra-ui/react'

import { Avatar } from '@/components/ui/avatar'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger
} from '@/components/ui/menu'

import SignOutButton from './ui/sign-out-button'

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const Toolbar = async () => {
  const session = await auth()
  const { user } = session
  const { name : username } = user

  return (
    <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'} pt={1} pe={2}>
        <Flex>
          <Image src={'/logo_sisfaune_small.png'} alt={'logo'}  />
        </Flex>
        <HStack gap={[3, null, 1]}>
          {/* <MenuRoot positioning={{ placement: 'bottom-end' }}>
            <MenuTrigger>
              <Avatar name={username} colorPalette={'green'} size={'sm'} variant={'solid'} cursor={'pointer'} />
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="new-txt-a"  cursor={'pointer'}>
                New Text File
              </MenuItem>
              <MenuItem value="new-file-a"  cursor={'pointer'}>
                New File...
              </MenuItem>
            </MenuContent>
          </MenuRoot> */}
          <SignOutButton />
        </HStack>
    </Flex>
  )
}

export default Toolbar
