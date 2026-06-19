import { useState } from "react";
import FileAndFolder from "./FileAndFolder";
import './styles.css'

const initialData = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [{ id: 2, name: "index.html", isFolder: false }],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      { id: 4, name: "App.js", isFolder: false },
      { id: 5, name: "index.js", isFolder: false },
    ],
  },
  { id: 6, name: "package.json", isFolder: false },
];

export default function FileExplorer() {
  const [data, setData] = useState(initialData);
  const [idCounter, setIdCounter] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ parentId: null, isFolder: false });
  const [inputValue, setInputValue] = useState("");

  const openModal = (parentId, isFolder) => {
    setModalInfo({ parentId, isFolder });
    setInputValue("");
    setShowModal(true);
  };
  const onRemove = (id) => {
    const deleteNode = (nodes) => (
      nodes.filter((node) => node.id !== id).map((node) => node.children ? { ...node, children: deleteNode(node.children) } : node)
    )
    setData(deleteNode(data));

  };

  const handleModalSubmit = () => {
    const { parentId, isFolder } = modalInfo;
    const name = inputValue.trim();
    if (!name) return;

    const newItem = {
      id: idCounter, name, isFolder, ...(isFolder ? { children: [] } : {})
    };

    const updateTree = (nodes) => nodes.map((node) => {
      if (node.id === parentId && node.isFolder) {
        return { ...node, children: [...(node.children || []), newItem] };
      }
      else if (node.children) {
        return { ...node, children: updateTree(node.children) }

      }
      return node;
    });

    setData(updateTree(data));
    setIdCounter((prev) => prev + 1);
    setShowModal(false);

  };

  return (
    <div>
      <h2>File Explorer</h2>
      <FileAndFolder data={data}
        onAdd={openModal}
        onRemove={onRemove} />
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Enter {modalInfo.isFolder ? "folder" : "file"} name</h3>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
            <div>
              <button onClick={handleModalSubmit} data-testid="add">Add</button>
              <button onClick={() => setShowModal(false)} data-testid="cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
