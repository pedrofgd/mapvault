import '../styles/globals.css'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import EditorProvider from '../contexts/editor'
import NoteProvider from '../contexts/note';
import ViewProvider from '../contexts/view';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ViewProvider>
      <NoteProvider>
        <EditorProvider>
          <Head>
            <title>Map Vault</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          
          <Component {...pageProps} />
        </EditorProvider>
      </NoteProvider>
    </ViewProvider>
  )
}
