import React from "react";

function List({ items, removeButton, EditButton }) {
  return (
    <div className="mx-10 my-5 p-6 bg-gray-100 rounded-lg shadow-lg">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105"
            key={id}
          >
            <p className="font-serif text-lg text-gray-700 font-bold">{title}</p>
            <div className="flex space-x-3">
              <button
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-colors"
                type="button"
                onClick={() => EditButton(id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors"
                type="button"
                onClick={() => removeButton(id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default List;
