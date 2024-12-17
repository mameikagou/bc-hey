import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";


function DraggableItem() {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "draggable-item",
    });

    const style = {
        backgroundColor: "#f17302",
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    };

    return (
        <div className="h-[200px]  flex justify-center">
            <div
                ref={setNodeRef}
                className="w-[200px] h-[200px] rounded-lg leading-[200px] text-center"
                style={style}
                {...attributes}
                {...listeners}
            >
                Drag me
            </div>
        </div>
    );
}
function DroppableArea({ id, content }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        backgroundColor: isOver ? "lightgreen" : "lightgray",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="min-w-[200px] h-[200px] rounded-lg leading-[200px] text-center"
        >
            {content}
        </div>
    );
}

export default function Distribute() {
    const [items, setItems] = useState([
        { id: 1, name: "1", address: null },
        { id: 2, name: "2", address: null },
        { id: 3, name: "3", address: null },
    ]);
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over) {
            console.log(`Dragged ${active.id} to ${over.id}`);
            // 在这里处理拖放结束事件，例如更新状态或执行其他操作
        }
    };
    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                <DraggableItem />
                <div className="flex justify-center items-center h-auto gap-5">
                    {items.map((item, key) => {
                        return (
                            <DroppableArea
                                key={key}
                                id={item.id}
                                content={item.name}
                            />
                        );
                    })}
                </div>
            </DndContext>
        </>
    );
}
