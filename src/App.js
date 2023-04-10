import React from "react";
import { Provider, defaultTheme, Flex } from "@adobe/react-spectrum";
import "./styles.css";
import DraggableList from "./DraggableList";
import DroppableList from "./DroppableList";

export default function App() {
  return (
    <Provider theme={defaultTheme} height="100%">
      <Flex direction="column" gap="size-200" alignItems="center">
        <DraggableList />
        <DroppableList />
        <input />
      </Flex>
    </Provider>
  );
}
