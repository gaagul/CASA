import React from "react";
import { Table as AntdTable, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchProperties, useGetPropertiesWithMatchingZipcodes } from "../../hooks/usePropertiesApi";
import { buildColumns } from "./constants";

const Table = ({ searchParams }) => {
  const queryClient = useQueryClient();

  const filter = {
    keyword: searchParams.get("keyword"),
    status: searchParams.get("status"),
  };

  const statusChangeCallback = () =>
    queryClient.invalidateQueries("propertiesList");

  const buildFilteredData = data => {
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

  const { data = [], isFetching } = useGetPropertiesWithMatchingZipcodes("iOhjTqprMga27Iod0Pby2k8Pa2r1");
  if (isFetching) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  console.log(data);

  return (
    <AntdTable
      className="mt-4"
      columns={buildColumns(statusChangeCallback)}
      dataSource={buildFilteredData(data)}
    />
  );
};

export default Table;
