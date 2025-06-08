const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./browserAll-B_IHkf5o.js",
      "./webworkerAll-BJUsG42S.js",
      "./colorToUniform-C2GHuDhf.js",
      "./WebGPURenderer-C_e0WcSY.js",
      "./SharedSystems-D_tmw2pW.js",
      "./WebGLRenderer-mblQT0o9.js",
    ]),
) => i.map((i) => d[i]);
var Ra = Object.defineProperty;
var Qa = (s, t, e) =>
  t in s
    ? Ra(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (s[t] = e);
var w = (s, t, e) => Qa(s, typeof t != "symbol" ? t + "" : t, e);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === "childList")
        for (const a of r.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && i(a);
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
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = e(n);
    fetch(n.href, r);
  }
})();
const Oa = "modulepreload",
  Ua = function (s, t) {
    return new URL(s, t).href;
  },
  Ns = {},
  li = function (t, e, i) {
    let n = Promise.resolve();
    if (e && e.length > 0) {
      let a = function (d) {
        return Promise.all(
          d.map((o) =>
            Promise.resolve(o).then(
              (l) => ({ status: "fulfilled", value: l }),
              (l) => ({ status: "rejected", reason: l }),
            ),
          ),
        );
      };
      const h = document.getElementsByTagName("link"),
        c = document.querySelector("meta[property=csp-nonce]"),
        u =
          (c == null ? void 0 : c.nonce) ||
          (c == null ? void 0 : c.getAttribute("nonce"));
      n = a(
        e.map((d) => {
          if (((d = Ua(d, i)), d in Ns)) return;
          Ns[d] = !0;
          const o = d.endsWith(".css"),
            l = o ? '[rel="stylesheet"]' : "";
          if (!!i)
            for (let p = h.length - 1; p >= 0; p--) {
              const g = h[p];
              if (g.href === d && (!o || g.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${d}"]${l}`)) return;
          const f = document.createElement("link");
          if (
            ((f.rel = o ? "stylesheet" : Oa),
            o || (f.as = "script"),
            (f.crossOrigin = ""),
            (f.href = d),
            u && f.setAttribute("nonce", u),
            document.head.appendChild(f),
            o)
          )
            return new Promise((p, g) => {
              f.addEventListener("load", p),
                f.addEventListener("error", () =>
                  g(new Error(`Unable to preload CSS for ${d}`)),
                );
            });
        }),
      );
    }
    function r(a) {
      const h = new Event("vite:preloadError", { cancelable: !0 });
      if (((h.payload = a), window.dispatchEvent(h), !h.defaultPrevented))
        throw a;
    }
    return n.then((a) => {
      for (const h of a || []) h.status === "rejected" && r(h.reason);
      return t().catch(r);
    });
  };
var z = ((s) => (
  (s.Application = "application"),
  (s.WebGLPipes = "webgl-pipes"),
  (s.WebGLPipesAdaptor = "webgl-pipes-adaptor"),
  (s.WebGLSystem = "webgl-system"),
  (s.WebGPUPipes = "webgpu-pipes"),
  (s.WebGPUPipesAdaptor = "webgpu-pipes-adaptor"),
  (s.WebGPUSystem = "webgpu-system"),
  (s.CanvasSystem = "canvas-system"),
  (s.CanvasPipesAdaptor = "canvas-pipes-adaptor"),
  (s.CanvasPipes = "canvas-pipes"),
  (s.Asset = "asset"),
  (s.LoadParser = "load-parser"),
  (s.ResolveParser = "resolve-parser"),
  (s.CacheParser = "cache-parser"),
  (s.DetectionParser = "detection-parser"),
  (s.MaskEffect = "mask-effect"),
  (s.BlendMode = "blend-mode"),
  (s.TextureSource = "texture-source"),
  (s.Environment = "environment"),
  (s.ShapeBuilder = "shape-builder"),
  (s.Batcher = "batcher"),
  s
))(z || {});
const Ji = (s) => {
    if (typeof s == "function" || (typeof s == "object" && s.extension)) {
      if (!s.extension)
        throw new Error("Extension class must have an extension object");
      s = {
        ...(typeof s.extension != "object"
          ? { type: s.extension }
          : s.extension),
        ref: s,
      };
    }
    if (typeof s == "object") s = { ...s };
    else throw new Error("Invalid extension type");
    return typeof s.type == "string" && (s.type = [s.type]), s;
  },
  We = (s, t) => Ji(s).priority ?? t,
  Bt = {
    _addHandlers: {},
    _removeHandlers: {},
    _queue: {},
    remove(...s) {
      return (
        s.map(Ji).forEach((t) => {
          t.type.forEach((e) => {
            var i, n;
            return (n = (i = this._removeHandlers)[e]) == null
              ? void 0
              : n.call(i, t);
          });
        }),
        this
      );
    },
    add(...s) {
      return (
        s.map(Ji).forEach((t) => {
          t.type.forEach((e) => {
            var r, a;
            const i = this._addHandlers,
              n = this._queue;
            i[e]
              ? (a = i[e]) == null || a.call(i, t)
              : ((n[e] = n[e] || []), (r = n[e]) == null || r.push(t));
          });
        }),
        this
      );
    },
    handle(s, t, e) {
      var a;
      const i = this._addHandlers,
        n = this._removeHandlers;
      if (i[s] || n[s])
        throw new Error(`Extension type ${s} already has a handler`);
      (i[s] = t), (n[s] = e);
      const r = this._queue;
      return (
        r[s] && ((a = r[s]) == null || a.forEach((h) => t(h)), delete r[s]),
        this
      );
    },
    handleByMap(s, t) {
      return this.handle(
        s,
        (e) => {
          e.name && (t[e.name] = e.ref);
        },
        (e) => {
          e.name && delete t[e.name];
        },
      );
    },
    handleByNamedList(s, t, e = -1) {
      return this.handle(
        s,
        (i) => {
          t.findIndex((r) => r.name === i.name) >= 0 ||
            (t.push({ name: i.name, value: i.ref }),
            t.sort((r, a) => We(a.value, e) - We(r.value, e)));
        },
        (i) => {
          const n = t.findIndex((r) => r.name === i.name);
          n !== -1 && t.splice(n, 1);
        },
      );
    },
    handleByList(s, t, e = -1) {
      return this.handle(
        s,
        (i) => {
          t.includes(i.ref) ||
            (t.push(i.ref), t.sort((n, r) => We(r, e) - We(n, e)));
        },
        (i) => {
          const n = t.indexOf(i.ref);
          n !== -1 && t.splice(n, 1);
        },
      );
    },
    mixin(s, ...t) {
      for (const e of t)
        Object.defineProperties(
          s.prototype,
          Object.getOwnPropertyDescriptors(e),
        );
    },
  },
  Fa = {
    extension: { type: z.Environment, name: "browser", priority: -1 },
    test: () => !0,
    load: async () => {
      await li(
        () => import("./browserAll-B_IHkf5o.js"),
        __vite__mapDeps([0, 1, 2]),
        import.meta.url,
      );
    },
  },
  Ga = {
    extension: { type: z.Environment, name: "webworker", priority: 0 },
    test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
    load: async () => {
      await li(
        () => import("./webworkerAll-BJUsG42S.js"),
        __vite__mapDeps([1, 2]),
        import.meta.url,
      );
    },
  };
class Dt {
  constructor(t, e, i) {
    (this._x = e || 0), (this._y = i || 0), (this._observer = t);
  }
  clone(t) {
    return new Dt(t ?? this._observer, this._x, this._y);
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
var Te =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Cs(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
var Ci = { exports: {} },
  Hs;
function za() {
  return (
    Hs ||
      ((Hs = 1),
      (function (s) {
        var t = Object.prototype.hasOwnProperty,
          e = "~";
        function i() {}
        Object.create &&
          ((i.prototype = Object.create(null)), new i().__proto__ || (e = !1));
        function n(c, u, d) {
          (this.fn = c), (this.context = u), (this.once = d || !1);
        }
        function r(c, u, d, o, l) {
          if (typeof d != "function")
            throw new TypeError("The listener must be a function");
          var A = new n(d, o || c, l),
            f = e ? e + u : u;
          return (
            c._events[f]
              ? c._events[f].fn
                ? (c._events[f] = [c._events[f], A])
                : c._events[f].push(A)
              : ((c._events[f] = A), c._eventsCount++),
            c
          );
        }
        function a(c, u) {
          --c._eventsCount === 0 ? (c._events = new i()) : delete c._events[u];
        }
        function h() {
          (this._events = new i()), (this._eventsCount = 0);
        }
        (h.prototype.eventNames = function () {
          var u = [],
            d,
            o;
          if (this._eventsCount === 0) return u;
          for (o in (d = this._events))
            t.call(d, o) && u.push(e ? o.slice(1) : o);
          return Object.getOwnPropertySymbols
            ? u.concat(Object.getOwnPropertySymbols(d))
            : u;
        }),
          (h.prototype.listeners = function (u) {
            var d = e ? e + u : u,
              o = this._events[d];
            if (!o) return [];
            if (o.fn) return [o.fn];
            for (var l = 0, A = o.length, f = new Array(A); l < A; l++)
              f[l] = o[l].fn;
            return f;
          }),
          (h.prototype.listenerCount = function (u) {
            var d = e ? e + u : u,
              o = this._events[d];
            return o ? (o.fn ? 1 : o.length) : 0;
          }),
          (h.prototype.emit = function (u, d, o, l, A, f) {
            var p = e ? e + u : u;
            if (!this._events[p]) return !1;
            var g = this._events[p],
              m = arguments.length,
              x,
              b;
            if (g.fn) {
              switch ((g.once && this.removeListener(u, g.fn, void 0, !0), m)) {
                case 1:
                  return g.fn.call(g.context), !0;
                case 2:
                  return g.fn.call(g.context, d), !0;
                case 3:
                  return g.fn.call(g.context, d, o), !0;
                case 4:
                  return g.fn.call(g.context, d, o, l), !0;
                case 5:
                  return g.fn.call(g.context, d, o, l, A), !0;
                case 6:
                  return g.fn.call(g.context, d, o, l, A, f), !0;
              }
              for (b = 1, x = new Array(m - 1); b < m; b++)
                x[b - 1] = arguments[b];
              g.fn.apply(g.context, x);
            } else {
              var E = g.length,
                D;
              for (b = 0; b < E; b++)
                switch (
                  (g[b].once && this.removeListener(u, g[b].fn, void 0, !0), m)
                ) {
                  case 1:
                    g[b].fn.call(g[b].context);
                    break;
                  case 2:
                    g[b].fn.call(g[b].context, d);
                    break;
                  case 3:
                    g[b].fn.call(g[b].context, d, o);
                    break;
                  case 4:
                    g[b].fn.call(g[b].context, d, o, l);
                    break;
                  default:
                    if (!x)
                      for (D = 1, x = new Array(m - 1); D < m; D++)
                        x[D - 1] = arguments[D];
                    g[b].fn.apply(g[b].context, x);
                }
            }
            return !0;
          }),
          (h.prototype.on = function (u, d, o) {
            return r(this, u, d, o, !1);
          }),
          (h.prototype.once = function (u, d, o) {
            return r(this, u, d, o, !0);
          }),
          (h.prototype.removeListener = function (u, d, o, l) {
            var A = e ? e + u : u;
            if (!this._events[A]) return this;
            if (!d) return a(this, A), this;
            var f = this._events[A];
            if (f.fn)
              f.fn === d &&
                (!l || f.once) &&
                (!o || f.context === o) &&
                a(this, A);
            else {
              for (var p = 0, g = [], m = f.length; p < m; p++)
                (f[p].fn !== d ||
                  (l && !f[p].once) ||
                  (o && f[p].context !== o)) &&
                  g.push(f[p]);
              g.length
                ? (this._events[A] = g.length === 1 ? g[0] : g)
                : a(this, A);
            }
            return this;
          }),
          (h.prototype.removeAllListeners = function (u) {
            var d;
            return (
              u
                ? ((d = e ? e + u : u), this._events[d] && a(this, d))
                : ((this._events = new i()), (this._eventsCount = 0)),
              this
            );
          }),
          (h.prototype.off = h.prototype.removeListener),
          (h.prototype.addListener = h.prototype.on),
          (h.prefixed = e),
          (h.EventEmitter = h),
          (s.exports = h);
      })(Ci)),
    Ci.exports
  );
}
var Na = za();
const jt = Cs(Na),
  Ha = Math.PI * 2,
  La = 180 / Math.PI,
  Xa = Math.PI / 180;
class _t {
  constructor(t = 0, e = 0) {
    (this.x = 0), (this.y = 0), (this.x = t), (this.y = e);
  }
  clone() {
    return new _t(this.x, this.y);
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
    return (bi.x = 0), (bi.y = 0), bi;
  }
}
const bi = new _t();
class K {
  constructor(t = 1, e = 0, i = 0, n = 1, r = 0, a = 0) {
    (this.array = null),
      (this.a = t),
      (this.b = e),
      (this.c = i),
      (this.d = n),
      (this.tx = r),
      (this.ty = a);
  }
  fromArray(t) {
    (this.a = t[0]),
      (this.b = t[1]),
      (this.c = t[3]),
      (this.d = t[4]),
      (this.tx = t[2]),
      (this.ty = t[5]);
  }
  set(t, e, i, n, r, a) {
    return (
      (this.a = t),
      (this.b = e),
      (this.c = i),
      (this.d = n),
      (this.tx = r),
      (this.ty = a),
      this
    );
  }
  toArray(t, e) {
    this.array || (this.array = new Float32Array(9));
    const i = e || this.array;
    return (
      t
        ? ((i[0] = this.a),
          (i[1] = this.b),
          (i[2] = 0),
          (i[3] = this.c),
          (i[4] = this.d),
          (i[5] = 0),
          (i[6] = this.tx),
          (i[7] = this.ty),
          (i[8] = 1))
        : ((i[0] = this.a),
          (i[1] = this.c),
          (i[2] = this.tx),
          (i[3] = this.b),
          (i[4] = this.d),
          (i[5] = this.ty),
          (i[6] = 0),
          (i[7] = 0),
          (i[8] = 1)),
      i
    );
  }
  apply(t, e) {
    e = e || new _t();
    const i = t.x,
      n = t.y;
    return (
      (e.x = this.a * i + this.c * n + this.tx),
      (e.y = this.b * i + this.d * n + this.ty),
      e
    );
  }
  applyInverse(t, e) {
    e = e || new _t();
    const i = this.a,
      n = this.b,
      r = this.c,
      a = this.d,
      h = this.tx,
      c = this.ty,
      u = 1 / (i * a + r * -n),
      d = t.x,
      o = t.y;
    return (
      (e.x = a * u * d + -r * u * o + (c * r - h * a) * u),
      (e.y = i * u * o + -n * u * d + (-c * i + h * n) * u),
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
      i = Math.sin(t),
      n = this.a,
      r = this.c,
      a = this.tx;
    return (
      (this.a = n * e - this.b * i),
      (this.b = n * i + this.b * e),
      (this.c = r * e - this.d * i),
      (this.d = r * i + this.d * e),
      (this.tx = a * e - this.ty * i),
      (this.ty = a * i + this.ty * e),
      this
    );
  }
  append(t) {
    const e = this.a,
      i = this.b,
      n = this.c,
      r = this.d;
    return (
      (this.a = t.a * e + t.b * n),
      (this.b = t.a * i + t.b * r),
      (this.c = t.c * e + t.d * n),
      (this.d = t.c * i + t.d * r),
      (this.tx = t.tx * e + t.ty * n + this.tx),
      (this.ty = t.tx * i + t.ty * r + this.ty),
      this
    );
  }
  appendFrom(t, e) {
    const i = t.a,
      n = t.b,
      r = t.c,
      a = t.d,
      h = t.tx,
      c = t.ty,
      u = e.a,
      d = e.b,
      o = e.c,
      l = e.d;
    return (
      (this.a = i * u + n * o),
      (this.b = i * d + n * l),
      (this.c = r * u + a * o),
      (this.d = r * d + a * l),
      (this.tx = h * u + c * o + e.tx),
      (this.ty = h * d + c * l + e.ty),
      this
    );
  }
  setTransform(t, e, i, n, r, a, h, c, u) {
    return (
      (this.a = Math.cos(h + u) * r),
      (this.b = Math.sin(h + u) * r),
      (this.c = -Math.sin(h - c) * a),
      (this.d = Math.cos(h - c) * a),
      (this.tx = t - (i * this.a + n * this.c)),
      (this.ty = e - (i * this.b + n * this.d)),
      this
    );
  }
  prepend(t) {
    const e = this.tx;
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const i = this.a,
        n = this.c;
      (this.a = i * t.a + this.b * t.c),
        (this.b = i * t.b + this.b * t.d),
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
      i = this.b,
      n = this.c,
      r = this.d,
      a = t.pivot,
      h = -Math.atan2(-n, r),
      c = Math.atan2(i, e),
      u = Math.abs(h + c);
    return (
      u < 1e-5 || Math.abs(Ha - u) < 1e-5
        ? ((t.rotation = c), (t.skew.x = t.skew.y = 0))
        : ((t.rotation = 0), (t.skew.x = h), (t.skew.y = c)),
      (t.scale.x = Math.sqrt(e * e + i * i)),
      (t.scale.y = Math.sqrt(n * n + r * r)),
      (t.position.x = this.tx + (a.x * e + a.y * n)),
      (t.position.y = this.ty + (a.x * i + a.y * r)),
      t
    );
  }
  invert() {
    const t = this.a,
      e = this.b,
      i = this.c,
      n = this.d,
      r = this.tx,
      a = t * n - e * i;
    return (
      (this.a = n / a),
      (this.b = -e / a),
      (this.c = -i / a),
      (this.d = t / a),
      (this.tx = (i * this.ty - n * r) / a),
      (this.ty = -(t * this.ty - e * r) / a),
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
    const t = new K();
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
    return ja.identity();
  }
  static get shared() {
    return Va.identity();
  }
}
const Va = new K(),
  ja = new K(),
  le = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
  ce = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
  Ae = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
  ue = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
  Zi = [],
  ar = [],
  qe = Math.sign;
function Ya() {
  for (let s = 0; s < 16; s++) {
    const t = [];
    Zi.push(t);
    for (let e = 0; e < 16; e++) {
      const i = qe(le[s] * le[e] + Ae[s] * ce[e]),
        n = qe(ce[s] * le[e] + ue[s] * ce[e]),
        r = qe(le[s] * Ae[e] + Ae[s] * ue[e]),
        a = qe(ce[s] * Ae[e] + ue[s] * ue[e]);
      for (let h = 0; h < 16; h++)
        if (le[h] === i && ce[h] === n && Ae[h] === r && ue[h] === a) {
          t.push(h);
          break;
        }
    }
  }
  for (let s = 0; s < 16; s++) {
    const t = new K();
    t.set(le[s], ce[s], Ae[s], ue[s], 0, 0), ar.push(t);
  }
}
Ya();
const ut = {
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
    uX: (s) => le[s],
    uY: (s) => ce[s],
    vX: (s) => Ae[s],
    vY: (s) => ue[s],
    inv: (s) => (s & 8 ? s & 15 : -s & 7),
    add: (s, t) => Zi[s][t],
    sub: (s, t) => Zi[s][ut.inv(t)],
    rotate180: (s) => s ^ 4,
    isVertical: (s) => (s & 3) === 2,
    byDirection: (s, t) =>
      Math.abs(s) * 2 <= Math.abs(t)
        ? t >= 0
          ? ut.S
          : ut.N
        : Math.abs(t) * 2 <= Math.abs(s)
          ? s > 0
            ? ut.E
            : ut.W
          : t > 0
            ? s > 0
              ? ut.SE
              : ut.SW
            : s > 0
              ? ut.NE
              : ut.NW,
    matrixAppendRotationInv: (s, t, e = 0, i = 0) => {
      const n = ar[ut.inv(t)];
      (n.tx = e), (n.ty = i), s.append(n);
    },
  },
  Ke = [new _t(), new _t(), new _t(), new _t()];
class Ct {
  constructor(t = 0, e = 0, i = 0, n = 0) {
    (this.type = "rectangle"),
      (this.x = Number(t)),
      (this.y = Number(e)),
      (this.width = Number(i)),
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
    return new Ct(0, 0, 0, 0);
  }
  clone() {
    return new Ct(this.x, this.y, this.width, this.height);
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
  strokeContains(t, e, i, n = 0.5) {
    const { width: r, height: a } = this;
    if (r <= 0 || a <= 0) return !1;
    const h = this.x,
      c = this.y,
      u = i * (1 - n),
      d = i - u,
      o = h - u,
      l = h + r + u,
      A = c - u,
      f = c + a + u,
      p = h + d,
      g = h + r - d,
      m = c + d,
      x = c + a - d;
    return (
      t >= o &&
      t <= l &&
      e >= A &&
      e <= f &&
      !(t > p && t < g && e > m && e < x)
    );
  }
  intersects(t, e) {
    if (!e) {
      const X = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= X) return !1;
      const U = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > U;
    }
    const i = this.left,
      n = this.right,
      r = this.top,
      a = this.bottom;
    if (n <= i || a <= r) return !1;
    const h = Ke[0].set(t.left, t.top),
      c = Ke[1].set(t.left, t.bottom),
      u = Ke[2].set(t.right, t.top),
      d = Ke[3].set(t.right, t.bottom);
    if (u.x <= h.x || c.y <= h.y) return !1;
    const o = Math.sign(e.a * e.d - e.b * e.c);
    if (
      o === 0 ||
      (e.apply(h, h),
      e.apply(c, c),
      e.apply(u, u),
      e.apply(d, d),
      Math.max(h.x, c.x, u.x, d.x) <= i ||
        Math.min(h.x, c.x, u.x, d.x) >= n ||
        Math.max(h.y, c.y, u.y, d.y) <= r ||
        Math.min(h.y, c.y, u.y, d.y) >= a)
    )
      return !1;
    const l = o * (c.y - h.y),
      A = o * (h.x - c.x),
      f = l * i + A * r,
      p = l * n + A * r,
      g = l * i + A * a,
      m = l * n + A * a;
    if (
      Math.max(f, p, g, m) <= l * h.x + A * h.y ||
      Math.min(f, p, g, m) >= l * d.x + A * d.y
    )
      return !1;
    const x = o * (h.y - u.y),
      b = o * (u.x - h.x),
      E = x * i + b * r,
      D = x * n + b * r,
      _ = x * i + b * a,
      P = x * n + b * a;
    return !(
      Math.max(E, D, _, P) <= x * h.x + b * h.y ||
      Math.min(E, D, _, P) >= x * d.x + b * d.y
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
      i = Math.min(this.x + this.width, t.x + t.width),
      n = Math.max(this.y, t.y),
      r = Math.min(this.y + this.height, t.y + t.height);
    return (
      (this.x = e),
      (this.width = Math.max(i - e, 0)),
      (this.y = n),
      (this.height = Math.max(r - n, 0)),
      this
    );
  }
  ceil(t = 1, e = 0.001) {
    const i = Math.ceil((this.x + this.width - e) * t) / t,
      n = Math.ceil((this.y + this.height - e) * t) / t;
    return (
      (this.x = Math.floor((this.x + e) * t) / t),
      (this.y = Math.floor((this.y + e) * t) / t),
      (this.width = i - this.x),
      (this.height = n - this.y),
      this
    );
  }
  enlarge(t) {
    const e = Math.min(this.x, t.x),
      i = Math.max(this.x + this.width, t.x + t.width),
      n = Math.min(this.y, t.y),
      r = Math.max(this.y + this.height, t.y + t.height);
    return (
      (this.x = e),
      (this.width = i - e),
      (this.y = n),
      (this.height = r - n),
      this
    );
  }
  getBounds(t) {
    return t || (t = new Ct()), t.copyFrom(this), t;
  }
  containsRect(t) {
    if (this.width <= 0 || this.height <= 0) return !1;
    const e = t.x,
      i = t.y,
      n = t.x + t.width,
      r = t.y + t.height;
    return (
      e >= this.x &&
      e < this.x + this.width &&
      i >= this.y &&
      i < this.y + this.height &&
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
const vi = { default: -1 };
function bt(s = "default") {
  return vi[s] === void 0 && (vi[s] = -1), ++vi[s];
}
const Ls = {},
  ht = "8.0.0",
  Wa = "8.3.4";
function J(s, t, e = 3) {
  if (Ls[t]) return;
  let i = new Error().stack;
  typeof i > "u"
    ? console.warn(
        "PixiJS Deprecation Warning: ",
        `${t}
Deprecated since v${s}`,
      )
    : ((i = i
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
Deprecated since v${s}`,
          ),
          console.warn(i),
          console.groupEnd())
        : (console.warn(
            "PixiJS Deprecation Warning: ",
            `${t}
Deprecated since v${s}`,
          ),
          console.warn(i))),
    (Ls[t] = !0);
}
const or = () => {};
function ci(s) {
  return (
    (s += s === 0 ? 1 : 0),
    --s,
    (s |= s >>> 1),
    (s |= s >>> 2),
    (s |= s >>> 4),
    (s |= s >>> 8),
    (s |= s >>> 16),
    s + 1
  );
}
function Xs(s) {
  return !(s & (s - 1)) && !!s;
}
function hr(s) {
  const t = {};
  for (const e in s) s[e] !== void 0 && (t[e] = s[e]);
  return t;
}
const Vs = Object.create(null);
function qa(s) {
  const t = Vs[s];
  return t === void 0 && (Vs[s] = bt("resource")), t;
}
const lr = class cr extends jt {
  constructor(t = {}) {
    super(),
      (this._resourceType = "textureSampler"),
      (this._touched = 0),
      (this._maxAnisotropy = 1),
      (this.destroyed = !1),
      (t = { ...cr.defaultOptions, ...t }),
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
    J(ht, "TextureStyle.wrapMode is now TextureStyle.addressMode"),
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
    return (this._sharedResourceId = qa(t)), this._resourceId;
  }
  destroy() {
    (this.destroyed = !0),
      this.emit("destroy", this),
      this.emit("change", this),
      this.removeAllListeners();
  }
};
lr.defaultOptions = { addressMode: "clamp-to-edge", scaleMode: "linear" };
let Ka = lr;
const Ar = class ur extends jt {
  constructor(t = {}) {
    super(),
      (this.options = t),
      (this.uid = bt("textureSource")),
      (this._resourceType = "textureSource"),
      (this._resourceId = bt("resource")),
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
      (t = { ...ur.defaultOptions, ...t }),
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
      (this.style = new Ka(hr(t))),
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
    var e, i;
    this.style !== t &&
      ((e = this._style) == null || e.off("change", this._onStyleChange, this),
      (this._style = t),
      (i = this._style) == null || i.on("change", this._onStyleChange, this),
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
    (this._resourceId = bt("resource")),
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
  resize(t, e, i) {
    i || (i = this._resolution), t || (t = this.width), e || (e = this.height);
    const n = Math.round(t * i),
      r = Math.round(e * i);
    return (
      (this.width = n / i),
      (this.height = r / i),
      (this._resolution = i),
      this.pixelWidth === n && this.pixelHeight === r
        ? !1
        : (this._refreshPOT(),
          (this.pixelWidth = n),
          (this.pixelHeight = r),
          this.emit("resize", this),
          (this._resourceId = bt("resource")),
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
    this.isPowerOfTwo = Xs(this.pixelWidth) && Xs(this.pixelHeight);
  }
  static test(t) {
    throw new Error("Unimplemented");
  }
};
Ar.defaultOptions = {
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
let $t = Ar;
class bs extends $t {
  constructor(t) {
    const e = t.resource || new Float32Array(t.width * t.height * 4);
    let i = t.format;
    i ||
      (e instanceof Float32Array
        ? (i = "rgba32float")
        : e instanceof Int32Array || e instanceof Uint32Array
          ? (i = "rgba32uint")
          : e instanceof Int16Array || e instanceof Uint16Array
            ? (i = "rgba16uint")
            : (e instanceof Int8Array, (i = "bgra8unorm"))),
      super({ ...t, resource: e, format: i }),
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
bs.extension = z.TextureSource;
const js = new K();
class Ja {
  constructor(t, e) {
    (this.mapCoord = new K()),
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
    const i = this.mapCoord;
    for (let n = 0; n < t.length; n += 2) {
      const r = t[n],
        a = t[n + 1];
      (e[n] = r * i.a + a * i.c + i.tx), (e[n + 1] = r * i.b + a * i.d + i.ty);
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
    const i = t.orig,
      n = t.trim;
    n &&
      (js.set(
        i.width / n.width,
        0,
        0,
        i.height / n.height,
        -n.x / n.width,
        -n.y / n.height,
      ),
      this.mapCoord.append(js));
    const r = t.source,
      a = this.uClampFrame,
      h = this.clampMargin / r._resolution,
      c = this.clampOffset / r._resolution;
    return (
      (a[0] = (t.frame.x + h + c) / r.width),
      (a[1] = (t.frame.y + h + c) / r.height),
      (a[2] = (t.frame.x + t.frame.width - h + c) / r.width),
      (a[3] = (t.frame.y + t.frame.height - h + c) / r.height),
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
class q extends jt {
  constructor({
    source: t,
    label: e,
    frame: i,
    orig: n,
    trim: r,
    defaultAnchor: a,
    defaultBorders: h,
    rotate: c,
    dynamic: u,
  } = {}) {
    if (
      (super(),
      (this.uid = bt("texture")),
      (this.uvs = { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }),
      (this.frame = new Ct()),
      (this.noFrame = !1),
      (this.dynamic = !1),
      (this.isTexture = !0),
      (this.label = e),
      (this.source = (t == null ? void 0 : t.source) ?? new $t()),
      (this.noFrame = !i),
      i)
    )
      this.frame.copyFrom(i);
    else {
      const { width: d, height: o } = this._source;
      (this.frame.width = d), (this.frame.height = o);
    }
    (this.orig = n || this.frame),
      (this.trim = r),
      (this.rotate = c ?? 0),
      (this.defaultAnchor = a),
      (this.defaultBorders = h),
      (this.destroyed = !1),
      (this.dynamic = u || !1),
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
      this._textureMatrix || (this._textureMatrix = new Ja(this)),
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
      { width: i, height: n } = this._source,
      r = e.x / i,
      a = e.y / n,
      h = e.width / i,
      c = e.height / n;
    let u = this.rotate;
    if (u) {
      const d = h / 2,
        o = c / 2,
        l = r + d,
        A = a + o;
      (u = ut.add(u, ut.NW)),
        (t.x0 = l + d * ut.uX(u)),
        (t.y0 = A + o * ut.uY(u)),
        (u = ut.add(u, 2)),
        (t.x1 = l + d * ut.uX(u)),
        (t.y1 = A + o * ut.uY(u)),
        (u = ut.add(u, 2)),
        (t.x2 = l + d * ut.uX(u)),
        (t.y2 = A + o * ut.uY(u)),
        (u = ut.add(u, 2)),
        (t.x3 = l + d * ut.uX(u)),
        (t.y3 = A + o * ut.uY(u));
    } else
      (t.x0 = r),
        (t.y0 = a),
        (t.x1 = r + h),
        (t.y1 = a),
        (t.x2 = r + h),
        (t.y2 = a + c),
        (t.x3 = r),
        (t.y3 = a + c);
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
    return J(ht, "Texture.baseTexture is now Texture.source"), this._source;
  }
}
q.EMPTY = new q({ label: "EMPTY", source: new $t({ label: "EMPTY" }) });
q.EMPTY.destroy = or;
q.WHITE = new q({
  source: new bs({
    resource: new Uint8Array([255, 255, 255, 255]),
    width: 1,
    height: 1,
    alphaMode: "premultiply-alpha-on-upload",
    label: "WHITE",
  }),
  label: "WHITE",
});
q.WHITE.destroy = or;
function Za(s, t, e) {
  const { width: i, height: n } = e.orig,
    r = e.trim;
  if (r) {
    const a = r.width,
      h = r.height;
    (s.minX = r.x - t._x * i),
      (s.maxX = s.minX + a),
      (s.minY = r.y - t._y * n),
      (s.maxY = s.minY + h);
  } else
    (s.minX = -t._x * i),
      (s.maxX = s.minX + i),
      (s.minY = -t._y * n),
      (s.maxY = s.minY + n);
}
const Ys = new K();
class Vt {
  constructor(t = 1 / 0, e = 1 / 0, i = -1 / 0, n = -1 / 0) {
    (this.minX = 1 / 0),
      (this.minY = 1 / 0),
      (this.maxX = -1 / 0),
      (this.maxY = -1 / 0),
      (this.matrix = Ys),
      (this.minX = t),
      (this.minY = e),
      (this.maxX = i),
      (this.maxY = n);
  }
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  get rectangle() {
    this._rectangle || (this._rectangle = new Ct());
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
      (this.matrix = Ys),
      this
    );
  }
  set(t, e, i, n) {
    (this.minX = t), (this.minY = e), (this.maxX = i), (this.maxY = n);
  }
  addFrame(t, e, i, n, r) {
    r || (r = this.matrix);
    const a = r.a,
      h = r.b,
      c = r.c,
      u = r.d,
      d = r.tx,
      o = r.ty;
    let l = this.minX,
      A = this.minY,
      f = this.maxX,
      p = this.maxY,
      g = a * t + c * e + d,
      m = h * t + u * e + o;
    g < l && (l = g),
      m < A && (A = m),
      g > f && (f = g),
      m > p && (p = m),
      (g = a * i + c * e + d),
      (m = h * i + u * e + o),
      g < l && (l = g),
      m < A && (A = m),
      g > f && (f = g),
      m > p && (p = m),
      (g = a * t + c * n + d),
      (m = h * t + u * n + o),
      g < l && (l = g),
      m < A && (A = m),
      g > f && (f = g),
      m > p && (p = m),
      (g = a * i + c * n + d),
      (m = h * i + u * n + o),
      g < l && (l = g),
      m < A && (A = m),
      g > f && (f = g),
      m > p && (p = m),
      (this.minX = l),
      (this.minY = A),
      (this.maxX = f),
      (this.maxY = p);
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
      i = this.minY,
      n = this.maxX,
      r = this.maxY,
      { a, b: h, c, d: u, tx: d, ty: o } = t;
    let l = a * e + c * i + d,
      A = h * e + u * i + o;
    (this.minX = l),
      (this.minY = A),
      (this.maxX = l),
      (this.maxY = A),
      (l = a * n + c * i + d),
      (A = h * n + u * i + o),
      (this.minX = l < this.minX ? l : this.minX),
      (this.minY = A < this.minY ? A : this.minY),
      (this.maxX = l > this.maxX ? l : this.maxX),
      (this.maxY = A > this.maxY ? A : this.maxY),
      (l = a * e + c * r + d),
      (A = h * e + u * r + o),
      (this.minX = l < this.minX ? l : this.minX),
      (this.minY = A < this.minY ? A : this.minY),
      (this.maxX = l > this.maxX ? l : this.maxX),
      (this.maxY = A > this.maxY ? A : this.maxY),
      (l = a * n + c * r + d),
      (A = h * n + u * r + o),
      (this.minX = l < this.minX ? l : this.minX),
      (this.minY = A < this.minY ? A : this.minY),
      (this.maxX = l > this.maxX ? l : this.maxX),
      (this.maxY = A > this.maxY ? A : this.maxY);
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
  fitBounds(t, e, i, n) {
    return (
      this.minX < t && (this.minX = t),
      this.maxX > e && (this.maxX = e),
      this.minY < i && (this.minY = i),
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
    return new Vt(this.minX, this.minY, this.maxX, this.maxY);
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
  addVertexData(t, e, i, n) {
    let r = this.minX,
      a = this.minY,
      h = this.maxX,
      c = this.maxY;
    n || (n = this.matrix);
    const u = n.a,
      d = n.b,
      o = n.c,
      l = n.d,
      A = n.tx,
      f = n.ty;
    for (let p = e; p < i; p += 2) {
      const g = t[p],
        m = t[p + 1],
        x = u * g + o * m + A,
        b = d * g + l * m + f;
      (r = x < r ? x : r),
        (a = b < a ? b : a),
        (h = x > h ? x : h),
        (c = b > c ? b : c);
    }
    (this.minX = r), (this.minY = a), (this.maxX = h), (this.maxY = c);
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
var $a = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
  ee = function (s) {
    return typeof s == "string" ? s.length > 0 : typeof s == "number";
  },
  St = function (s, t, e) {
    return (
      t === void 0 && (t = 0),
      e === void 0 && (e = Math.pow(10, t)),
      Math.round(e * s) / e + 0
    );
  },
  Nt = function (s, t, e) {
    return (
      t === void 0 && (t = 0),
      e === void 0 && (e = 1),
      s > e ? e : s > t ? s : t
    );
  },
  dr = function (s) {
    return (s = isFinite(s) ? s % 360 : 0) > 0 ? s : s + 360;
  },
  Ws = function (s) {
    return {
      r: Nt(s.r, 0, 255),
      g: Nt(s.g, 0, 255),
      b: Nt(s.b, 0, 255),
      a: Nt(s.a),
    };
  },
  Ei = function (s) {
    return { r: St(s.r), g: St(s.g), b: St(s.b), a: St(s.a, 3) };
  },
  to = /^#([0-9a-f]{3,8})$/i,
  Je = function (s) {
    var t = s.toString(16);
    return t.length < 2 ? "0" + t : t;
  },
  fr = function (s) {
    var t = s.r,
      e = s.g,
      i = s.b,
      n = s.a,
      r = Math.max(t, e, i),
      a = r - Math.min(t, e, i),
      h = a
        ? r === t
          ? (e - i) / a
          : r === e
            ? 2 + (i - t) / a
            : 4 + (t - e) / a
        : 0;
    return {
      h: 60 * (h < 0 ? h + 6 : h),
      s: r ? (a / r) * 100 : 0,
      v: (r / 255) * 100,
      a: n,
    };
  },
  gr = function (s) {
    var t = s.h,
      e = s.s,
      i = s.v,
      n = s.a;
    (t = (t / 360) * 6), (e /= 100), (i /= 100);
    var r = Math.floor(t),
      a = i * (1 - e),
      h = i * (1 - (t - r) * e),
      c = i * (1 - (1 - t + r) * e),
      u = r % 6;
    return {
      r: 255 * [i, h, a, a, c, i][u],
      g: 255 * [c, i, i, h, a, a][u],
      b: 255 * [a, a, c, i, i, h][u],
      a: n,
    };
  },
  qs = function (s) {
    return { h: dr(s.h), s: Nt(s.s, 0, 100), l: Nt(s.l, 0, 100), a: Nt(s.a) };
  },
  Ks = function (s) {
    return { h: St(s.h), s: St(s.s), l: St(s.l), a: St(s.a, 3) };
  },
  Js = function (s) {
    return gr(
      ((e = (t = s).s),
      {
        h: t.h,
        s:
          (e *= ((i = t.l) < 50 ? i : 100 - i) / 100) > 0
            ? ((2 * e) / (i + e)) * 100
            : 0,
        v: i + e,
        a: t.a,
      }),
    );
    var t, e, i;
  },
  ze = function (s) {
    return {
      h: (t = fr(s)).h,
      s:
        (n = ((200 - (e = t.s)) * (i = t.v)) / 100) > 0 && n < 200
          ? ((e * i) / 100 / (n <= 100 ? n : 200 - n)) * 100
          : 0,
      l: n / 2,
      a: t.a,
    };
    var t, e, i, n;
  },
  eo =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  io =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  so =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  no =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  $i = {
    string: [
      [
        function (s) {
          var t = to.exec(s);
          return t
            ? (s = t[1]).length <= 4
              ? {
                  r: parseInt(s[0] + s[0], 16),
                  g: parseInt(s[1] + s[1], 16),
                  b: parseInt(s[2] + s[2], 16),
                  a:
                    s.length === 4 ? St(parseInt(s[3] + s[3], 16) / 255, 2) : 1,
                }
              : s.length === 6 || s.length === 8
                ? {
                    r: parseInt(s.substr(0, 2), 16),
                    g: parseInt(s.substr(2, 2), 16),
                    b: parseInt(s.substr(4, 2), 16),
                    a:
                      s.length === 8
                        ? St(parseInt(s.substr(6, 2), 16) / 255, 2)
                        : 1,
                  }
                : null
            : null;
        },
        "hex",
      ],
      [
        function (s) {
          var t = so.exec(s) || no.exec(s);
          return t
            ? t[2] !== t[4] || t[4] !== t[6]
              ? null
              : Ws({
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
        function (s) {
          var t = eo.exec(s) || io.exec(s);
          if (!t) return null;
          var e,
            i,
            n = qs({
              h:
                ((e = t[1]),
                (i = t[2]),
                i === void 0 && (i = "deg"),
                Number(e) * ($a[i] || 1)),
              s: Number(t[3]),
              l: Number(t[4]),
              a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1),
            });
          return Js(n);
        },
        "hsl",
      ],
    ],
    object: [
      [
        function (s) {
          var t = s.r,
            e = s.g,
            i = s.b,
            n = s.a,
            r = n === void 0 ? 1 : n;
          return ee(t) && ee(e) && ee(i)
            ? Ws({ r: Number(t), g: Number(e), b: Number(i), a: Number(r) })
            : null;
        },
        "rgb",
      ],
      [
        function (s) {
          var t = s.h,
            e = s.s,
            i = s.l,
            n = s.a,
            r = n === void 0 ? 1 : n;
          if (!ee(t) || !ee(e) || !ee(i)) return null;
          var a = qs({
            h: Number(t),
            s: Number(e),
            l: Number(i),
            a: Number(r),
          });
          return Js(a);
        },
        "hsl",
      ],
      [
        function (s) {
          var t = s.h,
            e = s.s,
            i = s.v,
            n = s.a,
            r = n === void 0 ? 1 : n;
          if (!ee(t) || !ee(e) || !ee(i)) return null;
          var a = (function (h) {
            return {
              h: dr(h.h),
              s: Nt(h.s, 0, 100),
              v: Nt(h.v, 0, 100),
              a: Nt(h.a),
            };
          })({ h: Number(t), s: Number(e), v: Number(i), a: Number(r) });
          return gr(a);
        },
        "hsv",
      ],
    ],
  },
  Zs = function (s, t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e][0](s);
      if (i) return [i, t[e][1]];
    }
    return [null, void 0];
  },
  ro = function (s) {
    return typeof s == "string"
      ? Zs(s.trim(), $i.string)
      : typeof s == "object" && s !== null
        ? Zs(s, $i.object)
        : [null, void 0];
  },
  Si = function (s, t) {
    var e = ze(s);
    return { h: e.h, s: Nt(e.s + 100 * t, 0, 100), l: e.l, a: e.a };
  },
  Bi = function (s) {
    return (299 * s.r + 587 * s.g + 114 * s.b) / 1e3 / 255;
  },
  $s = function (s, t) {
    var e = ze(s);
    return { h: e.h, s: e.s, l: Nt(e.l + 100 * t, 0, 100), a: e.a };
  },
  ts = (function () {
    function s(t) {
      (this.parsed = ro(t)[0]),
        (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 });
    }
    return (
      (s.prototype.isValid = function () {
        return this.parsed !== null;
      }),
      (s.prototype.brightness = function () {
        return St(Bi(this.rgba), 2);
      }),
      (s.prototype.isDark = function () {
        return Bi(this.rgba) < 0.5;
      }),
      (s.prototype.isLight = function () {
        return Bi(this.rgba) >= 0.5;
      }),
      (s.prototype.toHex = function () {
        return (
          (t = Ei(this.rgba)),
          (e = t.r),
          (i = t.g),
          (n = t.b),
          (a = (r = t.a) < 1 ? Je(St(255 * r)) : ""),
          "#" + Je(e) + Je(i) + Je(n) + a
        );
        var t, e, i, n, r, a;
      }),
      (s.prototype.toRgb = function () {
        return Ei(this.rgba);
      }),
      (s.prototype.toRgbString = function () {
        return (
          (t = Ei(this.rgba)),
          (e = t.r),
          (i = t.g),
          (n = t.b),
          (r = t.a) < 1
            ? "rgba(" + e + ", " + i + ", " + n + ", " + r + ")"
            : "rgb(" + e + ", " + i + ", " + n + ")"
        );
        var t, e, i, n, r;
      }),
      (s.prototype.toHsl = function () {
        return Ks(ze(this.rgba));
      }),
      (s.prototype.toHslString = function () {
        return (
          (t = Ks(ze(this.rgba))),
          (e = t.h),
          (i = t.s),
          (n = t.l),
          (r = t.a) < 1
            ? "hsla(" + e + ", " + i + "%, " + n + "%, " + r + ")"
            : "hsl(" + e + ", " + i + "%, " + n + "%)"
        );
        var t, e, i, n, r;
      }),
      (s.prototype.toHsv = function () {
        return (
          (t = fr(this.rgba)),
          { h: St(t.h), s: St(t.s), v: St(t.v), a: St(t.a, 3) }
        );
        var t;
      }),
      (s.prototype.invert = function () {
        return Kt({
          r: 255 - (t = this.rgba).r,
          g: 255 - t.g,
          b: 255 - t.b,
          a: t.a,
        });
        var t;
      }),
      (s.prototype.saturate = function (t) {
        return t === void 0 && (t = 0.1), Kt(Si(this.rgba, t));
      }),
      (s.prototype.desaturate = function (t) {
        return t === void 0 && (t = 0.1), Kt(Si(this.rgba, -t));
      }),
      (s.prototype.grayscale = function () {
        return Kt(Si(this.rgba, -1));
      }),
      (s.prototype.lighten = function (t) {
        return t === void 0 && (t = 0.1), Kt($s(this.rgba, t));
      }),
      (s.prototype.darken = function (t) {
        return t === void 0 && (t = 0.1), Kt($s(this.rgba, -t));
      }),
      (s.prototype.rotate = function (t) {
        return t === void 0 && (t = 15), this.hue(this.hue() + t);
      }),
      (s.prototype.alpha = function (t) {
        return typeof t == "number"
          ? Kt({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t })
          : St(this.rgba.a, 3);
        var e;
      }),
      (s.prototype.hue = function (t) {
        var e = ze(this.rgba);
        return typeof t == "number"
          ? Kt({ h: t, s: e.s, l: e.l, a: e.a })
          : St(e.h);
      }),
      (s.prototype.isEqual = function (t) {
        return this.toHex() === Kt(t).toHex();
      }),
      s
    );
  })(),
  Kt = function (s) {
    return s instanceof ts ? s : new ts(s);
  },
  tn = [],
  ao = function (s) {
    s.forEach(function (t) {
      tn.indexOf(t) < 0 && (t(ts, $i), tn.push(t));
    });
  };
function oo(s, t) {
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
    i = {};
  for (var n in e) i[e[n]] = n;
  var r = {};
  (s.prototype.toName = function (a) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
      return "transparent";
    var h,
      c,
      u = i[this.toHex()];
    if (u) return u;
    if (a != null && a.closest) {
      var d = this.toRgb(),
        o = 1 / 0,
        l = "black";
      if (!r.length) for (var A in e) r[A] = new s(e[A]).toRgb();
      for (var f in e) {
        var p =
          ((h = d),
          (c = r[f]),
          Math.pow(h.r - c.r, 2) +
            Math.pow(h.g - c.g, 2) +
            Math.pow(h.b - c.b, 2));
        p < o && ((o = p), (l = f));
      }
      return l;
    }
  }),
    t.string.push([
      function (a) {
        var h = a.toLowerCase(),
          c = h === "transparent" ? "#0000" : e[h];
        return c ? new s(c).toRgb() : null;
      },
      "name",
    ]);
}
ao([oo]);
const Ee = class Oe {
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
    if (t instanceof Oe)
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
    const i = typeof t;
    if (i !== typeof e) return !1;
    if (i === "number" || i === "string" || t instanceof Number) return t === e;
    if (
      (Array.isArray(t) && Array.isArray(e)) ||
      (ArrayBuffer.isView(t) && ArrayBuffer.isView(e))
    )
      return t.length !== e.length ? !1 : t.every((r, a) => r === e[a]);
    if (t !== null && e !== null) {
      const r = Object.keys(t),
        a = Object.keys(e);
      return r.length !== a.length ? !1 : r.every((h) => t[h] === e[h]);
    }
    return t === e;
  }
  toRgba() {
    const [t, e, i, n] = this._components;
    return { r: t, g: e, b: i, a: n };
  }
  toRgb() {
    const [t, e, i] = this._components;
    return { r: t, g: e, b: i };
  }
  toRgbaString() {
    const [t, e, i] = this.toUint8RgbArray();
    return `rgba(${t},${e},${i},${this.alpha})`;
  }
  toUint8RgbArray(t) {
    const [e, i, n] = this._components;
    return (
      this._arrayRgb || (this._arrayRgb = []),
      t || (t = this._arrayRgb),
      (t[0] = Math.round(e * 255)),
      (t[1] = Math.round(i * 255)),
      (t[2] = Math.round(n * 255)),
      t
    );
  }
  toArray(t) {
    this._arrayRgba || (this._arrayRgba = []), t || (t = this._arrayRgba);
    const [e, i, n, r] = this._components;
    return (t[0] = e), (t[1] = i), (t[2] = n), (t[3] = r), t;
  }
  toRgbArray(t) {
    this._arrayRgb || (this._arrayRgb = []), t || (t = this._arrayRgb);
    const [e, i, n] = this._components;
    return (t[0] = e), (t[1] = i), (t[2] = n), t;
  }
  toNumber() {
    return this._int;
  }
  toBgrNumber() {
    const [t, e, i] = this.toUint8RgbArray();
    return (i << 16) + (e << 8) + t;
  }
  toLittleEndianNumber() {
    const t = this._int;
    return (t >> 16) + (t & 65280) + ((t & 255) << 16);
  }
  multiply(t) {
    const [e, i, n, r] = Oe._temp.setValue(t)._components;
    return (
      (this._components[0] *= e),
      (this._components[1] *= i),
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
    let i = (this._int >> 16) & 255,
      n = (this._int >> 8) & 255,
      r = this._int & 255;
    return (
      e &&
        ((i = (i * t + 0.5) | 0),
        (n = (n * t + 0.5) | 0),
        (r = (r * t + 0.5) | 0)),
      ((t * 255) << 24) + (i << 16) + (n << 8) + r
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
    let e, i, n, r;
    if (
      (typeof t == "number" || t instanceof Number) &&
      t >= 0 &&
      t <= 16777215
    ) {
      const a = t;
      (e = ((a >> 16) & 255) / 255),
        (i = ((a >> 8) & 255) / 255),
        (n = (a & 255) / 255),
        (r = 1);
    } else if (
      (Array.isArray(t) || t instanceof Float32Array) &&
      t.length >= 3 &&
      t.length <= 4
    )
      (t = this._clamp(t)), ([e, i, n, r = 1] = t);
    else if (
      (t instanceof Uint8Array || t instanceof Uint8ClampedArray) &&
      t.length >= 3 &&
      t.length <= 4
    )
      (t = this._clamp(t, 0, 255)),
        ([e, i, n, r = 255] = t),
        (e /= 255),
        (i /= 255),
        (n /= 255),
        (r /= 255);
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const h = Oe.HEX_PATTERN.exec(t);
        h && (t = `#${h[2]}`);
      }
      const a = Kt(t);
      a.isValid() &&
        (({ r: e, g: i, b: n, a: r } = a.rgba),
        (e /= 255),
        (i /= 255),
        (n /= 255));
    }
    if (e !== void 0)
      (this._components[0] = e),
        (this._components[1] = i),
        (this._components[2] = n),
        (this._components[3] = r),
        this._refreshInt();
    else throw new Error(`Unable to convert color ${t}`);
  }
  _refreshInt() {
    this._clamp(this._components);
    const [t, e, i] = this._components;
    this._int = ((t * 255) << 16) + ((e * 255) << 8) + ((i * 255) | 0);
  }
  _clamp(t, e = 0, i = 1) {
    return typeof t == "number"
      ? Math.min(Math.max(t, e), i)
      : (t.forEach((n, r) => {
          t[r] = Math.min(Math.max(n, e), i);
        }),
        t);
  }
  static isColorLike(t) {
    return (
      typeof t == "number" ||
      typeof t == "string" ||
      t instanceof Number ||
      t instanceof Oe ||
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
Ee.shared = new Ee();
Ee._temp = new Ee();
Ee.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let vt = Ee;
const ho = { cullArea: null, cullable: !1, cullableChildren: !0 };
class vs {
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
    var i;
    let e;
    return (
      this._index > 0
        ? (e = this._pool[--this._index])
        : (e = new this._classType()),
      (i = e.init) == null || i.call(e, t),
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
class lo {
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
      this._poolsByClass.has(t) || this._poolsByClass.set(t, new vs(t)),
      this._poolsByClass.get(t)
    );
  }
  stats() {
    const t = {};
    return (
      this._poolsByClass.forEach((e) => {
        const i = t[e._classType.name]
          ? e._classType.name + e._classType.ID
          : e._classType.name;
        t[i] = { free: e.totalFree, used: e.totalUsed, size: e.totalSize };
      }),
      t
    );
  }
}
const ie = new lo(),
  co = {
    get isCachedAsTexture() {
      var s;
      return !!((s = this.renderGroup) != null && s.isCachedAsTexture);
    },
    cacheAsTexture(s) {
      typeof s == "boolean" && s === !1
        ? this.disableRenderGroup()
        : (this.enableRenderGroup(),
          this.renderGroup.enableCacheAsTexture(s === !0 ? {} : s));
    },
    updateCacheTexture() {
      var s;
      (s = this.renderGroup) == null || s.updateCacheTexture();
    },
    get cacheAsBitmap() {
      return this.isCachedAsTexture;
    },
    set cacheAsBitmap(s) {
      J("v8.6.0", "cacheAsBitmap is deprecated, use cacheAsTexture instead."),
        this.cacheAsTexture(s);
    },
  };
function Ao(s, t, e) {
  const i = s.length;
  let n;
  if (t >= i || e === 0) return;
  e = t + e > i ? i - t : e;
  const r = i - e;
  for (n = t; n < r; ++n) s[n] = s[n + e];
  s.length = r;
}
const uo = {
    allowChildren: !0,
    removeChildren(s = 0, t) {
      var r;
      const e = t ?? this.children.length,
        i = e - s,
        n = [];
      if (i > 0 && i <= e) {
        for (let h = e - 1; h >= s; h--) {
          const c = this.children[h];
          c && (n.push(c), (c.parent = null));
        }
        Ao(this.children, s, e);
        const a = this.renderGroup || this.parentRenderGroup;
        a && a.removeChildren(n);
        for (let h = 0; h < n.length; ++h) {
          const c = n[h];
          (r = c.parentRenderLayer) == null || r.detach(c),
            this.emit("childRemoved", c, this, h),
            n[h].emit("removed", this);
        }
        return n.length > 0 && this._didViewChangeTick++, n;
      } else if (i === 0 && this.children.length === 0) return n;
      throw new RangeError(
        "removeChildren: numeric values are outside the acceptable range.",
      );
    },
    removeChildAt(s) {
      const t = this.getChildAt(s);
      return this.removeChild(t);
    },
    getChildAt(s) {
      if (s < 0 || s >= this.children.length)
        throw new Error(`getChildAt: Index (${s}) does not exist.`);
      return this.children[s];
    },
    setChildIndex(s, t) {
      if (t < 0 || t >= this.children.length)
        throw new Error(
          `The index ${t} supplied is out of bounds ${this.children.length}`,
        );
      this.getChildIndex(s), this.addChildAt(s, t);
    },
    getChildIndex(s) {
      const t = this.children.indexOf(s);
      if (t === -1)
        throw new Error("The supplied Container must be a child of the caller");
      return t;
    },
    addChildAt(s, t) {
      this.allowChildren ||
        J(
          ht,
          "addChildAt: Only Containers will be allowed to add children in v8.0.0",
        );
      const { children: e } = this;
      if (t < 0 || t > e.length)
        throw new Error(
          `${s}addChildAt: The index ${t} supplied is out of bounds ${e.length}`,
        );
      if (s.parent) {
        const n = s.parent.children.indexOf(s);
        if (s.parent === this && n === t) return s;
        n !== -1 && s.parent.children.splice(n, 1);
      }
      t === e.length ? e.push(s) : e.splice(t, 0, s),
        (s.parent = this),
        (s.didChange = !0),
        (s._updateFlags = 15);
      const i = this.renderGroup || this.parentRenderGroup;
      return (
        i && i.addChild(s),
        this.sortableChildren && (this.sortDirty = !0),
        this.emit("childAdded", s, this, t),
        s.emit("added", this),
        s
      );
    },
    swapChildren(s, t) {
      if (s === t) return;
      const e = this.getChildIndex(s),
        i = this.getChildIndex(t);
      (this.children[e] = t), (this.children[i] = s);
      const n = this.renderGroup || this.parentRenderGroup;
      n && (n.structureDidChange = !0), this._didContainerChangeTick++;
    },
    removeFromParent() {
      var s;
      (s = this.parent) == null || s.removeChild(this);
    },
    reparentChild(...s) {
      return s.length === 1
        ? this.reparentChildAt(s[0], this.children.length)
        : (s.forEach((t) => this.reparentChildAt(t, this.children.length)),
          s[0]);
    },
    reparentChildAt(s, t) {
      if (s.parent === this) return this.setChildIndex(s, t), s;
      const e = s.worldTransform.clone();
      s.removeFromParent(), this.addChildAt(s, t);
      const i = this.worldTransform.clone();
      return i.invert(), e.prepend(i), s.setFromMatrix(e), s;
    },
  },
  fo = {
    collectRenderables(s, t, e) {
      (this.parentRenderLayer && this.parentRenderLayer !== e) ||
        this.globalDisplayStatus < 7 ||
        !this.includeInBuild ||
        (this.sortableChildren && this.sortChildren(),
        this.isSimple
          ? this.collectRenderablesSimple(s, t, e)
          : this.renderGroup
            ? t.renderPipes.renderGroup.addRenderGroup(this.renderGroup, s)
            : this.collectRenderablesWithEffects(s, t, e));
    },
    collectRenderablesSimple(s, t, e) {
      const i = this.children,
        n = i.length;
      for (let r = 0; r < n; r++) i[r].collectRenderables(s, t, e);
    },
    collectRenderablesWithEffects(s, t, e) {
      const { renderPipes: i } = t;
      for (let n = 0; n < this.effects.length; n++) {
        const r = this.effects[n];
        i[r.pipe].push(r, this, s);
      }
      this.collectRenderablesSimple(s, t, e);
      for (let n = this.effects.length - 1; n >= 0; n--) {
        const r = this.effects[n];
        i[r.pipe].pop(r, this, s);
      }
    },
  };
class en {
  constructor() {
    (this.pipe = "filter"), (this.priority = 1);
  }
  destroy() {
    for (let t = 0; t < this.filters.length; t++) this.filters[t].destroy();
    (this.filters = null), (this.filterArea = null);
  }
}
class go {
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
      const i = this._tests[e];
      if (i.test(t)) return ie.get(i.maskClass, t);
    }
    return t;
  }
  returnMaskEffect(t) {
    ie.return(t);
  }
}
const es = new go();
Bt.handleByList(z.MaskEffect, es._effectClasses);
const po = {
    _maskEffect: null,
    _maskOptions: { inverse: !1 },
    _filterEffect: null,
    effects: [],
    _markStructureAsChanged() {
      const s = this.renderGroup || this.parentRenderGroup;
      s && (s.structureDidChange = !0);
    },
    addEffect(s) {
      this.effects.indexOf(s) === -1 &&
        (this.effects.push(s),
        this.effects.sort((e, i) => e.priority - i.priority),
        this._markStructureAsChanged(),
        this._updateIsSimple());
    },
    removeEffect(s) {
      const t = this.effects.indexOf(s);
      t !== -1 &&
        (this.effects.splice(t, 1),
        this._markStructureAsChanged(),
        this._updateIsSimple());
    },
    set mask(s) {
      const t = this._maskEffect;
      (t == null ? void 0 : t.mask) !== s &&
        (t &&
          (this.removeEffect(t),
          es.returnMaskEffect(t),
          (this._maskEffect = null)),
        s != null &&
          ((this._maskEffect = es.getMaskEffect(s)),
          this.addEffect(this._maskEffect)));
    },
    setMask(s) {
      (this._maskOptions = { ...this._maskOptions, ...s }),
        s.mask && (this.mask = s.mask),
        this._markStructureAsChanged();
    },
    get mask() {
      var s;
      return (s = this._maskEffect) == null ? void 0 : s.mask;
    },
    set filters(s) {
      var r;
      !Array.isArray(s) && s && (s = [s]);
      const t = this._filterEffect || (this._filterEffect = new en());
      s = s;
      const e = (s == null ? void 0 : s.length) > 0,
        i = ((r = t.filters) == null ? void 0 : r.length) > 0,
        n = e !== i;
      (s = Array.isArray(s) ? s.slice(0) : s),
        (t.filters = Object.freeze(s)),
        n &&
          (e
            ? this.addEffect(t)
            : (this.removeEffect(t), (t.filters = s ?? null)));
    },
    get filters() {
      var s;
      return (s = this._filterEffect) == null ? void 0 : s.filters;
    },
    set filterArea(s) {
      this._filterEffect || (this._filterEffect = new en()),
        (this._filterEffect.filterArea = s);
    },
    get filterArea() {
      var s;
      return (s = this._filterEffect) == null ? void 0 : s.filterArea;
    },
  },
  mo = {
    label: null,
    get name() {
      return (
        J(
          ht,
          "Container.name property has been removed, use Container.label instead",
        ),
        this.label
      );
    },
    set name(s) {
      J(
        ht,
        "Container.name property has been removed, use Container.label instead",
      ),
        (this.label = s);
    },
    getChildByName(s, t = !1) {
      return this.getChildByLabel(s, t);
    },
    getChildByLabel(s, t = !1) {
      const e = this.children;
      for (let i = 0; i < e.length; i++) {
        const n = e[i];
        if (n.label === s || (s instanceof RegExp && s.test(n.label))) return n;
      }
      if (t)
        for (let i = 0; i < e.length; i++) {
          const r = e[i].getChildByLabel(s, !0);
          if (r) return r;
        }
      return null;
    },
    getChildrenByLabel(s, t = !1, e = []) {
      const i = this.children;
      for (let n = 0; n < i.length; n++) {
        const r = i[n];
        (r.label === s || (s instanceof RegExp && s.test(r.label))) &&
          e.push(r);
      }
      if (t)
        for (let n = 0; n < i.length; n++) i[n].getChildrenByLabel(s, !0, e);
      return e;
    },
  },
  Mt = new vs(K),
  se = new vs(Vt),
  yo = new K(),
  xo = {
    getFastGlobalBounds(s, t) {
      t || (t = new Vt()),
        t.clear(),
        this._getGlobalBoundsRecursive(!!s, t, this.parentRenderLayer),
        t.isValid || t.set(0, 0, 0, 0);
      const e = this.renderGroup || this.parentRenderGroup;
      return t.applyMatrix(e.worldTransform), t;
    },
    _getGlobalBoundsRecursive(s, t, e) {
      let i = t;
      if (
        (s && this.parentRenderLayer && this.parentRenderLayer !== e) ||
        this.localDisplayStatus !== 7 ||
        !this.measurable
      )
        return;
      const n = !!this.effects.length;
      if (((this.renderGroup || n) && (i = se.get().clear()), this.boundsArea))
        t.addRect(this.boundsArea, this.worldTransform);
      else {
        if (this.renderPipeId) {
          const a = this.bounds;
          i.addFrame(a.minX, a.minY, a.maxX, a.maxY, this.groupTransform);
        }
        const r = this.children;
        for (let a = 0; a < r.length; a++)
          r[a]._getGlobalBoundsRecursive(s, i, e);
      }
      if (n) {
        let r = !1;
        const a = this.renderGroup || this.parentRenderGroup;
        for (let h = 0; h < this.effects.length; h++)
          this.effects[h].addBounds &&
            (r || ((r = !0), i.applyMatrix(a.worldTransform)),
            this.effects[h].addBounds(i, !0));
        r &&
          (i.applyMatrix(a.worldTransform.copyTo(yo).invert()),
          t.addBounds(i, this.relativeGroupTransform)),
          t.addBounds(i),
          se.return(i);
      } else
        this.renderGroup &&
          (t.addBounds(i, this.relativeGroupTransform), se.return(i));
    },
  };
function pr(s, t, e) {
  e.clear();
  let i, n;
  return (
    s.parent
      ? t
        ? (i = s.parent.worldTransform)
        : ((n = Mt.get().identity()), (i = Es(s, n)))
      : (i = K.IDENTITY),
    mr(s, e, i, t),
    n && Mt.return(n),
    e.isValid || e.set(0, 0, 0, 0),
    e
  );
}
function mr(s, t, e, i) {
  var h, c;
  if (!s.visible || !s.measurable) return;
  let n;
  i
    ? (n = s.worldTransform)
    : (s.updateLocalTransform(),
      (n = Mt.get()),
      n.appendFrom(s.localTransform, e));
  const r = t,
    a = !!s.effects.length;
  if ((a && (t = se.get().clear()), s.boundsArea)) t.addRect(s.boundsArea, n);
  else {
    s.bounds && ((t.matrix = n), t.addBounds(s.bounds));
    for (let u = 0; u < s.children.length; u++) mr(s.children[u], t, n, i);
  }
  if (a) {
    for (let u = 0; u < s.effects.length; u++)
      (c = (h = s.effects[u]).addBounds) == null || c.call(h, t);
    r.addBounds(t, K.IDENTITY), se.return(t);
  }
  i || Mt.return(n);
}
function Es(s, t) {
  const e = s.parent;
  return (
    e && (Es(e, t), e.updateLocalTransform(), t.append(e.localTransform)), t
  );
}
function yr(s, t) {
  if (s === 16777215 || !t) return t;
  if (t === 16777215 || !s) return s;
  const e = (s >> 16) & 255,
    i = (s >> 8) & 255,
    n = s & 255,
    r = (t >> 16) & 255,
    a = (t >> 8) & 255,
    h = t & 255,
    c = ((e * r) / 255) | 0,
    u = ((i * a) / 255) | 0,
    d = ((n * h) / 255) | 0;
  return (c << 16) + (u << 8) + d;
}
const sn = 16777215;
function nn(s, t) {
  return s === sn ? t : t === sn ? s : yr(s, t);
}
function ai(s) {
  return ((s & 255) << 16) + (s & 65280) + ((s >> 16) & 255);
}
const wo = {
  getGlobalAlpha(s) {
    if (s)
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
  getGlobalTransform(s, t) {
    if (t) return s.copyFrom(this.worldTransform);
    this.updateLocalTransform();
    const e = Es(this, Mt.get().identity());
    return s.appendFrom(this.localTransform, e), Mt.return(e), s;
  },
  getGlobalTint(s) {
    if (s)
      return this.renderGroup
        ? ai(this.renderGroup.worldColor)
        : this.parentRenderGroup
          ? ai(nn(this.localColor, this.parentRenderGroup.worldColor))
          : this.tint;
    let t = this.localColor,
      e = this.parent;
    for (; e; ) (t = nn(t, e.localColor)), (e = e.parent);
    return ai(t);
  },
};
let Ii = 0;
const rn = 500;
function At(...s) {
  Ii !== rn &&
    (Ii++,
    Ii === rn
      ? console.warn(
          "PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.",
        )
      : console.warn("PixiJS Warning: ", ...s));
}
function xr(s, t, e) {
  return (
    t.clear(),
    e || (e = K.IDENTITY),
    wr(s, t, e, s, !0),
    t.isValid || t.set(0, 0, 0, 0),
    t
  );
}
function wr(s, t, e, i, n) {
  var c, u;
  let r;
  if (n) (r = Mt.get()), (r = e.copyTo(r));
  else {
    if (!s.visible || !s.measurable) return;
    s.updateLocalTransform();
    const d = s.localTransform;
    (r = Mt.get()), r.appendFrom(d, e);
  }
  const a = t,
    h = !!s.effects.length;
  if ((h && (t = se.get().clear()), s.boundsArea)) t.addRect(s.boundsArea, r);
  else {
    s.renderPipeId && ((t.matrix = r), t.addBounds(s.bounds));
    const d = s.children;
    for (let o = 0; o < d.length; o++) wr(d[o], t, r, i, !1);
  }
  if (h) {
    for (let d = 0; d < s.effects.length; d++)
      (u = (c = s.effects[d]).addLocalBounds) == null || u.call(c, t, i);
    a.addBounds(t, K.IDENTITY), se.return(t);
  }
  Mt.return(r);
}
function Cr(s, t) {
  const e = s.children;
  for (let i = 0; i < e.length; i++) {
    const n = e[i],
      r = n.uid,
      a =
        ((n._didViewChangeTick & 65535) << 16) |
        (n._didContainerChangeTick & 65535),
      h = t.index;
    (t.data[h] !== r || t.data[h + 1] !== a) &&
      ((t.data[t.index] = r), (t.data[t.index + 1] = a), (t.didChange = !0)),
      (t.index = h + 2),
      n.children.length && Cr(n, t);
  }
  return t.didChange;
}
const Co = new K(),
  bo = {
    _localBoundsCacheId: -1,
    _localBoundsCacheData: null,
    _setWidth(s, t) {
      const e = Math.sign(this.scale.x) || 1;
      t !== 0 ? (this.scale.x = (s / t) * e) : (this.scale.x = e);
    },
    _setHeight(s, t) {
      const e = Math.sign(this.scale.y) || 1;
      t !== 0 ? (this.scale.y = (s / t) * e) : (this.scale.y = e);
    },
    getLocalBounds() {
      this._localBoundsCacheData ||
        (this._localBoundsCacheData = {
          data: [],
          index: 1,
          didChange: !1,
          localBounds: new Vt(),
        });
      const s = this._localBoundsCacheData;
      return (
        (s.index = 1),
        (s.didChange = !1),
        s.data[0] !== this._didViewChangeTick &&
          ((s.didChange = !0), (s.data[0] = this._didViewChangeTick)),
        Cr(this, s),
        s.didChange && xr(this, s.localBounds, Co),
        s.localBounds
      );
    },
    getBounds(s, t) {
      return pr(this, s, t || new Vt());
    },
  },
  vo = {
    _onRender: null,
    set onRender(s) {
      const t = this.renderGroup || this.parentRenderGroup;
      if (!s) {
        this._onRender && (t == null || t.removeOnRender(this)),
          (this._onRender = null);
        return;
      }
      this._onRender || t == null || t.addOnRender(this), (this._onRender = s);
    },
    get onRender() {
      return this._onRender;
    },
  },
  Eo = {
    _zIndex: 0,
    sortDirty: !1,
    sortableChildren: !1,
    get zIndex() {
      return this._zIndex;
    },
    set zIndex(s) {
      this._zIndex !== s && ((this._zIndex = s), this.depthOfChildModified());
    },
    depthOfChildModified() {
      this.parent &&
        ((this.parent.sortableChildren = !0), (this.parent.sortDirty = !0)),
        this.parentRenderGroup &&
          (this.parentRenderGroup.structureDidChange = !0);
    },
    sortChildren() {
      this.sortDirty && ((this.sortDirty = !1), this.children.sort(So));
    },
  };
function So(s, t) {
  return s._zIndex - t._zIndex;
}
const Bo = {
  getGlobalPosition(s = new _t(), t = !1) {
    return (
      this.parent
        ? this.parent.toGlobal(this._position, s, t)
        : ((s.x = this._position.x), (s.y = this._position.y)),
      s
    );
  },
  toGlobal(s, t, e = !1) {
    const i = this.getGlobalTransform(Mt.get(), e);
    return (t = i.apply(s, t)), Mt.return(i), t;
  },
  toLocal(s, t, e, i) {
    t && (s = t.toGlobal(s, e, i));
    const n = this.getGlobalTransform(Mt.get(), i);
    return (e = n.applyInverse(s, e)), Mt.return(n), e;
  },
};
class br {
  constructor() {
    (this.uid = bt("instructionSet")),
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
let Io = 0;
class _o {
  constructor(t) {
    (this._poolKeyHash = Object.create(null)),
      (this._texturePool = {}),
      (this.textureOptions = t || {}),
      (this.enableFullScreen = !1);
  }
  createTexture(t, e, i) {
    const n = new $t({
      ...this.textureOptions,
      width: t,
      height: e,
      resolution: 1,
      antialias: i,
      autoGarbageCollect: !1,
    });
    return new q({ source: n, label: `texturePool_${Io++}` });
  }
  getOptimalTexture(t, e, i = 1, n) {
    let r = Math.ceil(t * i - 1e-6),
      a = Math.ceil(e * i - 1e-6);
    (r = ci(r)), (a = ci(a));
    const h = (r << 17) + (a << 1) + (n ? 1 : 0);
    this._texturePool[h] || (this._texturePool[h] = []);
    let c = this._texturePool[h].pop();
    return (
      c || (c = this.createTexture(r, a, n)),
      (c.source._resolution = i),
      (c.source.width = r / i),
      (c.source.height = a / i),
      (c.source.pixelWidth = r),
      (c.source.pixelHeight = a),
      (c.frame.x = 0),
      (c.frame.y = 0),
      (c.frame.width = t),
      (c.frame.height = e),
      c.updateUvs(),
      (this._poolKeyHash[c.uid] = h),
      c
    );
  }
  getSameSizeTexture(t, e = !1) {
    const i = t.source;
    return this.getOptimalTexture(t.width, t.height, i._resolution, e);
  }
  returnTexture(t) {
    const e = this._poolKeyHash[t.uid];
    this._texturePool[e].push(t);
  }
  clear(t) {
    if (((t = t !== !1), t))
      for (const e in this._texturePool) {
        const i = this._texturePool[e];
        if (i) for (let n = 0; n < i.length; n++) i[n].destroy(!0);
      }
    this._texturePool = {};
  }
}
const Po = new _o();
class Mo {
  constructor() {
    (this.renderPipeId = "renderGroup"),
      (this.root = null),
      (this.canBundle = !1),
      (this.renderGroupParent = null),
      (this.renderGroupChildren = []),
      (this.worldTransform = new K()),
      (this.worldColorAlpha = 4294967295),
      (this.worldColor = 16777215),
      (this.worldAlpha = 1),
      (this.childrenToUpdate = Object.create(null)),
      (this.updateTick = 0),
      (this.gcTick = 0),
      (this.childrenRenderablesToUpdate = { list: [], index: 0 }),
      (this.structureDidChange = !0),
      (this.instructionSet = new br()),
      (this._onRenderContainers = []),
      (this.textureNeedsUpdate = !0),
      (this.isCachedAsTexture = !1),
      (this._matrixDirty = 7);
  }
  init(t) {
    (this.root = t), t._onRender && this.addOnRender(t), (t.didChange = !0);
    const e = t.children;
    for (let i = 0; i < e.length; i++) {
      const n = e[i];
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
      this.texture && (Po.returnTexture(this.texture), (this.texture = null));
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
    for (let i = 0; i < e.length; i++) this.addChild(e[i]);
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
    for (let i = 0; i < e.length; i++) this.removeChild(e[i]);
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
    for (let i = 0; i < e.length; i++) this._getChildren(e[i], t);
    return t;
  }
  _getChildren(t, e = []) {
    if ((e.push(t), t.renderGroup)) return e;
    const i = t.children;
    for (let n = 0; n < i.length; n++) this._getChildren(i[n], e);
    return e;
  }
  invalidateMatrices() {
    this._matrixDirty = 7;
  }
  get inverseWorldTransform() {
    return (this._matrixDirty & 1) === 0
      ? this._inverseWorldTransform
      : ((this._matrixDirty &= -2),
        this._inverseWorldTransform || (this._inverseWorldTransform = new K()),
        this._inverseWorldTransform.copyFrom(this.worldTransform).invert());
  }
  get textureOffsetInverseTransform() {
    return (this._matrixDirty & 2) === 0
      ? this._textureOffsetInverseTransform
      : ((this._matrixDirty &= -3),
        this._textureOffsetInverseTransform ||
          (this._textureOffsetInverseTransform = new K()),
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
          (this._inverseParentTextureTransform = new K()),
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
function To(s, t, e = {}) {
  for (const i in t) !e[i] && t[i] !== void 0 && (s[i] = t[i]);
}
const _i = new Dt(null),
  Pi = new Dt(null),
  Mi = new Dt(null, 1, 1),
  an = 1,
  Do = 2,
  Ti = 4;
class gt extends jt {
  constructor(t = {}) {
    var e, i;
    super(),
      (this.uid = bt("renderable")),
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
      (this.localTransform = new K()),
      (this.relativeGroupTransform = new K()),
      (this.groupTransform = this.relativeGroupTransform),
      (this.destroyed = !1),
      (this._position = new Dt(this, 0, 0)),
      (this._scale = Mi),
      (this._pivot = Pi),
      (this._skew = _i),
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
      To(this, t, { children: !0, parent: !0, effects: !0 }),
      (e = t.children) == null || e.forEach((n) => this.addChild(n)),
      (i = t.parent) == null || i.addChild(this);
  }
  static mixin(t) {
    J(
      "8.8.0",
      "Container.mixin is deprecated, please use extensions.mixin instead.",
    ),
      Bt.mixin(gt, t);
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
        J(
          ht,
          "addChild: Only Containers will be allowed to add children in v8.0.0",
        ),
      t.length > 1)
    ) {
      for (let n = 0; n < t.length; n++) this.addChild(t[n]);
      return t[0];
    }
    const e = t[0],
      i = this.renderGroup || this.parentRenderGroup;
    return e.parent === this
      ? (this.children.splice(this.children.indexOf(e), 1),
        this.children.push(e),
        i && (i.structureDidChange = !0),
        e)
      : (e.parent && e.parent.removeChild(e),
        this.children.push(e),
        this.sortableChildren && (this.sortDirty = !0),
        (e.parent = this),
        (e.didChange = !0),
        (e._updateFlags = 15),
        i && i.addChild(e),
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
      i = this.children.indexOf(e);
    return (
      i > -1 &&
        (this._didViewChangeTick++,
        this.children.splice(i, 1),
        this.renderGroup
          ? this.renderGroup.removeChild(e)
          : this.parentRenderGroup && this.parentRenderGroup.removeChild(e),
        e.parentRenderLayer && e.parentRenderLayer.detach(e),
        (e.parent = null),
        this.emit("childRemoved", e, this, i),
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
      (this.renderGroup = ie.get(Mo, this)),
      (this.groupTransform = K.IDENTITY),
      t == null || t.addChild(this),
      this._updateIsSimple();
  }
  disableRenderGroup() {
    if (!this.renderGroup) return;
    const t = this.parentRenderGroup;
    t == null || t.removeChild(this),
      ie.return(this.renderGroup),
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
      this._worldTransform || (this._worldTransform = new K()),
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
    return this.rotation * La;
  }
  set angle(t) {
    this.rotation = t * Xa;
  }
  get pivot() {
    return (
      this._pivot === Pi && (this._pivot = new Dt(this, 0, 0)), this._pivot
    );
  }
  set pivot(t) {
    this._pivot === Pi && (this._pivot = new Dt(this, 0, 0)),
      typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t);
  }
  get skew() {
    return this._skew === _i && (this._skew = new Dt(this, 0, 0)), this._skew;
  }
  set skew(t) {
    this._skew === _i && (this._skew = new Dt(this, 0, 0)),
      this._skew.copyFrom(t);
  }
  get scale() {
    return (
      this._scale === Mi && (this._scale = new Dt(this, 1, 1)), this._scale
    );
  }
  set scale(t) {
    this._scale === Mi && (this._scale = new Dt(this, 0, 0)),
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
    const i = this.getLocalBounds();
    typeof t == "object"
      ? ((e = t.height ?? t.width), (t = t.width))
      : (e ?? (e = t)),
      t !== void 0 && this._setWidth(t, i.width),
      e !== void 0 && this._setHeight(e, i.height);
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
      i = this._scale,
      n = this._pivot,
      r = this._position,
      a = i._x,
      h = i._y,
      c = n._x,
      u = n._y;
    (e.a = this._cx * a),
      (e.b = this._sx * a),
      (e.c = this._cy * h),
      (e.d = this._sy * h),
      (e.tx = r._x - (c * e.a + u * e.c)),
      (e.ty = r._y - (c * e.b + u * e.d));
  }
  set alpha(t) {
    t !== this.localAlpha &&
      ((this.localAlpha = t), (this._updateFlags |= an), this._onUpdate());
  }
  get alpha() {
    return this.localAlpha;
  }
  set tint(t) {
    const i = vt.shared.setValue(t ?? 16777215).toBgrNumber();
    i !== this.localColor &&
      ((this.localColor = i), (this._updateFlags |= an), this._onUpdate());
  }
  get tint() {
    return ai(this.localColor);
  }
  set blendMode(t) {
    this.localBlendMode !== t &&
      (this.parentRenderGroup &&
        (this.parentRenderGroup.structureDidChange = !0),
      (this._updateFlags |= Do),
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
      (this._updateFlags |= Ti),
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
      (this._updateFlags |= Ti),
      (this.localDisplayStatus ^= 4),
      this._onUpdate());
  }
  get renderable() {
    return !!(this.localDisplayStatus & 1);
  }
  set renderable(t) {
    const e = t ? 1 : 0;
    (this.localDisplayStatus & 1) !== e &&
      ((this._updateFlags |= Ti),
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
Bt.mixin(gt, uo, xo, Bo, vo, bo, po, mo, Eo, ho, co, wo, fo);
class Ss extends gt {
  constructor(t) {
    super(t),
      (this.canBundle = !0),
      (this.allowChildren = !1),
      (this._roundPixels = 0),
      (this._lastUsed = -1),
      (this._bounds = new Vt(0, 1, 0, 0)),
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
      { x: i, y: n } = t;
    return i >= e.minX && i <= e.maxX && n >= e.minY && n <= e.maxY;
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
  collectRenderablesSimple(t, e, i) {
    const { renderPipes: n, renderableGC: r } = e;
    n.blendMode.setBlendMode(this, this.groupBlendMode, t),
      n[this.renderPipeId].addRenderable(this, t),
      r.addRenderable(this),
      (this.didViewUpdate = !1);
    const h = this.children,
      c = h.length;
    for (let u = 0; u < c; u++) h[u].collectRenderables(t, e, i);
  }
}
class Y extends Ss {
  constructor(t = q.EMPTY) {
    t instanceof q && (t = { texture: t });
    const {
      texture: e = q.EMPTY,
      anchor: i,
      roundPixels: n,
      width: r,
      height: a,
      ...h
    } = t;
    super({ label: "Sprite", ...h }),
      (this.renderPipeId = "sprite"),
      (this.batched = !0),
      (this._visualBounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }),
      (this._anchor = new Dt({
        _onUpdate: () => {
          this.onViewUpdate();
        },
      })),
      i
        ? (this.anchor = i)
        : e.defaultAnchor && (this.anchor = e.defaultAnchor),
      (this.texture = e),
      (this.allowChildren = !1),
      (this.roundPixels = n ?? !1),
      r !== void 0 && (this.width = r),
      a !== void 0 && (this.height = a);
  }
  static from(t, e = !1) {
    return t instanceof q ? new Y(t) : new Y(q.from(t, e));
  }
  set texture(t) {
    t || (t = q.EMPTY);
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
      Za(this._visualBounds, this._anchor, this._texture), this._visualBounds
    );
  }
  get sourceBounds() {
    return (
      J(
        "8.6.1",
        "Sprite.sourceBounds is deprecated, use visualBounds instead.",
      ),
      this.visualBounds
    );
  }
  updateBounds() {
    const t = this._anchor,
      e = this._texture,
      i = this._bounds,
      { width: n, height: r } = e.orig;
    (i.minX = -t._x * n),
      (i.maxX = i.minX + n),
      (i.minY = -t._y * r),
      (i.maxY = i.minY + r);
  }
  destroy(t = !1) {
    if (
      (super.destroy(t),
      typeof t == "boolean" ? t : t == null ? void 0 : t.texture)
    ) {
      const i =
        typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      this._texture.destroy(i);
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
const ko = new Vt();
function vr(s, t, e) {
  const i = ko;
  (s.measurable = !0), pr(s, e, i), t.addBoundsMask(i), (s.measurable = !1);
}
function Er(s, t, e) {
  const i = se.get();
  s.measurable = !0;
  const n = Mt.get().identity(),
    r = Sr(s, e, n);
  xr(s, i, r),
    (s.measurable = !1),
    t.addBoundsMask(i),
    Mt.return(n),
    se.return(i);
}
function Sr(s, t, e) {
  return s
    ? (s !== t &&
        (Sr(s.parent, t, e),
        s.updateLocalTransform(),
        e.append(s.localTransform)),
      e)
    : (At("Mask bounds, renderable is not inside the root container"), e);
}
class Br {
  constructor(t) {
    (this.priority = 0),
      (this.inverse = !1),
      (this.pipe = "alphaMask"),
      t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    (this.mask = t),
      (this.renderMaskToTexture = !(t instanceof Y)),
      (this.mask.renderable = this.renderMaskToTexture),
      (this.mask.includeInBuild = !this.renderMaskToTexture),
      (this.mask.measurable = !1);
  }
  reset() {
    (this.mask.measurable = !0), (this.mask = null);
  }
  addBounds(t, e) {
    this.inverse || vr(this.mask, t, e);
  }
  addLocalBounds(t, e) {
    Er(this.mask, t, e);
  }
  containsPoint(t, e) {
    const i = this.mask;
    return e(i, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof Y;
  }
}
Br.extension = z.MaskEffect;
class Ir {
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
Ir.extension = z.MaskEffect;
class _r {
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
    vr(this.mask, t, e);
  }
  addLocalBounds(t, e) {
    Er(this.mask, t, e);
  }
  containsPoint(t, e) {
    const i = this.mask;
    return e(i, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof gt;
  }
}
_r.extension = z.MaskEffect;
const Ro = {
  createCanvas: (s, t) => {
    const e = document.createElement("canvas");
    return (e.width = s), (e.height = t), e;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (s, t) => fetch(s, t),
  parseXML: (s) => new DOMParser().parseFromString(s, "text/xml"),
};
let on = Ro;
const mt = {
  get() {
    return on;
  },
  set(s) {
    on = s;
  },
};
class Pr extends $t {
  constructor(t) {
    t.resource || (t.resource = mt.get().createCanvas()),
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
  resize(t = this.width, e = this.height, i = this._resolution) {
    const n = super.resize(t, e, i);
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
Pr.extension = z.TextureSource;
class ge extends $t {
  constructor(t) {
    if (
      t.resource &&
      globalThis.HTMLImageElement &&
      t.resource instanceof HTMLImageElement
    ) {
      const e = mt.get().createCanvas(t.resource.width, t.resource.height);
      e
        .getContext("2d")
        .drawImage(t.resource, 0, 0, t.resource.width, t.resource.height),
        (t.resource = e),
        At(
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
ge.extension = z.TextureSource;
var Ai = ((s) => (
  (s[(s.INTERACTION = 50)] = "INTERACTION"),
  (s[(s.HIGH = 25)] = "HIGH"),
  (s[(s.NORMAL = 0)] = "NORMAL"),
  (s[(s.LOW = -25)] = "LOW"),
  (s[(s.UTILITY = -50)] = "UTILITY"),
  s
))(Ai || {});
class Di {
  constructor(t, e = null, i = 0, n = !1) {
    (this.next = null),
      (this.previous = null),
      (this._destroyed = !1),
      (this._fn = t),
      (this._context = e),
      (this.priority = i),
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
const Mr = class Qt {
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
      (this._head = new Di(null, null, 1 / 0)),
      (this.deltaMS = 1 / Qt.targetFPMS),
      (this.elapsedMS = 1 / Qt.targetFPMS),
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
  add(t, e, i = Ai.NORMAL) {
    return this._addListener(new Di(t, e, i));
  }
  addOnce(t, e, i = Ai.NORMAL) {
    return this._addListener(new Di(t, e, i, !0));
  }
  _addListener(t) {
    let e = this._head.next,
      i = this._head;
    if (!e) t.connect(i);
    else {
      for (; e; ) {
        if (t.priority > e.priority) {
          t.connect(i);
          break;
        }
        (i = e), (e = e.next);
      }
      t.previous || t.connect(i);
    }
    return this._startIfPossible(), this;
  }
  remove(t, e) {
    let i = this._head.next;
    for (; i; ) i.match(t, e) ? (i = i.destroy()) : (i = i.next);
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
      (this.deltaMS = e), (this.deltaTime = this.deltaMS * Qt.targetFPMS);
      const i = this._head;
      let n = i.next;
      for (; n; ) n = n.emit(this);
      i.next || this._cancelIfNeeded();
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
      i = Math.min(Math.max(0, e) / 1e3, Qt.targetFPMS);
    this._maxElapsedMS = 1 / i;
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
    if (!Qt._shared) {
      const t = (Qt._shared = new Qt());
      (t.autoStart = !0), (t._protected = !0);
    }
    return Qt._shared;
  }
  static get system() {
    if (!Qt._system) {
      const t = (Qt._system = new Qt());
      (t.autoStart = !0), (t._protected = !0);
    }
    return Qt._system;
  }
};
Mr.targetFPMS = 0.06;
let re = Mr,
  ki;
async function Tr() {
  return (
    ki ??
      (ki = (async () => {
        var a;
        const t = document.createElement("canvas").getContext("webgl");
        if (!t) return "premultiply-alpha-on-upload";
        const e = await new Promise((h) => {
          const c = document.createElement("video");
          (c.onloadeddata = () => h(c)),
            (c.onerror = () => h(null)),
            (c.autoplay = !1),
            (c.crossOrigin = "anonymous"),
            (c.preload = "auto"),
            (c.src =
              "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM="),
            c.load();
        });
        if (!e) return "premultiply-alpha-on-upload";
        const i = t.createTexture();
        t.bindTexture(t.TEXTURE_2D, i);
        const n = t.createFramebuffer();
        t.bindFramebuffer(t.FRAMEBUFFER, n),
          t.framebufferTexture2D(
            t.FRAMEBUFFER,
            t.COLOR_ATTACHMENT0,
            t.TEXTURE_2D,
            i,
            0,
          ),
          t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
          t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE),
          t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
        const r = new Uint8Array(4);
        return (
          t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, r),
          t.deleteFramebuffer(n),
          t.deleteTexture(i),
          (a = t.getExtension("WEBGL_lose_context")) == null || a.loseContext(),
          r[0] <= r[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload"
        );
      })()),
    ki
  );
}
const mi = class Dr extends $t {
  constructor(t) {
    super(t),
      (this.isReady = !1),
      (this.uploadMethodId = "video"),
      (t = { ...Dr.defaultOptions, ...t }),
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
        const t = re.shared.elapsedMS * this.resource.playbackRate;
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
      (this.alphaMode = await Tr()),
      (this._load = new Promise((i, n) => {
        this.isValid
          ? i(this)
          : ((this._resolve = i),
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
            (re.shared.remove(this.updateFrame, this),
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
            (re.shared.add(this.updateFrame, this),
            (this._isConnectedToTicker = !0),
            (this._msToNextUpdate = 0)))
      : (this._videoFrameRequestCallbackHandle !== null &&
          (this.resource.cancelVideoFrameCallback(
            this._videoFrameRequestCallbackHandle,
          ),
          (this._videoFrameRequestCallbackHandle = null)),
        this._isConnectedToTicker &&
          (re.shared.remove(this.updateFrame, this),
          (this._isConnectedToTicker = !1),
          (this._msToNextUpdate = 0)));
  }
  static test(t) {
    return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement;
  }
};
mi.extension = z.TextureSource;
mi.defaultOptions = {
  ...$t.defaultOptions,
  autoLoad: !0,
  autoPlay: !0,
  updateFPS: 0,
  crossorigin: !0,
  loop: !1,
  muted: !0,
  playsinline: !0,
  preload: !1,
};
mi.MIME_TYPES = { ogv: "video/ogg", mov: "video/quicktime", m4v: "video/mp4" };
let Ne = mi;
const Xt = (s, t, e = !1) => (
  Array.isArray(s) || (s = [s]),
  t ? s.map((i) => (typeof i == "string" || e ? t(i) : i)) : s
);
class Qo {
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
    return e || At(`[Assets] Asset id ${t} was not found in the Cache`), e;
  }
  set(t, e) {
    const i = Xt(t);
    let n;
    for (let c = 0; c < this.parsers.length; c++) {
      const u = this.parsers[c];
      if (u.test(e)) {
        n = u.getCacheableAssets(i, e);
        break;
      }
    }
    const r = new Map(Object.entries(n || {}));
    n ||
      i.forEach((c) => {
        r.set(c, e);
      });
    const a = [...r.keys()],
      h = { cacheKeys: a, keys: i };
    i.forEach((c) => {
      this._cacheMap.set(c, h);
    }),
      a.forEach((c) => {
        const u = n ? n[c] : e;
        this._cache.has(c) &&
          this._cache.get(c) !== u &&
          At("[Cache] already has key:", c),
          this._cache.set(c, r.get(c));
      });
  }
  remove(t) {
    if (!this._cacheMap.has(t)) {
      At(`[Assets] Asset id ${t} was not found in the Cache`);
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
const pt = new Qo(),
  is = [];
Bt.handleByList(z.TextureSource, is);
function kr(s = {}) {
  const t = s && s.resource,
    e = t ? s.resource : s,
    i = t ? s : { resource: s };
  for (let n = 0; n < is.length; n++) {
    const r = is[n];
    if (r.test(e)) return new r(i);
  }
  throw new Error(`Could not find a source type for resource: ${i.resource}`);
}
function Oo(s = {}, t = !1) {
  const e = s && s.resource,
    i = e ? s.resource : s,
    n = e ? s : { resource: s };
  if (!t && pt.has(i)) return pt.get(i);
  const r = new q({ source: kr(n) });
  return (
    r.on("destroy", () => {
      pt.has(i) && pt.remove(i);
    }),
    t || pt.set(i, r),
    r
  );
}
function Uo(s, t = !1) {
  return typeof s == "string"
    ? pt.get(s)
    : s instanceof $t
      ? new q({ source: s })
      : Oo(s, t);
}
q.from = Uo;
$t.from = kr;
Bt.add(Br, Ir, _r, Ne, ge, Pr, bs);
var oe = ((s) => (
  (s[(s.Low = 0)] = "Low"),
  (s[(s.Normal = 1)] = "Normal"),
  (s[(s.High = 2)] = "High"),
  s
))(oe || {});
function Lt(s) {
  if (typeof s != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(s)}`);
}
function De(s) {
  return s.split("?")[0].split("#")[0];
}
function Fo(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Go(s, t, e) {
  return s.replace(new RegExp(Fo(t), "g"), e);
}
function zo(s, t) {
  let e = "",
    i = 0,
    n = -1,
    r = 0,
    a = -1;
  for (let h = 0; h <= s.length; ++h) {
    if (h < s.length) a = s.charCodeAt(h);
    else {
      if (a === 47) break;
      a = 47;
    }
    if (a === 47) {
      if (!(n === h - 1 || r === 1))
        if (n !== h - 1 && r === 2) {
          if (
            e.length < 2 ||
            i !== 2 ||
            e.charCodeAt(e.length - 1) !== 46 ||
            e.charCodeAt(e.length - 2) !== 46
          ) {
            if (e.length > 2) {
              const c = e.lastIndexOf("/");
              if (c !== e.length - 1) {
                c === -1
                  ? ((e = ""), (i = 0))
                  : ((e = e.slice(0, c)),
                    (i = e.length - 1 - e.lastIndexOf("/"))),
                  (n = h),
                  (r = 0);
                continue;
              }
            } else if (e.length === 2 || e.length === 1) {
              (e = ""), (i = 0), (n = h), (r = 0);
              continue;
            }
          }
        } else
          e.length > 0
            ? (e += `/${s.slice(n + 1, h)}`)
            : (e = s.slice(n + 1, h)),
            (i = h - n - 1);
      (n = h), (r = 0);
    } else a === 46 && r !== -1 ? ++r : (r = -1);
  }
  return e;
}
const Ot = {
  toPosix(s) {
    return Go(s, "\\", "/");
  },
  isUrl(s) {
    return /^https?:/.test(this.toPosix(s));
  },
  isDataUrl(s) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(
      s,
    );
  },
  isBlobUrl(s) {
    return s.startsWith("blob:");
  },
  hasProtocol(s) {
    return /^[^/:]+:/.test(this.toPosix(s));
  },
  getProtocol(s) {
    Lt(s), (s = this.toPosix(s));
    const t = /^file:\/\/\//.exec(s);
    if (t) return t[0];
    const e = /^[^/:]+:\/{0,2}/.exec(s);
    return e ? e[0] : "";
  },
  toAbsolute(s, t, e) {
    if ((Lt(s), this.isDataUrl(s) || this.isBlobUrl(s))) return s;
    const i = De(this.toPosix(t ?? mt.get().getBaseUrl())),
      n = De(this.toPosix(e ?? this.rootname(i)));
    return (
      (s = this.toPosix(s)),
      s.startsWith("/")
        ? Ot.join(n, s.slice(1))
        : this.isAbsolute(s)
          ? s
          : this.join(i, s)
    );
  },
  normalize(s) {
    if ((Lt(s), s.length === 0)) return ".";
    if (this.isDataUrl(s) || this.isBlobUrl(s)) return s;
    s = this.toPosix(s);
    let t = "";
    const e = s.startsWith("/");
    this.hasProtocol(s) && ((t = this.rootname(s)), (s = s.slice(t.length)));
    const i = s.endsWith("/");
    return (s = zo(s)), s.length > 0 && i && (s += "/"), e ? `/${s}` : t + s;
  },
  isAbsolute(s) {
    return (
      Lt(s), (s = this.toPosix(s)), this.hasProtocol(s) ? !0 : s.startsWith("/")
    );
  },
  join(...s) {
    if (s.length === 0) return ".";
    let t;
    for (let e = 0; e < s.length; ++e) {
      const i = s[e];
      if ((Lt(i), i.length > 0))
        if (t === void 0) t = i;
        else {
          const n = s[e - 1] ?? "";
          this.joinExtensions.includes(this.extname(n).toLowerCase())
            ? (t += `/../${i}`)
            : (t += `/${i}`);
        }
    }
    return t === void 0 ? "." : this.normalize(t);
  },
  dirname(s) {
    if ((Lt(s), s.length === 0)) return ".";
    s = this.toPosix(s);
    let t = s.charCodeAt(0);
    const e = t === 47;
    let i = -1,
      n = !0;
    const r = this.getProtocol(s),
      a = s;
    s = s.slice(r.length);
    for (let h = s.length - 1; h >= 1; --h)
      if (((t = s.charCodeAt(h)), t === 47)) {
        if (!n) {
          i = h;
          break;
        }
      } else n = !1;
    return i === -1
      ? e
        ? "/"
        : this.isUrl(a)
          ? r + s
          : r
      : e && i === 1
        ? "//"
        : r + s.slice(0, i);
  },
  rootname(s) {
    Lt(s), (s = this.toPosix(s));
    let t = "";
    if (
      (s.startsWith("/") ? (t = "/") : (t = this.getProtocol(s)), this.isUrl(s))
    ) {
      const e = s.indexOf("/", t.length);
      e !== -1 ? (t = s.slice(0, e)) : (t = s), t.endsWith("/") || (t += "/");
    }
    return t;
  },
  basename(s, t) {
    Lt(s), t && Lt(t), (s = De(this.toPosix(s)));
    let e = 0,
      i = -1,
      n = !0,
      r;
    if (t !== void 0 && t.length > 0 && t.length <= s.length) {
      if (t.length === s.length && t === s) return "";
      let a = t.length - 1,
        h = -1;
      for (r = s.length - 1; r >= 0; --r) {
        const c = s.charCodeAt(r);
        if (c === 47) {
          if (!n) {
            e = r + 1;
            break;
          }
        } else
          h === -1 && ((n = !1), (h = r + 1)),
            a >= 0 &&
              (c === t.charCodeAt(a)
                ? --a === -1 && (i = r)
                : ((a = -1), (i = h)));
      }
      return e === i ? (i = h) : i === -1 && (i = s.length), s.slice(e, i);
    }
    for (r = s.length - 1; r >= 0; --r)
      if (s.charCodeAt(r) === 47) {
        if (!n) {
          e = r + 1;
          break;
        }
      } else i === -1 && ((n = !1), (i = r + 1));
    return i === -1 ? "" : s.slice(e, i);
  },
  extname(s) {
    Lt(s), (s = De(this.toPosix(s)));
    let t = -1,
      e = 0,
      i = -1,
      n = !0,
      r = 0;
    for (let a = s.length - 1; a >= 0; --a) {
      const h = s.charCodeAt(a);
      if (h === 47) {
        if (!n) {
          e = a + 1;
          break;
        }
        continue;
      }
      i === -1 && ((n = !1), (i = a + 1)),
        h === 46
          ? t === -1
            ? (t = a)
            : r !== 1 && (r = 1)
          : t !== -1 && (r = -1);
    }
    return t === -1 ||
      i === -1 ||
      r === 0 ||
      (r === 1 && t === i - 1 && t === e + 1)
      ? ""
      : s.slice(t, i);
  },
  parse(s) {
    Lt(s);
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (s.length === 0) return t;
    s = De(this.toPosix(s));
    let e = s.charCodeAt(0);
    const i = this.isAbsolute(s);
    let n;
    (t.root = this.rootname(s)), i || this.hasProtocol(s) ? (n = 1) : (n = 0);
    let r = -1,
      a = 0,
      h = -1,
      c = !0,
      u = s.length - 1,
      d = 0;
    for (; u >= n; --u) {
      if (((e = s.charCodeAt(u)), e === 47)) {
        if (!c) {
          a = u + 1;
          break;
        }
        continue;
      }
      h === -1 && ((c = !1), (h = u + 1)),
        e === 46
          ? r === -1
            ? (r = u)
            : d !== 1 && (d = 1)
          : r !== -1 && (d = -1);
    }
    return (
      r === -1 || h === -1 || d === 0 || (d === 1 && r === h - 1 && r === a + 1)
        ? h !== -1 &&
          (a === 0 && i
            ? (t.base = t.name = s.slice(1, h))
            : (t.base = t.name = s.slice(a, h)))
        : (a === 0 && i
            ? ((t.name = s.slice(1, r)), (t.base = s.slice(1, h)))
            : ((t.name = s.slice(a, r)), (t.base = s.slice(a, h))),
          (t.ext = s.slice(r, h))),
      (t.dir = this.dirname(s)),
      t
    );
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"],
};
function Rr(s, t, e, i, n) {
  const r = t[e];
  for (let a = 0; a < r.length; a++) {
    const h = r[a];
    e < t.length - 1
      ? Rr(s.replace(i[e], h), t, e + 1, i, n)
      : n.push(s.replace(i[e], h));
  }
}
function No(s) {
  const t = /\{(.*?)\}/g,
    e = s.match(t),
    i = [];
  if (e) {
    const n = [];
    e.forEach((r) => {
      const a = r.substring(1, r.length - 1).split(",");
      n.push(a);
    }),
      Rr(s, n, 0, e, i);
  } else i.push(s);
  return i;
}
const ui = (s) => !Array.isArray(s);
class _e {
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
        .map((i) => `${encodeURIComponent(i)}=${encodeURIComponent(e[i])}`)
        .join("&");
    }
  }
  getAlias(t) {
    const { alias: e, src: i } = t;
    return Xt(
      e || i,
      (r) =>
        typeof r == "string"
          ? r
          : Array.isArray(r)
            ? r.map((a) => (a == null ? void 0 : a.src) ?? a)
            : r != null && r.src
              ? r.src
              : r,
      !0,
    );
  }
  addManifest(t) {
    this._manifest &&
      At("[Resolver] Manifest already exists, this will be overwritten"),
      (this._manifest = t),
      t.bundles.forEach((e) => {
        this.addBundle(e.name, e.assets);
      });
  }
  addBundle(t, e) {
    const i = [];
    let n = e;
    Array.isArray(e) ||
      (n = Object.entries(e).map(([r, a]) =>
        typeof a == "string" || Array.isArray(a)
          ? { alias: r, src: a }
          : { alias: r, ...a },
      )),
      n.forEach((r) => {
        const a = r.src,
          h = r.alias;
        let c;
        if (typeof h == "string") {
          const u = this._createBundleAssetId(t, h);
          i.push(u), (c = [h, u]);
        } else {
          const u = h.map((d) => this._createBundleAssetId(t, d));
          i.push(...u), (c = [...h, ...u]);
        }
        this.add({ ...r, alias: c, src: a });
      }),
      (this._bundles[t] = i);
  }
  add(t) {
    const e = [];
    Array.isArray(t) ? e.push(...t) : e.push(t);
    let i;
    (i = (r) => {
      this.hasKey(r) && At(`[Resolver] already has key: ${r} overwriting`);
    }),
      Xt(e).forEach((r) => {
        const { src: a } = r;
        let { data: h, format: c, loadParser: u } = r;
        const d = Xt(a).map((A) =>
            typeof A == "string" ? No(A) : Array.isArray(A) ? A : [A],
          ),
          o = this.getAlias(r);
        Array.isArray(o) ? o.forEach(i) : i(o);
        const l = [];
        d.forEach((A) => {
          A.forEach((f) => {
            let p = {};
            if (typeof f != "object") {
              p.src = f;
              for (let g = 0; g < this._parsers.length; g++) {
                const m = this._parsers[g];
                if (m.test(f)) {
                  p = m.parse(f);
                  break;
                }
              }
            } else
              (h = f.data ?? h),
                (c = f.format ?? c),
                (u = f.loadParser ?? u),
                (p = { ...p, ...f });
            if (!o)
              throw new Error(
                `[Resolver] alias is undefined for this asset: ${p.src}`,
              );
            (p = this._buildResolvedAsset(p, {
              aliases: o,
              data: h,
              format: c,
              loadParser: u,
            })),
              l.push(p);
          });
        }),
          o.forEach((A) => {
            this._assetMap[A] = l;
          });
      });
  }
  resolveBundle(t) {
    const e = ui(t);
    t = Xt(t);
    const i = {};
    return (
      t.forEach((n) => {
        const r = this._bundles[n];
        if (r) {
          const a = this.resolve(r),
            h = {};
          for (const c in a) {
            const u = a[c];
            h[this._extractAssetIdFromBundle(n, c)] = u;
          }
          i[n] = h;
        }
      }),
      e ? i[t[0]] : i
    );
  }
  resolveUrl(t) {
    const e = this.resolve(t);
    if (typeof t != "string") {
      const i = {};
      for (const n in e) i[n] = e[n].src;
      return i;
    }
    return e.src;
  }
  resolve(t) {
    const e = ui(t);
    t = Xt(t);
    const i = {};
    return (
      t.forEach((n) => {
        if (!this._resolverHash[n])
          if (this._assetMap[n]) {
            let r = this._assetMap[n];
            const a = this._getPreferredOrder(r);
            a == null ||
              a.priority.forEach((h) => {
                a.params[h].forEach((c) => {
                  const u = r.filter((d) => (d[h] ? d[h] === c : !1));
                  u.length && (r = u);
                });
              }),
              (this._resolverHash[n] = r[0]);
          } else
            this._resolverHash[n] = this._buildResolvedAsset(
              { alias: [n], src: n },
              {},
            );
        i[n] = this._resolverHash[n];
      }),
      e ? i[t[0]] : i
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
      const i = t[e],
        n = this._preferredOrder.find((r) =>
          r.params.format.includes(i.format),
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
    const { aliases: i, data: n, loadParser: r, format: a } = e;
    return (
      (this._basePath || this._rootPath) &&
        (t.src = Ot.toAbsolute(t.src, this._basePath, this._rootPath)),
      (t.alias = i ?? t.alias ?? [t.src]),
      (t.src = this._appendDefaultSearchParams(t.src)),
      (t.data = { ...(n || {}), ...t.data }),
      (t.loadParser = r ?? t.loadParser),
      (t.format = a ?? t.format ?? Ho(t.src)),
      t
    );
  }
}
_e.RETINA_PREFIX = /@([0-9\.]+)x/;
function Ho(s) {
  return s.split(".").pop().split("?").shift().split("#").shift();
}
const ss = (s, t) => {
    const e = t.split("?")[1];
    return e && (s += `?${e}`), s;
  },
  Qr = class Ue {
    constructor(t, e) {
      (this.linkedSheets = []),
        (this._texture = t instanceof q ? t : null),
        (this.textureSource = t.source),
        (this.textures = {}),
        (this.animations = {}),
        (this.data = e);
      const i = parseFloat(e.meta.scale);
      i
        ? ((this.resolution = i), (t.source.resolution = this.resolution))
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
          this._frameKeys.length <= Ue.BATCH_SIZE
            ? (this._processFrames(0),
              this._processAnimations(),
              this._parseComplete())
            : this._nextBatch();
      });
    }
    _processFrames(t) {
      let e = t;
      const i = Ue.BATCH_SIZE;
      for (; e - t < i && e < this._frameKeys.length; ) {
        const n = this._frameKeys[e],
          r = this._frames[n],
          a = r.frame;
        if (a) {
          let h = null,
            c = null;
          const u = r.trimmed !== !1 && r.sourceSize ? r.sourceSize : r.frame,
            d = new Ct(
              0,
              0,
              Math.floor(u.w) / this.resolution,
              Math.floor(u.h) / this.resolution,
            );
          r.rotated
            ? (h = new Ct(
                Math.floor(a.x) / this.resolution,
                Math.floor(a.y) / this.resolution,
                Math.floor(a.h) / this.resolution,
                Math.floor(a.w) / this.resolution,
              ))
            : (h = new Ct(
                Math.floor(a.x) / this.resolution,
                Math.floor(a.y) / this.resolution,
                Math.floor(a.w) / this.resolution,
                Math.floor(a.h) / this.resolution,
              )),
            r.trimmed !== !1 &&
              r.spriteSourceSize &&
              (c = new Ct(
                Math.floor(r.spriteSourceSize.x) / this.resolution,
                Math.floor(r.spriteSourceSize.y) / this.resolution,
                Math.floor(a.w) / this.resolution,
                Math.floor(a.h) / this.resolution,
              )),
            (this.textures[n] = new q({
              source: this.textureSource,
              frame: h,
              orig: d,
              trim: c,
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
        for (let i = 0; i < t[e].length; i++) {
          const n = t[e][i];
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
      this._processFrames(this._batchIndex * Ue.BATCH_SIZE),
        this._batchIndex++,
        setTimeout(() => {
          this._batchIndex * Ue.BATCH_SIZE < this._frameKeys.length
            ? this._nextBatch()
            : (this._processAnimations(), this._parseComplete());
        }, 0);
    }
    destroy(t = !1) {
      var e;
      for (const i in this.textures) this.textures[i].destroy();
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
Qr.BATCH_SIZE = 1e3;
let hn = Qr;
const Lo = [
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
function Or(s, t, e) {
  const i = {};
  if (
    (s.forEach((n) => {
      i[n] = t;
    }),
    Object.keys(t.textures).forEach((n) => {
      i[n] = t.textures[n];
    }),
    !e)
  ) {
    const n = Ot.dirname(s[0]);
    t.linkedSheets.forEach((r, a) => {
      const h = Or([`${n}/${t.data.meta.related_multi_packs[a]}`], r, !0);
      Object.assign(i, h);
    });
  }
  return i;
}
const Xo = {
  extension: z.Asset,
  cache: {
    test: (s) => s instanceof hn,
    getCacheableAssets: (s, t) => Or(s, t, !1),
  },
  resolver: {
    extension: { type: z.ResolveParser, name: "resolveSpritesheet" },
    test: (s) => {
      const e = s.split("?")[0].split("."),
        i = e.pop(),
        n = e.pop();
      return i === "json" && Lo.includes(n);
    },
    parse: (s) => {
      var e;
      const t = s.split(".");
      return {
        resolution: parseFloat(
          ((e = _e.RETINA_PREFIX.exec(s)) == null ? void 0 : e[1]) ?? "1",
        ),
        format: t[t.length - 2],
        src: s,
      };
    },
  },
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: z.LoadParser,
      priority: oe.Normal,
      name: "spritesheetLoader",
    },
    async testParse(s, t) {
      return Ot.extname(t.src).toLowerCase() === ".json" && !!s.frames;
    },
    async parse(s, t, e) {
      var d, o;
      const {
        texture: i,
        imageFilename: n,
        textureOptions: r,
      } = (t == null ? void 0 : t.data) ?? {};
      let a = Ot.dirname(t.src);
      a && a.lastIndexOf("/") !== a.length - 1 && (a += "/");
      let h;
      if (i instanceof q) h = i;
      else {
        const l = ss(a + (n ?? s.meta.image), t.src);
        h = (await e.load([{ src: l, data: r }]))[l];
      }
      const c = new hn(h.source, s);
      await c.parse();
      const u =
        (d = s == null ? void 0 : s.meta) == null
          ? void 0
          : d.related_multi_packs;
      if (Array.isArray(u)) {
        const l = [];
        for (const f of u) {
          if (typeof f != "string") continue;
          let p = a + f;
          ((o = t.data) != null && o.ignoreMultiPack) ||
            ((p = ss(p, t.src)),
            l.push(
              e.load({
                src: p,
                data: { textureOptions: r, ignoreMultiPack: !0 },
              }),
            ));
        }
        const A = await Promise.all(l);
        (c.linkedSheets = A),
          A.forEach((f) => {
            f.linkedSheets = [c].concat(c.linkedSheets.filter((p) => p !== f));
          });
      }
      return c;
    },
    async unload(s, t, e) {
      await e.unload(s.textureSource._sourceOrigin), s.destroy(!1);
    },
  },
};
Bt.add(Xo);
const Ri = Object.create(null),
  ln = Object.create(null);
function Bs(s, t) {
  let e = ln[s];
  return (
    e === void 0 && (Ri[t] === void 0 && (Ri[t] = 1), (ln[s] = e = Ri[t]++)), e
  );
}
let me;
function Ur() {
  return (
    (!me || (me != null && me.isContextLost())) &&
      (me = mt.get().createCanvas().getContext("webgl", {})),
    me
  );
}
let Ze;
function Vo() {
  if (!Ze) {
    Ze = "mediump";
    const s = Ur();
    s &&
      s.getShaderPrecisionFormat &&
      (Ze = s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.HIGH_FLOAT)
        .precision
        ? "highp"
        : "mediump");
  }
  return Ze;
}
function jo(s, t, e) {
  return t
    ? s
    : e
      ? ((s = s.replace("out vec4 finalColor;", "")),
        `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${s}
        `)
      : `
        
        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${s}
        `;
}
function Yo(s, t, e) {
  const i = e ? t.maxSupportedFragmentPrecision : t.maxSupportedVertexPrecision;
  if (s.substring(0, 9) !== "precision") {
    let n = e ? t.requestedFragmentPrecision : t.requestedVertexPrecision;
    return (
      n === "highp" && i !== "highp" && (n = "mediump"),
      `precision ${n} float;
${s}`
    );
  } else if (i !== "highp" && s.substring(0, 15) === "precision highp")
    return s.replace("precision highp", "precision mediump");
  return s;
}
function Wo(s, t) {
  return t
    ? `#version 300 es
${s}`
    : s;
}
const qo = {},
  Ko = {};
function Jo(s, { name: t = "pixi-program" }, e = !0) {
  (t = t.replace(/\s+/g, "-")), (t += e ? "-fragment" : "-vertex");
  const i = e ? qo : Ko;
  return (
    i[t] ? (i[t]++, (t += `-${i[t]}`)) : (i[t] = 1),
    s.indexOf("#define SHADER_NAME") !== -1
      ? s
      : `${`#define SHADER_NAME ${t}`}
${s}`
  );
}
function Zo(s, t) {
  return t ? s.replace("#version 300 es", "") : s;
}
const Qi = {
    stripVersion: Zo,
    ensurePrecision: Yo,
    addProgramDefines: jo,
    setProgramName: Jo,
    insertVersion: Wo,
  },
  Oi = Object.create(null),
  Fr = class ns {
    constructor(t) {
      t = { ...ns.defaultOptions, ...t };
      const e = t.fragment.indexOf("#version 300 es") !== -1,
        i = {
          stripVersion: e,
          ensurePrecision: {
            requestedFragmentPrecision: t.preferredFragmentPrecision,
            requestedVertexPrecision: t.preferredVertexPrecision,
            maxSupportedVertexPrecision: "highp",
            maxSupportedFragmentPrecision: Vo(),
          },
          setProgramName: { name: t.name },
          addProgramDefines: e,
          insertVersion: e,
        };
      let n = t.fragment,
        r = t.vertex;
      Object.keys(Qi).forEach((a) => {
        const h = i[a];
        (n = Qi[a](n, h, !0)), (r = Qi[a](r, h, !1));
      }),
        (this.fragment = n),
        (this.vertex = r),
        (this.transformFeedbackVaryings = t.transformFeedbackVaryings),
        (this._key = Bs(`${this.vertex}:${this.fragment}`, "gl-program"));
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
      return Oi[e] || (Oi[e] = new ns(t)), Oi[e];
    }
  };
Fr.defaultOptions = {
  preferredVertexPrecision: "highp",
  preferredFragmentPrecision: "mediump",
};
let Gr = Fr;
const cn = {
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
function $o(s) {
  return cn[s] ?? cn.float32;
}
const th = {
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
function eh({ source: s, entryPoint: t }) {
  const e = {},
    i = s.indexOf(`fn ${t}`);
  if (i !== -1) {
    const n = s.indexOf("->", i);
    if (n !== -1) {
      const r = s.substring(i, n),
        a =
          /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
      let h;
      for (; (h = a.exec(r)) !== null; ) {
        const c = th[h[3]] ?? "float32";
        e[h[2]] = {
          location: parseInt(h[1], 10),
          format: c,
          stride: $o(c).stride,
          offset: 0,
          instance: !1,
          start: 0,
        };
      }
    }
  }
  return e;
}
function Ui(s) {
  var o, l;
  const t = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,
    e = /@group\((\d+)\)/,
    i = /@binding\((\d+)\)/,
    n = /var(<[^>]+>)? (\w+)/,
    r = /:\s*(\w+)/,
    a = /struct\s+(\w+)\s*{([^}]+)}/g,
    h = /(\w+)\s*:\s*([\w\<\>]+)/g,
    c = /struct\s+(\w+)/,
    u =
      (o = s.match(t)) == null
        ? void 0
        : o.map((A) => ({
            group: parseInt(A.match(e)[1], 10),
            binding: parseInt(A.match(i)[1], 10),
            name: A.match(n)[2],
            isUniform: A.match(n)[1] === "<uniform>",
            type: A.match(r)[1],
          }));
  if (!u) return { groups: [], structs: [] };
  const d =
    ((l = s.match(a)) == null
      ? void 0
      : l
          .map((A) => {
            const f = A.match(c)[1],
              p = A.match(h).reduce((g, m) => {
                const [x, b] = m.split(":");
                return (g[x.trim()] = b.trim()), g;
              }, {});
            return p ? { name: f, members: p } : null;
          })
          .filter(({ name: A }) => u.some((f) => f.type === A))) ?? [];
  return { groups: u, structs: d };
}
var Fe = ((s) => (
  (s[(s.VERTEX = 1)] = "VERTEX"),
  (s[(s.FRAGMENT = 2)] = "FRAGMENT"),
  (s[(s.COMPUTE = 4)] = "COMPUTE"),
  s
))(Fe || {});
function ih({ groups: s }) {
  const t = [];
  for (let e = 0; e < s.length; e++) {
    const i = s[e];
    t[i.group] || (t[i.group] = []),
      i.isUniform
        ? t[i.group].push({
            binding: i.binding,
            visibility: Fe.VERTEX | Fe.FRAGMENT,
            buffer: { type: "uniform" },
          })
        : i.type === "sampler"
          ? t[i.group].push({
              binding: i.binding,
              visibility: Fe.FRAGMENT,
              sampler: { type: "filtering" },
            })
          : i.type === "texture_2d" &&
            t[i.group].push({
              binding: i.binding,
              visibility: Fe.FRAGMENT,
              texture: {
                sampleType: "float",
                viewDimension: "2d",
                multisampled: !1,
              },
            });
  }
  return t;
}
function sh({ groups: s }) {
  const t = [];
  for (let e = 0; e < s.length; e++) {
    const i = s[e];
    t[i.group] || (t[i.group] = {}), (t[i.group][i.name] = i.binding);
  }
  return t;
}
function nh(s, t) {
  const e = new Set(),
    i = new Set(),
    n = [...s.structs, ...t.structs].filter((a) =>
      e.has(a.name) ? !1 : (e.add(a.name), !0),
    ),
    r = [...s.groups, ...t.groups].filter((a) => {
      const h = `${a.name}-${a.binding}`;
      return i.has(h) ? !1 : (i.add(h), !0);
    });
  return { structs: n, groups: r };
}
const Fi = Object.create(null);
class yi {
  constructor(t) {
    var h, c;
    (this._layoutKey = 0), (this._attributeLocationsKey = 0);
    const { fragment: e, vertex: i, layout: n, gpuLayout: r, name: a } = t;
    if (
      ((this.name = a),
      (this.fragment = e),
      (this.vertex = i),
      e.source === i.source)
    ) {
      const u = Ui(e.source);
      this.structsAndGroups = u;
    } else {
      const u = Ui(i.source),
        d = Ui(e.source);
      this.structsAndGroups = nh(u, d);
    }
    (this.layout = n ?? sh(this.structsAndGroups)),
      (this.gpuLayout = r ?? ih(this.structsAndGroups)),
      (this.autoAssignGlobalUniforms =
        ((h = this.layout[0]) == null ? void 0 : h.globalUniforms) !== void 0),
      (this.autoAssignLocalUniforms =
        ((c = this.layout[1]) == null ? void 0 : c.localUniforms) !== void 0),
      this._generateProgramKey();
  }
  _generateProgramKey() {
    const { vertex: t, fragment: e } = this,
      i = t.source + e.source + t.entryPoint + e.entryPoint;
    this._layoutKey = Bs(i, "program");
  }
  get attributeData() {
    return (
      this._attributeData ?? (this._attributeData = eh(this.vertex)),
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
    return Fi[e] || (Fi[e] = new yi(t)), Fi[e];
  }
}
const zr = [
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
  rh = zr.reduce((s, t) => ((s[t] = !0), s), {});
function ah(s, t) {
  switch (s) {
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
const Nr = class Hr {
  constructor(t, e) {
    (this._touched = 0),
      (this.uid = bt("uniform")),
      (this._resourceType = "uniformGroup"),
      (this._resourceId = bt("resource")),
      (this.isUniformGroup = !0),
      (this._dirtyId = 0),
      (this.destroyed = !1),
      (e = { ...Hr.defaultOptions, ...e }),
      (this.uniformStructures = t);
    const i = {};
    for (const n in t) {
      const r = t[n];
      if (((r.name = n), (r.size = r.size ?? 1), !rh[r.type]))
        throw new Error(
          `Uniform type ${r.type} is not supported. Supported uniform types are: ${zr.join(", ")}`,
        );
      r.value ?? (r.value = ah(r.type, r.size)), (i[n] = r.value);
    }
    (this.uniforms = i),
      (this._dirtyId = 1),
      (this.ubo = e.ubo),
      (this.isStatic = e.isStatic),
      (this._signature = Bs(
        Object.keys(i)
          .map((n) => `${n}-${t[n].type}`)
          .join("-"),
        "uniform-group",
      ));
  }
  update() {
    this._dirtyId++;
  }
};
Nr.defaultOptions = { ubo: !1, isStatic: !1 };
let Lr = Nr;
class oi {
  constructor(t) {
    (this.resources = Object.create(null)), (this._dirty = !0);
    let e = 0;
    for (const i in t) {
      const n = t[i];
      this.setResource(n, e++);
    }
    this._updateKey();
  }
  _updateKey() {
    if (!this._dirty) return;
    this._dirty = !1;
    const t = [];
    let e = 0;
    for (const i in this.resources) t[e++] = this.resources[i]._resourceId;
    this._key = t.join("|");
  }
  setResource(t, e) {
    var n, r;
    const i = this.resources[e];
    t !== i &&
      (i &&
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
    for (const i in e) e[i]._touched = t;
  }
  destroy() {
    var e;
    const t = this.resources;
    for (const i in t) {
      const n = t[i];
      (e = n.off) == null || e.call(n, "change", this.onResourceChange, this);
    }
    this.resources = null;
  }
  onResourceChange(t) {
    if (((this._dirty = !0), t.destroyed)) {
      const e = this.resources;
      for (const i in e) e[i] === t && (e[i] = null);
    } else this._updateKey();
  }
}
var rs = ((s) => (
  (s[(s.WEBGL = 1)] = "WEBGL"),
  (s[(s.WEBGPU = 2)] = "WEBGPU"),
  (s[(s.BOTH = 3)] = "BOTH"),
  s
))(rs || {});
class Is extends jt {
  constructor(t) {
    super(),
      (this.uid = bt("shader")),
      (this._uniformBindMap = Object.create(null)),
      (this._ownedBindGroups = []);
    let {
      gpuProgram: e,
      glProgram: i,
      groups: n,
      resources: r,
      compatibleRenderers: a,
      groupMap: h,
    } = t;
    (this.gpuProgram = e),
      (this.glProgram = i),
      a === void 0 && ((a = 0), e && (a |= rs.WEBGPU), i && (a |= rs.WEBGL)),
      (this.compatibleRenderers = a);
    const c = {};
    if ((!r && !n && (r = {}), r && n))
      throw new Error("[Shader] Cannot have both resources and groups");
    if (!e && n && !h)
      throw new Error(
        "[Shader] No group map or WebGPU shader provided - consider using resources instead.",
      );
    if (!e && n && h)
      for (const u in h)
        for (const d in h[u]) {
          const o = h[u][d];
          c[o] = { group: u, binding: d, name: o };
        }
    else if (e && n && !h) {
      const u = e.structsAndGroups.groups;
      (h = {}),
        u.forEach((d) => {
          (h[d.group] = h[d.group] || {}),
            (h[d.group][d.binding] = d.name),
            (c[d.name] = d);
        });
    } else if (r) {
      (n = {}),
        (h = {}),
        e &&
          e.structsAndGroups.groups.forEach((o) => {
            (h[o.group] = h[o.group] || {}),
              (h[o.group][o.binding] = o.name),
              (c[o.name] = o);
          });
      let u = 0;
      for (const d in r)
        c[d] ||
          (n[99] || ((n[99] = new oi()), this._ownedBindGroups.push(n[99])),
          (c[d] = { group: 99, binding: u, name: d }),
          (h[99] = h[99] || {}),
          (h[99][u] = d),
          u++);
      for (const d in r) {
        const o = d;
        let l = r[d];
        !l.source && !l._resourceType && (l = new Lr(l));
        const A = c[o];
        A &&
          (n[A.group] ||
            ((n[A.group] = new oi()), this._ownedBindGroups.push(n[A.group])),
          n[A.group].setResource(l, A.binding));
      }
    }
    (this.groups = n),
      (this._uniformBindMap = h),
      (this.resources = this._buildResourceAccessor(n, c));
  }
  addResource(t, e, i) {
    var n, r;
    (n = this._uniformBindMap)[e] || (n[e] = {}),
      (r = this._uniformBindMap[e])[i] || (r[i] = t),
      this.groups[e] ||
        ((this.groups[e] = new oi()),
        this._ownedBindGroups.push(this.groups[e]));
  }
  _buildResourceAccessor(t, e) {
    const i = {};
    for (const n in e) {
      const r = e[n];
      Object.defineProperty(i, r.name, {
        get() {
          return t[r.group].getResource(r.binding);
        },
        set(a) {
          t[r.group].setResource(a, r.binding);
        },
      });
    }
    return i;
  }
  destroy(t = !1) {
    var e, i;
    this.emit("destroy", this),
      t &&
        ((e = this.gpuProgram) == null || e.destroy(),
        (i = this.glProgram) == null || i.destroy()),
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
    const { gpu: e, gl: i, ...n } = t;
    let r, a;
    return (
      e && (r = yi.from(e)),
      i && (a = Gr.from(i)),
      new Is({ gpuProgram: r, glProgram: a, ...n })
    );
  }
}
const as = [];
Bt.handleByNamedList(z.Environment, as);
async function oh(s) {
  if (!s)
    for (let t = 0; t < as.length; t++) {
      const e = as[t];
      if (e.value.test()) {
        await e.value.load();
        return;
      }
    }
}
let ke;
function hh() {
  if (typeof ke == "boolean") return ke;
  try {
    ke =
      new Function(
        "param1",
        "param2",
        "param3",
        "return param1[param2] === param3;",
      )({ a: "b" }, "a", "b") === !0;
  } catch {
    ke = !1;
  }
  return ke;
}
var $e = { exports: {} },
  An;
function lh() {
  if (An) return $e.exports;
  (An = 1), ($e.exports = s), ($e.exports.default = s);
  function s(y, C, v) {
    v = v || 2;
    var S = C && C.length,
      I = S ? C[0] * v : y.length,
      M = t(y, 0, I, v, !0),
      T = [];
    if (!M || M.next === M.prev) return T;
    var R, L, N, at, ot, tt, yt;
    if ((S && (M = c(y, C, M, v)), y.length > 80 * v)) {
      (R = N = y[0]), (L = at = y[1]);
      for (var nt = v; nt < I; nt += v)
        (ot = y[nt]),
          (tt = y[nt + 1]),
          ot < R && (R = ot),
          tt < L && (L = tt),
          ot > N && (N = ot),
          tt > at && (at = tt);
      (yt = Math.max(N - R, at - L)), (yt = yt !== 0 ? 32767 / yt : 0);
    }
    return i(M, T, v, R, L, yt, 0), T;
  }
  function t(y, C, v, S, I) {
    var M, T;
    if (I === Ht(y, C, v, S) > 0)
      for (M = C; M < v; M += S) T = rt(M, y[M], y[M + 1], T);
    else for (M = v - S; M >= C; M -= S) T = rt(M, y[M], y[M + 1], T);
    return T && E(T, T.next) && ($(T), (T = T.next)), T;
  }
  function e(y, C) {
    if (!y) return y;
    C || (C = y);
    var v = y,
      S;
    do
      if (
        ((S = !1), !v.steiner && (E(v, v.next) || b(v.prev, v, v.next) === 0))
      ) {
        if (($(v), (v = C = v.prev), v === v.next)) break;
        S = !0;
      } else v = v.next;
    while (S || v !== C);
    return C;
  }
  function i(y, C, v, S, I, M, T) {
    if (y) {
      !T && M && A(y, S, I, M);
      for (var R = y, L, N; y.prev !== y.next; ) {
        if (((L = y.prev), (N = y.next), M ? r(y, S, I, M) : n(y))) {
          C.push((L.i / v) | 0),
            C.push((y.i / v) | 0),
            C.push((N.i / v) | 0),
            $(y),
            (y = N.next),
            (R = N.next);
          continue;
        }
        if (((y = N), y === R)) {
          T
            ? T === 1
              ? ((y = a(e(y), C, v)), i(y, C, v, S, I, M, 2))
              : T === 2 && h(y, C, v, S, I, M)
            : i(e(y), C, v, S, I, M, 1);
          break;
        }
      }
    }
  }
  function n(y) {
    var C = y.prev,
      v = y,
      S = y.next;
    if (b(C, v, S) >= 0) return !1;
    for (
      var I = C.x,
        M = v.x,
        T = S.x,
        R = C.y,
        L = v.y,
        N = S.y,
        at = I < M ? (I < T ? I : T) : M < T ? M : T,
        ot = R < L ? (R < N ? R : N) : L < N ? L : N,
        tt = I > M ? (I > T ? I : T) : M > T ? M : T,
        yt = R > L ? (R > N ? R : N) : L > N ? L : N,
        nt = S.next;
      nt !== C;

    ) {
      if (
        nt.x >= at &&
        nt.x <= tt &&
        nt.y >= ot &&
        nt.y <= yt &&
        m(I, R, M, L, T, N, nt.x, nt.y) &&
        b(nt.prev, nt, nt.next) >= 0
      )
        return !1;
      nt = nt.next;
    }
    return !0;
  }
  function r(y, C, v, S) {
    var I = y.prev,
      M = y,
      T = y.next;
    if (b(I, M, T) >= 0) return !1;
    for (
      var R = I.x,
        L = M.x,
        N = T.x,
        at = I.y,
        ot = M.y,
        tt = T.y,
        yt = R < L ? (R < N ? R : N) : L < N ? L : N,
        nt = at < ot ? (at < tt ? at : tt) : ot < tt ? ot : tt,
        te = R > L ? (R > N ? R : N) : L > N ? L : N,
        Rt = at > ot ? (at > tt ? at : tt) : ot > tt ? ot : tt,
        Wt = p(yt, nt, C, v, S),
        qt = p(te, Rt, C, v, S),
        W = y.prevZ,
        st = y.nextZ;
      W && W.z >= Wt && st && st.z <= qt;

    ) {
      if (
        (W.x >= yt &&
          W.x <= te &&
          W.y >= nt &&
          W.y <= Rt &&
          W !== I &&
          W !== T &&
          m(R, at, L, ot, N, tt, W.x, W.y) &&
          b(W.prev, W, W.next) >= 0) ||
        ((W = W.prevZ),
        st.x >= yt &&
          st.x <= te &&
          st.y >= nt &&
          st.y <= Rt &&
          st !== I &&
          st !== T &&
          m(R, at, L, ot, N, tt, st.x, st.y) &&
          b(st.prev, st, st.next) >= 0)
      )
        return !1;
      st = st.nextZ;
    }
    for (; W && W.z >= Wt; ) {
      if (
        W.x >= yt &&
        W.x <= te &&
        W.y >= nt &&
        W.y <= Rt &&
        W !== I &&
        W !== T &&
        m(R, at, L, ot, N, tt, W.x, W.y) &&
        b(W.prev, W, W.next) >= 0
      )
        return !1;
      W = W.prevZ;
    }
    for (; st && st.z <= qt; ) {
      if (
        st.x >= yt &&
        st.x <= te &&
        st.y >= nt &&
        st.y <= Rt &&
        st !== I &&
        st !== T &&
        m(R, at, L, ot, N, tt, st.x, st.y) &&
        b(st.prev, st, st.next) >= 0
      )
        return !1;
      st = st.nextZ;
    }
    return !0;
  }
  function a(y, C, v) {
    var S = y;
    do {
      var I = S.prev,
        M = S.next.next;
      !E(I, M) &&
        D(I, S, S.next, M) &&
        Q(I, M) &&
        Q(M, I) &&
        (C.push((I.i / v) | 0),
        C.push((S.i / v) | 0),
        C.push((M.i / v) | 0),
        $(S),
        $(S.next),
        (S = y = M)),
        (S = S.next);
    } while (S !== y);
    return e(S);
  }
  function h(y, C, v, S, I, M) {
    var T = y;
    do {
      for (var R = T.next.next; R !== T.prev; ) {
        if (T.i !== R.i && x(T, R)) {
          var L = O(T, R);
          (T = e(T, T.next)),
            (L = e(L, L.next)),
            i(T, C, v, S, I, M, 0),
            i(L, C, v, S, I, M, 0);
          return;
        }
        R = R.next;
      }
      T = T.next;
    } while (T !== y);
  }
  function c(y, C, v, S) {
    var I = [],
      M,
      T,
      R,
      L,
      N;
    for (M = 0, T = C.length; M < T; M++)
      (R = C[M] * S),
        (L = M < T - 1 ? C[M + 1] * S : y.length),
        (N = t(y, R, L, S, !1)),
        N === N.next && (N.steiner = !0),
        I.push(g(N));
    for (I.sort(u), M = 0; M < I.length; M++) v = d(I[M], v);
    return v;
  }
  function u(y, C) {
    return y.x - C.x;
  }
  function d(y, C) {
    var v = o(y, C);
    if (!v) return C;
    var S = O(v, y);
    return e(S, S.next), e(v, v.next);
  }
  function o(y, C) {
    var v = C,
      S = y.x,
      I = y.y,
      M = -1 / 0,
      T;
    do {
      if (I <= v.y && I >= v.next.y && v.next.y !== v.y) {
        var R = v.x + ((I - v.y) * (v.next.x - v.x)) / (v.next.y - v.y);
        if (
          R <= S &&
          R > M &&
          ((M = R), (T = v.x < v.next.x ? v : v.next), R === S)
        )
          return T;
      }
      v = v.next;
    } while (v !== C);
    if (!T) return null;
    var L = T,
      N = T.x,
      at = T.y,
      ot = 1 / 0,
      tt;
    v = T;
    do
      S >= v.x &&
        v.x >= N &&
        S !== v.x &&
        m(I < at ? S : M, I, N, at, I < at ? M : S, I, v.x, v.y) &&
        ((tt = Math.abs(I - v.y) / (S - v.x)),
        Q(v, y) &&
          (tt < ot || (tt === ot && (v.x > T.x || (v.x === T.x && l(T, v))))) &&
          ((T = v), (ot = tt))),
        (v = v.next);
    while (v !== L);
    return T;
  }
  function l(y, C) {
    return b(y.prev, y, C.prev) < 0 && b(C.next, y, y.next) < 0;
  }
  function A(y, C, v, S) {
    var I = y;
    do
      I.z === 0 && (I.z = p(I.x, I.y, C, v, S)),
        (I.prevZ = I.prev),
        (I.nextZ = I.next),
        (I = I.next);
    while (I !== y);
    (I.prevZ.nextZ = null), (I.prevZ = null), f(I);
  }
  function f(y) {
    var C,
      v,
      S,
      I,
      M,
      T,
      R,
      L,
      N = 1;
    do {
      for (v = y, y = null, M = null, T = 0; v; ) {
        for (T++, S = v, R = 0, C = 0; C < N && (R++, (S = S.nextZ), !!S); C++);
        for (L = N; R > 0 || (L > 0 && S); )
          R !== 0 && (L === 0 || !S || v.z <= S.z)
            ? ((I = v), (v = v.nextZ), R--)
            : ((I = S), (S = S.nextZ), L--),
            M ? (M.nextZ = I) : (y = I),
            (I.prevZ = M),
            (M = I);
        v = S;
      }
      (M.nextZ = null), (N *= 2);
    } while (T > 1);
    return y;
  }
  function p(y, C, v, S, I) {
    return (
      (y = ((y - v) * I) | 0),
      (C = ((C - S) * I) | 0),
      (y = (y | (y << 8)) & 16711935),
      (y = (y | (y << 4)) & 252645135),
      (y = (y | (y << 2)) & 858993459),
      (y = (y | (y << 1)) & 1431655765),
      (C = (C | (C << 8)) & 16711935),
      (C = (C | (C << 4)) & 252645135),
      (C = (C | (C << 2)) & 858993459),
      (C = (C | (C << 1)) & 1431655765),
      y | (C << 1)
    );
  }
  function g(y) {
    var C = y,
      v = y;
    do (C.x < v.x || (C.x === v.x && C.y < v.y)) && (v = C), (C = C.next);
    while (C !== y);
    return v;
  }
  function m(y, C, v, S, I, M, T, R) {
    return (
      (I - T) * (C - R) >= (y - T) * (M - R) &&
      (y - T) * (S - R) >= (v - T) * (C - R) &&
      (v - T) * (M - R) >= (I - T) * (S - R)
    );
  }
  function x(y, C) {
    return (
      y.next.i !== C.i &&
      y.prev.i !== C.i &&
      !X(y, C) &&
      ((Q(y, C) &&
        Q(C, y) &&
        U(y, C) &&
        (b(y.prev, y, C.prev) || b(y, C.prev, C))) ||
        (E(y, C) && b(y.prev, y, y.next) > 0 && b(C.prev, C, C.next) > 0))
    );
  }
  function b(y, C, v) {
    return (C.y - y.y) * (v.x - C.x) - (C.x - y.x) * (v.y - C.y);
  }
  function E(y, C) {
    return y.x === C.x && y.y === C.y;
  }
  function D(y, C, v, S) {
    var I = P(b(y, C, v)),
      M = P(b(y, C, S)),
      T = P(b(v, S, y)),
      R = P(b(v, S, C));
    return !!(
      (I !== M && T !== R) ||
      (I === 0 && _(y, v, C)) ||
      (M === 0 && _(y, S, C)) ||
      (T === 0 && _(v, y, S)) ||
      (R === 0 && _(v, C, S))
    );
  }
  function _(y, C, v) {
    return (
      C.x <= Math.max(y.x, v.x) &&
      C.x >= Math.min(y.x, v.x) &&
      C.y <= Math.max(y.y, v.y) &&
      C.y >= Math.min(y.y, v.y)
    );
  }
  function P(y) {
    return y > 0 ? 1 : y < 0 ? -1 : 0;
  }
  function X(y, C) {
    var v = y;
    do {
      if (
        v.i !== y.i &&
        v.next.i !== y.i &&
        v.i !== C.i &&
        v.next.i !== C.i &&
        D(v, v.next, y, C)
      )
        return !0;
      v = v.next;
    } while (v !== y);
    return !1;
  }
  function Q(y, C) {
    return b(y.prev, y, y.next) < 0
      ? b(y, C, y.next) >= 0 && b(y, y.prev, C) >= 0
      : b(y, C, y.prev) < 0 || b(y, y.next, C) < 0;
  }
  function U(y, C) {
    var v = y,
      S = !1,
      I = (y.x + C.x) / 2,
      M = (y.y + C.y) / 2;
    do
      v.y > M != v.next.y > M &&
        v.next.y !== v.y &&
        I < ((v.next.x - v.x) * (M - v.y)) / (v.next.y - v.y) + v.x &&
        (S = !S),
        (v = v.next);
    while (v !== y);
    return S;
  }
  function O(y, C) {
    var v = new lt(y.i, y.x, y.y),
      S = new lt(C.i, C.x, C.y),
      I = y.next,
      M = C.prev;
    return (
      (y.next = C),
      (C.prev = y),
      (v.next = I),
      (I.prev = v),
      (S.next = v),
      (v.prev = S),
      (M.next = S),
      (S.prev = M),
      S
    );
  }
  function rt(y, C, v, S) {
    var I = new lt(y, C, v);
    return (
      S
        ? ((I.next = S.next), (I.prev = S), (S.next.prev = I), (S.next = I))
        : ((I.prev = I), (I.next = I)),
      I
    );
  }
  function $(y) {
    (y.next.prev = y.prev),
      (y.prev.next = y.next),
      y.prevZ && (y.prevZ.nextZ = y.nextZ),
      y.nextZ && (y.nextZ.prevZ = y.prevZ);
  }
  function lt(y, C, v) {
    (this.i = y),
      (this.x = C),
      (this.y = v),
      (this.prev = null),
      (this.next = null),
      (this.z = 0),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1);
  }
  s.deviation = function (y, C, v, S) {
    var I = C && C.length,
      M = I ? C[0] * v : y.length,
      T = Math.abs(Ht(y, 0, M, v));
    if (I)
      for (var R = 0, L = C.length; R < L; R++) {
        var N = C[R] * v,
          at = R < L - 1 ? C[R + 1] * v : y.length;
        T -= Math.abs(Ht(y, N, at, v));
      }
    var ot = 0;
    for (R = 0; R < S.length; R += 3) {
      var tt = S[R] * v,
        yt = S[R + 1] * v,
        nt = S[R + 2] * v;
      ot += Math.abs(
        (y[tt] - y[nt]) * (y[yt + 1] - y[tt + 1]) -
          (y[tt] - y[yt]) * (y[nt + 1] - y[tt + 1]),
      );
    }
    return T === 0 && ot === 0 ? 0 : Math.abs((ot - T) / T);
  };
  function Ht(y, C, v, S) {
    for (var I = 0, M = C, T = v - S; M < v; M += S)
      (I += (y[T] - y[M]) * (y[M + 1] + y[T + 1])), (T = M);
    return I;
  }
  return (
    (s.flatten = function (y) {
      for (
        var C = y[0][0].length,
          v = { vertices: [], holes: [], dimensions: C },
          S = 0,
          I = 0;
        I < y.length;
        I++
      ) {
        for (var M = 0; M < y[I].length; M++)
          for (var T = 0; T < C; T++) v.vertices.push(y[I][M][T]);
        I > 0 && ((S += y[I - 1].length), v.holes.push(S));
      }
      return v;
    }),
    $e.exports
  );
}
var ch = lh();
const Ah = Cs(ch);
var Xr = ((s) => (
  (s[(s.NONE = 0)] = "NONE"),
  (s[(s.COLOR = 16384)] = "COLOR"),
  (s[(s.STENCIL = 1024)] = "STENCIL"),
  (s[(s.DEPTH = 256)] = "DEPTH"),
  (s[(s.COLOR_DEPTH = 16640)] = "COLOR_DEPTH"),
  (s[(s.COLOR_STENCIL = 17408)] = "COLOR_STENCIL"),
  (s[(s.DEPTH_STENCIL = 1280)] = "DEPTH_STENCIL"),
  (s[(s.ALL = 17664)] = "ALL"),
  s
))(Xr || {});
class uh {
  constructor(t) {
    (this.items = []), (this._name = t);
  }
  emit(t, e, i, n, r, a, h, c) {
    const { name: u, items: d } = this;
    for (let o = 0, l = d.length; o < l; o++) d[o][u](t, e, i, n, r, a, h, c);
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
const dh = [
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
  Vr = class jr extends jt {
    constructor(t) {
      super(),
        (this.runners = Object.create(null)),
        (this.renderPipes = Object.create(null)),
        (this._initOptions = {}),
        (this._systemsHash = Object.create(null)),
        (this.type = t.type),
        (this.name = t.name),
        (this.config = t);
      const e = [...dh, ...(this.config.runners ?? [])];
      this._addRunners(...e), this._unsafeEvalCheck();
    }
    async init(t = {}) {
      const e = t.skipExtensionImports === !0 ? !0 : t.manageImports === !1;
      await oh(e),
        this._addSystems(this.config.systems),
        this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors);
      for (const i in this._systemsHash)
        t = { ...this._systemsHash[i].constructor.defaultOptions, ...t };
      (t = { ...jr.defaultOptions, ...t }),
        (this._roundPixels = t.roundPixels ? 1 : 0);
      for (let i = 0; i < this.runners.init.items.length; i++)
        await this.runners.init.items[i].init(t);
      this._initOptions = t;
    }
    render(t, e) {
      let i = t;
      if (
        (i instanceof gt &&
          ((i = { container: i }),
          e &&
            (J(
              ht,
              "passing a second argument is deprecated, please use render options instead",
            ),
            (i.target = e.renderTexture))),
        i.target || (i.target = this.view.renderTarget),
        i.target === this.view.renderTarget &&
          ((this._lastObjectRendered = i.container),
          i.clearColor ?? (i.clearColor = this.background.colorRgba),
          i.clear ?? (i.clear = this.background.clearBeforeRender)),
        i.clearColor)
      ) {
        const n = Array.isArray(i.clearColor) && i.clearColor.length === 4;
        i.clearColor = n
          ? i.clearColor
          : vt.shared.setValue(i.clearColor).toArray();
      }
      i.transform ||
        (i.container.updateLocalTransform(),
        (i.transform = i.container.localTransform)),
        i.container.enableRenderGroup(),
        this.runners.prerender.emit(i),
        this.runners.renderStart.emit(i),
        this.runners.render.emit(i),
        this.runners.renderEnd.emit(i),
        this.runners.postrender.emit(i);
    }
    resize(t, e, i) {
      const n = this.view.resolution;
      this.view.resize(t, e, i),
        this.emit(
          "resize",
          this.view.screen.width,
          this.view.screen.height,
          this.view.resolution,
        ),
        i !== void 0 && i !== n && this.runners.resolutionChange.emit(i);
    }
    clear(t = {}) {
      const e = this;
      t.target || (t.target = e.renderTarget.renderTarget),
        t.clearColor || (t.clearColor = this.background.colorRgba),
        t.clear ?? (t.clear = Xr.ALL);
      const { clear: i, clearColor: n, target: r } = t;
      vt.shared.setValue(n ?? this.background.colorRgba),
        e.renderTarget.clear(r, i, vt.shared.toArray());
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
        this.runners[e] = new uh(e);
      });
    }
    _addSystems(t) {
      let e;
      for (e in t) {
        const i = t[e];
        this._addSystem(i.value, i.name);
      }
    }
    _addSystem(t, e) {
      const i = new t(this);
      if (this[e]) throw new Error(`Whoops! The name "${e}" is already in use`);
      (this[e] = i), (this._systemsHash[e] = i);
      for (const n in this.runners) this.runners[n].add(i);
      return this;
    }
    _addPipes(t, e) {
      const i = e.reduce((n, r) => ((n[r.name] = r.value), n), {});
      t.forEach((n) => {
        const r = n.value,
          a = n.name,
          h = i[a];
        this.renderPipes[a] = new r(this, h ? new h() : null);
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
      if (!hh())
        throw new Error(
          "Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.",
        );
    }
    resetState() {
      this.runners.resetState.emit();
    }
  };
Vr.defaultOptions = {
  resolution: 1,
  failIfMajorPerformanceCaveat: !1,
  roundPixels: !1,
};
let Yr = Vr,
  ti;
function fh(s) {
  return (
    ti !== void 0 ||
      (ti = (() => {
        var e;
        const t = {
          stencil: !0,
          failIfMajorPerformanceCaveat:
            s ?? Yr.defaultOptions.failIfMajorPerformanceCaveat,
        };
        try {
          if (!mt.get().getWebGLRenderingContext()) return !1;
          let n = mt.get().createCanvas().getContext("webgl", t);
          const r = !!(
            (e = n == null ? void 0 : n.getContextAttributes()) != null &&
            e.stencil
          );
          if (n) {
            const a = n.getExtension("WEBGL_lose_context");
            a && a.loseContext();
          }
          return (n = null), r;
        } catch {
          return !1;
        }
      })()),
    ti
  );
}
let ei;
async function gh(s = {}) {
  return (
    ei !== void 0 ||
      (ei = await (async () => {
        const t = mt.get().getNavigator().gpu;
        if (!t) return !1;
        try {
          return await (await t.requestAdapter(s)).requestDevice(), !0;
        } catch {
          return !1;
        }
      })()),
    ei
  );
}
const un = ["webgl", "webgpu", "canvas"];
async function ph(s) {
  let t = [];
  s.preference
    ? (t.push(s.preference),
      un.forEach((r) => {
        r !== s.preference && t.push(r);
      }))
    : (t = un.slice());
  let e,
    i = {};
  for (let r = 0; r < t.length; r++) {
    const a = t[r];
    if (a === "webgpu" && (await gh())) {
      const { WebGPURenderer: h } = await li(
        async () => {
          const { WebGPURenderer: c } = await import(
            "./WebGPURenderer-C_e0WcSY.js"
          );
          return { WebGPURenderer: c };
        },
        __vite__mapDeps([3, 2, 4]),
        import.meta.url,
      );
      (e = h), (i = { ...s, ...s.webgpu });
      break;
    } else if (
      a === "webgl" &&
      fh(
        s.failIfMajorPerformanceCaveat ??
          Yr.defaultOptions.failIfMajorPerformanceCaveat,
      )
    ) {
      const { WebGLRenderer: h } = await li(
        async () => {
          const { WebGLRenderer: c } = await import(
            "./WebGLRenderer-mblQT0o9.js"
          );
          return { WebGLRenderer: c };
        },
        __vite__mapDeps([5, 2, 4]),
        import.meta.url,
      );
      (e = h), (i = { ...s, ...s.webgl });
      break;
    } else if (a === "canvas")
      throw (
        ((i = { ...s }), new Error("CanvasRenderer is not yet implemented"))
      );
  }
  if ((delete i.webgpu, delete i.webgl, !e))
    throw new Error("No available renderer for the current environment");
  const n = new e();
  return await n.init(i), n;
}
const Wr = "8.9.2";
class qr {
  static init() {
    var t;
    (t = globalThis.__PIXI_APP_INIT__) == null || t.call(globalThis, this, Wr);
  }
  static destroy() {}
}
qr.extension = z.Application;
class mh {
  constructor(t) {
    this._renderer = t;
  }
  init() {
    var t;
    (t = globalThis.__PIXI_RENDERER_INIT__) == null ||
      t.call(globalThis, this._renderer, Wr);
  }
  destroy() {
    this._renderer = null;
  }
}
mh.extension = {
  type: [z.WebGLSystem, z.WebGPUSystem],
  name: "initHook",
  priority: -10,
};
const Kr = class os {
  constructor(...t) {
    (this.stage = new gt()),
      t[0] !== void 0 &&
        J(
          ht,
          "Application constructor options are deprecated, please use Application.init() instead.",
        );
  }
  async init(t) {
    (t = { ...t }),
      (this.renderer = await ph(t)),
      os._plugins.forEach((e) => {
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
      J(
        ht,
        "Application.view is deprecated, please use Application.canvas instead.",
      ),
      this.renderer.canvas
    );
  }
  get screen() {
    return this.renderer.screen;
  }
  destroy(t = !1, e = !1) {
    const i = os._plugins.slice(0);
    i.reverse(),
      i.forEach((n) => {
        n.destroy.call(this);
      }),
      this.stage.destroy(e),
      (this.stage = null),
      this.renderer.destroy(t),
      (this.renderer = null);
  }
};
Kr._plugins = [];
let Jr = Kr;
Bt.handleByList(z.Application, Jr._plugins);
Bt.add(qr);
class Zr extends jt {
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
      J(
        ht,
        "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead.",
      ),
      this.fontFamily
    );
  }
  get pageTextures() {
    return (
      J(
        ht,
        "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.",
      ),
      this.pages
    );
  }
  get size() {
    return (
      J(
        ht,
        "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead.",
      ),
      this.fontMetrics.fontSize
    );
  }
  get distanceFieldRange() {
    return (
      J(
        ht,
        "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead.",
      ),
      this.distanceField.range
    );
  }
  get distanceFieldType() {
    return (
      J(
        ht,
        "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead.",
      ),
      this.distanceField.type
    );
  }
  destroy(t = !1) {
    var e;
    this.emit("destroy", this), this.removeAllListeners();
    for (const i in this.chars)
      (e = this.chars[i].texture) == null || e.destroy();
    (this.chars = null),
      t &&
        (this.pages.forEach((i) => i.texture.destroy(!0)), (this.pages = null));
  }
}
const dn = [
    { offset: 0, color: "white" },
    { offset: 1, color: "black" },
  ],
  _s = class hs {
    constructor(...t) {
      (this.uid = bt("fillGradient")),
        (this.type = "linear"),
        (this.colorStops = []);
      let e = yh(t);
      (e = {
        ...(e.type === "radial"
          ? hs.defaultRadialOptions
          : hs.defaultLinearOptions),
        ...hr(e),
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
          color: vt.shared.setValue(e).toHexa(),
        }),
        this
      );
    }
    buildLinearGradient() {
      if (this.texture) return;
      let { x: t, y: e } = this.start,
        { x: i, y: n } = this.end,
        r = i - t,
        a = n - e;
      const h = r < 0 || a < 0;
      if (this._wrapMode === "clamp-to-edge") {
        if (r < 0) {
          const g = t;
          (t = i), (i = g), (r *= -1);
        }
        if (a < 0) {
          const g = e;
          (e = n), (n = g), (a *= -1);
        }
      }
      const c = this.colorStops.length ? this.colorStops : dn,
        u = this._textureSize,
        { canvas: d, context: o } = gn(u, 1),
        l = h
          ? o.createLinearGradient(this._textureSize, 0, 0, 0)
          : o.createLinearGradient(0, 0, this._textureSize, 0);
      fn(l, c),
        (o.fillStyle = l),
        o.fillRect(0, 0, u, 1),
        (this.texture = new q({
          source: new ge({ resource: d, addressMode: this._wrapMode }),
        }));
      const A = Math.sqrt(r * r + a * a),
        f = Math.atan2(a, r),
        p = new K();
      p.scale(A / u, 1),
        p.rotate(f),
        p.translate(t, e),
        this.textureSpace === "local" && p.scale(u, u),
        (this.transform = p);
    }
    buildGradient() {
      this.type === "linear"
        ? this.buildLinearGradient()
        : this.buildRadialGradient();
    }
    buildRadialGradient() {
      if (this.texture) return;
      const t = this.colorStops.length ? this.colorStops : dn,
        e = this._textureSize,
        { canvas: i, context: n } = gn(e, e),
        { x: r, y: a } = this.center,
        { x: h, y: c } = this.outerCenter,
        u = this.innerRadius,
        d = this.outerRadius,
        o = h - d,
        l = c - d,
        A = e / (d * 2),
        f = (r - o) * A,
        p = (a - l) * A,
        g = n.createRadialGradient(
          f,
          p,
          u * A,
          (h - o) * A,
          (c - l) * A,
          d * A,
        );
      fn(g, t),
        (n.fillStyle = t[t.length - 1].color),
        n.fillRect(0, 0, e, e),
        (n.fillStyle = g),
        n.translate(f, p),
        n.rotate(this.rotation),
        n.scale(1, this.scale),
        n.translate(-f, -p),
        n.fillRect(0, 0, e, e),
        (this.texture = new q({
          source: new ge({ resource: i, addressMode: this._wrapMode }),
        }));
      const m = new K();
      m.scale(1 / A, 1 / A),
        m.translate(o, l),
        this.textureSpace === "local" && m.scale(e, e),
        (this.transform = m);
    }
    get styleKey() {
      return this.uid;
    }
    destroy() {
      var t;
      (t = this.texture) == null || t.destroy(!0), (this.texture = null);
    }
  };
_s.defaultLinearOptions = {
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  colorStops: [],
  textureSpace: "local",
  type: "linear",
  textureSize: 256,
  wrapMode: "clamp-to-edge",
};
_s.defaultRadialOptions = {
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
let ne = _s;
function fn(s, t) {
  for (let e = 0; e < t.length; e++) {
    const i = t[e];
    s.addColorStop(i.offset, i.color);
  }
}
function gn(s, t) {
  const e = mt.get().createCanvas(s, t),
    i = e.getContext("2d");
  return { canvas: e, context: i };
}
function yh(s) {
  let t = s[0] ?? {};
  return (
    (typeof t == "number" || s[1]) &&
      (J("8.5.2", "use options object instead"),
      (t = {
        type: "linear",
        start: { x: s[0], y: s[1] },
        end: { x: s[2], y: s[3] },
        textureSpace: s[4],
        textureSize: s[5] ?? ne.defaultLinearOptions.textureSize,
      })),
    t
  );
}
const pn = {
  repeat: { addressModeU: "repeat", addressModeV: "repeat" },
  "repeat-x": { addressModeU: "repeat", addressModeV: "clamp-to-edge" },
  "repeat-y": { addressModeU: "clamp-to-edge", addressModeV: "repeat" },
  "no-repeat": { addressModeU: "clamp-to-edge", addressModeV: "clamp-to-edge" },
};
class xi {
  constructor(t, e) {
    (this.uid = bt("fillPattern")),
      (this.transform = new K()),
      (this._styleKey = null),
      (this.texture = t),
      this.transform.scale(1 / t.frame.width, 1 / t.frame.height),
      e &&
        ((t.source.style.addressModeU = pn[e].addressModeU),
        (t.source.style.addressModeV = pn[e].addressModeV));
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
var Gi, mn;
function xh() {
  if (mn) return Gi;
  (mn = 1), (Gi = e);
  var s = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 },
    t = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
  function e(r) {
    var a = [];
    return (
      r.replace(t, function (h, c, u) {
        var d = c.toLowerCase();
        for (
          u = n(u),
            d == "m" &&
              u.length > 2 &&
              (a.push([c].concat(u.splice(0, 2))),
              (d = "l"),
              (c = c == "m" ? "l" : "L"));
          ;

        ) {
          if (u.length == s[d]) return u.unshift(c), a.push(u);
          if (u.length < s[d]) throw new Error("malformed path data");
          a.push([c].concat(u.splice(0, s[d])));
        }
      }),
      a
    );
  }
  var i = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
  function n(r) {
    var a = r.match(i);
    return a ? a.map(Number) : [];
  }
  return Gi;
}
var wh = xh();
const Ch = Cs(wh);
function bh(s, t) {
  const e = Ch(s),
    i = [];
  let n = null,
    r = 0,
    a = 0;
  for (let h = 0; h < e.length; h++) {
    const c = e[h],
      u = c[0],
      d = c;
    switch (u) {
      case "M":
        (r = d[1]), (a = d[2]), t.moveTo(r, a);
        break;
      case "m":
        (r += d[1]), (a += d[2]), t.moveTo(r, a);
        break;
      case "H":
        (r = d[1]), t.lineTo(r, a);
        break;
      case "h":
        (r += d[1]), t.lineTo(r, a);
        break;
      case "V":
        (a = d[1]), t.lineTo(r, a);
        break;
      case "v":
        (a += d[1]), t.lineTo(r, a);
        break;
      case "L":
        (r = d[1]), (a = d[2]), t.lineTo(r, a);
        break;
      case "l":
        (r += d[1]), (a += d[2]), t.lineTo(r, a);
        break;
      case "C":
        (r = d[5]), (a = d[6]), t.bezierCurveTo(d[1], d[2], d[3], d[4], r, a);
        break;
      case "c":
        t.bezierCurveTo(
          r + d[1],
          a + d[2],
          r + d[3],
          a + d[4],
          r + d[5],
          a + d[6],
        ),
          (r += d[5]),
          (a += d[6]);
        break;
      case "S":
        (r = d[3]), (a = d[4]), t.bezierCurveToShort(d[1], d[2], r, a);
        break;
      case "s":
        t.bezierCurveToShort(r + d[1], a + d[2], r + d[3], a + d[4]),
          (r += d[3]),
          (a += d[4]);
        break;
      case "Q":
        (r = d[3]), (a = d[4]), t.quadraticCurveTo(d[1], d[2], r, a);
        break;
      case "q":
        t.quadraticCurveTo(r + d[1], a + d[2], r + d[3], a + d[4]),
          (r += d[3]),
          (a += d[4]);
        break;
      case "T":
        (r = d[1]), (a = d[2]), t.quadraticCurveToShort(r, a);
        break;
      case "t":
        (r += d[1]), (a += d[2]), t.quadraticCurveToShort(r, a);
        break;
      case "A":
        (r = d[6]), (a = d[7]), t.arcToSvg(d[1], d[2], d[3], d[4], d[5], r, a);
        break;
      case "a":
        (r += d[6]),
          (a += d[7]),
          t.arcToSvg(d[1], d[2], d[3], d[4], d[5], r, a);
        break;
      case "Z":
      case "z":
        t.closePath(),
          i.length > 0 &&
            ((n = i.pop()),
            n ? ((r = n.startX), (a = n.startY)) : ((r = 0), (a = 0))),
          (n = null);
        break;
      default:
        At(`Unknown SVG path command: ${u}`);
    }
    u !== "Z" &&
      u !== "z" &&
      n === null &&
      ((n = { startX: r, startY: a }), i.push(n));
  }
  return t;
}
class Ps {
  constructor(t = 0, e = 0, i = 0) {
    (this.type = "circle"), (this.x = t), (this.y = e), (this.radius = i);
  }
  clone() {
    return new Ps(this.x, this.y, this.radius);
  }
  contains(t, e) {
    if (this.radius <= 0) return !1;
    const i = this.radius * this.radius;
    let n = this.x - t,
      r = this.y - e;
    return (n *= n), (r *= r), n + r <= i;
  }
  strokeContains(t, e, i, n = 0.5) {
    if (this.radius === 0) return !1;
    const r = this.x - t,
      a = this.y - e,
      h = this.radius,
      c = (1 - n) * i,
      u = Math.sqrt(r * r + a * a);
    return u <= h + c && u > h - (i - c);
  }
  getBounds(t) {
    return (
      t || (t = new Ct()),
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
class Ms {
  constructor(t = 0, e = 0, i = 0, n = 0) {
    (this.type = "ellipse"),
      (this.x = t),
      (this.y = e),
      (this.halfWidth = i),
      (this.halfHeight = n);
  }
  clone() {
    return new Ms(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  contains(t, e) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0) return !1;
    let i = (t - this.x) / this.halfWidth,
      n = (e - this.y) / this.halfHeight;
    return (i *= i), (n *= n), i + n <= 1;
  }
  strokeContains(t, e, i, n = 0.5) {
    const { halfWidth: r, halfHeight: a } = this;
    if (r <= 0 || a <= 0) return !1;
    const h = i * (1 - n),
      c = i - h,
      u = r - c,
      d = a - c,
      o = r + h,
      l = a + h,
      A = t - this.x,
      f = e - this.y,
      p = (A * A) / (u * u) + (f * f) / (d * d),
      g = (A * A) / (o * o) + (f * f) / (l * l);
    return p > 1 && g <= 1;
  }
  getBounds(t) {
    return (
      t || (t = new Ct()),
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
function vh(s, t, e, i, n, r) {
  const a = s - e,
    h = t - i,
    c = n - e,
    u = r - i,
    d = a * c + h * u,
    o = c * c + u * u;
  let l = -1;
  o !== 0 && (l = d / o);
  let A, f;
  l < 0
    ? ((A = e), (f = i))
    : l > 1
      ? ((A = n), (f = r))
      : ((A = e + l * c), (f = i + l * u));
  const p = s - A,
    g = t - f;
  return p * p + g * g;
}
let Eh, Sh;
class He {
  constructor(...t) {
    this.type = "polygon";
    let e = Array.isArray(t[0]) ? t[0] : t;
    if (typeof e[0] != "number") {
      const i = [];
      for (let n = 0, r = e.length; n < r; n++) i.push(e[n].x, e[n].y);
      e = i;
    }
    (this.points = e), (this.closePath = !0);
  }
  isClockwise() {
    let t = 0;
    const e = this.points,
      i = e.length;
    for (let n = 0; n < i; n += 2) {
      const r = e[n],
        a = e[n + 1],
        h = e[(n + 2) % i],
        c = e[(n + 3) % i];
      t += (h - r) * (c + a);
    }
    return t < 0;
  }
  containsPolygon(t) {
    const e = this.getBounds(Eh),
      i = t.getBounds(Sh);
    if (!e.containsRect(i)) return !1;
    const n = t.points;
    for (let r = 0; r < n.length; r += 2) {
      const a = n[r],
        h = n[r + 1];
      if (!this.contains(a, h)) return !1;
    }
    return !0;
  }
  clone() {
    const t = this.points.slice(),
      e = new He(t);
    return (e.closePath = this.closePath), e;
  }
  contains(t, e) {
    let i = !1;
    const n = this.points.length / 2;
    for (let r = 0, a = n - 1; r < n; a = r++) {
      const h = this.points[r * 2],
        c = this.points[r * 2 + 1],
        u = this.points[a * 2],
        d = this.points[a * 2 + 1];
      c > e != d > e && t < (u - h) * ((e - c) / (d - c)) + h && (i = !i);
    }
    return i;
  }
  strokeContains(t, e, i, n = 0.5) {
    const r = i * i,
      a = r * (1 - n),
      h = r - a,
      { points: c } = this,
      u = c.length - (this.closePath ? 0 : 2);
    for (let d = 0; d < u; d += 2) {
      const o = c[d],
        l = c[d + 1],
        A = c[(d + 2) % c.length],
        f = c[(d + 3) % c.length],
        p = vh(t, e, o, l, A, f),
        g = Math.sign((A - o) * (e - l) - (f - l) * (t - o));
      if (p <= (g < 0 ? h : a)) return !0;
    }
    return !1;
  }
  getBounds(t) {
    t || (t = new Ct());
    const e = this.points;
    let i = 1 / 0,
      n = -1 / 0,
      r = 1 / 0,
      a = -1 / 0;
    for (let h = 0, c = e.length; h < c; h += 2) {
      const u = e[h],
        d = e[h + 1];
      (i = u < i ? u : i),
        (n = u > n ? u : n),
        (r = d < r ? d : r),
        (a = d > a ? d : a);
    }
    return (t.x = i), (t.width = n - i), (t.y = r), (t.height = a - r), t;
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
const ii = (s, t, e, i, n, r, a) => {
  const h = s - e,
    c = t - i,
    u = Math.sqrt(h * h + c * c);
  return u >= n - r && u <= n + a;
};
class Ts {
  constructor(t = 0, e = 0, i = 0, n = 0, r = 20) {
    (this.type = "roundedRectangle"),
      (this.x = t),
      (this.y = e),
      (this.width = i),
      (this.height = n),
      (this.radius = r);
  }
  getBounds(t) {
    return (
      t || (t = new Ct()),
      (t.x = this.x),
      (t.y = this.y),
      (t.width = this.width),
      (t.height = this.height),
      t
    );
  }
  clone() {
    return new Ts(this.x, this.y, this.width, this.height, this.radius);
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
      const i = Math.max(
        0,
        Math.min(this.radius, Math.min(this.width, this.height) / 2),
      );
      if (
        (e >= this.y + i && e <= this.y + this.height - i) ||
        (t >= this.x + i && t <= this.x + this.width - i)
      )
        return !0;
      let n = t - (this.x + i),
        r = e - (this.y + i);
      const a = i * i;
      if (
        n * n + r * r <= a ||
        ((n = t - (this.x + this.width - i)), n * n + r * r <= a) ||
        ((r = e - (this.y + this.height - i)), n * n + r * r <= a) ||
        ((n = t - (this.x + i)), n * n + r * r <= a)
      )
        return !0;
    }
    return !1;
  }
  strokeContains(t, e, i, n = 0.5) {
    const { x: r, y: a, width: h, height: c, radius: u } = this,
      d = i * (1 - n),
      o = i - d,
      l = r + u,
      A = a + u,
      f = h - u * 2,
      p = c - u * 2,
      g = r + h,
      m = a + c;
    return (((t >= r - d && t <= r + o) || (t >= g - o && t <= g + d)) &&
      e >= A &&
      e <= A + p) ||
      (((e >= a - d && e <= a + o) || (e >= m - o && e <= m + d)) &&
        t >= l &&
        t <= l + f)
      ? !0
      : (t < l && e < A && ii(t, e, l, A, u, o, d)) ||
          (t > g - u && e < A && ii(t, e, g - u, A, u, o, d)) ||
          (t > g - u && e > m - u && ii(t, e, g - u, m - u, u, o, d)) ||
          (t < l && e > m - u && ii(t, e, l, m - u, u, o, d));
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}
const Bh = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}",
].join(`
`);
function Ih(s) {
  let t = "";
  for (let e = 0; e < s; ++e)
    e > 0 &&
      (t += `
else `),
      e < s - 1 && (t += `if(test == ${e}.0){}`);
  return t;
}
function _h(s, t) {
  if (s === 0)
    throw new Error(
      "Invalid value of `0` passed to `checkMaxIfStatementsInShader`",
    );
  const e = t.createShader(t.FRAGMENT_SHADER);
  try {
    for (;;) {
      const i = Bh.replace(/%forloop%/gi, Ih(s));
      if (
        (t.shaderSource(e, i),
        t.compileShader(e),
        !t.getShaderParameter(e, t.COMPILE_STATUS))
      )
        s = (s / 2) | 0;
      else break;
    }
  } finally {
    t.deleteShader(e);
  }
  return s;
}
let ye = null;
function $r() {
  var t;
  if (ye) return ye;
  const s = Ur();
  return (
    (ye = s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS)),
    (ye = _h(ye, s)),
    (t = s.getExtension("WEBGL_lose_context")) == null || t.loseContext(),
    ye
  );
}
const ta = {};
function Ph(s, t) {
  let e = 2166136261;
  for (let i = 0; i < t; i++)
    (e ^= s[i].uid), (e = Math.imul(e, 16777619)), (e >>>= 0);
  return ta[e] || Mh(s, t, e);
}
let zi = 0;
function Mh(s, t, e) {
  const i = {};
  let n = 0;
  zi || (zi = $r());
  for (let a = 0; a < zi; a++) {
    const h = a < t ? s[a] : q.EMPTY.source;
    (i[n++] = h.source), (i[n++] = h.style);
  }
  const r = new oi(i);
  return (ta[e] = r), r;
}
class yn {
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
function xn(s, t) {
  const e = (s.byteLength / 8) | 0,
    i = new Float64Array(s, 0, e);
  new Float64Array(t, 0, e).set(i);
  const r = s.byteLength - e * 8;
  if (r > 0) {
    const a = new Uint8Array(s, e * 8, r);
    new Uint8Array(t, e * 8, r).set(a);
  }
}
const Th = { normal: "normal-npm", add: "add-npm", screen: "screen-npm" };
var Dh = ((s) => (
  (s[(s.DISABLED = 0)] = "DISABLED"),
  (s[(s.RENDERING_MASK_ADD = 1)] = "RENDERING_MASK_ADD"),
  (s[(s.MASK_ACTIVE = 2)] = "MASK_ACTIVE"),
  (s[(s.INVERSE_MASK_ACTIVE = 3)] = "INVERSE_MASK_ACTIVE"),
  (s[(s.RENDERING_MASK_REMOVE = 4)] = "RENDERING_MASK_REMOVE"),
  (s[(s.NONE = 5)] = "NONE"),
  s
))(Dh || {});
function wn(s, t) {
  return (t.alphaMode === "no-premultiply-alpha" && Th[s]) || s;
}
class kh {
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
class Rh {
  constructor() {
    (this.renderPipeId = "batch"),
      (this.action = "startBatch"),
      (this.start = 0),
      (this.size = 0),
      (this.textures = new kh()),
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
const ea = [];
let ls = 0;
function Cn() {
  return ls > 0 ? ea[--ls] : new Rh();
}
function bn(s) {
  ea[ls++] = s;
}
let Re = 0;
const ia = class hi {
  constructor(t = {}) {
    (this.uid = bt("batcher")),
      (this.dirty = !0),
      (this.batchIndex = 0),
      (this.batches = []),
      (this._elements = []),
      (hi.defaultOptions.maxTextures = hi.defaultOptions.maxTextures ?? $r()),
      (t = { ...hi.defaultOptions, ...t });
    const {
      maxTextures: e,
      attributesInitialSize: i,
      indicesInitialSize: n,
    } = t;
    (this.attributeBuffer = new yn(i * 4)),
      (this.indexBuffer = new Uint16Array(n)),
      (this.maxTextures = e);
  }
  begin() {
    (this.elementSize = 0),
      (this.elementStart = 0),
      (this.indexSize = 0),
      (this.attributeSize = 0);
    for (let t = 0; t < this.batchIndex; t++) bn(this.batches[t]);
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
    const i = t._batch.textures.ids[e._source.uid];
    return !i && i !== 0 ? !1 : ((t._textureId = i), (t.texture = e), !0);
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
    let i = Cn(),
      n = i.textures;
    n.clear();
    const r = e[this.elementStart];
    let a = wn(r.blendMode, r.texture._source),
      h = r.topology;
    this.attributeSize * 4 > this.attributeBuffer.size &&
      this._resizeAttributeBuffer(this.attributeSize * 4),
      this.indexSize > this.indexBuffer.length &&
        this._resizeIndexBuffer(this.indexSize);
    const c = this.attributeBuffer.float32View,
      u = this.attributeBuffer.uint32View,
      d = this.indexBuffer;
    let o = this._batchIndexSize,
      l = this._batchIndexStart,
      A = "startBatch";
    const f = this.maxTextures;
    for (let p = this.elementStart; p < this.elementSize; ++p) {
      const g = e[p];
      e[p] = null;
      const x = g.texture._source,
        b = wn(g.blendMode, x),
        E = a !== b || h !== g.topology;
      if (x._batchTick === Re && !E) {
        (g._textureId = x._textureBindLocation),
          (o += g.indexSize),
          g.packAsQuad
            ? (this.packQuadAttributes(
                g,
                c,
                u,
                g._attributeStart,
                g._textureId,
              ),
              this.packQuadIndex(
                d,
                g._indexStart,
                g._attributeStart / this.vertexSize,
              ))
            : (this.packAttributes(g, c, u, g._attributeStart, g._textureId),
              this.packIndex(
                g,
                d,
                g._indexStart,
                g._attributeStart / this.vertexSize,
              )),
          (g._batch = i);
        continue;
      }
      (x._batchTick = Re),
        (n.count >= f || E) &&
          (this._finishBatch(i, l, o - l, n, a, h, t, A),
          (A = "renderBatch"),
          (l = o),
          (a = b),
          (h = g.topology),
          (i = Cn()),
          (n = i.textures),
          n.clear(),
          ++Re),
        (g._textureId = x._textureBindLocation = n.count),
        (n.ids[x.uid] = n.count),
        (n.textures[n.count++] = x),
        (g._batch = i),
        (o += g.indexSize),
        g.packAsQuad
          ? (this.packQuadAttributes(g, c, u, g._attributeStart, g._textureId),
            this.packQuadIndex(
              d,
              g._indexStart,
              g._attributeStart / this.vertexSize,
            ))
          : (this.packAttributes(g, c, u, g._attributeStart, g._textureId),
            this.packIndex(
              g,
              d,
              g._indexStart,
              g._attributeStart / this.vertexSize,
            ));
    }
    n.count > 0 &&
      (this._finishBatch(i, l, o - l, n, a, h, t, A), (l = o), ++Re),
      (this.elementStart = this.elementSize),
      (this._batchIndexStart = l),
      (this._batchIndexSize = o);
  }
  _finishBatch(t, e, i, n, r, a, h, c) {
    (t.gpuBindGroup = null),
      (t.bindGroup = null),
      (t.action = c),
      (t.batcher = this),
      (t.textures = n),
      (t.blendMode = r),
      (t.topology = a),
      (t.start = e),
      (t.size = i),
      ++Re,
      (this.batches[this.batchIndex++] = t),
      h.add(t);
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
      i = new yn(e);
    xn(this.attributeBuffer.rawBinaryData, i.rawBinaryData),
      (this.attributeBuffer = i);
  }
  _resizeIndexBuffer(t) {
    const e = this.indexBuffer;
    let i = Math.max(t, e.length * 1.5);
    i += i % 2;
    const n = i > 65535 ? new Uint32Array(i) : new Uint16Array(i);
    if (n.BYTES_PER_ELEMENT !== e.BYTES_PER_ELEMENT)
      for (let r = 0; r < e.length; r++) n[r] = e[r];
    else xn(e.buffer, n.buffer);
    this.indexBuffer = n;
  }
  packQuadIndex(t, e, i) {
    (t[e] = i + 0),
      (t[e + 1] = i + 1),
      (t[e + 2] = i + 2),
      (t[e + 3] = i + 0),
      (t[e + 4] = i + 2),
      (t[e + 5] = i + 3);
  }
  packIndex(t, e, i, n) {
    const r = t.indices,
      a = t.indexSize,
      h = t.indexOffset,
      c = t.attributeOffset;
    for (let u = 0; u < a; u++) e[i++] = n + r[u + h] - c;
  }
  destroy() {
    for (let t = 0; t < this.batches.length; t++) bn(this.batches[t]);
    this.batches = null;
    for (let t = 0; t < this._elements.length; t++)
      this._elements[t]._batch = null;
    (this._elements = null),
      (this.indexBuffer = null),
      this.attributeBuffer.destroy(),
      (this.attributeBuffer = null);
  }
};
ia.defaultOptions = {
  maxTextures: null,
  attributesInitialSize: 4,
  indicesInitialSize: 6,
};
let Qh = ia;
var kt = ((s) => (
  (s[(s.MAP_READ = 1)] = "MAP_READ"),
  (s[(s.MAP_WRITE = 2)] = "MAP_WRITE"),
  (s[(s.COPY_SRC = 4)] = "COPY_SRC"),
  (s[(s.COPY_DST = 8)] = "COPY_DST"),
  (s[(s.INDEX = 16)] = "INDEX"),
  (s[(s.VERTEX = 32)] = "VERTEX"),
  (s[(s.UNIFORM = 64)] = "UNIFORM"),
  (s[(s.STORAGE = 128)] = "STORAGE"),
  (s[(s.INDIRECT = 256)] = "INDIRECT"),
  (s[(s.QUERY_RESOLVE = 512)] = "QUERY_RESOLVE"),
  (s[(s.STATIC = 1024)] = "STATIC"),
  s
))(kt || {});
class Ve extends jt {
  constructor(t) {
    let { data: e, size: i } = t;
    const { usage: n, label: r, shrinkToFit: a } = t;
    super(),
      (this.uid = bt("buffer")),
      (this._resourceType = "buffer"),
      (this._resourceId = bt("resource")),
      (this._touched = 0),
      (this._updateID = 1),
      (this._dataInt32 = null),
      (this.shrinkToFit = !0),
      (this.destroyed = !1),
      e instanceof Array && (e = new Float32Array(e)),
      (this._data = e),
      i ?? (i = e == null ? void 0 : e.byteLength);
    const h = !!e;
    (this.descriptor = { size: i, usage: n, mappedAtCreation: h, label: r }),
      (this.shrinkToFit = a ?? !0);
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
    return !!(this.descriptor.usage & kt.STATIC);
  }
  set static(t) {
    t
      ? (this.descriptor.usage |= kt.STATIC)
      : (this.descriptor.usage &= ~kt.STATIC);
  }
  setDataWithSize(t, e, i) {
    if (
      (this._updateID++,
      (this._updateSize = e * t.BYTES_PER_ELEMENT),
      this._data === t)
    ) {
      i && this.emit("update", this);
      return;
    }
    const n = this._data;
    if (
      ((this._data = t), (this._dataInt32 = null), !n || n.length !== t.length)
    ) {
      !this.shrinkToFit && n && t.byteLength < n.byteLength
        ? i && this.emit("update", this)
        : ((this.descriptor.size = t.byteLength),
          (this._resourceId = bt("resource")),
          this.emit("change", this));
      return;
    }
    i && this.emit("update", this);
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
function sa(s, t) {
  if (!(s instanceof Ve)) {
    let e = t ? kt.INDEX : kt.VERTEX;
    s instanceof Array &&
      (t
        ? ((s = new Uint32Array(s)), (e = kt.INDEX | kt.COPY_DST))
        : ((s = new Float32Array(s)), (e = kt.VERTEX | kt.COPY_DST))),
      (s = new Ve({
        data: s,
        label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
        usage: e,
      }));
  }
  return s;
}
function Oh(s, t, e) {
  const i = s.getAttribute(t);
  if (!i) return (e.minX = 0), (e.minY = 0), (e.maxX = 0), (e.maxY = 0), e;
  const n = i.buffer.data;
  let r = 1 / 0,
    a = 1 / 0,
    h = -1 / 0,
    c = -1 / 0;
  const u = n.BYTES_PER_ELEMENT,
    d = (i.offset || 0) / u,
    o = (i.stride || 2 * 4) / u;
  for (let l = d; l < n.length; l += o) {
    const A = n[l],
      f = n[l + 1];
    A > h && (h = A), f > c && (c = f), A < r && (r = A), f < a && (a = f);
  }
  return (e.minX = r), (e.minY = a), (e.maxX = h), (e.maxY = c), e;
}
function Uh(s) {
  return (
    (s instanceof Ve || Array.isArray(s) || s.BYTES_PER_ELEMENT) &&
      (s = { buffer: s }),
    (s.buffer = sa(s.buffer, !1)),
    s
  );
}
class Fh extends jt {
  constructor(t = {}) {
    super(),
      (this.uid = bt("geometry")),
      (this._layoutKey = 0),
      (this.instanceCount = 1),
      (this._bounds = new Vt()),
      (this._boundsDirty = !0);
    const { attributes: e, indexBuffer: i, topology: n } = t;
    if (((this.buffers = []), (this.attributes = {}), e))
      for (const r in e) this.addAttribute(r, e[r]);
    (this.instanceCount = t.instanceCount ?? 1),
      i && this.addIndex(i),
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
    const i = Uh(e);
    this.buffers.indexOf(i.buffer) === -1 &&
      (this.buffers.push(i.buffer),
      i.buffer.on("update", this.onBufferUpdate, this),
      i.buffer.on("change", this.onBufferUpdate, this)),
      (this.attributes[t] = i);
  }
  addIndex(t) {
    (this.indexBuffer = sa(t, !0)), this.buffers.push(this.indexBuffer);
  }
  get bounds() {
    return this._boundsDirty
      ? ((this._boundsDirty = !1), Oh(this, "aPosition", this._bounds))
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
const Gh = new Float32Array(1),
  zh = new Uint32Array(1);
class Nh extends Fh {
  constructor() {
    const e = new Ve({
        data: Gh,
        label: "attribute-batch-buffer",
        usage: kt.VERTEX | kt.COPY_DST,
        shrinkToFit: !1,
      }),
      i = new Ve({
        data: zh,
        label: "index-batch-buffer",
        usage: kt.INDEX | kt.COPY_DST,
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
      indexBuffer: i,
    });
  }
}
function vn(s, t, e) {
  if (s)
    for (const i in s) {
      const n = i.toLocaleLowerCase(),
        r = t[n];
      if (r) {
        let a = s[i];
        i === "header" &&
          (a = a
            .replace(/@in\s+[^;]+;\s*/g, "")
            .replace(/@out\s+[^;]+;\s*/g, "")),
          e && r.push(`//----${e}----//`),
          r.push(a);
      } else At(`${i} placement hook does not exist in shader`);
    }
}
const Hh = /\{\{(.*?)\}\}/g;
function En(s) {
  var i;
  const t = {};
  return (
    (
      ((i = s.match(Hh)) == null
        ? void 0
        : i.map((n) => n.replace(/[{()}]/g, ""))) ?? []
    ).forEach((n) => {
      t[n] = [];
    }),
    t
  );
}
function Sn(s, t) {
  let e;
  const i = /@in\s+([^;]+);/g;
  for (; (e = i.exec(s)) !== null; ) t.push(e[1]);
}
function Bn(s, t, e = !1) {
  const i = [];
  Sn(t, i),
    s.forEach((h) => {
      h.header && Sn(h.header, i);
    });
  const n = i;
  e && n.sort();
  const r = n.map((h, c) => `       @location(${c}) ${h},`).join(`
`);
  let a = t.replace(/@in\s+[^;]+;\s*/g, "");
  return (
    (a = a.replace(
      "{{in}}",
      `
${r}
`,
    )),
    a
  );
}
function In(s, t) {
  let e;
  const i = /@out\s+([^;]+);/g;
  for (; (e = i.exec(s)) !== null; ) t.push(e[1]);
}
function Lh(s) {
  const e = /\b(\w+)\s*:/g.exec(s);
  return e ? e[1] : "";
}
function Xh(s) {
  const t = /@.*?\s+/g;
  return s.replace(t, "");
}
function Vh(s, t) {
  const e = [];
  In(t, e),
    s.forEach((c) => {
      c.header && In(c.header, e);
    });
  let i = 0;
  const n = e
      .sort()
      .map((c) => (c.indexOf("builtin") > -1 ? c : `@location(${i++}) ${c}`))
      .join(`,
`),
    r = e.sort().map((c) => `       var ${Xh(c)};`).join(`
`),
    a = `return VSOutput(
            ${e.sort().map((c) => ` ${Lh(c)}`).join(`,
`)});`;
  let h = t.replace(/@out\s+[^;]+;\s*/g, "");
  return (
    (h = h.replace(
      "{{struct}}",
      `
${n}
`,
    )),
    (h = h.replace(
      "{{start}}",
      `
${r}
`,
    )),
    (h = h.replace(
      "{{return}}",
      `
${a}
`,
    )),
    h
  );
}
function _n(s, t) {
  let e = s;
  for (const i in t) {
    const n = t[i];
    n.join(`
`).length
      ? (e = e.replace(
          `{{${i}}}`,
          `//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`,
        ))
      : (e = e.replace(`{{${i}}}`, ""));
  }
  return e;
}
const ae = Object.create(null),
  Ni = new Map();
let jh = 0;
function Yh({ template: s, bits: t }) {
  const e = na(s, t);
  if (ae[e]) return ae[e];
  const { vertex: i, fragment: n } = qh(s, t);
  return (ae[e] = ra(i, n, t)), ae[e];
}
function Wh({ template: s, bits: t }) {
  const e = na(s, t);
  return ae[e] || (ae[e] = ra(s.vertex, s.fragment, t)), ae[e];
}
function qh(s, t) {
  const e = t.map((a) => a.vertex).filter((a) => !!a),
    i = t.map((a) => a.fragment).filter((a) => !!a);
  let n = Bn(e, s.vertex, !0);
  n = Vh(e, n);
  const r = Bn(i, s.fragment, !0);
  return { vertex: n, fragment: r };
}
function na(s, t) {
  return (
    t
      .map((e) => (Ni.has(e) || Ni.set(e, jh++), Ni.get(e)))
      .sort((e, i) => e - i)
      .join("-") +
    s.vertex +
    s.fragment
  );
}
function ra(s, t, e) {
  const i = En(s),
    n = En(t);
  return (
    e.forEach((r) => {
      vn(r.vertex, i, r.name), vn(r.fragment, n, r.name);
    }),
    { vertex: _n(s, i), fragment: _n(t, n) }
  );
}
const Kh = `
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
  Jh = `
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
  Zh = `
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
  $h = `
   
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
  tl = {
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
  el = {
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
function il({ bits: s, name: t }) {
  const e = Yh({ template: { fragment: Jh, vertex: Kh }, bits: [tl, ...s] });
  return yi.from({
    name: t,
    vertex: { source: e.vertex, entryPoint: "main" },
    fragment: { source: e.fragment, entryPoint: "main" },
  });
}
function sl({ bits: s, name: t }) {
  return new Gr({
    name: t,
    ...Wh({ template: { vertex: Zh, fragment: $h }, bits: [el, ...s] }),
  });
}
const nl = {
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
  rl = {
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
  Hi = {};
function al(s) {
  const t = [];
  if (s === 1)
    t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),
      t.push("@group(1) @binding(1) var textureSampler1: sampler;");
  else {
    let e = 0;
    for (let i = 0; i < s; i++)
      t.push(
        `@group(1) @binding(${e++}) var textureSource${i + 1}: texture_2d<f32>;`,
      ),
        t.push(
          `@group(1) @binding(${e++}) var textureSampler${i + 1}: sampler;`,
        );
  }
  return t.join(`
`);
}
function ol(s) {
  const t = [];
  if (s === 1)
    t.push(
      "outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);",
    );
  else {
    t.push("switch vTextureId {");
    for (let e = 0; e < s; e++)
      e === s - 1 ? t.push("  default:{") : t.push(`  case ${e}:{`),
        t.push(
          `      outColor = textureSampleGrad(textureSource${e + 1}, textureSampler${e + 1}, vUV, uvDx, uvDy);`,
        ),
        t.push("      break;}");
    t.push("}");
  }
  return t.join(`
`);
}
function hl(s) {
  return (
    Hi[s] ||
      (Hi[s] = {
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

                ${al(s)}
            `,
          main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${ol(s)}
            `,
        },
      }),
    Hi[s]
  );
}
const Li = {};
function ll(s) {
  const t = [];
  for (let e = 0; e < s; e++)
    e > 0 && t.push("else"),
      e < s - 1 && t.push(`if(vTextureId < ${e}.5)`),
      t.push("{"),
      t.push(`	outColor = texture(uTextures[${e}], vUV);`),
      t.push("}");
  return t.join(`
`);
}
function cl(s) {
  return (
    Li[s] ||
      (Li[s] = {
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

                uniform sampler2D uTextures[${s}];

            `,
          main: `

                ${ll(s)}
            `,
        },
      }),
    Li[s]
  );
}
const Al = {
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
  ul = {
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
  Pn = {};
function dl(s) {
  let t = Pn[s];
  if (t) return t;
  const e = new Int32Array(s);
  for (let i = 0; i < s; i++) e[i] = i;
  return (
    (t = Pn[s] =
      new Lr(
        { uTextures: { value: e, type: "i32", size: s } },
        { isStatic: !0 },
      )),
    t
  );
}
class fl extends Is {
  constructor(t) {
    const e = sl({ name: "batch", bits: [rl, cl(t), ul] }),
      i = il({ name: "batch", bits: [nl, hl(t), Al] });
    super({ glProgram: e, gpuProgram: i, resources: { batchSamplers: dl(t) } });
  }
}
let Mn = null;
const aa = class oa extends Qh {
  constructor() {
    super(...arguments),
      (this.geometry = new Nh()),
      (this.shader = Mn || (Mn = new fl(this.maxTextures))),
      (this.name = oa.extension.name),
      (this.vertexSize = 6);
  }
  packAttributes(t, e, i, n, r) {
    const a = (r << 16) | (t.roundPixels & 65535),
      h = t.transform,
      c = h.a,
      u = h.b,
      d = h.c,
      o = h.d,
      l = h.tx,
      A = h.ty,
      { positions: f, uvs: p } = t,
      g = t.color,
      m = t.attributeOffset,
      x = m + t.attributeSize;
    for (let b = m; b < x; b++) {
      const E = b * 2,
        D = f[E],
        _ = f[E + 1];
      (e[n++] = c * D + d * _ + l),
        (e[n++] = o * _ + u * D + A),
        (e[n++] = p[E]),
        (e[n++] = p[E + 1]),
        (i[n++] = g),
        (i[n++] = a);
    }
  }
  packQuadAttributes(t, e, i, n, r) {
    const a = t.texture,
      h = t.transform,
      c = h.a,
      u = h.b,
      d = h.c,
      o = h.d,
      l = h.tx,
      A = h.ty,
      f = t.bounds,
      p = f.maxX,
      g = f.minX,
      m = f.maxY,
      x = f.minY,
      b = a.uvs,
      E = t.color,
      D = (r << 16) | (t.roundPixels & 65535);
    (e[n + 0] = c * g + d * x + l),
      (e[n + 1] = o * x + u * g + A),
      (e[n + 2] = b.x0),
      (e[n + 3] = b.y0),
      (i[n + 4] = E),
      (i[n + 5] = D),
      (e[n + 6] = c * p + d * x + l),
      (e[n + 7] = o * x + u * p + A),
      (e[n + 8] = b.x1),
      (e[n + 9] = b.y1),
      (i[n + 10] = E),
      (i[n + 11] = D),
      (e[n + 12] = c * p + d * m + l),
      (e[n + 13] = o * m + u * p + A),
      (e[n + 14] = b.x2),
      (e[n + 15] = b.y2),
      (i[n + 16] = E),
      (i[n + 17] = D),
      (e[n + 18] = c * g + d * m + l),
      (e[n + 19] = o * m + u * g + A),
      (e[n + 20] = b.x3),
      (e[n + 21] = b.y3),
      (i[n + 22] = E),
      (i[n + 23] = D);
  }
};
aa.extension = { type: [z.Batcher], name: "default" };
let gl = aa;
function pl(s, t, e, i, n, r, a, h = null) {
  let c = 0;
  (e *= t), (n *= r);
  const u = h.a,
    d = h.b,
    o = h.c,
    l = h.d,
    A = h.tx,
    f = h.ty;
  for (; c < a; ) {
    const p = s[e],
      g = s[e + 1];
    (i[n] = u * p + o * g + A),
      (i[n + 1] = d * p + l * g + f),
      (n += r),
      (e += t),
      c++;
  }
}
function ml(s, t, e, i) {
  let n = 0;
  for (t *= e; n < i; ) (s[t] = 0), (s[t + 1] = 0), (t += e), n++;
}
function ha(s, t, e, i, n) {
  const r = t.a,
    a = t.b,
    h = t.c,
    c = t.d,
    u = t.tx,
    d = t.ty;
  e || (e = 0), i || (i = 2), n || (n = s.length / i - e);
  let o = e * i;
  for (let l = 0; l < n; l++) {
    const A = s[o],
      f = s[o + 1];
    (s[o] = r * A + h * f + u), (s[o + 1] = a * A + c * f + d), (o += i);
  }
}
const yl = new K();
class la {
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
      i = this.renderable;
    return i
      ? yr(e, i.groupColor) + ((this.alpha * i.groupAlpha * 255) << 24)
      : e + ((this.alpha * 255) << 24);
  }
  get transform() {
    var t;
    return ((t = this.renderable) == null ? void 0 : t.groupTransform) || yl;
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
const je = {
    extension: { type: z.ShapeBuilder, name: "circle" },
    build(s, t) {
      let e, i, n, r, a, h;
      if (s.type === "circle") {
        const E = s;
        (e = E.x), (i = E.y), (a = h = E.radius), (n = r = 0);
      } else if (s.type === "ellipse") {
        const E = s;
        (e = E.x),
          (i = E.y),
          (a = E.halfWidth),
          (h = E.halfHeight),
          (n = r = 0);
      } else {
        const E = s,
          D = E.width / 2,
          _ = E.height / 2;
        (e = E.x + D),
          (i = E.y + _),
          (a = h = Math.max(0, Math.min(E.radius, Math.min(D, _)))),
          (n = D - a),
          (r = _ - h);
      }
      if (!(a >= 0 && h >= 0 && n >= 0 && r >= 0)) return t;
      const c = Math.ceil(2.3 * Math.sqrt(a + h)),
        u = c * 8 + (n ? 4 : 0) + (r ? 4 : 0);
      if (u === 0) return t;
      if (c === 0)
        return (
          (t[0] = t[6] = e + n),
          (t[1] = t[3] = i + r),
          (t[2] = t[4] = e - n),
          (t[5] = t[7] = i - r),
          t
        );
      let d = 0,
        o = c * 4 + (n ? 2 : 0) + 2,
        l = o,
        A = u,
        f = n + a,
        p = r,
        g = e + f,
        m = e - f,
        x = i + p;
      if (((t[d++] = g), (t[d++] = x), (t[--o] = x), (t[--o] = m), r)) {
        const E = i - p;
        (t[l++] = m), (t[l++] = E), (t[--A] = E), (t[--A] = g);
      }
      for (let E = 1; E < c; E++) {
        const D = (Math.PI / 2) * (E / c),
          _ = n + Math.cos(D) * a,
          P = r + Math.sin(D) * h,
          X = e + _,
          Q = e - _,
          U = i + P,
          O = i - P;
        (t[d++] = X),
          (t[d++] = U),
          (t[--o] = U),
          (t[--o] = Q),
          (t[l++] = Q),
          (t[l++] = O),
          (t[--A] = O),
          (t[--A] = X);
      }
      (f = n), (p = r + h), (g = e + f), (m = e - f), (x = i + p);
      const b = i - p;
      return (
        (t[d++] = g),
        (t[d++] = x),
        (t[--A] = b),
        (t[--A] = g),
        n && ((t[d++] = m), (t[d++] = x), (t[--A] = b), (t[--A] = m)),
        t
      );
    },
    triangulate(s, t, e, i, n, r) {
      if (s.length === 0) return;
      let a = 0,
        h = 0;
      for (let d = 0; d < s.length; d += 2) (a += s[d]), (h += s[d + 1]);
      (a /= s.length / 2), (h /= s.length / 2);
      let c = i;
      (t[c * e] = a), (t[c * e + 1] = h);
      const u = c++;
      for (let d = 0; d < s.length; d += 2)
        (t[c * e] = s[d]),
          (t[c * e + 1] = s[d + 1]),
          d > 0 && ((n[r++] = c), (n[r++] = u), (n[r++] = c - 1)),
          c++;
      (n[r++] = u + 1), (n[r++] = u), (n[r++] = c - 1);
    },
  },
  xl = { ...je, extension: { ...je.extension, name: "ellipse" } },
  wl = { ...je, extension: { ...je.extension, name: "roundedRectangle" } },
  ca = 1e-4,
  Tn = 1e-4;
function Cl(s) {
  const t = s.length;
  if (t < 6) return 1;
  let e = 0;
  for (let i = 0, n = s[t - 2], r = s[t - 1]; i < t; i += 2) {
    const a = s[i],
      h = s[i + 1];
    (e += (a - n) * (h + r)), (n = a), (r = h);
  }
  return e < 0 ? -1 : 1;
}
function Dn(s, t, e, i, n, r, a, h) {
  const c = s - e * n,
    u = t - i * n,
    d = s + e * r,
    o = t + i * r;
  let l, A;
  a ? ((l = i), (A = -e)) : ((l = -i), (A = e));
  const f = c + l,
    p = u + A,
    g = d + l,
    m = o + A;
  return h.push(f, p), h.push(g, m), 2;
}
function he(s, t, e, i, n, r, a, h) {
  const c = e - s,
    u = i - t;
  let d = Math.atan2(c, u),
    o = Math.atan2(n - s, r - t);
  h && d < o ? (d += Math.PI * 2) : !h && d > o && (o += Math.PI * 2);
  let l = d;
  const A = o - d,
    f = Math.abs(A),
    p = Math.sqrt(c * c + u * u),
    g = (((15 * f * Math.sqrt(p)) / Math.PI) >> 0) + 1,
    m = A / g;
  if (((l += m), h)) {
    a.push(s, t), a.push(e, i);
    for (let x = 1, b = l; x < g; x++, b += m)
      a.push(s, t), a.push(s + Math.sin(b) * p, t + Math.cos(b) * p);
    a.push(s, t), a.push(n, r);
  } else {
    a.push(e, i), a.push(s, t);
    for (let x = 1, b = l; x < g; x++, b += m)
      a.push(s + Math.sin(b) * p, t + Math.cos(b) * p), a.push(s, t);
    a.push(n, r), a.push(s, t);
  }
  return g * 2;
}
function bl(s, t, e, i, n, r) {
  const a = ca;
  if (s.length === 0) return;
  const h = t;
  let c = h.alignment;
  if (t.alignment !== 0.5) {
    let S = Cl(s);
    c = (c - 0.5) * S + 0.5;
  }
  const u = new _t(s[0], s[1]),
    d = new _t(s[s.length - 2], s[s.length - 1]),
    o = i,
    l = Math.abs(u.x - d.x) < a && Math.abs(u.y - d.y) < a;
  if (o) {
    (s = s.slice()),
      l && (s.pop(), s.pop(), d.set(s[s.length - 2], s[s.length - 1]));
    const S = (u.x + d.x) * 0.5,
      I = (d.y + u.y) * 0.5;
    s.unshift(S, I), s.push(S, I);
  }
  const A = n,
    f = s.length / 2;
  let p = s.length;
  const g = A.length / 2,
    m = h.width / 2,
    x = m * m,
    b = h.miterLimit * h.miterLimit;
  let E = s[0],
    D = s[1],
    _ = s[2],
    P = s[3],
    X = 0,
    Q = 0,
    U = -(D - P),
    O = E - _,
    rt = 0,
    $ = 0,
    lt = Math.sqrt(U * U + O * O);
  (U /= lt), (O /= lt), (U *= m), (O *= m);
  const Ht = c,
    y = (1 - Ht) * 2,
    C = Ht * 2;
  o ||
    (h.cap === "round"
      ? (p +=
          he(
            E - U * (y - C) * 0.5,
            D - O * (y - C) * 0.5,
            E - U * y,
            D - O * y,
            E + U * C,
            D + O * C,
            A,
            !0,
          ) + 2)
      : h.cap === "square" && (p += Dn(E, D, U, O, y, C, !0, A))),
    A.push(E - U * y, D - O * y),
    A.push(E + U * C, D + O * C);
  for (let S = 1; S < f - 1; ++S) {
    (E = s[(S - 1) * 2]),
      (D = s[(S - 1) * 2 + 1]),
      (_ = s[S * 2]),
      (P = s[S * 2 + 1]),
      (X = s[(S + 1) * 2]),
      (Q = s[(S + 1) * 2 + 1]),
      (U = -(D - P)),
      (O = E - _),
      (lt = Math.sqrt(U * U + O * O)),
      (U /= lt),
      (O /= lt),
      (U *= m),
      (O *= m),
      (rt = -(P - Q)),
      ($ = _ - X),
      (lt = Math.sqrt(rt * rt + $ * $)),
      (rt /= lt),
      ($ /= lt),
      (rt *= m),
      ($ *= m);
    const I = _ - E,
      M = D - P,
      T = _ - X,
      R = Q - P,
      L = I * T + M * R,
      N = M * T - R * I,
      at = N < 0;
    if (Math.abs(N) < 0.001 * Math.abs(L)) {
      A.push(_ - U * y, P - O * y),
        A.push(_ + U * C, P + O * C),
        L >= 0 &&
          (h.join === "round"
            ? (p +=
                he(_, P, _ - U * y, P - O * y, _ - rt * y, P - $ * y, A, !1) +
                4)
            : (p += 2),
          A.push(_ - rt * C, P - $ * C),
          A.push(_ + rt * y, P + $ * y));
      continue;
    }
    const ot = (-U + E) * (-O + P) - (-U + _) * (-O + D),
      tt = (-rt + X) * (-$ + P) - (-rt + _) * (-$ + Q),
      yt = (I * tt - T * ot) / N,
      nt = (R * ot - M * tt) / N,
      te = (yt - _) * (yt - _) + (nt - P) * (nt - P),
      Rt = _ + (yt - _) * y,
      Wt = P + (nt - P) * y,
      qt = _ - (yt - _) * C,
      W = P - (nt - P) * C,
      st = Math.min(I * I + M * M, T * T + R * R),
      zs = at ? y : C,
      ka = st + zs * zs * x;
    te <= ka
      ? h.join === "bevel" || te / x > b
        ? (at
            ? (A.push(Rt, Wt),
              A.push(_ + U * C, P + O * C),
              A.push(Rt, Wt),
              A.push(_ + rt * C, P + $ * C))
            : (A.push(_ - U * y, P - O * y),
              A.push(qt, W),
              A.push(_ - rt * y, P - $ * y),
              A.push(qt, W)),
          (p += 2))
        : h.join === "round"
          ? at
            ? (A.push(Rt, Wt),
              A.push(_ + U * C, P + O * C),
              (p +=
                he(_, P, _ + U * C, P + O * C, _ + rt * C, P + $ * C, A, !0) +
                4),
              A.push(Rt, Wt),
              A.push(_ + rt * C, P + $ * C))
            : (A.push(_ - U * y, P - O * y),
              A.push(qt, W),
              (p +=
                he(_, P, _ - U * y, P - O * y, _ - rt * y, P - $ * y, A, !1) +
                4),
              A.push(_ - rt * y, P - $ * y),
              A.push(qt, W))
          : (A.push(Rt, Wt), A.push(qt, W))
      : (A.push(_ - U * y, P - O * y),
        A.push(_ + U * C, P + O * C),
        h.join === "round"
          ? at
            ? (p +=
                he(_, P, _ + U * C, P + O * C, _ + rt * C, P + $ * C, A, !0) +
                2)
            : (p +=
                he(_, P, _ - U * y, P - O * y, _ - rt * y, P - $ * y, A, !1) +
                2)
          : h.join === "miter" &&
            te / x <= b &&
            (at
              ? (A.push(qt, W), A.push(qt, W))
              : (A.push(Rt, Wt), A.push(Rt, Wt)),
            (p += 2)),
        A.push(_ - rt * y, P - $ * y),
        A.push(_ + rt * C, P + $ * C),
        (p += 2));
  }
  (E = s[(f - 2) * 2]),
    (D = s[(f - 2) * 2 + 1]),
    (_ = s[(f - 1) * 2]),
    (P = s[(f - 1) * 2 + 1]),
    (U = -(D - P)),
    (O = E - _),
    (lt = Math.sqrt(U * U + O * O)),
    (U /= lt),
    (O /= lt),
    (U *= m),
    (O *= m),
    A.push(_ - U * y, P - O * y),
    A.push(_ + U * C, P + O * C),
    o ||
      (h.cap === "round"
        ? (p +=
            he(
              _ - U * (y - C) * 0.5,
              P - O * (y - C) * 0.5,
              _ - U * y,
              P - O * y,
              _ + U * C,
              P + O * C,
              A,
              !1,
            ) + 2)
        : h.cap === "square" && (p += Dn(_, P, U, O, y, C, !1, A)));
  const v = Tn * Tn;
  for (let S = g; S < p + g - 2; ++S)
    (E = A[S * 2]),
      (D = A[S * 2 + 1]),
      (_ = A[(S + 1) * 2]),
      (P = A[(S + 1) * 2 + 1]),
      (X = A[(S + 2) * 2]),
      (Q = A[(S + 2) * 2 + 1]),
      !(Math.abs(E * (P - Q) + _ * (Q - D) + X * (D - P)) < v) &&
        r.push(S, S + 1, S + 2);
}
function vl(s, t, e, i) {
  const n = ca;
  if (s.length === 0) return;
  const r = s[0],
    a = s[1],
    h = s[s.length - 2],
    c = s[s.length - 1],
    u = t || (Math.abs(r - h) < n && Math.abs(a - c) < n),
    d = e,
    o = s.length / 2,
    l = d.length / 2;
  for (let A = 0; A < o; A++) d.push(s[A * 2]), d.push(s[A * 2 + 1]);
  for (let A = 0; A < o - 1; A++) i.push(l + A, l + A + 1);
  u && i.push(l + o - 1, l);
}
function Aa(s, t, e, i, n, r, a) {
  const h = Ah(s, t, 2);
  if (!h) return;
  for (let u = 0; u < h.length; u += 3)
    (r[a++] = h[u] + n), (r[a++] = h[u + 1] + n), (r[a++] = h[u + 2] + n);
  let c = n * i;
  for (let u = 0; u < s.length; u += 2)
    (e[c] = s[u]), (e[c + 1] = s[u + 1]), (c += i);
}
const El = [],
  Sl = {
    extension: { type: z.ShapeBuilder, name: "polygon" },
    build(s, t) {
      for (let e = 0; e < s.points.length; e++) t[e] = s.points[e];
      return t;
    },
    triangulate(s, t, e, i, n, r) {
      Aa(s, El, t, e, i, n, r);
    },
  },
  Bl = {
    extension: { type: z.ShapeBuilder, name: "rectangle" },
    build(s, t) {
      const e = s,
        i = e.x,
        n = e.y,
        r = e.width,
        a = e.height;
      return (
        r >= 0 &&
          a >= 0 &&
          ((t[0] = i),
          (t[1] = n),
          (t[2] = i + r),
          (t[3] = n),
          (t[4] = i + r),
          (t[5] = n + a),
          (t[6] = i),
          (t[7] = n + a)),
        t
      );
    },
    triangulate(s, t, e, i, n, r) {
      let a = 0;
      (i *= e),
        (t[i + a] = s[0]),
        (t[i + a + 1] = s[1]),
        (a += e),
        (t[i + a] = s[2]),
        (t[i + a + 1] = s[3]),
        (a += e),
        (t[i + a] = s[6]),
        (t[i + a + 1] = s[7]),
        (a += e),
        (t[i + a] = s[4]),
        (t[i + a + 1] = s[5]),
        (a += e);
      const h = i / e;
      (n[r++] = h),
        (n[r++] = h + 1),
        (n[r++] = h + 2),
        (n[r++] = h + 1),
        (n[r++] = h + 3),
        (n[r++] = h + 2);
    },
  },
  Il = {
    extension: { type: z.ShapeBuilder, name: "triangle" },
    build(s, t) {
      return (
        (t[0] = s.x),
        (t[1] = s.y),
        (t[2] = s.x2),
        (t[3] = s.y2),
        (t[4] = s.x3),
        (t[5] = s.y3),
        t
      );
    },
    triangulate(s, t, e, i, n, r) {
      let a = 0;
      (i *= e),
        (t[i + a] = s[0]),
        (t[i + a + 1] = s[1]),
        (a += e),
        (t[i + a] = s[2]),
        (t[i + a + 1] = s[3]),
        (a += e),
        (t[i + a] = s[4]),
        (t[i + a + 1] = s[5]);
      const h = i / e;
      (n[r++] = h), (n[r++] = h + 1), (n[r++] = h + 2);
    },
  },
  _l = new K(),
  Pl = new Ct();
function Ml(s, t, e, i) {
  const n = t.matrix ? s.copyFrom(t.matrix).invert() : s.identity();
  if (t.textureSpace === "local") {
    const a = e.getBounds(Pl);
    t.width && a.pad(t.width);
    const { x: h, y: c } = a,
      u = 1 / a.width,
      d = 1 / a.height,
      o = -h * u,
      l = -c * d,
      A = n.a,
      f = n.b,
      p = n.c,
      g = n.d;
    (n.a *= u),
      (n.b *= u),
      (n.c *= d),
      (n.d *= d),
      (n.tx = o * A + l * p + n.tx),
      (n.ty = o * f + l * g + n.ty);
  } else
    n.translate(t.texture.frame.x, t.texture.frame.y),
      n.scale(1 / t.texture.source.width, 1 / t.texture.source.height);
  const r = t.texture.source.style;
  return (
    !(t.fill instanceof ne) &&
      r.addressMode === "clamp-to-edge" &&
      ((r.addressMode = "repeat"), r.update()),
    i && n.append(_l.copyFrom(i).invert()),
    n
  );
}
const wi = {};
Bt.handleByMap(z.ShapeBuilder, wi);
Bt.add(Bl, Sl, Il, je, xl, wl);
const Tl = new Ct(),
  Dl = new K();
function kl(s, t) {
  const { geometryData: e, batches: i } = t;
  (i.length = 0),
    (e.indices.length = 0),
    (e.vertices.length = 0),
    (e.uvs.length = 0);
  for (let n = 0; n < s.instructions.length; n++) {
    const r = s.instructions[n];
    if (r.action === "texture") Rl(r.data, i, e);
    else if (r.action === "fill" || r.action === "stroke") {
      const a = r.action === "stroke",
        h = r.data.path.shapePath,
        c = r.data.style,
        u = r.data.hole;
      a && u && kn(u.shapePath, c, !0, i, e),
        u &&
          (h.shapePrimitives[h.shapePrimitives.length - 1].holes =
            u.shapePath.shapePrimitives),
        kn(h, c, a, i, e);
    }
  }
}
function Rl(s, t, e) {
  const { vertices: i, uvs: n, indices: r } = e,
    a = r.length,
    h = i.length / 2,
    c = [],
    u = wi.rectangle,
    d = Tl,
    o = s.image;
  (d.x = s.dx), (d.y = s.dy), (d.width = s.dw), (d.height = s.dh);
  const l = s.transform;
  u.build(d, c), l && ha(c, l), u.triangulate(c, i, 2, h, r, a);
  const A = o.uvs;
  n.push(A.x0, A.y0, A.x1, A.y1, A.x3, A.y3, A.x2, A.y2);
  const f = ie.get(la);
  (f.indexOffset = a),
    (f.indexSize = r.length - a),
    (f.attributeOffset = h),
    (f.attributeSize = i.length / 2 - h),
    (f.baseColor = s.style),
    (f.alpha = s.alpha),
    (f.texture = o),
    (f.geometryData = e),
    t.push(f);
}
function kn(s, t, e, i, n) {
  const { vertices: r, uvs: a, indices: h } = n;
  s.shapePrimitives.forEach(({ shape: c, transform: u, holes: d }) => {
    const o = h.length,
      l = r.length / 2,
      A = [],
      f = wi[c.type];
    let p = "triangle-list";
    if ((f.build(c, A), u && ha(A, u), e)) {
      const b = c.closePath ?? !0,
        E = t;
      E.pixelLine ? (vl(A, b, r, h), (p = "line-list")) : bl(A, E, !1, b, r, h);
    } else if (d) {
      const b = [],
        E = A.slice();
      Ql(d).forEach((_) => {
        b.push(E.length / 2), E.push(..._);
      }),
        Aa(E, b, r, 2, l, h, o);
    } else f.triangulate(A, r, 2, l, h, o);
    const g = a.length / 2,
      m = t.texture;
    if (m !== q.WHITE) {
      const b = Ml(Dl, t, c, u);
      pl(r, 2, l, a, g, 2, r.length / 2 - l, b);
    } else ml(a, g, 2, r.length / 2 - l);
    const x = ie.get(la);
    (x.indexOffset = o),
      (x.indexSize = h.length - o),
      (x.attributeOffset = l),
      (x.attributeSize = r.length / 2 - l),
      (x.baseColor = t.color),
      (x.alpha = t.alpha),
      (x.texture = m),
      (x.geometryData = n),
      (x.topology = p),
      i.push(x);
  });
}
function Ql(s) {
  const t = [];
  for (let e = 0; e < s.length; e++) {
    const i = s[e].shape,
      n = [];
    wi[i.type].build(i, n), t.push(n);
  }
  return t;
}
class Ol {
  constructor() {
    (this.batches = []),
      (this.geometryData = { vertices: [], uvs: [], indices: [] });
  }
}
class Ul {
  constructor() {
    (this.batcher = new gl()), (this.instructions = new br());
  }
  init() {
    this.instructions.reset();
  }
  get geometry() {
    return (
      J(
        Wa,
        "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead.",
      ),
      this.batcher.geometry
    );
  }
}
const Ds = class cs {
  constructor(t) {
    (this._gpuContextHash = {}),
      (this._graphicsDataContextHash = Object.create(null)),
      t.renderableGC.addManagedHash(this, "_gpuContextHash"),
      t.renderableGC.addManagedHash(this, "_graphicsDataContextHash");
  }
  init(t) {
    cs.defaultOptions.bezierSmoothness =
      (t == null ? void 0 : t.bezierSmoothness) ??
      cs.defaultOptions.bezierSmoothness;
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
        kl(t, e);
      const i = t.batchMode;
      t.customShader || i === "no-batch"
        ? (e.isBatchable = !1)
        : i === "auto" &&
          (e.isBatchable = e.geometryData.vertices.length < 400),
        (t.dirty = !1);
    }
    return e;
  }
  getGpuContext(t) {
    return this._gpuContextHash[t.uid] || this._initContext(t);
  }
  _initContextRenderData(t) {
    const e = ie.get(Ul),
      { batches: i, geometryData: n } = this._gpuContextHash[t.uid],
      r = n.vertices.length,
      a = n.indices.length;
    for (let d = 0; d < i.length; d++) i[d].applyTransform = !1;
    const h = e.batcher;
    h.ensureAttributeBuffer(r), h.ensureIndexBuffer(a), h.begin();
    for (let d = 0; d < i.length; d++) {
      const o = i[d];
      h.add(o);
    }
    h.finish(e.instructions);
    const c = h.geometry;
    c.indexBuffer.setDataWithSize(h.indexBuffer, h.indexSize, !0),
      c.buffers[0].setDataWithSize(
        h.attributeBuffer.float32View,
        h.attributeSize,
        !0,
      );
    const u = h.batches;
    for (let d = 0; d < u.length; d++) {
      const o = u[d];
      o.bindGroup = Ph(o.textures.textures, o.textures.count);
    }
    return (this._graphicsDataContextHash[t.uid] = e), e;
  }
  _initContext(t) {
    const e = new Ol();
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
        (ie.return(this.getContextRenderData(t)),
        (this._graphicsDataContextHash[t.uid] = null))),
      e.batches &&
        e.batches.forEach((i) => {
          ie.return(i);
        });
  }
  destroy() {
    for (const t in this._gpuContextHash)
      this._gpuContextHash[t] &&
        this.onGraphicsContextDestroy(this._gpuContextHash[t].context);
  }
};
Ds.extension = {
  type: [z.WebGLSystem, z.WebGPUSystem, z.CanvasSystem],
  name: "graphicsContext",
};
Ds.defaultOptions = { bezierSmoothness: 0.5 };
let ua = Ds;
const Fl = 8,
  si = 11920929e-14,
  Gl = 1;
function da(s, t, e, i, n, r, a, h, c, u) {
  const o = Math.min(
    0.99,
    Math.max(0, u ?? ua.defaultOptions.bezierSmoothness),
  );
  let l = (Gl - o) / 1;
  return (l *= l), zl(t, e, i, n, r, a, h, c, s, l), s;
}
function zl(s, t, e, i, n, r, a, h, c, u) {
  As(s, t, e, i, n, r, a, h, c, u, 0), c.push(a, h);
}
function As(s, t, e, i, n, r, a, h, c, u, d) {
  if (d > Fl) return;
  const o = (s + e) / 2,
    l = (t + i) / 2,
    A = (e + n) / 2,
    f = (i + r) / 2,
    p = (n + a) / 2,
    g = (r + h) / 2,
    m = (o + A) / 2,
    x = (l + f) / 2,
    b = (A + p) / 2,
    E = (f + g) / 2,
    D = (m + b) / 2,
    _ = (x + E) / 2;
  if (d > 0) {
    let P = a - s,
      X = h - t;
    const Q = Math.abs((e - a) * X - (i - h) * P),
      U = Math.abs((n - a) * X - (r - h) * P);
    if (Q > si && U > si) {
      if ((Q + U) * (Q + U) <= u * (P * P + X * X)) {
        c.push(D, _);
        return;
      }
    } else if (Q > si) {
      if (Q * Q <= u * (P * P + X * X)) {
        c.push(D, _);
        return;
      }
    } else if (U > si) {
      if (U * U <= u * (P * P + X * X)) {
        c.push(D, _);
        return;
      }
    } else if (
      ((P = D - (s + a) / 2), (X = _ - (t + h) / 2), P * P + X * X <= u)
    ) {
      c.push(D, _);
      return;
    }
  }
  As(s, t, o, l, m, x, D, _, c, u, d + 1),
    As(D, _, b, E, p, g, a, h, c, u, d + 1);
}
const Nl = 8,
  Hl = 11920929e-14,
  Ll = 1;
function Xl(s, t, e, i, n, r, a, h) {
  const u = Math.min(
    0.99,
    Math.max(0, h ?? ua.defaultOptions.bezierSmoothness),
  );
  let d = (Ll - u) / 1;
  return (d *= d), Vl(t, e, i, n, r, a, s, d), s;
}
function Vl(s, t, e, i, n, r, a, h) {
  us(a, s, t, e, i, n, r, h, 0), a.push(n, r);
}
function us(s, t, e, i, n, r, a, h, c) {
  if (c > Nl) return;
  const u = (t + i) / 2,
    d = (e + n) / 2,
    o = (i + r) / 2,
    l = (n + a) / 2,
    A = (u + o) / 2,
    f = (d + l) / 2;
  let p = r - t,
    g = a - e;
  const m = Math.abs((i - r) * g - (n - a) * p);
  if (m > Hl) {
    if (m * m <= h * (p * p + g * g)) {
      s.push(A, f);
      return;
    }
  } else if (
    ((p = A - (t + r) / 2), (g = f - (e + a) / 2), p * p + g * g <= h)
  ) {
    s.push(A, f);
    return;
  }
  us(s, t, e, u, d, A, f, h, c + 1), us(s, A, f, o, l, r, a, h, c + 1);
}
function fa(s, t, e, i, n, r, a, h) {
  let c = Math.abs(n - r);
  ((!a && n > r) || (a && r > n)) && (c = 2 * Math.PI - c),
    h || (h = Math.max(6, Math.floor(6 * Math.pow(i, 1 / 3) * (c / Math.PI)))),
    (h = Math.max(h, 3));
  let u = c / h,
    d = n;
  u *= a ? -1 : 1;
  for (let o = 0; o < h + 1; o++) {
    const l = Math.cos(d),
      A = Math.sin(d),
      f = t + l * i,
      p = e + A * i;
    s.push(f, p), (d += u);
  }
}
function jl(s, t, e, i, n, r) {
  const a = s[s.length - 2],
    c = s[s.length - 1] - e,
    u = a - t,
    d = n - e,
    o = i - t,
    l = Math.abs(c * o - u * d);
  if (l < 1e-8 || r === 0) {
    (s[s.length - 2] !== t || s[s.length - 1] !== e) && s.push(t, e);
    return;
  }
  const A = c * c + u * u,
    f = d * d + o * o,
    p = c * d + u * o,
    g = (r * Math.sqrt(A)) / l,
    m = (r * Math.sqrt(f)) / l,
    x = (g * p) / A,
    b = (m * p) / f,
    E = g * o + m * u,
    D = g * d + m * c,
    _ = u * (m + x),
    P = c * (m + x),
    X = o * (g + b),
    Q = d * (g + b),
    U = Math.atan2(P - D, _ - E),
    O = Math.atan2(Q - D, X - E);
  fa(s, E + t, D + e, r, U, O, u * d > o * c);
}
const Le = Math.PI * 2,
  Xi = { centerX: 0, centerY: 0, ang1: 0, ang2: 0 },
  Vi = ({ x: s, y: t }, e, i, n, r, a, h, c) => {
    (s *= e), (t *= i);
    const u = n * s - r * t,
      d = r * s + n * t;
    return (c.x = u + a), (c.y = d + h), c;
  };
function Yl(s, t) {
  const e =
      t === -1.5707963267948966
        ? -0.551915024494
        : 1.3333333333333333 * Math.tan(t / 4),
    i = t === 1.5707963267948966 ? 0.551915024494 : e,
    n = Math.cos(s),
    r = Math.sin(s),
    a = Math.cos(s + t),
    h = Math.sin(s + t);
  return [
    { x: n - r * i, y: r + n * i },
    { x: a + h * i, y: h - a * i },
    { x: a, y: h },
  ];
}
const Rn = (s, t, e, i) => {
    const n = s * i - t * e < 0 ? -1 : 1;
    let r = s * e + t * i;
    return r > 1 && (r = 1), r < -1 && (r = -1), n * Math.acos(r);
  },
  Wl = (s, t, e, i, n, r, a, h, c, u, d, o, l) => {
    const A = Math.pow(n, 2),
      f = Math.pow(r, 2),
      p = Math.pow(d, 2),
      g = Math.pow(o, 2);
    let m = A * f - A * g - f * p;
    m < 0 && (m = 0),
      (m /= A * g + f * p),
      (m = Math.sqrt(m) * (a === h ? -1 : 1));
    const x = ((m * n) / r) * o,
      b = ((m * -r) / n) * d,
      E = u * x - c * b + (s + e) / 2,
      D = c * x + u * b + (t + i) / 2,
      _ = (d - x) / n,
      P = (o - b) / r,
      X = (-d - x) / n,
      Q = (-o - b) / r,
      U = Rn(1, 0, _, P);
    let O = Rn(_, P, X, Q);
    h === 0 && O > 0 && (O -= Le),
      h === 1 && O < 0 && (O += Le),
      (l.centerX = E),
      (l.centerY = D),
      (l.ang1 = U),
      (l.ang2 = O);
  };
function ql(s, t, e, i, n, r, a, h = 0, c = 0, u = 0) {
  if (r === 0 || a === 0) return;
  const d = Math.sin((h * Le) / 360),
    o = Math.cos((h * Le) / 360),
    l = (o * (t - i)) / 2 + (d * (e - n)) / 2,
    A = (-d * (t - i)) / 2 + (o * (e - n)) / 2;
  if (l === 0 && A === 0) return;
  (r = Math.abs(r)), (a = Math.abs(a));
  const f = Math.pow(l, 2) / Math.pow(r, 2) + Math.pow(A, 2) / Math.pow(a, 2);
  f > 1 && ((r *= Math.sqrt(f)), (a *= Math.sqrt(f))),
    Wl(t, e, i, n, r, a, c, u, d, o, l, A, Xi);
  let { ang1: p, ang2: g } = Xi;
  const { centerX: m, centerY: x } = Xi;
  let b = Math.abs(g) / (Le / 4);
  Math.abs(1 - b) < 1e-7 && (b = 1);
  const E = Math.max(Math.ceil(b), 1);
  g /= E;
  let D = s[s.length - 2],
    _ = s[s.length - 1];
  const P = { x: 0, y: 0 };
  for (let X = 0; X < E; X++) {
    const Q = Yl(p, g),
      { x: U, y: O } = Vi(Q[0], r, a, o, d, m, x, P),
      { x: rt, y: $ } = Vi(Q[1], r, a, o, d, m, x, P),
      { x: lt, y: Ht } = Vi(Q[2], r, a, o, d, m, x, P);
    da(s, D, _, U, O, rt, $, lt, Ht), (D = lt), (_ = Ht), (p += g);
  }
}
function Kl(s, t, e) {
  const i = (a, h) => {
      const c = h.x - a.x,
        u = h.y - a.y,
        d = Math.sqrt(c * c + u * u),
        o = c / d,
        l = u / d;
      return { len: d, nx: o, ny: l };
    },
    n = (a, h) => {
      a === 0 ? s.moveTo(h.x, h.y) : s.lineTo(h.x, h.y);
    };
  let r = t[t.length - 1];
  for (let a = 0; a < t.length; a++) {
    const h = t[a % t.length],
      c = h.radius ?? e;
    if (c <= 0) {
      n(a, h), (r = h);
      continue;
    }
    const u = t[(a + 1) % t.length],
      d = i(h, r),
      o = i(h, u);
    if (d.len < 1e-4 || o.len < 1e-4) {
      n(a, h), (r = h);
      continue;
    }
    let l = Math.asin(d.nx * o.ny - d.ny * o.nx),
      A = 1,
      f = !1;
    d.nx * o.nx - d.ny * -o.ny < 0
      ? l < 0
        ? (l = Math.PI + l)
        : ((l = Math.PI - l), (A = -1), (f = !0))
      : l > 0 && ((A = -1), (f = !0));
    const p = l / 2;
    let g,
      m = Math.abs((Math.cos(p) * c) / Math.sin(p));
    m > Math.min(d.len / 2, o.len / 2)
      ? ((m = Math.min(d.len / 2, o.len / 2)),
        (g = Math.abs((m * Math.sin(p)) / Math.cos(p))))
      : (g = c);
    const x = h.x + o.nx * m + -o.ny * g * A,
      b = h.y + o.ny * m + o.nx * g * A,
      E = Math.atan2(d.ny, d.nx) + (Math.PI / 2) * A,
      D = Math.atan2(o.ny, o.nx) - (Math.PI / 2) * A;
    a === 0 && s.moveTo(x + Math.cos(E) * g, b + Math.sin(E) * g),
      s.arc(x, b, g, E, D, f),
      (r = h);
  }
}
function Jl(s, t, e, i) {
  const n = (h, c) => Math.sqrt((h.x - c.x) ** 2 + (h.y - c.y) ** 2),
    r = (h, c, u) => ({ x: h.x + (c.x - h.x) * u, y: h.y + (c.y - h.y) * u }),
    a = t.length;
  for (let h = 0; h < a; h++) {
    const c = t[(h + 1) % a],
      u = c.radius ?? e;
    if (u <= 0) {
      h === 0 ? s.moveTo(c.x, c.y) : s.lineTo(c.x, c.y);
      continue;
    }
    const d = t[h],
      o = t[(h + 2) % a],
      l = n(d, c);
    let A;
    if (l < 1e-4) A = c;
    else {
      const g = Math.min(l / 2, u);
      A = r(c, d, g / l);
    }
    const f = n(o, c);
    let p;
    if (f < 1e-4) p = c;
    else {
      const g = Math.min(f / 2, u);
      p = r(c, o, g / f);
    }
    h === 0 ? s.moveTo(A.x, A.y) : s.lineTo(A.x, A.y),
      s.quadraticCurveTo(c.x, c.y, p.x, p.y, i);
  }
}
const Zl = new Ct();
class $l {
  constructor(t) {
    (this.shapePrimitives = []),
      (this._currentPoly = null),
      (this._bounds = new Vt()),
      (this._graphicsPath2D = t),
      (this.signed = t.checkForHoles);
  }
  moveTo(t, e) {
    return this.startPoly(t, e), this;
  }
  lineTo(t, e) {
    this._ensurePoly();
    const i = this._currentPoly.points,
      n = i[i.length - 2],
      r = i[i.length - 1];
    return (n !== t || r !== e) && i.push(t, e), this;
  }
  arc(t, e, i, n, r, a) {
    this._ensurePoly(!1);
    const h = this._currentPoly.points;
    return fa(h, t, e, i, n, r, a), this;
  }
  arcTo(t, e, i, n, r) {
    this._ensurePoly();
    const a = this._currentPoly.points;
    return jl(a, t, e, i, n, r), this;
  }
  arcToSvg(t, e, i, n, r, a, h) {
    const c = this._currentPoly.points;
    return (
      ql(
        c,
        this._currentPoly.lastX,
        this._currentPoly.lastY,
        a,
        h,
        t,
        e,
        i,
        n,
        r,
      ),
      this
    );
  }
  bezierCurveTo(t, e, i, n, r, a, h) {
    this._ensurePoly();
    const c = this._currentPoly;
    return (
      da(this._currentPoly.points, c.lastX, c.lastY, t, e, i, n, r, a, h), this
    );
  }
  quadraticCurveTo(t, e, i, n, r) {
    this._ensurePoly();
    const a = this._currentPoly;
    return Xl(this._currentPoly.points, a.lastX, a.lastY, t, e, i, n, r), this;
  }
  closePath() {
    return this.endPoly(!0), this;
  }
  addPath(t, e) {
    this.endPoly(), e && !e.isIdentity() && ((t = t.clone(!0)), t.transform(e));
    const i = this.shapePrimitives,
      n = i.length;
    for (let r = 0; r < t.instructions.length; r++) {
      const a = t.instructions[r];
      this[a.action](...a.data);
    }
    if (t.checkForHoles && i.length - n > 1) {
      let r = null;
      for (let a = n; a < i.length; a++) {
        const h = i[a];
        if (h.shape.type === "polygon") {
          const c = h.shape,
            u = r == null ? void 0 : r.shape;
          u && u.containsPolygon(c)
            ? (r.holes || (r.holes = []),
              r.holes.push(h),
              i.copyWithin(a, a + 1),
              i.length--,
              a--)
            : (r = h);
        }
      }
    }
    return this;
  }
  finish(t = !1) {
    this.endPoly(t);
  }
  rect(t, e, i, n, r) {
    return this.drawShape(new Ct(t, e, i, n), r), this;
  }
  circle(t, e, i, n) {
    return this.drawShape(new Ps(t, e, i), n), this;
  }
  poly(t, e, i) {
    const n = new He(t);
    return (n.closePath = e), this.drawShape(n, i), this;
  }
  regularPoly(t, e, i, n, r = 0, a) {
    n = Math.max(n | 0, 3);
    const h = (-1 * Math.PI) / 2 + r,
      c = (Math.PI * 2) / n,
      u = [];
    for (let d = 0; d < n; d++) {
      const o = h - d * c;
      u.push(t + i * Math.cos(o), e + i * Math.sin(o));
    }
    return this.poly(u, !0, a), this;
  }
  roundPoly(t, e, i, n, r, a = 0, h) {
    if (((n = Math.max(n | 0, 3)), r <= 0))
      return this.regularPoly(t, e, i, n, a);
    const c = i * Math.sin(Math.PI / n) - 0.001;
    r = Math.min(r, c);
    const u = (-1 * Math.PI) / 2 + a,
      d = (Math.PI * 2) / n,
      o = ((n - 2) * Math.PI) / n / 2;
    for (let l = 0; l < n; l++) {
      const A = l * d + u,
        f = t + i * Math.cos(A),
        p = e + i * Math.sin(A),
        g = A + Math.PI + o,
        m = A - Math.PI - o,
        x = f + r * Math.cos(g),
        b = p + r * Math.sin(g),
        E = f + r * Math.cos(m),
        D = p + r * Math.sin(m);
      l === 0 ? this.moveTo(x, b) : this.lineTo(x, b),
        this.quadraticCurveTo(f, p, E, D, h);
    }
    return this.closePath();
  }
  roundShape(t, e, i = !1, n) {
    return t.length < 3
      ? this
      : (i ? Jl(this, t, e, n) : Kl(this, t, e), this.closePath());
  }
  filletRect(t, e, i, n, r) {
    if (r === 0) return this.rect(t, e, i, n);
    const a = Math.min(i, n) / 2,
      h = Math.min(a, Math.max(-a, r)),
      c = t + i,
      u = e + n,
      d = h < 0 ? -h : 0,
      o = Math.abs(h);
    return this.moveTo(t, e + o)
      .arcTo(t + d, e + d, t + o, e, o)
      .lineTo(c - o, e)
      .arcTo(c - d, e + d, c, e + o, o)
      .lineTo(c, u - o)
      .arcTo(c - d, u - d, t + i - o, u, o)
      .lineTo(t + o, u)
      .arcTo(t + d, u - d, t, u - o, o)
      .closePath();
  }
  chamferRect(t, e, i, n, r, a) {
    if (r <= 0) return this.rect(t, e, i, n);
    const h = Math.min(r, Math.min(i, n) / 2),
      c = t + i,
      u = e + n,
      d = [
        t + h,
        e,
        c - h,
        e,
        c,
        e + h,
        c,
        u - h,
        c - h,
        u,
        t + h,
        u,
        t,
        u - h,
        t,
        e + h,
      ];
    for (let o = d.length - 1; o >= 2; o -= 2)
      d[o] === d[o - 2] && d[o - 1] === d[o - 3] && d.splice(o - 1, 2);
    return this.poly(d, !0, a);
  }
  ellipse(t, e, i, n, r) {
    return this.drawShape(new Ms(t, e, i, n), r), this;
  }
  roundRect(t, e, i, n, r, a) {
    return this.drawShape(new Ts(t, e, i, n, r), a), this;
  }
  drawShape(t, e) {
    return (
      this.endPoly(),
      this.shapePrimitives.push({ shape: t, transform: e }),
      this
    );
  }
  startPoly(t, e) {
    let i = this._currentPoly;
    return (
      i && this.endPoly(),
      (i = new He()),
      i.points.push(t, e),
      (this._currentPoly = i),
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
    if (!this._currentPoly && ((this._currentPoly = new He()), t)) {
      const e = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (e) {
        let i = e.shape.x,
          n = e.shape.y;
        if (e.transform && !e.transform.isIdentity()) {
          const r = e.transform,
            a = i;
          (i = r.a * i + r.c * n + r.tx), (n = r.b * a + r.d * n + r.ty);
        }
        this._currentPoly.points.push(i, n);
      } else this._currentPoly.points.push(0, 0);
    }
  }
  buildPath() {
    const t = this._graphicsPath2D;
    (this.shapePrimitives.length = 0), (this._currentPoly = null);
    for (let e = 0; e < t.instructions.length; e++) {
      const i = t.instructions[e];
      this[i.action](...i.data);
    }
    this.finish();
  }
  get bounds() {
    const t = this._bounds;
    t.clear();
    const e = this.shapePrimitives;
    for (let i = 0; i < e.length; i++) {
      const n = e[i],
        r = n.shape.getBounds(Zl);
      n.transform ? t.addRect(r, n.transform) : t.addRect(r);
    }
    return t;
  }
}
class Se {
  constructor(t, e = !1) {
    (this.instructions = []),
      (this.uid = bt("graphicsPath")),
      (this._dirty = !0),
      (this.checkForHoles = e),
      typeof t == "string"
        ? bh(t, this)
        : (this.instructions = (t == null ? void 0 : t.slice()) ?? []);
  }
  get shapePath() {
    return (
      this._shapePath || (this._shapePath = new $l(this)),
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
  bezierCurveToShort(t, e, i, n, r) {
    const a = this.instructions[this.instructions.length - 1],
      h = this.getLastPoint(_t.shared);
    let c = 0,
      u = 0;
    if (!a || a.action !== "bezierCurveTo") (c = h.x), (u = h.y);
    else {
      (c = a.data[2]), (u = a.data[3]);
      const d = h.x,
        o = h.y;
      (c = d + (d - c)), (u = o + (o - u));
    }
    return (
      this.instructions.push({
        action: "bezierCurveTo",
        data: [c, u, t, e, i, n, r],
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
  quadraticCurveToShort(t, e, i) {
    const n = this.instructions[this.instructions.length - 1],
      r = this.getLastPoint(_t.shared);
    let a = 0,
      h = 0;
    if (!n || n.action !== "quadraticCurveTo") (a = r.x), (h = r.y);
    else {
      (a = n.data[0]), (h = n.data[1]);
      const c = r.x,
        u = r.y;
      (a = c + (c - a)), (h = u + (u - h));
    }
    return (
      this.instructions.push({
        action: "quadraticCurveTo",
        data: [a, h, t, e, i],
      }),
      (this._dirty = !0),
      this
    );
  }
  rect(t, e, i, n, r) {
    return (
      this.instructions.push({ action: "rect", data: [t, e, i, n, r] }),
      (this._dirty = !0),
      this
    );
  }
  circle(t, e, i, n) {
    return (
      this.instructions.push({ action: "circle", data: [t, e, i, n] }),
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
  star(t, e, i, n, r, a, h) {
    r || (r = n / 2);
    const c = (-1 * Math.PI) / 2 + a,
      u = i * 2,
      d = (Math.PI * 2) / u,
      o = [];
    for (let l = 0; l < u; l++) {
      const A = l % 2 ? r : n,
        f = l * d + c;
      o.push(t + A * Math.cos(f), e + A * Math.sin(f));
    }
    return this.poly(o, !0, h), this;
  }
  clone(t = !1) {
    const e = new Se();
    if (((e.checkForHoles = this.checkForHoles), !t))
      e.instructions = this.instructions.slice();
    else
      for (let i = 0; i < this.instructions.length; i++) {
        const n = this.instructions[i];
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
      i = t.b,
      n = t.c,
      r = t.d,
      a = t.tx,
      h = t.ty;
    let c = 0,
      u = 0,
      d = 0,
      o = 0,
      l = 0,
      A = 0,
      f = 0,
      p = 0;
    for (let g = 0; g < this.instructions.length; g++) {
      const m = this.instructions[g],
        x = m.data;
      switch (m.action) {
        case "moveTo":
        case "lineTo":
          (c = x[0]),
            (u = x[1]),
            (x[0] = e * c + n * u + a),
            (x[1] = i * c + r * u + h);
          break;
        case "bezierCurveTo":
          (d = x[0]),
            (o = x[1]),
            (l = x[2]),
            (A = x[3]),
            (c = x[4]),
            (u = x[5]),
            (x[0] = e * d + n * o + a),
            (x[1] = i * d + r * o + h),
            (x[2] = e * l + n * A + a),
            (x[3] = i * l + r * A + h),
            (x[4] = e * c + n * u + a),
            (x[5] = i * c + r * u + h);
          break;
        case "quadraticCurveTo":
          (d = x[0]),
            (o = x[1]),
            (c = x[2]),
            (u = x[3]),
            (x[0] = e * d + n * o + a),
            (x[1] = i * d + r * o + h),
            (x[2] = e * c + n * u + a),
            (x[3] = i * c + r * u + h);
          break;
        case "arcToSvg":
          (c = x[5]),
            (u = x[6]),
            (f = x[0]),
            (p = x[1]),
            (x[0] = e * f + n * p),
            (x[1] = i * f + r * p),
            (x[5] = e * c + n * u + a),
            (x[6] = i * c + r * u + h);
          break;
        case "circle":
          x[4] = Qe(x[3], t);
          break;
        case "rect":
          x[4] = Qe(x[4], t);
          break;
        case "ellipse":
          x[8] = Qe(x[8], t);
          break;
        case "roundRect":
          x[5] = Qe(x[5], t);
          break;
        case "addPath":
          x[0].transform(t);
          break;
        case "poly":
          x[2] = Qe(x[2], t);
          break;
        default:
          At("unknown transform action", m.action);
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
      i = this.instructions[e];
    if (!i) return (t.x = 0), (t.y = 0), t;
    for (; i.action === "closePath"; ) {
      if ((e--, e < 0)) return (t.x = 0), (t.y = 0), t;
      i = this.instructions[e];
    }
    switch (i.action) {
      case "moveTo":
      case "lineTo":
        (t.x = i.data[0]), (t.y = i.data[1]);
        break;
      case "quadraticCurveTo":
        (t.x = i.data[2]), (t.y = i.data[3]);
        break;
      case "bezierCurveTo":
        (t.x = i.data[4]), (t.y = i.data[5]);
        break;
      case "arc":
      case "arcToSvg":
        (t.x = i.data[5]), (t.y = i.data[6]);
        break;
      case "addPath":
        i.data[0].getLastPoint(t);
        break;
    }
    return t;
  }
}
function Qe(s, t) {
  return s ? s.prepend(t) : t.clone();
}
function ft(s, t, e) {
  const i = s.getAttribute(t);
  return i ? Number(i) : e;
}
function tc(s, t) {
  const e = s.querySelectorAll("defs");
  for (let i = 0; i < e.length; i++) {
    const n = e[i];
    for (let r = 0; r < n.children.length; r++) {
      const a = n.children[r];
      switch (a.nodeName.toLowerCase()) {
        case "lineargradient":
          t.defs[a.id] = ec(a);
          break;
        case "radialgradient":
          t.defs[a.id] = ic();
          break;
      }
    }
  }
}
function ec(s) {
  const t = ft(s, "x1", 0),
    e = ft(s, "y1", 0),
    i = ft(s, "x2", 1),
    n = ft(s, "y2", 0),
    r = s.getAttribute("gradientUnits") || "objectBoundingBox",
    a = new ne(t, e, i, n, r === "objectBoundingBox" ? "local" : "global");
  for (let h = 0; h < s.children.length; h++) {
    const c = s.children[h],
      u = ft(c, "offset", 0),
      d = vt.shared.setValue(c.getAttribute("stop-color")).toNumber();
    a.addColorStop(u, d);
  }
  return a;
}
function ic(s) {
  return (
    At("[SVG Parser] Radial gradients are not yet supported"),
    new ne(0, 0, 1, 0)
  );
}
function Qn(s) {
  const t = s.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);
  return t ? t[1] : "";
}
const On = {
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
function ga(s, t) {
  const e = s.getAttribute("style"),
    i = {},
    n = {},
    r = { strokeStyle: i, fillStyle: n, useFill: !1, useStroke: !1 };
  for (const a in On) {
    const h = s.getAttribute(a);
    h && Un(t, r, a, h.trim());
  }
  if (e) {
    const a = e.split(";");
    for (let h = 0; h < a.length; h++) {
      const c = a[h].trim(),
        [u, d] = c.split(":");
      On[u] && Un(t, r, u, d.trim());
    }
  }
  return {
    strokeStyle: r.useStroke ? i : null,
    fillStyle: r.useFill ? n : null,
    useFill: r.useFill,
    useStroke: r.useStroke,
  };
}
function Un(s, t, e, i) {
  switch (e) {
    case "stroke":
      if (i !== "none") {
        if (i.startsWith("url(")) {
          const n = Qn(i);
          t.strokeStyle.fill = s.defs[n];
        } else t.strokeStyle.color = vt.shared.setValue(i).toNumber();
        t.useStroke = !0;
      }
      break;
    case "stroke-width":
      t.strokeStyle.width = Number(i);
      break;
    case "fill":
      if (i !== "none") {
        if (i.startsWith("url(")) {
          const n = Qn(i);
          t.fillStyle.fill = s.defs[n];
        } else t.fillStyle.color = vt.shared.setValue(i).toNumber();
        t.useFill = !0;
      }
      break;
    case "fill-opacity":
      t.fillStyle.alpha = Number(i);
      break;
    case "stroke-opacity":
      t.strokeStyle.alpha = Number(i);
      break;
    case "opacity":
      (t.fillStyle.alpha = Number(i)), (t.strokeStyle.alpha = Number(i));
      break;
  }
}
function sc(s, t) {
  if (typeof s == "string") {
    const a = document.createElement("div");
    (a.innerHTML = s.trim()), (s = a.querySelector("svg"));
  }
  const e = { context: t, defs: {}, path: new Se() };
  tc(s, e);
  const i = s.children,
    { fillStyle: n, strokeStyle: r } = ga(s, e);
  for (let a = 0; a < i.length; a++) {
    const h = i[a];
    h.nodeName.toLowerCase() !== "defs" && pa(h, e, n, r);
  }
  return t;
}
function pa(s, t, e, i) {
  const n = s.children,
    { fillStyle: r, strokeStyle: a } = ga(s, t);
  r && e ? (e = { ...e, ...r }) : r && (e = r),
    a && i ? (i = { ...i, ...a }) : a && (i = a);
  const h = !e && !i;
  h && (e = { color: 0 });
  let c, u, d, o, l, A, f, p, g, m, x, b, E, D, _, P, X;
  switch (s.nodeName.toLowerCase()) {
    case "path":
      (D = s.getAttribute("d")),
        s.getAttribute("fill-rule") === "evenodd" &&
          At(
            "SVG Evenodd fill rule not supported, your svg may render incorrectly",
          ),
        (_ = new Se(D, !0)),
        t.context.path(_),
        e && t.context.fill(e),
        i && t.context.stroke(i);
      break;
    case "circle":
      (f = ft(s, "cx", 0)),
        (p = ft(s, "cy", 0)),
        (g = ft(s, "r", 0)),
        t.context.ellipse(f, p, g, g),
        e && t.context.fill(e),
        i && t.context.stroke(i);
      break;
    case "rect":
      (c = ft(s, "x", 0)),
        (u = ft(s, "y", 0)),
        (P = ft(s, "width", 0)),
        (X = ft(s, "height", 0)),
        (m = ft(s, "rx", 0)),
        (x = ft(s, "ry", 0)),
        m || x
          ? t.context.roundRect(c, u, P, X, m || x)
          : t.context.rect(c, u, P, X),
        e && t.context.fill(e),
        i && t.context.stroke(i);
      break;
    case "ellipse":
      (f = ft(s, "cx", 0)),
        (p = ft(s, "cy", 0)),
        (m = ft(s, "rx", 0)),
        (x = ft(s, "ry", 0)),
        t.context.beginPath(),
        t.context.ellipse(f, p, m, x),
        e && t.context.fill(e),
        i && t.context.stroke(i);
      break;
    case "line":
      (d = ft(s, "x1", 0)),
        (o = ft(s, "y1", 0)),
        (l = ft(s, "x2", 0)),
        (A = ft(s, "y2", 0)),
        t.context.beginPath(),
        t.context.moveTo(d, o),
        t.context.lineTo(l, A),
        i && t.context.stroke(i);
      break;
    case "polygon":
      (E = s.getAttribute("points")),
        (b = E.match(/\d+/g).map((Q) => parseInt(Q, 10))),
        t.context.poly(b, !0),
        e && t.context.fill(e),
        i && t.context.stroke(i);
      break;
    case "polyline":
      (E = s.getAttribute("points")),
        (b = E.match(/\d+/g).map((Q) => parseInt(Q, 10))),
        t.context.poly(b, !1),
        i && t.context.stroke(i);
      break;
    case "g":
    case "svg":
      break;
    default: {
      At(`[SVG parser] <${s.nodeName}> elements unsupported`);
      break;
    }
  }
  h && (e = null);
  for (let Q = 0; Q < n.length; Q++) pa(n[Q], t, e, i);
}
function nc(s) {
  return vt.isColorLike(s);
}
function Fn(s) {
  return s instanceof xi;
}
function Gn(s) {
  return s instanceof ne;
}
function rc(s) {
  return s instanceof q;
}
function ac(s, t, e) {
  const i = vt.shared.setValue(t ?? 0);
  return (
    (s.color = i.toNumber()),
    (s.alpha = i.alpha === 1 ? e.alpha : i.alpha),
    (s.texture = q.WHITE),
    { ...e, ...s }
  );
}
function oc(s, t, e) {
  return (s.texture = t), { ...e, ...s };
}
function zn(s, t, e) {
  return (
    (s.fill = t),
    (s.color = 16777215),
    (s.texture = t.texture),
    (s.matrix = t.transform),
    { ...e, ...s }
  );
}
function Nn(s, t, e) {
  return (
    t.buildGradient(),
    (s.fill = t),
    (s.color = 16777215),
    (s.texture = t.texture),
    (s.matrix = t.transform),
    (s.textureSpace = t.textureSpace),
    { ...e, ...s }
  );
}
function hc(s, t) {
  const e = { ...t, ...s },
    i = vt.shared.setValue(e.color);
  return (e.alpha *= i.alpha), (e.color = i.toNumber()), e;
}
function de(s, t) {
  if (s == null) return null;
  const e = {},
    i = s;
  return nc(s)
    ? ac(e, s, t)
    : rc(s)
      ? oc(e, s, t)
      : Fn(s)
        ? zn(e, s, t)
        : Gn(s)
          ? Nn(e, s, t)
          : i.fill && Fn(i.fill)
            ? zn(i, i.fill, t)
            : i.fill && Gn(i.fill)
              ? Nn(i, i.fill, t)
              : hc(i, t);
}
function di(s, t) {
  const {
      width: e,
      alignment: i,
      miterLimit: n,
      cap: r,
      join: a,
      pixelLine: h,
      ...c
    } = t,
    u = de(s, c);
  return u
    ? {
        width: e,
        alignment: i,
        miterLimit: n,
        cap: r,
        join: a,
        pixelLine: h,
        ...u,
      }
    : null;
}
const lc = new _t(),
  Hn = new K(),
  ks = class Jt extends jt {
    constructor() {
      super(...arguments),
        (this.uid = bt("graphicsContext")),
        (this.dirty = !0),
        (this.batchMode = "auto"),
        (this.instructions = []),
        (this._activePath = new Se()),
        (this._transform = new K()),
        (this._fillStyle = { ...Jt.defaultFillStyle }),
        (this._strokeStyle = { ...Jt.defaultStrokeStyle }),
        (this._stateStack = []),
        (this._tick = 0),
        (this._bounds = new Vt()),
        (this._boundsDirty = !0);
    }
    clone() {
      const t = new Jt();
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
      this._fillStyle = de(t, Jt.defaultFillStyle);
    }
    get strokeStyle() {
      return this._strokeStyle;
    }
    set strokeStyle(t) {
      this._strokeStyle = di(t, Jt.defaultStrokeStyle);
    }
    setFillStyle(t) {
      return (this._fillStyle = de(t, Jt.defaultFillStyle)), this;
    }
    setStrokeStyle(t) {
      return (this._strokeStyle = de(t, Jt.defaultStrokeStyle)), this;
    }
    texture(t, e, i, n, r, a) {
      return (
        this.instructions.push({
          action: "texture",
          data: {
            image: t,
            dx: i || 0,
            dy: n || 0,
            dw: r || t.frame.width,
            dh: a || t.frame.height,
            transform: this._transform.clone(),
            alpha: this._fillStyle.alpha,
            style: e ? vt.shared.setValue(e).toNumber() : 16777215,
          },
        }),
        this.onUpdate(),
        this
      );
    }
    beginPath() {
      return (this._activePath = new Se()), this;
    }
    fill(t, e) {
      let i;
      const n = this.instructions[this.instructions.length - 1];
      return (
        this._tick === 0 && n && n.action === "stroke"
          ? (i = n.data.path)
          : (i = this._activePath.clone()),
        i
          ? (t != null &&
              (e !== void 0 &&
                typeof t == "number" &&
                (J(
                  ht,
                  "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead",
                ),
                (t = { color: t, alpha: e })),
              (this._fillStyle = de(t, Jt.defaultFillStyle))),
            this.instructions.push({
              action: "fill",
              data: { style: this.fillStyle, path: i },
            }),
            this.onUpdate(),
            this._initNextPathLocation(),
            (this._tick = 0),
            this)
          : this
      );
    }
    _initNextPathLocation() {
      const { x: t, y: e } = this._activePath.getLastPoint(_t.shared);
      this._activePath.clear(), this._activePath.moveTo(t, e);
    }
    stroke(t) {
      let e;
      const i = this.instructions[this.instructions.length - 1];
      return (
        this._tick === 0 && i && i.action === "fill"
          ? (e = i.data.path)
          : (e = this._activePath.clone()),
        e
          ? (t != null && (this._strokeStyle = di(t, Jt.defaultStrokeStyle)),
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
          i = this._activePath.clone();
        if (e && (e.action === "stroke" || e.action === "fill"))
          if (e.data.hole) e.data.hole.addPath(i);
          else {
            e.data.hole = i;
            break;
          }
      }
      return this._initNextPathLocation(), this;
    }
    arc(t, e, i, n, r, a) {
      this._tick++;
      const h = this._transform;
      return (
        this._activePath.arc(
          h.a * t + h.c * e + h.tx,
          h.b * t + h.d * e + h.ty,
          i,
          n,
          r,
          a,
        ),
        this
      );
    }
    arcTo(t, e, i, n, r) {
      this._tick++;
      const a = this._transform;
      return (
        this._activePath.arcTo(
          a.a * t + a.c * e + a.tx,
          a.b * t + a.d * e + a.ty,
          a.a * i + a.c * n + a.tx,
          a.b * i + a.d * n + a.ty,
          r,
        ),
        this
      );
    }
    arcToSvg(t, e, i, n, r, a, h) {
      this._tick++;
      const c = this._transform;
      return (
        this._activePath.arcToSvg(
          t,
          e,
          i,
          n,
          r,
          c.a * a + c.c * h + c.tx,
          c.b * a + c.d * h + c.ty,
        ),
        this
      );
    }
    bezierCurveTo(t, e, i, n, r, a, h) {
      this._tick++;
      const c = this._transform;
      return (
        this._activePath.bezierCurveTo(
          c.a * t + c.c * e + c.tx,
          c.b * t + c.d * e + c.ty,
          c.a * i + c.c * n + c.tx,
          c.b * i + c.d * n + c.ty,
          c.a * r + c.c * a + c.tx,
          c.b * r + c.d * a + c.ty,
          h,
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
    ellipse(t, e, i, n) {
      return (
        this._tick++,
        this._activePath.ellipse(t, e, i, n, this._transform.clone()),
        this
      );
    }
    circle(t, e, i) {
      return (
        this._tick++,
        this._activePath.circle(t, e, i, this._transform.clone()),
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
      const i = this._transform;
      return (
        this._activePath.lineTo(
          i.a * t + i.c * e + i.tx,
          i.b * t + i.d * e + i.ty,
        ),
        this
      );
    }
    moveTo(t, e) {
      this._tick++;
      const i = this._transform,
        n = this._activePath.instructions,
        r = i.a * t + i.c * e + i.tx,
        a = i.b * t + i.d * e + i.ty;
      return n.length === 1 && n[0].action === "moveTo"
        ? ((n[0].data[0] = r), (n[0].data[1] = a), this)
        : (this._activePath.moveTo(r, a), this);
    }
    quadraticCurveTo(t, e, i, n, r) {
      this._tick++;
      const a = this._transform;
      return (
        this._activePath.quadraticCurveTo(
          a.a * t + a.c * e + a.tx,
          a.b * t + a.d * e + a.ty,
          a.a * i + a.c * n + a.tx,
          a.b * i + a.d * n + a.ty,
          r,
        ),
        this
      );
    }
    rect(t, e, i, n) {
      return (
        this._tick++,
        this._activePath.rect(t, e, i, n, this._transform.clone()),
        this
      );
    }
    roundRect(t, e, i, n, r) {
      return (
        this._tick++,
        this._activePath.roundRect(t, e, i, n, r, this._transform.clone()),
        this
      );
    }
    poly(t, e) {
      return (
        this._tick++, this._activePath.poly(t, e, this._transform.clone()), this
      );
    }
    regularPoly(t, e, i, n, r = 0, a) {
      return this._tick++, this._activePath.regularPoly(t, e, i, n, r, a), this;
    }
    roundPoly(t, e, i, n, r, a) {
      return this._tick++, this._activePath.roundPoly(t, e, i, n, r, a), this;
    }
    roundShape(t, e, i, n) {
      return this._tick++, this._activePath.roundShape(t, e, i, n), this;
    }
    filletRect(t, e, i, n, r) {
      return this._tick++, this._activePath.filletRect(t, e, i, n, r), this;
    }
    chamferRect(t, e, i, n, r, a) {
      return this._tick++, this._activePath.chamferRect(t, e, i, n, r, a), this;
    }
    star(t, e, i, n, r = 0, a = 0) {
      return (
        this._tick++,
        this._activePath.star(t, e, i, n, r, a, this._transform.clone()),
        this
      );
    }
    svg(t) {
      return this._tick++, sc(t, this), this;
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
    setTransform(t, e, i, n, r, a) {
      return t instanceof K
        ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty), this)
        : (this._transform.set(t, e, i, n, r, a), this);
    }
    transform(t, e, i, n, r, a) {
      return t instanceof K
        ? (this._transform.append(t), this)
        : (Hn.set(t, e, i, n, r, a), this._transform.append(Hn), this);
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
        const i = this.instructions[e],
          n = i.action;
        if (n === "fill") {
          const r = i.data;
          t.addBounds(r.path.bounds);
        } else if (n === "texture") {
          const r = i.data;
          t.addFrame(r.dx, r.dy, r.dx + r.dw, r.dy + r.dh, r.transform);
        }
        if (n === "stroke") {
          const r = i.data,
            a = r.style.alignment,
            h = r.style.width * (1 - a),
            c = r.path.bounds;
          t.addFrame(c.minX - h, c.minY - h, c.maxX + h, c.maxY + h);
        }
      }
      return t;
    }
    containsPoint(t) {
      var n;
      if (!this.bounds.containsPoint(t.x, t.y)) return !1;
      const e = this.instructions;
      let i = !1;
      for (let r = 0; r < e.length; r++) {
        const a = e[r],
          h = a.data,
          c = h.path;
        if (!a.action || !c) continue;
        const u = h.style,
          d = c.shapePath.shapePrimitives;
        for (let o = 0; o < d.length; o++) {
          const l = d[o].shape;
          if (!u || !l) continue;
          const A = d[o].transform,
            f = A ? A.applyInverse(t, lc) : t;
          if (a.action === "fill") i = l.contains(f.x, f.y);
          else {
            const g = u;
            i = l.strokeContains(f.x, f.y, g.width, g.alignment);
          }
          const p = h.hole;
          if (p) {
            const g = (n = p.shapePath) == null ? void 0 : n.shapePrimitives;
            if (g)
              for (let m = 0; m < g.length; m++)
                g[m].shape.contains(f.x, f.y) && (i = !1);
          }
          if (i) return !0;
        }
      }
      return i;
    }
    destroy(t = !1) {
      if (
        ((this._stateStack.length = 0),
        (this._transform = null),
        this.emit("destroy", this),
        this.removeAllListeners(),
        typeof t == "boolean" ? t : t == null ? void 0 : t.texture)
      ) {
        const i =
          typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
        this._fillStyle.texture && this._fillStyle.texture.destroy(i),
          this._strokeStyle.texture && this._strokeStyle.texture.destroy(i);
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
ks.defaultFillStyle = {
  color: 16777215,
  alpha: 1,
  texture: q.WHITE,
  matrix: null,
  fill: null,
  textureSpace: "local",
};
ks.defaultStrokeStyle = {
  width: 1,
  color: 16777215,
  alpha: 1,
  alignment: 0.5,
  miterLimit: 10,
  cap: "butt",
  join: "miter",
  texture: q.WHITE,
  matrix: null,
  fill: null,
  textureSpace: "local",
  pixelLine: !1,
};
let zt = ks;
const Ln = [
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
function cc(s) {
  const t = [];
  let e = 0;
  for (let i = 0; i < Ln.length; i++) {
    const n = `_${Ln[i]}`;
    t[e++] = s[n];
  }
  return (
    (e = ma(s._fill, t, e)),
    (e = Ac(s._stroke, t, e)),
    (e = uc(s.dropShadow, t, e)),
    t.join("-")
  );
}
function ma(s, t, e) {
  var i;
  return (
    s &&
      ((t[e++] = s.color),
      (t[e++] = s.alpha),
      (t[e++] = (i = s.fill) == null ? void 0 : i.styleKey)),
    e
  );
}
function Ac(s, t, e) {
  return (
    s &&
      ((e = ma(s, t, e)),
      (t[e++] = s.width),
      (t[e++] = s.alignment),
      (t[e++] = s.cap),
      (t[e++] = s.join),
      (t[e++] = s.miterLimit)),
    e
  );
}
function uc(s, t, e) {
  return (
    s &&
      ((t[e++] = s.alpha),
      (t[e++] = s.angle),
      (t[e++] = s.blur),
      (t[e++] = s.distance),
      (t[e++] = vt.shared.setValue(s.color).toNumber())),
    e
  );
}
const Rs = class Ce extends jt {
  constructor(t = {}) {
    super(), dc(t);
    const e = { ...Ce.defaultTextStyle, ...t };
    for (const i in e) {
      const n = i;
      this[n] = e[i];
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
          ...Ce.defaultDropShadow,
          ...t,
        }))
      : (this._dropShadow = t
          ? this._createProxy({ ...Ce.defaultDropShadow })
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
          { ...zt.defaultFillStyle, ...t },
          () => {
            this._fill = de({ ...this._originalFill }, zt.defaultFillStyle);
          },
        )),
      (this._fill = de(t === 0 ? "black" : t, zt.defaultFillStyle)),
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
          { ...zt.defaultStrokeStyle, ...t },
          () => {
            this._stroke = di(
              { ...this._originalStroke },
              zt.defaultStrokeStyle,
            );
          },
        )),
      (this._stroke = di(t, zt.defaultStrokeStyle)),
      this.update());
  }
  _generateKey() {
    return (this._styleKey = cc(this)), this._styleKey;
  }
  update() {
    (this._styleKey = null), this.emit("update", this);
  }
  reset() {
    const t = Ce.defaultTextStyle;
    for (const e in t) this[e] = t[e];
  }
  get styleKey() {
    return this._styleKey || this._generateKey();
  }
  clone() {
    return new Ce({
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
    var i, n, r, a;
    if (
      (this.removeAllListeners(),
      typeof t == "boolean" ? t : t == null ? void 0 : t.texture)
    ) {
      const h =
        typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      (i = this._fill) != null && i.texture && this._fill.texture.destroy(h),
        (n = this._originalFill) != null &&
          n.texture &&
          this._originalFill.texture.destroy(h),
        (r = this._stroke) != null &&
          r.texture &&
          this._stroke.texture.destroy(h),
        (a = this._originalStroke) != null &&
          a.texture &&
          this._originalStroke.texture.destroy(h);
    }
    (this._fill = null),
      (this._stroke = null),
      (this.dropShadow = null),
      (this._originalStroke = null),
      (this._originalFill = null);
  }
  _createProxy(t, e) {
    return new Proxy(t, {
      set: (i, n, r) => ((i[n] = r), e == null || e(n, r), this.update(), !0),
    });
  }
  _isFillStyle(t) {
    return (
      (t ?? null) !== null &&
      !(vt.isColorLike(t) || t instanceof ne || t instanceof xi)
    );
  }
};
Rs.defaultDropShadow = {
  alpha: 1,
  angle: Math.PI / 6,
  blur: 0,
  color: "black",
  distance: 5,
};
Rs.defaultTextStyle = {
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
let Ut = Rs;
function dc(s) {
  const t = s;
  if (typeof t.dropShadow == "boolean" && t.dropShadow) {
    const e = Ut.defaultDropShadow;
    s.dropShadow = {
      alpha: t.dropShadowAlpha ?? e.alpha,
      angle: t.dropShadowAngle ?? e.angle,
      blur: t.dropShadowBlur ?? e.blur,
      color: t.dropShadowColor ?? e.color,
      distance: t.dropShadowDistance ?? e.distance,
    };
  }
  if (t.strokeThickness !== void 0) {
    J(ht, "strokeThickness is now a part of stroke");
    const e = t.stroke;
    let i = {};
    if (vt.isColorLike(e)) i.color = e;
    else if (e instanceof ne || e instanceof xi) i.fill = e;
    else if (
      Object.hasOwnProperty.call(e, "color") ||
      Object.hasOwnProperty.call(e, "fill")
    )
      i = e;
    else throw new Error("Invalid stroke value.");
    s.stroke = { ...i, width: t.strokeThickness };
  }
  if (Array.isArray(t.fillGradientStops)) {
    J(ht, "gradient fill is now a fill pattern: `new FillGradient(...)`");
    let e;
    s.fontSize == null
      ? (s.fontSize = Ut.defaultTextStyle.fontSize)
      : typeof s.fontSize == "string"
        ? (e = parseInt(s.fontSize, 10))
        : (e = s.fontSize);
    const i = new ne({
        start: { x: 0, y: 0 },
        end: { x: 0, y: (e || 0) * 1.7 },
      }),
      n = t.fillGradientStops.map((r) => vt.shared.setValue(r).toNumber());
    n.forEach((r, a) => {
      const h = a / (n.length - 1);
      i.addColorStop(h, r);
    }),
      (s.fill = { fill: i });
  }
}
class fc {
  constructor(t) {
    (this._canvasPool = Object.create(null)),
      (this.canvasOptions = t || {}),
      (this.enableFullScreen = !1);
  }
  _createCanvasAndContext(t, e) {
    const i = mt.get().createCanvas();
    (i.width = t), (i.height = e);
    const n = i.getContext("2d");
    return { canvas: i, context: n };
  }
  getOptimalCanvasAndContext(t, e, i = 1) {
    (t = Math.ceil(t * i - 1e-6)),
      (e = Math.ceil(e * i - 1e-6)),
      (t = ci(t)),
      (e = ci(e));
    const n = (t << 17) + (e << 1);
    this._canvasPool[n] || (this._canvasPool[n] = []);
    let r = this._canvasPool[n].pop();
    return r || (r = this._createCanvasAndContext(t, e)), r;
  }
  returnCanvasAndContext(t) {
    const e = t.canvas,
      { width: i, height: n } = e,
      r = (i << 17) + (n << 1);
    t.context.clearRect(0, 0, i, n), this._canvasPool[r].push(t);
  }
  clear() {
    this._canvasPool = {};
  }
}
const Xn = new fc(),
  gc = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"];
function ds(s) {
  const t = typeof s.fontSize == "number" ? `${s.fontSize}px` : s.fontSize;
  let e = s.fontFamily;
  Array.isArray(s.fontFamily) || (e = s.fontFamily.split(","));
  for (let i = e.length - 1; i >= 0; i--) {
    let n = e[i].trim();
    !/([\"\'])[^\'\"]+\1/.test(n) && !gc.includes(n) && (n = `"${n}"`),
      (e[i] = n);
  }
  return `${s.fontStyle} ${s.fontVariant} ${s.fontWeight} ${t} ${e.join(",")}`;
}
const ji = { willReadFrequently: !0 },
  Yt = class G {
    static get experimentalLetterSpacingSupported() {
      let t = G._experimentalLetterSpacingSupported;
      if (t !== void 0) {
        const e = mt.get().getCanvasRenderingContext2D().prototype;
        t = G._experimentalLetterSpacingSupported =
          "letterSpacing" in e || "textLetterSpacing" in e;
      }
      return t;
    }
    constructor(t, e, i, n, r, a, h, c, u) {
      (this.text = t),
        (this.style = e),
        (this.width = i),
        (this.height = n),
        (this.lines = r),
        (this.lineWidths = a),
        (this.lineHeight = h),
        (this.maxLineWidth = c),
        (this.fontProperties = u);
    }
    static measureText(t = " ", e, i = G._canvas, n = e.wordWrap) {
      var x;
      const r = `${t}:${e.styleKey}`;
      if (G._measurementCache[r]) return G._measurementCache[r];
      const a = ds(e),
        h = G.measureFont(a);
      h.fontSize === 0 && ((h.fontSize = e.fontSize), (h.ascent = e.fontSize));
      const c = G.__context;
      c.font = a;
      const d = (n ? G._wordWrap(t, e, i) : t).split(/(?:\r\n|\r|\n)/),
        o = new Array(d.length);
      let l = 0;
      for (let b = 0; b < d.length; b++) {
        const E = G._measureText(d[b], e.letterSpacing, c);
        (o[b] = E), (l = Math.max(l, E));
      }
      const A = ((x = e._stroke) == null ? void 0 : x.width) || 0;
      let f = l + A;
      e.dropShadow && (f += e.dropShadow.distance);
      const p = e.lineHeight || h.fontSize;
      let g = Math.max(p, h.fontSize + A) + (d.length - 1) * (p + e.leading);
      return (
        e.dropShadow && (g += e.dropShadow.distance),
        new G(t, e, f, g, d, o, p + e.leading, l, h)
      );
    }
    static _measureText(t, e, i) {
      let n = !1;
      G.experimentalLetterSpacingSupported &&
        (G.experimentalLetterSpacing
          ? ((i.letterSpacing = `${e}px`),
            (i.textLetterSpacing = `${e}px`),
            (n = !0))
          : ((i.letterSpacing = "0px"), (i.textLetterSpacing = "0px")));
      const r = i.measureText(t);
      let a = r.width;
      const h = -r.actualBoundingBoxLeft;
      let u = r.actualBoundingBoxRight - h;
      if (a > 0)
        if (n) (a -= e), (u -= e);
        else {
          const d = (G.graphemeSegmenter(t).length - 1) * e;
          (a += d), (u += d);
        }
      return Math.max(a, u);
    }
    static _wordWrap(t, e, i = G._canvas) {
      const n = i.getContext("2d", ji);
      let r = 0,
        a = "",
        h = "";
      const c = Object.create(null),
        { letterSpacing: u, whiteSpace: d } = e,
        o = G._collapseSpaces(d),
        l = G._collapseNewlines(d);
      let A = !o;
      const f = e.wordWrapWidth + u,
        p = G._tokenize(t);
      for (let g = 0; g < p.length; g++) {
        let m = p[g];
        if (G._isNewline(m)) {
          if (!l) {
            (h += G._addLine(a)), (A = !o), (a = ""), (r = 0);
            continue;
          }
          m = " ";
        }
        if (o) {
          const b = G.isBreakingSpace(m),
            E = G.isBreakingSpace(a[a.length - 1]);
          if (b && E) continue;
        }
        const x = G._getFromCache(m, u, c, n);
        if (x > f)
          if (
            (a !== "" && ((h += G._addLine(a)), (a = ""), (r = 0)),
            G.canBreakWords(m, e.breakWords))
          ) {
            const b = G.wordWrapSplit(m);
            for (let E = 0; E < b.length; E++) {
              let D = b[E],
                _ = D,
                P = 1;
              for (; b[E + P]; ) {
                const Q = b[E + P];
                if (!G.canBreakChars(_, Q, m, E, e.breakWords)) D += Q;
                else break;
                (_ = Q), P++;
              }
              E += P - 1;
              const X = G._getFromCache(D, u, c, n);
              X + r > f && ((h += G._addLine(a)), (A = !1), (a = ""), (r = 0)),
                (a += D),
                (r += X);
            }
          } else {
            a.length > 0 && ((h += G._addLine(a)), (a = ""), (r = 0));
            const b = g === p.length - 1;
            (h += G._addLine(m, !b)), (A = !1), (a = ""), (r = 0);
          }
        else
          x + r > f && ((A = !1), (h += G._addLine(a)), (a = ""), (r = 0)),
            (a.length > 0 || !G.isBreakingSpace(m) || A) &&
              ((a += m), (r += x));
      }
      return (h += G._addLine(a, !1)), h;
    }
    static _addLine(t, e = !0) {
      return (
        (t = G._trimRight(t)),
        (t = e
          ? `${t}
`
          : t),
        t
      );
    }
    static _getFromCache(t, e, i, n) {
      let r = i[t];
      return (
        typeof r != "number" && ((r = G._measureText(t, e, n) + e), (i[t] = r)),
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
        const i = t[e];
        if (!G.isBreakingSpace(i)) break;
        t = t.slice(0, -1);
      }
      return t;
    }
    static _isNewline(t) {
      return typeof t != "string" ? !1 : G._newlines.includes(t.charCodeAt(0));
    }
    static isBreakingSpace(t, e) {
      return typeof t != "string"
        ? !1
        : G._breakingSpaces.includes(t.charCodeAt(0));
    }
    static _tokenize(t) {
      const e = [];
      let i = "";
      if (typeof t != "string") return e;
      for (let n = 0; n < t.length; n++) {
        const r = t[n],
          a = t[n + 1];
        if (G.isBreakingSpace(r, a) || G._isNewline(r)) {
          i !== "" && (e.push(i), (i = "")), e.push(r);
          continue;
        }
        i += r;
      }
      return i !== "" && e.push(i), e;
    }
    static canBreakWords(t, e) {
      return e;
    }
    static canBreakChars(t, e, i, n, r) {
      return !0;
    }
    static wordWrapSplit(t) {
      return G.graphemeSegmenter(t);
    }
    static measureFont(t) {
      if (G._fonts[t]) return G._fonts[t];
      const e = G._context;
      e.font = t;
      const i = e.measureText(G.METRICS_STRING + G.BASELINE_SYMBOL),
        n = {
          ascent: i.actualBoundingBoxAscent,
          descent: i.actualBoundingBoxDescent,
          fontSize: i.actualBoundingBoxAscent + i.actualBoundingBoxDescent,
        };
      return (G._fonts[t] = n), n;
    }
    static clearMetrics(t = "") {
      t ? delete G._fonts[t] : (G._fonts = {});
    }
    static get _canvas() {
      if (!G.__canvas) {
        let t;
        try {
          const e = new OffscreenCanvas(0, 0),
            i = e.getContext("2d", ji);
          if (i != null && i.measureText) return (G.__canvas = e), e;
          t = mt.get().createCanvas();
        } catch {
          t = mt.get().createCanvas();
        }
        (t.width = t.height = 10), (G.__canvas = t);
      }
      return G.__canvas;
    }
    static get _context() {
      return (
        G.__context || (G.__context = G._canvas.getContext("2d", ji)),
        G.__context
      );
    }
  };
Yt.METRICS_STRING = "|ÉqÅ";
Yt.BASELINE_SYMBOL = "M";
Yt.BASELINE_MULTIPLIER = 1.4;
Yt.HEIGHT_MULTIPLIER = 2;
Yt.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const s = new Intl.Segmenter();
    return (t) => [...s.segment(t)].map((e) => e.segment);
  }
  return (s) => [...s];
})();
Yt.experimentalLetterSpacing = !1;
Yt._fonts = {};
Yt._newlines = [10, 13];
Yt._breakingSpaces = [
  9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287,
  12288,
];
Yt._measurementCache = {};
let fs = Yt;
const Vn = 1e5;
function jn(s, t, e, i = 0) {
  if (s.texture === q.WHITE && !s.fill)
    return vt.shared
      .setValue(s.color)
      .setAlpha(s.alpha ?? 1)
      .toHexa();
  if (s.fill) {
    if (s.fill instanceof xi) {
      const n = s.fill,
        r = t.createPattern(n.texture.source.resource, "repeat"),
        a = n.transform.copyTo(K.shared);
      return (
        a.scale(n.texture.frame.width, n.texture.frame.height),
        r.setTransform(a),
        r
      );
    } else if (s.fill instanceof ne) {
      const n = s.fill,
        r = n.type === "linear",
        a = n.textureSpace === "local";
      let h = 1,
        c = 1;
      a && e && ((h = e.width + i), (c = e.height + i));
      let u,
        d = !1;
      if (r) {
        const { start: o, end: l } = n;
        (u = t.createLinearGradient(o.x * h, o.y * c, l.x * h, l.y * c)),
          (d = Math.abs(l.x - o.x) < Math.abs((l.y - o.y) * 0.1));
      } else {
        const { center: o, innerRadius: l, outerCenter: A, outerRadius: f } = n;
        u = t.createRadialGradient(
          o.x * h,
          o.y * c,
          l * h,
          A.x * h,
          A.y * c,
          f * h,
        );
      }
      if (d && a && e) {
        const o = e.lineHeight / c;
        for (let l = 0; l < e.lines.length; l++) {
          const A = (l * e.lineHeight + i / 2) / c;
          n.colorStops.forEach((f) => {
            const p = A + f.offset * o;
            u.addColorStop(
              Math.floor(p * Vn) / Vn,
              vt.shared.setValue(f.color).toHex(),
            );
          });
        }
      } else
        n.colorStops.forEach((o) => {
          u.addColorStop(o.offset, vt.shared.setValue(o.color).toHex());
        });
      return u;
    }
  } else {
    const n = t.createPattern(s.texture.source.resource, "repeat"),
      r = s.matrix.copyTo(K.shared);
    return (
      r.scale(s.texture.frame.width, s.texture.frame.height),
      n.setTransform(r),
      n
    );
  }
  return At("FillStyle not recognised", s), "red";
}
function ya(s) {
  if (s === "") return [];
  typeof s == "string" && (s = [s]);
  const t = [];
  for (let e = 0, i = s.length; e < i; e++) {
    const n = s[e];
    if (Array.isArray(n)) {
      if (n.length !== 2)
        throw new Error(
          `[BitmapFont]: Invalid character range length, expecting 2 got ${n.length}.`,
        );
      if (n[0].length === 0 || n[1].length === 0)
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      const r = n[0].charCodeAt(0),
        a = n[1].charCodeAt(0);
      if (a < r) throw new Error("[BitmapFont]: Invalid character range.");
      for (let h = r, c = a; h <= c; h++) t.push(String.fromCharCode(h));
    } else t.push(...Array.from(n));
  }
  if (t.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return t;
}
const xa = class wa extends Zr {
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
    const e = { ...wa.defaultOptions, ...t };
    (this._textureSize = e.textureSize), (this._mipmap = e.mipmap);
    const i = e.style.clone();
    e.overrideFill &&
      ((i._fill.color = 16777215),
      (i._fill.alpha = 1),
      (i._fill.texture = q.WHITE),
      (i._fill.fill = null)),
      (this.applyFillAsTint = e.overrideFill);
    const n = i.fontSize;
    i.fontSize = this.baseMeasurementFontSize;
    const r = ds(i);
    e.overrideSize
      ? i._stroke && (i._stroke.width *= this.baseRenderedFontSize / n)
      : (i.fontSize = this.baseRenderedFontSize = n),
      (this._style = i),
      (this._skipKerning = e.skipKerning ?? !1),
      (this.resolution = e.resolution ?? 1),
      (this._padding = e.padding ?? 4),
      (this.fontMetrics = fs.measureFont(r)),
      (this.lineHeight =
        i.lineHeight || this.fontMetrics.fontSize || i.fontSize);
  }
  ensureCharacters(t) {
    var g, m;
    const e = ya(t)
      .filter((x) => !this._currentChars.includes(x))
      .filter((x, b, E) => E.indexOf(x) === b);
    if (!e.length) return;
    this._currentChars = [...this._currentChars, ...e];
    let i;
    this._currentPageIndex === -1
      ? (i = this._nextPage())
      : (i = this.pages[this._currentPageIndex]);
    let { canvas: n, context: r } = i.canvasAndContext,
      a = i.texture.source;
    const h = this._style;
    let c = this._currentX,
      u = this._currentY;
    const d = this.baseRenderedFontSize / this.baseMeasurementFontSize,
      o = this._padding * d;
    let l = 0,
      A = !1;
    const f = n.width / this.resolution,
      p = n.height / this.resolution;
    for (let x = 0; x < e.length; x++) {
      const b = e[x],
        E = fs.measureText(b, h, n, !1);
      E.lineHeight = E.height;
      const D = E.width * d,
        _ = Math.ceil((h.fontStyle === "italic" ? 2 : 1) * D),
        P = E.height * d,
        X = _ + o * 2,
        Q = P + o * 2;
      if (
        ((A = !1),
        b !==
          `
` &&
          b !== "\r" &&
          b !== "	" &&
          b !== " " &&
          ((A = !0), (l = Math.ceil(Math.max(Q, l)))),
        c + X > f && ((u += l), (l = Q), (c = 0), u + l > p))
      ) {
        a.update();
        const O = this._nextPage();
        (n = O.canvasAndContext.canvas),
          (r = O.canvasAndContext.context),
          (a = O.texture.source),
          (u = 0);
      }
      const U =
        D / d -
        (((g = h.dropShadow) == null ? void 0 : g.distance) ?? 0) -
        (((m = h._stroke) == null ? void 0 : m.width) ?? 0);
      if (
        ((this.chars[b] = {
          id: b.codePointAt(0),
          xOffset: -this._padding,
          yOffset: -this._padding,
          xAdvance: U,
          kerning: {},
        }),
        A)
      ) {
        this._drawGlyph(r, E, c + o, u + o, d, h);
        const O = a.width * d,
          rt = a.height * d,
          $ = new Ct(
            (c / O) * a.width,
            (u / rt) * a.height,
            (X / O) * a.width,
            (Q / rt) * a.height,
          );
        (this.chars[b].texture = new q({ source: a, frame: $ })),
          (c += Math.ceil(X));
      }
    }
    a.update(),
      (this._currentX = c),
      (this._currentY = u),
      this._skipKerning && this._applyKerning(e, r);
  }
  get pageTextures() {
    return (
      J(
        ht,
        "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead.",
      ),
      this.pages
    );
  }
  _applyKerning(t, e) {
    const i = this._measureCache;
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      for (let a = 0; a < this._currentChars.length; a++) {
        const h = this._currentChars[a];
        let c = i[r];
        c || (c = i[r] = e.measureText(r).width);
        let u = i[h];
        u || (u = i[h] = e.measureText(h).width);
        let d = e.measureText(r + h).width,
          o = d - (c + u);
        o && (this.chars[r].kerning[h] = o),
          (d = e.measureText(r + h).width),
          (o = d - (c + u)),
          o && (this.chars[h].kerning[r] = o);
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const t = this.resolution,
      e = Xn.getOptimalCanvasAndContext(
        this._textureSize,
        this._textureSize,
        t,
      );
    this._setupContext(e.context, this._style, t);
    const i = t * (this.baseRenderedFontSize / this.baseMeasurementFontSize),
      n = new q({
        source: new ge({
          resource: e.canvas,
          resolution: i,
          alphaMode: "premultiply-alpha-on-upload",
          autoGenerateMipmaps: this._mipmap,
        }),
      }),
      r = { canvasAndContext: e, texture: n };
    return (this.pages[this._currentPageIndex] = r), r;
  }
  _setupContext(t, e, i) {
    (e.fontSize = this.baseRenderedFontSize),
      t.scale(i, i),
      (t.font = ds(e)),
      (e.fontSize = this.baseMeasurementFontSize),
      (t.textBaseline = e.textBaseline);
    const n = e._stroke,
      r = (n == null ? void 0 : n.width) ?? 0;
    if (
      (n &&
        ((t.lineWidth = r),
        (t.lineJoin = n.join),
        (t.miterLimit = n.miterLimit),
        (t.strokeStyle = jn(n, t))),
      e._fill && (t.fillStyle = jn(e._fill, t)),
      e.dropShadow)
    ) {
      const a = e.dropShadow,
        h = vt.shared.setValue(a.color).toArray(),
        c = a.blur * i,
        u = a.distance * i;
      (t.shadowColor = `rgba(${h[0] * 255},${h[1] * 255},${h[2] * 255},${a.alpha})`),
        (t.shadowBlur = c),
        (t.shadowOffsetX = Math.cos(a.angle) * u),
        (t.shadowOffsetY = Math.sin(a.angle) * u);
    } else
      (t.shadowColor = "black"),
        (t.shadowBlur = 0),
        (t.shadowOffsetX = 0),
        (t.shadowOffsetY = 0);
  }
  _drawGlyph(t, e, i, n, r, a) {
    const h = e.text,
      c = e.fontProperties,
      u = a._stroke,
      d = ((u == null ? void 0 : u.width) ?? 0) * r,
      o = i + d / 2,
      l = n - d / 2,
      A = c.descent * r,
      f = e.lineHeight * r;
    a.stroke && d && t.strokeText(h, o, l + f - A),
      a._fill && t.fillText(h, o, l + f - A);
  }
  destroy() {
    super.destroy();
    for (let t = 0; t < this.pages.length; t++) {
      const { canvasAndContext: e, texture: i } = this.pages[t];
      Xn.returnCanvasAndContext(e), i.destroy(!0);
    }
    this.pages = null;
  }
};
xa.defaultOptions = { textureSize: 512, style: new Ut(), mipmap: !0 };
let Yn = xa;
function pc(s, t, e, i) {
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
    a = null,
    h = !0;
  const c = { width: 0, start: 0, index: 0, positions: [], chars: [] },
    u = (f) => {
      const p = r.width;
      for (let g = 0; g < c.index; g++) {
        const m = f.positions[g];
        r.chars.push(f.chars[g]), r.charPositions.push(m + p);
      }
      (r.width += f.width),
        (h = !1),
        (c.width = 0),
        (c.index = 0),
        (c.chars.length = 0);
    },
    d = () => {
      let f = r.chars.length - 1;
      if (i) {
        let p = r.chars[f];
        for (; p === " "; )
          (r.width -= e.chars[p].xAdvance), (p = r.chars[--f]);
      }
      (n.width = Math.max(n.width, r.width)),
        (r = {
          width: 0,
          charPositions: [],
          chars: [],
          spaceWidth: 0,
          spacesIndex: [],
        }),
        (h = !0),
        n.lines.push(r),
        (n.height += e.lineHeight);
    },
    o = e.baseMeasurementFontSize / t.fontSize,
    l = t.letterSpacing * o,
    A = t.wordWrapWidth * o;
  for (let f = 0; f < s.length + 1; f++) {
    let p;
    const g = f === s.length;
    g || (p = s[f]);
    const m = e.chars[p] || e.chars[" "];
    if (
      /(?:\s)/.test(p) ||
      p === "\r" ||
      p ===
        `
` ||
      g
    ) {
      if (
        (!h && t.wordWrap && r.width + c.width - l > A
          ? (d(), u(c), g || r.charPositions.push(0))
          : ((c.start = r.width), u(c), g || r.charPositions.push(0)),
        p === "\r" ||
          p ===
            `
`)
      )
        r.width !== 0 && d();
      else if (!g) {
        const D = m.xAdvance + (m.kerning[a] || 0) + l;
        (r.width += D),
          (r.spaceWidth = D),
          r.spacesIndex.push(r.charPositions.length),
          r.chars.push(p);
      }
    } else {
      const E = m.kerning[a] || 0,
        D = m.xAdvance + E + l;
      (c.positions[c.index++] = c.width + E), c.chars.push(p), (c.width += D);
    }
    a = p;
  }
  return (
    d(),
    t.align === "center"
      ? mc(n)
      : t.align === "right"
        ? yc(n)
        : t.align === "justify" && xc(n),
    n
  );
}
function mc(s) {
  for (let t = 0; t < s.lines.length; t++) {
    const e = s.lines[t],
      i = s.width / 2 - e.width / 2;
    for (let n = 0; n < e.charPositions.length; n++) e.charPositions[n] += i;
  }
}
function yc(s) {
  for (let t = 0; t < s.lines.length; t++) {
    const e = s.lines[t],
      i = s.width - e.width;
    for (let n = 0; n < e.charPositions.length; n++) e.charPositions[n] += i;
  }
}
function xc(s) {
  const t = s.width;
  for (let e = 0; e < s.lines.length; e++) {
    const i = s.lines[e];
    let n = 0,
      r = i.spacesIndex[n++],
      a = 0;
    const h = i.spacesIndex.length,
      u = (t - i.width) / h;
    for (let d = 0; d < i.charPositions.length; d++)
      d === r && ((r = i.spacesIndex[n++]), (a += u)),
        (i.charPositions[d] += a);
  }
}
let ni = 0;
class wc {
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
    var a;
    let i = `${e.fontFamily}-bitmap`,
      n = !0;
    if (e._fill.fill && !e._stroke) (i += e._fill.fill.styleKey), (n = !1);
    else if (e._stroke || e.dropShadow) {
      let h = e.styleKey;
      (h = h.substring(0, h.lastIndexOf("-"))), (i = `${h}-bitmap`), (n = !1);
    }
    if (!pt.has(i)) {
      const h = new Yn({
        style: e,
        overrideFill: n,
        overrideSize: !0,
        ...this.defaultOptions,
      });
      ni++,
        ni > 50 &&
          At(
            "BitmapText",
            `You have dynamically created ${ni} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``,
          ),
        h.once("destroy", () => {
          ni--, pt.remove(i);
        }),
        pt.set(i, h);
    }
    const r = pt.get(i);
    return (a = r.ensureCharacters) == null || a.call(r, t), r;
  }
  getLayout(t, e, i = !0) {
    const n = this.getFont(t, e);
    return pc([...t], e, n, i);
  }
  measureText(t, e, i = !0) {
    return this.getLayout(t, e, i);
  }
  install(...t) {
    var u, d, o, l;
    let e = t[0];
    typeof e == "string" &&
      ((e = {
        name: e,
        style: t[1],
        chars: (u = t[2]) == null ? void 0 : u.chars,
        resolution: (d = t[2]) == null ? void 0 : d.resolution,
        padding: (o = t[2]) == null ? void 0 : o.padding,
        skipKerning: (l = t[2]) == null ? void 0 : l.skipKerning,
      }),
      J(
        ht,
        "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})",
      ));
    const i = e == null ? void 0 : e.name;
    if (!i) throw new Error("[BitmapFontManager] Property `name` is required.");
    e = { ...this.defaultOptions, ...e };
    const n = e.style,
      r = n instanceof Ut ? n : new Ut(n),
      a = r._fill.fill !== null && r._fill.fill !== void 0,
      h = new Yn({
        style: r,
        overrideFill: a,
        skipKerning: e.skipKerning,
        padding: e.padding,
        resolution: e.resolution,
        overrideSize: !1,
      }),
      c = ya(e.chars);
    return (
      h.ensureCharacters(c.join("")),
      pt.set(`${i}-bitmap`, h),
      h.once("destroy", () => pt.remove(`${i}-bitmap`)),
      h
    );
  }
  uninstall(t) {
    const e = `${t}-bitmap`,
      i = pt.get(e);
    i && i.destroy();
  }
}
const gs = new wc();
class Ca extends Zr {
  constructor(t, e) {
    super();
    const { textures: i, data: n } = t;
    Object.keys(n.pages).forEach((r) => {
      const a = n.pages[parseInt(r, 10)],
        h = i[a.id];
      this.pages.push({ texture: h });
    }),
      Object.keys(n.chars).forEach((r) => {
        const a = n.chars[r],
          { frame: h, source: c } = i[a.page],
          u = new Ct(a.x + h.x, a.y + h.y, a.width, a.height),
          d = new q({ source: c, frame: u });
        this.chars[r] = {
          id: r.codePointAt(0),
          xOffset: a.xOffset,
          yOffset: a.yOffset,
          xAdvance: a.xAdvance,
          kerning: a.kerning ?? {},
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
    gs.install(t);
  }
  static uninstall(t) {
    gs.uninstall(t);
  }
}
const Yi = {
    test(s) {
      return typeof s == "string" && s.startsWith("info face=");
    },
    parse(s) {
      const t = s.match(/^[a-z]+\s+.+$/gm),
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
      for (const o in t) {
        const l = t[o].match(/^[a-z]+/gm)[0],
          A = t[o].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),
          f = {};
        for (const p in A) {
          const g = A[p].split("="),
            m = g[0],
            x = g[1].replace(/"/gm, ""),
            b = parseFloat(x),
            E = isNaN(b) ? x : b;
          f[m] = E;
        }
        e[l].push(f);
      }
      const i = {
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
        [a] = e.distanceField ?? [];
      a &&
        (i.distanceField = {
          range: parseInt(a.distanceRange, 10),
          type: a.fieldType,
        }),
        (i.fontSize = parseInt(n.size, 10)),
        (i.fontFamily = n.face),
        (i.lineHeight = parseInt(r.lineHeight, 10));
      const h = e.page;
      for (let o = 0; o < h.length; o++)
        i.pages.push({ id: parseInt(h[o].id, 10) || 0, file: h[o].file });
      const c = {};
      i.baseLineOffset = i.lineHeight - parseInt(r.base, 10);
      const u = e.char;
      for (let o = 0; o < u.length; o++) {
        const l = u[o],
          A = parseInt(l.id, 10);
        let f = l.letter ?? l.char ?? String.fromCharCode(A);
        f === "space" && (f = " "),
          (c[A] = f),
          (i.chars[f] = {
            id: A,
            page: parseInt(l.page, 10) || 0,
            x: parseInt(l.x, 10),
            y: parseInt(l.y, 10),
            width: parseInt(l.width, 10),
            height: parseInt(l.height, 10),
            xOffset: parseInt(l.xoffset, 10),
            yOffset: parseInt(l.yoffset, 10),
            xAdvance: parseInt(l.xadvance, 10),
            kerning: {},
          });
      }
      const d = e.kerning || [];
      for (let o = 0; o < d.length; o++) {
        const l = parseInt(d[o].first, 10),
          A = parseInt(d[o].second, 10),
          f = parseInt(d[o].amount, 10);
        i.chars[c[A]].kerning[c[l]] = f;
      }
      return i;
    },
  },
  Wn = {
    test(s) {
      const t = s;
      return (
        typeof t != "string" &&
        "getElementsByTagName" in t &&
        t.getElementsByTagName("page").length &&
        t.getElementsByTagName("info")[0].getAttribute("face") !== null
      );
    },
    parse(s) {
      const t = {
          chars: {},
          pages: [],
          lineHeight: 0,
          fontSize: 0,
          fontFamily: "",
          distanceField: null,
          baseLineOffset: 0,
        },
        e = s.getElementsByTagName("info")[0],
        i = s.getElementsByTagName("common")[0],
        n = s.getElementsByTagName("distanceField")[0];
      n &&
        (t.distanceField = {
          type: n.getAttribute("fieldType"),
          range: parseInt(n.getAttribute("distanceRange"), 10),
        });
      const r = s.getElementsByTagName("page"),
        a = s.getElementsByTagName("char"),
        h = s.getElementsByTagName("kerning");
      (t.fontSize = parseInt(e.getAttribute("size"), 10)),
        (t.fontFamily = e.getAttribute("face")),
        (t.lineHeight = parseInt(i.getAttribute("lineHeight"), 10));
      for (let u = 0; u < r.length; u++)
        t.pages.push({
          id: parseInt(r[u].getAttribute("id"), 10) || 0,
          file: r[u].getAttribute("file"),
        });
      const c = {};
      t.baseLineOffset = t.lineHeight - parseInt(i.getAttribute("base"), 10);
      for (let u = 0; u < a.length; u++) {
        const d = a[u],
          o = parseInt(d.getAttribute("id"), 10);
        let l =
          d.getAttribute("letter") ??
          d.getAttribute("char") ??
          String.fromCharCode(o);
        l === "space" && (l = " "),
          (c[o] = l),
          (t.chars[l] = {
            id: o,
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
      for (let u = 0; u < h.length; u++) {
        const d = parseInt(h[u].getAttribute("first"), 10),
          o = parseInt(h[u].getAttribute("second"), 10),
          l = parseInt(h[u].getAttribute("amount"), 10);
        t.chars[c[o]].kerning[c[d]] = l;
      }
      return t;
    },
  },
  qn = {
    test(s) {
      return typeof s == "string" && s.includes("<font>")
        ? Wn.test(mt.get().parseXML(s))
        : !1;
    },
    parse(s) {
      return Wn.parse(mt.get().parseXML(s));
    },
  },
  Cc = [".xml", ".fnt"],
  bc = {
    extension: { type: z.CacheParser, name: "cacheBitmapFont" },
    test: (s) => s instanceof Ca,
    getCacheableAssets(s, t) {
      const e = {};
      return (
        s.forEach((i) => {
          (e[i] = t), (e[`${i}-bitmap`] = t);
        }),
        (e[`${t.fontFamily}-bitmap`] = t),
        e
      );
    },
  },
  vc = {
    extension: { type: z.LoadParser, priority: oe.Normal },
    name: "loadBitmapFont",
    test(s) {
      return Cc.includes(Ot.extname(s).toLowerCase());
    },
    async testParse(s) {
      return Yi.test(s) || qn.test(s);
    },
    async parse(s, t, e) {
      const i = Yi.test(s) ? Yi.parse(s) : qn.parse(s),
        { src: n } = t,
        { pages: r } = i,
        a = [],
        h = i.distanceField
          ? {
              scaleMode: "linear",
              alphaMode: "premultiply-alpha-on-upload",
              autoGenerateMipmaps: !1,
              resolution: 1,
            }
          : {};
      for (let o = 0; o < r.length; ++o) {
        const l = r[o].file;
        let A = Ot.join(Ot.dirname(n), l);
        (A = ss(A, n)), a.push({ src: A, data: h });
      }
      const c = await e.load(a),
        u = a.map((o) => c[o.src]);
      return new Ca({ data: i, textures: u }, n);
    },
    async load(s, t) {
      return await (await mt.get().fetch(s)).text();
    },
    async unload(s, t, e) {
      await Promise.all(
        s.pages.map((i) => e.unload(i.texture.source._sourceOrigin)),
      ),
        s.destroy();
    },
  };
class Ec {
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
      for (let i = 0; i < e; i++) t.push(this._assetList.pop());
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
const Sc = {
  extension: { type: z.CacheParser, name: "cacheTextureArray" },
  test: (s) => Array.isArray(s) && s.every((t) => t instanceof q),
  getCacheableAssets: (s, t) => {
    const e = {};
    return (
      s.forEach((i) => {
        t.forEach((n, r) => {
          e[i + (r === 0 ? "" : r + 1)] = n;
        });
      }),
      e
    );
  },
};
async function ba(s) {
  if ("Image" in globalThis)
    return new Promise((t) => {
      const e = new Image();
      (e.onload = () => {
        t(!0);
      }),
        (e.onerror = () => {
          t(!1);
        }),
        (e.src = s);
    });
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const t = await (await fetch(s)).blob();
      await createImageBitmap(t);
    } catch {
      return !1;
    }
    return !0;
  }
  return !1;
}
const Bc = {
    extension: { type: z.DetectionParser, priority: 1 },
    test: async () =>
      ba(
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",
      ),
    add: async (s) => [...s, "avif"],
    remove: async (s) => s.filter((t) => t !== "avif"),
  },
  Kn = ["png", "jpg", "jpeg"],
  Ic = {
    extension: { type: z.DetectionParser, priority: -1 },
    test: () => Promise.resolve(!0),
    add: async (s) => [...s, ...Kn],
    remove: async (s) => s.filter((t) => !Kn.includes(t)),
  },
  _c =
    "WorkerGlobalScope" in globalThis &&
    globalThis instanceof globalThis.WorkerGlobalScope;
function Qs(s) {
  return _c ? !1 : document.createElement("video").canPlayType(s) !== "";
}
const Pc = {
    extension: { type: z.DetectionParser, priority: 0 },
    test: async () => Qs("video/mp4"),
    add: async (s) => [...s, "mp4", "m4v"],
    remove: async (s) => s.filter((t) => t !== "mp4" && t !== "m4v"),
  },
  Mc = {
    extension: { type: z.DetectionParser, priority: 0 },
    test: async () => Qs("video/ogg"),
    add: async (s) => [...s, "ogv"],
    remove: async (s) => s.filter((t) => t !== "ogv"),
  },
  Tc = {
    extension: { type: z.DetectionParser, priority: 0 },
    test: async () => Qs("video/webm"),
    add: async (s) => [...s, "webm"],
    remove: async (s) => s.filter((t) => t !== "webm"),
  },
  Dc = {
    extension: { type: z.DetectionParser, priority: 0 },
    test: async () =>
      ba(
        "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
      ),
    add: async (s) => [...s, "webp"],
    remove: async (s) => s.filter((t) => t !== "webp"),
  };
class kc {
  constructor() {
    (this._parsers = []),
      (this._parsersValidated = !1),
      (this.parsers = new Proxy(this._parsers, {
        set: (t, e, i) => ((this._parsersValidated = !1), (t[e] = i), !0),
      })),
      (this.promiseCache = {});
  }
  reset() {
    (this._parsersValidated = !1), (this.promiseCache = {});
  }
  _getLoadPromiseAndParser(t, e) {
    const i = { promise: null, parser: null };
    return (
      (i.promise = (async () => {
        var a, h;
        let n = null,
          r = null;
        if (
          (e.loadParser &&
            ((r = this._parserHash[e.loadParser]),
            r ||
              At(
                `[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`,
              )),
          !r)
        ) {
          for (let c = 0; c < this.parsers.length; c++) {
            const u = this.parsers[c];
            if (u.load && (a = u.test) != null && a.call(u, t, e, this)) {
              r = u;
              break;
            }
          }
          if (!r)
            return (
              At(
                `[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`,
              ),
              null
            );
        }
        (n = await r.load(t, e, this)), (i.parser = r);
        for (let c = 0; c < this.parsers.length; c++) {
          const u = this.parsers[c];
          u.parse &&
            u.parse &&
            (await ((h = u.testParse) == null
              ? void 0
              : h.call(u, n, e, this))) &&
            ((n = (await u.parse(n, e, this)) || n), (i.parser = u));
        }
        return n;
      })()),
      i
    );
  }
  async load(t, e) {
    this._parsersValidated || this._validateParsers();
    let i = 0;
    const n = {},
      r = ui(t),
      a = Xt(t, (u) => ({ alias: [u], src: u, data: {} })),
      h = a.length,
      c = a.map(async (u) => {
        const d = Ot.toAbsolute(u.src);
        if (!n[u.src])
          try {
            this.promiseCache[d] ||
              (this.promiseCache[d] = this._getLoadPromiseAndParser(d, u)),
              (n[u.src] = await this.promiseCache[d].promise),
              e && e(++i / h);
          } catch (o) {
            throw (
              (delete this.promiseCache[d],
              delete n[u.src],
              new Error(`[Loader.load] Failed to load ${d}.
${o}`))
            );
          }
      });
    return await Promise.all(c), r ? n[a[0].src] : n;
  }
  async unload(t) {
    const i = Xt(t, (n) => ({ alias: [n], src: n })).map(async (n) => {
      var h, c;
      const r = Ot.toAbsolute(n.src),
        a = this.promiseCache[r];
      if (a) {
        const u = await a.promise;
        delete this.promiseCache[r],
          await ((c = (h = a.parser) == null ? void 0 : h.unload) == null
            ? void 0
            : c.call(h, u, n, this));
      }
    });
    await Promise.all(i);
  }
  _validateParsers() {
    (this._parsersValidated = !0),
      (this._parserHash = this._parsers
        .filter((t) => t.name)
        .reduce(
          (t, e) => (
            e.name
              ? t[e.name] && At(`[Assets] loadParser name conflict "${e.name}"`)
              : At("[Assets] loadParser should have a name"),
            { ...t, [e.name]: e }
          ),
          {},
        ));
  }
}
function Pe(s, t) {
  if (Array.isArray(t)) {
    for (const e of t) if (s.startsWith(`data:${e}`)) return !0;
    return !1;
  }
  return s.startsWith(`data:${t}`);
}
function Me(s, t) {
  const e = s.split("?")[0],
    i = Ot.extname(e).toLowerCase();
  return Array.isArray(t) ? t.includes(i) : i === t;
}
const Rc = ".json",
  Qc = "application/json",
  Oc = {
    extension: { type: z.LoadParser, priority: oe.Low },
    name: "loadJson",
    test(s) {
      return Pe(s, Qc) || Me(s, Rc);
    },
    async load(s) {
      return await (await mt.get().fetch(s)).json();
    },
  },
  Uc = ".txt",
  Fc = "text/plain",
  Gc = {
    name: "loadTxt",
    extension: { type: z.LoadParser, priority: oe.Low, name: "loadTxt" },
    test(s) {
      return Pe(s, Fc) || Me(s, Uc);
    },
    async load(s) {
      return await (await mt.get().fetch(s)).text();
    },
  },
  zc = [
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
  Nc = [".ttf", ".otf", ".woff", ".woff2"],
  Hc = ["font/ttf", "font/otf", "font/woff", "font/woff2"],
  Lc = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function Xc(s) {
  const t = Ot.extname(s),
    n = Ot.basename(s, t)
      .replace(/(-|_)/g, " ")
      .toLowerCase()
      .split(" ")
      .map((h) => h.charAt(0).toUpperCase() + h.slice(1));
  let r = n.length > 0;
  for (const h of n)
    if (!h.match(Lc)) {
      r = !1;
      break;
    }
  let a = n.join(" ");
  return r || (a = `"${a.replace(/[\\"]/g, "\\$&")}"`), a;
}
const Vc = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function jc(s) {
  return Vc.test(s) ? s : encodeURI(s);
}
const Yc = {
  extension: { type: z.LoadParser, priority: oe.Low },
  name: "loadWebFont",
  test(s) {
    return Pe(s, Hc) || Me(s, Nc);
  },
  async load(s, t) {
    var i, n, r;
    const e = mt.get().getFontFaceSet();
    if (e) {
      const a = [],
        h = ((i = t.data) == null ? void 0 : i.family) ?? Xc(s),
        c = ((r = (n = t.data) == null ? void 0 : n.weights) == null
          ? void 0
          : r.filter((d) => zc.includes(d))) ?? ["normal"],
        u = t.data ?? {};
      for (let d = 0; d < c.length; d++) {
        const o = c[d],
          l = new FontFace(h, `url(${jc(s)})`, { ...u, weight: o });
        await l.load(), e.add(l), a.push(l);
      }
      return (
        pt.set(`${h}-and-url`, { url: s, fontFaces: a }),
        a.length === 1 ? a[0] : a
      );
    }
    return (
      At("[loadWebFont] FontFace API is not supported. Skipping loading font"),
      null
    );
  },
  unload(s) {
    (Array.isArray(s) ? s : [s]).forEach((t) => {
      pt.remove(`${t.family}-and-url`), mt.get().getFontFaceSet().delete(t);
    });
  },
};
function Os(s, t = 1) {
  var i;
  const e = (i = _e.RETINA_PREFIX) == null ? void 0 : i.exec(s);
  return e ? parseFloat(e[1]) : t;
}
function Us(s, t, e) {
  (s.label = e), (s._sourceOrigin = e);
  const i = new q({ source: s, label: e }),
    n = () => {
      delete t.promiseCache[e], pt.has(e) && pt.remove(e);
    };
  return (
    i.source.once("destroy", () => {
      t.promiseCache[e] &&
        (At(
          "[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource.",
        ),
        n());
    }),
    i.once("destroy", () => {
      s.destroyed ||
        (At(
          "[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture.",
        ),
        n());
    }),
    i
  );
}
const Wc = ".svg",
  qc = "image/svg+xml",
  Kc = {
    extension: { type: z.LoadParser, priority: oe.Low, name: "loadSVG" },
    name: "loadSVG",
    config: { crossOrigin: "anonymous", parseAsGraphicsContext: !1 },
    test(s) {
      return Pe(s, qc) || Me(s, Wc);
    },
    async load(s, t, e) {
      var i;
      return (((i = t.data) == null ? void 0 : i.parseAsGraphicsContext) ??
        this.config.parseAsGraphicsContext)
        ? Zc(s)
        : Jc(s, t, e, this.config.crossOrigin);
    },
    unload(s) {
      s.destroy(!0);
    },
  };
async function Jc(s, t, e, i) {
  var g, m, x;
  const r = await (await mt.get().fetch(s)).blob(),
    a = URL.createObjectURL(r),
    h = new Image();
  (h.src = a), (h.crossOrigin = i), await h.decode(), URL.revokeObjectURL(a);
  const c = document.createElement("canvas"),
    u = c.getContext("2d"),
    d = ((g = t.data) == null ? void 0 : g.resolution) || Os(s),
    o = ((m = t.data) == null ? void 0 : m.width) ?? h.width,
    l = ((x = t.data) == null ? void 0 : x.height) ?? h.height;
  (c.width = o * d), (c.height = l * d), u.drawImage(h, 0, 0, o * d, l * d);
  const { parseAsGraphicsContext: A, ...f } = t.data ?? {},
    p = new ge({
      resource: c,
      alphaMode: "premultiply-alpha-on-upload",
      resolution: d,
      ...f,
    });
  return Us(p, e, s);
}
async function Zc(s) {
  const e = await (await mt.get().fetch(s)).text(),
    i = new zt();
  return i.svg(e), i;
}
const $c = `(function () {
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
let be = null,
  ps = class {
    constructor() {
      be ||
        (be = URL.createObjectURL(
          new Blob([$c], { type: "application/javascript" }),
        )),
        (this.worker = new Worker(be));
    }
  };
ps.revokeObjectURL = function () {
  be && (URL.revokeObjectURL(be), (be = null));
};
const tA = `(function () {
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
let ve = null;
class va {
  constructor() {
    ve ||
      (ve = URL.createObjectURL(
        new Blob([tA], { type: "application/javascript" }),
      )),
      (this.worker = new Worker(ve));
  }
}
va.revokeObjectURL = function () {
  ve && (URL.revokeObjectURL(ve), (ve = null));
};
let Jn = 0,
  Wi;
class eA {
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
          const { worker: e } = new ps();
          e.addEventListener("message", (i) => {
            e.terminate(), ps.revokeObjectURL(), t(i.data);
          });
        })),
        this._isImageBitmapSupported);
  }
  loadImageBitmap(t, e) {
    var i;
    return this._run("loadImageBitmap", [
      t,
      (i = e == null ? void 0 : e.data) == null ? void 0 : i.alphaMode,
    ]);
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0);
  }
  _getWorker() {
    Wi === void 0 && (Wi = navigator.hardwareConcurrency || 4);
    let t = this._workerPool.pop();
    return (
      !t &&
        this._createdWorkers < Wi &&
        (this._createdWorkers++,
        (t = new va().worker),
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
    const i = new Promise((n, r) => {
      this._queue.push({ id: t, arguments: e, resolve: n, reject: r });
    });
    return this._next(), i;
  }
  _next() {
    if (!this._queue.length) return;
    const t = this._getWorker();
    if (!t) return;
    const e = this._queue.pop(),
      i = e.id;
    (this._resolveHash[Jn] = { resolve: e.resolve, reject: e.reject }),
      t.postMessage({ data: e.arguments, uuid: Jn++, id: i });
  }
}
const Zn = new eA(),
  iA = [".jpeg", ".jpg", ".png", ".webp", ".avif"],
  sA = ["image/jpeg", "image/png", "image/webp", "image/avif"];
async function nA(s, t) {
  var n;
  const e = await mt.get().fetch(s);
  if (!e.ok)
    throw new Error(
      `[loadImageBitmap] Failed to fetch ${s}: ${e.status} ${e.statusText}`,
    );
  const i = await e.blob();
  return ((n = t == null ? void 0 : t.data) == null ? void 0 : n.alphaMode) ===
    "premultiplied-alpha"
    ? createImageBitmap(i, { premultiplyAlpha: "none" })
    : createImageBitmap(i);
}
const Ea = {
    name: "loadTextures",
    extension: { type: z.LoadParser, priority: oe.High, name: "loadTextures" },
    config: {
      preferWorkers: !0,
      preferCreateImageBitmap: !0,
      crossOrigin: "anonymous",
    },
    test(s) {
      return Pe(s, sA) || Me(s, iA);
    },
    async load(s, t, e) {
      var r;
      let i = null;
      globalThis.createImageBitmap && this.config.preferCreateImageBitmap
        ? this.config.preferWorkers && (await Zn.isImageBitmapSupported())
          ? (i = await Zn.loadImageBitmap(s, t))
          : (i = await nA(s, t))
        : (i = await new Promise((a, h) => {
            (i = new Image()),
              (i.crossOrigin = this.config.crossOrigin),
              (i.src = s),
              i.complete
                ? a(i)
                : ((i.onload = () => {
                    a(i);
                  }),
                  (i.onerror = h));
          }));
      const n = new ge({
        resource: i,
        alphaMode: "premultiply-alpha-on-upload",
        resolution: ((r = t.data) == null ? void 0 : r.resolution) || Os(s),
        ...t.data,
      });
      return Us(n, e, s);
    },
    unload(s) {
      s.destroy(!0);
    },
  },
  Sa = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"],
  rA = Sa.map((s) => `video/${s.substring(1)}`);
function aA(s, t, e) {
  e === void 0 && !t.startsWith("data:")
    ? (s.crossOrigin = hA(t))
    : e !== !1 && (s.crossOrigin = typeof e == "string" ? e : "anonymous");
}
function oA(s) {
  return new Promise((t, e) => {
    s.addEventListener("canplaythrough", i),
      s.addEventListener("error", n),
      s.load();
    function i() {
      r(), t();
    }
    function n(a) {
      r(), e(a);
    }
    function r() {
      s.removeEventListener("canplaythrough", i),
        s.removeEventListener("error", n);
    }
  });
}
function hA(s, t = globalThis.location) {
  if (s.startsWith("data:")) return "";
  t || (t = globalThis.location);
  const e = new URL(s, document.baseURI);
  return e.hostname !== t.hostname ||
    e.port !== t.port ||
    e.protocol !== t.protocol
    ? "anonymous"
    : "";
}
const lA = {
    name: "loadVideo",
    extension: { type: z.LoadParser, name: "loadVideo" },
    test(s) {
      const t = Pe(s, rA),
        e = Me(s, Sa);
      return t || e;
    },
    async load(s, t, e) {
      var c, u;
      const i = {
          ...Ne.defaultOptions,
          resolution: ((c = t.data) == null ? void 0 : c.resolution) || Os(s),
          alphaMode:
            ((u = t.data) == null ? void 0 : u.alphaMode) || (await Tr()),
          ...t.data,
        },
        n = document.createElement("video"),
        r = {
          preload: i.autoLoad !== !1 ? "auto" : void 0,
          "webkit-playsinline": i.playsinline !== !1 ? "" : void 0,
          playsinline: i.playsinline !== !1 ? "" : void 0,
          muted: i.muted === !0 ? "" : void 0,
          loop: i.loop === !0 ? "" : void 0,
          autoplay: i.autoPlay !== !1 ? "" : void 0,
        };
      Object.keys(r).forEach((d) => {
        const o = r[d];
        o !== void 0 && n.setAttribute(d, o);
      }),
        i.muted === !0 && (n.muted = !0),
        aA(n, s, i.crossorigin);
      const a = document.createElement("source");
      let h;
      if (s.startsWith("data:")) h = s.slice(5, s.indexOf(";"));
      else if (!s.startsWith("blob:")) {
        const d = s
          .split("?")[0]
          .slice(s.lastIndexOf(".") + 1)
          .toLowerCase();
        h = Ne.MIME_TYPES[d] || `video/${d}`;
      }
      return (
        (a.src = s),
        h && (a.type = h),
        new Promise((d) => {
          const o = async () => {
            const l = new Ne({ ...i, resource: n });
            n.removeEventListener("canplay", o),
              t.data.preload && (await oA(n)),
              d(Us(l, e, s));
          };
          n.addEventListener("canplay", o), n.appendChild(a);
        })
      );
    },
    unload(s) {
      s.destroy(!0);
    },
  },
  Ba = {
    extension: { type: z.ResolveParser, name: "resolveTexture" },
    test: Ea.test,
    parse: (s) => {
      var t;
      return {
        resolution: parseFloat(
          ((t = _e.RETINA_PREFIX.exec(s)) == null ? void 0 : t[1]) ?? "1",
        ),
        format: s.split(".").pop(),
        src: s,
      };
    },
  },
  cA = {
    extension: { type: z.ResolveParser, priority: -2, name: "resolveJson" },
    test: (s) => _e.RETINA_PREFIX.test(s) && s.endsWith(".json"),
    parse: Ba.parse,
  };
class AA {
  constructor() {
    (this._detections = []),
      (this._initialized = !1),
      (this.resolver = new _e()),
      (this.loader = new kc()),
      (this.cache = pt),
      (this._backgroundLoader = new Ec(this.loader)),
      (this._backgroundLoader.active = !0),
      this.reset();
  }
  async init(t = {}) {
    var r, a;
    if (this._initialized) {
      At(
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
      let h = t.manifest;
      typeof h == "string" && (h = await this.load(h)),
        this.resolver.addManifest(h);
    }
    const e = ((r = t.texturePreference) == null ? void 0 : r.resolution) ?? 1,
      i = typeof e == "number" ? [e] : e,
      n = await this._detectFormats({
        preferredFormats: (a = t.texturePreference) == null ? void 0 : a.format,
        skipDetections: t.skipDetections,
        detections: this._detections,
      });
    this.resolver.prefer({ params: { format: n, resolution: i } }),
      t.preferences && this.setPreferences(t.preferences);
  }
  add(t) {
    this.resolver.add(t);
  }
  async load(t, e) {
    this._initialized || (await this.init());
    const i = ui(t),
      n = Xt(t).map((h) => {
        if (typeof h != "string") {
          const c = this.resolver.getAlias(h);
          return (
            c.some((u) => !this.resolver.hasKey(u)) && this.add(h),
            Array.isArray(c) ? c[0] : c
          );
        }
        return this.resolver.hasKey(h) || this.add({ alias: h, src: h }), h;
      }),
      r = this.resolver.resolve(n),
      a = await this._mapLoadToResolve(r, e);
    return i ? a[n[0]] : a;
  }
  addBundle(t, e) {
    this.resolver.addBundle(t, e);
  }
  async loadBundle(t, e) {
    this._initialized || (await this.init());
    let i = !1;
    typeof t == "string" && ((i = !0), (t = [t]));
    const n = this.resolver.resolveBundle(t),
      r = {},
      a = Object.keys(n);
    let h = 0,
      c = 0;
    const u = () => {
        e == null || e(++h / c);
      },
      d = a.map((o) => {
        const l = n[o];
        return (
          (c += Object.keys(l).length),
          this._mapLoadToResolve(l, u).then((A) => {
            r[o] = A;
          })
        );
      });
    return await Promise.all(d), i ? r[t[0]] : r;
  }
  async backgroundLoad(t) {
    this._initialized || (await this.init()), typeof t == "string" && (t = [t]);
    const e = this.resolver.resolve(t);
    this._backgroundLoader.add(Object.values(e));
  }
  async backgroundLoadBundle(t) {
    this._initialized || (await this.init()), typeof t == "string" && (t = [t]);
    const e = this.resolver.resolveBundle(t);
    Object.values(e).forEach((i) => {
      this._backgroundLoader.add(Object.values(i));
    });
  }
  reset() {
    this.resolver.reset(),
      this.loader.reset(),
      this.cache.reset(),
      (this._initialized = !1);
  }
  get(t) {
    if (typeof t == "string") return pt.get(t);
    const e = {};
    for (let i = 0; i < t.length; i++) e[i] = pt.get(t[i]);
    return e;
  }
  async _mapLoadToResolve(t, e) {
    const i = [...new Set(Object.values(t))];
    this._backgroundLoader.active = !1;
    const n = await this.loader.load(i, e);
    this._backgroundLoader.active = !0;
    const r = {};
    return (
      i.forEach((a) => {
        const h = n[a.src],
          c = [a.src];
        a.alias && c.push(...a.alias),
          c.forEach((u) => {
            r[u] = h;
          }),
          pt.set(c, h);
      }),
      r
    );
  }
  async unload(t) {
    this._initialized || (await this.init());
    const e = Xt(t).map((n) => (typeof n != "string" ? n.src : n)),
      i = this.resolver.resolve(e);
    await this._unloadFromResolved(i);
  }
  async unloadBundle(t) {
    this._initialized || (await this.init()), (t = Xt(t));
    const e = this.resolver.resolveBundle(t),
      i = Object.keys(e).map((n) => this._unloadFromResolved(e[n]));
    await Promise.all(i);
  }
  async _unloadFromResolved(t) {
    const e = Object.values(t);
    e.forEach((i) => {
      pt.remove(i.src);
    }),
      await this.loader.unload(e);
  }
  async _detectFormats(t) {
    let e = [];
    t.preferredFormats &&
      (e = Array.isArray(t.preferredFormats)
        ? t.preferredFormats
        : [t.preferredFormats]);
    for (const i of t.detections)
      t.skipDetections || (await i.test())
        ? (e = await i.add(e))
        : t.skipDetections || (e = await i.remove(e));
    return (e = e.filter((i, n) => e.indexOf(i) === n)), e;
  }
  get detections() {
    return this._detections;
  }
  setPreferences(t) {
    this.loader.parsers.forEach((e) => {
      e.config &&
        Object.keys(e.config)
          .filter((i) => i in t)
          .forEach((i) => {
            e.config[i] = t[i];
          });
    });
  }
}
const Ge = new AA();
Bt.handleByList(z.LoadParser, Ge.loader.parsers)
  .handleByList(z.ResolveParser, Ge.resolver.parsers)
  .handleByList(z.CacheParser, Ge.cache.parsers)
  .handleByList(z.DetectionParser, Ge.detections);
Bt.add(Sc, Ic, Bc, Dc, Pc, Mc, Tc, Oc, Gc, Yc, Kc, Ea, lA, vc, bc, Ba, cA);
const $n = {
  loader: z.LoadParser,
  resolver: z.ResolveParser,
  cache: z.CacheParser,
  detection: z.DetectionParser,
};
Bt.handle(
  z.Asset,
  (s) => {
    const t = s.ref;
    Object.entries($n)
      .filter(([e]) => !!t[e])
      .forEach(([e, i]) =>
        Bt.add(Object.assign(t[e], { extension: t[e].extension ?? i })),
      );
  },
  (s) => {
    const t = s.ref;
    Object.keys($n)
      .filter((e) => !!t[e])
      .forEach((e) => Bt.remove(t[e]));
  },
);
class Pt extends Ss {
  constructor(t) {
    t instanceof zt && (t = { context: t });
    const { context: e, roundPixels: i, ...n } = t || {};
    super({ label: "Graphics", ...n }),
      (this.renderPipeId = "graphics"),
      e ? (this._context = e) : (this._context = this._ownedContext = new zt()),
      this._context.on("update", this.onViewUpdate, this),
      (this.allowChildren = !1),
      (this.roundPixels = i ?? !1);
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
      ? new Pt(this._context.clone())
      : ((this._ownedContext = null), new Pt(this._context));
  }
  lineStyle(t, e, i) {
    J(
      ht,
      "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.",
    );
    const n = {};
    return (
      t && (n.width = t),
      e && (n.color = e),
      i && (n.alpha = i),
      (this.context.strokeStyle = n),
      this
    );
  }
  beginFill(t, e) {
    J(
      ht,
      "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.",
    );
    const i = {};
    return (
      t !== void 0 && (i.color = t),
      e !== void 0 && (i.alpha = e),
      (this.context.fillStyle = i),
      this
    );
  }
  endFill() {
    J(
      ht,
      "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.",
    ),
      this.context.fill();
    const t = this.context.strokeStyle;
    return (
      (t.width !== zt.defaultStrokeStyle.width ||
        t.color !== zt.defaultStrokeStyle.color ||
        t.alpha !== zt.defaultStrokeStyle.alpha) &&
        this.context.stroke(),
      this
    );
  }
  drawCircle(...t) {
    return (
      J(ht, "Graphics#drawCircle has been renamed to Graphics#circle"),
      this._callContextMethod("circle", t)
    );
  }
  drawEllipse(...t) {
    return (
      J(ht, "Graphics#drawEllipse has been renamed to Graphics#ellipse"),
      this._callContextMethod("ellipse", t)
    );
  }
  drawPolygon(...t) {
    return (
      J(ht, "Graphics#drawPolygon has been renamed to Graphics#poly"),
      this._callContextMethod("poly", t)
    );
  }
  drawRect(...t) {
    return (
      J(ht, "Graphics#drawRect has been renamed to Graphics#rect"),
      this._callContextMethod("rect", t)
    );
  }
  drawRoundedRect(...t) {
    return (
      J(ht, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),
      this._callContextMethod("roundRect", t)
    );
  }
  drawStar(...t) {
    return (
      J(ht, "Graphics#drawStar has been renamed to Graphics#star"),
      this._callContextMethod("star", t)
    );
  }
}
class pe extends Y {
  constructor(...t) {
    let e = t[0];
    Array.isArray(t[0]) && (e = { textures: t[0], autoUpdate: t[1] });
    const {
        animationSpeed: i = 1,
        autoPlay: n = !1,
        autoUpdate: r = !0,
        loop: a = !0,
        onComplete: h = null,
        onFrameChange: c = null,
        onLoop: u = null,
        textures: d,
        updateAnchor: o = !1,
        ...l
      } = e,
      [A] = d;
    super({ ...l, texture: A instanceof q ? A : A.texture }),
      (this._textures = null),
      (this._durations = null),
      (this._autoUpdate = r),
      (this._isConnectedToTicker = !1),
      (this.animationSpeed = i),
      (this.loop = a),
      (this.updateAnchor = o),
      (this.onComplete = h),
      (this.onFrameChange = c),
      (this.onLoop = u),
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
        (re.shared.remove(this.update, this),
        (this._isConnectedToTicker = !1)));
  }
  play() {
    this._playing ||
      ((this._playing = !0),
      this._autoUpdate &&
        !this._isConnectedToTicker &&
        (re.shared.add(this.update, this, Ai.HIGH),
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
      i = this.animationSpeed * e,
      n = this.currentFrame;
    if (this._durations !== null) {
      let r = (this._currentTime % 1) * this._durations[this.currentFrame];
      for (r += (i / 60) * 1e3; r < 0; )
        this._currentTime--, (r += this._durations[this.currentFrame]);
      const a = Math.sign(this.animationSpeed * e);
      for (
        this._currentTime = Math.floor(this._currentTime);
        r >= this._durations[this.currentFrame];

      )
        (r -= this._durations[this.currentFrame] * a), (this._currentTime += a);
      this._currentTime += r / this._durations[this.currentFrame];
    } else this._currentTime += i;
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
    for (let i = 0; i < t.length; ++i) e.push(q.from(t[i]));
    return new pe(e);
  }
  static fromImages(t) {
    const e = [];
    for (let i = 0; i < t.length; ++i) e.push(q.from(t[i]));
    return new pe(e);
  }
  get totalFrames() {
    return this._textures.length;
  }
  get textures() {
    return this._textures;
  }
  set textures(t) {
    if (t[0] instanceof q) (this._textures = t), (this._durations = null);
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
        ? (re.shared.remove(this.update, this),
          (this._isConnectedToTicker = !1))
        : this._autoUpdate &&
          !this._isConnectedToTicker &&
          this._playing &&
          (re.shared.add(this.update, this), (this._isConnectedToTicker = !0)));
  }
}
class Ia extends Ss {
  constructor(t, e) {
    const {
      text: i,
      resolution: n,
      style: r,
      anchor: a,
      width: h,
      height: c,
      roundPixels: u,
      ...d
    } = t;
    super({ ...d }),
      (this.batched = !0),
      (this._resolution = null),
      (this._autoResolution = !0),
      (this._didTextUpdate = !0),
      (this._styleClass = e),
      (this.text = i ?? ""),
      (this.style = r),
      (this.resolution = n ?? null),
      (this.allowChildren = !1),
      (this._anchor = new Dt({
        _onUpdate: () => {
          this.onViewUpdate();
        },
      })),
      a && (this.anchor = a),
      (this.roundPixels = u ?? !1),
      h !== void 0 && (this.width = h),
      c !== void 0 && (this.height = c);
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
      i = this.bounds.height,
      n = -e * this.anchor.x;
    let r = 0;
    return (
      t.x >= n &&
      t.x <= n + e &&
      ((r = -i * this.anchor.y), t.y >= r && t.y <= r + i)
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
function _a(s, t) {
  let e = s[0] ?? {};
  return (
    (typeof e == "string" || s[1]) &&
      (J(ht, `use new ${t}({ text: "hi!", style }) instead`),
      (e = { text: e, style: s[1] })),
    e
  );
}
class Be extends Ia {
  constructor(...t) {
    const e = _a(t, "Text");
    super(e, Ut), (this.renderPipeId = "text");
  }
  updateBounds() {
    const t = this._bounds,
      e = this._anchor,
      i = fs.measureText(this._text, this._style),
      { width: n, height: r } = i;
    (t.minX = -e._x * n),
      (t.maxX = t.minX + n),
      (t.minY = -e._y * r),
      (t.maxY = t.minY + r);
  }
}
class uA extends Ia {
  constructor(...t) {
    var e;
    const i = _a(t, "BitmapText");
    i.style ?? (i.style = i.style || {}),
      (e = i.style).fill ?? (e.fill = 16777215),
      super(i, Ut),
      (this.renderPipeId = "bitmapText");
  }
  updateBounds() {
    const t = this._bounds,
      e = this._anchor,
      i = gs.measureText(this.text, this._style),
      n = i.scale,
      r = i.offsetY * n;
    let a = i.width * n,
      h = i.height * n;
    const c = this._style._stroke;
    c && ((a += c.width), (h += c.width)),
      (t.minX = -e._x * a),
      (t.maxX = t.minX + a),
      (t.minY = -e._y * (h + r)),
      (t.maxY = t.minY + h);
  }
  set resolution(t) {
    t !== null &&
      At(
        "[BitmapText] dynamically updating the resolution is not supported. Resolution should be managed by the BitmapFont.",
      );
  }
  get resolution() {
    return this._resolution;
  }
}
Bt.add(Fa, Ga);
class V {
  constructor(t) {
    w(this, "app");
    w(this, "baseStage");
    (this.app = t),
      (this.baseStage = new gt()),
      t.stage.addChild(this.baseStage);
  }
  close() {
    this.baseStage.removeFromParent();
  }
  update() {}
}
w(V, "WIDTH", 500), w(V, "HEIGHT", 400);
let Zt = null;
function tr(s) {
  Zt && Zt.deactivate(), (Zt = s);
}
function dA() {
  Zt && (Zt.deactivate(), (Zt = null));
}
function xe(s) {
  return Zt ? Zt.getActivatedKeysStack().some((e) => Pa(e) === s) : !1;
}
function fA() {
  if (!Zt) return null;
  const s = Zt.getActivatedKeysStack(),
    t = s[s.length - 1];
  return t ? Pa(t) : null;
}
function Pa(s) {
  switch (s) {
    case "ArrowUp":
    case "w":
    case "KeyW":
    case "dpad:up":
      return "UP";
    case "ArrowDown":
    case "s":
    case "KeyS":
    case "dpad:down":
      return "DOWN";
    case "ArrowLeft":
    case "a":
    case "KeyA":
    case "dpad:left":
      return "LEFT";
    case "ArrowRight":
    case "d":
    case "KeyD":
    case "dpad:right":
      return "RIGHT";
    case "Space":
    case " ":
    case "Enter":
    case "button:a":
      return "ACTION";
    case "KeyZ":
    case "button:z":
      return "MENU";
    default:
      return null;
  }
}
const ct = {
  UP: "NONE",
  DOWN: "NONE",
  LEFT: "NONE",
  RIGHT: "NONE",
  ACTION: "NONE",
  MENU: "NONE",
};
function we(s, t) {
  t
    ? ct[s] === "NONE"
      ? (ct[s] = "PRESSED")
      : ct[s] === "PRESSED" && (ct[s] = "HOLD")
    : ct[s] === "PRESSED" || ct[s] === "HOLD"
      ? (ct[s] = "RELEASED")
      : (ct[s] = "NONE");
}
function gA() {
  we("UP", xe("UP")),
    we("DOWN", xe("DOWN")),
    we("LEFT", xe("LEFT")),
    we("RIGHT", xe("RIGHT")),
    we("ACTION", xe("ACTION")),
    we("MENU", xe("MENU"));
}
class pA {
  constructor() {
    w(this, "activatedKeysStack", []);
    w(this, "boundKeyDownHandler");
    w(this, "boundKeyUpHandler");
    (this.boundKeyDownHandler = this.handleKeyDown.bind(this)),
      (this.boundKeyUpHandler = this.handleKeyUp.bind(this));
  }
  activate() {
    (this.activatedKeysStack = []),
      document.addEventListener("keydown", this.boundKeyDownHandler),
      document.addEventListener("keyup", this.boundKeyUpHandler);
  }
  deactivate() {
    document.removeEventListener("keydown", this.boundKeyDownHandler),
      document.removeEventListener("keyup", this.boundKeyUpHandler),
      (this.activatedKeysStack = []);
  }
  getActivatedKeysStack() {
    return [...this.activatedKeysStack];
  }
  isValidKey(t) {
    return [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "KeyW",
      "KeyS",
      "KeyA",
      "KeyD",
      "w",
      "s",
      "a",
      "d",
      "Enter",
      "Space",
      " ",
      "KeyZ",
      "z",
    ].includes(t);
  }
  handleKeyDown(t) {
    t.preventDefault(),
      this.isValidKey(t.code) &&
        (this.activatedKeysStack.includes(t.code) ||
          (this.activatedKeysStack = [t.code, ...this.activatedKeysStack]));
  }
  handleKeyUp(t) {
    t.preventDefault(),
      this.isValidKey(t.code) &&
        (this.activatedKeysStack = this.activatedKeysStack.filter(
          (e) => e !== t.code,
        ));
  }
}
class mA {
  constructor() {
    w(this, "activatedKeysStack", []);
    w(this, "renderContainer", document.createElement("div"));
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
  getActivatedKeysStack() {
    return [...this.activatedKeysStack];
  }
  handleKeyDown(t) {
    this.activatedKeysStack.includes(t) ||
      (this.activatedKeysStack = [t, ...this.activatedKeysStack]);
  }
  handleKeyUp(t) {
    this.activatedKeysStack = this.activatedKeysStack.filter((e) => e !== t);
  }
  renderDpad() {
    let t = !1;
    const e = "dpad-highlight",
      i = (l) => `dpad-direction-${l.split(":")[1]}`;
    let n = null;
    const r = () => {
        var l;
        n &&
          (this.handleKeyUp(n),
          (l = document.querySelector(`.${i(n)}`)) == null ||
            l.classList.remove(e),
          (n = null));
      },
      a = (l) => {
        var P;
        l.preventDefault(), (t = !0);
        const A = h.getBoundingClientRect(),
          f = A.left + A.width / 2,
          p = A.top + A.height / 2,
          g = "touches" in l ? l.touches[0].clientX : l.clientX,
          m = "touches" in l ? l.touches[0].clientY : l.clientY,
          x = g - f,
          b = m - p;
        if (Math.sqrt(x * x + b * b) < 20) {
          r();
          return;
        }
        const D = (Math.atan2(b, x) * 180) / Math.PI;
        let _;
        D < -135 || D > 135
          ? (_ = "dpad:left")
          : D < -45
            ? (_ = "dpad:up")
            : D < 45
              ? (_ = "dpad:right")
              : (_ = "dpad:down"),
          _ !== n &&
            (r(),
            (n = _),
            this.handleKeyDown(_),
            (P = document.querySelector(`.${i(_)}`)) == null ||
              P.classList.add(e));
      },
      h = document.createElement("div");
    h.classList.add("dpad-container");
    const c = document.createElement("button");
    c.classList.add("dpad-button"), h.appendChild(c);
    const u = document.createElement("div");
    u.classList.add("dpad-circle"), c.appendChild(u);
    const d = document.createElement("div");
    d.classList.add("dpad-circle-inner"), u.appendChild(d);
    for (const l of ["up", "down", "left", "right"]) {
      const A = document.createElement("div");
      A.classList.add("dpad-direction"),
        A.classList.add(i(`dpad:${l}`)),
        c.appendChild(A);
    }
    const o = () => {
      (t = !1), r();
    };
    c.addEventListener("mousedown", a),
      c.addEventListener("mousemove", (l) => {
        t && a(l);
      }),
      c.addEventListener("mouseleave", o),
      c.addEventListener("mouseup", o),
      c.addEventListener("touchstart", a),
      c.addEventListener("touchend", o),
      c.addEventListener("touchcancel", o),
      c.addEventListener("touchmove", (l) => {
        t && a(l);
      }),
      this.renderContainer.appendChild(h);
  }
  renderButton() {
    const t = "button-highlight",
      e = document.createElement("div");
    e.classList.add("button-container");
    const i = (n, r) => {
      const a = document.createElement("button");
      a.classList.add("button", `button-${n.split(":")[1]}`),
        (a.textContent = r);
      const h = () => {
          this.handleKeyDown(n), a.classList.add(t);
        },
        c = () => {
          this.handleKeyUp(n), a.classList.remove(t);
        };
      return (
        a.addEventListener("mousedown", h),
        a.addEventListener("mouseup", c),
        a.addEventListener("mouseleave", c),
        a.addEventListener("touchstart", h),
        a.addEventListener("touchend", c),
        a
      );
    };
    e.appendChild(i("button:a", "A")),
      e.appendChild(i("button:z", "Z")),
      this.renderContainer.appendChild(e);
  }
}
const yA = () => {
  if (typeof window < "u" && window.navigator) {
    const s = window.navigator.userAgent.toLowerCase();
    if (
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(s)
    )
      return "Mobile";
  }
  return "PC";
};
class xA {
  constructor() {
    w(this, "startTime");
    w(this, "elapsedTime");
    (this.startTime = 0), (this.elapsedTime = 0);
  }
  start() {
    this.startTime = performance.now();
  }
  stop() {
    this.elapsedTime = performance.now() - this.startTime;
  }
  getElapsedTime() {
    return this.elapsedTime;
  }
  getElapsedTimeInSeconds() {
    return this.elapsedTime / 1e3;
  }
  getElapsedTimeInMinutes() {
    return this.elapsedTime / 6e4;
  }
}
function* j(s) {
  let t = 0;
  for (; t < s; ) yield, t++;
}
const wA =
    "data:image/png;base64,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",
  CA =
    "data:image/png;base64,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",
  bA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAACixJREFUeJztnV+IXUcdx7/ZLmmKMckabaxCtYuCusQaX0TEUEgrVKRNW0GEWoOIopb4klpBqsY8aHVfDFawiI2xIKKtMQiLtYFSkOKDxBqigthgQWOr6e6mCiVsNj7M+Z31/O6dO3POb+b82f1+Xu7ec885M3uT+ex3Zs6cswkts/SJo1f+//307jclOe+lp89W3m/eO5fkvH1n5czfxm7f8YODm9oof6qNQsj6pZX/pcCaeVIZR5AWmPq8Q0e+l9wmooGIiewGonm6JbeJaCBiIpuBaJ5+kctENBAxkdxANE+/SW0iGoiYmO66AiFonn5DAxETyTIQs4+Ntn/PVFmIBiImepuBNop5hg4NREyYMxCzT1qGloVoIGKidxmoK/NsVONZoYGIid4ZiLSLGFeybN0sRAMRE40NlKv3FWL1xWUAwNS125Ps19fs09d6aWggYqI3GSi2xa2+sAQgwkCR+xEbNBAx0bmBJKuQKttvdQt4lxfGm/nJIx8de9zND/y4UXlNe2M0EDFR20Bd9b5iM9JQei+xPHXii+6HE9XtN+3/BoDuf08aiJjoPgMVvaWuW1KI2HEl4fKN1wMArnr2eVO5t3/v6wCA5QUXSeR78t2VQ1O33nWhgYiJzgwU6n2lasGpzhs7riTnt5YXQpvIZ/Art+wGAKz++gyA9CaigYiJaAN11fsKEdvCtRnIeOqOB9FAxETnvTArsdlC9sttIl1O0+yzuO9jAICZUz9KUp9V01n80EDEROsGip37St1r0eeV3ktozslaTipC9exqBJ4GIia6GwcayAh034kdmc51fRQNREwMvhdWl75cfxQ7R1W3N5Z77ktDAxET68ZAuc0ytWsHgP5fb5Qq68SOSNNAxET740CZe1+h8ZKyhRZGWV5YijouNdoUelxqMfI8ctzq/N3ufIceTVjLMDQQMbF+MlDRog/+0F08fOTaOybu/6Uzj1T2k97O1EJcC86VhaQeQ4EGIiYGY6DYK/COfnw/AGBxn8sEK0Um0PvLfkCRfYr9Hnjx5wCAI2fuqBwnWUVM11Zm+so9d1Xe+8wq+4XMmxoaiJgYjIFiVyHEZoiR/fa5l8Nw5kKgN1M3Mwmh30Mb5/DxxwCsjUQvL4w/TvYL1Ts1NBAxMRgDaaLv5jFfzUKx6ON85cTup9EZSihNEkCP/4T2k3Gv1NBAxMRgDaQpW1hhAt0ym47U+gyzosppaiJrvWLhylTSSwZrIN84jIzTpKZtE/kMEzJP3bXzVmggYiL6nsCpVqY2nUPSLaqctZbxGE+GqJsVYoktL5RtUtVPl7Nm6OpdPeoSepYGDURMDCYD6b/t0rJm4EZoF+fbncWONUcuA4bKk+uJ6o6U14UGIiYGYyCNzkAbnbZNJ9BAxERrBurLeiySFhqImBhsBiJ5iX2WKg1ETEQbSP4n9vVeiT6+8+DbK+//dfYdE/d/3dwfAQD33v+nbHWahNTXV8/Y+k3VnItrCg1ETPQmA8XOkekVpXItszDagicbRyPHybXJbRlp7VroyfVtWr9LT58FAGzeO2eo5Sg0EDHR3jiQWpPedFZer88StHliry3uC03rKyaS399noqmZrc0qFoAGIiZ6k4Fi0eaSK//une+m19Q12ly69+W7MtH3FyB2/Kcsr0ZdCRmhdQP5MkxdOLc2GV4TTQZBbzJQ3d6ZNpisHd+o1wfVXVe28tw/x26PzT5lubVKJUSRzEB170/sM04oG8lxer+Ra6Q3qIm2vNVdqfnKX9z3oY0ic5mb3/s2APYsSgMRE51loFS9Mb3+SV71HFlXzMzMAAAWF2Pvu9qM7Z99CQDw8mOzAIDp3e77FeNo9PdeN/sINBAxkS4DNbxDui8L+XpjPnN1tSrBh5gHvzvsXmcPdlcZNDdMCBqImOh8HEgbJXaEWcwkd+foW++rzDwdm6fuU5jrQgMRE715brwe34kdme67iVrjnMtcl575MwBgy+3vaaVYGoiY6DwDCbr35jORoI2kTaTvStG3XloqZp47Kj9Vtrf15EIaiJjojYEEaTGbt8nIrXu9+q7qSO7yd+POt17NM8LWJwEA07O3tFosDURMBA3U1UrUlS1vdq9F9rn6LdW/8TIHhhucmRY7Hm9pmzL7FL2vCw/tBgBMu6mwbM+J19BAxETvMpCPCw+9MHb7zs/tAgDMwLXI3Cba8tOHAQDXvOaaifudurITAPDumz+YtPxR84z/XtqCBiImvAYayl04pAW2ZaKQeYR9my64eiQqt2/mEWggYsKcgXI9vbgxRQttKxPlJpV5cs3K00DExIiBuso+qeZuFnf+w/1w0b10tV7MWl7IPNOzrwcQXt8l/56b7n6/+yDxilUaiJgYzDhQU8RIYiLryHVuk+XqbV317PMAgJUkZ1uDBiImGhsode8r99yNLxt1PZc2apxLxSfNzCOZyLceLHVvjAYiJrJnoLqmunzj9QDW/mZrQr2PWMpsdO4NxWs7RkptnK6hgYiJ0kBDmftKTZmNClIbKWScVEb14XvCQKosRAMRE40zkKyWWG9YjeQzzvRslqXpnUMDERO1DWSdswod7+t9CZIVcmcHIWgkRd97Vfr7lzmyJTTLQjQQMZFtHMh3v5+m2UkbR5sIGDvwCrzr/ur73z/YqHxNX64IjEX3xlKN+NNAxERvZuNDd+OonX20eXzbExkpF7mznmTOyw2zEA1ETEzHjkC3dbcHTbyJdjUrQIzU0EQ+Q4QyW+7eY1vQQMRE9gz0yi9+6woqe0vj0WbzZaE7z//E/XDevZx83+cBAMsLxQ5Nb8bhy0weM0k9Ts668tsyS+h7bBsaiJjoTS9M8N0HWkx0Eq7F3/abb7dTIWWmRWUkXY/Hr/tIZbsYMjWpTdf0mmkaiJjozEChXl3ojvU+9n/mZwCAE894Mk1myoxW4DNlXTPFZizZz/eUHt9MQN1npQo0EDGRzUC+u6jWnRPzmUiykNBaJlLsePWrKu+XXv5v1HFS3+O/OgUA2Hrg4Yn7p8o8qcfxaCBiIpuByozjezJh8XnsCHfoOejaBAc+cBMA4Ng3b3UbfOM8DdHlhbYLPkP959inKu9DRoolV/YRaCBiItpA5fhMwBjy+Uuf3jv28x1fO+kKTmQiPd5yzx++P/a4R75638TztoU21LZt2wAAFy9erGyvayTd+9Lm8Y30c2Uq6ZTaGSjWPNKyNEtfvg3AqIlyceALbpJs7gZ3LfNrr3tj1vKa4vu+Sh4/BABYvXO+srkr8wg0EDHRuBfmM06gHZX7pTKRZArJPsff+cnK+/XGlMdEbZunrE/Kk5GNx3TdVRJinpX7PgQA+Ovp05XP9+zZE3Uen4nKiiXORmfPufVdc8X7plno3+f/nqQ+x554qtFxp4vve4+YqNg+dejRsfvnMo9AAxETZQbyjcPopyiLeQRtnLKFNDTRwQ+71+NwWaavJuob8ly0qW/90r0v/t1ymUeggYiJ/wEUTAfeIA9sKQAAAABJRU5ErkJggg==",
  vA =
    "data:image/png;base64,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",
  EA =
    "data:image/png;base64,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",
  SA = "" + new URL("cat-monitor-cut-DYU3TNtg.png", import.meta.url).href,
  BA = "" + new URL("end-card-BjY7cNn3.png", import.meta.url).href,
  IA = "" + new URL("magic-square1-cut-CRLPw85W.png", import.meta.url).href,
  _A = "" + new URL("magic-square2-cut-DsEIi0Y_.png", import.meta.url).href,
  PA = "" + new URL("portable-game-cut1-Cz9wMrX1.png", import.meta.url).href,
  MA = "" + new URL("portable-game-cut2-BQHu02Oe.png", import.meta.url).href,
  TA = "" + new URL("table-cut-BKG2-9lq.png", import.meta.url).href,
  DA = "" + new URL("table-monitor-cut1-DWVl6NN9.png", import.meta.url).href,
  kA =
    "data:image/png;base64,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",
  RA =
    "data:image/png;base64,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",
  QA =
    "data:image/png;base64,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",
  OA =
    "data:image/png;base64,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",
  UA = "" + new URL("power-code-CPIqxji4.png", import.meta.url).href,
  FA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA3JJREFUeJztm81u00AQxzcupElBISJRVSEjIZ4CceDMqS/EmRfixJkTT8AJccFCUZRCGgmaFpJwGP+TeOxhP7wOkTz/i73eDzuZ38zurJOOOZDevnq68Wn/5sPXTlPPsq/kEDc5ZkX/liVLn/dPCuXpfEXXhydVzc30ZlV5PTYZSkDdAbjFuaWhqxk1G+Rf+WJNx7tbOumeJoX6+4+rH42TUZcIJSC0IyzPLf77u1ewN7MbImDcd7MFJwNEhJKgBPh22Pr8LZVXP+nIfRg+bitLMcDWP/tFFx48zB/slA6+JCgBrg25z3Nfd/VltJPk2p+3Q2zwjQlKgK2BZHlXn0Z5mQOTniVO/Xl7+Lyt/2jsR4ISIFVcjh5tjDHm9fNh0MC+83tT47z/MjfGGPPu6rrys7aegHv8Aiz/8lnR8qHzum9/XoblXWMAL+8RvDGmTIISIFUMEr8yLC/5qu94vAzLSzHB1l+SEoATHvV9fXbJksBQn7eVQ8ffi2mFWKAESBWST/G1/Cw/9jrV7WOXcT/EnJlh6hezSmk8SAmQKmxrcyk/5/2bigHS/gEIlZ6Xq/UEdHj05z7uuwaPlQPEGlf6PMgRWk/ANgZIa23I10dD1+62/QHf54HFeYyAlACc1J3HpVygtAdomadtMSg0F+DrCEgJwMnnH/RdjPtUjpX/Sz4InwZ5tnk71v4APiekBEgVjeX//X/n9a73j7U/oARIFU3n/7H2D3z7c7WegO3sj5xg2KOc4MWT6g7Hst/vO97Hb3ScL4vvCVpPgBgDsgm9C0wv6B1b3T25pvcQpfEWU3zEP6ZKSoBUka3J8mlejr3vH3sPUVoXfFpXWx5SAnCCqHg5MoXZIJvkTQZ3hY7HFgNK+xET/HqNSObRH1ICbA2y3IfSRZcunFH5f7/rk8rZdbfw3Da1ngDrL0QQC6A0IWgG50US6u75hf7OcGv53Ocxe0GS70NKgK2BjYT0ws3XJNXNCTBLcZ+3WR5SAlwb2kjIX7uXcofYMWC3tqf7+fo8lxLg20EiAdoRwa4LsUKKAdsVKJM0v/taHlICQjvaSOBKE6zNcUvy4WW+Vu+ZYr3rSi7U8pASUHcAkAC5EgElhmLA2tEWsDgUavnd/Vuu6P8c5URAEhkSAdzSUF2Ll+/fch3kH9rGyGRIim1pSa0n4C8Qvm9IWKNuDQAAAABJRU5ErkJggg==",
  GA =
    "data:image/png;base64,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",
  zA =
    "data:image/png;base64,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",
  NA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IArs4c6QAAAc5QTFRF9pmI82xg6E5A5Rwj3Rkd0BcWxBQRsBIK9I+x8GKS7EB66R5j2BtgwhhbrRRXiA5PzpPYumjIq0e8nCewjiSqex+iahuaShSMs53blXXNflfCZzq3XjWxUS2oRSegMRuSn6jaeYbLXGvAP1G1OUmrMD+fKDWTGiN+r7//kaf/c4/+Vnf8TmzvRV7eO1DOKjaxgdT6T8P3Kbb2A6n0A5vlAojRAne9AVebgN7qTdDhJsbaALzUAKzBAJenAIOPAGBkgMvETbasJqaaAJaIAIl7AHlrAGlcAE1ActVyQr1BK68rJZskCo8ICn4HBW8ADVMCxeGlrtWBnMxli8NKfLNCaJ84VYsvM2ke5u6c3Od11OFXzdw5wMozr7Qrnp0kgncX//Wd//F2/+5Y/+s7/dg1+8At+agl9X8X/+CC/9VP/8oo/8EH/7MA/6AA/48A/28A/8yA/7dN/6cm/5gA+4wA9XwA72wA5lEA/6uR/4pl/3BD/1ci9FEe5koZ2EMVvzYMvKqkoYh/jW5jeVVIbUxBXUA3TjQuPicj7u7u4ODgvb29np6edXV1YWFhQkJCISEhsL7FkKSueJCcYH2LVG56RVpkN0dPJjI4AAAA////V2RexgAAAJp0Uk5TAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4vC7tcAAADDSURBVFiF7ZY9CsMwDEZzUs8de4RA7HjUlStBs8hKLUVVCVQPvBj5gX8+4WVJkiS5JaAkSgCwI7XORu8nCqcAoCNNAdUJii8JdgVxgnUthRdLW6C6GEFBNIdIdTGCO7wDOrRaZ4PqYgT0RObLW6O6KAGFdQ7VxQj4NV5Ko0sghWlDeKxMaTQJxjBtb5RhcgvGlnYIDLfgEtDh8Og+ED738RZcAqmlPRE+Z+qJJsHY0pxZuCSQl/xGoP/gnH5y3ILkj3kBzsejyt8S2c0AAAAASUVORK5CYII=",
  HA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IArs4c6QAAAc5QTFRF9pmI82xg6E5A5Rwj3Rkd0BcWxBQRsBIK9I+x8GKS7EB66R5j2BtgwhhbrRRXiA5PzpPYumjIq0e8nCewjiSqex+iahuaShSMs53blXXNflfCZzq3XjWxUS2oRSegMRuSn6jaeYbLXGvAP1G1OUmrMD+fKDWTGiN+r7//kaf/c4/+Vnf8TmzvRV7eO1DOKjaxgdT6T8P3Kbb2A6n0A5vlAojRAne9AVebgN7qTdDhJsbaALzUAKzBAJenAIOPAGBkgMvETbasJqaaAJaIAIl7AHlrAGlcAE1ActVyQr1BK68rJZskCo8ICn4HBW8ADVMCxeGlrtWBnMxli8NKfLNCaJ84VYsvM2ke5u6c3Od11OFXzdw5wMozr7Qrnp0kgncX//Wd//F2/+5Y/+s7/dg1+8At+agl9X8X/+CC/9VP/8oo/8EH/7MA/6AA/48A/28A/8yA/7dN/6cm/5gA+4wA9XwA72wA5lEA/6uR/4pl/3BD/1ci9FEe5koZ2EMVvzYMvKqkoYh/jW5jeVVIbUxBXUA3TjQuPicj7u7u4ODgvb29np6edXV1YWFhQkJCISEhsL7FkKSueJCcYH2LVG56RVpkN0dPJjI4AAAA////V2RexgAAAJp0Uk5TAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4vC7tcAAACDSURBVFiF7dYxCoAwDIXhnjSzo0coaM2YK9uAS2OVFhso+P6xxm+oIAkBTRV35AEwHx1ViAHA3pEX0HqFAAAA8AbwPwAAAMAcgIg+KheZ7cquN8wiHkCMRMm05OyZzvkARHdgzdkznfMB9HLK0acl8+UrfAba1lwfQIn2Kq8PANCPOwGc/uG53leaywAAAABJRU5ErkJggg==",
  LA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAalJREFUeJzt201Kw0AABeAoguipcgjFk4geQfEkoivFfU6luKqrQq0k9i9JZ9737dpMkxReXyfTpmkAAAAAAAAAAAAAgLKdzH0CY3t6fFisPr69ux98z9uOL93p3CfAvM7mPoGxLD/JVzfX65sWTfP3k73t+FpogHDVNcD6d/i+49bH19YEGiBcNWke+A7/5evze3D7xeX54PbX55emaeppAg0QTgDCCUA4AQgnAOGKXwfY9nr+0Mct/WpAA4QrtgE2ve4/tNp+K9AA4QQgnACEK3YOsKuP97fB7VPPKeamAcLFNcBS3z+C0miAcNU1wPL3+j591+srzw82QW1zBA0QrroGWNp1Za7vdbXOETRAuCLXr1dNfSdPbXcOaQAAAIAoRV/Dbqhde9wdeHzRrAOEE4BwAhCuxjlAO/L+u5H3PykNEE4AwglAOAEIJwDhBCCcAISrYR2gnfn43czH34sGCCcA4QQgXLV3Bg3o/tneTnAOR0MDhBOAcAIQrsY5QDfy69s9939UNEA4AQgnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABP7Ad6dV029OKz+AAAAAElFTkSuQmCC",
  XA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAYpJREFUeJzt20FKw0AYBeAoguipcgjFk4geQfEkoivFfU6luNJVoI00tbRp2v993y6doUzh5SV0kqYBAAAAAAAAAADqOJl7AVN7enz4WTy+vbsf/c2bzj92p3MvgHmdzb2AqfRn8tXN9XDop2n+ntmbzq9CA4Qr1wDDa/i284bzqzWBBghXJs0j1/AlX5/fo+MXl+ej46/PL03T1GkCDRBOAMIJQDgBCCcA4QQgnACEE4BwAhBOAMIJQLhyu4HrfLy/jY6v20uoRgOEi2uA3qongtJogHDlG6Dfv++t2sdf+HypCarfE2iAcOUboPffJ3j6eSn3BBogXInn2hbt+s2e6m8KaQAAAAAAgPJK/a+9Qjs47nY8/6jZCwgnAOEEIFzFe4B24u/vJv7+vdIA4QQgnACEE4BwAhBOAMIJQDgBCCcA4QQgnACEi3k7eEG3ZrzdwxoOhgYIJwDhBCBcwj1At+X8dierOFAaIJwAhBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAPfsFld1IsNlmu3cAAAAASUVORK5CYII=",
  VA =
    "data:image/png;base64,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",
  jA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAATpJREFUeJzt2c2twjAMwPHwxCLehQnegRNDIHFGwAbv7cCJAxOwi0eBC5EgosKNXSqa/+8CheJEset+kBIAAAAAAGYichWR67eP/xMxmW829wYos6CqM29MyzhRqIDogDlTUZUwdJ+hAoYK/OkzRG0var4CJrsA1uuEyS6AlbsHqGrEPHoTkZA4zVfAZBZAVWc11x6TWYBag10HZJfT8Wl7sVy59ovWfAWwAGNPYGyD9wDrsew95mvvPagAb4C/4/nl5+vVr+l31v1K/9tNSqk789wNGrkr4F0Gs3cZ7/q+a/+uewFVPdzf7ovXl6gAbwBrD8jbZaatlVHKPeAh41War4DqJ7cPT3/jZtNv/HQf3/X0ufkKqO4B+dgTkV3cdPqP79V8BUT8e7MPiDHauM1XAAAAAAAAAFpzAz/dZCrLDl1lAAAAAElFTkSuQmCC",
  YA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAUdJREFUeJztmMFNAzEQRSeIRqYCmqCCHHKKKAEhcUYsHQRKQDlxoAKaoIIpJVywFJINsT2zu8r6vdtau3+sme9Z2yIAAAAAAAAA2ajqTlV3lx7/KmIyl8y1V+CwCma28GrmxIkCB0QLpkpFOWHoPoMDhhIe+w9R24uad8BsE5C7T5htAnJx9wAzi5hHMaoaotO8A2aTADNb1Ow9ZpOAWgbbByS+PrZ/nm9Xa9d70TTvABIw9QSmZvAekLuWvWu+9uyBA7wCm+1n7/jDetn7Xho/93xO//XpUUROV57TYCbVtzZ7Nz9F36WK3rzdiYjI9/27iBxXPiN+77iZvRwMdf/pNO+A0XpAtH7qAT0VL6J5B4zeAxKnun5BfPmN77p9xgGObzsREVV9jplKGXtrv/Po4IAAjS5AY7K4zTsAAAAAAAAAAABa4wc7OGUrPdZSAwAAAABJRU5ErkJggg==",
  WA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAASpJREFUeJzt2c/NwjAMh+H0E4t4Jc7fEEicEbAB7MCZlTwKXIhURVSkjktF/D4X/hUnSn64rUgJAAAAAIBqIvIQkcevj//nMZlftmktUO6Cqg6tNWvG8UICvAvmnfJKwtJ9hgQsVfjbZwhrLwqfgG4XoPY6odsFqNXcA1TVYx6ziYhLnfAJ6GYBVHWwXHt0swBWLMDaE1jbYleCl9v97fu7/63L8V7CJ8B8xza66/Obzbzx02v8YTyf0qczQ/gENPcA6283f6/2uNL1sE8p2Xc+IwGtBWq79Kcdn/p86vipewFVPb+enorHt0hAa4HaHpBflztdm4xS7gGjHTcJn4BurgOswifA3APyb09Ejn7TmT9+q/AJ8Pj35uRQY7VxwycAAAAAAAAA0TwBZXVr2TD+heoAAAAASUVORK5CYII=",
  qA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAATtJREFUeJzt2MuNwjAQgOEB0chUQC+cESUAEmdEVnteaZcSEGd6oYIpBS5EWkUJcewxiPj/LrySsWUPYzsiAAAAAAAEU9Wbqt4+vf2pR2c+2Sw1QHMWzGySGjOkHS9kgHfAeqa8MiF3nSEDcgV+9QoRW4uKz4DRDkDoPmG0AxAquQaYmUc/BlNVlzjFZ8BoBsDMJjF7j9EMQKxs+4Df86X1++1y4XK9FzIgV+ChM5d7pruQAa9qqP6P1zPd93mo2LNH8RkQfWavR3zz/dP6e1+1nx9XIiJyXZ+Crm/62++e9o/TYKDkGpC7enfF7zoLmNnX423VeG1FBqQGyL2D66sB/2Y8SvEZkLwKxD4PcFj35dF+0tNnMiDh3kpERFUPPl0ZpqXaRyEDHGJUDjHe1m7xGQAAAAAAAIDS3AFORGPXV5RdPQAAAABJRU5ErkJggg==",
  KA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAS1JREFUeJzt2UFuwjAQheEBcZG5UtfcAaSuUVN1jQR3YN0rzVHCBkuRFTeOPZGL/H8rIGE8wi92IkQAAAAAAMimqqOqju8+/t6jmXd2qC0Qz4KZ7Wpr5ozjhQR4Fwwz5ZWErdcZErBV4ZY7xNz4qUSSgNYNeFubPBJQW8DMPPpYTVVd6pCA1g1sbel+pPsE8AO0bqC1zdaA2+N39vPz8cPlfC/dJ6D4iW3y1OfXzbrx5TX+btpPjF1gQfUaUHrthu/lnhe7Xz5FpHzmAxJQWyB3lV6a8dTx1PmpZwEz+369HKJD8XsRIQH1u8Dp5zp7PHemc5MRC2vAZMZThr8OkoDSL/63+4BS3SegeBcI156qfvm1s378Wt0nwOPfm8GhRrNxu08AAAAAAAAAevMEEZxoO1e+Vz8AAAAASUVORK5CYII=",
  JA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAATFJREFUeJzt2UEOwiAQhWE0XmSu5No7aOLaWOPaRO/g2ivNUXRTkoa0Aco02PB/K20pkPIKRZ0DAAAAACCZiHxF5Lv29rcWnVmzXWkF4Sio6qa0zpR2rJAA6wr9SFklYel5hgQsVXHNFSJH8wngBtTuQG3Fc4CqWvQjm4jklh99XyEBtTuwtNhq1HwCuAG1O1DbYnPA8/0ZPX467E3Kx0w9++EepfkEzN6xDXZ9dr3Ja9/17W+C40kj7zWfgOI5YO6z669LLRd6Xc7Oufg6H/tdggSUVpA6S8dGfOr8VPnYXkBVb/3HbqJI5xwJKF8FjvfH6PnUkU5NRsjPAYORTtUNv5CAuRf+63tAruYTMHsV8M+eiFztupPffqnmE2Dx701nUEe1dptPAAAAAAAAAFrzA7+uaZtoIsD5AAAAAElFTkSuQmCC",
  ZA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAARhJREFUeJzt2cENwjAMheGAWMQrcWYIJM4I2AB24MxKHqVcGqmKCCS1q6jk/26F4oTm1TQiBAAAAAAAionIICLD2sffekxmzXbWAukqqOrGWrNkHC8kwLtgXCmvJCzdZ0jAUoVb/kLU6D4BXIDWE2jN3ANU1WMe1UTEpU73CeACtJ5Aa1yA1hNobbEnwfvz9fH142Hvcn6t3K61+wTM3rFNdn1+s6kbP4zjf/0OuT0JCRiZe8Dcezd+rvS81ON8CiHYd50kwFqgtEv/WvHc+7nz5+4FVPU2PSYB1gKlPSAepytdmoxU7AHpitbqPgF//xzwS/cJmN0D4r0nIhe/6dSPb9V9Ajz+vbk61Gg2bvcJAAAAAAAAQG/eUEZgO84hMZ0AAAAASUVORK5CYII=",
  $A =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAMdJREFUeJzt2UEOgzAMRFFa9SJz0tKT+ih0lU1XgJ2OIv+3jzMyJgjYNgAAAAAATpN0SDpW3/9ZEWZlr2yB36sQEY9szTP7VGECqguOK1U1CbPPGSZgVmHnE+KK9hNAA9wB3NJnQERU5LhMUkmd9hNAA9wB3GiAO4AbDXAHcKMB7gBu094G/+XuW+f4XtF+AmiAO4Db8mdARHwy65kAd4ACe2YxE3B34bj3JL3r4lzfP6v9BFT8vdkLatj2bT8BAAAAAAAA6OYLofQkuDUc/NwAAAAASUVORK5CYII=",
  tu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAg9JREFUeJztmbFSwzAMhgX0uvWgC7uvQ1+Bl2DiVcpMmOmrMPESvEKHnneWwnXrAWXSXaJzHNtyEVz+b3Mqy6r0J5EdIgDAmDmr7XC1mB9r+2yz3u6qxnxe09l/RJ1NWfGb2YXWZZTX/VdnrFUEFFA6kSsvK37/MVOGFOfpct8ZsyJKlQAF5E6wqryklhJGr4CJ1sFvV16uK5WQy+gVgARYB2ANEmAdgDVIgHUA1iAB1gFYgwRYB2CN+jzg+fuqXjQF3J2/ExHOA4pRnwk65056CjyE9x5nghpKsnckIlot5p2L6+2OiIicc0lOptNpZ3w4HJLmee8ptj5l/icoIHeCvOf5Kcy0KsH2QT+pCuCKM7Ly8i2U+0yAAkonDimBkYpglstlZ7zZbIJ2suKMtvIMFKB10NcH9CmCeZlcd8a3n29R+76OE32Akmrf2nM7wtI+gNFWnoECDNeWijGJZfQKQAKsA7BG/XU4QlPZPtdfEqNXQPVOUO7eatG3q0QnqESTPfkefwwZOeceFGuQ9z7ol4ikX+wGS6jRfTXtgbbiQwQU0YTsUoECtA6GdoF997BUSqpdwD/eAhqSO8HU/X7kqV2E9CcV0RdXqjKggFRD7vBkR1a74glxRBWR24lCAbkTWhnuq3wz4KLq7y1FFPUfUECGreX5YZsm83oUKMBq4VOdG+QyegXgu4DFon+JH+I+sP004wpbAAAAAElFTkSuQmCC",
  eu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAipJREFUeJztmzFPwmAQhl+NGzPElZjgzuSiA/4AF/4AHZxcSVw6sZCwOjnwC7rwA2QxJiyYOJm4NCaaKIsuuDjoACf5jpYrAr2S3rNd7/P6cvf2KxQEDMPIMztxiVKp9JOmkE0zGo0iX+tu2kKyxlxXaPKFQiF9NRtkPB4DmHdC7h0gNiAMQ4RhuLWxRO4dIO4BvJvlcjnyeFbzFNseEMPSDtg2zAEC1gBtAdpYA7QFaGMN0BagjTVAW4A2e6sWqFSPAABP94PIfLPZBAB0Op211CGkekkxB6xa4Oz0GADQm8Y0QT55Hp8cHgAA3gpF5+/ICbw+n3icsyQnccwB0gI+ET7huPW9m9vIfK1Wc+L91+dJXUFHo9EAANw9PEbW55On+PvjfWFdc4C0gHe02+06ec/znDxBnSenDIfDpYTReYNpnXq97uQvL84BAO0rN/a8gRO3Wq2F5zEHJF046/Bk4uQEfq3REyQ6HgQBgNmTGaLf7zvrKtWik+fP9qiO7/sAgPbVtaOL4A6VMAdIC/i1vWyHOS+fX05d6a5Cuz3fzfnkuTPJIRK5d4B9N6iiJkOk3gDf9/928qg4bXLvALU9gKYuvVNbF7YHxGB3ARU1GWLlJ0LStRyX58f5nWDZev/FHCAtSPr7AJoMvSePyyc9zs/LP4Mk1cU/hXJy7wC7C6ioyRDWAG0B2lgDtAVoYw3QFqCNNUBbgDbWAG0B2th/jaUtxDAMI0v8Aqp0PPjtiGSaAAAAAElFTkSuQmCC",
  iu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAARhJREFUeJzt2j0OQVEQhuFDRCHR6FBItGorsAS7UFuG2i4swQrUWokCnUai0FAp3OT+nJ/rI/M+rdyTMfMl5p5wDgAAAABgT6Oug5eT/jPleav9pZZam3Uc+k+iu5o36XGnHXv0h8P9Ufh5aEJIgO8D2YmnnnSobEKqJsJ8Alq+D/zKxLNC6zKfABqgLkCNBqgLUAveBNfTUdSun7fZxf7KLHZHr+9kPgHee0Aqv7JPmE8ADVAXoEYD1AWo0QB1AWo0QF2Amve7QOw7wLdUfScwnwAaoC5AjQaoC1Dzvg/Ynq7OOedmw17yYlJ411eV+QQE3wnOB93CfSB1QqpOdnO+cSfoI/m/LsqSEct3wmXMJwAAAAAAYNELCAoubm79ow4AAAAASUVORK5CYII=",
  su = "" + new URL("display-C0pQcKYV.png", import.meta.url).href,
  nu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAEACAYAAAB7+X6nAAAAAXNSR0IArs4c6QAAA8FJREFUeJzt2s1qU2EYReEvehx4D0UFR96MN+cVOerciTgQVASnpVIUROqoShMbo5Kc5KxnzY67r3Sw2PnpXn29urgeW/j+7cut5/sPHm77cfcndn/vr/43LA4CxCFAnGn9H/70miFfVq4B4hAgDgHirK4uPt36HuDYPqe63++9BohDgDgEiDPN/TlU7nsAzAgB4hAgzsoeoH2vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBDHHiB+rwHiECAOAeLYA8RzDRCHAHEIEMceIH6vAeIQIA4B4tgDxHMNEIcAcQgQxx4gfq8B4hAgDgHi2APEcw0QhwBxCBBn9ebV+fUYYzx++uy3P/D+7esxxhhnj56MMTZfU25y96d5rwHiWATF7zVAnI09wK6vOfJl5BogzsZ7gGP7pkrum0DskWn9NeHjh3djjF+fK9c/Z96Vuz/New0QxyIofq8B4kz/+poiX0auAeLc+T3AujmHym/Y9a9c8v/LNUCcadfPmYfKPR/2WQPE+fkeYG4TPc/zrAHibLwHWP+ceCymevYeAHtg4z3Arn9V8ryMZw0QZ/XyxfOtq2AsGw0QZ7q8/Dz374AZ0QBxCBCHAHEIEIcAcX4ArJp5vJPKO98AAAAASUVORK5CYII=",
  ru =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAO5JREFUeJzt2M0JwkAQhuFRrCAVBHLIXbSB7UG0EdESFBtR7CF9eAhYgS3oaUGXGCHObhLmfW5DyGRJvkx+RAAAAAAAAABYMonV+HQ8PDX6bHf7aGsUEZnGbD4GM+2G/sqv1hutlk+ReEkgAbEPUFVVp/2cc8oraWY+AclOQJaXkuXl19o5l+yqvzOfgOgzwHvcb61111nxL/MJGMwMCOtUzCdgMDMgrFMxn4DeZkD43Oc9oCdqM8B/Bc4Xy8btv577YV3XtdbSWpEA7YZFUXzUXe/r6+UsIvwRik797I7lX6BnPgEAAAAAAAAAAEteMfc6/wABXfgAAAAASUVORK5CYII=",
  au =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAcFJREFUeJztmr9OwzAQxj8QA2KBoG4IUQFvwcQMY9c+AIy8Aiti7AOUta+AWOAtKCqquqCKwMCfrQzlKHZikji2I+Tvt/V8Plu+z7lLVIAQQgghhBBCSHws+Qrc7e3O8uxXpw9/rmk7z5ZlH0H/E85PVTK4s93OHX8cjwBkM2o7ry5UgK/AprssGZaMFtkFPgM8seJ7gcmgrRo6IwDZuy6Z1/23vv19QQWEXlDP/PrG6tyOuX0SeD9UQNMbeH35bHT96BXgrQ8Qijo8E746Px0qINRCZZUQKvNC9ArgATS9gaYJXgWk8xvePyt+e/ubABZ9AatAIJydrun9v38yVH5f3B4BWGT6/Pg61276LiC4Ukb0Cqj9LmC645LJNE0BAEmSKPazg4ESR7df3nWUcT1ut4cZUF8JVIDtRD3zP3d2rPpJJuWuFyFKyTwDtLiybl0lRK+Ayqdm6ul/1e1Dzf8mz7+IqvFs+wYqwHaiqe4XUVYJRX2ADp8Bljj7JmjqAwTJ6HT6DgBotdaUcbG/fTwp8QQ9blWFmIheAc6rgAndXzIu6IqoGo9VwBJnVcD2nx8mqsZjFSCEEEIIIYQQQkrzBfVq0sr9wvZbAAAAAElFTkSuQmCC",
  ou =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAehJREFUeJztmj1OAzEQhR+IgkABxQqJAi2iooGCG3AEDhCJOgdKjZSDcIMU0FBFRFuBtoCCnwIJChgRO1j2ej2OkN/XZdcer/a9HY/tAISQklnTCjwcH30u/p6MZp3G6ts/lHWNoP+J5G9VlKsPDo3r8+YegF/Jvv27QgdoBba/YVHUpaStvLQTmAOU2NAKLIrZToiNo0XxDlB9u4v4vnFfjtCieAeo5QAhNgdIP+YAZdTrgOn+AABwWdUAgJvbOwDuSs/VnnWAEuo5QLhq5wCAC0v5nd1NAECN7+vTjwej/Znyc9EBq36A56f3lY5fvAPUqy3X+t5HroqQDsg1UKgTuBbITPZZQBR2VYK5Kd4B2WcBUXp7sGe0e3l7xF/tOAsoky0H2DW/TfVzXdqhyfBQoAPSO6DvLrAvHk+GEpPMAaLU6ckxgN9VnmTz0FWf3U5mBckNwzGS7hUW74DebzF0vz8W7fMDOiC2o0t536lvKF1PkWOdQAd07eD7B4eLWAeExot1Ah0Q29FV8dl1gGCvAqtqy7jftq8AlleFgtQBclJkwxwQSbJKUBRzKWQrKooL4ghZFS7lgMaMk2oHqXgHJJ8FJqPZuaPfdZdxfHE4CyQi2SyQax8/9fjFO4AQQgghhBBCSIl8AUuI+GB8Ks2SAAAAAElFTkSuQmCC",
  hu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAdZJREFUeJztmj1OAzEQhR+IgkABxQqJAgXlCNyAI3CASNQ5UGqkHCQ3SAENVUSUCrQFFPwUSFDASLsDxmt7xxHy+7p1xrMrz/PMeLMAIYSQctmycjyejj6a17PJMuheqfO7sm3h9D/R+6pK5IYnp63x1foOgD+SqfNDoQKsHOs9LBF1RVJHXuwE5gAjdqwcS8S0EmL9WFG8AkxXt4lvj/tyhBXFK8AsBwixOUDmMQcYY94HLI4HAIDLaggAuL65BeDu9Fz27AOMMM8BwlW9AgBcqMgfHO4CAIb4Gl+837fsz4yfiwrY9AM8Pb5t9P7FK8C823Kd733k6gipgFw36qoEngUyk70KSIRdnWBuildA9iogkd4fHLXsnl8f8Jsdq4Ax2XKA7vk11fe42GGd4aFABfSngNS3v6F++8oNxSsgeRV1lpc9LKc8V933oee5/KYqgQqIneh7zy+ERl7j85uqhOIVEFwFfKe62WR53rbH/C97F43IKn+jefNa/I6niPofoXgFJOeArsQqoCvMAZH01gm66rWgT4FVtdf6va5fAPw8FQquPiCV4hUQvG98X3G50PYScUErItRfbD9ABcRODP2SM7RqhPpjFSCEEEIIIYQQQjrzCRpp485FaeajAAAAAElFTkSuQmCC",
  lu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAg1JREFUeJztmq1OA0EUhQ8EQUFAkw0JgpSgMCAIDoUGwwOQYKkh4RWw6GpCDYJXIBh0BRgMDU0VpElB8CNIQMBNu9NOZnc7dxoy53M73bmzmXP2zt2ZAoSQmJnQCrxfW/nuv65Xm7nGGrV/ViY1gv4nvM+qKFdZWk61t9qPANxKjto/L3SAVmDzHRZFbUqayst9AnOAElNagUUx0wlF42gRvQNUZ7cf1zvuyhFaRO8AtRwgFM0B0o85QBn1OqCxWAIAHCQVAMDt3T0Ae6Vnu591gBLqOUA467QAAHuG8nPz0wCACn7bG19Pqfs3lJ+LDhj3A7y+fI51/OgdoF5t2b7vXYSqCOmAUANldQK/BQLDCRj3A4yb4KuAVH7m+m+2cxUIhHoleH74kLo+vdlJXZ/sXg1tDwUd4DuguQPU7XYBAOVyGUDvHT/eukz1M9uPLjaHxuPJkGe8OUCUWl9bBdBTVJQ0c4ENcYpgrh77NXjdK4zeASPPYt79/qzfAqHOD+iAoh1tyrtOfbOS9xS5qBPogLwdXP/gcJE1B+SNU9QJdEDRjrYzP7MOEESh2dICACBJZlK/dzrvAIC3j2cAgwpLHSAnRSbMAQXxVgmKYjaFTEVFcUEckfydEA3kgnY6TtZc4SJ6B3hfBerV5ral33WecVxxuAp4wtsqEGof3/f40TuAEEIIIYQQQkiM/ACUBgWOKdJPXwAAAABJRU5ErkJggg==",
  cu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAXpJREFUeJztmk1OhEAQhZ/GhdcgfQMznseF8SfujbKbHRpdG3XiCTyDJ3DiDZA7cAFcmFpAHAPdDxrS79sxmS46XV+KomlACCGEEEIIkSJ7sSfwcH/XDPn/9c0tdc77zGBL5GCqG+3K9NHq+N9xzrnuTw3AM0EGsAMSMz0JMoAVyDI/10zvInkDgiupZf707Dx8Nn9Q13XruixLAMDX9hNA+NMgeQMWtwDOOWodWdwCsKH3AUVReI3L85w8k37IAHbAWJn0RQbEnoAv1nFaH+LbD8gAdsC+T4HQWmG9gHWEvsgAdkA9BRbGZDVgrmbIAHbAqTMd2g/IAHbAoW+DZoyNG2pQaD8gA9gBfWuA9gMisZg+oLsb3EVvg55476k323UDAI8fhwDG+y7wtnltXet8AJngGvD0/AJgPAMMduaN5A0IXtUsy1rnAa4uL0JDthgr84YMYAXqmlBVVfQTaH2QAeyAZsL3+8nvDVbrWZuQvAFCCCGEECJVfgBXv2cilHu1oQAAAABJRU5ErkJggg==",
  Au =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAaZJREFUeJzt179KA0EQx/GvYidYqt15voBYxMbCeA8gNlrYBQKCjUGwD1ZpFCwFIZ2FIogPcF5jo4VYpFVTSSwVbWNxrueef8hurpH8PlXmNnM7YYZdAiIiIiIiIiIiIiIiMiiGfBOjKOoCBEEAQLPZLKiknve34jiOvX7LcCHV/GMjrgn5zk/MzH+spBNQv3uyvl8/2e+nPuorm3Y8PW7Fc0tr5mMX3CdBE+CbmCQJAOXc893tSQBeSzcADLPa0/uCg2Urbq+fAbBz/Phn3tX5EZBNQhzHPe1naAJ8E8MwBL6fAcbo9SyQTcJvz00MwY/7ZOupl9y66byZBFeaAN/EL6evpbSxAEDnOb0NJsZqdlwy62u5OF1/23oDsjMhPLTXW6ctaz/fzhuaANcEc/93bi+Br2dAKuv8uFNsOp93X30AIDycAqBFy6rD7G/qcaUJcE1ot9t/xq6d/4z37Nh03sjHhm/njYGfAJ9/UGWAKIouILsNGrVqYUX1olKpANkZ0KhVFz+WEpf3aAL6yC0XVURBEp+kgZ8AERERERERERERERkk72athlf1tN6iAAAAAElFTkSuQmCC",
  uu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAYhJREFUeJzt1zFKA0EUxvG/wU4QBEnsQryAWMTGwrgHsNMiXSCVjWnsg1UaC0+QzkKx8QDrNjZaiEVaIZVEBEGxjsVm2MxKYmayKWS/X5O8nXk7L8xjhoCIiIiIiIiIiIiIiOTFkm9iEARDgHK5DEC3282opJnXt+IwDL1+SyGTav6xZdeE9M6XtnZHI3EHtF/erPnt64t56qN9eGLHm0Ur3jmom69DcO8EdYBvYhRFANRSz89PNwD4rj4BUODI7cUf7/Hn2joAZ1evU6c/3F4CSSeEYei0nDrAN7FSqQC/zwBj5XEbSDph0nMTG5PmG1+pOszOm05wpQ7wTRw7fS3V4z0ABp/xbVBabdlx1YzXU/Ff8+O4d9Oz1vPdeUMd4Jpg7v/B8z0wfgbEkp0sLiTu0bPqMOubelypA1wT+v3+1HhRO2/iNN+dN3LfAT7/oGoAQRDcQXIbdFrNzIqaRaPRAJIzoNNq7o+GIpf3qAPmyK1lVURGIp+k3HeAiIiIiIiIiIiIiOTJD+hFiXSvMGOmAAAAAElFTkSuQmCC",
  du =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYFJREFUWIXtVj1Lw0AYfmy80qQkKjRDhlLsVidx6ugfcHFQJ1cnEZwd/QeuTl2c/AsiuhSk4CYuFltIlEZsrabSUOMQqq3eHZdLO4h5ljdc7v2+570DEiRIkOC/Y4b1Y22pEOQGKVj5BTjN51jy7LaBatOl+qIulvO5AADKi9ZEsqzWnVBSgpjlKfq93kQC4IFagYvTjcB2FVweX3GViaoKOVnfK8F2FWztnIhVwHaV8CPNN+wPxitEFHpAX/YoiHwGfjoVQa3RBkA/AymWkqlnAQBamozJOdUAUdRIctSeUACmnkWr+wYtTeD1/dhyaE84AF4FZCWrAtRDOIzW6xtUpaj0ZGUPxKShWQyzat19O6BRU5qGPJ7PW2H3SEaDWQTazgdzrzQNS5rOVCwsGyAZDf67BwC4v35h7r3xugDoNOS3oMJvwWFlFwBwsH3E3be5vyI5CSkYnXadp/qvtaj2pG/DKEyoPbAnIfc27Dy+CjuRBetBsjolf+dTspvgD+MTTd64v/mXwj0AAAAASUVORK5CYII=",
  fu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWhJREFUWIXtVjFLw0AU/jRGLidGhDo4FOkkBRFx6uDgr1AnwclJh86O/gL9AUIXJ/+DqIMggohQnIoIoWIEW+3dYShxKIqQeyGJF7G03/JdHnfv+7jHvTxgiEHHiC64NV8K8xA7um9E9LQGni8OcjEws7Ib0RujNt/e1Y2KLy6UtXHSAHeYUQMURv9EJYsBziyjnMpARwgI1QVnljHuCNFHNwAAtuMaZQr0K2DjACv0PkxxGgNCfSCQbdiOa4SnpvUmyBIEsm2UKZAGhOoaZQp0CaSCkF/r33OqEkxwHus6C6ic/7cVD4wB7UBSKRZCACjzSfLg3JILm3EEqtfjH27o51YXbwCAy0c/2UR0drIWer6F89oVbR3Afm0HALC3eRi7b726DM+3sLF9nGwi8nz6B2Jbzve69dKIxNLmiy1BpTRLHgykjBX9ievmKwB9CchGBACtp/fEIlmhvQEAqznpneaUd4g+xidnO9QIpx9mhwAAAABJRU5ErkJggg==",
  gu =
    "data:image/png;base64,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",
  pu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAaNJREFUeJztmrFKxEAQhn/FOm9ikQcQrPQJbKxE0VILObxH8FAQLD3OUpSrfAYbQTGFDyKksjubDFyGW5NsZhKO/F+3m93/lpt/ZndDAEIIIYQQQgghw2PDS/hmcr1Ybr/NnwAAOweHJvqjq7HJ2jctRNaZLWtBifzJ6RkA4Ghvt/Rc+g1YAO2dQAd4CevIX0zuAABZlq0cn6ZpqS3jpF+3raADrIQk96XaCxL5tlhHXqADmk7Q+7vm9fIXAPCz/w4gnPNNYQ1wIroGhPbz22nxPFa4wCvnNXSAlVBsrocirXOeu4AT0Q7I8xwAkCTJv+NiI8ca0BGNHbB0+yrd+iRiX58fAIDZ9MFife7QAV7Chvf+lVg5jA7w/oGqe33ojF817nH7vBg5brU+OqDvBdRFO+T4+x4AMGqpSwfETgydB6qIPeHxfYATndeArm55dRm8A/gH9L2AvnGvATrH6+Z87Lym0AHWgnIe4PuANcHsCxH9XUAs8q5x/vJc6rf6IkQzeAd0dhIMRTaEV8Q1dIC1YFX17yqydRm8AwghhBBCyFD5A0SDflyuiwrlAAAAAElFTkSuQmCC",
  mu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAADACAYAAAC02WUGAAAAAXNSR0IArs4c6QAAAkRJREFUeJztmkFOwkAUQKeGjWEhiXGFW4/hwjv0KByDo/QOHsIDuAF3BlwQE0OCqxqjDBZs55XOeysCQ3k8fhqYEoKIiIiIiIiIiIiIiIiIiIiIiAyZor4xK6c7UiQ182pZhBDCBS1CU9Sf/P3dzUkHWG+2e++fjEedPO/U5/9c//SyCiE4AQYwAC1AYwBagMYAtACNAWgBGgPQAjQGoAVoDEAL0BiAFqAxAC1AYwBagMYAtABN9gGaXYZJQNMrQm2T/QQYgBagMQAtQGMAWoDGALQAjQFoAZreBFhvttF/fnVJbwJQGIAWoDEALUBjAFqAxgC0AI27wsir9ggD0AI0BqAFaAxAC9AYgBagMQAtQGMAWoDmbANMxqOjfkHG1p9tgLYwAC1AYwBagMYAtACNAWgBmuSb8cS/QA6R/QT8O8Cx38n7RvYTgH90bU9PfY5petzsJ8AAtACNAWgBGgPQAjQGoAVoDEAL0BiAFqAxAC1AYwBagMYAtACNAWgBmq+t0+fFR6sHXq2aHa/puq5eP/sJMAAtQBO9fDK+vkrp0Tmb17e992c/AQagBWgMQAvQGIAWoDEALUBjAFqAxgC0AI0BaAEaA9ACNAagBWiie4KxPbShkf0EGIAWoPG6QGKP3mEAWoDGALQAjQFoARoD0AI0BqAFaAxAC9AYgBagMQAtQOOuMC1AYwBagCZ6Dli8D+sccHu5f5fbCfhrwbxaPqQQ6YpZOX089Hj2E1DUN2bldPf9gXm1LH4vP19i7y/7CfgE0khI08VUE90AAAAASUVORK5CYII=",
  yu =
    "data:image/png;base64,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",
  xu =
    "data:image/png;base64,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",
  wu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABACAYAAADlNHIOAAAAAXNSR0IArs4c6QAAAZZJREFUeJzt2rFOwlAUxvGvWGIDg00cHH0CdhmdTRhNHB18F97BwdGdF9CNB+AJHB1MiBFTgwkO0EKQphobD+f2/1tooMO599x7D6cgAQAAAAAAAAAAAAAAhCjKLwb93sIykKYZjSeRtErAoN9bzLPMNqKGaSeJRuNJ1LIOpOni/GKWfVjG0ThpkkiS2AHGih2QpkeWcTQWO8BYvL6c2UXxa13rAGoTV9+yjzwtljLLReQuAfPswDqEWrSXX4LWCQhlYN5QhI25bMS6yaF1CLVxVwMkX4ulDJ3wnqATNsYOMOawBoTQhEk7GrFQBuYLR5Axd0fQdPppHUIt0nT5WiQglIF5UyTAU3cZQiOWc3cESb4WS5UiAe1Va4z/xbcgY+6OoFD+QJafOBs/yIQxMG84goxRhI3FkvT6xnMgKy1JOru4PLcOpGnyOY+337i/u314XxXkTpLo6vqG5PxB1XxShI2RAGMkwBgJMNaSpOFw+GgcR+Pkcx5tf3B6crzYrNpPzy/f7sHPVc3nzodxHbriWjGfQJkv3YhS5ijNbKoAAAAASUVORK5CYII=",
  Cu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAnVJREFUeJzt3T1O41AYRuEPEkBAQ0WVRWQLlFRZT3qkrCcrgBUgFkGVigZQ+AsFXCSuuVKUYPvCOU/JCI01Pn4nE+xMhCRJkiSWndIvzKfjVZcHonZNZjc/nuvdrg9EdWlUka780elJ90ej1twu7iKiuQQuANxXDV75DPkSuABwBgBnAHDD/AvPL699HEdv9oaDvg+hVy4AXGMBaGiLl3MB4AwAzgDg8K8B+lLLvz5cALhqF6CWK+S/cwHgGgvglcfiAsAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAZAJwBwBkAnAHAGQCcAcAV7wqmPDNHvwfSBYArLgDlyqAsXYkLAFftk0FdoSxdiQsAZwBwBgBnAHAGAGcAcAYAh38fwHcChYb/rGA6FwDOAOAMAK74KWG01wLUnwq6AHD4O4LoXAA4A4AzADgDgDMAOAOAMwA4A4AzADj8/QD0dzxdADj8/xlEW7ycCwCHvyuYtng5FwDOAOAMAK66Twmj/53cNRcArrp3Avv+/btSy9K5AHA+F9CTWv58XQA4nwv4VMsV2TUXAA7/s4CEtniJCwBnAHAGANd4DXC7uIuIiNHpSecHo/ak85pzAeAaC3B8dBgR5WL0N6Xzev/w+O3rLgBc8X2AVEwuFbQ/+Ghn7+CghcPSup6Xy4iIeHp9i4jyeStxAeAMAM4A4AwAzgDgDADOAOA2vh/g/OL67DcPRNuZT8eXm3yfCwBnAHAGAGcAcAYAZwBwBgBnAHAGAGcAcAYAZwBwBgBnAHAGAGcAcAYA93VH0GR2sxMRMZ+OV2t+71UbB6Tt5M/+5dJ5TlwAScJ6B9igYjp2pgvHAAAAAElFTkSuQmCC",
  bu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAEpJREFUWIXtzqEVABAYReH3m0AQDeDYwP7BBo4BRMEGFFmU7l3gfqZbTmXPNfSj4KNaryZJ7svxEQAAAAAAAAAAAAAAAAAAAADgAHkfB0DG3TsXAAAAAElFTkSuQmCC",
  vu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFNJREFUWIVjYBjpgBHG0NKw/E9Pi6/dOM7IwMDAwIIs+ObDE7pYLiIgA2cz0cVGPGDUAaMOGHXAqANGHTDqgFEHjDpg1AGjDhh1wKgDRh0w4A4AAMZWBz6QUEqeAAAAAElFTkSuQmCC",
  Eu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAF1JREFUWIXtkEEOwDAIw8r+/2d2XqOqhVUq0+w7CXFrAAB/x7KH7u6PILNU1pV9YBfhr/vlEhg08R0Ds+USvGiivoHocimYmKhr4O1yKRqYqGdg93Ip7EwcNwAAADem3BgTZV9CuAAAAABJRU5ErkJggg==",
  Su =
    "data:image/png;base64,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",
  Bu =
    "data:image/png;base64,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",
  Iu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAAAXNSR0IArs4c6QAAC/ZJREFUeJztnX9snVUZx79bhm50g93REilQGCtIaZwbNbOkZhIlMS4ZYUKihrlKFjEaRIlhGzGzDlQGxqCTSAIsszoCGBZRkhEjW9Sk0qCTWTO2zEJhQGfcbMfYHHGG+cd5n/flPfeee877Puf91T6ff3rfH/e+597e87nPec55z5mBguna+Z8zANDZfqToolSS0fG2hvv3rzh7Rh7Xn5nHRYSpSy7f0vcixskH3UxZGUkMJLDIzUBinmIhI/k2kRhIYJG5gcQ85cK3icRAAovMDCTmKTe+TCQGElh4N5CYp1pwTSQGEljMKroAQrGEvxTBL0dSE4mBBBbeDCSxz/REDCSwkBhIAJA+FhIDCSzYBpLYZ3ojBhJYSAxUUihDbDK77XhaksZCYiCBRWoDTZXYJ6uaPF0QAwksKvcFGh1vM94LJZjJ6nOr3BdIKBeJY6CpEvuUHfp8TTGa7XheiIEEFpXJA7nWtKJr5FTBNR8kBhJYOBvId+wjpsiXz155AgDw5AG/n7sYSGBRuhio55w5AIA9x09lep3dI2MAgI7WZLmRqpmTPs+sEAMJLEpnIMJmorxMlRVJy0/G/MTihamOp8XWGhMDCSysBip766tqJtJjkqzLX/+6c72+vhhIYFHaGCgrotbXMgDA0OxNAIC+8QEA1WldmcgqFjIhBhJYlM5ASWOBomIfXzW9KrGbCTGQwKJ0BnKlqjWXym3LEFNrNYzRWgeCI41jNIrpDh19wUMp3REDCSxKb6C0fVZlx2bQsDU44fZ6NlOR0chQne1+WmliIIGF0UBVHftsy+uE+Z/ed4I969U21HbfcLJMeVZ5l/AOitnNj9P7LQoxkMCi9DGQK2GN7VVGwXDz8595+Mex7Qsvu1w9mPsZp+udPrIAAHBWm2OQkpYllvdDx/fel205DIiBBBaVMVCU31AxjClG+etzOwEAG175BwBgcxDj6OevvPXrDZ/vGgv9c+ljAIAPvHgzAH+xEJl0w4gyyoaf/F4d+NqzDc+n93t1K+uyqREDCSxyN5CrSdLyZmAeMsxmSyzEhUzU907zTHFSqPwrlwVGDBqNYesrbEWuAAA8M/Co2vx049fjZqjlvjAhEyoTA1GrZ+ii5nkePbahmkoxjSv684ymDFpBQ3v9jCuKzNKY6HXnxfavXPVRAMBm7enRjBxjqcpjQwwksKiMgRZ1dca2k5olOt+Q2rU+T8v8Uv4l4NilX1bHX1XH+/HVRNcJTdHR3ECDHfOaHveNbU4hMZDAovQGorzK6Hjj42nN4pv58+fHtpPefWKMfZbE++ps6PMG6bjmqVzXERMDCSxKbyBXbK2XpOcRZDa9996EHgvZWmWusY+1nJSHCkwdjkoI81PZIAYSWORuIPoN3j2SLCNNmVQacecaE3BJaiw9FvL9+tbXY44PSrqGqhhIYDFlYqCqUN+X5Ye6GC2n8UFiIIFFZQxkyweVDWqN4YD6k5V5jGgjGbO6V14MJLAojYGqNvdgUnIzT0qStr4IMZDAojAD6fdy07YNMlTYO26p2Q/e1xXbPrLvqqbnt3W/BAC4bf1+p/KYoHxQUvNQeU3ldC0fZdBdZ/ZPixhIYFGaGMjXWOn6GtzcODr0vIE1NwLwZyQbdD1beYsqnwkxkMCicANd1HIxAOCNk6+zXkc3z6af7+AVLGfSlpdMRO/f1UR6qzdtLCQGElgY2/xZz86h14CDL/8PQGQivVVmK0feY4XLSv+ht5seN+XbJA8kFEJdDFTUvEBXLFJFmXh+KQDgEPQ7KRu3zgYnfqoedDQfKTjlod73BY3vBskq0y8GElgU3grT6b3mGABgODDRgvOPAmjSWuid5ubR0D8fV+O4rpGqIwYSWNQZKK/Yx5Z5br3krGC/KmLdnIBLxDwxgs/jpV2PAACuv/yG2OGs/q9iIIFFaCBqffma38ZG2rszqkatVgMATE5OZnudV7bQo9j+rMdZiYEEFqVphb28fzR4FJ+FY/h5Na5mwfmHAQB9yPe+sLSQebAniNkuuz2X617V8iX1IBg77ntmeh0xkMBiRlGZZ33lQLr+b3e9FTvv3LMvARDlg2bOuQCAtMZ0art+ASBqfXFjH5mdQ8iFwsdE6zVk4aUtAICxV08CiMxDvHuqWrFQ3kTrkMUz99IKE0pJaVphVHMOQo1noTkRyTjUW0/jhkKoF3qaxkKm/A8X174xMZDAojQGMkHm0Q0lxKHWV0/O1xUDCSxKZ6Ao1lGxT885aqwzrTE68S+1LE1t4vvq76eUmSanWSwUxj5jQewTLHdGn1Necw2IgQQWhRlIHw9ExiEDEfrqxjRO6FDLdWrH2N8AALWgq2fy9R+oBxff6bnE5UA3j9735Rtba0wMJLAozED6jGPUxxVtI7ZNGNe9CmpkbaEad5O1iajvycSuM+cBAK6+boWf6xnMY51/OmPEQAKLwgwU9carmqKbhe6ZJzPRcX215LmnPgwAODFHxUJ5m8hEVuah99uhugzD/NiTB+YCiIyk38UifWFCKXE2kK9ViQnqjae+rjs/pmbVoFaX3ucVxUyNjUVMnhcETcfVn9q/29V++DXR5Ce/4OV1TJjMY4OMpLdes0IMJLAoTSaaaoypz0sf50L5I9tqxGSk2kFlIpxWNXsypzHKSYlad8nMM3FCxYB7jrezrp80ZhIDCSwKM9DR104DAHqviY/z6VkaP49iJH2V4qTUxUZU06m1VpCR9HySq3EIMveyK+Lmkb4woRJkbiBT641m4aCaQpnnx188jEbovcy22MdGGBuNtQd/8zES1zgEvf97V6t8013b42PH712tRi1s3d14zkRfhhIDCSxmhb2rlvvDojkLk31jKXOs07dc1fA+bf/gE48DiGIfGv/Td8saAMDaWb8DANz8o52JymEijI0CfBvJZhw9s+7KY9+IZ7rJOAQZqX/55wEAQ3/cgiwQAwksMo+B6O4Kk7muDIxCNUavScT6bX8HEPWNbfycqln3PHiHr6IC4BvJZJy0ptHZeNsDAIC7nojP3FYHrd4cmIeM79tEYiCBReYGolk3OtvPje2nmjCojVsxtRqg9Y35No8Jq5E00raquOh9YHpvvB5r6tTdC+84Z4IYSGCRuYHoN390XMVC3LxD9Hy3vrC6uzQ8rWZclGnIvB0Jn0fG952hFgMJLArvjXddLUa/N54y1z3fW6sefFdrFZnuD/NkJLrunm9tTfV8V3y13kykXSODEAMJLEIDuUbfZVldma7/luU8K2QkzybSzUF/szYKYVoPLOn/zWYoMZDAInEMlDRPoOPbYEceUBnqj9/xIQDA0w/dlO6FTDGTo5l0E83cF4wquPb96cpjIOxb1BL2ScdAc2MfQgwksKgzENcwSUmbAaXntQXmyQzdTJY7UskQvUOrAAAvQK1n9m636sPzZaakMSv7OgbEQAILYwxE37zOva+daXbcVANoJGLd+US4Nodi+QcXqe3AKKNBbJPUgDd85SkAwNMPBTs8zxek943p9D68Kra9bChYQXAofh6ZCd1u1yWz/febi2cA713bJI4+YlNfe9ZGl6wXJuQJOxNtM9HJNdc2/SabYpg2ponyYv68ltj2sbdPOj2PzDTc/Sun88k8Jkzmof8PmcXW+pJVm4VcsRooab5Aj32IMMYJcPWJbiLqA9PRTfDFdc8CAH52f7DDcyykX8+2n9ANRTHT8K3KRJShJnO/74cjTWNQMovJPFkjBhJYWA2U9Jsc5kGCmrV280CsBm3dth1Afexjq7lg5nu2facccyaa3id9XpTJHgw+t35L7EMjPhd15WseQgwksPA+HuiR0zvUg1tWA4iMQzXv2/dsip1/98YBp9el57u2cgiKhboXqrHMrRdcmOj5eUHv79ez3wAA3B18bs/9cvsZANhyvwrmfvOXkZhhKGaymUePmXwhBhJYsH8vr//I4qbf6NvXrYttU01yPe4L3wb6w5/+7OV1CPoc6P3r2zq6iYpCDCSwSP0tHtRaV8SOp5pnVos2EtdERw+/CQDYN+Znavik5rnxplUN9/dv2FSIkcRAAovE31qTeUykNVJZTeTLQL7Mo5O3icRAAov/A3DOSL44rKXhAAAAAElFTkSuQmCC",
  _u =
    "data:image/png;base64,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",
  Pu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABHdJREFUeJztnE9oXEUcxz+RIsZqbKwFCVLdUBJBTzYFFaXbNlAvVkqLYP9YSrDeVHoSerAeei21t1RCKWoLogT0YkHbFEUFU0+tuCFkrUgQa5u0mkZEXQ9vf9m8Sd6+3Tczbwrv9zll3pv5zo/5fWfmzdvNgqIoiqIoiqIoiqIoiqIoiqIoilIMOvLqaPDDH2vt1P/8xUdzie2OPDq5nfE2ymbGO/s622o/PzEfK/tyhDrAtaBkvt2MpyGOcO0EdYArIV+ZN3HtBHWArYBk/pmB+wG4eHO+aX1b1ndFDvtq/Dpg7wR1QNaGeWfexJUTCu8AbwOwvqtzIUs29VrVyUrhHbCi3QZZ5/7k9BoA1vVcdVJP+pU4qMfV7lqgDvAlbDrj39n3oz96tgKNVTytnu/dRR2QtWFaZsy5XOmbBmBbSnuzXtqaYOsQdUBeHc30vgbAqXp5389/xO6fWntvVI+oHsZ9XxTeAdZnATn/m3P1k39OArBtxX4Abr59CYDRkaeAhgMk88L2oW8A6Hrr8WV1zH5s3w8U3gHO1wDJ0MyT8Tm/+fpvsXpm5oUb9Xqjxpow+e1drkMF1AHZzwJJ7/4a+/XyGc6K6IrDBIljUM8C2XC2Bsgz/CR7ogtr/4rdPzf6Qks6SfUk8+ZZwRZ1gGtBmavdU9H+LU+AWemeOl7XjZ4DKrNWcktQB7gWPHjgMQD63zgKQIXjsftpjpCMC/0TPQAMH4t0X63rukId4Epo+NhBAI6euBxd+OEs0MigYDrCxKwviO5w3WEL/VhSeAc4Ow2a3+hYM/JK0/anj2yJlXcd+qJp/atD78bKZr96GsyIs0+HJQMvbX22BjB37QYAG5/eAMCFr78DYOXq+wAY6O+L6YxXJmil3ZmzX3Ys129WCu8A613AzPxzmzbH7n/80SiwNKMmSZnfsXO7WbUGcEa/IeIG72+FJYNpTmgh814ovAOs51HS3E/i9+lfAPhpaip2/ZHeXgAe6HmoJZ3Pzp8DGrtCVgrvgNw+GRKSdoErv14DYMfO1hzgCnWArYDMwdNHttSgcd7/9MQ7Tds9/ODqWFkckMTzB14HGu8L9r1pN/cFdUDeHSbt7wM5xyGoA2wFauOHY3PfN9JPbTw6E3QMHNbnABucrwHmW13Xuq6dpg7wJTxyMvoMb2j/Hic6Lw/utY5pOdQBvjuQDN6uFN4BOgChAwiNszVA9umNu99zJRlDdC984Fa38A5w9p+jT/SXagD3eB7TP/kPgO8rVX0f4AJvAzA7d4vZuVverrtCHRA6gNDoAIQOIDSFHwDnvyGS9jwgK/qqlXe3dF1wvf8L6gBfwqVSqekvR3XfGS/P/N1cr1p1m3mh8A7I/ZMhwZzLaY7xReEdoAMQOoDQ6ACEDiA0OgChAwiNDkDoAEKjAxA6gNAEOwsA5YB9L6AO8KBZ9qC5WHfMpag6wIFG2YGGTX9jNmKFd4CP92zlxYVSqXR+cblarW5q1riF+mMWsS1BHZBDH2XL9mMOYkik8A5QFKXY/A8uypNH6Cpb8AAAAABJRU5ErkJggg==",
  Mu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABIZJREFUeJztnN9rXEUUxz+RIsYfwVgLEqSyIo2gTzZKFaXbEqgvtlRFEKtSgrVPtvQfsL6XIn2ySij1B4KoQZ8slGaLooLRJxU3hKyKBLG2SVfTiKjrw92T7Z3euzd759ydwj2fl829d+Z7hjnfmbkzuwQMwzAMwzAMwzAMwzAMwzAMwzAMwygDA/0KNP7eD61eyp9+6u6+tO2afgS5mimsl92MD24a7Kn+yuxK7LooR5gDtAUl871mPAtxhLYTzAFaQkVl3kXbCeYAXwHJ/MNjtwDwdXOla3lfNg9FDvts5gLg7wRzQN6K/c68i5YTSu+Awjpg89DgapZ8yq1VJy+ld8C6XivkHftzCxsAuGvknEo5iSvtoN2uXucCc0BRwq4z/l16O/pjZAfQmcWzyhW9upgD8lbMyow7luubFgDYmVHfLZc1J/g6xBzQr0CLd74EwMn29fM//xF7fnLjTVE5onI4z4ui9A7w3gvI/t8dqx//cwKAnev2AtB85VsApiYfBDoOkMwLuye+AGDo5XsTddw4vucDpXeA+hwgGVrcEh/z2y/8FivnZl642C435cwJc19ep91UwByQfy+QdvbXWa+TM5wX0RWHCdKOcdsL5ENtDpB3+Dn2RDc2/hV7fmZq15p00spJ5t29gi/mAG1BGavD89H6LW+AeRmeP9bWjd4D6ktecldgDtAWPLTvHgBGDx4FoM6x2PMsR0jGhYGxwwMA0w8caQG82NbVwhygJXT81UMAHH39u+jG96cAGJ0dATr7fDfDaUg9QXSPtx22GseT0jtAbTcou7INky8AsHz+IgBbH7ofgLOffxWr/9Frj8eud+3/MDGO1J+pzwJwbuINkuLabjAnat8OS+Yf3bY99vyD96eAK50g14LrELf8E0/uBuCT6TNAxwn27bAn3quAZODpHY8k/g5QMuc6IY20zKfF9cUc0K9AaU5w54SszF82x7QA3j31qc0BPng7QMa+O/sLvy/8AsCtI7cDnUz/OD8PwB23rY+VT8u8q6NF6R2g9jvB1szhFsCbp7v/KFzmgDTSHPDYvgNAZy8hu0RfSu8A9VXAzVSaI9yx/9Ov57WbsibMAf0OmDbGx/rcDsEc4Csgs7/v6W8WMqdInNZM9CbouxqYA7QFs2Z/X5rNZhRHSc8cUJTw5InoO7yJvXty1XN5bvxZ7zYlYQ7QEko770/LaK9sfeYtAM6+oyK3SukdoLYbvG+00gK4seA+/ZP/APim3rDdoAbWAaEbEJrCOmBp+RJLy5fWfD8U5oDQDRBCOeaq6YBQWAeEbkBo+n4m6BJ6RSi9A9T/h0jWnkAyfvMN1wOdd/vFv7vrDl8bfWrtAQRzQFHClUql66Ggm9Gs8o2GbuaF0jsg2CqgPZbzUnoHWAeEbkBorANCNyA01gGhGxCakLvBasDYq5gDCtCsFqB5uW5NU9QcoKBRTbrZaDS2AVQqlemk+4rxaj5i5gAFjVr7s5r0UCHjWXG9MAcoatXan1VFzW5xVCi9A4o8lanmqdRl1ah5tieR0jvAMIxy8z/sWqSPzTMTuQAAAABJRU5ErkJggg==",
  Tu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABHpJREFUeJztnEFoXEUYx3+RUoxto7EWJEh1gySCnmwUlZZu20C9WCktglotJVhvKj0JHqyH3qRob20JpagtlEpALxa0SVFUMHpScUPIqkgorW3SahoRdT28/bJ5k7x9u29m3hTe9zvlvTfzn4/5/jPzZnazoCiKoiiKoiiKoiiKoiiKoiiKohSDjrwaGjzzU62d8p8+80Ausd2SRyM3M9562cx4Z19nW/XnJ+Zj174coQ5wLSiZbzfjaYgjXDtBHeBKyFfmTVw7QR1gKyCZ3zhwJwDfXp9vWt6WDV2Rw74YvwrYO0EdkLVi3pk3ceWEwjvAWwds6OpcyJJNuVZ1slJ4B6xot0LWsT85vQ6A+3suOykn7Uoc1ONqdy5QB/gSNp3x7+z70R8924HGLJ5Wzvfqog7IWjEtM+ZYrvRNA7Ajpb5ZLm1OsHWIOiCvhmZ6XwHgZP16769/xJ6fXL8mKkdUDuO5LwrvAOu9gOz/zbH60T8nANixYh8A19/6HoCR4ceBhgMk88LOoa8A6HrzoWV1zHZszwcK7wDnc4BkaOax+JjfevVSrJyZeeFavdyIMSdMfn2r61ABdUD2vUDS2V9jvV4+w1kRXXGYIHEM6l4gG87mAHmHn2RPdGP9X7Hn50eebkknqZxk3twr2KIOcC0oY7V7Klq/5Q0wK91TR+q60XtAZdZKbgnqANeCB/Y/CED/a4cBqHAk9jzNEZJxoWPgYAfA6KNv1wBeruu6Qh3gSujoOwcAOHzsh+jGj+cA6J/oiZUzHWFilhdE92jdYQvtWFJ4BzjbDZrf6Fg3/FLT+qcObYtdP/fGZ03LXx46Hrs229XdYEacfTosGXh2+6YawNyVawBsfuIRAC58+Q0Aq9beDsBAf19MZ7wyQSv1Tp/7vGO5drNSeAdYrwJm5p/csjX2/MOzI8DSjJokZX7X7p1m0RrAaf2GiBu8nwpLBtOc0ELmvVB4B1iPo6Sxn8Tv078B8PPUVOz+fb29ANzVc09LOp+Mngcaq0JWCu+A3D4ZEpJWgV8uXgFg1+7WHOAKdYCtgIzBU4e21aCx3//42LtN691799rYtTggiaf2vwo0zgv2vm439gV1QN4NJq3vAznHIagDbAVq4wdjY9830k5tPNoTyJlhVtQBrgXNU13Xuq6dpg7wJTx8IvoMb2jfHic6Lw6+YB3TcqgDfDcgGbxZKbwDtANCBxAaZ3OArNObn3/PlWQM0b3wgVvdwjvA2X+OPtxfqgGs9tynf/IfAN9Vqnoe4AJvHTA7d4PZuRve7rtCHRA6gNBoB4QOIDSF7wDnvyGS9j4gM/odq25r6b7gev0X1AG+hEulUtNfjupeGb+e+bu5XrXqNvNC4R2Q+ydDgjmW0xzji8I7QDsgdACh0Q4IHUBotANCBxAa7YDQAYRGOyB0AKEJthcAygHbXkAd4EGz7EFzse6YS1F1gAONsgMNm/bGbMQK7wAf52zlxRelUml08XW1Wt3SrHIL5ccsYluCOiCHNsqW9cccxJBI4R2gKEqx+R9ISZQOcxlz8gAAAABJRU5ErkJggg==",
  Du =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAABJ1JREFUeJztnNFrHFUUh79KFWM1GmtBgrSsSCLYJxtBRem2LNSnlqoIYk0pQeuTlP4D1n+g1D6ZSqjVgiBqUF8slHZFUcHok4opIWtFgtjaxk3biGjXh5mT7dzMZHbnntkJzPleNjNz5ncv9/zm3jkzmwXDMAzDMAzDMAzDMAzDMAzDMAzDMMrAml41VHv/51Y38aefe7AnfbupF42sZnIbZTfjfUN9XZ2/eG4xsp2XI8wB2oKS+W4znoY4QtsJ5gAtobwy76LtBHOAr4Bk/omRuwH4rrm4YrwvW/oDh305dQnwd4I5IOuJvc68i5YTSu+A3AZgS3/fUpZ84jrVyUrpHbC22xOyXvszcxsAeGDwgkqctCv9IOxXt3OBOSAvYdcZ/82fDP4Y3AG0Z/G0uLxXF3NA1hPTMuNey9NDcwDsTDnfjUubE3wdYg7oVUOX738VgBPh9t5fFyLHT2y8I4gjiMM5nheld4B3LSD1v3utfvLvcQB2rt0HQPP1HwCYnHgMaDtAMi/sHvsagP7XNsfquO34Ph8ovQPU5wDJ0OVHo9f89kt/ROLczAt/hXGTzpww882t2l0FzAHZa4GkZ3/t9To+w1kRXXGYIP2oWS2QDbU5QO7hZ9gT7Nj4d+T4mcldHekkxUnm3VrBF3OAtqBcqwOzwfotd4BZGZg9GuoG9wHT815yyzAHaAsefPkhAIYPHAZgmqOR42mOkIwLw+cGARg/EujuD3W1MAdoCY0fOQjA4WM/Bjt+OgW0Myh1vpvhJOQ8QXTHQ4ctteNJ6R2gVg1KVbZh4iUARoaHAPj8q29jz//4zacj27te+SiyvfXxRyLnr1t/JwAXxt4irl2rBjOi9nZYMv/Utu0AfPjBJLA8k4LsF+S4G//Ms7sjcZ+dPQO0nWBvhz1R+4bI8zuebEHbAUKSE1wHCEmZF8QB7536wr4hooH3fUBS5gXJZJoT0jKfF+YAbcGLc78BcM/gfZH9klk5vune9QD8MjsLLJ8TknRucFoL/OeC0jtAbRVoTR1qQbva+/TYG7FxMhck4TrFdcBoLejympFDtgpo0LN3gy4yBwjnf/8zsi2Zl4wvPUfosJrsFHNArxtMWudHetwPwRzgK+DO/p0+8cmKtNOaCu4DfFcDc4CWULPZBGBASzDkndPBvx6N1gJn+b5ncDEH5CU8cfxk7P6xfXsy6YzWXvTuUxzmAC2hTRffBmDrC++uGJfkjE7RXmVK7wC1avDh4UoL4Pacx/QK1wH4frph1aAGNgBFd6BoVs0AzF+9xvzVax3v12LVDEBR5DYARWW0W8wBRXegaGwAimp4tcwFpXdAbr8iU6lUVvzdoIFbgk+pHcQNd627LTZeuwYQSu+Awt4MSSalily4OfiPkIV/rsfGNxq6mRfMAUV3QJyQNmfkRekdYANQdAeKxgag6A4UjQ1A0R0omiLvA6oFtr2EOSAHzWoOmjfq1jVFzQEKGlUFDRqNxjaASqVyNm7/Cu3Vfdo1Byho1MPPqoJWXMbT2vXCHKCoVQ8/q4qacbr12KiMlN4Bef6CexU6mtU7pe7Zn1hK7wDDMMrN/wW/r51jN78cAAAAAElFTkSuQmCC",
  ku =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3BJREFUeJztnE1IVFEUgD+jgoICwzZDCSOiUbt0UVA0gaCrSgqhIlsEtYto0aaN21q4aFcQERmFG7dJYRMt2ljQokiJpqIkMlMrFYKYFjMXfbcZ/+697xD3fBt9lzfnHs753p33p6AoiqIoiqIoiqIoiqIoiqIoiqIoSgzUpDVRW/+bosvnH3XtCJLrmhBB/yeCGWB3fEPTBqd4c6NzgH8T1ADfAU3nXTteDd8mqAG+ApnO72vdAsDzH3O+QlfElwnRG7BWOoHVYkyjbN5qTVADXAOkfez7Rg0IPUHL5tL5gG8zTDzXtUAN8BXI7vDI60EAWvYcSYy/HdsKQGNmPDEeypSlUANCBR5pGgPgkNXRP1N9pV8y7V7mcTVGDXANYFZd+ypwsuE8ALfL+53++BNYYIYVR+r8QQ3wFcg2gfpNAHSeeQbAwM29AExSMoOyEdW+FdJCDfAd8GHDfWC+09Pfv1bcz3TeFdf7AtEbIFaAxsy42HG/kOgNCH41ODRwuOK46xqg9wQ94d2AmtaeGoDiMEWYPyO0Mce/uWr0dW2wUqI3IPjT4eJwT0UTXnbUA3DuQi8AzTuTBiz3DFHPAxwJ/i1grwmG3huvALh+dldi22DfNwh1zRC9Aam9IWI43r6/CPDrSqnD5hi2nybb42bbYI/rGrBKUns2aDo/MzENzHdu49UuAGYv9Sf2t+8v2B2uNr5Sojcg+Bpgd95w9Fhnxf0fPB4C4N7g01TWp+gNCLYGmM7XrStN0VGl49KoAaEn+PBlAoDW8va3sU8A1GW2JfYz42kTvQFaAOkEpAm+Btjf9xe7twP/3h+ofXcNgBOXR0OnlCB6A7QA0glIowWQTkAaLYB0AtJoAaQTkCbce4LvS1d3n2/1Jca7204t63NpEb0BWgDpBKRJ/W+GDpy8A8CTu5XH00YNkJpYquM20RugBZBOQJrUCjA1M8vUzOyyx9NCDZBOQBotgHQC0kRfgOBvYexuzpbeFP29+H6160s/X4wUUn1zTQ1Ia6JsNrvof5IqFNLtvCF6A7QA0glIowWQTkAaLYB0AtJoAaQTkEYLIJ2ANCGfC+Qc9897yWIJ1IAAMXOB4+Q9xQfUAC8G5DzEcJkv7xJMDfAQI29t51by4UKhcNBxPieiNyCN+3A5x8/nPeRQlegNUBQlbv4C9xwKmCUyDssAAAAASUVORK5CYII=",
  Ru =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA89JREFUeJztm01IlEEYgJ+NjNSKCrtICSthUbf0UFC0QWCnSoqgojoEdYvo0KWL1zp06FYg0Y8UXrwmSSoduljQoUiJvoqS6M/+haC2w7eT7rir684fNe9z0R1m3xnmfeb9vm92FwRBEARBEARBEARBEARBEARBEARBEIT/n4yvgbb3PMmbvL9/31onc53nIui/hDMD9IzXttQaxZsYnQDsmyAG2A6oMm+a8XLYNkEMsBVIZX5z23IA7n+ZsBW6JLZMiN6A+aEnUC3KNArmVWuCGGAawPfet40Y4HqA1iXp/YBtM1Q801ogBtgKpGd45HEfAK0bdxe1Px1bAcDqxndF7a5MmQ0xwFXgkZYxAHZqGf316Xr6T2O7lXFMjREDTAOoqqs/BY43nwDgSqHfkZdfgSlmaHFC3T+IAbYC6SbQtBiAjqP3AOjt2gTAOKkZFIwod1XwhRhgO+Dt5pvAZKY/f3xbsp/KvCmm5wLRGxBsAVY3vgu276cSvQHOnwbv9O4q2W5aA+RM0BLWDci0dWYA8sPkYfKOUEftf/XUaOvZYK5Eb4DzT4fzw50lTXi4owmA4yfPA7BmXbEBld4hyn2AIc6vAnpNUJy/9AiAi8fWF71W6OcGrp4ZojfA2zdEFPvbt+QBvp1NM6z2sP5pst6uXiv0dqkBVeLts0GV+e8fPgOTmas7tw+AH6d7ivrr5wt6hsu1z5XoDXBeA/TM79nbMWP/WwN3ALjRd9dLfYreAGc1QGW+oSYdYscsmQ+FGOB6gBdvPgDQVnj9fuwVAA2NK4v6qXbfRG+ALEDoCYTGeQ3Qr/unDq8Cpp8PLHt2AYADZ0ZdT6mI6A2QBQg9gdB4/6Zoub1/td/oByVVE70BsgChJxAaWYDQEwiNu+8JPk+f7l5fTk9/h7oPATBepn9Xod83fruaUknEAF8DbT14DYCh7tLtoYjeAGcnrxvWZPMAi6pcY1ULHowkTk+HozfAeg0wzbxv/o1ZOsTbVeDT9x8ALK2vq6i/MkgZ5aoWiAGhJ1DODNU+v36h0/GjN0AWIPQEQmO9Bqhqnc1miw/5atK9vNT2gIZEb4D1a+u0zFfJsgXpX3kWcIz3+4AkKVMjNMZ/+plP9AYEW4AkSTLKhpBEb4C1GmCr+vtGDPA1ULX7XZnlql6IAR7HypVqTJJkG0A2mx3wOJe/iAHVvtF31XdVC6I3wHg1KzVB7fUK4s1YC0rEGawkbjmiN8D4KjBlT+ZgegYrzXwF41jNvCJ6A1zcXeVM3lyBQYMm8XXEAIexc5bjDVqOB4gBgiBEzh8iUkWshb00nAAAAABJRU5ErkJggg==",
  Qu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA29JREFUeJztnE1IVFEUgD+jgoICwzZDCSOiUbt0UVA0gaCrSgqhIlsEtYto0aaN21q4aFcQERmFG7dJYRMt2ljQokiJpqIkMlMrFYKYFjMXfbcZ/+697xD3fBt9lzfnHs753p33p6AoiqIoiqIoiqIoiqIoiqIoiqIoSgzUpDVRW/+bosvnH3XtCJLrmhBB/yeCGWB3fEPTBqd4c6NzgH8T1ADfAU3nXTteDd8mqAG+ApnO72vdAsDzH3O+QlfElwnRG7BWOoHVYkyjbN5qTVADXAOkfez7Rg0IPUHL5tL5gG8zTDzXtUAN8BXI7vDI60EAWvYcSYy/HdsKQGNmPDEeypSlUANCBR5pGgPgkNXRP1N9pV8y7V7mcTVGDXANYFZd+ypwsuE8ALfL+53++BNYYIYVR+r8QQ3wFcg2gfpNAHSeeQbAwM29AExSMoOyEdW+FdJCDfAd8GHDfWC+09Pfv1bcz3TeFdf7AtEbIFaAxsy42HG/kOgNCH41ODRwuOK46xqg9wQ94d2AmtaeGoDiMEWYPyO0Mce/uWr0dW2wUqI3IPjT4eJwT0UTXnbUA3DuQi8AzTuTBiz3DFHPAxwJ/i1grwmG3huvALh+dldi22DfNwh1zRC9Aam9IWI43r6/CPDrSqnD5hi2nybb42bbYI/rGrBKUns2aDo/MzENzHdu49UuAGYv9Sf2t+8v2B2uNr5Sojcg+Bpgd/7osc5F93/weAiAe4NPU1mfojcg2BpgOl+3rjRFxxKdl0INCD3Bhy8TALSWt7+NfQKgLrMtsZ8ZT5voDdACSCcgTfA1wP7ev9i9Hfj3/kDtu2sAnLg8GjqlBNEboAWQTkAaLYB0AtJoAaQTkEYLIJ2ANOHeE3xfurr7fKsvMd7ddmpZn0uL6A3QAkgnIE3qfzN04OQdAJ7crTyeNmqA1MRSHbeJ3gAtgHQC0qRWgKmZWaZmZpc9nhZqgHQC0mgBpBOQJvoCBH8LY3dztvSm6O/F96tdX/r5YqSQ6ptrakBaE2Wz2UX/k1ShkG7nDdEboAWQTkAaLYB0AtJoAaQTkEYLIJ2ANFoA6QSkCflcIOe4f95LFkugBgSImQscJ+8pPqAGeDEg5yGGy3x5l2BqgIcYeWs7t5IPFwqFg47zORG9AWnch8s5fj7vIYeqRG+Aoihx8xf+3AqYtJlQCQAAAABJRU5ErkJggg==",
  Ou =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA91JREFUeJztnEtIVUEYgD9DI7WiojaSwpXQqF26KChQCHRVSSEUZIugdhEt2rRp06IWLtoVhBSa4aZtkpjioo0FLYqM6PSU6KXmC4K6Lc6d9Iz3+rhnHtfO/230TOf+M8z/zT/nzJVAEARBEARBEARBEARBEARBEARBEARB+P8pctXRwZ6X6Tif72vdaWWsa2wEXU1YM0DPeGlNaax4s69mAfMmiAGmA6rMx814LkybIAaYCqQyv79+CwBPfs6aCp0VUyYk3oBi3wPIF2UaGfPyNUEMiBvA9do3jRhgu4O6jeHzgGkzVLy4tUAMMBVIz/DIi14A6vYeibS/Ht0GwI6Kr5F2W6YshRhgK/BIzSgAh7SM/h7vDH+paDLST1xjxIC4AVTV1d8Cx6rPAXA7c9+p95PAPDO0OL6eH8QAU4F0E6jaAEDL6ccA3L+1D4AxQjPIGJFrV3CFGGA64MPqe8Bcpid+fMl6n8p8XOKeCyTeAG8TsKPiq7d1P5/EG2D9bbD//uGs7XFrgJwJGsK4AUX1l4sA0sOkYe6JUEetf/XWaOrdYKUk3gDr3w6nhy9nNeFZcxUAZ8+3A1C7K2rAcp8Q5TkgJtZ3Ab0mKNpvPgfgxpndkWuFfm5g650h8QY4+wsRxfGmA2mAqathhtUa1r9N1tvVtUJvlxqQJ86+G1SZn/4+AcxlruxaKwAzF3si9+vnC3qGc7WvlMQbYL0G6Jk/eqxl0fsfPOoHoLt3yEl9SrwB1mqAyvzWkrCL5iUy7wsxwHYH7z5/B6A+c/1t9CMAWyu2R+5T7a5JvAEyAb4H4BvrNUDf9y+0VQILzwc2v7kOwIlLr2wPKYIY4HsACmXE3SvhdXfvkJN+xQDXHd7pCw+G2g6Gaz7XqbErEm+ATIDvAfimYHYBhaoJ6hRZnSrbQgywFXjkbfh296mjM+u/3+oIfw52hT997QaJN8Da+tpTm0oDrF/mHA92nYxc2177CjHAVuCVGqAzxR8Ano4EsgvYxPguEDfzrlkdo7SIsyfB8ekZADaVly3rfmWQMspWLRADfA8glxmqvbh8ndX+E2+ATIDvAfjGeA1Q1TqVSkX/15iScC1P/gqf8CrXFsbcF8YoPOJtF/iQMUE34x+Z9kDeBexi3IAFaz8HQZCjVjhGDHDdocp8oZB4Awp+AlKpVNpmnSj4CbCNsRqQb5Z87wZigKuOgiBozPzakM/nlSGmd5HEG1AwExAEQeM8S5xRMBPgi7xrgOuqvUgNGYgTVwzI94Ou9u9F6sKAifiJN8D4m5luhIXKPmAymBhgMXaD4XgDhuMBYoAgCAnnLxD7TgDSgHLDAAAAAElFTkSuQmCC",
  Uu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3tJREFUeJztnDtoVEEUhj9FBBUVX03UwAZR0U5tBB8bEWKliBJQwUawtAhiY2NjYyFipxDEF0pQAlYGX6sGbKKdYkRcFQniK/GViK9YbMZkL9k1mzszR7j/1yR3MnPOzzn/DnfuXQJCCCGEEEIIIYQQQgghhBBCiCwwIVTgjW2PB9Osv968NJi2kUyMkeR/xnuVXeenLJ6SKs7Ak4Gy61COkAN8BfLV+Uo4R/h2ghyQNkDozjtWzijF7+z6APhzQuYdMGm8C13n16yaDcD9TwNV5/+vyAHWAsaKc5hzHEMOTLsXyAG1Loj12Xe7fui9RQ6InbBSZ5/2zANgUd3bsvHuRx0ALFnWNOq6tMgB413ouxO/+s6Vfqkr73T34h4ANnvNNowcEDthJeckO326fjoAvewrDbz8DPg/FcoBVomTu35vQ6nTp4f+vnXPPQDaW1cDeh4QjJod4Drg6zmAcwL138rGP354U3Z9reEi4P8hphxgLWD4zm+6SX45YLwLfe0FlfaAm+1bxiutJuQAq8Tu3t+d8irtAbOeHQdgwqpDejMUgtRPhf/12a90zne07F1e+uXqy7Lx0J13yAG+AyY7njznO04cawHg6MmHAFwZ6rgjdOcdcoCvQO60Nh/3WS7tDfWT1o06//D+rhGzYOfBGwBc6LgbpfOOzDvA29vh5Dk9OZ78ztDUI80A9B9oK7ueNmcmEM8JckCsRDua1g4CbGrcUHXe5UvtQDwnyAGxEo3VAY6uzjsAvPvxEwjnhMw7IPpp8F3PKwDm1i2oOv7i9XtgeC8IReYdoAJYC7Am+h7QsnshMPwmyOHO/2eul24Yt23fCsDVWzeD6sm8A1QAawHWqADWAqxRAawFWKMCWAuwJtqdYPfzV2Oa13rqXNn1F36HkPOXzDtABbAWYE300+D6XWcBuH1+9PHYyAFWia06niTzDlABrAVYY1aAvq/99H3tH/N4KOQAawHWqADWAqzJfAGifiMLYMWS3CBA7/fq82ZNLv180F3UN0RCEt0BjlwuV/U/TRWLYTvvyLwDVABrAdaoANYCrFEBrAVYowJYC7BGBbAWYE3M9wL5lPMLXlQkkAMCxMwHiDkybsFnUDnAQ4y8hxhp8hXSBMu8A0I8dcnXMjmXy90abbxYLDZWWFKoUU9V5IAIOfIp1xc8aKhI5h0ghMg2fwA4TvoTsRxZ9gAAAABJRU5ErkJggg==",
  Fu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA9ZJREFUeJztmk1sVFUUx38lmEgR+RA3FZs8QlqCO2BjAjolTXAlIRoSNHRDwpJFQ9iwccOGBSHsNGlMQaNpME1ctRHaKiRuqjuNNcRRAg3hq0Voa4oyLt5cZ97LzDDz5n4U3/+3mffu3HvOyT3/e+be9waEEEIIIYQQQgghhBBCCCGEEEL8/+lwZbh/5JdSO+MvH9ruLLZqVvlwspKxPssm82t61rRlZ+nXpcS9K0VIAbYM2cp8PYwibCtBCmjXgOvMG3a9HNu/Nv0AsKeE3CtgddaBJvN7dm8C4Ic/lxr2X6lIAaEDaBajMKM4ygpstxZIAa0O8LX2TdV3XVukAN8O62X2+uyrAGzrupton/l5HIDeHftrjmsXKSDrQNuZ+Gf+s/iiK5npmZ5ZAN616q2CFODbYT3lpDM93L0OgDmOxw03HgH2T4VSQCjH6ao/tzXO9HD5+4NHvwdgdOhNQM8DnNGyAkwGbD0HMEqg+69E+8MHdxL332z9ErD/EFMKCB1AZee3Loh/KSDrQFu1oF4NmBg9kDW0lpACQjk2e39zyqtXAzb+dh6Ajt0f6c2QC9p+KvystV/vnG8YPPZGfDF2I9HuOvMGKcC2wXTG0+d8w8fnBgE4+8lPAHxdzrjBdeYNUoAtQ+a09hpmLce1oXv1WzX7nz4xXdULPjh1BYAvxq96ybwh9wqw9nY4fU5Pt6f/M9R55hAAiydHEvdrX1kP+FOCFODL0eH9e0sA7/Tta9jvq0ujgD8lSAG+HDWrAMP0te8AuPfkb8CdEnKvAO+nwXuzNwHY3LWlYfsft+8DlVrgitwrQBMQOoDQeK8BgwOvA5U3QQZz/r9wOd4wvvf+QQDGJiecxpN7BWgCQgcQGu81wKzxgf54zZtaYD5Nu+nnmtwrQBMQOoDQaAJCBxAab78CM7/Hp71bn8bvCQb6jzTsP1Tu95inTuOSAkI5fvvDiwB8+3ntdl/kXgHOnwnu7I1KAC9lnGtTA36cKeqZoAuC/0vsWRjlGCXZVoIU4Mpw1rU/v7AIwIa1nfaDqkHuFeB8AuYXFv/LajPtvpECQgcQmtxPwIrbBzx64cX4czl5CiwWtRN0grezwNyyHXu2lZB7BTivAc1m3mQ2iiI/LwTKSAGhA3BV3Zsl9wp47iYgiqKSzTrx3E2AbZzVgKxZ8v1rIAWEclwsFvvKl4VQMYAUYF8BvtZu2k/W/YQUYMFGoZXOVWvfCu3uJHOvAJv78EL1TRRFk7U6taqAtJ2q8VOt2KmHFODAZqH6pkEGszLV5vgEUoBD2wXL9qYs2wOkACFEzvkXV0o7etsBK9gAAAAASUVORK5CYII=",
  Gu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA3tJREFUeJztnDtoVEEUhj9FBBUVX03UwAZR0U5tBB8bEWKliBJQwUawtAhiY2NjYyFipxDEF0pQAlYGX6sGbKKdYkRcFQniK/GViK9YbMZkL9k1mzszR7j/1yR3MnPOzzn/DnfuXQJCCCGEEEIIIYQQQgghhBBCiCwwIVTgjW2PB9Osv968NJi2kUyMkeR/xnuVXeenLJ6SKs7Ak4Gy61COkAN8BfLV+Uo4R/h2ghyQNkDozjtWzijF7+z6APhzQuYdMGm8C13n16yaDcD9TwNV5/+vyAHWAsaKc5hzHEMOTLsXyAG1Loj12Xe7fui9RQ6InbBSZ5/2zANgUd3bsvHuRx0ALFnWNOq6tMgB413ouxO/+s6Vfqkr73T34h4ANnvNNowcEDthJeckO326fjoAvewrDbz8DPg/FcoBVomTu35vQ6nTp4f+vnXPPQDaW1cDeh4QjJod4Drg6zmAcwL138rGP354U3Z9reEi4P8hphxgLWD4zm+6SX45YLwLfe0FlfaAm+1bxiutJuQAq8Tu3t+d8irtAbOeHQdgwqpDejMUgtRPhf/12a90zne07F1e+uXqy7Lx0J13yAG+AyY7njznO04cawHg6MmHAFwZ6rgjdOcdcoCvQO60Nh/3WS7tDfWT1o06//D+rhGzYOfBGwBc6LgbpfOOzDvA29vh5Dk9OZ78ztDUI80A9B9oK7ueNmcmEM8JckCsRDua1g4CbGrcUHXe5UvtQDwnyAGxEo3VAY6uzjsAvPvxEwjnhMw7IPpp8F3PKwDm1i2oOv7i9XtgeC8IReYdoAJYC7Am+h7QsnshMPwmyOHO/2eul24Yt23fCsDVWzeD6sm8A1QAawHWqADWAqxRAawFWKMCWAuwJtqdYPfzV2Oa13rqXNn1F36HkPOXzDtABbAWYE300+D6XWcBuH1+9PHYyAFWia06niTzDlABrAVYY1aAvq/99H3tH/N4KOQAawHWqADWAqzJfAGifiMLYMWS3CBA7/fq82ZNLv180F3UN0RCEt0BjlwuV/U/TRWLYTvvyLwDVABrAdaoANYCrFEBrAVYowJYC7BGBbAWYE3M9wL5lPMLXlQkkAMCxMwHiDkybsFnUDnAQ4y8hxhp8hXSBMu8A0I8dcnXMjmXy90abbxYLDZWWFKoUU9V5IAIOfIp1xc8aKhI5h0ghMg2fwA4TvoTsRxZ9gAAAABJRU5ErkJggg==",
  zu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA7dJREFUeJztmjloVEEYx38RBY331UQNRERFO00jeGxU0EoRRVDBRrC0CGJjkyaNhYidgoUHKkEJWCnGKCrYrHaKEfHhQRCPJF6JxGMtdsfkPbObZHeOxff/NcmbvPfNMN9vvn0zGxBCCCGEEEIIIYQQQgghhBBCCPH/U+Mq8Oa2p7lKnu/YvdzZ2IYzwUcn1Yz1WTaZn7J0SkVxBp4NxK5dGSEDbAWylfliGCNsmyADKg3gOvOG1TPy8e9newB7JqTegInlPmgyv7ZxDgAPPw+UvL9akQGhBzBWjGHGOAoGVloLZMB4H/C19k3Vd11bZIDvDotl9nn3fACW1L2PtXc9uQHAshVbRnyuUmRAuQ/azsSvvgv5X+rime5a2g3ANqu9DSEDfHdYzJxkps/WTwegl0P5hldfAPu7QhkQquNk1e9dnM/02cLfdxx4AED7mTWAzgOcMW4DTAZsnQMYE6j/Hmv/1PMudn1z8WXA/iGmDAg9gKE3v+lB+pcB5T5oqxYUqwGd7dvLHdq4kAGhOjbv/maXV6wGzH5xEoCaxhZ9M+SCik+FR1v7xfb5huaDK/O/XH8Va3edeYMMsB0wmfHkPt9w6kQzAMdPPwbgWiHjBteZN8gAW4HMbm0BZi3na0P9xPUj3t96ODvsLth79BYAl27c85J5Q+oNsPbtcHKfnmxP/s9Q7bHdAPQfaYtdT507E/Bnggzw1dGeLetyAFubNpa87+qVdsCfCTLAV0djNcCQvX8XgA8/fgLuTEi9Ad53gx+63wAwr25hyfaXbz8CQ7XAFak3QBMQegCh8V4DmvcvAoa+CTKY/f+5jvwL485dOwC4frvT6XhkgK+OLrZuAv7NfGhkQOgBJNe+b1JvgCYg9ABC47wG5LItOai+6m+QAaE6NtV/w77zJe/7ym+n45ABrjsw3/DkssQ+6EfLvC9Sb4DzM8FVyxpyANPKnGtTAx51RToTdEHwvcBoGHOMSbZNkAGuApe79vu+9QMwa2qt/UGNQOoNcD4Bfd/6/2Z1LO2+kQGhBxCa1E9A1bwHvB4s7PomTQbgy2B8FxhFehN0gvO9QENDg5XjXhngiOAGmMyO1RTbJqTegKqZgCiKalyt81JUzQSEwtl7gK3q7xoZEKrjcte7MctWvZABtgOOY+1nRmqMoqipEOe2rTGVQgb47tBkuFqQARZiZIZf+FrDyVpT7qeCDLAQ407hZ2Z4oy8TKn0fSL0BLnZfGZvBkgbpPMAyLvffGcvx7liOB8gAIUTK+QNl+j2CqDDtQQAAAABJRU5ErkJggg==",
  Nu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA2VJREFUeJztnD9oFEEUxr8TES5KMMI1dmuh1iY2EslFAomFhUQC4h+QoKVWWqfWSkslWBgJBIOFhQiCFww2ntYqwevSCCaI5kDQtbib5HbM3d7uvLl3MN+vym5mvnm8983M7dxyACGEEEIIIYQQQgghhBBCQqHQq4Emlj7FWdq/njnek9j29GKQfsZblu2KF48WM/Wvf6knrn05gg6QFjSVz1rxNIwjpJ1AB0gJ+aq8jbQT6ABXAVP50ZFDAIAPP+od27syPNhw2Gr1OwB3J9ABeTv2uvI2Uk4I3gHeEjA8WNyukku7bnXyErwD9mbtoD33DWZcEweacWVdC+gAX8JpzjDzOq2db4fRAXk7ulZGqrKuOsE7gAnQDkAbJkA7AG2cnwZ9nwCl4XpCFLwDmADtALTJPG/6Ze7b5F0LgncAE6AdgDY9S8Daeglr6yWxdlLQAdKCviroSzd4B4ifCf7ZXGj8cXiyq/vS/bMSvAPEngbtd3ra3bf/b0hrl6bPp8GciL0fYCpwcfJ0DADfZh8BAM6u3gMArLx7n+i3dWcpcT1wdyZxPXbqJADg5ehtAEBp/joAYPHV28Ju4+YleAc47wJ25afGzwAAlk1Fm5W0sSveDtNu6sJ5cysGgEW+IySDt+8Gp5sVW372HMDOnO4Ws2ZM71TeC3SAq4A999th7wJ5aRmnsRY0d4W80AG+B/A9h10J3gFi7wrH1bkYADaO3AQAvHh4X0oaAHDuxi0AwNDXBwCAwsgcPwdIwARoB6CN8y5gz33fmHHiauNzgOtaQAdIC5pV2peutNPoAF/C848bp7iz1y6L6FyduOIc027QAb4HMBXsV4J3ABOgHYA2TIB2ANqI7QLmk9rYpSdSkgmM7spTWd3gHSB2InTiWBQDwIFmTjd/bQEADu4fSLRzvf8TfwEAHz/XeCIkAROgHYA2TIB2ANqI/4qMvRvYZN0FDNKrv4EO8CUcRVHH3w4b2pe83vjdWa9Wk628IXgHeD8Raoc9l9Mc44vgHcAEaAegDROgHYA2TIB2ANowAdoBaMMEaAegjdqzAICy4tjb0AEeNMseNFt1K5KidICARllAw2W8iotY8A7wcc5Wbr2IouhN63WtVhvv1LmL9hWH2P6DDujBGGXH/hWBGNoSvAMIIWHzD3+ZFlIPBYi3AAAAAElFTkSuQmCC",
  Hu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA5VJREFUeJztnEFIVFEUhn8jAi0kIzfSZlxU67RNGI4l2DYUQcpCpG27oqWbNrVrGxKkJUjSsgLJkaJN1rpCnE24KVKGVAhqWsyc0XnMzPO9e+4c4f7fZpw39/73cM5/73v3zRsBQgghhBBCCCGEEEIIIYQQEgYtzRpocP5LMUn7xdGzTYntUDMGOch4y3K04q2nWxP13/m2U/XelyPoAG1BqXzSischjtB2Ah2gJeSr8lG0nUAHuApI5ft6TwAAPhV2GrZ3pae95LD3K78AuDuBDkjbsdmVj6LlhOAd4C0BPe2tlSq5tNuvTlqCd8DhpB2s574g40ocKMeVdC2gA3wJxzlD5nVcO98OowPSdnStjFZlXXWCdwATYB2ANUyAdQDWOO8Gfd8BisP1DlHwDmACrAOwJvG8OShzP0ratSB4BzAB1gFY07QErK53YnW9U62dFnSAtqCvCvrSDd4B6vcE/27Olv7oGtrXce3+SQneAWq7wegzPfWORz8X4trF6XM3mBK15wM6p28BAK4MXAIAzHSPAQDaHowCAPovnAcALH/4CADYvjtfpSPtBGn/qu8OAGB8bQ4A8HrpLQDgx+RjAHw+wBnns4BUYGzoYtVzgVKxhTr9ohWvR6XdyNWa47pCB/geYLhcuYUXLwHszu04ZK0YjlRe1hgARQCYe/OOa4ALzg6Qub+nMlX8XP9e9V4qmxTROdl1KlX/etABvgeQig2PuFVuYuohAKBj7REA4OY9t7kv0AGuArIKP79/uQgAG923AexW6ulioh+KNJ3gHcAEWAdgjfMaUFyZqpr7vpA1RcYprpSuBFt6p3gl6IL6dYDv1b9QKJTGUdKjA3wJTz8p3cWdnLieql+UG4PjzjHVgg7QEpK5H6VeRZPSf20GALD8TEWuQvAOUPvd4LkzmSIAHPOc09/4BwD4/DXP3aAGTIB1ANYwAdYBWOMtAZtb29jc2t73cSvoAOsABCvHHJgEWOH9ewEttK8AheAdoP5fZOL2BDKfjx9tA7Bb2Y0/jXXzed3KC3SAL+FMJtPwpmDHkdKrzOm49nSAJ8zOAtqreVqCdwATYB2ANUyAdQDWMAHWAVhjuRvMGo5dgQ7woJn1oLlXN6cpSgcoaGRrHczn8wMAkMlklmodVxwv5yJGByho5Mqv2VofKlQ8blwn6ABFrVz5Nauo2WgcFYJ3gM+7Mtk0nRqcNXKO8dQkeAcQQsLmP4DlNuAz7Od7AAAAAElFTkSuQmCC",
  Lu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA2VJREFUeJztnD9oFEEUxr8TES5KMMI1dmuh1iY2EslFAomFhUQC4h+QoKVWWqfWSkslWBgJBIOFhQiCFww2ntYqwevSCCaI5kDQtbib5HbM3d7uvLl3MN+vym5mvnm8983M7dxyACGEEEIIIYQQQgghhBBCQqHQq4Emlj7FWdq/njnek9j29GKQfsZblu2KF48WM/Wvf6knrn05gg6QFjSVz1rxNIwjpJ1AB0gJ+aq8jbQT6ABXAVP50ZFDAIAPP+od27syPNhw2Gr1OwB3J9ABeTv2uvI2Uk4I3gHeEjA8WNyukku7bnXyErwD9mbtoD33DWZcEweacWVdC+gAX8JpzjDzOq2db4fRAXk7ulZGqrKuOsE7gAnQDkAbJkA7AG2cnwZ9nwCl4XpCFLwDmADtALTJPG/6Ze7b5F0LgncAE6AdgDY9S8Daeglr6yWxdlLQAdKCviroSzd4B4ifCf7ZXGj8cXiyq/vS/bMSvAPEngbtd3ra3bf/b0hrl6bPp8GciL0fYCpwcfJ0DADfZh8BAM6u3gMArLx7n+i3dWcpcT1wdyZxPXbqJADg5ehtAEBp/joAYPHV28Ju4+YleAc47wJ25afGzwAAlk1Fm5W0sSveDtNu6sJ5cysGgEW+IySDt+8Gp5sVW372HMDOnO4Ws2ZM71TeC3SAq4A999th7wJ5aRmnsRY0d4W80AG+B/A9h10J3gFi7wrH1bkYADaO3AQAvHh4X0oaAHDuxi0AwNDXBwCAwsgcPwdIwARoB6CN8y5gz33fmHHiauNzgOtaQAdIC5pV2peutNPoAF/C848bp7iz1y6L6FyduOIc027QAb4HMBXsV4J3ABOgHYA2TIB2ANqI7QLmk9rYpSdSkgmM7spTWd3gHSB2InTiWBQDwIFmTjd/bQEADu4fSLRzvf8TfwEAHz/XeCIkAROgHYA2TIB2ANqI/4qMvRvYZN0FDNKrv4EO8CUcRVHH3w4b2pe83vjdWa9Wk628IXgHeD8Raoc9l9Mc44vgHcAEaAegDROgHYA2TIB2ANowAdoBaMMEaAegjdqzAICy4tjb0AEeNMseNFt1K5KidICARllAw2W8iotY8A7wcc5Wbr2IouhN63WtVhvv1LmL9hWH2P6DDujBGGXH/hWBGNoSvAMIIWHzD3+ZFlIPBYi3AAAAAElFTkSuQmCC",
  Xu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACACAYAAAC7gW9qAAAAAXNSR0IArs4c6QAAA59JREFUeJztnEFIFFEYx/9GRVpIRnuRINZDdU67ROEaC9YxCkFKI6Rrx+jouU51LMRIQZCiQ5cCyY2kS9a5QtxLeElK1lwhyO0w+5k7jDs78763b+P9f5dxZ9/7v4/v+78388ZhAUIIIYQQQgghhBBCCCGEEOIHbc0aKD/7uZKk/dzQqabEtqcZg7Qy1rIcrnj7ifZE/Te/btZ8tuUIOkBbUCqftOJxiCO0nUAHaAnZqnwYbSfQAaYCUvlzfUcAAB9Lm3Xbm9LbGThsYfEHAHMn0AFpOza78mG0nOC9A6wloLezfbtKJu0a1UmL9w7Ym7SD67kvyLgSB6pxJV0L6ABbwnHOkHkd1862w+iAtB1NK6NVWVMd7x3ABLgOwDVMgOsAXGO8G7T9BCgO0ydE3juACXAdgGsSz5tWmfth0q4F3juACXAdgGualoCllQyWVjJq7bSgA7QFbVXQlq73DlB/JvhnbTr4o3uwofPa/ZPivQPUdoPhd3p2Ox/+XohrF6fP3WBK1N4PyEzcAgBcHLgAAJjqGQYAXFq4DwB4+/5DTb/yndmazx33hgAA/WfP1LSXdiPLMwCAV/NvAADfxx4D4PsBxhhfBaQCw4Pna94LlIqiWtEw29/HIJXfbVxT6ABTAam8zH3hytXLAIDnz14A+De345C5L/1tQwdoC66ufAMAHO0+VnM+fBVIq7PDaRUAmHn9jlcBE9TeFK0sjlcA4GfPbQDAy0cPtKQjkfsBOsAQa2+IaDGaDwoszupafggAuHHXrPKC9w5gAlwH4BrjNSC8+ssctYWMU1kM7gPa+sZ5FTBB7SpQKpUAAF1aglWezgWbzNF84CxxgBZ0gC3hicnpyPNjN6+n0hnNjxjHFAUdoCV0fPUJAKD/2lTddrs5o1G0rzLeO0BtN3j6ZLYCAIcs5/QXtgAAn74UuRfQgAlwHYBrmADXAbimZRKwtlHG2ka54fNatEwCXGEtAa4qmhTvHaC2F5A7M7kj/F/w3gHWfkcom63vhK79wVH2DrIuHD7YEdleew8geO8AZ/8ZCq8Z6/sOAADWf29Fti8WdSsv0AGuAxAnxK0ZtvDeAUyA6wBcwwS4DsA1TIDrAFzj8j4g53DsbegAC5o5C5o7dQuaonSAgkZOQQPFYnEAALLZ7HzU+TrjFUzGpQMUNArVY05BK6riceMaQQcoahWqx5yiZr1xVPDeATZ/wz8HNLSqN0rBMJ5IvHcAIcRv/gIj1Tzr0+v6lwAAAABJRU5ErkJggg==",
  Vu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAnFJREFUeJzt3DtOxDAYRWEPSosQK6CjQLRUVCyOFc0aqGjZB0IsAKoUE2mUlx379znfAkKSub7MOLFP5/e3vySsm9onoLqG15fnqifw8fmVUkqp9nlQ2QBwBgDOAMAZADgDAGcA4AwAnAGAMwBwQ+0T6MX3z2+R497f3RY57sgGgLMBMik9UkuxAeAMAJwBgBuufXuN+j9Ny4yfuw0AN0QZ6aV+Z09FuR97jddpA8CFmQegjMyj2QBwBgDOAMAZADgDAGcA4AwA3MnVwWw2AJwBgDMAcMPT40PWAzpnv0wr+yLYAHBh3gdQGTYAnAGAMwBwBgDOAMBlfyfwqLd3t/JXzyUbAC57AzjCYrEB4AwAnAGAMwBwBgDOAMAZALgwq4PnRN2nrzYbAK6bPYKine9WuZvOBoDzncBgcn9eNgCcAYAzAHAGAM4AwLk/AJwNAGcA4AwAXLb9AbbOULWyTp5i+izBBoAL9yyg9sqjaPdranr+NgBcuDeCoo/A1tgAcAYAzgDAGQA4AwBnAOAMAFy4eYDW1J6ZHG2dH7EB4FY3wNLEU2bsol+nDQC3ugGiJ16XbAA4AwBnAOAMAJwBgLu6Q8io12/9e2fwotyXueu0AeDCvRWcC+W6567TBoDb/DQw91OwtcejjODSbAA49weAswHgDACcAYAbXJdfRyv7ItgAcAYAzgDAGQA4AwBnAOAMANzutYFHrY3z6V8ZNgDc7gZwZMZmA8AZADgDAOcOIY0rvW7DBoDrrgF6m5co/XdsALjuGsB5iXVsADgDAGcA4AwAnAGAMwBwBgBudo+gkb+v6yo1w2kDwLk/AJwNAPcPQf1gdFJ3IyIAAAAASUVORK5CYII=",
  ju =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADRJREFUWIXtzkERADAIBLGjajp1gH9hRQafrIFNvds/i53NOQAAAAAAAAAAAAAAAAAAQJIM4cUByjxR9UEAAAAASUVORK5CYII=",
  Yu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABUmlDQ1BJQ0MgUHJvZmlsZQAAGJV1kL1LQmEUxn83DSGDHAobHCQaCizqJjQ0mYMEDWLZ1xBcr6aB2uWqRWsg9Bc0Nbe0RBEuDQ2tTX1RUw1Be+RScjs3LbXowMPz4+HhfQ8HOtAMI+sEcvmiGYtM+5eWV/yuFxx4cBPEq+kFIxSNzkqFb2+f6i2K7Vcj9lv3kTdf8Ol559F7cxw/WTj822+brmSqoIt/iIZ0wyyCMigc3SoaNovoNWUp4V2b03XetzlR56OvznwsLHwh7NEzWlL4WjiQaMnTLZzLlvTGDvb23al8fM52kY8wcVQmGSf0Ty/Y6G1gsI3JOmkyFPETksQgS0p4hjw6owSEVcZEQfu+v+/WzEqXMCX/KZvNbLUGp/3QpzazATf0lOGsbGim9nNNpeosrE2odXZXoHPPsl4XwTUMtTvLeq9YVu0AHA9wXv0E0ExiuttYX9YAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAAAGgAwAEAAAAAQAAAAEAAAAA2uq/xAAAAAtJREFUCB1jYAACAAAFAAGNu5vzAAAAAElFTkSuQmCC",
  Wu =
    "data:image/png;base64,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",
  qu =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABUmlDQ1BJQ0MgUHJvZmlsZQAAGJV1kL1LQmEUxn83DSGDHAobHCQaCizqJjQ0mYMEDWLZ1xBcr6aB2uWqRWsg9Bc0Nbe0RBEuDQ2tTX1RUw1Be+RScjs3LbXowMPz4+HhfQ8HOtAMI+sEcvmiGYtM+5eWV/yuFxx4cBPEq+kFIxSNzkqFb2+f6i2K7Vcj9lv3kTdf8Ol559F7cxw/WTj822+brmSqoIt/iIZ0wyyCMigc3SoaNovoNWUp4V2b03XetzlR56OvznwsLHwh7NEzWlL4WjiQaMnTLZzLlvTGDvb23al8fM52kY8wcVQmGSf0Ty/Y6G1gsI3JOmkyFPETksQgS0p4hjw6owSEVcZEQfu+v+/WzEqXMCX/KZvNbLUGp/3QpzazATf0lOGsbGim9nNNpeosrE2odXZXoHPPsl4XwTUMtTvLeq9YVu0AHA9wXv0E0ExiuttYX9YAAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAAAGgAwAEAAAAAQAAAAEAAAAA2uq/xAAAAAtJREFUCB1jYAACAAAFAAGNu5vzAAAAAElFTkSuQmCC",
  qi = {
    cutsCatMonitor: SA,
    cutsMagicSquare1: IA,
    cutsMagicSquare2: _A,
    cutsTable: TA,
    cutsTableMonitor1: DA,
    cutsPortableGame1: PA,
    cutsPortableGame2: MA,
    cutsEndCard: BA,
    partsArrowUp: Eu,
    transparent: qu,
    itemsBoxKey: kA,
    itemsMagicSquare: RA,
    itemsMemo: QA,
    itemsMiniMemo: OA,
    itemsPowerCode: UA,
    objectsChair: tu,
    objectsScatteredBooks: pu,
    objectsCushion: iu,
    objectsCarpet: VA,
    objectsBoxClosed: NA,
    objectsNote: cu,
    objectsBoxOpened: HA,
    objectsLongWall: nu,
    objectsPowerCodeBoxClosed: du,
    objectsPowerCodeBoxOpened: fu,
    objectsDisplay: su,
    objectsBoxKey: zA,
    objectsButterfly1: LA,
    objectsButterfly2: XA,
    objectsMantis1: au,
    objectsMantis2: ou,
    objectsMantis3: hu,
    objectsMantis4: lu,
    objectsPortableGame1: Au,
    objectsPortableGame2: uu,
    objectsCatMonitor1: jA,
    objectsCatMonitor2: YA,
    objectsCatMonitor3: WA,
    objectsCatMonitor4: qA,
    objectsCatMonitor5: KA,
    objectsCatMonitor6: JA,
    objectsCatMonitor7: ZA,
    objectsCatMonitor8: $A,
    objectsCodeBox: eu,
    objectsWall: bu,
    objectsWall2: vu,
    objectsMagicSquare1: ru,
    tilesFloor: Vu,
    tilesFloor2: ju,
    objectsBookShelf: GA,
    objectsShelf: mu,
    objectsTable: wu,
    objectsTable2: Cu,
    objectsTableMonitor1: yu,
    objectsTableMonitor2: xu,
    objectsBalanceBall: FA,
    objectsRack: gu,
    tilesTransparentWall: Yu,
    playerComment1: Su,
    playerComment2: Bu,
    playerComment3: Iu,
    playerComment4: _u,
    avatarHaru1: wA,
    avatarHaru2: CA,
    avatarHaru3: bA,
    avatarHaru4: vA,
    avatarHaru5: EA,
    playerDown1: Pu,
    playerDown2: Mu,
    playerDown3: Tu,
    playerDown4: Du,
    playerUp1: Nu,
    playerUp2: Hu,
    playerUp3: Lu,
    playerUp4: Xu,
    playerLeft1: ku,
    playerLeft2: Ru,
    playerLeft3: Qu,
    playerLeft4: Ou,
    playerRight1: Uu,
    playerRight2: Fu,
    playerRight3: Gu,
    playerRight4: zu,
    titleTitle: Wu,
  },
  B = {},
  Ku = (s) => {
    Ne.defaultOptions.autoPlay = !1;
    for (const t in qi) {
      const e = t;
      Ge.load(qi[e]).then((i) => {
        s(), (B[e] = i);
      });
    }
    return Object.keys(qi).length;
  };
function* Ye(s) {
  for (;;) {
    yield;
    const t = s.filter((e) => ct[e] === "PRESSED");
    if (t.length > 0) return t;
  }
}
var Ki = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */ var er;
function Ju() {
  return (
    er ||
      ((er = 1),
      (function (s) {
        (function () {
          var t = function () {
            this.init();
          };
          t.prototype = {
            init: function () {
              var o = this || e;
              return (
                (o._counter = 1e3),
                (o._html5AudioPool = []),
                (o.html5PoolSize = 10),
                (o._codecs = {}),
                (o._howls = []),
                (o._muted = !1),
                (o._volume = 1),
                (o._canPlayEvent = "canplaythrough"),
                (o._navigator =
                  typeof window < "u" && window.navigator
                    ? window.navigator
                    : null),
                (o.masterGain = null),
                (o.noAudio = !1),
                (o.usingWebAudio = !0),
                (o.autoSuspend = !0),
                (o.ctx = null),
                (o.autoUnlock = !0),
                o._setup(),
                o
              );
            },
            volume: function (o) {
              var l = this || e;
              if (
                ((o = parseFloat(o)),
                l.ctx || d(),
                typeof o < "u" && o >= 0 && o <= 1)
              ) {
                if (((l._volume = o), l._muted)) return l;
                l.usingWebAudio &&
                  l.masterGain.gain.setValueAtTime(o, e.ctx.currentTime);
                for (var A = 0; A < l._howls.length; A++)
                  if (!l._howls[A]._webAudio)
                    for (
                      var f = l._howls[A]._getSoundIds(), p = 0;
                      p < f.length;
                      p++
                    ) {
                      var g = l._howls[A]._soundById(f[p]);
                      g && g._node && (g._node.volume = g._volume * o);
                    }
                return l;
              }
              return l._volume;
            },
            mute: function (o) {
              var l = this || e;
              l.ctx || d(),
                (l._muted = o),
                l.usingWebAudio &&
                  l.masterGain.gain.setValueAtTime(
                    o ? 0 : l._volume,
                    e.ctx.currentTime,
                  );
              for (var A = 0; A < l._howls.length; A++)
                if (!l._howls[A]._webAudio)
                  for (
                    var f = l._howls[A]._getSoundIds(), p = 0;
                    p < f.length;
                    p++
                  ) {
                    var g = l._howls[A]._soundById(f[p]);
                    g && g._node && (g._node.muted = o ? !0 : g._muted);
                  }
              return l;
            },
            stop: function () {
              for (var o = this || e, l = 0; l < o._howls.length; l++)
                o._howls[l].stop();
              return o;
            },
            unload: function () {
              for (var o = this || e, l = o._howls.length - 1; l >= 0; l--)
                o._howls[l].unload();
              return (
                o.usingWebAudio &&
                  o.ctx &&
                  typeof o.ctx.close < "u" &&
                  (o.ctx.close(), (o.ctx = null), d()),
                o
              );
            },
            codecs: function (o) {
              return (this || e)._codecs[o.replace(/^x-/, "")];
            },
            _setup: function () {
              var o = this || e;
              if (
                ((o.state = (o.ctx && o.ctx.state) || "suspended"),
                o._autoSuspend(),
                !o.usingWebAudio)
              )
                if (typeof Audio < "u")
                  try {
                    var l = new Audio();
                    typeof l.oncanplaythrough > "u" &&
                      (o._canPlayEvent = "canplay");
                  } catch {
                    o.noAudio = !0;
                  }
                else o.noAudio = !0;
              try {
                var l = new Audio();
                l.muted && (o.noAudio = !0);
              } catch {}
              return o.noAudio || o._setupCodecs(), o;
            },
            _setupCodecs: function () {
              var o = this || e,
                l = null;
              try {
                l = typeof Audio < "u" ? new Audio() : null;
              } catch {
                return o;
              }
              if (!l || typeof l.canPlayType != "function") return o;
              var A = l.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                f = o._navigator ? o._navigator.userAgent : "",
                p = f.match(/OPR\/(\d+)/g),
                g = p && parseInt(p[0].split("/")[1], 10) < 33,
                m = f.indexOf("Safari") !== -1 && f.indexOf("Chrome") === -1,
                x = f.match(/Version\/(.*?) /),
                b = m && x && parseInt(x[1], 10) < 15;
              return (
                (o._codecs = {
                  mp3: !!(
                    !g &&
                    (A || l.canPlayType("audio/mp3;").replace(/^no$/, ""))
                  ),
                  mpeg: !!A,
                  opus: !!l
                    .canPlayType('audio/ogg; codecs="opus"')
                    .replace(/^no$/, ""),
                  ogg: !!l
                    .canPlayType('audio/ogg; codecs="vorbis"')
                    .replace(/^no$/, ""),
                  oga: !!l
                    .canPlayType('audio/ogg; codecs="vorbis"')
                    .replace(/^no$/, ""),
                  wav: !!(
                    l.canPlayType('audio/wav; codecs="1"') ||
                    l.canPlayType("audio/wav")
                  ).replace(/^no$/, ""),
                  aac: !!l.canPlayType("audio/aac;").replace(/^no$/, ""),
                  caf: !!l.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                  m4a: !!(
                    l.canPlayType("audio/x-m4a;") ||
                    l.canPlayType("audio/m4a;") ||
                    l.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  m4b: !!(
                    l.canPlayType("audio/x-m4b;") ||
                    l.canPlayType("audio/m4b;") ||
                    l.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  mp4: !!(
                    l.canPlayType("audio/x-mp4;") ||
                    l.canPlayType("audio/mp4;") ||
                    l.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  weba: !!(
                    !b &&
                    l
                      .canPlayType('audio/webm; codecs="vorbis"')
                      .replace(/^no$/, "")
                  ),
                  webm: !!(
                    !b &&
                    l
                      .canPlayType('audio/webm; codecs="vorbis"')
                      .replace(/^no$/, "")
                  ),
                  dolby: !!l
                    .canPlayType('audio/mp4; codecs="ec-3"')
                    .replace(/^no$/, ""),
                  flac: !!(
                    l.canPlayType("audio/x-flac;") ||
                    l.canPlayType("audio/flac;")
                  ).replace(/^no$/, ""),
                }),
                o
              );
            },
            _unlockAudio: function () {
              var o = this || e;
              if (!(o._audioUnlocked || !o.ctx)) {
                (o._audioUnlocked = !1),
                  (o.autoUnlock = !1),
                  !o._mobileUnloaded &&
                    o.ctx.sampleRate !== 44100 &&
                    ((o._mobileUnloaded = !0), o.unload()),
                  (o._scratchBuffer = o.ctx.createBuffer(1, 1, 22050));
                var l = function (A) {
                  for (; o._html5AudioPool.length < o.html5PoolSize; )
                    try {
                      var f = new Audio();
                      (f._unlocked = !0), o._releaseHtml5Audio(f);
                    } catch {
                      o.noAudio = !0;
                      break;
                    }
                  for (var p = 0; p < o._howls.length; p++)
                    if (!o._howls[p]._webAudio)
                      for (
                        var g = o._howls[p]._getSoundIds(), m = 0;
                        m < g.length;
                        m++
                      ) {
                        var x = o._howls[p]._soundById(g[m]);
                        x &&
                          x._node &&
                          !x._node._unlocked &&
                          ((x._node._unlocked = !0), x._node.load());
                      }
                  o._autoResume();
                  var b = o.ctx.createBufferSource();
                  (b.buffer = o._scratchBuffer),
                    b.connect(o.ctx.destination),
                    typeof b.start > "u" ? b.noteOn(0) : b.start(0),
                    typeof o.ctx.resume == "function" && o.ctx.resume(),
                    (b.onended = function () {
                      b.disconnect(0),
                        (o._audioUnlocked = !0),
                        document.removeEventListener("touchstart", l, !0),
                        document.removeEventListener("touchend", l, !0),
                        document.removeEventListener("click", l, !0),
                        document.removeEventListener("keydown", l, !0);
                      for (var E = 0; E < o._howls.length; E++)
                        o._howls[E]._emit("unlock");
                    });
                };
                return (
                  document.addEventListener("touchstart", l, !0),
                  document.addEventListener("touchend", l, !0),
                  document.addEventListener("click", l, !0),
                  document.addEventListener("keydown", l, !0),
                  o
                );
              }
            },
            _obtainHtml5Audio: function () {
              var o = this || e;
              if (o._html5AudioPool.length) return o._html5AudioPool.pop();
              var l = new Audio().play();
              return (
                l &&
                  typeof Promise < "u" &&
                  (l instanceof Promise || typeof l.then == "function") &&
                  l.catch(function () {
                    console.warn(
                      "HTML5 Audio pool exhausted, returning potentially locked audio object.",
                    );
                  }),
                new Audio()
              );
            },
            _releaseHtml5Audio: function (o) {
              var l = this || e;
              return o._unlocked && l._html5AudioPool.push(o), l;
            },
            _autoSuspend: function () {
              var o = this;
              if (
                !(
                  !o.autoSuspend ||
                  !o.ctx ||
                  typeof o.ctx.suspend > "u" ||
                  !e.usingWebAudio
                )
              ) {
                for (var l = 0; l < o._howls.length; l++)
                  if (o._howls[l]._webAudio) {
                    for (var A = 0; A < o._howls[l]._sounds.length; A++)
                      if (!o._howls[l]._sounds[A]._paused) return o;
                  }
                return (
                  o._suspendTimer && clearTimeout(o._suspendTimer),
                  (o._suspendTimer = setTimeout(function () {
                    if (o.autoSuspend) {
                      (o._suspendTimer = null), (o.state = "suspending");
                      var f = function () {
                        (o.state = "suspended"),
                          o._resumeAfterSuspend &&
                            (delete o._resumeAfterSuspend, o._autoResume());
                      };
                      o.ctx.suspend().then(f, f);
                    }
                  }, 3e4)),
                  o
                );
              }
            },
            _autoResume: function () {
              var o = this;
              if (!(!o.ctx || typeof o.ctx.resume > "u" || !e.usingWebAudio))
                return (
                  o.state === "running" &&
                  o.ctx.state !== "interrupted" &&
                  o._suspendTimer
                    ? (clearTimeout(o._suspendTimer), (o._suspendTimer = null))
                    : o.state === "suspended" ||
                        (o.state === "running" && o.ctx.state === "interrupted")
                      ? (o.ctx.resume().then(function () {
                          o.state = "running";
                          for (var l = 0; l < o._howls.length; l++)
                            o._howls[l]._emit("resume");
                        }),
                        o._suspendTimer &&
                          (clearTimeout(o._suspendTimer),
                          (o._suspendTimer = null)))
                      : o.state === "suspending" &&
                        (o._resumeAfterSuspend = !0),
                  o
                );
            },
          };
          var e = new t(),
            i = function (o) {
              var l = this;
              if (!o.src || o.src.length === 0) {
                console.error(
                  "An array of source files must be passed with any new Howl.",
                );
                return;
              }
              l.init(o);
            };
          i.prototype = {
            init: function (o) {
              var l = this;
              return (
                e.ctx || d(),
                (l._autoplay = o.autoplay || !1),
                (l._format =
                  typeof o.format != "string" ? o.format : [o.format]),
                (l._html5 = o.html5 || !1),
                (l._muted = o.mute || !1),
                (l._loop = o.loop || !1),
                (l._pool = o.pool || 5),
                (l._preload =
                  typeof o.preload == "boolean" || o.preload === "metadata"
                    ? o.preload
                    : !0),
                (l._rate = o.rate || 1),
                (l._sprite = o.sprite || {}),
                (l._src = typeof o.src != "string" ? o.src : [o.src]),
                (l._volume = o.volume !== void 0 ? o.volume : 1),
                (l._xhr = {
                  method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
                  headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
                  withCredentials:
                    o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : !1,
                }),
                (l._duration = 0),
                (l._state = "unloaded"),
                (l._sounds = []),
                (l._endTimers = {}),
                (l._queue = []),
                (l._playLock = !1),
                (l._onend = o.onend ? [{ fn: o.onend }] : []),
                (l._onfade = o.onfade ? [{ fn: o.onfade }] : []),
                (l._onload = o.onload ? [{ fn: o.onload }] : []),
                (l._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : []),
                (l._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : []),
                (l._onpause = o.onpause ? [{ fn: o.onpause }] : []),
                (l._onplay = o.onplay ? [{ fn: o.onplay }] : []),
                (l._onstop = o.onstop ? [{ fn: o.onstop }] : []),
                (l._onmute = o.onmute ? [{ fn: o.onmute }] : []),
                (l._onvolume = o.onvolume ? [{ fn: o.onvolume }] : []),
                (l._onrate = o.onrate ? [{ fn: o.onrate }] : []),
                (l._onseek = o.onseek ? [{ fn: o.onseek }] : []),
                (l._onunlock = o.onunlock ? [{ fn: o.onunlock }] : []),
                (l._onresume = []),
                (l._webAudio = e.usingWebAudio && !l._html5),
                typeof e.ctx < "u" && e.ctx && e.autoUnlock && e._unlockAudio(),
                e._howls.push(l),
                l._autoplay &&
                  l._queue.push({
                    event: "play",
                    action: function () {
                      l.play();
                    },
                  }),
                l._preload && l._preload !== "none" && l.load(),
                l
              );
            },
            load: function () {
              var o = this,
                l = null;
              if (e.noAudio) {
                o._emit("loaderror", null, "No audio support.");
                return;
              }
              typeof o._src == "string" && (o._src = [o._src]);
              for (var A = 0; A < o._src.length; A++) {
                var f, p;
                if (o._format && o._format[A]) f = o._format[A];
                else {
                  if (((p = o._src[A]), typeof p != "string")) {
                    o._emit(
                      "loaderror",
                      null,
                      "Non-string found in selected audio sources - ignoring.",
                    );
                    continue;
                  }
                  (f = /^data:audio\/([^;,]+);/i.exec(p)),
                    f || (f = /\.([^.]+)$/.exec(p.split("?", 1)[0])),
                    f && (f = f[1].toLowerCase());
                }
                if (
                  (f ||
                    console.warn(
                      'No file extension was found. Consider using the "format" property or specify an extension.',
                    ),
                  f && e.codecs(f))
                ) {
                  l = o._src[A];
                  break;
                }
              }
              if (!l) {
                o._emit(
                  "loaderror",
                  null,
                  "No codec support for selected audio sources.",
                );
                return;
              }
              return (
                (o._src = l),
                (o._state = "loading"),
                window.location.protocol === "https:" &&
                  l.slice(0, 5) === "http:" &&
                  ((o._html5 = !0), (o._webAudio = !1)),
                new n(o),
                o._webAudio && a(o),
                o
              );
            },
            play: function (o, l) {
              var A = this,
                f = null;
              if (typeof o == "number") (f = o), (o = null);
              else {
                if (
                  typeof o == "string" &&
                  A._state === "loaded" &&
                  !A._sprite[o]
                )
                  return null;
                if (typeof o > "u" && ((o = "__default"), !A._playLock)) {
                  for (var p = 0, g = 0; g < A._sounds.length; g++)
                    A._sounds[g]._paused &&
                      !A._sounds[g]._ended &&
                      (p++, (f = A._sounds[g]._id));
                  p === 1 ? (o = null) : (f = null);
                }
              }
              var m = f ? A._soundById(f) : A._inactiveSound();
              if (!m) return null;
              if (
                (f && !o && (o = m._sprite || "__default"),
                A._state !== "loaded")
              ) {
                (m._sprite = o), (m._ended = !1);
                var x = m._id;
                return (
                  A._queue.push({
                    event: "play",
                    action: function () {
                      A.play(x);
                    },
                  }),
                  x
                );
              }
              if (f && !m._paused) return l || A._loadQueue("play"), m._id;
              A._webAudio && e._autoResume();
              var b = Math.max(
                  0,
                  m._seek > 0 ? m._seek : A._sprite[o][0] / 1e3,
                ),
                E = Math.max(0, (A._sprite[o][0] + A._sprite[o][1]) / 1e3 - b),
                D = (E * 1e3) / Math.abs(m._rate),
                _ = A._sprite[o][0] / 1e3,
                P = (A._sprite[o][0] + A._sprite[o][1]) / 1e3;
              (m._sprite = o), (m._ended = !1);
              var X = function () {
                (m._paused = !1),
                  (m._seek = b),
                  (m._start = _),
                  (m._stop = P),
                  (m._loop = !!(m._loop || A._sprite[o][2]));
              };
              if (b >= P) {
                A._ended(m);
                return;
              }
              var Q = m._node;
              if (A._webAudio) {
                var U = function () {
                  (A._playLock = !1), X(), A._refreshBuffer(m);
                  var lt = m._muted || A._muted ? 0 : m._volume;
                  Q.gain.setValueAtTime(lt, e.ctx.currentTime),
                    (m._playStart = e.ctx.currentTime),
                    typeof Q.bufferSource.start > "u"
                      ? m._loop
                        ? Q.bufferSource.noteGrainOn(0, b, 86400)
                        : Q.bufferSource.noteGrainOn(0, b, E)
                      : m._loop
                        ? Q.bufferSource.start(0, b, 86400)
                        : Q.bufferSource.start(0, b, E),
                    D !== 1 / 0 &&
                      (A._endTimers[m._id] = setTimeout(
                        A._ended.bind(A, m),
                        D,
                      )),
                    l ||
                      setTimeout(function () {
                        A._emit("play", m._id), A._loadQueue();
                      }, 0);
                };
                e.state === "running" && e.ctx.state !== "interrupted"
                  ? U()
                  : ((A._playLock = !0),
                    A.once("resume", U),
                    A._clearTimer(m._id));
              } else {
                var O = function () {
                  (Q.currentTime = b),
                    (Q.muted = m._muted || A._muted || e._muted || Q.muted),
                    (Q.volume = m._volume * e.volume()),
                    (Q.playbackRate = m._rate);
                  try {
                    var lt = Q.play();
                    if (
                      (lt &&
                      typeof Promise < "u" &&
                      (lt instanceof Promise || typeof lt.then == "function")
                        ? ((A._playLock = !0),
                          X(),
                          lt
                            .then(function () {
                              (A._playLock = !1),
                                (Q._unlocked = !0),
                                l ? A._loadQueue() : A._emit("play", m._id);
                            })
                            .catch(function () {
                              (A._playLock = !1),
                                A._emit(
                                  "playerror",
                                  m._id,
                                  "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.",
                                ),
                                (m._ended = !0),
                                (m._paused = !0);
                            }))
                        : l ||
                          ((A._playLock = !1), X(), A._emit("play", m._id)),
                      (Q.playbackRate = m._rate),
                      Q.paused)
                    ) {
                      A._emit(
                        "playerror",
                        m._id,
                        "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.",
                      );
                      return;
                    }
                    o !== "__default" || m._loop
                      ? (A._endTimers[m._id] = setTimeout(
                          A._ended.bind(A, m),
                          D,
                        ))
                      : ((A._endTimers[m._id] = function () {
                          A._ended(m),
                            Q.removeEventListener(
                              "ended",
                              A._endTimers[m._id],
                              !1,
                            );
                        }),
                        Q.addEventListener("ended", A._endTimers[m._id], !1));
                  } catch (Ht) {
                    A._emit("playerror", m._id, Ht);
                  }
                };
                Q.src ===
                  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" &&
                  ((Q.src = A._src), Q.load());
                var rt =
                  (window && window.ejecta) ||
                  (!Q.readyState && e._navigator.isCocoonJS);
                if (Q.readyState >= 3 || rt) O();
                else {
                  (A._playLock = !0), (A._state = "loading");
                  var $ = function () {
                    (A._state = "loaded"),
                      O(),
                      Q.removeEventListener(e._canPlayEvent, $, !1);
                  };
                  Q.addEventListener(e._canPlayEvent, $, !1),
                    A._clearTimer(m._id);
                }
              }
              return m._id;
            },
            pause: function (o) {
              var l = this;
              if (l._state !== "loaded" || l._playLock)
                return (
                  l._queue.push({
                    event: "pause",
                    action: function () {
                      l.pause(o);
                    },
                  }),
                  l
                );
              for (var A = l._getSoundIds(o), f = 0; f < A.length; f++) {
                l._clearTimer(A[f]);
                var p = l._soundById(A[f]);
                if (
                  p &&
                  !p._paused &&
                  ((p._seek = l.seek(A[f])),
                  (p._rateSeek = 0),
                  (p._paused = !0),
                  l._stopFade(A[f]),
                  p._node)
                )
                  if (l._webAudio) {
                    if (!p._node.bufferSource) continue;
                    typeof p._node.bufferSource.stop > "u"
                      ? p._node.bufferSource.noteOff(0)
                      : p._node.bufferSource.stop(0),
                      l._cleanBuffer(p._node);
                  } else
                    (!isNaN(p._node.duration) || p._node.duration === 1 / 0) &&
                      p._node.pause();
                arguments[1] || l._emit("pause", p ? p._id : null);
              }
              return l;
            },
            stop: function (o, l) {
              var A = this;
              if (A._state !== "loaded" || A._playLock)
                return (
                  A._queue.push({
                    event: "stop",
                    action: function () {
                      A.stop(o);
                    },
                  }),
                  A
                );
              for (var f = A._getSoundIds(o), p = 0; p < f.length; p++) {
                A._clearTimer(f[p]);
                var g = A._soundById(f[p]);
                g &&
                  ((g._seek = g._start || 0),
                  (g._rateSeek = 0),
                  (g._paused = !0),
                  (g._ended = !0),
                  A._stopFade(f[p]),
                  g._node &&
                    (A._webAudio
                      ? g._node.bufferSource &&
                        (typeof g._node.bufferSource.stop > "u"
                          ? g._node.bufferSource.noteOff(0)
                          : g._node.bufferSource.stop(0),
                        A._cleanBuffer(g._node))
                      : (!isNaN(g._node.duration) ||
                          g._node.duration === 1 / 0) &&
                        ((g._node.currentTime = g._start || 0),
                        g._node.pause(),
                        g._node.duration === 1 / 0 && A._clearSound(g._node))),
                  l || A._emit("stop", g._id));
              }
              return A;
            },
            mute: function (o, l) {
              var A = this;
              if (A._state !== "loaded" || A._playLock)
                return (
                  A._queue.push({
                    event: "mute",
                    action: function () {
                      A.mute(o, l);
                    },
                  }),
                  A
                );
              if (typeof l > "u")
                if (typeof o == "boolean") A._muted = o;
                else return A._muted;
              for (var f = A._getSoundIds(l), p = 0; p < f.length; p++) {
                var g = A._soundById(f[p]);
                g &&
                  ((g._muted = o),
                  g._interval && A._stopFade(g._id),
                  A._webAudio && g._node
                    ? g._node.gain.setValueAtTime(
                        o ? 0 : g._volume,
                        e.ctx.currentTime,
                      )
                    : g._node && (g._node.muted = e._muted ? !0 : o),
                  A._emit("mute", g._id));
              }
              return A;
            },
            volume: function () {
              var o = this,
                l = arguments,
                A,
                f;
              if (l.length === 0) return o._volume;
              if (l.length === 1 || (l.length === 2 && typeof l[1] > "u")) {
                var p = o._getSoundIds(),
                  g = p.indexOf(l[0]);
                g >= 0 ? (f = parseInt(l[0], 10)) : (A = parseFloat(l[0]));
              } else
                l.length >= 2 &&
                  ((A = parseFloat(l[0])), (f = parseInt(l[1], 10)));
              var m;
              if (typeof A < "u" && A >= 0 && A <= 1) {
                if (o._state !== "loaded" || o._playLock)
                  return (
                    o._queue.push({
                      event: "volume",
                      action: function () {
                        o.volume.apply(o, l);
                      },
                    }),
                    o
                  );
                typeof f > "u" && (o._volume = A), (f = o._getSoundIds(f));
                for (var x = 0; x < f.length; x++)
                  (m = o._soundById(f[x])),
                    m &&
                      ((m._volume = A),
                      l[2] || o._stopFade(f[x]),
                      o._webAudio && m._node && !m._muted
                        ? m._node.gain.setValueAtTime(A, e.ctx.currentTime)
                        : m._node &&
                          !m._muted &&
                          (m._node.volume = A * e.volume()),
                      o._emit("volume", m._id));
              } else
                return (
                  (m = f ? o._soundById(f) : o._sounds[0]), m ? m._volume : 0
                );
              return o;
            },
            fade: function (o, l, A, f) {
              var p = this;
              if (p._state !== "loaded" || p._playLock)
                return (
                  p._queue.push({
                    event: "fade",
                    action: function () {
                      p.fade(o, l, A, f);
                    },
                  }),
                  p
                );
              (o = Math.min(Math.max(0, parseFloat(o)), 1)),
                (l = Math.min(Math.max(0, parseFloat(l)), 1)),
                (A = parseFloat(A)),
                p.volume(o, f);
              for (var g = p._getSoundIds(f), m = 0; m < g.length; m++) {
                var x = p._soundById(g[m]);
                if (x) {
                  if ((f || p._stopFade(g[m]), p._webAudio && !x._muted)) {
                    var b = e.ctx.currentTime,
                      E = b + A / 1e3;
                    (x._volume = o),
                      x._node.gain.setValueAtTime(o, b),
                      x._node.gain.linearRampToValueAtTime(l, E);
                  }
                  p._startFadeInterval(x, o, l, A, g[m], typeof f > "u");
                }
              }
              return p;
            },
            _startFadeInterval: function (o, l, A, f, p, g) {
              var m = this,
                x = l,
                b = A - l,
                E = Math.abs(b / 0.01),
                D = Math.max(4, E > 0 ? f / E : f),
                _ = Date.now();
              (o._fadeTo = A),
                (o._interval = setInterval(function () {
                  var P = (Date.now() - _) / f;
                  (_ = Date.now()),
                    (x += b * P),
                    (x = Math.round(x * 100) / 100),
                    b < 0 ? (x = Math.max(A, x)) : (x = Math.min(A, x)),
                    m._webAudio ? (o._volume = x) : m.volume(x, o._id, !0),
                    g && (m._volume = x),
                    ((A < l && x <= A) || (A > l && x >= A)) &&
                      (clearInterval(o._interval),
                      (o._interval = null),
                      (o._fadeTo = null),
                      m.volume(A, o._id),
                      m._emit("fade", o._id));
                }, D));
            },
            _stopFade: function (o) {
              var l = this,
                A = l._soundById(o);
              return (
                A &&
                  A._interval &&
                  (l._webAudio &&
                    A._node.gain.cancelScheduledValues(e.ctx.currentTime),
                  clearInterval(A._interval),
                  (A._interval = null),
                  l.volume(A._fadeTo, o),
                  (A._fadeTo = null),
                  l._emit("fade", o)),
                l
              );
            },
            loop: function () {
              var o = this,
                l = arguments,
                A,
                f,
                p;
              if (l.length === 0) return o._loop;
              if (l.length === 1)
                if (typeof l[0] == "boolean") (A = l[0]), (o._loop = A);
                else
                  return (
                    (p = o._soundById(parseInt(l[0], 10))), p ? p._loop : !1
                  );
              else l.length === 2 && ((A = l[0]), (f = parseInt(l[1], 10)));
              for (var g = o._getSoundIds(f), m = 0; m < g.length; m++)
                (p = o._soundById(g[m])),
                  p &&
                    ((p._loop = A),
                    o._webAudio &&
                      p._node &&
                      p._node.bufferSource &&
                      ((p._node.bufferSource.loop = A),
                      A &&
                        ((p._node.bufferSource.loopStart = p._start || 0),
                        (p._node.bufferSource.loopEnd = p._stop),
                        o.playing(g[m]) &&
                          (o.pause(g[m], !0), o.play(g[m], !0)))));
              return o;
            },
            rate: function () {
              var o = this,
                l = arguments,
                A,
                f;
              if (l.length === 0) f = o._sounds[0]._id;
              else if (l.length === 1) {
                var p = o._getSoundIds(),
                  g = p.indexOf(l[0]);
                g >= 0 ? (f = parseInt(l[0], 10)) : (A = parseFloat(l[0]));
              } else
                l.length === 2 &&
                  ((A = parseFloat(l[0])), (f = parseInt(l[1], 10)));
              var m;
              if (typeof A == "number") {
                if (o._state !== "loaded" || o._playLock)
                  return (
                    o._queue.push({
                      event: "rate",
                      action: function () {
                        o.rate.apply(o, l);
                      },
                    }),
                    o
                  );
                typeof f > "u" && (o._rate = A), (f = o._getSoundIds(f));
                for (var x = 0; x < f.length; x++)
                  if (((m = o._soundById(f[x])), m)) {
                    o.playing(f[x]) &&
                      ((m._rateSeek = o.seek(f[x])),
                      (m._playStart = o._webAudio
                        ? e.ctx.currentTime
                        : m._playStart)),
                      (m._rate = A),
                      o._webAudio && m._node && m._node.bufferSource
                        ? m._node.bufferSource.playbackRate.setValueAtTime(
                            A,
                            e.ctx.currentTime,
                          )
                        : m._node && (m._node.playbackRate = A);
                    var b = o.seek(f[x]),
                      E =
                        (o._sprite[m._sprite][0] + o._sprite[m._sprite][1]) /
                          1e3 -
                        b,
                      D = (E * 1e3) / Math.abs(m._rate);
                    (o._endTimers[f[x]] || !m._paused) &&
                      (o._clearTimer(f[x]),
                      (o._endTimers[f[x]] = setTimeout(
                        o._ended.bind(o, m),
                        D,
                      ))),
                      o._emit("rate", m._id);
                  }
              } else return (m = o._soundById(f)), m ? m._rate : o._rate;
              return o;
            },
            seek: function () {
              var o = this,
                l = arguments,
                A,
                f;
              if (l.length === 0) o._sounds.length && (f = o._sounds[0]._id);
              else if (l.length === 1) {
                var p = o._getSoundIds(),
                  g = p.indexOf(l[0]);
                g >= 0
                  ? (f = parseInt(l[0], 10))
                  : o._sounds.length &&
                    ((f = o._sounds[0]._id), (A = parseFloat(l[0])));
              } else
                l.length === 2 &&
                  ((A = parseFloat(l[0])), (f = parseInt(l[1], 10)));
              if (typeof f > "u") return 0;
              if (
                typeof A == "number" &&
                (o._state !== "loaded" || o._playLock)
              )
                return (
                  o._queue.push({
                    event: "seek",
                    action: function () {
                      o.seek.apply(o, l);
                    },
                  }),
                  o
                );
              var m = o._soundById(f);
              if (m)
                if (typeof A == "number" && A >= 0) {
                  var x = o.playing(f);
                  x && o.pause(f, !0),
                    (m._seek = A),
                    (m._ended = !1),
                    o._clearTimer(f),
                    !o._webAudio &&
                      m._node &&
                      !isNaN(m._node.duration) &&
                      (m._node.currentTime = A);
                  var b = function () {
                    x && o.play(f, !0), o._emit("seek", f);
                  };
                  if (x && !o._webAudio) {
                    var E = function () {
                      o._playLock ? setTimeout(E, 0) : b();
                    };
                    setTimeout(E, 0);
                  } else b();
                } else if (o._webAudio) {
                  var D = o.playing(f) ? e.ctx.currentTime - m._playStart : 0,
                    _ = m._rateSeek ? m._rateSeek - m._seek : 0;
                  return m._seek + (_ + D * Math.abs(m._rate));
                } else return m._node.currentTime;
              return o;
            },
            playing: function (o) {
              var l = this;
              if (typeof o == "number") {
                var A = l._soundById(o);
                return A ? !A._paused : !1;
              }
              for (var f = 0; f < l._sounds.length; f++)
                if (!l._sounds[f]._paused) return !0;
              return !1;
            },
            duration: function (o) {
              var l = this,
                A = l._duration,
                f = l._soundById(o);
              return f && (A = l._sprite[f._sprite][1] / 1e3), A;
            },
            state: function () {
              return this._state;
            },
            unload: function () {
              for (var o = this, l = o._sounds, A = 0; A < l.length; A++)
                l[A]._paused || o.stop(l[A]._id),
                  o._webAudio ||
                    (o._clearSound(l[A]._node),
                    l[A]._node.removeEventListener("error", l[A]._errorFn, !1),
                    l[A]._node.removeEventListener(
                      e._canPlayEvent,
                      l[A]._loadFn,
                      !1,
                    ),
                    l[A]._node.removeEventListener("ended", l[A]._endFn, !1),
                    e._releaseHtml5Audio(l[A]._node)),
                  delete l[A]._node,
                  o._clearTimer(l[A]._id);
              var f = e._howls.indexOf(o);
              f >= 0 && e._howls.splice(f, 1);
              var p = !0;
              for (A = 0; A < e._howls.length; A++)
                if (
                  e._howls[A]._src === o._src ||
                  o._src.indexOf(e._howls[A]._src) >= 0
                ) {
                  p = !1;
                  break;
                }
              return (
                r && p && delete r[o._src],
                (e.noAudio = !1),
                (o._state = "unloaded"),
                (o._sounds = []),
                (o = null),
                null
              );
            },
            on: function (o, l, A, f) {
              var p = this,
                g = p["_on" + o];
              return (
                typeof l == "function" &&
                  g.push(f ? { id: A, fn: l, once: f } : { id: A, fn: l }),
                p
              );
            },
            off: function (o, l, A) {
              var f = this,
                p = f["_on" + o],
                g = 0;
              if ((typeof l == "number" && ((A = l), (l = null)), l || A))
                for (g = 0; g < p.length; g++) {
                  var m = A === p[g].id;
                  if ((l === p[g].fn && m) || (!l && m)) {
                    p.splice(g, 1);
                    break;
                  }
                }
              else if (o) f["_on" + o] = [];
              else {
                var x = Object.keys(f);
                for (g = 0; g < x.length; g++)
                  x[g].indexOf("_on") === 0 &&
                    Array.isArray(f[x[g]]) &&
                    (f[x[g]] = []);
              }
              return f;
            },
            once: function (o, l, A) {
              var f = this;
              return f.on(o, l, A, 1), f;
            },
            _emit: function (o, l, A) {
              for (
                var f = this, p = f["_on" + o], g = p.length - 1;
                g >= 0;
                g--
              )
                (!p[g].id || p[g].id === l || o === "load") &&
                  (setTimeout(
                    function (m) {
                      m.call(this, l, A);
                    }.bind(f, p[g].fn),
                    0,
                  ),
                  p[g].once && f.off(o, p[g].fn, p[g].id));
              return f._loadQueue(o), f;
            },
            _loadQueue: function (o) {
              var l = this;
              if (l._queue.length > 0) {
                var A = l._queue[0];
                A.event === o && (l._queue.shift(), l._loadQueue()),
                  o || A.action();
              }
              return l;
            },
            _ended: function (o) {
              var l = this,
                A = o._sprite;
              if (
                !l._webAudio &&
                o._node &&
                !o._node.paused &&
                !o._node.ended &&
                o._node.currentTime < o._stop
              )
                return setTimeout(l._ended.bind(l, o), 100), l;
              var f = !!(o._loop || l._sprite[A][2]);
              if (
                (l._emit("end", o._id),
                !l._webAudio && f && l.stop(o._id, !0).play(o._id),
                l._webAudio && f)
              ) {
                l._emit("play", o._id),
                  (o._seek = o._start || 0),
                  (o._rateSeek = 0),
                  (o._playStart = e.ctx.currentTime);
                var p = ((o._stop - o._start) * 1e3) / Math.abs(o._rate);
                l._endTimers[o._id] = setTimeout(l._ended.bind(l, o), p);
              }
              return (
                l._webAudio &&
                  !f &&
                  ((o._paused = !0),
                  (o._ended = !0),
                  (o._seek = o._start || 0),
                  (o._rateSeek = 0),
                  l._clearTimer(o._id),
                  l._cleanBuffer(o._node),
                  e._autoSuspend()),
                !l._webAudio && !f && l.stop(o._id, !0),
                l
              );
            },
            _clearTimer: function (o) {
              var l = this;
              if (l._endTimers[o]) {
                if (typeof l._endTimers[o] != "function")
                  clearTimeout(l._endTimers[o]);
                else {
                  var A = l._soundById(o);
                  A &&
                    A._node &&
                    A._node.removeEventListener("ended", l._endTimers[o], !1);
                }
                delete l._endTimers[o];
              }
              return l;
            },
            _soundById: function (o) {
              for (var l = this, A = 0; A < l._sounds.length; A++)
                if (o === l._sounds[A]._id) return l._sounds[A];
              return null;
            },
            _inactiveSound: function () {
              var o = this;
              o._drain();
              for (var l = 0; l < o._sounds.length; l++)
                if (o._sounds[l]._ended) return o._sounds[l].reset();
              return new n(o);
            },
            _drain: function () {
              var o = this,
                l = o._pool,
                A = 0,
                f = 0;
              if (!(o._sounds.length < l)) {
                for (f = 0; f < o._sounds.length; f++)
                  o._sounds[f]._ended && A++;
                for (f = o._sounds.length - 1; f >= 0; f--) {
                  if (A <= l) return;
                  o._sounds[f]._ended &&
                    (o._webAudio &&
                      o._sounds[f]._node &&
                      o._sounds[f]._node.disconnect(0),
                    o._sounds.splice(f, 1),
                    A--);
                }
              }
            },
            _getSoundIds: function (o) {
              var l = this;
              if (typeof o > "u") {
                for (var A = [], f = 0; f < l._sounds.length; f++)
                  A.push(l._sounds[f]._id);
                return A;
              } else return [o];
            },
            _refreshBuffer: function (o) {
              var l = this;
              return (
                (o._node.bufferSource = e.ctx.createBufferSource()),
                (o._node.bufferSource.buffer = r[l._src]),
                o._panner
                  ? o._node.bufferSource.connect(o._panner)
                  : o._node.bufferSource.connect(o._node),
                (o._node.bufferSource.loop = o._loop),
                o._loop &&
                  ((o._node.bufferSource.loopStart = o._start || 0),
                  (o._node.bufferSource.loopEnd = o._stop || 0)),
                o._node.bufferSource.playbackRate.setValueAtTime(
                  o._rate,
                  e.ctx.currentTime,
                ),
                l
              );
            },
            _cleanBuffer: function (o) {
              var l = this,
                A = e._navigator && e._navigator.vendor.indexOf("Apple") >= 0;
              if (!o.bufferSource) return l;
              if (
                e._scratchBuffer &&
                o.bufferSource &&
                ((o.bufferSource.onended = null),
                o.bufferSource.disconnect(0),
                A)
              )
                try {
                  o.bufferSource.buffer = e._scratchBuffer;
                } catch {}
              return (o.bufferSource = null), l;
            },
            _clearSound: function (o) {
              var l = /MSIE |Trident\//.test(
                e._navigator && e._navigator.userAgent,
              );
              l ||
                (o.src =
                  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
            },
          };
          var n = function (o) {
            (this._parent = o), this.init();
          };
          n.prototype = {
            init: function () {
              var o = this,
                l = o._parent;
              return (
                (o._muted = l._muted),
                (o._loop = l._loop),
                (o._volume = l._volume),
                (o._rate = l._rate),
                (o._seek = 0),
                (o._paused = !0),
                (o._ended = !0),
                (o._sprite = "__default"),
                (o._id = ++e._counter),
                l._sounds.push(o),
                o.create(),
                o
              );
            },
            create: function () {
              var o = this,
                l = o._parent,
                A = e._muted || o._muted || o._parent._muted ? 0 : o._volume;
              return (
                l._webAudio
                  ? ((o._node =
                      typeof e.ctx.createGain > "u"
                        ? e.ctx.createGainNode()
                        : e.ctx.createGain()),
                    o._node.gain.setValueAtTime(A, e.ctx.currentTime),
                    (o._node.paused = !0),
                    o._node.connect(e.masterGain))
                  : e.noAudio ||
                    ((o._node = e._obtainHtml5Audio()),
                    (o._errorFn = o._errorListener.bind(o)),
                    o._node.addEventListener("error", o._errorFn, !1),
                    (o._loadFn = o._loadListener.bind(o)),
                    o._node.addEventListener(e._canPlayEvent, o._loadFn, !1),
                    (o._endFn = o._endListener.bind(o)),
                    o._node.addEventListener("ended", o._endFn, !1),
                    (o._node.src = l._src),
                    (o._node.preload = l._preload === !0 ? "auto" : l._preload),
                    (o._node.volume = A * e.volume()),
                    o._node.load()),
                o
              );
            },
            reset: function () {
              var o = this,
                l = o._parent;
              return (
                (o._muted = l._muted),
                (o._loop = l._loop),
                (o._volume = l._volume),
                (o._rate = l._rate),
                (o._seek = 0),
                (o._rateSeek = 0),
                (o._paused = !0),
                (o._ended = !0),
                (o._sprite = "__default"),
                (o._id = ++e._counter),
                o
              );
            },
            _errorListener: function () {
              var o = this;
              o._parent._emit(
                "loaderror",
                o._id,
                o._node.error ? o._node.error.code : 0,
              ),
                o._node.removeEventListener("error", o._errorFn, !1);
            },
            _loadListener: function () {
              var o = this,
                l = o._parent;
              (l._duration = Math.ceil(o._node.duration * 10) / 10),
                Object.keys(l._sprite).length === 0 &&
                  (l._sprite = { __default: [0, l._duration * 1e3] }),
                l._state !== "loaded" &&
                  ((l._state = "loaded"), l._emit("load"), l._loadQueue()),
                o._node.removeEventListener(e._canPlayEvent, o._loadFn, !1);
            },
            _endListener: function () {
              var o = this,
                l = o._parent;
              l._duration === 1 / 0 &&
                ((l._duration = Math.ceil(o._node.duration * 10) / 10),
                l._sprite.__default[1] === 1 / 0 &&
                  (l._sprite.__default[1] = l._duration * 1e3),
                l._ended(o)),
                o._node.removeEventListener("ended", o._endFn, !1);
            },
          };
          var r = {},
            a = function (o) {
              var l = o._src;
              if (r[l]) {
                (o._duration = r[l].duration), u(o);
                return;
              }
              if (/^data:[^;]+;base64,/.test(l)) {
                for (
                  var A = atob(l.split(",")[1]),
                    f = new Uint8Array(A.length),
                    p = 0;
                  p < A.length;
                  ++p
                )
                  f[p] = A.charCodeAt(p);
                c(f.buffer, o);
              } else {
                var g = new XMLHttpRequest();
                g.open(o._xhr.method, l, !0),
                  (g.withCredentials = o._xhr.withCredentials),
                  (g.responseType = "arraybuffer"),
                  o._xhr.headers &&
                    Object.keys(o._xhr.headers).forEach(function (m) {
                      g.setRequestHeader(m, o._xhr.headers[m]);
                    }),
                  (g.onload = function () {
                    var m = (g.status + "")[0];
                    if (m !== "0" && m !== "2" && m !== "3") {
                      o._emit(
                        "loaderror",
                        null,
                        "Failed loading audio file with status: " +
                          g.status +
                          ".",
                      );
                      return;
                    }
                    c(g.response, o);
                  }),
                  (g.onerror = function () {
                    o._webAudio &&
                      ((o._html5 = !0),
                      (o._webAudio = !1),
                      (o._sounds = []),
                      delete r[l],
                      o.load());
                  }),
                  h(g);
              }
            },
            h = function (o) {
              try {
                o.send();
              } catch {
                o.onerror();
              }
            },
            c = function (o, l) {
              var A = function () {
                  l._emit("loaderror", null, "Decoding audio data failed.");
                },
                f = function (p) {
                  p && l._sounds.length > 0 ? ((r[l._src] = p), u(l, p)) : A();
                };
              typeof Promise < "u" && e.ctx.decodeAudioData.length === 1
                ? e.ctx.decodeAudioData(o).then(f).catch(A)
                : e.ctx.decodeAudioData(o, f, A);
            },
            u = function (o, l) {
              l && !o._duration && (o._duration = l.duration),
                Object.keys(o._sprite).length === 0 &&
                  (o._sprite = { __default: [0, o._duration * 1e3] }),
                o._state !== "loaded" &&
                  ((o._state = "loaded"), o._emit("load"), o._loadQueue());
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
                var o = /iP(hone|od|ad)/.test(
                    e._navigator && e._navigator.platform,
                  ),
                  l =
                    e._navigator &&
                    e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                  A = l ? parseInt(l[1], 10) : null;
                if (o && A && A < 9) {
                  var f = /safari/.test(
                    e._navigator && e._navigator.userAgent.toLowerCase(),
                  );
                  e._navigator && !f && (e.usingWebAudio = !1);
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
          (s.Howler = e),
            (s.Howl = i),
            typeof Te < "u"
              ? ((Te.HowlerGlobal = t),
                (Te.Howler = e),
                (Te.Howl = i),
                (Te.Sound = n))
              : typeof window < "u" &&
                ((window.HowlerGlobal = t),
                (window.Howler = e),
                (window.Howl = i),
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
              var i = this;
              if (!i.ctx || !i.ctx.listener) return i;
              for (var n = i._howls.length - 1; n >= 0; n--)
                i._howls[n].stereo(e);
              return i;
            }),
            (HowlerGlobal.prototype.pos = function (e, i, n) {
              var r = this;
              if (!r.ctx || !r.ctx.listener) return r;
              if (
                ((i = typeof i != "number" ? r._pos[1] : i),
                (n = typeof n != "number" ? r._pos[2] : n),
                typeof e == "number")
              )
                (r._pos = [e, i, n]),
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
            (HowlerGlobal.prototype.orientation = function (e, i, n, r, a, h) {
              var c = this;
              if (!c.ctx || !c.ctx.listener) return c;
              var u = c._orientation;
              if (
                ((i = typeof i != "number" ? u[1] : i),
                (n = typeof n != "number" ? u[2] : n),
                (r = typeof r != "number" ? u[3] : r),
                (a = typeof a != "number" ? u[4] : a),
                (h = typeof h != "number" ? u[5] : h),
                typeof e == "number")
              )
                (c._orientation = [e, i, n, r, a, h]),
                  typeof c.ctx.listener.forwardX < "u"
                    ? (c.ctx.listener.forwardX.setTargetAtTime(
                        e,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      c.ctx.listener.forwardY.setTargetAtTime(
                        i,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      c.ctx.listener.forwardZ.setTargetAtTime(
                        n,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      c.ctx.listener.upX.setTargetAtTime(
                        r,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      c.ctx.listener.upY.setTargetAtTime(
                        a,
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      c.ctx.listener.upZ.setTargetAtTime(
                        h,
                        Howler.ctx.currentTime,
                        0.1,
                      ))
                    : c.ctx.listener.setOrientation(e, i, n, r, a, h);
              else return u;
              return c;
            }),
            (Howl.prototype.init = (function (e) {
              return function (i) {
                var n = this;
                return (
                  (n._orientation = i.orientation || [1, 0, 0]),
                  (n._stereo = i.stereo || null),
                  (n._pos = i.pos || null),
                  (n._pannerAttr = {
                    coneInnerAngle:
                      typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : 360,
                    coneOuterAngle:
                      typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : 360,
                    coneOuterGain:
                      typeof i.coneOuterGain < "u" ? i.coneOuterGain : 0,
                    distanceModel:
                      typeof i.distanceModel < "u"
                        ? i.distanceModel
                        : "inverse",
                    maxDistance:
                      typeof i.maxDistance < "u" ? i.maxDistance : 1e4,
                    panningModel:
                      typeof i.panningModel < "u" ? i.panningModel : "HRTF",
                    refDistance: typeof i.refDistance < "u" ? i.refDistance : 1,
                    rolloffFactor:
                      typeof i.rolloffFactor < "u" ? i.rolloffFactor : 1,
                  }),
                  (n._onstereo = i.onstereo ? [{ fn: i.onstereo }] : []),
                  (n._onpos = i.onpos ? [{ fn: i.onpos }] : []),
                  (n._onorientation = i.onorientation
                    ? [{ fn: i.onorientation }]
                    : []),
                  e.call(this, i)
                );
              };
            })(Howl.prototype.init)),
            (Howl.prototype.stereo = function (e, i) {
              var n = this;
              if (!n._webAudio) return n;
              if (n._state !== "loaded")
                return (
                  n._queue.push({
                    event: "stereo",
                    action: function () {
                      n.stereo(e, i);
                    },
                  }),
                  n
                );
              var r =
                typeof Howler.ctx.createStereoPanner > "u"
                  ? "spatial"
                  : "stereo";
              if (typeof i > "u")
                if (typeof e == "number") (n._stereo = e), (n._pos = [e, 0, 0]);
                else return n._stereo;
              for (var a = n._getSoundIds(i), h = 0; h < a.length; h++) {
                var c = n._soundById(a[h]);
                if (c)
                  if (typeof e == "number")
                    (c._stereo = e),
                      (c._pos = [e, 0, 0]),
                      c._node &&
                        ((c._pannerAttr.panningModel = "equalpower"),
                        (!c._panner || !c._panner.pan) && t(c, r),
                        r === "spatial"
                          ? typeof c._panner.positionX < "u"
                            ? (c._panner.positionX.setValueAtTime(
                                e,
                                Howler.ctx.currentTime,
                              ),
                              c._panner.positionY.setValueAtTime(
                                0,
                                Howler.ctx.currentTime,
                              ),
                              c._panner.positionZ.setValueAtTime(
                                0,
                                Howler.ctx.currentTime,
                              ))
                            : c._panner.setPosition(e, 0, 0)
                          : c._panner.pan.setValueAtTime(
                              e,
                              Howler.ctx.currentTime,
                            )),
                      n._emit("stereo", c._id);
                  else return c._stereo;
              }
              return n;
            }),
            (Howl.prototype.pos = function (e, i, n, r) {
              var a = this;
              if (!a._webAudio) return a;
              if (a._state !== "loaded")
                return (
                  a._queue.push({
                    event: "pos",
                    action: function () {
                      a.pos(e, i, n, r);
                    },
                  }),
                  a
                );
              if (
                ((i = typeof i != "number" ? 0 : i),
                (n = typeof n != "number" ? -0.5 : n),
                typeof r > "u")
              )
                if (typeof e == "number") a._pos = [e, i, n];
                else return a._pos;
              for (var h = a._getSoundIds(r), c = 0; c < h.length; c++) {
                var u = a._soundById(h[c]);
                if (u)
                  if (typeof e == "number")
                    (u._pos = [e, i, n]),
                      u._node &&
                        ((!u._panner || u._panner.pan) && t(u, "spatial"),
                        typeof u._panner.positionX < "u"
                          ? (u._panner.positionX.setValueAtTime(
                              e,
                              Howler.ctx.currentTime,
                            ),
                            u._panner.positionY.setValueAtTime(
                              i,
                              Howler.ctx.currentTime,
                            ),
                            u._panner.positionZ.setValueAtTime(
                              n,
                              Howler.ctx.currentTime,
                            ))
                          : u._panner.setPosition(e, i, n)),
                      a._emit("pos", u._id);
                  else return u._pos;
              }
              return a;
            }),
            (Howl.prototype.orientation = function (e, i, n, r) {
              var a = this;
              if (!a._webAudio) return a;
              if (a._state !== "loaded")
                return (
                  a._queue.push({
                    event: "orientation",
                    action: function () {
                      a.orientation(e, i, n, r);
                    },
                  }),
                  a
                );
              if (
                ((i = typeof i != "number" ? a._orientation[1] : i),
                (n = typeof n != "number" ? a._orientation[2] : n),
                typeof r > "u")
              )
                if (typeof e == "number") a._orientation = [e, i, n];
                else return a._orientation;
              for (var h = a._getSoundIds(r), c = 0; c < h.length; c++) {
                var u = a._soundById(h[c]);
                if (u)
                  if (typeof e == "number")
                    (u._orientation = [e, i, n]),
                      u._node &&
                        (u._panner ||
                          (u._pos || (u._pos = a._pos || [0, 0, -0.5]),
                          t(u, "spatial")),
                        typeof u._panner.orientationX < "u"
                          ? (u._panner.orientationX.setValueAtTime(
                              e,
                              Howler.ctx.currentTime,
                            ),
                            u._panner.orientationY.setValueAtTime(
                              i,
                              Howler.ctx.currentTime,
                            ),
                            u._panner.orientationZ.setValueAtTime(
                              n,
                              Howler.ctx.currentTime,
                            ))
                          : u._panner.setOrientation(e, i, n)),
                      a._emit("orientation", u._id);
                  else return u._orientation;
              }
              return a;
            }),
            (Howl.prototype.pannerAttr = function () {
              var e = this,
                i = arguments,
                n,
                r,
                a;
              if (!e._webAudio) return e;
              if (i.length === 0) return e._pannerAttr;
              if (i.length === 1)
                if (typeof i[0] == "object")
                  (n = i[0]),
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
                    (a = e._soundById(parseInt(i[0], 10))),
                    a ? a._pannerAttr : e._pannerAttr
                  );
              else i.length === 2 && ((n = i[0]), (r = parseInt(i[1], 10)));
              for (var h = e._getSoundIds(r), c = 0; c < h.length; c++)
                if (((a = e._soundById(h[c])), a)) {
                  var u = a._pannerAttr;
                  u = {
                    coneInnerAngle:
                      typeof n.coneInnerAngle < "u"
                        ? n.coneInnerAngle
                        : u.coneInnerAngle,
                    coneOuterAngle:
                      typeof n.coneOuterAngle < "u"
                        ? n.coneOuterAngle
                        : u.coneOuterAngle,
                    coneOuterGain:
                      typeof n.coneOuterGain < "u"
                        ? n.coneOuterGain
                        : u.coneOuterGain,
                    distanceModel:
                      typeof n.distanceModel < "u"
                        ? n.distanceModel
                        : u.distanceModel,
                    maxDistance:
                      typeof n.maxDistance < "u"
                        ? n.maxDistance
                        : u.maxDistance,
                    refDistance:
                      typeof n.refDistance < "u"
                        ? n.refDistance
                        : u.refDistance,
                    rolloffFactor:
                      typeof n.rolloffFactor < "u"
                        ? n.rolloffFactor
                        : u.rolloffFactor,
                    panningModel:
                      typeof n.panningModel < "u"
                        ? n.panningModel
                        : u.panningModel,
                  };
                  var d = a._panner;
                  d ||
                    (a._pos || (a._pos = e._pos || [0, 0, -0.5]),
                    t(a, "spatial"),
                    (d = a._panner)),
                    (d.coneInnerAngle = u.coneInnerAngle),
                    (d.coneOuterAngle = u.coneOuterAngle),
                    (d.coneOuterGain = u.coneOuterGain),
                    (d.distanceModel = u.distanceModel),
                    (d.maxDistance = u.maxDistance),
                    (d.refDistance = u.refDistance),
                    (d.rolloffFactor = u.rolloffFactor),
                    (d.panningModel = u.panningModel);
                }
              return e;
            }),
            (Sound.prototype.init = (function (e) {
              return function () {
                var i = this,
                  n = i._parent;
                (i._orientation = n._orientation),
                  (i._stereo = n._stereo),
                  (i._pos = n._pos),
                  (i._pannerAttr = n._pannerAttr),
                  e.call(this),
                  i._stereo
                    ? n.stereo(i._stereo)
                    : i._pos && n.pos(i._pos[0], i._pos[1], i._pos[2], i._id);
              };
            })(Sound.prototype.init)),
            (Sound.prototype.reset = (function (e) {
              return function () {
                var i = this,
                  n = i._parent;
                return (
                  (i._orientation = n._orientation),
                  (i._stereo = n._stereo),
                  (i._pos = n._pos),
                  (i._pannerAttr = n._pannerAttr),
                  i._stereo
                    ? n.stereo(i._stereo)
                    : i._pos
                      ? n.pos(i._pos[0], i._pos[1], i._pos[2], i._id)
                      : i._panner &&
                        (i._panner.disconnect(0),
                        (i._panner = void 0),
                        n._refreshBuffer(i)),
                  e.call(this)
                );
              };
            })(Sound.prototype.reset));
          var t = function (e, i) {
            (i = i || "spatial"),
              i === "spatial"
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
      })(Ki)),
    Ki
  );
}
var Ft = Ju();
const Zu = "" + new URL("cat-Do1rA87j.mp3", import.meta.url).href,
  $u = "" + new URL("close-menu-DTE6uNMS.mp3", import.meta.url).href,
  td = "" + new URL("cursor-option-_4GNbUGN.mp3", import.meta.url).href,
  ed = "" + new URL("error-DQ9ZzJfh.mp3", import.meta.url).href,
  id = "" + new URL("success-BVhUyClL.mp3", import.meta.url).href,
  sd = "" + new URL("open-menu-C5sx5p5_.mp3", import.meta.url).href,
  nd = "" + new URL("open-55TaSYX1.mp3", import.meta.url).href,
  rd = "" + new URL("read-word-BO443h0C.mp3", import.meta.url).href,
  ad = "" + new URL("success-BVhUyClL.mp3", import.meta.url).href,
  od = "" + new URL("toggle-switch-mpDd_DbR.mp3", import.meta.url).href,
  hd = "" + new URL("turn-page-Dt6S3YA4.mp3", import.meta.url).href,
  ld = "" + new URL("typing-7_apPxmI.mp3", import.meta.url).href,
  Z = {
    cursorOption: new Ft.Howl({ src: [td], preload: !1 }),
    turnPage: new Ft.Howl({ src: [hd], preload: !1 }),
    error: new Ft.Howl({ src: [ed], preload: !1 }),
    toggleSwitch: new Ft.Howl({ src: [od], preload: !1, volume: 2 }),
    readWord: new Ft.Howl({ src: [rd], volume: 0.03, preload: !1 }),
    typing: new Ft.Howl({ src: [ld], preload: !1 }),
    cat: new Ft.Howl({ src: [Zu], volume: 0.3, preload: !1 }),
    getItem: new Ft.Howl({ src: [id], volume: 0.5, preload: !1 }),
    success: new Ft.Howl({ src: [ad], volume: 0.5, preload: !1 }),
    openMenu: new Ft.Howl({ src: [sd], volume: 0.5, preload: !1 }),
    closeMenu: new Ft.Howl({ src: [$u], volume: 0.5, preload: !1 }),
    openSomething: new Ft.Howl({ src: [nd], volume: 0.5, preload: !1 }),
  },
  cd = Object.keys(Z).length,
  Ad = (s) => {
    for (const t in Z) {
      const e = t;
      Z[e].on("load", () => {
        s();
      }),
        Z[e].load();
    }
    return cd;
  },
  dt = class dt {
    constructor(t, e) {
      w(this, "gameScreen");
      w(this, "event");
      w(this, "text");
      w(this, "displayText");
      w(
        this,
        "textStyle",
        new Ut({
          fill: "#fff",
          wordWrap: !0,
          wordWrapWidth: dt.containerSize.width - dt.containerPadding.x * 2,
          lineHeight: dt.textHeight,
          fontSize: 16,
          fontFamily: "DotGothic16",
        }),
      );
      (this.gameScreen = t),
        this.gameScreen.messageContainer.removeChildren(),
        (this.gameScreen.messageContainer.x = 0),
        (this.gameScreen.messageContainer.y =
          k.HEIGHT - dt.containerSize.height - dt.containerMargin.y * 2);
      const i = new Pt()
        .roundRect(
          dt.containerMargin.x,
          dt.containerMargin.y,
          dt.containerSize.width,
          dt.containerSize.height,
          4,
        )
        .fill({ color: "black" });
      this.gameScreen.messageContainer.addChild(i),
        (this.text = `${e} `),
        (this.displayText = new Be({
          text: "",
          x: dt.containerMargin.x + dt.containerPadding.x,
          y: dt.containerMargin.y + dt.containerPadding.y,
          style: this.textStyle,
        })),
        this.gameScreen.messageContainer.addChild(this.displayText),
        (this.event = this.createEvent());
    }
    clearMessage() {
      this.gameScreen.messageContainer.removeChildren();
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
          Z.readWord.play(),
          yield;
      yield* j(3);
    }
  };
w(dt, "textHeight", 26),
  w(dt, "containerPadding", { x: 18, y: 18 }),
  w(dt, "containerMargin", { x: 4, y: 4 }),
  w(dt, "containerSize", {
    width: V.WIDTH - dt.containerMargin.x * 2,
    height: dt.textHeight * 2 + dt.containerPadding.y * 2,
  });
let Ie = dt;
const et = class et {
  constructor(t, e, i) {
    w(this, "gameScreen");
    w(this, "event");
    w(this, "text");
    w(this, "displayText");
    w(
      this,
      "textStyle",
      new Ut({
        fill: "#fff",
        wordWrap: !0,
        wordWrapWidth:
          et.containerSize.width -
          et.containerPadding.x * 2 -
          et.avatarSize -
          et.containerPadding.x,
        lineHeight: et.textHeight,
        fontSize: 16,
        fontFamily: "DotGothic16",
      }),
    );
    (this.gameScreen = t),
      this.gameScreen.messageContainer.removeChildren(),
      (this.gameScreen.messageContainer.x = 0),
      (this.gameScreen.messageContainer.y =
        k.HEIGHT - et.containerSize.height - et.containerMargin.y * 2);
    const n = new Pt()
      .roundRect(
        et.containerMargin.x,
        et.containerMargin.y,
        et.containerSize.width,
        et.containerSize.height,
        4,
      )
      .fill({ color: "black" });
    this.gameScreen.messageContainer.addChild(n),
      this.gameScreen.messageContainer.addChild(
        new Y({
          texture: i,
          width: et.avatarSize,
          height: et.avatarSize,
          x: et.containerMargin.x + et.containerPadding.x,
          y: et.containerMargin.y + 8,
        }),
      ),
      (this.text = `${e} `),
      (this.displayText = new Be({
        text: "",
        x:
          et.containerMargin.x +
          et.containerPadding.x +
          et.avatarSize +
          et.containerPadding.x,
        y: et.containerMargin.y + et.containerPadding.y,
        style: this.textStyle,
      })),
      this.gameScreen.messageContainer.addChild(this.displayText),
      (this.event = this.createEvent());
  }
  clearMessage() {
    this.gameScreen.messageContainer.removeChildren();
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
        Z.readWord.play(),
        yield;
    yield* j(3);
  }
};
w(et, "textHeight", 26),
  w(et, "containerPadding", { x: 8, y: 18 }),
  w(et, "containerMargin", { x: 4, y: 4 }),
  w(et, "containerSize", {
    width: V.WIDTH - et.containerMargin.x * 2,
    height: et.textHeight * 2 + et.containerPadding.y * 2,
  }),
  w(et, "avatarSize", et.textHeight * 2 + 20);
let ms = et;
function* F(s, t) {
  const e = new Ie(s, t);
  yield* e.event, yield* Ye(["ACTION"]), e.clearMessage();
}
function* it(s, t, e) {
  const i = new ms(s, t, e);
  yield* i.event, yield* Ye(["ACTION"]), i.clearMessage();
}
class ud {
  constructor(t) {
    w(this, "event");
    w(
      this,
      "overlay",
      new Pt().rect(0, 0, V.WIDTH, V.HEIGHT).fill({ color: "black" }),
    );
    this.gameScreen = t;
  }
  open() {
    this.gameScreen.stopwatch.stop(),
      (this.gameScreen.state = fe.ENDING),
      (this.overlay.alpha = 0),
      this.gameScreen.endingContainer.addChild(this.overlay),
      (this.event = this.createEvent());
  }
  *createEvent() {
    for (; this.overlay.alpha < 1; ) yield* j(5), (this.overlay.alpha += 0.1);
    yield* j(50),
      yield* it(
        this.gameScreen,
        "...やっと部屋からでることができました",
        B.playerComment1,
      ),
      yield* it(this.gameScreen, "ご飯の用意をしないと...", B.playerComment1),
      yield* F(this.gameScreen, "..."),
      yield* it(this.gameScreen, "脱出おめでとーーーー", B.avatarHaru3),
      yield* it(
        this.gameScreen,
        "わっ なんですか...!? ハル...?",
        B.playerComment4,
      );
    const t = Math.ceil(this.gameScreen.stopwatch.getElapsedTimeInMinutes()),
      e = [1, 3, 5, 10, 20, 30, 60],
      i = {
        1: `なんと ${t}分！くらい！ 早すぎるねー`,
        3: `${t}分！くらい！ 早いねー`,
        5: `${t}分！くらい！ さすがだねー`,
        10: `${t}分！くらい！ すごいねー`,
        20: `${t}分！くらい！ まずまずだねー`,
        30: `${t}分！くらい！ 遅いねー`,
        60: `${t}分！くらい！ 遅すぎるねー`,
        default: `${t}分！くらい！ あっという間だねー`,
      },
      n = e.find((h) => h >= t),
      r = i[n ?? "default"];
    yield* it(
      this.gameScreen,
      `さてさて クリアタイムはーー...
${r}`,
      B.avatarHaru3,
    ),
      yield* it(
        this.gameScreen,
        `暇だったから 簡単に作ってみたんだけど
楽しんでもらえて何よりだよー`,
        B.avatarHaru4,
      ),
      yield* it(this.gameScreen, "...", B.avatarHaru4),
      yield* it(this.gameScreen, "...", B.avatarHaru4),
      yield* it(this.gameScreen, "って あれ...？", B.avatarHaru1),
      yield* it(this.gameScreen, "...", B.playerComment3),
      yield* it(
        this.gameScreen,
        "...夜ご飯 自分の分は自分で用意してください",
        B.playerComment3,
      ),
      yield* it(this.gameScreen, "そ そんなぁー", B.avatarHaru5);
    const a = new Y(B.cutsEndCard);
    for (
      a.width = 256 * 1.25,
        a.height = 164 * 1.25,
        a.y = (V.HEIGHT - a.height) / 3,
        a.x = (V.WIDTH - a.width) / 2,
        a.alpha = 0,
        this.gameScreen.endingContainer.addChild(a);
      a.alpha < 1;

    )
      yield* j(6), (a.alpha += 0.1);
    for (yield* F(this.gameScreen, "Thank you for playing"); a.alpha > 0; )
      yield* j(6), (a.alpha -= 0.1);
    yield* j(10);
  }
  close() {
    this.gameScreen.titleContainer.removeChildren();
  }
  processInput() {
    var e;
    this.scaleSize();
    const t = (e = this.event) == null ? void 0 : e.next();
    t != null && t.done && ((this.event = void 0), this.gameScreen.onGameEnd());
  }
  scaleSize() {
    const t = Math.min(
      this.gameScreen.app.screen.width / V.WIDTH,
      this.gameScreen.app.screen.height / V.HEIGHT,
    );
    this.gameScreen.app.stage.scale = t;
  }
}
const dd = (s, t) => [s[0] + t[0], s[1] + t[1]],
  fd = (s, t) => [s[0] - t[0], s[1] - t[1]],
  gd = (s, t) => s[0] === t[0] && s[1] === t[1],
  pd = (s, t) => [s[0] * t, s[1] * t],
  H = { sum: dd, sub: fd, eq: gd, scale: pd };
class Ma {
  constructor() {
    w(this, "has", !1);
  }
}
const Ta = "memo-item";
class md extends Ma {
  constructor() {
    super();
    w(this, "sprite");
    w(this, "menuItemTexture");
    w(this, "id", Ta);
    w(
      this,
      "description",
      `絵が描かれたメモ用紙
よく見ると枠が引かれている`,
    );
    (this.sprite = new Y(B.itemsMemo)), (this.menuItemTexture = B.itemsMemo);
  }
}
const yd = "mini-memo-item";
class xd extends Ma {
  constructor() {
    super();
    w(this, "sprite");
    w(this, "menuItemTexture");
    w(this, "id", yd);
    w(this, "description", "文字が描かれたメモ用紙");
    (this.sprite = new Y(B.itemsMiniMemo)),
      (this.menuItemTexture = B.itemsMiniMemo);
  }
}
class wd {
  constructor(t) {
    w(this, "gameScreen");
    this.gameScreen = t;
  }
}
class Cd extends wd {
  constructor() {
    super(...arguments);
    w(this, "disabled", !1);
  }
  listen() {
    return this.disabled
      ? null
      : H.eq(
            this.gameScreen.player.frontTilePos(),
            this.gameScreen.objects.mantis.tilePosition,
          ) && ct.ACTION === "PRESSED"
        ? this.createEvent()
        : null;
  }
  *createEvent() {
    switch (this.gameScreen.objects.mantis.status) {
      case "noPower": {
        yield* F(
          this.gameScreen,
          "カマキリのようなロボットが 何かを捕まえている",
        ),
          yield* F(
            this.gameScreen,
            "取ろうとするが 固くて取ることができないようだ",
          ),
          yield* it(
            this.gameScreen,
            "電源を入れたら 取れるようになるかもしれません",
            B.playerComment1,
          );
        break;
      }
      case "caughtKey": {
        yield* F(
          this.gameScreen,
          "カマキリのようなロボットが 何かを捕まえている",
        ),
          Z.getItem.play(),
          yield* F(this.gameScreen, "メモ用紙を手に入れた"),
          this.gameScreen.items.add(new xd()),
          this.gameScreen.objects.mantis.setStatus("play");
        break;
      }
      case "play": {
        yield* F(
          this.gameScreen,
          "カマキリのようなロボットは 獲物を待っている",
        );
        break;
      }
      case "caught":
        yield* F(
          this.gameScreen,
          "カマキリのようなロボットが 何かを捕まえている",
        ),
          Z.getItem.play(),
          yield* F(this.gameScreen, "カマキリからメモ用紙を手に入れた"),
          yield* it(
            this.gameScreen,
            `あのチョウのような姿で飛び回っていたものは
メモ用紙だったのですね...`,
            B.playerComment2,
          ),
          this.gameScreen.items.add(new md()),
          this.gameScreen.objects.mantis.setStatus("play");
        break;
    }
  }
}
class bd {
  constructor(t) {
    w(this, "gameScreen");
    w(this, "events");
    w(this, "runningEvent", null);
    (this.gameScreen = t), (this.events = [new Cd(this.gameScreen)]);
  }
  setRunningEvent(t) {
    (this.runningEvent = t), (this.gameScreen.state = fe.EVENT);
  }
  listen() {
    if (!this.runningEvent) {
      for (const t of this.events) {
        const e = t.listen();
        if (e) {
          this.setRunningEvent(e);
          return;
        }
      }
      for (const t of this.gameScreen.objects.objects) {
        const e = t.listenEvent();
        if (e) {
          this.setRunningEvent(e);
          return;
        }
      }
    }
  }
  process() {
    if (!this.runningEvent) return;
    this.runningEvent.next().done &&
      ((this.runningEvent = null),
      this.gameScreen.state === fe.EVENT &&
        (this.gameScreen.state = fe.PLAYING));
  }
}
class vd {
  constructor(t) {
    w(this, "items");
    (this.gameScreen = t), (this.items = []);
  }
  add(t) {
    this.items.push(t);
  }
  remove(t) {
    const e = this.items.findIndex((i) => i.id === t);
    e >= 0 && this.items.splice(e, 1);
  }
  has(t) {
    return this.items.some((e) => e.id === t);
  }
}
function* ys(s, t, e = 1) {
  if ((s < t && e <= 0) || (s > t && e >= 0)) throw new Error();
  const i = e > 0 ? 1 : -1;
  for (let n = s * i; n < t * i; n += e * i) yield n && n * i;
}
class Ed {
  constructor(t) {
    w(this, "selectedIndex", 0);
    w(this, "itemMaxIndex", 2);
    w(this, "containerSize", 64);
    w(this, "containerGap", 8);
    w(
      this,
      "descriptionText",
      new Be({
        text: "",
        x: 22,
        y: V.HEIGHT - 74,
        style: new Ut({
          fill: "#fff",
          wordWrap: !0,
          lineHeight: 16,
          fontSize: 16,
          fontFamily: "DotGothic16",
        }),
      }),
    );
    w(this, "selectedSprite", new Y(B.transparent));
    w(this, "itemSelectionContainerPosition", {
      x: V.WIDTH - (this.containerSize + 10),
      y: 10,
    });
    w(this, "selectedItemContainerSize", {
      width: this.itemSelectionContainerPosition.x,
      height: V.HEIGHT - 74,
    });
    w(
      this,
      "selectedRect",
      new Pt()
        .rect(0, 0, this.containerSize, this.containerSize)
        .stroke({ color: "#ff6f00", width: 2 }),
    );
    this.gameScreen = t;
  }
  openMenu() {
    Z.openMenu.play(),
      (this.selectedIndex = 0),
      this.gameScreen.titleContainer.addChild(
        new Pt().rect(0, 0, V.WIDTH, V.HEIGHT).fill({ color: "black" }),
      );
    const t = new gt({
      x: this.itemSelectionContainerPosition.x,
      y: this.itemSelectionContainerPosition.y,
    });
    t.addChild(this.selectedRect);
    for (const i of ys(0, this.itemMaxIndex + 1))
      t.addChild(
        new Pt()
          .roundRect(
            0,
            (this.containerSize + this.containerGap) * i,
            this.containerSize,
            this.containerSize,
            2,
          )
          .fill({ color: "#263238" }),
      );
    this.gameScreen.items.items.forEach((i, n) => {
      const r = new gt();
      (r.y = (this.containerSize + this.containerGap) * n),
        (i.sprite.width = this.containerSize),
        (i.sprite.height = this.containerSize),
        r.addChild(i.sprite),
        t.addChild(r);
    }),
      this.gameScreen.titleContainer.addChild(t);
    const e = new gt();
    e.addChild(this.descriptionText),
      e.addChild(this.selectedSprite),
      this.gameScreen.titleContainer.addChild(e);
  }
  closeMenu() {
    Z.closeMenu.play(), this.gameScreen.titleContainer.removeChildren();
  }
  processInput() {
    ct.UP === "PRESSED" &&
      (this.selectedIndex >= 1 && (this.selectedIndex -= 1),
      Z.cursorOption.play()),
      ct.DOWN === "PRESSED" &&
        (this.selectedIndex <= this.itemMaxIndex - 1 &&
          (this.selectedIndex += 1),
        Z.cursorOption.play());
  }
  beforeRender() {
    var t, e;
    (this.selectedRect.y =
      (this.containerSize + this.containerGap) * this.selectedIndex),
      (this.descriptionText.text =
        ((t = this.gameScreen.items.items[this.selectedIndex]) == null
          ? void 0
          : t.description) ?? ""),
      (this.selectedSprite.texture =
        ((e = this.gameScreen.items.items[this.selectedIndex]) == null
          ? void 0
          : e.menuItemTexture) ?? B.transparent),
      (this.selectedSprite.width = this.selectedSprite.texture.width),
      (this.selectedSprite.height = this.selectedSprite.texture.height),
      this.selectedSprite.anchor.set(0.5, 0.5),
      (this.selectedSprite.x = this.selectedItemContainerSize.width / 2),
      (this.selectedSprite.y = this.selectedItemContainerSize.height / 2);
  }
}
class xt {
  constructor(t) {
    w(this, "gameScreen");
    w(this, "width", k.CELL_SIZE);
    w(this, "height", k.CELL_SIZE);
    w(this, "isDead", !1);
    this.gameScreen = t;
  }
  processInput() {}
  update() {
    return !1;
  }
  beforeRender() {
    this.sprite.zIndex = this.sprite.y * 10 + this.layerOffset;
  }
  listenEvent() {
    return null;
  }
  isCollision(t) {
    return H.eq(this.tilePosition, t);
  }
}
class Sd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 1);
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsBalanceBall)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return H.eq(this.gameScreen.player.frontTilePos(), this.tilePosition) &&
      ct.ACTION === "PRESSED"
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    yield* F(this.gameScreen, "バランスボールだ");
  }
}
const Et = class Et {
  constructor(t, e) {
    w(this, "event");
    w(this, "numberCommandContainer");
    w(this, "selectedNumber", 0);
    w(this, "commands");
    w(this, "selectedRect");
    w(this, "containerSize", {
      width: 12 * 4 + Et.containerPadding.x * 2,
      height: Et.textHeight + Et.containerPadding.y * 2,
    });
    (this.gameScreen = t),
      (this.commands = e),
      (this.containerSize.height =
        Et.textHeight * this.commands.length + Et.containerPadding.y * 2),
      (this.numberCommandContainer = new gt()),
      this.gameScreen.messageContainer.addChild(this.numberCommandContainer),
      (this.numberCommandContainer.y = -this.containerSize.height),
      (this.numberCommandContainer.x = k.WIDTH - this.containerSize.width - 4);
    const i = new Pt()
      .roundRect(0, 0, this.containerSize.width, this.containerSize.height, 4)
      .fill({ color: "#000000" });
    this.numberCommandContainer.addChild(i),
      (this.selectedNumber = 0),
      (this.selectedRect = new Pt()
        .rect(0, Et.containerPadding.y, this.containerSize.width, Et.textHeight)
        .fill({ color: "#333333" })),
      this.numberCommandContainer.addChild(this.selectedRect);
    const n = new Ut({
      fill: "#ffffff",
      wordWrap: !0,
      wordWrapWidth: this.containerSize.width - Et.containerPadding.x * 2,
      lineHeight: Et.textHeight,
      fontSize: 16,
      fontFamily: "DotGothic16",
    });
    this.commands.forEach((r, a) => {
      this.numberCommandContainer.addChild(
        new Be({
          text: r,
          style: n,
          x: Et.containerPadding.x,
          y: Et.containerPadding.y + a * Et.textHeight,
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
      yield;
      const t = this.commands.length;
      if (
        (ct.UP === "PRESSED"
          ? ((this.selectedNumber = (this.selectedNumber - 1 + t) % t),
            (this.selectedRect.y = this.selectedNumber * Et.textHeight),
            Z.cursorOption.play())
          : ct.DOWN === "PRESSED" &&
            ((this.selectedNumber = (this.selectedNumber + 1) % t),
            (this.selectedRect.y = this.selectedNumber * Et.textHeight),
            Z.cursorOption.play()),
        ct.ACTION === "PRESSED")
      )
        return this.commands[this.selectedNumber];
    }
  }
};
w(Et, "textHeight", 26), w(Et, "containerPadding", { x: 18, y: 12 });
let xs = Et;
const wt = class wt {
  constructor(t) {
    w(this, "event");
    w(this, "numberCommandContainer");
    w(this, "selectedNumbers", [0, 0, 0]);
    w(this, "selectedText");
    w(this, "selectionIndex", 0);
    w(
      this,
      "arrowUp",
      new Y({
        texture: B.partsArrowUp,
        width: 8,
        height: 8,
        anchor: 0.5,
        x: wt.containerPadding.x + 4,
        y: wt.containerPadding.y - 2,
      }),
    );
    w(
      this,
      "arrowDown",
      new Y({
        texture: B.partsArrowUp,
        width: 8,
        height: 8,
        rotation: Math.PI,
        anchor: 0.5,
        x: wt.containerPadding.x + 4,
        y: wt.containerPadding.y + wt.textHeight + 2,
      }),
    );
    (this.gameScreen = t),
      (this.numberCommandContainer = new gt()),
      this.gameScreen.messageContainer.addChild(this.numberCommandContainer),
      (this.numberCommandContainer.y = -50),
      (this.numberCommandContainer.x = k.WIDTH - wt.containerSize.width - 4);
    const e = new Pt()
      .roundRect(0, 0, wt.containerSize.width, wt.containerSize.height, 4)
      .fill({ color: "#000000" });
    this.numberCommandContainer.addChild(e),
      (this.selectedNumbers = [0, 0, 0]),
      (this.selectedText = new uA({
        text: this.selectedNumbers.map(String).join(""),
        style: {
          fill: "#ffffff",
          lineHeight: wt.textHeight,
          fontSize: 16,
          fontFamily: "DotGothic16",
          fontWeight: "bold",
          letterSpacing: 5,
        },
        x: wt.containerPadding.x,
        y: wt.containerPadding.y + 5,
      })),
      this.numberCommandContainer.addChild(this.selectedText),
      this.numberCommandContainer.addChild(this.arrowUp),
      this.numberCommandContainer.addChild(this.arrowDown),
      (this.event = this.createEvent());
  }
  clear() {
    this.numberCommandContainer.removeChildren(),
      this.numberCommandContainer.removeFromParent();
  }
  *createEvent() {
    for (;;)
      if (
        (yield,
        ct.UP === "PRESSED"
          ? ((this.selectedNumbers[this.selectionIndex] =
              (this.selectedNumbers[this.selectionIndex] - 1 + 10) % 10),
            (this.selectedText.text = this.selectedNumbers
              .map(String)
              .join("")),
            Z.typing.play())
          : ct.DOWN === "PRESSED"
            ? ((this.selectedNumbers[this.selectionIndex] =
                (this.selectedNumbers[this.selectionIndex] + 1) % 10),
              (this.selectedText.text = this.selectedNumbers
                .map(String)
                .join("")),
              Z.typing.play())
            : ct.LEFT === "PRESSED"
              ? ((this.selectionIndex = (this.selectionIndex - 1 + 3) % 3),
                Z.typing.play())
              : ct.RIGHT === "PRESSED" &&
                ((this.selectionIndex = (this.selectionIndex + 1 + 3) % 3),
                Z.typing.play()),
        (this.arrowUp.x = wt.containerPadding.x + 4 + this.selectionIndex * 13),
        (this.arrowDown.x = this.arrowUp.x),
        ct.ACTION === "PRESSED")
      )
        return (
          (this.selectedText.text = "7"),
          Z.typing.play(),
          this.selectedNumbers[0] * 100 +
            this.selectedNumbers[1] * 10 +
            this.selectedNumbers[2]
        );
  }
};
w(wt, "textHeight", 26),
  w(wt, "containerPadding", { x: 12, y: 12 }),
  w(wt, "containerSize", {
    width: 10 * 3 + wt.containerPadding.x * 2,
    height: wt.textHeight + wt.containerPadding.y * 2,
  });
let fi = wt;
function* Fs(s, t, e) {
  const i = new Ie(s, t);
  yield* i.event;
  const n = new xs(s, e),
    r = yield* n.event;
  return n.clear(), i.clearMessage(), r;
}
function* Bd(s, t) {
  const e = new Ie(s, t);
  yield* e.event;
  const i = new fi(s),
    n = yield* i.event;
  return i.clear(), e.clearMessage(), n;
}
const Tt = (s, t) => H.eq(s.frontTilePos(), t) && ct.ACTION === "PRESSED";
class Id extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.width = k.CELL_SIZE * 3),
      (this.height = k.CELL_SIZE * 3),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsBookShelf)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.66),
      e.objectContainer.addChild(this.sprite);
  }
  isCollision(e) {
    return (
      H.eq(e, this.tilePosition) ||
      H.eq(H.sum(e, [-1, 0]), this.tilePosition) ||
      H.eq(H.sum(e, [-2, 0]), this.tilePosition)
    );
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createReadBookEvent()
      : Tt(this.gameScreen.player, H.sum(this.tilePosition, [1, 0])) ||
          Tt(this.gameScreen.player, H.sum(this.tilePosition, [2, 0]))
        ? this.createBookViewEvent()
        : null;
  }
  *createReadBookEvent() {
    if (
      (yield* Fs(
        this.gameScreen,
        `魔法陣についての 本がある
読みますか？`,
        ["はい", "いいえ"],
      )) === "いいえ"
    )
      return;
    Z.turnPage.play(),
      yield* F(
        this.gameScreen,
        '"魔法陣とは １から９の数字を使った パズルです。"',
      ),
      Z.turnPage.play();
    const i = new Y(B.cutsMagicSquare2);
    (i.width = k.WIDTH),
      (i.height = k.HEIGHT),
      this.gameScreen.cutinContainer.addChild(i),
      yield* F(
        this.gameScreen,
        `"図のように マスの中に１から９の数字を一つずつ入れ
たて よこ ななめ それぞれの合計が同じになると 完成です。"`,
      ),
      Z.turnPage.play(),
      i.removeFromParent();
  }
  *createBookViewEvent() {
    yield* F(this.gameScreen, "本が並んでいる");
  }
}
const Gs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] },
  _d = (s, t) => H.sum(s, Gs[t]),
  gi = (s, t) => (s >= t ? s : t),
  pi = (s, t) => (s <= t ? s : t);
class Pd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "_mode", "play");
    w(this, "isNoCollision", !1);
    w(this, "layerOffset", 2);
    w(this, "availableZone", { x1: 0, y1: 1, x2: 9, y2: 7 });
    w(this, "movements", []);
    (this.tilePosition = i),
      (this.sprite = new pe([B.objectsButterfly1, B.objectsButterfly2])),
      this.sprite.play(),
      (this.sprite.animationSpeed = 0.05),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      (this.movements = []),
      e.objectContainer.addChild(this.sprite);
  }
  beforeRender() {
    super.beforeRender(), this.update();
  }
  processInput() {
    if (this._mode !== "play" || this.movements.length > 0 || this.isDead)
      return;
    const [e, i] = H.sub(
      this.tilePosition,
      this.gameScreen.player.tilePosition,
    );
    if (Math.abs(e) < 4 && Math.abs(i) < 4 && Math.abs(e) + Math.abs(i) < 6)
      if (Math.abs(e) < Math.abs(i)) {
        if (e > 0) {
          if (this.isCollisionWithSomething(H.sum(this.tilePosition, [1, 0]))) {
            this.movements.push("left"),
              this.movements.push("left"),
              this.movements.push("left"),
              this.movements.push("left");
            return;
          }
          this.movements.push("right");
          return;
        }
        if (e <= 0) {
          if (
            this.isCollisionWithSomething(H.sum(this.tilePosition, [-1, 0]))
          ) {
            this.movements.push("right"),
              this.movements.push("right"),
              this.movements.push("right"),
              this.movements.push("right");
            return;
          }
          this.movements.push("left");
          return;
        }
      } else {
        if (i > 0) {
          if (this.isCollisionWithSomething(H.sum(this.tilePosition, [0, 1]))) {
            this.movements.push("up"),
              this.movements.push("up"),
              this.movements.push("up"),
              this.movements.push("up");
            return;
          }
          this.movements.push("down");
          return;
        }
        if (i <= 0) {
          if (
            this.isCollisionWithSomething(H.sum(this.tilePosition, [0, -1]))
          ) {
            this.movements.push("down"),
              this.movements.push("down"),
              this.movements.push("down"),
              this.movements.push("down");
            return;
          }
          this.movements.push("up");
          return;
        }
      }
  }
  getMode() {
    return this._mode;
  }
  selectMove() {
    const e = this.movements.shift();
    if (e) {
      const i = Gs[e],
        n = H.sum(this.tilePosition, i);
      if (!this.isCollisionWithSomething(n))
        return (this.tilePosition = H.sum(this.tilePosition, i)), !0;
    }
    return !1;
  }
  update() {
    switch (this._mode) {
      case "move": {
        this._move() &&
          (this.gameScreen.objects.mantis.status === "play" &&
            H.eq(
              this.tilePosition,
              this.gameScreen.objects.mantis.tilePosition,
            ) &&
            (this.gameScreen.objects.mantis.setStatus("caught"),
            (this.isDead = !0)),
          this.selectMove() || (this._mode = "play"));
        break;
      }
      case "play": {
        this.selectMove() && (this._mode = "move");
        break;
      }
    }
    return !1;
  }
  _move() {
    const e = H.sum(H.scale(this.tilePosition, k.CELL_SIZE), [
      -this.sprite.x,
      -this.sprite.y,
    ]);
    if (H.eq(e, [0, 0])) return !0;
    const i = 6,
      [n, r] = e;
    return (
      n > 0 && (this.sprite.x += pi(i, n)),
      n < 0 && (this.sprite.x += gi(-6, n)),
      r > 0 && (this.sprite.y += pi(i, r)),
      r < 0 && (this.sprite.y += gi(-6, r)),
      !1
    );
  }
  isCollisionWithSomething(e) {
    if (this.isNoCollision) return !1;
    if (this.gameScreen.map.isCollision(e)) return !0;
    const [i, n] = e;
    return (
      this.availableZone.x1 > i ||
      i > this.availableZone.x2 ||
      this.availableZone.y1 > n ||
      n > this.availableZone.y2
    );
  }
}
class Md extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 1);
    w(this, "status", "locked");
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsBoxClosed)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    if (this.status === "locked") {
      yield* F(this.gameScreen, "箱には鍵が かかっているようだ"),
        yield* F(this.gameScreen, "...よく見ると メモが貼られている"),
        yield* F(this.gameScreen, '"XYZ"');
      return;
    }
    if (this.status === "opened") {
      yield* F(this.gameScreen, "中にはもう何も 入っていないようだ");
      return;
    }
    Z.openSomething.play(),
      yield* j(30),
      yield* F(this.gameScreen, "箱を開けた"),
      (this.status = "opened"),
      yield* F(this.gameScreen, "中から何かが 飛び出してきた");
    const e = new Pd(this.gameScreen, this.gameScreen.objects.box.tilePosition);
    for (
      e.isNoCollision = !0,
        e.movements = ["up", "left", "left", "left"],
        this.gameScreen.objects.add(e);
      e.getMode() === "play";

    )
      yield;
    yield* j(20),
      this.gameScreen.player.setDirection("up"),
      yield* j(10),
      (e.isNoCollision = !1),
      yield* it(
        this.gameScreen,
        "あれは...チョウですか...？ ガかな...？",
        B.playerComment2,
      ),
      yield* it(
        this.gameScreen,
        `早くて捕まえられそうにないので
何かを使って捕まえる必要がありそうですね`,
        B.playerComment1,
      ),
      yield* it(
        this.gameScreen,
        `...
(ガは苦手なので できれば触りたくないです)`,
        B.playerComment4,
      );
  }
  beforeRender() {
    super.beforeRender(),
      this.status === "opened"
        ? (this.sprite.texture = B.objectsBoxOpened)
        : (this.sprite.texture = B.objectsBoxClosed);
  }
}
class Td extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", -1e3);
    (this.height = k.CELL_SIZE * 4),
      (this.width = k.CELL_SIZE * 4),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsCarpet)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  isCollision() {
    return !1;
  }
}
const Dd = (s) => {
  const t = s.length;
  return s[Math.floor(Math.random() * t)];
};
class kd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 2);
    w(this, "status", "noPower");
    w(this, "frameCount", 0);
    (this.tilePosition = i),
      (this.sprite = new pe([B.objectsCatMonitor8])),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 1.25),
      e.objectContainer.addChild(this.sprite);
  }
  setStatus(e) {
    (this.status = e), (this.frameCount = 0), this.sprite.stop();
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    switch (this.status) {
      case "noPower": {
        yield* F(
          this.gameScreen,
          `猫型のロボットだ
顔の部分は モニターになっている`,
        ),
          yield* it(
            this.gameScreen,
            "電源は入っているようですが 真っ暗ですね...",
            B.playerComment1,
          );
        break;
      }
      case "play": {
        this.setStatus("speaking"),
          yield* F(
            this.gameScreen,
            `こんにちはにゃ
ぼくは 猫のロボットにゃ`,
          ),
          yield* F(
            this.gameScreen,
            "ぼくといつも一緒にいる友達を 紹介するにゃ",
          );
        const e = new Y(B.cutsCatMonitor);
        (e.width = k.WIDTH),
          (e.height = k.HEIGHT),
          this.gameScreen.cutinContainer.addChild(e),
          yield* Ye(["ACTION"]),
          e.removeFromParent(),
          yield* F(
            this.gameScreen,
            `いつ見ても みんなかわいいにゃー
また ここに飽きたら 遊びに行こうかにゃ`,
          ),
          this.setStatus("play");
        break;
      }
      case "done": {
        this.setStatus("speaking"),
          yield* F(this.gameScreen, "また今度 遊びに来てにゃ"),
          this.setStatus("done");
        break;
      }
    }
  }
  beforeRender() {
    switch ((super.beforeRender(), this.status)) {
      case "noPower": {
        this.sprite.textures = [B.objectsCatMonitor8];
        break;
      }
      case "speaking": {
        this.sprite.playing ||
          ((this.sprite.textures = [
            B.objectsCatMonitor1,
            B.objectsCatMonitor2,
          ]),
          (this.sprite.animationSpeed = 0.1),
          (this.sprite.loop = !0),
          this.sprite.play());
        break;
      }
      case "play":
      case "done": {
        this.frameCount === 0 &&
          ((this.sprite.textures = Dd([
            [B.objectsCatMonitor1],
            [
              B.objectsCatMonitor3,
              B.objectsCatMonitor3,
              B.objectsCatMonitor4,
              B.objectsCatMonitor4,
              B.objectsCatMonitor4,
              B.objectsCatMonitor4,
              B.objectsCatMonitor4,
              B.objectsCatMonitor3,
              B.objectsCatMonitor3,
            ],
            [
              B.objectsCatMonitor3,
              B.objectsCatMonitor3,
              B.objectsCatMonitor5,
              B.objectsCatMonitor6,
              B.objectsCatMonitor7,
              B.objectsCatMonitor6,
              B.objectsCatMonitor5,
              B.objectsCatMonitor3,
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
  isCollision(e) {
    return (
      H.eq(e, this.tilePosition) || H.eq(H.sum(e, [-1, 0]), this.tilePosition)
    );
  }
}
class Rd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsChair)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, -2 / k.CELL_SIZE),
      e.objectContainer.addChild(this.sprite);
  }
}
class Qd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.width = k.CELL_SIZE),
      (this.height = k.CELL_SIZE),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsCodeBox)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.45),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    yield* F(
      this.gameScreen,
      `コードやガラクタが
箱に乱雑に詰め込まれている`,
    );
  }
}
class Od extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", -200);
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsCushion)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  isCollision() {
    return !1;
  }
}
class Ud extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 1);
    w(this, "status", "locked");
    (this.tilePosition = i),
      (this.sprite = new Y(B.transparent)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    if (this.status === "locked") {
      yield* F(this.gameScreen, "ドアは 開かないようだ"),
        yield* F(this.gameScreen, "...ドアの上の方に 紙がはられている");
      const e = new Y(B.cutsTable);
      (e.width = k.WIDTH),
        (e.height = k.HEIGHT),
        this.gameScreen.cutinContainer.addChild(e),
        yield* Ye(["ACTION"]),
        e.removeFromParent();
      return;
    }
    Z.openSomething.play(),
      yield* j(30),
      yield* F(this.gameScreen, "ドアを開けた"),
      this.gameScreen.ending.open();
  }
  beforeRender() {
    super.beforeRender();
  }
}
class Gt extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.height = k.CELL_SIZE * 2),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsLongWall)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      e.objectContainer.addChild(this.sprite);
  }
}
class Fd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 1);
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsMagicSquare1)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    yield* F(this.gameScreen, "壁には 何かが書かれたメモが 貼られている");
    const e = new Y(B.cutsMagicSquare1);
    (e.width = k.WIDTH),
      (e.height = k.HEIGHT),
      this.gameScreen.cutinContainer.addChild(e),
      yield* j(30),
      yield* it(
        this.gameScreen,
        "これは 魔法陣といわれている パズルですね",
        B.playerComment1,
      ),
      yield* it(
        this.gameScreen,
        `細かいルールを忘れてしまったので
どこかに本があればいいですが...`,
        B.playerComment4,
      ),
      e.removeFromParent();
  }
}
class Gd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 2);
    w(this, "status", "noPower");
    w(this, "spriteTexturesSet", {
      noPower: [B.objectsMantis1],
      caughtKey: [B.objectsMantis4],
      play: [B.objectsMantis2, B.objectsMantis3],
      caught: [B.objectsMantis4],
    });
    (this.tilePosition = i),
      (this.sprite = new pe(this.spriteTexturesSet.noPower)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      (this.sprite.animationSpeed = 0.05),
      e.objectContainer.addChild(this.sprite);
  }
  setStatus(e) {
    (this.status = e),
      (this.sprite.textures = this.spriteTexturesSet[e]),
      this.sprite.play();
  }
  beforeRender() {
    super.beforeRender();
  }
}
class zd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.width = k.CELL_SIZE - 10),
      (this.height = k.CELL_SIZE - 10),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsNote)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.25),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    yield* F(this.gameScreen, "文字が書きなぐられている"),
      yield* F(this.gameScreen, "...よく見ると3桁の数字が書いてある"),
      yield* F(this.gameScreen, '"362"'),
      this.gameScreen.objects.mantis.status === "noPower" &&
        (yield* it(this.gameScreen, "なんの数字でしょう...", B.playerComment1));
  }
}
class Nd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 1);
    w(this, "status", "bug");
    w(this, "commands", ["えさ", "なでる", "おわる"]);
    w(this, "commandQueue", []);
    w(this, "ansCommands", ["なでる", "なでる", "えさ", "なでる"]);
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsPortableGame1)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.status === "bug"
        ? this.createBugEvent()
        : this.createDefaultEvent()
      : null;
  }
  *createDefaultEvent() {
    yield* F(this.gameScreen, "ゲームだ");
    const e = new Y(B.cutsPortableGame2);
    (e.width = k.WIDTH),
      (e.height = k.HEIGHT),
      this.gameScreen.cutinContainer.addChild(e),
      yield* F(this.gameScreen, "公園からは 湖を眺めることができる"),
      e.removeFromParent();
  }
  *createBugEvent() {
    yield* F(this.gameScreen, "ゲームだ");
    const e = new Y(B.cutsPortableGame1);
    for (
      e.width = k.WIDTH,
        e.height = k.HEIGHT,
        this.gameScreen.cutinContainer.addChild(e),
        yield* F(this.gameScreen, "湖の見える公園に 黒猫がいる");
      ;

    ) {
      const i = yield* Fs(this.gameScreen, "選択肢が出ている", [
        "えさ",
        "なでる",
        "おわる",
      ]);
      if (i === "おわる") {
        e.removeFromParent(),
          yield* it(this.gameScreen, "...ふー 満足しました", B.playerComment3),
          this.ansCommands.every((r, a) => r === this.commandQueue[a]) &&
            (Z.cat.play(),
            (this.status = "default"),
            (this.sprite.texture = B.objectsPortableGame2),
            this.gameScreen.objects.catMonitor.setStatus("play"),
            yield* j(60),
            yield* it(
              this.gameScreen,
              "...あれ 黒猫がいなくなりました",
              B.playerComment2,
            ));
        break;
      }
      switch (
        (this.commandQueue.push(i),
        this.commandQueue.length > this.ansCommands.length &&
          this.commandQueue.shift(),
        i)
      ) {
        case "えさ": {
          yield* F(this.gameScreen, "黒猫は 美味しそうに ご飯を食べている");
          break;
        }
        case "なでる":
          yield* F(this.gameScreen, "黒猫は 気持ちよさそうにしている");
          break;
      }
    }
  }
}
class Hd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.height = k.CELL_SIZE * 2),
      (this.width = k.CELL_SIZE * 2),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsRack)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      e.objectContainer.addChild(this.sprite);
  }
}
class Ld extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.tilePosition = i),
      (this.sprite = new Y(B.objectsScatteredBooks)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition)
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    yield* F(this.gameScreen, "本が床に散らばっている");
  }
}
class Xd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.width = k.CELL_SIZE),
      (this.height = k.CELL_SIZE * 3),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsShelf)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.33),
      e.objectContainer.addChild(this.sprite);
  }
  isCollision(e) {
    return (
      H.eq(e, this.tilePosition) || H.eq(H.sum(e, [0, -1]), this.tilePosition)
    );
  }
}
class Vd extends Xd {
  listenEvent() {
    return Tt(this.gameScreen.player, this.tilePosition) ||
      Tt(this.gameScreen.player, H.sum(this.tilePosition, [0, 1]))
      ? this.createEvent()
      : null;
  }
  *createEvent() {
    yield* F(this.gameScreen, "雑貨や衣類が ある程度整頓されて 置かれている");
  }
}
class jd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    w(this, "status", "login");
    (this.width = k.CELL_SIZE * 3),
      (this.height = k.CELL_SIZE * 2),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsTableMonitor1)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      e.objectContainer.addChild(this.sprite);
  }
  isCollision(e) {
    return (
      H.eq(e, this.tilePosition) ||
      H.eq(H.sum(e, [-1, 0]), this.tilePosition) ||
      H.eq(H.sum(e, [-2, 0]), this.tilePosition)
    );
  }
  listenEvent() {
    return Tt(this.gameScreen.player, H.sum(this.tilePosition, [1, 0]))
      ? this.createCenterMonitorEvent()
      : Tt(this.gameScreen.player, H.sum(this.tilePosition, [2, 0]))
        ? this.createRightMonitorEvent()
        : null;
  }
  *createCenterMonitorEvent() {
    switch (this.status) {
      case "login": {
        yield* F(this.gameScreen, "モニターに 何かが映っている");
        const e = new Y(B.cutsTableMonitor1);
        (e.width = k.WIDTH),
          (e.height = k.HEIGHT),
          this.gameScreen.cutinContainer.addChild(e),
          yield* j(30);
        const i = new Ie(
          this.gameScreen,
          "数字を入力して ログインしてください",
        );
        yield* i.event;
        const n = new fi(this.gameScreen),
          r = yield* n.event;
        n.clear(),
          i.clearMessage(),
          yield* j(30),
          r === 546
            ? (Z.success.play(),
              yield* j(30),
              yield* F(this.gameScreen, "ログインに成功した"),
              (this.status = "display"),
              (this.sprite.texture = B.objectsTableMonitor2))
            : yield* F(this.gameScreen, "数字が間違えているようだ"),
          e.removeFromParent();
        break;
      }
      case "display": {
        const e = yield* Bd(this.gameScreen, "コマンドを入力する欄がある");
        switch (e) {
          case 362:
            this.gameScreen.objects.mantis.status === "noPower"
              ? (yield* F(this.gameScreen, `"...コマンド ${e} を実行します"`),
                yield* j(10),
                Z.toggleSwitch.play(),
                yield* j(30),
                this.gameScreen.objects.mantis.setStatus("caughtKey"),
                yield* F(this.gameScreen, "何かが動き出した音がした"))
              : yield* F(this.gameScreen, "...もうすでに 使用されたようだ");
            break;
          case 568:
            this.gameScreen.objects.box.status === "locked"
              ? (yield* F(this.gameScreen, `"...コマンド ${e} を実行します"`),
                yield* j(10),
                Z.toggleSwitch.play(),
                yield* j(30),
                (this.gameScreen.objects.box.status = "closed"),
                yield* F(this.gameScreen, "何かが開いた音がした"))
              : yield* F(this.gameScreen, "...もうすでに 使用されたようだ");
            break;
          case 732:
            this.gameScreen.objects.door.status === "locked"
              ? (yield* F(this.gameScreen, `"...コマンド ${e} を実行します"`),
                yield* j(10),
                Z.toggleSwitch.play(),
                yield* j(30),
                (this.gameScreen.objects.door.status = "closed"),
                yield* F(this.gameScreen, "何かが開いた音がした"))
              : yield* F(this.gameScreen, "...もうすでに 使用されたようだ");
            break;
          case 400:
          case 403:
          case 404:
          case 418: {
            const i = {
              400: "Bad Request",
              403: "Forbidden",
              404: "Not Found",
              418: "I'm a teapot",
            };
            Z.error.play(),
              yield* F(
                this.gameScreen,
                `"...コマンド ${e} は存在しません
${e} ${i[e]}"`,
              ),
              yield* it(
                this.gameScreen,
                `英語の部分はただのネタですので
気にしないでください`,
                B.playerComment3,
              );
            break;
          }
          default:
            Z.error.play(),
              yield* F(this.gameScreen, `"...コマンド ${e} は存在しません"`),
              e === 162 &&
                this.gameScreen.items.has(Ta) &&
                (yield* it(
                  this.gameScreen,
                  `メモに描かれている数ではないようですね...
(枠が引かれていることが気になります)`,
                  B.playerComment2,
                ));
        }
        break;
      }
    }
  }
  *createRightMonitorEvent() {
    this.status !== "display" ||
      (yield* Fs(
        this.gameScreen,
        `あるゲームの バグが報告されている
読みますか？`,
        ["はい", "いいえ"],
      )) !== "はい" ||
      (yield* F(
        this.gameScreen,
        `"タイトル: あとでなおす
担当者: haru"`,
      ),
      yield* F(
        this.gameScreen,
        `"ゲーム内に いるはずのない黒猫が出てくる
風景が見たいので 追い出すように修正する"`,
      ),
      yield* F(
        this.gameScreen,
        `"とりあえず 次のコマンドを順に入れると
猫は一旦どこかにいなくなるようにした"`,
      ),
      yield* F(this.gameScreen, '"なでる なでる えさ なでる おわる"'));
  }
}
class Yd extends xt {
  constructor(e, i) {
    super(e);
    w(this, "tilePosition");
    w(this, "sprite");
    w(this, "layerOffset", 0);
    (this.width = k.CELL_SIZE * 2),
      (this.height = k.CELL_SIZE * 2),
      (this.tilePosition = i),
      (this.sprite = new Y(B.objectsTable2)),
      (this.sprite.x = this.tilePosition[0] * k.CELL_SIZE),
      (this.sprite.y = this.tilePosition[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      e.objectContainer.addChild(this.sprite);
  }
  isCollision(e) {
    return (
      H.eq(e, this.tilePosition) ||
      H.eq(H.sum(e, [-1, 0]), this.tilePosition) ||
      H.eq(H.sum(e, [0, -1]), this.tilePosition) ||
      H.eq(H.sum(e, [-1, -1]), this.tilePosition)
    );
  }
}
class Wd {
  constructor(t) {
    w(this, "objects");
    w(this, "box");
    w(this, "mantis");
    w(this, "catMonitor");
    w(this, "door");
    w(this, "nextAddedObjects", []);
    (this.gameScreen = t),
      (this.box = new Md(t, [11, 3])),
      (this.mantis = new Gd(t, [0, 3])),
      (this.catMonitor = new kd(t, [7, 1])),
      (this.door = new Ud(t, [8, 9])),
      (this.objects = [
        new Td(t, [3, 4]),
        new Gt(t, [0, 0]),
        new Gt(t, [1, 0]),
        new Gt(t, [2, 0]),
        new Gt(t, [3, 0]),
        new Gt(t, [4, 0]),
        new Gt(t, [5, 0]),
        new Gt(t, [6, 0]),
        new Gt(t, [7, 0]),
        new Gt(t, [8, 0]),
        new Gt(t, [9, 0]),
        new Gt(t, [10, 0]),
        new Gt(t, [11, 0]),
        new jd(t, [3, 1]),
        new Qd(t, [6, 1]),
        new Hd(t, [7, 1]),
        new Id(t, [0, 1]),
        new Sd(t, [1, 6]),
        new Yd(t, [4, 5]),
        new Vd(t, [11, 1]),
        new Fd(t, [9, 0]),
        new Nd(t, [4, 5]),
        new zd(t, [3, 1]),
        new Rd(t, [4, 1]),
        new Ld(t, [5, 4]),
        new Od(t, [4, 4]),
        this.catMonitor,
        this.box,
        this.mantis,
        this.door,
      ]);
  }
  add(t) {
    this.nextAddedObjects.push(t);
  }
  processInput() {
    for (const t of this.objects) t.processInput();
  }
  beforeRender() {
    for (const t of this.nextAddedObjects) this.objects.push(t);
    this.nextAddedObjects = [];
    for (const t of this.objects) t.isDead && t.sprite.removeFromParent();
    this.objects = this.objects.filter((t) => !t.isDead);
    for (const t of this.objects) t.beforeRender();
  }
  isCollision(t) {
    return this.objects.some((e) => e.isCollision(t));
  }
}
class qd {
  constructor(t) {
    w(this, "event");
    w(
      this,
      "overlay",
      new Pt().rect(0, 0, V.WIDTH, V.HEIGHT).fill({ color: "black" }),
    );
    this.gameScreen = t;
  }
  open() {
    (this.gameScreen.state = fe.OPENING),
      (this.overlay.alpha = 1),
      this.gameScreen.endingContainer.addChild(this.overlay),
      (this.gameScreen.player.tilePosition = [10, 2]),
      this.gameScreen.player.setDirection("right"),
      (this.event = this.createEvent());
  }
  *createEvent() {
    for (; this.overlay.alpha > 0; ) yield* j(5), (this.overlay.alpha -= 0.1);
    for (
      yield* j(50),
        yield* it(
          this.gameScreen,
          "...これで洗濯物もよしっと",
          B.playerComment1,
        ),
        yield* it(this.gameScreen, "...", B.playerComment1),
        this.gameScreen.player.setDirection("down"),
        yield* j(30),
        this.gameScreen.player.setDirection("left"),
        yield* j(30),
        yield* it(
          this.gameScreen,
          `...ハル いませんね
めずらしく 外出でしょうか`,
          B.playerComment2,
        ),
        yield* j(30),
        yield* it(
          this.gameScreen,
          `それにしても また変なものを作ってますね
いつ使うのでしょう...`,
          B.playerComment4,
        ),
        yield* j(60),
        yield* it(
          this.gameScreen,
          "...さて、夜ご飯の準備をしないと",
          B.playerComment1,
        ),
        yield* j(10),
        this.gameScreen.player.movements = [
          "left",
          "left",
          "down",
          "down",
          "down",
          "down",
          "down",
          "down",
        ];
      this.gameScreen.player.movements.length > 0;

    )
      yield;
    for (
      yield* j(20),
        Z.openSomething.play(),
        yield* j(10),
        Z.openSomething.play(),
        yield* j(60),
        yield* it(
          this.gameScreen,
          "...あれ ドアが開きません",
          B.playerComment4,
        ),
        yield* j(60),
        yield* it(this.gameScreen, "...どうしましょう", B.playerComment4),
        this.gameScreen.player.movements = ["up"];
      this.gameScreen.player.movements.length > 0;

    )
      yield;
    yield* j(30),
      this.gameScreen.player.setDirection("up"),
      yield* j(30),
      yield* it(
        this.gameScreen,
        `出られる方法がないか 探してみますか
この部屋いろいろありますし`,
        B.playerComment4,
      ),
      yield* j(20),
      yield* F(
        this.gameScreen,
        `【操作方法】
移動: 矢印キー`,
      ),
      yield* F(
        this.gameScreen,
        `決定: Space キー または Enter キー
メニュー表示切替: Z キー`,
      );
  }
  close() {
    this.gameScreen.titleContainer.removeChildren();
  }
  processInput() {
    var e;
    this.scaleSize();
    const t = (e = this.event) == null ? void 0 : e.next();
    t != null &&
      t.done &&
      ((this.event = void 0), (this.gameScreen.state = fe.PLAYING));
  }
  scaleSize() {
    const t = Math.min(
      this.gameScreen.app.screen.width / V.WIDTH,
      this.gameScreen.app.screen.height / V.HEIGHT,
    );
    this.gameScreen.app.stage.scale = t;
  }
}
const Kd = "1.1.1",
  Jd = { version: Kd };
class Zd {
  constructor(t) {
    w(this, "event");
    w(this, "onStart", () => {});
    this.gameScreen = t;
  }
  open(t) {
    this.gameScreen.titleContainer.addChild(
      new Pt()
        .rect(0, 0, V.WIDTH, V.HEIGHT)
        .fill({ color: "black", alpha: 0.3 }),
    );
    const e = new Be({
        text: "PRESS SPACE KEY",
        x: V.WIDTH / 2,
        y: V.HEIGHT - 80,
        style: new Ut({
          fill: "white",
          fontFamily: "DotGothic16",
          fontSize: 20,
          align: "center",
        }),
      }),
      i = new Be({
        text: `ver ${Jd.version}`,
        x: V.WIDTH - 10,
        y: V.HEIGHT - 10,
        anchor: { x: 1, y: 1 },
        style: new Ut({
          fill: "white",
          fontFamily: "DotGothic16",
          fontSize: 16,
          align: "right",
        }),
      });
    e.anchor.set(0.5, 0),
      this.gameScreen.titleContainer.addChild(e),
      this.gameScreen.titleContainer.addChild(i);
    const n = new Y({
      texture: B.titleTitle,
      scale: (V.WIDTH - 40) / B.titleTitle.width,
      x: 20,
      y: 70,
    });
    this.gameScreen.titleContainer.addChild(n),
      (this.event = this.createEvent()),
      (this.onStart = t);
  }
  *createEvent() {
    yield* Ye(["ACTION"]), Z.success.play(), yield* j(50);
  }
  close() {
    this.gameScreen.titleContainer.removeChildren();
  }
  processInput() {
    var e;
    this.scaleSize();
    const t = (e = this.event) == null ? void 0 : e.next();
    t != null && t.done && this.onStart();
  }
  scaleSize() {
    const t = Math.min(
      this.gameScreen.app.screen.width / V.WIDTH,
      this.gameScreen.app.screen.height / V.HEIGHT,
    );
    this.gameScreen.app.stage.scale = t;
  }
}
const ri = [
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
  ],
  ir = { id: "100", getTexture: () => B.tilesFloor, isCollision: !1 },
  sr = { id: "101", getTexture: () => B.tilesFloor2, isCollision: !1 },
  nr = { id: "000", getTexture: () => B.tilesTransparentWall, isCollision: !0 },
  rr = { [ir.id]: ir, [sr.id]: sr, [nr.id]: nr };
class $d {
  constructor(t) {
    w(this, "width");
    w(this, "height");
    (this.height = ri.length), (this.width = ri[0].length);
    for (const e of ys(0, this.width))
      for (const i of ys(0, this.height)) {
        const n = ri[i][e],
          { getTexture: r } = rr[n],
          a = new Y(r());
        (a.width = k.CELL_SIZE),
          (a.height = k.CELL_SIZE),
          (a.x = e * k.CELL_SIZE),
          (a.y = i * k.CELL_SIZE),
          t.mapContainer.addChild(a);
      }
  }
  isCollision(t) {
    const [e, i] = t;
    return 0 <= e && e < this.width && 0 <= i && i < this.height
      ? rr[ri[i][e]].isCollision
      : !0;
  }
}
class tf extends xt {
  constructor(e, i) {
    super(e);
    w(this, "sprite");
    w(this, "moveTime", 0);
    w(this, "_mode", "play");
    w(this, "_spriteDirection", "down");
    w(this, "_spriteTexturesSet", {
      up: [B.playerUp1, B.playerUp2, B.playerUp3, B.playerUp4],
      down: [B.playerDown1, B.playerDown2, B.playerDown3, B.playerDown4],
      left: [B.playerLeft1, B.playerLeft2, B.playerLeft3, B.playerLeft4],
      right: [B.playerRight1, B.playerRight2, B.playerRight3, B.playerRight4],
    });
    w(this, "tilePosition");
    w(this, "movements", []);
    w(this, "layerOffset", 9);
    (this.height = k.CELL_SIZE * 2),
      (this.tilePosition = i),
      (this.sprite = new pe(this._spriteTexturesSet.down)),
      (this.sprite.animationSpeed = 0.5),
      (this.sprite.x = i[0] * k.CELL_SIZE),
      (this.sprite.y = i[1] * k.CELL_SIZE),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height),
      this.sprite.anchor.set(0, 0.5),
      e.objectContainer.addChild(this.sprite);
  }
  setDirection(e) {
    (this._spriteDirection = e),
      (this.sprite.textures = this._spriteTexturesSet[e]),
      (this.sprite.width = this.width),
      (this.sprite.height = this.height);
  }
  frontTilePos() {
    return _d(this.tilePosition, this._spriteDirection);
  }
  processInput() {
    if (!(this.movements.length > 0) && this._mode === "play")
      switch (fA()) {
        case "UP":
          this.movements.push("up");
          break;
        case "DOWN":
          this.movements.push("down");
          break;
        case "LEFT":
          this.movements.push("left");
          break;
        case "RIGHT":
          this.movements.push("right");
          break;
      }
  }
  update() {
    if (this._mode === "move") return this._move(), !1;
    const e = this.movements.shift();
    if (e) {
      this.setDirection(e);
      const i = Gs[e],
        n = H.sum(this.tilePosition, i);
      !this.gameScreen.map.isCollision(n) &&
        !this.gameScreen.objects.isCollision(n) &&
        ((this._mode = "move"),
        (this.tilePosition = H.sum(this.tilePosition, i)),
        this._move());
    }
    return !1;
  }
  _move() {
    const e = H.sum(H.scale(this.tilePosition, k.CELL_SIZE), [
      -this.sprite.x,
      -this.sprite.y,
    ]);
    if (H.eq(e, [0, 0])) {
      this._mode = "play";
      return;
    }
    (this.moveTime = (this.moveTime + 1) % 16),
      (this.sprite.currentFrame = Math.floor(this.moveTime / 4));
    const i = 4,
      [n, r] = e;
    n > 0 && (this.sprite.x += pi(i, n)),
      n < 0 && (this.sprite.x += gi(-4, n)),
      r > 0 && (this.sprite.y += pi(i, r)),
      r < 0 && (this.sprite.y += gi(-4, r));
  }
}
var fe = ((s) => (
  (s[(s.Title = 0)] = "Title"),
  (s[(s.OPENING = 1)] = "OPENING"),
  (s[(s.PLAYING = 2)] = "PLAYING"),
  (s[(s.EVENT = 3)] = "EVENT"),
  (s[(s.MENU = 4)] = "MENU"),
  (s[(s.ENDING = 5)] = "ENDING"),
  s
))(fe || {});
const Xe = class Xe extends V {
  constructor(e, i) {
    console.debug("GameScreen initializing...");
    super(e);
    w(this, "state", 2);
    w(this, "stageContainer", new gt());
    w(this, "objectContainer", new gt());
    w(this, "cutinContainer", new gt());
    w(this, "mapContainer", new gt());
    w(this, "messageContainer", new gt());
    w(this, "menuContainer", new gt());
    w(this, "titleContainer", new gt());
    w(this, "endingContainer", new gt());
    w(this, "map");
    w(this, "player");
    w(this, "events");
    w(this, "objects");
    w(this, "items");
    w(this, "menu");
    w(this, "title");
    w(this, "ending");
    w(this, "opening");
    w(this, "controllers", []);
    w(this, "stopwatch", new xA());
    if (((this.onGameEnd = i), yA() === "Mobile")) {
      const r = new mA();
      r.activate(), tr(r);
    } else {
      const r = new pA();
      r.activate(), tr(r);
    }
    this.objectContainer.removeChildren(),
      this.cutinContainer.removeChildren(),
      this.mapContainer.removeChildren(),
      this.messageContainer.removeChildren(),
      this.stageContainer.removeChildren(),
      this.menuContainer.removeChildren(),
      this.titleContainer.removeChildren(),
      this.baseStage.addChild(this.stageContainer),
      this.baseStage.addChild(this.cutinContainer),
      this.stageContainer.addChild(this.mapContainer),
      this.stageContainer.addChild(this.objectContainer),
      this.baseStage.addChild(this.endingContainer),
      this.baseStage.addChild(this.messageContainer),
      this.baseStage.addChild(this.menuContainer),
      this.baseStage.addChild(this.titleContainer),
      (this.map = new $d(this)),
      (this.player = new tf(this, [10, 2])),
      this.player.setDirection("right"),
      (this.events = new bd(this)),
      (this.objects = new Wd(this)),
      (this.items = new vd(this)),
      (this.menu = new Ed(this)),
      (this.title = new Zd(this)),
      (this.ending = new ud(this)),
      (this.opening = new qd(this)),
      (this.state = 0),
      this.title.open(() => {
        this.title.close(), this.opening.open(), this.stopwatch.start();
      }),
      this.followPlayer(),
      console.debug("GameScreen initialized");
  }
  close() {
    super.close(), dA();
  }
  update() {
    switch ((this.scaleSize(), super.update(), gA(), this.state)) {
      case 1: {
        this.opening.processInput();
        break;
      }
      case 0: {
        this.title.processInput();
        break;
      }
      case 2: {
        if (ct.MENU === "PRESSED") {
          (this.state = 4), this.menu.openMenu();
          break;
        }
        this.player.processInput(),
          this.events.listen(),
          this.objects.processInput();
        break;
      }
      case 3: {
        this.events.process();
        break;
      }
      case 4: {
        if (ct.MENU === "PRESSED") {
          (this.state = 2), this.menu.closeMenu();
          break;
        }
        this.menu.processInput();
        break;
      }
      case 5: {
        this.ending.processInput();
        break;
      }
    }
    this.player.update(),
      this.followPlayer(),
      this.player.beforeRender(),
      this.objects.beforeRender(),
      this.menu.beforeRender();
  }
  followPlayer() {
    (this.stageContainer.x =
      V.WIDTH / 2 - (this.player.sprite.x + Xe.CELL_SIZE / 2)),
      (this.stageContainer.y =
        V.HEIGHT / 2 - (this.player.sprite.y + Xe.CELL_SIZE / 2));
  }
  scaleSize() {
    const e = Math.min(
      this.app.screen.width / V.WIDTH,
      this.app.screen.height / V.HEIGHT,
    );
    this.app.stage.scale = e;
  }
};
w(Xe, "CELL_SIZE", 32);
let k = Xe;
const ef = (s) => (document.fonts.load("12px DotGothic16").then(() => s()), 1),
  It = class It extends V {
    constructor(e, i) {
      super(e);
      w(this, "allCount", 0);
      w(this, "currCount", 0);
      w(this, "container", new gt());
      w(this, "progressBar");
      (this.onLoad = i),
        (this.allCount += Ku(() => this.countContents())),
        (this.allCount += Ad(() => this.countContents())),
        (this.allCount += ef(() => this.countContents())),
        this.baseStage.removeChildren(),
        this.container.addChild(
          new Pt()
            .roundRect(
              V.WIDTH / 2 - It.PROGRESS_BAR_WIDTH / 2,
              V.HEIGHT / 2 - It.PROGRESS_BAR_HEIGHT / 2,
              It.PROGRESS_BAR_WIDTH,
              It.PROGRESS_BAR_HEIGHT,
              4,
            )
            .stroke({ color: "white", width: 1 }),
        ),
        (this.progressBar = new Pt()
          .roundRect(
            V.WIDTH / 2 - It.PROGRESS_BAR_WIDTH / 2,
            V.HEIGHT / 2 - It.PROGRESS_BAR_HEIGHT / 2,
            10,
            It.PROGRESS_BAR_HEIGHT,
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
            V.WIDTH / 2 - It.PROGRESS_BAR_WIDTH / 2,
            V.HEIGHT / 2 - It.PROGRESS_BAR_HEIGHT / 2,
            It.PROGRESS_BAR_WIDTH * (this.currCount / this.allCount),
            It.PROGRESS_BAR_HEIGHT,
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
        this.app.screen.width / V.WIDTH,
        this.app.screen.height / V.HEIGHT,
      );
      this.app.stage.scale = e;
    }
  };
w(It, "CELL_SIZE", 32),
  w(It, "PROGRESS_BAR_WIDTH", 200),
  w(It, "PROGRESS_BAR_HEIGHT", 10);
let ws = It;
const sf = async (s) => {
    const t = new Jr();
    await t.init({
      background: "#16181d",
      width: V.WIDTH,
      height: V.HEIGHT,
      resolution: Math.max(window.devicePixelRatio ?? 2, 2),
      antialias: !1,
    }),
      (t.canvas.style.width = "100%"),
      (t.canvas.style.maxWidth = "125dvh"),
      (t.canvas.style.height = "auto"),
      (t.canvas.style.maxHeight = "80dvw"),
      s.appendChild(t.canvas);
    let e = null;
    const i = () => {
      e !== null && (e.close(), t.stage.removeChildren()), (e = new k(t, i));
    };
    return (
      (e = new ws(t, i)),
      (t.ticker.maxFPS = 60),
      t.ticker.add(() => {
        e == null || e.update();
      }),
      {
        closeGame: () => {
          e == null || e.close(), t.destroy();
        },
      }
    );
  },
  Da = document.querySelector("#app");
if (!Da) throw new Error("#app element not found");
sf(Da).catch((s) => {
  console.error("Failed to launch game:", s);
});
export {
  Wr as $,
  Yr as A,
  kt as B,
  gt as C,
  mt as D,
  z as E,
  Vt as F,
  yi as G,
  Po as H,
  en as I,
  Y as J,
  $o as K,
  hh as L,
  K as M,
  bt as N,
  Ct as O,
  _t as P,
  uh as Q,
  rs as R,
  Dh as S,
  re as T,
  Ai as U,
  nn as V,
  Ti as W,
  an as X,
  Do as Y,
  vt as Z,
  xr as _,
  jt as a,
  J as a0,
  ht as a1,
  mh as a2,
  Fh as a3,
  sl as a4,
  rl as a5,
  cl as a6,
  ul as a7,
  dl as a8,
  Ut as a9,
  cc as aa,
  la as ab,
  wn as ac,
  yn as ad,
  Ka as ae,
  gs as af,
  pc as ag,
  Pt as ah,
  pt as ai,
  Za as aj,
  fs as ak,
  ci as al,
  ds as am,
  jn as an,
  ua as ao,
  Ve as b,
  oi as c,
  Bs as d,
  Bt as e,
  xn as f,
  Ph as g,
  Xr as h,
  Pr as i,
  $t as j,
  Lr as k,
  Xn as l,
  il as m,
  nl as n,
  hl as o,
  Al as p,
  $r as q,
  Ao as r,
  Is as s,
  q as t,
  Gr as u,
  Ja as v,
  At as w,
  gl as x,
  ie as y,
  pr as z,
};
