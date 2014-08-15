define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var XmlMode = require("./xml").Mode;
var JavaScriptMode = require("./javascript").Mode;
var LzxHighlightRules = require("./lzx_highlight_rules").LzxHighlightRules;
var LzxBehaviour = require("./behaviour/xml").XmlBehaviour;
var LzxFoldMode = require("./folding/xml").FoldMode;

var Mode = function() {
    this.HighlightRules = LzxHighlightRules;
    this.$behaviour = new LzxBehaviour();
    this.foldingRules = new LzxFoldMode();

    this.createModeDelegates({
        "js-": JavaScriptMode
    });
};

oop.inherits(Mode, XmlMode);

(function() {

    this.blockComment = {start: "<!--", end: "-->"};

    this.$id = "ace/mode/lzx";
}).call(Mode.prototype);

exports.Mode = Mode;
});
