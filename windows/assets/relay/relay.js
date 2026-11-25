var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// build/index.js
import { WorkerEntrypoint as It } from "cloudflare:workers";
import tt from "./relay_bg.wasm";
var G = globalThis.__worker_init_state = { criticalError: false, instanceId: 0 };
var I = class {
  static {
    __name(this, "I");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ut.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_containerstartupoptions_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  get enableInternet() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_containerstartupoptions_enableInternet(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t === 16777215 ? void 0 : t !== 0;
  }
  get entrypoint() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_containerstartupoptions_entrypoint(this.__wbg_ptr);
    } catch (n) {
      o(n);
    }
    var e = ht(t[0], t[1]);
    return i.__wbindgen_free(t[0], t[1] * 4, 4), e;
  }
  get env() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_containerstartupoptions_env(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t;
  }
  set enableInternet(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_containerstartupoptions_enableInternet(this.__wbg_ptr, u(t) ? 16777215 : t ? 1 : 0);
    } catch (e) {
      o(e);
    }
  }
  set entrypoint(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e = it(t, i.__wbindgen_malloc), n = l;
    c();
    try {
      i.__wbg_set_containerstartupoptions_entrypoint(this.__wbg_ptr, e, n);
    } catch (r) {
      o(r);
    }
  }
  set env(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_containerstartupoptions_env(this.__wbg_ptr, t);
    } catch (e) {
      o(e);
    }
  }
};
Symbol.dispose && (I.prototype[Symbol.dispose] = I.prototype.free);
var z = class {
  static {
    __name(this, "z");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_intounderlyingbytesource_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  get autoAllocateChunkSize() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t >>> 0;
  }
  cancel() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    c();
    try {
      i.intounderlyingbytesource_cancel(t);
    } catch (e) {
      o(e);
    }
  }
  pull(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.intounderlyingbytesource_pull(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
  start(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.intounderlyingbytesource_start(this.__wbg_ptr, t);
    } catch (e) {
      o(e);
    }
  }
  get type() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.intounderlyingbytesource_type(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return at[t];
  }
};
Symbol.dispose && (z.prototype[Symbol.dispose] = z.prototype.free);
var O = class {
  static {
    __name(this, "O");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_intounderlyingsink_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  abort(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e = this.__destroy_into_raw(), n;
    c();
    try {
      n = i.intounderlyingsink_abort(e, t);
    } catch (r) {
      o(r);
    }
    return n;
  }
  close() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw(), e;
    c();
    try {
      e = i.intounderlyingsink_close(t);
    } catch (n) {
      o(n);
    }
    return e;
  }
  write(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.intounderlyingsink_write(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
};
Symbol.dispose && (O.prototype[Symbol.dispose] = O.prototype.free);
var P = class {
  static {
    __name(this, "P");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_intounderlyingsource_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  cancel() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t = this.__destroy_into_raw();
    c();
    try {
      i.intounderlyingsource_cancel(t);
    } catch (e) {
      o(e);
    }
  }
  pull(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.intounderlyingsource_pull(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
};
Symbol.dispose && (P.prototype[Symbol.dispose] = P.prototype.free);
var v = class _ {
  static {
    __name(this, "_");
  }
  static __wrap(t) {
    let e = Object.create(_.prototype);
    return e.__wbg_ptr = t, Object.defineProperty(e, "__wbg_inst", { value: s, writable: true }), K.register(e, { ptr: t, instance: s }, e), e;
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, K.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_minifyconfig_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  get css() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_minifyconfig_css(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t !== 0;
  }
  get html() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_minifyconfig_html(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t !== 0;
  }
  get js() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_minifyconfig_js(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t !== 0;
  }
  set css(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
    } catch (e) {
      o(e);
    }
  }
  set html(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
    } catch (e) {
      o(e);
    }
  }
  set js(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
    } catch (e) {
      o(e);
    }
  }
};
Symbol.dispose && (v.prototype[Symbol.dispose] = v.prototype.free);
var E = class {
  static {
    __name(this, "E");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lt.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_r2range_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  get length() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_r2range_length(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t[0] === 0 ? void 0 : t[1];
  }
  get offset() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_r2range_offset(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t[0] === 0 ? void 0 : t[1];
  }
  get suffix() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.__wbg_get_r2range_suffix(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t[0] === 0 ? void 0 : t[1];
  }
  set length(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_r2range_length(this.__wbg_ptr, !u(t), u(t) ? 0 : t);
    } catch (e) {
      o(e);
    }
  }
  set offset(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_r2range_offset(this.__wbg_ptr, !u(t), u(t) ? 0 : t);
    } catch (e) {
      o(e);
    }
  }
  set suffix(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    c();
    try {
      i.__wbg_set_r2range_suffix(this.__wbg_ptr, !u(t), u(t) ? 0 : t);
    } catch (e) {
      o(e);
    }
  }
};
Symbol.dispose && (E.prototype[Symbol.dispose] = E.prototype.free);
var x = class {
  static {
    __name(this, "x");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Q.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_room_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  alarm() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.room_alarm(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t;
  }
  connect(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.room_connect(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
  fetch(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.room_fetch(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
  constructor(t, e) {
    let n;
    c();
    try {
      n = i.room_new(t, e);
    } catch (r) {
      o(r);
    }
    return this.__wbg_ptr = n, Object.defineProperty(this, "__wbg_inst", { value: s, writable: true }), Q.register(this, { ptr: n, instance: s }, this), this;
  }
  webSocketClose(t, e, n, r) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let a = p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), f = l, b;
    c();
    try {
      b = i.room_webSocketClose(this.__wbg_ptr, t, e, a, f, r);
    } catch (g) {
      o(g);
    }
    return b;
  }
  webSocketError(t, e) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let n;
    c();
    try {
      n = i.room_webSocketError(this.__wbg_ptr, t, e);
    } catch (r) {
      o(r);
    }
    return n;
  }
  webSocketMessage(t, e) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let n;
    c();
    try {
      n = i.room_webSocketMessage(this.__wbg_ptr, t, e);
    } catch (r) {
      o(r);
    }
    return n;
  }
};
Symbol.dispose && (x.prototype[Symbol.dispose] = x.prototype.free);
var S = class {
  static {
    __name(this, "S");
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, X.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    c();
    try {
      i.__wbg_stats_free(t, 0);
    } catch (e) {
      o(e);
    }
  }
  alarm() {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let t;
    c();
    try {
      t = i.stats_alarm(this.__wbg_ptr);
    } catch (e) {
      o(e);
    }
    return t;
  }
  connect(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.stats_connect(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
  fetch(t) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let e;
    c();
    try {
      e = i.stats_fetch(this.__wbg_ptr, t);
    } catch (n) {
      o(n);
    }
    return e;
  }
  constructor(t, e) {
    let n;
    c();
    try {
      n = i.stats_new(t, e);
    } catch (r) {
      o(r);
    }
    return this.__wbg_ptr = n, Object.defineProperty(this, "__wbg_inst", { value: s, writable: true }), X.register(this, { ptr: n, instance: s }, this), this;
  }
  webSocketClose(t, e, n, r) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let a = p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), f = l, b;
    c();
    try {
      b = i.stats_webSocketClose(this.__wbg_ptr, t, e, a, f, r);
    } catch (g) {
      o(g);
    }
    return b;
  }
  webSocketError(t, e) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let n;
    c();
    try {
      n = i.stats_webSocketError(this.__wbg_ptr, t, e);
    } catch (r) {
      o(r);
    }
    return n;
  }
  webSocketMessage(t, e) {
    if (this.__wbg_inst !== void 0 && this.__wbg_inst !== s) throw new Error("Invalid stale object from previous Wasm instance");
    let n;
    c();
    try {
      n = i.stats_webSocketMessage(this.__wbg_ptr, t, e);
    } catch (r) {
      o(r);
    }
    return n;
  }
};
Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
function M() {
  s++, m = null, W = null, F = null, typeof numBytesDecoded < "u" && (numBytesDecoded = 0), typeof l < "u" && (l = 0), V = false, T = false, N = new WebAssembly.Instance(tt, _t()), i = N.exports, i.__wbindgen_start();
}
__name(M, "M");
function et() {
  let _2;
  c();
  try {
    _2 = i.__worker_init_state();
  } catch (t) {
    o(t);
  }
  return _2;
}
__name(et, "et");
function nt(_2, t, e) {
  let n;
  c();
  try {
    n = i.fetch(_2, t, e);
  } catch (r) {
    o(r);
  }
  return n;
}
__name(nt, "nt");
function _t() {
  return { __proto__: null, "./index_bg.js": { __proto__: null, __wbg_Error_30c8987f7c2ed4e2: /* @__PURE__ */ __name(function(t, e) {
    return Error(d(t, e));
  }, "__wbg_Error_30c8987f7c2ed4e2"), __wbg_Number_14af1003b8dd5ead: /* @__PURE__ */ __name(function(t) {
    return Number(t);
  }, "__wbg_Number_14af1003b8dd5ead"), __wbg_String_8564e559799eccda: /* @__PURE__ */ __name(function(t, e) {
    let n = String(e), r = p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), a = l;
    w().setInt32(t + 4, a, true), w().setInt32(t + 0, r, true);
  }, "__wbg_String_8564e559799eccda"), __wbg___wbindgen_boolean_get_5b446f51afd21013: /* @__PURE__ */ __name(function(t) {
    let e = t, n = typeof e == "boolean" ? e : void 0;
    return u(n) ? 16777215 : n ? 1 : 0;
  }, "__wbg___wbindgen_boolean_get_5b446f51afd21013"), __wbg___wbindgen_debug_string_4687d8d8c2017d52: /* @__PURE__ */ __name(function(t, e) {
    let n = J(e), r = p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), a = l;
    w().setInt32(t + 4, a, true), w().setInt32(t + 0, r, true);
  }, "__wbg___wbindgen_debug_string_4687d8d8c2017d52"), __wbg___wbindgen_in_92f62ee1427d9e49: /* @__PURE__ */ __name(function(t, e) {
    return t in e;
  }, "__wbg___wbindgen_in_92f62ee1427d9e49"), __wbg___wbindgen_is_function_1f9d30630b8b1d3d: /* @__PURE__ */ __name(function(t) {
    return typeof t == "function";
  }, "__wbg___wbindgen_is_function_1f9d30630b8b1d3d"), __wbg___wbindgen_is_null_e343b7d08827ba72: /* @__PURE__ */ __name(function(t) {
    return t === null;
  }, "__wbg___wbindgen_is_null_e343b7d08827ba72"), __wbg___wbindgen_is_null_or_undefined_f9435d56bdcc06df: /* @__PURE__ */ __name(function(t) {
    return t == null;
  }, "__wbg___wbindgen_is_null_or_undefined_f9435d56bdcc06df"), __wbg___wbindgen_is_object_3c45d4f2dde4e749: /* @__PURE__ */ __name(function(t) {
    let e = t;
    return typeof e == "object" && e !== null;
  }, "__wbg___wbindgen_is_object_3c45d4f2dde4e749"), __wbg___wbindgen_is_string_90b56bc79aad6f6c: /* @__PURE__ */ __name(function(t) {
    return typeof t == "string";
  }, "__wbg___wbindgen_is_string_90b56bc79aad6f6c"), __wbg___wbindgen_is_undefined_8865fb403f8fe9d8: /* @__PURE__ */ __name(function(t) {
    return t === void 0;
  }, "__wbg___wbindgen_is_undefined_8865fb403f8fe9d8"), __wbg___wbindgen_jsval_loose_eq_677f21e468d6b461: /* @__PURE__ */ __name(function(t, e) {
    return t == e;
  }, "__wbg___wbindgen_jsval_loose_eq_677f21e468d6b461"), __wbg___wbindgen_number_get_2e0e7dee9f701a71: /* @__PURE__ */ __name(function(t, e) {
    let n = e, r = typeof n == "number" ? n : void 0;
    w().setFloat64(t + 8, u(r) ? 0 : r, true), w().setInt32(t + 0, !u(r), true);
  }, "__wbg___wbindgen_number_get_2e0e7dee9f701a71"), __wbg___wbindgen_reinit_3f79fdb34dee3ea9: /* @__PURE__ */ __name(function() {
    T = true;
  }, "__wbg___wbindgen_reinit_3f79fdb34dee3ea9"), __wbg___wbindgen_string_get_0380ccaa2f57f0d9: /* @__PURE__ */ __name(function(t, e) {
    let n = e, r = typeof n == "string" ? n : void 0;
    var a = u(r) ? 0 : p(r, i.__wbindgen_malloc, i.__wbindgen_realloc), f = l;
    w().setInt32(t + 4, f, true), w().setInt32(t + 0, a, true);
  }, "__wbg___wbindgen_string_get_0380ccaa2f57f0d9"), __wbg___wbindgen_throw_41e9ee4f547fc59a: /* @__PURE__ */ __name(function(t, e) {
    throw new WebAssembly.Exception(L, [new Error(d(t, e))]);
  }, "__wbg___wbindgen_throw_41e9ee4f547fc59a"), __wbg__wbg_cb_unref_dcc1a90847f04c41: /* @__PURE__ */ __name(function(t) {
    t._wbg_cb_unref();
  }, "__wbg__wbg_cb_unref_dcc1a90847f04c41"), __wbg_acceptWebSocket_cacd6015e560881a: /* @__PURE__ */ __name(function(t, e) {
    t.acceptWebSocket(e);
  }, "__wbg_acceptWebSocket_cacd6015e560881a"), __wbg_body_4e088733babc630d: /* @__PURE__ */ __name(function(t) {
    let e = t.body;
    return u(e) ? 0 : h(e);
  }, "__wbg_body_4e088733babc630d"), __wbg_buffer_56ec2905a66f58b9: /* @__PURE__ */ __name(function(t) {
    return t.buffer;
  }, "__wbg_buffer_56ec2905a66f58b9"), __wbg_byobRequest_54f7ce41d584549a: /* @__PURE__ */ __name(function(t) {
    let e = t.byobRequest;
    return u(e) ? 0 : h(e);
  }, "__wbg_byobRequest_54f7ce41d584549a"), __wbg_byteLength_9f985b8373f1f3fe: /* @__PURE__ */ __name(function(t) {
    return t.byteLength;
  }, "__wbg_byteLength_9f985b8373f1f3fe"), __wbg_byteOffset_0bd5a6a03553639c: /* @__PURE__ */ __name(function(t) {
    return t.byteOffset;
  }, "__wbg_byteOffset_0bd5a6a03553639c"), __wbg_call_187d372bd5fdd4aa: /* @__PURE__ */ __name(function(t, e, n) {
    return t.call(e, n);
  }, "__wbg_call_187d372bd5fdd4aa"), __wbg_cause_19276d032a32d4bd: /* @__PURE__ */ __name(function(t) {
    return t.cause;
  }, "__wbg_cause_19276d032a32d4bd"), __wbg_cf_909bcfb212a8822c: /* @__PURE__ */ __name(function(t) {
    let e = t.cf;
    return u(e) ? 0 : h(e);
  }, "__wbg_cf_909bcfb212a8822c"), __wbg_cf_b47fe5ff6d015a0d: /* @__PURE__ */ __name(function(t) {
    let e = t.cf;
    return u(e) ? 0 : h(e);
  }, "__wbg_cf_b47fe5ff6d015a0d"), __wbg_close_150f701b1a60e0ac: /* @__PURE__ */ __name(function(t, e, n, r) {
    t.close(e, d(n, r));
  }, "__wbg_close_150f701b1a60e0ac"), __wbg_close_185286988f30f252: /* @__PURE__ */ __name(function(t) {
    t.close();
  }, "__wbg_close_185286988f30f252"), __wbg_close_748f26698dabe269: /* @__PURE__ */ __name(function(t) {
    t.close();
  }, "__wbg_close_748f26698dabe269"), __wbg_constructor_076176ce0f386e16: /* @__PURE__ */ __name(function(t) {
    return t.constructor;
  }, "__wbg_constructor_076176ce0f386e16"), __wbg_debug_52bda05ddf50b736: /* @__PURE__ */ __name(function(t) {
    console.debug(t);
  }, "__wbg_debug_52bda05ddf50b736"), __wbg_deleteAlarm_41b782f41af1320f: /* @__PURE__ */ __name(function(t, e) {
    return t.deleteAlarm(e);
  }, "__wbg_deleteAlarm_41b782f41af1320f"), __wbg_deleteAll_edd4567ccdd35fe7: /* @__PURE__ */ __name(function(t) {
    return t.deleteAll();
  }, "__wbg_deleteAll_edd4567ccdd35fe7"), __wbg_deserializeAttachment_d347a2d94e6cd2dd: /* @__PURE__ */ __name(function(t) {
    return t.deserializeAttachment();
  }, "__wbg_deserializeAttachment_d347a2d94e6cd2dd"), __wbg_done_b41a1d26cdb37fb6: /* @__PURE__ */ __name(function(t) {
    return t.done;
  }, "__wbg_done_b41a1d26cdb37fb6"), __wbg_enqueue_4a01c128f9a0de16: /* @__PURE__ */ __name(function(t, e) {
    t.enqueue(e);
  }, "__wbg_enqueue_4a01c128f9a0de16"), __wbg_error_a30e98d44009f1bb: /* @__PURE__ */ __name(function(t, e) {
    console.error(t, e);
  }, "__wbg_error_a30e98d44009f1bb"), __wbg_error_c9cf3fc2064683a9: /* @__PURE__ */ __name(function(t) {
    console.error(t);
  }, "__wbg_error_c9cf3fc2064683a9"), __wbg_exec_c1b04bcd4d563e9f: /* @__PURE__ */ __name(function(t, e, n, r) {
    return t.exec(d(e, n), ...r);
  }, "__wbg_exec_c1b04bcd4d563e9f"), __wbg_fetch_ae9b55b3c1c0b596: /* @__PURE__ */ __name(function(t, e) {
    return t.fetch(e);
  }, "__wbg_fetch_ae9b55b3c1c0b596"), __wbg_fetch_feccdd6b31467948: /* @__PURE__ */ __name(function(t, e, n) {
    return t.fetch(d(e, n));
  }, "__wbg_fetch_feccdd6b31467948"), __wbg_getTime_f5a55efff2585d5d: /* @__PURE__ */ __name(function(t) {
    return t.getTime();
  }, "__wbg_getTime_f5a55efff2585d5d"), __wbg_getWebSockets_23a6ca37e30e4708: /* @__PURE__ */ __name(function(t, e) {
    let n = e.getWebSockets(), r = it(n, i.__wbindgen_malloc), a = l;
    w().setInt32(t + 4, a, true), w().setInt32(t + 0, r, true);
  }, "__wbg_getWebSockets_23a6ca37e30e4708"), __wbg_get_31af05bd4842a84f: /* @__PURE__ */ __name(function(t, e) {
    return Reflect.get(t, e);
  }, "__wbg_get_31af05bd4842a84f"), __wbg_get_806853698d9fc227: /* @__PURE__ */ __name(function(t, e) {
    return Reflect.get(t, e >>> 0);
  }, "__wbg_get_806853698d9fc227"), __wbg_get_88983e33467eae60: /* @__PURE__ */ __name(function(t, e) {
    let n = Reflect.get(t, e);
    return u(n) ? 0 : h(n);
  }, "__wbg_get_88983e33467eae60"), __wbg_get_da0dea0b4d117d30: /* @__PURE__ */ __name(function(t, e, n) {
    return t.get(d(e, n));
  }, "__wbg_get_da0dea0b4d117d30"), __wbg_get_f75619e20cb68514: /* @__PURE__ */ __name(function(t, e, n, r) {
    let a = e.get(d(n, r));
    var f = u(a) ? 0 : p(a, i.__wbindgen_malloc, i.__wbindgen_realloc), b = l;
    w().setInt32(t + 4, b, true), w().setInt32(t + 0, f, true);
  }, "__wbg_get_f75619e20cb68514"), __wbg_get_fc33ed5f5416f95a: /* @__PURE__ */ __name(function(t, e) {
    return t.get(e);
  }, "__wbg_get_fc33ed5f5416f95a"), __wbg_get_unchecked_288889d017702237: /* @__PURE__ */ __name(function(t, e) {
    return t[e >>> 0];
  }, "__wbg_get_unchecked_288889d017702237"), __wbg_get_with_ref_key_6412cf3094599694: /* @__PURE__ */ __name(function(t, e) {
    return t[e];
  }, "__wbg_get_with_ref_key_6412cf3094599694"), __wbg_headers_6930a8bd09b630de: /* @__PURE__ */ __name(function(t) {
    return t.headers;
  }, "__wbg_headers_6930a8bd09b630de"), __wbg_headers_eba93595f8944c2f: /* @__PURE__ */ __name(function(t) {
    return t.headers;
  }, "__wbg_headers_eba93595f8944c2f"), __wbg_idFromName_de3147ec40aecd0e: /* @__PURE__ */ __name(function(t, e, n) {
    return t.idFromName(d(e, n));
  }, "__wbg_idFromName_de3147ec40aecd0e"), __wbg_id_01ca7bb3456d00ad: /* @__PURE__ */ __name(function(t) {
    return t.id;
  }, "__wbg_id_01ca7bb3456d00ad"), __wbg_instanceId_9b67ff33ae8bef8a: /* @__PURE__ */ __name(function(t) {
    return t.instanceId;
  }, "__wbg_instanceId_9b67ff33ae8bef8a"), __wbg_instanceof_ArrayBuffer_a99f175873e5d9b8: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = t instanceof ArrayBuffer;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_ArrayBuffer_a99f175873e5d9b8"), __wbg_instanceof_Error_80a725f81f2e102d: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = t instanceof Error;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Error_80a725f81f2e102d"), __wbg_instanceof_Response_b8758567269c30b2: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = t instanceof Response;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Response_b8758567269c30b2"), __wbg_instanceof_Uint8Array_828cef2aaacafc31: /* @__PURE__ */ __name(function(t) {
    let e;
    try {
      e = t instanceof Uint8Array;
    } catch {
      e = false;
    }
    return e;
  }, "__wbg_instanceof_Uint8Array_828cef2aaacafc31"), __wbg_isSafeInteger_717808ad6a54bd9e: /* @__PURE__ */ __name(function(t) {
    return Number.isSafeInteger(t);
  }, "__wbg_isSafeInteger_717808ad6a54bd9e"), __wbg_is_4b278c0bd3caba97: /* @__PURE__ */ __name(function(t, e) {
    return Object.is(t, e);
  }, "__wbg_is_4b278c0bd3caba97"), __wbg_json_62c1da850fdfa792: /* @__PURE__ */ __name(function(t) {
    return t.json();
  }, "__wbg_json_62c1da850fdfa792"), __wbg_keys_bac434c8972731d5: /* @__PURE__ */ __name(function(t) {
    return t.keys();
  }, "__wbg_keys_bac434c8972731d5"), __wbg_length_7f3c00c40364105e: /* @__PURE__ */ __name(function(t) {
    return t.length;
  }, "__wbg_length_7f3c00c40364105e"), __wbg_length_d4bdea10311bd9cf: /* @__PURE__ */ __name(function(t) {
    return t.length;
  }, "__wbg_length_d4bdea10311bd9cf"), __wbg_log_17c30ef363c61cf4: /* @__PURE__ */ __name(function(t) {
    console.log(t);
  }, "__wbg_log_17c30ef363c61cf4"), __wbg_message_5f8387f0c32b90a7: /* @__PURE__ */ __name(function(t) {
    return t.message;
  }, "__wbg_message_5f8387f0c32b90a7"), __wbg_method_6d02ee0808a7de31: /* @__PURE__ */ __name(function(t, e) {
    let n = e.method, r = p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), a = l;
    w().setInt32(t + 4, a, true), w().setInt32(t + 0, r, true);
  }, "__wbg_method_6d02ee0808a7de31"), __wbg_minifyconfig_new: /* @__PURE__ */ __name(function(t) {
    return v.__wrap(t);
  }, "__wbg_minifyconfig_new"), __wbg_name_e2eac7cdfa054f65: /* @__PURE__ */ __name(function(t) {
    return t.name;
  }, "__wbg_name_e2eac7cdfa054f65"), __wbg_name_e57c892bb6585cd7: /* @__PURE__ */ __name(function(t, e) {
    let n = e.name;
    var r = u(n) ? 0 : p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), a = l;
    w().setInt32(t + 4, a, true), w().setInt32(t + 0, r, true);
  }, "__wbg_name_e57c892bb6585cd7"), __wbg_name_f9b814d78e8e299f: /* @__PURE__ */ __name(function(t) {
    return t.name;
  }, "__wbg_name_f9b814d78e8e299f"), __wbg_new_0_72d020f0c63443d4: /* @__PURE__ */ __name(function() {
    return /* @__PURE__ */ new Date();
  }, "__wbg_new_0_72d020f0c63443d4"), __wbg_new_1dbf7428bba60a42: /* @__PURE__ */ __name(function(t) {
    return new Uint8Array(t);
  }, "__wbg_new_1dbf7428bba60a42"), __wbg_new_28744009d011f847: /* @__PURE__ */ __name(function() {
    return /* @__PURE__ */ new Map();
  }, "__wbg_new_28744009d011f847"), __wbg_new_343a093a3c2ffb4e: /* @__PURE__ */ __name(function(t, e) {
    return new Error(d(t, e));
  }, "__wbg_new_343a093a3c2ffb4e"), __wbg_new_34e56228080aa9f8: /* @__PURE__ */ __name(function(t) {
    return new Date(t);
  }, "__wbg_new_34e56228080aa9f8"), __wbg_new_617a8cdb8bb1130e: /* @__PURE__ */ __name(function() {
    return new Object();
  }, "__wbg_new_617a8cdb8bb1130e"), __wbg_new_83ca405eae412a62: /* @__PURE__ */ __name(function() {
    return new Headers();
  }, "__wbg_new_83ca405eae412a62"), __wbg_new_85a9cbedb455cd92: /* @__PURE__ */ __name(function(t, e, n, r) {
    return new WebSocketRequestResponsePair(d(t, e), d(n, r));
  }, "__wbg_new_85a9cbedb455cd92"), __wbg_new_a319c03ad1458611: /* @__PURE__ */ __name(function() {
    return new WebSocketPair();
  }, "__wbg_new_a319c03ad1458611"), __wbg_new_ee2291f50781bf1d: /* @__PURE__ */ __name(function() {
    return new Array();
  }, "__wbg_new_ee2291f50781bf1d"), __wbg_new_typed_b01cb72a8af741a3: /* @__PURE__ */ __name(function(t, e) {
    try {
      var n = { a: t, b: e }, r = /* @__PURE__ */ __name((f, b) => {
        let g = n.a;
        n.a = 0;
        try {
          return ct(g, n.b, f, b);
        } finally {
          n.a = g;
        }
      }, "r");
      return new Promise(r);
    } finally {
      n.a = 0;
    }
  }, "__wbg_new_typed_b01cb72a8af741a3"), __wbg_new_with_byte_offset_and_length_2f5d7fc2a828b74d: /* @__PURE__ */ __name(function(t, e, n) {
    return new Uint8Array(t, e >>> 0, n >>> 0);
  }, "__wbg_new_with_byte_offset_and_length_2f5d7fc2a828b74d"), __wbg_new_with_length_3da0ad195f6f63ba: /* @__PURE__ */ __name(function(t) {
    return new Uint8Array(t >>> 0);
  }, "__wbg_new_with_length_3da0ad195f6f63ba"), __wbg_new_with_opt_buffer_source_and_init_c1b859a23c80afca: /* @__PURE__ */ __name(function(t, e) {
    return new Response(t, e);
  }, "__wbg_new_with_opt_buffer_source_and_init_c1b859a23c80afca"), __wbg_new_with_opt_readable_stream_and_init_df114f2d364f216d: /* @__PURE__ */ __name(function(t, e) {
    return new Response(t, e);
  }, "__wbg_new_with_opt_readable_stream_and_init_df114f2d364f216d"), __wbg_new_with_opt_str_and_init_33bef1b272950372: /* @__PURE__ */ __name(function(t, e, n) {
    return new Response(t === 0 ? void 0 : d(t, e), n);
  }, "__wbg_new_with_opt_str_and_init_33bef1b272950372"), __wbg_new_with_str_and_init_4618dee4e950224f: /* @__PURE__ */ __name(function(t, e, n) {
    return new Request(d(t, e), n);
  }, "__wbg_new_with_str_and_init_4618dee4e950224f"), __wbg_next_f4aac29c42af995c: /* @__PURE__ */ __name(function(t) {
    return t.next();
  }, "__wbg_next_f4aac29c42af995c"), __wbg_prototypesetcall_bc27214492979395: /* @__PURE__ */ __name(function(t, e, n) {
    Uint8Array.prototype.set.call(Z(t, e), n);
  }, "__wbg_prototypesetcall_bc27214492979395"), __wbg_push_2baf45db356cf468: /* @__PURE__ */ __name(function(t, e) {
    return t.push(e);
  }, "__wbg_push_2baf45db356cf468"), __wbg_put_d364cb6c87efb8b4: /* @__PURE__ */ __name(function(t, e, n, r) {
    return t.put(d(e, n), r);
  }, "__wbg_put_d364cb6c87efb8b4"), __wbg_queueMicrotask_9833f9a49df95a49: /* @__PURE__ */ __name(function(t) {
    return t.queueMicrotask;
  }, "__wbg_queueMicrotask_9833f9a49df95a49"), __wbg_queueMicrotask_a72f977e97f23c5f: /* @__PURE__ */ __name(function(t) {
    queueMicrotask(t);
  }, "__wbg_queueMicrotask_a72f977e97f23c5f"), __wbg_random_5a4cafd2f02395ff: /* @__PURE__ */ __name(function() {
    return Math.random();
  }, "__wbg_random_5a4cafd2f02395ff"), __wbg_readable_7c6bc793dd899969: /* @__PURE__ */ __name(function(t) {
    return t.readable;
  }, "__wbg_readable_7c6bc793dd899969"), __wbg_resolve_0076e10020304ede: /* @__PURE__ */ __name(function(t) {
    return Promise.resolve(t);
  }, "__wbg_resolve_0076e10020304ede"), __wbg_respond_c102fabcc79e5ef0: /* @__PURE__ */ __name(function(t, e) {
    t.respond(e >>> 0);
  }, "__wbg_respond_c102fabcc79e5ef0"), __wbg_send_b5bdd806efe4baf6: /* @__PURE__ */ __name(function(t, e, n) {
    t.send(d(e, n));
  }, "__wbg_send_b5bdd806efe4baf6"), __wbg_serializeAttachment_1af0eaaee11b6cda: /* @__PURE__ */ __name(function(t, e) {
    t.serializeAttachment(e);
  }, "__wbg_serializeAttachment_1af0eaaee11b6cda"), __wbg_setAlarm_c5fe74baa2cbb03d: /* @__PURE__ */ __name(function(t, e, n) {
    return t.setAlarm(e, n);
  }, "__wbg_setAlarm_c5fe74baa2cbb03d"), __wbg_setWebSocketAutoResponse_1a68b97f21173d49: /* @__PURE__ */ __name(function(t, e) {
    t.setWebSocketAutoResponse(e);
  }, "__wbg_setWebSocketAutoResponse_1a68b97f21173d49"), __wbg_set_145a351398b48c65: /* @__PURE__ */ __name(function(t, e, n) {
    return Reflect.set(t, e, n);
  }, "__wbg_set_145a351398b48c65"), __wbg_set_575d3ddb70fe831d: /* @__PURE__ */ __name(function(t, e, n) {
    t.set(Z(e, n));
  }, "__wbg_set_575d3ddb70fe831d"), __wbg_set_6ae97e73113c4f0b: /* @__PURE__ */ __name(function(t, e, n) {
    return t.set(e, n);
  }, "__wbg_set_6ae97e73113c4f0b"), __wbg_set_6be42768c690e380: /* @__PURE__ */ __name(function(t, e, n) {
    t[e] = n;
  }, "__wbg_set_6be42768c690e380"), __wbg_set_af5932e3f78b5648: /* @__PURE__ */ __name(function(t, e, n, r, a) {
    t.set(d(e, n), d(r, a));
  }, "__wbg_set_af5932e3f78b5648"), __wbg_set_body_1fb0f1008bfc7df6: /* @__PURE__ */ __name(function(t, e) {
    t.body = e;
  }, "__wbg_set_body_1fb0f1008bfc7df6"), __wbg_set_cache_7507c4cc5938ccc7: /* @__PURE__ */ __name(function(t, e) {
    t.cache = ft[e];
  }, "__wbg_set_cache_7507c4cc5938ccc7"), __wbg_set_criticalError_3904d60fe2a0b05b: /* @__PURE__ */ __name(function(t, e) {
    t.criticalError = e !== 0;
  }, "__wbg_set_criticalError_3904d60fe2a0b05b"), __wbg_set_headers_40ad33dcf016613f: /* @__PURE__ */ __name(function(t, e) {
    t.headers = e;
  }, "__wbg_set_headers_40ad33dcf016613f"), __wbg_set_headers_69ef7c46a2e6c742: /* @__PURE__ */ __name(function(t, e) {
    t.headers = e;
  }, "__wbg_set_headers_69ef7c46a2e6c742"), __wbg_set_instanceId_9ad5caac0a4e519c: /* @__PURE__ */ __name(function(t, e) {
    t.instanceId = e >>> 0;
  }, "__wbg_set_instanceId_9ad5caac0a4e519c"), __wbg_set_method_dcb32343247ec427: /* @__PURE__ */ __name(function(t, e, n) {
    t.method = d(e, n);
  }, "__wbg_set_method_dcb32343247ec427"), __wbg_set_redirect_cc128ab2411da334: /* @__PURE__ */ __name(function(t, e) {
    t.redirect = bt[e];
  }, "__wbg_set_redirect_cc128ab2411da334"), __wbg_set_status_678f122cbe435d95: /* @__PURE__ */ __name(function(t, e) {
    t.status = e;
  }, "__wbg_set_status_678f122cbe435d95"), __wbg_sql_eba8854fa103d621: /* @__PURE__ */ __name(function(t) {
    return t.sql;
  }, "__wbg_sql_eba8854fa103d621"), __wbg_static_accessor_GLOBAL_266715b9d96ba635: /* @__PURE__ */ __name(function() {
    let t = typeof global > "u" ? null : global;
    return u(t) ? 0 : h(t);
  }, "__wbg_static_accessor_GLOBAL_266715b9d96ba635"), __wbg_static_accessor_GLOBAL_THIS_10fb7dc1ae063179: /* @__PURE__ */ __name(function() {
    let t = typeof globalThis > "u" ? null : globalThis;
    return u(t) ? 0 : h(t);
  }, "__wbg_static_accessor_GLOBAL_THIS_10fb7dc1ae063179"), __wbg_static_accessor_INIT_STATE_e3fce2ad8a08e94e: /* @__PURE__ */ __name(function() {
    return G;
  }, "__wbg_static_accessor_INIT_STATE_e3fce2ad8a08e94e"), __wbg_static_accessor_SELF_0b583911f537483a: /* @__PURE__ */ __name(function() {
    let t = typeof self > "u" ? null : self;
    return u(t) ? 0 : h(t);
  }, "__wbg_static_accessor_SELF_0b583911f537483a"), __wbg_static_accessor_WINDOW_d7f903d1508cbdc4: /* @__PURE__ */ __name(function() {
    let t = typeof window > "u" ? null : window;
    return u(t) ? 0 : h(t);
  }, "__wbg_static_accessor_WINDOW_d7f903d1508cbdc4"), __wbg_status_ce0a98d3c57125f3: /* @__PURE__ */ __name(function(t) {
    return t.status;
  }, "__wbg_status_ce0a98d3c57125f3"), __wbg_storage_dbf440e5000527fe: /* @__PURE__ */ __name(function(t) {
    return t.storage;
  }, "__wbg_storage_dbf440e5000527fe"), __wbg_then_c949d5a25a4e78f8: /* @__PURE__ */ __name(function(t, e, n) {
    return t.then(e, n);
  }, "__wbg_then_c949d5a25a4e78f8"), __wbg_then_e71170d78fcf8954: /* @__PURE__ */ __name(function(t, e) {
    return t.then(e);
  }, "__wbg_then_e71170d78fcf8954"), __wbg_toArray_2757e80d5ccf01a6: /* @__PURE__ */ __name(function(t) {
    return t.toArray();
  }, "__wbg_toArray_2757e80d5ccf01a6"), __wbg_toISOString_3217c36cf55f719b: /* @__PURE__ */ __name(function(t) {
    return t.toISOString();
  }, "__wbg_toISOString_3217c36cf55f719b"), __wbg_url_7bfada5c2297bc70: /* @__PURE__ */ __name(function(t, e) {
    let n = e.url, r = p(n, i.__wbindgen_malloc, i.__wbindgen_realloc), a = l;
    w().setInt32(t + 4, a, true), w().setInt32(t + 0, r, true);
  }, "__wbg_url_7bfada5c2297bc70"), __wbg_value_f3c585ee8f5ba40c: /* @__PURE__ */ __name(function(t) {
    return t.value;
  }, "__wbg_value_f3c585ee8f5ba40c"), __wbg_view_9c570f33e8d6ab96: /* @__PURE__ */ __name(function(t) {
    let e = t.view;
    return u(e) ? 0 : h(e);
  }, "__wbg_view_9c570f33e8d6ab96"), __wbg_webSocket_2b7e8e9549bed673: /* @__PURE__ */ __name(function(t) {
    let e = t.webSocket;
    return u(e) ? 0 : h(e);
  }, "__wbg_webSocket_2b7e8e9549bed673"), __wbg_writable_a897472079c09078: /* @__PURE__ */ __name(function(t) {
    return t.writable;
  }, "__wbg_writable_a897472079c09078"), __wbindgen_generic_0000000000000001: /* @__PURE__ */ __name(function(t, e) {
    return pt(t, e, ot);
  }, "__wbindgen_generic_0000000000000001"), __wbindgen_generic_0000000000000002: /* @__PURE__ */ __name(function(t) {
    return t;
  }, "__wbindgen_generic_0000000000000002"), __wbindgen_generic_0000000000000003: /* @__PURE__ */ __name(function(t, e) {
    return d(t, e);
  }, "__wbindgen_generic_0000000000000003"), __wbindgen_generic_0000000000000004: /* @__PURE__ */ __name(function(t) {
    return BigInt.asUintN(64, t);
  }, "__wbindgen_generic_0000000000000004"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(function() {
    let t = i.__wbindgen_externrefs, e = t.grow(4);
    t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, true), t.set(e + 3, false);
  }, "__wbindgen_init_externref_table"), __wbindgen_jstag: WebAssembly.JSTag, __wbindgen_rethrow_critical: /* @__PURE__ */ __name(function(t) {
    throw new Error("Critical error", { cause: t });
  }, "__wbindgen_rethrow_critical") } };
}
__name(_t, "_t");
var L = new WebAssembly.Tag({ parameters: ["externref"] });
var D;
var V = false;
function rt() {
  V = true;
  try {
    let _2 = B()[i.__abort_handler.value / 4];
    _2 && i.__wbindgen_export.get(_2)();
  } catch {
  }
}
__name(rt, "rt");
function o(_2) {
  throw _2 instanceof WebAssembly.Exception && _2.is(L) ? _2.getArg(L, 0) : (B()[D] = 1, rt(), _2);
}
__name(o, "o");
function c() {
  if (D ??= i.__instance_terminated.value / 4, B()[D]) {
    if (V || rt(), T) {
      M();
      return;
    }
    throw new Error("Module terminated");
  } else T && M();
}
__name(c, "c");
function ot(_2, t, e) {
  let n;
  c();
  try {
    n = i.wasm_bindgen_2301bf6bdf32cc03___convert__closures_____invoke___wasm_bindgen_2301bf6bdf32cc03___JsValue__core_37ee0ce0c4cd57d5___result__Result_____wasm_bindgen_2301bf6bdf32cc03___JsError___true_(_2, t, e);
  } catch (r) {
    o(r);
  }
  if (n[1]) throw yt(n[0]);
}
__name(ot, "ot");
function ct(_2, t, e, n) {
  c();
  try {
    i.wasm_bindgen_2301bf6bdf32cc03___convert__closures_____invoke___js_sys_80b1b4b40900ea12___Function_fn_wasm_bindgen_2301bf6bdf32cc03___JsValue_____wasm_bindgen_2301bf6bdf32cc03___sys__Undefined___js_sys_80b1b4b40900ea12___Function_fn_wasm_bindgen_2301bf6bdf32cc03___JsValue_____wasm_bindgen_2301bf6bdf32cc03___sys__Undefined_______true_(_2, t, e, n);
  } catch (r) {
    o(r);
  }
}
__name(ct, "ct");
var at = ["bytes"];
var ft = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];
var bt = ["follow", "error", "manual"];
var s = 0;
var ut = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_containerstartupoptions_free(_2, 1);
});
var wt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_intounderlyingbytesource_free(_2, 1);
});
var dt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_intounderlyingsink_free(_2, 1);
});
var gt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_intounderlyingsource_free(_2, 1);
});
var K = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_minifyconfig_free(_2, 1);
});
var lt = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_r2range_free(_2, 1);
});
var Q = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_room_free(_2, 1);
});
var X = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry(({ ptr: _2, instance: t }) => {
  t === s && i.__wbg_stats_free(_2, 1);
});
function h(_2) {
  let t = i.__externref_table_alloc();
  return i.__wbindgen_externrefs.set(t, _2), t;
}
__name(h, "h");
var Y = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry((_2) => {
  _2.instance === s && i.__wbindgen_destroy_closure(_2.a, _2.b);
});
function J(_2) {
  let t = typeof _2;
  if (t == "number" || t == "boolean" || _2 == null) return `${_2}`;
  if (t == "string") return `"${_2}"`;
  if (t == "symbol") {
    let r = _2.description;
    return r == null ? "Symbol" : `Symbol(${r})`;
  }
  if (t == "function") {
    let r = _2.name;
    return typeof r == "string" && r.length > 0 ? `Function(${r})` : "Function";
  }
  if (Array.isArray(_2)) {
    let r = _2.length, a = "[";
    r > 0 && (a += J(_2[0]));
    for (let f = 1; f < r; f++) a += ", " + J(_2[f]);
    return a += "]", a;
  }
  let e = /\[object ([^\]]+)\]/.exec(toString.call(_2)), n;
  if (e && e.length > 1) n = e[1];
  else return toString.call(_2);
  if (n == "Object") try {
    return "Object(" + JSON.stringify(_2) + ")";
  } catch {
    return "Object";
  }
  return _2 instanceof Error ? `${_2.name}: ${_2.message}
${_2.stack}` : n;
}
__name(J, "J");
function ht(_2, t) {
  _2 = _2 >>> 0;
  let e = w(), n = [];
  for (let r = _2; r < _2 + 4 * t; r += 4) n.push(i.__wbindgen_externrefs.get(e.getUint32(r, true)));
  return i.__externref_drop_slice(_2, t), n;
}
__name(ht, "ht");
function Z(_2, t) {
  return _2 = _2 >>> 0, k().subarray(_2 / 1, _2 / 1 + t);
}
__name(Z, "Z");
var m = null;
function w() {
  return (m === null || m.buffer.detached === true || m.buffer.detached === void 0 && m.buffer !== i.memory.buffer) && (m = new DataView(i.memory.buffer)), m;
}
__name(w, "w");
var W = null;
function B() {
  return (W === null || W.byteLength === 0) && (W = new Int32Array(i.memory.buffer)), W;
}
__name(B, "B");
function d(_2, t) {
  return mt(_2 >>> 0, t);
}
__name(d, "d");
var F = null;
function k() {
  return (F === null || F.byteLength === 0) && (F = new Uint8Array(i.memory.buffer)), F;
}
__name(k, "k");
function u(_2) {
  return _2 == null;
}
__name(u, "u");
function pt(_2, t, e) {
  let n = { a: _2, b: t, cnt: 1, instance: s }, r = /* @__PURE__ */ __name((...a) => {
    if (n.instance !== s) throw new Error("Cannot invoke closure from previous WASM instance");
    n.cnt++;
    let f = n.a;
    n.a = 0;
    try {
      return e(f, n.b, ...a);
    } finally {
      n.a = f, r._wbg_cb_unref();
    }
  }, "r");
  return r._wbg_cb_unref = () => {
    --n.cnt === 0 && (i.__wbindgen_destroy_closure(n.a, n.b), n.a = 0, Y.unregister(n));
  }, Y.register(r, n, n), r;
}
__name(pt, "pt");
function it(_2, t) {
  let e = t(_2.length * 4, 4) >>> 0;
  for (let n = 0; n < _2.length; n++) {
    let r = h(_2[n]);
    w().setUint32(e + 4 * n, r, true);
  }
  return l = _2.length, e;
}
__name(it, "it");
function p(_2, t, e) {
  if (e === void 0) {
    let b = A.encode(_2), g = t(b.length, 1) >>> 0;
    return k().subarray(g, g + b.length).set(b), l = b.length, g;
  }
  let n = _2.length, r = t(n, 1) >>> 0, a = k(), f = 0;
  for (; f < n; f++) {
    let b = _2.charCodeAt(f);
    if (b > 127) break;
    a[r + f] = b;
  }
  if (f !== n) {
    f !== 0 && (_2 = _2.slice(f)), r = e(r, n, n = f + _2.length * 3, 1) >>> 0;
    let b = k().subarray(r + f, r + n), g = A.encodeInto(_2, b);
    f += g.written, r = e(r, n, f, 1) >>> 0;
  }
  return l = f, r;
}
__name(p, "p");
var T = false;
function yt(_2) {
  let t = i.__wbindgen_externrefs.get(_2);
  return i.__externref_table_dealloc(_2), t;
}
__name(yt, "yt");
var st = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
st.decode();
function mt(_2, t) {
  return st.decode(k().subarray(_2, _2 + t));
}
__name(mt, "mt");
var A = new TextEncoder();
"encodeInto" in A || (A.encodeInto = function(_2, t) {
  let e = A.encode(_2);
  return t.set(e), { read: _2.length, written: e.length };
});
var l = 0;
var N = new WebAssembly.Instance(tt, _t());
var i = N.exports;
i.__wbindgen_start();
Error.stackTraceLimit = 100;
var y = et();
function $() {
  y.criticalError && (console.log("Reinitializing Wasm application"), M(), y.criticalError = false, y.instanceId++);
}
__name($, "$");
addEventListener("error", (_2) => {
  H(_2.error);
});
function H(_2) {
  _2 instanceof WebAssembly.RuntimeError && (console.error("Critical", _2), y.criticalError = true);
}
__name(H, "H");
var C = class extends It {
  static {
    __name(this, "C");
  }
};
C.prototype.fetch = function(t) {
  return nt.call(this, t, this.env, this.ctx);
};
var Et = { set: /* @__PURE__ */ __name((_2, t, e, n) => Reflect.set(_2.instance, t, e, n), "set"), has: /* @__PURE__ */ __name((_2, t) => Reflect.has(_2.instance, t), "has"), deleteProperty: /* @__PURE__ */ __name((_2, t) => Reflect.deleteProperty(_2.instance, t), "deleteProperty"), apply: /* @__PURE__ */ __name((_2, t, e) => Reflect.apply(_2.instance, t, e), "apply"), construct: /* @__PURE__ */ __name((_2, t, e) => Reflect.construct(_2.instance, t, e), "construct"), getPrototypeOf: /* @__PURE__ */ __name((_2) => Reflect.getPrototypeOf(_2.instance), "getPrototypeOf"), setPrototypeOf: /* @__PURE__ */ __name((_2, t) => Reflect.setPrototypeOf(_2.instance, t), "setPrototypeOf"), isExtensible: /* @__PURE__ */ __name((_2) => Reflect.isExtensible(_2.instance), "isExtensible"), preventExtensions: /* @__PURE__ */ __name((_2) => Reflect.preventExtensions(_2.instance), "preventExtensions"), getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, t) => Reflect.getOwnPropertyDescriptor(_2.instance, t), "getOwnPropertyDescriptor"), defineProperty: /* @__PURE__ */ __name((_2, t, e) => Reflect.defineProperty(_2.instance, t, e), "defineProperty"), ownKeys: /* @__PURE__ */ __name((_2) => Reflect.ownKeys(_2.instance), "ownKeys") };
var j = { construct(_2, t, e) {
  try {
    $();
    let n = { instance: Reflect.construct(_2, t, e), instanceId: y.instanceId, ctor: _2, args: t, newTarget: e };
    return new Proxy(n, { ...Et, get(r, a, f) {
      r.instanceId !== y.instanceId && (r.instance = Reflect.construct(r.ctor, r.args, r.newTarget), r.instanceId = y.instanceId);
      let b = Reflect.get(r.instance, a, f);
      return typeof b != "function" ? b : b.constructor === Function ? new Proxy(b, { apply(g, U, q) {
        $();
        try {
          return g.apply(U, q);
        } catch (R) {
          throw H(R), R;
        }
      } }) : new Proxy(b, { async apply(g, U, q) {
        $();
        try {
          return await g.apply(U, q);
        } catch (R) {
          throw H(R), R;
        }
      } });
    } });
  } catch (n) {
    throw y.criticalError = true, n;
  }
} };
var Wt = new Proxy(C, j);
var Ft = new Proxy(I, j);
var kt = new Proxy(v, j);
var At = new Proxy(E, j);
var zt = new Proxy(x, j);
var Ot = new Proxy(S, j);
export {
  Ft as ContainerStartupOptions,
  kt as MinifyConfig,
  At as R2Range,
  zt as Room,
  Ot as Stats,
  Wt as default
};
//# sourceMappingURL=shim.js.map
