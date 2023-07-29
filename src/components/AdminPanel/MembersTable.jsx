import React from "react";
import { Table as AntdTable, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchUsers } from "../../hooks/useUsersApi";
import { buildUsersColumns } from "./constants";

const MembersTable = ({ searchParams }) => {
  const queryClient = useQueryClient();
  const filter = {
    keyword: searchParams.get("keyword"),
    role: searchParams.get("role"),
  };

  const buildFilteredData = data => {
    const filteredData = data.filter(obj => {
      if (filter.keyword && !obj.name.includes(filter.keyword)) {
        return false;
      }

      if (filter.role && obj.role !== filter.role) {
        return false;
      }

      return true;
    });

    return filteredData;
  };

  const successCallback = () => queryClient.invalidateQueries("propertiesList");

  const { data, isFetching } = useFetchUsers();

  if (isFetching) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  return (
    <AntdTable
      className="mt-4"
      columns={buildUsersColumns(successCallback)}
      dataSource={buildFilteredData(data)}
    />
  );
};

export default MembersTable;
