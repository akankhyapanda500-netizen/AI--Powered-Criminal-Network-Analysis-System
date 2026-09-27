function Dashboard({
  data,
  seedNational,
  loading,
  setView
}) {
  const d = data.dashboard || {};
  const cards = [["Total FIRs", d.total_firs || 0, "Database index"], ["Pending OCR", d.pending_ocr || 0, "Manual verification"], ["Active investigations", d.active_investigations || 0, "Milestone tracking"], ["Related leads", d.pending_verification || 0, "Officer verification"]];
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "command-banner",
      "x-file-name": "App",
      "x-line-number": "40",
      "x-column": "384",
      "x-component": "div",
      "x-id": "App_40_384",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        "x-file-name": "App",
        "x-line-number": "40",
        "x-column": "416",
        "x-component": "div",
        "x-id": "App_40_416",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          className: "eyebrow",
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "421",
          "x-component": "p",
          "x-id": "App_40_421",
          "x-dynamic": "false",
          children: "NATIONAL OVERVIEW / LEAD-ONLY SIGNALS"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 422
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "485",
          "x-component": "h2",
          "x-id": "App_40_485",
          "x-dynamic": "false",
          children: "Intelligence at a glance"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 486
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "518",
          "x-component": "p",
          "x-id": "App_40_518",
          "x-dynamic": "false",
          children: "Every match is a potential investigative lead. Final decisions remain with authorized officers."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 519
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 417
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
        className: "primary-btn",
        "data-testid": "seed-national-button",
        onClick: seedNational,
        disabled: loading,
        "x-file-name": "App",
        "x-line-number": "40",
        "x-column": "626",
        "x-component": "button",
        "x-id": "App_40_626",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          size: 15,
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "735",
          "x-component": "Globe2",
          "x-id": "App_40_735",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 736
        }, this), " Add national fictional dataset"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 627
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 385
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "metric-cards",
      "x-file-name": "App",
      "x-line-number": "40",
      "x-column": "800",
      "x-component": "div",
      "x-id": "App_40_800",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: cards.map(([label, value, note]) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "metric-card",
        "data-testid": `dashboard-${label.toLowerCase().replaceAll(" ", "-")}`,
        "x-file-name": "App",
        "x-line-number": "40",
        "x-column": "867",
        "x-component": "div",
        "x-id": "App_40_867",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "978",
          "x-component": "span",
          "x-id": "App_40_978",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-var": "label",
          "x-source-editable": "false",
          children: label
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 979
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "998",
          "x-component": "strong",
          "x-id": "App_40_998",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-var": "value",
          "x-source-editable": "false",
          children: value
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 999
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
          "x-file-name": "App",
          "x-line-number": "40",
          "x-column": "1022",
          "x-component": "small",
          "x-id": "App_40_1022",
          "x-dynamic": "true",
          "x-source-type": "unknown",
          "x-source-var": "note",
          "x-source-editable": "false",
          children: note
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 1023
        }, this)]
      }, label, true, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 868
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 801
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "dashboard-grid",
      "x-file-name": "App",
      "x-line-number": "40",
      "x-column": "1057",
      "x-component": "div",
      "x-id": "App_40_1057",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Chart, {
        title: "FIRs by state",
        values: d.by_state,
        "x-file-name": "App",
        "x-line-number": "40",
        "x-column": "1089",
        "x-component": "Chart",
        "x-id": "App_40_1089",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 1090
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Chart, {
        title: "Crime categories",
        values: d.by_category,
        "x-file-name": "App",
        "x-line-number": "40",
        "x-column": "1139",
        "x-component": "Chart",
        "x-id": "App_40_1139",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 1140
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Chart, {
        title: "Language coverage",
        values: d.by_language,
        "x-file-name": "App",
      