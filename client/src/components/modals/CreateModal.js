import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../elements/Buttons";
import { CloseCross } from "../elements/CloseCross";
import ModalWindow from "./ModalWindow";
import TextInput from "../elements/TextInput";
import Typography from "../../styles/Typography";
import Select from "../elements/Select";
import { createDocument } from "../../utils/api";

const CreateModal = ({ show, onClick }) => {
  let history = useHistory();
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState(null);
  const [fail, setFail] = useState(false);

  const onValueName = (event) => {
    event.preventDefault();
    const fileName = event.target.value;
    setFileName(fileName.replace(/\s/g, "").toLowerCase());
  };
  const onValueType = (event) => {
    event.preventDefault();
    const fileType = event.target.value;
    setType(fileType);
  };

  const onCreate = async (event) => {
    event.preventDefault();
    if (fileName && type) {
      await createDocument(fileName, type);
      history.push(`/edit/${fileName}.${type}.mustache`);
    } else {
      setFail(true);
      return null;
    }
  };
  return (
    <ModalWindow show={show}>
      <CloseCross onClick={onClick} />
      <Typography>Create new document</Typography>
      <form onSubmit={onCreate}>
        <Typography type="label">Name</Typography>
        <TextInput
          type="text"
          onChange={onValueName}
          placeholder="Enter document name"
        />
        <Typography type="label">Type</Typography>
        <Select onChange={onValueType}>
          <option value="disabled">Select document type</option>
          <option value="email">email</option>
          <option value="news">news</option>
          <option value="part">part</option>
        </Select>

        <Button children="Save" type="submit" view="modal" />
      </form>
      {fail && (
        <Typography
          type="label"
          styles={{
            textAlign: "center",
            color: "rgb(234 104 55)",
            width: "100%",
          }}
        >
          File name and type are required
        </Typography>
      )}
    </ModalWindow>
  );
};
TextInput.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.string,
};
TextInput.defaultProps = {
  onClick: () => {},
  show: "",
};
export default CreateModal;
