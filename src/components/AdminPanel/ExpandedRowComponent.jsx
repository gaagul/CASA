import React, { useState } from "react";
import { Select, Button } from "antd";
import { ZIPCODES } from "./constants";

const ExpandedRowComponent = ({ record }) => {
  const [selectedZipcodes, setSelectedZipcodes] = useState(
    record?.listOfZipcodes
  );

  return (
    <div className="flex gap-8">
      <Select
        allowClear
        showSearch
        mode="multiple"
        placeholder="Assigned Zipcodes"
        style={{ width: "100%" }}
        value={selectedZipcodes}
        options={ZIPCODES.map(zipcode => ({
          label: zipcode,
          value: zipcode,
        }))}
        onChange={value => {
          setSelectedZipcodes(value);
        }}
      />
      <Button type="primary" onClick={() => console.log(selectedZipcodes)}>
        Save
      </Button>
      <Button onClick={() => setSelectedZipcodes(record?.listOfZipcodes)}>
        Reset
      </Button>
    </div>
  );
};

export default ExpandedRowComponent;
