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
            "x-source-editable": "false",
            children: access
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 55,
            columnNumber: 556
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 528
        }, this)]
      }, role, true, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 472
      }, this))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 107
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "module-card",
      "x-file-name": "App",
      "x-line-number": "55",
      "x-column": "598",
      "x-component": "div",
      "x-id": "App_55_598",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        className: "eyebrow",
        "x-file-name": "App",
        "x-line-number": "55",
        "x-column": "627",
        "x-component": "p",
        "x-id": "App_55_627",
        "x-dynamic": "false",
        children: "SECURITY STATUS"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 628
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
        "x-file-name": "App",
        "x-line-number": "55",
        "x-column": "669",
        "x-component": "h2",
        "x-id": "App_55_669",
        "x-dynamic": "false",
        children: "Deployment controls"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 670
      }, this), ["Encrypted session cookies", "Role-based record access", "Audit logging active", "MFA capability ready", "Credential rotation policy ready", "DEMO dataset isolation"].map(item => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "security-row",
        "x-file-name": "App",
        "x-line-number": "55",
        "x-column": "880",
        "x-component": "div",
        "x-id": "App_55_880",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          className: "dot",
          "x-file-name": "App",
          "x-line-number": "55",
          "x-column": "921",
          "x-component": "span",
          "x-id": "App_55_921",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 922
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "x-file-name": "App",
          "x-line-number": "55",
          "x-column": "944",
          "x-component": "span",
          "x-id": "App_55_944",
          "x-dynamic": "true",
          "x-source-type": "static-local",
          "x-source-file": "/app/frontend/src/App.js",
          "x-source-file-abs": "/app/frontend/src/App.js",
          "x-source-line": "55",
          "x-source-editable": "true",
          "x-array-file": "/app/frontend/src/App.js",
          "x-array-line": "55",
          "x-array-item-param": "item",
          "x-array-inline": "true",
          children: item
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 945
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("b", {
          "x-file-name": "App",
          "x-line-number": "55",
          "x-column": "963",
          "x-component": "b",
          "x-id": "App_55_963",
          "x-dynamic": "false",
          children: "READY"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 55,
          columnNumber: 964
        }, this)]
      }, item, true, {
        fileName: _jsxFileName,
        line