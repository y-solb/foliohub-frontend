import useOutsideClick from '@/hooks/useOutsideClick'
import React, { useState } from 'react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
  AiOutlineFontColors,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
} from 'react-icons/ai'

const COLORS: Record<string, string> = {
  black: 'text-black',
  gray: 'text-gray-500',
  red: 'text-rose-500',
  orange: 'text-orange-500',
  yellow: 'text-yellow-400',
  green: 'text-lime-500',
  blue: 'text-indigo-500',
  purple: 'text-violet-500',
}

function TextToolbar() {
  const [activeTab, setActive] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOpen, setIsOpen, outRef] = useOutsideClick(() => {
    setIsOpen(false)
  })
  const [isOpenTextSize, setIsOpenTextSize, outTextSizeRef] = useOutsideClick(
    () => {
      setIsOpenTextSize(false)
      setIsOpen(false)
    },
  )
  const [isOpenTextColor, setIsOpenTextColor, outTextColorRef] =
    useOutsideClick(() => {
      setIsOpenTextColor(false)
      setIsOpen(false)
    })

  const handleSelection = () => {
    console.log('handleSelection')
    const selection = window.getSelection()

    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0).getBoundingClientRect()

      setPosition({
        x: range.x + range.width / 2 - 21,
        y: range.y - 50,
      }) // TODO: x: outRef의 width / 2를 빼줘야 한다.
      setIsOpen(true)
      setIsOpenTextSize(false)
      setIsOpenTextColor(false)
      setActive('')
    } else {
      setIsOpen(false)
    }
  }

  const handleStyleText = (type: string, value?: string) => {
    const selection = window.getSelection()

    if (selection) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()
      // TODO: type event target name으로 변경해도 좋을듯
      switch (type) {
        case 'size': {
          const sizeText = document.createElement('span')
          if (value === 'title') {
            sizeText.classList.add('title')
          } else if (value === 'subtitle') {
            sizeText.classList.add('subtitle1')
          } else if (value === 'text') {
            sizeText.classList.add('body1')
          }
          sizeText.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
          range.insertNode(sizeText)
          break
        }
        case 'bold': {
          const boldText = document.createElement('strong')
          boldText.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
          range.insertNode(boldText)
          break
        }
        case 'italic': {
          const boldText = document.createElement('i')
          boldText.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
          range.insertNode(boldText)
          break
        }
        case 'underline': {
          const boldText = document.createElement('u')
          boldText.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
          range.insertNode(boldText)
          break
        }
        case 'strike': {
          const boldText = document.createElement('strike')
          boldText.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
          range.insertNode(boldText)
          break
        }
        case 'unordered': {
          const unorderedList = document.createElement('ul')
          const listItem = document.createElement('li')
          unorderedList.appendChild(listItem)
          console.log(unorderedList)
          range.surroundContents(unorderedList)
          break
        }
        case 'ordered': {
          const orderedList = document.createElement('ol')
          const listItem = document.createElement('li')
          orderedList.appendChild(listItem)
          range.surroundContents(orderedList)
          break
        }
        case 'color': {
          const coloredText = document.createElement('span')
          coloredText.classList.add(`${value && COLORS[value]}`)
          coloredText.appendChild(document.createTextNode(selectedText))
          range.deleteContents()
          range.insertNode(coloredText)
          break
        }

        default:
          break
      }
      selection.removeAllRanges()
      setIsOpen(false)
    }
  }

  return (
    <div>
      <div
        className="break-all"
        role="presentation"
        contentEditable="true"
        suppressContentEditableWarning
        onSelect={handleSelection}
      >
        <p data-empty title="내용을 입력해주세요." />
      </div>
      {isOpen && (
        <div
          ref={outRef}
          className="flex rounded-xl border border-solid border-gray-100 shadow-md p-1 bg-white absolute"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div className="flex relative">
            <button
              type="button"
              className={`p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200 ${activeTab === 'size' ? 'bg-gray-200' : ''}`}
              onClick={() => {
                setIsOpenTextSize(true)
                setActive('size')
              }}
            >
              Title
            </button>
            {isOpenTextSize && (
              <div
                ref={outTextSizeRef}
                className="flex flex-col rounded-xl border border-solid border-gray-100 shadow-md p-1 bg-white absolute top-10 -left-1"
              >
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  onClick={() => handleStyleText('size', 'title')}
                >
                  Title
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  onClick={() => handleStyleText('size', 'subtitle')}
                >
                  SubTitle
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  onClick={() => handleStyleText('size', 'text')}
                >
                  Text
                </button>
              </div>
            )}
          </div>
          <div className="flex relative">
            <button
              type="button"
              className={`p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200 ${activeTab === 'size' ? 'bg-gray-200' : ''}`}
              aria-label="color"
              onClick={() => {
                setIsOpenTextColor(true)
                setActive('color')
              }}
            >
              <AiOutlineFontColors size={16} />
            </button>
            {isOpenTextColor && (
              <div
                ref={outTextColorRef}
                className="flex rounded-xl border border-solid border-gray-100 shadow-md p-1 bg-white absolute top-10 -left-1"
              >
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="black"
                  onClick={() => handleStyleText('color', 'black')}
                >
                  <div className="w-4 h-4 rounded-full bg-black" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="gray"
                  onClick={() => handleStyleText('color', 'gray')}
                >
                  <div className="w-4 h-4 rounded-full bg-gray-500" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="red"
                  onClick={() => handleStyleText('color', 'red')}
                >
                  <div className="w-4 h-4 rounded-full bg-rose-500" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="orange"
                  onClick={() => handleStyleText('color', 'orange')}
                >
                  <div className="w-4 h-4 rounded-full bg-orange-500" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="yellow"
                  onClick={() => handleStyleText('color', 'yellow')}
                >
                  <div className="w-4 h-4 rounded-full bg-yellow-400" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="green"
                  onClick={() => handleStyleText('color', 'green')}
                >
                  <div className="w-4 h-4 rounded-full bg-lime-500" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="blue"
                  onClick={() => handleStyleText('color', 'blue')}
                >
                  <div className="w-4 h-4 rounded-full bg-indigo-500" />
                </button>
                <button
                  type="button"
                  className="text-left p-1 rounded-lg hover:bg-gray-200"
                  aria-label="purple"
                  onClick={() => handleStyleText('color', 'purple')}
                >
                  <div className="w-4 h-4 rounded-full bg-violet-500" />
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200"
            aria-label="bold"
            onClick={() => handleStyleText('bold')}
          >
            <AiOutlineBold size={16} />
          </button>
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200"
            aria-label="italic"
            onClick={() => handleStyleText('italic')}
          >
            <AiOutlineItalic size={16} />
          </button>
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200"
            aria-label="underline"
            onClick={() => handleStyleText('underline')}
          >
            <AiOutlineUnderline size={16} />
          </button>
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200"
            aria-label="strike"
            onClick={() => handleStyleText('strike')}
          >
            <AiOutlineStrikethrough size={16} />
          </button>
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200"
            aria-label="unordered"
            onClick={() => handleStyleText('unordered')}
          >
            <AiOutlineUnorderedList size={16} />
          </button>
          <button
            type="button"
            className="p-1 rounded-lg hover:bg-gray-200"
            aria-label="ordered"
            onClick={() => handleStyleText('ordered')}
          >
            <AiOutlineOrderedList size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default TextToolbar
