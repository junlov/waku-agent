function rv(n, r) {
  for (var a = 0; a < r.length; a++) {
    const u = r[a];
    if (typeof u != "string" && !Array.isArray(u)) {
      for (const s in u)
        if (s !== "default" && !(s in n)) {
          const f = Object.getOwnPropertyDescriptor(u, s);
          f && Object.defineProperty(n, s, f.get ? f : {
            enumerable: !0,
            get: () => u[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function Ac(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Gs = { exports: {} }, Aa = {};
var Im;
function uv() {
  if (Im) return Aa;
  Im = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
  function a(u, s, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), s.key !== void 0 && (d = "" + s.key), "key" in s) {
      f = {};
      for (var m in s)
        m !== "key" && (f[m] = s[m]);
    } else f = s;
    return s = f.ref, {
      $$typeof: n,
      type: u,
      key: d,
      ref: s !== void 0 ? s : null,
      props: f
    };
  }
  return Aa.Fragment = r, Aa.jsx = a, Aa.jsxs = a, Aa;
}
var $m;
function ov() {
  return $m || ($m = 1, Gs.exports = /* @__PURE__ */ uv()), Gs.exports;
}
var C = /* @__PURE__ */ ov(), Vs = { exports: {} }, Ca = {}, Xs = { exports: {} }, Qs = {};
var Wm;
function sv() {
  return Wm || (Wm = 1, (function(n) {
    function r(O, F) {
      var se = O.length;
      O.push(F);
      e: for (; 0 < se; ) {
        var Se = se - 1 >>> 1, k = O[Se];
        if (0 < s(k, F))
          O[Se] = F, O[se] = k, se = Se;
        else break e;
      }
    }
    function a(O) {
      return O.length === 0 ? null : O[0];
    }
    function u(O) {
      if (O.length === 0) return null;
      var F = O[0], se = O.pop();
      if (se !== F) {
        O[0] = se;
        e: for (var Se = 0, k = O.length, T = k >>> 1; Se < T; ) {
          var G = 2 * (Se + 1) - 1, w = O[G], P = G + 1, ie = O[P];
          if (0 > s(w, se))
            P < k && 0 > s(ie, w) ? (O[Se] = ie, O[P] = se, Se = P) : (O[Se] = w, O[G] = se, Se = G);
          else if (P < k && 0 > s(ie, se))
            O[Se] = ie, O[P] = se, Se = P;
          else break e;
        }
      }
      return F;
    }
    function s(O, F) {
      var se = O.sortIndex - F.sortIndex;
      return se !== 0 ? se : O.id - F.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, m = d.now();
      n.unstable_now = function() {
        return d.now() - m;
      };
    }
    var p = [], h = [], b = 1, y = null, S = 3, v = !1, z = !1, j = !1, H = !1, D = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
    function re(O) {
      for (var F = a(h); F !== null; ) {
        if (F.callback === null) u(h);
        else if (F.startTime <= O)
          u(h), F.sortIndex = F.expirationTime, r(p, F);
        else break;
        F = a(h);
      }
    }
    function fe(O) {
      if (j = !1, re(O), !z)
        if (a(p) !== null)
          z = !0, B || (B = !0, ee());
        else {
          var F = a(h);
          F !== null && I(fe, F.startTime - O);
        }
    }
    var B = !1, $ = -1, K = 5, de = -1;
    function L() {
      return H ? !0 : !(n.unstable_now() - de < K);
    }
    function te() {
      if (H = !1, B) {
        var O = n.unstable_now();
        de = O;
        var F = !0;
        try {
          e: {
            z = !1, j && (j = !1, Z($), $ = -1), v = !0;
            var se = S;
            try {
              t: {
                for (re(O), y = a(p); y !== null && !(y.expirationTime > O && L()); ) {
                  var Se = y.callback;
                  if (typeof Se == "function") {
                    y.callback = null, S = y.priorityLevel;
                    var k = Se(
                      y.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof k == "function") {
                      y.callback = k, re(O), F = !0;
                      break t;
                    }
                    y === a(p) && u(p), re(O);
                  } else u(p);
                  y = a(p);
                }
                if (y !== null) F = !0;
                else {
                  var T = a(h);
                  T !== null && I(
                    fe,
                    T.startTime - O
                  ), F = !1;
                }
              }
              break e;
            } finally {
              y = null, S = se, v = !1;
            }
            F = void 0;
          }
        } finally {
          F ? ee() : B = !1;
        }
      }
    }
    var ee;
    if (typeof Y == "function")
      ee = function() {
        Y(te);
      };
    else if (typeof MessageChannel < "u") {
      var ze = new MessageChannel(), ue = ze.port2;
      ze.port1.onmessage = te, ee = function() {
        ue.postMessage(null);
      };
    } else
      ee = function() {
        D(te, 0);
      };
    function I(O, F) {
      $ = D(function() {
        O(n.unstable_now());
      }, F);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : K = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(O) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = S;
      }
      var se = S;
      S = F;
      try {
        return O();
      } finally {
        S = se;
      }
    }, n.unstable_requestPaint = function() {
      H = !0;
    }, n.unstable_runWithPriority = function(O, F) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var se = S;
      S = O;
      try {
        return F();
      } finally {
        S = se;
      }
    }, n.unstable_scheduleCallback = function(O, F, se) {
      var Se = n.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? Se + se : Se) : se = Se, O) {
        case 1:
          var k = -1;
          break;
        case 2:
          k = 250;
          break;
        case 5:
          k = 1073741823;
          break;
        case 4:
          k = 1e4;
          break;
        default:
          k = 5e3;
      }
      return k = se + k, O = {
        id: b++,
        callback: F,
        priorityLevel: O,
        startTime: se,
        expirationTime: k,
        sortIndex: -1
      }, se > Se ? (O.sortIndex = se, r(h, O), a(p) === null && O === a(h) && (j ? (Z($), $ = -1) : j = !0, I(fe, se - Se))) : (O.sortIndex = k, r(p, O), z || v || (z = !0, B || (B = !0, ee()))), O;
    }, n.unstable_shouldYield = L, n.unstable_wrapCallback = function(O) {
      var F = S;
      return function() {
        var se = S;
        S = F;
        try {
          return O.apply(this, arguments);
        } finally {
          S = se;
        }
      };
    };
  })(Qs)), Qs;
}
var Pm;
function cv() {
  return Pm || (Pm = 1, Xs.exports = /* @__PURE__ */ sv()), Xs.exports;
}
var Zs = { exports: {} }, xe = {};
var ep;
function fv() {
  if (ep) return xe;
  ep = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), a = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), S = Symbol.iterator;
  function v(T) {
    return T === null || typeof T != "object" ? null : (T = S && T[S] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, j = Object.assign, H = {};
  function D(T, G, w) {
    this.props = T, this.context = G, this.refs = H, this.updater = w || z;
  }
  D.prototype.isReactComponent = {}, D.prototype.setState = function(T, G) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, G, "setState");
  }, D.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function Z() {
  }
  Z.prototype = D.prototype;
  function Y(T, G, w) {
    this.props = T, this.context = G, this.refs = H, this.updater = w || z;
  }
  var re = Y.prototype = new Z();
  re.constructor = Y, j(re, D.prototype), re.isPureReactComponent = !0;
  var fe = Array.isArray;
  function B() {
  }
  var $ = { H: null, A: null, T: null, S: null }, K = Object.prototype.hasOwnProperty;
  function de(T, G, w) {
    var P = w.ref;
    return {
      $$typeof: n,
      type: T,
      key: G,
      ref: P !== void 0 ? P : null,
      props: w
    };
  }
  function L(T, G) {
    return de(T.type, G, T.props);
  }
  function te(T) {
    return typeof T == "object" && T !== null && T.$$typeof === n;
  }
  function ee(T) {
    var G = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(w) {
      return G[w];
    });
  }
  var ze = /\/+/g;
  function ue(T, G) {
    return typeof T == "object" && T !== null && T.key != null ? ee("" + T.key) : G.toString(36);
  }
  function I(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(B, B) : (T.status = "pending", T.then(
          function(G) {
            T.status === "pending" && (T.status = "fulfilled", T.value = G);
          },
          function(G) {
            T.status === "pending" && (T.status = "rejected", T.reason = G);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function O(T, G, w, P, ie) {
    var ne = typeof T;
    (ne === "undefined" || ne === "boolean") && (T = null);
    var we = !1;
    if (T === null) we = !0;
    else
      switch (ne) {
        case "bigint":
        case "string":
        case "number":
          we = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case r:
              we = !0;
              break;
            case b:
              return we = T._init, O(
                we(T._payload),
                G,
                w,
                P,
                ie
              );
          }
      }
    if (we)
      return ie = ie(T), we = P === "" ? "." + ue(T, 0) : P, fe(ie) ? (w = "", we != null && (w = we.replace(ze, "$&/") + "/"), O(ie, G, w, "", function(xt) {
        return xt;
      })) : ie != null && (te(ie) && (ie = L(
        ie,
        w + (ie.key == null || T && T.key === ie.key ? "" : ("" + ie.key).replace(
          ze,
          "$&/"
        ) + "/") + we
      )), G.push(ie)), 1;
    we = 0;
    var Xe = P === "" ? "." : P + ":";
    if (fe(T))
      for (var be = 0; be < T.length; be++)
        P = T[be], ne = Xe + ue(P, be), we += O(
          P,
          G,
          w,
          ne,
          ie
        );
    else if (be = v(T), typeof be == "function")
      for (T = be.call(T), be = 0; !(P = T.next()).done; )
        P = P.value, ne = Xe + ue(P, be++), we += O(
          P,
          G,
          w,
          ne,
          ie
        );
    else if (ne === "object") {
      if (typeof T.then == "function")
        return O(
          I(T),
          G,
          w,
          P,
          ie
        );
      throw G = String(T), Error(
        "Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return we;
  }
  function F(T, G, w) {
    if (T == null) return T;
    var P = [], ie = 0;
    return O(T, P, "", "", function(ne) {
      return G.call(w, ne, ie++);
    }), P;
  }
  function se(T) {
    if (T._status === -1) {
      var G = T._result;
      G = G(), G.then(
        function(w) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = w);
        },
        function(w) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = w);
        }
      ), T._status === -1 && (T._status = 0, T._result = G);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var Se = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var G = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(G)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, k = {
    map: F,
    forEach: function(T, G, w) {
      F(
        T,
        function() {
          G.apply(this, arguments);
        },
        w
      );
    },
    count: function(T) {
      var G = 0;
      return F(T, function() {
        G++;
      }), G;
    },
    toArray: function(T) {
      return F(T, function(G) {
        return G;
      }) || [];
    },
    only: function(T) {
      if (!te(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return xe.Activity = y, xe.Children = k, xe.Component = D, xe.Fragment = a, xe.Profiler = s, xe.PureComponent = Y, xe.StrictMode = u, xe.Suspense = p, xe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, xe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return $.H.useMemoCache(T);
    }
  }, xe.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, xe.cacheSignal = function() {
    return null;
  }, xe.cloneElement = function(T, G, w) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var P = j({}, T.props), ie = T.key;
    if (G != null)
      for (ne in G.key !== void 0 && (ie = "" + G.key), G)
        !K.call(G, ne) || ne === "key" || ne === "__self" || ne === "__source" || ne === "ref" && G.ref === void 0 || (P[ne] = G[ne]);
    var ne = arguments.length - 2;
    if (ne === 1) P.children = w;
    else if (1 < ne) {
      for (var we = Array(ne), Xe = 0; Xe < ne; Xe++)
        we[Xe] = arguments[Xe + 2];
      P.children = we;
    }
    return de(T.type, ie, P);
  }, xe.createContext = function(T) {
    return T = {
      $$typeof: d,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: f,
      _context: T
    }, T;
  }, xe.createElement = function(T, G, w) {
    var P, ie = {}, ne = null;
    if (G != null)
      for (P in G.key !== void 0 && (ne = "" + G.key), G)
        K.call(G, P) && P !== "key" && P !== "__self" && P !== "__source" && (ie[P] = G[P]);
    var we = arguments.length - 2;
    if (we === 1) ie.children = w;
    else if (1 < we) {
      for (var Xe = Array(we), be = 0; be < we; be++)
        Xe[be] = arguments[be + 2];
      ie.children = Xe;
    }
    if (T && T.defaultProps)
      for (P in we = T.defaultProps, we)
        ie[P] === void 0 && (ie[P] = we[P]);
    return de(T, ne, ie);
  }, xe.createRef = function() {
    return { current: null };
  }, xe.forwardRef = function(T) {
    return { $$typeof: m, render: T };
  }, xe.isValidElement = te, xe.lazy = function(T) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: T },
      _init: se
    };
  }, xe.memo = function(T, G) {
    return {
      $$typeof: h,
      type: T,
      compare: G === void 0 ? null : G
    };
  }, xe.startTransition = function(T) {
    var G = $.T, w = {};
    $.T = w;
    try {
      var P = T(), ie = $.S;
      ie !== null && ie(w, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(B, Se);
    } catch (ne) {
      Se(ne);
    } finally {
      G !== null && w.types !== null && (G.types = w.types), $.T = G;
    }
  }, xe.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, xe.use = function(T) {
    return $.H.use(T);
  }, xe.useActionState = function(T, G, w) {
    return $.H.useActionState(T, G, w);
  }, xe.useCallback = function(T, G) {
    return $.H.useCallback(T, G);
  }, xe.useContext = function(T) {
    return $.H.useContext(T);
  }, xe.useDebugValue = function() {
  }, xe.useDeferredValue = function(T, G) {
    return $.H.useDeferredValue(T, G);
  }, xe.useEffect = function(T, G) {
    return $.H.useEffect(T, G);
  }, xe.useEffectEvent = function(T) {
    return $.H.useEffectEvent(T);
  }, xe.useId = function() {
    return $.H.useId();
  }, xe.useImperativeHandle = function(T, G, w) {
    return $.H.useImperativeHandle(T, G, w);
  }, xe.useInsertionEffect = function(T, G) {
    return $.H.useInsertionEffect(T, G);
  }, xe.useLayoutEffect = function(T, G) {
    return $.H.useLayoutEffect(T, G);
  }, xe.useMemo = function(T, G) {
    return $.H.useMemo(T, G);
  }, xe.useOptimistic = function(T, G) {
    return $.H.useOptimistic(T, G);
  }, xe.useReducer = function(T, G, w) {
    return $.H.useReducer(T, G, w);
  }, xe.useRef = function(T) {
    return $.H.useRef(T);
  }, xe.useState = function(T) {
    return $.H.useState(T);
  }, xe.useSyncExternalStore = function(T, G, w) {
    return $.H.useSyncExternalStore(
      T,
      G,
      w
    );
  }, xe.useTransition = function() {
    return $.H.useTransition();
  }, xe.version = "19.2.7", xe;
}
var tp;
function Cc() {
  return tp || (tp = 1, Zs.exports = /* @__PURE__ */ fv()), Zs.exports;
}
var Ks = { exports: {} }, yt = {};
var np;
function dv() {
  if (np) return yt;
  np = 1;
  var n = /* @__PURE__ */ Cc();
  function r(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function a() {
  }
  var u = {
    d: {
      f: a,
      r: function() {
        throw Error(r(522));
      },
      D: a,
      C: a,
      L: a,
      m: a,
      X: a,
      S: a,
      M: a
    },
    p: 0,
    findDOMNode: null
  }, s = /* @__PURE__ */ Symbol.for("react.portal");
  function f(p, h, b) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: h,
      implementation: b
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, yt.createPortal = function(p, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(r(299));
    return f(p, h, null, b);
  }, yt.flushSync = function(p) {
    var h = d.T, b = u.p;
    try {
      if (d.T = null, u.p = 2, p) return p();
    } finally {
      d.T = h, u.p = b, u.d.f();
    }
  }, yt.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, u.d.C(p, h));
  }, yt.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, yt.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var b = h.as, y = m(b, h.crossOrigin), S = typeof h.integrity == "string" ? h.integrity : void 0, v = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? u.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: y,
          integrity: S,
          fetchPriority: v
        }
      ) : b === "script" && u.d.X(p, {
        crossOrigin: y,
        integrity: S,
        fetchPriority: v,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, yt.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var b = m(
            h.as,
            h.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && u.d.M(p);
  }, yt.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, y = m(b, h.crossOrigin);
      u.d.L(p, b, {
        crossOrigin: y,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, yt.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var b = m(h.as, h.crossOrigin);
        u.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else u.d.m(p);
  }, yt.requestFormReset = function(p) {
    u.d.r(p);
  }, yt.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, yt.useFormState = function(p, h, b) {
    return d.H.useFormState(p, h, b);
  }, yt.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, yt.version = "19.2.7", yt;
}
var lp;
function hv() {
  if (lp) return Ks.exports;
  lp = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Ks.exports = /* @__PURE__ */ dv(), Ks.exports;
}
var ip;
function mv() {
  if (ip) return Ca;
  ip = 1;
  var n = /* @__PURE__ */ cv(), r = /* @__PURE__ */ Cc(), a = /* @__PURE__ */ hv();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function f(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function d(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (f(e) !== e)
      throw Error(u(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var l = e, i = t; ; ) {
      var o = l.return;
      if (o === null) break;
      var c = o.alternate;
      if (c === null) {
        if (i = o.return, i !== null) {
          l = i;
          continue;
        }
        break;
      }
      if (o.child === c.child) {
        for (c = o.child; c; ) {
          if (c === l) return p(o), e;
          if (c === i) return p(o), t;
          c = c.sibling;
        }
        throw Error(u(188));
      }
      if (l.return !== i.return) l = o, i = c;
      else {
        for (var g = !1, x = o.child; x; ) {
          if (x === l) {
            g = !0, l = o, i = c;
            break;
          }
          if (x === i) {
            g = !0, i = o, l = c;
            break;
          }
          x = x.sibling;
        }
        if (!g) {
          for (x = c.child; x; ) {
            if (x === l) {
              g = !0, l = c, i = o;
              break;
            }
            if (x === i) {
              g = !0, i = c, l = o;
              break;
            }
            x = x.sibling;
          }
          if (!g) throw Error(u(189));
        }
      }
      if (l.alternate !== i) throw Error(u(190));
    }
    if (l.tag !== 3) throw Error(u(188));
    return l.stateNode.current === l ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign, S = /* @__PURE__ */ Symbol.for("react.element"), v = /* @__PURE__ */ Symbol.for("react.transitional.element"), z = /* @__PURE__ */ Symbol.for("react.portal"), j = /* @__PURE__ */ Symbol.for("react.fragment"), H = /* @__PURE__ */ Symbol.for("react.strict_mode"), D = /* @__PURE__ */ Symbol.for("react.profiler"), Z = /* @__PURE__ */ Symbol.for("react.consumer"), Y = /* @__PURE__ */ Symbol.for("react.context"), re = /* @__PURE__ */ Symbol.for("react.forward_ref"), fe = /* @__PURE__ */ Symbol.for("react.suspense"), B = /* @__PURE__ */ Symbol.for("react.suspense_list"), $ = /* @__PURE__ */ Symbol.for("react.memo"), K = /* @__PURE__ */ Symbol.for("react.lazy"), de = /* @__PURE__ */ Symbol.for("react.activity"), L = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), te = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ze = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ue(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ze ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case j:
        return "Fragment";
      case D:
        return "Profiler";
      case H:
        return "StrictMode";
      case fe:
        return "Suspense";
      case B:
        return "SuspenseList";
      case de:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case z:
          return "Portal";
        case Y:
          return e.displayName || "Context";
        case Z:
          return (e._context.displayName || "Context") + ".Consumer";
        case re:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case $:
          return t = e.displayName || null, t !== null ? t : ue(e.type) || "Memo";
        case K:
          t = e._payload, e = e._init;
          try {
            return ue(e(t));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, O = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Se = [], k = -1;
  function T(e) {
    return { current: e };
  }
  function G(e) {
    0 > k || (e.current = Se[k], Se[k] = null, k--);
  }
  function w(e, t) {
    k++, Se[k] = e.current, e.current = t;
  }
  var P = T(null), ie = T(null), ne = T(null), we = T(null);
  function Xe(e, t) {
    switch (w(ne, t), w(ie, e), w(P, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? vm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = vm(t), e = xm(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    G(P), w(P, e);
  }
  function be() {
    G(P), G(ie), G(ne);
  }
  function xt(e) {
    e.memoizedState !== null && w(we, e);
    var t = P.current, l = xm(t, e.type);
    t !== l && (w(ie, e), w(P, l));
  }
  function zt(e) {
    ie.current === e && (G(P), G(ie)), we.current === e && (G(we), wa._currentValue = se);
  }
  var cn, qn;
  function Tt(e) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        cn = t && t[1] || "", qn = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + e + qn;
  }
  var Gl = !1;
  function Vl(e, t) {
    if (!e || Gl) return "";
    Gl = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var Q = function() {
                throw Error();
              };
              if (Object.defineProperty(Q.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Q, []);
                } catch (U) {
                  var R = U;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (U) {
                  R = U;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                R = U;
              }
              (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
              });
            }
          } catch (U) {
            if (U && R && typeof U.stack == "string")
              return [U.stack, R.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var o = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      o && o.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = i.DetermineComponentFrameRoot(), g = c[0], x = c[1];
      if (g && x) {
        var E = g.split(`
`), N = x.split(`
`);
        for (o = i = 0; i < E.length && !E[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; o < N.length && !N[o].includes(
          "DetermineComponentFrameRoot"
        ); )
          o++;
        if (i === E.length || o === N.length)
          for (i = E.length - 1, o = N.length - 1; 1 <= i && 0 <= o && E[i] !== N[o]; )
            o--;
        for (; 1 <= i && 0 <= o; i--, o--)
          if (E[i] !== N[o]) {
            if (i !== 1 || o !== 1)
              do
                if (i--, o--, 0 > o || E[i] !== N[o]) {
                  var q = `
` + E[i].replace(" at new ", " at ");
                  return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), q;
                }
              while (1 <= i && 0 <= o);
            break;
          }
      }
    } finally {
      Gl = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Tt(l) : "";
  }
  function Va(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Tt(e.type);
      case 16:
        return Tt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Tt("Suspense Fallback") : Tt("Suspense");
      case 19:
        return Tt("SuspenseList");
      case 0:
      case 15:
        return Vl(e.type, !1);
      case 11:
        return Vl(e.type.render, !1);
      case 1:
        return Vl(e.type, !0);
      case 31:
        return Tt("Activity");
      default:
        return "";
    }
  }
  function Xa(e) {
    try {
      var t = "", l = null;
      do
        t += Va(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Xl = Object.prototype.hasOwnProperty, Ql = n.unstable_scheduleCallback, ji = n.unstable_cancelCallback, Tu = n.unstable_shouldYield, Au = n.unstable_requestPaint, St = n.unstable_now, Cu = n.unstable_getCurrentPriorityLevel, V = n.unstable_ImmediatePriority, W = n.unstable_UserBlockingPriority, ge = n.unstable_NormalPriority, Ae = n.unstable_LowPriority, Be = n.unstable_IdlePriority, Ut = n.log, bn = n.unstable_setDisableYieldValue, kt = null, ut = null;
  function At(e) {
    if (typeof Ut == "function" && bn(e), ut && typeof ut.setStrictMode == "function")
      try {
        ut.setStrictMode(kt, e);
      } catch {
      }
  }
  var Qe = Math.clz32 ? Math.clz32 : Zy, Yn = Math.log, an = Math.LN2;
  function Zy(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Yn(e) / an | 0) | 0;
  }
  var Qa = 256, Za = 262144, Ka = 4194304;
  function yl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Fa(e, t, l) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var o = 0, c = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var x = i & 134217727;
    return x !== 0 ? (i = x & ~c, i !== 0 ? o = yl(i) : (g &= x, g !== 0 ? o = yl(g) : l || (l = x & ~e, l !== 0 && (o = yl(l))))) : (x = i & ~c, x !== 0 ? o = yl(x) : g !== 0 ? o = yl(g) : l || (l = i & ~e, l !== 0 && (o = yl(l)))), o === 0 ? 0 : t !== 0 && t !== o && (t & c) === 0 && (c = o & -o, l = t & -t, c >= l || c === 32 && (l & 4194048) !== 0) ? t : o;
  }
  function Li(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Ky(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Pc() {
    var e = Ka;
    return Ka <<= 1, (Ka & 62914560) === 0 && (Ka = 4194304), e;
  }
  function _u(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ui(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Fy(e, t, l, i, o, c) {
    var g = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var x = e.entanglements, E = e.expirationTimes, N = e.hiddenUpdates;
    for (l = g & ~l; 0 < l; ) {
      var q = 31 - Qe(l), Q = 1 << q;
      x[q] = 0, E[q] = -1;
      var R = N[q];
      if (R !== null)
        for (N[q] = null, q = 0; q < R.length; q++) {
          var U = R[q];
          U !== null && (U.lane &= -536870913);
        }
      l &= ~Q;
    }
    i !== 0 && ef(e, i, 0), c !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(g & ~t));
  }
  function ef(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - Qe(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | l & 261930;
  }
  function tf(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var i = 31 - Qe(l), o = 1 << i;
      o & t | e[i] & t && (e[i] |= t), l &= ~o;
    }
  }
  function nf(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Ou(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Ou(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Du(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function lf() {
    var e = F.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Vm(e.type));
  }
  function af(e, t) {
    var l = F.p;
    try {
      return F.p = e, t();
    } finally {
      F.p = l;
    }
  }
  var Gn = Math.random().toString(36).slice(2), dt = "__reactFiber$" + Gn, Ct = "__reactProps$" + Gn, Zl = "__reactContainer$" + Gn, Mu = "__reactEvents$" + Gn, Jy = "__reactListeners$" + Gn, Iy = "__reactHandles$" + Gn, rf = "__reactResources$" + Gn, Bi = "__reactMarker$" + Gn;
  function Nu(e) {
    delete e[dt], delete e[Ct], delete e[Mu], delete e[Jy], delete e[Iy];
  }
  function Kl(e) {
    var t = e[dt];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Zl] || l[dt]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Am(e); e !== null; ) {
            if (l = e[dt]) return l;
            e = Am(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Fl(e) {
    if (e = e[dt] || e[Zl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Hi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Jl(e) {
    var t = e[rf];
    return t || (t = e[rf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ct(e) {
    e[Bi] = !0;
  }
  var uf = /* @__PURE__ */ new Set(), of = {};
  function bl(e, t) {
    Il(e, t), Il(e + "Capture", t);
  }
  function Il(e, t) {
    for (of[e] = t, e = 0; e < t.length; e++)
      uf.add(t[e]);
  }
  var $y = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), sf = {}, cf = {};
  function Wy(e) {
    return Xl.call(cf, e) ? !0 : Xl.call(sf, e) ? !1 : $y.test(e) ? cf[e] = !0 : (sf[e] = !0, !1);
  }
  function Ja(e, t, l) {
    if (Wy(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function Ia(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function vn(e, t, l, i) {
    if (i === null) e.removeAttribute(l);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + i);
    }
  }
  function Kt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ff(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Py(e, t, l) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var o = i.get, c = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return o.call(this);
        },
        set: function(g) {
          l = "" + g, c.call(this, g);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(g) {
          l = "" + g;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ru(e) {
    if (!e._valueTracker) {
      var t = ff(e) ? "checked" : "value";
      e._valueTracker = Py(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function df(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = ff(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function $a(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var eb = /[\n"\\]/g;
  function Ft(e) {
    return e.replace(
      eb,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ju(e, t, l, i, o, c, g, x) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Kt(t)) : e.value !== "" + Kt(t) && (e.value = "" + Kt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? Lu(e, g, Kt(t)) : l != null ? Lu(e, g, Kt(l)) : i != null && e.removeAttribute("value"), o == null && c != null && (e.defaultChecked = !!c), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + Kt(x) : e.removeAttribute("name");
  }
  function hf(e, t, l, i, o, c, g, x) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || l != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        Ru(e);
        return;
      }
      l = l != null ? "" + Kt(l) : "", t = t != null ? "" + Kt(t) : l, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = x ? e.checked : !!i, e.defaultChecked = !!i, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), Ru(e);
  }
  function Lu(e, t, l) {
    t === "number" && $a(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function $l(e, t, l, i) {
    if (e = e.options, t) {
      t = {};
      for (var o = 0; o < l.length; o++)
        t["$" + l[o]] = !0;
      for (l = 0; l < e.length; l++)
        o = t.hasOwnProperty("$" + e[l].value), e[l].selected !== o && (e[l].selected = o), o && i && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Kt(l), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === l) {
          e[o].selected = !0, i && (e[o].defaultSelected = !0);
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function mf(e, t, l) {
    if (t != null && (t = "" + Kt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Kt(l) : "";
  }
  function pf(e, t, l, i) {
    if (t == null) {
      if (i != null) {
        if (l != null) throw Error(u(92));
        if (I(i)) {
          if (1 < i.length) throw Error(u(93));
          i = i[0];
        }
        l = i;
      }
      l == null && (l = ""), t = l;
    }
    l = Kt(t), e.defaultValue = l, i = e.textContent, i === l && i !== "" && i !== null && (e.value = i), Ru(e);
  }
  function Wl(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var tb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function gf(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || tb.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function yf(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var o in t)
        i = t[o], t.hasOwnProperty(o) && l[o] !== i && gf(e, o, i);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && gf(e, c, t[c]);
  }
  function Uu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var nb = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), lb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Wa(e) {
    return lb.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function xn() {
  }
  var Bu = null;
  function Hu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Pl = null, ei = null;
  function bf(e) {
    var t = Fl(e);
    if (t && (e = t.stateNode)) {
      var l = e[Ct] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ju(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Ft(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var i = l[t];
              if (i !== e && i.form === e.form) {
                var o = i[Ct] || null;
                if (!o) throw Error(u(90));
                ju(
                  i,
                  o.value,
                  o.defaultValue,
                  o.defaultValue,
                  o.checked,
                  o.defaultChecked,
                  o.type,
                  o.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              i = l[t], i.form === e.form && df(i);
          }
          break e;
        case "textarea":
          mf(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && $l(e, !!l.multiple, t, !1);
      }
    }
  }
  var qu = !1;
  function vf(e, t, l) {
    if (qu) return e(t, l);
    qu = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (qu = !1, (Pl !== null || ei !== null) && (Hr(), Pl && (t = Pl, e = ei, ei = Pl = null, bf(t), e)))
        for (t = 0; t < e.length; t++) bf(e[t]);
    }
  }
  function qi(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var i = l[Ct] || null;
    if (i === null) return null;
    l = i[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        u(231, t, typeof l)
      );
    return l;
  }
  var Sn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yu = !1;
  if (Sn)
    try {
      var Yi = {};
      Object.defineProperty(Yi, "passive", {
        get: function() {
          Yu = !0;
        }
      }), window.addEventListener("test", Yi, Yi), window.removeEventListener("test", Yi, Yi);
    } catch {
      Yu = !1;
    }
  var Vn = null, Gu = null, Pa = null;
  function xf() {
    if (Pa) return Pa;
    var e, t = Gu, l = t.length, i, o = "value" in Vn ? Vn.value : Vn.textContent, c = o.length;
    for (e = 0; e < l && t[e] === o[e]; e++) ;
    var g = l - e;
    for (i = 1; i <= g && t[l - i] === o[c - i]; i++) ;
    return Pa = o.slice(e, 1 < i ? 1 - i : void 0);
  }
  function er(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function tr() {
    return !0;
  }
  function Sf() {
    return !1;
  }
  function _t(e) {
    function t(l, i, o, c, g) {
      this._reactName = l, this._targetInst = o, this.type = i, this.nativeEvent = c, this.target = g, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (l = e[x], this[x] = l ? l(c) : c[x]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? tr : Sf, this.isPropagationStopped = Sf, this;
    }
    return y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = tr);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = tr);
      },
      persist: function() {
      },
      isPersistent: tr
    }), t;
  }
  var vl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, nr = _t(vl), Gi = y({}, vl, { view: 0, detail: 0 }), ib = _t(Gi), Vu, Xu, Vi, lr = y({}, Gi, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Zu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Vi && (Vi && e.type === "mousemove" ? (Vu = e.screenX - Vi.screenX, Xu = e.screenY - Vi.screenY) : Xu = Vu = 0, Vi = e), Vu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Xu;
    }
  }), kf = _t(lr), ab = y({}, lr, { dataTransfer: 0 }), rb = _t(ab), ub = y({}, Gi, { relatedTarget: 0 }), Qu = _t(ub), ob = y({}, vl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sb = _t(ob), cb = y({}, vl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), fb = _t(cb), db = y({}, vl, { data: 0 }), wf = _t(db), hb = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, mb = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, pb = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function gb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = pb[e]) ? !!t[e] : !1;
  }
  function Zu() {
    return gb;
  }
  var yb = y({}, Gi, {
    key: function(e) {
      if (e.key) {
        var t = hb[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = er(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? mb[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zu,
    charCode: function(e) {
      return e.type === "keypress" ? er(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? er(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), bb = _t(yb), vb = y({}, lr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Ef = _t(vb), xb = y({}, Gi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zu
  }), Sb = _t(xb), kb = y({}, vl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), wb = _t(kb), Eb = y({}, lr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), zb = _t(Eb), Tb = y({}, vl, {
    newState: 0,
    oldState: 0
  }), Ab = _t(Tb), Cb = [9, 13, 27, 32], Ku = Sn && "CompositionEvent" in window, Xi = null;
  Sn && "documentMode" in document && (Xi = document.documentMode);
  var _b = Sn && "TextEvent" in window && !Xi, zf = Sn && (!Ku || Xi && 8 < Xi && 11 >= Xi), Tf = " ", Af = !1;
  function Cf(e, t) {
    switch (e) {
      case "keyup":
        return Cb.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function _f(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ti = !1;
  function Ob(e, t) {
    switch (e) {
      case "compositionend":
        return _f(t);
      case "keypress":
        return t.which !== 32 ? null : (Af = !0, Tf);
      case "textInput":
        return e = t.data, e === Tf && Af ? null : e;
      default:
        return null;
    }
  }
  function Db(e, t) {
    if (ti)
      return e === "compositionend" || !Ku && Cf(e, t) ? (e = xf(), Pa = Gu = Vn = null, ti = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return zf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Mb = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Of(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Mb[e.type] : t === "textarea";
  }
  function Df(e, t, l, i) {
    Pl ? ei ? ei.push(i) : ei = [i] : Pl = i, t = Zr(t, "onChange"), 0 < t.length && (l = new nr(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var Qi = null, Zi = null;
  function Nb(e) {
    hm(e, 0);
  }
  function ir(e) {
    var t = Hi(e);
    if (df(t)) return e;
  }
  function Mf(e, t) {
    if (e === "change") return t;
  }
  var Nf = !1;
  if (Sn) {
    var Fu;
    if (Sn) {
      var Ju = "oninput" in document;
      if (!Ju) {
        var Rf = document.createElement("div");
        Rf.setAttribute("oninput", "return;"), Ju = typeof Rf.oninput == "function";
      }
      Fu = Ju;
    } else Fu = !1;
    Nf = Fu && (!document.documentMode || 9 < document.documentMode);
  }
  function jf() {
    Qi && (Qi.detachEvent("onpropertychange", Lf), Zi = Qi = null);
  }
  function Lf(e) {
    if (e.propertyName === "value" && ir(Zi)) {
      var t = [];
      Df(
        t,
        Zi,
        e,
        Hu(e)
      ), vf(Nb, t);
    }
  }
  function Rb(e, t, l) {
    e === "focusin" ? (jf(), Qi = t, Zi = l, Qi.attachEvent("onpropertychange", Lf)) : e === "focusout" && jf();
  }
  function jb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ir(Zi);
  }
  function Lb(e, t) {
    if (e === "click") return ir(t);
  }
  function Ub(e, t) {
    if (e === "input" || e === "change")
      return ir(t);
  }
  function Bb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Bt = typeof Object.is == "function" ? Object.is : Bb;
  function Ki(e, t) {
    if (Bt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var o = l[i];
      if (!Xl.call(t, o) || !Bt(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  function Uf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Bf(e, t) {
    var l = Uf(e);
    e = 0;
    for (var i; l; ) {
      if (l.nodeType === 3) {
        if (i = e + l.textContent.length, e <= t && i >= t)
          return { node: l, offset: t - e };
        e = i;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Uf(l);
    }
  }
  function Hf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Hf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function qf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = $a(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = $a(e.document);
    }
    return t;
  }
  function Iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Hb = Sn && "documentMode" in document && 11 >= document.documentMode, ni = null, $u = null, Fi = null, Wu = !1;
  function Yf(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Wu || ni == null || ni !== $a(i) || (i = ni, "selectionStart" in i && Iu(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Fi && Ki(Fi, i) || (Fi = i, i = Zr($u, "onSelect"), 0 < i.length && (t = new nr(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = ni)));
  }
  function xl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var li = {
    animationend: xl("Animation", "AnimationEnd"),
    animationiteration: xl("Animation", "AnimationIteration"),
    animationstart: xl("Animation", "AnimationStart"),
    transitionrun: xl("Transition", "TransitionRun"),
    transitionstart: xl("Transition", "TransitionStart"),
    transitioncancel: xl("Transition", "TransitionCancel"),
    transitionend: xl("Transition", "TransitionEnd")
  }, Pu = {}, Gf = {};
  Sn && (Gf = document.createElement("div").style, "AnimationEvent" in window || (delete li.animationend.animation, delete li.animationiteration.animation, delete li.animationstart.animation), "TransitionEvent" in window || delete li.transitionend.transition);
  function Sl(e) {
    if (Pu[e]) return Pu[e];
    if (!li[e]) return e;
    var t = li[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Gf)
        return Pu[e] = t[l];
    return e;
  }
  var Vf = Sl("animationend"), Xf = Sl("animationiteration"), Qf = Sl("animationstart"), qb = Sl("transitionrun"), Yb = Sl("transitionstart"), Gb = Sl("transitioncancel"), Zf = Sl("transitionend"), Kf = /* @__PURE__ */ new Map(), eo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  eo.push("scrollEnd");
  function rn(e, t) {
    Kf.set(e, t), bl(t, [e]);
  }
  var ar = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Jt = [], ii = 0, to = 0;
  function rr() {
    for (var e = ii, t = to = ii = 0; t < e; ) {
      var l = Jt[t];
      Jt[t++] = null;
      var i = Jt[t];
      Jt[t++] = null;
      var o = Jt[t];
      Jt[t++] = null;
      var c = Jt[t];
      if (Jt[t++] = null, i !== null && o !== null) {
        var g = i.pending;
        g === null ? o.next = o : (o.next = g.next, g.next = o), i.pending = o;
      }
      c !== 0 && Ff(l, o, c);
    }
  }
  function ur(e, t, l, i) {
    Jt[ii++] = e, Jt[ii++] = t, Jt[ii++] = l, Jt[ii++] = i, to |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function no(e, t, l, i) {
    return ur(e, t, l, i), or(e);
  }
  function kl(e, t) {
    return ur(e, null, null, t), or(e);
  }
  function Ff(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var o = !1, c = e.return; c !== null; )
      c.childLanes |= l, i = c.alternate, i !== null && (i.childLanes |= l), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (o = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, o && t !== null && (o = 31 - Qe(l), e = c.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = l | 536870912), c) : null;
  }
  function or(e) {
    if (50 < ga)
      throw ga = 0, ds = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ai = {};
  function Vb(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ht(e, t, l, i) {
    return new Vb(e, t, l, i);
  }
  function lo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function kn(e, t) {
    var l = e.alternate;
    return l === null ? (l = Ht(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function Jf(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function sr(e, t, l, i, o, c) {
    var g = 0;
    if (i = e, typeof e == "function") lo(e) && (g = 1);
    else if (typeof e == "string")
      g = F1(
        e,
        l,
        P.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case de:
          return e = Ht(31, l, t, o), e.elementType = de, e.lanes = c, e;
        case j:
          return wl(l.children, o, c, t);
        case H:
          g = 8, o |= 24;
          break;
        case D:
          return e = Ht(12, l, t, o | 2), e.elementType = D, e.lanes = c, e;
        case fe:
          return e = Ht(13, l, t, o), e.elementType = fe, e.lanes = c, e;
        case B:
          return e = Ht(19, l, t, o), e.elementType = B, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Y:
                g = 10;
                break e;
              case Z:
                g = 9;
                break e;
              case re:
                g = 11;
                break e;
              case $:
                g = 14;
                break e;
              case K:
                g = 16, i = null;
                break e;
            }
          g = 29, l = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = Ht(g, l, t, o), t.elementType = e, t.type = i, t.lanes = c, t;
  }
  function wl(e, t, l, i) {
    return e = Ht(7, e, i, t), e.lanes = l, e;
  }
  function io(e, t, l) {
    return e = Ht(6, e, null, t), e.lanes = l, e;
  }
  function If(e) {
    var t = Ht(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ao(e, t, l) {
    return t = Ht(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var $f = /* @__PURE__ */ new WeakMap();
  function It(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = $f.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Xa(t)
      }, $f.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Xa(t)
    };
  }
  var ri = [], ui = 0, cr = null, Ji = 0, $t = [], Wt = 0, Xn = null, fn = 1, dn = "";
  function wn(e, t) {
    ri[ui++] = Ji, ri[ui++] = cr, cr = e, Ji = t;
  }
  function Wf(e, t, l) {
    $t[Wt++] = fn, $t[Wt++] = dn, $t[Wt++] = Xn, Xn = e;
    var i = fn;
    e = dn;
    var o = 32 - Qe(i) - 1;
    i &= ~(1 << o), l += 1;
    var c = 32 - Qe(t) + o;
    if (30 < c) {
      var g = o - o % 5;
      c = (i & (1 << g) - 1).toString(32), i >>= g, o -= g, fn = 1 << 32 - Qe(t) + o | l << o | i, dn = c + e;
    } else
      fn = 1 << c | l << o | i, dn = e;
  }
  function ro(e) {
    e.return !== null && (wn(e, 1), Wf(e, 1, 0));
  }
  function uo(e) {
    for (; e === cr; )
      cr = ri[--ui], ri[ui] = null, Ji = ri[--ui], ri[ui] = null;
    for (; e === Xn; )
      Xn = $t[--Wt], $t[Wt] = null, dn = $t[--Wt], $t[Wt] = null, fn = $t[--Wt], $t[Wt] = null;
  }
  function Pf(e, t) {
    $t[Wt++] = fn, $t[Wt++] = dn, $t[Wt++] = Xn, fn = t.id, dn = t.overflow, Xn = e;
  }
  var ht = null, Je = null, Ne = !1, Qn = null, Pt = !1, oo = Error(u(519));
  function Zn(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ii(It(t, e)), oo;
  }
  function ed(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[dt] = e, t[Ct] = i, l) {
      case "dialog":
        _e("cancel", t), _e("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        _e("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < ba.length; l++)
          _e(ba[l], t);
        break;
      case "source":
        _e("error", t);
        break;
      case "img":
      case "image":
      case "link":
        _e("error", t), _e("load", t);
        break;
      case "details":
        _e("toggle", t);
        break;
      case "input":
        _e("invalid", t), hf(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        _e("invalid", t);
        break;
      case "textarea":
        _e("invalid", t), pf(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || ym(t.textContent, l) ? (i.popover != null && (_e("beforetoggle", t), _e("toggle", t)), i.onScroll != null && _e("scroll", t), i.onScrollEnd != null && _e("scrollend", t), i.onClick != null && (t.onclick = xn), t = !0) : t = !1, t || Zn(e, !0);
  }
  function td(e) {
    for (ht = e.return; ht; )
      switch (ht.tag) {
        case 5:
        case 31:
        case 13:
          Pt = !1;
          return;
        case 27:
        case 3:
          Pt = !0;
          return;
        default:
          ht = ht.return;
      }
  }
  function oi(e) {
    if (e !== ht) return !1;
    if (!Ne) return td(e), Ne = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || As(e.type, e.memoizedProps)), l = !l), l && Je && Zn(e), td(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Je = Tm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Je = Tm(e);
    } else
      t === 27 ? (t = Je, rl(e.type) ? (e = Ms, Ms = null, Je = e) : Je = t) : Je = ht ? tn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function El() {
    Je = ht = null, Ne = !1;
  }
  function so() {
    var e = Qn;
    return e !== null && (Nt === null ? Nt = e : Nt.push.apply(
      Nt,
      e
    ), Qn = null), e;
  }
  function Ii(e) {
    Qn === null ? Qn = [e] : Qn.push(e);
  }
  var co = T(null), zl = null, En = null;
  function Kn(e, t, l) {
    w(co, t._currentValue), t._currentValue = l;
  }
  function zn(e) {
    e._currentValue = co.current, G(co);
  }
  function fo(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function ho(e, t, l, i) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var c = o.dependencies;
      if (c !== null) {
        var g = o.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var x = c;
          c = o;
          for (var E = 0; E < t.length; E++)
            if (x.context === t[E]) {
              c.lanes |= l, x = c.alternate, x !== null && (x.lanes |= l), fo(
                c.return,
                l,
                e
              ), i || (g = null);
              break e;
            }
          c = x.next;
        }
      } else if (o.tag === 18) {
        if (g = o.return, g === null) throw Error(u(341));
        g.lanes |= l, c = g.alternate, c !== null && (c.lanes |= l), fo(g, l, e), g = null;
      } else g = o.child;
      if (g !== null) g.return = o;
      else
        for (g = o; g !== null; ) {
          if (g === e) {
            g = null;
            break;
          }
          if (o = g.sibling, o !== null) {
            o.return = g.return, g = o;
            break;
          }
          g = g.return;
        }
      o = g;
    }
  }
  function si(e, t, l, i) {
    e = null;
    for (var o = t, c = !1; o !== null; ) {
      if (!c) {
        if ((o.flags & 524288) !== 0) c = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var g = o.alternate;
        if (g === null) throw Error(u(387));
        if (g = g.memoizedProps, g !== null) {
          var x = o.type;
          Bt(o.pendingProps.value, g.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (o === we.current) {
        if (g = o.alternate, g === null) throw Error(u(387));
        g.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(wa) : e = [wa]);
      }
      o = o.return;
    }
    e !== null && ho(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function fr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Bt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Tl(e) {
    zl = e, En = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function mt(e) {
    return nd(zl, e);
  }
  function dr(e, t) {
    return zl === null && Tl(e), nd(e, t);
  }
  function nd(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, En === null) {
      if (e === null) throw Error(u(308));
      En = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else En = En.next = t;
    return l;
  }
  var Xb = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Qb = n.unstable_scheduleCallback, Zb = n.unstable_NormalPriority, nt = {
    $$typeof: Y,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function mo() {
    return {
      controller: new Xb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function $i(e) {
    e.refCount--, e.refCount === 0 && Qb(Zb, function() {
      e.controller.abort();
    });
  }
  var Wi = null, po = 0, ci = 0, fi = null;
  function Kb(e, t) {
    if (Wi === null) {
      var l = Wi = [];
      po = 0, ci = bs(), fi = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return po++, t.then(ld, ld), t;
  }
  function ld() {
    if (--po === 0 && Wi !== null) {
      fi !== null && (fi.status = "fulfilled");
      var e = Wi;
      Wi = null, ci = 0, fi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Fb(e, t) {
    var l = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(o) {
        l.push(o);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var o = 0; o < l.length; o++) (0, l[o])(t);
      },
      function(o) {
        for (i.status = "rejected", i.reason = o, o = 0; o < l.length; o++)
          (0, l[o])(void 0);
      }
    ), i;
  }
  var id = O.S;
  O.S = function(e, t) {
    Yh = St(), typeof t == "object" && t !== null && typeof t.then == "function" && Kb(e, t), id !== null && id(e, t);
  };
  var Al = T(null);
  function go() {
    var e = Al.current;
    return e !== null ? e : Ze.pooledCache;
  }
  function hr(e, t) {
    t === null ? w(Al, Al.current) : w(Al, t.pool);
  }
  function ad() {
    var e = go();
    return e === null ? null : { parent: nt._currentValue, pool: e };
  }
  var di = Error(u(460)), yo = Error(u(474)), mr = Error(u(542)), pr = { then: function() {
  } };
  function rd(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function ud(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(xn, xn), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, sd(e), e;
      default:
        if (typeof t.status == "string") t.then(xn, xn);
        else {
          if (e = Ze, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var o = t;
                o.status = "fulfilled", o.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var o = t;
                o.status = "rejected", o.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, sd(e), e;
        }
        throw _l = t, di;
    }
  }
  function Cl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (_l = l, di) : l;
    }
  }
  var _l = null;
  function od() {
    if (_l === null) throw Error(u(459));
    var e = _l;
    return _l = null, e;
  }
  function sd(e) {
    if (e === di || e === mr)
      throw Error(u(483));
  }
  var hi = null, Pi = 0;
  function gr(e) {
    var t = Pi;
    return Pi += 1, hi === null && (hi = []), ud(hi, e, t);
  }
  function ea(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function yr(e, t) {
    throw t.$$typeof === S ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function cd(e) {
    function t(_, A) {
      if (e) {
        var M = _.deletions;
        M === null ? (_.deletions = [A], _.flags |= 16) : M.push(A);
      }
    }
    function l(_, A) {
      if (!e) return null;
      for (; A !== null; )
        t(_, A), A = A.sibling;
      return null;
    }
    function i(_) {
      for (var A = /* @__PURE__ */ new Map(); _ !== null; )
        _.key !== null ? A.set(_.key, _) : A.set(_.index, _), _ = _.sibling;
      return A;
    }
    function o(_, A) {
      return _ = kn(_, A), _.index = 0, _.sibling = null, _;
    }
    function c(_, A, M) {
      return _.index = M, e ? (M = _.alternate, M !== null ? (M = M.index, M < A ? (_.flags |= 67108866, A) : M) : (_.flags |= 67108866, A)) : (_.flags |= 1048576, A);
    }
    function g(_) {
      return e && _.alternate === null && (_.flags |= 67108866), _;
    }
    function x(_, A, M, X) {
      return A === null || A.tag !== 6 ? (A = io(M, _.mode, X), A.return = _, A) : (A = o(A, M), A.return = _, A);
    }
    function E(_, A, M, X) {
      var he = M.type;
      return he === j ? q(
        _,
        A,
        M.props.children,
        X,
        M.key
      ) : A !== null && (A.elementType === he || typeof he == "object" && he !== null && he.$$typeof === K && Cl(he) === A.type) ? (A = o(A, M.props), ea(A, M), A.return = _, A) : (A = sr(
        M.type,
        M.key,
        M.props,
        null,
        _.mode,
        X
      ), ea(A, M), A.return = _, A);
    }
    function N(_, A, M, X) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== M.containerInfo || A.stateNode.implementation !== M.implementation ? (A = ao(M, _.mode, X), A.return = _, A) : (A = o(A, M.children || []), A.return = _, A);
    }
    function q(_, A, M, X, he) {
      return A === null || A.tag !== 7 ? (A = wl(
        M,
        _.mode,
        X,
        he
      ), A.return = _, A) : (A = o(A, M), A.return = _, A);
    }
    function Q(_, A, M) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = io(
          "" + A,
          _.mode,
          M
        ), A.return = _, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case v:
            return M = sr(
              A.type,
              A.key,
              A.props,
              null,
              _.mode,
              M
            ), ea(M, A), M.return = _, M;
          case z:
            return A = ao(
              A,
              _.mode,
              M
            ), A.return = _, A;
          case K:
            return A = Cl(A), Q(_, A, M);
        }
        if (I(A) || ee(A))
          return A = wl(
            A,
            _.mode,
            M,
            null
          ), A.return = _, A;
        if (typeof A.then == "function")
          return Q(_, gr(A), M);
        if (A.$$typeof === Y)
          return Q(
            _,
            dr(_, A),
            M
          );
        yr(_, A);
      }
      return null;
    }
    function R(_, A, M, X) {
      var he = A !== null ? A.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return he !== null ? null : x(_, A, "" + M, X);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case v:
            return M.key === he ? E(_, A, M, X) : null;
          case z:
            return M.key === he ? N(_, A, M, X) : null;
          case K:
            return M = Cl(M), R(_, A, M, X);
        }
        if (I(M) || ee(M))
          return he !== null ? null : q(_, A, M, X, null);
        if (typeof M.then == "function")
          return R(
            _,
            A,
            gr(M),
            X
          );
        if (M.$$typeof === Y)
          return R(
            _,
            A,
            dr(_, M),
            X
          );
        yr(_, M);
      }
      return null;
    }
    function U(_, A, M, X, he) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return _ = _.get(M) || null, x(A, _, "" + X, he);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case v:
            return _ = _.get(
              X.key === null ? M : X.key
            ) || null, E(A, _, X, he);
          case z:
            return _ = _.get(
              X.key === null ? M : X.key
            ) || null, N(A, _, X, he);
          case K:
            return X = Cl(X), U(
              _,
              A,
              M,
              X,
              he
            );
        }
        if (I(X) || ee(X))
          return _ = _.get(M) || null, q(A, _, X, he, null);
        if (typeof X.then == "function")
          return U(
            _,
            A,
            M,
            gr(X),
            he
          );
        if (X.$$typeof === Y)
          return U(
            _,
            A,
            M,
            dr(A, X),
            he
          );
        yr(A, X);
      }
      return null;
    }
    function oe(_, A, M, X) {
      for (var he = null, je = null, ce = A, Ee = A = 0, Me = null; ce !== null && Ee < M.length; Ee++) {
        ce.index > Ee ? (Me = ce, ce = null) : Me = ce.sibling;
        var Le = R(
          _,
          ce,
          M[Ee],
          X
        );
        if (Le === null) {
          ce === null && (ce = Me);
          break;
        }
        e && ce && Le.alternate === null && t(_, ce), A = c(Le, A, Ee), je === null ? he = Le : je.sibling = Le, je = Le, ce = Me;
      }
      if (Ee === M.length)
        return l(_, ce), Ne && wn(_, Ee), he;
      if (ce === null) {
        for (; Ee < M.length; Ee++)
          ce = Q(_, M[Ee], X), ce !== null && (A = c(
            ce,
            A,
            Ee
          ), je === null ? he = ce : je.sibling = ce, je = ce);
        return Ne && wn(_, Ee), he;
      }
      for (ce = i(ce); Ee < M.length; Ee++)
        Me = U(
          ce,
          _,
          Ee,
          M[Ee],
          X
        ), Me !== null && (e && Me.alternate !== null && ce.delete(
          Me.key === null ? Ee : Me.key
        ), A = c(
          Me,
          A,
          Ee
        ), je === null ? he = Me : je.sibling = Me, je = Me);
      return e && ce.forEach(function(fl) {
        return t(_, fl);
      }), Ne && wn(_, Ee), he;
    }
    function pe(_, A, M, X) {
      if (M == null) throw Error(u(151));
      for (var he = null, je = null, ce = A, Ee = A = 0, Me = null, Le = M.next(); ce !== null && !Le.done; Ee++, Le = M.next()) {
        ce.index > Ee ? (Me = ce, ce = null) : Me = ce.sibling;
        var fl = R(_, ce, Le.value, X);
        if (fl === null) {
          ce === null && (ce = Me);
          break;
        }
        e && ce && fl.alternate === null && t(_, ce), A = c(fl, A, Ee), je === null ? he = fl : je.sibling = fl, je = fl, ce = Me;
      }
      if (Le.done)
        return l(_, ce), Ne && wn(_, Ee), he;
      if (ce === null) {
        for (; !Le.done; Ee++, Le = M.next())
          Le = Q(_, Le.value, X), Le !== null && (A = c(Le, A, Ee), je === null ? he = Le : je.sibling = Le, je = Le);
        return Ne && wn(_, Ee), he;
      }
      for (ce = i(ce); !Le.done; Ee++, Le = M.next())
        Le = U(ce, _, Ee, Le.value, X), Le !== null && (e && Le.alternate !== null && ce.delete(Le.key === null ? Ee : Le.key), A = c(Le, A, Ee), je === null ? he = Le : je.sibling = Le, je = Le);
      return e && ce.forEach(function(av) {
        return t(_, av);
      }), Ne && wn(_, Ee), he;
    }
    function Ve(_, A, M, X) {
      if (typeof M == "object" && M !== null && M.type === j && M.key === null && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case v:
            e: {
              for (var he = M.key; A !== null; ) {
                if (A.key === he) {
                  if (he = M.type, he === j) {
                    if (A.tag === 7) {
                      l(
                        _,
                        A.sibling
                      ), X = o(
                        A,
                        M.props.children
                      ), X.return = _, _ = X;
                      break e;
                    }
                  } else if (A.elementType === he || typeof he == "object" && he !== null && he.$$typeof === K && Cl(he) === A.type) {
                    l(
                      _,
                      A.sibling
                    ), X = o(A, M.props), ea(X, M), X.return = _, _ = X;
                    break e;
                  }
                  l(_, A);
                  break;
                } else t(_, A);
                A = A.sibling;
              }
              M.type === j ? (X = wl(
                M.props.children,
                _.mode,
                X,
                M.key
              ), X.return = _, _ = X) : (X = sr(
                M.type,
                M.key,
                M.props,
                null,
                _.mode,
                X
              ), ea(X, M), X.return = _, _ = X);
            }
            return g(_);
          case z:
            e: {
              for (he = M.key; A !== null; ) {
                if (A.key === he)
                  if (A.tag === 4 && A.stateNode.containerInfo === M.containerInfo && A.stateNode.implementation === M.implementation) {
                    l(
                      _,
                      A.sibling
                    ), X = o(A, M.children || []), X.return = _, _ = X;
                    break e;
                  } else {
                    l(_, A);
                    break;
                  }
                else t(_, A);
                A = A.sibling;
              }
              X = ao(M, _.mode, X), X.return = _, _ = X;
            }
            return g(_);
          case K:
            return M = Cl(M), Ve(
              _,
              A,
              M,
              X
            );
        }
        if (I(M))
          return oe(
            _,
            A,
            M,
            X
          );
        if (ee(M)) {
          if (he = ee(M), typeof he != "function") throw Error(u(150));
          return M = he.call(M), pe(
            _,
            A,
            M,
            X
          );
        }
        if (typeof M.then == "function")
          return Ve(
            _,
            A,
            gr(M),
            X
          );
        if (M.$$typeof === Y)
          return Ve(
            _,
            A,
            dr(_, M),
            X
          );
        yr(_, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, A !== null && A.tag === 6 ? (l(_, A.sibling), X = o(A, M), X.return = _, _ = X) : (l(_, A), X = io(M, _.mode, X), X.return = _, _ = X), g(_)) : l(_, A);
    }
    return function(_, A, M, X) {
      try {
        Pi = 0;
        var he = Ve(
          _,
          A,
          M,
          X
        );
        return hi = null, he;
      } catch (ce) {
        if (ce === di || ce === mr) throw ce;
        var je = Ht(29, ce, null, _.mode);
        return je.lanes = X, je.return = _, je;
      }
    };
  }
  var Ol = cd(!0), fd = cd(!1), Fn = !1;
  function bo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function vo(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Jn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function In(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Ue & 2) !== 0) {
      var o = i.pending;
      return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = or(e), Ff(e, null, l), t;
    }
    return ur(e, i, t, l), or(e);
  }
  function ta(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, tf(e, l);
    }
  }
  function xo(e, t) {
    var l = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, l === i)) {
      var o = null, c = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var g = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          c === null ? o = c = g : c = c.next = g, l = l.next;
        } while (l !== null);
        c === null ? o = c = t : c = c.next = t;
      } else o = c = t;
      l = {
        baseState: i.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: c,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var So = !1;
  function na() {
    if (So) {
      var e = fi;
      if (e !== null) throw e;
    }
  }
  function la(e, t, l, i) {
    So = !1;
    var o = e.updateQueue;
    Fn = !1;
    var c = o.firstBaseUpdate, g = o.lastBaseUpdate, x = o.shared.pending;
    if (x !== null) {
      o.shared.pending = null;
      var E = x, N = E.next;
      E.next = null, g === null ? c = N : g.next = N, g = E;
      var q = e.alternate;
      q !== null && (q = q.updateQueue, x = q.lastBaseUpdate, x !== g && (x === null ? q.firstBaseUpdate = N : x.next = N, q.lastBaseUpdate = E));
    }
    if (c !== null) {
      var Q = o.baseState;
      g = 0, q = N = E = null, x = c;
      do {
        var R = x.lane & -536870913, U = R !== x.lane;
        if (U ? (De & R) === R : (i & R) === R) {
          R !== 0 && R === ci && (So = !0), q !== null && (q = q.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var oe = e, pe = x;
            R = t;
            var Ve = l;
            switch (pe.tag) {
              case 1:
                if (oe = pe.payload, typeof oe == "function") {
                  Q = oe.call(Ve, Q, R);
                  break e;
                }
                Q = oe;
                break e;
              case 3:
                oe.flags = oe.flags & -65537 | 128;
              case 0:
                if (oe = pe.payload, R = typeof oe == "function" ? oe.call(Ve, Q, R) : oe, R == null) break e;
                Q = y({}, Q, R);
                break e;
              case 2:
                Fn = !0;
            }
          }
          R = x.callback, R !== null && (e.flags |= 64, U && (e.flags |= 8192), U = o.callbacks, U === null ? o.callbacks = [R] : U.push(R));
        } else
          U = {
            lane: R,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, q === null ? (N = q = U, E = Q) : q = q.next = U, g |= R;
        if (x = x.next, x === null) {
          if (x = o.shared.pending, x === null)
            break;
          U = x, x = U.next, U.next = null, o.lastBaseUpdate = U, o.shared.pending = null;
        }
      } while (!0);
      q === null && (E = Q), o.baseState = E, o.firstBaseUpdate = N, o.lastBaseUpdate = q, c === null && (o.shared.lanes = 0), tl |= g, e.lanes = g, e.memoizedState = Q;
    }
  }
  function dd(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function hd(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        dd(l[e], t);
  }
  var mi = T(null), br = T(0);
  function md(e, t) {
    e = Rn, w(br, e), w(mi, t), Rn = e | t.baseLanes;
  }
  function ko() {
    w(br, Rn), w(mi, mi.current);
  }
  function wo() {
    Rn = br.current, G(mi), G(br);
  }
  var qt = T(null), en = null;
  function $n(e) {
    var t = e.alternate;
    w(et, et.current & 1), w(qt, e), en === null && (t === null || mi.current !== null || t.memoizedState !== null) && (en = e);
  }
  function Eo(e) {
    w(et, et.current), w(qt, e), en === null && (en = e);
  }
  function pd(e) {
    e.tag === 22 ? (w(et, et.current), w(qt, e), en === null && (en = e)) : Wn();
  }
  function Wn() {
    w(et, et.current), w(qt, qt.current);
  }
  function Yt(e) {
    G(qt), en === e && (en = null), G(et);
  }
  var et = T(0);
  function vr(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Os(l) || Ds(l)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Tn = 0, ke = null, Ye = null, lt = null, xr = !1, pi = !1, Dl = !1, Sr = 0, ia = 0, gi = null, Jb = 0;
  function We() {
    throw Error(u(321));
  }
  function zo(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Bt(e[l], t[l])) return !1;
    return !0;
  }
  function To(e, t, l, i, o, c) {
    return Tn = c, ke = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Wd : Yo, Dl = !1, c = l(i, o), Dl = !1, pi && (c = yd(
      t,
      l,
      i,
      o
    )), gd(e), c;
  }
  function gd(e) {
    O.H = ua;
    var t = Ye !== null && Ye.next !== null;
    if (Tn = 0, lt = Ye = ke = null, xr = !1, ia = 0, gi = null, t) throw Error(u(300));
    e === null || it || (e = e.dependencies, e !== null && fr(e) && (it = !0));
  }
  function yd(e, t, l, i) {
    ke = e;
    var o = 0;
    do {
      if (pi && (gi = null), ia = 0, pi = !1, 25 <= o) throw Error(u(301));
      if (o += 1, lt = Ye = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      O.H = Pd, c = t(l, i);
    } while (pi);
    return c;
  }
  function Ib() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? aa(t) : t, e = e.useState()[0], (Ye !== null ? Ye.memoizedState : null) !== e && (ke.flags |= 1024), t;
  }
  function Ao() {
    var e = Sr !== 0;
    return Sr = 0, e;
  }
  function Co(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function _o(e) {
    if (xr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      xr = !1;
    }
    Tn = 0, lt = Ye = ke = null, pi = !1, ia = Sr = 0, gi = null;
  }
  function wt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return lt === null ? ke.memoizedState = lt = e : lt = lt.next = e, lt;
  }
  function tt() {
    if (Ye === null) {
      var e = ke.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ye.next;
    var t = lt === null ? ke.memoizedState : lt.next;
    if (t !== null)
      lt = t, Ye = e;
    else {
      if (e === null)
        throw ke.alternate === null ? Error(u(467)) : Error(u(310));
      Ye = e, e = {
        memoizedState: Ye.memoizedState,
        baseState: Ye.baseState,
        baseQueue: Ye.baseQueue,
        queue: Ye.queue,
        next: null
      }, lt === null ? ke.memoizedState = lt = e : lt = lt.next = e;
    }
    return lt;
  }
  function kr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function aa(e) {
    var t = ia;
    return ia += 1, gi === null && (gi = []), e = ud(gi, e, t), t = ke, (lt === null ? t.memoizedState : lt.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Wd : Yo), e;
  }
  function wr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return aa(e);
      if (e.$$typeof === Y) return mt(e);
    }
    throw Error(u(438, String(e)));
  }
  function Oo(e) {
    var t = null, l = ke.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var i = ke.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(o) {
          return o.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = kr(), ke.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = L;
    return t.index++, l;
  }
  function An(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Er(e) {
    var t = tt();
    return Do(t, Ye, e);
  }
  function Do(e, t, l) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = l;
    var o = e.baseQueue, c = i.pending;
    if (c !== null) {
      if (o !== null) {
        var g = o.next;
        o.next = c.next, c.next = g;
      }
      t.baseQueue = o = c, i.pending = null;
    }
    if (c = e.baseState, o === null) e.memoizedState = c;
    else {
      t = o.next;
      var x = g = null, E = null, N = t, q = !1;
      do {
        var Q = N.lane & -536870913;
        if (Q !== N.lane ? (De & Q) === Q : (Tn & Q) === Q) {
          var R = N.revertLane;
          if (R === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), Q === ci && (q = !0);
          else if ((Tn & R) === R) {
            N = N.next, R === ci && (q = !0);
            continue;
          } else
            Q = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, E === null ? (x = E = Q, g = c) : E = E.next = Q, ke.lanes |= R, tl |= R;
          Q = N.action, Dl && l(c, Q), c = N.hasEagerState ? N.eagerState : l(c, Q);
        } else
          R = {
            lane: Q,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, E === null ? (x = E = R, g = c) : E = E.next = R, ke.lanes |= Q, tl |= Q;
        N = N.next;
      } while (N !== null && N !== t);
      if (E === null ? g = c : E.next = x, !Bt(c, e.memoizedState) && (it = !0, q && (l = fi, l !== null)))
        throw l;
      e.memoizedState = c, e.baseState = g, e.baseQueue = E, i.lastRenderedState = c;
    }
    return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Mo(e) {
    var t = tt(), l = t.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = e;
    var i = l.dispatch, o = l.pending, c = t.memoizedState;
    if (o !== null) {
      l.pending = null;
      var g = o = o.next;
      do
        c = e(c, g.action), g = g.next;
      while (g !== o);
      Bt(c, t.memoizedState) || (it = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), l.lastRenderedState = c;
    }
    return [c, i];
  }
  function bd(e, t, l) {
    var i = ke, o = tt(), c = Ne;
    if (c) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = t();
    var g = !Bt(
      (Ye || o).memoizedState,
      l
    );
    if (g && (o.memoizedState = l, it = !0), o = o.queue, jo(Sd.bind(null, i, o, e), [
      e
    ]), o.getSnapshot !== t || g || lt !== null && lt.memoizedState.tag & 1) {
      if (i.flags |= 2048, yi(
        9,
        { destroy: void 0 },
        xd.bind(
          null,
          i,
          o,
          l,
          t
        ),
        null
      ), Ze === null) throw Error(u(349));
      c || (Tn & 127) !== 0 || vd(i, t, l);
    }
    return l;
  }
  function vd(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = ke.updateQueue, t === null ? (t = kr(), ke.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function xd(e, t, l, i) {
    t.value = l, t.getSnapshot = i, kd(t) && wd(e);
  }
  function Sd(e, t, l) {
    return l(function() {
      kd(t) && wd(e);
    });
  }
  function kd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Bt(e, l);
    } catch {
      return !0;
    }
  }
  function wd(e) {
    var t = kl(e, 2);
    t !== null && Rt(t, e, 2);
  }
  function No(e) {
    var t = wt();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Dl) {
        At(!0);
        try {
          l();
        } finally {
          At(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: An,
      lastRenderedState: e
    }, t;
  }
  function Ed(e, t, l, i) {
    return e.baseState = l, Do(
      e,
      Ye,
      typeof i == "function" ? i : An
    );
  }
  function $b(e, t, l, i, o) {
    if (Ar(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: o,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(g) {
          c.listeners.push(g);
        }
      };
      O.T !== null ? l(!0) : c.isTransition = !1, i(c), l = t.pending, l === null ? (c.next = t.pending = c, zd(t, c)) : (c.next = l.next, t.pending = l.next = c);
    }
  }
  function zd(e, t) {
    var l = t.action, i = t.payload, o = e.state;
    if (t.isTransition) {
      var c = O.T, g = {};
      O.T = g;
      try {
        var x = l(o, i), E = O.S;
        E !== null && E(g, x), Td(e, t, x);
      } catch (N) {
        Ro(e, t, N);
      } finally {
        c !== null && g.types !== null && (c.types = g.types), O.T = c;
      }
    } else
      try {
        c = l(o, i), Td(e, t, c);
      } catch (N) {
        Ro(e, t, N);
      }
  }
  function Td(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Ad(e, t, i);
      },
      function(i) {
        return Ro(e, t, i);
      }
    ) : Ad(e, t, l);
  }
  function Ad(e, t, l) {
    t.status = "fulfilled", t.value = l, Cd(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, zd(e, l)));
  }
  function Ro(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Cd(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Cd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function _d(e, t) {
    return t;
  }
  function Od(e, t) {
    if (Ne) {
      var l = Ze.formState;
      if (l !== null) {
        e: {
          var i = ke;
          if (Ne) {
            if (Je) {
              t: {
                for (var o = Je, c = Pt; o.nodeType !== 8; ) {
                  if (!c) {
                    o = null;
                    break t;
                  }
                  if (o = tn(
                    o.nextSibling
                  ), o === null) {
                    o = null;
                    break t;
                  }
                }
                c = o.data, o = c === "F!" || c === "F" ? o : null;
              }
              if (o) {
                Je = tn(
                  o.nextSibling
                ), i = o.data === "F!";
                break e;
              }
            }
            Zn(i);
          }
          i = !1;
        }
        i && (t = l[0]);
      }
    }
    return l = wt(), l.memoizedState = l.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _d,
      lastRenderedState: t
    }, l.queue = i, l = Jd.bind(
      null,
      ke,
      i
    ), i.dispatch = l, i = No(!1), c = qo.bind(
      null,
      ke,
      !1,
      i.queue
    ), i = wt(), o = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = o, l = $b.bind(
      null,
      ke,
      o,
      c,
      l
    ), o.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function Dd(e) {
    var t = tt();
    return Md(t, Ye, e);
  }
  function Md(e, t, l) {
    if (t = Do(
      e,
      t,
      _d
    )[0], e = Er(An)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = aa(t);
      } catch (g) {
        throw g === di ? mr : g;
      }
    else i = t;
    t = tt();
    var o = t.queue, c = o.dispatch;
    return l !== t.memoizedState && (ke.flags |= 2048, yi(
      9,
      { destroy: void 0 },
      Wb.bind(null, o, l),
      null
    )), [i, c, e];
  }
  function Wb(e, t) {
    e.action = t;
  }
  function Nd(e) {
    var t = tt(), l = Ye;
    if (l !== null)
      return Md(t, l, e);
    tt(), t = t.memoizedState, l = tt();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function yi(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = ke.updateQueue, t === null && (t = kr(), ke.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Rd() {
    return tt().memoizedState;
  }
  function zr(e, t, l, i) {
    var o = wt();
    ke.flags |= e, o.memoizedState = yi(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function Tr(e, t, l, i) {
    var o = tt();
    i = i === void 0 ? null : i;
    var c = o.memoizedState.inst;
    Ye !== null && i !== null && zo(i, Ye.memoizedState.deps) ? o.memoizedState = yi(t, c, l, i) : (ke.flags |= e, o.memoizedState = yi(
      1 | t,
      c,
      l,
      i
    ));
  }
  function jd(e, t) {
    zr(8390656, 8, e, t);
  }
  function jo(e, t) {
    Tr(2048, 8, e, t);
  }
  function Pb(e) {
    ke.flags |= 4;
    var t = ke.updateQueue;
    if (t === null)
      t = kr(), ke.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Ld(e) {
    var t = tt().memoizedState;
    return Pb({ ref: t, nextImpl: e }), function() {
      if ((Ue & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Ud(e, t) {
    return Tr(4, 2, e, t);
  }
  function Bd(e, t) {
    return Tr(4, 4, e, t);
  }
  function Hd(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function qd(e, t, l) {
    l = l != null ? l.concat([e]) : null, Tr(4, 4, Hd.bind(null, t, e), l);
  }
  function Lo() {
  }
  function Yd(e, t) {
    var l = tt();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && zo(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function Gd(e, t) {
    var l = tt();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && zo(t, i[1]))
      return i[0];
    if (i = e(), Dl) {
      At(!0);
      try {
        e();
      } finally {
        At(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function Uo(e, t, l) {
    return l === void 0 || (Tn & 1073741824) !== 0 && (De & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Vh(), ke.lanes |= e, tl |= e, l);
  }
  function Vd(e, t, l, i) {
    return Bt(l, t) ? l : mi.current !== null ? (e = Uo(e, l, i), Bt(e, t) || (it = !0), e) : (Tn & 42) === 0 || (Tn & 1073741824) !== 0 && (De & 261930) === 0 ? (it = !0, e.memoizedState = l) : (e = Vh(), ke.lanes |= e, tl |= e, t);
  }
  function Xd(e, t, l, i, o) {
    var c = F.p;
    F.p = c !== 0 && 8 > c ? c : 8;
    var g = O.T, x = {};
    O.T = x, qo(e, !1, t, l);
    try {
      var E = o(), N = O.S;
      if (N !== null && N(x, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var q = Fb(
          E,
          i
        );
        ra(
          e,
          t,
          q,
          Xt(e)
        );
      } else
        ra(
          e,
          t,
          i,
          Xt(e)
        );
    } catch (Q) {
      ra(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Q },
        Xt()
      );
    } finally {
      F.p = c, g !== null && x.types !== null && (g.types = x.types), O.T = g;
    }
  }
  function e1() {
  }
  function Bo(e, t, l, i) {
    if (e.tag !== 5) throw Error(u(476));
    var o = Qd(e).queue;
    Xd(
      e,
      o,
      t,
      se,
      l === null ? e1 : function() {
        return Zd(e), l(i);
      }
    );
  }
  function Qd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: se,
      baseState: se,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: An,
        lastRenderedState: se
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: An,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Zd(e) {
    var t = Qd(e);
    t.next === null && (t = e.alternate.memoizedState), ra(
      e,
      t.next.queue,
      {},
      Xt()
    );
  }
  function Ho() {
    return mt(wa);
  }
  function Kd() {
    return tt().memoizedState;
  }
  function Fd() {
    return tt().memoizedState;
  }
  function t1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Xt();
          e = Jn(l);
          var i = In(t, e, l);
          i !== null && (Rt(i, t, l), ta(i, t, l)), t = { cache: mo() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function n1(e, t, l) {
    var i = Xt();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ar(e) ? Id(t, l) : (l = no(e, t, l, i), l !== null && (Rt(l, e, i), $d(l, t, i)));
  }
  function Jd(e, t, l) {
    var i = Xt();
    ra(e, t, l, i);
  }
  function ra(e, t, l, i) {
    var o = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ar(e)) Id(t, o);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var g = t.lastRenderedState, x = c(g, l);
          if (o.hasEagerState = !0, o.eagerState = x, Bt(x, g))
            return ur(e, t, o, 0), Ze === null && rr(), !1;
        } catch {
        }
      if (l = no(e, t, o, i), l !== null)
        return Rt(l, e, i), $d(l, t, i), !0;
    }
    return !1;
  }
  function qo(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: bs(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ar(e)) {
      if (t) throw Error(u(479));
    } else
      t = no(
        e,
        l,
        i,
        2
      ), t !== null && Rt(t, e, 2);
  }
  function Ar(e) {
    var t = e.alternate;
    return e === ke || t !== null && t === ke;
  }
  function Id(e, t) {
    pi = xr = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function $d(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, tf(e, l);
    }
  }
  var ua = {
    readContext: mt,
    use: wr,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useLayoutEffect: We,
    useInsertionEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useSyncExternalStore: We,
    useId: We,
    useHostTransitionStatus: We,
    useFormState: We,
    useActionState: We,
    useOptimistic: We,
    useMemoCache: We,
    useCacheRefresh: We
  };
  ua.useEffectEvent = We;
  var Wd = {
    readContext: mt,
    use: wr,
    useCallback: function(e, t) {
      return wt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: mt,
    useEffect: jd,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, zr(
        4194308,
        4,
        Hd.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return zr(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      zr(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = wt();
      t = t === void 0 ? null : t;
      var i = e();
      if (Dl) {
        At(!0);
        try {
          e();
        } finally {
          At(!1);
        }
      }
      return l.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, l) {
      var i = wt();
      if (l !== void 0) {
        var o = l(t);
        if (Dl) {
          At(!0);
          try {
            l(t);
          } finally {
            At(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = n1.bind(
        null,
        ke,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = wt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = No(e);
      var t = e.queue, l = Jd.bind(null, ke, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Lo,
    useDeferredValue: function(e, t) {
      var l = wt();
      return Uo(l, e, t);
    },
    useTransition: function() {
      var e = No(!1);
      return e = Xd.bind(
        null,
        ke,
        e.queue,
        !0,
        !1
      ), wt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = ke, o = wt();
      if (Ne) {
        if (l === void 0)
          throw Error(u(407));
        l = l();
      } else {
        if (l = t(), Ze === null)
          throw Error(u(349));
        (De & 127) !== 0 || vd(i, t, l);
      }
      o.memoizedState = l;
      var c = { value: l, getSnapshot: t };
      return o.queue = c, jd(Sd.bind(null, i, c, e), [
        e
      ]), i.flags |= 2048, yi(
        9,
        { destroy: void 0 },
        xd.bind(
          null,
          i,
          c,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = wt(), t = Ze.identifierPrefix;
      if (Ne) {
        var l = dn, i = fn;
        l = (i & ~(1 << 32 - Qe(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Sr++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Jb++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ho,
    useFormState: Od,
    useActionState: Od,
    useOptimistic: function(e) {
      var t = wt();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = qo.bind(
        null,
        ke,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: Oo,
    useCacheRefresh: function() {
      return wt().memoizedState = t1.bind(
        null,
        ke
      );
    },
    useEffectEvent: function(e) {
      var t = wt(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Ue & 2) !== 0)
          throw Error(u(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Yo = {
    readContext: mt,
    use: wr,
    useCallback: Yd,
    useContext: mt,
    useEffect: jo,
    useImperativeHandle: qd,
    useInsertionEffect: Ud,
    useLayoutEffect: Bd,
    useMemo: Gd,
    useReducer: Er,
    useRef: Rd,
    useState: function() {
      return Er(An);
    },
    useDebugValue: Lo,
    useDeferredValue: function(e, t) {
      var l = tt();
      return Vd(
        l,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Er(An)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : aa(e),
        t
      ];
    },
    useSyncExternalStore: bd,
    useId: Kd,
    useHostTransitionStatus: Ho,
    useFormState: Dd,
    useActionState: Dd,
    useOptimistic: function(e, t) {
      var l = tt();
      return Ed(l, Ye, e, t);
    },
    useMemoCache: Oo,
    useCacheRefresh: Fd
  };
  Yo.useEffectEvent = Ld;
  var Pd = {
    readContext: mt,
    use: wr,
    useCallback: Yd,
    useContext: mt,
    useEffect: jo,
    useImperativeHandle: qd,
    useInsertionEffect: Ud,
    useLayoutEffect: Bd,
    useMemo: Gd,
    useReducer: Mo,
    useRef: Rd,
    useState: function() {
      return Mo(An);
    },
    useDebugValue: Lo,
    useDeferredValue: function(e, t) {
      var l = tt();
      return Ye === null ? Uo(l, e, t) : Vd(
        l,
        Ye.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Mo(An)[0], t = tt().memoizedState;
      return [
        typeof e == "boolean" ? e : aa(e),
        t
      ];
    },
    useSyncExternalStore: bd,
    useId: Kd,
    useHostTransitionStatus: Ho,
    useFormState: Nd,
    useActionState: Nd,
    useOptimistic: function(e, t) {
      var l = tt();
      return Ye !== null ? Ed(l, Ye, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Oo,
    useCacheRefresh: Fd
  };
  Pd.useEffectEvent = Ld;
  function Go(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : y({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Vo = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), o = Jn(i);
      o.payload = t, l != null && (o.callback = l), t = In(e, o, i), t !== null && (Rt(t, e, i), ta(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), o = Jn(i);
      o.tag = 1, o.payload = t, l != null && (o.callback = l), t = In(e, o, i), t !== null && (Rt(t, e, i), ta(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Xt(), i = Jn(l);
      i.tag = 2, t != null && (i.callback = t), t = In(e, i, l), t !== null && (Rt(t, e, l), ta(t, e, l));
    }
  };
  function eh(e, t, l, i, o, c, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, g) : t.prototype && t.prototype.isPureReactComponent ? !Ki(l, i) || !Ki(o, c) : !0;
  }
  function th(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && Vo.enqueueReplaceState(t, t.state, null);
  }
  function Ml(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var i in t)
        i !== "ref" && (l[i] = t[i]);
    }
    if (e = e.defaultProps) {
      l === t && (l = y({}, l));
      for (var o in e)
        l[o] === void 0 && (l[o] = e[o]);
    }
    return l;
  }
  function nh(e) {
    ar(e);
  }
  function lh(e) {
    console.error(e);
  }
  function ih(e) {
    ar(e);
  }
  function Cr(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function ah(e, t, l) {
    try {
      var i = e.onCaughtError;
      i(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Xo(e, t, l) {
    return l = Jn(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Cr(e, t);
    }, l;
  }
  function rh(e) {
    return e = Jn(e), e.tag = 3, e;
  }
  function uh(e, t, l, i) {
    var o = l.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = i.value;
      e.payload = function() {
        return o(c);
      }, e.callback = function() {
        ah(t, l, i);
      };
    }
    var g = l.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      ah(t, l, i), typeof o != "function" && (nl === null ? nl = /* @__PURE__ */ new Set([this]) : nl.add(this));
      var x = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function l1(e, t, l, i, o) {
    if (l.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = l.alternate, t !== null && si(
        t,
        l,
        o,
        !0
      ), l = qt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return en === null ? qr() : l.alternate === null && Pe === 0 && (Pe = 3), l.flags &= -257, l.flags |= 65536, l.lanes = o, i === pr ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), ps(e, i, o)), !1;
          case 22:
            return l.flags |= 65536, i === pr ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), ps(e, i, o)), !1;
        }
        throw Error(u(435, l.tag));
      }
      return ps(e, i, o), qr(), !1;
    }
    if (Ne)
      return t = qt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== oo && (e = Error(u(422), { cause: i }), Ii(It(e, l)))) : (i !== oo && (t = Error(u(423), {
        cause: i
      }), Ii(
        It(t, l)
      )), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = It(i, l), o = Xo(
        e.stateNode,
        i,
        o
      ), xo(e, o), Pe !== 4 && (Pe = 2)), !1;
    var c = Error(u(520), { cause: i });
    if (c = It(c, l), pa === null ? pa = [c] : pa.push(c), Pe !== 4 && (Pe = 2), t === null) return !0;
    i = It(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = o & -o, l.lanes |= e, e = Xo(l.stateNode, i, e), xo(l, e), !1;
        case 1:
          if (t = l.type, c = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (nl === null || !nl.has(c))))
            return l.flags |= 65536, o &= -o, l.lanes |= o, o = rh(o), uh(
              o,
              e,
              l,
              i
            ), xo(l, o), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Qo = Error(u(461)), it = !1;
  function pt(e, t, l, i) {
    t.child = e === null ? fd(t, null, l, i) : Ol(
      t,
      e.child,
      l,
      i
    );
  }
  function oh(e, t, l, i, o) {
    l = l.render;
    var c = t.ref;
    if ("ref" in i) {
      var g = {};
      for (var x in i)
        x !== "ref" && (g[x] = i[x]);
    } else g = i;
    return Tl(t), i = To(
      e,
      t,
      l,
      g,
      c,
      o
    ), x = Ao(), e !== null && !it ? (Co(e, t, o), Cn(e, t, o)) : (Ne && x && ro(t), t.flags |= 1, pt(e, t, i, o), t.child);
  }
  function sh(e, t, l, i, o) {
    if (e === null) {
      var c = l.type;
      return typeof c == "function" && !lo(c) && c.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = c, ch(
        e,
        t,
        c,
        i,
        o
      )) : (e = sr(
        l.type,
        null,
        i,
        t,
        t.mode,
        o
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Po(e, o)) {
      var g = c.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ki, l(g, i) && e.ref === t.ref)
        return Cn(e, t, o);
    }
    return t.flags |= 1, e = kn(c, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ch(e, t, l, i, o) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ki(c, i) && e.ref === t.ref)
        if (it = !1, t.pendingProps = i = c, Po(e, o))
          (e.flags & 131072) !== 0 && (it = !0);
        else
          return t.lanes = e.lanes, Cn(e, t, o);
    }
    return Zo(
      e,
      t,
      l,
      i,
      o
    );
  }
  function fh(e, t, l, i) {
    var o = i.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | l : l, e !== null) {
          for (i = t.child = e.child, o = 0; i !== null; )
            o = o | i.lanes | i.childLanes, i = i.sibling;
          i = o & ~c;
        } else i = 0, t.child = null;
        return dh(
          e,
          t,
          c,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && hr(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? md(t, c) : ko(), pd(t);
      else
        return i = t.lanes = 536870912, dh(
          e,
          t,
          c !== null ? c.baseLanes | l : l,
          l,
          i
        );
    } else
      c !== null ? (hr(t, c.cachePool), md(t, c), Wn(), t.memoizedState = null) : (e !== null && hr(t, null), ko(), Wn());
    return pt(e, t, o, l), t.child;
  }
  function oa(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function dh(e, t, l, i, o) {
    var c = go();
    return c = c === null ? null : { parent: nt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: l,
      cachePool: c
    }, e !== null && hr(t, null), ko(), pd(t), e !== null && si(e, t, i, !0), t.childLanes = o, null;
  }
  function _r(e, t) {
    return t = Dr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function hh(e, t, l) {
    return Ol(t, e.child, null, l), e = _r(t, t.pendingProps), e.flags |= 2, Yt(t), t.memoizedState = null, e;
  }
  function i1(e, t, l) {
    var i = t.pendingProps, o = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ne) {
        if (i.mode === "hidden")
          return e = _r(t, i), t.lanes = 536870912, oa(null, e);
        if (Eo(t), (e = Je) ? (e = zm(
          e,
          Pt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Xn !== null ? { id: fn, overflow: dn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = If(e), l.return = t, t.child = l, ht = t, Je = null)) : e = null, e === null) throw Zn(t);
        return t.lanes = 536870912, null;
      }
      return _r(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var g = c.dehydrated;
      if (Eo(t), o)
        if (t.flags & 256)
          t.flags &= -257, t = hh(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (it || si(e, t, l, !1), o = (l & e.childLanes) !== 0, it || o) {
        if (i = Ze, i !== null && (g = nf(i, l), g !== 0 && g !== c.retryLane))
          throw c.retryLane = g, kl(e, g), Rt(i, e, g), Qo;
        qr(), t = hh(
          e,
          t,
          l
        );
      } else
        e = c.treeContext, Je = tn(g.nextSibling), ht = t, Ne = !0, Qn = null, Pt = !1, e !== null && Pf(t, e), t = _r(t, i), t.flags |= 4096;
      return t;
    }
    return e = kn(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Or(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(u(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Zo(e, t, l, i, o) {
    return Tl(t), l = To(
      e,
      t,
      l,
      i,
      void 0,
      o
    ), i = Ao(), e !== null && !it ? (Co(e, t, o), Cn(e, t, o)) : (Ne && i && ro(t), t.flags |= 1, pt(e, t, l, o), t.child);
  }
  function mh(e, t, l, i, o, c) {
    return Tl(t), t.updateQueue = null, l = yd(
      t,
      i,
      l,
      o
    ), gd(e), i = Ao(), e !== null && !it ? (Co(e, t, c), Cn(e, t, c)) : (Ne && i && ro(t), t.flags |= 1, pt(e, t, l, c), t.child);
  }
  function ph(e, t, l, i, o) {
    if (Tl(t), t.stateNode === null) {
      var c = ai, g = l.contextType;
      typeof g == "object" && g !== null && (c = mt(g)), c = new l(i, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Vo, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = i, c.state = t.memoizedState, c.refs = {}, bo(t), g = l.contextType, c.context = typeof g == "object" && g !== null ? mt(g) : ai, c.state = t.memoizedState, g = l.getDerivedStateFromProps, typeof g == "function" && (Go(
        t,
        l,
        g,
        i
      ), c.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (g = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), g !== c.state && Vo.enqueueReplaceState(c, c.state, null), la(t, i, c, o), na(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      c = t.stateNode;
      var x = t.memoizedProps, E = Ml(l, x);
      c.props = E;
      var N = c.context, q = l.contextType;
      g = ai, typeof q == "object" && q !== null && (g = mt(q));
      var Q = l.getDerivedStateFromProps;
      q = typeof Q == "function" || typeof c.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, q || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (x || N !== g) && th(
        t,
        c,
        i,
        g
      ), Fn = !1;
      var R = t.memoizedState;
      c.state = R, la(t, i, c, o), na(), N = t.memoizedState, x || R !== N || Fn ? (typeof Q == "function" && (Go(
        t,
        l,
        Q,
        i
      ), N = t.memoizedState), (E = Fn || eh(
        t,
        l,
        E,
        i,
        R,
        N,
        g
      )) ? (q || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = N), c.props = i, c.state = N, c.context = g, i = E) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      c = t.stateNode, vo(e, t), g = t.memoizedProps, q = Ml(l, g), c.props = q, Q = t.pendingProps, R = c.context, N = l.contextType, E = ai, typeof N == "object" && N !== null && (E = mt(N)), x = l.getDerivedStateFromProps, (N = typeof x == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (g !== Q || R !== E) && th(
        t,
        c,
        i,
        E
      ), Fn = !1, R = t.memoizedState, c.state = R, la(t, i, c, o), na();
      var U = t.memoizedState;
      g !== Q || R !== U || Fn || e !== null && e.dependencies !== null && fr(e.dependencies) ? (typeof x == "function" && (Go(
        t,
        l,
        x,
        i
      ), U = t.memoizedState), (q = Fn || eh(
        t,
        l,
        q,
        i,
        R,
        U,
        E
      ) || e !== null && e.dependencies !== null && fr(e.dependencies)) ? (N || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, U, E), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        i,
        U,
        E
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = U), c.props = i, c.state = U, c.context = E, i = q) : (typeof c.componentDidUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return c = i, Or(e, t), i = (t.flags & 128) !== 0, c || i ? (c = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && i ? (t.child = Ol(
      t,
      e.child,
      null,
      o
    ), t.child = Ol(
      t,
      null,
      l,
      o
    )) : pt(e, t, l, o), t.memoizedState = c.state, e = t.child) : e = Cn(
      e,
      t,
      o
    ), e;
  }
  function gh(e, t, l, i) {
    return El(), t.flags |= 256, pt(e, t, l, i), t.child;
  }
  var Ko = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fo(e) {
    return { baseLanes: e, cachePool: ad() };
  }
  function Jo(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Vt), e;
  }
  function yh(e, t, l) {
    var i = t.pendingProps, o = !1, c = (t.flags & 128) !== 0, g;
    if ((g = c) || (g = e !== null && e.memoizedState === null ? !1 : (et.current & 2) !== 0), g && (o = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ne) {
        if (o ? $n(t) : Wn(), (e = Je) ? (e = zm(
          e,
          Pt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Xn !== null ? { id: fn, overflow: dn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = If(e), l.return = t, t.child = l, ht = t, Je = null)) : e = null, e === null) throw Zn(t);
        return Ds(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var x = i.children;
      return i = i.fallback, o ? (Wn(), o = t.mode, x = Dr(
        { mode: "hidden", children: x },
        o
      ), i = wl(
        i,
        o,
        l,
        null
      ), x.return = t, i.return = t, x.sibling = i, t.child = x, i = t.child, i.memoizedState = Fo(l), i.childLanes = Jo(
        e,
        g,
        l
      ), t.memoizedState = Ko, oa(null, i)) : ($n(t), Io(t, x));
    }
    var E = e.memoizedState;
    if (E !== null && (x = E.dehydrated, x !== null)) {
      if (c)
        t.flags & 256 ? ($n(t), t.flags &= -257, t = $o(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (Wn(), t.child = e.child, t.flags |= 128, t = null) : (Wn(), x = i.fallback, o = t.mode, i = Dr(
          { mode: "visible", children: i.children },
          o
        ), x = wl(
          x,
          o,
          l,
          null
        ), x.flags |= 2, i.return = t, x.return = t, i.sibling = x, t.child = i, Ol(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = Fo(l), i.childLanes = Jo(
          e,
          g,
          l
        ), t.memoizedState = Ko, t = oa(null, i));
      else if ($n(t), Ds(x)) {
        if (g = x.nextSibling && x.nextSibling.dataset, g) var N = g.dgst;
        g = N, i = Error(u(419)), i.stack = "", i.digest = g, Ii({ value: i, source: null, stack: null }), t = $o(
          e,
          t,
          l
        );
      } else if (it || si(e, t, l, !1), g = (l & e.childLanes) !== 0, it || g) {
        if (g = Ze, g !== null && (i = nf(g, l), i !== 0 && i !== E.retryLane))
          throw E.retryLane = i, kl(e, i), Rt(g, e, i), Qo;
        Os(x) || qr(), t = $o(
          e,
          t,
          l
        );
      } else
        Os(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = E.treeContext, Je = tn(
          x.nextSibling
        ), ht = t, Ne = !0, Qn = null, Pt = !1, e !== null && Pf(t, e), t = Io(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return o ? (Wn(), x = i.fallback, o = t.mode, E = e.child, N = E.sibling, i = kn(E, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = E.subtreeFlags & 65011712, N !== null ? x = kn(
      N,
      x
    ) : (x = wl(
      x,
      o,
      l,
      null
    ), x.flags |= 2), x.return = t, i.return = t, i.sibling = x, t.child = i, oa(null, i), i = t.child, x = e.child.memoizedState, x === null ? x = Fo(l) : (o = x.cachePool, o !== null ? (E = nt._currentValue, o = o.parent !== E ? { parent: E, pool: E } : o) : o = ad(), x = {
      baseLanes: x.baseLanes | l,
      cachePool: o
    }), i.memoizedState = x, i.childLanes = Jo(
      e,
      g,
      l
    ), t.memoizedState = Ko, oa(e.child, i)) : ($n(t), l = e.child, e = l.sibling, l = kn(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Io(e, t) {
    return t = Dr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Dr(e, t) {
    return e = Ht(22, e, null, t), e.lanes = 0, e;
  }
  function $o(e, t, l) {
    return Ol(t, e.child, null, l), e = Io(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function bh(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), fo(e.return, t, l);
  }
  function Wo(e, t, l, i, o, c) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: l,
      tailMode: o,
      treeForkCount: c
    } : (g.isBackwards = t, g.rendering = null, g.renderingStartTime = 0, g.last = i, g.tail = l, g.tailMode = o, g.treeForkCount = c);
  }
  function vh(e, t, l) {
    var i = t.pendingProps, o = i.revealOrder, c = i.tail;
    i = i.children;
    var g = et.current, x = (g & 2) !== 0;
    if (x ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, w(et, g), pt(e, t, i, l), i = Ne ? Ji : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && bh(e, l, t);
        else if (e.tag === 19)
          bh(e, l, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (o) {
      case "forwards":
        for (l = t.child, o = null; l !== null; )
          e = l.alternate, e !== null && vr(e) === null && (o = l), l = l.sibling;
        l = o, l === null ? (o = t.child, t.child = null) : (o = l.sibling, l.sibling = null), Wo(
          t,
          !1,
          o,
          l,
          c,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, o = t.child, t.child = null; o !== null; ) {
          if (e = o.alternate, e !== null && vr(e) === null) {
            t.child = o;
            break;
          }
          e = o.sibling, o.sibling = l, l = o, o = e;
        }
        Wo(
          t,
          !0,
          l,
          null,
          c,
          i
        );
        break;
      case "together":
        Wo(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Cn(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), tl |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (si(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, l = kn(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = kn(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Po(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && fr(e)));
  }
  function a1(e, t, l) {
    switch (t.tag) {
      case 3:
        Xe(t, t.stateNode.containerInfo), Kn(t, nt, e.memoizedState.cache), El();
        break;
      case 27:
      case 5:
        xt(t);
        break;
      case 4:
        Xe(t, t.stateNode.containerInfo);
        break;
      case 10:
        Kn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Eo(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? ($n(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? yh(e, t, l) : ($n(t), e = Cn(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        $n(t);
        break;
      case 19:
        var o = (e.flags & 128) !== 0;
        if (i = (l & t.childLanes) !== 0, i || (si(
          e,
          t,
          l,
          !1
        ), i = (l & t.childLanes) !== 0), o) {
          if (i)
            return vh(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), w(et, et.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, fh(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        Kn(t, nt, e.memoizedState.cache);
    }
    return Cn(e, t, l);
  }
  function xh(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        it = !0;
      else {
        if (!Po(e, l) && (t.flags & 128) === 0)
          return it = !1, a1(
            e,
            t,
            l
          );
        it = (e.flags & 131072) !== 0;
      }
    else
      it = !1, Ne && (t.flags & 1048576) !== 0 && Wf(t, Ji, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Cl(t.elementType), t.type = e, typeof e == "function")
            lo(e) ? (i = Ml(e, i), t.tag = 1, t = ph(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = Zo(
              null,
              t,
              e,
              i,
              l
            ));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === re) {
                t.tag = 11, t = oh(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (o === $) {
                t.tag = 14, t = sh(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              }
            }
            throw t = ue(e) || e, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return Zo(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, o = Ml(
          i,
          t.pendingProps
        ), ph(
          e,
          t,
          i,
          o,
          l
        );
      case 3:
        e: {
          if (Xe(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          o = c.element, vo(e, t), la(t, i, null, l);
          var g = t.memoizedState;
          if (i = g.cache, Kn(t, nt, i), i !== c.cache && ho(
            t,
            [nt],
            l,
            !0
          ), na(), i = g.element, c.isDehydrated)
            if (c = {
              element: i,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = gh(
                e,
                t,
                i,
                l
              );
              break e;
            } else if (i !== o) {
              o = It(
                Error(u(424)),
                t
              ), Ii(o), t = gh(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Je = tn(e.firstChild), ht = t, Ne = !0, Qn = null, Pt = !0, l = fd(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (El(), i === o) {
              t = Cn(
                e,
                t,
                l
              );
              break e;
            }
            pt(e, t, i, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Or(e, t), e === null ? (l = Dm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : Ne || (l = t.type, e = t.pendingProps, i = Kr(
          ne.current
        ).createElement(l), i[dt] = t, i[Ct] = e, gt(i, l, e), ct(i), t.stateNode = i) : t.memoizedState = Dm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return xt(t), e === null && Ne && (i = t.stateNode = Cm(
          t.type,
          t.pendingProps,
          ne.current
        ), ht = t, Pt = !0, o = Je, rl(t.type) ? (Ms = o, Je = tn(i.firstChild)) : Je = o), pt(
          e,
          t,
          t.pendingProps.children,
          l
        ), Or(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ne && ((o = i = Je) && (i = j1(
          i,
          t.type,
          t.pendingProps,
          Pt
        ), i !== null ? (t.stateNode = i, ht = t, Je = tn(i.firstChild), Pt = !1, o = !0) : o = !1), o || Zn(t)), xt(t), o = t.type, c = t.pendingProps, g = e !== null ? e.memoizedProps : null, i = c.children, As(o, c) ? i = null : g !== null && As(o, g) && (t.flags |= 32), t.memoizedState !== null && (o = To(
          e,
          t,
          Ib,
          null,
          null,
          l
        ), wa._currentValue = o), Or(e, t), pt(e, t, i, l), t.child;
      case 6:
        return e === null && Ne && ((e = l = Je) && (l = L1(
          l,
          t.pendingProps,
          Pt
        ), l !== null ? (t.stateNode = l, ht = t, Je = null, e = !0) : e = !1), e || Zn(t)), null;
      case 13:
        return yh(e, t, l);
      case 4:
        return Xe(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Ol(
          t,
          null,
          i,
          l
        ) : pt(e, t, i, l), t.child;
      case 11:
        return oh(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return pt(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return pt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return pt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return i = t.pendingProps, Kn(t, t.type, i.value), pt(e, t, i.children, l), t.child;
      case 9:
        return o = t.type._context, i = t.pendingProps.children, Tl(t), o = mt(o), i = i(o), t.flags |= 1, pt(e, t, i, l), t.child;
      case 14:
        return sh(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return ch(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return vh(e, t, l);
      case 31:
        return i1(e, t, l);
      case 22:
        return fh(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Tl(t), i = mt(nt), e === null ? (o = go(), o === null && (o = Ze, c = mo(), o.pooledCache = c, c.refCount++, c !== null && (o.pooledCacheLanes |= l), o = c), t.memoizedState = { parent: i, cache: o }, bo(t), Kn(t, nt, o)) : ((e.lanes & l) !== 0 && (vo(e, t), la(t, null, null, l), na()), o = e.memoizedState, c = t.memoizedState, o.parent !== i ? (o = { parent: i, cache: i }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Kn(t, nt, i)) : (i = c.cache, Kn(t, nt, i), i !== o.cache && ho(
          t,
          [nt],
          l,
          !0
        ))), pt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function _n(e) {
    e.flags |= 4;
  }
  function es(e, t, l, i, o) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (o & 335544128) === o)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Kh()) e.flags |= 8192;
        else
          throw _l = pr, yo;
    } else e.flags &= -16777217;
  }
  function Sh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Lm(t))
      if (Kh()) e.flags |= 8192;
      else
        throw _l = pr, yo;
  }
  function Mr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Pc() : 536870912, e.lanes |= t, Si |= t);
  }
  function sa(e, t) {
    if (!Ne)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var i = null; l !== null; )
            l.alternate !== null && (i = l), l = l.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
  }
  function Ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, i = 0;
    if (t)
      for (var o = e.child; o !== null; )
        l |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
    else
      for (o = e.child; o !== null; )
        l |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= i, e.childLanes = l, t;
  }
  function r1(e, t, l) {
    var i = t.pendingProps;
    switch (uo(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ie(t), null;
      case 1:
        return Ie(t), null;
      case 3:
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), zn(nt), be(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (oi(t) ? _n(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, so())), Ie(t), null;
      case 26:
        var o = t.type, c = t.memoizedState;
        return e === null ? (_n(t), c !== null ? (Ie(t), Sh(t, c)) : (Ie(t), es(
          t,
          o,
          null,
          i,
          l
        ))) : c ? c !== e.memoizedState ? (_n(t), Ie(t), Sh(t, c)) : (Ie(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && _n(t), Ie(t), es(
          t,
          o,
          e,
          i,
          l
        )), null;
      case 27:
        if (zt(t), l = ne.current, o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ie(t), null;
          }
          e = P.current, oi(t) ? ed(t) : (e = Cm(o, i, l), t.stateNode = e, _n(t));
        }
        return Ie(t), null;
      case 5:
        if (zt(t), o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ie(t), null;
          }
          if (c = P.current, oi(t))
            ed(t);
          else {
            var g = Kr(
              ne.current
            );
            switch (c) {
              case 1:
                c = g.createElementNS(
                  "http://www.w3.org/2000/svg",
                  o
                );
                break;
              case 2:
                c = g.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  o
                );
                break;
              default:
                switch (o) {
                  case "svg":
                    c = g.createElementNS(
                      "http://www.w3.org/2000/svg",
                      o
                    );
                    break;
                  case "math":
                    c = g.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o
                    );
                    break;
                  case "script":
                    c = g.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof i.is == "string" ? g.createElement("select", {
                      is: i.is
                    }) : g.createElement("select"), i.multiple ? c.multiple = !0 : i.size && (c.size = i.size);
                    break;
                  default:
                    c = typeof i.is == "string" ? g.createElement(o, { is: i.is }) : g.createElement(o);
                }
            }
            c[dt] = t, c[Ct] = i;
            e: for (g = t.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6)
                c.appendChild(g.stateNode);
              else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
                g.child.return = g, g = g.child;
                continue;
              }
              if (g === t) break e;
              for (; g.sibling === null; ) {
                if (g.return === null || g.return === t)
                  break e;
                g = g.return;
              }
              g.sibling.return = g.return, g = g.sibling;
            }
            t.stateNode = c;
            e: switch (gt(c, o, i), o) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && _n(t);
          }
        }
        return Ie(t), es(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = ne.current, oi(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, o = ht, o !== null)
              switch (o.tag) {
                case 27:
                case 5:
                  i = o.memoizedProps;
              }
            e[dt] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || ym(e.nodeValue, l)), e || Zn(t, !0);
          } else
            e = Kr(e).createTextNode(
              i
            ), e[dt] = t, t.stateNode = e;
        }
        return Ie(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = oi(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[dt] = t;
            } else
              El(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ie(t), e = !1;
          } else
            l = so(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Ie(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (o = oi(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(u(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(u(317));
              o[dt] = t;
            } else
              El(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ie(t), o = !1;
          } else
            o = so(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
          if (!o)
            return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
        }
        return Yt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), c = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (c = i.memoizedState.cachePool.pool), c !== o && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Mr(t, t.updateQueue), Ie(t), null);
      case 4:
        return be(), e === null && ks(t.stateNode.containerInfo), Ie(t), null;
      case 10:
        return zn(t.type), Ie(t), null;
      case 19:
        if (G(et), i = t.memoizedState, i === null) return Ie(t), null;
        if (o = (t.flags & 128) !== 0, c = i.rendering, c === null)
          if (o) sa(i, !1);
          else {
            if (Pe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = vr(e), c !== null) {
                  for (t.flags |= 128, sa(i, !1), e = c.updateQueue, t.updateQueue = e, Mr(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    Jf(l, e), l = l.sibling;
                  return w(
                    et,
                    et.current & 1 | 2
                  ), Ne && wn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && St() > Ur && (t.flags |= 128, o = !0, sa(i, !1), t.lanes = 4194304);
          }
        else {
          if (!o)
            if (e = vr(c), e !== null) {
              if (t.flags |= 128, o = !0, e = e.updateQueue, t.updateQueue = e, Mr(t, e), sa(i, !0), i.tail === null && i.tailMode === "hidden" && !c.alternate && !Ne)
                return Ie(t), null;
            } else
              2 * St() - i.renderingStartTime > Ur && l !== 536870912 && (t.flags |= 128, o = !0, sa(i, !1), t.lanes = 4194304);
          i.isBackwards ? (c.sibling = t.child, t.child = c) : (e = i.last, e !== null ? e.sibling = c : t.child = c, i.last = c);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = St(), e.sibling = null, l = et.current, w(
          et,
          o ? l & 1 | 2 : l & 1
        ), Ne && wn(t, i.treeForkCount), e) : (Ie(t), null);
      case 22:
      case 23:
        return Yt(t), wo(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ie(t), l = t.updateQueue, l !== null && Mr(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && G(Al), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), zn(nt), Ie(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function u1(e, t) {
    switch (uo(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zn(nt), be(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return zt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Yt(t), t.alternate === null)
            throw Error(u(340));
          El();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Yt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          El();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return G(et), null;
      case 4:
        return be(), null;
      case 10:
        return zn(t.type), null;
      case 22:
      case 23:
        return Yt(t), wo(), e !== null && G(Al), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return zn(nt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function kh(e, t) {
    switch (uo(t), t.tag) {
      case 3:
        zn(nt), be();
        break;
      case 26:
      case 27:
      case 5:
        zt(t);
        break;
      case 4:
        be();
        break;
      case 31:
        t.memoizedState !== null && Yt(t);
        break;
      case 13:
        Yt(t);
        break;
      case 19:
        G(et);
        break;
      case 10:
        zn(t.type);
        break;
      case 22:
      case 23:
        Yt(t), wo(), e !== null && G(Al);
        break;
      case 24:
        zn(nt);
    }
  }
  function ca(e, t) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        l = o;
        do {
          if ((l.tag & e) === e) {
            i = void 0;
            var c = l.create, g = l.inst;
            i = c(), g.destroy = i;
          }
          l = l.next;
        } while (l !== o);
      }
    } catch (x) {
      qe(t, t.return, x);
    }
  }
  function Pn(e, t, l) {
    try {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var g = i.inst, x = g.destroy;
            if (x !== void 0) {
              g.destroy = void 0, o = t;
              var E = l, N = x;
              try {
                N();
              } catch (q) {
                qe(
                  o,
                  E,
                  q
                );
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (q) {
      qe(t, t.return, q);
    }
  }
  function wh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        hd(t, l);
      } catch (i) {
        qe(e, e.return, i);
      }
    }
  }
  function Eh(e, t, l) {
    l.props = Ml(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      qe(e, t, i);
    }
  }
  function fa(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(i) : l.current = i;
      }
    } catch (o) {
      qe(e, t, o);
    }
  }
  function hn(e, t) {
    var l = e.ref, i = e.refCleanup;
    if (l !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (o) {
          qe(e, t, o);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (o) {
          qe(e, t, o);
        }
      else l.current = null;
  }
  function zh(e) {
    var t = e.type, l = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && i.focus();
          break e;
        case "img":
          l.src ? i.src = l.src : l.srcSet && (i.srcset = l.srcSet);
      }
    } catch (o) {
      qe(e, e.return, o);
    }
  }
  function ts(e, t, l) {
    try {
      var i = e.stateNode;
      _1(i, e.type, l, t), i[Ct] = t;
    } catch (o) {
      qe(e, e.return, o);
    }
  }
  function Th(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && rl(e.type) || e.tag === 4;
  }
  function ns(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Th(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && rl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ls(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = xn));
    else if (i !== 4 && (i === 27 && rl(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (ls(e, t, l), e = e.sibling; e !== null; )
        ls(e, t, l), e = e.sibling;
  }
  function Nr(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && rl(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Nr(e, t, l), e = e.sibling; e !== null; )
        Nr(e, t, l), e = e.sibling;
  }
  function Ah(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      gt(t, i, l), t[dt] = e, t[Ct] = l;
    } catch (c) {
      qe(e, e.return, c);
    }
  }
  var On = !1, at = !1, is = !1, Ch = typeof WeakSet == "function" ? WeakSet : Set, ft = null;
  function o1(e, t) {
    if (e = e.containerInfo, zs = eu, e = qf(e), Iu(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var i = l.getSelection && l.getSelection();
          if (i && i.rangeCount !== 0) {
            l = i.anchorNode;
            var o = i.anchorOffset, c = i.focusNode;
            i = i.focusOffset;
            try {
              l.nodeType, c.nodeType;
            } catch {
              l = null;
              break e;
            }
            var g = 0, x = -1, E = -1, N = 0, q = 0, Q = e, R = null;
            t: for (; ; ) {
              for (var U; Q !== l || o !== 0 && Q.nodeType !== 3 || (x = g + o), Q !== c || i !== 0 && Q.nodeType !== 3 || (E = g + i), Q.nodeType === 3 && (g += Q.nodeValue.length), (U = Q.firstChild) !== null; )
                R = Q, Q = U;
              for (; ; ) {
                if (Q === e) break t;
                if (R === l && ++N === o && (x = g), R === c && ++q === i && (E = g), (U = Q.nextSibling) !== null) break;
                Q = R, R = Q.parentNode;
              }
              Q = U;
            }
            l = x === -1 || E === -1 ? null : { start: x, end: E };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ts = { focusedElem: e, selectionRange: l }, eu = !1, ft = t; ft !== null; )
      if (t = ft, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ft = e;
      else
        for (; ft !== null; ) {
          switch (t = ft, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  o = e[l], o.ref.impl = o.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, l = t, o = c.memoizedProps, c = c.memoizedState, i = l.stateNode;
                try {
                  var oe = Ml(
                    l.type,
                    o
                  );
                  e = i.getSnapshotBeforeUpdate(
                    oe,
                    c
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (pe) {
                  qe(
                    l,
                    l.return,
                    pe
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  _s(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _s(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ft = e;
            break;
          }
          ft = t.return;
        }
  }
  function _h(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Mn(e, l), i & 4 && ca(5, l);
        break;
      case 1:
        if (Mn(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              qe(l, l.return, g);
            }
          else {
            var o = Ml(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (g) {
              qe(
                l,
                l.return,
                g
              );
            }
          }
        i & 64 && wh(l), i & 512 && fa(l, l.return);
        break;
      case 3:
        if (Mn(e, l), i & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            hd(e, t);
          } catch (g) {
            qe(l, l.return, g);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Ah(l);
      case 26:
      case 5:
        Mn(e, l), t === null && i & 4 && zh(l), i & 512 && fa(l, l.return);
        break;
      case 12:
        Mn(e, l);
        break;
      case 31:
        Mn(e, l), i & 4 && Mh(e, l);
        break;
      case 13:
        Mn(e, l), i & 4 && Nh(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = y1.bind(
          null,
          l
        ), U1(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || On, !i) {
          t = t !== null && t.memoizedState !== null || at, o = On;
          var c = at;
          On = i, (at = t) && !c ? Nn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Mn(e, l), On = o, at = c;
        }
        break;
      case 30:
        break;
      default:
        Mn(e, l);
    }
  }
  function Oh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Oh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Nu(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var $e = null, Ot = !1;
  function Dn(e, t, l) {
    for (l = l.child; l !== null; )
      Dh(e, t, l), l = l.sibling;
  }
  function Dh(e, t, l) {
    if (ut && typeof ut.onCommitFiberUnmount == "function")
      try {
        ut.onCommitFiberUnmount(kt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        at || hn(l, t), Dn(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        at || hn(l, t);
        var i = $e, o = Ot;
        rl(l.type) && ($e = l.stateNode, Ot = !1), Dn(
          e,
          t,
          l
        ), xa(l.stateNode), $e = i, Ot = o;
        break;
      case 5:
        at || hn(l, t);
      case 6:
        if (i = $e, o = Ot, $e = null, Dn(
          e,
          t,
          l
        ), $e = i, Ot = o, $e !== null)
          if (Ot)
            try {
              ($e.nodeType === 9 ? $e.body : $e.nodeName === "HTML" ? $e.ownerDocument.body : $e).removeChild(l.stateNode);
            } catch (c) {
              qe(
                l,
                t,
                c
              );
            }
          else
            try {
              $e.removeChild(l.stateNode);
            } catch (c) {
              qe(
                l,
                t,
                c
              );
            }
        break;
      case 18:
        $e !== null && (Ot ? (e = $e, wm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), _i(e)) : wm($e, l.stateNode));
        break;
      case 4:
        i = $e, o = Ot, $e = l.stateNode.containerInfo, Ot = !0, Dn(
          e,
          t,
          l
        ), $e = i, Ot = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Pn(2, l, t), at || Pn(4, l, t), Dn(
          e,
          t,
          l
        );
        break;
      case 1:
        at || (hn(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && Eh(
          l,
          t,
          i
        )), Dn(
          e,
          t,
          l
        );
        break;
      case 21:
        Dn(
          e,
          t,
          l
        );
        break;
      case 22:
        at = (i = at) || l.memoizedState !== null, Dn(
          e,
          t,
          l
        ), at = i;
        break;
      default:
        Dn(
          e,
          t,
          l
        );
    }
  }
  function Mh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        _i(e);
      } catch (l) {
        qe(t, t.return, l);
      }
    }
  }
  function Nh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        _i(e);
      } catch (l) {
        qe(t, t.return, l);
      }
  }
  function s1(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Ch()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ch()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Rr(e, t) {
    var l = s1(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var o = b1.bind(null, e, i);
        i.then(o, o);
      }
    });
  }
  function Dt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var o = l[i], c = e, g = t, x = g;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (rl(x.type)) {
                $e = x.stateNode, Ot = !1;
                break e;
              }
              break;
            case 5:
              $e = x.stateNode, Ot = !1;
              break e;
            case 3:
            case 4:
              $e = x.stateNode.containerInfo, Ot = !0;
              break e;
          }
          x = x.return;
        }
        if ($e === null) throw Error(u(160));
        Dh(c, g, o), $e = null, Ot = !1, c = o.alternate, c !== null && (c.return = null), o.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Rh(t, e), t = t.sibling;
  }
  var un = null;
  function Rh(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Dt(t, e), Mt(e), i & 4 && (Pn(3, e, e.return), ca(3, e), Pn(5, e, e.return));
        break;
      case 1:
        Dt(t, e), Mt(e), i & 512 && (at || l === null || hn(l, l.return)), i & 64 && On && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var o = un;
        if (Dt(t, e), Mt(e), i & 512 && (at || l === null || hn(l, l.return)), i & 4) {
          var c = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, o = o.ownerDocument || o;
                  t: switch (i) {
                    case "title":
                      c = o.getElementsByTagName("title")[0], (!c || c[Bi] || c[dt] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = o.createElement(i), o.head.insertBefore(
                        c,
                        o.querySelector("head > title")
                      )), gt(c, i, l), c[dt] = e, ct(c), i = c;
                      break e;
                    case "link":
                      var g = Rm(
                        "link",
                        "href",
                        o
                      ).get(i + (l.href || ""));
                      if (g) {
                        for (var x = 0; x < g.length; x++)
                          if (c = g[x], c.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && c.getAttribute("rel") === (l.rel == null ? null : l.rel) && c.getAttribute("title") === (l.title == null ? null : l.title) && c.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      c = o.createElement(i), gt(c, i, l), o.head.appendChild(c);
                      break;
                    case "meta":
                      if (g = Rm(
                        "meta",
                        "content",
                        o
                      ).get(i + (l.content || ""))) {
                        for (x = 0; x < g.length; x++)
                          if (c = g[x], c.getAttribute("content") === (l.content == null ? null : "" + l.content) && c.getAttribute("name") === (l.name == null ? null : l.name) && c.getAttribute("property") === (l.property == null ? null : l.property) && c.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && c.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      c = o.createElement(i), gt(c, i, l), o.head.appendChild(c);
                      break;
                    default:
                      throw Error(u(468, i));
                  }
                  c[dt] = e, ct(c), i = c;
                }
                e.stateNode = i;
              } else
                jm(
                  o,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Nm(
                o,
                i,
                e.memoizedProps
              );
          else
            c !== i ? (c === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : c.count--, i === null ? jm(
              o,
              e.type,
              e.stateNode
            ) : Nm(
              o,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && ts(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Dt(t, e), Mt(e), i & 512 && (at || l === null || hn(l, l.return)), l !== null && i & 4 && ts(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Dt(t, e), Mt(e), i & 512 && (at || l === null || hn(l, l.return)), e.flags & 32) {
          o = e.stateNode;
          try {
            Wl(o, "");
          } catch (oe) {
            qe(e, e.return, oe);
          }
        }
        i & 4 && e.stateNode != null && (o = e.memoizedProps, ts(
          e,
          o,
          l !== null ? l.memoizedProps : o
        )), i & 1024 && (is = !0);
        break;
      case 6:
        if (Dt(t, e), Mt(e), i & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (oe) {
            qe(e, e.return, oe);
          }
        }
        break;
      case 3:
        if (Ir = null, o = un, un = Fr(t.containerInfo), Dt(t, e), un = o, Mt(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            _i(t.containerInfo);
          } catch (oe) {
            qe(e, e.return, oe);
          }
        is && (is = !1, jh(e));
        break;
      case 4:
        i = un, un = Fr(
          e.stateNode.containerInfo
        ), Dt(t, e), Mt(e), un = i;
        break;
      case 12:
        Dt(t, e), Mt(e);
        break;
      case 31:
        Dt(t, e), Mt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Rr(e, i)));
        break;
      case 13:
        Dt(t, e), Mt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Lr = St()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Rr(e, i)));
        break;
      case 22:
        o = e.memoizedState !== null;
        var E = l !== null && l.memoizedState !== null, N = On, q = at;
        if (On = N || o, at = q || E, Dt(t, e), at = q, On = N, Mt(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, o && (l === null || E || On || at || Nl(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                E = l = t;
                try {
                  if (c = E.stateNode, o)
                    g = c.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    x = E.stateNode;
                    var Q = E.memoizedProps.style, R = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    x.style.display = R == null || typeof R == "boolean" ? "" : ("" + R).trim();
                  }
                } catch (oe) {
                  qe(E, E.return, oe);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = o ? "" : E.memoizedProps;
                } catch (oe) {
                  qe(E, E.return, oe);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                E = t;
                try {
                  var U = E.stateNode;
                  o ? Em(U, !0) : Em(E.stateNode, !1);
                } catch (oe) {
                  qe(E, E.return, oe);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, Rr(e, l))));
        break;
      case 19:
        Dt(t, e), Mt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Rr(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Dt(t, e), Mt(e);
    }
  }
  function Mt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, i = e.return; i !== null; ) {
          if (Th(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(u(160));
        switch (l.tag) {
          case 27:
            var o = l.stateNode, c = ns(e);
            Nr(e, c, o);
            break;
          case 5:
            var g = l.stateNode;
            l.flags & 32 && (Wl(g, ""), l.flags &= -33);
            var x = ns(e);
            Nr(e, x, g);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo, N = ns(e);
            ls(
              e,
              N,
              E
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (q) {
        qe(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        jh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Mn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        _h(e, t.alternate, t), t = t.sibling;
  }
  function Nl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Pn(4, t, t.return), Nl(t);
          break;
        case 1:
          hn(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Eh(
            t,
            t.return,
            l
          ), Nl(t);
          break;
        case 27:
          xa(t.stateNode);
        case 26:
        case 5:
          hn(t, t.return), Nl(t);
          break;
        case 22:
          t.memoizedState === null && Nl(t);
          break;
        case 30:
          Nl(t);
          break;
        default:
          Nl(t);
      }
      e = e.sibling;
    }
  }
  function Nn(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, o = e, c = t, g = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Nn(
            o,
            c,
            l
          ), ca(4, c);
          break;
        case 1:
          if (Nn(
            o,
            c,
            l
          ), i = c, o = i.stateNode, typeof o.componentDidMount == "function")
            try {
              o.componentDidMount();
            } catch (N) {
              qe(i, i.return, N);
            }
          if (i = c, o = i.updateQueue, o !== null) {
            var x = i.stateNode;
            try {
              var E = o.shared.hiddenCallbacks;
              if (E !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < E.length; o++)
                  dd(E[o], x);
            } catch (N) {
              qe(i, i.return, N);
            }
          }
          l && g & 64 && wh(c), fa(c, c.return);
          break;
        case 27:
          Ah(c);
        case 26:
        case 5:
          Nn(
            o,
            c,
            l
          ), l && i === null && g & 4 && zh(c), fa(c, c.return);
          break;
        case 12:
          Nn(
            o,
            c,
            l
          );
          break;
        case 31:
          Nn(
            o,
            c,
            l
          ), l && g & 4 && Mh(o, c);
          break;
        case 13:
          Nn(
            o,
            c,
            l
          ), l && g & 4 && Nh(o, c);
          break;
        case 22:
          c.memoizedState === null && Nn(
            o,
            c,
            l
          ), fa(c, c.return);
          break;
        case 30:
          break;
        default:
          Nn(
            o,
            c,
            l
          );
      }
      t = t.sibling;
    }
  }
  function as(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && $i(l));
  }
  function rs(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && $i(e));
  }
  function on(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Lh(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Lh(e, t, l, i) {
    var o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        on(
          e,
          t,
          l,
          i
        ), o & 2048 && ca(9, t);
        break;
      case 1:
        on(
          e,
          t,
          l,
          i
        );
        break;
      case 3:
        on(
          e,
          t,
          l,
          i
        ), o & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && $i(e)));
        break;
      case 12:
        if (o & 2048) {
          on(
            e,
            t,
            l,
            i
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, g = c.id, x = c.onPostCommit;
            typeof x == "function" && x(
              g,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (E) {
            qe(t, t.return, E);
          }
        } else
          on(
            e,
            t,
            l,
            i
          );
        break;
      case 31:
        on(
          e,
          t,
          l,
          i
        );
        break;
      case 13:
        on(
          e,
          t,
          l,
          i
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, g = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? on(
          e,
          t,
          l,
          i
        ) : da(e, t) : c._visibility & 2 ? on(
          e,
          t,
          l,
          i
        ) : (c._visibility |= 2, bi(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), o & 2048 && as(g, t);
        break;
      case 24:
        on(
          e,
          t,
          l,
          i
        ), o & 2048 && rs(t.alternate, t);
        break;
      default:
        on(
          e,
          t,
          l,
          i
        );
    }
  }
  function bi(e, t, l, i, o) {
    for (o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, g = t, x = l, E = i, N = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          bi(
            c,
            g,
            x,
            E,
            o
          ), ca(8, g);
          break;
        case 23:
          break;
        case 22:
          var q = g.stateNode;
          g.memoizedState !== null ? q._visibility & 2 ? bi(
            c,
            g,
            x,
            E,
            o
          ) : da(
            c,
            g
          ) : (q._visibility |= 2, bi(
            c,
            g,
            x,
            E,
            o
          )), o && N & 2048 && as(
            g.alternate,
            g
          );
          break;
        case 24:
          bi(
            c,
            g,
            x,
            E,
            o
          ), o && N & 2048 && rs(g.alternate, g);
          break;
        default:
          bi(
            c,
            g,
            x,
            E,
            o
          );
      }
      t = t.sibling;
    }
  }
  function da(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, o = i.flags;
        switch (i.tag) {
          case 22:
            da(l, i), o & 2048 && as(
              i.alternate,
              i
            );
            break;
          case 24:
            da(l, i), o & 2048 && rs(i.alternate, i);
            break;
          default:
            da(l, i);
        }
        t = t.sibling;
      }
  }
  var ha = 8192;
  function vi(e, t, l) {
    if (e.subtreeFlags & ha)
      for (e = e.child; e !== null; )
        Uh(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Uh(e, t, l) {
    switch (e.tag) {
      case 26:
        vi(
          e,
          t,
          l
        ), e.flags & ha && e.memoizedState !== null && J1(
          l,
          un,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        vi(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = un;
        un = Fr(e.stateNode.containerInfo), vi(
          e,
          t,
          l
        ), un = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = ha, ha = 16777216, vi(
          e,
          t,
          l
        ), ha = i) : vi(
          e,
          t,
          l
        ));
        break;
      default:
        vi(
          e,
          t,
          l
        );
    }
  }
  function Bh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ma(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ft = i, qh(
            i,
            e
          );
        }
      Bh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Hh(e), e = e.sibling;
  }
  function Hh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ma(e), e.flags & 2048 && Pn(9, e, e.return);
        break;
      case 3:
        ma(e);
        break;
      case 12:
        ma(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, jr(e)) : ma(e);
        break;
      default:
        ma(e);
    }
  }
  function jr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ft = i, qh(
            i,
            e
          );
        }
      Bh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Pn(8, t, t.return), jr(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, jr(t));
          break;
        default:
          jr(t);
      }
      e = e.sibling;
    }
  }
  function qh(e, t) {
    for (; ft !== null; ) {
      var l = ft;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Pn(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          $i(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, ft = i;
      else
        e: for (l = e; ft !== null; ) {
          i = ft;
          var o = i.sibling, c = i.return;
          if (Oh(i), i === l) {
            ft = null;
            break e;
          }
          if (o !== null) {
            o.return = c, ft = o;
            break e;
          }
          ft = c;
        }
    }
  }
  var c1 = {
    getCacheForType: function(e) {
      var t = mt(nt), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return mt(nt).controller.signal;
    }
  }, f1 = typeof WeakMap == "function" ? WeakMap : Map, Ue = 0, Ze = null, Ce = null, De = 0, He = 0, Gt = null, el = !1, xi = !1, us = !1, Rn = 0, Pe = 0, tl = 0, Rl = 0, os = 0, Vt = 0, Si = 0, pa = null, Nt = null, ss = !1, Lr = 0, Yh = 0, Ur = 1 / 0, Br = null, nl = null, ot = 0, ll = null, ki = null, jn = 0, cs = 0, fs = null, Gh = null, ga = 0, ds = null;
  function Xt() {
    return (Ue & 2) !== 0 && De !== 0 ? De & -De : O.T !== null ? bs() : lf();
  }
  function Vh() {
    if (Vt === 0)
      if ((De & 536870912) === 0 || Ne) {
        var e = Za;
        Za <<= 1, (Za & 3932160) === 0 && (Za = 262144), Vt = e;
      } else Vt = 536870912;
    return e = qt.current, e !== null && (e.flags |= 32), Vt;
  }
  function Rt(e, t, l) {
    (e === Ze && (He === 2 || He === 9) || e.cancelPendingCommit !== null) && (wi(e, 0), il(
      e,
      De,
      Vt,
      !1
    )), Ui(e, l), ((Ue & 2) === 0 || e !== Ze) && (e === Ze && ((Ue & 2) === 0 && (Rl |= l), Pe === 4 && il(
      e,
      De,
      Vt,
      !1
    )), mn(e));
  }
  function Xh(e, t, l) {
    if ((Ue & 6) !== 0) throw Error(u(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Li(e, t), o = i ? m1(e, t) : ms(e, t, !0), c = i;
    do {
      if (o === 0) {
        xi && !i && il(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, c && !d1(l)) {
          o = ms(e, t, !1), c = !1;
          continue;
        }
        if (o === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var g = 0;
          else
            g = e.pendingLanes & -536870913, g = g !== 0 ? g : g & 536870912 ? 536870912 : 0;
          if (g !== 0) {
            t = g;
            e: {
              var x = e;
              o = pa;
              var E = x.current.memoizedState.isDehydrated;
              if (E && (wi(x, g).flags |= 256), g = ms(
                x,
                g,
                !1
              ), g !== 2) {
                if (us && !E) {
                  x.errorRecoveryDisabledLanes |= c, Rl |= c, o = 4;
                  break e;
                }
                c = Nt, Nt = o, c !== null && (Nt === null ? Nt = c : Nt.push.apply(
                  Nt,
                  c
                ));
              }
              o = g;
            }
            if (c = !1, o !== 2) continue;
          }
        }
        if (o === 1) {
          wi(e, 0), il(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, c = o, c) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              il(
                i,
                t,
                Vt,
                !el
              );
              break e;
            case 2:
              Nt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (o = Lr + 300 - St(), 10 < o)) {
            if (il(
              i,
              t,
              Vt,
              !el
            ), Fa(i, 0, !0) !== 0) break e;
            jn = t, i.timeoutHandle = Sm(
              Qh.bind(
                null,
                i,
                l,
                Nt,
                Br,
                ss,
                t,
                Vt,
                Rl,
                Si,
                el,
                c,
                "Throttled",
                -0,
                0
              ),
              o
            );
            break e;
          }
          Qh(
            i,
            l,
            Nt,
            Br,
            ss,
            t,
            Vt,
            Rl,
            Si,
            el,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    mn(e);
  }
  function Qh(e, t, l, i, o, c, g, x, E, N, q, Q, R, U) {
    if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
      Q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: xn
      }, Uh(
        t,
        c,
        Q
      );
      var oe = (c & 62914560) === c ? Lr - St() : (c & 4194048) === c ? Yh - St() : 0;
      if (oe = I1(
        Q,
        oe
      ), oe !== null) {
        jn = c, e.cancelPendingCommit = oe(
          Ph.bind(
            null,
            e,
            t,
            c,
            l,
            i,
            o,
            g,
            x,
            E,
            q,
            Q,
            null,
            R,
            U
          )
        ), il(e, c, g, !N);
        return;
      }
    }
    Ph(
      e,
      t,
      c,
      l,
      i,
      o,
      g,
      x,
      E
    );
  }
  function d1(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var i = 0; i < l.length; i++) {
          var o = l[i], c = o.getSnapshot;
          o = o.value;
          try {
            if (!Bt(c(), o)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function il(e, t, l, i) {
    t &= ~os, t &= ~Rl, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var o = t; 0 < o; ) {
      var c = 31 - Qe(o), g = 1 << c;
      i[c] = -1, o &= ~g;
    }
    l !== 0 && ef(e, l, t);
  }
  function Hr() {
    return (Ue & 6) === 0 ? (ya(0), !1) : !0;
  }
  function hs() {
    if (Ce !== null) {
      if (He === 0)
        var e = Ce.return;
      else
        e = Ce, En = zl = null, _o(e), hi = null, Pi = 0, e = Ce;
      for (; e !== null; )
        kh(e.alternate, e), e = e.return;
      Ce = null;
    }
  }
  function wi(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, M1(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), jn = 0, hs(), Ze = e, Ce = l = kn(e.current, null), De = t, He = 0, Gt = null, el = !1, xi = Li(e, t), us = !1, Si = Vt = os = Rl = tl = Pe = 0, Nt = pa = null, ss = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var o = 31 - Qe(i), c = 1 << o;
        t |= e[o], i &= ~c;
      }
    return Rn = t, rr(), l;
  }
  function Zh(e, t) {
    ke = null, O.H = ua, t === di || t === mr ? (t = od(), He = 3) : t === yo ? (t = od(), He = 4) : He = t === Qo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, Ce === null && (Pe = 1, Cr(
      e,
      It(t, e.current)
    ));
  }
  function Kh() {
    var e = qt.current;
    return e === null ? !0 : (De & 4194048) === De ? en === null : (De & 62914560) === De || (De & 536870912) !== 0 ? e === en : !1;
  }
  function Fh() {
    var e = O.H;
    return O.H = ua, e === null ? ua : e;
  }
  function Jh() {
    var e = O.A;
    return O.A = c1, e;
  }
  function qr() {
    Pe = 4, el || (De & 4194048) !== De && qt.current !== null || (xi = !0), (tl & 134217727) === 0 && (Rl & 134217727) === 0 || Ze === null || il(
      Ze,
      De,
      Vt,
      !1
    );
  }
  function ms(e, t, l) {
    var i = Ue;
    Ue |= 2;
    var o = Fh(), c = Jh();
    (Ze !== e || De !== t) && (Br = null, wi(e, t)), t = !1;
    var g = Pe;
    e: do
      try {
        if (He !== 0 && Ce !== null) {
          var x = Ce, E = Gt;
          switch (He) {
            case 8:
              hs(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              qt.current === null && (t = !0);
              var N = He;
              if (He = 0, Gt = null, Ei(e, x, E, N), l && xi) {
                g = 0;
                break e;
              }
              break;
            default:
              N = He, He = 0, Gt = null, Ei(e, x, E, N);
          }
        }
        h1(), g = Pe;
        break;
      } catch (q) {
        Zh(e, q);
      }
    while (!0);
    return t && e.shellSuspendCounter++, En = zl = null, Ue = i, O.H = o, O.A = c, Ce === null && (Ze = null, De = 0, rr()), g;
  }
  function h1() {
    for (; Ce !== null; ) Ih(Ce);
  }
  function m1(e, t) {
    var l = Ue;
    Ue |= 2;
    var i = Fh(), o = Jh();
    Ze !== e || De !== t ? (Br = null, Ur = St() + 500, wi(e, t)) : xi = Li(
      e,
      t
    );
    e: do
      try {
        if (He !== 0 && Ce !== null) {
          t = Ce;
          var c = Gt;
          t: switch (He) {
            case 1:
              He = 0, Gt = null, Ei(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (rd(c)) {
                He = 0, Gt = null, $h(t);
                break;
              }
              t = function() {
                He !== 2 && He !== 9 || Ze !== e || (He = 7), mn(e);
              }, c.then(t, t);
              break e;
            case 3:
              He = 7;
              break e;
            case 4:
              He = 5;
              break e;
            case 7:
              rd(c) ? (He = 0, Gt = null, $h(t)) : (He = 0, Gt = null, Ei(e, t, c, 7));
              break;
            case 5:
              var g = null;
              switch (Ce.tag) {
                case 26:
                  g = Ce.memoizedState;
                case 5:
                case 27:
                  var x = Ce;
                  if (g ? Lm(g) : x.stateNode.complete) {
                    He = 0, Gt = null;
                    var E = x.sibling;
                    if (E !== null) Ce = E;
                    else {
                      var N = x.return;
                      N !== null ? (Ce = N, Yr(N)) : Ce = null;
                    }
                    break t;
                  }
              }
              He = 0, Gt = null, Ei(e, t, c, 5);
              break;
            case 6:
              He = 0, Gt = null, Ei(e, t, c, 6);
              break;
            case 8:
              hs(), Pe = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        p1();
        break;
      } catch (q) {
        Zh(e, q);
      }
    while (!0);
    return En = zl = null, O.H = i, O.A = o, Ue = l, Ce !== null ? 0 : (Ze = null, De = 0, rr(), Pe);
  }
  function p1() {
    for (; Ce !== null && !Tu(); )
      Ih(Ce);
  }
  function Ih(e) {
    var t = xh(e.alternate, e, Rn);
    e.memoizedProps = e.pendingProps, t === null ? Yr(e) : Ce = t;
  }
  function $h(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = mh(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          De
        );
        break;
      case 11:
        t = mh(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          De
        );
        break;
      case 5:
        _o(t);
      default:
        kh(l, t), t = Ce = Jf(t, Rn), t = xh(l, t, Rn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Yr(e) : Ce = t;
  }
  function Ei(e, t, l, i) {
    En = zl = null, _o(t), hi = null, Pi = 0;
    var o = t.return;
    try {
      if (l1(
        e,
        o,
        t,
        l,
        De
      )) {
        Pe = 1, Cr(
          e,
          It(l, e.current)
        ), Ce = null;
        return;
      }
    } catch (c) {
      if (o !== null) throw Ce = o, c;
      Pe = 1, Cr(
        e,
        It(l, e.current)
      ), Ce = null;
      return;
    }
    t.flags & 32768 ? (Ne || i === 1 ? e = !0 : xi || (De & 536870912) !== 0 ? e = !1 : (el = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = qt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Wh(t, e)) : Yr(t);
  }
  function Yr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Wh(
          t,
          el
        );
        return;
      }
      e = t.return;
      var l = r1(
        t.alternate,
        t,
        Rn
      );
      if (l !== null) {
        Ce = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ce = t;
        return;
      }
      Ce = t = e;
    } while (t !== null);
    Pe === 0 && (Pe = 5);
  }
  function Wh(e, t) {
    do {
      var l = u1(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, Ce = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ce = e;
        return;
      }
      Ce = e = l;
    } while (e !== null);
    Pe = 6, Ce = null;
  }
  function Ph(e, t, l, i, o, c, g, x, E) {
    e.cancelPendingCommit = null;
    do
      Gr();
    while (ot !== 0);
    if ((Ue & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (c = t.lanes | t.childLanes, c |= to, Fy(
        e,
        l,
        c,
        g,
        x,
        E
      ), e === Ze && (Ce = Ze = null, De = 0), ki = t, ll = e, jn = l, cs = c, fs = o, Gh = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, v1(ge, function() {
        return im(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null, o = F.p, F.p = 2, g = Ue, Ue |= 4;
        try {
          o1(e, t, l);
        } finally {
          Ue = g, F.p = o, O.T = i;
        }
      }
      ot = 1, em(), tm(), nm();
    }
  }
  function em() {
    if (ot === 1) {
      ot = 0;
      var e = ll, t = ki, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null;
        var i = F.p;
        F.p = 2;
        var o = Ue;
        Ue |= 4;
        try {
          Rh(t, e);
          var c = Ts, g = qf(e.containerInfo), x = c.focusedElem, E = c.selectionRange;
          if (g !== x && x && x.ownerDocument && Hf(
            x.ownerDocument.documentElement,
            x
          )) {
            if (E !== null && Iu(x)) {
              var N = E.start, q = E.end;
              if (q === void 0 && (q = N), "selectionStart" in x)
                x.selectionStart = N, x.selectionEnd = Math.min(
                  q,
                  x.value.length
                );
              else {
                var Q = x.ownerDocument || document, R = Q && Q.defaultView || window;
                if (R.getSelection) {
                  var U = R.getSelection(), oe = x.textContent.length, pe = Math.min(E.start, oe), Ve = E.end === void 0 ? pe : Math.min(E.end, oe);
                  !U.extend && pe > Ve && (g = Ve, Ve = pe, pe = g);
                  var _ = Bf(
                    x,
                    pe
                  ), A = Bf(
                    x,
                    Ve
                  );
                  if (_ && A && (U.rangeCount !== 1 || U.anchorNode !== _.node || U.anchorOffset !== _.offset || U.focusNode !== A.node || U.focusOffset !== A.offset)) {
                    var M = Q.createRange();
                    M.setStart(_.node, _.offset), U.removeAllRanges(), pe > Ve ? (U.addRange(M), U.extend(A.node, A.offset)) : (M.setEnd(A.node, A.offset), U.addRange(M));
                  }
                }
              }
            }
            for (Q = [], U = x; U = U.parentNode; )
              U.nodeType === 1 && Q.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < Q.length; x++) {
              var X = Q[x];
              X.element.scrollLeft = X.left, X.element.scrollTop = X.top;
            }
          }
          eu = !!zs, Ts = zs = null;
        } finally {
          Ue = o, F.p = i, O.T = l;
        }
      }
      e.current = t, ot = 2;
    }
  }
  function tm() {
    if (ot === 2) {
      ot = 0;
      var e = ll, t = ki, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = O.T, O.T = null;
        var i = F.p;
        F.p = 2;
        var o = Ue;
        Ue |= 4;
        try {
          _h(e, t.alternate, t);
        } finally {
          Ue = o, F.p = i, O.T = l;
        }
      }
      ot = 3;
    }
  }
  function nm() {
    if (ot === 4 || ot === 3) {
      ot = 0, Au();
      var e = ll, t = ki, l = jn, i = Gh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ot = 5 : (ot = 0, ki = ll = null, lm(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (o === 0 && (nl = null), Du(l), t = t.stateNode, ut && typeof ut.onCommitFiberRoot == "function")
        try {
          ut.onCommitFiberRoot(
            kt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = O.T, o = F.p, F.p = 2, O.T = null;
        try {
          for (var c = e.onRecoverableError, g = 0; g < i.length; g++) {
            var x = i[g];
            c(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          O.T = t, F.p = o;
        }
      }
      (jn & 3) !== 0 && Gr(), mn(e), o = e.pendingLanes, (l & 261930) !== 0 && (o & 42) !== 0 ? e === ds ? ga++ : (ga = 0, ds = e) : ga = 0, ya(0);
    }
  }
  function lm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, $i(t)));
  }
  function Gr() {
    return em(), tm(), nm(), im();
  }
  function im() {
    if (ot !== 5) return !1;
    var e = ll, t = cs;
    cs = 0;
    var l = Du(jn), i = O.T, o = F.p;
    try {
      F.p = 32 > l ? 32 : l, O.T = null, l = fs, fs = null;
      var c = ll, g = jn;
      if (ot = 0, ki = ll = null, jn = 0, (Ue & 6) !== 0) throw Error(u(331));
      var x = Ue;
      if (Ue |= 4, Hh(c.current), Lh(
        c,
        c.current,
        g,
        l
      ), Ue = x, ya(0, !1), ut && typeof ut.onPostCommitFiberRoot == "function")
        try {
          ut.onPostCommitFiberRoot(kt, c);
        } catch {
        }
      return !0;
    } finally {
      F.p = o, O.T = i, lm(e, t);
    }
  }
  function am(e, t, l) {
    t = It(l, t), t = Xo(e.stateNode, t, 2), e = In(e, t, 2), e !== null && (Ui(e, 2), mn(e));
  }
  function qe(e, t, l) {
    if (e.tag === 3)
      am(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          am(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (nl === null || !nl.has(i))) {
            e = It(l, e), l = rh(2), i = In(t, l, 2), i !== null && (uh(
              l,
              i,
              t,
              e
            ), Ui(i, 2), mn(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function ps(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new f1();
      var o = /* @__PURE__ */ new Set();
      i.set(t, o);
    } else
      o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
    o.has(l) || (us = !0, o.add(l), e = g1.bind(null, e, t, l), t.then(e, e));
  }
  function g1(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ze === e && (De & l) === l && (Pe === 4 || Pe === 3 && (De & 62914560) === De && 300 > St() - Lr ? (Ue & 2) === 0 && wi(e, 0) : os |= l, Si === De && (Si = 0)), mn(e);
  }
  function rm(e, t) {
    t === 0 && (t = Pc()), e = kl(e, t), e !== null && (Ui(e, t), mn(e));
  }
  function y1(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), rm(e, l);
  }
  function b1(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, o = e.memoizedState;
        o !== null && (l = o.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    i !== null && i.delete(t), rm(e, l);
  }
  function v1(e, t) {
    return Ql(e, t);
  }
  var Vr = null, zi = null, gs = !1, Xr = !1, ys = !1, al = 0;
  function mn(e) {
    e !== zi && e.next === null && (zi === null ? Vr = zi = e : zi = zi.next = e), Xr = !0, gs || (gs = !0, S1());
  }
  function ya(e, t) {
    if (!ys && Xr) {
      ys = !0;
      do
        for (var l = !1, i = Vr; i !== null; ) {
          if (e !== 0) {
            var o = i.pendingLanes;
            if (o === 0) var c = 0;
            else {
              var g = i.suspendedLanes, x = i.pingedLanes;
              c = (1 << 31 - Qe(42 | e) + 1) - 1, c &= o & ~(g & ~x), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (l = !0, cm(i, c));
          } else
            c = De, c = Fa(
              i,
              i === Ze ? c : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (c & 3) === 0 || Li(i, c) || (l = !0, cm(i, c));
          i = i.next;
        }
      while (l);
      ys = !1;
    }
  }
  function x1() {
    um();
  }
  function um() {
    Xr = gs = !1;
    var e = 0;
    al !== 0 && D1() && (e = al);
    for (var t = St(), l = null, i = Vr; i !== null; ) {
      var o = i.next, c = om(i, t);
      c === 0 ? (i.next = null, l === null ? Vr = o : l.next = o, o === null && (zi = l)) : (l = i, (e !== 0 || (c & 3) !== 0) && (Xr = !0)), i = o;
    }
    ot !== 0 && ot !== 5 || ya(e), al !== 0 && (al = 0);
  }
  function om(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var g = 31 - Qe(c), x = 1 << g, E = o[g];
      E === -1 ? ((x & l) === 0 || (x & i) !== 0) && (o[g] = Ky(x, t)) : E <= t && (e.expiredLanes |= x), c &= ~x;
    }
    if (t = Ze, l = De, l = Fa(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, l === 0 || e === t && (He === 2 || He === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && ji(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Li(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (i !== null && ji(i), Du(l)) {
        case 2:
        case 8:
          l = W;
          break;
        case 32:
          l = ge;
          break;
        case 268435456:
          l = Be;
          break;
        default:
          l = ge;
      }
      return i = sm.bind(null, e), l = Ql(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && ji(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function sm(e, t) {
    if (ot !== 0 && ot !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Gr() && e.callbackNode !== l)
      return null;
    var i = De;
    return i = Fa(
      e,
      e === Ze ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (Xh(e, i, t), om(e, St()), e.callbackNode != null && e.callbackNode === l ? sm.bind(null, e) : null);
  }
  function cm(e, t) {
    if (Gr()) return null;
    Xh(e, t, !0);
  }
  function S1() {
    N1(function() {
      (Ue & 6) !== 0 ? Ql(
        V,
        x1
      ) : um();
    });
  }
  function bs() {
    if (al === 0) {
      var e = ci;
      e === 0 && (e = Qa, Qa <<= 1, (Qa & 261888) === 0 && (Qa = 256)), al = e;
    }
    return al;
  }
  function fm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Wa("" + e);
  }
  function dm(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function k1(e, t, l, i, o) {
    if (t === "submit" && l && l.stateNode === o) {
      var c = fm(
        (o[Ct] || null).action
      ), g = i.submitter;
      g && (t = (t = g[Ct] || null) ? fm(t.formAction) : g.getAttribute("formAction"), t !== null && (c = t, g = null));
      var x = new nr(
        "action",
        "action",
        null,
        i,
        o
      );
      e.push({
        event: x,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (al !== 0) {
                  var E = g ? dm(o, g) : new FormData(o);
                  Bo(
                    l,
                    {
                      pending: !0,
                      data: E,
                      method: o.method,
                      action: c
                    },
                    null,
                    E
                  );
                }
              } else
                typeof c == "function" && (x.preventDefault(), E = g ? dm(o, g) : new FormData(o), Bo(
                  l,
                  {
                    pending: !0,
                    data: E,
                    method: o.method,
                    action: c
                  },
                  c,
                  E
                ));
            },
            currentTarget: o
          }
        ]
      });
    }
  }
  for (var vs = 0; vs < eo.length; vs++) {
    var xs = eo[vs], w1 = xs.toLowerCase(), E1 = xs[0].toUpperCase() + xs.slice(1);
    rn(
      w1,
      "on" + E1
    );
  }
  rn(Vf, "onAnimationEnd"), rn(Xf, "onAnimationIteration"), rn(Qf, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(qb, "onTransitionRun"), rn(Yb, "onTransitionStart"), rn(Gb, "onTransitionCancel"), rn(Zf, "onTransitionEnd"), Il("onMouseEnter", ["mouseout", "mouseover"]), Il("onMouseLeave", ["mouseout", "mouseover"]), Il("onPointerEnter", ["pointerout", "pointerover"]), Il("onPointerLeave", ["pointerout", "pointerover"]), bl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), bl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), bl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), bl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), bl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), bl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ba = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), z1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ba)
  );
  function hm(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], o = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var g = i.length - 1; 0 <= g; g--) {
            var x = i[g], E = x.instance, N = x.currentTarget;
            if (x = x.listener, E !== c && o.isPropagationStopped())
              break e;
            c = x, o.currentTarget = N;
            try {
              c(o);
            } catch (q) {
              ar(q);
            }
            o.currentTarget = null, c = E;
          }
        else
          for (g = 0; g < i.length; g++) {
            if (x = i[g], E = x.instance, N = x.currentTarget, x = x.listener, E !== c && o.isPropagationStopped())
              break e;
            c = x, o.currentTarget = N;
            try {
              c(o);
            } catch (q) {
              ar(q);
            }
            o.currentTarget = null, c = E;
          }
      }
    }
  }
  function _e(e, t) {
    var l = t[Mu];
    l === void 0 && (l = t[Mu] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (mm(t, e, 2, !1), l.add(i));
  }
  function Ss(e, t, l) {
    var i = 0;
    t && (i |= 4), mm(
      l,
      e,
      i,
      t
    );
  }
  var Qr = "_reactListening" + Math.random().toString(36).slice(2);
  function ks(e) {
    if (!e[Qr]) {
      e[Qr] = !0, uf.forEach(function(l) {
        l !== "selectionchange" && (z1.has(l) || Ss(l, !1, e), Ss(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Qr] || (t[Qr] = !0, Ss("selectionchange", !1, t));
    }
  }
  function mm(e, t, l, i) {
    switch (Vm(t)) {
      case 2:
        var o = P1;
        break;
      case 8:
        o = ev;
        break;
      default:
        o = Us;
    }
    l = o.bind(
      null,
      t,
      l,
      e
    ), o = void 0, !Yu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: o
    }) : e.addEventListener(t, l, !0) : o !== void 0 ? e.addEventListener(t, l, {
      passive: o
    }) : e.addEventListener(t, l, !1);
  }
  function ws(e, t, l, i, o) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var g = i.tag;
        if (g === 3 || g === 4) {
          var x = i.stateNode.containerInfo;
          if (x === o) break;
          if (g === 4)
            for (g = i.return; g !== null; ) {
              var E = g.tag;
              if ((E === 3 || E === 4) && g.stateNode.containerInfo === o)
                return;
              g = g.return;
            }
          for (; x !== null; ) {
            if (g = Kl(x), g === null) return;
            if (E = g.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              i = c = g;
              continue e;
            }
            x = x.parentNode;
          }
        }
        i = i.return;
      }
    vf(function() {
      var N = c, q = Hu(l), Q = [];
      e: {
        var R = Kf.get(e);
        if (R !== void 0) {
          var U = nr, oe = e;
          switch (e) {
            case "keypress":
              if (er(l) === 0) break e;
            case "keydown":
            case "keyup":
              U = bb;
              break;
            case "focusin":
              oe = "focus", U = Qu;
              break;
            case "focusout":
              oe = "blur", U = Qu;
              break;
            case "beforeblur":
            case "afterblur":
              U = Qu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = kf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = rb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Sb;
              break;
            case Vf:
            case Xf:
            case Qf:
              U = sb;
              break;
            case Zf:
              U = wb;
              break;
            case "scroll":
            case "scrollend":
              U = ib;
              break;
            case "wheel":
              U = zb;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = fb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = Ef;
              break;
            case "toggle":
            case "beforetoggle":
              U = Ab;
          }
          var pe = (t & 4) !== 0, Ve = !pe && (e === "scroll" || e === "scrollend"), _ = pe ? R !== null ? R + "Capture" : null : R;
          pe = [];
          for (var A = N, M; A !== null; ) {
            var X = A;
            if (M = X.stateNode, X = X.tag, X !== 5 && X !== 26 && X !== 27 || M === null || _ === null || (X = qi(A, _), X != null && pe.push(
              va(A, X, M)
            )), Ve) break;
            A = A.return;
          }
          0 < pe.length && (R = new U(
            R,
            oe,
            null,
            l,
            q
          ), Q.push({ event: R, listeners: pe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (R = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", R && l !== Bu && (oe = l.relatedTarget || l.fromElement) && (Kl(oe) || oe[Zl]))
            break e;
          if ((U || R) && (R = q.window === q ? q : (R = q.ownerDocument) ? R.defaultView || R.parentWindow : window, U ? (oe = l.relatedTarget || l.toElement, U = N, oe = oe ? Kl(oe) : null, oe !== null && (Ve = f(oe), pe = oe.tag, oe !== Ve || pe !== 5 && pe !== 27 && pe !== 6) && (oe = null)) : (U = null, oe = N), U !== oe)) {
            if (pe = kf, X = "onMouseLeave", _ = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (pe = Ef, X = "onPointerLeave", _ = "onPointerEnter", A = "pointer"), Ve = U == null ? R : Hi(U), M = oe == null ? R : Hi(oe), R = new pe(
              X,
              A + "leave",
              U,
              l,
              q
            ), R.target = Ve, R.relatedTarget = M, X = null, Kl(q) === N && (pe = new pe(
              _,
              A + "enter",
              oe,
              l,
              q
            ), pe.target = M, pe.relatedTarget = Ve, X = pe), Ve = X, U && oe)
              t: {
                for (pe = T1, _ = U, A = oe, M = 0, X = _; X; X = pe(X))
                  M++;
                X = 0;
                for (var he = A; he; he = pe(he))
                  X++;
                for (; 0 < M - X; )
                  _ = pe(_), M--;
                for (; 0 < X - M; )
                  A = pe(A), X--;
                for (; M--; ) {
                  if (_ === A || A !== null && _ === A.alternate) {
                    pe = _;
                    break t;
                  }
                  _ = pe(_), A = pe(A);
                }
                pe = null;
              }
            else pe = null;
            U !== null && pm(
              Q,
              R,
              U,
              pe,
              !1
            ), oe !== null && Ve !== null && pm(
              Q,
              Ve,
              oe,
              pe,
              !0
            );
          }
        }
        e: {
          if (R = N ? Hi(N) : window, U = R.nodeName && R.nodeName.toLowerCase(), U === "select" || U === "input" && R.type === "file")
            var je = Mf;
          else if (Of(R))
            if (Nf)
              je = Ub;
            else {
              je = jb;
              var ce = Rb;
            }
          else
            U = R.nodeName, !U || U.toLowerCase() !== "input" || R.type !== "checkbox" && R.type !== "radio" ? N && Uu(N.elementType) && (je = Mf) : je = Lb;
          if (je && (je = je(e, N))) {
            Df(
              Q,
              je,
              l,
              q
            );
            break e;
          }
          ce && ce(e, R, N), e === "focusout" && N && R.type === "number" && N.memoizedProps.value != null && Lu(R, "number", R.value);
        }
        switch (ce = N ? Hi(N) : window, e) {
          case "focusin":
            (Of(ce) || ce.contentEditable === "true") && (ni = ce, $u = N, Fi = null);
            break;
          case "focusout":
            Fi = $u = ni = null;
            break;
          case "mousedown":
            Wu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Wu = !1, Yf(Q, l, q);
            break;
          case "selectionchange":
            if (Hb) break;
          case "keydown":
          case "keyup":
            Yf(Q, l, q);
        }
        var Ee;
        if (Ku)
          e: {
            switch (e) {
              case "compositionstart":
                var Me = "onCompositionStart";
                break e;
              case "compositionend":
                Me = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Me = "onCompositionUpdate";
                break e;
            }
            Me = void 0;
          }
        else
          ti ? Cf(e, l) && (Me = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Me = "onCompositionStart");
        Me && (zf && l.locale !== "ko" && (ti || Me !== "onCompositionStart" ? Me === "onCompositionEnd" && ti && (Ee = xf()) : (Vn = q, Gu = "value" in Vn ? Vn.value : Vn.textContent, ti = !0)), ce = Zr(N, Me), 0 < ce.length && (Me = new wf(
          Me,
          e,
          null,
          l,
          q
        ), Q.push({ event: Me, listeners: ce }), Ee ? Me.data = Ee : (Ee = _f(l), Ee !== null && (Me.data = Ee)))), (Ee = _b ? Ob(e, l) : Db(e, l)) && (Me = Zr(N, "onBeforeInput"), 0 < Me.length && (ce = new wf(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          q
        ), Q.push({
          event: ce,
          listeners: Me
        }), ce.data = Ee)), k1(
          Q,
          e,
          N,
          l,
          q
        );
      }
      hm(Q, t);
    });
  }
  function va(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Zr(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var o = e, c = o.stateNode;
      if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || c === null || (o = qi(e, l), o != null && i.unshift(
        va(e, o, c)
      ), o = qi(e, t), o != null && i.push(
        va(e, o, c)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function T1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function pm(e, t, l, i, o) {
    for (var c = t._reactName, g = []; l !== null && l !== i; ) {
      var x = l, E = x.alternate, N = x.stateNode;
      if (x = x.tag, E !== null && E === i) break;
      x !== 5 && x !== 26 && x !== 27 || N === null || (E = N, o ? (N = qi(l, c), N != null && g.unshift(
        va(l, N, E)
      )) : o || (N = qi(l, c), N != null && g.push(
        va(l, N, E)
      ))), l = l.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var A1 = /\r\n?/g, C1 = /\u0000|\uFFFD/g;
  function gm(e) {
    return (typeof e == "string" ? e : "" + e).replace(A1, `
`).replace(C1, "");
  }
  function ym(e, t) {
    return t = gm(t), gm(e) === t;
  }
  function Ge(e, t, l, i, o, c) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || Wl(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && Wl(e, "" + i);
        break;
      case "className":
        Ia(e, "class", i);
        break;
      case "tabIndex":
        Ia(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ia(e, l, i);
        break;
      case "style":
        yf(e, i, c);
        break;
      case "data":
        if (t !== "object") {
          Ia(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = Wa("" + i), e.setAttribute(l, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (l === "formAction" ? (t !== "input" && Ge(e, t, "name", o.name, o, null), Ge(
            e,
            t,
            "formEncType",
            o.formEncType,
            o,
            null
          ), Ge(
            e,
            t,
            "formMethod",
            o.formMethod,
            o,
            null
          ), Ge(
            e,
            t,
            "formTarget",
            o.formTarget,
            o,
            null
          )) : (Ge(e, t, "encType", o.encType, o, null), Ge(e, t, "method", o.method, o, null), Ge(e, t, "target", o.target, o, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = Wa("" + i), e.setAttribute(l, i);
        break;
      case "onClick":
        i != null && (e.onclick = xn);
        break;
      case "onScroll":
        i != null && _e("scroll", e);
        break;
      case "onScrollEnd":
        i != null && _e("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(u(61));
          if (l = i.__html, l != null) {
            if (o.children != null) throw Error(u(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = Wa("" + i), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, "" + i) : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(l, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, i) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(l, i) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(l) : e.setAttribute(l, i);
        break;
      case "popover":
        _e("beforetoggle", e), _e("toggle", e), Ja(e, "popover", i);
        break;
      case "xlinkActuate":
        vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        vn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        vn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        vn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        vn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Ja(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = nb.get(l) || l, Ja(e, l, i));
    }
  }
  function Es(e, t, l, i, o, c) {
    switch (l) {
      case "style":
        yf(e, i, c);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(u(61));
          if (l = i.__html, l != null) {
            if (o.children != null) throw Error(u(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof i == "string" ? Wl(e, i) : (typeof i == "number" || typeof i == "bigint") && Wl(e, "" + i);
        break;
      case "onScroll":
        i != null && _e("scroll", e);
        break;
      case "onScrollEnd":
        i != null && _e("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = xn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!of.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (o = l.endsWith("Capture"), t = l.slice(2, o ? l.length - 7 : void 0), c = e[Ct] || null, c = c != null ? c[l] : null, typeof c == "function" && e.removeEventListener(t, c, o), typeof i == "function")) {
              typeof c != "function" && c !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, o);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : Ja(e, l, i);
          }
    }
  }
  function gt(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        _e("error", e), _e("load", e);
        var i = !1, o = !1, c;
        for (c in l)
          if (l.hasOwnProperty(c)) {
            var g = l[c];
            if (g != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  o = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  Ge(e, t, c, g, l, null);
              }
          }
        o && Ge(e, t, "srcSet", l.srcSet, l, null), i && Ge(e, t, "src", l.src, l, null);
        return;
      case "input":
        _e("invalid", e);
        var x = c = g = o = null, E = null, N = null;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var q = l[i];
            if (q != null)
              switch (i) {
                case "name":
                  o = q;
                  break;
                case "type":
                  g = q;
                  break;
                case "checked":
                  E = q;
                  break;
                case "defaultChecked":
                  N = q;
                  break;
                case "value":
                  c = q;
                  break;
                case "defaultValue":
                  x = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Ge(e, t, i, q, l, null);
              }
          }
        hf(
          e,
          c,
          x,
          E,
          N,
          g,
          o,
          !1
        );
        return;
      case "select":
        _e("invalid", e), i = g = c = null;
        for (o in l)
          if (l.hasOwnProperty(o) && (x = l[o], x != null))
            switch (o) {
              case "value":
                c = x;
                break;
              case "defaultValue":
                g = x;
                break;
              case "multiple":
                i = x;
              default:
                Ge(e, t, o, x, l, null);
            }
        t = c, l = g, e.multiple = !!i, t != null ? $l(e, !!i, t, !1) : l != null && $l(e, !!i, l, !0);
        return;
      case "textarea":
        _e("invalid", e), c = o = i = null;
        for (g in l)
          if (l.hasOwnProperty(g) && (x = l[g], x != null))
            switch (g) {
              case "value":
                i = x;
                break;
              case "defaultValue":
                o = x;
                break;
              case "children":
                c = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(u(91));
                break;
              default:
                Ge(e, t, g, x, l, null);
            }
        pf(e, i, o, c);
        return;
      case "option":
        for (E in l)
          l.hasOwnProperty(E) && (i = l[E], i != null) && (E === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Ge(e, t, E, i, l, null));
        return;
      case "dialog":
        _e("beforetoggle", e), _e("toggle", e), _e("cancel", e), _e("close", e);
        break;
      case "iframe":
      case "object":
        _e("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ba.length; i++)
          _e(ba[i], e);
        break;
      case "image":
        _e("error", e), _e("load", e);
        break;
      case "details":
        _e("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        _e("error", e), _e("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (N in l)
          if (l.hasOwnProperty(N) && (i = l[N], i != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Ge(e, t, N, i, l, null);
            }
        return;
      default:
        if (Uu(t)) {
          for (q in l)
            l.hasOwnProperty(q) && (i = l[q], i !== void 0 && Es(
              e,
              t,
              q,
              i,
              l,
              void 0
            ));
          return;
        }
    }
    for (x in l)
      l.hasOwnProperty(x) && (i = l[x], i != null && Ge(e, t, x, i, l, null));
  }
  function _1(e, t, l, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var o = null, c = null, g = null, x = null, E = null, N = null, q = null;
        for (U in l) {
          var Q = l[U];
          if (l.hasOwnProperty(U) && Q != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = Q;
              default:
                i.hasOwnProperty(U) || Ge(e, t, U, null, i, Q);
            }
        }
        for (var R in i) {
          var U = i[R];
          if (Q = l[R], i.hasOwnProperty(R) && (U != null || Q != null))
            switch (R) {
              case "type":
                c = U;
                break;
              case "name":
                o = U;
                break;
              case "checked":
                N = U;
                break;
              case "defaultChecked":
                q = U;
                break;
              case "value":
                g = U;
                break;
              case "defaultValue":
                x = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(u(137, t));
                break;
              default:
                U !== Q && Ge(
                  e,
                  t,
                  R,
                  U,
                  i,
                  Q
                );
            }
        }
        ju(
          e,
          g,
          x,
          E,
          N,
          q,
          c,
          o
        );
        return;
      case "select":
        U = g = x = R = null;
        for (c in l)
          if (E = l[c], l.hasOwnProperty(c) && E != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                U = E;
              default:
                i.hasOwnProperty(c) || Ge(
                  e,
                  t,
                  c,
                  null,
                  i,
                  E
                );
            }
        for (o in i)
          if (c = i[o], E = l[o], i.hasOwnProperty(o) && (c != null || E != null))
            switch (o) {
              case "value":
                R = c;
                break;
              case "defaultValue":
                x = c;
                break;
              case "multiple":
                g = c;
              default:
                c !== E && Ge(
                  e,
                  t,
                  o,
                  c,
                  i,
                  E
                );
            }
        t = x, l = g, i = U, R != null ? $l(e, !!l, R, !1) : !!i != !!l && (t != null ? $l(e, !!l, t, !0) : $l(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        U = R = null;
        for (x in l)
          if (o = l[x], l.hasOwnProperty(x) && o != null && !i.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ge(e, t, x, null, i, o);
            }
        for (g in i)
          if (o = i[g], c = l[g], i.hasOwnProperty(g) && (o != null || c != null))
            switch (g) {
              case "value":
                R = o;
                break;
              case "defaultValue":
                U = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(u(91));
                break;
              default:
                o !== c && Ge(e, t, g, o, i, c);
            }
        mf(e, R, U);
        return;
      case "option":
        for (var oe in l)
          R = l[oe], l.hasOwnProperty(oe) && R != null && !i.hasOwnProperty(oe) && (oe === "selected" ? e.selected = !1 : Ge(
            e,
            t,
            oe,
            null,
            i,
            R
          ));
        for (E in i)
          R = i[E], U = l[E], i.hasOwnProperty(E) && R !== U && (R != null || U != null) && (E === "selected" ? e.selected = R && typeof R != "function" && typeof R != "symbol" : Ge(
            e,
            t,
            E,
            R,
            i,
            U
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var pe in l)
          R = l[pe], l.hasOwnProperty(pe) && R != null && !i.hasOwnProperty(pe) && Ge(e, t, pe, null, i, R);
        for (N in i)
          if (R = i[N], U = l[N], i.hasOwnProperty(N) && R !== U && (R != null || U != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null)
                  throw Error(u(137, t));
                break;
              default:
                Ge(
                  e,
                  t,
                  N,
                  R,
                  i,
                  U
                );
            }
        return;
      default:
        if (Uu(t)) {
          for (var Ve in l)
            R = l[Ve], l.hasOwnProperty(Ve) && R !== void 0 && !i.hasOwnProperty(Ve) && Es(
              e,
              t,
              Ve,
              void 0,
              i,
              R
            );
          for (q in i)
            R = i[q], U = l[q], !i.hasOwnProperty(q) || R === U || R === void 0 && U === void 0 || Es(
              e,
              t,
              q,
              R,
              i,
              U
            );
          return;
        }
    }
    for (var _ in l)
      R = l[_], l.hasOwnProperty(_) && R != null && !i.hasOwnProperty(_) && Ge(e, t, _, null, i, R);
    for (Q in i)
      R = i[Q], U = l[Q], !i.hasOwnProperty(Q) || R === U || R == null && U == null || Ge(e, t, Q, R, i, U);
  }
  function bm(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function O1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var o = l[i], c = o.transferSize, g = o.initiatorType, x = o.duration;
        if (c && x && bm(g)) {
          for (g = 0, x = o.responseEnd, i += 1; i < l.length; i++) {
            var E = l[i], N = E.startTime;
            if (N > x) break;
            var q = E.transferSize, Q = E.initiatorType;
            q && bm(Q) && (E = E.responseEnd, g += q * (E < x ? 1 : (x - N) / (E - N)));
          }
          if (--i, t += 8 * (c + g) / (o.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var zs = null, Ts = null;
  function Kr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function vm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function xm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function As(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Cs = null;
  function D1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Cs ? !1 : (Cs = e, !0) : (Cs = null, !1);
  }
  var Sm = typeof setTimeout == "function" ? setTimeout : void 0, M1 = typeof clearTimeout == "function" ? clearTimeout : void 0, km = typeof Promise == "function" ? Promise : void 0, N1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof km < "u" ? function(e) {
    return km.resolve(null).then(e).catch(R1);
  } : Sm;
  function R1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function rl(e) {
    return e === "head";
  }
  function wm(e, t) {
    var l = t, i = 0;
    do {
      var o = l.nextSibling;
      if (e.removeChild(l), o && o.nodeType === 8)
        if (l = o.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(o), _i(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          xa(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, xa(l);
          for (var c = l.firstChild; c; ) {
            var g = c.nextSibling, x = c.nodeName;
            c[Bi] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && c.rel.toLowerCase() === "stylesheet" || l.removeChild(c), c = g;
          }
        } else
          l === "body" && xa(e.ownerDocument.body);
      l = o;
    } while (l);
    _i(t);
  }
  function Em(e, t) {
    var l = e;
    e = 0;
    do {
      var i = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), i && i.nodeType === 8)
        if (l = i.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = i;
    } while (l);
  }
  function _s(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _s(l), Nu(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function j1(e, t, l, i) {
    for (; e.nodeType === 1; ) {
      var o = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[Bi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = tn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function L1(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = tn(e.nextSibling), e === null)) return null;
    return e;
  }
  function zm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = tn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Os(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Ds(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function U1(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), l.removeEventListener("DOMContentLoaded", i);
      };
      l.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function tn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Ms = null;
  function Tm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return tn(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Am(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Cm(e, t, l) {
    switch (t = Kr(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function xa(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Nu(e);
  }
  var nn = /* @__PURE__ */ new Map(), _m = /* @__PURE__ */ new Set();
  function Fr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ln = F.d;
  F.d = {
    f: B1,
    r: H1,
    D: q1,
    C: Y1,
    L: G1,
    m: V1,
    X: Q1,
    S: X1,
    M: Z1
  };
  function B1() {
    var e = Ln.f(), t = Hr();
    return e || t;
  }
  function H1(e) {
    var t = Fl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Zd(t) : Ln.r(e);
  }
  var Ti = typeof document > "u" ? null : document;
  function Om(e, t, l) {
    var i = Ti;
    if (i && typeof t == "string" && t) {
      var o = Ft(t);
      o = 'link[rel="' + e + '"][href="' + o + '"]', typeof l == "string" && (o += '[crossorigin="' + l + '"]'), _m.has(o) || (_m.add(o), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), gt(t, "link", e), ct(t), i.head.appendChild(t)));
    }
  }
  function q1(e) {
    Ln.D(e), Om("dns-prefetch", e, null);
  }
  function Y1(e, t) {
    Ln.C(e, t), Om("preconnect", e, t);
  }
  function G1(e, t, l) {
    Ln.L(e, t, l);
    var i = Ti;
    if (i && e && t) {
      var o = 'link[rel="preload"][as="' + Ft(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (o += '[imagesrcset="' + Ft(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (o += '[imagesizes="' + Ft(
        l.imageSizes
      ) + '"]')) : o += '[href="' + Ft(e) + '"]';
      var c = o;
      switch (t) {
        case "style":
          c = Ai(e);
          break;
        case "script":
          c = Ci(e);
      }
      nn.has(c) || (e = y(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), nn.set(c, e), i.querySelector(o) !== null || t === "style" && i.querySelector(Sa(c)) || t === "script" && i.querySelector(ka(c)) || (t = i.createElement("link"), gt(t, "link", e), ct(t), i.head.appendChild(t)));
    }
  }
  function V1(e, t) {
    Ln.m(e, t);
    var l = Ti;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + Ft(i) + '"][href="' + Ft(e) + '"]', c = o;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Ci(e);
      }
      if (!nn.has(c) && (e = y({ rel: "modulepreload", href: e }, t), nn.set(c, e), l.querySelector(o) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ka(c)))
              return;
        }
        i = l.createElement("link"), gt(i, "link", e), ct(i), l.head.appendChild(i);
      }
    }
  }
  function X1(e, t, l) {
    Ln.S(e, t, l);
    var i = Ti;
    if (i && e) {
      var o = Jl(i).hoistableStyles, c = Ai(e);
      t = t || "default";
      var g = o.get(c);
      if (!g) {
        var x = { loading: 0, preload: null };
        if (g = i.querySelector(
          Sa(c)
        ))
          x.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = nn.get(c)) && Ns(e, l);
          var E = g = i.createElement("link");
          ct(E), gt(E, "link", e), E._p = new Promise(function(N, q) {
            E.onload = N, E.onerror = q;
          }), E.addEventListener("load", function() {
            x.loading |= 1;
          }), E.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, Jr(g, t, i);
        }
        g = {
          type: "stylesheet",
          instance: g,
          count: 1,
          state: x
        }, o.set(c, g);
      }
    }
  }
  function Q1(e, t) {
    Ln.X(e, t);
    var l = Ti;
    if (l && e) {
      var i = Jl(l).hoistableScripts, o = Ci(e), c = i.get(o);
      c || (c = l.querySelector(ka(o)), c || (e = y({ src: e, async: !0 }, t), (t = nn.get(o)) && Rs(e, t), c = l.createElement("script"), ct(c), gt(c, "link", e), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(o, c));
    }
  }
  function Z1(e, t) {
    Ln.M(e, t);
    var l = Ti;
    if (l && e) {
      var i = Jl(l).hoistableScripts, o = Ci(e), c = i.get(o);
      c || (c = l.querySelector(ka(o)), c || (e = y({ src: e, async: !0, type: "module" }, t), (t = nn.get(o)) && Rs(e, t), c = l.createElement("script"), ct(c), gt(c, "link", e), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(o, c));
    }
  }
  function Dm(e, t, l, i) {
    var o = (o = ne.current) ? Fr(o) : null;
    if (!o) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Ai(l.href), l = Jl(
          o
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Ai(l.href);
          var c = Jl(
            o
          ).hoistableStyles, g = c.get(e);
          if (g || (o = o.ownerDocument || o, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, g), (c = o.querySelector(
            Sa(e)
          )) && !c._p && (g.instance = c, g.state.loading = 5), nn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, nn.set(e, l), c || K1(
            o,
            e,
            l,
            g.state
          ))), t && i === null)
            throw Error(u(528, ""));
          return g;
        }
        if (t && i !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ci(l), l = Jl(
          o
        ).hoistableScripts, i = l.get(t), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function Ai(e) {
    return 'href="' + Ft(e) + '"';
  }
  function Sa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Mm(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function K1(e, t, l, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), gt(t, "link", l), ct(t), e.head.appendChild(t));
  }
  function Ci(e) {
    return '[src="' + Ft(e) + '"]';
  }
  function ka(e) {
    return "script[async]" + e;
  }
  function Nm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Ft(l.href) + '"]'
          );
          if (i)
            return t.instance = i, ct(i), i;
          var o = y({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), ct(i), gt(i, "style", o), Jr(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          o = Ai(l.href);
          var c = e.querySelector(
            Sa(o)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, ct(c), c;
          i = Mm(l), (o = nn.get(o)) && Ns(i, o), c = (e.ownerDocument || e).createElement("link"), ct(c);
          var g = c;
          return g._p = new Promise(function(x, E) {
            g.onload = x, g.onerror = E;
          }), gt(c, "link", i), t.state.loading |= 4, Jr(c, l.precedence, e), t.instance = c;
        case "script":
          return c = Ci(l.src), (o = e.querySelector(
            ka(c)
          )) ? (t.instance = o, ct(o), o) : (i = l, (o = nn.get(c)) && (i = y({}, l), Rs(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), ct(o), gt(o, "link", i), e.head.appendChild(o), t.instance = o);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Jr(i, l.precedence, e));
    return t.instance;
  }
  function Jr(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), o = i.length ? i[i.length - 1] : null, c = o, g = 0; g < i.length; g++) {
      var x = i[g];
      if (x.dataset.precedence === t) c = x;
      else if (c !== o) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Ns(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Rs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Ir = null;
  function Rm(e, t, l) {
    if (Ir === null) {
      var i = /* @__PURE__ */ new Map(), o = Ir = /* @__PURE__ */ new Map();
      o.set(l, i);
    } else
      o = Ir, i = o.get(l), i || (i = /* @__PURE__ */ new Map(), o.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), o = 0; o < l.length; o++) {
      var c = l[o];
      if (!(c[Bi] || c[dt] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = c.getAttribute(t) || "";
        g = e + g;
        var x = i.get(g);
        x ? x.push(c) : i.set(g, [c]);
      }
    }
    return i;
  }
  function jm(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function F1(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Lm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function J1(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var o = Ai(i.href), c = t.querySelector(
          Sa(o)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = $r.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = c, ct(c);
          return;
        }
        c = t.ownerDocument || t, i = Mm(i), (o = nn.get(o)) && Ns(i, o), c = c.createElement("link"), ct(c);
        var g = c;
        g._p = new Promise(function(x, E) {
          g.onload = x, g.onerror = E;
        }), gt(c, "link", i), l.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = $r.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var js = 0;
  function I1(e, t) {
    return e.stylesheets && e.count === 0 && Pr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && Pr(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && js === 0 && (js = 62500 * O1());
      var o = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Pr(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > js ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(o);
      };
    } : null;
  }
  function $r() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Pr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Wr = null;
  function Pr(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Wr = /* @__PURE__ */ new Map(), t.forEach($1, e), Wr = null, $r.call(e));
  }
  function $1(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Wr.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Wr.set(e, l);
        for (var o = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < o.length; c++) {
          var g = o[c];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (l.set(g.dataset.precedence, g), i = g);
        }
        i && l.set(null, i);
      }
      o = t.instance, g = o.getAttribute("data-precedence"), c = l.get(g) || i, c === i && l.set(null, o), l.set(g, o), this.count++, i = $r.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), c ? c.parentNode.insertBefore(o, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= 4;
    }
  }
  var wa = {
    $$typeof: Y,
    Provider: null,
    Consumer: null,
    _currentValue: se,
    _currentValue2: se,
    _threadCount: 0
  };
  function W1(e, t, l, i, o, c, g, x, E) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = _u(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = _u(0), this.hiddenUpdates = _u(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = c, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Um(e, t, l, i, o, c, g, x, E, N, q, Q) {
    return e = new W1(
      e,
      t,
      l,
      g,
      E,
      N,
      q,
      Q,
      x
    ), t = 1, c === !0 && (t |= 24), c = Ht(3, null, null, t), e.current = c, c.stateNode = e, t = mo(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, bo(c), e;
  }
  function Bm(e) {
    return e ? (e = ai, e) : ai;
  }
  function Hm(e, t, l, i, o, c) {
    o = Bm(o), i.context === null ? i.context = o : i.pendingContext = o, i = Jn(t), i.payload = { element: l }, c = c === void 0 ? null : c, c !== null && (i.callback = c), l = In(e, i, t), l !== null && (Rt(l, e, t), ta(l, e, t));
  }
  function qm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Ls(e, t) {
    qm(e, t), (e = e.alternate) && qm(e, t);
  }
  function Ym(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = kl(e, 67108864);
      t !== null && Rt(t, e, 67108864), Ls(e, 67108864);
    }
  }
  function Gm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xt();
      t = Ou(t);
      var l = kl(e, t);
      l !== null && Rt(l, e, t), Ls(e, t);
    }
  }
  var eu = !0;
  function P1(e, t, l, i) {
    var o = O.T;
    O.T = null;
    var c = F.p;
    try {
      F.p = 2, Us(e, t, l, i);
    } finally {
      F.p = c, O.T = o;
    }
  }
  function ev(e, t, l, i) {
    var o = O.T;
    O.T = null;
    var c = F.p;
    try {
      F.p = 8, Us(e, t, l, i);
    } finally {
      F.p = c, O.T = o;
    }
  }
  function Us(e, t, l, i) {
    if (eu) {
      var o = Bs(i);
      if (o === null)
        ws(
          e,
          t,
          i,
          tu,
          l
        ), Xm(e, i);
      else if (nv(
        o,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (Xm(e, i), t & 4 && -1 < tv.indexOf(e)) {
        for (; o !== null; ) {
          var c = Fl(o);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var g = yl(c.pendingLanes);
                  if (g !== 0) {
                    var x = c;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
                      var E = 1 << 31 - Qe(g);
                      x.entanglements[1] |= E, g &= ~E;
                    }
                    mn(c), (Ue & 6) === 0 && (Ur = St() + 500, ya(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = kl(c, 2), x !== null && Rt(x, c, 2), Hr(), Ls(c, 2);
            }
          if (c = Bs(i), c === null && ws(
            e,
            t,
            i,
            tu,
            l
          ), c === o) break;
          o = c;
        }
        o !== null && i.stopPropagation();
      } else
        ws(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function Bs(e) {
    return e = Hu(e), Hs(e);
  }
  var tu = null;
  function Hs(e) {
    if (tu = null, e = Kl(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return tu = e, null;
  }
  function Vm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Cu()) {
          case V:
            return 2;
          case W:
            return 8;
          case ge:
          case Ae:
            return 32;
          case Be:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var qs = !1, ul = null, ol = null, sl = null, Ea = /* @__PURE__ */ new Map(), za = /* @__PURE__ */ new Map(), cl = [], tv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Xm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ul = null;
        break;
      case "dragenter":
      case "dragleave":
        ol = null;
        break;
      case "mouseover":
      case "mouseout":
        sl = null;
        break;
      case "pointerover":
      case "pointerout":
        Ea.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        za.delete(t.pointerId);
    }
  }
  function Ta(e, t, l, i, o, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: c,
      targetContainers: [o]
    }, t !== null && (t = Fl(t), t !== null && Ym(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function nv(e, t, l, i, o) {
    switch (t) {
      case "focusin":
        return ul = Ta(
          ul,
          e,
          t,
          l,
          i,
          o
        ), !0;
      case "dragenter":
        return ol = Ta(
          ol,
          e,
          t,
          l,
          i,
          o
        ), !0;
      case "mouseover":
        return sl = Ta(
          sl,
          e,
          t,
          l,
          i,
          o
        ), !0;
      case "pointerover":
        var c = o.pointerId;
        return Ea.set(
          c,
          Ta(
            Ea.get(c) || null,
            e,
            t,
            l,
            i,
            o
          )
        ), !0;
      case "gotpointercapture":
        return c = o.pointerId, za.set(
          c,
          Ta(
            za.get(c) || null,
            e,
            t,
            l,
            i,
            o
          )
        ), !0;
    }
    return !1;
  }
  function Qm(e) {
    var t = Kl(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, af(e.priority, function() {
              Gm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, af(e.priority, function() {
              Gm(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function nu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Bs(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        Bu = i, l.target.dispatchEvent(i), Bu = null;
      } else
        return t = Fl(l), t !== null && Ym(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function Zm(e, t, l) {
    nu(e) && l.delete(t);
  }
  function lv() {
    qs = !1, ul !== null && nu(ul) && (ul = null), ol !== null && nu(ol) && (ol = null), sl !== null && nu(sl) && (sl = null), Ea.forEach(Zm), za.forEach(Zm);
  }
  function lu(e, t) {
    e.blockedOn === t && (e.blockedOn = null, qs || (qs = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      lv
    )));
  }
  var iu = null;
  function Km(e) {
    iu !== e && (iu = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        iu === e && (iu = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], o = e[t + 2];
          if (typeof i != "function") {
            if (Hs(i || l) === null)
              continue;
            break;
          }
          var c = Fl(l);
          c !== null && (e.splice(t, 3), t -= 3, Bo(
            c,
            {
              pending: !0,
              data: o,
              method: l.method,
              action: i
            },
            i,
            o
          ));
        }
      }
    ));
  }
  function _i(e) {
    function t(E) {
      return lu(E, e);
    }
    ul !== null && lu(ul, e), ol !== null && lu(ol, e), sl !== null && lu(sl, e), Ea.forEach(t), za.forEach(t);
    for (var l = 0; l < cl.length; l++) {
      var i = cl[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < cl.length && (l = cl[0], l.blockedOn === null); )
      Qm(l), l.blockedOn === null && cl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var o = l[i], c = l[i + 1], g = o[Ct] || null;
        if (typeof c == "function")
          g || Km(l);
        else if (g) {
          var x = null;
          if (c && c.hasAttribute("formAction")) {
            if (o = c, g = c[Ct] || null)
              x = g.formAction;
            else if (Hs(o) !== null) continue;
          } else x = g.action;
          typeof x == "function" ? l[i + 1] = x : (l.splice(i, 3), i -= 3), Km(l);
        }
      }
  }
  function Fm() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(g) {
            return o = g;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      o !== null && (o(), o = null), i || setTimeout(l, 20);
    }
    function l() {
      if (!i && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, o = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), o !== null && (o(), o = null);
      };
    }
  }
  function Ys(e) {
    this._internalRoot = e;
  }
  au.prototype.render = Ys.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var l = t.current, i = Xt();
    Hm(l, i, e, t, null, null);
  }, au.prototype.unmount = Ys.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Hm(e.current, 2, null, e, null, null), Hr(), t[Zl] = null;
    }
  };
  function au(e) {
    this._internalRoot = e;
  }
  au.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = lf();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < cl.length && t !== 0 && t < cl[l].priority; l++) ;
      cl.splice(l, 0, e), l === 0 && Qm(e);
    }
  };
  var Jm = r.version;
  if (Jm !== "19.2.7")
    throw Error(
      u(
        527,
        Jm,
        "19.2.7"
      )
    );
  F.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = h(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var iv = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ru = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ru.isDisabled && ru.supportsFiber)
      try {
        kt = ru.inject(
          iv
        ), ut = ru;
      } catch {
      }
  }
  return Ca.createRoot = function(e, t) {
    if (!s(e)) throw Error(u(299));
    var l = !1, i = "", o = nh, c = lh, g = ih;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = Um(
      e,
      1,
      !1,
      null,
      null,
      l,
      i,
      null,
      o,
      c,
      g,
      Fm
    ), e[Zl] = t.current, ks(e), new Ys(t);
  }, Ca.hydrateRoot = function(e, t, l) {
    if (!s(e)) throw Error(u(299));
    var i = !1, o = "", c = nh, g = lh, x = ih, E = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (o = l.identifierPrefix), l.onUncaughtError !== void 0 && (c = l.onUncaughtError), l.onCaughtError !== void 0 && (g = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.formState !== void 0 && (E = l.formState)), t = Um(
      e,
      1,
      !0,
      t,
      l ?? null,
      i,
      o,
      E,
      c,
      g,
      x,
      Fm
    ), t.context = Bm(null), l = t.current, i = Xt(), i = Ou(i), o = Jn(i), o.callback = null, In(l, o, i), l = i, t.current.lanes = l, Ui(t, l), mn(t), e[Zl] = t.current, ks(e), new au(t);
  }, Ca.version = "19.2.7", Ca;
}
var ap;
function pv() {
  if (ap) return Vs.exports;
  ap = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Vs.exports = /* @__PURE__ */ mv(), Vs.exports;
}
var cg = /* @__PURE__ */ pv(), ye = /* @__PURE__ */ Cc();
const gv = /* @__PURE__ */ Ac(ye), yv = /* @__PURE__ */ rv({
  __proto__: null,
  default: gv
}, [ye]);
function bv(n, r) {
  const a = {};
  return (n[n.length - 1] === "" ? [...n, ""] : n).join(
    (a.padRight ? " " : "") + "," + (a.padLeft === !1 ? "" : " ")
  ).trim();
}
const vv = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, xv = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Sv = {};
function rp(n, r) {
  return (Sv.jsx ? xv : vv).test(n);
}
const kv = /[ \t\n\f\r]/g;
function wv(n) {
  return typeof n == "object" ? n.type === "text" ? up(n.value) : !1 : up(n);
}
function up(n) {
  return n.replace(kv, "") === "";
}
class qa {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(r, a, u) {
    this.normal = a, this.property = r, u && (this.space = u);
  }
}
qa.prototype.normal = {};
qa.prototype.property = {};
qa.prototype.space = void 0;
function fg(n, r) {
  const a = {}, u = {};
  for (const s of n)
    Object.assign(a, s.property), Object.assign(u, s.normal);
  return new qa(a, u, r);
}
function mc(n) {
  return n.toLowerCase();
}
class Lt {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(r, a) {
    this.attribute = a, this.property = r;
  }
}
Lt.prototype.attribute = "";
Lt.prototype.booleanish = !1;
Lt.prototype.boolean = !1;
Lt.prototype.commaOrSpaceSeparated = !1;
Lt.prototype.commaSeparated = !1;
Lt.prototype.defined = !1;
Lt.prototype.mustUseProperty = !1;
Lt.prototype.number = !1;
Lt.prototype.overloadedBoolean = !1;
Lt.prototype.property = "";
Lt.prototype.spaceSeparated = !1;
Lt.prototype.space = void 0;
let Ev = 0;
const ve = ql(), rt = ql(), pc = ql(), J = ql(), Ke = ql(), Bl = ql(), Qt = ql();
function ql() {
  return 2 ** ++Ev;
}
const gc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: ve,
  booleanish: rt,
  commaOrSpaceSeparated: Qt,
  commaSeparated: Bl,
  number: J,
  overloadedBoolean: pc,
  spaceSeparated: Ke
}, Symbol.toStringTag, { value: "Module" })), Fs = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(gc)
);
class _c extends Lt {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(r, a, u, s) {
    let f = -1;
    if (super(r, a), op(this, "space", s), typeof u == "number")
      for (; ++f < Fs.length; ) {
        const d = Fs[f];
        op(this, Fs[f], (u & gc[d]) === gc[d]);
      }
  }
}
_c.prototype.defined = !0;
function op(n, r, a) {
  a && (n[r] = a);
}
function Ni(n) {
  const r = {}, a = {};
  for (const [u, s] of Object.entries(n.properties)) {
    const f = new _c(
      u,
      n.transform(n.attributes || {}, u),
      s,
      n.space
    );
    n.mustUseProperty && n.mustUseProperty.includes(u) && (f.mustUseProperty = !0), r[u] = f, a[mc(u)] = u, a[mc(f.attribute)] = u;
  }
  return new qa(r, a, n.space);
}
const dg = Ni({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: rt,
    ariaAutoComplete: null,
    ariaBusy: rt,
    ariaChecked: rt,
    ariaColCount: J,
    ariaColIndex: J,
    ariaColSpan: J,
    ariaControls: Ke,
    ariaCurrent: null,
    ariaDescribedBy: Ke,
    ariaDetails: null,
    ariaDisabled: rt,
    ariaDropEffect: Ke,
    ariaErrorMessage: null,
    ariaExpanded: rt,
    ariaFlowTo: Ke,
    ariaGrabbed: rt,
    ariaHasPopup: null,
    ariaHidden: rt,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Ke,
    ariaLevel: J,
    ariaLive: null,
    ariaModal: rt,
    ariaMultiLine: rt,
    ariaMultiSelectable: rt,
    ariaOrientation: null,
    ariaOwns: Ke,
    ariaPlaceholder: null,
    ariaPosInSet: J,
    ariaPressed: rt,
    ariaReadOnly: rt,
    ariaRelevant: null,
    ariaRequired: rt,
    ariaRoleDescription: Ke,
    ariaRowCount: J,
    ariaRowIndex: J,
    ariaRowSpan: J,
    ariaSelected: rt,
    ariaSetSize: J,
    ariaSort: null,
    ariaValueMax: J,
    ariaValueMin: J,
    ariaValueNow: J,
    ariaValueText: null,
    role: null
  },
  transform(n, r) {
    return r === "role" ? r : "aria-" + r.slice(4).toLowerCase();
  }
});
function hg(n, r) {
  return r in n ? n[r] : r;
}
function mg(n, r) {
  return hg(n, r.toLowerCase());
}
const zv = Ni({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Bl,
    acceptCharset: Ke,
    accessKey: Ke,
    action: null,
    allow: null,
    allowFullScreen: ve,
    allowPaymentRequest: ve,
    allowUserMedia: ve,
    alpha: ve,
    alt: null,
    as: null,
    async: ve,
    autoCapitalize: null,
    autoComplete: Ke,
    autoFocus: ve,
    autoPlay: ve,
    blocking: Ke,
    capture: null,
    charSet: null,
    checked: ve,
    cite: null,
    className: Ke,
    closedBy: null,
    colorSpace: null,
    cols: J,
    colSpan: J,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: rt,
    controls: ve,
    controlsList: Ke,
    coords: J | Bl,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: ve,
    defer: ve,
    dir: null,
    dirName: null,
    disabled: ve,
    download: pc,
    draggable: rt,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: ve,
    formTarget: null,
    headers: Ke,
    height: J,
    hidden: pc,
    high: J,
    href: null,
    hrefLang: null,
    htmlFor: Ke,
    httpEquiv: Ke,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: ve,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: ve,
    itemId: null,
    itemProp: Ke,
    itemRef: Ke,
    itemScope: ve,
    itemType: Ke,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: ve,
    low: J,
    manifest: null,
    max: null,
    maxLength: J,
    media: null,
    method: null,
    min: null,
    minLength: J,
    multiple: ve,
    muted: ve,
    name: null,
    nonce: null,
    noModule: ve,
    noValidate: ve,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: ve,
    optimum: J,
    pattern: null,
    ping: Ke,
    placeholder: null,
    playsInline: ve,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: ve,
    referrerPolicy: null,
    rel: Ke,
    required: ve,
    reversed: ve,
    rows: J,
    rowSpan: J,
    sandbox: Ke,
    scope: null,
    scoped: ve,
    seamless: ve,
    selected: ve,
    shadowRootClonable: ve,
    shadowRootCustomElementRegistry: ve,
    shadowRootDelegatesFocus: ve,
    shadowRootMode: null,
    shadowRootSerializable: ve,
    shape: null,
    size: J,
    sizes: null,
    slot: null,
    span: J,
    spellCheck: rt,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: J,
    step: null,
    style: null,
    tabIndex: J,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: ve,
    useMap: null,
    value: rt,
    width: J,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Ke,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: J,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: J,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: ve,
    // Lists. Use CSS to reduce space between items instead
    declare: ve,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: J,
    // `<img>` and `<object>`
    leftMargin: J,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: J,
    // `<body>`
    marginWidth: J,
    // `<body>`
    noResize: ve,
    // `<frame>`
    noHref: ve,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: ve,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: ve,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: J,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: rt,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: J,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: J,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: ve,
    disablePictureInPicture: ve,
    disableRemotePlayback: ve,
    exportParts: Bl,
    part: Ke,
    prefix: null,
    property: null,
    results: J,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: mg
}), Tv = Ni({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    maskType: "mask-type",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: Qt,
    accentHeight: J,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: J,
    amplitude: J,
    arabicForm: null,
    ascent: J,
    attributeName: null,
    attributeType: null,
    azimuth: J,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: J,
    by: null,
    calcMode: null,
    capHeight: J,
    className: Ke,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: J,
    diffuseConstant: J,
    direction: null,
    display: null,
    dur: null,
    divisor: J,
    dominantBaseline: null,
    download: ve,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: J,
    enableBackground: null,
    end: null,
    event: null,
    exponent: J,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: J,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Bl,
    g2: Bl,
    glyphName: Bl,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: J,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: J,
    horizOriginX: J,
    horizOriginY: J,
    id: null,
    ideographic: J,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: J,
    k: J,
    k1: J,
    k2: J,
    k3: J,
    k4: J,
    kernelMatrix: Qt,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: J,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskType: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: J,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: J,
    overlineThickness: J,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: J,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Ke,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: J,
    pointsAtY: J,
    pointsAtZ: J,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Qt,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Qt,
    rev: Qt,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Qt,
    requiredFeatures: Qt,
    requiredFonts: Qt,
    requiredFormats: Qt,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: J,
    specularExponent: J,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: J,
    strikethroughThickness: J,
    string: null,
    stroke: null,
    strokeDashArray: Qt,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: J,
    strokeOpacity: J,
    strokeWidth: null,
    style: null,
    surfaceScale: J,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Qt,
    tabIndex: J,
    tableValues: null,
    target: null,
    targetX: J,
    targetY: J,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Qt,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: J,
    underlineThickness: J,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: J,
    values: null,
    vAlphabetic: J,
    vMathematical: J,
    vectorEffect: null,
    vHanging: J,
    vIdeographic: J,
    version: null,
    vertAdvY: J,
    vertOriginX: J,
    vertOriginY: J,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: J,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: hg
}), pg = Ni({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(n, r) {
    return "xlink:" + r.slice(5).toLowerCase();
  }
}), gg = Ni({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: mg
}), yg = Ni({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(n, r) {
    return "xml:" + r.slice(3).toLowerCase();
  }
}), Av = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Cv = /[A-Z]/g, sp = /-[a-z]/g, _v = /^data[-\w.:]+$/i;
function Ov(n, r) {
  const a = mc(r);
  let u = r, s = Lt;
  if (a in n.normal)
    return n.property[n.normal[a]];
  if (a.length > 4 && a.slice(0, 4) === "data" && _v.test(r)) {
    if (r.charAt(4) === "-") {
      const f = r.slice(5).replace(sp, Mv);
      u = "data" + f.charAt(0).toUpperCase() + f.slice(1);
    } else {
      const f = r.slice(4);
      if (!sp.test(f)) {
        let d = f.replace(Cv, Dv);
        d.charAt(0) !== "-" && (d = "-" + d), r = "data" + d;
      }
    }
    s = _c;
  }
  return new s(u, r);
}
function Dv(n) {
  return "-" + n.toLowerCase();
}
function Mv(n) {
  return n.charAt(1).toUpperCase();
}
const Nv = fg([dg, zv, pg, gg, yg], "html"), Oc = fg([dg, Tv, pg, gg, yg], "svg");
function Rv(n) {
  return n.join(" ").trim();
}
var Oi = {}, Js, cp;
function jv() {
  if (cp) return Js;
  cp = 1;
  var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, a = /^\s*/, u = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, s = /^:\s*/, f = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, d = /^[;\s]*/, m = /^\s+|\s+$/g, p = `
`, h = "/", b = "*", y = "", S = "comment", v = "declaration";
  function z(H, D) {
    if (typeof H != "string")
      throw new TypeError("First argument must be a string");
    if (!H) return [];
    D = D || {};
    var Z = 1, Y = 1;
    function re(ue) {
      var I = ue.match(r);
      I && (Z += I.length);
      var O = ue.lastIndexOf(p);
      Y = ~O ? ue.length - O : Y + ue.length;
    }
    function fe() {
      var ue = { line: Z, column: Y };
      return function(I) {
        return I.position = new B(ue), de(), I;
      };
    }
    function B(ue) {
      this.start = ue, this.end = { line: Z, column: Y }, this.source = D.source;
    }
    B.prototype.content = H;
    function $(ue) {
      var I = new Error(
        D.source + ":" + Z + ":" + Y + ": " + ue
      );
      if (I.reason = ue, I.filename = D.source, I.line = Z, I.column = Y, I.source = H, !D.silent) throw I;
    }
    function K(ue) {
      var I = ue.exec(H);
      if (I) {
        var O = I[0];
        return re(O), H = H.slice(O.length), I;
      }
    }
    function de() {
      K(a);
    }
    function L(ue) {
      var I;
      for (ue = ue || []; I = te(); )
        I !== !1 && ue.push(I);
      return ue;
    }
    function te() {
      var ue = fe();
      if (!(h != H.charAt(0) || b != H.charAt(1))) {
        for (var I = 2; y != H.charAt(I) && (b != H.charAt(I) || h != H.charAt(I + 1)); )
          ++I;
        if (I += 2, y === H.charAt(I - 1))
          return $("End of comment missing");
        var O = H.slice(2, I - 2);
        return Y += 2, re(O), H = H.slice(I), Y += 2, ue({
          type: S,
          comment: O
        });
      }
    }
    function ee() {
      var ue = fe(), I = K(u);
      if (I) {
        if (te(), !K(s)) return $("property missing ':'");
        var O = K(f), F = ue({
          type: v,
          property: j(I[0].replace(n, y)),
          value: O ? j(O[0].replace(n, y)) : y
        });
        return K(d), F;
      }
    }
    function ze() {
      var ue = [];
      L(ue);
      for (var I; I = ee(); )
        I !== !1 && (ue.push(I), L(ue));
      return ue;
    }
    return de(), ze();
  }
  function j(H) {
    return H ? H.replace(m, y) : y;
  }
  return Js = z, Js;
}
var fp;
function Lv() {
  if (fp) return Oi;
  fp = 1;
  var n = Oi && Oi.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(Oi, "__esModule", { value: !0 }), Oi.default = a;
  const r = n(/* @__PURE__ */ jv());
  function a(u, s) {
    let f = null;
    if (!u || typeof u != "string")
      return f;
    const d = (0, r.default)(u), m = typeof s == "function";
    return d.forEach((p) => {
      if (p.type !== "declaration")
        return;
      const { property: h, value: b } = p;
      m ? s(h, b, p) : b && (f = f || {}, f[h] = b);
    }), f;
  }
  return Oi;
}
var _a = {}, dp;
function Uv() {
  if (dp) return _a;
  dp = 1, Object.defineProperty(_a, "__esModule", { value: !0 }), _a.camelCase = void 0;
  var n = /^--[a-zA-Z0-9_-]+$/, r = /-([a-z])/g, a = /^[^-]+$/, u = /^-(webkit|moz|ms|o|khtml)-/, s = /^-(ms)-/, f = function(h) {
    return !h || a.test(h) || n.test(h);
  }, d = function(h, b) {
    return b.toUpperCase();
  }, m = function(h, b) {
    return "".concat(b, "-");
  }, p = function(h, b) {
    return b === void 0 && (b = {}), f(h) ? h : (h = h.toLowerCase(), b.reactCompat ? h = h.replace(s, m) : h = h.replace(u, m), h.replace(r, d));
  };
  return _a.camelCase = p, _a;
}
var Oa, hp;
function Bv() {
  if (hp) return Oa;
  hp = 1;
  var n = Oa && Oa.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  }, r = n(/* @__PURE__ */ Lv()), a = /* @__PURE__ */ Uv();
  function u(s, f) {
    var d = {};
    return !s || typeof s != "string" || (0, r.default)(s, function(m, p) {
      m && p && (d[(0, a.camelCase)(m, f)] = p);
    }), d;
  }
  return u.default = u, Oa = u, Oa;
}
var Hv = /* @__PURE__ */ Bv();
const qv = /* @__PURE__ */ Ac(Hv), bg = vg("end"), Dc = vg("start");
function vg(n) {
  return r;
  function r(a) {
    const u = a && a.position && a.position[n] || {};
    if (typeof u.line == "number" && u.line > 0 && typeof u.column == "number" && u.column > 0)
      return {
        line: u.line,
        column: u.column,
        offset: typeof u.offset == "number" && u.offset > -1 ? u.offset : void 0
      };
  }
}
function Yv(n) {
  const r = Dc(n), a = bg(n);
  if (r && a)
    return { start: r, end: a };
}
function Ra(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? mp(n.position) : "start" in n || "end" in n ? mp(n) : "line" in n || "column" in n ? yc(n) : "";
}
function yc(n) {
  return pp(n && n.line) + ":" + pp(n && n.column);
}
function mp(n) {
  return yc(n && n.start) + "-" + yc(n && n.end);
}
function pp(n) {
  return n && typeof n == "number" ? n : 1;
}
class vt extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(r, a, u) {
    super(), typeof a == "string" && (u = a, a = void 0);
    let s = "", f = {}, d = !1;
    if (a && ("line" in a && "column" in a ? f = { place: a } : "start" in a && "end" in a ? f = { place: a } : "type" in a ? f = {
      ancestors: [a],
      place: a.position
    } : f = { ...a }), typeof r == "string" ? s = r : !f.cause && r && (d = !0, s = r.message, f.cause = r), !f.ruleId && !f.source && typeof u == "string") {
      const p = u.indexOf(":");
      p === -1 ? f.ruleId = u : (f.source = u.slice(0, p), f.ruleId = u.slice(p + 1));
    }
    if (!f.place && f.ancestors && f.ancestors) {
      const p = f.ancestors[f.ancestors.length - 1];
      p && (f.place = p.position);
    }
    const m = f.place && "start" in f.place ? f.place.start : f.place;
    this.ancestors = f.ancestors || void 0, this.cause = f.cause || void 0, this.column = m ? m.column : void 0, this.fatal = void 0, this.file = "", this.message = s, this.line = m ? m.line : void 0, this.name = Ra(f.place) || "1:1", this.place = f.place || void 0, this.reason = this.message, this.ruleId = f.ruleId || void 0, this.source = f.source || void 0, this.stack = d && f.cause && typeof f.cause.stack == "string" ? f.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
vt.prototype.file = "";
vt.prototype.name = "";
vt.prototype.reason = "";
vt.prototype.message = "";
vt.prototype.stack = "";
vt.prototype.column = void 0;
vt.prototype.line = void 0;
vt.prototype.ancestors = void 0;
vt.prototype.cause = void 0;
vt.prototype.fatal = void 0;
vt.prototype.place = void 0;
vt.prototype.ruleId = void 0;
vt.prototype.source = void 0;
const Mc = {}.hasOwnProperty, Gv = /* @__PURE__ */ new Map(), Vv = /[A-Z]/g, Xv = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Qv = /* @__PURE__ */ new Set(["td", "th"]), xg = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Zv(n, r) {
  if (!r || r.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const a = r.filePath || void 0;
  let u;
  if (r.development) {
    if (typeof r.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    u = e0(a, r.jsxDEV);
  } else {
    if (typeof r.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof r.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    u = Pv(a, r.jsx, r.jsxs);
  }
  const s = {
    Fragment: r.Fragment,
    ancestors: [],
    components: r.components || {},
    create: u,
    elementAttributeNameCase: r.elementAttributeNameCase || "react",
    evaluater: r.createEvaluater ? r.createEvaluater() : void 0,
    filePath: a,
    ignoreInvalidStyle: r.ignoreInvalidStyle || !1,
    passKeys: r.passKeys !== !1,
    passNode: r.passNode || !1,
    schema: r.space === "svg" ? Oc : Nv,
    stylePropertyNameCase: r.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: r.tableCellAlignToStyle !== !1
  }, f = Sg(s, n, void 0);
  return f && typeof f != "string" ? f : s.create(
    n,
    s.Fragment,
    { children: f || void 0 },
    void 0
  );
}
function Sg(n, r, a) {
  if (r.type === "element")
    return Kv(n, r, a);
  if (r.type === "mdxFlowExpression" || r.type === "mdxTextExpression")
    return Fv(n, r);
  if (r.type === "mdxJsxFlowElement" || r.type === "mdxJsxTextElement")
    return Iv(n, r, a);
  if (r.type === "mdxjsEsm")
    return Jv(n, r);
  if (r.type === "root")
    return $v(n, r, a);
  if (r.type === "text")
    return Wv(n, r);
}
function Kv(n, r, a) {
  const u = n.schema;
  let s = u;
  r.tagName.toLowerCase() === "svg" && u.space === "html" && (s = Oc, n.schema = s), n.ancestors.push(r);
  const f = wg(n, r.tagName, !1), d = t0(n, r);
  let m = Rc(n, r);
  return Xv.has(r.tagName) && (m = m.filter(function(p) {
    return typeof p == "string" ? !wv(p) : !0;
  })), kg(n, d, f, r), Nc(d, m), n.ancestors.pop(), n.schema = u, n.create(r, f, d, a);
}
function Fv(n, r) {
  if (r.data && r.data.estree && n.evaluater) {
    const u = r.data.estree.body[0];
    return u.type, /** @type {Child | undefined} */
    n.evaluater.evaluateExpression(u.expression);
  }
  Ba(n, r.position);
}
function Jv(n, r) {
  if (r.data && r.data.estree && n.evaluater)
    return (
      /** @type {Child | undefined} */
      n.evaluater.evaluateProgram(r.data.estree)
    );
  Ba(n, r.position);
}
function Iv(n, r, a) {
  const u = n.schema;
  let s = u;
  r.name === "svg" && u.space === "html" && (s = Oc, n.schema = s), n.ancestors.push(r);
  const f = r.name === null ? n.Fragment : wg(n, r.name, !0), d = n0(n, r), m = Rc(n, r);
  return kg(n, d, f, r), Nc(d, m), n.ancestors.pop(), n.schema = u, n.create(r, f, d, a);
}
function $v(n, r, a) {
  const u = {};
  return Nc(u, Rc(n, r)), n.create(r, n.Fragment, u, a);
}
function Wv(n, r) {
  return r.value;
}
function kg(n, r, a, u) {
  typeof a != "string" && a !== n.Fragment && n.passNode && (r.node = u);
}
function Nc(n, r) {
  if (r.length > 0) {
    const a = r.length > 1 ? r : r[0];
    a && (n.children = a);
  }
}
function Pv(n, r, a) {
  return u;
  function u(s, f, d, m) {
    const h = Array.isArray(d.children) ? a : r;
    return m ? h(f, d, m) : h(f, d);
  }
}
function e0(n, r) {
  return a;
  function a(u, s, f, d) {
    const m = Array.isArray(f.children), p = Dc(u);
    return r(
      s,
      f,
      d,
      m,
      {
        columnNumber: p ? p.column - 1 : void 0,
        fileName: n,
        lineNumber: p ? p.line : void 0
      },
      void 0
    );
  }
}
function t0(n, r) {
  const a = {};
  let u, s;
  for (s in r.properties)
    if (s !== "children" && Mc.call(r.properties, s)) {
      const f = l0(n, s, r.properties[s]);
      if (f) {
        const [d, m] = f;
        n.tableCellAlignToStyle && d === "align" && typeof m == "string" && Qv.has(r.tagName) ? u = m : a[d] = m;
      }
    }
  if (u) {
    const f = (
      /** @type {Style} */
      a.style || (a.style = {})
    );
    f[n.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = u;
  }
  return a;
}
function n0(n, r) {
  const a = {};
  for (const u of r.attributes)
    if (u.type === "mdxJsxExpressionAttribute")
      if (u.data && u.data.estree && n.evaluater) {
        const f = u.data.estree.body[0];
        f.type;
        const d = f.expression;
        d.type;
        const m = d.properties[0];
        m.type, Object.assign(
          a,
          n.evaluater.evaluateExpression(m.argument)
        );
      } else
        Ba(n, r.position);
    else {
      const s = u.name;
      let f;
      if (u.value && typeof u.value == "object")
        if (u.value.data && u.value.data.estree && n.evaluater) {
          const m = u.value.data.estree.body[0];
          m.type, f = n.evaluater.evaluateExpression(m.expression);
        } else
          Ba(n, r.position);
      else
        f = u.value === null ? !0 : u.value;
      a[s] = /** @type {Props[keyof Props]} */
      f;
    }
  return a;
}
function Rc(n, r) {
  const a = [];
  let u = -1;
  const s = n.passKeys ? /* @__PURE__ */ new Map() : Gv;
  for (; ++u < r.children.length; ) {
    const f = r.children[u];
    let d;
    if (n.passKeys) {
      const p = f.type === "element" ? f.tagName : f.type === "mdxJsxFlowElement" || f.type === "mdxJsxTextElement" ? f.name : void 0;
      if (p) {
        const h = s.get(p) || 0;
        d = p + "-" + h, s.set(p, h + 1);
      }
    }
    const m = Sg(n, f, d);
    m !== void 0 && a.push(m);
  }
  return a;
}
function l0(n, r, a) {
  const u = Ov(n.schema, r);
  if (!(a == null || typeof a == "number" && Number.isNaN(a))) {
    if (Array.isArray(a) && (a = u.commaSeparated ? bv(a) : Rv(a)), u.property === "style") {
      let s = typeof a == "object" ? a : i0(n, String(a));
      return n.stylePropertyNameCase === "css" && (s = a0(s)), ["style", s];
    }
    return [
      n.elementAttributeNameCase === "react" && u.space ? Av[u.property] || u.property : u.attribute,
      a
    ];
  }
}
function i0(n, r) {
  try {
    return qv(r, { reactCompat: !0 });
  } catch (a) {
    if (n.ignoreInvalidStyle)
      return {};
    const u = (
      /** @type {Error} */
      a
    ), s = new vt("Cannot parse `style` attribute", {
      ancestors: n.ancestors,
      cause: u,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw s.file = n.filePath || void 0, s.url = xg + "#cannot-parse-style-attribute", s;
  }
}
function wg(n, r, a) {
  let u;
  if (!a)
    u = { type: "Literal", value: r };
  else if (r.includes(".")) {
    const s = r.split(".");
    let f = -1, d;
    for (; ++f < s.length; ) {
      const m = rp(s[f]) ? { type: "Identifier", name: s[f] } : { type: "Literal", value: s[f] };
      d = d ? {
        type: "MemberExpression",
        object: d,
        property: m,
        computed: !!(f && m.type === "Literal"),
        optional: !1
      } : m;
    }
    u = d;
  } else
    u = rp(r) && !/^[a-z]/.test(r) ? { type: "Identifier", name: r } : { type: "Literal", value: r };
  if (u.type === "Literal") {
    const s = (
      /** @type {string | number} */
      u.value
    );
    return Mc.call(n.components, s) ? n.components[s] : s;
  }
  if (n.evaluater)
    return n.evaluater.evaluateExpression(u);
  Ba(n);
}
function Ba(n, r) {
  const a = new vt(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: n.ancestors,
      place: r,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw a.file = n.filePath || void 0, a.url = xg + "#cannot-handle-mdx-estrees-without-createevaluater", a;
}
function a0(n) {
  const r = {};
  let a;
  for (a in n)
    Mc.call(n, a) && (r[r0(a)] = n[a]);
  return r;
}
function r0(n) {
  let r = n.replace(Vv, u0);
  return r.slice(0, 3) === "ms-" && (r = "-" + r), r;
}
function u0(n) {
  return "-" + n.toLowerCase();
}
const Is = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, o0 = {};
function jc(n, r) {
  const a = o0, u = typeof a.includeImageAlt == "boolean" ? a.includeImageAlt : !0, s = typeof a.includeHtml == "boolean" ? a.includeHtml : !0;
  return Eg(n, u, s);
}
function Eg(n, r, a) {
  if (s0(n)) {
    if ("value" in n)
      return n.type === "html" && !a ? "" : n.value;
    if (r && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return gp(n.children, r, a);
  }
  return Array.isArray(n) ? gp(n, r, a) : "";
}
function gp(n, r, a) {
  const u = [];
  let s = -1;
  for (; ++s < n.length; )
    u[s] = Eg(n[s], r, a);
  return u.join("");
}
function s0(n) {
  return !!(n && typeof n == "object");
}
const yp = document.createElement("i");
function Lc(n) {
  const r = "&" + n + ";";
  yp.innerHTML = r;
  const a = yp.textContent;
  return a.charCodeAt(a.length - 1) === 59 && n !== "semi" || a === r ? !1 : a;
}
function Zt(n, r, a, u) {
  const s = n.length;
  let f = 0, d;
  if (r < 0 ? r = -r > s ? 0 : s + r : r = r > s ? s : r, a = a > 0 ? a : 0, u.length < 1e4)
    d = Array.from(u), d.unshift(r, a), n.splice(...d);
  else
    for (a && n.splice(r, a); f < u.length; )
      d = u.slice(f, f + 1e4), d.unshift(r, 0), n.splice(...d), f += 1e4, r += 1e4;
}
function ln(n, r) {
  return n.length > 0 ? (Zt(n, n.length, 0, r), n) : r;
}
const bp = {}.hasOwnProperty;
function zg(n) {
  const r = {};
  let a = -1;
  for (; ++a < n.length; )
    c0(r, n[a]);
  return r;
}
function c0(n, r) {
  let a;
  for (a in r) {
    const s = (bp.call(n, a) ? n[a] : void 0) || (n[a] = {}), f = r[a];
    let d;
    if (f)
      for (d in f) {
        bp.call(s, d) || (s[d] = []);
        const m = f[d];
        f0(
          // @ts-expect-error Looks like a list.
          s[d],
          Array.isArray(m) ? m : m ? [m] : []
        );
      }
  }
}
function f0(n, r) {
  let a = -1;
  const u = [];
  for (; ++a < r.length; )
    (r[a].add === "after" ? n : u).push(r[a]);
  Zt(n, 0, 0, u);
}
function Tg(n, r) {
  const a = Number.parseInt(n, r);
  return (
    // C0 except for HT, LF, FF, CR, space.
    a < 9 || a === 11 || a > 13 && a < 32 || // Control character (DEL) of C0, and C1 controls.
    a > 126 && a < 160 || // Lone high surrogates and low surrogates.
    a > 55295 && a < 57344 || // Noncharacters.
    a > 64975 && a < 65008 || /* eslint-disable no-bitwise */
    (a & 65535) === 65535 || (a & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    a > 1114111 ? "�" : String.fromCodePoint(a)
  );
}
function sn(n) {
  return n.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Et = ml(/[A-Za-z]/), bt = ml(/[\dA-Za-z]/), d0 = ml(/[#-'*+\--9=?A-Z^-~]/);
function gu(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const bc = ml(/\d/), h0 = ml(/[\dA-Fa-f]/), m0 = ml(/[!-/:-@[-`{-~]/);
function me(n) {
  return n !== null && n < -2;
}
function Fe(n) {
  return n !== null && (n < 0 || n === 32);
}
function Oe(n) {
  return n === -2 || n === -1 || n === 32;
}
const Su = ml(new RegExp("\\p{P}|\\p{S}", "u")), Hl = ml(/\s/);
function ml(n) {
  return r;
  function r(a) {
    return a !== null && a > -1 && n.test(String.fromCharCode(a));
  }
}
function Ri(n) {
  const r = [];
  let a = -1, u = 0, s = 0;
  for (; ++a < n.length; ) {
    const f = n.charCodeAt(a);
    let d = "";
    if (f === 37 && bt(n.charCodeAt(a + 1)) && bt(n.charCodeAt(a + 2)))
      s = 2;
    else if (f < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(f)) || (d = String.fromCharCode(f));
    else if (f > 55295 && f < 57344) {
      const m = n.charCodeAt(a + 1);
      f < 56320 && m > 56319 && m < 57344 ? (d = String.fromCharCode(f, m), s = 1) : d = "�";
    } else
      d = String.fromCharCode(f);
    d && (r.push(n.slice(u, a), encodeURIComponent(d)), u = a + s + 1, d = ""), s && (a += s, s = 0);
  }
  return r.join("") + n.slice(u);
}
function Re(n, r, a, u) {
  const s = u ? u - 1 : Number.POSITIVE_INFINITY;
  let f = 0;
  return d;
  function d(p) {
    return Oe(p) ? (n.enter(a), m(p)) : r(p);
  }
  function m(p) {
    return Oe(p) && f++ < s ? (n.consume(p), m) : (n.exit(a), r(p));
  }
}
const p0 = {
  tokenize: g0
};
function g0(n) {
  const r = n.attempt(this.parser.constructs.contentInitial, u, s);
  let a;
  return r;
  function u(m) {
    if (m === null) {
      n.consume(m);
      return;
    }
    return n.enter("lineEnding"), n.consume(m), n.exit("lineEnding"), Re(n, r, "linePrefix");
  }
  function s(m) {
    return n.enter("paragraph"), f(m);
  }
  function f(m) {
    const p = n.enter("chunkText", {
      contentType: "text",
      previous: a
    });
    return a && (a.next = p), a = p, d(m);
  }
  function d(m) {
    if (m === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(m);
      return;
    }
    return me(m) ? (n.consume(m), n.exit("chunkText"), f) : (n.consume(m), d);
  }
}
const y0 = {
  tokenize: b0
}, vp = {
  tokenize: v0
};
function b0(n) {
  const r = this, a = [];
  let u = 0, s, f, d;
  return m;
  function m(Y) {
    if (u < a.length) {
      const re = a[u];
      return r.containerState = re[1], n.attempt(re[0].continuation, p, h)(Y);
    }
    return h(Y);
  }
  function p(Y) {
    if (u++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, s && Z();
      const re = r.events.length;
      let fe = re, B;
      for (; fe--; )
        if (r.events[fe][0] === "exit" && r.events[fe][1].type === "chunkFlow") {
          B = r.events[fe][1].end;
          break;
        }
      D(u);
      let $ = re;
      for (; $ < r.events.length; )
        r.events[$][1].end = {
          ...B
        }, $++;
      return Zt(r.events, fe + 1, 0, r.events.slice(re)), r.events.length = $, h(Y);
    }
    return m(Y);
  }
  function h(Y) {
    if (u === a.length) {
      if (!s)
        return S(Y);
      if (s.currentConstruct && s.currentConstruct.concrete)
        return z(Y);
      r.interrupt = !!(s.currentConstruct && !s._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(vp, b, y)(Y);
  }
  function b(Y) {
    return s && Z(), D(u), S(Y);
  }
  function y(Y) {
    return r.parser.lazy[r.now().line] = u !== a.length, d = r.now().offset, z(Y);
  }
  function S(Y) {
    return r.containerState = {}, n.attempt(vp, v, z)(Y);
  }
  function v(Y) {
    return u++, a.push([r.currentConstruct, r.containerState]), S(Y);
  }
  function z(Y) {
    if (Y === null) {
      s && Z(), D(0), n.consume(Y);
      return;
    }
    return s = s || r.parser.flow(r.now()), n.enter("chunkFlow", {
      _tokenizer: s,
      contentType: "flow",
      previous: f
    }), j(Y);
  }
  function j(Y) {
    if (Y === null) {
      H(n.exit("chunkFlow"), !0), D(0), n.consume(Y);
      return;
    }
    return me(Y) ? (n.consume(Y), H(n.exit("chunkFlow")), u = 0, r.interrupt = void 0, m) : (n.consume(Y), j);
  }
  function H(Y, re) {
    const fe = r.sliceStream(Y);
    if (re && fe.push(null), Y.previous = f, f && (f.next = Y), f = Y, s.defineSkip(Y.start), s.write(fe), r.parser.lazy[Y.start.line]) {
      let B = s.events.length;
      for (; B--; )
        if (
          // The token starts before the line ending…
          s.events[B][1].start.offset < d && // …and either is not ended yet…
          (!s.events[B][1].end || // …or ends after it.
          s.events[B][1].end.offset > d)
        )
          return;
      const $ = r.events.length;
      let K = $, de, L;
      for (; K--; )
        if (r.events[K][0] === "exit" && r.events[K][1].type === "chunkFlow") {
          if (de) {
            L = r.events[K][1].end;
            break;
          }
          de = !0;
        }
      for (D(u), B = $; B < r.events.length; )
        r.events[B][1].end = {
          ...L
        }, B++;
      Zt(r.events, K + 1, 0, r.events.slice($)), r.events.length = B;
    }
  }
  function D(Y) {
    let re = a.length;
    for (; re-- > Y; ) {
      const fe = a[re];
      r.containerState = fe[1], fe[0].exit.call(r, n);
    }
    a.length = Y;
  }
  function Z() {
    s.write([null]), f = void 0, s = void 0, r.containerState._closeFlow = void 0;
  }
}
function v0(n, r, a) {
  return Re(n, n.attempt(this.parser.constructs.document, r, a), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Mi(n) {
  if (n === null || Fe(n) || Hl(n))
    return 1;
  if (Su(n))
    return 2;
}
function ku(n, r, a) {
  const u = [];
  let s = -1;
  for (; ++s < n.length; ) {
    const f = n[s].resolveAll;
    f && !u.includes(f) && (r = f(r, a), u.push(f));
  }
  return r;
}
const vc = {
  name: "attention",
  resolveAll: x0,
  tokenize: S0
};
function x0(n, r) {
  let a = -1, u, s, f, d, m, p, h, b;
  for (; ++a < n.length; )
    if (n[a][0] === "enter" && n[a][1].type === "attentionSequence" && n[a][1]._close) {
      for (u = a; u--; )
        if (n[u][0] === "exit" && n[u][1].type === "attentionSequence" && n[u][1]._open && // If the markers are the same:
        r.sliceSerialize(n[u][1]).charCodeAt(0) === r.sliceSerialize(n[a][1]).charCodeAt(0)) {
          if ((n[u][1]._close || n[a][1]._open) && (n[a][1].end.offset - n[a][1].start.offset) % 3 && !((n[u][1].end.offset - n[u][1].start.offset + n[a][1].end.offset - n[a][1].start.offset) % 3))
            continue;
          p = n[u][1].end.offset - n[u][1].start.offset > 1 && n[a][1].end.offset - n[a][1].start.offset > 1 ? 2 : 1;
          const y = {
            ...n[u][1].end
          }, S = {
            ...n[a][1].start
          };
          xp(y, -p), xp(S, p), d = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: y,
            end: {
              ...n[u][1].end
            }
          }, m = {
            type: p > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...n[a][1].start
            },
            end: S
          }, f = {
            type: p > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[u][1].end
            },
            end: {
              ...n[a][1].start
            }
          }, s = {
            type: p > 1 ? "strong" : "emphasis",
            start: {
              ...d.start
            },
            end: {
              ...m.end
            }
          }, n[u][1].end = {
            ...d.start
          }, n[a][1].start = {
            ...m.end
          }, h = [], n[u][1].end.offset - n[u][1].start.offset && (h = ln(h, [["enter", n[u][1], r], ["exit", n[u][1], r]])), h = ln(h, [["enter", s, r], ["enter", d, r], ["exit", d, r], ["enter", f, r]]), h = ln(h, ku(r.parser.constructs.insideSpan.null, n.slice(u + 1, a), r)), h = ln(h, [["exit", f, r], ["enter", m, r], ["exit", m, r], ["exit", s, r]]), n[a][1].end.offset - n[a][1].start.offset ? (b = 2, h = ln(h, [["enter", n[a][1], r], ["exit", n[a][1], r]])) : b = 0, Zt(n, u - 1, a - u + 3, h), a = u + h.length - b - 2;
          break;
        }
    }
  for (a = -1; ++a < n.length; )
    n[a][1].type === "attentionSequence" && (n[a][1].type = "data");
  return n;
}
function S0(n, r) {
  const a = this.parser.constructs.attentionMarkers.null, u = this.previous, s = Mi(u);
  let f;
  return d;
  function d(p) {
    return f = p, n.enter("attentionSequence"), m(p);
  }
  function m(p) {
    if (p === f)
      return n.consume(p), m;
    const h = n.exit("attentionSequence"), b = Mi(p), y = !b || b === 2 && s || a.includes(p), S = !s || s === 2 && b || a.includes(u);
    return h._open = !!(f === 42 ? y : y && (s || !S)), h._close = !!(f === 42 ? S : S && (b || !y)), r(p);
  }
}
function xp(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const k0 = {
  name: "autolink",
  tokenize: w0
};
function w0(n, r, a) {
  let u = 0;
  return s;
  function s(v) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), f;
  }
  function f(v) {
    return Et(v) ? (n.consume(v), d) : v === 64 ? a(v) : h(v);
  }
  function d(v) {
    return v === 43 || v === 45 || v === 46 || bt(v) ? (u = 1, m(v)) : h(v);
  }
  function m(v) {
    return v === 58 ? (n.consume(v), u = 0, p) : (v === 43 || v === 45 || v === 46 || bt(v)) && u++ < 32 ? (n.consume(v), m) : (u = 0, h(v));
  }
  function p(v) {
    return v === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.exit("autolink"), r) : v === null || v === 32 || v === 60 || gu(v) ? a(v) : (n.consume(v), p);
  }
  function h(v) {
    return v === 64 ? (n.consume(v), b) : d0(v) ? (n.consume(v), h) : a(v);
  }
  function b(v) {
    return bt(v) ? y(v) : a(v);
  }
  function y(v) {
    return v === 46 ? (n.consume(v), u = 0, b) : v === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.exit("autolink"), r) : S(v);
  }
  function S(v) {
    if ((v === 45 || bt(v)) && u++ < 63) {
      const z = v === 45 ? S : y;
      return n.consume(v), z;
    }
    return a(v);
  }
}
const Ya = {
  partial: !0,
  tokenize: E0
};
function E0(n, r, a) {
  return u;
  function u(f) {
    return Oe(f) ? Re(n, s, "linePrefix")(f) : s(f);
  }
  function s(f) {
    return f === null || me(f) ? r(f) : a(f);
  }
}
const Ag = {
  continuation: {
    tokenize: T0
  },
  exit: A0,
  name: "blockQuote",
  tokenize: z0
};
function z0(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    if (d === 62) {
      const m = u.containerState;
      return m.open || (n.enter("blockQuote", {
        _container: !0
      }), m.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(d), n.exit("blockQuoteMarker"), f;
    }
    return a(d);
  }
  function f(d) {
    return Oe(d) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(d), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(d));
  }
}
function T0(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return Oe(d) ? Re(n, f, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : f(d);
  }
  function f(d) {
    return n.attempt(Ag, r, a)(d);
  }
}
function A0(n) {
  n.exit("blockQuote");
}
const Cg = {
  name: "characterEscape",
  tokenize: C0
};
function C0(n, r, a) {
  return u;
  function u(f) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(f), n.exit("escapeMarker"), s;
  }
  function s(f) {
    return m0(f) ? (n.enter("characterEscapeValue"), n.consume(f), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : a(f);
  }
}
const _g = {
  name: "characterReference",
  tokenize: _0
};
function _0(n, r, a) {
  const u = this;
  let s = 0, f, d;
  return m;
  function m(y) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(y), n.exit("characterReferenceMarker"), p;
  }
  function p(y) {
    return y === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(y), n.exit("characterReferenceMarkerNumeric"), h) : (n.enter("characterReferenceValue"), f = 31, d = bt, b(y));
  }
  function h(y) {
    return y === 88 || y === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(y), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), f = 6, d = h0, b) : (n.enter("characterReferenceValue"), f = 7, d = bc, b(y));
  }
  function b(y) {
    if (y === 59 && s) {
      const S = n.exit("characterReferenceValue");
      return d === bt && !Lc(u.sliceSerialize(S)) ? a(y) : (n.enter("characterReferenceMarker"), n.consume(y), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return d(y) && s++ < f ? (n.consume(y), b) : a(y);
  }
}
const Sp = {
  partial: !0,
  tokenize: D0
}, kp = {
  concrete: !0,
  name: "codeFenced",
  tokenize: O0
};
function O0(n, r, a) {
  const u = this, s = {
    partial: !0,
    tokenize: fe
  };
  let f = 0, d = 0, m;
  return p;
  function p(B) {
    return h(B);
  }
  function h(B) {
    const $ = u.events[u.events.length - 1];
    return f = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, m = B, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), b(B);
  }
  function b(B) {
    return B === m ? (d++, n.consume(B), b) : d < 3 ? a(B) : (n.exit("codeFencedFenceSequence"), Oe(B) ? Re(n, y, "whitespace")(B) : y(B));
  }
  function y(B) {
    return B === null || me(B) ? (n.exit("codeFencedFence"), u.interrupt ? r(B) : n.check(Sp, j, re)(B)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), S(B));
  }
  function S(B) {
    return B === null || me(B) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), y(B)) : Oe(B) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), Re(n, v, "whitespace")(B)) : B === 96 && B === m ? a(B) : (n.consume(B), S);
  }
  function v(B) {
    return B === null || me(B) ? y(B) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), z(B));
  }
  function z(B) {
    return B === null || me(B) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), y(B)) : B === 96 && B === m ? a(B) : (n.consume(B), z);
  }
  function j(B) {
    return n.attempt(s, re, H)(B);
  }
  function H(B) {
    return n.enter("lineEnding"), n.consume(B), n.exit("lineEnding"), D;
  }
  function D(B) {
    return f > 0 && Oe(B) ? Re(n, Z, "linePrefix", f + 1)(B) : Z(B);
  }
  function Z(B) {
    return B === null || me(B) ? n.check(Sp, j, re)(B) : (n.enter("codeFlowValue"), Y(B));
  }
  function Y(B) {
    return B === null || me(B) ? (n.exit("codeFlowValue"), Z(B)) : (n.consume(B), Y);
  }
  function re(B) {
    return n.exit("codeFenced"), r(B);
  }
  function fe(B, $, K) {
    let de = 0;
    return L;
    function L(I) {
      return B.enter("lineEnding"), B.consume(I), B.exit("lineEnding"), te;
    }
    function te(I) {
      return B.enter("codeFencedFence"), Oe(I) ? Re(B, ee, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(I) : ee(I);
    }
    function ee(I) {
      return I === m ? (B.enter("codeFencedFenceSequence"), ze(I)) : K(I);
    }
    function ze(I) {
      return I === m ? (de++, B.consume(I), ze) : de >= d ? (B.exit("codeFencedFenceSequence"), Oe(I) ? Re(B, ue, "whitespace")(I) : ue(I)) : K(I);
    }
    function ue(I) {
      return I === null || me(I) ? (B.exit("codeFencedFence"), $(I)) : K(I);
    }
  }
}
function D0(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return d === null ? a(d) : (n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), f);
  }
  function f(d) {
    return u.parser.lazy[u.now().line] ? a(d) : r(d);
  }
}
const $s = {
  name: "codeIndented",
  tokenize: N0
}, M0 = {
  partial: !0,
  tokenize: R0
};
function N0(n, r, a) {
  const u = this;
  return s;
  function s(h) {
    return n.enter("codeIndented"), Re(n, f, "linePrefix", 5)(h);
  }
  function f(h) {
    const b = u.events[u.events.length - 1];
    return b && b[1].type === "linePrefix" && b[2].sliceSerialize(b[1], !0).length >= 4 ? d(h) : a(h);
  }
  function d(h) {
    return h === null ? p(h) : me(h) ? n.attempt(M0, d, p)(h) : (n.enter("codeFlowValue"), m(h));
  }
  function m(h) {
    return h === null || me(h) ? (n.exit("codeFlowValue"), d(h)) : (n.consume(h), m);
  }
  function p(h) {
    return n.exit("codeIndented"), r(h);
  }
}
function R0(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return u.parser.lazy[u.now().line] ? a(d) : me(d) ? (n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), s) : Re(n, f, "linePrefix", 5)(d);
  }
  function f(d) {
    const m = u.events[u.events.length - 1];
    return m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? r(d) : me(d) ? s(d) : a(d);
  }
}
const j0 = {
  name: "codeText",
  previous: U0,
  resolve: L0,
  tokenize: B0
};
function L0(n) {
  let r = n.length - 4, a = 3, u, s;
  if ((n[a][1].type === "lineEnding" || n[a][1].type === "space") && (n[r][1].type === "lineEnding" || n[r][1].type === "space")) {
    for (u = a; ++u < r; )
      if (n[u][1].type === "codeTextData") {
        n[a][1].type = "codeTextPadding", n[r][1].type = "codeTextPadding", a += 2, r -= 2;
        break;
      }
  }
  for (u = a - 1, r++; ++u <= r; )
    s === void 0 ? u !== r && n[u][1].type !== "lineEnding" && (s = u) : (u === r || n[u][1].type === "lineEnding") && (n[s][1].type = "codeTextData", u !== s + 2 && (n[s][1].end = n[u - 1][1].end, n.splice(s + 2, u - s - 2), r -= u - s - 2, u = s + 2), s = void 0);
  return n;
}
function U0(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function B0(n, r, a) {
  let u = 0, s, f;
  return d;
  function d(y) {
    return n.enter("codeText"), n.enter("codeTextSequence"), m(y);
  }
  function m(y) {
    return y === 96 ? (n.consume(y), u++, m) : (n.exit("codeTextSequence"), p(y));
  }
  function p(y) {
    return y === null ? a(y) : y === 32 ? (n.enter("space"), n.consume(y), n.exit("space"), p) : y === 96 ? (f = n.enter("codeTextSequence"), s = 0, b(y)) : me(y) ? (n.enter("lineEnding"), n.consume(y), n.exit("lineEnding"), p) : (n.enter("codeTextData"), h(y));
  }
  function h(y) {
    return y === null || y === 32 || y === 96 || me(y) ? (n.exit("codeTextData"), p(y)) : (n.consume(y), h);
  }
  function b(y) {
    return y === 96 ? (n.consume(y), s++, b) : s === u ? (n.exit("codeTextSequence"), n.exit("codeText"), r(y)) : (f.type = "codeTextData", h(y));
  }
}
class H0 {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(r) {
    this.left = r ? [...r] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(r) {
    if (r < 0 || r >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + r + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return r < this.left.length ? this.left[r] : this.right[this.right.length - r + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(r, a) {
    const u = a ?? Number.POSITIVE_INFINITY;
    return u < this.left.length ? this.left.slice(r, u) : r > this.left.length ? this.right.slice(this.right.length - u + this.left.length, this.right.length - r + this.left.length).reverse() : this.left.slice(r).concat(this.right.slice(this.right.length - u + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(r, a, u) {
    const s = a || 0;
    this.setCursor(Math.trunc(r));
    const f = this.right.splice(this.right.length - s, Number.POSITIVE_INFINITY);
    return u && Da(this.left, u), f.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(r) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(r);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(r) {
    this.setCursor(Number.POSITIVE_INFINITY), Da(this.left, r);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(r) {
    this.setCursor(0), this.right.push(r);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(r) {
    this.setCursor(0), Da(this.right, r.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(r) {
    if (!(r === this.left.length || r > this.left.length && this.right.length === 0 || r < 0 && this.left.length === 0))
      if (r < this.left.length) {
        const a = this.left.splice(r, Number.POSITIVE_INFINITY);
        Da(this.right, a.reverse());
      } else {
        const a = this.right.splice(this.left.length + this.right.length - r, Number.POSITIVE_INFINITY);
        Da(this.left, a.reverse());
      }
  }
}
function Da(n, r) {
  let a = 0;
  if (r.length < 1e4)
    n.push(...r);
  else
    for (; a < r.length; )
      n.push(...r.slice(a, a + 1e4)), a += 1e4;
}
function Og(n) {
  const r = {};
  let a = -1, u, s, f, d, m, p, h;
  const b = new H0(n);
  for (; ++a < b.length; ) {
    for (; a in r; )
      a = r[a];
    if (u = b.get(a), a && u[1].type === "chunkFlow" && b.get(a - 1)[1].type === "listItemPrefix" && (p = u[1]._tokenizer.events, f = 0, f < p.length && p[f][1].type === "lineEndingBlank" && (f += 2), f < p.length && p[f][1].type === "content"))
      for (; ++f < p.length && p[f][1].type !== "content"; )
        p[f][1].type === "chunkText" && (p[f][1]._isInFirstContentOfListItem = !0, f++);
    if (u[0] === "enter")
      u[1].contentType && (Object.assign(r, q0(b, a)), a = r[a], h = !0);
    else if (u[1]._container) {
      for (f = a, s = void 0; f--; )
        if (d = b.get(f), d[1].type === "lineEnding" || d[1].type === "lineEndingBlank")
          d[0] === "enter" && (s && (b.get(s)[1].type = "lineEndingBlank"), d[1].type = "lineEnding", s = f);
        else if (!(d[1].type === "linePrefix" || d[1].type === "listItemIndent")) break;
      s && (u[1].end = {
        ...b.get(s)[1].start
      }, m = b.slice(s, a), m.unshift(u), b.splice(s, a - s + 1, m));
    }
  }
  return Zt(n, 0, Number.POSITIVE_INFINITY, b.slice(0)), !h;
}
function q0(n, r) {
  const a = n.get(r)[1], u = n.get(r)[2];
  let s = r - 1;
  const f = [];
  let d = a._tokenizer;
  d || (d = u.parser[a.contentType](a.start), a._contentTypeTextTrailing && (d._contentTypeTextTrailing = !0));
  const m = d.events, p = [], h = {};
  let b, y, S = -1, v = a, z = 0, j = 0;
  const H = [j];
  for (; v; ) {
    for (; n.get(++s)[1] !== v; )
      ;
    f.push(s), v._tokenizer || (b = u.sliceStream(v), v.next || b.push(null), y && d.defineSkip(v.start), v._isInFirstContentOfListItem && (d._gfmTasklistFirstContentOfListItem = !0), d.write(b), v._isInFirstContentOfListItem && (d._gfmTasklistFirstContentOfListItem = void 0)), y = v, v = v.next;
  }
  for (v = a; ++S < m.length; )
    // Find a void token that includes a break.
    m[S][0] === "exit" && m[S - 1][0] === "enter" && m[S][1].type === m[S - 1][1].type && m[S][1].start.line !== m[S][1].end.line && (j = S + 1, H.push(j), v._tokenizer = void 0, v.previous = void 0, v = v.next);
  for (d.events = [], v ? (v._tokenizer = void 0, v.previous = void 0) : H.pop(), S = H.length; S--; ) {
    const D = m.slice(H[S], H[S + 1]), Z = f.pop();
    p.push([Z, Z + D.length - 1]), n.splice(Z, 2, D);
  }
  for (p.reverse(), S = -1; ++S < p.length; )
    h[z + p[S][0]] = z + p[S][1], z += p[S][1] - p[S][0] - 1;
  return h;
}
const Y0 = {
  resolve: V0,
  tokenize: X0
}, G0 = {
  partial: !0,
  tokenize: Q0
};
function V0(n) {
  return Og(n), n;
}
function X0(n, r) {
  let a;
  return u;
  function u(m) {
    return n.enter("content"), a = n.enter("chunkContent", {
      contentType: "content"
    }), s(m);
  }
  function s(m) {
    return m === null ? f(m) : me(m) ? n.check(G0, d, f)(m) : (n.consume(m), s);
  }
  function f(m) {
    return n.exit("chunkContent"), n.exit("content"), r(m);
  }
  function d(m) {
    return n.consume(m), n.exit("chunkContent"), a.next = n.enter("chunkContent", {
      contentType: "content",
      previous: a
    }), a = a.next, s;
  }
}
function Q0(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), Re(n, f, "linePrefix");
  }
  function f(d) {
    if (d === null || me(d))
      return a(d);
    const m = u.events[u.events.length - 1];
    return !u.parser.constructs.disable.null.includes("codeIndented") && m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? r(d) : n.interrupt(u.parser.constructs.flow, a, r)(d);
  }
}
function Dg(n, r, a, u, s, f, d, m, p) {
  const h = p || Number.POSITIVE_INFINITY;
  let b = 0;
  return y;
  function y(D) {
    return D === 60 ? (n.enter(u), n.enter(s), n.enter(f), n.consume(D), n.exit(f), S) : D === null || D === 32 || D === 41 || gu(D) ? a(D) : (n.enter(u), n.enter(d), n.enter(m), n.enter("chunkString", {
      contentType: "string"
    }), j(D));
  }
  function S(D) {
    return D === 62 ? (n.enter(f), n.consume(D), n.exit(f), n.exit(s), n.exit(u), r) : (n.enter(m), n.enter("chunkString", {
      contentType: "string"
    }), v(D));
  }
  function v(D) {
    return D === 62 ? (n.exit("chunkString"), n.exit(m), S(D)) : D === null || D === 60 || me(D) ? a(D) : (n.consume(D), D === 92 ? z : v);
  }
  function z(D) {
    return D === 60 || D === 62 || D === 92 ? (n.consume(D), v) : v(D);
  }
  function j(D) {
    return !b && (D === null || D === 41 || Fe(D)) ? (n.exit("chunkString"), n.exit(m), n.exit(d), n.exit(u), r(D)) : b < h && D === 40 ? (n.consume(D), b++, j) : D === 41 ? (n.consume(D), b--, j) : D === null || D === 32 || D === 40 || gu(D) ? a(D) : (n.consume(D), D === 92 ? H : j);
  }
  function H(D) {
    return D === 40 || D === 41 || D === 92 ? (n.consume(D), j) : j(D);
  }
}
function Mg(n, r, a, u, s, f) {
  const d = this;
  let m = 0, p;
  return h;
  function h(v) {
    return n.enter(u), n.enter(s), n.consume(v), n.exit(s), n.enter(f), b;
  }
  function b(v) {
    return m > 999 || v === null || v === 91 || v === 93 && !p || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    v === 94 && !m && "_hiddenFootnoteSupport" in d.parser.constructs ? a(v) : v === 93 ? (n.exit(f), n.enter(s), n.consume(v), n.exit(s), n.exit(u), r) : me(v) ? (n.enter("lineEnding"), n.consume(v), n.exit("lineEnding"), b) : (n.enter("chunkString", {
      contentType: "string"
    }), y(v));
  }
  function y(v) {
    return v === null || v === 91 || v === 93 || me(v) || m++ > 999 ? (n.exit("chunkString"), b(v)) : (n.consume(v), p || (p = !Oe(v)), v === 92 ? S : y);
  }
  function S(v) {
    return v === 91 || v === 92 || v === 93 ? (n.consume(v), m++, y) : y(v);
  }
}
function Ng(n, r, a, u, s, f) {
  let d;
  return m;
  function m(S) {
    return S === 34 || S === 39 || S === 40 ? (n.enter(u), n.enter(s), n.consume(S), n.exit(s), d = S === 40 ? 41 : S, p) : a(S);
  }
  function p(S) {
    return S === d ? (n.enter(s), n.consume(S), n.exit(s), n.exit(u), r) : (n.enter(f), h(S));
  }
  function h(S) {
    return S === d ? (n.exit(f), p(d)) : S === null ? a(S) : me(S) ? (n.enter("lineEnding"), n.consume(S), n.exit("lineEnding"), Re(n, h, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), b(S));
  }
  function b(S) {
    return S === d || S === null || me(S) ? (n.exit("chunkString"), h(S)) : (n.consume(S), S === 92 ? y : b);
  }
  function y(S) {
    return S === d || S === 92 ? (n.consume(S), b) : b(S);
  }
}
function ja(n, r) {
  let a;
  return u;
  function u(s) {
    return me(s) ? (n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), a = !0, u) : Oe(s) ? Re(n, u, a ? "linePrefix" : "lineSuffix")(s) : r(s);
  }
}
const Z0 = {
  name: "definition",
  tokenize: F0
}, K0 = {
  partial: !0,
  tokenize: J0
};
function F0(n, r, a) {
  const u = this;
  let s;
  return f;
  function f(v) {
    return n.enter("definition"), d(v);
  }
  function d(v) {
    return Mg.call(
      u,
      n,
      m,
      // Note: we don’t need to reset the way `markdown-rs` does.
      a,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(v);
  }
  function m(v) {
    return s = sn(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1)), v === 58 ? (n.enter("definitionMarker"), n.consume(v), n.exit("definitionMarker"), p) : a(v);
  }
  function p(v) {
    return Fe(v) ? ja(n, h)(v) : h(v);
  }
  function h(v) {
    return Dg(
      n,
      b,
      // Note: we don’t need to reset the way `markdown-rs` does.
      a,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(v);
  }
  function b(v) {
    return n.attempt(K0, y, y)(v);
  }
  function y(v) {
    return Oe(v) ? Re(n, S, "whitespace")(v) : S(v);
  }
  function S(v) {
    return v === null || me(v) ? (n.exit("definition"), u.parser.defined.push(s), r(v)) : a(v);
  }
}
function J0(n, r, a) {
  return u;
  function u(m) {
    return Fe(m) ? ja(n, s)(m) : a(m);
  }
  function s(m) {
    return Ng(n, f, a, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(m);
  }
  function f(m) {
    return Oe(m) ? Re(n, d, "whitespace")(m) : d(m);
  }
  function d(m) {
    return m === null || me(m) ? r(m) : a(m);
  }
}
const I0 = {
  name: "hardBreakEscape",
  tokenize: $0
};
function $0(n, r, a) {
  return u;
  function u(f) {
    return n.enter("hardBreakEscape"), n.consume(f), s;
  }
  function s(f) {
    return me(f) ? (n.exit("hardBreakEscape"), r(f)) : a(f);
  }
}
const W0 = {
  name: "headingAtx",
  resolve: P0,
  tokenize: ex
};
function P0(n, r) {
  let a = n.length - 2, u = 3, s, f;
  return n[u][1].type === "whitespace" && (u += 2), a - 2 > u && n[a][1].type === "whitespace" && (a -= 2), n[a][1].type === "atxHeadingSequence" && (u === a - 1 || a - 4 > u && n[a - 2][1].type === "whitespace") && (a -= u + 1 === a ? 2 : 4), a > u && (s = {
    type: "atxHeadingText",
    start: n[u][1].start,
    end: n[a][1].end
  }, f = {
    type: "chunkText",
    start: n[u][1].start,
    end: n[a][1].end,
    contentType: "text"
  }, Zt(n, u, a - u + 1, [["enter", s, r], ["enter", f, r], ["exit", f, r], ["exit", s, r]])), n;
}
function ex(n, r, a) {
  let u = 0;
  return s;
  function s(b) {
    return n.enter("atxHeading"), f(b);
  }
  function f(b) {
    return n.enter("atxHeadingSequence"), d(b);
  }
  function d(b) {
    return b === 35 && u++ < 6 ? (n.consume(b), d) : b === null || Fe(b) ? (n.exit("atxHeadingSequence"), m(b)) : a(b);
  }
  function m(b) {
    return b === 35 ? (n.enter("atxHeadingSequence"), p(b)) : b === null || me(b) ? (n.exit("atxHeading"), r(b)) : Oe(b) ? Re(n, m, "whitespace")(b) : (n.enter("atxHeadingText"), h(b));
  }
  function p(b) {
    return b === 35 ? (n.consume(b), p) : (n.exit("atxHeadingSequence"), m(b));
  }
  function h(b) {
    return b === null || b === 35 || Fe(b) ? (n.exit("atxHeadingText"), m(b)) : (n.consume(b), h);
  }
}
const tx = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], wp = ["pre", "script", "style", "textarea"], nx = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ax,
  tokenize: rx
}, lx = {
  partial: !0,
  tokenize: ox
}, ix = {
  partial: !0,
  tokenize: ux
};
function ax(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function rx(n, r, a) {
  const u = this;
  let s, f, d, m, p;
  return h;
  function h(w) {
    return b(w);
  }
  function b(w) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(w), y;
  }
  function y(w) {
    return w === 33 ? (n.consume(w), S) : w === 47 ? (n.consume(w), f = !0, j) : w === 63 ? (n.consume(w), s = 3, u.interrupt ? r : k) : Et(w) ? (n.consume(w), d = String.fromCharCode(w), H) : a(w);
  }
  function S(w) {
    return w === 45 ? (n.consume(w), s = 2, v) : w === 91 ? (n.consume(w), s = 5, m = 0, z) : Et(w) ? (n.consume(w), s = 4, u.interrupt ? r : k) : a(w);
  }
  function v(w) {
    return w === 45 ? (n.consume(w), u.interrupt ? r : k) : a(w);
  }
  function z(w) {
    const P = "CDATA[";
    return w === P.charCodeAt(m++) ? (n.consume(w), m === P.length ? u.interrupt ? r : ee : z) : a(w);
  }
  function j(w) {
    return Et(w) ? (n.consume(w), d = String.fromCharCode(w), H) : a(w);
  }
  function H(w) {
    if (w === null || w === 47 || w === 62 || Fe(w)) {
      const P = w === 47, ie = d.toLowerCase();
      return !P && !f && wp.includes(ie) ? (s = 1, u.interrupt ? r(w) : ee(w)) : tx.includes(d.toLowerCase()) ? (s = 6, P ? (n.consume(w), D) : u.interrupt ? r(w) : ee(w)) : (s = 7, u.interrupt && !u.parser.lazy[u.now().line] ? a(w) : f ? Z(w) : Y(w));
    }
    return w === 45 || bt(w) ? (n.consume(w), d += String.fromCharCode(w), H) : a(w);
  }
  function D(w) {
    return w === 62 ? (n.consume(w), u.interrupt ? r : ee) : a(w);
  }
  function Z(w) {
    return Oe(w) ? (n.consume(w), Z) : L(w);
  }
  function Y(w) {
    return w === 47 ? (n.consume(w), L) : w === 58 || w === 95 || Et(w) ? (n.consume(w), re) : Oe(w) ? (n.consume(w), Y) : L(w);
  }
  function re(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || bt(w) ? (n.consume(w), re) : fe(w);
  }
  function fe(w) {
    return w === 61 ? (n.consume(w), B) : Oe(w) ? (n.consume(w), fe) : Y(w);
  }
  function B(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? a(w) : w === 34 || w === 39 ? (n.consume(w), p = w, $) : Oe(w) ? (n.consume(w), B) : K(w);
  }
  function $(w) {
    return w === p ? (n.consume(w), p = null, de) : w === null || me(w) ? a(w) : (n.consume(w), $);
  }
  function K(w) {
    return w === null || w === 34 || w === 39 || w === 47 || w === 60 || w === 61 || w === 62 || w === 96 || Fe(w) ? fe(w) : (n.consume(w), K);
  }
  function de(w) {
    return w === 47 || w === 62 || Oe(w) ? Y(w) : a(w);
  }
  function L(w) {
    return w === 62 ? (n.consume(w), te) : a(w);
  }
  function te(w) {
    return w === null || me(w) ? ee(w) : Oe(w) ? (n.consume(w), te) : a(w);
  }
  function ee(w) {
    return w === 45 && s === 2 ? (n.consume(w), O) : w === 60 && s === 1 ? (n.consume(w), F) : w === 62 && s === 4 ? (n.consume(w), T) : w === 63 && s === 3 ? (n.consume(w), k) : w === 93 && s === 5 ? (n.consume(w), Se) : me(w) && (s === 6 || s === 7) ? (n.exit("htmlFlowData"), n.check(lx, G, ze)(w)) : w === null || me(w) ? (n.exit("htmlFlowData"), ze(w)) : (n.consume(w), ee);
  }
  function ze(w) {
    return n.check(ix, ue, G)(w);
  }
  function ue(w) {
    return n.enter("lineEnding"), n.consume(w), n.exit("lineEnding"), I;
  }
  function I(w) {
    return w === null || me(w) ? ze(w) : (n.enter("htmlFlowData"), ee(w));
  }
  function O(w) {
    return w === 45 ? (n.consume(w), k) : ee(w);
  }
  function F(w) {
    return w === 47 ? (n.consume(w), d = "", se) : ee(w);
  }
  function se(w) {
    if (w === 62) {
      const P = d.toLowerCase();
      return wp.includes(P) ? (n.consume(w), T) : ee(w);
    }
    return Et(w) && d.length < 8 ? (n.consume(w), d += String.fromCharCode(w), se) : ee(w);
  }
  function Se(w) {
    return w === 93 ? (n.consume(w), k) : ee(w);
  }
  function k(w) {
    return w === 62 ? (n.consume(w), T) : w === 45 && s === 2 ? (n.consume(w), k) : ee(w);
  }
  function T(w) {
    return w === null || me(w) ? (n.exit("htmlFlowData"), G(w)) : (n.consume(w), T);
  }
  function G(w) {
    return n.exit("htmlFlow"), r(w);
  }
}
function ux(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return me(d) ? (n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), f) : a(d);
  }
  function f(d) {
    return u.parser.lazy[u.now().line] ? a(d) : r(d);
  }
}
function ox(n, r, a) {
  return u;
  function u(s) {
    return n.enter("lineEnding"), n.consume(s), n.exit("lineEnding"), n.attempt(Ya, r, a);
  }
}
const sx = {
  name: "htmlText",
  tokenize: cx
};
function cx(n, r, a) {
  const u = this;
  let s, f, d;
  return m;
  function m(k) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(k), p;
  }
  function p(k) {
    return k === 33 ? (n.consume(k), h) : k === 47 ? (n.consume(k), fe) : k === 63 ? (n.consume(k), Y) : Et(k) ? (n.consume(k), K) : a(k);
  }
  function h(k) {
    return k === 45 ? (n.consume(k), b) : k === 91 ? (n.consume(k), f = 0, z) : Et(k) ? (n.consume(k), Z) : a(k);
  }
  function b(k) {
    return k === 45 ? (n.consume(k), v) : a(k);
  }
  function y(k) {
    return k === null ? a(k) : k === 45 ? (n.consume(k), S) : me(k) ? (d = y, F(k)) : (n.consume(k), y);
  }
  function S(k) {
    return k === 45 ? (n.consume(k), v) : y(k);
  }
  function v(k) {
    return k === 62 ? O(k) : k === 45 ? S(k) : y(k);
  }
  function z(k) {
    const T = "CDATA[";
    return k === T.charCodeAt(f++) ? (n.consume(k), f === T.length ? j : z) : a(k);
  }
  function j(k) {
    return k === null ? a(k) : k === 93 ? (n.consume(k), H) : me(k) ? (d = j, F(k)) : (n.consume(k), j);
  }
  function H(k) {
    return k === 93 ? (n.consume(k), D) : j(k);
  }
  function D(k) {
    return k === 62 ? O(k) : k === 93 ? (n.consume(k), D) : j(k);
  }
  function Z(k) {
    return k === null || k === 62 ? O(k) : me(k) ? (d = Z, F(k)) : (n.consume(k), Z);
  }
  function Y(k) {
    return k === null ? a(k) : k === 63 ? (n.consume(k), re) : me(k) ? (d = Y, F(k)) : (n.consume(k), Y);
  }
  function re(k) {
    return k === 62 ? O(k) : Y(k);
  }
  function fe(k) {
    return Et(k) ? (n.consume(k), B) : a(k);
  }
  function B(k) {
    return k === 45 || bt(k) ? (n.consume(k), B) : $(k);
  }
  function $(k) {
    return me(k) ? (d = $, F(k)) : Oe(k) ? (n.consume(k), $) : O(k);
  }
  function K(k) {
    return k === 45 || bt(k) ? (n.consume(k), K) : k === 47 || k === 62 || Fe(k) ? de(k) : a(k);
  }
  function de(k) {
    return k === 47 ? (n.consume(k), O) : k === 58 || k === 95 || Et(k) ? (n.consume(k), L) : me(k) ? (d = de, F(k)) : Oe(k) ? (n.consume(k), de) : O(k);
  }
  function L(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || bt(k) ? (n.consume(k), L) : te(k);
  }
  function te(k) {
    return k === 61 ? (n.consume(k), ee) : me(k) ? (d = te, F(k)) : Oe(k) ? (n.consume(k), te) : de(k);
  }
  function ee(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96 ? a(k) : k === 34 || k === 39 ? (n.consume(k), s = k, ze) : me(k) ? (d = ee, F(k)) : Oe(k) ? (n.consume(k), ee) : (n.consume(k), ue);
  }
  function ze(k) {
    return k === s ? (n.consume(k), s = void 0, I) : k === null ? a(k) : me(k) ? (d = ze, F(k)) : (n.consume(k), ze);
  }
  function ue(k) {
    return k === null || k === 34 || k === 39 || k === 60 || k === 61 || k === 96 ? a(k) : k === 47 || k === 62 || Fe(k) ? de(k) : (n.consume(k), ue);
  }
  function I(k) {
    return k === 47 || k === 62 || Fe(k) ? de(k) : a(k);
  }
  function O(k) {
    return k === 62 ? (n.consume(k), n.exit("htmlTextData"), n.exit("htmlText"), r) : a(k);
  }
  function F(k) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(k), n.exit("lineEnding"), se;
  }
  function se(k) {
    return Oe(k) ? Re(n, Se, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : Se(k);
  }
  function Se(k) {
    return n.enter("htmlTextData"), d(k);
  }
}
const Uc = {
  name: "labelEnd",
  resolveAll: mx,
  resolveTo: px,
  tokenize: gx
}, fx = {
  tokenize: yx
}, dx = {
  tokenize: bx
}, hx = {
  tokenize: vx
};
function mx(n) {
  let r = -1;
  const a = [];
  for (; ++r < n.length; ) {
    const u = n[r][1];
    if (a.push(n[r]), u.type === "labelImage" || u.type === "labelLink" || u.type === "labelEnd") {
      const s = u.type === "labelImage" ? 4 : 2;
      u.type = "data", r += s;
    }
  }
  return n.length !== a.length && Zt(n, 0, n.length, a), n;
}
function px(n, r) {
  let a = n.length, u = 0, s, f, d, m;
  for (; a--; )
    if (s = n[a][1], f) {
      if (s.type === "link" || s.type === "labelLink" && s._inactive)
        break;
      n[a][0] === "enter" && s.type === "labelLink" && (s._inactive = !0);
    } else if (d) {
      if (n[a][0] === "enter" && (s.type === "labelImage" || s.type === "labelLink") && !s._balanced && (f = a, s.type !== "labelLink")) {
        u = 2;
        break;
      }
    } else s.type === "labelEnd" && (d = a);
  const p = {
    type: n[f][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[f][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, h = {
    type: "label",
    start: {
      ...n[f][1].start
    },
    end: {
      ...n[d][1].end
    }
  }, b = {
    type: "labelText",
    start: {
      ...n[f + u + 2][1].end
    },
    end: {
      ...n[d - 2][1].start
    }
  };
  return m = [["enter", p, r], ["enter", h, r]], m = ln(m, n.slice(f + 1, f + u + 3)), m = ln(m, [["enter", b, r]]), m = ln(m, ku(r.parser.constructs.insideSpan.null, n.slice(f + u + 4, d - 3), r)), m = ln(m, [["exit", b, r], n[d - 2], n[d - 1], ["exit", h, r]]), m = ln(m, n.slice(d + 1)), m = ln(m, [["exit", p, r]]), Zt(n, f, n.length, m), n;
}
function gx(n, r, a) {
  const u = this;
  let s = u.events.length, f, d;
  for (; s--; )
    if ((u.events[s][1].type === "labelImage" || u.events[s][1].type === "labelLink") && !u.events[s][1]._balanced) {
      f = u.events[s][1];
      break;
    }
  return m;
  function m(S) {
    return f ? f._inactive ? y(S) : (d = u.parser.defined.includes(sn(u.sliceSerialize({
      start: f.end,
      end: u.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(S), n.exit("labelMarker"), n.exit("labelEnd"), p) : a(S);
  }
  function p(S) {
    return S === 40 ? n.attempt(fx, b, d ? b : y)(S) : S === 91 ? n.attempt(dx, b, d ? h : y)(S) : d ? b(S) : y(S);
  }
  function h(S) {
    return n.attempt(hx, b, y)(S);
  }
  function b(S) {
    return r(S);
  }
  function y(S) {
    return f._balanced = !0, a(S);
  }
}
function yx(n, r, a) {
  return u;
  function u(y) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(y), n.exit("resourceMarker"), s;
  }
  function s(y) {
    return Fe(y) ? ja(n, f)(y) : f(y);
  }
  function f(y) {
    return y === 41 ? b(y) : Dg(n, d, m, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(y);
  }
  function d(y) {
    return Fe(y) ? ja(n, p)(y) : b(y);
  }
  function m(y) {
    return a(y);
  }
  function p(y) {
    return y === 34 || y === 39 || y === 40 ? Ng(n, h, a, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(y) : b(y);
  }
  function h(y) {
    return Fe(y) ? ja(n, b)(y) : b(y);
  }
  function b(y) {
    return y === 41 ? (n.enter("resourceMarker"), n.consume(y), n.exit("resourceMarker"), n.exit("resource"), r) : a(y);
  }
}
function bx(n, r, a) {
  const u = this;
  return s;
  function s(m) {
    return Mg.call(u, n, f, d, "reference", "referenceMarker", "referenceString")(m);
  }
  function f(m) {
    return u.parser.defined.includes(sn(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1))) ? r(m) : a(m);
  }
  function d(m) {
    return a(m);
  }
}
function vx(n, r, a) {
  return u;
  function u(f) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(f), n.exit("referenceMarker"), s;
  }
  function s(f) {
    return f === 93 ? (n.enter("referenceMarker"), n.consume(f), n.exit("referenceMarker"), n.exit("reference"), r) : a(f);
  }
}
const xx = {
  name: "labelStartImage",
  resolveAll: Uc.resolveAll,
  tokenize: Sx
};
function Sx(n, r, a) {
  const u = this;
  return s;
  function s(m) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(m), n.exit("labelImageMarker"), f;
  }
  function f(m) {
    return m === 91 ? (n.enter("labelMarker"), n.consume(m), n.exit("labelMarker"), n.exit("labelImage"), d) : a(m);
  }
  function d(m) {
    return m === 94 && "_hiddenFootnoteSupport" in u.parser.constructs ? a(m) : r(m);
  }
}
const kx = {
  name: "labelStartLink",
  resolveAll: Uc.resolveAll,
  tokenize: wx
};
function wx(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(d), n.exit("labelMarker"), n.exit("labelLink"), f;
  }
  function f(d) {
    return d === 94 && "_hiddenFootnoteSupport" in u.parser.constructs ? a(d) : r(d);
  }
}
const Ws = {
  name: "lineEnding",
  tokenize: Ex
};
function Ex(n, r) {
  return a;
  function a(u) {
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), Re(n, r, "linePrefix");
  }
}
const pu = {
  name: "thematicBreak",
  tokenize: zx
};
function zx(n, r, a) {
  let u = 0, s;
  return f;
  function f(h) {
    return n.enter("thematicBreak"), d(h);
  }
  function d(h) {
    return s = h, m(h);
  }
  function m(h) {
    return h === s ? (n.enter("thematicBreakSequence"), p(h)) : u >= 3 && (h === null || me(h)) ? (n.exit("thematicBreak"), r(h)) : a(h);
  }
  function p(h) {
    return h === s ? (n.consume(h), u++, p) : (n.exit("thematicBreakSequence"), Oe(h) ? Re(n, m, "whitespace")(h) : m(h));
  }
}
const jt = {
  continuation: {
    tokenize: _x
  },
  exit: Dx,
  name: "list",
  tokenize: Cx
}, Tx = {
  partial: !0,
  tokenize: Mx
}, Ax = {
  partial: !0,
  tokenize: Ox
};
function Cx(n, r, a) {
  const u = this, s = u.events[u.events.length - 1];
  let f = s && s[1].type === "linePrefix" ? s[2].sliceSerialize(s[1], !0).length : 0, d = 0;
  return m;
  function m(v) {
    const z = u.containerState.type || (v === 42 || v === 43 || v === 45 ? "listUnordered" : "listOrdered");
    if (z === "listUnordered" ? !u.containerState.marker || v === u.containerState.marker : bc(v)) {
      if (u.containerState.type || (u.containerState.type = z, n.enter(z, {
        _container: !0
      })), z === "listUnordered")
        return n.enter("listItemPrefix"), v === 42 || v === 45 ? n.check(pu, a, h)(v) : h(v);
      if (!u.interrupt || v === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), p(v);
    }
    return a(v);
  }
  function p(v) {
    return bc(v) && ++d < 10 ? (n.consume(v), p) : (!u.interrupt || d < 2) && (u.containerState.marker ? v === u.containerState.marker : v === 41 || v === 46) ? (n.exit("listItemValue"), h(v)) : a(v);
  }
  function h(v) {
    return n.enter("listItemMarker"), n.consume(v), n.exit("listItemMarker"), u.containerState.marker = u.containerState.marker || v, n.check(
      Ya,
      // Can’t be empty when interrupting.
      u.interrupt ? a : b,
      n.attempt(Tx, S, y)
    );
  }
  function b(v) {
    return u.containerState.initialBlankLine = !0, f++, S(v);
  }
  function y(v) {
    return Oe(v) ? (n.enter("listItemPrefixWhitespace"), n.consume(v), n.exit("listItemPrefixWhitespace"), S) : a(v);
  }
  function S(v) {
    return u.containerState.size = f + u.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(v);
  }
}
function _x(n, r, a) {
  const u = this;
  return u.containerState._closeFlow = void 0, n.check(Ya, s, f);
  function s(m) {
    return u.containerState.furtherBlankLines = u.containerState.furtherBlankLines || u.containerState.initialBlankLine, Re(n, r, "listItemIndent", u.containerState.size + 1)(m);
  }
  function f(m) {
    return u.containerState.furtherBlankLines || !Oe(m) ? (u.containerState.furtherBlankLines = void 0, u.containerState.initialBlankLine = void 0, d(m)) : (u.containerState.furtherBlankLines = void 0, u.containerState.initialBlankLine = void 0, n.attempt(Ax, r, d)(m));
  }
  function d(m) {
    return u.containerState._closeFlow = !0, u.interrupt = void 0, Re(n, n.attempt(jt, r, a), "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m);
  }
}
function Ox(n, r, a) {
  const u = this;
  return Re(n, s, "listItemIndent", u.containerState.size + 1);
  function s(f) {
    const d = u.events[u.events.length - 1];
    return d && d[1].type === "listItemIndent" && d[2].sliceSerialize(d[1], !0).length === u.containerState.size ? r(f) : a(f);
  }
}
function Dx(n) {
  n.exit(this.containerState.type);
}
function Mx(n, r, a) {
  const u = this;
  return Re(n, s, "listItemPrefixWhitespace", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function s(f) {
    const d = u.events[u.events.length - 1];
    return !Oe(f) && d && d[1].type === "listItemPrefixWhitespace" ? r(f) : a(f);
  }
}
const Ep = {
  name: "setextUnderline",
  resolveTo: Nx,
  tokenize: Rx
};
function Nx(n, r) {
  let a = n.length, u, s, f;
  for (; a--; )
    if (n[a][0] === "enter") {
      if (n[a][1].type === "content") {
        u = a;
        break;
      }
      n[a][1].type === "paragraph" && (s = a);
    } else
      n[a][1].type === "content" && n.splice(a, 1), !f && n[a][1].type === "definition" && (f = a);
  const d = {
    type: "setextHeading",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[s][1].type = "setextHeadingText", f ? (n.splice(s, 0, ["enter", d, r]), n.splice(f + 1, 0, ["exit", n[u][1], r]), n[u][1].end = {
    ...n[f][1].end
  }) : n[u][1] = d, n.push(["exit", d, r]), n;
}
function Rx(n, r, a) {
  const u = this;
  let s;
  return f;
  function f(h) {
    let b = u.events.length, y;
    for (; b--; )
      if (u.events[b][1].type !== "lineEnding" && u.events[b][1].type !== "linePrefix" && u.events[b][1].type !== "content") {
        y = u.events[b][1].type === "paragraph";
        break;
      }
    return !u.parser.lazy[u.now().line] && (u.interrupt || y) ? (n.enter("setextHeadingLine"), s = h, d(h)) : a(h);
  }
  function d(h) {
    return n.enter("setextHeadingLineSequence"), m(h);
  }
  function m(h) {
    return h === s ? (n.consume(h), m) : (n.exit("setextHeadingLineSequence"), Oe(h) ? Re(n, p, "lineSuffix")(h) : p(h));
  }
  function p(h) {
    return h === null || me(h) ? (n.exit("setextHeadingLine"), r(h)) : a(h);
  }
}
const jx = {
  tokenize: Lx
};
function Lx(n) {
  const r = this, a = n.attempt(
    // Try to parse a blank line.
    Ya,
    u,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, s, Re(n, n.attempt(this.parser.constructs.flow, s, n.attempt(Y0, s)), "linePrefix"))
  );
  return a;
  function u(f) {
    if (f === null) {
      n.consume(f);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(f), n.exit("lineEndingBlank"), r.currentConstruct = void 0, a;
  }
  function s(f) {
    if (f === null) {
      n.consume(f);
      return;
    }
    return n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), r.currentConstruct = void 0, a;
  }
}
const Ux = {
  resolveAll: jg()
}, Bx = Rg("string"), Hx = Rg("text");
function Rg(n) {
  return {
    resolveAll: jg(n === "text" ? qx : void 0),
    tokenize: r
  };
  function r(a) {
    const u = this, s = this.parser.constructs[n], f = a.attempt(s, d, m);
    return d;
    function d(b) {
      return h(b) ? f(b) : m(b);
    }
    function m(b) {
      if (b === null) {
        a.consume(b);
        return;
      }
      return a.enter("data"), a.consume(b), p;
    }
    function p(b) {
      return h(b) ? (a.exit("data"), f(b)) : (a.consume(b), p);
    }
    function h(b) {
      if (b === null)
        return !0;
      const y = s[b];
      let S = -1;
      if (y)
        for (; ++S < y.length; ) {
          const v = y[S];
          if (!v.previous || v.previous.call(u, u.previous))
            return !0;
        }
      return !1;
    }
  }
}
function jg(n) {
  return r;
  function r(a, u) {
    let s = -1, f;
    for (; ++s <= a.length; )
      f === void 0 ? a[s] && a[s][1].type === "data" && (f = s, s++) : (!a[s] || a[s][1].type !== "data") && (s !== f + 2 && (a[f][1].end = a[s - 1][1].end, a.splice(f + 2, s - f - 2), s = f + 2), f = void 0);
    return n ? n(a, u) : a;
  }
}
function qx(n, r) {
  let a = 0;
  for (; ++a <= n.length; )
    if ((a === n.length || n[a][1].type === "lineEnding") && n[a - 1][1].type === "data") {
      const u = n[a - 1][1], s = r.sliceStream(u);
      let f = s.length, d = -1, m = 0, p;
      for (; f--; ) {
        const h = s[f];
        if (typeof h == "string") {
          for (d = h.length; h.charCodeAt(d - 1) === 32; )
            m++, d--;
          if (d) break;
          d = -1;
        } else if (h === -2)
          p = !0, m++;
        else if (h !== -1) {
          f++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && a === n.length && (m = 0), m) {
        const h = {
          type: a === n.length || p || m < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: f ? d : u.start._bufferIndex + d,
            _index: u.start._index + f,
            line: u.end.line,
            column: u.end.column - m,
            offset: u.end.offset - m
          },
          end: {
            ...u.end
          }
        };
        u.end = {
          ...h.start
        }, u.start.offset === u.end.offset ? Object.assign(u, h) : (n.splice(a, 0, ["enter", h, r], ["exit", h, r]), a += 2);
      }
      a++;
    }
  return n;
}
const Yx = {
  42: jt,
  43: jt,
  45: jt,
  48: jt,
  49: jt,
  50: jt,
  51: jt,
  52: jt,
  53: jt,
  54: jt,
  55: jt,
  56: jt,
  57: jt,
  62: Ag
}, Gx = {
  91: Z0
}, Vx = {
  [-2]: $s,
  [-1]: $s,
  32: $s
}, Xx = {
  35: W0,
  42: pu,
  45: [Ep, pu],
  60: nx,
  61: Ep,
  95: pu,
  96: kp,
  126: kp
}, Qx = {
  38: _g,
  92: Cg
}, Zx = {
  [-5]: Ws,
  [-4]: Ws,
  [-3]: Ws,
  33: xx,
  38: _g,
  42: vc,
  60: [k0, sx],
  91: kx,
  92: [I0, Cg],
  93: Uc,
  95: vc,
  96: j0
}, Kx = {
  null: [vc, Ux]
}, Fx = {
  null: [42, 95]
}, Jx = {
  null: []
}, Ix = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Fx,
  contentInitial: Gx,
  disable: Jx,
  document: Yx,
  flow: Xx,
  flowInitial: Vx,
  insideSpan: Kx,
  string: Qx,
  text: Zx
}, Symbol.toStringTag, { value: "Module" }));
function $x(n, r, a) {
  let u = {
    _bufferIndex: -1,
    _index: 0,
    line: a && a.line || 1,
    column: a && a.column || 1,
    offset: a && a.offset || 0
  };
  const s = {}, f = [];
  let d = [], m = [];
  const p = {
    attempt: $(fe),
    check: $(B),
    consume: Z,
    enter: Y,
    exit: re,
    interrupt: $(B, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: j,
    events: [],
    now: z,
    parser: n,
    previous: null,
    sliceSerialize: S,
    sliceStream: v,
    write: y
  };
  let b = r.tokenize.call(h, p);
  return r.resolveAll && f.push(r), h;
  function y(te) {
    return d = ln(d, te), H(), d[d.length - 1] !== null ? [] : (K(r, 0), h.events = ku(f, h.events, h), h.events);
  }
  function S(te, ee) {
    return Px(v(te), ee);
  }
  function v(te) {
    return Wx(d, te);
  }
  function z() {
    const {
      _bufferIndex: te,
      _index: ee,
      line: ze,
      column: ue,
      offset: I
    } = u;
    return {
      _bufferIndex: te,
      _index: ee,
      line: ze,
      column: ue,
      offset: I
    };
  }
  function j(te) {
    s[te.line] = te.column, L();
  }
  function H() {
    let te;
    for (; u._index < d.length; ) {
      const ee = d[u._index];
      if (typeof ee == "string")
        for (te = u._index, u._bufferIndex < 0 && (u._bufferIndex = 0); u._index === te && u._bufferIndex < ee.length; )
          D(ee.charCodeAt(u._bufferIndex));
      else
        D(ee);
    }
  }
  function D(te) {
    b = b(te);
  }
  function Z(te) {
    me(te) ? (u.line++, u.column = 1, u.offset += te === -3 ? 2 : 1, L()) : te !== -1 && (u.column++, u.offset++), u._bufferIndex < 0 ? u._index++ : (u._bufferIndex++, u._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    d[u._index].length && (u._bufferIndex = -1, u._index++)), h.previous = te;
  }
  function Y(te, ee) {
    const ze = ee || {};
    return ze.type = te, ze.start = z(), h.events.push(["enter", ze, h]), m.push(ze), ze;
  }
  function re(te) {
    const ee = m.pop();
    return ee.end = z(), h.events.push(["exit", ee, h]), ee;
  }
  function fe(te, ee) {
    K(te, ee.from);
  }
  function B(te, ee) {
    ee.restore();
  }
  function $(te, ee) {
    return ze;
    function ze(ue, I, O) {
      let F, se, Se, k;
      return Array.isArray(ue) ? (
        /* c8 ignore next 1 */
        G(ue)
      ) : "tokenize" in ue ? (
        // Looks like a construct.
        G([
          /** @type {Construct} */
          ue
        ])
      ) : T(ue);
      function T(ne) {
        return we;
        function we(Xe) {
          const be = Xe !== null && ne[Xe], xt = Xe !== null && ne.null, zt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(be) ? be : be ? [be] : [],
            ...Array.isArray(xt) ? xt : xt ? [xt] : []
          ];
          return G(zt)(Xe);
        }
      }
      function G(ne) {
        return F = ne, se = 0, ne.length === 0 ? O : w(ne[se]);
      }
      function w(ne) {
        return we;
        function we(Xe) {
          return k = de(), Se = ne, ne.partial || (h.currentConstruct = ne), ne.name && h.parser.constructs.disable.null.includes(ne.name) ? ie() : ne.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            ee ? Object.assign(Object.create(h), ee) : h,
            p,
            P,
            ie
          )(Xe);
        }
      }
      function P(ne) {
        return te(Se, k), I;
      }
      function ie(ne) {
        return k.restore(), ++se < F.length ? w(F[se]) : O;
      }
    }
  }
  function K(te, ee) {
    te.resolveAll && !f.includes(te) && f.push(te), te.resolve && Zt(h.events, ee, h.events.length - ee, te.resolve(h.events.slice(ee), h)), te.resolveTo && (h.events = te.resolveTo(h.events, h));
  }
  function de() {
    const te = z(), ee = h.previous, ze = h.currentConstruct, ue = h.events.length, I = Array.from(m);
    return {
      from: ue,
      restore: O
    };
    function O() {
      u = te, h.previous = ee, h.currentConstruct = ze, h.events.length = ue, m = I, L();
    }
  }
  function L() {
    u.line in s && u.column < 2 && (u.column = s[u.line], u.offset += s[u.line] - 1);
  }
}
function Wx(n, r) {
  const a = r.start._index, u = r.start._bufferIndex, s = r.end._index, f = r.end._bufferIndex;
  let d;
  if (a === s)
    d = [n[a].slice(u, f)];
  else {
    if (d = n.slice(a, s), u > -1) {
      const m = d[0];
      typeof m == "string" ? d[0] = m.slice(u) : d.shift();
    }
    f > 0 && d.push(n[s].slice(0, f));
  }
  return d;
}
function Px(n, r) {
  let a = -1;
  const u = [];
  let s;
  for (; ++a < n.length; ) {
    const f = n[a];
    let d;
    if (typeof f == "string")
      d = f;
    else switch (f) {
      case -5: {
        d = "\r";
        break;
      }
      case -4: {
        d = `
`;
        break;
      }
      case -3: {
        d = `\r
`;
        break;
      }
      case -2: {
        d = r ? " " : "	";
        break;
      }
      case -1: {
        if (!r && s) continue;
        d = " ";
        break;
      }
      default:
        d = String.fromCharCode(f);
    }
    s = f === -2, u.push(d);
  }
  return u.join("");
}
function eS(n) {
  const u = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      zg([Ix, ...(n || {}).extensions || []])
    ),
    content: s(p0),
    defined: [],
    document: s(y0),
    flow: s(jx),
    lazy: {},
    string: s(Bx),
    text: s(Hx)
  };
  return u;
  function s(f) {
    return d;
    function d(m) {
      return $x(u, f, m);
    }
  }
}
function tS(n) {
  for (; !Og(n); )
    ;
  return n;
}
const zp = /[\0\t\n\r]/g;
function nS() {
  let n = 1, r = "", a = !0, u;
  return s;
  function s(f, d, m) {
    const p = [];
    let h, b, y, S, v;
    for (f = r + (typeof f == "string" ? f.toString() : new TextDecoder(d || void 0).decode(f)), y = 0, r = "", a && (f.charCodeAt(0) === 65279 && y++, a = void 0); y < f.length; ) {
      if (zp.lastIndex = y, h = zp.exec(f), S = h && h.index !== void 0 ? h.index : f.length, v = f.charCodeAt(S), !h) {
        r = f.slice(y);
        break;
      }
      if (v === 10 && y === S && u)
        p.push(-3), u = void 0;
      else
        switch (u && (p.push(-5), u = void 0), y < S && (p.push(f.slice(y, S)), n += S - y), v) {
          case 0: {
            p.push(65533), n++;
            break;
          }
          case 9: {
            for (b = Math.ceil(n / 4) * 4, p.push(-2); n++ < b; ) p.push(-1);
            break;
          }
          case 10: {
            p.push(-4), n = 1;
            break;
          }
          default:
            u = !0, n = 1;
        }
      y = S + 1;
    }
    return m && (u && p.push(-5), r && p.push(r), p.push(null)), p;
  }
}
const lS = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function iS(n) {
  return n.replace(lS, aS);
}
function aS(n, r, a) {
  if (r)
    return r;
  if (a.charCodeAt(0) === 35) {
    const s = a.charCodeAt(1), f = s === 120 || s === 88;
    return Tg(a.slice(f ? 2 : 1), f ? 16 : 10);
  }
  return Lc(a) || n;
}
const Lg = {}.hasOwnProperty;
function rS(n, r, a) {
  return r && typeof r == "object" && (a = r, r = void 0), uS(a)(tS(eS(a).document().write(nS()(n, r, !0))));
}
function uS(n) {
  const r = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: f(Xl),
      autolinkProtocol: de,
      autolinkEmail: de,
      atxHeading: f(Gl),
      blockQuote: f(xt),
      characterEscape: de,
      characterReference: de,
      codeFenced: f(zt),
      codeFencedFenceInfo: d,
      codeFencedFenceMeta: d,
      codeIndented: f(zt, d),
      codeText: f(cn, d),
      codeTextData: de,
      data: de,
      codeFlowValue: de,
      definition: f(qn),
      definitionDestinationString: d,
      definitionLabelString: d,
      definitionTitleString: d,
      emphasis: f(Tt),
      hardBreakEscape: f(Vl),
      hardBreakTrailing: f(Vl),
      htmlFlow: f(Va, d),
      htmlFlowData: de,
      htmlText: f(Va, d),
      htmlTextData: de,
      image: f(Xa),
      label: d,
      link: f(Xl),
      listItem: f(ji),
      listItemValue: S,
      listOrdered: f(Ql, y),
      listUnordered: f(Ql),
      paragraph: f(Tu),
      reference: w,
      referenceString: d,
      resourceDestinationString: d,
      resourceTitleString: d,
      setextHeading: f(Gl),
      strong: f(Au),
      thematicBreak: f(Cu)
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: fe,
      autolink: p(),
      autolinkEmail: be,
      autolinkProtocol: Xe,
      blockQuote: p(),
      characterEscapeValue: L,
      characterReferenceMarkerHexadecimal: ie,
      characterReferenceMarkerNumeric: ie,
      characterReferenceValue: ne,
      characterReference: we,
      codeFenced: p(H),
      codeFencedFence: j,
      codeFencedFenceInfo: v,
      codeFencedFenceMeta: z,
      codeFlowValue: L,
      codeIndented: p(D),
      codeText: p(I),
      codeTextData: L,
      data: L,
      definition: p(),
      definitionDestinationString: re,
      definitionLabelString: Z,
      definitionTitleString: Y,
      emphasis: p(),
      hardBreakEscape: p(ee),
      hardBreakTrailing: p(ee),
      htmlFlow: p(ze),
      htmlFlowData: L,
      htmlText: p(ue),
      htmlTextData: L,
      image: p(F),
      label: Se,
      labelText: se,
      lineEnding: te,
      link: p(O),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: P,
      resourceDestinationString: k,
      resourceTitleString: T,
      resource: G,
      setextHeading: p(K),
      setextHeadingLineSequence: $,
      setextHeadingText: B,
      strong: p(),
      thematicBreak: p()
    }
  };
  Ug(r, (n || {}).mdastExtensions || []);
  const a = {};
  return u;
  function u(V) {
    let W = {
      type: "root",
      children: []
    };
    const ge = {
      stack: [W],
      tokenStack: [],
      config: r,
      enter: m,
      exit: h,
      buffer: d,
      resume: b,
      data: a
    }, Ae = [];
    let Be = -1;
    for (; ++Be < V.length; )
      if (V[Be][1].type === "listOrdered" || V[Be][1].type === "listUnordered")
        if (V[Be][0] === "enter")
          Ae.push(Be);
        else {
          const Ut = Ae.pop();
          Be = s(V, Ut, Be);
        }
    for (Be = -1; ++Be < V.length; ) {
      const Ut = r[V[Be][0]];
      Lg.call(Ut, V[Be][1].type) && Ut[V[Be][1].type].call(Object.assign({
        sliceSerialize: V[Be][2].sliceSerialize
      }, ge), V[Be][1]);
    }
    if (ge.tokenStack.length > 0) {
      const Ut = ge.tokenStack[ge.tokenStack.length - 1];
      (Ut[1] || Tp).call(ge, void 0, Ut[0]);
    }
    for (W.position = {
      start: dl(V.length > 0 ? V[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: dl(V.length > 0 ? V[V.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Be = -1; ++Be < r.transforms.length; )
      W = r.transforms[Be](W) || W;
    return W;
  }
  function s(V, W, ge) {
    let Ae = W - 1, Be = -1, Ut = !1, bn, kt, ut, At;
    for (; ++Ae <= ge; ) {
      const Qe = V[Ae];
      switch (Qe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Qe[0] === "enter" ? Be++ : Be--, At = void 0;
          break;
        }
        case "lineEndingBlank": {
          Qe[0] === "enter" && (bn && !At && !Be && !ut && (ut = Ae), At = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          At = void 0;
      }
      if (!Be && Qe[0] === "enter" && Qe[1].type === "listItemPrefix" || Be === -1 && Qe[0] === "exit" && (Qe[1].type === "listUnordered" || Qe[1].type === "listOrdered")) {
        if (bn) {
          let Yn = Ae;
          for (kt = void 0; Yn--; ) {
            const an = V[Yn];
            if (an[1].type === "lineEnding" || an[1].type === "lineEndingBlank") {
              if (an[0] === "exit") continue;
              kt && (V[kt][1].type = "lineEndingBlank", Ut = !0), an[1].type = "lineEnding", kt = Yn;
            } else if (!(an[1].type === "linePrefix" || an[1].type === "blockQuotePrefix" || an[1].type === "blockQuotePrefixWhitespace" || an[1].type === "blockQuoteMarker" || an[1].type === "listItemIndent")) break;
          }
          ut && (!kt || ut < kt) && (bn._spread = !0), bn.end = Object.assign({}, kt ? V[kt][1].start : Qe[1].end), V.splice(kt || Ae, 0, ["exit", bn, Qe[2]]), Ae++, ge++;
        }
        if (Qe[1].type === "listItemPrefix") {
          const Yn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Qe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          bn = Yn, V.splice(Ae, 0, ["enter", Yn, Qe[2]]), Ae++, ge++, ut = void 0, At = !0;
        }
      }
    }
    return V[W][1]._spread = Ut, ge;
  }
  function f(V, W) {
    return ge;
    function ge(Ae) {
      m.call(this, V(Ae), Ae), W && W.call(this, Ae);
    }
  }
  function d() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function m(V, W, ge) {
    this.stack[this.stack.length - 1].children.push(V), this.stack.push(V), this.tokenStack.push([W, ge || void 0]), V.position = {
      start: dl(W.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function p(V) {
    return W;
    function W(ge) {
      V && V.call(this, ge), h.call(this, ge);
    }
  }
  function h(V, W) {
    const ge = this.stack.pop(), Ae = this.tokenStack.pop();
    if (Ae)
      Ae[0].type !== V.type && (W ? W.call(this, V, Ae[0]) : (Ae[1] || Tp).call(this, V, Ae[0]));
    else throw new Error("Cannot close `" + V.type + "` (" + Ra({
      start: V.start,
      end: V.end
    }) + "): it’s not open");
    ge.position.end = dl(V.end);
  }
  function b() {
    return jc(this.stack.pop());
  }
  function y() {
    this.data.expectingFirstListItemValue = !0;
  }
  function S(V) {
    if (this.data.expectingFirstListItemValue) {
      const W = this.stack[this.stack.length - 2];
      W.start = Number.parseInt(this.sliceSerialize(V), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function v() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.lang = V;
  }
  function z() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.meta = V;
  }
  function j() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function H() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function D() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V.replace(/(\r?\n|\r)$/g, "");
  }
  function Z(V) {
    const W = this.resume(), ge = this.stack[this.stack.length - 1];
    ge.label = W, ge.identifier = sn(this.sliceSerialize(V)).toLowerCase();
  }
  function Y() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.title = V;
  }
  function re() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.url = V;
  }
  function fe(V) {
    const W = this.stack[this.stack.length - 1];
    if (!W.depth) {
      const ge = this.sliceSerialize(V).length;
      W.depth = ge;
    }
  }
  function B() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(V) {
    const W = this.stack[this.stack.length - 1];
    W.depth = this.sliceSerialize(V).codePointAt(0) === 61 ? 1 : 2;
  }
  function K() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function de(V) {
    const ge = this.stack[this.stack.length - 1].children;
    let Ae = ge[ge.length - 1];
    (!Ae || Ae.type !== "text") && (Ae = St(), Ae.position = {
      start: dl(V.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, ge.push(Ae)), this.stack.push(Ae);
  }
  function L(V) {
    const W = this.stack.pop();
    W.value += this.sliceSerialize(V), W.position.end = dl(V.end);
  }
  function te(V) {
    const W = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const ge = W.children[W.children.length - 1];
      ge.position.end = dl(V.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && r.canContainEols.includes(W.type) && (de.call(this, V), L.call(this, V));
  }
  function ee() {
    this.data.atHardBreak = !0;
  }
  function ze() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V;
  }
  function ue() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V;
  }
  function I() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V;
  }
  function O() {
    const V = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const W = this.data.referenceType || "shortcut";
      V.type += "Reference", V.referenceType = W, delete V.url, delete V.title;
    } else
      delete V.identifier, delete V.label;
    this.data.referenceType = void 0;
  }
  function F() {
    const V = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const W = this.data.referenceType || "shortcut";
      V.type += "Reference", V.referenceType = W, delete V.url, delete V.title;
    } else
      delete V.identifier, delete V.label;
    this.data.referenceType = void 0;
  }
  function se(V) {
    const W = this.sliceSerialize(V), ge = this.stack[this.stack.length - 2];
    ge.label = iS(W), ge.identifier = sn(W).toLowerCase();
  }
  function Se() {
    const V = this.stack[this.stack.length - 1], W = this.resume(), ge = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, ge.type === "link") {
      const Ae = V.children;
      ge.children = Ae;
    } else
      ge.alt = W;
  }
  function k() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.url = V;
  }
  function T() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.title = V;
  }
  function G() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function P(V) {
    const W = this.resume(), ge = this.stack[this.stack.length - 1];
    ge.label = W, ge.identifier = sn(this.sliceSerialize(V)).toLowerCase(), this.data.referenceType = "full";
  }
  function ie(V) {
    this.data.characterReferenceType = V.type;
  }
  function ne(V) {
    const W = this.sliceSerialize(V), ge = this.data.characterReferenceType;
    let Ae;
    ge ? (Ae = Tg(W, ge === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Ae = Lc(W);
    const Be = this.stack[this.stack.length - 1];
    Be.value += Ae;
  }
  function we(V) {
    const W = this.stack.pop();
    W.position.end = dl(V.end);
  }
  function Xe(V) {
    L.call(this, V);
    const W = this.stack[this.stack.length - 1];
    W.url = this.sliceSerialize(V);
  }
  function be(V) {
    L.call(this, V);
    const W = this.stack[this.stack.length - 1];
    W.url = "mailto:" + this.sliceSerialize(V);
  }
  function xt() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function zt() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function cn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function qn() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Tt() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Gl() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Vl() {
    return {
      type: "break"
    };
  }
  function Va() {
    return {
      type: "html",
      value: ""
    };
  }
  function Xa() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Xl() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ql(V) {
    return {
      type: "list",
      ordered: V.type === "listOrdered",
      start: null,
      spread: V._spread,
      children: []
    };
  }
  function ji(V) {
    return {
      type: "listItem",
      spread: V._spread,
      checked: null,
      children: []
    };
  }
  function Tu() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Au() {
    return {
      type: "strong",
      children: []
    };
  }
  function St() {
    return {
      type: "text",
      value: ""
    };
  }
  function Cu() {
    return {
      type: "thematicBreak"
    };
  }
}
function dl(n) {
  return {
    line: n.line,
    column: n.column,
    offset: n.offset
  };
}
function Ug(n, r) {
  let a = -1;
  for (; ++a < r.length; ) {
    const u = r[a];
    Array.isArray(u) ? Ug(n, u) : oS(n, u);
  }
}
function oS(n, r) {
  let a;
  for (a in r)
    if (Lg.call(r, a))
      switch (a) {
        case "canContainEols": {
          const u = r[a];
          u && n[a].push(...u);
          break;
        }
        case "transforms": {
          const u = r[a];
          u && n[a].push(...u);
          break;
        }
        case "enter":
        case "exit": {
          const u = r[a];
          u && Object.assign(n[a], u);
          break;
        }
      }
}
function Tp(n, r) {
  throw n ? new Error("Cannot close `" + n.type + "` (" + Ra({
    start: n.start,
    end: n.end
  }) + "): a different token (`" + r.type + "`, " + Ra({
    start: r.start,
    end: r.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + r.type + "`, " + Ra({
    start: r.start,
    end: r.end
  }) + ") is still open");
}
function sS(n) {
  const r = this;
  r.parser = a;
  function a(u) {
    return rS(u, {
      ...r.data("settings"),
      ...n,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: r.data("micromarkExtensions") || [],
      mdastExtensions: r.data("fromMarkdownExtensions") || []
    });
  }
}
function cS(n, r) {
  const a = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: n.wrap(n.all(r), !0)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function fS(n, r) {
  const a = { type: "element", tagName: "br", properties: {}, children: [] };
  return n.patch(r, a), [n.applyData(r, a), { type: "text", value: `
` }];
}
function dS(n, r) {
  const a = r.value ? r.value + `
` : "", u = {}, s = r.lang ? r.lang.split(/\s+/) : [];
  s.length > 0 && (u.className = ["language-" + s[0]]);
  let f = {
    type: "element",
    tagName: "code",
    properties: u,
    children: [{ type: "text", value: a }]
  };
  return r.meta && (f.data = { meta: r.meta }), n.patch(r, f), f = n.applyData(r, f), f = { type: "element", tagName: "pre", properties: {}, children: [f] }, n.patch(r, f), f;
}
function hS(n, r) {
  const a = {
    type: "element",
    tagName: "del",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function mS(n, r) {
  const a = {
    type: "element",
    tagName: "em",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function pS(n, r) {
  const a = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", u = String(r.identifier).toUpperCase(), s = Ri(u.toLowerCase()), f = n.footnoteOrder.indexOf(u);
  let d, m = n.footnoteCounts.get(u);
  m === void 0 ? (m = 0, n.footnoteOrder.push(u), d = n.footnoteOrder.length) : d = f + 1, m += 1, n.footnoteCounts.set(u, m);
  const p = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + a + "fn-" + s,
      id: a + "fnref-" + s + (m > 1 ? "-" + m : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(d) }]
  };
  n.patch(r, p);
  const h = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [p]
  };
  return n.patch(r, h), n.applyData(r, h);
}
function gS(n, r) {
  const a = {
    type: "element",
    tagName: "h" + r.depth,
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function yS(n, r) {
  if (n.options.allowDangerousHtml) {
    const a = { type: "raw", value: r.value };
    return n.patch(r, a), n.applyData(r, a);
  }
}
function Bg(n, r) {
  const a = r.referenceType;
  let u = "]";
  if (a === "collapsed" ? u += "[]" : a === "full" && (u += "[" + (r.label || r.identifier) + "]"), r.type === "imageReference")
    return [{ type: "text", value: "![" + r.alt + u }];
  const s = n.all(r), f = s[0];
  f && f.type === "text" ? f.value = "[" + f.value : s.unshift({ type: "text", value: "[" });
  const d = s[s.length - 1];
  return d && d.type === "text" ? d.value += u : s.push({ type: "text", value: u }), s;
}
function bS(n, r) {
  const a = String(r.identifier).toUpperCase(), u = n.definitionById.get(a);
  if (!u)
    return Bg(n, r);
  const s = { src: Ri(u.url || ""), alt: r.alt };
  u.title !== null && u.title !== void 0 && (s.title = u.title);
  const f = { type: "element", tagName: "img", properties: s, children: [] };
  return n.patch(r, f), n.applyData(r, f);
}
function vS(n, r) {
  const a = { src: Ri(r.url) };
  r.alt !== null && r.alt !== void 0 && (a.alt = r.alt), r.title !== null && r.title !== void 0 && (a.title = r.title);
  const u = { type: "element", tagName: "img", properties: a, children: [] };
  return n.patch(r, u), n.applyData(r, u);
}
function xS(n, r) {
  const a = { type: "text", value: r.value.replace(/\r?\n|\r/g, " ") };
  n.patch(r, a);
  const u = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [a]
  };
  return n.patch(r, u), n.applyData(r, u);
}
function SS(n, r) {
  const a = String(r.identifier).toUpperCase(), u = n.definitionById.get(a);
  if (!u)
    return Bg(n, r);
  const s = { href: Ri(u.url || "") };
  u.title !== null && u.title !== void 0 && (s.title = u.title);
  const f = {
    type: "element",
    tagName: "a",
    properties: s,
    children: n.all(r)
  };
  return n.patch(r, f), n.applyData(r, f);
}
function kS(n, r) {
  const a = { href: Ri(r.url) };
  r.title !== null && r.title !== void 0 && (a.title = r.title);
  const u = {
    type: "element",
    tagName: "a",
    properties: a,
    children: n.all(r)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function wS(n, r, a) {
  const u = n.all(r), s = a ? ES(a) : Hg(r), f = {}, d = [];
  if (typeof r.checked == "boolean") {
    const b = u[0];
    let y;
    b && b.type === "element" && b.tagName === "p" ? y = b : (y = { type: "element", tagName: "p", properties: {}, children: [] }, u.unshift(y)), y.children.length > 0 && y.children.unshift({ type: "text", value: " " }), y.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: r.checked, disabled: !0 },
      children: []
    }), f.className = ["task-list-item"];
  }
  let m = -1;
  for (; ++m < u.length; ) {
    const b = u[m];
    (s || m !== 0 || b.type !== "element" || b.tagName !== "p") && d.push({ type: "text", value: `
` }), b.type === "element" && b.tagName === "p" && !s ? d.push(...b.children) : d.push(b);
  }
  const p = u[u.length - 1];
  p && (s || p.type !== "element" || p.tagName !== "p") && d.push({ type: "text", value: `
` });
  const h = { type: "element", tagName: "li", properties: f, children: d };
  return n.patch(r, h), n.applyData(r, h);
}
function ES(n) {
  let r = !1;
  if (n.type === "list") {
    r = n.spread || !1;
    const a = n.children;
    let u = -1;
    for (; !r && ++u < a.length; )
      r = Hg(a[u]);
  }
  return r;
}
function Hg(n) {
  const r = n.spread;
  return r ?? n.children.length > 1;
}
function zS(n, r) {
  const a = {}, u = n.all(r);
  let s = -1;
  for (typeof r.start == "number" && r.start !== 1 && (a.start = r.start); ++s < u.length; ) {
    const d = u[s];
    if (d.type === "element" && d.tagName === "li" && d.properties && Array.isArray(d.properties.className) && d.properties.className.includes("task-list-item")) {
      a.className = ["contains-task-list"];
      break;
    }
  }
  const f = {
    type: "element",
    tagName: r.ordered ? "ol" : "ul",
    properties: a,
    children: n.wrap(u, !0)
  };
  return n.patch(r, f), n.applyData(r, f);
}
function TS(n, r) {
  const a = {
    type: "element",
    tagName: "p",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function AS(n, r) {
  const a = { type: "root", children: n.wrap(n.all(r)) };
  return n.patch(r, a), n.applyData(r, a);
}
function CS(n, r) {
  const a = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function _S(n, r) {
  const a = n.all(r), u = a.shift(), s = [];
  if (u) {
    const d = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: n.wrap([u], !0)
    };
    n.patch(r.children[0], d), s.push(d);
  }
  if (a.length > 0) {
    const d = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: n.wrap(a, !0)
    }, m = Dc(r.children[1]), p = bg(r.children[r.children.length - 1]);
    m && p && (d.position = { start: m, end: p }), s.push(d);
  }
  const f = {
    type: "element",
    tagName: "table",
    properties: {},
    children: n.wrap(s, !0)
  };
  return n.patch(r, f), n.applyData(r, f);
}
function OS(n, r, a) {
  const u = a ? a.children : void 0, f = (u ? u.indexOf(r) : 1) === 0 ? "th" : "td", d = a && a.type === "table" ? a.align : void 0, m = d ? d.length : r.children.length;
  let p = -1;
  const h = [];
  for (; ++p < m; ) {
    const y = r.children[p], S = {}, v = d ? d[p] : void 0;
    v && (S.align = v);
    let z = { type: "element", tagName: f, properties: S, children: [] };
    y && (z.children = n.all(y), n.patch(y, z), z = n.applyData(y, z)), h.push(z);
  }
  const b = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: n.wrap(h, !0)
  };
  return n.patch(r, b), n.applyData(r, b);
}
function DS(n, r) {
  const a = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
const Ap = 9, Cp = 32;
function MS(n) {
  const r = String(n), a = /\r?\n|\r/g;
  let u = a.exec(r), s = 0;
  const f = [];
  for (; u; )
    f.push(
      _p(r.slice(s, u.index), s > 0, !0),
      u[0]
    ), s = u.index + u[0].length, u = a.exec(r);
  return f.push(_p(r.slice(s), s > 0, !1)), f.join("");
}
function _p(n, r, a) {
  let u = 0, s = n.length;
  if (r) {
    let f = n.codePointAt(u);
    for (; f === Ap || f === Cp; )
      u++, f = n.codePointAt(u);
  }
  if (a) {
    let f = n.codePointAt(s - 1);
    for (; f === Ap || f === Cp; )
      s--, f = n.codePointAt(s - 1);
  }
  return s > u ? n.slice(u, s) : "";
}
function NS(n, r) {
  const a = { type: "text", value: MS(String(r.value)) };
  return n.patch(r, a), n.applyData(r, a);
}
function RS(n, r) {
  const a = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return n.patch(r, a), n.applyData(r, a);
}
const jS = {
  blockquote: cS,
  break: fS,
  code: dS,
  delete: hS,
  emphasis: mS,
  footnoteReference: pS,
  heading: gS,
  html: yS,
  imageReference: bS,
  image: vS,
  inlineCode: xS,
  linkReference: SS,
  link: kS,
  listItem: wS,
  list: zS,
  paragraph: TS,
  // @ts-expect-error: root is different, but hard to type.
  root: AS,
  strong: CS,
  table: _S,
  tableCell: DS,
  tableRow: OS,
  text: NS,
  thematicBreak: RS,
  toml: uu,
  yaml: uu,
  definition: uu,
  footnoteDefinition: uu
};
function uu() {
}
const qg = -1, wu = 0, La = 1, yu = 2, Bc = 3, Hc = 4, qc = 5, Yc = 6, Yg = 7, Gg = 8, Vg = typeof self == "object" ? self : globalThis, Op = (n, r) => {
  switch (n) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + n);
  }
  return new Vg[n](r);
}, LS = (n, r) => {
  const a = (s, f) => (n.set(f, s), s), u = (s) => {
    if (n.has(s))
      return n.get(s);
    const [f, d] = r[s];
    switch (f) {
      case wu:
      case qg:
        return a(d, s);
      case La: {
        const m = a([], s);
        for (const p of d)
          m.push(u(p));
        return m;
      }
      case yu: {
        const m = a({}, s);
        for (const [p, h] of d)
          m[u(p)] = u(h);
        return m;
      }
      case Bc:
        return a(new Date(d), s);
      case Hc: {
        const { source: m, flags: p } = d;
        return a(new RegExp(m, p), s);
      }
      case qc: {
        const m = a(/* @__PURE__ */ new Map(), s);
        for (const [p, h] of d)
          m.set(u(p), u(h));
        return m;
      }
      case Yc: {
        const m = a(/* @__PURE__ */ new Set(), s);
        for (const p of d)
          m.add(u(p));
        return m;
      }
      case Yg: {
        const { name: m, message: p } = d;
        return a(
          typeof Vg[m] == "function" ? Op(m, p) : new Error(p),
          s
        );
      }
      case Gg:
        return a(BigInt(d), s);
      case "BigInt":
        return a(Object(BigInt(d)), s);
      case "ArrayBuffer":
        return a(new Uint8Array(d).buffer, d);
      case "DataView": {
        const { buffer: m } = new Uint8Array(d);
        return a(new DataView(m), d);
      }
    }
    return a(Op(f, d), s);
  };
  return u;
}, Dp = (n) => LS(/* @__PURE__ */ new Map(), n)(0), Ul = "", { toString: US } = {}, { keys: BS } = Object, Ma = (n) => {
  const r = typeof n;
  if (r !== "object" || !n)
    return [wu, r];
  const a = US.call(n).slice(8, -1);
  switch (a) {
    case "Array":
      return [La, Ul];
    case "Object":
      return [yu, Ul];
    case "Date":
      return [Bc, Ul];
    case "RegExp":
      return [Hc, Ul];
    case "Map":
      return [qc, Ul];
    case "Set":
      return [Yc, Ul];
    case "DataView":
      return [La, a];
  }
  return a.includes("Array") ? [La, a] : n instanceof Error ? [Yg, n.name || "Error"] : [yu, a];
}, ou = ([n, r]) => n === wu && (r === "function" || r === "symbol"), HS = (n, r, a, u) => {
  const s = (d, m) => {
    const p = u.push(d) - 1;
    return a.set(m, p), p;
  }, f = (d) => {
    if (a.has(d))
      return a.get(d);
    let [m, p] = Ma(d);
    switch (m) {
      case wu: {
        let b = d;
        switch (p) {
          case "bigint":
            m = Gg, b = d.toString();
            break;
          case "function":
          case "symbol":
            if (n)
              throw new TypeError("unable to serialize " + p);
            b = null;
            break;
          case "undefined":
            return s([qg], d);
        }
        return s([m, b], d);
      }
      case La: {
        if (p) {
          let S = d;
          return p === "DataView" ? S = new Uint8Array(d.buffer) : p === "ArrayBuffer" && (S = new Uint8Array(d)), s([p, [...S]], d);
        }
        const b = [], y = s([m, b], d);
        for (const S of d)
          b.push(f(S));
        return y;
      }
      case yu: {
        if (p)
          switch (p) {
            case "BigInt":
              return s([p, d.toString()], d);
            case "Boolean":
            case "Number":
            case "String":
              return s([p, d.valueOf()], d);
          }
        if (r && "toJSON" in d)
          return f(d.toJSON());
        const b = [], y = s([m, b], d);
        for (const S of BS(d))
          (n || !ou(Ma(d[S]))) && b.push([f(S), f(d[S])]);
        return y;
      }
      case Bc:
        return s([m, isNaN(d.getTime()) ? Ul : d.toISOString()], d);
      case Hc: {
        const { source: b, flags: y } = d;
        return s([m, { source: b, flags: y }], d);
      }
      case qc: {
        const b = [], y = s([m, b], d);
        for (const [S, v] of d)
          (n || !(ou(Ma(S)) || ou(Ma(v)))) && b.push([f(S), f(v)]);
        return y;
      }
      case Yc: {
        const b = [], y = s([m, b], d);
        for (const S of d)
          (n || !ou(Ma(S))) && b.push(f(S));
        return y;
      }
    }
    const { message: h } = d;
    return s([m, { name: p, message: h }], d);
  };
  return f;
}, Mp = (n, { json: r, lossy: a } = {}) => {
  const u = [];
  return HS(!(r || a), !!r, /* @__PURE__ */ new Map(), u)(n), u;
}, bu = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (n, r) => r && ("json" in r || "lossy" in r) ? Dp(Mp(n, r)) : structuredClone(n)
) : (n, r) => Dp(Mp(n, r));
function qS(n, r) {
  const a = [{ type: "text", value: "↩" }];
  return r > 1 && a.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(r) }]
  }), a;
}
function YS(n, r) {
  return "Back to reference " + (n + 1) + (r > 1 ? "-" + r : "");
}
function GS(n) {
  const r = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", a = n.options.footnoteBackContent || qS, u = n.options.footnoteBackLabel || YS, s = n.options.footnoteLabel || "Footnotes", f = n.options.footnoteLabelTagName || "h2", d = n.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, m = [];
  let p = -1;
  for (; ++p < n.footnoteOrder.length; ) {
    const h = n.footnoteById.get(
      n.footnoteOrder[p]
    );
    if (!h)
      continue;
    const b = n.all(h), y = String(h.identifier).toUpperCase(), S = Ri(y.toLowerCase());
    let v = 0;
    const z = [], j = n.footnoteCounts.get(y);
    for (; j !== void 0 && ++v <= j; ) {
      z.length > 0 && z.push({ type: "text", value: " " });
      let Z = typeof a == "string" ? a : a(p, v);
      typeof Z == "string" && (Z = { type: "text", value: Z }), z.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + r + "fnref-" + S + (v > 1 ? "-" + v : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof u == "string" ? u : u(p, v),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(Z) ? Z : [Z]
      });
    }
    const H = b[b.length - 1];
    if (H && H.type === "element" && H.tagName === "p") {
      const Z = H.children[H.children.length - 1];
      Z && Z.type === "text" ? Z.value += " " : H.children.push({ type: "text", value: " " }), H.children.push(...z);
    } else
      b.push(...z);
    const D = {
      type: "element",
      tagName: "li",
      properties: { id: r + "fn-" + S },
      children: n.wrap(b, !0)
    };
    n.patch(h, D), m.push(D);
  }
  if (m.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: f,
          properties: {
            ...bu(d),
            id: "footnote-label"
          },
          children: [{ type: "text", value: s }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: n.wrap(m, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Eu = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  (function(n) {
    if (n == null)
      return ZS;
    if (typeof n == "function")
      return zu(n);
    if (typeof n == "object")
      return Array.isArray(n) ? VS(n) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        XS(
          /** @type {Props} */
          n
        )
      );
    if (typeof n == "string")
      return QS(n);
    throw new Error("Expected function, string, or object as test");
  })
);
function VS(n) {
  const r = [];
  let a = -1;
  for (; ++a < n.length; )
    r[a] = Eu(n[a]);
  return zu(u);
  function u(...s) {
    let f = -1;
    for (; ++f < r.length; )
      if (r[f].apply(this, s)) return !0;
    return !1;
  }
}
function XS(n) {
  const r = (
    /** @type {Record<string, unknown>} */
    n
  );
  return zu(a);
  function a(u) {
    const s = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      u
    );
    let f;
    for (f in n)
      if (s[f] !== r[f]) return !1;
    return !0;
  }
}
function QS(n) {
  return zu(r);
  function r(a) {
    return a && a.type === n;
  }
}
function zu(n) {
  return r;
  function r(a, u, s) {
    return !!(KS(a) && n.call(
      this,
      a,
      typeof u == "number" ? u : void 0,
      s || void 0
    ));
  }
}
function ZS() {
  return !0;
}
function KS(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const Xg = [], FS = !0, xc = !1, JS = "skip";
function Qg(n, r, a, u) {
  let s;
  typeof r == "function" && typeof a != "function" ? (u = a, a = r) : s = r;
  const f = Eu(s), d = u ? -1 : 1;
  m(n, void 0, [])();
  function m(p, h, b) {
    const y = (
      /** @type {Record<string, unknown>} */
      p && typeof p == "object" ? p : {}
    );
    if (typeof y.type == "string") {
      const v = (
        // `hast`
        typeof y.tagName == "string" ? y.tagName : (
          // `xast`
          typeof y.name == "string" ? y.name : void 0
        )
      );
      Object.defineProperty(S, "name", {
        value: "node (" + (p.type + (v ? "<" + v + ">" : "")) + ")"
      });
    }
    return S;
    function S() {
      let v = Xg, z, j, H;
      if ((!r || f(p, h, b[b.length - 1] || void 0)) && (v = IS(a(p, b)), v[0] === xc))
        return v;
      if ("children" in p && p.children) {
        const D = (
          /** @type {UnistParent} */
          p
        );
        if (D.children && v[0] !== JS)
          for (j = (u ? D.children.length : -1) + d, H = b.concat(D); j > -1 && j < D.children.length; ) {
            const Z = D.children[j];
            if (z = m(Z, j, H)(), z[0] === xc)
              return z;
            j = typeof z[1] == "number" ? z[1] : j + d;
          }
      }
      return v;
    }
  }
}
function IS(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [FS, n] : n == null ? Xg : [n];
}
function Gc(n, r, a, u) {
  let s, f, d;
  typeof r == "function" && typeof a != "function" ? (f = void 0, d = r, s = a) : (f = r, d = a, s = u), Qg(n, f, m, s);
  function m(p, h) {
    const b = h[h.length - 1], y = b ? b.children.indexOf(p) : void 0;
    return d(p, y, b);
  }
}
const Sc = {}.hasOwnProperty, $S = {};
function WS(n, r) {
  const a = r || $S, u = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), d = { ...jS, ...a.handlers }, m = {
    all: h,
    applyData: ek,
    definitionById: u,
    footnoteById: s,
    footnoteCounts: f,
    footnoteOrder: [],
    handlers: d,
    one: p,
    options: a,
    patch: PS,
    wrap: nk
  };
  return Gc(n, function(b) {
    if (b.type === "definition" || b.type === "footnoteDefinition") {
      const y = b.type === "definition" ? u : s, S = String(b.identifier).toUpperCase();
      y.has(S) || y.set(S, b);
    }
  }), m;
  function p(b, y) {
    const S = b.type, v = m.handlers[S];
    if (Sc.call(m.handlers, S) && v)
      return v(m, b, y);
    if (m.options.passThrough && m.options.passThrough.includes(S)) {
      if ("children" in b) {
        const { children: j, ...H } = b, D = bu(H);
        return D.children = m.all(b), D;
      }
      return bu(b);
    }
    return (m.options.unknownHandler || tk)(m, b, y);
  }
  function h(b) {
    const y = [];
    if ("children" in b) {
      const S = b.children;
      let v = -1;
      for (; ++v < S.length; ) {
        const z = m.one(S[v], b);
        if (z) {
          if (v && S[v - 1].type === "break" && (!Array.isArray(z) && z.type === "text" && (z.value = Np(z.value)), !Array.isArray(z) && z.type === "element")) {
            const j = z.children[0];
            j && j.type === "text" && (j.value = Np(j.value));
          }
          Array.isArray(z) ? y.push(...z) : y.push(z);
        }
      }
    }
    return y;
  }
}
function PS(n, r) {
  n.position && (r.position = Yv(n));
}
function ek(n, r) {
  let a = r;
  if (n && n.data) {
    const u = n.data.hName, s = n.data.hChildren, f = n.data.hProperties;
    if (typeof u == "string")
      if (a.type === "element")
        a.tagName = u;
      else {
        const d = "children" in a ? a.children : [a];
        a = { type: "element", tagName: u, properties: {}, children: d };
      }
    a.type === "element" && f && Object.assign(a.properties, bu(f)), "children" in a && a.children && s !== null && s !== void 0 && (a.children = s);
  }
  return a;
}
function tk(n, r) {
  const a = r.data || {}, u = "value" in r && !(Sc.call(a, "hProperties") || Sc.call(a, "hChildren")) ? { type: "text", value: r.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function nk(n, r) {
  const a = [];
  let u = -1;
  for (r && a.push({ type: "text", value: `
` }); ++u < n.length; )
    u && a.push({ type: "text", value: `
` }), a.push(n[u]);
  return r && n.length > 0 && a.push({ type: "text", value: `
` }), a;
}
function Np(n) {
  let r = 0, a = n.charCodeAt(r);
  for (; a === 9 || a === 32; )
    r++, a = n.charCodeAt(r);
  return n.slice(r);
}
function Rp(n, r) {
  const a = WS(n, r), u = a.one(n, void 0), s = GS(a), f = Array.isArray(u) ? { type: "root", children: u } : u || { type: "root", children: [] };
  return s && f.children.push({ type: "text", value: `
` }, s), f;
}
function lk(n, r) {
  return n && "run" in n ? async function(a, u) {
    const s = (
      /** @type {HastRoot} */
      Rp(a, { file: u, ...r })
    );
    await n.run(s, u);
  } : function(a, u) {
    return (
      /** @type {HastRoot} */
      Rp(a, { file: u, ...n || r })
    );
  };
}
function jp(n) {
  if (n)
    throw n;
}
var Ps, Lp;
function ik() {
  if (Lp) return Ps;
  Lp = 1;
  var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, a = Object.defineProperty, u = Object.getOwnPropertyDescriptor, s = function(h) {
    return typeof Array.isArray == "function" ? Array.isArray(h) : r.call(h) === "[object Array]";
  }, f = function(h) {
    if (!h || r.call(h) !== "[object Object]")
      return !1;
    var b = n.call(h, "constructor"), y = h.constructor && h.constructor.prototype && n.call(h.constructor.prototype, "isPrototypeOf");
    if (h.constructor && !b && !y)
      return !1;
    var S;
    for (S in h)
      ;
    return typeof S > "u" || n.call(h, S);
  }, d = function(h, b) {
    a && b.name === "__proto__" ? a(h, b.name, {
      enumerable: !0,
      configurable: !0,
      value: b.newValue,
      writable: !0
    }) : h[b.name] = b.newValue;
  }, m = function(h, b) {
    if (b === "__proto__")
      if (n.call(h, b)) {
        if (u)
          return u(h, b).value;
      } else return;
    return h[b];
  };
  return Ps = function p() {
    var h, b, y, S, v, z, j = arguments[0], H = 1, D = arguments.length, Z = !1;
    for (typeof j == "boolean" && (Z = j, j = arguments[1] || {}, H = 2), (j == null || typeof j != "object" && typeof j != "function") && (j = {}); H < D; ++H)
      if (h = arguments[H], h != null)
        for (b in h)
          y = m(j, b), S = m(h, b), j !== S && (Z && S && (f(S) || (v = s(S))) ? (v ? (v = !1, z = y && s(y) ? y : []) : z = y && f(y) ? y : {}, d(j, { name: b, newValue: p(Z, z, S) })) : typeof S < "u" && d(j, { name: b, newValue: S }));
    return j;
  }, Ps;
}
var ak = /* @__PURE__ */ ik();
const ec = /* @__PURE__ */ Ac(ak);
function kc(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const r = Object.getPrototypeOf(n);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}
function rk() {
  const n = [], r = { run: a, use: u };
  return r;
  function a(...s) {
    let f = -1;
    const d = s.pop();
    if (typeof d != "function")
      throw new TypeError("Expected function as last argument, not " + d);
    m(null, ...s);
    function m(p, ...h) {
      const b = n[++f];
      let y = -1;
      if (p) {
        d(p);
        return;
      }
      for (; ++y < s.length; )
        (h[y] === null || h[y] === void 0) && (h[y] = s[y]);
      s = h, b ? uk(b, m)(...h) : d(null, ...h);
    }
  }
  function u(s) {
    if (typeof s != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + s
      );
    return n.push(s), r;
  }
}
function uk(n, r) {
  let a;
  return u;
  function u(...d) {
    const m = n.length > d.length;
    let p;
    m && d.push(s);
    try {
      p = n.apply(this, d);
    } catch (h) {
      const b = (
        /** @type {Error} */
        h
      );
      if (m && a)
        throw b;
      return s(b);
    }
    m || (p && p.then && typeof p.then == "function" ? p.then(f, s) : p instanceof Error ? s(p) : f(p));
  }
  function s(d, ...m) {
    a || (a = !0, r(d, ...m));
  }
  function f(d) {
    s(null, d);
  }
}
const gn = { basename: ok, dirname: sk, extname: ck, join: fk, sep: "/" };
function ok(n, r) {
  if (r !== void 0 && typeof r != "string")
    throw new TypeError('"ext" argument must be a string');
  Ga(n);
  let a = 0, u = -1, s = n.length, f;
  if (r === void 0 || r.length === 0 || r.length > n.length) {
    for (; s--; )
      if (n.codePointAt(s) === 47) {
        if (f) {
          a = s + 1;
          break;
        }
      } else u < 0 && (f = !0, u = s + 1);
    return u < 0 ? "" : n.slice(a, u);
  }
  if (r === n)
    return "";
  let d = -1, m = r.length - 1;
  for (; s--; )
    if (n.codePointAt(s) === 47) {
      if (f) {
        a = s + 1;
        break;
      }
    } else
      d < 0 && (f = !0, d = s + 1), m > -1 && (n.codePointAt(s) === r.codePointAt(m--) ? m < 0 && (u = s) : (m = -1, u = d));
  return a === u ? u = d : u < 0 && (u = n.length), n.slice(a, u);
}
function sk(n) {
  if (Ga(n), n.length === 0)
    return ".";
  let r = -1, a = n.length, u;
  for (; --a; )
    if (n.codePointAt(a) === 47) {
      if (u) {
        r = a;
        break;
      }
    } else u || (u = !0);
  return r < 0 ? n.codePointAt(0) === 47 ? "/" : "." : r === 1 && n.codePointAt(0) === 47 ? "//" : n.slice(0, r);
}
function ck(n) {
  Ga(n);
  let r = n.length, a = -1, u = 0, s = -1, f = 0, d;
  for (; r--; ) {
    const m = n.codePointAt(r);
    if (m === 47) {
      if (d) {
        u = r + 1;
        break;
      }
      continue;
    }
    a < 0 && (d = !0, a = r + 1), m === 46 ? s < 0 ? s = r : f !== 1 && (f = 1) : s > -1 && (f = -1);
  }
  return s < 0 || a < 0 || // We saw a non-dot character immediately before the dot.
  f === 0 || // The (right-most) trimmed path component is exactly `..`.
  f === 1 && s === a - 1 && s === u + 1 ? "" : n.slice(s, a);
}
function fk(...n) {
  let r = -1, a;
  for (; ++r < n.length; )
    Ga(n[r]), n[r] && (a = a === void 0 ? n[r] : a + "/" + n[r]);
  return a === void 0 ? "." : dk(a);
}
function dk(n) {
  Ga(n);
  const r = n.codePointAt(0) === 47;
  let a = hk(n, !r);
  return a.length === 0 && !r && (a = "."), a.length > 0 && n.codePointAt(n.length - 1) === 47 && (a += "/"), r ? "/" + a : a;
}
function hk(n, r) {
  let a = "", u = 0, s = -1, f = 0, d = -1, m, p;
  for (; ++d <= n.length; ) {
    if (d < n.length)
      m = n.codePointAt(d);
    else {
      if (m === 47)
        break;
      m = 47;
    }
    if (m === 47) {
      if (!(s === d - 1 || f === 1)) if (s !== d - 1 && f === 2) {
        if (a.length < 2 || u !== 2 || a.codePointAt(a.length - 1) !== 46 || a.codePointAt(a.length - 2) !== 46) {
          if (a.length > 2) {
            if (p = a.lastIndexOf("/"), p !== a.length - 1) {
              p < 0 ? (a = "", u = 0) : (a = a.slice(0, p), u = a.length - 1 - a.lastIndexOf("/")), s = d, f = 0;
              continue;
            }
          } else if (a.length > 0) {
            a = "", u = 0, s = d, f = 0;
            continue;
          }
        }
        r && (a = a.length > 0 ? a + "/.." : "..", u = 2);
      } else
        a.length > 0 ? a += "/" + n.slice(s + 1, d) : a = n.slice(s + 1, d), u = d - s - 1;
      s = d, f = 0;
    } else m === 46 && f > -1 ? f++ : f = -1;
  }
  return a;
}
function Ga(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(n)
    );
}
const mk = { cwd: pk };
function pk() {
  return "/";
}
function wc(n) {
  return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && // @ts-expect-error: indexing is fine.
  n.auth === void 0);
}
function gk(n) {
  if (typeof n == "string")
    n = new URL(n);
  else if (!wc(n)) {
    const r = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + n + "`"
    );
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
  if (n.protocol !== "file:") {
    const r = new TypeError("The URL must be of scheme file");
    throw r.code = "ERR_INVALID_URL_SCHEME", r;
  }
  return yk(n);
}
function yk(n) {
  if (n.hostname !== "") {
    const u = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw u.code = "ERR_INVALID_FILE_URL_HOST", u;
  }
  const r = n.pathname;
  let a = -1;
  for (; ++a < r.length; )
    if (r.codePointAt(a) === 37 && r.codePointAt(a + 1) === 50) {
      const u = r.codePointAt(a + 2);
      if (u === 70 || u === 102) {
        const s = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw s.code = "ERR_INVALID_FILE_URL_PATH", s;
      }
    }
  return decodeURIComponent(r);
}
const tc = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Zg {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(r) {
    let a;
    r ? wc(r) ? a = { path: r } : typeof r == "string" || bk(r) ? a = { value: r } : a = r : a = {}, this.cwd = "cwd" in a ? "" : mk.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let u = -1;
    for (; ++u < tc.length; ) {
      const f = tc[u];
      f in a && a[f] !== void 0 && a[f] !== null && (this[f] = f === "history" ? [...a[f]] : a[f]);
    }
    let s;
    for (s in a)
      tc.includes(s) || (this[s] = a[s]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? gn.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(r) {
    lc(r, "basename"), nc(r, "basename"), this.path = gn.join(this.dirname || "", r);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? gn.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(r) {
    Up(this.basename, "dirname"), this.path = gn.join(r || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? gn.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(r) {
    if (nc(r, "extname"), Up(this.dirname, "extname"), r) {
      if (r.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (r.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = gn.join(this.dirname, this.stem + (r || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(r) {
    wc(r) && (r = gk(r)), lc(r, "path"), this.path !== r && this.history.push(r);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? gn.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(r) {
    lc(r, "stem"), nc(r, "stem"), this.path = gn.join(this.dirname || "", r + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(r, a, u) {
    const s = this.message(r, a, u);
    throw s.fatal = !0, s;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(r, a, u) {
    const s = this.message(r, a, u);
    return s.fatal = void 0, s;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(r, a, u) {
    const s = new vt(
      // @ts-expect-error: the overloads are fine.
      r,
      a,
      u
    );
    return this.path && (s.name = this.path + ":" + s.name, s.file = this.path), s.fatal = !1, this.messages.push(s), s;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(r) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(r || void 0).decode(this.value);
  }
}
function nc(n, r) {
  if (n && n.includes(gn.sep))
    throw new Error(
      "`" + r + "` cannot be a path: did not expect `" + gn.sep + "`"
    );
}
function lc(n, r) {
  if (!n)
    throw new Error("`" + r + "` cannot be empty");
}
function Up(n, r) {
  if (!n)
    throw new Error("Setting `" + r + "` requires `path` to be set too");
}
function bk(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const vk = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  (function(n) {
    const u = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), s = u[n], f = function() {
      return s.apply(f, arguments);
    };
    return Object.setPrototypeOf(f, u), f;
  })
), xk = {}.hasOwnProperty;
class Vc extends vk {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = rk();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const r = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Vc()
    );
    let a = -1;
    for (; ++a < this.attachers.length; ) {
      const u = this.attachers[a];
      r.use(...u);
    }
    return r.data(ec(!0, {}, this.namespace)), r;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(r, a) {
    return typeof r == "string" ? arguments.length === 2 ? (rc("data", this.frozen), this.namespace[r] = a, this) : xk.call(this.namespace, r) && this.namespace[r] || void 0 : r ? (rc("data", this.frozen), this.namespace = r, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const r = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [a, ...u] = this.attachers[this.freezeIndex];
      if (u[0] === !1)
        continue;
      u[0] === !0 && (u[0] = void 0);
      const s = a.call(r, ...u);
      typeof s == "function" && this.transformers.use(s);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(r) {
    this.freeze();
    const a = su(r), u = this.parser || this.Parser;
    return ic("parse", u), u(String(a), a);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(r, a) {
    const u = this;
    return this.freeze(), ic("process", this.parser || this.Parser), ac("process", this.compiler || this.Compiler), a ? s(void 0, a) : new Promise(s);
    function s(f, d) {
      const m = su(r), p = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        u.parse(m)
      );
      u.run(p, m, function(b, y, S) {
        if (b || !y || !S)
          return h(b);
        const v = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          y
        ), z = u.stringify(v, S);
        wk(z) ? S.value = z : S.result = z, h(
          b,
          /** @type {VFileWithOutput<CompileResult>} */
          S
        );
      });
      function h(b, y) {
        b || !y ? d(b) : f ? f(y) : a(void 0, y);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(r) {
    let a = !1, u;
    return this.freeze(), ic("processSync", this.parser || this.Parser), ac("processSync", this.compiler || this.Compiler), this.process(r, s), Hp("processSync", "process", a), u;
    function s(f, d) {
      a = !0, jp(f), u = d;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(r, a, u) {
    Bp(r), this.freeze();
    const s = this.transformers;
    return !u && typeof a == "function" && (u = a, a = void 0), u ? f(void 0, u) : new Promise(f);
    function f(d, m) {
      const p = su(a);
      s.run(r, p, h);
      function h(b, y, S) {
        const v = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          y || r
        );
        b ? m(b) : d ? d(v) : u(void 0, v, S);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(r, a) {
    let u = !1, s;
    return this.run(r, a, f), Hp("runSync", "run", u), s;
    function f(d, m) {
      jp(d), s = m, u = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(r, a) {
    this.freeze();
    const u = su(a), s = this.compiler || this.Compiler;
    return ac("stringify", s), Bp(r), s(r, u);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(r, ...a) {
    const u = this.attachers, s = this.namespace;
    if (rc("use", this.frozen), r != null) if (typeof r == "function")
      p(r, a);
    else if (typeof r == "object")
      Array.isArray(r) ? m(r) : d(r);
    else
      throw new TypeError("Expected usable value, not `" + r + "`");
    return this;
    function f(h) {
      if (typeof h == "function")
        p(h, []);
      else if (typeof h == "object")
        if (Array.isArray(h)) {
          const [b, ...y] = (
            /** @type {PluginTuple<Array<unknown>>} */
            h
          );
          p(b, y);
        } else
          d(h);
      else
        throw new TypeError("Expected usable value, not `" + h + "`");
    }
    function d(h) {
      if (!("plugins" in h) && !("settings" in h))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      m(h.plugins), h.settings && (s.settings = ec(!0, s.settings, h.settings));
    }
    function m(h) {
      let b = -1;
      if (h != null) if (Array.isArray(h))
        for (; ++b < h.length; ) {
          const y = h[b];
          f(y);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + h + "`");
    }
    function p(h, b) {
      let y = -1, S = -1;
      for (; ++y < u.length; )
        if (u[y][0] === h) {
          S = y;
          break;
        }
      if (S === -1)
        u.push([h, ...b]);
      else if (b.length > 0) {
        let [v, ...z] = b;
        const j = u[S][1];
        kc(j) && kc(v) && (v = ec(!0, j, v)), u[S] = [h, v, ...z];
      }
    }
  }
}
const Sk = new Vc().freeze();
function ic(n, r) {
  if (typeof r != "function")
    throw new TypeError("Cannot `" + n + "` without `parser`");
}
function ac(n, r) {
  if (typeof r != "function")
    throw new TypeError("Cannot `" + n + "` without `compiler`");
}
function rc(n, r) {
  if (r)
    throw new Error(
      "Cannot call `" + n + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Bp(n) {
  if (!kc(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function Hp(n, r, a) {
  if (!a)
    throw new Error(
      "`" + n + "` finished async. Use `" + r + "` instead"
    );
}
function su(n) {
  return kk(n) ? n : new Zg(n);
}
function kk(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function wk(n) {
  return typeof n == "string" || Ek(n);
}
function Ek(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const zk = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", qp = [], Yp = { allowDangerousHtml: !0 }, Tk = /^(https?|ircs?|mailto|xmpp)$/i, Ak = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Ck(n) {
  const r = _k(n), a = Ok(n);
  return Dk(r.runSync(r.parse(a), a), n);
}
function _k(n) {
  const r = n.rehypePlugins || qp, a = n.remarkPlugins || qp, u = n.remarkRehypeOptions ? { ...n.remarkRehypeOptions, ...Yp } : Yp;
  return Sk().use(sS).use(a).use(lk, u).use(r);
}
function Ok(n) {
  const r = n.children || "", a = new Zg();
  return typeof r == "string" && (a.value = r), a;
}
function Dk(n, r) {
  const a = r.allowedElements, u = r.allowElement, s = r.components, f = r.disallowedElements, d = r.skipHtml, m = r.unwrapDisallowed, p = r.urlTransform || Mk;
  for (const b of Ak)
    Object.hasOwn(r, b.from) && ("" + b.from + (b.to ? "use `" + b.to + "` instead" : "remove it") + zk + b.id, void 0);
  return Gc(n, h), Zv(n, {
    Fragment: C.Fragment,
    components: s,
    ignoreInvalidStyle: !0,
    jsx: C.jsx,
    jsxs: C.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function h(b, y, S) {
    if (b.type === "raw" && S && typeof y == "number")
      return d ? S.children.splice(y, 1) : S.children[y] = { type: "text", value: b.value }, y;
    if (b.type === "element") {
      let v;
      for (v in Is)
        if (Object.hasOwn(Is, v) && Object.hasOwn(b.properties, v)) {
          const z = b.properties[v], j = Is[v];
          (j === null || j.includes(b.tagName)) && (b.properties[v] = p(String(z || ""), v, b));
        }
    }
    if (b.type === "element") {
      let v = a ? !a.includes(b.tagName) : f ? f.includes(b.tagName) : !1;
      if (!v && u && typeof y == "number" && (v = !u(b, y, S)), v && S && typeof y == "number")
        return m && b.children ? S.children.splice(y, 1, ...b.children) : S.children.splice(y, 1), y;
    }
  }
}
function Mk(n) {
  const r = n.indexOf(":"), a = n.indexOf("?"), u = n.indexOf("#"), s = n.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    s !== -1 && r > s || a !== -1 && r > a || u !== -1 && r > u || // It is a protocol, it should be allowed.
    Tk.test(n.slice(0, r)) ? n : ""
  );
}
function Gp(n, r) {
  const a = String(n);
  if (typeof r != "string")
    throw new TypeError("Expected character");
  let u = 0, s = a.indexOf(r);
  for (; s !== -1; )
    u++, s = a.indexOf(r, s + r.length);
  return u;
}
function Nk(n) {
  if (typeof n != "string")
    throw new TypeError("Expected a string");
  return n.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Rk(n, r, a) {
  const s = Eu((a || {}).ignore || []), f = jk(r);
  let d = -1;
  for (; ++d < f.length; )
    Qg(n, "text", m);
  function m(h, b) {
    let y = -1, S;
    for (; ++y < b.length; ) {
      const v = b[y], z = S ? S.children : void 0;
      if (s(
        v,
        z ? z.indexOf(v) : void 0,
        S
      ))
        return;
      S = v;
    }
    if (S)
      return p(h, b);
  }
  function p(h, b) {
    const y = b[b.length - 1], S = f[d][0], v = f[d][1];
    let z = 0;
    const H = y.children.indexOf(h);
    let D = !1, Z = [];
    S.lastIndex = 0;
    let Y = S.exec(h.value);
    for (; Y; ) {
      const re = Y.index, fe = {
        index: Y.index,
        input: Y.input,
        stack: [...b, h]
      };
      let B = v(...Y, fe);
      if (typeof B == "string" && (B = B.length > 0 ? { type: "text", value: B } : void 0), B === !1 ? S.lastIndex = re + 1 : (z !== re && Z.push({
        type: "text",
        value: h.value.slice(z, re)
      }), Array.isArray(B) ? Z.push(...B) : B && Z.push(B), z = re + Y[0].length, D = !0), !S.global)
        break;
      Y = S.exec(h.value);
    }
    return D ? (z < h.value.length && Z.push({ type: "text", value: h.value.slice(z) }), y.children.splice(H, 1, ...Z)) : Z = [h], H + Z.length;
  }
}
function jk(n) {
  const r = [];
  if (!Array.isArray(n))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const a = !n[0] || Array.isArray(n[0]) ? n : [n];
  let u = -1;
  for (; ++u < a.length; ) {
    const s = a[u];
    r.push([Lk(s[0]), Uk(s[1])]);
  }
  return r;
}
function Lk(n) {
  return typeof n == "string" ? new RegExp(Nk(n), "g") : n;
}
function Uk(n) {
  return typeof n == "function" ? n : function() {
    return n;
  };
}
const uc = "phrasing", oc = ["autolink", "link", "image", "label"];
function Bk() {
  return {
    transforms: [Qk],
    enter: {
      literalAutolink: qk,
      literalAutolinkEmail: sc,
      literalAutolinkHttp: sc,
      literalAutolinkWww: sc
    },
    exit: {
      literalAutolink: Xk,
      literalAutolinkEmail: Vk,
      literalAutolinkHttp: Yk,
      literalAutolinkWww: Gk
    }
  };
}
function Hk() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: uc,
        notInConstruct: oc
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: uc,
        notInConstruct: oc
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: uc,
        notInConstruct: oc
      }
    ]
  };
}
function qk(n) {
  this.enter({ type: "link", title: null, url: "", children: [] }, n);
}
function sc(n) {
  this.config.enter.autolinkProtocol.call(this, n);
}
function Yk(n) {
  this.config.exit.autolinkProtocol.call(this, n);
}
function Gk(n) {
  this.config.exit.data.call(this, n);
  const r = this.stack[this.stack.length - 1];
  r.type, r.url = "http://" + this.sliceSerialize(n);
}
function Vk(n) {
  this.config.exit.autolinkEmail.call(this, n);
}
function Xk(n) {
  this.exit(n);
}
function Qk(n) {
  Rk(
    n,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Zk],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), Kk]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Zk(n, r, a, u, s) {
  let f = "";
  if (!Kg(s) || (/^w/i.test(r) && (a = r + a, r = "", f = "http://"), !Fk(a)))
    return !1;
  const d = Jk(a + u);
  if (!d[0]) return !1;
  const m = {
    type: "link",
    title: null,
    url: f + r + d[0],
    children: [{ type: "text", value: r + d[0] }]
  };
  return d[1] ? [m, { type: "text", value: d[1] }] : m;
}
function Kk(n, r, a, u) {
  return (
    // Not an expected previous character.
    !Kg(u, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(a) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + r + "@" + a,
      children: [{ type: "text", value: r + "@" + a }]
    }
  );
}
function Fk(n) {
  const r = n.split(".");
  return !(r.length < 2 || r[r.length - 1] && (/_/.test(r[r.length - 1]) || !/[a-zA-Z\d]/.test(r[r.length - 1])) || r[r.length - 2] && (/_/.test(r[r.length - 2]) || !/[a-zA-Z\d]/.test(r[r.length - 2])));
}
function Jk(n) {
  const r = /[!"&'),.:;<>?\]}]+$/.exec(n);
  if (!r)
    return [n, void 0];
  n = n.slice(0, r.index);
  let a = r[0], u = a.indexOf(")");
  const s = Gp(n, "(");
  let f = Gp(n, ")");
  for (; u !== -1 && s > f; )
    n += a.slice(0, u + 1), a = a.slice(u + 1), u = a.indexOf(")"), f++;
  return [n, a];
}
function Kg(n, r) {
  const a = n.input.charCodeAt(n.index - 1);
  return (n.index === 0 || Hl(a) || Su(a)) && // If it’s an email, the previous character should not be a slash.
  (!r || a !== 47);
}
Fg.peek = iw;
function Ik() {
  this.buffer();
}
function $k(n) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, n);
}
function Wk() {
  this.buffer();
}
function Pk(n) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    n
  );
}
function ew(n) {
  const r = this.resume(), a = this.stack[this.stack.length - 1];
  a.type, a.identifier = sn(
    this.sliceSerialize(n)
  ).toLowerCase(), a.label = r;
}
function tw(n) {
  this.exit(n);
}
function nw(n) {
  const r = this.resume(), a = this.stack[this.stack.length - 1];
  a.type, a.identifier = sn(
    this.sliceSerialize(n)
  ).toLowerCase(), a.label = r;
}
function lw(n) {
  this.exit(n);
}
function iw() {
  return "[";
}
function Fg(n, r, a, u) {
  const s = a.createTracker(u);
  let f = s.move("[^");
  const d = a.enter("footnoteReference"), m = a.enter("reference");
  return f += s.move(
    a.safe(a.associationId(n), { after: "]", before: f })
  ), m(), d(), f += s.move("]"), f;
}
function aw() {
  return {
    enter: {
      gfmFootnoteCallString: Ik,
      gfmFootnoteCall: $k,
      gfmFootnoteDefinitionLabelString: Wk,
      gfmFootnoteDefinition: Pk
    },
    exit: {
      gfmFootnoteCallString: ew,
      gfmFootnoteCall: tw,
      gfmFootnoteDefinitionLabelString: nw,
      gfmFootnoteDefinition: lw
    }
  };
}
function rw(n) {
  let r = !1;
  return n && n.firstLineBlank && (r = !0), {
    handlers: { footnoteDefinition: a, footnoteReference: Fg },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function a(u, s, f, d) {
    const m = f.createTracker(d);
    let p = m.move("[^");
    const h = f.enter("footnoteDefinition"), b = f.enter("label");
    return p += m.move(
      f.safe(f.associationId(u), { before: p, after: "]" })
    ), b(), p += m.move("]:"), u.children && u.children.length > 0 && (m.shift(4), p += m.move(
      (r ? `
` : " ") + f.indentLines(
        f.containerFlow(u, m.current()),
        r ? Jg : uw
      )
    )), h(), p;
  }
}
function uw(n, r, a) {
  return r === 0 ? n : Jg(n, r, a);
}
function Jg(n, r, a) {
  return (a ? "" : "    ") + n;
}
const ow = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Ig.peek = hw;
function sw() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: fw },
    exit: { strikethrough: dw }
  };
}
function cw() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: ow
      }
    ],
    handlers: { delete: Ig }
  };
}
function fw(n) {
  this.enter({ type: "delete", children: [] }, n);
}
function dw(n) {
  this.exit(n);
}
function Ig(n, r, a, u) {
  const s = a.createTracker(u), f = a.enter("strikethrough");
  let d = s.move("~~");
  return d += a.containerPhrasing(n, {
    ...s.current(),
    before: d,
    after: "~"
  }), d += s.move("~~"), f(), d;
}
function hw() {
  return "~";
}
function mw(n) {
  return n.length;
}
function pw(n, r) {
  const a = r || {}, u = (a.align || []).concat(), s = a.stringLength || mw, f = [], d = [], m = [], p = [];
  let h = 0, b = -1;
  for (; ++b < n.length; ) {
    const j = [], H = [];
    let D = -1;
    for (n[b].length > h && (h = n[b].length); ++D < n[b].length; ) {
      const Z = gw(n[b][D]);
      if (a.alignDelimiters !== !1) {
        const Y = s(Z);
        H[D] = Y, (p[D] === void 0 || Y > p[D]) && (p[D] = Y);
      }
      j.push(Z);
    }
    d[b] = j, m[b] = H;
  }
  let y = -1;
  if (typeof u == "object" && "length" in u)
    for (; ++y < h; )
      f[y] = Vp(u[y]);
  else {
    const j = Vp(u);
    for (; ++y < h; )
      f[y] = j;
  }
  y = -1;
  const S = [], v = [];
  for (; ++y < h; ) {
    const j = f[y];
    let H = "", D = "";
    j === 99 ? (H = ":", D = ":") : j === 108 ? H = ":" : j === 114 && (D = ":");
    let Z = a.alignDelimiters === !1 ? 1 : Math.max(
      1,
      p[y] - H.length - D.length
    );
    const Y = H + "-".repeat(Z) + D;
    a.alignDelimiters !== !1 && (Z = H.length + Z + D.length, Z > p[y] && (p[y] = Z), v[y] = Z), S[y] = Y;
  }
  d.splice(1, 0, S), m.splice(1, 0, v), b = -1;
  const z = [];
  for (; ++b < d.length; ) {
    const j = d[b], H = m[b];
    y = -1;
    const D = [];
    for (; ++y < h; ) {
      const Z = j[y] || "";
      let Y = "", re = "";
      if (a.alignDelimiters !== !1) {
        const fe = p[y] - (H[y] || 0), B = f[y];
        B === 114 ? Y = " ".repeat(fe) : B === 99 ? fe % 2 ? (Y = " ".repeat(fe / 2 + 0.5), re = " ".repeat(fe / 2 - 0.5)) : (Y = " ".repeat(fe / 2), re = Y) : re = " ".repeat(fe);
      }
      a.delimiterStart !== !1 && !y && D.push("|"), a.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(a.alignDelimiters === !1 && Z === "") && (a.delimiterStart !== !1 || y) && D.push(" "), a.alignDelimiters !== !1 && D.push(Y), D.push(Z), a.alignDelimiters !== !1 && D.push(re), a.padding !== !1 && D.push(" "), (a.delimiterEnd !== !1 || y !== h - 1) && D.push("|");
    }
    z.push(
      a.delimiterEnd === !1 ? D.join("").replace(/ +$/, "") : D.join("")
    );
  }
  return z.join(`
`);
}
function gw(n) {
  return n == null ? "" : String(n);
}
function Vp(n) {
  const r = typeof n == "string" ? n.codePointAt(0) : 0;
  return r === 67 || r === 99 ? 99 : r === 76 || r === 108 ? 108 : r === 82 || r === 114 ? 114 : 0;
}
function yw(n, r, a, u) {
  const s = a.enter("blockquote"), f = a.createTracker(u);
  f.move("> "), f.shift(2);
  const d = a.indentLines(
    a.containerFlow(n, f.current()),
    bw
  );
  return s(), d;
}
function bw(n, r, a) {
  return ">" + (a ? "" : " ") + n;
}
function vw(n, r) {
  return Xp(n, r.inConstruct, !0) && !Xp(n, r.notInConstruct, !1);
}
function Xp(n, r, a) {
  if (typeof r == "string" && (r = [r]), !r || r.length === 0)
    return a;
  let u = -1;
  for (; ++u < r.length; )
    if (n.includes(r[u]))
      return !0;
  return !1;
}
function Qp(n, r, a, u) {
  let s = -1;
  for (; ++s < a.unsafe.length; )
    if (a.unsafe[s].character === `
` && vw(a.stack, a.unsafe[s]))
      return /[ \t]/.test(u.before) ? "" : " ";
  return `\\
`;
}
function xw(n, r) {
  const a = String(n);
  let u = a.indexOf(r), s = u, f = 0, d = 0;
  if (typeof r != "string")
    throw new TypeError("Expected substring");
  for (; u !== -1; )
    u === s ? ++f > d && (d = f) : f = 1, s = u + r.length, u = a.indexOf(r, s);
  return d;
}
function Sw(n, r) {
  return !!(r.options.fences === !1 && n.value && // If there’s no info…
  !n.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(n.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value));
}
function kw(n) {
  const r = n.options.fence || "`";
  if (r !== "`" && r !== "~")
    throw new Error(
      "Cannot serialize code with `" + r + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return r;
}
function ww(n, r, a, u) {
  const s = kw(a), f = n.value || "", d = s === "`" ? "GraveAccent" : "Tilde";
  if (Sw(n, a)) {
    const y = a.enter("codeIndented"), S = a.indentLines(f, Ew);
    return y(), S;
  }
  const m = a.createTracker(u), p = s.repeat(Math.max(xw(f, s) + 1, 3)), h = a.enter("codeFenced");
  let b = m.move(p);
  if (n.lang) {
    const y = a.enter(`codeFencedLang${d}`);
    b += m.move(
      a.safe(n.lang, {
        before: b,
        after: " ",
        encode: ["`"],
        ...m.current()
      })
    ), y();
  }
  if (n.lang && n.meta) {
    const y = a.enter(`codeFencedMeta${d}`);
    b += m.move(" "), b += m.move(
      a.safe(n.meta, {
        before: b,
        after: `
`,
        encode: ["`"],
        ...m.current()
      })
    ), y();
  }
  return b += m.move(`
`), f && (b += m.move(f + `
`)), b += m.move(p), h(), b;
}
function Ew(n, r, a) {
  return (a ? "" : "    ") + n;
}
function Xc(n) {
  const r = n.options.quote || '"';
  if (r !== '"' && r !== "'")
    throw new Error(
      "Cannot serialize title with `" + r + "` for `options.quote`, expected `\"`, or `'`"
    );
  return r;
}
function zw(n, r, a, u) {
  const s = Xc(a), f = s === '"' ? "Quote" : "Apostrophe", d = a.enter("definition");
  let m = a.enter("label");
  const p = a.createTracker(u);
  let h = p.move("[");
  return h += p.move(
    a.safe(a.associationId(n), {
      before: h,
      after: "]",
      ...p.current()
    })
  ), h += p.move("]: "), m(), // If there’s no url, or…
  !n.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (m = a.enter("destinationLiteral"), h += p.move("<"), h += p.move(
    a.safe(n.url, { before: h, after: ">", ...p.current() })
  ), h += p.move(">")) : (m = a.enter("destinationRaw"), h += p.move(
    a.safe(n.url, {
      before: h,
      after: n.title ? " " : `
`,
      ...p.current()
    })
  )), m(), n.title && (m = a.enter(`title${f}`), h += p.move(" " + s), h += p.move(
    a.safe(n.title, {
      before: h,
      after: s,
      ...p.current()
    })
  ), h += p.move(s), m()), d(), h;
}
function Tw(n) {
  const r = n.options.emphasis || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + r + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return r;
}
function Ha(n) {
  return "&#x" + n.toString(16).toUpperCase() + ";";
}
function vu(n, r, a) {
  const u = Mi(n), s = Mi(r);
  return u === void 0 ? s === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    a === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : s === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : u === 1 ? s === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : s === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : s === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : s === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
$g.peek = Aw;
function $g(n, r, a, u) {
  const s = Tw(a), f = a.enter("emphasis"), d = a.createTracker(u), m = d.move(s);
  let p = d.move(
    a.containerPhrasing(n, {
      after: s,
      before: m,
      ...d.current()
    })
  );
  const h = p.charCodeAt(0), b = vu(
    u.before.charCodeAt(u.before.length - 1),
    h,
    s
  );
  b.inside && (p = Ha(h) + p.slice(1));
  const y = p.charCodeAt(p.length - 1), S = vu(u.after.charCodeAt(0), y, s);
  S.inside && (p = p.slice(0, -1) + Ha(y));
  const v = d.move(s);
  return f(), a.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: b.outside
  }, m + p + v;
}
function Aw(n, r, a) {
  return a.options.emphasis || "*";
}
function Cw(n, r) {
  let a = !1;
  return Gc(n, function(u) {
    if ("value" in u && /\r?\n|\r/.test(u.value) || u.type === "break")
      return a = !0, xc;
  }), !!((!n.depth || n.depth < 3) && jc(n) && (r.options.setext || a));
}
function _w(n, r, a, u) {
  const s = Math.max(Math.min(6, n.depth || 1), 1), f = a.createTracker(u);
  if (Cw(n, a)) {
    const b = a.enter("headingSetext"), y = a.enter("phrasing"), S = a.containerPhrasing(n, {
      ...f.current(),
      before: `
`,
      after: `
`
    });
    return y(), b(), S + `
` + (s === 1 ? "=" : "-").repeat(
      // The whole size…
      S.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(S.lastIndexOf("\r"), S.lastIndexOf(`
`)) + 1)
    );
  }
  const d = "#".repeat(s), m = a.enter("headingAtx"), p = a.enter("phrasing");
  f.move(d + " ");
  let h = a.containerPhrasing(n, {
    before: "# ",
    after: `
`,
    ...f.current()
  });
  return /^[\t ]/.test(h) && (h = Ha(h.charCodeAt(0)) + h.slice(1)), h = h ? d + " " + h : d, a.options.closeAtx && (h += " " + d), p(), m(), h;
}
Wg.peek = Ow;
function Wg(n) {
  return n.value || "";
}
function Ow() {
  return "<";
}
Pg.peek = Dw;
function Pg(n, r, a, u) {
  const s = Xc(a), f = s === '"' ? "Quote" : "Apostrophe", d = a.enter("image");
  let m = a.enter("label");
  const p = a.createTracker(u);
  let h = p.move("![");
  return h += p.move(
    a.safe(n.alt, { before: h, after: "]", ...p.current() })
  ), h += p.move("]("), m(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (m = a.enter("destinationLiteral"), h += p.move("<"), h += p.move(
    a.safe(n.url, { before: h, after: ">", ...p.current() })
  ), h += p.move(">")) : (m = a.enter("destinationRaw"), h += p.move(
    a.safe(n.url, {
      before: h,
      after: n.title ? " " : ")",
      ...p.current()
    })
  )), m(), n.title && (m = a.enter(`title${f}`), h += p.move(" " + s), h += p.move(
    a.safe(n.title, {
      before: h,
      after: s,
      ...p.current()
    })
  ), h += p.move(s), m()), h += p.move(")"), d(), h;
}
function Dw() {
  return "!";
}
ey.peek = Mw;
function ey(n, r, a, u) {
  const s = n.referenceType, f = a.enter("imageReference");
  let d = a.enter("label");
  const m = a.createTracker(u);
  let p = m.move("![");
  const h = a.safe(n.alt, {
    before: p,
    after: "]",
    ...m.current()
  });
  p += m.move(h + "]["), d();
  const b = a.stack;
  a.stack = [], d = a.enter("reference");
  const y = a.safe(a.associationId(n), {
    before: p,
    after: "]",
    ...m.current()
  });
  return d(), a.stack = b, f(), s === "full" || !h || h !== y ? p += m.move(y + "]") : s === "shortcut" ? p = p.slice(0, -1) : p += m.move("]"), p;
}
function Mw() {
  return "!";
}
ty.peek = Nw;
function ty(n, r, a) {
  let u = n.value || "", s = "`", f = -1;
  for (; new RegExp("(^|[^`])" + s + "([^`]|$)").test(u); )
    s += "`";
  for (/[^ \r\n]/.test(u) && (/^[ \r\n]/.test(u) && /[ \r\n]$/.test(u) || /^`|`$/.test(u)) && (u = " " + u + " "); ++f < a.unsafe.length; ) {
    const d = a.unsafe[f], m = a.compilePattern(d);
    let p;
    if (d.atBreak)
      for (; p = m.exec(u); ) {
        let h = p.index;
        u.charCodeAt(h) === 10 && u.charCodeAt(h - 1) === 13 && h--, u = u.slice(0, h) + " " + u.slice(p.index + 1);
      }
  }
  return s + u + s;
}
function Nw() {
  return "`";
}
function ny(n, r) {
  const a = jc(n);
  return !!(!r.options.resourceLink && // If there’s a url…
  n.url && // And there’s a no title…
  !n.title && // And the content of `node` is a single text node…
  n.children && n.children.length === 1 && n.children[0].type === "text" && // And if the url is the same as the content…
  (a === n.url || "mailto:" + a === n.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(n.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(n.url));
}
ly.peek = Rw;
function ly(n, r, a, u) {
  const s = Xc(a), f = s === '"' ? "Quote" : "Apostrophe", d = a.createTracker(u);
  let m, p;
  if (ny(n, a)) {
    const b = a.stack;
    a.stack = [], m = a.enter("autolink");
    let y = d.move("<");
    return y += d.move(
      a.containerPhrasing(n, {
        before: y,
        after: ">",
        ...d.current()
      })
    ), y += d.move(">"), m(), a.stack = b, y;
  }
  m = a.enter("link"), p = a.enter("label");
  let h = d.move("[");
  return h += d.move(
    a.containerPhrasing(n, {
      before: h,
      after: "](",
      ...d.current()
    })
  ), h += d.move("]("), p(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (p = a.enter("destinationLiteral"), h += d.move("<"), h += d.move(
    a.safe(n.url, { before: h, after: ">", ...d.current() })
  ), h += d.move(">")) : (p = a.enter("destinationRaw"), h += d.move(
    a.safe(n.url, {
      before: h,
      after: n.title ? " " : ")",
      ...d.current()
    })
  )), p(), n.title && (p = a.enter(`title${f}`), h += d.move(" " + s), h += d.move(
    a.safe(n.title, {
      before: h,
      after: s,
      ...d.current()
    })
  ), h += d.move(s), p()), h += d.move(")"), m(), h;
}
function Rw(n, r, a) {
  return ny(n, a) ? "<" : "[";
}
iy.peek = jw;
function iy(n, r, a, u) {
  const s = n.referenceType, f = a.enter("linkReference");
  let d = a.enter("label");
  const m = a.createTracker(u);
  let p = m.move("[");
  const h = a.containerPhrasing(n, {
    before: p,
    after: "]",
    ...m.current()
  });
  p += m.move(h + "]["), d();
  const b = a.stack;
  a.stack = [], d = a.enter("reference");
  const y = a.safe(a.associationId(n), {
    before: p,
    after: "]",
    ...m.current()
  });
  return d(), a.stack = b, f(), s === "full" || !h || h !== y ? p += m.move(y + "]") : s === "shortcut" ? p = p.slice(0, -1) : p += m.move("]"), p;
}
function jw() {
  return "[";
}
function Qc(n) {
  const r = n.options.bullet || "*";
  if (r !== "*" && r !== "+" && r !== "-")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return r;
}
function Lw(n) {
  const r = Qc(n), a = n.options.bulletOther;
  if (!a)
    return r === "*" ? "-" : "*";
  if (a !== "*" && a !== "+" && a !== "-")
    throw new Error(
      "Cannot serialize items with `" + a + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (a === r)
    throw new Error(
      "Expected `bullet` (`" + r + "`) and `bulletOther` (`" + a + "`) to be different"
    );
  return a;
}
function Uw(n) {
  const r = n.options.bulletOrdered || ".";
  if (r !== "." && r !== ")")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return r;
}
function ay(n) {
  const r = n.options.rule || "*";
  if (r !== "*" && r !== "-" && r !== "_")
    throw new Error(
      "Cannot serialize rules with `" + r + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return r;
}
function Bw(n, r, a, u) {
  const s = a.enter("list"), f = a.bulletCurrent;
  let d = n.ordered ? Uw(a) : Qc(a);
  const m = n.ordered ? d === "." ? ")" : "." : Lw(a);
  let p = r && a.bulletLastUsed ? d === a.bulletLastUsed : !1;
  if (!n.ordered) {
    const b = n.children ? n.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (d === "*" || d === "-") && // Empty first list item:
      b && (!b.children || !b.children[0]) && // Directly in two other list items:
      a.stack[a.stack.length - 1] === "list" && a.stack[a.stack.length - 2] === "listItem" && a.stack[a.stack.length - 3] === "list" && a.stack[a.stack.length - 4] === "listItem" && // That are each the first child.
      a.indexStack[a.indexStack.length - 1] === 0 && a.indexStack[a.indexStack.length - 2] === 0 && a.indexStack[a.indexStack.length - 3] === 0 && (p = !0), ay(a) === d && b
    ) {
      let y = -1;
      for (; ++y < n.children.length; ) {
        const S = n.children[y];
        if (S && S.type === "listItem" && S.children && S.children[0] && S.children[0].type === "thematicBreak") {
          p = !0;
          break;
        }
      }
    }
  }
  p && (d = m), a.bulletCurrent = d;
  const h = a.containerFlow(n, u);
  return a.bulletLastUsed = d, a.bulletCurrent = f, s(), h;
}
function Hw(n) {
  const r = n.options.listItemIndent || "one";
  if (r !== "tab" && r !== "one" && r !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return r;
}
function qw(n, r, a, u) {
  const s = Hw(a);
  let f = a.bulletCurrent || Qc(a);
  r && r.type === "list" && r.ordered && (f = (typeof r.start == "number" && r.start > -1 ? r.start : 1) + (a.options.incrementListMarker === !1 ? 0 : r.children.indexOf(n)) + f);
  let d = f.length + 1;
  (s === "tab" || s === "mixed" && (r && r.type === "list" && r.spread || n.spread)) && (d = Math.ceil(d / 4) * 4);
  const m = a.createTracker(u);
  m.move(f + " ".repeat(d - f.length)), m.shift(d);
  const p = a.enter("listItem"), h = a.indentLines(
    a.containerFlow(n, m.current()),
    b
  );
  return p(), h;
  function b(y, S, v) {
    return S ? (v ? "" : " ".repeat(d)) + y : (v ? f : f + " ".repeat(d - f.length)) + y;
  }
}
function Yw(n, r, a, u) {
  const s = a.enter("paragraph"), f = a.enter("phrasing"), d = a.containerPhrasing(n, u);
  return f(), s(), d;
}
const Gw = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Eu([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function Vw(n, r, a, u) {
  return (n.children.some(function(d) {
    return Gw(d);
  }) ? a.containerPhrasing : a.containerFlow).call(a, n, u);
}
function Xw(n) {
  const r = n.options.strong || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize strong with `" + r + "` for `options.strong`, expected `*`, or `_`"
    );
  return r;
}
ry.peek = Qw;
function ry(n, r, a, u) {
  const s = Xw(a), f = a.enter("strong"), d = a.createTracker(u), m = d.move(s + s);
  let p = d.move(
    a.containerPhrasing(n, {
      after: s,
      before: m,
      ...d.current()
    })
  );
  const h = p.charCodeAt(0), b = vu(
    u.before.charCodeAt(u.before.length - 1),
    h,
    s
  );
  b.inside && (p = Ha(h) + p.slice(1));
  const y = p.charCodeAt(p.length - 1), S = vu(u.after.charCodeAt(0), y, s);
  S.inside && (p = p.slice(0, -1) + Ha(y));
  const v = d.move(s + s);
  return f(), a.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: b.outside
  }, m + p + v;
}
function Qw(n, r, a) {
  return a.options.strong || "*";
}
function Zw(n, r, a, u) {
  return a.safe(n.value, u);
}
function Kw(n) {
  const r = n.options.ruleRepetition || 3;
  if (r < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + r + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return r;
}
function Fw(n, r, a) {
  const u = (ay(a) + (a.options.ruleSpaces ? " " : "")).repeat(Kw(a));
  return a.options.ruleSpaces ? u.slice(0, -1) : u;
}
const uy = {
  blockquote: yw,
  break: Qp,
  code: ww,
  definition: zw,
  emphasis: $g,
  hardBreak: Qp,
  heading: _w,
  html: Wg,
  image: Pg,
  imageReference: ey,
  inlineCode: ty,
  link: ly,
  linkReference: iy,
  list: Bw,
  listItem: qw,
  paragraph: Yw,
  root: Vw,
  strong: ry,
  text: Zw,
  thematicBreak: Fw
};
function Jw() {
  return {
    enter: {
      table: Iw,
      tableData: Zp,
      tableHeader: Zp,
      tableRow: Ww
    },
    exit: {
      codeText: Pw,
      table: $w,
      tableData: cc,
      tableHeader: cc,
      tableRow: cc
    }
  };
}
function Iw(n) {
  const r = n._align;
  this.enter(
    {
      type: "table",
      align: r.map(function(a) {
        return a === "none" ? null : a;
      }),
      children: []
    },
    n
  ), this.data.inTable = !0;
}
function $w(n) {
  this.exit(n), this.data.inTable = void 0;
}
function Ww(n) {
  this.enter({ type: "tableRow", children: [] }, n);
}
function cc(n) {
  this.exit(n);
}
function Zp(n) {
  this.enter({ type: "tableCell", children: [] }, n);
}
function Pw(n) {
  let r = this.resume();
  this.data.inTable && (r = r.replace(/\\([\\|])/g, e2));
  const a = this.stack[this.stack.length - 1];
  a.type, a.value = r, this.exit(n);
}
function e2(n, r) {
  return r === "|" ? r : n;
}
function t2(n) {
  const r = n || {}, a = r.tableCellPadding, u = r.tablePipeAlign, s = r.stringLength, f = a ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: S,
      table: d,
      tableCell: p,
      tableRow: m
    }
  };
  function d(v, z, j, H) {
    return h(b(v, j, H), v.align);
  }
  function m(v, z, j, H) {
    const D = y(v, j, H), Z = h([D]);
    return Z.slice(0, Z.indexOf(`
`));
  }
  function p(v, z, j, H) {
    const D = j.enter("tableCell"), Z = j.enter("phrasing"), Y = j.containerPhrasing(v, {
      ...H,
      before: f,
      after: f
    });
    return Z(), D(), Y;
  }
  function h(v, z) {
    return pw(v, {
      align: z,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: u,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: a,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: s
    });
  }
  function b(v, z, j) {
    const H = v.children;
    let D = -1;
    const Z = [], Y = z.enter("table");
    for (; ++D < H.length; )
      Z[D] = y(H[D], z, j);
    return Y(), Z;
  }
  function y(v, z, j) {
    const H = v.children;
    let D = -1;
    const Z = [], Y = z.enter("tableRow");
    for (; ++D < H.length; )
      Z[D] = p(H[D], v, z, j);
    return Y(), Z;
  }
  function S(v, z, j) {
    let H = uy.inlineCode(v, z, j);
    return j.stack.includes("tableCell") && (H = H.replace(/\|/g, "\\$&")), H;
  }
}
function n2() {
  return {
    exit: {
      taskListCheckValueChecked: Kp,
      taskListCheckValueUnchecked: Kp,
      paragraph: i2
    }
  };
}
function l2() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: a2 }
  };
}
function Kp(n) {
  const r = this.stack[this.stack.length - 2];
  r.type, r.checked = n.type === "taskListCheckValueChecked";
}
function i2(n) {
  const r = this.stack[this.stack.length - 2];
  if (r && r.type === "listItem" && typeof r.checked == "boolean") {
    const a = this.stack[this.stack.length - 1];
    a.type;
    const u = a.children[0];
    if (u && u.type === "text") {
      const s = r.children;
      let f = -1, d;
      for (; ++f < s.length; ) {
        const m = s[f];
        if (m.type === "paragraph") {
          d = m;
          break;
        }
      }
      d === a && (u.value = u.value.slice(1), u.value.length === 0 ? a.children.shift() : a.position && u.position && typeof u.position.start.offset == "number" && (u.position.start.column++, u.position.start.offset++, a.position.start = Object.assign({}, u.position.start)));
    }
  }
  this.exit(n);
}
function a2(n, r, a, u) {
  const s = n.children[0], f = typeof n.checked == "boolean" && s && s.type === "paragraph", d = "[" + (n.checked ? "x" : " ") + "] ", m = a.createTracker(u);
  f && m.move(d);
  let p = uy.listItem(n, r, a, {
    ...u,
    ...m.current()
  });
  return f && (p = p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, h)), p;
  function h(b) {
    return b + d;
  }
}
function r2() {
  return [
    Bk(),
    aw(),
    sw(),
    Jw(),
    n2()
  ];
}
function u2(n) {
  return {
    extensions: [
      Hk(),
      rw(n),
      cw(),
      t2(n),
      l2()
    ]
  };
}
const o2 = {
  tokenize: m2,
  partial: !0
}, oy = {
  tokenize: p2,
  partial: !0
}, sy = {
  tokenize: g2,
  partial: !0
}, cy = {
  tokenize: y2,
  partial: !0
}, s2 = {
  tokenize: b2,
  partial: !0
}, fy = {
  name: "wwwAutolink",
  tokenize: d2,
  previous: hy
}, dy = {
  name: "protocolAutolink",
  tokenize: h2,
  previous: my
}, Hn = {
  name: "emailAutolink",
  tokenize: f2,
  previous: py
}, yn = {};
function c2() {
  return {
    text: yn
  };
}
let jl = 48;
for (; jl < 123; )
  yn[jl] = Hn, jl++, jl === 58 ? jl = 65 : jl === 91 && (jl = 97);
yn[43] = Hn;
yn[45] = Hn;
yn[46] = Hn;
yn[95] = Hn;
yn[72] = [Hn, dy];
yn[104] = [Hn, dy];
yn[87] = [Hn, fy];
yn[119] = [Hn, fy];
function f2(n, r, a) {
  const u = this;
  let s, f;
  return d;
  function d(y) {
    return !Ec(y) || !py.call(u, u.previous) || Zc(u.events) ? a(y) : (n.enter("literalAutolink"), n.enter("literalAutolinkEmail"), m(y));
  }
  function m(y) {
    return Ec(y) ? (n.consume(y), m) : y === 64 ? (n.consume(y), p) : a(y);
  }
  function p(y) {
    return y === 46 ? n.check(s2, b, h)(y) : y === 45 || y === 95 || bt(y) ? (f = !0, n.consume(y), p) : b(y);
  }
  function h(y) {
    return n.consume(y), s = !0, p;
  }
  function b(y) {
    return f && s && Et(u.previous) ? (n.exit("literalAutolinkEmail"), n.exit("literalAutolink"), r(y)) : a(y);
  }
}
function d2(n, r, a) {
  const u = this;
  return s;
  function s(d) {
    return d !== 87 && d !== 119 || !hy.call(u, u.previous) || Zc(u.events) ? a(d) : (n.enter("literalAutolink"), n.enter("literalAutolinkWww"), n.check(o2, n.attempt(oy, n.attempt(sy, f), a), a)(d));
  }
  function f(d) {
    return n.exit("literalAutolinkWww"), n.exit("literalAutolink"), r(d);
  }
}
function h2(n, r, a) {
  const u = this;
  let s = "", f = !1;
  return d;
  function d(y) {
    return (y === 72 || y === 104) && my.call(u, u.previous) && !Zc(u.events) ? (n.enter("literalAutolink"), n.enter("literalAutolinkHttp"), s += String.fromCodePoint(y), n.consume(y), m) : a(y);
  }
  function m(y) {
    if (Et(y) && s.length < 5)
      return s += String.fromCodePoint(y), n.consume(y), m;
    if (y === 58) {
      const S = s.toLowerCase();
      if (S === "http" || S === "https")
        return n.consume(y), p;
    }
    return a(y);
  }
  function p(y) {
    return y === 47 ? (n.consume(y), f ? h : (f = !0, p)) : a(y);
  }
  function h(y) {
    return y === null || gu(y) || Fe(y) || Hl(y) || Su(y) ? a(y) : n.attempt(oy, n.attempt(sy, b), a)(y);
  }
  function b(y) {
    return n.exit("literalAutolinkHttp"), n.exit("literalAutolink"), r(y);
  }
}
function m2(n, r, a) {
  let u = 0;
  return s;
  function s(d) {
    return (d === 87 || d === 119) && u < 3 ? (u++, n.consume(d), s) : d === 46 && u === 3 ? (n.consume(d), f) : a(d);
  }
  function f(d) {
    return d === null ? a(d) : r(d);
  }
}
function p2(n, r, a) {
  let u, s, f;
  return d;
  function d(h) {
    return h === 46 || h === 95 ? n.check(cy, p, m)(h) : h === null || Fe(h) || Hl(h) || h !== 45 && Su(h) ? p(h) : (f = !0, n.consume(h), d);
  }
  function m(h) {
    return h === 95 ? u = !0 : (s = u, u = void 0), n.consume(h), d;
  }
  function p(h) {
    return s || u || !f ? a(h) : r(h);
  }
}
function g2(n, r) {
  let a = 0, u = 0;
  return s;
  function s(d) {
    return d === 40 ? (a++, n.consume(d), s) : d === 41 && u < a ? f(d) : d === 33 || d === 34 || d === 38 || d === 39 || d === 41 || d === 42 || d === 44 || d === 46 || d === 58 || d === 59 || d === 60 || d === 63 || d === 93 || d === 95 || d === 126 ? n.check(cy, r, f)(d) : d === null || Fe(d) || Hl(d) ? r(d) : (n.consume(d), s);
  }
  function f(d) {
    return d === 41 && u++, n.consume(d), s;
  }
}
function y2(n, r, a) {
  return u;
  function u(m) {
    return m === 33 || m === 34 || m === 39 || m === 41 || m === 42 || m === 44 || m === 46 || m === 58 || m === 59 || m === 63 || m === 95 || m === 126 ? (n.consume(m), u) : m === 38 ? (n.consume(m), f) : m === 93 ? (n.consume(m), s) : (
      // `<` is an end.
      m === 60 || // So is whitespace.
      m === null || Fe(m) || Hl(m) ? r(m) : a(m)
    );
  }
  function s(m) {
    return m === null || m === 40 || m === 91 || Fe(m) || Hl(m) ? r(m) : u(m);
  }
  function f(m) {
    return Et(m) ? d(m) : a(m);
  }
  function d(m) {
    return m === 59 ? (n.consume(m), u) : Et(m) ? (n.consume(m), d) : a(m);
  }
}
function b2(n, r, a) {
  return u;
  function u(f) {
    return n.consume(f), s;
  }
  function s(f) {
    return bt(f) ? a(f) : r(f);
  }
}
function hy(n) {
  return n === null || n === 40 || n === 42 || n === 95 || n === 91 || n === 93 || n === 126 || Fe(n);
}
function my(n) {
  return !Et(n);
}
function py(n) {
  return !(n === 47 || Ec(n));
}
function Ec(n) {
  return n === 43 || n === 45 || n === 46 || n === 95 || bt(n);
}
function Zc(n) {
  let r = n.length, a = !1;
  for (; r--; ) {
    const u = n[r][1];
    if ((u.type === "labelLink" || u.type === "labelImage") && !u._balanced) {
      a = !0;
      break;
    }
    if (u._gfmAutolinkLiteralWalkedInto) {
      a = !1;
      break;
    }
  }
  return n.length > 0 && !a && (n[n.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), a;
}
const v2 = {
  tokenize: A2,
  partial: !0
};
function x2() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: E2,
        continuation: {
          tokenize: z2
        },
        exit: T2
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: w2
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: S2,
        resolveTo: k2
      }
    }
  };
}
function S2(n, r, a) {
  const u = this;
  let s = u.events.length;
  const f = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let d;
  for (; s--; ) {
    const p = u.events[s][1];
    if (p.type === "labelImage") {
      d = p;
      break;
    }
    if (p.type === "gfmFootnoteCall" || p.type === "labelLink" || p.type === "label" || p.type === "image" || p.type === "link")
      break;
  }
  return m;
  function m(p) {
    if (!d || !d._balanced)
      return a(p);
    const h = sn(u.sliceSerialize({
      start: d.end,
      end: u.now()
    }));
    return h.codePointAt(0) !== 94 || !f.includes(h.slice(1)) ? a(p) : (n.enter("gfmFootnoteCallLabelMarker"), n.consume(p), n.exit("gfmFootnoteCallLabelMarker"), r(p));
  }
}
function k2(n, r) {
  let a = n.length;
  for (; a--; )
    if (n[a][1].type === "labelImage" && n[a][0] === "enter") {
      n[a][1];
      break;
    }
  n[a + 1][1].type = "data", n[a + 3][1].type = "gfmFootnoteCallLabelMarker";
  const u = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, n[a + 3][1].start),
    end: Object.assign({}, n[n.length - 1][1].end)
  }, s = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, n[a + 3][1].end),
    end: Object.assign({}, n[a + 3][1].end)
  };
  s.end.column++, s.end.offset++, s.end._bufferIndex++;
  const f = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, s.end),
    end: Object.assign({}, n[n.length - 1][1].start)
  }, d = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, f.start),
    end: Object.assign({}, f.end)
  }, m = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    n[a + 1],
    n[a + 2],
    ["enter", u, r],
    // The `[`
    n[a + 3],
    n[a + 4],
    // The `^`.
    ["enter", s, r],
    ["exit", s, r],
    // Everything in between.
    ["enter", f, r],
    ["enter", d, r],
    ["exit", d, r],
    ["exit", f, r],
    // The ending (`]`, properly parsed and labelled).
    n[n.length - 2],
    n[n.length - 1],
    ["exit", u, r]
  ];
  return n.splice(a, n.length - a + 1, ...m), n;
}
function w2(n, r, a) {
  const u = this, s = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let f = 0, d;
  return m;
  function m(y) {
    return n.enter("gfmFootnoteCall"), n.enter("gfmFootnoteCallLabelMarker"), n.consume(y), n.exit("gfmFootnoteCallLabelMarker"), p;
  }
  function p(y) {
    return y !== 94 ? a(y) : (n.enter("gfmFootnoteCallMarker"), n.consume(y), n.exit("gfmFootnoteCallMarker"), n.enter("gfmFootnoteCallString"), n.enter("chunkString").contentType = "string", h);
  }
  function h(y) {
    if (
      // Too long.
      f > 999 || // Closing brace with nothing.
      y === 93 && !d || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      y === null || y === 91 || Fe(y)
    )
      return a(y);
    if (y === 93) {
      n.exit("chunkString");
      const S = n.exit("gfmFootnoteCallString");
      return s.includes(sn(u.sliceSerialize(S))) ? (n.enter("gfmFootnoteCallLabelMarker"), n.consume(y), n.exit("gfmFootnoteCallLabelMarker"), n.exit("gfmFootnoteCall"), r) : a(y);
    }
    return Fe(y) || (d = !0), f++, n.consume(y), y === 92 ? b : h;
  }
  function b(y) {
    return y === 91 || y === 92 || y === 93 ? (n.consume(y), f++, h) : h(y);
  }
}
function E2(n, r, a) {
  const u = this, s = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let f, d = 0, m;
  return p;
  function p(z) {
    return n.enter("gfmFootnoteDefinition")._container = !0, n.enter("gfmFootnoteDefinitionLabel"), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(z), n.exit("gfmFootnoteDefinitionLabelMarker"), h;
  }
  function h(z) {
    return z === 94 ? (n.enter("gfmFootnoteDefinitionMarker"), n.consume(z), n.exit("gfmFootnoteDefinitionMarker"), n.enter("gfmFootnoteDefinitionLabelString"), n.enter("chunkString").contentType = "string", b) : a(z);
  }
  function b(z) {
    if (
      // Too long.
      d > 999 || // Closing brace with nothing.
      z === 93 && !m || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      z === null || z === 91 || Fe(z)
    )
      return a(z);
    if (z === 93) {
      n.exit("chunkString");
      const j = n.exit("gfmFootnoteDefinitionLabelString");
      return f = sn(u.sliceSerialize(j)), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(z), n.exit("gfmFootnoteDefinitionLabelMarker"), n.exit("gfmFootnoteDefinitionLabel"), S;
    }
    return Fe(z) || (m = !0), d++, n.consume(z), z === 92 ? y : b;
  }
  function y(z) {
    return z === 91 || z === 92 || z === 93 ? (n.consume(z), d++, b) : b(z);
  }
  function S(z) {
    return z === 58 ? (n.enter("definitionMarker"), n.consume(z), n.exit("definitionMarker"), s.includes(f) || s.push(f), Re(n, v, "gfmFootnoteDefinitionWhitespace")) : a(z);
  }
  function v(z) {
    return r(z);
  }
}
function z2(n, r, a) {
  return n.check(Ya, r, n.attempt(v2, r, a));
}
function T2(n) {
  n.exit("gfmFootnoteDefinition");
}
function A2(n, r, a) {
  const u = this;
  return Re(n, s, "gfmFootnoteDefinitionIndent", 5);
  function s(f) {
    const d = u.events[u.events.length - 1];
    return d && d[1].type === "gfmFootnoteDefinitionIndent" && d[2].sliceSerialize(d[1], !0).length === 4 ? r(f) : a(f);
  }
}
function C2(n) {
  let a = (n || {}).singleTilde;
  const u = {
    name: "strikethrough",
    tokenize: f,
    resolveAll: s
  };
  return a == null && (a = !0), {
    text: {
      126: u
    },
    insideSpan: {
      null: [u]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function s(d, m) {
    let p = -1;
    for (; ++p < d.length; )
      if (d[p][0] === "enter" && d[p][1].type === "strikethroughSequenceTemporary" && d[p][1]._close) {
        let h = p;
        for (; h--; )
          if (d[h][0] === "exit" && d[h][1].type === "strikethroughSequenceTemporary" && d[h][1]._open && // If the sizes are the same:
          d[p][1].end.offset - d[p][1].start.offset === d[h][1].end.offset - d[h][1].start.offset) {
            d[p][1].type = "strikethroughSequence", d[h][1].type = "strikethroughSequence";
            const b = {
              type: "strikethrough",
              start: Object.assign({}, d[h][1].start),
              end: Object.assign({}, d[p][1].end)
            }, y = {
              type: "strikethroughText",
              start: Object.assign({}, d[h][1].end),
              end: Object.assign({}, d[p][1].start)
            }, S = [["enter", b, m], ["enter", d[h][1], m], ["exit", d[h][1], m], ["enter", y, m]], v = m.parser.constructs.insideSpan.null;
            v && Zt(S, S.length, 0, ku(v, d.slice(h + 1, p), m)), Zt(S, S.length, 0, [["exit", y, m], ["enter", d[p][1], m], ["exit", d[p][1], m], ["exit", b, m]]), Zt(d, h - 1, p - h + 3, S), p = h + S.length - 2;
            break;
          }
      }
    for (p = -1; ++p < d.length; )
      d[p][1].type === "strikethroughSequenceTemporary" && (d[p][1].type = "data");
    return d;
  }
  function f(d, m, p) {
    const h = this.previous, b = this.events;
    let y = 0;
    return S;
    function S(z) {
      return h === 126 && b[b.length - 1][1].type !== "characterEscape" ? p(z) : (d.enter("strikethroughSequenceTemporary"), v(z));
    }
    function v(z) {
      const j = Mi(h);
      if (z === 126)
        return y > 1 ? p(z) : (d.consume(z), y++, v);
      if (y < 2 && !a) return p(z);
      const H = d.exit("strikethroughSequenceTemporary"), D = Mi(z);
      return H._open = !D || D === 2 && !!j, H._close = !j || j === 2 && !!D, m(z);
    }
  }
}
class _2 {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(r, a, u) {
    O2(this, r, a, u);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(r) {
    if (this.map.sort(function(f, d) {
      return f[0] - d[0];
    }), this.map.length === 0)
      return;
    let a = this.map.length;
    const u = [];
    for (; a > 0; )
      a -= 1, u.push(r.slice(this.map[a][0] + this.map[a][1]), this.map[a][2]), r.length = this.map[a][0];
    u.push(r.slice()), r.length = 0;
    let s = u.pop();
    for (; s; ) {
      for (const f of s)
        r.push(f);
      s = u.pop();
    }
    this.map.length = 0;
  }
}
function O2(n, r, a, u) {
  let s = 0;
  if (!(a === 0 && u.length === 0)) {
    for (; s < n.map.length; ) {
      if (n.map[s][0] === r) {
        n.map[s][1] += a, n.map[s][2].push(...u);
        return;
      }
      s += 1;
    }
    n.map.push([r, a, u]);
  }
}
function D2(n, r) {
  let a = !1;
  const u = [];
  for (; r < n.length; ) {
    const s = n[r];
    if (a) {
      if (s[0] === "enter")
        s[1].type === "tableContent" && u.push(n[r + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (s[1].type === "tableContent") {
        if (n[r - 1][1].type === "tableDelimiterMarker") {
          const f = u.length - 1;
          u[f] = u[f] === "left" ? "center" : "right";
        }
      } else if (s[1].type === "tableDelimiterRow")
        break;
    } else s[0] === "enter" && s[1].type === "tableDelimiterRow" && (a = !0);
    r += 1;
  }
  return u;
}
function M2() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: N2,
        resolveAll: R2
      }
    }
  };
}
function N2(n, r, a) {
  const u = this;
  let s = 0, f = 0, d;
  return m;
  function m(L) {
    let te = u.events.length - 1;
    for (; te > -1; ) {
      const ue = u.events[te][1].type;
      if (ue === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      ue === "linePrefix") te--;
      else break;
    }
    const ee = te > -1 ? u.events[te][1].type : null, ze = ee === "tableHead" || ee === "tableRow" ? B : p;
    return ze === B && u.parser.lazy[u.now().line] ? a(L) : ze(L);
  }
  function p(L) {
    return n.enter("tableHead"), n.enter("tableRow"), h(L);
  }
  function h(L) {
    return L === 124 || (d = !0, f += 1), b(L);
  }
  function b(L) {
    return L === null ? a(L) : me(L) ? f > 1 ? (f = 0, u.interrupt = !0, n.exit("tableRow"), n.enter("lineEnding"), n.consume(L), n.exit("lineEnding"), v) : a(L) : Oe(L) ? Re(n, b, "whitespace")(L) : (f += 1, d && (d = !1, s += 1), L === 124 ? (n.enter("tableCellDivider"), n.consume(L), n.exit("tableCellDivider"), d = !0, b) : (n.enter("data"), y(L)));
  }
  function y(L) {
    return L === null || L === 124 || Fe(L) ? (n.exit("data"), b(L)) : (n.consume(L), L === 92 ? S : y);
  }
  function S(L) {
    return L === 92 || L === 124 ? (n.consume(L), y) : y(L);
  }
  function v(L) {
    return u.interrupt = !1, u.parser.lazy[u.now().line] ? a(L) : (n.enter("tableDelimiterRow"), d = !1, Oe(L) ? Re(n, z, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(L) : z(L));
  }
  function z(L) {
    return L === 45 || L === 58 ? H(L) : L === 124 ? (d = !0, n.enter("tableCellDivider"), n.consume(L), n.exit("tableCellDivider"), j) : fe(L);
  }
  function j(L) {
    return Oe(L) ? Re(n, H, "whitespace")(L) : H(L);
  }
  function H(L) {
    return L === 58 ? (f += 1, d = !0, n.enter("tableDelimiterMarker"), n.consume(L), n.exit("tableDelimiterMarker"), D) : L === 45 ? (f += 1, D(L)) : L === null || me(L) ? re(L) : fe(L);
  }
  function D(L) {
    return L === 45 ? (n.enter("tableDelimiterFiller"), Z(L)) : fe(L);
  }
  function Z(L) {
    return L === 45 ? (n.consume(L), Z) : L === 58 ? (d = !0, n.exit("tableDelimiterFiller"), n.enter("tableDelimiterMarker"), n.consume(L), n.exit("tableDelimiterMarker"), Y) : (n.exit("tableDelimiterFiller"), Y(L));
  }
  function Y(L) {
    return Oe(L) ? Re(n, re, "whitespace")(L) : re(L);
  }
  function re(L) {
    return L === 124 ? z(L) : L === null || me(L) ? !d || s !== f ? fe(L) : (n.exit("tableDelimiterRow"), n.exit("tableHead"), r(L)) : fe(L);
  }
  function fe(L) {
    return a(L);
  }
  function B(L) {
    return n.enter("tableRow"), $(L);
  }
  function $(L) {
    return L === 124 ? (n.enter("tableCellDivider"), n.consume(L), n.exit("tableCellDivider"), $) : L === null || me(L) ? (n.exit("tableRow"), r(L)) : Oe(L) ? Re(n, $, "whitespace")(L) : (n.enter("data"), K(L));
  }
  function K(L) {
    return L === null || L === 124 || Fe(L) ? (n.exit("data"), $(L)) : (n.consume(L), L === 92 ? de : K);
  }
  function de(L) {
    return L === 92 || L === 124 ? (n.consume(L), K) : K(L);
  }
}
function R2(n, r) {
  let a = -1, u = !0, s = 0, f = [0, 0, 0, 0], d = [0, 0, 0, 0], m = !1, p = 0, h, b, y;
  const S = new _2();
  for (; ++a < n.length; ) {
    const v = n[a], z = v[1];
    v[0] === "enter" ? z.type === "tableHead" ? (m = !1, p !== 0 && (Fp(S, r, p, h, b), b = void 0, p = 0), h = {
      type: "table",
      start: Object.assign({}, z.start),
      // Note: correct end is set later.
      end: Object.assign({}, z.end)
    }, S.add(a, 0, [["enter", h, r]])) : z.type === "tableRow" || z.type === "tableDelimiterRow" ? (u = !0, y = void 0, f = [0, 0, 0, 0], d = [0, a + 1, 0, 0], m && (m = !1, b = {
      type: "tableBody",
      start: Object.assign({}, z.start),
      // Note: correct end is set later.
      end: Object.assign({}, z.end)
    }, S.add(a, 0, [["enter", b, r]])), s = z.type === "tableDelimiterRow" ? 2 : b ? 3 : 1) : s && (z.type === "data" || z.type === "tableDelimiterMarker" || z.type === "tableDelimiterFiller") ? (u = !1, d[2] === 0 && (f[1] !== 0 && (d[0] = d[1], y = cu(S, r, f, s, void 0, y), f = [0, 0, 0, 0]), d[2] = a)) : z.type === "tableCellDivider" && (u ? u = !1 : (f[1] !== 0 && (d[0] = d[1], y = cu(S, r, f, s, void 0, y)), f = d, d = [f[1], a, 0, 0])) : z.type === "tableHead" ? (m = !0, p = a) : z.type === "tableRow" || z.type === "tableDelimiterRow" ? (p = a, f[1] !== 0 ? (d[0] = d[1], y = cu(S, r, f, s, a, y)) : d[1] !== 0 && (y = cu(S, r, d, s, a, y)), s = 0) : s && (z.type === "data" || z.type === "tableDelimiterMarker" || z.type === "tableDelimiterFiller") && (d[3] = a);
  }
  for (p !== 0 && Fp(S, r, p, h, b), S.consume(r.events), a = -1; ++a < r.events.length; ) {
    const v = r.events[a];
    v[0] === "enter" && v[1].type === "table" && (v[1]._align = D2(r.events, a));
  }
  return n;
}
function cu(n, r, a, u, s, f) {
  const d = u === 1 ? "tableHeader" : u === 2 ? "tableDelimiter" : "tableData", m = "tableContent";
  a[0] !== 0 && (f.end = Object.assign({}, Di(r.events, a[0])), n.add(a[0], 0, [["exit", f, r]]));
  const p = Di(r.events, a[1]);
  if (f = {
    type: d,
    start: Object.assign({}, p),
    // Note: correct end is set later.
    end: Object.assign({}, p)
  }, n.add(a[1], 0, [["enter", f, r]]), a[2] !== 0) {
    const h = Di(r.events, a[2]), b = Di(r.events, a[3]), y = {
      type: m,
      start: Object.assign({}, h),
      end: Object.assign({}, b)
    };
    if (n.add(a[2], 0, [["enter", y, r]]), u !== 2) {
      const S = r.events[a[2]], v = r.events[a[3]];
      if (S[1].end = Object.assign({}, v[1].end), S[1].type = "chunkText", S[1].contentType = "text", a[3] > a[2] + 1) {
        const z = a[2] + 1, j = a[3] - a[2] - 1;
        n.add(z, j, []);
      }
    }
    n.add(a[3] + 1, 0, [["exit", y, r]]);
  }
  return s !== void 0 && (f.end = Object.assign({}, Di(r.events, s)), n.add(s, 0, [["exit", f, r]]), f = void 0), f;
}
function Fp(n, r, a, u, s) {
  const f = [], d = Di(r.events, a);
  s && (s.end = Object.assign({}, d), f.push(["exit", s, r])), u.end = Object.assign({}, d), f.push(["exit", u, r]), n.add(a + 1, 0, f);
}
function Di(n, r) {
  const a = n[r], u = a[0] === "enter" ? "start" : "end";
  return a[1][u];
}
const j2 = {
  name: "tasklistCheck",
  tokenize: U2
};
function L2() {
  return {
    text: {
      91: j2
    }
  };
}
function U2(n, r, a) {
  const u = this;
  return s;
  function s(p) {
    return (
      // Exit if there’s stuff before.
      u.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !u._gfmTasklistFirstContentOfListItem ? a(p) : (n.enter("taskListCheck"), n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), f)
    );
  }
  function f(p) {
    return Fe(p) ? (n.enter("taskListCheckValueUnchecked"), n.consume(p), n.exit("taskListCheckValueUnchecked"), d) : p === 88 || p === 120 ? (n.enter("taskListCheckValueChecked"), n.consume(p), n.exit("taskListCheckValueChecked"), d) : a(p);
  }
  function d(p) {
    return p === 93 ? (n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), n.exit("taskListCheck"), m) : a(p);
  }
  function m(p) {
    return me(p) ? r(p) : Oe(p) ? n.check({
      tokenize: B2
    }, r, a)(p) : a(p);
  }
}
function B2(n, r, a) {
  return Re(n, u, "whitespace");
  function u(s) {
    return s === null ? a(s) : r(s);
  }
}
function H2(n) {
  return zg([
    c2(),
    x2(),
    C2(n),
    M2(),
    L2()
  ]);
}
const q2 = {};
function Y2(n) {
  const r = (
    /** @type {Processor<Root>} */
    this
  ), a = n || q2, u = r.data(), s = u.micromarkExtensions || (u.micromarkExtensions = []), f = u.fromMarkdownExtensions || (u.fromMarkdownExtensions = []), d = u.toMarkdownExtensions || (u.toMarkdownExtensions = []);
  s.push(H2(a)), f.push(r2()), d.push(u2(a));
}
function gy(n) {
  var r, a, u = "";
  if (typeof n == "string" || typeof n == "number") u += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var s = n.length;
    for (r = 0; r < s; r++) n[r] && (a = gy(n[r])) && (u && (u += " "), u += a);
  } else for (a in n) n[a] && (u && (u += " "), u += a);
  return u;
}
function Kc() {
  for (var n, r, a = 0, u = "", s = arguments.length; a < s; a++) (n = arguments[a]) && (r = gy(n)) && (u && (u += " "), u += r);
  return u;
}
const G2 = (n, r) => {
  const a = new Array(n.length + r.length);
  for (let u = 0; u < n.length; u++)
    a[u] = n[u];
  for (let u = 0; u < r.length; u++)
    a[n.length + u] = r[u];
  return a;
}, V2 = (n, r) => ({
  classGroupId: n,
  validator: r
}), yy = (n = /* @__PURE__ */ new Map(), r = null, a) => ({
  nextPart: n,
  validators: r,
  classGroupId: a
}), xu = "-", Jp = [], X2 = "arbitrary..", Q2 = (n) => {
  const r = K2(n), {
    conflictingClassGroups: a,
    conflictingClassGroupModifiers: u
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return Z2(d);
      const m = d.split(xu), p = m[0] === "" && m.length > 1 ? 1 : 0;
      return by(m, p, r);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const p = u[d], h = a[d];
        return p ? h ? G2(h, p) : p : h || Jp;
      }
      return a[d] || Jp;
    }
  };
}, by = (n, r, a) => {
  if (n.length - r === 0)
    return a.classGroupId;
  const s = n[r], f = a.nextPart.get(s);
  if (f) {
    const h = by(n, r + 1, f);
    if (h) return h;
  }
  const d = a.validators;
  if (d === null)
    return;
  const m = r === 0 ? n.join(xu) : n.slice(r).join(xu), p = d.length;
  for (let h = 0; h < p; h++) {
    const b = d[h];
    if (b.validator(m))
      return b.classGroupId;
  }
}, Z2 = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = n.slice(1, -1), a = r.indexOf(":"), u = r.slice(0, a);
  return u ? X2 + u : void 0;
})(), K2 = (n) => {
  const {
    theme: r,
    classGroups: a
  } = n;
  return F2(a, r);
}, F2 = (n, r) => {
  const a = yy();
  for (const u in n) {
    const s = n[u];
    Fc(s, a, u, r);
  }
  return a;
}, Fc = (n, r, a, u) => {
  const s = n.length;
  for (let f = 0; f < s; f++) {
    const d = n[f];
    J2(d, r, a, u);
  }
}, J2 = (n, r, a, u) => {
  if (typeof n == "string") {
    I2(n, r, a);
    return;
  }
  if (typeof n == "function") {
    $2(n, r, a, u);
    return;
  }
  W2(n, r, a, u);
}, I2 = (n, r, a) => {
  const u = n === "" ? r : vy(r, n);
  u.classGroupId = a;
}, $2 = (n, r, a, u) => {
  if (P2(n)) {
    Fc(n(u), r, a, u);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(V2(a, n));
}, W2 = (n, r, a, u) => {
  const s = Object.entries(n), f = s.length;
  for (let d = 0; d < f; d++) {
    const [m, p] = s[d];
    Fc(p, vy(r, m), a, u);
  }
}, vy = (n, r) => {
  let a = n;
  const u = r.split(xu), s = u.length;
  for (let f = 0; f < s; f++) {
    const d = u[f];
    let m = a.nextPart.get(d);
    m || (m = yy(), a.nextPart.set(d, m)), a = m;
  }
  return a;
}, P2 = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, eE = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, a = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
  const s = (f, d) => {
    a[f] = d, r++, r > n && (r = 0, u = a, a = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(f) {
      let d = a[f];
      if (d !== void 0)
        return d;
      if ((d = u[f]) !== void 0)
        return s(f, d), d;
    },
    set(f, d) {
      f in a ? a[f] = d : s(f, d);
    }
  };
}, zc = "!", Ip = ":", tE = [], $p = (n, r, a, u, s) => ({
  modifiers: n,
  hasImportantModifier: r,
  baseClassName: a,
  maybePostfixModifierPosition: u,
  isExternal: s
}), nE = (n) => {
  const {
    prefix: r,
    experimentalParseClassName: a
  } = n;
  let u = (s) => {
    const f = [];
    let d = 0, m = 0, p = 0, h;
    const b = s.length;
    for (let j = 0; j < b; j++) {
      const H = s[j];
      if (d === 0 && m === 0) {
        if (H === Ip) {
          f.push(s.slice(p, j)), p = j + 1;
          continue;
        }
        if (H === "/") {
          h = j;
          continue;
        }
      }
      H === "[" ? d++ : H === "]" ? d-- : H === "(" ? m++ : H === ")" && m--;
    }
    const y = f.length === 0 ? s : s.slice(p);
    let S = y, v = !1;
    y.endsWith(zc) ? (S = y.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      y.startsWith(zc) && (S = y.slice(1), v = !0)
    );
    const z = h && h > p ? h - p : void 0;
    return $p(f, v, S, z);
  };
  if (r) {
    const s = r + Ip, f = u;
    u = (d) => d.startsWith(s) ? f(d.slice(s.length)) : $p(tE, !1, d, void 0, !0);
  }
  if (a) {
    const s = u;
    u = (f) => a({
      className: f,
      parseClassName: s
    });
  }
  return u;
}, lE = (n) => {
  const r = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((a, u) => {
    r.set(a, 1e6 + u);
  }), (a) => {
    const u = [];
    let s = [];
    for (let f = 0; f < a.length; f++) {
      const d = a[f], m = d[0] === "[", p = r.has(d);
      m || p ? (s.length > 0 && (s.sort(), u.push(...s), s = []), u.push(d)) : s.push(d);
    }
    return s.length > 0 && (s.sort(), u.push(...s)), u;
  };
}, iE = (n) => ({
  cache: eE(n.cacheSize),
  parseClassName: nE(n),
  sortModifiers: lE(n),
  postfixLookupClassGroupIds: aE(n),
  ...Q2(n)
}), aE = (n) => {
  const r = /* @__PURE__ */ Object.create(null), a = n.postfixLookupClassGroups;
  if (a)
    for (let u = 0; u < a.length; u++)
      r[a[u]] = !0;
  return r;
}, rE = /\s+/, uE = (n, r) => {
  const {
    parseClassName: a,
    getClassGroupId: u,
    getConflictingClassGroupIds: s,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = r, m = [], p = n.trim().split(rE);
  let h = "";
  for (let b = p.length - 1; b >= 0; b -= 1) {
    const y = p[b], {
      isExternal: S,
      modifiers: v,
      hasImportantModifier: z,
      baseClassName: j,
      maybePostfixModifierPosition: H
    } = a(y);
    if (S) {
      h = y + (h.length > 0 ? " " + h : h);
      continue;
    }
    let D = !!H, Z;
    if (D) {
      const $ = j.substring(0, H);
      Z = u($);
      const K = Z && d[Z] ? u(j) : void 0;
      K && K !== Z && (Z = K, D = !1);
    } else
      Z = u(j);
    if (!Z) {
      if (!D) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (Z = u(j), !Z) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      D = !1;
    }
    const Y = v.length === 0 ? "" : v.length === 1 ? v[0] : f(v).join(":"), re = z ? Y + zc : Y, fe = re + Z;
    if (m.indexOf(fe) > -1)
      continue;
    m.push(fe);
    const B = s(Z, D);
    for (let $ = 0; $ < B.length; ++$) {
      const K = B[$];
      m.push(re + K);
    }
    h = y + (h.length > 0 ? " " + h : h);
  }
  return h;
}, oE = (...n) => {
  let r = 0, a, u, s = "";
  for (; r < n.length; )
    (a = n[r++]) && (u = xy(a)) && (s && (s += " "), s += u);
  return s;
}, xy = (n) => {
  if (typeof n == "string")
    return n;
  let r, a = "";
  for (let u = 0; u < n.length; u++)
    n[u] && (r = xy(n[u])) && (a && (a += " "), a += r);
  return a;
}, sE = (n, ...r) => {
  let a, u, s, f;
  const d = (p) => {
    const h = r.reduce((b, y) => y(b), n());
    return a = iE(h), u = a.cache.get, s = a.cache.set, f = m, m(p);
  }, m = (p) => {
    const h = u(p);
    if (h)
      return h;
    const b = uE(p, a);
    return s(p, b), b;
  };
  return f = d, (...p) => f(oE(...p));
}, cE = [], st = (n) => {
  const r = (a) => a[n] || cE;
  return r.isThemeGetter = !0, r;
}, Sy = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ky = /^\((?:(\w[\w-]*):)?(.+)\)$/i, fE = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, dE = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, hE = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, mE = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, pE = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, gE = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, hl = (n) => fE.test(n), Te = (n) => !!n && !Number.isNaN(Number(n)), pn = (n) => !!n && Number.isInteger(Number(n)), fc = (n) => n.endsWith("%") && Te(n.slice(0, -1)), Un = (n) => dE.test(n), wy = () => !0, yE = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  hE.test(n) && !mE.test(n)
), Jc = () => !1, bE = (n) => pE.test(n), vE = (n) => gE.test(n), xE = (n) => !le(n) && !ae(n), SE = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), kE = (n) => pl(n, Ty, Jc), le = (n) => Sy.test(n), Ll = (n) => pl(n, Ay, yE), Wp = (n) => pl(n, OE, Te), wE = (n) => pl(n, _y, wy), EE = (n) => pl(n, Cy, Jc), Pp = (n) => pl(n, Ey, Jc), zE = (n) => pl(n, zy, vE), fu = (n) => pl(n, Oy, bE), ae = (n) => ky.test(n), Na = (n) => Yl(n, Ay), TE = (n) => Yl(n, Cy), eg = (n) => Yl(n, Ey), AE = (n) => Yl(n, Ty), CE = (n) => Yl(n, zy), du = (n) => Yl(n, Oy, !0), _E = (n) => Yl(n, _y, !0), pl = (n, r, a) => {
  const u = Sy.exec(n);
  return u ? u[1] ? r(u[1]) : a(u[2]) : !1;
}, Yl = (n, r, a = !1) => {
  const u = ky.exec(n);
  return u ? u[1] ? r(u[1]) : a : !1;
}, Ey = (n) => n === "position" || n === "percentage", zy = (n) => n === "image" || n === "url", Ty = (n) => n === "length" || n === "size" || n === "bg-size", Ay = (n) => n === "length", OE = (n) => n === "number", Cy = (n) => n === "family-name", _y = (n) => n === "number" || n === "weight", Oy = (n) => n === "shadow", DE = () => {
  const n = st("color"), r = st("font"), a = st("text"), u = st("font-weight"), s = st("tracking"), f = st("leading"), d = st("breakpoint"), m = st("container"), p = st("spacing"), h = st("radius"), b = st("shadow"), y = st("inset-shadow"), S = st("text-shadow"), v = st("drop-shadow"), z = st("blur"), j = st("perspective"), H = st("aspect"), D = st("ease"), Z = st("animate"), Y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], re = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], fe = () => [...re(), ae, le], B = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", "contain", "none"], K = () => [ae, le, p], de = () => [hl, "full", "auto", ...K()], L = () => [pn, "none", "subgrid", ae, le], te = () => ["auto", {
    span: ["full", pn, ae, le]
  }, pn, ae, le], ee = () => [pn, "auto", ae, le], ze = () => ["auto", "min", "max", "fr", ae, le], ue = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], O = () => ["auto", ...K()], F = () => [hl, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...K()], se = () => [hl, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...K()], Se = () => [hl, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...K()], k = () => [n, ae, le], T = () => [...re(), eg, Pp, {
    position: [ae, le]
  }], G = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], w = () => ["auto", "cover", "contain", AE, kE, {
    size: [ae, le]
  }], P = () => [fc, Na, Ll], ie = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    ae,
    le
  ], ne = () => ["", Te, Na, Ll], we = () => ["solid", "dashed", "dotted", "double"], Xe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], be = () => [Te, fc, eg, Pp], xt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    z,
    ae,
    le
  ], zt = () => ["none", Te, ae, le], cn = () => ["none", Te, ae, le], qn = () => [Te, ae, le], Tt = () => [hl, "full", ...K()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Un],
      breakpoint: [Un],
      color: [wy],
      container: [Un],
      "drop-shadow": [Un],
      ease: ["in", "out", "in-out"],
      font: [xE],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Un],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Un],
      shadow: [Un],
      spacing: ["px", Te],
      text: [Un],
      "text-shadow": [Un],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", hl, le, ae, H]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", ae, le]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [SE],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Te, le, ae, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Y()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: fe()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: B()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": B()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": B()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: $()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": $()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": $()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: de()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": de()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": de()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": de(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: de()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": de(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: de()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": de()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": de()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: de()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: de()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: de()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: de()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [pn, "auto", ae, le]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [hl, "full", "auto", m, ...K()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Te, hl, "auto", "initial", "none", le]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Te, ae, le]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Te, ae, le]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [pn, "first", "last", "none", ae, le]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": L()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: te()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ee()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ee()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": L()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: te()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ee()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ee()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ze()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ze()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: K()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": K()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": K()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ue(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...I(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...I()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ue()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ue()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...I(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...I()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: K()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: K()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: K()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: K()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: K()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: K()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: K()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: K()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: K()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: K()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: K()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: O()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: O()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: O()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: O()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: O()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: O()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: O()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: O()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: O()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: O()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: O()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": K()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": K()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: F()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...se()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...se()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...se()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...Se()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...Se()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...Se()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [m, "screen", ...F()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          m,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...F()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          m,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [d]
          },
          ...F()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...F()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...F()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...F()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", a, Na, Ll]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [u, _E, wE]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", fc, le]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [TE, EE, r]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [le]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [s, ae, le]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Te, "none", ae, Wp]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...K()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ae, le]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", ae, le]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: k()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: k()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...we(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Te, "from-font", "auto", ae, Ll]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: k()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Te, "auto", ae, le]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: K()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [pn, ae, le]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ae, le]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", ae, le]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: T()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: G()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: w()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, pn, ae, le],
          radial: ["", ae, le],
          conic: [pn, ae, le]
        }, CE, zE]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: k()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: P()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: k()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: k()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: k()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ie()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ie()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ie()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ie()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ie()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ie()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ie()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ie()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ie()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ie()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ie()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ie()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ie()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ie()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ie()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ne()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ne()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ne()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ne()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ne()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ne()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ne()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ne()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ne()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ne()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ne()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ne()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ne()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...we(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...we(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: k()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": k()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": k()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": k()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": k()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": k()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": k()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": k()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": k()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": k()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": k()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: k()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...we(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Te, ae, le]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Te, Na, Ll]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: k()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          b,
          du,
          fu
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: k()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", y, du, fu]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": k()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ne()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: k()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Te, Ll]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": k()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ne()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": k()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", S, du, fu]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": k()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Te, ae, le]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Xe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Xe()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Te]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": be()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": be()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": k()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": k()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": be()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": be()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": k()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": k()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": be()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": be()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": k()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": k()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": be()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": be()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": k()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": k()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": be()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": be()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": k()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": k()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": be()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": be()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": k()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": k()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": be()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": be()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": k()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": k()
      }],
      "mask-image-radial": [{
        "mask-radial": [ae, le]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": be()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": be()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": k()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": k()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": re()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Te]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": be()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": be()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": k()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": k()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: T()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: G()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: w()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", ae, le]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ae,
          le
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: xt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Te, ae, le]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Te, ae, le]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          v,
          du,
          fu
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": k()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Te, ae, le]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Te, ae, le]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Te, ae, le]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Te, ae, le]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Te, ae, le]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          ae,
          le
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": xt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Te, ae, le]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Te, ae, le]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Te, ae, le]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Te, ae, le]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Te, ae, le]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Te, ae, le]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Te, ae, le]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Te, ae, le]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": K()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": K()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": K()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ae, le]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Te, "initial", ae, le]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", D, ae, le]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Te, ae, le]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", Z, ae, le]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [j, ae, le]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": fe()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: zt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": zt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": zt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": zt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: cn()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": cn()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": cn()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": cn()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: qn()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": qn()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": qn()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ae, le, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: fe()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Tt()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Tt()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Tt()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Tt()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [pn, ae, le]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: k()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: k()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ae, le]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": k()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": k()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": K()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": K()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": K()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": K()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": K()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": K()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": K()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": K()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": K()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": K()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": K()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": K()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": K()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": K()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": K()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": K()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": K()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": K()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": K()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": K()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": K()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": K()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", ae, le]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...k()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Te, Na, Ll, Wp]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...k()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Dy = /* @__PURE__ */ sE(DE);
function gl(...n) {
  return Dy(Kc(n));
}
function tg(n) {
  return n.trim().toLowerCase().replace(/[\s-]+/g, "_");
}
const ME = {
  // ── success: healthy, complete, settled ──
  active: "success",
  done: "success",
  complete: "success",
  completed: "success",
  success: "success",
  succeeded: "success",
  ok: "success",
  passed: "success",
  approved: "success",
  resolved: "success",
  paid: "success",
  delivered: "success",
  shipped: "success",
  fulfilled: "success",
  online: "success",
  healthy: "success",
  ready: "success",
  live: "success",
  enabled: "success",
  connected: "success",
  granted: "success",
  verified: "success",
  // ── warning: in-progress, needs-attention-but-not-broken ──
  pending: "warning",
  draft: "warning",
  queued: "warning",
  processing: "warning",
  review: "warning",
  in_review: "warning",
  waiting: "warning",
  trial: "warning",
  trialing: "warning",
  paused: "warning",
  warning: "warning",
  warn: "warning",
  degraded: "warning",
  expiring: "warning",
  unpaid: "warning",
  partial: "warning",
  backordered: "warning",
  // ── info: neutral-active, informational, transitional ──
  info: "info",
  running: "info",
  onboarding: "info",
  scheduled: "info",
  syncing: "info",
  updating: "info",
  in_progress: "info",
  new: "info",
  open: "info",
  invited: "info",
  steady: "info",
  rising: "info",
  // ── destructive: failed, terminated, blocked ──
  failed: "destructive",
  error: "destructive",
  errored: "destructive",
  critical: "destructive",
  overdue: "destructive",
  past_due: "destructive",
  delinquent: "destructive",
  revoked: "destructive",
  rejected: "destructive",
  denied: "destructive",
  cancelled: "destructive",
  canceled: "destructive",
  blocked: "destructive",
  suspended: "destructive",
  expired: "destructive",
  offline: "destructive",
  disabled: "destructive",
  archived: "destructive",
  banned: "destructive"
};
function NE(n, r) {
  if (n == null) return "neutral";
  const a = tg(n);
  if (r) {
    for (const u in r)
      if (tg(u) === a) return r[u];
  }
  return ME[a] ?? "neutral";
}
function RE(...n) {
  const r = n.filter((a) => a != null);
  if (r.length !== 0)
    return r.length === 1 ? r[0] : (a) => {
      for (const u of r)
        typeof u == "function" ? u(a) : u.current = a;
    };
}
const jE = (n) => /^on[A-Z]/.test(n);
function LE(...n) {
  const r = {};
  for (const a of n)
    if (a)
      for (const u of Object.keys(a)) {
        const s = a[u], f = r[u];
        if (u === "className")
          r[u] = gl(f, s);
        else if (u === "style")
          r[u] = { ...f, ...s };
        else if (u === "ref")
          r[u] = RE(f, s);
        else if (jE(u) && typeof s == "function" && typeof f == "function") {
          const d = f, m = s;
          r[u] = (...p) => (d(...p), m(...p));
        } else
          r[u] = s;
      }
  return r;
}
function Ic(n, r) {
  return typeof n == "function" ? n(r) : ye.cloneElement(n, LE(r, n.props));
}
const My = "inline-flex select-none items-center justify-center gap-x-2 whitespace-nowrap rounded-lg font-medium transition duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px motion-reduce:active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 disabled:active:translate-y-0", Ny = {
  primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary-700 hover:shadow-md active:bg-primary-800",
  secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-accent active:bg-accent",
  outline: "border border-border bg-card text-foreground shadow-xs hover:bg-muted active:bg-muted",
  ghost: "text-foreground hover:bg-muted active:bg-muted",
  /* For placement on constant-dark panels (bg-ink) — stay readable in both themes. */
  inverted: "bg-paper text-ink shadow-sm hover:bg-paper/90 active:bg-paper/80",
  "inverted-outline": "border border-paper/30 text-paper hover:border-paper/50 hover:bg-paper/10 active:bg-paper/15",
  /* Destructive action (delete/revoke). Mirrors primary's shadow/hover/active cadence
     via opacity steps (there is no destructive-700/800 ramp); the base focus-visible
     ring is shared across all variants. Closes the console Revoke-button gap. */
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md active:bg-destructive/80"
}, Ry = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base"
};
ye.forwardRef(
  function({ variant: r = "primary", size: a = "md", className: u, render: s, ...f }, d) {
    const m = gl(My, Ny[r], Ry[a], u);
    return s ? Ic(s, { "data-slot": "button", className: m, ref: d, ...f }) : /* @__PURE__ */ C.jsx(
      "button",
      {
        ref: d,
        "data-slot": "button",
        className: m,
        ...f
      }
    );
  }
);
const jy = ye.forwardRef(
  function({ variant: r = "primary", size: a = "md", className: u, render: s, ...f }, d) {
    const m = gl(My, Ny[r], Ry[a], u);
    return s ? Ic(s, { "data-slot": "button", className: m, ref: d, ...f }) : /* @__PURE__ */ C.jsx(
      "a",
      {
        ref: d,
        "data-slot": "button",
        className: m,
        ...f
      }
    );
  }
), UE = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary-100 text-primary-700",
  // Status tones (Banner slice-10 precedent): the tone rides a low-opacity tinted
  // fill + hairline border; the label stays `text-foreground` because the mid-tone
  // status tokens fail WCAG 4.5:1 as small text on light surfaces (CONVENTIONS §3).
  // `text-foreground` on the ~10% tint measures ~15:1 in both themes.
  success: "bg-success/10 text-foreground border border-success/30",
  warning: "bg-warning/10 text-foreground border border-warning/30",
  info: "bg-info/10 text-foreground border border-info/30",
  destructive: "bg-destructive/10 text-foreground border border-destructive/30"
};
function BE(n, r, a) {
  if (r == null) return n;
  const u = NE(r, a);
  return u === "neutral" ? "neutral" : u;
}
function Ly({ children: n, tone: r = "neutral", status: a, statusOverrides: u, className: s }) {
  const f = BE(r, a, u);
  return /* @__PURE__ */ C.jsx(
    "span",
    {
      "data-slot": "badge",
      className: gl(
        "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium",
        UE[f],
        s
      ),
      children: n
    }
  );
}
const HE = {
  white: "bg-card text-foreground border-border shadow-sm",
  muted: "bg-muted text-foreground border-border shadow-sm",
  solid: "bg-primary text-primary-foreground border-primary shadow-md",
  dark: "bg-ink text-paper border-ink shadow-md"
}, Uy = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-7 sm:p-8"
};
function qE({ as: n = "div", render: r, children: a, tone: u = "white", padding: s = "md", interactive: f = !1, className: d, ...m }) {
  const p = {
    "data-slot": "card-surface",
    className: gl(
      "flex flex-col rounded-xl border transition-shadow duration-200",
      HE[u],
      Uy[s],
      f && "hover:shadow-md focus-within:shadow-md",
      d
    ),
    children: a,
    ...m
  };
  return r ? Ic(r, p) : /* @__PURE__ */ C.jsx(n, { ...p });
}
function YE({ children: n, padding: r = "md", className: a }) {
  return /* @__PURE__ */ C.jsx("div", { "data-slot": "card-surface-body", className: gl("flex flex-1 flex-col", Uy[r], a), children: n });
}
function GE({ heading: n, items: r, className: a }) {
  return /* @__PURE__ */ C.jsxs("div", { "data-slot": "details-panel", className: gl("overflow-hidden rounded-xl border border-border bg-card shadow-sm", a), children: [
    n != null ? /* @__PURE__ */ C.jsx("div", { "data-slot": "details-panel-heading", className: "border-b border-border px-6 py-4", children: /* @__PURE__ */ C.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: n }) }) : null,
    /* @__PURE__ */ C.jsx("dl", { "data-slot": "details-panel-body", className: "divide-y divide-border", children: r.map((u, s) => /* @__PURE__ */ C.jsxs("div", { className: "flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6", children: [
      /* @__PURE__ */ C.jsx("dt", { className: "text-sm font-medium text-muted-foreground", children: u.term }),
      /* @__PURE__ */ C.jsx("dd", { className: "text-sm font-semibold text-foreground sm:text-right", children: u.value })
    ] }, s)) })
  ] });
}
const VE = {
  white: "white",
  muted: "muted",
  dark: "dark"
};
function XE({
  children: n,
  tone: r = "white",
  variant: a = "card",
  padding: u = "md",
  className: s
}) {
  return a === "open" ? /* @__PURE__ */ C.jsx("div", { "data-slot": "panel-shell", className: s, children: n }) : /* @__PURE__ */ C.jsx(
    qE,
    {
      "data-slot": "panel-shell",
      tone: VE[r],
      padding: "none",
      className: gl(a === "inset" && r === "white" && "shadow-none", s),
      children: /* @__PURE__ */ C.jsx(YE, { padding: u, children: n })
    }
  );
}
const QE = ye.lazy(
  () => import("./GuidedLabWorkbench-BgKlZ-f3.js").then((n) => ({ default: n.GuidedLabWorkbench }))
), hu = /* @__PURE__ */ new WeakMap(), By = "waku-learning-journal:v1";
let Hy = null, qy = null;
const Ua = () => ({
  goal: "",
  hypothesis: "",
  evidence: "",
  decision: "",
  correction: "",
  next_step: "",
  updated_at: ""
});
function ng(n) {
  try {
    const r = window.localStorage.getItem(`${By}:${n}`);
    return r ? { ...Ua(), ...JSON.parse(r) } : Ua();
  } catch {
    return Ua();
  }
}
function Tc(n) {
  Hy = n, window.dispatchEvent(new CustomEvent("waku-learning-context", { detail: n }));
}
function ZE(n) {
  qy = n, window.dispatchEvent(new CustomEvent("waku-lab-session", { detail: { sessionId: n } }));
}
function dc(n) {
  return n && !n.endsWith("Z") ? `${n.replace(" ", "T")}Z` : n;
}
async function KE(n) {
  const r = await fetch("/api/learning-journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
  }), a = await r.json();
  if (!r.ok || a.error || !a.journal)
    throw new Error(a.error || "Journal save failed");
  return a.journal;
}
const hc = [
  { name: "goal", label: "Session goal", prompt: "What would count as meaningful progress today?" },
  { name: "hypothesis", label: "Current hypothesis", prompt: "What do you think is happening, and why?" },
  { name: "evidence", label: "Evidence collected", prompt: "Commands, measurements, screenshots, and surprising results." },
  { name: "decision", label: "Decision made", prompt: "What did you choose, and which alternatives remain?" },
  { name: "correction", label: "What I misunderstood", prompt: "What changed in your mental model during this session?" },
  { name: "next_step", label: "Next session", prompt: "The exact unresolved question or next experiment." }
];
function lg({ chapter: n, track: r }) {
  const [a, u] = ye.useState(() => ng(n.number)), [s, f] = ye.useState(!1), [d, m] = ye.useState("ready");
  ye.useEffect(() => {
    window.localStorage.setItem(`${By}:${n.number}`, JSON.stringify(a)), Tc({ version: 1, chapter: n.number, track: r, journal: a });
  }, [n.number, a, r]), ye.useEffect(() => () => Tc(null), [n.number]), ye.useEffect(() => {
    let S = !0;
    const v = ng(n.number);
    return u(v), f(!1), m("ready"), fetch("/api/learning-journal?chapter=" + encodeURIComponent(n.number)).then((z) => z.json()).then((z) => {
      if (!S) return;
      const j = z.journal;
      if (j) {
        const H = {
          ...Ua(),
          ...j,
          updated_at: dc(j.updated_at)
        }, D = Date.parse(v.updated_at || "") || 0;
        (Date.parse(H.updated_at || "") || 0) >= D && u(H);
      }
      f(!0), m("saved");
    }).catch(() => {
      S && (f(!0), m("offline"));
    }), () => {
      S = !1;
    };
  }, [n.number]), ye.useEffect(() => {
    const S = () => {
      fetch("/api/learning-journal?chapter=" + encodeURIComponent(n.number)).then((v) => v.json()).then((v) => {
        const z = v.journal;
        z && u({ ...Ua(), ...z, updated_at: dc(z.updated_at) });
      }).catch(() => m("offline"));
    };
    return window.addEventListener("waku-journal-refresh", S), () => window.removeEventListener("waku-journal-refresh", S);
  }, [n.number]), ye.useEffect(() => {
    if (!s) return;
    m("saving");
    const S = window.setTimeout(() => {
      KE({ version: 1, chapter: n.number, track: r, journal: a }).then((v) => {
        u((z) => ({ ...z, updated_at: dc(v.updated_at) })), m("saved");
      }).catch(() => m("offline"));
    }, 450);
    return () => window.clearTimeout(S);
  }, [
    n.number,
    s,
    a.goal,
    a.hypothesis,
    a.evidence,
    a.decision,
    a.correction,
    a.next_step,
    r
  ]);
  const p = (S, v) => {
    u((z) => ({ ...z, [S]: v, updated_at: (/* @__PURE__ */ new Date()).toISOString() }));
  }, h = r === "engineer" ? "AI-engineer" : r === "architect" ? "Architect" : r === "lab" ? "Lab" : "Lesson", b = d === "saving" ? "Saving to Waku…" : d === "offline" ? "Offline draft" : a.updated_at ? `Saved ${new Date(a.updated_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "Ready for this session", y = hc.filter((S) => a[S.name].trim()).length;
  return /* @__PURE__ */ C.jsx("section", { "data-slot": "learning-journal", className: "wf-learning-journal mt-10 max-w-3xl rounded-xl border border-border bg-card", children: /* @__PURE__ */ C.jsxs("details", { children: [
    /* @__PURE__ */ C.jsxs("summary", { className: "wf-journal-summary", children: [
      /* @__PURE__ */ C.jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ C.jsx("span", { className: "wf-eyebrow", children: "Reflect and capture" }),
        /* @__PURE__ */ C.jsx("strong", { className: "mt-2 block text-xl tracking-tight text-foreground", children: "Learning journal" }),
        /* @__PURE__ */ C.jsx("span", { className: "mt-1 block text-sm leading-6 text-muted-foreground", children: y ? `${y} of ${hc.length} prompts captured for Chapter ${n.number}.` : "Open when you are ready to record what changed in your thinking." })
      ] }),
      /* @__PURE__ */ C.jsxs("span", { className: "flex shrink-0 items-center gap-3", children: [
        /* @__PURE__ */ C.jsxs("span", { className: "wf-journal-status", "aria-live": "polite", children: [
          /* @__PURE__ */ C.jsx("span", { className: "wf-journal-status-dot" }),
          b
        ] }),
        /* @__PURE__ */ C.jsx("span", { className: "wf-journal-chevron", "aria-hidden": "true", children: "⌄" })
      ] })
    ] }),
    /* @__PURE__ */ C.jsxs("div", { className: "wf-journal-body", children: [
      /* @__PURE__ */ C.jsxs("div", { className: "border-b border-border pb-5", children: [
        /* @__PURE__ */ C.jsxs("div", { className: "wf-eyebrow", children: [
          "Chapter ",
          n.number,
          " · ",
          h,
          " track"
        ] }),
        /* @__PURE__ */ C.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-muted-foreground", children: "Capture what you believed, what the evidence changed, and what you will try next. Waku receives these notes with chat so it can coach in context." })
      ] }),
      /* @__PURE__ */ C.jsx("div", { className: "mt-5 grid grid-cols-1 gap-4 md:grid-cols-2", children: hc.map((S) => /* @__PURE__ */ C.jsxs("label", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ C.jsx("span", { className: "text-xs font-bold text-foreground", children: S.label }),
        /* @__PURE__ */ C.jsx(
          "textarea",
          {
            value: a[S.name],
            onChange: (v) => p(S.name, v.target.value),
            placeholder: S.prompt,
            rows: 3,
            className: "wf-journal-input"
          }
        )
      ] }, S.name)) }),
      /* @__PURE__ */ C.jsx("p", { className: "mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground", children: "Saved in Waku's SQLite learning journal, with a browser draft for recovery. Journal context is sent to your configured model provider only when you chat with Waku. It does not mark a chapter complete; Git-backed checks remain the record." })
    ] })
  ] }) });
}
const FE = {
  passed: "Passed",
  current: "Current",
  available: "Available",
  roadmap: "Roadmap"
}, JE = {
  passed: "success",
  current: "warning",
  available: "primary",
  roadmap: "neutral"
};
function Yy({ chapter: n }) {
  return /* @__PURE__ */ C.jsx("span", { "data-slot": "status-badge", className: "inline-flex", children: /* @__PURE__ */ C.jsx(Ly, { tone: JE[n.status], children: FE[n.status] }) });
}
function Gy({ catalog: n }) {
  ye.useEffect(() => Tc(null), []);
  const r = n.chapters.find((u) => u.number === n.current), a = n.total ? Math.round(n.passed / n.total * 100) : 0;
  return /* @__PURE__ */ C.jsxs("div", { "data-slot": "curriculum-surface", className: "pb-8", children: [
    /* @__PURE__ */ C.jsxs("section", { "data-slot": "course-hero", className: "wf-course-hero", children: [
      /* @__PURE__ */ C.jsxs("div", { className: "wf-eyebrow", children: [
        "Production agent engineering · ",
        n.total,
        " chapters"
      ] }),
      /* @__PURE__ */ C.jsxs("h2", { className: "relative z-1 mt-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl", children: [
        "Build the agent.",
        /* @__PURE__ */ C.jsx("br", {}),
        "Break it at scale.",
        /* @__PURE__ */ C.jsx("br", {}),
        "Prove the repair."
      ] }),
      /* @__PURE__ */ C.jsx("p", { className: "relative z-1 mt-6 max-w-2xl text-[0.94rem] leading-7 text-white/80", children: "A self-directed path through the failures that separate an agent demo from a production system. Every runnable lesson starts with a scar and ends with evidence." }),
      /* @__PURE__ */ C.jsxs("div", { "data-slot": "course-progress", className: "relative z-1 mt-7 flex max-w-md items-center gap-4", children: [
        /* @__PURE__ */ C.jsxs("div", { className: "min-w-24", children: [
          /* @__PURE__ */ C.jsxs("strong", { className: "block text-base", children: [
            n.passed,
            " of ",
            n.total
          ] }),
          /* @__PURE__ */ C.jsx("span", { className: "text-[0.65rem] uppercase tracking-[0.08em] text-white/60", children: "chapters passed" })
        ] }),
        /* @__PURE__ */ C.jsx("div", { className: "wf-progress-track flex-1", "aria-label": `${a}% complete`, children: /* @__PURE__ */ C.jsx("span", { style: { width: `${a}%` } }) })
      ] }),
      r ? /* @__PURE__ */ C.jsxs(
        jy,
        {
          className: "relative z-1 mt-7 bg-[var(--wf-accent)] text-[#242019] hover:bg-[var(--wf-accent)]/90",
          href: `#learn/${r.number}`,
          children: [
            "Continue · Chapter ",
            r.number,
            " ",
            /* @__PURE__ */ C.jsx("span", { "aria-hidden": "true", children: "→" })
          ]
        }
      ) : null
    ] }),
    /* @__PURE__ */ C.jsxs("aside", { className: "mt-5 border-l-4 border-[var(--wf-accent)] bg-card px-4 py-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ C.jsx("strong", { className: "text-foreground", children: "How this path works." }),
      " Read the scar, choose the architect or AI-engineer track, reproduce the failure, then make the real check green. Git tags—not browser checkboxes—are the progress record."
    ] }),
    /* @__PURE__ */ C.jsx("div", { className: "mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2", children: n.phases.map((u, s) => {
      const f = u.chapters.map((m) => n.chapters.find((p) => p.number === m)).filter((m) => !!m), d = f.filter((m) => m.status === "passed").length;
      return /* @__PURE__ */ C.jsxs("section", { "data-slot": "course-phase", className: "wf-phase-card rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ C.jsx("div", { className: "wf-eyebrow pt-1", children: String(s + 1).padStart(2, "0") }),
        /* @__PURE__ */ C.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ C.jsxs("div", { className: "font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted-foreground", children: [
            d,
            " of ",
            f.length,
            " passed"
          ] }),
          /* @__PURE__ */ C.jsx("h3", { className: "mt-1 text-xl font-bold tracking-tight text-foreground", children: u.name }),
          /* @__PURE__ */ C.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: u.promise }),
          /* @__PURE__ */ C.jsx("div", { className: "mt-4 border-t border-border", children: f.map((m) => /* @__PURE__ */ C.jsxs(
            "a",
            {
              "data-slot": "lesson-row",
              href: `#learn/${m.number}`,
              className: "grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-3 text-foreground no-underline hover:text-primary",
              children: [
                /* @__PURE__ */ C.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: m.number }),
                /* @__PURE__ */ C.jsx("span", { className: "min-w-0 text-sm font-semibold", children: m.title }),
                /* @__PURE__ */ C.jsx(Yy, { chapter: m })
              ]
            },
            m.number
          )) })
        ] })
      ] }, u.id);
    }) })
  ] });
}
function IE({ markdown: n }) {
  return /* @__PURE__ */ C.jsx("article", { "data-slot": "lesson-content", className: "wf-markdown", children: /* @__PURE__ */ C.jsx(Ck, { remarkPlugins: [Y2], children: n }) });
}
function $E({ catalog: n, route: r }) {
  const [a, u = "brief"] = r.split("/"), s = n.chapters.findIndex((v) => v.number === a);
  if (s < 0) return /* @__PURE__ */ C.jsx(Gy, { catalog: n });
  const f = n.chapters[s], d = n.chapters[s - 1], m = n.chapters[s + 1], p = n.phases.find((v) => v.id === f.phase), h = u === "architect" || u === "engineer" || u === "lab" ? u : "brief", b = h === "brief" ? f.brief : h === "lab" ? "" : f.tracks[h], y = f.status === "current" ? "This is the active assignment. Run the failure first; only green evidence advances the course." : f.status === "passed" ? "Your repository records this chapter as passed. Revisit the evidence or compare approaches." : f.status === "available" ? "The instrument exists, but an earlier chapter is still active. Read ahead without fixing ahead." : "This module is designed but its deterministic failure instrument is not published yet. Preview it; do not treat it as runnable.", S = [
    ["brief", "Lesson"],
    ...f.tracks.architect ? [["architect", "Architect track"]] : [],
    ...f.tracks.engineer ? [["engineer", "AI-engineer track"]] : [],
    ["lab", "Lab"]
  ];
  return /* @__PURE__ */ C.jsxs("div", { "data-slot": "curriculum-surface", className: "pb-8", children: [
    /* @__PURE__ */ C.jsxs("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ C.jsx("a", { className: "text-primary no-underline", href: "#learn", children: "Curriculum" }),
      /* @__PURE__ */ C.jsx("span", { children: "/" }),
      /* @__PURE__ */ C.jsxs("span", { children: [
        "Chapter ",
        f.number
      ] })
    ] }),
    /* @__PURE__ */ C.jsxs("header", { className: "mt-7", children: [
      /* @__PURE__ */ C.jsxs("div", { className: "wf-eyebrow flex items-center gap-2", children: [
        "Chapter ",
        f.number,
        " · ",
        /* @__PURE__ */ C.jsx(Yy, { chapter: f })
      ] }),
      /* @__PURE__ */ C.jsx("h2", { className: "mt-5 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl", children: f.title }),
      /* @__PURE__ */ C.jsx("p", { className: "mt-4 max-w-3xl text-[0.94rem] leading-7 text-muted-foreground", children: f.summary }),
      /* @__PURE__ */ C.jsxs("div", { className: "wf-eyebrow mt-4", children: [
        "Competency · ",
        f.competency
      ] }),
      /* @__PURE__ */ C.jsx("section", { "data-slot": "lesson-contract", children: /* @__PURE__ */ C.jsx(
        GE,
        {
          className: "wf-lesson-contract mt-6",
          items: [
            { term: "Phase", value: p?.name ?? f.phase },
            { term: "Sequence", value: `${s + 1} of ${n.chapters.length}` },
            { term: "Prerequisite", value: d ? `Chapter ${d.number} · ${d.title}` : "Working harness" },
            { term: "Required evidence", value: f.runnable ? f.check : "Failure instrument pending" }
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ C.jsx("nav", { "data-slot": "lesson-tabs", "aria-label": "Lesson tracks", className: "mt-7 flex gap-1 overflow-x-auto border-b border-border", children: S.map(([v, z]) => /* @__PURE__ */ C.jsx(
      "a",
      {
        href: `#learn/${f.number}/${v}`,
        "aria-current": h === v ? "page" : void 0,
        className: `whitespace-nowrap border-b-3 px-4 py-3 text-sm font-semibold no-underline ${h === v ? "border-[var(--wf-accent)] text-[var(--wf-accent-strong)]" : "border-transparent text-muted-foreground hover:text-foreground"}`,
        children: z
      },
      v
    )) }),
    h === "lab" ? /* @__PURE__ */ C.jsx(ye.Suspense, { fallback: /* @__PURE__ */ C.jsx("p", { className: "mt-10 text-sm text-muted-foreground", role: "status", children: "Loading the lab workbench…" }), children: /* @__PURE__ */ C.jsx(
      QE,
      {
        chapter: f,
        journalPanel: /* @__PURE__ */ C.jsx(lg, { chapter: f, track: h }, f.number),
        onSessionChange: ZE
      }
    ) }) : /* @__PURE__ */ C.jsxs("a", { className: "wf-lab-callout", href: `#learn/${f.number}/lab`, children: [
      /* @__PURE__ */ C.jsxs("span", { children: [
        /* @__PURE__ */ C.jsx("span", { className: "wf-eyebrow", children: f.lab?.state === "preview" ? "Lab preview" : "Hands-on lab" }),
        /* @__PURE__ */ C.jsx("strong", { children: "Open lab workspace" }),
        /* @__PURE__ */ C.jsx("small", { children: f.lab?.scenario })
      ] }),
      /* @__PURE__ */ C.jsx("span", { "aria-hidden": "true", children: "→" })
    ] }),
    h !== "lab" ? /* @__PURE__ */ C.jsxs("div", { className: "mt-8 grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,1fr)_15.5rem]", children: [
      /* @__PURE__ */ C.jsxs("div", { className: "min-w-0 max-w-3xl", children: [
        /* @__PURE__ */ C.jsx(IE, { markdown: b }),
        /* @__PURE__ */ C.jsxs("section", { "data-slot": "knowledge-check", "aria-labelledby": "wf-knowledge-title", className: "mt-9 rounded-lg border border-border border-l-4 border-l-[var(--wf-accent)] bg-card p-6", children: [
          /* @__PURE__ */ C.jsx("div", { className: "wf-eyebrow", children: "Mastery reflection" }),
          /* @__PURE__ */ C.jsx("h3", { id: "wf-knowledge-title", className: "mt-3 text-xl font-bold text-foreground", children: "Knowledge check" }),
          /* @__PURE__ */ C.jsx("ol", { className: "mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-foreground", children: f.knowledge_checks.map((v) => /* @__PURE__ */ C.jsx("li", { children: v }, v)) }),
          /* @__PURE__ */ C.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "Answer these in your own words before treating a green check as mastery." })
        ] })
      ] }),
      /* @__PURE__ */ C.jsx("aside", { "data-slot": "assignment-panel", className: "sticky top-24", children: /* @__PURE__ */ C.jsxs(XE, { className: "border-t-3 border-t-[var(--wf-accent)]", padding: "md", children: [
        /* @__PURE__ */ C.jsx("div", { className: "wf-eyebrow", children: "Your assignment" }),
        /* @__PURE__ */ C.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: y }),
        /* @__PURE__ */ C.jsx("div", { className: "mt-4", children: f.runnable ? /* @__PURE__ */ C.jsx("code", { className: "block rounded border border-border bg-background px-3 py-2 text-xs", children: f.check }) : /* @__PURE__ */ C.jsx(Ly, { tone: "neutral", children: "Reading preview" }) }),
        f.runnable ? /* @__PURE__ */ C.jsx(jy, { className: "mt-3 w-full", size: "sm", href: `#${f.evidence_view}`, children: "Open live evidence →" }) : null,
        /* @__PURE__ */ C.jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
          /* @__PURE__ */ C.jsx("strong", { className: "text-xs text-foreground", children: "AI rule" }),
          /* @__PURE__ */ C.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Use your assistant as reviewer and rubber duck. You write the chapter solution." })
        ] })
      ] }) })
    ] }) : null,
    h !== "lab" ? /* @__PURE__ */ C.jsx(lg, { chapter: f, track: h }, f.number) : null,
    /* @__PURE__ */ C.jsxs("nav", { "data-slot": "lesson-pagination", "aria-label": "Adjacent lessons", className: "mt-11 grid grid-cols-2 gap-4 border-t border-border pt-6", children: [
      d ? /* @__PURE__ */ C.jsxs("a", { className: "rounded-lg border border-border bg-card p-4 text-foreground no-underline hover:border-primary", href: `#learn/${d.number}`, children: [
        /* @__PURE__ */ C.jsx("span", { className: "block text-[0.62rem] uppercase tracking-wider text-muted-foreground", children: "← Previous" }),
        /* @__PURE__ */ C.jsx("strong", { className: "mt-1 block text-sm", children: d.title })
      ] }) : /* @__PURE__ */ C.jsx("span", {}),
      m ? /* @__PURE__ */ C.jsxs("a", { className: "rounded-lg border border-border bg-card p-4 text-right text-foreground no-underline hover:border-primary", href: `#learn/${m.number}`, children: [
        /* @__PURE__ */ C.jsx("span", { className: "block text-[0.62rem] uppercase tracking-wider text-muted-foreground", children: "Next →" }),
        /* @__PURE__ */ C.jsx("strong", { className: "mt-1 block text-sm", children: m.title })
      ] }) : /* @__PURE__ */ C.jsx("span", {})
    ] })
  ] });
}
function WE({ catalog: n, route: r }) {
  return r ? /* @__PURE__ */ C.jsx($E, { catalog: n, route: r }) : /* @__PURE__ */ C.jsx(Gy, { catalog: n });
}
window.WakuCurriculum = {
  render(n, r, a) {
    let u = hu.get(n);
    u || (u = cg.createRoot(n), hu.set(n, u)), u.render(/* @__PURE__ */ C.jsx(WE, { catalog: r, route: a }));
  },
  unmount(n) {
    const r = hu.get(n);
    r && (r.unmount(), hu.delete(n));
  },
  getLearningContext() {
    return Hy;
  },
  getLabSessionId() {
    return qy;
  }
};
window.dispatchEvent(new Event("waku-curriculum-ready"));
const ig = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, ag = Kc, Vy = (n, r) => (a) => {
  var u;
  if (r?.variants == null) return ag(n, a?.class, a?.className);
  const { variants: s, defaultVariants: f } = r, d = Object.keys(s).map((h) => {
    const b = a?.[h], y = f?.[h];
    if (b === null) return null;
    const S = ig(b) || ig(y);
    return s[h][S];
  }), m = a && Object.entries(a).reduce((h, b) => {
    let [y, S] = b;
    return S === void 0 || (h[y] = S), h;
  }, {}), p = r == null || (u = r.compoundVariants) === null || u === void 0 ? void 0 : u.reduce((h, b) => {
    let { class: y, className: S, ...v } = b;
    return Object.entries(v).every((z) => {
      let [j, H] = z;
      return Array.isArray(H) ? H.includes({
        ...f,
        ...m
      }[j]) : {
        ...f,
        ...m
      }[j] === H;
    }) ? [
      ...h,
      y,
      S
    ] : h;
  }, []);
  return ag(n, d, p, a?.class, a?.className);
};
function Xy(...n) {
  return Dy(Kc(n));
}
const PE = Vy(
  "inline-flex items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ez({ className: n, variant: r, ...a }) {
  return /* @__PURE__ */ C.jsx("div", { className: Xy(PE({ variant: r }), n), ...a });
}
function rg(n, r) {
  if (typeof n == "function")
    return n(r);
  n != null && (n.current = r);
}
function tz(...n) {
  return (r) => {
    let a = !1;
    const u = n.map((s) => {
      const f = rg(s, r);
      return !a && typeof f == "function" && (a = !0), f;
    });
    if (a)
      return () => {
        for (let s = 0; s < u.length; s++) {
          const f = u[s];
          typeof f == "function" ? f() : rg(n[s], null);
        }
      };
  };
}
function nz(...n) {
  return ye.useCallback(tz(...n), n);
}
// @__NO_SIDE_EFFECTS__
function lz(n) {
  const r = ye.forwardRef((a, u) => {
    let { children: s, ...f } = a, d = null, m = !1;
    const p = [];
    ug(s) && typeof mu == "function" && (s = mu(s._payload)), ye.Children.forEach(s, (S) => {
      if (sz(S)) {
        m = !0;
        const v = S;
        let z = "child" in v.props ? v.props.child : v.props.children;
        ug(z) && typeof mu == "function" && (z = mu(z._payload)), d = rz(v, z), p.push(d?.props?.children);
      } else
        p.push(S);
    }), d ? d = ye.cloneElement(d, void 0, p) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && ye.Children.count(s) === 1 && ye.isValidElement(s) && (d = s)
    );
    const h = d ? oz(d) : void 0, b = nz(u, h);
    if (!d) {
      if (s || s === 0)
        throw new Error(
          m ? hz(n) : dz(n)
        );
      return s;
    }
    const y = uz(f, d.props ?? {});
    return d.type !== ye.Fragment && (y.ref = u ? b : h), ye.cloneElement(d, y);
  });
  return r.displayName = `${n}.Slot`, r;
}
var iz = /* @__PURE__ */ lz("Slot"), az = /* @__PURE__ */ Symbol.for("radix.slottable"), rz = (n, r) => {
  if ("child" in n.props) {
    const a = n.props.child;
    return ye.isValidElement(a) ? ye.cloneElement(a, void 0, n.props.children(a.props.children)) : null;
  }
  return ye.isValidElement(r) ? r : null;
};
function uz(n, r) {
  const a = { ...r };
  for (const u in r) {
    const s = n[u], f = r[u];
    /^on[A-Z]/.test(u) ? s && f ? a[u] = (...m) => {
      const p = f(...m);
      return s(...m), p;
    } : s && (a[u] = s) : u === "style" ? a[u] = { ...s, ...f } : u === "className" && (a[u] = [s, f].filter(Boolean).join(" "));
  }
  return { ...n, ...a };
}
function oz(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning;
  return a ? n.ref : (r = Object.getOwnPropertyDescriptor(n, "ref")?.get, a = r && "isReactWarning" in r && r.isReactWarning, a ? n.props.ref : n.props.ref || n.ref);
}
function sz(n) {
  return ye.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === az;
}
var cz = /* @__PURE__ */ Symbol.for("react.lazy");
function ug(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === cz && "_payload" in n && fz(n._payload);
}
function fz(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
var dz = (n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, hz = (n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, mu = yv[" use ".trim().toString()];
const mz = Vy(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), $c = ye.forwardRef(
  ({ className: n, variant: r, size: a, asChild: u = !1, ...s }, f) => {
    const d = u ? iz : "button";
    return /* @__PURE__ */ C.jsx(
      d,
      {
        className: Xy(mz({ variant: r, size: a, className: n })),
        ref: f,
        ...s
      }
    );
  }
);
$c.displayName = "Button";
const Qy = ye.createContext(null);
function Wc() {
  const n = ye.useContext(Qy);
  if (!n) throw new Error("useDashboard must be used inside DashboardProvider");
  return n;
}
function pz({ children: n }) {
  const [r, a] = ye.useState(null), [u, s] = ye.useState(null), [f, d] = ye.useState(Date.now()), [m, p] = ye.useState(0), h = ye.useRef(null), b = ye.useRef({ cursor: null, events: [] });
  return ye.useEffect(() => {
    let y = !1;
    const S = async () => {
      try {
        const Z = [fetch("/api/data").then((re) => re.json())];
        h.current || Z.push(fetch("/api/curriculum").then((re) => re.json()));
        const Y = await Promise.all(Z);
        if (y) return;
        a(Y[0]), Y[1] && (h.current = Y[1], s(h.current)), d(Date.now());
      } catch {
      }
    };
    window.WakuRefresh = S, S();
    const v = setInterval(S, 5e3), z = setInterval(() => p((Z) => Z + 1), 1e3);
    let j = null;
    const H = async () => {
      try {
        const Z = await (await fetch("/api/events" + (j == null ? "" : "?cursor=" + j))).json();
        if (j != null && Array.isArray(Z.events) && Z.events.length) {
          const Y = b.current;
          Y.events.push(...Z.events), Y.events.length > 500 && Y.events.splice(0, Y.events.length - 500);
        }
        j = Z.cursor, b.current.cursor = j;
      } catch {
      }
    };
    H();
    const D = setInterval(H, 450);
    return () => {
      y = !0, clearInterval(v), clearInterval(z), clearInterval(D), delete window.WakuRefresh;
    };
  }, []), /* @__PURE__ */ C.jsx(Qy.Provider, { value: { D: r, curriculum: u, lastFetch: f, tick: m, eventsRef: b }, children: n });
}
function gz() {
  const n = ye.useRef(null);
  return ye.useEffect(() => (window.WakuLegacy?.mount(n.current), () => window.WakuLegacy?.mount(null)), []), /* @__PURE__ */ C.jsx("div", { id: "view", className: "legacy-view", ref: n });
}
function yz({
  catalog: n,
  sub: r
}) {
  const a = ye.useRef(null);
  return ye.useEffect(() => {
    const u = a.current;
    !u || !n || !window.WakuCurriculum || window.WakuCurriculum.render(u, n, r);
  }, [n, r]), ye.useEffect(
    () => () => {
      const u = a.current;
      u && window.WakuCurriculum && window.WakuCurriculum.unmount(u);
    },
    []
  ), /* @__PURE__ */ C.jsx("div", { id: "view", children: n ? /* @__PURE__ */ C.jsx("div", { id: "curriculum-react-root", ref: a }) : /* @__PURE__ */ C.jsx("div", { className: "card empty", children: "loading the curriculum…" }) });
}
const bz = [
  "learn",
  "overview",
  "gateway",
  "loop",
  "memory",
  "tools",
  "database",
  "ops",
  "settings"
];
function og() {
  const n = (window.location.hash || "#learn").slice(1).split("/"), r = n.shift() || "learn", a = n.join("/") || null;
  return { view: bz.includes(r) ? r : "learn", sub: a, raw: r };
}
function vz(n, r) {
  if (!n) return { learn: "", gw: "", loop: "", mem: "", tools: "", db: "", ops: "" };
  const a = r && r.current;
  return {
    learn: a ? String(a) : "✓",
    gw: String((n.chat_log || []).length),
    loop: String(n.stats.turns),
    mem: String(n.facts.length + n.episodes.length),
    tools: String(n.calendar.length + n.outbox.length),
    db: String(n.db && n.db.all_tables.length || ""),
    ops: String(n.stats.tool_errors || (n.eval_report ? "" : "!"))
  };
}
function xz({ id: n, children: r }) {
  return /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
    " ",
    /* @__PURE__ */ C.jsx(
      ez,
      {
        variant: "secondary",
        id: n,
        className: "n rounded-none border-transparent bg-transparent px-0 py-0 font-normal [a&]:hover:bg-transparent hover:bg-transparent",
        children: r
      }
    )
  ] });
}
function Bn({
  v: n,
  route: r,
  label: a,
  count: u,
  countId: s
}) {
  return /* @__PURE__ */ C.jsxs("a", { href: `#${n}`, "data-v": n, className: r.view === n ? "on" : "", children: [
    a,
    u !== void 0 && s ? /* @__PURE__ */ C.jsx(xz, { id: s, children: u }) : null
  ] });
}
function Sz({ route: n }) {
  const { D: r, curriculum: a } = Wc(), u = vz(r, a);
  return /* @__PURE__ */ C.jsxs("nav", { id: "nav", children: [
    /* @__PURE__ */ C.jsxs("div", { className: "brand", children: [
      "Waku わく",
      /* @__PURE__ */ C.jsx(
        "small",
        {
          id: "model",
          style: { cursor: "pointer" },
          title: "click to change the model",
          onClick: () => {
            window.location.hash = "#settings";
          },
          children: r ? `${r.provider} · ${r.model}` : ""
        }
      ),
      /* @__PURE__ */ C.jsx(
        $c,
        {
          variant: "ghost",
          size: "icon",
          id: "nav-toggle",
          title: "Hide sidebar",
          "aria-label": "Hide sidebar",
          className: "h-auto w-auto rounded-none font-[650] transition-none focus-visible:ring-0",
          children: "❮"
        }
      )
    ] }),
    /* @__PURE__ */ C.jsx("div", { className: "grp", children: "Learn" }),
    /* @__PURE__ */ C.jsx(Bn, { v: "learn", route: n, label: "Curriculum", count: u.learn, countId: "n-learn" }),
    /* @__PURE__ */ C.jsxs("div", { id: "system-nav", children: [
      /* @__PURE__ */ C.jsx("div", { className: "grp", children: "Evidence workspace" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "overview", route: n, label: "Overview" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "gateway", route: n, label: "Gateway", count: u.gw, countId: "n-gw" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "loop", route: n, label: "Loop", count: u.loop, countId: "n-loop" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "memory", route: n, label: "Memory", count: u.mem, countId: "n-mem" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "tools", route: n, label: "Tools", count: u.tools, countId: "n-tools" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "database", route: n, label: "Database", count: u.db, countId: "n-db" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "ops", route: n, label: "Ops", count: u.ops, countId: "n-ops" }),
      /* @__PURE__ */ C.jsx(Bn, { v: "settings", route: n, label: "Settings" })
    ] })
  ] });
}
function kz({ route: n }) {
  const { D: r, curriculum: a, lastFetch: u, tick: s } = Wc();
  if (!r) return null;
  const f = Math.round((Date.now() - u) / 1e3);
  if (n === "learn")
    return /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
      "self-directed · repository-backed progress · current chapter",
      " ",
      a && a.current || "—"
    ] });
  const d = window.WakuLegacy?.VIEW_SUBTITLES ?? {};
  return /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
    /* @__PURE__ */ C.jsxs("span", { className: "live", children: [
      /* @__PURE__ */ C.jsx("span", { className: "dot" }),
      "live"
    ] }),
    ` · updated ${f}s ago · ${d[n] || "agent evidence workspace"}`
  ] });
}
function wz() {
  const { D: n, curriculum: r } = Wc(), [a, u] = ye.useState(og), s = ye.useRef(null);
  ye.useEffect(() => {
    const m = () => u(og());
    return window.addEventListener("hashchange", m), () => window.removeEventListener("hashchange", m);
  }, []), ye.useEffect(() => {
    window.WakuLegacy?.update(a.view, a.sub, n, r);
  }, [a.view, a.sub, n, r]), ye.useEffect(() => {
    const m = s.current;
    if (!m) return;
    const p = (h) => {
      h.preventDefault(), document.body.classList.add("resizing");
      const b = (S) => {
        const v = Math.max(150, Math.min(380, S.clientX));
        document.documentElement.style.setProperty("--nav-w", v + "px"), localStorage.setItem("navW", String(v));
      }, y = () => {
        document.body.classList.remove("resizing"), document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", y);
      };
      document.addEventListener("mousemove", b), document.addEventListener("mouseup", y);
    };
    return m.addEventListener("mousedown", p), () => m.removeEventListener("mousedown", p);
  }, []);
  const d = (window.WakuLegacy?.TITLES ?? {})[a.view] || a.view[0].toUpperCase() + a.view.slice(1);
  return /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
    /* @__PURE__ */ C.jsx(Sz, { route: a }),
    /* @__PURE__ */ C.jsx("div", { className: "resizer", id: "nav-resizer", title: "Drag to resize sidebar", ref: s }),
    /* @__PURE__ */ C.jsxs("main", { children: [
      /* @__PURE__ */ C.jsxs("header", { className: "pagehead", children: [
        /* @__PURE__ */ C.jsx("h1", { id: "title", children: d }),
        /* @__PURE__ */ C.jsx("div", { className: "sub", id: "sub", children: /* @__PURE__ */ C.jsx(kz, { route: a.raw }) })
      ] }),
      a.view === "learn" ? /* @__PURE__ */ C.jsx(yz, { catalog: r, sub: a.sub }) : /* @__PURE__ */ C.jsx(gz, {})
    ] }),
    /* @__PURE__ */ C.jsx(
      $c,
      {
        variant: "ghost",
        id: "nav-reopen",
        title: "Show sidebar",
        "aria-label": "Show sidebar",
        className: "rounded-none px-0 py-0 font-normal transition-none focus-visible:ring-0",
        children: "☰"
      }
    )
  ] });
}
function Ez() {
  return /* @__PURE__ */ C.jsx(pz, { children: /* @__PURE__ */ C.jsx(wz, {}) });
}
const sg = document.getElementById("root");
sg && cg.createRoot(sg).render(/* @__PURE__ */ C.jsx(Ez, {}));
export {
  Ck as M,
  Y2 as a,
  C as j,
  ye as r
};
