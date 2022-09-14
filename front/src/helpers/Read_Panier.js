import axios from 'axios';

const Read_Panier = (Link, id_user, setData, token) => {
    axios.get(process.env.React_App_API_LINK + Link + id_user, { headers: { Authorization: token} })
        .then(resp => {
            setData(resp.data)
        })
        .catch((err) => {
            console.log(err);
        });
};

export default Read_Panier;