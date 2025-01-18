import React from "react";

const Sidebar = ({ groups, selectedGroup, onGroupSelect, onCreateClick }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Pocket Notes</div>
      <div>
        {groups.map((group) => (
          <div
            key={group.id}
            className={`sidebar-group ${
              selectedGroup?.id === group.id ? "selected-group" : ""
            }`}
            onClick={() => onGroupSelect(group)}
          >
            <div
              className="group-circle"
              style={{ backgroundColor: group.color }}
            >
              {group.initials}
            </div>
            <span>{group.name}</span>
          </div>
        ))}
      </div>
      <button className="create-group-btn" onClick={onCreateClick}>
        +
      </button>
    </div>
  );
};

export default Sidebar;
