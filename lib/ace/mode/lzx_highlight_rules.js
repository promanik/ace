define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var XmlHighlightRules = require("./xml_highlight_rules").XmlHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;

var tagMap = lang.createMap({
    script      : 'script',
    handler     : 'script',
    method      : 'script',
    setter      : 'script'
});


var LzxHighlightRules = function() {
    XmlHighlightRules.call(this);

    this.addRules({
        tag: [{
            token : function(start, tag) {
                var group = tagMap[tag];
                return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
                    "meta.tag" + (group ? "." + group : "") + ".tag-name.xml"];
            },
            regex : "(</?)([-_a-zA-Z0-9:]+)",
            next: "tag_stuff"
        }],
        tag_stuff: [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
        ],
    });

    this.embedTagRules(JavaScriptHighlightRules, "js-", "script");
    this.embedTagRules(JavaScriptHighlightRules, "js-", "handler");
    this.embedTagRules(JavaScriptHighlightRules, "js-", "method");
    this.embedTagRules(JavaScriptHighlightRules, "js-", "setter");

    if (this.constructor === LzxHighlightRules)
        this.normalizeRules();
};


oop.inherits(LzxHighlightRules, XmlHighlightRules);

exports.LzxHighlightRules = LzxHighlightRules;
});
