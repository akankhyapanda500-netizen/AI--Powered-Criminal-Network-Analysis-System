function App() {
  _s();
  var _user$name;
  const api = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => axios__WEBPACK_IMPORTED_MODULE_1__["default"].create({
    baseURL: API,
    withCredentials: true
  }), []);
  const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    [login, setLogin] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      email: "admin@fir.local",
      password: "Admin@12345"
    }),
    [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Dashboard");
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    dashboard: {},
    cases: [],
    criminals: [],
    graph: {
      nodes: [],
      links: [],
      hubs: []
    },
    alerts: [],
    map: {
      regions: []
    },
    audit: []
  });
  const [text, setText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(sample),
    [result, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    [searchResults, setSearchResults] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    [assistant, setAssistant] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    [translation, setTranslation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    [lang, setLang] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("English"),
    [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const loadData = async () => {
    const requests = await Promise.allSettled([api.get("/dashboard"), api.get("/firs"), api.get("/criminals"), api.get("/graph"), api.get("/alerts"), api.get("/map"), api.get("/audit")]);
    setData({
      dashboard: requests[0].status === "fulfilled" ? requests[0].value.data : {},
      cases: requests[1].status === "fulfilled" ? requests[1].value.data : [],
      criminals: requests[2].status === "fulfilled" ? requests[2].value.data : [],
      graph: requests[3].status === "fulfilled" ? requests[3].value.data : {
        nodes: [],
        links: [],
        hubs: []
      },
      alerts: requests[4].status === "fulfilled" ? requests[4].value.data : [],
      map: requests[5].status === "fulfilled" ? requests[5].value.data : {
        regions: []
      },
      audit: requests[6].status === "fulfilled" ? requests[6].value.data : []
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    api.get("/auth/me").then(async r => {
      setUser(r.data);
      await loadData();
    }).catch(() => {});
  }, [api]);
  const signIn = async event => {
    event.preventDefault();
    setError("");
    try {
      const r = await api.post("/auth/login", login);
      setUser(r.data);
      await loadData();
    } catch (e) {
      var _e$response, _e$response$data;
      setError(((_e$response = e.response) === null || _e$response === void 0 ? void 0 : (_e$response$data = _e$response.data) === null || _e$response$data === void 0 ? void 0 : _e$response$data.detail) || "Unable to sign in");
    }
  };
  const analyze = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await api.post("/firs/analyze", {
        raw_text: text
      });
      setResult(r.data);
      await loadData();
    } catch (e) {
      var _e$response2, _e$response2$data;
      setError(((_e$response2 = e.response) === null || _e$response2 === void 0 ? void 0 : (_e$response2$data = _e$response2.data) === null || _e$response2$data === void 0 ? void 0 : _e$response2$data.detail) || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };
  const upload = async event => {
    var _event$target$files;
    const file = (_event$target$files = event.target.files) === null || _event$target$files === void 0 ? void 0 : _event$target$files[0];
    if (!file) return;
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const r = await api.post("/firs/upload", form);
      setResult(r.data);
      await loadData();
    } catch (e) {
      var _e$response3, _e$response3$data;
      setError(((_e$response3 = e.response) === null || _e$response3 === void 0 ? void 0 : (_e$response3$data = _e$response3.data) === null || _e$response3$data === void 0 ? void 0 : _e$response3$data.detail) || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const seedNational = async () => {
    setLoading(true);
    try {
      await api.post("/demo/seed-national");
      await loadData();
      setView("Dashboard");
    } catch (e) {
      var _e$response4, _e$response4$data;
      setError(((_e$response4 = e.response) === null || _e$response4 === void 0 ? void 0 : (_e$response4$data = _e$response4.data) === null || _e$response4$data === void 0 ? void 0 : _e$response4$data.detail) || "Dataset could not be added");
    } finally {
      setLoading(false);
    }
  };
  const search = async () => {
    try {
      const r = await api.get(`/search?q=${encodeURIComponent(query)}`);
      setSearchResults(r.data);
    } catch (e) {
      setError("Search failed");
    }
  };
  const ask = async question => {
    try {
      const r = await api.post("/assistant", {
        question
      });
      setAssistant(r.data);
    } catch (e) {
      setError("Assistant unavailable");
    }
  };
  const translate = async () => {
    try {
      const r = await api.post("/translate", {
        text: text,
        target_language: lang === "English" ? "Hindi" : lang
      });
      setTranslation(r.data);
    } catch (e) {
      setError("Translation unavailable");
    }
  };
  if (!user) return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Login, {
    login: login,
    setLogin: setLogin,
    signIn: signIn,
    error: error,
    "x-file-name": "App",
    "x-line-number": "33",
    "x-column": "20",
    "x-component": "Login",
    "x-id": "App_33_20",
    "x-dynamic": "true"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 33,
    columnNumber: 21
  }, this);
  const currentTitle = view === "Dashboard" ? "National command dashboard" : view;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
    className: "app-shell",
    "x-file-name": "App",
    "x-line-number": "35",
    "x-column": "9",
    "x-component": "div",
    "x-id": "App_35_9",
    "x-dynamic": "false",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("aside", {
      className: "cnifas-sidebar",
      "x-file-name": "App",
      "x-line-number": "35",
      "x-column": "36",
      "x-component": "aside",
      "x-id": "App_35_36",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "brand-mark",
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "70",
        "x-component": "div",
        "x-id": "App_35_70",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], {
          size: 20,
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "98",
          "x-component": "Shield",
          "x-id": "App_35_98",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 99
        }, this), " CNIFAS"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 71
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "brand-subtitle",
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "130",
        "x-component": "div",
        "x-id": "App_35_130",
        "x-dynamic": "false",
        children: "NATIONAL INTELLIGENCE GRID"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 131
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "side-label",
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "194",
        "x-component": "div",
        "x-id": "App_35_194",
        "x-dynamic": "false",
        children: "OPERATIONS"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 195
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("nav", {
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "238",
        "x-component": "nav",
        "x-id": "App_35_238",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: nav.map(([label, Icon]) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
          className: view === label ? "nav-active" : "",
          "data-testid": `nav-${label.toLowerCase().replaceAll(" ", "-")}`,
          onClick: () => {
            setView(label);
            setSelected(null);
          },
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "271",
          "x-component": "button",
          "x-id": "App_35_271",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Icon, {
            size: 15,
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "457",
            "x-component": "Icon",
            "x-id": "App_35_457",
            "x-dynamic": "true"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 458
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "474",
            "x-component": "span",
            "x-id": "App_35_474",
            "x-dynamic": "true",
            "x-source-type": "unknown",
            "x-source-var": "label",
            "x-source-editable": "false",
            children: label
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 475
          }, this)]
        }, label, true, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 272
        }, this))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 239
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "side-bottom",
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "511",
        "x-component": "div",
        "x-id": "App_35_511",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "demo-stamp",
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "540",
          "x-component": "div",
          "x-id": "App_35_540",
          "x-dynamic": "false",
          children: "DEMO / FICTIONAL DATA"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 541
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "operator",
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "595",
          "x-component": "div",
          "x-id": "App_35_595",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "621",
            "x-component": "span",
            "x-id": "App_35_621",
            "x-dynamic": "true",
            "x-source-type": "unknown",
            "x-source-editable": "false",
            children: (_user$name = user.name) === null || _user$name === void 0 ? void 0 : _user$name.slice(0, 1)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 622
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "658",
            "x-component": "div",
            "x-id": "App_35_658",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("strong", {
              "data-testid": "current-user-name",
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "663",
              "x-component": "strong",
              "x-id": "App_35_663",
              "x-dynamic": "true",
              "x-source-type": "state",
              "x-source-var": "user",
              "x-source-path": "name",
              "x-source-editable": "false",
              children: user.name
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 35,
              columnNumber: 664
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("small", {
              "data-testid": "current-user-role",
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "723",
              "x-component": "small",
              "x-id": "App_35_723",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: user.role.replaceAll("_", " ")
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 35,
              columnNumber: 724
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 659
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 596
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
          className: "logout",
          "data-testid": "logout-button",
          onClick: () => api.post("/auth/logout").then(() => setUser(null)),
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "814",
          "x-component": "button",
          "x-id": "App_35_814",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
            size: 15,
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "936",
            "x-component": "LogOut",
            "x-id": "App_35_936",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 937
          }, this), " Sign out"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 815
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 512
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 37
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("main", {
      className: "workspace cnifas-workspace",
      "x-file-name": "App",
      "x-line-number": "35",
      "x-column": "987",
      "x-component": "main",
      "x-id": "App_35_987",
      "x-dynamic": "true",
      "x-source-type": "computed",
      "x-source-editable": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("header", {
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "1032",
        "x-component": "header",
        "x-id": "App_35_1032",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "1040",
          "x-component": "div",
          "x-id": "App_35_1040",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
            className: "eyebrow",
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "1045",
            "x-component": "p",
            "x-id": "App_35_1045",
            "x-dynamic": "true",
            "x-source-type": "state",
            "x-source-var": "user",
            "x-source-path": "station_id",
            "x-source-editable": "false",
            children: ["CNIFAS / ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "1045",
              "x-component": "p",
              "x-id": "App_35_1045_expr1",
              "x-dynamic": "true",
              "x-source-type": "state",
              "x-source-var": "user",
              "x-source-path": "station_id",
              "x-source-editable": "false",
              children: user.station_id
            }, void 0, false), " / ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
              "data-ve-dynamic": "true",
              "x-excluded": "true",
              style: {
                display: "contents"
              },
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "1045",
              "x-component": "p",
              "x-id": "App_35_1045_expr3",
              "x-dynamic": "true",
              "x-source-type": "state",
              "x-source-var": "user",
              "x-source-path": "district",
              "x-source-editable": "false",
              children: user.district
            }, void 0, false)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 1046
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h1", {
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "1116",
            "x-component": "h1",
            "x-id": "App_35_1116",
            "x-dynamic": "true",
            "x-source-type": "unknown",
            "x-source-var": "currentTitle",
            "x-source-editable": "false",
            children: currentTitle
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 1117
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1041
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "header-tools",
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "1145",
          "x-component": "div",
          "x-id": "App_35_1145",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("label", {
            className: "language",
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "1175",
            "x-component": "label",
            "x-id": "App_35_1175",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
              size: 15,
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "1203",
              "x-component": "Languages",
              "x-id": "App_35_1203",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 35,
              columnNumber: 1204
            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("select", {
              "data-testid": "language-selector",
              value: lang,
              onChange: e => setLang(e.target.value),
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "1225",
              "x-component": "select",
              "x-id": "App_35_1225",
              "x-dynamic": "true",
              "x-source-type": "computed",
              "x-source-editable": "false",
              children: languages.map(item => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("option", {
                "x-file-name": "App",
                "x-line-number": "35",
                "x-column": "1345",
                "x-component": "option",
                "x-id": "App_35_1345",
                "x-dynamic": "true",
                "x-source-type": "static-imported",
                "x-source-var": "languages",
                "x-source-file-abs": "/app/frontend/src/App.js",
                "x-source-line": "10",
                "x-source-editable": "true",
                "x-array-var": "languages",
                "x-array-line": "10",
                "x-array-item-param": "item",
                children: item
              }, item, false, {
                fileName: _jsxFileName,
                lineNumber: 35,
                columnNumber: 1346
              }, this))
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 35,
              columnNumber: 1226
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 1176
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            className: "secure-chip",
            "x-file-name": "App",
            "x-line-number": "35",
            "x-column": "1398",
            "x-component": "span",
            "x-id": "App_35_1398",
            "x-dynamic": "false",
            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
              className: "pulse",
              "x-file-name": "App",
              "x-line-number": "35",
              "x-column": "1428",
              "x-component": "span",
              "x-id": "App_35_1428",
              "x-dynamic": "false"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 35,
              columnNumber: 1429
            }, this), " AUTHORIZED SESSION"]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 1399
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1146
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 1033
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "global-search",
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "1494",
        "x-component": "div",
        "x-id": "App_35_1494",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], {
          size: 16
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1526
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("input", {
          "data-testid": "global-search-input",
          value: query,
          onChange: e => setQuery(e.target.value),
          onKeyDown: e => e.key === "Enter" && search(),
          placeholder: "Search FIR, person, station, district, vehicle...",
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "1544",
          "x-component": "input",
          "x-id": "App_35_1544",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1545
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
          "data-testid": "global-search-button",
          onClick: search,
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "1756",
          "x-component": "button",
          "x-id": "App_35_1756",
          "x-dynamic": "false",
          children: "Search"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1757
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 1495
      }, this), error && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
        className: "error workspace-error",
        "data-testid": "global-error",
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "1847",
        "x-component": "div",
        "x-id": "App_35_1847",
        "x-dynamic": "true",
        "x-source-type": "state",
        "x-source-var": "error",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          size: 16,
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "1913",
          "x-component": "AlertTriangle",
          "x-id": "App_35_1913",
          "x-dynamic": "false"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1914
        }, this), error, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("button", {
          "data-testid": "dismiss-error",
          onClick: () => setError(""),
          "x-file-name": "App",
          "x-line-number": "35",
          "x-column": "1946",
          "x-component": "button",
          "x-id": "App_35_1946",
          "x-dynamic": "false",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], {
            size: 14
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 35,
            columnNumber: 2012
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 1947
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 1848
      }, this), searchResults.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(SearchResults, {
        results: searchResults,
        close: () => setSearchResults([]),
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2070",
        "x-component": "SearchResults",
        "x-id": "App_35_2070",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2071
      }, this), " ", view === "Dashboard" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Dashboard, {
        data: data,
        seedNational: seedNational,
        loading: loading,
        setView: setView,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2172",
        "x-component": "Dashboard",
        "x-id": "App_35_2172",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2173
      }, this), " ", view === "Investigate" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Investigate, {
        text: text,
        setText: setText,
        analyze: analyze,
        upload: upload,
        loading: loading,
        result: result,
        translate: translate,
        translation: translation,
        lang: lang,
        data: data,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2289",
        "x-component": "Investigate",
        "x-id": "App_35_2289",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2290
      }, this), " ", view === "FIR Upload" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(UploadModule, {
        text: text,
        setText: setText,
        upload: upload,
        analyze: analyze,
        result: result,
        loading: loading,
        translate: translate,
        translation: translation,
        lang: lang,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2501",
        "x-component": "UploadModule",
        "x-id": "App_35_2501",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2502
      }, this), " ", view === "FIR Records" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Records, {
        cases: data.cases,
        setSelected: setSelected,
        setView: setView,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2703",
        "x-component": "Records",
        "x-id": "App_35_2703",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2704
      }, this), " ", view === "Persons" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Persons, {
        criminals: data.criminals,
        setSelected: setSelected,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2801",
        "x-component": "Persons",
        "x-id": "App_35_2801",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2802
      }, this), " ", view === "Cases" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(CaseModule, {
        cases: data.cases,
        selected: selected,
        setSelected: setSelected,
        api: api,
        refresh: loadData,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "2887",
        "x-component": "CaseModule",
        "x-id": "App_35_2887",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 2888
      }, this), " ", view === "Network Analysis" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(NetworkModule, {
        graph: data.graph,
        criminals: data.criminals,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3028",
        "x-component": "NetworkModule",
        "x-id": "App_35_3028",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3029
      }, this), " ", view === "Face Similarity" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(FaceModule, {
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3123",
        "x-component": "FaceModule",
        "x-id": "App_35_3123",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3124
      }, this), " ", view === "Map Intelligence" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(MapModule, {
        map: data.map,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3170",
        "x-component": "MapModule",
        "x-id": "App_35_3170",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3171
      }, this), " ", view === "Investigation Progress" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(ProgressModule, {
        cases: data.cases,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3237",
        "x-component": "ProgressModule",
        "x-id": "App_35_3237",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3238
      }, this), " ", view === "Alerts" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Alerts, {
        alerts: data.alerts,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3297",
        "x-component": "Alerts",
        "x-id": "App_35_3297",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3298
      }, this), " ", view === "Reports" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Reports, {
        api: api,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3352",
        "x-component": "Reports",
        "x-id": "App_35_3352",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3353
      }, this), " ", view === "Audit Logs" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Audit, {
        audit: data.audit,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3400",
        "x-component": "Audit",
        "x-id": "App_35_3400",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3401
      }, this), " ", view === "Administration" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Administration, {
        user: user,
        seedNational: seedNational,
        loading: loading,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3459",
        "x-component": "Administration",
        "x-id": "App_35_3459",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3460
      }, this), " ", view === "AI Assistant" && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(Assistant, {
        assistant: assistant,
        ask: ask,
        "x-file-name": "App",
        "x-line-number": "35",
        "x-column": "3564",
        "x-component": "Assistant",
        "x-id": "App_35_3564",
        "x-dynamic": "true"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 35,
        columnNumber: 3565
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 988
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_s(App, "h+ebXPd3ltT8lAJnkCF0my/ngBc=");
_c = App;
function Login({
  login,
  setLogin,
  signIn,
  error
}) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("main", {
    className: "login-screen",
    "x-file-name": "App",
    "x-line-number": "38",
    "x-column": "60",
    "x-component": "main",
    "x-id": "App_38_60",
    "x-dynamic": "false",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
      className: "login-grid",
      "x-file-name": "App",
      "x-line-number": "38",
      "x-column": "91",
      "x-component": "div",
      "x-id": "App_38_91",
      "x-dynamic": "false",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("section", {
        className: "login-copy",
        "x-file-name": "App",
        "x-line-number": "38",
        "x-column": "119",
        "x-component": "section",
        "x-id": "App_38_119",
        "x-dynamic": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "brand-mark",
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "151",
          "x-component": "div",
          "x-id": "App_38_151",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], {
            size: 22,
            "x-file-name": "App",
            "x-line-number": "38",
            "x-column": "179",
            "x-component": "Shield",
            "x-id": "App_38_179",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 180
          }, this), " CNIFAS"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 152
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          className: "eyebrow",
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "211",
          "x-component": "p",
          "x-id": "App_38_211",
          "x-dynamic": "false",
          children: "CRIMINAL NETWORK INTELLIGENCE & FIR ANALYSIS SYSTEM"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 212
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h1", {
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "289",
          "x-component": "h1",
          "x-id": "App_38_289",
          "x-dynamic": "false",
          children: ["See the network", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("br", {
            "x-file-name": "App",
            "x-line-number": "38",
            "x-column": "308",
            "x-component": "br",
            "x-id": "App_38_308",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 309
          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("em", {
            "x-file-name": "App",
            "x-line-number": "38",
            "x-column": "313",
            "x-component": "em",
            "x-id": "App_38_313",
            "x-dynamic": "false",
            children: "behind the case."
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 314
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 290
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          className: "lede",
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "343",
          "x-component": "p",
          "x-id": "App_38_343",
          "x-dynamic": "false",
          children: "A secure decision-support workspace for authorized Indian law-enforcement personnel."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 344
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("div", {
          className: "login-signal",
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "451",
          "x-component": "div",
          "x-id": "App_38_451",
          "x-dynamic": "false",
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            size: 15,
            "x-file-name": "App",
            "x-line-number": "38",
            "x-column": "481",
            "x-component": "Activity",
            "x-id": "App_38_481",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 482
          }, this), " AUTHORIZED PERSONNEL ONLY ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("span", {
            "x-file-name": "App",
            "x-line-number": "38",
            "x-column": "529",
            "x-component": "span",
            "x-id": "App_38_529",
            "x-dynamic": "false",
            children: "\u2022"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 530
          }, this), " DEMO / FICTIONAL DATA"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 452
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 120
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("form", {
        className: "login-form",
        onSubmit: signIn,
        "x-file-name": "App",
        "x-line-number": "38",
        "x-column": "581",
        "x-component": "form",
        "x-id": "App_38_581",
        "x-dynamic": "true",
        "x-source-type": "computed",
        "x-source-editable": "false",
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("p", {
          className: "eyebrow",
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "628",
          "x-component": "p",
          "x-id": "App_38_628",
          "x-dynamic": "false",
          children: "SECURE OFFICER ACCESS"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 629
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("h2", {
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "676",
          "x-component": "h2",
          "x-id": "App_38_676",
          "x-dynamic": "false",
          children: "Sign in to command"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 677
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("label", {
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "703",
          "x-component": "label",
          "x-id": "App_38_703",
          "x-dynamic": "false",
          children: ["Police / User ID", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("input", {
            "data-testid": "login-email-input",
            value: login.email,
            onChange: e => setLogin({
              ...login,
              email: e.target.value
            }),
            "x-file-name": "App",
            "x-line-number": "38",
            "x-column": "726",
            "x-component": "input",
            "x-id": "App_38_726",
            "x-dynamic": "false"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 38,
            columnNumber: 727
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 704
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsxDEV)("label", {
          "x-file-name": "App",
          "x-line-number": "38",
          "x-column": "858",
          "x-component": "label",
          "x-id": "App_38_858",
          "x-dynamic": "false",
          children: ["Password", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_26__.jsx