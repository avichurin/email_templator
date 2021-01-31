import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../elements/Buttons";
import Typography from "../../styles/Typography";
import { CloseCross } from "../elements/CloseCross";
import ModalWindow from "./ModalWindow";
import TextInput from "../elements/TextInput";
import { createImage } from "../../utils/image";
import "../../style.css";

const UploadImage = ({ onAbort, show, onUpdate }) => {
  const [fileName, setFileName] = useState("");
  const [fileDefaultName, setFileDefaultName] = useState("");
  const [fileDefaultSize, setFileDefaultSize] = useState("");
  const [fileData, setFileData] = useState(null);

  const onValueName = useCallback((event) => {
    event.preventDefault();
    const fileName = event.target.value;
    setFileName(fileName.replace(/\s/g, "").toLowerCase());
  }, []);

  const getFile = useCallback(() => {
    const preview = document.getElementById("uploaded-file");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
        setFileData(preview.src);
      },
      false
    );

    if (file) {
      var fileSize = 0;
      if (file.size > 1024 * 1024) {
        fileSize =
          (Math.round((file.size * 100) / (1024 * 1024)) / 100).toString() +
          " MB";
      } else {
        fileSize =
          (Math.round((file.size * 100) / 1024) / 100).toString() + " KB";
      }
      reader.readAsDataURL(file);
      setFileDefaultName(file.name);
      setFileDefaultSize(fileSize);
    }
  }, []);

  const onUpload = (e) => {
    e.preventDefault();
    createImage(fileName, fileData).then((data) => {
      onUpdate(data.files);
      onAbort();
    });
  };
  return (
    <ModalWindow show={show}>
      <CloseCross onClick={onAbort} />
      <Typography>Create new image</Typography>
      <Typography type="label">Name</Typography>
      <TextInput
        type="text"
        placeholder="Enter image name"
        onChange={onValueName}
      />
      <Form onSubmit={onUpload}>
        <UploadWrapper>
          <Label>
            <input
              id="uploaded-file"
              type="file"
              name="file"
              onChange={getFile}
            />
            <LabelText>Select a file</LabelText>
            <br />
          </Label>
        </UploadWrapper>
        {fileDefaultName && (
          <div>
            <Typography type="label" styles={{ color: "#10a1fe" }}>
              Default file name: {fileDefaultName}
            </Typography>
            <Typography type="label" styles={{ color: "#10a1fe" }}>
              Default file size: {fileDefaultSize}
            </Typography>
          </div>
        )}
        {fileData && <img src={fileData} height="100" alt="preview"></img>}

        <Button view="modal" children="Save" styles={{ marginTop: 40 }} />
      </Form>
    </ModalWindow>
  );
};

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;
const UploadWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  background: #a7c1d2;
  border-radius: 5px;
  color: #000;
  text-align: center;
  &:hover {
    background: #ccdfea;
  }
  input {
    display: none;
  }
`;
const Label = styled.label`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const LabelText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
`;

UploadImage.propTypes = {
  show: PropTypes.string,
  onAbort: PropTypes.func,
  onUpdate: PropTypes.func,
};
UploadImage.defaultProps = {
  onAbort: () => {},
  onUpdate: () => {},
  show: "",
};
export default UploadImage;
