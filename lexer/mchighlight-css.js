/*
   McHighlight-CSS: A syntax-highlighter for CSS.
 
   Author: Matthew Might
   Site:   http://matt.might.net/
           http://www.ucombinator.org/  

   This one is pretty bare-bones.  If you spruce it up, email it to me.
 */

var CSS =        new McLexer.State() ;
var CSS_STRING = new McLexer.State() ;

var CSSH = new McHighlighter(CSS) ;

CSS (/[:.\[\](){}#]/)               (CSSH.classify("css-punctuation")) ;

CSS (/\/\/[^\r\n]*/)                (CSSH.classify("css-comment")) ;
CSS (/\/[*]([^*]|[*][^\/])*[*]\//)  (CSSH.rewriteAndClassify(CSSH.escapeAndHarden,"css-comment")) ;

CSS (/\"/)                          (CSSH.classify("css-string",McCONTINUE(CSS_STRING))) ;

CSS (/-?[0-9]+([.][0-9]+)?/)        (CSSH.classify("css-number")) ;
CSS (/[-_A-Za-z0-9]+/)              (CSSH.classify("css-identifier")) ;

CSS (/\s+/)                         (CSSH.eta('hardenWhitespace'))
CSS (/./)                           (CSSH.eta('escapeHTML'))

CSS (/$/)                           (CSSH.stop) ;

/* Doubly-quoted strings. */
CSS_STRING (/\\\"/)  (CSSH.classify("css-string")) ;
CSS_STRING (/\"/)    (CSSH.classify("css-string",McCONTINUE(CSS))) ;
CSS_STRING (/.|\s/)  (CSSH.classify("css-string")) ;


var CSSHighlighter = CSS ;
var Highlighter = CSSH ;
