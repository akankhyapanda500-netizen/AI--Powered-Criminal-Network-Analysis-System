function FaceModule() {
  _s3();
  const [ran, setRan] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "module-card module-page",
    "x-file-name": "App",
    "x-line-number": "49",
    "x-column": "70",
    "x-component": "div",
    "x-id": "App_49_70",
    "x-dynamic": "true",
    "x-source-type": "computed",
    "x-source-editable": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "module-hero",
      "x-file-name": "App",
      "x-line-number": "49",
      "x-column": "111",
      "x-component": "div",
      "x-id": "App_49_111",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        className: "eyebrow",
        "x-file-name": "App",
        "x-line-number": "49",
        "x-column": "140",
        "x-component": "p",
        "x-id": "App_49_140",
        "x-dynamic": "false",
        children: "AUTHORIZED BIOMETRIC ASSISTANCE / DEMO"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 141
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
        "x-file-name": "App",
        "x-line-number": "49",
        "x-column": "205",
        "x-component": "h2",
        "x-id": "App_49_205",
        "x-dynamic": "false",
        children: "Face similarity search"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 206
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
        "x-file-name": "App",
        "x-line-number": "49",
        "x-column": "236",
        "x-component": "p",
        "x-id": "App_49_236",
        "x-dynamic": "false",
        children: "Fictional candidate images only. This module returns potentially similar faces, never positive identification."
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 237
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
        className: "primary-btn",
        "data-testid": "run-face-demo-button",
        onClick: () => setRan(true),
        "x-file-name": "App",
        "x-line-number": "49",
        "x-column": "353",
        "x-component": "button",
        "x-id": "App_49_353",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"], {
          size: 15,
          "x-file-name": "App",
          "x-line-number": "49",
          "x-column": "449",
          "x-component": "UserCheck",
          "x-id": "App_49_449",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 450
        }, this), " Run fictional comparison"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 354
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 112
    }, this), ran && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "face-result",
      "data-testid": "face-result",
      "x-file-name": "App",
      "x-line-number": "49",
      "x-column": "519",
      "x-component": "div",
      "x-id": "App_49_519",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "warning-callout",
        "x-file-name": "App",
        "x-line-number": "49",
        "x-column": "574",
        "x-component": "div",
        "x-id": "App_49_574",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          size: 16,
          "x-file-name": "App",
          "x-line-number": "49",
          "x-column": "607",
          "x-component": "AlertTriangle",
          "x-id": "App_49_607",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 608
        }, this), " AI similarity result is an investigative lead and must not be treated as positive identification without authorized verification."]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 575
      }, this), ["Candidate A · DEMO", "Candidate B · DEMO"].map((label, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "face-candidate",
        "x-file-name": "App",
        "x-line-number": "49",
        "x-column": "837",
        "x-component": "div",
        "x-id": "App_49_837",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          className: `face-avatar face-${index}`,
          "x-file-name": "App",
          "x-line-number": "49",
          "x-column": "881",
          "x-component": "span",
          "x-id": "App_49_881",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: index ? "B" : "A"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 49,
          columnNumber: 882
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          "x-file-name": "App",
          "x-line-number": "49",
          "x-column": "953",
          "x-component": "div",
          "x-id": "App_49_953",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
            "x-file-name": "App",
            "x-line-number": "49",
            "x-column": "958",
            "x-component": "strong",
            "x-id": "App_49_958",
            "x-dynamic": "true",
            "x-source-type": "static-local",
            "x-source-file": "/app/frontend/src/App.js",
            "x-source-file-abs": "/app/frontend/src/App.js",
            "x-source-line": "49",
            "x-source-editable": "true",
            "x-array-file": "/app/frontend/src/App.js",
            "x-array-line": "49",
            "x-array-item-param": "label",
            "x-array-inline": "true",
            children: label
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 49,
            columnNumber: 959
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
            "x-file-name": "App",
            "x-line-number": "49",
            "x-column": "982",
            "x-component": "small",
            "x-id": "App_49_982",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: ["Source: fictional authorized image set \xB7 Case DEMO-", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "App",
              "x-line-number": "49",
              "x-column": "982",
              "x-component": "small",
              "x-id": "App_49_982_expr1",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: index + 1
        