import axios from "axios";

const crudUpdate = (Link, id, Data) => {
    axios
    .put(process.env.React_App_API_LINK + Link+ "/" +id, Data)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default crudUpdate;