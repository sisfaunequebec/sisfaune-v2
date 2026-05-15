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
    const { id, parentGroupId, displayOrder } = item
    if (parentGroupId === parentId) {
      const subtree = buildTree(items, id)
      let children = orderBy(subtree, ['displayOrder', sortByName])
      item.children = children
      tree.push(item)
    }
  })

  return orderBy(tree, ['displayOrder', sortByName])
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
  // console.debug(groups)
  const [value, setValue] = useQueryState('g', parseAsArrayOf(parseAsString).withDefault([]))

  const handleAllCheck = useCallback(e => {
    const { checked } = e
    if (checked) {
      setValue([])
    }
  }, [setValue])

  const allChecked = value.length === 0

  const collection = createCollection(groups)

  return (
    <>
      <Checkbox size='sm' colorPalette='blue' variant='subtle' checked={allChecked} mb={4} onCheckedChange={handleAllCheck}><Text fontWeight={'medium'}>Tous les groupes</Text></Checkbox>
      <TreeView.Root collection={collection} checkedValue={value} expandedValue={['1']} variant={'none'} colorPalette={'blue'} onCheckedChange={({ checkedValue} ) => setValue(checkedValue)}>
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