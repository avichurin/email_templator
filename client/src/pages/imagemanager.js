import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/common/header";
import Button from "../components/elements/Buttons";
import { CloseCross } from "../components/elements/CloseCross";
import Typography from "../styles/Typography";
import UploadImage from "../components/modals/UploadImageModal";
import DeleteImage from "../components/modals/DeleteImageModal";
import { Main, Wrapper, BoardWrapper, TitleBlock } from "../styles/commonStyle";
import { images, deleteImage } from "../utils/image";

const ImageManager = () => {
  const [show, setShow] = useState("none");
  const [visible, setVisible] = useState("none");
  const [files, setFiles] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    images().then((data) => {
      setFiles(data.files);
    });
  }, []);

  const onAdd = () => {
    setShow("block");
  };
  const onAbort = () => {
    setShow("none");
  };
  const onRemove = useCallback((name) => {
    setVisible("block");
    setFileName(name);
  }, []);

  const onConfirm = (e) => {
    e.preventDefault();
    deleteImage(fileName).then((data) => {
      onUpdate(data.files);
      console.log(data.files);
      onCancel();
    });
  };

  const onUpdate = useCallback((files) => {
    if (files) {
      setFiles(files);
    }
  }, []);

  const onCancel = () => {
    setVisible("none");
  };

  return (
    <Main>
      <UploadImage show={show} onAbort={onAbort} onUpdate={onUpdate} />
      <DeleteImage show={visible} onConfirm={onConfirm} onCancel={onCancel} />
      <Header />
      <Wrapper>
        <BoardWrapper>
          <Typography>Image Gallery</Typography>
          <TitleBlock style={{marginLeft: 40}}>
            <Button onClick={onAdd} children="Add image" />
          </TitleBlock>
        </BoardWrapper>
        <BoardWrapper>
          <ImageWrapper>
            {files != null &&
              files.map((i, index) => {
                return (
                  <Item
                    key={index}
                    src={i.url}
                    name={i.name}
                    onRemove={onRemove}
                  />
                );
              })}
          </ImageWrapper>
        </BoardWrapper>
      </Wrapper>
    </Main>
  );
};
const Item = ({ src, name, onRemove }) => {
  return (
    <ItemContainer>
      <CloseCross onClick={() => onRemove(name)} />
      <ItemWrapper>
        <img src={src} alt={name} />
        <ItemName>{name}</ItemName>
      </ItemWrapper>
    </ItemContainer>
  );
};
const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  z-index: 0;
`;
const ItemContainer = styled.div`
  background: #fff;
  padding: 20px;
  position: relative;
  border: 1px solid #7a9bb3;
  border-radius: 5px;
  margin: 0 10px 10px 0;
`;
const ItemName = styled.div`
  margin-top: 15px;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  img {
    width: 100%;
    border-radius: 5px;
    margin-top: 25px;
  }
`;
Item.propTypes = {
  onDelete: PropTypes.func,
  src: PropTypes.string,
  name: PropTypes.string,
};
Item.defaultProps = {
  onDelete: () => {},
  src: "",
  name: "",
};
export default ImageManager;
