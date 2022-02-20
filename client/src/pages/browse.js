import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BrowseCards from '../components/BrowseCards';
import './browse.css';

function Browse() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('/user/get-projects')
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowseCards projects={projects} />
  );
}

export default Browse;