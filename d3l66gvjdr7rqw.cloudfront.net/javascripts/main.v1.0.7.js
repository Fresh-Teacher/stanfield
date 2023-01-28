/*https://unpkg.com/unfetch@4.2.0/polyfill/index.js*/
self.fetch || (self.fetch = function(e, n) {
    return n = n || {}, new Promise(function(t, s) {
        var r = new XMLHttpRequest,
            o = [],
            u = [],
            i = {},
            a = function() {
                return {
                    ok: 2 == (r.status / 100 | 0),
                    statusText: r.statusText,
                    status: r.status,
                    url: r.responseURL,
                    text: function() {
                        return Promise.resolve(r.responseText)
                    },
                    json: function() {
                        return Promise.resolve(r.responseText).then(JSON.parse)
                    },
                    blob: function() {
                        return Promise.resolve(new Blob([r.response]))
                    },
                    clone: a,
                    headers: {
                        keys: function() {
                            return o
                        },
                        entries: function() {
                            return u
                        },
                        get: function(e) {
                            return i[e.toLowerCase()]
                        },
                        has: function(e) {
                            return e.toLowerCase() in i
                        }
                    }
                }
            };
        for (var c in r.open(n.method || "get", e, !0), r.onload = function() {
                r.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e, n, t) {
                    o.push(n = n.toLowerCase()), u.push([n, t]), i[n] = i[n] ? i[n] + "," + t : t
                }), t(a())
            }, r.onerror = s, r.withCredentials = "include" == n.credentials, n.headers) r.setRequestHeader(c, n.headers[c]);
        r.send(n.body || null)
    })
});
/*https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js*/
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t()
}(0, function() {
    "use strict";

    function e(e) {
        var t = this.constructor;
        return this.then(function(n) {
            return t.resolve(e()).then(function() {
                return n
            })
        }, function(n) {
            return t.resolve(e()).then(function() {
                return t.reject(n)
            })
        })
    }

    function t(e) {
        return new this(function(t, n) {
            function o(e, n) {
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var f = n.then;
                    if ("function" == typeof f) return void f.call(n, function(t) {
                        o(e, t)
                    }, function(n) {
                        r[e] = {
                            status: "rejected",
                            reason: n
                        }, 0 == --i && t(r)
                    })
                }
                r[e] = {
                    status: "fulfilled",
                    value: n
                }, 0 == --i && t(r)
            }
            if (!e || "undefined" == typeof e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length) return t([]);
            for (var i = r.length, f = 0; r.length > f; f++) o(f, r[f])
        })
    }

    function n(e) {
        return !(!e || "undefined" == typeof e.length)
    }

    function o() {}

    function r(e) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], l(e, this)
    }

    function i(e, t) {
        for (; 3 === e._state;) e = e._value;
        0 !== e._state ? (e._handled = !0, r._immediateFn(function() {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
                var o;
                try {
                    o = n(e._value)
                } catch (r) {
                    return void u(t.promise, r)
                }
                f(t.promise, o)
            } else(1 === e._state ? f : u)(t.promise, e._value)
        })) : e._deferreds.push(t)
    }

    function f(e, t) {
        try {
            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var n = t.then;
                if (t instanceof r) return e._state = 3, e._value = t, void c(e);
                if ("function" == typeof n) return void l(function(e, t) {
                    return function() {
                        e.apply(t, arguments)
                    }
                }(n, t), e)
            }
            e._state = 1, e._value = t, c(e)
        } catch (o) {
            u(e, o)
        }
    }

    function u(e, t) {
        e._state = 2, e._value = t, c(e)
    }

    function c(e) {
        2 === e._state && 0 === e._deferreds.length && r._immediateFn(function() {
            e._handled || r._unhandledRejectionFn(e._value)
        });
        for (var t = 0, n = e._deferreds.length; n > t; t++) i(e, e._deferreds[t]);
        e._deferreds = null
    }

    function l(e, t) {
        var n = !1;
        try {
            e(function(e) {
                n || (n = !0, f(t, e))
            }, function(e) {
                n || (n = !0, u(t, e))
            })
        } catch (o) {
            if (n) return;
            n = !0, u(t, o)
        }
    }
    var a = setTimeout;
    r.prototype["catch"] = function(e) {
        return this.then(null, e)
    }, r.prototype.then = function(e, t) {
        var n = new this.constructor(o);
        return i(this, new function(e, t, n) {
            this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
        }(e, t, n)), n
    }, r.prototype["finally"] = e, r.all = function(e) {
        return new r(function(t, o) {
            function r(e, n) {
                try {
                    if (n && ("object" == typeof n || "function" == typeof n)) {
                        var u = n.then;
                        if ("function" == typeof u) return void u.call(n, function(t) {
                            r(e, t)
                        }, o)
                    }
                    i[e] = n, 0 == --f && t(i)
                } catch (c) {
                    o(c)
                }
            }
            if (!n(e)) return o(new TypeError("Promise.all accepts an array"));
            var i = Array.prototype.slice.call(e);
            if (0 === i.length) return t([]);
            for (var f = i.length, u = 0; i.length > u; u++) r(u, i[u])
        })
    }, r.allSettled = t, r.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === r ? e : new r(function(t) {
            t(e)
        })
    }, r.reject = function(e) {
        return new r(function(t, n) {
            n(e)
        })
    }, r.race = function(e) {
        return new r(function(t, o) {
            if (!n(e)) return o(new TypeError("Promise.race accepts an array"));
            for (var i = 0, f = e.length; f > i; i++) r.resolve(e[i]).then(t, o)
        })
    }, r._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e)
    } || function(e) {
        a(e, 0)
    }, r._unhandledRejectionFn = function(e) {
        void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };
    var s = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw Error("unable to locate global object")
    }();
    "function" != typeof s.Promise ? s.Promise = r : s.Promise.prototype["finally"] ? s.Promise.allSettled || (s.Promise.allSettled = t) : s.Promise.prototype["finally"] = e
});

/* fwsdatav1.3.0c */
"use strict";

//.StartsWith js function
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function(str) {
        return this.substring(0, str.length) === str;
    }
};

bindData();


function bindData() {
    try {
        BindCategories();
    } catch (e) {
        console.error('Error binding Categories.');
        console.log(e);
    }
    try {
        BindNavigation();
    } catch (e) {
        console.error('Error binding Naviation.');
        console.log(e);
    }
    try {
        BindCustomPages();
    } catch (e) {
        console.error('Error binding Custom Pages.');
        console.log(e);
    }
    try {
        BindPageLinks();
    } catch (e) {
        console.error('Error binding Page Links');
        console.log(e);
    }
    try {
        DoTranslate();
    } catch (e) {
        console.error('Error translating clientside');
        console.log(e);
    }
}

function SortBySequence(a, b) {
    return (((Number(a.sequence) > Number(b.sequence)) ? 1 : -1));
}

