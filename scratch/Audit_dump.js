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
    "x-component": "div",
    "x-id": "App_55_66",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "module-card",
      "x-file-name": "App",
      "x-line-number": "55",
      "x-column": "106",
      "x-component": "div",
      "x-id": "App_55_106",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        className: "eyebrow",
        "x-file-name": "App",
        "x-line-number": "55",
        "x-column": "135",
        "x-component": "p",
        "x-id": "App_55_135",
        "x-dynamic": "false",
        children: "ROLE MANAGEMENT"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 136
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
        "x-file-name": "App",
        "x-line-number": "55",
        "x-column": "177",
        "x-component": "h2",
        "x-id": "App_55_177",
        "x-dynamic": "false",
        children: "Authorized personnel"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 178
      }, this), [["SUPER ADMIN", "System management · security monitoring"], ["SENIOR INVESTIGATOR", "Network analysis · case comparison"], ["INVESTIGATING OFFICER", "Upload · assigned records · analysis"], ["READ-ONLY OFFICER", "View permitted records"]].map(([role, access]) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "role-row",
        "x-file-name": "App",
        "x-line-number": "55",
        "x-column": "471",
        "x-component": "div",
        "x-id": "App_55_471",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], {
          size: 15,
          "x-file-name": "App",
          "x-line-number": "55",
          "x-column": "508",
          "x-component": "Shield",
          "x-id": "App_55_508",
          "x-dynamic": "true"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 509
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          "x-file-name": "App",
          "x-line-number": "55",
          "x-column": "527",
          "x-component": "div",
          "x-id": "App_55_527",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
            "x-file-name": "App",
            "x-line-number": "55",
            "x-column": "532",
            "x-component": "strong",
            "x-id": "App_55_532",
            "x-dynamic": "true",
            "x-source-type": "unknown",
            "x-source-var": "role",
            "x-source-editable": "false",
            children: role
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 55,
            columnNumber: 533
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
            "x-file-name": "App",
            "x-line-number": "55",
            "x-column": "555",
            "x-component": "small",
            "x-id": "App_55_555",
            "x-dynamic": "true",
            "x-source-type": "unknown",
            "x-source-var": "access",
    