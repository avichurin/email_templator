import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { documentFile as doc, documents as docs } from "../../utils/api";
import { images } from "../../utils/image";
import { Mustacheizer } from "../../utils/Mustacheizer";

const MessagePreview = ({ defaultContent, styles, lang }) => {
    const [currentCssFile, setCurrentCssFile] = useState(styles);
    const [IMAGES, setIMAGES] = useState();
    const [STRINGS, setSTRINGS] = useState();
    const [PARTS, setPARTS] = useState();
    const [parsedStrings, setParsedStrings] = useState();
    const [rawParts, setRawParts] = useState();

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

    useEffect(() => {
        doc("strings.json").then((data) => {
            let strings = JSON.parse(data.content);
            setParsedStrings(strings);
        });
    }, []);

    useEffect(() => {
        let stringArr = {};
        for (let key in parsedStrings) {
            if (lang === "") {
                setSTRINGS(Object.assign(stringArr, { [`STR_${key}`]: parsedStrings[key].en }));
            } else {
                setSTRINGS(Object.assign(stringArr, { [`STR_${key}`]: parsedStrings[key][lang] }));
            }
        }
    }, [parsedStrings, lang]);

    useEffect(() => {
        docs().then(async (data) => {
            let docs = [];
            for (const docName of data) {
                const d = await doc(docName);
                docs.push({ doc: d, name: docName });
            }
            setRawParts(docs);
        });
    }, []);

    useEffect(() => {
        if (IMAGES && STRINGS && currentCssFile && rawParts) {
            let resultFile = {};
            for (const part of rawParts) {
                const [name, type] = part.name.split(".");
                if (type === "part") {
                    let onePart = part.doc;
                    let partItem = {
                        [`PART_${name.toUpperCase()}`]: Mustacheizer(onePart.content, currentCssFile, {
                            ...IMAGES,
                            ...STRINGS,
                        }),
                    };
                    resultFile = Object.assign(resultFile, partItem);
                }
            }
            setPARTS(resultFile);
        }
    }, [IMAGES, STRINGS, currentCssFile, rawParts]);

    useEffect(() => {
        doc("styles.css").then((data) => {
            setCurrentCssFile(data.content);
        });
    }, []);

    useEffect(() => {
        if (styles) {
            setCurrentCssFile(styles);
        }
    }, [styles]);

    const createMarkup = useCallback(() => {
        try {
            return {
                __html: Mustacheizer(defaultContent, currentCssFile, { ...IMAGES, ...STRINGS, ...PARTS }),
            };
        } catch (e) {
            return { __html: "<div>Error</div>" };
        }
    }, [defaultContent, currentCssFile, IMAGES, STRINGS, PARTS]);

    return <div dangerouslySetInnerHTML={createMarkup()} />;
};

MessagePreview.propTypes = {
    defaultContent: PropTypes.string,
    styles: PropTypes.string,
};
MessagePreview.defaultProps = {
    defaultContent: "",
    styles: "",
};
export default MessagePreview;
