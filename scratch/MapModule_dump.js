function MapModule({
  map
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "module-card module-page",
    "x-file-name": "App",
    "x-line-number": "50",
    "x-column": "37",
    "x-component": "div",
    "x-id": "App_50_37",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "section-heading",
      "x-file-name": "App",
      "x-line-number": "50",
      "x-column": "78",
      "x-component": "div",
      "x-id": "App_50_78",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        "x-file-name": "App",
        "x-line-number": "50",
        "x-column": "111",
        "x-component": "div",
        "x-id": "App_50_111",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          className: "eyebrow",
          "x-file-name": "App",
          "x-line-number": "50",
          "x-column": "116",
          "x-component": "p",
          "x-id": "App_50_116",
          "x-dynamic": "false",
          children: "MAP INTELLIGENCE / AUTHORIZED CASE LOCATIONS"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 117
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
          "x-file-name": "App",
          "x-line-number": "50",
          "x-column": "187",
          "x-component": "h2",
          "x-id": "App_50_187",
          "x-dynamic": "false",
          children: "India case concentration"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 188
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 112
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
        size: 20,
        "x-file-name": "App",
        "x-line-number": "50",
        "x-column": "226",
        "x-component": "Map",
        "x-id": "App_50_226",
        "x-dynamic": "false"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 227
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 79
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "india-abstract",
      "data-testid": "india-map",
      "x-file-name": "App",
      "x-line-number": "50",
      "x-column": "248",
      "x-component": "div",
      "x-id": "App_50_248",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "india-shape",
        "x-file-name": "App",
        "x-line-number": "50",
        "x-column": "304",
        "x-component": "div",
        "x-id": "App_50_304",
        "x-dynamic": "false",
        children: ["INDIA", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("br", {
          "x-file-name": "App",
          "x-line-number": "50",
          "x-column": "338",
          "x-component": "br",
          "x-id": "App_50_338",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 339
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
          "x-file-name": "App",
          "x-line-number": "50",
          "x-column": "343",
          "x-component": "small",
          "x-id": "App_50_343",
          "x-dynamic": "false",
          children: "DEMO MAP LAYER"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 344
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 305
      }, this), map.regions.map((region, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: `map-pin pin-${index % 6}`,
        title: region.state,
        "x-file-name": "App",
        "x-line-number": "50",
        "x-column": "414",
        "x-component": "div",
        "x-id": "App_50_414",
        "x-dynamic": "true",
        "x-source-type": "static-imported",
        "x-source-var": "map",
        "x-source-path": "regions.cases",
        "x-source-editable": "false",
        "x-array-var": "map",
        "x-array-item-param": "region",
        children: region.cases
      }, region.state, false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 415
      }, this))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 249
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "region-grid",
      "x-file-name": "App",
      "x-line-number": "50",
      "x-column": "526",
      "x-component": "div",
      "x-id": "App_50_526",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: map.regions.map(region => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "region-item",
        "data-testid": `map-region-${region.state}`,
        "x-file-name": "App",
        "x-line-number": "50",
        "x-column": "584",
        "x-component": "div",
        "x-id": "App_50_584",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
          "x-file-name": "App",
          "x-line-number": "50",
          "x-column": "675",
          "x-component": "strong",
          "x-id": "App_50_675",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "map",
          "x-source-path": "regions.state",
          "x-source-editable": "false",
          "x-array-var": "map",
          "x-array-item-param": "region",
          children: region.state
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 50,
          columnNumber: 676
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "x-file-name": "App",
          "x-line-number": "50",
          "x-column": "706",
          "x-component": "span",
          "x-id": "App_50_706",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "map",
          "x-source-path": "regions.cases",
          "x-source-editable": "false",
          "x-array-var": "map",
          "x-array-item-param": "region",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            "data-ve-dynamic": "true",
            "x-excluded": "true",
            style: {
              display: "contents"
            },
            "x-file-name": "App",
            "x-line-number": "50",
            "x-column": "706",
            "x-component": "span",
            "x-id": "App_50_706_expr0",
            "x-dynamic": "true",
            "x-source-type": "static-imported",
            "x-source-var": "map",
            "x-source-path": "regions.cases",
            "x-source-editable": "false",
            "x-array-var": "map",
            "x-array-item-param": "region",
            children: region.cases
          }, void 0, false), " FIRs \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            "data-v