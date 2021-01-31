import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextInput = ({ onChange, placeholder, value }) => {
  return (
    <StyledTextInput
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

const StyledTextInput = styled.input`
  width: 300px;
  height: 35px;
  border: 2px solid #a7c1d2;
  border-radius: 5px;
  padding-left: 10px;
  color: #789db5;
  margin-bottom: 5px;
  &::placeholder {
    color: #a7c1d2;
  }
`;
TextInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
TextInput.defaultProps = {
  onChange: () => {},
  placeholder: "",
  value: "",
};
export default TextInput;
