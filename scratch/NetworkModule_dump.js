function NetworkModule({
  graph,
  criminals
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "network-layout",
    "x-file-name": "App",
    "x-line-number": "48",
    "x-column": "54",
    "x-component": "div",
    "x-id": "App_48_54",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "criminal-list",
      "x-file-name": "App",
      "x-line-number": "48",
      "x-column": "86",
      "x-component": "div",
      "x-id": "App_48_86",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "section-heading",
        "x-file-name": "App",
        "x-line-number": "48",
        "x-column": "117",
        "x-component": "div",
        "x-id": "App_48_117",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          "x-file-name": "App",
          "x-line-number": "48",
          "x-column": "150",
          "x-component": "div",
          "x-id": "App_48_150",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
            className: "eyebrow",
            "x-file-name": "App",
            "x-line-number": "48",
            "x-column": "155",
            "x-component": "p",
            "x-id": "App_48_155",
            "x-dynamic": "false",
            children: "RELATIONSHIP GRAPH / LEAD-ONLY"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 156
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
            "x-file-name": "App",
            "x-line-number": "48",
            "x-column": "212",
            "x-component": "h2",
            "x-id": "App_48_212",
            "x-dynamic": "false",
            children: "Network hubs"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 213
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 151
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          className: "index-count",
          "x-file-name": "App",
          "x-line-number": "48",
          "x-column": "239",
          "x-component": "span",
          "x-id": "App_48_239",
          "x-dynamic": "true",
          "x-source-type": "prop",
          "x-source-var": "graph",
          "x-source-path": "nodes.length",
          "x-source-editable": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            "data-ve-dynamic": "true",
            "x-excluded": "true",
            style: {
              display: "contents"
            },
            "x-file-name": "App",
            "x-line-number": "48",
            "x-column": "239",
            "x-component": "span",
            "x-id": "App_48_239_expr0",
            "x-dynamic": "true",
            "x-source-type": "prop",
            "x-source-var": "graph",
            "x-source-path": "nodes.length",
            "x-source-editable": "false",
            children: graph.nodes.length
          }, void 0, false), " nodes"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 240
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 118
      }, this), graph.hubs.slice(0, 8).map(hub => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "hub-row",
        "data-testid": `network-hub-${hub.id}`,
        "x-file-name": "App",
        "x-line-number": "48",
        "x-column": "345",
        "x-component": "div",
        "x-id": "App_48_345",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          className: `entity-icon ${hub.type}`,
          "x-file-name": "App",
          "x-line-number": "48",
          "x-column": "421",
          "x-component": "span",
          "x-id": "App_48_421",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: hub.type === "person" ? "P" : "N"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 422
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          "x-file-name": "App",
          "x-line-number": "48",
          "x-column": "507",
          "x-component": "div",
          "x-id": "App_48_507",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
            "x-file-name": "App",
            "x-line-number": "48",
            "x-column": "512",
            "x-component": "strong",
            "x-id": "App_48_512",
            "x-dynamic": "true",
            "x-source-type": "static-imported",
            "x-source-path": "label",
            "x-source-editable": "false",
            "x-array-item-param": "hub",
            children: hub.label
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 513
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
            "x-file-name": "App",
            "x-line-number": "48",
            "x-column": "540",
            "x-component": "small",
            "x-id": "App_48_540",
            "x-dynamic": "true",
            "x-source-type": "static-imported",
            "x-source-path": "type",
            "x-source-editable": "false",
            "x-array-item-param": "hub",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "App",
              "x-line-number": "48",
              "x-column": "540",
              "x-component": "small",
              "x-id": "App_48_540_expr0",
              "x-dynamic": "true",
              "x-source-type": "static-imported",
              "x-source-path": "type",
              "x-source-editable": "false",
              "x-array-item-param": "hub",
              children: hub.type
            }, void 0, false), " \xB7 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "App",
              "x-line-number": "48",
              "x-column": "540",
              "x-component": "small",
              "x-id": "App_48_540_expr2",
              "x-dynamic": "true",
              "x-source-type": "static-imported",
              "x-source-path": "degree",
              "x-source-editable": "false",
              "x-array-item-param": "hub",
              children: hub.degree
            }, void 0, false), " documented links"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 48,
            columnNumber: 541
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 48,
          columnNumber: 508
        }, this), /*#__PURE__*/(0,react_js