import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useMemo, useRef, useState, useEffect } from "react";
import { Form, Input, Modal } from "@arco-design/web-react";
import { ethers } from 'ethers';
import { ContractUtils } from '@bc-hey/contracts';

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
    const [form] = Form.useForm();
    const draggableElement = useRef<HTMLDivElement | null>(null);
    const [distributeId, setDistributeId] = useState<number>();
    const [contractUtils, setContractUtils] = useState<ContractUtils>();

    const [items, setItems] = useState([
        { id: 1, name: "tom", address: null },
        { id: 2, name: "jerry", address: null },
        { id: 3, name: "jack", address: null },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const deployedToken = Form.useWatch("deployedToken", form);

    useEffect(() => {
        const init = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const utils = new ContractUtils();
                await utils.connectWallet();
                setContractUtils(utils);
            }
        };
        init();
    }, []);

    function DraggableItem({ resetTransform }) {
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
                    ref={(node) => {
                        setNodeRef(node);
                        if (node) {
                            draggableElement.current = node; // 将DOM节点赋值给useRef
                        }
                    }}
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

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (over && over.id) {
            console.log(`Dragged ${active.id} to ${over.id}`);
            // 在这里处理拖放结束事件，例如更新状态或执行其他操作
            setModalVisible(true);
            setDistributeId(over.id);
        }
        
        if (over) {
            const userId = over.id;
            const user = items.find(u => u.id === userId);
            if (user && contractUtils) {
                try {
                    await contractUtils.allocateReward(
                        user.address, 
                        ethers.parseEther("100")
                    );
                    console.log(`Allocated to user ${userId}`);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
        resetTransform();
    };

    const resetTransform = () => {
        if (draggableElement.current) {
            draggableElement.current.style.transform = "translate3d(0, 0, 0)";
        }
    };

    const handleOk = () => {
        setModalVisible(false);
        console.log("deployedToken", deployedToken);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const distributeName = useMemo(() => {
        return items.find((item) => item.id === distributeId)?.name || "";
    }, [distributeId]);

    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex flex-col gap-5">
                    <DraggableItem resetTransform={resetTransform} />
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
                </div>
            </DndContext>
            <Form form={form}>
                <Modal
                    visible={modalVisible}
                    onOk={() => handleOk()}
                    onCancel={() => handleCancel()}
                >
                    <h3>将Token分发给{distributeName}</h3>

                    <h4>请输入数量</h4>
                    <Form.Item field="deployedToken">
                        <Input />
                    </Form.Item>
                </Modal>
            </Form>
        </>
    );
}