function BindCustomPages() {
    var _page_count = 0;
    var _custom_page_markup = '';

    g_fws_pages.forEach(function(page) {
        if (!page.hidden && !page.navigation && page.pageType != 4 && page.pageType != 5 && page.pageType != 8 && page.pageType != 12 && page.pageType != 9 && page.pageType != 10 && !(g_fws_disable_checkout === 1 && page.pageType == 3)) {
            //if (((g_fws_account_type || g_fws_page_app) && page.pageType == 11) || page.pageType != 11) {

            var _page_url = g_fws_domain + '/index.aspx?pageid=' + page.pageId;

            if (g_fws_editmode)
                _page_url += '&editorPreview=1';

            //alert(page.seo);

            if (page.pageType == 1 && !g_fws_editmode) { //homepage
                _page_url = g_fws_domain;
            } else if (page.pageType == 3) { //basket page
                if (g_fws_editmode)
                    _page_url = '#'; //g_fws_domain + '/sidebysidecartview.aspx?xid=' + sessionid;
                else
                    _page_url = g_fws_domain + '/cart/' + sessionid;
            } else if (page.pageType == 13) { //external link
                _page_url = page.externalURL;

                if (page.linkTarget != null)
                    _page_url += "\" target=\"" + page.linkTarget;

            } else if (page.pageType == 14) { //instagram
                _page_url = g_fws_domain + '/Instagram/';
            } else if (page.pageType == 15) { //blog
                _page_url = g_fws_domain + '/blog/';
            } else if (page.seo != null && page.seo.url != null && !g_fws_editmode) {
                _page_url = g_fws_domain + '/page/' + page.seo.url;
            }

            var _html = _custom_page_html_item.replace(/#/g, _page_url);
            var _page_name = page.name;

            if (g_fws_lang > -1 && page.translations != null) {
                try {
                    //_page_name = page.translations.find(x => x.languagepack_id === g_fws_lang).translation;
                    if (page.translations.filter(function(x) {
                            return x.languagepackId === g_fws_lang;
                        }) != null)
                        if (page.translations.filter(function(x) {
                                return x.languagepackId === g_fws_lang;
                            }).length > 0)
                            _page_name = page.translations.filter(function(x) {
                                return x.languagepackId === g_fws_lang;
                            })[0].translation;
                } catch (e) {
                    console.log(e);
                }
            }

            _html = _html.replace(/\[PageName]/g, page.name);
            _custom_page_markup += _html;
            _page_count += 1;
            //}
        }
    });

    if (_page_count > 0) {
        _custom_page_markup = _custom_page_html_header + _custom_page_markup;
        _custom_page_markup += _custom_page_html_footer;
        $('#ui_pages_container').replaceWith(_custom_page_markup);
    } else
        $('#ui_pages_container').remove();
}

function BindNavigation() {
    //console.log('Bind Tabs');
    var _nav_page_count = 0;
    var _nav_markup = '';

    g_fws_pages.forEach(function(page) {

        if (!page.hidden && page.navigation && !(g_fws_disable_checkout === 1 && page.pageType == 3)) {
            // if (((g_fws_account_type || g_fws_page_app) && page.pageType == 11) || page.pageType != 11) {

            var _page_url = g_fws_domain + '/index.aspx?pageid=' + page.pageId;

            if (g_fws_editmode)
                _page_url += '&editorPreview=1';

            if (page.pageType == 1 && !g_fws_editmode) { //homepage
                _page_url = g_fws_domain;
            } else if (page.pageType == 3) { //basket page
                if (g_fws_editmode)
                    _page_url = '#'; //g_fws_domain + '/sidebysidecartview.aspx?xid=' + sessionid;
                else
                    _page_url = g_fws_domain + '/cart/' + sessionid;
            } else if (page.pageType == 13) { //external link
                _page_url = page.externalURL;

                if (page.linkTarget != null)
                    _page_url += "\" target=\"" + page.linkTarget;

            } else if (page.pageType == 14) { //instagram
                _page_url = g_fws_domain + '/Instagram/';
            } else if (page.pageType == 15) { //blog
                _page_url = g_fws_domain + '/blog/';
            } else if (page.seo != null && page.seo.url != null && !g_fws_editmode) {
                _page_url = g_fws_domain + '/page/' + page.seo.url;
            }

            var _html = _nav_item.replace(/#/g, _page_url);
            var _page_name = page.name;

            if (g_fws_lang > -1 && page.translations != null) {
                try {
                    //_page_name = page.translations.find(x => x.languagepack_id === g_fws_lang).translation;
                    if (page.translations.filter(function(x) {
                            return x.languagepackId == g_fws_lang;
                        }) != null)
                        if (page.translations.filter(function(x) {
                                return x.languagepackId == g_fws_lang;
                            }).length > 0)
                            _page_name = page.translations.filter(function(x) {
                                return x.languagepackId == g_fws_lang;
                            })[0].translation;
                } catch (e) {
                    console.log(e);
                }
            }

            _html = _html.replace(/\[pagename]/g, _page_name);

            _nav_markup += _html;
            _nav_page_count += 1;
            //}
        }

    });

    if (_nav_page_count > 0) {
        //console.log('Found ' + _nav_page_count + ' nav pages');
        _nav_markup = _nav_header + _nav_markup;
        _nav_markup += _nav_footer;
        //console.log(_nav_markup);
        $('#ui_nav_container').replaceWith(_nav_markup);
    } else {
        $('#ui_nav_container').remove();
    }

}

function BindPageLinks() {
    if (jQuery("#ui_page_links") != null) {

        //console.log('Building Page Links');

        var _link_page_count = 0;
        var _link_page_markup = '';

        g_fws_pages.forEach(function(page) {
            if (!page.hidden &&
                !page.navigation &&
                page.pageType != 4 &&
                page.pageType != 5 &&
                page.pageType != 8 &&
                page.pageType != 12 &&
                page.pageType != 9 &&
                page.pageType != 10 &&
                !(page.pageType == 3 && g_fws_disable_checkout === 1)) {
                //if (((g_fws_account_type || g_fws_page_app) && page.pageType == 11) || page.pageType != 11) {

                var _page_url = g_fws_domain + '/index.aspx?pageid=' + page.pageId;

                if (g_fws_editmode)
                    _page_url += '&editorPreview=1';

                if (page.pageType == 1 && !g_fws_editmode) { //homepage
                    _page_url = g_fws_domain;
                } else if (page.pageType == 3) { //basket page
                    if (g_fws_editmode)
                        _page_url = '#'; //g_fws_domain + '/sidebysidecartview.aspx?xid=' + sessionid;
                    else
                        _page_url = g_fws_domain + '/cart/' + sessionid;
                } else if (page.pageType == 13) { //external link
                    _page_url = page.externalURL;
                    if (page.linkTarget != null)
                        _page_url += "\" target=\"" + page.linkTarget;
                } else if (page.pageType == 14) { //instagram
                    _page_url = g_fws_domain + '/Instagram/';
                } else if (page.pageType == 15) { //blog
                    _page_url = g_fws_domain + '/blog/';
                } else if (page.seo != null && page.seo.url != null && !g_fws_editmode) {
                    _page_url = g_fws_domain + '/page/' + page.seo.url;
                }

                var _page_name = page.name;

                if (g_fws_lang > -1 && page.translations != null) {
                    try {
                        //_page_name = page.translations.find(x => x.languagepack_id === g_fws_lang).translation;
                        if (page.translations.filter(function(x) {
                                return x.languagepackId === g_fws_lang;
                            }) != null)
                            if (page.translations.filter(function(x) {
                                    return x.languagepackId === g_fws_lang;
                                }).length > 0)
                                _page_name = page.translations.filter(function(x) {
                                    return x.languagepackId === g_fws_lang;
                                })[0].translation;
                    } catch (e) {
                        console.log(e);
                    }
                }

                _link_page_markup += '<a href="' + _page_url + '" title="' + _page_name + '" alt="' + _page_name + '">' + _page_name + '</a>';
                _link_page_count += 1;
                //}
            }
        });

        if (_link_page_count > 0)
            $('#ui_page_links').replaceWith(_link_page_markup);
        else
            $('#ui_page_links').remove();
    }
}

function BindCategories() {
    var _category_page = g_fws_pages.filter(function(x) {
        return x.pageType === 8;
    })[0];
    var _category_pageid = _category_page.pageId;
    var _category_count = 0;
    var _category_markup = '';
    var tl_cats = g_fws_categories.filter(function(x) {
        return x.parent == 0 && !x.hidden;
    });
    tl_cats.sort(SortBySequence);
    tl_cats.forEach(function(category) {
        var _category_url = g_fws_domain + "/" + urlSafe(category.name) + '/cat' + _category_pageid + '_' + category.id + '.aspx';

        if (g_fws_editmode) {
            var safeCategoryName = urlSafe(category.name);

            if (safeCategoryName.toLowerCase().startsWith("p") || safeCategoryName.toLowerCase().startsWith("cat")) {
                safeCategoryName = "-" + safeCategoryName;
            }
            _category_url = g_fws_domain + "/" + safeCategoryName + '/index.aspx?pageid=' + _category_pageid + '&category=' + category.id + '&editorPreview=1';
        } else if (category.seo_url != null) {
            if (g_fws_version == 3 && g_fws_account_type)
                _category_url = g_fws_domain + '/category/' + category.seo_url;
            else if (g_fws_version < 3)
                _category_url = g_fws_domain + '/category/' + category.seo_url;
        }

        var _html = _category_item;
        var _html_sub = '';

        if (_category_depth > 1) {
            //console.log('Looking for children of ' + category.id);

            var tl_sub_cats = g_fws_categories.filter(function(x) {
                return x.parent == category.id && !x.hidden;
            });


            if (tl_sub_cats.length > 0) {

                //console.log('Found ' + tl_sub_cats.length+' descendents of ' + category.id);

                tl_sub_cats.sort(SortBySequence);

                if (_category_item_w_children.length > 0)
                    _html = _category_item_w_children;

                _html_sub = _category_sub_header.replace(/\[CategoryName]/g, category.name).replace(/\[Category]/g, category.id).replace(/\[Image]/g, category.image);

                tl_sub_cats.forEach(function(subcategory) {

                    //console.log(subcategory);

                    var _subcategory_url = g_fws_domain + "/" + urlSafe(subcategory.name) + '/cat' + _category_pageid + '_' + subcategory.id + '.aspx';

                    if (g_fws_editmode) {
                        _subcategory_url = g_fws_domain + "/" + urlSafe(subcategory.name) + '/index.aspx?pageid=' + _category_pageid + '&category=' + subcategory.id + '&editorPreview=1';
                    } else if (subcategory.seo_url != null) {
                        if (g_fws_version == 3 && g_fws_account_type)
                            _subcategory_url = g_fws_domain + '/category/' + subcategory.seo_url;
                        else if (g_fws_version < 3)
                            _subcategory_url = g_fws_domain + '/category/' + subcategory.seo_url;
                    }

                    var _sub_markup = _category_sub_item;

                    _sub_markup = _sub_markup.replace(/#/g, _subcategory_url);
                    _sub_markup = _sub_markup.replace(/\[CategoryName]/g, subcategory.name).replace(/\[Category]/g, subcategory.id).replace(/\[Image]/g, subcategory.image);

                    _html_sub += _sub_markup;
                });

                _html_sub += _category_sub_footer.replace(/\[CategoryName]/g, category.name).replace(/\[Category]/g, category.id).replace(/\[Image]/g, category.image);
            }

            //console.log('html sub is:' + _html_sub);
        }

        _html = _html.replace(/#/g, _category_url);
        _html = _html.replace(/\[CategoryName]/g, category.name).replace(/\[Category]/g, category.id).replace(/\[Image]/g, category.image);
        _html = _html.replace("[subItemTemplate]", _html_sub);

        _category_markup += _html;
        _category_count += 1;


    });

    if (_category_count > 0) {
        _category_markup = _category_header + _category_markup;
        _category_markup += _category_footer;
        $('#ui_categories_container').replaceWith(_category_markup);
    } else {
        $('#ui_categories_container').remove();
    }

}

function urlSafe(input) {
    input = input.replace(/\"/g, '').replace(/\,/g, '_').replace(/\:/g, '').replace(/\%/g, '').replace(/\*/g, '_');
    input = input.replace(/\&/g, '_').replace(/\ /g, '_').replace(/\//g, '_').replace(/\./g, '_').replace(/\#/g, '%23');
    input = input.replace(/\'/g, '').replace(/\`/g, '');
    return input;
}

function DoTranslate() {

    var elements = jQuery('*').filter(function() {
        return jQuery(this).data('lang') !== undefined;
    });
    jQuery(elements).each(function(index) {

        if (jQuery(this).data('lang') === true) { //only do it once

            if (jQuery(this).attr("placeholder") !== undefined) {
                jQuery(this).data('lang', jQuery(this).attr("placeholder").trim().replace(/^\n|\n$/g, '').replace("'", "\\'").replace(/"/g, '\\"'));
                jQuery(this).attr('data-lang', jQuery(this).attr("placeholder").trim().replace(/^\n|\n$/g, '').replace("'", "\\'").replace(/"/g, '\\"'));
                jQuery(this).attr("placeholder", Translate(jQuery(this).attr("placeholder")));
            }

            if (jQuery(this).is("input")) {
                jQuery(this).data('lang', jQuery(this).val().trim().replace(/^\n|\n$/g, '').replace("'", "\\'").replace(/"/g, '\\"'));
                jQuery(this).attr('data-lang', jQuery(this).val().trim().replace(/^\n|\n$/g, '').replace("'", "\\'").replace(/"/g, '\\"'));
                jQuery(this).val(Translate(jQuery(this).val()));

                if (jQuery(this).attr("placeholder") !== "") {
                    jQuery(this).data('lang', jQuery(this).attr("placeholder").trim().replace(/^\n|\n$/g, '').replace("'", "\\'").replace(/"/g, '\\"'));
                    jQuery(this).attr('data-lang', jQuery(this).attr("placeholder").trim().replace(/^\n|\n$/g, '').replace("'", "\\'").replace(/"/g, '\\"'));
                    jQuery(this).attr("placeholder", Translate(jQuery(this).attr("placeholder")));
                }
            } else {
                //regular token
                var trans = jQuery(this).html().replace("'", "\\'").replace(/"/g, '\\"');
                trans = trans.trim().replace(/^\n|\n$/g, '');

                jQuery(this).data('lang', trans);
                jQuery(this).attr('data-lang', trans);
                jQuery(this).html(Translate(trans));
            }
        }
    });
}

function Translate(input) {
    var translated = input;
    if (arr_translate_tokens === null) {
        trace('Translation Token Array Not Defined!');
        return input;
    }
    if (input === undefined) {
        trace('Token was undefined');
        return '';
    }
    //remove the evelope if still exists.
    input = input.replace('{:', '');
    input = input.replace(':}', '');

    //remove any whitespace or newlines
    input = input.trim();
    input = input.replace(/^\n|\n$/g, '');

    var this_token = '';
    try {
        this_token = jQuery.grep(arr_translate_tokens, function(e) {
            return e[0].toUpperCase() === input.toUpperCase();
        });
    } catch (e) {
        //
    }

    if (this_token.length > 0) {
        try {
            translated = this_token[0][1];
            translated = decodeEntities(translated);
        } catch (e) {
            //
        }
    }

    return translated;
}

function trace(s) {
    try {
        console.log(s);
    } catch (e) {
        //alert('Unable to trace:' + s);
    }
}

/* BasketAjax2.1.9 */
function RefreshBasketInfo() {
    var callurl = g_fws_cart_url + 'CartService.svc/GetBasketContents?callback=?';

    var curr = jQuery('#display_currency option:selected').val();

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        currency: curr,
        sessionid: sessionid,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }, function(customers) {

        var mydata = null;
        var msg = eval('(' + customers + ')');

        if (msg.hasOwnProperty('d'))
            mydata = msg.d;
        else
            mydata = msg;

        //alert('Received count=' + msg.count+ ' total='+msg.total);

        //sp_basket_info_count
        jQuery("#sp_basket_info_count").text('' + msg.count);
        jQuery("#sp_basket_info_amount").html('' + msg.price_string);

        jQuery("span[id^='sp_basket_info_count']").each(function(i) {
            jQuery(this).text('' + msg.count);
        });

        jQuery("span[id^='sp_basket_info_amount']").each(function(i) {
            jQuery(this).html('' + msg.price_string);
        });

    });

}

function SetLanguage(selectedLanguage) {

    jQuery.ajax({
        async: false,
        url: "/CartService.svc/SetLanguage?shopkeeper=" + g_fws_sk + "&languagepackid=" + selectedLanguage + "&sessionid=" + sessionid,
        success: function(result) {
            if (g_fws_ssl > 0) {
                SetLanguageSSL(selectedLanguage);
            } else {
                location.reload();
            }
        }
    });

}

function SetLanguageSSL(selectedLanguage) {

    var callurl = g_fws_cart_url + 'CartService.svc/SetLanguage?callback=?';

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        languagepackid: selectedLanguage,
        sessionid: sessionid,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }, function(data) {
        var obj = data.d || data;

        //auto redirect back to homepage if we are in an SSL enviroment
        if ('https:' == document.location.protocol) {
            var homepageredir = g_fws_url + '&dl=' + selectedLanguage;
            window.location.replace(homepageredir);
        } else {
            location.reload();
        }

    });
}

function SetStoreCurrency(currency) {

    jQuery.ajax({
        async: false,
        url: "/CartService.svc/SetCurrency?shopkeeper=" + g_fws_sk + "&currency=" + currency + "&sessionid=" + sessionid,
        success: function(result) {

            if (g_fws_ssl > 0) {
                SetStoreCurrencySSL(currency);
            } else {
                location.reload();
            }
        }
    });
}

function SetStoreCurrencySSL(currency) {

    var callurl = g_fws_cart_url + 'CartService.svc/SetCurrency?callback=?';

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        currency: currency,
        sessionid: sessionid,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }, function(data) {
        var obj = data.d || data;

        //auto redirect back to homepage if we are in an SSL enviroment
        if ('https:' == document.location.protocol) {
            window.location.replace(g_fws_url);
        } else {
            location.reload();
        }

    });

}

function ClearBasket() {

    var callurl = g_fws_cart_url + 'CartService.svc/ClearBasket?callback=?';

    var curr = jQuery('#display_currency option:selected').val();

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        currency: curr,
        sessionid: sessionid,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }, function(customers) {

        var mydata = null;
        var msg = eval('(' + customers + ')');

        if (msg.hasOwnProperty('d'))
            mydata = msg.d;
        else
            mydata = msg;

        //alert('Received count=' + msg.count+ ' total='+msg.total);

        //sp_basket_info_count
        jQuery("#sp_basket_info_count").text('' + msg.count);
        jQuery("#sp_basket_info_amount").html('' + msg.price_string);

        jQuery("span[id^='sp_basket_info_count']").each(function(i) {
            jQuery(this).text('' + msg.count);
        });

        jQuery("span[id^='sp_basket_info_amount']").each(function(i) {
            jQuery(this).html('' + msg.price_string);
        });

    });
}

function AddToBasket(pid, quantity) {

    var callurl = g_fws_cart_url + 'CartService.svc/AddtoBasket?callback=?';

    var curr = jQuery('#currency option:selected').val();

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        prodid: pid,
        qty: quantity,
        currency: curr,
        sessionid: sessionid
        /*,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true*/
    }, function(bdata) {

        var mydata = null;
        var msg = eval('(' + bdata + ')');

        if (msg.hasOwnProperty('d'))
            mydata = msg.d;
        else
            mydata = msg;

        //sp_basket_info_count
        jQuery("#sp_basket_info_count").text('' + msg.count);
        jQuery("#sp_basket_info_amount").html('' + msg.price_string);

        jQuery("span[id^='sp_basket_info_count']").each(function(i) {
            jQuery(this).text('' + msg.count);
        });

        jQuery("span[id^='sp_basket_info_amount']").each(function(i) {
            jQuery(this).html('' + msg.price_string);
        });
    });


}

function RefreshMyAccountv7() {
    var callurl = g_fws_cart_url + 'CartService.svc/MyAccountLogin?callback=?';
    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        sessionid: sessionid
    }, function(data) {
        var obj = data.d || data;
        //jQuery('#myaccount_login').html('' + obj.html_template);
        //document.write('' + obj.html_template);

        //swap out our placeholder with the correct content
        jQuery('#myaccount_links_placeholder').replaceWith('' + obj.html_template);
        DoTranslate();
    });
}

function MyAccountLogout() {
    var callurl = g_fws_cart_url + 'CartService.svc/MyAccountLogout?callback=?';
    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        sessionid: sessionid
    }, function(data) {
        var obj = data.d || data;

        //refresh the page.
        //location.reload();
        window.location.href = g_fws_url;
    });
}

/*
function AddNewsletter(_eml) {
    return AddNewsletter(_eml, '');
}
*/

function AddNewsletter(_eml, _name) {

    var callurl = '/CartService.svc/AddSubscriber?shopkeeper=' + g_fws_sk + '&email=' + _eml + '&name=' + _name + '&sessionid=' + sessionid;

    jQuery.ajax({
        async: false,
        cache: false,
        url: callurl,
        dataType: "json",
        success: function(data) {

            var obj = data.d || data;

            if (obj.success) {

                try {
                    NewsletterCallbackSuccess();
                } catch (e) {
                    alert('Success. Failure.');
                }
            } else {

                try {
                    NewsletterCallbackFailure(obj.feedback);
                } catch (e) {
                    alert('Failure. Failure.');
                }
            }
        }
    });

}

function createFwsCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readFwsCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseFwsCookie(name) {
    createFwsCookie(name, "", -1);
}

/*! lazysizes - v5.0.0 */
! function(a, b) {
    var c = b(a, a.document);
    a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
}(window, function(a, b) {
    "use strict";
    if (b.getElementsByClassName) {
        var c, d, e = b.documentElement,
            f = a.Date,
            g = a.HTMLPictureElement,
            h = "addEventListener",
            i = "getAttribute",
            j = a[h],
            k = a.setTimeout,
            l = a.requestAnimationFrame || k,
            m = a.requestIdleCallback,
            n = /^picture$/i,
            o = ["load", "error", "lazyincluded", "_lazyloaded"],
            p = {},
            q = Array.prototype.forEach,
            r = function(a, b) {
                return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b]
            },
            s = function(a, b) {
                r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
            },
            t = function(a, b) {
                var c;
                (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
            },
            u = function(a, b, c) {
                var d = c ? h : "removeEventListener";
                c && u(a, b), o.forEach(function(c) {
                    a[d](c, b)
                })
            },
            v = function(a, d, e, f, g) {
                var h = b.createEvent("Event");
                return e || (e = {}), e.instance = c, h.initEvent(d, !f, !g), h.detail = e, a.dispatchEvent(h), h
            },
            w = function(b, c) {
                var e;
                !g && (e = a.picturefill || d.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), e({
                    reevaluate: !0,
                    elements: [b]
                })) : c && c.src && (b.src = c.src)
            },
            x = function(a, b) {
                return (getComputedStyle(a, null) || {})[b]
            },
            y = function(a, b, c) {
                for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;) c = b.offsetWidth, b = b.parentNode;
                return c
            },
            z = function() {
                var a, c, d = [],
                    e = [],
                    f = d,
                    g = function() {
                        var b = f;
                        for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                        a = !1
                    },
                    h = function(d, e) {
                        a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)))
                    };
                return h._lsFlush = g, h
            }(),
            A = function(a, b) {
                return b ? function() {
                    z(a)
                } : function() {
                    var b = this,
                        c = arguments;
                    z(function() {
                        a.apply(b, c)
                    })
                }
            },
            B = function(a) {
                var b, c = 0,
                    e = d.throttleDelay,
                    g = d.ricTimeout,
                    h = function() {
                        b = !1, c = f.now(), a()
                    },
                    i = m && g > 49 ? function() {
                        m(h, {
                            timeout: g
                        }), g !== d.ricTimeout && (g = d.ricTimeout)
                    } : A(function() {
                        k(h)
                    }, !0);
                return function(a) {
                    var d;
                    (a = !0 === a) && (g = 33), b || (b = !0, d = e - (f.now() - c), d < 0 && (d = 0), a || d < 9 ? i() : k(i, d))
                }
            },
            C = function(a) {
                var b, c, d = 99,
                    e = function() {
                        b = null, a()
                    },
                    g = function() {
                        var a = f.now() - c;
                        a < d ? k(g, d - a) : (m || e)(e)
                    };
                return function() {
                    c = f.now(), b || (b = k(g, d))
                }
            };
        ! function() {
            var b, c = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            d = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in c) b in d || (d[b] = c[b]);
            k(function() {
                d.init && F()
            })
        }();
        var D = function() {
                var g, l, m, o, p, y, D, F, G, H, I, J, K = /^img$/i,
                    L = /^iframe$/i,
                    M = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
                    N = 0,
                    O = 0,
                    P = 0,
                    Q = -1,
                    R = function(a) {
                        P--, (!a || P < 0 || !a.target) && (P = 0)
                    },
                    S = function(a) {
                        return null == J && (J = "hidden" == x(b.body, "visibility")), J || "hidden" != x(a.parentNode, "visibility") && "hidden" != x(a, "visibility")
                    },
                    T = function(a, c) {
                        var d, f = a,
                            g = S(a);
                        for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;)(g = (x(f, "opacity") || 1) > 0) && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1);
                        return g
                    },
                    U = function() {
                        var a, f, h, j, k, m, n, p, q, r, s, t, u = c.elements;
                        if ((o = d.loadMode) && P < 8 && (a = u.length)) {
                            for (f = 0, Q++; f < a; f++)
                                if (u[f] && !u[f]._lazyRace)
                                    if (!M || c.prematureUnveil && c.prematureUnveil(u[f])) aa(u[f]);
                                    else if ((p = u[f][i]("data-expand")) && (m = 1 * p) || (m = O), r || (r = !d.expand || d.expand < 1 ? e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370 : d.expand, c._defEx = r, s = r * d.expFactor, t = d.hFac, J = null, O < s && P < 1 && Q > 2 && o > 2 && !b.hidden ? (O = s, Q = 0) : O = o > 1 && Q > 1 && P < 6 ? r : N), q !== m && (y = innerWidth + m * t, D = innerHeight + m, n = -1 * m, q = m), h = u[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * t && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || S(u[f])) && (l && P < 3 && !p && (o < 3 || Q < 4) || T(u[f], m))) {
                                if (aa(u[f]), k = !0, P > 9) break
                            } else !k && l && !j && P < 4 && Q < 4 && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != u[f][i](d.sizesAttr))) && (j = g[0] || u[f]);
                            j && !k && aa(j)
                        }
                    },
                    V = B(U),
                    W = function(a) {
                        var b = a.target;
                        if (b._lazyCache) return void delete b._lazyCache;
                        R(a), s(b, d.loadedClass), t(b, d.loadingClass), u(b, Y), v(b, "lazyloaded")
                    },
                    X = A(W),
                    Y = function(a) {
                        X({
                            target: a.target
                        })
                    },
                    Z = function(a, b) {
                        try {
                            a.contentWindow.location.replace(b)
                        } catch (c) {
                            a.src = b
                        }
                    },
                    $ = function(a) {
                        var b, c = a[i](d.srcsetAttr);
                        (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c)
                    },
                    _ = A(function(a, b, c, e, f) {
                        var g, h, j, l, o, p;
                        (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = {
                            target: a
                        }, s(a, d.loadingClass), p && (clearTimeout(m), m = k(R, 2500), u(a, Y, !0)), l && q.call(j.getElementsByTagName("source"), $), h ? a.setAttribute("srcset", h) : g && !l && (L.test(a.nodeName) ? Z(a, g) : a.src = g), f && (h || l) && w(a, {
                            src: g
                        })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function() {
                            var b = a.complete && a.naturalWidth > 1;
                            p && !b || (b && s(a, "ls-is-cached"), W(o), a._lazyCache = !0, k(function() {
                                "_lazyCache" in a && delete a._lazyCache
                            }, 9)), "lazy" == a.loading && P--
                        }, !0)
                    }),
                    aa = function(a) {
                        if (!a._lazyRace) {
                            var b, c = K.test(a.nodeName),
                                e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
                                f = "auto" == e;
                            (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, P++, _(a, b, f, e, c))
                        }
                    },
                    ba = C(function() {
                        d.loadMode = 3, V()
                    }),
                    ca = function() {
                        3 == d.loadMode && (d.loadMode = 2), ba()
                    },
                    da = function() {
                        if (!l) {
                            if (f.now() - p < 999) return void k(da, 999);
                            l = !0, d.loadMode = 3, V(), j("scroll", ca, !0)
                        }
                    };
                return {
                    _: function() {
                        p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), j("scroll", V, !0), j("resize", V, !0), a.MutationObserver ? new MutationObserver(V).observe(e, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (e[h]("DOMNodeInserted", V, !0), e[h]("DOMAttrModified", V, !0), setInterval(V, 999)), j("hashchange", V, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(a) {
                            b[h](a, V, !0)
                        }), /d$|^c/.test(b.readyState) ? da() : (j("load", da), b[h]("DOMContentLoaded", V), k(da, 2e4)), c.elements.length ? (U(), z._lsFlush()) : V()
                    },
                    checkElems: V,
                    unveil: aa,
                    _aLSL: ca
                }
            }(),
            E = function() {
                var a, c = A(function(a, b, c, d) {
                        var e, f, g;
                        if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || ""))
                            for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++) e[f].setAttribute("sizes", d);
                        c.detail.dataAttr || w(a, c.detail)
                    }),
                    e = function(a, b, d) {
                        var e, f = a.parentNode;
                        f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
                            width: d,
                            dataAttr: !!b
                        }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d))
                    },
                    f = function() {
                        var b, c = a.length;
                        if (c)
                            for (b = 0; b < c; b++) e(a[b])
                    },
                    g = C(f);
                return {
                    _: function() {
                        a = b.getElementsByClassName(d.autosizesClass), j("resize", g)
                    },
                    checkElems: g,
                    updateElem: e
                }
            }(),
            F = function() {
                F.i || (F.i = !0, E._(), D._())
            };
        return c = {
            cfg: d,
            autoSizer: E,
            loader: D,
            init: F,
            uP: w,
            aC: s,
            rC: t,
            hC: r,
            fire: v,
            gW: y,
            rAF: z
        }
    }
});

