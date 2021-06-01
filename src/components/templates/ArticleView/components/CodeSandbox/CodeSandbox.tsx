import React from 'react'

// ___________
//
type CodeSandboxProps = {
  src: string
  title?: string
}

// ___________
//
const CodeSandbox: React.VFC<CodeSandboxProps> = ({ src, title }) => {
  return (
    <iframe
      src={`${src}?fontsize=14&hidenavigation=1&theme=dark&view=preview`}
      style={{
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        border: 'none',
        borderRadius: '5px',
      }}
      title={title}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  )
}

export default CodeSandbox
