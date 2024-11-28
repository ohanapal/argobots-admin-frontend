import { Label } from '@/components/ui/label'
import { BOT_URL } from '@/configs'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import MarkdownRenderer from '../form/markdown-renderer'

interface Props {
  label: string
  slug: string
  size: 'full' | 'small' | 'adform'
  note?: string
}

export default function EmbeddingWidget({ label, slug, size, note }: Props) {
  const url = `${BOT_URL}/${slug}`

  // Define the iframe styles based on the type of embedding
  const iframeStyle =
    size === 'small'
      ? 'position:fixed;bottom:20px;right:20px;width:350px;height:500px;z-index:1000;border-radius:10px;box-shadow:0px 0px 10px rgba(0,0,0,0.3);'
      : 'position:absolute;top:0;left:0;width:100%;height:100vh;'

  const code: string = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${
      size === 'adform'
        ? `<!-- Adform Tracking Script -->
    <script type="text/javascript">
        (function() {
            var script = document.createElement('script');
            script.src = 'https://track.adform.net/serving/scripts/trackpoint/async/';
            document.head.appendChild(script);
        })();
    </script>`
        : ''
    }
    <style>
      body {
        overflow: hidden;
        width: 100%;
        margin-left: 0px;
        margin-top: 0px;
      }
    </style>
  </head>
  <body>
    <div>
      <div style="position:relative;padding-top:56.25%;">
        <iframe src="${url}" frameborder="0" allowfullscreen="" style="${iframeStyle}" allow="camera; microphone"></iframe>
      </div>
    </div>
    <script>
      navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    </script>
    ${
      size === 'adform'
        ? `<script type="text/javascript">
      function handleClick() {
          var clickTag = "https://your-click-url.com";
          window.open(clickTag, "_blank");
      }
    </script>`
        : ''
    }
   </body>
</html>
`

  return (
    <div className='mb-6'>
      <Label className='text-text-primary text-base font-medium inline-block mb-3'>{label}</Label>
      {note && <p className='text-text-gray text-[15px] italic pb-3 font-medium'>{note}</p>}
      <div className='relative max-w-4xl'>
        <MarkdownRenderer className='markdown text-sm max-w-full w-full'>{`\`\`\`html\n${code}\n\`\`\``}</MarkdownRenderer>
        <Copy
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer'
          size={20}
          onClick={() => {
            // Remove the ```html and ``` tags from the code before copying
            const cleanedCode = code.trim()

            navigator.clipboard
              .writeText(cleanedCode)
              .then(() => {
                toast.success('Code copied to clipboard!')
              })
              .catch(err => {
                console.error('Failed to copy: ', err)
              })
          }}
        />
      </div>
    </div>
  )
}
