import Folder from "@spectrum-icons/illustrations/Folder";
import {
  useListData,
  useDragAndDrop,
  Text,
  ListView,
  Item
} from "@adobe/react-spectrum";

export default function DroppableList() {
  let list = useListData({
    initialItems: [
      { id: "f", type: "file", name: "Adobe AfterEffects" },
      { id: "g", type: "file", name: "Adobe Illustrator" },
      { id: "h", type: "file", name: "Adobe Lightroom" },
      { id: "i", type: "file", name: "Adobe Premiere Pro" },
      { id: "j", type: "file", name: "Adobe Fresco" },
      { id: "k", type: "folder", name: "Apps", childNodes: [] }
    ]
  });

  let { dragAndDropHooks } = useDragAndDrop({
    acceptedDragTypes: ["adobe-app"],
    shouldAcceptItemDrop: (target) => !!list.getItem(target.key).childNodes,
    onInsert: async (e) => {
      let { items, target } = e;
      let processedItems = await Promise.all(
        items.map(async (item) => JSON.parse(await item.getText("adobe-app")))
      );

      if (target.dropPosition === "before") {
        list.insertBefore(target.key, ...processedItems);
      } else if (target.dropPosition === "after") {
        list.insertAfter(target.key, ...processedItems);
      }
    },
    onItemDrop: async (e) => {
      let { items, target } = e;
      let processedItems = await Promise.all(
        items.map(async (item) => JSON.parse(await item.getText("adobe-app")))
      );
      let targetItem = list.getItem(target.key);
      list.update(target.key, {
        ...targetItem,
        childNodes: [...targetItem.childNodes, ...processedItems]
      });
    }
  });

  return (
    <ListView
      aria-label="Droppable list view example"
      width="size-3600"
      height="size-3600"
      selectionMode="multiple"
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => (
        <Item textValue={item.name} hasChildItems={item.type === "folder"}>
          {item.type === "folder" && <Folder />}
          <Text>{item.name}</Text>
          {item.type === "folder" && (
            <Text slot="description">{`contains ${item.childNodes.length} dropped item(s)`}</Text>
          )}
        </Item>
      )}
    </ListView>
  );
}
