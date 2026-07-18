function Wp(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var qs = { exports: {} }, Ta = {};
var Xm;
function X1() {
  if (Xm) return Ta;
  Xm = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
  function a(u, c, h) {
    var f = null;
    if (h !== void 0 && (f = "" + h), c.key !== void 0 && (f = "" + c.key), "key" in c) {
      h = {};
      for (var m in c)
        m !== "key" && (h[m] = c[m]);
    } else h = c;
    return c = h.ref, {
      $$typeof: n,
      type: u,
      key: f,
      ref: c !== void 0 ? c : null,
      props: h
    };
  }
  return Ta.Fragment = r, Ta.jsx = a, Ta.jsxs = a, Ta;
}
var Qm;
function Q1() {
  return Qm || (Qm = 1, qs.exports = /* @__PURE__ */ X1()), qs.exports;
}
var B = /* @__PURE__ */ Q1(), Ys = { exports: {} }, ve = {};
var Zm;
function Z1() {
  if (Zm) return ve;
  Zm = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), a = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), d = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), y = /* @__PURE__ */ Symbol.for("react.activity"), S = Symbol.iterator;
  function x(z) {
    return z === null || typeof z != "object" ? null : (z = S && z[S] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var A = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, L = Object.assign, Y = {};
  function D(z, q, w) {
    this.props = z, this.context = q, this.refs = Y, this.updater = w || A;
  }
  D.prototype.isReactComponent = {}, D.prototype.setState = function(z, q) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, q, "setState");
  }, D.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function Z() {
  }
  Z.prototype = D.prototype;
  function X(z, q, w) {
    this.props = z, this.context = q, this.refs = Y, this.updater = w || A;
  }
  var se = X.prototype = new Z();
  se.constructor = X, L(se, D.prototype), se.isPureReactComponent = !0;
  var fe = Array.isArray;
  function U() {
  }
  var $ = { H: null, A: null, T: null, S: null }, K = Object.prototype.hasOwnProperty;
  function he(z, q, w) {
    var P = w.ref;
    return {
      $$typeof: n,
      type: z,
      key: q,
      ref: P !== void 0 ? P : null,
      props: w
    };
  }
  function R(z, q) {
    return he(z.type, q, z.props);
  }
  function te(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function ee(z) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(w) {
      return q[w];
    });
  }
  var Ee = /\/+/g;
  function re(z, q) {
    return typeof z == "object" && z !== null && z.key != null ? ee("" + z.key) : q.toString(36);
  }
  function I(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(U, U) : (z.status = "pending", z.then(
          function(q) {
            z.status === "pending" && (z.status = "fulfilled", z.value = q);
          },
          function(q) {
            z.status === "pending" && (z.status = "rejected", z.reason = q);
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
  function _(z, q, w, P, ie) {
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
              return ke = z._init, _(
                ke(z._payload),
                q,
                w,
                P,
                ie
              );
          }
      }
    if (ke)
      return ie = ie(z), ke = P === "" ? "." + re(z, 0) : P, fe(ie) ? (w = "", ke != null && (w = ke.replace(Ee, "$&/") + "/"), _(ie, q, w, "", function(vt) {
        return vt;
      })) : ie != null && (te(ie) && (ie = R(
        ie,
        w + (ie.key == null || z && z.key === ie.key ? "" : ("" + ie.key).replace(
          Ee,
          "$&/"
        ) + "/") + ke
      )), q.push(ie)), 1;
    ke = 0;
    var Ve = P === "" ? "." : P + ":";
    if (fe(z))
      for (var ye = 0; ye < z.length; ye++)
        P = z[ye], ne = Ve + re(P, ye), ke += _(
          P,
          q,
          w,
          ne,
          ie
        );
    else if (ye = x(z), typeof ye == "function")
      for (z = ye.call(z), ye = 0; !(P = z.next()).done; )
        P = P.value, ne = Ve + re(P, ye++), ke += _(
          P,
          q,
          w,
          ne,
          ie
        );
    else if (ne === "object") {
      if (typeof z.then == "function")
        return _(
          I(z),
          q,
          w,
          P,
          ie
        );
      throw q = String(z), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ke;
  }
  function F(z, q, w) {
    if (z == null) return z;
    var P = [], ie = 0;
    return _(z, P, "", "", function(ne) {
      return q.call(w, ne, ie++);
    }), P;
  }
  function oe(z) {
    if (z._status === -1) {
      var q = z._result;
      q = q(), q.then(
        function(w) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = w);
        },
        function(w) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = w);
        }
      ), z._status === -1 && (z._status = 0, z._result = q);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var xe = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  }, k = {
    map: F,
    forEach: function(z, q, w) {
      F(
        z,
        function() {
          q.apply(this, arguments);
        },
        w
      );
    },
    count: function(z) {
      var q = 0;
      return F(z, function() {
        q++;
      }), q;
    },
    toArray: function(z) {
      return F(z, function(q) {
        return q;
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
  return ve.Activity = y, ve.Children = k, ve.Component = D, ve.Fragment = a, ve.Profiler = c, ve.PureComponent = X, ve.StrictMode = u, ve.Suspense = p, ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, ve.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return $.H.useMemoCache(z);
    }
  }, ve.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, ve.cacheSignal = function() {
    return null;
  }, ve.cloneElement = function(z, q, w) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var P = L({}, z.props), ie = z.key;
    if (q != null)
      for (ne in q.key !== void 0 && (ie = "" + q.key), q)
        !K.call(q, ne) || ne === "key" || ne === "__self" || ne === "__source" || ne === "ref" && q.ref === void 0 || (P[ne] = q[ne]);
    var ne = arguments.length - 2;
    if (ne === 1) P.children = w;
    else if (1 < ne) {
      for (var ke = Array(ne), Ve = 0; Ve < ne; Ve++)
        ke[Ve] = arguments[Ve + 2];
      P.children = ke;
    }
    return he(z.type, ie, P);
  }, ve.createContext = function(z) {
    return z = {
      $$typeof: f,
      _currentValue: z,
      _currentValue2: z,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, z.Provider = z, z.Consumer = {
      $$typeof: h,
      _context: z
    }, z;
  }, ve.createElement = function(z, q, w) {
    var P, ie = {}, ne = null;
    if (q != null)
      for (P in q.key !== void 0 && (ne = "" + q.key), q)
        K.call(q, P) && P !== "key" && P !== "__self" && P !== "__source" && (ie[P] = q[P]);
    var ke = arguments.length - 2;
    if (ke === 1) ie.children = w;
    else if (1 < ke) {
      for (var Ve = Array(ke), ye = 0; ye < ke; ye++)
        Ve[ye] = arguments[ye + 2];
      ie.children = Ve;
    }
    if (z && z.defaultProps)
      for (P in ke = z.defaultProps, ke)
        ie[P] === void 0 && (ie[P] = ke[P]);
    return he(z, ne, ie);
  }, ve.createRef = function() {
    return { current: null };
  }, ve.forwardRef = function(z) {
    return { $$typeof: m, render: z };
  }, ve.isValidElement = te, ve.lazy = function(z) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: z },
      _init: oe
    };
  }, ve.memo = function(z, q) {
    return {
      $$typeof: d,
      type: z,
      compare: q === void 0 ? null : q
    };
  }, ve.startTransition = function(z) {
    var q = $.T, w = {};
    $.T = w;
    try {
      var P = z(), ie = $.S;
      ie !== null && ie(w, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(U, xe);
    } catch (ne) {
      xe(ne);
    } finally {
      q !== null && w.types !== null && (q.types = w.types), $.T = q;
    }
  }, ve.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, ve.use = function(z) {
    return $.H.use(z);
  }, ve.useActionState = function(z, q, w) {
    return $.H.useActionState(z, q, w);
  }, ve.useCallback = function(z, q) {
    return $.H.useCallback(z, q);
  }, ve.useContext = function(z) {
    return $.H.useContext(z);
  }, ve.useDebugValue = function() {
  }, ve.useDeferredValue = function(z, q) {
    return $.H.useDeferredValue(z, q);
  }, ve.useEffect = function(z, q) {
    return $.H.useEffect(z, q);
  }, ve.useEffectEvent = function(z) {
    return $.H.useEffectEvent(z);
  }, ve.useId = function() {
    return $.H.useId();
  }, ve.useImperativeHandle = function(z, q, w) {
    return $.H.useImperativeHandle(z, q, w);
  }, ve.useInsertionEffect = function(z, q) {
    return $.H.useInsertionEffect(z, q);
  }, ve.useLayoutEffect = function(z, q) {
    return $.H.useLayoutEffect(z, q);
  }, ve.useMemo = function(z, q) {
    return $.H.useMemo(z, q);
  }, ve.useOptimistic = function(z, q) {
    return $.H.useOptimistic(z, q);
  }, ve.useReducer = function(z, q, w) {
    return $.H.useReducer(z, q, w);
  }, ve.useRef = function(z) {
    return $.H.useRef(z);
  }, ve.useState = function(z) {
    return $.H.useState(z);
  }, ve.useSyncExternalStore = function(z, q, w) {
    return $.H.useSyncExternalStore(
      z,
      q,
      w
    );
  }, ve.useTransition = function() {
    return $.H.useTransition();
  }, ve.version = "19.2.7", ve;
}
var Km;
function zc() {
  return Km || (Km = 1, Ys.exports = /* @__PURE__ */ Z1()), Ys.exports;
}
var jt = /* @__PURE__ */ zc(), Gs = { exports: {} }, Aa = {}, Vs = { exports: {} }, Xs = {};
var Fm;
function K1() {
  return Fm || (Fm = 1, (function(n) {
    function r(_, F) {
      var oe = _.length;
      _.push(F);
      e: for (; 0 < oe; ) {
        var xe = oe - 1 >>> 1, k = _[xe];
        if (0 < c(k, F))
          _[xe] = F, _[oe] = k, oe = xe;
        else break e;
      }
    }
    function a(_) {
      return _.length === 0 ? null : _[0];
    }
    function u(_) {
      if (_.length === 0) return null;
      var F = _[0], oe = _.pop();
      if (oe !== F) {
        _[0] = oe;
        e: for (var xe = 0, k = _.length, z = k >>> 1; xe < z; ) {
          var q = 2 * (xe + 1) - 1, w = _[q], P = q + 1, ie = _[P];
          if (0 > c(w, oe))
            P < k && 0 > c(ie, w) ? (_[xe] = ie, _[P] = oe, xe = P) : (_[xe] = w, _[q] = oe, xe = q);
          else if (P < k && 0 > c(ie, oe))
            _[xe] = ie, _[P] = oe, xe = P;
          else break e;
        }
      }
      return F;
    }
    function c(_, F) {
      var oe = _.sortIndex - F.sortIndex;
      return oe !== 0 ? oe : _.id - F.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      n.unstable_now = function() {
        return h.now();
      };
    } else {
      var f = Date, m = f.now();
      n.unstable_now = function() {
        return f.now() - m;
      };
    }
    var p = [], d = [], b = 1, y = null, S = 3, x = !1, A = !1, L = !1, Y = !1, D = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function se(_) {
      for (var F = a(d); F !== null; ) {
        if (F.callback === null) u(d);
        else if (F.startTime <= _)
          u(d), F.sortIndex = F.expirationTime, r(p, F);
        else break;
        F = a(d);
      }
    }
    function fe(_) {
      if (L = !1, se(_), !A)
        if (a(p) !== null)
          A = !0, U || (U = !0, ee());
        else {
          var F = a(d);
          F !== null && I(fe, F.startTime - _);
        }
    }
    var U = !1, $ = -1, K = 5, he = -1;
    function R() {
      return Y ? !0 : !(n.unstable_now() - he < K);
    }
    function te() {
      if (Y = !1, U) {
        var _ = n.unstable_now();
        he = _;
        var F = !0;
        try {
          e: {
            A = !1, L && (L = !1, Z($), $ = -1), x = !0;
            var oe = S;
            try {
              t: {
                for (se(_), y = a(p); y !== null && !(y.expirationTime > _ && R()); ) {
                  var xe = y.callback;
                  if (typeof xe == "function") {
                    y.callback = null, S = y.priorityLevel;
                    var k = xe(
                      y.expirationTime <= _
                    );
                    if (_ = n.unstable_now(), typeof k == "function") {
                      y.callback = k, se(_), F = !0;
                      break t;
                    }
                    y === a(p) && u(p), se(_);
                  } else u(p);
                  y = a(p);
                }
                if (y !== null) F = !0;
                else {
                  var z = a(d);
                  z !== null && I(
                    fe,
                    z.startTime - _
                  ), F = !1;
                }
              }
              break e;
            } finally {
              y = null, S = oe, x = !1;
            }
            F = void 0;
          }
        } finally {
          F ? ee() : U = !1;
        }
      }
    }
    var ee;
    if (typeof X == "function")
      ee = function() {
        X(te);
      };
    else if (typeof MessageChannel < "u") {
      var Ee = new MessageChannel(), re = Ee.port2;
      Ee.port1.onmessage = te, ee = function() {
        re.postMessage(null);
      };
    } else
      ee = function() {
        D(te, 0);
      };
    function I(_, F) {
      $ = D(function() {
        _(n.unstable_now());
      }, F);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, n.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : K = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(_) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = S;
      }
      var oe = S;
      S = F;
      try {
        return _();
      } finally {
        S = oe;
      }
    }, n.unstable_requestPaint = function() {
      Y = !0;
    }, n.unstable_runWithPriority = function(_, F) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var oe = S;
      S = _;
      try {
        return F();
      } finally {
        S = oe;
      }
    }, n.unstable_scheduleCallback = function(_, F, oe) {
      var xe = n.unstable_now();
      switch (typeof oe == "object" && oe !== null ? (oe = oe.delay, oe = typeof oe == "number" && 0 < oe ? xe + oe : xe) : oe = xe, _) {
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
      return k = oe + k, _ = {
        id: b++,
        callback: F,
        priorityLevel: _,
        startTime: oe,
        expirationTime: k,
        sortIndex: -1
      }, oe > xe ? (_.sortIndex = oe, r(d, _), a(p) === null && _ === a(d) && (L ? (Z($), $ = -1) : L = !0, I(fe, oe - xe))) : (_.sortIndex = k, r(p, _), A || x || (A = !0, U || (U = !0, ee()))), _;
    }, n.unstable_shouldYield = R, n.unstable_wrapCallback = function(_) {
      var F = S;
      return function() {
        var oe = S;
        S = F;
        try {
          return _.apply(this, arguments);
        } finally {
          S = oe;
        }
      };
    };
  })(Xs)), Xs;
}
var Jm;
function F1() {
  return Jm || (Jm = 1, Vs.exports = /* @__PURE__ */ K1()), Vs.exports;
}
var Qs = { exports: {} }, gt = {};
var Im;
function J1() {
  if (Im) return gt;
  Im = 1;
  var n = /* @__PURE__ */ zc();
  function r(p) {
    var d = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      d += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        d += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + p + "; visit " + d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function h(p, d, b) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: y == null ? null : "" + y,
      children: p,
      containerInfo: d,
      implementation: b
    };
  }
  var f = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(p, d) {
    if (p === "font") return "";
    if (typeof d == "string")
      return d === "use-credentials" ? d : "";
  }
  return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, gt.createPortal = function(p, d) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!d || d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11)
      throw Error(r(299));
    return h(p, d, null, b);
  }, gt.flushSync = function(p) {
    var d = f.T, b = u.p;
    try {
      if (f.T = null, u.p = 2, p) return p();
    } finally {
      f.T = d, u.p = b, u.d.f();
    }
  }, gt.preconnect = function(p, d) {
    typeof p == "string" && (d ? (d = d.crossOrigin, d = typeof d == "string" ? d === "use-credentials" ? d : "" : void 0) : d = null, u.d.C(p, d));
  }, gt.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, gt.preinit = function(p, d) {
    if (typeof p == "string" && d && typeof d.as == "string") {
      var b = d.as, y = m(b, d.crossOrigin), S = typeof d.integrity == "string" ? d.integrity : void 0, x = typeof d.fetchPriority == "string" ? d.fetchPriority : void 0;
      b === "style" ? u.d.S(
        p,
        typeof d.precedence == "string" ? d.precedence : void 0,
        {
          crossOrigin: y,
          integrity: S,
          fetchPriority: x
        }
      ) : b === "script" && u.d.X(p, {
        crossOrigin: y,
        integrity: S,
        fetchPriority: x,
        nonce: typeof d.nonce == "string" ? d.nonce : void 0
      });
    }
  }, gt.preinitModule = function(p, d) {
    if (typeof p == "string")
      if (typeof d == "object" && d !== null) {
        if (d.as == null || d.as === "script") {
          var b = m(
            d.as,
            d.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: b,
            integrity: typeof d.integrity == "string" ? d.integrity : void 0,
            nonce: typeof d.nonce == "string" ? d.nonce : void 0
          });
        }
      } else d == null && u.d.M(p);
  }, gt.preload = function(p, d) {
    if (typeof p == "string" && typeof d == "object" && d !== null && typeof d.as == "string") {
      var b = d.as, y = m(b, d.crossOrigin);
      u.d.L(p, b, {
        crossOrigin: y,
        integrity: typeof d.integrity == "string" ? d.integrity : void 0,
        nonce: typeof d.nonce == "string" ? d.nonce : void 0,
        type: typeof d.type == "string" ? d.type : void 0,
        fetchPriority: typeof d.fetchPriority == "string" ? d.fetchPriority : void 0,
        referrerPolicy: typeof d.referrerPolicy == "string" ? d.referrerPolicy : void 0,
        imageSrcSet: typeof d.imageSrcSet == "string" ? d.imageSrcSet : void 0,
        imageSizes: typeof d.imageSizes == "string" ? d.imageSizes : void 0,
        media: typeof d.media == "string" ? d.media : void 0
      });
    }
  }, gt.preloadModule = function(p, d) {
    if (typeof p == "string")
      if (d) {
        var b = m(d.as, d.crossOrigin);
        u.d.m(p, {
          as: typeof d.as == "string" && d.as !== "script" ? d.as : void 0,
          crossOrigin: b,
          integrity: typeof d.integrity == "string" ? d.integrity : void 0
        });
      } else u.d.m(p);
  }, gt.requestFormReset = function(p) {
    u.d.r(p);
  }, gt.unstable_batchedUpdates = function(p, d) {
    return p(d);
  }, gt.useFormState = function(p, d, b) {
    return f.H.useFormState(p, d, b);
  }, gt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, gt.version = "19.2.7", gt;
}
var $m;
function I1() {
  if ($m) return Qs.exports;
  $m = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Qs.exports = /* @__PURE__ */ J1(), Qs.exports;
}
var Wm;
function $1() {
  if (Wm) return Aa;
  Wm = 1;
  var n = /* @__PURE__ */ F1(), r = /* @__PURE__ */ zc(), a = /* @__PURE__ */ I1();
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
  function h(e) {
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
    if (h(e) !== e)
      throw Error(u(188));
  }
  function d(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(u(188));
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
        for (var g = !1, v = o.child; v; ) {
          if (v === l) {
            g = !0, l = o, i = s;
            break;
          }
          if (v === i) {
            g = !0, i = o, l = s;
            break;
          }
          v = v.sibling;
        }
        if (!g) {
          for (v = s.child; v; ) {
            if (v === l) {
              g = !0, l = s, i = o;
              break;
            }
            if (v === i) {
              g = !0, i = s, l = o;
              break;
            }
            v = v.sibling;
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
  var y = Object.assign, S = /* @__PURE__ */ Symbol.for("react.element"), x = /* @__PURE__ */ Symbol.for("react.transitional.element"), A = /* @__PURE__ */ Symbol.for("react.portal"), L = /* @__PURE__ */ Symbol.for("react.fragment"), Y = /* @__PURE__ */ Symbol.for("react.strict_mode"), D = /* @__PURE__ */ Symbol.for("react.profiler"), Z = /* @__PURE__ */ Symbol.for("react.consumer"), X = /* @__PURE__ */ Symbol.for("react.context"), se = /* @__PURE__ */ Symbol.for("react.forward_ref"), fe = /* @__PURE__ */ Symbol.for("react.suspense"), U = /* @__PURE__ */ Symbol.for("react.suspense_list"), $ = /* @__PURE__ */ Symbol.for("react.memo"), K = /* @__PURE__ */ Symbol.for("react.lazy"), he = /* @__PURE__ */ Symbol.for("react.activity"), R = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), te = Symbol.iterator;
  function ee(e) {
    return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ee = /* @__PURE__ */ Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ee ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case L:
        return "Fragment";
      case D:
        return "Profiler";
      case Y:
        return "StrictMode";
      case fe:
        return "Suspense";
      case U:
        return "SuspenseList";
      case he:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case A:
          return "Portal";
        case X:
          return e.displayName || "Context";
        case Z:
          return (e._context.displayName || "Context") + ".Consumer";
        case se:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case $:
          return t = e.displayName || null, t !== null ? t : re(e.type) || "Memo";
        case K:
          t = e._payload, e = e._init;
          try {
            return re(e(t));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, _ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, xe = [], k = -1;
  function z(e) {
    return { current: e };
  }
  function q(e) {
    0 > k || (e.current = xe[k], xe[k] = null, k--);
  }
  function w(e, t) {
    k++, xe[k] = e.current, e.current = t;
  }
  var P = z(null), ie = z(null), ne = z(null), ke = z(null);
  function Ve(e, t) {
    switch (w(ne, t), w(ie, e), w(P, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? dm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = dm(t), e = mm(t, e);
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
    q(P), w(P, e);
  }
  function ye() {
    q(P), q(ie), q(ne);
  }
  function vt(e) {
    e.memoizedState !== null && w(ke, e);
    var t = P.current, l = mm(t, e.type);
    t !== l && (w(ie, e), w(P, l));
  }
  function Et(e) {
    ie.current === e && (q(P), q(ie)), ke.current === e && (q(ke), ka._currentValue = oe);
  }
  var cn, Hn;
  function zt(e) {
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
                } catch (j) {
                  var N = j;
                }
                Reflect.construct(e, [], Q);
              } else {
                try {
                  Q.call();
                } catch (j) {
                  N = j;
                }
                e.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                N = j;
              }
              (Q = e()) && typeof Q.catch == "function" && Q.catch(function() {
              });
            }
          } catch (j) {
            if (j && N && typeof j.stack == "string")
              return [j.stack, N.stack];
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
      var s = i.DetermineComponentFrameRoot(), g = s[0], v = s[1];
      if (g && v) {
        var E = g.split(`
`), M = v.split(`
`);
        for (o = i = 0; i < E.length && !E[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; o < M.length && !M[o].includes(
          "DetermineComponentFrameRoot"
        ); )
          o++;
        if (i === E.length || o === M.length)
          for (i = E.length - 1, o = M.length - 1; 1 <= i && 0 <= o && E[i] !== M[o]; )
            o--;
        for (; 1 <= i && 0 <= o; i--, o--)
          if (E[i] !== M[o]) {
            if (i !== 1 || o !== 1)
              do
                if (i--, o--, 0 > o || E[i] !== M[o]) {
                  var H = `
` + E[i].replace(" at new ", " at ");
                  return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), H;
                }
              while (1 <= i && 0 <= o);
            break;
          }
      }
    } finally {
      Yl = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? zt(l) : "";
  }
  function Ga(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return zt(e.type);
      case 16:
        return zt("Lazy");
      case 13:
        return e.child !== t && t !== null ? zt("Suspense Fallback") : zt("Suspense");
      case 19:
        return zt("SuspenseList");
      case 0:
      case 15:
        return Gl(e.type, !1);
      case 11:
        return Gl(e.type.render, !1);
      case 1:
        return Gl(e.type, !0);
      case 31:
        return zt("Activity");
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
  var Vl = Object.prototype.hasOwnProperty, Xl = n.unstable_scheduleCallback, Ri = n.unstable_cancelCallback, Eu = n.unstable_shouldYield, zu = n.unstable_requestPaint, xt = n.unstable_now, Tu = n.unstable_getCurrentPriorityLevel, G = n.unstable_ImmediatePriority, W = n.unstable_UserBlockingPriority, ge = n.unstable_NormalPriority, Te = n.unstable_LowPriority, Ue = n.unstable_IdlePriority, Ut = n.log, bn = n.unstable_setDisableYieldValue, St = null, rt = null;
  function Tt(e) {
    if (typeof Ut == "function" && bn(e), rt && typeof rt.setStrictMode == "function")
      try {
        rt.setStrictMode(St, e);
      } catch {
      }
  }
  var Xe = Math.clz32 ? Math.clz32 : Dy, qn = Math.log, an = Math.LN2;
  function Dy(e) {
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
    var v = i & 134217727;
    return v !== 0 ? (i = v & ~s, i !== 0 ? o = gl(i) : (g &= v, g !== 0 ? o = gl(g) : l || (l = v & ~e, l !== 0 && (o = gl(l))))) : (v = i & ~s, v !== 0 ? o = gl(v) : g !== 0 ? o = gl(g) : l || (l = i & ~e, l !== 0 && (o = gl(l)))), o === 0 ? 0 : t !== 0 && t !== o && (t & s) === 0 && (s = o & -o, l = t & -t, s >= l || s === 32 && (l & 4194048) !== 0) ? t : o;
  }
  function ji(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Oy(e, t) {
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
  function Kc() {
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
  function My(e, t, l, i, o, s) {
    var g = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var v = e.entanglements, E = e.expirationTimes, M = e.hiddenUpdates;
    for (l = g & ~l; 0 < l; ) {
      var H = 31 - Xe(l), Q = 1 << H;
      v[H] = 0, E[H] = -1;
      var N = M[H];
      if (N !== null)
        for (M[H] = null, H = 0; H < N.length; H++) {
          var j = N[H];
          j !== null && (j.lane &= -536870913);
        }
      l &= ~Q;
    }
    i !== 0 && Fc(e, i, 0), s !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(g & ~t));
  }
  function Fc(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - Xe(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | l & 261930;
  }
  function Jc(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var i = 31 - Xe(l), o = 1 << i;
      o & t | e[i] & t && (e[i] |= t), l &= ~o;
    }
  }
  function Ic(e, t) {
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
  function $c() {
    var e = F.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Um(e.type));
  }
  function Wc(e, t) {
    var l = F.p;
    try {
      return F.p = e, t();
    } finally {
      F.p = l;
    }
  }
  var Yn = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Yn, At = "__reactProps$" + Yn, Ql = "__reactContainer$" + Yn, Du = "__reactEvents$" + Yn, Ny = "__reactListeners$" + Yn, Ry = "__reactHandles$" + Yn, Pc = "__reactResources$" + Yn, Ui = "__reactMarker$" + Yn;
  function Ou(e) {
    delete e[ft], delete e[At], delete e[Du], delete e[Ny], delete e[Ry];
  }
  function Zl(e) {
    var t = e[ft];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ql] || l[ft]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Sm(e); e !== null; ) {
            if (l = e[ft]) return l;
            e = Sm(e);
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
    var t = e[Pc];
    return t || (t = e[Pc] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function st(e) {
    e[Ui] = !0;
  }
  var ef = /* @__PURE__ */ new Set(), tf = {};
  function yl(e, t) {
    Jl(e, t), Jl(e + "Capture", t);
  }
  function Jl(e, t) {
    for (tf[e] = t, e = 0; e < t.length; e++)
      ef.add(t[e]);
  }
  var jy = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), nf = {}, lf = {};
  function Ly(e) {
    return Vl.call(lf, e) ? !0 : Vl.call(nf, e) ? !1 : jy.test(e) ? lf[e] = !0 : (nf[e] = !0, !1);
  }
  function Fa(e, t, l) {
    if (Ly(t))
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
  function af(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Uy(e, t, l) {
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
      var t = af(e) ? "checked" : "value";
      e._valueTracker = Uy(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function rf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = af(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Ia(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var By = /[\n"\\]/g;
  function Ft(e) {
    return e.replace(
      By,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Nu(e, t, l, i, o, s, g, v) {
    e.name = "", g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" ? e.type = g : e.removeAttribute("type"), t != null ? g === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Kt(t)) : e.value !== "" + Kt(t) && (e.value = "" + Kt(t)) : g !== "submit" && g !== "reset" || e.removeAttribute("value"), t != null ? Ru(e, g, Kt(t)) : l != null ? Ru(e, g, Kt(l)) : i != null && e.removeAttribute("value"), o == null && s != null && (e.defaultChecked = !!s), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.name = "" + Kt(v) : e.removeAttribute("name");
  }
  function uf(e, t, l, i, o, s, g, v) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || l != null) {
      if (!(s !== "submit" && s !== "reset" || t != null)) {
        Mu(e);
        return;
      }
      l = l != null ? "" + Kt(l) : "", t = t != null ? "" + Kt(t) : l, v || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = v ? e.checked : !!i, e.defaultChecked = !!i, g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean" && (e.name = g), Mu(e);
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
  function of(e, t, l) {
    if (t != null && (t = "" + Kt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Kt(l) : "";
  }
  function sf(e, t, l, i) {
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
  var Hy = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function cf(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Hy.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function ff(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var o in t)
        i = t[o], t.hasOwnProperty(o) && l[o] !== i && cf(e, o, i);
    } else
      for (var s in t)
        t.hasOwnProperty(s) && cf(e, s, t[s]);
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
  var qy = /* @__PURE__ */ new Map([
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
  ]), Yy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $a(e) {
    return Yy.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function xn() {
  }
  var Lu = null;
  function Uu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Wl = null, Pl = null;
  function hf(e) {
    var t = Kl(e);
    if (t && (e = t.stateNode)) {
      var l = e[At] || null;
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
                var o = i[At] || null;
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
              i = l[t], i.form === e.form && rf(i);
          }
          break e;
        case "textarea":
          of(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && Il(e, !!l.multiple, t, !1);
      }
    }
  }
  var Bu = !1;
  function df(e, t, l) {
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
    var i = l[At] || null;
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
  function mf() {
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
  function pf() {
    return !1;
  }
  function Ct(e) {
    function t(l, i, o, s, g) {
      this._reactName = l, this._targetInst = o, this.type = i, this.nativeEvent = s, this.target = g, this.currentTarget = null;
      for (var v in e)
        e.hasOwnProperty(v) && (l = e[v], this[v] = l ? l(s) : s[v]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? er : pf, this.isPropagationStopped = pf, this;
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
  }, tr = Ct(bl), Yi = y({}, bl, { view: 0, detail: 0 }), Gy = Ct(Yi), Yu, Gu, Gi, nr = y({}, Yi, {
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
  }), gf = Ct(nr), Vy = y({}, nr, { dataTransfer: 0 }), Xy = Ct(Vy), Qy = y({}, Yi, { relatedTarget: 0 }), Vu = Ct(Qy), Zy = y({}, bl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ky = Ct(Zy), Fy = y({}, bl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Jy = Ct(Fy), Iy = y({}, bl, { data: 0 }), yf = Ct(Iy), $y = {
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
  }, Wy = {
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
  }, Py = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function eb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Py[e]) ? !!t[e] : !1;
  }
  function Xu() {
    return eb;
  }
  var tb = y({}, Yi, {
    key: function(e) {
      if (e.key) {
        var t = $y[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Pa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Wy[e.keyCode] || "Unidentified" : "";
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
  }), nb = Ct(tb), lb = y({}, nr, {
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
  }), bf = Ct(lb), ib = y({}, Yi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xu
  }), ab = Ct(ib), rb = y({}, bl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ub = Ct(rb), ob = y({}, nr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), sb = Ct(ob), cb = y({}, bl, {
    newState: 0,
    oldState: 0
  }), fb = Ct(cb), hb = [9, 13, 27, 32], Qu = Sn && "CompositionEvent" in window, Vi = null;
  Sn && "documentMode" in document && (Vi = document.documentMode);
  var db = Sn && "TextEvent" in window && !Vi, vf = Sn && (!Qu || Vi && 8 < Vi && 11 >= Vi), xf = " ", Sf = !1;
  function kf(e, t) {
    switch (e) {
      case "keyup":
        return hb.indexOf(t.keyCode) !== -1;
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
  function wf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ei = !1;
  function mb(e, t) {
    switch (e) {
      case "compositionend":
        return wf(t);
      case "keypress":
        return t.which !== 32 ? null : (Sf = !0, xf);
      case "textInput":
        return e = t.data, e === xf && Sf ? null : e;
      default:
        return null;
    }
  }
  function pb(e, t) {
    if (ei)
      return e === "compositionend" || !Qu && kf(e, t) ? (e = mf(), Wa = qu = Gn = null, ei = !1, e) : null;
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
  var gb = {
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
  function Ef(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!gb[e.type] : t === "textarea";
  }
  function zf(e, t, l, i) {
    Wl ? Pl ? Pl.push(i) : Pl = [i] : Wl = i, t = Qr(t, "onChange"), 0 < t.length && (l = new tr(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var Xi = null, Qi = null;
  function yb(e) {
    um(e, 0);
  }
  function lr(e) {
    var t = Bi(e);
    if (rf(t)) return e;
  }
  function Tf(e, t) {
    if (e === "change") return t;
  }
  var Af = !1;
  if (Sn) {
    var Zu;
    if (Sn) {
      var Ku = "oninput" in document;
      if (!Ku) {
        var Cf = document.createElement("div");
        Cf.setAttribute("oninput", "return;"), Ku = typeof Cf.oninput == "function";
      }
      Zu = Ku;
    } else Zu = !1;
    Af = Zu && (!document.documentMode || 9 < document.documentMode);
  }
  function _f() {
    Xi && (Xi.detachEvent("onpropertychange", Df), Qi = Xi = null);
  }
  function Df(e) {
    if (e.propertyName === "value" && lr(Qi)) {
      var t = [];
      zf(
        t,
        Qi,
        e,
        Uu(e)
      ), df(yb, t);
    }
  }
  function bb(e, t, l) {
    e === "focusin" ? (_f(), Xi = t, Qi = l, Xi.attachEvent("onpropertychange", Df)) : e === "focusout" && _f();
  }
  function vb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return lr(Qi);
  }
  function xb(e, t) {
    if (e === "click") return lr(t);
  }
  function Sb(e, t) {
    if (e === "input" || e === "change")
      return lr(t);
  }
  function kb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Bt = typeof Object.is == "function" ? Object.is : kb;
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
  function Of(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Mf(e, t) {
    var l = Of(e);
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
      l = Of(l);
    }
  }
  function Nf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Nf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Rf(e) {
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
  var wb = Sn && "documentMode" in document && 11 >= document.documentMode, ti = null, Ju = null, Ki = null, Iu = !1;
  function jf(e, t, l) {
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
  function vl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var ni = {
    animationend: vl("Animation", "AnimationEnd"),
    animationiteration: vl("Animation", "AnimationIteration"),
    animationstart: vl("Animation", "AnimationStart"),
    transitionrun: vl("Transition", "TransitionRun"),
    transitionstart: vl("Transition", "TransitionStart"),
    transitioncancel: vl("Transition", "TransitionCancel"),
    transitionend: vl("Transition", "TransitionEnd")
  }, $u = {}, Lf = {};
  Sn && (Lf = document.createElement("div").style, "AnimationEvent" in window || (delete ni.animationend.animation, delete ni.animationiteration.animation, delete ni.animationstart.animation), "TransitionEvent" in window || delete ni.transitionend.transition);
  function xl(e) {
    if ($u[e]) return $u[e];
    if (!ni[e]) return e;
    var t = ni[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Lf)
        return $u[e] = t[l];
    return e;
  }
  var Uf = xl("animationend"), Bf = xl("animationiteration"), Hf = xl("animationstart"), Eb = xl("transitionrun"), zb = xl("transitionstart"), Tb = xl("transitioncancel"), qf = xl("transitionend"), Yf = /* @__PURE__ */ new Map(), Wu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Wu.push("scrollEnd");
  function rn(e, t) {
    Yf.set(e, t), yl(t, [e]);
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
      s !== 0 && Gf(l, o, s);
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
  function Gf(e, t, l) {
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
  function Ab(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ht(e, t, l, i) {
    return new Ab(e, t, l, i);
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
  function Vf(e, t) {
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
      g = M1(
        e,
        l,
        P.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case he:
          return e = Ht(31, l, t, o), e.elementType = he, e.lanes = s, e;
        case L:
          return kl(l.children, o, s, t);
        case Y:
          g = 8, o |= 24;
          break;
        case D:
          return e = Ht(12, l, t, o | 2), e.elementType = D, e.lanes = s, e;
        case fe:
          return e = Ht(13, l, t, o), e.elementType = fe, e.lanes = s, e;
        case U:
          return e = Ht(19, l, t, o), e.elementType = U, e.lanes = s, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case X:
                g = 10;
                break e;
              case Z:
                g = 9;
                break e;
              case se:
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
  function Xf(e) {
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
  var Qf = /* @__PURE__ */ new WeakMap();
  function It(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Qf.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Va(t)
      }, Qf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Va(t)
    };
  }
  var ai = [], ri = 0, sr = null, Fi = 0, $t = [], Wt = 0, Vn = null, fn = 1, hn = "";
  function wn(e, t) {
    ai[ri++] = Fi, ai[ri++] = sr, sr = e, Fi = t;
  }
  function Zf(e, t, l) {
    $t[Wt++] = fn, $t[Wt++] = hn, $t[Wt++] = Vn, Vn = e;
    var i = fn;
    e = hn;
    var o = 32 - Xe(i) - 1;
    i &= ~(1 << o), l += 1;
    var s = 32 - Xe(t) + o;
    if (30 < s) {
      var g = o - o % 5;
      s = (i & (1 << g) - 1).toString(32), i >>= g, o -= g, fn = 1 << 32 - Xe(t) + o | l << o | i, hn = s + e;
    } else
      fn = 1 << s | l << o | i, hn = e;
  }
  function io(e) {
    e.return !== null && (wn(e, 1), Zf(e, 1, 0));
  }
  function ao(e) {
    for (; e === sr; )
      sr = ai[--ri], ai[ri] = null, Fi = ai[--ri], ai[ri] = null;
    for (; e === Vn; )
      Vn = $t[--Wt], $t[Wt] = null, hn = $t[--Wt], $t[Wt] = null, fn = $t[--Wt], $t[Wt] = null;
  }
  function Kf(e, t) {
    $t[Wt++] = fn, $t[Wt++] = hn, $t[Wt++] = Vn, fn = t.id, hn = t.overflow, Vn = e;
  }
  var ht = null, Fe = null, Me = !1, Xn = null, Pt = !1, ro = Error(u(519));
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
  function Ff(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[ft] = e, t[At] = i, l) {
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
        Ce("invalid", t), uf(
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
        Ce("invalid", t), sf(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || fm(t.textContent, l) ? (i.popover != null && (Ce("beforetoggle", t), Ce("toggle", t)), i.onScroll != null && Ce("scroll", t), i.onScrollEnd != null && Ce("scrollend", t), i.onClick != null && (t.onclick = xn), t = !0) : t = !1, t || Qn(e, !0);
  }
  function Jf(e) {
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
  function ui(e) {
    if (e !== ht) return !1;
    if (!Me) return Jf(e), Me = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || zs(e.type, e.memoizedProps)), l = !l), l && Fe && Qn(e), Jf(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Fe = xm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Fe = xm(e);
    } else
      t === 27 ? (t = Fe, al(e.type) ? (e = Ds, Ds = null, Fe = e) : Fe = t) : Fe = ht ? tn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wl() {
    Fe = ht = null, Me = !1;
  }
  function uo() {
    var e = Xn;
    return e !== null && (Mt === null ? Mt = e : Mt.push.apply(
      Mt,
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
    e._currentValue = oo.current, q(oo);
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
          var v = s;
          s = o;
          for (var E = 0; E < t.length; E++)
            if (v.context === t[E]) {
              s.lanes |= l, v = s.alternate, v !== null && (v.lanes |= l), so(
                s.return,
                l,
                e
              ), i || (g = null);
              break e;
            }
          s = v.next;
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
          var v = o.type;
          Bt(o.pendingProps.value, g.value) || (e !== null ? e.push(v) : e = [v]);
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
  function dt(e) {
    return If(El, e);
  }
  function fr(e, t) {
    return El === null && zl(e), If(e, t);
  }
  function If(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, En === null) {
      if (e === null) throw Error(u(308));
      En = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else En = En.next = t;
    return l;
  }
  var Cb = typeof AbortController < "u" ? AbortController : function() {
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
  }, _b = n.unstable_scheduleCallback, Db = n.unstable_NormalPriority, tt = {
    $$typeof: X,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fo() {
    return {
      controller: new Cb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ii(e) {
    e.refCount--, e.refCount === 0 && _b(Db, function() {
      e.controller.abort();
    });
  }
  var $i = null, ho = 0, si = 0, ci = null;
  function Ob(e, t) {
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
    return ho++, t.then($f, $f), t;
  }
  function $f() {
    if (--ho === 0 && $i !== null) {
      ci !== null && (ci.status = "fulfilled");
      var e = $i;
      $i = null, si = 0, ci = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Mb(e, t) {
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
  var Wf = _.S;
  _.S = function(e, t) {
    jd = xt(), typeof t == "object" && t !== null && typeof t.then == "function" && Ob(e, t), Wf !== null && Wf(e, t);
  };
  var Tl = z(null);
  function mo() {
    var e = Tl.current;
    return e !== null ? e : Qe.pooledCache;
  }
  function hr(e, t) {
    t === null ? w(Tl, Tl.current) : w(Tl, t.pool);
  }
  function Pf() {
    var e = mo();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var fi = Error(u(460)), po = Error(u(474)), dr = Error(u(542)), mr = { then: function() {
  } };
  function eh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function th(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(xn, xn), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, lh(e), e;
      default:
        if (typeof t.status == "string") t.then(xn, xn);
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
            throw e = t.reason, lh(e), e;
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
  function nh() {
    if (Cl === null) throw Error(u(459));
    var e = Cl;
    return Cl = null, e;
  }
  function lh(e) {
    if (e === fi || e === dr)
      throw Error(u(483));
  }
  var hi = null, Wi = 0;
  function pr(e) {
    var t = Wi;
    return Wi += 1, hi === null && (hi = []), th(hi, e, t);
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
  function ih(e) {
    function t(C, T) {
      if (e) {
        var O = C.deletions;
        O === null ? (C.deletions = [T], C.flags |= 16) : O.push(T);
      }
    }
    function l(C, T) {
      if (!e) return null;
      for (; T !== null; )
        t(C, T), T = T.sibling;
      return null;
    }
    function i(C) {
      for (var T = /* @__PURE__ */ new Map(); C !== null; )
        C.key !== null ? T.set(C.key, C) : T.set(C.index, C), C = C.sibling;
      return T;
    }
    function o(C, T) {
      return C = kn(C, T), C.index = 0, C.sibling = null, C;
    }
    function s(C, T, O) {
      return C.index = O, e ? (O = C.alternate, O !== null ? (O = O.index, O < T ? (C.flags |= 67108866, T) : O) : (C.flags |= 67108866, T)) : (C.flags |= 1048576, T);
    }
    function g(C) {
      return e && C.alternate === null && (C.flags |= 67108866), C;
    }
    function v(C, T, O, V) {
      return T === null || T.tag !== 6 ? (T = no(O, C.mode, V), T.return = C, T) : (T = o(T, O), T.return = C, T);
    }
    function E(C, T, O, V) {
      var de = O.type;
      return de === L ? H(
        C,
        T,
        O.props.children,
        V,
        O.key
      ) : T !== null && (T.elementType === de || typeof de == "object" && de !== null && de.$$typeof === K && Al(de) === T.type) ? (T = o(T, O.props), Pi(T, O), T.return = C, T) : (T = or(
        O.type,
        O.key,
        O.props,
        null,
        C.mode,
        V
      ), Pi(T, O), T.return = C, T);
    }
    function M(C, T, O, V) {
      return T === null || T.tag !== 4 || T.stateNode.containerInfo !== O.containerInfo || T.stateNode.implementation !== O.implementation ? (T = lo(O, C.mode, V), T.return = C, T) : (T = o(T, O.children || []), T.return = C, T);
    }
    function H(C, T, O, V, de) {
      return T === null || T.tag !== 7 ? (T = kl(
        O,
        C.mode,
        V,
        de
      ), T.return = C, T) : (T = o(T, O), T.return = C, T);
    }
    function Q(C, T, O) {
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return T = no(
          "" + T,
          C.mode,
          O
        ), T.return = C, T;
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case x:
            return O = or(
              T.type,
              T.key,
              T.props,
              null,
              C.mode,
              O
            ), Pi(O, T), O.return = C, O;
          case A:
            return T = lo(
              T,
              C.mode,
              O
            ), T.return = C, T;
          case K:
            return T = Al(T), Q(C, T, O);
        }
        if (I(T) || ee(T))
          return T = kl(
            T,
            C.mode,
            O,
            null
          ), T.return = C, T;
        if (typeof T.then == "function")
          return Q(C, pr(T), O);
        if (T.$$typeof === X)
          return Q(
            C,
            fr(C, T),
            O
          );
        gr(C, T);
      }
      return null;
    }
    function N(C, T, O, V) {
      var de = T !== null ? T.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return de !== null ? null : v(C, T, "" + O, V);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case x:
            return O.key === de ? E(C, T, O, V) : null;
          case A:
            return O.key === de ? M(C, T, O, V) : null;
          case K:
            return O = Al(O), N(C, T, O, V);
        }
        if (I(O) || ee(O))
          return de !== null ? null : H(C, T, O, V, null);
        if (typeof O.then == "function")
          return N(
            C,
            T,
            pr(O),
            V
          );
        if (O.$$typeof === X)
          return N(
            C,
            T,
            fr(C, O),
            V
          );
        gr(C, O);
      }
      return null;
    }
    function j(C, T, O, V, de) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return C = C.get(O) || null, v(T, C, "" + V, de);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case x:
            return C = C.get(
              V.key === null ? O : V.key
            ) || null, E(T, C, V, de);
          case A:
            return C = C.get(
              V.key === null ? O : V.key
            ) || null, M(T, C, V, de);
          case K:
            return V = Al(V), j(
              C,
              T,
              O,
              V,
              de
            );
        }
        if (I(V) || ee(V))
          return C = C.get(O) || null, H(T, C, V, de, null);
        if (typeof V.then == "function")
          return j(
            C,
            T,
            O,
            pr(V),
            de
          );
        if (V.$$typeof === X)
          return j(
            C,
            T,
            O,
            fr(T, V),
            de
          );
        gr(T, V);
      }
      return null;
    }
    function ue(C, T, O, V) {
      for (var de = null, Re = null, ce = T, we = T = 0, Oe = null; ce !== null && we < O.length; we++) {
        ce.index > we ? (Oe = ce, ce = null) : Oe = ce.sibling;
        var je = N(
          C,
          ce,
          O[we],
          V
        );
        if (je === null) {
          ce === null && (ce = Oe);
          break;
        }
        e && ce && je.alternate === null && t(C, ce), T = s(je, T, we), Re === null ? de = je : Re.sibling = je, Re = je, ce = Oe;
      }
      if (we === O.length)
        return l(C, ce), Me && wn(C, we), de;
      if (ce === null) {
        for (; we < O.length; we++)
          ce = Q(C, O[we], V), ce !== null && (T = s(
            ce,
            T,
            we
          ), Re === null ? de = ce : Re.sibling = ce, Re = ce);
        return Me && wn(C, we), de;
      }
      for (ce = i(ce); we < O.length; we++)
        Oe = j(
          ce,
          C,
          we,
          O[we],
          V
        ), Oe !== null && (e && Oe.alternate !== null && ce.delete(
          Oe.key === null ? we : Oe.key
        ), T = s(
          Oe,
          T,
          we
        ), Re === null ? de = Oe : Re.sibling = Oe, Re = Oe);
      return e && ce.forEach(function(cl) {
        return t(C, cl);
      }), Me && wn(C, we), de;
    }
    function pe(C, T, O, V) {
      if (O == null) throw Error(u(151));
      for (var de = null, Re = null, ce = T, we = T = 0, Oe = null, je = O.next(); ce !== null && !je.done; we++, je = O.next()) {
        ce.index > we ? (Oe = ce, ce = null) : Oe = ce.sibling;
        var cl = N(C, ce, je.value, V);
        if (cl === null) {
          ce === null && (ce = Oe);
          break;
        }
        e && ce && cl.alternate === null && t(C, ce), T = s(cl, T, we), Re === null ? de = cl : Re.sibling = cl, Re = cl, ce = Oe;
      }
      if (je.done)
        return l(C, ce), Me && wn(C, we), de;
      if (ce === null) {
        for (; !je.done; we++, je = O.next())
          je = Q(C, je.value, V), je !== null && (T = s(je, T, we), Re === null ? de = je : Re.sibling = je, Re = je);
        return Me && wn(C, we), de;
      }
      for (ce = i(ce); !je.done; we++, je = O.next())
        je = j(ce, C, we, je.value, V), je !== null && (e && je.alternate !== null && ce.delete(je.key === null ? we : je.key), T = s(je, T, we), Re === null ? de = je : Re.sibling = je, Re = je);
      return e && ce.forEach(function(V1) {
        return t(C, V1);
      }), Me && wn(C, we), de;
    }
    function Ge(C, T, O, V) {
      if (typeof O == "object" && O !== null && O.type === L && O.key === null && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case x:
            e: {
              for (var de = O.key; T !== null; ) {
                if (T.key === de) {
                  if (de = O.type, de === L) {
                    if (T.tag === 7) {
                      l(
                        C,
                        T.sibling
                      ), V = o(
                        T,
                        O.props.children
                      ), V.return = C, C = V;
                      break e;
                    }
                  } else if (T.elementType === de || typeof de == "object" && de !== null && de.$$typeof === K && Al(de) === T.type) {
                    l(
                      C,
                      T.sibling
                    ), V = o(T, O.props), Pi(V, O), V.return = C, C = V;
                    break e;
                  }
                  l(C, T);
                  break;
                } else t(C, T);
                T = T.sibling;
              }
              O.type === L ? (V = kl(
                O.props.children,
                C.mode,
                V,
                O.key
              ), V.return = C, C = V) : (V = or(
                O.type,
                O.key,
                O.props,
                null,
                C.mode,
                V
              ), Pi(V, O), V.return = C, C = V);
            }
            return g(C);
          case A:
            e: {
              for (de = O.key; T !== null; ) {
                if (T.key === de)
                  if (T.tag === 4 && T.stateNode.containerInfo === O.containerInfo && T.stateNode.implementation === O.implementation) {
                    l(
                      C,
                      T.sibling
                    ), V = o(T, O.children || []), V.return = C, C = V;
                    break e;
                  } else {
                    l(C, T);
                    break;
                  }
                else t(C, T);
                T = T.sibling;
              }
              V = lo(O, C.mode, V), V.return = C, C = V;
            }
            return g(C);
          case K:
            return O = Al(O), Ge(
              C,
              T,
              O,
              V
            );
        }
        if (I(O))
          return ue(
            C,
            T,
            O,
            V
          );
        if (ee(O)) {
          if (de = ee(O), typeof de != "function") throw Error(u(150));
          return O = de.call(O), pe(
            C,
            T,
            O,
            V
          );
        }
        if (typeof O.then == "function")
          return Ge(
            C,
            T,
            pr(O),
            V
          );
        if (O.$$typeof === X)
          return Ge(
            C,
            T,
            fr(C, O),
            V
          );
        gr(C, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, T !== null && T.tag === 6 ? (l(C, T.sibling), V = o(T, O), V.return = C, C = V) : (l(C, T), V = no(O, C.mode, V), V.return = C, C = V), g(C)) : l(C, T);
    }
    return function(C, T, O, V) {
      try {
        Wi = 0;
        var de = Ge(
          C,
          T,
          O,
          V
        );
        return hi = null, de;
      } catch (ce) {
        if (ce === fi || ce === dr) throw ce;
        var Re = Ht(29, ce, null, C.mode);
        return Re.lanes = V, Re.return = C, Re;
      }
    };
  }
  var _l = ih(!0), ah = ih(!1), Kn = !1;
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
      return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = ur(e), Gf(e, null, l), t;
    }
    return rr(e, i, t, l), ur(e);
  }
  function ea(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Jc(e, l);
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
  var vo = !1;
  function ta() {
    if (vo) {
      var e = ci;
      if (e !== null) throw e;
    }
  }
  function na(e, t, l, i) {
    vo = !1;
    var o = e.updateQueue;
    Kn = !1;
    var s = o.firstBaseUpdate, g = o.lastBaseUpdate, v = o.shared.pending;
    if (v !== null) {
      o.shared.pending = null;
      var E = v, M = E.next;
      E.next = null, g === null ? s = M : g.next = M, g = E;
      var H = e.alternate;
      H !== null && (H = H.updateQueue, v = H.lastBaseUpdate, v !== g && (v === null ? H.firstBaseUpdate = M : v.next = M, H.lastBaseUpdate = E));
    }
    if (s !== null) {
      var Q = o.baseState;
      g = 0, H = M = E = null, v = s;
      do {
        var N = v.lane & -536870913, j = N !== v.lane;
        if (j ? (De & N) === N : (i & N) === N) {
          N !== 0 && N === si && (vo = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          e: {
            var ue = e, pe = v;
            N = t;
            var Ge = l;
            switch (pe.tag) {
              case 1:
                if (ue = pe.payload, typeof ue == "function") {
                  Q = ue.call(Ge, Q, N);
                  break e;
                }
                Q = ue;
                break e;
              case 3:
                ue.flags = ue.flags & -65537 | 128;
              case 0:
                if (ue = pe.payload, N = typeof ue == "function" ? ue.call(Ge, Q, N) : ue, N == null) break e;
                Q = y({}, Q, N);
                break e;
              case 2:
                Kn = !0;
            }
          }
          N = v.callback, N !== null && (e.flags |= 64, j && (e.flags |= 8192), j = o.callbacks, j === null ? o.callbacks = [N] : j.push(N));
        } else
          j = {
            lane: N,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, H === null ? (M = H = j, E = Q) : H = H.next = j, g |= N;
        if (v = v.next, v === null) {
          if (v = o.shared.pending, v === null)
            break;
          j = v, v = j.next, j.next = null, o.lastBaseUpdate = j, o.shared.pending = null;
        }
      } while (!0);
      H === null && (E = Q), o.baseState = E, o.firstBaseUpdate = M, o.lastBaseUpdate = H, s === null && (o.shared.lanes = 0), el |= g, e.lanes = g, e.memoizedState = Q;
    }
  }
  function rh(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function uh(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        rh(l[e], t);
  }
  var di = z(null), yr = z(0);
  function oh(e, t) {
    e = Rn, w(yr, e), w(di, t), Rn = e | t.baseLanes;
  }
  function xo() {
    w(yr, Rn), w(di, di.current);
  }
  function So() {
    Rn = yr.current, q(di), q(yr);
  }
  var qt = z(null), en = null;
  function In(e) {
    var t = e.alternate;
    w(Pe, Pe.current & 1), w(qt, e), en === null && (t === null || di.current !== null || t.memoizedState !== null) && (en = e);
  }
  function ko(e) {
    w(Pe, Pe.current), w(qt, e), en === null && (en = e);
  }
  function sh(e) {
    e.tag === 22 ? (w(Pe, Pe.current), w(qt, e), en === null && (en = e)) : $n();
  }
  function $n() {
    w(Pe, Pe.current), w(qt, qt.current);
  }
  function Yt(e) {
    q(qt), en === e && (en = null), q(Pe);
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
  var Tn = 0, Se = null, qe = null, nt = null, vr = !1, mi = !1, Dl = !1, xr = 0, la = 0, pi = null, Nb = 0;
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
    return Tn = s, Se = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = e === null || e.memoizedState === null ? Zh : Ho, Dl = !1, s = l(i, o), Dl = !1, mi && (s = fh(
      t,
      l,
      i,
      o
    )), ch(e), s;
  }
  function ch(e) {
    _.H = ra;
    var t = qe !== null && qe.next !== null;
    if (Tn = 0, nt = qe = Se = null, vr = !1, la = 0, pi = null, t) throw Error(u(300));
    e === null || lt || (e = e.dependencies, e !== null && cr(e) && (lt = !0));
  }
  function fh(e, t, l, i) {
    Se = e;
    var o = 0;
    do {
      if (mi && (pi = null), la = 0, mi = !1, 25 <= o) throw Error(u(301));
      if (o += 1, nt = qe = null, e.updateQueue != null) {
        var s = e.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      _.H = Kh, s = t(l, i);
    } while (mi);
    return s;
  }
  function Rb() {
    var e = _.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? ia(t) : t, e = e.useState()[0], (qe !== null ? qe.memoizedState : null) !== e && (Se.flags |= 1024), t;
  }
  function zo() {
    var e = xr !== 0;
    return xr = 0, e;
  }
  function To(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Ao(e) {
    if (vr) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      vr = !1;
    }
    Tn = 0, nt = qe = Se = null, mi = !1, la = xr = 0, pi = null;
  }
  function kt() {
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
    return la += 1, pi === null && (pi = []), e = th(pi, e, t), t = Se, (nt === null ? t.memoizedState : nt.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? Zh : Ho), e;
  }
  function kr(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ia(e);
      if (e.$$typeof === X) return dt(e);
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
        l[i] = R;
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
      var v = g = null, E = null, M = t, H = !1;
      do {
        var Q = M.lane & -536870913;
        if (Q !== M.lane ? (De & Q) === Q : (Tn & Q) === Q) {
          var N = M.revertLane;
          if (N === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }), Q === si && (H = !0);
          else if ((Tn & N) === N) {
            M = M.next, N === si && (H = !0);
            continue;
          } else
            Q = {
              lane: 0,
              revertLane: M.revertLane,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }, E === null ? (v = E = Q, g = s) : E = E.next = Q, Se.lanes |= N, el |= N;
          Q = M.action, Dl && l(s, Q), s = M.hasEagerState ? M.eagerState : l(s, Q);
        } else
          N = {
            lane: Q,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }, E === null ? (v = E = N, g = s) : E = E.next = N, Se.lanes |= Q, el |= Q;
        M = M.next;
      } while (M !== null && M !== t);
      if (E === null ? g = s : E.next = v, !Bt(s, e.memoizedState) && (lt = !0, H && (l = ci, l !== null)))
        throw l;
      e.memoizedState = s, e.baseState = g, e.baseQueue = E, i.lastRenderedState = s;
    }
    return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Do(e) {
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
  function hh(e, t, l) {
    var i = Se, o = et(), s = Me;
    if (s) {
      if (l === void 0) throw Error(u(407));
      l = l();
    } else l = t();
    var g = !Bt(
      (qe || o).memoizedState,
      l
    );
    if (g && (o.memoizedState = l, lt = !0), o = o.queue, No(ph.bind(null, i, o, e), [
      e
    ]), o.getSnapshot !== t || g || nt !== null && nt.memoizedState.tag & 1) {
      if (i.flags |= 2048, gi(
        9,
        { destroy: void 0 },
        mh.bind(
          null,
          i,
          o,
          l,
          t
        ),
        null
      ), Qe === null) throw Error(u(349));
      s || (Tn & 127) !== 0 || dh(i, t, l);
    }
    return l;
  }
  function dh(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = Se.updateQueue, t === null ? (t = Sr(), Se.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function mh(e, t, l, i) {
    t.value = l, t.getSnapshot = i, gh(t) && yh(e);
  }
  function ph(e, t, l) {
    return l(function() {
      gh(t) && yh(e);
    });
  }
  function gh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Bt(e, l);
    } catch {
      return !0;
    }
  }
  function yh(e) {
    var t = Sl(e, 2);
    t !== null && Nt(t, e, 2);
  }
  function Oo(e) {
    var t = kt();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Dl) {
        Tt(!0);
        try {
          l();
        } finally {
          Tt(!1);
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
  function bh(e, t, l, i) {
    return e.baseState = l, _o(
      e,
      qe,
      typeof i == "function" ? i : An
    );
  }
  function jb(e, t, l, i, o) {
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
      _.T !== null ? l(!0) : s.isTransition = !1, i(s), l = t.pending, l === null ? (s.next = t.pending = s, vh(t, s)) : (s.next = l.next, t.pending = l.next = s);
    }
  }
  function vh(e, t) {
    var l = t.action, i = t.payload, o = e.state;
    if (t.isTransition) {
      var s = _.T, g = {};
      _.T = g;
      try {
        var v = l(o, i), E = _.S;
        E !== null && E(g, v), xh(e, t, v);
      } catch (M) {
        Mo(e, t, M);
      } finally {
        s !== null && g.types !== null && (s.types = g.types), _.T = s;
      }
    } else
      try {
        s = l(o, i), xh(e, t, s);
      } catch (M) {
        Mo(e, t, M);
      }
  }
  function xh(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Sh(e, t, i);
      },
      function(i) {
        return Mo(e, t, i);
      }
    ) : Sh(e, t, l);
  }
  function Sh(e, t, l) {
    t.status = "fulfilled", t.value = l, kh(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, vh(e, l)));
  }
  function Mo(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, kh(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function kh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function wh(e, t) {
    return t;
  }
  function Eh(e, t) {
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
    return l = kt(), l.memoizedState = l.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wh,
      lastRenderedState: t
    }, l.queue = i, l = Vh.bind(
      null,
      Se,
      i
    ), i.dispatch = l, i = Oo(!1), s = Bo.bind(
      null,
      Se,
      !1,
      i.queue
    ), i = kt(), o = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = o, l = jb.bind(
      null,
      Se,
      o,
      s,
      l
    ), o.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function zh(e) {
    var t = et();
    return Th(t, qe, e);
  }
  function Th(e, t, l) {
    if (t = _o(
      e,
      t,
      wh
    )[0], e = wr(An)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = ia(t);
      } catch (g) {
        throw g === fi ? dr : g;
      }
    else i = t;
    t = et();
    var o = t.queue, s = o.dispatch;
    return l !== t.memoizedState && (Se.flags |= 2048, gi(
      9,
      { destroy: void 0 },
      Lb.bind(null, o, l),
      null
    )), [i, s, e];
  }
  function Lb(e, t) {
    e.action = t;
  }
  function Ah(e) {
    var t = et(), l = qe;
    if (l !== null)
      return Th(t, l, e);
    et(), t = t.memoizedState, l = et();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function gi(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = Se.updateQueue, t === null && (t = Sr(), Se.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Ch() {
    return et().memoizedState;
  }
  function Er(e, t, l, i) {
    var o = kt();
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
  function _h(e, t) {
    Er(8390656, 8, e, t);
  }
  function No(e, t) {
    zr(2048, 8, e, t);
  }
  function Ub(e) {
    Se.flags |= 4;
    var t = Se.updateQueue;
    if (t === null)
      t = Sr(), Se.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Dh(e) {
    var t = et().memoizedState;
    return Ub({ ref: t, nextImpl: e }), function() {
      if ((Le & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Oh(e, t) {
    return zr(4, 2, e, t);
  }
  function Mh(e, t) {
    return zr(4, 4, e, t);
  }
  function Nh(e, t) {
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
  function Rh(e, t, l) {
    l = l != null ? l.concat([e]) : null, zr(4, 4, Nh.bind(null, t, e), l);
  }
  function Ro() {
  }
  function jh(e, t) {
    var l = et();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && wo(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function Lh(e, t) {
    var l = et();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && wo(t, i[1]))
      return i[0];
    if (i = e(), Dl) {
      Tt(!0);
      try {
        e();
      } finally {
        Tt(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function jo(e, t, l) {
    return l === void 0 || (Tn & 1073741824) !== 0 && (De & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Ud(), Se.lanes |= e, el |= e, l);
  }
  function Uh(e, t, l, i) {
    return Bt(l, t) ? l : di.current !== null ? (e = jo(e, l, i), Bt(e, t) || (lt = !0), e) : (Tn & 42) === 0 || (Tn & 1073741824) !== 0 && (De & 261930) === 0 ? (lt = !0, e.memoizedState = l) : (e = Ud(), Se.lanes |= e, el |= e, t);
  }
  function Bh(e, t, l, i, o) {
    var s = F.p;
    F.p = s !== 0 && 8 > s ? s : 8;
    var g = _.T, v = {};
    _.T = v, Bo(e, !1, t, l);
    try {
      var E = o(), M = _.S;
      if (M !== null && M(v, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var H = Mb(
          E,
          i
        );
        aa(
          e,
          t,
          H,
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
      F.p = s, g !== null && v.types !== null && (g.types = v.types), _.T = g;
    }
  }
  function Bb() {
  }
  function Lo(e, t, l, i) {
    if (e.tag !== 5) throw Error(u(476));
    var o = Hh(e).queue;
    Bh(
      e,
      o,
      t,
      oe,
      l === null ? Bb : function() {
        return qh(e), l(i);
      }
    );
  }
  function Hh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: oe,
      baseState: oe,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: An,
        lastRenderedState: oe
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
  function qh(e) {
    var t = Hh(e);
    t.next === null && (t = e.alternate.memoizedState), aa(
      e,
      t.next.queue,
      {},
      Xt()
    );
  }
  function Uo() {
    return dt(ka);
  }
  function Yh() {
    return et().memoizedState;
  }
  function Gh() {
    return et().memoizedState;
  }
  function Hb(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Xt();
          e = Fn(l);
          var i = Jn(t, e, l);
          i !== null && (Nt(i, t, l), ea(i, t, l)), t = { cache: fo() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function qb(e, t, l) {
    var i = Xt();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Tr(e) ? Xh(t, l) : (l = eo(e, t, l, i), l !== null && (Nt(l, e, i), Qh(l, t, i)));
  }
  function Vh(e, t, l) {
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
    if (Tr(e)) Xh(t, o);
    else {
      var s = e.alternate;
      if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null))
        try {
          var g = t.lastRenderedState, v = s(g, l);
          if (o.hasEagerState = !0, o.eagerState = v, Bt(v, g))
            return rr(e, t, o, 0), Qe === null && ar(), !1;
        } catch {
        }
      if (l = eo(e, t, o, i), l !== null)
        return Nt(l, e, i), Qh(l, t, i), !0;
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
      ), t !== null && Nt(t, e, 2);
  }
  function Tr(e) {
    var t = e.alternate;
    return e === Se || t !== null && t === Se;
  }
  function Xh(e, t) {
    mi = vr = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Qh(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Jc(e, l);
    }
  }
  var ra = {
    readContext: dt,
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
  var Zh = {
    readContext: dt,
    use: kr,
    useCallback: function(e, t) {
      return kt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: dt,
    useEffect: _h,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Er(
        4194308,
        4,
        Nh.bind(null, t, e),
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
      var l = kt();
      t = t === void 0 ? null : t;
      var i = e();
      if (Dl) {
        Tt(!0);
        try {
          e();
        } finally {
          Tt(!1);
        }
      }
      return l.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, l) {
      var i = kt();
      if (l !== void 0) {
        var o = l(t);
        if (Dl) {
          Tt(!0);
          try {
            l(t);
          } finally {
            Tt(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = qb.bind(
        null,
        Se,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = kt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Oo(e);
      var t = e.queue, l = Vh.bind(null, Se, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Ro,
    useDeferredValue: function(e, t) {
      var l = kt();
      return jo(l, e, t);
    },
    useTransition: function() {
      var e = Oo(!1);
      return e = Bh.bind(
        null,
        Se,
        e.queue,
        !0,
        !1
      ), kt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = Se, o = kt();
      if (Me) {
        if (l === void 0)
          throw Error(u(407));
        l = l();
      } else {
        if (l = t(), Qe === null)
          throw Error(u(349));
        (De & 127) !== 0 || dh(i, t, l);
      }
      o.memoizedState = l;
      var s = { value: l, getSnapshot: t };
      return o.queue = s, _h(ph.bind(null, i, s, e), [
        e
      ]), i.flags |= 2048, gi(
        9,
        { destroy: void 0 },
        mh.bind(
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
      var e = kt(), t = Qe.identifierPrefix;
      if (Me) {
        var l = hn, i = fn;
        l = (i & ~(1 << 32 - Xe(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = xr++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Nb++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Uo,
    useFormState: Eh,
    useActionState: Eh,
    useOptimistic: function(e) {
      var t = kt();
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
      return kt().memoizedState = Hb.bind(
        null,
        Se
      );
    },
    useEffectEvent: function(e) {
      var t = kt(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Le & 2) !== 0)
          throw Error(u(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Ho = {
    readContext: dt,
    use: kr,
    useCallback: jh,
    useContext: dt,
    useEffect: No,
    useImperativeHandle: Rh,
    useInsertionEffect: Oh,
    useLayoutEffect: Mh,
    useMemo: Lh,
    useReducer: wr,
    useRef: Ch,
    useState: function() {
      return wr(An);
    },
    useDebugValue: Ro,
    useDeferredValue: function(e, t) {
      var l = et();
      return Uh(
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
    useSyncExternalStore: hh,
    useId: Yh,
    useHostTransitionStatus: Uo,
    useFormState: zh,
    useActionState: zh,
    useOptimistic: function(e, t) {
      var l = et();
      return bh(l, qe, e, t);
    },
    useMemoCache: Co,
    useCacheRefresh: Gh
  };
  Ho.useEffectEvent = Dh;
  var Kh = {
    readContext: dt,
    use: kr,
    useCallback: jh,
    useContext: dt,
    useEffect: No,
    useImperativeHandle: Rh,
    useInsertionEffect: Oh,
    useLayoutEffect: Mh,
    useMemo: Lh,
    useReducer: Do,
    useRef: Ch,
    useState: function() {
      return Do(An);
    },
    useDebugValue: Ro,
    useDeferredValue: function(e, t) {
      var l = et();
      return qe === null ? jo(l, e, t) : Uh(
        l,
        qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Do(An)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : ia(e),
        t
      ];
    },
    useSyncExternalStore: hh,
    useId: Yh,
    useHostTransitionStatus: Uo,
    useFormState: Ah,
    useActionState: Ah,
    useOptimistic: function(e, t) {
      var l = et();
      return qe !== null ? bh(l, qe, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Co,
    useCacheRefresh: Gh
  };
  Kh.useEffectEvent = Dh;
  function qo(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : y({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Yo = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), o = Fn(i);
      o.payload = t, l != null && (o.callback = l), t = Jn(e, o, i), t !== null && (Nt(t, e, i), ea(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Xt(), o = Fn(i);
      o.tag = 1, o.payload = t, l != null && (o.callback = l), t = Jn(e, o, i), t !== null && (Nt(t, e, i), ea(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Xt(), i = Fn(l);
      i.tag = 2, t != null && (i.callback = t), t = Jn(e, i, l), t !== null && (Nt(t, e, l), ea(t, e, l));
    }
  };
  function Fh(e, t, l, i, o, s, g) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, s, g) : t.prototype && t.prototype.isPureReactComponent ? !Zi(l, i) || !Zi(o, s) : !0;
  }
  function Jh(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && Yo.enqueueReplaceState(t, t.state, null);
  }
  function Ol(e, t) {
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
  function Ih(e) {
    ir(e);
  }
  function $h(e) {
    console.error(e);
  }
  function Wh(e) {
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
  function Ph(e, t, l) {
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
  function ed(e) {
    return e = Fn(e), e.tag = 3, e;
  }
  function td(e, t, l, i) {
    var o = l.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var s = i.value;
      e.payload = function() {
        return o(s);
      }, e.callback = function() {
        Ph(t, l, i);
      };
    }
    var g = l.stateNode;
    g !== null && typeof g.componentDidCatch == "function" && (e.callback = function() {
      Ph(t, l, i), typeof o != "function" && (tl === null ? tl = /* @__PURE__ */ new Set([this]) : tl.add(this));
      var v = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: v !== null ? v : ""
      });
    });
  }
  function Yb(e, t, l, i, o) {
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
            return en === null ? Hr() : l.alternate === null && We === 0 && (We = 3), l.flags &= -257, l.flags |= 65536, l.lanes = o, i === mr ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), ds(e, i, o)), !1;
          case 22:
            return l.flags |= 65536, i === mr ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), ds(e, i, o)), !1;
        }
        throw Error(u(435, l.tag));
      }
      return ds(e, i, o), Hr(), !1;
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
            return l.flags |= 65536, o &= -o, l.lanes |= o, o = ed(o), td(
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
    t.child = e === null ? ah(t, null, l, i) : _l(
      t,
      e.child,
      l,
      i
    );
  }
  function nd(e, t, l, i, o) {
    l = l.render;
    var s = t.ref;
    if ("ref" in i) {
      var g = {};
      for (var v in i)
        v !== "ref" && (g[v] = i[v]);
    } else g = i;
    return zl(t), i = Eo(
      e,
      t,
      l,
      g,
      s,
      o
    ), v = zo(), e !== null && !lt ? (To(e, t, o), Cn(e, t, o)) : (Me && v && io(t), t.flags |= 1, mt(e, t, i, o), t.child);
  }
  function ld(e, t, l, i, o) {
    if (e === null) {
      var s = l.type;
      return typeof s == "function" && !to(s) && s.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = s, id(
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
  function id(e, t, l, i, o) {
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
  function ad(e, t, l, i) {
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
        return rd(
          e,
          t,
          s,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && hr(
          t,
          s !== null ? s.cachePool : null
        ), s !== null ? oh(t, s) : xo(), sh(t);
      else
        return i = t.lanes = 536870912, rd(
          e,
          t,
          s !== null ? s.baseLanes | l : l,
          l,
          i
        );
    } else
      s !== null ? (hr(t, s.cachePool), oh(t, s), $n(), t.memoizedState = null) : (e !== null && hr(t, null), xo(), $n());
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
  function rd(e, t, l, i, o) {
    var s = mo();
    return s = s === null ? null : { parent: tt._currentValue, pool: s }, t.memoizedState = {
      baseLanes: l,
      cachePool: s
    }, e !== null && hr(t, null), xo(), sh(t), e !== null && oi(e, t, i, !0), t.childLanes = o, null;
  }
  function Cr(e, t) {
    return t = Dr(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ud(e, t, l) {
    return _l(t, e.child, null, l), e = Cr(t, t.pendingProps), e.flags |= 2, Yt(t), t.memoizedState = null, e;
  }
  function Gb(e, t, l) {
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
          treeContext: Vn !== null ? { id: fn, overflow: hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Xf(e), l.return = t, t.child = l, ht = t, Fe = null)) : e = null, e === null) throw Qn(t);
        return t.lanes = 536870912, null;
      }
      return Cr(t, i);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var g = s.dehydrated;
      if (ko(t), o)
        if (t.flags & 256)
          t.flags &= -257, t = ud(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (lt || oi(e, t, l, !1), o = (l & e.childLanes) !== 0, lt || o) {
        if (i = Qe, i !== null && (g = Ic(i, l), g !== 0 && g !== s.retryLane))
          throw s.retryLane = g, Sl(e, g), Nt(i, e, g), Vo;
        Hr(), t = ud(
          e,
          t,
          l
        );
      } else
        e = s.treeContext, Fe = tn(g.nextSibling), ht = t, Me = !0, Xn = null, Pt = !1, e !== null && Kf(t, e), t = Cr(t, i), t.flags |= 4096;
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
  function od(e, t, l, i, o, s) {
    return zl(t), t.updateQueue = null, l = fh(
      t,
      i,
      l,
      o
    ), ch(e), i = zo(), e !== null && !lt ? (To(e, t, s), Cn(e, t, s)) : (Me && i && io(t), t.flags |= 1, mt(e, t, l, s), t.child);
  }
  function sd(e, t, l, i, o) {
    if (zl(t), t.stateNode === null) {
      var s = ii, g = l.contextType;
      typeof g == "object" && g !== null && (s = dt(g)), s = new l(i, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Yo, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = i, s.state = t.memoizedState, s.refs = {}, go(t), g = l.contextType, s.context = typeof g == "object" && g !== null ? dt(g) : ii, s.state = t.memoizedState, g = l.getDerivedStateFromProps, typeof g == "function" && (qo(
        t,
        l,
        g,
        i
      ), s.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (g = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), g !== s.state && Yo.enqueueReplaceState(s, s.state, null), na(t, i, s, o), ta(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      s = t.stateNode;
      var v = t.memoizedProps, E = Ol(l, v);
      s.props = E;
      var M = s.context, H = l.contextType;
      g = ii, typeof H == "object" && H !== null && (g = dt(H));
      var Q = l.getDerivedStateFromProps;
      H = typeof Q == "function" || typeof s.getSnapshotBeforeUpdate == "function", v = t.pendingProps !== v, H || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (v || M !== g) && Jh(
        t,
        s,
        i,
        g
      ), Kn = !1;
      var N = t.memoizedState;
      s.state = N, na(t, i, s, o), ta(), M = t.memoizedState, v || N !== M || Kn ? (typeof Q == "function" && (qo(
        t,
        l,
        Q,
        i
      ), M = t.memoizedState), (E = Kn || Fh(
        t,
        l,
        E,
        i,
        N,
        M,
        g
      )) ? (H || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = M), s.props = i, s.state = M, s.context = g, i = E) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      s = t.stateNode, yo(e, t), g = t.memoizedProps, H = Ol(l, g), s.props = H, Q = t.pendingProps, N = s.context, M = l.contextType, E = ii, typeof M == "object" && M !== null && (E = dt(M)), v = l.getDerivedStateFromProps, (M = typeof v == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (g !== Q || N !== E) && Jh(
        t,
        s,
        i,
        E
      ), Kn = !1, N = t.memoizedState, s.state = N, na(t, i, s, o), ta();
      var j = t.memoizedState;
      g !== Q || N !== j || Kn || e !== null && e.dependencies !== null && cr(e.dependencies) ? (typeof v == "function" && (qo(
        t,
        l,
        v,
        i
      ), j = t.memoizedState), (H = Kn || Fh(
        t,
        l,
        H,
        i,
        N,
        j,
        E
      ) || e !== null && e.dependencies !== null && cr(e.dependencies)) ? (M || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, j, E), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        i,
        j,
        E
      )), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = j), s.props = i, s.state = j, s.context = E, i = H) : (typeof s.componentDidUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || g === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), i = !1);
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
  function cd(e, t, l, i) {
    return wl(), t.flags |= 256, mt(e, t, l, i), t.child;
  }
  var Qo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Zo(e) {
    return { baseLanes: e, cachePool: Pf() };
  }
  function Ko(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Vt), e;
  }
  function fd(e, t, l) {
    var i = t.pendingProps, o = !1, s = (t.flags & 128) !== 0, g;
    if ((g = s) || (g = e !== null && e.memoizedState === null ? !1 : (Pe.current & 2) !== 0), g && (o = !0, t.flags &= -129), g = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Me) {
        if (o ? In(t) : $n(), (e = Fe) ? (e = vm(
          e,
          Pt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Vn !== null ? { id: fn, overflow: hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Xf(e), l.return = t, t.child = l, ht = t, Fe = null)) : e = null, e === null) throw Qn(t);
        return _s(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var v = i.children;
      return i = i.fallback, o ? ($n(), o = t.mode, v = Dr(
        { mode: "hidden", children: v },
        o
      ), i = kl(
        i,
        o,
        l,
        null
      ), v.return = t, i.return = t, v.sibling = i, t.child = v, i = t.child, i.memoizedState = Zo(l), i.childLanes = Ko(
        e,
        g,
        l
      ), t.memoizedState = Qo, ua(null, i)) : (In(t), Fo(t, v));
    }
    var E = e.memoizedState;
    if (E !== null && (v = E.dehydrated, v !== null)) {
      if (s)
        t.flags & 256 ? (In(t), t.flags &= -257, t = Jo(
          e,
          t,
          l
        )) : t.memoizedState !== null ? ($n(), t.child = e.child, t.flags |= 128, t = null) : ($n(), v = i.fallback, o = t.mode, i = Dr(
          { mode: "visible", children: i.children },
          o
        ), v = kl(
          v,
          o,
          l,
          null
        ), v.flags |= 2, i.return = t, v.return = t, i.sibling = v, t.child = i, _l(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = Zo(l), i.childLanes = Ko(
          e,
          g,
          l
        ), t.memoizedState = Qo, t = ua(null, i));
      else if (In(t), _s(v)) {
        if (g = v.nextSibling && v.nextSibling.dataset, g) var M = g.dgst;
        g = M, i = Error(u(419)), i.stack = "", i.digest = g, Ji({ value: i, source: null, stack: null }), t = Jo(
          e,
          t,
          l
        );
      } else if (lt || oi(e, t, l, !1), g = (l & e.childLanes) !== 0, lt || g) {
        if (g = Qe, g !== null && (i = Ic(g, l), i !== 0 && i !== E.retryLane))
          throw E.retryLane = i, Sl(e, i), Nt(g, e, i), Vo;
        Cs(v) || Hr(), t = Jo(
          e,
          t,
          l
        );
      } else
        Cs(v) ? (t.flags |= 192, t.child = e.child, t = null) : (e = E.treeContext, Fe = tn(
          v.nextSibling
        ), ht = t, Me = !0, Xn = null, Pt = !1, e !== null && Kf(t, e), t = Fo(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return o ? ($n(), v = i.fallback, o = t.mode, E = e.child, M = E.sibling, i = kn(E, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = E.subtreeFlags & 65011712, M !== null ? v = kn(
      M,
      v
    ) : (v = kl(
      v,
      o,
      l,
      null
    ), v.flags |= 2), v.return = t, i.return = t, i.sibling = v, t.child = i, ua(null, i), i = t.child, v = e.child.memoizedState, v === null ? v = Zo(l) : (o = v.cachePool, o !== null ? (E = tt._currentValue, o = o.parent !== E ? { parent: E, pool: E } : o) : o = Pf(), v = {
      baseLanes: v.baseLanes | l,
      cachePool: o
    }), i.memoizedState = v, i.childLanes = Ko(
      e,
      g,
      l
    ), t.memoizedState = Qo, ua(e.child, i)) : (In(t), l = e.child, e = l.sibling, l = kn(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (g = t.deletions, g === null ? (t.deletions = [e], t.flags |= 16) : g.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Fo(e, t) {
    return t = Dr(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Dr(e, t) {
    return e = Ht(22, e, null, t), e.lanes = 0, e;
  }
  function Jo(e, t, l) {
    return _l(t, e.child, null, l), e = Fo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function hd(e, t, l) {
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
  function dd(e, t, l) {
    var i = t.pendingProps, o = i.revealOrder, s = i.tail;
    i = i.children;
    var g = Pe.current, v = (g & 2) !== 0;
    if (v ? (g = g & 1 | 2, t.flags |= 128) : g &= 1, w(Pe, g), mt(e, t, i, l), i = Me ? Fi : 0, !v && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && hd(e, l, t);
        else if (e.tag === 19)
          hd(e, l, t);
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
  function Vb(e, t, l) {
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
          return i.dehydrated !== null ? (In(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? fd(e, t, l) : (In(t), e = Cn(
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
            return dd(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), w(Pe, Pe.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, ad(
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
  function md(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        lt = !0;
      else {
        if (!$o(e, l) && (t.flags & 128) === 0)
          return lt = !1, Vb(
            e,
            t,
            l
          );
        lt = (e.flags & 131072) !== 0;
      }
    else
      lt = !1, Me && (t.flags & 1048576) !== 0 && Zf(t, Fi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Al(t.elementType), t.type = e, typeof e == "function")
            to(e) ? (i = Ol(e, i), t.tag = 1, t = sd(
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
              if (o === se) {
                t.tag = 11, t = nd(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (o === $) {
                t.tag = 14, t = ld(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              }
            }
            throw t = re(e) || e, Error(u(306, t, ""));
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
        return i = t.type, o = Ol(
          i,
          t.pendingProps
        ), sd(
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
              t = cd(
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
              ), Ji(o), t = cd(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Fe = tn(e.firstChild), ht = t, Me = !0, Xn = null, Pt = !0, l = ah(
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
        return _r(e, t), e === null ? (l = zm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : Me || (l = t.type, e = t.pendingProps, i = Zr(
          ne.current
        ).createElement(l), i[ft] = t, i[At] = e, pt(i, l, e), st(i), t.stateNode = i) : t.memoizedState = zm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return vt(t), e === null && Me && (i = t.stateNode = km(
          t.type,
          t.pendingProps,
          ne.current
        ), ht = t, Pt = !0, o = Fe, al(t.type) ? (Ds = o, Fe = tn(i.firstChild)) : Fe = o), mt(
          e,
          t,
          t.pendingProps.children,
          l
        ), _r(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Me && ((o = i = Fe) && (i = v1(
          i,
          t.type,
          t.pendingProps,
          Pt
        ), i !== null ? (t.stateNode = i, ht = t, Fe = tn(i.firstChild), Pt = !1, o = !0) : o = !1), o || Qn(t)), vt(t), o = t.type, s = t.pendingProps, g = e !== null ? e.memoizedProps : null, i = s.children, zs(o, s) ? i = null : g !== null && zs(o, g) && (t.flags |= 32), t.memoizedState !== null && (o = Eo(
          e,
          t,
          Rb,
          null,
          null,
          l
        ), ka._currentValue = o), _r(e, t), mt(e, t, i, l), t.child;
      case 6:
        return e === null && Me && ((e = l = Fe) && (l = x1(
          l,
          t.pendingProps,
          Pt
        ), l !== null ? (t.stateNode = l, ht = t, Fe = null, e = !0) : e = !1), e || Qn(t)), null;
      case 13:
        return fd(e, t, l);
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
        return nd(
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
        return o = t.type._context, i = t.pendingProps.children, zl(t), o = dt(o), i = i(o), t.flags |= 1, mt(e, t, i, l), t.child;
      case 14:
        return ld(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return id(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return dd(e, t, l);
      case 31:
        return Gb(e, t, l);
      case 22:
        return ad(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return zl(t), i = dt(tt), e === null ? (o = mo(), o === null && (o = Qe, s = fo(), o.pooledCache = s, s.refCount++, s !== null && (o.pooledCacheLanes |= l), o = s), t.memoizedState = { parent: i, cache: o }, go(t), Zn(t, tt, o)) : ((e.lanes & l) !== 0 && (yo(e, t), na(t, null, null, l), ta()), o = e.memoizedState, s = t.memoizedState, o.parent !== i ? (o = { parent: i, cache: i }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Zn(t, tt, i)) : (i = s.cache, Zn(t, tt, i), i !== o.cache && co(
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
        else if (Yd()) e.flags |= 8192;
        else
          throw Cl = mr, po;
    } else e.flags &= -16777217;
  }
  function pd(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Dm(t))
      if (Yd()) e.flags |= 8192;
      else
        throw Cl = mr, po;
  }
  function Or(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Kc() : 536870912, e.lanes |= t, xi |= t);
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
  function Xb(e, t, l) {
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
        return e === null ? (_n(t), s !== null ? (Je(t), pd(t, s)) : (Je(t), Wo(
          t,
          o,
          null,
          i,
          l
        ))) : s ? s !== e.memoizedState ? (_n(t), Je(t), pd(t, s)) : (Je(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && _n(t), Je(t), Wo(
          t,
          o,
          e,
          i,
          l
        )), null;
      case 27:
        if (Et(t), l = ne.current, o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Je(t), null;
          }
          e = P.current, ui(t) ? Ff(t) : (e = km(o, i, l), t.stateNode = e, _n(t));
        }
        return Je(t), null;
      case 5:
        if (Et(t), o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Je(t), null;
          }
          if (s = P.current, ui(t))
            Ff(t);
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
            s[ft] = t, s[At] = i;
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
            if (e = t.stateNode, l = t.memoizedProps, i = null, o = ht, o !== null)
              switch (o.tag) {
                case 27:
                case 5:
                  i = o.memoizedProps;
              }
            e[ft] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || fm(e.nodeValue, l)), e || Qn(t, !0);
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
        return Yt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== o && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Or(t, t.updateQueue), Je(t), null);
      case 4:
        return ye(), e === null && xs(t.stateNode.containerInfo), Je(t), null;
      case 10:
        return zn(t.type), Je(t), null;
      case 19:
        if (q(Pe), i = t.memoizedState, i === null) return Je(t), null;
        if (o = (t.flags & 128) !== 0, s = i.rendering, s === null)
          if (o) oa(i, !1);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (s = br(e), s !== null) {
                  for (t.flags |= 128, oa(i, !1), e = s.updateQueue, t.updateQueue = e, Or(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    Vf(l, e), l = l.sibling;
                  return w(
                    Pe,
                    Pe.current & 1 | 2
                  ), Me && wn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && xt() > Lr && (t.flags |= 128, o = !0, oa(i, !1), t.lanes = 4194304);
          }
        else {
          if (!o)
            if (e = br(s), e !== null) {
              if (t.flags |= 128, o = !0, e = e.updateQueue, t.updateQueue = e, Or(t, e), oa(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !Me)
                return Je(t), null;
            } else
              2 * xt() - i.renderingStartTime > Lr && l !== 536870912 && (t.flags |= 128, o = !0, oa(i, !1), t.lanes = 4194304);
          i.isBackwards ? (s.sibling = t.child, t.child = s) : (e = i.last, e !== null ? e.sibling = s : t.child = s, i.last = s);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = xt(), e.sibling = null, l = Pe.current, w(
          Pe,
          o ? l & 1 | 2 : l & 1
        ), Me && wn(t, i.treeForkCount), e) : (Je(t), null);
      case 22:
      case 23:
        return Yt(t), So(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Je(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Je(t), l = t.updateQueue, l !== null && Or(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && q(Tl), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), zn(tt), Je(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Qb(e, t) {
    switch (ao(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zn(tt), ye(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Et(t), null;
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
        return q(Pe), null;
      case 4:
        return ye(), null;
      case 10:
        return zn(t.type), null;
      case 22:
      case 23:
        return Yt(t), So(), e !== null && q(Tl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return zn(tt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gd(e, t) {
    switch (ao(t), t.tag) {
      case 3:
        zn(tt), ye();
        break;
      case 26:
      case 27:
      case 5:
        Et(t);
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
        q(Pe);
        break;
      case 10:
        zn(t.type);
        break;
      case 22:
      case 23:
        Yt(t), So(), e !== null && q(Tl);
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
    } catch (v) {
      He(t, t.return, v);
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
            var g = i.inst, v = g.destroy;
            if (v !== void 0) {
              g.destroy = void 0, o = t;
              var E = l, M = v;
              try {
                M();
              } catch (H) {
                He(
                  o,
                  E,
                  H
                );
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (H) {
      He(t, t.return, H);
    }
  }
  function yd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        uh(t, l);
      } catch (i) {
        He(e, e.return, i);
      }
    }
  }
  function bd(e, t, l) {
    l.props = Ol(
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
  function dn(e, t) {
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
  function vd(e) {
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
      d1(i, e.type, l, t), i[At] = t;
    } catch (o) {
      He(e, e.return, o);
    }
  }
  function xd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && al(e.type) || e.tag === 4;
  }
  function es(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || xd(e.return)) return null;
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
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = xn));
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
  function Sd(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      pt(t, i, l), t[ft] = e, t[At] = l;
    } catch (s) {
      He(e, e.return, s);
    }
  }
  var Dn = !1, it = !1, ns = !1, kd = typeof WeakSet == "function" ? WeakSet : Set, ct = null;
  function Zb(e, t) {
    if (e = e.containerInfo, ws = Pr, e = Rf(e), Fu(e)) {
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
            var g = 0, v = -1, E = -1, M = 0, H = 0, Q = e, N = null;
            t: for (; ; ) {
              for (var j; Q !== l || o !== 0 && Q.nodeType !== 3 || (v = g + o), Q !== s || i !== 0 && Q.nodeType !== 3 || (E = g + i), Q.nodeType === 3 && (g += Q.nodeValue.length), (j = Q.firstChild) !== null; )
                N = Q, Q = j;
              for (; ; ) {
                if (Q === e) break t;
                if (N === l && ++M === o && (v = g), N === s && ++H === i && (E = g), (j = Q.nextSibling) !== null) break;
                Q = N, N = Q.parentNode;
              }
              Q = j;
            }
            l = v === -1 || E === -1 ? null : { start: v, end: E };
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
                  var ue = Ol(
                    l.type,
                    o
                  );
                  e = i.getSnapshotBeforeUpdate(
                    ue,
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
  function wd(e, t, l) {
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
            var o = Ol(
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
        i & 64 && yd(l), i & 512 && ca(l, l.return);
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
            uh(e, t);
          } catch (g) {
            He(l, l.return, g);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Sd(l);
      case 26:
      case 5:
        Mn(e, l), t === null && i & 4 && vd(l), i & 512 && ca(l, l.return);
        break;
      case 12:
        Mn(e, l);
        break;
      case 31:
        Mn(e, l), i & 4 && Td(e, l);
        break;
      case 13:
        Mn(e, l), i & 4 && Ad(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = t1.bind(
          null,
          l
        ), S1(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || Dn, !i) {
          t = t !== null && t.memoizedState !== null || it, o = Dn;
          var s = it;
          Dn = i, (it = t) && !s ? Nn(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Mn(e, l), Dn = o, it = s;
        }
        break;
      case 30:
        break;
      default:
        Mn(e, l);
    }
  }
  function Ed(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ed(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ou(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ie = null, _t = !1;
  function On(e, t, l) {
    for (l = l.child; l !== null; )
      zd(e, t, l), l = l.sibling;
  }
  function zd(e, t, l) {
    if (rt && typeof rt.onCommitFiberUnmount == "function")
      try {
        rt.onCommitFiberUnmount(St, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        it || dn(l, t), On(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        it || dn(l, t);
        var i = Ie, o = _t;
        al(l.type) && (Ie = l.stateNode, _t = !1), On(
          e,
          t,
          l
        ), va(l.stateNode), Ie = i, _t = o;
        break;
      case 5:
        it || dn(l, t);
      case 6:
        if (i = Ie, o = _t, Ie = null, On(
          e,
          t,
          l
        ), Ie = i, _t = o, Ie !== null)
          if (_t)
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
        Ie !== null && (_t ? (e = Ie, ym(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Ci(e)) : ym(Ie, l.stateNode));
        break;
      case 4:
        i = Ie, o = _t, Ie = l.stateNode.containerInfo, _t = !0, On(
          e,
          t,
          l
        ), Ie = i, _t = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wn(2, l, t), it || Wn(4, l, t), On(
          e,
          t,
          l
        );
        break;
      case 1:
        it || (dn(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && bd(
          l,
          t,
          i
        )), On(
          e,
          t,
          l
        );
        break;
      case 21:
        On(
          e,
          t,
          l
        );
        break;
      case 22:
        it = (i = it) || l.memoizedState !== null, On(
          e,
          t,
          l
        ), it = i;
        break;
      default:
        On(
          e,
          t,
          l
        );
    }
  }
  function Td(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ci(e);
      } catch (l) {
        He(t, t.return, l);
      }
    }
  }
  function Ad(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ci(e);
      } catch (l) {
        He(t, t.return, l);
      }
  }
  function Kb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new kd()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new kd()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function Nr(e, t) {
    var l = Kb(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var o = n1.bind(null, e, i);
        i.then(o, o);
      }
    });
  }
  function Dt(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var o = l[i], s = e, g = t, v = g;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (al(v.type)) {
                Ie = v.stateNode, _t = !1;
                break e;
              }
              break;
            case 5:
              Ie = v.stateNode, _t = !1;
              break e;
            case 3:
            case 4:
              Ie = v.stateNode.containerInfo, _t = !0;
              break e;
          }
          v = v.return;
        }
        if (Ie === null) throw Error(u(160));
        zd(s, g, o), Ie = null, _t = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Cd(t, e), t = t.sibling;
  }
  var un = null;
  function Cd(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Dt(t, e), Ot(e), i & 4 && (Wn(3, e, e.return), sa(3, e), Wn(5, e, e.return));
        break;
      case 1:
        Dt(t, e), Ot(e), i & 512 && (it || l === null || dn(l, l.return)), i & 64 && Dn && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var o = un;
        if (Dt(t, e), Ot(e), i & 512 && (it || l === null || dn(l, l.return)), i & 4) {
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
                      var g = Cm(
                        "link",
                        "href",
                        o
                      ).get(i + (l.href || ""));
                      if (g) {
                        for (var v = 0; v < g.length; v++)
                          if (s = g[v], s.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && s.getAttribute("rel") === (l.rel == null ? null : l.rel) && s.getAttribute("title") === (l.title == null ? null : l.title) && s.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            g.splice(v, 1);
                            break t;
                          }
                      }
                      s = o.createElement(i), pt(s, i, l), o.head.appendChild(s);
                      break;
                    case "meta":
                      if (g = Cm(
                        "meta",
                        "content",
                        o
                      ).get(i + (l.content || ""))) {
                        for (v = 0; v < g.length; v++)
                          if (s = g[v], s.getAttribute("content") === (l.content == null ? null : "" + l.content) && s.getAttribute("name") === (l.name == null ? null : l.name) && s.getAttribute("property") === (l.property == null ? null : l.property) && s.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && s.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            g.splice(v, 1);
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
                _m(
                  o,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Am(
                o,
                i,
                e.memoizedProps
              );
          else
            s !== i ? (s === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : s.count--, i === null ? _m(
              o,
              e.type,
              e.stateNode
            ) : Am(
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
        Dt(t, e), Ot(e), i & 512 && (it || l === null || dn(l, l.return)), l !== null && i & 4 && Po(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (Dt(t, e), Ot(e), i & 512 && (it || l === null || dn(l, l.return)), e.flags & 32) {
          o = e.stateNode;
          try {
            $l(o, "");
          } catch (ue) {
            He(e, e.return, ue);
          }
        }
        i & 4 && e.stateNode != null && (o = e.memoizedProps, Po(
          e,
          o,
          l !== null ? l.memoizedProps : o
        )), i & 1024 && (ns = !0);
        break;
      case 6:
        if (Dt(t, e), Ot(e), i & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (ue) {
            He(e, e.return, ue);
          }
        }
        break;
      case 3:
        if (Jr = null, o = un, un = Kr(t.containerInfo), Dt(t, e), un = o, Ot(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ci(t.containerInfo);
          } catch (ue) {
            He(e, e.return, ue);
          }
        ns && (ns = !1, _d(e));
        break;
      case 4:
        i = un, un = Kr(
          e.stateNode.containerInfo
        ), Dt(t, e), Ot(e), un = i;
        break;
      case 12:
        Dt(t, e), Ot(e);
        break;
      case 31:
        Dt(t, e), Ot(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Nr(e, i)));
        break;
      case 13:
        Dt(t, e), Ot(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (jr = xt()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Nr(e, i)));
        break;
      case 22:
        o = e.memoizedState !== null;
        var E = l !== null && l.memoizedState !== null, M = Dn, H = it;
        if (Dn = M || o, it = H || E, Dt(t, e), it = H, Dn = M, Ot(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, o && (l === null || E || Dn || it || Ml(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                E = l = t;
                try {
                  if (s = E.stateNode, o)
                    g = s.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none";
                  else {
                    v = E.stateNode;
                    var Q = E.memoizedProps.style, N = Q != null && Q.hasOwnProperty("display") ? Q.display : null;
                    v.style.display = N == null || typeof N == "boolean" ? "" : ("" + N).trim();
                  }
                } catch (ue) {
                  He(E, E.return, ue);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = o ? "" : E.memoizedProps;
                } catch (ue) {
                  He(E, E.return, ue);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                E = t;
                try {
                  var j = E.stateNode;
                  o ? bm(j, !0) : bm(E.stateNode, !1);
                } catch (ue) {
                  He(E, E.return, ue);
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
        Dt(t, e), Ot(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Nr(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Dt(t, e), Ot(e);
    }
  }
  function Ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, i = e.return; i !== null; ) {
          if (xd(i)) {
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
            var v = es(e);
            Mr(e, v, g);
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo, M = es(e);
            ts(
              e,
              M,
              E
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (H) {
        He(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function _d(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        _d(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Mn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        wd(e, t.alternate, t), t = t.sibling;
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
          dn(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && bd(
            t,
            t.return,
            l
          ), Ml(t);
          break;
        case 27:
          va(t.stateNode);
        case 26:
        case 5:
          dn(t, t.return), Ml(t);
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
            } catch (M) {
              He(i, i.return, M);
            }
          if (i = s, o = i.updateQueue, o !== null) {
            var v = i.stateNode;
            try {
              var E = o.shared.hiddenCallbacks;
              if (E !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < E.length; o++)
                  rh(E[o], v);
            } catch (M) {
              He(i, i.return, M);
            }
          }
          l && g & 64 && yd(s), ca(s, s.return);
          break;
        case 27:
          Sd(s);
        case 26:
        case 5:
          Nn(
            o,
            s,
            l
          ), l && i === null && g & 4 && vd(s), ca(s, s.return);
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
          ), l && g & 4 && Td(o, s);
          break;
        case 13:
          Nn(
            o,
            s,
            l
          ), l && g & 4 && Ad(o, s);
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
        Dd(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Dd(e, t, l, i) {
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
            var s = t.memoizedProps, g = s.id, v = s.onPostCommit;
            typeof v == "function" && v(
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
      var s = e, g = t, v = l, E = i, M = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          yi(
            s,
            g,
            v,
            E,
            o
          ), sa(8, g);
          break;
        case 23:
          break;
        case 22:
          var H = g.stateNode;
          g.memoizedState !== null ? H._visibility & 2 ? yi(
            s,
            g,
            v,
            E,
            o
          ) : fa(
            s,
            g
          ) : (H._visibility |= 2, yi(
            s,
            g,
            v,
            E,
            o
          )), o && M & 2048 && ls(
            g.alternate,
            g
          );
          break;
        case 24:
          yi(
            s,
            g,
            v,
            E,
            o
          ), o && M & 2048 && is(g.alternate, g);
          break;
        default:
          yi(
            s,
            g,
            v,
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
  var ha = 8192;
  function bi(e, t, l) {
    if (e.subtreeFlags & ha)
      for (e = e.child; e !== null; )
        Od(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Od(e, t, l) {
    switch (e.tag) {
      case 26:
        bi(
          e,
          t,
          l
        ), e.flags & ha && e.memoizedState !== null && N1(
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
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = ha, ha = 16777216, bi(
          e,
          t,
          l
        ), ha = i) : bi(
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
  function Md(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function da(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ct = i, Rd(
            i,
            e
          );
        }
      Md(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Nd(e), e = e.sibling;
  }
  function Nd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        da(e), e.flags & 2048 && Wn(9, e, e.return);
        break;
      case 3:
        da(e);
        break;
      case 12:
        da(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Rr(e)) : da(e);
        break;
      default:
        da(e);
    }
  }
  function Rr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          ct = i, Rd(
            i,
            e
          );
        }
      Md(e);
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
  function Rd(e, t) {
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
          if (Ed(i), i === l) {
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
  var Fb = {
    getCacheForType: function(e) {
      var t = dt(tt), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return dt(tt).controller.signal;
    }
  }, Jb = typeof WeakMap == "function" ? WeakMap : Map, Le = 0, Qe = null, Ae = null, De = 0, Be = 0, Gt = null, Pn = !1, vi = !1, as = !1, Rn = 0, We = 0, el = 0, Nl = 0, rs = 0, Vt = 0, xi = 0, ma = null, Mt = null, us = !1, jr = 0, jd = 0, Lr = 1 / 0, Ur = null, tl = null, ut = 0, nl = null, Si = null, jn = 0, os = 0, ss = null, Ld = null, pa = 0, cs = null;
  function Xt() {
    return (Le & 2) !== 0 && De !== 0 ? De & -De : _.T !== null ? gs() : $c();
  }
  function Ud() {
    if (Vt === 0)
      if ((De & 536870912) === 0 || Me) {
        var e = Qa;
        Qa <<= 1, (Qa & 3932160) === 0 && (Qa = 262144), Vt = e;
      } else Vt = 536870912;
    return e = qt.current, e !== null && (e.flags |= 32), Vt;
  }
  function Nt(e, t, l) {
    (e === Qe && (Be === 2 || Be === 9) || e.cancelPendingCommit !== null) && (ki(e, 0), ll(
      e,
      De,
      Vt,
      !1
    )), Li(e, l), ((Le & 2) === 0 || e !== Qe) && (e === Qe && ((Le & 2) === 0 && (Nl |= l), We === 4 && ll(
      e,
      De,
      Vt,
      !1
    )), mn(e));
  }
  function Bd(e, t, l) {
    if ((Le & 6) !== 0) throw Error(u(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ji(e, t), o = i ? Wb(e, t) : hs(e, t, !0), s = i;
    do {
      if (o === 0) {
        vi && !i && ll(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, s && !Ib(l)) {
          o = hs(e, t, !1), s = !1;
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
              var v = e;
              o = ma;
              var E = v.current.memoizedState.isDehydrated;
              if (E && (ki(v, g).flags |= 256), g = hs(
                v,
                g,
                !1
              ), g !== 2) {
                if (as && !E) {
                  v.errorRecoveryDisabledLanes |= s, Nl |= s, o = 4;
                  break e;
                }
                s = Mt, Mt = o, s !== null && (Mt === null ? Mt = s : Mt.push.apply(
                  Mt,
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
              Mt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (o = jr + 300 - xt(), 10 < o)) {
            if (ll(
              i,
              t,
              Vt,
              !Pn
            ), Ka(i, 0, !0) !== 0) break e;
            jn = t, i.timeoutHandle = pm(
              Hd.bind(
                null,
                i,
                l,
                Mt,
                Ur,
                us,
                t,
                Vt,
                Nl,
                xi,
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
          Hd(
            i,
            l,
            Mt,
            Ur,
            us,
            t,
            Vt,
            Nl,
            xi,
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
  function Hd(e, t, l, i, o, s, g, v, E, M, H, Q, N, j) {
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
      }, Od(
        t,
        s,
        Q
      );
      var ue = (s & 62914560) === s ? jr - xt() : (s & 4194048) === s ? jd - xt() : 0;
      if (ue = R1(
        Q,
        ue
      ), ue !== null) {
        jn = s, e.cancelPendingCommit = ue(
          Kd.bind(
            null,
            e,
            t,
            s,
            l,
            i,
            o,
            g,
            v,
            E,
            H,
            Q,
            null,
            N,
            j
          )
        ), ll(e, s, g, !M);
        return;
      }
    }
    Kd(
      e,
      t,
      s,
      l,
      i,
      o,
      g,
      v,
      E
    );
  }
  function Ib(e) {
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
    l !== 0 && Fc(e, l, t);
  }
  function Br() {
    return (Le & 6) === 0 ? (ga(0), !1) : !0;
  }
  function fs() {
    if (Ae !== null) {
      if (Be === 0)
        var e = Ae.return;
      else
        e = Ae, En = El = null, Ao(e), hi = null, Wi = 0, e = Ae;
      for (; e !== null; )
        gd(e.alternate, e), e = e.return;
      Ae = null;
    }
  }
  function ki(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, g1(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), jn = 0, fs(), Qe = e, Ae = l = kn(e.current, null), De = t, Be = 0, Gt = null, Pn = !1, vi = ji(e, t), as = !1, xi = Vt = rs = Nl = el = We = 0, Mt = ma = null, us = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var o = 31 - Xe(i), s = 1 << o;
        t |= e[o], i &= ~s;
      }
    return Rn = t, ar(), l;
  }
  function qd(e, t) {
    Se = null, _.H = ra, t === fi || t === dr ? (t = nh(), Be = 3) : t === po ? (t = nh(), Be = 4) : Be = t === Vo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, Ae === null && (We = 1, Ar(
      e,
      It(t, e.current)
    ));
  }
  function Yd() {
    var e = qt.current;
    return e === null ? !0 : (De & 4194048) === De ? en === null : (De & 62914560) === De || (De & 536870912) !== 0 ? e === en : !1;
  }
  function Gd() {
    var e = _.H;
    return _.H = ra, e === null ? ra : e;
  }
  function Vd() {
    var e = _.A;
    return _.A = Fb, e;
  }
  function Hr() {
    We = 4, Pn || (De & 4194048) !== De && qt.current !== null || (vi = !0), (el & 134217727) === 0 && (Nl & 134217727) === 0 || Qe === null || ll(
      Qe,
      De,
      Vt,
      !1
    );
  }
  function hs(e, t, l) {
    var i = Le;
    Le |= 2;
    var o = Gd(), s = Vd();
    (Qe !== e || De !== t) && (Ur = null, ki(e, t)), t = !1;
    var g = We;
    e: do
      try {
        if (Be !== 0 && Ae !== null) {
          var v = Ae, E = Gt;
          switch (Be) {
            case 8:
              fs(), g = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              qt.current === null && (t = !0);
              var M = Be;
              if (Be = 0, Gt = null, wi(e, v, E, M), l && vi) {
                g = 0;
                break e;
              }
              break;
            default:
              M = Be, Be = 0, Gt = null, wi(e, v, E, M);
          }
        }
        $b(), g = We;
        break;
      } catch (H) {
        qd(e, H);
      }
    while (!0);
    return t && e.shellSuspendCounter++, En = El = null, Le = i, _.H = o, _.A = s, Ae === null && (Qe = null, De = 0, ar()), g;
  }
  function $b() {
    for (; Ae !== null; ) Xd(Ae);
  }
  function Wb(e, t) {
    var l = Le;
    Le |= 2;
    var i = Gd(), o = Vd();
    Qe !== e || De !== t ? (Ur = null, Lr = xt() + 500, ki(e, t)) : vi = ji(
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
              if (eh(s)) {
                Be = 0, Gt = null, Qd(t);
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
              eh(s) ? (Be = 0, Gt = null, Qd(t)) : (Be = 0, Gt = null, wi(e, t, s, 7));
              break;
            case 5:
              var g = null;
              switch (Ae.tag) {
                case 26:
                  g = Ae.memoizedState;
                case 5:
                case 27:
                  var v = Ae;
                  if (g ? Dm(g) : v.stateNode.complete) {
                    Be = 0, Gt = null;
                    var E = v.sibling;
                    if (E !== null) Ae = E;
                    else {
                      var M = v.return;
                      M !== null ? (Ae = M, qr(M)) : Ae = null;
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
        Pb();
        break;
      } catch (H) {
        qd(e, H);
      }
    while (!0);
    return En = El = null, _.H = i, _.A = o, Le = l, Ae !== null ? 0 : (Qe = null, De = 0, ar(), We);
  }
  function Pb() {
    for (; Ae !== null && !Eu(); )
      Xd(Ae);
  }
  function Xd(e) {
    var t = md(e.alternate, e, Rn);
    e.memoizedProps = e.pendingProps, t === null ? qr(e) : Ae = t;
  }
  function Qd(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = od(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          De
        );
        break;
      case 11:
        t = od(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          De
        );
        break;
      case 5:
        Ao(t);
      default:
        gd(l, t), t = Ae = Vf(t, Rn), t = md(l, t, Rn);
    }
    e.memoizedProps = e.pendingProps, t === null ? qr(e) : Ae = t;
  }
  function wi(e, t, l, i) {
    En = El = null, Ao(t), hi = null, Wi = 0;
    var o = t.return;
    try {
      if (Yb(
        e,
        o,
        t,
        l,
        De
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
    t.flags & 32768 ? (Me || i === 1 ? e = !0 : vi || (De & 536870912) !== 0 ? e = !1 : (Pn = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = qt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Zd(t, e)) : qr(t);
  }
  function qr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Zd(
          t,
          Pn
        );
        return;
      }
      e = t.return;
      var l = Xb(
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
  function Zd(e, t) {
    do {
      var l = Qb(e.alternate, e);
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
  function Kd(e, t, l, i, o, s, g, v, E) {
    e.cancelPendingCommit = null;
    do
      Yr();
    while (ut !== 0);
    if ((Le & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (s = t.lanes | t.childLanes, s |= Pu, My(
        e,
        l,
        s,
        g,
        v,
        E
      ), e === Qe && (Ae = Qe = null, De = 0), Si = t, nl = e, jn = l, os = s, ss = o, Ld = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, l1(ge, function() {
        return Wd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = _.T, _.T = null, o = F.p, F.p = 2, g = Le, Le |= 4;
        try {
          Zb(e, t, l);
        } finally {
          Le = g, F.p = o, _.T = i;
        }
      }
      ut = 1, Fd(), Jd(), Id();
    }
  }
  function Fd() {
    if (ut === 1) {
      ut = 0;
      var e = nl, t = Si, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = _.T, _.T = null;
        var i = F.p;
        F.p = 2;
        var o = Le;
        Le |= 4;
        try {
          Cd(t, e);
          var s = Es, g = Rf(e.containerInfo), v = s.focusedElem, E = s.selectionRange;
          if (g !== v && v && v.ownerDocument && Nf(
            v.ownerDocument.documentElement,
            v
          )) {
            if (E !== null && Fu(v)) {
              var M = E.start, H = E.end;
              if (H === void 0 && (H = M), "selectionStart" in v)
                v.selectionStart = M, v.selectionEnd = Math.min(
                  H,
                  v.value.length
                );
              else {
                var Q = v.ownerDocument || document, N = Q && Q.defaultView || window;
                if (N.getSelection) {
                  var j = N.getSelection(), ue = v.textContent.length, pe = Math.min(E.start, ue), Ge = E.end === void 0 ? pe : Math.min(E.end, ue);
                  !j.extend && pe > Ge && (g = Ge, Ge = pe, pe = g);
                  var C = Mf(
                    v,
                    pe
                  ), T = Mf(
                    v,
                    Ge
                  );
                  if (C && T && (j.rangeCount !== 1 || j.anchorNode !== C.node || j.anchorOffset !== C.offset || j.focusNode !== T.node || j.focusOffset !== T.offset)) {
                    var O = Q.createRange();
                    O.setStart(C.node, C.offset), j.removeAllRanges(), pe > Ge ? (j.addRange(O), j.extend(T.node, T.offset)) : (O.setEnd(T.node, T.offset), j.addRange(O));
                  }
                }
              }
            }
            for (Q = [], j = v; j = j.parentNode; )
              j.nodeType === 1 && Q.push({
                element: j,
                left: j.scrollLeft,
                top: j.scrollTop
              });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < Q.length; v++) {
              var V = Q[v];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          Pr = !!ws, Es = ws = null;
        } finally {
          Le = o, F.p = i, _.T = l;
        }
      }
      e.current = t, ut = 2;
    }
  }
  function Jd() {
    if (ut === 2) {
      ut = 0;
      var e = nl, t = Si, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = _.T, _.T = null;
        var i = F.p;
        F.p = 2;
        var o = Le;
        Le |= 4;
        try {
          wd(e, t.alternate, t);
        } finally {
          Le = o, F.p = i, _.T = l;
        }
      }
      ut = 3;
    }
  }
  function Id() {
    if (ut === 4 || ut === 3) {
      ut = 0, zu();
      var e = nl, t = Si, l = jn, i = Ld;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ut = 5 : (ut = 0, Si = nl = null, $d(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (o === 0 && (tl = null), _u(l), t = t.stateNode, rt && typeof rt.onCommitFiberRoot == "function")
        try {
          rt.onCommitFiberRoot(
            St,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = _.T, o = F.p, F.p = 2, _.T = null;
        try {
          for (var s = e.onRecoverableError, g = 0; g < i.length; g++) {
            var v = i[g];
            s(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          _.T = t, F.p = o;
        }
      }
      (jn & 3) !== 0 && Yr(), mn(e), o = e.pendingLanes, (l & 261930) !== 0 && (o & 42) !== 0 ? e === cs ? pa++ : (pa = 0, cs = e) : pa = 0, ga(0);
    }
  }
  function $d(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ii(t)));
  }
  function Yr() {
    return Fd(), Jd(), Id(), Wd();
  }
  function Wd() {
    if (ut !== 5) return !1;
    var e = nl, t = os;
    os = 0;
    var l = _u(jn), i = _.T, o = F.p;
    try {
      F.p = 32 > l ? 32 : l, _.T = null, l = ss, ss = null;
      var s = nl, g = jn;
      if (ut = 0, Si = nl = null, jn = 0, (Le & 6) !== 0) throw Error(u(331));
      var v = Le;
      if (Le |= 4, Nd(s.current), Dd(
        s,
        s.current,
        g,
        l
      ), Le = v, ga(0, !1), rt && typeof rt.onPostCommitFiberRoot == "function")
        try {
          rt.onPostCommitFiberRoot(St, s);
        } catch {
        }
      return !0;
    } finally {
      F.p = o, _.T = i, $d(e, t);
    }
  }
  function Pd(e, t, l) {
    t = It(l, t), t = Go(e.stateNode, t, 2), e = Jn(e, t, 2), e !== null && (Li(e, 2), mn(e));
  }
  function He(e, t, l) {
    if (e.tag === 3)
      Pd(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Pd(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (tl === null || !tl.has(i))) {
            e = It(l, e), l = ed(2), i = Jn(t, l, 2), i !== null && (td(
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
  function ds(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new Jb();
      var o = /* @__PURE__ */ new Set();
      i.set(t, o);
    } else
      o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
    o.has(l) || (as = !0, o.add(l), e = e1.bind(null, e, t, l), t.then(e, e));
  }
  function e1(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Qe === e && (De & l) === l && (We === 4 || We === 3 && (De & 62914560) === De && 300 > xt() - jr ? (Le & 2) === 0 && ki(e, 0) : rs |= l, xi === De && (xi = 0)), mn(e);
  }
  function em(e, t) {
    t === 0 && (t = Kc()), e = Sl(e, t), e !== null && (Li(e, t), mn(e));
  }
  function t1(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), em(e, l);
  }
  function n1(e, t) {
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
    i !== null && i.delete(t), em(e, l);
  }
  function l1(e, t) {
    return Xl(e, t);
  }
  var Gr = null, Ei = null, ms = !1, Vr = !1, ps = !1, il = 0;
  function mn(e) {
    e !== Ei && e.next === null && (Ei === null ? Gr = Ei = e : Ei = Ei.next = e), Vr = !0, ms || (ms = !0, a1());
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
              var g = i.suspendedLanes, v = i.pingedLanes;
              s = (1 << 31 - Xe(42 | e) + 1) - 1, s &= o & ~(g & ~v), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (l = !0, im(i, s));
          } else
            s = De, s = Ka(
              i,
              i === Qe ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (s & 3) === 0 || ji(i, s) || (l = !0, im(i, s));
          i = i.next;
        }
      while (l);
      ps = !1;
    }
  }
  function i1() {
    tm();
  }
  function tm() {
    Vr = ms = !1;
    var e = 0;
    il !== 0 && p1() && (e = il);
    for (var t = xt(), l = null, i = Gr; i !== null; ) {
      var o = i.next, s = nm(i, t);
      s === 0 ? (i.next = null, l === null ? Gr = o : l.next = o, o === null && (Ei = l)) : (l = i, (e !== 0 || (s & 3) !== 0) && (Vr = !0)), i = o;
    }
    ut !== 0 && ut !== 5 || ga(e), il !== 0 && (il = 0);
  }
  function nm(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
      var g = 31 - Xe(s), v = 1 << g, E = o[g];
      E === -1 ? ((v & l) === 0 || (v & i) !== 0) && (o[g] = Oy(v, t)) : E <= t && (e.expiredLanes |= v), s &= ~v;
    }
    if (t = Qe, l = De, l = Ka(
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
      return i = lm.bind(null, e), l = Xl(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && Ri(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function lm(e, t) {
    if (ut !== 0 && ut !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (Yr() && e.callbackNode !== l)
      return null;
    var i = De;
    return i = Ka(
      e,
      e === Qe ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (Bd(e, i, t), nm(e, xt()), e.callbackNode != null && e.callbackNode === l ? lm.bind(null, e) : null);
  }
  function im(e, t) {
    if (Yr()) return null;
    Bd(e, t, !0);
  }
  function a1() {
    y1(function() {
      (Le & 6) !== 0 ? Xl(
        G,
        i1
      ) : tm();
    });
  }
  function gs() {
    if (il === 0) {
      var e = si;
      e === 0 && (e = Xa, Xa <<= 1, (Xa & 261888) === 0 && (Xa = 256)), il = e;
    }
    return il;
  }
  function am(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : $a("" + e);
  }
  function rm(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function r1(e, t, l, i, o) {
    if (t === "submit" && l && l.stateNode === o) {
      var s = am(
        (o[At] || null).action
      ), g = i.submitter;
      g && (t = (t = g[At] || null) ? am(t.formAction) : g.getAttribute("formAction"), t !== null && (s = t, g = null));
      var v = new tr(
        "action",
        "action",
        null,
        i,
        o
      );
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (il !== 0) {
                  var E = g ? rm(o, g) : new FormData(o);
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
                typeof s == "function" && (v.preventDefault(), E = g ? rm(o, g) : new FormData(o), Lo(
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
    var bs = Wu[ys], u1 = bs.toLowerCase(), o1 = bs[0].toUpperCase() + bs.slice(1);
    rn(
      u1,
      "on" + o1
    );
  }
  rn(Uf, "onAnimationEnd"), rn(Bf, "onAnimationIteration"), rn(Hf, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(Eb, "onTransitionRun"), rn(zb, "onTransitionStart"), rn(Tb, "onTransitionCancel"), rn(qf, "onTransitionEnd"), Jl("onMouseEnter", ["mouseout", "mouseover"]), Jl("onMouseLeave", ["mouseout", "mouseover"]), Jl("onPointerEnter", ["pointerout", "pointerover"]), Jl("onPointerLeave", ["pointerout", "pointerover"]), yl(
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
  ), s1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ya)
  );
  function um(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], o = i.event;
      i = i.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var g = i.length - 1; 0 <= g; g--) {
            var v = i[g], E = v.instance, M = v.currentTarget;
            if (v = v.listener, E !== s && o.isPropagationStopped())
              break e;
            s = v, o.currentTarget = M;
            try {
              s(o);
            } catch (H) {
              ir(H);
            }
            o.currentTarget = null, s = E;
          }
        else
          for (g = 0; g < i.length; g++) {
            if (v = i[g], E = v.instance, M = v.currentTarget, v = v.listener, E !== s && o.isPropagationStopped())
              break e;
            s = v, o.currentTarget = M;
            try {
              s(o);
            } catch (H) {
              ir(H);
            }
            o.currentTarget = null, s = E;
          }
      }
    }
  }
  function Ce(e, t) {
    var l = t[Du];
    l === void 0 && (l = t[Du] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (om(t, e, 2, !1), l.add(i));
  }
  function vs(e, t, l) {
    var i = 0;
    t && (i |= 4), om(
      l,
      e,
      i,
      t
    );
  }
  var Xr = "_reactListening" + Math.random().toString(36).slice(2);
  function xs(e) {
    if (!e[Xr]) {
      e[Xr] = !0, ef.forEach(function(l) {
        l !== "selectionchange" && (s1.has(l) || vs(l, !1, e), vs(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Xr] || (t[Xr] = !0, vs("selectionchange", !1, t));
    }
  }
  function om(e, t, l, i) {
    switch (Um(t)) {
      case 2:
        var o = U1;
        break;
      case 8:
        o = B1;
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
          var v = i.stateNode.containerInfo;
          if (v === o) break;
          if (g === 4)
            for (g = i.return; g !== null; ) {
              var E = g.tag;
              if ((E === 3 || E === 4) && g.stateNode.containerInfo === o)
                return;
              g = g.return;
            }
          for (; v !== null; ) {
            if (g = Zl(v), g === null) return;
            if (E = g.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              i = s = g;
              continue e;
            }
            v = v.parentNode;
          }
        }
        i = i.return;
      }
    df(function() {
      var M = s, H = Uu(l), Q = [];
      e: {
        var N = Yf.get(e);
        if (N !== void 0) {
          var j = tr, ue = e;
          switch (e) {
            case "keypress":
              if (Pa(l) === 0) break e;
            case "keydown":
            case "keyup":
              j = nb;
              break;
            case "focusin":
              ue = "focus", j = Vu;
              break;
            case "focusout":
              ue = "blur", j = Vu;
              break;
            case "beforeblur":
            case "afterblur":
              j = Vu;
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
              j = gf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = Xy;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = ab;
              break;
            case Uf:
            case Bf:
            case Hf:
              j = Ky;
              break;
            case qf:
              j = ub;
              break;
            case "scroll":
            case "scrollend":
              j = Gy;
              break;
            case "wheel":
              j = sb;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = Jy;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = bf;
              break;
            case "toggle":
            case "beforetoggle":
              j = fb;
          }
          var pe = (t & 4) !== 0, Ge = !pe && (e === "scroll" || e === "scrollend"), C = pe ? N !== null ? N + "Capture" : null : N;
          pe = [];
          for (var T = M, O; T !== null; ) {
            var V = T;
            if (O = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || O === null || C === null || (V = Hi(T, C), V != null && pe.push(
              ba(T, V, O)
            )), Ge) break;
            T = T.return;
          }
          0 < pe.length && (N = new j(
            N,
            ue,
            null,
            l,
            H
          ), Q.push({ event: N, listeners: pe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (N = e === "mouseover" || e === "pointerover", j = e === "mouseout" || e === "pointerout", N && l !== Lu && (ue = l.relatedTarget || l.fromElement) && (Zl(ue) || ue[Ql]))
            break e;
          if ((j || N) && (N = H.window === H ? H : (N = H.ownerDocument) ? N.defaultView || N.parentWindow : window, j ? (ue = l.relatedTarget || l.toElement, j = M, ue = ue ? Zl(ue) : null, ue !== null && (Ge = h(ue), pe = ue.tag, ue !== Ge || pe !== 5 && pe !== 27 && pe !== 6) && (ue = null)) : (j = null, ue = M), j !== ue)) {
            if (pe = gf, V = "onMouseLeave", C = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (pe = bf, V = "onPointerLeave", C = "onPointerEnter", T = "pointer"), Ge = j == null ? N : Bi(j), O = ue == null ? N : Bi(ue), N = new pe(
              V,
              T + "leave",
              j,
              l,
              H
            ), N.target = Ge, N.relatedTarget = O, V = null, Zl(H) === M && (pe = new pe(
              C,
              T + "enter",
              ue,
              l,
              H
            ), pe.target = O, pe.relatedTarget = Ge, V = pe), Ge = V, j && ue)
              t: {
                for (pe = c1, C = j, T = ue, O = 0, V = C; V; V = pe(V))
                  O++;
                V = 0;
                for (var de = T; de; de = pe(de))
                  V++;
                for (; 0 < O - V; )
                  C = pe(C), O--;
                for (; 0 < V - O; )
                  T = pe(T), V--;
                for (; O--; ) {
                  if (C === T || T !== null && C === T.alternate) {
                    pe = C;
                    break t;
                  }
                  C = pe(C), T = pe(T);
                }
                pe = null;
              }
            else pe = null;
            j !== null && sm(
              Q,
              N,
              j,
              pe,
              !1
            ), ue !== null && Ge !== null && sm(
              Q,
              Ge,
              ue,
              pe,
              !0
            );
          }
        }
        e: {
          if (N = M ? Bi(M) : window, j = N.nodeName && N.nodeName.toLowerCase(), j === "select" || j === "input" && N.type === "file")
            var Re = Tf;
          else if (Ef(N))
            if (Af)
              Re = Sb;
            else {
              Re = vb;
              var ce = bb;
            }
          else
            j = N.nodeName, !j || j.toLowerCase() !== "input" || N.type !== "checkbox" && N.type !== "radio" ? M && ju(M.elementType) && (Re = Tf) : Re = xb;
          if (Re && (Re = Re(e, M))) {
            zf(
              Q,
              Re,
              l,
              H
            );
            break e;
          }
          ce && ce(e, N, M), e === "focusout" && M && N.type === "number" && M.memoizedProps.value != null && Ru(N, "number", N.value);
        }
        switch (ce = M ? Bi(M) : window, e) {
          case "focusin":
            (Ef(ce) || ce.contentEditable === "true") && (ti = ce, Ju = M, Ki = null);
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
            Iu = !1, jf(Q, l, H);
            break;
          case "selectionchange":
            if (wb) break;
          case "keydown":
          case "keyup":
            jf(Q, l, H);
        }
        var we;
        if (Qu)
          e: {
            switch (e) {
              case "compositionstart":
                var Oe = "onCompositionStart";
                break e;
              case "compositionend":
                Oe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Oe = "onCompositionUpdate";
                break e;
            }
            Oe = void 0;
          }
        else
          ei ? kf(e, l) && (Oe = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Oe = "onCompositionStart");
        Oe && (vf && l.locale !== "ko" && (ei || Oe !== "onCompositionStart" ? Oe === "onCompositionEnd" && ei && (we = mf()) : (Gn = H, qu = "value" in Gn ? Gn.value : Gn.textContent, ei = !0)), ce = Qr(M, Oe), 0 < ce.length && (Oe = new yf(
          Oe,
          e,
          null,
          l,
          H
        ), Q.push({ event: Oe, listeners: ce }), we ? Oe.data = we : (we = wf(l), we !== null && (Oe.data = we)))), (we = db ? mb(e, l) : pb(e, l)) && (Oe = Qr(M, "onBeforeInput"), 0 < Oe.length && (ce = new yf(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          H
        ), Q.push({
          event: ce,
          listeners: Oe
        }), ce.data = we)), r1(
          Q,
          e,
          M,
          l,
          H
        );
      }
      um(Q, t);
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
  function c1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function sm(e, t, l, i, o) {
    for (var s = t._reactName, g = []; l !== null && l !== i; ) {
      var v = l, E = v.alternate, M = v.stateNode;
      if (v = v.tag, E !== null && E === i) break;
      v !== 5 && v !== 26 && v !== 27 || M === null || (E = M, o ? (M = Hi(l, s), M != null && g.unshift(
        ba(l, M, E)
      )) : o || (M = Hi(l, s), M != null && g.push(
        ba(l, M, E)
      ))), l = l.return;
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var f1 = /\r\n?/g, h1 = /\u0000|\uFFFD/g;
  function cm(e) {
    return (typeof e == "string" ? e : "" + e).replace(f1, `
`).replace(h1, "");
  }
  function fm(e, t) {
    return t = cm(t), cm(e) === t;
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
        ff(e, i, s);
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
        i != null && (e.onclick = xn);
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
        Fa(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = qy.get(l) || l, Fa(e, l, i));
    }
  }
  function ks(e, t, l, i, o, s) {
    switch (l) {
      case "style":
        ff(e, i, s);
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
        if (!tf.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (o = l.endsWith("Capture"), t = l.slice(2, o ? l.length - 7 : void 0), s = e[At] || null, s = s != null ? s[l] : null, typeof s == "function" && e.removeEventListener(t, s, o), typeof i == "function")) {
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
        var v = s = g = o = null, E = null, M = null;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var H = l[i];
            if (H != null)
              switch (i) {
                case "name":
                  o = H;
                  break;
                case "type":
                  g = H;
                  break;
                case "checked":
                  E = H;
                  break;
                case "defaultChecked":
                  M = H;
                  break;
                case "value":
                  s = H;
                  break;
                case "defaultValue":
                  v = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Ye(e, t, i, H, l, null);
              }
          }
        uf(
          e,
          s,
          v,
          E,
          M,
          g,
          o,
          !1
        );
        return;
      case "select":
        Ce("invalid", e), i = g = s = null;
        for (o in l)
          if (l.hasOwnProperty(o) && (v = l[o], v != null))
            switch (o) {
              case "value":
                s = v;
                break;
              case "defaultValue":
                g = v;
                break;
              case "multiple":
                i = v;
              default:
                Ye(e, t, o, v, l, null);
            }
        t = s, l = g, e.multiple = !!i, t != null ? Il(e, !!i, t, !1) : l != null && Il(e, !!i, l, !0);
        return;
      case "textarea":
        Ce("invalid", e), s = o = i = null;
        for (g in l)
          if (l.hasOwnProperty(g) && (v = l[g], v != null))
            switch (g) {
              case "value":
                i = v;
                break;
              case "defaultValue":
                o = v;
                break;
              case "children":
                s = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(u(91));
                break;
              default:
                Ye(e, t, g, v, l, null);
            }
        sf(e, i, o, s);
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
        for (M in l)
          if (l.hasOwnProperty(M) && (i = l[M], i != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Ye(e, t, M, i, l, null);
            }
        return;
      default:
        if (ju(t)) {
          for (H in l)
            l.hasOwnProperty(H) && (i = l[H], i !== void 0 && ks(
              e,
              t,
              H,
              i,
              l,
              void 0
            ));
          return;
        }
    }
    for (v in l)
      l.hasOwnProperty(v) && (i = l[v], i != null && Ye(e, t, v, i, l, null));
  }
  function d1(e, t, l, i) {
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
        var o = null, s = null, g = null, v = null, E = null, M = null, H = null;
        for (j in l) {
          var Q = l[j];
          if (l.hasOwnProperty(j) && Q != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = Q;
              default:
                i.hasOwnProperty(j) || Ye(e, t, j, null, i, Q);
            }
        }
        for (var N in i) {
          var j = i[N];
          if (Q = l[N], i.hasOwnProperty(N) && (j != null || Q != null))
            switch (N) {
              case "type":
                s = j;
                break;
              case "name":
                o = j;
                break;
              case "checked":
                M = j;
                break;
              case "defaultChecked":
                H = j;
                break;
              case "value":
                g = j;
                break;
              case "defaultValue":
                v = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(u(137, t));
                break;
              default:
                j !== Q && Ye(
                  e,
                  t,
                  N,
                  j,
                  i,
                  Q
                );
            }
        }
        Nu(
          e,
          g,
          v,
          E,
          M,
          H,
          s,
          o
        );
        return;
      case "select":
        j = g = v = N = null;
        for (s in l)
          if (E = l[s], l.hasOwnProperty(s) && E != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                j = E;
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
                N = s;
                break;
              case "defaultValue":
                v = s;
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
        t = v, l = g, i = j, N != null ? Il(e, !!l, N, !1) : !!i != !!l && (t != null ? Il(e, !!l, t, !0) : Il(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        j = N = null;
        for (v in l)
          if (o = l[v], l.hasOwnProperty(v) && o != null && !i.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ye(e, t, v, null, i, o);
            }
        for (g in i)
          if (o = i[g], s = l[g], i.hasOwnProperty(g) && (o != null || s != null))
            switch (g) {
              case "value":
                N = o;
                break;
              case "defaultValue":
                j = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(u(91));
                break;
              default:
                o !== s && Ye(e, t, g, o, i, s);
            }
        of(e, N, j);
        return;
      case "option":
        for (var ue in l)
          N = l[ue], l.hasOwnProperty(ue) && N != null && !i.hasOwnProperty(ue) && (ue === "selected" ? e.selected = !1 : Ye(
            e,
            t,
            ue,
            null,
            i,
            N
          ));
        for (E in i)
          N = i[E], j = l[E], i.hasOwnProperty(E) && N !== j && (N != null || j != null) && (E === "selected" ? e.selected = N && typeof N != "function" && typeof N != "symbol" : Ye(
            e,
            t,
            E,
            N,
            i,
            j
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
          N = l[pe], l.hasOwnProperty(pe) && N != null && !i.hasOwnProperty(pe) && Ye(e, t, pe, null, i, N);
        for (M in i)
          if (N = i[M], j = l[M], i.hasOwnProperty(M) && N !== j && (N != null || j != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(u(137, t));
                break;
              default:
                Ye(
                  e,
                  t,
                  M,
                  N,
                  i,
                  j
                );
            }
        return;
      default:
        if (ju(t)) {
          for (var Ge in l)
            N = l[Ge], l.hasOwnProperty(Ge) && N !== void 0 && !i.hasOwnProperty(Ge) && ks(
              e,
              t,
              Ge,
              void 0,
              i,
              N
            );
          for (H in i)
            N = i[H], j = l[H], !i.hasOwnProperty(H) || N === j || N === void 0 && j === void 0 || ks(
              e,
              t,
              H,
              N,
              i,
              j
            );
          return;
        }
    }
    for (var C in l)
      N = l[C], l.hasOwnProperty(C) && N != null && !i.hasOwnProperty(C) && Ye(e, t, C, null, i, N);
    for (Q in i)
      N = i[Q], j = l[Q], !i.hasOwnProperty(Q) || N === j || N == null && j == null || Ye(e, t, Q, N, i, j);
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
  function m1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var o = l[i], s = o.transferSize, g = o.initiatorType, v = o.duration;
        if (s && v && hm(g)) {
          for (g = 0, v = o.responseEnd, i += 1; i < l.length; i++) {
            var E = l[i], M = E.startTime;
            if (M > v) break;
            var H = E.transferSize, Q = E.initiatorType;
            H && hm(Q) && (E = E.responseEnd, g += H * (E < v ? 1 : (v - M) / (E - M)));
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
  function dm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function mm(e, t) {
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
  function p1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ts ? !1 : (Ts = e, !0) : (Ts = null, !1);
  }
  var pm = typeof setTimeout == "function" ? setTimeout : void 0, g1 = typeof clearTimeout == "function" ? clearTimeout : void 0, gm = typeof Promise == "function" ? Promise : void 0, y1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof gm < "u" ? function(e) {
    return gm.resolve(null).then(e).catch(b1);
  } : pm;
  function b1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function al(e) {
    return e === "head";
  }
  function ym(e, t) {
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
          va(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, va(l);
          for (var s = l.firstChild; s; ) {
            var g = s.nextSibling, v = s.nodeName;
            s[Ui] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && s.rel.toLowerCase() === "stylesheet" || l.removeChild(s), s = g;
          }
        } else
          l === "body" && va(e.ownerDocument.body);
      l = o;
    } while (l);
    Ci(t);
  }
  function bm(e, t) {
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
          As(l), Ou(l);
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
  function v1(e, t, l, i) {
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
  function x1(e, t, l) {
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
  function S1(e, t) {
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
  var Ds = null;
  function xm(e) {
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
  function Sm(e) {
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
  function km(e, t, l) {
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
  function va(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ou(e);
  }
  var nn = /* @__PURE__ */ new Map(), wm = /* @__PURE__ */ new Set();
  function Kr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ln = F.d;
  F.d = {
    f: k1,
    r: w1,
    D: E1,
    C: z1,
    L: T1,
    m: A1,
    X: _1,
    S: C1,
    M: D1
  };
  function k1() {
    var e = Ln.f(), t = Br();
    return e || t;
  }
  function w1(e) {
    var t = Kl(e);
    t !== null && t.tag === 5 && t.type === "form" ? qh(t) : Ln.r(e);
  }
  var zi = typeof document > "u" ? null : document;
  function Em(e, t, l) {
    var i = zi;
    if (i && typeof t == "string" && t) {
      var o = Ft(t);
      o = 'link[rel="' + e + '"][href="' + o + '"]', typeof l == "string" && (o += '[crossorigin="' + l + '"]'), wm.has(o) || (wm.add(o), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), pt(t, "link", e), st(t), i.head.appendChild(t)));
    }
  }
  function E1(e) {
    Ln.D(e), Em("dns-prefetch", e, null);
  }
  function z1(e, t) {
    Ln.C(e, t), Em("preconnect", e, t);
  }
  function T1(e, t, l) {
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
      ), nn.set(s, e), i.querySelector(o) !== null || t === "style" && i.querySelector(xa(s)) || t === "script" && i.querySelector(Sa(s)) || (t = i.createElement("link"), pt(t, "link", e), st(t), i.head.appendChild(t)));
    }
  }
  function A1(e, t) {
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
  function C1(e, t, l) {
    Ln.S(e, t, l);
    var i = zi;
    if (i && e) {
      var o = Fl(i).hoistableStyles, s = Ti(e);
      t = t || "default";
      var g = o.get(s);
      if (!g) {
        var v = { loading: 0, preload: null };
        if (g = i.querySelector(
          xa(s)
        ))
          v.loading = 5;
        else {
          e = y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = nn.get(s)) && Os(e, l);
          var E = g = i.createElement("link");
          st(E), pt(E, "link", e), E._p = new Promise(function(M, H) {
            E.onload = M, E.onerror = H;
          }), E.addEventListener("load", function() {
            v.loading |= 1;
          }), E.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, Fr(g, t, i);
        }
        g = {
          type: "stylesheet",
          instance: g,
          count: 1,
          state: v
        }, o.set(s, g);
      }
    }
  }
  function _1(e, t) {
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
  function D1(e, t) {
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
  function zm(e, t, l, i) {
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
            xa(e)
          )) && !s._p && (g.instance = s, g.state.loading = 5), nn.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, nn.set(e, l), s || O1(
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
  function xa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Tm(e) {
    return y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function O1(e, t, l, i) {
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
  function Am(e, t, l) {
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
            xa(o)
          );
          if (s)
            return t.state.loading |= 4, t.instance = s, st(s), s;
          i = Tm(l), (o = nn.get(o)) && Os(i, o), s = (e.ownerDocument || e).createElement("link"), st(s);
          var g = s;
          return g._p = new Promise(function(v, E) {
            g.onload = v, g.onerror = E;
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
      var v = i[g];
      if (v.dataset.precedence === t) s = v;
      else if (s !== o) break;
    }
    s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Os(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ms(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Jr = null;
  function Cm(e, t, l) {
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
        var v = i.get(g);
        v ? v.push(s) : i.set(g, [s]);
      }
    }
    return i;
  }
  function _m(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function M1(e, t, l) {
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
  function N1(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var o = Ti(i.href), s = t.querySelector(
          xa(o)
        );
        if (s) {
          t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ir.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = s, st(s);
          return;
        }
        s = t.ownerDocument || t, i = Tm(i), (o = nn.get(o)) && Os(i, o), s = s.createElement("link"), st(s);
        var g = s;
        g._p = new Promise(function(v, E) {
          g.onload = v, g.onerror = E;
        }), pt(s, "link", i), l.instance = s;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Ir.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Ns = 0;
  function R1(e, t) {
    return e.stylesheets && e.count === 0 && Wr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && Wr(e, e.stylesheets), e.unsuspend) {
          var s = e.unsuspend;
          e.unsuspend = null, s();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ns === 0 && (Ns = 62500 * m1());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, $r = /* @__PURE__ */ new Map(), t.forEach(j1, e), $r = null, Ir.call(e));
  }
  function j1(e, t) {
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
    $$typeof: X,
    Provider: null,
    Consumer: null,
    _currentValue: oe,
    _currentValue2: oe,
    _threadCount: 0
  };
  function L1(e, t, l, i, o, s, g, v, E) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Au(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Au(0), this.hiddenUpdates = Au(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = s, this.onRecoverableError = g, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Om(e, t, l, i, o, s, g, v, E, M, H, Q) {
    return e = new L1(
      e,
      t,
      l,
      g,
      E,
      M,
      H,
      Q,
      v
    ), t = 1, s === !0 && (t |= 24), s = Ht(3, null, null, t), e.current = s, s.stateNode = e, t = fo(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, go(s), e;
  }
  function Mm(e) {
    return e ? (e = ii, e) : ii;
  }
  function Nm(e, t, l, i, o, s) {
    o = Mm(o), i.context === null ? i.context = o : i.pendingContext = o, i = Fn(t), i.payload = { element: l }, s = s === void 0 ? null : s, s !== null && (i.callback = s), l = Jn(e, i, t), l !== null && (Nt(l, e, t), ea(l, e, t));
  }
  function Rm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Rs(e, t) {
    Rm(e, t), (e = e.alternate) && Rm(e, t);
  }
  function jm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Sl(e, 67108864);
      t !== null && Nt(t, e, 67108864), Rs(e, 67108864);
    }
  }
  function Lm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xt();
      t = Cu(t);
      var l = Sl(e, t);
      l !== null && Nt(l, e, t), Rs(e, t);
    }
  }
  var Pr = !0;
  function U1(e, t, l, i) {
    var o = _.T;
    _.T = null;
    var s = F.p;
    try {
      F.p = 2, js(e, t, l, i);
    } finally {
      F.p = s, _.T = o;
    }
  }
  function B1(e, t, l, i) {
    var o = _.T;
    _.T = null;
    var s = F.p;
    try {
      F.p = 8, js(e, t, l, i);
    } finally {
      F.p = s, _.T = o;
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
        ), Bm(e, i);
      else if (q1(
        o,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (Bm(e, i), t & 4 && -1 < H1.indexOf(e)) {
        for (; o !== null; ) {
          var s = Kl(o);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var g = gl(s.pendingLanes);
                  if (g !== 0) {
                    var v = s;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; g; ) {
                      var E = 1 << 31 - Xe(g);
                      v.entanglements[1] |= E, g &= ~E;
                    }
                    mn(s), (Le & 6) === 0 && (Lr = xt() + 500, ga(0));
                  }
                }
                break;
              case 31:
              case 13:
                v = Sl(s, 2), v !== null && Nt(v, s, 2), Br(), Rs(s, 2);
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
      var t = h(e);
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
  function Um(e) {
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
          case G:
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
  var Bs = !1, rl = null, ul = null, ol = null, wa = /* @__PURE__ */ new Map(), Ea = /* @__PURE__ */ new Map(), sl = [], H1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Bm(e, t) {
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
    }, t !== null && (t = Kl(t), t !== null && jm(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function q1(e, t, l, i, o) {
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
  function Hm(e) {
    var t = Zl(e.target);
    if (t !== null) {
      var l = h(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = f(l), t !== null) {
            e.blockedOn = t, Wc(e.priority, function() {
              Lm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, Wc(e.priority, function() {
              Lm(l);
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
        return t = Kl(l), t !== null && jm(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function qm(e, t, l) {
    tu(e) && l.delete(t);
  }
  function Y1() {
    Bs = !1, rl !== null && tu(rl) && (rl = null), ul !== null && tu(ul) && (ul = null), ol !== null && tu(ol) && (ol = null), wa.forEach(qm), Ea.forEach(qm);
  }
  function nu(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Bs || (Bs = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      Y1
    )));
  }
  var lu = null;
  function Ym(e) {
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
      Hm(l), l.blockedOn === null && sl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var o = l[i], s = l[i + 1], g = o[At] || null;
        if (typeof s == "function")
          g || Ym(l);
        else if (g) {
          var v = null;
          if (s && s.hasAttribute("formAction")) {
            if (o = s, g = s[At] || null)
              v = g.formAction;
            else if (Us(o) !== null) continue;
          } else v = g.action;
          typeof v == "function" ? l[i + 1] = v : (l.splice(i, 3), i -= 3), Ym(l);
        }
      }
  }
  function Gm() {
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
    Nm(l, i, e, t, null, null);
  }, iu.prototype.unmount = Hs.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Nm(e.current, 2, null, e, null, null), Br(), t[Ql] = null;
    }
  };
  function iu(e) {
    this._internalRoot = e;
  }
  iu.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = $c();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < sl.length && t !== 0 && t < sl[l].priority; l++) ;
      sl.splice(l, 0, e), l === 0 && Hm(e);
    }
  };
  var Vm = r.version;
  if (Vm !== "19.2.7")
    throw Error(
      u(
        527,
        Vm,
        "19.2.7"
      )
    );
  F.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = d(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var G1 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var au = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!au.isDisabled && au.supportsFiber)
      try {
        St = au.inject(
          G1
        ), rt = au;
      } catch {
      }
  }
  return Aa.createRoot = function(e, t) {
    if (!c(e)) throw Error(u(299));
    var l = !1, i = "", o = Ih, s = $h, g = Wh;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (g = t.onRecoverableError)), t = Om(
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
      Gm
    ), e[Ql] = t.current, xs(e), new Hs(t);
  }, Aa.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(u(299));
    var i = !1, o = "", s = Ih, g = $h, v = Wh, E = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (o = l.identifierPrefix), l.onUncaughtError !== void 0 && (s = l.onUncaughtError), l.onCaughtError !== void 0 && (g = l.onCaughtError), l.onRecoverableError !== void 0 && (v = l.onRecoverableError), l.formState !== void 0 && (E = l.formState)), t = Om(
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
      v,
      Gm
    ), t.context = Mm(null), l = t.current, i = Xt(), i = Cu(i), o = Fn(i), o.callback = null, Jn(l, o, i), l = i, t.current.lanes = l, Li(t, l), mn(t), e[Ql] = t.current, xs(e), new iu(t);
  }, Aa.version = "19.2.7", Aa;
}
var Pm;
function W1() {
  if (Pm) return Gs.exports;
  Pm = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return n(), Gs.exports = /* @__PURE__ */ $1(), Gs.exports;
}
var P1 = /* @__PURE__ */ W1();
function e0(n, r) {
  const a = {};
  return (n[n.length - 1] === "" ? [...n, ""] : n).join(
    (a.padRight ? " " : "") + "," + (a.padLeft === !1 ? "" : " ")
  ).trim();
}
const t0 = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, n0 = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, l0 = {};
function ep(n, r) {
  return (l0.jsx ? n0 : t0).test(n);
}
const i0 = /[ \t\n\f\r]/g;
function a0(n) {
  return typeof n == "object" ? n.type === "text" ? tp(n.value) : !1 : tp(n);
}
function tp(n) {
  return n.replace(i0, "") === "";
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
function hc(n) {
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
let r0 = 0;
const be = Hl(), at = Hl(), dc = Hl(), J = Hl(), Ze = Hl(), Ul = Hl(), Qt = Hl();
function Hl() {
  return 2 ** ++r0;
}
const mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: be,
  booleanish: at,
  commaOrSpaceSeparated: Qt,
  commaSeparated: Ul,
  number: J,
  overloadedBoolean: dc,
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
    let h = -1;
    if (super(r, a), np(this, "space", c), typeof u == "number")
      for (; ++h < Zs.length; ) {
        const f = Zs[h];
        np(this, Zs[h], (u & mc[f]) === mc[f]);
      }
  }
}
Tc.prototype.defined = !0;
function np(n, r, a) {
  a && (n[r] = a);
}
function Mi(n) {
  const r = {}, a = {};
  for (const [u, c] of Object.entries(n.properties)) {
    const h = new Tc(
      u,
      n.transform(n.attributes || {}, u),
      c,
      n.space
    );
    n.mustUseProperty && n.mustUseProperty.includes(u) && (h.mustUseProperty = !0), r[u] = h, a[hc(u)] = u, a[hc(h.attribute)] = u;
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
const u0 = Mi({
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
    download: dc,
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
    hidden: dc,
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
}), o0 = Mi({
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
}), s0 = {
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
}, c0 = /[A-Z]/g, lp = /-[a-z]/g, f0 = /^data[-\w.:]+$/i;
function h0(n, r) {
  const a = hc(r);
  let u = r, c = Lt;
  if (a in n.normal)
    return n.property[n.normal[a]];
  if (a.length > 4 && a.slice(0, 4) === "data" && f0.test(r)) {
    if (r.charAt(4) === "-") {
      const h = r.slice(5).replace(lp, m0);
      u = "data" + h.charAt(0).toUpperCase() + h.slice(1);
    } else {
      const h = r.slice(4);
      if (!lp.test(h)) {
        let f = h.replace(c0, d0);
        f.charAt(0) !== "-" && (f = "-" + f), r = "data" + f;
      }
    }
    c = Tc;
  }
  return new c(u, r);
}
function d0(n) {
  return "-" + n.toLowerCase();
}
function m0(n) {
  return n.charAt(1).toUpperCase();
}
const p0 = Pp([eg, u0, lg, ig, ag], "html"), Ac = Pp([eg, o0, lg, ig, ag], "svg");
function g0(n) {
  return n.join(" ").trim();
}
var _i = {}, Ks, ip;
function y0() {
  if (ip) return Ks;
  ip = 1;
  var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, a = /^\s*/, u = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, c = /^:\s*/, h = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, f = /^[;\s]*/, m = /^\s+|\s+$/g, p = `
`, d = "/", b = "*", y = "", S = "comment", x = "declaration";
  function A(Y, D) {
    if (typeof Y != "string")
      throw new TypeError("First argument must be a string");
    if (!Y) return [];
    D = D || {};
    var Z = 1, X = 1;
    function se(re) {
      var I = re.match(r);
      I && (Z += I.length);
      var _ = re.lastIndexOf(p);
      X = ~_ ? re.length - _ : X + re.length;
    }
    function fe() {
      var re = { line: Z, column: X };
      return function(I) {
        return I.position = new U(re), he(), I;
      };
    }
    function U(re) {
      this.start = re, this.end = { line: Z, column: X }, this.source = D.source;
    }
    U.prototype.content = Y;
    function $(re) {
      var I = new Error(
        D.source + ":" + Z + ":" + X + ": " + re
      );
      if (I.reason = re, I.filename = D.source, I.line = Z, I.column = X, I.source = Y, !D.silent) throw I;
    }
    function K(re) {
      var I = re.exec(Y);
      if (I) {
        var _ = I[0];
        return se(_), Y = Y.slice(_.length), I;
      }
    }
    function he() {
      K(a);
    }
    function R(re) {
      var I;
      for (re = re || []; I = te(); )
        I !== !1 && re.push(I);
      return re;
    }
    function te() {
      var re = fe();
      if (!(d != Y.charAt(0) || b != Y.charAt(1))) {
        for (var I = 2; y != Y.charAt(I) && (b != Y.charAt(I) || d != Y.charAt(I + 1)); )
          ++I;
        if (I += 2, y === Y.charAt(I - 1))
          return $("End of comment missing");
        var _ = Y.slice(2, I - 2);
        return X += 2, se(_), Y = Y.slice(I), X += 2, re({
          type: S,
          comment: _
        });
      }
    }
    function ee() {
      var re = fe(), I = K(u);
      if (I) {
        if (te(), !K(c)) return $("property missing ':'");
        var _ = K(h), F = re({
          type: x,
          property: L(I[0].replace(n, y)),
          value: _ ? L(_[0].replace(n, y)) : y
        });
        return K(f), F;
      }
    }
    function Ee() {
      var re = [];
      R(re);
      for (var I; I = ee(); )
        I !== !1 && (re.push(I), R(re));
      return re;
    }
    return he(), Ee();
  }
  function L(Y) {
    return Y ? Y.replace(m, y) : y;
  }
  return Ks = A, Ks;
}
var ap;
function b0() {
  if (ap) return _i;
  ap = 1;
  var n = _i && _i.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(_i, "__esModule", { value: !0 }), _i.default = a;
  const r = n(/* @__PURE__ */ y0());
  function a(u, c) {
    let h = null;
    if (!u || typeof u != "string")
      return h;
    const f = (0, r.default)(u), m = typeof c == "function";
    return f.forEach((p) => {
      if (p.type !== "declaration")
        return;
      const { property: d, value: b } = p;
      m ? c(d, b, p) : b && (h = h || {}, h[d] = b);
    }), h;
  }
  return _i;
}
var Ca = {}, rp;
function v0() {
  if (rp) return Ca;
  rp = 1, Object.defineProperty(Ca, "__esModule", { value: !0 }), Ca.camelCase = void 0;
  var n = /^--[a-zA-Z0-9_-]+$/, r = /-([a-z])/g, a = /^[^-]+$/, u = /^-(webkit|moz|ms|o|khtml)-/, c = /^-(ms)-/, h = function(d) {
    return !d || a.test(d) || n.test(d);
  }, f = function(d, b) {
    return b.toUpperCase();
  }, m = function(d, b) {
    return "".concat(b, "-");
  }, p = function(d, b) {
    return b === void 0 && (b = {}), h(d) ? d : (d = d.toLowerCase(), b.reactCompat ? d = d.replace(c, m) : d = d.replace(u, m), d.replace(r, f));
  };
  return Ca.camelCase = p, Ca;
}
var _a, up;
function x0() {
  if (up) return _a;
  up = 1;
  var n = _a && _a.__importDefault || function(c) {
    return c && c.__esModule ? c : { default: c };
  }, r = n(/* @__PURE__ */ b0()), a = /* @__PURE__ */ v0();
  function u(c, h) {
    var f = {};
    return !c || typeof c != "string" || (0, r.default)(c, function(m, p) {
      m && p && (f[(0, a.camelCase)(m, h)] = p);
    }), f;
  }
  return u.default = u, _a = u, _a;
}
var S0 = /* @__PURE__ */ x0();
const k0 = /* @__PURE__ */ Wp(S0), rg = ug("end"), Cc = ug("start");
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
function w0(n) {
  const r = Cc(n), a = rg(n);
  if (r && a)
    return { start: r, end: a };
}
function Na(n) {
  return !n || typeof n != "object" ? "" : "position" in n || "type" in n ? op(n.position) : "start" in n || "end" in n ? op(n) : "line" in n || "column" in n ? pc(n) : "";
}
function pc(n) {
  return sp(n && n.line) + ":" + sp(n && n.column);
}
function op(n) {
  return pc(n && n.start) + "-" + pc(n && n.end);
}
function sp(n) {
  return n && typeof n == "number" ? n : 1;
}
class bt extends Error {
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
    let c = "", h = {}, f = !1;
    if (a && ("line" in a && "column" in a ? h = { place: a } : "start" in a && "end" in a ? h = { place: a } : "type" in a ? h = {
      ancestors: [a],
      place: a.position
    } : h = { ...a }), typeof r == "string" ? c = r : !h.cause && r && (f = !0, c = r.message, h.cause = r), !h.ruleId && !h.source && typeof u == "string") {
      const p = u.indexOf(":");
      p === -1 ? h.ruleId = u : (h.source = u.slice(0, p), h.ruleId = u.slice(p + 1));
    }
    if (!h.place && h.ancestors && h.ancestors) {
      const p = h.ancestors[h.ancestors.length - 1];
      p && (h.place = p.position);
    }
    const m = h.place && "start" in h.place ? h.place.start : h.place;
    this.ancestors = h.ancestors || void 0, this.cause = h.cause || void 0, this.column = m ? m.column : void 0, this.fatal = void 0, this.file = "", this.message = c, this.line = m ? m.line : void 0, this.name = Na(h.place) || "1:1", this.place = h.place || void 0, this.reason = this.message, this.ruleId = h.ruleId || void 0, this.source = h.source || void 0, this.stack = f && h.cause && typeof h.cause.stack == "string" ? h.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
bt.prototype.file = "";
bt.prototype.name = "";
bt.prototype.reason = "";
bt.prototype.message = "";
bt.prototype.stack = "";
bt.prototype.column = void 0;
bt.prototype.line = void 0;
bt.prototype.ancestors = void 0;
bt.prototype.cause = void 0;
bt.prototype.fatal = void 0;
bt.prototype.place = void 0;
bt.prototype.ruleId = void 0;
bt.prototype.source = void 0;
const _c = {}.hasOwnProperty, E0 = /* @__PURE__ */ new Map(), z0 = /[A-Z]/g, T0 = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), A0 = /* @__PURE__ */ new Set(["td", "th"]), og = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function C0(n, r) {
  if (!r || r.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const a = r.filePath || void 0;
  let u;
  if (r.development) {
    if (typeof r.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    u = L0(a, r.jsxDEV);
  } else {
    if (typeof r.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof r.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    u = j0(a, r.jsx, r.jsxs);
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
    schema: r.space === "svg" ? Ac : p0,
    stylePropertyNameCase: r.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: r.tableCellAlignToStyle !== !1
  }, h = sg(c, n, void 0);
  return h && typeof h != "string" ? h : c.create(
    n,
    c.Fragment,
    { children: h || void 0 },
    void 0
  );
}
function sg(n, r, a) {
  if (r.type === "element")
    return _0(n, r, a);
  if (r.type === "mdxFlowExpression" || r.type === "mdxTextExpression")
    return D0(n, r);
  if (r.type === "mdxJsxFlowElement" || r.type === "mdxJsxTextElement")
    return M0(n, r, a);
  if (r.type === "mdxjsEsm")
    return O0(n, r);
  if (r.type === "root")
    return N0(n, r, a);
  if (r.type === "text")
    return R0(n, r);
}
function _0(n, r, a) {
  const u = n.schema;
  let c = u;
  r.tagName.toLowerCase() === "svg" && u.space === "html" && (c = Ac, n.schema = c), n.ancestors.push(r);
  const h = fg(n, r.tagName, !1), f = U0(n, r);
  let m = Oc(n, r);
  return T0.has(r.tagName) && (m = m.filter(function(p) {
    return typeof p == "string" ? !a0(p) : !0;
  })), cg(n, f, h, r), Dc(f, m), n.ancestors.pop(), n.schema = u, n.create(r, h, f, a);
}
function D0(n, r) {
  if (r.data && r.data.estree && n.evaluater) {
    const u = r.data.estree.body[0];
    return u.type, /** @type {Child | undefined} */
    n.evaluater.evaluateExpression(u.expression);
  }
  Ua(n, r.position);
}
function O0(n, r) {
  if (r.data && r.data.estree && n.evaluater)
    return (
      /** @type {Child | undefined} */
      n.evaluater.evaluateProgram(r.data.estree)
    );
  Ua(n, r.position);
}
function M0(n, r, a) {
  const u = n.schema;
  let c = u;
  r.name === "svg" && u.space === "html" && (c = Ac, n.schema = c), n.ancestors.push(r);
  const h = r.name === null ? n.Fragment : fg(n, r.name, !0), f = B0(n, r), m = Oc(n, r);
  return cg(n, f, h, r), Dc(f, m), n.ancestors.pop(), n.schema = u, n.create(r, h, f, a);
}
function N0(n, r, a) {
  const u = {};
  return Dc(u, Oc(n, r)), n.create(r, n.Fragment, u, a);
}
function R0(n, r) {
  return r.value;
}
function cg(n, r, a, u) {
  typeof a != "string" && a !== n.Fragment && n.passNode && (r.node = u);
}
function Dc(n, r) {
  if (r.length > 0) {
    const a = r.length > 1 ? r : r[0];
    a && (n.children = a);
  }
}
function j0(n, r, a) {
  return u;
  function u(c, h, f, m) {
    const d = Array.isArray(f.children) ? a : r;
    return m ? d(h, f, m) : d(h, f);
  }
}
function L0(n, r) {
  return a;
  function a(u, c, h, f) {
    const m = Array.isArray(h.children), p = Cc(u);
    return r(
      c,
      h,
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
function U0(n, r) {
  const a = {};
  let u, c;
  for (c in r.properties)
    if (c !== "children" && _c.call(r.properties, c)) {
      const h = H0(n, c, r.properties[c]);
      if (h) {
        const [f, m] = h;
        n.tableCellAlignToStyle && f === "align" && typeof m == "string" && A0.has(r.tagName) ? u = m : a[f] = m;
      }
    }
  if (u) {
    const h = (
      /** @type {Style} */
      a.style || (a.style = {})
    );
    h[n.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = u;
  }
  return a;
}
function B0(n, r) {
  const a = {};
  for (const u of r.attributes)
    if (u.type === "mdxJsxExpressionAttribute")
      if (u.data && u.data.estree && n.evaluater) {
        const h = u.data.estree.body[0];
        h.type;
        const f = h.expression;
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
      let h;
      if (u.value && typeof u.value == "object")
        if (u.value.data && u.value.data.estree && n.evaluater) {
          const m = u.value.data.estree.body[0];
          m.type, h = n.evaluater.evaluateExpression(m.expression);
        } else
          Ua(n, r.position);
      else
        h = u.value === null ? !0 : u.value;
      a[c] = /** @type {Props[keyof Props]} */
      h;
    }
  return a;
}
function Oc(n, r) {
  const a = [];
  let u = -1;
  const c = n.passKeys ? /* @__PURE__ */ new Map() : E0;
  for (; ++u < r.children.length; ) {
    const h = r.children[u];
    let f;
    if (n.passKeys) {
      const p = h.type === "element" ? h.tagName : h.type === "mdxJsxFlowElement" || h.type === "mdxJsxTextElement" ? h.name : void 0;
      if (p) {
        const d = c.get(p) || 0;
        f = p + "-" + d, c.set(p, d + 1);
      }
    }
    const m = sg(n, h, f);
    m !== void 0 && a.push(m);
  }
  return a;
}
function H0(n, r, a) {
  const u = h0(n.schema, r);
  if (!(a == null || typeof a == "number" && Number.isNaN(a))) {
    if (Array.isArray(a) && (a = u.commaSeparated ? e0(a) : g0(a)), u.property === "style") {
      let c = typeof a == "object" ? a : q0(n, String(a));
      return n.stylePropertyNameCase === "css" && (c = Y0(c)), ["style", c];
    }
    return [
      n.elementAttributeNameCase === "react" && u.space ? s0[u.property] || u.property : u.attribute,
      a
    ];
  }
}
function q0(n, r) {
  try {
    return k0(r, { reactCompat: !0 });
  } catch (a) {
    if (n.ignoreInvalidStyle)
      return {};
    const u = (
      /** @type {Error} */
      a
    ), c = new bt("Cannot parse `style` attribute", {
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
    let h = -1, f;
    for (; ++h < c.length; ) {
      const m = ep(c[h]) ? { type: "Identifier", name: c[h] } : { type: "Literal", value: c[h] };
      f = f ? {
        type: "MemberExpression",
        object: f,
        property: m,
        computed: !!(h && m.type === "Literal"),
        optional: !1
      } : m;
    }
    u = f;
  } else
    u = ep(r) && !/^[a-z]/.test(r) ? { type: "Identifier", name: r } : { type: "Literal", value: r };
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
  const a = new bt(
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
function Y0(n) {
  const r = {};
  let a;
  for (a in n)
    _c.call(n, a) && (r[G0(a)] = n[a]);
  return r;
}
function G0(n) {
  let r = n.replace(z0, V0);
  return r.slice(0, 3) === "ms-" && (r = "-" + r), r;
}
function V0(n) {
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
}, X0 = {};
function Mc(n, r) {
  const a = X0, u = typeof a.includeImageAlt == "boolean" ? a.includeImageAlt : !0, c = typeof a.includeHtml == "boolean" ? a.includeHtml : !0;
  return hg(n, u, c);
}
function hg(n, r, a) {
  if (Q0(n)) {
    if ("value" in n)
      return n.type === "html" && !a ? "" : n.value;
    if (r && "alt" in n && n.alt)
      return n.alt;
    if ("children" in n)
      return cp(n.children, r, a);
  }
  return Array.isArray(n) ? cp(n, r, a) : "";
}
function cp(n, r, a) {
  const u = [];
  let c = -1;
  for (; ++c < n.length; )
    u[c] = hg(n[c], r, a);
  return u.join("");
}
function Q0(n) {
  return !!(n && typeof n == "object");
}
const fp = document.createElement("i");
function Nc(n) {
  const r = "&" + n + ";";
  fp.innerHTML = r;
  const a = fp.textContent;
  return a.charCodeAt(a.length - 1) === 59 && n !== "semi" || a === r ? !1 : a;
}
function Zt(n, r, a, u) {
  const c = n.length;
  let h = 0, f;
  if (r < 0 ? r = -r > c ? 0 : c + r : r = r > c ? c : r, a = a > 0 ? a : 0, u.length < 1e4)
    f = Array.from(u), f.unshift(r, a), n.splice(...f);
  else
    for (a && n.splice(r, a); h < u.length; )
      f = u.slice(h, h + 1e4), f.unshift(r, 0), n.splice(...f), h += 1e4, r += 1e4;
}
function ln(n, r) {
  return n.length > 0 ? (Zt(n, n.length, 0, r), n) : r;
}
const hp = {}.hasOwnProperty;
function dg(n) {
  const r = {};
  let a = -1;
  for (; ++a < n.length; )
    Z0(r, n[a]);
  return r;
}
function Z0(n, r) {
  let a;
  for (a in r) {
    const c = (hp.call(n, a) ? n[a] : void 0) || (n[a] = {}), h = r[a];
    let f;
    if (h)
      for (f in h) {
        hp.call(c, f) || (c[f] = []);
        const m = h[f];
        K0(
          // @ts-expect-error Looks like a list.
          c[f],
          Array.isArray(m) ? m : m ? [m] : []
        );
      }
  }
}
function K0(n, r) {
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
const wt = dl(/[A-Za-z]/), yt = dl(/[\dA-Za-z]/), F0 = dl(/[#-'*+\--9=?A-Z^-~]/);
function mu(n) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    n !== null && (n < 32 || n === 127)
  );
}
const gc = dl(/\d/), J0 = dl(/[\dA-Fa-f]/), I0 = dl(/[!-/:-@[-`{-~]/);
function me(n) {
  return n !== null && n < -2;
}
function Ke(n) {
  return n !== null && (n < 0 || n === 32);
}
function _e(n) {
  return n === -2 || n === -1 || n === 32;
}
const vu = dl(new RegExp("\\p{P}|\\p{S}", "u")), Bl = dl(/\s/);
function dl(n) {
  return r;
  function r(a) {
    return a !== null && a > -1 && n.test(String.fromCharCode(a));
  }
}
function Ni(n) {
  const r = [];
  let a = -1, u = 0, c = 0;
  for (; ++a < n.length; ) {
    const h = n.charCodeAt(a);
    let f = "";
    if (h === 37 && yt(n.charCodeAt(a + 1)) && yt(n.charCodeAt(a + 2)))
      c = 2;
    else if (h < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(h)) || (f = String.fromCharCode(h));
    else if (h > 55295 && h < 57344) {
      const m = n.charCodeAt(a + 1);
      h < 56320 && m > 56319 && m < 57344 ? (f = String.fromCharCode(h, m), c = 1) : f = "�";
    } else
      f = String.fromCharCode(h);
    f && (r.push(n.slice(u, a), encodeURIComponent(f)), u = a + c + 1, f = ""), c && (a += c, c = 0);
  }
  return r.join("") + n.slice(u);
}
function Ne(n, r, a, u) {
  const c = u ? u - 1 : Number.POSITIVE_INFINITY;
  let h = 0;
  return f;
  function f(p) {
    return _e(p) ? (n.enter(a), m(p)) : r(p);
  }
  function m(p) {
    return _e(p) && h++ < c ? (n.consume(p), m) : (n.exit(a), r(p));
  }
}
const $0 = {
  tokenize: W0
};
function W0(n) {
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
    return n.enter("paragraph"), h(m);
  }
  function h(m) {
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
    return me(m) ? (n.consume(m), n.exit("chunkText"), h) : (n.consume(m), f);
  }
}
const P0 = {
  tokenize: ev
}, dp = {
  tokenize: tv
};
function ev(n) {
  const r = this, a = [];
  let u = 0, c, h, f;
  return m;
  function m(X) {
    if (u < a.length) {
      const se = a[u];
      return r.containerState = se[1], n.attempt(se[0].continuation, p, d)(X);
    }
    return d(X);
  }
  function p(X) {
    if (u++, r.containerState._closeFlow) {
      r.containerState._closeFlow = void 0, c && Z();
      const se = r.events.length;
      let fe = se, U;
      for (; fe--; )
        if (r.events[fe][0] === "exit" && r.events[fe][1].type === "chunkFlow") {
          U = r.events[fe][1].end;
          break;
        }
      D(u);
      let $ = se;
      for (; $ < r.events.length; )
        r.events[$][1].end = {
          ...U
        }, $++;
      return Zt(r.events, fe + 1, 0, r.events.slice(se)), r.events.length = $, d(X);
    }
    return m(X);
  }
  function d(X) {
    if (u === a.length) {
      if (!c)
        return S(X);
      if (c.currentConstruct && c.currentConstruct.concrete)
        return A(X);
      r.interrupt = !!(c.currentConstruct && !c._gfmTableDynamicInterruptHack);
    }
    return r.containerState = {}, n.check(dp, b, y)(X);
  }
  function b(X) {
    return c && Z(), D(u), S(X);
  }
  function y(X) {
    return r.parser.lazy[r.now().line] = u !== a.length, f = r.now().offset, A(X);
  }
  function S(X) {
    return r.containerState = {}, n.attempt(dp, x, A)(X);
  }
  function x(X) {
    return u++, a.push([r.currentConstruct, r.containerState]), S(X);
  }
  function A(X) {
    if (X === null) {
      c && Z(), D(0), n.consume(X);
      return;
    }
    return c = c || r.parser.flow(r.now()), n.enter("chunkFlow", {
      _tokenizer: c,
      contentType: "flow",
      previous: h
    }), L(X);
  }
  function L(X) {
    if (X === null) {
      Y(n.exit("chunkFlow"), !0), D(0), n.consume(X);
      return;
    }
    return me(X) ? (n.consume(X), Y(n.exit("chunkFlow")), u = 0, r.interrupt = void 0, m) : (n.consume(X), L);
  }
  function Y(X, se) {
    const fe = r.sliceStream(X);
    if (se && fe.push(null), X.previous = h, h && (h.next = X), h = X, c.defineSkip(X.start), c.write(fe), r.parser.lazy[X.start.line]) {
      let U = c.events.length;
      for (; U--; )
        if (
          // The token starts before the line ending…
          c.events[U][1].start.offset < f && // …and either is not ended yet…
          (!c.events[U][1].end || // …or ends after it.
          c.events[U][1].end.offset > f)
        )
          return;
      const $ = r.events.length;
      let K = $, he, R;
      for (; K--; )
        if (r.events[K][0] === "exit" && r.events[K][1].type === "chunkFlow") {
          if (he) {
            R = r.events[K][1].end;
            break;
          }
          he = !0;
        }
      for (D(u), U = $; U < r.events.length; )
        r.events[U][1].end = {
          ...R
        }, U++;
      Zt(r.events, K + 1, 0, r.events.slice($)), r.events.length = U;
    }
  }
  function D(X) {
    let se = a.length;
    for (; se-- > X; ) {
      const fe = a[se];
      r.containerState = fe[1], fe[0].exit.call(r, n);
    }
    a.length = X;
  }
  function Z() {
    c.write([null]), h = void 0, c = void 0, r.containerState._closeFlow = void 0;
  }
}
function tv(n, r, a) {
  return Ne(n, n.attempt(this.parser.constructs.document, r, a), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Oi(n) {
  if (n === null || Ke(n) || Bl(n))
    return 1;
  if (vu(n))
    return 2;
}
function xu(n, r, a) {
  const u = [];
  let c = -1;
  for (; ++c < n.length; ) {
    const h = n[c].resolveAll;
    h && !u.includes(h) && (r = h(r, a), u.push(h));
  }
  return r;
}
const yc = {
  name: "attention",
  resolveAll: nv,
  tokenize: lv
};
function nv(n, r) {
  let a = -1, u, c, h, f, m, p, d, b;
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
          mp(y, -p), mp(S, p), f = {
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
          }, h = {
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
          }, d = [], n[u][1].end.offset - n[u][1].start.offset && (d = ln(d, [["enter", n[u][1], r], ["exit", n[u][1], r]])), d = ln(d, [["enter", c, r], ["enter", f, r], ["exit", f, r], ["enter", h, r]]), d = ln(d, xu(r.parser.constructs.insideSpan.null, n.slice(u + 1, a), r)), d = ln(d, [["exit", h, r], ["enter", m, r], ["exit", m, r], ["exit", c, r]]), n[a][1].end.offset - n[a][1].start.offset ? (b = 2, d = ln(d, [["enter", n[a][1], r], ["exit", n[a][1], r]])) : b = 0, Zt(n, u - 1, a - u + 3, d), a = u + d.length - b - 2;
          break;
        }
    }
  for (a = -1; ++a < n.length; )
    n[a][1].type === "attentionSequence" && (n[a][1].type = "data");
  return n;
}
function lv(n, r) {
  const a = this.parser.constructs.attentionMarkers.null, u = this.previous, c = Oi(u);
  let h;
  return f;
  function f(p) {
    return h = p, n.enter("attentionSequence"), m(p);
  }
  function m(p) {
    if (p === h)
      return n.consume(p), m;
    const d = n.exit("attentionSequence"), b = Oi(p), y = !b || b === 2 && c || a.includes(p), S = !c || c === 2 && b || a.includes(u);
    return d._open = !!(h === 42 ? y : y && (c || !S)), d._close = !!(h === 42 ? S : S && (b || !y)), r(p);
  }
}
function mp(n, r) {
  n.column += r, n.offset += r, n._bufferIndex += r;
}
const iv = {
  name: "autolink",
  tokenize: av
};
function av(n, r, a) {
  let u = 0;
  return c;
  function c(x) {
    return n.enter("autolink"), n.enter("autolinkMarker"), n.consume(x), n.exit("autolinkMarker"), n.enter("autolinkProtocol"), h;
  }
  function h(x) {
    return wt(x) ? (n.consume(x), f) : x === 64 ? a(x) : d(x);
  }
  function f(x) {
    return x === 43 || x === 45 || x === 46 || yt(x) ? (u = 1, m(x)) : d(x);
  }
  function m(x) {
    return x === 58 ? (n.consume(x), u = 0, p) : (x === 43 || x === 45 || x === 46 || yt(x)) && u++ < 32 ? (n.consume(x), m) : (u = 0, d(x));
  }
  function p(x) {
    return x === 62 ? (n.exit("autolinkProtocol"), n.enter("autolinkMarker"), n.consume(x), n.exit("autolinkMarker"), n.exit("autolink"), r) : x === null || x === 32 || x === 60 || mu(x) ? a(x) : (n.consume(x), p);
  }
  function d(x) {
    return x === 64 ? (n.consume(x), b) : F0(x) ? (n.consume(x), d) : a(x);
  }
  function b(x) {
    return yt(x) ? y(x) : a(x);
  }
  function y(x) {
    return x === 46 ? (n.consume(x), u = 0, b) : x === 62 ? (n.exit("autolinkProtocol").type = "autolinkEmail", n.enter("autolinkMarker"), n.consume(x), n.exit("autolinkMarker"), n.exit("autolink"), r) : S(x);
  }
  function S(x) {
    if ((x === 45 || yt(x)) && u++ < 63) {
      const A = x === 45 ? S : y;
      return n.consume(x), A;
    }
    return a(x);
  }
}
const qa = {
  partial: !0,
  tokenize: rv
};
function rv(n, r, a) {
  return u;
  function u(h) {
    return _e(h) ? Ne(n, c, "linePrefix")(h) : c(h);
  }
  function c(h) {
    return h === null || me(h) ? r(h) : a(h);
  }
}
const pg = {
  continuation: {
    tokenize: ov
  },
  exit: sv,
  name: "blockQuote",
  tokenize: uv
};
function uv(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    if (f === 62) {
      const m = u.containerState;
      return m.open || (n.enter("blockQuote", {
        _container: !0
      }), m.open = !0), n.enter("blockQuotePrefix"), n.enter("blockQuoteMarker"), n.consume(f), n.exit("blockQuoteMarker"), h;
    }
    return a(f);
  }
  function h(f) {
    return _e(f) ? (n.enter("blockQuotePrefixWhitespace"), n.consume(f), n.exit("blockQuotePrefixWhitespace"), n.exit("blockQuotePrefix"), r) : (n.exit("blockQuotePrefix"), r(f));
  }
}
function ov(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return _e(f) ? Ne(n, h, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : h(f);
  }
  function h(f) {
    return n.attempt(pg, r, a)(f);
  }
}
function sv(n) {
  n.exit("blockQuote");
}
const gg = {
  name: "characterEscape",
  tokenize: cv
};
function cv(n, r, a) {
  return u;
  function u(h) {
    return n.enter("characterEscape"), n.enter("escapeMarker"), n.consume(h), n.exit("escapeMarker"), c;
  }
  function c(h) {
    return I0(h) ? (n.enter("characterEscapeValue"), n.consume(h), n.exit("characterEscapeValue"), n.exit("characterEscape"), r) : a(h);
  }
}
const yg = {
  name: "characterReference",
  tokenize: fv
};
function fv(n, r, a) {
  const u = this;
  let c = 0, h, f;
  return m;
  function m(y) {
    return n.enter("characterReference"), n.enter("characterReferenceMarker"), n.consume(y), n.exit("characterReferenceMarker"), p;
  }
  function p(y) {
    return y === 35 ? (n.enter("characterReferenceMarkerNumeric"), n.consume(y), n.exit("characterReferenceMarkerNumeric"), d) : (n.enter("characterReferenceValue"), h = 31, f = yt, b(y));
  }
  function d(y) {
    return y === 88 || y === 120 ? (n.enter("characterReferenceMarkerHexadecimal"), n.consume(y), n.exit("characterReferenceMarkerHexadecimal"), n.enter("characterReferenceValue"), h = 6, f = J0, b) : (n.enter("characterReferenceValue"), h = 7, f = gc, b(y));
  }
  function b(y) {
    if (y === 59 && c) {
      const S = n.exit("characterReferenceValue");
      return f === yt && !Nc(u.sliceSerialize(S)) ? a(y) : (n.enter("characterReferenceMarker"), n.consume(y), n.exit("characterReferenceMarker"), n.exit("characterReference"), r);
    }
    return f(y) && c++ < h ? (n.consume(y), b) : a(y);
  }
}
const pp = {
  partial: !0,
  tokenize: dv
}, gp = {
  concrete: !0,
  name: "codeFenced",
  tokenize: hv
};
function hv(n, r, a) {
  const u = this, c = {
    partial: !0,
    tokenize: fe
  };
  let h = 0, f = 0, m;
  return p;
  function p(U) {
    return d(U);
  }
  function d(U) {
    const $ = u.events[u.events.length - 1];
    return h = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, m = U, n.enter("codeFenced"), n.enter("codeFencedFence"), n.enter("codeFencedFenceSequence"), b(U);
  }
  function b(U) {
    return U === m ? (f++, n.consume(U), b) : f < 3 ? a(U) : (n.exit("codeFencedFenceSequence"), _e(U) ? Ne(n, y, "whitespace")(U) : y(U));
  }
  function y(U) {
    return U === null || me(U) ? (n.exit("codeFencedFence"), u.interrupt ? r(U) : n.check(pp, L, se)(U)) : (n.enter("codeFencedFenceInfo"), n.enter("chunkString", {
      contentType: "string"
    }), S(U));
  }
  function S(U) {
    return U === null || me(U) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), y(U)) : _e(U) ? (n.exit("chunkString"), n.exit("codeFencedFenceInfo"), Ne(n, x, "whitespace")(U)) : U === 96 && U === m ? a(U) : (n.consume(U), S);
  }
  function x(U) {
    return U === null || me(U) ? y(U) : (n.enter("codeFencedFenceMeta"), n.enter("chunkString", {
      contentType: "string"
    }), A(U));
  }
  function A(U) {
    return U === null || me(U) ? (n.exit("chunkString"), n.exit("codeFencedFenceMeta"), y(U)) : U === 96 && U === m ? a(U) : (n.consume(U), A);
  }
  function L(U) {
    return n.attempt(c, se, Y)(U);
  }
  function Y(U) {
    return n.enter("lineEnding"), n.consume(U), n.exit("lineEnding"), D;
  }
  function D(U) {
    return h > 0 && _e(U) ? Ne(n, Z, "linePrefix", h + 1)(U) : Z(U);
  }
  function Z(U) {
    return U === null || me(U) ? n.check(pp, L, se)(U) : (n.enter("codeFlowValue"), X(U));
  }
  function X(U) {
    return U === null || me(U) ? (n.exit("codeFlowValue"), Z(U)) : (n.consume(U), X);
  }
  function se(U) {
    return n.exit("codeFenced"), r(U);
  }
  function fe(U, $, K) {
    let he = 0;
    return R;
    function R(I) {
      return U.enter("lineEnding"), U.consume(I), U.exit("lineEnding"), te;
    }
    function te(I) {
      return U.enter("codeFencedFence"), _e(I) ? Ne(U, ee, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(I) : ee(I);
    }
    function ee(I) {
      return I === m ? (U.enter("codeFencedFenceSequence"), Ee(I)) : K(I);
    }
    function Ee(I) {
      return I === m ? (he++, U.consume(I), Ee) : he >= f ? (U.exit("codeFencedFenceSequence"), _e(I) ? Ne(U, re, "whitespace")(I) : re(I)) : K(I);
    }
    function re(I) {
      return I === null || me(I) ? (U.exit("codeFencedFence"), $(I)) : K(I);
    }
  }
}
function dv(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return f === null ? a(f) : (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), h);
  }
  function h(f) {
    return u.parser.lazy[u.now().line] ? a(f) : r(f);
  }
}
const Js = {
  name: "codeIndented",
  tokenize: pv
}, mv = {
  partial: !0,
  tokenize: gv
};
function pv(n, r, a) {
  const u = this;
  return c;
  function c(d) {
    return n.enter("codeIndented"), Ne(n, h, "linePrefix", 5)(d);
  }
  function h(d) {
    const b = u.events[u.events.length - 1];
    return b && b[1].type === "linePrefix" && b[2].sliceSerialize(b[1], !0).length >= 4 ? f(d) : a(d);
  }
  function f(d) {
    return d === null ? p(d) : me(d) ? n.attempt(mv, f, p)(d) : (n.enter("codeFlowValue"), m(d));
  }
  function m(d) {
    return d === null || me(d) ? (n.exit("codeFlowValue"), f(d)) : (n.consume(d), m);
  }
  function p(d) {
    return n.exit("codeIndented"), r(d);
  }
}
function gv(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return u.parser.lazy[u.now().line] ? a(f) : me(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), c) : Ne(n, h, "linePrefix", 5)(f);
  }
  function h(f) {
    const m = u.events[u.events.length - 1];
    return m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? r(f) : me(f) ? c(f) : a(f);
  }
}
const yv = {
  name: "codeText",
  previous: vv,
  resolve: bv,
  tokenize: xv
};
function bv(n) {
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
function vv(n) {
  return n !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function xv(n, r, a) {
  let u = 0, c, h;
  return f;
  function f(y) {
    return n.enter("codeText"), n.enter("codeTextSequence"), m(y);
  }
  function m(y) {
    return y === 96 ? (n.consume(y), u++, m) : (n.exit("codeTextSequence"), p(y));
  }
  function p(y) {
    return y === null ? a(y) : y === 32 ? (n.enter("space"), n.consume(y), n.exit("space"), p) : y === 96 ? (h = n.enter("codeTextSequence"), c = 0, b(y)) : me(y) ? (n.enter("lineEnding"), n.consume(y), n.exit("lineEnding"), p) : (n.enter("codeTextData"), d(y));
  }
  function d(y) {
    return y === null || y === 32 || y === 96 || me(y) ? (n.exit("codeTextData"), p(y)) : (n.consume(y), d);
  }
  function b(y) {
    return y === 96 ? (n.consume(y), c++, b) : c === u ? (n.exit("codeTextSequence"), n.exit("codeText"), r(y)) : (h.type = "codeTextData", d(y));
  }
}
class Sv {
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
    const h = this.right.splice(this.right.length - c, Number.POSITIVE_INFINITY);
    return u && Da(this.left, u), h.reverse();
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
function bg(n) {
  const r = {};
  let a = -1, u, c, h, f, m, p, d;
  const b = new Sv(n);
  for (; ++a < b.length; ) {
    for (; a in r; )
      a = r[a];
    if (u = b.get(a), a && u[1].type === "chunkFlow" && b.get(a - 1)[1].type === "listItemPrefix" && (p = u[1]._tokenizer.events, h = 0, h < p.length && p[h][1].type === "lineEndingBlank" && (h += 2), h < p.length && p[h][1].type === "content"))
      for (; ++h < p.length && p[h][1].type !== "content"; )
        p[h][1].type === "chunkText" && (p[h][1]._isInFirstContentOfListItem = !0, h++);
    if (u[0] === "enter")
      u[1].contentType && (Object.assign(r, kv(b, a)), a = r[a], d = !0);
    else if (u[1]._container) {
      for (h = a, c = void 0; h--; )
        if (f = b.get(h), f[1].type === "lineEnding" || f[1].type === "lineEndingBlank")
          f[0] === "enter" && (c && (b.get(c)[1].type = "lineEndingBlank"), f[1].type = "lineEnding", c = h);
        else if (!(f[1].type === "linePrefix" || f[1].type === "listItemIndent")) break;
      c && (u[1].end = {
        ...b.get(c)[1].start
      }, m = b.slice(c, a), m.unshift(u), b.splice(c, a - c + 1, m));
    }
  }
  return Zt(n, 0, Number.POSITIVE_INFINITY, b.slice(0)), !d;
}
function kv(n, r) {
  const a = n.get(r)[1], u = n.get(r)[2];
  let c = r - 1;
  const h = [];
  let f = a._tokenizer;
  f || (f = u.parser[a.contentType](a.start), a._contentTypeTextTrailing && (f._contentTypeTextTrailing = !0));
  const m = f.events, p = [], d = {};
  let b, y, S = -1, x = a, A = 0, L = 0;
  const Y = [L];
  for (; x; ) {
    for (; n.get(++c)[1] !== x; )
      ;
    h.push(c), x._tokenizer || (b = u.sliceStream(x), x.next || b.push(null), y && f.defineSkip(x.start), x._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = !0), f.write(b), x._isInFirstContentOfListItem && (f._gfmTasklistFirstContentOfListItem = void 0)), y = x, x = x.next;
  }
  for (x = a; ++S < m.length; )
    // Find a void token that includes a break.
    m[S][0] === "exit" && m[S - 1][0] === "enter" && m[S][1].type === m[S - 1][1].type && m[S][1].start.line !== m[S][1].end.line && (L = S + 1, Y.push(L), x._tokenizer = void 0, x.previous = void 0, x = x.next);
  for (f.events = [], x ? (x._tokenizer = void 0, x.previous = void 0) : Y.pop(), S = Y.length; S--; ) {
    const D = m.slice(Y[S], Y[S + 1]), Z = h.pop();
    p.push([Z, Z + D.length - 1]), n.splice(Z, 2, D);
  }
  for (p.reverse(), S = -1; ++S < p.length; )
    d[A + p[S][0]] = A + p[S][1], A += p[S][1] - p[S][0] - 1;
  return d;
}
const wv = {
  resolve: zv,
  tokenize: Tv
}, Ev = {
  partial: !0,
  tokenize: Av
};
function zv(n) {
  return bg(n), n;
}
function Tv(n, r) {
  let a;
  return u;
  function u(m) {
    return n.enter("content"), a = n.enter("chunkContent", {
      contentType: "content"
    }), c(m);
  }
  function c(m) {
    return m === null ? h(m) : me(m) ? n.check(Ev, f, h)(m) : (n.consume(m), c);
  }
  function h(m) {
    return n.exit("chunkContent"), n.exit("content"), r(m);
  }
  function f(m) {
    return n.consume(m), n.exit("chunkContent"), a.next = n.enter("chunkContent", {
      contentType: "content",
      previous: a
    }), a = a.next, c;
  }
}
function Av(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return n.exit("chunkContent"), n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), Ne(n, h, "linePrefix");
  }
  function h(f) {
    if (f === null || me(f))
      return a(f);
    const m = u.events[u.events.length - 1];
    return !u.parser.constructs.disable.null.includes("codeIndented") && m && m[1].type === "linePrefix" && m[2].sliceSerialize(m[1], !0).length >= 4 ? r(f) : n.interrupt(u.parser.constructs.flow, a, r)(f);
  }
}
function vg(n, r, a, u, c, h, f, m, p) {
  const d = p || Number.POSITIVE_INFINITY;
  let b = 0;
  return y;
  function y(D) {
    return D === 60 ? (n.enter(u), n.enter(c), n.enter(h), n.consume(D), n.exit(h), S) : D === null || D === 32 || D === 41 || mu(D) ? a(D) : (n.enter(u), n.enter(f), n.enter(m), n.enter("chunkString", {
      contentType: "string"
    }), L(D));
  }
  function S(D) {
    return D === 62 ? (n.enter(h), n.consume(D), n.exit(h), n.exit(c), n.exit(u), r) : (n.enter(m), n.enter("chunkString", {
      contentType: "string"
    }), x(D));
  }
  function x(D) {
    return D === 62 ? (n.exit("chunkString"), n.exit(m), S(D)) : D === null || D === 60 || me(D) ? a(D) : (n.consume(D), D === 92 ? A : x);
  }
  function A(D) {
    return D === 60 || D === 62 || D === 92 ? (n.consume(D), x) : x(D);
  }
  function L(D) {
    return !b && (D === null || D === 41 || Ke(D)) ? (n.exit("chunkString"), n.exit(m), n.exit(f), n.exit(u), r(D)) : b < d && D === 40 ? (n.consume(D), b++, L) : D === 41 ? (n.consume(D), b--, L) : D === null || D === 32 || D === 40 || mu(D) ? a(D) : (n.consume(D), D === 92 ? Y : L);
  }
  function Y(D) {
    return D === 40 || D === 41 || D === 92 ? (n.consume(D), L) : L(D);
  }
}
function xg(n, r, a, u, c, h) {
  const f = this;
  let m = 0, p;
  return d;
  function d(x) {
    return n.enter(u), n.enter(c), n.consume(x), n.exit(c), n.enter(h), b;
  }
  function b(x) {
    return m > 999 || x === null || x === 91 || x === 93 && !p || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    x === 94 && !m && "_hiddenFootnoteSupport" in f.parser.constructs ? a(x) : x === 93 ? (n.exit(h), n.enter(c), n.consume(x), n.exit(c), n.exit(u), r) : me(x) ? (n.enter("lineEnding"), n.consume(x), n.exit("lineEnding"), b) : (n.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function y(x) {
    return x === null || x === 91 || x === 93 || me(x) || m++ > 999 ? (n.exit("chunkString"), b(x)) : (n.consume(x), p || (p = !_e(x)), x === 92 ? S : y);
  }
  function S(x) {
    return x === 91 || x === 92 || x === 93 ? (n.consume(x), m++, y) : y(x);
  }
}
function Sg(n, r, a, u, c, h) {
  let f;
  return m;
  function m(S) {
    return S === 34 || S === 39 || S === 40 ? (n.enter(u), n.enter(c), n.consume(S), n.exit(c), f = S === 40 ? 41 : S, p) : a(S);
  }
  function p(S) {
    return S === f ? (n.enter(c), n.consume(S), n.exit(c), n.exit(u), r) : (n.enter(h), d(S));
  }
  function d(S) {
    return S === f ? (n.exit(h), p(f)) : S === null ? a(S) : me(S) ? (n.enter("lineEnding"), n.consume(S), n.exit("lineEnding"), Ne(n, d, "linePrefix")) : (n.enter("chunkString", {
      contentType: "string"
    }), b(S));
  }
  function b(S) {
    return S === f || S === null || me(S) ? (n.exit("chunkString"), d(S)) : (n.consume(S), S === 92 ? y : b);
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
const Cv = {
  name: "definition",
  tokenize: Dv
}, _v = {
  partial: !0,
  tokenize: Ov
};
function Dv(n, r, a) {
  const u = this;
  let c;
  return h;
  function h(x) {
    return n.enter("definition"), f(x);
  }
  function f(x) {
    return xg.call(
      u,
      n,
      m,
      // Note: we don’t need to reset the way `markdown-rs` does.
      a,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(x);
  }
  function m(x) {
    return c = sn(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1)), x === 58 ? (n.enter("definitionMarker"), n.consume(x), n.exit("definitionMarker"), p) : a(x);
  }
  function p(x) {
    return Ke(x) ? Ra(n, d)(x) : d(x);
  }
  function d(x) {
    return vg(
      n,
      b,
      // Note: we don’t need to reset the way `markdown-rs` does.
      a,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(x);
  }
  function b(x) {
    return n.attempt(_v, y, y)(x);
  }
  function y(x) {
    return _e(x) ? Ne(n, S, "whitespace")(x) : S(x);
  }
  function S(x) {
    return x === null || me(x) ? (n.exit("definition"), u.parser.defined.push(c), r(x)) : a(x);
  }
}
function Ov(n, r, a) {
  return u;
  function u(m) {
    return Ke(m) ? Ra(n, c)(m) : a(m);
  }
  function c(m) {
    return Sg(n, h, a, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(m);
  }
  function h(m) {
    return _e(m) ? Ne(n, f, "whitespace")(m) : f(m);
  }
  function f(m) {
    return m === null || me(m) ? r(m) : a(m);
  }
}
const Mv = {
  name: "hardBreakEscape",
  tokenize: Nv
};
function Nv(n, r, a) {
  return u;
  function u(h) {
    return n.enter("hardBreakEscape"), n.consume(h), c;
  }
  function c(h) {
    return me(h) ? (n.exit("hardBreakEscape"), r(h)) : a(h);
  }
}
const Rv = {
  name: "headingAtx",
  resolve: jv,
  tokenize: Lv
};
function jv(n, r) {
  let a = n.length - 2, u = 3, c, h;
  return n[u][1].type === "whitespace" && (u += 2), a - 2 > u && n[a][1].type === "whitespace" && (a -= 2), n[a][1].type === "atxHeadingSequence" && (u === a - 1 || a - 4 > u && n[a - 2][1].type === "whitespace") && (a -= u + 1 === a ? 2 : 4), a > u && (c = {
    type: "atxHeadingText",
    start: n[u][1].start,
    end: n[a][1].end
  }, h = {
    type: "chunkText",
    start: n[u][1].start,
    end: n[a][1].end,
    contentType: "text"
  }, Zt(n, u, a - u + 1, [["enter", c, r], ["enter", h, r], ["exit", h, r], ["exit", c, r]])), n;
}
function Lv(n, r, a) {
  let u = 0;
  return c;
  function c(b) {
    return n.enter("atxHeading"), h(b);
  }
  function h(b) {
    return n.enter("atxHeadingSequence"), f(b);
  }
  function f(b) {
    return b === 35 && u++ < 6 ? (n.consume(b), f) : b === null || Ke(b) ? (n.exit("atxHeadingSequence"), m(b)) : a(b);
  }
  function m(b) {
    return b === 35 ? (n.enter("atxHeadingSequence"), p(b)) : b === null || me(b) ? (n.exit("atxHeading"), r(b)) : _e(b) ? Ne(n, m, "whitespace")(b) : (n.enter("atxHeadingText"), d(b));
  }
  function p(b) {
    return b === 35 ? (n.consume(b), p) : (n.exit("atxHeadingSequence"), m(b));
  }
  function d(b) {
    return b === null || b === 35 || Ke(b) ? (n.exit("atxHeadingText"), m(b)) : (n.consume(b), d);
  }
}
const Uv = [
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
], yp = ["pre", "script", "style", "textarea"], Bv = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Yv,
  tokenize: Gv
}, Hv = {
  partial: !0,
  tokenize: Xv
}, qv = {
  partial: !0,
  tokenize: Vv
};
function Yv(n) {
  let r = n.length;
  for (; r-- && !(n[r][0] === "enter" && n[r][1].type === "htmlFlow"); )
    ;
  return r > 1 && n[r - 2][1].type === "linePrefix" && (n[r][1].start = n[r - 2][1].start, n[r + 1][1].start = n[r - 2][1].start, n.splice(r - 2, 2)), n;
}
function Gv(n, r, a) {
  const u = this;
  let c, h, f, m, p;
  return d;
  function d(w) {
    return b(w);
  }
  function b(w) {
    return n.enter("htmlFlow"), n.enter("htmlFlowData"), n.consume(w), y;
  }
  function y(w) {
    return w === 33 ? (n.consume(w), S) : w === 47 ? (n.consume(w), h = !0, L) : w === 63 ? (n.consume(w), c = 3, u.interrupt ? r : k) : wt(w) ? (n.consume(w), f = String.fromCharCode(w), Y) : a(w);
  }
  function S(w) {
    return w === 45 ? (n.consume(w), c = 2, x) : w === 91 ? (n.consume(w), c = 5, m = 0, A) : wt(w) ? (n.consume(w), c = 4, u.interrupt ? r : k) : a(w);
  }
  function x(w) {
    return w === 45 ? (n.consume(w), u.interrupt ? r : k) : a(w);
  }
  function A(w) {
    const P = "CDATA[";
    return w === P.charCodeAt(m++) ? (n.consume(w), m === P.length ? u.interrupt ? r : ee : A) : a(w);
  }
  function L(w) {
    return wt(w) ? (n.consume(w), f = String.fromCharCode(w), Y) : a(w);
  }
  function Y(w) {
    if (w === null || w === 47 || w === 62 || Ke(w)) {
      const P = w === 47, ie = f.toLowerCase();
      return !P && !h && yp.includes(ie) ? (c = 1, u.interrupt ? r(w) : ee(w)) : Uv.includes(f.toLowerCase()) ? (c = 6, P ? (n.consume(w), D) : u.interrupt ? r(w) : ee(w)) : (c = 7, u.interrupt && !u.parser.lazy[u.now().line] ? a(w) : h ? Z(w) : X(w));
    }
    return w === 45 || yt(w) ? (n.consume(w), f += String.fromCharCode(w), Y) : a(w);
  }
  function D(w) {
    return w === 62 ? (n.consume(w), u.interrupt ? r : ee) : a(w);
  }
  function Z(w) {
    return _e(w) ? (n.consume(w), Z) : R(w);
  }
  function X(w) {
    return w === 47 ? (n.consume(w), R) : w === 58 || w === 95 || wt(w) ? (n.consume(w), se) : _e(w) ? (n.consume(w), X) : R(w);
  }
  function se(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || yt(w) ? (n.consume(w), se) : fe(w);
  }
  function fe(w) {
    return w === 61 ? (n.consume(w), U) : _e(w) ? (n.consume(w), fe) : X(w);
  }
  function U(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? a(w) : w === 34 || w === 39 ? (n.consume(w), p = w, $) : _e(w) ? (n.consume(w), U) : K(w);
  }
  function $(w) {
    return w === p ? (n.consume(w), p = null, he) : w === null || me(w) ? a(w) : (n.consume(w), $);
  }
  function K(w) {
    return w === null || w === 34 || w === 39 || w === 47 || w === 60 || w === 61 || w === 62 || w === 96 || Ke(w) ? fe(w) : (n.consume(w), K);
  }
  function he(w) {
    return w === 47 || w === 62 || _e(w) ? X(w) : a(w);
  }
  function R(w) {
    return w === 62 ? (n.consume(w), te) : a(w);
  }
  function te(w) {
    return w === null || me(w) ? ee(w) : _e(w) ? (n.consume(w), te) : a(w);
  }
  function ee(w) {
    return w === 45 && c === 2 ? (n.consume(w), _) : w === 60 && c === 1 ? (n.consume(w), F) : w === 62 && c === 4 ? (n.consume(w), z) : w === 63 && c === 3 ? (n.consume(w), k) : w === 93 && c === 5 ? (n.consume(w), xe) : me(w) && (c === 6 || c === 7) ? (n.exit("htmlFlowData"), n.check(Hv, q, Ee)(w)) : w === null || me(w) ? (n.exit("htmlFlowData"), Ee(w)) : (n.consume(w), ee);
  }
  function Ee(w) {
    return n.check(qv, re, q)(w);
  }
  function re(w) {
    return n.enter("lineEnding"), n.consume(w), n.exit("lineEnding"), I;
  }
  function I(w) {
    return w === null || me(w) ? Ee(w) : (n.enter("htmlFlowData"), ee(w));
  }
  function _(w) {
    return w === 45 ? (n.consume(w), k) : ee(w);
  }
  function F(w) {
    return w === 47 ? (n.consume(w), f = "", oe) : ee(w);
  }
  function oe(w) {
    if (w === 62) {
      const P = f.toLowerCase();
      return yp.includes(P) ? (n.consume(w), z) : ee(w);
    }
    return wt(w) && f.length < 8 ? (n.consume(w), f += String.fromCharCode(w), oe) : ee(w);
  }
  function xe(w) {
    return w === 93 ? (n.consume(w), k) : ee(w);
  }
  function k(w) {
    return w === 62 ? (n.consume(w), z) : w === 45 && c === 2 ? (n.consume(w), k) : ee(w);
  }
  function z(w) {
    return w === null || me(w) ? (n.exit("htmlFlowData"), q(w)) : (n.consume(w), z);
  }
  function q(w) {
    return n.exit("htmlFlow"), r(w);
  }
}
function Vv(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return me(f) ? (n.enter("lineEnding"), n.consume(f), n.exit("lineEnding"), h) : a(f);
  }
  function h(f) {
    return u.parser.lazy[u.now().line] ? a(f) : r(f);
  }
}
function Xv(n, r, a) {
  return u;
  function u(c) {
    return n.enter("lineEnding"), n.consume(c), n.exit("lineEnding"), n.attempt(qa, r, a);
  }
}
const Qv = {
  name: "htmlText",
  tokenize: Zv
};
function Zv(n, r, a) {
  const u = this;
  let c, h, f;
  return m;
  function m(k) {
    return n.enter("htmlText"), n.enter("htmlTextData"), n.consume(k), p;
  }
  function p(k) {
    return k === 33 ? (n.consume(k), d) : k === 47 ? (n.consume(k), fe) : k === 63 ? (n.consume(k), X) : wt(k) ? (n.consume(k), K) : a(k);
  }
  function d(k) {
    return k === 45 ? (n.consume(k), b) : k === 91 ? (n.consume(k), h = 0, A) : wt(k) ? (n.consume(k), Z) : a(k);
  }
  function b(k) {
    return k === 45 ? (n.consume(k), x) : a(k);
  }
  function y(k) {
    return k === null ? a(k) : k === 45 ? (n.consume(k), S) : me(k) ? (f = y, F(k)) : (n.consume(k), y);
  }
  function S(k) {
    return k === 45 ? (n.consume(k), x) : y(k);
  }
  function x(k) {
    return k === 62 ? _(k) : k === 45 ? S(k) : y(k);
  }
  function A(k) {
    const z = "CDATA[";
    return k === z.charCodeAt(h++) ? (n.consume(k), h === z.length ? L : A) : a(k);
  }
  function L(k) {
    return k === null ? a(k) : k === 93 ? (n.consume(k), Y) : me(k) ? (f = L, F(k)) : (n.consume(k), L);
  }
  function Y(k) {
    return k === 93 ? (n.consume(k), D) : L(k);
  }
  function D(k) {
    return k === 62 ? _(k) : k === 93 ? (n.consume(k), D) : L(k);
  }
  function Z(k) {
    return k === null || k === 62 ? _(k) : me(k) ? (f = Z, F(k)) : (n.consume(k), Z);
  }
  function X(k) {
    return k === null ? a(k) : k === 63 ? (n.consume(k), se) : me(k) ? (f = X, F(k)) : (n.consume(k), X);
  }
  function se(k) {
    return k === 62 ? _(k) : X(k);
  }
  function fe(k) {
    return wt(k) ? (n.consume(k), U) : a(k);
  }
  function U(k) {
    return k === 45 || yt(k) ? (n.consume(k), U) : $(k);
  }
  function $(k) {
    return me(k) ? (f = $, F(k)) : _e(k) ? (n.consume(k), $) : _(k);
  }
  function K(k) {
    return k === 45 || yt(k) ? (n.consume(k), K) : k === 47 || k === 62 || Ke(k) ? he(k) : a(k);
  }
  function he(k) {
    return k === 47 ? (n.consume(k), _) : k === 58 || k === 95 || wt(k) ? (n.consume(k), R) : me(k) ? (f = he, F(k)) : _e(k) ? (n.consume(k), he) : _(k);
  }
  function R(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || yt(k) ? (n.consume(k), R) : te(k);
  }
  function te(k) {
    return k === 61 ? (n.consume(k), ee) : me(k) ? (f = te, F(k)) : _e(k) ? (n.consume(k), te) : he(k);
  }
  function ee(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96 ? a(k) : k === 34 || k === 39 ? (n.consume(k), c = k, Ee) : me(k) ? (f = ee, F(k)) : _e(k) ? (n.consume(k), ee) : (n.consume(k), re);
  }
  function Ee(k) {
    return k === c ? (n.consume(k), c = void 0, I) : k === null ? a(k) : me(k) ? (f = Ee, F(k)) : (n.consume(k), Ee);
  }
  function re(k) {
    return k === null || k === 34 || k === 39 || k === 60 || k === 61 || k === 96 ? a(k) : k === 47 || k === 62 || Ke(k) ? he(k) : (n.consume(k), re);
  }
  function I(k) {
    return k === 47 || k === 62 || Ke(k) ? he(k) : a(k);
  }
  function _(k) {
    return k === 62 ? (n.consume(k), n.exit("htmlTextData"), n.exit("htmlText"), r) : a(k);
  }
  function F(k) {
    return n.exit("htmlTextData"), n.enter("lineEnding"), n.consume(k), n.exit("lineEnding"), oe;
  }
  function oe(k) {
    return _e(k) ? Ne(n, xe, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : xe(k);
  }
  function xe(k) {
    return n.enter("htmlTextData"), f(k);
  }
}
const Rc = {
  name: "labelEnd",
  resolveAll: Iv,
  resolveTo: $v,
  tokenize: Wv
}, Kv = {
  tokenize: Pv
}, Fv = {
  tokenize: ex
}, Jv = {
  tokenize: tx
};
function Iv(n) {
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
function $v(n, r) {
  let a = n.length, u = 0, c, h, f, m;
  for (; a--; )
    if (c = n[a][1], h) {
      if (c.type === "link" || c.type === "labelLink" && c._inactive)
        break;
      n[a][0] === "enter" && c.type === "labelLink" && (c._inactive = !0);
    } else if (f) {
      if (n[a][0] === "enter" && (c.type === "labelImage" || c.type === "labelLink") && !c._balanced && (h = a, c.type !== "labelLink")) {
        u = 2;
        break;
      }
    } else c.type === "labelEnd" && (f = a);
  const p = {
    type: n[h][1].type === "labelLink" ? "link" : "image",
    start: {
      ...n[h][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  }, d = {
    type: "label",
    start: {
      ...n[h][1].start
    },
    end: {
      ...n[f][1].end
    }
  }, b = {
    type: "labelText",
    start: {
      ...n[h + u + 2][1].end
    },
    end: {
      ...n[f - 2][1].start
    }
  };
  return m = [["enter", p, r], ["enter", d, r]], m = ln(m, n.slice(h + 1, h + u + 3)), m = ln(m, [["enter", b, r]]), m = ln(m, xu(r.parser.constructs.insideSpan.null, n.slice(h + u + 4, f - 3), r)), m = ln(m, [["exit", b, r], n[f - 2], n[f - 1], ["exit", d, r]]), m = ln(m, n.slice(f + 1)), m = ln(m, [["exit", p, r]]), Zt(n, h, n.length, m), n;
}
function Wv(n, r, a) {
  const u = this;
  let c = u.events.length, h, f;
  for (; c--; )
    if ((u.events[c][1].type === "labelImage" || u.events[c][1].type === "labelLink") && !u.events[c][1]._balanced) {
      h = u.events[c][1];
      break;
    }
  return m;
  function m(S) {
    return h ? h._inactive ? y(S) : (f = u.parser.defined.includes(sn(u.sliceSerialize({
      start: h.end,
      end: u.now()
    }))), n.enter("labelEnd"), n.enter("labelMarker"), n.consume(S), n.exit("labelMarker"), n.exit("labelEnd"), p) : a(S);
  }
  function p(S) {
    return S === 40 ? n.attempt(Kv, b, f ? b : y)(S) : S === 91 ? n.attempt(Fv, b, f ? d : y)(S) : f ? b(S) : y(S);
  }
  function d(S) {
    return n.attempt(Jv, b, y)(S);
  }
  function b(S) {
    return r(S);
  }
  function y(S) {
    return h._balanced = !0, a(S);
  }
}
function Pv(n, r, a) {
  return u;
  function u(y) {
    return n.enter("resource"), n.enter("resourceMarker"), n.consume(y), n.exit("resourceMarker"), c;
  }
  function c(y) {
    return Ke(y) ? Ra(n, h)(y) : h(y);
  }
  function h(y) {
    return y === 41 ? b(y) : vg(n, f, m, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(y);
  }
  function f(y) {
    return Ke(y) ? Ra(n, p)(y) : b(y);
  }
  function m(y) {
    return a(y);
  }
  function p(y) {
    return y === 34 || y === 39 || y === 40 ? Sg(n, d, a, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(y) : b(y);
  }
  function d(y) {
    return Ke(y) ? Ra(n, b)(y) : b(y);
  }
  function b(y) {
    return y === 41 ? (n.enter("resourceMarker"), n.consume(y), n.exit("resourceMarker"), n.exit("resource"), r) : a(y);
  }
}
function ex(n, r, a) {
  const u = this;
  return c;
  function c(m) {
    return xg.call(u, n, h, f, "reference", "referenceMarker", "referenceString")(m);
  }
  function h(m) {
    return u.parser.defined.includes(sn(u.sliceSerialize(u.events[u.events.length - 1][1]).slice(1, -1))) ? r(m) : a(m);
  }
  function f(m) {
    return a(m);
  }
}
function tx(n, r, a) {
  return u;
  function u(h) {
    return n.enter("reference"), n.enter("referenceMarker"), n.consume(h), n.exit("referenceMarker"), c;
  }
  function c(h) {
    return h === 93 ? (n.enter("referenceMarker"), n.consume(h), n.exit("referenceMarker"), n.exit("reference"), r) : a(h);
  }
}
const nx = {
  name: "labelStartImage",
  resolveAll: Rc.resolveAll,
  tokenize: lx
};
function lx(n, r, a) {
  const u = this;
  return c;
  function c(m) {
    return n.enter("labelImage"), n.enter("labelImageMarker"), n.consume(m), n.exit("labelImageMarker"), h;
  }
  function h(m) {
    return m === 91 ? (n.enter("labelMarker"), n.consume(m), n.exit("labelMarker"), n.exit("labelImage"), f) : a(m);
  }
  function f(m) {
    return m === 94 && "_hiddenFootnoteSupport" in u.parser.constructs ? a(m) : r(m);
  }
}
const ix = {
  name: "labelStartLink",
  resolveAll: Rc.resolveAll,
  tokenize: ax
};
function ax(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return n.enter("labelLink"), n.enter("labelMarker"), n.consume(f), n.exit("labelMarker"), n.exit("labelLink"), h;
  }
  function h(f) {
    return f === 94 && "_hiddenFootnoteSupport" in u.parser.constructs ? a(f) : r(f);
  }
}
const Is = {
  name: "lineEnding",
  tokenize: rx
};
function rx(n, r) {
  return a;
  function a(u) {
    return n.enter("lineEnding"), n.consume(u), n.exit("lineEnding"), Ne(n, r, "linePrefix");
  }
}
const du = {
  name: "thematicBreak",
  tokenize: ux
};
function ux(n, r, a) {
  let u = 0, c;
  return h;
  function h(d) {
    return n.enter("thematicBreak"), f(d);
  }
  function f(d) {
    return c = d, m(d);
  }
  function m(d) {
    return d === c ? (n.enter("thematicBreakSequence"), p(d)) : u >= 3 && (d === null || me(d)) ? (n.exit("thematicBreak"), r(d)) : a(d);
  }
  function p(d) {
    return d === c ? (n.consume(d), u++, p) : (n.exit("thematicBreakSequence"), _e(d) ? Ne(n, m, "whitespace")(d) : m(d));
  }
}
const Rt = {
  continuation: {
    tokenize: fx
  },
  exit: dx,
  name: "list",
  tokenize: cx
}, ox = {
  partial: !0,
  tokenize: mx
}, sx = {
  partial: !0,
  tokenize: hx
};
function cx(n, r, a) {
  const u = this, c = u.events[u.events.length - 1];
  let h = c && c[1].type === "linePrefix" ? c[2].sliceSerialize(c[1], !0).length : 0, f = 0;
  return m;
  function m(x) {
    const A = u.containerState.type || (x === 42 || x === 43 || x === 45 ? "listUnordered" : "listOrdered");
    if (A === "listUnordered" ? !u.containerState.marker || x === u.containerState.marker : gc(x)) {
      if (u.containerState.type || (u.containerState.type = A, n.enter(A, {
        _container: !0
      })), A === "listUnordered")
        return n.enter("listItemPrefix"), x === 42 || x === 45 ? n.check(du, a, d)(x) : d(x);
      if (!u.interrupt || x === 49)
        return n.enter("listItemPrefix"), n.enter("listItemValue"), p(x);
    }
    return a(x);
  }
  function p(x) {
    return gc(x) && ++f < 10 ? (n.consume(x), p) : (!u.interrupt || f < 2) && (u.containerState.marker ? x === u.containerState.marker : x === 41 || x === 46) ? (n.exit("listItemValue"), d(x)) : a(x);
  }
  function d(x) {
    return n.enter("listItemMarker"), n.consume(x), n.exit("listItemMarker"), u.containerState.marker = u.containerState.marker || x, n.check(
      qa,
      // Can’t be empty when interrupting.
      u.interrupt ? a : b,
      n.attempt(ox, S, y)
    );
  }
  function b(x) {
    return u.containerState.initialBlankLine = !0, h++, S(x);
  }
  function y(x) {
    return _e(x) ? (n.enter("listItemPrefixWhitespace"), n.consume(x), n.exit("listItemPrefixWhitespace"), S) : a(x);
  }
  function S(x) {
    return u.containerState.size = h + u.sliceSerialize(n.exit("listItemPrefix"), !0).length, r(x);
  }
}
function fx(n, r, a) {
  const u = this;
  return u.containerState._closeFlow = void 0, n.check(qa, c, h);
  function c(m) {
    return u.containerState.furtherBlankLines = u.containerState.furtherBlankLines || u.containerState.initialBlankLine, Ne(n, r, "listItemIndent", u.containerState.size + 1)(m);
  }
  function h(m) {
    return u.containerState.furtherBlankLines || !_e(m) ? (u.containerState.furtherBlankLines = void 0, u.containerState.initialBlankLine = void 0, f(m)) : (u.containerState.furtherBlankLines = void 0, u.containerState.initialBlankLine = void 0, n.attempt(sx, r, f)(m));
  }
  function f(m) {
    return u.containerState._closeFlow = !0, u.interrupt = void 0, Ne(n, n.attempt(Rt, r, a), "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m);
  }
}
function hx(n, r, a) {
  const u = this;
  return Ne(n, c, "listItemIndent", u.containerState.size + 1);
  function c(h) {
    const f = u.events[u.events.length - 1];
    return f && f[1].type === "listItemIndent" && f[2].sliceSerialize(f[1], !0).length === u.containerState.size ? r(h) : a(h);
  }
}
function dx(n) {
  n.exit(this.containerState.type);
}
function mx(n, r, a) {
  const u = this;
  return Ne(n, c, "listItemPrefixWhitespace", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function c(h) {
    const f = u.events[u.events.length - 1];
    return !_e(h) && f && f[1].type === "listItemPrefixWhitespace" ? r(h) : a(h);
  }
}
const bp = {
  name: "setextUnderline",
  resolveTo: px,
  tokenize: gx
};
function px(n, r) {
  let a = n.length, u, c, h;
  for (; a--; )
    if (n[a][0] === "enter") {
      if (n[a][1].type === "content") {
        u = a;
        break;
      }
      n[a][1].type === "paragraph" && (c = a);
    } else
      n[a][1].type === "content" && n.splice(a, 1), !h && n[a][1].type === "definition" && (h = a);
  const f = {
    type: "setextHeading",
    start: {
      ...n[u][1].start
    },
    end: {
      ...n[n.length - 1][1].end
    }
  };
  return n[c][1].type = "setextHeadingText", h ? (n.splice(c, 0, ["enter", f, r]), n.splice(h + 1, 0, ["exit", n[u][1], r]), n[u][1].end = {
    ...n[h][1].end
  }) : n[u][1] = f, n.push(["exit", f, r]), n;
}
function gx(n, r, a) {
  const u = this;
  let c;
  return h;
  function h(d) {
    let b = u.events.length, y;
    for (; b--; )
      if (u.events[b][1].type !== "lineEnding" && u.events[b][1].type !== "linePrefix" && u.events[b][1].type !== "content") {
        y = u.events[b][1].type === "paragraph";
        break;
      }
    return !u.parser.lazy[u.now().line] && (u.interrupt || y) ? (n.enter("setextHeadingLine"), c = d, f(d)) : a(d);
  }
  function f(d) {
    return n.enter("setextHeadingLineSequence"), m(d);
  }
  function m(d) {
    return d === c ? (n.consume(d), m) : (n.exit("setextHeadingLineSequence"), _e(d) ? Ne(n, p, "lineSuffix")(d) : p(d));
  }
  function p(d) {
    return d === null || me(d) ? (n.exit("setextHeadingLine"), r(d)) : a(d);
  }
}
const yx = {
  tokenize: bx
};
function bx(n) {
  const r = this, a = n.attempt(
    // Try to parse a blank line.
    qa,
    u,
    // Try to parse initial flow (essentially, only code).
    n.attempt(this.parser.constructs.flowInitial, c, Ne(n, n.attempt(this.parser.constructs.flow, c, n.attempt(wv, c)), "linePrefix"))
  );
  return a;
  function u(h) {
    if (h === null) {
      n.consume(h);
      return;
    }
    return n.enter("lineEndingBlank"), n.consume(h), n.exit("lineEndingBlank"), r.currentConstruct = void 0, a;
  }
  function c(h) {
    if (h === null) {
      n.consume(h);
      return;
    }
    return n.enter("lineEnding"), n.consume(h), n.exit("lineEnding"), r.currentConstruct = void 0, a;
  }
}
const vx = {
  resolveAll: wg()
}, xx = kg("string"), Sx = kg("text");
function kg(n) {
  return {
    resolveAll: wg(n === "text" ? kx : void 0),
    tokenize: r
  };
  function r(a) {
    const u = this, c = this.parser.constructs[n], h = a.attempt(c, f, m);
    return f;
    function f(b) {
      return d(b) ? h(b) : m(b);
    }
    function m(b) {
      if (b === null) {
        a.consume(b);
        return;
      }
      return a.enter("data"), a.consume(b), p;
    }
    function p(b) {
      return d(b) ? (a.exit("data"), h(b)) : (a.consume(b), p);
    }
    function d(b) {
      if (b === null)
        return !0;
      const y = c[b];
      let S = -1;
      if (y)
        for (; ++S < y.length; ) {
          const x = y[S];
          if (!x.previous || x.previous.call(u, u.previous))
            return !0;
        }
      return !1;
    }
  }
}
function wg(n) {
  return r;
  function r(a, u) {
    let c = -1, h;
    for (; ++c <= a.length; )
      h === void 0 ? a[c] && a[c][1].type === "data" && (h = c, c++) : (!a[c] || a[c][1].type !== "data") && (c !== h + 2 && (a[h][1].end = a[c - 1][1].end, a.splice(h + 2, c - h - 2), c = h + 2), h = void 0);
    return n ? n(a, u) : a;
  }
}
function kx(n, r) {
  let a = 0;
  for (; ++a <= n.length; )
    if ((a === n.length || n[a][1].type === "lineEnding") && n[a - 1][1].type === "data") {
      const u = n[a - 1][1], c = r.sliceStream(u);
      let h = c.length, f = -1, m = 0, p;
      for (; h--; ) {
        const d = c[h];
        if (typeof d == "string") {
          for (f = d.length; d.charCodeAt(f - 1) === 32; )
            m++, f--;
          if (f) break;
          f = -1;
        } else if (d === -2)
          p = !0, m++;
        else if (d !== -1) {
          h++;
          break;
        }
      }
      if (r._contentTypeTextTrailing && a === n.length && (m = 0), m) {
        const d = {
          type: a === n.length || p || m < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: h ? f : u.start._bufferIndex + f,
            _index: u.start._index + h,
            line: u.end.line,
            column: u.end.column - m,
            offset: u.end.offset - m
          },
          end: {
            ...u.end
          }
        };
        u.end = {
          ...d.start
        }, u.start.offset === u.end.offset ? Object.assign(u, d) : (n.splice(a, 0, ["enter", d, r], ["exit", d, r]), a += 2);
      }
      a++;
    }
  return n;
}
const wx = {
  42: Rt,
  43: Rt,
  45: Rt,
  48: Rt,
  49: Rt,
  50: Rt,
  51: Rt,
  52: Rt,
  53: Rt,
  54: Rt,
  55: Rt,
  56: Rt,
  57: Rt,
  62: pg
}, Ex = {
  91: Cv
}, zx = {
  [-2]: Js,
  [-1]: Js,
  32: Js
}, Tx = {
  35: Rv,
  42: du,
  45: [bp, du],
  60: Bv,
  61: bp,
  95: du,
  96: gp,
  126: gp
}, Ax = {
  38: yg,
  92: gg
}, Cx = {
  [-5]: Is,
  [-4]: Is,
  [-3]: Is,
  33: nx,
  38: yg,
  42: yc,
  60: [iv, Qv],
  91: ix,
  92: [Mv, gg],
  93: Rc,
  95: yc,
  96: yv
}, _x = {
  null: [yc, vx]
}, Dx = {
  null: [42, 95]
}, Ox = {
  null: []
}, Mx = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Dx,
  contentInitial: Ex,
  disable: Ox,
  document: wx,
  flow: Tx,
  flowInitial: zx,
  insideSpan: _x,
  string: Ax,
  text: Cx
}, Symbol.toStringTag, { value: "Module" }));
function Nx(n, r, a) {
  let u = {
    _bufferIndex: -1,
    _index: 0,
    line: a && a.line || 1,
    column: a && a.column || 1,
    offset: a && a.offset || 0
  };
  const c = {}, h = [];
  let f = [], m = [];
  const p = {
    attempt: $(fe),
    check: $(U),
    consume: Z,
    enter: X,
    exit: se,
    interrupt: $(U, {
      interrupt: !0
    })
  }, d = {
    code: null,
    containerState: {},
    defineSkip: L,
    events: [],
    now: A,
    parser: n,
    previous: null,
    sliceSerialize: S,
    sliceStream: x,
    write: y
  };
  let b = r.tokenize.call(d, p);
  return r.resolveAll && h.push(r), d;
  function y(te) {
    return f = ln(f, te), Y(), f[f.length - 1] !== null ? [] : (K(r, 0), d.events = xu(h, d.events, d), d.events);
  }
  function S(te, ee) {
    return jx(x(te), ee);
  }
  function x(te) {
    return Rx(f, te);
  }
  function A() {
    const {
      _bufferIndex: te,
      _index: ee,
      line: Ee,
      column: re,
      offset: I
    } = u;
    return {
      _bufferIndex: te,
      _index: ee,
      line: Ee,
      column: re,
      offset: I
    };
  }
  function L(te) {
    c[te.line] = te.column, R();
  }
  function Y() {
    let te;
    for (; u._index < f.length; ) {
      const ee = f[u._index];
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
    me(te) ? (u.line++, u.column = 1, u.offset += te === -3 ? 2 : 1, R()) : te !== -1 && (u.column++, u.offset++), u._bufferIndex < 0 ? u._index++ : (u._bufferIndex++, u._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    f[u._index].length && (u._bufferIndex = -1, u._index++)), d.previous = te;
  }
  function X(te, ee) {
    const Ee = ee || {};
    return Ee.type = te, Ee.start = A(), d.events.push(["enter", Ee, d]), m.push(Ee), Ee;
  }
  function se(te) {
    const ee = m.pop();
    return ee.end = A(), d.events.push(["exit", ee, d]), ee;
  }
  function fe(te, ee) {
    K(te, ee.from);
  }
  function U(te, ee) {
    ee.restore();
  }
  function $(te, ee) {
    return Ee;
    function Ee(re, I, _) {
      let F, oe, xe, k;
      return Array.isArray(re) ? (
        /* c8 ignore next 1 */
        q(re)
      ) : "tokenize" in re ? (
        // Looks like a construct.
        q([
          /** @type {Construct} */
          re
        ])
      ) : z(re);
      function z(ne) {
        return ke;
        function ke(Ve) {
          const ye = Ve !== null && ne[Ve], vt = Ve !== null && ne.null, Et = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(ye) ? ye : ye ? [ye] : [],
            ...Array.isArray(vt) ? vt : vt ? [vt] : []
          ];
          return q(Et)(Ve);
        }
      }
      function q(ne) {
        return F = ne, oe = 0, ne.length === 0 ? _ : w(ne[oe]);
      }
      function w(ne) {
        return ke;
        function ke(Ve) {
          return k = he(), xe = ne, ne.partial || (d.currentConstruct = ne), ne.name && d.parser.constructs.disable.null.includes(ne.name) ? ie() : ne.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            ee ? Object.assign(Object.create(d), ee) : d,
            p,
            P,
            ie
          )(Ve);
        }
      }
      function P(ne) {
        return te(xe, k), I;
      }
      function ie(ne) {
        return k.restore(), ++oe < F.length ? w(F[oe]) : _;
      }
    }
  }
  function K(te, ee) {
    te.resolveAll && !h.includes(te) && h.push(te), te.resolve && Zt(d.events, ee, d.events.length - ee, te.resolve(d.events.slice(ee), d)), te.resolveTo && (d.events = te.resolveTo(d.events, d));
  }
  function he() {
    const te = A(), ee = d.previous, Ee = d.currentConstruct, re = d.events.length, I = Array.from(m);
    return {
      from: re,
      restore: _
    };
    function _() {
      u = te, d.previous = ee, d.currentConstruct = Ee, d.events.length = re, m = I, R();
    }
  }
  function R() {
    u.line in c && u.column < 2 && (u.column = c[u.line], u.offset += c[u.line] - 1);
  }
}
function Rx(n, r) {
  const a = r.start._index, u = r.start._bufferIndex, c = r.end._index, h = r.end._bufferIndex;
  let f;
  if (a === c)
    f = [n[a].slice(u, h)];
  else {
    if (f = n.slice(a, c), u > -1) {
      const m = f[0];
      typeof m == "string" ? f[0] = m.slice(u) : f.shift();
    }
    h > 0 && f.push(n[c].slice(0, h));
  }
  return f;
}
function jx(n, r) {
  let a = -1;
  const u = [];
  let c;
  for (; ++a < n.length; ) {
    const h = n[a];
    let f;
    if (typeof h == "string")
      f = h;
    else switch (h) {
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
        f = String.fromCharCode(h);
    }
    c = h === -2, u.push(f);
  }
  return u.join("");
}
function Lx(n) {
  const u = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      dg([Mx, ...(n || {}).extensions || []])
    ),
    content: c($0),
    defined: [],
    document: c(P0),
    flow: c(yx),
    lazy: {},
    string: c(xx),
    text: c(Sx)
  };
  return u;
  function c(h) {
    return f;
    function f(m) {
      return Nx(u, h, m);
    }
  }
}
function Ux(n) {
  for (; !bg(n); )
    ;
  return n;
}
const vp = /[\0\t\n\r]/g;
function Bx() {
  let n = 1, r = "", a = !0, u;
  return c;
  function c(h, f, m) {
    const p = [];
    let d, b, y, S, x;
    for (h = r + (typeof h == "string" ? h.toString() : new TextDecoder(f || void 0).decode(h)), y = 0, r = "", a && (h.charCodeAt(0) === 65279 && y++, a = void 0); y < h.length; ) {
      if (vp.lastIndex = y, d = vp.exec(h), S = d && d.index !== void 0 ? d.index : h.length, x = h.charCodeAt(S), !d) {
        r = h.slice(y);
        break;
      }
      if (x === 10 && y === S && u)
        p.push(-3), u = void 0;
      else
        switch (u && (p.push(-5), u = void 0), y < S && (p.push(h.slice(y, S)), n += S - y), x) {
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
const Hx = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function qx(n) {
  return n.replace(Hx, Yx);
}
function Yx(n, r, a) {
  if (r)
    return r;
  if (a.charCodeAt(0) === 35) {
    const c = a.charCodeAt(1), h = c === 120 || c === 88;
    return mg(a.slice(h ? 2 : 1), h ? 16 : 10);
  }
  return Nc(a) || n;
}
const Eg = {}.hasOwnProperty;
function Gx(n, r, a) {
  return r && typeof r == "object" && (a = r, r = void 0), Vx(a)(Ux(Lx(a).document().write(Bx()(n, r, !0))));
}
function Vx(n) {
  const r = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: h(Vl),
      autolinkProtocol: he,
      autolinkEmail: he,
      atxHeading: h(Yl),
      blockQuote: h(vt),
      characterEscape: he,
      characterReference: he,
      codeFenced: h(Et),
      codeFencedFenceInfo: f,
      codeFencedFenceMeta: f,
      codeIndented: h(Et, f),
      codeText: h(cn, f),
      codeTextData: he,
      data: he,
      codeFlowValue: he,
      definition: h(Hn),
      definitionDestinationString: f,
      definitionLabelString: f,
      definitionTitleString: f,
      emphasis: h(zt),
      hardBreakEscape: h(Gl),
      hardBreakTrailing: h(Gl),
      htmlFlow: h(Ga, f),
      htmlFlowData: he,
      htmlText: h(Ga, f),
      htmlTextData: he,
      image: h(Va),
      label: f,
      link: h(Vl),
      listItem: h(Ri),
      listItemValue: S,
      listOrdered: h(Xl, y),
      listUnordered: h(Xl),
      paragraph: h(Eu),
      reference: w,
      referenceString: f,
      resourceDestinationString: f,
      resourceTitleString: f,
      setextHeading: h(Yl),
      strong: h(zu),
      thematicBreak: h(Tu)
    },
    exit: {
      atxHeading: p(),
      atxHeadingSequence: fe,
      autolink: p(),
      autolinkEmail: ye,
      autolinkProtocol: Ve,
      blockQuote: p(),
      characterEscapeValue: R,
      characterReferenceMarkerHexadecimal: ie,
      characterReferenceMarkerNumeric: ie,
      characterReferenceValue: ne,
      characterReference: ke,
      codeFenced: p(Y),
      codeFencedFence: L,
      codeFencedFenceInfo: x,
      codeFencedFenceMeta: A,
      codeFlowValue: R,
      codeIndented: p(D),
      codeText: p(I),
      codeTextData: R,
      data: R,
      definition: p(),
      definitionDestinationString: se,
      definitionLabelString: Z,
      definitionTitleString: X,
      emphasis: p(),
      hardBreakEscape: p(ee),
      hardBreakTrailing: p(ee),
      htmlFlow: p(Ee),
      htmlFlowData: R,
      htmlText: p(re),
      htmlTextData: R,
      image: p(F),
      label: xe,
      labelText: oe,
      lineEnding: te,
      link: p(_),
      listItem: p(),
      listOrdered: p(),
      listUnordered: p(),
      paragraph: p(),
      referenceString: P,
      resourceDestinationString: k,
      resourceTitleString: z,
      resource: q,
      setextHeading: p(K),
      setextHeadingLineSequence: $,
      setextHeadingText: U,
      strong: p(),
      thematicBreak: p()
    }
  };
  zg(r, (n || {}).mdastExtensions || []);
  const a = {};
  return u;
  function u(G) {
    let W = {
      type: "root",
      children: []
    };
    const ge = {
      stack: [W],
      tokenStack: [],
      config: r,
      enter: m,
      exit: d,
      buffer: f,
      resume: b,
      data: a
    }, Te = [];
    let Ue = -1;
    for (; ++Ue < G.length; )
      if (G[Ue][1].type === "listOrdered" || G[Ue][1].type === "listUnordered")
        if (G[Ue][0] === "enter")
          Te.push(Ue);
        else {
          const Ut = Te.pop();
          Ue = c(G, Ut, Ue);
        }
    for (Ue = -1; ++Ue < G.length; ) {
      const Ut = r[G[Ue][0]];
      Eg.call(Ut, G[Ue][1].type) && Ut[G[Ue][1].type].call(Object.assign({
        sliceSerialize: G[Ue][2].sliceSerialize
      }, ge), G[Ue][1]);
    }
    if (ge.tokenStack.length > 0) {
      const Ut = ge.tokenStack[ge.tokenStack.length - 1];
      (Ut[1] || xp).call(ge, void 0, Ut[0]);
    }
    for (W.position = {
      start: fl(G.length > 0 ? G[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: fl(G.length > 0 ? G[G.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Ue = -1; ++Ue < r.transforms.length; )
      W = r.transforms[Ue](W) || W;
    return W;
  }
  function c(G, W, ge) {
    let Te = W - 1, Ue = -1, Ut = !1, bn, St, rt, Tt;
    for (; ++Te <= ge; ) {
      const Xe = G[Te];
      switch (Xe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Xe[0] === "enter" ? Ue++ : Ue--, Tt = void 0;
          break;
        }
        case "lineEndingBlank": {
          Xe[0] === "enter" && (bn && !Tt && !Ue && !rt && (rt = Te), Tt = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Tt = void 0;
      }
      if (!Ue && Xe[0] === "enter" && Xe[1].type === "listItemPrefix" || Ue === -1 && Xe[0] === "exit" && (Xe[1].type === "listUnordered" || Xe[1].type === "listOrdered")) {
        if (bn) {
          let qn = Te;
          for (St = void 0; qn--; ) {
            const an = G[qn];
            if (an[1].type === "lineEnding" || an[1].type === "lineEndingBlank") {
              if (an[0] === "exit") continue;
              St && (G[St][1].type = "lineEndingBlank", Ut = !0), an[1].type = "lineEnding", St = qn;
            } else if (!(an[1].type === "linePrefix" || an[1].type === "blockQuotePrefix" || an[1].type === "blockQuotePrefixWhitespace" || an[1].type === "blockQuoteMarker" || an[1].type === "listItemIndent")) break;
          }
          rt && (!St || rt < St) && (bn._spread = !0), bn.end = Object.assign({}, St ? G[St][1].start : Xe[1].end), G.splice(St || Te, 0, ["exit", bn, Xe[2]]), Te++, ge++;
        }
        if (Xe[1].type === "listItemPrefix") {
          const qn = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Xe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          bn = qn, G.splice(Te, 0, ["enter", qn, Xe[2]]), Te++, ge++, rt = void 0, Tt = !0;
        }
      }
    }
    return G[W][1]._spread = Ut, ge;
  }
  function h(G, W) {
    return ge;
    function ge(Te) {
      m.call(this, G(Te), Te), W && W.call(this, Te);
    }
  }
  function f() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function m(G, W, ge) {
    this.stack[this.stack.length - 1].children.push(G), this.stack.push(G), this.tokenStack.push([W, ge || void 0]), G.position = {
      start: fl(W.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function p(G) {
    return W;
    function W(ge) {
      G && G.call(this, ge), d.call(this, ge);
    }
  }
  function d(G, W) {
    const ge = this.stack.pop(), Te = this.tokenStack.pop();
    if (Te)
      Te[0].type !== G.type && (W ? W.call(this, G, Te[0]) : (Te[1] || xp).call(this, G, Te[0]));
    else throw new Error("Cannot close `" + G.type + "` (" + Na({
      start: G.start,
      end: G.end
    }) + "): it’s not open");
    ge.position.end = fl(G.end);
  }
  function b() {
    return Mc(this.stack.pop());
  }
  function y() {
    this.data.expectingFirstListItemValue = !0;
  }
  function S(G) {
    if (this.data.expectingFirstListItemValue) {
      const W = this.stack[this.stack.length - 2];
      W.start = Number.parseInt(this.sliceSerialize(G), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function x() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.lang = G;
  }
  function A() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.meta = G;
  }
  function L() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function Y() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = G.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function D() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = G.replace(/(\r?\n|\r)$/g, "");
  }
  function Z(G) {
    const W = this.resume(), ge = this.stack[this.stack.length - 1];
    ge.label = W, ge.identifier = sn(this.sliceSerialize(G)).toLowerCase();
  }
  function X() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.title = G;
  }
  function se() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.url = G;
  }
  function fe(G) {
    const W = this.stack[this.stack.length - 1];
    if (!W.depth) {
      const ge = this.sliceSerialize(G).length;
      W.depth = ge;
    }
  }
  function U() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(G) {
    const W = this.stack[this.stack.length - 1];
    W.depth = this.sliceSerialize(G).codePointAt(0) === 61 ? 1 : 2;
  }
  function K() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function he(G) {
    const ge = this.stack[this.stack.length - 1].children;
    let Te = ge[ge.length - 1];
    (!Te || Te.type !== "text") && (Te = xt(), Te.position = {
      start: fl(G.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, ge.push(Te)), this.stack.push(Te);
  }
  function R(G) {
    const W = this.stack.pop();
    W.value += this.sliceSerialize(G), W.position.end = fl(G.end);
  }
  function te(G) {
    const W = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const ge = W.children[W.children.length - 1];
      ge.position.end = fl(G.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && r.canContainEols.includes(W.type) && (he.call(this, G), R.call(this, G));
  }
  function ee() {
    this.data.atHardBreak = !0;
  }
  function Ee() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = G;
  }
  function re() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = G;
  }
  function I() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.value = G;
  }
  function _() {
    const G = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const W = this.data.referenceType || "shortcut";
      G.type += "Reference", G.referenceType = W, delete G.url, delete G.title;
    } else
      delete G.identifier, delete G.label;
    this.data.referenceType = void 0;
  }
  function F() {
    const G = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const W = this.data.referenceType || "shortcut";
      G.type += "Reference", G.referenceType = W, delete G.url, delete G.title;
    } else
      delete G.identifier, delete G.label;
    this.data.referenceType = void 0;
  }
  function oe(G) {
    const W = this.sliceSerialize(G), ge = this.stack[this.stack.length - 2];
    ge.label = qx(W), ge.identifier = sn(W).toLowerCase();
  }
  function xe() {
    const G = this.stack[this.stack.length - 1], W = this.resume(), ge = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, ge.type === "link") {
      const Te = G.children;
      ge.children = Te;
    } else
      ge.alt = W;
  }
  function k() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.url = G;
  }
  function z() {
    const G = this.resume(), W = this.stack[this.stack.length - 1];
    W.title = G;
  }
  function q() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function P(G) {
    const W = this.resume(), ge = this.stack[this.stack.length - 1];
    ge.label = W, ge.identifier = sn(this.sliceSerialize(G)).toLowerCase(), this.data.referenceType = "full";
  }
  function ie(G) {
    this.data.characterReferenceType = G.type;
  }
  function ne(G) {
    const W = this.sliceSerialize(G), ge = this.data.characterReferenceType;
    let Te;
    ge ? (Te = mg(W, ge === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Te = Nc(W);
    const Ue = this.stack[this.stack.length - 1];
    Ue.value += Te;
  }
  function ke(G) {
    const W = this.stack.pop();
    W.position.end = fl(G.end);
  }
  function Ve(G) {
    R.call(this, G);
    const W = this.stack[this.stack.length - 1];
    W.url = this.sliceSerialize(G);
  }
  function ye(G) {
    R.call(this, G);
    const W = this.stack[this.stack.length - 1];
    W.url = "mailto:" + this.sliceSerialize(G);
  }
  function vt() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Et() {
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
  function zt() {
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
  function Xl(G) {
    return {
      type: "list",
      ordered: G.type === "listOrdered",
      start: null,
      spread: G._spread,
      children: []
    };
  }
  function Ri(G) {
    return {
      type: "listItem",
      spread: G._spread,
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
  function xt() {
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
    Array.isArray(u) ? zg(n, u) : Xx(n, u);
  }
}
function Xx(n, r) {
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
function xp(n, r) {
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
function Qx(n) {
  const r = this;
  r.parser = a;
  function a(u) {
    return Gx(u, {
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
function Zx(n, r) {
  const a = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: n.wrap(n.all(r), !0)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function Kx(n, r) {
  const a = { type: "element", tagName: "br", properties: {}, children: [] };
  return n.patch(r, a), [n.applyData(r, a), { type: "text", value: `
` }];
}
function Fx(n, r) {
  const a = r.value ? r.value + `
` : "", u = {}, c = r.lang ? r.lang.split(/\s+/) : [];
  c.length > 0 && (u.className = ["language-" + c[0]]);
  let h = {
    type: "element",
    tagName: "code",
    properties: u,
    children: [{ type: "text", value: a }]
  };
  return r.meta && (h.data = { meta: r.meta }), n.patch(r, h), h = n.applyData(r, h), h = { type: "element", tagName: "pre", properties: {}, children: [h] }, n.patch(r, h), h;
}
function Jx(n, r) {
  const a = {
    type: "element",
    tagName: "del",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function Ix(n, r) {
  const a = {
    type: "element",
    tagName: "em",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function $x(n, r) {
  const a = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", u = String(r.identifier).toUpperCase(), c = Ni(u.toLowerCase()), h = n.footnoteOrder.indexOf(u);
  let f, m = n.footnoteCounts.get(u);
  m === void 0 ? (m = 0, n.footnoteOrder.push(u), f = n.footnoteOrder.length) : f = h + 1, m += 1, n.footnoteCounts.set(u, m);
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
  const d = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [p]
  };
  return n.patch(r, d), n.applyData(r, d);
}
function Wx(n, r) {
  const a = {
    type: "element",
    tagName: "h" + r.depth,
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function Px(n, r) {
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
  const c = n.all(r), h = c[0];
  h && h.type === "text" ? h.value = "[" + h.value : c.unshift({ type: "text", value: "[" });
  const f = c[c.length - 1];
  return f && f.type === "text" ? f.value += u : c.push({ type: "text", value: u }), c;
}
function eS(n, r) {
  const a = String(r.identifier).toUpperCase(), u = n.definitionById.get(a);
  if (!u)
    return Tg(n, r);
  const c = { src: Ni(u.url || ""), alt: r.alt };
  u.title !== null && u.title !== void 0 && (c.title = u.title);
  const h = { type: "element", tagName: "img", properties: c, children: [] };
  return n.patch(r, h), n.applyData(r, h);
}
function tS(n, r) {
  const a = { src: Ni(r.url) };
  r.alt !== null && r.alt !== void 0 && (a.alt = r.alt), r.title !== null && r.title !== void 0 && (a.title = r.title);
  const u = { type: "element", tagName: "img", properties: a, children: [] };
  return n.patch(r, u), n.applyData(r, u);
}
function nS(n, r) {
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
function lS(n, r) {
  const a = String(r.identifier).toUpperCase(), u = n.definitionById.get(a);
  if (!u)
    return Tg(n, r);
  const c = { href: Ni(u.url || "") };
  u.title !== null && u.title !== void 0 && (c.title = u.title);
  const h = {
    type: "element",
    tagName: "a",
    properties: c,
    children: n.all(r)
  };
  return n.patch(r, h), n.applyData(r, h);
}
function iS(n, r) {
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
function aS(n, r, a) {
  const u = n.all(r), c = a ? rS(a) : Ag(r), h = {}, f = [];
  if (typeof r.checked == "boolean") {
    const b = u[0];
    let y;
    b && b.type === "element" && b.tagName === "p" ? y = b : (y = { type: "element", tagName: "p", properties: {}, children: [] }, u.unshift(y)), y.children.length > 0 && y.children.unshift({ type: "text", value: " " }), y.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: r.checked, disabled: !0 },
      children: []
    }), h.className = ["task-list-item"];
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
  const d = { type: "element", tagName: "li", properties: h, children: f };
  return n.patch(r, d), n.applyData(r, d);
}
function rS(n) {
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
function uS(n, r) {
  const a = {}, u = n.all(r);
  let c = -1;
  for (typeof r.start == "number" && r.start !== 1 && (a.start = r.start); ++c < u.length; ) {
    const f = u[c];
    if (f.type === "element" && f.tagName === "li" && f.properties && Array.isArray(f.properties.className) && f.properties.className.includes("task-list-item")) {
      a.className = ["contains-task-list"];
      break;
    }
  }
  const h = {
    type: "element",
    tagName: r.ordered ? "ol" : "ul",
    properties: a,
    children: n.wrap(u, !0)
  };
  return n.patch(r, h), n.applyData(r, h);
}
function oS(n, r) {
  const a = {
    type: "element",
    tagName: "p",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function sS(n, r) {
  const a = { type: "root", children: n.wrap(n.all(r)) };
  return n.patch(r, a), n.applyData(r, a);
}
function cS(n, r) {
  const a = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
function fS(n, r) {
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
  const h = {
    type: "element",
    tagName: "table",
    properties: {},
    children: n.wrap(c, !0)
  };
  return n.patch(r, h), n.applyData(r, h);
}
function hS(n, r, a) {
  const u = a ? a.children : void 0, h = (u ? u.indexOf(r) : 1) === 0 ? "th" : "td", f = a && a.type === "table" ? a.align : void 0, m = f ? f.length : r.children.length;
  let p = -1;
  const d = [];
  for (; ++p < m; ) {
    const y = r.children[p], S = {}, x = f ? f[p] : void 0;
    x && (S.align = x);
    let A = { type: "element", tagName: h, properties: S, children: [] };
    y && (A.children = n.all(y), n.patch(y, A), A = n.applyData(y, A)), d.push(A);
  }
  const b = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: n.wrap(d, !0)
  };
  return n.patch(r, b), n.applyData(r, b);
}
function dS(n, r) {
  const a = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, a), n.applyData(r, a);
}
const Sp = 9, kp = 32;
function mS(n) {
  const r = String(n), a = /\r?\n|\r/g;
  let u = a.exec(r), c = 0;
  const h = [];
  for (; u; )
    h.push(
      wp(r.slice(c, u.index), c > 0, !0),
      u[0]
    ), c = u.index + u[0].length, u = a.exec(r);
  return h.push(wp(r.slice(c), c > 0, !1)), h.join("");
}
function wp(n, r, a) {
  let u = 0, c = n.length;
  if (r) {
    let h = n.codePointAt(u);
    for (; h === Sp || h === kp; )
      u++, h = n.codePointAt(u);
  }
  if (a) {
    let h = n.codePointAt(c - 1);
    for (; h === Sp || h === kp; )
      c--, h = n.codePointAt(c - 1);
  }
  return c > u ? n.slice(u, c) : "";
}
function pS(n, r) {
  const a = { type: "text", value: mS(String(r.value)) };
  return n.patch(r, a), n.applyData(r, a);
}
function gS(n, r) {
  const a = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return n.patch(r, a), n.applyData(r, a);
}
const yS = {
  blockquote: Zx,
  break: Kx,
  code: Fx,
  delete: Jx,
  emphasis: Ix,
  footnoteReference: $x,
  heading: Wx,
  html: Px,
  imageReference: eS,
  image: tS,
  inlineCode: nS,
  linkReference: lS,
  link: iS,
  listItem: aS,
  list: uS,
  paragraph: oS,
  // @ts-expect-error: root is different, but hard to type.
  root: sS,
  strong: cS,
  table: fS,
  tableCell: dS,
  tableRow: hS,
  text: pS,
  thematicBreak: gS,
  toml: ru,
  yaml: ru,
  definition: ru,
  footnoteDefinition: ru
};
function ru() {
}
const Cg = -1, Su = 0, ja = 1, pu = 2, jc = 3, Lc = 4, Uc = 5, Bc = 6, _g = 7, Dg = 8, Og = typeof self == "object" ? self : globalThis, Ep = (n, r) => {
  switch (n) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + n);
  }
  return new Og[n](r);
}, bS = (n, r) => {
  const a = (c, h) => (n.set(h, c), c), u = (c) => {
    if (n.has(c))
      return n.get(c);
    const [h, f] = r[c];
    switch (h) {
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
        for (const [p, d] of f)
          m[u(p)] = u(d);
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
        for (const [p, d] of f)
          m.set(u(p), u(d));
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
          typeof Og[m] == "function" ? Ep(m, p) : new Error(p),
          c
        );
      }
      case Dg:
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
    return a(Ep(h, f), c);
  };
  return u;
}, zp = (n) => bS(/* @__PURE__ */ new Map(), n)(0), Ll = "", { toString: vS } = {}, { keys: xS } = Object, Oa = (n) => {
  const r = typeof n;
  if (r !== "object" || !n)
    return [Su, r];
  const a = vS.call(n).slice(8, -1);
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
}, uu = ([n, r]) => n === Su && (r === "function" || r === "symbol"), SS = (n, r, a, u) => {
  const c = (f, m) => {
    const p = u.push(f) - 1;
    return a.set(m, p), p;
  }, h = (f) => {
    if (a.has(f))
      return a.get(f);
    let [m, p] = Oa(f);
    switch (m) {
      case Su: {
        let b = f;
        switch (p) {
          case "bigint":
            m = Dg, b = f.toString();
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
          b.push(h(S));
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
          return h(f.toJSON());
        const b = [], y = c([m, b], f);
        for (const S of xS(f))
          (n || !uu(Oa(f[S]))) && b.push([h(S), h(f[S])]);
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
        for (const [S, x] of f)
          (n || !(uu(Oa(S)) || uu(Oa(x)))) && b.push([h(S), h(x)]);
        return y;
      }
      case Bc: {
        const b = [], y = c([m, b], f);
        for (const S of f)
          (n || !uu(Oa(S))) && b.push(h(S));
        return y;
      }
    }
    const { message: d } = f;
    return c([m, { name: p, message: d }], f);
  };
  return h;
}, Tp = (n, { json: r, lossy: a } = {}) => {
  const u = [];
  return SS(!(r || a), !!r, /* @__PURE__ */ new Map(), u)(n), u;
}, gu = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (n, r) => r && ("json" in r || "lossy" in r) ? zp(Tp(n, r)) : structuredClone(n)
) : (n, r) => zp(Tp(n, r));
function kS(n, r) {
  const a = [{ type: "text", value: "↩" }];
  return r > 1 && a.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(r) }]
  }), a;
}
function wS(n, r) {
  return "Back to reference " + (n + 1) + (r > 1 ? "-" + r : "");
}
function ES(n) {
  const r = typeof n.options.clobberPrefix == "string" ? n.options.clobberPrefix : "user-content-", a = n.options.footnoteBackContent || kS, u = n.options.footnoteBackLabel || wS, c = n.options.footnoteLabel || "Footnotes", h = n.options.footnoteLabelTagName || "h2", f = n.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, m = [];
  let p = -1;
  for (; ++p < n.footnoteOrder.length; ) {
    const d = n.footnoteById.get(
      n.footnoteOrder[p]
    );
    if (!d)
      continue;
    const b = n.all(d), y = String(d.identifier).toUpperCase(), S = Ni(y.toLowerCase());
    let x = 0;
    const A = [], L = n.footnoteCounts.get(y);
    for (; L !== void 0 && ++x <= L; ) {
      A.length > 0 && A.push({ type: "text", value: " " });
      let Z = typeof a == "string" ? a : a(p, x);
      typeof Z == "string" && (Z = { type: "text", value: Z }), A.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + r + "fnref-" + S + (x > 1 ? "-" + x : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof u == "string" ? u : u(p, x),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(Z) ? Z : [Z]
      });
    }
    const Y = b[b.length - 1];
    if (Y && Y.type === "element" && Y.tagName === "p") {
      const Z = Y.children[Y.children.length - 1];
      Z && Z.type === "text" ? Z.value += " " : Y.children.push({ type: "text", value: " " }), Y.children.push(...A);
    } else
      b.push(...A);
    const D = {
      type: "element",
      tagName: "li",
      properties: { id: r + "fn-" + S },
      children: n.wrap(b, !0)
    };
    n.patch(d, D), m.push(D);
  }
  if (m.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: h,
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
      return CS;
    if (typeof n == "function")
      return wu(n);
    if (typeof n == "object")
      return Array.isArray(n) ? zS(n) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        TS(
          /** @type {Props} */
          n
        )
      );
    if (typeof n == "string")
      return AS(n);
    throw new Error("Expected function, string, or object as test");
  })
);
function zS(n) {
  const r = [];
  let a = -1;
  for (; ++a < n.length; )
    r[a] = ku(n[a]);
  return wu(u);
  function u(...c) {
    let h = -1;
    for (; ++h < r.length; )
      if (r[h].apply(this, c)) return !0;
    return !1;
  }
}
function TS(n) {
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
    let h;
    for (h in n)
      if (c[h] !== r[h]) return !1;
    return !0;
  }
}
function AS(n) {
  return wu(r);
  function r(a) {
    return a && a.type === n;
  }
}
function wu(n) {
  return r;
  function r(a, u, c) {
    return !!(_S(a) && n.call(
      this,
      a,
      typeof u == "number" ? u : void 0,
      c || void 0
    ));
  }
}
function CS() {
  return !0;
}
function _S(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const Mg = [], DS = !0, bc = !1, OS = "skip";
function Ng(n, r, a, u) {
  let c;
  typeof r == "function" && typeof a != "function" ? (u = a, a = r) : c = r;
  const h = ku(c), f = u ? -1 : 1;
  m(n, void 0, [])();
  function m(p, d, b) {
    const y = (
      /** @type {Record<string, unknown>} */
      p && typeof p == "object" ? p : {}
    );
    if (typeof y.type == "string") {
      const x = (
        // `hast`
        typeof y.tagName == "string" ? y.tagName : (
          // `xast`
          typeof y.name == "string" ? y.name : void 0
        )
      );
      Object.defineProperty(S, "name", {
        value: "node (" + (p.type + (x ? "<" + x + ">" : "")) + ")"
      });
    }
    return S;
    function S() {
      let x = Mg, A, L, Y;
      if ((!r || h(p, d, b[b.length - 1] || void 0)) && (x = MS(a(p, b)), x[0] === bc))
        return x;
      if ("children" in p && p.children) {
        const D = (
          /** @type {UnistParent} */
          p
        );
        if (D.children && x[0] !== OS)
          for (L = (u ? D.children.length : -1) + f, Y = b.concat(D); L > -1 && L < D.children.length; ) {
            const Z = D.children[L];
            if (A = m(Z, L, Y)(), A[0] === bc)
              return A;
            L = typeof A[1] == "number" ? A[1] : L + f;
          }
      }
      return x;
    }
  }
}
function MS(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [DS, n] : n == null ? Mg : [n];
}
function Hc(n, r, a, u) {
  let c, h, f;
  typeof r == "function" && typeof a != "function" ? (h = void 0, f = r, c = a) : (h = r, f = a, c = u), Ng(n, h, m, c);
  function m(p, d) {
    const b = d[d.length - 1], y = b ? b.children.indexOf(p) : void 0;
    return f(p, y, b);
  }
}
const vc = {}.hasOwnProperty, NS = {};
function RS(n, r) {
  const a = r || NS, u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), f = { ...yS, ...a.handlers }, m = {
    all: d,
    applyData: LS,
    definitionById: u,
    footnoteById: c,
    footnoteCounts: h,
    footnoteOrder: [],
    handlers: f,
    one: p,
    options: a,
    patch: jS,
    wrap: BS
  };
  return Hc(n, function(b) {
    if (b.type === "definition" || b.type === "footnoteDefinition") {
      const y = b.type === "definition" ? u : c, S = String(b.identifier).toUpperCase();
      y.has(S) || y.set(S, b);
    }
  }), m;
  function p(b, y) {
    const S = b.type, x = m.handlers[S];
    if (vc.call(m.handlers, S) && x)
      return x(m, b, y);
    if (m.options.passThrough && m.options.passThrough.includes(S)) {
      if ("children" in b) {
        const { children: L, ...Y } = b, D = gu(Y);
        return D.children = m.all(b), D;
      }
      return gu(b);
    }
    return (m.options.unknownHandler || US)(m, b, y);
  }
  function d(b) {
    const y = [];
    if ("children" in b) {
      const S = b.children;
      let x = -1;
      for (; ++x < S.length; ) {
        const A = m.one(S[x], b);
        if (A) {
          if (x && S[x - 1].type === "break" && (!Array.isArray(A) && A.type === "text" && (A.value = Ap(A.value)), !Array.isArray(A) && A.type === "element")) {
            const L = A.children[0];
            L && L.type === "text" && (L.value = Ap(L.value));
          }
          Array.isArray(A) ? y.push(...A) : y.push(A);
        }
      }
    }
    return y;
  }
}
function jS(n, r) {
  n.position && (r.position = w0(n));
}
function LS(n, r) {
  let a = r;
  if (n && n.data) {
    const u = n.data.hName, c = n.data.hChildren, h = n.data.hProperties;
    if (typeof u == "string")
      if (a.type === "element")
        a.tagName = u;
      else {
        const f = "children" in a ? a.children : [a];
        a = { type: "element", tagName: u, properties: {}, children: f };
      }
    a.type === "element" && h && Object.assign(a.properties, gu(h)), "children" in a && a.children && c !== null && c !== void 0 && (a.children = c);
  }
  return a;
}
function US(n, r) {
  const a = r.data || {}, u = "value" in r && !(vc.call(a, "hProperties") || vc.call(a, "hChildren")) ? { type: "text", value: r.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: n.all(r)
  };
  return n.patch(r, u), n.applyData(r, u);
}
function BS(n, r) {
  const a = [];
  let u = -1;
  for (r && a.push({ type: "text", value: `
` }); ++u < n.length; )
    u && a.push({ type: "text", value: `
` }), a.push(n[u]);
  return r && n.length > 0 && a.push({ type: "text", value: `
` }), a;
}
function Ap(n) {
  let r = 0, a = n.charCodeAt(r);
  for (; a === 9 || a === 32; )
    r++, a = n.charCodeAt(r);
  return n.slice(r);
}
function Cp(n, r) {
  const a = RS(n, r), u = a.one(n, void 0), c = ES(a), h = Array.isArray(u) ? { type: "root", children: u } : u || { type: "root", children: [] };
  return c && h.children.push({ type: "text", value: `
` }, c), h;
}
function HS(n, r) {
  return n && "run" in n ? async function(a, u) {
    const c = (
      /** @type {HastRoot} */
      Cp(a, { file: u, ...r })
    );
    await n.run(c, u);
  } : function(a, u) {
    return (
      /** @type {HastRoot} */
      Cp(a, { file: u, ...n || r })
    );
  };
}
function _p(n) {
  if (n)
    throw n;
}
var $s, Dp;
function qS() {
  if (Dp) return $s;
  Dp = 1;
  var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, a = Object.defineProperty, u = Object.getOwnPropertyDescriptor, c = function(d) {
    return typeof Array.isArray == "function" ? Array.isArray(d) : r.call(d) === "[object Array]";
  }, h = function(d) {
    if (!d || r.call(d) !== "[object Object]")
      return !1;
    var b = n.call(d, "constructor"), y = d.constructor && d.constructor.prototype && n.call(d.constructor.prototype, "isPrototypeOf");
    if (d.constructor && !b && !y)
      return !1;
    var S;
    for (S in d)
      ;
    return typeof S > "u" || n.call(d, S);
  }, f = function(d, b) {
    a && b.name === "__proto__" ? a(d, b.name, {
      enumerable: !0,
      configurable: !0,
      value: b.newValue,
      writable: !0
    }) : d[b.name] = b.newValue;
  }, m = function(d, b) {
    if (b === "__proto__")
      if (n.call(d, b)) {
        if (u)
          return u(d, b).value;
      } else return;
    return d[b];
  };
  return $s = function p() {
    var d, b, y, S, x, A, L = arguments[0], Y = 1, D = arguments.length, Z = !1;
    for (typeof L == "boolean" && (Z = L, L = arguments[1] || {}, Y = 2), (L == null || typeof L != "object" && typeof L != "function") && (L = {}); Y < D; ++Y)
      if (d = arguments[Y], d != null)
        for (b in d)
          y = m(L, b), S = m(d, b), L !== S && (Z && S && (h(S) || (x = c(S))) ? (x ? (x = !1, A = y && c(y) ? y : []) : A = y && h(y) ? y : {}, f(L, { name: b, newValue: p(Z, A, S) })) : typeof S < "u" && f(L, { name: b, newValue: S }));
    return L;
  }, $s;
}
var YS = /* @__PURE__ */ qS();
const Ws = /* @__PURE__ */ Wp(YS);
function xc(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const r = Object.getPrototypeOf(n);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
}
function GS() {
  const n = [], r = { run: a, use: u };
  return r;
  function a(...c) {
    let h = -1;
    const f = c.pop();
    if (typeof f != "function")
      throw new TypeError("Expected function as last argument, not " + f);
    m(null, ...c);
    function m(p, ...d) {
      const b = n[++h];
      let y = -1;
      if (p) {
        f(p);
        return;
      }
      for (; ++y < c.length; )
        (d[y] === null || d[y] === void 0) && (d[y] = c[y]);
      c = d, b ? VS(b, m)(...d) : f(null, ...d);
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
function VS(n, r) {
  let a;
  return u;
  function u(...f) {
    const m = n.length > f.length;
    let p;
    m && f.push(c);
    try {
      p = n.apply(this, f);
    } catch (d) {
      const b = (
        /** @type {Error} */
        d
      );
      if (m && a)
        throw b;
      return c(b);
    }
    m || (p && p.then && typeof p.then == "function" ? p.then(h, c) : p instanceof Error ? c(p) : h(p));
  }
  function c(f, ...m) {
    a || (a = !0, r(f, ...m));
  }
  function h(f) {
    c(null, f);
  }
}
const gn = { basename: XS, dirname: QS, extname: ZS, join: KS, sep: "/" };
function XS(n, r) {
  if (r !== void 0 && typeof r != "string")
    throw new TypeError('"ext" argument must be a string');
  Ya(n);
  let a = 0, u = -1, c = n.length, h;
  if (r === void 0 || r.length === 0 || r.length > n.length) {
    for (; c--; )
      if (n.codePointAt(c) === 47) {
        if (h) {
          a = c + 1;
          break;
        }
      } else u < 0 && (h = !0, u = c + 1);
    return u < 0 ? "" : n.slice(a, u);
  }
  if (r === n)
    return "";
  let f = -1, m = r.length - 1;
  for (; c--; )
    if (n.codePointAt(c) === 47) {
      if (h) {
        a = c + 1;
        break;
      }
    } else
      f < 0 && (h = !0, f = c + 1), m > -1 && (n.codePointAt(c) === r.codePointAt(m--) ? m < 0 && (u = c) : (m = -1, u = f));
  return a === u ? u = f : u < 0 && (u = n.length), n.slice(a, u);
}
function QS(n) {
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
function ZS(n) {
  Ya(n);
  let r = n.length, a = -1, u = 0, c = -1, h = 0, f;
  for (; r--; ) {
    const m = n.codePointAt(r);
    if (m === 47) {
      if (f) {
        u = r + 1;
        break;
      }
      continue;
    }
    a < 0 && (f = !0, a = r + 1), m === 46 ? c < 0 ? c = r : h !== 1 && (h = 1) : c > -1 && (h = -1);
  }
  return c < 0 || a < 0 || // We saw a non-dot character immediately before the dot.
  h === 0 || // The (right-most) trimmed path component is exactly `..`.
  h === 1 && c === a - 1 && c === u + 1 ? "" : n.slice(c, a);
}
function KS(...n) {
  let r = -1, a;
  for (; ++r < n.length; )
    Ya(n[r]), n[r] && (a = a === void 0 ? n[r] : a + "/" + n[r]);
  return a === void 0 ? "." : FS(a);
}
function FS(n) {
  Ya(n);
  const r = n.codePointAt(0) === 47;
  let a = JS(n, !r);
  return a.length === 0 && !r && (a = "."), a.length > 0 && n.codePointAt(n.length - 1) === 47 && (a += "/"), r ? "/" + a : a;
}
function JS(n, r) {
  let a = "", u = 0, c = -1, h = 0, f = -1, m, p;
  for (; ++f <= n.length; ) {
    if (f < n.length)
      m = n.codePointAt(f);
    else {
      if (m === 47)
        break;
      m = 47;
    }
    if (m === 47) {
      if (!(c === f - 1 || h === 1)) if (c !== f - 1 && h === 2) {
        if (a.length < 2 || u !== 2 || a.codePointAt(a.length - 1) !== 46 || a.codePointAt(a.length - 2) !== 46) {
          if (a.length > 2) {
            if (p = a.lastIndexOf("/"), p !== a.length - 1) {
              p < 0 ? (a = "", u = 0) : (a = a.slice(0, p), u = a.length - 1 - a.lastIndexOf("/")), c = f, h = 0;
              continue;
            }
          } else if (a.length > 0) {
            a = "", u = 0, c = f, h = 0;
            continue;
          }
        }
        r && (a = a.length > 0 ? a + "/.." : "..", u = 2);
      } else
        a.length > 0 ? a += "/" + n.slice(c + 1, f) : a = n.slice(c + 1, f), u = f - c - 1;
      c = f, h = 0;
    } else m === 46 && h > -1 ? h++ : h = -1;
  }
  return a;
}
function Ya(n) {
  if (typeof n != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(n)
    );
}
const IS = { cwd: $S };
function $S() {
  return "/";
}
function Sc(n) {
  return !!(n !== null && typeof n == "object" && "href" in n && n.href && "protocol" in n && n.protocol && // @ts-expect-error: indexing is fine.
  n.auth === void 0);
}
function WS(n) {
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
  return PS(n);
}
function PS(n) {
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
    r ? Sc(r) ? a = { path: r } : typeof r == "string" || ek(r) ? a = { value: r } : a = r : a = {}, this.cwd = "cwd" in a ? "" : IS.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let u = -1;
    for (; ++u < Ps.length; ) {
      const h = Ps[u];
      h in a && a[h] !== void 0 && a[h] !== null && (this[h] = h === "history" ? [...a[h]] : a[h]);
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
    Op(this.basename, "dirname"), this.path = gn.join(r || "", this.basename);
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
    if (ec(r, "extname"), Op(this.dirname, "extname"), r) {
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
    Sc(r) && (r = WS(r)), tc(r, "path"), this.path !== r && this.history.push(r);
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
    const c = new bt(
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
function Op(n, r) {
  if (!n)
    throw new Error("Setting `" + r + "` requires `path` to be set too");
}
function ek(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const tk = (
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
    ), c = u[n], h = function() {
      return c.apply(h, arguments);
    };
    return Object.setPrototypeOf(h, u), h;
  })
), nk = {}.hasOwnProperty;
class qc extends tk {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = GS();
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
    return typeof r == "string" ? arguments.length === 2 ? (ic("data", this.frozen), this.namespace[r] = a, this) : nk.call(this.namespace, r) && this.namespace[r] || void 0 : r ? (ic("data", this.frozen), this.namespace = r, this) : this.namespace;
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
    function c(h, f) {
      const m = ou(r), p = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        u.parse(m)
      );
      u.run(p, m, function(b, y, S) {
        if (b || !y || !S)
          return d(b);
        const x = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          y
        ), A = u.stringify(x, S);
        ak(A) ? S.value = A : S.result = A, d(
          b,
          /** @type {VFileWithOutput<CompileResult>} */
          S
        );
      });
      function d(b, y) {
        b || !y ? f(b) : h ? h(y) : a(void 0, y);
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
    return this.freeze(), nc("processSync", this.parser || this.Parser), lc("processSync", this.compiler || this.Compiler), this.process(r, c), Np("processSync", "process", a), u;
    function c(h, f) {
      a = !0, _p(h), u = f;
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
    Mp(r), this.freeze();
    const c = this.transformers;
    return !u && typeof a == "function" && (u = a, a = void 0), u ? h(void 0, u) : new Promise(h);
    function h(f, m) {
      const p = ou(a);
      c.run(r, p, d);
      function d(b, y, S) {
        const x = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          y || r
        );
        b ? m(b) : f ? f(x) : u(void 0, x, S);
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
    return this.run(r, a, h), Np("runSync", "run", u), c;
    function h(f, m) {
      _p(f), c = m, u = !0;
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
    return lc("stringify", c), Mp(r), c(r, u);
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
    function h(d) {
      if (typeof d == "function")
        p(d, []);
      else if (typeof d == "object")
        if (Array.isArray(d)) {
          const [b, ...y] = (
            /** @type {PluginTuple<Array<unknown>>} */
            d
          );
          p(b, y);
        } else
          f(d);
      else
        throw new TypeError("Expected usable value, not `" + d + "`");
    }
    function f(d) {
      if (!("plugins" in d) && !("settings" in d))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      m(d.plugins), d.settings && (c.settings = Ws(!0, c.settings, d.settings));
    }
    function m(d) {
      let b = -1;
      if (d != null) if (Array.isArray(d))
        for (; ++b < d.length; ) {
          const y = d[b];
          h(y);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + d + "`");
    }
    function p(d, b) {
      let y = -1, S = -1;
      for (; ++y < u.length; )
        if (u[y][0] === d) {
          S = y;
          break;
        }
      if (S === -1)
        u.push([d, ...b]);
      else if (b.length > 0) {
        let [x, ...A] = b;
        const L = u[S][1];
        xc(L) && xc(x) && (x = Ws(!0, L, x)), u[S] = [d, x, ...A];
      }
    }
  }
}
const lk = new qc().freeze();
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
function Mp(n) {
  if (!xc(n) || typeof n.type != "string")
    throw new TypeError("Expected node, got `" + n + "`");
}
function Np(n, r, a) {
  if (!a)
    throw new Error(
      "`" + n + "` finished async. Use `" + r + "` instead"
    );
}
function ou(n) {
  return ik(n) ? n : new Rg(n);
}
function ik(n) {
  return !!(n && typeof n == "object" && "message" in n && "messages" in n);
}
function ak(n) {
  return typeof n == "string" || rk(n);
}
function rk(n) {
  return !!(n && typeof n == "object" && "byteLength" in n && "byteOffset" in n);
}
const uk = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", Rp = [], jp = { allowDangerousHtml: !0 }, ok = /^(https?|ircs?|mailto|xmpp)$/i, sk = [
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
function ck(n) {
  const r = fk(n), a = hk(n);
  return dk(r.runSync(r.parse(a), a), n);
}
function fk(n) {
  const r = n.rehypePlugins || Rp, a = n.remarkPlugins || Rp, u = n.remarkRehypeOptions ? { ...n.remarkRehypeOptions, ...jp } : jp;
  return lk().use(Qx).use(a).use(HS, u).use(r);
}
function hk(n) {
  const r = n.children || "", a = new Rg();
  return typeof r == "string" && (a.value = r), a;
}
function dk(n, r) {
  const a = r.allowedElements, u = r.allowElement, c = r.components, h = r.disallowedElements, f = r.skipHtml, m = r.unwrapDisallowed, p = r.urlTransform || mk;
  for (const b of sk)
    Object.hasOwn(r, b.from) && ("" + b.from + (b.to ? "use `" + b.to + "` instead" : "remove it") + uk + b.id, void 0);
  return Hc(n, d), C0(n, {
    Fragment: B.Fragment,
    components: c,
    ignoreInvalidStyle: !0,
    jsx: B.jsx,
    jsxs: B.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function d(b, y, S) {
    if (b.type === "raw" && S && typeof y == "number")
      return f ? S.children.splice(y, 1) : S.children[y] = { type: "text", value: b.value }, y;
    if (b.type === "element") {
      let x;
      for (x in Fs)
        if (Object.hasOwn(Fs, x) && Object.hasOwn(b.properties, x)) {
          const A = b.properties[x], L = Fs[x];
          (L === null || L.includes(b.tagName)) && (b.properties[x] = p(String(A || ""), x, b));
        }
    }
    if (b.type === "element") {
      let x = a ? !a.includes(b.tagName) : h ? h.includes(b.tagName) : !1;
      if (!x && u && typeof y == "number" && (x = !u(b, y, S)), x && S && typeof y == "number")
        return m && b.children ? S.children.splice(y, 1, ...b.children) : S.children.splice(y, 1), y;
    }
  }
}
function mk(n) {
  const r = n.indexOf(":"), a = n.indexOf("?"), u = n.indexOf("#"), c = n.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    r === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    c !== -1 && r > c || a !== -1 && r > a || u !== -1 && r > u || // It is a protocol, it should be allowed.
    ok.test(n.slice(0, r)) ? n : ""
  );
}
function Lp(n, r) {
  const a = String(n);
  if (typeof r != "string")
    throw new TypeError("Expected character");
  let u = 0, c = a.indexOf(r);
  for (; c !== -1; )
    u++, c = a.indexOf(r, c + r.length);
  return u;
}
function pk(n) {
  if (typeof n != "string")
    throw new TypeError("Expected a string");
  return n.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function gk(n, r, a) {
  const c = ku((a || {}).ignore || []), h = yk(r);
  let f = -1;
  for (; ++f < h.length; )
    Ng(n, "text", m);
  function m(d, b) {
    let y = -1, S;
    for (; ++y < b.length; ) {
      const x = b[y], A = S ? S.children : void 0;
      if (c(
        x,
        A ? A.indexOf(x) : void 0,
        S
      ))
        return;
      S = x;
    }
    if (S)
      return p(d, b);
  }
  function p(d, b) {
    const y = b[b.length - 1], S = h[f][0], x = h[f][1];
    let A = 0;
    const Y = y.children.indexOf(d);
    let D = !1, Z = [];
    S.lastIndex = 0;
    let X = S.exec(d.value);
    for (; X; ) {
      const se = X.index, fe = {
        index: X.index,
        input: X.input,
        stack: [...b, d]
      };
      let U = x(...X, fe);
      if (typeof U == "string" && (U = U.length > 0 ? { type: "text", value: U } : void 0), U === !1 ? S.lastIndex = se + 1 : (A !== se && Z.push({
        type: "text",
        value: d.value.slice(A, se)
      }), Array.isArray(U) ? Z.push(...U) : U && Z.push(U), A = se + X[0].length, D = !0), !S.global)
        break;
      X = S.exec(d.value);
    }
    return D ? (A < d.value.length && Z.push({ type: "text", value: d.value.slice(A) }), y.children.splice(Y, 1, ...Z)) : Z = [d], Y + Z.length;
  }
}
function yk(n) {
  const r = [];
  if (!Array.isArray(n))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const a = !n[0] || Array.isArray(n[0]) ? n : [n];
  let u = -1;
  for (; ++u < a.length; ) {
    const c = a[u];
    r.push([bk(c[0]), vk(c[1])]);
  }
  return r;
}
function bk(n) {
  return typeof n == "string" ? new RegExp(pk(n), "g") : n;
}
function vk(n) {
  return typeof n == "function" ? n : function() {
    return n;
  };
}
const ac = "phrasing", rc = ["autolink", "link", "image", "label"];
function xk() {
  return {
    transforms: [Ak],
    enter: {
      literalAutolink: kk,
      literalAutolinkEmail: uc,
      literalAutolinkHttp: uc,
      literalAutolinkWww: uc
    },
    exit: {
      literalAutolink: Tk,
      literalAutolinkEmail: zk,
      literalAutolinkHttp: wk,
      literalAutolinkWww: Ek
    }
  };
}
function Sk() {
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
function kk(n) {
  this.enter({ type: "link", title: null, url: "", children: [] }, n);
}
function uc(n) {
  this.config.enter.autolinkProtocol.call(this, n);
}
function wk(n) {
  this.config.exit.autolinkProtocol.call(this, n);
}
function Ek(n) {
  this.config.exit.data.call(this, n);
  const r = this.stack[this.stack.length - 1];
  r.type, r.url = "http://" + this.sliceSerialize(n);
}
function zk(n) {
  this.config.exit.autolinkEmail.call(this, n);
}
function Tk(n) {
  this.exit(n);
}
function Ak(n) {
  gk(
    n,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Ck],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), _k]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Ck(n, r, a, u, c) {
  let h = "";
  if (!jg(c) || (/^w/i.test(r) && (a = r + a, r = "", h = "http://"), !Dk(a)))
    return !1;
  const f = Ok(a + u);
  if (!f[0]) return !1;
  const m = {
    type: "link",
    title: null,
    url: h + r + f[0],
    children: [{ type: "text", value: r + f[0] }]
  };
  return f[1] ? [m, { type: "text", value: f[1] }] : m;
}
function _k(n, r, a, u) {
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
function Dk(n) {
  const r = n.split(".");
  return !(r.length < 2 || r[r.length - 1] && (/_/.test(r[r.length - 1]) || !/[a-zA-Z\d]/.test(r[r.length - 1])) || r[r.length - 2] && (/_/.test(r[r.length - 2]) || !/[a-zA-Z\d]/.test(r[r.length - 2])));
}
function Ok(n) {
  const r = /[!"&'),.:;<>?\]}]+$/.exec(n);
  if (!r)
    return [n, void 0];
  n = n.slice(0, r.index);
  let a = r[0], u = a.indexOf(")");
  const c = Lp(n, "(");
  let h = Lp(n, ")");
  for (; u !== -1 && c > h; )
    n += a.slice(0, u + 1), a = a.slice(u + 1), u = a.indexOf(")"), h++;
  return [n, a];
}
function jg(n, r) {
  const a = n.input.charCodeAt(n.index - 1);
  return (n.index === 0 || Bl(a) || vu(a)) && // If it’s an email, the previous character should not be a slash.
  (!r || a !== 47);
}
Lg.peek = qk;
function Mk() {
  this.buffer();
}
function Nk(n) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, n);
}
function Rk() {
  this.buffer();
}
function jk(n) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    n
  );
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
function Bk(n) {
  const r = this.resume(), a = this.stack[this.stack.length - 1];
  a.type, a.identifier = sn(
    this.sliceSerialize(n)
  ).toLowerCase(), a.label = r;
}
function Hk(n) {
  this.exit(n);
}
function qk() {
  return "[";
}
function Lg(n, r, a, u) {
  const c = a.createTracker(u);
  let h = c.move("[^");
  const f = a.enter("footnoteReference"), m = a.enter("reference");
  return h += c.move(
    a.safe(a.associationId(n), { after: "]", before: h })
  ), m(), f(), h += c.move("]"), h;
}
function Yk() {
  return {
    enter: {
      gfmFootnoteCallString: Mk,
      gfmFootnoteCall: Nk,
      gfmFootnoteDefinitionLabelString: Rk,
      gfmFootnoteDefinition: jk
    },
    exit: {
      gfmFootnoteCallString: Lk,
      gfmFootnoteCall: Uk,
      gfmFootnoteDefinitionLabelString: Bk,
      gfmFootnoteDefinition: Hk
    }
  };
}
function Gk(n) {
  let r = !1;
  return n && n.firstLineBlank && (r = !0), {
    handlers: { footnoteDefinition: a, footnoteReference: Lg },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function a(u, c, h, f) {
    const m = h.createTracker(f);
    let p = m.move("[^");
    const d = h.enter("footnoteDefinition"), b = h.enter("label");
    return p += m.move(
      h.safe(h.associationId(u), { before: p, after: "]" })
    ), b(), p += m.move("]:"), u.children && u.children.length > 0 && (m.shift(4), p += m.move(
      (r ? `
` : " ") + h.indentLines(
        h.containerFlow(u, m.current()),
        r ? Ug : Vk
      )
    )), d(), p;
  }
}
function Vk(n, r, a) {
  return r === 0 ? n : Ug(n, r, a);
}
function Ug(n, r, a) {
  return (a ? "" : "    ") + n;
}
const Xk = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Bg.peek = Jk;
function Qk() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Kk },
    exit: { strikethrough: Fk }
  };
}
function Zk() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: Xk
      }
    ],
    handlers: { delete: Bg }
  };
}
function Kk(n) {
  this.enter({ type: "delete", children: [] }, n);
}
function Fk(n) {
  this.exit(n);
}
function Bg(n, r, a, u) {
  const c = a.createTracker(u), h = a.enter("strikethrough");
  let f = c.move("~~");
  return f += a.containerPhrasing(n, {
    ...c.current(),
    before: f,
    after: "~"
  }), f += c.move("~~"), h(), f;
}
function Jk() {
  return "~";
}
function Ik(n) {
  return n.length;
}
function $k(n, r) {
  const a = r || {}, u = (a.align || []).concat(), c = a.stringLength || Ik, h = [], f = [], m = [], p = [];
  let d = 0, b = -1;
  for (; ++b < n.length; ) {
    const L = [], Y = [];
    let D = -1;
    for (n[b].length > d && (d = n[b].length); ++D < n[b].length; ) {
      const Z = Wk(n[b][D]);
      if (a.alignDelimiters !== !1) {
        const X = c(Z);
        Y[D] = X, (p[D] === void 0 || X > p[D]) && (p[D] = X);
      }
      L.push(Z);
    }
    f[b] = L, m[b] = Y;
  }
  let y = -1;
  if (typeof u == "object" && "length" in u)
    for (; ++y < d; )
      h[y] = Up(u[y]);
  else {
    const L = Up(u);
    for (; ++y < d; )
      h[y] = L;
  }
  y = -1;
  const S = [], x = [];
  for (; ++y < d; ) {
    const L = h[y];
    let Y = "", D = "";
    L === 99 ? (Y = ":", D = ":") : L === 108 ? Y = ":" : L === 114 && (D = ":");
    let Z = a.alignDelimiters === !1 ? 1 : Math.max(
      1,
      p[y] - Y.length - D.length
    );
    const X = Y + "-".repeat(Z) + D;
    a.alignDelimiters !== !1 && (Z = Y.length + Z + D.length, Z > p[y] && (p[y] = Z), x[y] = Z), S[y] = X;
  }
  f.splice(1, 0, S), m.splice(1, 0, x), b = -1;
  const A = [];
  for (; ++b < f.length; ) {
    const L = f[b], Y = m[b];
    y = -1;
    const D = [];
    for (; ++y < d; ) {
      const Z = L[y] || "";
      let X = "", se = "";
      if (a.alignDelimiters !== !1) {
        const fe = p[y] - (Y[y] || 0), U = h[y];
        U === 114 ? X = " ".repeat(fe) : U === 99 ? fe % 2 ? (X = " ".repeat(fe / 2 + 0.5), se = " ".repeat(fe / 2 - 0.5)) : (X = " ".repeat(fe / 2), se = X) : se = " ".repeat(fe);
      }
      a.delimiterStart !== !1 && !y && D.push("|"), a.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(a.alignDelimiters === !1 && Z === "") && (a.delimiterStart !== !1 || y) && D.push(" "), a.alignDelimiters !== !1 && D.push(X), D.push(Z), a.alignDelimiters !== !1 && D.push(se), a.padding !== !1 && D.push(" "), (a.delimiterEnd !== !1 || y !== d - 1) && D.push("|");
    }
    A.push(
      a.delimiterEnd === !1 ? D.join("").replace(/ +$/, "") : D.join("")
    );
  }
  return A.join(`
`);
}
function Wk(n) {
  return n == null ? "" : String(n);
}
function Up(n) {
  const r = typeof n == "string" ? n.codePointAt(0) : 0;
  return r === 67 || r === 99 ? 99 : r === 76 || r === 108 ? 108 : r === 82 || r === 114 ? 114 : 0;
}
function Pk(n, r, a, u) {
  const c = a.enter("blockquote"), h = a.createTracker(u);
  h.move("> "), h.shift(2);
  const f = a.indentLines(
    a.containerFlow(n, h.current()),
    ew
  );
  return c(), f;
}
function ew(n, r, a) {
  return ">" + (a ? "" : " ") + n;
}
function tw(n, r) {
  return Bp(n, r.inConstruct, !0) && !Bp(n, r.notInConstruct, !1);
}
function Bp(n, r, a) {
  if (typeof r == "string" && (r = [r]), !r || r.length === 0)
    return a;
  let u = -1;
  for (; ++u < r.length; )
    if (n.includes(r[u]))
      return !0;
  return !1;
}
function Hp(n, r, a, u) {
  let c = -1;
  for (; ++c < a.unsafe.length; )
    if (a.unsafe[c].character === `
` && tw(a.stack, a.unsafe[c]))
      return /[ \t]/.test(u.before) ? "" : " ";
  return `\\
`;
}
function nw(n, r) {
  const a = String(n);
  let u = a.indexOf(r), c = u, h = 0, f = 0;
  if (typeof r != "string")
    throw new TypeError("Expected substring");
  for (; u !== -1; )
    u === c ? ++h > f && (f = h) : h = 1, c = u + r.length, u = a.indexOf(r, c);
  return f;
}
function lw(n, r) {
  return !!(r.options.fences === !1 && n.value && // If there’s no info…
  !n.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(n.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value));
}
function iw(n) {
  const r = n.options.fence || "`";
  if (r !== "`" && r !== "~")
    throw new Error(
      "Cannot serialize code with `" + r + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return r;
}
function aw(n, r, a, u) {
  const c = iw(a), h = n.value || "", f = c === "`" ? "GraveAccent" : "Tilde";
  if (lw(n, a)) {
    const y = a.enter("codeIndented"), S = a.indentLines(h, rw);
    return y(), S;
  }
  const m = a.createTracker(u), p = c.repeat(Math.max(nw(h, c) + 1, 3)), d = a.enter("codeFenced");
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
`), h && (b += m.move(h + `
`)), b += m.move(p), d(), b;
}
function rw(n, r, a) {
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
function uw(n, r, a, u) {
  const c = Yc(a), h = c === '"' ? "Quote" : "Apostrophe", f = a.enter("definition");
  let m = a.enter("label");
  const p = a.createTracker(u);
  let d = p.move("[");
  return d += p.move(
    a.safe(a.associationId(n), {
      before: d,
      after: "]",
      ...p.current()
    })
  ), d += p.move("]: "), m(), // If there’s no url, or…
  !n.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (m = a.enter("destinationLiteral"), d += p.move("<"), d += p.move(
    a.safe(n.url, { before: d, after: ">", ...p.current() })
  ), d += p.move(">")) : (m = a.enter("destinationRaw"), d += p.move(
    a.safe(n.url, {
      before: d,
      after: n.title ? " " : `
`,
      ...p.current()
    })
  )), m(), n.title && (m = a.enter(`title${h}`), d += p.move(" " + c), d += p.move(
    a.safe(n.title, {
      before: d,
      after: c,
      ...p.current()
    })
  ), d += p.move(c), m()), f(), d;
}
function ow(n) {
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
  const u = Oi(n), c = Oi(r);
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
Hg.peek = sw;
function Hg(n, r, a, u) {
  const c = ow(a), h = a.enter("emphasis"), f = a.createTracker(u), m = f.move(c);
  let p = f.move(
    a.containerPhrasing(n, {
      after: c,
      before: m,
      ...f.current()
    })
  );
  const d = p.charCodeAt(0), b = yu(
    u.before.charCodeAt(u.before.length - 1),
    d,
    c
  );
  b.inside && (p = Ba(d) + p.slice(1));
  const y = p.charCodeAt(p.length - 1), S = yu(u.after.charCodeAt(0), y, c);
  S.inside && (p = p.slice(0, -1) + Ba(y));
  const x = f.move(c);
  return h(), a.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: b.outside
  }, m + p + x;
}
function sw(n, r, a) {
  return a.options.emphasis || "*";
}
function cw(n, r) {
  let a = !1;
  return Hc(n, function(u) {
    if ("value" in u && /\r?\n|\r/.test(u.value) || u.type === "break")
      return a = !0, bc;
  }), !!((!n.depth || n.depth < 3) && Mc(n) && (r.options.setext || a));
}
function fw(n, r, a, u) {
  const c = Math.max(Math.min(6, n.depth || 1), 1), h = a.createTracker(u);
  if (cw(n, a)) {
    const b = a.enter("headingSetext"), y = a.enter("phrasing"), S = a.containerPhrasing(n, {
      ...h.current(),
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
  h.move(f + " ");
  let d = a.containerPhrasing(n, {
    before: "# ",
    after: `
`,
    ...h.current()
  });
  return /^[\t ]/.test(d) && (d = Ba(d.charCodeAt(0)) + d.slice(1)), d = d ? f + " " + d : f, a.options.closeAtx && (d += " " + f), p(), m(), d;
}
qg.peek = hw;
function qg(n) {
  return n.value || "";
}
function hw() {
  return "<";
}
Yg.peek = dw;
function Yg(n, r, a, u) {
  const c = Yc(a), h = c === '"' ? "Quote" : "Apostrophe", f = a.enter("image");
  let m = a.enter("label");
  const p = a.createTracker(u);
  let d = p.move("![");
  return d += p.move(
    a.safe(n.alt, { before: d, after: "]", ...p.current() })
  ), d += p.move("]("), m(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (m = a.enter("destinationLiteral"), d += p.move("<"), d += p.move(
    a.safe(n.url, { before: d, after: ">", ...p.current() })
  ), d += p.move(">")) : (m = a.enter("destinationRaw"), d += p.move(
    a.safe(n.url, {
      before: d,
      after: n.title ? " " : ")",
      ...p.current()
    })
  )), m(), n.title && (m = a.enter(`title${h}`), d += p.move(" " + c), d += p.move(
    a.safe(n.title, {
      before: d,
      after: c,
      ...p.current()
    })
  ), d += p.move(c), m()), d += p.move(")"), f(), d;
}
function dw() {
  return "!";
}
Gg.peek = mw;
function Gg(n, r, a, u) {
  const c = n.referenceType, h = a.enter("imageReference");
  let f = a.enter("label");
  const m = a.createTracker(u);
  let p = m.move("![");
  const d = a.safe(n.alt, {
    before: p,
    after: "]",
    ...m.current()
  });
  p += m.move(d + "]["), f();
  const b = a.stack;
  a.stack = [], f = a.enter("reference");
  const y = a.safe(a.associationId(n), {
    before: p,
    after: "]",
    ...m.current()
  });
  return f(), a.stack = b, h(), c === "full" || !d || d !== y ? p += m.move(y + "]") : c === "shortcut" ? p = p.slice(0, -1) : p += m.move("]"), p;
}
function mw() {
  return "!";
}
Vg.peek = pw;
function Vg(n, r, a) {
  let u = n.value || "", c = "`", h = -1;
  for (; new RegExp("(^|[^`])" + c + "([^`]|$)").test(u); )
    c += "`";
  for (/[^ \r\n]/.test(u) && (/^[ \r\n]/.test(u) && /[ \r\n]$/.test(u) || /^`|`$/.test(u)) && (u = " " + u + " "); ++h < a.unsafe.length; ) {
    const f = a.unsafe[h], m = a.compilePattern(f);
    let p;
    if (f.atBreak)
      for (; p = m.exec(u); ) {
        let d = p.index;
        u.charCodeAt(d) === 10 && u.charCodeAt(d - 1) === 13 && d--, u = u.slice(0, d) + " " + u.slice(p.index + 1);
      }
  }
  return c + u + c;
}
function pw() {
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
Qg.peek = gw;
function Qg(n, r, a, u) {
  const c = Yc(a), h = c === '"' ? "Quote" : "Apostrophe", f = a.createTracker(u);
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
  let d = f.move("[");
  return d += f.move(
    a.containerPhrasing(n, {
      before: d,
      after: "](",
      ...f.current()
    })
  ), d += f.move("]("), p(), // If there’s no url but there is a title…
  !n.url && n.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(n.url) ? (p = a.enter("destinationLiteral"), d += f.move("<"), d += f.move(
    a.safe(n.url, { before: d, after: ">", ...f.current() })
  ), d += f.move(">")) : (p = a.enter("destinationRaw"), d += f.move(
    a.safe(n.url, {
      before: d,
      after: n.title ? " " : ")",
      ...f.current()
    })
  )), p(), n.title && (p = a.enter(`title${h}`), d += f.move(" " + c), d += f.move(
    a.safe(n.title, {
      before: d,
      after: c,
      ...f.current()
    })
  ), d += f.move(c), p()), d += f.move(")"), m(), d;
}
function gw(n, r, a) {
  return Xg(n, a) ? "<" : "[";
}
Zg.peek = yw;
function Zg(n, r, a, u) {
  const c = n.referenceType, h = a.enter("linkReference");
  let f = a.enter("label");
  const m = a.createTracker(u);
  let p = m.move("[");
  const d = a.containerPhrasing(n, {
    before: p,
    after: "]",
    ...m.current()
  });
  p += m.move(d + "]["), f();
  const b = a.stack;
  a.stack = [], f = a.enter("reference");
  const y = a.safe(a.associationId(n), {
    before: p,
    after: "]",
    ...m.current()
  });
  return f(), a.stack = b, h(), c === "full" || !d || d !== y ? p += m.move(y + "]") : c === "shortcut" ? p = p.slice(0, -1) : p += m.move("]"), p;
}
function yw() {
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
function bw(n) {
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
function vw(n) {
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
function xw(n, r, a, u) {
  const c = a.enter("list"), h = a.bulletCurrent;
  let f = n.ordered ? vw(a) : Gc(a);
  const m = n.ordered ? f === "." ? ")" : "." : bw(a);
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
  const d = a.containerFlow(n, u);
  return a.bulletLastUsed = f, a.bulletCurrent = h, c(), d;
}
function Sw(n) {
  const r = n.options.listItemIndent || "one";
  if (r !== "tab" && r !== "one" && r !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + r + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return r;
}
function kw(n, r, a, u) {
  const c = Sw(a);
  let h = a.bulletCurrent || Gc(a);
  r && r.type === "list" && r.ordered && (h = (typeof r.start == "number" && r.start > -1 ? r.start : 1) + (a.options.incrementListMarker === !1 ? 0 : r.children.indexOf(n)) + h);
  let f = h.length + 1;
  (c === "tab" || c === "mixed" && (r && r.type === "list" && r.spread || n.spread)) && (f = Math.ceil(f / 4) * 4);
  const m = a.createTracker(u);
  m.move(h + " ".repeat(f - h.length)), m.shift(f);
  const p = a.enter("listItem"), d = a.indentLines(
    a.containerFlow(n, m.current()),
    b
  );
  return p(), d;
  function b(y, S, x) {
    return S ? (x ? "" : " ".repeat(f)) + y : (x ? h : h + " ".repeat(f - h.length)) + y;
  }
}
function ww(n, r, a, u) {
  const c = a.enter("paragraph"), h = a.enter("phrasing"), f = a.containerPhrasing(n, u);
  return h(), c(), f;
}
const Ew = (
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
function zw(n, r, a, u) {
  return (n.children.some(function(f) {
    return Ew(f);
  }) ? a.containerPhrasing : a.containerFlow).call(a, n, u);
}
function Tw(n) {
  const r = n.options.strong || "*";
  if (r !== "*" && r !== "_")
    throw new Error(
      "Cannot serialize strong with `" + r + "` for `options.strong`, expected `*`, or `_`"
    );
  return r;
}
Fg.peek = Aw;
function Fg(n, r, a, u) {
  const c = Tw(a), h = a.enter("strong"), f = a.createTracker(u), m = f.move(c + c);
  let p = f.move(
    a.containerPhrasing(n, {
      after: c,
      before: m,
      ...f.current()
    })
  );
  const d = p.charCodeAt(0), b = yu(
    u.before.charCodeAt(u.before.length - 1),
    d,
    c
  );
  b.inside && (p = Ba(d) + p.slice(1));
  const y = p.charCodeAt(p.length - 1), S = yu(u.after.charCodeAt(0), y, c);
  S.inside && (p = p.slice(0, -1) + Ba(y));
  const x = f.move(c + c);
  return h(), a.attentionEncodeSurroundingInfo = {
    after: S.outside,
    before: b.outside
  }, m + p + x;
}
function Aw(n, r, a) {
  return a.options.strong || "*";
}
function Cw(n, r, a, u) {
  return a.safe(n.value, u);
}
function _w(n) {
  const r = n.options.ruleRepetition || 3;
  if (r < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + r + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return r;
}
function Dw(n, r, a) {
  const u = (Kg(a) + (a.options.ruleSpaces ? " " : "")).repeat(_w(a));
  return a.options.ruleSpaces ? u.slice(0, -1) : u;
}
const Jg = {
  blockquote: Pk,
  break: Hp,
  code: aw,
  definition: uw,
  emphasis: Hg,
  hardBreak: Hp,
  heading: fw,
  html: qg,
  image: Yg,
  imageReference: Gg,
  inlineCode: Vg,
  link: Qg,
  linkReference: Zg,
  list: xw,
  listItem: kw,
  paragraph: ww,
  root: zw,
  strong: Fg,
  text: Cw,
  thematicBreak: Dw
};
function Ow() {
  return {
    enter: {
      table: Mw,
      tableData: qp,
      tableHeader: qp,
      tableRow: Rw
    },
    exit: {
      codeText: jw,
      table: Nw,
      tableData: oc,
      tableHeader: oc,
      tableRow: oc
    }
  };
}
function Mw(n) {
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
function Nw(n) {
  this.exit(n), this.data.inTable = void 0;
}
function Rw(n) {
  this.enter({ type: "tableRow", children: [] }, n);
}
function oc(n) {
  this.exit(n);
}
function qp(n) {
  this.enter({ type: "tableCell", children: [] }, n);
}
function jw(n) {
  let r = this.resume();
  this.data.inTable && (r = r.replace(/\\([\\|])/g, Lw));
  const a = this.stack[this.stack.length - 1];
  a.type, a.value = r, this.exit(n);
}
function Lw(n, r) {
  return r === "|" ? r : n;
}
function Uw(n) {
  const r = n || {}, a = r.tableCellPadding, u = r.tablePipeAlign, c = r.stringLength, h = a ? " " : "|";
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
  function f(x, A, L, Y) {
    return d(b(x, L, Y), x.align);
  }
  function m(x, A, L, Y) {
    const D = y(x, L, Y), Z = d([D]);
    return Z.slice(0, Z.indexOf(`
`));
  }
  function p(x, A, L, Y) {
    const D = L.enter("tableCell"), Z = L.enter("phrasing"), X = L.containerPhrasing(x, {
      ...Y,
      before: h,
      after: h
    });
    return Z(), D(), X;
  }
  function d(x, A) {
    return $k(x, {
      align: A,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: u,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: a,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: c
    });
  }
  function b(x, A, L) {
    const Y = x.children;
    let D = -1;
    const Z = [], X = A.enter("table");
    for (; ++D < Y.length; )
      Z[D] = y(Y[D], A, L);
    return X(), Z;
  }
  function y(x, A, L) {
    const Y = x.children;
    let D = -1;
    const Z = [], X = A.enter("tableRow");
    for (; ++D < Y.length; )
      Z[D] = p(Y[D], x, A, L);
    return X(), Z;
  }
  function S(x, A, L) {
    let Y = Jg.inlineCode(x, A, L);
    return L.stack.includes("tableCell") && (Y = Y.replace(/\|/g, "\\$&")), Y;
  }
}
function Bw() {
  return {
    exit: {
      taskListCheckValueChecked: Yp,
      taskListCheckValueUnchecked: Yp,
      paragraph: qw
    }
  };
}
function Hw() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: Yw }
  };
}
function Yp(n) {
  const r = this.stack[this.stack.length - 2];
  r.type, r.checked = n.type === "taskListCheckValueChecked";
}
function qw(n) {
  const r = this.stack[this.stack.length - 2];
  if (r && r.type === "listItem" && typeof r.checked == "boolean") {
    const a = this.stack[this.stack.length - 1];
    a.type;
    const u = a.children[0];
    if (u && u.type === "text") {
      const c = r.children;
      let h = -1, f;
      for (; ++h < c.length; ) {
        const m = c[h];
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
function Yw(n, r, a, u) {
  const c = n.children[0], h = typeof n.checked == "boolean" && c && c.type === "paragraph", f = "[" + (n.checked ? "x" : " ") + "] ", m = a.createTracker(u);
  h && m.move(f);
  let p = Jg.listItem(n, r, a, {
    ...u,
    ...m.current()
  });
  return h && (p = p.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, d)), p;
  function d(b) {
    return b + f;
  }
}
function Gw() {
  return [
    xk(),
    Yk(),
    Qk(),
    Ow(),
    Bw()
  ];
}
function Vw(n) {
  return {
    extensions: [
      Sk(),
      Gk(n),
      Zk(),
      Uw(n),
      Hw()
    ]
  };
}
const Xw = {
  tokenize: Iw,
  partial: !0
}, Ig = {
  tokenize: $w,
  partial: !0
}, $g = {
  tokenize: Ww,
  partial: !0
}, Wg = {
  tokenize: Pw,
  partial: !0
}, Qw = {
  tokenize: e2,
  partial: !0
}, Pg = {
  name: "wwwAutolink",
  tokenize: Fw,
  previous: ty
}, ey = {
  name: "protocolAutolink",
  tokenize: Jw,
  previous: ny
}, Bn = {
  name: "emailAutolink",
  tokenize: Kw,
  previous: ly
}, yn = {};
function Zw() {
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
function Kw(n, r, a) {
  const u = this;
  let c, h;
  return f;
  function f(y) {
    return !kc(y) || !ly.call(u, u.previous) || Vc(u.events) ? a(y) : (n.enter("literalAutolink"), n.enter("literalAutolinkEmail"), m(y));
  }
  function m(y) {
    return kc(y) ? (n.consume(y), m) : y === 64 ? (n.consume(y), p) : a(y);
  }
  function p(y) {
    return y === 46 ? n.check(Qw, b, d)(y) : y === 45 || y === 95 || yt(y) ? (h = !0, n.consume(y), p) : b(y);
  }
  function d(y) {
    return n.consume(y), c = !0, p;
  }
  function b(y) {
    return h && c && wt(u.previous) ? (n.exit("literalAutolinkEmail"), n.exit("literalAutolink"), r(y)) : a(y);
  }
}
function Fw(n, r, a) {
  const u = this;
  return c;
  function c(f) {
    return f !== 87 && f !== 119 || !ty.call(u, u.previous) || Vc(u.events) ? a(f) : (n.enter("literalAutolink"), n.enter("literalAutolinkWww"), n.check(Xw, n.attempt(Ig, n.attempt($g, h), a), a)(f));
  }
  function h(f) {
    return n.exit("literalAutolinkWww"), n.exit("literalAutolink"), r(f);
  }
}
function Jw(n, r, a) {
  const u = this;
  let c = "", h = !1;
  return f;
  function f(y) {
    return (y === 72 || y === 104) && ny.call(u, u.previous) && !Vc(u.events) ? (n.enter("literalAutolink"), n.enter("literalAutolinkHttp"), c += String.fromCodePoint(y), n.consume(y), m) : a(y);
  }
  function m(y) {
    if (wt(y) && c.length < 5)
      return c += String.fromCodePoint(y), n.consume(y), m;
    if (y === 58) {
      const S = c.toLowerCase();
      if (S === "http" || S === "https")
        return n.consume(y), p;
    }
    return a(y);
  }
  function p(y) {
    return y === 47 ? (n.consume(y), h ? d : (h = !0, p)) : a(y);
  }
  function d(y) {
    return y === null || mu(y) || Ke(y) || Bl(y) || vu(y) ? a(y) : n.attempt(Ig, n.attempt($g, b), a)(y);
  }
  function b(y) {
    return n.exit("literalAutolinkHttp"), n.exit("literalAutolink"), r(y);
  }
}
function Iw(n, r, a) {
  let u = 0;
  return c;
  function c(f) {
    return (f === 87 || f === 119) && u < 3 ? (u++, n.consume(f), c) : f === 46 && u === 3 ? (n.consume(f), h) : a(f);
  }
  function h(f) {
    return f === null ? a(f) : r(f);
  }
}
function $w(n, r, a) {
  let u, c, h;
  return f;
  function f(d) {
    return d === 46 || d === 95 ? n.check(Wg, p, m)(d) : d === null || Ke(d) || Bl(d) || d !== 45 && vu(d) ? p(d) : (h = !0, n.consume(d), f);
  }
  function m(d) {
    return d === 95 ? u = !0 : (c = u, u = void 0), n.consume(d), f;
  }
  function p(d) {
    return c || u || !h ? a(d) : r(d);
  }
}
function Ww(n, r) {
  let a = 0, u = 0;
  return c;
  function c(f) {
    return f === 40 ? (a++, n.consume(f), c) : f === 41 && u < a ? h(f) : f === 33 || f === 34 || f === 38 || f === 39 || f === 41 || f === 42 || f === 44 || f === 46 || f === 58 || f === 59 || f === 60 || f === 63 || f === 93 || f === 95 || f === 126 ? n.check(Wg, r, h)(f) : f === null || Ke(f) || Bl(f) ? r(f) : (n.consume(f), c);
  }
  function h(f) {
    return f === 41 && u++, n.consume(f), c;
  }
}
function Pw(n, r, a) {
  return u;
  function u(m) {
    return m === 33 || m === 34 || m === 39 || m === 41 || m === 42 || m === 44 || m === 46 || m === 58 || m === 59 || m === 63 || m === 95 || m === 126 ? (n.consume(m), u) : m === 38 ? (n.consume(m), h) : m === 93 ? (n.consume(m), c) : (
      // `<` is an end.
      m === 60 || // So is whitespace.
      m === null || Ke(m) || Bl(m) ? r(m) : a(m)
    );
  }
  function c(m) {
    return m === null || m === 40 || m === 91 || Ke(m) || Bl(m) ? r(m) : u(m);
  }
  function h(m) {
    return wt(m) ? f(m) : a(m);
  }
  function f(m) {
    return m === 59 ? (n.consume(m), u) : wt(m) ? (n.consume(m), f) : a(m);
  }
}
function e2(n, r, a) {
  return u;
  function u(h) {
    return n.consume(h), c;
  }
  function c(h) {
    return yt(h) ? a(h) : r(h);
  }
}
function ty(n) {
  return n === null || n === 40 || n === 42 || n === 95 || n === 91 || n === 93 || n === 126 || Ke(n);
}
function ny(n) {
  return !wt(n);
}
function ly(n) {
  return !(n === 47 || kc(n));
}
function kc(n) {
  return n === 43 || n === 45 || n === 46 || n === 95 || yt(n);
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
const t2 = {
  tokenize: s2,
  partial: !0
};
function n2() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: r2,
        continuation: {
          tokenize: u2
        },
        exit: o2
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: a2
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: l2,
        resolveTo: i2
      }
    }
  };
}
function l2(n, r, a) {
  const u = this;
  let c = u.events.length;
  const h = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
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
    const d = sn(u.sliceSerialize({
      start: f.end,
      end: u.now()
    }));
    return d.codePointAt(0) !== 94 || !h.includes(d.slice(1)) ? a(p) : (n.enter("gfmFootnoteCallLabelMarker"), n.consume(p), n.exit("gfmFootnoteCallLabelMarker"), r(p));
  }
}
function i2(n, r) {
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
  const h = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, c.end),
    end: Object.assign({}, n[n.length - 1][1].start)
  }, f = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, h.start),
    end: Object.assign({}, h.end)
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
    ["enter", h, r],
    ["enter", f, r],
    ["exit", f, r],
    ["exit", h, r],
    // The ending (`]`, properly parsed and labelled).
    n[n.length - 2],
    n[n.length - 1],
    ["exit", u, r]
  ];
  return n.splice(a, n.length - a + 1, ...m), n;
}
function a2(n, r, a) {
  const u = this, c = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let h = 0, f;
  return m;
  function m(y) {
    return n.enter("gfmFootnoteCall"), n.enter("gfmFootnoteCallLabelMarker"), n.consume(y), n.exit("gfmFootnoteCallLabelMarker"), p;
  }
  function p(y) {
    return y !== 94 ? a(y) : (n.enter("gfmFootnoteCallMarker"), n.consume(y), n.exit("gfmFootnoteCallMarker"), n.enter("gfmFootnoteCallString"), n.enter("chunkString").contentType = "string", d);
  }
  function d(y) {
    if (
      // Too long.
      h > 999 || // Closing brace with nothing.
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
    return Ke(y) || (f = !0), h++, n.consume(y), y === 92 ? b : d;
  }
  function b(y) {
    return y === 91 || y === 92 || y === 93 ? (n.consume(y), h++, d) : d(y);
  }
}
function r2(n, r, a) {
  const u = this, c = u.parser.gfmFootnotes || (u.parser.gfmFootnotes = []);
  let h, f = 0, m;
  return p;
  function p(A) {
    return n.enter("gfmFootnoteDefinition")._container = !0, n.enter("gfmFootnoteDefinitionLabel"), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(A), n.exit("gfmFootnoteDefinitionLabelMarker"), d;
  }
  function d(A) {
    return A === 94 ? (n.enter("gfmFootnoteDefinitionMarker"), n.consume(A), n.exit("gfmFootnoteDefinitionMarker"), n.enter("gfmFootnoteDefinitionLabelString"), n.enter("chunkString").contentType = "string", b) : a(A);
  }
  function b(A) {
    if (
      // Too long.
      f > 999 || // Closing brace with nothing.
      A === 93 && !m || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      A === null || A === 91 || Ke(A)
    )
      return a(A);
    if (A === 93) {
      n.exit("chunkString");
      const L = n.exit("gfmFootnoteDefinitionLabelString");
      return h = sn(u.sliceSerialize(L)), n.enter("gfmFootnoteDefinitionLabelMarker"), n.consume(A), n.exit("gfmFootnoteDefinitionLabelMarker"), n.exit("gfmFootnoteDefinitionLabel"), S;
    }
    return Ke(A) || (m = !0), f++, n.consume(A), A === 92 ? y : b;
  }
  function y(A) {
    return A === 91 || A === 92 || A === 93 ? (n.consume(A), f++, b) : b(A);
  }
  function S(A) {
    return A === 58 ? (n.enter("definitionMarker"), n.consume(A), n.exit("definitionMarker"), c.includes(h) || c.push(h), Ne(n, x, "gfmFootnoteDefinitionWhitespace")) : a(A);
  }
  function x(A) {
    return r(A);
  }
}
function u2(n, r, a) {
  return n.check(qa, r, n.attempt(t2, r, a));
}
function o2(n) {
  n.exit("gfmFootnoteDefinition");
}
function s2(n, r, a) {
  const u = this;
  return Ne(n, c, "gfmFootnoteDefinitionIndent", 5);
  function c(h) {
    const f = u.events[u.events.length - 1];
    return f && f[1].type === "gfmFootnoteDefinitionIndent" && f[2].sliceSerialize(f[1], !0).length === 4 ? r(h) : a(h);
  }
}
function c2(n) {
  let a = (n || {}).singleTilde;
  const u = {
    name: "strikethrough",
    tokenize: h,
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
        let d = p;
        for (; d--; )
          if (f[d][0] === "exit" && f[d][1].type === "strikethroughSequenceTemporary" && f[d][1]._open && // If the sizes are the same:
          f[p][1].end.offset - f[p][1].start.offset === f[d][1].end.offset - f[d][1].start.offset) {
            f[p][1].type = "strikethroughSequence", f[d][1].type = "strikethroughSequence";
            const b = {
              type: "strikethrough",
              start: Object.assign({}, f[d][1].start),
              end: Object.assign({}, f[p][1].end)
            }, y = {
              type: "strikethroughText",
              start: Object.assign({}, f[d][1].end),
              end: Object.assign({}, f[p][1].start)
            }, S = [["enter", b, m], ["enter", f[d][1], m], ["exit", f[d][1], m], ["enter", y, m]], x = m.parser.constructs.insideSpan.null;
            x && Zt(S, S.length, 0, xu(x, f.slice(d + 1, p), m)), Zt(S, S.length, 0, [["exit", y, m], ["enter", f[p][1], m], ["exit", f[p][1], m], ["exit", b, m]]), Zt(f, d - 1, p - d + 3, S), p = d + S.length - 2;
            break;
          }
      }
    for (p = -1; ++p < f.length; )
      f[p][1].type === "strikethroughSequenceTemporary" && (f[p][1].type = "data");
    return f;
  }
  function h(f, m, p) {
    const d = this.previous, b = this.events;
    let y = 0;
    return S;
    function S(A) {
      return d === 126 && b[b.length - 1][1].type !== "characterEscape" ? p(A) : (f.enter("strikethroughSequenceTemporary"), x(A));
    }
    function x(A) {
      const L = Oi(d);
      if (A === 126)
        return y > 1 ? p(A) : (f.consume(A), y++, x);
      if (y < 2 && !a) return p(A);
      const Y = f.exit("strikethroughSequenceTemporary"), D = Oi(A);
      return Y._open = !D || D === 2 && !!L, Y._close = !L || L === 2 && !!D, m(A);
    }
  }
}
class f2 {
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
    h2(this, r, a, u);
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
    if (this.map.sort(function(h, f) {
      return h[0] - f[0];
    }), this.map.length === 0)
      return;
    let a = this.map.length;
    const u = [];
    for (; a > 0; )
      a -= 1, u.push(r.slice(this.map[a][0] + this.map[a][1]), this.map[a][2]), r.length = this.map[a][0];
    u.push(r.slice()), r.length = 0;
    let c = u.pop();
    for (; c; ) {
      for (const h of c)
        r.push(h);
      c = u.pop();
    }
    this.map.length = 0;
  }
}
function h2(n, r, a, u) {
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
function d2(n, r) {
  let a = !1;
  const u = [];
  for (; r < n.length; ) {
    const c = n[r];
    if (a) {
      if (c[0] === "enter")
        c[1].type === "tableContent" && u.push(n[r + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (c[1].type === "tableContent") {
        if (n[r - 1][1].type === "tableDelimiterMarker") {
          const h = u.length - 1;
          u[h] = u[h] === "left" ? "center" : "right";
        }
      } else if (c[1].type === "tableDelimiterRow")
        break;
    } else c[0] === "enter" && c[1].type === "tableDelimiterRow" && (a = !0);
    r += 1;
  }
  return u;
}
function m2() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: p2,
        resolveAll: g2
      }
    }
  };
}
function p2(n, r, a) {
  const u = this;
  let c = 0, h = 0, f;
  return m;
  function m(R) {
    let te = u.events.length - 1;
    for (; te > -1; ) {
      const re = u.events[te][1].type;
      if (re === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      re === "linePrefix") te--;
      else break;
    }
    const ee = te > -1 ? u.events[te][1].type : null, Ee = ee === "tableHead" || ee === "tableRow" ? U : p;
    return Ee === U && u.parser.lazy[u.now().line] ? a(R) : Ee(R);
  }
  function p(R) {
    return n.enter("tableHead"), n.enter("tableRow"), d(R);
  }
  function d(R) {
    return R === 124 || (f = !0, h += 1), b(R);
  }
  function b(R) {
    return R === null ? a(R) : me(R) ? h > 1 ? (h = 0, u.interrupt = !0, n.exit("tableRow"), n.enter("lineEnding"), n.consume(R), n.exit("lineEnding"), x) : a(R) : _e(R) ? Ne(n, b, "whitespace")(R) : (h += 1, f && (f = !1, c += 1), R === 124 ? (n.enter("tableCellDivider"), n.consume(R), n.exit("tableCellDivider"), f = !0, b) : (n.enter("data"), y(R)));
  }
  function y(R) {
    return R === null || R === 124 || Ke(R) ? (n.exit("data"), b(R)) : (n.consume(R), R === 92 ? S : y);
  }
  function S(R) {
    return R === 92 || R === 124 ? (n.consume(R), y) : y(R);
  }
  function x(R) {
    return u.interrupt = !1, u.parser.lazy[u.now().line] ? a(R) : (n.enter("tableDelimiterRow"), f = !1, _e(R) ? Ne(n, A, "linePrefix", u.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(R) : A(R));
  }
  function A(R) {
    return R === 45 || R === 58 ? Y(R) : R === 124 ? (f = !0, n.enter("tableCellDivider"), n.consume(R), n.exit("tableCellDivider"), L) : fe(R);
  }
  function L(R) {
    return _e(R) ? Ne(n, Y, "whitespace")(R) : Y(R);
  }
  function Y(R) {
    return R === 58 ? (h += 1, f = !0, n.enter("tableDelimiterMarker"), n.consume(R), n.exit("tableDelimiterMarker"), D) : R === 45 ? (h += 1, D(R)) : R === null || me(R) ? se(R) : fe(R);
  }
  function D(R) {
    return R === 45 ? (n.enter("tableDelimiterFiller"), Z(R)) : fe(R);
  }
  function Z(R) {
    return R === 45 ? (n.consume(R), Z) : R === 58 ? (f = !0, n.exit("tableDelimiterFiller"), n.enter("tableDelimiterMarker"), n.consume(R), n.exit("tableDelimiterMarker"), X) : (n.exit("tableDelimiterFiller"), X(R));
  }
  function X(R) {
    return _e(R) ? Ne(n, se, "whitespace")(R) : se(R);
  }
  function se(R) {
    return R === 124 ? A(R) : R === null || me(R) ? !f || c !== h ? fe(R) : (n.exit("tableDelimiterRow"), n.exit("tableHead"), r(R)) : fe(R);
  }
  function fe(R) {
    return a(R);
  }
  function U(R) {
    return n.enter("tableRow"), $(R);
  }
  function $(R) {
    return R === 124 ? (n.enter("tableCellDivider"), n.consume(R), n.exit("tableCellDivider"), $) : R === null || me(R) ? (n.exit("tableRow"), r(R)) : _e(R) ? Ne(n, $, "whitespace")(R) : (n.enter("data"), K(R));
  }
  function K(R) {
    return R === null || R === 124 || Ke(R) ? (n.exit("data"), $(R)) : (n.consume(R), R === 92 ? he : K);
  }
  function he(R) {
    return R === 92 || R === 124 ? (n.consume(R), K) : K(R);
  }
}
function g2(n, r) {
  let a = -1, u = !0, c = 0, h = [0, 0, 0, 0], f = [0, 0, 0, 0], m = !1, p = 0, d, b, y;
  const S = new f2();
  for (; ++a < n.length; ) {
    const x = n[a], A = x[1];
    x[0] === "enter" ? A.type === "tableHead" ? (m = !1, p !== 0 && (Gp(S, r, p, d, b), b = void 0, p = 0), d = {
      type: "table",
      start: Object.assign({}, A.start),
      // Note: correct end is set later.
      end: Object.assign({}, A.end)
    }, S.add(a, 0, [["enter", d, r]])) : A.type === "tableRow" || A.type === "tableDelimiterRow" ? (u = !0, y = void 0, h = [0, 0, 0, 0], f = [0, a + 1, 0, 0], m && (m = !1, b = {
      type: "tableBody",
      start: Object.assign({}, A.start),
      // Note: correct end is set later.
      end: Object.assign({}, A.end)
    }, S.add(a, 0, [["enter", b, r]])), c = A.type === "tableDelimiterRow" ? 2 : b ? 3 : 1) : c && (A.type === "data" || A.type === "tableDelimiterMarker" || A.type === "tableDelimiterFiller") ? (u = !1, f[2] === 0 && (h[1] !== 0 && (f[0] = f[1], y = su(S, r, h, c, void 0, y), h = [0, 0, 0, 0]), f[2] = a)) : A.type === "tableCellDivider" && (u ? u = !1 : (h[1] !== 0 && (f[0] = f[1], y = su(S, r, h, c, void 0, y)), h = f, f = [h[1], a, 0, 0])) : A.type === "tableHead" ? (m = !0, p = a) : A.type === "tableRow" || A.type === "tableDelimiterRow" ? (p = a, h[1] !== 0 ? (f[0] = f[1], y = su(S, r, h, c, a, y)) : f[1] !== 0 && (y = su(S, r, f, c, a, y)), c = 0) : c && (A.type === "data" || A.type === "tableDelimiterMarker" || A.type === "tableDelimiterFiller") && (f[3] = a);
  }
  for (p !== 0 && Gp(S, r, p, d, b), S.consume(r.events), a = -1; ++a < r.events.length; ) {
    const x = r.events[a];
    x[0] === "enter" && x[1].type === "table" && (x[1]._align = d2(r.events, a));
  }
  return n;
}
function su(n, r, a, u, c, h) {
  const f = u === 1 ? "tableHeader" : u === 2 ? "tableDelimiter" : "tableData", m = "tableContent";
  a[0] !== 0 && (h.end = Object.assign({}, Di(r.events, a[0])), n.add(a[0], 0, [["exit", h, r]]));
  const p = Di(r.events, a[1]);
  if (h = {
    type: f,
    start: Object.assign({}, p),
    // Note: correct end is set later.
    end: Object.assign({}, p)
  }, n.add(a[1], 0, [["enter", h, r]]), a[2] !== 0) {
    const d = Di(r.events, a[2]), b = Di(r.events, a[3]), y = {
      type: m,
      start: Object.assign({}, d),
      end: Object.assign({}, b)
    };
    if (n.add(a[2], 0, [["enter", y, r]]), u !== 2) {
      const S = r.events[a[2]], x = r.events[a[3]];
      if (S[1].end = Object.assign({}, x[1].end), S[1].type = "chunkText", S[1].contentType = "text", a[3] > a[2] + 1) {
        const A = a[2] + 1, L = a[3] - a[2] - 1;
        n.add(A, L, []);
      }
    }
    n.add(a[3] + 1, 0, [["exit", y, r]]);
  }
  return c !== void 0 && (h.end = Object.assign({}, Di(r.events, c)), n.add(c, 0, [["exit", h, r]]), h = void 0), h;
}
function Gp(n, r, a, u, c) {
  const h = [], f = Di(r.events, a);
  c && (c.end = Object.assign({}, f), h.push(["exit", c, r])), u.end = Object.assign({}, f), h.push(["exit", u, r]), n.add(a + 1, 0, h);
}
function Di(n, r) {
  const a = n[r], u = a[0] === "enter" ? "start" : "end";
  return a[1][u];
}
const y2 = {
  name: "tasklistCheck",
  tokenize: v2
};
function b2() {
  return {
    text: {
      91: y2
    }
  };
}
function v2(n, r, a) {
  const u = this;
  return c;
  function c(p) {
    return (
      // Exit if there’s stuff before.
      u.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !u._gfmTasklistFirstContentOfListItem ? a(p) : (n.enter("taskListCheck"), n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), h)
    );
  }
  function h(p) {
    return Ke(p) ? (n.enter("taskListCheckValueUnchecked"), n.consume(p), n.exit("taskListCheckValueUnchecked"), f) : p === 88 || p === 120 ? (n.enter("taskListCheckValueChecked"), n.consume(p), n.exit("taskListCheckValueChecked"), f) : a(p);
  }
  function f(p) {
    return p === 93 ? (n.enter("taskListCheckMarker"), n.consume(p), n.exit("taskListCheckMarker"), n.exit("taskListCheck"), m) : a(p);
  }
  function m(p) {
    return me(p) ? r(p) : _e(p) ? n.check({
      tokenize: x2
    }, r, a)(p) : a(p);
  }
}
function x2(n, r, a) {
  return Ne(n, u, "whitespace");
  function u(c) {
    return c === null ? a(c) : r(c);
  }
}
function S2(n) {
  return dg([
    Zw(),
    n2(),
    c2(n),
    m2(),
    b2()
  ]);
}
const k2 = {};
function w2(n) {
  const r = (
    /** @type {Processor<Root>} */
    this
  ), a = n || k2, u = r.data(), c = u.micromarkExtensions || (u.micromarkExtensions = []), h = u.fromMarkdownExtensions || (u.fromMarkdownExtensions = []), f = u.toMarkdownExtensions || (u.toMarkdownExtensions = []);
  c.push(S2(a)), h.push(Gw()), f.push(Vw(a));
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
function E2() {
  for (var n, r, a = 0, u = "", c = arguments.length; a < c; a++) (n = arguments[a]) && (r = iy(n)) && (u && (u += " "), u += r);
  return u;
}
const z2 = (n, r) => {
  const a = new Array(n.length + r.length);
  for (let u = 0; u < n.length; u++)
    a[u] = n[u];
  for (let u = 0; u < r.length; u++)
    a[n.length + u] = r[u];
  return a;
}, T2 = (n, r) => ({
  classGroupId: n,
  validator: r
}), ay = (n = /* @__PURE__ */ new Map(), r = null, a) => ({
  nextPart: n,
  validators: r,
  classGroupId: a
}), bu = "-", Vp = [], A2 = "arbitrary..", C2 = (n) => {
  const r = D2(n), {
    conflictingClassGroups: a,
    conflictingClassGroupModifiers: u
  } = n;
  return {
    getClassGroupId: (f) => {
      if (f.startsWith("[") && f.endsWith("]"))
        return _2(f);
      const m = f.split(bu), p = m[0] === "" && m.length > 1 ? 1 : 0;
      return ry(m, p, r);
    },
    getConflictingClassGroupIds: (f, m) => {
      if (m) {
        const p = u[f], d = a[f];
        return p ? d ? z2(d, p) : p : d || Vp;
      }
      return a[f] || Vp;
    }
  };
}, ry = (n, r, a) => {
  if (n.length - r === 0)
    return a.classGroupId;
  const c = n[r], h = a.nextPart.get(c);
  if (h) {
    const d = ry(n, r + 1, h);
    if (d) return d;
  }
  const f = a.validators;
  if (f === null)
    return;
  const m = r === 0 ? n.join(bu) : n.slice(r).join(bu), p = f.length;
  for (let d = 0; d < p; d++) {
    const b = f[d];
    if (b.validator(m))
      return b.classGroupId;
  }
}, _2 = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const r = n.slice(1, -1), a = r.indexOf(":"), u = r.slice(0, a);
  return u ? A2 + u : void 0;
})(), D2 = (n) => {
  const {
    theme: r,
    classGroups: a
  } = n;
  return O2(a, r);
}, O2 = (n, r) => {
  const a = ay();
  for (const u in n) {
    const c = n[u];
    Xc(c, a, u, r);
  }
  return a;
}, Xc = (n, r, a, u) => {
  const c = n.length;
  for (let h = 0; h < c; h++) {
    const f = n[h];
    M2(f, r, a, u);
  }
}, M2 = (n, r, a, u) => {
  if (typeof n == "string") {
    N2(n, r, a);
    return;
  }
  if (typeof n == "function") {
    R2(n, r, a, u);
    return;
  }
  j2(n, r, a, u);
}, N2 = (n, r, a) => {
  const u = n === "" ? r : uy(r, n);
  u.classGroupId = a;
}, R2 = (n, r, a, u) => {
  if (L2(n)) {
    Xc(n(u), r, a, u);
    return;
  }
  r.validators === null && (r.validators = []), r.validators.push(T2(a, n));
}, j2 = (n, r, a, u) => {
  const c = Object.entries(n), h = c.length;
  for (let f = 0; f < h; f++) {
    const [m, p] = c[f];
    Xc(p, uy(r, m), a, u);
  }
}, uy = (n, r) => {
  let a = n;
  const u = r.split(bu), c = u.length;
  for (let h = 0; h < c; h++) {
    const f = u[h];
    let m = a.nextPart.get(f);
    m || (m = ay(), a.nextPart.set(f, m)), a = m;
  }
  return a;
}, L2 = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, U2 = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, a = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
  const c = (h, f) => {
    a[h] = f, r++, r > n && (r = 0, u = a, a = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(h) {
      let f = a[h];
      if (f !== void 0)
        return f;
      if ((f = u[h]) !== void 0)
        return c(h, f), f;
    },
    set(h, f) {
      h in a ? a[h] = f : c(h, f);
    }
  };
}, wc = "!", Xp = ":", B2 = [], Qp = (n, r, a, u, c) => ({
  modifiers: n,
  hasImportantModifier: r,
  baseClassName: a,
  maybePostfixModifierPosition: u,
  isExternal: c
}), H2 = (n) => {
  const {
    prefix: r,
    experimentalParseClassName: a
  } = n;
  let u = (c) => {
    const h = [];
    let f = 0, m = 0, p = 0, d;
    const b = c.length;
    for (let L = 0; L < b; L++) {
      const Y = c[L];
      if (f === 0 && m === 0) {
        if (Y === Xp) {
          h.push(c.slice(p, L)), p = L + 1;
          continue;
        }
        if (Y === "/") {
          d = L;
          continue;
        }
      }
      Y === "[" ? f++ : Y === "]" ? f-- : Y === "(" ? m++ : Y === ")" && m--;
    }
    const y = h.length === 0 ? c : c.slice(p);
    let S = y, x = !1;
    y.endsWith(wc) ? (S = y.slice(0, -1), x = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      y.startsWith(wc) && (S = y.slice(1), x = !0)
    );
    const A = d && d > p ? d - p : void 0;
    return Qp(h, x, S, A);
  };
  if (r) {
    const c = r + Xp, h = u;
    u = (f) => f.startsWith(c) ? h(f.slice(c.length)) : Qp(B2, !1, f, void 0, !0);
  }
  if (a) {
    const c = u;
    u = (h) => a({
      className: h,
      parseClassName: c
    });
  }
  return u;
}, q2 = (n) => {
  const r = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((a, u) => {
    r.set(a, 1e6 + u);
  }), (a) => {
    const u = [];
    let c = [];
    for (let h = 0; h < a.length; h++) {
      const f = a[h], m = f[0] === "[", p = r.has(f);
      m || p ? (c.length > 0 && (c.sort(), u.push(...c), c = []), u.push(f)) : c.push(f);
    }
    return c.length > 0 && (c.sort(), u.push(...c)), u;
  };
}, Y2 = (n) => ({
  cache: U2(n.cacheSize),
  parseClassName: H2(n),
  sortModifiers: q2(n),
  postfixLookupClassGroupIds: G2(n),
  ...C2(n)
}), G2 = (n) => {
  const r = /* @__PURE__ */ Object.create(null), a = n.postfixLookupClassGroups;
  if (a)
    for (let u = 0; u < a.length; u++)
      r[a[u]] = !0;
  return r;
}, V2 = /\s+/, X2 = (n, r) => {
  const {
    parseClassName: a,
    getClassGroupId: u,
    getConflictingClassGroupIds: c,
    sortModifiers: h,
    postfixLookupClassGroupIds: f
  } = r, m = [], p = n.trim().split(V2);
  let d = "";
  for (let b = p.length - 1; b >= 0; b -= 1) {
    const y = p[b], {
      isExternal: S,
      modifiers: x,
      hasImportantModifier: A,
      baseClassName: L,
      maybePostfixModifierPosition: Y
    } = a(y);
    if (S) {
      d = y + (d.length > 0 ? " " + d : d);
      continue;
    }
    let D = !!Y, Z;
    if (D) {
      const $ = L.substring(0, Y);
      Z = u($);
      const K = Z && f[Z] ? u(L) : void 0;
      K && K !== Z && (Z = K, D = !1);
    } else
      Z = u(L);
    if (!Z) {
      if (!D) {
        d = y + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (Z = u(L), !Z) {
        d = y + (d.length > 0 ? " " + d : d);
        continue;
      }
      D = !1;
    }
    const X = x.length === 0 ? "" : x.length === 1 ? x[0] : h(x).join(":"), se = A ? X + wc : X, fe = se + Z;
    if (m.indexOf(fe) > -1)
      continue;
    m.push(fe);
    const U = c(Z, D);
    for (let $ = 0; $ < U.length; ++$) {
      const K = U[$];
      m.push(se + K);
    }
    d = y + (d.length > 0 ? " " + d : d);
  }
  return d;
}, Q2 = (...n) => {
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
}, Z2 = (n, ...r) => {
  let a, u, c, h;
  const f = (p) => {
    const d = r.reduce((b, y) => y(b), n());
    return a = Y2(d), u = a.cache.get, c = a.cache.set, h = m, m(p);
  }, m = (p) => {
    const d = u(p);
    if (d)
      return d;
    const b = X2(p, a);
    return c(p, b), b;
  };
  return h = f, (...p) => h(Q2(...p));
}, K2 = [], ot = (n) => {
  const r = (a) => a[n] || K2;
  return r.isThemeGetter = !0, r;
}, sy = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, cy = /^\((?:(\w[\w-]*):)?(.+)\)$/i, F2 = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, J2 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, I2 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, $2 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, W2 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, P2 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, hl = (n) => F2.test(n), ze = (n) => !!n && !Number.isNaN(Number(n)), pn = (n) => !!n && Number.isInteger(Number(n)), sc = (n) => n.endsWith("%") && ze(n.slice(0, -1)), Un = (n) => J2.test(n), fy = () => !0, eE = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  I2.test(n) && !$2.test(n)
), Qc = () => !1, tE = (n) => W2.test(n), nE = (n) => P2.test(n), lE = (n) => !le(n) && !ae(n), iE = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), aE = (n) => ml(n, my, Qc), le = (n) => sy.test(n), jl = (n) => ml(n, py, eE), Zp = (n) => ml(n, dE, ze), rE = (n) => ml(n, yy, fy), uE = (n) => ml(n, gy, Qc), Kp = (n) => ml(n, hy, Qc), oE = (n) => ml(n, dy, nE), cu = (n) => ml(n, by, tE), ae = (n) => cy.test(n), Ma = (n) => ql(n, py), sE = (n) => ql(n, gy), Fp = (n) => ql(n, hy), cE = (n) => ql(n, my), fE = (n) => ql(n, dy), fu = (n) => ql(n, by, !0), hE = (n) => ql(n, yy, !0), ml = (n, r, a) => {
  const u = sy.exec(n);
  return u ? u[1] ? r(u[1]) : a(u[2]) : !1;
}, ql = (n, r, a = !1) => {
  const u = cy.exec(n);
  return u ? u[1] ? r(u[1]) : a : !1;
}, hy = (n) => n === "position" || n === "percentage", dy = (n) => n === "image" || n === "url", my = (n) => n === "length" || n === "size" || n === "bg-size", py = (n) => n === "length", dE = (n) => n === "number", gy = (n) => n === "family-name", yy = (n) => n === "number" || n === "weight", by = (n) => n === "shadow", mE = () => {
  const n = ot("color"), r = ot("font"), a = ot("text"), u = ot("font-weight"), c = ot("tracking"), h = ot("leading"), f = ot("breakpoint"), m = ot("container"), p = ot("spacing"), d = ot("radius"), b = ot("shadow"), y = ot("inset-shadow"), S = ot("text-shadow"), x = ot("drop-shadow"), A = ot("blur"), L = ot("perspective"), Y = ot("aspect"), D = ot("ease"), Z = ot("animate"), X = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], se = () => [
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
  ], fe = () => [...se(), ae, le], U = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", "contain", "none"], K = () => [ae, le, p], he = () => [hl, "full", "auto", ...K()], R = () => [pn, "none", "subgrid", ae, le], te = () => ["auto", {
    span: ["full", pn, ae, le]
  }, pn, ae, le], ee = () => [pn, "auto", ae, le], Ee = () => ["auto", "min", "max", "fr", ae, le], re = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], _ = () => ["auto", ...K()], F = () => [hl, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...K()], oe = () => [hl, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...K()], xe = () => [hl, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...K()], k = () => [n, ae, le], z = () => [...se(), Fp, Kp, {
    position: [ae, le]
  }], q = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], w = () => ["auto", "cover", "contain", cE, aE, {
    size: [ae, le]
  }], P = () => [sc, Ma, jl], ie = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    d,
    ae,
    le
  ], ne = () => ["", ze, Ma, jl], ke = () => ["solid", "dashed", "dotted", "double"], Ve = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ye = () => [ze, sc, Fp, Kp], vt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    A,
    ae,
    le
  ], Et = () => ["none", ze, ae, le], cn = () => ["none", ze, ae, le], Hn = () => [ze, ae, le], zt = () => [hl, "full", ...K()];
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
      font: [lE],
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
        aspect: ["auto", "square", hl, le, ae, Y]
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
      "container-named": [iE],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ze, le, ae, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": X()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": X()
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
        overflow: U()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": U()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": U()
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
        inset: he()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": he()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": he()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": he(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: he()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": he(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: he()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": he()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": he()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: he()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: he()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: he()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: he()
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
        flex: [ze, hl, "auto", "initial", "none", le]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ze, ae, le]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ze, ae, le]
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
        "grid-cols": R()
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
        "grid-rows": R()
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
        justify: [...re(), "normal"]
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
        content: ["normal", ...re()]
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
        "place-content": re()
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
        m: _()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: _()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: _()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: _()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: _()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: _()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: _()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: _()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: _()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: _()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: _()
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
        inline: ["auto", ...oe()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...oe()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...oe()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...xe()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...xe()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...xe()]
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
        font: [u, hE, rE]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", sc, le]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [sE, uE, r]
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
        tracking: [c, ae, le]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ze, "none", ae, Zp]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          h,
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
        decoration: [...ke(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ze, "from-font", "auto", ae, jl]
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
        "underline-offset": [ze, "auto", ae, le]
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
        bg: z()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: q()
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
        }, fE, oE]
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
        "outline-offset": [ze, ae, le]
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
        opacity: [ze, ae, le]
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
        "mask-radial": [ae, le]
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
        "mask-radial-at": se()
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
        mask: q()
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
        blur: vt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ze, ae, le]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ze, ae, le]
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
          x,
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
        grayscale: ["", ze, ae, le]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ze, ae, le]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ze, ae, le]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ze, ae, le]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ze, ae, le]
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
        "backdrop-blur": vt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ze, ae, le]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ze, ae, le]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ze, ae, le]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ze, ae, le]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ze, ae, le]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ze, ae, le]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ze, ae, le]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ze, ae, le]
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
        duration: [ze, "initial", ae, le]
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
        delay: [ze, ae, le]
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
        perspective: [L, ae, le]
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
        rotate: Et()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Et()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Et()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Et()
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
        translate: zt()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": zt()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": zt()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": zt()
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
        stroke: [ze, Ma, jl, Zp]
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
}, pE = /* @__PURE__ */ Z2(mE);
function pl(...n) {
  return pE(E2(n));
}
function Jp(n) {
  return n.trim().toLowerCase().replace(/[\s-]+/g, "_");
}
const gE = {
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
function yE(n, r) {
  if (n == null) return "neutral";
  const a = Jp(n);
  if (r) {
    for (const u in r)
      if (Jp(u) === a) return r[u];
  }
  return gE[a] ?? "neutral";
}
function bE(...n) {
  const r = n.filter((a) => a != null);
  if (r.length !== 0)
    return r.length === 1 ? r[0] : (a) => {
      for (const u of r)
        typeof u == "function" ? u(a) : u.current = a;
    };
}
const vE = (n) => /^on[A-Z]/.test(n);
function xE(...n) {
  const r = {};
  for (const a of n)
    if (a)
      for (const u of Object.keys(a)) {
        const c = a[u], h = r[u];
        if (u === "className")
          r[u] = pl(h, c);
        else if (u === "style")
          r[u] = { ...h, ...c };
        else if (u === "ref")
          r[u] = bE(h, c);
        else if (vE(u) && typeof c == "function" && typeof h == "function") {
          const f = h, m = c;
          r[u] = (...p) => (f(...p), m(...p));
        } else
          r[u] = c;
      }
  return r;
}
function Zc(n, r) {
  return typeof n == "function" ? n(r) : jt.cloneElement(n, xE(r, n.props));
}
const vy = "inline-flex select-none items-center justify-center gap-x-2 whitespace-nowrap rounded-lg font-medium transition duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-y-px motion-reduce:active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 disabled:active:translate-y-0", xy = {
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
jt.forwardRef(
  function({ variant: r = "primary", size: a = "md", className: u, render: c, ...h }, f) {
    const m = pl(vy, xy[r], Sy[a], u);
    return c ? Zc(c, { "data-slot": "button", className: m, ref: f, ...h }) : /* @__PURE__ */ B.jsx(
      "button",
      {
        ref: f,
        "data-slot": "button",
        className: m,
        ...h
      }
    );
  }
);
const ky = jt.forwardRef(
  function({ variant: r = "primary", size: a = "md", className: u, render: c, ...h }, f) {
    const m = pl(vy, xy[r], Sy[a], u);
    return c ? Zc(c, { "data-slot": "button", className: m, ref: f, ...h }) : /* @__PURE__ */ B.jsx(
      "a",
      {
        ref: f,
        "data-slot": "button",
        className: m,
        ...h
      }
    );
  }
), SE = {
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
function kE(n, r, a) {
  if (r == null) return n;
  const u = yE(r, a);
  return u === "neutral" ? "neutral" : u;
}
function wy({ children: n, tone: r = "neutral", status: a, statusOverrides: u, className: c }) {
  const h = kE(r, a, u);
  return /* @__PURE__ */ B.jsx(
    "span",
    {
      "data-slot": "badge",
      className: pl(
        "inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium",
        SE[h],
        c
      ),
      children: n
    }
  );
}
const wE = {
  white: "bg-card text-foreground border-border shadow-sm",
  muted: "bg-muted text-foreground border-border shadow-sm",
  solid: "bg-primary text-primary-foreground border-primary shadow-md",
  dark: "bg-ink text-paper border-ink shadow-md"
}, Ey = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-7 sm:p-8"
};
function EE({ as: n = "div", render: r, children: a, tone: u = "white", padding: c = "md", interactive: h = !1, className: f, ...m }) {
  const p = {
    "data-slot": "card-surface",
    className: pl(
      "flex flex-col rounded-xl border transition-shadow duration-200",
      wE[u],
      Ey[c],
      h && "hover:shadow-md focus-within:shadow-md",
      f
    ),
    children: a,
    ...m
  };
  return r ? Zc(r, p) : /* @__PURE__ */ B.jsx(n, { ...p });
}
function zE({ children: n, padding: r = "md", className: a }) {
  return /* @__PURE__ */ B.jsx("div", { "data-slot": "card-surface-body", className: pl("flex flex-1 flex-col", Ey[r], a), children: n });
}
function TE({ heading: n, items: r, className: a }) {
  return /* @__PURE__ */ B.jsxs("div", { "data-slot": "details-panel", className: pl("overflow-hidden rounded-xl border border-border bg-card shadow-sm", a), children: [
    n != null ? /* @__PURE__ */ B.jsx("div", { "data-slot": "details-panel-heading", className: "border-b border-border px-6 py-4", children: /* @__PURE__ */ B.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: n }) }) : null,
    /* @__PURE__ */ B.jsx("dl", { "data-slot": "details-panel-body", className: "divide-y divide-border", children: r.map((u, c) => /* @__PURE__ */ B.jsxs("div", { className: "flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6", children: [
      /* @__PURE__ */ B.jsx("dt", { className: "text-sm font-medium text-muted-foreground", children: u.term }),
      /* @__PURE__ */ B.jsx("dd", { className: "text-sm font-semibold text-foreground sm:text-right", children: u.value })
    ] }, c)) })
  ] });
}
const AE = {
  white: "white",
  muted: "muted",
  dark: "dark"
};
function CE({
  children: n,
  tone: r = "white",
  variant: a = "card",
  padding: u = "md",
  className: c
}) {
  return a === "open" ? /* @__PURE__ */ B.jsx("div", { "data-slot": "panel-shell", className: c, children: n }) : /* @__PURE__ */ B.jsx(
    EE,
    {
      "data-slot": "panel-shell",
      tone: AE[r],
      padding: "none",
      className: pl(a === "inset" && r === "white" && "shadow-none", c),
      children: /* @__PURE__ */ B.jsx(zE, { padding: u, children: n })
    }
  );
}
const _E = jt.lazy(
  () => import("./GuidedLabWorkbench-D0Ly3tzu.js").then((n) => ({ default: n.GuidedLabWorkbench }))
), hu = /* @__PURE__ */ new WeakMap(), zy = "waku-learning-journal:v1";
let Ty = null, Ay = null;
const La = () => ({
  goal: "",
  hypothesis: "",
  evidence: "",
  decision: "",
  correction: "",
  next_step: "",
  updated_at: ""
});
function Ip(n) {
  try {
    const r = window.localStorage.getItem(`${zy}:${n}`);
    return r ? { ...La(), ...JSON.parse(r) } : La();
  } catch {
    return La();
  }
}
function Ec(n) {
  Ty = n, window.dispatchEvent(new CustomEvent("waku-learning-context", { detail: n }));
}
function DE(n) {
  Ay = n, window.dispatchEvent(new CustomEvent("waku-lab-session", { detail: { sessionId: n } }));
}
function cc(n) {
  return n && !n.endsWith("Z") ? `${n.replace(" ", "T")}Z` : n;
}
async function OE(n) {
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
function $p({ chapter: n, track: r }) {
  const [a, u] = jt.useState(() => Ip(n.number)), [c, h] = jt.useState(!1), [f, m] = jt.useState("ready");
  jt.useEffect(() => {
    window.localStorage.setItem(`${zy}:${n.number}`, JSON.stringify(a)), Ec({ version: 1, chapter: n.number, track: r, journal: a });
  }, [n.number, a, r]), jt.useEffect(() => () => Ec(null), [n.number]), jt.useEffect(() => {
    let S = !0;
    const x = Ip(n.number);
    return u(x), h(!1), m("ready"), fetch("/api/learning-journal?chapter=" + encodeURIComponent(n.number)).then((A) => A.json()).then((A) => {
      if (!S) return;
      const L = A.journal;
      if (L) {
        const Y = {
          ...La(),
          ...L,
          updated_at: cc(L.updated_at)
        }, D = Date.parse(x.updated_at || "") || 0;
        (Date.parse(Y.updated_at || "") || 0) >= D && u(Y);
      }
      h(!0), m("saved");
    }).catch(() => {
      S && (h(!0), m("offline"));
    }), () => {
      S = !1;
    };
  }, [n.number]), jt.useEffect(() => {
    const S = () => {
      fetch("/api/learning-journal?chapter=" + encodeURIComponent(n.number)).then((x) => x.json()).then((x) => {
        const A = x.journal;
        A && u({ ...La(), ...A, updated_at: cc(A.updated_at) });
      }).catch(() => m("offline"));
    };
    return window.addEventListener("waku-journal-refresh", S), () => window.removeEventListener("waku-journal-refresh", S);
  }, [n.number]), jt.useEffect(() => {
    if (!c) return;
    m("saving");
    const S = window.setTimeout(() => {
      OE({ version: 1, chapter: n.number, track: r, journal: a }).then((x) => {
        u((A) => ({ ...A, updated_at: cc(x.updated_at) })), m("saved");
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
  const p = (S, x) => {
    u((A) => ({ ...A, [S]: x, updated_at: (/* @__PURE__ */ new Date()).toISOString() }));
  }, d = r === "engineer" ? "AI-engineer" : r === "architect" ? "Architect" : r === "lab" ? "Lab" : "Lesson", b = f === "saving" ? "Saving to Waku…" : f === "offline" ? "Offline draft" : a.updated_at ? `Saved ${new Date(a.updated_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "Ready for this session", y = fc.filter((S) => a[S.name].trim()).length;
  return /* @__PURE__ */ B.jsx("section", { "data-slot": "learning-journal", className: "wf-learning-journal mt-10 max-w-3xl rounded-xl border border-border bg-card", children: /* @__PURE__ */ B.jsxs("details", { children: [
    /* @__PURE__ */ B.jsxs("summary", { className: "wf-journal-summary", children: [
      /* @__PURE__ */ B.jsxs("span", { className: "min-w-0", children: [
        /* @__PURE__ */ B.jsx("span", { className: "wf-eyebrow", children: "Reflect and capture" }),
        /* @__PURE__ */ B.jsx("strong", { className: "mt-2 block text-xl tracking-tight text-foreground", children: "Learning journal" }),
        /* @__PURE__ */ B.jsx("span", { className: "mt-1 block text-sm leading-6 text-muted-foreground", children: y ? `${y} of ${fc.length} prompts captured for Chapter ${n.number}.` : "Open when you are ready to record what changed in your thinking." })
      ] }),
      /* @__PURE__ */ B.jsxs("span", { className: "flex shrink-0 items-center gap-3", children: [
        /* @__PURE__ */ B.jsxs("span", { className: "wf-journal-status", "aria-live": "polite", children: [
          /* @__PURE__ */ B.jsx("span", { className: "wf-journal-status-dot" }),
          b
        ] }),
        /* @__PURE__ */ B.jsx("span", { className: "wf-journal-chevron", "aria-hidden": "true", children: "⌄" })
      ] })
    ] }),
    /* @__PURE__ */ B.jsxs("div", { className: "wf-journal-body", children: [
      /* @__PURE__ */ B.jsxs("div", { className: "border-b border-border pb-5", children: [
        /* @__PURE__ */ B.jsxs("div", { className: "wf-eyebrow", children: [
          "Chapter ",
          n.number,
          " · ",
          d,
          " track"
        ] }),
        /* @__PURE__ */ B.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-6 text-muted-foreground", children: "Capture what you believed, what the evidence changed, and what you will try next. Waku receives these notes with chat so it can coach in context." })
      ] }),
      /* @__PURE__ */ B.jsx("div", { className: "mt-5 grid grid-cols-1 gap-4 md:grid-cols-2", children: fc.map((S) => /* @__PURE__ */ B.jsxs("label", { className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ B.jsx("span", { className: "text-xs font-bold text-foreground", children: S.label }),
        /* @__PURE__ */ B.jsx(
          "textarea",
          {
            value: a[S.name],
            onChange: (x) => p(S.name, x.target.value),
            placeholder: S.prompt,
            rows: 3,
            className: "wf-journal-input"
          }
        )
      ] }, S.name)) }),
      /* @__PURE__ */ B.jsx("p", { className: "mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground", children: "Saved in Waku's SQLite learning journal, with a browser draft for recovery. Journal context is sent to your configured model provider only when you chat with Waku. It does not mark a chapter complete; Git-backed checks remain the record." })
    ] })
  ] }) });
}
const ME = {
  passed: "Passed",
  current: "Current",
  available: "Available",
  roadmap: "Roadmap"
}, NE = {
  passed: "success",
  current: "warning",
  available: "primary",
  roadmap: "neutral"
};
function Cy({ chapter: n }) {
  return /* @__PURE__ */ B.jsx("span", { "data-slot": "status-badge", className: "inline-flex", children: /* @__PURE__ */ B.jsx(wy, { tone: NE[n.status], children: ME[n.status] }) });
}
function _y({ catalog: n }) {
  jt.useEffect(() => Ec(null), []);
  const r = n.chapters.find((u) => u.number === n.current), a = n.total ? Math.round(n.passed / n.total * 100) : 0;
  return /* @__PURE__ */ B.jsxs("div", { "data-slot": "curriculum-surface", className: "pb-8", children: [
    /* @__PURE__ */ B.jsxs("section", { "data-slot": "course-hero", className: "wf-course-hero", children: [
      /* @__PURE__ */ B.jsxs("div", { className: "wf-eyebrow", children: [
        "Production agent engineering · ",
        n.total,
        " chapters"
      ] }),
      /* @__PURE__ */ B.jsxs("h2", { className: "relative z-1 mt-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl", children: [
        "Build the agent.",
        /* @__PURE__ */ B.jsx("br", {}),
        "Break it at scale.",
        /* @__PURE__ */ B.jsx("br", {}),
        "Prove the repair."
      ] }),
      /* @__PURE__ */ B.jsx("p", { className: "relative z-1 mt-6 max-w-2xl text-[0.94rem] leading-7 text-white/80", children: "A self-directed path through the failures that separate an agent demo from a production system. Every runnable lesson starts with a scar and ends with evidence." }),
      /* @__PURE__ */ B.jsxs("div", { "data-slot": "course-progress", className: "relative z-1 mt-7 flex max-w-md items-center gap-4", children: [
        /* @__PURE__ */ B.jsxs("div", { className: "min-w-24", children: [
          /* @__PURE__ */ B.jsxs("strong", { className: "block text-base", children: [
            n.passed,
            " of ",
            n.total
          ] }),
          /* @__PURE__ */ B.jsx("span", { className: "text-[0.65rem] uppercase tracking-[0.08em] text-white/60", children: "chapters passed" })
        ] }),
        /* @__PURE__ */ B.jsx("div", { className: "wf-progress-track flex-1", "aria-label": `${a}% complete`, children: /* @__PURE__ */ B.jsx("span", { style: { width: `${a}%` } }) })
      ] }),
      r ? /* @__PURE__ */ B.jsxs(
        ky,
        {
          className: "relative z-1 mt-7 bg-[var(--wf-accent)] text-[#242019] hover:bg-[var(--wf-accent)]/90",
          href: `#learn/${r.number}`,
          children: [
            "Continue · Chapter ",
            r.number,
            " ",
            /* @__PURE__ */ B.jsx("span", { "aria-hidden": "true", children: "→" })
          ]
        }
      ) : null
    ] }),
    /* @__PURE__ */ B.jsxs("aside", { className: "mt-5 border-l-4 border-[var(--wf-accent)] bg-card px-4 py-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ B.jsx("strong", { className: "text-foreground", children: "How this path works." }),
      " Read the scar, choose the architect or AI-engineer track, reproduce the failure, then make the real check green. Git tags—not browser checkboxes—are the progress record."
    ] }),
    /* @__PURE__ */ B.jsx("div", { className: "mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2", children: n.phases.map((u, c) => {
      const h = u.chapters.map((m) => n.chapters.find((p) => p.number === m)).filter((m) => !!m), f = h.filter((m) => m.status === "passed").length;
      return /* @__PURE__ */ B.jsxs("section", { "data-slot": "course-phase", className: "wf-phase-card rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ B.jsx("div", { className: "wf-eyebrow pt-1", children: String(c + 1).padStart(2, "0") }),
        /* @__PURE__ */ B.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ B.jsxs("div", { className: "font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted-foreground", children: [
            f,
            " of ",
            h.length,
            " passed"
          ] }),
          /* @__PURE__ */ B.jsx("h3", { className: "mt-1 text-xl font-bold tracking-tight text-foreground", children: u.name }),
          /* @__PURE__ */ B.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: u.promise }),
          /* @__PURE__ */ B.jsx("div", { className: "mt-4 border-t border-border", children: h.map((m) => /* @__PURE__ */ B.jsxs(
            "a",
            {
              "data-slot": "lesson-row",
              href: `#learn/${m.number}`,
              className: "grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-3 text-foreground no-underline hover:text-primary",
              children: [
                /* @__PURE__ */ B.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: m.number }),
                /* @__PURE__ */ B.jsx("span", { className: "min-w-0 text-sm font-semibold", children: m.title }),
                /* @__PURE__ */ B.jsx(Cy, { chapter: m })
              ]
            },
            m.number
          )) })
        ] })
      ] }, u.id);
    }) })
  ] });
}
function RE({ markdown: n }) {
  return /* @__PURE__ */ B.jsx("article", { "data-slot": "lesson-content", className: "wf-markdown", children: /* @__PURE__ */ B.jsx(ck, { remarkPlugins: [w2], children: n }) });
}
function jE({ catalog: n, route: r }) {
  const [a, u = "brief"] = r.split("/"), c = n.chapters.findIndex((x) => x.number === a);
  if (c < 0) return /* @__PURE__ */ B.jsx(_y, { catalog: n });
  const h = n.chapters[c], f = n.chapters[c - 1], m = n.chapters[c + 1], p = n.phases.find((x) => x.id === h.phase), d = u === "architect" || u === "engineer" || u === "lab" ? u : "brief", b = d === "brief" ? h.brief : d === "lab" ? "" : h.tracks[d], y = h.status === "current" ? "This is the active assignment. Run the failure first; only green evidence advances the course." : h.status === "passed" ? "Your repository records this chapter as passed. Revisit the evidence or compare approaches." : h.status === "available" ? "The instrument exists, but an earlier chapter is still active. Read ahead without fixing ahead." : "This module is designed but its deterministic failure instrument is not published yet. Preview it; do not treat it as runnable.", S = [
    ["brief", "Lesson"],
    ...h.tracks.architect ? [["architect", "Architect track"]] : [],
    ...h.tracks.engineer ? [["engineer", "AI-engineer track"]] : [],
    ["lab", "Lab"]
  ];
  return /* @__PURE__ */ B.jsxs("div", { "data-slot": "curriculum-surface", className: "pb-8", children: [
    /* @__PURE__ */ B.jsxs("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ B.jsx("a", { className: "text-primary no-underline", href: "#learn", children: "Curriculum" }),
      /* @__PURE__ */ B.jsx("span", { children: "/" }),
      /* @__PURE__ */ B.jsxs("span", { children: [
        "Chapter ",
        h.number
      ] })
    ] }),
    /* @__PURE__ */ B.jsxs("header", { className: "mt-7", children: [
      /* @__PURE__ */ B.jsxs("div", { className: "wf-eyebrow flex items-center gap-2", children: [
        "Chapter ",
        h.number,
        " · ",
        /* @__PURE__ */ B.jsx(Cy, { chapter: h })
      ] }),
      /* @__PURE__ */ B.jsx("h2", { className: "mt-5 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl", children: h.title }),
      /* @__PURE__ */ B.jsx("p", { className: "mt-4 max-w-3xl text-[0.94rem] leading-7 text-muted-foreground", children: h.summary }),
      /* @__PURE__ */ B.jsxs("div", { className: "wf-eyebrow mt-4", children: [
        "Competency · ",
        h.competency
      ] }),
      /* @__PURE__ */ B.jsx("section", { "data-slot": "lesson-contract", children: /* @__PURE__ */ B.jsx(
        TE,
        {
          className: "wf-lesson-contract mt-6",
          items: [
            { term: "Phase", value: p?.name ?? h.phase },
            { term: "Sequence", value: `${c + 1} of ${n.chapters.length}` },
            { term: "Prerequisite", value: f ? `Chapter ${f.number} · ${f.title}` : "Working harness" },
            { term: "Required evidence", value: h.runnable ? h.check : "Failure instrument pending" }
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ B.jsx("nav", { "data-slot": "lesson-tabs", "aria-label": "Lesson tracks", className: "mt-7 flex gap-1 overflow-x-auto border-b border-border", children: S.map(([x, A]) => /* @__PURE__ */ B.jsx(
      "a",
      {
        href: `#learn/${h.number}/${x}`,
        "aria-current": d === x ? "page" : void 0,
        className: `whitespace-nowrap border-b-3 px-4 py-3 text-sm font-semibold no-underline ${d === x ? "border-[var(--wf-accent)] text-[var(--wf-accent-strong)]" : "border-transparent text-muted-foreground hover:text-foreground"}`,
        children: A
      },
      x
    )) }),
    d === "lab" ? /* @__PURE__ */ B.jsx(jt.Suspense, { fallback: /* @__PURE__ */ B.jsx("p", { className: "mt-10 text-sm text-muted-foreground", role: "status", children: "Loading the lab workbench…" }), children: /* @__PURE__ */ B.jsx(
      _E,
      {
        chapter: h,
        journalPanel: /* @__PURE__ */ B.jsx($p, { chapter: h, track: d }, h.number),
        onSessionChange: DE
      }
    ) }) : /* @__PURE__ */ B.jsxs("a", { className: "wf-lab-callout", href: `#learn/${h.number}/lab`, children: [
      /* @__PURE__ */ B.jsxs("span", { children: [
        /* @__PURE__ */ B.jsx("span", { className: "wf-eyebrow", children: h.lab?.state === "preview" ? "Lab preview" : "Hands-on lab" }),
        /* @__PURE__ */ B.jsx("strong", { children: "Open lab workspace" }),
        /* @__PURE__ */ B.jsx("small", { children: h.lab?.scenario })
      ] }),
      /* @__PURE__ */ B.jsx("span", { "aria-hidden": "true", children: "→" })
    ] }),
    d !== "lab" ? /* @__PURE__ */ B.jsxs("div", { className: "mt-8 grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,1fr)_15.5rem]", children: [
      /* @__PURE__ */ B.jsxs("div", { className: "min-w-0 max-w-3xl", children: [
        /* @__PURE__ */ B.jsx(RE, { markdown: b }),
        /* @__PURE__ */ B.jsxs("section", { "data-slot": "knowledge-check", "aria-labelledby": "wf-knowledge-title", className: "mt-9 rounded-lg border border-border border-l-4 border-l-[var(--wf-accent)] bg-card p-6", children: [
          /* @__PURE__ */ B.jsx("div", { className: "wf-eyebrow", children: "Mastery reflection" }),
          /* @__PURE__ */ B.jsx("h3", { id: "wf-knowledge-title", className: "mt-3 text-xl font-bold text-foreground", children: "Knowledge check" }),
          /* @__PURE__ */ B.jsx("ol", { className: "mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-foreground", children: h.knowledge_checks.map((x) => /* @__PURE__ */ B.jsx("li", { children: x }, x)) }),
          /* @__PURE__ */ B.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "Answer these in your own words before treating a green check as mastery." })
        ] })
      ] }),
      /* @__PURE__ */ B.jsx("aside", { "data-slot": "assignment-panel", className: "sticky top-24", children: /* @__PURE__ */ B.jsxs(CE, { className: "border-t-3 border-t-[var(--wf-accent)]", padding: "md", children: [
        /* @__PURE__ */ B.jsx("div", { className: "wf-eyebrow", children: "Your assignment" }),
        /* @__PURE__ */ B.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: y }),
        /* @__PURE__ */ B.jsx("div", { className: "mt-4", children: h.runnable ? /* @__PURE__ */ B.jsx("code", { className: "block rounded border border-border bg-background px-3 py-2 text-xs", children: h.check }) : /* @__PURE__ */ B.jsx(wy, { tone: "neutral", children: "Reading preview" }) }),
        h.runnable ? /* @__PURE__ */ B.jsx(ky, { className: "mt-3 w-full", size: "sm", href: `#${h.evidence_view}`, children: "Open live evidence →" }) : null,
        /* @__PURE__ */ B.jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
          /* @__PURE__ */ B.jsx("strong", { className: "text-xs text-foreground", children: "AI rule" }),
          /* @__PURE__ */ B.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Use your assistant as reviewer and rubber duck. You write the chapter solution." })
        ] })
      ] }) })
    ] }) : null,
    d !== "lab" ? /* @__PURE__ */ B.jsx($p, { chapter: h, track: d }, h.number) : null,
    /* @__PURE__ */ B.jsxs("nav", { "data-slot": "lesson-pagination", "aria-label": "Adjacent lessons", className: "mt-11 grid grid-cols-2 gap-4 border-t border-border pt-6", children: [
      f ? /* @__PURE__ */ B.jsxs("a", { className: "rounded-lg border border-border bg-card p-4 text-foreground no-underline hover:border-primary", href: `#learn/${f.number}`, children: [
        /* @__PURE__ */ B.jsx("span", { className: "block text-[0.62rem] uppercase tracking-wider text-muted-foreground", children: "← Previous" }),
        /* @__PURE__ */ B.jsx("strong", { className: "mt-1 block text-sm", children: f.title })
      ] }) : /* @__PURE__ */ B.jsx("span", {}),
      m ? /* @__PURE__ */ B.jsxs("a", { className: "rounded-lg border border-border bg-card p-4 text-right text-foreground no-underline hover:border-primary", href: `#learn/${m.number}`, children: [
        /* @__PURE__ */ B.jsx("span", { className: "block text-[0.62rem] uppercase tracking-wider text-muted-foreground", children: "Next →" }),
        /* @__PURE__ */ B.jsx("strong", { className: "mt-1 block text-sm", children: m.title })
      ] }) : /* @__PURE__ */ B.jsx("span", {})
    ] })
  ] });
}
function LE({ catalog: n, route: r }) {
  return r ? /* @__PURE__ */ B.jsx(jE, { catalog: n, route: r }) : /* @__PURE__ */ B.jsx(_y, { catalog: n });
}
window.WakuCurriculum = {
  render(n, r, a) {
    let u = hu.get(n);
    u || (u = P1.createRoot(n), hu.set(n, u)), u.render(/* @__PURE__ */ B.jsx(LE, { catalog: r, route: a }));
  },
  unmount(n) {
    const r = hu.get(n);
    r && (r.unmount(), hu.delete(n));
  },
  getLearningContext() {
    return Ty;
  },
  getLabSessionId() {
    return Ay;
  }
};
window.dispatchEvent(new Event("waku-curriculum-ready"));
export {
  ck as M,
  w2 as a,
  B as j,
  jt as r
};
