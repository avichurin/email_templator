import React from "react";
import PropTypes from "prop-types";
import Select from "./Select";

const SelectLang = ({ onChange, styles }) => {
  return <Select onChange={onChange} styles={styles}>
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="tr">Turkish</option>
            <option value="pt">Portuguese</option>
            <option value="sv">Swedish</option>
            <option value="pl">Polish</option>
            <option value="nl">Dutch</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="id">Indonesian</option>
            <option value="da">Danish</option>
            <option value="no">Norwegian</option>
            <option value="hu">Hungarian</option>
            <option value="fi">Finnish</option>
            <option value="th">Thai</option>
            <option value="el">Greek</option>
            <option value="cs">Czech</option>
  </Select>;
};


SelectLang.propTypes = {
  onChange: PropTypes.func,
  styles: PropTypes.object,
};
SelectLang.defaultProps = {
  onChange: () => {},
  styles: {},
};
export default SelectLang;