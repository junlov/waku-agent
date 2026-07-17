function Wp(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var qs = { exports: {} }, Ta = {};
var Qm;
function G1() {
  if (Qm) return Ta;
  Qm = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
  function a(u, c, d) {
    var f = null;
    if (d !== void 0 && (f = "" + d), c.key !== void 0 && (f = "" + c.key), "key" in c) {
      d = {};
      for (var m in c)
        m !== "key" && (d[m] = c[m]);
    } else d = c;
    return c = d.ref, {
      $$typeof: n,
      type: u,
      key: f,
      ref: c !== void 0 ? c : null,
      props: d
    };
  }
  return Ta.Fragment = r, Ta.jsx = a, Ta.jsxs = a, Ta;
}
var Zm;
function V1() {
  return Zm || (Zm = 1, qs.exports = /* @__PURE__ */ G1()), qs.exports;
}
var _ = /* @__PURE__ */ V1(), Ys = { exports: {} }, xe = {};
var Km;
function X1() {
  if (Km) return xe;
  Km = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), a = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), S = Symbol.iterator;
  function v(z) {
    return z === null || typeof z != "object" ? null : (z = S && z[S] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var T = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, L = Object.assign, j = {};
  function O(z, Y, w) {
    this.props = z, this.context = Y, this.refs = j, this.updater = w || T;
  }
  O.prototype.isReactComponent = {}, O.prototype.setState = function(z, Y) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, Y, "setState");
  }, O.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function Z() {
  }
  Z.prototype = O.prototype;
  function G(z, Y, w) {
    this.props = z, this.context = Y, this.refs = j, this.updater = w || T;
  }
  var le = G.prototype = new Z();
  le.constructor = G, L(le, O.prototype), le.isPureReactComponent = !0;
  var fe = Array.isArray;
  function H() {
  }
  var $ = { H: null, A: null, T: null, S: null }, K = Object.prototype.hasOwnProperty;
  function de(z, Y, w) {
    var P = w.ref;
    return {
      $$typeof: n,
      type: z,
      key: Y,
      ref: P !== void 0 ? P : null,
      props: w
    };
  }
  function U(z, Y) {
    return de(z.type, Y, z.props);
  }
  function te(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function ee(z) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(w) {
      return Y[w];
    });
  }
  var Ee = /\/+/g;
  function ue(z, Y) {
    return typeof z == "object" && z !== null && z.key != null ? ee("" + z.key) : Y.toString(36);
  }
  function I(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(H, H) : (z.status = "pending", z.then(
          function(Y) {
            z.status === "pending" && (z.status = "fulfilled", z.value = Y);
          },
          function(Y) {
            z.status === "pending" && (z.status = "rejected", z.reason = Y);
          }
        )), z.status) {
          case "fulfilled":
            return z.value;
          case "rejected":
            throw z.reason;
        }
    }
    throw z;
  }
  function D(z, Y, w, P, ae) {
    var ne = typeof z;
    (ne === "undefined" || ne === "boolean") && (z = null);
    var ke = !1;
    if (z === null) ke = !0;
    else
      switch (ne) {
        case "bigint":
        case "string":
        case "number":
          ke = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case n:
            case r:
              ke = !0;
              break;
            case b:
              return ke = z._init, D(
                ke(z._payload),
                Y,
                w,
                P,
                ae
              );
          }
      }
    if (ke)
      return ae = ae(z), ke = P === "" ? "." + ue(z, 0) : P, fe(ae) ? (w = "", ke != null && (w = ke.replace(Ee, "$&/") + "/"), D(ae, Y, w, "", function(vt) {
        return vt;
      })) : ae != null && (te(ae) && (ae = U(
        ae,
        w + (ae.key == null || z && z.key === ae.key ? "" : ("" + ae.key).replace(
          Ee,
          "$&/"
        ) + "/") + ke
      )), Y.push(ae)), 1;
    ke = 0;
    var Ve = P === "" ? "." : P + ":";
    if (fe(z))
      for (var ye = 0; ye < z.length; ye++)
        P = z[ye], ne = Ve + ue(P, ye), ke += D(
          P,
          Y,
          w,
          ne,
          ae
        );
    else if (ye = v(z), typeof ye == "function")
      for (z = ye.call(z), ye = 0; !(P = z.next()).done; )
        P = P.value, ne = Ve + ue(P, ye++), ke += D(
          P,
          Y,
          w,
          ne,
          ae
        );
    else if (ne === "object") {
      if (typeof z.then == "function")
        return D(
          I(z),
          Y,
          w,
          P,
          ae
        );
      throw Y = String(z), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ke;
  }
  function F(z, Y, w) {
    if (z == null) return z;
    var P = [], ae = 0;
    return D(z, P, "", "", function(ne) {
      return Y.call(w, ne, ae++);
    }), P;
  }
  function se(z) {
    if (z._status === -1) {
      var Y = z._result;
      Y = Y(), Y.then(
        function(w) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = w);
        },
        function(w) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = w);
        }
      ), z._status === -1 && (z._status = 0, z._result = Y);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  }, k = {
    map: F,
    forEach: function(z, Y, w) {
      F(
        z,
        function() {
          Y.apply(this, arguments);
        },
        w
      );
    },
    count: function(z) {
      var Y = 0;
      return F(z, function() {
        Y++;
      }), Y;
    },
    toArray: function(z) {
      return F(z, function(Y) {
        return Y;
      }) || [];
    },
    only: function(z) {
      if (!te(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  };
  return xe.Activity = y, xe.Children = k, xe.Component = O, xe.Fragment = a, xe.Profiler = c, xe.PureComponent = G, xe.StrictMode = u, xe.Suspense = p, xe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, xe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return $.H.useMemoCache(z);
    }
  }, xe.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, xe.cacheSignal = function() {
    return null;
  }, xe.cloneElement = function(z, Y, w) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var P = L({}, z.props), ae = z.key;
    if (Y != null)
      for (ne in Y.key !== void 0 && (ae = "" + Y.key), Y)
        !K.call(Y, ne) || ne === "key" || ne === "__self" || ne === "__source" || ne === "ref" && Y.ref === void 0 || (P[ne] = Y[ne]);
    var ne = arguments.length - 2;
    if (ne === 1) P.children = w;
    else if (1 < ne) {
      for (var ke = Array(ne), Ve = 0; Ve < ne; Ve++)
        ke[Ve] = arguments[Ve + 2];
      P.children = ke;
    }
    return de(z.type, ae, P);
  }, xe.createContext = function(z) {
    return z = {
      $$typeof: f,
      _currentValue: z,
      _currentValue2: z,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, z.Provider = z, z.Consumer = {
      $$typeof: d,
      _context: z
    }, z;
  }, xe.createElement = function(z, Y, w) {
    var P, ae = {}, ne = null;
    if (Y != null)
      for (P in Y.key !== void 0 && (ne = "" + Y.key), Y)
        K.call(Y, P) && P !== "key" && P !== "__self" && P !== "__source" && (ae[P] = Y[P]);
    var ke = arguments.length - 2;
    if (ke === 1) ae.children = w;
    else if (1 < ke) {
      for (var Ve = Array(ke), ye = 0; ye < ke; ye++)
        Ve[ye] = arguments[ye + 2];
      ae.children = Ve;
    }
    if (z && z.defaultProps)
      for (P in ke = z.defaultProps, ke)
        ae[P] === void 0 && (ae[P] = ke[P]);
    return de(z, ne, ae);
  }, xe.createRef = function() {
    return { current: null };
  }, xe.forwardRef = function(z) {
    return { $$typeof: m, render: z };
  }, xe.isValidElement = te, xe.lazy = function(z) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: z },
      _init: se
    };
  }, xe.memo = function(z, Y) {
    return {
      $$typeof: h,
      type: z,
      compare: Y === void 0 ? null : Y
    };
  }, xe.startTransition = function(z) {
    var Y = $.T, w = {};
    $.T = w;
    try {
      var P = z(), ae = $.S;
      ae !== null && ae(w, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(H, ve);
    } catch (ne) {
      ve(ne);
    } finally {
      Y !== null && w.types !== null && (Y.types = w.types), $.T = Y;
    }
  }, xe.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, xe.use = function(z) {
    return $.H.use(z);
  }, xe.useActionState = function(z, Y, w) {
    return $.H.useActionState(z, Y, w);
  }, xe.useCallback = function(z, Y) {
    return $.H.useCallback(z, Y);
  }, xe.useContext = function(z) {
    return $.H.useContext(z);
  }, xe.useDebugValue = function() {
  }, xe.useDeferredValue = function(z, Y) {
    return $.H.useDeferredValue(z, Y);
  }, xe.useEffect = function(z, Y) {
    return $.H.useEffect(z, Y);
  }, xe.useEffectEvent = function(z) {
    return $.H.useEffectEvent(z);
  }, xe.useId = function() {
    return $.H.useId();
  }, xe.useImperativeHandle = function(z, Y, w) {
    return $.H.useImperativeHandle(z, Y, w);
  }, xe.useInsertionEffect = function(z, Y) {
    return $.H.useInsertionEffect(z, Y);
  }, xe.useLayoutEffect = function(z, Y) {
    return $.H.useLayoutEffect(z, Y);
  }, xe.useMemo = function(z, Y) {
    return $.H.useMemo(z, Y);
  }, xe.useOptimistic = function(z, Y) {
    return $.H.useOptimistic(z, Y);
  }, xe.useReducer = function(z, Y, w) {
    return $.H.useReducer(z, Y, w);
  }, xe.useRef = function(z) {
    return $.H.useRef(z);
  }, xe.useState = function(z) {
    return $.H.useState(z);
  }, xe.useSyncExternalStore = function(z, Y, w) {
    return $.H.useSyncExternalStore(
      z,
      Y,
      w
    );
  }, xe.useTransition = function() {
    return $.H.useTransition();
  }, xe.version = "19.2.7", xe;
}
var Fm;
function zc() {
  return Fm || (Fm = 1, Ys.exports = /* @__PURE__ */ X1()), Ys.exports;
}
var gt = /* @__PURE__ */ zc(), Gs = { exports: {} }, Aa = {}, Vs = { exports: {} }, Xs = {};
var Jm;
function Q1() {
  return Jm || (Jm = 1, (function(n) {
    function r(D, F) {
      var se = D.length;
      D.push(F);
      e: for (; 0 < se; ) {
        var ve = se - 1 >>> 1, k = D[ve];
        if (0 < c(k, F))
          D[ve] = F, D[se] = k, se = ve;
        else break e;
      }
    }
    function a(D) {
      return D.length === 0 ? null : D[0];
    }
    function u(D) {
      if (D.length === 0) return null;
      var F = D[0], se = D.pop();
      if (se !== F) {
        D[0] = se;
        e: for (var ve = 0, k = D.length, z = k >>> 1; ve < z; ) {
          var Y = 2 * (ve + 1) - 1, w = D[Y], P = Y + 1, ae = D[P];
          if (0 > c(w, se))
            P < k && 0 > c(ae, w) ? (D[ve] = ae, D[P] = se, ve = P) : (D[ve] = w, D[Y] = se, ve = Y);
          else if (P < k && 0 > c(ae, se))
            D[ve] = ae, D[P] = se, ve = P;
          else break e;
        }
      }
      return F;
    }
    function c(D, F) {
      var se = D.sortIndex - F.sortIndex;
      return se !== 0 ? se : D.id - F.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      n.unstable_now = function() {
        return d.now();
      };
    } else {
      var f = Date, m = f.now();
      n.unstable_now = function() {
        return f.now() - m;
      };
    }
    var p = [], h = [], b = 1, y = null, S = 3, v = !1, T = !1, L = !1, j = !1, O = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, G = typeof setImmediate < "u" ? setImmediate : null;
    function le(D) {
      for (var F = a(h); F !== null; ) {
        if (F.callback === null) u(h);
        else if (F.startTime <= D)
          u(h), F.sortIndex = F.expirationTime, r(p, F);
        else break;
        F = a(h);
      }
    }
    function fe(D) {
      if (L = !1, le(D), !T)
        if (a(p) !== null)
          T = !0, H || (H = !0, ee());
        else {
          var F = a(h);
          F !== null && I(fe, F.startTime - D);
        }
    }
    var H = !1, $ = -1, K = 5, de = -1;
    function U() {
      return j ? !0 : !(n.unstable_now() - de < K);
    }
    function te() {
      if (j = !1, H) {
        var D = n.unstable_now();
        de = D;
        var F = !0;
        try {
          e: {
            T = !1, L && (L = !1, Z($), $ = -1), v = !0;
            var se = S;
            try {
              t: {
                for (le(D), y = a(p); y !== null && !(y.expirationTime > D && U()); ) {
                  var ve = y.callback;
                  if (typeof ve == "function") {
                    y.callback = null, S = y.priorityLevel;
                    var k = ve(
                      y.expirationTime <= D
                    );
                    if (D = n.unstable_now(), typeof k == "function") {
                      y.callback = k, le(D), F = !0;
                      break t;
                    }
                    y === a(p) && u(p), le(D);
                  } else u(p);
                  y = a(p);
                }
                if (y !== null) F = !0;
                else {
                  var z = a(h);
                  z !== null && I(
                    fe,
                    z.startTime - D
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
          F ? ee() : H = !1;
        }
      }
    }
    var ee;
    if (typeof G == "function")
      ee = function() {
        G(te);
      };
    else if (typeof MessageChannel < "u") {
      var Ee = new MessageChannel(), ue = Ee.port2;
      Ee.port1.onmessage = te, ee = function() {
        ue.postMessage(null);
      };
    } else
      ee = function() {
        O(te, 0);
      };
    function I(D, F) {
      $ = O(function() {
        D(n.unstable_now());
      }, F);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, n.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : K = 0 < D ? Math.floor(1e3 / D) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(D) {
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
        return D();
      } finally {
        S = se;
      }
    }, n.unstable_requestPaint = function() {
      j = !0;
    }, n.unstable_runWithPriority = function(D, F) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var se = S;
      S = D;
      try {
        return F();
      } finally {
        S = se;
      }
    }, n.unstable_scheduleCallback = function(D, F, se) {
      var ve = n.unstable_now();
      switch (typeof se == "object" && se !== null ? (se = se.delay, se = typeof se == "number" && 0 < se ? ve + se : ve) : se = ve, D) {
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
      return k = se + k, D = {
        id: b++,
        callback: F,
        priorityLevel: D,
        startTime: se,
        expirationTime: k,
        sortIndex: -1
      }, se > ve ? (D.sortIndex = se, r(h, D), a(p) === null && D === a(h) && (L ? (Z($), $ = -1) : L = !0, I(fe, se - ve))) : (D.sortIndex = k, r(p, D), T || v || (T = !0, H || (H = !0, ee()))), D;
    }, n.unstable_shouldYield = U, n.unstable_wrapCallback = function(D) {
      var F = S;
      return function() {
        var se = S;
        S = F;
        try {
          return D.apply(this, arguments);
        } finally {
          S = se;
        }
      };
    };
  })(Xs)), Xs;
}
var Im;
function Z1() {
  return Im || (Im = 1, Vs.exports = /* @__PURE__ */ Q1()), Vs.exports;
}
var Qs = { exports: {} }, yt = {};
var $m;
function K1() {
  if ($m) return yt;
  $m = 1;
  var n = /* @__PURE__ */ zc();
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
  }, c = /* @__PURE__ */ Symbol.for("react.portal");
  function d(p, h, b) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: h,
      implementation: b
    };
  }
  var f = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, yt.createPortal = function(p, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(r(299));
    return d(p, h, null, b);
  }, yt.flushSync = function(p) {
    var h = f.T, b = u.p;
    try {
      if (f.T = null, u.p = 2, p) return p();
    } finally {
      f.T = h, u.p = b, u.d.f();
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
    return f.H.useFormState(p, h, b);
  }, yt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, yt.version = "19.2.7", yt;
}
var Wm;
function F1() {
  if (Wm) return Qs.exports;
  Wm = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Qs.exports = /* @__PURE__ */ K1(), Qs.exports;
}
var Pm;
function J1() {
  if (Pm) return Aa;
  Pm = 1;
  var n = /* @__PURE__ */ Z1(), r = /* @__PURE__ */ zc(), a = /* @__PURE__ */ F1();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
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
  function f(e) {
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
    if (d(e) !== e)
      throw Error(u(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var l = e, i = t; ; ) {
      var o = l.return;
      if (o === null) break;
      var s = o.alternate;
      if (s === null) {
        if (i = o.return, i !== null) {
          l = i;
          continue;
        }
        break;
      }
      if (o.child === s.child) {
        for (s = o.child; s; ) {
          if (s === l) return p(o), e;
          if (s === i) return p(o), t;
          s = s.sibling;
        }
        throw Error(u(188));
      }
      if (l.return !== i.return) l = o, i = s;
      else {
        for (var g = !1, x = o.child; x; ) {
          if (x === l) {
            g = !0, l = o, i = s;
            break;
          }
          if (x === i) {
            g = !0, i = o, l = s;
            break;
          }
          x = x.sibling;
        }
        if (!g) {
          for (x = s.child; x; ) {
            if (x === l) {
              g = !0, l = s, i = o;
              break;
            }
            if (x === i) {
              g = !0, i = s, l = o;
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
  var y = Object.assign, S = /* @__PURE__ */ Symbol.for("react.element"), v = /* @__PURE__ */ Symbol.for("react.transitional.element"), T = /* @__PURE__ */ Symbol.for("react.portal"), L = /* @__PURE__ */ Symbol.for("react.fragment"), j = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), Z = /* @__PURE__ */ Symbol.for("react.consumer"), G = /* @__PURE__ */ Symbol.for("react.context"), le = /* @__PURE__ */ Symbol.for("react.forward_ref"), fe = /* @__PURE__ */ Symbol.for("react.suspense"), H = /* @__PURE__ */ Symbol.for("react.suspense_list"), $ = /* @__PURE__ */ Symbol.for("react.memo"), K = /* @__PURE__ */ Symbol.for("react.lazy"), de = /* @__PURE__ */ Symbol.for("react.activity"), U = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), te = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ee = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ue(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ee ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case L:
        return "Fragment";
      case O:
        return "Profiler";
      case j:
        return "StrictMode";
      case fe:
        return "Suspense";
      case H:
        return "SuspenseList";
      case de:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case T:
          return "Portal";
        case G:
          return e.displayName || "Context";
        case Z:
          return (e._context.displayName || "Context") + ".Consumer";
        case le:
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
  var I = Array.isArray, D = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ve = [], k = -1;
  function z(e) {
    return { current: e };
  }
  function Y(e) {
    0 > k || (e.current = ve[k], ve[k] = null, k--);
  }
  function w(e, t) {
    k++, ve[k] = e.current, e.current = t;
  }
  var P = z(null), ae = z(null), ne = z(null), ke = z(null);
  function Ve(e, t) {
    switch (w(ne, t), w(ae, e), w(P, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? mm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = mm(t), e = pm(t, e);
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
    Y(P), w(P, e);
  }
  function ye() {
    Y(P), Y(ae), Y(ne);
  }
  function vt(e) {
    e.memoizedState !== null && w(ke, e);
    var t = P.current, l = pm(t, e.type);
    t !== l && (w(ae, e), w(P, l));
  }
  function zt(e) {
    ae.current === e && (Y(P), Y(ae)), ke.current === e && (Y(ke), ka._currentValue = se);
  }
  var cn, Hn;
  function Tt(e) {
    if (cn === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        cn = t && t[1] || "", Hn = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + cn + e + Hn;
  }
  var Yl = !1;
  function Gl(e, t) {
    if (!e || Yl) return "";
    Yl = !0;
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
                } catch (B) {
                  var R = B;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (B) {
                  R = B;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                R = B;
              }
              (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
              });
            }
          } catch (B) {
            if (B && R && typeof B.stack == "string")
              return [B.stack, R.stack];
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
      var s = i.DetermineComponentFrameRoot(), g = s[0], x = s[1];
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
      Yl = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Tt(l) : "";
  }
  function Ga(e, t) {
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
        return Gl(e.type, !1);
      case 11:
        return Gl(e.type.render, !1);
      case 1:
        return Gl(e.type, !0);
      case 31:
        return Tt("Activity");
      default:
        return "";
    }
  }
  function Va(e) {
    try {
      var t = "", l = null;
      do
        t += Ga(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Vl = Object.prototype.hasOwnProperty, Xl = n.unstable_scheduleCallback, Ri = n.unstable_cancelCallback, Eu = n.unstable_shouldYield, zu = n.unstable_requestPaint, St = n.unstable_now, Tu = n.unstable_getCurrentPriorityLevel, V = n.unstable_ImmediatePriority, W = n.unstable_UserBlockingPriority, ge = n.unstable_NormalPriority, Te = n.unstable_LowPriority, Ue = n.unstable_IdlePriority, Ut = n.log, bn = n.unstable_setDisableYieldValue, kt = null, rt = null;
  function At(e) {
    if (typeof Ut == "function" && bn(e), rt && typeof rt.setStrictMode == "function")
      try {
        rt.setStrictMode(kt, e);
      } catch {
      }
  }
  var Xe = Math.clz32 ? Math.clz32 : Cy, qn = Math.log, an = Math.LN2;
  function Cy(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (qn(e) / an | 0) | 0;
  }
  var Xa = 256, Qa = 262144, Za = 4194304;
  function gl(e) {
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
  function Ka(e, t, l) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var o = 0, s = e.suspendedLanes, g = e.pingedLanes;
    e = e.warmLanes;
    var x = i & 134217727;
    return x !== 0 ? (i = x & ~s, i !== 0 ? o = gl(i) : (g &= x, g !== 0 ? o = gl(g) : l || (l = x & ~e, l !== 0 && (o = gl(l))))) : (x = i & ~s, x !== 0 ? o = gl(x) : g !== 0 ? o = gl(g) : l || (l = i & ~e, l !== 0 && (o = gl(l)))), o === 0 ? 0 : t !== 0 && t !== o && (t & s) === 0 && (s = o & -o, l = t & -t, s >= l || s === 32 && (l & 4194048) !== 0) ? t : o;
  }
  function ji(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function _y(e, t) {
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
  function Fc() {
    var e = Za;
    return Za <<= 1, (Za & 62914560) === 0 && (Za = 4194304), e;
  }
  function Au(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Li(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Oy(e, t, l, i, o, s) {
    var g = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var x = e.entanglements, E = e.expirationTimes, N = e.hiddenUpdates;
    for (l = g & ~l; 0 < l; ) {
      var q = 31 - Xe(l), Q = 1 << q;
      x[q] = 0, E[q] = -1;
      var R = N[q];
      if (R !== null)
        for (N[q] = null, q = 0; q < R.length; q++) {
          var B = R[q];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~Q;
    }
    i !== 0 && Jc(e, i, 0), s !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(g & ~t));
  }
  function Jc(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - Xe(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | l & 261930;
  }
  function Ic(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var i = 31 - Xe(l), o = 1 << i;
      o & t | e[i] & t && (e[i] |= t), l &= ~o;
    }
  }
  function $c(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Cu(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Cu(e) {
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
  function _u(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Wc() {
    var e = F.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Bm(e.type));
  }
  function Pc(e, t) {
    var l = F.p;
    try {
      return F.p = e, t();
    } finally {
      F.p = l;
    }
  }
  var Yn = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Yn, Ct = "__reactProps$" + Yn, Ql = "__reactContainer$" + Yn, Ou = "__reactEvents$" + Yn, Dy = "__reactListeners$" + Yn, My = "__reactHandles$" + Yn, ef = "__reactResources$" + Yn, Ui = "__reactMarker$" + Yn;
  function Du(e) {
    delete e[ft], delete e[Ct], delete e[Ou], delete e[Dy], delete e[My];
  }
  function Zl(e) {
    var t = e[ft];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ql] || l[ft]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = km(e); e !== null; ) {
            if (l = e[ft]) return l;
            e = km(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Kl(e) {
    if (e = e[ft] || e[Ql]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Bi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Fl(e) {
    var t = e[ef];
    return t || (t = e[ef] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function st(e) {
    e[Ui] = !0;
  }
  var tf = /* @__PURE__ */ new Set(), nf = {};
  function yl(e, t) {
    Jl(e, t), Jl(e + "Capture", t);
  }
  function Jl(e, t) {
    for (nf[e] = t, e = 0; e < t.length; e++)
      tf.add(t[e]);
  }
  var Ny = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), lf = {}, af = {};
  function Ry(e) {
    return Vl.call(af, e) ? !0 : Vl.call(lf, e) ? !1 : Ny.test(e) ? af[e] = !0 : (lf[e] = !0, !1);
  }
  function Fa(e, t, l) {
    if (Ry(t))
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
  function Ja(e, t, l) {
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
  function xn(e, t, l, i) {
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
  function rf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function jy(e, t, l) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var o = i.get, s = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return o.call(this);
        },
        set: function(g) {
          l = "" + g, s.call(this, g);
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
  function Mu(e) {
    if (!e._valueTracker) {
      var t = rf(e) ? "checked" : "value";
      e._valueTracker = jy(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function uf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = rf(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Ia(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ly = /[\n"\\]/g;
  function Ft(e) {
    return e.replace(
      Ly,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Nu(e, t, l, i, o, s, g, x) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Kt(t)) : e.value !== "" + Kt(t) && (e.value = "" + Kt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? Ru(e, g, Kt(t)) : l != null ? Ru(e, g, Kt(l)) : i != null && e.removeAttribute("value"), o == null && s != null && (e.defaultChecked = !!s), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.name = "" + Kt(x) : e.removeAttribute("name");
  }
  function of(e, t, l, i, o, s, g, x) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || l != null) {
      if (!(s !== "submit" && s !== "reset" || t != null)) {
        Mu(e);
        return;
      }
      l = l != null ? "" + Kt(l) : "", t = t != null ? "" + Kt(t) : l, x || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = x ? e.checked : !!i, e.defaultChecked = !!i, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), Mu(e);
  }
  function Ru(e, t, l) {
    t === "number" && Ia(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function Il(e, t, l, i) {
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
  function sf(e, t, l) {
    if (t != null && (t = "" + Kt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Kt(l) : "";
  }
  function cf(e, t, l, i) {
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
    l = Kt(t), e.defaultValue = l, i = e.textContent, i === l && i !== "" && i !== null && (e.value = i), Mu(e);
  }
  function $l(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Uy = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ff(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Uy.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function df(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var o in t)
        i = t[o], t.hasOwnProperty(o) && l[o] !== i && ff(e, o, i);
    } else
      for (var s in t)
        t.hasOwnProperty(s) && ff(e, s, t[s]);
  }
  function ju(e) {
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
  var By = /* @__PURE__ */ new Map([
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
  ]), Hy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $a(e) {
    return Hy.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function vn() {
  }
  var Lu = null;
  function Uu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Wl = null, Pl = null;
  function hf(e) {
    var t = Kl(e);
    if (t && (e = t.stateNode)) {
      var l = e[Ct] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Nu(
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
                Nu(
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
              i = l[t], i.form === e.form && uf(i);
          }
          break e;
        case "textarea":
          sf(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && Il(e, !!l.multiple, t, !1);
      }
    }
  }
  var Bu = !1;
  function mf(e, t, l) {
    if (Bu) return e(t, l);
    Bu = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (Bu = !1, (Wl !== null || Pl !== null) && (Br(), Wl && (t = Wl, e = Pl, Pl = Wl = null, hf(t), e)))
        for (t = 0; t < e.length; t++) hf(e[t]);
    }
  }
  function Hi(e, t) {
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
  var Sn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Hu = !1;
  if (Sn)
    try {
      var qi = {};
      Object.defineProperty(qi, "passive", {
        get: function() {
          Hu = !0;
        }
      }), window.addEventListener("test", qi, qi), window.removeEventListener("test", qi, qi);
    } catch {
      Hu = !1;
    }
  var Gn = null, qu = null, Wa = null;
  function pf() {
    if (Wa) return Wa;
    var e, t = qu, l = t.length, i, o = "value" in Gn ? Gn.value : Gn.textContent, s = o.length;
    for (e = 0; e < l && t[e] === o[e]; e++) ;
    var g = l - e;
    for (i = 1; i <= g && t[l - i] === o[s - i]; i++) ;
    return Wa = o.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Pa(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function er() {
    return !0;
  }
  function gf() {
    return !1;
  }
  function _t(e) {
    function t(l, i, o, s, g) {
      this._reactName = l, this._targetInst = o, this.type = i, this.nativeEvent = s, this.target = g, this.currentTarget = null;
      for (var x in e)
        e.hasOwnProperty(x) && (l = e[x], this[x] = l ? l(s) : s[x]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? er : gf, this.isPropagationStopped = gf, this;
    }
    return y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = er);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = er);
      },
      persist: function() {
      },
      isPersistent: er
    }), t;
  }
  var bl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, tr = _t(bl), Yi = y({}, bl, { view: 0, detail: 0 }), qy = _t(Yi), Yu, Gu, Gi, nr = y({}, Yi, {
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
    getModifierState: Xu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Gi && (Gi && e.type === "mousemove" ? (Yu = e.screenX - Gi.screenX, Gu = e.screenY - Gi.screenY) : Gu = Yu = 0, Gi = e), Yu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Gu;
    }
  }), yf = _t(nr), Yy = y({}, nr, { dataTransfer: 0 }), Gy = _t(Yy), Vy = y({}, Yi, { relatedTarget: 0 }), Vu = _t(Vy), Xy = y({}, bl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qy = _t(Xy), Zy = y({}, bl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Ky = _t(Zy), Fy = y({}, bl, { data: 0 }), bf = _t(Fy), Jy = {
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
  }, Iy = {
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
  }, $y = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Wy(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = $y[e]) ? !!t[e] : !1;
  }
  function Xu() {
    return Wy;
  }
  var Py = y({}, Yi, {
    key: function(e) {
      if (e.key) {
        var t = Jy[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Pa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Iy[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Xu,
    charCode: function(e) {
      return e.type === "keypress" ? Pa(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Pa(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), eb = _t(Py), tb = y({}, nr, {
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
  }), xf = _t(tb), nb = y({}, Yi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xu
  }), lb = _t(nb), ib = y({}, bl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ab = _t(ib), rb = y({}, nr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ub = _t(rb), ob = y({}, bl, {
    newState: 0,
    oldState: 0
  }), sb = _t(ob), cb = [9, 13, 27, 32], Qu = Sn && "CompositionEvent" in window, Vi = null;
  Sn && "documentMode" in document && (Vi = document.documentMode);
  var fb = Sn && "TextEvent" in window && !Vi, vf = Sn && (!Qu || Vi && 8 < Vi && 11 >= Vi), Sf = " ", kf = !1;
  function wf(e, t) {
    switch (e) {
      case "keyup":
        return cb.indexOf(t.keyCode) !== -1;
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
  function Ef(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ei = !1;
  function db(e, t) {
    switch (e) {
      case "compositionend":
        return Ef(t);
      case "keypress":
        return t.which !== 32 ? null : (kf = !0, Sf);
      case "textInput":
        return e = t.data, e === Sf && kf ? null : e;
      default:
        return null;
    }
  }
  function hb(e, t) {
    if (ei)
      return e === "compositionend" || !Qu && wf(e, t) ? (e = pf(), Wa = qu = Gn = null, ei = !1, e) : null;
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
        return vf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var mb = {
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
  function zf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!mb[e.type] : t === "textarea";
  }
  function Tf(e, t, l, i) {
    Wl ? Pl ? Pl.push(i) : Pl = [i] : Wl = i, t = Qr(t, "onChange"), 0 < t.length && (l = new tr(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var Xi = null, Qi = null;
  function pb(e) {
    om(e, 0);
  }
  function lr(e) {
    var t = Bi(e);
    if (uf(t)) return e;
  }
  function Af(e, t) {
    if (e === "change") return t;
  }
  var Cf = !1;
  if (Sn) {
    var Zu;
    if (Sn) {
      var Ku = "oninput" in document;
      if (!Ku) {
        var _f = document.createElement("div");
        _f.setAttribute("oninput", "return;"), Ku = typeof _f.oninput == "function";
      }
      Zu = Ku;
    } else Zu = !1;
    Cf = Zu && (!document.documentMode || 9 < document.documentMode);
  }
  function Of() {
    Xi && (Xi.detachEvent("onpropertychange", Df), Qi = Xi = null);
  }
  function Df(e) {
    if (e.propertyName === "value" && lr(Qi)) {
      var t = [];
      Tf(
        t,
        Qi,
        e,
        Uu(e)
      ), mf(pb, t);
    }
  }
  function gb(e, t, l) {
    e === "focusin" ? (Of(), Xi = t, Qi = l, Xi.attachEvent("onpropertychange", Df)) : e === "focusout" && Of();
  }
  function yb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return lr(Qi);
  }
  function bb(e, t) {
    if (e === "click") return lr(t);
  }
  function xb(e, t) {
    if (e === "input" || e === "change")
      return lr(t);
  }
  function vb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Bt = typeof Object.is == "function" ? Object.is : vb;
  function Zi(e, t) {
    if (Bt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var o = l[i];
      if (!Vl.call(t, o) || !Bt(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  function Mf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Nf(e, t) {
    var l = Mf(e);
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
      l = Mf(l);
    }
  }
  function Rf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function jf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ia(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Ia(e.document);
    }
    return t;
  }
  function Fu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Sb = Sn && "documentMode" in document && 11 >= document.documentMode, ti = null, Ju = null, Ki = null, Iu = !1;
  function Lf(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Iu || ti == null || ti !== Ia(i) || (i = ti, "selectionStart" in i && Fu(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Ki && Zi(Ki, i) || (Ki = i, i = Qr(Ju, "onSelect"), 0 < i.length && (t = new tr(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = ti)));
  }
  function xl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var ni = {
    animationend: xl("Animation", "AnimationEnd"),
    animationiteration: xl("Animation", "AnimationIteration"),
    animationstart: xl("Animation", "AnimationStart"),
    transitionrun: xl("Transition", "TransitionRun"),
    transitionstart: xl("Transition", "TransitionStart"),
    transitioncancel: xl("Transition", "TransitionCancel"),
    transitionend: xl("Transition", "TransitionEnd")
  }, $u = {}, Uf = {};
  Sn && (Uf = document.createElement("div").style, "AnimationEvent" in window || (delete ni.animationend.animation, delete ni.animationiteration.animation, delete ni.animationstart.animation), "TransitionEvent" in window || delete ni.transitionend.transition);
  function vl(e) {
    if ($u[e]) return $u[e];
    if (!ni[e]) return e;
    var t = ni[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Uf)
        return $u[e] = t[l];
    return e;
  }
  var Bf = vl("animationend"), Hf = vl("animationiteration"), qf = vl("animationstart"), kb = vl("transitionrun"), wb = vl("transitionstart"), Eb = vl("transitioncancel"), Yf = vl("transitionend"), Gf = /* @__PURE__ */ new Map(), Wu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Wu.push("scrollEnd");
  function rn(e, t) {
    Gf.set(e, t), yl(t, [e]);
  }
  var ir = typeof reportError == "function" ? reportError : function(e) {
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
  }, Jt = [], li = 0, Pu = 0;
  function ar() {
    for (var e = li, t = Pu = li = 0; t < e; ) {
      var l = Jt[t];
      Jt[t++] = null;
      var i = Jt[t];
      Jt[t++] = null;
      var o = Jt[t];
      Jt[t++] = null;
      var s = Jt[t];
      if (Jt[t++] = null, i !== null && o !== null) {
        var g = i.pending;
        g === null ? o.next = o : (o.next = g.next, g.next = o), i.pending = o;
      }
      s !== 0 && Vf(l, o, s);
    }
  }
  function rr(e, t, l, i) {
    Jt[li++] = e, Jt[li++] = t, Jt[li++] = l, Jt[li++] = i, Pu |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function eo(e, t, l, i) {
    return rr(e, t, l, i), ur(e);
  }
  function Sl(e, t) {
    return rr(e, null, null, t), ur(e);
  }
  function Vf(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var o = !1, s = e.return; s !== null; )
      s.childLanes |= l, i = s.alternate, i !== null && (i.childLanes |= l), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (o = !0)), e = s, s = s.return;
    return e.tag === 3 ? (s = e.stateNode, o && t !== null && (o = 31 - Xe(l), e = s.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = l | 536870912), s) : null;
  }
  function ur(e) {
    if (50 < pa)
      throw pa = 0, cs = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ii = {};
  function zb(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ht(e, t, l, i) {
    return new zb(e, t, l, i);
  }
  function to(e) {
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
  function Xf(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function or(e, t, l, i, o, s) {
    var g = 0;
    if (i = e, typeof e == "function") to(e) && (g = 1);
    else if (typeof e == "string")
      g = O1(
        e,
        l,
        P.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case de:
          return e = Ht(31, l, t, o), e.elementType = de, e.lanes = s, e;
        case L:
          return kl(l.children, o, s, t);
        case j:
          g = 8, o |= 24;
          break;
        case O:
          return e = Ht(12, l, t, o | 2), e.elementType = O, e.lanes = s, e;
        case fe:
          return e = Ht(13, l, t, o), e.elementType = fe, e.lanes = s, e;
        case H:
          return e = Ht(19, l, t, o), e.elementType = H, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case G:
                g = 10;
                break e;
              case Z:
                g = 9;
                break e;
              case le:
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
    return t = Ht(g, l, t, o), t.elementType = e, t.type = i, t.lanes = s, t;
  }
  function kl(e, t, l, i) {
    return e = Ht(7, e, i, t), e.lanes = l, e;
  }
  function no(e, t, l) {
    return e = Ht(6, e, null, t), e.lanes = l, e;
  }
  function Qf(e) {
    var t = Ht(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function lo(e, t, l) {
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
  var Zf = /* @__PURE__ */ new WeakMap();
  function It(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Zf.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Va(t)
      }, Zf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Va(t)
    };
  }
  var ai = [], ri = 0, sr = null, Fi = 0, $t = [], Wt = 0, Vn = null, fn = 1, dn = "";
  function wn(e, t) {
    ai[ri++] = Fi, ai[ri++] = sr, sr = e, Fi = t;
  }
  function Kf(e, t, l) {
    $t[Wt++] = fn, $t[Wt++] = dn, $t[Wt++] = Vn, Vn = e;
    var i = fn;
    e = dn;
    var o = 32 - Xe(i) - 1;
    i &= ~(1 << o), l += 1;
    var s = 32 - Xe(t) + o;
    if (30 < s) {
      var g = o - o % 5;
      s = (i & (1 << g) - 1).toString(32), i >>= g, o -= g, fn = 1 << 32 - Xe(t) + o | l << o | i, dn = s + e;
    } else
      fn = 1 << s | l << o | i, dn = e;
  }
  function io(e) {
    e.return !== null && (wn(e, 1), Kf(e, 1, 0));
  }
  function ao(e) {
    for (; e === sr; )
      sr = ai[--ri], ai[ri] = null, Fi = ai[--ri], ai[ri] = null;
    for (; e === Vn; )
      Vn = $t[--Wt], $t[Wt] = null, dn = $t[--Wt], $t[Wt] = null, fn = $t[--Wt], $t[Wt] = null;
  }
  function Ff(e, t) {
    $t[Wt++] = fn, $t[Wt++] = dn, $t[Wt++] = Vn, fn = t.id, dn = t.overflow, Vn = e;
  }
  var dt = null, Fe = null, Me = !1, Xn = null, Pt = !1, ro = Error(u(519));
  function Qn(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ji(It(t, e)), ro;
  }
  function Jf(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[ft] = e, t[Ct] = i, l) {
      case "dialog":
        Ce("cancel", t), Ce("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ce("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < ya.length; l++)
          Ce(ya[l], t);
        break;
      case "source":
        Ce("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ce("error", t), Ce("load", t);
        break;
      case "details":
        Ce("toggle", t);
        break;
      case "input":
        Ce("invalid", t), of(
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
        Ce("invalid", t);
        break;
      case "textarea":
        Ce("invalid", t), cf(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || dm(t.textContent, l) ? (i.popover != null && (Ce("beforetoggle", t), Ce("toggle", t)), i.onScroll != null && Ce("scroll", t), i.onScrollEnd != null && Ce("scrollend", t), i.onClick != null && (t.onclick = vn), t = !0) : t = !1, t || Qn(e, !0);
  }
  function If(e) {
    for (dt = e.return; dt; )
      switch (dt.tag) {
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
          dt = dt.return;
      }
  }
  function ui(e) {
    if (e !== dt) return !1;
    if (!Me) return If(e), Me = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || zs(e.type, e.memoizedProps)), l = !l), l && Fe && Qn(e), If(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Fe = Sm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Fe = Sm(e);
    } else
      t === 27 ? (t = Fe, al(e.type) ? (e = Os, Os = null, Fe = e) : Fe = t) : Fe = dt ? tn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wl() {
    Fe = dt = null, Me = !1;
  }
  function uo() {
    var e = Xn;
    return e !== null && (Nt === null ? Nt = e : Nt.push.apply(
      Nt,
      e
    ), Xn = null), e;
  }
  function Ji(e) {
    Xn === null ? Xn = [e] : Xn.push(e);
  }
  var oo = z(null), El = null, En = null;
  function Zn(e, t, l) {
    w(oo, t._currentValue), t._currentValue = l;
  }
  function zn(e) {
    e._currentValue = oo.current, Y(oo);
  }
  function so(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function co(e, t, l, i) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var s = o.dependencies;
      if (s !== null) {
        var g = o.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var x = s;
          s = o;
          for (var E = 0; E < t.length; E++)
            if (x.context === t[E]) {
              s.lanes |= l, x = s.alternate, x !== null && (x.lanes |= l), so(
                s.return,
                l,
                e
              ), i || (g = null);
              break e;
            }
          s = x.next;
        }
      } else if (o.tag === 18) {
        if (g = o.return, g === null) throw Error(u(341));
        g.lanes |= l, s = g.alternate, s !== null && (s.lanes |= l), so(g, l, e), g = null;
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
  function oi(e, t, l, i) {
    e = null;
    for (var o = t, s = !1; o !== null; ) {
      if (!s) {
        if ((o.flags & 524288) !== 0) s = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var g = o.alternate;
        if (g === null) throw Error(u(387));
        if (g = g.memoizedProps, g !== null) {
          var x = o.type;
          Bt(o.pendingProps.value, g.value) || (e !== null ? e.push(x) : e = [x]);
        }
      } else if (o === ke.current) {
        if (g = o.alternate, g === null) throw Error(u(387));
        g.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(ka) : e = [ka]);
      }
      o = o.return;
    }
    e !== null && co(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function cr(e) {
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
  function zl(e) {
    El = e, En = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ht(e) {
    return $f(El, e);
  }
  function fr(e, t) {
    return El === null && zl(e), $f(e, t);
  }
  function $f(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, En === null) {
      if (e === null) throw Error(u(308));
      En = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else En = En.next = t;
    return l;
  }
  var Tb = typeof AbortController < "u" ? AbortController : function() {
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
  }, Ab = n.unstable_scheduleCallback, Cb = n.unstable_NormalPriority, tt = {
    $$typeof: G,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fo() {
    return {
      controller: new Tb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ii(e) {
    e.refCount--, e.refCount === 0 && Ab(Cb, function() {
      e.controller.abort();
    });
  }
  var $i = null, ho = 0, si = 0, ci = null;
  function _b(e, t) {
    if ($i === null) {
      var l = $i = [];
      ho = 0, si = gs(), ci = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return ho++, t.then(Wf, Wf), t;
  }
  function Wf() {
    if (--ho === 0 && $i !== null) {
      ci !== null && (ci.status = "fulfilled");
      var e = $i;
      $i = null, si = 0, ci = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ob(e, t) {
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
  var Pf = D.S;
  D.S = function(e, t) {
    Lh = St(), typeof t == "object" && t !== null && typeof t.then == "function" && _b(e, t), Pf !== null && Pf(e, t);
  };
  var Tl = z(null);
  function mo() {
    var e = Tl.current;
    return e !== null ? e : Qe.pooledCache;
  }
  function dr(e, t) {
    t === null ? w(Tl, Tl.current) : w(Tl, t.pool);
  }
  function ed() {
    var e = mo();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var fi = Error(u(460)), po = Error(u(474)), hr = Error(u(542)), mr = { then: function() {
  } };
  function td(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function nd(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(vn, vn), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, id(e), e;
      default:
        if (typeof t.status == "string") t.then(vn, vn);
        else {
          if (e = Qe, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, id(e), e;
        }
        throw Cl = t, fi;
    }
  }
  function Al(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Cl = l, fi) : l;
    }
  }
  var Cl = null;
  function ld() {
    if (Cl === null) throw Error(u(459));
    var e = Cl;
    return Cl = null, e;
  }
  function id(e) {
    if (e === fi || e === hr)
      throw Error(u(483));
  }
  var di = null, Wi = 0;
  function pr(e) {
    var t = Wi;
    return Wi += 1, di === null && (di = []), nd(di, e, t);
  }
  function Pi(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function gr(e, t) {
    throw t.$$typeof === S ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ad(e) {
    function t(C, A) {
      if (e) {
        var M = C.deletions;
        M === null ? (C.deletions = [A], C.flags |= 16) : M.push(A);
      }
    }
    function l(C, A) {
      if (!e) return null;
      for (; A !== null; )
        t(C, A), A = A.sibling;
      return null;
    }
    function i(C) {
      for (var A = /* @__PURE__ */ new Map(); C !== null; )
        C.key !== null ? A.set(C.key, C) : A.set(C.index, C), C = C.sibling;
      return A;
    }
    function o(C, A) {
      return C = kn(C, A), C.index = 0, C.sibling = null, C;
    }
    function s(C, A, M) {
      return C.index = M, e ? (M = C.alternate, M !== null ? (M = M.index, M < A ? (C.flags |= 67108866, A) : M) : (C.flags |= 67108866, A)) : (C.flags |= 1048576, A);
    }
    function g(C) {
      return e && C.alternate === null && (C.flags |= 67108866), C;
    }
    function x(C, A, M, X) {
      return A === null || A.tag !== 6 ? (A = no(M, C.mode, X), A.return = C, A) : (A = o(A, M), A.return = C, A);
    }
    function E(C, A, M, X) {
      var he = M.type;
      return he === L ? q(
        C,
        A,
        M.props.children,
        X,
        M.key
      ) : A !== null && (A.elementType === he || typeof he == "object" && he !== null && he.$$typeof === K && Al(he) === A.type) ? (A = o(A, M.props), Pi(A, M), A.return = C, A) : (A = or(
        M.type,
        M.key,
        M.props,
        null,
        C.mode,
        X
      ), Pi(A, M), A.return = C, A);
    }
    function N(C, A, M, X) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== M.containerInfo || A.stateNode.implementation !== M.implementation ? (A = lo(M, C.mode, X), A.return = C, A) : (A = o(A, M.children || []), A.return = C, A);
    }
    function q(C, A, M, X, he) {
      return A === null || A.tag !== 7 ? (A = kl(
        M,
        C.mode,
        X,
        he
      ), A.return = C, A) : (A = o(A, M), A.return = C, A);
    }
    function Q(C, A, M) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = no(
          "" + A,
          C.mode,
          M
        ), A.return = C, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case v:
            return M = or(
              A.type,
              A.key,
              A.props,
              null,
              C.mode,
              M
            ), Pi(M, A), M.return = C, M;
          case T:
            return A = lo(
              A,
              C.mode,
              M
            ), A.return = C, A;
          case K:
            return A = Al(A), Q(C, A, M);
        }
        if (I(A) || ee(A))
          return A = kl(
            A,
            C.mode,
            M,
            null
          ), A.return = C, A;
        if (typeof A.then == "function")
          return Q(C, pr(A), M);
        if (A.$$typeof === G)
          return Q(
            C,
            fr(C, A),
            M
          );
        gr(C, A);
      }
      return null;
    }
    function R(C, A, M, X) {
      var he = A !== null ? A.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return he !== null ? null : x(C, A, "" + M, X);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case v:
            return M.key === he ? E(C, A, M, X) : null;
          case T:
            return M.key === he ? N(C, A, M, X) : null;
          case K:
            return M = Al(M), R(C, A, M, X);
        }
        if (I(M) || ee(M))
          return he !== null ? null : q(C, A, M, X, null);
        if (typeof M.then == "function")
          return R(
            C,
            A,
            pr(M),
            X
          );
        if (M.$$typeof === G)
          return R(
            C,
            A,
            fr(C, M),
            X
          );
        gr(C, M);
      }
      return null;
    }
    function B(C, A, M, X, he) {
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return C = C.get(M) || null, x(A, C, "" + X, he);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case v:
            return C = C.get(
              X.key === null ? M : X.key
            ) || null, E(A, C, X, he);
          case T:
            return C = C.get(
              X.key === null ? M : X.key
            ) || null, N(A, C, X, he);
          case K:
            return X = Al(X), B(
              C,
              A,
              M,
              X,
              he
            );
        }
        if (I(X) || ee(X))
          return C = C.get(M) || null, q(A, C, X, he, null);
        if (typeof X.then == "function")
          return B(
            C,
            A,
            M,
            pr(X),
            he
          );
        if (X.$$typeof === G)
          return B(
            C,
            A,
            M,
            fr(A, X),
            he
          );
        gr(A, X);
      }
      return null;
    }
    function oe(C, A, M, X) {
      for (var he = null, Re = null, ce = A, we = A = 0, De = null; ce !== null && we < M.length; we++) {
        ce.index > we ? (De = ce, ce = null) : De = ce.sibling;
        var je = R(
          C,
          ce,
          M[we],
          X
        );
        if (je === null) {
          ce === null && (ce = De);
          break;
        }
        e && ce && je.alternate === null && t(C, ce), A = s(je, A, we), Re === null ? he = je : Re.sibling = je, Re = je, ce = De;
      }
      if (we === M.length)
        return l(C, ce), Me && wn(C, we), he;
      if (ce === null) {
        for (; we < M.length; we++)
          ce = Q(C, M[we], X), ce !== null && (A = s(
            ce,
            A,
            we
          ), Re === null ? he = ce : Re.sibling = ce, Re = ce);
        return Me && wn(C, we), he;
      }
      for (ce = i(ce); we < M.length; we++)
        De = B(
          ce,
          C,
          we,
          M[we],
          X
        ), De !== null && (e && De.alternate !== null && ce.delete(
          De.key === null ? we : De.key
        ), A = s(
          De,
          A,
          we
        ), Re === null ? he = De : Re.sibling = De, Re = De);
      return e && ce.forEach(function(cl) {
        return t(C, cl);
      }), Me && wn(C, we), he;
    }
    function pe(C, A, M, X) {
      if (M == null) throw Error(u(151));
      for (var he = null, Re = null, ce = A, we = A = 0, De = null, je = M.next(); ce !== null && !je.done; we++, je = M.next()) {
        ce.index > we ? (De = ce, ce = null) : De = ce.sibling;
        var cl = R(C, ce, je.value, X);
        if (cl === null) {
          ce === null && (ce = De);
          break;
        }
        e && ce && cl.alternate === null && t(C, ce), A = s(cl, A, we), Re === null ? he = cl : Re.sibling = cl, Re = cl, ce = De;
      }
      if (je.done)
        return l(C, ce), Me && wn(C, we), he;
      if (ce === null) {
        for (; !je.done; we++, je = M.next())
          je = Q(C, je.value, X), je !== null && (A = s(je, A, we), Re === null ? he = je : Re.sibling = je, Re = je);
        return Me && wn(C, we), he;
      }
      for (ce = i(ce); !je.done; we++, je = M.next())
        je = B(ce, C, we, je.value, X), je !== null && (e && je.alternate !== null && ce.delete(je.key === null ? we : je.key), A = s(je, A, we), Re === null ? he = je : Re.sibling = je, Re = je);
      return e && ce.forEach(function(Y1) {
        return t(C, Y1);
      }), Me && wn(C, we), he;
    }
    function Ge(C, A, M, X) {
      if (typeof M == "object" && M !== null && M.type === L && M.key === null && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case v:
            e: {
              for (var he = M.key; A !== null; ) {
                if (A.key === he) {
                  if (he = M.type, he === L) {
                    if (A.tag === 7) {
                      l(
                        C,
                        A.sibling
                      ), X = o(
                        A,
                        M.props.children
                      ), X.return = C, C = X;
                      break e;
                    }
                  } else if (A.elementType === he || typeof he == "object" && he !== null && he.$$typeof === K && Al(he) === A.type) {
                    l(
                      C,
                      A.sibling
                    ), X = o(A, M.props), Pi(X, M), X.return = C, C = X;
                    break e;
                  }
                  l(C, A);
                  break;
                } else t(C, A);
                A = A.sibling;
              }
              M.type === L ? (X = kl(
                M.props.children,
                C.mode,
                X,
                M.key
              ), X.return = C, C = X) : (X = or(
                M.type,
                M.key,
                M.props,
                null,
                C.mode,
                X
              ), Pi(X, M), X.return = C, C = X);
            }
            return g(C);
          case T:
            e: {
              for (he = M.key; A !== null; ) {
                if (A.key === he)
                  if (A.tag === 4 && A.stateNode.containerInfo === M.containerInfo && A.stateNode.implementation === M.implementation) {
                    l(
                      C,
                      A.sibling
                    ), X = o(A, M.children || []), X.return = C, C = X;
                    break e;
                  } else {
                    l(C, A);
                    break;
                  }
                else t(C, A);
                A = A.sibling;
              }
              X = lo(M, C.mode, X), X.return = C, C = X;
            }
            return g(C);
          case K:
            return M = Al(M), Ge(
              C,
              A,
              M,
              X
            );
        }
        if (I(M))
          return oe(
            C,
            A,
            M,
            X
          );
        if (ee(M)) {
          if (he = ee(M), typeof he != "function") throw Error(u(150));
          return M = he.call(M), pe(
            C,
            A,
            M,
            X
          );
        }
        if (typeof M.then == "function")
          return Ge(
            C,
            A,
            pr(M),
            X
          );
        if (M.$$typeof === G)
          return Ge(
            C,
            A,
            fr(C, M),
            X
          );
        gr(C, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, A !== null && A.tag === 6 ? (l(C, A.sibling), X = o(A, M), X.return = C, C = X) : (l(C, A), X = no(M, C.mode, X), X.return = C, C = X), g(C)) : l(C, A);
    }
    return function(C, A, M, X) {
      try {
        Wi = 0;
        var he = Ge(
          C,
          A,
          M,
          X
        );
        return di = null, he;
      } catch (ce) {
        if (ce === fi || ce === hr) throw ce;
        var Re = Ht(29, ce, null, C.mode);
        return Re.lanes = X, Re.return = C, Re;
      }
    };
  }
  var _l = ad(!0), rd = ad(!1), Kn = !1;
  function go(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function yo(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Fn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Jn(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Le & 2) !== 0) {
      var o = i.pending;
      return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = ur(e), Vf(e, null, l), t;
    }
    return rr(e, i, t, l), ur(e);
  }
  function ea(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Ic(e, l);
    }
  }
  function bo(e, t) {
    var l = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, l === i)) {
      var o = null, s = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var g = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          s === null ? o = s = g : s = s.next = g, l = l.next;
        } while (l !== null);
        s === null ? o = s = t : s = s.next = t;
      } else o = s = t;
      l = {
        baseState: i.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var xo = !1;
  function ta() {
    if (xo) {
      var e = ci;
      if (e !== null) throw e;
    }
  }
  function na(e, t, l, i) {
    xo = !1;
    var o = e.updateQueue;
    Kn = !1;
    var s = o.firstBaseUpdate, g = o.lastBaseUpdate, x = o.shared.pending;
    if (x !== null) {
      o.shared.pending = null;
      var E = x, N = E.next;
      E.next = null, g === null ? s = N : g.next = N, g = E;
      var q = e.alternate;
      q !== null && (q = q.updateQueue, x = q.lastBaseUpdate, x !== g && (x === null ? q.firstBaseUpdate = N : x.next = N, q.lastBaseUpdate = E));
    }
    if (s !== null) {
      var Q = o.baseState;
      g = 0, q = N = E = null, x = s;
      do {
        var R = x.lane & -536870913, B = R !== x.lane;
        if (B ? (Oe & R) === R : (i & R) === R) {
          R !== 0 && R === si && (xo = !0), q !== null && (q = q.next = {
            lane: 0,
            tag: x.tag,
            payload: x.payload,
            callback: null,
            next: null
          });
          e: {
            var oe = e, pe = x;
            R = t;
            var Ge = l;
            switch (pe.tag) {
              case 1:
                if (oe = pe.payload, typeof oe == "function") {
                  Q = oe.call(Ge, Q, R);
                  break e;
                }
                Q = oe;
                break e;
              case 3:
                oe.flags = oe.flags & -65537 | 128;
              case 0:
                if (oe = pe.payload, R = typeof oe == "function" ? oe.call(Ge, Q, R) : oe, R == null) break e;
                Q = y({}, Q, R);
                break e;
              case 2:
                Kn = !0;
            }
          }
          R = x.callback, R !== null && (e.flags |= 64, B && (e.flags |= 8192), B = o.callbacks, B === null ? o.callbacks = [R] : B.push(R));
        } else
          B = {
            lane: R,
            tag: x.tag,
            payload: x.payload,
            callback: x.callback,
            next: null
          }, q === null ? (N = q = B, E = Q) : q = q.next = B, g |= R;
        if (x = x.next, x === null) {
          if (x = o.shared.pending, x === null)
            break;
          B = x, x = B.next, B.next = null, o.lastBaseUpdate = B, o.shared.pending = null;
        }
      } while (!0);
      q === null && (E = Q), o.baseState = E, o.firstBaseUpdate = N, o.lastBaseUpdate = q, s === null && (o.shared.lanes = 0), el |= g, e.lanes = g, e.memoizedState = Q;
    }
  }
  function ud(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function od(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        ud(l[e], t);
  }
  var hi = z(null), yr = z(0);
  function sd(e, t) {
    e = Rn, w(yr, e), w(hi, t), Rn = e | t.baseLanes;
  }
  function vo() {
    w(yr, Rn), w(hi, hi.current);
  }
  function So() {
    Rn = yr.current, Y(hi), Y(yr);
  }
  var qt = z(null), en = null;
  function In(e) {
    var t = e.alternate;
    w(Pe, Pe.current & 1), w(qt, e), en === null && (t === null || hi.current !== null || t.memoizedState !== null) && (en = e);
  }
  function ko(e) {
    w(Pe, Pe.current), w(qt, e), en === null && (en = e);
  }
  function cd(e) {
    e.tag === 22 ? (w(Pe, Pe.current), w(qt, e), en === null && (en = e)) : $n();
  }
  function $n() {
    w(Pe, Pe.current), w(qt, qt.current);
  }
  function Yt(e) {
    Y(qt), en === e && (en = null), Y(Pe);
  }
  var Pe = z(0);
  function br(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Cs(l) || _s(l)))
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
  var Tn = 0, Se = null, qe = null, nt = null, xr = !1, mi = !1, Ol = !1, vr = 0, la = 0, pi = null, Db = 0;
  function $e() {
    throw Error(u(321));
  }
  function wo(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Bt(e[l], t[l])) return !1;
    return !0;
  }
  function Eo(e, t, l, i, o, s) {
    return Tn = s, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? Kd : Ho, Ol = !1, s = l(i, o), Ol = !1, mi && (s = dd(
      t,
      l,
      i,
      o
    )), fd(e), s;
  }
  function fd(e) {
    D.H = ra;
    var t = qe !== null && qe.next !== null;
    if (Tn = 0, nt = qe = Se = null, xr = !1, la = 0, pi = null, t) throw Error(u(300));
    e === null || lt || (e = e.dependencies, e !== null && cr(e) && (lt = !0));
  }
  function dd(e, t, l, i) {
    Se = e;
    var o = 0;
    do {
      if (mi && (pi = null), la = 0, mi = !1, 25 <= o) throw Error(u(301));
      if (o += 1, nt = qe = null, e.updateQueue != null) {
        var s = e.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      D.H = Fd, s = t(l, i);
    } while (mi);
    return s;
  }
  function Mb() {
    var e = D.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? ia(t) : t, e = e.useState()[0], (qe !== null ? qe.memoizedState : null) !== e && (Se.flags |= 1024), t;
  }
  function zo() {
    var e = vr !== 0;
    return vr = 0, e;
  }
  function To(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Ao(e) {
    if (xr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      xr = !1;
    }
    Tn = 0, nt = qe = Se = null, mi = !1, la = vr = 0, pi = null;
  }
  function wt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return nt === null ? Se.memoizedState = nt = e : nt = nt.next = e, nt;
  }
  function et() {
    if (qe === null) {
      var e = Se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qe.next;
    var t = nt === null ? Se.memoizedState : nt.next;
    if (t !== null)
      nt = t, qe = e;
    else {
      if (e === null)
        throw Se.alternate === null ? Error(u(467)) : Error(u(310));
      qe = e, e = {
        memoizedState: qe.memoizedState,
        baseState: qe.baseState,
        baseQueue: qe.baseQueue,
        queue: qe.queue,
        next: null
      }, nt === null ? Se.memoizedState = nt = e : nt = nt.next = e;
    }
    return nt;
  }
  function Sr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ia(e) {
    var t = la;
    return la += 1, pi === null && (pi = []), e = nd(pi, e, t), t = Se, (nt === null ? t.memoizedState : nt.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? Kd : Ho), e;
  }
  function kr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ia(e);
      if (e.$$typeof === G) return ht(e);
    }
    throw Error(u(438, String(e)));
  }
  function Co(e) {
    var t = null, l = Se.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var i = Se.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(o) {
          return o.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Sr(), Se.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = U;
    return t.index++, l;
  }
  function An(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function wr(e) {
    var t = et();
    return _o(t, qe, e);
  }
  function _o(e, t, l) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = l;
    var o = e.baseQueue, s = i.pending;
    if (s !== null) {
      if (o !== null) {
        var g = o.next;
        o.next = s.next, s.next = g;
      }
      t.baseQueue = o = s, i.pending = null;
    }
    if (s = e.baseState, o === null) e.memoizedState = s;
    else {
      t = o.next;
      var x = g = null, E = null, N = t, q = !1;
      do {
        var Q = N.lane & -536870913;
        if (Q !== N.lane ? (Oe & Q) === Q : (Tn & Q) === Q) {
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
            }), Q === si && (q = !0);
          else if ((Tn & R) === R) {
            N = N.next, R === si && (q = !0);
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
            }, E === null ? (x = E = Q, g = s) : E = E.next = Q, Se.lanes |= R, el |= R;
          Q = N.action, Ol && l(s, Q), s = N.hasEagerState ? N.eagerState : l(s, Q);
        } else
          R = {
            lane: Q,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, E === null ? (x = E = R, g = s) : E = E.next = R, Se.lanes |= Q, el |= Q;
        N = N.next;
      } while (N !== null && N !== t);
      if (E === null ? g = s : E.next = x, !Bt(s, e.memoizedState) && (lt = !0, q && (l = ci, l !== null)))
        throw l;
      e.memoizedState = s, e.baseState = g, e.baseQueue = E, i.lastRenderedState = s;
    }
    return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Oo(e) {
    var t = et(), l = t.queue;
    if (l === null) throw Error(u(311));
    l.lastRenderedReducer = e;
    var i = l.dispatch, o = l.pending, s = t.memoizedState;
    if (o !== null) {
      l.pending = null;
      var g = o = o.next;
      do
        s = e(s, g.action), g = g.next;
      while (g !== o);
      Bt(s, t.memoizedState) || (lt = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), l.lastRenderedState = s;
    }
    return [s, i];
  }
  function hd(e, t, l) {
    var i = Se, o = et(), s = Me;
    if (s) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = t();
    var g = !Bt(
      (qe || o).memoizedState,
      l
    );
    if (g && (o.memoizedState = l, lt = !0), o = o.queue, No(gd.bind(null, i, o, e), [
      e
    ]), o.getSnapshot !== t || g || nt !== null && nt.memoizedState.tag & 1) {
      if (i.flags |= 2048, gi(
        9,
        { destroy: void 0 },
        pd.bind(
          null,
          i,
          o,
          l,
          t
        ),
        null
      ), Qe === null) throw Error(u(349));
      s || (Tn & 127) !== 0 || md(i, t, l);
    }
    return l;
  }
  function md(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = Se.updateQueue, t === null ? (t = Sr(), Se.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function pd(e, t, l, i) {
    t.value = l, t.getSnapshot = i, yd(t) && bd(e);
  }
  function gd(e, t, l) {
    return l(function() {
      yd(t) && bd(e);
    });
  }
  function yd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Bt(e, l);
    } catch {
      return !0;
    }
  }
  function bd(e) {
    var t = Sl(e, 2);
    t !== null && Rt(t, e, 2);
  }
  function Do(e) {
    var t = wt();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Ol) {
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
  function xd(e, t, l, i) {
    return e.baseState = l, _o(
      e,
      qe,
      typeof i == "function" ? i : An
    );
  }
  function Nb(e, t, l, i, o) {
    if (Tr(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
      var s = {
        payload: o,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(g) {
          s.listeners.push(g);
        }
      };
      D.T !== null ? l(!0) : s.isTransition = !1, i(s), l = t.pending, l === null ? (s.next = t.pending = s, vd(t, s)) : (s.next = l.next, t.pending = l.next = s);
    }
  }
  function vd(e, t) {
    var l = t.action, i = t.payload, o = e.state;
    if (t.isTransition) {
      var s = D.T, g = {};
      D.T = g;
      try {
        var x = l(o, i), E = D.S;
        E !== null && E(g, x), Sd(e, t, x);
      } catch (N) {
        Mo(e, t, N);
      } finally {
        s !== null && g.types !== null && (s.types = g.types), D.T = s;
      }
    } else
      try {
        s = l(o, i), Sd(e, t, s);
      } catch (N) {
        Mo(e, t, N);
      }
  }
  function Sd(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        kd(e, t, i);
      },
      function(i) {
        return Mo(e, t, i);
      }
    ) : kd(e, t, l);
  }
  function kd(e, t, l) {
    t.status = "fulfilled", t.value = l, wd(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, vd(e, l)));
  }
  function Mo(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, wd(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function wd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Ed(e, t) {
    return t;
  }
  function zd(e, t) {
    if (Me) {
      var l = Qe.formState;
      if (l !== null) {
        e: {
          var i = Se;
          if (Me) {
            if (Fe) {
              t: {
                for (var o = Fe, s = Pt; o.nodeType !== 8; ) {
                  if (!s) {
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
                s = o.data, o = s === "F!" || s === "F" ? o : null;
              }
              if (o) {
                Fe = tn(
                  o.nextSibling
                ), i = o.data === "F!";
                break e;
              }
            }
            Qn(i);
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
      lastRenderedReducer: Ed,
      lastRenderedState: t
    }, l.queue = i, l = Xd.bind(
      null,
      Se,
      i
    ), i.dispatch = l, i = Do(!1), s = Bo.bind(
      null,
      Se,
      !1,
      i.queue
    ), i = wt(), o = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = o, l = Nb.bind(
      null,
      Se,
      o,
      s,
      l
    ), o.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function Td(e) {
    var t = et();
    return Ad(t, qe, e);
  }
  function Ad(e, t, l) {
    if (t = _o(
      e,
      t,
      Ed
    )[0], e = wr(An)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = ia(t);
      } catch (g) {
        throw g === fi ? hr : g;
      }
    else i = t;
    t = et();
    var o = t.queue, s = o.dispatch;
    return l !== t.memoizedState && (Se.flags |= 2048, gi(
      9,
      { destroy: void 0 },
      Rb.bind(null, o, l),
      null
    )), [i, s, e];
  }
  function Rb(e, t) {
    e.action = t;
  }
  function Cd(e) {
    var t = et(), l = qe;
    if (l !== null)
      return Ad(t, l, e);
    et(), t = t.memoizedState, l = et();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function gi(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = Se.updateQueue, t === null && (t = Sr(), Se.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function _d() {
    return et().memoizedState;
  }
  function Er(e, t, l, i) {
    var o = wt();
    Se.flags |= e, o.memoizedState = gi(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function zr(e, t, l, i) {
    var o = et();
    i = i === void 0 ? null : i;
    var s = o.memoizedState.inst;
    qe !== null && i !== null && wo(i, qe.memoizedState.deps) ? o.memoizedState = gi(t, s, l, i) : (Se.flags |= e, o.memoizedState = gi(
      1 | t,
      s,
      l,
      i
    ));
  }
  function Od(e, t) {
    Er(8390656, 8, e, t);
  }
  function No(e, t) {
    zr(2048, 8, e, t);
  }
  function jb(e) {
    Se.flags |= 4;
    var t = Se.updateQueue;
    if (t === null)
      t = Sr(), Se.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Dd(e) {
    var t = et().memoizedState;
    return jb({ ref: t, nextImpl: e }), function() {
      if ((Le & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Md(e, t) {
    return zr(4, 2, e, t);
  }
  function Nd(e, t) {
    return zr(4, 4, e, t);
  }
  function Rd(e, t) {
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
  function jd(e, t, l) {
    l = l != null ? l.concat([e]) : null, zr(4, 4, Rd.bind(null, t, e), l);
  }
  function Ro() {
  }
  function Ld(e, t) {
    var l = et();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && wo(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function Ud(e, t) {
    var l = et();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && wo(t, i[1]))
      return i[0];
    if (i = e(), Ol) {
      At(!0);
      try {
        e();
      } finally {
        At(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function jo(e, t, l) {
    return l === void 0 || (Tn & 1073741824) !== 0 && (Oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Bh(), Se.lanes |= e, el |= e, l);
  }
  function Bd(e, t, l, i) {
    return Bt(l, t) ? l : hi.current !== null ? (e = jo(e, l, i), Bt(e, t) || (lt = !0), e) : (Tn & 42) === 0 || (Tn & 1073741824) !== 0 && (Oe & 261930) === 0 ? (lt = !0, e.memoizedState = l) : (e = Bh(), Se.lanes |= e, el |= e, t);
  }
  function Hd(e, t, l, i, o) {
    var s = F.p;
    F.p = s !== 0 && 8 > s ? s : 8;
    var g = D.T, x = {};
    D.T = x, Bo(e, !1, t, l);
    try {
      var E = o(), N = D.S;
      if (N !== null && N(x, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var q = Ob(
          E,
          i
        );
        aa(
          e,
          t,
          q,
          Xt(e)
        );
      } else
        aa(
          e,
          t,
          i,
          Xt(e)
        );
    } catch (Q) {
      aa(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Q },
        Xt()
      );
    } finally {
      F.p = s, g !== null && x.types !== null && (g.types = x.types), D.T = g;
    }
  }
  function Lb() {
  }
  function Lo(e, t, l, i) {
    if (e.tag !== 5) throw Error(u(476));
    var o = qd(e).queue;
    Hd(
      e,
      o,
      t,
      se,
      l === null ? Lb : function() {
        return Yd(e), l(i);
      }
    );
  }
  function qd(e) {
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
  function Yd(e) {
    var t = qd(e);
    t.next === null && (t = e.alternate.memoizedState), aa(
      e,
      t.next.queue,
      {},
      Xt()
    );
  }
  function Uo() {
    return ht(ka);
  }
  function Gd() {
    return et().memoizedState;
  }
  function Vd() {
    return et().memoizedState;
  }
  function Ub(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Xt();
          e = Fn(l);
          var i = Jn(t, e, l);
          i !== null && (Rt(i, t, l), ea(i, t, l)), t = { cache: fo() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Bb(e, t, l) {
    var i = Xt();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Tr(e) ? Qd(t, l) : (l = eo(e, t, l, i), l !== null && (Rt(l, e, i), Zd(l, t, i)));
  }
  function Xd(e, t, l) {
    var i = Xt();
    aa(e, t, l, i);
  }
  function aa(e, t, l, i) {
    var o = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Tr(e)) Qd(t, o);
    else {
      var s = e.alternate;
      if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null))
        try {
          var g = t.lastRenderedState, x = s(g, l);
          if (o.hasEagerState = !0, o.eagerState = x, Bt(x, g))
            return rr(e, t, o, 0), Qe === null && ar(), !1;
        } catch {
        }
      if (l = eo(e, t, o, i), l !== null)
        return Rt(l, e, i), Zd(l, t, i), !0;
    }
    return !1;
  }
  function Bo(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: gs(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Tr(e)) {
      if (t) throw Error(u(479));
    } else
      t = eo(
        e,
        l,
        i,
        2
      ), t !== null && Rt(t, e, 2);
  }
  function Tr(e) {
    var t = e.alternate;
    return e === Se || t !== null && t === Se;
  }
  function Qd(e, t) {
    mi = xr = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Zd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Ic(e, l);
    }
  }
  var ra = {
    readContext: ht,
    use: kr,
    useCallback: $e,
    useContext: $e,
    useEffect: $e,
    useImperativeHandle: $e,
    useLayoutEffect: $e,
    useInsertionEffect: $e,
    useMemo: $e,
    useReducer: $e,
    useRef: $e,
    useState: $e,
    useDebugValue: $e,
    useDeferredValue: $e,
    useTransition: $e,
    useSyncExternalStore: $e,
    useId: $e,
    useHostTransitionStatus: $e,
    useFormState: $e,
    useActionState: $e,
    useOptimistic: $e,
    useMemoCache: $e,
    useCacheRefresh: $e
  };
  ra.useEffectEvent = $e;
  var Kd = {
    readContext: ht,
    use: kr,
    useCallback: function(e, t) {
      return wt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: ht,
    useEffect: Od,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Er(
        4194308,
        4,
        Rd.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Er(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Er(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = wt();
      t = t === void 0 ? null : t;
      var i = e();
      if (Ol) {
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
        if (Ol) {
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
      }, i.queue = e, e = e.dispatch = Bb.bind(
        null,
        Se,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = wt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Do(e);
      var t = e.queue, l = Xd.bind(null, Se, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Ro,
    useDeferredValue: function(e, t) {
      var l = wt();
      return jo(l, e, t);
    },
    useTransition: function() {
      var e = Do(!1);
      return e = Hd.bind(
        null,
        Se,
        e.queue,
        !0,
        !1
      ), wt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = Se, o = wt();
      if (Me) {
        if (l === void 0)
          throw Error(u(407));
        l = l();
      } else {
        if (l = t(), Qe === null)
          throw Error(u(349));
        (Oe & 127) !== 0 || md(i, t, l);
      }
      o.memoizedState = l;
      var s = { value: l, getSnapshot: t };
      return o.queue = s, Od(gd.bind(null, i, s, e), [
        e
      ]), i.flags |= 2048, gi(
        9,
        { destroy: void 0 },
        pd.bind(
          null,
          i,
          s,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = wt(), t = Qe.identifierPrefix;
      if (Me) {
        var l = dn, i = fn;
        l = (i & ~(1 << 32 - Xe(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = vr++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Db++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Uo,
    useFormState: zd,
    useActionState: zd,
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
      return t.queue = l, t = Bo.bind(
        null,
        Se,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: Co,
    useCacheRefresh: function() {
      return wt().memoizedState = Ub.bind(
        null,
        Se
      );
    },
    useEffectEvent: function(e) {
      var t = wt(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Le & 2) !== 0)
          throw Error(u(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Ho = {
    readContext: ht,
    use: kr,
    useCallback: Ld,
    useContext: ht,
    useEffect: No,
    useImperativeHandle: jd,
    useInsertionEffect: Md,
    useLayoutEffect: Nd,
    useMemo: Ud,
    useReducer: wr,
    useRef: _d,
    useState: function() {
      return wr(An);
    },
    useDebugValue: Ro,
    useDeferredValue: function(e, t) {
      var l = et();
      return Bd(
        l,
        qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = wr(An)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : ia(e),
        t
      ];
    },
    useSyncExternalStore: hd,
    useId: Gd,
    useHostTransitionStatus: Uo,
    useFormState: Td,
    useActionState: Td,
    useOptimistic: function(e, t) {
      var l = et();
      return xd(l, qe, e, t);
    },
    useMemoCache: Co,
    useCacheRefresh: Vd
  };
  Ho.useEffectEvent = Dd;
  var Fd = {
    readContext: ht,
    use: kr,
    useCallback: Ld,
    useContext: ht,
    useEffect: No,
    useImperativeHandle: jd,
    useInsertionEffect: Md,
    useLayoutEffect: Nd,
    useMemo: Ud,
    useReducer: Oo,
    useRef: _d,
    useState: function() {
      return Oo(An);
    },
    useDebugValue: Ro,
    useDeferredValue: function(e, t) {
      var l = et();
      return qe === null ? jo(l, e, t) : Bd(
        l,
        qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Oo(An)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : ia(e),
        t
      ];
    },
    useSyncExternalStore: hd,
    useId: Gd,
    useHostTransitionStatus: Uo,
    useFormState: Cd,
    useActionState: Cd,
    useOptimistic: function(e, t) {
      var l = et();
      return qe !== null ? xd(l, qe, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Co,
    useCacheRefresh: Vd
  };
  Fd.useEffectEvent = Dd;
  function qo(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : y({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Yo = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), o = Fn(i);
      o.payload = t, l != null && (o.callback = l), t = Jn(e, o, i), t !== null && (Rt(t, e, i), ea(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), o = Fn(i);
      o.tag = 1, o.payload = t, l != null && (o.callback = l), t = Jn(e, o, i), t !== null && (Rt(t, e, i), ea(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Xt(), i = Fn(l);
      i.tag = 2, t != null && (i.callback = t), t = Jn(e, i, l), t !== null && (Rt(t, e, l), ea(t, e, l));
    }
  };
  function Jd(e, t, l, i, o, s, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, s, g) : t.prototype && t.prototype.isPureReactComponent ? !Zi(l, i) || !Zi(o, s) : !0;
  }
  function Id(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && Yo.enqueueReplaceState(t, t.state, null);
  }
  function Dl(e, t) {
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
  function $d(e) {
    ir(e);
  }
  function Wd(e) {
    console.error(e);
  }
  function Pd(e) {
    ir(e);
  }
  function Ar(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function eh(e, t, l) {
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
  function Go(e, t, l) {
    return l = Fn(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Ar(e, t);
    }, l;
  }
  function th(e) {
    return e = Fn(e), e.tag = 3, e;
  }
  function nh(e, t, l, i) {
    var o = l.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var s = i.value;
      e.payload = function() {
        return o(s);
      }, e.callback = function() {
        eh(t, l, i);
      };
    }
    var g = l.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      eh(t, l, i), typeof o != "function" && (tl === null ? tl = /* @__PURE__ */ new Set([this]) : tl.add(this));
      var x = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: x !== null ? x : ""
      });
    });
  }
  function Hb(e, t, l, i, o) {
    if (l.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = l.alternate, t !== null && oi(
        t,
        l,
        o,
        !0
      ), l = qt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return en === null ? Hr() : l.alternate === null && We === 0 && (We = 3), l.flags &= -257, l.flags |= 65536, l.lanes = o, i === mr ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), hs(e, i, o)), !1;
          case 22:
            return l.flags |= 65536, i === mr ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), hs(e, i, o)), !1;
        }
        throw Error(u(435, l.tag));
      }
      return hs(e, i, o), Hr(), !1;
    }
    if (Me)
      return t = qt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== ro && (e = Error(u(422), { cause: i }), Ji(It(e, l)))) : (i !== ro && (t = Error(u(423), {
        cause: i
      }), Ji(
        It(t, l)
      )), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = It(i, l), o = Go(
        e.stateNode,
        i,
        o
      ), bo(e, o), We !== 4 && (We = 2)), !1;
    var s = Error(u(520), { cause: i });
    if (s = It(s, l), ma === null ? ma = [s] : ma.push(s), We !== 4 && (We = 2), t === null) return !0;
    i = It(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = o & -o, l.lanes |= e, e = Go(l.stateNode, i, e), bo(l, e), !1;
        case 1:
          if (t = l.type, s = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (tl === null || !tl.has(s))))
            return l.flags |= 65536, o &= -o, l.lanes |= o, o = th(o), nh(
              o,
              e,
              l,
              i
            ), bo(l, o), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Vo = Error(u(461)), lt = !1;
  function mt(e, t, l, i) {
    t.child = e === null ? rd(t, null, l, i) : _l(
      t,
      e.child,
      l,
      i
    );
  }
  function lh(e, t, l, i, o) {
    l = l.render;
    var s = t.ref;
    if ("ref" in i) {
      var g = {};
      for (var x in i)
        x !== "ref" && (g[x] = i[x]);
    } else g = i;
    return zl(t), i = Eo(
      e,
      t,
      l,
      g,
      s,
      o
    ), x = zo(), e !== null && !lt ? (To(e, t, o), Cn(e, t, o)) : (Me && x && io(t), t.flags |= 1, mt(e, t, i, o), t.child);
  }
  function ih(e, t, l, i, o) {
    if (e === null) {
      var s = l.type;
      return typeof s == "function" && !to(s) && s.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = s, ah(
        e,
        t,
        s,
        i,
        o
      )) : (e = or(
        l.type,
        null,
        i,
        t,
        t.mode,
        o
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (s = e.child, !$o(e, o)) {
      var g = s.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Zi, l(g, i) && e.ref === t.ref)
        return Cn(e, t, o);
    }
    return t.flags |= 1, e = kn(s, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ah(e, t, l, i, o) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Zi(s, i) && e.ref === t.ref)
        if (lt = !1, t.pendingProps = i = s, $o(e, o))
          (e.flags & 131072) !== 0 && (lt = !0);
        else
          return t.lanes = e.lanes, Cn(e, t, o);
    }
    return Xo(
      e,
      t,
      l,
      i,
      o
    );
  }
  function rh(e, t, l, i) {
    var o = i.children, s = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | l : l, e !== null) {
          for (i = t.child = e.child, o = 0; i !== null; )
            o = o | i.lanes | i.childLanes, i = i.sibling;
          i = o & ~s;
        } else i = 0, t.child = null;
        return uh(
          e,
          t,
          s,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && dr(
          t,
          s !== null ? s.cachePool : null
        ), s !== null ? sd(t, s) : vo(), cd(t);
      else
        return i = t.lanes = 536870912, uh(
          e,
          t,
          s !== null ? s.baseLanes | l : l,
          l,
          i
        );
    } else
      s !== null ? (dr(t, s.cachePool), sd(t, s), $n(), t.memoizedState = null) : (e !== null && dr(t, null), vo(), $n());
    return mt(e, t, o, l), t.child;
  }
  function ua(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function uh(e, t, l, i, o) {
    var s = mo();
    return s = s === null ? null : { parent: tt._currentValue, pool: s }, t.memoizedState = {
      baseLanes: l,
      cachePool: s
    }, e !== null && dr(t, null), vo(), cd(t), e !== null && oi(e, t, i, !0), t.childLanes = o, null;
  }
  function Cr(e, t) {
    return t = Or(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function oh(e, t, l) {
    return _l(t, e.child, null, l), e = Cr(t, t.pendingProps), e.flags |= 2, Yt(t), t.memoizedState = null, e;
  }
  function qb(e, t, l) {
    var i = t.pendingProps, o = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Me) {
        if (i.mode === "hidden")
          return e = Cr(t, i), t.lanes = 536870912, ua(null, e);
        if (ko(t), (e = Fe) ? (e = vm(
          e,
          Pt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Vn !== null ? { id: fn, overflow: dn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Qf(e), l.return = t, t.child = l, dt = t, Fe = null)) : e = null, e === null) throw Qn(t);
        return t.lanes = 536870912, null;
      }
      return Cr(t, i);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var g = s.dehydrated;
      if (ko(t), o)
        if (t.flags & 256)
          t.flags &= -257, t = oh(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (lt || oi(e, t, l, !1), o = (l & e.childLanes) !== 0, lt || o) {
        if (i = Qe, i !== null && (g = $c(i, l), g !== 0 && g !== s.retryLane))
          throw s.retryLane = g, Sl(e, g), Rt(i, e, g), Vo;
        Hr(), t = oh(
          e,
          t,
          l
        );
      } else
        e = s.treeContext, Fe = tn(g.nextSibling), dt = t, Me = !0, Xn = null, Pt = !1, e !== null && Ff(t, e), t = Cr(t, i), t.flags |= 4096;
      return t;
    }
    return e = kn(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function _r(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(u(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Xo(e, t, l, i, o) {
    return zl(t), l = Eo(
      e,
      t,
      l,
      i,
      void 0,
      o
    ), i = zo(), e !== null && !lt ? (To(e, t, o), Cn(e, t, o)) : (Me && i && io(t), t.flags |= 1, mt(e, t, l, o), t.child);
  }
  function sh(e, t, l, i, o, s) {
    return zl(t), t.updateQueue = null, l = dd(
      t,
      i,
      l,
      o
    ), fd(e), i = zo(), e !== null && !lt ? (To(e, t, s), Cn(e, t, s)) : (Me && i && io(t), t.flags |= 1, mt(e, t, l, s), t.child);
  }
  function ch(e, t, l, i, o) {
    if (zl(t), t.stateNode === null) {
      var s = ii, g = l.contextType;
      typeof g == "object" && g !== null && (s = ht(g)), s = new l(i, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Yo, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = i, s.state = t.memoizedState, s.refs = {}, go(t), g = l.contextType, s.context = typeof g == "object" && g !== null ? ht(g) : ii, s.state = t.memoizedState, g = l.getDerivedStateFromProps, typeof g == "function" && (qo(
        t,
        l,
        g,
        i
      ), s.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (g = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), g !== s.state && Yo.enqueueReplaceState(s, s.state, null), na(t, i, s, o), ta(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      s = t.stateNode;
      var x = t.memoizedProps, E = Dl(l, x);
      s.props = E;
      var N = s.context, q = l.contextType;
      g = ii, typeof q == "object" && q !== null && (g = ht(q));
      var Q = l.getDerivedStateFromProps;
      q = typeof Q == "function" || typeof s.getSnapshotBeforeUpdate == "function", x = t.pendingProps !== x, q || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (x || N !== g) && Id(
        t,
        s,
        i,
        g
      ), Kn = !1;
      var R = t.memoizedState;
      s.state = R, na(t, i, s, o), ta(), N = t.memoizedState, x || R !== N || Kn ? (typeof Q == "function" && (qo(
        t,
        l,
        Q,
        i
      ), N = t.memoizedState), (E = Kn || Jd(
        t,
        l,
        E,
        i,
        R,
        N,
        g
      )) ? (q || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = N), s.props = i, s.state = N, s.context = g, i = E) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      s = t.stateNode, yo(e, t), g = t.memoizedProps, q = Dl(l, g), s.props = q, Q = t.pendingProps, R = s.context, N = l.contextType, E = ii, typeof N == "object" && N !== null && (E = ht(N)), x = l.getDerivedStateFromProps, (N = typeof x == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (g !== Q || R !== E) && Id(
        t,
        s,
        i,
        E
      ), Kn = !1, R = t.memoizedState, s.state = R, na(t, i, s, o), ta();
      var B = t.memoizedState;
      g !== Q || R !== B || Kn || e !== null && e.dependencies !== null && cr(e.dependencies) ? (typeof x == "function" && (qo(
        t,
        l,
        x,
        i
      ), B = t.memoizedState), (q = Kn || Jd(
        t,
        l,
        q,
        i,
        R,
        B,
        E
      ) || e !== null && e.dependencies !== null && cr(e.dependencies)) ? (N || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, B, E), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        i,
        B,
        E
      )), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = B), s.props = i, s.state = B, s.context = E, i = q) : (typeof s.componentDidUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return s = i, _r(e, t), i = (t.flags & 128) !== 0, s || i ? (s = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && i ? (t.child = _l(
      t,
      e.child,
      null,
      o
    ), t.child = _l(
      t,
      null,
      l,
      o
    )) : mt(e, t, l, o), t.memoizedState = s.state, e = t.child) : e = Cn(
      e,
      t,
      o
    ), e;
  }
  function fh(e, t, l, i) {
    return wl(), t.flags |= 256, mt(e, t, l, i), t.child;
  }
  var Qo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Zo(e) {
    return { baseLanes: e, cachePool: ed() };
  }
  function Ko(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Vt), e;
  }
  function dh(e, t, l) {
    var i = t.pendingProps, o = !1, s = (t.flags & 128) !== 0, g;
    if ((g = s) || (g = e !== null && e.memoizedState === null ? !1 : (Pe.current & 2) !== 0), g && (o = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Me) {
        if (o ? In(t) : $n(), (e = Fe) ? (e = vm(
          e,
          Pt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Vn !== null ? { id: fn, overflow: dn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Qf(e), l.return = t, t.child = l, dt = t, Fe = null)) : e = null, e === null) throw Qn(t);
        return _s(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var x = i.children;
      return i = i.fallback, o ? ($n(), o = t.mode, x = Or(
        { mode: "hidden", children: x },
        o
      ), i = kl(
        i,
        o,
        l,
        null
      ), x.return = t, i.return = t, x.sibling = i, t.child = x, i = t.child, i.memoizedState = Zo(l), i.childLanes = Ko(
        e,
        g,
        l
      ), t.memoizedState = Qo, ua(null, i)) : (In(t), Fo(t, x));
    }
    var E = e.memoizedState;
    if (E !== null && (x = E.dehydrated, x !== null)) {
      if (s)
        t.flags & 256 ? (In(t), t.flags &= -257, t = Jo(
          e,
          t,
          l
        )) : t.memoizedState !== null ? ($n(), t.child = e.child, t.flags |= 128, t = null) : ($n(), x = i.fallback, o = t.mode, i = Or(
          { mode: "visible", children: i.children },
          o
        ), x = kl(
          x,
          o,
          l,
          null
        ), x.flags |= 2, i.return = t, x.return = t, i.sibling = x, t.child = i, _l(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = Zo(l), i.childLanes = Ko(
          e,
          g,
          l
        ), t.memoizedState = Qo, t = ua(null, i));
      else if (In(t), _s(x)) {
        if (g = x.nextSibling && x.nextSibling.dataset, g) var N = g.dgst;
        g = N, i = Error(u(419)), i.stack = "", i.digest = g, Ji({ value: i, source: null, stack: null }), t = Jo(
          e,
          t,
          l
        );
      } else if (lt || oi(e, t, l, !1), g = (l & e.childLanes) !== 0, lt || g) {
        if (g = Qe, g !== null && (i = $c(g, l), i !== 0 && i !== E.retryLane))
          throw E.retryLane = i, Sl(e, i), Rt(g, e, i), Vo;
        Cs(x) || Hr(), t = Jo(
          e,
          t,
          l
        );
      } else
        Cs(x) ? (t.flags |= 192, t.child = e.child, t = null) : (e = E.treeContext, Fe = tn(
          x.nextSibling
        ), dt = t, Me = !0, Xn = null, Pt = !1, e !== null && Ff(t, e), t = Fo(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return o ? ($n(), x = i.fallback, o = t.mode, E = e.child, N = E.sibling, i = kn(E, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = E.subtreeFlags & 65011712, N !== null ? x = kn(
      N,
      x
    ) : (x = kl(
      x,
      o,
      l,
      null
    ), x.flags |= 2), x.return = t, i.return = t, i.sibling = x, t.child = i, ua(null, i), i = t.child, x = e.child.memoizedState, x === null ? x = Zo(l) : (o = x.cachePool, o !== null ? (E = tt._currentValue, o = o.parent !== E ? { parent: E, pool: E } : o) : o = ed(), x = {
      baseLanes: x.baseLanes | l,
      cachePool: o
    }), i.memoizedState = x, i.childLanes = Ko(
      e,
      g,
      l
    ), t.memoizedState = Qo, ua(e.child, i)) : (In(t), l = e.child, e = l.sibling, l = kn(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Fo(e, t) {
    return t = Or(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Or(e, t) {
    return e = Ht(22, e, null, t), e.lanes = 0, e;
  }
  function Jo(e, t, l) {
    return _l(t, e.child, null, l), e = Fo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function hh(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), so(e.return, t, l);
  }
  function Io(e, t, l, i, o, s) {
    var g = e.memoizedState;
    g === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: l,
      tailMode: o,
      treeForkCount: s
    } : (g.isBackwards = t, g.rendering = null, g.renderingStartTime = 0, g.last = i, g.tail = l, g.tailMode = o, g.treeForkCount = s);
  }
  function mh(e, t, l) {
    var i = t.pendingProps, o = i.revealOrder, s = i.tail;
    i = i.children;
    var g = Pe.current, x = (g & 2) !== 0;
    if (x ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, w(Pe, g), mt(e, t, i, l), i = Me ? Fi : 0, !x && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && hh(e, l, t);
        else if (e.tag === 19)
          hh(e, l, t);
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
          e = l.alternate, e !== null && br(e) === null && (o = l), l = l.sibling;
        l = o, l === null ? (o = t.child, t.child = null) : (o = l.sibling, l.sibling = null), Io(
          t,
          !1,
          o,
          l,
          s,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, o = t.child, t.child = null; o !== null; ) {
          if (e = o.alternate, e !== null && br(e) === null) {
            t.child = o;
            break;
          }
          e = o.sibling, o.sibling = l, l = o, o = e;
        }
        Io(
          t,
          !0,
          l,
          null,
          s,
          i
        );
        break;
      case "together":
        Io(
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
    if (e !== null && (t.dependencies = e.dependencies), el |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (oi(
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
  function $o(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && cr(e)));
  }
  function Yb(e, t, l) {
    switch (t.tag) {
      case 3:
        Ve(t, t.stateNode.containerInfo), Zn(t, tt, e.memoizedState.cache), wl();
        break;
      case 27:
      case 5:
        vt(t);
        break;
      case 4:
        Ve(t, t.stateNode.containerInfo);
        break;
      case 10:
        Zn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, ko(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (In(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? dh(e, t, l) : (In(t), e = Cn(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        In(t);
        break;
      case 19:
        var o = (e.flags & 128) !== 0;
        if (i = (l & t.childLanes) !== 0, i || (oi(
          e,
          t,
          l,
          !1
        ), i = (l & t.childLanes) !== 0), o) {
          if (i)
            return mh(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), w(Pe, Pe.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, rh(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        Zn(t, tt, e.memoizedState.cache);
    }
    return Cn(e, t, l);
  }
  function ph(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        lt = !0;
      else {
        if (!$o(e, l) && (t.flags & 128) === 0)
          return lt = !1, Yb(
            e,
            t,
            l
          );
        lt = (e.flags & 131072) !== 0;
      }
    else
      lt = !1, Me && (t.flags & 1048576) !== 0 && Kf(t, Fi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Al(t.elementType), t.type = e, typeof e == "function")
            to(e) ? (i = Dl(e, i), t.tag = 1, t = ch(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = Xo(
              null,
              t,
              e,
              i,
              l
            ));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === le) {
                t.tag = 11, t = lh(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (o === $) {
                t.tag = 14, t = ih(
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
        return Xo(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, o = Dl(
          i,
          t.pendingProps
        ), ch(
          e,
          t,
          i,
          o,
          l
        );
      case 3:
        e: {
          if (Ve(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          i = t.pendingProps;
          var s = t.memoizedState;
          o = s.element, yo(e, t), na(t, i, null, l);
          var g = t.memoizedState;
          if (i = g.cache, Zn(t, tt, i), i !== s.cache && co(
            t,
            [tt],
            l,
            !0
          ), ta(), i = g.element, s.isDehydrated)
            if (s = {
              element: i,
              isDehydrated: !1,
              cache: g.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
              t = fh(
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
              ), Ji(o), t = fh(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Fe = tn(e.firstChild), dt = t, Me = !0, Xn = null, Pt = !0, l = rd(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (wl(), i === o) {
              t = Cn(
                e,
                t,
                l
              );
              break e;
            }
            mt(e, t, i, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return _r(e, t), e === null ? (l = Tm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : Me || (l = t.type, e = t.pendingProps, i = Zr(
          ne.current
        ).createElement(l), i[ft] = t, i[Ct] = e, pt(i, l, e), st(i), t.stateNode = i) : t.memoizedState = Tm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return vt(t), e === null && Me && (i = t.stateNode = wm(
          t.type,
          t.pendingProps,
          ne.current
        ), dt = t, Pt = !0, o = Fe, al(t.type) ? (Os = o, Fe = tn(i.firstChild)) : Fe = o), mt(
          e,
          t,
          t.pendingProps.children,
          l
        ), _r(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Me && ((o = i = Fe) && (i = y1(
          i,
          t.type,
          t.pendingProps,
          Pt
        ), i !== null ? (t.stateNode = i, dt = t, Fe = tn(i.firstChild), Pt = !1, o = !0) : o = !1), o || Qn(t)), vt(t), o = t.type, s = t.pendingProps, g = e !== null ? e.memoizedProps : null, i = s.children, zs(o, s) ? i = null : g !== null && zs(o, g) && (t.flags |= 32), t.memoizedState !== null && (o = Eo(
          e,
          t,
          Mb,
          null,
          null,
          l
        ), ka._currentValue = o), _r(e, t), mt(e, t, i, l), t.child;
      case 6:
        return e === null && Me && ((e = l = Fe) && (l = b1(
          l,
          t.pendingProps,
          Pt
        ), l !== null ? (t.stateNode = l, dt = t, Fe = null, e = !0) : e = !1), e || Qn(t)), null;
      case 13:
        return dh(e, t, l);
      case 4:
        return Ve(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = _l(
          t,
          null,
          i,
          l
        ) : mt(e, t, i, l), t.child;
      case 11:
        return lh(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return mt(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return mt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return mt(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return i = t.pendingProps, Zn(t, t.type, i.value), mt(e, t, i.children, l), t.child;
      case 9:
        return o = t.type._context, i = t.pendingProps.children, zl(t), o = ht(o), i = i(o), t.flags |= 1, mt(e, t, i, l), t.child;
      case 14:
        return ih(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return ah(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return mh(e, t, l);
      case 31:
        return qb(e, t, l);
      case 22:
        return rh(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return zl(t), i = ht(tt), e === null ? (o = mo(), o === null && (o = Qe, s = fo(), o.pooledCache = s, s.refCount++, s !== null && (o.pooledCacheLanes |= l), o = s), t.memoizedState = { parent: i, cache: o }, go(t), Zn(t, tt, o)) : ((e.lanes & l) !== 0 && (yo(e, t), na(t, null, null, l), ta()), o = e.memoizedState, s = t.memoizedState, o.parent !== i ? (o = { parent: i, cache: i }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Zn(t, tt, i)) : (i = s.cache, Zn(t, tt, i), i !== o.cache && co(
          t,
          [tt],
          l,
          !0
        ))), mt(
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
  function Wo(e, t, l, i, o) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (o & 335544128) === o)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gh()) e.flags |= 8192;
        else
          throw Cl = mr, po;
    } else e.flags &= -16777217;
  }
  function gh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Dm(t))
      if (Gh()) e.flags |= 8192;
      else
        throw Cl = mr, po;
  }
  function Dr(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Fc() : 536870912, e.lanes |= t, vi |= t);
  }
  function oa(e, t) {
    if (!Me)
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
  function Je(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, i = 0;
    if (t)
      for (var o = e.child; o !== null; )
        l |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
    else
      for (o = e.child; o !== null; )
        l |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= i, e.childLanes = l, t;
  }
  function Gb(e, t, l) {
    var i = t.pendingProps;
    switch (ao(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Je(t), null;
      case 1:
        return Je(t), null;
      case 3:
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), zn(tt), ye(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (ui(t) ? _n(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, uo())), Je(t), null;
      case 26:
        var o = t.type, s = t.memoizedState;
        return e === null ? (_n(t), s !== null ? (Je(t), gh(t, s)) : (Je(t), Wo(
          t,
          o,
          null,
          i,
          l
        ))) : s ? s !== e.memoizedState ? (_n(t), Je(t), gh(t, s)) : (Je(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && _n(t), Je(t), Wo(
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
            return Je(t), null;
          }
          e = P.current, ui(t) ? Jf(t) : (e = wm(o, i, l), t.stateNode = e, _n(t));
        }
        return Je(t), null;
      case 5:
        if (zt(t), o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Je(t), null;
          }
          if (s = P.current, ui(t))
            Jf(t);
          else {
            var g = Zr(
              ne.current
            );
            switch (s) {
              case 1:
                s = g.createElementNS(
                  "http://www.w3.org/2000/svg",
                  o
                );
                break;
              case 2:
                s = g.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  o
                );
                break;
              default:
                switch (o) {
                  case "svg":
                    s = g.createElementNS(
                      "http://www.w3.org/2000/svg",
                      o
                    );
                    break;
                  case "math":
                    s = g.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o
                    );
                    break;
                  case "script":
                    s = g.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(
                      s.firstChild
                    );
                    break;
                  case "select":
                    s = typeof i.is == "string" ? g.createElement("select", {
                      is: i.is
                    }) : g.createElement("select"), i.multiple ? s.multiple = !0 : i.size && (s.size = i.size);
                    break;
                  default:
                    s = typeof i.is == "string" ? g.createElement(o, { is: i.is }) : g.createElement(o);
                }
            }
            s[ft] = t, s[Ct] = i;
            e: for (g = t.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6)
                s.appendChild(g.stateNode);
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
            t.stateNode = s;
            e: switch (pt(s, o, i), o) {
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
        return Je(t), Wo(
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
          if (e = ne.current, ui(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, o = dt, o !== null)
              switch (o.tag) {
                case 27:
                case 5:
                  i = o.memoizedProps;
              }
            e[ft] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || dm(e.nodeValue, l)), e || Qn(t, !0);
          } else
            e = Zr(e).createTextNode(
              i
            ), e[ft] = t, t.stateNode = e;
        }
        return Je(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = ui(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[ft] = t;
            } else
              wl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Je(t), e = !1;
          } else
            l = uo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Je(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (o = ui(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(u(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(u(317));
              o[ft] = t;
            } else
              wl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Je(t), o = !1;
          } else
            o = uo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
          if (!o)
            return t.flags & 256 ? (Yt(t), t) : (Yt(t), null);
        }
        return Yt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== o && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Dr(t, t.updateQueue), Je(t), null);
      case 4:
        return ye(), e === null && vs(t.stateNode.containerInfo), Je(t), null;
      case 10:
        return zn(t.type), Je(t), null;
      case 19:
        if (Y(Pe), i = t.memoizedState, i === null) return Je(t), null;
        if (o = (t.flags & 128) !== 0, s = i.rendering, s === null)
          if (o) oa(i, !1);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (s = br(e), s !== null) {
                  for (t.flags |= 128, oa(i, !1), e = s.updateQueue, t.updateQueue = e, Dr(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    Xf(l, e), l = l.sibling;
                  return w(
                    Pe,
                    Pe.current & 1 | 2
                  ), Me && wn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && St() > Lr && (t.flags |= 128, o = !0, oa(i, !1), t.lanes = 4194304);
          }
        else {
          if (!o)
            if (e = br(s), e !== null) {
              if (t.flags |= 128, o = !0, e = e.updateQueue, t.updateQueue = e, Dr(t, e), oa(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !Me)
                return Je(t), null;
            } else
              2 * St() - i.renderingStartTime > Lr && l !== 536870912 && (t.flags |= 128, o = !0, oa(i, !1), t.lanes = 4194304);
          i.isBackwards ? (s.sibling = t.child, t.child = s) : (e = i.last, e !== null ? e.sibling = s : t.child = s, i.last = s);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = St(), e.sibling = null, l = Pe.current, w(
          Pe,
          o ? l & 1 | 2 : l & 1
        ), Me && wn(t, i.treeForkCount), e) : (Je(t), null);
      case 22:
      case 23:
        return Yt(t), So(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Je(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Je(t), l = t.updateQueue, l !== null && Dr(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && Y(Tl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), zn(tt), Je(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Vb(e, t) {
    switch (ao(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zn(tt), ye(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return zt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Yt(t), t.alternate === null)
            throw Error(u(340));
          wl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Yt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          wl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Y(Pe), null;
      case 4:
        return ye(), null;
      case 10:
        return zn(t.type), null;
      case 22:
      case 23:
        return Yt(t), So(), e !== null && Y(Tl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return zn(tt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function yh(e, t) {
    switch (ao(t), t.tag) {
      case 3:
        zn(tt), ye();
        break;
      case 26:
      case 27:
      case 5:
        zt(t);
        break;
      case 4:
        ye();
        break;
      case 31:
        t.memoizedState !== null && Yt(t);
        break;
      case 13:
        Yt(t);
        break;
      case 19:
        Y(Pe);
        break;
      case 10:
        zn(t.type);
        break;
      case 22:
      case 23:
        Yt(t), So(), e !== null && Y(Tl);
        break;
      case 24:
        zn(tt);
    }
  }
  function sa(e, t) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        l = o;
        do {
          if ((l.tag & e) === e) {
            i = void 0;
            var s = l.create, g = l.inst;
            i = s(), g.destroy = i;
          }
          l = l.next;
        } while (l !== o);
      }
    } catch (x) {
      He(t, t.return, x);
    }
  }
  function Wn(e, t, l) {
    try {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var s = o.next;
        i = s;
        do {
          if ((i.tag & e) === e) {
            var g = i.inst, x = g.destroy;
            if (x !== void 0) {
              g.destroy = void 0, o = t;
              var E = l, N = x;
              try {
                N();
              } catch (q) {
                He(
                  o,
                  E,
                  q
                );
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (q) {
      He(t, t.return, q);
    }
  }
  function bh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        od(t, l);
      } catch (i) {
        He(e, e.return, i);
      }
    }
  }
  function xh(e, t, l) {
    l.props = Dl(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      He(e, t, i);
    }
  }
  function ca(e, t) {
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
      He(e, t, o);
    }
  }
  function hn(e, t) {
    var l = e.ref, i = e.refCleanup;
    if (l !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (o) {
          He(e, t, o);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (o) {
          He(e, t, o);
        }
      else l.current = null;
  }
  function vh(e) {
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
      He(e, e.return, o);
    }
  }
  function Po(e, t, l) {
    try {
      var i = e.stateNode;
      f1(i, e.type, l, t), i[Ct] = t;
    } catch (o) {
      He(e, e.return, o);
    }
  }
  function Sh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && al(e.type) || e.tag === 4;
  }
  function es(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Sh(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && al(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ts(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = vn));
    else if (i !== 4 && (i === 27 && al(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (ts(e, t, l), e = e.sibling; e !== null; )
        ts(e, t, l), e = e.sibling;
  }
  function Mr(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && al(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (Mr(e, t, l), e = e.sibling; e !== null; )
        Mr(e, t, l), e = e.sibling;
  }
  function kh(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      pt(t, i, l), t[ft] = e, t[Ct] = l;
    } catch (s) {
      He(e, e.return, s);
    }
  }
  var On = !1, it = !1, ns = !1, wh = typeof WeakSet == "function" ? WeakSet : Set, ct = null;
  function Xb(e, t) {
    if (e = e.containerInfo, ws = Pr, e = jf(e), Fu(e)) {
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
            var o = i.anchorOffset, s = i.focusNode;
            i = i.focusOffset;
            try {
              l.nodeType, s.nodeType;
            } catch {
              l = null;
              break e;
            }
            var g = 0, x = -1, E = -1, N = 0, q = 0, Q = e, R = null;
            t: for (; ; ) {
              for (var B; Q !== l || o !== 0 && Q.nodeType !== 3 || (x = g + o), Q !== s || i !== 0 && Q.nodeType !== 3 || (E = g + i), Q.nodeType === 3 && (g += Q.nodeValue.length), (B = Q.firstChild) !== null; )
                R = Q, Q = B;
              for (; ; ) {
                if (Q === e) break t;
                if (R === l && ++N === o && (x = g), R === s && ++q === i && (E = g), (B = Q.nextSibling) !== null) break;
                Q = R, R = Q.parentNode;
              }
              Q = B;
            }
            l = x === -1 || E === -1 ? null : { start: x, end: E };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Es = { focusedElem: e, selectionRange: l }, Pr = !1, ct = t; ct !== null; )
      if (t = ct, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ct = e;
      else
        for (; ct !== null; ) {
          switch (t = ct, s = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  o = e[l], o.ref.impl = o.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && s !== null) {
                e = void 0, l = t, o = s.memoizedProps, s = s.memoizedState, i = l.stateNode;
                try {
                  var oe = Dl(
                    l.type,
                    o
                  );
                  e = i.getSnapshotBeforeUpdate(
                    oe,
                    s
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (pe) {
                  He(
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
                  As(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      As(e);
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
            e.return = t.return, ct = e;
            break;
          }
          ct = t.return;
        }
  }
  function Eh(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Mn(e, l), i & 4 && sa(5, l);
        break;
      case 1:
        if (Mn(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (g) {
              He(l, l.return, g);
            }
          else {
            var o = Dl(
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
              He(
                l,
                l.return,
                g
              );
            }
          }
        i & 64 && bh(l), i & 512 && ca(l, l.return);
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
            od(e, t);
          } catch (g) {
            He(l, l.return, g);
          }
        }
        break;
      case 27:
        t === null && i & 4 && kh(l);
      case 26:
      case 5:
        Mn(e, l), t === null && i & 4 && vh(l), i & 512 && ca(l, l.return);
        break;
      case 12:
        Mn(e, l);
        break;
      case 31:
        Mn(e, l), i & 4 && Ah(e, l);
        break;
      case 13:
        Mn(e, l), i & 4 && Ch(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = Pb.bind(
          null,
          l
        ), x1(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || On, !i) {
          t = t !== null && t.memoizedState !== null || it, o = On;
          var s = it;
          On = i, (it = t) && !s ? Nn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Mn(e, l), On = o, it = s;
        }
        break;
      case 30:
        break;
      default:
        Mn(e, l);
    }
  }
  function zh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, zh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Du(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ie = null, Ot = !1;
  function Dn(e, t, l) {
    for (l = l.child; l !== null; )
      Th(e, t, l), l = l.sibling;
  }
  function Th(e, t, l) {
    if (rt && typeof rt.onCommitFiberUnmount == "function")
      try {
        rt.onCommitFiberUnmount(kt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        it || hn(l, t), Dn(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        it || hn(l, t);
        var i = Ie, o = Ot;
        al(l.type) && (Ie = l.stateNode, Ot = !1), Dn(
          e,
          t,
          l
        ), xa(l.stateNode), Ie = i, Ot = o;
        break;
      case 5:
        it || hn(l, t);
      case 6:
        if (i = Ie, o = Ot, Ie = null, Dn(
          e,
          t,
          l
        ), Ie = i, Ot = o, Ie !== null)
          if (Ot)
            try {
              (Ie.nodeType === 9 ? Ie.body : Ie.nodeName === "HTML" ? Ie.ownerDocument.body : Ie).removeChild(l.stateNode);
            } catch (s) {
              He(
                l,
                t,
                s
              );
            }
          else
            try {
              Ie.removeChild(l.stateNode);
            } catch (s) {
              He(
                l,
                t,
                s
              );
            }
        break;
      case 18:
        Ie !== null && (Ot ? (e = Ie, bm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Ci(e)) : bm(Ie, l.stateNode));
        break;
      case 4:
        i = Ie, o = Ot, Ie = l.stateNode.containerInfo, Ot = !0, Dn(
          e,
          t,
          l
        ), Ie = i, Ot = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wn(2, l, t), it || Wn(4, l, t), Dn(
          e,
          t,
          l
        );
        break;
      case 1:
        it || (hn(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && xh(
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
        it = (i = it) || l.memoizedState !== null, Dn(
          e,
          t,
          l
        ), it = i;
        break;
      default:
        Dn(
          e,
          t,
          l
        );
    }
  }
  function Ah(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ci(e);
      } catch (l) {
        He(t, t.return, l);
      }
    }
  }
  function Ch(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ci(e);
      } catch (l) {
        He(t, t.return, l);
      }
  }
  function Qb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new wh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new wh()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Nr(e, t) {
    var l = Qb(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var o = e1.bind(null, e, i);
        i.then(o, o);
      }
    });
  }
  function Dt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var o = l[i], s = e, g = t, x = g;
        e: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (al(x.type)) {
                Ie = x.stateNode, Ot = !1;
                break e;
              }
              break;
            case 5:
              Ie = x.stateNode, Ot = !1;
              break e;
            case 3:
            case 4:
              Ie = x.stateNode.containerInfo, Ot = !0;
              break e;
          }
          x = x.return;
        }
        if (Ie === null) throw Error(u(160));
        Th(s, g, o), Ie = null, Ot = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        _h(t, e), t = t.sibling;
  }
  var un = null;
  function _h(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Dt(t, e), Mt(e), i & 4 && (Wn(3, e, e.return), sa(3, e), Wn(5, e, e.return));
        break;
      case 1:
        Dt(t, e), Mt(e), i & 512 && (it || l === null || hn(l, l.return)), i & 64 && On && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var o = un;
        if (Dt(t, e), Mt(e), i & 512 && (it || l === null || hn(l, l.return)), i & 4) {
          var s = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, o = o.ownerDocument || o;
                  t: switch (i) {
                    case "title":
                      s = o.getElementsByTagName("title")[0], (!s || s[Ui] || s[ft] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = o.createElement(i), o.head.insertBefore(
                        s,
                        o.querySelector("head > title")
                      )), pt(s, i, l), s[ft] = e, st(s), i = s;
                      break e;
                    case "link":
                      var g = _m(
                        "link",
                        "href",
                        o
                      ).get(i + (l.href || ""));
                      if (g) {
                        for (var x = 0; x < g.length; x++)
                          if (s = g[x], s.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && s.getAttribute("rel") === (l.rel == null ? null : l.rel) && s.getAttribute("title") === (l.title == null ? null : l.title) && s.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      s = o.createElement(i), pt(s, i, l), o.head.appendChild(s);
                      break;
                    case "meta":
                      if (g = _m(
                        "meta",
                        "content",
                        o
                      ).get(i + (l.content || ""))) {
                        for (x = 0; x < g.length; x++)
                          if (s = g[x], s.getAttribute("content") === (l.content == null ? null : "" + l.content) && s.getAttribute("name") === (l.name == null ? null : l.name) && s.getAttribute("property") === (l.property == null ? null : l.property) && s.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && s.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            g.splice(x, 1);
                            break t;
                          }
                      }
                      s = o.createElement(i), pt(s, i, l), o.head.appendChild(s);
                      break;
                    default:
                      throw Error(u(468, i));
                  }
                  s[ft] = e, st(s), i = s;
                }
                e.stateNode = i;
              } else
                Om(
                  o,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Cm(
                o,
                i,
                e.memoizedProps
              );
          else
            s !== i ? (s === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : s.count--, i === null ? Om(
              o,
              e.type,
              e.stateNode
            ) : Cm(
              o,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && Po(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        Dt(t, e), Mt(e), i & 512 && (it || l === null || hn(l, l.return)), l !== null && i & 4 && Po(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Dt(t, e), Mt(e), i & 512 && (it || l === null || hn(l, l.return)), e.flags & 32) {
          o = e.stateNode;
          try {
            $l(o, "");
          } catch (oe) {
            He(e, e.return, oe);
          }
        }
        i & 4 && e.stateNode != null && (o = e.memoizedProps, Po(
          e,
          o,
          l !== null ? l.memoizedProps : o
        )), i & 1024 && (ns = !0);
        break;
      case 6:
        if (Dt(t, e), Mt(e), i & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (oe) {
            He(e, e.return, oe);
          }
        }
        break;
      case 3:
        if (Jr = null, o = un, un = Kr(t.containerInfo), Dt(t, e), un = o, Mt(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ci(t.containerInfo);
          } catch (oe) {
            He(e, e.return, oe);
          }
        ns && (ns = !1, Oh(e));
        break;
      case 4:
        i = un, un = Kr(
          e.stateNode.containerInfo
        ), Dt(t, e), Mt(e), un = i;
        break;
      case 12:
        Dt(t, e), Mt(e);
        break;
      case 31:
        Dt(t, e), Mt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Nr(e, i)));
        break;
      case 13:
        Dt(t, e), Mt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (jr = St()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Nr(e, i)));
        break;
      case 22:
        o = e.memoizedState !== null;
        var E = l !== null && l.memoizedState !== null, N = On, q = it;
        if (On = N || o, it = q || E, Dt(t, e), it = q, On = N, Mt(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, o && (l === null || E || On || it || Ml(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                E = l = t;
                try {
                  if (s = E.stateNode, o)
                    g = s.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    x = E.stateNode;
                    var Q = E.memoizedProps.style, R = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    x.style.display = R == null || typeof R == "boolean" ? "" : ("" + R).trim();
                  }
                } catch (oe) {
                  He(E, E.return, oe);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = o ? "" : E.memoizedProps;
                } catch (oe) {
                  He(E, E.return, oe);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                E = t;
                try {
                  var B = E.stateNode;
                  o ? xm(B, !0) : xm(E.stateNode, !1);
                } catch (oe) {
                  He(E, E.return, oe);
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
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, Nr(e, l))));
        break;
      case 19:
        Dt(t, e), Mt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Nr(e, i)));
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
          if (Sh(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(u(160));
        switch (l.tag) {
          case 27:
            var o = l.stateNode, s = es(e);
            Mr(e, s, o);
            break;
          case 5:
            var g = l.stateNode;
            l.flags & 32 && ($l(g, ""), l.flags &= -33);
            var x = es(e);
            Mr(e, x, g);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo, N = es(e);
            ts(
              e,
              N,
              E
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (q) {
        He(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Oh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Oh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Mn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Eh(e, t.alternate, t), t = t.sibling;
  }
  function Ml(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wn(4, t, t.return), Ml(t);
          break;
        case 1:
          hn(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && xh(
            t,
            t.return,
            l
          ), Ml(t);
          break;
        case 27:
          xa(t.stateNode);
        case 26:
        case 5:
          hn(t, t.return), Ml(t);
          break;
        case 22:
          t.memoizedState === null && Ml(t);
          break;
        case 30:
          Ml(t);
          break;
        default:
          Ml(t);
      }
      e = e.sibling;
    }
  }
  function Nn(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, o = e, s = t, g = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Nn(
            o,
            s,
            l
          ), sa(4, s);
          break;
        case 1:
          if (Nn(
            o,
            s,
            l
          ), i = s, o = i.stateNode, typeof o.componentDidMount == "function")
            try {
              o.componentDidMount();
            } catch (N) {
              He(i, i.return, N);
            }
          if (i = s, o = i.updateQueue, o !== null) {
            var x = i.stateNode;
            try {
              var E = o.shared.hiddenCallbacks;
              if (E !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < E.length; o++)
                  ud(E[o], x);
            } catch (N) {
              He(i, i.return, N);
            }
          }
          l && g & 64 && bh(s), ca(s, s.return);
          break;
        case 27:
          kh(s);
        case 26:
        case 5:
          Nn(
            o,
            s,
            l
          ), l && i === null && g & 4 && vh(s), ca(s, s.return);
          break;
        case 12:
          Nn(
            o,
            s,
            l
          );
          break;
        case 31:
          Nn(
            o,
            s,
            l
          ), l && g & 4 && Ah(o, s);
          break;
        case 13:
          Nn(
            o,
            s,
            l
          ), l && g & 4 && Ch(o, s);
          break;
        case 22:
          s.memoizedState === null && Nn(
            o,
            s,
            l
          ), ca(s, s.return);
          break;
        case 30:
          break;
        default:
          Nn(
            o,
            s,
            l
          );
      }
      t = t.sibling;
    }
  }
  function ls(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Ii(l));
  }
  function is(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ii(e));
  }
  function on(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Dh(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Dh(e, t, l, i) {
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
        ), o & 2048 && sa(9, t);
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
        ), o & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ii(e)));
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
            var s = t.memoizedProps, g = s.id, x = s.onPostCommit;
            typeof x == "function" && x(
              g,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (E) {
            He(t, t.return, E);
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
        s = t.stateNode, g = t.alternate, t.memoizedState !== null ? s._visibility & 2 ? on(
          e,
          t,
          l,
          i
        ) : fa(e, t) : s._visibility & 2 ? on(
          e,
          t,
          l,
          i
        ) : (s._visibility |= 2, yi(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), o & 2048 && ls(g, t);
        break;
      case 24:
        on(
          e,
          t,
          l,
          i
        ), o & 2048 && is(t.alternate, t);
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
  function yi(e, t, l, i, o) {
    for (o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e, g = t, x = l, E = i, N = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          yi(
            s,
            g,
            x,
            E,
            o
          ), sa(8, g);
          break;
        case 23:
          break;
        case 22:
          var q = g.stateNode;
          g.memoizedState !== null ? q._visibility & 2 ? yi(
            s,
            g,
            x,
            E,
            o
          ) : fa(
            s,
            g
          ) : (q._visibility |= 2, yi(
            s,
            g,
            x,
            E,
            o
          )), o && N & 2048 && ls(
            g.alternate,
            g
          );
          break;
        case 24:
          yi(
            s,
            g,
            x,
            E,
            o
          ), o && N & 2048 && is(g.alternate, g);
          break;
        default:
          yi(
            s,
            g,
            x,
            E,
            o
          );
      }
      t = t.sibling;
    }
  }
  function fa(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, o = i.flags;
        switch (i.tag) {
          case 22:
            fa(l, i), o & 2048 && ls(
              i.alternate,
              i
            );
            break;
          case 24:
            fa(l, i), o & 2048 && is(i.alternate, i);
            break;
          default:
            fa(l, i);
        }
        t = t.sibling;
      }
  }
  var da = 8192;
  function bi(e, t, l) {
    if (e.subtreeFlags & da)
      for (e = e.child; e !== null; )
        Mh(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Mh(e, t, l) {
    switch (e.tag) {
      case 26:
        bi(
          e,
          t,
          l
        ), e.flags & da && e.memoizedState !== null && D1(
          l,
          un,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        bi(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = un;
        un = Kr(e.stateNode.containerInfo), bi(
          e,
          t,
          l
        ), un = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = da, da = 16777216, bi(
          e,
          t,
          l
        ), da = i) : bi(
          e,
          t,
          l
        ));
        break;
      default:
        bi(
          e,
          t,
          l
        );
    }
  }
  function Nh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ha(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ct = i, jh(
            i,
            e
          );
        }
      Nh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Rh(e), e = e.sibling;
  }
  function Rh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ha(e), e.flags & 2048 && Wn(9, e, e.return);
        break;
      case 3:
        ha(e);
        break;
      case 12:
        ha(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Rr(e)) : ha(e);
        break;
      default:
        ha(e);
    }
  }
  function Rr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ct = i, jh(
            i,
            e
          );
        }
      Nh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Wn(8, t, t.return), Rr(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Rr(t));
          break;
        default:
          Rr(t);
      }
      e = e.sibling;
    }
  }
  function jh(e, t) {
    for (; ct !== null; ) {
      var l = ct;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Wn(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Ii(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, ct = i;
      else
        e: for (l = e; ct !== null; ) {
          i = ct;
          var o = i.sibling, s = i.return;
          if (zh(i), i === l) {
            ct = null;
            break e;
          }
          if (o !== null) {
            o.return = s, ct = o;
            break e;
          }
          ct = s;
        }
    }
  }
  var Zb = {
    getCacheForType: function(e) {
      var t = ht(tt), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return ht(tt).controller.signal;
    }
  }, Kb = typeof WeakMap == "function" ? WeakMap : Map, Le = 0, Qe = null, Ae = null, Oe = 0, Be = 0, Gt = null, Pn = !1, xi = !1, as = !1, Rn = 0, We = 0, el = 0, Nl = 0, rs = 0, Vt = 0, vi = 0, ma = null, Nt = null, us = !1, jr = 0, Lh = 0, Lr = 1 / 0, Ur = null, tl = null, ut = 0, nl = null, Si = null, jn = 0, os = 0, ss = null, Uh = null, pa = 0, cs = null;
  function Xt() {
    return (Le & 2) !== 0 && Oe !== 0 ? Oe & -Oe : D.T !== null ? gs() : Wc();
  }
  function Bh() {
    if (Vt === 0)
      if ((Oe & 536870912) === 0 || Me) {
        var e = Qa;
        Qa <<= 1, (Qa & 3932160) === 0 && (Qa = 262144), Vt = e;
      } else Vt = 536870912;
    return e = qt.current, e !== null && (e.flags |= 32), Vt;
  }
  function Rt(e, t, l) {
    (e === Qe && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) && (ki(e, 0), ll(
      e,
      Oe,
      Vt,
      !1
    )), Li(e, l), ((Le & 2) === 0 || e !== Qe) && (e === Qe && ((Le & 2) === 0 && (Nl |= l), We === 4 && ll(
      e,
      Oe,
      Vt,
      !1
    )), mn(e));
  }
  function Hh(e, t, l) {
    if ((Le & 6) !== 0) throw Error(u(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ji(e, t), o = i ? Ib(e, t) : ds(e, t, !0), s = i;
    do {
      if (o === 0) {
        xi && !i && ll(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, s && !Fb(l)) {
          o = ds(e, t, !1), s = !1;
          continue;
        }
        if (o === 2) {
          if (s = t, e.errorRecoveryDisabledLanes & s)
            var g = 0;
          else
            g = e.pendingLanes & -536870913, g = g !== 0 ? g : g & 536870912 ? 536870912 : 0;
          if (g !== 0) {
            t = g;
            e: {
              var x = e;
              o = ma;
              var E = x.current.memoizedState.isDehydrated;
              if (E && (ki(x, g).flags |= 256), g = ds(
                x,
                g,
                !1
              ), g !== 2) {
                if (as && !E) {
                  x.errorRecoveryDisabledLanes |= s, Nl |= s, o = 4;
                  break e;
                }
                s = Nt, Nt = o, s !== null && (Nt === null ? Nt = s : Nt.push.apply(
                  Nt,
                  s
                ));
              }
              o = g;
            }
            if (s = !1, o !== 2) continue;
          }
        }
        if (o === 1) {
          ki(e, 0), ll(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, s = o, s) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ll(
                i,
                t,
                Vt,
                !Pn
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
          if ((t & 62914560) === t && (o = jr + 300 - St(), 10 < o)) {
            if (ll(
              i,
              t,
              Vt,
              !Pn
            ), Ka(i, 0, !0) !== 0) break e;
            jn = t, i.timeoutHandle = gm(
              qh.bind(
                null,
                i,
                l,
                Nt,
                Ur,
                us,
                t,
                Vt,
                Nl,
                vi,
                Pn,
                s,
                "Throttled",
                -0,
                0
              ),
              o
            );
            break e;
          }
          qh(
            i,
            l,
            Nt,
            Ur,
            us,
            t,
            Vt,
            Nl,
            vi,
            Pn,
            s,
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
  function qh(e, t, l, i, o, s, g, x, E, N, q, Q, R, B) {
    if (e.timeoutHandle = -1, Q = t.subtreeFlags, Q & 8192 || (Q & 16785408) === 16785408) {
      Q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: vn
      }, Mh(
        t,
        s,
        Q
      );
      var oe = (s & 62914560) === s ? jr - St() : (s & 4194048) === s ? Lh - St() : 0;
      if (oe = M1(
        Q,
        oe
      ), oe !== null) {
        jn = s, e.cancelPendingCommit = oe(
          Fh.bind(
            null,
            e,
            t,
            s,
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
            B
          )
        ), ll(e, s, g, !N);
        return;
      }
    }
    Fh(
      e,
      t,
      s,
      l,
      i,
      o,
      g,
      x,
      E
    );
  }
  function Fb(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var i = 0; i < l.length; i++) {
          var o = l[i], s = o.getSnapshot;
          o = o.value;
          try {
            if (!Bt(s(), o)) return !1;
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
  function ll(e, t, l, i) {
    t &= ~rs, t &= ~Nl, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var o = t; 0 < o; ) {
      var s = 31 - Xe(o), g = 1 << s;
      i[s] = -1, o &= ~g;
    }
    l !== 0 && Jc(e, l, t);
  }
  function Br() {
    return (Le & 6) === 0 ? (ga(0), !1) : !0;
  }
  function fs() {
    if (Ae !== null) {
      if (Be === 0)
        var e = Ae.return;
      else
        e = Ae, En = El = null, Ao(e), di = null, Wi = 0, e = Ae;
      for (; e !== null; )
        yh(e.alternate, e), e = e.return;
      Ae = null;
    }
  }
  function ki(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, m1(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), jn = 0, fs(), Qe = e, Ae = l = kn(e.current, null), Oe = t, Be = 0, Gt = null, Pn = !1, xi = ji(e, t), as = !1, vi = Vt = rs = Nl = el = We = 0, Nt = ma = null, us = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var o = 31 - Xe(i), s = 1 << o;
        t |= e[o], i &= ~s;
      }
    return Rn = t, ar(), l;
  }
  function Yh(e, t) {
    Se = null, D.H = ra, t === fi || t === hr ? (t = ld(), Be = 3) : t === po ? (t = ld(), Be = 4) : Be = t === Vo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, Ae === null && (We = 1, Ar(
      e,
      It(t, e.current)
    ));
  }
  function Gh() {
    var e = qt.current;
    return e === null ? !0 : (Oe & 4194048) === Oe ? en === null : (Oe & 62914560) === Oe || (Oe & 536870912) !== 0 ? e === en : !1;
  }
  function Vh() {
    var e = D.H;
    return D.H = ra, e === null ? ra : e;
  }
  function Xh() {
    var e = D.A;
    return D.A = Zb, e;
  }
  function Hr() {
    We = 4, Pn || (Oe & 4194048) !== Oe && qt.current !== null || (xi = !0), (el & 134217727) === 0 && (Nl & 134217727) === 0 || Qe === null || ll(
      Qe,
      Oe,
      Vt,
      !1
    );
  }
  function ds(e, t, l) {
    var i = Le;
    Le |= 2;
    var o = Vh(), s = Xh();
    (Qe !== e || Oe !== t) && (Ur = null, ki(e, t)), t = !1;
    var g = We;
    e: do
      try {
        if (Be !== 0 && Ae !== null) {
          var x = Ae, E = Gt;
          switch (Be) {
            case 8:
              fs(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              qt.current === null && (t = !0);
              var N = Be;
              if (Be = 0, Gt = null, wi(e, x, E, N), l && xi) {
                g = 0;
                break e;
              }
              break;
            default:
              N = Be, Be = 0, Gt = null, wi(e, x, E, N);
          }
        }
        Jb(), g = We;
        break;
      } catch (q) {
        Yh(e, q);
      }
    while (!0);
    return t && e.shellSuspendCounter++, En = El = null, Le = i, D.H = o, D.A = s, Ae === null && (Qe = null, Oe = 0, ar()), g;
  }
  function Jb() {
    for (; Ae !== null; ) Qh(Ae);
  }
  function Ib(e, t) {
    var l = Le;
    Le |= 2;
    var i = Vh(), o = Xh();
    Qe !== e || Oe !== t ? (Ur = null, Lr = St() + 500, ki(e, t)) : xi = ji(
      e,
      t
    );
    e: do
      try {
        if (Be !== 0 && Ae !== null) {
          t = Ae;
          var s = Gt;
          t: switch (Be) {
            case 1:
              Be = 0, Gt = null, wi(e, t, s, 1);
              break;
            case 2:
            case 9:
              if (td(s)) {
                Be = 0, Gt = null, Zh(t);
                break;
              }
              t = function() {
                Be !== 2 && Be !== 9 || Qe !== e || (Be = 7), mn(e);
              }, s.then(t, t);
              break e;
            case 3:
              Be = 7;
              break e;
            case 4:
              Be = 5;
              break e;
            case 7:
              td(s) ? (Be = 0, Gt = null, Zh(t)) : (Be = 0, Gt = null, wi(e, t, s, 7));
              break;
            case 5:
              var g = null;
              switch (Ae.tag) {
                case 26:
                  g = Ae.memoizedState;
                case 5:
                case 27:
                  var x = Ae;
                  if (g ? Dm(g) : x.stateNode.complete) {
                    Be = 0, Gt = null;
                    var E = x.sibling;
                    if (E !== null) Ae = E;
                    else {
                      var N = x.return;
                      N !== null ? (Ae = N, qr(N)) : Ae = null;
                    }
                    break t;
                  }
              }
              Be = 0, Gt = null, wi(e, t, s, 5);
              break;
            case 6:
              Be = 0, Gt = null, wi(e, t, s, 6);
              break;
            case 8:
              fs(), We = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        $b();
        break;
      } catch (q) {
        Yh(e, q);
      }
    while (!0);
    return En = El = null, D.H = i, D.A = o, Le = l, Ae !== null ? 0 : (Qe = null, Oe = 0, ar(), We);
  }
  function $b() {
    for (; Ae !== null && !Eu(); )
      Qh(Ae);
  }
  function Qh(e) {
    var t = ph(e.alternate, e, Rn);
    e.memoizedProps = e.pendingProps, t === null ? qr(e) : Ae = t;
  }
  function Zh(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = sh(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Oe
        );
        break;
      case 11:
        t = sh(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Oe
        );
        break;
      case 5:
        Ao(t);
      default:
        yh(l, t), t = Ae = Xf(t, Rn), t = ph(l, t, Rn);
    }
    e.memoizedProps = e.pendingProps, t === null ? qr(e) : Ae = t;
  }
  function wi(e, t, l, i) {
    En = El = null, Ao(t), di = null, Wi = 0;
    var o = t.return;
    try {
      if (Hb(
        e,
        o,
        t,
        l,
        Oe
      )) {
        We = 1, Ar(
          e,
          It(l, e.current)
        ), Ae = null;
        return;
      }
    } catch (s) {
      if (o !== null) throw Ae = o, s;
      We = 1, Ar(
        e,
        It(l, e.current)
      ), Ae = null;
      return;
    }
    t.flags & 32768 ? (Me || i === 1 ? e = !0 : xi || (Oe & 536870912) !== 0 ? e = !1 : (Pn = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = qt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Kh(t, e)) : qr(t);
  }
  function qr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Kh(
          t,
          Pn
        );
        return;
      }
      e = t.return;
      var l = Gb(
        t.alternate,
        t,
        Rn
      );
      if (l !== null) {
        Ae = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        Ae = t;
        return;
      }
      Ae = t = e;
    } while (t !== null);
    We === 0 && (We = 5);
  }
  function Kh(e, t) {
    do {
      var l = Vb(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, Ae = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        Ae = e;
        return;
      }
      Ae = e = l;
    } while (e !== null);
    We = 6, Ae = null;
  }
  function Fh(e, t, l, i, o, s, g, x, E) {
    e.cancelPendingCommit = null;
    do
      Yr();
    while (ut !== 0);
    if ((Le & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (s = t.lanes | t.childLanes, s |= Pu, Oy(
        e,
        l,
        s,
        g,
        x,
        E
      ), e === Qe && (Ae = Qe = null, Oe = 0), Si = t, nl = e, jn = l, os = s, ss = o, Uh = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, t1(ge, function() {
        return Ph(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = D.T, D.T = null, o = F.p, F.p = 2, g = Le, Le |= 4;
        try {
          Xb(e, t, l);
        } finally {
          Le = g, F.p = o, D.T = i;
        }
      }
      ut = 1, Jh(), Ih(), $h();
    }
  }
  function Jh() {
    if (ut === 1) {
      ut = 0;
      var e = nl, t = Si, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = D.T, D.T = null;
        var i = F.p;
        F.p = 2;
        var o = Le;
        Le |= 4;
        try {
          _h(t, e);
          var s = Es, g = jf(e.containerInfo), x = s.focusedElem, E = s.selectionRange;
          if (g !== x && x && x.ownerDocument && Rf(
            x.ownerDocument.documentElement,
            x
          )) {
            if (E !== null && Fu(x)) {
              var N = E.start, q = E.end;
              if (q === void 0 && (q = N), "selectionStart" in x)
                x.selectionStart = N, x.selectionEnd = Math.min(
                  q,
                  x.value.length
                );
              else {
                var Q = x.ownerDocument || document, R = Q && Q.defaultView || window;
                if (R.getSelection) {
                  var B = R.getSelection(), oe = x.textContent.length, pe = Math.min(E.start, oe), Ge = E.end === void 0 ? pe : Math.min(E.end, oe);
                  !B.extend && pe > Ge && (g = Ge, Ge = pe, pe = g);
                  var C = Nf(
                    x,
                    pe
                  ), A = Nf(
                    x,
                    Ge
                  );
                  if (C && A && (B.rangeCount !== 1 || B.anchorNode !== C.node || B.anchorOffset !== C.offset || B.focusNode !== A.node || B.focusOffset !== A.offset)) {
                    var M = Q.createRange();
                    M.setStart(C.node, C.offset), B.removeAllRanges(), pe > Ge ? (B.addRange(M), B.extend(A.node, A.offset)) : (M.setEnd(A.node, A.offset), B.addRange(M));
                  }
                }
              }
            }
            for (Q = [], B = x; B = B.parentNode; )
              B.nodeType === 1 && Q.push({
                element: B,
                left: B.scrollLeft,
                top: B.scrollTop
              });
            for (typeof x.focus == "function" && x.focus(), x = 0; x < Q.length; x++) {
              var X = Q[x];
              X.element.scrollLeft = X.left, X.element.scrollTop = X.top;
            }
          }
          Pr = !!ws, Es = ws = null;
        } finally {
          Le = o, F.p = i, D.T = l;
        }
      }
      e.current = t, ut = 2;
    }
  }
  function Ih() {
    if (ut === 2) {
      ut = 0;
      var e = nl, t = Si, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = D.T, D.T = null;
        var i = F.p;
        F.p = 2;
        var o = Le;
        Le |= 4;
        try {
          Eh(e, t.alternate, t);
        } finally {
          Le = o, F.p = i, D.T = l;
        }
      }
      ut = 3;
    }
  }
  function $h() {
    if (ut === 4 || ut === 3) {
      ut = 0, zu();
      var e = nl, t = Si, l = jn, i = Uh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ut = 5 : (ut = 0, Si = nl = null, Wh(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (o === 0 && (tl = null), _u(l), t = t.stateNode, rt && typeof rt.onCommitFiberRoot == "function")
        try {
          rt.onCommitFiberRoot(
            kt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = D.T, o = F.p, F.p = 2, D.T = null;
        try {
          for (var s = e.onRecoverableError, g = 0; g < i.length; g++) {
            var x = i[g];
            s(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          D.T = t, F.p = o;
        }
      }
      (jn & 3) !== 0 && Yr(), mn(e), o = e.pendingLanes, (l & 261930) !== 0 && (o & 42) !== 0 ? e === cs ? pa++ : (pa = 0, cs = e) : pa = 0, ga(0);
    }
  }
  function Wh(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ii(t)));
  }
  function Yr() {
    return Jh(), Ih(), $h(), Ph();
  }
  function Ph() {
    if (ut !== 5) return !1;
    var e = nl, t = os;
    os = 0;
    var l = _u(jn), i = D.T, o = F.p;
    try {
      F.p = 32 > l ? 32 : l, D.T = null, l = ss, ss = null;
      var s = nl, g = jn;
      if (ut = 0, Si = nl = null, jn = 0, (Le & 6) !== 0) throw Error(u(331));
      var x = Le;
      if (Le |= 4, Rh(s.current), Dh(
        s,
        s.current,
        g,
        l
      ), Le = x, ga(0, !1), rt && typeof rt.onPostCommitFiberRoot == "function")
        try {
          rt.onPostCommitFiberRoot(kt, s);
        } catch {
        }
      return !0;
    } finally {
      F.p = o, D.T = i, Wh(e, t);
    }
  }
  function em(e, t, l) {
    t = It(l, t), t = Go(e.stateNode, t, 2), e = Jn(e, t, 2), e !== null && (Li(e, 2), mn(e));
  }
  function He(e, t, l) {
    if (e.tag === 3)
      em(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          em(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (tl === null || !tl.has(i))) {
            e = It(l, e), l = th(2), i = Jn(t, l, 2), i !== null && (nh(
              l,
              i,
              t,
              e
            ), Li(i, 2), mn(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function hs(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new Kb();
      var o = /* @__PURE__ */ new Set();
      i.set(t, o);
    } else
      o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
    o.has(l) || (as = !0, o.add(l), e = Wb.bind(null, e, t, l), t.then(e, e));
  }
  function Wb(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Qe === e && (Oe & l) === l && (We === 4 || We === 3 && (Oe & 62914560) === Oe && 300 > St() - jr ? (Le & 2) === 0 && ki(e, 0) : rs |= l, vi === Oe && (vi = 0)), mn(e);
  }
  function tm(e, t) {
    t === 0 && (t = Fc()), e = Sl(e, t), e !== null && (Li(e, t), mn(e));
  }
  function Pb(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), tm(e, l);
  }
  function e1(e, t) {
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
    i !== null && i.delete(t), tm(e, l);
  }
  function t1(e, t) {
    return Xl(e, t);
  }
  var Gr = null, Ei = null, ms = !1, Vr = !1, ps = !1, il = 0;
  function mn(e) {
    e !== Ei && e.next === null && (Ei === null ? Gr = Ei = e : Ei = Ei.next = e), Vr = !0, ms || (ms = !0, l1());
  }
  function ga(e, t) {
    if (!ps && Vr) {
      ps = !0;
      do
        for (var l = !1, i = Gr; i !== null; ) {
          if (e !== 0) {
            var o = i.pendingLanes;
            if (o === 0) var s = 0;
            else {
              var g = i.suspendedLanes, x = i.pingedLanes;
              s = (1 << 31 - Xe(42 | e) + 1) - 1, s &= o & ~(g & ~x), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (l = !0, am(i, s));
          } else
            s = Oe, s = Ka(
              i,
              i === Qe ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (s & 3) === 0 || ji(i, s) || (l = !0, am(i, s));
          i = i.next;
        }
      while (l);
      ps = !1;
    }
  }
  function n1() {
    nm();
  }
  function nm() {
    Vr = ms = !1;
    var e = 0;
    il !== 0 && h1() && (e = il);
    for (var t = St(), l = null, i = Gr; i !== null; ) {
      var o = i.next, s = lm(i, t);
      s === 0 ? (i.next = null, l === null ? Gr = o : l.next = o, o === null && (Ei = l)) : (l = i, (e !== 0 || (s & 3) !== 0) && (Vr = !0)), i = o;
    }
    ut !== 0 && ut !== 5 || ga(e), il !== 0 && (il = 0);
  }
  function lm(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
      var g = 31 - Xe(s), x = 1 << g, E = o[g];
      E === -1 ? ((x & l) === 0 || (x & i) !== 0) && (o[g] = _y(x, t)) : E <= t && (e.expiredLanes |= x), s &= ~x;
    }
    if (t = Qe, l = Oe, l = Ka(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, l === 0 || e === t && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && Ri(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || ji(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (i !== null && Ri(i), _u(l)) {
        case 2:
        case 8:
          l = W;
          break;
        case 32:
          l = ge;
          break;
        case 268435456:
          l = Ue;
          break;
        default:
          l = ge;
      }
      return i = im.bind(null, e), l = Xl(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && Ri(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function im(e, t) {
    if (ut !== 0 && ut !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Yr() && e.callbackNode !== l)
      return null;
    var i = Oe;
    return i = Ka(
      e,
      e === Qe ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (Hh(e, i, t), lm(e, St()), e.callbackNode != null && e.callbackNode === l ? im.bind(null, e) : null);
  }
  function am(e, t) {
    if (Yr()) return null;
    Hh(e, t, !0);
  }
  function l1() {
    p1(function() {
      (Le & 6) !== 0 ? Xl(
        V,
        n1
      ) : nm();
    });
  }
  function gs() {
    if (il === 0) {
      var e = si;
      e === 0 && (e = Xa, Xa <<= 1, (Xa & 261888) === 0 && (Xa = 256)), il = e;
    }
    return il;
  }
  function rm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : $a("" + e);
  }
  function um(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function i1(e, t, l, i, o) {
    if (t === "submit" && l && l.stateNode === o) {
      var s = rm(
        (o[Ct] || null).action
      ), g = i.submitter;
      g && (t = (t = g[Ct] || null) ? rm(t.formAction) : g.getAttribute("formAction"), t !== null && (s = t, g = null));
      var x = new tr(
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
                if (il !== 0) {
                  var E = g ? um(o, g) : new FormData(o);
                  Lo(
                    l,
                    {
                      pending: !0,
                      data: E,
                      method: o.method,
                      action: s
                    },
                    null,
                    E
                  );
                }
              } else
                typeof s == "function" && (x.preventDefault(), E = g ? um(o, g) : new FormData(o), Lo(
                  l,
                  {
                    pending: !0,
                    data: E,
                    method: o.method,
                    action: s
                  },
                  s,
                  E
                ));
            },
            currentTarget: o
          }
        ]
      });
    }
  }
  for (var ys = 0; ys < Wu.length; ys++) {
    var bs = Wu[ys], a1 = bs.toLowerCase(), r1 = bs[0].toUpperCase() + bs.slice(1);
    rn(
      a1,
      "on" + r1
    );
  }
  rn(Bf, "onAnimationEnd"), rn(Hf, "onAnimationIteration"), rn(qf, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(kb, "onTransitionRun"), rn(wb, "onTransitionStart"), rn(Eb, "onTransitionCancel"), rn(Yf, "onTransitionEnd"), Jl("onMouseEnter", ["mouseout", "mouseover"]), Jl("onMouseLeave", ["mouseout", "mouseover"]), Jl("onPointerEnter", ["pointerout", "pointerover"]), Jl("onPointerLeave", ["pointerout", "pointerover"]), yl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), yl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), yl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), yl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), yl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), yl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ya = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), u1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ya)
  );
  function om(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], o = i.event;
      i = i.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var g = i.length - 1; 0 <= g; g--) {
            var x = i[g], E = x.instance, N = x.currentTarget;
            if (x = x.listener, E !== s && o.isPropagationStopped())
              break e;
            s = x, o.currentTarget = N;
            try {
              s(o);
            } catch (q) {
              ir(q);
            }
            o.currentTarget = null, s = E;
          }
        else
          for (g = 0; g < i.length; g++) {
            if (x = i[g], E = x.instance, N = x.currentTarget, x = x.listener, E !== s && o.isPropagationStopped())
              break e;
            s = x, o.currentTarget = N;
            try {
              s(o);
            } catch (q) {
              ir(q);
            }
            o.currentTarget = null, s = E;
          }
      }
    }
  }
  function Ce(e, t) {
    var l = t[Ou];
    l === void 0 && (l = t[Ou] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (sm(t, e, 2, !1), l.add(i));
  }
  function xs(e, t, l) {
    var i = 0;
    t && (i |= 4), sm(
      l,
      e,
      i,
      t
    );
  }
  var Xr = "_reactListening" + Math.random().toString(36).slice(2);
  function vs(e) {
    if (!e[Xr]) {
      e[Xr] = !0, tf.forEach(function(l) {
        l !== "selectionchange" && (u1.has(l) || xs(l, !1, e), xs(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Xr] || (t[Xr] = !0, xs("selectionchange", !1, t));
    }
  }
  function sm(e, t, l, i) {
    switch (Bm(t)) {
      case 2:
        var o = j1;
        break;
      case 8:
        o = L1;
        break;
      default:
        o = js;
    }
    l = o.bind(
      null,
      t,
      l,
      e
    ), o = void 0, !Hu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: o
    }) : e.addEventListener(t, l, !0) : o !== void 0 ? e.addEventListener(t, l, {
      passive: o
    }) : e.addEventListener(t, l, !1);
  }
  function Ss(e, t, l, i, o) {
    var s = i;
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
            if (g = Zl(x), g === null) return;
            if (E = g.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              i = s = g;
              continue e;
            }
            x = x.parentNode;
          }
        }
        i = i.return;
      }
    mf(function() {
      var N = s, q = Uu(l), Q = [];
      e: {
        var R = Gf.get(e);
        if (R !== void 0) {
          var B = tr, oe = e;
          switch (e) {
            case "keypress":
              if (Pa(l) === 0) break e;
            case "keydown":
            case "keyup":
              B = eb;
              break;
            case "focusin":
              oe = "focus", B = Vu;
              break;
            case "focusout":
              oe = "blur", B = Vu;
              break;
            case "beforeblur":
            case "afterblur":
              B = Vu;
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
              B = yf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = Gy;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = lb;
              break;
            case Bf:
            case Hf:
            case qf:
              B = Qy;
              break;
            case Yf:
              B = ab;
              break;
            case "scroll":
            case "scrollend":
              B = qy;
              break;
            case "wheel":
              B = ub;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = Ky;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = xf;
              break;
            case "toggle":
            case "beforetoggle":
              B = sb;
          }
          var pe = (t & 4) !== 0, Ge = !pe && (e === "scroll" || e === "scrollend"), C = pe ? R !== null ? R + "Capture" : null : R;
          pe = [];
          for (var A = N, M; A !== null; ) {
            var X = A;
            if (M = X.stateNode, X = X.tag, X !== 5 && X !== 26 && X !== 27 || M === null || C === null || (X = Hi(A, C), X != null && pe.push(
              ba(A, X, M)
            )), Ge) break;
            A = A.return;
          }
          0 < pe.length && (R = new B(
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
          if (R = e === "mouseover" || e === "pointerover", B = e === "mouseout" || e === "pointerout", R && l !== Lu && (oe = l.relatedTarget || l.fromElement) && (Zl(oe) || oe[Ql]))
            break e;
          if ((B || R) && (R = q.window === q ? q : (R = q.ownerDocument) ? R.defaultView || R.parentWindow : window, B ? (oe = l.relatedTarget || l.toElement, B = N, oe = oe ? Zl(oe) : null, oe !== null && (Ge = d(oe), pe = oe.tag, oe !== Ge || pe !== 5 && pe !== 27 && pe !== 6) && (oe = null)) : (B = null, oe = N), B !== oe)) {
            if (pe = yf, X = "onMouseLeave", C = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (pe = xf, X = "onPointerLeave", C = "onPointerEnter", A = "pointer"), Ge = B == null ? R : Bi(B), M = oe == null ? R : Bi(oe), R = new pe(
              X,
              A + "leave",
              B,
              l,
              q
            ), R.target = Ge, R.relatedTarget = M, X = null, Zl(q) === N && (pe = new pe(
              C,
              A + "enter",
              oe,
              l,
              q
            ), pe.target = M, pe.relatedTarget = Ge, X = pe), Ge = X, B && oe)
              t: {
                for (pe = o1, C = B, A = oe, M = 0, X = C; X; X = pe(X))
                  M++;
                X = 0;
                for (var he = A; he; he = pe(he))
                  X++;
                for (; 0 < M - X; )
                  C = pe(C), M--;
                for (; 0 < X - M; )
                  A = pe(A), X--;
                for (; M--; ) {
                  if (C === A || A !== null && C === A.alternate) {
                    pe = C;
                    break t;
                  }
                  C = pe(C), A = pe(A);
                }
                pe = null;
              }
            else pe = null;
            B !== null && cm(
              Q,
              R,
              B,
              pe,
              !1
            ), oe !== null && Ge !== null && cm(
              Q,
              Ge,
              oe,
              pe,
              !0
            );
          }
        }
        e: {
          if (R = N ? Bi(N) : window, B = R.nodeName && R.nodeName.toLowerCase(), B === "select" || B === "input" && R.type === "file")
            var Re = Af;
          else if (zf(R))
            if (Cf)
              Re = xb;
            else {
              Re = yb;
              var ce = gb;
            }
          else
            B = R.nodeName, !B || B.toLowerCase() !== "input" || R.type !== "checkbox" && R.type !== "radio" ? N && ju(N.elementType) && (Re = Af) : Re = bb;
          if (Re && (Re = Re(e, N))) {
            Tf(
              Q,
              Re,
              l,
              q
            );
            break e;
          }
          ce && ce(e, R, N), e === "focusout" && N && R.type === "number" && N.memoizedProps.value != null && Ru(R, "number", R.value);
        }
        switch (ce = N ? Bi(N) : window, e) {
          case "focusin":
            (zf(ce) || ce.contentEditable === "true") && (ti = ce, Ju = N, Ki = null);
            break;
          case "focusout":
            Ki = Ju = ti = null;
            break;
          case "mousedown":
            Iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Iu = !1, Lf(Q, l, q);
            break;
          case "selectionchange":
            if (Sb) break;
          case "keydown":
          case "keyup":
            Lf(Q, l, q);
        }
        var we;
        if (Qu)
          e: {
            switch (e) {
              case "compositionstart":
                var De = "onCompositionStart";
                break e;
              case "compositionend":
                De = "onCompositionEnd";
                break e;
              case "compositionupdate":
                De = "onCompositionUpdate";
                break e;
            }
            De = void 0;
          }
        else
          ei ? wf(e, l) && (De = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (De = "onCompositionStart");
        De && (vf && l.locale !== "ko" && (ei || De !== "onCompositionStart" ? De === "onCompositionEnd" && ei && (we = pf()) : (Gn = q, qu = "value" in Gn ? Gn.value : Gn.textContent, ei = !0)), ce = Qr(N, De), 0 < ce.length && (De = new bf(
          De,
          e,
          null,
          l,
          q
        ), Q.push({ event: De, listeners: ce }), we ? De.data = we : (we = Ef(l), we !== null && (De.data = we)))), (we = fb ? db(e, l) : hb(e, l)) && (De = Qr(N, "onBeforeInput"), 0 < De.length && (ce = new bf(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          q
        ), Q.push({
          event: ce,
          listeners: De
        }), ce.data = we)), i1(
          Q,
          e,
          N,
          l,
          q
        );
      }
      om(Q, t);
    });
  }
  function ba(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Qr(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var o = e, s = o.stateNode;
      if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || s === null || (o = Hi(e, l), o != null && i.unshift(
        ba(e, o, s)
      ), o = Hi(e, t), o != null && i.push(
        ba(e, o, s)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function o1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function cm(e, t, l, i, o) {
    for (var s = t._reactName, g = []; l !== null && l !== i; ) {
      var x = l, E = x.alternate, N = x.stateNode;
      if (x = x.tag, E !== null && E === i) break;
      x !== 5 && x !== 26 && x !== 27 || N === null || (E = N, o ? (N = Hi(l, s), N != null && g.unshift(
        ba(l, N, E)
      )) : o || (N = Hi(l, s), N != null && g.push(
        ba(l, N, E)
      ))), l = l.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var s1 = /\r\n?/g, c1 = /\u0000|\uFFFD/g;
  function fm(e) {
    return (typeof e == "string" ? e : "" + e).replace(s1, `
`).replace(c1, "");
  }
  function dm(e, t) {
    return t = fm(t), fm(e) === t;
  }
  function Ye(e, t, l, i, o, s) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || $l(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && $l(e, "" + i);
        break;
      case "className":
        Ja(e, "class", i);
        break;
      case "tabIndex":
        Ja(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ja(e, l, i);
        break;
      case "style":
        df(e, i, s);
        break;
      case "data":
        if (t !== "object") {
          Ja(e, "data", i);
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
        i = $a("" + i), e.setAttribute(l, i);
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
          typeof s == "function" && (l === "formAction" ? (t !== "input" && Ye(e, t, "name", o.name, o, null), Ye(
            e,
            t,
            "formEncType",
            o.formEncType,
            o,
            null
          ), Ye(
            e,
            t,
            "formMethod",
            o.formMethod,
            o,
            null
          ), Ye(
            e,
            t,
            "formTarget",
            o.formTarget,
            o,
            null
          )) : (Ye(e, t, "encType", o.encType, o, null), Ye(e, t, "method", o.method, o, null), Ye(e, t, "target", o.target, o, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = $a("" + i), e.setAttribute(l, i);
        break;
      case "onClick":
        i != null && (e.onclick = vn);
        break;
      case "onScroll":
        i != null && Ce("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ce("scrollend", e);
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
        l = $a("" + i), e.setAttributeNS(
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
        Ce("beforetoggle", e), Ce("toggle", e), Fa(e, "popover", i);
        break;
      case "xlinkActuate":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        xn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        xn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        xn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        xn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Fa(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = By.get(l) || l, Fa(e, l, i));
    }
  }
  function ks(e, t, l, i, o, s) {
    switch (l) {
      case "style":
        df(e, i, s);
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
        typeof i == "string" ? $l(e, i) : (typeof i == "number" || typeof i == "bigint") && $l(e, "" + i);
        break;
      case "onScroll":
        i != null && Ce("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ce("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = vn);
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
        if (!nf.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (o = l.endsWith("Capture"), t = l.slice(2, o ? l.length - 7 : void 0), s = e[Ct] || null, s = s != null ? s[l] : null, typeof s == "function" && e.removeEventListener(t, s, o), typeof i == "function")) {
              typeof s != "function" && s !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, o);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : Fa(e, l, i);
          }
    }
  }
  function pt(e, t, l) {
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
        Ce("error", e), Ce("load", e);
        var i = !1, o = !1, s;
        for (s in l)
          if (l.hasOwnProperty(s)) {
            var g = l[s];
            if (g != null)
              switch (s) {
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
                  Ye(e, t, s, g, l, null);
              }
          }
        o && Ye(e, t, "srcSet", l.srcSet, l, null), i && Ye(e, t, "src", l.src, l, null);
        return;
      case "input":
        Ce("invalid", e);
        var x = s = g = o = null, E = null, N = null;
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
                  s = q;
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
                  Ye(e, t, i, q, l, null);
              }
          }
        of(
          e,
          s,
          x,
          E,
          N,
          g,
          o,
          !1
        );
        return;
      case "select":
        Ce("invalid", e), i = g = s = null;
        for (o in l)
          if (l.hasOwnProperty(o) && (x = l[o], x != null))
            switch (o) {
              case "value":
                s = x;
                break;
              case "defaultValue":
                g = x;
                break;
              case "multiple":
                i = x;
              default:
                Ye(e, t, o, x, l, null);
            }
        t = s, l = g, e.multiple = !!i, t != null ? Il(e, !!i, t, !1) : l != null && Il(e, !!i, l, !0);
        return;
      case "textarea":
        Ce("invalid", e), s = o = i = null;
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
                s = x;
                break;
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(u(91));
                break;
              default:
                Ye(e, t, g, x, l, null);
            }
        cf(e, i, o, s);
        return;
      case "option":
        for (E in l)
          l.hasOwnProperty(E) && (i = l[E], i != null) && (E === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Ye(e, t, E, i, l, null));
        return;
      case "dialog":
        Ce("beforetoggle", e), Ce("toggle", e), Ce("cancel", e), Ce("close", e);
        break;
      case "iframe":
      case "object":
        Ce("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ya.length; i++)
          Ce(ya[i], e);
        break;
      case "image":
        Ce("error", e), Ce("load", e);
        break;
      case "details":
        Ce("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ce("error", e), Ce("load", e);
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
                Ye(e, t, N, i, l, null);
            }
        return;
      default:
        if (ju(t)) {
          for (q in l)
            l.hasOwnProperty(q) && (i = l[q], i !== void 0 && ks(
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
      l.hasOwnProperty(x) && (i = l[x], i != null && Ye(e, t, x, i, l, null));
  }
  function f1(e, t, l, i) {
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
        var o = null, s = null, g = null, x = null, E = null, N = null, q = null;
        for (B in l) {
          var Q = l[B];
          if (l.hasOwnProperty(B) && Q != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = Q;
              default:
                i.hasOwnProperty(B) || Ye(e, t, B, null, i, Q);
            }
        }
        for (var R in i) {
          var B = i[R];
          if (Q = l[R], i.hasOwnProperty(R) && (B != null || Q != null))
            switch (R) {
              case "type":
                s = B;
                break;
              case "name":
                o = B;
                break;
              case "checked":
                N = B;
                break;
              case "defaultChecked":
                q = B;
                break;
              case "value":
                g = B;
                break;
              case "defaultValue":
                x = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null)
                  throw Error(u(137, t));
                break;
              default:
                B !== Q && Ye(
                  e,
                  t,
                  R,
                  B,
                  i,
                  Q
                );
            }
        }
        Nu(
          e,
          g,
          x,
          E,
          N,
          q,
          s,
          o
        );
        return;
      case "select":
        B = g = x = R = null;
        for (s in l)
          if (E = l[s], l.hasOwnProperty(s) && E != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                B = E;
              default:
                i.hasOwnProperty(s) || Ye(
                  e,
                  t,
                  s,
                  null,
                  i,
                  E
                );
            }
        for (o in i)
          if (s = i[o], E = l[o], i.hasOwnProperty(o) && (s != null || E != null))
            switch (o) {
              case "value":
                R = s;
                break;
              case "defaultValue":
                x = s;
                break;
              case "multiple":
                g = s;
              default:
                s !== E && Ye(
                  e,
                  t,
                  o,
                  s,
                  i,
                  E
                );
            }
        t = x, l = g, i = B, R != null ? Il(e, !!l, R, !1) : !!i != !!l && (t != null ? Il(e, !!l, t, !0) : Il(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        B = R = null;
        for (x in l)
          if (o = l[x], l.hasOwnProperty(x) && o != null && !i.hasOwnProperty(x))
            switch (x) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ye(e, t, x, null, i, o);
            }
        for (g in i)
          if (o = i[g], s = l[g], i.hasOwnProperty(g) && (o != null || s != null))
            switch (g) {
              case "value":
                R = o;
                break;
              case "defaultValue":
                B = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(u(91));
                break;
              default:
                o !== s && Ye(e, t, g, o, i, s);
            }
        sf(e, R, B);
        return;
      case "option":
        for (var oe in l)
          R = l[oe], l.hasOwnProperty(oe) && R != null && !i.hasOwnProperty(oe) && (oe === "selected" ? e.selected = !1 : Ye(
            e,
            t,
            oe,
            null,
            i,
            R
          ));
        for (E in i)
          R = i[E], B = l[E], i.hasOwnProperty(E) && R !== B && (R != null || B != null) && (E === "selected" ? e.selected = R && typeof R != "function" && typeof R != "symbol" : Ye(
            e,
            t,
            E,
            R,
            i,
            B
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
          R = l[pe], l.hasOwnProperty(pe) && R != null && !i.hasOwnProperty(pe) && Ye(e, t, pe, null, i, R);
        for (N in i)
          if (R = i[N], B = l[N], i.hasOwnProperty(N) && R !== B && (R != null || B != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null)
                  throw Error(u(137, t));
                break;
              default:
                Ye(
                  e,
                  t,
                  N,
                  R,
                  i,
                  B
                );
            }
        return;
      default:
        if (ju(t)) {
          for (var Ge in l)
            R = l[Ge], l.hasOwnProperty(Ge) && R !== void 0 && !i.hasOwnProperty(Ge) && ks(
              e,
              t,
              Ge,
              void 0,
              i,
              R
            );
          for (q in i)
            R = i[q], B = l[q], !i.hasOwnProperty(q) || R === B || R === void 0 && B === void 0 || ks(
              e,
              t,
              q,
              R,
              i,
              B
            );
          return;
        }
    }
    for (var C in l)
      R = l[C], l.hasOwnProperty(C) && R != null && !i.hasOwnProperty(C) && Ye(e, t, C, null, i, R);
    for (Q in i)
      R = i[Q], B = l[Q], !i.hasOwnProperty(Q) || R === B || R == null && B == null || Ye(e, t, Q, R, i, B);
  }
  function hm(e) {
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
  function d1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var o = l[i], s = o.transferSize, g = o.initiatorType, x = o.duration;
        if (s && x && hm(g)) {
          for (g = 0, x = o.responseEnd, i += 1; i < l.length; i++) {
            var E = l[i], N = E.startTime;
            if (N > x) break;
            var q = E.transferSize, Q = E.initiatorType;
            q && hm(Q) && (E = E.responseEnd, g += q * (E < x ? 1 : (x - N) / (E - N)));
          }
          if (--i, t += 8 * (s + g) / (o.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ws = null, Es = null;
  function Zr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function mm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function pm(e, t) {
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
  function zs(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ts = null;
  function h1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ts ? !1 : (Ts = e, !0) : (Ts = null, !1);
  }
  var gm = typeof setTimeout == "function" ? setTimeout : void 0, m1 = typeof clearTimeout == "function" ? clearTimeout : void 0, ym = typeof Promise == "function" ? Promise : void 0, p1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof ym < "u" ? function(e) {
    return ym.resolve(null).then(e).catch(g1);
  } : gm;
  function g1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function al(e) {
    return e === "head";
  }
  function bm(e, t) {
    var l = t, i = 0;
    do {
      var o = l.nextSibling;
      if (e.removeChild(l), o && o.nodeType === 8)
        if (l = o.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(o), Ci(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          xa(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, xa(l);
          for (var s = l.firstChild; s; ) {
            var g = s.nextSibling, x = s.nodeName;
            s[Ui] || x === "SCRIPT" || x === "STYLE" || x === "LINK" && s.rel.toLowerCase() === "stylesheet" || l.removeChild(s), s = g;
          }
        } else
          l === "body" && xa(e.ownerDocument.body);
      l = o;
    } while (l);
    Ci(t);
  }
  function xm(e, t) {
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
  function As(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          As(l), Du(l);
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
  function y1(e, t, l, i) {
    for (; e.nodeType === 1; ) {
      var o = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[Ui])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (s = e.getAttribute("rel"), s === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (s !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (s = e.getAttribute("src"), (s !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var s = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === s)
          return e;
      } else return e;
      if (e = tn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function b1(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = tn(e.nextSibling), e === null)) return null;
    return e;
  }
  function vm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = tn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Cs(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function _s(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function x1(e, t) {
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
  var Os = null;
  function Sm(e) {
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
  function km(e) {
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
  function wm(e, t, l) {
    switch (t = Zr(l), e) {
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
    Du(e);
  }
  var nn = /* @__PURE__ */ new Map(), Em = /* @__PURE__ */ new Set();
  function Kr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ln = F.d;
  F.d = {
    f: v1,
    r: S1,
    D: k1,
    C: w1,
    L: E1,
    m: z1,
    X: A1,
    S: T1,
    M: C1
  };
  function v1() {
    var e = Ln.f(), t = Br();
    return e || t;
  }
  function S1(e) {
    var t = Kl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Yd(t) : Ln.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function zm(e, t, l) {
    var i = zi;
    if (i && typeof t == "string" && t) {
      var o = Ft(t);
      o = 'link[rel="' + e + '"][href="' + o + '"]', typeof l == "string" && (o += '[crossorigin="' + l + '"]'), Em.has(o) || (Em.add(o), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), pt(t, "link", e), st(t), i.head.appendChild(t)));
    }
  }
  function k1(e) {
    Ln.D(e), zm("dns-prefetch", e, null);
  }
  function w1(e, t) {
    Ln.C(e, t), zm("preconnect", e, t);
  }
  function E1(e, t, l) {
    Ln.L(e, t, l);
    var i = zi;
    if (i && e && t) {
      var o = 'link[rel="preload"][as="' + Ft(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (o += '[imagesrcset="' + Ft(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (o += '[imagesizes="' + Ft(
        l.imageSizes
      ) + '"]')) : o += '[href="' + Ft(e) + '"]';
      var s = o;
      switch (t) {
        case "style":
          s = Ti(e);
          break;
        case "script":
          s = Ai(e);
      }
      nn.has(s) || (e = y(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), nn.set(s, e), i.querySelector(o) !== null || t === "style" && i.querySelector(va(s)) || t === "script" && i.querySelector(Sa(s)) || (t = i.createElement("link"), pt(t, "link", e), st(t), i.head.appendChild(t)));
    }
  }
  function z1(e, t) {
    Ln.m(e, t);
    var l = zi;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + Ft(i) + '"][href="' + Ft(e) + '"]', s = o;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = Ai(e);
      }
      if (!nn.has(s) && (e = y({ rel: "modulepreload", href: e }, t), nn.set(s, e), l.querySelector(o) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Sa(s)))
              return;
        }
        i = l.createElement("link"), pt(i, "link", e), st(i), l.head.appendChild(i);
      }
    }
  }
  function T1(e, t, l) {
    Ln.S(e, t, l);
    var i = zi;
    if (i && e) {
      var o = Fl(i).hoistableStyles, s = Ti(e);
      t = t || "default";
      var g = o.get(s);
      if (!g) {
        var x = { loading: 0, preload: null };
        if (g = i.querySelector(
          va(s)
        ))
          x.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = nn.get(s)) && Ds(e, l);
          var E = g = i.createElement("link");
          st(E), pt(E, "link", e), E._p = new Promise(function(N, q) {
            E.onload = N, E.onerror = q;
          }), E.addEventListener("load", function() {
            x.loading |= 1;
          }), E.addEventListener("error", function() {
            x.loading |= 2;
          }), x.loading |= 4, Fr(g, t, i);
        }
        g = {
          type: "stylesheet",
          instance: g,
          count: 1,
          state: x
        }, o.set(s, g);
      }
    }
  }
  function A1(e, t) {
    Ln.X(e, t);
    var l = zi;
    if (l && e) {
      var i = Fl(l).hoistableScripts, o = Ai(e), s = i.get(o);
      s || (s = l.querySelector(Sa(o)), s || (e = y({ src: e, async: !0 }, t), (t = nn.get(o)) && Ms(e, t), s = l.createElement("script"), st(s), pt(s, "link", e), l.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(o, s));
    }
  }
  function C1(e, t) {
    Ln.M(e, t);
    var l = zi;
    if (l && e) {
      var i = Fl(l).hoistableScripts, o = Ai(e), s = i.get(o);
      s || (s = l.querySelector(Sa(o)), s || (e = y({ src: e, async: !0, type: "module" }, t), (t = nn.get(o)) && Ms(e, t), s = l.createElement("script"), st(s), pt(s, "link", e), l.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(o, s));
    }
  }
  function Tm(e, t, l, i) {
    var o = (o = ne.current) ? Kr(o) : null;
    if (!o) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Ti(l.href), l = Fl(
          o
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Ti(l.href);
          var s = Fl(
            o
          ).hoistableStyles, g = s.get(e);
          if (g || (o = o.ownerDocument || o, g = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(e, g), (s = o.querySelector(
            va(e)
          )) && !s._p && (g.instance = s, g.state.loading = 5), nn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, nn.set(e, l), s || _1(
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
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ai(l), l = Fl(
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
  function Ti(e) {
    return 'href="' + Ft(e) + '"';
  }
  function va(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Am(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function _1(e, t, l, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), pt(t, "link", l), st(t), e.head.appendChild(t));
  }
  function Ai(e) {
    return '[src="' + Ft(e) + '"]';
  }
  function Sa(e) {
    return "script[async]" + e;
  }
  function Cm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Ft(l.href) + '"]'
          );
          if (i)
            return t.instance = i, st(i), i;
          var o = y({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), st(i), pt(i, "style", o), Fr(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          o = Ti(l.href);
          var s = e.querySelector(
            va(o)
          );
          if (s)
            return t.state.loading |= 4, t.instance = s, st(s), s;
          i = Am(l), (o = nn.get(o)) && Ds(i, o), s = (e.ownerDocument || e).createElement("link"), st(s);
          var g = s;
          return g._p = new Promise(function(x, E) {
            g.onload = x, g.onerror = E;
          }), pt(s, "link", i), t.state.loading |= 4, Fr(s, l.precedence, e), t.instance = s;
        case "script":
          return s = Ai(l.src), (o = e.querySelector(
            Sa(s)
          )) ? (t.instance = o, st(o), o) : (i = l, (o = nn.get(s)) && (i = y({}, l), Ms(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), st(o), pt(o, "link", i), e.head.appendChild(o), t.instance = o);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Fr(i, l.precedence, e));
    return t.instance;
  }
  function Fr(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), o = i.length ? i[i.length - 1] : null, s = o, g = 0; g < i.length; g++) {
      var x = i[g];
      if (x.dataset.precedence === t) s = x;
      else if (s !== o) break;
    }
    s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Ds(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ms(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Jr = null;
  function _m(e, t, l) {
    if (Jr === null) {
      var i = /* @__PURE__ */ new Map(), o = Jr = /* @__PURE__ */ new Map();
      o.set(l, i);
    } else
      o = Jr, i = o.get(l), i || (i = /* @__PURE__ */ new Map(), o.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), o = 0; o < l.length; o++) {
      var s = l[o];
      if (!(s[Ui] || s[ft] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var g = s.getAttribute(t) || "";
        g = e + g;
        var x = i.get(g);
        x ? x.push(s) : i.set(g, [s]);
      }
    }
    return i;
  }
  function Om(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function O1(e, t, l) {
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
  function Dm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function D1(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var o = Ti(i.href), s = t.querySelector(
          va(o)
        );
        if (s) {
          t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ir.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = s, st(s);
          return;
        }
        s = t.ownerDocument || t, i = Am(i), (o = nn.get(o)) && Ds(i, o), s = s.createElement("link"), st(s);
        var g = s;
        g._p = new Promise(function(x, E) {
          g.onload = x, g.onerror = E;
        }), pt(s, "link", i), l.instance = s;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Ir.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Ns = 0;
  function M1(e, t) {
    return e.stylesheets && e.count === 0 && Wr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && Wr(e, e.stylesheets), e.unsuspend) {
          var s = e.unsuspend;
          e.unsuspend = null, s();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ns === 0 && (Ns = 62500 * d1());
      var o = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Wr(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        },
        (e.imgBytes > Ns ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(o);
      };
    } : null;
  }
  function Ir() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Wr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var $r = null;
  function Wr(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, $r = /* @__PURE__ */ new Map(), t.forEach(N1, e), $r = null, Ir.call(e));
  }
  function N1(e, t) {
    if (!(t.state.loading & 4)) {
      var l = $r.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), $r.set(e, l);
        for (var o = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < o.length; s++) {
          var g = o[s];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") && (l.set(g.dataset.precedence, g), i = g);
        }
        i && l.set(null, i);
      }
      o = t.instance, g = o.getAttribute("data-precedence"), s = l.get(g) || i, s === i && l.set(null, o), l.set(g, o), this.count++, i = Ir.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), s ? s.parentNode.insertBefore(o, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ka = {
    $$typeof: G,
    Provider: null,
    Consumer: null,
    _currentValue: se,
    _currentValue2: se,
    _threadCount: 0
  };
  function R1(e, t, l, i, o, s, g, x, E) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Au(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Au(0), this.hiddenUpdates = Au(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = s, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Mm(e, t, l, i, o, s, g, x, E, N, q, Q) {
    return e = new R1(
      e,
      t,
      l,
      g,
      E,
      N,
      q,
      Q,
      x
    ), t = 1, s === !0 && (t |= 24), s = Ht(3, null, null, t), e.current = s, s.stateNode = e, t = fo(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, go(s), e;
  }
  function Nm(e) {
    return e ? (e = ii, e) : ii;
  }
  function Rm(e, t, l, i, o, s) {
    o = Nm(o), i.context === null ? i.context = o : i.pendingContext = o, i = Fn(t), i.payload = { element: l }, s = s === void 0 ? null : s, s !== null && (i.callback = s), l = Jn(e, i, t), l !== null && (Rt(l, e, t), ea(l, e, t));
  }
  function jm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Rs(e, t) {
    jm(e, t), (e = e.alternate) && jm(e, t);
  }
  function Lm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Sl(e, 67108864);
      t !== null && Rt(t, e, 67108864), Rs(e, 67108864);
    }
  }
  function Um(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xt();
      t = Cu(t);
      var l = Sl(e, t);
      l !== null && Rt(l, e, t), Rs(e, t);
    }
  }
  var Pr = !0;
  function j1(e, t, l, i) {
    var o = D.T;
    D.T = null;
    var s = F.p;
    try {
      F.p = 2, js(e, t, l, i);
    } finally {
      F.p = s, D.T = o;
    }
  }
  function L1(e, t, l, i) {
    var o = D.T;
    D.T = null;
    var s = F.p;
    try {
      F.p = 8, js(e, t, l, i);
    } finally {
      F.p = s, D.T = o;
    }
  }
  function js(e, t, l, i) {
    if (Pr) {
      var o = Ls(i);
      if (o === null)
        Ss(
          e,
          t,
          i,
          eu,
          l
        ), Hm(e, i);
      else if (B1(
        o,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (Hm(e, i), t & 4 && -1 < U1.indexOf(e)) {
        for (; o !== null; ) {
          var s = Kl(o);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var g = gl(s.pendingLanes);
                  if (g !== 0) {
                    var x = s;
                    for (x.pendingLanes |= 2, x.entangledLanes |= 2; g; ) {
                      var E = 1 << 31 - Xe(g);
                      x.entanglements[1] |= E, g &= ~E;
                    }
                    mn(s), (Le & 6) === 0 && (Lr = St() + 500, ga(0));
                  }
                }
                break;
              case 31:
              case 13:
                x = Sl(s, 2), x !== null && Rt(x, s, 2), Br(), Rs(s, 2);
            }
          if (s = Ls(i), s === null && Ss(
            e,
            t,
            i,
            eu,
            l
          ), s === o) break;
          o = s;
        }
        o !== null && i.stopPropagation();
      } else
        Ss(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function Ls(e) {
    return e = Uu(e), Us(e);
  }
  var eu = null;
  function Us(e) {
    if (eu = null, e = Zl(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = f(t), e !== null) return e;
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
    return eu = e, null;
  }
  function Bm(e) {
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
        switch (Tu()) {
          case V:
            return 2;
          case W:
            return 8;
          case ge:
          case Te:
            return 32;
          case Ue:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bs = !1, rl = null, ul = null, ol = null, wa = /* @__PURE__ */ new Map(), Ea = /* @__PURE__ */ new Map(), sl = [], U1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Hm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        rl = null;
        break;
      case "dragenter":
      case "dragleave":
        ul = null;
        break;
      case "mouseover":
      case "mouseout":
        ol = null;
        break;
      case "pointerover":
      case "pointerout":
        wa.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ea.delete(t.pointerId);
    }
  }
  function za(e, t, l, i, o, s) {
    return e === null || e.nativeEvent !== s ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: s,
      targetContainers: [o]
    }, t !== null && (t = Kl(t), t !== null && Lm(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function B1(e, t, l, i, o) {
    switch (t) {
      case "focusin":
        return rl = za(
          rl,
          e,
          t,
          l,
          i,
          o
        ), !0;
      case "dragenter":
        return ul = za(
          ul,
          e,
          t,
          l,
          i,
          o
        ), !0;
      case "mouseover":
        return ol = za(
          ol,
          e,
          t,
          l,
          i,
          o
        ), !0;
      case "pointerover":
        var s = o.pointerId;
        return wa.set(
          s,
          za(
            wa.get(s) || null,
            e,
            t,
            l,
            i,
            o
          )
        ), !0;
      case "gotpointercapture":
        return s = o.pointerId, Ea.set(
          s,
          za(
            Ea.get(s) || null,
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
  function qm(e) {
    var t = Zl(e.target);
    if (t !== null) {
      var l = d(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = f(l), t !== null) {
            e.blockedOn = t, Pc(e.priority, function() {
              Um(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, Pc(e.priority, function() {
              Um(l);
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
  function tu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Ls(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        Lu = i, l.target.dispatchEvent(i), Lu = null;
      } else
        return t = Kl(l), t !== null && Lm(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function Ym(e, t, l) {
    tu(e) && l.delete(t);
  }
  function H1() {
    Bs = !1, rl !== null && tu(rl) && (rl = null), ul !== null && tu(ul) && (ul = null), ol !== null && tu(ol) && (ol = null), wa.forEach(Ym), Ea.forEach(Ym);
  }
  function nu(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bs || (Bs = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      H1
    )));
  }
  var lu = null;
  function Gm(e) {
    lu !== e && (lu = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        lu === e && (lu = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], o = e[t + 2];
          if (typeof i != "function") {
            if (Us(i || l) === null)
              continue;
            break;
          }
          var s = Kl(l);
          s !== null && (e.splice(t, 3), t -= 3, Lo(
            s,
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
  function Ci(e) {
    function t(E) {
      return nu(E, e);
    }
    rl !== null && nu(rl, e), ul !== null && nu(ul, e), ol !== null && nu(ol, e), wa.forEach(t), Ea.forEach(t);
    for (var l = 0; l < sl.length; l++) {
      var i = sl[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < sl.length && (l = sl[0], l.blockedOn === null); )
      qm(l), l.blockedOn === null && sl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var o = l[i], s = l[i + 1], g = o[Ct] || null;
        if (typeof s == "function")
          g || Gm(l);
        else if (g) {
          var x = null;
          if (s && s.hasAttribute("formAction")) {
            if (o = s, g = s[Ct] || null)
              x = g.formAction;
            else if (Us(o) !== null) continue;
          } else x = g.action;
          typeof x == "function" ? l[i + 1] = x : (l.splice(i, 3), i -= 3), Gm(l);
        }
      }
  }
  function Vm() {
    function e(s) {
      s.canIntercept && s.info === "react-transition" && s.intercept({
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
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
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
  function Hs(e) {
    this._internalRoot = e;
  }
  iu.prototype.render = Hs.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var l = t.current, i = Xt();
    Rm(l, i, e, t, null, null);
  }, iu.prototype.unmount = Hs.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Rm(e.current, 2, null, e, null, null), Br(), t[Ql] = null;
    }
  };
  function iu(e) {
    this._internalRoot = e;
  }
  iu.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Wc();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < sl.length && t !== 0 && t < sl[l].priority; l++) ;
      sl.splice(l, 0, e), l === 0 && qm(e);
    }
  };
  var Xm = r.version;
  if (Xm !== "19.2.7")
    throw Error(
      u(
        527,
        Xm,
        "19.2.7"
      )
    );
  F.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = h(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var q1 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var au = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!au.isDisabled && au.supportsFiber)
      try {
        kt = au.inject(
          q1
        ), rt = au;
      } catch {
      }
  }
  return Aa.createRoot = function(e, t) {
    if (!c(e)) throw Error(u(299));
    var l = !1, i = "", o = $d, s = Wd, g = Pd;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = Mm(
      e,
      1,
      !1,
      null,
      null,
      l,
      i,
      null,
      o,
      s,
      g,
      Vm
    ), e[Ql] = t.current, vs(e), new Hs(t);
  }, Aa.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(u(299));
    var i = !1, o = "", s = $d, g = Wd, x = Pd, E = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (o = l.identifierPrefix), l.onUncaughtError !== void 0 && (s = l.onUncaughtError), l.onCaughtError !== void 0 && (g = l.onCaughtError), l.onRecoverableError !== void 0 && (x = l.onRecoverableError), l.formState !== void 0 && (E = l.formState)), t = Mm(
      e,
      1,
      !0,
      t,
      l ?? null,
      i,
      o,
      E,
      s,
      g,
      x,
      Vm
    ), t.context = Nm(null), l = t.current, i = Xt(), i = Cu(i), o = Fn(i), o.callback = null, Jn(l, o, i), l = i, t.current.lanes = l, Li(t, l), mn(t), e[Ql] = t.current, vs(e), new iu(t);
  }, Aa.version = "19.2.7", Aa;
}
var ep;
function I1() {
  if (ep) return Gs.exports;
  ep = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Gs.exports = /* @__PURE__ */ J1(), Gs.exports;
}
var $1 = /* @__PURE__ */ I1();
function W1(n, r) {
  const a = {};
  return (n[n.length - 1] === "" ? [...n, ""] : n).join(
    (a.padRight ? " " : "") + "," + (a.padLeft === !1 ? "" : " ")
  ).trim();
}
const P1 = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ex = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, tx = {};
function tp(n, r) {
  return (tx.jsx ? ex : P1).test(n);
}
const nx = /[ \t\n\f\r]/g;
function lx(n) {
  return typeof n == "object" ? n.type === "text" ? np(n.value) : !1 : np(n);
}
function np(n) {
  return n.replace(nx, "") === "";
}
class Ha {
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
Ha.prototype.normal = {};
Ha.prototype.property = {};
Ha.prototype.space = void 0;
function Pp(n, r) {
  const a = {}, u = {};
  for (const c of n)
    Object.assign(a, c.property), Object.assign(u, c.normal);
  return new Ha(a, u, r);
}
function dc(n) {
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
let ix = 0;
const be = Hl(), at = Hl(), hc = Hl(), J = Hl(), Ze = Hl(), Ul = Hl(), Qt = Hl();
function Hl() {
  return 2 ** ++ix;
}
const mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: be,
  booleanish: at,
  commaOrSpaceSeparated: Qt,
  commaSeparated: Ul,
  number: J,
  overloadedBoolean: hc,
  spaceSeparated: Ze
}, Symbol.toStringTag, { value: "Module" })), Zs = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(mc)
);
class Tc extends Lt {
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
  constructor(r, a, u, c) {
    let d = -1;
    if (super(r, a), lp(this, "space", c), typeof u == "number")
      for (; ++d < Zs.length; ) {
        const f = Zs[d];
        lp(this, Zs[d], (u & mc[f]) === mc[f]);
      }
  }
}
Tc.prototype.defined = !0;
function lp(n, r, a) {
  a && (n[r] = a);
}
function Mi(n) {
  const r = {}, a = {};
  for (const [u, c] of Object.entries(n.properties)) {
    const d = new Tc(
      u,
      n.transform(n.attributes || {}, u),
      c,
      n.space
    );
    n.mustUseProperty && n.mustUseProperty.includes(u) && (d.mustUseProperty = !0), r[u] = d, a[dc(u)] = u, a[dc(d.attribute)] = u;
  }
  return new Ha(r, a, n.space);
}
const eg = Mi({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: at,
    ariaAutoComplete: null,
    ariaBusy: at,
    ariaChecked: at,
    ariaColCount: J,
    ariaColIndex: J,
    ariaColSpan: J,
    ariaControls: Ze,
    ariaCurrent: null,
    ariaDescribedBy: Ze,
    ariaDetails: null,
    ariaDisabled: at,
    ariaDropEffect: Ze,
    ariaErrorMessage: null,
    ariaExpanded: at,
    ariaFlowTo: Ze,
    ariaGrabbed: at,
    ariaHasPopup: null,
    ariaHidden: at,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Ze,
    ariaLevel: J,
    ariaLive: null,
    ariaModal: at,
    ariaMultiLine: at,
    ariaMultiSelectable: at,
    ariaOrientation: null,
    ariaOwns: Ze,
    ariaPlaceholder: null,
    ariaPosInSet: J,
    ariaPressed: at,
    ariaReadOnly: at,
    ariaRelevant: null,
    ariaRequired: at,
    ariaRoleDescription: Ze,
    ariaRowCount: J,
    ariaRowIndex: J,
    ariaRowSpan: J,
    ariaSelected: at,
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
function tg(n, r) {
  return r in n ? n[r] : r;
}
function ng(n, r) {
  return tg(n, r.toLowerCase());
}
const ax = Mi({
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
    accept: Ul,
    acceptCharset: Ze,
    accessKey: Ze,
    action: null,
    allow: null,
    allowFullScreen: be,
    allowPaymentRequest: be,
    allowUserMedia: be,
    alpha: be,
    alt: null,
    as: null,
    async: be,
    autoCapitalize: null,
    autoComplete: Ze,
    autoFocus: be,
    autoPlay: be,
    blocking: Ze,
    capture: null,
    charSet: null,
    checked: be,
    cite: null,
    className: Ze,
    closedBy: null,
    colorSpace: null,
    cols: J,
    colSpan: J,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: at,
    controls: be,
    controlsList: Ze,
    coords: J | Ul,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: be,
    defer: be,
    dir: null,
    dirName: null,
    disabled: be,
    download: hc,
    draggable: at,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: be,
    formTarget: null,
    headers: Ze,
    height: J,
    hidden: hc,
    high: J,
    href: null,
    hrefLang: null,
    htmlFor: Ze,
    httpEquiv: Ze,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: be,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: be,
    itemId: null,
    itemProp: Ze,
    itemRef: Ze,
    itemScope: be,
    itemType: Ze,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: be,
    low: J,
    manifest: null,
    max: null,
    maxLength: J,
    media: null,
    method: null,
    min: null,
    minLength: J,
    multiple: be,
    muted: be,
    name: null,
    nonce: null,
    noModule: be,
    noValidate: be,
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
    open: be,
    optimum: J,
    pattern: null,
    ping: Ze,
    placeholder: null,
    playsInline: be,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: be,
    referrerPolicy: null,
    rel: Ze,
    required: be,
    reversed: be,
    rows: J,
    rowSpan: J,
    sandbox: Ze,
    scope: null,
    scoped: be,
    seamless: be,
    selected: be,
    shadowRootClonable: be,
    shadowRootCustomElementRegistry: be,
    shadowRootDelegatesFocus: be,
    shadowRootMode: null,
    shadowRootSerializable: be,
    shape: null,
    size: J,
    sizes: null,
    slot: null,
    span: J,
    spellCheck: at,
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
    typeMustMatch: be,
    useMap: null,
    value: at,
    width: J,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Ze,
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
    compact: be,
    // Lists. Use CSS to reduce space between items instead
    declare: be,
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
    noResize: be,
    // `<frame>`
    noHref: be,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: be,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: be,
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
    scrolling: at,
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
    credentialless: be,
    disablePictureInPicture: be,
    disableRemotePlayback: be,
    exportParts: Ul,
    part: Ze,
    prefix: null,
    property: null,
    results: J,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: ng
}), rx = Mi({
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
    className: Ze,
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
    download: be,
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
    g1: Ul,
    g2: Ul,
    glyphName: Ul,
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
    ping: Ze,
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
  transform: tg
}), lg = Mi({
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
}), ig = Mi({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: ng
}), ag = Mi({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(n, r) {
    return "xml:" + r.slice(3).toLowerCase();
  }
}), ux = {
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
}, ox = /[A-Z]/g, ip = /-[a-z]/g, sx = /^data[-\w.:]+$/i;
function cx(n, r) {
  const a = dc(r);
  let u = r, c = Lt;
  if (a in n.normal)
    return n.property[n.normal[a]];
  if (a.length > 4 && a.slice(0, 4) === "data" && sx.test(r)) {
    if (r.charAt(4) === "-") {
      const d = r.slice(5).replace(ip, dx);
      u = "data" + d.charAt(0).toUpperCase() + d.slice(1);
    } else {
      const d = r.slice(4);
      if (!ip.test(d)) {
        let f = d.replace(ox, fx);
        f.charAt(0) !== "-" && (f = "-" + f), r = "data" + f;
      }
    }
    c = Tc;
  }
  return new c(u, r);
}
function fx(n) {
  return "-" + n.toLowerCase();
}
function dx(n) {
  return n.charAt(1).toUpperCase();
}
const hx = Pp([eg, ax, lg, ig, ag], "html"), Ac = Pp([eg, rx, lg, ig, ag], "svg");
function mx(n) {
  return n.join(" ").trim();
}
var _i = {}, Ks, ap;
function px() {
  if (ap) return Ks;
  ap = 1;
  var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, a = /^\s*/, u = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, c = /^:\s*/, d = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, f = /^[;\s]*/, m = /^\s+|\s+$/g, p = `
`, h = "/", b = "*", y = "", S = "comment", v = "declaration";
  function T(j, O) {
    if (typeof j != "string")
      throw new TypeError("First argument must be a string");
    if (!j) return [];
    O = O || {};
    var Z = 1, G = 1;
    function le(ue) {
      var I = ue.match(r);
      I && (Z += I.length);
      var D = ue.lastIndexOf(p);
      G = ~D ? ue.length - D : G + ue.length;
    }
    function fe() {
      var ue = { line: Z, column: G };
      return function(I) {
        return I.position = new H(ue), de(), I;
      };
    }
    function H(ue) {
      this.start = ue, this.end = { line: Z, column: G }, this.source = O.source;
    }
    H.prototype.content = j;
    function $(ue) {
      var I = new Error(
        O.source + ":" + Z + ":" + G + ": " + ue
      );
      if (I.reason = ue, I.filename = O.source, I.line = Z, I.column = G, I.source = j, !O.silent) throw I;
    }
    function K(ue) {
      var I = ue.exec(j);
      if (I) {
        var D = I[0];
        return le(D), j = j.slice(D.length), I;
      }
    }
    function de() {
      K(a);
    }
    function U(ue) {
      var I;
      for (ue = ue || []; I = te(); )
        I !== !1 && ue.push(I);
      return ue;
    }
    function te() {
      var ue = fe();
      if (!(h != j.charAt(0) || b != j.charAt(1))) {
        for (var I = 2; y != j.charAt(I) && (b != j.charAt(I) || h != j.charAt(I + 1)); )
          ++I;
        if (I += 2, y === j.charAt(I - 1))
          return $("End of comment missing");
        var D = j.slice(2, I - 2);
        return G += 2, le(D), j = j.slice(I), G += 2, ue({
          type: S,
          comment: D
        });
      }
    }
    function ee() {
      var ue = fe(), I = K(u);
      if (I) {
        if (te(), !K(c)) return $("property missing ':'");
        var D = K(d), F = ue({
          type: v,
          property: L(I[0].replace(n, y)),
          value: D ? L(D[0].replace(n, y)) : y
        });
        return K(f), F;
      }
    }
    function Ee() {
      var ue = [];
      U(ue);
      for (var I; I = ee(); )
        I !== !1 && (ue.push(I), U(ue));
      return ue;
    }
    return de(), Ee();
  }
  function L(j) {
    return j ? j.replace(m, y) : y;
  }
  return Ks = T, Ks;
}
var rp;
function gx() {
  if (rp) return _i;
  rp = 1;
  var n = _i && _i.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(_i, "__esModule", { value: !0 }), _i.default = a;
  const r = n(/* @__PURE__ */ px());
  function a(u, c) {
    let d = null;
    if (!u || typeof u != "string")
      return d;
    const f = (0, r.default)(u), m = typeof c == "function";
    return f.forEach((p) => {
      if (p.type !== "declaration")
        return;
      const { property: h, value: b } = p;
      m ? c(h, b, p) : b && (d = d || {}, d[h] = b);
    }), d;
  }
  return _i;
}
var Ca = {}, up;
function yx() {
  if (up) return Ca;
  up = 1, Object.defineProperty(Ca, "__esModule", { value: !0 }), Ca.camelCase = void 0;
  var n = /^--[a-zA-Z0-9_-]+$/, r = /-([a-z])/g, a = /^[^-]+$/, u = /^-(webkit|moz|ms|o|khtml)-/, c = /^-(ms)-/, d = function(h) {
    return !h || a.test(h) || n.test(h);
  }, f = function(h, b) {
    return b.toUpperCase();
  }, m = function(h, b) {
    return "".concat(b, "-");
  }, p = function(h, b) {
    return b === void 0 && (b = {}), d(h) ? h : (h = h.toLowerCase(), b.reactCompat ? h = h.replace(c, m) : h = h.replace(u, m), h.replace(r, f));
  };
  return Ca.camelCase = p, Ca;
}
var _a, op;
function bx() {
  if (op) return _a;
  op = 1;
  var n = _a && _a.__importDefault || function(c) {
    return c && c.__esModule ? c : { default: c };
  }, r = n(/* @__PURE__ */ gx()), a = /* @__PURE__ */ yx();
  function u(c, d) {
    var f = {};
    return !c || typeof c != "string" || (0, r.default)(c, function(m, p) {
      m && p && (f[(0, a.camelCase)(m, d)] = p);
    }), f;
  }
  return u.default = u, _a = u, _a;
}
var xx = /* @__PURE__ */ bx();
const vx = /* @__PURE__ */ Wp(xx), rg = ug("end"), Cc = ug("start");
function ug(n) {
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
function Sx(n) {
  const r = Cc(n), a = rg(n);
  if (r && a)
    return { start: r, end: a };
}
function Na(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? sp(n.position) : "start" in n || "end" in n ? sp(n) : "line" in n || "column" in n ? pc(n) : "";
}
function pc(n) {
  return cp(n && n.line) + ":" + cp(n && n.column);
}
function sp(n) {
  return pc(n && n.start) + "-" + pc(n && n.end);
}
function cp(n) {
  return n && typeof n == "number" ? n : 1;
}
class xt extends Error {
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
    let c = "", d = {}, f = !1;
    if (a && ("line" in a && "column" in a ? d = { place: a } : "start" in a && "end" in a ? d = { place: a } : "type" in a ? d = {
      ancestors: [a],
      place: a.position
    } : d = { ...a }), typeof r == "string" ? c = r : !d.cause && r && (f = !0, c = r.message, d.cause = r), !d.ruleId && !d.source && typeof u == "string") {
      const p = u.indexOf(":");
      p === -1 ? d.ruleId = u : (d.source = u.slice(0, p), d.ruleId = u.slice(p + 1));
    }
    if (!d.place && d.ancestors && d.ancestors) {
      const p = d.ancestors[d.ancestors.length - 1];
      p && (d.place = p.position);
    }
    const m = d.place && "start" in d.place ? d.place.start : d.place;
    this.ancestors = d.ancestors || void 0, this.cause = d.cause || void 0, this.column = m ? m.column : void 0, this.fatal = void 0, this.file = "", this.message = c, this.line = m ? m.line : void 0, this.name = Na(d.place) || "1:1", this.place = d.place || void 0, this.reason = this.message, this.ruleId = d.ruleId || void 0, this.source = d.source || void 0, this.stack = f && d.cause && typeof d.cause.stack == "string" ? d.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
xt.prototype.file = "";
xt.prototype.name = "";
xt.prototype.reason = "";
xt.prototype.message = "";
xt.prototype.stack = "";
xt.prototype.column = void 0;
xt.prototype.line = void 0;
xt.prototype.ancestors = void 0;
xt.prototype.cause = void 0;
xt.prototype.fatal = void 0;
xt.prototype.place = void 0;
xt.prototype.ruleId = void 0;
xt.prototype.source = void 0;
const _c = {}.hasOwnProperty, kx = /* @__PURE__ */ new Map(), wx = /[A-Z]/g, Ex = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), zx = /* @__PURE__ */ new Set(["td", "th"]), og = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Tx(n, r) {
  if (!r || r.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const a = r.filePath || void 0;
  let u;
  if (r.development) {
    if (typeof r.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    u = Rx(a, r.jsxDEV);
  } else {
    if (typeof r.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof r.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    u = Nx(a, r.jsx, r.jsxs);
  }
  const c = {
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
    schema: r.space === "svg" ? Ac : hx,
    stylePropertyNameCase: r.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: r.tableCellAlignToStyle !== !1
  }, d = sg(c, n, void 0);
  return d && typeof d != "string" ? d : c.create(
    n,
    c.Fragment,
    { children: d || void 0 },
    void 0
  );
}
function sg(n, r, a) {
  if (r.type === "element")
    return Ax(n, r, a);
  if (r.type === "mdxFlowExpression" || r.type === "mdxTextExpression")
    return Cx(n, r);
  if (r.type === "mdxJsxFlowElement" || r.type === "mdxJsxTextElement")
    return Ox(n, r, a);
  if (r.type === "mdxjsEsm")
    return _x(n, r);
  if (r.type === "root")
    return Dx(n, r, a);
  if (r.type === "text")
    return Mx(n, r);
}
function Ax(n, r, a) {
  const u = n.schema;
  let c = u;
  r.tagName.toLowerCase() === "svg" && u.space === "html" && (c = Ac, n.schema = c), n.ancestors.push(r);
  const d = fg(n, r.tagName, !1), f = jx(n, r);
  let m = Dc(n, r);
  return Ex.has(r.tagName) && (m = m.filter(function(p) {
    return typeof p == "string" ? !lx(p) : !0;
  })), cg(n, f, d, r), Oc(f, m), n.ancestors.pop(), n.schema = u, n.create(r, d, f, a);
}
function Cx(n, r) {
  if (r.data && r.data.estree && n.evaluater) {
    const u = r.data.estree.body[0];
    return u.type, /** @type {Child | undefined} */
    n.evaluater.evaluateExpression(u.expression);
  }
  Ua(n, r.position);
}
function _x(n, r) {
  if (r.data && r.data.estree && n.evaluater)
    return (
      /** @type {Child | undefined} */
      n.evaluater.evaluateProgram(r.data.estree)
    );
  Ua(n, r.position);
}
function Ox(n, r, a) {
  const u = n.schema;
  let c = u;
  r.name === "svg" && u.space === "html" && (c = Ac, n.schema = c), n.ancestors.push(r);
  const d = r.name === null ? n.Fragment : fg(n, r.name, !0), f = Lx(n, r), m = Dc(n, r);
  return cg(n, f, d, r), Oc(f, m), n.ancestors.pop(), n.schema = u, n.create(r, d, f, a);
}
function Dx(n, r, a) {
  const u = {};
  return Oc(u, Dc(n, r)), n.create(r, n.Fragment, u, a);
}
function Mx(n, r) {
  return r.value;
}
function cg(n, r, a, u) {
  typeof a != "string" && a !== n.Fragment && n.passNode && (r.node = u);
}
function Oc(n, r) {
  if (r.length > 0) {
    const a = r.length > 1 ? r : r[0];
    a && (n.children = a);
  }
}
function Nx(n, r, a) {
  return u;
  function u(c, d, f, m) {
    const h = Array.isArray(f.children) ? a : r;
    return m ? h(d, f, m) : h(d, f);
  }
}
function Rx(n, r) {
  return a;
  function a(u, c, d, f) {
    const m = Array.isArray(d.children), p = Cc(u);
    return r(
      c,
      d,
      f,
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
function jx(n, r) {
  const a = {};
  let u, c;
  for (c in r.properties)
    if (c !== "children" && _c.call(r.properties, c)) {
      const d = Ux(n, c, r.properties[c]);
      if (d) {
        const [f, m] = d;
        n.tableCellAlignToStyle && f === "align" && typeof m == "string" && zx.has(r.tagName) ? u = m : a[f] = m;
      }
    }
  if (u) {
    const d = (
      /** @type {Style} */
      a.style || (a.style = {})
    );
    d[n.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = u;
  }
  return a;
}
function Lx(n, r) {
  const a = {};
  for (const u of r.attributes)
    if (u.type === "mdxJsxExpressionAttribute")
      if (u.data && u.data.estree && n.evaluater) {
        const d = u.data.estree.body[0];
        d.type;
        const f = d.expression;
        f.type;
        const m = f.properties[0];
        m.type, Object.assign(
          a,
          n.evaluater.evaluateExpression(m.argument)
        );
      } else
        Ua(n, r.position);
    else {
      const c = u.name;
      let d;
      if (u.value && typeof u.value == "object")
        if (u.value.data && u.value.data.estree && n.evaluater) {
          const m = u.value.data.estree.body[0];
          m.type, d = n.evaluater.evaluateExpression(m.expression);
        } else
          Ua(n, r.position);
      else
        d = u.value === null ? !0 : u.value;
      a[c] = /** @type {Props[keyof Props]} */
      d;
    }
  return a;
}
function Dc(n, r) {
  const a = [];
  let u = -1;
  const c = n.passKeys ? /* @__PURE__ */ new Map() : kx;
  for (; ++u < r.children.length; ) {
    const d = r.children[u];
    let f;
    if (n.passKeys) {
      const p = d.type === "element" ? d.tagName : d.type === "mdxJsxFlowElement" || d.type === "mdxJsxTextElement" ? d.name : void 0;
      if (p) {
        const h = c.get(p) || 0;
        f = p + "-" + h, c.set(p, h + 1);
      }
    }
    const m = sg(n, d, f);
    m !== void 0 && a.push(m);
  }
  return a;
}
function Ux(n, r, a) {
  const u = cx(n.schema, r);
  if (!(a == null || typeof a == "number" && Number.isNaN(a))) {
    if (Array.isArray(a) && (a = u.commaSeparated ? W1(a) : mx(a)), u.property === "style") {
      let c = typeof a == "object" ? a : Bx(n, String(a));
      return n.stylePropertyNameCase === "css" && (c = Hx(c)), ["style", c];
    }
    return [
      n.elementAttributeNameCase === "react" && u.space ? ux[u.property] || u.property : u.attribute,
      a
    ];
  }
}
function Bx(n, r) {
  try {
    return vx(r, { reactCompat: !0 });
  } catch (a) {
    if (n.ignoreInvalidStyle)
      return {};
    const u = (
      /** @type {Error} */
      a
    ), c = new xt("Cannot parse `style` attribute", {
      ancestors: n.ancestors,
      cause: u,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw c.file = n.filePath || void 0, c.url = og + "#cannot-parse-style-attribute", c;
  }
}
function fg(n, r, a) {
  let u;
  if (!a)
    u = { type: "Literal", value: r };
  else if (r.includes(".")) {
    const c = r.split(".");
    let d = -1, f;
    for (; ++d < c.length; ) {
      const m = tp(c[d]) ? { type: "Identifier", name: c[d] } : { type: "Literal", value: c[d] };
      f = f ? {
        type: "MemberExpression",
        object: f,
        property: m,
        computed: !!(d && m.type === "Literal"),
        optional: !1
      } : m;
    }
    u = f;
  } else
    u = tp(r) && !/^[a-z]/.test(r) ? { type: "Identifier", name: r } : { type: "Literal", value: r };
  if (u.type === "Literal") {
    const c = (
      /** @type {string | number} */
      u.value
    );
    return _c.call(n.components, c) ? n.components[c] : c;
  }
  if (n.evaluater)
    return n.evaluater.evaluateExpression(u);
  Ua(n);
}
function Ua(n, r) {
  const a = new xt(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: n.ancestors,
      place: r,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw a.file = n.filePath || void 0, a.url = og + "#cannot-handle-mdx-estrees-without-createevaluater", a;
}
function Hx(n) {
  const r = {};
  let a;
  for (a in n)
    _c.call(n, a) && (r[qx(a)] = n[a]);
  return r;
}
function qx(n) {
  let r = n.replace(wx, Yx);
  return r.slice(0, 3) === "ms-" && (r = "-" + r), r;
}
function Yx(n) {
  return "-" + n.toLowerCase();
}
const Fs = {
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
}, Gx = {};
function Mc(n, r) {
  const a = Gx, u = typeof a.includeImageAlt == "boolean" ? a.includeImageAlt : !0, c = typeof a.includeHtml == "boolean" ? a.includeHtml : !0;
  return dg(n, u, c);
}
function dg(n, r, a) {
  if (Vx(n)) {
    if ("value" in n)
      return n.type === "html" && !a ? "" : n.value;
    if (r && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return fp(n.children, r, a);
  }
  return Array.isArray(n) ? fp(n, r, a) : "";
}
function fp(n, r, a) {
  const u = [];
  let c = -1;
  for (; ++c < n.length; )
    u[c] = dg(n[c], r, a);
  return u.join("");
}
function Vx(n) {
  return !!(n && typeof n == "object");
}
const dp = document.createElement("i");
function Nc(n) {
  const r = "&" + n + ";";
  dp.innerHTML = r;
  const a = dp.textContent;
  return a.charCodeAt(a.length - 1) === 59 && n !== "semi" || a === r ? !1 : a;
}
function Zt(n, r, a, u) {
  const c = n.length;
  let d = 0, f;
  if (r < 0 ? r = -r > c ? 0 : c + r : r = r > c ? c : r, a = a > 0 ? a : 0, u.length < 1e4)
    f = Array.from(u), f.unshift(r, a), n.splice(...f);
  else
    for (a && n.splice(r, a); d < u.length; )
      f = u.slice(d, d + 1e4), f.unshift(r, 0), n.splice(...f), d += 1e4, r += 1e4;
}
function ln(n, r) {
  return n.length > 0 ? (Zt(n, n.length, 0, r), n) : r;
}
const hp = {}.hasOwnProperty;
function hg(n) {
  const r = {};
  let a = -1;
  for (; ++a < n.length; )
    Xx(r, n[a]);
  return r;
}
function Xx(n, r) {
  let a;
  for (a in r) {
    const c = (hp.call(n, a) ? n[a] : void 0) || (n[a] = {}), d = r[a];
    let f;
    if (d)
      for (f in d) {
        hp.call(c, f) || (c[f] = []);
        const m = d[f];
        Qx(
          // @ts-expect-error Looks like a list.
          c[f],
          Array.isArray(m) ? m : m ? [m] : []
        );
      }
  }
}
function Qx(n, r) {
  let a = -1;
  const u = [];
  for (; ++a < r.length; )
    (r[a].add === "after" ? n : u).push(r[a]);
  Zt(n, 0, 0, u);
}
function mg(n, r) {
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
const Et = hl(/[A-Za-z]/), bt = hl(/[\dA-Za-z]/), Zx = hl(/[#-'*+\--9=?A-Z^-~]/);
function mu(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const gc = hl(/\d/), Kx = hl(/[\dA-Fa-f]/), Fx = hl(/[!-/:-@[-`{-~]/);
function me(n) {
  return n !== null && n < -2;
}
function Ke(n) {
  return n !== null && (n < 0 || n === 32);
}
function _e(n) {
  return n === -2 || n === -1 || n === 32;
}
const xu = hl(new RegExp("\\p{P}|\\p{S}", "u")), Bl = hl(/\s/);
function hl(n) {
  return r;
  function r(a) {
    return a !== null && a > -1 && n.test(String.fromCharCode(a));
  }
}
function Ni(n) {
  const r = [];
  let a = -1, u = 0, c = 0;
  for (; ++a < n.length; ) {
    const d = n.charCodeAt(a);
    let f = "";
    if (d === 37 && bt(n.charCodeAt(a + 1)) && bt(n.charCodeAt(a + 2)))
      c = 2;
    else if (d < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(d)) || (f = String.fromCharCode(d));
    else if (d > 55295 && d < 57344) {
      const m = n.charCodeAt(a + 1);
      d < 56320 && m > 56319 && m < 57344 ? (f = String.fromCharCode(d, m), c = 1) : f = "�";
    } else
      f = String.fromCharCode(d);
    f && (r.push(n.slice(u, a), encodeURIComponent(f)), u = a + c + 1, f = ""), c && (a += c, c = 0);
  }
  return r.join("") + n.slice(u);
}
function Ne(n, r, a, u) {
  const c = u ? u - 1 : Number.POSITIVE_INFINITY;
  let d = 0;
  return f;
  function f(p) {
    return _e(p) ? (n.enter(a), m(p)) : r(p);
  }
  function m(p) {
    return _e(p) && d++ < c ? (n.consume(p), m) : (n.exit(a), r(p));
  }
}
const Jx = {
  tokenize: Ix
};
function Ix(n) {
  const r = n.attempt(this.parser.constructs.contentInitial, u, c);
  let a;
  return r;
  function u(m) {
    if (m === null) {
      n.consume(m);
      return;
    }
    return n.enter("lineEnding"), n.consume(m), n.exit("lineEnding"), Ne(n, r, "linePrefix");
  }
  function c(m) {
    return n.enter("paragraph"), d(m);
  }
  function d(m) {
    const p = n.enter("chunkText", {
      contentType: "text",
      previous: a
    });
    return a && (a.next = p), a = p, f(m);
  }
  function f(m) {
    if (m === null) {
      n.exit("chunkText"), n.exit("paragraph"), n.consume(m);
      return;
    }
    return me(m) ? (n.consume(m), n.exit("chunkText"), d) : (n.consume(m), f);
  }
}
const $x = {
  tokenize: Wx
}, mp = {
  tokenize: Px
};
function Wx(n) {
  const r = this, a = [];
  let u = 0, c, d, f;
  return m;
  function m(G) {
    if (u < a.length) {
      const le = a[u];
      return r.containerState = le[1], n.attempt(le[0].continuation, p, h)(G);
    }
    return h(G);
  }
  function p(G) {
    if (u++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, c && Z();
      const le = r.events.length;
      let fe = le, H;
      for (; fe--; )
        if (r.events[fe][0] === "exit" && r.events[fe][1].type === "chunkFlow") {
          H = r.events[fe][1].end;
          break;
        }
      O(u);
      let $ = le;
      for (; $ < r.events.length; )
        r.events[$][1].end = {
          ...H
        }, $++;
      return Zt(r.events, fe + 1, 0, r.events.slice(le)), r.events.length = $, h(G);
    }
    return m(G);
  }
  function h(G) {
    if (u === a.length) {
      if (!c)
        return S(G);
      if (c.currentConstruct && c.currentConstruct.concrete)
        return T(G);
      r.interrupt = !!(c.currentConstruct && !c._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(mp, b, y)(G);
  }
  function b(G) {
    return c && Z(), O(u), S(G);
  }
  function y(G) {
    return r.parser.lazy[r.now().line] = u !== a.length, f = r.now().offset, T(G);
  }
  function S(G) {
    return r.containerState = {}, n.attempt(mp, v, T)(G);
  }
  function v(G) {
    return u++, a.push([r.currentConstruct, r.containerState]), S(G);
  }
  function T(G) {
    if (G === null) {
      c && Z(), O(0), n.consume(G);
      return;
    }
    return c = c || r.parser.flow(r.now()), n.enter("chunkFlow", {
      _tokenizer: c,
      contentType: "flow",
      previous: d
    }), L(G);
  }
  function L(G) {
    if (G === null) {
      j(n.exit("chunkFlow"), !0), O(0), n.consume(G);
      return;
    }
    return me(G) ? (n.consume(G), j(n.exit("chunkFlow")), u = 0, r.interrupt = void 0, m) : (n.consume(G), L);
  }
  function j(G, le) {
    const fe = r.sliceStream(G);
    if (le && fe.push(null), G.previous = d, d && (d.next = G), d = G, c.defineSkip(G.start), c.write(fe), r.parser.lazy[G.start.line]) {
      let H = c.events.length;
      for (; H--; )
        if (
          // The token starts before the line ending…
          c.events[H][1].start.offset < f && // …and either is not ended yet…
          (!c.events[H][1].end || // …or ends after it.
          c.events[H][1].end.offset > f)
        )
          return;
      const $ = r.events.length;
      let K = $, de, U;
      for (; K--; )
        if (r.events[K][0] === "exit" && r.events[K][1].type === "chunkFlow") {
          if (de) {
            U = r.events[K][1].end;
            break;
          }
          de = !0;
        }
      for (O(u), H = $; H < r.events.length; )
        r.events[H][1].end = {
          ...U
        }, H++;
      Zt(r.events, K + 1, 0, r.events.slice($)), r.events.length = H;
    }
  }
  function O(G) {
    let le = a.length;
    for (; le-- > G; ) {
      const fe = a[le];
      r.containerState = fe[1], fe[0].exit.call(r, n);
    }
    a.length = G;
  }
  function Z() {
    c.write([null]), d = void 0, c = void 0, r.containerState._closeFlow = void 0;
  }
}
function Px(n, r, a) {
  return Ne(n, n.attempt(this.parser.constructs.document, r, a), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Di(n) {
  if (n === null || Ke(n) || Bl(n))
    return 1;
  if (xu(n))
    return 2;
}
function vu(n, r, a) {
  const u = [];
  let c = -1;
  for (; ++c < n.length; ) {
    const d = n[c].resolveAll;
    d && !u.includes(d) && (r = d(r, a), u.push(d));
  }
  return r;
}
const yc = {
  name: "attention",
  resolveAll: e0,
  tokenize: t0
};
function e0(n, r) {
  let a = -1, u, c, d, f, m, p, h, b;
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
          pp(y, -p), pp(S, p), f = {
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
          }, d = {
            type: p > 1 ? "strongText" : "emphasisText",
            start: {
              ...n[u][1].end
            },
            end: {
              ...n[a][1].start
            }
          }, c = {
            type: p > 1 ? "strong" : "emphasis",
            start: {
              ...f.start
            },
            end: {
              ...m.end
            }
          }, n[u][1].end = {
            ...f.start
          }, n[a][1].start = {
            ...m.end
          }, h = [], n[u][1].end.offset - n[u][1].start.offset && (h = ln(h, [["enter", n[u][1], r], ["exit", n[u][1], r]])), h = ln(h, [["enter", c, r], ["enter", f, r], ["exit", f, r], ["enter", d, r]]), h = ln(h, vu(r.parser.constructs.insideSpan.null, n.slice(u + 1, a), r)), h = ln(h, [["exit", d, r], ["enter", m, r], ["exit", m, r], ["exit", c, r]]), n[a][1].end.offset - n[a][1].start.offset ? (b = 2, h = ln(h, [["enter", n[a][1], r], ["exit", n[a][1], r]])) : b = 0, Zt(n, u - 1, a - u + 3, h), a = u + h.length - b - 2;
          break;
        }
    }
  for (a = -1; ++a < n.length; )
    n[a][1].type === "attentionSequence" && (n[a][1].type = "data");
  return n;
}
function t0(n, r) {
  const a = this.parser.constructs.attentionMarkers.null, u = this.previous, c = Di(u);
  let d;
  return f;
  function f(p) {
    return d = p, n.enter("attentionSequence"), m(p);
  }
  function m(p) {
    if (p === d)
      return n.consume(p), m;
    const h = n.exit("attentionSequence"), b = Di(p), y = !b || b === 2 && c || a.includes(p), S = !c || c === 2 && b || a.includes(u);
    return h._open = !!(d === 42 ? y : y && (c || !S)), h._close = !!(d === 42 ? S : S && (b || !y)), r(p);
  }
}
function pp(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const n0 = {
  name: "autolink",
  tokenize: l0
};
function l0(n, r, a) {
  let u = 0;
  return c;
  function c(v) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), d;
  }
  function d(v) {
    return Et(v) ? (n.consume(v), f) : v === 64 ? a(v) : h(v);
  }
  function f(v) {
    return v === 43 || v === 45 || v === 46 || bt(v) ? (u = 1, m(v)) : h(v);
  }
  function m(v) {
    return v === 58 ? (n.consume(v), u = 0, p) : (v === 43 || v === 45 || v === 46 || bt(v)) && u++ < 32 ? (n.consume(v), m) : (u = 0, h(v));
  }
  function p(v) {
    return v === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.exit("autolink"), r) : v === null || v === 32 || v === 60 || mu(v) ? a(v) : (n.consume(v), p);
  }
  function h(v) {
    return v === 64 ? (n.consume(v), b) : Zx(v) ? (n.consume(v), h) : a(v);
  }
  function b(v) {
    return bt(v) ? y(v) : a(v);
  }
  function y(v) {
    return v === 46 ? (n.consume(v), u = 0, b) : v === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(v), n.exit("autolinkMarker"), n.exit("autolink"), r) : S(v);
  }
  function S(v) {
    if ((v === 45 || bt(v)) && u++ < 63) {
      const T = v === 45 ? S : y;
      return n.consume(v), T;
    }
    return a(v);
  }
}
const qa = {
  partial: !0,
  tokenize: i0
};
function i0(n, r, a) {
  return u;
  function u(d) {
    return _e(d) ? Ne(n, c, "linePrefix")(d) : c(d);
  }
  function c(d) {
    return d === null || me(d) ? r(d) : a(d);
  }
}
const pg = {
  continuation: {
    tokenize: r0
  },
  exit: u0,
  name: "blockQuote",
  tokenize: a0
};
function a0(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    if (f === 62) {
      const m = u.containerState;
      return m.open || (n.enter("blockQuote", {
        _container: !0
      }), m.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(f), n.exit("blockQuoteMarker"), d;
    }
    return a(f);
  }
  function d(f) {
    return _e(f) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(f), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(f));
  }
}
function r0(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return _e(f) ? Ne(n, d, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : d(f);
  }
  function d(f) {
    return n.attempt(pg, r, a)(f);
  }
}
function u0(n) {
  n.exit("blockQuote");
}
const gg = {
  name: "characterEscape",
  tokenize: o0
};
function o0(n, r, a) {
  return u;
  function u(d) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(d), n.exit("escapeMarker"), c;
  }
  function c(d) {
    return Fx(d) ? (n.enter("characterEscapeValue"), n.consume(d), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : a(d);
  }
}
const yg = {
  name: "characterReference",
  tokenize: s0
};
function s0(n, r, a) {
  const u = this;
  let c = 0, d, f;
  return m;
  function m(y) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(y), n.exit("characterReferenceMarker"), p;
  }
  function p(y) {
    return y === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(y), n.exit("characterReferenceMarkerNumeric"), h) : (n.enter("characterReferenceValue"), d = 31, f = bt, b(y));
  }
  function h(y) {
    return y === 88 || y === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(y), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), d = 6, f = Kx, b) : (n.enter("characterReferenceValue"), d = 7, f = gc, b(y));
  }
  function b(y) {
    if (y === 59 && c) {
      const S = n.exit("characterReferenceValue");
      return f === bt && !Nc(u.sliceSerialize(S)) ? a(y) : (n.enter("characterReferenceMarker"), n.consume(y), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return f(y) && c++ < d ? (n.consume(y), b) : a(y);
  }
}
const gp = {
  partial: !0,
  tokenize: f0
}, yp = {
  concrete: !0,
  name: "codeFenced",
  tokenize: c0
};
function c0(n, r, a) {
  const u = this, c = {
    partial: !0,
    tokenize: fe
  };
  let d = 0, f = 0, m;
  return p;
  function p(H) {
    return h(H);
  }
  function h(H) {
    const $ = u.events[u.events.length - 1];
    return d = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, m = H, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), b(H);
  }
  function b(H) {
    return H === m ? (f++, n.consume(H), b) : f < 3 ? a(H) : (n.exit("codeFencedFenceSequence"), _e(H) ? Ne(n, y, "whitespace")(H) : y(H));
  }
  function y(H) {
    return H === null || me(H) ? (n.exit("codeFencedFence"), u.interrupt ? r(H) : n.check(gp, L, le)(H)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), S(H));
  }
  function S(H) {
    return H === null || me(H) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), y(H)) : _e(H) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), Ne(n, v, "whitespace")(H)) : H === 96 && H === m ? a(H) : (n.consume(H), S);
  }
  function v(H) {
    return H === null || me(H) ? y(H) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), T(H));
  }
  function T(H) {
    return H === null || me(H) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), y(H)) : H === 96 && H === m ? a(H) : (n.consume(H), T);
  }
  function L(H) {
    return n.attempt(c, le, j)(H);
  }
  function j(H) {
    return n.enter("lineEnding"), n.consume(H), n.exit("lineEnding"), O;
  }
  function O(H) {
    return d > 0 && _e(H) ? Ne(n, Z, "linePrefix", d + 1)(H) : Z(H);
  }
  function Z(H) {
    return H === null || me(H) ? n.check(gp, L, le)(H) : (n.enter("codeFlowValue"), G(H));
  }
  function G(H) {
    return H === null || me(H) ? (n.exit("codeFlowValue"), Z(H)) : (n.consume(H), G);
  }
  function le(H) {
    return n.exit("codeFenced"), r(H);
  }
  function fe(H, $, K) {
    let de = 0;
    return U;
    function U(I) {
      return H.enter("lineEnding"), H.consume(I), H.exit("lineEnding"), te;
    }
    function te(I) {
      return H.enter("codeFencedFence"), _e(I) ? Ne(H, ee, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(I) : ee(I);
    }
    function ee(I) {
      return I === m ? (H.enter("codeFencedFenceSequence"), Ee(I)) : K(I);
    }
    function Ee(I) {
      return I === m ? (de++, H.consume(I), Ee) : de >= f ? (H.exit("codeFencedFenceSequence"), _e(I) ? Ne(H, ue, "whitespace")(I) : ue(I)) : K(I);
    }
    function ue(I) {
      return I === null || me(I) ? (H.exit("codeFencedFence"), $(I)) : K(I);
    }
  }
}
function f0(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return f === null ? a(f) : (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), d);
  }
  function d(f) {
    return u.parser.lazy[u.now().line] ? a(f) : r(f);
  }
}
const Js = {
  name: "codeIndented",
  tokenize: h0
}, d0 = {
  partial: !0,
  tokenize: m0
};
function h0(n, r, a) {
  const u = this;
  return c;
  function c(h) {
    return n.enter("codeIndented"), Ne(n, d, "linePrefix", 5)(h);
  }
  function d(h) {
    const b = u.events[u.events.length - 1];
    return b && b[1].type === "linePrefix" && b[2].sliceSerialize(b[1], !0).length >= 4 ? f(h) : a(h);
  }
  function f(h) {
    return h === null ? p(h) : me(h) ? n.attempt(d0, f, p)(h) : (n.enter("codeFlowValue"), m(h));
  }
  function m(h) {
    return h === null || me(h) ? (n.exit("codeFlowValue"), f(h)) : (n.consume(h), m);
  }
  function p(h) {
    return n.exit("codeIndented"), r(h);
  }
}
function m0(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return u.parser.lazy[u.now().line] ? a(f) : me(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), c) : Ne(n, d, "linePrefix", 5)(f);
  }
  function d(f) {
    const m = u.events[u.events.length - 1];
    return m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? r(f) : me(f) ? c(f) : a(f);
  }
}
const p0 = {
  name: "codeText",
  previous: y0,
  resolve: g0,
  tokenize: b0
};
function g0(n) {
  let r = n.length - 4, a = 3, u, c;
  if ((n[a][1].type === "lineEnding" || n[a][1].type === "space") && (n[r][1].type === "lineEnding" || n[r][1].type === "space")) {
    for (u = a; ++u < r; )
      if (n[u][1].type === "codeTextData") {
        n[a][1].type = "codeTextPadding", n[r][1].type = "codeTextPadding", a += 2, r -= 2;
        break;
      }
  }
  for (u = a - 1, r++; ++u <= r; )
    c === void 0 ? u !== r && n[u][1].type !== "lineEnding" && (c = u) : (u === r || n[u][1].type === "lineEnding") && (n[c][1].type = "codeTextData", u !== c + 2 && (n[c][1].end = n[u - 1][1].end, n.splice(c + 2, u - c - 2), r -= u - c - 2, u = c + 2), c = void 0);
  return n;
}
function y0(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function b0(n, r, a) {
  let u = 0, c, d;
  return f;
  function f(y) {
    return n.enter("codeText"), n.enter("codeTextSequence"), m(y);
  }
  function m(y) {
    return y === 96 ? (n.consume(y), u++, m) : (n.exit("codeTextSequence"), p(y));
  }
  function p(y) {
    return y === null ? a(y) : y === 32 ? (n.enter("space"), n.consume(y), n.exit("space"), p) : y === 96 ? (d = n.enter("codeTextSequence"), c = 0, b(y)) : me(y) ? (n.enter("lineEnding"), n.consume(y), n.exit("lineEnding"), p) : (n.enter("codeTextData"), h(y));
  }
  function h(y) {
    return y === null || y === 32 || y === 96 || me(y) ? (n.exit("codeTextData"), p(y)) : (n.consume(y), h);
  }
  function b(y) {
    return y === 96 ? (n.consume(y), c++, b) : c === u ? (n.exit("codeTextSequence"), n.exit("codeText"), r(y)) : (d.type = "codeTextData", h(y));
  }
}
class x0 {
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
    const c = a || 0;
    this.setCursor(Math.trunc(r));
    const d = this.right.splice(this.right.length - c, Number.POSITIVE_INFINITY);
    return u && Oa(this.left, u), d.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), Oa(this.left, r);
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
    this.setCursor(0), Oa(this.right, r.reverse());
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
        Oa(this.right, a.reverse());
      } else {
        const a = this.right.splice(this.left.length + this.right.length - r, Number.POSITIVE_INFINITY);
        Oa(this.left, a.reverse());
      }
  }
}
function Oa(n, r) {
  let a = 0;
  if (r.length < 1e4)
    n.push(...r);
  else
    for (; a < r.length; )
      n.push(...r.slice(a, a + 1e4)), a += 1e4;
}
function bg(n) {
  const r = {};
  let a = -1, u, c, d, f, m, p, h;
  const b = new x0(n);
  for (; ++a < b.length; ) {
    for (; a in r; )
      a = r[a];
    if (u = b.get(a), a && u[1].type === "chunkFlow" && b.get(a - 1)[1].type === "listItemPrefix" && (p = u[1]._tokenizer.events, d = 0, d < p.length && p[d][1].type === "lineEndingBlank" && (d += 2), d < p.length && p[d][1].type === "content"))
      for (; ++d < p.length && p[d][1].type !== "content"; )
        p[d][1].type === "chunkText" && (p[d][1]._isInFirstContentOfListItem = !0, d++);
    if (u[0] === "enter")
      u[1].contentType && (Object.assign(r, v0(b, a)), a = r[a], h = !0);
    else if (u[1]._container) {
      for (d = a, c = void 0; d--; )
        if (f = b.get(d), f[1].type === "lineEnding" || f[1].type === "lineEndingBlank")
          f[0] === "enter" && (c && (b.get(c)[1].type = "lineEndingBlank"), f[1].type = "lineEnding", c = d);
        else if (!(f[1].type === "linePrefix" || f[1].type === "listItemIndent")) break;
      c && (u[1].end = {
        ...b.get(c)[1].start
      }, m = b.slice(c, a), m.unshift(u), b.splice(c, a - c + 1, m));
    }
  }
  return Zt(n, 0, Number.POSITIVE_INFINITY, b.slice(0)), !h;
}
function v0(n, r) {
  const a = n.get(r)[1], u = n.get(r)[2];
  let c = r - 1;
  const d = [];
  let f = a._tokenizer;
  f || (f = u.parser[a.contentType](a.start), a._contentTypeTextTrailing && (f._contentTypeTextTrailing = !0));
  const m = f.events, p = [], h = {};
  let b, y, S = -1, v = a, T = 0, L = 0;
  const j = [L];
  for (; v; ) {
    for (; n.get(++c)[1] !== v; )
      ;
    d.push(c), v._tokenizer || (b = u.sliceStream(v), v.next || b.push(null), y && f.defineSkip(v.start), v._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = !0), f.write(b), v._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = void 0)), y = v, v = v.next;
  }
  for (v = a; ++S < m.length; )
    // Find a void token that includes a break.
    m[S][0] === "exit" && m[S - 1][0] === "enter" && m[S][1].type === m[S - 1][1].type && m[S][1].start.line !== m[S][1].end.line && (L = S + 1, j.push(L), v._tokenizer = void 0, v.previous = void 0, v = v.next);
  for (f.events = [], v ? (v._tokenizer = void 0, v.previous = void 0) : j.pop(), S = j.length; S--; ) {
    const O = m.slice(j[S], j[S + 1]), Z = d.pop();
    p.push([Z, Z + O.length - 1]), n.splice(Z, 2, O);
  }
  for (p.reverse(), S = -1; ++S < p.length; )
    h[T + p[S][0]] = T + p[S][1], T += p[S][1] - p[S][0] - 1;
  return h;
}
const S0 = {
  resolve: w0,
  tokenize: E0
}, k0 = {
  partial: !0,
  tokenize: z0
};
function w0(n) {
  return bg(n), n;
}
function E0(n, r) {
  let a;
  return u;
  function u(m) {
    return n.enter("content"), a = n.enter("chunkContent", {
      contentType: "content"
    }), c(m);
  }
  function c(m) {
    return m === null ? d(m) : me(m) ? n.check(k0, f, d)(m) : (n.consume(m), c);
  }
  function d(m) {
    return n.exit("chunkContent"), n.exit("content"), r(m);
  }
  function f(m) {
    return n.consume(m), n.exit("chunkContent"), a.next = n.enter("chunkContent", {
      contentType: "content",
      previous: a
    }), a = a.next, c;
  }
}
function z0(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), Ne(n, d, "linePrefix");
  }
  function d(f) {
    if (f === null || me(f))
      return a(f);
    const m = u.events[u.events.length - 1];
    return !u.parser.constructs.disable.null.includes("codeIndented") && m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? r(f) : n.interrupt(u.parser.constructs.flow, a, r)(f);
  }
}
function xg(n, r, a, u, c, d, f, m, p) {
  const h = p || Number.POSITIVE_INFINITY;
  let b = 0;
  return y;
  function y(O) {
    return O === 60 ? (n.enter(u), n.enter(c), n.enter(d), n.consume(O), n.exit(d), S) : O === null || O === 32 || O === 41 || mu(O) ? a(O) : (n.enter(u), n.enter(f), n.enter(m), n.enter("chunkString", {
      contentType: "string"
    }), L(O));
  }
  function S(O) {
    return O === 62 ? (n.enter(d), n.consume(O), n.exit(d), n.exit(c), n.exit(u), r) : (n.enter(m), n.enter("chunkString", {
      contentType: "string"
    }), v(O));
  }
  function v(O) {
    return O === 62 ? (n.exit("chunkString"), n.exit(m), S(O)) : O === null || O === 60 || me(O) ? a(O) : (n.consume(O), O === 92 ? T : v);
  }
  function T(O) {
    return O === 60 || O === 62 || O === 92 ? (n.consume(O), v) : v(O);
  }
  function L(O) {
    return !b && (O === null || O === 41 || Ke(O)) ? (n.exit("chunkString"), n.exit(m), n.exit(f), n.exit(u), r(O)) : b < h && O === 40 ? (n.consume(O), b++, L) : O === 41 ? (n.consume(O), b--, L) : O === null || O === 32 || O === 40 || mu(O) ? a(O) : (n.consume(O), O === 92 ? j : L);
  }
  function j(O) {
    return O === 40 || O === 41 || O === 92 ? (n.consume(O), L) : L(O);
  }
}
function vg(n, r, a, u, c, d) {
  const f = this;
  let m = 0, p;
  return h;
  function h(v) {
    return n.enter(u), n.enter(c), n.consume(v), n.exit(c), n.enter(d), b;
  }
  function b(v) {
    return m > 999 || v === null || v === 91 || v === 93 && !p || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    v === 94 && !m && "_hiddenFootnoteSupport" in f.parser.constructs ? a(v) : v === 93 ? (n.exit(d), n.enter(c), n.consume(v), n.exit(c), n.exit(u), r) : me(v) ? (n.enter("lineEnding"), n.consume(v), n.exit("lineEnding"), b) : (n.enter("chunkString", {
      contentType: "string"
    }), y(v));
  }
  function y(v) {
    return v === null || v === 91 || v === 93 || me(v) || m++ > 999 ? (n.exit("chunkString"), b(v)) : (n.consume(v), p || (p = !_e(v)), v === 92 ? S : y);
  }
  function S(v) {
    return v === 91 || v === 92 || v === 93 ? (n.consume(v), m++, y) : y(v);
  }
}
function Sg(n, r, a, u, c, d) {
  let f;
  return m;
  function m(S) {
    return S === 34 || S === 39 || S === 40 ? (n.enter(u), n.enter(c), n.consume(S), n.exit(c), f = S === 40 ? 41 : S, p) : a(S);
  }
  function p(S) {
    return S === f ? (n.enter(c), n.consume(S), n.exit(c), n.exit(u), r) : (n.enter(d), h(S));
  }
  function h(S) {
    return S === f ? (n.exit(d), p(f)) : S === null ? a(S) : me(S) ? (n.enter("lineEnding"), n.consume(S), n.exit("lineEnding"), Ne(n, h, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), b(S));
  }
  function b(S) {
    return S === f || S === null || me(S) ? (n.exit("chunkString"), h(S)) : (n.consume(S), S === 92 ? y : b);
  }
  function y(S) {
    return S === f || S === 92 ? (n.consume(S), b) : b(S);
  }
}
function Ra(n, r) {
  let a;
  return u;
  function u(c) {
    return me(c) ? (n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), a = !0, u) : _e(c) ? Ne(n, u, a ? "linePrefix" : "lineSuffix")(c) : r(c);
  }
}
const T0 = {
  name: "definition",
  tokenize: C0
}, A0 = {
  partial: !0,
  tokenize: _0
};
function C0(n, r, a) {
  const u = this;
  let c;
  return d;
  function d(v) {
    return n.enter("definition"), f(v);
  }
  function f(v) {
    return vg.call(
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
    return c = sn(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1)), v === 58 ? (n.enter("definitionMarker"), n.consume(v), n.exit("definitionMarker"), p) : a(v);
  }
  function p(v) {
    return Ke(v) ? Ra(n, h)(v) : h(v);
  }
  function h(v) {
    return xg(
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
    return n.attempt(A0, y, y)(v);
  }
  function y(v) {
    return _e(v) ? Ne(n, S, "whitespace")(v) : S(v);
  }
  function S(v) {
    return v === null || me(v) ? (n.exit("definition"), u.parser.defined.push(c), r(v)) : a(v);
  }
}
function _0(n, r, a) {
  return u;
  function u(m) {
    return Ke(m) ? Ra(n, c)(m) : a(m);
  }
  function c(m) {
    return Sg(n, d, a, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(m);
  }
  function d(m) {
    return _e(m) ? Ne(n, f, "whitespace")(m) : f(m);
  }
  function f(m) {
    return m === null || me(m) ? r(m) : a(m);
  }
}
const O0 = {
  name: "hardBreakEscape",
  tokenize: D0
};
function D0(n, r, a) {
  return u;
  function u(d) {
    return n.enter("hardBreakEscape"), n.consume(d), c;
  }
  function c(d) {
    return me(d) ? (n.exit("hardBreakEscape"), r(d)) : a(d);
  }
}
const M0 = {
  name: "headingAtx",
  resolve: N0,
  tokenize: R0
};
function N0(n, r) {
  let a = n.length - 2, u = 3, c, d;
  return n[u][1].type === "whitespace" && (u += 2), a - 2 > u && n[a][1].type === "whitespace" && (a -= 2), n[a][1].type === "atxHeadingSequence" && (u === a - 1 || a - 4 > u && n[a - 2][1].type === "whitespace") && (a -= u + 1 === a ? 2 : 4), a > u && (c = {
    type: "atxHeadingText",
    start: n[u][1].start,
    end: n[a][1].end
  }, d = {
    type: "chunkText",
    start: n[u][1].start,
    end: n[a][1].end,
    contentType: "text"
  }, Zt(n, u, a - u + 1, [["enter", c, r], ["enter", d, r], ["exit", d, r], ["exit", c, r]])), n;
}
function R0(n, r, a) {
  let u = 0;
  return c;
  function c(b) {
    return n.enter("atxHeading"), d(b);
  }
  function d(b) {
    return n.enter("atxHeadingSequence"), f(b);
  }
  function f(b) {
    return b === 35 && u++ < 6 ? (n.consume(b), f) : b === null || Ke(b) ? (n.exit("atxHeadingSequence"), m(b)) : a(b);
  }
  function m(b) {
    return b === 35 ? (n.enter("atxHeadingSequence"), p(b)) : b === null || me(b) ? (n.exit("atxHeading"), r(b)) : _e(b) ? Ne(n, m, "whitespace")(b) : (n.enter("atxHeadingText"), h(b));
  }
  function p(b) {
    return b === 35 ? (n.consume(b), p) : (n.exit("atxHeadingSequence"), m(b));
  }
  function h(b) {
    return b === null || b === 35 || Ke(b) ? (n.exit("atxHeadingText"), m(b)) : (n.consume(b), h);
  }
}
const j0 = [
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
], bp = ["pre", "script", "style", "textarea"], L0 = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: H0,
  tokenize: q0
}, U0 = {
  partial: !0,
  tokenize: G0
}, B0 = {
  partial: !0,
  tokenize: Y0
};
function H0(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function q0(n, r, a) {
  const u = this;
  let c, d, f, m, p;
  return h;
  function h(w) {
    return b(w);
  }
  function b(w) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(w), y;
  }
  function y(w) {
    return w === 33 ? (n.consume(w), S) : w === 47 ? (n.consume(w), d = !0, L) : w === 63 ? (n.consume(w), c = 3, u.interrupt ? r : k) : Et(w) ? (n.consume(w), f = String.fromCharCode(w), j) : a(w);
  }
  function S(w) {
    return w === 45 ? (n.consume(w), c = 2, v) : w === 91 ? (n.consume(w), c = 5, m = 0, T) : Et(w) ? (n.consume(w), c = 4, u.interrupt ? r : k) : a(w);
  }
  function v(w) {
    return w === 45 ? (n.consume(w), u.interrupt ? r : k) : a(w);
  }
  function T(w) {
    const P = "CDATA[";
    return w === P.charCodeAt(m++) ? (n.consume(w), m === P.length ? u.interrupt ? r : ee : T) : a(w);
  }
  function L(w) {
    return Et(w) ? (n.consume(w), f = String.fromCharCode(w), j) : a(w);
  }
  function j(w) {
    if (w === null || w === 47 || w === 62 || Ke(w)) {
      const P = w === 47, ae = f.toLowerCase();
      return !P && !d && bp.includes(ae) ? (c = 1, u.interrupt ? r(w) : ee(w)) : j0.includes(f.toLowerCase()) ? (c = 6, P ? (n.consume(w), O) : u.interrupt ? r(w) : ee(w)) : (c = 7, u.interrupt && !u.parser.lazy[u.now().line] ? a(w) : d ? Z(w) : G(w));
    }
    return w === 45 || bt(w) ? (n.consume(w), f += String.fromCharCode(w), j) : a(w);
  }
  function O(w) {
    return w === 62 ? (n.consume(w), u.interrupt ? r : ee) : a(w);
  }
  function Z(w) {
    return _e(w) ? (n.consume(w), Z) : U(w);
  }
  function G(w) {
    return w === 47 ? (n.consume(w), U) : w === 58 || w === 95 || Et(w) ? (n.consume(w), le) : _e(w) ? (n.consume(w), G) : U(w);
  }
  function le(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || bt(w) ? (n.consume(w), le) : fe(w);
  }
  function fe(w) {
    return w === 61 ? (n.consume(w), H) : _e(w) ? (n.consume(w), fe) : G(w);
  }
  function H(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? a(w) : w === 34 || w === 39 ? (n.consume(w), p = w, $) : _e(w) ? (n.consume(w), H) : K(w);
  }
  function $(w) {
    return w === p ? (n.consume(w), p = null, de) : w === null || me(w) ? a(w) : (n.consume(w), $);
  }
  function K(w) {
    return w === null || w === 34 || w === 39 || w === 47 || w === 60 || w === 61 || w === 62 || w === 96 || Ke(w) ? fe(w) : (n.consume(w), K);
  }
  function de(w) {
    return w === 47 || w === 62 || _e(w) ? G(w) : a(w);
  }
  function U(w) {
    return w === 62 ? (n.consume(w), te) : a(w);
  }
  function te(w) {
    return w === null || me(w) ? ee(w) : _e(w) ? (n.consume(w), te) : a(w);
  }
  function ee(w) {
    return w === 45 && c === 2 ? (n.consume(w), D) : w === 60 && c === 1 ? (n.consume(w), F) : w === 62 && c === 4 ? (n.consume(w), z) : w === 63 && c === 3 ? (n.consume(w), k) : w === 93 && c === 5 ? (n.consume(w), ve) : me(w) && (c === 6 || c === 7) ? (n.exit("htmlFlowData"), n.check(U0, Y, Ee)(w)) : w === null || me(w) ? (n.exit("htmlFlowData"), Ee(w)) : (n.consume(w), ee);
  }
  function Ee(w) {
    return n.check(B0, ue, Y)(w);
  }
  function ue(w) {
    return n.enter("lineEnding"), n.consume(w), n.exit("lineEnding"), I;
  }
  function I(w) {
    return w === null || me(w) ? Ee(w) : (n.enter("htmlFlowData"), ee(w));
  }
  function D(w) {
    return w === 45 ? (n.consume(w), k) : ee(w);
  }
  function F(w) {
    return w === 47 ? (n.consume(w), f = "", se) : ee(w);
  }
  function se(w) {
    if (w === 62) {
      const P = f.toLowerCase();
      return bp.includes(P) ? (n.consume(w), z) : ee(w);
    }
    return Et(w) && f.length < 8 ? (n.consume(w), f += String.fromCharCode(w), se) : ee(w);
  }
  function ve(w) {
    return w === 93 ? (n.consume(w), k) : ee(w);
  }
  function k(w) {
    return w === 62 ? (n.consume(w), z) : w === 45 && c === 2 ? (n.consume(w), k) : ee(w);
  }
  function z(w) {
    return w === null || me(w) ? (n.exit("htmlFlowData"), Y(w)) : (n.consume(w), z);
  }
  function Y(w) {
    return n.exit("htmlFlow"), r(w);
  }
}
function Y0(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return me(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), d) : a(f);
  }
  function d(f) {
    return u.parser.lazy[u.now().line] ? a(f) : r(f);
  }
}
function G0(n, r, a) {
  return u;
  function u(c) {
    return n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), n.attempt(qa, r, a);
  }
}
const V0 = {
  name: "htmlText",
  tokenize: X0
};
function X0(n, r, a) {
  const u = this;
  let c, d, f;
  return m;
  function m(k) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(k), p;
  }
  function p(k) {
    return k === 33 ? (n.consume(k), h) : k === 47 ? (n.consume(k), fe) : k === 63 ? (n.consume(k), G) : Et(k) ? (n.consume(k), K) : a(k);
  }
  function h(k) {
    return k === 45 ? (n.consume(k), b) : k === 91 ? (n.consume(k), d = 0, T) : Et(k) ? (n.consume(k), Z) : a(k);
  }
  function b(k) {
    return k === 45 ? (n.consume(k), v) : a(k);
  }
  function y(k) {
    return k === null ? a(k) : k === 45 ? (n.consume(k), S) : me(k) ? (f = y, F(k)) : (n.consume(k), y);
  }
  function S(k) {
    return k === 45 ? (n.consume(k), v) : y(k);
  }
  function v(k) {
    return k === 62 ? D(k) : k === 45 ? S(k) : y(k);
  }
  function T(k) {
    const z = "CDATA[";
    return k === z.charCodeAt(d++) ? (n.consume(k), d === z.length ? L : T) : a(k);
  }
  function L(k) {
    return k === null ? a(k) : k === 93 ? (n.consume(k), j) : me(k) ? (f = L, F(k)) : (n.consume(k), L);
  }
  function j(k) {
    return k === 93 ? (n.consume(k), O) : L(k);
  }
  function O(k) {
    return k === 62 ? D(k) : k === 93 ? (n.consume(k), O) : L(k);
  }
  function Z(k) {
    return k === null || k === 62 ? D(k) : me(k) ? (f = Z, F(k)) : (n.consume(k), Z);
  }
  function G(k) {
    return k === null ? a(k) : k === 63 ? (n.consume(k), le) : me(k) ? (f = G, F(k)) : (n.consume(k), G);
  }
  function le(k) {
    return k === 62 ? D(k) : G(k);
  }
  function fe(k) {
    return Et(k) ? (n.consume(k), H) : a(k);
  }
  function H(k) {
    return k === 45 || bt(k) ? (n.consume(k), H) : $(k);
  }
  function $(k) {
    return me(k) ? (f = $, F(k)) : _e(k) ? (n.consume(k), $) : D(k);
  }
  function K(k) {
    return k === 45 || bt(k) ? (n.consume(k), K) : k === 47 || k === 62 || Ke(k) ? de(k) : a(k);
  }
  function de(k) {
    return k === 47 ? (n.consume(k), D) : k === 58 || k === 95 || Et(k) ? (n.consume(k), U) : me(k) ? (f = de, F(k)) : _e(k) ? (n.consume(k), de) : D(k);
  }
  function U(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || bt(k) ? (n.consume(k), U) : te(k);
  }
  function te(k) {
    return k === 61 ? (n.consume(k), ee) : me(k) ? (f = te, F(k)) : _e(k) ? (n.consume(k), te) : de(k);
  }
  function ee(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96 ? a(k) : k === 34 || k === 39 ? (n.consume(k), c = k, Ee) : me(k) ? (f = ee, F(k)) : _e(k) ? (n.consume(k), ee) : (n.consume(k), ue);
  }
  function Ee(k) {
    return k === c ? (n.consume(k), c = void 0, I) : k === null ? a(k) : me(k) ? (f = Ee, F(k)) : (n.consume(k), Ee);
  }
  function ue(k) {
    return k === null || k === 34 || k === 39 || k === 60 || k === 61 || k === 96 ? a(k) : k === 47 || k === 62 || Ke(k) ? de(k) : (n.consume(k), ue);
  }
  function I(k) {
    return k === 47 || k === 62 || Ke(k) ? de(k) : a(k);
  }
  function D(k) {
    return k === 62 ? (n.consume(k), n.exit("htmlTextData"), n.exit("htmlText"), r) : a(k);
  }
  function F(k) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(k), n.exit("lineEnding"), se;
  }
  function se(k) {
    return _e(k) ? Ne(n, ve, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : ve(k);
  }
  function ve(k) {
    return n.enter("htmlTextData"), f(k);
  }
}
const Rc = {
  name: "labelEnd",
  resolveAll: F0,
  resolveTo: J0,
  tokenize: I0
}, Q0 = {
  tokenize: $0
}, Z0 = {
  tokenize: W0
}, K0 = {
  tokenize: P0
};
function F0(n) {
  let r = -1;
  const a = [];
  for (; ++r < n.length; ) {
    const u = n[r][1];
    if (a.push(n[r]), u.type === "labelImage" || u.type === "labelLink" || u.type === "labelEnd") {
      const c = u.type === "labelImage" ? 4 : 2;
      u.type = "data", r += c;
    }
  }
  return n.length !== a.length && Zt(n, 0, n.length, a), n;
}
function J0(n, r) {
  let a = n.length, u = 0, c, d, f, m;
  for (; a--; )
    if (c = n[a][1], d) {
      if (c.type === "link" || c.type === "labelLink" && c._inactive)
        break;
      n[a][0] === "enter" && c.type === "labelLink" && (c._inactive = !0);
    } else if (f) {
      if (n[a][0] === "enter" && (c.type === "labelImage" || c.type === "labelLink") && !c._balanced && (d = a, c.type !== "labelLink")) {
        u = 2;
        break;
      }
    } else c.type === "labelEnd" && (f = a);
  const p = {
    type: n[d][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[d][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, h = {
    type: "label",
    start: {
      ...n[d][1].start
    },
    end: {
      ...n[f][1].end
    }
  }, b = {
    type: "labelText",
    start: {
      ...n[d + u + 2][1].end
    },
    end: {
      ...n[f - 2][1].start
    }
  };
  return m = [["enter", p, r], ["enter", h, r]], m = ln(m, n.slice(d + 1, d + u + 3)), m = ln(m, [["enter", b, r]]), m = ln(m, vu(r.parser.constructs.insideSpan.null, n.slice(d + u + 4, f - 3), r)), m = ln(m, [["exit", b, r], n[f - 2], n[f - 1], ["exit", h, r]]), m = ln(m, n.slice(f + 1)), m = ln(m, [["exit", p, r]]), Zt(n, d, n.length, m), n;
}
function I0(n, r, a) {
  const u = this;
  let c = u.events.length, d, f;
  for (; c--; )
    if ((u.events[c][1].type === "labelImage" || u.events[c][1].type === "labelLink") && !u.events[c][1]._balanced) {
      d = u.events[c][1];
      break;
    }
  return m;
  function m(S) {
    return d ? d._inactive ? y(S) : (f = u.parser.defined.includes(sn(u.sliceSerialize({
      start: d.end,
      end: u.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(S), n.exit("labelMarker"), n.exit("labelEnd"), p) : a(S);
  }
  function p(S) {
    return S === 40 ? n.attempt(Q0, b, f ? b : y)(S) : S === 91 ? n.attempt(Z0, b, f ? h : y)(S) : f ? b(S) : y(S);
  }
  function h(S) {
    return n.attempt(K0, b, y)(S);
  }
  function b(S) {
    return r(S);
  }
  function y(S) {
    return d._balanced = !0, a(S);
  }
}
function $0(n, r, a) {
  return u;
  function u(y) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(y), n.exit("resourceMarker"), c;
  }
  function c(y) {
    return Ke(y) ? Ra(n, d)(y) : d(y);
  }
  function d(y) {
    return y === 41 ? b(y) : xg(n, f, m, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(y);
  }
  function f(y) {
    return Ke(y) ? Ra(n, p)(y) : b(y);
  }
  function m(y) {
    return a(y);
  }
  function p(y) {
    return y === 34 || y === 39 || y === 40 ? Sg(n, h, a, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(y) : b(y);
  }
  function h(y) {
    return Ke(y) ? Ra(n, b)(y) : b(y);
  }
  function b(y) {
    return y === 41 ? (n.enter("resourceMarker"), n.consume(y), n.exit("resourceMarker"), n.exit("resource"), r) : a(y);
  }
}
function W0(n, r, a) {
  const u = this;
  return c;
  function c(m) {
    return vg.call(u, n, d, f, "reference", "referenceMarker", "referenceString")(m);
  }
  function d(m) {
    return u.parser.defined.includes(sn(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1))) ? r(m) : a(m);
  }
  function f(m) {
    return a(m);
  }
}
function P0(n, r, a) {
  return u;
  function u(d) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(d), n.exit("referenceMarker"), c;
  }
  function c(d) {
    return d === 93 ? (n.enter("referenceMarker"), n.consume(d), n.exit("referenceMarker"), n.exit("reference"), r) : a(d);
  }
}
const ev = {
  name: "labelStartImage",
  resolveAll: Rc.resolveAll,
  tokenize: tv
};
function tv(n, r, a) {
  const u = this;
  return c;
  function c(m) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(m), n.exit("labelImageMarker"), d;
  }
  function d(m) {
    return m === 91 ? (n.enter("labelMarker"), n.consume(m), n.exit("labelMarker"), n.exit("labelImage"), f) : a(m);
  }
  function f(m) {
    return m === 94 && "_hiddenFootnoteSupport" in u.parser.constructs ? a(m) : r(m);
  }
}
const nv = {
  name: "labelStartLink",
  resolveAll: Rc.resolveAll,
  tokenize: lv
};
function lv(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(f), n.exit("labelMarker"), n.exit("labelLink"), d;
  }
  function d(f) {
    return f === 94 && "_hiddenFootnoteSupport" in u.parser.constructs ? a(f) : r(f);
  }
}
const Is = {
  name: "lineEnding",
  tokenize: iv
};
function iv(n, r) {
  return a;
  function a(u) {
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), Ne(n, r, "linePrefix");
  }
}
const hu = {
  name: "thematicBreak",
  tokenize: av
};
function av(n, r, a) {
  let u = 0, c;
  return d;
  function d(h) {
    return n.enter("thematicBreak"), f(h);
  }
  function f(h) {
    return c = h, m(h);
  }
  function m(h) {
    return h === c ? (n.enter("thematicBreakSequence"), p(h)) : u >= 3 && (h === null || me(h)) ? (n.exit("thematicBreak"), r(h)) : a(h);
  }
  function p(h) {
    return h === c ? (n.consume(h), u++, p) : (n.exit("thematicBreakSequence"), _e(h) ? Ne(n, m, "whitespace")(h) : m(h));
  }
}
const jt = {
  continuation: {
    tokenize: sv
  },
  exit: fv,
  name: "list",
  tokenize: ov
}, rv = {
  partial: !0,
  tokenize: dv
}, uv = {
  partial: !0,
  tokenize: cv
};
function ov(n, r, a) {
  const u = this, c = u.events[u.events.length - 1];
  let d = c && c[1].type === "linePrefix" ? c[2].sliceSerialize(c[1], !0).length : 0, f = 0;
  return m;
  function m(v) {
    const T = u.containerState.type || (v === 42 || v === 43 || v === 45 ? "listUnordered" : "listOrdered");
    if (T === "listUnordered" ? !u.containerState.marker || v === u.containerState.marker : gc(v)) {
      if (u.containerState.type || (u.containerState.type = T, n.enter(T, {
        _container: !0
      })), T === "listUnordered")
        return n.enter("listItemPrefix"), v === 42 || v === 45 ? n.check(hu, a, h)(v) : h(v);
      if (!u.interrupt || v === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), p(v);
    }
    return a(v);
  }
  function p(v) {
    return gc(v) && ++f < 10 ? (n.consume(v), p) : (!u.interrupt || f < 2) && (u.containerState.marker ? v === u.containerState.marker : v === 41 || v === 46) ? (n.exit("listItemValue"), h(v)) : a(v);
  }
  function h(v) {
    return n.enter("listItemMarker"), n.consume(v), n.exit("listItemMarker"), u.containerState.marker = u.containerState.marker || v, n.check(
      qa,
      // Can’t be empty when interrupting.
      u.interrupt ? a : b,
      n.attempt(rv, S, y)
    );
  }
  function b(v) {
    return u.containerState.initialBlankLine = !0, d++, S(v);
  }
  function y(v) {
    return _e(v) ? (n.enter("listItemPrefixWhitespace"), n.consume(v), n.exit("listItemPrefixWhitespace"), S) : a(v);
  }
  function S(v) {
    return u.containerState.size = d + u.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(v);
  }
}
function sv(n, r, a) {
  const u = this;
  return u.containerState._closeFlow = void 0, n.check(qa, c, d);
  function c(m) {
    return u.containerState.furtherBlankLines = u.containerState.furtherBlankLines || u.containerState.initialBlankLine, Ne(n, r, "listItemIndent", u.containerState.size + 1)(m);
  }
  function d(m) {
    return u.containerState.furtherBlankLines || !_e(m) ? (u.containerState.furtherBlankLines = void 0, u.containerState.initialBlankLine = void 0, f(m)) : (u.containerState.furtherBlankLines = void 0, u.containerState.initialBlankLine = void 0, n.attempt(uv, r, f)(m));
  }
  function f(m) {
    return u.containerState._closeFlow = !0, u.interrupt = void 0, Ne(n, n.attempt(jt, r, a), "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m);
  }
}
function cv(n, r, a) {
  const u = this;
  return Ne(n, c, "listItemIndent", u.containerState.size + 1);
  function c(d) {
    const f = u.events[u.events.length - 1];
    return f && f[1].type === "listItemIndent" && f[2].sliceSerialize(f[1], !0).length === u.containerState.size ? r(d) : a(d);
  }
}
function fv(n) {
  n.exit(this.containerState.type);
}
function dv(n, r, a) {
  const u = this;
  return Ne(n, c, "listItemPrefixWhitespace", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function c(d) {
    const f = u.events[u.events.length - 1];
    return !_e(d) && f && f[1].type === "listItemPrefixWhitespace" ? r(d) : a(d);
  }
}
const xp = {
  name: "setextUnderline",
  resolveTo: hv,
  tokenize: mv
};
function hv(n, r) {
  let a = n.length, u, c, d;
  for (; a--; )
    if (n[a][0] === "enter") {
      if (n[a][1].type === "content") {
        u = a;
        break;
      }
      n[a][1].type === "paragraph" && (c = a);
    } else
      n[a][1].type === "content" && n.splice(a, 1), !d && n[a][1].type === "definition" && (d = a);
  const f = {
    type: "setextHeading",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[c][1].type = "setextHeadingText", d ? (n.splice(c, 0, ["enter", f, r]), n.splice(d + 1, 0, ["exit", n[u][1], r]), n[u][1].end = {
    ...n[d][1].end
  }) : n[u][1] = f, n.push(["exit", f, r]), n;
}
function mv(n, r, a) {
  const u = this;
  let c;
  return d;
  function d(h) {
    let b = u.events.length, y;
    for (; b--; )
      if (u.events[b][1].type !== "lineEnding" && u.events[b][1].type !== "linePrefix" && u.events[b][1].type !== "content") {
        y = u.events[b][1].type === "paragraph";
        break;
      }
    return !u.parser.lazy[u.now().line] && (u.interrupt || y) ? (n.enter("setextHeadingLine"), c = h, f(h)) : a(h);
  }
  function f(h) {
    return n.enter("setextHeadingLineSequence"), m(h);
  }
  function m(h) {
    return h === c ? (n.consume(h), m) : (n.exit("setextHeadingLineSequence"), _e(h) ? Ne(n, p, "lineSuffix")(h) : p(h));
  }
  function p(h) {
    return h === null || me(h) ? (n.exit("setextHeadingLine"), r(h)) : a(h);
  }
}
const pv = {
  tokenize: gv
};
function gv(n) {
  const r = this, a = n.attempt(
    // Try to parse a blank line.
    qa,
    u,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, c, Ne(n, n.attempt(this.parser.constructs.flow, c, n.attempt(S0, c)), "linePrefix"))
  );
  return a;
  function u(d) {
    if (d === null) {
      n.consume(d);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(d), n.exit("lineEndingBlank"), r.currentConstruct = void 0, a;
  }
  function c(d) {
    if (d === null) {
      n.consume(d);
      return;
    }
    return n.enter("lineEnding"), n.consume(d), n.exit("lineEnding"), r.currentConstruct = void 0, a;
  }
}
const yv = {
  resolveAll: wg()
}, bv = kg("string"), xv = kg("text");
function kg(n) {
  return {
    resolveAll: wg(n === "text" ? vv : void 0),
    tokenize: r
  };
  function r(a) {
    const u = this, c = this.parser.constructs[n], d = a.attempt(c, f, m);
    return f;
    function f(b) {
      return h(b) ? d(b) : m(b);
    }
    function m(b) {
      if (b === null) {
        a.consume(b);
        return;
      }
      return a.enter("data"), a.consume(b), p;
    }
    function p(b) {
      return h(b) ? (a.exit("data"), d(b)) : (a.consume(b), p);
    }
    function h(b) {
      if (b === null)
        return !0;
      const y = c[b];
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
function wg(n) {
  return r;
  function r(a, u) {
    let c = -1, d;
    for (; ++c <= a.length; )
      d === void 0 ? a[c] && a[c][1].type === "data" && (d = c, c++) : (!a[c] || a[c][1].type !== "data") && (c !== d + 2 && (a[d][1].end = a[c - 1][1].end, a.splice(d + 2, c - d - 2), c = d + 2), d = void 0);
    return n ? n(a, u) : a;
  }
}
function vv(n, r) {
  let a = 0;
  for (; ++a <= n.length; )
    if ((a === n.length || n[a][1].type === "lineEnding") && n[a - 1][1].type === "data") {
      const u = n[a - 1][1], c = r.sliceStream(u);
      let d = c.length, f = -1, m = 0, p;
      for (; d--; ) {
        const h = c[d];
        if (typeof h == "string") {
          for (f = h.length; h.charCodeAt(f - 1) === 32; )
            m++, f--;
          if (f) break;
          f = -1;
        } else if (h === -2)
          p = !0, m++;
        else if (h !== -1) {
          d++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && a === n.length && (m = 0), m) {
        const h = {
          type: a === n.length || p || m < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: d ? f : u.start._bufferIndex + f,
            _index: u.start._index + d,
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
const Sv = {
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
  62: pg
}, kv = {
  91: T0
}, wv = {
  [-2]: Js,
  [-1]: Js,
  32: Js
}, Ev = {
  35: M0,
  42: hu,
  45: [xp, hu],
  60: L0,
  61: xp,
  95: hu,
  96: yp,
  126: yp
}, zv = {
  38: yg,
  92: gg
}, Tv = {
  [-5]: Is,
  [-4]: Is,
  [-3]: Is,
  33: ev,
  38: yg,
  42: yc,
  60: [n0, V0],
  91: nv,
  92: [O0, gg],
  93: Rc,
  95: yc,
  96: p0
}, Av = {
  null: [yc, yv]
}, Cv = {
  null: [42, 95]
}, _v = {
  null: []
}, Ov = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Cv,
  contentInitial: kv,
  disable: _v,
  document: Sv,
  flow: Ev,
  flowInitial: wv,
  insideSpan: Av,
  string: zv,
  text: Tv
}, Symbol.toStringTag, { value: "Module" }));
function Dv(n, r, a) {
  let u = {
    _bufferIndex: -1,
    _index: 0,
    line: a && a.line || 1,
    column: a && a.column || 1,
    offset: a && a.offset || 0
  };
  const c = {}, d = [];
  let f = [], m = [];
  const p = {
    attempt: $(fe),
    check: $(H),
    consume: Z,
    enter: G,
    exit: le,
    interrupt: $(H, {
      interrupt: !0
    })
  }, h = {
    code: null,
    containerState: {},
    defineSkip: L,
    events: [],
    now: T,
    parser: n,
    previous: null,
    sliceSerialize: S,
    sliceStream: v,
    write: y
  };
  let b = r.tokenize.call(h, p);
  return r.resolveAll && d.push(r), h;
  function y(te) {
    return f = ln(f, te), j(), f[f.length - 1] !== null ? [] : (K(r, 0), h.events = vu(d, h.events, h), h.events);
  }
  function S(te, ee) {
    return Nv(v(te), ee);
  }
  function v(te) {
    return Mv(f, te);
  }
  function T() {
    const {
      _bufferIndex: te,
      _index: ee,
      line: Ee,
      column: ue,
      offset: I
    } = u;
    return {
      _bufferIndex: te,
      _index: ee,
      line: Ee,
      column: ue,
      offset: I
    };
  }
  function L(te) {
    c[te.line] = te.column, U();
  }
  function j() {
    let te;
    for (; u._index < f.length; ) {
      const ee = f[u._index];
      if (typeof ee == "string")
        for (te = u._index, u._bufferIndex < 0 && (u._bufferIndex = 0); u._index === te && u._bufferIndex < ee.length; )
          O(ee.charCodeAt(u._bufferIndex));
      else
        O(ee);
    }
  }
  function O(te) {
    b = b(te);
  }
  function Z(te) {
    me(te) ? (u.line++, u.column = 1, u.offset += te === -3 ? 2 : 1, U()) : te !== -1 && (u.column++, u.offset++), u._bufferIndex < 0 ? u._index++ : (u._bufferIndex++, u._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    f[u._index].length && (u._bufferIndex = -1, u._index++)), h.previous = te;
  }
  function G(te, ee) {
    const Ee = ee || {};
    return Ee.type = te, Ee.start = T(), h.events.push(["enter", Ee, h]), m.push(Ee), Ee;
  }
  function le(te) {
    const ee = m.pop();
    return ee.end = T(), h.events.push(["exit", ee, h]), ee;
  }
  function fe(te, ee) {
    K(te, ee.from);
  }
  function H(te, ee) {
    ee.restore();
  }
  function $(te, ee) {
    return Ee;
    function Ee(ue, I, D) {
      let F, se, ve, k;
      return Array.isArray(ue) ? (
        /* c8 ignore next 1 */
        Y(ue)
      ) : "tokenize" in ue ? (
        // Looks like a construct.
        Y([
          /** @type {Construct} */
          ue
        ])
      ) : z(ue);
      function z(ne) {
        return ke;
        function ke(Ve) {
          const ye = Ve !== null && ne[Ve], vt = Ve !== null && ne.null, zt = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ye) ? ye : ye ? [ye] : [],
            ...Array.isArray(vt) ? vt : vt ? [vt] : []
          ];
          return Y(zt)(Ve);
        }
      }
      function Y(ne) {
        return F = ne, se = 0, ne.length === 0 ? D : w(ne[se]);
      }
      function w(ne) {
        return ke;
        function ke(Ve) {
          return k = de(), ve = ne, ne.partial || (h.currentConstruct = ne), ne.name && h.parser.constructs.disable.null.includes(ne.name) ? ae() : ne.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            ee ? Object.assign(Object.create(h), ee) : h,
            p,
            P,
            ae
          )(Ve);
        }
      }
      function P(ne) {
        return te(ve, k), I;
      }
      function ae(ne) {
        return k.restore(), ++se < F.length ? w(F[se]) : D;
      }
    }
  }
  function K(te, ee) {
    te.resolveAll && !d.includes(te) && d.push(te), te.resolve && Zt(h.events, ee, h.events.length - ee, te.resolve(h.events.slice(ee), h)), te.resolveTo && (h.events = te.resolveTo(h.events, h));
  }
  function de() {
    const te = T(), ee = h.previous, Ee = h.currentConstruct, ue = h.events.length, I = Array.from(m);
    return {
      from: ue,
      restore: D
    };
    function D() {
      u = te, h.previous = ee, h.currentConstruct = Ee, h.events.length = ue, m = I, U();
    }
  }
  function U() {
    u.line in c && u.column < 2 && (u.column = c[u.line], u.offset += c[u.line] - 1);
  }
}
function Mv(n, r) {
  const a = r.start._index, u = r.start._bufferIndex, c = r.end._index, d = r.end._bufferIndex;
  let f;
  if (a === c)
    f = [n[a].slice(u, d)];
  else {
    if (f = n.slice(a, c), u > -1) {
      const m = f[0];
      typeof m == "string" ? f[0] = m.slice(u) : f.shift();
    }
    d > 0 && f.push(n[c].slice(0, d));
  }
  return f;
}
function Nv(n, r) {
  let a = -1;
  const u = [];
  let c;
  for (; ++a < n.length; ) {
    const d = n[a];
    let f;
    if (typeof d == "string")
      f = d;
    else switch (d) {
      case -5: {
        f = "\r";
        break;
      }
      case -4: {
        f = `
`;
        break;
      }
      case -3: {
        f = `\r
`;
        break;
      }
      case -2: {
        f = r ? " " : "	";
        break;
      }
      case -1: {
        if (!r && c) continue;
        f = " ";
        break;
      }
      default:
        f = String.fromCharCode(d);
    }
    c = d === -2, u.push(f);
  }
  return u.join("");
}
function Rv(n) {
  const u = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      hg([Ov, ...(n || {}).extensions || []])
    ),
    content: c(Jx),
    defined: [],
    document: c($x),
    flow: c(pv),
    lazy: {},
    string: c(bv),
    text: c(xv)
  };
  return u;
  function c(d) {
    return f;
    function f(m) {
      return Dv(u, d, m);
    }
  }
}
function jv(n) {
  for (; !bg(n); )
    ;
  return n;
}
const vp = /[\0\t\n\r]/g;
function Lv() {
  let n = 1, r = "", a = !0, u;
  return c;
  function c(d, f, m) {
    const p = [];
    let h, b, y, S, v;
    for (d = r + (typeof d == "string" ? d.toString() : new TextDecoder(f || void 0).decode(d)), y = 0, r = "", a && (d.charCodeAt(0) === 65279 && y++, a = void 0); y < d.length; ) {
      if (vp.lastIndex = y, h = vp.exec(d), S = h && h.index !== void 0 ? h.index : d.length, v = d.charCodeAt(S), !h) {
        r = d.slice(y);
        break;
      }
      if (v === 10 && y === S && u)
        p.push(-3), u = void 0;
      else
        switch (u && (p.push(-5), u = void 0), y < S && (p.push(d.slice(y, S)), n += S - y), v) {
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
const Uv = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Bv(n) {
  return n.replace(Uv, Hv);
}
function Hv(n, r, a) {
  if (r)
    return r;
  if (a.charCodeAt(0) === 35) {
    const c = a.charCodeAt(1), d = c === 120 || c === 88;
    return mg(a.slice(d ? 2 : 1), d ? 16 : 10);
  }
  return Nc(a) || n;
}
const Eg = {}.hasOwnProperty;
function qv(n, r, a) {
  return r && typeof r == "object" && (a = r, r = void 0), Yv(a)(jv(Rv(a).document().write(Lv()(n, r, !0))));
}
function Yv(n) {
  const r = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: d(Vl),
      autolinkProtocol: de,
      autolinkEmail: de,
      atxHeading: d(Yl),
      blockQuote: d(vt),
      characterEscape: de,
      characterReference: de,
      codeFenced: d(zt),
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: f,
      codeIndented: d(zt, f),
      codeText: d(cn, f),
      codeTextData: de,
      data: de,
      codeFlowValue: de,
      definition: d(Hn),
      definitionDestinationString: f,
      definitionLabelString: f,
      definitionTitleString: f,
      emphasis: d(Tt),
      hardBreakEscape: d(Gl),
      hardBreakTrailing: d(Gl),
      htmlFlow: d(Ga, f),
      htmlFlowData: de,
      htmlText: d(Ga, f),
      htmlTextData: de,
      image: d(Va),
      label: f,
      link: d(Vl),
      listItem: d(Ri),
      listItemValue: S,
      listOrdered: d(Xl, y),
      listUnordered: d(Xl),
      paragraph: d(Eu),
      reference: w,
      referenceString: f,
      resourceDestinationString: f,
      resourceTitleString: f,
      setextHeading: d(Yl),
      strong: d(zu),
      thematicBreak: d(Tu)
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: fe,
      autolink: p(),
      autolinkEmail: ye,
      autolinkProtocol: Ve,
      blockQuote: p(),
      characterEscapeValue: U,
      characterReferenceMarkerHexadecimal: ae,
      characterReferenceMarkerNumeric: ae,
      characterReferenceValue: ne,
      characterReference: ke,
      codeFenced: p(j),
      codeFencedFence: L,
      codeFencedFenceInfo: v,
      codeFencedFenceMeta: T,
      codeFlowValue: U,
      codeIndented: p(O),
      codeText: p(I),
      codeTextData: U,
      data: U,
      definition: p(),
      definitionDestinationString: le,
      definitionLabelString: Z,
      definitionTitleString: G,
      emphasis: p(),
      hardBreakEscape: p(ee),
      hardBreakTrailing: p(ee),
      htmlFlow: p(Ee),
      htmlFlowData: U,
      htmlText: p(ue),
      htmlTextData: U,
      image: p(F),
      label: ve,
      labelText: se,
      lineEnding: te,
      link: p(D),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: P,
      resourceDestinationString: k,
      resourceTitleString: z,
      resource: Y,
      setextHeading: p(K),
      setextHeadingLineSequence: $,
      setextHeadingText: H,
      strong: p(),
      thematicBreak: p()
    }
  };
  zg(r, (n || {}).mdastExtensions || []);
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
      buffer: f,
      resume: b,
      data: a
    }, Te = [];
    let Ue = -1;
    for (; ++Ue < V.length; )
      if (V[Ue][1].type === "listOrdered" || V[Ue][1].type === "listUnordered")
        if (V[Ue][0] === "enter")
          Te.push(Ue);
        else {
          const Ut = Te.pop();
          Ue = c(V, Ut, Ue);
        }
    for (Ue = -1; ++Ue < V.length; ) {
      const Ut = r[V[Ue][0]];
      Eg.call(Ut, V[Ue][1].type) && Ut[V[Ue][1].type].call(Object.assign({
        sliceSerialize: V[Ue][2].sliceSerialize
      }, ge), V[Ue][1]);
    }
    if (ge.tokenStack.length > 0) {
      const Ut = ge.tokenStack[ge.tokenStack.length - 1];
      (Ut[1] || Sp).call(ge, void 0, Ut[0]);
    }
    for (W.position = {
      start: fl(V.length > 0 ? V[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: fl(V.length > 0 ? V[V.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Ue = -1; ++Ue < r.transforms.length; )
      W = r.transforms[Ue](W) || W;
    return W;
  }
  function c(V, W, ge) {
    let Te = W - 1, Ue = -1, Ut = !1, bn, kt, rt, At;
    for (; ++Te <= ge; ) {
      const Xe = V[Te];
      switch (Xe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Xe[0] === "enter" ? Ue++ : Ue--, At = void 0;
          break;
        }
        case "lineEndingBlank": {
          Xe[0] === "enter" && (bn && !At && !Ue && !rt && (rt = Te), At = void 0);
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
      if (!Ue && Xe[0] === "enter" && Xe[1].type === "listItemPrefix" || Ue === -1 && Xe[0] === "exit" && (Xe[1].type === "listUnordered" || Xe[1].type === "listOrdered")) {
        if (bn) {
          let qn = Te;
          for (kt = void 0; qn--; ) {
            const an = V[qn];
            if (an[1].type === "lineEnding" || an[1].type === "lineEndingBlank") {
              if (an[0] === "exit") continue;
              kt && (V[kt][1].type = "lineEndingBlank", Ut = !0), an[1].type = "lineEnding", kt = qn;
            } else if (!(an[1].type === "linePrefix" || an[1].type === "blockQuotePrefix" || an[1].type === "blockQuotePrefixWhitespace" || an[1].type === "blockQuoteMarker" || an[1].type === "listItemIndent")) break;
          }
          rt && (!kt || rt < kt) && (bn._spread = !0), bn.end = Object.assign({}, kt ? V[kt][1].start : Xe[1].end), V.splice(kt || Te, 0, ["exit", bn, Xe[2]]), Te++, ge++;
        }
        if (Xe[1].type === "listItemPrefix") {
          const qn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Xe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          bn = qn, V.splice(Te, 0, ["enter", qn, Xe[2]]), Te++, ge++, rt = void 0, At = !0;
        }
      }
    }
    return V[W][1]._spread = Ut, ge;
  }
  function d(V, W) {
    return ge;
    function ge(Te) {
      m.call(this, V(Te), Te), W && W.call(this, Te);
    }
  }
  function f() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function m(V, W, ge) {
    this.stack[this.stack.length - 1].children.push(V), this.stack.push(V), this.tokenStack.push([W, ge || void 0]), V.position = {
      start: fl(W.start),
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
    const ge = this.stack.pop(), Te = this.tokenStack.pop();
    if (Te)
      Te[0].type !== V.type && (W ? W.call(this, V, Te[0]) : (Te[1] || Sp).call(this, V, Te[0]));
    else throw new Error("Cannot close `" + V.type + "` (" + Na({
      start: V.start,
      end: V.end
    }) + "): it’s not open");
    ge.position.end = fl(V.end);
  }
  function b() {
    return Mc(this.stack.pop());
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
  function T() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.meta = V;
  }
  function L() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function j() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function O() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = V.replace(/(\r?\n|\r)$/g, "");
  }
  function Z(V) {
    const W = this.resume(), ge = this.stack[this.stack.length - 1];
    ge.label = W, ge.identifier = sn(this.sliceSerialize(V)).toLowerCase();
  }
  function G() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.title = V;
  }
  function le() {
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
  function H() {
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
    let Te = ge[ge.length - 1];
    (!Te || Te.type !== "text") && (Te = St(), Te.position = {
      start: fl(V.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, ge.push(Te)), this.stack.push(Te);
  }
  function U(V) {
    const W = this.stack.pop();
    W.value += this.sliceSerialize(V), W.position.end = fl(V.end);
  }
  function te(V) {
    const W = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const ge = W.children[W.children.length - 1];
      ge.position.end = fl(V.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && r.canContainEols.includes(W.type) && (de.call(this, V), U.call(this, V));
  }
  function ee() {
    this.data.atHardBreak = !0;
  }
  function Ee() {
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
  function D() {
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
    ge.label = Bv(W), ge.identifier = sn(W).toLowerCase();
  }
  function ve() {
    const V = this.stack[this.stack.length - 1], W = this.resume(), ge = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, ge.type === "link") {
      const Te = V.children;
      ge.children = Te;
    } else
      ge.alt = W;
  }
  function k() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.url = V;
  }
  function z() {
    const V = this.resume(), W = this.stack[this.stack.length - 1];
    W.title = V;
  }
  function Y() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function P(V) {
    const W = this.resume(), ge = this.stack[this.stack.length - 1];
    ge.label = W, ge.identifier = sn(this.sliceSerialize(V)).toLowerCase(), this.data.referenceType = "full";
  }
  function ae(V) {
    this.data.characterReferenceType = V.type;
  }
  function ne(V) {
    const W = this.sliceSerialize(V), ge = this.data.characterReferenceType;
    let Te;
    ge ? (Te = mg(W, ge === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Te = Nc(W);
    const Ue = this.stack[this.stack.length - 1];
    Ue.value += Te;
  }
  function ke(V) {
    const W = this.stack.pop();
    W.position.end = fl(V.end);
  }
  function Ve(V) {
    U.call(this, V);
    const W = this.stack[this.stack.length - 1];
    W.url = this.sliceSerialize(V);
  }
  function ye(V) {
    U.call(this, V);
    const W = this.stack[this.stack.length - 1];
    W.url = "mailto:" + this.sliceSerialize(V);
  }
  function vt() {
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
  function Hn() {
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
  function Yl() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function Gl() {
    return {
      type: "break"
    };
  }
  function Ga() {
    return {
      type: "html",
      value: ""
    };
  }
  function Va() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Vl() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Xl(V) {
    return {
      type: "list",
      ordered: V.type === "listOrdered",
      start: null,
      spread: V._spread,
      children: []
    };
  }
  function Ri(V) {
    return {
      type: "listItem",
      spread: V._spread,
      checked: null,
      children: []
    };
  }
  function Eu() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function zu() {
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
  function Tu() {
    return {
      type: "thematicBreak"
    };
  }
}
function fl(n) {
  return {
    line: n.line,
    column: n.column,
    offset: n.offset
  };
}
function zg(n, r) {
  let a = -1;
  for (; ++a < r.length; ) {
    const u = r[a];
    Array.isArray(u) ? zg(n, u) : Gv(n, u);
  }
}
function Gv(n, r) {
  let a;
  for (a in r)
    if (Eg.call(r, a))
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
function Sp(n, r) {
  throw n ? new Error("Cannot close `" + n.type + "` (" + Na({
    start: n.start,
    end: n.end
  }) + "): a different token (`" + r.type + "`, " + Na({
    start: r.start,
    end: r.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + r.type + "`, " + Na({
    start: r.start,
    end: r.end
  }) + ") is still open");
}
function Vv(n) {
  const r = this;
  r.parser = a;
  function a(u) {
    return qv(u, {
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
function Xv(n, r) {
  const a = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: n.wrap(n.all(r), !0)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function Qv(n, r) {
  const a = { type: "element", tagName: "br", properties: {}, children: [] };
  return n.patch(r, a), [n.applyData(r, a), { type: "text", value: `
` }];
}
function Zv(n, r) {
  const a = r.value ? r.value + `
` : "", u = {}, c = r.lang ? r.lang.split(/\s+/) : [];
  c.length > 0 && (u.className = ["language-" + c[0]]);
  let d = {
    type: "element",
    tagName: "code",
    properties: u,
    children: [{ type: "text", value: a }]
  };
  return r.meta && (d.data = { meta: r.meta }), n.patch(r, d), d = n.applyData(r, d), d = { type: "element", tagName: "pre", properties: {}, children: [d] }, n.patch(r, d), d;
}
function Kv(n, r) {
  const a = {
    type: "element",
    tagName: "del",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function Fv(n, r) {
  const a = {
    type: "element",
    tagName: "em",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function Jv(n, r) {
  const a = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", u = String(r.identifier).toUpperCase(), c = Ni(u.toLowerCase()), d = n.footnoteOrder.indexOf(u);
  let f, m = n.footnoteCounts.get(u);
  m === void 0 ? (m = 0, n.footnoteOrder.push(u), f = n.footnoteOrder.length) : f = d + 1, m += 1, n.footnoteCounts.set(u, m);
  const p = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + a + "fn-" + c,
      id: a + "fnref-" + c + (m > 1 ? "-" + m : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(f) }]
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
function Iv(n, r) {
  const a = {
    type: "element",
    tagName: "h" + r.depth,
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function $v(n, r) {
  if (n.options.allowDangerousHtml) {
    const a = { type: "raw", value: r.value };
    return n.patch(r, a), n.applyData(r, a);
  }
}
function Tg(n, r) {
  const a = r.referenceType;
  let u = "]";
  if (a === "collapsed" ? u += "[]" : a === "full" && (u += "[" + (r.label || r.identifier) + "]"), r.type === "imageReference")
    return [{ type: "text", value: "![" + r.alt + u }];
  const c = n.all(r), d = c[0];
  d && d.type === "text" ? d.value = "[" + d.value : c.unshift({ type: "text", value: "[" });
  const f = c[c.length - 1];
  return f && f.type === "text" ? f.value += u : c.push({ type: "text", value: u }), c;
}
function Wv(n, r) {
  const a = String(r.identifier).toUpperCase(), u = n.definitionById.get(a);
  if (!u)
    return Tg(n, r);
  const c = { src: Ni(u.url || ""), alt: r.alt };
  u.title !== null && u.title !== void 0 && (c.title = u.title);
  const d = { type: "element", tagName: "img", properties: c, children: [] };
  return n.patch(r, d), n.applyData(r, d);
}
function Pv(n, r) {
  const a = { src: Ni(r.url) };
  r.alt !== null && r.alt !== void 0 && (a.alt = r.alt), r.title !== null && r.title !== void 0 && (a.title = r.title);
  const u = { type: "element", tagName: "img", properties: a, children: [] };
  return n.patch(r, u), n.applyData(r, u);
}
function eS(n, r) {
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
function tS(n, r) {
  const a = String(r.identifier).toUpperCase(), u = n.definitionById.get(a);
  if (!u)
    return Tg(n, r);
  const c = { href: Ni(u.url || "") };
  u.title !== null && u.title !== void 0 && (c.title = u.title);
  const d = {
    type: "element",
    tagName: "a",
    properties: c,
    children: n.all(r)
  };
  return n.patch(r, d), n.applyData(r, d);
}
function nS(n, r) {
  const a = { href: Ni(r.url) };
  r.title !== null && r.title !== void 0 && (a.title = r.title);
  const u = {
    type: "element",
    tagName: "a",
    properties: a,
    children: n.all(r)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function lS(n, r, a) {
  const u = n.all(r), c = a ? iS(a) : Ag(r), d = {}, f = [];
  if (typeof r.checked == "boolean") {
    const b = u[0];
    let y;
    b && b.type === "element" && b.tagName === "p" ? y = b : (y = { type: "element", tagName: "p", properties: {}, children: [] }, u.unshift(y)), y.children.length > 0 && y.children.unshift({ type: "text", value: " " }), y.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: r.checked, disabled: !0 },
      children: []
    }), d.className = ["task-list-item"];
  }
  let m = -1;
  for (; ++m < u.length; ) {
    const b = u[m];
    (c || m !== 0 || b.type !== "element" || b.tagName !== "p") && f.push({ type: "text", value: `
` }), b.type === "element" && b.tagName === "p" && !c ? f.push(...b.children) : f.push(b);
  }
  const p = u[u.length - 1];
  p && (c || p.type !== "element" || p.tagName !== "p") && f.push({ type: "text", value: `
` });
  const h = { type: "element", tagName: "li", properties: d, children: f };
  return n.patch(r, h), n.applyData(r, h);
}
function iS(n) {
  let r = !1;
  if (n.type === "list") {
    r = n.spread || !1;
    const a = n.children;
    let u = -1;
    for (; !r && ++u < a.length; )
      r = Ag(a[u]);
  }
  return r;
}
function Ag(n) {
  const r = n.spread;
  return r ?? n.children.length > 1;
}
function aS(n, r) {
  const a = {}, u = n.all(r);
  let c = -1;
  for (typeof r.start == "number" && r.start !== 1 && (a.start = r.start); ++c < u.length; ) {
    const f = u[c];
    if (f.type === "element" && f.tagName === "li" && f.properties && Array.isArray(f.properties.className) && f.properties.className.includes("task-list-item")) {
      a.className = ["contains-task-list"];
      break;
    }
  }
  const d = {
    type: "element",
    tagName: r.ordered ? "ol" : "ul",
    properties: a,
    children: n.wrap(u, !0)
  };
  return n.patch(r, d), n.applyData(r, d);
}
function rS(n, r) {
  const a = {
    type: "element",
    tagName: "p",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function uS(n, r) {
  const a = { type: "root", children: n.wrap(n.all(r)) };
  return n.patch(r, a), n.applyData(r, a);
}
function oS(n, r) {
  const a = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function sS(n, r) {
  const a = n.all(r), u = a.shift(), c = [];
  if (u) {
    const f = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: n.wrap([u], !0)
    };
    n.patch(r.children[0], f), c.push(f);
  }
  if (a.length > 0) {
    const f = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: n.wrap(a, !0)
    }, m = Cc(r.children[1]), p = rg(r.children[r.children.length - 1]);
    m && p && (f.position = { start: m, end: p }), c.push(f);
  }
  const d = {
    type: "element",
    tagName: "table",
    properties: {},
    children: n.wrap(c, !0)
  };
  return n.patch(r, d), n.applyData(r, d);
}
function cS(n, r, a) {
  const u = a ? a.children : void 0, d = (u ? u.indexOf(r) : 1) === 0 ? "th" : "td", f = a && a.type === "table" ? a.align : void 0, m = f ? f.length : r.children.length;
  let p = -1;
  const h = [];
  for (; ++p < m; ) {
    const y = r.children[p], S = {}, v = f ? f[p] : void 0;
    v && (S.align = v);
    let T = { type: "element", tagName: d, properties: S, children: [] };
    y && (T.children = n.all(y), n.patch(y, T), T = n.applyData(y, T)), h.push(T);
  }
  const b = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: n.wrap(h, !0)
  };
  return n.patch(r, b), n.applyData(r, b);
}
function fS(n, r) {
  const a = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
const kp = 9, wp = 32;
function dS(n) {
  const r = String(n), a = /\r?\n|\r/g;
  let u = a.exec(r), c = 0;
  const d = [];
  for (; u; )
    d.push(
      Ep(r.slice(c, u.index), c > 0, !0),
      u[0]
    ), c = u.index + u[0].length, u = a.exec(r);
  return d.push(Ep(r.slice(c), c > 0, !1)), d.join("");
}
function Ep(n, r, a) {
  let u = 0, c = n.length;
  if (r) {
    let d = n.codePointAt(u);
    for (; d === kp || d === wp; )
      u++, d = n.codePointAt(u);
  }
  if (a) {
    let d = n.codePointAt(c - 1);
    for (; d === kp || d === wp; )
      c--, d = n.codePointAt(c - 1);
  }
  return c > u ? n.slice(u, c) : "";
}
function hS(n, r) {
  const a = { type: "text", value: dS(String(r.value)) };
  return n.patch(r, a), n.applyData(r, a);
}
function mS(n, r) {
  const a = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return n.patch(r, a), n.applyData(r, a);
}
const pS = {
  blockquote: Xv,
  break: Qv,
  code: Zv,
  delete: Kv,
  emphasis: Fv,
  footnoteReference: Jv,
  heading: Iv,
  html: $v,
  imageReference: Wv,
  image: Pv,
  inlineCode: eS,
  linkReference: tS,
  link: nS,
  listItem: lS,
  list: aS,
  paragraph: rS,
  // @ts-expect-error: root is different, but hard to type.
  root: uS,
  strong: oS,
  table: sS,
  tableCell: fS,
  tableRow: cS,
  text: hS,
  thematicBreak: mS,
  toml: ru,
  yaml: ru,
  definition: ru,
  footnoteDefinition: ru
};
function ru() {
}
const Cg = -1, Su = 0, ja = 1, pu = 2, jc = 3, Lc = 4, Uc = 5, Bc = 6, _g = 7, Og = 8, Dg = typeof self == "object" ? self : globalThis, zp = (n, r) => {
  switch (n) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + n);
  }
  return new Dg[n](r);
}, gS = (n, r) => {
  const a = (c, d) => (n.set(d, c), c), u = (c) => {
    if (n.has(c))
      return n.get(c);
    const [d, f] = r[c];
    switch (d) {
      case Su:
      case Cg:
        return a(f, c);
      case ja: {
        const m = a([], c);
        for (const p of f)
          m.push(u(p));
        return m;
      }
      case pu: {
        const m = a({}, c);
        for (const [p, h] of f)
          m[u(p)] = u(h);
        return m;
      }
      case jc:
        return a(new Date(f), c);
      case Lc: {
        const { source: m, flags: p } = f;
        return a(new RegExp(m, p), c);
      }
      case Uc: {
        const m = a(/* @__PURE__ */ new Map(), c);
        for (const [p, h] of f)
          m.set(u(p), u(h));
        return m;
      }
      case Bc: {
        const m = a(/* @__PURE__ */ new Set(), c);
        for (const p of f)
          m.add(u(p));
        return m;
      }
      case _g: {
        const { name: m, message: p } = f;
        return a(
          typeof Dg[m] == "function" ? zp(m, p) : new Error(p),
          c
        );
      }
      case Og:
        return a(BigInt(f), c);
      case "BigInt":
        return a(Object(BigInt(f)), c);
      case "ArrayBuffer":
        return a(new Uint8Array(f).buffer, f);
      case "DataView": {
        const { buffer: m } = new Uint8Array(f);
        return a(new DataView(m), f);
      }
    }
    return a(zp(d, f), c);
  };
  return u;
}, Tp = (n) => gS(/* @__PURE__ */ new Map(), n)(0), Ll = "", { toString: yS } = {}, { keys: bS } = Object, Da = (n) => {
  const r = typeof n;
  if (r !== "object" || !n)
    return [Su, r];
  const a = yS.call(n).slice(8, -1);
  switch (a) {
    case "Array":
      return [ja, Ll];
    case "Object":
      return [pu, Ll];
    case "Date":
      return [jc, Ll];
    case "RegExp":
      return [Lc, Ll];
    case "Map":
      return [Uc, Ll];
    case "Set":
      return [Bc, Ll];
    case "DataView":
      return [ja, a];
  }
  return a.includes("Array") ? [ja, a] : n instanceof Error ? [_g, n.name || "Error"] : [pu, a];
}, uu = ([n, r]) => n === Su && (r === "function" || r === "symbol"), xS = (n, r, a, u) => {
  const c = (f, m) => {
    const p = u.push(f) - 1;
    return a.set(m, p), p;
  }, d = (f) => {
    if (a.has(f))
      return a.get(f);
    let [m, p] = Da(f);
    switch (m) {
      case Su: {
        let b = f;
        switch (p) {
          case "bigint":
            m = Og, b = f.toString();
            break;
          case "function":
          case "symbol":
            if (n)
              throw new TypeError("unable to serialize " + p);
            b = null;
            break;
          case "undefined":
            return c([Cg], f);
        }
        return c([m, b], f);
      }
      case ja: {
        if (p) {
          let S = f;
          return p === "DataView" ? S = new Uint8Array(f.buffer) : p === "ArrayBuffer" && (S = new Uint8Array(f)), c([p, [...S]], f);
        }
        const b = [], y = c([m, b], f);
        for (const S of f)
          b.push(d(S));
        return y;
      }
      case pu: {
        if (p)
          switch (p) {
            case "BigInt":
              return c([p, f.toString()], f);
            case "Boolean":
            case "Number":
            case "String":
              return c([p, f.valueOf()], f);
          }
        if (r && "toJSON" in f)
          return d(f.toJSON());
        const b = [], y = c([m, b], f);
        for (const S of bS(f))
          (n || !uu(Da(f[S]))) && b.push([d(S), d(f[S])]);
        return y;
      }
      case jc:
        return c([m, isNaN(f.getTime()) ? Ll : f.toISOString()], f);
      case Lc: {
        const { source: b, flags: y } = f;
        return c([m, { source: b, flags: y }], f);
      }
      case Uc: {
        const b = [], y = c([m, b], f);
        for (const [S, v] of f)
          (n || !(uu(Da(S)) || uu(Da(v)))) && b.push([d(S), d(v)]);
        return y;
      }
      case Bc: {
        const b = [], y = c([m, b], f);
        for (const S of f)
          (n || !uu(Da(S))) && b.push(d(S));
        return y;
      }
    }
    const { message: h } = f;
    return c([m, { name: p, message: h }], f);
  };
  return d;
}, Ap = (n, { json: r, lossy: a } = {}) => {
  const u = [];
  return xS(!(r || a), !!r, /* @__PURE__ */ new Map(), u)(n), u;
}, gu = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (n, r) => r && ("json" in r || "lossy" in r) ? Tp(Ap(n, r)) : structuredClone(n)
) : (n, r) => Tp(Ap(n, r));
function vS(n, r) {
  const a = [{ type: "text", value: "↩" }];
  return r > 1 && a.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(r) }]
  }), a;
}
function SS(n, r) {
  return "Back to reference " + (n + 1) + (r > 1 ? "-" + r : "");
}
function kS(n) {
  const r = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", a = n.options.footnoteBackContent || vS, u = n.options.footnoteBackLabel || SS, c = n.options.footnoteLabel || "Footnotes", d = n.options.footnoteLabelTagName || "h2", f = n.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, m = [];
  let p = -1;
  for (; ++p < n.footnoteOrder.length; ) {
    const h = n.footnoteById.get(
      n.footnoteOrder[p]
    );
    if (!h)
      continue;
    const b = n.all(h), y = String(h.identifier).toUpperCase(), S = Ni(y.toLowerCase());
    let v = 0;
    const T = [], L = n.footnoteCounts.get(y);
    for (; L !== void 0 && ++v <= L; ) {
      T.length > 0 && T.push({ type: "text", value: " " });
      let Z = typeof a == "string" ? a : a(p, v);
      typeof Z == "string" && (Z = { type: "text", value: Z }), T.push({
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
    const j = b[b.length - 1];
    if (j && j.type === "element" && j.tagName === "p") {
      const Z = j.children[j.children.length - 1];
      Z && Z.type === "text" ? Z.value += " " : j.children.push({ type: "text", value: " " }), j.children.push(...T);
    } else
      b.push(...T);
    const O = {
      type: "element",
      tagName: "li",
      properties: { id: r + "fn-" + S },
      children: n.wrap(b, !0)
    };
    n.patch(h, O), m.push(O);
  }
  if (m.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: d,
          properties: {
            ...gu(f),
            id: "footnote-label"
          },
          children: [{ type: "text", value: c }]
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
const ku = (
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
      return TS;
    if (typeof n == "function")
      return wu(n);
    if (typeof n == "object")
      return Array.isArray(n) ? wS(n) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        ES(
          /** @type {Props} */
          n
        )
      );
    if (typeof n == "string")
      return zS(n);
    throw new Error("Expected function, string, or object as test");
  })
);
function wS(n) {
  const r = [];
  let a = -1;
  for (; ++a < n.length; )
    r[a] = ku(n[a]);
  return wu(u);
  function u(...c) {
    let d = -1;
    for (; ++d < r.length; )
      if (r[d].apply(this, c)) return !0;
    return !1;
  }
}
function ES(n) {
  const r = (
    /** @type {Record<string, unknown>} */
    n
  );
  return wu(a);
  function a(u) {
    const c = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      u
    );
    let d;
    for (d in n)
      if (c[d] !== r[d]) return !1;
    return !0;
  }
}
function zS(n) {
  return wu(r);
  function r(a) {
    return a && a.type === n;
  }
}
function wu(n) {
  return r;
  function r(a, u, c) {
    return !!(AS(a) && n.call(
      this,
      a,
      typeof u == "number" ? u : void 0,
      c || void 0
    ));
  }
}
function TS() {
  return !0;
}
function AS(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const Mg = [], CS = !0, bc = !1, _S = "skip";
function Ng(n, r, a, u) {
  let c;
  typeof r == "function" && typeof a != "function" ? (u = a, a = r) : c = r;
  const d = ku(c), f = u ? -1 : 1;
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
      let v = Mg, T, L, j;
      if ((!r || d(p, h, b[b.length - 1] || void 0)) && (v = OS(a(p, b)), v[0] === bc))
        return v;
      if ("children" in p && p.children) {
        const O = (
          /** @type {UnistParent} */
          p
        );
        if (O.children && v[0] !== _S)
          for (L = (u ? O.children.length : -1) + f, j = b.concat(O); L > -1 && L < O.children.length; ) {
            const Z = O.children[L];
            if (T = m(Z, L, j)(), T[0] === bc)
              return T;
            L = typeof T[1] == "number" ? T[1] : L + f;
          }
      }
      return v;
    }
  }
}
function OS(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [CS, n] : n == null ? Mg : [n];
}
function Hc(n, r, a, u) {
  let c, d, f;
  typeof r == "function" && typeof a != "function" ? (d = void 0, f = r, c = a) : (d = r, f = a, c = u), Ng(n, d, m, c);
  function m(p, h) {
    const b = h[h.length - 1], y = b ? b.children.indexOf(p) : void 0;
    return f(p, y, b);
  }
}
const xc = {}.hasOwnProperty, DS = {};
function MS(n, r) {
  const a = r || DS, u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), f = { ...pS, ...a.handlers }, m = {
    all: h,
    applyData: RS,
    definitionById: u,
    footnoteById: c,
    footnoteCounts: d,
    footnoteOrder: [],
    handlers: f,
    one: p,
    options: a,
    patch: NS,
    wrap: LS
  };
  return Hc(n, function(b) {
    if (b.type === "definition" || b.type === "footnoteDefinition") {
      const y = b.type === "definition" ? u : c, S = String(b.identifier).toUpperCase();
      y.has(S) || y.set(S, b);
    }
  }), m;
  function p(b, y) {
    const S = b.type, v = m.handlers[S];
    if (xc.call(m.handlers, S) && v)
      return v(m, b, y);
    if (m.options.passThrough && m.options.passThrough.includes(S)) {
      if ("children" in b) {
        const { children: L, ...j } = b, O = gu(j);
        return O.children = m.all(b), O;
      }
      return gu(b);
    }
    return (m.options.unknownHandler || jS)(m, b, y);
  }
  function h(b) {
    const y = [];
    if ("children" in b) {
      const S = b.children;
      let v = -1;
      for (; ++v < S.length; ) {
        const T = m.one(S[v], b);
        if (T) {
          if (v && S[v - 1].type === "break" && (!Array.isArray(T) && T.type === "text" && (T.value = Cp(T.value)), !Array.isArray(T) && T.type === "element")) {
            const L = T.children[0];
            L && L.type === "text" && (L.value = Cp(L.value));
          }
          Array.isArray(T) ? y.push(...T) : y.push(T);
        }
      }
    }
    return y;
  }
}
function NS(n, r) {
  n.position && (r.position = Sx(n));
}
function RS(n, r) {
  let a = r;
  if (n && n.data) {
    const u = n.data.hName, c = n.data.hChildren, d = n.data.hProperties;
    if (typeof u == "string")
      if (a.type === "element")
        a.tagName = u;
      else {
        const f = "children" in a ? a.children : [a];
        a = { type: "element", tagName: u, properties: {}, children: f };
      }
    a.type === "element" && d && Object.assign(a.properties, gu(d)), "children" in a && a.children && c !== null && c !== void 0 && (a.children = c);
  }
  return a;
}
function jS(n, r) {
  const a = r.data || {}, u = "value" in r && !(xc.call(a, "hProperties") || xc.call(a, "hChildren")) ? { type: "text", value: r.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function LS(n, r) {
  const a = [];
  let u = -1;
  for (r && a.push({ type: "text", value: `
` }); ++u < n.length; )
    u && a.push({ type: "text", value: `
` }), a.push(n[u]);
  return r && n.length > 0 && a.push({ type: "text", value: `
` }), a;
}
function Cp(n) {
  let r = 0, a = n.charCodeAt(r);
  for (; a === 9 || a === 32; )
    r++, a = n.charCodeAt(r);
  return n.slice(r);
}
function _p(n, r) {
  const a = MS(n, r), u = a.one(n, void 0), c = kS(a), d = Array.isArray(u) ? { type: "root", children: u } : u || { type: "root", children: [] };
  return c && d.children.push({ type: "text", value: `
` }, c), d;
}
function US(n, r) {
  return n && "run" in n ? async function(a, u) {
    const c = (
      /** @type {HastRoot} */
      _p(a, { file: u, ...r })
    );
    await n.run(c, u);
  } : function(a, u) {
    return (
      /** @type {HastRoot} */
      _p(a, { file: u, ...n || r })
    );
  };
}
function Op(n) {
  if (n)
    throw n;
}
var $s, Dp;
function BS() {
  if (Dp) return $s;
  Dp = 1;
  var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, a = Object.defineProperty, u = Object.getOwnPropertyDescriptor, c = function(h) {
    return typeof Array.isArray == "function" ? Array.isArray(h) : r.call(h) === "[object Array]";
  }, d = function(h) {
    if (!h || r.call(h) !== "[object Object]")
      return !1;
    var b = n.call(h, "constructor"), y = h.constructor && h.constructor.prototype && n.call(h.constructor.prototype, "isPrototypeOf");
    if (h.constructor && !b && !y)
      return !1;
    var S;
    for (S in h)
      ;
    return typeof S > "u" || n.call(h, S);
  }, f = function(h, b) {
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
  return $s = function p() {
    var h, b, y, S, v, T, L = arguments[0], j = 1, O = arguments.length, Z = !1;
    for (typeof L == "boolean" && (Z = L, L = arguments[1] || {}, j = 2), (L == null || typeof L != "object" && typeof L != "function") && (L = {}); j < O; ++j)
      if (h = arguments[j], h != null)
        for (b in h)
          y = m(L, b), S = m(h, b), L !== S && (Z && S && (d(S) || (v = c(S))) ? (v ? (v = !1, T = y && c(y) ? y : []) : T = y && d(y) ? y : {}, f(L, { name: b, newValue: p(Z, T, S) })) : typeof S < "u" && f(L, { name: b, newValue: S }));
    return L;
  }, $s;
}
var HS = /* @__PURE__ */ BS();
const Ws = /* @__PURE__ */ Wp(HS);
function vc(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const r = Object.getPrototypeOf(n);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}
function qS() {
  const n = [], r = { run: a, use: u };
  return r;
  function a(...c) {
    let d = -1;
    const f = c.pop();
    if (typeof f != "function")
      throw new TypeError("Expected function as last argument, not " + f);
    m(null, ...c);
    function m(p, ...h) {
      const b = n[++d];
      let y = -1;
      if (p) {
        f(p);
        return;
      }
      for (; ++y < c.length; )
        (h[y] === null || h[y] === void 0) && (h[y] = c[y]);
      c = h, b ? YS(b, m)(...h) : f(null, ...h);
    }
  }
  function u(c) {
    if (typeof c != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + c
      );
    return n.push(c), r;
  }
}
function YS(n, r) {
  let a;
  return u;
  function u(...f) {
    const m = n.length > f.length;
    let p;
    m && f.push(c);
    try {
      p = n.apply(this, f);
    } catch (h) {
      const b = (
        /** @type {Error} */
        h
      );
      if (m && a)
        throw b;
      return c(b);
    }
    m || (p && p.then && typeof p.then == "function" ? p.then(d, c) : p instanceof Error ? c(p) : d(p));
  }
  function c(f, ...m) {
    a || (a = !0, r(f, ...m));
  }
  function d(f) {
    c(null, f);
  }
}
const gn = { basename: GS, dirname: VS, extname: XS, join: QS, sep: "/" };
function GS(n, r) {
  if (r !== void 0 && typeof r != "string")
    throw new TypeError('"ext" argument must be a string');
  Ya(n);
  let a = 0, u = -1, c = n.length, d;
  if (r === void 0 || r.length === 0 || r.length > n.length) {
    for (; c--; )
      if (n.codePointAt(c) === 47) {
        if (d) {
          a = c + 1;
          break;
        }
      } else u < 0 && (d = !0, u = c + 1);
    return u < 0 ? "" : n.slice(a, u);
  }
  if (r === n)
    return "";
  let f = -1, m = r.length - 1;
  for (; c--; )
    if (n.codePointAt(c) === 47) {
      if (d) {
        a = c + 1;
        break;
      }
    } else
      f < 0 && (d = !0, f = c + 1), m > -1 && (n.codePointAt(c) === r.codePointAt(m--) ? m < 0 && (u = c) : (m = -1, u = f));
  return a === u ? u = f : u < 0 && (u = n.length), n.slice(a, u);
}
function VS(n) {
  if (Ya(n), n.length === 0)
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
function XS(n) {
  Ya(n);
  let r = n.length, a = -1, u = 0, c = -1, d = 0, f;
  for (; r--; ) {
    const m = n.codePointAt(r);
    if (m === 47) {
      if (f) {
        u = r + 1;
        break;
      }
      continue;
    }
    a < 0 && (f = !0, a = r + 1), m === 46 ? c < 0 ? c = r : d !== 1 && (d = 1) : c > -1 && (d = -1);
  }
  return c < 0 || a < 0 || // We saw a non-dot character immediately before the dot.
  d === 0 || // The (right-most) trimmed path component is exactly `..`.
  d === 1 && c === a - 1 && c === u + 1 ? "" : n.slice(c, a);
}
function QS(...n) {
  let r = -1, a;
  for (; ++r < n.length; )
    Ya(n[r]), n[r] && (a = a === void 0 ? n[r] : a + "/" + n[r]);
  return a === void 0 ? "." : ZS(a);
}
function ZS(n) {
  Ya(n);
  const r = n.codePointAt(0) === 47;
  let a = KS(n, !r);
  return a.length === 0 && !r && (a = "."), a.length > 0 && n.codePointAt(n.length - 1) === 47 && (a += "/"), r ? "/" + a : a;
}
function KS(n, r) {
  let a = "", u = 0, c = -1, d = 0, f = -1, m, p;
  for (; ++f <= n.length; ) {
    if (f < n.length)
      m = n.codePointAt(f);
    else {
      if (m === 47)
        break;
      m = 47;
    }
    if (m === 47) {
      if (!(c === f - 1 || d === 1)) if (c !== f - 1 && d === 2) {
        if (a.length < 2 || u !== 2 || a.codePointAt(a.length - 1) !== 46 || a.codePointAt(a.length - 2) !== 46) {
          if (a.length > 2) {
            if (p = a.lastIndexOf("/"), p !== a.length - 1) {
              p < 0 ? (a = "", u = 0) : (a = a.slice(0, p), u = a.length - 1 - a.lastIndexOf("/")), c = f, d = 0;
              continue;
            }
          } else if (a.length > 0) {
            a = "", u = 0, c = f, d = 0;
            continue;
          }
        }
        r && (a = a.length > 0 ? a + "/.." : "..", u = 2);
      } else
        a.length > 0 ? a += "/" + n.slice(c + 1, f) : a = n.slice(c + 1, f), u = f - c - 1;
      c = f, d = 0;
    } else m === 46 && d > -1 ? d++ : d = -1;
  }
  return a;
}
function Ya(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(n)
    );
}
const FS = { cwd: JS };
function JS() {
  return "/";
}
function Sc(n) {
  return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && // @ts-expect-error: indexing is fine.
  n.auth === void 0);
}
function IS(n) {
  if (typeof n == "string")
    n = new URL(n);
  else if (!Sc(n)) {
    const r = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + n + "`"
    );
    throw r.code = "ERR_INVALID_ARG_TYPE", r;
  }
  if (n.protocol !== "file:") {
    const r = new TypeError("The URL must be of scheme file");
    throw r.code = "ERR_INVALID_URL_SCHEME", r;
  }
  return $S(n);
}
function $S(n) {
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
        const c = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw c.code = "ERR_INVALID_FILE_URL_PATH", c;
      }
    }
  return decodeURIComponent(r);
}
const Ps = (
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
class Rg {
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
    r ? Sc(r) ? a = { path: r } : typeof r == "string" || WS(r) ? a = { value: r } : a = r : a = {}, this.cwd = "cwd" in a ? "" : FS.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let u = -1;
    for (; ++u < Ps.length; ) {
      const d = Ps[u];
      d in a && a[d] !== void 0 && a[d] !== null && (this[d] = d === "history" ? [...a[d]] : a[d]);
    }
    let c;
    for (c in a)
      Ps.includes(c) || (this[c] = a[c]);
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
    tc(r, "basename"), ec(r, "basename"), this.path = gn.join(this.dirname || "", r);
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
    Mp(this.basename, "dirname"), this.path = gn.join(r || "", this.basename);
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
    if (ec(r, "extname"), Mp(this.dirname, "extname"), r) {
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
    Sc(r) && (r = IS(r)), tc(r, "path"), this.path !== r && this.history.push(r);
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
    tc(r, "stem"), ec(r, "stem"), this.path = gn.join(this.dirname || "", r + (this.extname || ""));
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
    const c = this.message(r, a, u);
    throw c.fatal = !0, c;
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
    const c = this.message(r, a, u);
    return c.fatal = void 0, c;
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
    const c = new xt(
      // @ts-expect-error: the overloads are fine.
      r,
      a,
      u
    );
    return this.path && (c.name = this.path + ":" + c.name, c.file = this.path), c.fatal = !1, this.messages.push(c), c;
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
function ec(n, r) {
  if (n && n.includes(gn.sep))
    throw new Error(
      "`" + r + "` cannot be a path: did not expect `" + gn.sep + "`"
    );
}
function tc(n, r) {
  if (!n)
    throw new Error("`" + r + "` cannot be empty");
}
function Mp(n, r) {
  if (!n)
    throw new Error("Setting `" + r + "` requires `path` to be set too");
}
function WS(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const PS = (
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
    ), c = u[n], d = function() {
      return c.apply(d, arguments);
    };
    return Object.setPrototypeOf(d, u), d;
  })
), ek = {}.hasOwnProperty;
class qc extends PS {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = qS();
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
      new qc()
    );
    let a = -1;
    for (; ++a < this.attachers.length; ) {
      const u = this.attachers[a];
      r.use(...u);
    }
    return r.data(Ws(!0, {}, this.namespace)), r;
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
    return typeof r == "string" ? arguments.length === 2 ? (ic("data", this.frozen), this.namespace[r] = a, this) : ek.call(this.namespace, r) && this.namespace[r] || void 0 : r ? (ic("data", this.frozen), this.namespace = r, this) : this.namespace;
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
      const c = a.call(r, ...u);
      typeof c == "function" && this.transformers.use(c);
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
    const a = ou(r), u = this.parser || this.Parser;
    return nc("parse", u), u(String(a), a);
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
    return this.freeze(), nc("process", this.parser || this.Parser), lc("process", this.compiler || this.Compiler), a ? c(void 0, a) : new Promise(c);
    function c(d, f) {
      const m = ou(r), p = (
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
        ), T = u.stringify(v, S);
        lk(T) ? S.value = T : S.result = T, h(
          b,
          /** @type {VFileWithOutput<CompileResult>} */
          S
        );
      });
      function h(b, y) {
        b || !y ? f(b) : d ? d(y) : a(void 0, y);
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
    return this.freeze(), nc("processSync", this.parser || this.Parser), lc("processSync", this.compiler || this.Compiler), this.process(r, c), Rp("processSync", "process", a), u;
    function c(d, f) {
      a = !0, Op(d), u = f;
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
    Np(r), this.freeze();
    const c = this.transformers;
    return !u && typeof a == "function" && (u = a, a = void 0), u ? d(void 0, u) : new Promise(d);
    function d(f, m) {
      const p = ou(a);
      c.run(r, p, h);
      function h(b, y, S) {
        const v = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          y || r
        );
        b ? m(b) : f ? f(v) : u(void 0, v, S);
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
    let u = !1, c;
    return this.run(r, a, d), Rp("runSync", "run", u), c;
    function d(f, m) {
      Op(f), c = m, u = !0;
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
    const u = ou(a), c = this.compiler || this.Compiler;
    return lc("stringify", c), Np(r), c(r, u);
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
    const u = this.attachers, c = this.namespace;
    if (ic("use", this.frozen), r != null) if (typeof r == "function")
      p(r, a);
    else if (typeof r == "object")
      Array.isArray(r) ? m(r) : f(r);
    else
      throw new TypeError("Expected usable value, not `" + r + "`");
    return this;
    function d(h) {
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
          f(h);
      else
        throw new TypeError("Expected usable value, not `" + h + "`");
    }
    function f(h) {
      if (!("plugins" in h) && !("settings" in h))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      m(h.plugins), h.settings && (c.settings = Ws(!0, c.settings, h.settings));
    }
    function m(h) {
      let b = -1;
      if (h != null) if (Array.isArray(h))
        for (; ++b < h.length; ) {
          const y = h[b];
          d(y);
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
        let [v, ...T] = b;
        const L = u[S][1];
        vc(L) && vc(v) && (v = Ws(!0, L, v)), u[S] = [h, v, ...T];
      }
    }
  }
}
const tk = new qc().freeze();
function nc(n, r) {
  if (typeof r != "function")
    throw new TypeError("Cannot `" + n + "` without `parser`");
}
function lc(n, r) {
  if (typeof r != "function")
    throw new TypeError("Cannot `" + n + "` without `compiler`");
}
function ic(n, r) {
  if (r)
    throw new Error(
      "Cannot call `" + n + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Np(n) {
  if (!vc(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function Rp(n, r, a) {
  if (!a)
    throw new Error(
      "`" + n + "` finished async. Use `" + r + "` instead"
    );
}
function ou(n) {
  return nk(n) ? n : new Rg(n);
}
function nk(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function lk(n) {
  return typeof n == "string" || ik(n);
}
function ik(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const ak = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", jp = [], Lp = { allowDangerousHtml: !0 }, rk = /^(https?|ircs?|mailto|xmpp)$/i, uk = [
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
function ok(n) {
  const r = sk(n), a = ck(n);
  return fk(r.runSync(r.parse(a), a), n);
}
function sk(n) {
  const r = n.rehypePlugins || jp, a = n.remarkPlugins || jp, u = n.remarkRehypeOptions ? { ...n.remarkRehypeOptions, ...Lp } : Lp;
  return tk().use(Vv).use(a).use(US, u).use(r);
}
function ck(n) {
  const r = n.children || "", a = new Rg();
  return typeof r == "string" && (a.value = r), a;
}
function fk(n, r) {
  const a = r.allowedElements, u = r.allowElement, c = r.components, d = r.disallowedElements, f = r.skipHtml, m = r.unwrapDisallowed, p = r.urlTransform || dk;
  for (const b of uk)
    Object.hasOwn(r, b.from) && ("" + b.from + (b.to ? "use `" + b.to + "` instead" : "remove it") + ak + b.id, void 0);
  return Hc(n, h), Tx(n, {
    Fragment: _.Fragment,
    components: c,
    ignoreInvalidStyle: !0,
    jsx: _.jsx,
    jsxs: _.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function h(b, y, S) {
    if (b.type === "raw" && S && typeof y == "number")
      return f ? S.children.splice(y, 1) : S.children[y] = { type: "text", value: b.value }, y;
    if (b.type === "element") {
      let v;
      for (v in Fs)
        if (Object.hasOwn(Fs, v) && Object.hasOwn(b.properties, v)) {
          const T = b.properties[v], L = Fs[v];
          (L === null || L.includes(b.tagName)) && (b.properties[v] = p(String(T || ""), v, b));
        }
    }
    if (b.type === "element") {
      let v = a ? !a.includes(b.tagName) : d ? d.includes(b.tagName) : !1;
      if (!v && u && typeof y == "number" && (v = !u(b, y, S)), v && S && typeof y == "number")
        return m && b.children ? S.children.splice(y, 1, ...b.children) : S.children.splice(y, 1), y;
    }
  }
}
function dk(n) {
  const r = n.indexOf(":"), a = n.indexOf("?"), u = n.indexOf("#"), c = n.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    c !== -1 && r > c || a !== -1 && r > a || u !== -1 && r > u || // It is a protocol, it should be allowed.
    rk.test(n.slice(0, r)) ? n : ""
  );
}
function Up(n, r) {
  const a = String(n);
  if (typeof r != "string")
    throw new TypeError("Expected character");
  let u = 0, c = a.indexOf(r);
  for (; c !== -1; )
    u++, c = a.indexOf(r, c + r.length);
  return u;
}
function hk(n) {
  if (typeof n != "string")
    throw new TypeError("Expected a string");
  return n.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function mk(n, r, a) {
  const c = ku((a || {}).ignore || []), d = pk(r);
  let f = -1;
  for (; ++f < d.length; )
    Ng(n, "text", m);
  function m(h, b) {
    let y = -1, S;
    for (; ++y < b.length; ) {
      const v = b[y], T = S ? S.children : void 0;
      if (c(
        v,
        T ? T.indexOf(v) : void 0,
        S
      ))
        return;
      S = v;
    }
    if (S)
      return p(h, b);
  }
  function p(h, b) {
    const y = b[b.length - 1], S = d[f][0], v = d[f][1];
    let T = 0;
    const j = y.children.indexOf(h);
    let O = !1, Z = [];
    S.lastIndex = 0;
    let G = S.exec(h.value);
    for (; G; ) {
      const le = G.index, fe = {
        index: G.index,
        input: G.input,
        stack: [...b, h]
      };
      let H = v(...G, fe);
      if (typeof H == "string" && (H = H.length > 0 ? { type: "text", value: H } : void 0), H === !1 ? S.lastIndex = le + 1 : (T !== le && Z.push({
        type: "text",
        value: h.value.slice(T, le)
      }), Array.isArray(H) ? Z.push(...H) : H && Z.push(H), T = le + G[0].length, O = !0), !S.global)
        break;
      G = S.exec(h.value);
    }
    return O ? (T < h.value.length && Z.push({ type: "text", value: h.value.slice(T) }), y.children.splice(j, 1, ...Z)) : Z = [h], j + Z.length;
  }
}
function pk(n) {
  const r = [];
  if (!Array.isArray(n))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const a = !n[0] || Array.isArray(n[0]) ? n : [n];
  let u = -1;
  for (; ++u < a.length; ) {
    const c = a[u];
    r.push([gk(c[0]), yk(c[1])]);
  }
  return r;
}
function gk(n) {
  return typeof n == "string" ? new RegExp(hk(n), "g") : n;
}
function yk(n) {
  return typeof n == "function" ? n : function() {
    return n;
  };
}
const ac = "phrasing", rc = ["autolink", "link", "image", "label"];
function bk() {
  return {
    transforms: [zk],
    enter: {
      literalAutolink: vk,
      literalAutolinkEmail: uc,
      literalAutolinkHttp: uc,
      literalAutolinkWww: uc
    },
    exit: {
      literalAutolink: Ek,
      literalAutolinkEmail: wk,
      literalAutolinkHttp: Sk,
      literalAutolinkWww: kk
    }
  };
}
function xk() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: ac,
        notInConstruct: rc
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: ac,
        notInConstruct: rc
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: ac,
        notInConstruct: rc
      }
    ]
  };
}
function vk(n) {
  this.enter({ type: "link", title: null, url: "", children: [] }, n);
}
function uc(n) {
  this.config.enter.autolinkProtocol.call(this, n);
}
function Sk(n) {
  this.config.exit.autolinkProtocol.call(this, n);
}
function kk(n) {
  this.config.exit.data.call(this, n);
  const r = this.stack[this.stack.length - 1];
  r.type, r.url = "http://" + this.sliceSerialize(n);
}
function wk(n) {
  this.config.exit.autolinkEmail.call(this, n);
}
function Ek(n) {
  this.exit(n);
}
function zk(n) {
  mk(
    n,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Tk],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), Ak]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Tk(n, r, a, u, c) {
  let d = "";
  if (!jg(c) || (/^w/i.test(r) && (a = r + a, r = "", d = "http://"), !Ck(a)))
    return !1;
  const f = _k(a + u);
  if (!f[0]) return !1;
  const m = {
    type: "link",
    title: null,
    url: d + r + f[0],
    children: [{ type: "text", value: r + f[0] }]
  };
  return f[1] ? [m, { type: "text", value: f[1] }] : m;
}
function Ak(n, r, a, u) {
  return (
    // Not an expected previous character.
    !jg(u, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(a) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + r + "@" + a,
      children: [{ type: "text", value: r + "@" + a }]
    }
  );
}
function Ck(n) {
  const r = n.split(".");
  return !(r.length < 2 || r[r.length - 1] && (/_/.test(r[r.length - 1]) || !/[a-zA-Z\d]/.test(r[r.length - 1])) || r[r.length - 2] && (/_/.test(r[r.length - 2]) || !/[a-zA-Z\d]/.test(r[r.length - 2])));
}
function _k(n) {
  const r = /[!"&'),.:;<>?\]}]+$/.exec(n);
  if (!r)
    return [n, void 0];
  n = n.slice(0, r.index);
  let a = r[0], u = a.indexOf(")");
  const c = Up(n, "(");
  let d = Up(n, ")");
  for (; u !== -1 && c > d; )
    n += a.slice(0, u + 1), a = a.slice(u + 1), u = a.indexOf(")"), d++;
  return [n, a];
}
function jg(n, r) {
  const a = n.input.charCodeAt(n.index - 1);
  return (n.index === 0 || Bl(a) || xu(a)) && // If it’s an email, the previous character should not be a slash.
  (!r || a !== 47);
}
Lg.peek = Bk;
function Ok() {
  this.buffer();
}
function Dk(n) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, n);
}
function Mk() {
  this.buffer();
}
function Nk(n) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    n
  );
}
function Rk(n) {
  const r = this.resume(), a = this.stack[this.stack.length - 1];
  a.type, a.identifier = sn(
    this.sliceSerialize(n)
  ).toLowerCase(), a.label = r;
}
function jk(n) {
  this.exit(n);
}
function Lk(n) {
  const r = this.resume(), a = this.stack[this.stack.length - 1];
  a.type, a.identifier = sn(
    this.sliceSerialize(n)
  ).toLowerCase(), a.label = r;
}
function Uk(n) {
  this.exit(n);
}
function Bk() {
  return "[";
}
function Lg(n, r, a, u) {
  const c = a.createTracker(u);
  let d = c.move("[^");
  const f = a.enter("footnoteReference"), m = a.enter("reference");
  return d += c.move(
    a.safe(a.associationId(n), { after: "]", before: d })
  ), m(), f(), d += c.move("]"), d;
}
function Hk() {
  return {
    enter: {
      gfmFootnoteCallString: Ok,
      gfmFootnoteCall: Dk,
      gfmFootnoteDefinitionLabelString: Mk,
      gfmFootnoteDefinition: Nk
    },
    exit: {
      gfmFootnoteCallString: Rk,
      gfmFootnoteCall: jk,
      gfmFootnoteDefinitionLabelString: Lk,
      gfmFootnoteDefinition: Uk
    }
  };
}
function qk(n) {
  let r = !1;
  return n && n.firstLineBlank && (r = !0), {
    handlers: { footnoteDefinition: a, footnoteReference: Lg },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function a(u, c, d, f) {
    const m = d.createTracker(f);
    let p = m.move("[^");
    const h = d.enter("footnoteDefinition"), b = d.enter("label");
    return p += m.move(
      d.safe(d.associationId(u), { before: p, after: "]" })
    ), b(), p += m.move("]:"), u.children && u.children.length > 0 && (m.shift(4), p += m.move(
      (r ? `
` : " ") + d.indentLines(
        d.containerFlow(u, m.current()),
        r ? Ug : Yk
      )
    )), h(), p;
  }
}
function Yk(n, r, a) {
  return r === 0 ? n : Ug(n, r, a);
}
function Ug(n, r, a) {
  return (a ? "" : "    ") + n;
}
const Gk = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Bg.peek = Kk;
function Vk() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Qk },
    exit: { strikethrough: Zk }
  };
}
function Xk() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Gk
      }
    ],
    handlers: { delete: Bg }
  };
}
function Qk(n) {
  this.enter({ type: "delete", children: [] }, n);
}
function Zk(n) {
  this.exit(n);
}
function Bg(n, r, a, u) {
  const c = a.createTracker(u), d = a.enter("strikethrough");
  let f = c.move("~~");
  return f += a.containerPhrasing(n, {
    ...c.current(),
    before: f,
    after: "~"
  }), f += c.move("~~"), d(), f;
}
function Kk() {
  return "~";
}
function Fk(n) {
  return n.length;
}
function Jk(n, r) {
  const a = r || {}, u = (a.align || []).concat(), c = a.stringLength || Fk, d = [], f = [], m = [], p = [];
  let h = 0, b = -1;
  for (; ++b < n.length; ) {
    const L = [], j = [];
    let O = -1;
    for (n[b].length > h && (h = n[b].length); ++O < n[b].length; ) {
      const Z = Ik(n[b][O]);
      if (a.alignDelimiters !== !1) {
        const G = c(Z);
        j[O] = G, (p[O] === void 0 || G > p[O]) && (p[O] = G);
      }
      L.push(Z);
    }
    f[b] = L, m[b] = j;
  }
  let y = -1;
  if (typeof u == "object" && "length" in u)
    for (; ++y < h; )
      d[y] = Bp(u[y]);
  else {
    const L = Bp(u);
    for (; ++y < h; )
      d[y] = L;
  }
  y = -1;
  const S = [], v = [];
  for (; ++y < h; ) {
    const L = d[y];
    let j = "", O = "";
    L === 99 ? (j = ":", O = ":") : L === 108 ? j = ":" : L === 114 && (O = ":");
    let Z = a.alignDelimiters === !1 ? 1 : Math.max(
      1,
      p[y] - j.length - O.length
    );
    const G = j + "-".repeat(Z) + O;
    a.alignDelimiters !== !1 && (Z = j.length + Z + O.length, Z > p[y] && (p[y] = Z), v[y] = Z), S[y] = G;
  }
  f.splice(1, 0, S), m.splice(1, 0, v), b = -1;
  const T = [];
  for (; ++b < f.length; ) {
    const L = f[b], j = m[b];
    y = -1;
    const O = [];
    for (; ++y < h; ) {
      const Z = L[y] || "";
      let G = "", le = "";
      if (a.alignDelimiters !== !1) {
        const fe = p[y] - (j[y] || 0), H = d[y];
        H === 114 ? G = " ".repeat(fe) : H === 99 ? fe % 2 ? (G = " ".repeat(fe / 2 + 0.5), le = " ".repeat(fe / 2 - 0.5)) : (G = " ".repeat(fe / 2), le = G) : le = " ".repeat(fe);
      }
      a.delimiterStart !== !1 && !y && O.push("|"), a.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(a.alignDelimiters === !1 && Z === "") && (a.delimiterStart !== !1 || y) && O.push(" "), a.alignDelimiters !== !1 && O.push(G), O.push(Z), a.alignDelimiters !== !1 && O.push(le), a.padding !== !1 && O.push(" "), (a.delimiterEnd !== !1 || y !== h - 1) && O.push("|");
    }
    T.push(
      a.delimiterEnd === !1 ? O.join("").replace(/ +$/, "") : O.join("")
    );
  }
  return T.join(`
`);
}
function Ik(n) {
  return n == null ? "" : String(n);
}
function Bp(n) {
  const r = typeof n == "string" ? n.codePointAt(0) : 0;
  return r === 67 || r === 99 ? 99 : r === 76 || r === 108 ? 108 : r === 82 || r === 114 ? 114 : 0;
}
function $k(n, r, a, u) {
  const c = a.enter("blockquote"), d = a.createTracker(u);
  d.move("> "), d.shift(2);
  const f = a.indentLines(
    a.containerFlow(n, d.current()),
    Wk
  );
  return c(), f;
}
function Wk(n, r, a) {
  return ">" + (a ? "" : " ") + n;
}
function Pk(n, r) {
  return Hp(n, r.inConstruct, !0) && !Hp(n, r.notInConstruct, !1);
}
function Hp(n, r, a) {
  if (typeof r == "string" && (r = [r]), !r || r.length === 0)
    return a;
  let u = -1;
  for (; ++u < r.length; )
    if (n.includes(r[u]))
      return !0;
  return !1;
}
function qp(n, r, a, u) {
  let c = -1;
  for (; ++c < a.unsafe.length; )
    if (a.unsafe[c].character === `
` && Pk(a.stack, a.unsafe[c]))
      return /[ \t]/.test(u.before) ? "" : " ";
  return `\\
`;
}
function ew(n, r) {
  const a = String(n);
  let u = a.indexOf(r), c = u, d = 0, f = 0;
  if (typeof r != "string")
    throw new TypeError("Expected substring");
  for (; u !== -1; )
    u === c ? ++d > f && (f = d) : d = 1, c = u + r.length, u = a.indexOf(r, c);
  return f;
}
function tw(n, r) {
  return !!(r.options.fences === !1 && n.value && // If there’s no info…
  !n.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(n.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value));
}
function nw(n) {
  const r = n.options.fence || "`";
  if (r !== "`" && r !== "~")
    throw new Error(
      "Cannot serialize code with `" + r + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return r;
}
function lw(n, r, a, u) {
  const c = nw(a), d = n.value || "", f = c === "`" ? "GraveAccent" : "Tilde";
  if (tw(n, a)) {
    const y = a.enter("codeIndented"), S = a.indentLines(d, iw);
    return y(), S;
  }
  const m = a.createTracker(u), p = c.repeat(Math.max(ew(d, c) + 1, 3)), h = a.enter("codeFenced");
  let b = m.move(p);
  if (n.lang) {
    const y = a.enter(`codeFencedLang${f}`);
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
    const y = a.enter(`codeFencedMeta${f}`);
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
`), d && (b += m.move(d + `
`)), b += m.move(p), h(), b;
}
function iw(n, r, a) {
  return (a ? "" : "    ") + n;
}
function Yc(n) {
  const r = n.options.quote || '"';
  if (r !== '"' && r !== "'")
    throw new Error(
      "Cannot serialize title with `" + r + "` for `options.quote`, expected `\"`, or `'`"
    );
  return r;
}
function aw(n, r, a, u) {
  const c = Yc(a), d = c === '"' ? "Quote" : "Apostrophe", f = a.enter("definition");
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
  )), m(), n.title && (m = a.enter(`title${d}`), h += p.move(" " + c), h += p.move(
    a.safe(n.title, {
      before: h,
      after: c,
      ...p.current()
    })
  ), h += p.move(c), m()), f(), h;
}
function rw(n) {
  const r = n.options.emphasis || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + r + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return r;
}
function Ba(n) {
  return "&#x" + n.toString(16).toUpperCase() + ";";
}
function yu(n, r, a) {
  const u = Di(n), c = Di(r);
  return u === void 0 ? c === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    a === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : c === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : u === 1 ? c === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : c === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : c === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : c === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
Hg.peek = uw;
function Hg(n, r, a, u) {
  const c = rw(a), d = a.enter("emphasis"), f = a.createTracker(u), m = f.move(c);
  let p = f.move(
    a.containerPhrasing(n, {
      after: c,
      before: m,
      ...f.current()
    })
  );
  const h = p.charCodeAt(0), b = yu(
    u.before.charCodeAt(u.before.length - 1),
    h,
    c
  );
  b.inside && (p = Ba(h) + p.slice(1));
  const y = p.charCodeAt(p.length - 1), S = yu(u.after.charCodeAt(0), y, c);
  S.inside && (p = p.slice(0, -1) + Ba(y));
  const v = f.move(c);
  return d(), a.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: b.outside
  }, m + p + v;
}
function uw(n, r, a) {
  return a.options.emphasis || "*";
}
function ow(n, r) {
  let a = !1;
  return Hc(n, function(u) {
    if ("value" in u && /\r?\n|\r/.test(u.value) || u.type === "break")
      return a = !0, bc;
  }), !!((!n.depth || n.depth < 3) && Mc(n) && (r.options.setext || a));
}
function sw(n, r, a, u) {
  const c = Math.max(Math.min(6, n.depth || 1), 1), d = a.createTracker(u);
  if (ow(n, a)) {
    const b = a.enter("headingSetext"), y = a.enter("phrasing"), S = a.containerPhrasing(n, {
      ...d.current(),
      before: `
`,
      after: `
`
    });
    return y(), b(), S + `
` + (c === 1 ? "=" : "-").repeat(
      // The whole size…
      S.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(S.lastIndexOf("\r"), S.lastIndexOf(`
`)) + 1)
    );
  }
  const f = "#".repeat(c), m = a.enter("headingAtx"), p = a.enter("phrasing");
  d.move(f + " ");
  let h = a.containerPhrasing(n, {
    before: "# ",
    after: `
`,
    ...d.current()
  });
  return /^[\t ]/.test(h) && (h = Ba(h.charCodeAt(0)) + h.slice(1)), h = h ? f + " " + h : f, a.options.closeAtx && (h += " " + f), p(), m(), h;
}
qg.peek = cw;
function qg(n) {
  return n.value || "";
}
function cw() {
  return "<";
}
Yg.peek = fw;
function Yg(n, r, a, u) {
  const c = Yc(a), d = c === '"' ? "Quote" : "Apostrophe", f = a.enter("image");
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
  )), m(), n.title && (m = a.enter(`title${d}`), h += p.move(" " + c), h += p.move(
    a.safe(n.title, {
      before: h,
      after: c,
      ...p.current()
    })
  ), h += p.move(c), m()), h += p.move(")"), f(), h;
}
function fw() {
  return "!";
}
Gg.peek = dw;
function Gg(n, r, a, u) {
  const c = n.referenceType, d = a.enter("imageReference");
  let f = a.enter("label");
  const m = a.createTracker(u);
  let p = m.move("![");
  const h = a.safe(n.alt, {
    before: p,
    after: "]",
    ...m.current()
  });
  p += m.move(h + "]["), f();
  const b = a.stack;
  a.stack = [], f = a.enter("reference");
  const y = a.safe(a.associationId(n), {
    before: p,
    after: "]",
    ...m.current()
  });
  return f(), a.stack = b, d(), c === "full" || !h || h !== y ? p += m.move(y + "]") : c === "shortcut" ? p = p.slice(0, -1) : p += m.move("]"), p;
}
function dw() {
  return "!";
}
Vg.peek = hw;
function Vg(n, r, a) {
  let u = n.value || "", c = "`", d = -1;
  for (; new RegExp("(^|[^`])" + c + "([^`]|$)").test(u); )
    c += "`";
  for (/[^ \r\n]/.test(u) && (/^[ \r\n]/.test(u) && /[ \r\n]$/.test(u) || /^`|`$/.test(u)) && (u = " " + u + " "); ++d < a.unsafe.length; ) {
    const f = a.unsafe[d], m = a.compilePattern(f);
    let p;
    if (f.atBreak)
      for (; p = m.exec(u); ) {
        let h = p.index;
        u.charCodeAt(h) === 10 && u.charCodeAt(h - 1) === 13 && h--, u = u.slice(0, h) + " " + u.slice(p.index + 1);
      }
  }
  return c + u + c;
}
function hw() {
  return "`";
}
function Xg(n, r) {
  const a = Mc(n);
  return !!(!r.options.resourceLink && // If there’s a url…
  n.url && // And there’s a no title…
  !n.title && // And the content of `node` is a single text node…
  n.children && n.children.length === 1 && n.children[0].type === "text" && // And if the url is the same as the content…
  (a === n.url || "mailto:" + a === n.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(n.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(n.url));
}
Qg.peek = mw;
function Qg(n, r, a, u) {
  const c = Yc(a), d = c === '"' ? "Quote" : "Apostrophe", f = a.createTracker(u);
  let m, p;
  if (Xg(n, a)) {
    const b = a.stack;
    a.stack = [], m = a.enter("autolink");
    let y = f.move("<");
    return y += f.move(
      a.containerPhrasing(n, {
        before: y,
        after: ">",
        ...f.current()
      })
    ), y += f.move(">"), m(), a.stack = b, y;
  }
  m = a.enter("link"), p = a.enter("label");
  let h = f.move("[");
  return h += f.move(
    a.containerPhrasing(n, {
      before: h,
      after: "](",
      ...f.current()
    })
  ), h += f.move("]("), p(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (p = a.enter("destinationLiteral"), h += f.move("<"), h += f.move(
    a.safe(n.url, { before: h, after: ">", ...f.current() })
  ), h += f.move(">")) : (p = a.enter("destinationRaw"), h += f.move(
    a.safe(n.url, {
      before: h,
      after: n.title ? " " : ")",
      ...f.current()
    })
  )), p(), n.title && (p = a.enter(`title${d}`), h += f.move(" " + c), h += f.move(
    a.safe(n.title, {
      before: h,
      after: c,
      ...f.current()
    })
  ), h += f.move(c), p()), h += f.move(")"), m(), h;
}
function mw(n, r, a) {
  return Xg(n, a) ? "<" : "[";
}
Zg.peek = pw;
function Zg(n, r, a, u) {
  const c = n.referenceType, d = a.enter("linkReference");
  let f = a.enter("label");
  const m = a.createTracker(u);
  let p = m.move("[");
  const h = a.containerPhrasing(n, {
    before: p,
    after: "]",
    ...m.current()
  });
  p += m.move(h + "]["), f();
  const b = a.stack;
  a.stack = [], f = a.enter("reference");
  const y = a.safe(a.associationId(n), {
    before: p,
    after: "]",
    ...m.current()
  });
  return f(), a.stack = b, d(), c === "full" || !h || h !== y ? p += m.move(y + "]") : c === "shortcut" ? p = p.slice(0, -1) : p += m.move("]"), p;
}
function pw() {
  return "[";
}
function Gc(n) {
  const r = n.options.bullet || "*";
  if (r !== "*" && r !== "+" && r !== "-")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return r;
}
function gw(n) {
  const r = Gc(n), a = n.options.bulletOther;
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
function yw(n) {
  const r = n.options.bulletOrdered || ".";
  if (r !== "." && r !== ")")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return r;
}
function Kg(n) {
  const r = n.options.rule || "*";
  if (r !== "*" && r !== "-" && r !== "_")
    throw new Error(
      "Cannot serialize rules with `" + r + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return r;
}
function bw(n, r, a, u) {
  const c = a.enter("list"), d = a.bulletCurrent;
  let f = n.ordered ? yw(a) : Gc(a);
  const m = n.ordered ? f === "." ? ")" : "." : gw(a);
  let p = r && a.bulletLastUsed ? f === a.bulletLastUsed : !1;
  if (!n.ordered) {
    const b = n.children ? n.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (f === "*" || f === "-") && // Empty first list item:
      b && (!b.children || !b.children[0]) && // Directly in two other list items:
      a.stack[a.stack.length - 1] === "list" && a.stack[a.stack.length - 2] === "listItem" && a.stack[a.stack.length - 3] === "list" && a.stack[a.stack.length - 4] === "listItem" && // That are each the first child.
      a.indexStack[a.indexStack.length - 1] === 0 && a.indexStack[a.indexStack.length - 2] === 0 && a.indexStack[a.indexStack.length - 3] === 0 && (p = !0), Kg(a) === f && b
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
  p && (f = m), a.bulletCurrent = f;
  const h = a.containerFlow(n, u);
  return a.bulletLastUsed = f, a.bulletCurrent = d, c(), h;
}
function xw(n) {
  const r = n.options.listItemIndent || "one";
  if (r !== "tab" && r !== "one" && r !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return r;
}
function vw(n, r, a, u) {
  const c = xw(a);
  let d = a.bulletCurrent || Gc(a);
  r && r.type === "list" && r.ordered && (d = (typeof r.start == "number" && r.start > -1 ? r.start : 1) + (a.options.incrementListMarker === !1 ? 0 : r.children.indexOf(n)) + d);
  let f = d.length + 1;
  (c === "tab" || c === "mixed" && (r && r.type === "list" && r.spread || n.spread)) && (f = Math.ceil(f / 4) * 4);
  const m = a.createTracker(u);
  m.move(d + " ".repeat(f - d.length)), m.shift(f);
  const p = a.enter("listItem"), h = a.indentLines(
    a.containerFlow(n, m.current()),
    b
  );
  return p(), h;
  function b(y, S, v) {
    return S ? (v ? "" : " ".repeat(f)) + y : (v ? d : d + " ".repeat(f - d.length)) + y;
  }
}
function Sw(n, r, a, u) {
  const c = a.enter("paragraph"), d = a.enter("phrasing"), f = a.containerPhrasing(n, u);
  return d(), c(), f;
}
const kw = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  ku([
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
function ww(n, r, a, u) {
  return (n.children.some(function(f) {
    return kw(f);
  }) ? a.containerPhrasing : a.containerFlow).call(a, n, u);
}
function Ew(n) {
  const r = n.options.strong || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize strong with `" + r + "` for `options.strong`, expected `*`, or `_`"
    );
  return r;
}
Fg.peek = zw;
function Fg(n, r, a, u) {
  const c = Ew(a), d = a.enter("strong"), f = a.createTracker(u), m = f.move(c + c);
  let p = f.move(
    a.containerPhrasing(n, {
      after: c,
      before: m,
      ...f.current()
    })
  );
  const h = p.charCodeAt(0), b = yu(
    u.before.charCodeAt(u.before.length - 1),
    h,
    c
  );
  b.inside && (p = Ba(h) + p.slice(1));
  const y = p.charCodeAt(p.length - 1), S = yu(u.after.charCodeAt(0), y, c);
  S.inside && (p = p.slice(0, -1) + Ba(y));
  const v = f.move(c + c);
  return d(), a.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: b.outside
  }, m + p + v;
}
function zw(n, r, a) {
  return a.options.strong || "*";
}
function Tw(n, r, a, u) {
  return a.safe(n.value, u);
}
function Aw(n) {
  const r = n.options.ruleRepetition || 3;
  if (r < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + r + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return r;
}
function Cw(n, r, a) {
  const u = (Kg(a) + (a.options.ruleSpaces ? " " : "")).repeat(Aw(a));
  return a.options.ruleSpaces ? u.slice(0, -1) : u;
}
const Jg = {
  blockquote: $k,
  break: qp,
  code: lw,
  definition: aw,
  emphasis: Hg,
  hardBreak: qp,
  heading: sw,
  html: qg,
  image: Yg,
  imageReference: Gg,
  inlineCode: Vg,
  link: Qg,
  linkReference: Zg,
  list: bw,
  listItem: vw,
  paragraph: Sw,
  root: ww,
  strong: Fg,
  text: Tw,
  thematicBreak: Cw
};
function _w() {
  return {
    enter: {
      table: Ow,
      tableData: Yp,
      tableHeader: Yp,
      tableRow: Mw
    },
    exit: {
      codeText: Nw,
      table: Dw,
      tableData: oc,
      tableHeader: oc,
      tableRow: oc
    }
  };
}
function Ow(n) {
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
function Dw(n) {
  this.exit(n), this.data.inTable = void 0;
}
function Mw(n) {
  this.enter({ type: "tableRow", children: [] }, n);
}
function oc(n) {
  this.exit(n);
}
function Yp(n) {
  this.enter({ type: "tableCell", children: [] }, n);
}
function Nw(n) {
  let r = this.resume();
  this.data.inTable && (r = r.replace(/\\([\\|])/g, Rw));
  const a = this.stack[this.stack.length - 1];
  a.type, a.value = r, this.exit(n);
}
function Rw(n, r) {
  return r === "|" ? r : n;
}
function jw(n) {
  const r = n || {}, a = r.tableCellPadding, u = r.tablePipeAlign, c = r.stringLength, d = a ? " " : "|";
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
      table: f,
      tableCell: p,
      tableRow: m
    }
  };
  function f(v, T, L, j) {
    return h(b(v, L, j), v.align);
  }
  function m(v, T, L, j) {
    const O = y(v, L, j), Z = h([O]);
    return Z.slice(0, Z.indexOf(`
`));
  }
  function p(v, T, L, j) {
    const O = L.enter("tableCell"), Z = L.enter("phrasing"), G = L.containerPhrasing(v, {
      ...j,
      before: d,
      after: d
    });
    return Z(), O(), G;
  }
  function h(v, T) {
    return Jk(v, {
      align: T,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: u,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: a,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: c
    });
  }
  function b(v, T, L) {
    const j = v.children;
    let O = -1;
    const Z = [], G = T.enter("table");
    for (; ++O < j.length; )
      Z[O] = y(j[O], T, L);
    return G(), Z;
  }
  function y(v, T, L) {
    const j = v.children;
    let O = -1;
    const Z = [], G = T.enter("tableRow");
    for (; ++O < j.length; )
      Z[O] = p(j[O], v, T, L);
    return G(), Z;
  }
  function S(v, T, L) {
    let j = Jg.inlineCode(v, T, L);
    return L.stack.includes("tableCell") && (j = j.replace(/\|/g, "\\$&")), j;
  }
}
function Lw() {
  return {
    exit: {
      taskListCheckValueChecked: Gp,
      taskListCheckValueUnchecked: Gp,
      paragraph: Bw
    }
  };
}
function Uw() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Hw }
  };
}
function Gp(n) {
  const r = this.stack[this.stack.length - 2];
  r.type, r.checked = n.type === "taskListCheckValueChecked";
}
function Bw(n) {
  const r = this.stack[this.stack.length - 2];
  if (r && r.type === "listItem" && typeof r.checked == "boolean") {
    const a = this.stack[this.stack.length - 1];
    a.type;
    const u = a.children[0];
    if (u && u.type === "text") {
      const c = r.children;
      let d = -1, f;
      for (; ++d < c.length; ) {
        const m = c[d];
        if (m.type === "paragraph") {
          f = m;
          break;
        }
      }
      f === a && (u.value = u.value.slice(1), u.value.length === 0 ? a.children.shift() : a.position && u.position && typeof u.position.start.offset == "number" && (u.position.start.column++, u.position.start.offset++, a.position.start = Object.assign({}, u.position.start)));
    }
  }
  this.exit(n);
}
function Hw(n, r, a, u) {
  const c = n.children[0], d = typeof n.checked == "boolean" && c && c.type === "paragraph", f = "[" + (n.checked ? "x" : " ") + "] ", m = a.createTracker(u);
  d && m.move(f);
  let p = Jg.listItem(n, r, a, {
    ...u,
    ...m.current()
  });
  return d && (p = p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, h)), p;
  function h(b) {
    return b + f;
  }
}
function qw() {
  return [
    bk(),
    Hk(),
    Vk(),
    _w(),
    Lw()
  ];
}
function Yw(n) {
  return {
    extensions: [
      xk(),
      qk(n),
      Xk(),
      jw(n),
      Uw()
    ]
  };
}
const Gw = {
  tokenize: Fw,
  partial: !0
}, Ig = {
  tokenize: Jw,
  partial: !0
}, $g = {
  tokenize: Iw,
  partial: !0
}, Wg = {
  tokenize: $w,
  partial: !0
}, Vw = {
  tokenize: Ww,
  partial: !0
}, Pg = {
  name: "wwwAutolink",
  tokenize: Zw,
  previous: ty
}, ey = {
  name: "protocolAutolink",
  tokenize: Kw,
  previous: ny
}, Bn = {
  name: "emailAutolink",
  tokenize: Qw,
  previous: ly
}, yn = {};
function Xw() {
  return {
    text: yn
  };
}
let Rl = 48;
for (; Rl < 123; )
  yn[Rl] = Bn, Rl++, Rl === 58 ? Rl = 65 : Rl === 91 && (Rl = 97);
yn[43] = Bn;
yn[45] = Bn;
yn[46] = Bn;
yn[95] = Bn;
yn[72] = [Bn, ey];
yn[104] = [Bn, ey];
yn[87] = [Bn, Pg];
yn[119] = [Bn, Pg];
function Qw(n, r, a) {
  const u = this;
  let c, d;
  return f;
  function f(y) {
    return !kc(y) || !ly.call(u, u.previous) || Vc(u.events) ? a(y) : (n.enter("literalAutolink"), n.enter("literalAutolinkEmail"), m(y));
  }
  function m(y) {
    return kc(y) ? (n.consume(y), m) : y === 64 ? (n.consume(y), p) : a(y);
  }
  function p(y) {
    return y === 46 ? n.check(Vw, b, h)(y) : y === 45 || y === 95 || bt(y) ? (d = !0, n.consume(y), p) : b(y);
  }
  function h(y) {
    return n.consume(y), c = !0, p;
  }
  function b(y) {
    return d && c && Et(u.previous) ? (n.exit("literalAutolinkEmail"), n.exit("literalAutolink"), r(y)) : a(y);
  }
}
function Zw(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return f !== 87 && f !== 119 || !ty.call(u, u.previous) || Vc(u.events) ? a(f) : (n.enter("literalAutolink"), n.enter("literalAutolinkWww"), n.check(Gw, n.attempt(Ig, n.attempt($g, d), a), a)(f));
  }
  function d(f) {
    return n.exit("literalAutolinkWww"), n.exit("literalAutolink"), r(f);
  }
}
function Kw(n, r, a) {
  const u = this;
  let c = "", d = !1;
  return f;
  function f(y) {
    return (y === 72 || y === 104) && ny.call(u, u.previous) && !Vc(u.events) ? (n.enter("literalAutolink"), n.enter("literalAutolinkHttp"), c += String.fromCodePoint(y), n.consume(y), m) : a(y);
  }
  function m(y) {
    if (Et(y) && c.length < 5)
      return c += String.fromCodePoint(y), n.consume(y), m;
    if (y === 58) {
      const S = c.toLowerCase();
      if (S === "http" || S === "https")
        return n.consume(y), p;
    }
    return a(y);
  }
  function p(y) {
    return y === 47 ? (n.consume(y), d ? h : (d = !0, p)) : a(y);
  }
  function h(y) {
    return y === null || mu(y) || Ke(y) || Bl(y) || xu(y) ? a(y) : n.attempt(Ig, n.attempt($g, b), a)(y);
  }
  function b(y) {
    return n.exit("literalAutolinkHttp"), n.exit("literalAutolink"), r(y);
  }
}
function Fw(n, r, a) {
  let u = 0;
  return c;
  function c(f) {
    return (f === 87 || f === 119) && u < 3 ? (u++, n.consume(f), c) : f === 46 && u === 3 ? (n.consume(f), d) : a(f);
  }
  function d(f) {
    return f === null ? a(f) : r(f);
  }
}
function Jw(n, r, a) {
  let u, c, d;
  return f;
  function f(h) {
    return h === 46 || h === 95 ? n.check(Wg, p, m)(h) : h === null || Ke(h) || Bl(h) || h !== 45 && xu(h) ? p(h) : (d = !0, n.consume(h), f);
  }
  function m(h) {
    return h === 95 ? u = !0 : (c = u, u = void 0), n.consume(h), f;
  }
  function p(h) {
    return c || u || !d ? a(h) : r(h);
  }
}
function Iw(n, r) {
  let a = 0, u = 0;
  return c;
  function c(f) {
    return f === 40 ? (a++, n.consume(f), c) : f === 41 && u < a ? d(f) : f === 33 || f === 34 || f === 38 || f === 39 || f === 41 || f === 42 || f === 44 || f === 46 || f === 58 || f === 59 || f === 60 || f === 63 || f === 93 || f === 95 || f === 126 ? n.check(Wg, r, d)(f) : f === null || Ke(f) || Bl(f) ? r(f) : (n.consume(f), c);
  }
  function d(f) {
    return f === 41 && u++, n.consume(f), c;
  }
}
function $w(n, r, a) {
  return u;
  function u(m) {
    return m === 33 || m === 34 || m === 39 || m === 41 || m === 42 || m === 44 || m === 46 || m === 58 || m === 59 || m === 63 || m === 95 || m === 126 ? (n.consume(m), u) : m === 38 ? (n.consume(m), d) : m === 93 ? (n.consume(m), c) : (
      // `<` is an end.
      m === 60 || // So is whitespace.
      m === null || Ke(m) || Bl(m) ? r(m) : a(m)
    );
  }
  function c(m) {
    return m === null || m === 40 || m === 91 || Ke(m) || Bl(m) ? r(m) : u(m);
  }
  function d(m) {
    return Et(m) ? f(m) : a(m);
  }
  function f(m) {
    return m === 59 ? (n.consume(m), u) : Et(m) ? (n.consume(m), f) : a(m);
  }
}
function Ww(n, r, a) {
  return u;
  function u(d) {
    return n.consume(d), c;
  }
  function c(d) {
    return bt(d) ? a(d) : r(d);
  }
}
function ty(n) {
  return n === null || n === 40 || n === 42 || n === 95 || n === 91 || n === 93 || n === 126 || Ke(n);
}
function ny(n) {
  return !Et(n);
}
function ly(n) {
  return !(n === 47 || kc(n));
}
function kc(n) {
  return n === 43 || n === 45 || n === 46 || n === 95 || bt(n);
}
function Vc(n) {
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
const Pw = {
  tokenize: u2,
  partial: !0
};
function e2() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: i2,
        continuation: {
          tokenize: a2
        },
        exit: r2
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: l2
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: t2,
        resolveTo: n2
      }
    }
  };
}
function t2(n, r, a) {
  const u = this;
  let c = u.events.length;
  const d = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let f;
  for (; c--; ) {
    const p = u.events[c][1];
    if (p.type === "labelImage") {
      f = p;
      break;
    }
    if (p.type === "gfmFootnoteCall" || p.type === "labelLink" || p.type === "label" || p.type === "image" || p.type === "link")
      break;
  }
  return m;
  function m(p) {
    if (!f || !f._balanced)
      return a(p);
    const h = sn(u.sliceSerialize({
      start: f.end,
      end: u.now()
    }));
    return h.codePointAt(0) !== 94 || !d.includes(h.slice(1)) ? a(p) : (n.enter("gfmFootnoteCallLabelMarker"), n.consume(p), n.exit("gfmFootnoteCallLabelMarker"), r(p));
  }
}
function n2(n, r) {
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
  }, c = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, n[a + 3][1].end),
    end: Object.assign({}, n[a + 3][1].end)
  };
  c.end.column++, c.end.offset++, c.end._bufferIndex++;
  const d = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, c.end),
    end: Object.assign({}, n[n.length - 1][1].start)
  }, f = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, d.start),
    end: Object.assign({}, d.end)
  }, m = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    n[a + 1],
    n[a + 2],
    ["enter", u, r],
    // The `[`
    n[a + 3],
    n[a + 4],
    // The `^`.
    ["enter", c, r],
    ["exit", c, r],
    // Everything in between.
    ["enter", d, r],
    ["enter", f, r],
    ["exit", f, r],
    ["exit", d, r],
    // The ending (`]`, properly parsed and labelled).
    n[n.length - 2],
    n[n.length - 1],
    ["exit", u, r]
  ];
  return n.splice(a, n.length - a + 1, ...m), n;
}
function l2(n, r, a) {
  const u = this, c = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let d = 0, f;
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
      d > 999 || // Closing brace with nothing.
      y === 93 && !f || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      y === null || y === 91 || Ke(y)
    )
      return a(y);
    if (y === 93) {
      n.exit("chunkString");
      const S = n.exit("gfmFootnoteCallString");
      return c.includes(sn(u.sliceSerialize(S))) ? (n.enter("gfmFootnoteCallLabelMarker"), n.consume(y), n.exit("gfmFootnoteCallLabelMarker"), n.exit("gfmFootnoteCall"), r) : a(y);
    }
    return Ke(y) || (f = !0), d++, n.consume(y), y === 92 ? b : h;
  }
  function b(y) {
    return y === 91 || y === 92 || y === 93 ? (n.consume(y), d++, h) : h(y);
  }
}
function i2(n, r, a) {
  const u = this, c = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let d, f = 0, m;
  return p;
  function p(T) {
    return n.enter("gfmFootnoteDefinition")._container = !0, n.enter("gfmFootnoteDefinitionLabel"), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(T), n.exit("gfmFootnoteDefinitionLabelMarker"), h;
  }
  function h(T) {
    return T === 94 ? (n.enter("gfmFootnoteDefinitionMarker"), n.consume(T), n.exit("gfmFootnoteDefinitionMarker"), n.enter("gfmFootnoteDefinitionLabelString"), n.enter("chunkString").contentType = "string", b) : a(T);
  }
  function b(T) {
    if (
      // Too long.
      f > 999 || // Closing brace with nothing.
      T === 93 && !m || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      T === null || T === 91 || Ke(T)
    )
      return a(T);
    if (T === 93) {
      n.exit("chunkString");
      const L = n.exit("gfmFootnoteDefinitionLabelString");
      return d = sn(u.sliceSerialize(L)), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(T), n.exit("gfmFootnoteDefinitionLabelMarker"), n.exit("gfmFootnoteDefinitionLabel"), S;
    }
    return Ke(T) || (m = !0), f++, n.consume(T), T === 92 ? y : b;
  }
  function y(T) {
    return T === 91 || T === 92 || T === 93 ? (n.consume(T), f++, b) : b(T);
  }
  function S(T) {
    return T === 58 ? (n.enter("definitionMarker"), n.consume(T), n.exit("definitionMarker"), c.includes(d) || c.push(d), Ne(n, v, "gfmFootnoteDefinitionWhitespace")) : a(T);
  }
  function v(T) {
    return r(T);
  }
}
function a2(n, r, a) {
  return n.check(qa, r, n.attempt(Pw, r, a));
}
function r2(n) {
  n.exit("gfmFootnoteDefinition");
}
function u2(n, r, a) {
  const u = this;
  return Ne(n, c, "gfmFootnoteDefinitionIndent", 5);
  function c(d) {
    const f = u.events[u.events.length - 1];
    return f && f[1].type === "gfmFootnoteDefinitionIndent" && f[2].sliceSerialize(f[1], !0).length === 4 ? r(d) : a(d);
  }
}
function o2(n) {
  let a = (n || {}).singleTilde;
  const u = {
    name: "strikethrough",
    tokenize: d,
    resolveAll: c
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
  function c(f, m) {
    let p = -1;
    for (; ++p < f.length; )
      if (f[p][0] === "enter" && f[p][1].type === "strikethroughSequenceTemporary" && f[p][1]._close) {
        let h = p;
        for (; h--; )
          if (f[h][0] === "exit" && f[h][1].type === "strikethroughSequenceTemporary" && f[h][1]._open && // If the sizes are the same:
          f[p][1].end.offset - f[p][1].start.offset === f[h][1].end.offset - f[h][1].start.offset) {
            f[p][1].type = "strikethroughSequence", f[h][1].type = "strikethroughSequence";
            const b = {
              type: "strikethrough",
              start: Object.assign({}, f[h][1].start),
              end: Object.assign({}, f[p][1].end)
            }, y = {
              type: "strikethroughText",
              start: Object.assign({}, f[h][1].end),
              end: Object.assign({}, f[p][1].start)
            }, S = [["enter", b, m], ["enter", f[h][1], m], ["exit", f[h][1], m], ["enter", y, m]], v = m.parser.constructs.insideSpan.null;
            v && Zt(S, S.length, 0, vu(v, f.slice(h + 1, p), m)), Zt(S, S.length, 0, [["exit", y, m], ["enter", f[p][1], m], ["exit", f[p][1], m], ["exit", b, m]]), Zt(f, h - 1, p - h + 3, S), p = h + S.length - 2;
            break;
          }
      }
    for (p = -1; ++p < f.length; )
      f[p][1].type === "strikethroughSequenceTemporary" && (f[p][1].type = "data");
    return f;
  }
  function d(f, m, p) {
    const h = this.previous, b = this.events;
    let y = 0;
    return S;
    function S(T) {
      return h === 126 && b[b.length - 1][1].type !== "characterEscape" ? p(T) : (f.enter("strikethroughSequenceTemporary"), v(T));
    }
    function v(T) {
      const L = Di(h);
      if (T === 126)
        return y > 1 ? p(T) : (f.consume(T), y++, v);
      if (y < 2 && !a) return p(T);
      const j = f.exit("strikethroughSequenceTemporary"), O = Di(T);
      return j._open = !O || O === 2 && !!L, j._close = !L || L === 2 && !!O, m(T);
    }
  }
}
class s2 {
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
    c2(this, r, a, u);
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
    if (this.map.sort(function(d, f) {
      return d[0] - f[0];
    }), this.map.length === 0)
      return;
    let a = this.map.length;
    const u = [];
    for (; a > 0; )
      a -= 1, u.push(r.slice(this.map[a][0] + this.map[a][1]), this.map[a][2]), r.length = this.map[a][0];
    u.push(r.slice()), r.length = 0;
    let c = u.pop();
    for (; c; ) {
      for (const d of c)
        r.push(d);
      c = u.pop();
    }
    this.map.length = 0;
  }
}
function c2(n, r, a, u) {
  let c = 0;
  if (!(a === 0 && u.length === 0)) {
    for (; c < n.map.length; ) {
      if (n.map[c][0] === r) {
        n.map[c][1] += a, n.map[c][2].push(...u);
        return;
      }
      c += 1;
    }
    n.map.push([r, a, u]);
  }
}
function f2(n, r) {
  let a = !1;
  const u = [];
  for (; r < n.length; ) {
    const c = n[r];
    if (a) {
      if (c[0] === "enter")
        c[1].type === "tableContent" && u.push(n[r + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (c[1].type === "tableContent") {
        if (n[r - 1][1].type === "tableDelimiterMarker") {
          const d = u.length - 1;
          u[d] = u[d] === "left" ? "center" : "right";
        }
      } else if (c[1].type === "tableDelimiterRow")
        break;
    } else c[0] === "enter" && c[1].type === "tableDelimiterRow" && (a = !0);
    r += 1;
  }
  return u;
}
function d2() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: h2,
        resolveAll: m2
      }
    }
  };
}
function h2(n, r, a) {
  const u = this;
  let c = 0, d = 0, f;
  return m;
  function m(U) {
    let te = u.events.length - 1;
    for (; te > -1; ) {
      const ue = u.events[te][1].type;
      if (ue === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      ue === "linePrefix") te--;
      else break;
    }
    const ee = te > -1 ? u.events[te][1].type : null, Ee = ee === "tableHead" || ee === "tableRow" ? H : p;
    return Ee === H && u.parser.lazy[u.now().line] ? a(U) : Ee(U);
  }
  function p(U) {
    return n.enter("tableHead"), n.enter("tableRow"), h(U);
  }
  function h(U) {
    return U === 124 || (f = !0, d += 1), b(U);
  }
  function b(U) {
    return U === null ? a(U) : me(U) ? d > 1 ? (d = 0, u.interrupt = !0, n.exit("tableRow"), n.enter("lineEnding"), n.consume(U), n.exit("lineEnding"), v) : a(U) : _e(U) ? Ne(n, b, "whitespace")(U) : (d += 1, f && (f = !1, c += 1), U === 124 ? (n.enter("tableCellDivider"), n.consume(U), n.exit("tableCellDivider"), f = !0, b) : (n.enter("data"), y(U)));
  }
  function y(U) {
    return U === null || U === 124 || Ke(U) ? (n.exit("data"), b(U)) : (n.consume(U), U === 92 ? S : y);
  }
  function S(U) {
    return U === 92 || U === 124 ? (n.consume(U), y) : y(U);
  }
  function v(U) {
    return u.interrupt = !1, u.parser.lazy[u.now().line] ? a(U) : (n.enter("tableDelimiterRow"), f = !1, _e(U) ? Ne(n, T, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(U) : T(U));
  }
  function T(U) {
    return U === 45 || U === 58 ? j(U) : U === 124 ? (f = !0, n.enter("tableCellDivider"), n.consume(U), n.exit("tableCellDivider"), L) : fe(U);
  }
  function L(U) {
    return _e(U) ? Ne(n, j, "whitespace")(U) : j(U);
  }
  function j(U) {
    return U === 58 ? (d += 1, f = !0, n.enter("tableDelimiterMarker"), n.consume(U), n.exit("tableDelimiterMarker"), O) : U === 45 ? (d += 1, O(U)) : U === null || me(U) ? le(U) : fe(U);
  }
  function O(U) {
    return U === 45 ? (n.enter("tableDelimiterFiller"), Z(U)) : fe(U);
  }
  function Z(U) {
    return U === 45 ? (n.consume(U), Z) : U === 58 ? (f = !0, n.exit("tableDelimiterFiller"), n.enter("tableDelimiterMarker"), n.consume(U), n.exit("tableDelimiterMarker"), G) : (n.exit("tableDelimiterFiller"), G(U));
  }
  function G(U) {
    return _e(U) ? Ne(n, le, "whitespace")(U) : le(U);
  }
  function le(U) {
    return U === 124 ? T(U) : U === null || me(U) ? !f || c !== d ? fe(U) : (n.exit("tableDelimiterRow"), n.exit("tableHead"), r(U)) : fe(U);
  }
  function fe(U) {
    return a(U);
  }
  function H(U) {
    return n.enter("tableRow"), $(U);
  }
  function $(U) {
    return U === 124 ? (n.enter("tableCellDivider"), n.consume(U), n.exit("tableCellDivider"), $) : U === null || me(U) ? (n.exit("tableRow"), r(U)) : _e(U) ? Ne(n, $, "whitespace")(U) : (n.enter("data"), K(U));
  }
  function K(U) {
    return U === null || U === 124 || Ke(U) ? (n.exit("data"), $(U)) : (n.consume(U), U === 92 ? de : K);
  }
  function de(U) {
    return U === 92 || U === 124 ? (n.consume(U), K) : K(U);
  }
}
function m2(n, r) {
  let a = -1, u = !0, c = 0, d = [0, 0, 0, 0], f = [0, 0, 0, 0], m = !1, p = 0, h, b, y;
  const S = new s2();
  for (; ++a < n.length; ) {
    const v = n[a], T = v[1];
    v[0] === "enter" ? T.type === "tableHead" ? (m = !1, p !== 0 && (Vp(S, r, p, h, b), b = void 0, p = 0), h = {
      type: "table",
      start: Object.assign({}, T.start),
      // Note: correct end is set later.
      end: Object.assign({}, T.end)
    }, S.add(a, 0, [["enter", h, r]])) : T.type === "tableRow" || T.type === "tableDelimiterRow" ? (u = !0, y = void 0, d = [0, 0, 0, 0], f = [0, a + 1, 0, 0], m && (m = !1, b = {
      type: "tableBody",
      start: Object.assign({}, T.start),
      // Note: correct end is set later.
      end: Object.assign({}, T.end)
    }, S.add(a, 0, [["enter", b, r]])), c = T.type === "tableDelimiterRow" ? 2 : b ? 3 : 1) : c && (T.type === "data" || T.type === "tableDelimiterMarker" || T.type === "tableDelimiterFiller") ? (u = !1, f[2] === 0 && (d[1] !== 0 && (f[0] = f[1], y = su(S, r, d, c, void 0, y), d = [0, 0, 0, 0]), f[2] = a)) : T.type === "tableCellDivider" && (u ? u = !1 : (d[1] !== 0 && (f[0] = f[1], y = su(S, r, d, c, void 0, y)), d = f, f = [d[1], a, 0, 0])) : T.type === "tableHead" ? (m = !0, p = a) : T.type === "tableRow" || T.type === "tableDelimiterRow" ? (p = a, d[1] !== 0 ? (f[0] = f[1], y = su(S, r, d, c, a, y)) : f[1] !== 0 && (y = su(S, r, f, c, a, y)), c = 0) : c && (T.type === "data" || T.type === "tableDelimiterMarker" || T.type === "tableDelimiterFiller") && (f[3] = a);
  }
  for (p !== 0 && Vp(S, r, p, h, b), S.consume(r.events), a = -1; ++a < r.events.length; ) {
    const v = r.events[a];
    v[0] === "enter" && v[1].type === "table" && (v[1]._align = f2(r.events, a));
  }
  return n;
}
function su(n, r, a, u, c, d) {
  const f = u === 1 ? "tableHeader" : u === 2 ? "tableDelimiter" : "tableData", m = "tableContent";
  a[0] !== 0 && (d.end = Object.assign({}, Oi(r.events, a[0])), n.add(a[0], 0, [["exit", d, r]]));
  const p = Oi(r.events, a[1]);
  if (d = {
    type: f,
    start: Object.assign({}, p),
    // Note: correct end is set later.
    end: Object.assign({}, p)
  }, n.add(a[1], 0, [["enter", d, r]]), a[2] !== 0) {
    const h = Oi(r.events, a[2]), b = Oi(r.events, a[3]), y = {
      type: m,
      start: Object.assign({}, h),
      end: Object.assign({}, b)
    };
    if (n.add(a[2], 0, [["enter", y, r]]), u !== 2) {
      const S = r.events[a[2]], v = r.events[a[3]];
      if (S[1].end = Object.assign({}, v[1].end), S[1].type = "chunkText", S[1].contentType = "text", a[3] > a[2] + 1) {
        const T = a[2] + 1, L = a[3] - a[2] - 1;
        n.add(T, L, []);
      }
    }
    n.add(a[3] + 1, 0, [["exit", y, r]]);
  }
  return c !== void 0 && (d.end = Object.assign({}, Oi(r.events, c)), n.add(c, 0, [["exit", d, r]]), d = void 0), d;
}
function Vp(n, r, a, u, c) {
  const d = [], f = Oi(r.events, a);
  c && (c.end = Object.assign({}, f), d.push(["exit", c, r])), u.end = Object.assign({}, f), d.push(["exit", u, r]), n.add(a + 1, 0, d);
}
function Oi(n, r) {
  const a = n[r], u = a[0] === "enter" ? "start" : "end";
  return a[1][u];
}
const p2 = {
  name: "tasklistCheck",
  tokenize: y2
};
function g2() {
  return {
    text: {
      91: p2
    }
  };
}
function y2(n, r, a) {
  const u = this;
  return c;
  function c(p) {
    return (
      // Exit if there’s stuff before.
      u.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !u._gfmTasklistFirstContentOfListItem ? a(p) : (n.enter("taskListCheck"), n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), d)
    );
  }
  function d(p) {
    return Ke(p) ? (n.enter("taskListCheckValueUnchecked"), n.consume(p), n.exit("taskListCheckValueUnchecked"), f) : p === 88 || p === 120 ? (n.enter("taskListCheckValueChecked"), n.consume(p), n.exit("taskListCheckValueChecked"), f) : a(p);
  }
  function f(p) {
    return p === 93 ? (n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), n.exit("taskListCheck"), m) : a(p);
  }
  function m(p) {
    return me(p) ? r(p) : _e(p) ? n.check({
      tokenize: b2
    }, r, a)(p) : a(p);
  }
}
function b2(n, r, a) {
  return Ne(n, u, "whitespace");
  function u(c) {
    return c === null ? a(c) : r(c);
  }
}
function x2(n) {
  return hg([
    Xw(),
    e2(),
    o2(n),
    d2(),
    g2()
  ]);
}
const v2 = {};
function S2(n) {
  const r = (
    /** @type {Processor<Root>} */
    this
  ), a = n || v2, u = r.data(), c = u.micromarkExtensions || (u.micromarkExtensions = []), d = u.fromMarkdownExtensions || (u.fromMarkdownExtensions = []), f = u.toMarkdownExtensions || (u.toMarkdownExtensions = []);
  c.push(x2(a)), d.push(qw()), f.push(Yw(a));
}
function iy(n) {
  var r, a, u = "";
  if (typeof n == "string" || typeof n == "number") u += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (r = 0; r < c; r++) n[r] && (a = iy(n[r])) && (u && (u += " "), u += a);
  } else for (a in n) n[a] && (u && (u += " "), u += a);
  return u;
}
function k2() {
  for (var n, r, a = 0, u = "", c = arguments.length; a < c; a++) (n = arguments[a]) && (r = iy(n)) && (u && (u += " "), u += r);
  return u;
}
const w2 = (n, r) => {
  const a = new Array(n.length + r.length);
  for (let u = 0; u < n.length; u++)
    a[u] = n[u];
  for (let u = 0; u < r.length; u++)
    a[n.length + u] = r[u];
  return a;
}, E2 = (n, r) => ({
  classGroupId: n,
  validator: r
}), ay = (n = /* @__PURE__ */ new Map(), r = null, a) => ({
  nextPart: n,
  validators: r,
  classGroupId: a
}), bu = "-", Xp = [], z2 = "arbitrary..", T2 = (n) => {
  const r = C2(n), {
    conflictingClassGroups: a,
    conflictingClassGroupModifiers: u
  } = n;
  return {
    getClassGroupId: (f) => {
      if (f.startsWith("[") && f.endsWith("]"))
        return A2(f);
      const m = f.split(bu), p = m[0] === "" && m.length > 1 ? 1 : 0;
      return ry(m, p, r);
    },
    getConflictingClassGroupIds: (f, m) => {
      if (m) {
        const p = u[f], h = a[f];
        return p ? h ? w2(h, p) : p : h || Xp;
      }
      return a[f] || Xp;
    }
  };
}, ry = (n, r, a) => {
  if (n.length - r === 0)
    return a.classGroupId;
  const c = n[r], d = a.nextPart.get(c);
  if (d) {
    const h = ry(n, r + 1, d);
    if (h) return h;
  }
  const f = a.validators;
  if (f === null)
    return;
  const m = r === 0 ? n.join(bu) : n.slice(r).join(bu), p = f.length;
  for (let h = 0; h < p; h++) {
    const b = f[h];
    if (b.validator(m))
      return b.classGroupId;
  }
}, A2 = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = n.slice(1, -1), a = r.indexOf(":"), u = r.slice(0, a);
  return u ? z2 + u : void 0;
})(), C2 = (n) => {
  const {
    theme: r,
    classGroups: a
  } = n;
  return _2(a, r);
}, _2 = (n, r) => {
  const a = ay();
  for (const u in n) {
    const c = n[u];
    Xc(c, a, u, r);
  }
  return a;
}, Xc = (n, r, a, u) => {
  const c = n.length;
  for (let d = 0; d < c; d++) {
    const f = n[d];
    O2(f, r, a, u);
  }
}, O2 = (n, r, a, u) => {
  if (typeof n == "string") {
    D2(n, r, a);
    return;
  }
  if (typeof n == "function") {
    M2(n, r, a, u);
    return;
  }
  N2(n, r, a, u);
}, D2 = (n, r, a) => {
  const u = n === "" ? r : uy(r, n);
  u.classGroupId = a;
}, M2 = (n, r, a, u) => {
  if (R2(n)) {
    Xc(n(u), r, a, u);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(E2(a, n));
}, N2 = (n, r, a, u) => {
  const c = Object.entries(n), d = c.length;
  for (let f = 0; f < d; f++) {
    const [m, p] = c[f];
    Xc(p, uy(r, m), a, u);
  }
}, uy = (n, r) => {
  let a = n;
  const u = r.split(bu), c = u.length;
  for (let d = 0; d < c; d++) {
    const f = u[d];
    let m = a.nextPart.get(f);
    m || (m = ay(), a.nextPart.set(f, m)), a = m;
  }
  return a;
}, R2 = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, j2 = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, a = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
  const c = (d, f) => {
    a[d] = f, r++, r > n && (r = 0, u = a, a = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(d) {
      let f = a[d];
      if (f !== void 0)
        return f;
      if ((f = u[d]) !== void 0)
        return c(d, f), f;
    },
    set(d, f) {
      d in a ? a[d] = f : c(d, f);
    }
  };
}, wc = "!", Qp = ":", L2 = [], Zp = (n, r, a, u, c) => ({
  modifiers: n,
  hasImportantModifier: r,
  baseClassName: a,
  maybePostfixModifierPosition: u,
  isExternal: c
}), U2 = (n) => {
  const {
    prefix: r,
    experimentalParseClassName: a
  } = n;
  let u = (c) => {
    const d = [];
    let f = 0, m = 0, p = 0, h;
    const b = c.length;
    for (let L = 0; L < b; L++) {
      const j = c[L];
      if (f === 0 && m === 0) {
        if (j === Qp) {
          d.push(c.slice(p, L)), p = L + 1;
          continue;
        }
        if (j === "/") {
          h = L;
          continue;
        }
      }
      j === "[" ? f++ : j === "]" ? f-- : j === "(" ? m++ : j === ")" && m--;
    }
    const y = d.length === 0 ? c : c.slice(p);
    let S = y, v = !1;
    y.endsWith(wc) ? (S = y.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      y.startsWith(wc) && (S = y.slice(1), v = !0)
    );
    const T = h && h > p ? h - p : void 0;
    return Zp(d, v, S, T);
  };
  if (r) {
    const c = r + Qp, d = u;
    u = (f) => f.startsWith(c) ? d(f.slice(c.length)) : Zp(L2, !1, f, void 0, !0);
  }
  if (a) {
    const c = u;
    u = (d) => a({
      className: d,
      parseClassName: c
    });
  }
  return u;
}, B2 = (n) => {
  const r = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((a, u) => {
    r.set(a, 1e6 + u);
  }), (a) => {
    const u = [];
    let c = [];
    for (let d = 0; d < a.length; d++) {
      const f = a[d], m = f[0] === "[", p = r.has(f);
      m || p ? (c.length > 0 && (c.sort(), u.push(...c), c = []), u.push(f)) : c.push(f);
    }
    return c.length > 0 && (c.sort(), u.push(...c)), u;
  };
}, H2 = (n) => ({
  cache: j2(n.cacheSize),
  parseClassName: U2(n),
  sortModifiers: B2(n),
  postfixLookupClassGroupIds: q2(n),
  ...T2(n)
}), q2 = (n) => {
  const r = /* @__PURE__ */ Object.create(null), a = n.postfixLookupClassGroups;
  if (a)
    for (let u = 0; u < a.length; u++)
      r[a[u]] = !0;
  return r;
}, Y2 = /\s+/, G2 = (n, r) => {
  const {
    parseClassName: a,
    getClassGroupId: u,
    getConflictingClassGroupIds: c,
    sortModifiers: d,
    postfixLookupClassGroupIds: f
  } = r, m = [], p = n.trim().split(Y2);
  let h = "";
  for (let b = p.length - 1; b >= 0; b -= 1) {
    const y = p[b], {
      isExternal: S,
      modifiers: v,
      hasImportantModifier: T,
      baseClassName: L,
      maybePostfixModifierPosition: j
    } = a(y);
    if (S) {
      h = y + (h.length > 0 ? " " + h : h);
      continue;
    }
    let O = !!j, Z;
    if (O) {
      const $ = L.substring(0, j);
      Z = u($);
      const K = Z && f[Z] ? u(L) : void 0;
      K && K !== Z && (Z = K, O = !1);
    } else
      Z = u(L);
    if (!Z) {
      if (!O) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (Z = u(L), !Z) {
        h = y + (h.length > 0 ? " " + h : h);
        continue;
      }
      O = !1;
    }
    const G = v.length === 0 ? "" : v.length === 1 ? v[0] : d(v).join(":"), le = T ? G + wc : G, fe = le + Z;
    if (m.indexOf(fe) > -1)
      continue;
    m.push(fe);
    const H = c(Z, O);
    for (let $ = 0; $ < H.length; ++$) {
      const K = H[$];
      m.push(le + K);
    }
    h = y + (h.length > 0 ? " " + h : h);
  }
  return h;
}, V2 = (...n) => {
  let r = 0, a, u, c = "";
  for (; r < n.length; )
    (a = n[r++]) && (u = oy(a)) && (c && (c += " "), c += u);
  return c;
}, oy = (n) => {
  if (typeof n == "string")
    return n;
  let r, a = "";
  for (let u = 0; u < n.length; u++)
    n[u] && (r = oy(n[u])) && (a && (a += " "), a += r);
  return a;
}, X2 = (n, ...r) => {
  let a, u, c, d;
  const f = (p) => {
    const h = r.reduce((b, y) => y(b), n());
    return a = H2(h), u = a.cache.get, c = a.cache.set, d = m, m(p);
  }, m = (p) => {
    const h = u(p);
    if (h)
      return h;
    const b = G2(p, a);
    return c(p, b), b;
  };
  return d = f, (...p) => d(V2(...p));
}, Q2 = [], ot = (n) => {
  const r = (a) => a[n] || Q2;
  return r.isThemeGetter = !0, r;
}, sy = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, cy = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Z2 = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, K2 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, F2 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, J2 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, I2 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, $2 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, dl = (n) => Z2.test(n), ze = (n) => !!n && !Number.isNaN(Number(n)), pn = (n) => !!n && Number.isInteger(Number(n)), sc = (n) => n.endsWith("%") && ze(n.slice(0, -1)), Un = (n) => K2.test(n), fy = () => !0, W2 = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  F2.test(n) && !J2.test(n)
), Qc = () => !1, P2 = (n) => I2.test(n), eE = (n) => $2.test(n), tE = (n) => !ie(n) && !re(n), nE = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), lE = (n) => ml(n, my, Qc), ie = (n) => sy.test(n), jl = (n) => ml(n, py, W2), Kp = (n) => ml(n, fE, ze), iE = (n) => ml(n, yy, fy), aE = (n) => ml(n, gy, Qc), Fp = (n) => ml(n, dy, Qc), rE = (n) => ml(n, hy, eE), cu = (n) => ml(n, by, P2), re = (n) => cy.test(n), Ma = (n) => ql(n, py), uE = (n) => ql(n, gy), Jp = (n) => ql(n, dy), oE = (n) => ql(n, my), sE = (n) => ql(n, hy), fu = (n) => ql(n, by, !0), cE = (n) => ql(n, yy, !0), ml = (n, r, a) => {
  const u = sy.exec(n);
  return u ? u[1] ? r(u[1]) : a(u[2]) : !1;
}, ql = (n, r, a = !1) => {
  const u = cy.exec(n);
  return u ? u[1] ? r(u[1]) : a : !1;
}, dy = (n) => n === "position" || n === "percentage", hy = (n) => n === "image" || n === "url", my = (n) => n === "length" || n === "size" || n === "bg-size", py = (n) => n === "length", fE = (n) => n === "number", gy = (n) => n === "family-name", yy = (n) => n === "number" || n === "weight", by = (n) => n === "shadow", dE = () => {
  const n = ot("color"), r = ot("font"), a = ot("text"), u = ot("font-weight"), c = ot("tracking"), d = ot("leading"), f = ot("breakpoint"), m = ot("container"), p = ot("spacing"), h = ot("radius"), b = ot("shadow"), y = ot("inset-shadow"), S = ot("text-shadow"), v = ot("drop-shadow"), T = ot("blur"), L = ot("perspective"), j = ot("aspect"), O = ot("ease"), Z = ot("animate"), G = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], le = () => [
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
  ], fe = () => [...le(), re, ie], H = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", "contain", "none"], K = () => [re, ie, p], de = () => [dl, "full", "auto", ...K()], U = () => [pn, "none", "subgrid", re, ie], te = () => ["auto", {
    span: ["full", pn, re, ie]
  }, pn, re, ie], ee = () => [pn, "auto", re, ie], Ee = () => ["auto", "min", "max", "fr", re, ie], ue = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], D = () => ["auto", ...K()], F = () => [dl, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...K()], se = () => [dl, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...K()], ve = () => [dl, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...K()], k = () => [n, re, ie], z = () => [...le(), Jp, Fp, {
    position: [re, ie]
  }], Y = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], w = () => ["auto", "cover", "contain", oE, lE, {
    size: [re, ie]
  }], P = () => [sc, Ma, jl], ae = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    re,
    ie
  ], ne = () => ["", ze, Ma, jl], ke = () => ["solid", "dashed", "dotted", "double"], Ve = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ye = () => [ze, sc, Jp, Fp], vt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    T,
    re,
    ie
  ], zt = () => ["none", ze, re, ie], cn = () => ["none", ze, re, ie], Hn = () => [ze, re, ie], Tt = () => [dl, "full", ...K()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Un],
      breakpoint: [Un],
      color: [fy],
      container: [Un],
      "drop-shadow": [Un],
      ease: ["in", "out", "in-out"],
      font: [tE],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Un],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Un],
      shadow: [Un],
      spacing: ["px", ze],
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
        aspect: ["auto", "square", dl, ie, re, j]
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
        "@container": ["", "normal", "size", re, ie]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [nE],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ze, ie, re, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": G()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": G()
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
        overflow: H()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": H()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": H()
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
        z: [pn, "auto", re, ie]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [dl, "full", "auto", m, ...K()]
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
        flex: [ze, dl, "auto", "initial", "none", ie]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ze, re, ie]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ze, re, ie]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [pn, "first", "last", "none", re, ie]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": U()
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
        "grid-rows": U()
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
        "auto-cols": Ee()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Ee()
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
        m: D()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: D()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: D()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: D()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: D()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: D()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: D()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: D()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: D()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: D()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: D()
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
        block: ["auto", ...ve()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ve()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ve()]
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
            screen: [f]
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
        text: ["base", a, Ma, jl]
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
        font: [u, cE, iE]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", sc, ie]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [uE, aE, r]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [ie]
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
        tracking: [c, re, ie]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ze, "none", re, Kp]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          d,
          ...K()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", re, ie]
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
        list: ["disc", "decimal", "none", re, ie]
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
        decoration: [...ke(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ze, "from-font", "auto", re, jl]
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
        "underline-offset": [ze, "auto", re, ie]
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
        tab: [pn, re, ie]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", re, ie]
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
        content: ["none", re, ie]
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
        bg: z()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Y()
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
          }, pn, re, ie],
          radial: ["", re, ie],
          conic: [pn, re, ie]
        }, sE, rE]
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
        rounded: ae()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ae()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ae()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ae()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ae()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ae()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ae()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ae()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ae()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ae()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ae()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ae()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ae()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ae()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ae()
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
        border: [...ke(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ke(), "hidden", "none"]
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
        outline: [...ke(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ze, re, ie]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ze, Ma, jl]
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
          fu,
          cu
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
        "inset-shadow": ["none", y, fu, cu]
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
        "ring-offset": [ze, jl]
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
        "text-shadow": ["none", S, fu, cu]
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
        opacity: [ze, re, ie]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ve(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ve()
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
        "mask-linear": [ze]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ye()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ye()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": k()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": k()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ye()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ye()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": k()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": k()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ye()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ye()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": k()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": k()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ye()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ye()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": k()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": k()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ye()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ye()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": k()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": k()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ye()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ye()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": k()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": k()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ye()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ye()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": k()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": k()
      }],
      "mask-image-radial": [{
        "mask-radial": [re, ie]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": ye()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ye()
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
        "mask-radial-at": le()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ze]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ye()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ye()
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
        mask: z()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Y()
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
        mask: ["none", re, ie]
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
          re,
          ie
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: vt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ze, re, ie]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ze, re, ie]
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
          fu,
          cu
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
        grayscale: ["", ze, re, ie]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ze, re, ie]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ze, re, ie]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ze, re, ie]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ze, re, ie]
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
          re,
          ie
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": vt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ze, re, ie]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ze, re, ie]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ze, re, ie]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ze, re, ie]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ze, re, ie]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ze, re, ie]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ze, re, ie]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ze, re, ie]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", re, ie]
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
        duration: [ze, "initial", re, ie]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", O, re, ie]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ze, re, ie]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", Z, re, ie]
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
        perspective: [L, re, ie]
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
        skew: Hn()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Hn()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Hn()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [re, ie, "", "none", "gpu", "cpu"]
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
        zoom: [pn, re, ie]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", re, ie]
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
        "will-change": ["auto", "scroll", "contents", "transform", re, ie]
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
        stroke: [ze, Ma, jl, Kp]
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
}, hE = /* @__PURE__ */ X2(dE);
function pl(...n) {
  return hE(k2(n));
}
function Ip(n) {
  return n.trim().toLowerCase().replace(/[\s-]+/g, "_");
}
const mE = {
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
function pE(n, r) {
  if (n == null) return "neutral";
  const a = Ip(n);
  if (r) {
    for (const u in r)
      if (Ip(u) === a) return r[u];
  }
  return mE[a] ?? "neutral";
}
function gE(...n) {
  const r = n.filter((a) => a != null);
  if (r.length !== 0)
    return r.length === 1 ? r[0] : (a) => {
      for (const u of r)
        typeof u == "function" ? u(a) : u.current = a;
    };
}
const yE = (n) => /^on[A-Z]/.test(n);
function bE(...n) {
  const r = {};
  for (const a of n)
    if (a)
      for (const u of Object.keys(a)) {
        const c = a[u], d = r[u];
        if (u === "className")
          r[u] = pl(d, c);
        else if (u === "style")
          r[u] = { ...d, ...c };
        else if (u === "ref")
          r[u] = gE(d, c);
        else if (yE(u) && typeof c == "function" && typeof d == "function") {
          const f = d, m = c;
          r[u] = (...p) => (f(...p), m(...p));
        } else
          r[u] = c;
      }
  return r;
}
function Zc(n, r) {
  return typeof n == "function" ? n(r) : gt.cloneElement(n, bE(r, n.props));
}
const xy = "inline-flex select-none items-center justify-center gap-x-2 whitespace-nowrap rounded-lg font-medium transition duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px motion-reduce:active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 disabled:active:translate-y-0", vy = {
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
}, Sy = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base"
};
gt.forwardRef(
  function({ variant: r = "primary", size: a = "md", className: u, render: c, ...d }, f) {
    const m = pl(xy, vy[r], Sy[a], u);
    return c ? Zc(c, { "data-slot": "button", className: m, ref: f, ...d }) : /* @__PURE__ */ _.jsx(
      "button",
      {
        ref: f,
        "data-slot": "button",
        className: m,
        ...d
      }
    );
  }
);
const ky = gt.forwardRef(
  function({ variant: r = "primary", size: a = "md", className: u, render: c, ...d }, f) {
    const m = pl(xy, vy[r], Sy[a], u);
    return c ? Zc(c, { "data-slot": "button", className: m, ref: f, ...d }) : /* @__PURE__ */ _.jsx(
      "a",
      {
        ref: f,
        "data-slot": "button",
        className: m,
        ...d
      }
    );
  }
), xE = {
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
function vE(n, r, a) {
  if (r == null) return n;
  const u = pE(r, a);
  return u === "neutral" ? "neutral" : u;
}
function Kc({ children: n, tone: r = "neutral", status: a, statusOverrides: u, className: c }) {
  const d = vE(r, a, u);
  return /* @__PURE__ */ _.jsx(
    "span",
    {
      "data-slot": "badge",
      className: pl(
        "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium",
        xE[d],
        c
      ),
      children: n
    }
  );
}
const SE = {
  white: "bg-card text-foreground border-border shadow-sm",
  muted: "bg-muted text-foreground border-border shadow-sm",
  solid: "bg-primary text-primary-foreground border-primary shadow-md",
  dark: "bg-ink text-paper border-ink shadow-md"
}, wy = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-7 sm:p-8"
};
function kE({ as: n = "div", render: r, children: a, tone: u = "white", padding: c = "md", interactive: d = !1, className: f, ...m }) {
  const p = {
    "data-slot": "card-surface",
    className: pl(
      "flex flex-col rounded-xl border transition-shadow duration-200",
      SE[u],
      wy[c],
      d && "hover:shadow-md focus-within:shadow-md",
      f
    ),
    children: a,
    ...m
  };
  return r ? Zc(r, p) : /* @__PURE__ */ _.jsx(n, { ...p });
}
function wE({ children: n, padding: r = "md", className: a }) {
  return /* @__PURE__ */ _.jsx("div", { "data-slot": "card-surface-body", className: pl("flex flex-1 flex-col", wy[r], a), children: n });
}
function EE({ heading: n, items: r, className: a }) {
  return /* @__PURE__ */ _.jsxs("div", { "data-slot": "details-panel", className: pl("overflow-hidden rounded-xl border border-border bg-card shadow-sm", a), children: [
    n != null ? /* @__PURE__ */ _.jsx("div", { "data-slot": "details-panel-heading", className: "border-b border-border px-6 py-4", children: /* @__PURE__ */ _.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: n }) }) : null,
    /* @__PURE__ */ _.jsx("dl", { "data-slot": "details-panel-body", className: "divide-y divide-border", children: r.map((u, c) => /* @__PURE__ */ _.jsxs("div", { className: "flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6", children: [
      /* @__PURE__ */ _.jsx("dt", { className: "text-sm font-medium text-muted-foreground", children: u.term }),
      /* @__PURE__ */ _.jsx("dd", { className: "text-sm font-semibold text-foreground sm:text-right", children: u.value })
    ] }, c)) })
  ] });
}
const zE = {
  white: "white",
  muted: "muted",
  dark: "dark"
};
function TE({
  children: n,
  tone: r = "white",
  variant: a = "card",
  padding: u = "md",
  className: c
}) {
  return a === "open" ? /* @__PURE__ */ _.jsx("div", { "data-slot": "panel-shell", className: c, children: n }) : /* @__PURE__ */ _.jsx(
    kE,
    {
      "data-slot": "panel-shell",
      tone: zE[r],
      padding: "none",
      className: pl(a === "inset" && r === "white" && "shadow-none", c),
      children: /* @__PURE__ */ _.jsx(wE, { padding: u, children: n })
    }
  );
}
const du = /* @__PURE__ */ new WeakMap(), Ey = "waku-learning-journal:v1";
let zy = null;
const La = () => ({
  goal: "",
  hypothesis: "",
  evidence: "",
  decision: "",
  correction: "",
  next_step: "",
  updated_at: ""
});
function $p(n) {
  try {
    const r = window.localStorage.getItem(`${Ey}:${n}`);
    return r ? { ...La(), ...JSON.parse(r) } : La();
  } catch {
    return La();
  }
}
function Ec(n) {
  zy = n, window.dispatchEvent(new CustomEvent("waku-learning-context", { detail: n }));
}
function cc(n) {
  return n && !n.endsWith("Z") ? `${n.replace(" ", "T")}Z` : n;
}
async function AE(n) {
  const r = await fetch("/api/learning-journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
  }), a = await r.json();
  if (!r.ok || a.error || !a.journal)
    throw new Error(a.error || "Journal save failed");
  return a.journal;
}
const fc = [
  { name: "goal", label: "Session goal", prompt: "What would count as meaningful progress today?" },
  { name: "hypothesis", label: "Current hypothesis", prompt: "What do you think is happening, and why?" },
  { name: "evidence", label: "Evidence collected", prompt: "Commands, measurements, screenshots, and surprising results." },
  { name: "decision", label: "Decision made", prompt: "What did you choose, and which alternatives remain?" },
  { name: "correction", label: "What I misunderstood", prompt: "What changed in your mental model during this session?" },
  { name: "next_step", label: "Next session", prompt: "The exact unresolved question or next experiment." }
];
function CE({ chapter: n, track: r }) {
  const [a, u] = gt.useState(() => $p(n.number)), [c, d] = gt.useState(!1), [f, m] = gt.useState("ready");
  gt.useEffect(() => {
    window.localStorage.setItem(`${Ey}:${n.number}`, JSON.stringify(a)), Ec({ version: 1, chapter: n.number, track: r, journal: a });
  }, [n.number, a, r]), gt.useEffect(() => () => Ec(null), [n.number]), gt.useEffect(() => {
    let S = !0;
    const v = $p(n.number);
    return u(v), d(!1), m("ready"), fetch("/api/learning-journal?chapter=" + encodeURIComponent(n.number)).then((T) => T.json()).then((T) => {
      if (!S) return;
      const L = T.journal;
      if (L) {
        const j = {
          ...La(),
          ...L,
          updated_at: cc(L.updated_at)
        }, O = Date.parse(v.updated_at || "") || 0;
        (Date.parse(j.updated_at || "") || 0) >= O && u(j);
      }
      d(!0), m("saved");
    }).catch(() => {
      S && (d(!0), m("offline"));
    }), () => {
      S = !1;
    };
  }, [n.number]), gt.useEffect(() => {
    const S = () => {
      fetch("/api/learning-journal?chapter=" + encodeURIComponent(n.number)).then((v) => v.json()).then((v) => {
        const T = v.journal;
        T && u({ ...La(), ...T, updated_at: cc(T.updated_at) });
      }).catch(() => m("offline"));
    };
    return window.addEventListener("waku-journal-refresh", S), () => window.removeEventListener("waku-journal-refresh", S);
  }, [n.number]), gt.useEffect(() => {
    if (!c) return;
    m("saving");
    const S = window.setTimeout(() => {
      AE({ version: 1, chapter: n.number, track: r, journal: a }).then((v) => {
        u((T) => ({ ...T, updated_at: cc(v.updated_at) })), m("saved");
      }).catch(() => m("offline"));
    }, 450);
    return () => window.clearTimeout(S);
  }, [
    n.number,
    c,
    a.goal,
    a.hypothesis,
    a.evidence,
    a.decision,
    a.correction,
    a.next_step,
    r
  ]);
  const p = (S, v) => {
    u((T) => ({ ...T, [S]: v, updated_at: (/* @__PURE__ */ new Date()).toISOString() }));
  }, h = r === "engineer" ? "AI-engineer" : r === "architect" ? "Architect" : r === "lab" ? "Lab" : "Lesson", b = f === "saving" ? "Saving to Waku…" : f === "offline" ? "Offline draft" : a.updated_at ? `Saved ${new Date(a.updated_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "Ready for this session", y = fc.filter((S) => a[S.name].trim()).length;
  return /* @__PURE__ */ _.jsx("section", { "data-slot": "learning-journal", className: "wf-learning-journal mt-10 max-w-3xl rounded-xl border border-border bg-card", children: /* @__PURE__ */ _.jsxs("details", { children: [
    /* @__PURE__ */ _.jsxs("summary", { className: "wf-journal-summary", children: [
      /* @__PURE__ */ _.jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ _.jsx("span", { className: "wf-eyebrow", children: "Reflect and capture" }),
        /* @__PURE__ */ _.jsx("strong", { className: "mt-2 block text-xl tracking-tight text-foreground", children: "Learning journal" }),
        /* @__PURE__ */ _.jsx("span", { className: "mt-1 block text-sm leading-6 text-muted-foreground", children: y ? `${y} of ${fc.length} prompts captured for Chapter ${n.number}.` : "Open when you are ready to record what changed in your thinking." })
      ] }),
      /* @__PURE__ */ _.jsxs("span", { className: "flex shrink-0 items-center gap-3", children: [
        /* @__PURE__ */ _.jsxs("span", { className: "wf-journal-status", "aria-live": "polite", children: [
          /* @__PURE__ */ _.jsx("span", { className: "wf-journal-status-dot" }),
          b
        ] }),
        /* @__PURE__ */ _.jsx("span", { className: "wf-journal-chevron", "aria-hidden": "true", children: "⌄" })
      ] })
    ] }),
    /* @__PURE__ */ _.jsxs("div", { className: "wf-journal-body", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "border-b border-border pb-5", children: [
        /* @__PURE__ */ _.jsxs("div", { className: "wf-eyebrow", children: [
          "Chapter ",
          n.number,
          " · ",
          h,
          " track"
        ] }),
        /* @__PURE__ */ _.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-muted-foreground", children: "Capture what you believed, what the evidence changed, and what you will try next. Waku receives these notes with chat so it can coach in context." })
      ] }),
      /* @__PURE__ */ _.jsx("div", { className: "mt-5 grid grid-cols-1 gap-4 md:grid-cols-2", children: fc.map((S) => /* @__PURE__ */ _.jsxs("label", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ _.jsx("span", { className: "text-xs font-bold text-foreground", children: S.label }),
        /* @__PURE__ */ _.jsx(
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
      /* @__PURE__ */ _.jsx("p", { className: "mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground", children: "Saved in Waku's SQLite learning journal, with a browser draft for recovery. Journal context is sent to your configured model provider only when you chat with Waku. It does not mark a chapter complete; Git-backed checks remain the record." })
    ] })
  ] }) });
}
function _E({ chapter: n, track: r }) {
  const [a, u] = gt.useState([]), [c, d] = gt.useState("pwd"), [f, m] = gt.useState(null), [p, h] = gt.useState(""), b = n.lab, y = () => fetch("/api/lab?chapter=" + encodeURIComponent(n.number)).then((j) => j.json()).then((j) => u(j.attempts || []));
  if (gt.useEffect(() => {
    y().catch(() => h("The lab service is unavailable."));
  }, [n.number]), !b) return null;
  const S = b.state === "preview", v = async (j, O) => {
    m(j), h("");
    try {
      const G = await (await fetch("/api/lab/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapter: n.number, action: j, command: O })
      })).json();
      if (G.error) throw new Error(G.error);
      u((le) => [G, ...le]);
    } catch (Z) {
      h(Z instanceof Error ? Z.message : "The command failed to start.");
    } finally {
      m(null);
    }
  }, T = async (j) => {
    m(`attach-${j.id}`), h("");
    try {
      const Z = await (await fetch("/api/lab/attach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attempt_id: j.id, chapter: n.number, track: r })
      })).json();
      if (Z.error) throw new Error(Z.error);
      u((G) => G.map((le) => le.id === j.id ? { ...le, attached_to_journal: 1 } : le)), window.dispatchEvent(new Event("waku-journal-refresh"));
    } catch (O) {
      h(O instanceof Error ? O.message : "Evidence could not be attached.");
    } finally {
      m(null);
    }
  }, L = a[0];
  return /* @__PURE__ */ _.jsxs("section", { "data-slot": "learning-lab", className: "wf-learning-lab mt-10 rounded-xl border border-border bg-card", children: [
    /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-heading", children: [
      /* @__PURE__ */ _.jsxs("div", { children: [
        /* @__PURE__ */ _.jsxs("div", { className: "wf-eyebrow", children: [
          "Hands-on workspace · Chapter ",
          n.number
        ] }),
        /* @__PURE__ */ _.jsx("h3", { className: "mt-2 text-2xl font-bold tracking-tight text-foreground", children: "Learning lab" }),
        /* @__PURE__ */ _.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-muted-foreground", children: b.scenario })
      ] }),
      /* @__PURE__ */ _.jsx(Kc, { tone: S ? "neutral" : "success", children: S ? "Instrument preview" : "Sandbox connected" })
    ] }),
    /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-grid", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-objectives", children: [
        /* @__PURE__ */ _.jsx("div", { className: "wf-eyebrow", children: "Objectives" }),
        /* @__PURE__ */ _.jsx("ol", { className: "mt-4 space-y-4", children: b.objectives.map((j, O) => /* @__PURE__ */ _.jsxs("li", { className: "flex gap-3 text-sm leading-6 text-foreground", children: [
          /* @__PURE__ */ _.jsx("span", { className: "wf-lab-step", children: O + 1 }),
          /* @__PURE__ */ _.jsx("span", { children: j })
        ] }, j)) }),
        /* @__PURE__ */ _.jsxs("div", { className: "mt-6 grid gap-2", children: [
          /* @__PURE__ */ _.jsxs("button", { className: "wf-lab-action", disabled: S || !!f, onClick: () => v("measure"), children: [
            /* @__PURE__ */ _.jsx("span", { children: "Run measurement" }),
            /* @__PURE__ */ _.jsx("code", { children: b.measure })
          ] }),
          /* @__PURE__ */ _.jsxs("button", { className: "wf-lab-action", disabled: S || !!f, onClick: () => v("verify"), children: [
            /* @__PURE__ */ _.jsx("span", { children: "Run verification" }),
            /* @__PURE__ */ _.jsx("code", { children: b.verify })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-console", children: [
        /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-console-bar", children: [
          /* @__PURE__ */ _.jsxs("span", { children: [
            /* @__PURE__ */ _.jsx("i", { className: S ? "is-preview" : "" }),
            " ",
            S ? "instrument pending" : "sandbox · /workspace"
          ] }),
          L ? /* @__PURE__ */ _.jsxs("span", { className: L.exit_code === 0 ? "is-green" : "is-red", children: [
            "exit ",
            L.exit_code,
            " · ",
            L.duration_ms,
            "ms"
          ] }) : /* @__PURE__ */ _.jsx("span", { children: "ready" })
        ] }),
        /* @__PURE__ */ _.jsx("pre", { "aria-live": "polite", children: L ? `$ ${L.command}
${L.output || "(no output)"}` : S ? `# This failure instrument is not published yet.
# Preview the scenario and objectives now; execution unlocks with the chapter.` : "$ Run the baseline measurement or enter a command below." }),
        /* @__PURE__ */ _.jsxs("form", { className: "wf-lab-prompt", onSubmit: (j) => {
          j.preventDefault(), c.trim() && v("command", c.trim());
        }, children: [
          /* @__PURE__ */ _.jsx("span", { "aria-hidden": "true", children: "$" }),
          /* @__PURE__ */ _.jsx("input", { "aria-label": "Sandbox command", value: c, disabled: S, onChange: (j) => d(j.target.value), spellCheck: !1 }),
          /* @__PURE__ */ _.jsx("button", { disabled: S || !!f || !c.trim(), children: f ? "Running…" : "Run" })
        ] }),
        p ? /* @__PURE__ */ _.jsx("p", { className: "wf-lab-error", role: "alert", children: p }) : null
      ] })
    ] }),
    a.length ? /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-history", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ _.jsx("div", { className: "wf-eyebrow", children: "Attempt history" }),
        /* @__PURE__ */ _.jsx("span", { className: "text-xs text-muted-foreground", children: "You choose what becomes journal context." })
      ] }),
      /* @__PURE__ */ _.jsx("div", { className: "mt-3 divide-y divide-border", children: a.slice(0, 6).map((j) => /* @__PURE__ */ _.jsxs("div", { className: "wf-lab-attempt", children: [
        /* @__PURE__ */ _.jsx("span", { className: j.exit_code === 0 ? "wf-lab-result is-green" : "wf-lab-result is-red", children: j.exit_code === 0 ? "Passed" : "Failed" }),
        /* @__PURE__ */ _.jsx("code", { className: "min-w-0 truncate", children: j.command }),
        /* @__PURE__ */ _.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          j.duration_ms,
          "ms"
        ] }),
        j.attached_to_journal ? /* @__PURE__ */ _.jsx("span", { className: "text-xs font-semibold text-[var(--success)]", children: "Attached" }) : /* @__PURE__ */ _.jsx("button", { disabled: !!f, onClick: () => T(j), children: "Attach to Waku" })
      ] }, j.id)) })
    ] }) : null,
    /* @__PURE__ */ _.jsx("p", { className: "wf-lab-footnote", children: S ? "Preview only. This chapter's deterministic failure instrument will be published when its runnable start point is ready." : "Commands run only inside the training container. Lab attempts are evidence, not completion; the Git-backed chapter check remains authoritative." })
  ] });
}
const OE = {
  passed: "Passed",
  current: "Current",
  available: "Available",
  roadmap: "Roadmap"
}, DE = {
  passed: "success",
  current: "warning",
  available: "primary",
  roadmap: "neutral"
};
function Ty({ chapter: n }) {
  return /* @__PURE__ */ _.jsx("span", { "data-slot": "status-badge", className: "inline-flex", children: /* @__PURE__ */ _.jsx(Kc, { tone: DE[n.status], children: OE[n.status] }) });
}
function Ay({ catalog: n }) {
  gt.useEffect(() => Ec(null), []);
  const r = n.chapters.find((u) => u.number === n.current), a = n.total ? Math.round(n.passed / n.total * 100) : 0;
  return /* @__PURE__ */ _.jsxs("div", { "data-slot": "curriculum-surface", className: "pb-8", children: [
    /* @__PURE__ */ _.jsxs("section", { "data-slot": "course-hero", className: "wf-course-hero", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "wf-eyebrow", children: [
        "Production agent engineering · ",
        n.total,
        " chapters"
      ] }),
      /* @__PURE__ */ _.jsxs("h2", { className: "relative z-1 mt-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl", children: [
        "Build the agent.",
        /* @__PURE__ */ _.jsx("br", {}),
        "Break it at scale.",
        /* @__PURE__ */ _.jsx("br", {}),
        "Prove the repair."
      ] }),
      /* @__PURE__ */ _.jsx("p", { className: "relative z-1 mt-6 max-w-2xl text-[0.94rem] leading-7 text-white/80", children: "A self-directed path through the failures that separate an agent demo from a production system. Every runnable lesson starts with a scar and ends with evidence." }),
      /* @__PURE__ */ _.jsxs("div", { "data-slot": "course-progress", className: "relative z-1 mt-7 flex max-w-md items-center gap-4", children: [
        /* @__PURE__ */ _.jsxs("div", { className: "min-w-24", children: [
          /* @__PURE__ */ _.jsxs("strong", { className: "block text-base", children: [
            n.passed,
            " of ",
            n.total
          ] }),
          /* @__PURE__ */ _.jsx("span", { className: "text-[0.65rem] uppercase tracking-[0.08em] text-white/60", children: "chapters passed" })
        ] }),
        /* @__PURE__ */ _.jsx("div", { className: "wf-progress-track flex-1", "aria-label": `${a}% complete`, children: /* @__PURE__ */ _.jsx("span", { style: { width: `${a}%` } }) })
      ] }),
      r ? /* @__PURE__ */ _.jsxs(
        ky,
        {
          className: "relative z-1 mt-7 bg-[var(--wf-accent)] text-[#242019] hover:bg-[var(--wf-accent)]/90",
          href: `#learn/${r.number}`,
          children: [
            "Continue · Chapter ",
            r.number,
            " ",
            /* @__PURE__ */ _.jsx("span", { "aria-hidden": "true", children: "→" })
          ]
        }
      ) : null
    ] }),
    /* @__PURE__ */ _.jsxs("aside", { className: "mt-5 border-l-4 border-[var(--wf-accent)] bg-card px-4 py-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ _.jsx("strong", { className: "text-foreground", children: "How this path works." }),
      " Read the scar, choose the architect or AI-engineer track, reproduce the failure, then make the real check green. Git tags—not browser checkboxes—are the progress record."
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2", children: n.phases.map((u, c) => {
      const d = u.chapters.map((m) => n.chapters.find((p) => p.number === m)).filter((m) => !!m), f = d.filter((m) => m.status === "passed").length;
      return /* @__PURE__ */ _.jsxs("section", { "data-slot": "course-phase", className: "wf-phase-card rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ _.jsx("div", { className: "wf-eyebrow pt-1", children: String(c + 1).padStart(2, "0") }),
        /* @__PURE__ */ _.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ _.jsxs("div", { className: "font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted-foreground", children: [
            f,
            " of ",
            d.length,
            " passed"
          ] }),
          /* @__PURE__ */ _.jsx("h3", { className: "mt-1 text-xl font-bold tracking-tight text-foreground", children: u.name }),
          /* @__PURE__ */ _.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: u.promise }),
          /* @__PURE__ */ _.jsx("div", { className: "mt-4 border-t border-border", children: d.map((m) => /* @__PURE__ */ _.jsxs(
            "a",
            {
              "data-slot": "lesson-row",
              href: `#learn/${m.number}`,
              className: "grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-3 text-foreground no-underline hover:text-primary",
              children: [
                /* @__PURE__ */ _.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: m.number }),
                /* @__PURE__ */ _.jsx("span", { className: "min-w-0 text-sm font-semibold", children: m.title }),
                /* @__PURE__ */ _.jsx(Ty, { chapter: m })
              ]
            },
            m.number
          )) })
        ] })
      ] }, u.id);
    }) })
  ] });
}
function ME({ markdown: n }) {
  return /* @__PURE__ */ _.jsx("article", { "data-slot": "lesson-content", className: "wf-markdown", children: /* @__PURE__ */ _.jsx(ok, { remarkPlugins: [S2], children: n }) });
}
function NE({ catalog: n, route: r }) {
  const [a, u = "brief"] = r.split("/"), c = n.chapters.findIndex((v) => v.number === a);
  if (c < 0) return /* @__PURE__ */ _.jsx(Ay, { catalog: n });
  const d = n.chapters[c], f = n.chapters[c - 1], m = n.chapters[c + 1], p = n.phases.find((v) => v.id === d.phase), h = u === "architect" || u === "engineer" || u === "lab" ? u : "brief", b = h === "brief" ? d.brief : h === "lab" ? "" : d.tracks[h], y = d.status === "current" ? "This is the active assignment. Run the failure first; only green evidence advances the course." : d.status === "passed" ? "Your repository records this chapter as passed. Revisit the evidence or compare approaches." : d.status === "available" ? "The instrument exists, but an earlier chapter is still active. Read ahead without fixing ahead." : "This module is designed but its deterministic failure instrument is not published yet. Preview it; do not treat it as runnable.", S = [
    ["brief", "Lesson"],
    ...d.tracks.architect ? [["architect", "Architect track"]] : [],
    ...d.tracks.engineer ? [["engineer", "AI-engineer track"]] : [],
    ["lab", "Lab"]
  ];
  return /* @__PURE__ */ _.jsxs("div", { "data-slot": "curriculum-surface", className: "pb-8", children: [
    /* @__PURE__ */ _.jsxs("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ _.jsx("a", { className: "text-primary no-underline", href: "#learn", children: "Curriculum" }),
      /* @__PURE__ */ _.jsx("span", { children: "/" }),
      /* @__PURE__ */ _.jsxs("span", { children: [
        "Chapter ",
        d.number
      ] })
    ] }),
    /* @__PURE__ */ _.jsxs("header", { className: "mt-7", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "wf-eyebrow flex items-center gap-2", children: [
        "Chapter ",
        d.number,
        " · ",
        /* @__PURE__ */ _.jsx(Ty, { chapter: d })
      ] }),
      /* @__PURE__ */ _.jsx("h2", { className: "mt-5 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl", children: d.title }),
      /* @__PURE__ */ _.jsx("p", { className: "mt-4 max-w-3xl text-[0.94rem] leading-7 text-muted-foreground", children: d.summary }),
      /* @__PURE__ */ _.jsxs("div", { className: "wf-eyebrow mt-4", children: [
        "Competency · ",
        d.competency
      ] }),
      /* @__PURE__ */ _.jsx("section", { "data-slot": "lesson-contract", children: /* @__PURE__ */ _.jsx(
        EE,
        {
          className: "wf-lesson-contract mt-6",
          items: [
            { term: "Phase", value: p?.name ?? d.phase },
            { term: "Sequence", value: `${c + 1} of ${n.chapters.length}` },
            { term: "Prerequisite", value: f ? `Chapter ${f.number} · ${f.title}` : "Working harness" },
            { term: "Required evidence", value: d.runnable ? d.check : "Failure instrument pending" }
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ _.jsx("nav", { "data-slot": "lesson-tabs", "aria-label": "Lesson tracks", className: "mt-7 flex gap-1 overflow-x-auto border-b border-border", children: S.map(([v, T]) => /* @__PURE__ */ _.jsx(
      "a",
      {
        href: `#learn/${d.number}/${v}`,
        "aria-current": h === v ? "page" : void 0,
        className: `whitespace-nowrap border-b-3 px-4 py-3 text-sm font-semibold no-underline ${h === v ? "border-[var(--wf-accent)] text-[var(--wf-accent-strong)]" : "border-transparent text-muted-foreground hover:text-foreground"}`,
        children: T
      },
      v
    )) }),
    h === "lab" ? /* @__PURE__ */ _.jsx(_E, { chapter: d, track: h }) : /* @__PURE__ */ _.jsxs("a", { className: "wf-lab-callout", href: `#learn/${d.number}/lab`, children: [
      /* @__PURE__ */ _.jsxs("span", { children: [
        /* @__PURE__ */ _.jsx("span", { className: "wf-eyebrow", children: d.lab?.state === "preview" ? "Lab preview" : "Hands-on lab" }),
        /* @__PURE__ */ _.jsx("strong", { children: "Open lab workspace" }),
        /* @__PURE__ */ _.jsx("small", { children: d.lab?.scenario })
      ] }),
      /* @__PURE__ */ _.jsx("span", { "aria-hidden": "true", children: "→" })
    ] }),
    h !== "lab" ? /* @__PURE__ */ _.jsxs("div", { className: "mt-8 grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,1fr)_15.5rem]", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "min-w-0 max-w-3xl", children: [
        /* @__PURE__ */ _.jsx(ME, { markdown: b }),
        /* @__PURE__ */ _.jsxs("section", { "data-slot": "knowledge-check", "aria-labelledby": "wf-knowledge-title", className: "mt-9 rounded-lg border border-border border-l-4 border-l-[var(--wf-accent)] bg-card p-6", children: [
          /* @__PURE__ */ _.jsx("div", { className: "wf-eyebrow", children: "Mastery reflection" }),
          /* @__PURE__ */ _.jsx("h3", { id: "wf-knowledge-title", className: "mt-3 text-xl font-bold text-foreground", children: "Knowledge check" }),
          /* @__PURE__ */ _.jsx("ol", { className: "mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-foreground", children: d.knowledge_checks.map((v) => /* @__PURE__ */ _.jsx("li", { children: v }, v)) }),
          /* @__PURE__ */ _.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "Answer these in your own words before treating a green check as mastery." })
        ] })
      ] }),
      /* @__PURE__ */ _.jsx("aside", { "data-slot": "assignment-panel", className: "sticky top-24", children: /* @__PURE__ */ _.jsxs(TE, { className: "border-t-3 border-t-[var(--wf-accent)]", padding: "md", children: [
        /* @__PURE__ */ _.jsx("div", { className: "wf-eyebrow", children: "Your assignment" }),
        /* @__PURE__ */ _.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: y }),
        /* @__PURE__ */ _.jsx("div", { className: "mt-4", children: d.runnable ? /* @__PURE__ */ _.jsx("code", { className: "block rounded border border-border bg-background px-3 py-2 text-xs", children: d.check }) : /* @__PURE__ */ _.jsx(Kc, { tone: "neutral", children: "Reading preview" }) }),
        d.runnable ? /* @__PURE__ */ _.jsx(ky, { className: "mt-3 w-full", size: "sm", href: `#${d.evidence_view}`, children: "Open live evidence →" }) : null,
        /* @__PURE__ */ _.jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
          /* @__PURE__ */ _.jsx("strong", { className: "text-xs text-foreground", children: "AI rule" }),
          /* @__PURE__ */ _.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Use your assistant as reviewer and rubber duck. You write the chapter solution." })
        ] })
      ] }) })
    ] }) : null,
    /* @__PURE__ */ _.jsx(CE, { chapter: d, track: h }, d.number),
    /* @__PURE__ */ _.jsxs("nav", { "data-slot": "lesson-pagination", "aria-label": "Adjacent lessons", className: "mt-11 grid grid-cols-2 gap-4 border-t border-border pt-6", children: [
      f ? /* @__PURE__ */ _.jsxs("a", { className: "rounded-lg border border-border bg-card p-4 text-foreground no-underline hover:border-primary", href: `#learn/${f.number}`, children: [
        /* @__PURE__ */ _.jsx("span", { className: "block text-[0.62rem] uppercase tracking-wider text-muted-foreground", children: "← Previous" }),
        /* @__PURE__ */ _.jsx("strong", { className: "mt-1 block text-sm", children: f.title })
      ] }) : /* @__PURE__ */ _.jsx("span", {}),
      m ? /* @__PURE__ */ _.jsxs("a", { className: "rounded-lg border border-border bg-card p-4 text-right text-foreground no-underline hover:border-primary", href: `#learn/${m.number}`, children: [
        /* @__PURE__ */ _.jsx("span", { className: "block text-[0.62rem] uppercase tracking-wider text-muted-foreground", children: "Next →" }),
        /* @__PURE__ */ _.jsx("strong", { className: "mt-1 block text-sm", children: m.title })
      ] }) : /* @__PURE__ */ _.jsx("span", {})
    ] })
  ] });
}
function RE({ catalog: n, route: r }) {
  return r ? /* @__PURE__ */ _.jsx(NE, { catalog: n, route: r }) : /* @__PURE__ */ _.jsx(Ay, { catalog: n });
}
window.WakuCurriculum = {
  render(n, r, a) {
    let u = du.get(n);
    u || (u = $1.createRoot(n), du.set(n, u)), u.render(/* @__PURE__ */ _.jsx(RE, { catalog: r, route: a }));
  },
  unmount(n) {
    const r = du.get(n);
    r && (r.unmount(), du.delete(n));
  },
  getLearningContext() {
    return zy;
  }
};
window.dispatchEvent(new Event("waku-curriculum-ready"));
