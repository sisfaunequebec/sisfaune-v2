'use client'

import { defineConfig, defaultConfig, defineRecipe, defineSlotRecipe, defineTokens, defineTextStyles, createSystem } from '@chakra-ui/react'

import { avatarAnatomy, menuAnatomy, tabsAnatomy, accordionAnatomy, checkboxAnatomy, dialogAnatomy } from '@chakra-ui/react/anatomy'

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
      gap: 1
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
        bg: 'green.100',
        color: 'green.800'
      }
    }
  }
})

const accordionRecipe = defineSlotRecipe({
  slots: accordionAnatomy.keys(),
  base: {
    itemTrigger: {
      gap: 1
    },
    itemIndicator: {
      color: 'green.500'
    }
  }
})

const checkboxRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  base: {
    label: {
      fontWeight: 'normal'
    }
  }
})

const dialogRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    content: {
      textStyle: ['md', null, 'sm']
    },
    body: {
      gap: '3 !important',
      alignItems:  'flex-start !important',
      lineHeight: '1.2rem'
    },
    footer: {
      gap: '2 !important',
    },
    title: {
      textStyle: ['xl', null, 'lg'],
      lineHeight: '1.5rem'
    }
  },
  variants: {
    size: {
      cover: {
        positioner: {
          padding: '2'
        }
      }
    }
  }
})

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

const inputRecipe = defineRecipe({
  base: {
    _readOnly: {
      bg: 'bg.muted',
      borderColor: 'transparent',
      focusRingColor: 'transparent'
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
      bg: { base: 'gray.100', _dark: 'gray.900' },
      minH: '100vh'
    }
  },
  theme: {
    tokens,
    recipes: {
      button: buttonRecipe,
      input: inputRecipe
    },
    slotRecipes: {
      avatar: avatarRecipe,
      menu: menuRecipe,
      tabs: tabsRecipe,
      accordion: accordionRecipe,
      checkbox: checkboxRecipe,
      dialog: dialogRecipe
    }
    // textStyles
  }
})

const system = createSystem(defaultConfig, config)

export default system
