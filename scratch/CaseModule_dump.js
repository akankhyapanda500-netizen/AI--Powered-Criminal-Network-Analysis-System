function CaseModule({
  cases,
  selected,
  setSelected,
  api,
  refresh
}) {
  _s2();
  const [detail, setDetail] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (selected !== null && selected !== void 0 && selected.id) api.get(`/firs/${selected.id}`).then(r => setDetail(r.data));
  }, [selected, api]);
  const advance = async () => {
    if (!detail) return;
    const r = await api.patch(`/firs/${detail.id}`, {
      progress: Math.min(100, (detail.progress || 0) + 10),
      note: "Officer completed milestone review"
    });
    setDetail(r.data);
    await refresh();
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "case-layout",
    "x-file-name": "App",
    "x-line-number": "47",
    "x-column": "483",
    "x-component": "div",
    "x-id": "App_47_483",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "case-list",
      "x-file-name": "App",
      "x-line-number": "47",
      "x-column": "512",
      "x-component": "div",
      "x-id": "App_47_512",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "section-heading",
        "x-file-name": "App",
        "x-line-number": "47",
        "x-column": "539",
        "x-component": "div",
        "x-id": "App_47_539",
        "x-dynamic": "false",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          "x-file-name": "App",
          "x-line-number": "47",
          "x-column": "572",
          "x-component": "div",
          "x-id": "App_47_572",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
            className: "eyebrow",
            "x-file-name": "App",
            "x-line-number": "47",
            "x-column": "577",
            "x-component": "p",
            "x-id": "App_47_577",
            "x-dynamic": "false",
            children: "CASE MANAGEMENT"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 578
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
            "x-file-name": "App",
            "x-line-number": "47",
            "x-column": "619",
            "x-component": "h2",
            "x-id": "App_47_619",
            "x-dynamic": "false",
            children: "Investigations"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 620
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 573
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 540
      }, this), cases.map(item => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
        className: `case-row ${(selected === null || selected === void 0 ? void 0 : selected.id) === item.id ? "case-selected" : ""}`,
        "data-testid": `case-row-${item.id}`,
        onClick: () => setSelected(item),
        "x-file-name": "App",
        "x-line-number": "47",
        "x-column": "675",
        "x-component": "button",
        "x-id": "App_47_675",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          className: "case-code",
          "x-file-name": "App",
          "x-line-number": "47",
          "x-column": "841",
          "x-component": "span",
          "x-id": "App_47_841",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: item.demo_key || item.id.slice(0, 6)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 842
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
          "x-file-name": "App",
          "x-line-number": "47",
          "x-column": "914",
          "x-component": "strong",
          "x-id": "App_47_914",
          "x-dynamic": "true",
          "x-source-type": "computed",
          "x-source-editable": "false",
          children: item.crime_category || "FIR"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 915
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
          "x-file-name": "App",
          "x-line-number": "47",
          "x-column": "961",
          "x-component": "span",
          "x-id": "App_47_961",
          "x-dynamic": "true",
          "x-source-type": "static-imported",
          "x-source-var": "cases",
          "x-source-path": "status",
          "x-source-editable": "false",
          "x-array-var": "cases",
          "x-array-item-param": "item",
          children: item.status
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 962
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("b", {
          "x-file-name": "App",
          "x-line-number": "47",
          "x-column": "987",
          "x-component": "b",
          "x-id": "App_47_987",
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
            "x-line-number": "47",
            "x-column": "987",
            "x-component": "b",
            "x-id": "App_47_987_expr0",
            "x-dynamic": "true",
            "x-source-type": "computed",
            "x-source-editable": "false",
            children: item.progress || 0
          }, void 0, false), "%"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 47,
          columnNumber: 988
        }, this)]
      }, item.id, true, {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 676
      }, this))]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 513
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "case-detail",
      "x-file-name": "App",
      "x-line-number": "47",
      "x-column": "1032",
      "x-component": "div",
      "x-id": "App_47_1032",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: detail ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "section-heading",
          "x-file-name": "App",
          "x-line-number": "47",
          "x-column": "1073",
          "x-component": "div",
          "x-id": "App_47_1073",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
            "x-file-name": "App",
            "x-line-number": "47",
            "x-column": "1106",
            "x-component": "div",
            "x-id": "App_47_1106",
            "x-dynamic": "false",
            chi