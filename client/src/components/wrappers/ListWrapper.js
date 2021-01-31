import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Buttons";
import Typography from "../../styles/Typography";

const ListWrapper = ({ data, onRemove, onSelect, selectedName }) => {
  let history = useHistory();

  function onEdit(fileName) {
    history.push(`/edit/${fileName}`);
  }

  return (
    <ListWrapperStyled>
      {data !== undefined &&
        data.map((i, index) => {
          const fileName = i.split(".")[0];
          const filePath =
            i.split(".")[0] + "." + i.split(".")[1] + ".mustache";
          return (
            <ItemWrapper
              key={index}
              style={{
                border: fileName === selectedName && "1px solid #a7c1d2",
              }}
            >
              <div
                onClick={(e) => onSelect(fileName, e)}
                style={{
                  flexBasis: "80%",
                }}
              >
                <Typography type="paragraph">{fileName}</Typography>
              </div>

              <div style={{ display: "flex", flexBasis: "20%" }}>
                <Button
                  view="transparent"
                  styles={{ marginRight: 5, padding: "0 10px" }}
                  onClick={(e) => onEdit(filePath, e)}
                  children={
                    <img
                      alt="Edit"
                      src="/images/edit.svg"
                      style={{ width: 16 }}
                    />
                  }
                />
                <Button
                  onClick={(fileName) => onRemove(filePath, fileName)}
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
    </ListWrapperStyled>
  );
};
const ListWrapperStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  flex-direction: column;
  border-top: 1px solid #f3f7f9;
`;
const ItemWrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px 0 5px 10px;
  border-bottom: 1px solid #f3f7f9;
  cursor: pointer;  
`;
ListWrapper.propTypes = {
  data: PropTypes.array,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func,
  onDownload: PropTypes.func,
  selectedName: PropTypes.string,
};
ListWrapper.defaultProps = {
  data: [],
  onRemove: () => {},
  onSelect: () => {},
  onDownload: () => {},
  selectedName: "",
};
export default ListWrapper;
