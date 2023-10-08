import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CloseButton, InputBase, Paper, Text } from "@mantine/core";
import { useState } from "react";
import "./users.css";

interface User {
  id: string;
  name: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState("");
  const addUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: inputValue,
    };
    setInputValue("");
    setUsers((users) => [...users, newUser]);
  };

  const handleRemove = (id: string) => {
    console.log("in here");
    console.log(id);
    console.log(users);
    setUsers((users) => users.filter((user) => user.id !== id));
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setUsers((users) => {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      return arrayMove(users, oldIndex, newIndex);
    });
  };

  const SortableUser = ({ user }: { user: User }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: user.id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Paper shadow="xs" radius="xl" p="xl">
          <Text>Paper is the most basic ui component</Text>
          <Text>
            Use it to create cards, dropdowns, modals and other components that
            require background with shadow
          </Text>
          <CloseButton onClick={() => console.log("hello")} />
        </Paper>
      </div>
    );
  };

  return (
    <div className="users">
      <div>Total: {users.length}</div>
      <div className="users-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addUser}>Add user</button>
      </div>

      <div>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <InputBase component="div" multiline>
            <SortableContext
              items={users}
              strategy={verticalListSortingStrategy}
            >
              {users.map((user) => (
                <SortableUser key={user.id} user={user} />
              ))}
            </SortableContext>
          </InputBase>
        </DndContext>
      </div>
    </div>
  );
};
export default Users;
