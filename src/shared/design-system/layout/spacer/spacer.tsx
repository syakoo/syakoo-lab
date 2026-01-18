import { type SpacerStyleVariants, spacerStyle } from "./spacer.styles";

type SpacerProps = SpacerStyleVariants;

export const Spacer: React.FC<SpacerProps> = (props) => {
  return <div aria-hidden className={spacerStyle(props)} />;
};
