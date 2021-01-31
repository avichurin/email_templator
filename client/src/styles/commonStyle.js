import styled from "styled-components";

export const Main = styled.div`
  background: #f3f7f9;
  padding-bottom: 20px;
  height:100%;
  position: relative;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BoardWrapper = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
`;
export const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const CodeEdit = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  outline: none;
  border: 1px solid #f3f7f9;
  font-family: "Inter", sans-serif;
  &::placeholder {
    color: #7a9bb3;
  }
`;
export const StringsTextArea = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  outline: none;
  border: 1px solid #f3f7f9;
  font-family: "Inter", sans-serif;
  margin-top: 10px;
  &::placeholder {
    color: #7a9bb3;
  }
`;
