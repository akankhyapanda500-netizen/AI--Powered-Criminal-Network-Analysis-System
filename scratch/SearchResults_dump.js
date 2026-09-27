function SearchResults({
  results,
  close
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "search-results",
    "data-testid": "search-results",
    "x-file-name": "App",
    "x-line-number": "56",
    "x-column": "52",
    "x-component": "div",
    "x-id": "App_56_52",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "section-heading",
      "x-file-name": "App",
      "x-line-number": "56",
      "x-column": "113",
      "x-component": "div",
      "x-id": "App_56_113",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h3", {
        "x-file-name": "App",
        "x-line-number": "56",
        "x-column": "146",
        "x-component": "h3",
        "x-id": "App_56_146",
        "x-dynamic": "false",
        children: "Authorized search results"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 147
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
        "data-testid": "close-search-results",
        onClick: close,
        "x-file-name": "App",
        "x-line-number": "56",
        "x-column": "180",
        "x-component": "button",
        "x-id": "App_56_180",
        "x-dynamic": "false",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], {
          size: 15
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 240
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 181
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 114
    }, this), results.map(item => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "search-result",
      "x-file-name": "App",
      "x-line-number": "56",
      "x-column": "291",
      "x-component": "div",
      "x-id": "App_56_291",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
        "x-file-name": "App",
        "x-line-number": "56",
        "x-column": "336",
        "x-component": "strong",
        "x-id": "App_56_336",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: item.demo_key || item.id.slice(0, 8)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 337
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
        "x-file-name": "App",
        "x-line-number": "56",
        "x-column": "391",
        "x-component": "span",
        "x-id": "App_56_391",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "App",
          "x-line-number": "56",
          "x-column": "391",
          "x-component": "span",
          "x-id": "App_56_391_expr0",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: item.district || item.station_id
        }, void 0, false), " \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "App",
          "x-line-number": "56",
          "x-column": "391",
          "x-component": "span",
          "x-id": "App_56_391_expr2",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "results",
          "x-source-path": "status",
          "x-source-editable": "false",
          "x-array-var": "results",
          "x-array-item-param": "item",
          children: item.status
        }, void 0, false)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 392
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
        "x-file-name": "App",
        "x-line-number": "56",
        "x-column": "454",
        "x-component": "small",
        "x-id": "App_56_454",
        "x-dynamic": "false",
        children: "Potential record match \u2014 officer verification required"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 455
      }, this)]
    }, item.id, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 292
    }, this))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 53
  }, this);
}
_c16 = SearchResults;
function Assistant({
  assistant,
  ask
}) {
  _s5();
  const [question, setQuestion] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Find previous FIRs mentioning this person.");
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "module-card module-page assistant-page",
    "x-file-name": "App",
    "x-line-number": "57",
    "x-column": "136",
    "x-component": "div",
    "x-id": "App_57_136",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "module-hero",
      "x-file-name": "App",
      "x-line-number": "57",
      "x-column": "192",
      "x-component": "div",
      "x-id": "App_57_192",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
        size: 22,
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "221",
        "x-component": "Bot",
        "x-id": "App_57_221",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 222
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        className: "eyebrow",
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "237",
        "x-component": "p",
        "x-id": "App_57_237",
        "x-dynamic": "false",
        children: "AI INVESTIGATIVE ASSISTANT / LEAD-ONLY"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 238
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "302",
        "x-component": "h2",
        "x-id": "App_57_302",
        "x-dynamic": "false",
        children: "Ask the authorized index"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 303
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "335",
        "x-component": "p",
        "x-id": "App_57_335",
        "x-dynamic": "false",
        children: "Answers cite available records and clearly say when verified information is unavailable."
      }, void 0, f