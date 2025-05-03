'use client'

import { useState, useMemo } from 'react'

import { useCombobox } from 'downshift'

import { Flex, Field, Input, VStack, Portal, Select, createListCollection } from '@chakra-ui/react'

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

const books = [
  {value: 'book-1', author: 'Harper Lee', title: 'To Kill a Mockingbird'},
  {value: 'book-2', author: 'Lev Tolstoy', title: 'War and Peace'},
  {value: 'book-3', author: 'Fyodor Dostoyevsy', title: 'The Idiot'},
  {value: 'book-4', author: 'Oscar Wilde', title: 'A Picture of Dorian Gray'},
  {value: 'book-5', author: 'George Orwell', title: '1984'},
  {value: 'book-6', author: 'Jane Austen', title: 'Pride and Prejudice'},
  {value: 'book-7', author: 'Marcus Aurelius', title: 'Meditations'},
  {
    value: 'book-8',
    author: 'Fyodor Dostoevsky',
    title: 'The Brothers Karamazov',
  },
  {value: 'book-9', author: 'Lev Tolstoy', title: 'Anna Karenina'},
  {value: 'book-10', author: 'Fyodor Dostoevsky', title: 'Crime and Punishment'},
]
function getBooksFilter(inputValue) {
  const lowerCasedInputValue = inputValue.toLowerCase()

  return function booksFilter(book) {
    return (
      !inputValue ||
      book.title.toLowerCase().includes(lowerCasedInputValue) ||
      book.author.toLowerCase().includes(lowerCasedInputValue)
    )
  }
}

const Combo = () => {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  return (
    <Flex pt="48" justify="center" align="center" w="full">
      <Field.Root w="60">
        <Field.Label></Field.Label>
        <AutoComplete p={1} >
          <AutoCompleteInput variant="solid" size={'xs'} autoComplete={'off'} />
          <AutoCompleteList bg={'bg'} p={1} borderRadius={'xl'}>
            {countries.map((country, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={country}
                textTransform="capitalize"
                _focus={{ bg: 'green.100'}}
                // _selected={{ bg: 'green.200'}}
                m={0}
                fontSize={'xs'}
              >
                {country}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </Field.Root>
    </Flex>
  );
}



export default Combo

  {/* <label className="w-fit" {...getLabelProps()}>
            Choose your favorite book:
          </label>
          <div className="flex shadow-sm bg-white gap-0.5">
            <input
              placeholder="Best book ever"
              className="w-full p-1.5"
              {...getInputProps()}
            />
            <button
              aria-label="toggle menu"
              className="px-2"
              type="button"
              {...getToggleButtonProps()}
            >
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul
          className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                // className={}
                key={item.id}
                {...getItemProps({item, index})}
              >
                <span>{item.title}</span>
                <span className="text-sm text-gray-700">{item.author}</span>
              </li>
            ))}
        </ul> */}