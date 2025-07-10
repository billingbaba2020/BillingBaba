import React, { useState, useEffect } from "react";
import CustomInput from "../components/customInput";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";
import Loader from "./Loader";

export default function AddInfo({ data, setData, uid = null }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [Mobile, setMobil] = useState("");

  const [Loading, setLoading] = useState(false);
  const addItemReq = async () => {
    setLoading(true);
    let dataa = {
      uid: uid ? uid : "",
      Name: name ? name : "",
      BusinessName: BusinessName ? BusinessName : "",
      email: email ? email : "",
      GSTIN: GSTIN ? GSTIN : "",
      Mobile: Mobile ? Mobile : "",
      Settings: [],
      Taxes: [
        { value: 0, name: "IGST@0%" },
        { value: 0, name: "GST@0%" },
        { value: 0.5, name: "IGST@0.25%" },
        { value: 0.5, name: "GST@0.25%" },
        { value: 3, name: "IGST@3%" },
        { value: 3, name: "GST@3%" },
        { value: 5, name: "IGST@5%" },
        { value: 5, name: "GST@5%" },
        { value: 12, name: "IGST@12%" },
        { value: 18, name: "IGST@18%" },
        { value: 18, name: "GST@18%" },
        { value: 28, name: "IGST@28%" },
        { value: 28, name: "GST @28%" },
      ],
      Units: [
        { name: "BAGS", shorthand: "Bag" },
        { name: "BOTTLES", shorthand: "Btl" },
        { name: "BOX", shorthand: "Box" },
        { name: "BUNDLES", shorthand: "Bdl" },
        { name: "CANS", shorthand: "Can" },
        { name: "CARTONS", shorthand: "Ctn" },
        { name: "DOZENS", shorthand: "Dzn" },
        { name: "GRAMMES", shorthand: "Gm" },
        { name: "KILOGRAMS", shorthand: "Kg" },
        { name: "LITRE", shorthand: "Ltr" },
        { name: "METERS", shorthand: "Mtr" },
        { name: "MILLILITRE", shorthand: "Ml" },
        { name: "NUMBERS", shorthand: "Nos" },
        { name: "PACKS", shorthand: "Pac" },
        { name: "PAIRS", shorthand: "Prs" },
        { name: "PIECES", shorthand: "Pcs" },
        { name: "QUINTAL", shorthand: "Qtl" },
        { name: "ROLLS", shorthand: "Rol" },
        { name: "SQUARE FEET", shorthand: "Sqf" },
        { name: "SQUARE METERS", shorthand: "Sqm" },
        { name: "TABLETS", shorthand: "Tbs" },
      ],
    };
    console.log(dataa);
    let url = dev_url + "addinfo";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: uid, // Modify this if necessary
      },
      body: JSON.stringify(dataa),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("addInfo: ", data);
        setLoading(false);
        alert("done");
        navigate("", {replace: true}); // Navigate to home page after saving
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (data && data.name) {
      navigate("/");
    }
  }, [data, navigate]);

  if (Loading) return <Loader />;
  return (
    <div id="info">
      <h1>Add Your Busines Details info</h1>
      <CustomInput
        inputValue={BusinessName}
        setInputValue={setBusinessName}
        placeholder={"Business Name"}
      />
      <CustomInput
        inputValue={name}
        setInputValue={setName}
        placeholder={"Your Name"}
      />
      <CustomInput
        inputValue={GSTIN}
        setInputValue={setGSTIN}
        placeholder={"GSTIN"}
      />
      <CustomInput
        inputValue={Mobile}
        setInputValue={setMobil}
        placeholder={"Phone No"}
      />
      <CustomInput
        inputValue={email}
        setInputValue={setEmail}
        placeholder={"Email ID"}
      />
      <button onClick={() => addItemReq()}>Save</button>
    </div>
  );
}
