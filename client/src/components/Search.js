import './Search.css';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import BrowseCards from './BrowseCards';

function Search() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    axios
      .post('/api/user/search', { filter: projectName })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit() {
    axios
      .post('/api/user/search', { filter: projectName })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Form
        className='search-box'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Form.Group>
          <Form.Control
            className='search'
            autoFocus
            type='text'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>
        <Button className='search-button' onClick={() => handleSubmit()}>
          Search
        </Button>
      </Form>
      <BrowseCards projects={projects} />
    </>
  );
}

export default Search;
