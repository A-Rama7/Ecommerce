import axios from 'axios';

const crudRead = (Link, setData) => {
    axios.get(process.env.React_App_API_LINK+Link)
    .then(resp => {
        setData(resp.data)
    });
};

export default crudRead;