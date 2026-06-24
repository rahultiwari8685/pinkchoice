import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import ImageTool from '@editorjs/image'
import Embed from '@editorjs/embed'
import LinkTool from '@editorjs/link'
import Paragraph from '@editorjs/paragraph'

const EditorJSComponent = ({ data, onChange }) => {
  const editorRef = useRef(null)

  // Create Editor
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      data: data || { blocks: [] },

      tools: {
        paragraph: Paragraph,

        header: {
          class: Header,
          inlineToolbar: true,
        },

        list: {
          class: List,
          inlineToolbar: true,
        },

        quote: Quote,

        embed: Embed,

        linkTool: LinkTool,

        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                return new Promise((resolve) => {
                  const url = URL.createObjectURL(file)

                  resolve({
                    success: 1,
                    file: {
                      url,
                    },
                  })
                })
              },
            },
          },
        },
      },

      async onChange() {
        const output = await editor.save()
        onChange(output)
      },
    })

    editorRef.current = editor

    return () => {
      editor.destroy()
    }
  }, [])

  // Update editor when data changes
  useEffect(() => {
    if (editorRef.current && data && Object.keys(data).length > 0) {
      editorRef.current.isReady.then(() => {
        editorRef.current.render(data)
      })
    }
  }, [data])

  return <div id="editorjs" className="border rounded p-2" style={{ minHeight: 250 }} />
}

export default EditorJSComponent
