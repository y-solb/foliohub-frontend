import { BlockNoteEditor } from '@blocknote/core'
import {
  BlockNoteView,
  Theme,
  useBlockNote,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
} from '@blocknote/react'
import '@blocknote/react/style.css'

const defaultTheme = {
  colors: {
    editor: {
      text: '#000',
      background: '#fff',
    },
    menu: {
      text: '#000',
      background: '#fff',
    },
    tooltip: {
      text: '#fff',
      background: '#333',
    },
    hovered: {
      text: '#000',
      background: '#e5e7eb',
    },
    selected: {
      text: '#000',
      background: '#e5e7eb',
    },
    disabled: {
      display: 'none',
    },
    shadow: '#e5e7eb',
    border: '#f3f4f6',
    highlights: {
      gray: {
        text: '#6B7280',
        background: '#6B7280',
      },
      red: {
        text: '#EF4444',
        background: '#EF4444',
      },
      orange: {
        text: '#F97316',
        background: '#F97316',
      },
      yellow: {
        text: '#FACC15',
        background: '#FACC15',
      },
      green: {
        text: '#84CC16',
        background: '#84CC16',
      },
      blue: {
        text: '#6366F1',
        background: '#6366F1',
      },
      purple: {
        text: '#8B5CF6',
        background: '#8B5CF6',
      },
      pink: {
        text: '#EC4899',
        background: '#EC4899',
      },
    },
  },
  borderRadius: 12,
  fontFamily: 'Helvetica Neue, sans-serif', // TODO: 추후 변경
} as Theme

interface TextEditorProps {
  content: string
}

function TextEditor({ content }: TextEditorProps) {
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: content ? JSON.parse(content) : undefined,
    onEditorContentChange: (edeitor) => {
      console.log('edeitor', edeitor.topLevelBlocks)
    },
    defaultStyles: false,
  })

  return (
    <BlockNoteView editor={editor} theme={defaultTheme}>
      <FormattingToolbarPositioner editor={editor} />
      <HyperlinkToolbarPositioner editor={editor} />
    </BlockNoteView>
  )
}

export default TextEditor
