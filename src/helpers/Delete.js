import axios from "axios";

const crudDelete = (Link, id) => {
    axios
    .delete(process.env.React_App_API_LINK + Link+ "/" +id)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default crudDelete;