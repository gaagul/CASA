import React from "react";
import { Table as AntdTable, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPropertiesByUserId } from "../../hooks/usePropertiesApi";
import { buildColumns } from "./constants";
import { getFromLocalStorage } from "../../hooks/useLocalStorage";

const Table = ({ searchParams }) => {
  const queryClient = useQueryClient();

  const filter = {
    keyword: searchParams.get("keyword"),
    status: searchParams.get("status"),
  };

  const statusChangeCallback = () =>
    queryClient.invalidateQueries("getPropertiesOfAUser");

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
  const userId = JSON.parse(getFromLocalStorage("loggedInUser")).uid;
  const { data = [], isFetching } = useGetPropertiesByUserId(userId);
  if (isFetching) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  return (
    <AntdTable
      className="mt-4"
      columns={buildColumns(statusChangeCallback)}
      dataSource={buildFilteredData(data)}
    />
  );
};

export default Table;
