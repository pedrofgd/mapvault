import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useEditor } from '../contexts/editor';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'code-block'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block'
];

type Props = {
  defaultContent?: string
}

const Editor: React.FC<Props> = ({ defaultContent }) => {
  const { setContent } = useEditor()

  return (
    // Configuração do tamanho da fonte está em global.css
    <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      onChange={setContent}
      defaultValue={defaultContent}
    />
  );
}

export default Editor