import { JsonSchema, UISchemaElement } from "@jsonforms/core";

export const assessmentFormSchema: JsonSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      title: "First Name",
      minLength: 1,
    },
    lastName: {
      type: "string",
      title: "Last Name",
      minLength: 1,
    },
    email: {
      type: "string",
      title: "Email",
      format: "email",
      minLength: 1,
    },
    country: {
      type: "string",
      title: "Country of Citizenship",
      enum: [
        "United States",
        "Canada",
        "United Kingdom",
        "Germany",
        "France",
        "India",
        "China",
        "Brazil",
        "Australia",
        "Other",
      ],
    },
    linkedin: {
      type: "string",
      title: "LinkedIn / Personal website URL",
      minLength: 1,
    },
    visasInterested: {
      type: "array",
      title: "Visa categories of interest?",
      items: {
        type: "string",
        enum: ["O-1", "EB-1", "EB-2 NIW", "I don't know"],
      },
      uniqueItems: true,
      minItems: 1,
    },
    additionalInfo: {
      type: "string",
      title: "How can we help you?",
      description:
        "What is your current status and when does it expire? What is your goal - temporary status or green card? What field are you in and what have you achieved? Any timeline considerations?",
      minLength: 1,
    },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "country",
    "linkedin",
    "visasInterested",
    "additionalInfo",
  ],
};

export const assessmentFormUISchema: UISchemaElement = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/firstName",
      options: {
        placeholder: "First Name",
      },
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
      options: {
        placeholder: "Last Name",
      },
    },
    {
      type: "Control",
      scope: "#/properties/email",
      options: {
        placeholder: "Email",
      },
    },
    {
      type: "Control",
      scope: "#/properties/country",
      options: {
        placeholder: "Select your country",
      },
    },
    {
      type: "Control",
      scope: "#/properties/linkedin",
      options: {
        placeholder: "LinkedIn / Personal website URL",
      },
    },
    {
      type: "Control",
      scope: "#/properties/visasInterested",
      options: {
        format: "checkbox",
      },
    },
    {
      type: "Control",
      scope: "#/properties/additionalInfo",
      options: {
        multi: true,
        rows: 5,
      },
    },
  ],
};
