import React, { useState, useEffect } from "react";
import "./App.css";
import HeyAlert from "./components/HeyAlert";
import List from "./components/List";

// Now we work on local storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isediting, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isediting) {
      setList(
        list.map((items) => {
          if (items.id === editId) {
            return { ...items, title: name };
          }
          return items;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Item updated successfully!");
    } else {
      showAlert(true, "success", "New item added successfully!");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // Remove button
  const removeButton = (id) => {
    showAlert(true, "danger", "Item deleted successfully");
    setList(list.filter((items) => items.id !== id));
  };

  // Edit button
  const EditButton = (id) => {
    const edit = list.find((items) => items.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(edit.title);
  };

  // Clear list
  const clearAll = () => {
    showAlert(true, "danger", "All items cleared successfully");
    setList([]);
  };

  return (
    <>
     <div className="min-h-screen bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 flex items-center justify-center py-10">
     <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {alert.show && (
              <HeyAlert {...alert} removeAlert={showAlert} list={list} />
            )}

            <h3 className="text-3xl font-semibold text-gray-800">Todo List App</h3>

            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Please enter your data"
                className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="w-full p-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-all">
                {isediting ? "Edit" : "Submit"}
              </button>
            </div>
          </form>

          {list.length > 0 && (
            <div className="mt-8 space-y-4">
              <List
                items={list}
                removeButton={removeButton}
                EditButton={EditButton}
              />
              <button
  className="w-full p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-red-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
  onClick={clearAll}
>
  Clear All
</button>

            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
