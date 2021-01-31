import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../elements/Buttons";
import { CloseCross } from "../elements/CloseCross";
import { CodeEdit } from "../../styles/commonStyle";
import ModalWindow from "./ModalWindow";
import TextInput from "../elements/TextInput";
import Typography from "../../styles/Typography";
import { createStyle } from "../../utils/api";

const StringsModal = ({
  show,
  onClick,
  name,
  fileData,
  edit,
  onUpdate,
  onToasty,
}) => {
  const [fileName, setFileName] = useState(name || "");
  const [en, setEn] = useState((fileData && fileData.en) || "");
  const [ru, setRu] = useState((fileData && fileData.ru) || "");
  const [es, setEs] = useState((fileData && fileData.es) || "");
  const [it, setIt] = useState((fileData && fileData.it) || "");
  const [de, setDe] = useState((fileData && fileData.de) || "");
  const [fr, setFr] = useState((fileData && fileData.fr) || "");
  const [tr, setTr] = useState((fileData && fileData.tr) || "");
  const [pt, setPt] = useState((fileData && fileData.pt) || "");
  const [sv, setSv] = useState((fileData && fileData.sv) || "");
  const [pl, setPl] = useState((fileData && fileData.pl) || "");
  const [nl, setNl] = useState((fileData && fileData.nl) || "");
  const [ja, setJa] = useState((fileData && fileData.ja) || "");
  const [ko, setKo] = useState((fileData && fileData.ko) || "");
  const [id, setId] = useState((fileData && fileData.id) || "");
  const [da, setDa] = useState((fileData && fileData.da) || "");
  const [no, setNo] = useState((fileData && fileData.no) || "");
  const [hu, setHu] = useState((fileData && fileData.hu) || "");
  const [fi, setFi] = useState((fileData && fileData.fi) || "");
  const [th, setTh] = useState((fileData && fileData.th) || "");
  const [el, setEl] = useState((fileData && fileData.el) || "");
  const [cs, setCs] = useState((fileData && fileData.cs) || "");
  const [fail, setFail] = useState(false);

  useEffect(() => {
    setFileName(name);
    if (fileData) {
      setEn(fileData.en);
      setRu(fileData.ru);
      setEs(fileData.es);
      setIt(fileData.it);
      setDe(fileData.de);
      setFr(fileData.fr);
      setTr(fileData.tr);
      setPt(fileData.pt);
      setSv(fileData.sv);
      setPl(fileData.pl);
      setNl(fileData.nl);
      setJa(fileData.ja);
      setKo(fileData.ko);
      setId(fileData.id);
      setDa(fileData.da);
      setNo(fileData.no);
      setHu(fileData.hu);
      setFi(fileData.fi);
      setTh(fileData.th);
      setEl(fileData.el);
      setCs(fileData.cs);
    }
  }, [fileData, name]);

  const onValueName = (e) => {
    e.preventDefault();
    setFileName(e.target.value.replace(/\s/g, "").toLowerCase());
  };

  const onValue = useCallback((lang, e) => {
    e.preventDefault();
    switch (lang) {
      case "ru":
        setRu(e.target.value);
        break;
      case "es":
        setEs(e.target.value);
        break;
      case "it":
        setIt(e.target.value);
        break;
      case "de":
        setDe(e.target.value);
        break;
      case "fr":
        setFr(e.target.value);
        break;
      case "tr":
        setTr(e.target.value);
        break;
      case "pt":
        setPt(e.target.value);
        break;
      case "sv":
        setSv(e.target.value);
        break;
      case "pl":
        setPl(e.target.value);
        break;
      case "nl":
        setNl(e.target.value);
        break;
      case "ja":
        setJa(e.target.value);
        break;
      case "ko":
        setKo(e.target.value);
        break;
      case "id":
        setId(e.target.value);
        break;
      case "da":
        setDa(e.target.value);
        break;
      case "no":
        setNo(e.target.value);
        break;
      case "hu":
        setHu(e.target.value);
        break;
      case "fi":
        setFi(e.target.value);
        break;
      case "th":
        setTh(e.target.value);
        break;
      case "el":
        setEl(e.target.value);
        break;
      case "cs":
        setCs(e.target.value);
        break;
      default:
        setEn(e.target.value);
    }
  }, []);

  const onContent = async (e) => {
    e.preventDefault();
    if (fileName) {
      await createStyle("strings.json", {
        [fileName.split(".").join("_").toUpperCase()]: {
          en,
          ru,
          es,
          it,
          de,
          fr,
          tr,
          pt,
          sv,
          pl,
          nl,
          ja,
          ko,
          id,
          da,
          no,
          hu,
          fi,
          th,
          el,
          cs,
        },
      });
      onClick();
      onToasty(true);
    } else {
      setFail(true);
      return null;
    }
    onUpdate(true);
  };

  const onClose = useCallback(() => {
    setFileName("");
    setEn("");
    setRu("");
    setEs("");
    setIt("");
    setDe("");
    setFr("");
    setTr("");
    setPt("");
    setSv("");
    setPl("");
    setNl("");
    setJa("");
    setKo("");
    setId("");
    setDa("");
    setNo("");
    setHu("");
    setFi("");
    setTh("");
    setEl("");
    setCs("");
    onClick();
  }, [onClick]);

  return (
    <ModalWindow show={show} margin="5% auto">
      <CloseCross onClick={onClose} />
      <Typography>{edit ? "Edit string" : "Create new string"}</Typography>
      {fail && (
        <Typography
          type="label"
          styles={{
            textAlign: "center",
            color: "rgb(234 104 55)",
            width: "100%",
          }}
        >
          File name are required
        </Typography>
      )}
      <form onSubmit={onContent}>
        <Typography type="label">Alias</Typography>
        <TextInput
          type="text"
          onChange={(e) => onValueName(e)}
          placeholder="Enter string name"
          value={fileName}
        />
      <StringsWrapper>
        <StringsColumn>
          <StringsLabel >English</StringsLabel>
           <CodeEdit
          onChange={(e) => onValue("en", e)}
          placeholder="English"
          rows="1"
          value={en}
        />
         <StringsLabel >Russian</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("ru", e)}
          placeholder="Russian"
          rows="1"
          value={ru}
        />
         <StringsLabel >Spanish</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("es", e)}
          placeholder="Spanish"
          rows="1"
          value={es}
        />
         <StringsLabel >Italian</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("it", e)}
          placeholder="Italian"
          rows="1"
          value={it}
        />
         <StringsLabel >German</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("de", e)}
          placeholder="German"
          rows="1"
          value={de}
        />
         <StringsLabel >French</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("fr", e)}
          placeholder="French"
          rows="1"
          value={fr}
        />
         <StringsLabel >Turkish</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("tr", e)}
          placeholder="Turkish"
          rows="1"
          value={tr}
        />
        </StringsColumn>
        <StringsColumn style={{margin: '0 20px'}}>
        <StringsLabel >Portuguese</StringsLabel>
          <CodeEdit
          onChange={(e) => onValue("pt", e)}
          placeholder="Portuguese"
          rows="1"
          value={pt}
        />
         <StringsLabel >Swedish</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("sv", e)}
          placeholder="Swedish"
          rows="1"
          value={sv}
        />
         <StringsLabel >Polish</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("pl", e)}
          placeholder="Polish"
          rows="1"
          value={pl}
        />
         <StringsLabel >Dutch</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("nl", e)}
          placeholder="Dutch"
          rows="1"
          value={nl}
        />
         <StringsLabel >Japanese</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("ja", e)}
          placeholder="Japanese"
          rows="1"
          value={ja}
        />
         <StringsLabel >Korean</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("ko", e)}
          placeholder="Korean"
          rows="1"
          value={ko}
        />
         <StringsLabel >Indonesian</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("id", e)}
          placeholder="Indonesian"
          rows="1"
          value={id}
        />
        </StringsColumn>
        <StringsColumn>
        <StringsLabel >Danish</StringsLabel>
           <CodeEdit
          onChange={(e) => onValue("da", e)}
          placeholder="Danish"
          rows="1"
          value={da}
        />
         <StringsLabel >Norwegian</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("no", e)}
          placeholder="Norwegian"
          rows="1"
          value={no}
        />
         <StringsLabel >Hungarian</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("hu", e)}
          placeholder="Hungarian"
          rows="1"
          value={hu}
        />
         <StringsLabel >Finnish</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("fi", e)}
          placeholder="Finnish"
          rows="1"
          value={fi}
        />
         <StringsLabel >Thai</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("th", e)}
          placeholder="Thai"
          rows="1"
          value={th}
        />
         <StringsLabel >Greek</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("el", e)}
          placeholder="Greek"
          rows="1"
          value={el}
        />
         <StringsLabel >Czech</StringsLabel>
        <CodeEdit
          onChange={(e) => onValue("cs", e)}
          placeholder="Czech"
          rows="1"
          value={cs}
        />
        </StringsColumn>
      </StringsWrapper>
        <Button children="Save" type="submit" view="modal" styles={{margin: '50px auto 0 auto'}}/>
      </form>
    </ModalWindow>
  );
};
const StringsWrapper = styled.div`
display: flex;
justify-content: space-between;
`;
const StringsLabel = styled.span`
  font-size: 10px;
  color: #7a9bb3;
  text-transform: uppercase;
  margin: 5px 0;
`;
const StringsColumn = styled.div`
display: flex;
flex-direction: column;
width: 300px;
`;
TextInput.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.string,
  name: PropTypes.string,
  onUpdate: PropTypes.func,
  fileData: PropTypes.object,
  edit: PropTypes.bool,
  onToasty: PropTypes.bool,
};
TextInput.defaultProps = {
  onClick: () => {},
  show: "",
  name: "",
  onUpdate: () => {},
  fileData: {},
  edit: false,
  onToasty: false,
};
export default StringsModal;
