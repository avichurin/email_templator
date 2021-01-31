import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Typography = ({ children, type, styles }) => {
  switch (type) {
    case "h2":
      return <H2 style={styles}>{children}</H2>;
    case "subtitle":
      return <Subtitle style={styles}>{children}</Subtitle>;
    case "paragraph":
      return <Paragraph style={styles}>{children}</Paragraph>;
    case "label":
      return <Label style={styles}>{children}</Label>;
    case "MH1":
      return <MH1 style={styles}>{children}</MH1>;
    case "MH2":
      return <MH2 style={styles}>{children}</MH2>;
    case "MHLabel":
      return <MHLabel style={styles}>{children}</MHLabel>;
    case "MHFooter":
      return <MHFooter style={styles}>{children}</MHFooter>;
    case "MHParagraph":
      return <MHParagraph style={styles}>{children}</MHParagraph>;
    default:
      return <H1 style={styles}>{children}</H1>;
  }
};
const H1 = styled.h1`
  color: #000;
  font-size: 24px;
  padding: 15px 0;
`;
const H2 = styled.h2`
  color: #000;
  font-size: 18px;
`;
const Subtitle = styled.p`
  color: #000;
  font-size: 16px;
`;
const Paragraph = styled.p`
  margin: 5px 0;
  color: #000;
  font-size: 14px;
`;
const Label = styled.p`
  color: #000;
  font-size: 12px;
  text-transform: uppercase;
  color: #7a9bb3;
  font-weight: 800;
  margin-bottom: 5px;
`;
const MH1 = styled.h3`
  color: #000;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`;
const MH2 = styled.h4`
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;
const MHParagraph = styled.p`
  font-size: 13px;
`;
const MHLabel = styled.span`
  font-size: 11px;
`;
const MHFooter = styled.span`
  font-size: 12px;
  padding: 10px 0;
`;
Typography.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  type: PropTypes.string,
  styles: PropTypes.object,
};
Typography.defaultProps = {
  children: [] || "",
  type: "",
  styles: {},
};
export default Typography;
