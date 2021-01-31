import juice from "juice";
import jsdom from "jsdom";
import Mustache from "mustache";
const { JSDOM } = jsdom;

export const Mustacheizer = (content, style, variables) => {
    const juicedHTML = juice(
      `<style>${style}</style><body>${content}</body>`
    );
    const dom = new JSDOM(`<!DOCTYPE html>${juicedHTML}`);
    const body = dom.window.document.querySelector("body");
    const removeAttribute = (node, attr) => {
      if (node.removeAttribute) {
        node.removeAttribute(attr);
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
          removeAttribute(children[i], attr);
        }
      }
    };

    removeAttribute(body, "class");
    return Mustache.render(body.innerHTML, 
        variables
    ); 
  };