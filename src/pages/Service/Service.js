import React, { useContext, useEffect, useState } from "react";
import Read_Panier from "../../helpers/Read_Panier";
import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import ServiceCss from "./Service.css";
import CreditCardPaymentFrom from "../../components/BankCard/CreditCardPaymentForm";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { ChangeContext } from "../../Context/Change";

const cookies = new Cookies();


export default function Service() {
  const [anotherAddress, setAnotherAddress] = useState(null);

  const [val, setValue] = useState(null);

  const [service, setService] = useState(null);
  const { change, changeChange } = useContext(ChangeContext)

  const [amount, setAmount] = useState(0);
  const [decode, setdecode] = useState("");
  const [explVal, setexplVal] = useState("");
  const [token, settoken] = useState("");
  const [hide, setHide] = useState(false)

  let yourDate = new Date()

  // const testtt = () => {
  // console.log( typeof yourDate.toISOString().split('T')[0] );
  // }

  // const [Date, setDate] = useState("")

  const [Check, setCheck] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const Async = async () => {
      const token = cookies.get("user");
      // console.log(token);
      const decode = jwt(token);

      if (token) {
        // console.log(decode.id);
        await axios
          .get(process.env.React_App_API_LINK + "read/adresse/" + decode.id)
          .then((res) => {
            console.log(res);
            setAnotherAddress(res.data[1]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    Async();
  }, []);

  const Service = (e) => {
    e.preventDefault();
    // console.log(val);
    if (val) {
      const token = cookies.get("user");
      const decode = jwt(token);
      // console.log();
      axios
        .post(process.env.React_App_API_LINK + "read/service", {
          AddressId: val,
          UserId: decode.id,
          Headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setService(res.data);
          console.log(res.data[2]);
          // setDate(res.data[2])
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // console.log(service)
  const Commande = (e) => {
    e.preventDefault();

    let val = e.target.value;

    const explVal = val.split("/");
    const token = cookies.get("user");
    const decode = jwt(token);

    if (val && service) {


      setdecode(decode);
      setexplVal(explVal);
      settoken(token);
      setAmount(parseFloat(explVal[0]) + parseFloat(service[1]));
      setHide(true)
      setCheck(true)

    }
  };


  // console.log(amount);
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
      
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
              console.log("payment good !");

              axios
                .post(
                  process.env.React_App_API_LINK + "/create_order",

                  {
                    userId: decode.id,
                    price: explVal[0],
                    service: explVal[1],
                    total: service[1],
                    date:  yourDate.toISOString().split('T')[0],
                    Headers: { token: token },
                  }
                )
                .then((res) => {
                  if (res.data === "done") {
                    axios
                      .delete(
                        process.env.React_App_API_LINK +
                        "delete/order/" +
                        decode.id
                      )
                      .then((res) => {
                        console.log(res);
                        if (res.data === "delete successfull") {
                          changeChange(change + 1)
                          navigate("/MakeMyKeyboard/Order")
                        }

                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="Service_top">
        {anotherAddress ? (
          <>
            <form onClick={Service}>
              <select onChange={(e) => setValue(e.target.value)}>
                <option value="">Séléctionner une adresse</option>
                {anotherAddress.map((res, key) => {
                  return (
                    <option key={key} value={res.id}>
                      {res.street + " " + res.city + " " + res.state}
                    </option>
                  );
                })}
              </select>
              <button>Submit</button>
              {/* <button onClick={testtt}> AIZJENRAPOEIZRNAZEPRUN</button> */}
            </form>
          </>
        ) : null}
      </div>
      <div className="Service_res">
        {service
          ? service[0].map((tab, key) => {
            return (
              <div key={key} className={hide ? "hide" : "Service_response"}>
                <button
                  value={tab.rate + "/" + tab.service}
                  onClick={Commande}
                >
                  {tab.service}<br /> <br />
                  Prix article : {service[1]} $ <br />
                  Prix service : {tab.rate} $ <br />
                  Total : {(parseFloat(service[1]) + parseFloat(tab.rate)).toFixed(2)} $
                </button>
              </div>
            );
          })
          : null}
      </div>
      {Check ? (
        <div className="Service_Paypal">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AUs2wJDVGwFggxUl4kKNtB8foZFBqmodo0Q5r6HstZ1NNKjY2889iLwwFpk8ftQU3TRiKWi6F3RQ4RhU",
              components: "buttons",
              currency: "USD",
            }}
          >
            <ButtonWrapper currency={currency} showSpinner={false} />
          </PayPalScriptProvider>
        </div>
      ) : null}
    </>
  );
}
