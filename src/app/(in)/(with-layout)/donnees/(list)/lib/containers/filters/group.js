'use client'

import { useCallback } from 'react'

import orderBy from 'lodash.orderby'

import { useQueryState, parseAsString, parseAsArrayOf } from 'nuqs'

import {
  Checkmark,
  TreeView,
  createTreeCollection,
  useTreeViewNodeContext,
  Text
} from '@chakra-ui/react'

import { Checkbox } from '@/app/lib/components/ui/checkbox'

const sortByName = (group) => group.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase()

const buildTree = (items, parentId = null) => {
  let tree = []

  items.forEach(item => {
    const { id, parentGroupId } = item
    if (parentGroupId === parentId) {
      let children = orderBy(buildTree(items, id), [sortByName, 'name'])
      item.children = children
      tree.push(item)
    }
  })

  return orderBy(tree, [sortByName, 'name'])
}

const createCollection = (items) => {
  let tree = buildTree(items)
      
  const collection = createTreeCollection({
    nodeToValue: (node) => node.id.toString(),
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: null,
      children: tree
    }
  })

  return collection
}

const TreeNodeCheckbox = (props) => {
  const nodeState = useTreeViewNodeContext()
  return (
    <TreeView.NodeCheckbox {...props}>
      <Checkmark
        bg={{
          base: 'blue.200',
          _checked: "colorPalette.surface",
          _indeterminate: "colorPalette.subtle",
        }}
        color={{
          base: 'blue.700'
        }}
        border={'none'}
        size={'sm'}
        checked={nodeState.checked === true}
        indeterminate={nodeState.checked === 'indeterminate'}
      />
    </TreeView.NodeCheckbox>
  )
}

const Group = ({ groups = [] }) => {
  const [value, setValue] = useQueryState('g', parseAsArrayOf(parseAsString).withDefault([]))

  const handleAllCheck = useCallback(e => {
    const { checked } = e
    if (checked) {
      setValue([])
    }
  }, [setValue])

  const allChecked = value.length === 0

  const test = createCollection(groups)

  const collection = createTreeCollection({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: null,
      children: [
        { id: '3', name: 'Amphibiens/Reptiles' },
        { id: '5', name: 'Invertébrés' },
        {
          id: '1',
          name: 'Mammifères',
          children: [
            { id: '104', name: 'Caribous' },
            { id: '105', name: "Cerfs" },
          ]
        },
        { id: '2', name: 'Oiseaux' }
      ]
    }
  })

  return (
    <>
      <Checkbox size='sm' colorPalette='blue' variant='subtle' checked={allChecked} mb={4} onCheckedChange={handleAllCheck}><Text fontWeight={'medium'}>Tous les groupes</Text></Checkbox>
      <TreeView.Root collection={test} checkedValue={value} expandedValue={['1']} variant={'none'} colorPalette={'blue'} onCheckedChange={({ checkedValue} ) => setValue(checkedValue)}>
        <TreeView.Tree css={{ '--tree-padding-inline': '0rem' }}>
          <TreeView.Node
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl role={'none'}>
                  <TreeNodeCheckbox />
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <TreeNodeCheckbox />
                  <TreeView.ItemText>{node.name}</TreeView.ItemText>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </>
    
  )
}

export default Group