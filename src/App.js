import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import AddItem from './components/AddItem';
import SearchItem from './components/SearchItem';

export function App2() {
  const API_URL =
    'https://jsonserverxgbgx6-o0gm--3000--e809191e.local-corp.webcontainer.io/items';
  const [items, setItems] = useState(
    /* [
      {
        id: 1,
        checked: true,
        work: 'Programming code',
      },
      {
        id: 2,
        checked: false,
        work: 'Learning',
      },
      {
        id: 3,
        checked: false,
        work: 'Testing',
      },
    ]*/
    []
  );

  const [newItem, setnewItem] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // JSON.parse(localStorage.getItem('todo_list'));
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(response);
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
      } catch (err) {
        console.log(err.stack);
      }
    };
    (async () => await fetchItems())();
  }, []);

  const addItem = (work) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addnewItem = { id, checked: false, work };
    const listItems = [...items, addnewItem];
    console.log(listItems);
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
    listItems;
  };

  const handleCheck = (id) => {
    //console.log(`id:${id}`);

    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
    listItems;
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newItem);
    addItem(newItem);
    setnewItem('');
  };

  return (
    <>
      <Header />
      <AddItem
        newItem={newItem}
        setnewItem={setnewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((items) =>
          items.work.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <Footer length={items.length} />
    </>
    /*
    //const [count, setCount] = useState(0);
    <>
      <span>{count}</span>
      <button onClick={() => setCount((pre) => pre + 1)}>Increment</button>
      <button onClick={() => setCount((pre) => pre - 1)}>Minus</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
    */
  );
}

export default class App extends React.Component {
  state = { counters: [] };
  handleAddCounter = () => {
    const { counters } = this.state;
    counters.length === 0
      ? this.setState({ counters: [1] })
      : this.setState({
          counters: [...counters, counters[counters.length - 1] + 1],
        });
  };
  render() {
    return (
      <>
        <button onClick={this.handleAddCounter}>Add Counter</button>
        {this.state.counters.map((counter, index) => (
          <Counter id={index} />
        ))}
      </>
    );
  }

  // formatCount() {
  //   const { count } = this.state;
  //   return count === 0 ? 'Zero' : count;
  // }
}
console.log(`Hello Node.js v${process.versions.node}!`);
