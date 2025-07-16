import React, { useEffect, useState, useMemo } from "react";
import CustomInput from "../components/customInput";
import Undone from "../components/undone";
import { useNavigate } from "react-router-dom";
import dev_url from "../url";
import TextField from "@mui/material/TextField";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";
import ImageUploader from "../components/ImgUpload";
import { ToastContainer, toast } from 'react-toastify';
import { Autocomplete } from "@mui/material";
import { MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddItem({
  data,
  setData,
  t = true,
  change,
  setChange,
}) {
  const Navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [unitToggle, setUnitToggle] = useState(false);
  var [toggle, setToggle] = useState(t);
  var [page, setPage] = useState("pricing");
  var [itemName, setitemName] = useState();
  var [itemHSN, setitemHSN] = useState();
  var [itemCategory, setitemCategory] = useState();
  var [itemCode, setitemCode] = useState();
  var [sellPrice, setSellPrice] = useState();
  var [WholeSalePrice, setWholeSalePrice] = useState();
  var [MRP, setMRP] = useState();
  var [MRP_salePrice, setMRP_salePrice] = useState();
  var [MRP_wholeSalePrice, setMRP_wholeSalePrice] = useState();
  var [description, setdescription] = useState();
  var [discount, setDescount] = useState();
  var [purchaseprice, setPurchasePrice] = useState();
  var [tax, setTax] = useState(0);
  var [openingQuantity, setOpeningQuantity] = useState();
  var [atPrice, setAtPrice] = useState();
  var [asDate, setAsDate] = useState();
  var [minToMaintain, setMinToMaintain] = useState(10);
  var [Storagecapacity, setStoragecapacity] = useState();
  var [location, setLocation] = useState();
  var [primaryUnit, setprimaryUnit] = useState();
  var [SecondaryUnit, setSecondaryUnit] = useState();
  var [Conversion, setConversion] = useState();
  var [editUnits, setEditUnits] = useState({primary:"",secondary:"",conversion:""});
  var [ImageURL, setImageUrl] = useState();
  var [ImageList, setImageList] = useState();

  const [showPopup, setShowPopup] = useState(false);
  const [ImageList, setImageList] = useState([]);
  const [onlineStoreImages, setOnlineStoreImages] = useState([]);
  const [page, setPage] = useState("pricing");
  const [toggle, setToggle] = useState(t);
  const [showInOnlineStore, setShowInOnlineStore] = useState(false);

  // Combined form state
  const [formData, setFormData] = useState({
    itemName: '',
    itemHSN: '',
    itemCategory: '',
    itemCode: '',
    sellPrice: { value: '', withTax: true },
    WholeSalePrice: '',
    MRP: '',
    MRP_salePrice: '',
    MRP_wholeSalePrice: '',
    description: '',
    discount: '',
    purchaseprice: { value: '', withTax: true },
    tax: 0,
    openingQuantity: '',
    atPrice: '',
    asDate: null,
    minToMaintain: 10,
    Storagecapacity: '',
    location: '',
    primaryUnit: { name: '', done: false },
    SecondaryUnit: { name: '', done: false },
    Conversion: '',
    ImageURL: null
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState({
    purchasePriceExceedsMRP: false,
    wholesalePriceExceedsMRP: false,
    requiredFieldsMissing: true
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested object changes (like sellPrice, purchaseprice)
  const handleNestedChange = (parentField, childField, value) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  // Validate form whenever relevant fields change
  useEffect(() => {
    const errors = {
      purchasePriceExceedsMRP: false,
      wholesalePriceExceedsMRP: false,
      requiredFieldsMissing: true
    };

    // Check if purchase price exceeds MRP
    if (formData.MRP && formData.purchaseprice.value) {
      errors.purchasePriceExceedsMRP = parseFloat(formData.purchaseprice.value) > parseFloat(formData.MRP);
    }

    // Check if wholesale price exceeds MRP
    if (formData.MRP && formData.WholeSalePrice) {
      errors.wholesalePriceExceedsMRP = parseFloat(formData.WholeSalePrice) > parseFloat(formData.MRP);
    }

    // Check required fields
    errors.requiredFieldsMissing = !(
      formData.itemName && 
      formData.itemCode && 
      formData.sellPrice.value && 
      formData.discount !== '' && 
      formData.purchaseprice.value && 
      formData.tax !== '' && 
      formData.primaryUnit.name
    );

    setValidationErrors(errors);
  }, [
    formData.MRP, 
    formData.purchaseprice.value, 
    formData.WholeSalePrice,
    formData.itemName,
    formData.itemCode,
    formData.sellPrice.value,
    formData.discount,
    formData.purchaseprice.value,
    formData.tax,
    formData.primaryUnit.name
  ]);

  const params = new URLSearchParams(window.location.search);
  let urlPram = params.get("data");

  useEffect(() => {
    if (urlPram == "services") {
      setToggle(false);
    }
  }, [urlPram]);

  function generate13DigitNumberString() {
    let numberString = "";
    for (let i = 0; i < 13; i++) {
      numberString += Math.floor(Math.random() * 10).toString();
    }
    return numberString;
  }

  const generateurl = async (ItemNumber) => {
    setLoading(true);
    try {
      await fetch(dev_url + "generate-barcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: data.uid,
        },
        body: JSON.stringify({ itemNumber: ItemNumber }),
      })
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          handleInputChange('ImageURL', { url: res.url, code: ItemNumber });
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
        });
    } catch (error) {
      setLoading(false);
      alert("Unable to generate PDF");
      console.error("Error generating PDF:", error);
    }
  };

  const addItemReq = async (saveAndNew = false) => {
    if (validationErrors.purchasePriceExceedsMRP || 
        validationErrors.wholesalePriceExceedsMRP || 
        validationErrors.requiredFieldsMissing) {
      return;
  const addItemReq = async () => {

    if (sellPrice < discount) {
      alert("discount can't be more than sales price");
      // toast("discount can't be more than sales price", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   // transition: "Bounce",
      //   })
      return
    } else if (purchaseprice >= sellPrice - discount) {
      alert("purchase price more than sale price, please fix");
      // toast("purchase price more than sale price, please fix", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   // transition: "Bounce",
      //   })
      return
    } else if (MRP < purchaseprice) {
      alert("MRP more than purchase price, please fix");
    }
    if (
      !itemName ||
      !itemCode ||
      !sellPrice ||
      !discount ||
      !purchaseprice ||
      !tax ||
      !primaryUnit
      ) {
        alert("Please fill all the fields");
        // toast("Please fill all the fields", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   // transition: "Bounce",
        //   })
    }

    setLoading(true);
    let newData;
    if (toggle) {
      newData = {
        Name: formData.itemName,
        HSN: formData.itemHSN,
        Category: formData.itemCategory,
        Code: formData.itemCode,
        wholeSalePrice: formData.WholeSalePrice,
        description: formData.description,
        primaryUnit: formData.primaryUnit,
        secondaryUnit: formData.SecondaryUnit,
        convertion: formData.Conversion,
        unit: formData.primaryUnit,
        salesPrice: formData.sellPrice.withTax
          ? formData.sellPrice.value * (1 - formData.tax)
          : formData.sellPrice.value,
        discount: formData.discount,
        purchasePrice: formData.purchaseprice.withTax
          ? formData.purchaseprice.value * (1 - formData.tax)
          : formData.purchaseprice.value,
        Tax: formData.tax,
        taxPercentage: formData.tax,
        openingQuantity: formData.openingQuantity || 0,
        atPrice: formData.atPrice,
        asDate: formData.asDate,
        minToMaintain: formData.minToMaintain || 10,
        location: formData.location,
        profit: formData.sellPrice.value - formData.discount - formData.purchaseprice.value - (formData.tax || 0),
        barcode: formData.ImageURL?.url || "",
        stock: formData.openingQuantity || 0,
        itemType: "product",
        images: ImageList,
        onlineStoreImages: onlineStoreImages,
        showInOnlineStore: showInOnlineStore
      };
    } else {
      newData = {
        Name: formData.itemName,
        HSN: formData.itemHSN,
        Category: formData.itemCategory,
        Code: formData.itemCode,
        salesPrice: formData.sellPrice.withTax
          ? formData.sellPrice.value * (1 - formData.tax)
          : formData.sellPrice.value,
        discount: formData.discount,
        Tax: formData.tax,
        profit: formData.sellPrice.value - formData.discount,
        itemType: "service",
        showInOnlineStore: showInOnlineStore
      };
    }

    let newDa = {...data};
    newDa.items = newDa.items ? [...newDa.items, newData] : [newData];
    
    setData(newDa);
    setChange(!change);
    setLoading(false);

    if (saveAndNew) {
      // Reset form for new entry but keep some settings
      setFormData({
        ...formData,
        itemName: '',
        itemHSN: '',
        itemCode: '',
        sellPrice: { value: '', withTax: true },
        WholeSalePrice: '',
        discount: '',
        purchaseprice: { value: '', withTax: true },
        openingQuantity: '',
        atPrice: '',
        description: '',
        ImageURL: null
      });
      setImageList([]);
      setOnlineStoreImages([]);
    } else {
      Navigate("/items");
    }
  };

  const handleUpload = (url) => {
    if (page === "Os") {
      setOnlineStoreImages(prev => [...prev, url]);
    } else {
      setImageList(prev => [...prev, url]);
    }
  };

  const removeImage = (index, isOnlineStoreImage = false) => {
    if (isOnlineStoreImage) {
      setOnlineStoreImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setImageList(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (loading) return <Loader />;

  return (
    <div id="addItem">
      <ToastContainer />
      <div className="container">
        <div className="top">
          <div className="l">
            <h1>Add Item</h1>
            <p>Product</p>
            <div
              className={toggle ? "toggle" : "toggle opp"}
              onClick={() => setToggle(!toggle)}
            >
              <div className="button"></div>
            </div>
            <p>Service</p>
          </div>
          <div className="r">
            <button onClick={() => Navigate("/settings?page=item")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 512 512"
              >
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
            <button onClick={() => Navigate("/items")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="c1">
          <div className="flex gap-3 items-center">
            <CustomInput
              inputValue={formData.itemName}
              setInputValue={(val) => handleInputChange('itemName', val)}
              placeholder={toggle ? "Item Name *" : "Service Name *"}
            />
            <CustomInput
              inputValue={formData.itemHSN}
              setInputValue={(val) => handleInputChange('itemHSN', val)}
              placeholder={toggle ? "Item HSN" : "Service HSN"}
            />
            
            {data.settings?.ItemUnits ? (
              <>
                {formData.primaryUnit?.name && formData.primaryUnit?.done ? (
                  <>
                    <h1>
                      Units: <span className="font-semibold">{formData.primaryUnit.name}</span>
                      {formData.SecondaryUnit?.name && formData.Conversion && (
                        <span>
                          , {formData.SecondaryUnit?.name} x {formData.Conversion} = {formData.primaryUnit.name}
                        </span>
                      )}
                    </h1>
                    <button
                      onClick={() => setUnitToggle(true)}
                      className="px-4 py-2 bg-blue-200 text-blue-600 rounded hover:bg-blue-300"
                    >
                      Edit Units
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setUnitToggle(true)}
                    className="px-4 py-2 bg-blue-200 text-blue-600 rounded hover:bg-blue-300"
                  >
                    Set Unit
                  </button>
                )}
              </>
            ) : <h1 className="text-gray-500">(units are disabled in setting)</h1>}

            {formData.itemCode && (
              <>
                {formData.ImageURL ? (
                  <a href={formData.ImageURL.url} target="_blank" rel="noopener noreferrer">
                    Click to see Barcode
                  </a>
                ) : (
                  <button
                    className="text-blue-500 font-semibold mx-2 items-center hover:underline fill-blue-500 flex gap-1"
                    onClick={() => generateurl(formData.itemCode)}
                  >
                    Generate Barcode Image
                  </button>
                )}
              </>
            )}
          </div>

          {unitToggle && (
            <div className="flex z-10 justify-center items-center fixed top-0 left-0 w-screen h-screen bg-gray-600 bg-opacity-20">
              <div className="mx-auto p-4 bg-white flex flex-col w-auto rounded-md shadow-md min-w-[400px]">
                <h3 className="text-lg font-semibold mb-4">
                  Select Items Units
                </h3>
                <div className="flex w-full gap-2 justify-between my-3">
                  <div className="relative">
                    <h1>Primary Unit</h1>
                    <Autocomplete
                      disablePortal
                      options={data?.units?.map((unit) => ({ label: unit.name })) || []}
                      sx={{ width: 250 }}
                      renderInput={(params) => <TextField {...params} label="Units" />}
                      value={formData.primaryUnit?.name ? { label: formData.primaryUnit.name } : null}
                      onChange={(event, newValue) =>
                        handleInputChange('primaryUnit', { name: newValue?.label || '', done: true })
                      }
                    />
                    {/* <CustomInput
                      inputValue={primaryUnit}
                      setInputValue={setprimaryUnit}
                      placeholder={"Primary Unit"}
                    /> */}
                    <Autocomplete
                      disablePortal
                      options={data?.units.map((unit)=> ({label:unit.name}))}
                      sx={{ width: 250 }}
                      renderInput={(params) => <TextField {...params} label="Units" />}
                      value={editUnits?.primary}
                      onChange={(event, newValue) =>
                        setEditUnits({...editUnits, primary: newValue?.label})
                      }
                    />

                    {/* <input
                      type="text"
                      className="p-2 border border-gray-400"
                      value={primaryUnit?.name}
                      onChange={(e) =>
                        setprimaryUnit({ name: e.target.value, done: false })
                      }
                    />
                    {primaryUnit?.name && !primaryUnit?.done && (
                      <div className="absolute left-0 top-30 bg-white shadow-lg max-h-[300px] overflow-y-auto px-2">
                        {data?.units
                          ?.filter(
                            (e) =>
                              primaryUnit?.name
                                .toLowerCase()
                                .split(" ")
                                .every((word) =>
                                  e.name.toLowerCase().includes(word)
                                )
                            // e.partyName.toLowerCase().includes(SearchQuerry.toLowerCase())
                          )
                          .map((item, index) => (
                            <div
                              className={`p-2 w-full hover:bg-gray-200 cursor-pointer`}
                              key={index}
                              onClick={() =>
                                setprimaryUnit({ name: item.name, done: true })
                              }
                            >
                              <h1>{item.name}</h1>
                            </div>
                          ))}
                      </div>
                    )} */}
                  </div>
                  <div className="relative">
                    <h1>Secondary Unit</h1>
                    <Autocomplete
                      disablePortal
                      options={data?.units?.map((unit) => ({ label: unit.name })) || []}
                      sx={{ width: 250 }}
                      renderInput={(params) => <TextField {...params} label="Units" />}
                      value={formData.SecondaryUnit?.name ? { label: formData.SecondaryUnit.name } : null}
                      onChange={(event, newValue) =>
                        handleInputChange('SecondaryUnit', { name: newValue?.label || '', done: true })
                      }
                    />

                  </div>
                </div>
                {formData.SecondaryUnit?.name && (
                  <p>
                    One Secondary unit ={" "}
                    <input
                      type="number"
                      className="p-1 border border-gray-400"
                      value={formData.Conversion || ""}
                      onChange={(e) => 
                        handleInputChange('Conversion', e.target.value)
                      }
                    />{" "}
                    X Primary Unit
                  </p>
                )}
                <div className="flex w-full gap-2 mt-2">
                  <button
                    onClick={() => setUnitToggle(false)}
                    className="px-4 py-2 bg-blue-500 flex-1 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setUnitToggle(false)}
                    className="px-4 py-2 border border-blue-500 flex-1 text-blue-600 rounded hover:bg-blue-500 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p1">
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value === "addCategory") {
                  Navigate("/items?data=addCategory");
                } else {
                  handleInputChange('itemCategory', value);
                }
              }}
              className="box"
              value={formData.itemCategory || "N/A"}
            >
              <option className="grey" value="N/A">
                Not Available
              </option>
              {data.category?.map((c, index) => (
                <option key={index} className="grey" value={c.name}>
                  {c.name || "-"}
                </option>
              ))}
              <option
                value="addCategory"
                style={{ color: "blue", fontWeight: "600" }}
              >
                + add category
              </option>
            </select>

            <div className="flex items-center flex-wrap gap-2">
              <CustomInput
                inputValue={formData.itemCode}
                setInputValue={(val) => handleInputChange('itemCode', val)}
                placeholder={toggle ? "Item Code" : "Service Code"}
              />
              {!formData.itemCode && (
                <button
                  className="h-full p-1 bg-blue-200 hover:bg-blue-300 rounded-r-md"
                  onClick={() => {
                    let cd = generate13DigitNumberString();
                    handleInputChange('itemCode', cd);
                  }}
                >
                  Generate random code
                </button>
              )}

              <button
                className="text-blue-400 font-semibold items-center fill-blue-400 flex gap-1"
                onClick={() => setShowPopup(true)}
              >
                <span className="hover:underline">Add Product Images</span>{" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                  <path d="..." />
                </svg>
              </button>

              {ImageList?.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-2">
                  {ImageList.map((url, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-200 rounded overflow-hidden relative">
                      <img src={url} alt="Product" className="w-full h-full object-cover" />
                      <button
                        className="absolute top-0 right-0 p-[2px] bg-red-500 text-white rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-2.5 h-2.5">
                          <path d="..." />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showPopup && (
                <ImageUploader
                  onClose={() => setShowPopup(false)}
                  onUpload={handleUpload}
                />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-0">
            <TextField
              id="outlined-search"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              label="Description"
              type="search"
              sx={{
                background: "white",
                width: "400px",
              }}
            />
          </div>
          
          {data.settings?.itembarcodeScanner && (
            <div className="p1 mt-2">
              <p className="text-gray-400 ">
                * scan existing barcode to set custom item code from pre-existing
                barcode
              </p>
            </div>
          )}
        </div>

        <div className="c2">
          <div className="top t">
            <button
              className={page === "pricing" ? "active" : ""}
              onClick={() => setPage("pricing")}
            >
              Pricing
            </button>
            {toggle && (
              <button
                className={page === "stock" ? "active" : ""}
                onClick={() => setPage("stock")}
              >
                Stock
              </button>
            )}
            <button
              className={page === "Os" ? "active" : ""}
              onClick={() => setPage("Os")}
            >
              Online Store
            </button>
            {(toggle && data.settings?.itemStockMaintainance) && (
              <button
                className={page === "Man" ? "active" : ""}
                onClick={() => setPage("Man")}
              >
                Manufacturing
              </button>
            )}
          </div>

          {page === "pricing" ? (
            <div className="">
              {data.settings?.MRP && (
                <div className="rounded-lg bg-gray-100 m-3 p-3">
                  <h1 className="text-lg mb-[10px] font-semibold">MRP</h1>
                  <div className="flex">
                    <div className="flex items-center gap-3">
                      <TextField
                        id="outlined-search"
                        value={formData.MRP}
                        onChange={(e) => handleInputChange('MRP', e.target.value)}
                        label="MRP"
                        sx={{ background: "white", width: "100%" }}
                        type="number"
                      />
                      <TextField
                        id="outlined-search"
                        value={formData.MRP_salePrice}
                        onChange={(e) => handleInputChange('MRP_salePrice', e.target.value)}
                        label="Desc. on MRP for Sale (%)"
                        sx={{ background: "white", width: "100%" }}
                        type="number"
                      />
                      <TextField
                        id="outlined-search"
                        value={formData.MRP_wholeSalePrice}
                        onChange={(e) => handleInputChange('MRP_wholeSalePrice', e.target.value)}
                        label="Desc. on MRP for Wholesale (%)"
                        sx={{ background: "white", width: "100%" }}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-lg bg-gray-100 m-3 p-3">
                <h1 className="text-lg mb-[10px] font-semibold">SALE PRICE</h1>
                <div className="flex">
                  <div className="flex items-center gap-0">
                    <TextField
                      id="outlined-search"
                      value={formData.sellPrice.value}
                      onChange={(e) => handleNestedChange('sellPrice', 'value', e.target.value)}
                      label="Sale Price"
                      sx={{ background: "white", width: "100%" }}
                      type="number"
                    />
                    <select
                      className="p-4 m-2 border-gray-300 border rounded-md"
                      value={formData.sellPrice.withTax}
                      onChange={(e) => handleNestedChange('sellPrice', 'withTax', e.target.value === 'true')}
                    >
                      <option value={true}>With Taxes</option>
                      <option value={false}>Without Taxes</option>
                    </select>
                  </div>
                  {data.settings?.itemwiseDiscount && (
                    <div className="flex items-center ml-10 gap-0">
                      <TextField
                        id="outlined-search"
                        value={formData.discount}
                        onChange={(e) => handleInputChange('discount', e.target.value)}
                        label="Discount"
                        sx={{ background: "white", width: "100%" }}
                        type="number"
                      />
                      <select className="p-4 m-2 border-gray-300 border rounded-md">
                        <option>Amount</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  )}
                </div>

                {data.settings?.WholeSale && (
                  <div className="flex items-center mt-2">
                    <TextField
                      id="outlined-search"
                      value={formData.WholeSalePrice}
                      onChange={(e) => handleInputChange('WholeSalePrice', e.target.value)}
                      label="Wholesale Price"
                      sx={{ background: "white" }}
                      type="number"
                    />
                    <select className="p-4 m-2 border-gray-300 border rounded-md">
                      <option>With Tax</option>
                      <option>Without Tax</option>
                    </select>
                    {data.settings?.WholeSaleMin && (
                      <TextField
                        id="outlined-search"
                        label="Wholesale Minimum qty to maintain"
                        sx={{ background: "white", marginLeft: "20px" }}
                        type="number"
                      />
                    )}
                    {formData.SecondaryUnit?.name && (
                      <p className="text-sm">
                        wholesale unit - {formData.SecondaryUnit.name}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full">
                {toggle && (
                  <div className="rounded-lg flex-1 bg-gray-100 m-3 p-3">
                    <h1 className="text-lg mb-[10px] font-semibold">PURCHASE PRICE</h1>
                    <div className="flex gap-3 items-center">
                      <TextField
                        id="outlined-search"
                        value={formData.purchaseprice.value}
                        onChange={(e) => handleNestedChange('purchaseprice', 'value', e.target.value)}
                        label="Purchase Price"
                        sx={{ background: "white", width: "100%" }}
                        type="number"
                      />
                      <select
                        className="p-4 m-2 border-gray-300 border rounded-md"
                        value={formData.purchaseprice.withTax}
                        onChange={(e) => handleNestedChange('purchaseprice', 'withTax', e.target.value === 'true')}
                      >
                        <option value={true}>With Taxes</option>
                        <option value={false}>Without Taxes</option>
                      </select>
                    </div>
                  </div>
                )}
                <div className="rounded-lg flex-1 bg-gray-100 m-3 p-3">
                  <h1 className="text-lg mb-[10px] font-semibold">TAXES</h1>
                  <div className="flex gap-3 items-center">
                    <TextField
                      select
                      label="Taxes"
                      value={formData.tax}
                      onChange={(e) => handleInputChange('tax', e.target.value)}
                      sx={{ background: "white", width: "100%" }}
                    >
                      <MenuItem value={0}>None</MenuItem>
                      {data.tax?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              </div>

              {/* Error messages */}
              {validationErrors.purchasePriceExceedsMRP && (
                <div className="text-red-500 p-3 bg-red-50 rounded-md m-3">
                  Error: Purchase price cannot be more than MRP
                </div>
              )}
              {validationErrors.wholesalePriceExceedsMRP && (
                <div className="text-red-500 p-3 bg-red-50 rounded-md m-3">
                  Error: Wholesale price cannot be more than MRP
                </div>
              )}
            </div>
          ) : page === "stock" ? (
            <div className="space-y-4 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opening Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.openingQuantity || ''}
                    onChange={(e) => handleInputChange('openingQuantity', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    At Price
                  </label>
                  <input
                    type="number"
                    value={formData.atPrice || ''}
                    onChange={(e) => handleInputChange('atPrice', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.asDate ? new Date(formData.asDate) : null}
                      onChange={(date) => handleInputChange('asDate', date)}
                      className="p-2 border border-gray-300 rounded-md w-full"
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select date"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Stock to Maintain
                  </label>
                  <input
                    type="number"
                    value={formData.minToMaintain || ''}
                    onChange={(e) => handleInputChange('minToMaintain', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Capacity
                  </label>
                  <input
                    type="text"
                    value={formData.Storagecapacity || ''}
                    onChange={(e) => handleInputChange('Storagecapacity', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          ) : page === "Os" ? (
            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Online Store Settings</h2>
                <div className="flex items-center">
                  <span className="mr-2">Show in Nazdikwala Online Store:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showInOnlineStore}
                      onChange={() => setShowInOnlineStore(!showInOnlineStore)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-2 text-sm font-medium">
                      {showInOnlineStore ? 'Yes' : 'No'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Online Store Images</h3>
                <button
                  className="text-blue-500 font-semibold items-center hover:underline fill-blue-500 flex gap-1 mb-3"
                  onClick={() => setShowPopup(true)}
                >
                  <span>Add Images for Online Store</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                    <path d="..." />
                  </svg>
                </button>

                {onlineStoreImages.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {onlineStoreImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Online Store ${index + 1}`}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <button
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index, true)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-3 h-3">
                            <path d="..." />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No images added for online store</p>
                )}
              </div>
            </div>
          ) : (
            <Undone />
          )}
        </div>

        <div className="c3">
          <button 
            onClick={() => addItemReq(true)}
            disabled={validationErrors.purchasePriceExceedsMRP || 
                      validationErrors.wholesalePriceExceedsMRP || 
                      validationErrors.requiredFieldsMissing}
            className={`${validationErrors.purchasePriceExceedsMRP || 
                        validationErrors.wholesalePriceExceedsMRP || 
                        validationErrors.requiredFieldsMissing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Save & New
          </button>
          <button 
            onClick={() => addItemReq(false)}
            disabled={validationErrors.purchasePriceExceedsMRP || 
                      validationErrors.wholesalePriceExceedsMRP || 
                      validationErrors.requiredFieldsMissing}
            className={`${validationErrors.purchasePriceExceedsMRP || 
                        validationErrors.wholesalePriceExceedsMRP || 
                        validationErrors.requiredFieldsMissing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}