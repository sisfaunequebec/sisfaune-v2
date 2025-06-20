'use client'

import { defineConfig, defaultConfig, defineRecipe, defineSlotRecipe, defineTokens, defineSemanticTokens, createSystem } from '@chakra-ui/react'

import { avatarAnatomy, menuAnatomy, tabsAnatomy, accordionAnatomy, checkboxAnatomy, radioGroupAnatomy, dialogAnatomy, selectAnatomy } from '@chakra-ui/react/anatomy'

const tokens = defineTokens({
  colors: {
    blue: {
      50: { value: '#f3f8fb' },
      100: { value: '#e4ecf5' },
      200: { value: '#d0e0ed' },
      300: { value: '#afcbe1' },
      400: { value: '#89afd1' },
      500: { value: '#6d96c4' },
      600: { value: '#5f83b9' },
      700: { value: '#4f6ea6' },
      800: { value: '#445a89' },
      900: { value: '#3b4c6d' },
      950: { value: '#273144' }
    },
    green: {
      50: { value: '#f3f7ee' },
      100: { value: '#e4ecdb' },
      200: { value: '#ccdbbb' },
      300: { value: '#abc492' },
      400: { value: '#8dac6f' },
      500: { value: '#739654' },
      600: { value: '#56723e' },
      700: { value: '#435932' },
      800: { value: '#38482c' },
      900: { value: '#313f28' },
      950: { value: '#182112' }
    }
  },
  cursor: {
    checkbox: { value: 'pointer' },
    radio: { value: 'pointer' }
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
  },
  variants: {
    variant: {
      subtle: {
        trigger: {
          _selected: {
            borderColor: 'colorPalette.solid'
          }
        }
      }
    },
    size: {
      lg: {
        root: {
          // Same height as buttons
          "--tabs-height": "sizes.10",
        }
      }
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
      gap: 1,
      cursor: 'pointer',
      _disabled: {
        layerStyle: null
      }
    },
    itemIndicator: {
      color: 'green.500'
    }
  }
})

const radioGroupRecipe = defineSlotRecipe({
  slots: radioGroupAnatomy.keys(),
  base: {
    item: {
      cursor: 'pointer',
      fontWeight: 'normal'
    }
  }
})

const checkboxRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys(),
  base: {
    label: {
      cursor: 'pointer',
      fontWeight: 'normal'
    }
  }
})

const selectRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: {

    trigger: {
      cursor: 'pointer',
      _focus: {
        bg: 'blue.50'
      }
    },
    item: {
      cursor: 'pointer'
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
      alignItems: 'flex-start !important',
      lineHeight: '1.2rem'
    },
    footer: {
      gap: '2 !important'
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
          padding: '1'
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
    _focus: {
      bg: 'blue.50'
    },
    _readOnly: {
      cursor: 'default',
      bg: 'bg.muted',
      borderColor: 'transparent',
      focusRingColor: 'transparent'
    }
  }
})

const textAreaRecipe = defineRecipe({
  base: {
    _readOnly: {
      cursor: 'default',
      bg: 'bg.muted',
      borderColor: 'transparent',
      focusRingColor: 'transparent'
    }
  }
})

// const textStyles = defineTextStyles({
//   // body: {
//   //   description: 'The body text style',
//   //   value: {
//   //     fontSize: '28px'
//   //   }
//   // }
// })

const config = defineConfig({
  globalCss: {
    'html, body': {
      minH: '100vh',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      bg: { base: 'gray.100', _dark: 'gray.900' }
    }
  },
  theme: {
    tokens,
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      textarea: textAreaRecipe
    },
    slotRecipes: {
      avatar: avatarRecipe,
      menu: menuRecipe,
      tabs: tabsRecipe,
      accordion: accordionRecipe,
      radioGroup: radioGroupRecipe,
      checkbox: checkboxRecipe,
      dialog: dialogRecipe,
      select: selectRecipe
    }
    // textStyles
  }
})

const system = createSystem(defaultConfig, config)

export default system
