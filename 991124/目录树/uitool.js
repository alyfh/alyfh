var MC = {
    MCkeyCode: {
        ALT: 18,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        ESCAPE: 27,
        PERIOD: 190,
        WINDOWS: 91,
        HOME: 36,
        INSERT: 45,
        ENTER: 13,
        ESC: 27,
        END: 35,
        HOME: 36,
        NUMPAD_ENTER: 108,
        SHIFT: 16,
        TAB: 9,
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        SPACE: 32,
        F2: 113,
        DELETE: 46,
        BACKSPACE: 8
    },
    message: {
        selectAuto: "--%E8%AF%B7%E9%80%89%E6%8B%A9--"
    },
    statusCode: {
        ok: 200,
        error: 300,
        timeout: 301
    },
    ui: {
        sbar: true
    },
    frag: {},
    _msg: {},
    _set: {
        loginUrl: "/login.html",
        loginTitle: "",
        debug: false
    },
    _template: {},
    msg: function (key, args) {
        var _format = function (str, args) {
            args = args || [];
            var result = str;
            for (var i = 0; i < args.length; i++) {
                result = result.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            }
            return result;
        }
        return _format(this._msg[key], args);
    },
    loadLogin: function () {
        if ($.MD && MC._set.loginTitle) {
            $.MD.open(MC._set.loginUrl, "login", MC._set.loginTitle, {
                mask: true,
                width: 520,
                height: 260
            });
        } else {
            window.location = MC._set.loginUrl;
        }
    },
    jsonEval: function (data) {
        try {
            if (typeof (data) == 'string') {
                return window.eval('(' + data + ')');
            } else {
                return data;
            }
        } catch (e) {
            return {};
        }
    },
    ajaxError: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == "999") {
            top.location = MC._set.loginUrl;
        }
    },
    ajaxDone: function (json) {
        if (json.statusCode === undefined && json.message === undefined) {
            if (alertMsg) return alertMsg.error(json);
            else return alert(json);
        }
        if (json.statusCode == MC.statusCode.error) {
            if (json.message && alertMsg) alertMsg.error(json.message);
        } else if (json.statusCode == MC.statusCode.timeout) {
            if (alertMsg) alertMsg.error(json.message || MC.msg("sessionTimout"), {
                okCall: MC.loadLogin
            });
            else MC.loadLogin();
        } else {
            if (json.message && alertMsg) alertMsg.correct(json.message);
        };
    },
    isTrueFalse: function (val) {
        if (typeof (val) == "string") {
            if (val == "true") return true;
            else return false;
        }
        if (typeof (val) == "boolean") {
            return val;
        }
    },
    _clsSelect: function () {
        if ('getSelection' in window) {
            window.getSelection().removeAllRanges();
        } else {
            try {
                document.selection.empty();
            } catch (e) {};
        };
    },
    disassembleUrl: function (url) {
        var result = {},
            parm = {};
        var urlParm = "";
        if (url) {
            var url = url.split("?");
            result.locationUrl = url[0]
            urlParm = url[1];
        }
        urlParm = urlParm || location.search.substring(1);
        var re = /([^&=]+)=([^&]*)/g,
            m;
        while (m = re.exec(urlParm)) {
            parm[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        result.parm = parm;
        return result;
    },
    stopD: function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            window.event.returnValue = false;
        }
        return false;
    }
};
(function ($) {
    $.setRegional = function (key, value) {
        if (!$.regional) $.regional = {};
        $.regional[key] = value;
    };
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
    $.quoteString = function (string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    $.checkArray = function (key, data, array) {
        if (array.length == 0) return -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] == data[key]) return i;
        }
        return -1;
    };
    $.isEmptyObj = function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };
    var browser = $.browser = function () {
        var agent = navigator.userAgent.toLowerCase(),
            opera = window.opera,
            browser = {
                msie: !!window.ActiveXObject,
                opera: (!!opera && opera.version),
                webkit: (agent.indexOf(' applewebkit/') > -1),
                mozilla: /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase()),
                mac: (agent.indexOf('macintosh') > -1),
                quirks: (document.compatMode == 'BackCompat')
            };
        browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera);
        var version = 0;
        if (browser.msie) {
            version = parseFloat(agent.match(/msie (\d+)/)[1]);
            browser.msiepat = document.documentMode == 9;
            browser.ie8 = !!document.documentMode;
            browser.ie8Compat = document.documentMode == 8;
            browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7);
            browser.ie6Compat = (version < 7 || browser.quirks);
        }
        if (browser.gecko) {
            var geckoRelease = agent.match(/rv:([\d\.]+)/);
            if (geckoRelease) {
                geckoRelease = geckoRelease[1].split('.');
                version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;
            }
        }
        if (/chrome\/(\d+\.\d)/i.test(agent)) {
            browser.chrome = +RegExp['\x241'];
        }
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {
            browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
        }
        if (browser.opera) {
            version = parseFloat(opera.version());
        }
        if (browser.webkit) {
            version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);
        }
        browser.version = version;
        browser.isCompatible = !browser.mobile && ((browser.msie && version >= 6) || (browser.gecko && version >= 10801) || (browser.opera && version >= 9.5) || (browser.air && version >= 1) || (browser.webkit && version >= 522) || false);
        return browser;
    }();
    $.formateDate = function (date, format, options) {
        return $.formatDates(date, null, format, options);
    }
    $.formatDates = function (date1, date2, format, options) {
        options = options || {
            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
        }

        function zeroPad(n) {
            return (n < 10 ? '0' : '') + n;
        }
        var dateFormatters = {
            s: function (d) {
                return d.getSeconds()
            },
            ss: function (d) {
                return zeroPad(d.getSeconds())
            },
            m: function (d) {
                return d.getMinutes()
            },
            mm: function (d) {
                return zeroPad(d.getMinutes())
            },
            h: function (d) {
                return d.getHours() % 12 || 12
            },
            hh: function (d) {
                return zeroPad(d.getHours() % 12 || 12)
            },
            H: function (d) {
                return d.getHours()
            },
            HH: function (d) {
                return zeroPad(d.getHours())
            },
            d: function (d) {
                return d.getDate()
            },
            dd: function (d) {
                return zeroPad(d.getDate())
            },
            ddd: function (d, o) {
                return o.dayNamesShort[d.getDay()]
            },
            dddd: function (d, o) {
                return o.dayNames[d.getDay()]
            },
            M: function (d) {
                return d.getMonth() + 1
            },
            MM: function (d) {
                return zeroPad(d.getMonth() + 1)
            },
            MMM: function (d, o) {
                return o.monthNamesShort[d.getMonth()]
            },
            MMMM: function (d, o) {
                return o.monthNames[d.getMonth()]
            },
            yy: function (d) {
                return (d.getFullYear() + '').substring(2)
            },
            yyyy: function (d) {
                return d.getFullYear()
            },
            t: function (d) {
                return d.getHours() < 12 ? 'a' : 'p'
            },
            tt: function (d) {
                return d.getHours() < 12 ? 'am' : 'pm'
            },
            T: function (d) {
                return d.getHours() < 12 ? 'A' : 'P'
            },
            TT: function (d) {
                return d.getHours() < 12 ? 'AM' : 'PM'
            },
            u: function (d) {
                return formatDate(d, "yyyy-MM-dd'T'HH:mm:ss'Z'")
            },
            S: function (d) {
                var date = d.getDate();
                if (date > 10 && date < 20) {
                    return 'th';
                }
                return ['st', 'nd', 'rd'][date % 10 - 1] || 'th';
            },
            w: function (d, o) {
                return o.weekNumberCalculation(d);
            },
            W: function (d) {
                return iso8601Week(d);
            }
        };

        function iso8601Week(date) {
            var time;
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        }
        var date = date1,
            otherDate = date2,
            i, len = format.length,
            c, i2, formatter, res = '';
        for (i = 0; i < len; i++) {
            c = format.charAt(i);
            if (c == "'") {
                for (i2 = i + 1; i2 < len; i2++) {
                    if (format.charAt(i2) == "'") {
                        if (date) {
                            if (i2 == i + 1) {
                                res += "'";
                            } else {
                                res += format.substring(i + 1, i2);
                            }
                            i = i2;
                        }
                        break;
                    }
                }
            } else if (c == '(') {
                for (i2 = i + 1; i2 < len; i2++) {
                    if (format.charAt(i2) == ')') {
                        var subres = $.formatDate(date, format.substring(i + 1, i2), options);
                        if (parseInt(subres.replace(/\D/, ''), 10)) {
                            res += subres;
                        }
                        i = i2;
                        break;
                    }
                }
            } else if (c == '[') {
                for (i2 = i + 1; i2 < len; i2++) {
                    if (format.charAt(i2) == ']') {
                        var subformat = format.substring(i + 1, i2);
                        var subres = $.formatDate(date, subformat, options);
                        if (subres != $.formatDate(otherDate, subformat, options)) {
                            res += subres;
                        }
                        i = i2;
                        break;
                    }
                }
            } else if (c == '{') {
                date = date2;
                otherDate = date1;
            } else if (c == '}') {
                date = date1;
                otherDate = date2;
            } else {
                for (i2 = len; i2 > i; i2--) {
                    if (formatter = dateFormatters[format.substring(i, i2)]) {
                        if (date) {
                            res += formatter(date, options);
                        }
                        i = i2 - 1;
                        break;
                    }
                }
                if (i2 == i) {
                    if (date) {
                        res += c;
                    }
                }
            }
        }
        return res;
    }
    $.parseDate = function (s, ignoreTimezone) {
        function fixDate(d, check) {
            if (+d) {
                while (d.getDate() != check.getDate()) {
                    d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS);
                }
            }
        }

        function parseISO8601(s, ignoreTimezone) {
            var m = s.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
            if (!m) {
                return null;
            }
            var date = new Date(m[1], 0, 1);
            if (ignoreTimezone || !m[13]) {
                var check = new Date(m[1], 0, 1, 9, 0);
                if (m[3]) {
                    date.setMonth(m[3] - 1);
                    check.setMonth(m[3] - 1);
                }
                if (m[5]) {
                    date.setDate(m[5]);
                    check.setDate(m[5]);
                }
                fixDate(date, check);
                if (m[7]) {
                    date.setHours(m[7]);
                }
                if (m[8]) {
                    date.setMinutes(m[8]);
                }
                if (m[10]) {
                    date.setSeconds(m[10]);
                }
                if (m[12]) {
                    date.setMilliseconds(Number("0." + m[12]) * 1000);
                }
                fixDate(date, check);
            } else {
                date.setUTCFullYear(m[1], m[3] ? m[3] - 1 : 0, m[5] || 1);
                date.setUTCHours(m[7] || 0, m[8] || 0, m[10] || 0, m[12] ? Number("0." + m[12]) * 1000 : 0);
                if (m[14]) {
                    var offset = Number(m[16]) * 60 + (m[18] ? Number(m[18]) : 0);
                    offset *= m[15] == '-' ? 1 : -1;
                    date = new Date(+date + (offset * 60 * 1000));
                }
            }
            return date;
        }
        if (typeof s == 'object') {
            return s;
        }
        if (typeof s == 'number') {
            return new Date(s * 1000);
        }
        if (typeof s == 'string') {
            if (s.match(/^\d+(\.\d+)?$/)) {
                return new Date(parseFloat(s) * 1000);
            }
            if (ignoreTimezone === undefined) {
                ignoreTimezone = true;
            }
            return parseISO8601(s, ignoreTimezone) || (s ? new Date(s) : null);
        }
        return null;
    }
    $.fn.extend({
        ajaxUrl: function (op) {
            var $this = $(this);
            var tempComboxObj = $this.find("[comboxType]");
            clearTimeout("clearCombTimer");
            $.ajax({
                type: op.type || 'GET',
                url: op.url,
                data: op.data,
                cache: false,
                success: function (response, textStatus, jqXHR) {
                    try {
                        $this.empty().html(response).initUI();
                        if ($.isFunction(op.callback)) op.callback(response);
                    } catch (e) {
                        throw e;
                    }
                    var clearCombTimer = setTimeout(function () {
                        if (tempComboxObj.length != 0) {
                            for (var i = tempComboxObj.length - 1; i >= 0; i--) {
                                if ($(tempComboxObj[i]).attr("ligeruiid")) {
                                    var tempCombox = $.ligerui.get($(tempComboxObj[i]).attr("ligeruiid"));
                                    if (tempCombox) {
                                        tempCombox.destroy();
                                    }
                                }
                            }
                        }
                    }, 280);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (op.error) {
                        op.error(xhr, ajaxOptions, thrownError)
                    }
                    MC.ajaxError(xhr, ajaxOptions, thrownError)
                }
            });
        },
        loadUrl: function (url, data, callback) {
            $(this).ajaxUrl({
                url: url,
                data: data,
                callback: callback
            });
        },
        initUI: function () {
            return this.each(function () {
                if ($.isFunction(initUI)) {
                    initUI(this);
                };
            });
        },
        layoutH: function ($refBox) {
            return this.each(function () {
                var $this = $(this);
                if (!$refBox) {
                    if ($this.parents("div.l-dialog-content:first").length > 0) {
                        $refBox = $this.parents("div.l-dialog-content:first");
                    } else {
                        $refBox = $this.parents("div.layoutBox:first");
                    }
                }
                var iRefH = $refBox.height();
                var iLayoutH = parseInt($this.attr("layoutH"));
                var isScroll = $this.attr("isScroll");
                var iH = iRefH - iLayoutH > 50 ? iRefH - iLayoutH : 50;
                (isScroll == "false" || !isScroll) ? $this.height(iH).css("overflow", "auto"): $this.height(iH).css("overflow", "scroll");
            });
        },
        hoverClass: function (className) {
            var _className = className || "hover";
            return this.each(function () {
                $(this).hover(function () {
                    $(this).addClass(_className);
                }, function () {
                    $(this).removeClass(_className);
                });
            });
        },
        focusClass: function (className) {
            var _className = className || "textInputFocus";
            return this.each(function () {
                $(this).focus(function () {
                    $(this).addClass(_className);
                }).blur(function () {
                    $(this).removeClass(_className);
                });
            });
        },
        inputAlert: function () {
            return this.each(function () {
                var $this = $(this);

                function getAltBox() {
                    return $this.parent().find("label.alt");
                }

                function altBoxCss(opacity) {
                    var position = $this.position();
                    return {
                        width: $this.width(),
                        top: position.top + 'px',
                        left: position.left + 'px',
                        opacity: opacity || 1
                    }
                }
                if (getAltBox().size() < 1) {
                    if (!$this.attr("id")) $this.attr("id", $this.attr("name") + "_" + Math.round(Math.random() * 10000));
                    var $label = $('<label class="alt" for="' + $this.attr("id") + '">' + $this.attr("alt") + '</label>').appendTo($this.parent());
                    $label.css(altBoxCss(1));
                    if ($this.val()) $label.hide();
                }
                $this.focus(function () {
                    getAltBox().css(altBoxCss(0.3));
                }).blur(function () {
                    if (!$(this).val()) getAltBox().show().css("opacity", 1);
                }).keydown(function () {
                    getAltBox().hide();
                });
            });
        },
        isTag: function (tn) {
            if (!tn) return false;
            return $(this)[0].tagName.toLowerCase() == tn ? true : false;
        },
        isBind: function (type) {
            var _events = $(this).data("events");
            return _events && type && _events[type];
        },
        readonlySelect: function (readonlySelect) {
            return this.each(function (index) {
                var selectinput = $('<input type="text" class="disabled" disabled="true" />');
                var $this = $(this);
                $this.hide();
                selectinput.attr("id", $this.attr("id") + "_zhows")
                selectinput.val($this.val());
                selectinput.addClass($this.attr("class"));
                if ($("#" + $this.attr("id") + "_zhows").length > 0) return;
                selectinput.insertAfter($this);
            })
        },
        size: function () {
            return this.length;
        }
    });
})(jQuery);