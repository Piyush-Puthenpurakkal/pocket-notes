import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NotesArea from "./components/NotesArea";
import CreateGroupModal from "./components/CreateGroupModal";

const App = () => {
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleCreateGroup = (groupName, color) => {
    const initials = groupName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    if (
      groups.some(
        (group) => group.name.toLowerCase() === groupName.toLowerCase()
      )
    ) {
      alert("A group with this name already exists!");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: groupName,
      color,
      initials,
      notes: [],
    };

    setGroups([...groups, newGroup]);
    setSelectedGroup(newGroup);
    setShowModal(false);
  };

  const handleAddNote = (note) => {
    if (!selectedGroup) return;

    const formattedTimestamp = new Date()
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " ∙");

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          notes: [
            ...group.notes,
            {
              id: Date.now(),
              content: note,
              timestamp: formattedTimestamp,
              lastUpdated: formattedTimestamp,
            },
          ],
        };
      }
      return group;
    });

    setGroups(updatedGroups);

    const updatedSelectedGroup = updatedGroups.find(
      (group) => group.id === selectedGroup.id
    );
    setSelectedGroup(updatedSelectedGroup);
  };

  return (
    <div className="container">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onGroupSelect={setSelectedGroup}
        onCreateClick={() => setShowModal(true)}
      />

      <NotesArea selectedGroup={selectedGroup} onAddNote={handleAddNote} />

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default App;
