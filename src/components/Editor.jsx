import './Editor.css'
import { useEffect, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
// import { dracula } from '@uiw/codemirror-theme-dracula'
// import { bbedit } from '@uiw/codemirror-theme-bbedit'

export const Editor = () => {
  const iframeRef = useRef(null)

  const [htmlCode, setHtmlCode] = useState('<h1>jaen</h1>')
  const [cssCode, setCssCode] = useState('h1 { color: blue; }')
  const [jsCode, setJsCode] = useState('console.log(\'hello world!\');')

  /* ACTUALIZAR EL IFRAME */
  useEffect(() => {
    const iframeDocument = iframeRef.current.contentDocument
    iframeDocument.open()
    iframeDocument.write(
      `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
      `,
    )
    iframeDocument.close()
  }, [htmlCode, cssCode, jsCode])

  return (
    <div className='editor'>
      <div className='editor__container-editors'>
        <div>
          <h2 className='editor__names'>HTML</h2>
          <CodeMirror
            className='editor__editor-code'
            value={htmlCode}
            height='250px'
            extensions={html()}
            onChange={(value) => setHtmlCode(value)}
          />
        </div>
        <div>
          <h2 className='editor__names'>CSS</h2>
          <CodeMirror
            className='editor__editor-code'
            value={cssCode}
            height='250px'
            extensions={css()}
            onChange={(value) => setCssCode(value)}
          />
        </div>
        <div>
          <h2 className='editor__names'>JavaScript</h2>
          <CodeMirror
            className='editor__editor-code'
            value={jsCode}
            height='250px'
            extensions={javascript()}
            onChange={(value) => setJsCode(value)}
          />
        </div>
      </div>
      <div className='editor__container-iframe'>
        <h2 className='editor__names'>Output</h2>
        <iframe ref={iframeRef} title='Result' className='result-iframe' />
      </div>
    </div>
  )
}
