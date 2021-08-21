import { Injectable, Inject } from '@angular/core';
import { ConfigService } from '../service/config.service';
import marked from 'marked';
import hljs from 'highlight.js';

import bash from 'highlight.js/lib/languages/bash';
import cs from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
import objectivec from 'highlight.js/lib/languages/objectivec';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';

@Injectable({
  providedIn: 'root',
})
export class MarkDownService {

  public constructor(
    private config: ConfigService) {
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('cs', cs);
    hljs.registerLanguage('cpp', cpp);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('markdown', markdown);
    hljs.registerLanguage('objectivec', objectivec);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('typescript', typescript);

    const langList =
      ['bash', 'cs', 'cpp', 'css', 'xml', 'json', 'java', 'javascript',
      'markdown', 'objectivec', 'php', 'python', 'ruby', 'sql', 'typescript'];

    marked.setOptions({
      baseUrl: this.config.getRAWRoot(),
      highlight: (code: string, lang: string): string => {
        return lang && langList.includes(lang) ? hljs.highlight(lang, code).value : hljs.highlightAuto(code).value;
      }
    });
  }
  public render(text: string): string {
    return marked(text);
  }
}
