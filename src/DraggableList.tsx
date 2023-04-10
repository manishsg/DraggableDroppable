import React from "react";
import {
  Item,
  ListView,
  useListData,
  useDragAndDrop
} from "@adobe/react-spectrum";

export default function DraggableList() {
  let list = useListData({
    initialItems: [
      { id: "a", type: "file", name: "Adobe Photoshop" },
      { id: "b", type: "file", name: "Adobe XD" },
      { id: "c", type: "file", name: "Adobe Dreamweaver" },
      { id: "d", type: "file", name: "Adobe InDesign" },
      { id: "e", type: "file", name: "Adobe Connect" }
    ]
  });

  let { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => {
        let item = list.getItem(key);
        return {
          "adobe-app": JSON.stringify(item)
        };
      }),
    onDragEnd: (e) => {
      if (e.dropOperation === "move") {
        list.remove(...e.keys);
      }
    }
  });

  return (
    <ListView
      aria-label="Draggable list view example"
      width="size-3600"
      height="size-3600"
      selectionMode="multiple"
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => <Item textValue={item.name}>{item.name}</Item>}
    </ListView>
  );
}
