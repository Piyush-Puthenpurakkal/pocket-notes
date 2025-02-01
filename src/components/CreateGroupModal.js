import React, { useState, useRef, useEffect } from "react";

const COLORS = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const CreateGroupModal = ({ onClose, onCreate }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.length < 2) {
      alert("Group name must be at least 2 characters long");
      return;
    }
    onCreate(groupName, selectedColor);
  };

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <h2 className="modal-header">Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="group-name">
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="add-group-name"
              placeholder="Enter group name"
            />
          </div>

          <div className="color-picker">
            <label className="choose-color">Choose color</label>
            {COLORS.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`color-circle ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="modal-buttons">
            <button type="submit" className="modal-button">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
