import * as Yup from "yup";

export const PROPERTY_FORM_INITIAL_VALUES = {
  name: "",
  address: "",
  zipcode: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  price: "",
  type: "rent", // Set the initial value as "rent"
  description: "",
  amenities: "",
};

export const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  zipcode: Yup.string().required("Zip Code is required"),
  bedrooms: Yup.number()
    .integer("Number of Bedrooms must be an integer")
    .required("Number of Bedrooms is required"),
  bathrooms: Yup.number()
    .integer("Number of Bathrooms must be an integer")
    .required("Number of Bathrooms is required"),
  area: Yup.number().required("Area is required"),
  price: Yup.number().required("Price is required"),
  type: Yup.string().required("Type is required"),
  amenities: Yup.string(),
  description: Yup.string().required("Description is required"),
});
