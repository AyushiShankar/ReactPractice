import { MdExpandLess, MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";

const FileAndFolder = ({ data, onRemove, onAdd }) => {
  const [collapsed, setCollapsed] = useState({})

  return (
    <div>
      {data?.map((node) => (
        <div key={node.id}>
          {node.isFolder
            ?
            (<>
              {collapsed[node.id] ? <MdExpandMore
                onClick={() =>
                  setCollapsed((prev) => ({
                    ...prev,
                    [node.id]: !prev[node.id],
                  }))
                } /> : <MdExpandLess
                onClick={() =>
                  setCollapsed((prev) => ({
                    ...prev,
                    [node.id]: !prev[node.id],
                  }))
                } />}
              <span>{node.name}</span>
              <FiFolderPlus onClick={() => onAdd(node.id, true)}
                data-testid={`add-folder-${node.id}`} />
              <AiOutlineFileAdd onClick={() => onAdd(node.id, false)} data-testid={`add-file-${node.id}`} />
              <MdDeleteOutline onClick={() => onRemove(node.id)} data-testid="delete" />
              {!collapsed[node.id] && node.children && <FileAndFolder data={node.children} onAdd={onAdd} onRemove={onRemove} />}
            </>)
            :
            (
              <>
                <span>{node.name}</span>
                <MdDeleteOutline onClick={() => onRemove(node.id)} data-testid="delete" />
              </>
            )
          }

        </div>

      ))
      }
    </div >
  );
};

export default FileAndFolder;
