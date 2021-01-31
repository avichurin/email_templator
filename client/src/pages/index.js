import React, { useEffect, useState, useCallback } from "react";
import ListWrapper from "../components/wrappers/ListWrapper";
import ListContainer from "../components/wrappers/ListContainer";
import Header from "../components/common/header";
import Typography from "../styles/Typography";
import MessagePreview from "../components/common/MessagePreview";
import EditCSS from "../components/elements/editCSS";
import { Main, Wrapper, BoardWrapper, TitleBlock } from "../styles/commonStyle";
import { documentFile as doc, documents as docs, deleteDocument, downloadAllFiles } from "../utils/api";
import { images } from "../utils/image";
import DeleteImage from "../components/modals/DeleteImageModal";
import Button from "../components/elements/Buttons";
import SelectLang from "../components/elements/SelectLang";
import { Mustacheizer } from "../utils/Mustacheizer";

const App = () => {
    const [documents, setDocuments] = useState(null);
    const [visible, setVisible] = useState("none");
    const [defaultStyles, setDefaultStyles] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [IMAGES, setIMAGES] = useState(null);
    const [STRINGS, setSTRINGS] = useState("");
    const [PARTS, setPARTS] = useState();
    const [lang, setLang] = useState("");

    const onSelect = (fileName) => {
        if (fileName) {
            setSelectedName(fileName);
            docs().then((data) => {
                data.map((i) => {
                    if (i.split(".").shift() === fileName) {
                        doc(i).then((data) => {
                            setSelectedFile(data.content);
                        });
                    }
                    return null;
                });
            });
        }
        return null;
    };

    const onLang = useCallback((event) => {
        event.preventDefault();
        const currentLang = event.target.value;
        setLang(currentLang);
    }, []);

    const sortType = useCallback(
        (type) => {
            if (documents != null) {
                let arr = [];
                documents.forEach((i) => {
                    let fileType = i.split(".")[1];
                    if (fileType === type) {
                        arr.push(i);
                    }
                });
                return arr;
            }
        },
        [documents]
    );

    useEffect(() => {
        docs().then((data) => {
            setDocuments(data);
        });
    }, []);

    const replaceStr = (content, backwards = false) => {
        let matches = null;
        if (backwards) {
            matches = content.match(/(\/\/\/STR_[0-9A-Z_-]+\\\\\\)/gi) || [];
            matches = matches.concat(content.match(/(\/\/\/LINK_[0-9A-Z_-]+\\\\\\)/gi) || []);
        } else {
            matches = content.match(/(\{\{\{STR_[0-9A-Z_-]+\}\}\})/gi) || [];
            matches = matches.concat(content.match(/(\{\{\{LINK_[0-9A-Z_-]+\}\}\})/gi) || []);
        }
        if (matches) {
            for (const match of matches) {
                let updated;
                if (backwards) {
                    updated = match.replace("///", "{{{").replace("\\\\\\", "}}}");
                } else {
                    updated = match.replace("{{{", "///").replace("}}}", "\\\\\\");
                }

                content = content.replace(match, updated);
            }
        }
        return content;
    };

    useEffect(() => {
        if (IMAGES && !PARTS && defaultStyles) {
            (async () => {
                let resultFile = {};
                for (let i = 0; i < documents.length; i++) {
                    const [name, type] = documents[i].split(".");
                    if (type === "part") {
                        let onePart = await doc(documents[i]);
                        let partItem = {
                            [`PART_${name.toUpperCase()}`]: replaceStr(
                                Mustacheizer(replaceStr(onePart.content), defaultStyles, {
                                    ...IMAGES,
                                }),
                                true
                            ),
                        };
                        resultFile = Object.assign(resultFile, partItem);
                    }
                }
                setPARTS(resultFile);
            })();
        }
    }, [IMAGES, PARTS, defaultStyles, documents]);

    useEffect(() => {
        doc("styles.css").then((data) => {
            setDefaultStyles(data.content);
        });
    }, []);

    useEffect(() => {
        doc("strings.json").then((data) => {
            let strings = JSON.parse(data.content);
            let stringArr = {};
            for (let key in strings) {
                let string = { [`STR_${key}`]: strings[key] };
                stringArr = Object.assign(stringArr, string);
            }
            setSTRINGS(stringArr);
        });
    }, []);

    useEffect(() => {
        images().then((data) => {
            var filtered = data.files.filter(function (el) {
                return el != null;
            });
            let image = Object.fromEntries(
                filtered.map((n) => ["IMG_" + n.name.split(".").join("_").toUpperCase(), n.url])
            );
            setIMAGES(image);
        });
    }, []);

    const [name, setFilename] = useState("");

    const onRemove = useCallback((fileName) => {
        setVisible("block");
        setFilename(fileName);
    }, []);

    const onConfirm = async () => {
        await deleteDocument(name);
        docs().then((data) => {
            setDocuments(data);
        });
        setVisible("none");
    };

    const onCancel = () => {
        setVisible("none");
    };

    const onDownloadAll = async () => {
        const resultFile = {
            emails: {},
            news: {},
            strings: STRINGS,
        };

        for (const docName of documents) {
            const [name, type, extension] = docName.split(".");

            if (extension === "mustache" && ["email", "news"].includes(type)) {
                const res = await doc(docName);
                const content = replaceStr(
                    Mustacheizer(replaceStr(res.content), defaultStyles, {
                        ...IMAGES,
                        ...PARTS,
                    }),
                    true
                );
                const pluralType = type === "email" ? "emails" : "news";
                resultFile[pluralType][name.toUpperCase()] = content;
            }
        }
        await downloadAllFiles(JSON.stringify(resultFile));
    };

    const onCss = useCallback(
        (value) => {
            if (defaultStyles) {
                setDefaultStyles(value);
            }
        },
        [defaultStyles]
    );

    return (
        <Main>
            <DeleteImage show={visible} onConfirm={onConfirm} onCancel={onCancel} />
            <Header />
            <Wrapper>
                <BoardWrapper>
                    <Typography>Documents List</Typography>
                    <TitleBlock style={{ marginLeft: 40 }}>
                        <Button children="Download all" styles={{ padding: "0 15px" }} onClick={onDownloadAll} />
                    </TitleBlock>
                </BoardWrapper>
                <BoardWrapper>
                    <ListContainer styles={{ overflowY: "scroll", height: "76vh" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography type="h2">Documents</Typography>
                        </div>
                        <Typography type="label">E-Mails</Typography>
                        <ListWrapper
                            data={sortType("email")}
                            onRemove={onRemove}
                            onSelect={onSelect}
                            selectedName={selectedName}
                        />
                        <Typography type="label">News</Typography>
                        <ListWrapper
                            data={sortType("news")}
                            onRemove={onRemove}
                            onSelect={onSelect}
                            selectedName={selectedName}
                        />
                        <Typography type="label">Parts</Typography>
                        <ListWrapper
                            data={sortType("part")}
                            onRemove={onRemove}
                            onSelect={onSelect}
                            selectedName={selectedName}
                        />
                    </ListContainer>
                    <ListContainer styles={{ padding: "15px", height: "-webkit-fill-available" }}>
                        <TitleBlock>
                            <Typography type="h2">Preview</Typography>
                            <SelectLang onChange={onLang} styles={{ width: "25%" }} />
                        </TitleBlock>
                        <MessagePreview defaultContent={selectedFile} styles={defaultStyles} lang={lang} />
                    </ListContainer>
                    <ListContainer styles={{ height: "-webkit-fill-available" }}>
                        <EditCSS onCss={onCss} defaultStyles={defaultStyles} />
                    </ListContainer>
                </BoardWrapper>
            </Wrapper>
        </Main>
    );
};

export default App;
