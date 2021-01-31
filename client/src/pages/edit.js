import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import EditHTML from "../components/elements/editHTML";
import EditCSS from "../components/elements/editCSS";
import ListContainer from "../components/wrappers/ListContainer";
import Button from "../components/elements/Buttons";
import MessagePreview from "../components/common/MessagePreview";
import Header from "../components/common/header";
import Typography from "../styles/Typography";
import { Main, Wrapper, BoardWrapper, TitleBlock } from "../styles/commonStyle";
import DeleteImage from "../components/modals/DeleteImageModal";
import { documentFile as doc, deleteDocument } from "../utils/api";
import SelectLang from "../components/elements/SelectLang";

const EditPage = () => {
  let history = useHistory();
  let { document } = useParams();
  const [currentDoc, setCurrentDoc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState(null);
  const [defaultContent, setDefaultContent] = useState("");
  const [currentCssFile, setCurrentCssFile] = useState(null);
  const [defaultStyles, setDefaultStyles] = useState("");
  const [lang, setLang] = useState('');

  useEffect(() => {
    doc(document).then((data) => {
      setCurrentDoc(data);
      setDefaultContent(data.content);
    });
  }, [document]);

  useEffect(() => {
    doc("styles.css").then((data) => {
      setCurrentCssFile(data);
      setDefaultStyles(data.content);
    });
  }, []);

  const onLang = useCallback((event)=>{
    event.preventDefault();
  const currentLang = event.target.value;
    setLang(currentLang);
  },[]);

  useEffect(() => {
    if (currentDoc) {
      setFileName(currentDoc.docName.split(".")[0]);
      setType(currentDoc.docName.split(".")[1]);
    }
  }, [currentDoc, document]);

  const [visible, setVisible] = useState("none");
  const onRemove = () => {
    setVisible("block");
  };

  const onCancel = () => {
    setVisible("none");
  };

  const onContent = useCallback(
    (value) => {
      if (currentDoc) {
        setDefaultContent(value);
      }
    },
    [currentDoc]
  );

  const onCss = useCallback(
    (value) => {
      if (currentCssFile) {
        setDefaultStyles(value);
      }
    },
    [currentCssFile]
  );

  const onConfirm = async () => {
    await deleteDocument(document);
    history.push("/");
  };

  return (
    <Main>
      <DeleteImage show={visible} onConfirm={onConfirm} onCancel={onCancel} />
      <Header />
      <Wrapper>
        <TitleBlock>
          <BoardWrapper>
            <Typography>Document Name: {document}</Typography>
          </BoardWrapper>
          <ButtonWrapper>
            <Button
              onClick={onRemove}
              children="Remove"
              styles={{ margin: "0 15px" }}
              view="light"
            />
          </ButtonWrapper>
        </TitleBlock>
        <BoardWrapper>
          <ListContainer styles={{ height: "-webkit-fill-available" }}>
            <EditHTML
              fileName={fileName}
              onContent={onContent}
              type={type}
              defaultContent={defaultContent}
            />
          </ListContainer>
          <ListContainer styles={{ height: "-webkit-fill-available" }}>
            <EditCSS onCss={onCss} defaultStyles={defaultStyles} />
          </ListContainer>
          <ListContainer styles={{ padding: "15px", height: "-webkit-fill-available" }}>
          <TitleBlock> 
            <Typography type="h2">Preview</Typography>
              <SelectLang onChange={onLang} styles={{width: '25%'}} />
          </TitleBlock>
            <MessagePreview
              defaultContent={defaultContent}
              styles={defaultStyles}
              lang={lang}
            />
          </ListContainer>
        </BoardWrapper>
      </Wrapper>
    </Main>
  );
};
const ButtonWrapper = styled.div`
  display: flex;
`;
export default EditPage;
