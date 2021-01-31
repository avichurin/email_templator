import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../elements/Buttons";
import ModalWindow from "./ModalWindow";
import Typography from "../../styles/Typography";
import { Wrapper } from "../../styles/commonStyle";

const DeleteImage = ({ onConfirm, onCancel, show }) => {
  return (
    <ModalWindow show={show}>
      <Wrapper>
        <Typography>You sure to delete?</Typography>
        <Flex>
          <Button
            type="button"
            children="Cancel"
            onClick={onCancel}
            styles={{ margin: "0 15px 0 0" }}
            view="light"
          />
          <Button type="submit" children="Confirm" onClick={onConfirm} />
        </Flex>
      </Wrapper>
    </ModalWindow>
  );
};
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;
DeleteImage.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.string,
};
DeleteImage.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
  show: "",
};
export default DeleteImage;
