import config from "./config.json" assert { type: "json" };
import parser from "node-html-parser";
import findNewElements from "./elemsAdd/index.js";
const parse = parser.parse;

export default (html) => {
  const root = parse(html);
  const { txtId, altId, titleId, plchldrId, metaId } = config.id;
  const txtElems = root.querySelectorAll(`[${txtId}]`);
  const altAttrElems = root.querySelectorAll(`[${altId}]`);
  const titleAttrElems = root.querySelectorAll(`[${titleId}]`);
  const plchldrAttrElems = root.querySelectorAll(`[${plchldrId}]`);
  const metaElems = root.querySelectorAll(`[${metaId}]`);
  const newElems = findNewElements(root);
  const existingElemsLists = [];
  existingElemsLists.push(
    txtElems,
    altAttrElems,
    titleAttrElems,
    plchldrAttrElems,
    metaElems
  );
  //flatten arrays of nodeLists to get a single array of html elements
  const existingElems = [].concat.apply([], existingElemsLists);
  console.log(
    `Found a total of ${existingElems.length} HTML elements with an existing data-id in this HTML file.\n\n${newElems.length} new HTML elements were found.\n`
  );
  return {
    root: root,
    txtElems: txtElems,
    altAttrElems: altAttrElems,
    titleAttrElems: titleAttrElems,
    metaElems: metaElems,
    plchldrAttrElems: plchldrAttrElems,
    existingElems: existingElems,
    newElements: newElems,
  };
};
