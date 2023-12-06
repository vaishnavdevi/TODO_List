import React from 'react';
import ItemsList from './ItemsList';
import '../style.css';

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemsList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p>List is empty....</p>
      )}
    </main>
  );
};
export default Content;
