const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./browserAll-0EmyK9dU.js",
      "./webworkerAll-CcMZhQEL.js",
      "./colorToUniform-C2GHuDhf.js",
      "./WebGPURenderer-CCtrNZDn.js",
      "./SharedSystems-B5ZBkyYw.js",
      "./WebGLRenderer-DGPLUMVC.js",
    ]),
) => i.map((i) => d[i]);
var Ia = Object.defineProperty;
var Ma = (i, t, e) =>
  t in i
    ? Ia(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (i[t] = e);
var p = (i, t, e) => Ma(i, typeof t != "symbol" ? t + "" : t, e);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = e(n);
    fetch(n.href, r);
  }
})();
const Sa = "modulepreload",
  Qa = function (i, t) {
    return new URL(i, t).href;
  },
  Bn = {},
  Ti = function (t, e, s) {
    let n = Promise.resolve();
    if (e && e.length > 0) {
      let o = function (d) {
        return Promise.all(
          d.map((a) =>
            Promise.resolve(a).then(
              (c) => ({ status: "fulfilled", value: c }),
              (c) => ({ status: "rejected", reason: c }),
            ),
          ),
        );
      };
      const A = document.getElementsByTagName("link"),
        h = document.querySelector("meta[property=csp-nonce]"),
        l =
          (h == null ? void 0 : h.nonce) ||
          (h == null ? void 0 : h.getAttribute("nonce"));
      n = o(
        e.map((d) => {
          if (((d = Qa(d, s)), d in Bn)) return;
          Bn[d] = !0;
          const a = d.endsWith(".css"),
            c = a ? '[rel="stylesheet"]' : "";
          if (!!s)
            for (let y = A.length - 1; y >= 0; y--) {
              const m = A[y];
              if (m.href === d && (!a || m.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${d}"]${c}`)) return;
          const g = document.createElement("link");
          if (
            ((g.rel = a ? "stylesheet" : Sa),
            a || (g.as = "script"),
            (g.crossOrigin = ""),
            (g.href = d),
            l && g.setAttribute("nonce", l),
            document.head.appendChild(g),
            a)
          )
            return new Promise((y, m) => {
              g.addEventListener("load", y),
                g.addEventListener("error", () =>
                  m(new Error(`Unable to preload CSS for ${d}`)),
                );
            });
        }),
      );
    }
    function r(o) {
      const A = new Event("vite:preloadError", { cancelable: !0 });
      if (((A.payload = o), window.dispatchEvent(A), !A.defaultPrevented))
        throw o;
    }
    return n.then((o) => {
      for (const A of o || []) A.status === "rejected" && r(A.reason);
      return t().catch(r);
    });
  };
var Y = ((i) => (
  (i.Application = "application"),
  (i.WebGLPipes = "webgl-pipes"),
  (i.WebGLPipesAdaptor = "webgl-pipes-adaptor"),
  (i.WebGLSystem = "webgl-system"),
  (i.WebGPUPipes = "webgpu-pipes"),
  (i.WebGPUPipesAdaptor = "webgpu-pipes-adaptor"),
  (i.WebGPUSystem = "webgpu-system"),
  (i.CanvasSystem = "canvas-system"),
  (i.CanvasPipesAdaptor = "canvas-pipes-adaptor"),
  (i.CanvasPipes = "canvas-pipes"),
  (i.Asset = "asset"),
  (i.LoadParser = "load-parser"),
  (i.ResolveParser = "resolve-parser"),
  (i.CacheParser = "cache-parser"),
  (i.DetectionParser = "detection-parser"),
  (i.MaskEffect = "mask-effect"),
  (i.BlendMode = "blend-mode"),
  (i.TextureSource = "texture-source"),
  (i.Environment = "environment"),
  (i.ShapeBuilder = "shape-builder"),
  (i.Batcher = "batcher"),
  i
))(Y || {});
const Ms = (i) => {
    if (typeof i == "function" || (typeof i == "object" && i.extension)) {
      if (!i.extension)
        throw new Error("Extension class must have an extension object");
      i = {
        ...(typeof i.extension != "object"
          ? { type: i.extension }
          : i.extension),
        ref: i,
      };
    }
    if (typeof i == "object") i = { ...i };
    else throw new Error("Invalid extension type");
    return typeof i.type == "string" && (i.type = [i.type]), i;
  },
  mi = (i, t) => Ms(i).priority ?? t,
  Dt = {
    _addHandlers: {},
    _removeHandlers: {},
    _queue: {},
    remove(...i) {
      return (
        i.map(Ms).forEach((t) => {
          t.type.forEach((e) => {
            var s, n;
            return (n = (s = this._removeHandlers)[e]) == null
              ? void 0
              : n.call(s, t);
          });
        }),
        this
      );
    },
    add(...i) {
      return (
        i.map(Ms).forEach((t) => {
          t.type.forEach((e) => {
            var r, o;
            const s = this._addHandlers,
              n = this._queue;
            s[e]
              ? (o = s[e]) == null || o.call(s, t)
              : ((n[e] = n[e] || []), (r = n[e]) == null || r.push(t));
          });
        }),
        this
      );
    },
    handle(i, t, e) {
      var o;
      const s = this._addHandlers,
        n = this._removeHandlers;
      if (s[i] || n[i])
        throw new Error(`Extension type ${i} already has a handler`);
      (s[i] = t), (n[i] = e);
      const r = this._queue;
      return (
        r[i] && ((o = r[i]) == null || o.forEach((A) => t(A)), delete r[i]),
        this
      );
    },
    handleByMap(i, t) {
      return this.handle(
        i,
        (e) => {
          e.name && (t[e.name] = e.ref);
        },
        (e) => {
          e.name && delete t[e.name];
        },
      );
    },
    handleByNamedList(i, t, e = -1) {
      return this.handle(
        i,
        (s) => {
          t.findIndex((r) => r.name === s.name) >= 0 ||
            (t.push({ name: s.name, value: s.ref }),
            t.sort((r, o) => mi(o.value, e) - mi(r.value, e)));
        },
        (s) => {
          const n = t.findIndex((r) => r.name === s.name);
          n !== -1 && t.splice(n, 1);
        },
      );
    },
    handleByList(i, t, e = -1) {
      return this.handle(
        i,
        (s) => {
          t.includes(s.ref) ||
            (t.push(s.ref), t.sort((n, r) => mi(r, e) - mi(n, e)));
        },
        (s) => {
          const n = t.indexOf(s.ref);
          n !== -1 && t.splice(n, 1);
        },
      );
    },
    mixin(i, ...t) {
      for (const e of t)
        Object.defineProperties(
          i.prototype,
          Object.getOwnPropertyDescriptors(e),
        );
    },
  },
  Da = {
    extension: { type: Y.Environment, name: "browser", priority: -1 },
    test: () => !0,
    load: async () => {
      await Ti(
        () => import("./browserAll-0EmyK9dU.js"),
        __vite__mapDeps([0, 1, 2]),
        import.meta.url,
      );
    },
  },
  Pa = {
    extension: { type: Y.Environment, name: "webworker", priority: 0 },
    test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
    load: async () => {
      await Ti(
        () => import("./webworkerAll-CcMZhQEL.js"),
        __vite__mapDeps([1, 2]),
        import.meta.url,
      );
    },
  };
class Ut {
  constructor(t, e, s) {
    (this._x = e || 0), (this._y = s || 0), (this._observer = t);
  }
  clone(t) {
    return new Ut(t ?? this._observer, this._x, this._y);
  }
  set(t = 0, e = t) {
    return (
      (this._x !== t || this._y !== e) &&
        ((this._x = t), (this._y = e), this._observer._onUpdate(this)),
      this
    );
  }
  copyFrom(t) {
    return (
      (this._x !== t.x || this._y !== t.y) &&
        ((this._x = t.x), (this._y = t.y), this._observer._onUpdate(this)),
      this
    );
  }
  copyTo(t) {
    return t.set(this._x, this._y), t;
  }
  equals(t) {
    return t.x === this._x && t.y === this._y;
  }
  toString() {
    return `[pixi.js/math:ObservablePoint x=0 y=0 scope=${this._observer}]`;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x !== t && ((this._x = t), this._observer._onUpdate(this));
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y !== t && ((this._y = t), this._observer._onUpdate(this));
  }
}
var $e =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function tn(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default")
    ? i.default
    : i;
}
var qi = { exports: {} },
  In;
function Ra() {
  return (
    In ||
      ((In = 1),
      (function (i) {
        var t = Object.prototype.hasOwnProperty,
          e = "~";
        function s() {}
        Object.create &&
          ((s.prototype = Object.create(null)), new s().__proto__ || (e = !1));
        function n(h, l, d) {
          (this.fn = h), (this.context = l), (this.once = d || !1);
        }
        function r(h, l, d, a, c) {
          if (typeof d != "function")
            throw new TypeError("The listener must be a function");
          var u = new n(d, a || h, c),
            g = e ? e + l : l;
          return (
            h._events[g]
              ? h._events[g].fn
                ? (h._events[g] = [h._events[g], u])
                : h._events[g].push(u)
              : ((h._events[g] = u), h._eventsCount++),
            h
          );
        }
        function o(h, l) {
          --h._eventsCount === 0 ? (h._events = new s()) : delete h._events[l];
        }
        function A() {
          (this._events = new s()), (this._eventsCount = 0);
        }
        (A.prototype.eventNames = function () {
          var l = [],
            d,
            a;
          if (this._eventsCount === 0) return l;
          for (a in (d = this._events))
            t.call(d, a) && l.push(e ? a.slice(1) : a);
          return Object.getOwnPropertySymbols
            ? l.concat(Object.getOwnPropertySymbols(d))
            : l;
        }),
          (A.prototype.listeners = function (l) {
            var d = e ? e + l : l,
              a = this._events[d];
            if (!a) return [];
            if (a.fn) return [a.fn];
            for (var c = 0, u = a.length, g = new Array(u); c < u; c++)
              g[c] = a[c].fn;
            return g;
          }),
          (A.prototype.listenerCount = function (l) {
            var d = e ? e + l : l,
              a = this._events[d];
            return a ? (a.fn ? 1 : a.length) : 0;
          }),
          (A.prototype.emit = function (l, d, a, c, u, g) {
            var y = e ? e + l : l;
            if (!this._events[y]) return !1;
            var m = this._events[y],
              C = arguments.length,
              w,
              E;
            if (m.fn) {
              switch ((m.once && this.removeListener(l, m.fn, void 0, !0), C)) {
                case 1:
                  return m.fn.call(m.context), !0;
                case 2:
                  return m.fn.call(m.context, d), !0;
                case 3:
                  return m.fn.call(m.context, d, a), !0;
                case 4:
                  return m.fn.call(m.context, d, a, c), !0;
                case 5:
                  return m.fn.call(m.context, d, a, c, u), !0;
                case 6:
                  return m.fn.call(m.context, d, a, c, u, g), !0;
              }
              for (E = 1, w = new Array(C - 1); E < C; E++)
                w[E - 1] = arguments[E];
              m.fn.apply(m.context, w);
            } else {
              var I = m.length,
                U;
              for (E = 0; E < I; E++)
                switch (
                  (m[E].once && this.removeListener(l, m[E].fn, void 0, !0), C)
                ) {
                  case 1:
                    m[E].fn.call(m[E].context);
                    break;
                  case 2:
                    m[E].fn.call(m[E].context, d);
                    break;
                  case 3:
                    m[E].fn.call(m[E].context, d, a);
                    break;
                  case 4:
                    m[E].fn.call(m[E].context, d, a, c);
                    break;
                  default:
                    if (!w)
                      for (U = 1, w = new Array(C - 1); U < C; U++)
                        w[U - 1] = arguments[U];
                    m[E].fn.apply(m[E].context, w);
                }
            }
            return !0;
          }),
          (A.prototype.on = function (l, d, a) {
            return r(this, l, d, a, !1);
          }),
          (A.prototype.once = function (l, d, a) {
            return r(this, l, d, a, !0);
          }),
          (A.prototype.removeListener = function (l, d, a, c) {
            var u = e ? e + l : l;
            if (!this._events[u]) return this;
            if (!d) return o(this, u), this;
            var g = this._events[u];
            if (g.fn)
              g.fn === d &&
                (!c || g.once) &&
                (!a || g.context === a) &&
                o(this, u);
            else {
              for (var y = 0, m = [], C = g.length; y < C; y++)
                (g[y].fn !== d ||
                  (c && !g[y].once) ||
                  (a && g[y].context !== a)) &&
                  m.push(g[y]);
              m.length
                ? (this._events[u] = m.length === 1 ? m[0] : m)
                : o(this, u);
            }
            return this;
          }),
          (A.prototype.removeAllListeners = function (l) {
            var d;
            return (
              l
                ? ((d = e ? e + l : l), this._events[d] && o(this, d))
                : ((this._events = new s()), (this._eventsCount = 0)),
              this
            );
          }),
          (A.prototype.off = A.prototype.removeListener),
          (A.prototype.addListener = A.prototype.on),
          (A.prefixed = e),
          (A.EventEmitter = A),
          (i.exports = A);
      })(qi)),
    qi.exports
  );
}
var Fa = Ra();
const Jt = tn(Fa),
  Ta = Math.PI * 2,
  ka = 180 / Math.PI,
  Ga = Math.PI / 180;
class Rt {
  constructor(t = 0, e = 0) {
    (this.x = 0), (this.y = 0), (this.x = t), (this.y = e);
  }
  clone() {
    return new Rt(this.x, this.y);
  }
  copyFrom(t) {
    return this.set(t.x, t.y), this;
  }
  copyTo(t) {
    return t.set(this.x, this.y), t;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  set(t = 0, e = t) {
    return (this.x = t), (this.y = e), this;
  }
  toString() {
    return `[pixi.js/math:Point x=${this.x} y=${this.y}]`;
  }
  static get shared() {
    return (Zi.x = 0), (Zi.y = 0), Zi;
  }
}
const Zi = new Rt();
class tt {
  constructor(t = 1, e = 0, s = 0, n = 1, r = 0, o = 0) {
    (this.array = null),
      (this.a = t),
      (this.b = e),
      (this.c = s),
      (this.d = n),
      (this.tx = r),
      (this.ty = o);
  }
  fromArray(t) {
    (this.a = t[0]),
      (this.b = t[1]),
      (this.c = t[3]),
      (this.d = t[4]),
      (this.tx = t[2]),
      (this.ty = t[5]);
  }
  set(t, e, s, n, r, o) {
    return (
      (this.a = t),
      (this.b = e),
      (this.c = s),
      (this.d = n),
      (this.tx = r),
      (this.ty = o),
      this
    );
  }
  toArray(t, e) {
    this.array || (this.array = new Float32Array(9));
    const s = e || this.array;
    return (
      t
        ? ((s[0] = this.a),
          (s[1] = this.b),
          (s[2] = 0),
          (s[3] = this.c),
          (s[4] = this.d),
          (s[5] = 0),
          (s[6] = this.tx),
          (s[7] = this.ty),
          (s[8] = 1))
        : ((s[0] = this.a),
          (s[1] = this.c),
          (s[2] = this.tx),
          (s[3] = this.b),
          (s[4] = this.d),
          (s[5] = this.ty),
          (s[6] = 0),
          (s[7] = 0),
          (s[8] = 1)),
      s
    );
  }
  apply(t, e) {
    e = e || new Rt();
    const s = t.x,
      n = t.y;
    return (
      (e.x = this.a * s + this.c * n + this.tx),
      (e.y = this.b * s + this.d * n + this.ty),
      e
    );
  }
  applyInverse(t, e) {
    e = e || new Rt();
    const s = this.a,
      n = this.b,
      r = this.c,
      o = this.d,
      A = this.tx,
      h = this.ty,
      l = 1 / (s * o + r * -n),
      d = t.x,
      a = t.y;
    return (
      (e.x = o * l * d + -r * l * a + (h * r - A * o) * l),
      (e.y = s * l * a + -n * l * d + (-h * s + A * n) * l),
      e
    );
  }
  translate(t, e) {
    return (this.tx += t), (this.ty += e), this;
  }
  scale(t, e) {
    return (
      (this.a *= t),
      (this.d *= e),
      (this.c *= t),
      (this.b *= e),
      (this.tx *= t),
      (this.ty *= e),
      this
    );
  }
  rotate(t) {
    const e = Math.cos(t),
      s = Math.sin(t),
      n = this.a,
      r = this.c,
      o = this.tx;
    return (
      (this.a = n * e - this.b * s),
      (this.b = n * s + this.b * e),
      (this.c = r * e - this.d * s),
      (this.d = r * s + this.d * e),
      (this.tx = o * e - this.ty * s),
      (this.ty = o * s + this.ty * e),
      this
    );
  }
  append(t) {
    const e = this.a,
      s = this.b,
      n = this.c,
      r = this.d;
    return (
      (this.a = t.a * e + t.b * n),
      (this.b = t.a * s + t.b * r),
      (this.c = t.c * e + t.d * n),
      (this.d = t.c * s + t.d * r),
      (this.tx = t.tx * e + t.ty * n + this.tx),
      (this.ty = t.tx * s + t.ty * r + this.ty),
      this
    );
  }
  appendFrom(t, e) {
    const s = t.a,
      n = t.b,
      r = t.c,
      o = t.d,
      A = t.tx,
      h = t.ty,
      l = e.a,
      d = e.b,
      a = e.c,
      c = e.d;
    return (
      (this.a = s * l + n * a),
      (this.b = s * d + n * c),
      (this.c = r * l + o * a),
      (this.d = r * d + o * c),
      (this.tx = A * l + h * a + e.tx),
      (this.ty = A * d + h * c + e.ty),
      this
    );
  }
  setTransform(t, e, s, n, r, o, A, h, l) {
    return (
      (this.a = Math.cos(A + l) * r),
      (this.b = Math.sin(A + l) * r),
      (this.c = -Math.sin(A - h) * o),
      (this.d = Math.cos(A - h) * o),
      (this.tx = t - (s * this.a + n * this.c)),
      (this.ty = e - (s * this.b + n * this.d)),
      this
    );
  }
  prepend(t) {
    const e = this.tx;
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const s = this.a,
        n = this.c;
      (this.a = s * t.a + this.b * t.c),
        (this.b = s * t.b + this.b * t.d),
        (this.c = n * t.a + this.d * t.c),
        (this.d = n * t.b + this.d * t.d);
    }
    return (
      (this.tx = e * t.a + this.ty * t.c + t.tx),
      (this.ty = e * t.b + this.ty * t.d + t.ty),
      this
    );
  }
  decompose(t) {
    const e = this.a,
      s = this.b,
      n = this.c,
      r = this.d,
      o = t.pivot,
      A = -Math.atan2(-n, r),
      h = Math.atan2(s, e),
      l = Math.abs(A + h);
    return (
      l < 1e-5 || Math.abs(Ta - l) < 1e-5
        ? ((t.rotation = h), (t.skew.x = t.skew.y = 0))
        : ((t.rotation = 0), (t.skew.x = A), (t.skew.y = h)),
      (t.scale.x = Math.sqrt(e * e + s * s)),
      (t.scale.y = Math.sqrt(n * n + r * r)),
      (t.position.x = this.tx + (o.x * e + o.y * n)),
      (t.position.y = this.ty + (o.x * s + o.y * r)),
      t
    );
  }
  invert() {
    const t = this.a,
      e = this.b,
      s = this.c,
      n = this.d,
      r = this.tx,
      o = t * n - e * s;
    return (
      (this.a = n / o),
      (this.b = -e / o),
      (this.c = -s / o),
      (this.d = t / o),
      (this.tx = (s * this.ty - n * r) / o),
      (this.ty = -(t * this.ty - e * r) / o),
      this
    );
  }
  isIdentity() {
    return (
      this.a === 1 &&
      this.b === 0 &&
      this.c === 0 &&
      this.d === 1 &&
      this.tx === 0 &&
      this.ty === 0
    );
  }
  identity() {
    return (
      (this.a = 1),
      (this.b = 0),
      (this.c = 0),
      (this.d = 1),
      (this.tx = 0),
      (this.ty = 0),
      this
    );
  }
  clone() {
    const t = new tt();
    return (
      (t.a = this.a),
      (t.b = this.b),
      (t.c = this.c),
      (t.d = this.d),
      (t.tx = this.tx),
      (t.ty = this.ty),
      t
    );
  }
  copyTo(t) {
    return (
      (t.a = this.a),
      (t.b = this.b),
      (t.c = this.c),
      (t.d = this.d),
      (t.tx = this.tx),
      (t.ty = this.ty),
      t
    );
  }
  copyFrom(t) {
    return (
      (this.a = t.a),
      (this.b = t.b),
      (this.c = t.c),
      (this.d = t.d),
      (this.tx = t.tx),
      (this.ty = t.ty),
      this
    );
  }
  equals(t) {
    return (
      t.a === this.a &&
      t.b === this.b &&
      t.c === this.c &&
      t.d === this.d &&
      t.tx === this.tx &&
      t.ty === this.ty
    );
  }
  toString() {
    return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  static get IDENTITY() {
    return Na.identity();
  }
  static get shared() {
    return Ua.identity();
  }
}
const Ua = new tt(),
  Na = new tt(),
  Re = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
  Fe = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
  Te = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
  ke = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
  Ss = [],
  qr = [],
  yi = Math.sign;
function Oa() {
  for (let i = 0; i < 16; i++) {
    const t = [];
    Ss.push(t);
    for (let e = 0; e < 16; e++) {
      const s = yi(Re[i] * Re[e] + Te[i] * Fe[e]),
        n = yi(Fe[i] * Re[e] + ke[i] * Fe[e]),
        r = yi(Re[i] * Te[e] + Te[i] * ke[e]),
        o = yi(Fe[i] * Te[e] + ke[i] * ke[e]);
      for (let A = 0; A < 16; A++)
        if (Re[A] === s && Fe[A] === n && Te[A] === r && ke[A] === o) {
          t.push(A);
          break;
        }
    }
  }
  for (let i = 0; i < 16; i++) {
    const t = new tt();
    t.set(Re[i], Fe[i], Te[i], ke[i], 0, 0), qr.push(t);
  }
}
Oa();
const mt = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
    MIRROR_VERTICAL: 8,
    MAIN_DIAGONAL: 10,
    MIRROR_HORIZONTAL: 12,
    REVERSE_DIAGONAL: 14,
    uX: (i) => Re[i],
    uY: (i) => Fe[i],
    vX: (i) => Te[i],
    vY: (i) => ke[i],
    inv: (i) => (i & 8 ? i & 15 : -i & 7),
    add: (i, t) => Ss[i][t],
    sub: (i, t) => Ss[i][mt.inv(t)],
    rotate180: (i) => i ^ 4,
    isVertical: (i) => (i & 3) === 2,
    byDirection: (i, t) =>
      Math.abs(i) * 2 <= Math.abs(t)
        ? t >= 0
          ? mt.S
          : mt.N
        : Math.abs(t) * 2 <= Math.abs(i)
          ? i > 0
            ? mt.E
            : mt.W
          : t > 0
            ? i > 0
              ? mt.SE
              : mt.SW
            : i > 0
              ? mt.NE
              : mt.NW,
    matrixAppendRotationInv: (i, t, e = 0, s = 0) => {
      const n = qr[mt.inv(t)];
      (n.tx = e), (n.ty = s), i.append(n);
    },
  },
  Ci = [new Rt(), new Rt(), new Rt(), new Rt()];
class Bt {
  constructor(t = 0, e = 0, s = 0, n = 0) {
    (this.type = "rectangle"),
      (this.x = Number(t)),
      (this.y = Number(e)),
      (this.width = Number(s)),
      (this.height = Number(n));
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
  static get EMPTY() {
    return new Bt(0, 0, 0, 0);
  }
  clone() {
    return new Bt(this.x, this.y, this.width, this.height);
  }
  copyFromBounds(t) {
    return (
      (this.x = t.minX),
      (this.y = t.minY),
      (this.width = t.maxX - t.minX),
      (this.height = t.maxY - t.minY),
      this
    );
  }
  copyFrom(t) {
    return (
      (this.x = t.x),
      (this.y = t.y),
      (this.width = t.width),
      (this.height = t.height),
      this
    );
  }
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  contains(t, e) {
    return this.width <= 0 || this.height <= 0
      ? !1
      : t >= this.x &&
          t < this.x + this.width &&
          e >= this.y &&
          e < this.y + this.height;
  }
  strokeContains(t, e, s, n = 0.5) {
    const { width: r, height: o } = this;
    if (r <= 0 || o <= 0) return !1;
    const A = this.x,
      h = this.y,
      l = s * (1 - n),
      d = s - l,
      a = A - l,
      c = A + r + l,
      u = h - l,
      g = h + o + l,
      y = A + d,
      m = A + r - d,
      C = h + d,
      w = h + o - d;
    return (
      t >= a &&
      t <= c &&
      e >= u &&
      e <= g &&
      !(t > y && t < m && e > C && e < w)
    );
  }
  intersects(t, e) {
    if (!e) {
      const W = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= W) return !1;
      const L = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > L;
    }
    const s = this.left,
      n = this.right,
      r = this.top,
      o = this.bottom;
    if (n <= s || o <= r) return !1;
    const A = Ci[0].set(t.left, t.top),
      h = Ci[1].set(t.left, t.bottom),
      l = Ci[2].set(t.right, t.top),
      d = Ci[3].set(t.right, t.bottom);
    if (l.x <= A.x || h.y <= A.y) return !1;
    const a = Math.sign(e.a * e.d - e.b * e.c);
    if (
      a === 0 ||
      (e.apply(A, A),
      e.apply(h, h),
      e.apply(l, l),
      e.apply(d, d),
      Math.max(A.x, h.x, l.x, d.x) <= s ||
        Math.min(A.x, h.x, l.x, d.x) >= n ||
        Math.max(A.y, h.y, l.y, d.y) <= r ||
        Math.min(A.y, h.y, l.y, d.y) >= o)
    )
      return !1;
    const c = a * (h.y - A.y),
      u = a * (A.x - h.x),
      g = c * s + u * r,
      y = c * n + u * r,
      m = c * s + u * o,
      C = c * n + u * o;
    if (
      Math.max(g, y, m, C) <= c * A.x + u * A.y ||
      Math.min(g, y, m, C) >= c * d.x + u * d.y
    )
      return !1;
    const w = a * (A.y - l.y),
      E = a * (l.x - A.x),
      I = w * s + E * r,
      U = w * n + E * r,
      D = w * s + E * o,
      F = w * n + E * o;
    return !(
      Math.max(I, U, D, F) <= w * A.x + E * A.y ||
      Math.min(I, U, D, F) >= w * d.x + E * d.y
    );
  }
  pad(t = 0, e = t) {
    return (
      (this.x -= t),
      (this.y -= e),
      (this.width += t * 2),
      (this.height += e * 2),
      this
    );
  }
  fit(t) {
    const e = Math.max(this.x, t.x),
      s = Math.min(this.x + this.width, t.x + t.width),
      n = Math.max(this.y, t.y),
      r = Math.min(this.y + this.height, t.y + t.height);
    return (
      (this.x = e),
      (this.width = Math.max(s - e, 0)),
      (this.y = n),
      (this.height = Math.max(r - n, 0)),
      this
    );
  }
  ceil(t = 1, e = 0.001) {
    const s = Math.ceil((this.x + this.width - e) * t) / t,
      n = Math.ceil((this.y + this.height - e) * t) / t;
    return (
      (this.x = Math.floor((this.x + e) * t) / t),
      (this.y = Math.floor((this.y + e) * t) / t),
      (this.width = s - this.x),
      (this.height = n - this.y),
      this
    );
  }
  enlarge(t) {
    const e = Math.min(this.x, t.x),
      s = Math.max(this.x + this.width, t.x + t.width),
      n = Math.min(this.y, t.y),
      r = Math.max(this.y + this.height, t.y + t.height);
    return (
      (this.x = e),
      (this.width = s - e),
      (this.y = n),
      (this.height = r - n),
      this
    );
  }
  getBounds(t) {
    return t || (t = new Bt()), t.copyFrom(this), t;
  }
  containsRect(t) {
    if (this.width <= 0 || this.height <= 0) return !1;
    const e = t.x,
      s = t.y,
      n = t.x + t.width,
      r = t.y + t.height;
    return (
      e >= this.x &&
      e < this.x + this.width &&
      s >= this.y &&
      s < this.y + this.height &&
      n >= this.x &&
      n < this.x + this.width &&
      r >= this.y &&
      r < this.y + this.height
    );
  }
  toString() {
    return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}
const Wi = { default: -1 };
function It(i = "default") {
  return Wi[i] === void 0 && (Wi[i] = -1), ++Wi[i];
}
const Mn = {},
  dt = "8.0.0",
  ja = "8.3.4";
function it(i, t, e = 3) {
  if (Mn[t]) return;
  let s = new Error().stack;
  typeof s > "u"
    ? console.warn(
        "PixiJS Deprecation Warning: ",
        `${t}
Deprecated since v${i}`,
      )
    : ((s = s
        .split(
          `
`,
        )
        .splice(e).join(`
`)),
      console.groupCollapsed
        ? (console.groupCollapsed(
            "%cPixiJS Deprecation Warning: %c%s",
            "color:#614108;background:#fffbe6",
            "font-weight:normal;color:#614108;background:#fffbe6",
            `${t}
Deprecated since v${i}`,
          ),
          console.warn(s),
          console.groupEnd())
        : (console.warn(
            "PixiJS Deprecation Warning: ",
            `${t}
Deprecated since v${i}`,
          ),
          console.warn(s))),
    (Mn[t] = !0);
}
const Zr = () => {};
function ki(i) {
  return (
    (i += i === 0 ? 1 : 0),
    --i,
    (i |= i >>> 1),
    (i |= i >>> 2),
    (i |= i >>> 4),
    (i |= i >>> 8),
    (i |= i >>> 16),
    i + 1
  );
}
function Sn(i) {
  return !(i & (i - 1)) && !!i;
}
function Wr(i) {
  const t = {};
  for (const e in i) i[e] !== void 0 && (t[e] = i[e]);
  return t;
}
const Qn = Object.create(null);
function za(i) {
  const t = Qn[i];
  return t === void 0 && (Qn[i] = It("resource")), t;
}
const Kr = class Jr extends Jt {
  constructor(t = {}) {
    super(),
      (this._resourceType = "textureSampler"),
      (this._touched = 0),
      (this._maxAnisotropy = 1),
      (this.destroyed = !1),
      (t = { ...Jr.defaultOptions, ...t }),
      (this.addressMode = t.addressMode),
      (this.addressModeU = t.addressModeU ?? this.addressModeU),
      (this.addressModeV = t.addressModeV ?? this.addressModeV),
      (this.addressModeW = t.addressModeW ?? this.addressModeW),
      (this.scaleMode = t.scaleMode),
      (this.magFilter = t.magFilter ?? this.magFilter),
      (this.minFilter = t.minFilter ?? this.minFilter),
      (this.mipmapFilter = t.mipmapFilter ?? this.mipmapFilter),
      (this.lodMinClamp = t.lodMinClamp),
      (this.lodMaxClamp = t.lodMaxClamp),
      (this.compare = t.compare),
      (this.maxAnisotropy = t.maxAnisotropy ?? 1);
  }
  set addressMode(t) {
    (this.addressModeU = t), (this.addressModeV = t), (this.addressModeW = t);
  }
  get addressMode() {
    return this.addressModeU;
  }
  set wrapMode(t) {
    it(dt, "TextureStyle.wrapMode is now TextureStyle.addressMode"),
      (this.addressMode = t);
  }
  get wrapMode() {
    return this.addressMode;
  }
  set scaleMode(t) {
    (this.magFilter = t), (this.minFilter = t), (this.mipmapFilter = t);
  }
  get scaleMode() {
    return this.magFilter;
  }
  set maxAnisotropy(t) {
    (this._maxAnisotropy = Math.min(t, 16)),
      this._maxAnisotropy > 1 && (this.scaleMode = "linear");
  }
  get maxAnisotropy() {
    return this._maxAnisotropy;
  }
  get _resourceId() {
    return this._sharedResourceId || this._generateResourceId();
  }
  update() {
    this.emit("change", this), (this._sharedResourceId = null);
  }
  _generateResourceId() {
    const t = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
    return (this._sharedResourceId = za(t)), this._resourceId;
  }
  destroy() {
    (this.destroyed = !0),
      this.emit("destroy", this),
      this.emit("change", this),
      this.removeAllListeners();
  }
};
Kr.defaultOptions = { addressMode: "clamp-to-edge", scaleMode: "linear" };
let La = Kr;
const $r = class to extends Jt {
  constructor(t = {}) {
    super(),
      (this.options = t),
      (this.uid = It("textureSource")),
      (this._resourceType = "textureSource"),
      (this._resourceId = It("resource")),
      (this.uploadMethodId = "unknown"),
      (this._resolution = 1),
      (this.pixelWidth = 1),
      (this.pixelHeight = 1),
      (this.width = 1),
      (this.height = 1),
      (this.sampleCount = 1),
      (this.mipLevelCount = 1),
      (this.autoGenerateMipmaps = !1),
      (this.format = "rgba8unorm"),
      (this.dimension = "2d"),
      (this.antialias = !1),
      (this._touched = 0),
      (this._batchTick = -1),
      (this._textureBindLocation = -1),
      (t = { ...to.defaultOptions, ...t }),
      (this.label = t.label ?? ""),
      (this.resource = t.resource),
      (this.autoGarbageCollect = t.autoGarbageCollect),
      (this._resolution = t.resolution),
      t.width
        ? (this.pixelWidth = t.width * this._resolution)
        : (this.pixelWidth = this.resource ? (this.resourceWidth ?? 1) : 1),
      t.height
        ? (this.pixelHeight = t.height * this._resolution)
        : (this.pixelHeight = this.resource ? (this.resourceHeight ?? 1) : 1),
      (this.width = this.pixelWidth / this._resolution),
      (this.height = this.pixelHeight / this._resolution),
      (this.format = t.format),
      (this.dimension = t.dimensions),
      (this.mipLevelCount = t.mipLevelCount),
      (this.autoGenerateMipmaps = t.autoGenerateMipmaps),
      (this.sampleCount = t.sampleCount),
      (this.antialias = t.antialias),
      (this.alphaMode = t.alphaMode),
      (this.style = new La(Wr(t))),
      (this.destroyed = !1),
      this._refreshPOT();
  }
  get source() {
    return this;
  }
  get style() {
    return this._style;
  }
  set style(t) {
    var e, s;
    this.style !== t &&
      ((e = this._style) == null || e.off("change", this._onStyleChange, this),
      (this._style = t),
      (s = this._style) == null || s.on("change", this._onStyleChange, this),
      this._onStyleChange());
  }
  get addressMode() {
    return this._style.addressMode;
  }
  set addressMode(t) {
    this._style.addressMode = t;
  }
  get repeatMode() {
    return this._style.addressMode;
  }
  set repeatMode(t) {
    this._style.addressMode = t;
  }
  get magFilter() {
    return this._style.magFilter;
  }
  set magFilter(t) {
    this._style.magFilter = t;
  }
  get minFilter() {
    return this._style.minFilter;
  }
  set minFilter(t) {
    this._style.minFilter = t;
  }
  get mipmapFilter() {
    return this._style.mipmapFilter;
  }
  set mipmapFilter(t) {
    this._style.mipmapFilter = t;
  }
  get lodMinClamp() {
    return this._style.lodMinClamp;
  }
  set lodMinClamp(t) {
    this._style.lodMinClamp = t;
  }
  get lodMaxClamp() {
    return this._style.lodMaxClamp;
  }
  set lodMaxClamp(t) {
    this._style.lodMaxClamp = t;
  }
  _onStyleChange() {
    this.emit("styleChange", this);
  }
  update() {
    if (this.resource) {
      const t = this._resolution;
      if (this.resize(this.resourceWidth / t, this.resourceHeight / t)) return;
    }
    this.emit("update", this);
  }
  destroy() {
    (this.destroyed = !0),
      this.emit("destroy", this),
      this.emit("change", this),
      this._style && (this._style.destroy(), (this._style = null)),
      (this.uploadMethodId = null),
      (this.resource = null),
      this.removeAllListeners();
  }
  unload() {
    (this._resourceId = It("resource")),
      this.emit("change", this),
      this.emit("unload", this);
  }
  get resourceWidth() {
    const { resource: t } = this;
    return t.naturalWidth || t.videoWidth || t.displayWidth || t.width;
  }
  get resourceHeight() {
    const { resource: t } = this;
    return t.naturalHeight || t.videoHeight || t.displayHeight || t.height;
  }
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._resolution !== t &&
      ((this._resolution = t),
      (this.width = this.pixelWidth / t),
      (this.height = this.pixelHeight / t));
  }
  resize(t, e, s) {
    s || (s = this._resolution), t || (t = this.width), e || (e = this.height);
    const n = Math.round(t * s),
      r = Math.round(e * s);
    return (
      (this.width = n / s),
      (this.height = r / s),
      (this._resolution = s),
      this.pixelWidth === n && this.pixelHeight === r
        ? !1
        : (this._refreshPOT(),
          (this.pixelWidth = n),
          (this.pixelHeight = r),
          this.emit("resize", this),
          (this._resourceId = It("resource")),
          this.emit("change", this),
          !0)
    );
  }
  updateMipmaps() {
    this.autoGenerateMipmaps &&
      this.mipLevelCount > 1 &&
      this.emit("updateMipmaps", this);
  }
  set wrapMode(t) {
    this._style.wrapMode = t;
  }
  get wrapMode() {
    return this._style.wrapMode;
  }
  set scaleMode(t) {
    this._style.scaleMode = t;
  }
  get scaleMode() {
    return this._style.scaleMode;
  }
  _refreshPOT() {
    this.isPowerOfTwo = Sn(this.pixelWidth) && Sn(this.pixelHeight);
  }
  static test(t) {
    throw new Error("Unimplemented");
  }
};
$r.defaultOptions = {
  resolution: 1,
  format: "bgra8unorm",
  alphaMode: "premultiply-alpha-on-upload",
  dimensions: "2d",
  mipLevelCount: 1,
  autoGenerateMipmaps: !1,
  sampleCount: 1,
  antialias: !1,
  autoGarbageCollect: !1,
};
let le = $r;
class en extends le {
  constructor(t) {
    const e = t.resource || new Float32Array(t.width * t.height * 4);
    let s = t.format;
    s ||
      (e instanceof Float32Array
        ? (s = "rgba32float")
        : e instanceof Int32Array || e instanceof Uint32Array
          ? (s = "rgba32uint")
          : e instanceof Int16Array || e instanceof Uint16Array
            ? (s = "rgba16uint")
            : (e instanceof Int8Array, (s = "bgra8unorm"))),
      super({ ...t, resource: e, format: s }),
      (this.uploadMethodId = "buffer");
  }
  static test(t) {
    return (
      t instanceof Int8Array ||
      t instanceof Uint8Array ||
      t instanceof Uint8ClampedArray ||
      t instanceof Int16Array ||
      t instanceof Uint16Array ||
      t instanceof Int32Array ||
      t instanceof Uint32Array ||
      t instanceof Float32Array
    );
  }
}
en.extension = Y.TextureSource;
const Dn = new tt();
class Ha {
  constructor(t, e) {
    (this.mapCoord = new tt()),
      (this.uClampFrame = new Float32Array(4)),
      (this.uClampOffset = new Float32Array(2)),
      (this._textureID = -1),
      (this._updateID = 0),
      (this.clampOffset = 0),
      typeof e > "u"
        ? (this.clampMargin = t.width < 10 ? 0 : 0.5)
        : (this.clampMargin = e),
      (this.isSimple = !1),
      (this.texture = t);
  }
  get texture() {
    return this._texture;
  }
  set texture(t) {
    var e;
    this.texture !== t &&
      ((e = this._texture) == null ||
        e.removeListener("update", this.update, this),
      (this._texture = t),
      this._texture.addListener("update", this.update, this),
      this.update());
  }
  multiplyUvs(t, e) {
    e === void 0 && (e = t);
    const s = this.mapCoord;
    for (let n = 0; n < t.length; n += 2) {
      const r = t[n],
        o = t[n + 1];
      (e[n] = r * s.a + o * s.c + s.tx), (e[n + 1] = r * s.b + o * s.d + s.ty);
    }
    return e;
  }
  update() {
    const t = this._texture;
    this._updateID++;
    const e = t.uvs;
    this.mapCoord.set(
      e.x1 - e.x0,
      e.y1 - e.y0,
      e.x3 - e.x0,
      e.y3 - e.y0,
      e.x0,
      e.y0,
    );
    const s = t.orig,
      n = t.trim;
    n &&
      (Dn.set(
        s.width / n.width,
        0,
        0,
        s.height / n.height,
        -n.x / n.width,
        -n.y / n.height,
      ),
      this.mapCoord.append(Dn));
    const r = t.source,
      o = this.uClampFrame,
      A = this.clampMargin / r._resolution,
      h = this.clampOffset / r._resolution;
    return (
      (o[0] = (t.frame.x + A + h) / r.width),
      (o[1] = (t.frame.y + A + h) / r.height),
      (o[2] = (t.frame.x + t.frame.width - A + h) / r.width),
      (o[3] = (t.frame.y + t.frame.height - A + h) / r.height),
      (this.uClampOffset[0] = this.clampOffset / r.pixelWidth),
      (this.uClampOffset[1] = this.clampOffset / r.pixelHeight),
      (this.isSimple =
        t.frame.width === r.width &&
        t.frame.height === r.height &&
        t.rotate === 0),
      !0
    );
  }
}
class $ extends Jt {
  constructor({
    source: t,
    label: e,
    frame: s,
    orig: n,
    trim: r,
    defaultAnchor: o,
    defaultBorders: A,
    rotate: h,
    dynamic: l,
  } = {}) {
    if (
      (super(),
      (this.uid = It("texture")),
      (this.uvs = { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }),
      (this.frame = new Bt()),
      (this.noFrame = !1),
      (this.dynamic = !1),
      (this.isTexture = !0),
      (this.label = e),
      (this.source = (t == null ? void 0 : t.source) ?? new le()),
      (this.noFrame = !s),
      s)
    )
      this.frame.copyFrom(s);
    else {
      const { width: d, height: a } = this._source;
      (this.frame.width = d), (this.frame.height = a);
    }
    (this.orig = n || this.frame),
      (this.trim = r),
      (this.rotate = h ?? 0),
      (this.defaultAnchor = o),
      (this.defaultBorders = A),
      (this.destroyed = !1),
      (this.dynamic = l || !1),
      this.updateUvs();
  }
  set source(t) {
    this._source && this._source.off("resize", this.update, this),
      (this._source = t),
      t.on("resize", this.update, this),
      this.emit("update", this);
  }
  get source() {
    return this._source;
  }
  get textureMatrix() {
    return (
      this._textureMatrix || (this._textureMatrix = new Ha(this)),
      this._textureMatrix
    );
  }
  get width() {
    return this.orig.width;
  }
  get height() {
    return this.orig.height;
  }
  updateUvs() {
    const { uvs: t, frame: e } = this,
      { width: s, height: n } = this._source,
      r = e.x / s,
      o = e.y / n,
      A = e.width / s,
      h = e.height / n;
    let l = this.rotate;
    if (l) {
      const d = A / 2,
        a = h / 2,
        c = r + d,
        u = o + a;
      (l = mt.add(l, mt.NW)),
        (t.x0 = c + d * mt.uX(l)),
        (t.y0 = u + a * mt.uY(l)),
        (l = mt.add(l, 2)),
        (t.x1 = c + d * mt.uX(l)),
        (t.y1 = u + a * mt.uY(l)),
        (l = mt.add(l, 2)),
        (t.x2 = c + d * mt.uX(l)),
        (t.y2 = u + a * mt.uY(l)),
        (l = mt.add(l, 2)),
        (t.x3 = c + d * mt.uX(l)),
        (t.y3 = u + a * mt.uY(l));
    } else
      (t.x0 = r),
        (t.y0 = o),
        (t.x1 = r + A),
        (t.y1 = o),
        (t.x2 = r + A),
        (t.y2 = o + h),
        (t.x3 = r),
        (t.y3 = o + h);
  }
  destroy(t = !1) {
    this._source && t && (this._source.destroy(), (this._source = null)),
      (this._textureMatrix = null),
      (this.destroyed = !0),
      this.emit("destroy", this),
      this.removeAllListeners();
  }
  update() {
    this.noFrame &&
      ((this.frame.width = this._source.width),
      (this.frame.height = this._source.height)),
      this.updateUvs(),
      this.emit("update", this);
  }
  get baseTexture() {
    return it(dt, "Texture.baseTexture is now Texture.source"), this._source;
  }
}
$.EMPTY = new $({ label: "EMPTY", source: new le({ label: "EMPTY" }) });
$.EMPTY.destroy = Zr;
$.WHITE = new $({
  source: new en({
    resource: new Uint8Array([255, 255, 255, 255]),
    width: 1,
    height: 1,
    alphaMode: "premultiply-alpha-on-upload",
    label: "WHITE",
  }),
  label: "WHITE",
});
$.WHITE.destroy = Zr;
function Ya(i, t, e) {
  const { width: s, height: n } = e.orig,
    r = e.trim;
  if (r) {
    const o = r.width,
      A = r.height;
    (i.minX = r.x - t._x * s),
      (i.maxX = i.minX + o),
      (i.minY = r.y - t._y * n),
      (i.maxY = i.minY + A);
  } else
    (i.minX = -t._x * s),
      (i.maxX = i.minX + s),
      (i.minY = -t._y * n),
      (i.maxY = i.minY + n);
}
const Pn = new tt();
class Wt {
  constructor(t = 1 / 0, e = 1 / 0, s = -1 / 0, n = -1 / 0) {
    (this.minX = 1 / 0),
      (this.minY = 1 / 0),
      (this.maxX = -1 / 0),
      (this.maxY = -1 / 0),
      (this.matrix = Pn),
      (this.minX = t),
      (this.minY = e),
      (this.maxX = s),
      (this.maxY = n);
  }
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  get rectangle() {
    this._rectangle || (this._rectangle = new Bt());
    const t = this._rectangle;
    return (
      this.minX > this.maxX || this.minY > this.maxY
        ? ((t.x = 0), (t.y = 0), (t.width = 0), (t.height = 0))
        : t.copyFromBounds(this),
      t
    );
  }
  clear() {
    return (
      (this.minX = 1 / 0),
      (this.minY = 1 / 0),
      (this.maxX = -1 / 0),
      (this.maxY = -1 / 0),
      (this.matrix = Pn),
      this
    );
  }
  set(t, e, s, n) {
    (this.minX = t), (this.minY = e), (this.maxX = s), (this.maxY = n);
  }
  addFrame(t, e, s, n, r) {
    r || (r = this.matrix);
    const o = r.a,
      A = r.b,
      h = r.c,
      l = r.d,
      d = r.tx,
      a = r.ty;
    let c = this.minX,
      u = this.minY,
      g = this.maxX,
      y = this.maxY,
      m = o * t + h * e + d,
      C = A * t + l * e + a;
    m < c && (c = m),
      C < u && (u = C),
      m > g && (g = m),
      C > y && (y = C),
      (m = o * s + h * e + d),
      (C = A * s + l * e + a),
      m < c && (c = m),
      C < u && (u = C),
      m > g && (g = m),
      C > y && (y = C),
      (m = o * t + h * n + d),
      (C = A * t + l * n + a),
      m < c && (c = m),
      C < u && (u = C),
      m > g && (g = m),
      C > y && (y = C),
      (m = o * s + h * n + d),
      (C = A * s + l * n + a),
      m < c && (c = m),
      C < u && (u = C),
      m > g && (g = m),
      C > y && (y = C),
      (this.minX = c),
      (this.minY = u),
      (this.maxX = g),
      (this.maxY = y);
  }
  addRect(t, e) {
    this.addFrame(t.x, t.y, t.x + t.width, t.y + t.height, e);
  }
  addBounds(t, e) {
    this.addFrame(t.minX, t.minY, t.maxX, t.maxY, e);
  }
  addBoundsMask(t) {
    (this.minX = this.minX > t.minX ? this.minX : t.minX),
      (this.minY = this.minY > t.minY ? this.minY : t.minY),
      (this.maxX = this.maxX < t.maxX ? this.maxX : t.maxX),
      (this.maxY = this.maxY < t.maxY ? this.maxY : t.maxY);
  }
  applyMatrix(t) {
    const e = this.minX,
      s = this.minY,
      n = this.maxX,
      r = this.maxY,
      { a: o, b: A, c: h, d: l, tx: d, ty: a } = t;
    let c = o * e + h * s + d,
      u = A * e + l * s + a;
    (this.minX = c),
      (this.minY = u),
      (this.maxX = c),
      (this.maxY = u),
      (c = o * n + h * s + d),
      (u = A * n + l * s + a),
      (this.minX = c < this.minX ? c : this.minX),
      (this.minY = u < this.minY ? u : this.minY),
      (this.maxX = c > this.maxX ? c : this.maxX),
      (this.maxY = u > this.maxY ? u : this.maxY),
      (c = o * e + h * r + d),
      (u = A * e + l * r + a),
      (this.minX = c < this.minX ? c : this.minX),
      (this.minY = u < this.minY ? u : this.minY),
      (this.maxX = c > this.maxX ? c : this.maxX),
      (this.maxY = u > this.maxY ? u : this.maxY),
      (c = o * n + h * r + d),
      (u = A * n + l * r + a),
      (this.minX = c < this.minX ? c : this.minX),
      (this.minY = u < this.minY ? u : this.minY),
      (this.maxX = c > this.maxX ? c : this.maxX),
      (this.maxY = u > this.maxY ? u : this.maxY);
  }
  fit(t) {
    return (
      this.minX < t.left && (this.minX = t.left),
      this.maxX > t.right && (this.maxX = t.right),
      this.minY < t.top && (this.minY = t.top),
      this.maxY > t.bottom && (this.maxY = t.bottom),
      this
    );
  }
  fitBounds(t, e, s, n) {
    return (
      this.minX < t && (this.minX = t),
      this.maxX > e && (this.maxX = e),
      this.minY < s && (this.minY = s),
      this.maxY > n && (this.maxY = n),
      this
    );
  }
  pad(t, e = t) {
    return (
      (this.minX -= t),
      (this.maxX += t),
      (this.minY -= e),
      (this.maxY += e),
      this
    );
  }
  ceil() {
    return (
      (this.minX = Math.floor(this.minX)),
      (this.minY = Math.floor(this.minY)),
      (this.maxX = Math.ceil(this.maxX)),
      (this.maxY = Math.ceil(this.maxY)),
      this
    );
  }
  clone() {
    return new Wt(this.minX, this.minY, this.maxX, this.maxY);
  }
  scale(t, e = t) {
    return (
      (this.minX *= t),
      (this.minY *= e),
      (this.maxX *= t),
      (this.maxY *= e),
      this
    );
  }
  get x() {
    return this.minX;
  }
  set x(t) {
    const e = this.maxX - this.minX;
    (this.minX = t), (this.maxX = t + e);
  }
  get y() {
    return this.minY;
  }
  set y(t) {
    const e = this.maxY - this.minY;
    (this.minY = t), (this.maxY = t + e);
  }
  get width() {
    return this.maxX - this.minX;
  }
  set width(t) {
    this.maxX = this.minX + t;
  }
  get height() {
    return this.maxY - this.minY;
  }
  set height(t) {
    this.maxY = this.minY + t;
  }
  get left() {
    return this.minX;
  }
  get right() {
    return this.maxX;
  }
  get top() {
    return this.minY;
  }
  get bottom() {
    return this.maxY;
  }
  get isPositive() {
    return this.maxX - this.minX > 0 && this.maxY - this.minY > 0;
  }
  get isValid() {
    return this.minX + this.minY !== 1 / 0;
  }
  addVertexData(t, e, s, n) {
    let r = this.minX,
      o = this.minY,
      A = this.maxX,
      h = this.maxY;
    n || (n = this.matrix);
    const l = n.a,
      d = n.b,
      a = n.c,
      c = n.d,
      u = n.tx,
      g = n.ty;
    for (let y = e; y < s; y += 2) {
      const m = t[y],
        C = t[y + 1],
        w = l * m + a * C + u,
        E = d * m + c * C + g;
      (r = w < r ? w : r),
        (o = E < o ? E : o),
        (A = w > A ? w : A),
        (h = E > h ? E : h);
    }
    (this.minX = r), (this.minY = o), (this.maxX = A), (this.maxY = h);
  }
  containsPoint(t, e) {
    return this.minX <= t && this.minY <= e && this.maxX >= t && this.maxY >= e;
  }
  toString() {
    return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`;
  }
  copyFrom(t) {
    return (
      (this.minX = t.minX),
      (this.minY = t.minY),
      (this.maxX = t.maxX),
      (this.maxY = t.maxY),
      this
    );
  }
}
var Xa = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
  ue = function (i) {
    return typeof i == "string" ? i.length > 0 : typeof i == "number";
  },
  Qt = function (i, t, e) {
    return (
      t === void 0 && (t = 0),
      e === void 0 && (e = Math.pow(10, t)),
      Math.round(e * i) / e + 0
    );
  },
  Yt = function (i, t, e) {
    return (
      t === void 0 && (t = 0),
      e === void 0 && (e = 1),
      i > e ? e : i > t ? i : t
    );
  },
  eo = function (i) {
    return (i = isFinite(i) ? i % 360 : 0) > 0 ? i : i + 360;
  },
  Rn = function (i) {
    return {
      r: Yt(i.r, 0, 255),
      g: Yt(i.g, 0, 255),
      b: Yt(i.b, 0, 255),
      a: Yt(i.a),
    };
  },
  Ki = function (i) {
    return { r: Qt(i.r), g: Qt(i.g), b: Qt(i.b), a: Qt(i.a, 3) };
  },
  Va = /^#([0-9a-f]{3,8})$/i,
  xi = function (i) {
    var t = i.toString(16);
    return t.length < 2 ? "0" + t : t;
  },
  io = function (i) {
    var t = i.r,
      e = i.g,
      s = i.b,
      n = i.a,
      r = Math.max(t, e, s),
      o = r - Math.min(t, e, s),
      A = o
        ? r === t
          ? (e - s) / o
          : r === e
            ? 2 + (s - t) / o
            : 4 + (t - e) / o
        : 0;
    return {
      h: 60 * (A < 0 ? A + 6 : A),
      s: r ? (o / r) * 100 : 0,
      v: (r / 255) * 100,
      a: n,
    };
  },
  so = function (i) {
    var t = i.h,
      e = i.s,
      s = i.v,
      n = i.a;
    (t = (t / 360) * 6), (e /= 100), (s /= 100);
    var r = Math.floor(t),
      o = s * (1 - e),
      A = s * (1 - (t - r) * e),
      h = s * (1 - (1 - t + r) * e),
      l = r % 6;
    return {
      r: 255 * [s, A, o, o, h, s][l],
      g: 255 * [h, s, s, A, o, o][l],
      b: 255 * [o, o, h, s, s, A][l],
      a: n,
    };
  },
  Fn = function (i) {
    return { h: eo(i.h), s: Yt(i.s, 0, 100), l: Yt(i.l, 0, 100), a: Yt(i.a) };
  },
  Tn = function (i) {
    return { h: Qt(i.h), s: Qt(i.s), l: Qt(i.l), a: Qt(i.a, 3) };
  },
  kn = function (i) {
    return so(
      ((e = (t = i).s),
      {
        h: t.h,
        s:
          (e *= ((s = t.l) < 50 ? s : 100 - s) / 100) > 0
            ? ((2 * e) / (s + e)) * 100
            : 0,
        v: s + e,
        a: t.a,
      }),
    );
    var t, e, s;
  },
  li = function (i) {
    return {
      h: (t = io(i)).h,
      s:
        (n = ((200 - (e = t.s)) * (s = t.v)) / 100) > 0 && n < 200
          ? ((e * s) / 100 / (n <= 100 ? n : 200 - n)) * 100
          : 0,
      l: n / 2,
      a: t.a,
    };
    var t, e, s, n;
  },
  _a =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  qa =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  Za =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  Wa =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  Qs = {
    string: [
      [
        function (i) {
          var t = Va.exec(i);
          return t
            ? (i = t[1]).length <= 4
              ? {
                  r: parseInt(i[0] + i[0], 16),
                  g: parseInt(i[1] + i[1], 16),
                  b: parseInt(i[2] + i[2], 16),
                  a:
                    i.length === 4 ? Qt(parseInt(i[3] + i[3], 16) / 255, 2) : 1,
                }
              : i.length === 6 || i.length === 8
                ? {
                    r: parseInt(i.substr(0, 2), 16),
                    g: parseInt(i.substr(2, 2), 16),
                    b: parseInt(i.substr(4, 2), 16),
                    a:
                      i.length === 8
                        ? Qt(parseInt(i.substr(6, 2), 16) / 255, 2)
                        : 1,
                  }
                : null
            : null;
        },
        "hex",
      ],
      [
        function (i) {
          var t = Za.exec(i) || Wa.exec(i);
          return t
            ? t[2] !== t[4] || t[4] !== t[6]
              ? null
              : Rn({
                  r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                  g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                  b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                  a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1),
                })
            : null;
        },
        "rgb",
      ],
      [
        function (i) {
          var t = _a.exec(i) || qa.exec(i);
          if (!t) return null;
          var e,
            s,
            n = Fn({
              h:
                ((e = t[1]),
                (s = t[2]),
                s === void 0 && (s = "deg"),
                Number(e) * (Xa[s] || 1)),
              s: Number(t[3]),
              l: Number(t[4]),
              a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1),
            });
          return kn(n);
        },
        "hsl",
      ],
    ],
    object: [
      [
        function (i) {
          var t = i.r,
            e = i.g,
            s = i.b,
            n = i.a,
            r = n === void 0 ? 1 : n;
          return ue(t) && ue(e) && ue(s)
            ? Rn({ r: Number(t), g: Number(e), b: Number(s), a: Number(r) })
            : null;
        },
        "rgb",
      ],
      [
        function (i) {
          var t = i.h,
            e = i.s,
            s = i.l,
            n = i.a,
            r = n === void 0 ? 1 : n;
          if (!ue(t) || !ue(e) || !ue(s)) return null;
          var o = Fn({
            h: Number(t),
            s: Number(e),
            l: Number(s),
            a: Number(r),
          });
          return kn(o);
        },
        "hsl",
      ],
      [
        function (i) {
          var t = i.h,
            e = i.s,
            s = i.v,
            n = i.a,
            r = n === void 0 ? 1 : n;
          if (!ue(t) || !ue(e) || !ue(s)) return null;
          var o = (function (A) {
            return {
              h: eo(A.h),
              s: Yt(A.s, 0, 100),
              v: Yt(A.v, 0, 100),
              a: Yt(A.a),
            };
          })({ h: Number(t), s: Number(e), v: Number(s), a: Number(r) });
          return so(o);
        },
        "hsv",
      ],
    ],
  },
  Gn = function (i, t) {
    for (var e = 0; e < t.length; e++) {
      var s = t[e][0](i);
      if (s) return [s, t[e][1]];
    }
    return [null, void 0];
  },
  Ka = function (i) {
    return typeof i == "string"
      ? Gn(i.trim(), Qs.string)
      : typeof i == "object" && i !== null
        ? Gn(i, Qs.object)
        : [null, void 0];
  },
  Ji = function (i, t) {
    var e = li(i);
    return { h: e.h, s: Yt(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
  },
  $i = function (i) {
    return (299 * i.r + 587 * i.g + 114 * i.b) / 1e3 / 255;
  },
  Un = function (i, t) {
    var e = li(i);
    return { h: e.h, s: e.s, l: Yt(e.l + 100 * t, 0, 100), a: e.a };
  },
  Ds = (function () {
    function i(t) {
      (this.parsed = Ka(t)[0]),
        (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 });
    }
    return (
      (i.prototype.isValid = function () {
        return this.parsed !== null;
      }),
      (i.prototype.brightness = function () {
        return Qt($i(this.rgba), 2);
      }),
      (i.prototype.isDark = function () {
        return $i(this.rgba) < 0.5;
      }),
      (i.prototype.isLight = function () {
        return $i(this.rgba) >= 0.5;
      }),
      (i.prototype.toHex = function () {
        return (
          (t = Ki(this.rgba)),
          (e = t.r),
          (s = t.g),
          (n = t.b),
          (o = (r = t.a) < 1 ? xi(Qt(255 * r)) : ""),
          "#" + xi(e) + xi(s) + xi(n) + o
        );
        var t, e, s, n, r, o;
      }),
      (i.prototype.toRgb = function () {
        return Ki(this.rgba);
      }),
      (i.prototype.toRgbString = function () {
        return (
          (t = Ki(this.rgba)),
          (e = t.r),
          (s = t.g),
          (n = t.b),
          (r = t.a) < 1
            ? "rgba(" + e + ", " + s + ", " + n + ", " + r + ")"
            : "rgb(" + e + ", " + s + ", " + n + ")"
        );
        var t, e, s, n, r;
      }),
      (i.prototype.toHsl = function () {
        return Tn(li(this.rgba));
      }),
      (i.prototype.toHslString = function () {
        return (
          (t = Tn(li(this.rgba))),
          (e = t.h),
          (s = t.s),
          (n = t.l),
          (r = t.a) < 1
            ? "hsla(" + e + ", " + s + "%, " + n + "%, " + r + ")"
            : "hsl(" + e + ", " + s + "%, " + n + "%)"
        );
        var t, e, s, n, r;
      }),
      (i.prototype.toHsv = function () {
        return (
          (t = io(this.rgba)),
          { h: Qt(t.h), s: Qt(t.s), v: Qt(t.v), a: Qt(t.a, 3) }
        );
        var t;
      }),
      (i.prototype.invert = function () {
        return se({
          r: 255 - (t = this.rgba).r,
          g: 255 - t.g,
          b: 255 - t.b,
          a: t.a,
        });
        var t;
      }),
      (i.prototype.saturate = function (t) {
        return t === void 0 && (t = 0.1), se(Ji(this.rgba, t));
      }),
      (i.prototype.desaturate = function (t) {
        return t === void 0 && (t = 0.1), se(Ji(this.rgba, -t));
      }),
      (i.prototype.grayscale = function () {
        return se(Ji(this.rgba, -1));
      }),
      (i.prototype.lighten = function (t) {
        return t === void 0 && (t = 0.1), se(Un(this.rgba, t));
      }),
      (i.prototype.darken = function (t) {
        return t === void 0 && (t = 0.1), se(Un(this.rgba, -t));
      }),
      (i.prototype.rotate = function (t) {
        return t === void 0 && (t = 15), this.hue(this.hue() + t);
      }),
      (i.prototype.alpha = function (t) {
        return typeof t == "number"
          ? se({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t })
          : Qt(this.rgba.a, 3);
        var e;
      }),
      (i.prototype.hue = function (t) {
        var e = li(this.rgba);
        return typeof t == "number"
          ? se({ h: t, s: e.s, l: e.l, a: e.a })
          : Qt(e.h);
      }),
      (i.prototype.isEqual = function (t) {
        return this.toHex() === se(t).toHex();
      }),
      i
    );
  })(),
  se = function (i) {
    return i instanceof Ds ? i : new Ds(i);
  },
  Nn = [],
  Ja = function (i) {
    i.forEach(function (t) {
      Nn.indexOf(t) < 0 && (t(Ds, Qs), Nn.push(t));
    });
  };
function $a(i, t) {
  var e = {
      white: "#ffffff",
      bisque: "#ffe4c4",
      blue: "#0000ff",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      azure: "#f0ffff",
      whitesmoke: "#f5f5f5",
      papayawhip: "#ffefd5",
      plum: "#dda0dd",
      blanchedalmond: "#ffebcd",
      black: "#000000",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gainsboro: "#dcdcdc",
      cornsilk: "#fff8dc",
      cornflowerblue: "#6495ed",
      burlywood: "#deb887",
      aquamarine: "#7fffd4",
      beige: "#f5f5dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkkhaki: "#bdb76b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      peachpuff: "#ffdab9",
      darkmagenta: "#8b008b",
      darkred: "#8b0000",
      darkorchid: "#9932cc",
      darkorange: "#ff8c00",
      darkslateblue: "#483d8b",
      gray: "#808080",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      wheat: "#f5deb3",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      ghostwhite: "#f8f8ff",
      darkviolet: "#9400d3",
      magenta: "#ff00ff",
      green: "#008000",
      dodgerblue: "#1e90ff",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      blueviolet: "#8a2be2",
      forestgreen: "#228b22",
      lawngreen: "#7cfc00",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      fuchsia: "#ff00ff",
      brown: "#a52a2a",
      maroon: "#800000",
      mediumblue: "#0000cd",
      lightcoral: "#f08080",
      darkturquoise: "#00ced1",
      lightcyan: "#e0ffff",
      ivory: "#fffff0",
      lightyellow: "#ffffe0",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      linen: "#faf0e6",
      mediumaquamarine: "#66cdaa",
      lemonchiffon: "#fffacd",
      lime: "#00ff00",
      khaki: "#f0e68c",
      mediumseagreen: "#3cb371",
      limegreen: "#32cd32",
      mediumspringgreen: "#00fa9a",
      lightskyblue: "#87cefa",
      lightblue: "#add8e6",
      midnightblue: "#191970",
      lightpink: "#ffb6c1",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      mintcream: "#f5fffa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      navajowhite: "#ffdead",
      navy: "#000080",
      mediumvioletred: "#c71585",
      powderblue: "#b0e0e6",
      palegoldenrod: "#eee8aa",
      oldlace: "#fdf5e6",
      paleturquoise: "#afeeee",
      mediumturquoise: "#48d1cc",
      mediumorchid: "#ba55d3",
      rebeccapurple: "#663399",
      lightsteelblue: "#b0c4de",
      mediumslateblue: "#7b68ee",
      thistle: "#d8bfd8",
      tan: "#d2b48c",
      orchid: "#da70d6",
      mediumpurple: "#9370db",
      purple: "#800080",
      pink: "#ffc0cb",
      skyblue: "#87ceeb",
      springgreen: "#00ff7f",
      palegreen: "#98fb98",
      red: "#ff0000",
      yellow: "#ffff00",
      slateblue: "#6a5acd",
      lavenderblush: "#fff0f5",
      peru: "#cd853f",
      palevioletred: "#db7093",
      violet: "#ee82ee",
      teal: "#008080",
      slategray: "#708090",
      slategrey: "#708090",
      aliceblue: "#f0f8ff",
      darkseagreen: "#8fbc8f",
      darkolivegreen: "#556b2f",
      greenyellow: "#adff2f",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      tomato: "#ff6347",
      silver: "#c0c0c0",
      sienna: "#a0522d",
      lavender: "#e6e6fa",
      lightgreen: "#90ee90",
      orange: "#ffa500",
      orangered: "#ff4500",
      steelblue: "#4682b4",
      royalblue: "#4169e1",
      turquoise: "#40e0d0",
      yellowgreen: "#9acd32",
      salmon: "#fa8072",
      saddlebrown: "#8b4513",
      sandybrown: "#f4a460",
      rosybrown: "#bc8f8f",
      darksalmon: "#e9967a",
      lightgoldenrodyellow: "#fafad2",
      snow: "#fffafa",
      lightgrey: "#d3d3d3",
      lightgray: "#d3d3d3",
      dimgray: "#696969",
      dimgrey: "#696969",
      olivedrab: "#6b8e23",
      olive: "#808000",
    },
    s = {};
  for (var n in e) s[e[n]] = n;
  var r = {};
  (i.prototype.toName = function (o) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
      return "transparent";
    var A,
      h,
      l = s[this.toHex()];
    if (l) return l;
    if (o != null && o.closest) {
      var d = this.toRgb(),
        a = 1 / 0,
        c = "black";
      if (!r.length) for (var u in e) r[u] = new i(e[u]).toRgb();
      for (var g in e) {
        var y =
          ((A = d),
          (h = r[g]),
          Math.pow(A.r - h.r, 2) +
            Math.pow(A.g - h.g, 2) +
            Math.pow(A.b - h.b, 2));
        y < a && ((a = y), (c = g));
      }
      return c;
    }
  }),
    t.string.push([
      function (o) {
        var A = o.toLowerCase(),
          h = A === "transparent" ? "#0000" : e[A];
        return h ? new i(h).toRgb() : null;
      },
      "name",
    ]);
}
Ja([$a]);
const _e = class ri {
  constructor(t = 16777215) {
    (this._value = null),
      (this._components = new Float32Array(4)),
      this._components.fill(1),
      (this._int = 16777215),
      (this.value = t);
  }
  get red() {
    return this._components[0];
  }
  get green() {
    return this._components[1];
  }
  get blue() {
    return this._components[2];
  }
  get alpha() {
    return this._components[3];
  }
  setValue(t) {
    return (this.value = t), this;
  }
  set value(t) {
    if (t instanceof ri)
      (this._value = this._cloneSource(t._value)),
        (this._int = t._int),
        this._components.set(t._components);
    else {
      if (t === null) throw new Error("Cannot set Color#value to null");
      (this._value === null || !this._isSourceEqual(this._value, t)) &&
        ((this._value = this._cloneSource(t)), this._normalize(this._value));
    }
  }
  get value() {
    return this._value;
  }
  _cloneSource(t) {
    return typeof t == "string" ||
      typeof t == "number" ||
      t instanceof Number ||
      t === null
      ? t
      : Array.isArray(t) || ArrayBuffer.isView(t)
        ? t.slice(0)
        : typeof t == "object" && t !== null
          ? { ...t }
          : t;
  }
  _isSourceEqual(t, e) {
    const s = typeof t;
    if (s !== typeof e) return !1;
    if (s === "number" || s === "string" || t instanceof Number) return t === e;
    if (
      (Array.isArray(t) && Array.isArray(e)) ||
      (ArrayBuffer.isView(t) && ArrayBuffer.isView(e))
    )
      return t.length !== e.length ? !1 : t.every((r, o) => r === e[o]);
    if (t !== null && e !== null) {
      const r = Object.keys(t),
        o = Object.keys(e);
      return r.length !== o.length ? !1 : r.every((A) => t[A] === e[A]);
    }
    return t === e;
  }
  toRgba() {
    const [t, e, s, n] = this._components;
    return { r: t, g: e, b: s, a: n };
  }
  toRgb() {
    const [t, e, s] = this._components;
    return { r: t, g: e, b: s };
  }
  toRgbaString() {
    const [t, e, s] = this.toUint8RgbArray();
    return `rgba(${t},${e},${s},${this.alpha})`;
  }
  toUint8RgbArray(t) {
    const [e, s, n] = this._components;
    return (
      this._arrayRgb || (this._arrayRgb = []),
      t || (t = this._arrayRgb),
      (t[0] = Math.round(e * 255)),
      (t[1] = Math.round(s * 255)),
      (t[2] = Math.round(n * 255)),
      t
    );
  }
  toArray(t) {
    this._arrayRgba || (this._arrayRgba = []), t || (t = this._arrayRgba);
    const [e, s, n, r] = this._components;
    return (t[0] = e), (t[1] = s), (t[2] = n), (t[3] = r), t;
  }
  toRgbArray(t) {
    this._arrayRgb || (this._arrayRgb = []), t || (t = this._arrayRgb);
    const [e, s, n] = this._components;
    return (t[0] = e), (t[1] = s), (t[2] = n), t;
  }
  toNumber() {
    return this._int;
  }
  toBgrNumber() {
    const [t, e, s] = this.toUint8RgbArray();
    return (s << 16) + (e << 8) + t;
  }
  toLittleEndianNumber() {
    const t = this._int;
    return (t >> 16) + (t & 65280) + ((t & 255) << 16);
  }
  multiply(t) {
    const [e, s, n, r] = ri._temp.setValue(t)._components;
    return (
      (this._components[0] *= e),
      (this._components[1] *= s),
      (this._components[2] *= n),
      (this._components[3] *= r),
      this._refreshInt(),
      (this._value = null),
      this
    );
  }
  premultiply(t, e = !0) {
    return (
      e &&
        ((this._components[0] *= t),
        (this._components[1] *= t),
        (this._components[2] *= t)),
      (this._components[3] = t),
      this._refreshInt(),
      (this._value = null),
      this
    );
  }
  toPremultiplied(t, e = !0) {
    if (t === 1) return (255 << 24) + this._int;
    if (t === 0) return e ? 0 : this._int;
    let s = (this._int >> 16) & 255,
      n = (this._int >> 8) & 255,
      r = this._int & 255;
    return (
      e &&
        ((s = (s * t + 0.5) | 0),
        (n = (n * t + 0.5) | 0),
        (r = (r * t + 0.5) | 0)),
      ((t * 255) << 24) + (s << 16) + (n << 8) + r
    );
  }
  toHex() {
    const t = this._int.toString(16);
    return `#${"000000".substring(0, 6 - t.length) + t}`;
  }
  toHexa() {
    const e = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - e.length) + e;
  }
  setAlpha(t) {
    return (this._components[3] = this._clamp(t)), this;
  }
  _normalize(t) {
    let e, s, n, r;
    if (
      (typeof t == "number" || t instanceof Number) &&
      t >= 0 &&
      t <= 16777215
    ) {
      const o = t;
      (e = ((o >> 16) & 255) / 255),
        (s = ((o >> 8) & 255) / 255),
        (n = (o & 255) / 255),
        (r = 1);
    } else if (
      (Array.isArray(t) || t instanceof Float32Array) &&
      t.length >= 3 &&
      t.length <= 4
    )
      (t = this._clamp(t)), ([e, s, n, r = 1] = t);
    else if (
      (t instanceof Uint8Array || t instanceof Uint8ClampedArray) &&
      t.length >= 3 &&
      t.length <= 4
    )
      (t = this._clamp(t, 0, 255)),
        ([e, s, n, r = 255] = t),
        (e /= 255),
        (s /= 255),
        (n /= 255),
        (r /= 255);
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const A = ri.HEX_PATTERN.exec(t);
        A && (t = `#${A[2]}`);
      }
      const o = se(t);
      o.isValid() &&
        (({ r: e, g: s, b: n, a: r } = o.rgba),
        (e /= 255),
        (s /= 255),
        (n /= 255));
    }
    if (e !== void 0)
      (this._components[0] = e),
        (this._components[1] = s),
        (this._components[2] = n),
        (this._components[3] = r),
        this._refreshInt();
    else throw new Error(`Unable to convert color ${t}`);
  }
  _refreshInt() {
    this._clamp(this._components);
    const [t, e, s] = this._components;
    this._int = ((t * 255) << 16) + ((e * 255) << 8) + ((s * 255) | 0);
  }
  _clamp(t, e = 0, s = 1) {
    return typeof t == "number"
      ? Math.min(Math.max(t, e), s)
      : (t.forEach((n, r) => {
          t[r] = Math.min(Math.max(n, e), s);
        }),
        t);
  }
  static isColorLike(t) {
    return (
      typeof t == "number" ||
      typeof t == "string" ||
      t instanceof Number ||
      t instanceof ri ||
      Array.isArray(t) ||
      t instanceof Uint8Array ||
      t instanceof Uint8ClampedArray ||
      t instanceof Float32Array ||
      (t.r !== void 0 && t.g !== void 0 && t.b !== void 0) ||
      (t.r !== void 0 && t.g !== void 0 && t.b !== void 0 && t.a !== void 0) ||
      (t.h !== void 0 && t.s !== void 0 && t.l !== void 0) ||
      (t.h !== void 0 && t.s !== void 0 && t.l !== void 0 && t.a !== void 0) ||
      (t.h !== void 0 && t.s !== void 0 && t.v !== void 0) ||
      (t.h !== void 0 && t.s !== void 0 && t.v !== void 0 && t.a !== void 0)
    );
  }
};
_e.shared = new _e();
_e._temp = new _e();
_e.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let Mt = _e;
const tA = { cullArea: null, cullable: !1, cullableChildren: !0 };
class sn {
  constructor(t, e) {
    (this._pool = []),
      (this._count = 0),
      (this._index = 0),
      (this._classType = t),
      e && this.prepopulate(e);
  }
  prepopulate(t) {
    for (let e = 0; e < t; e++)
      this._pool[this._index++] = new this._classType();
    this._count += t;
  }
  get(t) {
    var s;
    let e;
    return (
      this._index > 0
        ? (e = this._pool[--this._index])
        : (e = new this._classType()),
      (s = e.init) == null || s.call(e, t),
      e
    );
  }
  return(t) {
    var e;
    (e = t.reset) == null || e.call(t), (this._pool[this._index++] = t);
  }
  get totalSize() {
    return this._count;
  }
  get totalFree() {
    return this._index;
  }
  get totalUsed() {
    return this._count - this._index;
  }
  clear() {
    (this._pool.length = 0), (this._index = 0);
  }
}
class eA {
  constructor() {
    this._poolsByClass = new Map();
  }
  prepopulate(t, e) {
    this.getPool(t).prepopulate(e);
  }
  get(t, e) {
    return this.getPool(t).get(e);
  }
  return(t) {
    this.getPool(t.constructor).return(t);
  }
  getPool(t) {
    return (
      this._poolsByClass.has(t) || this._poolsByClass.set(t, new sn(t)),
      this._poolsByClass.get(t)
    );
  }
  stats() {
    const t = {};
    return (
      this._poolsByClass.forEach((e) => {
        const s = t[e._classType.name]
          ? e._classType.name + e._classType.ID
          : e._classType.name;
        t[s] = { free: e.totalFree, used: e.totalUsed, size: e.totalSize };
      }),
      t
    );
  }
}
const fe = new eA(),
  iA = {
    get isCachedAsTexture() {
      var i;
      return !!((i = this.renderGroup) != null && i.isCachedAsTexture);
    },
    cacheAsTexture(i) {
      typeof i == "boolean" && i === !1
        ? this.disableRenderGroup()
        : (this.enableRenderGroup(),
          this.renderGroup.enableCacheAsTexture(i === !0 ? {} : i));
    },
    updateCacheTexture() {
      var i;
      (i = this.renderGroup) == null || i.updateCacheTexture();
    },
    get cacheAsBitmap() {
      return this.isCachedAsTexture;
    },
    set cacheAsBitmap(i) {
      it("v8.6.0", "cacheAsBitmap is deprecated, use cacheAsTexture instead."),
        this.cacheAsTexture(i);
    },
  };
function sA(i, t, e) {
  const s = i.length;
  let n;
  if (t >= s || e === 0) return;
  e = t + e > s ? s - t : e;
  const r = s - e;
  for (n = t; n < r; ++n) i[n] = i[n + e];
  i.length = r;
}
const nA = {
    allowChildren: !0,
    removeChildren(i = 0, t) {
      var r;
      const e = t ?? this.children.length,
        s = e - i,
        n = [];
      if (s > 0 && s <= e) {
        for (let A = e - 1; A >= i; A--) {
          const h = this.children[A];
          h && (n.push(h), (h.parent = null));
        }
        sA(this.children, i, e);
        const o = this.renderGroup || this.parentRenderGroup;
        o && o.removeChildren(n);
        for (let A = 0; A < n.length; ++A) {
          const h = n[A];
          (r = h.parentRenderLayer) == null || r.detach(h),
            this.emit("childRemoved", h, this, A),
            n[A].emit("removed", this);
        }
        return n.length > 0 && this._didViewChangeTick++, n;
      } else if (s === 0 && this.children.length === 0) return n;
      throw new RangeError(
        "removeChildren: numeric values are outside the acceptable range.",
      );
    },
    removeChildAt(i) {
      const t = this.getChildAt(i);
      return this.removeChild(t);
    },
    getChildAt(i) {
      if (i < 0 || i >= this.children.length)
        throw new Error(`getChildAt: Index (${i}) does not exist.`);
      return this.children[i];
    },
    setChildIndex(i, t) {
      if (t < 0 || t >= this.children.length)
        throw new Error(
          `The index ${t} supplied is out of bounds ${this.children.length}`,
        );
      this.getChildIndex(i), this.addChildAt(i, t);
    },
    getChildIndex(i) {
      const t = this.children.indexOf(i);
      if (t === -1)
        throw new Error("The supplied Container must be a child of the caller");
      return t;
    },
    addChildAt(i, t) {
      this.allowChildren ||
        it(
          dt,
          "addChildAt: Only Containers will be allowed to add children in v8.0.0",
        );
      const { children: e } = this;
      if (t < 0 || t > e.length)
        throw new Error(
          `${i}addChildAt: The index ${t} supplied is out of bounds ${e.length}`,
        );
      if (i.parent) {
        const n = i.parent.children.indexOf(i);
        if (i.parent === this && n === t) return i;
        n !== -1 && i.parent.children.splice(n, 1);
      }
      t === e.length ? e.push(i) : e.splice(t, 0, i),
        (i.parent = this),
        (i.didChange = !0),
        (i._updateFlags = 15);
      const s = this.renderGroup || this.parentRenderGroup;
      return (
        s && s.addChild(i),
        this.sortableChildren && (this.sortDirty = !0),
        this.emit("childAdded", i, this, t),
        i.emit("added", this),
        i
      );
    },
    swapChildren(i, t) {
      if (i === t) return;
      const e = this.getChildIndex(i),
        s = this.getChildIndex(t);
      (this.children[e] = t), (this.children[s] = i);
      const n = this.renderGroup || this.parentRenderGroup;
      n && (n.structureDidChange = !0), this._didContainerChangeTick++;
    },
    removeFromParent() {
      var i;
      (i = this.parent) == null || i.removeChild(this);
    },
    reparentChild(...i) {
      return i.length === 1
        ? this.reparentChildAt(i[0], this.children.length)
        : (i.forEach((t) => this.reparentChildAt(t, this.children.length)),
          i[0]);
    },
    reparentChildAt(i, t) {
      if (i.parent === this) return this.setChildIndex(i, t), i;
      const e = i.worldTransform.clone();
      i.removeFromParent(), this.addChildAt(i, t);
      const s = this.worldTransform.clone();
      return s.invert(), e.prepend(s), i.setFromMatrix(e), i;
    },
  },
  rA = {
    collectRenderables(i, t, e) {
      (this.parentRenderLayer && this.parentRenderLayer !== e) ||
        this.globalDisplayStatus < 7 ||
        !this.includeInBuild ||
        (this.sortableChildren && this.sortChildren(),
        this.isSimple
          ? this.collectRenderablesSimple(i, t, e)
          : this.renderGroup
            ? t.renderPipes.renderGroup.addRenderGroup(this.renderGroup, i)
            : this.collectRenderablesWithEffects(i, t, e));
    },
    collectRenderablesSimple(i, t, e) {
      const s = this.children,
        n = s.length;
      for (let r = 0; r < n; r++) s[r].collectRenderables(i, t, e);
    },
    collectRenderablesWithEffects(i, t, e) {
      const { renderPipes: s } = t;
      for (let n = 0; n < this.effects.length; n++) {
        const r = this.effects[n];
        s[r.pipe].push(r, this, i);
      }
      this.collectRenderablesSimple(i, t, e);
      for (let n = this.effects.length - 1; n >= 0; n--) {
        const r = this.effects[n];
        s[r.pipe].pop(r, this, i);
      }
    },
  };
class On {
  constructor() {
    (this.pipe = "filter"), (this.priority = 1);
  }
  destroy() {
    for (let t = 0; t < this.filters.length; t++) this.filters[t].destroy();
    (this.filters = null), (this.filterArea = null);
  }
}
class oA {
  constructor() {
    (this._effectClasses = []), (this._tests = []), (this._initialized = !1);
  }
  init() {
    this._initialized ||
      ((this._initialized = !0),
      this._effectClasses.forEach((t) => {
        this.add({ test: t.test, maskClass: t });
      }));
  }
  add(t) {
    this._tests.push(t);
  }
  getMaskEffect(t) {
    this._initialized || this.init();
    for (let e = 0; e < this._tests.length; e++) {
      const s = this._tests[e];
      if (s.test(t)) return fe.get(s.maskClass, t);
    }
    return t;
  }
  returnMaskEffect(t) {
    fe.return(t);
  }
}
const Ps = new oA();
Dt.handleByList(Y.MaskEffect, Ps._effectClasses);
const aA = {
    _maskEffect: null,
    _maskOptions: { inverse: !1 },
    _filterEffect: null,
    effects: [],
    _markStructureAsChanged() {
      const i = this.renderGroup || this.parentRenderGroup;
      i && (i.structureDidChange = !0);
    },
    addEffect(i) {
      this.effects.indexOf(i) === -1 &&
        (this.effects.push(i),
        this.effects.sort((e, s) => e.priority - s.priority),
        this._markStructureAsChanged(),
        this._updateIsSimple());
    },
    removeEffect(i) {
      const t = this.effects.indexOf(i);
      t !== -1 &&
        (this.effects.splice(t, 1),
        this._markStructureAsChanged(),
        this._updateIsSimple());
    },
    set mask(i) {
      const t = this._maskEffect;
      (t == null ? void 0 : t.mask) !== i &&
        (t &&
          (this.removeEffect(t),
          Ps.returnMaskEffect(t),
          (this._maskEffect = null)),
        i != null &&
          ((this._maskEffect = Ps.getMaskEffect(i)),
          this.addEffect(this._maskEffect)));
    },
    setMask(i) {
      (this._maskOptions = { ...this._maskOptions, ...i }),
        i.mask && (this.mask = i.mask),
        this._markStructureAsChanged();
    },
    get mask() {
      var i;
      return (i = this._maskEffect) == null ? void 0 : i.mask;
    },
    set filters(i) {
      var r;
      !Array.isArray(i) && i && (i = [i]);
      const t = this._filterEffect || (this._filterEffect = new On());
      i = i;
      const e = (i == null ? void 0 : i.length) > 0,
        s = ((r = t.filters) == null ? void 0 : r.length) > 0,
        n = e !== s;
      (i = Array.isArray(i) ? i.slice(0) : i),
        (t.filters = Object.freeze(i)),
        n &&
          (e
            ? this.addEffect(t)
            : (this.removeEffect(t), (t.filters = i ?? null)));
    },
    get filters() {
      var i;
      return (i = this._filterEffect) == null ? void 0 : i.filters;
    },
    set filterArea(i) {
      this._filterEffect || (this._filterEffect = new On()),
        (this._filterEffect.filterArea = i);
    },
    get filterArea() {
      var i;
      return (i = this._filterEffect) == null ? void 0 : i.filterArea;
    },
  },
  AA = {
    label: null,
    get name() {
      return (
        it(
          dt,
          "Container.name property has been removed, use Container.label instead",
        ),
        this.label
      );
    },
    set name(i) {
      it(
        dt,
        "Container.name property has been removed, use Container.label instead",
      ),
        (this.label = i);
    },
    getChildByName(i, t = !1) {
      return this.getChildByLabel(i, t);
    },
    getChildByLabel(i, t = !1) {
      const e = this.children;
      for (let s = 0; s < e.length; s++) {
        const n = e[s];
        if (n.label === i || (i instanceof RegExp && i.test(n.label))) return n;
      }
      if (t)
        for (let s = 0; s < e.length; s++) {
          const r = e[s].getChildByLabel(i, !0);
          if (r) return r;
        }
      return null;
    },
    getChildrenByLabel(i, t = !1, e = []) {
      const s = this.children;
      for (let n = 0; n < s.length; n++) {
        const r = s[n];
        (r.label === i || (i instanceof RegExp && i.test(r.label))) &&
          e.push(r);
      }
      if (t)
        for (let n = 0; n < s.length; n++) s[n].getChildrenByLabel(i, !0, e);
      return e;
    },
  },
  kt = new sn(tt),
  ge = new sn(Wt),
  hA = new tt(),
  lA = {
    getFastGlobalBounds(i, t) {
      t || (t = new Wt()),
        t.clear(),
        this._getGlobalBoundsRecursive(!!i, t, this.parentRenderLayer),
        t.isValid || t.set(0, 0, 0, 0);
      const e = this.renderGroup || this.parentRenderGroup;
      return t.applyMatrix(e.worldTransform), t;
    },
    _getGlobalBoundsRecursive(i, t, e) {
      let s = t;
      if (
        (i && this.parentRenderLayer && this.parentRenderLayer !== e) ||
        this.localDisplayStatus !== 7 ||
        !this.measurable
      )
        return;
      const n = !!this.effects.length;
      if (((this.renderGroup || n) && (s = ge.get().clear()), this.boundsArea))
        t.addRect(this.boundsArea, this.worldTransform);
      else {
        if (this.renderPipeId) {
          const o = this.bounds;
          s.addFrame(o.minX, o.minY, o.maxX, o.maxY, this.groupTransform);
        }
        const r = this.children;
        for (let o = 0; o < r.length; o++)
          r[o]._getGlobalBoundsRecursive(i, s, e);
      }
      if (n) {
        let r = !1;
        const o = this.renderGroup || this.parentRenderGroup;
        for (let A = 0; A < this.effects.length; A++)
          this.effects[A].addBounds &&
            (r || ((r = !0), s.applyMatrix(o.worldTransform)),
            this.effects[A].addBounds(s, !0));
        r &&
          (s.applyMatrix(o.worldTransform.copyTo(hA).invert()),
          t.addBounds(s, this.relativeGroupTransform)),
          t.addBounds(s),
          ge.return(s);
      } else
        this.renderGroup &&
          (t.addBounds(s, this.relativeGroupTransform), ge.return(s));
    },
  };
function no(i, t, e) {
  e.clear();
  let s, n;
  return (
    i.parent
      ? t
        ? (s = i.parent.worldTransform)
        : ((n = kt.get().identity()), (s = nn(i, n)))
      : (s = tt.IDENTITY),
    ro(i, e, s, t),
    n && kt.return(n),
    e.isValid || e.set(0, 0, 0, 0),
    e
  );
}
function ro(i, t, e, s) {
  var A, h;
  if (!i.visible || !i.measurable) return;
  let n;
  s
    ? (n = i.worldTransform)
    : (i.updateLocalTransform(),
      (n = kt.get()),
      n.appendFrom(i.localTransform, e));
  const r = t,
    o = !!i.effects.length;
  if ((o && (t = ge.get().clear()), i.boundsArea)) t.addRect(i.boundsArea, n);
  else {
    i.bounds && ((t.matrix = n), t.addBounds(i.bounds));
    for (let l = 0; l < i.children.length; l++) ro(i.children[l], t, n, s);
  }
  if (o) {
    for (let l = 0; l < i.effects.length; l++)
      (h = (A = i.effects[l]).addBounds) == null || h.call(A, t);
    r.addBounds(t, tt.IDENTITY), ge.return(t);
  }
  s || kt.return(n);
}
function nn(i, t) {
  const e = i.parent;
  return (
    e && (nn(e, t), e.updateLocalTransform(), t.append(e.localTransform)), t
  );
}
function oo(i, t) {
  if (i === 16777215 || !t) return t;
  if (t === 16777215 || !i) return i;
  const e = (i >> 16) & 255,
    s = (i >> 8) & 255,
    n = i & 255,
    r = (t >> 16) & 255,
    o = (t >> 8) & 255,
    A = t & 255,
    h = ((e * r) / 255) | 0,
    l = ((s * o) / 255) | 0,
    d = ((n * A) / 255) | 0;
  return (h << 16) + (l << 8) + d;
}
const jn = 16777215;
function zn(i, t) {
  return i === jn ? t : t === jn ? i : oo(i, t);
}
function Qi(i) {
  return ((i & 255) << 16) + (i & 65280) + ((i >> 16) & 255);
}
const cA = {
  getGlobalAlpha(i) {
    if (i)
      return this.renderGroup
        ? this.renderGroup.worldAlpha
        : this.parentRenderGroup
          ? this.parentRenderGroup.worldAlpha * this.alpha
          : this.alpha;
    let t = this.alpha,
      e = this.parent;
    for (; e; ) (t *= e.alpha), (e = e.parent);
    return t;
  },
  getGlobalTransform(i, t) {
    if (t) return i.copyFrom(this.worldTransform);
    this.updateLocalTransform();
    const e = nn(this, kt.get().identity());
    return i.appendFrom(this.localTransform, e), kt.return(e), i;
  },
  getGlobalTint(i) {
    if (i)
      return this.renderGroup
        ? Qi(this.renderGroup.worldColor)
        : this.parentRenderGroup
          ? Qi(zn(this.localColor, this.parentRenderGroup.worldColor))
          : this.tint;
    let t = this.localColor,
      e = this.parent;
    for (; e; ) (t = zn(t, e.localColor)), (e = e.parent);
    return Qi(t);
  },
};
let ts = 0;
const Ln = 500;
function Ct(...i) {
  ts !== Ln &&
    (ts++,
    ts === Ln
      ? console.warn(
          "PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.",
        )
      : console.warn("PixiJS Warning: ", ...i));
}
function ao(i, t, e) {
  return (
    t.clear(),
    e || (e = tt.IDENTITY),
    Ao(i, t, e, i, !0),
    t.isValid || t.set(0, 0, 0, 0),
    t
  );
}
function Ao(i, t, e, s, n) {
  var h, l;
  let r;
  if (n) (r = kt.get()), (r = e.copyTo(r));
  else {
    if (!i.visible || !i.measurable) return;
    i.updateLocalTransform();
    const d = i.localTransform;
    (r = kt.get()), r.appendFrom(d, e);
  }
  const o = t,
    A = !!i.effects.length;
  if ((A && (t = ge.get().clear()), i.boundsArea)) t.addRect(i.boundsArea, r);
  else {
    i.renderPipeId && ((t.matrix = r), t.addBounds(i.bounds));
    const d = i.children;
    for (let a = 0; a < d.length; a++) Ao(d[a], t, r, s, !1);
  }
  if (A) {
    for (let d = 0; d < i.effects.length; d++)
      (l = (h = i.effects[d]).addLocalBounds) == null || l.call(h, t, s);
    o.addBounds(t, tt.IDENTITY), ge.return(t);
  }
  kt.return(r);
}
function ho(i, t) {
  const e = i.children;
  for (let s = 0; s < e.length; s++) {
    const n = e[s],
      r = n.uid,
      o =
        ((n._didViewChangeTick & 65535) << 16) |
        (n._didContainerChangeTick & 65535),
      A = t.index;
    (t.data[A] !== r || t.data[A + 1] !== o) &&
      ((t.data[t.index] = r), (t.data[t.index + 1] = o), (t.didChange = !0)),
      (t.index = A + 2),
      n.children.length && ho(n, t);
  }
  return t.didChange;
}
const uA = new tt(),
  dA = {
    _localBoundsCacheId: -1,
    _localBoundsCacheData: null,
    _setWidth(i, t) {
      const e = Math.sign(this.scale.x) || 1;
      t !== 0 ? (this.scale.x = (i / t) * e) : (this.scale.x = e);
    },
    _setHeight(i, t) {
      const e = Math.sign(this.scale.y) || 1;
      t !== 0 ? (this.scale.y = (i / t) * e) : (this.scale.y = e);
    },
    getLocalBounds() {
      this._localBoundsCacheData ||
        (this._localBoundsCacheData = {
          data: [],
          index: 1,
          didChange: !1,
          localBounds: new Wt(),
        });
      const i = this._localBoundsCacheData;
      return (
        (i.index = 1),
        (i.didChange = !1),
        i.data[0] !== this._didViewChangeTick &&
          ((i.didChange = !0), (i.data[0] = this._didViewChangeTick)),
        ho(this, i),
        i.didChange && ao(this, i.localBounds, uA),
        i.localBounds
      );
    },
    getBounds(i, t) {
      return no(this, i, t || new Wt());
    },
  },
  fA = {
    _onRender: null,
    set onRender(i) {
      const t = this.renderGroup || this.parentRenderGroup;
      if (!i) {
        this._onRender && (t == null || t.removeOnRender(this)),
          (this._onRender = null);
        return;
      }
      this._onRender || t == null || t.addOnRender(this), (this._onRender = i);
    },
    get onRender() {
      return this._onRender;
    },
  },
  gA = {
    _zIndex: 0,
    sortDirty: !1,
    sortableChildren: !1,
    get zIndex() {
      return this._zIndex;
    },
    set zIndex(i) {
      this._zIndex !== i && ((this._zIndex = i), this.depthOfChildModified());
    },
    depthOfChildModified() {
      this.parent &&
        ((this.parent.sortableChildren = !0), (this.parent.sortDirty = !0)),
        this.parentRenderGroup &&
          (this.parentRenderGroup.structureDidChange = !0);
    },
    sortChildren() {
      this.sortDirty && ((this.sortDirty = !1), this.children.sort(pA));
    },
  };
function pA(i, t) {
  return i._zIndex - t._zIndex;
}
const mA = {
  getGlobalPosition(i = new Rt(), t = !1) {
    return (
      this.parent
        ? this.parent.toGlobal(this._position, i, t)
        : ((i.x = this._position.x), (i.y = this._position.y)),
      i
    );
  },
  toGlobal(i, t, e = !1) {
    const s = this.getGlobalTransform(kt.get(), e);
    return (t = s.apply(i, t)), kt.return(s), t;
  },
  toLocal(i, t, e, s) {
    t && (i = t.toGlobal(i, e, s));
    const n = this.getGlobalTransform(kt.get(), s);
    return (e = n.applyInverse(i, e)), kt.return(n), e;
  },
};
class lo {
  constructor() {
    (this.uid = It("instructionSet")),
      (this.instructions = []),
      (this.instructionSize = 0),
      (this.renderables = []),
      (this.gcTick = 0);
  }
  reset() {
    this.instructionSize = 0;
  }
  add(t) {
    this.instructions[this.instructionSize++] = t;
  }
  log() {
    (this.instructions.length = this.instructionSize),
      console.table(this.instructions, ["type", "action"]);
  }
}
let yA = 0;
class CA {
  constructor(t) {
    (this._poolKeyHash = Object.create(null)),
      (this._texturePool = {}),
      (this.textureOptions = t || {}),
      (this.enableFullScreen = !1);
  }
  createTexture(t, e, s) {
    const n = new le({
      ...this.textureOptions,
      width: t,
      height: e,
      resolution: 1,
      antialias: s,
      autoGarbageCollect: !1,
    });
    return new $({ source: n, label: `texturePool_${yA++}` });
  }
  getOptimalTexture(t, e, s = 1, n) {
    let r = Math.ceil(t * s - 1e-6),
      o = Math.ceil(e * s - 1e-6);
    (r = ki(r)), (o = ki(o));
    const A = (r << 17) + (o << 1) + (n ? 1 : 0);
    this._texturePool[A] || (this._texturePool[A] = []);
    let h = this._texturePool[A].pop();
    return (
      h || (h = this.createTexture(r, o, n)),
      (h.source._resolution = s),
      (h.source.width = r / s),
      (h.source.height = o / s),
      (h.source.pixelWidth = r),
      (h.source.pixelHeight = o),
      (h.frame.x = 0),
      (h.frame.y = 0),
      (h.frame.width = t),
      (h.frame.height = e),
      h.updateUvs(),
      (this._poolKeyHash[h.uid] = A),
      h
    );
  }
  getSameSizeTexture(t, e = !1) {
    const s = t.source;
    return this.getOptimalTexture(t.width, t.height, s._resolution, e);
  }
  returnTexture(t) {
    const e = this._poolKeyHash[t.uid];
    this._texturePool[e].push(t);
  }
  clear(t) {
    if (((t = t !== !1), t))
      for (const e in this._texturePool) {
        const s = this._texturePool[e];
        if (s) for (let n = 0; n < s.length; n++) s[n].destroy(!0);
      }
    this._texturePool = {};
  }
}
const xA = new CA();
class wA {
  constructor() {
    (this.renderPipeId = "renderGroup"),
      (this.root = null),
      (this.canBundle = !1),
      (this.renderGroupParent = null),
      (this.renderGroupChildren = []),
      (this.worldTransform = new tt()),
      (this.worldColorAlpha = 4294967295),
      (this.worldColor = 16777215),
      (this.worldAlpha = 1),
      (this.childrenToUpdate = Object.create(null)),
      (this.updateTick = 0),
      (this.gcTick = 0),
      (this.childrenRenderablesToUpdate = { list: [], index: 0 }),
      (this.structureDidChange = !0),
      (this.instructionSet = new lo()),
      (this._onRenderContainers = []),
      (this.textureNeedsUpdate = !0),
      (this.isCachedAsTexture = !1),
      (this._matrixDirty = 7);
  }
  init(t) {
    (this.root = t), t._onRender && this.addOnRender(t), (t.didChange = !0);
    const e = t.children;
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      (n._updateFlags = 15), this.addChild(n);
    }
  }
  enableCacheAsTexture(t = {}) {
    (this.textureOptions = t),
      (this.isCachedAsTexture = !0),
      (this.textureNeedsUpdate = !0);
  }
  disableCacheAsTexture() {
    (this.isCachedAsTexture = !1),
      this.texture && (xA.returnTexture(this.texture), (this.texture = null));
  }
  updateCacheTexture() {
    this.textureNeedsUpdate = !0;
  }
  reset() {
    this.renderGroupChildren.length = 0;
    for (const t in this.childrenToUpdate) {
      const e = this.childrenToUpdate[t];
      e.list.fill(null), (e.index = 0);
    }
    (this.childrenRenderablesToUpdate.index = 0),
      this.childrenRenderablesToUpdate.list.fill(null),
      (this.root = null),
      (this.updateTick = 0),
      (this.structureDidChange = !0),
      (this._onRenderContainers.length = 0),
      (this.renderGroupParent = null),
      this.disableCacheAsTexture();
  }
  get localTransform() {
    return this.root.localTransform;
  }
  addRenderGroupChild(t) {
    t.renderGroupParent && t.renderGroupParent._removeRenderGroupChild(t),
      (t.renderGroupParent = this),
      this.renderGroupChildren.push(t);
  }
  _removeRenderGroupChild(t) {
    const e = this.renderGroupChildren.indexOf(t);
    e > -1 && this.renderGroupChildren.splice(e, 1),
      (t.renderGroupParent = null);
  }
  addChild(t) {
    if (
      ((this.structureDidChange = !0),
      (t.parentRenderGroup = this),
      (t.updateTick = -1),
      t.parent === this.root
        ? (t.relativeRenderGroupDepth = 1)
        : (t.relativeRenderGroupDepth = t.parent.relativeRenderGroupDepth + 1),
      (t.didChange = !0),
      this.onChildUpdate(t),
      t.renderGroup)
    ) {
      this.addRenderGroupChild(t.renderGroup);
      return;
    }
    t._onRender && this.addOnRender(t);
    const e = t.children;
    for (let s = 0; s < e.length; s++) this.addChild(e[s]);
  }
  removeChild(t) {
    if (
      ((this.structureDidChange = !0),
      t._onRender && (t.renderGroup || this.removeOnRender(t)),
      (t.parentRenderGroup = null),
      t.renderGroup)
    ) {
      this._removeRenderGroupChild(t.renderGroup);
      return;
    }
    const e = t.children;
    for (let s = 0; s < e.length; s++) this.removeChild(e[s]);
  }
  removeChildren(t) {
    for (let e = 0; e < t.length; e++) this.removeChild(t[e]);
  }
  onChildUpdate(t) {
    let e = this.childrenToUpdate[t.relativeRenderGroupDepth];
    e ||
      (e = this.childrenToUpdate[t.relativeRenderGroupDepth] =
        { index: 0, list: [] }),
      (e.list[e.index++] = t);
  }
  updateRenderable(t) {
    t.globalDisplayStatus < 7 ||
      (this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t),
      (t.didViewUpdate = !1));
  }
  onChildViewUpdate(t) {
    this.childrenRenderablesToUpdate.list[
      this.childrenRenderablesToUpdate.index++
    ] = t;
  }
  get isRenderable() {
    return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
  }
  addOnRender(t) {
    this._onRenderContainers.push(t);
  }
  removeOnRender(t) {
    this._onRenderContainers.splice(this._onRenderContainers.indexOf(t), 1);
  }
  runOnRender(t) {
    for (let e = 0; e < this._onRenderContainers.length; e++)
      this._onRenderContainers[e]._onRender(t);
  }
  destroy() {
    this.disableCacheAsTexture(),
      (this.renderGroupParent = null),
      (this.root = null),
      (this.childrenRenderablesToUpdate = null),
      (this.childrenToUpdate = null),
      (this.renderGroupChildren = null),
      (this._onRenderContainers = null),
      (this.instructionSet = null);
  }
  getChildren(t = []) {
    const e = this.root.children;
    for (let s = 0; s < e.length; s++) this._getChildren(e[s], t);
    return t;
  }
  _getChildren(t, e = []) {
    if ((e.push(t), t.renderGroup)) return e;
    const s = t.children;
    for (let n = 0; n < s.length; n++) this._getChildren(s[n], e);
    return e;
  }
  invalidateMatrices() {
    this._matrixDirty = 7;
  }
  get inverseWorldTransform() {
    return (this._matrixDirty & 1) === 0
      ? this._inverseWorldTransform
      : ((this._matrixDirty &= -2),
        this._inverseWorldTransform || (this._inverseWorldTransform = new tt()),
        this._inverseWorldTransform.copyFrom(this.worldTransform).invert());
  }
  get textureOffsetInverseTransform() {
    return (this._matrixDirty & 2) === 0
      ? this._textureOffsetInverseTransform
      : ((this._matrixDirty &= -3),
        this._textureOffsetInverseTransform ||
          (this._textureOffsetInverseTransform = new tt()),
        this._textureOffsetInverseTransform
          .copyFrom(this.inverseWorldTransform)
          .translate(-this._textureBounds.x, -this._textureBounds.y));
  }
  get inverseParentTextureTransform() {
    if ((this._matrixDirty & 4) === 0)
      return this._inverseParentTextureTransform;
    this._matrixDirty &= -5;
    const t = this._parentCacheAsTextureRenderGroup;
    return t
      ? (this._inverseParentTextureTransform ||
          (this._inverseParentTextureTransform = new tt()),
        this._inverseParentTextureTransform
          .copyFrom(this.worldTransform)
          .prepend(t.inverseWorldTransform)
          .translate(-t._textureBounds.x, -t._textureBounds.y))
      : this.worldTransform;
  }
  get cacheToLocalTransform() {
    return this._parentCacheAsTextureRenderGroup
      ? this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform
      : null;
  }
}
function bA(i, t, e = {}) {
  for (const s in t) !e[s] && t[s] !== void 0 && (i[s] = t[s]);
}
const es = new Ut(null),
  is = new Ut(null),
  ss = new Ut(null, 1, 1),
  Hn = 1,
  EA = 2,
  ns = 4;
class _ extends Jt {
  constructor(t = {}) {
    var e, s;
    super(),
      (this.uid = It("renderable")),
      (this._updateFlags = 15),
      (this.renderGroup = null),
      (this.parentRenderGroup = null),
      (this.parentRenderGroupIndex = 0),
      (this.didChange = !1),
      (this.didViewUpdate = !1),
      (this.relativeRenderGroupDepth = 0),
      (this.children = []),
      (this.parent = null),
      (this.includeInBuild = !0),
      (this.measurable = !0),
      (this.isSimple = !0),
      (this.updateTick = -1),
      (this.localTransform = new tt()),
      (this.relativeGroupTransform = new tt()),
      (this.groupTransform = this.relativeGroupTransform),
      (this.destroyed = !1),
      (this._position = new Ut(this, 0, 0)),
      (this._scale = ss),
      (this._pivot = is),
      (this._skew = es),
      (this._cx = 1),
      (this._sx = 0),
      (this._cy = 0),
      (this._sy = 1),
      (this._rotation = 0),
      (this.localColor = 16777215),
      (this.localAlpha = 1),
      (this.groupAlpha = 1),
      (this.groupColor = 16777215),
      (this.groupColorAlpha = 4294967295),
      (this.localBlendMode = "inherit"),
      (this.groupBlendMode = "normal"),
      (this.localDisplayStatus = 7),
      (this.globalDisplayStatus = 7),
      (this._didContainerChangeTick = 0),
      (this._didViewChangeTick = 0),
      (this._didLocalTransformChangeId = -1),
      (this.effects = []),
      bA(this, t, { children: !0, parent: !0, effects: !0 }),
      (e = t.children) == null || e.forEach((n) => this.addChild(n)),
      (s = t.parent) == null || s.addChild(this);
  }
  static mixin(t) {
    it(
      "8.8.0",
      "Container.mixin is deprecated, please use extensions.mixin instead.",
    ),
      Dt.mixin(_, t);
  }
  set _didChangeId(t) {
    (this._didViewChangeTick = (t >> 12) & 4095),
      (this._didContainerChangeTick = t & 4095);
  }
  get _didChangeId() {
    return (
      (this._didContainerChangeTick & 4095) |
      ((this._didViewChangeTick & 4095) << 12)
    );
  }
  addChild(...t) {
    if (
      (this.allowChildren ||
        it(
          dt,
          "addChild: Only Containers will be allowed to add children in v8.0.0",
        ),
      t.length > 1)
    ) {
      for (let n = 0; n < t.length; n++) this.addChild(t[n]);
      return t[0];
    }
    const e = t[0],
      s = this.renderGroup || this.parentRenderGroup;
    return e.parent === this
      ? (this.children.splice(this.children.indexOf(e), 1),
        this.children.push(e),
        s && (s.structureDidChange = !0),
        e)
      : (e.parent && e.parent.removeChild(e),
        this.children.push(e),
        this.sortableChildren && (this.sortDirty = !0),
        (e.parent = this),
        (e.didChange = !0),
        (e._updateFlags = 15),
        s && s.addChild(e),
        this.emit("childAdded", e, this, this.children.length - 1),
        e.emit("added", this),
        this._didViewChangeTick++,
        e._zIndex !== 0 && e.depthOfChildModified(),
        e);
  }
  removeChild(...t) {
    if (t.length > 1) {
      for (let n = 0; n < t.length; n++) this.removeChild(t[n]);
      return t[0];
    }
    const e = t[0],
      s = this.children.indexOf(e);
    return (
      s > -1 &&
        (this._didViewChangeTick++,
        this.children.splice(s, 1),
        this.renderGroup
          ? this.renderGroup.removeChild(e)
          : this.parentRenderGroup && this.parentRenderGroup.removeChild(e),
        e.parentRenderLayer && e.parentRenderLayer.detach(e),
        (e.parent = null),
        this.emit("childRemoved", e, this, s),
        e.emit("removed", this)),
      e
    );
  }
  _onUpdate(t) {
    t && t === this._skew && this._updateSkew(),
      this._didContainerChangeTick++,
      !this.didChange &&
        ((this.didChange = !0),
        this.parentRenderGroup && this.parentRenderGroup.onChildUpdate(this));
  }
  set isRenderGroup(t) {
    !!this.renderGroup !== t &&
      (t ? this.enableRenderGroup() : this.disableRenderGroup());
  }
  get isRenderGroup() {
    return !!this.renderGroup;
  }
  enableRenderGroup() {
    if (this.renderGroup) return;
    const t = this.parentRenderGroup;
    t == null || t.removeChild(this),
      (this.renderGroup = fe.get(wA, this)),
      (this.groupTransform = tt.IDENTITY),
      t == null || t.addChild(this),
      this._updateIsSimple();
  }
  disableRenderGroup() {
    if (!this.renderGroup) return;
    const t = this.parentRenderGroup;
    t == null || t.removeChild(this),
      fe.return(this.renderGroup),
      (this.renderGroup = null),
      (this.groupTransform = this.relativeGroupTransform),
      t == null || t.addChild(this),
      this._updateIsSimple();
  }
  _updateIsSimple() {
    this.isSimple = !this.renderGroup && this.effects.length === 0;
  }
  get worldTransform() {
    return (
      this._worldTransform || (this._worldTransform = new tt()),
      this.renderGroup
        ? this._worldTransform.copyFrom(this.renderGroup.worldTransform)
        : this.parentRenderGroup &&
          this._worldTransform.appendFrom(
            this.relativeGroupTransform,
            this.parentRenderGroup.worldTransform,
          ),
      this._worldTransform
    );
  }
  get x() {
    return this._position.x;
  }
  set x(t) {
    this._position.x = t;
  }
  get y() {
    return this._position.y;
  }
  set y(t) {
    this._position.y = t;
  }
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copyFrom(t);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(t) {
    this._rotation !== t && ((this._rotation = t), this._onUpdate(this._skew));
  }
  get angle() {
    return this.rotation * ka;
  }
  set angle(t) {
    this.rotation = t * Ga;
  }
  get pivot() {
    return (
      this._pivot === is && (this._pivot = new Ut(this, 0, 0)), this._pivot
    );
  }
  set pivot(t) {
    this._pivot === is && (this._pivot = new Ut(this, 0, 0)),
      typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t);
  }
  get skew() {
    return this._skew === es && (this._skew = new Ut(this, 0, 0)), this._skew;
  }
  set skew(t) {
    this._skew === es && (this._skew = new Ut(this, 0, 0)),
      this._skew.copyFrom(t);
  }
  get scale() {
    return (
      this._scale === ss && (this._scale = new Ut(this, 1, 1)), this._scale
    );
  }
  set scale(t) {
    this._scale === ss && (this._scale = new Ut(this, 0, 0)),
      typeof t == "number" ? this._scale.set(t) : this._scale.copyFrom(t);
  }
  get width() {
    return Math.abs(this.scale.x * this.getLocalBounds().width);
  }
  set width(t) {
    const e = this.getLocalBounds().width;
    this._setWidth(t, e);
  }
  get height() {
    return Math.abs(this.scale.y * this.getLocalBounds().height);
  }
  set height(t) {
    const e = this.getLocalBounds().height;
    this._setHeight(t, e);
  }
  getSize(t) {
    t || (t = {});
    const e = this.getLocalBounds();
    return (
      (t.width = Math.abs(this.scale.x * e.width)),
      (t.height = Math.abs(this.scale.y * e.height)),
      t
    );
  }
  setSize(t, e) {
    const s = this.getLocalBounds();
    typeof t == "object"
      ? ((e = t.height ?? t.width), (t = t.width))
      : (e ?? (e = t)),
      t !== void 0 && this._setWidth(t, s.width),
      e !== void 0 && this._setHeight(e, s.height);
  }
  _updateSkew() {
    const t = this._rotation,
      e = this._skew;
    (this._cx = Math.cos(t + e._y)),
      (this._sx = Math.sin(t + e._y)),
      (this._cy = -Math.sin(t - e._x)),
      (this._sy = Math.cos(t - e._x));
  }
  updateTransform(t) {
    return (
      this.position.set(
        typeof t.x == "number" ? t.x : this.position.x,
        typeof t.y == "number" ? t.y : this.position.y,
      ),
      this.scale.set(
        typeof t.scaleX == "number" ? t.scaleX || 1 : this.scale.x,
        typeof t.scaleY == "number" ? t.scaleY || 1 : this.scale.y,
      ),
      (this.rotation =
        typeof t.rotation == "number" ? t.rotation : this.rotation),
      this.skew.set(
        typeof t.skewX == "number" ? t.skewX : this.skew.x,
        typeof t.skewY == "number" ? t.skewY : this.skew.y,
      ),
      this.pivot.set(
        typeof t.pivotX == "number" ? t.pivotX : this.pivot.x,
        typeof t.pivotY == "number" ? t.pivotY : this.pivot.y,
      ),
      this
    );
  }
  setFromMatrix(t) {
    t.decompose(this);
  }
  updateLocalTransform() {
    const t = this._didContainerChangeTick;
    if (this._didLocalTransformChangeId === t) return;
    this._didLocalTransformChangeId = t;
    const e = this.localTransform,
      s = this._scale,
      n = this._pivot,
      r = this._position,
      o = s._x,
      A = s._y,
      h = n._x,
      l = n._y;
    (e.a = this._cx * o),
      (e.b = this._sx * o),
      (e.c = this._cy * A),
      (e.d = this._sy * A),
      (e.tx = r._x - (h * e.a + l * e.c)),
      (e.ty = r._y - (h * e.b + l * e.d));
  }
  set alpha(t) {
    t !== this.localAlpha &&
      ((this.localAlpha = t), (this._updateFlags |= Hn), this._onUpdate());
  }
  get alpha() {
    return this.localAlpha;
  }
  set tint(t) {
    const s = Mt.shared.setValue(t ?? 16777215).toBgrNumber();
    s !== this.localColor &&
      ((this.localColor = s), (this._updateFlags |= Hn), this._onUpdate());
  }
  get tint() {
    return Qi(this.localColor);
  }
  set blendMode(t) {
    this.localBlendMode !== t &&
      (this.parentRenderGroup &&
        (this.parentRenderGroup.structureDidChange = !0),
      (this._updateFlags |= EA),
      (this.localBlendMode = t),
      this._onUpdate());
  }
  get blendMode() {
    return this.localBlendMode;
  }
  get visible() {
    return !!(this.localDisplayStatus & 2);
  }
  set visible(t) {
    const e = t ? 2 : 0;
    (this.localDisplayStatus & 2) !== e &&
      (this.parentRenderGroup &&
        (this.parentRenderGroup.structureDidChange = !0),
      (this._updateFlags |= ns),
      (this.localDisplayStatus ^= 2),
      this._onUpdate());
  }
  get culled() {
    return !(this.localDisplayStatus & 4);
  }
  set culled(t) {
    const e = t ? 0 : 4;
    (this.localDisplayStatus & 4) !== e &&
      (this.parentRenderGroup &&
        (this.parentRenderGroup.structureDidChange = !0),
      (this._updateFlags |= ns),
      (this.localDisplayStatus ^= 4),
      this._onUpdate());
  }
  get renderable() {
    return !!(this.localDisplayStatus & 1);
  }
  set renderable(t) {
    const e = t ? 1 : 0;
    (this.localDisplayStatus & 1) !== e &&
      ((this._updateFlags |= ns),
      (this.localDisplayStatus ^= 1),
      this.parentRenderGroup &&
        (this.parentRenderGroup.structureDidChange = !0),
      this._onUpdate());
  }
  get isRenderable() {
    return this.localDisplayStatus === 7 && this.groupAlpha > 0;
  }
  destroy(t = !1) {
    var n;
    if (this.destroyed) return;
    this.destroyed = !0;
    let e;
    if (
      (this.children.length &&
        (e = this.removeChildren(0, this.children.length)),
      this.removeFromParent(),
      (this.parent = null),
      (this._maskEffect = null),
      (this._filterEffect = null),
      (this.effects = null),
      (this._position = null),
      (this._scale = null),
      (this._pivot = null),
      (this._skew = null),
      this.emit("destroyed", this),
      this.removeAllListeners(),
      (typeof t == "boolean" ? t : t == null ? void 0 : t.children) && e)
    )
      for (let r = 0; r < e.length; ++r) e[r].destroy(t);
    (n = this.renderGroup) == null || n.destroy(), (this.renderGroup = null);
  }
}
Dt.mixin(_, nA, lA, mA, fA, dA, aA, AA, gA, tA, iA, cA, rA);
class rn extends _ {
  constructor(t) {
    super(t),
      (this.canBundle = !0),
      (this.allowChildren = !1),
      (this._roundPixels = 0),
      (this._lastUsed = -1),
      (this._bounds = new Wt(0, 1, 0, 0)),
      (this._boundsDirty = !0);
  }
  get bounds() {
    return this._boundsDirty
      ? (this.updateBounds(), (this._boundsDirty = !1), this._bounds)
      : this._bounds;
  }
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(t) {
    this._roundPixels = t ? 1 : 0;
  }
  containsPoint(t) {
    const e = this.bounds,
      { x: s, y: n } = t;
    return s >= e.minX && s <= e.maxX && n >= e.minY && n <= e.maxY;
  }
  onViewUpdate() {
    if (
      (this._didViewChangeTick++, (this._boundsDirty = !0), this.didViewUpdate)
    )
      return;
    this.didViewUpdate = !0;
    const t = this.renderGroup || this.parentRenderGroup;
    t && t.onChildViewUpdate(this);
  }
  destroy(t) {
    super.destroy(t), (this._bounds = null);
  }
  collectRenderablesSimple(t, e, s) {
    const { renderPipes: n, renderableGC: r } = e;
    n.blendMode.setBlendMode(this, this.groupBlendMode, t),
      n[this.renderPipeId].addRenderable(this, t),
      r.addRenderable(this),
      (this.didViewUpdate = !1);
    const A = this.children,
      h = A.length;
    for (let l = 0; l < h; l++) A[l].collectRenderables(t, e, s);
  }
}
class et extends rn {
  constructor(t = $.EMPTY) {
    t instanceof $ && (t = { texture: t });
    const {
      texture: e = $.EMPTY,
      anchor: s,
      roundPixels: n,
      width: r,
      height: o,
      ...A
    } = t;
    super({ label: "Sprite", ...A }),
      (this.renderPipeId = "sprite"),
      (this.batched = !0),
      (this._visualBounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }),
      (this._anchor = new Ut({
        _onUpdate: () => {
          this.onViewUpdate();
        },
      })),
      s
        ? (this.anchor = s)
        : e.defaultAnchor && (this.anchor = e.defaultAnchor),
      (this.texture = e),
      (this.allowChildren = !1),
      (this.roundPixels = n ?? !1),
      r !== void 0 && (this.width = r),
      o !== void 0 && (this.height = o);
  }
  static from(t, e = !1) {
    return t instanceof $ ? new et(t) : new et($.from(t, e));
  }
  set texture(t) {
    t || (t = $.EMPTY);
    const e = this._texture;
    e !== t &&
      (e && e.dynamic && e.off("update", this.onViewUpdate, this),
      t.dynamic && t.on("update", this.onViewUpdate, this),
      (this._texture = t),
      this._width && this._setWidth(this._width, this._texture.orig.width),
      this._height && this._setHeight(this._height, this._texture.orig.height),
      this.onViewUpdate());
  }
  get texture() {
    return this._texture;
  }
  get visualBounds() {
    return (
      Ya(this._visualBounds, this._anchor, this._texture), this._visualBounds
    );
  }
  get sourceBounds() {
    return (
      it(
        "8.6.1",
        "Sprite.sourceBounds is deprecated, use visualBounds instead.",
      ),
      this.visualBounds
    );
  }
  updateBounds() {
    const t = this._anchor,
      e = this._texture,
      s = this._bounds,
      { width: n, height: r } = e.orig;
    (s.minX = -t._x * n),
      (s.maxX = s.minX + n),
      (s.minY = -t._y * r),
      (s.maxY = s.minY + r);
  }
  destroy(t = !1) {
    if (
      (super.destroy(t),
      typeof t == "boolean" ? t : t == null ? void 0 : t.texture)
    ) {
      const s =
        typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      this._texture.destroy(s);
    }
    (this._texture = null),
      (this._visualBounds = null),
      (this._bounds = null),
      (this._anchor = null);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
  }
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(t) {
    this._setWidth(t, this._texture.orig.width), (this._width = t);
  }
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(t) {
    this._setHeight(t, this._texture.orig.height), (this._height = t);
  }
  getSize(t) {
    return (
      t || (t = {}),
      (t.width = Math.abs(this.scale.x) * this._texture.orig.width),
      (t.height = Math.abs(this.scale.y) * this._texture.orig.height),
      t
    );
  }
  setSize(t, e) {
    typeof t == "object"
      ? ((e = t.height ?? t.width), (t = t.width))
      : (e ?? (e = t)),
      t !== void 0 && this._setWidth(t, this._texture.orig.width),
      e !== void 0 && this._setHeight(e, this._texture.orig.height);
  }
}
const vA = new Wt();
function co(i, t, e) {
  const s = vA;
  (i.measurable = !0), no(i, e, s), t.addBoundsMask(s), (i.measurable = !1);
}
function uo(i, t, e) {
  const s = ge.get();
  i.measurable = !0;
  const n = kt.get().identity(),
    r = fo(i, e, n);
  ao(i, s, r),
    (i.measurable = !1),
    t.addBoundsMask(s),
    kt.return(n),
    ge.return(s);
}
function fo(i, t, e) {
  return i
    ? (i !== t &&
        (fo(i.parent, t, e),
        i.updateLocalTransform(),
        e.append(i.localTransform)),
      e)
    : (Ct("Mask bounds, renderable is not inside the root container"), e);
}
class go {
  constructor(t) {
    (this.priority = 0),
      (this.inverse = !1),
      (this.pipe = "alphaMask"),
      t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    (this.mask = t),
      (this.renderMaskToTexture = !(t instanceof et)),
      (this.mask.renderable = this.renderMaskToTexture),
      (this.mask.includeInBuild = !this.renderMaskToTexture),
      (this.mask.measurable = !1);
  }
  reset() {
    (this.mask.measurable = !0), (this.mask = null);
  }
  addBounds(t, e) {
    this.inverse || co(this.mask, t, e);
  }
  addLocalBounds(t, e) {
    uo(this.mask, t, e);
  }
  containsPoint(t, e) {
    const s = this.mask;
    return e(s, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof et;
  }
}
go.extension = Y.MaskEffect;
class po {
  constructor(t) {
    (this.priority = 0),
      (this.pipe = "colorMask"),
      t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t;
  }
  destroy() {}
  static test(t) {
    return typeof t == "number";
  }
}
po.extension = Y.MaskEffect;
class mo {
  constructor(t) {
    (this.priority = 0),
      (this.pipe = "stencilMask"),
      t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    (this.mask = t),
      (this.mask.includeInBuild = !1),
      (this.mask.measurable = !1);
  }
  reset() {
    (this.mask.measurable = !0),
      (this.mask.includeInBuild = !0),
      (this.mask = null);
  }
  addBounds(t, e) {
    co(this.mask, t, e);
  }
  addLocalBounds(t, e) {
    uo(this.mask, t, e);
  }
  containsPoint(t, e) {
    const s = this.mask;
    return e(s, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof _;
  }
}
mo.extension = Y.MaskEffect;
const BA = {
  createCanvas: (i, t) => {
    const e = document.createElement("canvas");
    return (e.width = i), (e.height = t), e;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (i, t) => fetch(i, t),
  parseXML: (i) => new DOMParser().parseFromString(i, "text/xml"),
};
let Yn = BA;
const Et = {
  get() {
    return Yn;
  },
  set(i) {
    Yn = i;
  },
};
class yo extends le {
  constructor(t) {
    t.resource || (t.resource = Et.get().createCanvas()),
      t.width ||
        ((t.width = t.resource.width),
        t.autoDensity || (t.width /= t.resolution)),
      t.height ||
        ((t.height = t.resource.height),
        t.autoDensity || (t.height /= t.resolution)),
      super(t),
      (this.uploadMethodId = "image"),
      (this.autoDensity = t.autoDensity),
      this.resizeCanvas(),
      (this.transparent = !!t.transparent);
  }
  resizeCanvas() {
    this.autoDensity &&
      "style" in this.resource &&
      ((this.resource.style.width = `${this.width}px`),
      (this.resource.style.height = `${this.height}px`)),
      (this.resource.width !== this.pixelWidth ||
        this.resource.height !== this.pixelHeight) &&
        ((this.resource.width = this.pixelWidth),
        (this.resource.height = this.pixelHeight));
  }
  resize(t = this.width, e = this.height, s = this._resolution) {
    const n = super.resize(t, e, s);
    return n && this.resizeCanvas(), n;
  }
  static test(t) {
    return (
      (globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement) ||
      (globalThis.OffscreenCanvas && t instanceof OffscreenCanvas)
    );
  }
  get context2D() {
    return (
      this._context2D || (this._context2D = this.resource.getContext("2d"))
    );
  }
}
yo.extension = Y.TextureSource;
class Ne extends le {
  constructor(t) {
    if (
      t.resource &&
      globalThis.HTMLImageElement &&
      t.resource instanceof HTMLImageElement
    ) {
      const e = Et.get().createCanvas(t.resource.width, t.resource.height);
      e
        .getContext("2d")
        .drawImage(t.resource, 0, 0, t.resource.width, t.resource.height),
        (t.resource = e),
        Ct(
          "ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.",
        );
    }
    super(t), (this.uploadMethodId = "image"), (this.autoGarbageCollect = !0);
  }
  static test(t) {
    return (
      (globalThis.HTMLImageElement && t instanceof HTMLImageElement) ||
      (typeof ImageBitmap < "u" && t instanceof ImageBitmap) ||
      (globalThis.VideoFrame && t instanceof VideoFrame)
    );
  }
}
Ne.extension = Y.TextureSource;
var Gi = ((i) => (
  (i[(i.INTERACTION = 50)] = "INTERACTION"),
  (i[(i.HIGH = 25)] = "HIGH"),
  (i[(i.NORMAL = 0)] = "NORMAL"),
  (i[(i.LOW = -25)] = "LOW"),
  (i[(i.UTILITY = -50)] = "UTILITY"),
  i
))(Gi || {});
class rs {
  constructor(t, e = null, s = 0, n = !1) {
    (this.next = null),
      (this.previous = null),
      (this._destroyed = !1),
      (this._fn = t),
      (this._context = e),
      (this.priority = s),
      (this._once = n);
  }
  match(t, e = null) {
    return this._fn === t && this._context === e;
  }
  emit(t) {
    this._fn && (this._context ? this._fn.call(this._context, t) : this._fn(t));
    const e = this.next;
    return (
      this._once && this.destroy(!0), this._destroyed && (this.next = null), e
    );
  }
  connect(t) {
    (this.previous = t),
      t.next && (t.next.previous = this),
      (this.next = t.next),
      (t.next = this);
  }
  destroy(t = !1) {
    (this._destroyed = !0),
      (this._fn = null),
      (this._context = null),
      this.previous && (this.previous.next = this.next),
      this.next && (this.next.previous = this.previous);
    const e = this.next;
    return (this.next = t ? null : e), (this.previous = null), e;
  }
}
const Co = class zt {
  constructor() {
    (this.autoStart = !1),
      (this.deltaTime = 1),
      (this.lastTime = -1),
      (this.speed = 1),
      (this.started = !1),
      (this._requestId = null),
      (this._maxElapsedMS = 100),
      (this._minElapsedMS = 0),
      (this._protected = !1),
      (this._lastFrame = -1),
      (this._head = new rs(null, null, 1 / 0)),
      (this.deltaMS = 1 / zt.targetFPMS),
      (this.elapsedMS = 1 / zt.targetFPMS),
      (this._tick = (t) => {
        (this._requestId = null),
          this.started &&
            (this.update(t),
            this.started &&
              this._requestId === null &&
              this._head.next &&
              (this._requestId = requestAnimationFrame(this._tick)));
      });
  }
  _requestIfNeeded() {
    this._requestId === null &&
      this._head.next &&
      ((this.lastTime = performance.now()),
      (this._lastFrame = this.lastTime),
      (this._requestId = requestAnimationFrame(this._tick)));
  }
  _cancelIfNeeded() {
    this._requestId !== null &&
      (cancelAnimationFrame(this._requestId), (this._requestId = null));
  }
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }
  add(t, e, s = Gi.NORMAL) {
    return this._addListener(new rs(t, e, s));
  }
  addOnce(t, e, s = Gi.NORMAL) {
    return this._addListener(new rs(t, e, s, !0));
  }
  _addListener(t) {
    let e = this._head.next,
      s = this._head;
    if (!e) t.connect(s);
    else {
      for (; e; ) {
        if (t.priority > e.priority) {
          t.connect(s);
          break;
        }
        (s = e), (e = e.next);
      }
      t.previous || t.connect(s);
    }
    return this._startIfPossible(), this;
  }
  remove(t, e) {
    let s = this._head.next;
    for (; s; ) s.match(t, e) ? (s = s.destroy()) : (s = s.next);
    return this._head.next || this._cancelIfNeeded(), this;
  }
  get count() {
    if (!this._head) return 0;
    let t = 0,
      e = this._head;
    for (; (e = e.next); ) t++;
    return t;
  }
  start() {
    this.started || ((this.started = !0), this._requestIfNeeded());
  }
  stop() {
    this.started && ((this.started = !1), this._cancelIfNeeded());
  }
  destroy() {
    if (!this._protected) {
      this.stop();
      let t = this._head.next;
      for (; t; ) t = t.destroy(!0);
      this._head.destroy(), (this._head = null);
    }
  }
  update(t = performance.now()) {
    let e;
    if (t > this.lastTime) {
      if (
        ((e = this.elapsedMS = t - this.lastTime),
        e > this._maxElapsedMS && (e = this._maxElapsedMS),
        (e *= this.speed),
        this._minElapsedMS)
      ) {
        const r = (t - this._lastFrame) | 0;
        if (r < this._minElapsedMS) return;
        this._lastFrame = t - (r % this._minElapsedMS);
      }
      (this.deltaMS = e), (this.deltaTime = this.deltaMS * zt.targetFPMS);
      const s = this._head;
      let n = s.next;
      for (; n; ) n = n.emit(this);
      s.next || this._cancelIfNeeded();
    } else this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = t;
  }
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(t) {
    const e = Math.min(this.maxFPS, t),
      s = Math.min(Math.max(0, e) / 1e3, zt.targetFPMS);
    this._maxElapsedMS = 1 / s;
  }
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
  }
  set maxFPS(t) {
    if (t === 0) this._minElapsedMS = 0;
    else {
      const e = Math.max(this.minFPS, t);
      this._minElapsedMS = 1 / (e / 1e3);
    }
  }
  static get shared() {
    if (!zt._shared) {
      const t = (zt._shared = new zt());
      (t.autoStart = !0), (t._protected = !0);
    }
    return zt._shared;
  }
  static get system() {
    if (!zt._system) {
      const t = (zt._system = new zt());
      (t.autoStart = !0), (t._protected = !0);
    }
    return zt._system;
  }
};
Co.targetFPMS = 0.06;
let Me = Co,
  os;
async function xo() {
  return (
    os ??
      (os = (async () => {
        var o;
        const t = document.createElement("canvas").getContext("webgl");
        if (!t) return "premultiply-alpha-on-upload";
        const e = await new Promise((A) => {
          const h = document.createElement("video");
          (h.onloadeddata = () => A(h)),
            (h.onerror = () => A(null)),
            (h.autoplay = !1),
            (h.crossOrigin = "anonymous"),
            (h.preload = "auto"),
            (h.src =
              "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM="),
            h.load();
        });
        if (!e) return "premultiply-alpha-on-upload";
        const s = t.createTexture();
        t.bindTexture(t.TEXTURE_2D, s);
        const n = t.createFramebuffer();
        t.bindFramebuffer(t.FRAMEBUFFER, n),
          t.framebufferTexture2D(
            t.FRAMEBUFFER,
            t.COLOR_ATTACHMENT0,
            t.TEXTURE_2D,
            s,
            0,
          ),
          t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
          t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE),
          t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
        const r = new Uint8Array(4);
        return (
          t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, r),
          t.deleteFramebuffer(n),
          t.deleteTexture(s),
          (o = t.getExtension("WEBGL_lose_context")) == null || o.loseContext(),
          r[0] <= r[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload"
        );
      })()),
    os
  );
}
const Yi = class wo extends le {
  constructor(t) {
    super(t),
      (this.isReady = !1),
      (this.uploadMethodId = "video"),
      (t = { ...wo.defaultOptions, ...t }),
      (this._autoUpdate = !0),
      (this._isConnectedToTicker = !1),
      (this._updateFPS = t.updateFPS || 0),
      (this._msToNextUpdate = 0),
      (this.autoPlay = t.autoPlay !== !1),
      (this.alphaMode = t.alphaMode ?? "premultiply-alpha-on-upload"),
      (this._videoFrameRequestCallback =
        this._videoFrameRequestCallback.bind(this)),
      (this._videoFrameRequestCallbackHandle = null),
      (this._load = null),
      (this._resolve = null),
      (this._reject = null),
      (this._onCanPlay = this._onCanPlay.bind(this)),
      (this._onCanPlayThrough = this._onCanPlayThrough.bind(this)),
      (this._onError = this._onError.bind(this)),
      (this._onPlayStart = this._onPlayStart.bind(this)),
      (this._onPlayStop = this._onPlayStop.bind(this)),
      (this._onSeeked = this._onSeeked.bind(this)),
      t.autoLoad !== !1 && this.load();
  }
  updateFrame() {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const t = Me.shared.elapsedMS * this.resource.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - t);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) &&
        (this._msToNextUpdate = this._updateFPS
          ? Math.floor(1e3 / this._updateFPS)
          : 0),
        this.isValid && this.update();
    }
  }
  _videoFrameRequestCallback() {
    this.updateFrame(),
      this.destroyed
        ? (this._videoFrameRequestCallbackHandle = null)
        : (this._videoFrameRequestCallbackHandle =
            this.resource.requestVideoFrameCallback(
              this._videoFrameRequestCallback,
            ));
  }
  get isValid() {
    return !!this.resource.videoWidth && !!this.resource.videoHeight;
  }
  async load() {
    if (this._load) return this._load;
    const t = this.resource,
      e = this.options;
    return (
      (t.readyState === t.HAVE_ENOUGH_DATA ||
        t.readyState === t.HAVE_FUTURE_DATA) &&
        t.width &&
        t.height &&
        (t.complete = !0),
      t.addEventListener("play", this._onPlayStart),
      t.addEventListener("pause", this._onPlayStop),
      t.addEventListener("seeked", this._onSeeked),
      this._isSourceReady()
        ? this._mediaReady()
        : (e.preload || t.addEventListener("canplay", this._onCanPlay),
          t.addEventListener("canplaythrough", this._onCanPlayThrough),
          t.addEventListener("error", this._onError, !0)),
      (this.alphaMode = await xo()),
      (this._load = new Promise((s, n) => {
        this.isValid
          ? s(this)
          : ((this._resolve = s),
            (this._reject = n),
            e.preloadTimeoutMs !== void 0 &&
              (this._preloadTimeout = setTimeout(() => {
                this._onError(
                  new ErrorEvent(
                    `Preload exceeded timeout of ${e.preloadTimeoutMs}ms`,
                  ),
                );
              })),
            t.load());
      })),
      this._load
    );
  }
  _onError(t) {
    this.resource.removeEventListener("error", this._onError, !0),
      this.emit("error", t),
      this._reject &&
        (this._reject(t), (this._reject = null), (this._resolve = null));
  }
  _isSourcePlaying() {
    const t = this.resource;
    return !t.paused && !t.ended;
  }
  _isSourceReady() {
    return this.resource.readyState > 2;
  }
  _onPlayStart() {
    this.isValid || this._mediaReady(), this._configureAutoUpdate();
  }
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  _onSeeked() {
    this._autoUpdate &&
      !this._isSourcePlaying() &&
      ((this._msToNextUpdate = 0),
      this.updateFrame(),
      (this._msToNextUpdate = 0));
  }
  _onCanPlay() {
    this.resource.removeEventListener("canplay", this._onCanPlay),
      this._mediaReady();
  }
  _onCanPlayThrough() {
    this.resource.removeEventListener("canplaythrough", this._onCanPlay),
      this._preloadTimeout &&
        (clearTimeout(this._preloadTimeout), (this._preloadTimeout = void 0)),
      this._mediaReady();
  }
  _mediaReady() {
    const t = this.resource;
    this.isValid &&
      ((this.isReady = !0), this.resize(t.videoWidth, t.videoHeight)),
      (this._msToNextUpdate = 0),
      this.updateFrame(),
      (this._msToNextUpdate = 0),
      this._resolve &&
        (this._resolve(this), (this._resolve = null), (this._reject = null)),
      this._isSourcePlaying()
        ? this._onPlayStart()
        : this.autoPlay && this.resource.play();
  }
  destroy() {
    this._configureAutoUpdate();
    const t = this.resource;
    t &&
      (t.removeEventListener("play", this._onPlayStart),
      t.removeEventListener("pause", this._onPlayStop),
      t.removeEventListener("seeked", this._onSeeked),
      t.removeEventListener("canplay", this._onCanPlay),
      t.removeEventListener("canplaythrough", this._onCanPlayThrough),
      t.removeEventListener("error", this._onError, !0),
      t.pause(),
      (t.src = ""),
      t.load()),
      super.destroy();
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    t !== this._autoUpdate &&
      ((this._autoUpdate = t), this._configureAutoUpdate());
  }
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(t) {
    t !== this._updateFPS &&
      ((this._updateFPS = t), this._configureAutoUpdate());
  }
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying()
      ? !this._updateFPS && this.resource.requestVideoFrameCallback
        ? (this._isConnectedToTicker &&
            (Me.shared.remove(this.updateFrame, this),
            (this._isConnectedToTicker = !1),
            (this._msToNextUpdate = 0)),
          this._videoFrameRequestCallbackHandle === null &&
            (this._videoFrameRequestCallbackHandle =
              this.resource.requestVideoFrameCallback(
                this._videoFrameRequestCallback,
              )))
        : (this._videoFrameRequestCallbackHandle !== null &&
            (this.resource.cancelVideoFrameCallback(
              this._videoFrameRequestCallbackHandle,
            ),
            (this._videoFrameRequestCallbackHandle = null)),
          this._isConnectedToTicker ||
            (Me.shared.add(this.updateFrame, this),
            (this._isConnectedToTicker = !0),
            (this._msToNextUpdate = 0)))
      : (this._videoFrameRequestCallbackHandle !== null &&
          (this.resource.cancelVideoFrameCallback(
            this._videoFrameRequestCallbackHandle,
          ),
          (this._videoFrameRequestCallbackHandle = null)),
        this._isConnectedToTicker &&
          (Me.shared.remove(this.updateFrame, this),
          (this._isConnectedToTicker = !1),
          (this._msToNextUpdate = 0)));
  }
  static test(t) {
    return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement;
  }
};
Yi.extension = Y.TextureSource;
Yi.defaultOptions = {
  ...le.defaultOptions,
  autoLoad: !0,
  autoPlay: !0,
  updateFPS: 0,
  crossorigin: !0,
  loop: !1,
  muted: !0,
  playsinline: !0,
  preload: !1,
};
Yi.MIME_TYPES = { ogv: "video/ogg", mov: "video/quicktime", m4v: "video/mp4" };
let Di = Yi;
const Zt = (i, t, e = !1) => (
  Array.isArray(i) || (i = [i]),
  t ? i.map((s) => (typeof s == "string" || e ? t(s) : s)) : i
);
class IA {
  constructor() {
    (this._parsers = []),
      (this._cache = new Map()),
      (this._cacheMap = new Map());
  }
  reset() {
    this._cacheMap.clear(), this._cache.clear();
  }
  has(t) {
    return this._cache.has(t);
  }
  get(t) {
    const e = this._cache.get(t);
    return e || Ct(`[Assets] Asset id ${t} was not found in the Cache`), e;
  }
  set(t, e) {
    const s = Zt(t);
    let n;
    for (let h = 0; h < this.parsers.length; h++) {
      const l = this.parsers[h];
      if (l.test(e)) {
        n = l.getCacheableAssets(s, e);
        break;
      }
    }
    const r = new Map(Object.entries(n || {}));
    n ||
      s.forEach((h) => {
        r.set(h, e);
      });
    const o = [...r.keys()],
      A = { cacheKeys: o, keys: s };
    s.forEach((h) => {
      this._cacheMap.set(h, A);
    }),
      o.forEach((h) => {
        const l = n ? n[h] : e;
        this._cache.has(h) &&
          this._cache.get(h) !== l &&
          Ct("[Cache] already has key:", h),
          this._cache.set(h, r.get(h));
      });
  }
  remove(t) {
    if (!this._cacheMap.has(t)) {
      Ct(`[Assets] Asset id ${t} was not found in the Cache`);
      return;
    }
    const e = this._cacheMap.get(t);
    e.cacheKeys.forEach((n) => {
      this._cache.delete(n);
    }),
      e.keys.forEach((n) => {
        this._cacheMap.delete(n);
      });
  }
  get parsers() {
    return this._parsers;
  }
}
const bt = new IA(),
  Rs = [];
Dt.handleByList(Y.TextureSource, Rs);
function bo(i = {}) {
  const t = i && i.resource,
    e = t ? i.resource : i,
    s = t ? i : { resource: i };
  for (let n = 0; n < Rs.length; n++) {
    const r = Rs[n];
    if (r.test(e)) return new r(s);
  }
  throw new Error(`Could not find a source type for resource: ${s.resource}`);
}
function MA(i = {}, t = !1) {
  const e = i && i.resource,
    s = e ? i.resource : i,
    n = e ? i : { resource: i };
  if (!t && bt.has(s)) return bt.get(s);
  const r = new $({ source: bo(n) });
  return (
    r.on("destroy", () => {
      bt.has(s) && bt.remove(s);
    }),
    t || bt.set(s, r),
    r
  );
}
function SA(i, t = !1) {
  return typeof i == "string"
    ? bt.get(i)
    : i instanceof le
      ? new $({ source: i })
      : MA(i, t);
}
$.from = SA;
le.from = bo;
Dt.add(go, po, mo, Di, Ne, yo, en);
var De = ((i) => (
  (i[(i.Low = 0)] = "Low"),
  (i[(i.Normal = 1)] = "Normal"),
  (i[(i.High = 2)] = "High"),
  i
))(De || {});
function qt(i) {
  if (typeof i != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(i)}`);
}
function ti(i) {
  return i.split("?")[0].split("#")[0];
}
function QA(i) {
  return i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function DA(i, t, e) {
  return i.replace(new RegExp(QA(t), "g"), e);
}
function PA(i, t) {
  let e = "",
    s = 0,
    n = -1,
    r = 0,
    o = -1;
  for (let A = 0; A <= i.length; ++A) {
    if (A < i.length) o = i.charCodeAt(A);
    else {
      if (o === 47) break;
      o = 47;
    }
    if (o === 47) {
      if (!(n === A - 1 || r === 1))
        if (n !== A - 1 && r === 2) {
          if (
            e.length < 2 ||
            s !== 2 ||
            e.charCodeAt(e.length - 1) !== 46 ||
            e.charCodeAt(e.length - 2) !== 46
          ) {
            if (e.length > 2) {
              const h = e.lastIndexOf("/");
              if (h !== e.length - 1) {
                h === -1
                  ? ((e = ""), (s = 0))
                  : ((e = e.slice(0, h)),
                    (s = e.length - 1 - e.lastIndexOf("/"))),
                  (n = A),
                  (r = 0);
                continue;
              }
            } else if (e.length === 2 || e.length === 1) {
              (e = ""), (s = 0), (n = A), (r = 0);
              continue;
            }
          }
        } else
          e.length > 0
            ? (e += `/${i.slice(n + 1, A)}`)
            : (e = i.slice(n + 1, A)),
            (s = A - n - 1);
      (n = A), (r = 0);
    } else o === 46 && r !== -1 ? ++r : (r = -1);
  }
  return e;
}
const Lt = {
  toPosix(i) {
    return DA(i, "\\", "/");
  },
  isUrl(i) {
    return /^https?:/.test(this.toPosix(i));
  },
  isDataUrl(i) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(
      i,
    );
  },
  isBlobUrl(i) {
    return i.startsWith("blob:");
  },
  hasProtocol(i) {
    return /^[^/:]+:/.test(this.toPosix(i));
  },
  getProtocol(i) {
    qt(i), (i = this.toPosix(i));
    const t = /^file:\/\/\//.exec(i);
    if (t) return t[0];
    const e = /^[^/:]+:\/{0,2}/.exec(i);
    return e ? e[0] : "";
  },
  toAbsolute(i, t, e) {
    if ((qt(i), this.isDataUrl(i) || this.isBlobUrl(i))) return i;
    const s = ti(this.toPosix(t ?? Et.get().getBaseUrl())),
      n = ti(this.toPosix(e ?? this.rootname(s)));
    return (
      (i = this.toPosix(i)),
      i.startsWith("/")
        ? Lt.join(n, i.slice(1))
        : this.isAbsolute(i)
          ? i
          : this.join(s, i)
    );
  },
  normalize(i) {
    if ((qt(i), i.length === 0)) return ".";
    if (this.isDataUrl(i) || this.isBlobUrl(i)) return i;
    i = this.toPosix(i);
    let t = "";
    const e = i.startsWith("/");
    this.hasProtocol(i) && ((t = this.rootname(i)), (i = i.slice(t.length)));
    const s = i.endsWith("/");
    return (i = PA(i)), i.length > 0 && s && (i += "/"), e ? `/${i}` : t + i;
  },
  isAbsolute(i) {
    return (
      qt(i), (i = this.toPosix(i)), this.hasProtocol(i) ? !0 : i.startsWith("/")
    );
  },
  join(...i) {
    if (i.length === 0) return ".";
    let t;
    for (let e = 0; e < i.length; ++e) {
      const s = i[e];
      if ((qt(s), s.length > 0))
        if (t === void 0) t = s;
        else {
          const n = i[e - 1] ?? "";
          this.joinExtensions.includes(this.extname(n).toLowerCase())
            ? (t += `/../${s}`)
            : (t += `/${s}`);
        }
    }
    return t === void 0 ? "." : this.normalize(t);
  },
  dirname(i) {
    if ((qt(i), i.length === 0)) return ".";
    i = this.toPosix(i);
    let t = i.charCodeAt(0);
    const e = t === 47;
    let s = -1,
      n = !0;
    const r = this.getProtocol(i),
      o = i;
    i = i.slice(r.length);
    for (let A = i.length - 1; A >= 1; --A)
      if (((t = i.charCodeAt(A)), t === 47)) {
        if (!n) {
          s = A;
          break;
        }
      } else n = !1;
    return s === -1
      ? e
        ? "/"
        : this.isUrl(o)
          ? r + i
          : r
      : e && s === 1
        ? "//"
        : r + i.slice(0, s);
  },
  rootname(i) {
    qt(i), (i = this.toPosix(i));
    let t = "";
    if (
      (i.startsWith("/") ? (t = "/") : (t = this.getProtocol(i)), this.isUrl(i))
    ) {
      const e = i.indexOf("/", t.length);
      e !== -1 ? (t = i.slice(0, e)) : (t = i), t.endsWith("/") || (t += "/");
    }
    return t;
  },
  basename(i, t) {
    qt(i), t && qt(t), (i = ti(this.toPosix(i)));
    let e = 0,
      s = -1,
      n = !0,
      r;
    if (t !== void 0 && t.length > 0 && t.length <= i.length) {
      if (t.length === i.length && t === i) return "";
      let o = t.length - 1,
        A = -1;
      for (r = i.length - 1; r >= 0; --r) {
        const h = i.charCodeAt(r);
        if (h === 47) {
          if (!n) {
            e = r + 1;
            break;
          }
        } else
          A === -1 && ((n = !1), (A = r + 1)),
            o >= 0 &&
              (h === t.charCodeAt(o)
                ? --o === -1 && (s = r)
                : ((o = -1), (s = A)));
      }
      return e === s ? (s = A) : s === -1 && (s = i.length), i.slice(e, s);
    }
    for (r = i.length - 1; r >= 0; --r)
      if (i.charCodeAt(r) === 47) {
        if (!n) {
          e = r + 1;
          break;
        }
      } else s === -1 && ((n = !1), (s = r + 1));
    return s === -1 ? "" : i.slice(e, s);
  },
  extname(i) {
    qt(i), (i = ti(this.toPosix(i)));
    let t = -1,
      e = 0,
      s = -1,
      n = !0,
      r = 0;
    for (let o = i.length - 1; o >= 0; --o) {
      const A = i.charCodeAt(o);
      if (A === 47) {
        if (!n) {
          e = o + 1;
          break;
        }
        continue;
      }
      s === -1 && ((n = !1), (s = o + 1)),
        A === 46
          ? t === -1
            ? (t = o)
            : r !== 1 && (r = 1)
          : t !== -1 && (r = -1);
    }
    return t === -1 ||
      s === -1 ||
      r === 0 ||
      (r === 1 && t === s - 1 && t === e + 1)
      ? ""
      : i.slice(t, s);
  },
  parse(i) {
    qt(i);
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (i.length === 0) return t;
    i = ti(this.toPosix(i));
    let e = i.charCodeAt(0);
    const s = this.isAbsolute(i);
    let n;
    (t.root = this.rootname(i)), s || this.hasProtocol(i) ? (n = 1) : (n = 0);
    let r = -1,
      o = 0,
      A = -1,
      h = !0,
      l = i.length - 1,
      d = 0;
    for (; l >= n; --l) {
      if (((e = i.charCodeAt(l)), e === 47)) {
        if (!h) {
          o = l + 1;
          break;
        }
        continue;
      }
      A === -1 && ((h = !1), (A = l + 1)),
        e === 46
          ? r === -1
            ? (r = l)
            : d !== 1 && (d = 1)
          : r !== -1 && (d = -1);
    }
    return (
      r === -1 || A === -1 || d === 0 || (d === 1 && r === A - 1 && r === o + 1)
        ? A !== -1 &&
          (o === 0 && s
            ? (t.base = t.name = i.slice(1, A))
            : (t.base = t.name = i.slice(o, A)))
        : (o === 0 && s
            ? ((t.name = i.slice(1, r)), (t.base = i.slice(1, A)))
            : ((t.name = i.slice(o, r)), (t.base = i.slice(o, A))),
          (t.ext = i.slice(r, A))),
      (t.dir = this.dirname(i)),
      t
    );
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"],
};
function Eo(i, t, e, s, n) {
  const r = t[e];
  for (let o = 0; o < r.length; o++) {
    const A = r[o];
    e < t.length - 1
      ? Eo(i.replace(s[e], A), t, e + 1, s, n)
      : n.push(i.replace(s[e], A));
  }
}
function RA(i) {
  const t = /\{(.*?)\}/g,
    e = i.match(t),
    s = [];
  if (e) {
    const n = [];
    e.forEach((r) => {
      const o = r.substring(1, r.length - 1).split(",");
      n.push(o);
    }),
      Eo(i, n, 0, e, s);
  } else s.push(i);
  return s;
}
const Ui = (i) => !Array.isArray(i);
class We {
  constructor() {
    (this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (t, e) => `${t}${this._bundleIdConnector}${e}`,
      extractAssetIdFromBundle: (t, e) =>
        e.replace(`${t}${this._bundleIdConnector}`, ""),
    }),
      (this._bundleIdConnector =
        this._defaultBundleIdentifierOptions.connector),
      (this._createBundleAssetId =
        this._defaultBundleIdentifierOptions.createBundleAssetId),
      (this._extractAssetIdFromBundle =
        this._defaultBundleIdentifierOptions.extractAssetIdFromBundle),
      (this._assetMap = {}),
      (this._preferredOrder = []),
      (this._parsers = []),
      (this._resolverHash = {}),
      (this._bundles = {});
  }
  setBundleIdentifier(t) {
    if (
      ((this._bundleIdConnector = t.connector ?? this._bundleIdConnector),
      (this._createBundleAssetId =
        t.createBundleAssetId ?? this._createBundleAssetId),
      (this._extractAssetIdFromBundle =
        t.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle),
      this._extractAssetIdFromBundle(
        "foo",
        this._createBundleAssetId("foo", "bar"),
      ) !== "bar")
    )
      throw new Error(
        "[Resolver] GenerateBundleAssetId are not working correctly",
      );
  }
  prefer(...t) {
    t.forEach((e) => {
      this._preferredOrder.push(e),
        e.priority || (e.priority = Object.keys(e.params));
    }),
      (this._resolverHash = {});
  }
  set basePath(t) {
    this._basePath = t;
  }
  get basePath() {
    return this._basePath;
  }
  set rootPath(t) {
    this._rootPath = t;
  }
  get rootPath() {
    return this._rootPath;
  }
  get parsers() {
    return this._parsers;
  }
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions),
      (this._assetMap = {}),
      (this._preferredOrder = []),
      (this._resolverHash = {}),
      (this._rootPath = null),
      (this._basePath = null),
      (this._manifest = null),
      (this._bundles = {}),
      (this._defaultSearchParams = null);
  }
  setDefaultSearchParams(t) {
    if (typeof t == "string") this._defaultSearchParams = t;
    else {
      const e = t;
      this._defaultSearchParams = Object.keys(e)
        .map((s) => `${encodeURIComponent(s)}=${encodeURIComponent(e[s])}`)
        .join("&");
    }
  }
  getAlias(t) {
    const { alias: e, src: s } = t;
    return Zt(
      e || s,
      (r) =>
        typeof r == "string"
          ? r
          : Array.isArray(r)
            ? r.map((o) => (o == null ? void 0 : o.src) ?? o)
            : r != null && r.src
              ? r.src
              : r,
      !0,
    );
  }
  addManifest(t) {
    this._manifest &&
      Ct("[Resolver] Manifest already exists, this will be overwritten"),
      (this._manifest = t),
      t.bundles.forEach((e) => {
        this.addBundle(e.name, e.assets);
      });
  }
  addBundle(t, e) {
    const s = [];
    let n = e;
    Array.isArray(e) ||
      (n = Object.entries(e).map(([r, o]) =>
        typeof o == "string" || Array.isArray(o)
          ? { alias: r, src: o }
          : { alias: r, ...o },
      )),
      n.forEach((r) => {
        const o = r.src,
          A = r.alias;
        let h;
        if (typeof A == "string") {
          const l = this._createBundleAssetId(t, A);
          s.push(l), (h = [A, l]);
        } else {
          const l = A.map((d) => this._createBundleAssetId(t, d));
          s.push(...l), (h = [...A, ...l]);
        }
        this.add({ ...r, alias: h, src: o });
      }),
      (this._bundles[t] = s);
  }
  add(t) {
    const e = [];
    Array.isArray(t) ? e.push(...t) : e.push(t);
    let s;
    (s = (r) => {
      this.hasKey(r) && Ct(`[Resolver] already has key: ${r} overwriting`);
    }),
      Zt(e).forEach((r) => {
        const { src: o } = r;
        let { data: A, format: h, loadParser: l } = r;
        const d = Zt(o).map((u) =>
            typeof u == "string" ? RA(u) : Array.isArray(u) ? u : [u],
          ),
          a = this.getAlias(r);
        Array.isArray(a) ? a.forEach(s) : s(a);
        const c = [];
        d.forEach((u) => {
          u.forEach((g) => {
            let y = {};
            if (typeof g != "object") {
              y.src = g;
              for (let m = 0; m < this._parsers.length; m++) {
                const C = this._parsers[m];
                if (C.test(g)) {
                  y = C.parse(g);
                  break;
                }
              }
            } else
              (A = g.data ?? A),
                (h = g.format ?? h),
                (l = g.loadParser ?? l),
                (y = { ...y, ...g });
            if (!a)
              throw new Error(
                `[Resolver] alias is undefined for this asset: ${y.src}`,
              );
            (y = this._buildResolvedAsset(y, {
              aliases: a,
              data: A,
              format: h,
              loadParser: l,
            })),
              c.push(y);
          });
        }),
          a.forEach((u) => {
            this._assetMap[u] = c;
          });
      });
  }
  resolveBundle(t) {
    const e = Ui(t);
    t = Zt(t);
    const s = {};
    return (
      t.forEach((n) => {
        const r = this._bundles[n];
        if (r) {
          const o = this.resolve(r),
            A = {};
          for (const h in o) {
            const l = o[h];
            A[this._extractAssetIdFromBundle(n, h)] = l;
          }
          s[n] = A;
        }
      }),
      e ? s[t[0]] : s
    );
  }
  resolveUrl(t) {
    const e = this.resolve(t);
    if (typeof t != "string") {
      const s = {};
      for (const n in e) s[n] = e[n].src;
      return s;
    }
    return e.src;
  }
  resolve(t) {
    const e = Ui(t);
    t = Zt(t);
    const s = {};
    return (
      t.forEach((n) => {
        if (!this._resolverHash[n])
          if (this._assetMap[n]) {
            let r = this._assetMap[n];
            const o = this._getPreferredOrder(r);
            o == null ||
              o.priority.forEach((A) => {
                o.params[A].forEach((h) => {
                  const l = r.filter((d) => (d[A] ? d[A] === h : !1));
                  l.length && (r = l);
                });
              }),
              (this._resolverHash[n] = r[0]);
          } else
            this._resolverHash[n] = this._buildResolvedAsset(
              { alias: [n], src: n },
              {},
            );
        s[n] = this._resolverHash[n];
      }),
      e ? s[t[0]] : s
    );
  }
  hasKey(t) {
    return !!this._assetMap[t];
  }
  hasBundle(t) {
    return !!this._bundles[t];
  }
  _getPreferredOrder(t) {
    for (let e = 0; e < t.length; e++) {
      const s = t[e],
        n = this._preferredOrder.find((r) =>
          r.params.format.includes(s.format),
        );
      if (n) return n;
    }
    return this._preferredOrder[0];
  }
  _appendDefaultSearchParams(t) {
    if (!this._defaultSearchParams) return t;
    const e = /\?/.test(t) ? "&" : "?";
    return `${t}${e}${this._defaultSearchParams}`;
  }
  _buildResolvedAsset(t, e) {
    const { aliases: s, data: n, loadParser: r, format: o } = e;
    return (
      (this._basePath || this._rootPath) &&
        (t.src = Lt.toAbsolute(t.src, this._basePath, this._rootPath)),
      (t.alias = s ?? t.alias ?? [t.src]),
      (t.src = this._appendDefaultSearchParams(t.src)),
      (t.data = { ...(n || {}), ...t.data }),
      (t.loadParser = r ?? t.loadParser),
      (t.format = o ?? t.format ?? FA(t.src)),
      t
    );
  }
}
We.RETINA_PREFIX = /@([0-9\.]+)x/;
function FA(i) {
  return i.split(".").pop().split("?").shift().split("#").shift();
}
const Fs = (i, t) => {
    const e = t.split("?")[1];
    return e && (i += `?${e}`), i;
  },
  vo = class oi {
    constructor(t, e) {
      (this.linkedSheets = []),
        (this._texture = t instanceof $ ? t : null),
        (this.textureSource = t.source),
        (this.textures = {}),
        (this.animations = {}),
        (this.data = e);
      const s = parseFloat(e.meta.scale);
      s
        ? ((this.resolution = s), (t.source.resolution = this.resolution))
        : (this.resolution = t.source._resolution),
        (this._frames = this.data.frames),
        (this._frameKeys = Object.keys(this._frames)),
        (this._batchIndex = 0),
        (this._callback = null);
    }
    parse() {
      return new Promise((t) => {
        (this._callback = t),
          (this._batchIndex = 0),
          this._frameKeys.length <= oi.BATCH_SIZE
            ? (this._processFrames(0),
              this._processAnimations(),
              this._parseComplete())
            : this._nextBatch();
      });
    }
    _processFrames(t) {
      let e = t;
      const s = oi.BATCH_SIZE;
      for (; e - t < s && e < this._frameKeys.length; ) {
        const n = this._frameKeys[e],
          r = this._frames[n],
          o = r.frame;
        if (o) {
          let A = null,
            h = null;
          const l = r.trimmed !== !1 && r.sourceSize ? r.sourceSize : r.frame,
            d = new Bt(
              0,
              0,
              Math.floor(l.w) / this.resolution,
              Math.floor(l.h) / this.resolution,
            );
          r.rotated
            ? (A = new Bt(
                Math.floor(o.x) / this.resolution,
                Math.floor(o.y) / this.resolution,
                Math.floor(o.h) / this.resolution,
                Math.floor(o.w) / this.resolution,
              ))
            : (A = new Bt(
                Math.floor(o.x) / this.resolution,
                Math.floor(o.y) / this.resolution,
                Math.floor(o.w) / this.resolution,
                Math.floor(o.h) / this.resolution,
              )),
            r.trimmed !== !1 &&
              r.spriteSourceSize &&
              (h = new Bt(
                Math.floor(r.spriteSourceSize.x) / this.resolution,
                Math.floor(r.spriteSourceSize.y) / this.resolution,
                Math.floor(o.w) / this.resolution,
                Math.floor(o.h) / this.resolution,
              )),
            (this.textures[n] = new $({
              source: this.textureSource,
              frame: A,
              orig: d,
              trim: h,
              rotate: r.rotated ? 2 : 0,
              defaultAnchor: r.anchor,
              defaultBorders: r.borders,
              label: n.toString(),
            }));
        }
        e++;
      }
    }
    _processAnimations() {
      const t = this.data.animations || {};
      for (const e in t) {
        this.animations[e] = [];
        for (let s = 0; s < t[e].length; s++) {
          const n = t[e][s];
          this.animations[e].push(this.textures[n]);
        }
      }
    }
    _parseComplete() {
      const t = this._callback;
      (this._callback = null),
        (this._batchIndex = 0),
        t.call(this, this.textures);
    }
    _nextBatch() {
      this._processFrames(this._batchIndex * oi.BATCH_SIZE),
        this._batchIndex++,
        setTimeout(() => {
          this._batchIndex * oi.BATCH_SIZE < this._frameKeys.length
            ? this._nextBatch()
            : (this._processAnimations(), this._parseComplete());
        }, 0);
    }
    destroy(t = !1) {
      var e;
      for (const s in this.textures) this.textures[s].destroy();
      (this._frames = null),
        (this._frameKeys = null),
        (this.data = null),
        (this.textures = null),
        t &&
          ((e = this._texture) == null || e.destroy(),
          this.textureSource.destroy()),
        (this._texture = null),
        (this.textureSource = null),
        (this.linkedSheets = []);
    }
  };
vo.BATCH_SIZE = 1e3;
let Xn = vo;
const TA = [
  "jpg",
  "png",
  "jpeg",
  "avif",
  "webp",
  "basis",
  "etc2",
  "bc7",
  "bc6h",
  "bc5",
  "bc4",
  "bc3",
  "bc2",
  "bc1",
  "eac",
  "astc",
];
function Bo(i, t, e) {
  const s = {};
  if (
    (i.forEach((n) => {
      s[n] = t;
    }),
    Object.keys(t.textures).forEach((n) => {
      s[n] = t.textures[n];
    }),
    !e)
  ) {
    const n = Lt.dirname(i[0]);
    t.linkedSheets.forEach((r, o) => {
      const A = Bo([`${n}/${t.data.meta.related_multi_packs[o]}`], r, !0);
      Object.assign(s, A);
    });
  }
  return s;
}
const kA = {
  extension: Y.Asset,
  cache: {
    test: (i) => i instanceof Xn,
    getCacheableAssets: (i, t) => Bo(i, t, !1),
  },
  resolver: {
    extension: { type: Y.ResolveParser, name: "resolveSpritesheet" },
    test: (i) => {
      const e = i.split("?")[0].split("."),
        s = e.pop(),
        n = e.pop();
      return s === "json" && TA.includes(n);
    },
    parse: (i) => {
      var e;
      const t = i.split(".");
      return {
        resolution: parseFloat(
          ((e = We.RETINA_PREFIX.exec(i)) == null ? void 0 : e[1]) ?? "1",
        ),
        format: t[t.length - 2],
        src: i,
      };
    },
  },
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: Y.LoadParser,
      priority: De.Normal,
      name: "spritesheetLoader",
    },
    async testParse(i, t) {
      return Lt.extname(t.src).toLowerCase() === ".json" && !!i.frames;
    },
    async parse(i, t, e) {
      var d, a;
      const {
        texture: s,
        imageFilename: n,
        textureOptions: r,
      } = (t == null ? void 0 : t.data) ?? {};
      let o = Lt.dirname(t.src);
      o && o.lastIndexOf("/") !== o.length - 1 && (o += "/");
      let A;
      if (s instanceof $) A = s;
      else {
        const c = Fs(o + (n ?? i.meta.image), t.src);
        A = (await e.load([{ src: c, data: r }]))[c];
      }
      const h = new Xn(A.source, i);
      await h.parse();
      const l =
        (d = i == null ? void 0 : i.meta) == null
          ? void 0
          : d.related_multi_packs;
      if (Array.isArray(l)) {
        const c = [];
        for (const g of l) {
          if (typeof g != "string") continue;
          let y = o + g;
          ((a = t.data) != null && a.ignoreMultiPack) ||
            ((y = Fs(y, t.src)),
            c.push(
              e.load({
                src: y,
                data: { textureOptions: r, ignoreMultiPack: !0 },
              }),
            ));
        }
        const u = await Promise.all(c);
        (h.linkedSheets = u),
          u.forEach((g) => {
            g.linkedSheets = [h].concat(h.linkedSheets.filter((y) => y !== g));
          });
      }
      return h;
    },
    async unload(i, t, e) {
      await e.unload(i.textureSource._sourceOrigin), i.destroy(!1);
    },
  },
};
Dt.add(kA);
const as = Object.create(null),
  Vn = Object.create(null);
function on(i, t) {
  let e = Vn[i];
  return (
    e === void 0 && (as[t] === void 0 && (as[t] = 1), (Vn[i] = e = as[t]++)), e
  );
}
let je;
function Io() {
  return (
    (!je || (je != null && je.isContextLost())) &&
      (je = Et.get().createCanvas().getContext("webgl", {})),
    je
  );
}
let wi;
function GA() {
  if (!wi) {
    wi = "mediump";
    const i = Io();
    i &&
      i.getShaderPrecisionFormat &&
      (wi = i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT)
        .precision
        ? "highp"
        : "mediump");
  }
  return wi;
}
function UA(i, t, e) {
  return t
    ? i
    : e
      ? ((i = i.replace("out vec4 finalColor;", "")),
        `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${i}
        `)
      : `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${i}
        `;
}
function NA(i, t, e) {
  const s = e ? t.maxSupportedFragmentPrecision : t.maxSupportedVertexPrecision;
  if (i.substring(0, 9) !== "precision") {
    let n = e ? t.requestedFragmentPrecision : t.requestedVertexPrecision;
    return (
      n === "highp" && s !== "highp" && (n = "mediump"),
      `precision ${n} float;
${i}`
    );
  } else if (s !== "highp" && i.substring(0, 15) === "precision highp")
    return i.replace("precision highp", "precision mediump");
  return i;
}
function OA(i, t) {
  return t
    ? `#version 300 es
${i}`
    : i;
}
const jA = {},
  zA = {};
function LA(i, { name: t = "pixi-program" }, e = !0) {
  (t = t.replace(/\s+/g, "-")), (t += e ? "-fragment" : "-vertex");
  const s = e ? jA : zA;
  return (
    s[t] ? (s[t]++, (t += `-${s[t]}`)) : (s[t] = 1),
    i.indexOf("#define SHADER_NAME") !== -1
      ? i
      : `${`#define SHADER_NAME ${t}`}
${i}`
  );
}
function HA(i, t) {
  return t ? i.replace("#version 300 es", "") : i;
}
const As = {
    stripVersion: HA,
    ensurePrecision: NA,
    addProgramDefines: UA,
    setProgramName: LA,
    insertVersion: OA,
  },
  hs = Object.create(null),
  Mo = class Ts {
    constructor(t) {
      t = { ...Ts.defaultOptions, ...t };
      const e = t.fragment.indexOf("#version 300 es") !== -1,
        s = {
          stripVersion: e,
          ensurePrecision: {
            requestedFragmentPrecision: t.preferredFragmentPrecision,
            requestedVertexPrecision: t.preferredVertexPrecision,
            maxSupportedVertexPrecision: "highp",
            maxSupportedFragmentPrecision: GA(),
          },
          setProgramName: { name: t.name },
          addProgramDefines: e,
          insertVersion: e,
        };
      let n = t.fragment,
        r = t.vertex;
      Object.keys(As).forEach((o) => {
        const A = s[o];
        (n = As[o](n, A, !0)), (r = As[o](r, A, !1));
      }),
        (this.fragment = n),
        (this.vertex = r),
        (this.transformFeedbackVaryings = t.transformFeedbackVaryings),
        (this._key = on(`${this.vertex}:${this.fragment}`, "gl-program"));
    }
    destroy() {
      (this.fragment = null),
        (this.vertex = null),
        (this._attributeData = null),
        (this._uniformData = null),
        (this._uniformBlockData = null),
        (this.transformFeedbackVaryings = null);
    }
    static from(t) {
      const e = `${t.vertex}:${t.fragment}`;
      return hs[e] || (hs[e] = new Ts(t)), hs[e];
    }
  };
Mo.defaultOptions = {
  preferredVertexPrecision: "highp",
  preferredFragmentPrecision: "mediump",
};
let So = Mo;
const _n = {
  uint8x2: { size: 2, stride: 2, normalised: !1 },
  uint8x4: { size: 4, stride: 4, normalised: !1 },
  sint8x2: { size: 2, stride: 2, normalised: !1 },
  sint8x4: { size: 4, stride: 4, normalised: !1 },
  unorm8x2: { size: 2, stride: 2, normalised: !0 },
  unorm8x4: { size: 4, stride: 4, normalised: !0 },
  snorm8x2: { size: 2, stride: 2, normalised: !0 },
  snorm8x4: { size: 4, stride: 4, normalised: !0 },
  uint16x2: { size: 2, stride: 4, normalised: !1 },
  uint16x4: { size: 4, stride: 8, normalised: !1 },
  sint16x2: { size: 2, stride: 4, normalised: !1 },
  sint16x4: { size: 4, stride: 8, normalised: !1 },
  unorm16x2: { size: 2, stride: 4, normalised: !0 },
  unorm16x4: { size: 4, stride: 8, normalised: !0 },
  snorm16x2: { size: 2, stride: 4, normalised: !0 },
  snorm16x4: { size: 4, stride: 8, normalised: !0 },
  float16x2: { size: 2, stride: 4, normalised: !1 },
  float16x4: { size: 4, stride: 8, normalised: !1 },
  float32: { size: 1, stride: 4, normalised: !1 },
  float32x2: { size: 2, stride: 8, normalised: !1 },
  float32x3: { size: 3, stride: 12, normalised: !1 },
  float32x4: { size: 4, stride: 16, normalised: !1 },
  uint32: { size: 1, stride: 4, normalised: !1 },
  uint32x2: { size: 2, stride: 8, normalised: !1 },
  uint32x3: { size: 3, stride: 12, normalised: !1 },
  uint32x4: { size: 4, stride: 16, normalised: !1 },
  sint32: { size: 1, stride: 4, normalised: !1 },
  sint32x2: { size: 2, stride: 8, normalised: !1 },
  sint32x3: { size: 3, stride: 12, normalised: !1 },
  sint32x4: { size: 4, stride: 16, normalised: !1 },
};
function YA(i) {
  return _n[i] ?? _n.float32;
}
const XA = {
  f32: "float32",
  "vec2<f32>": "float32x2",
  "vec3<f32>": "float32x3",
  "vec4<f32>": "float32x4",
  vec2f: "float32x2",
  vec3f: "float32x3",
  vec4f: "float32x4",
  i32: "sint32",
  "vec2<i32>": "sint32x2",
  "vec3<i32>": "sint32x3",
  "vec4<i32>": "sint32x4",
  u32: "uint32",
  "vec2<u32>": "uint32x2",
  "vec3<u32>": "uint32x3",
  "vec4<u32>": "uint32x4",
  bool: "uint32",
  "vec2<bool>": "uint32x2",
  "vec3<bool>": "uint32x3",
  "vec4<bool>": "uint32x4",
};
function VA({ source: i, entryPoint: t }) {
  const e = {},
    s = i.indexOf(`fn ${t}`);
  if (s !== -1) {
    const n = i.indexOf("->", s);
    if (n !== -1) {
      const r = i.substring(s, n),
        o =
          /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
      let A;
      for (; (A = o.exec(r)) !== null; ) {
        const h = XA[A[3]] ?? "float32";
        e[A[2]] = {
          location: parseInt(A[1], 10),
          format: h,
          stride: YA(h).stride,
          offset: 0,
          instance: !1,
          start: 0,
        };
      }
    }
  }
  return e;
}
function ls(i) {
  var a, c;
  const t = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,
    e = /@group\((\d+)\)/,
    s = /@binding\((\d+)\)/,
    n = /var(<[^>]+>)? (\w+)/,
    r = /:\s*(\w+)/,
    o = /struct\s+(\w+)\s*{([^}]+)}/g,
    A = /(\w+)\s*:\s*([\w\<\>]+)/g,
    h = /struct\s+(\w+)/,
    l =
      (a = i.match(t)) == null
        ? void 0
        : a.map((u) => ({
            group: parseInt(u.match(e)[1], 10),
            binding: parseInt(u.match(s)[1], 10),
            name: u.match(n)[2],
            isUniform: u.match(n)[1] === "<uniform>",
            type: u.match(r)[1],
          }));
  if (!l) return { groups: [], structs: [] };
  const d =
    ((c = i.match(o)) == null
      ? void 0
      : c
          .map((u) => {
            const g = u.match(h)[1],
              y = u.match(A).reduce((m, C) => {
                const [w, E] = C.split(":");
                return (m[w.trim()] = E.trim()), m;
              }, {});
            return y ? { name: g, members: y } : null;
          })
          .filter(({ name: u }) => l.some((g) => g.type === u))) ?? [];
  return { groups: l, structs: d };
}
var ai = ((i) => (
  (i[(i.VERTEX = 1)] = "VERTEX"),
  (i[(i.FRAGMENT = 2)] = "FRAGMENT"),
  (i[(i.COMPUTE = 4)] = "COMPUTE"),
  i
))(ai || {});
function _A({ groups: i }) {
  const t = [];
  for (let e = 0; e < i.length; e++) {
    const s = i[e];
    t[s.group] || (t[s.group] = []),
      s.isUniform
        ? t[s.group].push({
            binding: s.binding,
            visibility: ai.VERTEX | ai.FRAGMENT,
            buffer: { type: "uniform" },
          })
        : s.type === "sampler"
          ? t[s.group].push({
              binding: s.binding,
              visibility: ai.FRAGMENT,
              sampler: { type: "filtering" },
            })
          : s.type === "texture_2d" &&
            t[s.group].push({
              binding: s.binding,
              visibility: ai.FRAGMENT,
              texture: {
                sampleType: "float",
                viewDimension: "2d",
                multisampled: !1,
              },
            });
  }
  return t;
}
function qA({ groups: i }) {
  const t = [];
  for (let e = 0; e < i.length; e++) {
    const s = i[e];
    t[s.group] || (t[s.group] = {}), (t[s.group][s.name] = s.binding);
  }
  return t;
}
function ZA(i, t) {
  const e = new Set(),
    s = new Set(),
    n = [...i.structs, ...t.structs].filter((o) =>
      e.has(o.name) ? !1 : (e.add(o.name), !0),
    ),
    r = [...i.groups, ...t.groups].filter((o) => {
      const A = `${o.name}-${o.binding}`;
      return s.has(A) ? !1 : (s.add(A), !0);
    });
  return { structs: n, groups: r };
}
const cs = Object.create(null);
class Xi {
  constructor(t) {
    var A, h;
    (this._layoutKey = 0), (this._attributeLocationsKey = 0);
    const { fragment: e, vertex: s, layout: n, gpuLayout: r, name: o } = t;
    if (
      ((this.name = o),
      (this.fragment = e),
      (this.vertex = s),
      e.source === s.source)
    ) {
      const l = ls(e.source);
      this.structsAndGroups = l;
    } else {
      const l = ls(s.source),
        d = ls(e.source);
      this.structsAndGroups = ZA(l, d);
    }
    (this.layout = n ?? qA(this.structsAndGroups)),
      (this.gpuLayout = r ?? _A(this.structsAndGroups)),
      (this.autoAssignGlobalUniforms =
        ((A = this.layout[0]) == null ? void 0 : A.globalUniforms) !== void 0),
      (this.autoAssignLocalUniforms =
        ((h = this.layout[1]) == null ? void 0 : h.localUniforms) !== void 0),
      this._generateProgramKey();
  }
  _generateProgramKey() {
    const { vertex: t, fragment: e } = this,
      s = t.source + e.source + t.entryPoint + e.entryPoint;
    this._layoutKey = on(s, "program");
  }
  get attributeData() {
    return (
      this._attributeData ?? (this._attributeData = VA(this.vertex)),
      this._attributeData
    );
  }
  destroy() {
    (this.gpuLayout = null),
      (this.layout = null),
      (this.structsAndGroups = null),
      (this.fragment = null),
      (this.vertex = null);
  }
  static from(t) {
    const e = `${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;
    return cs[e] || (cs[e] = new Xi(t)), cs[e];
  }
}
const Qo = [
    "f32",
    "i32",
    "vec2<f32>",
    "vec3<f32>",
    "vec4<f32>",
    "mat2x2<f32>",
    "mat3x3<f32>",
    "mat4x4<f32>",
    "mat3x2<f32>",
    "mat4x2<f32>",
    "mat2x3<f32>",
    "mat4x3<f32>",
    "mat2x4<f32>",
    "mat3x4<f32>",
    "vec2<i32>",
    "vec3<i32>",
    "vec4<i32>",
  ],
  WA = Qo.reduce((i, t) => ((i[t] = !0), i), {});
function KA(i, t) {
  switch (i) {
    case "f32":
      return 0;
    case "vec2<f32>":
      return new Float32Array(2 * t);
    case "vec3<f32>":
      return new Float32Array(3 * t);
    case "vec4<f32>":
      return new Float32Array(4 * t);
    case "mat2x2<f32>":
      return new Float32Array([1, 0, 0, 1]);
    case "mat3x3<f32>":
      return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    case "mat4x4<f32>":
      return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  return null;
}
const Do = class Po {
  constructor(t, e) {
    (this._touched = 0),
      (this.uid = It("uniform")),
      (this._resourceType = "uniformGroup"),
      (this._resourceId = It("resource")),
      (this.isUniformGroup = !0),
      (this._dirtyId = 0),
      (this.destroyed = !1),
      (e = { ...Po.defaultOptions, ...e }),
      (this.uniformStructures = t);
    const s = {};
    for (const n in t) {
      const r = t[n];
      if (((r.name = n), (r.size = r.size ?? 1), !WA[r.type]))
        throw new Error(
          `Uniform type ${r.type} is not supported. Supported uniform types are: ${Qo.join(", ")}`,
        );
      r.value ?? (r.value = KA(r.type, r.size)), (s[n] = r.value);
    }
    (this.uniforms = s),
      (this._dirtyId = 1),
      (this.ubo = e.ubo),
      (this.isStatic = e.isStatic),
      (this._signature = on(
        Object.keys(s)
          .map((n) => `${n}-${t[n].type}`)
          .join("-"),
        "uniform-group",
      ));
  }
  update() {
    this._dirtyId++;
  }
};
Do.defaultOptions = { ubo: !1, isStatic: !1 };
let Ro = Do;
class Pi {
  constructor(t) {
    (this.resources = Object.create(null)), (this._dirty = !0);
    let e = 0;
    for (const s in t) {
      const n = t[s];
      this.setResource(n, e++);
    }
    this._updateKey();
  }
  _updateKey() {
    if (!this._dirty) return;
    this._dirty = !1;
    const t = [];
    let e = 0;
    for (const s in this.resources) t[e++] = this.resources[s]._resourceId;
    this._key = t.join("|");
  }
  setResource(t, e) {
    var n, r;
    const s = this.resources[e];
    t !== s &&
      (s &&
        ((n = t.off) == null ||
          n.call(t, "change", this.onResourceChange, this)),
      (r = t.on) == null || r.call(t, "change", this.onResourceChange, this),
      (this.resources[e] = t),
      (this._dirty = !0));
  }
  getResource(t) {
    return this.resources[t];
  }
  _touch(t) {
    const e = this.resources;
    for (const s in e) e[s]._touched = t;
  }
  destroy() {
    var e;
    const t = this.resources;
    for (const s in t) {
      const n = t[s];
      (e = n.off) == null || e.call(n, "change", this.onResourceChange, this);
    }
    this.resources = null;
  }
  onResourceChange(t) {
    if (((this._dirty = !0), t.destroyed)) {
      const e = this.resources;
      for (const s in e) e[s] === t && (e[s] = null);
    } else this._updateKey();
  }
}
var ks = ((i) => (
  (i[(i.WEBGL = 1)] = "WEBGL"),
  (i[(i.WEBGPU = 2)] = "WEBGPU"),
  (i[(i.BOTH = 3)] = "BOTH"),
  i
))(ks || {});
class an extends Jt {
  constructor(t) {
    super(),
      (this.uid = It("shader")),
      (this._uniformBindMap = Object.create(null)),
      (this._ownedBindGroups = []);
    let {
      gpuProgram: e,
      glProgram: s,
      groups: n,
      resources: r,
      compatibleRenderers: o,
      groupMap: A,
    } = t;
    (this.gpuProgram = e),
      (this.glProgram = s),
      o === void 0 && ((o = 0), e && (o |= ks.WEBGPU), s && (o |= ks.WEBGL)),
      (this.compatibleRenderers = o);
    const h = {};
    if ((!r && !n && (r = {}), r && n))
      throw new Error("[Shader] Cannot have both resources and groups");
    if (!e && n && !A)
      throw new Error(
        "[Shader] No group map or WebGPU shader provided - consider using resources instead.",
      );
    if (!e && n && A)
      for (const l in A)
        for (const d in A[l]) {
          const a = A[l][d];
          h[a] = { group: l, binding: d, name: a };
        }
    else if (e && n && !A) {
      const l = e.structsAndGroups.groups;
      (A = {}),
        l.forEach((d) => {
          (A[d.group] = A[d.group] || {}),
            (A[d.group][d.binding] = d.name),
            (h[d.name] = d);
        });
    } else if (r) {
      (n = {}),
        (A = {}),
        e &&
          e.structsAndGroups.groups.forEach((a) => {
            (A[a.group] = A[a.group] || {}),
              (A[a.group][a.binding] = a.name),
              (h[a.name] = a);
          });
      let l = 0;
      for (const d in r)
        h[d] ||
          (n[99] || ((n[99] = new Pi()), this._ownedBindGroups.push(n[99])),
          (h[d] = { group: 99, binding: l, name: d }),
          (A[99] = A[99] || {}),
          (A[99][l] = d),
          l++);
      for (const d in r) {
        const a = d;
        let c = r[d];
        !c.source && !c._resourceType && (c = new Ro(c));
        const u = h[a];
        u &&
          (n[u.group] ||
            ((n[u.group] = new Pi()), this._ownedBindGroups.push(n[u.group])),
          n[u.group].setResource(c, u.binding));
      }
    }
    (this.groups = n),
      (this._uniformBindMap = A),
      (this.resources = this._buildResourceAccessor(n, h));
  }
  addResource(t, e, s) {
    var n, r;
    (n = this._uniformBindMap)[e] || (n[e] = {}),
      (r = this._uniformBindMap[e])[s] || (r[s] = t),
      this.groups[e] ||
        ((this.groups[e] = new Pi()),
        this._ownedBindGroups.push(this.groups[e]));
  }
  _buildResourceAccessor(t, e) {
    const s = {};
    for (const n in e) {
      const r = e[n];
      Object.defineProperty(s, r.name, {
        get() {
          return t[r.group].getResource(r.binding);
        },
        set(o) {
          t[r.group].setResource(o, r.binding);
        },
      });
    }
    return s;
  }
  destroy(t = !1) {
    var e, s;
    this.emit("destroy", this),
      t &&
        ((e = this.gpuProgram) == null || e.destroy(),
        (s = this.glProgram) == null || s.destroy()),
      (this.gpuProgram = null),
      (this.glProgram = null),
      this.removeAllListeners(),
      (this._uniformBindMap = null),
      this._ownedBindGroups.forEach((n) => {
        n.destroy();
      }),
      (this._ownedBindGroups = null),
      (this.resources = null),
      (this.groups = null);
  }
  static from(t) {
    const { gpu: e, gl: s, ...n } = t;
    let r, o;
    return (
      e && (r = Xi.from(e)),
      s && (o = So.from(s)),
      new an({ gpuProgram: r, glProgram: o, ...n })
    );
  }
}
const Gs = [];
Dt.handleByNamedList(Y.Environment, Gs);
async function JA(i) {
  if (!i)
    for (let t = 0; t < Gs.length; t++) {
      const e = Gs[t];
      if (e.value.test()) {
        await e.value.load();
        return;
      }
    }
}
let ei;
function $A() {
  if (typeof ei == "boolean") return ei;
  try {
    ei =
      new Function(
        "param1",
        "param2",
        "param3",
        "return param1[param2] === param3;",
      )({ a: "b" }, "a", "b") === !0;
  } catch {
    ei = !1;
  }
  return ei;
}
var bi = { exports: {} },
  qn;
function th() {
  if (qn) return bi.exports;
  (qn = 1), (bi.exports = i), (bi.exports.default = i);
  function i(x, b, v) {
    v = v || 2;
    var M = b && b.length,
      Q = M ? b[0] * v : x.length,
      T = t(x, 0, Q, v, !0),
      k = [];
    if (!T || T.next === T.prev) return k;
    var N, Z, X, ct, ut, nt, vt;
    if ((M && (T = h(x, b, T, v)), x.length > 80 * v)) {
      (N = X = x[0]), (Z = ct = x[1]);
      for (var at = v; at < Q; at += v)
        (ut = x[at]),
          (nt = x[at + 1]),
          ut < N && (N = ut),
          nt < Z && (Z = nt),
          ut > X && (X = ut),
          nt > ct && (ct = nt);
      (vt = Math.max(X - N, ct - Z)), (vt = vt !== 0 ? 32767 / vt : 0);
    }
    return s(T, k, v, N, Z, vt, 0), k;
  }
  function t(x, b, v, M, Q) {
    var T, k;
    if (Q === _t(x, b, v, M) > 0)
      for (T = b; T < v; T += M) k = ht(T, x[T], x[T + 1], k);
    else for (T = v - M; T >= b; T -= M) k = ht(T, x[T], x[T + 1], k);
    return k && I(k, k.next) && (st(k), (k = k.next)), k;
  }
  function e(x, b) {
    if (!x) return x;
    b || (b = x);
    var v = x,
      M;
    do
      if (
        ((M = !1), !v.steiner && (I(v, v.next) || E(v.prev, v, v.next) === 0))
      ) {
        if ((st(v), (v = b = v.prev), v === v.next)) break;
        M = !0;
      } else v = v.next;
    while (M || v !== b);
    return b;
  }
  function s(x, b, v, M, Q, T, k) {
    if (x) {
      !k && T && u(x, M, Q, T);
      for (var N = x, Z, X; x.prev !== x.next; ) {
        if (((Z = x.prev), (X = x.next), T ? r(x, M, Q, T) : n(x))) {
          b.push((Z.i / v) | 0),
            b.push((x.i / v) | 0),
            b.push((X.i / v) | 0),
            st(x),
            (x = X.next),
            (N = X.next);
          continue;
        }
        if (((x = X), x === N)) {
          k
            ? k === 1
              ? ((x = o(e(x), b, v)), s(x, b, v, M, Q, T, 2))
              : k === 2 && A(x, b, v, M, Q, T)
            : s(e(x), b, v, M, Q, T, 1);
          break;
        }
      }
    }
  }
  function n(x) {
    var b = x.prev,
      v = x,
      M = x.next;
    if (E(b, v, M) >= 0) return !1;
    for (
      var Q = b.x,
        T = v.x,
        k = M.x,
        N = b.y,
        Z = v.y,
        X = M.y,
        ct = Q < T ? (Q < k ? Q : k) : T < k ? T : k,
        ut = N < Z ? (N < X ? N : X) : Z < X ? Z : X,
        nt = Q > T ? (Q > k ? Q : k) : T > k ? T : k,
        vt = N > Z ? (N > X ? N : X) : Z > X ? Z : X,
        at = M.next;
      at !== b;

    ) {
      if (
        at.x >= ct &&
        at.x <= nt &&
        at.y >= ut &&
        at.y <= vt &&
        C(Q, N, T, Z, k, X, at.x, at.y) &&
        E(at.prev, at, at.next) >= 0
      )
        return !1;
      at = at.next;
    }
    return !0;
  }
  function r(x, b, v, M) {
    var Q = x.prev,
      T = x,
      k = x.next;
    if (E(Q, T, k) >= 0) return !1;
    for (
      var N = Q.x,
        Z = T.x,
        X = k.x,
        ct = Q.y,
        ut = T.y,
        nt = k.y,
        vt = N < Z ? (N < X ? N : X) : Z < X ? Z : X,
        at = ct < ut ? (ct < nt ? ct : nt) : ut < nt ? ut : nt,
        ce = N > Z ? (N > X ? N : X) : Z > X ? Z : X,
        jt = ct > ut ? (ct > nt ? ct : nt) : ut > nt ? ut : nt,
        ee = y(vt, at, b, v, M),
        ie = y(ce, jt, b, v, M),
        J = x.prevZ,
        ot = x.nextZ;
      J && J.z >= ee && ot && ot.z <= ie;

    ) {
      if (
        (J.x >= vt &&
          J.x <= ce &&
          J.y >= at &&
          J.y <= jt &&
          J !== Q &&
          J !== k &&
          C(N, ct, Z, ut, X, nt, J.x, J.y) &&
          E(J.prev, J, J.next) >= 0) ||
        ((J = J.prevZ),
        ot.x >= vt &&
          ot.x <= ce &&
          ot.y >= at &&
          ot.y <= jt &&
          ot !== Q &&
          ot !== k &&
          C(N, ct, Z, ut, X, nt, ot.x, ot.y) &&
          E(ot.prev, ot, ot.next) >= 0)
      )
        return !1;
      ot = ot.nextZ;
    }
    for (; J && J.z >= ee; ) {
      if (
        J.x >= vt &&
        J.x <= ce &&
        J.y >= at &&
        J.y <= jt &&
        J !== Q &&
        J !== k &&
        C(N, ct, Z, ut, X, nt, J.x, J.y) &&
        E(J.prev, J, J.next) >= 0
      )
        return !1;
      J = J.prevZ;
    }
    for (; ot && ot.z <= ie; ) {
      if (
        ot.x >= vt &&
        ot.x <= ce &&
        ot.y >= at &&
        ot.y <= jt &&
        ot !== Q &&
        ot !== k &&
        C(N, ct, Z, ut, X, nt, ot.x, ot.y) &&
        E(ot.prev, ot, ot.next) >= 0
      )
        return !1;
      ot = ot.nextZ;
    }
    return !0;
  }
  function o(x, b, v) {
    var M = x;
    do {
      var Q = M.prev,
        T = M.next.next;
      !I(Q, T) &&
        U(Q, M, M.next, T) &&
        O(Q, T) &&
        O(T, Q) &&
        (b.push((Q.i / v) | 0),
        b.push((M.i / v) | 0),
        b.push((T.i / v) | 0),
        st(M),
        st(M.next),
        (M = x = T)),
        (M = M.next);
    } while (M !== x);
    return e(M);
  }
  function A(x, b, v, M, Q, T) {
    var k = x;
    do {
      for (var N = k.next.next; N !== k.prev; ) {
        if (k.i !== N.i && w(k, N)) {
          var Z = z(k, N);
          (k = e(k, k.next)),
            (Z = e(Z, Z.next)),
            s(k, b, v, M, Q, T, 0),
            s(Z, b, v, M, Q, T, 0);
          return;
        }
        N = N.next;
      }
      k = k.next;
    } while (k !== x);
  }
  function h(x, b, v, M) {
    var Q = [],
      T,
      k,
      N,
      Z,
      X;
    for (T = 0, k = b.length; T < k; T++)
      (N = b[T] * M),
        (Z = T < k - 1 ? b[T + 1] * M : x.length),
        (X = t(x, N, Z, M, !1)),
        X === X.next && (X.steiner = !0),
        Q.push(m(X));
    for (Q.sort(l), T = 0; T < Q.length; T++) v = d(Q[T], v);
    return v;
  }
  function l(x, b) {
    return x.x - b.x;
  }
  function d(x, b) {
    var v = a(x, b);
    if (!v) return b;
    var M = z(v, x);
    return e(M, M.next), e(v, v.next);
  }
  function a(x, b) {
    var v = b,
      M = x.x,
      Q = x.y,
      T = -1 / 0,
      k;
    do {
      if (Q <= v.y && Q >= v.next.y && v.next.y !== v.y) {
        var N = v.x + ((Q - v.y) * (v.next.x - v.x)) / (v.next.y - v.y);
        if (
          N <= M &&
          N > T &&
          ((T = N), (k = v.x < v.next.x ? v : v.next), N === M)
        )
          return k;
      }
      v = v.next;
    } while (v !== b);
    if (!k) return null;
    var Z = k,
      X = k.x,
      ct = k.y,
      ut = 1 / 0,
      nt;
    v = k;
    do
      M >= v.x &&
        v.x >= X &&
        M !== v.x &&
        C(Q < ct ? M : T, Q, X, ct, Q < ct ? T : M, Q, v.x, v.y) &&
        ((nt = Math.abs(Q - v.y) / (M - v.x)),
        O(v, x) &&
          (nt < ut || (nt === ut && (v.x > k.x || (v.x === k.x && c(k, v))))) &&
          ((k = v), (ut = nt))),
        (v = v.next);
    while (v !== Z);
    return k;
  }
  function c(x, b) {
    return E(x.prev, x, b.prev) < 0 && E(b.next, x, x.next) < 0;
  }
  function u(x, b, v, M) {
    var Q = x;
    do
      Q.z === 0 && (Q.z = y(Q.x, Q.y, b, v, M)),
        (Q.prevZ = Q.prev),
        (Q.nextZ = Q.next),
        (Q = Q.next);
    while (Q !== x);
    (Q.prevZ.nextZ = null), (Q.prevZ = null), g(Q);
  }
  function g(x) {
    var b,
      v,
      M,
      Q,
      T,
      k,
      N,
      Z,
      X = 1;
    do {
      for (v = x, x = null, T = null, k = 0; v; ) {
        for (k++, M = v, N = 0, b = 0; b < X && (N++, (M = M.nextZ), !!M); b++);
        for (Z = X; N > 0 || (Z > 0 && M); )
          N !== 0 && (Z === 0 || !M || v.z <= M.z)
            ? ((Q = v), (v = v.nextZ), N--)
            : ((Q = M), (M = M.nextZ), Z--),
            T ? (T.nextZ = Q) : (x = Q),
            (Q.prevZ = T),
            (T = Q);
        v = M;
      }
      (T.nextZ = null), (X *= 2);
    } while (k > 1);
    return x;
  }
  function y(x, b, v, M, Q) {
    return (
      (x = ((x - v) * Q) | 0),
      (b = ((b - M) * Q) | 0),
      (x = (x | (x << 8)) & 16711935),
      (x = (x | (x << 4)) & 252645135),
      (x = (x | (x << 2)) & 858993459),
      (x = (x | (x << 1)) & 1431655765),
      (b = (b | (b << 8)) & 16711935),
      (b = (b | (b << 4)) & 252645135),
      (b = (b | (b << 2)) & 858993459),
      (b = (b | (b << 1)) & 1431655765),
      x | (b << 1)
    );
  }
  function m(x) {
    var b = x,
      v = x;
    do (b.x < v.x || (b.x === v.x && b.y < v.y)) && (v = b), (b = b.next);
    while (b !== x);
    return v;
  }
  function C(x, b, v, M, Q, T, k, N) {
    return (
      (Q - k) * (b - N) >= (x - k) * (T - N) &&
      (x - k) * (M - N) >= (v - k) * (b - N) &&
      (v - k) * (T - N) >= (Q - k) * (M - N)
    );
  }
  function w(x, b) {
    return (
      x.next.i !== b.i &&
      x.prev.i !== b.i &&
      !W(x, b) &&
      ((O(x, b) &&
        O(b, x) &&
        L(x, b) &&
        (E(x.prev, x, b.prev) || E(x, b.prev, b))) ||
        (I(x, b) && E(x.prev, x, x.next) > 0 && E(b.prev, b, b.next) > 0))
    );
  }
  function E(x, b, v) {
    return (b.y - x.y) * (v.x - b.x) - (b.x - x.x) * (v.y - b.y);
  }
  function I(x, b) {
    return x.x === b.x && x.y === b.y;
  }
  function U(x, b, v, M) {
    var Q = F(E(x, b, v)),
      T = F(E(x, b, M)),
      k = F(E(v, M, x)),
      N = F(E(v, M, b));
    return !!(
      (Q !== T && k !== N) ||
      (Q === 0 && D(x, v, b)) ||
      (T === 0 && D(x, M, b)) ||
      (k === 0 && D(v, x, M)) ||
      (N === 0 && D(v, b, M))
    );
  }
  function D(x, b, v) {
    return (
      b.x <= Math.max(x.x, v.x) &&
      b.x >= Math.min(x.x, v.x) &&
      b.y <= Math.max(x.y, v.y) &&
      b.y >= Math.min(x.y, v.y)
    );
  }
  function F(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function W(x, b) {
    var v = x;
    do {
      if (
        v.i !== x.i &&
        v.next.i !== x.i &&
        v.i !== b.i &&
        v.next.i !== b.i &&
        U(v, v.next, x, b)
      )
        return !0;
      v = v.next;
    } while (v !== x);
    return !1;
  }
  function O(x, b) {
    return E(x.prev, x, x.next) < 0
      ? E(x, b, x.next) >= 0 && E(x, x.prev, b) >= 0
      : E(x, b, x.prev) < 0 || E(x, x.next, b) < 0;
  }
  function L(x, b) {
    var v = x,
      M = !1,
      Q = (x.x + b.x) / 2,
      T = (x.y + b.y) / 2;
    do
      v.y > T != v.next.y > T &&
        v.next.y !== v.y &&
        Q < ((v.next.x - v.x) * (T - v.y)) / (v.next.y - v.y) + v.x &&
        (M = !M),
        (v = v.next);
    while (v !== x);
    return M;
  }
  function z(x, b) {
    var v = new ft(x.i, x.x, x.y),
      M = new ft(b.i, b.x, b.y),
      Q = x.next,
      T = b.prev;
    return (
      (x.next = b),
      (b.prev = x),
      (v.next = Q),
      (Q.prev = v),
      (M.next = v),
      (v.prev = M),
      (T.next = M),
      (M.prev = T),
      M
    );
  }
  function ht(x, b, v, M) {
    var Q = new ft(x, b, v);
    return (
      M
        ? ((Q.next = M.next), (Q.prev = M), (M.next.prev = Q), (M.next = Q))
        : ((Q.prev = Q), (Q.next = Q)),
      Q
    );
  }
  function st(x) {
    (x.next.prev = x.prev),
      (x.prev.next = x.next),
      x.prevZ && (x.prevZ.nextZ = x.nextZ),
      x.nextZ && (x.nextZ.prevZ = x.prevZ);
  }
  function ft(x, b, v) {
    (this.i = x),
      (this.x = b),
      (this.y = v),
      (this.prev = null),
      (this.next = null),
      (this.z = 0),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1);
  }
  i.deviation = function (x, b, v, M) {
    var Q = b && b.length,
      T = Q ? b[0] * v : x.length,
      k = Math.abs(_t(x, 0, T, v));
    if (Q)
      for (var N = 0, Z = b.length; N < Z; N++) {
        var X = b[N] * v,
          ct = N < Z - 1 ? b[N + 1] * v : x.length;
        k -= Math.abs(_t(x, X, ct, v));
      }
    var ut = 0;
    for (N = 0; N < M.length; N += 3) {
      var nt = M[N] * v,
        vt = M[N + 1] * v,
        at = M[N + 2] * v;
      ut += Math.abs(
        (x[nt] - x[at]) * (x[vt + 1] - x[nt + 1]) -
          (x[nt] - x[vt]) * (x[at + 1] - x[nt + 1]),
      );
    }
    return k === 0 && ut === 0 ? 0 : Math.abs((ut - k) / k);
  };
  function _t(x, b, v, M) {
    for (var Q = 0, T = b, k = v - M; T < v; T += M)
      (Q += (x[k] - x[T]) * (x[T + 1] + x[k + 1])), (k = T);
    return Q;
  }
  return (
    (i.flatten = function (x) {
      for (
        var b = x[0][0].length,
          v = { vertices: [], holes: [], dimensions: b },
          M = 0,
          Q = 0;
        Q < x.length;
        Q++
      ) {
        for (var T = 0; T < x[Q].length; T++)
          for (var k = 0; k < b; k++) v.vertices.push(x[Q][T][k]);
        Q > 0 && ((M += x[Q - 1].length), v.holes.push(M));
      }
      return v;
    }),
    bi.exports
  );
}
var eh = th();
const ih = tn(eh);
var Fo = ((i) => (
  (i[(i.NONE = 0)] = "NONE"),
  (i[(i.COLOR = 16384)] = "COLOR"),
  (i[(i.STENCIL = 1024)] = "STENCIL"),
  (i[(i.DEPTH = 256)] = "DEPTH"),
  (i[(i.COLOR_DEPTH = 16640)] = "COLOR_DEPTH"),
  (i[(i.COLOR_STENCIL = 17408)] = "COLOR_STENCIL"),
  (i[(i.DEPTH_STENCIL = 1280)] = "DEPTH_STENCIL"),
  (i[(i.ALL = 17664)] = "ALL"),
  i
))(Fo || {});
class sh {
  constructor(t) {
    (this.items = []), (this._name = t);
  }
  emit(t, e, s, n, r, o, A, h) {
    const { name: l, items: d } = this;
    for (let a = 0, c = d.length; a < c; a++) d[a][l](t, e, s, n, r, o, A, h);
    return this;
  }
  add(t) {
    return t[this._name] && (this.remove(t), this.items.push(t)), this;
  }
  remove(t) {
    const e = this.items.indexOf(t);
    return e !== -1 && this.items.splice(e, 1), this;
  }
  contains(t) {
    return this.items.indexOf(t) !== -1;
  }
  removeAll() {
    return (this.items.length = 0), this;
  }
  destroy() {
    this.removeAll(), (this.items = null), (this._name = null);
  }
  get empty() {
    return this.items.length === 0;
  }
  get name() {
    return this._name;
  }
}
const nh = [
    "init",
    "destroy",
    "contextChange",
    "resolutionChange",
    "resetState",
    "renderEnd",
    "renderStart",
    "render",
    "update",
    "postrender",
    "prerender",
  ],
  To = class ko extends Jt {
    constructor(t) {
      super(),
        (this.runners = Object.create(null)),
        (this.renderPipes = Object.create(null)),
        (this._initOptions = {}),
        (this._systemsHash = Object.create(null)),
        (this.type = t.type),
        (this.name = t.name),
        (this.config = t);
      const e = [...nh, ...(this.config.runners ?? [])];
      this._addRunners(...e), this._unsafeEvalCheck();
    }
    async init(t = {}) {
      const e = t.skipExtensionImports === !0 ? !0 : t.manageImports === !1;
      await JA(e),
        this._addSystems(this.config.systems),
        this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors);
      for (const s in this._systemsHash)
        t = { ...this._systemsHash[s].constructor.defaultOptions, ...t };
      (t = { ...ko.defaultOptions, ...t }),
        (this._roundPixels = t.roundPixels ? 1 : 0);
      for (let s = 0; s < this.runners.init.items.length; s++)
        await this.runners.init.items[s].init(t);
      this._initOptions = t;
    }
    render(t, e) {
      let s = t;
      if (
        (s instanceof _ &&
          ((s = { container: s }),
          e &&
            (it(
              dt,
              "passing a second argument is deprecated, please use render options instead",
            ),
            (s.target = e.renderTexture))),
        s.target || (s.target = this.view.renderTarget),
        s.target === this.view.renderTarget &&
          ((this._lastObjectRendered = s.container),
          s.clearColor ?? (s.clearColor = this.background.colorRgba),
          s.clear ?? (s.clear = this.background.clearBeforeRender)),
        s.clearColor)
      ) {
        const n = Array.isArray(s.clearColor) && s.clearColor.length === 4;
        s.clearColor = n
          ? s.clearColor
          : Mt.shared.setValue(s.clearColor).toArray();
      }
      s.transform ||
        (s.container.updateLocalTransform(),
        (s.transform = s.container.localTransform)),
        s.container.enableRenderGroup(),
        this.runners.prerender.emit(s),
        this.runners.renderStart.emit(s),
        this.runners.render.emit(s),
        this.runners.renderEnd.emit(s),
        this.runners.postrender.emit(s);
    }
    resize(t, e, s) {
      const n = this.view.resolution;
      this.view.resize(t, e, s),
        this.emit(
          "resize",
          this.view.screen.width,
          this.view.screen.height,
          this.view.resolution,
        ),
        s !== void 0 && s !== n && this.runners.resolutionChange.emit(s);
    }
    clear(t = {}) {
      const e = this;
      t.target || (t.target = e.renderTarget.renderTarget),
        t.clearColor || (t.clearColor = this.background.colorRgba),
        t.clear ?? (t.clear = Fo.ALL);
      const { clear: s, clearColor: n, target: r } = t;
      Mt.shared.setValue(n ?? this.background.colorRgba),
        e.renderTarget.clear(r, s, Mt.shared.toArray());
    }
    get resolution() {
      return this.view.resolution;
    }
    set resolution(t) {
      (this.view.resolution = t), this.runners.resolutionChange.emit(t);
    }
    get width() {
      return this.view.texture.frame.width;
    }
    get height() {
      return this.view.texture.frame.height;
    }
    get canvas() {
      return this.view.canvas;
    }
    get lastObjectRendered() {
      return this._lastObjectRendered;
    }
    get renderingToScreen() {
      return this.renderTarget.renderingToScreen;
    }
    get screen() {
      return this.view.screen;
    }
    _addRunners(...t) {
      t.forEach((e) => {
        this.runners[e] = new sh(e);
      });
    }
    _addSystems(t) {
      let e;
      for (e in t) {
        const s = t[e];
        this._addSystem(s.value, s.name);
      }
    }
    _addSystem(t, e) {
      const s = new t(this);
      if (this[e]) throw new Error(`Whoops! The name "${e}" is already in use`);
      (this[e] = s), (this._systemsHash[e] = s);
      for (const n in this.runners) this.runners[n].add(s);
      return this;
    }
    _addPipes(t, e) {
      const s = e.reduce((n, r) => ((n[r.name] = r.value), n), {});
      t.forEach((n) => {
        const r = n.value,
          o = n.name,
          A = s[o];
        this.renderPipes[o] = new r(this, A ? new A() : null);
      });
    }
    destroy(t = !1) {
      this.runners.destroy.items.reverse(),
        this.runners.destroy.emit(t),
        Object.values(this.runners).forEach((e) => {
          e.destroy();
        }),
        (this._systemsHash = null),
        (this.renderPipes = null);
    }
    generateTexture(t) {
      return this.textureGenerator.generateTexture(t);
    }
    get roundPixels() {
      return !!this._roundPixels;
    }
    _unsafeEvalCheck() {
      if (!$A())
        throw new Error(
          "Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.",
        );
    }
    resetState() {
      this.runners.resetState.emit();
    }
  };
To.defaultOptions = {
  resolution: 1,
  failIfMajorPerformanceCaveat: !1,
  roundPixels: !1,
};
let Go = To,
  Ei;
function rh(i) {
  return (
    Ei !== void 0 ||
      (Ei = (() => {
        var e;
        const t = {
          stencil: !0,
          failIfMajorPerformanceCaveat:
            i ?? Go.defaultOptions.failIfMajorPerformanceCaveat,
        };
        try {
          if (!Et.get().getWebGLRenderingContext()) return !1;
          let n = Et.get().createCanvas().getContext("webgl", t);
          const r = !!(
            (e = n == null ? void 0 : n.getContextAttributes()) != null &&
            e.stencil
          );
          if (n) {
            const o = n.getExtension("WEBGL_lose_context");
            o && o.loseContext();
          }
          return (n = null), r;
        } catch {
          return !1;
        }
      })()),
    Ei
  );
}
let vi;
async function oh(i = {}) {
  return (
    vi !== void 0 ||
      (vi = await (async () => {
        const t = Et.get().getNavigator().gpu;
        if (!t) return !1;
        try {
          return await (await t.requestAdapter(i)).requestDevice(), !0;
        } catch {
          return !1;
        }
      })()),
    vi
  );
}
const Zn = ["webgl", "webgpu", "canvas"];
async function ah(i) {
  let t = [];
  i.preference
    ? (t.push(i.preference),
      Zn.forEach((r) => {
        r !== i.preference && t.push(r);
      }))
    : (t = Zn.slice());
  let e,
    s = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (o === "webgpu" && (await oh())) {
      const { WebGPURenderer: A } = await Ti(
        async () => {
          const { WebGPURenderer: h } = await import(
            "./WebGPURenderer-CCtrNZDn.js"
          );
          return { WebGPURenderer: h };
        },
        __vite__mapDeps([3, 2, 4]),
        import.meta.url,
      );
      (e = A), (s = { ...i, ...i.webgpu });
      break;
    } else if (
      o === "webgl" &&
      rh(
        i.failIfMajorPerformanceCaveat ??
          Go.defaultOptions.failIfMajorPerformanceCaveat,
      )
    ) {
      const { WebGLRenderer: A } = await Ti(
        async () => {
          const { WebGLRenderer: h } = await import(
            "./WebGLRenderer-DGPLUMVC.js"
          );
          return { WebGLRenderer: h };
        },
        __vite__mapDeps([5, 2, 4]),
        import.meta.url,
      );
      (e = A), (s = { ...i, ...i.webgl });
      break;
    } else if (o === "canvas")
      throw (
        ((s = { ...i }), new Error("CanvasRenderer is not yet implemented"))
      );
  }
  if ((delete s.webgpu, delete s.webgl, !e))
    throw new Error("No available renderer for the current environment");
  const n = new e();
  return await n.init(s), n;
}
const Uo = "8.9.2";
class No {
  static init() {
    var t;
    (t = globalThis.__PIXI_APP_INIT__) == null || t.call(globalThis, this, Uo);
  }
  static destroy() {}
}
No.extension = Y.Application;
class Ah {
  constructor(t) {
    this._renderer = t;
  }
  init() {
    var t;
    (t = globalThis.__PIXI_RENDERER_INIT__) == null ||
      t.call(globalThis, this._renderer, Uo);
  }
  destroy() {
    this._renderer = null;
  }
}
Ah.extension = {
  type: [Y.WebGLSystem, Y.WebGPUSystem],
  name: "initHook",
  priority: -10,
};
const Oo = class Us {
  constructor(...t) {
    (this.stage = new _()),
      t[0] !== void 0 &&
        it(
          dt,
          "Application constructor options are deprecated, please use Application.init() instead.",
        );
  }
  async init(t) {
    (t = { ...t }),
      (this.renderer = await ah(t)),
      Us._plugins.forEach((e) => {
        e.init.call(this, t);
      });
  }
  render() {
    this.renderer.render({ container: this.stage });
  }
  get canvas() {
    return this.renderer.canvas;
  }
  get view() {
    return (
      it(
        dt,
        "Application.view is deprecated, please use Application.canvas instead.",
      ),
      this.renderer.canvas
    );
  }
  get screen() {
    return this.renderer.screen;
  }
  destroy(t = !1, e = !1) {
    const s = Us._plugins.slice(0);
    s.reverse(),
      s.forEach((n) => {
        n.destroy.call(this);
      }),
      this.stage.destroy(e),
      (this.stage = null),
      this.renderer.destroy(t),
      (this.renderer = null);
  }
};
Oo._plugins = [];
let jo = Oo;
Dt.handleByList(Y.Application, jo._plugins);
Dt.add(No);
class zo extends Jt {
  constructor() {
    super(...arguments),
      (this.chars = Object.create(null)),
      (this.lineHeight = 0),
      (this.fontFamily = ""),
      (this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 }),
      (this.baseLineOffset = 0),
      (this.distanceField = { type: "none", range: 0 }),
      (this.pages = []),
      (this.applyFillAsTint = !0),
      (this.baseMeasurementFontSize = 100),
      (this.baseRenderedFontSize = 100);
  }
  get font() {
    return (
      it(
        dt,
        "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead.",
      ),
      this.fontFamily
    );
  }
  get pageTextures() {
    return (
      it(
        dt,
        "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.",
      ),
      this.pages
    );
  }
  get size() {
    return (
      it(
        dt,
        "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead.",
      ),
      this.fontMetrics.fontSize
    );
  }
  get distanceFieldRange() {
    return (
      it(
        dt,
        "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead.",
      ),
      this.distanceField.range
    );
  }
  get distanceFieldType() {
    return (
      it(
        dt,
        "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead.",
      ),
      this.distanceField.type
    );
  }
  destroy(t = !1) {
    var e;
    this.emit("destroy", this), this.removeAllListeners();
    for (const s in this.chars)
      (e = this.chars[s].texture) == null || e.destroy();
    (this.chars = null),
      t &&
        (this.pages.forEach((s) => s.texture.destroy(!0)), (this.pages = null));
  }
}
const Wn = [
    { offset: 0, color: "white" },
    { offset: 1, color: "black" },
  ],
  An = class Ns {
    constructor(...t) {
      (this.uid = It("fillGradient")),
        (this.type = "linear"),
        (this.colorStops = []);
      let e = hh(t);
      (e = {
        ...(e.type === "radial"
          ? Ns.defaultRadialOptions
          : Ns.defaultLinearOptions),
        ...Wr(e),
      }),
        (this._textureSize = e.textureSize),
        (this._wrapMode = e.wrapMode),
        e.type === "radial"
          ? ((this.center = e.center),
            (this.outerCenter = e.outerCenter ?? this.center),
            (this.innerRadius = e.innerRadius),
            (this.outerRadius = e.outerRadius),
            (this.scale = e.scale),
            (this.rotation = e.rotation))
          : ((this.start = e.start), (this.end = e.end)),
        (this.textureSpace = e.textureSpace),
        (this.type = e.type),
        e.colorStops.forEach((n) => {
          this.addColorStop(n.offset, n.color);
        });
    }
    addColorStop(t, e) {
      return (
        this.colorStops.push({
          offset: t,
          color: Mt.shared.setValue(e).toHexa(),
        }),
        this
      );
    }
    buildLinearGradient() {
      if (this.texture) return;
      let { x: t, y: e } = this.start,
        { x: s, y: n } = this.end,
        r = s - t,
        o = n - e;
      const A = r < 0 || o < 0;
      if (this._wrapMode === "clamp-to-edge") {
        if (r < 0) {
          const m = t;
          (t = s), (s = m), (r *= -1);
        }
        if (o < 0) {
          const m = e;
          (e = n), (n = m), (o *= -1);
        }
      }
      const h = this.colorStops.length ? this.colorStops : Wn,
        l = this._textureSize,
        { canvas: d, context: a } = Jn(l, 1),
        c = A
          ? a.createLinearGradient(this._textureSize, 0, 0, 0)
          : a.createLinearGradient(0, 0, this._textureSize, 0);
      Kn(c, h),
        (a.fillStyle = c),
        a.fillRect(0, 0, l, 1),
        (this.texture = new $({
          source: new Ne({ resource: d, addressMode: this._wrapMode }),
        }));
      const u = Math.sqrt(r * r + o * o),
        g = Math.atan2(o, r),
        y = new tt();
      y.scale(u / l, 1),
        y.rotate(g),
        y.translate(t, e),
        this.textureSpace === "local" && y.scale(l, l),
        (this.transform = y);
    }
    buildGradient() {
      this.type === "linear"
        ? this.buildLinearGradient()
        : this.buildRadialGradient();
    }
    buildRadialGradient() {
      if (this.texture) return;
      const t = this.colorStops.length ? this.colorStops : Wn,
        e = this._textureSize,
        { canvas: s, context: n } = Jn(e, e),
        { x: r, y: o } = this.center,
        { x: A, y: h } = this.outerCenter,
        l = this.innerRadius,
        d = this.outerRadius,
        a = A - d,
        c = h - d,
        u = e / (d * 2),
        g = (r - a) * u,
        y = (o - c) * u,
        m = n.createRadialGradient(
          g,
          y,
          l * u,
          (A - a) * u,
          (h - c) * u,
          d * u,
        );
      Kn(m, t),
        (n.fillStyle = t[t.length - 1].color),
        n.fillRect(0, 0, e, e),
        (n.fillStyle = m),
        n.translate(g, y),
        n.rotate(this.rotation),
        n.scale(1, this.scale),
        n.translate(-g, -y),
        n.fillRect(0, 0, e, e),
        (this.texture = new $({
          source: new Ne({ resource: s, addressMode: this._wrapMode }),
        }));
      const C = new tt();
      C.scale(1 / u, 1 / u),
        C.translate(a, c),
        this.textureSpace === "local" && C.scale(e, e),
        (this.transform = C);
    }
    get styleKey() {
      return this.uid;
    }
    destroy() {
      var t;
      (t = this.texture) == null || t.destroy(!0), (this.texture = null);
    }
  };
An.defaultLinearOptions = {
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  colorStops: [],
  textureSpace: "local",
  type: "linear",
  textureSize: 256,
  wrapMode: "clamp-to-edge",
};
An.defaultRadialOptions = {
  center: { x: 0.5, y: 0.5 },
  innerRadius: 0,
  outerRadius: 0.5,
  colorStops: [],
  scale: 1,
  textureSpace: "local",
  type: "radial",
  textureSize: 256,
  wrapMode: "clamp-to-edge",
};
let me = An;
function Kn(i, t) {
  for (let e = 0; e < t.length; e++) {
    const s = t[e];
    i.addColorStop(s.offset, s.color);
  }
}
function Jn(i, t) {
  const e = Et.get().createCanvas(i, t),
    s = e.getContext("2d");
  return { canvas: e, context: s };
}
function hh(i) {
  let t = i[0] ?? {};
  return (
    (typeof t == "number" || i[1]) &&
      (it("8.5.2", "use options object instead"),
      (t = {
        type: "linear",
        start: { x: i[0], y: i[1] },
        end: { x: i[2], y: i[3] },
        textureSpace: i[4],
        textureSize: i[5] ?? me.defaultLinearOptions.textureSize,
      })),
    t
  );
}
const $n = {
  repeat: { addressModeU: "repeat", addressModeV: "repeat" },
  "repeat-x": { addressModeU: "repeat", addressModeV: "clamp-to-edge" },
  "repeat-y": { addressModeU: "clamp-to-edge", addressModeV: "repeat" },
  "no-repeat": { addressModeU: "clamp-to-edge", addressModeV: "clamp-to-edge" },
};
class Vi {
  constructor(t, e) {
    (this.uid = It("fillPattern")),
      (this.transform = new tt()),
      (this._styleKey = null),
      (this.texture = t),
      this.transform.scale(1 / t.frame.width, 1 / t.frame.height),
      e &&
        ((t.source.style.addressModeU = $n[e].addressModeU),
        (t.source.style.addressModeV = $n[e].addressModeV));
  }
  setTransform(t) {
    const e = this.texture;
    this.transform.copyFrom(t),
      this.transform.invert(),
      this.transform.scale(1 / e.frame.width, 1 / e.frame.height),
      (this._styleKey = null);
  }
  get styleKey() {
    return this._styleKey
      ? this._styleKey
      : ((this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`),
        this._styleKey);
  }
}
var us, tr;
function lh() {
  if (tr) return us;
  (tr = 1), (us = e);
  var i = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
    t = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  function e(r) {
    var o = [];
    return (
      r.replace(t, function (A, h, l) {
        var d = h.toLowerCase();
        for (
          l = n(l),
            d == "m" &&
              l.length > 2 &&
              (o.push([h].concat(l.splice(0, 2))),
              (d = "l"),
              (h = h == "m" ? "l" : "L"));
          ;

        ) {
          if (l.length == i[d]) return l.unshift(h), o.push(l);
          if (l.length < i[d]) throw new Error("malformed path data");
          o.push([h].concat(l.splice(0, i[d])));
        }
      }),
      o
    );
  }
  var s = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
  function n(r) {
    var o = r.match(s);
    return o ? o.map(Number) : [];
  }
  return us;
}
var ch = lh();
const uh = tn(ch);
function dh(i, t) {
  const e = uh(i),
    s = [];
  let n = null,
    r = 0,
    o = 0;
  for (let A = 0; A < e.length; A++) {
    const h = e[A],
      l = h[0],
      d = h;
    switch (l) {
      case "M":
        (r = d[1]), (o = d[2]), t.moveTo(r, o);
        break;
      case "m":
        (r += d[1]), (o += d[2]), t.moveTo(r, o);
        break;
      case "H":
        (r = d[1]), t.lineTo(r, o);
        break;
      case "h":
        (r += d[1]), t.lineTo(r, o);
        break;
      case "V":
        (o = d[1]), t.lineTo(r, o);
        break;
      case "v":
        (o += d[1]), t.lineTo(r, o);
        break;
      case "L":
        (r = d[1]), (o = d[2]), t.lineTo(r, o);
        break;
      case "l":
        (r += d[1]), (o += d[2]), t.lineTo(r, o);
        break;
      case "C":
        (r = d[5]), (o = d[6]), t.bezierCurveTo(d[1], d[2], d[3], d[4], r, o);
        break;
      case "c":
        t.bezierCurveTo(
          r + d[1],
          o + d[2],
          r + d[3],
          o + d[4],
          r + d[5],
          o + d[6],
        ),
          (r += d[5]),
          (o += d[6]);
        break;
      case "S":
        (r = d[3]), (o = d[4]), t.bezierCurveToShort(d[1], d[2], r, o);
        break;
      case "s":
        t.bezierCurveToShort(r + d[1], o + d[2], r + d[3], o + d[4]),
          (r += d[3]),
          (o += d[4]);
        break;
      case "Q":
        (r = d[3]), (o = d[4]), t.quadraticCurveTo(d[1], d[2], r, o);
        break;
      case "q":
        t.quadraticCurveTo(r + d[1], o + d[2], r + d[3], o + d[4]),
          (r += d[3]),
          (o += d[4]);
        break;
      case "T":
        (r = d[1]), (o = d[2]), t.quadraticCurveToShort(r, o);
        break;
      case "t":
        (r += d[1]), (o += d[2]), t.quadraticCurveToShort(r, o);
        break;
      case "A":
        (r = d[6]), (o = d[7]), t.arcToSvg(d[1], d[2], d[3], d[4], d[5], r, o);
        break;
      case "a":
        (r += d[6]),
          (o += d[7]),
          t.arcToSvg(d[1], d[2], d[3], d[4], d[5], r, o);
        break;
      case "Z":
      case "z":
        t.closePath(),
          s.length > 0 &&
            ((n = s.pop()),
            n ? ((r = n.startX), (o = n.startY)) : ((r = 0), (o = 0))),
          (n = null);
        break;
      default:
        Ct(`Unknown SVG path command: ${l}`);
    }
    l !== "Z" &&
      l !== "z" &&
      n === null &&
      ((n = { startX: r, startY: o }), s.push(n));
  }
  return t;
}
class hn {
  constructor(t = 0, e = 0, s = 0) {
    (this.type = "circle"), (this.x = t), (this.y = e), (this.radius = s);
  }
  clone() {
    return new hn(this.x, this.y, this.radius);
  }
  contains(t, e) {
    if (this.radius <= 0) return !1;
    const s = this.radius * this.radius;
    let n = this.x - t,
      r = this.y - e;
    return (n *= n), (r *= r), n + r <= s;
  }
  strokeContains(t, e, s, n = 0.5) {
    if (this.radius === 0) return !1;
    const r = this.x - t,
      o = this.y - e,
      A = this.radius,
      h = (1 - n) * s,
      l = Math.sqrt(r * r + o * o);
    return l <= A + h && l > A - (s - h);
  }
  getBounds(t) {
    return (
      t || (t = new Bt()),
      (t.x = this.x - this.radius),
      (t.y = this.y - this.radius),
      (t.width = this.radius * 2),
      (t.height = this.radius * 2),
      t
    );
  }
  copyFrom(t) {
    return (this.x = t.x), (this.y = t.y), (this.radius = t.radius), this;
  }
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
}
class ln {
  constructor(t = 0, e = 0, s = 0, n = 0) {
    (this.type = "ellipse"),
      (this.x = t),
      (this.y = e),
      (this.halfWidth = s),
      (this.halfHeight = n);
  }
  clone() {
    return new ln(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  contains(t, e) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0) return !1;
    let s = (t - this.x) / this.halfWidth,
      n = (e - this.y) / this.halfHeight;
    return (s *= s), (n *= n), s + n <= 1;
  }
  strokeContains(t, e, s, n = 0.5) {
    const { halfWidth: r, halfHeight: o } = this;
    if (r <= 0 || o <= 0) return !1;
    const A = s * (1 - n),
      h = s - A,
      l = r - h,
      d = o - h,
      a = r + A,
      c = o + A,
      u = t - this.x,
      g = e - this.y,
      y = (u * u) / (l * l) + (g * g) / (d * d),
      m = (u * u) / (a * a) + (g * g) / (c * c);
    return y > 1 && m <= 1;
  }
  getBounds(t) {
    return (
      t || (t = new Bt()),
      (t.x = this.x - this.halfWidth),
      (t.y = this.y - this.halfHeight),
      (t.width = this.halfWidth * 2),
      (t.height = this.halfHeight * 2),
      t
    );
  }
  copyFrom(t) {
    return (
      (this.x = t.x),
      (this.y = t.y),
      (this.halfWidth = t.halfWidth),
      (this.halfHeight = t.halfHeight),
      this
    );
  }
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
  }
}
function fh(i, t, e, s, n, r) {
  const o = i - e,
    A = t - s,
    h = n - e,
    l = r - s,
    d = o * h + A * l,
    a = h * h + l * l;
  let c = -1;
  a !== 0 && (c = d / a);
  let u, g;
  c < 0
    ? ((u = e), (g = s))
    : c > 1
      ? ((u = n), (g = r))
      : ((u = e + c * h), (g = s + c * l));
  const y = i - u,
    m = t - g;
  return y * y + m * m;
}
let gh, ph;
class ci {
  constructor(...t) {
    this.type = "polygon";
    let e = Array.isArray(t[0]) ? t[0] : t;
    if (typeof e[0] != "number") {
      const s = [];
      for (let n = 0, r = e.length; n < r; n++) s.push(e[n].x, e[n].y);
      e = s;
    }
    (this.points = e), (this.closePath = !0);
  }
  isClockwise() {
    let t = 0;
    const e = this.points,
      s = e.length;
    for (let n = 0; n < s; n += 2) {
      const r = e[n],
        o = e[n + 1],
        A = e[(n + 2) % s],
        h = e[(n + 3) % s];
      t += (A - r) * (h + o);
    }
    return t < 0;
  }
  containsPolygon(t) {
    const e = this.getBounds(gh),
      s = t.getBounds(ph);
    if (!e.containsRect(s)) return !1;
    const n = t.points;
    for (let r = 0; r < n.length; r += 2) {
      const o = n[r],
        A = n[r + 1];
      if (!this.contains(o, A)) return !1;
    }
    return !0;
  }
  clone() {
    const t = this.points.slice(),
      e = new ci(t);
    return (e.closePath = this.closePath), e;
  }
  contains(t, e) {
    let s = !1;
    const n = this.points.length / 2;
    for (let r = 0, o = n - 1; r < n; o = r++) {
      const A = this.points[r * 2],
        h = this.points[r * 2 + 1],
        l = this.points[o * 2],
        d = this.points[o * 2 + 1];
      h > e != d > e && t < (l - A) * ((e - h) / (d - h)) + A && (s = !s);
    }
    return s;
  }
  strokeContains(t, e, s, n = 0.5) {
    const r = s * s,
      o = r * (1 - n),
      A = r - o,
      { points: h } = this,
      l = h.length - (this.closePath ? 0 : 2);
    for (let d = 0; d < l; d += 2) {
      const a = h[d],
        c = h[d + 1],
        u = h[(d + 2) % h.length],
        g = h[(d + 3) % h.length],
        y = fh(t, e, a, c, u, g),
        m = Math.sign((u - a) * (e - c) - (g - c) * (t - a));
      if (y <= (m < 0 ? A : o)) return !0;
    }
    return !1;
  }
  getBounds(t) {
    t || (t = new Bt());
    const e = this.points;
    let s = 1 / 0,
      n = -1 / 0,
      r = 1 / 0,
      o = -1 / 0;
    for (let A = 0, h = e.length; A < h; A += 2) {
      const l = e[A],
        d = e[A + 1];
      (s = l < s ? l : s),
        (n = l > n ? l : n),
        (r = d < r ? d : r),
        (o = d > o ? d : o);
    }
    return (t.x = s), (t.width = n - s), (t.y = r), (t.height = o - r), t;
  }
  copyFrom(t) {
    return (
      (this.points = t.points.slice()), (this.closePath = t.closePath), this
    );
  }
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t, e) => `${t}, ${e}`, "")}]`;
  }
  get lastX() {
    return this.points[this.points.length - 2];
  }
  get lastY() {
    return this.points[this.points.length - 1];
  }
  get x() {
    return this.points[this.points.length - 2];
  }
  get y() {
    return this.points[this.points.length - 1];
  }
}
const Bi = (i, t, e, s, n, r, o) => {
  const A = i - e,
    h = t - s,
    l = Math.sqrt(A * A + h * h);
  return l >= n - r && l <= n + o;
};
class cn {
  constructor(t = 0, e = 0, s = 0, n = 0, r = 20) {
    (this.type = "roundedRectangle"),
      (this.x = t),
      (this.y = e),
      (this.width = s),
      (this.height = n),
      (this.radius = r);
  }
  getBounds(t) {
    return (
      t || (t = new Bt()),
      (t.x = this.x),
      (t.y = this.y),
      (t.width = this.width),
      (t.height = this.height),
      t
    );
  }
  clone() {
    return new cn(this.x, this.y, this.width, this.height, this.radius);
  }
  copyFrom(t) {
    return (
      (this.x = t.x),
      (this.y = t.y),
      (this.width = t.width),
      (this.height = t.height),
      this
    );
  }
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  contains(t, e) {
    if (this.width <= 0 || this.height <= 0) return !1;
    if (
      t >= this.x &&
      t <= this.x + this.width &&
      e >= this.y &&
      e <= this.y + this.height
    ) {
      const s = Math.max(
        0,
        Math.min(this.radius, Math.min(this.width, this.height) / 2),
      );
      if (
        (e >= this.y + s && e <= this.y + this.height - s) ||
        (t >= this.x + s && t <= this.x + this.width - s)
      )
        return !0;
      let n = t - (this.x + s),
        r = e - (this.y + s);
      const o = s * s;
      if (
        n * n + r * r <= o ||
        ((n = t - (this.x + this.width - s)), n * n + r * r <= o) ||
        ((r = e - (this.y + this.height - s)), n * n + r * r <= o) ||
        ((n = t - (this.x + s)), n * n + r * r <= o)
      )
        return !0;
    }
    return !1;
  }
  strokeContains(t, e, s, n = 0.5) {
    const { x: r, y: o, width: A, height: h, radius: l } = this,
      d = s * (1 - n),
      a = s - d,
      c = r + l,
      u = o + l,
      g = A - l * 2,
      y = h - l * 2,
      m = r + A,
      C = o + h;
    return (((t >= r - d && t <= r + a) || (t >= m - a && t <= m + d)) &&
      e >= u &&
      e <= u + y) ||
      (((e >= o - d && e <= o + a) || (e >= C - a && e <= C + d)) &&
        t >= c &&
        t <= c + g)
      ? !0
      : (t < c && e < u && Bi(t, e, c, u, l, a, d)) ||
          (t > m - l && e < u && Bi(t, e, m - l, u, l, a, d)) ||
          (t > m - l && e > C - l && Bi(t, e, m - l, C - l, l, a, d)) ||
          (t < c && e > C - l && Bi(t, e, c, C - l, l, a, d));
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}
const mh = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}",
].join(`
`);
function yh(i) {
  let t = "";
  for (let e = 0; e < i; ++e)
    e > 0 &&
      (t += `
else `),
      e < i - 1 && (t += `if(test == ${e}.0){}`);
  return t;
}
function Ch(i, t) {
  if (i === 0)
    throw new Error(
      "Invalid value of `0` passed to `checkMaxIfStatementsInShader`",
    );
  const e = t.createShader(t.FRAGMENT_SHADER);
  try {
    for (;;) {
      const s = mh.replace(/%forloop%/gi, yh(i));
      if (
        (t.shaderSource(e, s),
        t.compileShader(e),
        !t.getShaderParameter(e, t.COMPILE_STATUS))
      )
        i = (i / 2) | 0;
      else break;
    }
  } finally {
    t.deleteShader(e);
  }
  return i;
}
let ze = null;
function Lo() {
  var t;
  if (ze) return ze;
  const i = Io();
  return (
    (ze = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS)),
    (ze = Ch(ze, i)),
    (t = i.getExtension("WEBGL_lose_context")) == null || t.loseContext(),
    ze
  );
}
const Ho = {};
function xh(i, t) {
  let e = 2166136261;
  for (let s = 0; s < t; s++)
    (e ^= i[s].uid), (e = Math.imul(e, 16777619)), (e >>>= 0);
  return Ho[e] || wh(i, t, e);
}
let ds = 0;
function wh(i, t, e) {
  const s = {};
  let n = 0;
  ds || (ds = Lo());
  for (let o = 0; o < ds; o++) {
    const A = o < t ? i[o] : $.EMPTY.source;
    (s[n++] = A.source), (s[n++] = A.style);
  }
  const r = new Pi(s);
  return (Ho[e] = r), r;
}
class er {
  constructor(t) {
    typeof t == "number"
      ? (this.rawBinaryData = new ArrayBuffer(t))
      : t instanceof Uint8Array
        ? (this.rawBinaryData = t.buffer)
        : (this.rawBinaryData = t),
      (this.uint32View = new Uint32Array(this.rawBinaryData)),
      (this.float32View = new Float32Array(this.rawBinaryData)),
      (this.size = this.rawBinaryData.byteLength);
  }
  get int8View() {
    return (
      this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)),
      this._int8View
    );
  }
  get uint8View() {
    return (
      this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)),
      this._uint8View
    );
  }
  get int16View() {
    return (
      this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)),
      this._int16View
    );
  }
  get int32View() {
    return (
      this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)),
      this._int32View
    );
  }
  get float64View() {
    return (
      this._float64Array ||
        (this._float64Array = new Float64Array(this.rawBinaryData)),
      this._float64Array
    );
  }
  get bigUint64View() {
    return (
      this._bigUint64Array ||
        (this._bigUint64Array = new BigUint64Array(this.rawBinaryData)),
      this._bigUint64Array
    );
  }
  view(t) {
    return this[`${t}View`];
  }
  destroy() {
    (this.rawBinaryData = null),
      (this._int8View = null),
      (this._uint8View = null),
      (this._int16View = null),
      (this.uint16View = null),
      (this._int32View = null),
      (this.uint32View = null),
      (this.float32View = null);
  }
  static sizeOf(t) {
    switch (t) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${t} isn't a valid view type`);
    }
  }
}
function ir(i, t) {
  const e = (i.byteLength / 8) | 0,
    s = new Float64Array(i, 0, e);
  new Float64Array(t, 0, e).set(s);
  const r = i.byteLength - e * 8;
  if (r > 0) {
    const o = new Uint8Array(i, e * 8, r);
    new Uint8Array(t, e * 8, r).set(o);
  }
}
const bh = { normal: "normal-npm", add: "add-npm", screen: "screen-npm" };
var Eh = ((i) => (
  (i[(i.DISABLED = 0)] = "DISABLED"),
  (i[(i.RENDERING_MASK_ADD = 1)] = "RENDERING_MASK_ADD"),
  (i[(i.MASK_ACTIVE = 2)] = "MASK_ACTIVE"),
  (i[(i.INVERSE_MASK_ACTIVE = 3)] = "INVERSE_MASK_ACTIVE"),
  (i[(i.RENDERING_MASK_REMOVE = 4)] = "RENDERING_MASK_REMOVE"),
  (i[(i.NONE = 5)] = "NONE"),
  i
))(Eh || {});
function sr(i, t) {
  return (t.alphaMode === "no-premultiply-alpha" && bh[i]) || i;
}
class vh {
  constructor() {
    (this.ids = Object.create(null)), (this.textures = []), (this.count = 0);
  }
  clear() {
    for (let t = 0; t < this.count; t++) {
      const e = this.textures[t];
      (this.textures[t] = null), (this.ids[e.uid] = null);
    }
    this.count = 0;
  }
}
class Bh {
  constructor() {
    (this.renderPipeId = "batch"),
      (this.action = "startBatch"),
      (this.start = 0),
      (this.size = 0),
      (this.textures = new vh()),
      (this.blendMode = "normal"),
      (this.topology = "triangle-strip"),
      (this.canBundle = !0);
  }
  destroy() {
    (this.textures = null),
      (this.gpuBindGroup = null),
      (this.bindGroup = null),
      (this.batcher = null);
  }
}
const Yo = [];
let Os = 0;
function nr() {
  return Os > 0 ? Yo[--Os] : new Bh();
}
function rr(i) {
  Yo[Os++] = i;
}
let ii = 0;
const Xo = class Ri {
  constructor(t = {}) {
    (this.uid = It("batcher")),
      (this.dirty = !0),
      (this.batchIndex = 0),
      (this.batches = []),
      (this._elements = []),
      (Ri.defaultOptions.maxTextures = Ri.defaultOptions.maxTextures ?? Lo()),
      (t = { ...Ri.defaultOptions, ...t });
    const {
      maxTextures: e,
      attributesInitialSize: s,
      indicesInitialSize: n,
    } = t;
    (this.attributeBuffer = new er(s * 4)),
      (this.indexBuffer = new Uint16Array(n)),
      (this.maxTextures = e);
  }
  begin() {
    (this.elementSize = 0),
      (this.elementStart = 0),
      (this.indexSize = 0),
      (this.attributeSize = 0);
    for (let t = 0; t < this.batchIndex; t++) rr(this.batches[t]);
    (this.batchIndex = 0),
      (this._batchIndexStart = 0),
      (this._batchIndexSize = 0),
      (this.dirty = !0);
  }
  add(t) {
    (this._elements[this.elementSize++] = t),
      (t._indexStart = this.indexSize),
      (t._attributeStart = this.attributeSize),
      (t._batcher = this),
      (this.indexSize += t.indexSize),
      (this.attributeSize += t.attributeSize * this.vertexSize);
  }
  checkAndUpdateTexture(t, e) {
    const s = t._batch.textures.ids[e._source.uid];
    return !s && s !== 0 ? !1 : ((t._textureId = s), (t.texture = e), !0);
  }
  updateElement(t) {
    this.dirty = !0;
    const e = this.attributeBuffer;
    t.packAsQuad
      ? this.packQuadAttributes(
          t,
          e.float32View,
          e.uint32View,
          t._attributeStart,
          t._textureId,
        )
      : this.packAttributes(
          t,
          e.float32View,
          e.uint32View,
          t._attributeStart,
          t._textureId,
        );
  }
  break(t) {
    const e = this._elements;
    if (!e[this.elementStart]) return;
    let s = nr(),
      n = s.textures;
    n.clear();
    const r = e[this.elementStart];
    let o = sr(r.blendMode, r.texture._source),
      A = r.topology;
    this.attributeSize * 4 > this.attributeBuffer.size &&
      this._resizeAttributeBuffer(this.attributeSize * 4),
      this.indexSize > this.indexBuffer.length &&
        this._resizeIndexBuffer(this.indexSize);
    const h = this.attributeBuffer.float32View,
      l = this.attributeBuffer.uint32View,
      d = this.indexBuffer;
    let a = this._batchIndexSize,
      c = this._batchIndexStart,
      u = "startBatch";
    const g = this.maxTextures;
    for (let y = this.elementStart; y < this.elementSize; ++y) {
      const m = e[y];
      e[y] = null;
      const w = m.texture._source,
        E = sr(m.blendMode, w),
        I = o !== E || A !== m.topology;
      if (w._batchTick === ii && !I) {
        (m._textureId = w._textureBindLocation),
          (a += m.indexSize),
          m.packAsQuad
            ? (this.packQuadAttributes(
                m,
                h,
                l,
                m._attributeStart,
                m._textureId,
              ),
              this.packQuadIndex(
                d,
                m._indexStart,
                m._attributeStart / this.vertexSize,
              ))
            : (this.packAttributes(m, h, l, m._attributeStart, m._textureId),
              this.packIndex(
                m,
                d,
                m._indexStart,
                m._attributeStart / this.vertexSize,
              )),
          (m._batch = s);
        continue;
      }
      (w._batchTick = ii),
        (n.count >= g || I) &&
          (this._finishBatch(s, c, a - c, n, o, A, t, u),
          (u = "renderBatch"),
          (c = a),
          (o = E),
          (A = m.topology),
          (s = nr()),
          (n = s.textures),
          n.clear(),
          ++ii),
        (m._textureId = w._textureBindLocation = n.count),
        (n.ids[w.uid] = n.count),
        (n.textures[n.count++] = w),
        (m._batch = s),
        (a += m.indexSize),
        m.packAsQuad
          ? (this.packQuadAttributes(m, h, l, m._attributeStart, m._textureId),
            this.packQuadIndex(
              d,
              m._indexStart,
              m._attributeStart / this.vertexSize,
            ))
          : (this.packAttributes(m, h, l, m._attributeStart, m._textureId),
            this.packIndex(
              m,
              d,
              m._indexStart,
              m._attributeStart / this.vertexSize,
            ));
    }
    n.count > 0 &&
      (this._finishBatch(s, c, a - c, n, o, A, t, u), (c = a), ++ii),
      (this.elementStart = this.elementSize),
      (this._batchIndexStart = c),
      (this._batchIndexSize = a);
  }
  _finishBatch(t, e, s, n, r, o, A, h) {
    (t.gpuBindGroup = null),
      (t.bindGroup = null),
      (t.action = h),
      (t.batcher = this),
      (t.textures = n),
      (t.blendMode = r),
      (t.topology = o),
      (t.start = e),
      (t.size = s),
      ++ii,
      (this.batches[this.batchIndex++] = t),
      A.add(t);
  }
  finish(t) {
    this.break(t);
  }
  ensureAttributeBuffer(t) {
    t * 4 <= this.attributeBuffer.size || this._resizeAttributeBuffer(t * 4);
  }
  ensureIndexBuffer(t) {
    t <= this.indexBuffer.length || this._resizeIndexBuffer(t);
  }
  _resizeAttributeBuffer(t) {
    const e = Math.max(t, this.attributeBuffer.size * 2),
      s = new er(e);
    ir(this.attributeBuffer.rawBinaryData, s.rawBinaryData),
      (this.attributeBuffer = s);
  }
  _resizeIndexBuffer(t) {
    const e = this.indexBuffer;
    let s = Math.max(t, e.length * 1.5);
    s += s % 2;
    const n = s > 65535 ? new Uint32Array(s) : new Uint16Array(s);
    if (n.BYTES_PER_ELEMENT !== e.BYTES_PER_ELEMENT)
      for (let r = 0; r < e.length; r++) n[r] = e[r];
    else ir(e.buffer, n.buffer);
    this.indexBuffer = n;
  }
  packQuadIndex(t, e, s) {
    (t[e] = s + 0),
      (t[e + 1] = s + 1),
      (t[e + 2] = s + 2),
      (t[e + 3] = s + 0),
      (t[e + 4] = s + 2),
      (t[e + 5] = s + 3);
  }
  packIndex(t, e, s, n) {
    const r = t.indices,
      o = t.indexSize,
      A = t.indexOffset,
      h = t.attributeOffset;
    for (let l = 0; l < o; l++) e[s++] = n + r[l + A] - h;
  }
  destroy() {
    for (let t = 0; t < this.batches.length; t++) rr(this.batches[t]);
    this.batches = null;
    for (let t = 0; t < this._elements.length; t++)
      this._elements[t]._batch = null;
    (this._elements = null),
      (this.indexBuffer = null),
      this.attributeBuffer.destroy(),
      (this.attributeBuffer = null);
  }
};
Xo.defaultOptions = {
  maxTextures: null,
  attributesInitialSize: 4,
  indicesInitialSize: 6,
};
let Ih = Xo;
var Nt = ((i) => (
  (i[(i.MAP_READ = 1)] = "MAP_READ"),
  (i[(i.MAP_WRITE = 2)] = "MAP_WRITE"),
  (i[(i.COPY_SRC = 4)] = "COPY_SRC"),
  (i[(i.COPY_DST = 8)] = "COPY_DST"),
  (i[(i.INDEX = 16)] = "INDEX"),
  (i[(i.VERTEX = 32)] = "VERTEX"),
  (i[(i.UNIFORM = 64)] = "UNIFORM"),
  (i[(i.STORAGE = 128)] = "STORAGE"),
  (i[(i.INDIRECT = 256)] = "INDIRECT"),
  (i[(i.QUERY_RESOLVE = 512)] = "QUERY_RESOLVE"),
  (i[(i.STATIC = 1024)] = "STATIC"),
  i
))(Nt || {});
class di extends Jt {
  constructor(t) {
    let { data: e, size: s } = t;
    const { usage: n, label: r, shrinkToFit: o } = t;
    super(),
      (this.uid = It("buffer")),
      (this._resourceType = "buffer"),
      (this._resourceId = It("resource")),
      (this._touched = 0),
      (this._updateID = 1),
      (this._dataInt32 = null),
      (this.shrinkToFit = !0),
      (this.destroyed = !1),
      e instanceof Array && (e = new Float32Array(e)),
      (this._data = e),
      s ?? (s = e == null ? void 0 : e.byteLength);
    const A = !!e;
    (this.descriptor = { size: s, usage: n, mappedAtCreation: A, label: r }),
      (this.shrinkToFit = o ?? !0);
  }
  get data() {
    return this._data;
  }
  set data(t) {
    this.setDataWithSize(t, t.length, !0);
  }
  get dataInt32() {
    return (
      this._dataInt32 || (this._dataInt32 = new Int32Array(this.data.buffer)),
      this._dataInt32
    );
  }
  get static() {
    return !!(this.descriptor.usage & Nt.STATIC);
  }
  set static(t) {
    t
      ? (this.descriptor.usage |= Nt.STATIC)
      : (this.descriptor.usage &= ~Nt.STATIC);
  }
  setDataWithSize(t, e, s) {
    if (
      (this._updateID++,
      (this._updateSize = e * t.BYTES_PER_ELEMENT),
      this._data === t)
    ) {
      s && this.emit("update", this);
      return;
    }
    const n = this._data;
    if (
      ((this._data = t), (this._dataInt32 = null), !n || n.length !== t.length)
    ) {
      !this.shrinkToFit && n && t.byteLength < n.byteLength
        ? s && this.emit("update", this)
        : ((this.descriptor.size = t.byteLength),
          (this._resourceId = It("resource")),
          this.emit("change", this));
      return;
    }
    s && this.emit("update", this);
  }
  update(t) {
    (this._updateSize = t ?? this._updateSize),
      this._updateID++,
      this.emit("update", this);
  }
  destroy() {
    (this.destroyed = !0),
      this.emit("destroy", this),
      this.emit("change", this),
      (this._data = null),
      (this.descriptor = null),
      this.removeAllListeners();
  }
}
function Vo(i, t) {
  if (!(i instanceof di)) {
    let e = t ? Nt.INDEX : Nt.VERTEX;
    i instanceof Array &&
      (t
        ? ((i = new Uint32Array(i)), (e = Nt.INDEX | Nt.COPY_DST))
        : ((i = new Float32Array(i)), (e = Nt.VERTEX | Nt.COPY_DST))),
      (i = new di({
        data: i,
        label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
        usage: e,
      }));
  }
  return i;
}
function Mh(i, t, e) {
  const s = i.getAttribute(t);
  if (!s) return (e.minX = 0), (e.minY = 0), (e.maxX = 0), (e.maxY = 0), e;
  const n = s.buffer.data;
  let r = 1 / 0,
    o = 1 / 0,
    A = -1 / 0,
    h = -1 / 0;
  const l = n.BYTES_PER_ELEMENT,
    d = (s.offset || 0) / l,
    a = (s.stride || 2 * 4) / l;
  for (let c = d; c < n.length; c += a) {
    const u = n[c],
      g = n[c + 1];
    u > A && (A = u), g > h && (h = g), u < r && (r = u), g < o && (o = g);
  }
  return (e.minX = r), (e.minY = o), (e.maxX = A), (e.maxY = h), e;
}
function Sh(i) {
  return (
    (i instanceof di || Array.isArray(i) || i.BYTES_PER_ELEMENT) &&
      (i = { buffer: i }),
    (i.buffer = Vo(i.buffer, !1)),
    i
  );
}
class Qh extends Jt {
  constructor(t = {}) {
    super(),
      (this.uid = It("geometry")),
      (this._layoutKey = 0),
      (this.instanceCount = 1),
      (this._bounds = new Wt()),
      (this._boundsDirty = !0);
    const { attributes: e, indexBuffer: s, topology: n } = t;
    if (((this.buffers = []), (this.attributes = {}), e))
      for (const r in e) this.addAttribute(r, e[r]);
    (this.instanceCount = t.instanceCount ?? 1),
      s && this.addIndex(s),
      (this.topology = n || "triangle-list");
  }
  onBufferUpdate() {
    (this._boundsDirty = !0), this.emit("update", this);
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  getIndex() {
    return this.indexBuffer;
  }
  getBuffer(t) {
    return this.getAttribute(t).buffer;
  }
  getSize() {
    for (const t in this.attributes) {
      const e = this.attributes[t];
      return e.buffer.data.length / (e.stride / 4 || e.size);
    }
    return 0;
  }
  addAttribute(t, e) {
    const s = Sh(e);
    this.buffers.indexOf(s.buffer) === -1 &&
      (this.buffers.push(s.buffer),
      s.buffer.on("update", this.onBufferUpdate, this),
      s.buffer.on("change", this.onBufferUpdate, this)),
      (this.attributes[t] = s);
  }
  addIndex(t) {
    (this.indexBuffer = Vo(t, !0)), this.buffers.push(this.indexBuffer);
  }
  get bounds() {
    return this._boundsDirty
      ? ((this._boundsDirty = !1), Mh(this, "aPosition", this._bounds))
      : this._bounds;
  }
  destroy(t = !1) {
    this.emit("destroy", this),
      this.removeAllListeners(),
      t && this.buffers.forEach((e) => e.destroy()),
      (this.attributes = null),
      (this.buffers = null),
      (this.indexBuffer = null),
      (this._bounds = null);
  }
}
const Dh = new Float32Array(1),
  Ph = new Uint32Array(1);
class Rh extends Qh {
  constructor() {
    const e = new di({
        data: Dh,
        label: "attribute-batch-buffer",
        usage: Nt.VERTEX | Nt.COPY_DST,
        shrinkToFit: !1,
      }),
      s = new di({
        data: Ph,
        label: "index-batch-buffer",
        usage: Nt.INDEX | Nt.COPY_DST,
        shrinkToFit: !1,
      }),
      n = 6 * 4;
    super({
      attributes: {
        aPosition: { buffer: e, format: "float32x2", stride: n, offset: 0 },
        aUV: { buffer: e, format: "float32x2", stride: n, offset: 2 * 4 },
        aColor: { buffer: e, format: "unorm8x4", stride: n, offset: 4 * 4 },
        aTextureIdAndRound: {
          buffer: e,
          format: "uint16x2",
          stride: n,
          offset: 5 * 4,
        },
      },
      indexBuffer: s,
    });
  }
}
function or(i, t, e) {
  if (i)
    for (const s in i) {
      const n = s.toLocaleLowerCase(),
        r = t[n];
      if (r) {
        let o = i[s];
        s === "header" &&
          (o = o
            .replace(/@in\s+[^;]+;\s*/g, "")
            .replace(/@out\s+[^;]+;\s*/g, "")),
          e && r.push(`//----${e}----//`),
          r.push(o);
      } else Ct(`${s} placement hook does not exist in shader`);
    }
}
const Fh = /\{\{(.*?)\}\}/g;
function ar(i) {
  var s;
  const t = {};
  return (
    (
      ((s = i.match(Fh)) == null
        ? void 0
        : s.map((n) => n.replace(/[{()}]/g, ""))) ?? []
    ).forEach((n) => {
      t[n] = [];
    }),
    t
  );
}
function Ar(i, t) {
  let e;
  const s = /@in\s+([^;]+);/g;
  for (; (e = s.exec(i)) !== null; ) t.push(e[1]);
}
function hr(i, t, e = !1) {
  const s = [];
  Ar(t, s),
    i.forEach((A) => {
      A.header && Ar(A.header, s);
    });
  const n = s;
  e && n.sort();
  const r = n.map((A, h) => `       @location(${h}) ${A},`).join(`
`);
  let o = t.replace(/@in\s+[^;]+;\s*/g, "");
  return (
    (o = o.replace(
      "{{in}}",
      `
${r}
`,
    )),
    o
  );
}
function lr(i, t) {
  let e;
  const s = /@out\s+([^;]+);/g;
  for (; (e = s.exec(i)) !== null; ) t.push(e[1]);
}
function Th(i) {
  const e = /\b(\w+)\s*:/g.exec(i);
  return e ? e[1] : "";
}
function kh(i) {
  const t = /@.*?\s+/g;
  return i.replace(t, "");
}
function Gh(i, t) {
  const e = [];
  lr(t, e),
    i.forEach((h) => {
      h.header && lr(h.header, e);
    });
  let s = 0;
  const n = e
      .sort()
      .map((h) => (h.indexOf("builtin") > -1 ? h : `@location(${s++}) ${h}`))
      .join(`,
`),
    r = e.sort().map((h) => `       var ${kh(h)};`).join(`
`),
    o = `return VSOutput(
            ${e.sort().map((h) => ` ${Th(h)}`).join(`,
`)});`;
  let A = t.replace(/@out\s+[^;]+;\s*/g, "");
  return (
    (A = A.replace(
      "{{struct}}",
      `
${n}
`,
    )),
    (A = A.replace(
      "{{start}}",
      `
${r}
`,
    )),
    (A = A.replace(
      "{{return}}",
      `
${o}
`,
    )),
    A
  );
}
function cr(i, t) {
  let e = i;
  for (const s in t) {
    const n = t[s];
    n.join(`
`).length
      ? (e = e.replace(
          `{{${s}}}`,
          `//-----${s} START-----//
${n.join(`
`)}
//----${s} FINISH----//`,
        ))
      : (e = e.replace(`{{${s}}}`, ""));
  }
  return e;
}
const Se = Object.create(null),
  fs = new Map();
let Uh = 0;
function Nh({ template: i, bits: t }) {
  const e = _o(i, t);
  if (Se[e]) return Se[e];
  const { vertex: s, fragment: n } = jh(i, t);
  return (Se[e] = qo(s, n, t)), Se[e];
}
function Oh({ template: i, bits: t }) {
  const e = _o(i, t);
  return Se[e] || (Se[e] = qo(i.vertex, i.fragment, t)), Se[e];
}
function jh(i, t) {
  const e = t.map((o) => o.vertex).filter((o) => !!o),
    s = t.map((o) => o.fragment).filter((o) => !!o);
  let n = hr(e, i.vertex, !0);
  n = Gh(e, n);
  const r = hr(s, i.fragment, !0);
  return { vertex: n, fragment: r };
}
function _o(i, t) {
  return (
    t
      .map((e) => (fs.has(e) || fs.set(e, Uh++), fs.get(e)))
      .sort((e, s) => e - s)
      .join("-") +
    i.vertex +
    i.fragment
  );
}
function qo(i, t, e) {
  const s = ar(i),
    n = ar(t);
  return (
    e.forEach((r) => {
      or(r.vertex, s, r.name), or(r.fragment, n, r.name);
    }),
    { vertex: cr(i, s), fragment: cr(t, n) }
  );
}
const zh = `
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,
  Lh = `
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,
  Hh = `
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,
  Yh = `
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
        
        {{end}}
    }
`,
  Xh = {
    name: "global-uniforms-bit",
    vertex: {
      header: `
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `,
    },
  },
  Vh = {
    name: "global-uniforms-bit",
    vertex: {
      header: `
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `,
    },
  };
function _h({ bits: i, name: t }) {
  const e = Nh({ template: { fragment: Lh, vertex: zh }, bits: [Xh, ...i] });
  return Xi.from({
    name: t,
    vertex: { source: e.vertex, entryPoint: "main" },
    fragment: { source: e.fragment, entryPoint: "main" },
  });
}
function qh({ bits: i, name: t }) {
  return new So({
    name: t,
    ...Oh({ template: { vertex: Hh, fragment: Yh }, bits: [Vh, ...i] }),
  });
}
const Zh = {
    name: "color-bit",
    vertex: {
      header: `
            @in aColor: vec4<f32>;
        `,
      main: `
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `,
    },
  },
  Wh = {
    name: "color-bit",
    vertex: {
      header: `
            in vec4 aColor;
        `,
      main: `
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `,
    },
  },
  gs = {};
function Kh(i) {
  const t = [];
  if (i === 1)
    t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),
      t.push("@group(1) @binding(1) var textureSampler1: sampler;");
  else {
    let e = 0;
    for (let s = 0; s < i; s++)
      t.push(
        `@group(1) @binding(${e++}) var textureSource${s + 1}: texture_2d<f32>;`,
      ),
        t.push(
          `@group(1) @binding(${e++}) var textureSampler${s + 1}: sampler;`,
        );
  }
  return t.join(`
`);
}
function Jh(i) {
  const t = [];
  if (i === 1)
    t.push(
      "outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);",
    );
  else {
    t.push("switch vTextureId {");
    for (let e = 0; e < i; e++)
      e === i - 1 ? t.push("  default:{") : t.push(`  case ${e}:{`),
        t.push(
          `      outColor = textureSampleGrad(textureSource${e + 1}, textureSampler${e + 1}, vUV, uvDx, uvDy);`,
        ),
        t.push("      break;}");
    t.push("}");
  }
  return t.join(`
`);
}
function $h(i) {
  return (
    gs[i] ||
      (gs[i] = {
        name: "texture-batch-bit",
        vertex: {
          header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
          main: `
                vTextureId = aTextureIdAndRound.y;
            `,
          end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `,
        },
        fragment: {
          header: `
                @in @interpolate(flat) vTextureId: u32;

                ${Kh(i)}
            `,
          main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Jh(i)}
            `,
        },
      }),
    gs[i]
  );
}
const ps = {};
function tl(i) {
  const t = [];
  for (let e = 0; e < i; e++)
    e > 0 && t.push("else"),
      e < i - 1 && t.push(`if(vTextureId < ${e}.5)`),
      t.push("{"),
      t.push(`	outColor = texture(uTextures[${e}], vUV);`),
      t.push("}");
  return t.join(`
`);
}
function el(i) {
  return (
    ps[i] ||
      (ps[i] = {
        name: "texture-batch-bit",
        vertex: {
          header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,
          main: `
                vTextureId = aTextureIdAndRound.y;
            `,
          end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `,
        },
        fragment: {
          header: `
                in float vTextureId;

                uniform sampler2D uTextures[${i}];

            `,
          main: `

                ${tl(i)}
            `,
        },
      }),
    ps[i]
  );
}
const il = {
    name: "round-pixels-bit",
    vertex: {
      header: `
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `,
    },
  },
  sl = {
    name: "round-pixels-bit",
    vertex: {
      header: `   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `,
    },
  },
  ur = {};
function nl(i) {
  let t = ur[i];
  if (t) return t;
  const e = new Int32Array(i);
  for (let s = 0; s < i; s++) e[s] = s;
  return (
    (t = ur[i] =
      new Ro(
        { uTextures: { value: e, type: "i32", size: i } },
        { isStatic: !0 },
      )),
    t
  );
}
class rl extends an {
  constructor(t) {
    const e = qh({ name: "batch", bits: [Wh, el(t), sl] }),
      s = _h({ name: "batch", bits: [Zh, $h(t), il] });
    super({ glProgram: e, gpuProgram: s, resources: { batchSamplers: nl(t) } });
  }
}
let dr = null;
const Zo = class Wo extends Ih {
  constructor() {
    super(...arguments),
      (this.geometry = new Rh()),
      (this.shader = dr || (dr = new rl(this.maxTextures))),
      (this.name = Wo.extension.name),
      (this.vertexSize = 6);
  }
  packAttributes(t, e, s, n, r) {
    const o = (r << 16) | (t.roundPixels & 65535),
      A = t.transform,
      h = A.a,
      l = A.b,
      d = A.c,
      a = A.d,
      c = A.tx,
      u = A.ty,
      { positions: g, uvs: y } = t,
      m = t.color,
      C = t.attributeOffset,
      w = C + t.attributeSize;
    for (let E = C; E < w; E++) {
      const I = E * 2,
        U = g[I],
        D = g[I + 1];
      (e[n++] = h * U + d * D + c),
        (e[n++] = a * D + l * U + u),
        (e[n++] = y[I]),
        (e[n++] = y[I + 1]),
        (s[n++] = m),
        (s[n++] = o);
    }
  }
  packQuadAttributes(t, e, s, n, r) {
    const o = t.texture,
      A = t.transform,
      h = A.a,
      l = A.b,
      d = A.c,
      a = A.d,
      c = A.tx,
      u = A.ty,
      g = t.bounds,
      y = g.maxX,
      m = g.minX,
      C = g.maxY,
      w = g.minY,
      E = o.uvs,
      I = t.color,
      U = (r << 16) | (t.roundPixels & 65535);
    (e[n + 0] = h * m + d * w + c),
      (e[n + 1] = a * w + l * m + u),
      (e[n + 2] = E.x0),
      (e[n + 3] = E.y0),
      (s[n + 4] = I),
      (s[n + 5] = U),
      (e[n + 6] = h * y + d * w + c),
      (e[n + 7] = a * w + l * y + u),
      (e[n + 8] = E.x1),
      (e[n + 9] = E.y1),
      (s[n + 10] = I),
      (s[n + 11] = U),
      (e[n + 12] = h * y + d * C + c),
      (e[n + 13] = a * C + l * y + u),
      (e[n + 14] = E.x2),
      (e[n + 15] = E.y2),
      (s[n + 16] = I),
      (s[n + 17] = U),
      (e[n + 18] = h * m + d * C + c),
      (e[n + 19] = a * C + l * m + u),
      (e[n + 20] = E.x3),
      (e[n + 21] = E.y3),
      (s[n + 22] = I),
      (s[n + 23] = U);
  }
};
Zo.extension = { type: [Y.Batcher], name: "default" };
let ol = Zo;
function al(i, t, e, s, n, r, o, A = null) {
  let h = 0;
  (e *= t), (n *= r);
  const l = A.a,
    d = A.b,
    a = A.c,
    c = A.d,
    u = A.tx,
    g = A.ty;
  for (; h < o; ) {
    const y = i[e],
      m = i[e + 1];
    (s[n] = l * y + a * m + u),
      (s[n + 1] = d * y + c * m + g),
      (n += r),
      (e += t),
      h++;
  }
}
function Al(i, t, e, s) {
  let n = 0;
  for (t *= e; n < s; ) (i[t] = 0), (i[t + 1] = 0), (t += e), n++;
}
function Ko(i, t, e, s, n) {
  const r = t.a,
    o = t.b,
    A = t.c,
    h = t.d,
    l = t.tx,
    d = t.ty;
  e || (e = 0), s || (s = 2), n || (n = i.length / s - e);
  let a = e * s;
  for (let c = 0; c < n; c++) {
    const u = i[a],
      g = i[a + 1];
    (i[a] = r * u + A * g + l), (i[a + 1] = o * u + h * g + d), (a += s);
  }
}
const hl = new tt();
class Jo {
  constructor() {
    (this.packAsQuad = !1),
      (this.batcherName = "default"),
      (this.topology = "triangle-list"),
      (this.applyTransform = !0),
      (this.roundPixels = 0),
      (this._batcher = null),
      (this._batch = null);
  }
  get uvs() {
    return this.geometryData.uvs;
  }
  get positions() {
    return this.geometryData.vertices;
  }
  get indices() {
    return this.geometryData.indices;
  }
  get blendMode() {
    return this.applyTransform ? this.renderable.groupBlendMode : "normal";
  }
  get color() {
    const t = this.baseColor,
      e = (t >> 16) | (t & 65280) | ((t & 255) << 16),
      s = this.renderable;
    return s
      ? oo(e, s.groupColor) + ((this.alpha * s.groupAlpha * 255) << 24)
      : e + ((this.alpha * 255) << 24);
  }
  get transform() {
    var t;
    return ((t = this.renderable) == null ? void 0 : t.groupTransform) || hl;
  }
  copyTo(t) {
    (t.indexOffset = this.indexOffset),
      (t.indexSize = this.indexSize),
      (t.attributeOffset = this.attributeOffset),
      (t.attributeSize = this.attributeSize),
      (t.baseColor = this.baseColor),
      (t.alpha = this.alpha),
      (t.texture = this.texture),
      (t.geometryData = this.geometryData),
      (t.topology = this.topology);
  }
  reset() {
    (this.applyTransform = !0),
      (this.renderable = null),
      (this.topology = "triangle-list");
  }
}
const fi = {
    extension: { type: Y.ShapeBuilder, name: "circle" },
    build(i, t) {
      let e, s, n, r, o, A;
      if (i.type === "circle") {
        const I = i;
        (e = I.x), (s = I.y), (o = A = I.radius), (n = r = 0);
      } else if (i.type === "ellipse") {
        const I = i;
        (e = I.x),
          (s = I.y),
          (o = I.halfWidth),
          (A = I.halfHeight),
          (n = r = 0);
      } else {
        const I = i,
          U = I.width / 2,
          D = I.height / 2;
        (e = I.x + U),
          (s = I.y + D),
          (o = A = Math.max(0, Math.min(I.radius, Math.min(U, D)))),
          (n = U - o),
          (r = D - A);
      }
      if (!(o >= 0 && A >= 0 && n >= 0 && r >= 0)) return t;
      const h = Math.ceil(2.3 * Math.sqrt(o + A)),
        l = h * 8 + (n ? 4 : 0) + (r ? 4 : 0);
      if (l === 0) return t;
      if (h === 0)
        return (
          (t[0] = t[6] = e + n),
          (t[1] = t[3] = s + r),
          (t[2] = t[4] = e - n),
          (t[5] = t[7] = s - r),
          t
        );
      let d = 0,
        a = h * 4 + (n ? 2 : 0) + 2,
        c = a,
        u = l,
        g = n + o,
        y = r,
        m = e + g,
        C = e - g,
        w = s + y;
      if (((t[d++] = m), (t[d++] = w), (t[--a] = w), (t[--a] = C), r)) {
        const I = s - y;
        (t[c++] = C), (t[c++] = I), (t[--u] = I), (t[--u] = m);
      }
      for (let I = 1; I < h; I++) {
        const U = (Math.PI / 2) * (I / h),
          D = n + Math.cos(U) * o,
          F = r + Math.sin(U) * A,
          W = e + D,
          O = e - D,
          L = s + F,
          z = s - F;
        (t[d++] = W),
          (t[d++] = L),
          (t[--a] = L),
          (t[--a] = O),
          (t[c++] = O),
          (t[c++] = z),
          (t[--u] = z),
          (t[--u] = W);
      }
      (g = n), (y = r + A), (m = e + g), (C = e - g), (w = s + y);
      const E = s - y;
      return (
        (t[d++] = m),
        (t[d++] = w),
        (t[--u] = E),
        (t[--u] = m),
        n && ((t[d++] = C), (t[d++] = w), (t[--u] = E), (t[--u] = C)),
        t
      );
    },
    triangulate(i, t, e, s, n, r) {
      if (i.length === 0) return;
      let o = 0,
        A = 0;
      for (let d = 0; d < i.length; d += 2) (o += i[d]), (A += i[d + 1]);
      (o /= i.length / 2), (A /= i.length / 2);
      let h = s;
      (t[h * e] = o), (t[h * e + 1] = A);
      const l = h++;
      for (let d = 0; d < i.length; d += 2)
        (t[h * e] = i[d]),
          (t[h * e + 1] = i[d + 1]),
          d > 0 && ((n[r++] = h), (n[r++] = l), (n[r++] = h - 1)),
          h++;
      (n[r++] = l + 1), (n[r++] = l), (n[r++] = h - 1);
    },
  },
  ll = { ...fi, extension: { ...fi.extension, name: "ellipse" } },
  cl = { ...fi, extension: { ...fi.extension, name: "roundedRectangle" } },
  $o = 1e-4,
  fr = 1e-4;
function ul(i) {
  const t = i.length;
  if (t < 6) return 1;
  let e = 0;
  for (let s = 0, n = i[t - 2], r = i[t - 1]; s < t; s += 2) {
    const o = i[s],
      A = i[s + 1];
    (e += (o - n) * (A + r)), (n = o), (r = A);
  }
  return e < 0 ? -1 : 1;
}
function gr(i, t, e, s, n, r, o, A) {
  const h = i - e * n,
    l = t - s * n,
    d = i + e * r,
    a = t + s * r;
  let c, u;
  o ? ((c = s), (u = -e)) : ((c = -s), (u = e));
  const g = h + c,
    y = l + u,
    m = d + c,
    C = a + u;
  return A.push(g, y), A.push(m, C), 2;
}
function Pe(i, t, e, s, n, r, o, A) {
  const h = e - i,
    l = s - t;
  let d = Math.atan2(h, l),
    a = Math.atan2(n - i, r - t);
  A && d < a ? (d += Math.PI * 2) : !A && d > a && (a += Math.PI * 2);
  let c = d;
  const u = a - d,
    g = Math.abs(u),
    y = Math.sqrt(h * h + l * l),
    m = (((15 * g * Math.sqrt(y)) / Math.PI) >> 0) + 1,
    C = u / m;
  if (((c += C), A)) {
    o.push(i, t), o.push(e, s);
    for (let w = 1, E = c; w < m; w++, E += C)
      o.push(i, t), o.push(i + Math.sin(E) * y, t + Math.cos(E) * y);
    o.push(i, t), o.push(n, r);
  } else {
    o.push(e, s), o.push(i, t);
    for (let w = 1, E = c; w < m; w++, E += C)
      o.push(i + Math.sin(E) * y, t + Math.cos(E) * y), o.push(i, t);
    o.push(n, r), o.push(i, t);
  }
  return m * 2;
}
function dl(i, t, e, s, n, r) {
  const o = $o;
  if (i.length === 0) return;
  const A = t;
  let h = A.alignment;
  if (t.alignment !== 0.5) {
    let M = ul(i);
    h = (h - 0.5) * M + 0.5;
  }
  const l = new Rt(i[0], i[1]),
    d = new Rt(i[i.length - 2], i[i.length - 1]),
    a = s,
    c = Math.abs(l.x - d.x) < o && Math.abs(l.y - d.y) < o;
  if (a) {
    (i = i.slice()),
      c && (i.pop(), i.pop(), d.set(i[i.length - 2], i[i.length - 1]));
    const M = (l.x + d.x) * 0.5,
      Q = (d.y + l.y) * 0.5;
    i.unshift(M, Q), i.push(M, Q);
  }
  const u = n,
    g = i.length / 2;
  let y = i.length;
  const m = u.length / 2,
    C = A.width / 2,
    w = C * C,
    E = A.miterLimit * A.miterLimit;
  let I = i[0],
    U = i[1],
    D = i[2],
    F = i[3],
    W = 0,
    O = 0,
    L = -(U - F),
    z = I - D,
    ht = 0,
    st = 0,
    ft = Math.sqrt(L * L + z * z);
  (L /= ft), (z /= ft), (L *= C), (z *= C);
  const _t = h,
    x = (1 - _t) * 2,
    b = _t * 2;
  a ||
    (A.cap === "round"
      ? (y +=
          Pe(
            I - L * (x - b) * 0.5,
            U - z * (x - b) * 0.5,
            I - L * x,
            U - z * x,
            I + L * b,
            U + z * b,
            u,
            !0,
          ) + 2)
      : A.cap === "square" && (y += gr(I, U, L, z, x, b, !0, u))),
    u.push(I - L * x, U - z * x),
    u.push(I + L * b, U + z * b);
  for (let M = 1; M < g - 1; ++M) {
    (I = i[(M - 1) * 2]),
      (U = i[(M - 1) * 2 + 1]),
      (D = i[M * 2]),
      (F = i[M * 2 + 1]),
      (W = i[(M + 1) * 2]),
      (O = i[(M + 1) * 2 + 1]),
      (L = -(U - F)),
      (z = I - D),
      (ft = Math.sqrt(L * L + z * z)),
      (L /= ft),
      (z /= ft),
      (L *= C),
      (z *= C),
      (ht = -(F - O)),
      (st = D - W),
      (ft = Math.sqrt(ht * ht + st * st)),
      (ht /= ft),
      (st /= ft),
      (ht *= C),
      (st *= C);
    const Q = D - I,
      T = U - F,
      k = D - W,
      N = O - F,
      Z = Q * k + T * N,
      X = T * k - N * Q,
      ct = X < 0;
    if (Math.abs(X) < 0.001 * Math.abs(Z)) {
      u.push(D - L * x, F - z * x),
        u.push(D + L * b, F + z * b),
        Z >= 0 &&
          (A.join === "round"
            ? (y +=
                Pe(D, F, D - L * x, F - z * x, D - ht * x, F - st * x, u, !1) +
                4)
            : (y += 2),
          u.push(D - ht * b, F - st * b),
          u.push(D + ht * x, F + st * x));
      continue;
    }
    const ut = (-L + I) * (-z + F) - (-L + D) * (-z + U),
      nt = (-ht + W) * (-st + F) - (-ht + D) * (-st + O),
      vt = (Q * nt - k * ut) / X,
      at = (N * ut - T * nt) / X,
      ce = (vt - D) * (vt - D) + (at - F) * (at - F),
      jt = D + (vt - D) * x,
      ee = F + (at - F) * x,
      ie = D - (vt - D) * b,
      J = F - (at - F) * b,
      ot = Math.min(Q * Q + T * T, k * k + N * N),
      vn = ct ? x : b,
      Ba = ot + vn * vn * w;
    ce <= Ba
      ? A.join === "bevel" || ce / w > E
        ? (ct
            ? (u.push(jt, ee),
              u.push(D + L * b, F + z * b),
              u.push(jt, ee),
              u.push(D + ht * b, F + st * b))
            : (u.push(D - L * x, F - z * x),
              u.push(ie, J),
              u.push(D - ht * x, F - st * x),
              u.push(ie, J)),
          (y += 2))
        : A.join === "round"
          ? ct
            ? (u.push(jt, ee),
              u.push(D + L * b, F + z * b),
              (y +=
                Pe(D, F, D + L * b, F + z * b, D + ht * b, F + st * b, u, !0) +
                4),
              u.push(jt, ee),
              u.push(D + ht * b, F + st * b))
            : (u.push(D - L * x, F - z * x),
              u.push(ie, J),
              (y +=
                Pe(D, F, D - L * x, F - z * x, D - ht * x, F - st * x, u, !1) +
                4),
              u.push(D - ht * x, F - st * x),
              u.push(ie, J))
          : (u.push(jt, ee), u.push(ie, J))
      : (u.push(D - L * x, F - z * x),
        u.push(D + L * b, F + z * b),
        A.join === "round"
          ? ct
            ? (y +=
                Pe(D, F, D + L * b, F + z * b, D + ht * b, F + st * b, u, !0) +
                2)
            : (y +=
                Pe(D, F, D - L * x, F - z * x, D - ht * x, F - st * x, u, !1) +
                2)
          : A.join === "miter" &&
            ce / w <= E &&
            (ct
              ? (u.push(ie, J), u.push(ie, J))
              : (u.push(jt, ee), u.push(jt, ee)),
            (y += 2)),
        u.push(D - ht * x, F - st * x),
        u.push(D + ht * b, F + st * b),
        (y += 2));
  }
  (I = i[(g - 2) * 2]),
    (U = i[(g - 2) * 2 + 1]),
    (D = i[(g - 1) * 2]),
    (F = i[(g - 1) * 2 + 1]),
    (L = -(U - F)),
    (z = I - D),
    (ft = Math.sqrt(L * L + z * z)),
    (L /= ft),
    (z /= ft),
    (L *= C),
    (z *= C),
    u.push(D - L * x, F - z * x),
    u.push(D + L * b, F + z * b),
    a ||
      (A.cap === "round"
        ? (y +=
            Pe(
              D - L * (x - b) * 0.5,
              F - z * (x - b) * 0.5,
              D - L * x,
              F - z * x,
              D + L * b,
              F + z * b,
              u,
              !1,
            ) + 2)
        : A.cap === "square" && (y += gr(D, F, L, z, x, b, !1, u)));
  const v = fr * fr;
  for (let M = m; M < y + m - 2; ++M)
    (I = u[M * 2]),
      (U = u[M * 2 + 1]),
      (D = u[(M + 1) * 2]),
      (F = u[(M + 1) * 2 + 1]),
      (W = u[(M + 2) * 2]),
      (O = u[(M + 2) * 2 + 1]),
      !(Math.abs(I * (F - O) + D * (O - U) + W * (U - F)) < v) &&
        r.push(M, M + 1, M + 2);
}
function fl(i, t, e, s) {
  const n = $o;
  if (i.length === 0) return;
  const r = i[0],
    o = i[1],
    A = i[i.length - 2],
    h = i[i.length - 1],
    l = t || (Math.abs(r - A) < n && Math.abs(o - h) < n),
    d = e,
    a = i.length / 2,
    c = d.length / 2;
  for (let u = 0; u < a; u++) d.push(i[u * 2]), d.push(i[u * 2 + 1]);
  for (let u = 0; u < a - 1; u++) s.push(c + u, c + u + 1);
  l && s.push(c + a - 1, c);
}
function ta(i, t, e, s, n, r, o) {
  const A = ih(i, t, 2);
  if (!A) return;
  for (let l = 0; l < A.length; l += 3)
    (r[o++] = A[l] + n), (r[o++] = A[l + 1] + n), (r[o++] = A[l + 2] + n);
  let h = n * s;
  for (let l = 0; l < i.length; l += 2)
    (e[h] = i[l]), (e[h + 1] = i[l + 1]), (h += s);
}
const gl = [],
  pl = {
    extension: { type: Y.ShapeBuilder, name: "polygon" },
    build(i, t) {
      for (let e = 0; e < i.points.length; e++) t[e] = i.points[e];
      return t;
    },
    triangulate(i, t, e, s, n, r) {
      ta(i, gl, t, e, s, n, r);
    },
  },
  ml = {
    extension: { type: Y.ShapeBuilder, name: "rectangle" },
    build(i, t) {
      const e = i,
        s = e.x,
        n = e.y,
        r = e.width,
        o = e.height;
      return (
        r >= 0 &&
          o >= 0 &&
          ((t[0] = s),
          (t[1] = n),
          (t[2] = s + r),
          (t[3] = n),
          (t[4] = s + r),
          (t[5] = n + o),
          (t[6] = s),
          (t[7] = n + o)),
        t
      );
    },
    triangulate(i, t, e, s, n, r) {
      let o = 0;
      (s *= e),
        (t[s + o] = i[0]),
        (t[s + o + 1] = i[1]),
        (o += e),
        (t[s + o] = i[2]),
        (t[s + o + 1] = i[3]),
        (o += e),
        (t[s + o] = i[6]),
        (t[s + o + 1] = i[7]),
        (o += e),
        (t[s + o] = i[4]),
        (t[s + o + 1] = i[5]),
        (o += e);
      const A = s / e;
      (n[r++] = A),
        (n[r++] = A + 1),
        (n[r++] = A + 2),
        (n[r++] = A + 1),
        (n[r++] = A + 3),
        (n[r++] = A + 2);
    },
  },
  yl = {
    extension: { type: Y.ShapeBuilder, name: "triangle" },
    build(i, t) {
      return (
        (t[0] = i.x),
        (t[1] = i.y),
        (t[2] = i.x2),
        (t[3] = i.y2),
        (t[4] = i.x3),
        (t[5] = i.y3),
        t
      );
    },
    triangulate(i, t, e, s, n, r) {
      let o = 0;
      (s *= e),
        (t[s + o] = i[0]),
        (t[s + o + 1] = i[1]),
        (o += e),
        (t[s + o] = i[2]),
        (t[s + o + 1] = i[3]),
        (o += e),
        (t[s + o] = i[4]),
        (t[s + o + 1] = i[5]);
      const A = s / e;
      (n[r++] = A), (n[r++] = A + 1), (n[r++] = A + 2);
    },
  },
  Cl = new tt(),
  xl = new Bt();
function wl(i, t, e, s) {
  const n = t.matrix ? i.copyFrom(t.matrix).invert() : i.identity();
  if (t.textureSpace === "local") {
    const o = e.getBounds(xl);
    t.width && o.pad(t.width);
    const { x: A, y: h } = o,
      l = 1 / o.width,
      d = 1 / o.height,
      a = -A * l,
      c = -h * d,
      u = n.a,
      g = n.b,
      y = n.c,
      m = n.d;
    (n.a *= l),
      (n.b *= l),
      (n.c *= d),
      (n.d *= d),
      (n.tx = a * u + c * y + n.tx),
      (n.ty = a * g + c * m + n.ty);
  } else
    n.translate(t.texture.frame.x, t.texture.frame.y),
      n.scale(1 / t.texture.source.width, 1 / t.texture.source.height);
  const r = t.texture.source.style;
  return (
    !(t.fill instanceof me) &&
      r.addressMode === "clamp-to-edge" &&
      ((r.addressMode = "repeat"), r.update()),
    s && n.append(Cl.copyFrom(s).invert()),
    n
  );
}
const _i = {};
Dt.handleByMap(Y.ShapeBuilder, _i);
Dt.add(ml, pl, yl, fi, ll, cl);
const bl = new Bt(),
  El = new tt();
function vl(i, t) {
  const { geometryData: e, batches: s } = t;
  (s.length = 0),
    (e.indices.length = 0),
    (e.vertices.length = 0),
    (e.uvs.length = 0);
  for (let n = 0; n < i.instructions.length; n++) {
    const r = i.instructions[n];
    if (r.action === "texture") Bl(r.data, s, e);
    else if (r.action === "fill" || r.action === "stroke") {
      const o = r.action === "stroke",
        A = r.data.path.shapePath,
        h = r.data.style,
        l = r.data.hole;
      o && l && pr(l.shapePath, h, !0, s, e),
        l &&
          (A.shapePrimitives[A.shapePrimitives.length - 1].holes =
            l.shapePath.shapePrimitives),
        pr(A, h, o, s, e);
    }
  }
}
function Bl(i, t, e) {
  const { vertices: s, uvs: n, indices: r } = e,
    o = r.length,
    A = s.length / 2,
    h = [],
    l = _i.rectangle,
    d = bl,
    a = i.image;
  (d.x = i.dx), (d.y = i.dy), (d.width = i.dw), (d.height = i.dh);
  const c = i.transform;
  l.build(d, h), c && Ko(h, c), l.triangulate(h, s, 2, A, r, o);
  const u = a.uvs;
  n.push(u.x0, u.y0, u.x1, u.y1, u.x3, u.y3, u.x2, u.y2);
  const g = fe.get(Jo);
  (g.indexOffset = o),
    (g.indexSize = r.length - o),
    (g.attributeOffset = A),
    (g.attributeSize = s.length / 2 - A),
    (g.baseColor = i.style),
    (g.alpha = i.alpha),
    (g.texture = a),
    (g.geometryData = e),
    t.push(g);
}
function pr(i, t, e, s, n) {
  const { vertices: r, uvs: o, indices: A } = n;
  i.shapePrimitives.forEach(({ shape: h, transform: l, holes: d }) => {
    const a = A.length,
      c = r.length / 2,
      u = [],
      g = _i[h.type];
    let y = "triangle-list";
    if ((g.build(h, u), l && Ko(u, l), e)) {
      const E = h.closePath ?? !0,
        I = t;
      I.pixelLine ? (fl(u, E, r, A), (y = "line-list")) : dl(u, I, !1, E, r, A);
    } else if (d) {
      const E = [],
        I = u.slice();
      Il(d).forEach((D) => {
        E.push(I.length / 2), I.push(...D);
      }),
        ta(I, E, r, 2, c, A, a);
    } else g.triangulate(u, r, 2, c, A, a);
    const m = o.length / 2,
      C = t.texture;
    if (C !== $.WHITE) {
      const E = wl(El, t, h, l);
      al(r, 2, c, o, m, 2, r.length / 2 - c, E);
    } else Al(o, m, 2, r.length / 2 - c);
    const w = fe.get(Jo);
    (w.indexOffset = a),
      (w.indexSize = A.length - a),
      (w.attributeOffset = c),
      (w.attributeSize = r.length / 2 - c),
      (w.baseColor = t.color),
      (w.alpha = t.alpha),
      (w.texture = C),
      (w.geometryData = n),
      (w.topology = y),
      s.push(w);
  });
}
function Il(i) {
  const t = [];
  for (let e = 0; e < i.length; e++) {
    const s = i[e].shape,
      n = [];
    _i[s.type].build(s, n), t.push(n);
  }
  return t;
}
class Ml {
  constructor() {
    (this.batches = []),
      (this.geometryData = { vertices: [], uvs: [], indices: [] });
  }
}
class Sl {
  constructor() {
    (this.batcher = new ol()), (this.instructions = new lo());
  }
  init() {
    this.instructions.reset();
  }
  get geometry() {
    return (
      it(
        ja,
        "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead.",
      ),
      this.batcher.geometry
    );
  }
}
const un = class js {
  constructor(t) {
    (this._gpuContextHash = {}),
      (this._graphicsDataContextHash = Object.create(null)),
      t.renderableGC.addManagedHash(this, "_gpuContextHash"),
      t.renderableGC.addManagedHash(this, "_graphicsDataContextHash");
  }
  init(t) {
    js.defaultOptions.bezierSmoothness =
      (t == null ? void 0 : t.bezierSmoothness) ??
      js.defaultOptions.bezierSmoothness;
  }
  getContextRenderData(t) {
    return (
      this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t)
    );
  }
  updateGpuContext(t) {
    let e = this._gpuContextHash[t.uid] || this._initContext(t);
    if (t.dirty) {
      e ? this._cleanGraphicsContextData(t) : (e = this._initContext(t)),
        vl(t, e);
      const s = t.batchMode;
      t.customShader || s === "no-batch"
        ? (e.isBatchable = !1)
        : s === "auto" &&
          (e.isBatchable = e.geometryData.vertices.length < 400),
        (t.dirty = !1);
    }
    return e;
  }
  getGpuContext(t) {
    return this._gpuContextHash[t.uid] || this._initContext(t);
  }
  _initContextRenderData(t) {
    const e = fe.get(Sl),
      { batches: s, geometryData: n } = this._gpuContextHash[t.uid],
      r = n.vertices.length,
      o = n.indices.length;
    for (let d = 0; d < s.length; d++) s[d].applyTransform = !1;
    const A = e.batcher;
    A.ensureAttributeBuffer(r), A.ensureIndexBuffer(o), A.begin();
    for (let d = 0; d < s.length; d++) {
      const a = s[d];
      A.add(a);
    }
    A.finish(e.instructions);
    const h = A.geometry;
    h.indexBuffer.setDataWithSize(A.indexBuffer, A.indexSize, !0),
      h.buffers[0].setDataWithSize(
        A.attributeBuffer.float32View,
        A.attributeSize,
        !0,
      );
    const l = A.batches;
    for (let d = 0; d < l.length; d++) {
      const a = l[d];
      a.bindGroup = xh(a.textures.textures, a.textures.count);
    }
    return (this._graphicsDataContextHash[t.uid] = e), e;
  }
  _initContext(t) {
    const e = new Ml();
    return (
      (e.context = t),
      (this._gpuContextHash[t.uid] = e),
      t.on("destroy", this.onGraphicsContextDestroy, this),
      this._gpuContextHash[t.uid]
    );
  }
  onGraphicsContextDestroy(t) {
    this._cleanGraphicsContextData(t),
      t.off("destroy", this.onGraphicsContextDestroy, this),
      (this._gpuContextHash[t.uid] = null);
  }
  _cleanGraphicsContextData(t) {
    const e = this._gpuContextHash[t.uid];
    e.isBatchable ||
      (this._graphicsDataContextHash[t.uid] &&
        (fe.return(this.getContextRenderData(t)),
        (this._graphicsDataContextHash[t.uid] = null))),
      e.batches &&
        e.batches.forEach((s) => {
          fe.return(s);
        });
  }
  destroy() {
    for (const t in this._gpuContextHash)
      this._gpuContextHash[t] &&
        this.onGraphicsContextDestroy(this._gpuContextHash[t].context);
  }
};
un.extension = {
  type: [Y.WebGLSystem, Y.WebGPUSystem, Y.CanvasSystem],
  name: "graphicsContext",
};
un.defaultOptions = { bezierSmoothness: 0.5 };
let ea = un;
const Ql = 8,
  Ii = 11920929e-14,
  Dl = 1;
function ia(i, t, e, s, n, r, o, A, h, l) {
  const a = Math.min(
    0.99,
    Math.max(0, l ?? ea.defaultOptions.bezierSmoothness),
  );
  let c = (Dl - a) / 1;
  return (c *= c), Pl(t, e, s, n, r, o, A, h, i, c), i;
}
function Pl(i, t, e, s, n, r, o, A, h, l) {
  zs(i, t, e, s, n, r, o, A, h, l, 0), h.push(o, A);
}
function zs(i, t, e, s, n, r, o, A, h, l, d) {
  if (d > Ql) return;
  const a = (i + e) / 2,
    c = (t + s) / 2,
    u = (e + n) / 2,
    g = (s + r) / 2,
    y = (n + o) / 2,
    m = (r + A) / 2,
    C = (a + u) / 2,
    w = (c + g) / 2,
    E = (u + y) / 2,
    I = (g + m) / 2,
    U = (C + E) / 2,
    D = (w + I) / 2;
  if (d > 0) {
    let F = o - i,
      W = A - t;
    const O = Math.abs((e - o) * W - (s - A) * F),
      L = Math.abs((n - o) * W - (r - A) * F);
    if (O > Ii && L > Ii) {
      if ((O + L) * (O + L) <= l * (F * F + W * W)) {
        h.push(U, D);
        return;
      }
    } else if (O > Ii) {
      if (O * O <= l * (F * F + W * W)) {
        h.push(U, D);
        return;
      }
    } else if (L > Ii) {
      if (L * L <= l * (F * F + W * W)) {
        h.push(U, D);
        return;
      }
    } else if (
      ((F = U - (i + o) / 2), (W = D - (t + A) / 2), F * F + W * W <= l)
    ) {
      h.push(U, D);
      return;
    }
  }
  zs(i, t, a, c, C, w, U, D, h, l, d + 1),
    zs(U, D, E, I, y, m, o, A, h, l, d + 1);
}
const Rl = 8,
  Fl = 11920929e-14,
  Tl = 1;
function kl(i, t, e, s, n, r, o, A) {
  const l = Math.min(
    0.99,
    Math.max(0, A ?? ea.defaultOptions.bezierSmoothness),
  );
  let d = (Tl - l) / 1;
  return (d *= d), Gl(t, e, s, n, r, o, i, d), i;
}
function Gl(i, t, e, s, n, r, o, A) {
  Ls(o, i, t, e, s, n, r, A, 0), o.push(n, r);
}
function Ls(i, t, e, s, n, r, o, A, h) {
  if (h > Rl) return;
  const l = (t + s) / 2,
    d = (e + n) / 2,
    a = (s + r) / 2,
    c = (n + o) / 2,
    u = (l + a) / 2,
    g = (d + c) / 2;
  let y = r - t,
    m = o - e;
  const C = Math.abs((s - r) * m - (n - o) * y);
  if (C > Fl) {
    if (C * C <= A * (y * y + m * m)) {
      i.push(u, g);
      return;
    }
  } else if (
    ((y = u - (t + r) / 2), (m = g - (e + o) / 2), y * y + m * m <= A)
  ) {
    i.push(u, g);
    return;
  }
  Ls(i, t, e, l, d, u, g, A, h + 1), Ls(i, u, g, a, c, r, o, A, h + 1);
}
function sa(i, t, e, s, n, r, o, A) {
  let h = Math.abs(n - r);
  ((!o && n > r) || (o && r > n)) && (h = 2 * Math.PI - h),
    A || (A = Math.max(6, Math.floor(6 * Math.pow(s, 1 / 3) * (h / Math.PI)))),
    (A = Math.max(A, 3));
  let l = h / A,
    d = n;
  l *= o ? -1 : 1;
  for (let a = 0; a < A + 1; a++) {
    const c = Math.cos(d),
      u = Math.sin(d),
      g = t + c * s,
      y = e + u * s;
    i.push(g, y), (d += l);
  }
}
function Ul(i, t, e, s, n, r) {
  const o = i[i.length - 2],
    h = i[i.length - 1] - e,
    l = o - t,
    d = n - e,
    a = s - t,
    c = Math.abs(h * a - l * d);
  if (c < 1e-8 || r === 0) {
    (i[i.length - 2] !== t || i[i.length - 1] !== e) && i.push(t, e);
    return;
  }
  const u = h * h + l * l,
    g = d * d + a * a,
    y = h * d + l * a,
    m = (r * Math.sqrt(u)) / c,
    C = (r * Math.sqrt(g)) / c,
    w = (m * y) / u,
    E = (C * y) / g,
    I = m * a + C * l,
    U = m * d + C * h,
    D = l * (C + w),
    F = h * (C + w),
    W = a * (m + E),
    O = d * (m + E),
    L = Math.atan2(F - U, D - I),
    z = Math.atan2(O - U, W - I);
  sa(i, I + t, U + e, r, L, z, l * d > a * h);
}
const ui = Math.PI * 2,
  ms = { centerX: 0, centerY: 0, ang1: 0, ang2: 0 },
  ys = ({ x: i, y: t }, e, s, n, r, o, A, h) => {
    (i *= e), (t *= s);
    const l = n * i - r * t,
      d = r * i + n * t;
    return (h.x = l + o), (h.y = d + A), h;
  };
function Nl(i, t) {
  const e =
      t === -1.5707963267948966
        ? -0.551915024494
        : 1.3333333333333333 * Math.tan(t / 4),
    s = t === 1.5707963267948966 ? 0.551915024494 : e,
    n = Math.cos(i),
    r = Math.sin(i),
    o = Math.cos(i + t),
    A = Math.sin(i + t);
  return [
    { x: n - r * s, y: r + n * s },
    { x: o + A * s, y: A - o * s },
    { x: o, y: A },
  ];
}
const mr = (i, t, e, s) => {
    const n = i * s - t * e < 0 ? -1 : 1;
    let r = i * e + t * s;
    return r > 1 && (r = 1), r < -1 && (r = -1), n * Math.acos(r);
  },
  Ol = (i, t, e, s, n, r, o, A, h, l, d, a, c) => {
    const u = Math.pow(n, 2),
      g = Math.pow(r, 2),
      y = Math.pow(d, 2),
      m = Math.pow(a, 2);
    let C = u * g - u * m - g * y;
    C < 0 && (C = 0),
      (C /= u * m + g * y),
      (C = Math.sqrt(C) * (o === A ? -1 : 1));
    const w = ((C * n) / r) * a,
      E = ((C * -r) / n) * d,
      I = l * w - h * E + (i + e) / 2,
      U = h * w + l * E + (t + s) / 2,
      D = (d - w) / n,
      F = (a - E) / r,
      W = (-d - w) / n,
      O = (-a - E) / r,
      L = mr(1, 0, D, F);
    let z = mr(D, F, W, O);
    A === 0 && z > 0 && (z -= ui),
      A === 1 && z < 0 && (z += ui),
      (c.centerX = I),
      (c.centerY = U),
      (c.ang1 = L),
      (c.ang2 = z);
  };
function jl(i, t, e, s, n, r, o, A = 0, h = 0, l = 0) {
  if (r === 0 || o === 0) return;
  const d = Math.sin((A * ui) / 360),
    a = Math.cos((A * ui) / 360),
    c = (a * (t - s)) / 2 + (d * (e - n)) / 2,
    u = (-d * (t - s)) / 2 + (a * (e - n)) / 2;
  if (c === 0 && u === 0) return;
  (r = Math.abs(r)), (o = Math.abs(o));
  const g = Math.pow(c, 2) / Math.pow(r, 2) + Math.pow(u, 2) / Math.pow(o, 2);
  g > 1 && ((r *= Math.sqrt(g)), (o *= Math.sqrt(g))),
    Ol(t, e, s, n, r, o, h, l, d, a, c, u, ms);
  let { ang1: y, ang2: m } = ms;
  const { centerX: C, centerY: w } = ms;
  let E = Math.abs(m) / (ui / 4);
  Math.abs(1 - E) < 1e-7 && (E = 1);
  const I = Math.max(Math.ceil(E), 1);
  m /= I;
  let U = i[i.length - 2],
    D = i[i.length - 1];
  const F = { x: 0, y: 0 };
  for (let W = 0; W < I; W++) {
    const O = Nl(y, m),
      { x: L, y: z } = ys(O[0], r, o, a, d, C, w, F),
      { x: ht, y: st } = ys(O[1], r, o, a, d, C, w, F),
      { x: ft, y: _t } = ys(O[2], r, o, a, d, C, w, F);
    ia(i, U, D, L, z, ht, st, ft, _t), (U = ft), (D = _t), (y += m);
  }
}
function zl(i, t, e) {
  const s = (o, A) => {
      const h = A.x - o.x,
        l = A.y - o.y,
        d = Math.sqrt(h * h + l * l),
        a = h / d,
        c = l / d;
      return { len: d, nx: a, ny: c };
    },
    n = (o, A) => {
      o === 0 ? i.moveTo(A.x, A.y) : i.lineTo(A.x, A.y);
    };
  let r = t[t.length - 1];
  for (let o = 0; o < t.length; o++) {
    const A = t[o % t.length],
      h = A.radius ?? e;
    if (h <= 0) {
      n(o, A), (r = A);
      continue;
    }
    const l = t[(o + 1) % t.length],
      d = s(A, r),
      a = s(A, l);
    if (d.len < 1e-4 || a.len < 1e-4) {
      n(o, A), (r = A);
      continue;
    }
    let c = Math.asin(d.nx * a.ny - d.ny * a.nx),
      u = 1,
      g = !1;
    d.nx * a.nx - d.ny * -a.ny < 0
      ? c < 0
        ? (c = Math.PI + c)
        : ((c = Math.PI - c), (u = -1), (g = !0))
      : c > 0 && ((u = -1), (g = !0));
    const y = c / 2;
    let m,
      C = Math.abs((Math.cos(y) * h) / Math.sin(y));
    C > Math.min(d.len / 2, a.len / 2)
      ? ((C = Math.min(d.len / 2, a.len / 2)),
        (m = Math.abs((C * Math.sin(y)) / Math.cos(y))))
      : (m = h);
    const w = A.x + a.nx * C + -a.ny * m * u,
      E = A.y + a.ny * C + a.nx * m * u,
      I = Math.atan2(d.ny, d.nx) + (Math.PI / 2) * u,
      U = Math.atan2(a.ny, a.nx) - (Math.PI / 2) * u;
    o === 0 && i.moveTo(w + Math.cos(I) * m, E + Math.sin(I) * m),
      i.arc(w, E, m, I, U, g),
      (r = A);
  }
}
function Ll(i, t, e, s) {
  const n = (A, h) => Math.sqrt((A.x - h.x) ** 2 + (A.y - h.y) ** 2),
    r = (A, h, l) => ({ x: A.x + (h.x - A.x) * l, y: A.y + (h.y - A.y) * l }),
    o = t.length;
  for (let A = 0; A < o; A++) {
    const h = t[(A + 1) % o],
      l = h.radius ?? e;
    if (l <= 0) {
      A === 0 ? i.moveTo(h.x, h.y) : i.lineTo(h.x, h.y);
      continue;
    }
    const d = t[A],
      a = t[(A + 2) % o],
      c = n(d, h);
    let u;
    if (c < 1e-4) u = h;
    else {
      const m = Math.min(c / 2, l);
      u = r(h, d, m / c);
    }
    const g = n(a, h);
    let y;
    if (g < 1e-4) y = h;
    else {
      const m = Math.min(g / 2, l);
      y = r(h, a, m / g);
    }
    A === 0 ? i.moveTo(u.x, u.y) : i.lineTo(u.x, u.y),
      i.quadraticCurveTo(h.x, h.y, y.x, y.y, s);
  }
}
const Hl = new Bt();
class Yl {
  constructor(t) {
    (this.shapePrimitives = []),
      (this._currentPoly = null),
      (this._bounds = new Wt()),
      (this._graphicsPath2D = t),
      (this.signed = t.checkForHoles);
  }
  moveTo(t, e) {
    return this.startPoly(t, e), this;
  }
  lineTo(t, e) {
    this._ensurePoly();
    const s = this._currentPoly.points,
      n = s[s.length - 2],
      r = s[s.length - 1];
    return (n !== t || r !== e) && s.push(t, e), this;
  }
  arc(t, e, s, n, r, o) {
    this._ensurePoly(!1);
    const A = this._currentPoly.points;
    return sa(A, t, e, s, n, r, o), this;
  }
  arcTo(t, e, s, n, r) {
    this._ensurePoly();
    const o = this._currentPoly.points;
    return Ul(o, t, e, s, n, r), this;
  }
  arcToSvg(t, e, s, n, r, o, A) {
    const h = this._currentPoly.points;
    return (
      jl(
        h,
        this._currentPoly.lastX,
        this._currentPoly.lastY,
        o,
        A,
        t,
        e,
        s,
        n,
        r,
      ),
      this
    );
  }
  bezierCurveTo(t, e, s, n, r, o, A) {
    this._ensurePoly();
    const h = this._currentPoly;
    return (
      ia(this._currentPoly.points, h.lastX, h.lastY, t, e, s, n, r, o, A), this
    );
  }
  quadraticCurveTo(t, e, s, n, r) {
    this._ensurePoly();
    const o = this._currentPoly;
    return kl(this._currentPoly.points, o.lastX, o.lastY, t, e, s, n, r), this;
  }
  closePath() {
    return this.endPoly(!0), this;
  }
  addPath(t, e) {
    this.endPoly(), e && !e.isIdentity() && ((t = t.clone(!0)), t.transform(e));
    const s = this.shapePrimitives,
      n = s.length;
    for (let r = 0; r < t.instructions.length; r++) {
      const o = t.instructions[r];
      this[o.action](...o.data);
    }
    if (t.checkForHoles && s.length - n > 1) {
      let r = null;
      for (let o = n; o < s.length; o++) {
        const A = s[o];
        if (A.shape.type === "polygon") {
          const h = A.shape,
            l = r == null ? void 0 : r.shape;
          l && l.containsPolygon(h)
            ? (r.holes || (r.holes = []),
              r.holes.push(A),
              s.copyWithin(o, o + 1),
              s.length--,
              o--)
            : (r = A);
        }
      }
    }
    return this;
  }
  finish(t = !1) {
    this.endPoly(t);
  }
  rect(t, e, s, n, r) {
    return this.drawShape(new Bt(t, e, s, n), r), this;
  }
  circle(t, e, s, n) {
    return this.drawShape(new hn(t, e, s), n), this;
  }
  poly(t, e, s) {
    const n = new ci(t);
    return (n.closePath = e), this.drawShape(n, s), this;
  }
  regularPoly(t, e, s, n, r = 0, o) {
    n = Math.max(n | 0, 3);
    const A = (-1 * Math.PI) / 2 + r,
      h = (Math.PI * 2) / n,
      l = [];
    for (let d = 0; d < n; d++) {
      const a = A - d * h;
      l.push(t + s * Math.cos(a), e + s * Math.sin(a));
    }
    return this.poly(l, !0, o), this;
  }
  roundPoly(t, e, s, n, r, o = 0, A) {
    if (((n = Math.max(n | 0, 3)), r <= 0))
      return this.regularPoly(t, e, s, n, o);
    const h = s * Math.sin(Math.PI / n) - 0.001;
    r = Math.min(r, h);
    const l = (-1 * Math.PI) / 2 + o,
      d = (Math.PI * 2) / n,
      a = ((n - 2) * Math.PI) / n / 2;
    for (let c = 0; c < n; c++) {
      const u = c * d + l,
        g = t + s * Math.cos(u),
        y = e + s * Math.sin(u),
        m = u + Math.PI + a,
        C = u - Math.PI - a,
        w = g + r * Math.cos(m),
        E = y + r * Math.sin(m),
        I = g + r * Math.cos(C),
        U = y + r * Math.sin(C);
      c === 0 ? this.moveTo(w, E) : this.lineTo(w, E),
        this.quadraticCurveTo(g, y, I, U, A);
    }
    return this.closePath();
  }
  roundShape(t, e, s = !1, n) {
    return t.length < 3
      ? this
      : (s ? Ll(this, t, e, n) : zl(this, t, e), this.closePath());
  }
  filletRect(t, e, s, n, r) {
    if (r === 0) return this.rect(t, e, s, n);
    const o = Math.min(s, n) / 2,
      A = Math.min(o, Math.max(-o, r)),
      h = t + s,
      l = e + n,
      d = A < 0 ? -A : 0,
      a = Math.abs(A);
    return this.moveTo(t, e + a)
      .arcTo(t + d, e + d, t + a, e, a)
      .lineTo(h - a, e)
      .arcTo(h - d, e + d, h, e + a, a)
      .lineTo(h, l - a)
      .arcTo(h - d, l - d, t + s - a, l, a)
      .lineTo(t + a, l)
      .arcTo(t + d, l - d, t, l - a, a)
      .closePath();
  }
  chamferRect(t, e, s, n, r, o) {
    if (r <= 0) return this.rect(t, e, s, n);
    const A = Math.min(r, Math.min(s, n) / 2),
      h = t + s,
      l = e + n,
      d = [
        t + A,
        e,
        h - A,
        e,
        h,
        e + A,
        h,
        l - A,
        h - A,
        l,
        t + A,
        l,
        t,
        l - A,
        t,
        e + A,
      ];
    for (let a = d.length - 1; a >= 2; a -= 2)
      d[a] === d[a - 2] && d[a - 1] === d[a - 3] && d.splice(a - 1, 2);
    return this.poly(d, !0, o);
  }
  ellipse(t, e, s, n, r) {
    return this.drawShape(new ln(t, e, s, n), r), this;
  }
  roundRect(t, e, s, n, r, o) {
    return this.drawShape(new cn(t, e, s, n, r), o), this;
  }
  drawShape(t, e) {
    return (
      this.endPoly(),
      this.shapePrimitives.push({ shape: t, transform: e }),
      this
    );
  }
  startPoly(t, e) {
    let s = this._currentPoly;
    return (
      s && this.endPoly(),
      (s = new ci()),
      s.points.push(t, e),
      (this._currentPoly = s),
      this
    );
  }
  endPoly(t = !1) {
    const e = this._currentPoly;
    return (
      e &&
        e.points.length > 2 &&
        ((e.closePath = t), this.shapePrimitives.push({ shape: e })),
      (this._currentPoly = null),
      this
    );
  }
  _ensurePoly(t = !0) {
    if (!this._currentPoly && ((this._currentPoly = new ci()), t)) {
      const e = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (e) {
        let s = e.shape.x,
          n = e.shape.y;
        if (e.transform && !e.transform.isIdentity()) {
          const r = e.transform,
            o = s;
          (s = r.a * s + r.c * n + r.tx), (n = r.b * o + r.d * n + r.ty);
        }
        this._currentPoly.points.push(s, n);
      } else this._currentPoly.points.push(0, 0);
    }
  }
  buildPath() {
    const t = this._graphicsPath2D;
    (this.shapePrimitives.length = 0), (this._currentPoly = null);
    for (let e = 0; e < t.instructions.length; e++) {
      const s = t.instructions[e];
      this[s.action](...s.data);
    }
    this.finish();
  }
  get bounds() {
    const t = this._bounds;
    t.clear();
    const e = this.shapePrimitives;
    for (let s = 0; s < e.length; s++) {
      const n = e[s],
        r = n.shape.getBounds(Hl);
      n.transform ? t.addRect(r, n.transform) : t.addRect(r);
    }
    return t;
  }
}
class qe {
  constructor(t, e = !1) {
    (this.instructions = []),
      (this.uid = It("graphicsPath")),
      (this._dirty = !0),
      (this.checkForHoles = e),
      typeof t == "string"
        ? dh(t, this)
        : (this.instructions = (t == null ? void 0 : t.slice()) ?? []);
  }
  get shapePath() {
    return (
      this._shapePath || (this._shapePath = new Yl(this)),
      this._dirty && ((this._dirty = !1), this._shapePath.buildPath()),
      this._shapePath
    );
  }
  addPath(t, e) {
    return (
      (t = t.clone()),
      this.instructions.push({ action: "addPath", data: [t, e] }),
      (this._dirty = !0),
      this
    );
  }
  arc(...t) {
    return (
      this.instructions.push({ action: "arc", data: t }),
      (this._dirty = !0),
      this
    );
  }
  arcTo(...t) {
    return (
      this.instructions.push({ action: "arcTo", data: t }),
      (this._dirty = !0),
      this
    );
  }
  arcToSvg(...t) {
    return (
      this.instructions.push({ action: "arcToSvg", data: t }),
      (this._dirty = !0),
      this
    );
  }
  bezierCurveTo(...t) {
    return (
      this.instructions.push({ action: "bezierCurveTo", data: t }),
      (this._dirty = !0),
      this
    );
  }
  bezierCurveToShort(t, e, s, n, r) {
    const o = this.instructions[this.instructions.length - 1],
      A = this.getLastPoint(Rt.shared);
    let h = 0,
      l = 0;
    if (!o || o.action !== "bezierCurveTo") (h = A.x), (l = A.y);
    else {
      (h = o.data[2]), (l = o.data[3]);
      const d = A.x,
        a = A.y;
      (h = d + (d - h)), (l = a + (a - l));
    }
    return (
      this.instructions.push({
        action: "bezierCurveTo",
        data: [h, l, t, e, s, n, r],
      }),
      (this._dirty = !0),
      this
    );
  }
  closePath() {
    return (
      this.instructions.push({ action: "closePath", data: [] }),
      (this._dirty = !0),
      this
    );
  }
  ellipse(...t) {
    return (
      this.instructions.push({ action: "ellipse", data: t }),
      (this._dirty = !0),
      this
    );
  }
  lineTo(...t) {
    return (
      this.instructions.push({ action: "lineTo", data: t }),
      (this._dirty = !0),
      this
    );
  }
  moveTo(...t) {
    return this.instructions.push({ action: "moveTo", data: t }), this;
  }
  quadraticCurveTo(...t) {
    return (
      this.instructions.push({ action: "quadraticCurveTo", data: t }),
      (this._dirty = !0),
      this
    );
  }
  quadraticCurveToShort(t, e, s) {
    const n = this.instructions[this.instructions.length - 1],
      r = this.getLastPoint(Rt.shared);
    let o = 0,
      A = 0;
    if (!n || n.action !== "quadraticCurveTo") (o = r.x), (A = r.y);
    else {
      (o = n.data[0]), (A = n.data[1]);
      const h = r.x,
        l = r.y;
      (o = h + (h - o)), (A = l + (l - A));
    }
    return (
      this.instructions.push({
        action: "quadraticCurveTo",
        data: [o, A, t, e, s],
      }),
      (this._dirty = !0),
      this
    );
  }
  rect(t, e, s, n, r) {
    return (
      this.instructions.push({ action: "rect", data: [t, e, s, n, r] }),
      (this._dirty = !0),
      this
    );
  }
  circle(t, e, s, n) {
    return (
      this.instructions.push({ action: "circle", data: [t, e, s, n] }),
      (this._dirty = !0),
      this
    );
  }
  roundRect(...t) {
    return (
      this.instructions.push({ action: "roundRect", data: t }),
      (this._dirty = !0),
      this
    );
  }
  poly(...t) {
    return (
      this.instructions.push({ action: "poly", data: t }),
      (this._dirty = !0),
      this
    );
  }
  regularPoly(...t) {
    return (
      this.instructions.push({ action: "regularPoly", data: t }),
      (this._dirty = !0),
      this
    );
  }
  roundPoly(...t) {
    return (
      this.instructions.push({ action: "roundPoly", data: t }),
      (this._dirty = !0),
      this
    );
  }
  roundShape(...t) {
    return (
      this.instructions.push({ action: "roundShape", data: t }),
      (this._dirty = !0),
      this
    );
  }
  filletRect(...t) {
    return (
      this.instructions.push({ action: "filletRect", data: t }),
      (this._dirty = !0),
      this
    );
  }
  chamferRect(...t) {
    return (
      this.instructions.push({ action: "chamferRect", data: t }),
      (this._dirty = !0),
      this
    );
  }
  star(t, e, s, n, r, o, A) {
    r || (r = n / 2);
    const h = (-1 * Math.PI) / 2 + o,
      l = s * 2,
      d = (Math.PI * 2) / l,
      a = [];
    for (let c = 0; c < l; c++) {
      const u = c % 2 ? r : n,
        g = c * d + h;
      a.push(t + u * Math.cos(g), e + u * Math.sin(g));
    }
    return this.poly(a, !0, A), this;
  }
  clone(t = !1) {
    const e = new qe();
    if (((e.checkForHoles = this.checkForHoles), !t))
      e.instructions = this.instructions.slice();
    else
      for (let s = 0; s < this.instructions.length; s++) {
        const n = this.instructions[s];
        e.instructions.push({ action: n.action, data: n.data.slice() });
      }
    return e;
  }
  clear() {
    return (this.instructions.length = 0), (this._dirty = !0), this;
  }
  transform(t) {
    if (t.isIdentity()) return this;
    const e = t.a,
      s = t.b,
      n = t.c,
      r = t.d,
      o = t.tx,
      A = t.ty;
    let h = 0,
      l = 0,
      d = 0,
      a = 0,
      c = 0,
      u = 0,
      g = 0,
      y = 0;
    for (let m = 0; m < this.instructions.length; m++) {
      const C = this.instructions[m],
        w = C.data;
      switch (C.action) {
        case "moveTo":
        case "lineTo":
          (h = w[0]),
            (l = w[1]),
            (w[0] = e * h + n * l + o),
            (w[1] = s * h + r * l + A);
          break;
        case "bezierCurveTo":
          (d = w[0]),
            (a = w[1]),
            (c = w[2]),
            (u = w[3]),
            (h = w[4]),
            (l = w[5]),
            (w[0] = e * d + n * a + o),
            (w[1] = s * d + r * a + A),
            (w[2] = e * c + n * u + o),
            (w[3] = s * c + r * u + A),
            (w[4] = e * h + n * l + o),
            (w[5] = s * h + r * l + A);
          break;
        case "quadraticCurveTo":
          (d = w[0]),
            (a = w[1]),
            (h = w[2]),
            (l = w[3]),
            (w[0] = e * d + n * a + o),
            (w[1] = s * d + r * a + A),
            (w[2] = e * h + n * l + o),
            (w[3] = s * h + r * l + A);
          break;
        case "arcToSvg":
          (h = w[5]),
            (l = w[6]),
            (g = w[0]),
            (y = w[1]),
            (w[0] = e * g + n * y),
            (w[1] = s * g + r * y),
            (w[5] = e * h + n * l + o),
            (w[6] = s * h + r * l + A);
          break;
        case "circle":
          w[4] = si(w[3], t);
          break;
        case "rect":
          w[4] = si(w[4], t);
          break;
        case "ellipse":
          w[8] = si(w[8], t);
          break;
        case "roundRect":
          w[5] = si(w[5], t);
          break;
        case "addPath":
          w[0].transform(t);
          break;
        case "poly":
          w[2] = si(w[2], t);
          break;
        default:
          Ct("unknown transform action", C.action);
          break;
      }
    }
    return (this._dirty = !0), this;
  }
  get bounds() {
    return this.shapePath.bounds;
  }
  getLastPoint(t) {
    let e = this.instructions.length - 1,
      s = this.instructions[e];
    if (!s) return (t.x = 0), (t.y = 0), t;
    for (; s.action === "closePath"; ) {
      if ((e--, e < 0)) return (t.x = 0), (t.y = 0), t;
      s = this.instructions[e];
    }
    switch (s.action) {
      case "moveTo":
      case "lineTo":
        (t.x = s.data[0]), (t.y = s.data[1]);
        break;
      case "quadraticCurveTo":
        (t.x = s.data[2]), (t.y = s.data[3]);
        break;
      case "bezierCurveTo":
        (t.x = s.data[4]), (t.y = s.data[5]);
        break;
      case "arc":
      case "arcToSvg":
        (t.x = s.data[5]), (t.y = s.data[6]);
        break;
      case "addPath":
        s.data[0].getLastPoint(t);
        break;
    }
    return t;
  }
}
function si(i, t) {
  return i ? i.prepend(t) : t.clone();
}
function wt(i, t, e) {
  const s = i.getAttribute(t);
  return s ? Number(s) : e;
}
function Xl(i, t) {
  const e = i.querySelectorAll("defs");
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (let r = 0; r < n.children.length; r++) {
      const o = n.children[r];
      switch (o.nodeName.toLowerCase()) {
        case "lineargradient":
          t.defs[o.id] = Vl(o);
          break;
        case "radialgradient":
          t.defs[o.id] = _l();
          break;
      }
    }
  }
}
function Vl(i) {
  const t = wt(i, "x1", 0),
    e = wt(i, "y1", 0),
    s = wt(i, "x2", 1),
    n = wt(i, "y2", 0),
    r = i.getAttribute("gradientUnits") || "objectBoundingBox",
    o = new me(t, e, s, n, r === "objectBoundingBox" ? "local" : "global");
  for (let A = 0; A < i.children.length; A++) {
    const h = i.children[A],
      l = wt(h, "offset", 0),
      d = Mt.shared.setValue(h.getAttribute("stop-color")).toNumber();
    o.addColorStop(l, d);
  }
  return o;
}
function _l(i) {
  return (
    Ct("[SVG Parser] Radial gradients are not yet supported"),
    new me(0, 0, 1, 0)
  );
}
function yr(i) {
  const t = i.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);
  return t ? t[1] : "";
}
const Cr = {
  fill: { type: "paint", default: 0 },
  "fill-opacity": { type: "number", default: 1 },
  stroke: { type: "paint", default: 0 },
  "stroke-width": { type: "number", default: 1 },
  "stroke-opacity": { type: "number", default: 1 },
  "stroke-linecap": { type: "string", default: "butt" },
  "stroke-linejoin": { type: "string", default: "miter" },
  "stroke-miterlimit": { type: "number", default: 10 },
  "stroke-dasharray": { type: "string", default: "none" },
  "stroke-dashoffset": { type: "number", default: 0 },
  opacity: { type: "number", default: 1 },
};
function na(i, t) {
  const e = i.getAttribute("style"),
    s = {},
    n = {},
    r = { strokeStyle: s, fillStyle: n, useFill: !1, useStroke: !1 };
  for (const o in Cr) {
    const A = i.getAttribute(o);
    A && xr(t, r, o, A.trim());
  }
  if (e) {
    const o = e.split(";");
    for (let A = 0; A < o.length; A++) {
      const h = o[A].trim(),
        [l, d] = h.split(":");
      Cr[l] && xr(t, r, l, d.trim());
    }
  }
  return {
    strokeStyle: r.useStroke ? s : null,
    fillStyle: r.useFill ? n : null,
    useFill: r.useFill,
    useStroke: r.useStroke,
  };
}
function xr(i, t, e, s) {
  switch (e) {
    case "stroke":
      if (s !== "none") {
        if (s.startsWith("url(")) {
          const n = yr(s);
          t.strokeStyle.fill = i.defs[n];
        } else t.strokeStyle.color = Mt.shared.setValue(s).toNumber();
        t.useStroke = !0;
      }
      break;
    case "stroke-width":
      t.strokeStyle.width = Number(s);
      break;
    case "fill":
      if (s !== "none") {
        if (s.startsWith("url(")) {
          const n = yr(s);
          t.fillStyle.fill = i.defs[n];
        } else t.fillStyle.color = Mt.shared.setValue(s).toNumber();
        t.useFill = !0;
      }
      break;
    case "fill-opacity":
      t.fillStyle.alpha = Number(s);
      break;
    case "stroke-opacity":
      t.strokeStyle.alpha = Number(s);
      break;
    case "opacity":
      (t.fillStyle.alpha = Number(s)), (t.strokeStyle.alpha = Number(s));
      break;
  }
}
function ql(i, t) {
  if (typeof i == "string") {
    const o = document.createElement("div");
    (o.innerHTML = i.trim()), (i = o.querySelector("svg"));
  }
  const e = { context: t, defs: {}, path: new qe() };
  Xl(i, e);
  const s = i.children,
    { fillStyle: n, strokeStyle: r } = na(i, e);
  for (let o = 0; o < s.length; o++) {
    const A = s[o];
    A.nodeName.toLowerCase() !== "defs" && ra(A, e, n, r);
  }
  return t;
}
function ra(i, t, e, s) {
  const n = i.children,
    { fillStyle: r, strokeStyle: o } = na(i, t);
  r && e ? (e = { ...e, ...r }) : r && (e = r),
    o && s ? (s = { ...s, ...o }) : o && (s = o);
  const A = !e && !s;
  A && (e = { color: 0 });
  let h, l, d, a, c, u, g, y, m, C, w, E, I, U, D, F, W;
  switch (i.nodeName.toLowerCase()) {
    case "path":
      (U = i.getAttribute("d")),
        i.getAttribute("fill-rule") === "evenodd" &&
          Ct(
            "SVG Evenodd fill rule not supported, your svg may render incorrectly",
          ),
        (D = new qe(U, !0)),
        t.context.path(D),
        e && t.context.fill(e),
        s && t.context.stroke(s);
      break;
    case "circle":
      (g = wt(i, "cx", 0)),
        (y = wt(i, "cy", 0)),
        (m = wt(i, "r", 0)),
        t.context.ellipse(g, y, m, m),
        e && t.context.fill(e),
        s && t.context.stroke(s);
      break;
    case "rect":
      (h = wt(i, "x", 0)),
        (l = wt(i, "y", 0)),
        (F = wt(i, "width", 0)),
        (W = wt(i, "height", 0)),
        (C = wt(i, "rx", 0)),
        (w = wt(i, "ry", 0)),
        C || w
          ? t.context.roundRect(h, l, F, W, C || w)
          : t.context.rect(h, l, F, W),
        e && t.context.fill(e),
        s && t.context.stroke(s);
      break;
    case "ellipse":
      (g = wt(i, "cx", 0)),
        (y = wt(i, "cy", 0)),
        (C = wt(i, "rx", 0)),
        (w = wt(i, "ry", 0)),
        t.context.beginPath(),
        t.context.ellipse(g, y, C, w),
        e && t.context.fill(e),
        s && t.context.stroke(s);
      break;
    case "line":
      (d = wt(i, "x1", 0)),
        (a = wt(i, "y1", 0)),
        (c = wt(i, "x2", 0)),
        (u = wt(i, "y2", 0)),
        t.context.beginPath(),
        t.context.moveTo(d, a),
        t.context.lineTo(c, u),
        s && t.context.stroke(s);
      break;
    case "polygon":
      (I = i.getAttribute("points")),
        (E = I.match(/\d+/g).map((O) => parseInt(O, 10))),
        t.context.poly(E, !0),
        e && t.context.fill(e),
        s && t.context.stroke(s);
      break;
    case "polyline":
      (I = i.getAttribute("points")),
        (E = I.match(/\d+/g).map((O) => parseInt(O, 10))),
        t.context.poly(E, !1),
        s && t.context.stroke(s);
      break;
    case "g":
    case "svg":
      break;
    default: {
      Ct(`[SVG parser] <${i.nodeName}> elements unsupported`);
      break;
    }
  }
  A && (e = null);
  for (let O = 0; O < n.length; O++) ra(n[O], t, e, s);
}
function Zl(i) {
  return Mt.isColorLike(i);
}
function wr(i) {
  return i instanceof Vi;
}
function br(i) {
  return i instanceof me;
}
function Wl(i) {
  return i instanceof $;
}
function Kl(i, t, e) {
  const s = Mt.shared.setValue(t ?? 0);
  return (
    (i.color = s.toNumber()),
    (i.alpha = s.alpha === 1 ? e.alpha : s.alpha),
    (i.texture = $.WHITE),
    { ...e, ...i }
  );
}
function Jl(i, t, e) {
  return (i.texture = t), { ...e, ...i };
}
function Er(i, t, e) {
  return (
    (i.fill = t),
    (i.color = 16777215),
    (i.texture = t.texture),
    (i.matrix = t.transform),
    { ...e, ...i }
  );
}
function vr(i, t, e) {
  return (
    t.buildGradient(),
    (i.fill = t),
    (i.color = 16777215),
    (i.texture = t.texture),
    (i.matrix = t.transform),
    (i.textureSpace = t.textureSpace),
    { ...e, ...i }
  );
}
function $l(i, t) {
  const e = { ...t, ...i },
    s = Mt.shared.setValue(e.color);
  return (e.alpha *= s.alpha), (e.color = s.toNumber()), e;
}
function Ge(i, t) {
  if (i == null) return null;
  const e = {},
    s = i;
  return Zl(i)
    ? Kl(e, i, t)
    : Wl(i)
      ? Jl(e, i, t)
      : wr(i)
        ? Er(e, i, t)
        : br(i)
          ? vr(e, i, t)
          : s.fill && wr(s.fill)
            ? Er(s, s.fill, t)
            : s.fill && br(s.fill)
              ? vr(s, s.fill, t)
              : $l(s, t);
}
function Ni(i, t) {
  const {
      width: e,
      alignment: s,
      miterLimit: n,
      cap: r,
      join: o,
      pixelLine: A,
      ...h
    } = t,
    l = Ge(i, h);
  return l
    ? {
        width: e,
        alignment: s,
        miterLimit: n,
        cap: r,
        join: o,
        pixelLine: A,
        ...l,
      }
    : null;
}
const tc = new Rt(),
  Br = new tt(),
  dn = class ne extends Jt {
    constructor() {
      super(...arguments),
        (this.uid = It("graphicsContext")),
        (this.dirty = !0),
        (this.batchMode = "auto"),
        (this.instructions = []),
        (this._activePath = new qe()),
        (this._transform = new tt()),
        (this._fillStyle = { ...ne.defaultFillStyle }),
        (this._strokeStyle = { ...ne.defaultStrokeStyle }),
        (this._stateStack = []),
        (this._tick = 0),
        (this._bounds = new Wt()),
        (this._boundsDirty = !0);
    }
    clone() {
      const t = new ne();
      return (
        (t.batchMode = this.batchMode),
        (t.instructions = this.instructions.slice()),
        (t._activePath = this._activePath.clone()),
        (t._transform = this._transform.clone()),
        (t._fillStyle = { ...this._fillStyle }),
        (t._strokeStyle = { ...this._strokeStyle }),
        (t._stateStack = this._stateStack.slice()),
        (t._bounds = this._bounds.clone()),
        (t._boundsDirty = !0),
        t
      );
    }
    get fillStyle() {
      return this._fillStyle;
    }
    set fillStyle(t) {
      this._fillStyle = Ge(t, ne.defaultFillStyle);
    }
    get strokeStyle() {
      return this._strokeStyle;
    }
    set strokeStyle(t) {
      this._strokeStyle = Ni(t, ne.defaultStrokeStyle);
    }
    setFillStyle(t) {
      return (this._fillStyle = Ge(t, ne.defaultFillStyle)), this;
    }
    setStrokeStyle(t) {
      return (this._strokeStyle = Ge(t, ne.defaultStrokeStyle)), this;
    }
    texture(t, e, s, n, r, o) {
      return (
        this.instructions.push({
          action: "texture",
          data: {
            image: t,
            dx: s || 0,
            dy: n || 0,
            dw: r || t.frame.width,
            dh: o || t.frame.height,
            transform: this._transform.clone(),
            alpha: this._fillStyle.alpha,
            style: e ? Mt.shared.setValue(e).toNumber() : 16777215,
          },
        }),
        this.onUpdate(),
        this
      );
    }
    beginPath() {
      return (this._activePath = new qe()), this;
    }
    fill(t, e) {
      let s;
      const n = this.instructions[this.instructions.length - 1];
      return (
        this._tick === 0 && n && n.action === "stroke"
          ? (s = n.data.path)
          : (s = this._activePath.clone()),
        s
          ? (t != null &&
              (e !== void 0 &&
                typeof t == "number" &&
                (it(
                  dt,
                  "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead",
                ),
                (t = { color: t, alpha: e })),
              (this._fillStyle = Ge(t, ne.defaultFillStyle))),
            this.instructions.push({
              action: "fill",
              data: { style: this.fillStyle, path: s },
            }),
            this.onUpdate(),
            this._initNextPathLocation(),
            (this._tick = 0),
            this)
          : this
      );
    }
    _initNextPathLocation() {
      const { x: t, y: e } = this._activePath.getLastPoint(Rt.shared);
      this._activePath.clear(), this._activePath.moveTo(t, e);
    }
    stroke(t) {
      let e;
      const s = this.instructions[this.instructions.length - 1];
      return (
        this._tick === 0 && s && s.action === "fill"
          ? (e = s.data.path)
          : (e = this._activePath.clone()),
        e
          ? (t != null && (this._strokeStyle = Ni(t, ne.defaultStrokeStyle)),
            this.instructions.push({
              action: "stroke",
              data: { style: this.strokeStyle, path: e },
            }),
            this.onUpdate(),
            this._initNextPathLocation(),
            (this._tick = 0),
            this)
          : this
      );
    }
    cut() {
      for (let t = 0; t < 2; t++) {
        const e = this.instructions[this.instructions.length - 1 - t],
          s = this._activePath.clone();
        if (e && (e.action === "stroke" || e.action === "fill"))
          if (e.data.hole) e.data.hole.addPath(s);
          else {
            e.data.hole = s;
            break;
          }
      }
      return this._initNextPathLocation(), this;
    }
    arc(t, e, s, n, r, o) {
      this._tick++;
      const A = this._transform;
      return (
        this._activePath.arc(
          A.a * t + A.c * e + A.tx,
          A.b * t + A.d * e + A.ty,
          s,
          n,
          r,
          o,
        ),
        this
      );
    }
    arcTo(t, e, s, n, r) {
      this._tick++;
      const o = this._transform;
      return (
        this._activePath.arcTo(
          o.a * t + o.c * e + o.tx,
          o.b * t + o.d * e + o.ty,
          o.a * s + o.c * n + o.tx,
          o.b * s + o.d * n + o.ty,
          r,
        ),
        this
      );
    }
    arcToSvg(t, e, s, n, r, o, A) {
      this._tick++;
      const h = this._transform;
      return (
        this._activePath.arcToSvg(
          t,
          e,
          s,
          n,
          r,
          h.a * o + h.c * A + h.tx,
          h.b * o + h.d * A + h.ty,
        ),
        this
      );
    }
    bezierCurveTo(t, e, s, n, r, o, A) {
      this._tick++;
      const h = this._transform;
      return (
        this._activePath.bezierCurveTo(
          h.a * t + h.c * e + h.tx,
          h.b * t + h.d * e + h.ty,
          h.a * s + h.c * n + h.tx,
          h.b * s + h.d * n + h.ty,
          h.a * r + h.c * o + h.tx,
          h.b * r + h.d * o + h.ty,
          A,
        ),
        this
      );
    }
    closePath() {
      var t;
      return (
        this._tick++, (t = this._activePath) == null || t.closePath(), this
      );
    }
    ellipse(t, e, s, n) {
      return (
        this._tick++,
        this._activePath.ellipse(t, e, s, n, this._transform.clone()),
        this
      );
    }
    circle(t, e, s) {
      return (
        this._tick++,
        this._activePath.circle(t, e, s, this._transform.clone()),
        this
      );
    }
    path(t) {
      return (
        this._tick++, this._activePath.addPath(t, this._transform.clone()), this
      );
    }
    lineTo(t, e) {
      this._tick++;
      const s = this._transform;
      return (
        this._activePath.lineTo(
          s.a * t + s.c * e + s.tx,
          s.b * t + s.d * e + s.ty,
        ),
        this
      );
    }
    moveTo(t, e) {
      this._tick++;
      const s = this._transform,
        n = this._activePath.instructions,
        r = s.a * t + s.c * e + s.tx,
        o = s.b * t + s.d * e + s.ty;
      return n.length === 1 && n[0].action === "moveTo"
        ? ((n[0].data[0] = r), (n[0].data[1] = o), this)
        : (this._activePath.moveTo(r, o), this);
    }
    quadraticCurveTo(t, e, s, n, r) {
      this._tick++;
      const o = this._transform;
      return (
        this._activePath.quadraticCurveTo(
          o.a * t + o.c * e + o.tx,
          o.b * t + o.d * e + o.ty,
          o.a * s + o.c * n + o.tx,
          o.b * s + o.d * n + o.ty,
          r,
        ),
        this
      );
    }
    rect(t, e, s, n) {
      return (
        this._tick++,
        this._activePath.rect(t, e, s, n, this._transform.clone()),
        this
      );
    }
    roundRect(t, e, s, n, r) {
      return (
        this._tick++,
        this._activePath.roundRect(t, e, s, n, r, this._transform.clone()),
        this
      );
    }
    poly(t, e) {
      return (
        this._tick++, this._activePath.poly(t, e, this._transform.clone()), this
      );
    }
    regularPoly(t, e, s, n, r = 0, o) {
      return this._tick++, this._activePath.regularPoly(t, e, s, n, r, o), this;
    }
    roundPoly(t, e, s, n, r, o) {
      return this._tick++, this._activePath.roundPoly(t, e, s, n, r, o), this;
    }
    roundShape(t, e, s, n) {
      return this._tick++, this._activePath.roundShape(t, e, s, n), this;
    }
    filletRect(t, e, s, n, r) {
      return this._tick++, this._activePath.filletRect(t, e, s, n, r), this;
    }
    chamferRect(t, e, s, n, r, o) {
      return this._tick++, this._activePath.chamferRect(t, e, s, n, r, o), this;
    }
    star(t, e, s, n, r = 0, o = 0) {
      return (
        this._tick++,
        this._activePath.star(t, e, s, n, r, o, this._transform.clone()),
        this
      );
    }
    svg(t) {
      return this._tick++, ql(t, this), this;
    }
    restore() {
      const t = this._stateStack.pop();
      return (
        t &&
          ((this._transform = t.transform),
          (this._fillStyle = t.fillStyle),
          (this._strokeStyle = t.strokeStyle)),
        this
      );
    }
    save() {
      return (
        this._stateStack.push({
          transform: this._transform.clone(),
          fillStyle: { ...this._fillStyle },
          strokeStyle: { ...this._strokeStyle },
        }),
        this
      );
    }
    getTransform() {
      return this._transform;
    }
    resetTransform() {
      return this._transform.identity(), this;
    }
    rotate(t) {
      return this._transform.rotate(t), this;
    }
    scale(t, e = t) {
      return this._transform.scale(t, e), this;
    }
    setTransform(t, e, s, n, r, o) {
      return t instanceof tt
        ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty), this)
        : (this._transform.set(t, e, s, n, r, o), this);
    }
    transform(t, e, s, n, r, o) {
      return t instanceof tt
        ? (this._transform.append(t), this)
        : (Br.set(t, e, s, n, r, o), this._transform.append(Br), this);
    }
    translate(t, e = t) {
      return this._transform.translate(t, e), this;
    }
    clear() {
      return (
        this._activePath.clear(),
        (this.instructions.length = 0),
        this.resetTransform(),
        this.onUpdate(),
        this
      );
    }
    onUpdate() {
      this.dirty ||
        (this.emit("update", this, 16),
        (this.dirty = !0),
        (this._boundsDirty = !0));
    }
    get bounds() {
      if (!this._boundsDirty) return this._bounds;
      const t = this._bounds;
      t.clear();
      for (let e = 0; e < this.instructions.length; e++) {
        const s = this.instructions[e],
          n = s.action;
        if (n === "fill") {
          const r = s.data;
          t.addBounds(r.path.bounds);
        } else if (n === "texture") {
          const r = s.data;
          t.addFrame(r.dx, r.dy, r.dx + r.dw, r.dy + r.dh, r.transform);
        }
        if (n === "stroke") {
          const r = s.data,
            o = r.style.alignment,
            A = r.style.width * (1 - o),
            h = r.path.bounds;
          t.addFrame(h.minX - A, h.minY - A, h.maxX + A, h.maxY + A);
        }
      }
      return t;
    }
    containsPoint(t) {
      var n;
      if (!this.bounds.containsPoint(t.x, t.y)) return !1;
      const e = this.instructions;
      let s = !1;
      for (let r = 0; r < e.length; r++) {
        const o = e[r],
          A = o.data,
          h = A.path;
        if (!o.action || !h) continue;
        const l = A.style,
          d = h.shapePath.shapePrimitives;
        for (let a = 0; a < d.length; a++) {
          const c = d[a].shape;
          if (!l || !c) continue;
          const u = d[a].transform,
            g = u ? u.applyInverse(t, tc) : t;
          if (o.action === "fill") s = c.contains(g.x, g.y);
          else {
            const m = l;
            s = c.strokeContains(g.x, g.y, m.width, m.alignment);
          }
          const y = A.hole;
          if (y) {
            const m = (n = y.shapePath) == null ? void 0 : n.shapePrimitives;
            if (m)
              for (let C = 0; C < m.length; C++)
                m[C].shape.contains(g.x, g.y) && (s = !1);
          }
          if (s) return !0;
        }
      }
      return s;
    }
    destroy(t = !1) {
      if (
        ((this._stateStack.length = 0),
        (this._transform = null),
        this.emit("destroy", this),
        this.removeAllListeners(),
        typeof t == "boolean" ? t : t == null ? void 0 : t.texture)
      ) {
        const s =
          typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
        this._fillStyle.texture && this._fillStyle.texture.destroy(s),
          this._strokeStyle.texture && this._strokeStyle.texture.destroy(s);
      }
      (this._fillStyle = null),
        (this._strokeStyle = null),
        (this.instructions = null),
        (this._activePath = null),
        (this._bounds = null),
        (this._stateStack = null),
        (this.customShader = null),
        (this._transform = null);
    }
  };
dn.defaultFillStyle = {
  color: 16777215,
  alpha: 1,
  texture: $.WHITE,
  matrix: null,
  fill: null,
  textureSpace: "local",
};
dn.defaultStrokeStyle = {
  width: 1,
  color: 16777215,
  alpha: 1,
  alignment: 0.5,
  miterLimit: 10,
  cap: "butt",
  join: "miter",
  texture: $.WHITE,
  matrix: null,
  fill: null,
  textureSpace: "local",
  pixelLine: !1,
};
let Ht = dn;
const Ir = [
  "align",
  "breakWords",
  "cssOverrides",
  "fontVariant",
  "fontWeight",
  "leading",
  "letterSpacing",
  "lineHeight",
  "padding",
  "textBaseline",
  "trim",
  "whiteSpace",
  "wordWrap",
  "wordWrapWidth",
  "fontFamily",
  "fontStyle",
  "fontSize",
];
function ec(i) {
  const t = [];
  let e = 0;
  for (let s = 0; s < Ir.length; s++) {
    const n = `_${Ir[s]}`;
    t[e++] = i[n];
  }
  return (
    (e = oa(i._fill, t, e)),
    (e = ic(i._stroke, t, e)),
    (e = sc(i.dropShadow, t, e)),
    t.join("-")
  );
}
function oa(i, t, e) {
  var s;
  return (
    i &&
      ((t[e++] = i.color),
      (t[e++] = i.alpha),
      (t[e++] = (s = i.fill) == null ? void 0 : s.styleKey)),
    e
  );
}
function ic(i, t, e) {
  return (
    i &&
      ((e = oa(i, t, e)),
      (t[e++] = i.width),
      (t[e++] = i.alignment),
      (t[e++] = i.cap),
      (t[e++] = i.join),
      (t[e++] = i.miterLimit)),
    e
  );
}
function sc(i, t, e) {
  return (
    i &&
      ((t[e++] = i.alpha),
      (t[e++] = i.angle),
      (t[e++] = i.blur),
      (t[e++] = i.distance),
      (t[e++] = Mt.shared.setValue(i.color).toNumber())),
    e
  );
}
const fn = class He extends Jt {
  constructor(t = {}) {
    super(), nc(t);
    const e = { ...He.defaultTextStyle, ...t };
    for (const s in e) {
      const n = s;
      this[n] = e[s];
    }
    this.update();
  }
  get align() {
    return this._align;
  }
  set align(t) {
    (this._align = t), this.update();
  }
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(t) {
    (this._breakWords = t), this.update();
  }
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(t) {
    t !== null && typeof t == "object"
      ? (this._dropShadow = this._createProxy({
          ...He.defaultDropShadow,
          ...t,
        }))
      : (this._dropShadow = t
          ? this._createProxy({ ...He.defaultDropShadow })
          : null),
      this.update();
  }
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(t) {
    (this._fontFamily = t), this.update();
  }
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(t) {
    typeof t == "string"
      ? (this._fontSize = parseInt(t, 10))
      : (this._fontSize = t),
      this.update();
  }
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(t) {
    (this._fontStyle = t.toLowerCase()), this.update();
  }
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(t) {
    (this._fontVariant = t), this.update();
  }
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(t) {
    (this._fontWeight = t), this.update();
  }
  get leading() {
    return this._leading;
  }
  set leading(t) {
    (this._leading = t), this.update();
  }
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(t) {
    (this._letterSpacing = t), this.update();
  }
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(t) {
    (this._lineHeight = t), this.update();
  }
  get padding() {
    return this._padding;
  }
  set padding(t) {
    (this._padding = t), this.update();
  }
  get trim() {
    return this._trim;
  }
  set trim(t) {
    (this._trim = t), this.update();
  }
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(t) {
    (this._textBaseline = t), this.update();
  }
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(t) {
    (this._whiteSpace = t), this.update();
  }
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(t) {
    (this._wordWrap = t), this.update();
  }
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(t) {
    (this._wordWrapWidth = t), this.update();
  }
  get fill() {
    return this._originalFill;
  }
  set fill(t) {
    t !== this._originalFill &&
      ((this._originalFill = t),
      this._isFillStyle(t) &&
        (this._originalFill = this._createProxy(
          { ...Ht.defaultFillStyle, ...t },
          () => {
            this._fill = Ge({ ...this._originalFill }, Ht.defaultFillStyle);
          },
        )),
      (this._fill = Ge(t === 0 ? "black" : t, Ht.defaultFillStyle)),
      this.update());
  }
  get stroke() {
    return this._originalStroke;
  }
  set stroke(t) {
    t !== this._originalStroke &&
      ((this._originalStroke = t),
      this._isFillStyle(t) &&
        (this._originalStroke = this._createProxy(
          { ...Ht.defaultStrokeStyle, ...t },
          () => {
            this._stroke = Ni(
              { ...this._originalStroke },
              Ht.defaultStrokeStyle,
            );
          },
        )),
      (this._stroke = Ni(t, Ht.defaultStrokeStyle)),
      this.update());
  }
  _generateKey() {
    return (this._styleKey = ec(this)), this._styleKey;
  }
  update() {
    (this._styleKey = null), this.emit("update", this);
  }
  reset() {
    const t = He.defaultTextStyle;
    for (const e in t) this[e] = t[e];
  }
  get styleKey() {
    return this._styleKey || this._generateKey();
  }
  clone() {
    return new He({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this._dropShadow ? { ...this._dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      leading: this.leading,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      textBaseline: this.textBaseline,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
    });
  }
  destroy(t = !1) {
    var s, n, r, o;
    if (
      (this.removeAllListeners(),
      typeof t == "boolean" ? t : t == null ? void 0 : t.texture)
    ) {
      const A =
        typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      (s = this._fill) != null && s.texture && this._fill.texture.destroy(A),
        (n = this._originalFill) != null &&
          n.texture &&
          this._originalFill.texture.destroy(A),
        (r = this._stroke) != null &&
          r.texture &&
          this._stroke.texture.destroy(A),
        (o = this._originalStroke) != null &&
          o.texture &&
          this._originalStroke.texture.destroy(A);
    }
    (this._fill = null),
      (this._stroke = null),
      (this.dropShadow = null),
      (this._originalStroke = null),
      (this._originalFill = null);
  }
  _createProxy(t, e) {
    return new Proxy(t, {
      set: (s, n, r) => ((s[n] = r), e == null || e(n, r), this.update(), !0),
    });
  }
  _isFillStyle(t) {
    return (
      (t ?? null) !== null &&
      !(Mt.isColorLike(t) || t instanceof me || t instanceof Vi)
    );
  }
};
fn.defaultDropShadow = {
  alpha: 1,
  angle: Math.PI / 6,
  blur: 0,
  color: "black",
  distance: 5,
};
fn.defaultTextStyle = {
  align: "left",
  breakWords: !1,
  dropShadow: null,
  fill: "black",
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  padding: 0,
  stroke: null,
  textBaseline: "alphabetic",
  trim: !1,
  whiteSpace: "pre",
  wordWrap: !1,
  wordWrapWidth: 100,
};
let Kt = fn;
function nc(i) {
  const t = i;
  if (typeof t.dropShadow == "boolean" && t.dropShadow) {
    const e = Kt.defaultDropShadow;
    i.dropShadow = {
      alpha: t.dropShadowAlpha ?? e.alpha,
      angle: t.dropShadowAngle ?? e.angle,
      blur: t.dropShadowBlur ?? e.blur,
      color: t.dropShadowColor ?? e.color,
      distance: t.dropShadowDistance ?? e.distance,
    };
  }
  if (t.strokeThickness !== void 0) {
    it(dt, "strokeThickness is now a part of stroke");
    const e = t.stroke;
    let s = {};
    if (Mt.isColorLike(e)) s.color = e;
    else if (e instanceof me || e instanceof Vi) s.fill = e;
    else if (
      Object.hasOwnProperty.call(e, "color") ||
      Object.hasOwnProperty.call(e, "fill")
    )
      s = e;
    else throw new Error("Invalid stroke value.");
    i.stroke = { ...s, width: t.strokeThickness };
  }
  if (Array.isArray(t.fillGradientStops)) {
    it(dt, "gradient fill is now a fill pattern: `new FillGradient(...)`");
    let e;
    i.fontSize == null
      ? (i.fontSize = Kt.defaultTextStyle.fontSize)
      : typeof i.fontSize == "string"
        ? (e = parseInt(i.fontSize, 10))
        : (e = i.fontSize);
    const s = new me({
        start: { x: 0, y: 0 },
        end: { x: 0, y: (e || 0) * 1.7 },
      }),
      n = t.fillGradientStops.map((r) => Mt.shared.setValue(r).toNumber());
    n.forEach((r, o) => {
      const A = o / (n.length - 1);
      s.addColorStop(A, r);
    }),
      (i.fill = { fill: s });
  }
}
class rc {
  constructor(t) {
    (this._canvasPool = Object.create(null)),
      (this.canvasOptions = t || {}),
      (this.enableFullScreen = !1);
  }
  _createCanvasAndContext(t, e) {
    const s = Et.get().createCanvas();
    (s.width = t), (s.height = e);
    const n = s.getContext("2d");
    return { canvas: s, context: n };
  }
  getOptimalCanvasAndContext(t, e, s = 1) {
    (t = Math.ceil(t * s - 1e-6)),
      (e = Math.ceil(e * s - 1e-6)),
      (t = ki(t)),
      (e = ki(e));
    const n = (t << 17) + (e << 1);
    this._canvasPool[n] || (this._canvasPool[n] = []);
    let r = this._canvasPool[n].pop();
    return r || (r = this._createCanvasAndContext(t, e)), r;
  }
  returnCanvasAndContext(t) {
    const e = t.canvas,
      { width: s, height: n } = e,
      r = (s << 17) + (n << 1);
    t.context.clearRect(0, 0, s, n), this._canvasPool[r].push(t);
  }
  clear() {
    this._canvasPool = {};
  }
}
const Mr = new rc(),
  oc = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"];
function Hs(i) {
  const t = typeof i.fontSize == "number" ? `${i.fontSize}px` : i.fontSize;
  let e = i.fontFamily;
  Array.isArray(i.fontFamily) || (e = i.fontFamily.split(","));
  for (let s = e.length - 1; s >= 0; s--) {
    let n = e[s].trim();
    !/([\"\'])[^\'\"]+\1/.test(n) && !oc.includes(n) && (n = `"${n}"`),
      (e[s] = n);
  }
  return `${i.fontStyle} ${i.fontVariant} ${i.fontWeight} ${t} ${e.join(",")}`;
}
const Cs = { willReadFrequently: !0 },
  $t = class H {
    static get experimentalLetterSpacingSupported() {
      let t = H._experimentalLetterSpacingSupported;
      if (t !== void 0) {
        const e = Et.get().getCanvasRenderingContext2D().prototype;
        t = H._experimentalLetterSpacingSupported =
          "letterSpacing" in e || "textLetterSpacing" in e;
      }
      return t;
    }
    constructor(t, e, s, n, r, o, A, h, l) {
      (this.text = t),
        (this.style = e),
        (this.width = s),
        (this.height = n),
        (this.lines = r),
        (this.lineWidths = o),
        (this.lineHeight = A),
        (this.maxLineWidth = h),
        (this.fontProperties = l);
    }
    static measureText(t = " ", e, s = H._canvas, n = e.wordWrap) {
      var w;
      const r = `${t}:${e.styleKey}`;
      if (H._measurementCache[r]) return H._measurementCache[r];
      const o = Hs(e),
        A = H.measureFont(o);
      A.fontSize === 0 && ((A.fontSize = e.fontSize), (A.ascent = e.fontSize));
      const h = H.__context;
      h.font = o;
      const d = (n ? H._wordWrap(t, e, s) : t).split(/(?:\r\n|\r|\n)/),
        a = new Array(d.length);
      let c = 0;
      for (let E = 0; E < d.length; E++) {
        const I = H._measureText(d[E], e.letterSpacing, h);
        (a[E] = I), (c = Math.max(c, I));
      }
      const u = ((w = e._stroke) == null ? void 0 : w.width) || 0;
      let g = c + u;
      e.dropShadow && (g += e.dropShadow.distance);
      const y = e.lineHeight || A.fontSize;
      let m = Math.max(y, A.fontSize + u) + (d.length - 1) * (y + e.leading);
      return (
        e.dropShadow && (m += e.dropShadow.distance),
        new H(t, e, g, m, d, a, y + e.leading, c, A)
      );
    }
    static _measureText(t, e, s) {
      let n = !1;
      H.experimentalLetterSpacingSupported &&
        (H.experimentalLetterSpacing
          ? ((s.letterSpacing = `${e}px`),
            (s.textLetterSpacing = `${e}px`),
            (n = !0))
          : ((s.letterSpacing = "0px"), (s.textLetterSpacing = "0px")));
      const r = s.measureText(t);
      let o = r.width;
      const A = -r.actualBoundingBoxLeft;
      let l = r.actualBoundingBoxRight - A;
      if (o > 0)
        if (n) (o -= e), (l -= e);
        else {
          const d = (H.graphemeSegmenter(t).length - 1) * e;
          (o += d), (l += d);
        }
      return Math.max(o, l);
    }
    static _wordWrap(t, e, s = H._canvas) {
      const n = s.getContext("2d", Cs);
      let r = 0,
        o = "",
        A = "";
      const h = Object.create(null),
        { letterSpacing: l, whiteSpace: d } = e,
        a = H._collapseSpaces(d),
        c = H._collapseNewlines(d);
      let u = !a;
      const g = e.wordWrapWidth + l,
        y = H._tokenize(t);
      for (let m = 0; m < y.length; m++) {
        let C = y[m];
        if (H._isNewline(C)) {
          if (!c) {
            (A += H._addLine(o)), (u = !a), (o = ""), (r = 0);
            continue;
          }
          C = " ";
        }
        if (a) {
          const E = H.isBreakingSpace(C),
            I = H.isBreakingSpace(o[o.length - 1]);
          if (E && I) continue;
        }
        const w = H._getFromCache(C, l, h, n);
        if (w > g)
          if (
            (o !== "" && ((A += H._addLine(o)), (o = ""), (r = 0)),
            H.canBreakWords(C, e.breakWords))
          ) {
            const E = H.wordWrapSplit(C);
            for (let I = 0; I < E.length; I++) {
              let U = E[I],
                D = U,
                F = 1;
              for (; E[I + F]; ) {
                const O = E[I + F];
                if (!H.canBreakChars(D, O, C, I, e.breakWords)) U += O;
                else break;
                (D = O), F++;
              }
              I += F - 1;
              const W = H._getFromCache(U, l, h, n);
              W + r > g && ((A += H._addLine(o)), (u = !1), (o = ""), (r = 0)),
                (o += U),
                (r += W);
            }
          } else {
            o.length > 0 && ((A += H._addLine(o)), (o = ""), (r = 0));
            const E = m === y.length - 1;
            (A += H._addLine(C, !E)), (u = !1), (o = ""), (r = 0);
          }
        else
          w + r > g && ((u = !1), (A += H._addLine(o)), (o = ""), (r = 0)),
            (o.length > 0 || !H.isBreakingSpace(C) || u) &&
              ((o += C), (r += w));
      }
      return (A += H._addLine(o, !1)), A;
    }
    static _addLine(t, e = !0) {
      return (
        (t = H._trimRight(t)),
        (t = e
          ? `${t}
`
          : t),
        t
      );
    }
    static _getFromCache(t, e, s, n) {
      let r = s[t];
      return (
        typeof r != "number" && ((r = H._measureText(t, e, n) + e), (s[t] = r)),
        r
      );
    }
    static _collapseSpaces(t) {
      return t === "normal" || t === "pre-line";
    }
    static _collapseNewlines(t) {
      return t === "normal";
    }
    static _trimRight(t) {
      if (typeof t != "string") return "";
      for (let e = t.length - 1; e >= 0; e--) {
        const s = t[e];
        if (!H.isBreakingSpace(s)) break;
        t = t.slice(0, -1);
      }
      return t;
    }
    static _isNewline(t) {
      return typeof t != "string" ? !1 : H._newlines.includes(t.charCodeAt(0));
    }
    static isBreakingSpace(t, e) {
      return typeof t != "string"
        ? !1
        : H._breakingSpaces.includes(t.charCodeAt(0));
    }
    static _tokenize(t) {
      const e = [];
      let s = "";
      if (typeof t != "string") return e;
      for (let n = 0; n < t.length; n++) {
        const r = t[n],
          o = t[n + 1];
        if (H.isBreakingSpace(r, o) || H._isNewline(r)) {
          s !== "" && (e.push(s), (s = "")), e.push(r);
          continue;
        }
        s += r;
      }
      return s !== "" && e.push(s), e;
    }
    static canBreakWords(t, e) {
      return e;
    }
    static canBreakChars(t, e, s, n, r) {
      return !0;
    }
    static wordWrapSplit(t) {
      return H.graphemeSegmenter(t);
    }
    static measureFont(t) {
      if (H._fonts[t]) return H._fonts[t];
      const e = H._context;
      e.font = t;
      const s = e.measureText(H.METRICS_STRING + H.BASELINE_SYMBOL),
        n = {
          ascent: s.actualBoundingBoxAscent,
          descent: s.actualBoundingBoxDescent,
          fontSize: s.actualBoundingBoxAscent + s.actualBoundingBoxDescent,
        };
      return (H._fonts[t] = n), n;
    }
    static clearMetrics(t = "") {
      t ? delete H._fonts[t] : (H._fonts = {});
    }
    static get _canvas() {
      if (!H.__canvas) {
        let t;
        try {
          const e = new OffscreenCanvas(0, 0),
            s = e.getContext("2d", Cs);
          if (s != null && s.measureText) return (H.__canvas = e), e;
          t = Et.get().createCanvas();
        } catch {
          t = Et.get().createCanvas();
        }
        (t.width = t.height = 10), (H.__canvas = t);
      }
      return H.__canvas;
    }
    static get _context() {
      return (
        H.__context || (H.__context = H._canvas.getContext("2d", Cs)),
        H.__context
      );
    }
  };
$t.METRICS_STRING = "|ÉqÅ";
$t.BASELINE_SYMBOL = "M";
$t.BASELINE_MULTIPLIER = 1.4;
$t.HEIGHT_MULTIPLIER = 2;
$t.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const i = new Intl.Segmenter();
    return (t) => [...i.segment(t)].map((e) => e.segment);
  }
  return (i) => [...i];
})();
$t.experimentalLetterSpacing = !1;
$t._fonts = {};
$t._newlines = [10, 13];
$t._breakingSpaces = [
  9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287,
  12288,
];
$t._measurementCache = {};
let Ys = $t;
const Sr = 1e5;
function Qr(i, t, e, s = 0) {
  if (i.texture === $.WHITE && !i.fill)
    return Mt.shared
      .setValue(i.color)
      .setAlpha(i.alpha ?? 1)
      .toHexa();
  if (i.fill) {
    if (i.fill instanceof Vi) {
      const n = i.fill,
        r = t.createPattern(n.texture.source.resource, "repeat"),
        o = n.transform.copyTo(tt.shared);
      return (
        o.scale(n.texture.frame.width, n.texture.frame.height),
        r.setTransform(o),
        r
      );
    } else if (i.fill instanceof me) {
      const n = i.fill,
        r = n.type === "linear",
        o = n.textureSpace === "local";
      let A = 1,
        h = 1;
      o && e && ((A = e.width + s), (h = e.height + s));
      let l,
        d = !1;
      if (r) {
        const { start: a, end: c } = n;
        (l = t.createLinearGradient(a.x * A, a.y * h, c.x * A, c.y * h)),
          (d = Math.abs(c.x - a.x) < Math.abs((c.y - a.y) * 0.1));
      } else {
        const { center: a, innerRadius: c, outerCenter: u, outerRadius: g } = n;
        l = t.createRadialGradient(
          a.x * A,
          a.y * h,
          c * A,
          u.x * A,
          u.y * h,
          g * A,
        );
      }
      if (d && o && e) {
        const a = e.lineHeight / h;
        for (let c = 0; c < e.lines.length; c++) {
          const u = (c * e.lineHeight + s / 2) / h;
          n.colorStops.forEach((g) => {
            const y = u + g.offset * a;
            l.addColorStop(
              Math.floor(y * Sr) / Sr,
              Mt.shared.setValue(g.color).toHex(),
            );
          });
        }
      } else
        n.colorStops.forEach((a) => {
          l.addColorStop(a.offset, Mt.shared.setValue(a.color).toHex());
        });
      return l;
    }
  } else {
    const n = t.createPattern(i.texture.source.resource, "repeat"),
      r = i.matrix.copyTo(tt.shared);
    return (
      r.scale(i.texture.frame.width, i.texture.frame.height),
      n.setTransform(r),
      n
    );
  }
  return Ct("FillStyle not recognised", i), "red";
}
function aa(i) {
  if (i === "") return [];
  typeof i == "string" && (i = [i]);
  const t = [];
  for (let e = 0, s = i.length; e < s; e++) {
    const n = i[e];
    if (Array.isArray(n)) {
      if (n.length !== 2)
        throw new Error(
          `[BitmapFont]: Invalid character range length, expecting 2 got ${n.length}.`,
        );
      if (n[0].length === 0 || n[1].length === 0)
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      const r = n[0].charCodeAt(0),
        o = n[1].charCodeAt(0);
      if (o < r) throw new Error("[BitmapFont]: Invalid character range.");
      for (let A = r, h = o; A <= h; A++) t.push(String.fromCharCode(A));
    } else t.push(...Array.from(n));
  }
  if (t.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return t;
}
const Aa = class ha extends zo {
  constructor(t) {
    super(),
      (this.resolution = 1),
      (this.pages = []),
      (this._padding = 0),
      (this._measureCache = Object.create(null)),
      (this._currentChars = []),
      (this._currentX = 0),
      (this._currentY = 0),
      (this._currentPageIndex = -1),
      (this._skipKerning = !1);
    const e = { ...ha.defaultOptions, ...t };
    (this._textureSize = e.textureSize), (this._mipmap = e.mipmap);
    const s = e.style.clone();
    e.overrideFill &&
      ((s._fill.color = 16777215),
      (s._fill.alpha = 1),
      (s._fill.texture = $.WHITE),
      (s._fill.fill = null)),
      (this.applyFillAsTint = e.overrideFill);
    const n = s.fontSize;
    s.fontSize = this.baseMeasurementFontSize;
    const r = Hs(s);
    e.overrideSize
      ? s._stroke && (s._stroke.width *= this.baseRenderedFontSize / n)
      : (s.fontSize = this.baseRenderedFontSize = n),
      (this._style = s),
      (this._skipKerning = e.skipKerning ?? !1),
      (this.resolution = e.resolution ?? 1),
      (this._padding = e.padding ?? 4),
      (this.fontMetrics = Ys.measureFont(r)),
      (this.lineHeight =
        s.lineHeight || this.fontMetrics.fontSize || s.fontSize);
  }
  ensureCharacters(t) {
    var m, C;
    const e = aa(t)
      .filter((w) => !this._currentChars.includes(w))
      .filter((w, E, I) => I.indexOf(w) === E);
    if (!e.length) return;
    this._currentChars = [...this._currentChars, ...e];
    let s;
    this._currentPageIndex === -1
      ? (s = this._nextPage())
      : (s = this.pages[this._currentPageIndex]);
    let { canvas: n, context: r } = s.canvasAndContext,
      o = s.texture.source;
    const A = this._style;
    let h = this._currentX,
      l = this._currentY;
    const d = this.baseRenderedFontSize / this.baseMeasurementFontSize,
      a = this._padding * d;
    let c = 0,
      u = !1;
    const g = n.width / this.resolution,
      y = n.height / this.resolution;
    for (let w = 0; w < e.length; w++) {
      const E = e[w],
        I = Ys.measureText(E, A, n, !1);
      I.lineHeight = I.height;
      const U = I.width * d,
        D = Math.ceil((A.fontStyle === "italic" ? 2 : 1) * U),
        F = I.height * d,
        W = D + a * 2,
        O = F + a * 2;
      if (
        ((u = !1),
        E !==
          `
` &&
          E !== "\r" &&
          E !== "	" &&
          E !== " " &&
          ((u = !0), (c = Math.ceil(Math.max(O, c)))),
        h + W > g && ((l += c), (c = O), (h = 0), l + c > y))
      ) {
        o.update();
        const z = this._nextPage();
        (n = z.canvasAndContext.canvas),
          (r = z.canvasAndContext.context),
          (o = z.texture.source),
          (l = 0);
      }
      const L =
        U / d -
        (((m = A.dropShadow) == null ? void 0 : m.distance) ?? 0) -
        (((C = A._stroke) == null ? void 0 : C.width) ?? 0);
      if (
        ((this.chars[E] = {
          id: E.codePointAt(0),
          xOffset: -this._padding,
          yOffset: -this._padding,
          xAdvance: L,
          kerning: {},
        }),
        u)
      ) {
        this._drawGlyph(r, I, h + a, l + a, d, A);
        const z = o.width * d,
          ht = o.height * d,
          st = new Bt(
            (h / z) * o.width,
            (l / ht) * o.height,
            (W / z) * o.width,
            (O / ht) * o.height,
          );
        (this.chars[E].texture = new $({ source: o, frame: st })),
          (h += Math.ceil(W));
      }
    }
    o.update(),
      (this._currentX = h),
      (this._currentY = l),
      this._skipKerning && this._applyKerning(e, r);
  }
  get pageTextures() {
    return (
      it(
        dt,
        "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.",
      ),
      this.pages
    );
  }
  _applyKerning(t, e) {
    const s = this._measureCache;
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      for (let o = 0; o < this._currentChars.length; o++) {
        const A = this._currentChars[o];
        let h = s[r];
        h || (h = s[r] = e.measureText(r).width);
        let l = s[A];
        l || (l = s[A] = e.measureText(A).width);
        let d = e.measureText(r + A).width,
          a = d - (h + l);
        a && (this.chars[r].kerning[A] = a),
          (d = e.measureText(r + A).width),
          (a = d - (h + l)),
          a && (this.chars[A].kerning[r] = a);
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const t = this.resolution,
      e = Mr.getOptimalCanvasAndContext(
        this._textureSize,
        this._textureSize,
        t,
      );
    this._setupContext(e.context, this._style, t);
    const s = t * (this.baseRenderedFontSize / this.baseMeasurementFontSize),
      n = new $({
        source: new Ne({
          resource: e.canvas,
          resolution: s,
          alphaMode: "premultiply-alpha-on-upload",
          autoGenerateMipmaps: this._mipmap,
        }),
      }),
      r = { canvasAndContext: e, texture: n };
    return (this.pages[this._currentPageIndex] = r), r;
  }
  _setupContext(t, e, s) {
    (e.fontSize = this.baseRenderedFontSize),
      t.scale(s, s),
      (t.font = Hs(e)),
      (e.fontSize = this.baseMeasurementFontSize),
      (t.textBaseline = e.textBaseline);
    const n = e._stroke,
      r = (n == null ? void 0 : n.width) ?? 0;
    if (
      (n &&
        ((t.lineWidth = r),
        (t.lineJoin = n.join),
        (t.miterLimit = n.miterLimit),
        (t.strokeStyle = Qr(n, t))),
      e._fill && (t.fillStyle = Qr(e._fill, t)),
      e.dropShadow)
    ) {
      const o = e.dropShadow,
        A = Mt.shared.setValue(o.color).toArray(),
        h = o.blur * s,
        l = o.distance * s;
      (t.shadowColor = `rgba(${A[0] * 255},${A[1] * 255},${A[2] * 255},${o.alpha})`),
        (t.shadowBlur = h),
        (t.shadowOffsetX = Math.cos(o.angle) * l),
        (t.shadowOffsetY = Math.sin(o.angle) * l);
    } else
      (t.shadowColor = "black"),
        (t.shadowBlur = 0),
        (t.shadowOffsetX = 0),
        (t.shadowOffsetY = 0);
  }
  _drawGlyph(t, e, s, n, r, o) {
    const A = e.text,
      h = e.fontProperties,
      l = o._stroke,
      d = ((l == null ? void 0 : l.width) ?? 0) * r,
      a = s + d / 2,
      c = n - d / 2,
      u = h.descent * r,
      g = e.lineHeight * r;
    o.stroke && d && t.strokeText(A, a, c + g - u),
      o._fill && t.fillText(A, a, c + g - u);
  }
  destroy() {
    super.destroy();
    for (let t = 0; t < this.pages.length; t++) {
      const { canvasAndContext: e, texture: s } = this.pages[t];
      Mr.returnCanvasAndContext(e), s.destroy(!0);
    }
    this.pages = null;
  }
};
Aa.defaultOptions = { textureSize: 512, style: new Kt(), mipmap: !0 };
let Dr = Aa;
function ac(i, t, e, s) {
  const n = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: t.fontSize / e.baseMeasurementFontSize,
    lines: [
      {
        width: 0,
        charPositions: [],
        spaceWidth: 0,
        spacesIndex: [],
        chars: [],
      },
    ],
  };
  n.offsetY = e.baseLineOffset;
  let r = n.lines[0],
    o = null,
    A = !0;
  const h = { width: 0, start: 0, index: 0, positions: [], chars: [] },
    l = (g) => {
      const y = r.width;
      for (let m = 0; m < h.index; m++) {
        const C = g.positions[m];
        r.chars.push(g.chars[m]), r.charPositions.push(C + y);
      }
      (r.width += g.width),
        (A = !1),
        (h.width = 0),
        (h.index = 0),
        (h.chars.length = 0);
    },
    d = () => {
      let g = r.chars.length - 1;
      if (s) {
        let y = r.chars[g];
        for (; y === " "; )
          (r.width -= e.chars[y].xAdvance), (y = r.chars[--g]);
      }
      (n.width = Math.max(n.width, r.width)),
        (r = {
          width: 0,
          charPositions: [],
          chars: [],
          spaceWidth: 0,
          spacesIndex: [],
        }),
        (A = !0),
        n.lines.push(r),
        (n.height += e.lineHeight);
    },
    a = e.baseMeasurementFontSize / t.fontSize,
    c = t.letterSpacing * a,
    u = t.wordWrapWidth * a;
  for (let g = 0; g < i.length + 1; g++) {
    let y;
    const m = g === i.length;
    m || (y = i[g]);
    const C = e.chars[y] || e.chars[" "];
    if (
      /(?:\s)/.test(y) ||
      y === "\r" ||
      y ===
        `
` ||
      m
    ) {
      if (
        (!A && t.wordWrap && r.width + h.width - c > u
          ? (d(), l(h), m || r.charPositions.push(0))
          : ((h.start = r.width), l(h), m || r.charPositions.push(0)),
        y === "\r" ||
          y ===
            `
`)
      )
        r.width !== 0 && d();
      else if (!m) {
        const U = C.xAdvance + (C.kerning[o] || 0) + c;
        (r.width += U),
          (r.spaceWidth = U),
          r.spacesIndex.push(r.charPositions.length),
          r.chars.push(y);
      }
    } else {
      const I = C.kerning[o] || 0,
        U = C.xAdvance + I + c;
      (h.positions[h.index++] = h.width + I), h.chars.push(y), (h.width += U);
    }
    o = y;
  }
  return (
    d(),
    t.align === "center"
      ? Ac(n)
      : t.align === "right"
        ? hc(n)
        : t.align === "justify" && lc(n),
    n
  );
}
function Ac(i) {
  for (let t = 0; t < i.lines.length; t++) {
    const e = i.lines[t],
      s = i.width / 2 - e.width / 2;
    for (let n = 0; n < e.charPositions.length; n++) e.charPositions[n] += s;
  }
}
function hc(i) {
  for (let t = 0; t < i.lines.length; t++) {
    const e = i.lines[t],
      s = i.width - e.width;
    for (let n = 0; n < e.charPositions.length; n++) e.charPositions[n] += s;
  }
}
function lc(i) {
  const t = i.width;
  for (let e = 0; e < i.lines.length; e++) {
    const s = i.lines[e];
    let n = 0,
      r = s.spacesIndex[n++],
      o = 0;
    const A = s.spacesIndex.length,
      l = (t - s.width) / A;
    for (let d = 0; d < s.charPositions.length; d++)
      d === r && ((r = s.spacesIndex[n++]), (o += l)),
        (s.charPositions[d] += o);
  }
}
let Mi = 0;
class cc {
  constructor() {
    (this.ALPHA = [["a", "z"], ["A", "Z"], " "]),
      (this.NUMERIC = [["0", "9"]]),
      (this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "]),
      (this.ASCII = [[" ", "~"]]),
      (this.defaultOptions = {
        chars: this.ALPHANUMERIC,
        resolution: 1,
        padding: 4,
        skipKerning: !1,
      });
  }
  getFont(t, e) {
    var o;
    let s = `${e.fontFamily}-bitmap`,
      n = !0;
    if (e._fill.fill && !e._stroke) (s += e._fill.fill.styleKey), (n = !1);
    else if (e._stroke || e.dropShadow) {
      let A = e.styleKey;
      (A = A.substring(0, A.lastIndexOf("-"))), (s = `${A}-bitmap`), (n = !1);
    }
    if (!bt.has(s)) {
      const A = new Dr({
        style: e,
        overrideFill: n,
        overrideSize: !0,
        ...this.defaultOptions,
      });
      Mi++,
        Mi > 50 &&
          Ct(
            "BitmapText",
            `You have dynamically created ${Mi} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``,
          ),
        A.once("destroy", () => {
          Mi--, bt.remove(s);
        }),
        bt.set(s, A);
    }
    const r = bt.get(s);
    return (o = r.ensureCharacters) == null || o.call(r, t), r;
  }
  getLayout(t, e, s = !0) {
    const n = this.getFont(t, e);
    return ac([...t], e, n, s);
  }
  measureText(t, e, s = !0) {
    return this.getLayout(t, e, s);
  }
  install(...t) {
    var l, d, a, c;
    let e = t[0];
    typeof e == "string" &&
      ((e = {
        name: e,
        style: t[1],
        chars: (l = t[2]) == null ? void 0 : l.chars,
        resolution: (d = t[2]) == null ? void 0 : d.resolution,
        padding: (a = t[2]) == null ? void 0 : a.padding,
        skipKerning: (c = t[2]) == null ? void 0 : c.skipKerning,
      }),
      it(
        dt,
        "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})",
      ));
    const s = e == null ? void 0 : e.name;
    if (!s) throw new Error("[BitmapFontManager] Property `name` is required.");
    e = { ...this.defaultOptions, ...e };
    const n = e.style,
      r = n instanceof Kt ? n : new Kt(n),
      o = r._fill.fill !== null && r._fill.fill !== void 0,
      A = new Dr({
        style: r,
        overrideFill: o,
        skipKerning: e.skipKerning,
        padding: e.padding,
        resolution: e.resolution,
        overrideSize: !1,
      }),
      h = aa(e.chars);
    return (
      A.ensureCharacters(h.join("")),
      bt.set(`${s}-bitmap`, A),
      A.once("destroy", () => bt.remove(`${s}-bitmap`)),
      A
    );
  }
  uninstall(t) {
    const e = `${t}-bitmap`,
      s = bt.get(e);
    s && s.destroy();
  }
}
const Pr = new cc();
class la extends zo {
  constructor(t, e) {
    super();
    const { textures: s, data: n } = t;
    Object.keys(n.pages).forEach((r) => {
      const o = n.pages[parseInt(r, 10)],
        A = s[o.id];
      this.pages.push({ texture: A });
    }),
      Object.keys(n.chars).forEach((r) => {
        const o = n.chars[r],
          { frame: A, source: h } = s[o.page],
          l = new Bt(o.x + A.x, o.y + A.y, o.width, o.height),
          d = new $({ source: h, frame: l });
        this.chars[r] = {
          id: r.codePointAt(0),
          xOffset: o.xOffset,
          yOffset: o.yOffset,
          xAdvance: o.xAdvance,
          kerning: o.kerning ?? {},
          texture: d,
        };
      }),
      (this.baseRenderedFontSize = n.fontSize),
      (this.baseMeasurementFontSize = n.fontSize),
      (this.fontMetrics = { ascent: 0, descent: 0, fontSize: n.fontSize }),
      (this.baseLineOffset = n.baseLineOffset),
      (this.lineHeight = n.lineHeight),
      (this.fontFamily = n.fontFamily),
      (this.distanceField = n.distanceField ?? { type: "none", range: 0 }),
      (this.url = e);
  }
  destroy() {
    super.destroy();
    for (let t = 0; t < this.pages.length; t++) {
      const { texture: e } = this.pages[t];
      e.destroy(!0);
    }
    this.pages = null;
  }
  static install(t) {
    Pr.install(t);
  }
  static uninstall(t) {
    Pr.uninstall(t);
  }
}
const xs = {
    test(i) {
      return typeof i == "string" && i.startsWith("info face=");
    },
    parse(i) {
      const t = i.match(/^[a-z]+\s+.+$/gm),
        e = {
          info: [],
          common: [],
          page: [],
          char: [],
          chars: [],
          kerning: [],
          kernings: [],
          distanceField: [],
        };
      for (const a in t) {
        const c = t[a].match(/^[a-z]+/gm)[0],
          u = t[a].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),
          g = {};
        for (const y in u) {
          const m = u[y].split("="),
            C = m[0],
            w = m[1].replace(/"/gm, ""),
            E = parseFloat(w),
            I = isNaN(E) ? w : E;
          g[C] = I;
        }
        e[c].push(g);
      }
      const s = {
          chars: {},
          pages: [],
          lineHeight: 0,
          fontSize: 0,
          fontFamily: "",
          distanceField: null,
          baseLineOffset: 0,
        },
        [n] = e.info,
        [r] = e.common,
        [o] = e.distanceField ?? [];
      o &&
        (s.distanceField = {
          range: parseInt(o.distanceRange, 10),
          type: o.fieldType,
        }),
        (s.fontSize = parseInt(n.size, 10)),
        (s.fontFamily = n.face),
        (s.lineHeight = parseInt(r.lineHeight, 10));
      const A = e.page;
      for (let a = 0; a < A.length; a++)
        s.pages.push({ id: parseInt(A[a].id, 10) || 0, file: A[a].file });
      const h = {};
      s.baseLineOffset = s.lineHeight - parseInt(r.base, 10);
      const l = e.char;
      for (let a = 0; a < l.length; a++) {
        const c = l[a],
          u = parseInt(c.id, 10);
        let g = c.letter ?? c.char ?? String.fromCharCode(u);
        g === "space" && (g = " "),
          (h[u] = g),
          (s.chars[g] = {
            id: u,
            page: parseInt(c.page, 10) || 0,
            x: parseInt(c.x, 10),
            y: parseInt(c.y, 10),
            width: parseInt(c.width, 10),
            height: parseInt(c.height, 10),
            xOffset: parseInt(c.xoffset, 10),
            yOffset: parseInt(c.yoffset, 10),
            xAdvance: parseInt(c.xadvance, 10),
            kerning: {},
          });
      }
      const d = e.kerning || [];
      for (let a = 0; a < d.length; a++) {
        const c = parseInt(d[a].first, 10),
          u = parseInt(d[a].second, 10),
          g = parseInt(d[a].amount, 10);
        s.chars[h[u]].kerning[h[c]] = g;
      }
      return s;
    },
  },
  Rr = {
    test(i) {
      const t = i;
      return (
        typeof t != "string" &&
        "getElementsByTagName" in t &&
        t.getElementsByTagName("page").length &&
        t.getElementsByTagName("info")[0].getAttribute("face") !== null
      );
    },
    parse(i) {
      const t = {
          chars: {},
          pages: [],
          lineHeight: 0,
          fontSize: 0,
          fontFamily: "",
          distanceField: null,
          baseLineOffset: 0,
        },
        e = i.getElementsByTagName("info")[0],
        s = i.getElementsByTagName("common")[0],
        n = i.getElementsByTagName("distanceField")[0];
      n &&
        (t.distanceField = {
          type: n.getAttribute("fieldType"),
          range: parseInt(n.getAttribute("distanceRange"), 10),
        });
      const r = i.getElementsByTagName("page"),
        o = i.getElementsByTagName("char"),
        A = i.getElementsByTagName("kerning");
      (t.fontSize = parseInt(e.getAttribute("size"), 10)),
        (t.fontFamily = e.getAttribute("face")),
        (t.lineHeight = parseInt(s.getAttribute("lineHeight"), 10));
      for (let l = 0; l < r.length; l++)
        t.pages.push({
          id: parseInt(r[l].getAttribute("id"), 10) || 0,
          file: r[l].getAttribute("file"),
        });
      const h = {};
      t.baseLineOffset = t.lineHeight - parseInt(s.getAttribute("base"), 10);
      for (let l = 0; l < o.length; l++) {
        const d = o[l],
          a = parseInt(d.getAttribute("id"), 10);
        let c =
          d.getAttribute("letter") ??
          d.getAttribute("char") ??
          String.fromCharCode(a);
        c === "space" && (c = " "),
          (h[a] = c),
          (t.chars[c] = {
            id: a,
            page: parseInt(d.getAttribute("page"), 10) || 0,
            x: parseInt(d.getAttribute("x"), 10),
            y: parseInt(d.getAttribute("y"), 10),
            width: parseInt(d.getAttribute("width"), 10),
            height: parseInt(d.getAttribute("height"), 10),
            xOffset: parseInt(d.getAttribute("xoffset"), 10),
            yOffset: parseInt(d.getAttribute("yoffset"), 10),
            xAdvance: parseInt(d.getAttribute("xadvance"), 10),
            kerning: {},
          });
      }
      for (let l = 0; l < A.length; l++) {
        const d = parseInt(A[l].getAttribute("first"), 10),
          a = parseInt(A[l].getAttribute("second"), 10),
          c = parseInt(A[l].getAttribute("amount"), 10);
        t.chars[h[a]].kerning[h[d]] = c;
      }
      return t;
    },
  },
  Fr = {
    test(i) {
      return typeof i == "string" && i.includes("<font>")
        ? Rr.test(Et.get().parseXML(i))
        : !1;
    },
    parse(i) {
      return Rr.parse(Et.get().parseXML(i));
    },
  },
  uc = [".xml", ".fnt"],
  dc = {
    extension: { type: Y.CacheParser, name: "cacheBitmapFont" },
    test: (i) => i instanceof la,
    getCacheableAssets(i, t) {
      const e = {};
      return (
        i.forEach((s) => {
          (e[s] = t), (e[`${s}-bitmap`] = t);
        }),
        (e[`${t.fontFamily}-bitmap`] = t),
        e
      );
    },
  },
  fc = {
    extension: { type: Y.LoadParser, priority: De.Normal },
    name: "loadBitmapFont",
    test(i) {
      return uc.includes(Lt.extname(i).toLowerCase());
    },
    async testParse(i) {
      return xs.test(i) || Fr.test(i);
    },
    async parse(i, t, e) {
      const s = xs.test(i) ? xs.parse(i) : Fr.parse(i),
        { src: n } = t,
        { pages: r } = s,
        o = [],
        A = s.distanceField
          ? {
              scaleMode: "linear",
              alphaMode: "premultiply-alpha-on-upload",
              autoGenerateMipmaps: !1,
              resolution: 1,
            }
          : {};
      for (let a = 0; a < r.length; ++a) {
        const c = r[a].file;
        let u = Lt.join(Lt.dirname(n), c);
        (u = Fs(u, n)), o.push({ src: u, data: A });
      }
      const h = await e.load(o),
        l = o.map((a) => h[a.src]);
      return new la({ data: s, textures: l }, n);
    },
    async load(i, t) {
      return await (await Et.get().fetch(i)).text();
    },
    async unload(i, t, e) {
      await Promise.all(
        i.pages.map((s) => e.unload(s.texture.source._sourceOrigin)),
      ),
        i.destroy();
    },
  };
class gc {
  constructor(t, e = !1) {
    (this._loader = t),
      (this._assetList = []),
      (this._isLoading = !1),
      (this._maxConcurrent = 1),
      (this.verbose = e);
  }
  add(t) {
    t.forEach((e) => {
      this._assetList.push(e);
    }),
      this.verbose &&
        console.log("[BackgroundLoader] assets: ", this._assetList),
      this._isActive && !this._isLoading && this._next();
  }
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = !0;
      const t = [],
        e = Math.min(this._assetList.length, this._maxConcurrent);
      for (let s = 0; s < e; s++) t.push(this._assetList.pop());
      await this._loader.load(t), (this._isLoading = !1), this._next();
    }
  }
  get active() {
    return this._isActive;
  }
  set active(t) {
    this._isActive !== t &&
      ((this._isActive = t), t && !this._isLoading && this._next());
  }
}
const pc = {
  extension: { type: Y.CacheParser, name: "cacheTextureArray" },
  test: (i) => Array.isArray(i) && i.every((t) => t instanceof $),
  getCacheableAssets: (i, t) => {
    const e = {};
    return (
      i.forEach((s) => {
        t.forEach((n, r) => {
          e[s + (r === 0 ? "" : r + 1)] = n;
        });
      }),
      e
    );
  },
};
async function ca(i) {
  if ("Image" in globalThis)
    return new Promise((t) => {
      const e = new Image();
      (e.onload = () => {
        t(!0);
      }),
        (e.onerror = () => {
          t(!1);
        }),
        (e.src = i);
    });
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const t = await (await fetch(i)).blob();
      await createImageBitmap(t);
    } catch {
      return !1;
    }
    return !0;
  }
  return !1;
}
const mc = {
    extension: { type: Y.DetectionParser, priority: 1 },
    test: async () =>
      ca(
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",
      ),
    add: async (i) => [...i, "avif"],
    remove: async (i) => i.filter((t) => t !== "avif"),
  },
  Tr = ["png", "jpg", "jpeg"],
  yc = {
    extension: { type: Y.DetectionParser, priority: -1 },
    test: () => Promise.resolve(!0),
    add: async (i) => [...i, ...Tr],
    remove: async (i) => i.filter((t) => !Tr.includes(t)),
  },
  Cc =
    "WorkerGlobalScope" in globalThis &&
    globalThis instanceof globalThis.WorkerGlobalScope;
function gn(i) {
  return Cc ? !1 : document.createElement("video").canPlayType(i) !== "";
}
const xc = {
    extension: { type: Y.DetectionParser, priority: 0 },
    test: async () => gn("video/mp4"),
    add: async (i) => [...i, "mp4", "m4v"],
    remove: async (i) => i.filter((t) => t !== "mp4" && t !== "m4v"),
  },
  wc = {
    extension: { type: Y.DetectionParser, priority: 0 },
    test: async () => gn("video/ogg"),
    add: async (i) => [...i, "ogv"],
    remove: async (i) => i.filter((t) => t !== "ogv"),
  },
  bc = {
    extension: { type: Y.DetectionParser, priority: 0 },
    test: async () => gn("video/webm"),
    add: async (i) => [...i, "webm"],
    remove: async (i) => i.filter((t) => t !== "webm"),
  },
  Ec = {
    extension: { type: Y.DetectionParser, priority: 0 },
    test: async () =>
      ca(
        "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
      ),
    add: async (i) => [...i, "webp"],
    remove: async (i) => i.filter((t) => t !== "webp"),
  };
class vc {
  constructor() {
    (this._parsers = []),
      (this._parsersValidated = !1),
      (this.parsers = new Proxy(this._parsers, {
        set: (t, e, s) => ((this._parsersValidated = !1), (t[e] = s), !0),
      })),
      (this.promiseCache = {});
  }
  reset() {
    (this._parsersValidated = !1), (this.promiseCache = {});
  }
  _getLoadPromiseAndParser(t, e) {
    const s = { promise: null, parser: null };
    return (
      (s.promise = (async () => {
        var o, A;
        let n = null,
          r = null;
        if (
          (e.loadParser &&
            ((r = this._parserHash[e.loadParser]),
            r ||
              Ct(
                `[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`,
              )),
          !r)
        ) {
          for (let h = 0; h < this.parsers.length; h++) {
            const l = this.parsers[h];
            if (l.load && (o = l.test) != null && o.call(l, t, e, this)) {
              r = l;
              break;
            }
          }
          if (!r)
            return (
              Ct(
                `[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`,
              ),
              null
            );
        }
        (n = await r.load(t, e, this)), (s.parser = r);
        for (let h = 0; h < this.parsers.length; h++) {
          const l = this.parsers[h];
          l.parse &&
            l.parse &&
            (await ((A = l.testParse) == null
              ? void 0
              : A.call(l, n, e, this))) &&
            ((n = (await l.parse(n, e, this)) || n), (s.parser = l));
        }
        return n;
      })()),
      s
    );
  }
  async load(t, e) {
    this._parsersValidated || this._validateParsers();
    let s = 0;
    const n = {},
      r = Ui(t),
      o = Zt(t, (l) => ({ alias: [l], src: l, data: {} })),
      A = o.length,
      h = o.map(async (l) => {
        const d = Lt.toAbsolute(l.src);
        if (!n[l.src])
          try {
            this.promiseCache[d] ||
              (this.promiseCache[d] = this._getLoadPromiseAndParser(d, l)),
              (n[l.src] = await this.promiseCache[d].promise),
              e && e(++s / A);
          } catch (a) {
            throw (
              (delete this.promiseCache[d],
              delete n[l.src],
              new Error(`[Loader.load] Failed to load ${d}.
${a}`))
            );
          }
      });
    return await Promise.all(h), r ? n[o[0].src] : n;
  }
  async unload(t) {
    const s = Zt(t, (n) => ({ alias: [n], src: n })).map(async (n) => {
      var A, h;
      const r = Lt.toAbsolute(n.src),
        o = this.promiseCache[r];
      if (o) {
        const l = await o.promise;
        delete this.promiseCache[r],
          await ((h = (A = o.parser) == null ? void 0 : A.unload) == null
            ? void 0
            : h.call(A, l, n, this));
      }
    });
    await Promise.all(s);
  }
  _validateParsers() {
    (this._parsersValidated = !0),
      (this._parserHash = this._parsers
        .filter((t) => t.name)
        .reduce(
          (t, e) => (
            e.name
              ? t[e.name] && Ct(`[Assets] loadParser name conflict "${e.name}"`)
              : Ct("[Assets] loadParser should have a name"),
            { ...t, [e.name]: e }
          ),
          {},
        ));
  }
}
function Ke(i, t) {
  if (Array.isArray(t)) {
    for (const e of t) if (i.startsWith(`data:${e}`)) return !0;
    return !1;
  }
  return i.startsWith(`data:${t}`);
}
function Je(i, t) {
  const e = i.split("?")[0],
    s = Lt.extname(e).toLowerCase();
  return Array.isArray(t) ? t.includes(s) : s === t;
}
const Bc = ".json",
  Ic = "application/json",
  Mc = {
    extension: { type: Y.LoadParser, priority: De.Low },
    name: "loadJson",
    test(i) {
      return Ke(i, Ic) || Je(i, Bc);
    },
    async load(i) {
      return await (await Et.get().fetch(i)).json();
    },
  },
  Sc = ".txt",
  Qc = "text/plain",
  Dc = {
    name: "loadTxt",
    extension: { type: Y.LoadParser, priority: De.Low, name: "loadTxt" },
    test(i) {
      return Ke(i, Qc) || Je(i, Sc);
    },
    async load(i) {
      return await (await Et.get().fetch(i)).text();
    },
  },
  Pc = [
    "normal",
    "bold",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  Rc = [".ttf", ".otf", ".woff", ".woff2"],
  Fc = ["font/ttf", "font/otf", "font/woff", "font/woff2"],
  Tc = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function kc(i) {
  const t = Lt.extname(i),
    n = Lt.basename(i, t)
      .replace(/(-|_)/g, " ")
      .toLowerCase()
      .split(" ")
      .map((A) => A.charAt(0).toUpperCase() + A.slice(1));
  let r = n.length > 0;
  for (const A of n)
    if (!A.match(Tc)) {
      r = !1;
      break;
    }
  let o = n.join(" ");
  return r || (o = `"${o.replace(/[\\"]/g, "\\$&")}"`), o;
}
const Gc = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function Uc(i) {
  return Gc.test(i) ? i : encodeURI(i);
}
const Nc = {
  extension: { type: Y.LoadParser, priority: De.Low },
  name: "loadWebFont",
  test(i) {
    return Ke(i, Fc) || Je(i, Rc);
  },
  async load(i, t) {
    var s, n, r;
    const e = Et.get().getFontFaceSet();
    if (e) {
      const o = [],
        A = ((s = t.data) == null ? void 0 : s.family) ?? kc(i),
        h = ((r = (n = t.data) == null ? void 0 : n.weights) == null
          ? void 0
          : r.filter((d) => Pc.includes(d))) ?? ["normal"],
        l = t.data ?? {};
      for (let d = 0; d < h.length; d++) {
        const a = h[d],
          c = new FontFace(A, `url(${Uc(i)})`, { ...l, weight: a });
        await c.load(), e.add(c), o.push(c);
      }
      return (
        bt.set(`${A}-and-url`, { url: i, fontFaces: o }),
        o.length === 1 ? o[0] : o
      );
    }
    return (
      Ct("[loadWebFont] FontFace API is not supported. Skipping loading font"),
      null
    );
  },
  unload(i) {
    (Array.isArray(i) ? i : [i]).forEach((t) => {
      bt.remove(`${t.family}-and-url`), Et.get().getFontFaceSet().delete(t);
    });
  },
};
function pn(i, t = 1) {
  var s;
  const e = (s = We.RETINA_PREFIX) == null ? void 0 : s.exec(i);
  return e ? parseFloat(e[1]) : t;
}
function mn(i, t, e) {
  (i.label = e), (i._sourceOrigin = e);
  const s = new $({ source: i, label: e }),
    n = () => {
      delete t.promiseCache[e], bt.has(e) && bt.remove(e);
    };
  return (
    s.source.once("destroy", () => {
      t.promiseCache[e] &&
        (Ct(
          "[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource.",
        ),
        n());
    }),
    s.once("destroy", () => {
      i.destroyed ||
        (Ct(
          "[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture.",
        ),
        n());
    }),
    s
  );
}
const Oc = ".svg",
  jc = "image/svg+xml",
  zc = {
    extension: { type: Y.LoadParser, priority: De.Low, name: "loadSVG" },
    name: "loadSVG",
    config: { crossOrigin: "anonymous", parseAsGraphicsContext: !1 },
    test(i) {
      return Ke(i, jc) || Je(i, Oc);
    },
    async load(i, t, e) {
      var s;
      return (((s = t.data) == null ? void 0 : s.parseAsGraphicsContext) ??
        this.config.parseAsGraphicsContext)
        ? Hc(i)
        : Lc(i, t, e, this.config.crossOrigin);
    },
    unload(i) {
      i.destroy(!0);
    },
  };
async function Lc(i, t, e, s) {
  var m, C, w;
  const r = await (await Et.get().fetch(i)).blob(),
    o = URL.createObjectURL(r),
    A = new Image();
  (A.src = o), (A.crossOrigin = s), await A.decode(), URL.revokeObjectURL(o);
  const h = document.createElement("canvas"),
    l = h.getContext("2d"),
    d = ((m = t.data) == null ? void 0 : m.resolution) || pn(i),
    a = ((C = t.data) == null ? void 0 : C.width) ?? A.width,
    c = ((w = t.data) == null ? void 0 : w.height) ?? A.height;
  (h.width = a * d), (h.height = c * d), l.drawImage(A, 0, 0, a * d, c * d);
  const { parseAsGraphicsContext: u, ...g } = t.data ?? {},
    y = new Ne({
      resource: h,
      alphaMode: "premultiply-alpha-on-upload",
      resolution: d,
      ...g,
    });
  return mn(y, e, i);
}
async function Hc(i) {
  const e = await (await Et.get().fetch(i)).text(),
    s = new Ht();
  return s.svg(e), s;
}
const Yc = `(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (_e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;
let Xe = null,
  Xs = class {
    constructor() {
      Xe ||
        (Xe = URL.createObjectURL(
          new Blob([Yc], { type: "application/javascript" }),
        )),
        (this.worker = new Worker(Xe));
    }
  };
Xs.revokeObjectURL = function () {
  Xe && (URL.revokeObjectURL(Xe), (Xe = null));
};
const Xc = `(function () {
    'use strict';

    async function loadImageBitmap(url, alphaMode) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
      }
      const imageBlob = await response.blob();
      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);
    }
    self.onmessage = async (event) => {
      try {
        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);
        self.postMessage({
          data: imageBitmap,
          uuid: event.data.uuid,
          id: event.data.id
        }, [imageBitmap]);
      } catch (e) {
        self.postMessage({
          error: e,
          uuid: event.data.uuid,
          id: event.data.id
        });
      }
    };

})();
`;
let Ve = null;
class ua {
  constructor() {
    Ve ||
      (Ve = URL.createObjectURL(
        new Blob([Xc], { type: "application/javascript" }),
      )),
      (this.worker = new Worker(Ve));
  }
}
ua.revokeObjectURL = function () {
  Ve && (URL.revokeObjectURL(Ve), (Ve = null));
};
let kr = 0,
  ws;
class Vc {
  constructor() {
    (this._initialized = !1),
      (this._createdWorkers = 0),
      (this._workerPool = []),
      (this._queue = []),
      (this._resolveHash = {});
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== void 0
      ? this._isImageBitmapSupported
      : ((this._isImageBitmapSupported = new Promise((t) => {
          const { worker: e } = new Xs();
          e.addEventListener("message", (s) => {
            e.terminate(), Xs.revokeObjectURL(), t(s.data);
          });
        })),
        this._isImageBitmapSupported);
  }
  loadImageBitmap(t, e) {
    var s;
    return this._run("loadImageBitmap", [
      t,
      (s = e == null ? void 0 : e.data) == null ? void 0 : s.alphaMode,
    ]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0);
  }
  _getWorker() {
    ws === void 0 && (ws = navigator.hardwareConcurrency || 4);
    let t = this._workerPool.pop();
    return (
      !t &&
        this._createdWorkers < ws &&
        (this._createdWorkers++,
        (t = new ua().worker),
        t.addEventListener("message", (e) => {
          this._complete(e.data), this._returnWorker(e.target), this._next();
        })),
      t
    );
  }
  _returnWorker(t) {
    this._workerPool.push(t);
  }
  _complete(t) {
    t.error !== void 0
      ? this._resolveHash[t.uuid].reject(t.error)
      : this._resolveHash[t.uuid].resolve(t.data),
      (this._resolveHash[t.uuid] = null);
  }
  async _run(t, e) {
    await this._initWorkers();
    const s = new Promise((n, r) => {
      this._queue.push({ id: t, arguments: e, resolve: n, reject: r });
    });
    return this._next(), s;
  }
  _next() {
    if (!this._queue.length) return;
    const t = this._getWorker();
    if (!t) return;
    const e = this._queue.pop(),
      s = e.id;
    (this._resolveHash[kr] = { resolve: e.resolve, reject: e.reject }),
      t.postMessage({ data: e.arguments, uuid: kr++, id: s });
  }
}
const Gr = new Vc(),
  _c = [".jpeg", ".jpg", ".png", ".webp", ".avif"],
  qc = ["image/jpeg", "image/png", "image/webp", "image/avif"];
async function Zc(i, t) {
  var n;
  const e = await Et.get().fetch(i);
  if (!e.ok)
    throw new Error(
      `[loadImageBitmap] Failed to fetch ${i}: ${e.status} ${e.statusText}`,
    );
  const s = await e.blob();
  return ((n = t == null ? void 0 : t.data) == null ? void 0 : n.alphaMode) ===
    "premultiplied-alpha"
    ? createImageBitmap(s, { premultiplyAlpha: "none" })
    : createImageBitmap(s);
}
const da = {
    name: "loadTextures",
    extension: { type: Y.LoadParser, priority: De.High, name: "loadTextures" },
    config: {
      preferWorkers: !0,
      preferCreateImageBitmap: !0,
      crossOrigin: "anonymous",
    },
    test(i) {
      return Ke(i, qc) || Je(i, _c);
    },
    async load(i, t, e) {
      var r;
      let s = null;
      globalThis.createImageBitmap && this.config.preferCreateImageBitmap
        ? this.config.preferWorkers && (await Gr.isImageBitmapSupported())
          ? (s = await Gr.loadImageBitmap(i, t))
          : (s = await Zc(i, t))
        : (s = await new Promise((o, A) => {
            (s = new Image()),
              (s.crossOrigin = this.config.crossOrigin),
              (s.src = i),
              s.complete
                ? o(s)
                : ((s.onload = () => {
                    o(s);
                  }),
                  (s.onerror = A));
          }));
      const n = new Ne({
        resource: s,
        alphaMode: "premultiply-alpha-on-upload",
        resolution: ((r = t.data) == null ? void 0 : r.resolution) || pn(i),
        ...t.data,
      });
      return mn(n, e, i);
    },
    unload(i) {
      i.destroy(!0);
    },
  },
  fa = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"],
  Wc = fa.map((i) => `video/${i.substring(1)}`);
function Kc(i, t, e) {
  e === void 0 && !t.startsWith("data:")
    ? (i.crossOrigin = $c(t))
    : e !== !1 && (i.crossOrigin = typeof e == "string" ? e : "anonymous");
}
function Jc(i) {
  return new Promise((t, e) => {
    i.addEventListener("canplaythrough", s),
      i.addEventListener("error", n),
      i.load();
    function s() {
      r(), t();
    }
    function n(o) {
      r(), e(o);
    }
    function r() {
      i.removeEventListener("canplaythrough", s),
        i.removeEventListener("error", n);
    }
  });
}
function $c(i, t = globalThis.location) {
  if (i.startsWith("data:")) return "";
  t || (t = globalThis.location);
  const e = new URL(i, document.baseURI);
  return e.hostname !== t.hostname ||
    e.port !== t.port ||
    e.protocol !== t.protocol
    ? "anonymous"
    : "";
}
const tu = {
    name: "loadVideo",
    extension: { type: Y.LoadParser, name: "loadVideo" },
    test(i) {
      const t = Ke(i, Wc),
        e = Je(i, fa);
      return t || e;
    },
    async load(i, t, e) {
      var h, l;
      const s = {
          ...Di.defaultOptions,
          resolution: ((h = t.data) == null ? void 0 : h.resolution) || pn(i),
          alphaMode:
            ((l = t.data) == null ? void 0 : l.alphaMode) || (await xo()),
          ...t.data,
        },
        n = document.createElement("video"),
        r = {
          preload: s.autoLoad !== !1 ? "auto" : void 0,
          "webkit-playsinline": s.playsinline !== !1 ? "" : void 0,
          playsinline: s.playsinline !== !1 ? "" : void 0,
          muted: s.muted === !0 ? "" : void 0,
          loop: s.loop === !0 ? "" : void 0,
          autoplay: s.autoPlay !== !1 ? "" : void 0,
        };
      Object.keys(r).forEach((d) => {
        const a = r[d];
        a !== void 0 && n.setAttribute(d, a);
      }),
        s.muted === !0 && (n.muted = !0),
        Kc(n, i, s.crossorigin);
      const o = document.createElement("source");
      let A;
      if (i.startsWith("data:")) A = i.slice(5, i.indexOf(";"));
      else if (!i.startsWith("blob:")) {
        const d = i
          .split("?")[0]
          .slice(i.lastIndexOf(".") + 1)
          .toLowerCase();
        A = Di.MIME_TYPES[d] || `video/${d}`;
      }
      return (
        (o.src = i),
        A && (o.type = A),
        new Promise((d) => {
          const a = async () => {
            const c = new Di({ ...s, resource: n });
            n.removeEventListener("canplay", a),
              t.data.preload && (await Jc(n)),
              d(mn(c, e, i));
          };
          n.addEventListener("canplay", a), n.appendChild(o);
        })
      );
    },
    unload(i) {
      i.destroy(!0);
    },
  },
  ga = {
    extension: { type: Y.ResolveParser, name: "resolveTexture" },
    test: da.test,
    parse: (i) => {
      var t;
      return {
        resolution: parseFloat(
          ((t = We.RETINA_PREFIX.exec(i)) == null ? void 0 : t[1]) ?? "1",
        ),
        format: i.split(".").pop(),
        src: i,
      };
    },
  },
  eu = {
    extension: { type: Y.ResolveParser, priority: -2, name: "resolveJson" },
    test: (i) => We.RETINA_PREFIX.test(i) && i.endsWith(".json"),
    parse: ga.parse,
  };
class iu {
  constructor() {
    (this._detections = []),
      (this._initialized = !1),
      (this.resolver = new We()),
      (this.loader = new vc()),
      (this.cache = bt),
      (this._backgroundLoader = new gc(this.loader)),
      (this._backgroundLoader.active = !0),
      this.reset();
  }
  async init(t = {}) {
    var r, o;
    if (this._initialized) {
      Ct(
        "[Assets]AssetManager already initialized, did you load before calling this Assets.init()?",
      );
      return;
    }
    if (
      ((this._initialized = !0),
      t.defaultSearchParams &&
        this.resolver.setDefaultSearchParams(t.defaultSearchParams),
      t.basePath && (this.resolver.basePath = t.basePath),
      t.bundleIdentifier &&
        this.resolver.setBundleIdentifier(t.bundleIdentifier),
      t.manifest)
    ) {
      let A = t.manifest;
      typeof A == "string" && (A = await this.load(A)),
        this.resolver.addManifest(A);
    }
    const e = ((r = t.texturePreference) == null ? void 0 : r.resolution) ?? 1,
      s = typeof e == "number" ? [e] : e,
      n = await this._detectFormats({
        preferredFormats: (o = t.texturePreference) == null ? void 0 : o.format,
        skipDetections: t.skipDetections,
        detections: this._detections,
      });
    this.resolver.prefer({ params: { format: n, resolution: s } }),
      t.preferences && this.setPreferences(t.preferences);
  }
  add(t) {
    this.resolver.add(t);
  }
  async load(t, e) {
    this._initialized || (await this.init());
    const s = Ui(t),
      n = Zt(t).map((A) => {
        if (typeof A != "string") {
          const h = this.resolver.getAlias(A);
          return (
            h.some((l) => !this.resolver.hasKey(l)) && this.add(A),
            Array.isArray(h) ? h[0] : h
          );
        }
        return this.resolver.hasKey(A) || this.add({ alias: A, src: A }), A;
      }),
      r = this.resolver.resolve(n),
      o = await this._mapLoadToResolve(r, e);
    return s ? o[n[0]] : o;
  }
  addBundle(t, e) {
    this.resolver.addBundle(t, e);
  }
  async loadBundle(t, e) {
    this._initialized || (await this.init());
    let s = !1;
    typeof t == "string" && ((s = !0), (t = [t]));
    const n = this.resolver.resolveBundle(t),
      r = {},
      o = Object.keys(n);
    let A = 0,
      h = 0;
    const l = () => {
        e == null || e(++A / h);
      },
      d = o.map((a) => {
        const c = n[a];
        return (
          (h += Object.keys(c).length),
          this._mapLoadToResolve(c, l).then((u) => {
            r[a] = u;
          })
        );
      });
    return await Promise.all(d), s ? r[t[0]] : r;
  }
  async backgroundLoad(t) {
    this._initialized || (await this.init()), typeof t == "string" && (t = [t]);
    const e = this.resolver.resolve(t);
    this._backgroundLoader.add(Object.values(e));
  }
  async backgroundLoadBundle(t) {
    this._initialized || (await this.init()), typeof t == "string" && (t = [t]);
    const e = this.resolver.resolveBundle(t);
    Object.values(e).forEach((s) => {
      this._backgroundLoader.add(Object.values(s));
    });
  }
  reset() {
    this.resolver.reset(),
      this.loader.reset(),
      this.cache.reset(),
      (this._initialized = !1);
  }
  get(t) {
    if (typeof t == "string") return bt.get(t);
    const e = {};
    for (let s = 0; s < t.length; s++) e[s] = bt.get(t[s]);
    return e;
  }
  async _mapLoadToResolve(t, e) {
    const s = [...new Set(Object.values(t))];
    this._backgroundLoader.active = !1;
    const n = await this.loader.load(s, e);
    this._backgroundLoader.active = !0;
    const r = {};
    return (
      s.forEach((o) => {
        const A = n[o.src],
          h = [o.src];
        o.alias && h.push(...o.alias),
          h.forEach((l) => {
            r[l] = A;
          }),
          bt.set(h, A);
      }),
      r
    );
  }
  async unload(t) {
    this._initialized || (await this.init());
    const e = Zt(t).map((n) => (typeof n != "string" ? n.src : n)),
      s = this.resolver.resolve(e);
    await this._unloadFromResolved(s);
  }
  async unloadBundle(t) {
    this._initialized || (await this.init()), (t = Zt(t));
    const e = this.resolver.resolveBundle(t),
      s = Object.keys(e).map((n) => this._unloadFromResolved(e[n]));
    await Promise.all(s);
  }
  async _unloadFromResolved(t) {
    const e = Object.values(t);
    e.forEach((s) => {
      bt.remove(s.src);
    }),
      await this.loader.unload(e);
  }
  async _detectFormats(t) {
    let e = [];
    t.preferredFormats &&
      (e = Array.isArray(t.preferredFormats)
        ? t.preferredFormats
        : [t.preferredFormats]);
    for (const s of t.detections)
      t.skipDetections || (await s.test())
        ? (e = await s.add(e))
        : t.skipDetections || (e = await s.remove(e));
    return (e = e.filter((s, n) => e.indexOf(s) === n)), e;
  }
  get detections() {
    return this._detections;
  }
  setPreferences(t) {
    this.loader.parsers.forEach((e) => {
      e.config &&
        Object.keys(e.config)
          .filter((s) => s in t)
          .forEach((s) => {
            e.config[s] = t[s];
          });
    });
  }
}
const Ai = new iu();
Dt.handleByList(Y.LoadParser, Ai.loader.parsers)
  .handleByList(Y.ResolveParser, Ai.resolver.parsers)
  .handleByList(Y.CacheParser, Ai.cache.parsers)
  .handleByList(Y.DetectionParser, Ai.detections);
Dt.add(pc, yc, mc, Ec, xc, wc, bc, Mc, Dc, Nc, zc, da, tu, fc, dc, ga, eu);
const Ur = {
  loader: Y.LoadParser,
  resolver: Y.ResolveParser,
  cache: Y.CacheParser,
  detection: Y.DetectionParser,
};
Dt.handle(
  Y.Asset,
  (i) => {
    const t = i.ref;
    Object.entries(Ur)
      .filter(([e]) => !!t[e])
      .forEach(([e, s]) =>
        Dt.add(Object.assign(t[e], { extension: t[e].extension ?? s })),
      );
  },
  (i) => {
    const t = i.ref;
    Object.keys(Ur)
      .filter((e) => !!t[e])
      .forEach((e) => Dt.remove(t[e]));
  },
);
class Xt extends rn {
  constructor(t) {
    t instanceof Ht && (t = { context: t });
    const { context: e, roundPixels: s, ...n } = t || {};
    super({ label: "Graphics", ...n }),
      (this.renderPipeId = "graphics"),
      e ? (this._context = e) : (this._context = this._ownedContext = new Ht()),
      this._context.on("update", this.onViewUpdate, this),
      (this.allowChildren = !1),
      (this.roundPixels = s ?? !1);
  }
  set context(t) {
    t !== this._context &&
      (this._context.off("update", this.onViewUpdate, this),
      (this._context = t),
      this._context.on("update", this.onViewUpdate, this),
      this.onViewUpdate());
  }
  get context() {
    return this._context;
  }
  get bounds() {
    return this._context.bounds;
  }
  updateBounds() {}
  containsPoint(t) {
    return this._context.containsPoint(t);
  }
  destroy(t) {
    this._ownedContext && !t
      ? this._ownedContext.destroy(t)
      : (t === !0 || (t == null ? void 0 : t.context) === !0) &&
        this._context.destroy(t),
      (this._ownedContext = null),
      (this._context = null),
      super.destroy(t);
  }
  _callContextMethod(t, e) {
    return this.context[t](...e), this;
  }
  setFillStyle(...t) {
    return this._callContextMethod("setFillStyle", t);
  }
  setStrokeStyle(...t) {
    return this._callContextMethod("setStrokeStyle", t);
  }
  fill(...t) {
    return this._callContextMethod("fill", t);
  }
  stroke(...t) {
    return this._callContextMethod("stroke", t);
  }
  texture(...t) {
    return this._callContextMethod("texture", t);
  }
  beginPath() {
    return this._callContextMethod("beginPath", []);
  }
  cut() {
    return this._callContextMethod("cut", []);
  }
  arc(...t) {
    return this._callContextMethod("arc", t);
  }
  arcTo(...t) {
    return this._callContextMethod("arcTo", t);
  }
  arcToSvg(...t) {
    return this._callContextMethod("arcToSvg", t);
  }
  bezierCurveTo(...t) {
    return this._callContextMethod("bezierCurveTo", t);
  }
  closePath() {
    return this._callContextMethod("closePath", []);
  }
  ellipse(...t) {
    return this._callContextMethod("ellipse", t);
  }
  circle(...t) {
    return this._callContextMethod("circle", t);
  }
  path(...t) {
    return this._callContextMethod("path", t);
  }
  lineTo(...t) {
    return this._callContextMethod("lineTo", t);
  }
  moveTo(...t) {
    return this._callContextMethod("moveTo", t);
  }
  quadraticCurveTo(...t) {
    return this._callContextMethod("quadraticCurveTo", t);
  }
  rect(...t) {
    return this._callContextMethod("rect", t);
  }
  roundRect(...t) {
    return this._callContextMethod("roundRect", t);
  }
  poly(...t) {
    return this._callContextMethod("poly", t);
  }
  regularPoly(...t) {
    return this._callContextMethod("regularPoly", t);
  }
  roundPoly(...t) {
    return this._callContextMethod("roundPoly", t);
  }
  roundShape(...t) {
    return this._callContextMethod("roundShape", t);
  }
  filletRect(...t) {
    return this._callContextMethod("filletRect", t);
  }
  chamferRect(...t) {
    return this._callContextMethod("chamferRect", t);
  }
  star(...t) {
    return this._callContextMethod("star", t);
  }
  svg(...t) {
    return this._callContextMethod("svg", t);
  }
  restore(...t) {
    return this._callContextMethod("restore", t);
  }
  save() {
    return this._callContextMethod("save", []);
  }
  getTransform() {
    return this.context.getTransform();
  }
  resetTransform() {
    return this._callContextMethod("resetTransform", []);
  }
  rotateTransform(...t) {
    return this._callContextMethod("rotate", t);
  }
  scaleTransform(...t) {
    return this._callContextMethod("scale", t);
  }
  setTransform(...t) {
    return this._callContextMethod("setTransform", t);
  }
  transform(...t) {
    return this._callContextMethod("transform", t);
  }
  translateTransform(...t) {
    return this._callContextMethod("translate", t);
  }
  clear() {
    return this._callContextMethod("clear", []);
  }
  get fillStyle() {
    return this._context.fillStyle;
  }
  set fillStyle(t) {
    this._context.fillStyle = t;
  }
  get strokeStyle() {
    return this._context.strokeStyle;
  }
  set strokeStyle(t) {
    this._context.strokeStyle = t;
  }
  clone(t = !1) {
    return t
      ? new Xt(this._context.clone())
      : ((this._ownedContext = null), new Xt(this._context));
  }
  lineStyle(t, e, s) {
    it(
      dt,
      "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.",
    );
    const n = {};
    return (
      t && (n.width = t),
      e && (n.color = e),
      s && (n.alpha = s),
      (this.context.strokeStyle = n),
      this
    );
  }
  beginFill(t, e) {
    it(
      dt,
      "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.",
    );
    const s = {};
    return (
      t !== void 0 && (s.color = t),
      e !== void 0 && (s.alpha = e),
      (this.context.fillStyle = s),
      this
    );
  }
  endFill() {
    it(
      dt,
      "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.",
    ),
      this.context.fill();
    const t = this.context.strokeStyle;
    return (
      (t.width !== Ht.defaultStrokeStyle.width ||
        t.color !== Ht.defaultStrokeStyle.color ||
        t.alpha !== Ht.defaultStrokeStyle.alpha) &&
        this.context.stroke(),
      this
    );
  }
  drawCircle(...t) {
    return (
      it(dt, "Graphics#drawCircle has been renamed to Graphics#circle"),
      this._callContextMethod("circle", t)
    );
  }
  drawEllipse(...t) {
    return (
      it(dt, "Graphics#drawEllipse has been renamed to Graphics#ellipse"),
      this._callContextMethod("ellipse", t)
    );
  }
  drawPolygon(...t) {
    return (
      it(dt, "Graphics#drawPolygon has been renamed to Graphics#poly"),
      this._callContextMethod("poly", t)
    );
  }
  drawRect(...t) {
    return (
      it(dt, "Graphics#drawRect has been renamed to Graphics#rect"),
      this._callContextMethod("rect", t)
    );
  }
  drawRoundedRect(...t) {
    return (
      it(dt, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),
      this._callContextMethod("roundRect", t)
    );
  }
  drawStar(...t) {
    return (
      it(dt, "Graphics#drawStar has been renamed to Graphics#star"),
      this._callContextMethod("star", t)
    );
  }
}
class he extends et {
  constructor(...t) {
    let e = t[0];
    Array.isArray(t[0]) && (e = { textures: t[0], autoUpdate: t[1] });
    const {
        animationSpeed: s = 1,
        autoPlay: n = !1,
        autoUpdate: r = !0,
        loop: o = !0,
        onComplete: A = null,
        onFrameChange: h = null,
        onLoop: l = null,
        textures: d,
        updateAnchor: a = !1,
        ...c
      } = e,
      [u] = d;
    super({ ...c, texture: u instanceof $ ? u : u.texture }),
      (this._textures = null),
      (this._durations = null),
      (this._autoUpdate = r),
      (this._isConnectedToTicker = !1),
      (this.animationSpeed = s),
      (this.loop = o),
      (this.updateAnchor = a),
      (this.onComplete = A),
      (this.onFrameChange = h),
      (this.onLoop = l),
      (this._currentTime = 0),
      (this._playing = !1),
      (this._previousFrame = null),
      (this.textures = d),
      n && this.play();
  }
  stop() {
    this._playing &&
      ((this._playing = !1),
      this._autoUpdate &&
        this._isConnectedToTicker &&
        (Me.shared.remove(this.update, this),
        (this._isConnectedToTicker = !1)));
  }
  play() {
    this._playing ||
      ((this._playing = !0),
      this._autoUpdate &&
        !this._isConnectedToTicker &&
        (Me.shared.add(this.update, this, Gi.HIGH),
        (this._isConnectedToTicker = !0)));
  }
  gotoAndStop(t) {
    this.stop(), (this.currentFrame = t);
  }
  gotoAndPlay(t) {
    (this.currentFrame = t), this.play();
  }
  update(t) {
    if (!this._playing) return;
    const e = t.deltaTime,
      s = this.animationSpeed * e,
      n = this.currentFrame;
    if (this._durations !== null) {
      let r = (this._currentTime % 1) * this._durations[this.currentFrame];
      for (r += (s / 60) * 1e3; r < 0; )
        this._currentTime--, (r += this._durations[this.currentFrame]);
      const o = Math.sign(this.animationSpeed * e);
      for (
        this._currentTime = Math.floor(this._currentTime);
        r >= this._durations[this.currentFrame];

      )
        (r -= this._durations[this.currentFrame] * o), (this._currentTime += o);
      this._currentTime += r / this._durations[this.currentFrame];
    } else this._currentTime += s;
    this._currentTime < 0 && !this.loop
      ? (this.gotoAndStop(0), this.onComplete && this.onComplete())
      : this._currentTime >= this._textures.length && !this.loop
        ? (this.gotoAndStop(this._textures.length - 1),
          this.onComplete && this.onComplete())
        : n !== this.currentFrame &&
          (this.loop &&
            this.onLoop &&
            ((this.animationSpeed > 0 && this.currentFrame < n) ||
              (this.animationSpeed < 0 && this.currentFrame > n)) &&
            this.onLoop(),
          this._updateTexture());
  }
  _updateTexture() {
    const t = this.currentFrame;
    this._previousFrame !== t &&
      ((this._previousFrame = t),
      (this.texture = this._textures[t]),
      this.updateAnchor &&
        this.texture.defaultAnchor &&
        this.anchor.copyFrom(this.texture.defaultAnchor),
      this.onFrameChange && this.onFrameChange(this.currentFrame));
  }
  destroy() {
    this.stop(),
      super.destroy(),
      (this.onComplete = null),
      (this.onFrameChange = null),
      (this.onLoop = null);
  }
  static fromFrames(t) {
    const e = [];
    for (let s = 0; s < t.length; ++s) e.push($.from(t[s]));
    return new he(e);
  }
  static fromImages(t) {
    const e = [];
    for (let s = 0; s < t.length; ++s) e.push($.from(t[s]));
    return new he(e);
  }
  get totalFrames() {
    return this._textures.length;
  }
  get textures() {
    return this._textures;
  }
  set textures(t) {
    if (t[0] instanceof $) (this._textures = t), (this._durations = null);
    else {
      (this._textures = []), (this._durations = []);
      for (let e = 0; e < t.length; e++)
        this._textures.push(t[e].texture), this._durations.push(t[e].time);
    }
    (this._previousFrame = null), this.gotoAndStop(0), this._updateTexture();
  }
  get currentFrame() {
    let t = Math.floor(this._currentTime) % this._textures.length;
    return t < 0 && (t += this._textures.length), t;
  }
  set currentFrame(t) {
    if (t < 0 || t > this.totalFrames - 1)
      throw new Error(
        `[AnimatedSprite]: Invalid frame index value ${t}, expected to be between 0 and totalFrames ${this.totalFrames}.`,
      );
    const e = this.currentFrame;
    (this._currentTime = t), e !== this.currentFrame && this._updateTexture();
  }
  get playing() {
    return this._playing;
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    t !== this._autoUpdate &&
      ((this._autoUpdate = t),
      !this._autoUpdate && this._isConnectedToTicker
        ? (Me.shared.remove(this.update, this),
          (this._isConnectedToTicker = !1))
        : this._autoUpdate &&
          !this._isConnectedToTicker &&
          this._playing &&
          (Me.shared.add(this.update, this), (this._isConnectedToTicker = !0)));
  }
}
class su extends rn {
  constructor(t, e) {
    const {
      text: s,
      resolution: n,
      style: r,
      anchor: o,
      width: A,
      height: h,
      roundPixels: l,
      ...d
    } = t;
    super({ ...d }),
      (this.batched = !0),
      (this._resolution = null),
      (this._autoResolution = !0),
      (this._didTextUpdate = !0),
      (this._styleClass = e),
      (this.text = s ?? ""),
      (this.style = r),
      (this.resolution = n ?? null),
      (this.allowChildren = !1),
      (this._anchor = new Ut({
        _onUpdate: () => {
          this.onViewUpdate();
        },
      })),
      o && (this.anchor = o),
      (this.roundPixels = l ?? !1),
      A !== void 0 && (this.width = A),
      h !== void 0 && (this.height = h);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
  }
  set text(t) {
    (t = t.toString()),
      this._text !== t && ((this._text = t), this.onViewUpdate());
  }
  get text() {
    return this._text;
  }
  set resolution(t) {
    (this._autoResolution = t === null),
      (this._resolution = t),
      this.onViewUpdate();
  }
  get resolution() {
    return this._resolution;
  }
  get style() {
    return this._style;
  }
  set style(t) {
    var e;
    t || (t = {}),
      (e = this._style) == null || e.off("update", this.onViewUpdate, this),
      t instanceof this._styleClass
        ? (this._style = t)
        : (this._style = new this._styleClass(t)),
      this._style.on("update", this.onViewUpdate, this),
      this.onViewUpdate();
  }
  get width() {
    return Math.abs(this.scale.x) * this.bounds.width;
  }
  set width(t) {
    this._setWidth(t, this.bounds.width);
  }
  get height() {
    return Math.abs(this.scale.y) * this.bounds.height;
  }
  set height(t) {
    this._setHeight(t, this.bounds.height);
  }
  getSize(t) {
    return (
      t || (t = {}),
      (t.width = Math.abs(this.scale.x) * this.bounds.width),
      (t.height = Math.abs(this.scale.y) * this.bounds.height),
      t
    );
  }
  setSize(t, e) {
    typeof t == "object"
      ? ((e = t.height ?? t.width), (t = t.width))
      : (e ?? (e = t)),
      t !== void 0 && this._setWidth(t, this.bounds.width),
      e !== void 0 && this._setHeight(e, this.bounds.height);
  }
  containsPoint(t) {
    const e = this.bounds.width,
      s = this.bounds.height,
      n = -e * this.anchor.x;
    let r = 0;
    return (
      t.x >= n &&
      t.x <= n + e &&
      ((r = -s * this.anchor.y), t.y >= r && t.y <= r + s)
    );
  }
  onViewUpdate() {
    this.didViewUpdate || (this._didTextUpdate = !0), super.onViewUpdate();
  }
  _getKey() {
    return `${this.text}:${this._style.styleKey}:${this._resolution}`;
  }
  destroy(t = !1) {
    super.destroy(t),
      (this.owner = null),
      (this._bounds = null),
      (this._anchor = null),
      (typeof t == "boolean" ? t : t != null && t.style) &&
        this._style.destroy(t),
      (this._style = null),
      (this._text = null);
  }
}
function nu(i, t) {
  let e = i[0] ?? {};
  return (
    (typeof e == "string" || i[1]) &&
      (it(dt, `use new ${t}({ text: "hi!", style }) instead`),
      (e = { text: e, style: i[1] })),
    e
  );
}
class gi extends su {
  constructor(...t) {
    const e = nu(t, "Text");
    super(e, Kt), (this.renderPipeId = "text");
  }
  updateBounds() {
    const t = this._bounds,
      e = this._anchor,
      s = Ys.measureText(this._text, this._style),
      { width: n, height: r } = s;
    (t.minX = -e._x * n),
      (t.maxX = t.minX + n),
      (t.minY = -e._y * r),
      (t.maxY = t.minY + r);
  }
}
Dt.add(Da, Pa);
class q {
  constructor(t) {
    p(this, "baseStage");
    (this.app = t),
      (this.baseStage = new _()),
      t.stage.addChild(this.baseStage);
  }
  close() {
    this.baseStage.removeFromParent();
  }
  update() {}
}
p(q, "WIDTH", 500), p(q, "HEIGHT", 400), p(q, "CELL_SIZE", 32);
class yn {
  constructor(t) {
    p(this, "queue", []);
    this.onEnd = t;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  start(t) {
    this.queue = [t];
  }
  add(t) {
    this.queue.push(t);
  }
  update(t) {
    if (this.isEmpty()) return;
    this.queue[0].next(t).done &&
      (this.queue.shift(), this.isEmpty() && this.onEnd());
  }
  clear() {
    this.queue = [];
  }
}
class Nr {
  constructor(t, e) {
    p(this, "subCanvas", new _({ x: 0, y: 0 }));
    p(this, "executer");
    (this.onEventStart = t),
      (this.executer = new yn(() => {
        this.executer.clear(), e();
      }));
  }
  start(t) {
    this.onEventStart(), this.executer.start(t(this.subCanvas));
  }
  add(t) {
    this.executer.isEmpty()
      ? this.start(t)
      : this.executer.add(t(this.subCanvas));
  }
  update(t) {
    t && this.executer.update(t);
  }
  close() {
    this.executer.clear(), this.subCanvas.removeChildren();
  }
}
class ru {
  constructor(t) {
    p(this, "pressedKeysStack", []);
    p(this, "keyState", {
      UP: "NONE",
      DOWN: "NONE",
      LEFT: "NONE",
      RIGHT: "NONE",
      ACTION: "NONE",
      MENU: "NONE",
    });
    this.getActivatedKeysStack = t;
  }
  getActivatedGameKeysStack() {
    return this.getActivatedKeysStack()
      .map(ou)
      .filter((t) => t !== null);
  }
  getLatestActivatedKey() {
    return this.getActivatedGameKeysStack()[0] ?? null;
  }
  _update() {
    const t = (e) =>
      this.keyState[e] === "PRESSED" || this.keyState[e] === "HELD";
    for (const e of Object.keys(this.keyState))
      this.getActivatedGameKeysStack().includes(e)
        ? (this.keyState[e] = t(e) ? "HELD" : "PRESSED")
        : (this.keyState[e] = t(e) ? "RELEASED" : "NONE");
  }
}
const ou = (i) => {
    switch (i) {
      case "ArrowUp":
      case "KeyW":
      case "w":
      case "vc:up":
        return "UP";
      case "ArrowDown":
      case "KeyS":
      case "s":
      case "vc:down":
        return "DOWN";
      case "ArrowLeft":
      case "KeyA":
      case "a":
      case "vc:left":
        return "LEFT";
      case "ArrowRight":
      case "KeyD":
      case "d":
      case "vc:right":
        return "RIGHT";
      case "Enter":
      case "Space":
      case " ":
      case "vc:a":
        return "ACTION";
      case "KeyZ":
      case "z":
      case "vc:z":
        return "MENU";
    }
    return null;
  },
  Oe = (i, t) => {
    const e = new et(i);
    (e.width = S.WIDTH),
      (e.height = S.HEIGHT),
      e.position.set(0, 0),
      t.addChild(e);
    function s() {
      t.removeChild(e), e.destroy();
    }
    return s;
  };
function* j(i) {
  let t = 0;
  for (; t < i; ) yield, t++;
}
function* Ce(i, t = 1) {
  const e = new Xt().rect(0, 0, S.WIDTH, S.HEIGHT).fill({ color: "black" });
  for (e.alpha = 0, i.addChild(e); e.alpha < 1; )
    yield* j(5), (e.alpha += 0.1 * t);
  function* s() {
    for (; e.alpha > 0; ) yield* j(5), (e.alpha -= 0.1 * t);
    i.removeChild(e);
  }
  return s;
}
function* Pt(i, t, e = 1) {
  const s = yield* Ce(i, e);
  t(), yield* s();
}
function* Cn(i) {
  for (;;) {
    const t = yield,
      e = i.filter((s) => t.keyState[s] === "PRESSED");
    if (e.length > 0) return e;
  }
}
var bs = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */ var Or;
function au() {
  return (
    Or ||
      ((Or = 1),
      (function (i) {
        (function () {
          var t = function () {
            this.init();
          };
          t.prototype = {
            init: function () {
              var a = this || e;
              return (
                (a._counter = 1e3),
                (a._html5AudioPool = []),
                (a.html5PoolSize = 10),
                (a._codecs = {}),
                (a._howls = []),
                (a._muted = !1),
                (a._volume = 1),
                (a._canPlayEvent = "canplaythrough"),
                (a._navigator =
                  typeof window < "u" && window.navigator
                    ? window.navigator
                    : null),
                (a.masterGain = null),
                (a.noAudio = !1),
                (a.usingWebAudio = !0),
                (a.autoSuspend = !0),
                (a.ctx = null),
                (a.autoUnlock = !0),
                a._setup(),
                a
              );
            },
            volume: function (a) {
              var c = this || e;
              if (
                ((a = parseFloat(a)),
                c.ctx || d(),
                typeof a < "u" && a >= 0 && a <= 1)
              ) {
                if (((c._volume = a), c._muted)) return c;
                c.usingWebAudio &&
                  c.masterGain.gain.setValueAtTime(a, e.ctx.currentTime);
                for (var u = 0; u < c._howls.length; u++)
                  if (!c._howls[u]._webAudio)
                    for (
                      var g = c._howls[u]._getSoundIds(), y = 0;
                      y < g.length;
                      y++
                    ) {
                      var m = c._howls[u]._soundById(g[y]);
                      m && m._node && (m._node.volume = m._volume * a);
                    }
                return c;
              }
              return c._volume;
            },
            mute: function (a) {
              var c = this || e;
              c.ctx || d(),
                (c._muted = a),
                c.usingWebAudio &&
                  c.masterGain.gain.setValueAtTime(
                    a ? 0 : c._volume,
                    e.ctx.currentTime,
                  );
              for (var u = 0; u < c._howls.length; u++)
                if (!c._howls[u]._webAudio)
                  for (
                    var g = c._howls[u]._getSoundIds(), y = 0;
                    y < g.length;
                    y++
                  ) {
                    var m = c._howls[u]._soundById(g[y]);
                    m && m._node && (m._node.muted = a ? !0 : m._muted);
                  }
              return c;
            },
            stop: function () {
              for (var a = this || e, c = 0; c < a._howls.length; c++)
                a._howls[c].stop();
              return a;
            },
            unload: function () {
              for (var a = this || e, c = a._howls.length - 1; c >= 0; c--)
                a._howls[c].unload();
              return (
                a.usingWebAudio &&
                  a.ctx &&
                  typeof a.ctx.close < "u" &&
                  (a.ctx.close(), (a.ctx = null), d()),
                a
              );
            },
            codecs: function (a) {
              return (this || e)._codecs[a.replace(/^x-/, "")];
            },
            _setup: function () {
              var a = this || e;
              if (
                ((a.state = (a.ctx && a.ctx.state) || "suspended"),
                a._autoSuspend(),
                !a.usingWebAudio)
              )
                if (typeof Audio < "u")
                  try {
                    var c = new Audio();
                    typeof c.oncanplaythrough > "u" &&
                      (a._canPlayEvent = "canplay");
                  } catch {
                    a.noAudio = !0;
                  }
                else a.noAudio = !0;
              try {
                var c = new Audio();
                c.muted && (a.noAudio = !0);
              } catch {}
              return a.noAudio || a._setupCodecs(), a;
            },
            _setupCodecs: function () {
              var a = this || e,
                c = null;
              try {
                c = typeof Audio < "u" ? new Audio() : null;
              } catch {
                return a;
              }
              if (!c || typeof c.canPlayType != "function") return a;
              var u = c.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                g = a._navigator ? a._navigator.userAgent : "",
                y = g.match(/OPR\/(\d+)/g),
                m = y && parseInt(y[0].split("/")[1], 10) < 33,
                C = g.indexOf("Safari") !== -1 && g.indexOf("Chrome") === -1,
                w = g.match(/Version\/(.*?) /),
                E = C && w && parseInt(w[1], 10) < 15;
              return (
                (a._codecs = {
                  mp3: !!(
                    !m &&
                    (u || c.canPlayType("audio/mp3;").replace(/^no$/, ""))
                  ),
                  mpeg: !!u,
                  opus: !!c
                    .canPlayType('audio/ogg; codecs="opus"')
                    .replace(/^no$/, ""),
                  ogg: !!c
                    .canPlayType('audio/ogg; codecs="vorbis"')
                    .replace(/^no$/, ""),
                  oga: !!c
                    .canPlayType('audio/ogg; codecs="vorbis"')
                    .replace(/^no$/, ""),
                  wav: !!(
                    c.canPlayType('audio/wav; codecs="1"') ||
                    c.canPlayType("audio/wav")
                  ).replace(/^no$/, ""),
                  aac: !!c.canPlayType("audio/aac;").replace(/^no$/, ""),
                  caf: !!c.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                  m4a: !!(
                    c.canPlayType("audio/x-m4a;") ||
                    c.canPlayType("audio/m4a;") ||
                    c.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  m4b: !!(
                    c.canPlayType("audio/x-m4b;") ||
                    c.canPlayType("audio/m4b;") ||
                    c.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  mp4: !!(
                    c.canPlayType("audio/x-mp4;") ||
                    c.canPlayType("audio/mp4;") ||
                    c.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  weba: !!(
                    !E &&
                    c
                      .canPlayType('audio/webm; codecs="vorbis"')
                      .replace(/^no$/, "")
                  ),
                  webm: !!(
                    !E &&
                    c
                      .canPlayType('audio/webm; codecs="vorbis"')
                      .replace(/^no$/, "")
                  ),
                  dolby: !!c
                    .canPlayType('audio/mp4; codecs="ec-3"')
                    .replace(/^no$/, ""),
                  flac: !!(
                    c.canPlayType("audio/x-flac;") ||
                    c.canPlayType("audio/flac;")
                  ).replace(/^no$/, ""),
                }),
                a
              );
            },
            _unlockAudio: function () {
              var a = this || e;
              if (!(a._audioUnlocked || !a.ctx)) {
                (a._audioUnlocked = !1),
                  (a.autoUnlock = !1),
                  !a._mobileUnloaded &&
                    a.ctx.sampleRate !== 44100 &&
                    ((a._mobileUnloaded = !0), a.unload()),
                  (a._scratchBuffer = a.ctx.createBuffer(1, 1, 22050));
                var c = function (u) {
                  for (; a._html5AudioPool.length < a.html5PoolSize; )
                    try {
                      var g = new Audio();
                      (g._unlocked = !0), a._releaseHtml5Audio(g);
                    } catch {
                      a.noAudio = !0;
                      break;
                    }
                  for (var y = 0; y < a._howls.length; y++)
                    if (!a._howls[y]._webAudio)
                      for (
                        var m = a._howls[y]._getSoundIds(), C = 0;
                        C < m.length;
                        C++
                      ) {
                        var w = a._howls[y]._soundById(m[C]);
                        w &&
                          w._node &&
                          !w._node._unlocked &&
                          ((w._node._unlocked = !0), w._node.load());
                      }
                  a._autoResume();
                  var E = a.ctx.createBufferSource();
                  (E.buffer = a._scratchBuffer),
                    E.connect(a.ctx.destination),
                    typeof E.start > "u" ? E.noteOn(0) : E.start(0),
                    typeof a.ctx.resume == "function" && a.ctx.resume(),
                    (E.onended = function () {
                      E.disconnect(0),
                        (a._audioUnlocked = !0),
                        document.removeEventListener("touchstart", c, !0),
                        document.removeEventListener("touchend", c, !0),
                        document.removeEventListener("click", c, !0),
                        document.removeEventListener("keydown", c, !0);
                      for (var I = 0; I < a._howls.length; I++)
                        a._howls[I]._emit("unlock");
                    });
                };
                return (
                  document.addEventListener("touchstart", c, !0),
                  document.addEventListener("touchend", c, !0),
                  document.addEventListener("click", c, !0),
                  document.addEventListener("keydown", c, !0),
                  a
                );
              }
            },
            _obtainHtml5Audio: function () {
              var a = this || e;
              if (a._html5AudioPool.length) return a._html5AudioPool.pop();
              var c = new Audio().play();
              return (
                c &&
                  typeof Promise < "u" &&
                  (c instanceof Promise || typeof c.then == "function") &&
                  c.catch(function () {
                    console.warn(
                      "HTML5 Audio pool exhausted, returning potentially locked audio object.",
                    );
                  }),
                new Audio()
              );
            },
            _releaseHtml5Audio: function (a) {
              var c = this || e;
              return a._unlocked && c._html5AudioPool.push(a), c;
            },
            _autoSuspend: function () {
              var a = this;
              if (
                !(
                  !a.autoSuspend ||
                  !a.ctx ||
                  typeof a.ctx.suspend > "u" ||
                  !e.usingWebAudio
                )
              ) {
                for (var c = 0; c < a._howls.length; c++)
                  if (a._howls[c]._webAudio) {
                    for (var u = 0; u < a._howls[c]._sounds.length; u++)
                      if (!a._howls[c]._sounds[u]._paused) return a;
                  }
                return (
                  a._suspendTimer && clearTimeout(a._suspendTimer),
                  (a._suspendTimer = setTimeout(function () {
                    if (a.autoSuspend) {
                      (a._suspendTimer = null), (a.state = "suspending");
                      var g = function () {
                        (a.state = "suspended"),
                          a._resumeAfterSuspend &&
                            (delete a._resumeAfterSuspend, a._autoResume());
                      };
                      a.ctx.suspend().then(g, g);
                    }
                  }, 3e4)),
                  a
                );
              }
            },
            _autoResume: function () {
              var a = this;
              if (!(!a.ctx || typeof a.ctx.resume > "u" || !e.usingWebAudio))
                return (
                  a.state === "running" &&
                  a.ctx.state !== "interrupted" &&
                  a._suspendTimer
                    ? (clearTimeout(a._suspendTimer), (a._suspendTimer = null))
                    : a.state === "suspended" ||
                        (a.state === "running" && a.ctx.state === "interrupted")
                      ? (a.ctx.resume().then(function () {
                          a.state = "running";
                          for (var c = 0; c < a._howls.length; c++)
                            a._howls[c]._emit("resume");
                        }),
                        a._suspendTimer &&
                          (clearTimeout(a._suspendTimer),
                          (a._suspendTimer = null)))
                      : a.state === "suspending" &&
                        (a._resumeAfterSuspend = !0),
                  a
                );
            },
          };
          var e = new t(),
            s = function (a) {
              var c = this;
              if (!a.src || a.src.length === 0) {
                console.error(
                  "An array of source files must be passed with any new Howl.",
                );
                return;
              }
              c.init(a);
            };
          s.prototype = {
            init: function (a) {
              var c = this;
              return (
                e.ctx || d(),
                (c._autoplay = a.autoplay || !1),
                (c._format =
                  typeof a.format != "string" ? a.format : [a.format]),
                (c._html5 = a.html5 || !1),
                (c._muted = a.mute || !1),
                (c._loop = a.loop || !1),
                (c._pool = a.pool || 5),
                (c._preload =
                  typeof a.preload == "boolean" || a.preload === "metadata"
                    ? a.preload
                    : !0),
                (c._rate = a.rate || 1),
                (c._sprite = a.sprite || {}),
                (c._src = typeof a.src != "string" ? a.src : [a.src]),
                (c._volume = a.volume !== void 0 ? a.volume : 1),
                (c._xhr = {
                  method: a.xhr && a.xhr.method ? a.xhr.method : "GET",
                  headers: a.xhr && a.xhr.headers ? a.xhr.headers : null,
                  withCredentials:
                    a.xhr && a.xhr.withCredentials ? a.xhr.withCredentials : !1,
                }),
                (c._duration = 0),
                (c._state = "unloaded"),
                (c._sounds = []),
                (c._endTimers = {}),
                (c._queue = []),
                (c._playLock = !1),
                (c._onend = a.onend ? [{ fn: a.onend }] : []),
                (c._onfade = a.onfade ? [{ fn: a.onfade }] : []),
                (c._onload = a.onload ? [{ fn: a.onload }] : []),
                (c._onloaderror = a.onloaderror ? [{ fn: a.onloaderror }] : []),
                (c._onplayerror = a.onplayerror ? [{ fn: a.onplayerror }] : []),
                (c._onpause = a.onpause ? [{ fn: a.onpause }] : []),
                (c._onplay = a.onplay ? [{ fn: a.onplay }] : []),
                (c._onstop = a.onstop ? [{ fn: a.onstop }] : []),
                (c._onmute = a.onmute ? [{ fn: a.onmute }] : []),
                (c._onvolume = a.onvolume ? [{ fn: a.onvolume }] : []),
                (c._onrate = a.onrate ? [{ fn: a.onrate }] : []),
                (c._onseek = a.onseek ? [{ fn: a.onseek }] : []),
                (c._onunlock = a.onunlock ? [{ fn: a.onunlock }] : []),
                (c._onresume = []),
                (c._webAudio = e.usingWebAudio && !c._html5),
                typeof e.ctx < "u" && e.ctx && e.autoUnlock && e._unlockAudio(),
                e._howls.push(c),
                c._autoplay &&
                  c._queue.push({
                    event: "play",
                    action: function () {
                      c.play();
                    },
                  }),
                c._preload && c._preload !== "none" && c.load(),
                c
              );
            },
            load: function () {
              var a = this,
                c = null;
              if (e.noAudio) {
                a._emit("loaderror", null, "No audio support.");
                return;
              }
              typeof a._src == "string" && (a._src = [a._src]);
              for (var u = 0; u < a._src.length; u++) {
                var g, y;
                if (a._format && a._format[u]) g = a._format[u];
                else {
                  if (((y = a._src[u]), typeof y != "string")) {
                    a._emit(
                      "loaderror",
                      null,
                      "Non-string found in selected audio sources - ignoring.",
                    );
                    continue;
                  }
                  (g = /^data:audio\/([^;,]+);/i.exec(y)),
                    g || (g = /\.([^.]+)$/.exec(y.split("?", 1)[0])),
                    g && (g = g[1].toLowerCase());
                }
                if (
                  (g ||
                    console.warn(
                      'No file extension was found. Consider using the "format" property or specify an extension.',
                    ),
                  g && e.codecs(g))
                ) {
                  c = a._src[u];
                  break;
                }
              }
              if (!c) {
                a._emit(
                  "loaderror",
                  null,
                  "No codec support for selected audio sources.",
                );
                return;
              }
              return (
                (a._src = c),
                (a._state = "loading"),
                window.location.protocol === "https:" &&
                  c.slice(0, 5) === "http:" &&
                  ((a._html5 = !0), (a._webAudio = !1)),
                new n(a),
                a._webAudio && o(a),
                a
              );
            },
            play: function (a, c) {
              var u = this,
                g = null;
              if (typeof a == "number") (g = a), (a = null);
              else {
                if (
                  typeof a == "string" &&
                  u._state === "loaded" &&
                  !u._sprite[a]
                )
                  return null;
                if (typeof a > "u" && ((a = "__default"), !u._playLock)) {
                  for (var y = 0, m = 0; m < u._sounds.length; m++)
                    u._sounds[m]._paused &&
                      !u._sounds[m]._ended &&
                      (y++, (g = u._sounds[m]._id));
                  y === 1 ? (a = null) : (g = null);
                }
              }
              var C = g ? u._soundById(g) : u._inactiveSound();
              if (!C) return null;
              if (
                (g && !a && (a = C._sprite || "__default"),
                u._state !== "loaded")
              ) {
                (C._sprite = a), (C._ended = !1);
                var w = C._id;
                return (
                  u._queue.push({
                    event: "play",
                    action: function () {
                      u.play(w);
                    },
                  }),
                  w
                );
              }
              if (g && !C._paused) return c || u._loadQueue("play"), C._id;
              u._webAudio && e._autoResume();
              var E = Math.max(
                  0,
                  C._seek > 0 ? C._seek : u._sprite[a][0] / 1e3,
                ),
                I = Math.max(0, (u._sprite[a][0] + u._sprite[a][1]) / 1e3 - E),
                U = (I * 1e3) / Math.abs(C._rate),
                D = u._sprite[a][0] / 1e3,
                F = (u._sprite[a][0] + u._sprite[a][1]) / 1e3;
              (C._sprite = a), (C._ended = !1);
              var W = function () {
                (C._paused = !1),
                  (C._seek = E),
                  (C._start = D),
                  (C._stop = F),
                  (C._loop = !!(C._loop || u._sprite[a][2]));
              };
              if (E >= F) {
                u._ended(C);
                return;
              }
              var O = C._node;
              if (u._webAudio) {
                var L = function () {
                  (u._playLock = !1), W(), u._refreshBuffer(C);
                  var ft = C._muted || u._muted ? 0 : C._volume;
                  O.gain.setValueAtTime(ft, e.ctx.currentTime),
                    (C._playStart = e.ctx.currentTime),
                    typeof O.bufferSource.start > "u"
                      ? C._loop
                        ? O.bufferSource.noteGrainOn(0, E, 86400)
                        : O.bufferSource.noteGrainOn(0, E, I)
                      : C._loop
                        ? O.bufferSource.start(0, E, 86400)
                        : O.bufferSource.start(0, E, I),
                    U !== 1 / 0 &&
                      (u._endTimers[C._id] = setTimeout(
                        u._ended.bind(u, C),
                        U,
                      )),
                    c ||
                      setTimeout(function () {
                        u._emit("play", C._id), u._loadQueue();
                      }, 0);
                };
                e.state === "running" && e.ctx.state !== "interrupted"
                  ? L()
                  : ((u._playLock = !0),
                    u.once("resume", L),
                    u._clearTimer(C._id));
              } else {
                var z = function () {
                  (O.currentTime = E),
                    (O.muted = C._muted || u._muted || e._muted || O.muted),
                    (O.volume = C._volume * e.volume()),
                    (O.playbackRate = C._rate);
                  try {
                    var ft = O.play();
                    if (
                      (ft &&
                      typeof Promise < "u" &&
                      (ft instanceof Promise || typeof ft.then == "function")
                        ? ((u._playLock = !0),
                          W(),
                          ft
                            .then(function () {
                              (u._playLock = !1),
                                (O._unlocked = !0),
                                c ? u._loadQueue() : u._emit("play", C._id);
                            })
                            .catch(function () {
                              (u._playLock = !1),
                                u._emit(
                                  "playerror",
                                  C._id,
                                  "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.",
                                ),
                                (C._ended = !0),
                                (C._paused = !0);
                            }))
                        : c ||
                          ((u._playLock = !1), W(), u._emit("play", C._id)),
                      (O.playbackRate = C._rate),
                      O.paused)
                    ) {
                      u._emit(
                        "playerror",
                        C._id,
                        "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.",
                      );
                      return;
                    }
                    a !== "__default" || C._loop
                      ? (u._endTimers[C._id] = setTimeout(
                          u._ended.bind(u, C),
                          U,
                        ))
                      : ((u._endTimers[C._id] = function () {
                          u._ended(C),
                            O.removeEventListener(
                              "ended",
                              u._endTimers[C._id],
                              !1,
                            );
                        }),
                        O.addEventListener("ended", u._endTimers[C._id], !1));
                  } catch (_t) {
                    u._emit("playerror", C._id, _t);
                  }
                };
                O.src ===
                  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" &&
                  ((O.src = u._src), O.load());
                var ht =
                  (window && window.ejecta) ||
                  (!O.readyState && e._navigator.isCocoonJS);
                if (O.readyState >= 3 || ht) z();
                else {
                  (u._playLock = !0), (u._state = "loading");
                  var st = function () {
                    (u._state = "loaded"),
                      z(),
                      O.removeEventListener(e._canPlayEvent, st, !1);
                  };
                  O.addEventListener(e._canPlayEvent, st, !1),
                    u._clearTimer(C._id);
                }
              }
              return C._id;
            },
            pause: function (a) {
              var c = this;
              if (c._state !== "loaded" || c._playLock)
                return (
                  c._queue.push({
                    event: "pause",
                    action: function () {
                      c.pause(a);
                    },
                  }),
                  c
                );
              for (var u = c._getSoundIds(a), g = 0; g < u.length; g++) {
                c._clearTimer(u[g]);
                var y = c._soundById(u[g]);
                if (
                  y &&
                  !y._paused &&
                  ((y._seek = c.seek(u[g])),
                  (y._rateSeek = 0),
                  (y._paused = !0),
                  c._stopFade(u[g]),
                  y._node)
                )
                  if (c._webAudio) {
                    if (!y._node.bufferSource) continue;
                    typeof y._node.bufferSource.stop > "u"
                      ? y._node.bufferSource.noteOff(0)
                      : y._node.bufferSource.stop(0),
                      c._cleanBuffer(y._node);
                  } else
                    (!isNaN(y._node.duration) || y._node.duration === 1 / 0) &&
                      y._node.pause();
                arguments[1] || c._emit("pause", y ? y._id : null);
              }
              return c;
            },
            stop: function (a, c) {
              var u = this;
              if (u._state !== "loaded" || u._playLock)
                return (
                  u._queue.push({
                    event: "stop",
                    action: function () {
                      u.stop(a);
                    },
                  }),
                  u
                );
              for (var g = u._getSoundIds(a), y = 0; y < g.length; y++) {
                u._clearTimer(g[y]);
                var m = u._soundById(g[y]);
                m &&
                  ((m._seek = m._start || 0),
                  (m._rateSeek = 0),
                  (m._paused = !0),
                  (m._ended = !0),
                  u._stopFade(g[y]),
                  m._node &&
                    (u._webAudio
                      ? m._node.bufferSource &&
                        (typeof m._node.bufferSource.stop > "u"
                          ? m._node.bufferSource.noteOff(0)
                          : m._node.bufferSource.stop(0),
                        u._cleanBuffer(m._node))
                      : (!isNaN(m._node.duration) ||
                          m._node.duration === 1 / 0) &&
                        ((m._node.currentTime = m._start || 0),
                        m._node.pause(),
                        m._node.duration === 1 / 0 && u._clearSound(m._node))),
                  c || u._emit("stop", m._id));
              }
              return u;
            },
            mute: function (a, c) {
              var u = this;
              if (u._state !== "loaded" || u._playLock)
                return (
                  u._queue.push({
                    event: "mute",
                    action: function () {
                      u.mute(a, c);
                    },
                  }),
                  u
                );
              if (typeof c > "u")
                if (typeof a == "boolean") u._muted = a;
                else return u._muted;
              for (var g = u._getSoundIds(c), y = 0; y < g.length; y++) {
                var m = u._soundById(g[y]);
                m &&
                  ((m._muted = a),
                  m._interval && u._stopFade(m._id),
                  u._webAudio && m._node
                    ? m._node.gain.setValueAtTime(
                        a ? 0 : m._volume,
                        e.ctx.currentTime,
                      )
                    : m._node && (m._node.muted = e._muted ? !0 : a),
                  u._emit("mute", m._id));
              }
              return u;
            },
            volume: function () {
              var a = this,
                c = arguments,
                u,
                g;
              if (c.length === 0) return a._volume;
              if (c.length === 1 || (c.length === 2 && typeof c[1] > "u")) {
                var y = a._getSoundIds(),
                  m = y.indexOf(c[0]);
                m >= 0 ? (g = parseInt(c[0], 10)) : (u = parseFloat(c[0]));
              } else
                c.length >= 2 &&
                  ((u = parseFloat(c[0])), (g = parseInt(c[1], 10)));
              var C;
              if (typeof u < "u" && u >= 0 && u <= 1) {
                if (a._state !== "loaded" || a._playLock)
                  return (
                    a._queue.push({
                      event: "volume",
                      action: function () {
                        a.volume.apply(a, c);
                      },
                    }),
                    a
                  );
                typeof g > "u" && (a._volume = u), (g = a._getSoundIds(g));
                for (var w = 0; w < g.length; w++)
                  (C = a._soundById(g[w])),
                    C &&
                      ((C._volume = u),
                      c[2] || a._stopFade(g[w]),
                      a._webAudio && C._node && !C._muted
                        ? C._node.gain.setValueAtTime(u, e.ctx.currentTime)
                        : C._node &&
                          !C._muted &&
                          (C._node.volume = u * e.volume()),
                      a._emit("volume", C._id));
              } else
                return (
                  (C = g ? a._soundById(g) : a._sounds[0]), C ? C._volume : 0
                );
              return a;
            },
            fade: function (a, c, u, g) {
              var y = this;
              if (y._state !== "loaded" || y._playLock)
                return (
                  y._queue.push({
                    event: "fade",
                    action: function () {
                      y.fade(a, c, u, g);
                    },
                  }),
                  y
                );
              (a = Math.min(Math.max(0, parseFloat(a)), 1)),
                (c = Math.min(Math.max(0, parseFloat(c)), 1)),
                (u = parseFloat(u)),
                y.volume(a, g);
              for (var m = y._getSoundIds(g), C = 0; C < m.length; C++) {
                var w = y._soundById(m[C]);
                if (w) {
                  if ((g || y._stopFade(m[C]), y._webAudio && !w._muted)) {
                    var E = e.ctx.currentTime,
                      I = E + u / 1e3;
                    (w._volume = a),
                      w._node.gain.setValueAtTime(a, E),
                      w._node.gain.linearRampToValueAtTime(c, I);
                  }
                  y._startFadeInterval(w, a, c, u, m[C], typeof g > "u");
                }
              }
              return y;
            },
            _startFadeInterval: function (a, c, u, g, y, m) {
              var C = this,
                w = c,
                E = u - c,
                I = Math.abs(E / 0.01),
                U = Math.max(4, I > 0 ? g / I : g),
                D = Date.now();
              (a._fadeTo = u),
                (a._interval = setInterval(function () {
                  var F = (Date.now() - D) / g;
                  (D = Date.now()),
                    (w += E * F),
                    (w = Math.round(w * 100) / 100),
                    E < 0 ? (w = Math.max(u, w)) : (w = Math.min(u, w)),
                    C._webAudio ? (a._volume = w) : C.volume(w, a._id, !0),
                    m && (C._volume = w),
                    ((u < c && w <= u) || (u > c && w >= u)) &&
                      (clearInterval(a._interval),
                      (a._interval = null),
                      (a._fadeTo = null),
                      C.volume(u, a._id),
                      C._emit("fade", a._id));
                }, U));
            },
            _stopFade: function (a) {
              var c = this,
                u = c._soundById(a);
              return (
                u &&
                  u._interval &&
                  (c._webAudio &&
                    u._node.gain.cancelScheduledValues(e.ctx.currentTime),
                  clearInterval(u._interval),
                  (u._interval = null),
                  c.volume(u._fadeTo, a),
                  (u._fadeTo = null),
                  c._emit("fade", a)),
                c
              );
            },
            loop: function () {
              var a = this,
                c = arguments,
                u,
                g,
                y;
              if (c.length === 0) return a._loop;
              if (c.length === 1)
                if (typeof c[0] == "boolean") (u = c[0]), (a._loop = u);
                else
                  return (
                    (y = a._soundById(parseInt(c[0], 10))), y ? y._loop : !1
                  );
              else c.length === 2 && ((u = c[0]), (g = parseInt(c[1], 10)));
              for (var m = a._getSoundIds(g), C = 0; C < m.length; C++)
                (y = a._soundById(m[C])),
                  y &&
                    ((y._loop = u),
                    a._webAudio &&
                      y._node &&
                      y._node.bufferSource &&
                      ((y._node.bufferSource.loop = u),
                      u &&
                        ((y._node.bufferSource.loopStart = y._start || 0),
                        (y._node.bufferSource.loopEnd = y._stop),
                        a.playing(m[C]) &&
                          (a.pause(m[C], !0), a.play(m[C], !0)))));
              return a;
            },
            rate: function () {
              var a = this,
                c = arguments,
                u,
                g;
              if (c.length === 0) g = a._sounds[0]._id;
              else if (c.length === 1) {
                var y = a._getSoundIds(),
                  m = y.indexOf(c[0]);
                m >= 0 ? (g = parseInt(c[0], 10)) : (u = parseFloat(c[0]));
              } else
                c.length === 2 &&
                  ((u = parseFloat(c[0])), (g = parseInt(c[1], 10)));
              var C;
              if (typeof u == "number") {
                if (a._state !== "loaded" || a._playLock)
                  return (
                    a._queue.push({
                      event: "rate",
                      action: function () {
                        a.rate.apply(a, c);
                      },
                    }),
                    a
                  );
                typeof g > "u" && (a._rate = u), (g = a._getSoundIds(g));
                for (var w = 0; w < g.length; w++)
                  if (((C = a._soundById(g[w])), C)) {
                    a.playing(g[w]) &&
                      ((C._rateSeek = a.seek(g[w])),
                      (C._playStart = a._webAudio
                        ? e.ctx.currentTime
                        : C._playStart)),
                      (C._rate = u),
                      a._webAudio && C._node && C._node.bufferSource
                        ? C._node.bufferSource.playbackRate.setValueAtTime(
                            u,
                            e.ctx.currentTime,
                          )
                        : C._node && (C._node.playbackRate = u);
                    var E = a.seek(g[w]),
                      I =
                        (a._sprite[C._sprite][0] + a._sprite[C._sprite][1]) /
                          1e3 -
                        E,
                      U = (I * 1e3) / Math.abs(C._rate);
                    (a._endTimers[g[w]] || !C._paused) &&
                      (a._clearTimer(g[w]),
                      (a._endTimers[g[w]] = setTimeout(
                        a._ended.bind(a, C),
                        U,
                      ))),
                      a._emit("rate", C._id);
                  }
              } else return (C = a._soundById(g)), C ? C._rate : a._rate;
              return a;
            },
            seek: function () {
              var a = this,
                c = arguments,
                u,
                g;
              if (c.length === 0) a._sounds.length && (g = a._sounds[0]._id);
              else if (c.length === 1) {
                var y = a._getSoundIds(),
                  m = y.indexOf(c[0]);
                m >= 0
                  ? (g = parseInt(c[0], 10))
                  : a._sounds.length &&
                    ((g = a._sounds[0]._id), (u = parseFloat(c[0])));
              } else
                c.length === 2 &&
                  ((u = parseFloat(c[0])), (g = parseInt(c[1], 10)));
              if (typeof g > "u") return 0;
              if (
                typeof u == "number" &&
                (a._state !== "loaded" || a._playLock)
              )
                return (
                  a._queue.push({
                    event: "seek",
                    action: function () {
                      a.seek.apply(a, c);
                    },
                  }),
                  a
                );
              var C = a._soundById(g);
              if (C)
                if (typeof u == "number" && u >= 0) {
                  var w = a.playing(g);
                  w && a.pause(g, !0),
                    (C._seek = u),
                    (C._ended = !1),
                    a._clearTimer(g),
                    !a._webAudio &&
                      C._node &&
                      !isNaN(C._node.duration) &&
                      (C._node.currentTime = u);
                  var E = function () {
                    w && a.play(g, !0), a._emit("seek", g);
                  };
                  if (w && !a._webAudio) {
                    var I = function () {
                      a._playLock ? setTimeout(I, 0) : E();
                    };
                    setTimeout(I, 0);
                  } else E();
                } else if (a._webAudio) {
                  var U = a.playing(g) ? e.ctx.currentTime - C._playStart : 0,
                    D = C._rateSeek ? C._rateSeek - C._seek : 0;
                  return C._seek + (D + U * Math.abs(C._rate));
                } else return C._node.currentTime;
              return a;
            },
            playing: function (a) {
              var c = this;
              if (typeof a == "number") {
                var u = c._soundById(a);
                return u ? !u._paused : !1;
              }
              for (var g = 0; g < c._sounds.length; g++)
                if (!c._sounds[g]._paused) return !0;
              return !1;
            },
            duration: function (a) {
              var c = this,
                u = c._duration,
                g = c._soundById(a);
              return g && (u = c._sprite[g._sprite][1] / 1e3), u;
            },
            state: function () {
              return this._state;
            },
            unload: function () {
              for (var a = this, c = a._sounds, u = 0; u < c.length; u++)
                c[u]._paused || a.stop(c[u]._id),
                  a._webAudio ||
                    (a._clearSound(c[u]._node),
                    c[u]._node.removeEventListener("error", c[u]._errorFn, !1),
                    c[u]._node.removeEventListener(
                      e._canPlayEvent,
                      c[u]._loadFn,
                      !1,
                    ),
                    c[u]._node.removeEventListener("ended", c[u]._endFn, !1),
                    e._releaseHtml5Audio(c[u]._node)),
                  delete c[u]._node,
                  a._clearTimer(c[u]._id);
              var g = e._howls.indexOf(a);
              g >= 0 && e._howls.splice(g, 1);
              var y = !0;
              for (u = 0; u < e._howls.length; u++)
                if (
                  e._howls[u]._src === a._src ||
                  a._src.indexOf(e._howls[u]._src) >= 0
                ) {
                  y = !1;
                  break;
                }
              return (
                r && y && delete r[a._src],
                (e.noAudio = !1),
                (a._state = "unloaded"),
                (a._sounds = []),
                (a = null),
                null
              );
            },
            on: function (a, c, u, g) {
              var y = this,
                m = y["_on" + a];
              return (
                typeof c == "function" &&
                  m.push(g ? { id: u, fn: c, once: g } : { id: u, fn: c }),
                y
              );
            },
            off: function (a, c, u) {
              var g = this,
                y = g["_on" + a],
                m = 0;
              if ((typeof c == "number" && ((u = c), (c = null)), c || u))
                for (m = 0; m < y.length; m++) {
                  var C = u === y[m].id;
                  if ((c === y[m].fn && C) || (!c && C)) {
                    y.splice(m, 1);
                    break;
                  }
                }
              else if (a) g["_on" + a] = [];
              else {
                var w = Object.keys(g);
                for (m = 0; m < w.length; m++)
                  w[m].indexOf("_on") === 0 &&
                    Array.isArray(g[w[m]]) &&
                    (g[w[m]] = []);
              }
              return g;
            },
            once: function (a, c, u) {
              var g = this;
              return g.on(a, c, u, 1), g;
            },
            _emit: function (a, c, u) {
              for (
                var g = this, y = g["_on" + a], m = y.length - 1;
                m >= 0;
                m--
              )
                (!y[m].id || y[m].id === c || a === "load") &&
                  (setTimeout(
                    function (C) {
                      C.call(this, c, u);
                    }.bind(g, y[m].fn),
                    0,
                  ),
                  y[m].once && g.off(a, y[m].fn, y[m].id));
              return g._loadQueue(a), g;
            },
            _loadQueue: function (a) {
              var c = this;
              if (c._queue.length > 0) {
                var u = c._queue[0];
                u.event === a && (c._queue.shift(), c._loadQueue()),
                  a || u.action();
              }
              return c;
            },
            _ended: function (a) {
              var c = this,
                u = a._sprite;
              if (
                !c._webAudio &&
                a._node &&
                !a._node.paused &&
                !a._node.ended &&
                a._node.currentTime < a._stop
              )
                return setTimeout(c._ended.bind(c, a), 100), c;
              var g = !!(a._loop || c._sprite[u][2]);
              if (
                (c._emit("end", a._id),
                !c._webAudio && g && c.stop(a._id, !0).play(a._id),
                c._webAudio && g)
              ) {
                c._emit("play", a._id),
                  (a._seek = a._start || 0),
                  (a._rateSeek = 0),
                  (a._playStart = e.ctx.currentTime);
                var y = ((a._stop - a._start) * 1e3) / Math.abs(a._rate);
                c._endTimers[a._id] = setTimeout(c._ended.bind(c, a), y);
              }
              return (
                c._webAudio &&
                  !g &&
                  ((a._paused = !0),
                  (a._ended = !0),
                  (a._seek = a._start || 0),
                  (a._rateSeek = 0),
                  c._clearTimer(a._id),
                  c._cleanBuffer(a._node),
                  e._autoSuspend()),
                !c._webAudio && !g && c.stop(a._id, !0),
                c
              );
            },
            _clearTimer: function (a) {
              var c = this;
              if (c._endTimers[a]) {
                if (typeof c._endTimers[a] != "function")
                  clearTimeout(c._endTimers[a]);
                else {
                  var u = c._soundById(a);
                  u &&
                    u._node &&
                    u._node.removeEventListener("ended", c._endTimers[a], !1);
                }
                delete c._endTimers[a];
              }
              return c;
            },
            _soundById: function (a) {
              for (var c = this, u = 0; u < c._sounds.length; u++)
                if (a === c._sounds[u]._id) return c._sounds[u];
              return null;
            },
            _inactiveSound: function () {
              var a = this;
              a._drain();
              for (var c = 0; c < a._sounds.length; c++)
                if (a._sounds[c]._ended) return a._sounds[c].reset();
              return new n(a);
            },
            _drain: function () {
              var a = this,
                c = a._pool,
                u = 0,
                g = 0;
              if (!(a._sounds.length < c)) {
                for (g = 0; g < a._sounds.length; g++)
                  a._sounds[g]._ended && u++;
                for (g = a._sounds.length - 1; g >= 0; g--) {
                  if (u <= c) return;
                  a._sounds[g]._ended &&
                    (a._webAudio &&
                      a._sounds[g]._node &&
                      a._sounds[g]._node.disconnect(0),
                    a._sounds.splice(g, 1),
                    u--);
                }
              }
            },
            _getSoundIds: function (a) {
              var c = this;
              if (typeof a > "u") {
                for (var u = [], g = 0; g < c._sounds.length; g++)
                  u.push(c._sounds[g]._id);
                return u;
              } else return [a];
            },
            _refreshBuffer: function (a) {
              var c = this;
              return (
                (a._node.bufferSource = e.ctx.createBufferSource()),
                (a._node.bufferSource.buffer = r[c._src]),
                a._panner
                  ? a._node.bufferSource.connect(a._panner)
                  : a._node.bufferSource.connect(a._node),
                (a._node.bufferSource.loop = a._loop),
                a._loop &&
                  ((a._node.bufferSource.loopStart = a._start || 0),
                  (a._node.bufferSource.loopEnd = a._stop || 0)),
                a._node.bufferSource.playbackRate.setValueAtTime(
                  a._rate,
                  e.ctx.currentTime,
                ),
                c
              );
            },
            _cleanBuffer: function (a) {
              var c = this,
                u = e._navigator && e._navigator.vendor.indexOf("Apple") >= 0;
              if (!a.bufferSource) return c;
              if (
                e._scratchBuffer &&
                a.bufferSource &&
                ((a.bufferSource.onended = null),
                a.bufferSource.disconnect(0),
                u)
              )
                try {
                  a.bufferSource.buffer = e._scratchBuffer;
                } catch {}
              return (a.bufferSource = null), c;
            },
            _clearSound: function (a) {
              var c = /MSIE |Trident\//.test(
                e._navigator && e._navigator.userAgent,
              );
              c ||
                (a.src =
                  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
            },
          };
          var n = function (a) {
            (this._parent = a), this.init();
          };
          n.prototype = {
            init: function () {
              var a = this,
                c = a._parent;
              return (
                (a._muted = c._muted),
                (a._loop = c._loop),
                (a._volume = c._volume),
                (a._rate = c._rate),
                (a._seek = 0),
                (a._paused = !0),
                (a._ended = !0),
                (a._sprite = "__default"),
                (a._id = ++e._counter),
                c._sounds.push(a),
                a.create(),
                a
              );
            },
            create: function () {
              var a = this,
                c = a._parent,
                u = e._muted || a._muted || a._parent._muted ? 0 : a._volume;
              return (
                c._webAudio
                  ? ((a._node =
                      typeof e.ctx.createGain > "u"
                        ? e.ctx.createGainNode()
                        : e.ctx.createGain()),
                    a._node.gain.setValueAtTime(u, e.ctx.currentTime),
                    (a._node.paused = !0),
                    a._node.connect(e.masterGain))
                  : e.noAudio ||
                    ((a._node = e._obtainHtml5Audio()),
                    (a._errorFn = a._errorListener.bind(a)),
                    a._node.addEventListener("error", a._errorFn, !1),
                    (a._loadFn = a._loadListener.bind(a)),
                    a._node.addEventListener(e._canPlayEvent, a._loadFn, !1),
                    (a._endFn = a._endListener.bind(a)),
                    a._node.addEventListener("ended", a._endFn, !1),
                    (a._node.src = c._src),
                    (a._node.preload = c._preload === !0 ? "auto" : c._preload),
                    (a._node.volume = u * e.volume()),
                    a._node.load()),
                a
              );
            },
            reset: function () {
              var a = this,
                c = a._parent;
              return (
                (a._muted = c._muted),
                (a._loop = c._loop),
                (a._volume = c._volume),
                (a._rate = c._rate),
                (a._seek = 0),
                (a._rateSeek = 0),
                (a._paused = !0),
                (a._ended = !0),
                (a._sprite = "__default"),
                (a._id = ++e._counter),
                a
              );
            },
            _errorListener: function () {
              var a = this;
              a._parent._emit(
                "loaderror",
                a._id,
                a._node.error ? a._node.error.code : 0,
              ),
                a._node.removeEventListener("error", a._errorFn, !1);
            },
            _loadListener: function () {
              var a = this,
                c = a._parent;
              (c._duration = Math.ceil(a._node.duration * 10) / 10),
                Object.keys(c._sprite).length === 0 &&
                  (c._sprite = { __default: [0, c._duration * 1e3] }),
                c._state !== "loaded" &&
                  ((c._state = "loaded"), c._emit("load"), c._loadQueue()),
                a._node.removeEventListener(e._canPlayEvent, a._loadFn, !1);
            },
            _endListener: function () {
              var a = this,
                c = a._parent;
              c._duration === 1 / 0 &&
                ((c._duration = Math.ceil(a._node.duration * 10) / 10),
                c._sprite.__default[1] === 1 / 0 &&
                  (c._sprite.__default[1] = c._duration * 1e3),
                c._ended(a)),
                a._node.removeEventListener("ended", a._endFn, !1);
            },
          };
          var r = {},
            o = function (a) {
              var c = a._src;
              if (r[c]) {
                (a._duration = r[c].duration), l(a);
                return;
              }
              if (/^data:[^;]+;base64,/.test(c)) {
                for (
                  var u = atob(c.split(",")[1]),
                    g = new Uint8Array(u.length),
                    y = 0;
                  y < u.length;
                  ++y
                )
                  g[y] = u.charCodeAt(y);
                h(g.buffer, a);
              } else {
                var m = new XMLHttpRequest();
                m.open(a._xhr.method, c, !0),
                  (m.withCredentials = a._xhr.withCredentials),
                  (m.responseType = "arraybuffer"),
                  a._xhr.headers &&
                    Object.keys(a._xhr.headers).forEach(function (C) {
                      m.setRequestHeader(C, a._xhr.headers[C]);
                    }),
                  (m.onload = function () {
                    var C = (m.status + "")[0];
                    if (C !== "0" && C !== "2" && C !== "3") {
                      a._emit(
                        "loaderror",
                        null,
                        "Failed loading audio file with status: " +
                          m.status +
                          ".",
                      );
                      return;
                    }
                    h(m.response, a);
                  }),
                  (m.onerror = function () {
                    a._webAudio &&
                      ((a._html5 = !0),
                      (a._webAudio = !1),
                      (a._sounds = []),
                      delete r[c],
                      a.load());
                  }),
                  A(m);
              }
            },
            A = function (a) {
              try {
                a.send();
              } catch {
                a.onerror();
              }
            },
            h = function (a, c) {
              var u = function () {
                  c._emit("loaderror", null, "Decoding audio data failed.");
                },
                g = function (y) {
                  y && c._sounds.length > 0 ? ((r[c._src] = y), l(c, y)) : u();
                };
              typeof Promise < "u" && e.ctx.decodeAudioData.length === 1
                ? e.ctx.decodeAudioData(a).then(g).catch(u)
                : e.ctx.decodeAudioData(a, g, u);
            },
            l = function (a, c) {
              c && !a._duration && (a._duration = c.duration),
                Object.keys(a._sprite).length === 0 &&
                  (a._sprite = { __default: [0, a._duration * 1e3] }),
                a._state !== "loaded" &&
                  ((a._state = "loaded"), a._emit("load"), a._loadQueue());
            },
            d = function () {
              if (e.usingWebAudio) {
                try {
                  typeof AudioContext < "u"
                    ? (e.ctx = new AudioContext())
                    : typeof webkitAudioContext < "u"
                      ? (e.ctx = new webkitAudioContext())
                      : (e.usingWebAudio = !1);
                } catch {
                  e.usingWebAudio = !1;
                }
                e.ctx || (e.usingWebAudio = !1);
                var a = /iP(hone|od|ad)/.test(
                    e._navigator && e._navigator.platform,
                  ),
                  c =
                    e._navigator &&
                    e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                  u = c ? parseInt(c[1], 10) : null;
                if (a && u && u < 9) {
                  var g = /safari/.test(
                    e._navigator && e._navigator.userAgent.toLowerCase(),
                  );
                  e._navigator && !g && (e.usingWebAudio = !1);
                }
                e.usingWebAudio &&
                  ((e.masterGain =
                    typeof e.ctx.createGain > "u"
                      ? e.ctx.createGainNode()
                      : e.ctx.createGain()),
                  e.masterGain.gain.setValueAtTime(
                    e._muted ? 0 : e._volume,
                    e.ctx.currentTime,
                  ),
                  e.masterGain.connect(e.ctx.destination)),
                  e._setup();
              }
            };
          (i.Howler = e),
            (i.Howl = s),
            typeof $e < "u"
              ? (($e.HowlerGlobal = t),
                ($e.Howler = e),
                ($e.Howl = s),
                ($e.Sound = n))
              : typeof window < "u" &&
                ((window.HowlerGlobal = t),
                (window.Howler = e),
                (window.Howl = s),
                (window.Sound = n));
        })();
        /*!
         *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
         *
         *  howler.js v2.2.4
         *  howlerjs.com
         *
         *  (c) 2013-2020, James Simpson of GoldFire Studios
         *  goldfirestudios.com
         *
         *  MIT License
         */ (function () {
          (HowlerGlobal.prototype._pos = [0, 0, 0]),
            (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
            (HowlerGlobal.prototype.stereo = function (e) {
              var s = this;
              if (!s.ctx || !s.ctx.listener) return s;
              for (var n = s._howls.length - 1; n >= 0; n--)
                s._howls[n].stereo(e);
              return s;
            }),
            (HowlerGlobal.prototype.pos = function (e, s, n) {
              var r = this;
              if (!r.ctx || !r.ctx.listener) return r;
              if (
                ((s = typeof s != "number" ? r._pos[1] : s),
                (n = typeof n != "number" ? r._pos[2] : n),
                typeof e == "number")
              )
                (r._pos = [e, s, n]),
                  typeof r.ctx.listener.positionX < "u"
                    ? (r.ctx.listener.positionX.setTargetAtTime(
                        r._pos[0],
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      r.ctx.listener.positionY.setTargetAtTime(
                        r._pos[1],
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      r.ctx.listener.positionZ.setTargetAtTime(
                        r._pos[2],
                        Howler.ctx.currentTime,
                        0.1,
                      ))
                    : r.ctx.listener.setPosition(
                        r._pos[0],
                        r._pos[1],
                        r._pos[2],
                      );
              else return r._pos;
              return r;
            }),
            (HowlerGlobal.prototype.orientation = function (e, s, n, r, o, A) {
              var h = this;
              if (!h.ctx || !h.ctx.listener) return h;
              var l = h._orientation;
              if (
                ((s = typeof s != "number" ? l[1] : s),
                (n = typeof n != "number" ? l[2] : n),
                (r = typeof r != "number" ? l[3] : r),
                (o = typeof o != "number" ? l[4] : o),
                (A = typeof A != "number" ? l[5] : A),
                typeof e == "number")
              )
                (h._orientation = [e, s, n, r, o, A]),
                  typeof h.ctx.listener.forwardX < "u"
                    ? (h.ctx.listener.forwardX.setTargetAtTime(
                        e,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      h.ctx.listener.forwardY.setTargetAtTime(
                        s,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      h.ctx.listener.forwardZ.setTargetAtTime(
                        n,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      h.ctx.listener.upX.setTargetAtTime(
                        r,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      h.ctx.listener.upY.setTargetAtTime(
                        o,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      h.ctx.listener.upZ.setTargetAtTime(
                        A,
                        Howler.ctx.currentTime,
                        0.1,
                      ))
                    : h.ctx.listener.setOrientation(e, s, n, r, o, A);
              else return l;
              return h;
            }),
            (Howl.prototype.init = (function (e) {
              return function (s) {
                var n = this;
                return (
                  (n._orientation = s.orientation || [1, 0, 0]),
                  (n._stereo = s.stereo || null),
                  (n._pos = s.pos || null),
                  (n._pannerAttr = {
                    coneInnerAngle:
                      typeof s.coneInnerAngle < "u" ? s.coneInnerAngle : 360,
                    coneOuterAngle:
                      typeof s.coneOuterAngle < "u" ? s.coneOuterAngle : 360,
                    coneOuterGain:
                      typeof s.coneOuterGain < "u" ? s.coneOuterGain : 0,
                    distanceModel:
                      typeof s.distanceModel < "u"
                        ? s.distanceModel
                        : "inverse",
                    maxDistance:
                      typeof s.maxDistance < "u" ? s.maxDistance : 1e4,
                    panningModel:
                      typeof s.panningModel < "u" ? s.panningModel : "HRTF",
                    refDistance: typeof s.refDistance < "u" ? s.refDistance : 1,
                    rolloffFactor:
                      typeof s.rolloffFactor < "u" ? s.rolloffFactor : 1,
                  }),
                  (n._onstereo = s.onstereo ? [{ fn: s.onstereo }] : []),
                  (n._onpos = s.onpos ? [{ fn: s.onpos }] : []),
                  (n._onorientation = s.onorientation
                    ? [{ fn: s.onorientation }]
                    : []),
                  e.call(this, s)
                );
              };
            })(Howl.prototype.init)),
            (Howl.prototype.stereo = function (e, s) {
              var n = this;
              if (!n._webAudio) return n;
              if (n._state !== "loaded")
                return (
                  n._queue.push({
                    event: "stereo",
                    action: function () {
                      n.stereo(e, s);
                    },
                  }),
                  n
                );
              var r =
                typeof Howler.ctx.createStereoPanner > "u"
                  ? "spatial"
                  : "stereo";
              if (typeof s > "u")
                if (typeof e == "number") (n._stereo = e), (n._pos = [e, 0, 0]);
                else return n._stereo;
              for (var o = n._getSoundIds(s), A = 0; A < o.length; A++) {
                var h = n._soundById(o[A]);
                if (h)
                  if (typeof e == "number")
                    (h._stereo = e),
                      (h._pos = [e, 0, 0]),
                      h._node &&
                        ((h._pannerAttr.panningModel = "equalpower"),
                        (!h._panner || !h._panner.pan) && t(h, r),
                        r === "spatial"
                          ? typeof h._panner.positionX < "u"
                            ? (h._panner.positionX.setValueAtTime(
                                e,
                                Howler.ctx.currentTime,
                              ),
                              h._panner.positionY.setValueAtTime(
                                0,
                                Howler.ctx.currentTime,
                              ),
                              h._panner.positionZ.setValueAtTime(
                                0,
                                Howler.ctx.currentTime,
                              ))
                            : h._panner.setPosition(e, 0, 0)
                          : h._panner.pan.setValueAtTime(
                              e,
                              Howler.ctx.currentTime,
                            )),
                      n._emit("stereo", h._id);
                  else return h._stereo;
              }
              return n;
            }),
            (Howl.prototype.pos = function (e, s, n, r) {
              var o = this;
              if (!o._webAudio) return o;
              if (o._state !== "loaded")
                return (
                  o._queue.push({
                    event: "pos",
                    action: function () {
                      o.pos(e, s, n, r);
                    },
                  }),
                  o
                );
              if (
                ((s = typeof s != "number" ? 0 : s),
                (n = typeof n != "number" ? -0.5 : n),
                typeof r > "u")
              )
                if (typeof e == "number") o._pos = [e, s, n];
                else return o._pos;
              for (var A = o._getSoundIds(r), h = 0; h < A.length; h++) {
                var l = o._soundById(A[h]);
                if (l)
                  if (typeof e == "number")
                    (l._pos = [e, s, n]),
                      l._node &&
                        ((!l._panner || l._panner.pan) && t(l, "spatial"),
                        typeof l._panner.positionX < "u"
                          ? (l._panner.positionX.setValueAtTime(
                              e,
                              Howler.ctx.currentTime,
                            ),
                            l._panner.positionY.setValueAtTime(
                              s,
                              Howler.ctx.currentTime,
                            ),
                            l._panner.positionZ.setValueAtTime(
                              n,
                              Howler.ctx.currentTime,
                            ))
                          : l._panner.setPosition(e, s, n)),
                      o._emit("pos", l._id);
                  else return l._pos;
              }
              return o;
            }),
            (Howl.prototype.orientation = function (e, s, n, r) {
              var o = this;
              if (!o._webAudio) return o;
              if (o._state !== "loaded")
                return (
                  o._queue.push({
                    event: "orientation",
                    action: function () {
                      o.orientation(e, s, n, r);
                    },
                  }),
                  o
                );
              if (
                ((s = typeof s != "number" ? o._orientation[1] : s),
                (n = typeof n != "number" ? o._orientation[2] : n),
                typeof r > "u")
              )
                if (typeof e == "number") o._orientation = [e, s, n];
                else return o._orientation;
              for (var A = o._getSoundIds(r), h = 0; h < A.length; h++) {
                var l = o._soundById(A[h]);
                if (l)
                  if (typeof e == "number")
                    (l._orientation = [e, s, n]),
                      l._node &&
                        (l._panner ||
                          (l._pos || (l._pos = o._pos || [0, 0, -0.5]),
                          t(l, "spatial")),
                        typeof l._panner.orientationX < "u"
                          ? (l._panner.orientationX.setValueAtTime(
                              e,
                              Howler.ctx.currentTime,
                            ),
                            l._panner.orientationY.setValueAtTime(
                              s,
                              Howler.ctx.currentTime,
                            ),
                            l._panner.orientationZ.setValueAtTime(
                              n,
                              Howler.ctx.currentTime,
                            ))
                          : l._panner.setOrientation(e, s, n)),
                      o._emit("orientation", l._id);
                  else return l._orientation;
              }
              return o;
            }),
            (Howl.prototype.pannerAttr = function () {
              var e = this,
                s = arguments,
                n,
                r,
                o;
              if (!e._webAudio) return e;
              if (s.length === 0) return e._pannerAttr;
              if (s.length === 1)
                if (typeof s[0] == "object")
                  (n = s[0]),
                    typeof r > "u" &&
                      (n.pannerAttr ||
                        (n.pannerAttr = {
                          coneInnerAngle: n.coneInnerAngle,
                          coneOuterAngle: n.coneOuterAngle,
                          coneOuterGain: n.coneOuterGain,
                          distanceModel: n.distanceModel,
                          maxDistance: n.maxDistance,
                          refDistance: n.refDistance,
                          rolloffFactor: n.rolloffFactor,
                          panningModel: n.panningModel,
                        }),
                      (e._pannerAttr = {
                        coneInnerAngle:
                          typeof n.pannerAttr.coneInnerAngle < "u"
                            ? n.pannerAttr.coneInnerAngle
                            : e._coneInnerAngle,
                        coneOuterAngle:
                          typeof n.pannerAttr.coneOuterAngle < "u"
                            ? n.pannerAttr.coneOuterAngle
                            : e._coneOuterAngle,
                        coneOuterGain:
                          typeof n.pannerAttr.coneOuterGain < "u"
                            ? n.pannerAttr.coneOuterGain
                            : e._coneOuterGain,
                        distanceModel:
                          typeof n.pannerAttr.distanceModel < "u"
                            ? n.pannerAttr.distanceModel
                            : e._distanceModel,
                        maxDistance:
                          typeof n.pannerAttr.maxDistance < "u"
                            ? n.pannerAttr.maxDistance
                            : e._maxDistance,
                        refDistance:
                          typeof n.pannerAttr.refDistance < "u"
                            ? n.pannerAttr.refDistance
                            : e._refDistance,
                        rolloffFactor:
                          typeof n.pannerAttr.rolloffFactor < "u"
                            ? n.pannerAttr.rolloffFactor
                            : e._rolloffFactor,
                        panningModel:
                          typeof n.pannerAttr.panningModel < "u"
                            ? n.pannerAttr.panningModel
                            : e._panningModel,
                      }));
                else
                  return (
                    (o = e._soundById(parseInt(s[0], 10))),
                    o ? o._pannerAttr : e._pannerAttr
                  );
              else s.length === 2 && ((n = s[0]), (r = parseInt(s[1], 10)));
              for (var A = e._getSoundIds(r), h = 0; h < A.length; h++)
                if (((o = e._soundById(A[h])), o)) {
                  var l = o._pannerAttr;
                  l = {
                    coneInnerAngle:
                      typeof n.coneInnerAngle < "u"
                        ? n.coneInnerAngle
                        : l.coneInnerAngle,
                    coneOuterAngle:
                      typeof n.coneOuterAngle < "u"
                        ? n.coneOuterAngle
                        : l.coneOuterAngle,
                    coneOuterGain:
                      typeof n.coneOuterGain < "u"
                        ? n.coneOuterGain
                        : l.coneOuterGain,
                    distanceModel:
                      typeof n.distanceModel < "u"
                        ? n.distanceModel
                        : l.distanceModel,
                    maxDistance:
                      typeof n.maxDistance < "u"
                        ? n.maxDistance
                        : l.maxDistance,
                    refDistance:
                      typeof n.refDistance < "u"
                        ? n.refDistance
                        : l.refDistance,
                    rolloffFactor:
                      typeof n.rolloffFactor < "u"
                        ? n.rolloffFactor
                        : l.rolloffFactor,
                    panningModel:
                      typeof n.panningModel < "u"
                        ? n.panningModel
                        : l.panningModel,
                  };
                  var d = o._panner;
                  d ||
                    (o._pos || (o._pos = e._pos || [0, 0, -0.5]),
                    t(o, "spatial"),
                    (d = o._panner)),
                    (d.coneInnerAngle = l.coneInnerAngle),
                    (d.coneOuterAngle = l.coneOuterAngle),
                    (d.coneOuterGain = l.coneOuterGain),
                    (d.distanceModel = l.distanceModel),
                    (d.maxDistance = l.maxDistance),
                    (d.refDistance = l.refDistance),
                    (d.rolloffFactor = l.rolloffFactor),
                    (d.panningModel = l.panningModel);
                }
              return e;
            }),
            (Sound.prototype.init = (function (e) {
              return function () {
                var s = this,
                  n = s._parent;
                (s._orientation = n._orientation),
                  (s._stereo = n._stereo),
                  (s._pos = n._pos),
                  (s._pannerAttr = n._pannerAttr),
                  e.call(this),
                  s._stereo
                    ? n.stereo(s._stereo)
                    : s._pos && n.pos(s._pos[0], s._pos[1], s._pos[2], s._id);
              };
            })(Sound.prototype.init)),
            (Sound.prototype.reset = (function (e) {
              return function () {
                var s = this,
                  n = s._parent;
                return (
                  (s._orientation = n._orientation),
                  (s._stereo = n._stereo),
                  (s._pos = n._pos),
                  (s._pannerAttr = n._pannerAttr),
                  s._stereo
                    ? n.stereo(s._stereo)
                    : s._pos
                      ? n.pos(s._pos[0], s._pos[1], s._pos[2], s._id)
                      : s._panner &&
                        (s._panner.disconnect(0),
                        (s._panner = void 0),
                        n._refreshBuffer(s)),
                  e.call(this)
                );
              };
            })(Sound.prototype.reset));
          var t = function (e, s) {
            (s = s || "spatial"),
              s === "spatial"
                ? ((e._panner = Howler.ctx.createPanner()),
                  (e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle),
                  (e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle),
                  (e._panner.coneOuterGain = e._pannerAttr.coneOuterGain),
                  (e._panner.distanceModel = e._pannerAttr.distanceModel),
                  (e._panner.maxDistance = e._pannerAttr.maxDistance),
                  (e._panner.refDistance = e._pannerAttr.refDistance),
                  (e._panner.rolloffFactor = e._pannerAttr.rolloffFactor),
                  (e._panner.panningModel = e._pannerAttr.panningModel),
                  typeof e._panner.positionX < "u"
                    ? (e._panner.positionX.setValueAtTime(
                        e._pos[0],
                        Howler.ctx.currentTime,
                      ),
                      e._panner.positionY.setValueAtTime(
                        e._pos[1],
                        Howler.ctx.currentTime,
                      ),
                      e._panner.positionZ.setValueAtTime(
                        e._pos[2],
                        Howler.ctx.currentTime,
                      ))
                    : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
                  typeof e._panner.orientationX < "u"
                    ? (e._panner.orientationX.setValueAtTime(
                        e._orientation[0],
                        Howler.ctx.currentTime,
                      ),
                      e._panner.orientationY.setValueAtTime(
                        e._orientation[1],
                        Howler.ctx.currentTime,
                      ),
                      e._panner.orientationZ.setValueAtTime(
                        e._orientation[2],
                        Howler.ctx.currentTime,
                      ))
                    : e._panner.setOrientation(
                        e._orientation[0],
                        e._orientation[1],
                        e._orientation[2],
                      ))
                : ((e._panner = Howler.ctx.createStereoPanner()),
                  e._panner.pan.setValueAtTime(
                    e._stereo,
                    Howler.ctx.currentTime,
                  )),
              e._panner.connect(e._node),
              e._paused || e._parent.pause(e._id, !0).play(e._id, !0);
          };
        })();
      })(bs)),
    bs
  );
}
var Le = au();
const Au = "" + new URL("close-door-DSYZV-md.mp3", import.meta.url).href,
  hu = "" + new URL("close-menu-DTE6uNMS.mp3", import.meta.url).href,
  lu = "" + new URL("cursor-option-_4GNbUGN.mp3", import.meta.url).href,
  cu = "" + new URL("game-start-BVhUyClL.mp3", import.meta.url).href,
  uu = "" + new URL("info-DJea9THd.mp3", import.meta.url).href,
  du = "" + new URL("read-word-BO443h0C.mp3", import.meta.url).href,
  Be = class Be {
    static load(t) {
      for (const e in Be.sounds) {
        const s = e;
        Be.sounds[s].on("load", () => {
          t();
        }),
          Be.sounds[s].load();
      }
    }
    static play(t) {
      Be.sounds[t].play();
    }
    static getCount() {
      return Object.keys(Be.sounds).length;
    }
  };
p(Be, "sounds", {
  cursorOption: new Le.Howl({ src: [lu], preload: !1 }),
  readWord: new Le.Howl({ src: [du], volume: 0.03, preload: !1 }),
  gameStart: new Le.Howl({ src: [cu], volume: 0.5, preload: !1 }),
  closeMenu: new Le.Howl({ src: [hu], volume: 0.5, preload: !1 }),
  closeDoor: new Le.Howl({ src: [Au], volume: 0.5, preload: !1 }),
  info: new Le.Howl({ src: [uu], volume: 0.5, preload: !1 }),
});
let gt = Be;
const fu = "" + new URL("design-paper-BeYv7TR2.png", import.meta.url).href,
  gu = "" + new URL("mouse-hole-BN1w8f2q.png", import.meta.url).href,
  pu = "" + new URL("title-D87Ewmoi.png", import.meta.url).href,
  mu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA51JREFUeJztW8Fu00AQfXGhbQpKK1JVFTIS4isQB2RunPpDnPkhTtyIOPEFnBAXIlRVKbSVoGmhKYf1S+LxTnfX3pRK3nexx7uza2fezM6snR5uCW9fPrkO6f/m47fequ5lGdltTHKXEf1X1iy911+ryEcnV+b6zpqtO47Or6zXYzMjMaDtANLi0tLE8cR0G5Q/+dnMHC8vzMn6RlZpv//IfmuSGW0ZkRjQVJGWlxb/8yMo2GNybhiw2/ezhWQGGdGUCYkBoQpzn78w8tUvc5Q+TB93yVoMcOmPf5sLDx6WN7ZhDqFMSAzw7Sh9Xvq6ry+znwZffdmPsSE0JiQGuDpolvf1acrTkjD5VualL/vT5136w90wJiQGaA0Hw+1rAHj9bKfRwKHr+6rGef/1BADw7vjU+qydZ8A9eYGWf/G0avmm63qovpRped8YIOUlBl8DdSYkBmgNgyxMpuU1Xw0dT8q0vBYTXPoaEgN4IqN+qM9ORRHY1OddctPxl2JaJRYkBmgNmk/JXH5SHjd79v6xZc7HmDOBQL9aVWrjEYkBWoMrN9fqc6m/qhig7R+Qodr9SnSeAT0Z/aWPh+bgsWqAWONqz8MaofMMmMcALdcmQn20ae7u2h8IvR9aXMYIIjGAJ23Xca0WqO0BOtZpVwxqWgvIPIJIDODJl5/mt9jtGzlW/a/5IH2azHOt27H2B/icRGKA1rCy+r9/c13vO3+s/YHEAK1h1fV/rP2DUH2JzjOgB6AAgIPh9gcA2Nk0NcHzx3aFu7LfHzrep+/meDKdvyd4BSQG6DFgfGjeBeb75h1b2z25Ve8hauOdHfER/8KGxAAAI1vDeGYsn5dy7H3/2HuIWl7weWa3PMrnTgzgCaPiwRCV1WB8WHYZXFYU71oMqO1HHPLrNcNkGf2JxICl85Gtw7j0ofxs3VzYMvL/ftenyePT9cp9WzBaFjrPANtXEwVQzwyJPDOkGexVmdB2z6/pd4Zzy5c+z9WLsPj+aLk9MeCGtgJwMyHfV33NC21rAq5S0uddlicSAzz6FICbCeVr91rtEDsGLHJ7M1+oz0skBgT0LQCdCcSCEeK6Eiu0GDDPQAW09T3U8kRiQAOdAnAzQSLPmJtzSuPD0zJX30S1/YZMroKmlicSA1roFsCCCYQvI4gMJgbMPG1BixNNLb+Yv+OI+S/MAqgzgtCYoTFAWppoa/H6/B3HrfxDG1h8ieoL7fv+2Og8A/4BThh5yN/Xe/cAAAAASUVORK5CYII=",
  yu =
    "data:image/png;base64,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",
  Cu =
    "data:image/png;base64,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",
  xu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAATpJREFUeJzt2c2twjAMwPHwxCLehQnegRNDIHFGwAbv7cCJAxOwi0eBC5EgosKNXSqa/+8CheJEset+kBIAAAAAAGYichWR67eP/xMxmW829wYos6CqM29MyzhRqIDogDlTUZUwdJ+hAoYK/OkzRG0var4CJrsA1uuEyS6AlbsHqGrEPHoTkZA4zVfAZBZAVWc11x6TWYBag10HZJfT8Wl7sVy59ovWfAWwAGNPYGyD9wDrsew95mvvPagAb4C/4/nl5+vVr+l31v1K/9tNSqk789wNGrkr4F0Gs3cZ7/q+a/+uewFVPdzf7ovXl6gAbwBrD8jbZaatlVHKPeAh41War4DqJ7cPT3/jZtNv/HQf3/X0ufkKqO4B+dgTkV3cdPqP79V8BUT8e7MPiDHauM1XAAAAAAAAAFpzAz/dZCrLDl1lAAAAAElFTkSuQmCC",
  wu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAUdJREFUeJztmMFNAzEQRSeIRqYCmqCCHHKKKAEhcUYsHQRKQDlxoAKaoIIpJVywFJINsT2zu8r6vdtau3+sme9Z2yIAAAAAAAAA2ajqTlV3lx7/KmIyl8y1V+CwCma28GrmxIkCB0QLpkpFOWHoPoMDhhIe+w9R24uad8BsE5C7T5htAnJx9wAzi5hHMaoaotO8A2aTADNb1Ow9ZpOAWgbbByS+PrZ/nm9Xa9d70TTvABIw9QSmZvAekLuWvWu+9uyBA7wCm+1n7/jDetn7Xho/93xO//XpUUROV57TYCbVtzZ7Nz9F36WK3rzdiYjI9/27iBxXPiN+77iZvRwMdf/pNO+A0XpAtH7qAT0VL6J5B4zeAxKnun5BfPmN77p9xgGObzsREVV9jplKGXtrv/Po4IAAjS5AY7K4zTsAAAAAAAAAAABa4wc7OGUrPdZSAwAAAABJRU5ErkJggg==",
  bu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAASpJREFUeJzt2c/NwjAMh+H0E4t4Jc7fEEicEbAB7MCZlTwKXIhURVSkjktF/D4X/hUnSn64rUgJAAAAAIBqIvIQkcevj//nMZlftmktUO6Cqg6tNWvG8UICvAvmnfJKwtJ9hgQsVfjbZwhrLwqfgG4XoPY6odsFqNXcA1TVYx6ziYhLnfAJ6GYBVHWwXHt0swBWLMDaE1jbYleCl9v97fu7/63L8V7CJ8B8xza66/Obzbzx02v8YTyf0qczQ/gENPcA6283f6/2uNL1sE8p2Xc+IwGtBWq79Kcdn/p86vipewFVPb+enorHt0hAa4HaHpBflztdm4xS7gGjHTcJn4BurgOswifA3APyb09Ejn7TmT9+q/AJ8Pj35uRQY7VxwycAAAAAAAAA0TwBZXVr2TD+heoAAAAASUVORK5CYII=",
  Eu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAATtJREFUeJzt2MuNwjAQgOEB0chUQC+cESUAEmdEVnteaZcSEGd6oYIpBS5EWkUJcewxiPj/LrySsWUPYzsiAAAAAAAEU9Wbqt4+vf2pR2c+2Sw1QHMWzGySGjOkHS9kgHfAeqa8MiF3nSEDcgV+9QoRW4uKz4DRDkDoPmG0AxAquQaYmUc/BlNVlzjFZ8BoBsDMJjF7j9EMQKxs+4Df86X1++1y4XK9FzIgV+ChM5d7pruQAa9qqP6P1zPd93mo2LNH8RkQfWavR3zz/dP6e1+1nx9XIiJyXZ+Crm/62++e9o/TYKDkGpC7enfF7zoLmNnX423VeG1FBqQGyL2D66sB/2Y8SvEZkLwKxD4PcFj35dF+0tNnMiDh3kpERFUPPl0ZpqXaRyEDHGJUDjHe1m7xGQAAAAAAAIDS3AFORGPXV5RdPQAAAABJRU5ErkJggg==",
  vu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAS1JREFUeJzt2UFuwjAQheEBcZG5UtfcAaSuUVN1jQR3YN0rzVHCBkuRFTeOPZGL/H8rIGE8wi92IkQAAAAAAMimqqOqju8+/t6jmXd2qC0Qz4KZ7Wpr5ozjhQR4Fwwz5ZWErdcZErBV4ZY7xNz4qUSSgNYNeFubPBJQW8DMPPpYTVVd6pCA1g1sbel+pPsE8AO0bqC1zdaA2+N39vPz8cPlfC/dJ6D4iW3y1OfXzbrx5TX+btpPjF1gQfUaUHrthu/lnhe7Xz5FpHzmAxJQWyB3lV6a8dTx1PmpZwEz+369HKJD8XsRIQH1u8Dp5zp7PHemc5MRC2vAZMZThr8OkoDSL/63+4BS3SegeBcI156qfvm1s378Wt0nwOPfm8GhRrNxu08AAAAAAAAAevMEEZxoO1e+Vz8AAAAASUVORK5CYII=",
  Bu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAATFJREFUeJzt2UEOwiAQhWE0XmSu5No7aOLaWOPaRO/g2ivNUXRTkoa0Aco02PB/K20pkPIKRZ0DAAAAACCZiHxF5Lv29rcWnVmzXWkF4Sio6qa0zpR2rJAA6wr9SFklYel5hgQsVXHNFSJH8wngBtTuQG3Fc4CqWvQjm4jklh99XyEBtTuwtNhq1HwCuAG1O1DbYnPA8/0ZPX467E3Kx0w9++EepfkEzN6xDXZ9dr3Ja9/17W+C40kj7zWfgOI5YO6z669LLRd6Xc7Oufg6H/tdggSUVpA6S8dGfOr8VPnYXkBVb/3HbqJI5xwJKF8FjvfH6PnUkU5NRsjPAYORTtUNv5CAuRf+63tAruYTMHsV8M+eiFztupPffqnmE2Dx701nUEe1dptPAAAAAAAAAFrzA7+uaZtoIsD5AAAAAElFTkSuQmCC",
  Iu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAARhJREFUeJzt2cENwjAMheGAWMQrcWYIJM4I2AB24MxKHqVcGqmKCCS1q6jk/26F4oTm1TQiBAAAAAAAionIICLD2sffekxmzXbWAukqqOrGWrNkHC8kwLtgXCmvJCzdZ0jAUoVb/kLU6D4BXIDWE2jN3ANU1WMe1UTEpU73CeACtJ5Aa1yA1hNobbEnwfvz9fH142Hvcn6t3K61+wTM3rFNdn1+s6kbP4zjf/0OuT0JCRiZe8Dcezd+rvS81ON8CiHYd50kwFqgtEv/WvHc+7nz5+4FVPU2PSYB1gKlPSAepytdmoxU7AHpitbqPgF//xzwS/cJmN0D4r0nIhe/6dSPb9V9Ajz+vbk61Gg2bvcJAAAAAAAAQG/eUEZgO84hMZ0AAAAASUVORK5CYII=",
  Mu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAMdJREFUeJzt2UEOgzAMRFFa9SJz0tKT+ih0lU1XgJ2OIv+3jzMyJgjYNgAAAAAATpN0SDpW3/9ZEWZlr2yB36sQEY9szTP7VGECqguOK1U1CbPPGSZgVmHnE+KK9hNAA9wB3NJnQERU5LhMUkmd9hNAA9wB3GiAO4AbDXAHcKMB7gBu094G/+XuW+f4XtF+AmiAO4Db8mdARHwy65kAd4ACe2YxE3B34bj3JL3r4lzfP6v9BFT8vdkLatj2bT8BAAAAAAAA6OYLofQkuDUc/NwAAAAASUVORK5CYII=",
  Su =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAWZJREFUeJztmLFOwzAURS+ILGUpQz1UfEz75fR73IHOZIABvYZYNY4dpwr4nCVS/PwS6V772U8CAAAAAACA9nhYKrFz7nOJvN77qv/8WDPZX+SpVqJQ8ZftVpL0vNncjP/o+6z8/RA/+s5cRzTvgNnryZR/3e9H73MVLsWfz9/PQifggNKJofL3UjxGqROad0B2FVib8nNp3gGT14spb/W967qiD9pavebd7YrypPJP3Quad0B0D6h1lg8Vv+avrHwpOCA24L0/SpJz7k0aFDNFU1XA4sJ5a1HewAG5E0zBVP1fm9IxcMAvYydp2AskjfaC/wIOSAVYFQiJnehSJz3r7OSeJJeqIjhgaqDdAVJKhO9DR7xfLlk/GMtbCxyQCgirwFQn2HiqO2zM7Sv8uAUeE6EjmndATv/sIA1VwZSNrem5fYOp3FD+lDMfBxTMOUjx88G9KVXeaN4BAAAAAAAAAAAA0BZfSU2HmFll0d8AAAAASUVORK5CYII=",
  Qu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAVtJREFUeJztmLFOwzAURS+ILGUpQz1UfEz75e33uAOdyQADeg21Yhw7Dgr4nKVS/fwc6V6/Z1sCAAAAAAAAgNZ4WCqxc+5jibze+6rf/Fgz2V/kaW6CmNIv260k6XmzGZ333vdZ6/RD/Oh6pc5o3gHF+8mUf93vJeUrWht/uXz9ZjqheQdk14C1KT+X5h0web+Y8lbdu64rWtD26i3vbleUJ5V/ai1o3gHRGlDrJBcqfstfWflScEBswHt/lCTn3EkaFDNFU13A4sJ5a1HewAG5E0zBVP9fm9IxcMAPY2dpqAWS7mrBfwEHpAKsC4TETnSpk57d63NPkkt1ERwwNdDuACklwv9DR7xdr1kfGMtbCxyQCgi7wFQn2HjqbdCY+67w7RZ4TITe0bwDct7PDtLQFUzZ2J6e+24wlRHlzznzcUDBnIMUPx/8NqXKG807AAAAAAAAAAAAANriE/BDfZVPpwiMAAAAAElFTkSuQmCC",
  Du =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAg9JREFUeJztmbFSwzAMhgX0uvWgC7uvQ1+Bl2DiVcpMmOmrMPESvEKHnneWwnXrAWXSXaJzHNtyEVz+b3Mqy6r0J5EdIgDAmDmr7XC1mB9r+2yz3u6qxnxe09l/RJ1NWfGb2YXWZZTX/VdnrFUEFFA6kSsvK37/MVOGFOfpct8ZsyJKlQAF5E6wqryklhJGr4CJ1sFvV16uK5WQy+gVgARYB2ANEmAdgDVIgHUA1iAB1gFYgwRYB2CN+jzg+fuqXjQF3J2/ExHOA4pRnwk65056CjyE9x5nghpKsnckIlot5p2L6+2OiIicc0lOptNpZ3w4HJLmee8ptj5l/icoIHeCvOf5Kcy0KsH2QT+pCuCKM7Ly8i2U+0yAAkonDimBkYpglstlZ7zZbIJ2suKMtvIMFKB10NcH9CmCeZlcd8a3n29R+76OE32Akmrf2nM7wtI+gNFWnoECDNeWijGJZfQKQAKsA7BG/XU4QlPZPtdfEqNXQPVOUO7eatG3q0QnqESTPfkefwwZOeceFGuQ9z7ol4ikX+wGS6jRfTXtgbbiQwQU0YTsUoECtA6GdoF997BUSqpdwD/eAhqSO8HU/X7kqV2E9CcV0RdXqjKggFRD7vBkR1a74glxRBWR24lCAbkTWhnuq3wz4KLq7y1FFPUfUECGreX5YZsm83oUKMBq4VOdG+QyegXgu4DFon+JH+I+sP004wpbAAAAAElFTkSuQmCC",
  Pu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAipJREFUeJztmzFPwmAQhl+NGzPElZjgzuSiA/4AF/4AHZxcSVw6sZCwOjnwC7rwA2QxJiyYOJm4NCaaKIsuuDjoACf5jpYrAr2S3rNd7/P6cvf2KxQEDMPIMztxiVKp9JOmkE0zGo0iX+tu2kKyxlxXaPKFQiF9NRtkPB4DmHdC7h0gNiAMQ4RhuLWxRO4dIO4BvJvlcjnyeFbzFNseEMPSDtg2zAEC1gBtAdpYA7QFaGMN0BagjTVAW4A2e6sWqFSPAABP94PIfLPZBAB0Op211CGkekkxB6xa4Oz0GADQm8Y0QT55Hp8cHgAA3gpF5+/ICbw+n3icsyQnccwB0gI+ET7huPW9m9vIfK1Wc+L91+dJXUFHo9EAANw9PEbW55On+PvjfWFdc4C0gHe02+06ec/znDxBnSenDIfDpYTReYNpnXq97uQvL84BAO0rN/a8gRO3Wq2F5zEHJF046/Bk4uQEfq3REyQ6HgQBgNmTGaLf7zvrKtWik+fP9qiO7/sAgPbVtaOL4A6VMAdIC/i1vWyHOS+fX05d6a5Cuz3fzfnkuTPJIRK5d4B9N6iiJkOk3gDf9/928qg4bXLvALU9gKYuvVNbF7YHxGB3ARU1GWLlJ0LStRyX58f5nWDZev/FHCAtSPr7AJoMvSePyyc9zs/LP4Mk1cU/hXJy7wC7C6ioyRDWAG0B2lgDtAVoYw3QFqCNNUBbgDbWAG0B2th/jaUtxDAMI0v8Aqp0PPjtiGSaAAAAAElFTkSuQmCC",
  Ru =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAARhJREFUeJzt2j0OQVEQhuFDRCHR6FBItGorsAS7UFuG2i4swQrUWokCnUai0FAp3OT+nJ/rI/M+rdyTMfMl5p5wDgAAAABgT6Oug5eT/jPleav9pZZam3Uc+k+iu5o36XGnHXv0h8P9Ufh5aEJIgO8D2YmnnnSobEKqJsJ8Alq+D/zKxLNC6zKfABqgLkCNBqgLUAveBNfTUdSun7fZxf7KLHZHr+9kPgHee0Aqv7JPmE8ADVAXoEYD1AWo0QB1AWo0QF2Amve7QOw7wLdUfScwnwAaoC5AjQaoC1Dzvg/Ynq7OOedmw17yYlJ411eV+QQE3wnOB93CfSB1QqpOdnO+cSfoI/m/LsqSEct3wmXMJwAAAAAAYNELCAoubm79ow4AAAAASUVORK5CYII=",
  Fu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAEACAYAAAB7+X6nAAAAAXNSR0IArs4c6QAAAwRJREFUeJzt2TFOFAEYhuFfpTPS0NgoIRjP4WWMlZ3HoLMyXsZzGIxBG2usjVYb48aFsLusi+/zlOzsMMm882UCMwAAAAAAAAAAAAAAAAAAAAAAAAAAwL9377oD3r969nMXF8LtePnu/Mp7fH9XF8J+WlnH4sl//PTJzMwcHj6amZnLy++7uC7WtHyfvn35OjOrl8ACxB3c9AuLwvg/WIC4Gy+Ad4D9dtOFtgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQfbOtGDF2czM/Px88XMzJxevN3WqblFFiBu4wVYfvIXPh2/nhlLsO8sQNzaC7DqyX9+cvzngSdn6/6KmZn58eHNRt/nahYgbu0FWH7yr/v5uk63ejaWWYC4tRdg8Xa/eNu/7jj2kwWI2/jvAKuWwJN/N1iAuK39L8ATfzdZgDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIO5g1QcPj452eR3ckt/38fyvn1uAOAHECSBOAHECiPsFAqw5WLq06c0AAAAASUVORK5CYII=",
  Tu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAEACAYAAAB7+X6nAAAAAXNSR0IArs4c6QAAA8BJREFUeJzt3bGKXGUAhuFfTRdMk8ZGQ4h4E1p4B4KFILaKlZ2Xkc5KtA0BC6/BQm9CIhJtrCOWooUcZA+ZzMyZ3cmc8z5PEzIzuzsw7/nm391ixwAAAAAAAAAAAAAAAAAAAAAAAAAAAF6+V/Y94JvP3/7nHE+Em/HZ109e+Bq/eq4nwmXaWcd05b/x1ptjjDHu3Hl9jDHGs2d/nuN5sdD8dfrjt9/HGLuXwALE3Tr2A6bC2AYLEHf0AjgDXLZjF9oCxB29AHM/3f7kyv/f/evRqZ+SM7IAcYsXYLryP/7wgyu3P/7+v38twTpYgDgBxAkgbvEZYHqPn97z57ezDhYg7uSfA7ji180CxJ28AJfq2+9+fO7tn3703qLHbZUFiBNAnADiBBAngLjNfhdw6Cm+ctrfxQLEbXYBjv3+fnp8bREsQJwA4gQQt9kzwKHmZ4XaWcACxAkgTgBxmz0DTO/htff0Y1mAOAHECSBus2eAyb73/vrZwALECSBOAHGrOQPs+/3+ofcf+vOBU7/eWliAuNUswKFX7r4rdOnXXfp8Lp0FiFvNArws8yVZ65W+iwWIswB7bO2Kn7MAcZtbgGNP//ve450B2DR/MWRj/MUQjiKAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxF3bXw9/7f2HY4wxfv716RhjjAdPv7quT80NsgBxJy/A/Mqf/HLvizGGJbh0FiBu8QLsuvLfuX/v6gPvP1z6JcYYY/z9w5cnfTwvZgHiFi/A/Mrfd/tSD671szFnAeIWL8B0up9O+/sex2WyAHEn/xxg1xK48tfBAsRd2+8CXPHrZAHiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4C4W7vuuH337jmfBzfk/9fxyXPvtwBxAogTQJwA4gQQ9y/8xZhS/AS6DwAAAABJRU5ErkJggg==",
  ku =
    "data:image/png;base64,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",
  Gu =
    "data:image/png;base64,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",
  Uu =
    "data:image/png;base64,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",
  Nu =
    "data:image/png;base64,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",
  Ou =
    "data:image/png;base64,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",
  ju =
    "data:image/png;base64,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",
  zu =
    "data:image/png;base64,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",
  Lu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABHdJREFUeJztnE9oXEUcxz+RIsZqbKwFCVLdUBJBTzYFFaXbNlAvVkqLYP9YSrDeVHoSerAeei21t1RCKWoLogT0YkHbFEUFU0+tuCFkrUgQa5u0mkZEXQ9vf9m8Sd6+3Tczbwrv9zll3pv5zo/5fWfmzdvNgqIoiqIoiqIoiqIoiqIoiqIoilIMOvLqaPDDH2vt1P/8xUdzie2OPDq5nfE2ymbGO/s622o/PzEfK/tyhDrAtaBkvt2MpyGOcO0EdYArIV+ZN3HtBHWArYBk/pmB+wG4eHO+aX1b1ndFDvtq/Dpg7wR1QNaGeWfexJUTCu8AbwOwvqtzIUs29VrVyUrhHbCi3QZZ5/7k9BoA1vVcdVJP+pU4qMfV7lqgDvAlbDrj39n3oz96tgKNVTytnu/dRR2QtWFaZsy5XOmbBmBbSnuzXtqaYOsQdUBeHc30vgbAqXp5389/xO6fWntvVI+oHsZ9XxTeAdZnATn/m3P1k39OArBtxX4Abr59CYDRkaeAhgMk88L2oW8A6Hrr8WV1zH5s3w8U3gHO1wDJ0MyT8Tm/+fpvsXpm5oUb9Xqjxpow+e1drkMF1AHZzwJJ7/4a+/XyGc6K6IrDBIljUM8C2XC2Bsgz/CR7ogtr/4rdPzf6Qks6SfUk8+ZZwRZ1gGtBmavdU9H+LU+AWemeOl7XjZ4DKrNWcktQB7gWPHjgMQD63zgKQIXjsftpjpCMC/0TPQAMH4t0X63rukId4Epo+NhBAI6euBxd+OEs0MigYDrCxKwviO5w3WEL/VhSeAc4Ow2a3+hYM/JK0/anj2yJlXcd+qJp/atD78bKZr96GsyIs0+HJQMvbX22BjB37QYAG5/eAMCFr78DYOXq+wAY6O+L6YxXJmil3ZmzX3Ys129WCu8A613AzPxzmzbH7n/80SiwNKMmSZnfsXO7WbUGcEa/IeIG72+FJYNpTmgh814ovAOs51HS3E/i9+lfAPhpaip2/ZHeXgAe6HmoJZ3Pzp8DGrtCVgrvgNw+GRKSdoErv14DYMfO1hzgCnWArYDMwdNHttSgcd7/9MQ7Tds9/ODqWFkckMTzB14HGu8L9r1pN/cFdUDeHSbt7wM5xyGoA2wFauOHY3PfN9JPbTw6E3QMHNbnABucrwHmW13Xuq6dpg7wJTxyMvoMb2j/Hic6Lw/utY5pOdQBvjuQDN6uFN4BOgChAwiNszVA9umNu99zJRlDdC984Fa38A5w9p+jT/SXagD3eB7TP/kPgO8rVX0f4AJvAzA7d4vZuVverrtCHRA6gNDoAIQOIDSFHwDnvyGS9jwgK/qqlXe3dF1wvf8L6gBfwqVSqekvR3XfGS/P/N1cr1p1m3mh8A7I/ZMhwZzLaY7xReEdoAMQOoDQ6ACEDiA0OgChAwiNDkDoAEKjAxA6gNAEOwsA5YB9L6AO8KBZ9qC5WHfMpag6wIFG2YGGTX9jNmKFd4CP92zlxYVSqXR+cblarW5q1riF+mMWsS1BHZBDH2XL9mMOYkik8A5QFKXY/A8uypNH6Cpb8AAAAABJRU5ErkJggg==",
  Hu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABIZJREFUeJztnN9rXEUUxz+RIsYfwVgLEqSyIo2gTzZKFaXbEqgvtlRFEKtSgrVPtvQfsL6XIn2ySij1B4KoQZ8slGaLooLRJxU3hKyKBLG2SVfTiKjrw92T7Z3euzd759ydwj2fl829d+Z7hjnfmbkzuwQMwzAMwzAMwzAMwzAMwzAMwzAMwygDA/0KNP7eD61eyp9+6u6+tO2afgS5mimsl92MD24a7Kn+yuxK7LooR5gDtAUl871mPAtxhLYTzAFaQkVl3kXbCeYAXwHJ/MNjtwDwdXOla3lfNg9FDvts5gLg7wRzQN6K/c68i5YTSu+Awjpg89DgapZ8yq1VJy+ld8C6XivkHftzCxsAuGvknEo5iSvtoN2uXucCc0BRwq4z/l16O/pjZAfQmcWzyhW9upgD8lbMyow7luubFgDYmVHfLZc1J/g6xBzQr0CLd74EwMn29fM//xF7fnLjTVE5onI4z4ui9A7w3gvI/t8dqx//cwKAnev2AtB85VsApiYfBDoOkMwLuye+AGDo5XsTddw4vucDpXeA+hwgGVrcEh/z2y/8FivnZl642C435cwJc19ep91UwByQfy+QdvbXWa+TM5wX0RWHCdKOcdsL5ENtDpB3+Dn2RDc2/hV7fmZq15p00spJ5t29gi/mAG1BGavD89H6LW+AeRmeP9bWjd4D6ktecldgDtAWPLTvHgBGDx4FoM6x2PMsR0jGhYGxwwMA0w8caQG82NbVwhygJXT81UMAHH39u+jG96cAGJ0dATr7fDfDaUg9QXSPtx22GseT0jtAbTcou7INky8AsHz+IgBbH7ofgLOffxWr/9Frj8eud+3/MDGO1J+pzwJwbuINkuLabjAnat8OS+Yf3bY99vyD96eAK50g14LrELf8E0/uBuCT6TNAxwn27bAn3quAZODpHY8k/g5QMuc6IY20zKfF9cUc0K9AaU5w54SszF82x7QA3j31qc0BPng7QMa+O/sLvy/8AsCtI7cDnUz/OD8PwB23rY+VT8u8q6NF6R2g9jvB1szhFsCbp7v/KFzmgDTSHPDYvgNAZy8hu0RfSu8A9VXAzVSaI9yx/9Ov57WbsibMAf0OmDbGx/rcDsEc4Csgs7/v6W8WMqdInNZM9CbouxqYA7QFs2Z/X5rNZhRHSc8cUJTw5InoO7yJvXty1XN5bvxZ7zYlYQ7QEko770/LaK9sfeYtAM6+oyK3SukdoLYbvG+00gK4seA+/ZP/APim3rDdoAbWAaEbEJrCOmBp+RJLy5fWfD8U5oDQDRBCOeaq6YBQWAeEbkBo+n4m6BJ6RSi9A9T/h0jWnkAyfvMN1wOdd/vFv7vrDl8bfWrtAQRzQFHClUql66Ggm9Gs8o2GbuaF0jsg2CqgPZbzUnoHWAeEbkBorANCNyA01gGhGxCakLvBasDYq5gDCtCsFqB5uW5NU9QcoKBRTbrZaDS2AVQqlemk+4rxaj5i5gAFjVr7s5r0UCHjWXG9MAcoatXan1VFzW5xVCi9A4o8lanmqdRl1ah5tieR0jvAMIxy8z/sWqSPzTMTuQAAAABJRU5ErkJggg==",
  Yu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABHpJREFUeJztnEFoXEUYx3+RUoxto7EWJEh1gySCnmwUlZZu20C9WCktglotJVhvKj0JHqyH3qRob20JpagtlEpALxa0SVFUMHpScUPIqkgorW3SahoRdT28/bJ5k7x9u29m3hTe9zvlvTfzn4/5/jPzZnazoCiKoiiKoiiKoiiKoiiKoiiKohSDjrwaGjzzU62d8p8+80Ausd2SRyM3M9562cx4Z19nW/XnJ+Zj174coQ5wLSiZbzfjaYgjXDtBHeBKyFfmTVw7QR1gKyCZ3zhwJwDfXp9vWt6WDV2Rw74YvwrYO0EdkLVi3pk3ceWEwjvAWwds6OpcyJJNuVZ1slJ4B6xot0LWsT85vQ6A+3suOykn7Uoc1ONqdy5QB/gSNp3x7+z70R8924HGLJ5Wzvfqog7IWjEtM+ZYrvRNA7Ajpb5ZLm1OsHWIOiCvhmZ6XwHgZP16769/xJ6fXL8mKkdUDuO5LwrvAOu9gOz/zbH60T8nANixYh8A19/6HoCR4ceBhgMk88LOoa8A6HrzoWV1zHZszwcK7wDnc4BkaOax+JjfevVSrJyZeeFavdyIMSdMfn2r61ABdUD2vUDS2V9jvV4+w1kRXXGYIHEM6l4gG87mAHmHn2RPdGP9X7Hn50eebkknqZxk3twr2KIOcC0oY7V7Klq/5Q0wK91TR+q60XtAZdZKbgnqANeCB/Y/CED/a4cBqHAk9jzNEZJxoWPgYAfA6KNv1wBeruu6Qh3gSujoOwcAOHzsh+jGj+cA6J/oiZUzHWFilhdE92jdYQvtWFJ4BzjbDZrf6Fg3/FLT+qcObYtdP/fGZ03LXx46Hrs229XdYEacfTosGXh2+6YawNyVawBsfuIRAC58+Q0Aq9beDsBAf19MZ7wyQSv1Tp/7vGO5drNSeAdYrwJm5p/csjX2/MOzI8DSjJokZX7X7p1m0RrAaf2GiBu8nwpLBtOc0ELmvVB4B1iPo6Sxn8Tv078B8PPUVOz+fb29ANzVc09LOp+Mngcaq0JWCu+A3D4ZEpJWgV8uXgFg1+7WHOAKdYCtgIzBU4e21aCx3//42LtN691799rYtTggiaf2vwo0zgv2vm439gV1QN4NJq3vAznHIagDbAVq4wdjY9830k5tPNoTyJlhVtQBrgXNU13Xuq6dpg7wJTx8IvoMb2jfHic6Lw6+YB3TcqgDfDcgGbxZKbwDtANCBxAaZ3OArNObn3/PlWQM0b3wgVvdwjvA2X+OPtxfqgGs9tynf/IfAN9Vqnoe4AJvHTA7d4PZuRve7rtCHRA6gNBoB4QOIDSF7wDnvyGS9j4gM/odq25r6b7gev0X1AG+hEulUtNfjupeGb+e+bu5XrXqNvNC4R2Q+ydDgjmW0xzji8I7QDsgdACh0Q4IHUBotANCBxAa7YDQAYRGOyB0AKEJthcAygHbXkAd4EGz7EFzse6YS1F1gAONsgMNm/bGbMQK7wAf52zlxRelUml08XW1Wt3SrHIL5ccsYluCOiCHNsqW9cccxJBI4R2gKEqx+R9ISZQOcxlz8gAAAABJRU5ErkJggg==",
  Xu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABJ1JREFUeJztnNFrHFUUh79KFWM1GmtBgrSsSCLYJxtBRem2LNSnlqoIYk0pQeuTlP4D1n+g1D6ZSqjVgiBqUF8slHZFUcHok4opIWtFgtjaxk3biGjXh5mT7dzMZHbnntkJzPleNjNz5ncv9/zm3jkzmwXDMAzDMAzDMAzDMAzDMAzDMAzDMMrAml41VHv/51Y38aefe7AnfbupF42sZnIbZTfjfUN9XZ2/eG4xsp2XI8wB2oKS+W4znoY4QtsJ5gAtobwy76LtBHOAr4Bk/omRuwH4rrm4YrwvW/oDh305dQnwd4I5IOuJvc68i5YTSu+A3AZgS3/fUpZ84jrVyUrpHbC22xOyXvszcxsAeGDwgkqctCv9IOxXt3OBOSAvYdcZ/82fDP4Y3AG0Z/G0uLxXF3NA1hPTMuNey9NDcwDsTDnfjUubE3wdYg7oVUOX738VgBPh9t5fFyLHT2y8I4gjiMM5nheld4B3LSD1v3utfvLvcQB2rt0HQPP1HwCYnHgMaDtAMi/sHvsagP7XNsfquO34Ph8ovQPU5wDJ0OVHo9f89kt/ROLczAt/hXGTzpww882t2l0FzAHZa4GkZ3/t9To+w1kRXXGYIP2oWS2QDbU5QO7hZ9gT7Nj4d+T4mcldHekkxUnm3VrBF3OAtqBcqwOzwfotd4BZGZg9GuoG9wHT815yyzAHaAsefPkhAIYPHAZgmqOR42mOkIwLw+cGARg/EujuD3W1MAdoCY0fOQjA4WM/Bjt+OgW0Myh1vpvhJOQ8QXTHQ4ctteNJ6R2gVg1KVbZh4iUARoaHAPj8q29jz//4zacj27te+SiyvfXxRyLnr1t/JwAXxt4irl2rBjOi9nZYMv/Utu0AfPjBJLA8k4LsF+S4G//Ms7sjcZ+dPQO0nWBvhz1R+4bI8zuebEHbAUKSE1wHCEmZF8QB7536wr4hooH3fUBS5gXJZJoT0jKfF+YAbcGLc78BcM/gfZH9klk5vune9QD8MjsLLJ8TknRucFoL/OeC0jtAbRVoTR1qQbva+/TYG7FxMhck4TrFdcBoLejympFDtgpo0LN3gy4yBwjnf/8zsi2Zl4wvPUfosJrsFHNArxtMWudHetwPwRzgK+DO/p0+8cmKtNOaCu4DfFcDc4CWULPZBGBASzDkndPBvx6N1gJn+b5ncDEH5CU8cfxk7P6xfXsy6YzWXvTuUxzmAC2hTRffBmDrC++uGJfkjE7RXmVK7wC1avDh4UoL4Pacx/QK1wH4frph1aAGNgBFd6BoVs0AzF+9xvzVax3v12LVDEBR5DYARWW0W8wBRXegaGwAimp4tcwFpXdAbr8iU6lUVvzdoIFbgk+pHcQNd627LTZeuwYQSu+Awt4MSSalily4OfiPkIV/rsfGNxq6mRfMAUV3QJyQNmfkRekdYANQdAeKxgag6A4UjQ1A0R0omiLvA6oFtr2EOSAHzWoOmjfq1jVFzQEKGlUFDRqNxjaASqVyNm7/Cu3Vfdo1Byho1MPPqoJWXMbT2vXCHKCoVQ8/q4qacbr12KiMlN4Bef6CexU6mtU7pe7Zn1hK7wDDMMrN/wW/r51jN78cAAAAAElFTkSuQmCC",
  Vu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3BJREFUeJztnE1IVFEUgD+jgoICwzZDCSOiUbt0UVA0gaCrSgqhIlsEtYto0aaN21q4aFcQERmFG7dJYRMt2ljQokiJpqIkMlMrFYKYFjMXfbcZ/+697xD3fBt9lzfnHs753p33p6AoiqIoiqIoiqIoiqIoiqIoiqIoSgzUpDVRW/+bosvnH3XtCJLrmhBB/yeCGWB3fEPTBqd4c6NzgH8T1ADfAU3nXTteDd8mqAG+ApnO72vdAsDzH3O+QlfElwnRG7BWOoHVYkyjbN5qTVADXAOkfez7Rg0IPUHL5tL5gG8zTDzXtUAN8BXI7vDI60EAWvYcSYy/HdsKQGNmPDEeypSlUANCBR5pGgPgkNXRP1N9pV8y7V7mcTVGDXANYFZd+ypwsuE8ALfL+53++BNYYIYVR+r8QQ3wFcg2gfpNAHSeeQbAwM29AExSMoOyEdW+FdJCDfAd8GHDfWC+09Pfv1bcz3TeFdf7AtEbIFaAxsy42HG/kOgNCH41ODRwuOK46xqg9wQ94d2AmtaeGoDiMEWYPyO0Mce/uWr0dW2wUqI3IPjT4eJwT0UTXnbUA3DuQi8AzTuTBiz3DFHPAxwJ/i1grwmG3huvALh+dldi22DfNwh1zRC9Aam9IWI43r6/CPDrSqnD5hi2nybb42bbYI/rGrBKUns2aDo/MzENzHdu49UuAGYv9Sf2t+8v2B2uNr5Sojcg+Bpgd95w9Fhnxf0fPB4C4N7g01TWp+gNCLYGmM7XrStN0VGl49KoAaEn+PBlAoDW8va3sU8A1GW2JfYz42kTvQFaAOkEpAm+Btjf9xe7twP/3h+ofXcNgBOXR0OnlCB6A7QA0glIowWQTkAaLYB0AtJoAaQTkCbce4LvS1d3n2/1Jca7204t63NpEb0BWgDpBKRJ/W+GDpy8A8CTu5XH00YNkJpYquM20RugBZBOQJrUCjA1M8vUzOyyx9NCDZBOQBotgHQC0kRfgOBvYexuzpbeFP29+H6160s/X4wUUn1zTQ1Ia6JsNrvof5IqFNLtvCF6A7QA0glIowWQTkAaLYB0AtJoAaQTkEYLIJ2ANCGfC+Qc9897yWIJ1IAAMXOB4+Q9xQfUAC8G5DzEcJkv7xJMDfAQI29t51by4UKhcNBxPieiNyCN+3A5x8/nPeRQlegNUBQlbv4C9xwKmCUyDssAAAAASUVORK5CYII=",
  _u =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA89JREFUeJztm01IlEEYgJ+NjNSKCrtICSthUbf0UFC0QWCnSoqgojoEdYvo0KWL1zp06FYg0Y8UXrwmSSoduljQoUiJvoqS6M/+haC2w7eT7rir684fNe9z0R1m3xnmfeb9vm92FwRBEARBEARBEARBEARBEARBEARBEIT/n4yvgbb3PMmbvL9/31onc53nIui/hDMD9IzXttQaxZsYnQDsmyAG2A6oMm+a8XLYNkEMsBVIZX5z23IA7n+ZsBW6JLZMiN6A+aEnUC3KNArmVWuCGGAawPfet40Y4HqA1iXp/YBtM1Q801ogBtgKpGd45HEfAK0bdxe1Px1bAcDqxndF7a5MmQ0xwFXgkZYxAHZqGf316Xr6T2O7lXFMjREDTAOoqqs/BY43nwDgSqHfkZdfgSlmaHFC3T+IAbYC6SbQtBiAjqP3AOjt2gTAOKkZFIwod1XwhRhgO+Dt5pvAZKY/f3xbsp/KvCmm5wLRGxBsAVY3vgu276cSvQHOnwbv9O4q2W5aA+RM0BLWDci0dWYA8sPkYfKOUEftf/XUaOvZYK5Eb4DzT4fzw50lTXi4owmA4yfPA7BmXbEBld4hyn2AIc6vAnpNUJy/9AiAi8fWF71W6OcGrp4ZojfA2zdEFPvbt+QBvp1NM6z2sP5pst6uXiv0dqkBVeLts0GV+e8fPgOTmas7tw+AH6d7ivrr5wt6hsu1z5XoDXBeA/TM79nbMWP/WwN3ALjRd9dLfYreAGc1QGW+oSYdYscsmQ+FGOB6gBdvPgDQVnj9fuwVAA2NK4v6qXbfRG+ALEDoCYTGeQ3Qr/unDq8Cpp8PLHt2AYADZ0ZdT6mI6A2QBQg9gdB4/6Zoub1/td/oByVVE70BsgChJxAaWYDQEwiNu+8JPk+f7l5fTk9/h7oPATBepn9Xod83fruaUknEAF8DbT14DYCh7tLtoYjeAGcnrxvWZPMAi6pcY1ULHowkTk+HozfAeg0wzbxv/o1ZOsTbVeDT9x8ALK2vq6i/MkgZ5aoWiAGhJ1DODNU+v36h0/GjN0AWIPQEQmO9Bqhqnc1miw/5atK9vNT2gIZEb4D1a+u0zFfJsgXpX3kWcIz3+4AkKVMjNMZ/+plP9AYEW4AkSTLKhpBEb4C1GmCr+vtGDPA1ULX7XZnlql6IAR7HypVqTJJkG0A2mx3wOJe/iAHVvtF31XdVC6I3wHg1KzVB7fUK4s1YC0rEGawkbjmiN8D4KjBlT+ZgegYrzXwF41jNvCJ6A1zcXeVM3lyBQYMm8XXEAIexc5bjDVqOB4gBgiBEzh8iUkWshb00nAAAAABJRU5ErkJggg==",
  qu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA29JREFUeJztnE1IVFEUgD+jgoICwzZDCSOiUbt0UVA0gaCrSgqhIlsEtYto0aaN21q4aFcQERmFG7dJYRMt2ljQokiJpqIkMlMrFYKYFjMXfbcZ/+697xD3fBt9lzfnHs753p33p6AoiqIoiqIoiqIoiqIoiqIoiqIoSgzUpDVRW/+bosvnH3XtCJLrmhBB/yeCGWB3fEPTBqd4c6NzgH8T1ADfAU3nXTteDd8mqAG+ApnO72vdAsDzH3O+QlfElwnRG7BWOoHVYkyjbN5qTVADXAOkfez7Rg0IPUHL5tL5gG8zTDzXtUAN8BXI7vDI60EAWvYcSYy/HdsKQGNmPDEeypSlUANCBR5pGgPgkNXRP1N9pV8y7V7mcTVGDXANYFZd+ypwsuE8ALfL+53++BNYYIYVR+r8QQ3wFcg2gfpNAHSeeQbAwM29AExSMoOyEdW+FdJCDfAd8GHDfWC+09Pfv1bcz3TeFdf7AtEbIFaAxsy42HG/kOgNCH41ODRwuOK46xqg9wQ94d2AmtaeGoDiMEWYPyO0Mce/uWr0dW2wUqI3IPjT4eJwT0UTXnbUA3DuQi8AzTuTBiz3DFHPAxwJ/i1grwmG3huvALh+dldi22DfNwh1zRC9Aam9IWI43r6/CPDrSqnD5hi2nybb42bbYI/rGrBKUns2aDo/MzENzHdu49UuAGYv9Sf2t+8v2B2uNr5Sojcg+Bpgd/7osc5F93/weAiAe4NPU1mfojcg2BpgOl+3rjRFxxKdl0INCD3Bhy8TALSWt7+NfQKgLrMtsZ8ZT5voDdACSCcgTfA1wP7ev9i9Hfj3/kDtu2sAnLg8GjqlBNEboAWQTkAaLYB0AtJoAaQTkEYLIJ2ANOHeE3xfurr7fKsvMd7ddmpZn0uL6A3QAkgnIE3qfzN04OQdAJ7crTyeNmqA1MRSHbeJ3gAtgHQC0qRWgKmZWaZmZpc9nhZqgHQC0mgBpBOQJvoCBH8LY3dztvSm6O/F96tdX/r5YqSQ6ptrakBaE2Wz2UX/k1ShkG7nDdEboAWQTkAaLYB0AtJoAaQTkEYLIJ2ANFoA6QSkCflcIOe4f95LFkugBgSImQscJ+8pPqAGeDEg5yGGy3x5l2BqgIcYeWs7t5IPFwqFg47zORG9AWnch8s5fj7vIYeqRG+Aoihx8xf+3AqYtJlQCQAAAABJRU5ErkJggg==",
  Zu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA91JREFUeJztnEtIVUEYgD9DI7WiojaSwpXQqF26KChQCHRVSSEUZIugdhEt2rRp06IWLtoVhBSa4aZtkpjioo0FLYqM6PSU6KXmC4K6Lc6d9Iz3+rhnHtfO/230TOf+M8z/zT/nzJVAEARBEARBEARBEARBEARBEARBEARB+P8pctXRwZ6X6Tif72vdaWWsa2wEXU1YM0DPeGlNaax4s69mAfMmiAGmA6rMx814LkybIAaYCqQyv79+CwBPfs6aCp0VUyYk3oBi3wPIF2UaGfPyNUEMiBvA9do3jRhgu4O6jeHzgGkzVLy4tUAMMBVIz/DIi14A6vYeibS/Ht0GwI6Kr5F2W6YshRhgK/BIzSgAh7SM/h7vDH+paDLST1xjxIC4AVTV1d8Cx6rPAXA7c9+p95PAPDO0OL6eH8QAU4F0E6jaAEDL6ccA3L+1D4AxQjPIGJFrV3CFGGA64MPqe8Bcpid+fMl6n8p8XOKeCyTeAG8TsKPiq7d1P5/EG2D9bbD//uGs7XFrgJwJGsK4AUX1l4sA0sOkYe6JUEetf/XWaOrdYKUk3gDr3w6nhy9nNeFZcxUAZ8+3A1C7K2rAcp8Q5TkgJtZ3Ab0mKNpvPgfgxpndkWuFfm5g650h8QY4+wsRxfGmA2mAqathhtUa1r9N1tvVtUJvlxqQJ86+G1SZn/4+AcxlruxaKwAzF3si9+vnC3qGc7WvlMQbYL0G6Jk/eqxl0fsfPOoHoLt3yEl9SrwB1mqAyvzWkrCL5iUy7wsxwHYH7z5/B6A+c/1t9CMAWyu2R+5T7a5JvAEyAb4H4BvrNUDf9y+0VQILzwc2v7kOwIlLr2wPKYIY4HsACmXE3SvhdXfvkJN+xQDXHd7pCw+G2g6Gaz7XqbErEm+ATIDvAfimYHYBhaoJ6hRZnSrbQgywFXjkbfh296mjM+u/3+oIfw52hT997QaJN8Da+tpTm0oDrF/mHA92nYxc2177CjHAVuCVGqAzxR8Ano4EsgvYxPguEDfzrlkdo7SIsyfB8ekZADaVly3rfmWQMspWLRADfA8glxmqvbh8ndX+E2+ATIDvAfjGeA1Q1TqVSkX/15iScC1P/gqf8CrXFsbcF8YoPOJtF/iQMUE34x+Z9kDeBexi3IAFaz8HQZCjVjhGDHDdocp8oZB4Awp+AlKpVNpmnSj4CbCNsRqQb5Z87wZigKuOgiBozPzakM/nlSGmd5HEG1AwExAEQeM8S5xRMBPgi7xrgOuqvUgNGYgTVwzI94Ou9u9F6sKAifiJN8D4m5luhIXKPmAymBhgMXaD4XgDhuMBYoAgCAnnLxD7TgDSgHLDAAAAAElFTkSuQmCC",
  Wu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3tJREFUeJztnDtoVEEUhj9FBBUVX03UwAZR0U5tBB8bEWKliBJQwUawtAhiY2NjYyFipxDEF0pQAlYGX6sGbKKdYkRcFQniK/GViK9YbMZkL9k1mzszR7j/1yR3MnPOzzn/DnfuXQJCCCGEEEIIIYQQQgghhBBCiCwwIVTgjW2PB9Osv968NJi2kUyMkeR/xnuVXeenLJ6SKs7Ak4Gy61COkAN8BfLV+Uo4R/h2ghyQNkDozjtWzijF7+z6APhzQuYdMGm8C13n16yaDcD9TwNV5/+vyAHWAsaKc5hzHEMOTLsXyAG1Loj12Xe7fui9RQ6InbBSZ5/2zANgUd3bsvHuRx0ALFnWNOq6tMgB413ouxO/+s6Vfqkr73T34h4ANnvNNowcEDthJeckO326fjoAvewrDbz8DPg/FcoBVomTu35vQ6nTp4f+vnXPPQDaW1cDeh4QjJod4Drg6zmAcwL138rGP354U3Z9reEi4P8hphxgLWD4zm+6SX45YLwLfe0FlfaAm+1bxiutJuQAq8Tu3t+d8irtAbOeHQdgwqpDejMUgtRPhf/12a90zne07F1e+uXqy7Lx0J13yAG+AyY7njznO04cawHg6MmHAFwZ6rgjdOcdcoCvQO60Nh/3WS7tDfWT1o06//D+rhGzYOfBGwBc6LgbpfOOzDvA29vh5Dk9OZ78ztDUI80A9B9oK7ueNmcmEM8JckCsRDua1g4CbGrcUHXe5UvtQDwnyAGxEo3VAY6uzjsAvPvxEwjnhMw7IPpp8F3PKwDm1i2oOv7i9XtgeC8IReYdoAJYC7Am+h7QsnshMPwmyOHO/2eul24Yt23fCsDVWzeD6sm8A1QAawHWqADWAqxRAawFWKMCWAuwJtqdYPfzV2Oa13rqXNn1F36HkPOXzDtABbAWYE300+D6XWcBuH1+9PHYyAFWia06niTzDlABrAVYY1aAvq/99H3tH/N4KOQAawHWqADWAqzJfAGifiMLYMWS3CBA7/fq82ZNLv180F3UN0RCEt0BjlwuV/U/TRWLYTvvyLwDVABrAdaoANYCrFEBrAVYowJYC7BGBbAWYE3M9wL5lPMLXlQkkAMCxMwHiDkybsFnUDnAQ4y8hxhp8hXSBMu8A0I8dcnXMjmXy90abbxYLDZWWFKoUU9V5IAIOfIp1xc8aKhI5h0ghMg2fwA4TvoTsRxZ9gAAAABJRU5ErkJggg==",
  Ku =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA9ZJREFUeJztmk1sVFUUx38lmEgR+RA3FZs8QlqCO2BjAjolTXAlIRoSNHRDwpJFQ9iwccOGBSHsNGlMQaNpME1ctRHaKiRuqjuNNcRRAg3hq0Voa4oyLt5cZ97LzDDz5n4U3/+3mffu3HvOyT3/e+be9waEEEIIIYQQQgghhBBCCCGEEEL8/+lwZbh/5JdSO+MvH9ruLLZqVvlwspKxPssm82t61rRlZ+nXpcS9K0VIAbYM2cp8PYwibCtBCmjXgOvMG3a9HNu/Nv0AsKeE3CtgddaBJvN7dm8C4Ic/lxr2X6lIAaEDaBajMKM4ygpstxZIAa0O8LX2TdV3XVukAN8O62X2+uyrAGzrupton/l5HIDeHftrjmsXKSDrQNuZ+Gf+s/iiK5npmZ5ZAN616q2CFODbYT3lpDM93L0OgDmOxw03HgH2T4VSQCjH6ao/tzXO9HD5+4NHvwdgdOhNQM8DnNGyAkwGbD0HMEqg+69E+8MHdxL332z9ErD/EFMKCB1AZee3Loh/KSDrQFu1oF4NmBg9kDW0lpACQjk2e39zyqtXAzb+dh6Ajt0f6c2QC9p+KvystV/vnG8YPPZGfDF2I9HuOvMGKcC2wXTG0+d8w8fnBgE4+8lPAHxdzrjBdeYNUoAtQ+a09hpmLce1oXv1WzX7nz4xXdULPjh1BYAvxq96ybwh9wqw9nY4fU5Pt6f/M9R55hAAiydHEvdrX1kP+FOCFODL0eH9e0sA7/Tta9jvq0ujgD8lSAG+HDWrAMP0te8AuPfkb8CdEnKvAO+nwXuzNwHY3LWlYfsft+8DlVrgitwrQBMQOoDQeK8BgwOvA5U3QQZz/r9wOd4wvvf+QQDGJiecxpN7BWgCQgcQGu81wKzxgf54zZtaYD5Nu+nnmtwrQBMQOoDQaAJCBxAab78CM7/Hp71bn8bvCQb6jzTsP1Tu95inTuOSAkI5fvvDiwB8+3ntdl/kXgHOnwnu7I1KAC9lnGtTA36cKeqZoAuC/0vsWRjlGCXZVoIU4Mpw1rU/v7AIwIa1nfaDqkHuFeB8AuYXFv/LajPtvpECQgcQmtxPwIrbBzx64cX4czl5CiwWtRN0grezwNyyHXu2lZB7BTivAc1m3mQ2iiI/LwTKSAGhA3BV3Zsl9wp47iYgiqKSzTrx3E2AbZzVgKxZ8v1rIAWEclwsFvvKl4VQMYAUYF8BvtZu2k/W/YQUYMFGoZXOVWvfCu3uJHOvAJv78EL1TRRFk7U6taqAtJ2q8VOt2KmHFODAZqH6pkEGszLV5vgEUoBD2wXL9qYs2wOkACFEzvkXV0o7etsBK9gAAAAASUVORK5CYII=",
  Ju =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3tJREFUeJztnDtoVEEUhj9FBBUVX03UwAZR0U5tBB8bEWKliBJQwUawtAhiY2NjYyFipxDEF0pQAlYGX6sGbKKdYkRcFQniK/GViK9YbMZkL9k1mzszR7j/1yR3MnPOzzn/DnfuXQJCCCGEEEIIIYQQQgghhBBCiCwwIVTgjW2PB9Osv968NJi2kUyMkeR/xnuVXeenLJ6SKs7Ak4Gy61COkAN8BfLV+Uo4R/h2ghyQNkDozjtWzijF7+z6APhzQuYdMGm8C13n16yaDcD9TwNV5/+vyAHWAsaKc5hzHEMOTLsXyAG1Loj12Xe7fui9RQ6InbBSZ5/2zANgUd3bsvHuRx0ALFnWNOq6tMgB413ouxO/+s6Vfqkr73T34h4ANnvNNowcEDthJeckO326fjoAvewrDbz8DPg/FcoBVomTu35vQ6nTp4f+vnXPPQDaW1cDeh4QjJod4Drg6zmAcwL138rGP354U3Z9reEi4P8hphxgLWD4zm+6SX45YLwLfe0FlfaAm+1bxiutJuQAq8Tu3t+d8irtAbOeHQdgwqpDejMUgtRPhf/12a90zne07F1e+uXqy7Lx0J13yAG+AyY7njznO04cawHg6MmHAFwZ6rgjdOcdcoCvQO60Nh/3WS7tDfWT1o06//D+rhGzYOfBGwBc6LgbpfOOzDvA29vh5Dk9OZ78ztDUI80A9B9oK7ueNmcmEM8JckCsRDua1g4CbGrcUHXe5UvtQDwnyAGxEo3VAY6uzjsAvPvxEwjnhMw7IPpp8F3PKwDm1i2oOv7i9XtgeC8IReYdoAJYC7Am+h7QsnshMPwmyOHO/2eul24Yt23fCsDVWzeD6sm8A1QAawHWqADWAqxRAawFWKMCWAuwJtqdYPfzV2Oa13rqXNn1F36HkPOXzDtABbAWYE300+D6XWcBuH1+9PHYyAFWia06niTzDlABrAVYY1aAvq/99H3tH/N4KOQAawHWqADWAqzJfAGifiMLYMWS3CBA7/fq82ZNLv180F3UN0RCEt0BjlwuV/U/TRWLYTvvyLwDVABrAdaoANYCrFEBrAVYowJYC7BGBbAWYE3M9wL5lPMLXlQkkAMCxMwHiDkybsFnUDnAQ4y8hxhp8hXSBMu8A0I8dcnXMjmXy90abbxYLDZWWFKoUU9V5IAIOfIp1xc8aKhI5h0ghMg2fwA4TvoTsRxZ9gAAAABJRU5ErkJggg==",
  $u =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA7dJREFUeJztmjloVEEYx38RBY331UQNRERFO00jeGxU0EoRRVDBRrC0CGJjkyaNhYidgoUHKkEJWCnGKCrYrHaKEfHhQRCPJF6JxGMtdsfkPbObZHeOxff/NcmbvPfNMN9vvn0zGxBCCCGEEEIIIYQQQgghhBBCCPH/U+Mq8Oa2p7lKnu/YvdzZ2IYzwUcn1Yz1WTaZn7J0SkVxBp4NxK5dGSEDbAWylfliGCNsmyADKg3gOvOG1TPy8e9newB7JqTegInlPmgyv7ZxDgAPPw+UvL9akQGhBzBWjGHGOAoGVloLZMB4H/C19k3Vd11bZIDvDotl9nn3fACW1L2PtXc9uQHAshVbRnyuUmRAuQ/azsSvvgv5X+rime5a2g3ANqu9DSEDfHdYzJxkps/WTwegl0P5hldfAPu7QhkQquNk1e9dnM/02cLfdxx4AED7mTWAzgOcMW4DTAZsnQMYE6j/Hmv/1PMudn1z8WXA/iGmDAg9gKE3v+lB+pcB5T5oqxYUqwGd7dvLHdq4kAGhOjbv/maXV6wGzH5xEoCaxhZ9M+SCik+FR1v7xfb5huaDK/O/XH8Va3edeYMMsB0wmfHkPt9w6kQzAMdPPwbgWiHjBteZN8gAW4HMbm0BZi3na0P9xPUj3t96ODvsLth79BYAl27c85J5Q+oNsPbtcHKfnmxP/s9Q7bHdAPQfaYtdT507E/Bnggzw1dGeLetyAFubNpa87+qVdsCfCTLAV0djNcCQvX8XgA8/fgLuTEi9Ad53gx+63wAwr25hyfaXbz8CQ7XAFak3QBMQegCh8V4DmvcvAoa+CTKY/f+5jvwL485dOwC4frvT6XhkgK+OLrZuAv7NfGhkQOgBJNe+b1JvgCYg9ABC47wG5LItOai+6m+QAaE6NtV/w77zJe/7ym+n45ABrjsw3/DkssQ+6EfLvC9Sb4DzM8FVyxpyANPKnGtTAx51RToTdEHwvcBoGHOMSbZNkAGuApe79vu+9QMwa2qt/UGNQOoNcD4Bfd/6/2Z1LO2+kQGhBxCa1E9A1bwHvB4s7PomTQbgy2B8FxhFehN0gvO9QENDg5XjXhngiOAGmMyO1RTbJqTegKqZgCiKalyt81JUzQSEwtl7gK3q7xoZEKrjcte7MctWvZABtgOOY+1nRmqMoqipEOe2rTGVQgb47tBkuFqQARZiZIZf+FrDyVpT7qeCDLAQ407hZ2Z4oy8TKn0fSL0BLnZfGZvBkgbpPMAyLvffGcvx7liOB8gAIUTK+QNl+j2CqDDtQQAAAABJRU5ErkJggg==",
  td =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA2VJREFUeJztnD9oFEEUxr8TES5KMMI1dmuh1iY2EslFAomFhUQC4h+QoKVWWqfWSkslWBgJBIOFhQiCFww2ntYqwevSCCaI5kDQtbib5HbM3d7uvLl3MN+vym5mvnm8983M7dxyACGEEEIIIYQQQgghhBBCQqHQq4Emlj7FWdq/njnek9j29GKQfsZblu2KF48WM/Wvf6knrn05gg6QFjSVz1rxNIwjpJ1AB0gJ+aq8jbQT6ABXAVP50ZFDAIAPP+od27syPNhw2Gr1OwB3J9ABeTv2uvI2Uk4I3gHeEjA8WNyukku7bnXyErwD9mbtoD33DWZcEweacWVdC+gAX8JpzjDzOq2db4fRAXk7ulZGqrKuOsE7gAnQDkAbJkA7AG2cnwZ9nwCl4XpCFLwDmADtALTJPG/6Ze7b5F0LgncAE6AdgDY9S8Daeglr6yWxdlLQAdKCviroSzd4B4ifCf7ZXGj8cXiyq/vS/bMSvAPEngbtd3ra3bf/b0hrl6bPp8GciL0fYCpwcfJ0DADfZh8BAM6u3gMArLx7n+i3dWcpcT1wdyZxPXbqJADg5ehtAEBp/joAYPHV28Ju4+YleAc47wJ25afGzwAAlk1Fm5W0sSveDtNu6sJ5cysGgEW+IySDt+8Gp5sVW372HMDOnO4Ws2ZM71TeC3SAq4A999th7wJ5aRmnsRY0d4W80AG+B/A9h10J3gFi7wrH1bkYADaO3AQAvHh4X0oaAHDuxi0AwNDXBwCAwsgcPwdIwARoB6CN8y5gz33fmHHiauNzgOtaQAdIC5pV2peutNPoAF/C848bp7iz1y6L6FyduOIc027QAb4HMBXsV4J3ABOgHYA2TIB2ANqI7QLmk9rYpSdSkgmM7spTWd3gHSB2InTiWBQDwIFmTjd/bQEADu4fSLRzvf8TfwEAHz/XeCIkAROgHYA2TIB2ANqI/4qMvRvYZN0FDNKrv4EO8CUcRVHH3w4b2pe83vjdWa9Wk628IXgHeD8Raoc9l9Mc44vgHcAEaAegDROgHYA2TIB2ANowAdoBaMMEaAegjdqzAICy4tjb0AEeNMseNFt1K5KidICARllAw2W8iotY8A7wcc5Wbr2IouhN63WtVhvv1LmL9hWH2P6DDujBGGXH/hWBGNoSvAMIIWHzD3+ZFlIPBYi3AAAAAElFTkSuQmCC",
  ed =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA5VJREFUeJztnEFIVFEUhn8jAi0kIzfSZlxU67RNGI4l2DYUQcpCpG27oqWbNrVrGxKkJUjSsgLJkaJN1rpCnE24KVKGVAhqWsyc0XnMzPO9e+4c4f7fZpw39/73cM5/73v3zRsBQgghhBBCCCGEEEIIIYQQEgYtzRpocP5LMUn7xdGzTYntUDMGOch4y3K04q2nWxP13/m2U/XelyPoAG1BqXzSischjtB2Ah2gJeSr8lG0nUAHuApI5ft6TwAAPhV2GrZ3pae95LD3K78AuDuBDkjbsdmVj6LlhOAd4C0BPe2tlSq5tNuvTlqCd8DhpB2s574g40ocKMeVdC2gA3wJxzlD5nVcO98OowPSdnStjFZlXXWCdwATYB2ANUyAdQDWOO8Gfd8BisP1DlHwDmACrAOwJvG8OShzP0ratSB4BzAB1gFY07QErK53YnW9U62dFnSAtqCvCvrSDd4B6vcE/27Olv7oGtrXce3+SQneAWq7wegzPfWORz8X4trF6XM3mBK15wM6p28BAK4MXAIAzHSPAQDaHowCAPovnAcALH/4CADYvjtfpSPtBGn/qu8OAGB8bQ4A8HrpLQDgx+RjAHw+wBnns4BUYGzoYtVzgVKxhTr9ohWvR6XdyNWa47pCB/geYLhcuYUXLwHszu04ZK0YjlRe1hgARQCYe/OOa4ALzg6Qub+nMlX8XP9e9V4qmxTROdl1KlX/etABvgeQig2PuFVuYuohAKBj7REA4OY9t7kv0AGuArIKP79/uQgAG923AexW6ulioh+KNJ3gHcAEWAdgjfMaUFyZqpr7vpA1RcYprpSuBFt6p3gl6IL6dYDv1b9QKJTGUdKjA3wJTz8p3cWdnLieql+UG4PjzjHVgg7QEpK5H6VeRZPSf20GALD8TEWuQvAOUPvd4LkzmSIAHPOc09/4BwD4/DXP3aAGTIB1ANYwAdYBWOMtAZtb29jc2t73cSvoAOsABCvHHJgEWOH9ewEttK8AheAdoP5fZOL2BDKfjx9tA7Bb2Y0/jXXzed3KC3SAL+FMJtPwpmDHkdKrzOm49nSAJ8zOAtqreVqCdwATYB2ANUyAdQDWMAHWAVhjuRvMGo5dgQ7woJn1oLlXN6cpSgcoaGRrHczn8wMAkMlklmodVxwv5yJGByho5Mqv2VofKlQ8blwn6ABFrVz5Nauo2WgcFYJ3gM+7Mtk0nRqcNXKO8dQkeAcQQsLmP4DlNuAz7Od7AAAAAElFTkSuQmCC",
  id =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA2VJREFUeJztnD9oFEEUxr8TES5KMMI1dmuh1iY2EslFAomFhUQC4h+QoKVWWqfWSkslWBgJBIOFhQiCFww2ntYqwevSCCaI5kDQtbib5HbM3d7uvLl3MN+vym5mvnm8983M7dxyACGEEEIIIYQQQgghhBBCQqHQq4Emlj7FWdq/njnek9j29GKQfsZblu2KF48WM/Wvf6knrn05gg6QFjSVz1rxNIwjpJ1AB0gJ+aq8jbQT6ABXAVP50ZFDAIAPP+od27syPNhw2Gr1OwB3J9ABeTv2uvI2Uk4I3gHeEjA8WNyukku7bnXyErwD9mbtoD33DWZcEweacWVdC+gAX8JpzjDzOq2db4fRAXk7ulZGqrKuOsE7gAnQDkAbJkA7AG2cnwZ9nwCl4XpCFLwDmADtALTJPG/6Ze7b5F0LgncAE6AdgDY9S8Daeglr6yWxdlLQAdKCviroSzd4B4ifCf7ZXGj8cXiyq/vS/bMSvAPEngbtd3ra3bf/b0hrl6bPp8GciL0fYCpwcfJ0DADfZh8BAM6u3gMArLx7n+i3dWcpcT1wdyZxPXbqJADg5ehtAEBp/joAYPHV28Ju4+YleAc47wJ25afGzwAAlk1Fm5W0sSveDtNu6sJ5cysGgEW+IySDt+8Gp5sVW372HMDOnO4Ws2ZM71TeC3SAq4A999th7wJ5aRmnsRY0d4W80AG+B/A9h10J3gFi7wrH1bkYADaO3AQAvHh4X0oaAHDuxi0AwNDXBwCAwsgcPwdIwARoB6CN8y5gz33fmHHiauNzgOtaQAdIC5pV2peutNPoAF/C848bp7iz1y6L6FyduOIc027QAb4HMBXsV4J3ABOgHYA2TIB2ANqI7QLmk9rYpSdSkgmM7spTWd3gHSB2InTiWBQDwIFmTjd/bQEADu4fSLRzvf8TfwEAHz/XeCIkAROgHYA2TIB2ANqI/4qMvRvYZN0FDNKrv4EO8CUcRVHH3w4b2pe83vjdWa9Wk628IXgHeD8Raoc9l9Mc44vgHcAEaAegDROgHYA2TIB2ANowAdoBaMMEaAegjdqzAICy4tjb0AEeNMseNFt1K5KidICARllAw2W8iotY8A7wcc5Wbr2IouhN63WtVhvv1LmL9hWH2P6DDujBGGXH/hWBGNoSvAMIIWHzD3+ZFlIPBYi3AAAAAElFTkSuQmCC",
  sd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA59JREFUeJztnEFIFFEYx/9GRVpIRnuRINZDdU67ROEaC9YxCkFKI6Rrx+jouU51LMRIQZCiQ5cCyY2kS9a5QtxLeElK1lwhyO0w+5k7jDs78763b+P9f5dxZ9/7v4/v+78388ZhAUIIIYQQQgghhBBCCCGEEOIHbc0aKD/7uZKk/dzQqabEtqcZg7Qy1rIcrnj7ifZE/Te/btZ8tuUIOkBbUCqftOJxiCO0nUAHaAnZqnwYbSfQAaYCUvlzfUcAAB9Lm3Xbm9LbGThsYfEHAHMn0AFpOza78mG0nOC9A6wloLezfbtKJu0a1UmL9w7Ym7SD67kvyLgSB6pxJV0L6ABbwnHOkHkd1862w+iAtB1NK6NVWVMd7x3ABLgOwDVMgOsAXGO8G7T9BCgO0ydE3juACXAdgGsSz5tWmfth0q4F3juACXAdgGualoCllQyWVjJq7bSgA7QFbVXQlq73DlB/JvhnbTr4o3uwofPa/ZPivQPUdoPhd3p2Ox/+XohrF6fP3WBK1N4PyEzcAgBcHLgAAJjqGQYAXFq4DwB4+/5DTb/yndmazx33hgAA/WfP1LSXdiPLMwCAV/NvAADfxx4D4PsBxhhfBaQCw4Pna94LlIqiWtEw29/HIJXfbVxT6ABTAam8zH3hytXLAIDnz14A+De345C5L/1tQwdoC66ufAMAHO0+VnM+fBVIq7PDaRUAmHn9jlcBE9TeFK0sjlcA4GfPbQDAy0cPtKQjkfsBOsAQa2+IaDGaDwoszupafggAuHHXrPKC9w5gAlwH4BrjNSC8+ssctYWMU1kM7gPa+sZ5FTBB7SpQKpUAAF1aglWezgWbzNF84CxxgBZ0gC3hicnpyPNjN6+n0hnNjxjHFAUdoCV0fPUJAKD/2lTddrs5o1G0rzLeO0BtN3j6ZLYCAIcs5/QXtgAAn74UuRfQgAlwHYBrmADXAbimZRKwtlHG2ka54fNatEwCXGEtAa4qmhTvHaC2F5A7M7kj/F/w3gHWfkcom63vhK79wVH2DrIuHD7YEdleew8geO8AZ/8ZCq8Z6/sOAADWf29Fti8WdSsv0AGuAxAnxK0ZtvDeAUyA6wBcwwS4DsA1TIDrAFzj8j4g53DsbegAC5o5C5o7dQuaonSAgkZOQQPFYnEAALLZ7HzU+TrjFUzGpQMUNArVY05BK6riceMaQQcoahWqx5yiZr1xVPDeATZ/wz8HNLSqN0rBMJ5IvHcAIcRv/gIj1Tzr0+v6lwAAAABJRU5ErkJggg==",
  nd =
    "data:image/png;base64,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",
  rd =
    "data:image/png;base64,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",
  od =
    "data:image/png;base64,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",
  ad =
    "data:image/png;base64,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",
  Ad =
    "data:image/png;base64,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",
  hd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAAC3xJREFUeJztnWuMHlUZx//dvpYGS9tNbUs1QdnUFLtWXL54ITTVFgxGYQETlNTaECKCuMakFRJEresNaUxcRYUQqRU1JIBLNWzEtmkwiCaSFcqCl0gjiVRay+6WS8i63frhzDPLPDtnz5l5zpmZd/v8vrw7887lvO/u/PZ/njOXeaiYsasHTr5+urXurUG2O/HISGZ6wfruINttOpMH/5U7f+lP+uZVsf+OKnaizF0q+SsFps0TyjgEHYGht9vu0PcS20RqIEVEdAOpeeoltonUQIqIaAZS8zSLWCZSAykightIzdNsQptIDaSIaNXdABdqnmajBlJEBMtAmn1kVP05Q2UhNZAiorEZ6FQxT7ujBlJEiDOQZp+wtFsWUgMpIhqXgeoyz6lqPClqIEVE4wykVAsZl7Js0SykBlJElDZQrN6Xi6kj4wCAjhVLgizX1OzT1HZx1ECKiMZkIN8jbuqFMQAeBvJcTpGhBlJE1G4gyipKliUXmwt4x4fyzby3/xO562265Zel9le2N6YGUkQUNlBdvS/fjNQuvRdfDgzeZH4YzM7f0PttAPV/TjWQIqL+DJT0luo+klz41pWIE+eeBQCY/8Rzov1eese3AADjQyaS0PdkuysHp2i7i6IGUkTUZiBX7yvUERxqu751Jdq+dH8uuIlsBj954ToAwNTvDgIIbyI1kCLC20B19b5c+B7h3AxKPkXrQWogRUTtvTApvtmClottIr6fstlndOMnAQCd+34WpD1Toq3YUQMpIio3kO/YV+heC98u9V5cY07S/YTC1c66KvBqIEVEfXWgNqlANx3fynSs86PUQIqItu+FFaUp5x/5jlEV7Y3FHvviqIEUEXPGQLHN0rFyKYDmn28UKuv4VqTVQIqI6utAkXtfrnpJeoQmRhkfGvNaLzTcFLwuNeq5HVpvaudms71t9wRspRs1kCJi7mSg5Ij25eaDdwMA+ldcBgDo++lgZtpFrCxEva6vbLkiM3/gU71B9xMKNZAiom0M5HsGHkGZYDLJBHz56SPaZI7+octmXY+yCpkudmbasfv+zHRfYiRfQ1aFGkgR0TYG8r0KgWcI2xFLy6VsLNYeWr9jqFivx/dzcMiY40OlVo+GGkgR0TYG4tiyEJmHMgSdiTdZsD7iylBFl+PwDFUU+vy3HPmVmbHFvHLj0nJU9wqNGkgR0bYG4tAR1o+kN8XeH1j+DQDA0ZG1ZkZyxBLLu58GANxw4zOZ+TbD0DS9X9ZEZSvItN4ObM6+YdmOXpmqNJK2NZCtDkN1mh/c+g4ArzMO1mI2aDleAU6zVMUmmmHMhNSU3DwJRa+dl6IGUkR43xM41JWpZceQ+BGVjlpTPSY5ctNeCWPDH1fkzj/w3iMAgIFf78/M77/pTADTBuCVYVtmIZO4lrMtzw3ogozUd/TmzPxpQ2fv6lEU17M01ECKiLYxEF+foCONRtOJ3i98CQAwduWdmfnLW9nYd8HhfEPs32+M1NPTU6qdRbnt2qsAAJs+sx3AzHYTH/j7jwAAnZ2dAIC+j34w877NlGogpZG0fS+s/8/fTOaYrELm4XDz/OHVl80Pq0wGsZmoKrh5eHsJMg9Bn/fRh43BeCU+NmogRURlBop11QT1kgqbh08nJlox/w0AgJ6D3w3ZTG9s7X3/6YsAAL9fxeo/P78aAHD+Rb8AAAyOfB3AdB2sD9neWWjUQIqIts1ANniv6anklcxiw/V+bKjdtvaSiXrPMBnoyIn/ZdYbHh7OLJ9WsPPLX058n6WqBlJEeBuI/hKbeq9EW72mbrMUxbe9fDn6/OyG9tF/T2ogRURjMpBvhZpfUUpjQbb6B2UFOmKpN8N7NzOWL/EZmgQ/M3HikREAwIL13UH3owZSRFRXB2LXpJcdE+PXZ9EZhFT3cEEmot5M07G102ZKMjKOZg3U0bkIMVADKSIak4F84eaiM/9u2PlM7vLvfPr7ANzn5Tz50J8yy9fFmR86b9b3Xe2k84JcZyba/gP41n8INZAionID8QxTFtvY2t9eNZlh+PkJAMDHV79ilk/O/Htq7edy16vbPESoduo50Upb0JgMVLR3xg1GdzFdk5wjvWZ1/npNMY0LVzu5aa/68R2Ftj/57H9y5/tmH0INpIgIZqCi9ye2GceVjWg9vhxdfdAJY6IZd9+YY6w53dxFkZt24dvNmZqv/cN8H9woNJa54H3nAJBnUTWQIqK2DBSqN8avf6LXovf7iQWdwzw66nvf1XIsuf5FAMBL93cBAFrrzPdLxuHw771o9iHUQIqIcBmo5B3SbVnI1huzmYtf4Vk36dUTj+8wr1199TUG5Q3jQg2kiKi9DsSN4nv1BpmJ7s7RtN5XmnlqNk/RpzAXRQ2kiGjMc+N5fce3Mt10E1XGIZO5Jh77KwBg4aXvqWS3aiBFRO0ZiOC9N5uJCG4kbiJ+/+am9dJC0fnsAP2UmV/VkwvVQIqIxhiIoCNmwWKq3JrX067IVnLHf+i3vblqnhks2gsAaHVdWOlu1UCKCKeB6roSdXLh28xrkn1OW539H09jYDjbmGm05npL1aTZJ+l9Hbt9HQCgZYbCoj0nnqMGUkQ0LgPZOHb7C7nzl312JQCgE+aIDG0i3+e1c/adXAYAOG/Th0M2J8c8+d9LVaiBFBFWAzX1LhwcOgJDm6iseYiN844BAPbtfQiA3ERNMw+hBlJEiDNQrKcXlyY5QmNloqKQicqejxjKPLFG5dVAiogZBqor+4Qauxld9rz54bh5oSzTbqPzLvO0usyzPFzXd9Hvc97mC8wbga9YVQMpItqmDlQWMlLaq6q4cl3UfLF6W/OfeA4AMBlka9OogRQRpQ0UuvcVe+zGlo1sRiJzlK0H+ZpnpnEmknfKmYcyke16sNC9MTWQIiJ6BipqqhPnngVg+n82x9X78CXNRofenLzmGyl07y20cepGDaSISA3ULmNfoUmzUYLLSEVxGSeUUW3YnjAQKgupgRQRpTMQXS0x15AayWacVleUS9NrRw2kiChsIOmYlWt9W++LoKwQOzsQTiMxmt6r4t8/jZGNoVwWUgMpIqLVgWz3+ymbnbhxuImA3MIr8O4bs9N/ubXU/jlNOSPQF94bC1XxVwMpIhozGu+6G0fh7MPNY5sfyEixiJ31KHOeKJmF1ECKiJZvBbqquz1w/E20stwOyEglTWQzhCuzxe49VoUaSBERPQO99qB5vtV0bykfbjZbFrr88L3mh8PmZc/5nwcAjA8lC5S9GYctM1nMRO3Y02X2X5VZXN9j1aiBFBGN6YURtvtAk4n2wBzxlzz6vWoaxMw0yozE2/HAqisz88mQoQlturLnTKuBFBG1GcjVq3Pdsd5G73X3AQAGH7NkmsikGS3BZsqiZvLNWLSc7Sk9tpGAos9KJdRAiohoBrLdRbXomJjNRJSFiMoyEWPpGW/MTI+99IrXetTe3b/dBwBYtPXOWZcPlXlC1/HUQIqIaAZKM47tyYTJ+74Vbtdz0LkJtl60AQCw6zsXmxm2Ok9J+P5c8wmboV7e9enMtMtIvsTKPoQaSBHhbaC0PuMwBr3/4rXrc99f+rU9ZseBTMTrLVuevCt3vbu/un3W7VYFN9TixYsBAMePH8/ML2ok3vvi5rFV+vXKVKVWCmcgX/PQkcUZ+/IlAGaaKBZbv2gGybrPNucyv2nVW6Luryy27yvlgW0AgKnLd2Zm12UeQg2kiCjdC7MZx3EcpcuFMhFlCso+u991TWZ6rtFhMVHV5knbE3JjyqlHq+hVEmSeye0fAQD8c3g4835PT4/XdmwmShsWOBuNHDLXd3Un02Wz0H8P/ztIe3Y9fKDUesPJ991DJkrmd2y7J3f5WOYh1ECKiDQD2eow/CnKZB6CGyc9QkqaqO9j5nU3TJZpqomaBj0XreO235jp5PcWyzyEGkgR8X+cbn/eNBwLvQAAAABJRU5ErkJggg==",
  ld =
    "data:image/png;base64,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",
  cd =
    "data:image/png;base64,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",
  ud =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACjVJREFUeJztnV+IXUcdx7+5vaQpxiRrtLEVql0U1CXW+CIihkJaoSJtbAWx1DaIKP4hvqRWEP/EPGg1LwYrWMTGWBTRlhiERW2gFErxQWIbYgtigwUbq6Z3N1UoYbPx4Zzfiee3dzIz5zdz/ux+Py93z7nnnpm9yXz2OzNnzlmHlln45KGL/7893v7mJOc9/8Sp2vb6nXNJztt3lk7+ber+LT/eu66N8kdtFEJWL638LwUumSeVcQRpganPO3Tke8ltIhqImMhuIJqnW3KbiAYiJrIZiObpF7lMRAMRE8kNRPP0m9QmooGIiXHXFfBB8/QbGoiYSJaBmH1stP17pspCNBAx0dsMtFbMM3RoIGLCnIGYfdIytCxEAxETvctAXZlnrRrPCg1ETPTOQKRdxLiSZWOzEA1ETDQ2UK7el4/lfy4CAEZXb05yXF+zT1/rpaGBiIneZKDQFrf80gKAAAMFHkds0EDEROcGkqxC6my+pVjAuzg/3cyPHfj41M/d9NWfNyqvaW+MBiImog3UVe8rNCMNpfcSyuNHv1z8cLS+/8bd3wbQ/e9JAxET3WegsrfUdUvyETquJFy44ToAwBVPv2Aq97YffgsAsDhfRBL5nlx35dDE1jsWGoiY6MxAvt5Xqhac6ryh40pyfmt5PrSJXAa/ePN2AMDy708CSG8iGoiYCDZQV70vH6EtXJuBTCd2PIgGIiY674VZCc0WclxuE+lymmafya5PAABmjv80SX2WTWdxQwMRE60bKHTuK3WvRZ9Xei++OSdrOanw1bOrEXgaiJjobhxoICPQfSd0ZDrX9VE0EDEx+F5YLH25/ih0jiq2N5Z77ktDAxETq8ZAuc0y2rYFQP+vN0qVdUJHpGkgYqL9caDMvS/feEnVQkujLM4vBH0uNdoUelxqEnge+dzywbuK8+17OGEt/dBAxMTqyUBliw7lKycfAgAcuPojAIC9Pzla2/aRKwtJr2so0EDExGAMFHoFnphk/5FHiuPLTKCPP3TP7vKnInMcmC/MI1lCf06yipgud2b6+t13TN0fasi2oIGIicEYKHQVgpjHx4qssSuuPvL50Xxcr6fp7yEj0Yvz048XY7VtKBqImBiMgTTBd/NQmSYUVxZqepxGZ6hY9PjPfhSvUL+nHCfjXqmhgYiJwRpIU7WwsgVKyxSajtS6DLOkymlqImu9QuHKVNJLBmsg1zhM7Ih0KG2byGUYn3li185boYGIieB7Aqdamdp0Dkm3qGrWWsZjHBkiNiuEElqeL9ukqp8u55Kh63f1iMX3LA0aiJgYTAbSf9ulZc2gGKGdHEw7iz3z4s9q25Nr76xth5oj9DhfeaFIeXI9UexIeSw0EDExGANpdAZKTVMDdFVerqzngwYiJlozUF/WY5G00EDExGAzEMlL6LNUaSBiIthA8j+xr/dKJHVGkXNxjcvJenay6ulNBgqdI9MrSuVa5u/f/w4AwL9OvbN2fOg10kNFfm/hC/c9O/W480+cAgCs3zmXtHwaiJhobxxIrUlvOiuv12cJ0vK0iXQL1YbSvGHuz7XjZNvVslMhqyp0+b76AfV6uhjNbExQyynnzXJWsmaIekY40LwXplcH6Lt0NH0emF6doHGt8PTRVXYKra+rfrr3pa+j8n3foeM/VXlBtSXEQeu9MFeGiSV0bm1ovbBU9eU10WQQ9GYcKLZ3pg0ma8eHdn+dVMSuK1t6/h9T94dmn6rcqFIJUSQzUOz9iV3G8WUj3YsTVlwjvUZNtOFtxZWar/6l+D60UaQXvf59bwdgz6I0EDHRWQZK1RvT65/kNfZ+P7mYmZkBAEwmofddbcbmz70MAHjlkVkAwHh78f2KcTT6e4/NPgINREyky0AN75DuykKu3pjLXF2tSnAh5sEf9xevs3u7qwyaG8YHDURMdD4OpI0SOsIsZpK7c/St91Vlno7NE/sU5lhoIGKiN8+N1+M7oSPTfTdRa5wuMtf5p54DAGy47b2tFEsDEROdZyBB995cJhK0kbSJ9F0p+tZLS8XM84fkp9r+tp5cSAMRE70xkCAtZv0mGbktXq+8oz6Su/iDsPOtVvOsYONjAIDx7M2tFksDERNeA3W1EnVpw1uK1zL7XPnW+t94mQPD9YWZJh2Pt7RNlX3K3tfZB7YDAMbFVFi258RraCBioncZyMXZB16aun/r57cBAGZQtMjcJtrwywcBAFe97qrLHnf84lYAwHtu+lDS8leaZ/r30hY0EDHhNNBQ7sIhLbAtE/nMI+xad7aoR6Jy+2YegQYiJswZKNfTixtTttC2MlFuUpkn16w8DURMrDBQV9kn1dzNZOuLxQ/nipeu1otZy/OZZzz7RgD+9V3y77nurg8UbyResUoDERODGQdqihhJTGQduc5tsly9rSuefgEAsJTkbJeggYiJxgZK3fvKPXfjykZdz6WtNM758p1m5pFM5FoPlro3RgMRE9kzUKypLtxwHYBLf7M1vt5HKFU2On1t+dqOkVIbp2toIGKiMtBQ5r5SU2WjktRG8hknlVFduJ4wkCoL0UDEROMMJKslVhtWI7mMM57NsjS9c2ggYiLaQNY5K9/nXb0vQbJC7uwgeI2k6HuvSn//Mke2gGZZiAYiJrKNA7nu99M0O2njaBMBUwdegXffV9/+0/2Nytf05YrAUHRvLNWIPw1ETPRmNt53N47o7KPN49qfyEi5yJ31JHNeaJiFaCBiYhw6At3W3R404Sba1qwAMVJDE7kM4ctsuXuPbUEDERPZM9Crv/5DUVDVW5qONpsrC91+5hfFD2eKl2Pv/yIAYHG+PKDpzThcmclhJqnHsdmi/LbM4vse24YGIiZ60wsTXPeBFhMdQ9Hib33ye+1USJlpooyk6/HoNR+r7RdDpia16ZpeM00DEROdGcjXq4t9lqqw+7O/AgAcfcqRaTJTZbQSlyljzRSaseQ411N6XDMBsc9KFWggYiKbgVx3UY2dE3OZSLKQ0FomUmx57Wtq2wuv/Dfoc1LfI789DgDYuOfByx6fKvOkHsejgYiJbAaqMo7ryYTl+6Ej3K7noAvaBHs+eCMA4PB3bil2uMZ5GqLL8+0XXIb6z+FP17Z9RgolV/YRaCBiIthA1fiMxxjy/suf2Tn1/S3fPFYUnMhEerzl7md+NPVzD33j3suety20oTZt2gQAOHfuXG1/rJF070ubxzXSz5WppFOiM1CoeaRlaRa+diuAlSbKxZ4vFZNkc9cX1zK//po3ZS2vKa7vq+LRfQCA5dsP1nZ3ZR6BBiImGvfCXMbxtKPquFQmkkwh2efIuz5V215tjBwmats8VX1SnoysPcaxqyTEPEv3fhgA8NcTJ2rv79ixI+g8LhNVFUucjU6dLtZ3zZXbTbPQv8/8PUl9Dv/u8UafO1F+3zvEROX+0b6Hpx6fyzwCDURMVBnINQ6jn6Is5hG0caoW0tBEez9avB5BkWX6aqK+Ic9FG333N8V2+e+WyzwCDURM/A+rDxRlYOsjXwAAAABJRU5ErkJggg==",
  dd =
    "data:image/png;base64,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",
  fd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABNRJREFUeJztnEFoHFUYx39jQywGkjUppQdpQjyXEKgIBWmLPSu9FamkyUXoYQ8SQSnKIhQPhh5yEQ/dNiptblrPiikLkWIhlNCLkJLVS5CkboKrNSTdHma/LPOc2d2ZebOvON/vMjsz733f433/9703byYBRVEURVEURVEURVEURVEURVHyghe3Qm1mPnA+tLDcVb3tqVONOH6GFpa9Zr2u/Ei5QrkYxw0vxCr9P6QvbgWJhPS4HEMIRLzvxGgsP9tTmIppq9Yffq7Esi/kXgGxc0Dj0IXAeYgCGhA/4p3YW63KTw+ic4K3vxjLbu4VEDsHtMnKmUReELt7q1XJDbHVG4YqwIKNBoB38Q3/7MFvFkxGI362m35lvZAUVUDSirKyk4gcyjjygvjZt6SE3Csgsw7YnzjO/sTx1OW6tZOU3CsgSQ5INPZlJddpndBtuahcQHkxVi5QBWRl2FTG3qMN32EzsjKuo8otffchAOc+vp1VEwFVQHIFdBr75lgemesHoF5pX1/KnavcDrUT1Y69bhtuoArolaM/x5t7deP+oX8huIOzO+Vn8138Y38l2Q5PXFQBtgw9uXMPgMNvvw7A0OXHANQr/tj948T7ABxdvQa0Im4qQcq9Mns+1I7pJy2qgAR1PGjtzERlZ3PMP7x6C4CjRjlRgvDw33/8cl3mBJklCuWiPg0mIXYHFMrF2G9fnmdyr4CerQPO/vqF1XK2UAVkZfjlR/5b5IPZIKWdOpOp2xSGKsCaofFjQGul9uSOf31kLvg9QSdFSMSFrdnd5q97AT+2UAVYN2hEaGt2I3BuKsKkFfFwe7ZRBWRluPbJW4Hzj9571/9xxT/cuvpm4P47V370f7zoHz778uvA/cKn31tvI6gC7CtAIr+2tgbA5KQ/f9e3tgEYGBkC4NpXv4fWl3KDg4MArKysAPBq065tJagC4laozcyH7gNI5CVyJqdPvQbA3eVfQu9L5KWcidgVP0e+fRCr3VGoAmwZMiMvY1/G8HTpc/9G6QPgv0qQyEs5qSd2ovyIEkWZcXeGVAGuHI8eG3HlOoAqoNcOo2aB6sYWANO9bAyqgPQK2Dw/AYDk5p2dHf+8ma3N2UAwc4AoICr7m3bFr6wM9b1AQhJ/ZSnz7tO5i4HrZqTM63cXb7S1e/rCdNv65vXh4WH9UjQNiTugUC56Scfd84QqwHUDXKMd4LoBrsl9B6ReCcr83C3Xb3zT9r6sA2z564QqIK2B0c2bQOud38Fb4UG7X5FE+UmLKsCWIVvfA0RRPXIJgFFLkRdUAWkNeCdLHsD6+noDWvsCtpGnwCqXABgbG9O/HLVBz/cEa/W/ASgMvBR6vdfkXgHaAa4b4BrtANcNcI12gOsGuMbaOkBWZgcrwogvRfoGDgPwF09Dr0ch+wC2VoBC7hWQ2b6+KMFEnuvlGUJo3C81oPXUZ2I78kLuFZDZs4C5g3PAZvt6Zu6wtfMTRe4VoB3gugGu0Q5w3QDXaAe4boBrtANcN8A12gGuG+Ca1M8C5n+abvG4U9UzNvyk/V8GqgDbBgvl4hmAxuVSJnZrM/NLNu2qAtIakMj0ihB/S2ns5V4BqffZzOxsRqhxv/RTwOHJ0tl29jqVN3OAzgIpsa4Ak7Q5olPWVwUoiqKk4BkFXJAQ2Z2S6QAAAABJRU5ErkJggg==",
  gd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABHtJREFUeJztnEFoXEUYx3+rNQSEGJNSepAmJOcSAhVBkG6heGypePBQaOOpeMhBcvCiLIInQw+56MW2SmkLFjUeheCWBaEYDKX0oIc10UuQxC6RrTUkXQ9vv2zf+N6+3Z2ZN8L7fpeXN2/m/w3z/Wfm7Xu7AUVRFEVRFEVRFEVRFEVRFEVRFKUYlPIK1Hh7qdVP/dEr87n07Zk8gvyf8TbKZsYPHZ/oq/3e/Y3YuS9HqANcC0rm+814FuII105QB7gS8pV5E9dOUAfYCkjmS+dfA+DZe7/ZSnZlf+YYAK3rNcDeCeqAQRvmnXkTV04ovAO8DcD+zLGDLNnU61VnUArvgEP9Nhh07sv+nXWf0Gs9ibvf7keDqF/9rgXqAF/CpjP26ptRwHZmZV6n1at+8x4Ap9+/6auLgDpgcAdkzX1zLo8vDgHQrHVvL/VO124m6qT1Y6/XjhuoA/IK9HBqPvpjKjoMfV6LXd+9EK3mu0THoVr8ui/UAa6EHi/fBWD47CsAvPDOnwA0a9Hc/eP4uwAcuX8Z6GTcdILUe2nhXKKOGccWdUC/DeROK+sJkDnnH3x0A4AjRj1xgvDgn7+jej2uCbZPiArvAB2A0B0ITW73Aad++cRpPVeoA3wJv1hfAp7aDSx1msxa9ykJdYAzoamjQOdO7fFyVD6+uBSrl+UIybiwvbDb/utuLI4r1AHOBY0MbS9sxs5NR5h0Mp6s5xp1gGvBxgdnEsvn32yXX4oOy5++Ebt+9tJXsfOl298m6ox+mFw+KOoAV0KS+ZGREQDW1tYAmJ2N9u+Tr74MwJ0ffgTg8he/d9VL05E4h7++56Tf6oB+G6Q9B5CMpSGZFyekkXU9K06/qAN8CcuclTl87bsqABdfLwP/XRPkfK7ycayd6KQhThRn6rvBPsnteYAgmV6v1wGYODqedxdiqANsBbbOzQAga/POzk50nrJay5w32djcBmAuJY6pK3Ft7wfUAb4DmLuBYM59cUCvq7+g7wUssf6e4JPF87HytDVAyu/cutpV9+Rbc13bm+VjY2P6TVEbBh6A0Svzpbx+1+MTdUDoDoSm8ANgfR9gvgGa2LoWnY/YvRFKQ3YDiWOLOsCVkPlGJ43Prl7vel3uA0xk/+81Tq+oA2wFSicqJYCVlZUWwPT0NND5dOiajcMXAZicnNRfjbnA2RpwkHnHT219U3gH6ACE7kBoch+ARvMRjeajvMOmUngH5P5eII1Qrii8A3QAQncgNMHXgNA7gjogeAeeHwbg4W5GRU+oA1wJyefz9fX1FqR/KvzrueF24CcA/PTzryWA1mqlBSD/P0qe/aXFcYU6wLWg6QST+pcXgM6TJBPTOfIMMK2+LeoAX8IH7wfM3wds+Yo4GIV3gA5A6A6ERgcgdAdCE/KzQDlg7APUAR40yx40n9atuhRVBzjQKCcVlk5UTgG0Vvk+qdxhvKqNmDrAgUa1fSwnXXSQ8ay4VqgDHGpV28eyQ81ucZxQeAf4/K5veZBGrdVK2q5RtexPIoV3gKIoxeZfR6drRAul7UUAAAAASUVORK5CYII=",
  pd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABNRJREFUeJztnEFoHFUYx39jQywGkjUppQdpQjyXEKgIBWmLPSu9FamkyUXoYQ8SQSnKIhQPhh5yEQ/dNiptblrPiikLkWIhlNCLkJLVS5CkboKrNSTdHma/LPOc2d2ZebOvON/vMjsz733f433/9703byYBRVEURVEURVEURVEURVEURVHyghe3Qm1mPnA+tLDcVb3tqVONOH6GFpa9Zr2u/Ei5QrkYxw0vxCr9P6QvbgWJhPS4HEMIRLzvxGgsP9tTmIppq9Yffq7Esi/kXgGxc0Dj0IXAeYgCGhA/4p3YW63KTw+ic4K3vxjLbu4VEDsHtMnKmUReELt7q1XJDbHVG4YqwIKNBoB38Q3/7MFvFkxGI362m35lvZAUVUDSirKyk4gcyjjygvjZt6SE3Csgsw7YnzjO/sTx1OW6tZOU3CsgSQ5INPZlJddpndBtuahcQHkxVi5QBWRl2FTG3qMN32EzsjKuo8otffchAOc+vp1VEwFVQHIFdBr75lgemesHoF5pX1/KnavcDrUT1Y69bhtuoArolaM/x5t7deP+oX8huIOzO+Vn8138Y38l2Q5PXFQBtgw9uXMPgMNvvw7A0OXHANQr/tj948T7ABxdvQa0Im4qQcq9Mns+1I7pJy2qgAR1PGjtzERlZ3PMP7x6C4CjRjlRgvDw33/8cl3mBJklCuWiPg0mIXYHFMrF2G9fnmdyr4CerQPO/vqF1XK2UAVkZfjlR/5b5IPZIKWdOpOp2xSGKsCaofFjQGul9uSOf31kLvg9QSdFSMSFrdnd5q97AT+2UAVYN2hEaGt2I3BuKsKkFfFwe7ZRBWRluPbJW4Hzj9571/9xxT/cuvpm4P47V370f7zoHz778uvA/cKn31tvI6gC7CtAIr+2tgbA5KQ/f9e3tgEYGBkC4NpXv4fWl3KDg4MArKysAPBq065tJagC4laozcyH7gNI5CVyJqdPvQbA3eVfQu9L5KWcidgVP0e+fRCr3VGoAmwZMiMvY1/G8HTpc/9G6QPgv0qQyEs5qSd2ovyIEkWZcXeGVAGuHI8eG3HlOoAqoNcOo2aB6sYWANO9bAyqgPQK2Dw/AYDk5p2dHf+8ma3N2UAwc4AoICr7m3bFr6wM9b1AQhJ/ZSnz7tO5i4HrZqTM63cXb7S1e/rCdNv65vXh4WH9UjQNiTugUC56Scfd84QqwHUDXKMd4LoBrsl9B6ReCcr83C3Xb3zT9r6sA2z564QqIK2B0c2bQOud38Fb4UG7X5FE+UmLKsCWIVvfA0RRPXIJgFFLkRdUAWkNeCdLHsD6+noDWvsCtpGnwCqXABgbG9O/HLVBz/cEa/W/ASgMvBR6vdfkXgHaAa4b4BrtANcNcI12gOsGuMbaOkBWZgcrwogvRfoGDgPwF09Dr0ch+wC2VoBC7hWQ2b6+KMFEnuvlGUJo3C81oPXUZ2I78kLuFZDZs4C5g3PAZvt6Zu6wtfMTRe4VoB3gugGu0Q5w3QDXaAe4boBrtANcN8A12gGuG+Ca1M8C5n+abvG4U9UzNvyk/V8GqgDbBgvl4hmAxuVSJnZrM/NLNu2qAtIakMj0ihB/S2ns5V4BqffZzOxsRqhxv/RTwOHJ0tl29jqVN3OAzgIpsa4Ak7Q5olPWVwUoiqKk4BkFXJAQ2Z2S6QAAAABJRU5ErkJggg==",
  md =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABHVJREFUeJztnE9oFFccx79rbfAUYyLioZiYHHqSkKIIBXElnisWDx4ETU/Swx5KCr1YlkJPhhxysRf/tEgttFTTYy9dWRDEYBDxoJBt0l5CSeoSWf+ExPUw+8s6j/mzs+838wLz/Vwm8+bN9/d4v+978/bNbgBCCCGEEEIIIYQQQgghhBCSDwpZBap/MdNMUr/vWimTtu3IIsh2JrVeNjO+89Bgovs3Hi/5ztNyBB2gLSiZT5rxOMQR2k6gA7SE0sq8ibYT6ABbAcl84dwxAMAHj/6xlYxkc/QAAKB5swrA3gl0QLc3Zp15Ey0n5N4BqXXA5uiBrSzZ1OtUp1ty74CdSW/oduzL8ztundBpPYm72WpHHV67ks4FdEBawqYzNmrLXsBWZmVch9Wr3PkGAHDy0q20mgiADujeAXFj3xzLA1M9AIBGNfp+qXeyeitQJ6wdG5023IAOyCrQ8+GS98ewd+j5seq7vn7em83X4R17qv7raUEHaAm9nr0PANh16igAYPeX/wMAGlVv7P536CsAwL7H0wDaGTedIPU+mjwdqGPGsYUOSHqDrLTidoDMMf/k+58BAPuMeuIE4cmbV169DucE2x2i3DuAHeC6Aa7JbB1w4tkV1Xpa0AFpCe+pzQB472lgqdPAmHWbgqAD1ISG9wNor9Rez3rlA1MzvnpxjpCMC6uT662/7vviaEEHqAsaGVqdXPadm44waWc8WE8bOkBbsP7tZ4HlpTOt8oveYfaHz33XT1383Xc+89sfgTp93wWXdwsdoCUkme/t7QUAzM/PAwDGxoKf39M//RtYfvzTI5E6Emfv7UcazaYDun4zZO4DSMbCkMzevfego+sTITpxcZJCB6QlLGNWxvBE+bJ3ofw1gHamzczf+LPiuy9sDhHEieJMvhtMSGb7ASaD+wcAAIu1GoC2E7KGDrAVWDk9CgCQuXltbc07D5mtw54CS8urAMJnf1NX4tquB+iAtAOYTwNB5gBBHNDp7C/wvYAl1t8TfDt1zlceNgdI+d1frkfqHj87EXm/Wd7f389vitrQdQf0XSsVsvpdT5rQAa4b4Jrcd4D1OkD28Zf2XrCVimRw5QYA4HlvyRfXFjpAS2grQzFvfq5evxl5XdYBYWhlXqADbAUKh8sFAFhcXGwC7U+F2sgcs7CwAAAYHx/nr8Y0cLYjlBT5DDAyMqKqm3sHsANcN8A122YOqDdeOombewdk3gH1xktn2Q6CDnDdANewA1wF3i5zQe4dkPk64MWHuwAAe3qyjhwMHaAlNDQ05NsXCKP263kA7X2ETz4+2ATazghD3gxJHC3oAG1ByVBzrtwEAvYIV/ynD5/+7asv/0FMMm7qakMHuG6Aifn2V3sX2CT3DmAHuG6Aa9gBrhvgGpdPgaLD2FvQASloFlPQfF+3oilKByhoFBU0UDhcPgEAzTn8FVQeEa9iE5cOUNCotI5FBa2gjMfFtYIOUNSqtI5FRc2oOCrk3gFpfte3CADNuXLcrN4pFcv2BJJ7BxBC8s07kz5xa2CojXkAAAAASUVORK5CYII=",
  yd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA1FJREFUeJztnDFrU1EUx/+p1TFWlCIINiSjFAl2LaRQ8BM4FJ0cHTqoqxB0FYeidqs6SOf6CQLtIrQGCR0qJBpxKCK2dlEhNQ4vt7XPvrTpPeeehPf/LSEv751zuOeX13fveylACCGEEEIIIYQQQgghhBBC0kEmVKLt23Ntn+NHFmZVah3SCDpIqBkQ7/jw+JhXvFatCUDeBBogHdB13rfjSUibQAOkArnOZ25NAgBOvf8sFfpQpExIvQHD1gWcFGfaNiLzTmoCDfANEPq7Lw0N0E6we/UyAHkzXLxdz3MBDZAKFO/wr6W3AICVRzMAgOkHi12P1zLlKGiAVuDzj88AAKaXo867KzfpOYIzpnXC42mAbwB31o3PArfys9EO+ehl6H6zaxyr6wcaIBUobgIQ/X3+On4XADBaexJtfrUMQO+c0Cs0QDrg2TvfAQBbnffrv38CAEalE3XwXRdIvQFmA9BqbKLV2LRKv0fqDVCfDU59mNdO4QUNkA6YmShnAKC9ijbwzxWhMFwVFkLtHJBkglsnGM5f1ErdEzRAO0HcBHTWCX481858PGhAqETOhJnrk20AmL90I1TqrqTegGDPCLnOP1tcAgBUq1UAwLXX6wf263V9gLNBT9TPAUmdLxaLAIA/ndednR0AwMjDN1FhgVaKaIBWYNf5C6ejFPHO9ws0QDvBvacvAAD1eh3A/nc9m81qpz4WNEA7get8MXa27xdogHaCQqGgncKL1BvAAbAuwJqBGYBWrbk385NkYAZAi75/Vjip67wvIETfGbB28wqA/ZWieIfdEyj8xYgQagZsfPrS9fOkOYGbM6y5DQsHP+evxoQJfg4Y+/YSwP93jc815qLt2Wh7qDkEDQid0HXedTy+PTQ0wCqxVcfjpN4ADoB1AdZwAKwLsIYDYF2ANRwA6wKsUbsSfLfx0c3be/r/QW6dIJfLBXl+iQaESnTcu8KhOu9IvQHBRru9Wj709wNuXcA9SRqa1BvAAbAuwBoOgHUB1nAArAuwhgNgXYA1HADrAqzRnA2WPPeviFRxBDRAIWZJOU5FKD4AGiBiQEkghk++ik8wGiAQoxJ7X+q2c/zJkMxEecoznxepNyDEOlzJ8/iKQA2JpN4AQki6+QtxmO4m5OvnbQAAAABJRU5ErkJggg==",
  Cd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA5JJREFUeJztnD1oE2EYx3/R6iS1flAEwTbt4FSk2rWQQsHNzaEgCI4OHcRVibqKQ0G7iQrSQRTq5tRAXYRgkdJBh9g6FRFbu6iQeg7J26Zn8/l+XOT+vyXkmnuel3t+9+S99y4FIYQQQgghhBBCCCGEEEIIIUQayIRKtHltJrLZv+/xtJexHvAR9H/CmwHxiveMDFjFKy+vAe5NkAGuA5rK21a8Hq5NkAGuApnKZ66MA3DwwxdXoffFlQmpN6An6QF0ijFtk4p5nZogA2wDhD73XSMDfCfYPncGcG+Gibdt2QtkgKtA8Qr/mn8HwNt7UwBM3ppruL8vU5ohA3wFPnH/MACTi5XKm5mb62sEY0y5w/1lgG0A03XjV4EbQ9OVDwxVXg7cXGsYJ6n5gwxwFShuAlS+n7+O3ACgf/lBZfPTRcBfT2gXGeA64NHr3wHYqL5f+f0TgH7XiarYrguk3oDEDkC5tE65tJ5U+h1Sb4D3q8GJT7O+U1ghA1wHzIzlMwBRkQhqZoSO0aqwI7z1gHommHWCnqFTvlK3hQzwnSBuAtV1gh+PfGduDRkQKpExYerieAQwe/pyqNQNSb0BwZ4RMpV/ODcPwNLSEgAXnq/s+Vy76wO6GrTEew+oV/nR0VEA/lRft7a2AOi7+7oysEArRTLAV2BT+ZOHKinile8WZIDvBHeevQR2DTDnem9vr+/ULSEDfCeIn/vGgG5BBvhOMDw87DuFFTIgVKJu6/4GGZD0AFo1w9fdZBmQ9ACaYSpfb7vuC1gS3IBmM8HN25eA3XWBeIXNEyj6xYgjvK0Jnj+bjQBevVkAYODbE+Dfe4XHSjN7thtDBgcHg6xXpt6AYD3AVNhUPL7dYOYDq6urEfg3QQaETujreYFOkQGuA5ruf8Ty2IbqBak3QAcg6QEkjQ5A0gNIGh2ApAeQNM7nAe8/fs4AZLNZq/8aEwoZ4Ctw6cVVAMyKnu4LdCnO59dRMd/wKfF27w5rPcAzwdYDzErQ8Z1nhxubEl858oUMSCpxqF+WNEMGuArU7JzuVmSA7wSmm5tzvlWMSaZHtLt/q8iAgLly+23MjOUnAKIiCxC+h8iATnc0Xd/gq3K+e4EM6HTHTGxOH7/P30G8VntBLva+0FHCKjLANkDNOZmD3QrW/H3CJn7NPCIep2AT15B6A3zMrnI2O0fFfDODCjbx48gAj7FzjuMVHMcDZIAQIuX8BaNNN11Nb1qqAAAAAElFTkSuQmCC",
  xd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA1FJREFUeJztnDFrU1EUx/+p1TFWlCIINiSjFAl2LaRQ8BM4FJ0cHTqoqxB0FYeidqs6SOf6CQLtIrQGCR0qJBpxKCK2dlEhNQ4vt7XPvrTpPeeehPf/LSEv751zuOeX13fveylACCGEEEIIIYQQQgghhBBC0kEmVKLt23Ntn+NHFmZVah3SCDpIqBkQ7/jw+JhXvFatCUDeBBogHdB13rfjSUibQAOkArnOZ25NAgBOvf8sFfpQpExIvQHD1gWcFGfaNiLzTmoCDfANEPq7Lw0N0E6we/UyAHkzXLxdz3MBDZAKFO/wr6W3AICVRzMAgOkHi12P1zLlKGiAVuDzj88AAKaXo867KzfpOYIzpnXC42mAbwB31o3PArfys9EO+ehl6H6zaxyr6wcaIBUobgIQ/X3+On4XADBaexJtfrUMQO+c0Cs0QDrg2TvfAQBbnffrv38CAEalE3XwXRdIvQFmA9BqbKLV2LRKv0fqDVCfDU59mNdO4QUNkA6YmShnAKC9ijbwzxWhMFwVFkLtHJBkglsnGM5f1ErdEzRAO0HcBHTWCX481858PGhAqETOhJnrk20AmL90I1TqrqTegGDPCLnOP1tcAgBUq1UAwLXX6wf263V9gLNBT9TPAUmdLxaLAIA/ndednR0AwMjDN1FhgVaKaIBWYNf5C6ejFPHO9ws0QDvBvacvAAD1eh3A/nc9m81qpz4WNEA7get8MXa27xdogHaCQqGgncKL1BvAAbAuwJqBGYBWrbk385NkYAZAi75/Vjip67wvIETfGbB28wqA/ZWieIfdEyj8xYgQagZsfPrS9fOkOYGbM6y5DQsHP+evxoQJfg4Y+/YSwP93jc815qLt2Wh7qDkEDQid0HXedTy+PTQ0wCqxVcfjpN4ADoB1AdZwAKwLsIYDYF2ANRwA6wKsUbsSfLfx0c3be/r/QW6dIJfLBXl+iQaESnTcu8KhOu9IvQHBRru9Wj709wNuXcA9SRqa1BvAAbAuwBoOgHUB1nAArAuwhgNgXYA1HADrAqzRnA2WPPeviFRxBDRAIWZJOU5FKD4AGiBiQEkghk++ik8wGiAQoxJ7X+q2c/zJkMxEecoznxepNyDEOlzJ8/iKQA2JpN4AQki6+QtxmO4m5OvnbQAAAABJRU5ErkJggg==",
  wd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA5RJREFUeJztnM9LFGEYxz9b1inMSCQIyh+HThJbXQUFoVu3DkKQdOzgoboWUtfoIJU3o0N46BD2DyTYJZBExIOB5kYH6ZDmpQJtO8w+qZO77u68z8zKfj+X1XHf53nZ5+MzM+/MLAghhBBCCCGEEEIIIYQQQgghmoFcWok2bo0Vk4xvmxhxmesRj6CHCTcD4hVv6T2fKN7WQgEIb4IMCB3QKp+04uUIbYIMCBXIKp+70QfA0fkvoULvSygTmt6AlqwnUC9m2gaRefWaIAOSBkj7fz80MsA7wfbFc0B4MyzedsJeIANCBYpX+NfUBwDePxoCYPD+ZMXxXqYchAzwCnz68XEABmeiytuRW+hzBDNmq87xMiBpAOu68bPA9e6R6A3d0cuRe4WKcbI6fpABoQLFTYBo//yt9w4AHQtPos0vZwC/nlArMiB0wJO3vwOwXvp98fdPADpCJyqRdF2g6Q3I7APYWllja2Utq/T/aHoD3M8GBz6Ne6dIhAwIHTB3ZTQHUJylCLuOCAOjVeFAuPWAcibYOkFL9xmv1DUhA7wTxE2gtE7w47l35uqQAWklMhOGrvYVAcbPXk8rdUWa3oDU7hGyyj+bnAJgbm4OgMuvFve8r9b1AZ0NJsS9B5SrfD6fB+BP6XVzcxOAtodvo4mltFIkA7wCW+Xbj0Up4pVvFGSAd4K7T18AsLy8DOz8r7e2tnqnrgoZ4J3AKp+PdftGQQZ4J+jp6fFOkQgZkPUEDNsrbDy4BkD7m/lU8sqAtBNapWs9HvC6miwDsp7AQVjly23XdYGENIwB8Z5QrsJ2B4qeGAmEmwFLq18r/v2gvYHdacLE3nF6aiwwmfcAq/yplbE92wvtw6WfRl3zy4CsJ2D8dx9BSusGMiB0wEsXuooAJw7JZ3s4ZulIw/SAOLZ3WF1dLQJ0dnbq+wM80AeQ9QSyRh9A1hPImuB7gY9Ln3MAXV1dib41Ji1kgFfgldc3AbAVvfg1QV0dbhDcjwTjlbbz/gLDVY33OgI0ZEDogMXZ0aqeE7DKlnt/fIXICxmQViKrqN0z3CjIgKwnUA7rCfacgZc5MiBUoGq7f5y0njIrhwzwTrCr+w+UNvXXMt67F8iArCdgmCHFWd5Ber1ABtQ70Lq+4VWxKnrIdJL4MqDegTv778gEq1QoE/apfJzpEHma3oDgx9fx3lChgvUyHTKYDHCM3R843nTgeIAMEEI0OX8B+BAqWXBsqJkAAAAASUVORK5CYII=",
  bd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA0xJREFUeJztmr9rU1EUx79pY3FKFaU42dCMUkog4FRIJzc7FyuCi+jQQScXyR9QHIrFrToIGZw6OhnIJFSCBAcdQioKRcSGgKgl9XV4OcR35eFr3r33BN73s7Tvtvfcw7mf9+u+CxBCCCGEEEIIIYQQQgghhJBskHMVuHd7K0jT/9zOhrPc/mbKxyCTjPUqy8znF+dTxRm09yPHroygAbYC2Zr5OMQI2ybQgLQBXM+8cLx0GQAQvGgCsGdC5g3Ij9tRZj63vhw2vPtkJyPP0ADtBJIyPTTseGhcD6GBaa8FNOC0Hcxzf9rRuS9XfVfxBRrge8CkMyt//7X7BgBwdvVqpH1gKR8aMG5HV+emPPPLk+WFzRkAwI+mk+FogPdrQFJzjm6Fd5kjhD9nmqECtt8KaYB2AuY5/2dzHQDwdfE+AGCu/Tjyf1wPsMypDZAZcL0O8P73TwDA3PB49t738Jcdu+Nk3gD1Agw6Bxh0DtTGVy+ANup3gThWPj71Mg4NGLejr7vB+c4WACBXqfHLkAvUrwH5hUsARu/9U8N3ANczL9AA7QQEMWHW08wLNEA7AeHul5cAgHql6WXmBRowbsdx7//mzo+3N64AALbL4ToA1lYDAKi/8mMCDfA1kMx879F1AEChUAAAlId/b7VaAIDt+m7Y4MkEGqCdgFAuhy6ICRfPhKmtXVt2agIN0E5A6Pf7keMHT54BAB7euel0XBqgnYCJeS1wDQ3QTiCOUqnkZZzMG8ACaCegjfUCDNr7/7zxTTKZN8DZdwHzu/+kQgPSBjBNMHdwSLus/Pi5uyeHBtgKFLd3R2ZenvHlrc98+4vjQ/ezjfRioQGuBzCf6ee/PQcAHC5sRNrlW+BhIdruGhrge0CZeZlxs903NEBrYK0ZN8m8ASyAdgLasADaCWjDAmgnoA0LoJ2ANt52ZHW73QAY7Qz5H7JeUCwWuUPEJV735AEjE5JCAxzj3QAh2KsFQPzKEPcKe4IF0E5AGxZAOwFtWADtBLRhAbQT0IYF0E5AG5dfhqoOY1uDBjiIWXUcp2EpPgAaYMWAqoUYacZrpAlGAyzEaBjH1SSdcpXaCgAEe3idcrxUZN4AH+tu1ZT9GxZyiCXzBhBCss0JDnnrCOcO/PgAAAAASUVORK5CYII=",
  Ed =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA6FJREFUeJztnM9LlEEch59Vkw6hRSGdkvTQISQ2hE7CevKW0E0SjG4VeOgPCLtLB0G6SUTgQTp47JSwp2BLQjrUwR9FIBElQlSivh3endwd2lzfnR/C+3ku6zu+M/Pl/T7vzDvzroIQQgghhBBCCCGEEEIIIYQQIg8UfDW8dXsmaaX+6blJb7HV0haik+OM86tsMt8x0NtSO7srG3XHvoyQAa4acpX5RhgjXJsgA1ptwHfmDXtXLgCQPCsD7kzIvQEdWSuazBfGh9KCtx/dRBQYGRA7gGZprxq2VzVui9TAVscCGXDUCva93+7p3jejvq/2DTIgdIfNZtb8/tfiKwBOjl6rK991FI8MyFrR171pnvnNk+XZ6U4AfpS9dCcDgo8BzZqzM5HOMjukn53lVAHXq0IZEDsA+57fnx4H4MvAfQB6Vh7Vnaf9AMcc2QCTAd/7AO9+/wSgp3rcffdb+sOc235yb0D0C7C7usnu6ma0/qNfgNhEnwUaMfzhcZB+ZEDWiqFmgzOrMwAUBqf0ZsgH0ceAjr7zwMG6v626BvCdeYMMiB2AwZjQHSjzBhkQOwDDnc8LAMwPloNk3iADslbMOv/b3/x4ffMyALPFdB+AsdEEYP5FGBNkQKiOTOa3HlwHoKurC4Bi9ffLy8sAzM4vpgWBTJABsQMwFIupC8aEcyfS0MZGhryaIANiB2DY3t6uO3749DkA98ZGvfYrA2IHYGOPBb6RAbEDaER/f3+QfmRA7AAM5snQng18IwNcN2i/7bWxM22OYyEDslY87L3AYSYcF2RAqw3YJtjf4DDlf/cBrPqhR32b3BsQbAd2fX09gYNR37z5+d43WXeeKd84dwuAGyPDALx5v6b9AB94fxK0M28wmTcZt8sJNDbIgNgB2GNAaGSAr4Yb3ftH5VQ1R1cvXUzA/WyQewN0AWIHEBtdgNgBxEYXIHYAsYn+JHgYn3b2AVhb02rQC8fOAHuHaHVhAoDC4JSX/nJvgPcdIbMmaJZGawdf3x3OvQHex4Der0+Axut+O7NJZSr53/mukQGxOg719wCHIQNiB9AsZkxIKqT/w8SROTLAV8NZR/OD2YAgs4EMCN1hzeg/XC0qhY6hFhngukHfT3L2bGDIOivIAAdtlJo56R/3fibst8mtPg/IAAdtLFU/S3CQ4aTCS8g+Ftjt2OU1/bZE7g3wsRIr1R4klalGGczKUov165ABHtsuOW5vyXF7gAwQQuScP3j5LoRZW1NGAAAAAElFTkSuQmCC",
  vd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA0xJREFUeJztmr9rU1EUx79pY3FKFaU42dCMUkog4FRIJzc7FyuCi+jQQScXyR9QHIrFrToIGZw6OhnIJFSCBAcdQioKRcSGgKgl9XV4OcR35eFr3r33BN73s7Tvtvfcw7mf9+u+CxBCCCGEEEIIIYQQQgghhJBskHMVuHd7K0jT/9zOhrPc/mbKxyCTjPUqy8znF+dTxRm09yPHroygAbYC2Zr5OMQI2ybQgLQBXM+8cLx0GQAQvGgCsGdC5g3Ij9tRZj63vhw2vPtkJyPP0ADtBJIyPTTseGhcD6GBaa8FNOC0Hcxzf9rRuS9XfVfxBRrge8CkMyt//7X7BgBwdvVqpH1gKR8aMG5HV+emPPPLk+WFzRkAwI+mk+FogPdrQFJzjm6Fd5kjhD9nmqECtt8KaYB2AuY5/2dzHQDwdfE+AGCu/Tjyf1wPsMypDZAZcL0O8P73TwDA3PB49t738Jcdu+Nk3gD1Agw6Bxh0DtTGVy+ANup3gThWPj71Mg4NGLejr7vB+c4WACBXqfHLkAvUrwH5hUsARu/9U8N3ANczL9AA7QQEMWHW08wLNEA7AeHul5cAgHql6WXmBRowbsdx7//mzo+3N64AALbL4ToA1lYDAKi/8mMCDfA1kMx879F1AEChUAAAlId/b7VaAIDt+m7Y4MkEGqCdgFAuhy6ICRfPhKmtXVt2agIN0E5A6Pf7keMHT54BAB7euel0XBqgnYCJeS1wDQ3QTiCOUqnkZZzMG8ACaCegjfUCDNr7/7zxTTKZN8DZdwHzu/+kQgPSBjBNMHdwSLus/Pi5uyeHBtgKFLd3R2ZenvHlrc98+4vjQ/ezjfRioQGuBzCf6ee/PQcAHC5sRNrlW+BhIdruGhrge0CZeZlxs903NEBrYK0ZN8m8ASyAdgLasADaCWjDAmgnoA0LoJ2ANt52ZHW73QAY7Qz5H7JeUCwWuUPEJV735AEjE5JCAxzj3QAh2KsFQPzKEPcKe4IF0E5AGxZAOwFtWADtBLRhAbQT0IYF0E5AG5dfhqoOY1uDBjiIWXUcp2EpPgAaYMWAqoUYacZrpAlGAyzEaBjH1SSdcpXaCgAEe3idcrxUZN4AH+tu1ZT9GxZyiCXzBhBCss0JDnnrCOcO/PgAAAAASUVORK5CYII=",
  Bd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA6FJREFUeJztm79rE2EYx79pa3GQ1GIpTqa2g4MUiQScCunkZudipeIiOnTQyUXyBxSHYnGrDkKGTh2dLGQSqkGKQx3S1B9QpGgpiBrSnsN7j01eGnO5e38E8v0s6V36Ps/DvZ/33rv3LgAhhBBCCCGEEEIIIYQQQgghpBdI2Qq8f2cpSNL+7MqCtdoa6XORpJsxfpSl5wcmM4ni1Dd3mrZtGUEDTAUy1fOtECNMm0ADkgaw3fPC4ZULAIDgZQmAORN63oCBuA2l51NzU2rH+09mKnIMDfBdQFT6Q8MOQ+P2oQxMei6gAZ020Md+v6WxL2d9W/EFGuA6YdSele9/r70BAJyeuda0v26oHhoQt6GtsSnX/HJleW5xEADws2QlHQ1wfg6Iak5tXs0yNajPwZJSwPRdIQ3wXYA+5o8W5wAA3yYfAABGN580/R/XAwzTsQHSA7bXAT78+QUAGA23h+5/V3+smM3T8wZ4PwD1yi7qlV1v+b0fAN94nwVaMf3xmZM8NCBuQ1ezwXBlCQCQyhX4ZMgG3s8BA+PnARzf9/eF9wC2e16gAb4LEMSEIUc9L9AA3wUI976uAgCKuZKTnhdoQNyGced//c2PtzcvAwCWs2odALMzAQAUX7kxgQa4SiQ9v//4BgAgnU4DALLh9+VyGQCwXFxTOxyZQAN8FyBks8oFMWHklCpt9vqUVRNogO8ChIODg6bth0+fAwAe3b1lNS8N8F2Ajn4usA0N8F1AKyYmJpzkoQGuEulXgN0CDTAdUH/a2w6Z/32ZQQPiNmz3XKBTE3xBA5IG0E3Q3+AINgoBANTSar3f95jXoQGmAkV9d0d6PqoJW9UvCSv7PzTAdoKdkdsAgEz4xOcf4wu2U0eCBrhK9KNLelyHBvguoB1nwj66euliAADvtrb5pqhJrBlQrVYDoHuu+FrR8wbwAPguwDc8AL4L8E3XXwd8rh0BALa3zc7/Ag3wXYCgPx0WKqvzAIBUrmAlLw2wFXhsbCwFHF8RtiOz9wLACXeNe2br0qEBthO06ln9bXBZPdaRdsEGgsb/NwUN8F2AcGyC6mlXK0g0wFZgGdPduhYo0ADXCeP+FsjWbEADTAfsYOznT9qZyhWmVRy8jhgnETTAVaKGsT/tKmcUaICBGPnGDdtjWJ8NGvLGmhVogIEY6+FnvnGnboIphrX3DJJeD/S8ATZWWvMmgwUbhSaDuB5gGJu/ycsbjrduOB4AGkAI6XH+AoBuJejxCggxAAAAAElFTkSuQmCC",
  Id =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAAuJJREFUeJztnD9qG0EYxZ8S18IWri3hPqhxa1AuEEgfSMgBdIQgcgQfIKRIH/AFIkjrxrgPUuqgiK0lNoUysnbMav/MN/sM837dame+ebzvydpZaQ0IIYQQQgghhBBCCCGEECIVel0ttP54kzcZf/pl2om2F10s8pyJ5rLf8ZNXw0bzNw/LwnGsRCgB1gVd55t2vAqXCOskKAFWhWJ13sc6CUpAaAHX+d67awDAy/vfoSWPsh1fAADybz8BhCdBCWg7sevO+1glIfkERDNgO77YdylkXN06bUk+ASdNJ7Df+w637va/jjV2upr+LVACYhWuSoZ7X1eNi50wJaDtxNDOWHXW1dm0nJ98AmQAWwAbGcAWwCZ4Nxj7DlAVoXeIkk+ADGALYCMD2ALYyAC2ADY0AzYPyyffADNQAtgC2MgAtgA2MoAtgE3yBjTeQz+X+wA+be8LJJ8AGcAWwEYGsAWwCTagalfnny8bX3dc3fN1ST4Bwb8PWH96AwA4/35feN11xz9fNr5s3Onn251Q77qjrE5TlICmE9yV1v55gLdjAI8dd51yHer3+4Xz/ffXhWOH/7o79ju9n+etq2+GWhL8W+HValV4MiTLMgCPnbeirO5gMNBvhUOQAWwBbGQAWwAbGcAWwCZ4L+A+n7vCej0lILTA8M9XAMDfyykA4OzXze64Pw0tXWudUJQAq0L7zl/adt6xPP8AABgadd6RfALMnh1eLBY5YL8L9HGfAqPRSM8OW0A3IMuyzq8lDqEbwEYGsAWwkQFsAWzM/4tM0+uBuneRrT//HUpArMIuCVZYd96RfAKiPT3u798dbtfYu5oVOprfzfJj42ORfAJkAFsAGxnAFsBGBrAFsJEBbAFsZABbAJtoe4EaTIhr71ECItScRKh5WHduWVQJMKgxMagRst48pFjyCYhxn21yeJDfzX4UFryavT42ucb4eYC2JygBHawxCZw/N9BQSvIJEEKkzT/PlAme7HvLuAAAAABJRU5ErkJggg==",
  Md =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAAvFJREFUeJztnM2KE0EUhU901mEE1zPBvWQzW6F9AcG9IPgAeQQJPsI8gLhwL/gCBtxmM8xeMq4lhqwT2kVyM5MySf/UrT4Ddb5N6O6qW5dzT7q7Kt0BhBBCCCGEEEIIIYQQQgghRB70uhpo8eG6bNL+/POok9yedDHIYyaZymHFz15eNuq/ur3b207lCDnAO6BVvmnFqzBHeDtBDvAKlKryId5OkANiA1jle+9eAQCe3vyODXmS9fACAFB+/Qkg3glyQNuOXVc+xMsJ2TsgmQDr4cWuSjHt6sZpS/YOOGvagf3dN2zc9TaPBTZ5NT0XyAGpAlc5w77XVe1SO0wOaNsxtjJelbU4q5b9s3eABGAnwEYCsBNgEz0bTL0CVEXsClH2DpAA7ATYSAB2AmwkADsBNjQBVrd3//0CzEAOYCfARgKwE2AjAdgJsMlegMZz6MeyDhDSdl0gewdIAHYCbCQAOwE20QJUzerC48fa121X93hdsndA9PMBi49vAADPv93s7bfqhMePtT/W7vzT902iwX3HsThNkQOadrA7Lbsj7L/fPKNjFbdKWYX6/f7e8bC9Ee637bDSu35vh3vb+mWoJdHPCs/n8703Q5bLJYD7ynsRxrXtwWCgZ4VjiL4KWCW6wns8OSA2wOWfLwCAvy9GAIBnv6432/1RbOha48YiB3gFssqnws7+3uNk7wC3t8Zms9nmztD5+h/idf03sneABGAnwEYCsBNgIwHYCbChC7BcLjufUT6ELgAbCcBOgE2y9wa98Z4DGNk7wP1fZOrOCpue+b0rb2TvAPdzgFXKnFC3fTkdl8D92qKReqVJDkgVOFwtNqyivatxZ/9kd4rsHSAB2AmwkQDsBNhIAHYCbJizwYI49g45IEHMIkHMh3EnnkHlAIcYxaGdvavxawAop/hxaL/jeJOYYHKAQ4zJ9rM4dNCh4lXjRiEHOMaabD8Lx5inxnEhewekXJUp2nQqp+NjV41JZD4Hyd4BQoi8+QfVeQuaxIXeEQAAAABJRU5ErkJggg==",
  Sd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAAuJJREFUeJztnD9qG0EYxZ8S18IWri3hPqhxa1AuEEgfSMgBdIQgcgQfIKRIH/AFIkjrxrgPUuqgiK0lNoUysnbMav/MN/sM837dame+ebzvydpZaQ0IIYQQQgghhBBCCCGEECIVel0ttP54kzcZf/pl2om2F10s8pyJ5rLf8ZNXw0bzNw/LwnGsRCgB1gVd55t2vAqXCOskKAFWhWJ13sc6CUpAaAHX+d67awDAy/vfoSWPsh1fAADybz8BhCdBCWg7sevO+1glIfkERDNgO77YdylkXN06bUk+ASdNJ7Df+w637va/jjV2upr+LVACYhWuSoZ7X1eNi50wJaDtxNDOWHXW1dm0nJ98AmQAWwAbGcAWwCZ4Nxj7DlAVoXeIkk+ADGALYCMD2ALYyAC2ADY0AzYPyyffADNQAtgC2MgAtgA2MoAtgE3yBjTeQz+X+wA+be8LJJ8AGcAWwEYGsAWwCTagalfnny8bX3dc3fN1ST4Bwb8PWH96AwA4/35feN11xz9fNr5s3Onn251Q77qjrE5TlICmE9yV1v55gLdjAI8dd51yHer3+4Xz/ffXhWOH/7o79ju9n+etq2+GWhL8W+HValV4MiTLMgCPnbeirO5gMNBvhUOQAWwBbGQAWwAbGcAWwCZ4L+A+n7vCej0lILTA8M9XAMDfyykA4OzXze64Pw0tXWudUJQAq0L7zl/adt6xPP8AABgadd6RfALMnh1eLBY5YL8L9HGfAqPRSM8OW0A3IMuyzq8lDqEbwEYGsAWwkQFsAWzM/4tM0+uBuneRrT//HUpArMIuCVZYd96RfAKiPT3u798dbtfYu5oVOprfzfJj42ORfAJkAFsAGxnAFsBGBrAFsJEBbAFsZABbAJtoe4EaTIhr71ECItScRKh5WHduWVQJMKgxMagRst48pFjyCYhxn21yeJDfzX4UFryavT42ucb4eYC2JygBHawxCZw/N9BQSvIJEEKkzT/PlAme7HvLuAAAAABJRU5ErkJggg==",
  Qd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAAutJREFUeJztnMFq20AQhn83OZvE5JyY3osvuQaUFyj0XmjpA+QRiukj5AFKD7kH8gIV9OpLyL3YPRdqdLZRD/E40cbyStpZTWD/7yIk7f47zPyWtWvJACGEEEIIIYQQQgghhBBCCEmDQV8DLb9cl23aH32/6iW2N30M8pqJlmW34ofvzlr1Xz0sKvuxHEEHaAtK5dtW3Ic4QtsJdICWUKzKu2g7gQ4IFZDKDz5eAAAO7v+ESu5lPTkFAJQ3vwCEO4EO6Nqx78q7aDkheQdES8B6crqtUki7pjpdSd4Bh207WH/2BRl3vYljice42l4L6IBYwj5nyOfa1y62w+iArh1DK6NVWdFZdeyfvAOYAOsArGECrAOwJng2GHsFyEfoClHyDmACrAOwhgmwDsAaJsA6AGvMErB6WLz4BdgCOsA6AGuYAOsArGECrAOwJvkEtJ5Dv5Z1AJeu6wLJO4AJsA7AGibAOgBrghPgm9W55+vaN23X9HxTkndA8PMBy6/vAQAnt/eV41Id93xd+7p2R9/uHgN17jvqdNpCB7TtIHda2/cBPkwAPFVcKiUVGg6HlfPDTxeVfcE9Lvtupet0+MtQR4KfFZ7P5yXwVOmiKPB8X4s63dFoxGeFQ1B7SkwqFBvtceiAUIGzvz8AAIuTz6FSjcb59/YKAHD8+1pFlw7QEnIrFAutygvJO0DtrTH3fiAW8i0wHo/51pgGTIB1ANYwAdYBWMMEWAdgjVkCiqLobQa5DzrAOgBrkk+A2mxQ7s37mhNokbwDov2PkDihKT7HaM8CBToglnA5m5bAyxUiWdEZnE8r1wwf2pUXkndAtLfHmyKV9TkmFsk7gAmwDsAaJsA6AGuYAOsArLG8D8gMx95CB0TQzCJoPtfNNUXpAAWNTEEDg/PpJQCUM/zcdXzPeHnIuHSAgka+2WYKWrsq7hs3CDpAUSvfbDNFzX3jqJC8A2L+h38GAOVs6ruqNyUPjGcnyTuAEJI2/wG6qwyS7ZsdxgAAAABJRU5ErkJggg==",
  Dd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAGxJREFUeJzt0rENgDAQA8DAMLD/OLAM9ClAFHkjuGtTvOW4NQAAAAAAAAAAAAAA4Gum6oPrshxX79u+l2aaK4+9UVnbdz/fq1qCBYw+8PTne6OX8PsFKCAdIE0B6QBpCkgHSFNAOkCaAtIB0k5q0wwehXpPJQAAAABJRU5ErkJggg==",
  Pd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAEACAYAAAB7+X6nAAAAAXNSR0IArs4c6QAAA8FJREFUeJzt2s1qU2EYReEvehx4D0UFR96MN+cVOerciTgQVASnpVIUROqoShMbo5Kc5KxnzY67r3Sw2PnpXn29urgeW/j+7cut5/sPHm77cfcndn/vr/43LA4CxCFAnGn9H/70miFfVq4B4hAgDgHirK4uPt36HuDYPqe63++9BohDgDgEiDPN/TlU7nsAzAgB4hAgzsoeoH2vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBBn9ebV+fUYYzx++uy3P/D+7esxxhhnj56MMTZfU25y96d5rwHiWATF7zVAnI09wK6vOfJl5BogzsZ7gGP7pkrum0DskWn9NeHjh3djjF+fK9c/Z96Vuz/New0QxyIofq8B4kz/+poiX0auAeLc+T3AujmHym/Y9a9c8v/LNUCcadfPmYfKPR/2WQPE+fkeYG4TPc/zrAHibLwHWP+ceCymevYeAHtg4z3Arn9V8ryMZw0QZ/XyxfOtq2AsGw0QZ7q8/Dz374AZ0QBxCBCHAHEIEIcAcX4ArJp5vJPKO98AAAAASUVORK5CYII=",
  Rd =
    "data:image/png;base64,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AAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABC0jH7Ax0+frz5//erl6CsAIGft+3WUCQAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEHDewD++P23q8+3vscIAE/R2vfrl6/fhj7fBAAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgKDhPQBr1u4xjlq7B/nr4XrjHF+8eMzjALATp+/frz7/9/Lf1edbf79tzQQAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAICgZfYBtvbnu3/ezD4DAPvzcH/31+wzbMkEAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAoGXtB96+//D82vOH+7sfj3ecTfw9+wAAPD1fvn6b+v617+c1JgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAAAAAAAAAAAAAAAAAAAAABM9BOWD2UKf0srwwAAAABJRU5ErkJggg==",
  Fd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAN5JREFUeJzt2DEKwkAQheGneBLBzkOYK1haWAoewFPkAELKFJZeQQ9hJ4idYJ1emwQlGAhhhkH2/+rMMMw+FjYSAAAAAAAAACAdI6/GeVG+PPruNmvTmceWzf6ReQKak5/PptatJUmX602SXRKSTwALiB4gGguIHiAaC4geIBoLiB4g2sSr8f3x9GptKvkEeLwGF5K0PxxPklRVlaTP26BvMrrqtqtlVn9ythg2+QS43QHtE/x6xWWdRZLyojwNqRsq+QS4/RFSfRc0J9rWNwk/6vgjBAAAAAAAAADAMG+ZczUwk6lrJwAAAABJRU5ErkJggg==",
  Td =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAANFJREFUeJzt1jEKAjEQheGnbJlasJMFOy/hRbbcG+wp9gCCpYWlV/ASdoLYCdbptQrYppiMIf9XJzPDZLIbCQAAAAAAAG1ZlEo0H0+fnPXTOBSpbVkiyT8z73I6+d22z9p3uz8k2U9C8xNAA7wL8GZ2v9LdDyFIkjbrVdb+5+stSYoxSrL7FjQ/ATTAuwBvvAMsg9eABngX4I13gEXQmtAA7wK88Q6wDF6DzjpB+gukE83dZ40JKJVoGod9zvrD+XK1quVX8xMAAAAAAAAAAGjJFwLsNCjshHdoAAAAAElFTkSuQmCC",
  kd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAglJREFUeJztmr9KA0EQxj9F0NiocCApQkQsUthoZesj+AASa/s8RXprgw9iaxEMqEUqMaQQ4UAt/IsQi2Q0t3G5u83OBdnv1yQ5dmaXne9mZ3cDEEJCZk7Lcb25Mxj/3Wp0cvU1rX1W5jWc/ie8z6pErlJbSzzvdx8BpEdyWvu8UAFajs13WCJqi6QZeWknMAcosaDlWCJmKsHVjxbBK0B1dsdJe8fTcoQWwStALQcIhyebwxzw4mZ3dnzLHKCJ2uxKBC/LJQDAUVQFANxc3AOwV3rtrc9E+6vrLgA9JQSvAPUcIJzGPQDAQW098XxldWn4ZaSI9tdDov2u8riogFkP4Pnpfab9B68A9WpLVoNqZSOXXa9/B4B1gDoz2wvY4F6gYApfBSTCtkqwaIJXgPp7ZjsHKEWLiXZv8Qf+ascTIWUKywFmzT9BtJxo1y9iUKAC/Ctg2lPgNH+8GfKMNwVIpLb3ygB+d3mSzbPu+sx2sipIbqg3MQD8KSF4BUw9i1nP+13Rvj+gAlwNbZFPu/XNSt5bZFclUAF5DdL+wWHDVQFZ/bkqgQpwNbRVfGYdIJi7wGhU+wtx/ApgclcoSB0gN0smzAGOeKsEJWK2CJkRlYgLP4oYfZo5QHaHtnrDleAV4H0VaDU6+xa78zz9pPnhKuAJb6tAUef4vvsPXgGEEEIIIYQQQkLkG9tY+hS5GZ70AAAAAElFTkSuQmCC",
  Gd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAeFJREFUeJztmr9KA0EQxj9F0NiocCAWISIWafUNfAQfQLS29ynsrRUfxNYiKKhFKjGkEOFALfyLoEUykNtk2dvdmwuy369Kjpm5Y+e7mdlNAEIIIekyoxV4/3jrd/T72dG1171i/csyqxH0P1H5qkrmmu2VwvV+9xmAO5Ox/r5QAVqBzXdYMmrLpJl5sRNYA5SY0wosGTOVEBpHi+QVoLq6o7jecVeN0CJ5BajVAGHvZGNQA97C/M4P71kDNFFbXcng1VoDAHCQtQAAd5ePAOyTXmfzu2B/c9sFoKeE5BWgXgOE07wHANhtrxauLy0vDD4MFdH5eSrYbys/FxUw7Qd4ffmc6v2TV4D6tCXdoNVc9/Lr9R8AcA5QZ2p7ARvcC9RM7V1AMmybBOsmeQWov2e2c4BGNl+w+8i/MMmOJ0LK1FYDzJl/jGyxYNev46FABVSngNjTX9+4VdWG5BUQvYpmlZd3WHZ5tr7vwvSzxY1VAhUQ6ug65xd8M2/iihurBCrA16HE7/c7hv3FJHsXvvFClUAFhDr69v1QBZSFNSCQyiZBW78WzF1gNpz9hTx/BzC+KxRsc0AsySug8i5gw7SXjAumInzjsQsEUlkXKPv/v7L4xmMXIIQQQgghhBBCSvMHUDrpHCq68l0AAAAASUVORK5CYII=",
  Ud =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAixJREFUeJztmjFrFEEUx3+KEJMmCTmUK0JEDCRwTawsRPAj5ANIQrrY36ewtwwGWz9CQLCySCJoICEHYkghHgcmhUZFOIt1IDO5ZXZ293nI/n/V7c6bt8u8/773ZvdACCGEEE3lmpXjtWcrw8vH2913SdeqOr8o1y2c/k/UvqoucvNLs97506OvQDySVeenIgVYOQ6fYRfRvEiGkXd2DuUAI25YOXYRC5VQ1o8VjVeA6epeJvaMx3KEFY1XgFkOcDx5fjfLAd/KzXv59KNygCVmq+siuN+eBGC9tQDAwdvPQH6nt3vvl2f//sMRYKeExivAPAc4XgxOAFhduu2dn565mf34q4jd3188+/vG9yUFjPsGzs9+jPX6jVeAebflqsHC/J2keSennwD1AeaMbS+Qh/YC/xjzVXaR7zxoA/FOMLTT+wBjzPqAbrc7BOiz451/OL0JwPGbHgCd5WUAFuey8T6vPPvtra0hwNrGhvYCFtSmgCvv/vqj7Y57Pe/44PDQO761yMhxqy9FUkBVB2F9d7u787O9zCDbzhfu+UO7iUeZn85M2xt3162qhMYroPTqxd7yOmKdX4yY36qdoxSQOqHA19vHgf3rUfYxUv2VVYIUUHZi6je/sgooinJASWrrBK/2AX49dxGdbE0A0GpNeeODwXcALgY/PX+O0G+qQvJovAJqrwJ5hPYu4o5QEan+VAVKUlsVKPrvr6Kk+lMVEEIIIYQQQgghCvMHRKv5Kth1sBQAAAAASUVORK5CYII=",
  Nd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAjlJREFUeJztmjFrFEEUx38GIZ4WiXJEUohgEkggFmov+BH8AJJwZfr7FPaWwWDrRxAEqxRRQQ8SchoQC/E4TFKcSVQ4i81AZu7W3dndZ5T9/6rb3Tdvhnn/ffNm9kAIIYQQQtSTC1aOVx7fGZ693mi/jeqrbPu8TFg4/Z+ofFZd5G4sXvXuf97ZB7IjWbZ9LFKAlePwHXYRTYtkGHln51AOMOKilWMXsVAJRf1YUXsFmM7uWbLe8awcYUXtFWCWAxyPntxKcsCgWLtna3vKAZaYza6L4JvZBgCrzZsAdDa/AOmV3tb8D8/+3fsdwE4JtVeAeQ5wPO1/AuDh4nXv/tT0peTHqSK2fn317O8aj0sKOO8BHB4cn2v/tVeAebXlVoMrjRkAms3Lf7Tv978DMDjqAaoDzDHPARODKQDmbl8D4OOHb8CoElzk5+YTu87mifXQkvH9lV7+YcwU0G63hwA9Xnj37/1sAbD7qgvA8tISAAunz3s89+w31teHACutlipBCypTwMjJT2+83W636113tre965kFxj63+k4gBZR1EJ70uNr+8OB1YpBs5nJXfKHd5P3Ez/L0rPfc9VtWCbVXQOHZyzrjc4T7/liy/JY9Q5QCYhvk+Hb3ILB/Oc4+i1h/RZUgBRRtGPvFp6gC8qIcUJDKKsHROsBfz11EG81JIH03eNQ/8fw5Qr+xCkmj9gqofBVII7R3EXeEioj1p1WgIJWtAnn/+5OXWH9aBYQQQgghhBBCiNz8Bk178vDYrOERAAAAAElFTkSuQmCC",
  Od =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAUVJREFUeJzt2K9Pw0AYxvGnZA5fQwjhn8GSsIQfCoMeQYMEhWIGM4MaLGHJLP8Orh5d1JFw26V3vW7r8n4/bu12vdz79N21EgAAAAAAAADAjiJ04uz8qpak+Wwa/M4qF9c3dc6EPt4mSdfLtbfJi/XRwD/gKh/Lr3hZllkT8sdbdyLMJ+Bvdf3KN937rlK5FW9SVdXK4++PL5Kk4nA/KyHmE7DUA/omlLDR+EmSVH//1JJ0+XArKb1nmE9Acg/Y1L3flusZsUkgAf6Bpn3AwdHx+mbTodgkmE/A0gLMZ9Midf+/y8wnILgP6Ou/wHh0/++z2w+0RQJSf+C66raTcPf6LEn6WnxKkk5Oh63GMZ+A7G6/7ST42Akm6uxp0K18ahJCz/tO7HiplXfMJ6DzHV/qW+GmisWO1/bdofkEAAAAAAAAwJpfo2dkLKX82LUAAAAASUVORK5CYII=",
  jd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAASFJREFUeJzt2j0OgkAQhmEwsTD0dF7KQmNlY80FrL0AtY2V0QQTWq5jR2+N1SZAAZLszED2fTqSdXcy+7H+EUUAAAAIU6y94G5/bNrX79dDvYa2leXic6DW/bntvEMCtBZyCVhvksFxz/tNNRkkQHqBw+ncuffTNB0cX9d151o6ESRAamK382M7PsYlQioJwSeABlgXYM37feXr3u+TOguCTwANsC7AGg2wLsAaDbAuwBoNsC7AGt8GJSZdEhpgXYA1sTOg+Xw7vwVm+XXS6/Ps0rmOtwlngATxBEzd+T6XBBIghM8BEpMuCQ2wLsCaWgOqsoiqsvA2zpfgE6D27/DUdwPp098hAVoL/ZsErZ13SID2gv0nRvp4RggAAAAAFPwAK4BXqGdtudUAAAAASUVORK5CYII=",
  zd =
    "data:image/png;base64,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",
  Ld =
    "data:image/png;base64,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",
  Hd =
    "data:image/png;base64,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",
  Yd =
    "data:image/png;base64,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",
  Xd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACIVJREFUeJztnV2IVVUUx9dED9nU0FULMmoyQUszNOrJKLLoIWIyVHpJ0yIiCIMgPx5Kpx5SH/qQQCpKs15CxWEQg0jFsHqwUBLNBBtFKihlYmTocXq4Z93p7Hv3PXuftb/Ovf/fy73n3vOx58zZv7PWOufs20OBOb9zycT/p/sXPh66CR3JheMHctO3rxrqCbHdq0JsBHQuQY5SoknzwDhhYCP5NhEMBER4N5Av81w6e4SIiKbPfsjpejsN3yaCgYAIbwaCedLCl4lgICDCuYFgnrRxbSIYCIi4OnYDioB50gYGAiKcGQiV5mrA/5/zO2mCSB4LwUBARLIxEGKfagADARFiA3VK7MP1kar/Haa4ioVgICAiuRio22OfqpkQBgIikjNQaKrW410jjYVgICCitIE6JftKDd6fVTEjDAREJBMDdXv2VVVgICAiGQOBuJTNxmAgIMLaQKlnX1XJXjoFGAiIiB4DIfuqNjAQEIEDyJALxw80jcGTArHbhQMIiDCOgVLPvoAbbOtBMBAQET0LAzJiX72HgYCIyhjIdQ9rrK/3YS/r7xZgICAimoFQgQ6LL8PCQEAEDiAgAgcQEFGZLCw2oeotqWSHphVpGAiICG6gUD3Kdjuxe3xVgYGACMRAGaOPrKi/GT5sNL+vynjfwKf1Dw5+brVcLGAgIKIyBrLNgrgnXxh+zmh+5uTpsy2329QeYcykW+67zQ8QEdET979otb5YwEBARGUM5Otcv//Yh/U32eui9UeJiGgsM1doePv7MxPNnzs7SjtMgYGAiMoYSKUo9uBYQkWdn3u8imkMZRtrqe1uyr6UdulM2FSxHm+dPfqua8FAQERlDVSEzixsCrXH61AN01hP1uP7aEXL+UxNpGtHLasDjWmW42zxJNVfY8VKMBAQUVkDhb52VdZYRbGTDrUyrhpr0UD9azaVGgOFqlDDQEBEoYFSfyJVF6OMaWIdU5P4alfZ9Zhimp01zV/y/wsDARGViYHUugn3rP6D2QyBzGKLb+OpsZLt1XwpMBAQURkDqfA5vtEDu5xQsZ0KDAREVNZAoD22d1iWBQYCImCgLqWo/sPfY4Qy4BWtgVKvQJvywZa7ctN/n5rbdv4b550mIqKX1/3irU3t4Pbq2mnavjHLe8HLAgMBEcnEQLbXZHT1n+Ye3N44KrzcxpVLiSickXh7Re2Vts/13QswEBAR3EC+RrlQzTO4a6+T9YaibHvZRPz360yEEcpAkiQTA0mJlTXFRjUXZ1/nLv6VfWJnHtP6DwMDAREdYyCQZ9atNxER6kAgcZIxkGl21pjP8vmuTsf2WX7dE7KmsQ8DAwER0QwU+1dmOhXOvjgGKpqvf6FsezAQEJFMDMR0mplqtRoREY2OjnrdTv/dC4iI6NzFr9vOx/uVDVU29mFgICAiuoFU4/C5efHAqtznqolSz8bYPPTTYP31jjXxGtOCssZRgYGACK2B+Ajl30oIHouc/ZeIiPpum0NE8cdDtqUR80Q2j7rfXJmHgYGAiOgxEDNpuNamYRM1sWCdnwZVjZFablKtB7k2DwMDARHJGIhpmCiLgWCY9tR+28bvomwfBgIixAby/evLPAYgzcxXckcTq6tE57pvcpO+Yx8GBgIiCg0Uqx506MyXuenF9HRuujaSN1O3GakR+2TZ16Ezl4konHkYGAiISC4L06EaiWEz1ajeI32Z6JrdHxER0ZSpU4zmPzgxjYiI7n3UrbGbzdN6v4QCBgIirM+TulE7TLMx0/kODe+0atfiO7MYyVNMVCs56qmrMRyLzBM69mFgICCidAxke8eg73pRg6yH+o6JQpFazKMCAwER1gZSz7FcH2LGNfft9Pb2Gq3fNvZRGZ32R/1N9kNbHLtUbTzp1M3DwEBAhLOIfWjqtRPtvl/wzmNG65kcVcIOzsIaBlKoXZ5RfyPM0kyzsbLGszXPlXdPEBHRk4ffIyL5Uxa2wEBAhLgSXVQX2vHCvvoHr7Z+XonNNHnNbUlbkzG2ptLFRrZGch1LNRun/XNdbByGzRMLGAiI8HYtjOs9qz/OT6uUfWrA1FQ62Ei1kRnZa5ir+66Mw4ZX4TMBZ8e4HwgkTemj0/VI9tLsYWL3+xNE+izMlEa2xkizNsOsSjeaBu9f20p+qGwMBgIiKnM/UChUg9nGSLoYhw2jM01zhT8f43m/hlgSGAiIEBtIOo4Pn9tDZw+mFBpJoWf5piTaHQoYCIgQG0iahY2PjxMR0XRpQ3SoT7ae2OJktT3LX+kq0+iAgYCI0gZy9byYOkKZKQ/OmdW+Eq17pt6RkXj73/56LikT4Wo8qBTO6kCqQcoaqajnqObZtWF+qe00YCNV3EShzcPAQECE2EDqfTy+nqXXxTwr3z5JRES7NtSn+6ZpRjIrQhczGZrJtYlM92PssSNhICDCWQzky0SF2VYGm2hoe0kD6VDMNFpgJLW9vmKjWDGPCgwERAQ7etWry0XndDZKWYZ+OCZaXktmoCUv7Sm1uK2RdHdexjYPAwMBEcHuByp6olWF6ztSE/nmhuvzT9z+c2W87fymMZJqnlSMowIDARHBjmrTbKosOhMMbV9W/8DVeNNZDLRq7VelFtcZits//OPPSZpGBwwERHiLgdg4z69+Jvf5Jzu+8LXJHKqRdmx6Lch2i1DbxbCZBu67Z4KIaOmyp4iI6Nn1g0kbCQYCIpwf3Z9t3piLddg43PPWrF2bm//N1zfmvtdRlN0ULT9vZv1e5uk339J2PlOOfO+nzsT7h/fLG28N5qZjX/VXgYGACPHRzOdsHapxtm3davW9K1I3EO8H/vvVaZVUsjUYCIgofRSrsQ6zd8++tsvFNpLURJf+/J2IiE6NyJ7BZ2zNw9mZSqxsDQYCIqyPWp15dJQ1UqomcmUgV+ZRCW0iGAiI+A9UMOP/e8da9wAAAABJRU5ErkJggg==",
  Vd =
    "data:image/png;base64,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",
  _d =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABGhJREFUeJztnE1oXUUYhp+quLCCpk1BRElPwGYpSnQhSG6Taq2gKI2LtFYrYhcuFF1IwU03xeJC0YWLWjVQGxfWHxT8T5tgcaGhorhIKuQktBbBxFbwdqHgcZFMkjn3nr87M2cK8z2re+bMvPMx3ztz5s49CQiCIAiCIAiCIAiCIAiCIAiCIAhhsM5Xx8lPhxMtkFv3eYnlCh+dXk7UNupzow9pGe+57X4A5n/8rG39zXs/riU2cYAr4ayMlyXtDFeOEAfYFlSZr5rxIpQjbDtBHGBLyFXm09h2gjjAVGAl80PPLRX8OWMqmc+GPgDmx18FzJ0gDui0Ye2ZT2PJCcE7wN0AbOhbyZJRvbI6HRK8A66q2qDTub9wZhKA7i0DVuqpflUcc6MkUH0tEAc4U0454+fpGIBBlVk1r4vqOX66iAM6blmQmfRcHtxxb6n26XqFa4KhQ8QBdXV0ofcZ7brr7HH9/s3DufddIQ6wJZSeq93RLdr9oXu+B2D86zu18nTmVb3Tb9NWp/Q+oSTiAFfC6Tk/Pb1/+dOSA9KZX6334fL9Q1q5qzUheAfIAPgOwDfW1oCWPXyK384ealtetV5RP1URB9gWVOf2Pf+eB1qfBlXpmn0dgIX4V7PAMgjeAR2fCv/x/u4EsndkJz4ZBVq/3RU5QmV8Refzr5Z0Htzbtr7aGW565JicCndCx2tAs9kE4JenntfKo6e3adcqg4rBHfm66foKtbbEb3yT219VxAGmAo03X9GuVaaOnLqybf0jp8YBGDs4pJXvenF8+VP7di+N5PfXKcE7wN6vw8vvBex64SgAzcW/ABi46w4AJr/7AYD1G68DoL9vi6YzNXOmVLuxl/cA9t4TCN4BxmuAysDI9sUE4L6tg9r9D45/BLRmNE1W5ncOP6zVUw5778tv5Q0RGzg/FVYZLHJCUeZdEbwDjOfRyPa72879LBbOnwNgbnZWK9/c2wtA9403ldL54uQJwHwtCN4Btf0ypMh6Csz/vgjAzuFyDrCFOMBUQM3BsYNDCax+3//08Gu57Xpu2KhdKwdk8cC+Z4HV84LH98s+wAq1rwFZz/f+muNQiANMBZKpA9rcd43qJ5laeitsXf8B2QeYYH0NSJ/q2ta17TRxgCvht955F4Ann3jUis5j2/YYx9QOcYDrDlQGL1eCd4AMgO8AfGNtDVDP6YHdR21JaijdyWN2dYN3gLW/HL29L0oArnU8pn/zHwCnZ2I5D7CBswG42LzExeYlZ+W2EAf4DsA3MgC+A/BN8ANg/X+IFO0H1Ip+/fprSpUrbD//FeIAV8JRFCV597uu1q8v/JOvF8d2M68QB7gSzvq9QH1rTJ/nV61vi+AdIAPgOwDfyAD4DsA3MgC+A/CNt51gemdXtb4tgndA7e8IraHhse8VxAEONBsONNfqTtgUFQdY0GhY0DDpb8JELHgHuHi2NtZeRFF0cu11HMdb8xqXqD9hEFsL4oAa+mgYtp+wEEMmwTtAEISw+R9baohir5vMmwAAAABJRU5ErkJggg==",
  qd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABH1JREFUeJztnE9sFUUcxz8lxgMQYwGNITb1YWKPBoIeTEwfpf7BRPwHBwQUQyCGg0QPBm/cJF5MPBkTtVWRAwjqQVD58xoTD9BANB5aSPraoMSE1mLj46CJ62HfvLrzdt/u25nZIdnf5/K6OzPf32R+352ZnSWAIAiCIAiCIAiCIAiCIAiCIAiCIAhloMdX4OCnD4JIRx7c66UvS3wEvZUobNSnR56NZLx/7VMAzFz6Jrb+fbu+LKRv4gBXwkkZz4ruDFeOEAfYFlSZ7zbjaShH2HaCOMCWkKvM69h2gjjAVKCV+Y2vhzf+mDSV7MyKAQBmzrwLmDtBHJC3YeGZ17HkhNI7wN0ArBhoZcmoXladnJTeAbd12yDvsz97eQyAVQ8MWqmn4qp+TI8QQPdzgTjAmbLmjJ8n6gAMqcyq5zqtnuPVRRyQu2VKZvRneWjT45na6/VS5wRDh4gDigo0v+a1yHXv1WPR8r4tHctdIQ6wJaQ/q41GI7xulm987DwAZ75/ONJOz7yqd/EjYnUy7xMyIg5wJXzH5jCF883riYkDzb9CB+iZp1XveLP8UKij6jmaE0rvABkA3x3wjbU5oG0Pr/Hb1UOZdNLqpcXpFnGAbUF1bt//zzWgfQfYLb1T7wEwW79i1rEESu+A3KfC149uDyB5R3b26xGg/e0uzREq4y2dk98BcH/f3UD7lye1M7xr62E5Fc5D7jlA7dF/2fNG5H5l33DkWmVQMbSps65eX6eWEq9bSu8A8y9D2jP54pufAtCY+xOAwUceAmDsxwuRel+9/3zk+plXj8fGUe3HJy8D8Pk7OyPlpl+LxQGmAsoJbx2ZA+DJDUOR8i+OnQDanaCuFbpD9PovbHkOgFPnzgLw9raVgHwdNsZ4J6gysO2JR4O4cpU53QlJJGU+Ka4p4oCiAiU5QZ8T0jL/vzkmADjy7Q8yB5hg7AD17Ouzv2L22q8ArFp9L7CY6empKQD671kZqZ+UeV3HFqV3gLV/JxiMHwwAPjkduxi0UHNAEkkOeHrvfmDxbbFn/UFZBWxgfRXQM5XkCP3Zn/l9znZXMiEOKDpg0jO+vuB+KMQBpgJq9jc9/U1DzSkqTjAe7gRNVwNxgG3BtNnflIWFhTCOJT1xgCvhDz/+DIDdr+zI1U7npeGdsfdNEQfYEtK/6CiSMtotg9vD0+axw1bkWpTeAdbeBtcNVAKA5Y7H9C/+BeDiZF3eBm0gA+C7A75xNgA3Gje50biZ+b4vxAG+O6Dw5ZhbZgB8IQPguwO+KfxMUMf3ilB6B1j/P0TS3glUxu9cthRY3NvP/91Zt/f28NfWO4BCHOBKuFKpdDwU1DOadLps+1ugTukd4GwVmDr6MlB8Rrul9A6QAfDdAd84mwPWbB1t/jXasZ5vxAEeY1c9xm4hDnCgWc3TKMOcoXRrefSTEAdY0KjG3azX6xsAKpXKubj7FuPVTMTEARY0as3falyhhYynxTVCHGBRq9b8rVrU7BTHCqV3gMt38mqeRh1WjZphf2IpvQMEQSg3/wG8p486LQNSdQAAAABJRU5ErkJggg==",
  Zd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABGhJREFUeJztnE1oXUUYhp+quLCCpk1BRElPwGYpSnQhSG6Taq2gKI2LtFYrYhcuFF1IwU03xeJC0YWLWjVQGxfWHxT8T5tgcaGhorhIKuQktBbBxFbwdqHgcZFMkjn3nr87M2cK8z2re+bMvPMx3ztz5s49CQiCIAiCIAiCIAiCIAiCIAiCIAhhsM5Xx8lPhxMtkFv3eYnlCh+dXk7UNupzow9pGe+57X4A5n/8rG39zXs/riU2cYAr4ayMlyXtDFeOEAfYFlSZr5rxIpQjbDtBHGBLyFXm09h2gjjAVGAl80PPLRX8OWMqmc+GPgDmx18FzJ0gDui0Ye2ZT2PJCcE7wN0AbOhbyZJRvbI6HRK8A66q2qDTub9wZhKA7i0DVuqpflUcc6MkUH0tEAc4U0454+fpGIBBlVk1r4vqOX66iAM6blmQmfRcHtxxb6n26XqFa4KhQ8QBdXV0ofcZ7brr7HH9/s3DufddIQ6wJZSeq93RLdr9oXu+B2D86zu18nTmVb3Tb9NWp/Q+oSTiAFfC6Tk/Pb1/+dOSA9KZX6334fL9Q1q5qzUheAfIAPgOwDfW1oCWPXyK384ealtetV5RP1URB9gWVOf2Pf+eB1qfBlXpmn0dgIX4V7PAMgjeAR2fCv/x/u4EsndkJz4ZBVq/3RU5QmV8Refzr5Z0Htzbtr7aGW565JicCndCx2tAs9kE4JenntfKo6e3adcqg4rBHfm66foKtbbEb3yT219VxAGmAo03X9GuVaaOnLqybf0jp8YBGDs4pJXvenF8+VP7di+N5PfXKcE7wN6vw8vvBex64SgAzcW/ABi46w4AJr/7AYD1G68DoL9vi6YzNXOmVLuxl/cA9t4TCN4BxmuAysDI9sUE4L6tg9r9D45/BLRmNE1W5ncOP6zVUw5778tv5Q0RGzg/FVYZLHJCUeZdEbwDjOfRyPa72879LBbOnwNgbnZWK9/c2wtA9403ldL54uQJwHwtCN4Btf0ypMh6Csz/vgjAzuFyDrCFOMBUQM3BsYNDCax+3//08Gu57Xpu2KhdKwdk8cC+Z4HV84LH98s+wAq1rwFZz/f+muNQiANMBZKpA9rcd43qJ5laeitsXf8B2QeYYH0NSJ/q2ta17TRxgCvht955F4Ann3jUis5j2/YYx9QOcYDrDlQGL1eCd4AMgO8AfGNtDVDP6YHdR21JaijdyWN2dYN3gLW/HL29L0oArnU8pn/zHwCnZ2I5D7CBswG42LzExeYlZ+W2EAf4DsA3MgC+A/BN8ANg/X+IFO0H1Ip+/fprSpUrbD//FeIAV8JRFCV597uu1q8v/JOvF8d2M68QB7gSzvq9QH1rTJ/nV61vi+AdIAPgOwDfyAD4DsA3MgC+A/CNt51gemdXtb4tgndA7e8IraHhse8VxAEONBsONNfqTtgUFQdY0GhY0DDpb8JELHgHuHi2NtZeRFF0cu11HMdb8xqXqD9hEFsL4oAa+mgYtp+wEEMmwTtAEISw+R9baohir5vMmwAAAABJRU5ErkJggg==",
  Wd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABJdJREFUeJztnE2IHEUUx39R8WBE3GQjIoa1I7p4EmXNQZCdbNaPePAzOcTookhEPAjxIHrLzZyUeJKIujFqDsZoFPxOMkHwoCFi8LBR2NklGgQ3blicHBRsD91vYtf0x0xX1fRCv9+lp6pev1fU+3d1V/XMgKIoiqIoiqIoiqIoiqIoiqIoiqIodWBFVYHDH/eEiY7c/FQlfbmoiqDLiYGN+tz0A4mMj9xyLwDzP3yaan/d4x8NpG+qAF+OszLeK6YyfClCFeDaoWS+34wXIYpwrQRVgCtHvjJv4loJqgBbB53Mb9wRVfx5ytZlPqtGAZg//ApgrwRVQNkTB555E0dKqL0C/A3AqtFOlqzsevVTktor4JJ+Tyh77S/8fAyA4RvHndhJXOnH3DQh9D8XqAK8eTaUcXKmBcCEZFau6yI7z3cXVUDpMwsyY17LE5vu6ul8065wTrBUiCpgUIEW1z2bKA+dPpBsX7s5t90XqgBXjsxrtd1uR+W4feOd3wFw+Kv1ifPMzIvdiTej8nBwQ24cW1QBvhxfcV+UwsW4PDPzQvwpUoCZeTp2B+P2XYl6X3NC7RWgA1B1B6rG2RzQ9Qxv8NvpXan1/doVxekXVYBrh7JvP/LPGaD7CbBfhmZfBWCh9YtdxzKovQJK7wr/8f62ELKfyI58PA10r+6KFCEZ7/j57EsArl97FdD95kmeDNdseVd3hctQeg6QZ/2ftj+XqA+emUyUJYPCxKZ8v6a9SbMgXr+oAmwdNF5/OVF+5Pl9AIyN3gTAsW+/T7TvPhQ96x967aFE/f1PH0yUx2+/LXH+ytUXA/CeES/rO0a9UnsFOHs7/OL+swDcs2ECgA8OfAh0Z1KQekHaTfuHNz+YsPv86BEAXtq6GtC3w9Y4+4bI1rvvCOGCAoQsJZgKELIyL4gC9n/xjX5DxAXWd4GszAuSySIlFGXeF6oA1w4XzvwKwPA11ybqJbPSPnJ1NIvPzc4C3XNClp//KS0E+7mg9gpwdhcIj+8M4cJq75M9u1PtZC7IwlSKqYCpyajLK8Z26l3ABQN7N2gic4Aw//vZRFkyLxnv7CMY+wW2qAIGHTDrPj824H4IqgBbB+bsb+7puUbihMej5wDbu4EqwJWjpaUlAIZcOYx5++vop0dTk5GybN8zmKgCfDl+4613UuuffOLRUn6mJh+z7lMaqgBXjkYWpgEY37Yv1y5LGb3i+i5TewU4Ww3eOhqEAJd7HtO/+BeAE6dauhp0gQ5A1R2ommUzAOfa5znXPt9zvSuWzQBUhbcBqCqj/aIKqLoDVaMDUFXg5TIX1F4B3v5FJgiCMK996NLoKGsHUcOVKy9LtXe9BhBUAb4cm7vFgqznZTdXVpGLf+f7a7XcZl6ovQIqezcoyDXdg2K8xK+9AnQAqu5A1VQ+BwjrtuyNP+3NtXONKqDC2I0KY3dQBXjw2QAv13QjPjZdOQRVgBMFNBz4oNVqbQAIguBoWn1OvKZNXFWAAx/N+Nhw4Cst40VxrVAFOPTVjI8Nhz7T/DZTrUpSewX4/P/uBvQ0q/dK07I/qdReAYqi1Jv/AEntmRG5SxmZAAAAAElFTkSuQmCC",
  Kd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA2BJREFUeJztnD1oFEEYht/zrxROzkYM8VKYRvCHtJLzImpE0JBYqBgCgoWIoGBlk84+goUgBk06MWKhFhIvlU1QtMqlcBM1USS/xaWwWYu9UXezd15ufr7AvE9z2WHnnY/vezM7uzt3ACGEEEIIIYQQQgghhBBCCCHEBzLSAYQfH4T/HmcOXnUa0xaXg21GnGV7ZvhcmNbeevg0AGD2w8u6/fcNPLcSKx1gSzhZcVXpZlEOMe0EOsC0oKq8bsVrYdoJdIApoT+V77oZNSyVTUmnYsoJ3jtgm3QAzaKcNjOMEGjeCXSAroDr/33T0AHWR9jVHn2adkZVT3cuoAOMKSUqPP5iGABQHLgLAFiYngAA5PZ3xvvZckiD0AG2hIvdJ6I/qpX9NBVE7UkH6KLpHDpAV0DNumoWVneBy203YucVu+fTBYTXDXSAKaGkE3a29AEAeq68AwCMPYwckf36FECdq4Jj6ADTgq0HDgEAlqvHq0s/TQ8RQ/e5gPcOYAKkA5DG+t3g+NhZ20NoQQeYFsx0DGYAIJyM1gPJFaG6/lu7N9ggdIAt4VpO2Np1Lzph6kxqv0ZXiHwvYAjrV4GkExS3R74DAJ61RJUM7r+J9ctfq9TV5btBQzjfI3Th5NEQACqLqwCAoettAP4+R1BzwO7zo05i894Bzt4NJiuvsLWPoFHoANsD1Kp8b18PAODxq7lY++u3X2yHFIMOsCWsKp/bHg1xqlrxzQYdYHuA2R+LAICO6vHC/DcAQG7P3th5qt013juACZAOQBrrc0BvYva/1d8CYP2TouznIQDAxTvTtkOK4b0DmADpAKRhAqQDkIYJkA5AGiZAOgBprK0EyzPR3d3co5FYe//xyw31c4X3DmACpAOQxvl3hjovPQEATIymt7uGDpAaWKriSbx3ABMgHYA0zhKwUlnDSmWt4XZX0AHSAUjDBEgHII33CbC+E+tIez7aKfqr/nnZHdHn+3LAX5JyibNsh5ODqbvH1TtBtaPUNd47gAmQDkAaJkA6AGmYAOkApHF27c3n86m/KKkIArcrQIX3DrD5VLigeX7JSBT/gQ6woFmwrFMypA+ADjDigIIBDZ3xSjpidIABjVLiuLCRzkEQHNMcTwvvHeBi9VXQ7F8yEENNvHcAIcRvfgNGQOhMZUYqdAAAAABJRU5ErkJggg==",
  Jd =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA+FJREFUeJztmztMFFEUhv9VMEbEgMHGQHAppDHxwbaG5REVY6JEKNRISEwsLEw0sbLZzs5CEwsNERE6I8ZCLQiPygY0WgGFAypoDA9JxNKxmL3KzM4uw849c9H5vwZmuHPuyT3f3DsvAEIIIYQQQgghhBBCCCGEEEIIIf8/CdMJ2O/u22u3EwcvR5rTlig724xENtozvWdsv/21h08CAGbfvih4/L7uZyK50gCpwN6Kq0oXizJEtwk0QHdAVfmwFc+HbhNogK5Afyrfcs3ZsTSlK7QvukyIvQElphMoFmXaTC9soHgTaEDYAFGf+7qhAeI97K53fuo2Ixsv7FxAA7RF8lR4+HkvAKC5+xYAYGF6DABQtb/RfZyUIQGhAVKBm9uOOb9kK/t+0nL2ew0IS0hzaEDYAGrWVbOwugtcrrvqatfcNu8fwPB1Aw3QFchrwq6aDgBA+6XXAIDBHseIyk9PABRYFSKGBugOWHvgEABgObu9svRNdxcuwj4XiL0BHADTCZhG/G5wePC0dBehoAG6AyZSmQQA2OPO9YD3ilCt/2L3BhuEBkgFzmfC1pa7ToPJU77HBb1C5HsBTYivAl4TFDf6vwAAntY4lbTuDbmOS15ZLRiX7wY1EdmbIWXCueNHfb8UST+4DeDvHLCncyCSr1doQFQdqcqvLq4AAKrLywHIfUcQFBog3YG38mc72l1/73s559p+NfJROiUXNEAqsKp8VanTxQlP5TcLNEC6g9mviwCAVHZ7Yf4zAKBqb7WrndofNbE3gANgOgHTiM8B3nX/elcNgNwnRZUf7gAAzt+clk7JRewN4ACYTsA0kd0NdrU6t/f5zv2+Id/HBOLE3gAOgOkETMMBMJ2AacRWgakZ5+5u7mE/AKCr9WLB9j3Zdj/wSyolX2hAVB01XngMABgb8N9vitgbIPb25Uh90gaAnUWOsZoL3kxZom+IYm+A9jkgbOWj5t/IUpDIVoHvqz8BABVlOwK1VwYpo6TmAhpgOoF8Zqj9JWXbRfuPvQEcANMJmEb7HKBm62Qy6X7IV+qcyxW6OwxJ7A3Qvrba4xnfb4QVDQ0NgeJUbnN+8l5AmMiuA9Tzf8uysl+OFjZFtU+kMqJ50QBdgVRFg7Le/xVERewN0DbDetf9iYkJAK5z2bevoKuGmjt0E3sDxFYBn/U+7dcukco0AYA9jhEAqOt8JJWSLzSg2ANzrvVDsl7lVX+654LYGxB6NIOaYFlWU8B4IxuMMxokbj5ib0DoVWDNOZkGcisYtPIB+tFaeUXsDZC4ukqHOTiAQaNh4nuhAYKx05rjjWqOB4AGEEJizm/grC2zwNJqRQAAAABJRU5ErkJggg==",
  $d =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA2BJREFUeJztnD1oFEEYht/zrxROzkYM8VKYRvCHtJLzImpE0JBYqBgCgoWIoGBlk84+goUgBk06MWKhFhIvlU1QtMqlcBM1USS/xaWwWYu9UXezd15ufr7AvE9z2WHnnY/vezM7uzt3ACGEEEIIIYQQQgghhBBCCCHEBzLSAYQfH4T/HmcOXnUa0xaXg21GnGV7ZvhcmNbeevg0AGD2w8u6/fcNPLcSKx1gSzhZcVXpZlEOMe0EOsC0oKq8bsVrYdoJdIApoT+V77oZNSyVTUmnYsoJ3jtgm3QAzaKcNjOMEGjeCXSAroDr/33T0AHWR9jVHn2adkZVT3cuoAOMKSUqPP5iGABQHLgLAFiYngAA5PZ3xvvZckiD0AG2hIvdJ6I/qpX9NBVE7UkH6KLpHDpAV0DNumoWVneBy203YucVu+fTBYTXDXSAKaGkE3a29AEAeq68AwCMPYwckf36FECdq4Jj6ADTgq0HDgEAlqvHq0s/TQ8RQ/e5gPcOYAKkA5DG+t3g+NhZ20NoQQeYFsx0DGYAIJyM1gPJFaG6/lu7N9ggdIAt4VpO2Np1Lzph6kxqv0ZXiHwvYAjrV4GkExS3R74DAJ61RJUM7r+J9ctfq9TV5btBQzjfI3Th5NEQACqLqwCAoettAP4+R1BzwO7zo05i894Bzt4NJiuvsLWPoFHoANsD1Kp8b18PAODxq7lY++u3X2yHFIMOsCWsKp/bHg1xqlrxzQYdYHuA2R+LAICO6vHC/DcAQG7P3th5qt013juACZAOQBrrc0BvYva/1d8CYP2TouznIQDAxTvTtkOK4b0DmADpAKRhAqQDkIYJkA5AGiZAOgBprK0EyzPR3d3co5FYe//xyw31c4X3DmACpAOQxvl3hjovPQEATIymt7uGDpAaWKriSbx3ABMgHYA0zhKwUlnDSmWt4XZX0AHSAUjDBEgHII33CbC+E+tIez7aKfqr/nnZHdHn+3LAX5JyibNsh5ODqbvH1TtBtaPUNd47gAmQDkAaJkA6AGmYAOkApHF27c3n86m/KKkIArcrQIX3DrD5VLigeX7JSBT/gQ6woFmwrFMypA+ADjDigIIBDZ3xSjpidIABjVLiuLCRzkEQHNMcTwvvHeBi9VXQ7F8yEENNvHcAIcRvfgNGQOhMZUYqdAAAAABJRU5ErkJggg==",
  tf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA+VJREFUeJztnDtMFEEYx/+nYIyIEYON4YJHIY2JD2iNPIyKMVEiFJpISEwsLEw0sbKhMXYWmlhoCEhAGyPGwkdCeMTCBjRaAYULKmgMD41iYeFZzI2yw8Edt/PtnO7/1xy7e/vNl/l+OzO7twEghBBCCCGEEEIIIYQQQgghhBDy/xNznUDy9a3k4u3YrrOh5rQmzMbykdB6e6LzeDLd/vI9RwAAk68er3j+9taHIrnSAKnAZsV1pXNFG2LbBBpgO6CufNCKL4dtE2iArUB/Kl9/Qe2YG7MVOi22TIi8AQWuE8gVbdpEJ5JA7ibQgKABwr72bUMDxFvYUqk+bZuRihd0LKAB1iIZFe5/1AkAqGu9CgCYGR8CAJTu2O8/T8qQLKEBUoHrGg6qP1KVfTPqqf2mAUEJaA4NCBpAj7p6FNZ3gfMV533fq2uYTh/A8bqBBtgKZJqwKd4EAGg88wIA0NuujCh5fx/ACrNCyNAA2wHLd+4GAMyntr/OfbbdhI+gzwUibwA7wHUCrhG/G+zvPSbdRCBogO2Aseq2GAAkh9V6wFwR6vlf7N5gldAAqcDLmbC2/ob6wujRtOdlu0Lk7wKWEJ8FTBM0l7o/AgAexFUlvZt9vvMS5xZWjMvfBi0R2i9D2oSTh/alfVOk5vY1AH/HgK3NPaG8vUIDwmpIV35h9isAoKy4GIDcewTZQgOkGzArf6Kp0Xe868mUb/vpwDvplHzQAKnAuvKlhaqJw0bl8wUaIN3A5KdZAEB1antm+gMAoHRbme97en/YRN4AdoDrBFwjPgaY8/7FljiApU+KSt5eBwCcujwunZIPGuA6AY024u4VtX3v2fNQ2qUBYTfY1aceB7QcUNe8ORaETeQNYAe4TsA1eTMLaPSYoJ8i62eJUtAAqcBjE+rubqqjO+3x9g71OdSjPl3NBpE3QOz62luZSALAxiz7eKjntG9b+trX0ACpwKs1wOQ7fgEAXo55nAUksT4LBK182PwbWQoS2krwy8IPAMDmog1ZfV8bpI2SGgtogOsEljND7y8oWi/afuQNYAe4TsA11scAPVonEgn/u0CF6lr+9lOt8OLr8qPv8yMLh4its5PDbWnfFda/AFU038kqjufxXkAU62PAcpU30ZXNZEqsus12ij5oQFgNLaqo8/9gt5jIG2CtGua8PzIy4jueyQBzLKiqqvIdl5oNaICtQEtWfgae59VmOH8gm3ZsmxB5A/KmAzzPq81kiQR50wGuyHkdkOmat80iO2qMQ4NB4tKAXE/Uo7G0CSuMC4M24kfeAOurK9MIgZF90GYwGiAYu8ZyvEHL8QDQAEJIxPkNC30zZ6EKVDAAAAAASUVORK5CYII=",
  ef =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3ZJREFUeJztnLtrFFEUh78YsbGQaCpR4lgkjfjCQgvJJhFfhRpNIwENCBYWAf0L0lkKGiyEYFCDhZEEC1GIyUYFm6jEylhkEwwimieYFCqOxe7sZpadNbs79x7hnq9J7p2Ze36c89s7dx67oCiKoiiKoiiKoiiKoiiKoiiKoiiKC1TZDuiP3/FDAvZctq5hNeskg/8PGMv+VO8Zv9j2un0nAZh+/7Tg9h0dg1acoQ6Ie8Cg8kGFyyXfGaYcoQ6Ia6C4Kh9F4Ii4naAOqHQA05XPsrkBgOkXN4D4nOC8A9aXe2C28i1X0x3zE/Eosow6QFrAmsk4LHDcVC8+VD4XqANKPcDaZz8z65ueW9QBYpEjKjz7aRSA2oPp7cNPegFoPtVRcP9KUQeUfaShz+aHjykAmuvT4zefOGokToA6QCxyhIOCii9sbwv113zuB+K/KlQHSAvIzvr1jQAs7OwEoPXSGwAGeg4Bej/AGCU7IKhAsBY3dR9gaf5bqF23a2/mv8FY4zjvAE2AtABpxM8CUQwPnLYSRx0gLSBY++/OtKvzV4CTNwGoOtClT4ZMULYDSl0P5K/48qluuRVqm658gPMOiP3ZYBSp20OhtnflCABnr48D8LbvYliY4coHqANsBfr+qN2H3BwQXN11dk8CsHHLJgAePn9l9Z0h5x0gtg7InTW6AVieWwLg/LHDPthzgvMOsPZ5Cyp7vKm54PbH/QOhtq05QR1gK9C/HJDP2OuXAMz++g2Yc4LzDrB+Fpj9MgNA7dZtRfunv84BubnAFM47QBMgLUAa63PAtQvbgdwToIDg+v/eUPqi8lxbKwDPRoaN6nHeAZoAaQHSaAKkBUijCZAWII0mQFqANNZWghNTM2var+fug1D7B39MyMnivAM0AdICpLF+NdjYfh+A0b7C/bZRB0gFlqp4Ps47QBMgLUAasQQsLq+wuLyy5n5TqAOkBUijCZAWII3zCbD+K077GzwfYOFn8f1qNqT/vptI6RsiJhH7HS9/rCvthIhnhPqmqCU0AdICpNEESAuQRhMgLUAasXWA53nFv2GSMrsCDHDeATbvCicq3D8Zi4o81AEGxkwYGHP1uMk4B1UHxDBGIoYxKomXrGQw5x1g4lybKGVnz/NGCvWnUqmmiEOSJeopijrAQoxEhccnY9AQifMOUBTFbf4CP/TjKKvUCpQAAAAASUVORK5CYII=",
  sf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA99JREFUeJztmrlrFFEcgL8YBTGKZyUJcVMkjXhhoYXkxKtQ41GIGAXBwkLQvyCdpaBgIQTjESwSiViIguZQwSZRtDIW2QQPRKNRNClUHIvdl2SGnU129h3i+31NMrPv+PF+33vz5gBBEARBEARBEARBEARBEARBEARBEATh/6fEdofBi8tBKID1J63HMJN5Ljv/FzA2+iPt+4J8v1du3A3A6PO7OX9fc/y2FTPEAN0NqsyrDCclaoYpI8QAXQ3pynwcygjdJogBxTZgOvNTrKgBYPTheUCfCd4bMD9pxanMN57JnPgypCciy4gBrgOYM1nDlHEj7QRQ/FogBhRawdrcz676ptcWMcBZzzEZHnvdD8CqLZnfe+60A9Cw53jO8sUiBiSuaWhuvnyVBqChOtN+w67tRvpRiAHOeo4xSGV8vOJg6PzyN12A/rtCMcB1AFOrfnUtAONVpwFoPvEUgO62rYA8DzBGwQaoDKi9uKnnAN++fAwdV67dkP3vttZ+vDdABsB1AK5xfhWIo6d7r5V+xADXAai9/7rscWl0Bzh8AYCSza3yZsgEiQ0odD8Q3fFFKW28GDo2nXmF9wZofzcYR/rSg9Bx6lQTAPvPvQBgsONYODDDmVeIAbY6+tR5JIDpNUDd3SkDataUA3Dz/mOr3wx5b4CzfYC6apQvGQZg4vM3AA7v2BaAPRO8N8DafFOZ3VnfkLfcra5uAMpWLgXMmyAG2OporgYoBp48AmDs12/AnAneG2D9KjD2/i0Aq1aX5z0/+uEzML0WmMJ7A2QAXAfgGutrwNmWCmD6DZBC3f9fe5C5qTxwsBmAe709RuPx3gAZANcBuMb6GqDmeEtTZs6rtUD9VedVOdN4b4AMgOsAXCMD4DoA11i7CgyNZO723l25AUBL09G85duy5X7wx2hcYoCrjmuPXAegvyP3eVt4b4DxZ4KbalIBwOKEY63WgGdDaXkmaALnX4jMhjJHmaTbBDHAVMNJ5/7XiUkAlpUt0h9UDrw3wPgAfJ2YnMrqXM7bRgxwHYBrvB+Af24f8H3Bwszfn+G7wHRadoJGsHYvMP5zbuUHBwdznjf15aj3BhhfA9QXoNF3gYpoZpcPXwjyldeNGOCq46RzOhhoDZLUi0MMMNVwKpVKNJdVZoMBQvWrDl3VG2AW7w0wtg9QBkQZ7sxcFUo2t9bPUr833++6dobeG6B9DYjLvELXXI72k9QIMUBDG3WFFE6n03nnfqEUuxZ4b4DOq0DdzIO4VbxQA6LtzKjfV0g7cYgBBtqsm3mQJ4NJ6SuyfggxwGDbdZrb69PcHiAGCILgOX8B21ouAqxd58wAAAAASUVORK5CYII=",
  nf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3ZJREFUeJztnLtrFFEUh78YsbGQaCpR4lgkjfjCQgvJJhFfhRpNIwENCBYWAf0L0lkKGiyEYFCDhZEEC1GIyUYFm6jEylhkEwwimieYFCqOxe7sZpadNbs79x7hnq9J7p2Ze36c89s7dx67oCiKoiiKoiiKoiiKoiiKoiiKoiiKC1TZDuiP3/FDAvZctq5hNeskg/8PGMv+VO8Zv9j2un0nAZh+/7Tg9h0dg1acoQ6Ie8Cg8kGFyyXfGaYcoQ6Ia6C4Kh9F4Ii4naAOqHQA05XPsrkBgOkXN4D4nOC8A9aXe2C28i1X0x3zE/Eosow6QFrAmsk4LHDcVC8+VD4XqANKPcDaZz8z65ueW9QBYpEjKjz7aRSA2oPp7cNPegFoPtVRcP9KUQeUfaShz+aHjykAmuvT4zefOGokToA6QCxyhIOCii9sbwv113zuB+K/KlQHSAvIzvr1jQAs7OwEoPXSGwAGeg4Bej/AGCU7IKhAsBY3dR9gaf5bqF23a2/mv8FY4zjvAE2AtABpxM8CUQwPnLYSRx0gLSBY++/OtKvzV4CTNwGoOtClT4ZMULYDSl0P5K/48qluuRVqm658gPMOiP3ZYBSp20OhtnflCABnr48D8LbvYliY4coHqANsBfr+qN2H3BwQXN11dk8CsHHLJgAePn9l9Z0h5x0gtg7InTW6AVieWwLg/LHDPthzgvMOsPZ5Cyp7vKm54PbH/QOhtq05QR1gK9C/HJDP2OuXAMz++g2Yc4LzDrB+Fpj9MgNA7dZtRfunv84BubnAFM47QBMgLUAa63PAtQvbgdwToIDg+v/eUPqi8lxbKwDPRoaN6nHeAZoAaQHSaAKkBUijCZAWII0mQFqANNZWghNTM2var+fug1D7B39MyMnivAM0AdICpLF+NdjYfh+A0b7C/bZRB0gFlqp4Ps47QBMgLUAasQQsLq+wuLyy5n5TqAOkBUijCZAWII3zCbD+K077GzwfYOFn8f1qNqT/vptI6RsiJhH7HS9/rCvthIhnhPqmqCU0AdICpNEESAuQRhMgLUAasXWA53nFv2GSMrsCDHDeATbvCicq3D8Zi4o81AEGxkwYGHP1uMk4B1UHxDBGIoYxKomXrGQw5x1g4lybKGVnz/NGCvWnUqmmiEOSJeopijrAQoxEhccnY9AQifMOUBTFbf4CP/TjKKvUCpQAAAAASUVORK5CYII=",
  rf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA79JREFUeJztmrlrFGEYhx8vEA88K4mYtTCNeMVCC8maiFehRm1EUEGwsBD0L0gjloKChSAERS1UIhaiEOMJNokSK7XIGhQRTTzQWERxLHa/JDNms5vd7wjO72mSmd35vpd5n3m/YxaEEEIIIYQQQgghhBBCCCGEEEL8/0zy3WHUfT6KBbDyiPcYRjI5ZOcTAWd3/03rrmisz5es3g5A7/Pbo35ee+imFzNkgO0GTeZNhislaYYrI2SArYZsZb4YxgjbJsiAahtwnfkh5tcB0HvvNGDPhNQbMLXSC4cy33Q8f+LzKzsReUYGhA6gbAqGGePetBJB9bVABoz3Am/PfqHqu64tMiBYz0Uy3Pf6IQAL1+U/77jVCkDjjkOjfr9aZEDFVzp6Nl+8zAHQuCzffuO2zU76MciAYD0XMchk/MvivbHz895eB+yvCmVA6ACGqv6yBgC+LD0GQPPhpwC0XVgPaD/AGeM2wGTAzMVd7QN8+/wxdrxk+arCfzet9pN6A3QDQgcQmuCjQDE62nZ66UcGhA7AzP1XFI6nJGeAPWcAmLS2RW+GXFCxAeOdDyRnfEmmNJ2NHbvOvCH1Blh/N1iM3Ln22HHm6CYAdp/qBqDr8sF4YI4zb5ABvjr6dG1/BMM1wKzujAF1tTUAXL372OtvhlJvQLB5gBk1amb3ADDQ/w2AfVs2RODPhNQb4O15M5ndurFxzO/duN4GwMwFcwD3JsgAXx2Va4Ch88kjAPp+/QbcmZB6A7yPAn3v3wGwcFHNmOd7P/QDw7XAFak3QDcgdACh8V4DThxYDAy/ATKY9f/F9vyics/eZgDu3O9wGo8M8NXRlZNNwL+ZD40MCB1A8tn3TeoN0A0IHUBonNeAqLMlgolX/Q0yIFTHpvo37L805vd+8MdpHDLAdQfmDU/USWygL5V5X6TeAOd7gmvqMhHArArvtakBz17ltCfoguBrgVIYc4xJtk2QAa4arvTZ/zrwE4C5M2fYD2oUUm+A8xvwdeDnUFbLOe8bGRA6gNCk/gZMmHnA28HCqm/adAC+D8ZXgbmcZoJOcL4WyGQyZW339lzL/06w2Bsj/VbYEc5rwDgyO6op5jqzn2DbBBkQOgBDcufI1y5y6g1wNgokq39XVxdQuqoXe49QX18fO7Y1L5ABthssd9zP5XIbS7Rzv8T1MsAG3keBUpn3jQyw0EZ25IHJcKlnuFqStabSmiADLLTxoPA3O/KkLxOqHQ1Sb4CLmWDWZmNJg2zvDMkAh21nLbf3wHJ7gAwQQqScv3otLsUjd/R7AAAAAElFTkSuQmCC",
  of =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA5RJREFUeJztnE9IVFEUxj9DIrRIjQGjRb42LqWoTRCOFRRBUVaLMqMIXCZtgqCFu6BN1FKIhLKg/xAELaKRIIiscOmm0UUYRGmYQ0T0Wox3nPeaGefNPXeOcL/fRt7z3u8ezvnuu5d3HwMQQgghhBBCCCGEEEIIIcQXGrQGDieGw0ggXQMqsazSGHQlUbesT40cjlR889YDAIDpj89Ltu8487QusdEBroTLVbxa4s5w5Qg6QFrQVD5pxZfDOELaCXSAlJCryseRdgIdYCtQqPyeC/kb3ydtJSvT1gkAmH55DYC9E+iAWjvWvfJxhJzgvQPcJaCts1Alq3bV6tSI9w5oTNpBfe4bFsc1cUyNIASSPwvoAGfKyznDzOvl2jl2GB1Qc0/bykhV1lLHewcwAdoBaMMEaAegDROgHYA2TIB2ANowAdoBaMMEaAegjXoCcjMTyM1MqI2vngBt7M8FajwLNFXPzc8BAJrWteT/buxKpGN7VkgH2Ap8fdAXAksVLNz/8rliv94rpef940ulHZBq3xS5Ns5JHR/l2aANYm+F43O3dzA/N/8s/CrZvqM9VfL+octvI9eNzWsAAO/vR581ufmxmuKM470DxL4QMV9+nrx4GwCw8O0HAKB75w4AwNibd4n04v2aN6wHANy92g9A7stS7x0g9gwwld/fsxsA8OjhEynpiK4ZRwo6wJXw0WNHACw5wczpajFz3+i4gg6wFTixb1cILM3RciRdBcpRNE4IAPdevOZO0AZ33wcs4noO2+K9A+R2guNDIQDMbjkPAHg2fF1KGgBwcGAQAND66QYAoGH7EHeCEjAB2gFoY70KxOe+a8w44Xh+H2D7LKADpAXNU9qVrrTT6ABXwjdv3QEAnDt7SkTn9N5+65hKQQe4HsBUcKXivQOYAO0AtGECtAPQRmwVMDu17j7Z9/YGozs2KqvrvQPE3ght6wxCAFi7mNO5hRwAoKW5KdLO9v5P/AUAfJjM8o2QBEyAdgDaMAHaAWgj/isy8dUgTtJVwCD99DfQAa6EgyAIK/2/dXX0evZ3Zb1sVrbyBjrAlXC584JyZ3tJ20vhvQOYAO0AtGECtAPQhgnQDkAbtZ1gfGeXtL0U3jvA+dlgBdKKYxegAxxoph1oFutmJEXpAAGNtICGzXgZGzHvHeBibU0XXwRB8Kr4OpvN9lTqXEX7jEVs/0EH1GGMtGX/jEAMZfHeAYQQv/kHS0IIxp1y8+wAAAAASUVORK5CYII=",
  af =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA75JREFUeJztnE1IVFEYhl9DIrRAJcF+QMeNS+lvE0RjLooWUalBFKgELYN2CS3chIsWUcsg1OgHsqxVJFSOBEFkhUs3jkJlkOSgOUREt8WdM3Yv987PPefMJ9z32dyZ4z3v+fi+95z7cwYBQgghhBBCCCGEEEIIIYQQEg+qpAZ2Zm47nkDaL4rEskli0I1ExbI+P3LSU/HmPccBAAufngee39L3rCKx0QG2hMMqXip+Z9hyBB1gWlBVvtyKF0M5wrQT6ABTQrYq78e0E+gAXYF85Tsvuw0/ZnUlC9PQBgBYeHUDgL4T6ICoHSteeT+GnBB7B9hLQENbvkpa55WqE5HYO6C63A7ic1+RG1fFMT8CByh/LaADrCkXc4aa18XOs+wwOiByT93KmKqspk7sHcAESAcgDRMgHYA0TIB0ANIwAdIBSMMESAcgDRMgHYA04gnILs4guzgjNr54AqTR3xeIuBeoqp5dzQAAarbVuccd7WXp6O4V0gG6At/HzjnAegXz7d++FOx3eih43o8PBDugsWmX57tyTmPPfe4N6mDsrbCau/vODHna/6z9Cjy/pakxsP3E1Xee79W1W3KfXMd8eDQAAMiuTkUN1UPsHWDsFyJnjx5yAOBYxxFP+5PHTwEAhw8eAABMvX1fkp7//K7uUwCAF5OvAQAPJ97wFyImYAKkA5DG3t5gDjV3/WtBMfxzX/HfGuMA+msBHaArELb6K5a+fvZ8L/UqEKazfefuSP3DoANsD6Aq1tWtV7n+wesAgPq5WwCA3iu8DzCCtgPUKvzgWqcDAMutlwCsV+ruSyes64Yg9g5gAqQDkEZ7DXCmBz1z3xZqTVHjONPunWDV/kHeCepg/D7A9uq/srLijmNIjw6wJXxn+B4A4EL/+Uj9/Nwc/gsAGJ/o04rLDx1gSkjNfT9hFY1K89KIUb3YO8DYW+G9bQkHALZazulPuGvBx9k0nwZNwARIByANEyAdgDTWEpBZyyKzli25XQo6QDoAhZRjNkwCpLC+L2AK03eAitg7wPh/kSn2TKDmc11tDYD1yi7/LqybTputvIIOsCWcSCQKvhSs3+we1ZwOe7us3jPovv0NI/YOsHYVmBvrBVD5ipZL7B3ABEgHII21NaC1ZzT3abTgedLQAYJjJwXHzkMHWNBMRulUwpqhdFNR9MOgAwxoJIMa0+l0BwAkEonJoHaD46V0xOgAAxqp3DEZ9EcDFS82rhZ0gEGtVO6YNKhZaBwjxN4BNp/Jk1E6FbhqpDTjCST2DiCExJt/zMwgR/NOqCUAAAAASUVORK5CYII=",
  Af =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA5RJREFUeJztnE9IVFEUxj9DIrRIjQGjRb42LqWoTRCOFRRBUVaLMqMIXCZtgqCFu6BN1FKIhLKg/xAELaKRIIiscOmm0UUYRGmYQ0T0Wox3nPeaGefNPXeOcL/fRt7z3u8ezvnuu5d3HwMQQgghhBBCCCGEEEIIIcQXGrQGDieGw0ggXQMqsazSGHQlUbesT40cjlR889YDAIDpj89Ltu8487QusdEBroTLVbxa4s5w5Qg6QFrQVD5pxZfDOELaCXSAlJCryseRdgIdYCtQqPyeC/kb3ydtJSvT1gkAmH55DYC9E+iAWjvWvfJxhJzgvQPcJaCts1Alq3bV6tSI9w5oTNpBfe4bFsc1cUyNIASSPwvoAGfKyznDzOvl2jl2GB1Qc0/bykhV1lLHewcwAdoBaMMEaAegDROgHYA2TIB2ANowAdoBaMMEaAegjXoCcjMTyM1MqI2vngBt7M8FajwLNFXPzc8BAJrWteT/buxKpGN7VkgH2Ap8fdAXAksVLNz/8rliv94rpef940ulHZBq3xS5Ns5JHR/l2aANYm+F43O3dzA/N/8s/CrZvqM9VfL+octvI9eNzWsAAO/vR581ufmxmuKM470DxL4QMV9+nrx4GwCw8O0HAKB75w4AwNibd4n04v2aN6wHANy92g9A7stS7x0g9gwwld/fsxsA8OjhEynpiK4ZRwo6wJXw0WNHACw5wczpajFz3+i4gg6wFTixb1cILM3RciRdBcpRNE4IAPdevOZO0AZ33wcs4noO2+K9A+R2guNDIQDMbjkPAHg2fF1KGgBwcGAQAND66QYAoGH7EHeCEjAB2gFoY70KxOe+a8w44Xh+H2D7LKADpAXNU9qVrrTT6ABXwjdv3QEAnDt7SkTn9N5+65hKQQe4HsBUcKXivQOYAO0AtGECtAPQRmwVMDu17j7Z9/YGozs2KqvrvQPE3ght6wxCAFi7mNO5hRwAoKW5KdLO9v5P/AUAfJjM8o2QBEyAdgDaMAHaAWgj/isy8dUgTtJVwCD99DfQAa6EgyAIK/2/dXX0evZ3Zb1sVrbyBjrAlXC584JyZ3tJ20vhvQOYAO0AtGECtAPQhgnQDkAbtZ1gfGeXtL0U3jvA+dlgBdKKYxegAxxoph1oFutmJEXpAAGNtICGzXgZGzHvHeBibU0XXwRB8Kr4OpvN9lTqXEX7jEVs/0EH1GGMtGX/jEAMZfHeAYQQv/kHS0IIxp1y8+wAAAAASUVORK5CYII=",
  hf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA8BJREFUeJztnE1IVFEYhl9DIrRAJcF+QMeNSylrE0TXEopW/RmEZUXQMmiXO3cuo5ZCpFEE/UMQBZUjQZuscOmmUagMkhTNISK6Le6cqbncmbkz5zt+xn2fzXXunPuej+97zzn3zwEIIYQQQgghhBBCCCGEEEJIMqjR6tifHPYLAuk8rxLLGo1OVxMrlvXpkUMFFW/ddhAAMPP+SWT7tjOPViQ2OsCVcLGKxyXsDFeOoAOkBU3lK614OYwjpJ1AB0gJuap8GGkn0AG2AvnK77sY7Pg2ZStZmqYOAMDMi8sA7J1AB1R74IpXPoyQExLvAHcJaOrIV8mqXVydKkm8A2orPUB97Bty/Zo4pkfgA5XPBXSAM+VyzjDjulw7xw6jA6o+0rYyUpW11Em8A5gA7QC0YQK0A9CGCdAOQBsmQDsAbZgA7QC0YQK0A9BGPQHZ2UlkZyfV+ldPgDb2zwWqfBZoqp5dWgAA1G1oCLabOivSsX1WSAfYCny92+cDfyuY3//lU8njjgxFj/sHA9EOaG7ZUvDZOKe59xafDdogdlfYjN2u40OR3/9a/lHwua2lObKdcYZpX1u/LvdNsP/tnQEAQHZp3CpeQ+IdIPaGyIn9u30AONC9FwBw/95DAMCeXTsBAOOv38TSCbc/euxwwfdPx14CAG4/e8U3RCRgArQD0MZ6FQiPfYMZu+G5oBzFxr4r6ABpwbnPHwEAGzdvLdgfdxUop/OP03zAfjVIvAPEzgP8iUEfAObbLwAAHg9fkZKOROp8IPEOcPeGiBD9PUGBjbMaP1wFAJy+xDNBEZgA7QC0sZ4DwrO/GaOuMP34E8F5QM2OQa4CNoitAouLiwCARinBHDeeB/981t8TOMs4QAo6QFqwq28UALC+SG7PnT1Zkd616zcBAP09p+wCKwIdICXUOjcSq52paLVIrzKJd4DY1eD2jpQPFB/7UnzHbwDAu6kMrwUkYAK0A9CGCdAOQJtVk4CF5SwWlrOx90uxahKghbMEaFW0UhLvALFrAXNmZs4I/xcS7wBnvyOUSpV2QuPaYGuuHcy80FBfF9le+hrAQAe4Eg7fLTaY63lzN9fMGfM/S+tlMrKVNyTeAerPBs2YjuEYJ/0n3gFMgHYA2qjPAYb23tHcX6Ml20lDByj27Sn2nYcOcKDpAU7GtJfbpqUEATpAxAGegAYymUw3AKRSqbGo/SX6S9v0SwcIaKRzW09AK6ri5fq1gg4Q1Erntp6gZql+REi8A1z+grsHxJrV45K2jCeSxDuAEJJs/gDT2yVR6fuSuwAAAABJRU5ErkJggg==",
  lf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAThJREFUeJzt2bFNQzEQBuCA2IEx6GjSeQAGoLPEAJSMQMkASO4YgAFeR0PHCK9kitBiExKFhGdL933d6VnKKfp1vuStVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAEs56N3ConPPme11K6dXKVimlqp6maejv+Lx3A/QlAMEJQHAXvRvYp73zL6/WzYm+O0B757cenp6r/h/v74baCUyA4AQgOAEIbvgdYJ7nqv65Ayxry+/8nc9HZwIEJwDBCUBww+8A1ze3XT//2Dv//fXl5D2dkgkQnAAEJwDBDb8DfH68VfV//w9w6J3fPs85V3Xbb3u+NxMgOAEITgCCG34HKKVU789Tmje/nf2LY+/8fUZ7/98yAYITgOAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAV+ppzVvF4pFYQAAAABJRU5ErkJggg==",
  cf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAQ9JREFUeJzt2DFKA0EUh/FPEZtt7G09ha2nsNPYWGmlBKwDgRzANIkp0wRPIHgKK0+w/dSxMKuJBEwC7xHY79csO8zsG/b9d4sBSZIkSZIkSVJ7HGQVGvT7823mP3S7KXs7zCiyz46iCzSdv+l0tl06h/gkmICoB//tfF3XADxenq+df3pyDMD98zvL6whOggnIKvRf53svt4uR6eJ6F78pTEBeAhqT1+/OPl0PgeXOszo+MwEp0hIwefsE4OribGW86XijN/vI2hJgAuITUEoBoKoq4DcJm86P1voEpL+AUspPl9fdZ2t9AsL/AVnf8q5an4DwU5ddzwNG4zHgeUA4zwQzikiSJEmSJEnSvvgC7/VIaGzKaPUAAAAASUVORK5CYII=",
  uf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAANdJREFUeJzt2EEKglAQxvGvaCPvENHV7AyBRxA6Q14t3LofXNqqCIlMaUbh/X874T1H3ny+xUgAAAAAAAAAgHzsogpd63qYs/5SVSHfto8osmUH7wLPzp/Lcu7WQfJPAgnwevG4813XSZKs77/uS0Wh931yTgIJiCo01fm56/4l+wRwAGt/wNrC7oDT8ShJurftT+uikADvAmYmSUopSZru8Hi9t+wTEH4AZvbq8qfnaNknwP0OiPqXl8o+Ae5Tl6XzgFvTSGIe4I6ZYEQRAAAAAAAAANiKBxVQPYjqxIkDAAAAAElFTkSuQmCC",
  df =
    "data:image/png;base64,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",
  ff =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAXFJREFUeJztmT1Ow0AQhR+I2jeh8GEQ1ERJSYfIEUB0lCC4EAgX3MQXMNVIyVrL/htF/r4ujmbH8rx9M2tLAAAAAACwRs7++waM56fH6a//7x/2Te71vMWip8TFUolCFb66vpEkdV13dP397bXdTQkFlCsgVFljs92VpmrC6hUQ7ay+Steq7DAMR7/7vpc094Da3WD1Ckj2AF/Fa7v199enpHnFXSWWKgIFlC5glc/1glD8ZrsLdZlJylcCCqi9oOvmPszlU+N9cbmggNSAcRwlzWd2o3aFXEwhlocuUEi0Ag6e9CT5Xds30fmul2JzAV0gk+pdwFfZ1t6QCwponcDX10NKiZ0nSkEBrRPk7v2lPAMF5AbaRHjqoIDUAHcidKl1Ggx1g1oegQJqL1haGTe+dTdAAbmB5gXuW9rQnnX3uI/QqRIPqMTiHhBbuaVOlatXQPF3ttivw8bH5Z0k6fbnpTS1JN4JAgAAAAAAAAAk8wvKlHo4gq5J8QAAAABJRU5ErkJggg==",
  gf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAaNJREFUeJztmrFKxEAQhn/FOm9ikQcQrPQJbKxE0VILObxH8FAQLD3OUpSrfAYbQTGFDyKksjubDFyGW5NsZhKO/F+3m93/lpt/ZndDAEIIIYQQQgghw2PDS/hmcr1Ybr/NnwAAOweHJvqjq7HJ2jctRNaZLWtBifzJ6RkA4Ghvt/Rc+g1YAO2dQAd4CevIX0zuAABZlq0cn6ZpqS3jpF+3raADrIQk96XaCxL5tlhHXqADmk7Q+7vm9fIXAPCz/w4gnPNNYQ1wIroGhPbz22nxPFa4wCvnNXSAlVBsrocirXOeu4AT0Q7I8xwAkCTJv+NiI8ca0BGNHbB0+yrd+iRiX58fAIDZ9MFife7QAV7Chvf+lVg5jA7w/oGqe33ojF817nH7vBg5brU+OqDvBdRFO+T4+x4AMGqpSwfETgydB6qIPeHxfYATndeArm55dRm8A/gH9L2AvnGvATrH6+Z87Lym0AHWgnIe4PuANcHsCxH9XUAs8q5x/vJc6rf6IkQzeAd0dhIMRTaEV8Q1dIC1YFX17yqydRm8AwghhBBCyFD5A0SDflyuiwrlAAAAAElFTkSuQmCC",
  pf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAZNJREFUeJztmk1KxEAQhZ/iOpfISmZcRBQRzyG6F72B6BEUb6B4lCxFRDELEVe5RBYibuKqcNLkt1OVCfT7dulJv26ol0plqgFCCCGEEBImG1MtdHd7Uw65//LqepK9bU6xyJzZ0hZsivTu3n7rvDiO3aESsHcCHeA7UTHSraRpWgLA+9trZVzLGXTAWIHlclG5/v35br3/6/Ojdnx7sVM7LpE/Pjl1f1LJEXTAWIGDwyONfeDl+QnAvxMklwzNGUOhA9a9gSYk8lEUAQCKojBZhw7QEsqyzGtekiRe81beCqPeBnSAlpBvJNcNHaAl1JUDfB0iulb1AB2gJWSVA1gJGmOWA8QRVrlBGFsP0AFaQk2RnHt9QAdoCfX9FvB1RJ7nAPTfCnSAlpD1s85K0AjzOmAqfOsBOkBLSCviku1dPf4naIS3A1aesdoeodsx6qJvf0Ec4vYKa/bVi+AdoN57l67x2fmFqu7jw33lmt1hJWbbGWpC+8RI8A4wO38z9FRYF1ZnhYJ3ACGEEEIIIYSQEPkDy39r4kThMLcAAAAASUVORK5CYII=",
  mf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAADACAYAAAC02WUGAAAAAXNSR0IArs4c6QAAAkRJREFUeJztmkFOwkAUQKeGjWEhiXGFW4/hwjv0KByDo/QOHsIDuAF3BlwQE0OCqxqjDBZs55XOeysCQ3k8fhqYEoKIiIiIiIiIiIiIiIiIiIiIiAyZor4xK6c7UiQ182pZhBDCBS1CU9Sf/P3dzUkHWG+2e++fjEedPO/U5/9c//SyCiE4AQYwAC1AYwBagMYAtACNAWgBGgPQAjQGoAVoDEAL0BiAFqAxAC1AYwBagMYAtABN9gGaXYZJQNMrQm2T/QQYgBagMQAtQGMAWoDGALQAjQFoAZreBFhvttF/fnVJbwJQGIAWoDEALUBjAFqAxgC0AI27wsir9ggD0AI0BqAFaAxAC9AYgBagMQAtQGMAWoDmbANMxqOjfkHG1p9tgLYwAC1AYwBagMYAtACNAWgBmuSb8cS/QA6R/QT8O8Cx38n7RvYTgH90bU9PfY5petzsJ8AAtACNAWgBGgPQAjQGoAVoDEAL0BiAFqAxAC1AYwBagMYAtACNAWgBmq+t0+fFR6sHXq2aHa/puq5eP/sJMAAtQBO9fDK+vkrp0Tmb17e992c/AQagBWgMQAvQGIAWoDEALUBjAFqAxgC0AI0BaAEaA9ACNAagBWiie4KxPbShkf0EGIAWoPG6QGKP3mEAWoDGALQAjQFoARoD0AI0BqAFaAxAC9AYgBagMQAtQOOuMC1AYwBagCZ6Dli8D+sccHu5f5fbCfhrwbxaPqQQ6YpZOX089Hj2E1DUN2bldPf9gXm1LH4vP19i7y/7CfgE0khI08VUE90AAAAASUVORK5CYII=",
  yf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAANJJREFUeJzt2EEKwkAMQNEo7iwUN/Yecz2hi4LXmyu4rhvpCXTjIGhABxOizH/LmZCGJJRSEQAAAAAAAAAA0IqVV+LjOF6188M0qc+sjbey9kz+D8y7WyaZUlLvc84i8phsbbw1NsAq0btJPiuTrY233oTmN4AGRBcQjQZEFxBtY53wsiyu8daa3wC3L8H9MKj353kWkdcvwU/jrTW/AebvgGLbdfrFfaLfxlthA7wS7/pePT8ZxVtpfgNoQHQB0WhAdAHR+CvsmRwAAAAAAOAX3QBj30HaPfQn0AAAAABJRU5ErkJggg==",
  Cf =
    "data:image/png;base64,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",
  xf =
    "data:image/png;base64,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",
  wf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAAqZJREFUeJztnLtuE1EURTeILkXslEDjoFAZJAwtkXko4gOAnyFl+BGXST4ARTz8AWAkcAtuAAFF7LRuoMkRnrHNPO4LMWt1d+zZ9+ie5Rl7ZhIJAAAAAAAAAAAAAAAAAAAAAAAA/l8upJr4+Ojw1+L48ZOnSWq5mGLSf4noq26d//L1W2b71SuXJcU3AQNcA/Kf5bKsM6AqrsY03oBLdXe0zt9/8LDW/oPBIDOum2N11DUBA3wFjcfjqPt3u12n+QwM8BW0sbFR6n2Tz58kLR/1f/74LknqbF/zVVIpMCD0BNZxo+ho//rVy8w4tBEYECrYOl/1/J5/vxkRygQM8BXU6XQk/elY3W92eSzHd66BAb6CQnXICGUCBrgGhO58nrwJrjTeABYgdQGpYQFSF5AaFiB1AalhAVIXkBoWIHUBqXH+LdC7fUdSvN8ENo/NO3r31ikPA3wFhTYh33lfYECo4NlsFiraKxhQd0e7H2/357s3bmZeb7VaToWtYz6fS5LGHz9k6qhL4w3w9kRW0RMjk8mkUp7dZ8hjZwNfT5NhgGtA2c63Nzcr5U7PziSFN6HxBoS7O1zQ+Wf7+5nx84ODzNj2s5x1JriCAbEnfHFyIkm6u7u7cvujvb2o9WBA7Amv7+zEnvKvYEDsCbcDHc3rggGhgu28HeqboC8wwFfQ7PRUktTa2spsr2pCUedtHl803gDv1wN6t3qSlk0wiq4LFHV+9H4kiesB3vD5N3p9STo+OnwjFZtQlhWdv3f+0tAp+BwM8JjVXxzkTTCKjMgf5Vd03hjWqHGJxhsQ/LfAdDqVJLXbbUnlz+O2X2gabwALkLqA1ES7HhDrM12VxhsQ4r819BcH9n2gLqHO/wYGBMzue84bes6ThAEAAAAAAAAAANA4fgN6edRhQ7J9hgAAAABJRU5ErkJggg==",
  bf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAAnxJREFUeJztnE1Kw1AYRT//QClOpNQOHOgOHCgOlS5HcAGuQ3AfbqDgsOgedOCoOO1IRQf6FRP6mpcm6Xkh90wkbfpyuO8maZtUMyGEEEJ0lQ1aIMTD7en3OrazuY6NpExyDfCZPzzYNzOzne2tWsf/+PzKLHe+Adu0wLrwmc83Sg2gBZomNPOOGkALNEXRzDtqAC1QN7Ez76gBtMA/roiNqgG0QF2U3fcdNYAWoPDGqAG0QIjYfbnsvp9fv/MNUAC0AE2yx4Aiqu77jhpACzSNvhEqoHUNWPU9fwg1gBZoCn0nGIkCoAVoFAAtQNOas0DsUV3XBUqiAGgBGgVAC9C05ixQhK4MrUjyDaj783+ezjdAAdACNMkfA5pCV4f/aH0Dqp4l1ABaoCpvxzeZ5ZO3+6Xr6/6AHMk2oGjffjm6NjOz3u7ewseLmuCoAbRALD6zVdc/er3LLKsBtEARPpOjy6uFz4/H48zyaDRaOp6v7ccINYAWCOHn99DMO4N+38zMpu/vUeP6eOPH32U1gBaoSuzMh1ADaIGyTKfTzHL+GJB/fr7eYLDwcTWAFoglNLNlX59vghpAC1RlMBxm/pal8w1QALQAjQKgBWhadxbo9XorvW42my18vPMNUAC0AI0CoAVoFAAtQKMAaAEaBUAL0CgAWoBGAdACNAqAFqBRALQAjQKgBWgUAC1AowBoARoFQAvQKABagKY1V4f97q5V7xbTfYIBkm+AX9f3+wJCM1l2PEcNoAViCd3hUZXON0AB0AI0CoAWoFEAtACNAqAFaJJ9J+i/8p7Y7y9IL87Oaxl38vxkZvrt8JxkG+D4TE2s3P8PKBrP6XwDfgDuvY/3RtNEyQAAAABJRU5ErkJggg==",
  Ef =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAF1JREFUWIXtkEEOwDAIw8r+/2d2XqOqhVUq0+w7CXFrAAB/x7KH7u6PILNU1pV9YBfhr/vlEhg08R0Ds+USvGiivoHocimYmKhr4O1yKRqYqGdg93Ip7EwcNwAAADem3BgTZV9CuAAAAABJRU5ErkJggg==",
  vf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAnFJREFUeJzt3DtOxDAYRWEPSosQK6CjQLRUVCyOFc0aqGjZB0IsAKoUE2mUlx379znfAkKSub7MOLFP5/e3vySsm9onoLqG15fnqifw8fmVUkqp9nlQ2QBwBgDOAMAZADgDAGcA4AwAnAGAMwBwQ+0T6MX3z2+R497f3RY57sgGgLMBMik9UkuxAeAMAJwBgBuufXuN+j9Ny4yfuw0AN0QZ6aV+Z09FuR97jddpA8CFmQegjMyj2QBwBgDOAMAZADgDAGcA4AwA3MnVwWw2AJwBgDMAcMPT40PWAzpnv0wr+yLYAHBh3gdQGTYAnAGAMwBwBgDOAMBlfyfwqLd3t/JXzyUbAC57AzjCYrEB4AwAnAGAMwBwBgDOAMAZALgwq4PnRN2nrzYbAK6bPYKine9WuZvOBoDzncBgcn9eNgCcAYAzAHAGAM4AwLk/AJwNAGcA4AwAXLb9AbbOULWyTp5i+izBBoAL9yyg9sqjaPdranr+NgBcuDeCoo/A1tgAcAYAzgDAGQA4AwBnAOAMAFy4eYDW1J6ZHG2dH7EB4FY3wNLEU2bsol+nDQC3ugGiJ16XbAA4AwBnAOAMAJwBgLu6Q8io12/9e2fwotyXueu0AeDCvRWcC+W6567TBoDb/DQw91OwtcejjODSbAA49weAswHgDACcAYAbXJdfRyv7ItgAcAYAzgDAGQA4AwBnAOAMANzutYFHrY3z6V8ZNgDc7gZwZMZmA8AZADgDAOcOIY0rvW7DBoDrrgF6m5co/XdsALjuGsB5iXVsADgDAGcA4AwAnAGAMwBwBgBudo+gkb+v6yo1w2kDwLk/AJwNAPcPQf1gdFJ3IyIAAAAASUVORK5CYII=",
  Bf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABUmlDQ1BJQ0MgUHJvZmlsZQAAGJV1kL1LQmEUxn83DSGDHAobHCQaCizqJjQ0mYMEDWLZ1xBcr6aB2uWqRWsg9Bc0Nbe0RBEuDQ2tTX1RUw1Be+RScjs3LbXowMPz4+HhfQ8HOtAMI+sEcvmiGYtM+5eWV/yuFxx4cBPEq+kFIxSNzkqFb2+f6i2K7Vcj9lv3kTdf8Ol559F7cxw/WTj822+brmSqoIt/iIZ0wyyCMigc3SoaNovoNWUp4V2b03XetzlR56OvznwsLHwh7NEzWlL4WjiQaMnTLZzLlvTGDvb23al8fM52kY8wcVQmGSf0Ty/Y6G1gsI3JOmkyFPETksQgS0p4hjw6owSEVcZEQfu+v+/WzEqXMCX/KZvNbLUGp/3QpzazATf0lOGsbGim9nNNpeosrE2odXZXoHPPsl4XwTUMtTvLeq9YVu0AHA9wXv0E0ExiuttYX9YAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAAAGgAwAEAAAAAQAAAAEAAAAA2uq/xAAAAAtJREFUCB1jYAACAAAFAAGNu5vzAAAAAElFTkSuQmCC",
  Ie = class Ie {
    static getCount() {
      return Object.keys(Ie.imgs).length;
    }
    static async load(t) {
      await Promise.all(
        Object.entries(Ie.imgs).map(async ([e, s]) => {
          const n = await Ai.load(s);
          (Ie.textures[e] = n), t();
        }),
      );
    }
    static texture(t) {
      return Ie.textures[t];
    }
  };
p(Ie, "imgs", {
  tileFloor: vf,
  tileTransparent: Bf,
  partsArrowUp: Ef,
  cutsDesignPaper: fu,
  cutsMouseHole: gu,
  cutsTitle: pu,
  objectWashbasin: bf,
  objectMachineBase1: Fd,
  objectMachineBase2: Td,
  objectCat1: Su,
  objectCat2: Qu,
  objectCatMonitor1: xu,
  objectCatMonitor2: wu,
  objectCatMonitor3: bu,
  objectCatMonitor4: Eu,
  objectCatMonitor5: vu,
  objectCatMonitor6: Bu,
  objectCatMonitor7: Iu,
  objectCatMonitor8: Mu,
  objectHaruComment1: nd,
  objectHaruComment2: rd,
  objectHaruComment3: od,
  objectHaruComment4: ad,
  objectHaruComment5: Ad,
  objectHaruComment6: hd,
  objectHaruComment7: ld,
  objectHaruComment8: cd,
  objectHaruComment9: ud,
  objectHaruComment10: dd,
  objectHaruDown1: fd,
  objectHaruDown2: gd,
  objectHaruDown3: pd,
  objectHaruDown4: md,
  objectHaruLeft1: yd,
  objectHaruLeft2: Cd,
  objectHaruLeft3: xd,
  objectHaruLeft4: wd,
  objectHaruRight1: bd,
  objectHaruRight2: Ed,
  objectHaruRight3: vd,
  objectHaruRight4: Bd,
  objectHaruUp1: Id,
  objectHaruUp2: Md,
  objectHaruUp3: Sd,
  objectHaruUp4: Qd,
  objectMantis1: kd,
  objectMantis2: Gd,
  objectMantis3: Ud,
  objectMantis4: Nd,
  objectMugiComment1: zd,
  objectMugiComment2: Ld,
  objectMugiComment3: Hd,
  objectMugiComment4: Yd,
  objectMugiComment5: Xd,
  objectMugiComment6: Vd,
  objectMugiDown1: _d,
  objectMugiDown2: qd,
  objectMugiDown3: Zd,
  objectMugiDown4: Wd,
  objectMugiLeft1: Kd,
  objectMugiLeft2: Jd,
  objectMugiLeft3: $d,
  objectMugiLeft4: tf,
  objectMugiRight1: ef,
  objectMugiRight2: sf,
  objectMugiRight3: nf,
  objectMugiRight4: rf,
  objectMugiUp1: of,
  objectMugiUp2: af,
  objectMugiUp3: Af,
  objectMugiUp4: hf,
  objectPudding1: cf,
  objectPudding2: uf,
  objectBalanceBall: mu,
  objectBookShelf: yu,
  objectChair: Du,
  objectCarpet: Cu,
  objectCodeBox: Pu,
  objectDoor1: Fu,
  objectDoor2: Tu,
  objectSlippers: yf,
  objectCushion: Ru,
  objectLongWall: Pd,
  objectLowTable: Rd,
  objectMouse1: Od,
  objectMouse2: jd,
  objectHole: Dd,
  objectPortableGame: lf,
  objectRack: df,
  objectScatteredBooks: gf,
  objectScatteredBooks2: ff,
  objectScatteredPapers: pf,
  objectShelf: mf,
  objectTableMonitor1: Cf,
  objectTableMonitor2: xf,
  objectFuyuComment1: ku,
  objectFuyuComment2: Gu,
  objectFuyuComment3: Uu,
  objectFuyuComment4: Nu,
  objectFuyuComment5: Ou,
  objectFuyuComment6: ju,
  objectFuyuComment7: zu,
  objectFuyuDown1: Lu,
  objectFuyuDown2: Hu,
  objectFuyuDown3: Yu,
  objectFuyuDown4: Xu,
  objectFuyuLeft1: Vu,
  objectFuyuLeft2: _u,
  objectFuyuLeft3: qu,
  objectFuyuLeft4: Zu,
  objectFuyuRight1: Wu,
  objectFuyuRight2: Ku,
  objectFuyuRight3: Ju,
  objectFuyuRight4: $u,
  objectFuyuUp1: td,
  objectFuyuUp2: ed,
  objectFuyuUp3: id,
  objectFuyuUp4: sd,
  objectToilet: wf,
}),
  p(Ie, "textures", {});
let f = Ie;
const Ye = class Ye {
  constructor() {
    p(this, "isMugiAddedToAssistant", !1);
    p(this, "isMugiAddedAsSuspect", !1);
    p(this, "isHaruAddedAsSuspect", !1);
    p(this, "isMantisAddedAsSuspect", !1);
    p(this, "isCatAddedAsSuspect", !1);
    p(this, "isCatAskedAboutSituation", !1);
    p(this, "isMouseAddedAsSuspect", !1);
    p(this, "isFindingClue", !1);
    p(this, "isMouseHoleAddedAsClue", !1);
    p(this, "isMantisAddedAsClue", !1);
    p(this, "isFlashlightAcquired", !1);
    p(this, "isDesignPaperAddedAsClue", !1);
    p(this, "isMouseHoleSpaceAddedAsClue", !1);
    p(this, "isCanSolve", !1);
    p(this, "isFamilyInfoRead", !1);
    p(this, "isSolveScene", !1);
    if (Ye.instance) return Ye.instance;
    Ye.instance = this;
  }
  reset() {
    (this.isMugiAddedToAssistant = !1),
      (this.isMugiAddedAsSuspect = !1),
      (this.isHaruAddedAsSuspect = !1),
      (this.isMantisAddedAsSuspect = !1),
      (this.isCatAddedAsSuspect = !1),
      (this.isCatAskedAboutSituation = !1),
      (this.isMouseAddedAsSuspect = !1),
      (this.isMouseHoleAddedAsClue = !1),
      (this.isMantisAddedAsClue = !1),
      (this.isFlashlightAcquired = !1),
      (this.isDesignPaperAddedAsClue = !1),
      (this.isMouseHoleSpaceAddedAsClue = !1),
      (this.isCanSolve = !1),
      (this.isFindingClue = !1),
      (this.isFamilyInfoRead = !1),
      (this.isSolveScene = !1);
  }
};
p(Ye, "instance");
let Vs = Ye;
const R = new Vs();
class xn {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "objects", []);
    p(this, "nextAddedObjects", []);
    this.objects = t;
    for (const e of this.objects) this.subCanvas.addChild(e.subCanvas);
  }
  update(t) {
    for (const e of this.objects)
      e.update(t), (e.subCanvas.zIndex = e.subCanvas.y * 10 + e.layerOffset);
    this.beforeRender();
  }
  beforeRender() {
    for (const t of this.nextAddedObjects)
      this.objects.unshift(t), this.subCanvas.addChild(t.subCanvas);
    this.nextAddedObjects = [];
    for (const t of this.objects)
      t.isDead &&
        ((this.objects = this.objects.filter((e) => e !== t)),
        t.subCanvas.removeFromParent());
  }
  findPlayerExamineEventObject(t) {
    return (
      this.objects.find(
        (e) => !e.isDead && e.isInPosition(t) && e.playerExamineEvent,
      ) ?? null
    );
  }
  add(t) {
    (t.isDead = !1), this.nextAddedObjects.push(t);
  }
  remove(t) {
    t.isDead = !0;
  }
  isCollision(t) {
    return this.objects.some((e) => e.isCollision(t));
  }
  close() {
    this.subCanvas.destroy();
  }
}
class pa {
  constructor(t) {
    this.object = t;
  }
  next(t) {
    return this.object.isDead
      ? t
      : [
          S.WIDTH / 2 - (this.object.subCanvas.x + S.CELL_SIZE / 2),
          S.HEIGHT / 2 - (this.object.subCanvas.y + S.CELL_SIZE / 2),
        ];
  }
}
const If = (i, t) => [i[0] + t[0], i[1] + t[1]],
  Mf = (i, t) => [i[0] - t[0], i[1] - t[1]],
  Sf = (i, t) => i[0] === t[0] && i[1] === t[1],
  Qf = (i, t) => [i[0] * t, i[1] * t],
  V = { sum: If, sub: Mf, eq: Sf, scale: Qf };
class jr {
  constructor(t, e) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", -1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture(e ? "objectDoor2" : "objectDoor1"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class _s {
  update() {}
}
class ma {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "sprite");
    p(this, "layerOffset", 10);
    p(this, "width", q.CELL_SIZE);
    p(this, "height", q.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "isMoving", !1);
    p(this, "setIsMoving", (t) => {
      this.isMoving = t;
    });
    p(this, "_spriteDirection", "down");
    p(this, "_spriteTexturesSet", {
      up: [
        f.texture("objectFuyuUp1"),
        f.texture("objectFuyuUp2"),
        f.texture("objectFuyuUp3"),
        f.texture("objectFuyuUp4"),
      ],
      down: [
        f.texture("objectFuyuDown1"),
        f.texture("objectFuyuDown2"),
        f.texture("objectFuyuDown3"),
        f.texture("objectFuyuDown4"),
      ],
      right: [
        f.texture("objectFuyuRight1"),
        f.texture("objectFuyuRight2"),
        f.texture("objectFuyuRight3"),
        f.texture("objectFuyuRight4"),
      ],
      left: [
        f.texture("objectFuyuLeft1"),
        f.texture("objectFuyuLeft2"),
        f.texture("objectFuyuLeft3"),
        f.texture("objectFuyuLeft4"),
      ],
    });
    p(this, "currPos");
    p(this, "lastPos");
    p(this, "objectController", new _s());
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.sprite = new he(this._spriteTexturesSet[this._spriteDirection])),
      (this.sprite.animationSpeed = 0.5),
      this.setPosition(t),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      (this.currPos = t),
      (this.lastPos = t),
      this.subCanvas.addChild(this.sprite);
  }
  getLastPosition() {
    return this.lastPos;
  }
  getPosition() {
    return [...this.pos];
  }
  setPosition(t) {
    (this.pos = t),
      (this.currPos = t),
      (this.lastPos = t),
      (this.subCanvas.x = t[0] * q.CELL_SIZE),
      (this.subCanvas.y = t[1] * q.CELL_SIZE);
  }
  getDirection() {
    return this._spriteDirection;
  }
  setDirection(t) {
    (this._spriteDirection = t),
      (this.sprite.textures = this._spriteTexturesSet[t]),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height);
  }
  setObjectController(t) {
    this.objectController = t;
  }
  update(t) {
    this.objectController.update(t),
      V.eq(this.pos, this.currPos) ||
        ((this.lastPos = this.currPos), (this.currPos = this.pos));
  }
  close() {
    this.subCanvas.destroy();
  }
  isInPosition(t) {
    return V.eq(this.pos, t);
  }
  isCollision(t) {
    return V.eq(this.pos, t);
  }
}
class lt {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", -2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectLongWall"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class wn {
  constructor() {
    p(this, "id", "100");
    p(this, "isCollidable", !1);
    p(this, "getTexture", () => f.texture("tileFloor"));
  }
}
class bn {
  constructor() {
    p(this, "id", "000");
    p(this, "isCollidable", !0);
    p(this, "getTexture", () => f.texture("tileTransparent"));
  }
}
const zr = { "000": new bn(), 100: new wn() };
class Df {
  constructor() {
    p(this, "map", [
      [
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
      ],
    ]);
    p(this, "container", new _());
    this.map.forEach((t, e) => {
      t.forEach((s, n) => {
        const r = zr[s],
          o = new et(r.getTexture());
        (o.width = q.CELL_SIZE),
          (o.height = q.CELL_SIZE),
          (o.x = n * q.CELL_SIZE),
          (o.y = e * q.CELL_SIZE),
          this.container.addChild(o);
      });
    });
  }
  isCollision(t) {
    const [e, s] = t;
    return 0 <= e && e < this.map[0].length && 0 <= s && s < this.map.length
      ? zr[this.map[s][e]].isCollidable
      : !0;
  }
}
class Oi {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "map", new Df());
    p(this, "objectManager");
    p(this, "player", new ma([0, 1]));
    p(this, "spritePositionUpdater");
    (this.eventManager = t),
      (this.spritePositionUpdater = new pa(this.player)),
      (this.objectManager = new xn([
        this.player,
        new lt([0, 0]),
        new lt([1, 0]),
        new lt([2, 0]),
        new lt([3, 0]),
        new lt([4, 0]),
        new lt([5, 0]),
        new lt([6, 0]),
        new lt([7, 0]),
        new lt([8, 0]),
        new lt([9, 0]),
        new lt([10, 0]),
        new lt([11, 0]),
        new lt([12, 0]),
        new lt([13, 0]),
        new lt([14, 0]),
        new jr([10, 0], !1),
        new jr([13, 0], !0),
      ])),
      this.subCanvas.addChild(this.map.container),
      this.subCanvas.addChild(this.objectManager.subCanvas);
  }
  update(t) {
    this.objectManager.update(t),
      this.subCanvas.position.set(
        ...this.spritePositionUpdater.next([
          this.subCanvas.x,
          this.subCanvas.y,
        ]),
      );
  }
  close() {
    this.subCanvas.destroy();
  }
}
const ya = 0,
  Gt = (i, t) => {
    i.setComponent(t, ya);
  },
  te = (i) => i.inputChannelList[ya][0],
  Pf = "1.2.1",
  Rf = { version: Pf };
function* pe(...i) {
  const t = i.map(() => !1);
  for (;;) {
    const e = yield;
    for (let s = 0; s < i.length; s++) {
      if (t[s]) continue;
      const n = i[s].next(e);
      if (n.done && ((t[s] = !0), t.every((r) => r))) return n.value;
    }
  }
}
const Ca = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] },
  xa = (i, t) => V.sum(i, Ca[t]),
  qs = (i, t) => {
    const e = V.sub(t, i);
    return Math.abs(e[0]) > Math.abs(e[1])
      ? e[0] > 0
        ? "right"
        : "left"
      : e[1] > 0
        ? "down"
        : "up";
  };
function* G(i, t, e) {
  if (i.isMoving) return;
  i.getDirection() !== t && i.setDirection(t);
  const s = Ca[t];
  if (e(xa(i.pos, t))) return;
  i.setIsMoving(!0), (i.pos = V.sum(i.pos, s));
  let n = 0;
  for (;;) {
    const r = V.sum(V.scale(i.pos, q.CELL_SIZE), [
      -i.subCanvas.x,
      -i.subCanvas.y,
    ]);
    if (V.eq(r, [0, 0])) {
      i.setIsMoving(!1);
      return;
    }
    (n += 1),
      n >= 4 &&
        ((n = 0),
        (i.sprite.currentFrame =
          (i.sprite.currentFrame + 1) % i.sprite.totalFrames));
    const o = 4,
      [A, h] = r;
    A > 0 && (i.subCanvas.x += Math.min(o, A)),
      A < 0 && (i.subCanvas.x += Math.max(-4, A)),
      h > 0 && (i.subCanvas.y += Math.min(o, h)),
      h < 0 && (i.subCanvas.y += Math.max(-4, h)),
      yield;
  }
}
const xt = class xt {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "event");
    p(this, "text");
    p(this, "displayText");
    p(
      this,
      "textStyle",
      new Kt({
        fill: "#fff",
        wordWrap: !0,
        wordWrapWidth: xt.containerSize.width - xt.containerPadding.x * 2,
        lineHeight: xt.textHeight,
        fontSize: 16,
        fontFamily: "DotGothic16",
      }),
    );
    (this.subCanvas = new _()),
      (this.subCanvas.x = 0),
      (this.subCanvas.y =
        q.HEIGHT - xt.containerSize.height - xt.containerMargin.y * 2);
    const e = new Xt()
      .roundRect(
        xt.containerMargin.x,
        xt.containerMargin.y,
        xt.containerSize.width,
        xt.containerSize.height,
        4,
      )
      .fill({ color: "black" });
    this.subCanvas.addChild(e),
      (this.text = `${t} `),
      (this.displayText = new gi({
        text: "",
        x: xt.containerMargin.x + xt.containerPadding.x,
        y: xt.containerMargin.y + xt.containerPadding.y,
        style: this.textStyle,
      })),
      this.subCanvas.addChild(this.displayText),
      (this.event = this.createEvent());
  }
  *createEvent() {
    for (; this.text.length > this.displayText.text.length; )
      yield* j(2),
        (() => {
          const t = this.text[this.displayText.text.length];
          if (t) {
            if (
              t === "\\" &&
              this.text[this.displayText.text.length + 1] === "n"
            ) {
              this.displayText.text += `
`;
              return;
            }
            this.displayText.text += t;
          }
        })(),
        gt.play("readWord"),
        yield;
    yield* j(3);
  }
};
p(xt, "textHeight", 26),
  p(xt, "containerPadding", { x: 18, y: 18 }),
  p(xt, "containerMargin", { x: 4, y: 4 }),
  p(xt, "containerSize", {
    width: q.WIDTH - xt.containerMargin.x * 2,
    height: xt.textHeight * 2 + xt.containerPadding.y * 2,
  });
let Ze = xt;
const rt = class rt {
  constructor(t, e) {
    p(this, "subCanvas");
    p(this, "event");
    p(this, "text");
    p(this, "displayText");
    p(
      this,
      "textStyle",
      new Kt({
        fill: "#fff",
        wordWrap: !0,
        wordWrapWidth:
          rt.containerSize.width -
          rt.containerPadding.x * 2 -
          rt.avatarSize -
          rt.containerPadding.x,
        lineHeight: rt.textHeight,
        fontSize: 16,
        fontFamily: "DotGothic16",
      }),
    );
    (this.subCanvas = new _()),
      this.subCanvas.removeChildren(),
      (this.subCanvas.x = 0),
      (this.subCanvas.y =
        q.HEIGHT - rt.containerSize.height - rt.containerMargin.y * 2);
    const s = new Xt()
      .roundRect(
        rt.containerMargin.x,
        rt.containerMargin.y,
        rt.containerSize.width,
        rt.containerSize.height,
        4,
      )
      .fill({ color: "black" });
    this.subCanvas.addChild(s),
      this.subCanvas.addChild(
        new et({
          texture: e,
          width: rt.avatarSize,
          height: rt.avatarSize,
          x: rt.containerMargin.x + rt.containerPadding.x,
          y: rt.containerMargin.y + 8,
        }),
      ),
      (this.text = `${t} `),
      (this.displayText = new gi({
        text: "",
        x:
          rt.containerMargin.x +
          rt.containerPadding.x +
          rt.avatarSize +
          rt.containerPadding.x,
        y: rt.containerMargin.y + rt.containerPadding.y,
        style: this.textStyle,
      })),
      this.subCanvas.addChild(this.displayText),
      (this.event = this.createEvent());
  }
  *createEvent() {
    for (; this.text.length > this.displayText.text.length; )
      yield* j(2),
        (() => {
          const t = this.text[this.displayText.text.length];
          if (t) {
            if (
              t === "\\" &&
              this.text[this.displayText.text.length + 1] === "n"
            ) {
              this.displayText.text += `
`;
              return;
            }
            this.displayText.text += t;
          }
        })(),
        gt.play("readWord"),
        yield;
    yield* j(3);
  }
};
p(rt, "textHeight", 26),
  p(rt, "containerPadding", { x: 8, y: 18 }),
  p(rt, "containerMargin", { x: 4, y: 4 }),
  p(rt, "containerSize", {
    width: q.WIDTH - rt.containerMargin.x * 2,
    height: rt.textHeight * 2 + rt.containerPadding.y * 2,
  }),
  p(rt, "avatarSize", rt.textHeight * 2 + 20);
let ji = rt;
function* P(i, t) {
  const e = new Ze(i);
  t.addChild(e.subCanvas),
    yield* e.event,
    yield* Cn(["ACTION"]),
    t.removeChild(e.subCanvas);
}
function* B(i, t, e) {
  const s = new ji(i, t);
  e.addChild(s.subCanvas),
    yield* s.event,
    yield* Cn(["ACTION"]),
    e.removeChild(s.subCanvas);
}
function* K(i, t) {
  for (const e of i)
    for (const s of e.messages)
      e.avatar ? yield* B(s, e.avatar, t) : yield* P(s, t);
}
function* Ff(i, t) {
  const e = i.position.clone();
  let s = 0;
  for (; s < t; ) s++, (i.position.x = e.x + Math.random() * 10 - 5), yield;
  i.position.x = e.x;
}
function* Tf(i) {
  for (;;) {
    if (i()) return;
    yield;
  }
}
class wa {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "sprite");
    p(this, "layerOffset", 9);
    p(this, "width", q.CELL_SIZE);
    p(this, "height", q.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "isMoving", !1);
    p(this, "setIsMoving", (t) => {
      this.isMoving = t;
    });
    p(this, "_spriteDirection", "down");
    p(this, "_spriteTexturesSet", {
      up: [
        f.texture("objectHaruUp1"),
        f.texture("objectHaruUp2"),
        f.texture("objectHaruUp3"),
        f.texture("objectHaruUp4"),
      ],
      down: [
        f.texture("objectHaruDown1"),
        f.texture("objectHaruDown2"),
        f.texture("objectHaruDown3"),
        f.texture("objectHaruDown4"),
      ],
      right: [
        f.texture("objectHaruRight1"),
        f.texture("objectHaruRight2"),
        f.texture("objectHaruRight3"),
        f.texture("objectHaruRight4"),
      ],
      left: [
        f.texture("objectHaruLeft1"),
        f.texture("objectHaruLeft2"),
        f.texture("objectHaruLeft3"),
        f.texture("objectHaruLeft4"),
      ],
    });
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.sprite = new he(this._spriteTexturesSet[this._spriteDirection])),
      (this.sprite.animationSpeed = 0.5),
      this.setPosition(t),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      this.subCanvas.addChild(this.sprite);
  }
  setPosition(t) {
    (this.pos = t),
      (this.subCanvas.x = t[0] * q.CELL_SIZE),
      (this.subCanvas.y = t[1] * q.CELL_SIZE);
  }
  getDirection() {
    return this._spriteDirection;
  }
  setDirection(t) {
    (this._spriteDirection = t),
      (this.sprite.textures = this._spriteTexturesSet[t]),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
  isInPosition(t) {
    return V.eq(this.pos, t);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
}
const ba = (i) => (t) => i.map.isCollision(t) || i.objectManager.isCollision(t),
  ye = Symbol.for("@ts-pattern/matcher"),
  kf = Symbol.for("@ts-pattern/isVariadic"),
  zi = "@ts-pattern/anonymous-select-key",
  Zs = (i) => !!(i && typeof i == "object"),
  Fi = (i) => i && !!i[ye],
  Ae = (i, t, e) => {
    if (Fi(i)) {
      const s = i[ye](),
        { matched: n, selections: r } = s.match(t);
      return n && r && Object.keys(r).forEach((o) => e(o, r[o])), n;
    }
    if (Zs(i)) {
      if (!Zs(t)) return !1;
      if (Array.isArray(i)) {
        if (!Array.isArray(t)) return !1;
        let s = [],
          n = [],
          r = [];
        for (const o of i.keys()) {
          const A = i[o];
          Fi(A) && A[kf] ? r.push(A) : r.length ? n.push(A) : s.push(A);
        }
        if (r.length) {
          if (r.length > 1)
            throw new Error(
              "Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.",
            );
          if (t.length < s.length + n.length) return !1;
          const o = t.slice(0, s.length),
            A = n.length === 0 ? [] : t.slice(-n.length),
            h = t.slice(s.length, n.length === 0 ? 1 / 0 : -n.length);
          return (
            s.every((l, d) => Ae(l, o[d], e)) &&
            n.every((l, d) => Ae(l, A[d], e)) &&
            (r.length === 0 || Ae(r[0], h, e))
          );
        }
        return i.length === t.length && i.every((o, A) => Ae(o, t[A], e));
      }
      return Reflect.ownKeys(i).every((s) => {
        const n = i[s];
        return (
          (s in t || (Fi((r = n)) && r[ye]().matcherType === "optional")) &&
          Ae(n, t[s], e)
        );
        var r;
      });
    }
    return Object.is(t, i);
  },
  Qe = (i) => {
    var t, e, s;
    return Zs(i)
      ? Fi(i)
        ? (t =
            (e = (s = i[ye]()).getSelectionKeys) == null
              ? void 0
              : e.call(s)) != null
          ? t
          : []
        : Array.isArray(i)
          ? pi(i, Qe)
          : pi(Object.values(i), Qe)
      : [];
  },
  pi = (i, t) => i.reduce((e, s) => e.concat(t(s)), []);
function Vt(i) {
  return Object.assign(i, {
    optional: () => Gf(i),
    and: (t) => pt(i, t),
    or: (t) => Uf(i, t),
    select: (t) => (t === void 0 ? Lr(i) : Lr(t, i)),
  });
}
function Gf(i) {
  return Vt({
    [ye]: () => ({
      match: (t) => {
        let e = {};
        const s = (n, r) => {
          e[n] = r;
        };
        return t === void 0
          ? (Qe(i).forEach((n) => s(n, void 0)), { matched: !0, selections: e })
          : { matched: Ae(i, t, s), selections: e };
      },
      getSelectionKeys: () => Qe(i),
      matcherType: "optional",
    }),
  });
}
function pt(...i) {
  return Vt({
    [ye]: () => ({
      match: (t) => {
        let e = {};
        const s = (n, r) => {
          e[n] = r;
        };
        return { matched: i.every((n) => Ae(n, t, s)), selections: e };
      },
      getSelectionKeys: () => pi(i, Qe),
      matcherType: "and",
    }),
  });
}
function Uf(...i) {
  return Vt({
    [ye]: () => ({
      match: (t) => {
        let e = {};
        const s = (n, r) => {
          e[n] = r;
        };
        return (
          pi(i, Qe).forEach((n) => s(n, void 0)),
          { matched: i.some((n) => Ae(n, t, s)), selections: e }
        );
      },
      getSelectionKeys: () => pi(i, Qe),
      matcherType: "or",
    }),
  });
}
function At(i) {
  return { [ye]: () => ({ match: (t) => ({ matched: !!i(t) }) }) };
}
function Lr(...i) {
  const t = typeof i[0] == "string" ? i[0] : void 0,
    e = i.length === 2 ? i[1] : typeof i[0] == "string" ? void 0 : i[0];
  return Vt({
    [ye]: () => ({
      match: (s) => {
        let n = { [t ?? zi]: s };
        return {
          matched:
            e === void 0 ||
            Ae(e, s, (r, o) => {
              n[r] = o;
            }),
          selections: n,
        };
      },
      getSelectionKeys: () => [t ?? zi].concat(e === void 0 ? [] : Qe(e)),
    }),
  });
}
function re(i) {
  return typeof i == "number";
}
function we(i) {
  return typeof i == "string";
}
function be(i) {
  return typeof i == "bigint";
}
Vt(
  At(function (i) {
    return !0;
  }),
);
const Ee = (i) =>
  Object.assign(Vt(i), {
    startsWith: (t) => {
      return Ee(pt(i, ((e = t), At((s) => we(s) && s.startsWith(e)))));
      var e;
    },
    endsWith: (t) => {
      return Ee(pt(i, ((e = t), At((s) => we(s) && s.endsWith(e)))));
      var e;
    },
    minLength: (t) => Ee(pt(i, ((e) => At((s) => we(s) && s.length >= e))(t))),
    length: (t) => Ee(pt(i, ((e) => At((s) => we(s) && s.length === e))(t))),
    maxLength: (t) => Ee(pt(i, ((e) => At((s) => we(s) && s.length <= e))(t))),
    includes: (t) => {
      return Ee(pt(i, ((e = t), At((s) => we(s) && s.includes(e)))));
      var e;
    },
    regex: (t) => {
      return Ee(pt(i, ((e = t), At((s) => we(s) && !!s.match(e)))));
      var e;
    },
  });
Ee(At(we));
const oe = (i) =>
  Object.assign(Vt(i), {
    between: (t, e) =>
      oe(pt(i, ((s, n) => At((r) => re(r) && s <= r && n >= r))(t, e))),
    lt: (t) => oe(pt(i, ((e) => At((s) => re(s) && s < e))(t))),
    gt: (t) => oe(pt(i, ((e) => At((s) => re(s) && s > e))(t))),
    lte: (t) => oe(pt(i, ((e) => At((s) => re(s) && s <= e))(t))),
    gte: (t) => oe(pt(i, ((e) => At((s) => re(s) && s >= e))(t))),
    int: () =>
      oe(
        pt(
          i,
          At((t) => re(t) && Number.isInteger(t)),
        ),
      ),
    finite: () =>
      oe(
        pt(
          i,
          At((t) => re(t) && Number.isFinite(t)),
        ),
      ),
    positive: () =>
      oe(
        pt(
          i,
          At((t) => re(t) && t > 0),
        ),
      ),
    negative: () =>
      oe(
        pt(
          i,
          At((t) => re(t) && t < 0),
        ),
      ),
  });
oe(At(re));
const ve = (i) =>
  Object.assign(Vt(i), {
    between: (t, e) =>
      ve(pt(i, ((s, n) => At((r) => be(r) && s <= r && n >= r))(t, e))),
    lt: (t) => ve(pt(i, ((e) => At((s) => be(s) && s < e))(t))),
    gt: (t) => ve(pt(i, ((e) => At((s) => be(s) && s > e))(t))),
    lte: (t) => ve(pt(i, ((e) => At((s) => be(s) && s <= e))(t))),
    gte: (t) => ve(pt(i, ((e) => At((s) => be(s) && s >= e))(t))),
    positive: () =>
      ve(
        pt(
          i,
          At((t) => be(t) && t > 0),
        ),
      ),
    negative: () =>
      ve(
        pt(
          i,
          At((t) => be(t) && t < 0),
        ),
      ),
  });
ve(At(be));
Vt(
  At(function (i) {
    return typeof i == "boolean";
  }),
);
Vt(
  At(function (i) {
    return typeof i == "symbol";
  }),
);
Vt(
  At(function (i) {
    return i == null;
  }),
);
Vt(
  At(function (i) {
    return i != null;
  }),
);
class Nf extends Error {
  constructor(t) {
    let e;
    try {
      e = JSON.stringify(t);
    } catch {
      e = t;
    }
    super(`Pattern matching error: no pattern matches value ${e}`),
      (this.input = void 0),
      (this.input = t);
  }
}
const Ws = { matched: !1, value: void 0 };
function de(i) {
  return new Li(i, Ws);
}
class Li {
  constructor(t, e) {
    (this.input = void 0),
      (this.state = void 0),
      (this.input = t),
      (this.state = e);
  }
  with(...t) {
    if (this.state.matched) return this;
    const e = t[t.length - 1],
      s = [t[0]];
    let n;
    t.length === 3 && typeof t[1] == "function"
      ? (n = t[1])
      : t.length > 2 && s.push(...t.slice(1, t.length - 1));
    let r = !1,
      o = {};
    const A = (l, d) => {
        (r = !0), (o[l] = d);
      },
      h =
        !s.some((l) => Ae(l, this.input, A)) || (n && !n(this.input))
          ? Ws
          : {
              matched: !0,
              value: e(r ? (zi in o ? o[zi] : o) : this.input, this.input),
            };
    return new Li(this.input, h);
  }
  when(t, e) {
    if (this.state.matched) return this;
    const s = !!t(this.input);
    return new Li(
      this.input,
      s ? { matched: !0, value: e(this.input, this.input) } : Ws,
    );
  }
  otherwise(t) {
    return this.state.matched ? this.state.value : t(this.input);
  }
  exhaustive(t = Of) {
    return this.state.matched ? this.state.value : t(this.input);
  }
  run() {
    return this.exhaustive();
  }
  returnType() {
    return this;
  }
}
function Of(i) {
  throw new Nf(i);
}
class jf {
  constructor(t, e) {
    p(this, "movementExecutor", new yn(() => {}));
    (this.object = t), (this.checkCollision = e);
  }
  update(t) {
    if (t && !this.object.isMoving) {
      const e = this.nextDirection(t);
      e && this.movementExecutor.start(G(this.object, e, this.checkCollision));
    }
    this.movementExecutor.update(t);
  }
  nextDirection(t) {
    return de(t.getLatestActivatedKey())
      .with("UP", () => "up")
      .with("DOWN", () => "down")
      .with("LEFT", () => "left")
      .with("RIGHT", () => "right")
      .otherwise(() => null);
  }
}
class Ea {
  next(t) {
    return t;
  }
}
class zf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("バランスボールだ", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectBalanceBall"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return V.eq(t, this.pos);
  }
  update() {}
  close() {}
}
class Lf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE * 3);
    p(this, "height", S.CELL_SIZE * 3);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("本や資料が 並べられている", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectBookShelf"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.66),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return (
      V.eq(t, this.pos) ||
      V.eq(t, [this.pos[0] + 1, this.pos[1]]) ||
      V.eq(t, [this.pos[0] + 2, this.pos[1]])
    );
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class Hf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", -1e3);
    p(this, "width", S.CELL_SIZE * 4);
    p(this, "height", S.CELL_SIZE * 4);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectCarpet"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition() {
    return !1;
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class Yf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 0);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new he([
        f.texture("objectCat1"),
        f.texture("objectCat1"),
        f.texture("objectCat2"),
        f.texture("objectCat2"),
        f.texture("objectCat2"),
        f.texture("objectCat2"),
        f.texture("objectCat2"),
        f.texture("objectCat2"),
        f.texture("objectCat2"),
      ])),
      (this.sprite.animationSpeed = 0.05),
      (this.sprite.loop = !0),
      this.sprite.play(),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
const Xf = (i) => {
  const t = i.length;
  return i[Math.floor(Math.random() * t)];
};
class Vf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "status", "play");
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P(
        `猫型のロボットだ
顔の部分は モニターになっている`,
        t,
      ),
        yield* B("かわいいですね", f.texture("objectFuyuComment1"), t);
    });
    p(this, "frameCount", 0);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.pos = t),
      (this.sprite = new he([f.texture("objectCatMonitor8")])),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 1.25),
      this.subCanvas.addChild(this.sprite);
  }
  setStatus(t) {
    (this.status = t), (this.frameCount = 0), this.sprite.stop();
  }
  animation() {
    switch (this.status) {
      case "noPower":
        break;
      case "speaking": {
        this.sprite.playing ||
          ((this.sprite.textures = [
            f.texture("objectCatMonitor1"),
            f.texture("objectCatMonitor2"),
          ]),
          (this.sprite.animationSpeed = 0.1),
          (this.sprite.loop = !0),
          this.sprite.play());
        break;
      }
      case "play":
      case "done": {
        this.frameCount === 0 &&
          ((this.sprite.textures = Xf([
            [f.texture("objectCatMonitor1")],
            [
              f.texture("objectCatMonitor3"),
              f.texture("objectCatMonitor3"),
              f.texture("objectCatMonitor4"),
              f.texture("objectCatMonitor4"),
              f.texture("objectCatMonitor4"),
              f.texture("objectCatMonitor4"),
              f.texture("objectCatMonitor4"),
              f.texture("objectCatMonitor3"),
              f.texture("objectCatMonitor3"),
            ],
            [
              f.texture("objectCatMonitor3"),
              f.texture("objectCatMonitor3"),
              f.texture("objectCatMonitor5"),
              f.texture("objectCatMonitor6"),
              f.texture("objectCatMonitor7"),
              f.texture("objectCatMonitor6"),
              f.texture("objectCatMonitor5"),
              f.texture("objectCatMonitor3"),
            ],
          ])),
          (this.sprite.animationSpeed = 0.1),
          this.sprite.play(),
          (this.sprite.loop = !1)),
          (this.frameCount = (this.frameCount + 1) % 200);
        break;
      }
    }
  }
  update() {
    this.animation();
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  close() {
    this.subCanvas.destroy();
  }
}
class _f {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("椅子だ 座り心地が良さそうだ", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectChair"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, -2 / S.CELL_SIZE),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class qf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("コードボックスだ", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectCodeBox"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite),
      this.sprite.anchor.set(0, 0.4);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {}
}
class Zf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("クッションだ 座り心地が良さそうだ", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectCushion"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class Wf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE * 2);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.pos = t),
      (this.sprite = new et(f.texture("objectLowTable"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  update() {}
  isInPosition(t) {
    return (
      V.eq(t, this.pos) ||
      V.eq(t, [this.pos[0] + 1, this.pos[1]]) ||
      V.eq(t, [this.pos[0], this.pos[1] + 1]) ||
      V.eq(t, [this.pos[0] + 1, this.pos[1] + 1])
    );
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  close() {
    this.subCanvas.destroy();
  }
}
class Kf {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "frame", 0);
    p(this, "ANIMATION_SPEED", 30);
    p(this, "textures", [
      f.texture("objectMantis3"),
      f.texture("objectMantis4"),
    ]);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(this.textures[0])),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  setMode(t) {
    t === "eating"
      ? (this.textures = [
          f.texture("objectMantis3"),
          f.texture("objectMantis4"),
        ])
      : (this.textures = [
          f.texture("objectMantis1"),
          f.texture("objectMantis2"),
        ]);
  }
  update() {
    this.frame++;
    const t =
      Math.floor(this.frame / this.ANIMATION_SPEED) % this.textures.length;
    (this.sprite.texture = this.textures[t]),
      this.frame > this.ANIMATION_SPEED * this.textures.length &&
        (this.frame = 0);
  }
  close() {
    this.subCanvas.destroy();
  }
}
class Jf {
  constructor(t, e, s) {
    p(this, "movementExecutor", new yn(() => {}));
    (this.objectBase = t), (this.objectTarget = e), (this.checkCollision = s);
  }
  update(t) {
    if (!this.objectBase.isMoving) {
      const e = this.nextDirection();
      e &&
        this.movementExecutor.start(G(this.objectBase, e, this.checkCollision));
    }
    this.movementExecutor.update(t);
  }
  nextDirection() {
    const t = this.getDirection(this.objectTarget.getLastPosition());
    return t === null ? this.getDirection(this.objectTarget.pos) : t;
  }
  getDirection(t) {
    const e = V.sub(t, this.objectBase.pos);
    return Math.abs(e[0]) + Math.abs(e[1]) === 0
      ? null
      : Math.abs(e[0]) > Math.abs(e[1])
        ? e[0] > 0
          ? "right"
          : "left"
        : e[1] > 0
          ? "down"
          : "up";
  }
}
class $f {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "sprite");
    p(this, "layerOffset", 10);
    p(this, "width", q.CELL_SIZE);
    p(this, "height", q.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "isMoving", !1);
    p(this, "setIsMoving", (t) => {
      this.isMoving = t;
    });
    p(this, "isFollowing", !1);
    p(this, "_spriteDirection", "down");
    p(this, "_spriteTexturesSet", {
      up: [
        f.texture("objectMugiUp1"),
        f.texture("objectMugiUp2"),
        f.texture("objectMugiUp3"),
        f.texture("objectMugiUp4"),
      ],
      down: [
        f.texture("objectMugiDown1"),
        f.texture("objectMugiDown2"),
        f.texture("objectMugiDown3"),
        f.texture("objectMugiDown4"),
      ],
      right: [
        f.texture("objectMugiRight1"),
        f.texture("objectMugiRight2"),
        f.texture("objectMugiRight3"),
        f.texture("objectMugiRight4"),
      ],
      left: [
        f.texture("objectMugiLeft1"),
        f.texture("objectMugiLeft2"),
        f.texture("objectMugiLeft3"),
        f.texture("objectMugiLeft4"),
      ],
    });
    p(this, "objectController", new _s());
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.sprite = new he(this._spriteTexturesSet[this._spriteDirection])),
      (this.sprite.animationSpeed = 0.5),
      this.setPosition(t),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      this.subCanvas.addChild(this.sprite);
  }
  setPosition(t) {
    (this.pos = t),
      (this.subCanvas.x = t[0] * q.CELL_SIZE),
      (this.subCanvas.y = t[1] * q.CELL_SIZE);
  }
  getDirection() {
    return this._spriteDirection;
  }
  setDirection(t) {
    (this._spriteDirection = t),
      (this.sprite.textures = this._spriteTexturesSet[t]),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height);
  }
  update(t) {
    this.objectController.update(t);
  }
  close() {
    this.subCanvas.destroy();
  }
  isInPosition(t) {
    return V.eq(this.pos, t);
  }
  isCollision(t) {
    return this.isFollowing ? !1 : V.eq(this.pos, t);
  }
  followObject(t, e) {
    (this.objectController = new Jf(this, t, ba(e))), (this.isFollowing = !0);
  }
  stopFollowing() {
    (this.objectController = new _s()), (this.isFollowing = !1);
  }
}
class tg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE * 2);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("棚だ 小物が置けそうだ", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectRack"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite),
      this.sprite.anchor.set(0, 0.5);
  }
  isInPosition(t) {
    return V.eq(t, this.pos) || V.eq(t, [this.pos[0] + 1, this.pos[1]]);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class eg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("tileTransparent")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE * 2);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos) || V.eq(t, [this.pos[0] + 1, this.pos[1] - 1]);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {}
}
class Es {
  constructor(t, e = "1") {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P(
        `本が散らばっている
本には 勉強している形跡がほとんどなく 落書きがある`,
        t,
      );
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      e === "1"
        ? (this.sprite = new et(f.texture("objectScatteredBooks")))
        : (this.sprite = new et(f.texture("objectScatteredBooks2"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class Hr {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 5);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectScatteredPapers"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.4),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class ig {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE * 3);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("タンスだ 衣類が入っている", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectShelf"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.33),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos) || V.eq(t, [this.pos[0], this.pos[1] + 1]);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class sg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("tileTransparent")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos) || V.eq(t, [this.pos[0] + 1, this.pos[1] - 1]);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {}
}
class ng {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 2);
    p(this, "width", 3);
    p(this, "height", 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", function* (t) {
      yield* P("テーブルの上に モニターがある", t);
    });
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectTableMonitor2"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width * S.CELL_SIZE),
      (this.sprite.height = this.height * S.CELL_SIZE),
      this.sprite.anchor.set(0, 0.5),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return (
      V.eq(t, this.pos) ||
      V.eq(t, [this.pos[0] + 1, this.pos[1]]) ||
      V.eq(t, [this.pos[0] + 2, this.pos[1]])
    );
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class rg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("tileTransparent")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {}
}
const Yr = { "000": new bn(), 100: new wn() };
class og {
  constructor() {
    p(this, "map", [
      [
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "000",
        "000",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "000",
        "000",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "000",
        "000",
      ],
      [
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "100",
        "000",
        "000",
      ],
      [
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "100",
        "000",
        "000",
        "000",
      ],
    ]);
    p(this, "container", new _());
    this.map.forEach((t, e) => {
      t.forEach((s, n) => {
        const r = Yr[s],
          o = new et(r.getTexture());
        (o.width = q.CELL_SIZE),
          (o.height = q.CELL_SIZE),
          (o.x = n * q.CELL_SIZE),
          (o.y = e * q.CELL_SIZE),
          this.container.addChild(o);
      });
    });
  }
  isCollision(t) {
    const [e, s] = t;
    return 0 <= e && e < this.map[0].length && 0 <= s && s < this.map.length
      ? Yr[this.map[s][e]].isCollidable
      : !0;
  }
}
const St = class St {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "event");
    p(this, "numberCommandContainer");
    p(this, "selectedNumber", 0);
    p(this, "commands");
    p(this, "selectedRect");
    p(this, "containerSize", {
      width: 12 * 4 + St.containerPadding.x * 2,
      height: St.textHeight + St.containerPadding.y * 2,
    });
    (this.subCanvas = new _()),
      this.subCanvas.removeChildren(),
      (this.subCanvas.x = 0),
      (this.subCanvas.y =
        S.HEIGHT - Ze.containerSize.height - Ze.containerMargin.y * 2),
      (this.commands = t),
      (this.containerSize.height =
        St.textHeight * this.commands.length + St.containerPadding.y * 2),
      (this.containerSize.width =
        16 * Math.max(...this.commands.map((n) => n.length)) +
        St.containerPadding.x * 2),
      (this.numberCommandContainer = new _()),
      this.subCanvas.addChild(this.numberCommandContainer),
      (this.numberCommandContainer.y = -this.containerSize.height),
      (this.numberCommandContainer.x = S.WIDTH - this.containerSize.width - 4);
    const e = new Xt()
      .roundRect(0, 0, this.containerSize.width, this.containerSize.height, 4)
      .fill({ color: "#000000" });
    this.numberCommandContainer.addChild(e),
      (this.selectedNumber = 0),
      (this.selectedRect = new Xt()
        .rect(0, St.containerPadding.y, this.containerSize.width, St.textHeight)
        .fill({ color: "#333333" })),
      this.numberCommandContainer.addChild(this.selectedRect);
    const s = new Kt({
      fill: "#ffffff",
      wordWrap: !0,
      wordWrapWidth: this.containerSize.width - St.containerPadding.x * 2,
      lineHeight: St.textHeight,
      fontSize: 16,
      fontFamily: "DotGothic16",
    });
    this.commands.forEach((n, r) => {
      this.numberCommandContainer.addChild(
        new gi({
          text: n,
          style: s,
          x: St.containerPadding.x,
          y: St.containerPadding.y + r * St.textHeight,
        }),
      );
    }),
      (this.event = this.createEvent());
  }
  clear() {
    this.numberCommandContainer.removeChildren(),
      this.numberCommandContainer.removeFromParent();
  }
  *createEvent() {
    for (;;) {
      const t = yield,
        e = this.commands.length;
      if (
        (t.keyState.UP === "PRESSED"
          ? ((this.selectedNumber = (this.selectedNumber - 1 + e) % e),
            (this.selectedRect.y = this.selectedNumber * St.textHeight),
            gt.play("cursorOption"))
          : t.keyState.DOWN === "PRESSED" &&
            ((this.selectedNumber = (this.selectedNumber + 1) % e),
            (this.selectedRect.y = this.selectedNumber * St.textHeight),
            gt.play("cursorOption")),
        t.keyState.ACTION === "PRESSED")
      )
        return gt.play("cursorOption"), this.commands[this.selectedNumber];
    }
  }
};
p(St, "textHeight", 26), p(St, "containerPadding", { x: 18, y: 12 });
let Hi = St;
function* En(i, t, e) {
  const s = new Ze(i);
  e.addChild(s.subCanvas), yield* s.event;
  const n = new Hi(t);
  e.addChild(n.subCanvas);
  const r = yield* n.event;
  return e.removeChild(n.subCanvas), e.removeChild(s.subCanvas), r;
}
function* ae(i, t, e, s) {
  const n = new ji(i, e);
  s.addChild(n.subCanvas), yield* n.event;
  const r = new Hi(t);
  s.addChild(r.subCanvas);
  const o = yield* r.event;
  return s.removeChild(r.subCanvas), s.removeChild(n.subCanvas), o;
}
function* Tt(i) {
  if (i.isMoving) return;
  i.setIsMoving(!0);
  const t = [3, 2, 1, -1, -2, -3];
  for (const e of t) (i.subCanvas.y -= e), yield;
  i.setIsMoving(!1);
}
const ag = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    t.eventManager.add(function* (e) {
      const s = yield* Ce(e);
      yield* K(
        [
          {
            avatar: f.texture("objectHaruComment9"),
            messages: [
              `まさか 当てられるなんて
やっぱり フユはすごいねー`,
            ],
          },
          { avatar: f.texture("objectFuyuComment6"), messages: ["..."] },
          { avatar: f.texture("objectHaruComment9"), messages: ["..."] },
          {
            avatar: f.texture("objectHaruComment10"),
            messages: ["...ごめんなさい"],
          },
          {
            avatar: f.texture("objectFuyuComment5"),
            messages: [
              "...大丈夫です",
              `プリンを食べたかったのも あるかと思いますが
本当は 私と 遊びたかったんですよね`,
              `ハルなら やろうと思えば
疑われることなく 食べることができた はずです`,
            ],
          },
          {
            avatar: f.texture("objectHaruComment10"),
            messages: ["...うん", "...", "...プリンも 食べたい ...です..."],
          },
          {
            avatar: f.texture("objectFuyuComment5"),
            messages: [
              "...",
              "わかりました",
              "その前に あの穴は ふさいでくださいね",
            ],
          },
          { avatar: f.texture("objectHaruComment4"), messages: ["...うん！"] },
        ],
        e,
      ),
        yield* P("Ending 1: ハルのいたずら", e),
        yield* j(100),
        i.end(),
        yield* s();
    });
  },
  Ag = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    t.eventManager.add(function* (e) {
      const s = yield* Ce(e);
      yield* K(
        [
          { avatar: f.texture("objectHaruComment10"), messages: ["..."] },
          {
            avatar: f.texture("objectFuyuComment5"),
            messages: [
              "...",
              `...それで
あの穴は このためだけに 開けたのですか？`,
            ],
          },
          { avatar: f.texture("objectHaruComment10"), messages: ["...うん"] },
          { avatar: f.texture("objectFuyuComment6"), messages: ["..."] },
          {
            avatar: f.texture("objectHaruComment10"),
            messages: ["...", "...プリン 食べたい"],
          },
          {
            avatar: f.texture("objectFuyuComment5"),
            messages: [
              "だめです",
              `穴も開け ネズミも可哀想なことを されました
やりすぎです`,
              "あげませんし 作りません",
            ],
          },
          {
            avatar: f.texture("objectHaruComment5"),
            messages: ["...", "そんなぁ..."],
          },
        ],
        e,
      ),
        yield* P("Ending 2: 強欲なハル", e),
        yield* j(100),
        i.end(),
        yield* s();
    });
  },
  Si = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    t.eventManager.add(function* (e) {
      const s = yield* Ce(e);
      yield* K(
        [
          {
            avatar: f.texture("objectHaruComment5"),
            messages: [
              `フユ〜 プリンなくなっちゃったから
ちょうだいよ〜`,
            ],
          },
          {
            avatar: f.texture("objectFuyuComment1"),
            messages: ["そうですね...", "では わたしの分を あげます"],
          },
          {
            avatar: f.texture("objectHaruComment1"),
            messages: ["...", "...フユの分は いいの？"],
          },
          {
            avatar: f.texture("objectFuyuComment3"),
            messages: [
              `...ええ 大丈夫です
私の分は また作るので`,
            ],
          },
          {
            avatar: f.texture("objectHaruComment4"),
            messages: [
              `そっか！
やったー`,
              "プリン！ プリン！",
            ],
          },
        ],
        e,
      ),
        yield* P("Ending 3: ハルへのご褒美", e),
        yield* j(100),
        i.end(),
        yield* s();
    });
  },
  Ks = (i) => {
    const t = new Xt()
      .rect(0, 0, S.WIDTH, S.HEIGHT)
      .fill({ color: 4194304, alpha: 0.3 });
    i.addChild(t);
    function e() {
      i.removeChild(t), t.destroy();
    }
    return e;
  };
function* xe(i, t) {
  for (;;) {
    const e = yield* i();
    if (yield* t(e)) return e;
  }
}
class hi {
  constructor(t) {
    this.position = t;
  }
  next() {
    return [
      S.WIDTH / 2 - (this.position[0] * S.CELL_SIZE + S.CELL_SIZE / 2),
      S.HEIGHT / 2 - (this.position[1] * S.CELL_SIZE + S.CELL_SIZE / 2),
    ];
  }
}
class hg {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "sprite");
    p(this, "layerOffset", 9);
    p(this, "width", q.CELL_SIZE);
    p(this, "height", q.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "isMoving", !1);
    p(this, "setIsMoving", (t) => {
      this.isMoving = t;
    });
    p(this, "_spriteDirection", "down");
    p(this, "_spriteTexturesSet", {
      up: [f.texture("objectMachineBase1")],
      down: [f.texture("objectMachineBase2")],
      right: [f.texture("objectMachineBase1")],
      left: [f.texture("objectMachineBase2")],
    });
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.sprite = new he(this._spriteTexturesSet[this._spriteDirection])),
      this.setPosition(t),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  setPosition(t) {
    (this.pos = t),
      (this.subCanvas.x = t[0] * q.CELL_SIZE),
      (this.subCanvas.y = t[1] * q.CELL_SIZE);
  }
  getDirection() {
    return this._spriteDirection;
  }
  setDirection(t) {
    (this._spriteDirection = t),
      (this.sprite.textures = this._spriteTexturesSet[t]),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
  isInPosition(t) {
    return V.eq(this.pos, t);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
}
class lg {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "sprite");
    p(this, "layerOffset", 9);
    p(this, "width", q.CELL_SIZE);
    p(this, "height", q.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "isMoving", !1);
    p(this, "setIsMoving", (t) => {
      this.isMoving = t;
    });
    p(this, "_spriteDirection", "down");
    p(this, "_spriteTexturesSet", {
      up: [f.texture("objectMouse1")],
      down: [f.texture("objectMouse2")],
      right: [f.texture("objectMouse1")],
      left: [f.texture("objectMouse2")],
    });
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.sprite = new he(this._spriteTexturesSet[this._spriteDirection])),
      this.setPosition(t),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  setPosition(t) {
    (this.pos = t),
      (this.subCanvas.x = t[0] * q.CELL_SIZE),
      (this.subCanvas.y = t[1] * q.CELL_SIZE);
  }
  getDirection() {
    return this._spriteDirection;
  }
  setDirection(t) {
    (this._spriteDirection = t),
      (this.sprite.textures = this._spriteTexturesSet[t]),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
  isInPosition(t) {
    return V.eq(this.pos, t);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
}
class Js {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite");
    p(this, "layerOffset", 10);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite = new et(f.texture("objectPudding1"))),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.33),
      this.subCanvas.addChild(this.sprite);
  }
  setEmpty() {
    this.sprite.texture = f.texture("objectPudding2");
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {
    this.subCanvas.destroy();
  }
}
class cg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("objectHole")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {}
}
class ug {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("objectSlippers")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {}
}
class dg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("objectToilet")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos) || V.eq(t, [this.pos[0] + 1, this.pos[1] - 1]);
  }
  isCollision() {
    return !1;
  }
  update() {}
  close() {}
}
class fg {
  constructor(t) {
    p(this, "subCanvas");
    p(this, "sprite", new et(f.texture("objectWashbasin")));
    p(this, "layerOffset", 1);
    p(this, "width", S.CELL_SIZE);
    p(this, "height", S.CELL_SIZE * 2);
    p(this, "isDead", !1);
    p(this, "playerExamineEvent", null);
    (this.pos = t),
      (this.subCanvas = new _()),
      (this.sprite.x = this.pos[0] * S.CELL_SIZE),
      (this.sprite.y = this.pos[1] * S.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.subCanvas.addChild(this.sprite);
  }
  isInPosition(t) {
    return V.eq(t, this.pos) || V.eq(t, [this.pos[0], this.pos[1] + 1]);
  }
  isCollision(t) {
    return this.isInPosition(t);
  }
  update() {}
  close() {}
}
const Xr = { "000": new bn(), 100: new wn() };
class gg {
  constructor() {
    p(this, "map", [
      ["000", "000"],
      ["100", "100"],
      ["100", "100"],
      ["100", "100"],
      ["100", "000"],
    ]);
    p(this, "container", new _());
    this.map.forEach((t, e) => {
      t.forEach((s, n) => {
        const r = Xr[s],
          o = new et(r.getTexture());
        (o.width = q.CELL_SIZE),
          (o.height = q.CELL_SIZE),
          (o.x = n * q.CELL_SIZE),
          (o.y = e * q.CELL_SIZE),
          this.container.addChild(o);
      });
    });
  }
  isCollision(t) {
    const [e, s] = t;
    return 0 <= e && e < this.map[0].length && 0 <= s && s < this.map.length
      ? Xr[this.map[s][e]].isCollidable
      : !0;
  }
}
class Vr {
  constructor(t) {
    p(this, "subCanvas", new _());
    p(this, "objectManager");
    p(this, "map", new gg());
    p(this, "spritePositionUpdater", new Ea());
    p(this, "mainObjects", { toilet: new dg([0, 0]) });
    (this.eventManager = t),
      (this.objectManager = new xn([
        this.mainObjects.toilet,
        new lt([0, 0]),
        new lt([1, 0]),
        new ug([0, 3]),
        new cg([1, 0]),
        new fg([1, 2]),
      ])),
      this.subCanvas.addChild(this.map.container),
      this.subCanvas.addChild(this.objectManager.subCanvas);
  }
  update(t) {
    this.objectManager.update(t),
      this.subCanvas.position.set(
        ...this.spritePositionUpdater.next([
          this.subCanvas.x,
          this.subCanvas.y,
        ]),
      );
  }
  close() {
    this.objectManager.close();
  }
}
function* pg(i, t) {
  const e = te(i);
  if (!(e instanceof Ot)) throw new Error("Invalid stage");
  yield* B("犯人は ハル あなたですね", f.texture("objectFuyuComment1"), t),
    yield* B(
      `...え？ ちょっと待ってよ
わたしは トイレにいたんだよ〜？`,
      f.texture("objectHaruComment5"),
      t,
    ),
    yield* B(
      `そうですよ！
ハルさんが プリンを 食べれるはずが ありません！`,
      f.texture("objectMugiComment4"),
      t,
    ),
    yield* B(
      `はい 普通では無理です
ですが ハルは あるトリックを使ったのです`,
      f.texture("objectFuyuComment1"),
      t,
    );
  const s = [
    "ネズミの穴",
    "カマキリ",
    "ロボット基部の設計書",
    ...(R.isFamilyInfoRead ? ["家族集"] : []),
  ];
  yield* xe(
    () =>
      ae(
        "それは...",
        [
          "早食い",
          "カマキリと一緒に食べた",
          ...(R.isFamilyInfoRead
            ? ["ロボットの基部を利用した"]
            : ["ネズミを利用して食べた"]),
        ],
        f.texture("objectFuyuComment1"),
        t,
      ),
    function* (n) {
      return yield* de(n)
        .with("早食い", function* () {
          return (
            yield* B(
              `早食いです
部屋に帰ってきて 急いで プリンを食べたのです`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* B(
              `...な なるほど
でも ほんの数秒 でしたよ？`,
              f.texture("objectMugiComment4"),
              t,
            ),
            yield* B(
              `それに 今まで見つけた
てがかりは どうして...`,
              f.texture("objectMugiComment4"),
              t,
            ),
            yield* B("...", f.texture("objectFuyuComment4"), t),
            yield* B(
              "...冗談です 改めてどう食べたのかを説明しましょう",
              f.texture("objectFuyuComment7"),
              t,
            ),
            !1
          );
        })
        .with("カマキリと一緒に食べた", function* () {
          return (
            yield* B(
              "カマキリと一緒に食べたのです",
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* B(
              `ハルは 部屋に戻ったあと プリンを少しだけ食べて
残りを カマキリに食べさせたのです`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* B(
              `...な なるほど
だからカマキリにも プリンが残っていたのですね`,
              f.texture("objectMugiComment4"),
              t,
            ),
            yield* B(
              "では ネズミの穴に プリンがあったのはなぜですか？",
              f.texture("objectMugiComment4"),
              t,
            ),
            (yield* ae(
              "それは...",
              ["ネズミにもあげた", "プリンをこぼした"],
              f.texture("objectFuyuComment1"),
              t,
            )) === "ネズミにもあげた"
              ? (yield* B(
                  "ネズミにもあげたのです",
                  f.texture("objectFuyuComment1"),
                  t,
                ),
                yield* B(
                  "...そ そんな 優しい人だったとは",
                  f.texture("objectMugiComment4"),
                  t,
                ),
                yield* B(
                  `...バレちゃった みたいだね
実は..`,
                  f.texture("objectHaruComment7"),
                  t,
                ),
                yield* pe(
                  B(
                    "ちょっと待ってください！",
                    f.texture("objectMugiComment4"),
                    t,
                  ),
                  (function* () {
                    yield* Tt(e.mainObjects.mugi),
                      yield* Tt(e.mainObjects.mugi);
                  })(),
                ),
                yield* B(
                  `それなら なんで 言わないんでしょう...
まるで 誰かに 食べられた みたいにしてました`,
                  f.texture("objectMugiComment4"),
                  t,
                ),
                yield* B(
                  `それは...
あ〜〜...`,
                  f.texture("objectHaruComment4"),
                  t,
                ),
                yield* B("...", f.texture("objectFuyuComment4"), t),
                yield* B(
                  "...冗談です 改めてどう食べたのかを説明しましょう",
                  f.texture("objectFuyuComment7"),
                  t,
                ))
              : (yield* B(
                  "プリンをこぼしたのです",
                  f.texture("objectFuyuComment1"),
                  t,
                ),
                yield* B(
                  `...プリン
奥にありましたよ？`,
                  f.texture("objectMugiComment4"),
                  t,
                ),
                yield* B("...", f.texture("objectFuyuComment4"), t),
                yield* B(
                  "...冗談です 改めてどう食べたのかを説明しましょう",
                  f.texture("objectFuyuComment7"),
                  t,
                )),
            !1
          );
        })
        .with("ネズミを利用して食べた", function* () {
          yield* K(
            [
              {
                avatar: f.texture("objectFuyuComment1"),
                messages: ["ネズミを利用して食べたのです"],
              },
            ],
            t,
          );
          const r = new Ot(e.eventManager, null);
          r.mainObjects.mantis.setMode("waiting");
          const o = new Oi(e.eventManager),
            A = new Vr(e.eventManager),
            h = r.mainObjects.haru,
            l = new lg([5, 3]);
          let d;
          yield* Pt(t, () => {
            (d = Ks(t)),
              h.setPosition([5, 3]),
              h.setDirection("up"),
              l.setPosition([5, 2]),
              l.setDirection("right"),
              r.objectManager.add(l),
              (r.spritePositionUpdater = new hi(h.pos)),
              Gt(i, r);
          }),
            yield* K(
              [
                {
                  avatar: f.texture("objectFuyuComment1"),
                  messages: [
                    `まず ハルは トイレに行く前に
ネズミにプリンを持たせました`,
                    `そして プリンを持たないまま トイレに行き
ネズミにプリンを 持って来させたのです`,
                  ],
                },
              ],
              t,
            );
          const a = new Js([0, 0]);
          return (
            a.sprite.anchor.set(0, 0.2),
            yield* j(10),
            l.subCanvas.addChild(a.subCanvas),
            yield* j(10),
            yield* G(h, "right", () => !1),
            yield* G(h, "right", () => !1),
            yield* G(h, "right", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            r.objectManager.remove(h),
            yield* j(30),
            yield* K(
              [
                {
                  avatar: f.texture("objectMugiComment4"),
                  messages: [
                    `...な なるほど でも ネズミがトイレに行くためには
扉を開けて 部屋を出る 必要がありますよ？`,
                  ],
                },
              ],
              t,
            ),
            yield* xe(
              () =>
                ae(
                  "トイレに運ぶ方法を示す てがかりは...",
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: [
                              "ネズミの穴です",
                              `小さな穴の先にある 空間
あれは トイレだったのです`,
                            ],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `なるほど！！
考えてみれば あそこの先は トイレですね！`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !0
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["カマキリです"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `カマキリ...
何か トイレに行く証拠が 見つかったのですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ロボット基部の設計書...
もしかして ネズミからドアを開ける仕組みが...！？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["家族集です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `家族集...
ネズミについては 書かれてなかったですよね`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...そうですね
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .exhaustive(),
            ),
            yield* B(
              `はい ネズミは 誰も見ていない中
棚のそばにある 穴を通り ハルにプリンを届けました`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(10),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "down", () => !1),
            yield* G(l, "right", () => !1),
            l.setDirection("down"),
            yield* j(10),
            r.objectManager.remove(l),
            yield* j(32),
            yield* K(
              [
                {
                  avatar: f.texture("objectHaruComment1"),
                  messages: [
                    `ちょっと待ってよ
あの小さい穴が トイレにつながっていたとして`,
                    "それをネズミが運んだ 証拠は あるのかい？",
                  ],
                },
              ],
              t,
            ),
            yield* xe(
              () =>
                ae(
                  `はい
プリンを ネズミがトイレまで 運んだ 証拠は...`,
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    yield* B(
                      "ネズミの穴です",
                      f.texture("objectFuyuComment1"),
                      t,
                    );
                    let u = () => {};
                    return (
                      yield* Pt(
                        t,
                        () => {
                          u = Oe(f.texture("cutsMouseHole"), t);
                        },
                        2,
                      ),
                      yield* B(
                        `トイレにつながる 穴の中に
プリンと ネズミの足跡が 見つかりました`,
                        f.texture("objectFuyuComment1"),
                        t,
                      ),
                      yield* B("...！", f.texture("objectHaruComment1"), t),
                      yield* Pt(
                        t,
                        () => {
                          u(),
                            a.setEmpty(),
                            A.objectManager.add(h),
                            A.objectManager.add(l),
                            h.setPosition([0, 1]),
                            h.setDirection("right"),
                            l.setPosition([1, 1]),
                            l.setDirection("left"),
                            (A.spritePositionUpdater = new hi(h.pos)),
                            Gt(i, A);
                        },
                        2,
                      ),
                      !0
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["カマキリです"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              "カマキリ...",
                              `そこから ネズミが トイレに行く証拠が
見つかったのですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              "ロボット基部の設計書...",
                              `もしかして トイレに行くように
プログラムされていたことが わかったんですか！？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["家族集です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `家族集...
ネズミについては 書かれてなかったですよね`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...そうですね
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .exhaustive(),
            ),
            yield* B(
              `そして トイレでプリンを食べたあとに
再び ネズミに プリンの容器を 持たせて`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(10),
            l.setDirection("up"),
            A.objectManager.remove(l),
            yield* j(10),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            A.objectManager.remove(h),
            yield* Pt(
              t,
              () => {
                Gt(i, o),
                  o.player.setPosition([7, 1]),
                  o.player.setDirection("right");
              },
              4,
            ),
            yield* B(
              `何も持たずに トイレから出たところで
帰ってきた 私と 鉢合わせたのです`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(30),
            h.setPosition([13, 1]),
            o.objectManager.add(h),
            yield* j(15),
            h.setDirection("left"),
            yield* j(30),
            yield* Pt(
              t,
              () => {
                Gt(i, r),
                  l.setPosition([5, 2]),
                  l.setDirection("right"),
                  r.objectManager.add(l);
              },
              4,
            ),
            yield* B(
              `その後 急いで部屋に戻り
ネズミから プリンの容器を 取り戻しました`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(30),
            h.setPosition([8, 8]),
            h.setDirection("up"),
            r.objectManager.add(h),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "left", () => !1),
            yield* G(h, "left", () => !1),
            yield* j(15),
            a.subCanvas.removeFromParent(),
            yield* j(15),
            yield* B("なるほどー...", f.texture("objectMugiComment4"), t),
            yield* Pt(
              t,
              () => {
                Gt(i, e), d();
              },
              4,
            ),
            yield* B(
              `じゃー その ネズミを連れてくれば いいじゃないか
ネズミは いま どこにいるの？`,
              f.texture("objectHaruComment1"),
              t,
            ),
            yield* xe(
              () =>
                ae(
                  `しかし もうそのネズミは いないのです
それを示す てがかりは...`,
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ネズミの穴です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ネズミの穴...
また トイレに 戻したということですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...間違えました
いまトイレに行っても ネズミはいないでしょう`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: [
                              `カマキリに 食べられたのです
近くに ネズミの 足のかけらが 落ちていました`,
                              `...あなたは プリンを回収したあと ネズミを
証拠隠滅のために カマキリに食べさせたのです`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !0
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ロボット基部の設計書...
もしかして 姿を消す 機能が...！？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...間違えました
そのような 機能は ないと思います`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["家族集です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `家族集...
ネズミについては 書かれてなかったですよね`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...そうですね
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .exhaustive(),
            ),
            yield* K(
              [
                {
                  avatar: f.texture("objectHaruComment1"),
                  messages: ["...", "...そっかー"],
                },
                {
                  avatar: f.texture("objectFuyuComment1"),
                  messages: [
                    "最後に プリンを誰かに 食べられた風に見せ",
                    `もう１つ プリンを
もらおうと したんじゃないですか？`,
                  ],
                },
                {
                  avatar: f.texture("objectHaruComment1"),
                  messages: ["...", "..."],
                },
                {
                  avatar: f.texture("objectHaruComment8"),
                  messages: ["...わたしの負けだよ"],
                },
              ],
              t,
            ),
            Ag(i),
            !0
          );
        })
        .with("ロボットの基部を利用した", function* () {
          yield* K(
            [
              {
                avatar: f.texture("objectFuyuComment1"),
                messages: ["ロボットの基部を利用したのです"],
              },
              {
                avatar: f.texture("objectMugiComment4"),
                messages: [
                  `ちょっと待ってください！
ネズミではなく基部ですか？`,
                  "あの設計図は ネズミのパーツではないんですか？",
                ],
              },
              {
                avatar: f.texture("objectFuyuComment1"),
                messages: [
                  `はい あの設計図に書かれている ロボットの基部は
ネズミのパーツではありません`,
                ],
              },
            ],
            t,
          ),
            yield* xe(
              () =>
                ae(
                  "ネズミのパーツではないことを 示しているのは...",
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ネズミの穴です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ネズミの穴...
何か ネズミではない証拠が 見つかったのですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...間違えました ネズミの穴には
ネズミではない証拠は 見つかっていません`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["カマキリです"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `カマキリ...
何か ネズミではない証拠が 見つかったのですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: ["...間違えました"],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ロボット基部の設計書...
あれは ネズミの足の部分じゃ ないんですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...間違えました
確かに あれだけでは 不十分ですね`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: [
                              "家族集です",
                              `この資料には 新たにロボットを作ったら
専用の形式で まとめるように 書いてあります`,
                              `そして この資料には
ネズミに関する 記載がありません`,
                              `さいごに その資料に まとめられている形式と
ロボット基部の設計書の形式は 同じです`,
                              `つまり ロボット基部と思われた 設計書は
あれが 完成品であり`,
                              "ネズミはそもそも 作られていなかったのです",
                            ],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: ["そうだったんだ...！"],
                          },
                        ],
                        t,
                      ),
                      !0
                    );
                  })
                  .exhaustive(),
            ),
            yield* K(
              [
                {
                  avatar: f.texture("objectHaruComment1"),
                  messages: [
                    "...",
                    `ネズミが いなかったとして
そのロボット基部を どうやって 利用したのさ？`,
                  ],
                },
                {
                  avatar: f.texture("objectFuyuComment1"),
                  messages: [
                    `はい その基部を利用して プリンを運ばせて
プリンを 食べる場所を 変えたのです`,
                  ],
                },
              ],
              t,
            );
          const r = new Ot(e.eventManager, null);
          r.mainObjects.mantis.setMode("waiting");
          const o = new Oi(e.eventManager),
            A = new Vr(e.eventManager),
            h = r.mainObjects.haru,
            l = new hg([5, 3]);
          let d;
          yield* Pt(t, () => {
            (d = Ks(t)),
              h.setPosition([5, 3]),
              h.setDirection("up"),
              l.setPosition([5, 2]),
              l.setDirection("right"),
              r.objectManager.add(l),
              (r.spritePositionUpdater = new hi(h.pos)),
              Gt(i, r);
          }),
            yield* K(
              [
                {
                  avatar: f.texture("objectFuyuComment1"),
                  messages: [
                    `まず ハルは トイレに行く前に
ロボット基部に プリンを 持たせました`,
                    `そして プリンを持たないまま トイレに行き
ロボット基部に プリンを 持って来させたのです`,
                  ],
                },
              ],
              t,
            );
          const a = new Js([0, 0]);
          return (
            a.sprite.anchor.set(0, 0.2),
            yield* j(10),
            l.subCanvas.addChild(a.subCanvas),
            yield* j(10),
            yield* G(h, "right", () => !1),
            yield* G(h, "right", () => !1),
            yield* G(h, "right", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            r.objectManager.remove(h),
            yield* j(30),
            yield* K(
              [
                {
                  avatar: f.texture("objectMugiComment4"),
                  messages: [
                    `...な なるほど でも 基部がトイレに行くためには
扉を開けて 部屋を出る 必要がありますよ？`,
                  ],
                },
              ],
              t,
            ),
            yield* xe(
              () =>
                ae(
                  "トイレに運ぶ方法を示す てがかりは...",
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: [
                              "ネズミの穴です",
                              `小さな穴の先にある 空間
あれは トイレだったのです`,
                            ],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `なるほど！！
考えてみれば あそこの先は トイレですね！`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !0
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["カマキリです"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `カマキリ...
何か トイレに行く証拠が 見つかったのですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ロボット基部の設計書...
もしかして 基部からドアを開ける仕組みが...！？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["家族集です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `家族集...
ロボット基部について 書かれてなかったですよね`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...そうですね
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .exhaustive(),
            ),
            yield* B(
              `はい 基部は 誰も見ていない中
棚のそばにある 穴を通り ハルにプリンを届けました`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(10),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "right", () => !1),
            yield* G(l, "down", () => !1),
            yield* G(l, "right", () => !1),
            l.setDirection("down"),
            yield* j(10),
            r.objectManager.remove(l),
            yield* j(32),
            yield* K(
              [
                {
                  avatar: f.texture("objectHaruComment1"),
                  messages: [
                    `ちょっと待ってよ
あの小さい穴が トイレにつながっていたとして`,
                    "それを基部が運んだ 証拠は あるのかい？",
                  ],
                },
              ],
              t,
            ),
            yield* xe(
              () =>
                ae(
                  `はい
プリンを 基部がトイレまで 運んだ 証拠は...`,
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    yield* B(
                      "ネズミの穴です",
                      f.texture("objectFuyuComment1"),
                      t,
                    );
                    let u = () => {};
                    return (
                      yield* Pt(
                        t,
                        () => {
                          u = Oe(f.texture("cutsMouseHole"), t);
                        },
                        2,
                      ),
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: [
                              `トイレにつながる 穴の中に
プリンと 基部の足跡が 見つかりました`,
                            ],
                          },
                          {
                            avatar: f.texture("objectHaruComment1"),
                            messages: ["...！"],
                          },
                        ],
                        t,
                      ),
                      yield* Pt(
                        t,
                        () => {
                          u(),
                            a.setEmpty(),
                            A.objectManager.add(h),
                            A.objectManager.add(l),
                            h.setPosition([0, 1]),
                            h.setDirection("right"),
                            l.setPosition([1, 1]),
                            l.setDirection("left"),
                            (A.spritePositionUpdater = new hi(h.pos)),
                            Gt(i, A);
                        },
                        2,
                      ),
                      !0
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["カマキリです"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              "カマキリ...",
                              `そこから 基部が トイレに行く証拠が
見つかったのですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              "ロボット基部の設計書...",
                              `もしかして トイレに行くように
プログラムされていたことが わかったんですか！？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...いいえ 見つかっていません
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["家族集です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `家族集...
ロボット基部については 書かれてなかったですよね`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...そうですね
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .exhaustive(),
            ),
            yield* B(
              `そして トイレでプリンを食べたあとに
再び 基部に プリンの容器を 持たせて`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(10),
            l.setDirection("up"),
            A.objectManager.remove(l),
            yield* j(10),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            yield* G(h, "down", () => !1),
            A.objectManager.remove(h),
            yield* Pt(
              t,
              () => {
                Gt(i, o),
                  o.player.setPosition([7, 1]),
                  o.player.setDirection("right");
              },
              4,
            ),
            yield* B(
              `何も持たずに トイレから出たところで
帰ってきた 私と 鉢合わせたのです`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(30),
            h.setPosition([13, 1]),
            o.objectManager.add(h),
            yield* j(15),
            h.setDirection("left"),
            yield* j(30),
            yield* Pt(
              t,
              () => {
                Gt(i, r),
                  l.setPosition([5, 2]),
                  l.setDirection("right"),
                  r.objectManager.add(l);
              },
              4,
            ),
            yield* B(
              `その後 急いで部屋に戻り
基部から プリンの容器を 取り戻しました`,
              f.texture("objectFuyuComment1"),
              t,
            ),
            yield* j(30),
            h.setPosition([8, 8]),
            h.setDirection("up"),
            r.objectManager.add(h),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "up", () => !1),
            yield* G(h, "left", () => !1),
            yield* G(h, "left", () => !1),
            yield* j(15),
            a.subCanvas.removeFromParent(),
            yield* j(15),
            yield* B("なるほどー...", f.texture("objectMugiComment4"), t),
            yield* Pt(
              t,
              () => {
                Gt(i, e), d();
              },
              4,
            ),
            yield* B(
              `じゃー その 基部を連れてくれば いいじゃないか
基部は いま どこにいるの？`,
              f.texture("objectHaruComment1"),
              t,
            ),
            yield* xe(
              () =>
                ae(
                  "基部が いま どこにいるかを示す てがかりは...",
                  [...s],
                  f.texture("objectFuyuComment1"),
                  t,
                ),
              (c) =>
                de(c)
                  .with("ネズミの穴", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ネズミの穴です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ネズミの穴...
また トイレに 戻したということですか？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...間違えました
いまトイレに行っても 基部はいないでしょう`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("カマキリ", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: [
                              `カマキリに 食べられたのです
近くに 基部の 足のかけらが 落ちていました`,
                              `...あなたは プリンを回収したあと 基部を
証拠隠滅のために カマキリに食べさせたのです`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !0
                    );
                  })
                  .with("ロボット基部の設計書", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["ロボット基部の設計書です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `ロボット基部の設計書...
もしかして 姿を消す 機能が...！？`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...間違えました
そのような 機能は ないと思います`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .with("家族集", function* () {
                    return (
                      yield* K(
                        [
                          {
                            avatar: f.texture("objectFuyuComment1"),
                            messages: ["家族集です"],
                          },
                          {
                            avatar: f.texture("objectMugiComment4"),
                            messages: [
                              `家族集...
ロボット基部については 書かれてなかったですよね`,
                            ],
                          },
                          {
                            avatar: f.texture("objectFuyuComment7"),
                            messages: [
                              `...そうですね
間違えました`,
                            ],
                          },
                        ],
                        t,
                      ),
                      !1
                    );
                  })
                  .exhaustive(),
            ),
            yield* K(
              [
                {
                  avatar: f.texture("objectHaruComment1"),
                  messages: ["...", "..."],
                },
                {
                  avatar: f.texture("objectHaruComment9"),
                  messages: ["...私の負けだよ"],
                },
              ],
              t,
            ),
            ag(i),
            !0
          );
        })
        .exhaustive();
    },
  );
}
const ni = (i, t) => {
  const e = te(i);
  if (!(e instanceof Ot)) throw new Error("Invalid stage");
  (R.isMugiAddedToAssistant = !0),
    (R.isMugiAddedAsSuspect = !0),
    (R.isHaruAddedAsSuspect = !0),
    (R.isMantisAddedAsSuspect = !0),
    (R.isCatAddedAsSuspect = !0),
    (R.isCatAskedAboutSituation = !0),
    (R.isMouseAddedAsSuspect = !0),
    (R.isMouseHoleSpaceAddedAsClue = !0),
    (R.isMantisAddedAsClue = !0),
    (R.isMouseHoleAddedAsClue = !0),
    (R.isFlashlightAcquired = !0),
    (R.isDesignPaperAddedAsClue = !0),
    (R.isCanSolve = !0);
  const { player: s } = e;
  if (!s) throw new Error("Player is not set");
  const { mugi: n, haru: r, catMonitor: o } = e.mainObjects;
  n.stopFollowing(),
    e.eventManager.add(function* (A) {
      const h = yield* Ce(A);
      switch (((R.isSolveScene = !0), t)) {
        case "Mugi": {
          s.setPosition([4, 3]),
            s.setDirection("up"),
            n.setPosition([4, 2]),
            n.setDirection("down"),
            r.setPosition([5, 3]),
            r.setDirection("up");
          break;
        }
        case "Haru": {
          s.setPosition([4, 3]),
            s.setDirection("up"),
            n.setPosition([5, 3]),
            n.setDirection("up"),
            r.setPosition([4, 2]),
            r.setDirection("down");
          break;
        }
        case "Mantis": {
          s.setPosition([1, 3]),
            s.setDirection("left"),
            n.setPosition([1, 4]),
            n.setDirection("left"),
            r.setPosition([1, 2]),
            r.setDirection("left");
          break;
        }
        case "Cat": {
          s.setPosition([7, 2]),
            s.setDirection("up"),
            n.setPosition([8, 2]),
            n.setDirection("up"),
            r.setPosition([6, 2]),
            r.setDirection("up");
          break;
        }
        case "Mouse": {
          s.setPosition([11, 3]),
            s.setDirection("down"),
            n.setPosition([10, 3]),
            n.setDirection("down"),
            r.setPosition([9, 3]),
            r.setDirection("right");
          break;
        }
      }
      switch ((yield* h(), t)) {
        case "Mugi": {
          yield* B(
            "犯人は ムギ あなたですね",
            f.texture("objectFuyuComment1"),
            A,
          ),
            yield* B(
              `ハルが トイレに行っている間に プリンを取り
食べることができるのは あなたしかいません`,
              f.texture("objectFuyuComment1"),
              A,
            ),
            yield* pe(
              B(
                `ちょ ちょっと 待ってください
わたしじゃないですよ`,
                f.texture("objectMugiComment3"),
                A,
              ),
              (function* () {
                yield* Tt(n), yield* Tt(n);
              })(),
            ),
            yield* B(
              `カマキリや 穴に プリンがあったじゃないですか！
あれは どうしてついているんですか！`,
              f.texture("objectMugiComment3"),
              A,
            ),
            yield* B(
              `あ...あれは 犯人を ごまかすために
あなたが あえて つけたんですよ`,
              f.texture("objectFuyuComment4"),
              A,
            ),
            yield* B("ムギ いけないんだー", f.texture("objectHaruComment7"), A),
            yield* B("...", f.texture("objectMugiComment3"), A),
            yield* pe(
              B(
                "がんばって 助手 してたのに〜...",
                f.texture("objectMugiComment6"),
                A,
              ),
              (function* () {
                yield* Tt(n), yield* Tt(n);
              })(),
            ),
            Si(i);
          break;
        }
        case "Haru": {
          yield* pg(i, A);
          break;
        }
        case "Mantis": {
          yield* B(
            `犯人は カマキリですね
プリンが見つかったのが 証拠です`,
            f.texture("objectFuyuComment1"),
            A,
          ),
            yield* B(
              `おそらくネズミが プリンを動かして
カマキリがそれを捕らえて しまったのでしょう`,
              f.texture("objectFuyuComment1"),
              A,
            ),
            yield* B(
              `プリンを 食べられないように
設計 するべきだったかぁ〜`,
              f.texture("objectHaruComment5"),
              A,
            ),
            Si(i);
          break;
        }
        case "Cat": {
          yield* B("犯人は ネコですね", f.texture("objectFuyuComment1"), A),
            yield* B(
              `ハルが トイレに行って ムギと遊んだ後に
プリンを食べたのでしょう`,
              f.texture("objectFuyuComment1"),
              A,
            ),
            o.setStatus("speaking"),
            yield* P(
              `ちょっと待つのにゃ ぼくは ムギと遊んだあと
ムギの前で そのまま寝ていたのにゃ`,
              A,
            ),
            yield* P("もし食べていたら ムギに食べたことが バレバレにゃ", A),
            o.setStatus("play"),
            yield* B(
              `...確かに 遊んだあとは
そのままずっと そこで寝てたかもです`,
              f.texture("objectMugiComment4"),
              A,
            ),
            yield* B(
              `そ それは ムギは 勉強に集中していて
気づかなかっただけかもしれません`,
              f.texture("objectFuyuComment4"),
              A,
            ),
            yield* B(
              `それか...
...共犯？`,
              f.texture("objectFuyuComment4"),
              A,
            ),
            yield* pe(
              B(
                "...わ わたしは ほんとに 違いますからね！",
                f.texture("objectMugiComment3"),
                A,
              ),
              (function* () {
                yield* Tt(n), yield* Tt(n);
              })(),
            ),
            Si(i);
          break;
        }
        case "Mouse": {
          yield* B("犯人は ネズミですね", f.texture("objectFuyuComment1"), A),
            yield* B(
              `ハルが トイレに行っている間に
穴から出てきて プリンを食べたのでしょう`,
              f.texture("objectFuyuComment1"),
              A,
            ),
            yield* B(
              `ちょっと待ってください そのネズミは
いまどこにいるんですか`,
              f.texture("objectMugiComment4"),
              A,
            ),
            (yield* ae(
              `...それは
見つかったてがかりから 察するに...`,
              ["穴から逃げた", "カマキリに食べられた"],
              f.texture("objectFuyuComment1"),
              A,
            )) === "穴から逃げた"
              ? yield* B(
                  "このネズミの穴から 逃げたのでしょう",
                  f.texture("objectFuyuComment1"),
                  A,
                )
              : (yield* B(
                  "ま まさか カマキリに食べられ...",
                  f.texture("objectMugiComment3"),
                  A,
                ),
                yield* B(
                  `さすがに 家族を食べるようには 作ってないよ〜
わたしを なんだと 思っているのさ`,
                  f.texture("objectHaruComment2"),
                  A,
                ),
                yield* B(
                  "...では 穴から逃げちゃったんですかね",
                  f.texture("objectFuyuComment1"),
                  A,
                )),
            yield* B(
              `...なるほど！
では ネズミを探しにいきましょうか！`,
              f.texture("objectMugiComment4"),
              A,
            ),
            yield* B("...", f.texture("objectFuyuComment4"), A),
            yield* B(
              `...いえ 見つけたら 怒りましょう
もう 疲れちゃいました`,
              f.texture("objectFuyuComment4"),
              A,
            ),
            Si(i);
          break;
        }
      }
    });
};
class Ue {
  constructor(t, e, s, n) {
    (this.label = t),
      (this.message = e),
      (this.items = s),
      (this.isEnabled = n);
  }
}
class yt {
  constructor(t, e, s) {
    p(this, "action");
    (this.label = t),
      (this.isEnabled = s),
      (this.action = e ?? function* () {});
  }
}
class mg extends Ue {
  constructor() {
    super(
      "メモ：てがかり",
      "てがかりを 選択してください",
      [],
      () =>
        R.isMouseHoleAddedAsClue ||
        R.isMantisAddedAsClue ||
        R.isDesignPaperAddedAsClue ||
        R.isFamilyInfoRead,
    );
    p(this, "ratHole", new yg());
    p(this, "mantis", new Cg());
    p(this, "designPaper", new xg());
    p(this, "familyInfo", new wg());
    this.items = [
      this.ratHole,
      this.mantis,
      this.designPaper,
      this.familyInfo,
      new yt("閉じる", null, () => !0),
    ];
  }
}
class yg extends yt {
  constructor() {
    super(
      "ネズミの穴",
      function* (t) {
        yield* P(
          `部屋の右にある 小さな穴
おそらく ネズミが使用している`,
          t,
        ),
          R.isMouseHoleSpaceAddedAsClue &&
            (yield* P(
              `穴の先には 大きな空間がある
またその付近には プリンのかけらが落ちており`,
              t,
            ),
            yield* P("プリンには ネズミのような 足あとが ついていた", t));
      },
      () => R.isMouseHoleAddedAsClue,
    );
  }
}
let Cg = class extends yt {
  constructor() {
    super(
      "カマキリ",
      function* (t) {
        yield* P(
          `カマキリの付近に 機械のかけらが落ちていた
ネズミの足のような形で プリンが付着している`,
          t,
        );
      },
      () => R.isMantisAddedAsClue,
    );
  }
};
class xg extends yt {
  constructor() {
    super(
      "ロボット基部の設計書",
      function* (t) {
        yield* P(
          `ロボットの下部構造の 設計書
足は 小動物のような 形をしている`,
          t,
        ),
          yield* P("また ある程度の重さを 耐えることができるらしい", t);
      },
      () => R.isDesignPaperAddedAsClue,
    );
  }
}
class wg extends yt {
  constructor() {
    super(
      "家族集",
      function* (t) {
        yield* P(
          `ロボットの仕様や 動作について 専用の形式でまとめた資料集
ネコ カマキリ がまとめられている`,
          t,
        ),
          yield* P(
            `実際にロボットを作成したら ここに保存をする
保存をしたら 削除することはできない`,
            t,
          );
      },
      () => R.isFamilyInfoRead,
    );
  }
}
class bg extends Ue {
  constructor() {
    super(
      "メモ：容疑者",
      "容疑者を 選択してください",
      [],
      () => R.isMugiAddedToAssistant,
    );
    p(this, "mantis", new Bg());
    p(this, "catMonitor", new Eg());
    p(this, "mugi", new vg());
    p(this, "haru", new Ig());
    p(this, "mouse", new Mg());
    this.items = [
      this.mugi,
      this.haru,
      this.mantis,
      this.catMonitor,
      this.mouse,
      new yt("閉じる", null, () => !0),
    ];
  }
}
class Eg extends yt {
  constructor() {
    super("ネコ", null, () => R.isCatAddedAsSuspect),
      (this.action = function* (t) {
        yield* P(
          `ネコ ロボット
ネコにそっくりなロボットに なることができる`,
          t,
        ),
          R.isCatAskedAboutSituation &&
            (yield* P(
              `事件発生前 ハルが部屋をでるまで ムギとあそんでいた
その後 ハルが部屋をでた以降は モニターに戻り 寝ていた`,
              t,
            ));
      });
  }
}
class vg extends yt {
  constructor() {
    super("ムギ", null, () => R.isMugiAddedAsSuspect),
      (this.action = function* (t) {
        if (R.isCatAskedAboutSituation) {
          yield* P(
            `ムギ 高校１年生
事件発生前 ハルが部屋をでるまで ネコとあそんでいた`,
            t,
          ),
            yield* P("その後 ハルが部屋をでた以降は テスト勉強をしていた", t);
          return;
        }
        yield* P(
          `ムギ 高校１年生
事件発生時は テスト勉強で 机に向かっていた`,
          t,
        );
      });
  }
}
class Bg extends yt {
  constructor() {
    super(
      "カマキリ",
      function* (t) {
        yield* P(
          `カマキリ ロボット
動くことができず 事件発生時も そこにいた`,
          t,
        ),
          R.isFamilyInfoRead
            ? yield* P(
                `ゴミや機械など なんでも食べることができるが
家族集に登録されている ロボットは 食べない`,
                t,
              )
            : yield* P("ゴミや機械など なんでも食べることができる", t);
      },
      () => R.isMantisAddedAsSuspect,
    );
  }
}
class Ig extends yt {
  constructor() {
    super(
      "ハル",
      function* (t) {
        yield* P(
          `ハル 高校２年生
プリンを机に置いて トイレに行った`,
          t,
        ),
          yield* P(
            `その後 かえってくると
プリンの中身が空になっていることに 気がついた`,
            t,
          );
      },
      () => R.isHaruAddedAsSuspect,
    );
  }
}
class Mg extends yt {
  constructor() {
    super(
      "ネズミ",
      function* (t) {
        yield* P(
          `ネズミ ロボット
最近 作られたらしい`,
          t,
        ),
          yield* P("家らしき穴はあるが ネズミと 出会っていない", t);
      },
      () => R.isMouseAddedAsSuspect,
    );
  }
}
class Sg {
  constructor() {
    p(this, "memoSuspect", new bg());
    p(this, "memoClue", new mg());
    p(this, "talk", new Dg());
    p(
      this,
      "item",
      new Ue(
        "アイテム",
        "アイテムを 選択してください",
        [
          new yt(
            "懐中電灯",
            function* (t) {
              yield* P(
                `懐中電灯
暗いところを 照らすことができる`,
                t,
              );
            },
            () => R.isFlashlightAcquired,
          ),
          new yt("閉じる", null, () => !0),
        ],
        () => !0,
      ),
    );
    p(
      this,
      "menuItem",
      new Ue(
        "メニュー",
        "メニューを 選択してください",
        [
          this.memoSuspect,
          this.memoClue,
          this.talk,
          this.item,
          new yt("閉じる", null, () => !0),
        ],
        () => !0,
      ),
    );
  }
  addItem(t) {
    this.menuItem.items = [
      ...this.menuItem.items.slice(0, -1),
      t,
      new yt("閉じる", null, () => !0),
    ];
  }
  *startMenuEvent(t) {
    let e = this.menuItem;
    for (;;) {
      if (!(e instanceof Ue)) return;
      const s = e.items,
        n = yield* En(
          e.message,
          s.filter((o) => o.isEnabled()).map((o) => o.label),
          t,
        ),
        r = s.find((o) => o.label === n);
      if (!r) return;
      if (r instanceof Ue) e = r;
      else if (r instanceof yt) {
        yield* r.action(t);
        return;
      }
    }
  }
}
const Qg = (i) =>
  new Ue(
    "推理",
    "犯人を 選択してください",
    [
      new yt(
        "ムギ",
        function* () {
          ni(i, "Mugi"), yield;
        },
        () => !0,
      ),
      new yt(
        "ハル",
        function* () {
          ni(i, "Haru"), yield;
        },
        () => !0,
      ),
      new yt(
        "カマキリ",
        function* () {
          ni(i, "Mantis"), yield;
        },
        () => !0,
      ),
      new yt(
        "ネコ",
        function* () {
          ni(i, "Cat"), yield;
        },
        () => !0,
      ),
      new yt(
        "ネズミ",
        function* () {
          ni(i, "Mouse"), yield;
        },
        () => !0,
      ),
      new yt("閉じる", null, () => !0),
    ],
    () => R.isCanSolve,
  );
class Dg extends yt {
  constructor() {
    super("はなす", null, () => !0);
    p(this, "cursorFindingClue", 0);
    p(this, "cursorSolve", 0);
    this.action = function* (e) {
      if (!R.isMugiAddedToAssistant) {
        yield* P("話す相手が いないようだ", e);
        return;
      }
      if (!R.isFindingClue) {
        yield* B(
          `行き詰まったら ぜひ 話しかけてください！
助手として いい助言ができるよう がんばります♪`,
          f.texture("objectMugiComment2"),
          e,
        ),
          yield* B(
            `まずは あやしそうな 人やロボットがいたら
どんどん 聞いていきましょう！`,
            f.texture("objectMugiComment1"),
            e,
          );
        return;
      }
      if (!R.isCanSolve) {
        const n = [
          {
            avatar: f.texture("objectMugiComment1"),
            messages: [
              `気になるところが あれば
どんどん 確認していきましょう！`,
            ],
          },
          ...(R.isMouseHoleAddedAsClue
            ? []
            : [
                {
                  avatar: f.texture("objectMugiComment4"),
                  messages: [
                    `ネズミの穴が タンスのそばにあったはずです！
壁を 調べてみてください`,
                  ],
                },
              ]),
          ...(R.isMouseHoleAddedAsClue && !R.isMouseHoleSpaceAddedAsClue
            ? [
                {
                  avatar: f.texture("objectMugiComment4"),
                  messages: ["暗い穴を 確認できるもの ないかな..."],
                },
              ]
            : []),
          ...(R.isDesignPaperAddedAsClue
            ? []
            : [
                {
                  avatar: f.texture("objectMugiComment4"),
                  messages: ["何か重要なメモが 見つかると 最高ですね...！"],
                },
              ]),
          ...(R.isMantisAddedAsClue
            ? []
            : [
                {
                  avatar: f.texture("objectMugiComment4"),
                  messages: [
                    `あれ あのカマキリ
さっきまで 何か食べてましたよね？`,
                  ],
                },
              ]),
        ];
        (this.cursorFindingClue %= n.length),
          yield* K([n[this.cursorFindingClue]], e),
          (this.cursorFindingClue = this.cursorFindingClue + 1);
        return;
      }
      const s = [
        {
          avatar: f.texture("objectMugiComment1"),
          messages: ["犯人がわかったら バシッと突き止めましょう！"],
        },
        {
          avatar: f.texture("objectMugiComment4"),
          messages: [
            `...うーん だれが犯人 なのでしょうか
フユさん わかりました？`,
          ],
        },
        {
          avatar: f.texture("objectMugiComment1"),
          messages: [
            `推理に 行き詰まったら
ちょっとだけ 捜査 しませんか？`,
          ],
        },
      ];
      (this.cursorSolve %= s.length),
        yield* K([s[this.cursorSolve]], e),
        (this.cursorSolve = this.cursorSolve + 1);
    };
  }
}
class Ot {
  constructor(t, e = new ma([6, 5])) {
    p(this, "subCanvas", new _());
    p(this, "objectManager");
    p(this, "menu", new Sg());
    p(this, "map", new og());
    p(this, "spritePositionUpdater", new Ea());
    p(this, "player", null);
    p(this, "mainObjects", {
      mugi: new $f([4, 4]),
      haru: new wa([5, 2]),
      mantis: new Kf([0, 3]),
      catMonitor: new Vf([7, 1]),
      ratHole: new eg([11, 4]),
      codeBox: new qf([6, 1]),
      designPaper: new Hr([3, 1]),
      specification: new sg([0, 1]),
      cat: new Yf([3, 5]),
    });
    this.eventManager = t;
    const s = new rg([8, 9]);
    (s.playerExamineEvent = function* (n) {
      yield* P("部屋を出る必要は ないようだ", n);
    }),
      (this.objectManager = new xn([
        this.mainObjects.mugi,
        this.mainObjects.ratHole,
        this.mainObjects.specification,
        new Hf([3, 4]),
        new lt([0, 0]),
        new lt([1, 0]),
        new lt([2, 0]),
        new lt([3, 0]),
        new lt([4, 0]),
        new lt([5, 0]),
        new lt([5, 0]),
        new lt([6, 0]),
        new lt([7, 0]),
        new lt([8, 0]),
        new lt([9, 0]),
        new lt([10, 0]),
        new lt([11, 0]),
        new Wf([4, 5]),
        new zf([1, 6]),
        new Lf([0, 1]),
        this.mainObjects.codeBox,
        new Zf([4, 4]),
        this.mainObjects.catMonitor,
        new tg([7, 1]),
        new Es([5, 4]),
        new Es([5, 1]),
        new Es([4, 5], "2"),
        this.mainObjects.designPaper,
        new Hr([5, 1]),
        new ng([3, 1]),
        new _f([4, 1]),
        new ig([11, 1]),
        this.mainObjects.mantis,
        this.mainObjects.haru,
        this.mainObjects.cat,
        s,
      ])),
      e && this.setPlayer(e),
      this.subCanvas.addChild(this.map.container),
      this.subCanvas.addChild(this.objectManager.subCanvas);
  }
  setPlayer(t) {
    (this.player = t),
      (this.spritePositionUpdater = new pa(this.player)),
      t.setObjectController(new jf(t, ba(this))),
      this.objectManager.add(t);
  }
  update(t) {
    if ((t == null ? void 0 : t.keyState.MENU) === "PRESSED") {
      const e = this.menu;
      this.eventManager.start(function* (s) {
        yield* e.startMenuEvent(s);
      });
    }
    if ((t == null ? void 0 : t.keyState.ACTION) === "PRESSED" && this.player) {
      const e = this.objectManager.findPlayerExamineEventObject(
        xa(this.player.getPosition(), this.player.getDirection()),
      );
      e && this.eventManager.start(e.playerExamineEvent);
    }
    this.objectManager.update(t),
      this.subCanvas.position.set(
        ...this.spritePositionUpdater.next([
          this.subCanvas.x,
          this.subCanvas.y,
        ]),
      );
  }
  close() {
    this.subCanvas.destroy();
  }
}
const Pg = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    const { player: e } = t;
    if (!e) throw new Error("Player is not set");
    (R.isFindingClue = !0),
      (R.isMugiAddedToAssistant = !0),
      (R.isMugiAddedAsSuspect = !0),
      (R.isHaruAddedAsSuspect = !0),
      (R.isMantisAddedAsSuspect = !0),
      (R.isCatAddedAsSuspect = !0),
      (R.isCatAskedAboutSituation = !0),
      (R.isMouseAddedAsSuspect = !0),
      (R.isMouseHoleSpaceAddedAsClue = !0),
      (R.isMantisAddedAsClue = !0),
      (R.isMouseHoleAddedAsClue = !0),
      (R.isFlashlightAcquired = !0),
      (R.isDesignPaperAddedAsClue = !0),
      t.mainObjects.mugi.followObject(e, t),
      t.eventManager.add(function* (r) {
        const o = yield* Ce(r);
        yield* j(32),
          yield* o(),
          yield* B(
            `...てがかりは このくらいですかね
あとは 犯人を 捕まえましょう！`,
            f.texture("objectMugiComment1"),
            r,
          ),
          yield* P(
            `情報を整理して 犯人を特定したら
メニューから 「推理」を 選択してください`,
            r,
          ),
          (R.isCanSolve = !0),
          t.menu.addItem(Qg(i));
      });
    let s = !1;
    const n = { about: !1, cat: !1, cat2: !1, mantis: !1 };
    (t.mainObjects.specification.playerExamineEvent = function* (r) {
      for (
        s ||
        (yield* P("本や資料が 並べられている", r),
        yield* B("...あっ！", f.texture("objectMugiComment4"), r),
        yield* B(
          `...
...`,
          f.texture("objectMugiComment4"),
          r,
        ),
        yield* B(
          `...フユさん これ 見てください
ネコや カマキリ について まとめられているようです`,
          f.texture("objectMugiComment4"),
          r,
        ),
        yield* P(
          `ハルが持っている タブレットには
「家族集」と 書かれている`,
          r,
        ),
        (s = !0));
        ;

      ) {
        const o = yield* En(
          "どの資料を 読みますか",
          [
            "家族集について",
            "ネコ(モニター型)",
            "ネコ(生物型)",
            "カマキリ",
            "閉じる",
          ],
          r,
        );
        switch (o) {
          case "家族集について": {
            yield* P(
              `ロボットの仕様や 動作について
まとめた資料集`,
              r,
            ),
              yield* P(
                `新たに作成したら この資料集に 専用の形式で保存する
一度保存したら 削除することは できない`,
                r,
              ),
              yield* B(
                `つまり 新たに作ったロボットを
家族として迎え入れているんですね！`,
                f.texture("objectMugiComment4"),
                r,
              ),
              yield* B(
                `ハルさん 宿題とかも しないタイプなのに
こういうところは しっかりしてるんですね`,
                f.texture("objectMugiComment4"),
                r,
              ),
              yield* B("推せる...", f.texture("objectMugiComment5"), r),
              (n.about = !0);
            break;
          }
          case "ネコ(モニター型)": {
            yield* P(
              `ネコ 20xx
モニターに 耳と尻尾を 付けたネコ`,
              r,
            ),
              yield* P("言葉での会話ができる", r),
              yield* P(
                `ネコの モニターと中身は 分離する設計になっており
中身のみ ゲーム機や 別のモニターに 移ることができる`,
                r,
              ),
              yield* P(
                `ver 2.0.0
ネコの 生物型に 移動できるようにした`,
                r,
              ),
              (n.cat = !0);
            break;
          }
          case "ネコ(生物型)": {
            yield* P(
              `ネコ 20xx
ネコの形をした 生物型ロボット`,
              r,
            ),
              yield* P(
                `中身は実装しておらず
モニター型のネコの 移動先として 用意してある`,
                r,
              ),
              yield* P(
                `言葉を理解することは できるが
話すことは できない`,
                r,
              ),
              (n.cat2 = !0);
            break;
          }
          case "カマキリ": {
            yield* P(
              `カマキリ 20xx
カマキリの形をした 生物型ロボット`,
              r,
            ),
              yield* P("その場から 動くことはできない", r),
              yield* P(
                `虫や肉などの 食べ物をはじめとした
金属や プラスチックなど なんでも 食べることができる`,
                r,
              ),
              yield* P(
                `一方で 人間や
この資料に登録されている ネコなどのロボットは 食べない`,
                r,
              ),
              yield* B(
                `へぇー 登録されているロボットは 食べないように
なっているんですね`,
                f.texture("objectMugiComment4"),
                r,
              ),
              n.mantis ||
                (yield* B("メモしよ", f.texture("objectMugiComment4"), r),
                gt.play("info"),
                yield* P("カマキリの情報を 更新しました", r),
                (n.mantis = !0));
            break;
          }
        }
        if (o === "閉じる") {
          n.about &&
            n.mantis &&
            (yield* B(
              `(この資料を 読む限り
ネズミは 一度も 登録されていない ようですね...)`,
              f.texture("objectFuyuComment1"),
              r,
            ),
            yield* B(
              `(そして 机の上の資料と 形式が似ていることから
小動物の 足部分はあれが 完成品...？)`,
              f.texture("objectFuyuComment1"),
              r,
            ),
            yield* B(
              "(つまり カマキリに食べられていたのは...)",
              f.texture("objectFuyuComment1"),
              r,
            ),
            (R.isFamilyInfoRead = !0));
          break;
        }
      }
    }),
      (t.mainObjects.haru.playerExamineEvent = function* (r) {
        yield* B(
          `いったい だれが...
わたしの プリンを...`,
          f.texture("objectHaruComment10"),
          r,
        );
      }),
      (t.mainObjects.catMonitor.playerExamineEvent = function* (r) {
        t.mainObjects.catMonitor.setStatus("speaking"),
          yield* P(
            `ロボットだから
眠らなくていいように して欲しいにゃ`,
            r,
          ),
          t.mainObjects.catMonitor.setStatus("play");
      }),
      (t.mainObjects.mantis.playerExamineEvent = function* (r) {
        yield* P(
          `カマキリのロボットだ
じっと動かずに えものを待っているようだ`,
          r,
        ),
          yield* P(
            `カマキリの足元には
プリンと 小動物の足のようなものが 落ちている`,
            r,
          );
      }),
      (t.mainObjects.cat.playerExamineEvent = function* (r) {
        yield* P(
          `ネコのロボットだ
眠っているようだ`,
          r,
        );
      }),
      (t.mainObjects.ratHole.playerExamineEvent = function* (r) {
        yield* P("ネズミの穴だ", r);
        const o = Oe(f.texture("cutsMouseHole"), r);
        yield* j(16),
          yield* P("ネズミのいる気配はない", r),
          yield* P(
            `穴の先付近には 小動物の足跡がついた
プリンのかけらが おちている`,
            r,
          ),
          o();
      }),
      (t.mainObjects.designPaper.playerExamineEvent = function* (r) {
        yield* P("ロボット基部の設計書だ", r);
        const o = Oe(f.texture("cutsDesignPaper"), r);
        yield* j(16),
          yield* P(
            `小動物のような 足をしている
ある程度の重さを 耐えて動くことができるらしい`,
            r,
          ),
          o();
      });
  },
  Rg = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    const { player: e } = t;
    if (!e) throw new Error("Player is not set");
    const { mantis: s, ratHole: n, designPaper: r } = t.mainObjects;
    (R.isFindingClue = !0),
      (R.isMugiAddedToAssistant = !0),
      (R.isMugiAddedAsSuspect = !0),
      (R.isHaruAddedAsSuspect = !0),
      (R.isMantisAddedAsSuspect = !0),
      (R.isCatAddedAsSuspect = !0),
      (R.isCatAskedAboutSituation = !0),
      (R.isMouseAddedAsSuspect = !0),
      t.mainObjects.mugi.followObject(e, t),
      (s.playerExamineEvent = function* (o) {
        yield* P(
          `カマキリのロボットだ
じっと動かずに えものを待っているようだ`,
          o,
        ),
          yield* B(
            "...ムギさん これみてください！",
            f.texture("objectMugiComment4"),
            o,
          ),
          yield* P("カマキリの そばに 何か あるようだ", o),
          yield* P(
            `機械のかけらを 見つけた
ネズミの足のような形で プリンが付着している`,
            o,
          ),
          yield* B(
            `...！？
どうしてここに...？`,
            f.texture("objectFuyuComment2"),
            o,
          ),
          R.isMantisAddedAsClue ||
            ((R.isMantisAddedAsClue = !0),
            gt.play("info"),
            yield* P("メモに てがかりを 追加しました", o),
            vs(i));
      }),
      (n.playerExamineEvent = function* (o) {
        if (
          (R.isMouseHoleAddedAsClue ||
            (yield* B(
              "たしか この辺に ネズミの穴があったはずです",
              f.texture("objectMugiComment4"),
              o,
            ),
            yield* j(16),
            e.setDirection("down"),
            yield* j(32),
            yield* B("...あ これですね", f.texture("objectFuyuComment1"), o),
            yield* P(
              `ネズミの穴を 見つけた
なかは暗くて 見ることができない`,
              o,
            )),
          !R.isFlashlightAcquired)
        )
          yield* j(16),
            yield* B(
              `...ネズミがいる 気配は ないですね...
穴の先も 広いのかも`,
              f.texture("objectMugiComment4"),
              o,
            ),
            R.isMouseHoleAddedAsClue ||
              ((R.isMouseHoleAddedAsClue = !0),
              gt.play("info"),
              yield* P("メモに てがかりを 追加しました", o));
        else {
          e.setDirection("down"),
            yield* B(
              "懐中電灯で ネズミの穴を 照らしてみます",
              f.texture("objectFuyuComment1"),
              o,
            ),
            yield* P("懐中電灯で ネズミの穴を 照らした", o);
          const A = Oe(f.texture("cutsMouseHole"), o);
          yield* j(64),
            yield* P(
              `ネズミのいる 気配はない...
ネズミの穴の先には 大きな空間が あるようだ`,
              o,
            ),
            yield* P("なんと 付近には プリンのかけらも 落ちている", o),
            yield* B(
              "ネズミっぽい足あとが プリンについてますね...！",
              f.texture("objectMugiComment4"),
              o,
            ),
            A(),
            R.isMouseHoleSpaceAddedAsClue ||
              ((R.isMouseHoleAddedAsClue = !0),
              (R.isMouseHoleSpaceAddedAsClue = !0),
              gt.play("info"),
              yield* P("メモに てがかりを 追加しました", o),
              vs(i));
        }
      }),
      (r.playerExamineEvent = function* (o) {
        yield* B(
          "...これは 設計書ですかね",
          f.texture("objectFuyuComment1"),
          o,
        );
        const A = Oe(f.texture("cutsDesignPaper"), o);
        yield* j(16),
          yield* P(
            `基部 20xx
足が特徴的な ロボット基部`,
            o,
          ),
          yield* P("ある程度の重さに耐え 動くことができる", o),
          yield* B(
            `足が ネズミっぽい！
ネズミのロボットの一部分 ですかね？`,
            f.texture("objectMugiComment4"),
            o,
          ),
          R.isDesignPaperAddedAsClue
            ? A()
            : (gt.play("info"),
              yield* P("メモに てがかりを 追加しました", o),
              A(),
              (R.isDesignPaperAddedAsClue = !0),
              vs(i));
      });
  };
function vs(i) {
  Fg() && Pg(i);
}
const Fg = () =>
    R.isMantisAddedAsClue &&
    R.isMouseHoleAddedAsClue &&
    R.isMouseHoleSpaceAddedAsClue &&
    R.isDesignPaperAddedAsClue,
  Tg = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    const { player: e } = t;
    if (!e) throw new Error("Player is not set");
    const { mugi: s, mantis: n } = t.mainObjects;
    s.stopFollowing(),
      t.eventManager.add(function* (r) {
        const o = yield* Ce(r);
        n.setMode("waiting"),
          (R.isMugiAddedToAssistant = !0),
          (R.isMugiAddedAsSuspect = !0),
          (R.isHaruAddedAsSuspect = !0),
          (R.isMantisAddedAsSuspect = !0),
          (R.isCatAddedAsSuspect = !0),
          (R.isCatAskedAboutSituation = !0),
          e.setPosition([7, 4]),
          e.setDirection("right"),
          s.setPosition([8, 4]),
          s.setDirection("left"),
          yield* j(32),
          yield* o(),
          yield* j(32),
          yield* B(
            "...容疑者を 整理しましょう",
            f.texture("objectFuyuComment1"),
            r,
          ),
          yield* B(
            `はい！ 犯人として 考えられるのは
ハルさん ネコ カマキリ...`,
            f.texture("objectMugiComment1"),
            r,
          ),
          yield* B("...と わたしです", f.texture("objectMugiComment1"), r),
          yield* B(
            "...確かに この４名が あり得そうですね",
            f.texture("objectFuyuComment1"),
            r,
          ),
          yield* B(
            `...はっ！ そういえば
ネズミも いるかもです！`,
            f.texture("objectMugiComment4"),
            r,
          ),
          yield* B(
            `...ネズミ？
...それは この部屋に でるということですか？`,
            f.texture("objectFuyuComment4"),
            r,
          ),
          yield* B(
            `ハルさんから 聞きました
ネズミのロボットが 新たに 作られたんです`,
            f.texture("objectMugiComment1"),
            r,
          ),
          yield* j(16),
          s.setDirection("up"),
          yield* j(32),
          s.setDirection("right"),
          yield* j(32),
          yield* B(
            `まだ みたことはないですが
ネズミのおうちが この辺に あるはずです！`,
            f.texture("objectMugiComment1"),
            r,
          ),
          yield* B(
            "壁に穴が 空いているのを 見ました",
            f.texture("objectMugiComment1"),
            r,
          ),
          s.setDirection("left"),
          yield* B(
            `...穴まで 作ったのですね
あとで 怒っておきます`,
            f.texture("objectFuyuComment4"),
            r,
          ),
          yield* j(16),
          yield* B(
            "とりあえず ネズミも 容疑者としてメモしましょう",
            f.texture("objectFuyuComment4"),
            r,
          ),
          yield* B("了解です♪", f.texture("objectMugiComment2"), r),
          (R.isMouseAddedAsSuspect = !0),
          gt.play("info"),
          yield* P("ネズミを メモに追加しました", r),
          yield* j(32),
          yield* B(
            "...容疑者は これで終わりですね",
            f.texture("objectFuyuComment1"),
            r,
          ),
          yield* B(
            `次は てがかりとなりそうな ものがないか
部屋を 調べてみましょうか`,
            f.texture("objectFuyuComment1"),
            r,
          ),
          yield* B("はい 探偵！", f.texture("objectMugiComment2"), r),
          Rg(i);
      });
  },
  kg = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    const { player: e } = t;
    if (!e) throw new Error("Player is not set");
    const {
      mugi: s,
      haru: n,
      mantis: r,
      cat: o,
      catMonitor: A,
      codeBox: h,
    } = t.mainObjects;
    (R.isMugiAddedToAssistant = !0),
      (R.isMugiAddedAsSuspect = !0),
      s.followObject(e, t),
      (s.playerExamineEvent = null),
      (n.playerExamineEvent = function* (l) {
        const d = qs(n.pos, e.pos);
        n.setDirection(d),
          yield* B(
            "...念のため 事の経緯 聞いてもいいですか？",
            f.texture("objectFuyuComment4"),
            l,
          ),
          yield* B("...うん", f.texture("objectHaruComment5"), l);
        const a = yield* Ce(l),
          c = Ks(l),
          u = new Ot(t.eventManager, null);
        u.mainObjects.haru.setPosition([5, 3]),
          (u.spritePositionUpdater = new hi(u.mainObjects.haru.pos)),
          Gt(i, u),
          yield* a(),
          yield* B(
            `...家に帰って ムギの 勉強をみていたら
冷蔵庫に プリンがあったことを 思い出したの`,
            f.texture("objectHaruComment1"),
            l,
          ),
          yield* j(10),
          yield* G(u.mainObjects.haru, "right", () => !1),
          yield* G(u.mainObjects.haru, "right", () => !1),
          yield* G(u.mainObjects.haru, "right", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1);
        const g = new Js([5, 1]);
        if (
          (yield* Pt(
            l,
            () => {
              u.mainObjects.haru.setPosition([5, 2]),
                u.mainObjects.haru.setDirection("up"),
                u.objectManager.add(g);
            },
            2,
          ),
          yield* B(
            `そして食べようとしたとき トイレに行きたくなって
プリンを置いて トイレに行って`,
            f.texture("objectHaruComment1"),
            l,
          ),
          yield* j(10),
          yield* G(u.mainObjects.haru, "right", () => !1),
          yield* G(u.mainObjects.haru, "right", () => !1),
          yield* G(u.mainObjects.haru, "right", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* G(u.mainObjects.haru, "down", () => !1),
          yield* Pt(
            l,
            () => {
              u.mainObjects.haru.setPosition([8, 8]),
                u.mainObjects.haru.setDirection("up"),
                g.setEmpty();
            },
            2,
          ),
          yield* B(
            `...そして 部屋に 戻ったら
プリンの容器が 空になっていたんだよー`,
            f.texture("objectHaruComment5"),
            l,
          ),
          yield* j(10),
          yield* G(u.mainObjects.haru, "up", () => !1),
          yield* G(u.mainObjects.haru, "up", () => !1),
          yield* G(u.mainObjects.haru, "up", () => !1),
          yield* G(u.mainObjects.haru, "up", () => !1),
          yield* G(u.mainObjects.haru, "up", () => !1),
          yield* G(u.mainObjects.haru, "up", () => !1),
          yield* G(u.mainObjects.haru, "left", () => !1),
          yield* G(u.mainObjects.haru, "left", () => !1),
          yield* G(u.mainObjects.haru, "left", () => !1),
          u.mainObjects.haru.setDirection("up"),
          yield* Tt(u.mainObjects.haru),
          yield* Tt(u.mainObjects.haru),
          yield* j(10),
          yield* Pt(
            l,
            () => {
              Gt(i, t), c();
            },
            2,
          ),
          yield* B("...なるほど", f.texture("objectFuyuComment1"), l),
          yield* B(
            `ちなみに トイレに行く時に
プリンは持っていってないですよね？`,
            f.texture("objectFuyuComment1"),
            l,
          ),
          yield* B(
            "そんなの 当たり前じゃんかー",
            f.texture("objectHaruComment5"),
            l,
          ),
          yield* B(
            `たしかに 部屋をでるとき
何かを もってる感じは なかったですね`,
            f.texture("objectMugiComment1"),
            l,
          ),
          R.isHaruAddedAsSuspect)
        )
          yield* B("...なるほど", f.texture("objectFuyuComment1"), l);
        else if (
          (yield* B(
            `...なるほど
とりあえず メモしておきましょうか`,
            f.texture("objectFuyuComment1"),
            l,
          ),
          gt.play("info"),
          yield* P("ハルを メモに追加しました", l),
          (R.isHaruAddedAsSuspect = !0),
          Bs())
        ) {
          yield* Is(i, l);
          return;
        }
      }),
      (r.playerExamineEvent = function* (l) {
        if (
          (yield* P(
            `カマキリのロボットだ
何か 機械のようなものを 食べているようだ`,
            l,
          ),
          yield* B(
            "...このカマキリ 確か なんでも食べるんでしたよね",
            f.texture("objectFuyuComment1"),
            l,
          ),
          yield* B(
            `そうです！
虫だけではなく ゴミや機械だってたべてくれます！`,
            f.texture("objectMugiComment1"),
            l,
          ),
          yield* B(
            `いままで 多くの試作品が
たべられているのを見ました！`,
            f.texture("objectMugiComment1"),
            l,
          ),
          yield* B(
            `...今回のプリンも 食べるでしょう
ただ このカマキリ 動くことはなさそうです`,
            f.texture("objectFuyuComment1"),
            l,
          ),
          !R.isMantisAddedAsSuspect &&
            (gt.play("info"),
            yield* P("カマキリを メモに追加しました", l),
            (R.isMantisAddedAsSuspect = !0),
            Bs()))
        ) {
          yield* Is(i, l);
          return;
        }
      }),
      (o.playerExamineEvent = function* (l) {
        yield* P(
          `ネコのロボットだ
どうやら 眠っているようだ`,
          l,
        ),
          yield* B(
            "この子は 新たな住人 なのですか？",
            f.texture("objectFuyuComment1"),
            l,
          ),
          yield* B(
            `いえ この子は 机のそばにある
モニター型のネコと 中身は同じなんです`,
            f.texture("objectMugiComment1"),
            l,
          ),
          yield* B("...中身が同じ？", f.texture("objectFuyuComment1"), l),
          yield* B(
            `はい どうやら この子が起きている時は
モニターのネコは 眠っていて`,
            f.texture("objectMugiComment1"),
            l,
          ),
          yield* B(
            `モニターのネコが 起きている時は
この子は 眠るようです`,
            f.texture("objectMugiComment1"),
            l,
          ),
          yield* B(
            `...なるほど
行き来が できるんですね`,
            f.texture("objectFuyuComment1"),
            l,
          ),
          yield* B(
            `はい！ 話すことはできませんが
言葉は通じるので かわいいですよ♪`,
            f.texture("objectMugiComment2"),
            l,
          ),
          yield* B(
            "...いつか 話せるようになるかもしれませんね",
            f.texture("objectFuyuComment1"),
            l,
          );
      }),
      (A.playerExamineEvent = function* (l) {
        for (
          yield* P(
            `ネコのロボットだ
顔の部分は モニターになっている`,
            l,
          ),
            A.setStatus("speaking"),
            yield* P("こんにちはにゃ どうかしたかにゃ？", l),
            A.setStatus("play");
          ;

        ) {
          switch (
            yield* En(
              "何を ききますか？",
              [
                "プリンは食べられる？",
                ...(R.isCatAddedAsSuspect ? ["事件前後"] : []),
                "やめる",
              ],
              l,
            )
          ) {
            case "プリンは食べられる？": {
              A.setStatus("speaking"),
                yield* P("食べられるにゃ", l),
                yield* P(
                  `このまえ ご主人が
ネコにそっくりなロボットを作ってくれて`,
                  l,
                ),
                yield* P("その姿になれば 食べることはできるにゃ", l),
                A.setStatus("play"),
                yield* B(
                  "...なるほど 可能性としてはありそうですね",
                  f.texture("objectFuyuComment1"),
                  l,
                ),
                R.isCatAddedAsSuspect ||
                  (gt.play("info"),
                  yield* P("ネコを メモに追加しました", l),
                  (R.isCatAddedAsSuspect = !0));
              break;
            }
            case "事件前後": {
              if (
                (A.setStatus("speaking"),
                yield* P("ハルが 部屋をでるまでは ムギと あそんでいたにゃ", l),
                yield* P(
                  `ハルが でた後は モニターに戻って
その後はずっと 寝ていたにゃ`,
                  l,
                ),
                A.setStatus("play"),
                yield* B(
                  `...なるほど ムギと あそんでいたのですね
...うん？`,
                  f.texture("objectFuyuComment1"),
                  l,
                ),
                yield* B(
                  `ムギ あなたは テスト勉強していたのですよね？
遊んでいたのですか？`,
                  f.texture("objectFuyuComment2"),
                  l,
                ),
                yield* pe(
                  B("...！！", f.texture("objectMugiComment3"), l),
                  (function* () {
                    yield* Tt(s), yield* Tt(s);
                  })(),
                ),
                yield* B(
                  `...そうだった...かも
わすれてました...`,
                  f.texture("objectMugiComment3"),
                  l,
                ),
                yield* B(
                  "(...あやしいですね)",
                  f.texture("objectFuyuComment1"),
                  l,
                ),
                !R.isCatAskedAboutSituation &&
                  (gt.play("info"),
                  yield* P("ネコとムギの情報を 更新しました", l),
                  (R.isCatAskedAboutSituation = !0),
                  Bs()))
              ) {
                yield* Is(i, l);
                return;
              }
              break;
            }
            case "やめる":
              A.setStatus("play");
              return;
          }
          A.setStatus("speaking"),
            yield* P("ほかに 何かあるかにゃ？", l),
            A.setStatus("play");
        }
      }),
      (h.playerExamineEvent = function* (l) {
        yield* P("コードや 試作品が 入っているようだ", l),
          R.isFlashlightAcquired ||
            (yield* B(
              "...これ 何かに 使えるかもしれません",
              f.texture("objectMugiComment1"),
              l,
            ),
            yield* P("懐中電灯を 手に入れた", l),
            (R.isFlashlightAcquired = !0));
      }),
      (t.mainObjects.specification.playerExamineEvent = function* (l) {
        yield* P("本や資料が 並べられている", l),
          yield* B(
            "...何か いいもの ないかな〜",
            f.texture("objectMugiComment1"),
            l,
          ),
          yield* B(
            `何をしているんですか
捜査を 続けますよ`,
            f.texture("objectFuyuComment5"),
            l,
          ),
          yield* B(
            `...はっ！ごめんなさい！
(落ち着いたら 探してみようかな)`,
            f.texture("objectMugiComment4"),
            l,
          );
      }),
      (t.mainObjects.designPaper.playerExamineEvent = function* (l) {
        yield* P("とあるロボットの 設計書を見つけた", l),
          yield* B(
            "...まずは 容疑者を 絞り込むことから 始めましょう",
            f.texture("objectFuyuComment1"),
            l,
          );
      });
  },
  Bs = () =>
    R.isMugiAddedAsSuspect &&
    R.isHaruAddedAsSuspect &&
    R.isMantisAddedAsSuspect &&
    R.isCatAddedAsSuspect &&
    R.isCatAskedAboutSituation;
function* Is(i, t) {
  yield* B(
    `...ひととおり 聞けたので
整理しましょうか`,
    f.texture("objectFuyuComment1"),
    t,
  ),
    Tg(i);
}
const Gg = (i) => {
    const t = te(i);
    if (!(t instanceof Ot)) throw new Error("Invalid stage");
    const { player: e } = t;
    if (!e) throw new Error("Player is not set");
    const {
      mugi: s,
      haru: n,
      mantis: r,
      cat: o,
      catMonitor: A,
      designPaper: h,
    } = t.mainObjects;
    (s.playerExamineEvent = function* (l) {
      const d = qs(s.pos, e.pos);
      s.setDirection(d),
        yield* pe(
          B(
            `フユさん！ おじゃましてます！
テスト勉強 しにきました！`,
            f.texture("objectMugiComment2"),
            l,
          ),
          (function* () {
            yield* Tt(s), yield* Tt(s);
          })(),
        ),
        yield* B(
          "フユさんは いま 何やってるんですか？",
          f.texture("objectMugiComment1"),
          l,
        ),
        yield* pe(
          B(
            `...わ わたしじゃないですよ！
ここで ずっと 勉強をしていたんです！`,
            f.texture("objectMugiComment3"),
            l,
          ),
          (function* () {
            yield* Tt(s);
          })(),
        ),
        yield* B(
          `んーー でもおもしろそうですね
...そうだ！`,
          f.texture("objectMugiComment1"),
          l,
        ),
        yield* B(
          "わたしも 犯人探し てつだいます！",
          f.texture("objectMugiComment1"),
          l,
        ),
        yield* B("...はい？", f.texture("objectFuyuComment4"), l),
        yield* B(
          `助手として せいいっぱい がんばります！
よろしくお願いします 探偵♪`,
          f.texture("objectMugiComment2"),
          l,
        ),
        yield* B(
          "(...勉強しに きたんですよね...？)",
          f.texture("objectFuyuComment4"),
          l,
        ),
        yield* j(30),
        yield* B(
          `探偵！ まずは ききこみをしましょう！
わたしが メモしていきます！`,
          f.texture("objectMugiComment1"),
          l,
        ),
        yield* B(
          `たしかにそうですね
それでは ムギ あなた自身を まずメモしてください`,
          f.texture("objectFuyuComment3"),
          l,
        ),
        yield* B(
          `わたしじゃないですからね！
...書きますけど`,
          f.texture("objectMugiComment3"),
          l,
        ),
        yield* j(30),
        gt.play("info"),
        yield* P("ムギを メモに追加しました", l),
        yield* P(
          `【操作説明】
メモを確認するには Z キーを押します`,
          l,
        ),
        kg(i);
    }),
      (n.playerExamineEvent = function* (l) {
        const d = qs(n.pos, e.pos);
        n.setDirection(d),
          yield* B(
            "たのしみにしてたのに〜...",
            f.texture("objectHaruComment5"),
            l,
          );
      }),
      (r.playerExamineEvent = function* (l) {
        yield* P(
          `カマキリのロボットだ
何か 機械のようなものを 食べているようだ`,
          l,
        ),
          yield* B(
            "...このカマキリ 確か なんでも食べるんでしたよね",
            f.texture("objectFuyuComment1"),
            l,
          );
      }),
      (o.playerExamineEvent = function* (l) {
        yield* P(
          `ネコのロボットだ
どうやら 眠っているようだ`,
          l,
        ),
          yield* B("この子 初めてみました", f.texture("objectFuyuComment1"), l);
      }),
      (A.playerExamineEvent = function* (l) {
        yield* P(
          `ネコのロボットだ
顔の部分は モニターになっている`,
          l,
        ),
          A.setStatus("speaking"),
          yield* P("こんにちはにゃ どうかしたかにゃ？", l),
          yield* P(
            `...なるほどにゃ
ぼくは そのプリンは 食べてないにゃ`,
            l,
          ),
          A.setStatus("play"),
          yield* B(
            `(...この子 なぞが多いので
誰かに くわしく 聞きたいですね)`,
            f.texture("objectFuyuComment1"),
            l,
          );
      }),
      (h.playerExamineEvent = function* (l) {
        yield* P(
          `設計書だ
どうやら ロボットの基部のようだ`,
          l,
        ),
          yield* P("ある程度の重さを 耐えて動くことができるらしい", l),
          yield* B(
            "あとで もう一度 確認してみますか",
            f.texture("objectFuyuComment1"),
            l,
          );
      });
  },
  Ug = (i) => {
    const t = te(i);
    if (!(t instanceof Oi)) throw new Error("Invalid stage");
    const { player: e } = t;
    if (!e) throw new Error("Player is not set");
    t.eventManager.add(function* (s) {
      yield* pe(
        B("ただいま 帰りました", f.texture("objectFuyuComment1"), s),
        (function* () {
          yield* G(e, "right", () => !1),
            yield* G(e, "right", () => !1),
            yield* G(e, "right", () => !1),
            yield* G(e, "right", () => !1),
            yield* G(e, "right", () => !1),
            yield* G(e, "right", () => !1),
            yield* G(e, "right", () => !1);
        })(),
      ),
        yield* j(30);
      const n = new wa([13, 1]);
      gt.play("closeDoor"),
        t.objectManager.add(n),
        yield* j(10),
        yield* B("プリン！プリン！", f.texture("objectHaruComment3"), s),
        yield* G(n, "left", () => !1),
        yield* G(n, "left", () => !1),
        yield* G(n, "left", () => !1),
        yield* Tf(() => !n.isMoving),
        yield* j(30),
        yield* B(
          `あ フユ おかえり〜
今から フユお手製！ プリンを 食べるのだ〜`,
          f.texture("objectHaruComment3"),
          s,
        ),
        n.setDirection("up"),
        yield* j(30),
        gt.play("closeDoor"),
        yield* j(10),
        t.objectManager.remove(n),
        yield* j(30),
        yield* B(
          `そういえば プリンがあるんでした
わたしも 食べようかな`,
          f.texture("objectFuyuComment1"),
          s,
        ),
        yield* G(e, "right", () => !1),
        yield* G(e, "right", () => !1),
        yield* pe(
          B("わたしの プリンがーーーーー", f.texture("objectHaruComment6"), s),
          Ff(s, 50),
        ),
        yield* B("！？", f.texture("objectFuyuComment2"), s),
        yield* G(e, "right", () => !1),
        e.setDirection("up"),
        yield* j(15),
        yield* B("どうしましたか！？", f.texture("objectFuyuComment2"), s),
        gt.play("closeDoor"),
        t.objectManager.remove(e),
        yield* j(30);
      const o = yield* Ce(s);
      yield* j(60);
      const A = new Ot(t.eventManager);
      if (!A.player) throw new Error("Player is not set");
      Gt(i, A),
        A.player.setPosition([8, 8]),
        A.player.setDirection("up"),
        yield* o(),
        yield* G(A.player, "up", () => !1),
        yield* G(A.player, "up", () => !1),
        yield* G(A.player, "up", () => !1),
        yield* G(A.player, "up", () => !1),
        yield* G(A.player, "up", () => !1),
        yield* G(A.player, "up", () => !1),
        yield* G(A.player, "left", () => !1),
        yield* G(A.player, "left", () => !1),
        yield* j(15),
        A.mainObjects.haru.setDirection("right"),
        yield* B("どうしましたか？", f.texture("objectFuyuComment2"), s),
        yield* B("プリンが...", f.texture("objectHaruComment5"), s),
        gt.play("info"),
        yield* P("ハルの手には 中身が食べられた プリンがある", s),
        yield* B(
          `誰かに 食べられているようですね
いったい 誰が...`,
          f.texture("objectFuyuComment2"),
          s,
        ),
        yield* B(
          `(...わたしのプリンを あげてもいいですが
誰が 食べたのか 気になります)`,
          f.texture("objectFuyuComment2"),
          s,
        ),
        yield* j(30),
        yield* P(
          `【操作方法】
移動: 矢印キー`,
          s,
        ),
        yield* P(
          `決定: Space キー または Enter キー
メニュー表示: Z キー`,
          s,
        ),
        Gg(i);
    });
  },
  Ng = (i) => {
    R.reset();
    const t = new Oi(i.eventManager);
    Gt(i, t),
      t.player.setPosition([0, 1]),
      t.player.setDirection("right"),
      t.eventManager.add(function* (e) {
        const s = new Xt()
            .rect(0, 0, S.WIDTH, S.HEIGHT)
            .fill({ color: "black", alpha: 0.3 }),
          n = new gi({
            text: "PRESS SPACE KEY",
            x: S.WIDTH / 2,
            y: S.HEIGHT - 80,
            anchor: { x: 0.5, y: 0 },
            style: new Kt({
              fill: "white",
              fontFamily: "DotGothic16",
              fontSize: 20,
              align: "center",
            }),
          }),
          r = new gi({
            text: `ver ${Rf.version}`,
            x: S.WIDTH - 10,
            y: S.HEIGHT - 10,
            anchor: { x: 1, y: 1 },
            style: new Kt({
              fill: "white",
              fontFamily: "DotGothic16",
              fontSize: 16,
              align: "right",
            }),
          });
        e.addChild(s), e.addChild(n), e.addChild(r);
        const o = Oe(f.texture("cutsTitle"), e);
        yield* Cn(["ACTION"]),
          gt.play("gameStart"),
          yield* Pt(e, () => {
            o(), e.removeChildren(), Ug(i);
          });
      });
  };
class S extends q {
  constructor(e, s) {
    if (!e.canvas.parentElement)
      throw new Error("Canvas parent element not found");
    super(e);
    p(this, "input");
    p(this, "inputChannelList", [[], []]);
    p(this, "inputChannel", 0);
    p(this, "components", []);
    p(
      this,
      "eventManager",
      new Nr(
        () => {
          this.inputChannel = 1;
        },
        () => {
          this.inputChannel = 0;
        },
      ),
    );
    this.input = new ru(s);
  }
  start() {
    this.resetComponent(), this._initEventManager(), Ng(this);
  }
  end() {
    this.start();
  }
  _initEventManager() {
    return (
      (this.eventManager = new Nr(
        () => {
          this.inputChannel = 1;
        },
        () => {
          this.inputChannel = 0;
        },
      )),
      (this.eventManager.subCanvas.zIndex = 100),
      this.setComponent(this.eventManager, 1),
      this.eventManager
    );
  }
  addComponent(e, s) {
    this.components.push(e),
      this.baseStage.addChild(e.subCanvas),
      this.inputChannelList[s].push(e);
  }
  removeComponentByInputChannel(e) {
    for (const s of this.inputChannelList[e])
      (this.components = this.components.filter((n) => n !== s)),
        this.baseStage.removeChild(s.subCanvas);
    this.inputChannelList[e] = [];
  }
  setComponent(e, s) {
    this.removeComponentByInputChannel(s), this.addComponent(e, s);
  }
  resetComponent() {
    for (const e of this.components) e.close();
    this.baseStage.removeChildren(),
      (this.components = []),
      (this.inputChannelList = [[], []]);
  }
  close() {
    for (const e of this.components) e.close();
    this.baseStage.removeChildren(), this.eventManager.close();
  }
  update() {
    this.input._update(), this.scaleSize();
    const e = this.inputChannel;
    for (const s of this.components)
      s.subCanvas.destroyed ||
        s.update(this.inputChannelList[e].includes(s) ? this.input : null);
  }
  scaleSize() {
    const e = Math.min(
      this.app.screen.width / S.WIDTH,
      this.app.screen.height / S.HEIGHT,
    );
    this.app.stage.scale = e;
  }
}
class _r {
  static load(t) {
    document.fonts.load("12px DotGothic16").then(() => t());
  }
  static getCount() {
    return 1;
  }
}
const Ft = class Ft extends q {
  constructor(e, s) {
    super(e);
    p(this, "allCount", 0);
    p(this, "currCount", 0);
    p(this, "container", new _());
    p(this, "progressBar");
    (this.onLoad = s),
      (this.allCount += f.getCount()),
      (this.allCount += gt.getCount()),
      (this.allCount += _r.getCount()),
      f.load(() => this.countContents()),
      gt.load(() => this.countContents()),
      _r.load(() => this.countContents()),
      this.baseStage.removeChildren(),
      this.container.addChild(
        new Xt()
          .roundRect(
            q.WIDTH / 2 - Ft.PROGRESS_BAR_WIDTH / 2,
            q.HEIGHT / 2 - Ft.PROGRESS_BAR_HEIGHT / 2,
            Ft.PROGRESS_BAR_WIDTH,
            Ft.PROGRESS_BAR_HEIGHT,
            4,
          )
          .stroke({ color: "white", width: 1 }),
      ),
      (this.progressBar = new Xt()
        .roundRect(
          q.WIDTH / 2 - Ft.PROGRESS_BAR_WIDTH / 2,
          q.HEIGHT / 2 - Ft.PROGRESS_BAR_HEIGHT / 2,
          10,
          Ft.PROGRESS_BAR_HEIGHT,
          4,
        )
        .fill({ color: "white" })),
      this.container.addChild(this.progressBar),
      this.baseStage.addChild(this.container);
  }
  countContents() {
    this.currCount++,
      this.progressBar
        .roundRect(
          q.WIDTH / 2 - Ft.PROGRESS_BAR_WIDTH / 2,
          q.HEIGHT / 2 - Ft.PROGRESS_BAR_HEIGHT / 2,
          Ft.PROGRESS_BAR_WIDTH * (this.currCount / this.allCount),
          Ft.PROGRESS_BAR_HEIGHT,
          4,
        )
        .fill({ color: "white" }),
      this.allCount === this.currCount && this.onLoad();
  }
  update() {
    this.scaleSize();
  }
  scaleSize() {
    const e = Math.min(
      this.app.screen.width / q.WIDTH,
      this.app.screen.height / q.HEIGHT,
    );
    this.app.stage.scale = e;
  }
};
p(Ft, "PROGRESS_BAR_WIDTH", 200), p(Ft, "PROGRESS_BAR_HEIGHT", 10);
let $s = Ft;
class Og {
  constructor() {
    p(this, "activatedKeysStack", []);
  }
  handleKeyDown(t) {
    var e;
    t.preventDefault(),
      (this.activatedKeysStack = [
        t.key,
        ...(((e = this.activatedKeysStack) == null
          ? void 0
          : e.filter((s) => s !== t.key)) ?? []),
      ]);
  }
  handleKeyUp(t) {
    t.preventDefault(),
      (this.activatedKeysStack = this.activatedKeysStack.filter(
        (e) => e !== t.key,
      ));
  }
  getActivatedKeysStack() {
    return [...this.activatedKeysStack];
  }
  activate() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this)),
      document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }
  deactivate() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this)),
      document.removeEventListener("keyup", this.handleKeyUp.bind(this));
  }
}
class jg {
  constructor() {
    p(this, "activatedKeysStack", []);
    p(this, "renderContainer", document.createElement("div"));
  }
  getActivatedKeysStack() {
    return [...this.activatedKeysStack];
  }
  activate() {
    (this.activatedKeysStack = []),
      (this.renderContainer = document.createElement("div")),
      this.renderDpad(),
      this.renderButton(),
      document.body.appendChild(this.renderContainer);
  }
  deactivate() {
    this.renderContainer.remove(), (this.activatedKeysStack = []);
  }
  handlePressStart(t) {
    this.activatedKeysStack = [...this.activatedKeysStack, t];
  }
  handlePressEnd(t) {
    this.activatedKeysStack = this.activatedKeysStack.filter((e) => e !== t);
  }
  renderDpad() {
    let t = !1;
    const e = "dpad-highlight",
      s = (a) => `dpad-direction-${a.split(":")[1]}`,
      n = () => {
        var a;
        this.activatedKeysStack = this.activatedKeysStack.filter(
          (c) => !["vc:up", "vc:down", "vc:left", "vc:right"].includes(c),
        );
        for (const c of ["vc:up", "vc:down", "vc:left", "vc:right"])
          (a = document.querySelector(`.${s(c)}`)) == null ||
            a.classList.remove(e);
      },
      r = (a) => {
        var D;
        a.preventDefault(), (t = !0);
        const c = o.getBoundingClientRect(),
          u = c.left + c.width / 2,
          g = c.top + c.height / 2,
          y = "touches" in a ? a.touches[0].clientX : a.clientX,
          m = "touches" in a ? a.touches[0].clientY : a.clientY,
          C = y - u,
          w = m - g;
        if (Math.sqrt(C * C + w * w) < 20) return;
        const I = (Math.atan2(w, C) * 180) / Math.PI;
        let U;
        I < -135 || I > 135
          ? (U = "vc:left")
          : I < -45
            ? (U = "vc:up")
            : I < 45
              ? (U = "vc:right")
              : (U = "vc:down"),
          n(),
          this.handlePressStart(U),
          (D = document.querySelector(`.${s(U)}`)) == null ||
            D.classList.add(e);
      },
      o = document.createElement("div");
    o.classList.add("dpad-container");
    const A = document.createElement("button");
    A.classList.add("dpad-button"), o.appendChild(A);
    const h = document.createElement("div");
    h.classList.add("dpad-circle"), A.appendChild(h);
    const l = document.createElement("div");
    l.classList.add("dpad-circle-inner"), h.appendChild(l);
    for (const a of ["vc:up", "vc:down", "vc:left", "vc:right"]) {
      const c = document.createElement("div");
      c.classList.add("dpad-direction"),
        c.classList.add(s(a)),
        A.appendChild(c);
    }
    const d = () => {
      (t = !1), n();
    };
    A.addEventListener("mousedown", r.bind(this)),
      A.addEventListener("mousemove", (a) => {
        t && r(a);
      }),
      A.addEventListener("mouseleave", d.bind(this)),
      A.addEventListener("mouseup", d.bind(this)),
      A.addEventListener("touchstart", r.bind(this)),
      A.addEventListener("touchend", d.bind(this)),
      A.addEventListener("touchcancel", d.bind(this)),
      A.addEventListener("touchmove", (a) => {
        t && r(a);
      }),
      this.renderContainer.appendChild(o);
  }
  renderButton() {
    const t = "button-highlight",
      e = document.createElement("div");
    e.classList.add("button-container");
    const s = document.createElement("button");
    s.classList.add("button"),
      s.classList.add("button-a"),
      (s.textContent = "A"),
      e.appendChild(s);
    const n = document.createElement("button");
    n.classList.add("button"),
      n.classList.add("button-z"),
      (n.textContent = "Z"),
      e.appendChild(n),
      s.addEventListener("mousedown", () => {
        this.handlePressStart("vc:a"), s.classList.add(t);
      }),
      s.addEventListener("mouseup", () => {
        this.handlePressEnd("vc:a"), s.classList.remove(t);
      }),
      s.addEventListener("mouseleave", () => {
        this.handlePressEnd("vc:a"), s.classList.remove(t);
      }),
      s.addEventListener("touchstart", () => {
        this.handlePressStart("vc:a"), s.classList.add(t);
      }),
      s.addEventListener("touchend", () => {
        this.handlePressEnd("vc:a"), s.classList.remove(t);
      }),
      n.addEventListener("mousedown", () => {
        this.handlePressStart("vc:z"), n.classList.add(t);
      }),
      n.addEventListener("mouseup", () => {
        this.handlePressEnd("vc:z"), n.classList.remove(t);
      }),
      n.addEventListener("mouseleave", () => {
        this.handlePressEnd("vc:z"), n.classList.remove(t);
      }),
      n.addEventListener("touchstart", () => {
        this.handlePressStart("vc:z"), n.classList.add(t);
      }),
      n.addEventListener("touchend", () => {
        this.handlePressEnd("vc:z"), n.classList.remove(t);
      }),
      this.renderContainer.appendChild(e);
  }
}
const zg = () => {
    if (typeof window < "u" && window.navigator) {
      const i = window.navigator.userAgent.toLowerCase();
      if (
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(i)
      )
        return "Mobile";
    }
    return "PC";
  },
  Lg = async (i) =>
    Hg(i, (t) => {
      t.start();
    }),
  Hg = async (i, t) => {
    const e = new jo();
    await e.init({
      background: "#16181d",
      width: S.WIDTH,
      height: S.HEIGHT,
      resolution: Math.max(window.devicePixelRatio ?? 2, 2),
      antialias: !1,
    }),
      (e.canvas.style.width = "100%"),
      (e.canvas.style.maxWidth = "125dvh"),
      (e.canvas.style.height = "auto"),
      (e.canvas.style.maxHeight = "80dvw"),
      i.appendChild(e.canvas);
    const s = zg() === "Mobile" ? new jg() : new Og();
    s.activate();
    let n = null;
    const r = () => {
      n !== null && (n.close(), e.stage.removeChildren());
      const o = new S(e, () => s.getActivatedKeysStack());
      (n = o), t(o);
    };
    return (
      (n = new $s(e, r)),
      (e.ticker.maxFPS = 60),
      e.ticker.add(() => {
        n == null || n.update();
      }),
      {
        closeGame: () => {
          n == null || n.close(), s.deactivate(), e.destroy();
        },
      }
    );
  },
  va = document.querySelector("#app");
if (!va) throw new Error("#app element not found");
Lg(va).catch((i) => {
  console.error("Failed to launch game:", i);
});
export {
  Uo as $,
  Go as A,
  Nt as B,
  _ as C,
  Et as D,
  Y as E,
  Wt as F,
  Xi as G,
  xA as H,
  On as I,
  et as J,
  YA as K,
  $A as L,
  tt as M,
  It as N,
  Bt as O,
  Rt as P,
  sh as Q,
  ks as R,
  Eh as S,
  Me as T,
  Gi as U,
  zn as V,
  ns as W,
  Hn as X,
  EA as Y,
  Mt as Z,
  ao as _,
  Jt as a,
  it as a0,
  dt as a1,
  Ah as a2,
  Qh as a3,
  qh as a4,
  Wh as a5,
  el as a6,
  sl as a7,
  nl as a8,
  Kt as a9,
  ec as aa,
  Jo as ab,
  sr as ac,
  er as ad,
  La as ae,
  Pr as af,
  ac as ag,
  Xt as ah,
  bt as ai,
  Ya as aj,
  Ys as ak,
  ki as al,
  Hs as am,
  Qr as an,
  ea as ao,
  di as b,
  Pi as c,
  on as d,
  Dt as e,
  ir as f,
  xh as g,
  Fo as h,
  yo as i,
  le as j,
  Ro as k,
  Mr as l,
  _h as m,
  Zh as n,
  $h as o,
  il as p,
  Lo as q,
  sA as r,
  an as s,
  $ as t,
  So as u,
  Ha as v,
  Ct as w,
  ol as x,
  fe as y,
  no as z,
};
