import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListContainer = ({ children, styles }) => {
  return <ListContainerStyled style={styles}>{children}</ListContainerStyled>;
};
const ListContainerStyled = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 8px 25px -10px #ccc;
  border-radius: 5px;
  padding: 15px;
`;
ListContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  styles: PropTypes.object,
};
ListContainer.defaultProps = {
  children: [] || {},
  styles: {},
};

export default ListContainer;