/*!
 * accounting.js v0.3.2, copyright 2011 Joss Crowcroft, MIT license, http://josscrowcroft.github.com/accounting.js
 */
(function(p, z) {
    function q(a) {
        return !!("" === a || a && a.charCodeAt && a.substr)
    }

    function m(a) {
        return u ? u(a) : "[object Array]" === v.call(a)
    }

    function r(a) {
        return "[object Object]" === v.call(a)
    }

    function s(a, b) {
        var d, a = a || {},
            b = b || {};
        for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]);
        return a
    }

    function j(a, b, d) {
        var c = [],
            e, h;
        if (!a) return c;
        if (w && a.map === w) return a.map(b, d);
        for (e = 0, h = a.length; e < h; e++) c[e] = b.call(d, a[e], e, a);
        return c
    }

    function n(a, b) {
        a = Math.round(Math.abs(a));
        return isNaN(a) ? b : a
    }

    function x(a) {
        var b = c.settings.currency.format;
        "function" === typeof a && (a = a());
        return q(a) && a.match("%v") ? {
            pos: a,
            neg: a.replace("-", "").replace("%v", "-%v"),
            zero: a
        } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = {
            pos: b,
            neg: b.replace("%v", "-%v"),
            zero: b
        } : a
    }
    var c = {
            version: "0.3.2",
            settings: {
                currency: {
                    symbol: "$",
                    format: "%s%v",
                    decimal: ".",
                    thousand: ",",
                    precision: 2,
                    grouping: 3
                },
                number: {
                    precision: 0,
                    grouping: 3,
                    thousand: ",",
                    decimal: "."
                }
            }
        },
        w = Array.prototype.map,
        u = Array.isArray,
        v = Object.prototype.toString,
        o = c.unformat = c.parse = function(a, b) {
            if (m(a)) return j(a, function(a) {
                return o(a, b)
            });
            a = a || 0;
            if ("number" === typeof a) return a;
            var b = b || ".",
                c = RegExp("[^0-9-" + b + "]", ["g"]),
                c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, "."));
            return !isNaN(c) ? c : 0
        },
        y = c.toFixed = function(a, b) {
            var b = n(b, c.settings.number.precision),
                d = Math.pow(10, b);
            return (Math.round(c.unformat(a) * d) / d).toFixed(b)
        },
        t = c.formatNumber = function(a, b, d, i) {
            if (m(a)) return j(a, function(a) {
                return t(a, b, d, i)
            });
            var a = o(a),
                e = s(r(b) ? b : {
                    precision: b,
                    thousand: d,
                    decimal: i
                }, c.settings.number),
                h = n(e.precision),
                f = 0 > a ? "-" : "",
                g = parseInt(y(Math.abs(a || 0), h), 10) + "",
                l = 3 < g.length ? g.length % 3 : 0;
            return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "")
        },
        A = c.formatMoney = function(a, b, d, i, e, h) {
            if (m(a)) return j(a, function(a) {
                return A(a, b, d, i, e, h)
            });
            var a = o(a),
                f = s(r(b) ? b : {
                    symbol: b,
                    precision: d,
                    thousand: i,
                    decimal: e,
                    format: h
                }, c.settings.currency),
                g = x(f.format);
            return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal))
        };
    c.formatColumn = function(a, b, d, i, e, h) {
        if (!a) return [];
        var f = s(r(b) ? b : {
                symbol: b,
                precision: d,
                thousand: i,
                decimal: e,
                format: h
            }, c.settings.currency),
            g = x(f.format),
            l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1,
            k = 0,
            a = j(a, function(a) {
                if (m(a)) return c.formatColumn(a, f);
                a = o(a);
                a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal));
                if (a.length > k) k = a.length;
                return a
            });
        return j(a, function(a) {
            return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a
        })
    };
    if ("undefined" !== typeof exports) {
        if ("undefined" !== typeof module && module.exports) exports = module.exports = c;
        exports.accounting = c
    } else "function" === typeof define && define.amd ? define([], function() {
        return c
    }) : (c.noConflict = function(a) {
        return function() {
            p.accounting = a;
            c.noConflict = z;
            return c
        }
    }(p.accounting), p.accounting = c)
})(this);

