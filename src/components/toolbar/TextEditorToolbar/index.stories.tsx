import type { Meta, StoryObj } from '@storybook/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import TextEditorToolbar from '.'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: {
    container: '#toolbar',
  },
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'background',
  'list',
  'bullet',
  'link',
  'color',
]

const meta: Meta<typeof TextEditorToolbar> = {
  title: 'Toolbar/TextEditorToolbar',
  component: TextEditorToolbar,
  parameters: {
    docs: {
      subtitle:
        'TextEditorToolbar는 Toolbar에서 사용되는 TextEditor 컴포넌트입니다.',
    },
  },
  decorators: [
    (Story) => {
      const [value, setValue] = useState('content')

      return (
        <div
          style={{
            position: 'relative',
          }}
        >
          <ReactQuill
            id="textEditor"
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="내용을 입력해 주세요."
            formats={formats}
          />
          <Story />
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof TextEditorToolbar>

export const Default: Story = {}
