---
to: src/<%= path %>/<%= name %>/<%= name %>.tsx
---
type <%= name %>Props = {
  children: React.ReactNode;
};

export const <%= name %>: React.FC<<%= name %>Props> = ({ children }) => {
  return <div>{children}</div>;
};
