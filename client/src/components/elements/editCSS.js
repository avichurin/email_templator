import React, { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/elements/Buttons";
import { CodeEdit, TitleBlock } from "../../styles/commonStyle";
import Typography from "../../styles/Typography";
import { createStyle } from "../../utils/api";

const EditCSS = ({ onCss, defaultStyles }) => {
  const notifySave = () => toast.success("File saved successfully!");

  const beautify = useCallback(() => {
    onCss(
      // eslint-disable-next-line no-undef
      css_beautify(defaultStyles, {
        indent_size: 2,
        space_in_empty_parent: true,
      })
    );
  }, [defaultStyles, onCss]);

  const onCode = async (e) => {
    e.preventDefault();
    await createStyle("styles.css", defaultStyles);
  };

  return (
    <div>
      <form onSubmit={onCode}>
        <TitleBlock>
          <Typography type="h2">CSS global styles</Typography>
          <Button
            children="Save"
            type="submit"
            styles={{ marginLeft: 20 }}
            onClick={notifySave}
          />
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar
          />
        </TitleBlock>
        <CodeEdit
          onChange={(e) => onCss(e.target.value)}
          onBlur={beautify}
          placeholder="Enter code here"
          rows="41"
          value={defaultStyles}
        />
      </form>
    </div>
  );
};
EditCSS.propTypes = {
  onCss: PropTypes.func,
  defaultStyles: PropTypes.string,
};
EditCSS.defaultProps = {
  onCss: () => {},
  defaultStyles: "",
};
export default EditCSS;
