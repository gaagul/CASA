import React, { useState, useMemo, useEffect } from "react";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { pickBy, identity, isEmpty } from "ramda";
import PropertyCard from "components/PropertyCard";
import Filterbar from "components/Filterbar";
import { Spin, Typography, Pagination } from "antd";
import { initializeFilters, filterProperties } from "../utils";
import { useFetchProperties } from "../hooks/usePropertiesApi";

const ListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initializeFilters());
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data = [], isLoading } = useFetchProperties();

  const filteredProperties = useMemo(
    () => filterProperties(data, filters),
    [data, filters]
  );

  const handleFilterSubmit = values => {
    setFilters(values);
    const nonEmptyFilters = pickBy(identity, values);

    setSearchParams(nonEmptyFilters);
    setIsFilterBarOpen(false);
  };

  const removeQueryParam = key => {
    const newFilters = { ...filters, [key]: "" };
    setFilters(newFilters);
    handleFilterSubmit(newFilters);
  };

  useEffect(() => {
    setFilters(initializeFilters());
  }, [searchParams]);

  if (isLoading) {
    return (
      <Spin className="flex h-full w-full flex-col items-center justify-around" />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7fe]">
      <Container className="min-h-screen">
        <div className="flex h-full w-full flex-col px-24 pb-2 pt-16">
          <Filterbar
            filters={filters}
            isFilterBarOpen={isFilterBarOpen}
            removeQueryParam={removeQueryParam}
            setIsFilterBarOpen={setIsFilterBarOpen}
            onSubmit={handleFilterSubmit}
          />
          <div className="mt-4 flex flex-grow flex-wrap justify-start gap-6">
            {!isEmpty(filteredProperties) ? (
              filteredProperties
                .slice((currentPage - 1) * 12, currentPage * 12)
                .map(({ id, ...property }) => (
                  <PropertyCard key={id} property={property} />
                ))
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-around">
                <Typography.Text>No properties found</Typography.Text>
              </div>
            )}
          </div>
        </div>
        <Pagination
          className="mt-8 flex justify-center"
          current={currentPage}
          pageSize={12}
          total={filteredProperties.length}
          onChange={setCurrentPage}
        />
      </Container>
    </div>
  );
};

export default ListingPage;
