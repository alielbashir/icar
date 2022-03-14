import { DefaultPalette, IStackItemStyles, StackItem } from "@fluentui/react";

const stackHeaderStyles: IStackItemStyles = {
  root: {
    alignItems: "center",
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: "flex",
    height: 50,
    justifyContent: "center",
    fontFamily: "monospace",
    fontSize: "40px",
    fontWeight: "bold",
  },
};

interface SidebarHeaderProps {
  title: string;
}
const SidebarHeader = ({ title }: SidebarHeaderProps) => {
  return <StackItem styles={stackHeaderStyles}>{title}</StackItem>;
};

export default SidebarHeader;
