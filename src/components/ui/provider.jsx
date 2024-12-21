'use client'

import { ChakraProvider, defineConfig, mergeConfigs, defaultBaseConfig, defaultConfig, defineRecipe, defineSlotRecipe, defineTokens, defineTextStyles, createSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

import { avatarAnatomy, menuAnatomy, tabsAnatomy, accordionAnatomy } from '@chakra-ui/react/anatomy'

const tokens = defineTokens({
  colors: {
    blue: {
      50: { value: "#f3f8fb" },
      100: { value: "#e4ecf5" },
      200: { value: "#d0e0ed" },
      300: { value: "#afcbe1" },
      400: { value: "#89afd1" },
      500: { value: "#6d96c4" },
      600: { value: "#5f83b9" },
      700: { value: "#4f6ea6" },
      800: { value: "#445a89" },
      900: { value: "#3b4c6d" },
      950: { value: "#273144" } 
    },
    green: {
      50: { value: "#f3f7ee" },
      100: { value: "#e4ecdb" },
      200: { value: "#ccdbbb" },
      300: { value: "#abc492" },
      400: { value: "#8dac6f" },
      500: { value: "#739654" },
      600: { value: "#56723e" },
      700: { value: "#435932" },
      800: { value: "#38482c" },
      900: { value: "#313f28" },
      950: { value: "#182112" } 
    }
  }
})

const avatarRecipe = defineSlotRecipe({
  slots: avatarAnatomy.keys(),
  variants: {
    variant: {
      solid: {
        root: {
          bg: 'colorPalette.500',
          color: 'colorPalette.contrast'
        }
      }
    }
  }
})

const tabsRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  base: {
    list: {
      gap: 2
    },
    trigger: {
      bg: 'gray.100'
    }
  }
})

const menuRecipe = defineSlotRecipe({
  slots: menuAnatomy.keys(),
  base: {
    item: {
      borderRadius: 'sm',
      cursor: 'pointer',
      _hover: {
        bg: 'gray.100'
      }
    }
  }
})

// const accordionRecipe = defineSlotRecipe({
//   slots: accordionAnatomy.keys(),
//   base: {
//     itemTrigger: {
//       gap: "2"
//     }
//   }
// })

const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      solid: {
        bg: 'colorPalette.600',
        color: 'colorPalette.contrast'
      }
    }
  }
})

const textStyles = defineTextStyles({
  // body: {
  //   description: 'The body text style',
  //   value: {
  //     fontSize: '28px'
  //   }
  // }
})

const config = defineConfig({
  globalCss: {
    'html, body': {
      bg: 'gray.100',
      minH: '100vh'
    }
  },
  theme: {
    tokens,
    recipes: {
      button: buttonRecipe
    },
    slotRecipes: {
      avatar: avatarRecipe,
      menu: menuRecipe,
      tabs: tabsRecipe
    }
    // textStyles
  }
})

const system = createSystem(defaultConfig, config)

const Provider = ({ children }) => {
  return (
    <ChakraProvider value={system}>
      {/* <ColorModeProvider> */}
        {children}
      {/* </ColorModeProvider> */}
    </ChakraProvider>
  )
}

export default Provider
