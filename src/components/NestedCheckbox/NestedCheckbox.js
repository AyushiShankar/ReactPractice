import { useState } from "react";
import './styles.css'

const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      {
        id: 9, label: "Broccoli"
      },
    ],
  },
];


const Checkboxes = ({ data, toggleCheckbox, selectedIds }) => {
  return (
    <>
      {data.map((node) => (
        <div key={node.id} style={{ "paddingLeft": "20px" }}>
          <label>
            <input type="checkbox"
              onChange={() => toggleCheckbox(node, !selectedIds.has(node.id))}
              checked={selectedIds.has(node.id)} />
            <span>{node.label}</span>
          </label>
          {node.children && <Checkboxes data={node.children}
            toggleCheckbox={toggleCheckbox}
            selectedIds={selectedIds}
          />}
        </div>
      ))}

    </>);
};

export default function NestedCheckbox() {

  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleCheckbox = (node, checked) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);


      const updateChild = (node, ids, checked) => {
        if (checked) {
          ids.add(node.id)
        } else { ids.delete(node.id) };

        if (node.children) {
          node.children.forEach((child) =>
            updateChild(child, ids, checked));
        }

      };

      const findParent = (id, nodes) => {
        for (const n of nodes) {
          if (n.children?.some((child) =>
            child.id === id))
            return n;

          if (n.children) {
            const found = findParent(id, n.children);
            if (found) return found;
          }
        }
        return null;
      };

      const updateParent = (id, CheckboxesData, checked) => {
        let currentId = id;

        while (currentId) {

          const parent = findParent(currentId, CheckboxesData);

          if (!parent) break;
          const allChecked = parent.children.every((child) =>
            newSet.has(child.id)
          );

          if (allChecked) newSet.add(parent.id);
          else newSet.delete(parent.id);

          currentId = parent.id;
        }
      };

      updateChild(node, newSet, checked);
      updateParent(node.id, CheckboxesData, newSet);

      return newSet;

    }
    );
  };

  return (
    <div>
      <h2>Nested Checkbox</h2>
      <Checkboxes
        data={CheckboxesData}
        toggleCheckbox={toggleCheckbox}
        selectedIds={selectedIds}
      />
    </div>
  );
}
