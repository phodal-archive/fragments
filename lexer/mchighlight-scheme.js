/* 
   McHighlight-Scheme: A syntax-highlighter for Scheme code.
 
   Author: Matthew Might
   Site:   http://matt.might.net/
           http://www.ucombinator.org/  

   This highlighter makes a "best-effort" attempt at handling Scheme.

   If you sharpen the specification or clean it up, please send me the update.
 */

/* Lexical analysis states. */
var SCHEME        = new McLexer.State() ;
var SCHEME_STRING = new McLexer.State() ;

var SchemeHighlighter = new McHighlighter(SCHEME) ;


/* Standard Scheme lexemes. */
SCHEME (/define|lambda|and|or|cond|case|if|let|letrec|let[*]/) (SchemeHighlighter.classify("scheme-keyword")) ;

SCHEME (/[(){}\[\],]|#\(|\'|,@/)  (SchemeHighlighter.classify('scheme-punctuation')) ;

SCHEME (/\"/)                     (SchemeHighlighter.classify("scheme-string",McCONTINUE(SCHEME_STRING))) ;

SCHEME (/;[^\n]*/)                (SchemeHighlighter.classify("scheme-comment")) ;

SCHEME (/\s+/)                    (SchemeHighlighter.eta('hardenWhitespace')) ;
SCHEME (/(-)?\d+([.]\d+)?/)       (SchemeHighlighter.classify("scheme-number")) ;
SCHEME (/[^(){}\[\];\s]+/)        (SchemeHighlighter.classify("scheme-symbol")) ;

SCHEME (/$/) (SchemeHighlighter.stop) ;


/* Doubly-quoted strings. */
SCHEME_STRING (/\\\"/)  (SchemeHighlighter.classify("jsstring")) ;
SCHEME_STRING (/\"/)    (SchemeHighlighter.classify("jsstring",McCONTINUE(SCHEME))) ;
SCHEME_STRING (/.|\s/)  (SchemeHighlighter.classify("jsstring")) ;


var Highlighter = SchemeHighlighter ;
