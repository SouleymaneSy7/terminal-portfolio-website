import { CommandHistoryOutputType } from "@/types";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output/output";

export function curlHelpOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">curl — Usage</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">curl [options...] &lt;url&gt;</span></p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Options  <span class="text-text-clr opacity-sep">(browser subset)</span></p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">-v, --verbose        </span> Make the operation more talkative</p>
          <p><span class="text-tertiary-clr font-bold">-I, --head           </span> Show document info only (HEAD request)</p>
          <p><span class="text-tertiary-clr font-bold">-s, --silent         </span> Silent mode — suppress progress line</p>
          <p><span class="text-tertiary-clr font-bold">-X, --request &lt;cmd&gt; </span> Specify request method</p>
          <p><span class="text-tertiary-clr font-bold">-H, --header &lt;hdr&gt;  </span> Pass custom header  e.g. -H 'Accept: application/json'</p>
          <p><span class="text-tertiary-clr font-bold">-d, --data &lt;data&gt;   </span> HTTP POST data  (implies -X POST)</p>
          <p><span class="text-tertiary-clr font-bold">-u, --user &lt;u:p&gt;    </span> Server user and password (Basic Auth)</p>
          <p><span class="text-tertiary-clr font-bold">-L, --location       </span> Follow redirects  (default: on)</p>
          <p><span class="text-tertiary-clr font-bold">-o, --output &lt;file&gt; </span> Ignored — output always shown in terminal</p>
          <p><span class="text-tertiary-clr font-bold">-h, --help           </span> This help text</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Note</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Browser CORS restrictions apply. Cross-origin requests succeed only</p>
          <p>when the server sends appropriate <span class="text-tertiary-clr">Access-Control-Allow-Origin</span> headers.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Examples</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://wttr.in/Paris?format=3</p>
          <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -I https://httpbin.org/get</p>
          <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -v https://httpbin.org/get</p>
          <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -X POST https://httpbin.org/post -d 'key=value'</p>
          <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -H 'Accept: application/json' https://httpbin.org/get</p>
        </div>

      </div>`,
  );
}

export function curlUsageOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">curl</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
            <p>Transfer data from or to a server using supported protocols.</p>
            <p><span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">curl [options] &lt;url&gt;</span></p>
          </div>

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">Common flags</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
            <p><span class="text-tertiary-clr font-bold">-v</span>          verbose — show request &amp; response headers</p>
            <p><span class="text-tertiary-clr font-bold">-I</span>          HEAD only — headers, no body</p>
            <p><span class="text-tertiary-clr font-bold">-s</span>          silent — no progress output</p>
            <p><span class="text-tertiary-clr font-bold">-X &lt;method&gt;</span>  specify HTTP method</p>
            <p><span class="text-tertiary-clr font-bold">-H &lt;header&gt;</span>  add request header</p>
            <p><span class="text-tertiary-clr font-bold">-d &lt;data&gt;</span>   send POST data</p>
            <p><span class="text-tertiary-clr font-bold">-u user:pass</span> Basic Auth</p>
          </div>

          <div class="space-y-t-group">
            <p class="text-secondary-clr font-bold">Try these</p>
            <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
            <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://wttr.in/Paris?format=3</p>
            <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -I https://httpbin.org/get</p>
            <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -v https://httpbin.org/get</p>
            <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl -X POST https://httpbin.org/post -d 'key=value'</p>
            <p class="text-tertiary-clr font-bold">${DT.decorators.bullet}  curl https://api.adviceslip.com/advice</p>
          </div>

          <div class="space-y-t-footer">
            <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
            <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">curl --help</span>${DT.decorators.quote} for full options.</p>
          </div>

        </div>`,
  );
}
