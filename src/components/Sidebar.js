import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ groups, selectedGroup, onGroupSelect, onCreateClick }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="hamburger-btn"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">Pocket Notes</div>
        <div>
          {groups.map((group) => (
            <div
              key={group.id}
              className={`sidebar-group ${
                selectedGroup?.id === group.id ? "active-chat" : ""
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
    </>
  );
};

export default Sidebar;
