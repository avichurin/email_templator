import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import StringsModal from "../components/modals/StringsModal";
import ListContainer from "../components/wrappers/ListContainer";
import Header from "../components/common/header";
import Typography from "../styles/Typography";
import { Main, Wrapper, BoardWrapper, TitleBlock } from "../styles/commonStyle";
import { documentFile as doc, deleteString } from "../utils/api";
import DeleteImage from "../components/modals/DeleteImageModal";
import Button from "../components/elements/Buttons";
toast.configure();

const Strings = () => {
  const [showStrings, setShowStrings] = useState("none");
  const [documents, setDocuments] = useState(null);
  const [visible, setVisible] = useState("none");
  const [selectedName, setSelectedName] = useState("");
  const [parsedString, setParsedString] = useState(null);
  const [stringsData, setStringsData] = useState(null);
  const [edit, setEdit] = useState(false);
  const notifySave = () => toast.success("File saved successfully!");

  const onStrings = () => {
    setSelectedName("");
    setParsedString(null);
    setShowStrings("block");
    setEdit(false);
    onToasty();
  };
  const onHideStrings = () => {
    setSelectedName("");
    setParsedString(null);
    setShowStrings("none");
  };
  const SetDoc = () => {
    doc("strings.json").then((data) => {
      setDocuments(data.content);
    });
  };

  useEffect(() => {
    SetDoc();
  }, []);

  useEffect(() => {
    if (documents) {
      setStringsData(JSON.parse(documents));
    }
  }, [documents]);

  const onSelect = (stringName) => {
    setSelectedName(stringName);
    setShowStrings("block");
    setParsedString(stringsData[stringName.toUpperCase()]);
    setEdit(true);
  };
  const onRemove = useCallback((stringName) => {
    setVisible("block");
    setSelectedName(stringName);
  }, []);

  const onConfirm = () => {
    deleteString(selectedName);
    SetDoc();
    setVisible("none");
  };

  const onUpdate = useCallback((update) => {
    if (update) {
      SetDoc();
    }
  }, []);

  const onToasty = useCallback((toast) => {
    if (toast) {
      notifySave();
    }
  }, []);

  const onCancel = () => {
    setVisible("none");
  };

  return (
    <Main>
      <DeleteImage show={visible} onConfirm={onConfirm} onCancel={onCancel} />
      <StringsModal
        show={showStrings}
        onClick={onHideStrings}
        name={selectedName}
        fileData={parsedString}
        edit={edit}
        onUpdate={onUpdate}
        onToasty={onToasty}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
      <Header />
      <Wrapper>
        <BoardWrapper>
          <Typography>Documents Strings</Typography>
          <TitleBlock style={{marginLeft: 40}}>
          <Button
                children="Create string"
                styles={{ padding: "0 15px" }}
                onClick={onStrings}
              />
          </TitleBlock>
        </BoardWrapper>
        <BoardWrapper>
          <ListContainer
            styles={{ overflowY: "scroll", height: "76vh", flexBasis: "45%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography type="h2">Documents</Typography>
            </div>
            <Typography type="label">Strings</Typography>
            {stringsData &&
              Object.keys(stringsData).map((i, index) => {
                const stringName = i;
                return (
                  <ItemWrapper
                    key={index}
                    style={{
                      paddingLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        flexBasis: "80%",
                      }}
                    >
                      <Typography type="paragraph">{stringName}</Typography>
                    </div>
                    <div style={{ display: "flex", flexBasis: "20%" }}>
                      <Button
                        view="transparent"
                        styles={{ marginRight: 5, padding: "0 10px" }}
                        onClick={(e) => onSelect(stringName, e)}
                        children={
                          <img
                            alt="Edit"
                            src="/images/edit.svg"
                            style={{ width: 16 }}
                          />
                        }
                      />
                      <Button
                        onClick={(e) => onRemove(stringName, e)}
                        view="transparent"
                        styles={{ padding: "0 10px" }}
                        children={
                          <img
                            alt="Delete"
                            src="/images/trash.svg"
                            style={{ width: 16 }}
                          />
                        }
                      />
                    </div>
                  </ItemWrapper>
                );
              })}
          </ListContainer>
        </BoardWrapper>
      </Wrapper>
    </Main>
  );
};

const ItemWrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f3f7f9;
  cursor: pointer;
`;

export default Strings;
