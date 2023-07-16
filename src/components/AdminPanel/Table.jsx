import React from "react";
import { Table as AntdTable } from "antd";
import { data, columns } from "./constants";

const Table = ({ searchParams }) => {
  const filter = {
    keyword: searchParams.get("keyword"),
    status: searchParams.get("status"),
  };

  const buildFilteredData = () => {
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

  return (
    <AntdTable
      className="mt-4"
      columns={columns}
      dataSource={buildFilteredData(data)}
    />
  );
};

export default Table;
