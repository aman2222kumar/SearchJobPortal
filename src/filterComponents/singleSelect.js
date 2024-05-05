import Select from "react-select";

function SingleSelectDropDown({ data, placeholderText, value, onDataChange }) {
  return (
    <>
      {data && (
        <Select
          isClearable
          placeholder={placeholderText}
          name="minexp"
          options={data}
          className="basic-multi-select"
          classNamePrefix="select"
          value={value}
          onChange={onDataChange}
        />
      )}
    </>
  );
}

export default SingleSelectDropDown;
