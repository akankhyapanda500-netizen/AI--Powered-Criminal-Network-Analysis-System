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
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 336
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 193
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "assistant-input",
      "x-file-name": "App",
      "x-line-number": "57",
      "x-column": "436",
      "x-component": "div",
      "x-id": "App_57_436",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("input", {
        "data-testid": "assistant-question-input",
        value: question,
        onChange: e => setQuestion(e.target.value),
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "469",
        "x-component": "input",
        "x-id": "App_57_469",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 470
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
        className: "primary-btn",
        "data-testid": "assistant-ask-button",
        onClick: () => ask(question),
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "579",
        "x-component": "button",
        "x-id": "App_57_579",
        "x-dynamic": "false",
        children: ["Ask assistant ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          size: 15
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 57,
          columnNumber: 691
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 580
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 437
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "prompt-row",
      "x-file-name": "App",
      "x-line-number": "57",
      "x-column": "730",
      "x-component": "div",
      "x-id": "App_57_730",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: ["Summarize this FIR.", "Show cases related to this location.", "What similarities exist between Case A and Case B?"].map(prompt => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
        "data-testid": "assistant-prompt-button",
        onClick: () => {
          setQuestion(prompt);
          ask(prompt);
        },
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "894",
        "x-component": "button",
        "x-id": "App_57_894",
        "x-dynamic": "true",
        "x-source-type": "static-local",
        "x-source-file": "/app/frontend/src/App.js",
        "x-source-file-abs": "/app/frontend/src/App.js",
        "x-source-line": "57",
        "x-source-editable": "true",
        "x-array-file": "/app/frontend/src/App.js",
        "x-array-line": "57",
        "x-array-item-param": "prompt",
        "x-array-inline": "true",
        children: prompt
      }, prompt, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 895
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 731
    }, this), assistant && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "assistant-answer",
      "data-testid": "assistant-answer",
      "x-file-name": "App",
      "x-line-number": "57",
      "x-column": "1046",
      "x-component": "div",
      "x-id": "App_57_1046",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "1111",
        "x-component": "strong",
        "x-id": "App_57_1111",
        "x-dynamic": "true",
        "x-source-type": "prop",
        "x-source-var": "assistant",
        "x-source-path": "answer",
        "x-source-editable": "false",
        children: assistant.answer
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 1112
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        "x-file-name": "App",
        "x-line-number": "57",
        "x-column": "1146",
        "x-component": "p",
        "x-id": "App_57_1146",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: ["Sources used: ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "App",
          "x-line-number": "57",
          "x-column": "1146",
          "x-component": "p",
          "x-id": "App_57_1146_expr1",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: assistant.sources.join(" · ")
        },