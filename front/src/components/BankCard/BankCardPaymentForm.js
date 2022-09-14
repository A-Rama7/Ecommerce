import "./BankCardPaymentForm.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import axios from "axios";
const URL = process.env.REACT_APP_API_LINK;

export default function BankCardPaymentForm(props) {

  const { pay, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const { id } = props;
  const onSubmit = function(data) {
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    axios
    .get(URL+"/read/bank/card/"+{id})
    .then((res) => setData(res.data));
  }, []);
  
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={pay}
        placeholder="name"
        type="text"
        name="name"
      />
      <input
        ref={pay}
        placeholder="number"
        type="text"
        name="number"
      />
      <input
        ref={pay}
        placeholder="expiry_date"
        type="text"
        name="expiry_date"
      />
      <input
        ref={pay}
        placeholder="card_verification_value"
        type="text"
        name="card_verification_value"
      />
    </form>
  );

};

