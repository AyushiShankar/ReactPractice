import React, { useState } from "react";
import "./styles.css";

function TreeNode({
  node,
  selectedIds,
  toggleCheckbox,
  toggleFolder,
  expandedIds,
}) {
  const isFolder = node.type === "folder";
  const isExpanded = expandedIds.has(node.id);

  return (
    <div className={`node ${node.type}`} data-testid={`node-${node.id}`}>
      <div className="node-content">
        {isFolder && (
          <button
            onClick={() => toggleFolder(node.id)}
            data-testid={`toggle-${node.id}`}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}
        <input
          type="checkbox"
          checked={selectedIds.has(node.id)}
          onChange={() => toggleCheckbox(node, !selectedIds.has(node.id))}
          data-testid={`checkbox-${node.id}`}
        />
        <span>{node.name}</span>
      </div>
      {isFolder && isExpanded && node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              toggleCheckbox={toggleCheckbox}
              toggleFolder={toggleFolder}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeNavigation({ tree }) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedIds, setExpandedIds] = useState(new Set(["1"]));

  const toggleFolder = (id) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) newSet.delete(id);
      else
        newSet.add(id);
      return newSet;
    });
  };

  const toggleCheckbox = (node, checked) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);

      // ✅ update children
      const updateChildren = (node, ids, checked) => {
        if (checked) ids.add(node.id);
        else ids.delete(node.id);

        if (node.children) {
          node.children.forEach((child) =>
            updateChildren(child, ids, checked)
          );
        }
      };

      // ✅ find parent
      const findParent = (id, nodes) => {
        for (const n of nodes) {
          if (n.children?.some((child) => child.id === id)) {
            return n;
          }
          if (n.children) {
            const found = findParent(id, n.children);
            if (found) return found;
          }
        }
        return null;
      };

      // ✅ update parents
      const updateParents = (nodeId, tree, ids) => {
        let currentId = nodeId;

        while (currentId) {
          const parent = findParent(currentId, tree);

          if (!parent) break;

          const allChecked = parent.children.every((child) =>
            ids.has(child.id)
          );

          if (allChecked) ids.add(parent.id);
          else ids.delete(parent.id);

          currentId = parent.id;
        }
      };

      // 🔁 execution order matters
      updateChildren(node, newSet, checked);
      updateParents(node.id, tree, newSet);

      return newSet;
    });
  };

  return (
    <div className="tree-container" data-testid="tree-container">
      <h1>Folder Navigation</h1>
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          toggleCheckbox={toggleCheckbox}
          toggleFolder={toggleFolder}
          expandedIds={expandedIds}
        />
      ))}
    </div>
  );
}

export default TreeNavigation;
