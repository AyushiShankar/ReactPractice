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