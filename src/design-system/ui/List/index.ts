import { List } from "./List";
import { ListItem } from "./ListItem";

export type ListWithItem = typeof List & {
  Item: typeof ListItem;
};

const ListWithItem = List as ListWithItem;
ListWithItem.Item = ListItem;

export { ListWithItem as List };
