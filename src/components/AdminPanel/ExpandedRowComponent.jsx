import React, { useState } from "react";
import { Select, Button } from "antd";
import { ZIPCODES } from "./constants";
import { useFetchZipcodes } from "../../hooks/useZipcodesApi";
import { updateUserWithZipcodes } from "../../apis/users";

const ExpandedRowComponent = ({ record, successCallback }) => {
  const [selectedZipcodes, setSelectedZipcodes] = useState(
    record?.listOfZipcodes
  );

  const handleSave = ()=>{
    updateUserWithZipcodes(record.uid, selectedZipcodes);
    console.log("Successfully updated user zipcode list.");
    successCallback();
  }

  const {data, isLoading} = useFetchZipcodes();
  
  if(!isLoading)
  return (
    <div className="flex gap-8">
      <Select
        allowClear
        showSearch
        mode="multiple"
        placeholder="Assigned Zipcodes"
        style={{ width: "100%" }}
        value={selectedZipcodes}
        options={data.map(zipcode => ({
          label: zipcode,
          value: zipcode,
        }))}
        onChange={value => {
          setSelectedZipcodes(value);
        }}
      />
      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
      <Button onClick={() => setSelectedZipcodes(record?.listOfZipcodes)}>
        Reset
      </Button>
    </div>
  );
};

export default ExpandedRowComponent;
