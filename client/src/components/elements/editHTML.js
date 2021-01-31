import React, { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Button from "../../components/elements/Buttons";
import { CodeEdit, TitleBlock } from "../../styles/commonStyle";
import Typography from "../../styles/Typography";
import { createDocument } from "../../utils/api";

toast.configure();

const EditHTML = ({ onContent, fileName, type, defaultContent }) => {
  const notifySave = () => toast.success("File saved successfully!");
  const onCode = async (e) => {
    e.preventDefault();
    await createDocument(fileName, type, defaultContent);
  };

  const beautify = useCallback(() => {
    onContent(
      // eslint-disable-next-line no-undef
      html_beautify(defaultContent, {
        indent_size: 2,
        space_in_empty_parent: true,
      })
    );
  }, [defaultContent, onContent]);

  return (
    <div>
      <form onSubmit={onCode}>
        <TitleBlock>
          <Typography type="h2">Editor</Typography>
          <Button children="Save" onClick={notifySave} />
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
          />
        </TitleBlock>
        <CodeEdit
          placeholder="Enter code here"
          rows="41"
          onBlur={beautify}
          onChange={(e) => onContent(e.target.value)}
          value={defaultContent}
        />
      </form>
    </div>
  );
};
EditHTML.propTypes = {
  onContent: PropTypes.func,
  fileName: PropTypes.string,
  type: PropTypes.string,
  defaultContent: PropTypes.string,
};
EditHTML.defaultProps = {
  onContent: () => {},
  fileName: "",
  type: "",
  defaultContent: "",
};
export default EditHTML;