/* jquery.simple.modal.1.4.5*/
(function(b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : b(jQuery)
})(function(b) {
    var j = [],
        n = b(document),
        k = navigator.userAgent.toLowerCase(),
        l = b(window),
        g = [],
        o = null,
        p = /msie/.test(k) && !/opera/.test(k),
        q = /opera/.test(k),
        m, r;
    m = p && /msie 6./.test(k) && "object" !== typeof window.XMLHttpRequest;
    r = p && /msie 7.0/.test(k);
    b.modal = function(a, h) {
        return b.modal.impl.init(a, h)
    };
    b.modal.close = function() {
        b.modal.impl.close()
    };
    b.modal.focus = function(a) {
        b.modal.impl.focus(a)
    };
    b.modal.setContainerDimensions = function() {
        b.modal.impl.setContainerDimensions()
    };
    b.modal.setPosition = function() {
        b.modal.impl.setPosition()
    };
    b.modal.update = function(a, h) {
        b.modal.impl.update(a, h)
    };
    b.fn.modal = function(a) {
        return b.modal.impl.init(this, a)
    };
    b.modal.defaults = {
        appendTo: "body",
        focus: !0,
        opacity: 50,
        overlayId: "simplemodal-overlay",
        overlayCss: {},
        containerId: "simplemodal-container",
        containerCss: {},
        dataId: "simplemodal-data",
        dataCss: {},
        minHeight: null,
        minWidth: null,
        maxHeight: null,
        maxWidth: null,
        autoResize: !1,
        autoPosition: !0,
        zIndex: 1E3,
        close: !0,
        closeHTML: '<a class="modalCloseImg" title="Close"></a>',
        closeClass: "simplemodal-close",
        escClose: !0,
        overlayClose: !1,
        fixed: !0,
        position: null,
        persist: !1,
        modal: !0,
        onOpen: null,
        onShow: null,
        onClose: null
    };
    b.modal.impl = {
        d: {},
        init: function(a, h) {
            if (this.d.data) return !1;
            o = p && !b.support.boxModel;
            this.o = b.extend({}, b.modal.defaults, h);
            this.zIndex = this.o.zIndex;
            this.occb = !1;
            if ("object" === typeof a) {
                if (a = a instanceof b ? a : b(a), this.d.placeholder = !1, 0 < a.parent().parent().length && (a.before(b("<span></span>").attr("id", "simplemodal-placeholder").css({
                        display: "none"
                    })), this.d.placeholder = !0, this.display = a.css("display"), !this.o.persist)) this.d.orig = a.clone(!0)
            } else if ("string" === typeof a || "number" === typeof a) a = b("<div></div>").html(a);
            else return alert("SimpleModal Error: Unsupported data type: " + typeof a), this;
            this.create(a);
            this.open();
            b.isFunction(this.o.onShow) && this.o.onShow.apply(this, [this.d]);
            return this
        },
        create: function(a) {
            this.getDimensions();
            if (this.o.modal && m) this.d.iframe = b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss, {
                display: "none",
                opacity: 0,
                position: "fixed",
                height: g[0],
                width: g[1],
                zIndex: this.o.zIndex,
                top: 0,
                left: 0
            })).appendTo(this.o.appendTo);
            this.d.overlay = b("<div></div>").attr("id", this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss, {
                display: "none",
                opacity: this.o.opacity / 100,
                height: this.o.modal ? j[0] : 0,
                width: this.o.modal ? j[1] : 0,
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: this.o.zIndex + 1
            })).appendTo(this.o.appendTo);
            this.d.container = b("<div></div>").attr("id", this.o.containerId).addClass("simplemodal-container").css(b.extend({
                position: this.o.fixed ? "fixed" : "absolute"
            }, this.o.containerCss, {
                display: "none",
                zIndex: this.o.zIndex + 2
            })).append(this.o.close && this.o.closeHTML ? b(this.o.closeHTML).addClass(this.o.closeClass) : "").appendTo(this.o.appendTo);
            this.d.wrap = b("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
                height: "100%",
                outline: 0,
                width: "100%"
            }).appendTo(this.d.container);
            this.d.data = a.attr("id", a.attr("id") || this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss, {
                display: "none"
            })).appendTo("body");
            this.setContainerDimensions();
            this.d.data.appendTo(this.d.wrap);
            (m || o) && this.fixIE()
        },
        bindEvents: function() {
            var a = this;
            b("." + a.o.closeClass).bind("click.simplemodal", function(b) {
                b.preventDefault();
                a.close()
            });
            a.o.modal && a.o.close && a.o.overlayClose && a.d.overlay.bind("click.simplemodal", function(b) {
                b.preventDefault();
                a.close()
            });
            n.bind("keydown.simplemodal", function(b) {
                a.o.modal && 9 === b.keyCode ? a.watchTab(b) : a.o.close && a.o.escClose && 27 === b.keyCode && (b.preventDefault(), a.close())
            });
            l.bind("resize.simplemodal orientationchange.simplemodal", function() {
                a.getDimensions();
                a.o.autoResize ? a.setContainerDimensions() : a.o.autoPosition && a.setPosition();
                m || o ? a.fixIE() : a.o.modal && (a.d.iframe && a.d.iframe.css({
                    height: g[0],
                    width: g[1]
                }), a.d.overlay.css({
                    height: j[0],
                    width: j[1]
                }))
            })
        },
        unbindEvents: function() {
            b("." + this.o.closeClass).unbind("click.simplemodal");
            n.unbind("keydown.simplemodal");
            l.unbind(".simplemodal");
            this.d.overlay.unbind("click.simplemodal")
        },
        fixIE: function() {
            var a = this.o.position;
            b.each([this.d.iframe || null, !this.o.modal ? null : this.d.overlay, "fixed" === this.d.container.css("position") ? this.d.container : null], function(b, e) {
                if (e) {
                    var f = e[0].style;
                    f.position = "absolute";
                    if (2 > b) f.removeExpression("height"), f.removeExpression("width"), f.setExpression("height", 'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'), f.setExpression("width", 'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');
                    else {
                        var c, d;
                        a && a.constructor === Array ? (c = a[0] ? "number" === typeof a[0] ? a[0].toString() : a[0].replace(/px/, "") : e.css("top").replace(/px/, ""), c = -1 === c.indexOf("%") ? c + ' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"' : parseInt(c.replace(/%/, "")) + ' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"', a[1] && (d = "number" === typeof a[1] ? a[1].toString() : a[1].replace(/px/, ""), d = -1 === d.indexOf("%") ? d + ' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"' : parseInt(d.replace(/%/, "")) + ' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')) : (c = '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"', d = '(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');
                        f.removeExpression("top");
                        f.removeExpression("left");
                        f.setExpression("top", c);
                        f.setExpression("left", d)
                    }
                }
            })
        },
        focus: function(a) {
            var h = this,
                a = a && -1 !== b.inArray(a, ["first", "last"]) ? a : "first",
                e = b(":input:enabled:visible:" + a, h.d.wrap);
            setTimeout(function() {
                0 < e.length ? e.focus() : h.d.wrap.focus()
            }, 10)
        },
        getDimensions: function() {
            var a = "undefined" === typeof window.innerHeight ? l.height() : window.innerHeight;
            j = [n.height(), n.width()];
            g = [a, l.width()]
        },
        getVal: function(a, b) {
            return a ? "number" === typeof a ? a : "auto" === a ? 0 : 0 < a.indexOf("%") ? parseInt(a.replace(/%/, "")) / 100 * ("h" === b ? g[0] : g[1]) : parseInt(a.replace(/px/, "")) : null
        },
        update: function(a, b) {
            if (!this.d.data) return !1;
            this.d.origHeight = this.getVal(a, "h");
            this.d.origWidth = this.getVal(b, "w");
            this.d.data.hide();
            a && this.d.container.css("height", a);
            b && this.d.container.css("width", b);
            this.setContainerDimensions();
            this.d.data.show();
            this.o.focus && this.focus();
            this.unbindEvents();
            this.bindEvents()
        },
        setContainerDimensions: function() {
            var a = m || r,
                b = this.d.origHeight ? this.d.origHeight : q ? this.d.container.height() : this.getVal(a ? this.d.container[0].currentStyle.height : this.d.container.css("height"), "h"),
                a = this.d.origWidth ? this.d.origWidth : q ? this.d.container.width() : this.getVal(a ? this.d.container[0].currentStyle.width : this.d.container.css("width"), "w"),
                e = this.d.data.outerHeight(!0),
                f = this.d.data.outerWidth(!0);
            this.d.origHeight = this.d.origHeight || b;
            this.d.origWidth = this.d.origWidth || a;
            var c = this.o.maxHeight ? this.getVal(this.o.maxHeight, "h") : null,
                d = this.o.maxWidth ? this.getVal(this.o.maxWidth, "w") : null,
                c = c && c < g[0] ? c : g[0],
                d = d && d < g[1] ? d : g[1],
                i = this.o.minHeight ? this.getVal(this.o.minHeight, "h") : "auto",
                b = b ? this.o.autoResize && b > c ? c : b < i ? i : b : e ? e > c ? c : this.o.minHeight && "auto" !== i && e < i ? i : e : i,
                c = this.o.minWidth ? this.getVal(this.o.minWidth, "w") : "auto",
                a = a ? this.o.autoResize && a > d ? d : a < c ? c : a : f ? f > d ? d : this.o.minWidth && "auto" !== c && f < c ? c : f : c;
            this.d.container.css({
                height: b,
                width: a
            });
            this.d.wrap.css({
                overflow: e > b || f > a ? "auto" : "visible"
            });
            this.o.autoPosition && this.setPosition()
        },
        setPosition: function() {
            var a, b;
            a = g[0] / 2 - this.d.container.outerHeight(!0) / 2;
            b = g[1] / 2 - this.d.container.outerWidth(!0) / 2;
            var e = "fixed" !== this.d.container.css("position") ? l.scrollTop() : 0;
            this.o.position && "[object Array]" === Object.prototype.toString.call(this.o.position) ? (a = e + (this.o.position[0] || a), b = this.o.position[1] || b) : a = e + a;
            this.d.container.css({
                left: b,
                top: a
            })
        },
        watchTab: function(a) {
            if (0 < b(a.target).parents(".simplemodal-container").length) {
                if (this.inputs = b(":input:enabled:visible:first, :input:enabled:visible:last", this.d.data[0]), !a.shiftKey && a.target === this.inputs[this.inputs.length - 1] || a.shiftKey && a.target === this.inputs[0] || 0 === this.inputs.length) a.preventDefault(), this.focus(a.shiftKey ? "last" : "first")
            } else a.preventDefault(), this.focus()
        },
        open: function() {
            this.d.iframe && this.d.iframe.show();
            b.isFunction(this.o.onOpen) ? this.o.onOpen.apply(this, [this.d]) : (this.d.overlay.show(), this.d.container.show(), this.d.data.show());
            this.o.focus && this.focus();
            this.bindEvents()
        },
        close: function() {
            if (!this.d.data) return !1;
            this.unbindEvents();
            if (b.isFunction(this.o.onClose) && !this.occb) this.occb = !0, this.o.onClose.apply(this, [this.d]);
            else {
                if (this.d.placeholder) {
                    var a = b("#simplemodal-placeholder");
                    this.o.persist ? a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display", this.display)) : (this.d.data.hide().remove(), a.replaceWith(this.d.orig))
                } else this.d.data.hide().remove();
                this.d.container.hide().remove();
                this.d.overlay.hide();
                this.d.iframe && this.d.iframe.hide().remove();
                this.d.overlay.remove();
                this.d = {}
            }
        }
    }
})

