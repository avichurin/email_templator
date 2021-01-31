import styled from "styled-components";
export const CloseCross = styled.div`
  position: absolute;
  top: 3px;
  right: 41px;
  cursor: pointer;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 21px;
    left: 10px;
    width: 22px;
    height: 3px;
    background: #7a9bb3;
  }
  &:before {
    --webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &:after {
    --webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;
