import axios from "axios";

const crudCreate = (Link, Data) => {
    // console.log(Data);
    // console.log(Link);
    axios
        .post(process.env.React_App_API_LINK + Link, Data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

export default crudCreate;