/* jQuery FlexSlider v2.2.2 */
! function(a) {
    a.flexslider = function(b, c) {
        var d = a(b);
        d.vars = a.extend({}, a.flexslider.defaults, c);
        var j, e = d.vars.namespace,
            f = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            g = ("ontouchstart" in window || f || window.DocumentTouch && document instanceof DocumentTouch) && d.vars.touch,
            h = "click touchend MSPointerUp",
            i = "",
            k = "vertical" === d.vars.direction,
            l = d.vars.reverse,
            m = d.vars.itemWidth > 0,
            n = "fade" === d.vars.animation,
            o = "" !== d.vars.asNavFor,
            p = {},
            q = !0;
        a.data(b, "flexslider", d), p = {
            init: function() {
                d.animating = !1, d.currentSlide = parseInt(d.vars.startAt ? d.vars.startAt : 0, 10), isNaN(d.currentSlide) && (d.currentSlide = 0), d.animatingTo = d.currentSlide, d.atEnd = 0 === d.currentSlide || d.currentSlide === d.last, d.containerSelector = d.vars.selector.substr(0, d.vars.selector.search(" ")), d.slides = a(d.vars.selector, d), d.container = a(d.containerSelector, d), d.count = d.slides.length, d.syncExists = a(d.vars.sync).length > 0, "slide" === d.vars.animation && (d.vars.animation = "swing"), d.prop = k ? "top" : "marginLeft", d.args = {}, d.manualPause = !1, d.stopped = !1, d.started = !1, d.startTimeout = null, d.transitions = !d.vars.video && !n && d.vars.useCSS && function() {
                    var a = document.createElement("div"),
                        b = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var c in b)
                        if (void 0 !== a.style[b[c]]) return d.pfx = b[c].replace("Perspective", "").toLowerCase(), d.prop = "-" + d.pfx + "-transform", !0;
                    return !1
                }(), d.ensureAnimationEnd = "", "" !== d.vars.controlsContainer && (d.controlsContainer = a(d.vars.controlsContainer).length > 0 && a(d.vars.controlsContainer)), "" !== d.vars.manualControls && (d.manualControls = a(d.vars.manualControls).length > 0 && a(d.vars.manualControls)), d.vars.randomize && (d.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), d.container.empty().append(d.slides)), d.doMath(), d.setup("init"), d.vars.controlNav && p.controlNav.setup(), d.vars.directionNav && p.directionNav.setup(), d.vars.keyboard && (1 === a(d.containerSelector).length || d.vars.multipleKeyboard) && a(document).bind("keyup", function(a) {
                    var b = a.keyCode;
                    if (!d.animating && (39 === b || 37 === b)) {
                        var c = 39 === b ? d.getTarget("next") : 37 === b ? d.getTarget("prev") : !1;
                        d.flexAnimate(c, d.vars.pauseOnAction)
                    }
                }), d.vars.mousewheel && d.bind("mousewheel", function(a, b) {
                    a.preventDefault();
                    var f = 0 > b ? d.getTarget("next") : d.getTarget("prev");
                    d.flexAnimate(f, d.vars.pauseOnAction)
                }), d.vars.pausePlay && p.pausePlay.setup(), d.vars.slideshow && d.vars.pauseInvisible && p.pauseInvisible.init(), d.vars.slideshow && (d.vars.pauseOnHover && d.hover(function() {
                    d.manualPlay || d.manualPause || d.pause()
                }, function() {
                    d.manualPause || d.manualPlay || d.stopped || d.play()
                }), d.vars.pauseInvisible && p.pauseInvisible.isHidden() || (d.vars.initDelay > 0 ? d.startTimeout = setTimeout(d.play, d.vars.initDelay) : d.play())), o && p.asNav.setup(), g && d.vars.touch && p.touch(), (!n || n && d.vars.smoothHeight) && a(window).bind("resize orientationchange focus", p.resize), d.find("img").attr("draggable", "false"), setTimeout(function() {
                    d.vars.start(d)
                }, 200)
            },
            asNav: {
                setup: function() {
                    d.asNav = !0, d.animatingTo = Math.floor(d.currentSlide / d.move), d.currentItem = d.currentSlide, d.slides.removeClass(e + "active-slide").eq(d.currentItem).addClass(e + "active-slide"), f ? (b._slider = d, d.slides.each(function() {
                        var b = this;
                        b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", function(a) {
                            a.preventDefault(), a.currentTarget._gesture && a.currentTarget._gesture.addPointer(a.pointerId)
                        }, !1), b.addEventListener("MSGestureTap", function(b) {
                            b.preventDefault();
                            var c = a(this),
                                e = c.index();
                            a(d.vars.asNavFor).data("flexslider").animating || c.hasClass("active") || (d.direction = d.currentItem < e ? "next" : "prev", d.flexAnimate(e, d.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : d.slides.on(h, function(b) {
                        b.preventDefault();
                        var c = a(this),
                            f = c.index(),
                            g = c.offset().left - a(d).scrollLeft();
                        0 >= g && c.hasClass(e + "active-slide") ? d.flexAnimate(d.getTarget("prev"), !0) : a(d.vars.asNavFor).data("flexslider").animating || c.hasClass(e + "active-slide") || (d.direction = d.currentItem < f ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    d.manualControls ? p.controlNav.setupManual() : p.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var f, g, b = "thumbnails" === d.vars.controlNav ? "control-thumbs" : "control-paging",
                        c = 1;
                    if (d.controlNavScaffold = a('<ol class="' + e + "control-nav " + e + b + '"></ol>'), d.pagingCount > 1)
                        for (var j = 0; j < d.pagingCount; j++) {
                            if (g = d.slides.eq(j), f = "thumbnails" === d.vars.controlNav ? '<img src="' + g.attr("data-thumb") + '"/>' : "<a>" + c + "</a>", "thumbnails" === d.vars.controlNav && !0 === d.vars.thumbCaptions) {
                                var k = g.attr("data-thumbcaption");
                                "" != k && void 0 != k && (f += '<span class="' + e + 'caption">' + k + "</span>")
                            }
                            d.controlNavScaffold.append("<li>" + f + "</li>"), c++
                        }
                    d.controlsContainer ? a(d.controlsContainer).append(d.controlNavScaffold) : d.append(d.controlNavScaffold), p.controlNav.set(), p.controlNav.active(), d.controlNavScaffold.delegate("a, img", h, function(b) {
                        if (b.preventDefault(), "" === i || i === b.type) {
                            var c = a(this),
                                f = d.controlNav.index(c);
                            c.hasClass(e + "active") || (d.direction = f > d.currentSlide ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction))
                        }
                        "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    d.controlNav = d.manualControls, p.controlNav.active(), d.controlNav.bind(h, function(b) {
                        if (b.preventDefault(), "" === i || i === b.type) {
                            var c = a(this),
                                f = d.controlNav.index(c);
                            c.hasClass(e + "active") || (d.direction = f > d.currentSlide ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction))
                        }
                        "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var b = "thumbnails" === d.vars.controlNav ? "img" : "a";
                    d.controlNav = a("." + e + "control-nav li " + b, d.controlsContainer ? d.controlsContainer : d)
                },
                active: function() {
                    d.controlNav.removeClass(e + "active").eq(d.animatingTo).addClass(e + "active")
                },
                update: function(b, c) {
                    d.pagingCount > 1 && "add" === b ? d.controlNavScaffold.append(a("<li><a>" + d.count + "</a></li>")) : 1 === d.pagingCount ? d.controlNavScaffold.find("li").remove() : d.controlNav.eq(c).closest("li").remove(), p.controlNav.set(), d.pagingCount > 1 && d.pagingCount !== d.controlNav.length ? d.update(c, b) : p.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var b = a('<ul class="' + e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + d.vars.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + d.vars.nextText + "</a></li></ul>");
                    d.controlsContainer ? (a(d.controlsContainer).append(b), d.directionNav = a("." + e + "direction-nav li a", d.controlsContainer)) : (d.append(b), d.directionNav = a("." + e + "direction-nav li a", d)), p.directionNav.update(), d.directionNav.bind(h, function(b) {
                        b.preventDefault();
                        var c;
                        ("" === i || i === b.type) && (c = a(this).hasClass(e + "next") ? d.getTarget("next") : d.getTarget("prev"), d.flexAnimate(c, d.vars.pauseOnAction)), "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var a = e + "disabled";
                    1 === d.pagingCount ? d.directionNav.addClass(a).attr("tabindex", "-1") : d.vars.animationLoop ? d.directionNav.removeClass(a).removeAttr("tabindex") : 0 === d.animatingTo ? d.directionNav.removeClass(a).filter("." + e + "prev").addClass(a).attr("tabindex", "-1") : d.animatingTo === d.last ? d.directionNav.removeClass(a).filter("." + e + "next").addClass(a).attr("tabindex", "-1") : d.directionNav.removeClass(a).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var b = a('<div class="' + e + 'pauseplay"><a></a></div>');
                    d.controlsContainer ? (d.controlsContainer.append(b), d.pausePlay = a("." + e + "pauseplay a", d.controlsContainer)) : (d.append(b), d.pausePlay = a("." + e + "pauseplay a", d)), p.pausePlay.update(d.vars.slideshow ? e + "pause" : e + "play"), d.pausePlay.bind(h, function(b) {
                        b.preventDefault(), ("" === i || i === b.type) && (a(this).hasClass(e + "pause") ? (d.manualPause = !0, d.manualPlay = !1, d.pause()) : (d.manualPause = !1, d.manualPlay = !0, d.play())), "" === i && (i = b.type), p.setToClearWatchedEvent()
                    })
                },
                update: function(a) {
                    "play" === a ? d.pausePlay.removeClass(e + "pause").addClass(e + "play").html(d.vars.playText) : d.pausePlay.removeClass(e + "play").addClass(e + "pause").html(d.vars.pauseText)
                }
            },
            touch: function() {
                function r(f) {
                    d.animating ? f.preventDefault() : (window.navigator.msPointerEnabled || 1 === f.touches.length) && (d.pause(), g = k ? d.h : d.w, i = Number(new Date), o = f.touches[0].pageX, p = f.touches[0].pageY, e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g, a = k ? p : o, c = k ? o : p, b.addEventListener("touchmove", s, !1), b.addEventListener("touchend", t, !1))
                }

                function s(b) {
                    o = b.touches[0].pageX, p = b.touches[0].pageY, h = k ? a - p : a - o, j = k ? Math.abs(h) < Math.abs(o - c) : Math.abs(h) < Math.abs(p - c);
                    var f = 500;
                    (!j || Number(new Date) - i > f) && (b.preventDefault(), !n && d.transitions && (d.vars.animationLoop || (h /= 0 === d.currentSlide && 0 > h || d.currentSlide === d.last && h > 0 ? Math.abs(h) / g + 2 : 1), d.setProps(e + h, "setTouch")))
                }

                function t() {
                    if (b.removeEventListener("touchmove", s, !1), d.animatingTo === d.currentSlide && !j && null !== h) {
                        var k = l ? -h : h,
                            m = k > 0 ? d.getTarget("next") : d.getTarget("prev");
                        d.canAdvance(m) && (Number(new Date) - i < 550 && Math.abs(k) > 50 || Math.abs(k) > g / 2) ? d.flexAnimate(m, d.vars.pauseOnAction) : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0)
                    }
                    b.removeEventListener("touchend", t, !1), a = null, c = null, h = null, e = null
                }

                function u(a) {
                    a.stopPropagation(), d.animating ? a.preventDefault() : (d.pause(), b._gesture.addPointer(a.pointerId), q = 0, g = k ? d.h : d.w, i = Number(new Date), e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g)
                }

                function v(a) {
                    a.stopPropagation();
                    var c = a.target._slider;
                    if (c) {
                        var d = -a.translationX,
                            f = -a.translationY;
                        return q += k ? f : d, h = q, j = k ? Math.abs(q) < Math.abs(-d) : Math.abs(q) < Math.abs(-f), a.detail === a.MSGESTURE_FLAG_INERTIA ? (setImmediate(function() {
                            b._gesture.stop()
                        }), void 0) : ((!j || Number(new Date) - i > 500) && (a.preventDefault(), !n && c.transitions && (c.vars.animationLoop || (h = q / (0 === c.currentSlide && 0 > q || c.currentSlide === c.last && q > 0 ? Math.abs(q) / g + 2 : 1)), c.setProps(e + h, "setTouch"))), void 0)
                    }
                }

                function w(b) {
                    b.stopPropagation();
                    var d = b.target._slider;
                    if (d) {
                        if (d.animatingTo === d.currentSlide && !j && null !== h) {
                            var f = l ? -h : h,
                                k = f > 0 ? d.getTarget("next") : d.getTarget("prev");
                            d.canAdvance(k) && (Number(new Date) - i < 550 && Math.abs(f) > 50 || Math.abs(f) > g / 2) ? d.flexAnimate(k, d.vars.pauseOnAction) : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0)
                        }
                        a = null, c = null, h = null, e = null, q = 0
                    }
                }
                var a, c, e, g, h, i, j = !1,
                    o = 0,
                    p = 0,
                    q = 0;
                f ? (b.style.msTouchAction = "none", b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", u, !1), b._slider = d, b.addEventListener("MSGestureChange", v, !1), b.addEventListener("MSGestureEnd", w, !1)) : b.addEventListener("touchstart", r, !1)
            },
            resize: function() {
                !d.animating && d.is(":visible") && (m || d.doMath(), n ? p.smoothHeight() : m ? (d.slides.width(d.computedW), d.update(d.pagingCount), d.setProps()) : k ? (d.viewport.height(d.h), d.setProps(d.h, "setTotal")) : (d.vars.smoothHeight && p.smoothHeight(), d.newSlides.width(d.computedW), d.setProps(d.computedW, "setTotal")))
            },
            smoothHeight: function(a) {
                if (!k || n) {
                    var b = n ? d : d.viewport;
                    a ? b.animate({
                        height: d.slides.eq(d.animatingTo).height()
                    }, a) : b.height(d.slides.eq(d.animatingTo).height())
                }
            },
            sync: function(b) {
                var c = a(d.vars.sync).data("flexslider"),
                    e = d.animatingTo;
                switch (b) {
                    case "animate":
                        c.flexAnimate(e, d.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        c.playing || c.asNav || c.play();
                        break;
                    case "pause":
                        c.pause()
                }
            },
            uniqueID: function(b) {
                return b.find("[id]").each(function() {
                    var b = a(this);
                    b.attr("id", b.attr("id") + "_clone")
                }), b
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var a = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var b = 0; b < a.length; b++) a[b] + "Hidden" in document && (p.pauseInvisible.visProp = a[b] + "Hidden");
                    if (p.pauseInvisible.visProp) {
                        var c = p.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(c, function() {
                            p.pauseInvisible.isHidden() ? d.startTimeout ? clearTimeout(d.startTimeout) : d.pause() : d.started ? d.play() : d.vars.initDelay > 0 ? setTimeout(d.play, d.vars.initDelay) : d.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[p.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(j), j = setTimeout(function() {
                    i = ""
                }, 3e3)
            }
        }, d.flexAnimate = function(b, c, f, h, i) {
            if (d.vars.animationLoop || b === d.currentSlide || (d.direction = b > d.currentSlide ? "next" : "prev"), o && 1 === d.pagingCount && (d.direction = d.currentItem < b ? "next" : "prev"), !d.animating && (d.canAdvance(b, i) || f) && d.is(":visible")) {
                if (o && h) {
                    var j = a(d.vars.asNavFor).data("flexslider");
                    if (d.atEnd = 0 === b || b === d.count - 1, j.flexAnimate(b, !0, !1, !0, i), d.direction = d.currentItem < b ? "next" : "prev", j.direction = d.direction, Math.ceil((b + 1) / d.visible) - 1 === d.currentSlide || 0 === b) return d.currentItem = b, d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), !1;
                    d.currentItem = b, d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), b = Math.floor(b / d.visible)
                }
                if (d.animating = !0, d.animatingTo = b, c && d.pause(), d.vars.before(d), d.syncExists && !i && p.sync("animate"), d.vars.controlNav && p.controlNav.active(), m || d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), d.atEnd = 0 === b || b === d.last, d.vars.directionNav && p.directionNav.update(), b === d.last && (d.vars.end(d), d.vars.animationLoop || d.pause()), n) g ? (d.slides.eq(d.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), d.slides.eq(b).css({
                    opacity: 1,
                    zIndex: 2
                }), d.wrapup(q)) : (d.slides.eq(d.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, d.vars.animationSpeed, d.vars.easing), d.slides.eq(b).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, d.vars.animationSpeed, d.vars.easing, d.wrapup));
                else {
                    var r, s, t, q = k ? d.slides.filter(":first").height() : d.computedW;
                    m ? (r = d.vars.itemMargin, t = (d.itemW + r) * d.move * d.animatingTo, s = t > d.limit && 1 !== d.visible ? d.limit : t) : s = 0 === d.currentSlide && b === d.count - 1 && d.vars.animationLoop && "next" !== d.direction ? l ? (d.count + d.cloneOffset) * q : 0 : d.currentSlide === d.last && 0 === b && d.vars.animationLoop && "prev" !== d.direction ? l ? 0 : (d.count + 1) * q : l ? (d.count - 1 - b + d.cloneOffset) * q : (b + d.cloneOffset) * q, d.setProps(s, "", d.vars.animationSpeed), d.transitions ? (d.vars.animationLoop && d.atEnd || (d.animating = !1, d.currentSlide = d.animatingTo), d.container.unbind("webkitTransitionEnd transitionend"), d.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(d.ensureAnimationEnd), d.wrapup(q)
                    }), clearTimeout(d.ensureAnimationEnd), d.ensureAnimationEnd = setTimeout(function() {
                        d.wrapup(q)
                    }, d.vars.animationSpeed + 100)) : d.container.animate(d.args, d.vars.animationSpeed, d.vars.easing, function() {
                        d.wrapup(q)
                    })
                }
                d.vars.smoothHeight && p.smoothHeight(d.vars.animationSpeed)
            }
        }, d.wrapup = function(a) {
            n || m || (0 === d.currentSlide && d.animatingTo === d.last && d.vars.animationLoop ? d.setProps(a, "jumpEnd") : d.currentSlide === d.last && 0 === d.animatingTo && d.vars.animationLoop && d.setProps(a, "jumpStart")), d.animating = !1, d.currentSlide = d.animatingTo, d.vars.after(d)
        }, d.animateSlides = function() {
            !d.animating && q && d.flexAnimate(d.getTarget("next"))
        }, d.pause = function() {
            clearInterval(d.animatedSlides), d.animatedSlides = null, d.playing = !1, d.vars.pausePlay && p.pausePlay.update("play"), d.syncExists && p.sync("pause")
        }, d.play = function() {
            d.playing && clearInterval(d.animatedSlides), d.animatedSlides = d.animatedSlides || setInterval(d.animateSlides, d.vars.slideshowSpeed), d.started = d.playing = !0, d.vars.pausePlay && p.pausePlay.update("pause"), d.syncExists && p.sync("play")
        }, d.stop = function() {
            d.pause(), d.stopped = !0
        }, d.canAdvance = function(a, b) {
            var c = o ? d.pagingCount - 1 : d.last;
            return b ? !0 : o && d.currentItem === d.count - 1 && 0 === a && "prev" === d.direction ? !0 : o && 0 === d.currentItem && a === d.pagingCount - 1 && "next" !== d.direction ? !1 : a !== d.currentSlide || o ? d.vars.animationLoop ? !0 : d.atEnd && 0 === d.currentSlide && a === c && "next" !== d.direction ? !1 : d.atEnd && d.currentSlide === c && 0 === a && "next" === d.direction ? !1 : !0 : !1
        }, d.getTarget = function(a) {
            return d.direction = a, "next" === a ? d.currentSlide === d.last ? 0 : d.currentSlide + 1 : 0 === d.currentSlide ? d.last : d.currentSlide - 1
        }, d.setProps = function(a, b, c) {
            var e = function() {
                var c = a ? a : (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo,
                    e = function() {
                        if (m) return "setTouch" === b ? a : l && d.animatingTo === d.last ? 0 : l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : d.animatingTo === d.last ? d.limit : c;
                        switch (b) {
                            case "setTotal":
                                return l ? (d.count - 1 - d.currentSlide + d.cloneOffset) * a : (d.currentSlide + d.cloneOffset) * a;
                            case "setTouch":
                                return l ? a : a;
                            case "jumpEnd":
                                return l ? a : d.count * a;
                            case "jumpStart":
                                return l ? d.count * a : a;
                            default:
                                return a
                        }
                    }();
                return -1 * e + "px"
            }();
            d.transitions && (e = k ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", c = void 0 !== c ? c / 1e3 + "s" : "0s", d.container.css("-" + d.pfx + "-transition-duration", c), d.container.css("transition-duration", c)), d.args[d.prop] = e, (d.transitions || void 0 === c) && d.container.css(d.args), d.container.css("transform", e)
        }, d.setup = function(b) {
            if (n) d.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === b && (g ? d.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + d.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(d.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : d.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(d.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, d.vars.animationSpeed, d.vars.easing)), d.vars.smoothHeight && p.smoothHeight();
            else {
                var c, f;
                "init" === b && (d.viewport = a('<div class="' + e + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(d).append(d.container), d.cloneCount = 0, d.cloneOffset = 0, l && (f = a.makeArray(d.slides).reverse(), d.slides = a(f), d.container.empty().append(d.slides))), d.vars.animationLoop && !m && (d.cloneCount = 2, d.cloneOffset = 1, "init" !== b && d.container.find(".clone").remove(), p.uniqueID(d.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(d.container), p.uniqueID(d.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(d.container)), d.newSlides = a(d.vars.selector, d), c = l ? d.count - 1 - d.currentSlide + d.cloneOffset : d.currentSlide + d.cloneOffset, k && !m ? (d.container.height(200 * (d.count + d.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    d.newSlides.css({
                        display: "block"
                    }), d.doMath(), d.viewport.height(d.h), d.setProps(c * d.h, "init")
                }, "init" === b ? 100 : 0)) : (d.container.width(200 * (d.count + d.cloneCount) + "%"), d.setProps(c * d.computedW, "init"), setTimeout(function() {
                    d.doMath(), d.newSlides.css({
                        width: d.computedW,
                        "float": "left",
                        display: "block"
                    }), d.vars.smoothHeight && p.smoothHeight()
                }, "init" === b ? 100 : 0))
            }
            m || d.slides.removeClass(e + "active-slide").eq(d.currentSlide).addClass(e + "active-slide"), d.vars.init(d)
        }, d.doMath = function() {
            var a = d.slides.first(),
                b = d.vars.itemMargin,
                c = d.vars.minItems,
                e = d.vars.maxItems;
            d.w = void 0 === d.viewport ? d.width() : d.viewport.width(), d.h = a.height(), d.boxPadding = a.outerWidth() - a.width(), m ? (d.itemT = d.vars.itemWidth + b, d.minW = c ? c * d.itemT : d.w, d.maxW = e ? e * d.itemT - b : d.w, d.itemW = d.minW > d.w ? (d.w - b * (c - 1)) / c : d.maxW < d.w ? (d.w - b * (e - 1)) / e : d.vars.itemWidth > d.w ? d.w : d.vars.itemWidth, d.visible = Math.floor(d.w / d.itemW), d.move = d.vars.move > 0 && d.vars.move < d.visible ? d.vars.move : d.visible, d.pagingCount = Math.ceil((d.count - d.visible) / d.move + 1), d.last = d.pagingCount - 1, d.limit = 1 === d.pagingCount ? 0 : d.vars.itemWidth > d.w ? d.itemW * (d.count - 1) + b * (d.count - 1) : (d.itemW + b) * d.count - d.w - b) : (d.itemW = d.w, d.pagingCount = d.count, d.last = d.count - 1), d.computedW = d.itemW - d.boxPadding
        }, d.update = function(a, b) {
            d.doMath(), m || (a < d.currentSlide ? d.currentSlide += 1 : a <= d.currentSlide && 0 !== a && (d.currentSlide -= 1), d.animatingTo = d.currentSlide), d.vars.controlNav && !d.manualControls && ("add" === b && !m || d.pagingCount > d.controlNav.length ? p.controlNav.update("add") : ("remove" === b && !m || d.pagingCount < d.controlNav.length) && (m && d.currentSlide > d.last && (d.currentSlide -= 1, d.animatingTo -= 1), p.controlNav.update("remove", d.last))), d.vars.directionNav && p.directionNav.update()
        }, d.addSlide = function(b, c) {
            var e = a(b);
            d.count += 1, d.last = d.count - 1, k && l ? void 0 !== c ? d.slides.eq(d.count - c).after(e) : d.container.prepend(e) : void 0 !== c ? d.slides.eq(c).before(e) : d.container.append(e), d.update(c, "add"), d.slides = a(d.vars.selector + ":not(.clone)", d), d.setup(), d.vars.added(d)
        }, d.removeSlide = function(b) {
            var c = isNaN(b) ? d.slides.index(a(b)) : b;
            d.count -= 1, d.last = d.count - 1, isNaN(b) ? a(b, d.slides).remove() : k && l ? d.slides.eq(d.last).remove() : d.slides.eq(b).remove(), d.doMath(), d.update(c, "remove"), d.slides = a(d.vars.selector + ":not(.clone)", d), d.setup(), d.vars.removed(d)
        }, p.init()
    }, a(window).blur(function() {
        focused = !1
    }).focus(function() {
        focused = !0
    }), a.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, a.fn.flexslider = function(b) {
        if (void 0 === b && (b = {}), "object" == typeof b) return this.each(function() {
            var c = a(this),
                d = b.selector ? b.selector : ".slides > li",
                e = c.find(d);
            1 === e.length && b.allowOneSlide === !0 || 0 === e.length ? (e.fadeIn(400), b.start && b.start(c)) : void 0 === c.data("flexslider") && new a.flexslider(this, b)
        });
        var c = a(this).data("flexslider");
        switch (b) {
            case "play":
                c.play();
                break;
            case "pause":
                c.pause();
                break;
            case "stop":
                c.stop();
                break;
            case "next":
                c.flexAnimate(c.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                c.flexAnimate(c.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof b && c.flexAnimate(b, !0)
        }
    }
}(jQuery);

/* Details Ajax 2.4.5i */
var frm_post = "form_post_basket";
var stock_info_ClientID = "ui_stock_qty";
var price_exvat_ClientID = "ui_price_ex_tax";
var price_incvat_ClientID = "ui_price_inc_tax";
var img_clientID = "ui_main_image";
var disable_checkout = false;

var blocked_err_msg = '';

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

//window.onload = function () { ValidateDetailsPage(); };

function ValidateDetailsPage() {

    if (g_fws_products === 4) return ValidateDetailsPagev2();

    if (arr_options === null || arr_choices === null) {
        return false;
    }

    var price_w_options_net = parseFloat(base_product_price, 10);
    var price_w_options_vat = parseFloat(base_product_price_inc_vat, 10);

    var choice_string_lookup = ':';
    var choice_lookup_img = ':';

    var all_required_options_selected = true;

    for (var x = 0; x < arr_options.length; x++) {

        var optIdx = x + 1;

        //Is this choice required?
        var opt_choice_required = arr_options[x][3];

        //is this option stock controlled?
        var opt_stock_controlled = arr_options[x][4];

        //has this option images?
        var opt_has_images = arr_options[x][5];

        //try for a radio button first
        var sel = jQuery("input[name='option" + optIdx + "']:checked").val();

        //alert('opt_choice_required=' + opt_choice_required);

        //if sel is empty then it may be a standard select
        if (sel === '' || sel === undefined) {
            //sel = jQuery('#option' + optIdx).val();
            sel = jQuery('#option' + optIdx).find(":selected").val();
        }

        //If we hit a non-selection then skip past it?
        if (sel === '-1') {
            //alert('non selection detected - reverting to defaults..');

            // Dont type check - sometimes its a string / number
            if (opt_choice_required == 1) {
                disable_checkout = true;
                all_required_options_selected = false; //we need to track that the user needs yet to select more choices...
            }

            continue;
        }

        //alert('disable_checkout=' + disable_checkout);

        //construct stock lookup string
        if (opt_stock_controlled == 1) {
            choice_string_lookup += sel + ':';
        }

        //construct image lookup string
        if (opt_has_images == 1) {
            choice_lookup_img += sel + ':';
        }

        //add the associated cost..
        for (var z = 0; z < arr_choices.length; z++) {

            if (arr_choices[z][1] === sel) {
                price_w_options_net += parseFloat(arr_choices[z][2], 10);
                price_w_options_vat += parseFloat(arr_choices[z][3], 10);
                break;
            }
        }

    } //end of options for lookup

    //Force forward looking list
    choice_string_lookup = ForceOrder(choice_string_lookup);
    choice_lookup_img = ForceOrder(choice_lookup_img);

    //alert('choice_string_lookup=' + choice_string_lookup);

    if (choice_string_lookup === ':') {

        //obviously not stock tracked.. just set the data as normal..
        if (base_product_stock <= 0 && store_stock_option > 0)
            disable_checkout = true;
        else
            disable_checkout = false;

        //alert('all_required_options_selected=' + all_required_options_selected + ' disable_checkout=' + disable_checkout);

        if (!all_required_options_selected)
            disable_checkout = true;

        SetPageDetails(base_product_stock, price_w_options_net, price_w_options_vat, GetProductImage(choice_lookup_img), disable_checkout, all_required_options_selected);

    } else {

        if (!choice_string_lookup.endsWith(":"))
            choice_string_lookup = choice_string_lookup + ':';

        if (arr_stock_matrix.length > 0) {

            var found = false;

            for (var y = 0; y < arr_stock_matrix.length; y++) {


                if (arr_stock_matrix[y][0] === choice_string_lookup) {

                    found = true;

                    var img = GetProductImage(choice_lookup_img);
                    var stock = parseInt(arr_stock_matrix[y][1]);

                    //alert('stock=' + stock + 'store_stock_option=' + store_stock_option);

                    if (stock <= 0 && store_stock_option > 0)
                        disable_checkout = true;
                    else
                        disable_checkout = false;


                    if (!all_required_options_selected)
                        disable_checkout = true;

                    SetPageDetails(stock, price_w_options_net, price_w_options_vat, img, disable_checkout, all_required_options_selected);

                    if (found)
                        break;
                }
            }

            if (!found) {
                SetPageDetails(base_product_stock, price_w_options_net, price_w_options_vat, GetProductImage(choice_lookup_img), disable_checkout, all_required_options_selected);
            }

        } else {
            SetPageDetails(base_product_stock, price_w_options_net, price_w_options_vat, GetProductImage(choice_lookup_img), disable_checkout, all_required_options_selected);
        }
    }

    return disable_checkout;
}

function ForceOrder(input) {
    var ArrayData = jQuery.map(input.split(':'), Number);
    //alert('Before sort: ArrayData=' + ArrayData);

    ArrayData.sort(function(a, b) {
        return a - b
    })
    //alert('After sort: ArrayData=' + ArrayData);

    var output = ":";

    for (var i = 0; i < ArrayData.length; i++) {

        if (ArrayData[i] === 0)
            continue;

        output += "" + ArrayData[i] + ":";
    }

    //alert('returning =' + output);

    return output;
}

function SetPageDetails(s_stock, s_price_ex_vat, s_price_inc_vat, s_img, disabled_state, all_opt_selected) {
    //reset error message
    blocked_err_msg = '';

    try {
        base_product_stock = s_stock; //update the base stock as per new options
        var lbl = document.getElementById(stock_info_ClientID);
        lbl.innerHTML = s_stock;
    } catch (e) {
        //
    }

    try {
        lbl = document.getElementById(price_exvat_ClientID);
        lbl.innerHTML = accounting.formatMoney(s_price_ex_vat, currency_options);

        if (currency_options.symbol === "kr")
            lbl.innerHTML = lbl.innerHTML.replace(",00 kr", " kr");

        if (store_taxed === 1) {
            lbl.innerHTML += "  <span>" + str_token_ex_tax + "</span>";
        }
    } catch (e) {
        //
    }

    try {
        lbl = document.getElementById(price_incvat_ClientID);
        lbl.innerHTML = accounting.formatMoney(s_price_inc_vat, currency_options);

        if (currency_options.symbol === "kr")
            lbl.innerHTML = lbl.innerHTML.replace(",00 kr", " kr");

        if (store_taxed === 1 && prices_inc_tax === 0) {
            lbl.innerHTML += "  <span>" + str_token_inc_tax + "</span>";
        }

        //PayPal Message Container
        $('.paypal-paylater-div').attr('data-pp-amount', s_price_inc_vat);

    } catch (e) {
        //
    }

    try {
        var obj = document.getElementById(img_clientID);

        if (s_img == null || s_img == "") {
            s_img = new Object();
            s_img.small = '';
            s_img.large = '';
        }

        if (s_img.small == "undefined" || s_img.small == '') {
            s_img.small = base_product_img;
        }

        if (s_img.large == "undefined" || s_img.large == '') {
            s_img.large = base_product_img_full;
        }

        obj.src = s_img.small;
    } catch (e) {
        //
    }

    try {
        obj = document.getElementById(frm_post);

        if (all_opt_selected == 0) {
            obj.setAttribute("onsubmit", "alert(str_select_all_options);return false;");
            blocked_err_msg = str_select_all_options;
        } else if (prod_active_flg == 0) {
            obj.setAttribute("onsubmit", "alert(str_product_unavailable);return false;");
            blocked_err_msg = str_product_unavailable;
        } else if (disabled_state) {
            obj.setAttribute("onsubmit", "alert(str_product_nostock);return false;");
            blocked_err_msg = str_product_nostock;
        } else
            obj.setAttribute("onsubmit", "return true;");
    } catch (e) {
        //
    }


    //Disable any options that are out of stock
    if (g_fws_stockctrl > 0) {

        if (g_fws_products === 4) {
            var prefix = "";
            var stockGroupCount = 0;

            for (var y = 0; y < prod_option_count; y++) {

                var optIdx = y + 1;
                var opt = jQuery('#option' + optIdx);
                var opt_stock_controlled = jQuery('#option' + optIdx).attr('data-stock');

                if (opt_stock_controlled == 1) {

                    if (stockGroupCount > 0) {
                        prefix += jQuery('#option' + y).find(":selected").val() + ";#";
                    }

                    stockGroupCount += 1;

                    prefix += opt.attr('data-nom') + ":";

                    //var choice_count = opt.attr('data-choices');

                    for (var z = 0; z < jQuery("#option" + optIdx + " > option").length; z++) {
                        var choice_value = jQuery("#option" + optIdx + " > option")[z].value;

                        if (choice_value == "-1")
                            continue;

                        var stock_count = 0;
                        var variant = GetVariantDetails(prefix + choice_value + ";");
                        stock_count = variant.stock;

                        if (stock_count > 0) {
                            jQuery('#option' + (y + 1) + ' option').eq(z).removeAttr('disabled');

                            if (variant.complete == false)
                                variant.label = "";

                            if (g_fws_stocklvls === 1)
                                jQuery('#option' + (y + 1) + ' option').eq(z).text(decodeURIComponent(choice_value) + ' ' + decodeURIComponent(variant.label) + " (" + stock_count + ")");
                            else
                                jQuery('#option' + (y + 1) + ' option').eq(z).text(decodeURIComponent(choice_value) + ' ' + decodeURIComponent(variant.label));
                        } else {
                            jQuery('#option' + (y + 1) + ' option').eq(z).attr('disabled', 'disabled');
                            jQuery('#option' + (y + 1) + ' option').eq(z).text(decodeURIComponent(choice_value) + ' ' + decodeURIComponent(variant.label) + " (out of stock)");
                        }

                    }

                }
            }
        } else {
            for (var y = 0; y < arr_options.length; y++) {
                var opt_stock_controlled = arr_options[y][4];

                if (opt_stock_controlled == 1) {

                    var prefix = ':';

                    for (var idx = 0; idx < y; idx++) {
                        /*
                        if (jQuery('#option' + y).val() === "-1") {
                            abort = true;
                            break;
                        }
                        */
                        if (arr_options[idx][4] == 1) //only care if being stock controlled
                            prefix += jQuery('#option' + (idx + 1)).find(":selected").val() + ":";
                    }

                    for (var z = 0; z < arr_choices.length; z++) {
                        if (arr_choices[z][0] === arr_options[y][0]) {
                            var lookup = prefix + arr_choices[z][1] + ":";
                            lookup = ForceOrder(lookup);

                            if (lookup.includes(':-1:')) {
                                jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').removeAttr('disabled');
                                jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').text(arr_choices[z][4]);
                            } else {
                                var available = GetStockLevelByPrefix(lookup).stock;

                                if (available > 0) {
                                    jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').removeAttr('disabled');

                                    if (g_fws_stocklvls === 1)
                                        jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').text(arr_choices[z][4] + " (" + available + ")");
                                    else
                                        jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').text(arr_choices[z][4]);
                                } else {
                                    console.log(arr_choices[z][1]);
                                    jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').attr('disabled', 'disabled');
                                    jQuery('#option' + (y + 1) + ' option[value=' + arr_choices[z][1] + ']').text(arr_choices[z][4] + " (out of stock)");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //This is an optional js callback fn. It can be placed in design to handle any design specifics
    try {
        ProductOptionChangedCallback(s_img);
    } catch (e) {
        //
    }
}

function GetStockLevel() {
    return base_product_stock;
}

function GetProductImage(lookup) {

    //alert('GetProductImage('+lookup+')');

    var obj = new Object();
    obj.small = base_product_img;
    obj.large = base_product_img_full;

    var found = false;

    for (var y = 0; y < arr_img_matrix.length; y++) {
        if (arr_img_matrix[y][0] === lookup) {

            found = true;
            obj.small = arr_img_matrix[y][1];
            obj.large = arr_img_matrix[y][2];

            if (found)
                break;
        }
    }

    //alert('Returning img=' + obj);

    return obj;
}

function GetStockLevelByPrefix(lookup) {
    var obj = new Object();
    obj.stock = 0;

    for (var y = 0; y < arr_stock_matrix.length; y++) {
        var allmatched = true;
        var splits = lookup.split(':');
        for (var z = 0; z < splits.length; z++) {
            if (splits[z] === '')
                continue;
            var findme = ':' + splits[z] + ':';
            if (!arr_stock_matrix[y][0].includes(findme))
                allmatched = false;
        }
        if (allmatched === true) {
            //handle negative stock values
            if (parseInt(arr_stock_matrix[y][1]) > 0)
                obj.stock += parseInt(arr_stock_matrix[y][1]);
        }
    }

    //console.log(lookup+'='+obj.stock);

    return obj;
}

function AddToBasket1Click(productid) {

    var callurl = g_fws_cart_url + 'CartService.svc/AddtoBasket1Click?callback=?';
    var curr = jQuery('#currency option:selected').val();

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        prodid: productid,
        qty: 1,
        currency: curr,
        sessionid: sessionid
    }, function(bdata) {
        var mydata = null;
        var msg = eval('(' + bdata + ')');

        if (msg.hasOwnProperty('d'))
            mydata = msg.d;
        else
            mydata = msg;

        //sp_basket_info_count
        jQuery("#sp_basket_info_count").text('' + msg.count);
        jQuery("#sp_basket_info_amount").html('' + msg.price_string);

        jQuery("span[id^='sp_basket_info_count']").each(function(i) {
            jQuery(this).text('' + msg.count);
        });

        jQuery("span[id^='sp_basket_info_amount']").each(function(i) {
            jQuery(this).html('' + msg.price_string);
        });

        if (msg.last_action_result) {
            SoftAddToCartSuccess('Product Successfully Added to Cart');
        } else if (msg.redirect_url != '') {
            window.location.href = msg.redirect_url;
        } else {
            SoftAddToCartFail('Unable To Add to Cart', msg.last_action_error);
        }

    });
}

//I dont think this is used anymore - test and remove
/*
function createPayPal(shopkeeper, merchantid, currency, fundingSource) {

    var quantity = 1;
    try {
        quantity = parseInt(jQuery('#txtQty').val());
    } catch (e) {
        quantity = 1;
    }
    var blocked = ValidateDetailsPage();
    if (blocked) {
        SoftAddToCartFail('Unable To Add to Cart', blocked_err_msg);
        throw new Error(blocked_err_msg);
    }

    if (prod_active_flg == 0) {
        SoftAddToCartFail('Unable To Add to Cart', 'Product Unavailable');
        throw new Error('Product Unavailable');
    }

    if (quantity > GetStockLevel() && store_stock_option > 0) {
        SoftAddToCartFail('Unable To Add to Cart', 'Low Stock. Units in Stock :' + GetStockLevel());
        throw new Error('Low Stock. Units in Stock :' + GetStockLevel());
    }

    var options = '';

    //For select OPTIONS
    jQuery("select[id*='option'] option:selected").each(function () {
        options += jQuery(this).val() + ",";
    });

    //For radiobutton OPTIONS
    jQuery("input:radio[name*='option']:checked").each(function () {
        options += jQuery(this).val() + ",";
    });

    var prodId = window.base_product_id;


    return window.$.ajax({
        url: '/CartService.svc/createQuickPayPal?shopkeeper=' +
            shopkeeper +
            '&currency=' +
            currency +
            '&prodid=' +
            prodId +
            '&options=' +
            options +
            '&quantity=' +
            quantity +
            '&merchant=' +
            merchantid +
            '&sessionId=' +
            sessionid + 
            '&fundingSource=' + fundingSource,
        cache: false,
        async: true,
        success: function (data) {
            return data;
        }
        ,
        error: function (r, s, e) {
            var _error;
            try {
                _error = JSON.parse(JSON.parse(r.responseText));
            } catch (err) {
                var msg = typeof e === "string" ? e : e.message;
                document.getElementById("paypal-error-message").innerHTML = "Error: " + cleanErrorMsg(msg);
                document.getElementById("paypal-error-message-container").classList.add("visible");
                document.getElementById('paypal_completing_order_modal_overlay').style.display = 'none';
                document.getElementById('paypal_completing_order_modal').style.display = 'none';
                document.getElementById('paypal-button-container').classList.remove('paypal-button-container-notchecked');
                throw new Error('PayPal Checkout was unsuccessful. Please refresh the page and try checking out again.');
            }
            
            var errorMessage = _error.details[0];
            document.getElementById("paypal-error-message").innerHTML = "Error: " + cleanErrorMsg(errorMessage);
            document.getElementById("paypal-error-message-container").classList.add("visible");
            document.getElementById('paypal_completing_order_modal_overlay').style.display = 'none';
            document.getElementById('paypal_completing_order_modal').style.display = 'none';
            document.getElementById('paypal-button-container').classList
                .remove('paypal-button-container-notchecked');
            throw new Error(cleanErrorMsg(errorMessage));
            
        }
    });
}

function cleanErrorMsg(str) {
    if (typeof str === "string") return str;
    switch (str.issue) {
        case "CURRENCY_NOT_SUPPORTED":
            return "PayPal Error: Currency not supported. Please contact the store owner for more information.";
        case "TRANSACTION_NOT_SUPPORTED":
            return "PayPal Error: This transaction is currently not supported. Please contact the store owner for more information.";
        case "INVALID_PARAMETER_SYNTAX":
            return "PayPal Error: Could not create order. Please contact the store owner for more information.";
        default:
            return str.description;
    }
}
*/
/*
function CaptureOrderInformation() {
    window.location.href = '/confirm/' + sessionid;
}*/

function AddToBasket() {

    var callurl = g_fws_cart_url + 'CartService.svc/AddtoBasket?callback=?';

    var curr = jQuery('#currency option:selected').val();
    var quantity = 1;

    //try to get the quantity from the system quantity box
    try {
        quantity = parseInt(jQuery('#txtQty').val());
    } catch (e) {
        quantity = 1;
    }

    //we check the details variable to see if it is allowed to be added to the basket
    var blocked = ValidateDetailsPage();

    if (blocked) {
        SoftAddToCartFail('Unable To Add to Cart', blocked_err_msg);
        return;
    }

    if (prod_active_flg == 0) {
        SoftAddToCartFail('Unable To Add to Cart', 'Product Unavailable');
        return;
    }

    if (quantity > GetStockLevel() && store_stock_option > 0) {
        SoftAddToCartFail('Unable To Add to Cart', 'Low Stock. Units in Stock :' + GetStockLevel());
        return;
    }

    var options = '';

    //For select OPTIONS
    jQuery("select[id*='option'] option:selected").each(function() {
        options += jQuery(this).val() + ",";
    });

    //For radiobutton OPTIONS
    jQuery("input:radio[name*='option']:checked").each(function() {
        options += jQuery(this).val() + ",";
    });


    //alert('options='+options);

    // Get the JsonP data
    jQuery.getJSON(callurl, {
        shopkeeper: g_fws_sk,
        prodid: base_product_id,
        qty: quantity,
        currency: curr,
        options_string: options,
        sessionid: sessionid
    }, function(bdata) {
        var mydata = null;
        var msg = eval('(' + bdata + ')');

        if (msg.hasOwnProperty('d'))
            mydata = msg.d;
        else
            mydata = msg;

        //sp_basket_info_count
        jQuery("#sp_basket_info_count").text('' + msg.count);
        jQuery("#sp_basket_info_amount").html('' + msg.price_string);

        jQuery("span[id^='sp_basket_info_count']").each(function(i) {
            jQuery(this).text('' + msg.count);
        });

        jQuery("span[id^='sp_basket_info_amount']").each(function(i) {
            jQuery(this).html('' + msg.price_string);
        });

        if (msg.last_action_result) {
            SoftAddToCartSuccess('Product Successfully Added to Cart');
        } else {
            SoftAddToCartFail('Unable To Add to Cart', msg.last_action_error);
        }

        //reset the form..
        jQuery('#txtQty').val(1);

    });
}

function SoftAddToCartSuccess(div_title) {

    jQuery("#softadd-feedback-success").show();
    jQuery("#softadd-feedback-failure").hide();
    jQuery("#softadd-modal-title").text(Translate(div_title));

    jQuery("#softadd-modal-content").modal({
        overlayId: 'softadd-overlay',
        containerId: 'softadd-container',
        closeHTML: null,
        minHeight: 80,
        opacity: 65,
        position: ['0', ],
        overlayClose: true,
        onOpen: AnimateOpen,
        onClose: AnimateClose
    });

    try {
        //call to optional callback
        AddToBasketCallbackSuccess();
    } catch (e) {}
}

function SoftAddToCartFail(error_title, error_msg) {

    jQuery("#softadd-feedback-success").hide();
    jQuery("#softadd-feedback-failure").show();

    jQuery("#softadd-modal-title").text(Translate(error_title));
    jQuery("#softadd-feedback-fail-msg").text(Translate(error_msg));

    jQuery("#softadd-modal-content").modal({
        overlayId: 'softadd-overlay',
        containerId: 'softadd-container',
        closeHTML: null,
        minHeight: 180,
        opacity: 65,
        position: ['0', ],
        overlayClose: true,
        onOpen: AnimateOpen,
        onClose: AnimateClose
    });

    try {
        //call to optional callback
        AddToBasketCallbackFailed(error_msg);
    } catch (e) {}
}

function AnimateOpen(d) {
    var self = this;
    self.container = d.container[0];
    d.overlay.fadeIn('slow', function() {
        jQuery("#softadd-modal-content", self.container).show();
        var title = jQuery("#softadd-modal-title", self.container);
        title.show();
        d.container.slideDown('slow', function() {
            setTimeout(function() {
                var h = jQuery("#softadd-modal-data", self.container).height() +
                    title.height() +
                    20; // padding
                d.container.animate({
                        height: h
                    },
                    200,
                    function() {
                        jQuery("div.close", self.container).show();
                        jQuery("#softadd-modal-data", self.container).show();
                    }
                );
            }, 300);
        });
    })
}

function AnimateClose(d) {
    var self = this; // this = SimpleModal object
    d.container.animate({
            top: "-" + (d.container.height() + 20)
        },
        500,
        function() {
            self.close(); // or $.modal.close();
        }
    );
}

/* New asynchronous order conversion tracking */
function runConversionScript(a, b, c, d) {
    var callurl = '/CartService.svc/GetOrderConversionScript?cartid=' + a + '&sessionid=' + b + '&storeid=' + c + '&orderid=' + d;
    $.ajax({
        async: true,
        url: callurl,
        type: "GET",
        success: function(data) {
            console.log('getConversionScript:success');
            var tracker = data.d || data;
            if (tracker === '') {
                console.log('no conversion script to run');
            } else {
                $(tracker).appendTo(document.body);
                console.log('runConversionScript:success');
            }
        },
        error: function(r, s, e) {
            console.warn('runConversionScript:failed r:' + r + ' s:' + s + ' e:' + e);
        }
    });
}

function AddCartEvent(eventAction, msg) {

    console.log('AddCartEvent called: Action:' + eventAction + '  Msg:' + msg);

    if (msg === '') return;

    var logObj = {
        session: sessionid,
        cartId: cart_guuid,
        storeId: shopkeeper,
        action: eventAction,
        message: msg
    };

    console.log(logObj);

    var callurl = '/CartService.svc/AddCartActivityEvent';

    $.ajax({
        async: true,
        url: callurl,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(logObj),
        success: function() {
            console.log('AddCartEvent:success');
        },
        error: function(r, s, e) {
            console.warn('AddCartEvent:failed msg:' + msg + ' r:' + r + ' s:' + s + ' e:' + e);
        }
    });
}

/* New Product Platform Product Details Page */
function ValidateDetailsPagev2() {
    console.log('ValidateDetailsPagev2 called');

    if (arr_variants === null) {
        return false;
    }


    var price_w_options_net = parseFloat(base_product_price, 10);
    var price_w_options_vat = parseFloat(base_product_price_inc_vat, 10);

    var variant_string_lookup = '';
    var all_required_options_selected = true;

    var choice_image = '';
    var choice_stock = 0;

    for (var optIdx = 1; optIdx <= prod_option_count; optIdx++) {

        //console.log('Loop ' + optIdx);

        //get name of option
        var optname = jQuery('#option' + optIdx).attr('data-nom');
        var opt_choice_required = jQuery('#option' + optIdx).attr('data-req');
        var opt_stock_controlled = jQuery('#option' + optIdx).attr('data-stock');
        //var opt_group = jQuery('#option' + optIdx).attr('data-group');

        //try for a radio button first
        var choicename = jQuery("input[name='option" + optIdx + "']:checked").val();

        //if sel is empty then it may be a standard select
        if (choicename === '' || choicename === undefined) {
            //sel = jQuery('#option' + optIdx).val();
            choicename = jQuery('#option' + optIdx).find(":selected").val();
        }

        //If we hit a non-selection then skip past it?
        if (choicename === '-1') {
            // Dont type check - sometimes its a string / number
            if (opt_choice_required == 1) {
                disable_checkout = true;
                all_required_options_selected = false; //we need to track that the user needs yet to select more choices...
            }

            continue;
        }

        //create the lookup string if necessary
        if (jQuery('#option' + optIdx).attr('data-type') === 'variant') {
            variant_string_lookup += optname + ":" + choicename + ";#"; //important ; at the end
        } else {
            //get the choice info instead
            var _optionchoice = '';
            var choicestring = optname + ":" + choicename;
            try {
                _optionchoice = jQuery.grep(arr_options, function(e) {
                    return e[0] === choicestring;
                });

                if (_optionchoice.length > 0) {
                    price_w_options_net += parseFloat(_optionchoice[0][1], 10);
                    price_w_options_vat += parseFloat(_optionchoice[0][2], 10);
                }
            } catch (e) {
                console.log('error adding option info. ' + e);
            }
        }

        if (variant_string_lookup != '') {

            var sofar = GetVariantDetails(variant_string_lookup);

            if (sofar.found) {

                if (sofar.img != null && sofar.img.small != "")
                    choice_image = sofar.img;

                if (sofar.complete) {
                    price_w_options_net += sofar.net;
                    price_w_options_vat += sofar.gross;

                    //reset the variant_string here? hmm
                    variant_string_lookup = '';
                }
            }
        }

    } //end of variants lookup


    if (variant_string_lookup === '') {

        //obviously not stock tracked.. just set the data as normal..
        if (base_product_stock <= 0 && store_stock_option > 0)
            disable_checkout = true;
        else
            disable_checkout = false;

        if (!all_required_options_selected)
            disable_checkout = true;
    } else {

        if (choice_stock <= 0 && store_stock_option > 0)
            disable_checkout = true;
        else
            disable_checkout = false;
    }

    SetPageDetails(base_product_stock, price_w_options_net, price_w_options_vat, choice_image, disable_checkout, all_required_options_selected);


    console.log('ValidateDetailsPagev2 end');

    return disable_checkout;
}

function GetVariantDetails(lookup) {

    if (lookup.endsWith('#'))
        lookup = lookup.slice(0, -1);


    var obj = new Object();
    obj.found = false;
    obj.stock = 0;
    obj.img = new Object();
    obj.net = parseFloat(0, 10);
    obj.gross = parseFloat(0, 10);
    obj.label = "";
    obj.complete = false;
    obj.uvid = "";

    for (var y = 0; y < arr_variants.length; y++) {
        if (arr_variants[y][1].startsWith(lookup) === true) {

            obj.found = true;

            //handle negative stock values
            if (parseInt(arr_variants[y][6]) > 0)
                obj.stock += parseInt(arr_variants[y][6]);

            obj.img.small = arr_variants[y][4];
            obj.img.large = arr_variants[y][5];

            obj.net = parseFloat(arr_variants[y][2], 10);
            obj.gross = parseFloat(arr_variants[y][3], 10);
            obj.label = arr_variants[y][7];
            obj.uvid = arr_variants[y][8];

            if (arr_variants[y][0] == lookup) {
                obj.complete = true;
                break; //if it is a perfect match then we can stop looking
            }

        }
    }

    //console.log('Returning img [' + obj.img + '] for ' + lookup);
    return obj;
}