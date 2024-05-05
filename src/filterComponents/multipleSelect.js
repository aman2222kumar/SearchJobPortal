import Select from "react-select";

function MultipleSelectDropDown({ data, placeholderText, onDataChange }) {
  return (
    <>
      {data && (
        <Select
          isMulti
          name="location"
          placeholder={placeholderText}
          options={data}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onDataChange}
        />
      )}
    </>
  );
}

export default MultipleSelectDropDown;
