import React from "react";
import { Table as AntdTable, Spin } from "antd";
import { properties, columns } from "./constants";
import { useFetchProperties } from "../../hooks/usePropertiesApi";

const Table = ({ searchParams }) => {
  const filter = {
    keyword: searchParams.get("keyword"),
    status: searchParams.get("status"),
  };

  const buildFilteredData = (data) => {
    console.log("keyword", filter.keyword, "status", filter.status)
    const filteredData = data.filter(obj => {
      if (filter.keyword && !obj.name.includes(filter.keyword)) {
        return false;
      }

      if (filter.status && obj.status !== filter.status) {
        return false;
      }

      return true;
    });

    return filteredData;
  };

  const { data = [], isLoading } = useFetchProperties();
  if(isLoading) {
    return <Spin className="flex h-full w-full flex-col items-center justify-around"/>
  }
  if(!isLoading){
  return (
    <AntdTable
      className="mt-4"
      columns={columns}
      dataSource={buildFilteredData(data)}
    />
  );
  }
};

export default Table;
