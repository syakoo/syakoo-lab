type CodeSandboxProps = {
  src: string;
  title?: string;
};

export const CodeSandbox: React.FC<CodeSandboxProps> = ({ src, title }) => {
  return (
    <iframe
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      src={`${src}?fontsize=14&hidenavigation=1&theme=dark&view=preview`}
      style={{
        width: "100%",
        height: "500px",
        overflow: "hidden",
        border: "none",
        borderRadius: "5px",
      }}
      title={title}
    />
  );
};
