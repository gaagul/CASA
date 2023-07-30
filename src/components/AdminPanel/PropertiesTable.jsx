import React from "react";
import { Table as AntdTable, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import {
  useFetchProperties,
  useGetPropertiesWithMatchingZipcodes,
} from "../../hooks/usePropertiesApi";
import { buildPropertiesColumns } from "./constants";

const PropertiesTable = ({ searchParams, userDetails }) => {
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

  const { data = [], isFetching } =
    userDetails?.role === "admin"
      ? useFetchProperties()
      : useGetPropertiesWithMatchingZipcodes(userDetails?.uid, {
          enabled: !!userDetails?.uid && userDetails?.role === "moderator",
        });

  if (isFetching) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  return (
    <AntdTable
      className="mt-4"
      columns={buildPropertiesColumns(statusChangeCallback)}
      dataSource={buildFilteredData(data)}
    />
  );
};

export default PropertiesTable;
