'use client'

import { useState, useCallback } from 'react'

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
import { collect } from '@turf/turf'
import { get } from 'http'

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
  const [parent, setParent] = useState(null)

  const collection = createCollection(groups)

  const handleAllCheck = useCallback(e => {
    const { checked } = e
    if (checked) {
      setValue([])
    }
  }, [setValue])

  const handleCheckChange = useCallback(e => {
    const { checkedValue: values } = e
    const [ firstValue ] = values

    // console.debug('check change', values)

    const indexPath = collection.resolveIndexPath(firstValue)
    const node = collection.resolveNode(firstValue)
    const isBranchNode = collection.isBranchNode(node)
    const siblings = indexPath ? collection.getSiblingNodes(indexPath) : []
    const parent = indexPath ? collection.getParentNode(indexPath) : null

    const allChecked = siblings.length === values.length

    let allValues = values
    

    if (allChecked) {
      if (parent) {
        allValues.push(parent.id.toString())
      }
    } else {
      // if (isBranchNode) {
        allValues = allValues.filter(value => value !== firstValue.toString())
      // }
    }

    console.debug(firstValue, isBranchNode, allValues)

    setValue(allValues)
  }, [setValue, collection])

  const handleParentClick = useCallback(e => {
    const { checked, value } = e
    if (checked) {
      setParent(null)
    } else {
      setParent(value)
    }
  }, [setParent])

  const allChecked = value.length === 0



  // console.debug('parent', parent, collection)

  return (
    <>
      <Checkbox size='sm' colorPalette='blue' variant='subtle' checked={allChecked} mb={4} onCheckedChange={handleAllCheck}><Text fontWeight={'medium'}>Tous les groupes</Text></Checkbox>
      <TreeView.Root collection={collection} checkedValue={value} expandedValue={['1']} variant={'none'} colorPalette={'blue'} onCheckedChange={handleCheckChange }>
        <TreeView.Tree css={{ '--tree-padding-inline': '0rem' }}>
          <TreeView.Node
            render={({ node, nodeState }) => {
              if (nodeState.value === '1') {
                // console.debug('node state', nodeState)
              }
              return (
                nodeState.isBranch ? (
                  <TreeView.BranchControl role={'none'}>
                    <TreeNodeCheckbox onClick={() => { ; handleParentClick({ checked: nodeState.checked, value: nodeState.value })} } />
                    <TreeView.BranchText>{node.name}</TreeView.BranchText>
                  </TreeView.BranchControl>
                ) : (
                  <TreeView.Item >
                    <TreeNodeCheckbox />
                    <TreeView.ItemText>{node.name}</TreeView.ItemText>
                  </TreeView.Item>
                )
              )
            }}
          />
        </TreeView.Tree>
      </TreeView.Root>
    </>
    
  )
}

export default Group