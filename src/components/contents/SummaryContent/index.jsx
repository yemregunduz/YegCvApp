import cvData from '@/data/cv.json'
import JsonViewer from '@/libs/components/JsonViewer'

const { asciiLogo, terminal, ...rest } = cvData

const fileName = `${cvData.personal.name.replace(/\s+/g, '_')}.json`

export default function SummaryContent() {
  return (
    <JsonViewer
      data={rest}
      fileName={fileName}
      showCopyButton={true}
    />
  )
}