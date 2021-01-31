import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Select = ({ onChange, children, styles }) => {
  return <StyledSelect onChange={onChange} style={styles}>{children}</StyledSelect>;
};

const StyledSelect = styled.select`
  width: 304px;
  height: 35px;
  border: 2px solid #a7c1d2;
  border-radius: 5px;
  padding-left: 10px;
  color: #a7c1d2;
  box-sizing: content-box;
  margin-bottom: 5px;
`;
StyledSelect.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.array,
  styles: PropTypes.object,
};
StyledSelect.defaultProps = {
  onChange: () => {},
  children: [],
  styles: {},
};
export default Select;
