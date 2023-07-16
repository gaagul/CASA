import React from "react";
import { TextField, Button, IconButton } from "@mui/material";
import { Formik, Form, Field } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { not } from "ramda";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const Filterbar = ({
  filters,
  onSubmit,
  removeQueryParam,
  setIsFilterBarOpen,
  isFilterBarOpen,
}) =>
  isFilterBarOpen ? (
    <div className="mt-4 flex justify-center rounded-md bg-white p-4 shadow-md shadow-indigo-100">
      <Formik enableReinitialize initialValues={filters} onSubmit={onSubmit}>
        {() => (
          <Form className="flex items-center">
            <Field
              as={TextField}
              className="mx-2"
              label="Location"
              name="location"
              size="small"
              variant="outlined"
            />
            <Field
              as={TextField}
              className="mx-2"
              label="Price"
              name="price"
              size="small"
              variant="outlined"
            />
            <Field
              as={TextField}
              className="mx-2"
              label="Property Type"
              name="type"
              size="small"
              variant="outlined"
            />
            <Button
              className="mx-2 !bg-indigo-500"
              startIcon={<SearchIcon />}
              type="submit"
              variant="contained"
            >
              Search
            </Button>
            <IconButton onClick={() => setIsFilterBarOpen(not)}>
              <FilterOutlined />
            </IconButton>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <div className="mt-4 flex items-center justify-between rounded-md bg-white px-4 py-1 shadow-md shadow-indigo-100">
      <div className="flex items-center gap-2">
        <Typography.Title className="primary-text mb-0" level={4}>
          Filters:
        </Typography.Title>
        {Object.entries(filters).map(
          ([key, value]) =>
            value && (
              <div
                className="group relative rounded-lg bg-gray-200 px-2 py-1"
                key={key}
              >
                <Typography.Text className="mb-0">{`${key} => ${value}`}</Typography.Text>
                <div className="primary-text absolute right-0 top-1/2 flex h-full w-full -translate-y-1/2 transform cursor-pointer flex-row-reverse items-center rounded-lg bg-slate-100 px-4 opacity-0 group-hover:opacity-75" />
                <CloseOutlined
                  className="primary-text absolute right-2 top-2 z-40 cursor-pointer opacity-0 group-hover:opacity-100"
                  onClick={() => removeQueryParam(key)}
                />
              </div>
            )
        )}
      </div>
      <IconButton onClick={() => setIsFilterBarOpen(not)}>
        <FilterOutlined />
      </IconButton>
    </div>
  );
export default Filterbar;
