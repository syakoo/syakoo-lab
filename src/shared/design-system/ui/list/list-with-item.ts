import { List } from "./list";
import { ListItem } from "./list-item";

export type ListWithItem = typeof List & {
  Item: typeof ListItem;
};

const ListWithItem = List as ListWithItem;
ListWithItem.Item = ListItem;

export { ListWithItem as List };
