function Investigate({
  text,
  setText,
  analyze,
  upload,
  loading,
  result,
  translate,
  translation,
  lang,
  data
}) {
  var _data$graph$hubs, _result$fir, _result$extraction, _result$extraction$na, _result$extraction2, _result$extraction2$l, _result$extraction3, _result$extraction4, _result$fir2, _result$related_cases;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("section", {
      className: "work-grid",
      "x-file-name": "App",
      "x-line-number": "43",
      "x-column": "121",
      "x-component": "section",
      "x-id": "App_43_121",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "input-panel",
        "x-file-name": "App",
        "x-line-number": "43",
        "x-column": "152",
        "x-component": "div",
        "x-id": "App_43_152",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "panel-head",
          "x-file-name": "App",
          "x-line-number": "43",
          "x-column": "181",
          "x-component": "div",
          "x-id": "App_43_181",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
            "x-file-name": "App",
            "x-line-number": "43",
            "x-column": "209",
            "x-component": "div",
            "x-id": "App_43_209",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
              className: "eyebrow",
              "x-file-name": "App",
              "x-line-number": "43",
              "x-column": "214",
              "x-component": "p",
              "x-id": "App_43_214",
              "x-dynamic": "false",
              children: "01 / INGEST & PRESERVE"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 215
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
              "x-file-name": "App",
              "x-line-number": "43",
              "x-column": "263",
              "x-component": "h2",
              "x-id": "App_43_263",
              "x-dynamic": "false",
              children: "New FIR signal"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 264
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 210
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"], {
            size: 19,
            "x-file-name": "App",
            "x-line-number": "43",
            "x-column": "292",
            "x-component": "Upload",
            "x-id": "App_43_292",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 293
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 182
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("textarea", {
          "data-testid": "fir-text-input",
          value: text,
          onChange: e => setText(e.target.value),
          placeholder: "Paste FIR text here...",
          "x-file-name": "App",
          "x-line-number": "43",
          "x-column": "317",
          "x-component": "textarea",
          "x-id": "App_43_317",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 318
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "input-actions",
          "x-file-name": "App",
          "x-line-number": "43",
          "x-column": "449",
          "x-component": "div",
          "x-id": "App_43_449",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("label", {
            className: "upload-btn",
            "x-file-name": "App",
            "x-line-number": "43",
            "x-column": "480",
            "x-component": "label",
            "x-id": "App_43_480",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"], {
              size: 15,
              "x-file-name": "App",
              "x-line-number": "43",
              "x-column": "510",
              "x-component": "Upload",
              "x-id": "App_43_510",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 511
            }, this), " Upload scan / PDF", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("input", {
              "data-testid": "fir-file-input",
              type: "file",
              accept: ".txt,.pdf,.png,.jpg,.jpeg",
              onChange: upload,
              "x-file-name": "App",
              "x-line-number": "43",
              "x-column": "547",
              "x-component": "input",
              "x-id": "App_43_547",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 548
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 481
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
            "data-testid": "analyze-fir-button",
            className: "primary-btn",
            onClick: analyze,
            disabled: loading,
            "x-file-name": "App",
            "x-line-number": "43",
            "x-column": "657",
            "x-component": "button",
            "x-id": "App_43_657",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: [loading ? "Processing..." : "Extract intelligence", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
              size: 16
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 812
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 43,
            columnNumber: 658
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 450
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          className: "microcopy",
          "x-file-name": "App",
          "x-line-number": "43",
          "x-column": "851",
          "x-component": "p",
          "x-id": "App_43_851",
          "x-dynamic": "false",
          children: "Original document preserved \xB7 every extracted field requires officer verification"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 43,
          columnNumber: 852
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 153
      }, this), /*#__PU