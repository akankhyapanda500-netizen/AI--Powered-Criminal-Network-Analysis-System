function Reports({
  api
}) {
  _s4();
  const [report, setReport] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const generate = async () => setReport((await api.get("/reports/summary")).data);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "module-card module-page",
    "x-file-name": "App",
    "x-line-number": "53",
    "x-column": "161",
    "x-component": "div",
    "x-id": "App_53_161",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
      className: "eyebrow",
      "x-file-name": "App",
      "x-line-number": "53",
      "x-column": "202",
      "x-component": "p",
      "x-id": "App_53_202",
      "x-dynamic": "false",
      children: "REPORT GENERATION / AUDITED EXPORT"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 203
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
      "x-file-name": "App",
      "x-line-number": "53",
      "x-column": "263",
      "x-component": "h2",
      "x-id": "App_53_263",
      "x-dynamic": "false",
      children: "Investigation reports"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 264
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
      className: "module-copy",
      "x-file-name": "App",
      "x-line-number": "53",
      "x-column": "293",
      "x-component": "p",
      "x-id": "App_53_293",
      "x-dynamic": "false",
      children: "Generate a source-linked summary for authorized review. Sensitive exports are logged."
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 294
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
      className: "primary-btn",
      "data-testid": "generate-report-button",
      onClick: generate,
      "x-file-name": "App",
      "x-line-number": "53",
      "x-column": "409",
      "x-component": "button",
      "x-id": "App_53_409",
      "x-dynamic": "false",
      children: ["Generate summary report ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
        size: 15,
        "x-file-name": "App",
        "x-line-number": "53",
        "x-column": "521",
        "x-component": "FileText",
        "x-id": "App_53_521",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 522
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 410
    }, this), report && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("pre", {
      className: "report-preview",
      "data-testid": "report-preview",
      "x-file-name": "App",
      "x-line-number": "53",
      "x-column": "562",
      "x-component": "pre",
      "x-id": "App_53_562",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: JSON.stringify(report, null, 2)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 563
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 53,
    columnNumber: 162
  }, this);
}
_s4(Reports, "9sXrEVMqNEWLjicNer4dTim2g1U=");
_c13 = Reports;
function Audit({
  audit
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "module-card module-page",
    "x-file-name": "App",
    "x-line-number": "54",
    "x-column": "35",
    "x-component": "div",
    "x-id": "App_54_35",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
      className: "eyebrow",
      "x-file-name": "App",
      "x-line-number": "54",
      "x-column": "76",
      "x-component": "p",
      "x-id": "App_54_76",
      "x-dynamic": "false",
      children: "SECURITY / IMMUTABLE ACTIVITY TRAIL"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 77
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
      "x-file-name": "App",
      "x-line-number": "54",
      "x-column": "138",
      "x-component": "h2",
      "x-id": "App_54_138",
      "x-dynamic": "false",
      children: "Audit log"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 139
    }, this), audit.map((item, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "audit-row",
      "data-testid": `audit-row-${index}`,
      "x-file-name": "App",
      "x-line-number": "54",
      "x-column": "184",
      "x-component": "div",
      "x-id": "App_54_184",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
        "x-file-name": "App",
        "x-line-number": "54",
        "x-column": "269",
        "x-component": "span",
        "x-id": "App_54_269",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: item.at ? new Date(item.at).toLocaleTimeString() : "—"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 270
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
        "x-file-name": "App",
        "x-line-number": "54",
        "x-column": "338",
        "x-component": "strong",
        "x-id": "App_54_338",
        "x-dynamic": "true",
        "x-source-type": "static-imported",
        "x-source-var": "audit",
        "x-source-path": "action",
        "x-source-editable": "false",
        "x-array-var": "audit",
        "x-array-item-param": "item",
        children: item.action
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 339
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
        "x-file-name": "App",
        "x-line-number": "54",
        "x-column": "368",
        "x-component": "small",
        "x-id": "App_54_368",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: ["Officer: ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "data-ve-dynamic": "true",
          "x-excluded": "true",
          style: {
            display: "contents"
          },
          "x-file-name": "App",
          "x-line-number": "54",
          "x-column": "368",
          "x-component": "small",
          "x-id": "App_54_368_expr1",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: item.officer_id || "system"
        }, void 0, false)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 54,
        columnNumber: 369
      }, this)]
    }, item.id || index, true, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 185
    }, this))]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 54,
    columnNumber: 36
  }, this);
}
_c14 = Audit;
function Administration({
  user,
  seedNational,
  loading
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "module-page admin-grid",
    "x-file-name": "App",
    "x-line-number": "55",
    "x-column": "66",
    "x-com