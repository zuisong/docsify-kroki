import { beforeEach, it } from "deno_std/testing/bdd.ts";
import { init } from "$/test/common/dom-env-init.ts";
import { defaultConfig, plant, replace } from "$/src/kroki.ts";
import { assertEquals } from "deno_std/assert/assert_equals.ts";

beforeEach(() => {
  init();
});

it("multi markdown integration test", async () => {
  const readmeContent = `
<h1 id="example"><a href="#/?id=example" data-id="example" class="anchor"><span>Example</span></a></h1>
<hr>
<h2 id="plantuml"><a href="#/?id=plantuml" data-id="plantuml" class="anchor"><span>plantuml</span></a></h2>

<pre v-pre data-lang="plantuml"><code class="lang-plantuml">@startuml
A->B
@enduml</code></pre>
<hr>
<h2 id="svgbob"><a href="#/?id=svgbob" data-id="svgbob" class="anchor"><span>svgbob</span></a></h2>

<pre v-pre data-lang="svgbob"><code class="lang-svgbob">                  .-,(  ),-.
   ___  _      .-(          )-.
  [___]|=| -->(                )      __________
  /::/ |_|     '-(          ).-' --->[_...__... ]
                  '-.( ).-'
                          \      ____   __
                           '--->|    | |==|
                                |____| |  |
                                /::::/ |__|</code></pre>
<hr>
<h2 id="mermaid"><a href="#/?id=mermaid" data-id="mermaid" class="anchor"><span>mermaid</span></a></h2>
<pre v-pre data-lang="mermaid"><code class="lang-mermaid">graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
  C --> E[ Sharing ideas ]
  C --> F[ Advocating ]</code></pre>
<hr>
<h2 id="vega"><a href="#/?id=vega" data-id="vega" class="anchor"><span>vega</span></a></h2>
<pre v-pre data-lang="vega"><code class="lang-vega">{
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 400,
  "height": 200,
  "padding": 5,

  "data": [
    {
      "name": "table",
      "values": [
        {"category": "A", "amount": 28},
        {"category": "B", "amount": 55},
        {"category": "C", "amount": 43},
        {"category": "D", "amount": 91},
        {"category": "E", "amount": 81},
        {"category": "F", "amount": 53},
        {"category": "G", "amount": 19},
        {"category": "H", "amount": 87}
      ]
    }
  ],

  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "table", "field": "amount"},
      "nice": true,
      "range": "height"
    }
  ],

  "axes": [
    { "orient": "bottom", "scale": "xscale" },
    { "orient": "left", "scale": "yscale" }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data":"table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": [
            {"test": "datum === tooltip", "value": 0},
            {"value": 1}
          ]
        }
      }
    }
  ]
}

</code></pre>
<hr>
<h2 id="vegalite"><a href="#/?id=vegalite" data-id="vegalite" class="anchor"><span>vegalite</span></a></h2>
<pre v-pre data-lang="vegalite"><code class="lang-vegalite">{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "Horizontally concatenated charts that show different types of discretizing scales.",
  "data": {
    "values": [
      {"a": "A", "b": 28},
      {"a": "B", "b": 55},
      {"a": "C", "b": 43},
      {"a": "D", "b": 91},
      {"a": "E", "b": 81},
      {"a": "F", "b": 53},
      {"a": "G", "b": 19},
      {"a": "H", "b": 87},
      {"a": "I", "b": 52}
    ]
  },
  "hconcat": [
    {
      "mark": "circle",
      "encoding": {
        "y": {
          "field": "b",
          "type": "nominal",
          "sort": null,
          "axis": {
            "ticks": false,
            "domain": false,
            "title": null
          }
        },
        "size": {
          "field": "b",
          "type": "quantitative",
          "scale": {
            "type": "quantize"
          }
        },
        "color": {
          "field": "b",
          "type": "quantitative",
          "scale": {
            "type": "quantize",
            "zero": true
          },
          "legend": {
            "title": "Quantize"
          }
        }
      }
    },
    {
      "mark": "circle",
      "encoding": {
        "y": {
          "field": "b",
          "type": "nominal",
          "sort": null,
          "axis": {
            "ticks": false,
            "domain": false,
            "title": null
          }
        },
        "size": {
          "field": "b",
          "type": "quantitative",
          "scale": {
            "type": "quantile",
            "range": [80, 160, 240, 320, 400]
          }
        },
        "color": {
          "field": "b",
          "type": "quantitative",
          "scale": {
            "type": "quantile",
            "scheme": "magma"
          },
          "legend": {
            "format": "d",
            "title": "Quantile"
          }
        }
      }
    },
    {
      "mark": "circle",
      "encoding": {
        "y": {
          "field": "b",
          "type": "nominal",
          "sort": null,
          "axis": {
            "ticks": false,
            "domain": false,
            "title": null
          }
        },
        "size": {
          "field": "b",
          "type": "quantitative",
          "scale": {
            "type": "threshold",
            "domain": [30, 70],
            "range": [80, 200, 320]
          }
        },
        "color": {
          "field": "b",
          "type": "quantitative",
          "scale": {
            "type": "threshold",
            "domain": [30, 70],
            "scheme": "viridis"
          },
          "legend": {
            "title": "Threshold"
          }
        }
      }
    }
  ],
  "resolve": {
    "scale": {
      "color": "independent",
      "size": "independent"
    }
  }
}
</code></pre>
<hr>
<h2 id="wavedrom"><a href="#/?id=wavedrom" data-id="wavedrom" class="anchor"><span>wavedrom</span></a></h2>
<pre v-pre data-lang="wavedrom"><code class="lang-wavedrom">{ signal: [
  { name: "clk",         wave: "p.....|..." },
  { name: "Data",        wave: "x.345x|=.x", data: ["head", "body", "tail", "data"] },
  { name: "Request",     wave: "0.1..0|1.0" },
  {},
  { name: "Acknowledge", wave: "1.....|01." }
]}</code></pre>
<hr>
<h2 id="nomnoml"><a href="#/?id=nomnoml" data-id="nomnoml" class="anchor"><span>nomnoml</span></a></h2>
<pre v-pre data-lang="nomnoml"><code class="lang-nomnoml">[Pirate|eyeCount: Int|raid();pillage()|
  [beard]--[parrot]
  [beard]-:>[foul mouth]
]

[<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>abstract</span><span
            class="token punctuation">></span></span>Marauder]<span class="token tag"><span class="token tag"><span
            class="token punctuation">&lt;</span>:--[Pirate]</span>
<span class="token attr-name">[Pirate]-</span> <span class="token attr-name">0..7[mischief]</span>
<span class="token attr-name">[jollyness]-</span><span class="token punctuation">></span></span>[Pirate]
[jollyness]->[rum]
[jollyness]->[singing]
[Pirate]-> *[rum|tastiness: Int|swig()]
[Pirate]->[singing]
[singing]<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>-</span><span
            class="token punctuation">></span></span>[rum]
</code></pre>
<hr>
<h2 id="graphviz"><a href="#/?id=graphviz" data-id="graphviz" class="anchor"><span>graphviz</span></a></h2>
<pre v-pre data-lang="graphviz"><code class="lang-graphviz">
digraph D {
  subgraph cluster_p {
    label = "Kroki";
    subgraph cluster_c1 {
      label = "Server";
      Filebeat;
      subgraph cluster_gc_1 {
        label = "Docker/Server";
        Java;
      }
      subgraph cluster_gc_2 {
        label = "Docker/Mermaid";
        "Node.js";
        "Puppeteer";
        "Chrome";
      }
    }
    subgraph cluster_c2 {
      label = "CLI";
      Golang;
    }
  }
}
</code></pre>
<hr>
<h2 id="erd"><a href="#/?id=erd" data-id="erd" class="anchor"><span>erd</span></a></h2>
<pre v-pre data-lang="erd"><code class="lang-erd">[Person]
*name
height
weight
+birth_location_id

[Location]
*id
city
state
country

Person *--1 Location</code></pre>
<hr>
<h2 id="ditaa"><a href="#/?id=ditaa" data-id="ditaa" class="anchor"><span>ditaa</span></a></h2>
<pre v-pre data-lang="ditaa"><code class="lang-ditaa">      +--------+
      |        |
      |  User  |
      |        |
      +--------+
          ^
  request |
          v
  +-------------+
  |             |
  |    Kroki    |
  |             |---+
  +-------------+   |
       ^  ^         | inflate
       |  |         |
       v  +---------+
  +-------------+
  |             |
  |    Ditaa    |
  |             |----+
  +-------------+    |
             ^       | process
             |       |
             +-------+
</code></pre>
<hr>
<h2 id="c4plantuml"><a href="#/?id=c4plantuml" data-id="c4plantuml" class="anchor"><span>c4plantuml</span></a></h2>
<pre v-pre data-lang="c4plantuml"><code class="lang-c4plantuml">@startuml
!include C4_Context.puml

title System Context diagram for Internet Banking System

Person(customer, "Banking Customer", "A customer of the bank, with personal bank accounts.")
System(banking_system, "Internet Banking System", "Allows customers to check their accounts.")

System_Ext(mail_system, "E-mail system", "The internal Microsoft Exchange e-mail system.")
System_Ext(mainframe, "Mainframe Banking System", "Stores all of the core banking information.")

Rel(customer, banking_system, "Uses")
Rel_Back(customer, mail_system, "Sends e-mails to")
Rel_Neighbor(banking_system, mail_system, "Sends e-mails", "SMTP")
Rel(banking_system, mainframe, "Uses")
@enduml</code></pre>
<hr>
<h2 id="rackdiag"><a href="#/?id=rackdiag" data-id="rackdiag" class="anchor"><span>rackdiag</span></a></h2>
<pre v-pre data-lang="rackdiag"><code class="lang-rackdiag">
rackdiag {
  16U;
  1: UPS [2U];
  3: DB Server;
  4: Web Server;
  5: Web Server;
  6: Web Server;
  7: Load Balancer;
  8: L3 Switch;
}</code></pre>
<hr>

<h2 id="packetdiag"><a href="#/?id=packetdiag" data-id="packetdiag" class="anchor"><span>packetdiag</span></a></h2>
<pre v-pre data-lang="packetdiag"><code class="lang-packetdiag">packetdiag {
  colwidth = 32;
  node_height = 72;

  0-15: Source Port;
  16-31: Destination Port;
  32-63: Sequence Number;
  64-95: Acknowledgment Number;
  96-99: Data Offset;
  100-105: Reserved;
  106: URG [rotate = 270];
  107: ACK [rotate = 270];
  108: PSH [rotate = 270];
  109: RST [rotate = 270];
  110: SYN [rotate = 270];
  111: FIN [rotate = 270];
  112-127: Window;
  128-143: Checksum;
  144-159: Urgent Pointer;
  160-191: (Options and Padding);
  192-223: data [colheight = 3];
}</code></pre>
<hr>

<h2 id="nwdiag"><a href="#/?id=nwdiag" data-id="nwdiag" class="anchor"><span>nwdiag</span></a></h2>
<pre v-pre data-lang="nwdiag"><code class="lang-nwdiag">nwdiag {
  network dmz {
    address = "210.x.x.x/24"

    web01 [address = "210.x.x.1"];
    web02 [address = "210.x.x.2"];
  }
  network internal {
    address = "172.x.x.x/24";

    web01 [address = "172.x.x.1"];
    web02 [address = "172.x.x.2"];
    db01;
    db02;
  }
}
</code></pre>
<hr>

<h2 id="actdiag"><a href="#/?id=actdiag" data-id="actdiag" class="anchor"><span>actdiag</span></a></h2>
<pre v-pre data-lang="actdiag"><code class="lang-actdiag">actdiag {
  write -> convert -> image

  lane user {
    label = "User"
    write [label = "Writing text"];
    image [label = "Get diagram image"];
  }
  lane Kroki {
    convert [label = "Convert text to image"];
  }
}</code></pre>
<hr>

<h2 id="blockdiag"><a href="#/?id=blockdiag" data-id="blockdiag" class="anchor"><span>blockdiag</span></a></h2>
<pre v-pre data-lang="blockdiag"><code class="lang-blockdiag">blockdiag {
  Kroki -> generates -> "Block diagrams";
  Kroki -> is -> "very easy!";

  Kroki [color = "greenyellow"];
  "Block diagrams" [color = "pink"];
  "very easy!" [color = "orange"];
}</code></pre>
<hr>

<h2 id="seqdiag"><a href="#/?id=seqdiag" data-id="seqdiag" class="anchor"><span>seqdiag</span></a></h2>
<pre v-pre data-lang="seqdiag"><code class="lang-seqdiag">seqdiag {
  browser  -> webserver [label = "GET /seqdiag/svg/base64"];
  webserver  -> processor [label = "Convert text to image"];
  webserver &lt;-- processor;
  browser &lt;-- webserver;
}</code></pre>

`;
  const result = await replace(readmeContent, defaultConfig);
  const expectResult = `
<h1 id="example"><a href="#/?id=example" data-id="example" class="anchor"><span>Example</span></a></h1>
<hr>
<h2 id="plantuml"><a href="#/?id=plantuml" data-id="plantuml" class="anchor"><span>plantuml</span></a></h2>

<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eJxyKC5JLCopzc3hctS1c-JySM1LAXIAAAAA__8DAFefB4Q="></object></p>
<hr>
<h2 id="svgbob"><a href="#/?id=svgbob" data-id="svgbob" class="anchor"><span>svgbob</span></a></h2>

<p data-lang="svgbob"><object type="image/svg+xml" data="//kroki.io/svgbob/svg/eJyET1sOgDAI-_cU_G1LBP9N5kWM4SI9vB1Gja_YDzbSUorIHaZ9Fim9WsfO3Vl2Jp-yEvxMfkGFqE757lS2xw9wYBjHQeAIJl0MTRNtdJrdzLwVWbpHPA5ZDvELd4VHeIm9n0htZcSBoFb8uqLZUsvfr5bXbvc6VgAAAP__AwDWzT4n"></object></p>
<hr>
<h2 id="mermaid"><a href="#/?id=mermaid" data-id="mermaid" class="anchor"><span>mermaid</span></a></h2>
<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eJxMzr0OwiAcBPDdp7hRh9o30PTDj1ndmg6UEiBV_gRBU63vLnQwzr-7y0nHrMKlXgBFg8KMZARaZNlmqpiBEleLCeUSB4InSO1V6NacbvkYXsELrvLB0aCxigtl6qF640jPlOZkvNNdjG3xiV7NXjc4CUvOayPRBXlH-7Ndg7NiLonuBfunfbzXP4izudd-AQAA__8DAK8aOC8="></object></p>
<hr>
<h2 id="vega"><a href="#/?id=vega" data-id="vega" class="anchor"><span>vega</span></a></h2>
<p data-lang="vega"><object type="image/svg+xml" data="//kroki.io/vega/svg/eJyUVcuOmzAU3fMVyO2SEiYZ1JlIWfTdXT-gysLABdwajMCkQRH_Xts8jEmcppsQrs99nnPNxXFd9LaJcygw2rso57xq9pvNCTLsZ4TnbeQTthkAyro5hf6vhpXIk65_SMJz4fgcBOo9B5LlXBi2o6HCSULKTFhCz5GGBHOZ6af477oX9SusJS5A5uc4oqBCK_MJ0xaaGa5cUIw5ZKzuJP4D8lyEC9aWKulL71mAHw1gGFqBnwzg884K_GwAX5-swC8G8MUO_GrWaE_9zQA-vVqB383U7_sRd1RP-XYcWGlIVmLa3CGGMcpJtaJGnFzm5EiIwmQKTlByGRTVEPO9qKMBdoJaVtVWQgkqtHi2BTJ6uOnYcuG3dLz0yN5QjCnc6eesALod3lXKHuEy0daEFZjIri6TbieFuiglQBNpmQeuJ1HjMlPhhv2Y7XobAj8INVwQJEPxuoWhEe921d2q6ofqG_nX1ZUkhjHbdcXjBq_nic_LaQquawJKVChinLNCZhyK08Od21jCKaTcAHcTWCcrcP37BncTR1ITegZpLbLrCYwD0N1CGbNEKXUWmLBxocKlSRjPKsq6iftMK8fpErzprAQlltR06Ux4d51rzdrgtrX5TesY9DN-4aqXxug4JZSqgJM3ajgAjeTL7Ti5Wt9_hqkhWQZwls-1tidWOZwXrD7MGqbi6jKzxwPQHF2EG6CkBBM6iteEXvfzZrfbof-ZrFVLw0W7uFH9WVRaLIEfPiiX63CjbsQZS9MG5M6925rR1KRVQJv39Tx-VDgmvDMueEWjiNbw-Rp3D4eDO38rlrL0Vm7TyVO_ODjaNCPvBqd3nL8AAAD__wMAapI2eQ=="></object></p>
<hr>
<h2 id="vegalite"><a href="#/?id=vegalite" data-id="vegalite" class="anchor"><span>vegalite</span></a></h2>
<p data-lang="vegalite"><object type="image/svg+xml" data="//kroki.io/vegalite/svg/eJzsVktz2yAQvvtXMEyPqt9pnNz6To-d6c3jA5ZWEg0CF7Ba26P_3gVb2JJSt-6hTWZyEIL92CffSux6hNAXJs6hYPSW0NzalbkdDErIWD_jNl8v-1wN9hu89KXgFgbltP_VKEkjp5-AiTVfWY4CtHGnNN8qaZkQGxIrGTMLEp-ExDnT1hCbM0tMrr6ThKcpaJCW2M0KDFEpitAYWL7lMiMmZgJM_-CGWRfjDue4KplYg8H13K8J2VGfwWsaEbrE2XhWRU3oTQ1dXbWhtzU0nbShdzV0M2pD72to1oE-BF8dgx9raHTThu6Cwes29CkYHFceWeDoN9F8X-RQi91BkxZM3zvdmOtYAK0tUpCxSrC-oZpeumksUZByEInTXwZVL3dn5cRSFVwy0QSN0i4SuRaiIWc_uGk5cKZ4fO_EKRMGoiaWqIJx-QvQcivg4OcEqcK8OipQw7dwaXLf1kyiE2Z5Ca0MHSkfSKWhiA5_G1ashNL_Pq5WJbegFeJWr-E04oZpARnI5KHj258C_Xw-6d7p-2D6maXkv7NUdNigmczchvlsGJHRKxzGUxwmYxymw-HiUZK6m4b_YfkdBcvw13Yxs1OlC_9JpQmNzpJePJP-qZDe5hrw3iE6RxrymU-Q59fDxbmuGA_3DfHYeuGvszs2S8k1xwvY5e0SeuJLCOJPmgJHHwxFJSXKY3KdXEMtKZcJrDAIvDUe2-ZAowYYXFS9qvcTAAD__wMA4ft4Og=="></object></p>
<hr>
<h2 id="wavedrom"><a href="#/?id=wavedrom" data-id="wavedrom" class="anchor"><span>wavedrom</span></a></h2>
<p data-lang="wavedrom"><object type="image/svg+xml" data="//kroki.io/wavedrom/svg/eJxcTs0KwjAMvu8pQs8jtKiXgQfBJ_AqO8S1zLG6Kauusu7dbbDDn0AIyfeTb4KhqTuyBRwzgAk6upgCRGVbkcNSIz34eEWuEFvAnH_T9-Tow090j6v1xoct-gjpyIg_xNmQjqs49frJ01FjeTIuyj_bg7ndzeCSc7KVqBBlUCiXFL-iXdV2_WiNrk0UJpF6R5eKo2fl_AIAAP__AwCPW0Gr"></object></p>
<hr>
<h2 id="nomnoml"><a href="#/?id=nomnoml" data-id="nomnoml" class="anchor"><span>nomnoml</span></a></h2>
<p data-lang="nomnoml"><object type="image/svg+xml" data="//kroki.io/nomnoml/svg/eJxcjzELgzAQhff8ioxaULoVrLh06lDoHjKcGjUlGrlcKEJ-fBWRpoUbHu--d48TT41AKqhF3ayfqOD3iQKCbpP0OmtjoFdJGhjnolaArcwyMQOiJRl5RSU66w0fradBMsmYKKF2hNBQ9QAE3yqUZbGG9z7JDpHxc55fxKhdM2jVrYuXNWaZlHMyq774j4t-_Lecnvp1osMVP21gIHCkN2z_zb11n6QxF2UPVR4lHwAAAP__AwD272W2"></object></p>
<hr>
<h2 id="graphviz"><a href="#/?id=graphviz" data-id="graphviz" class="anchor"><span>graphviz</span></a></h2>
<p data-lang="graphviz"><object type="image/svg+xml" data="//kroki.io/graphviz/svg/eJx8kM0OgjAQhO88xaYPoJEr8QTR-BsTH4CUsoFKsc3yczF9dxMELBI5zmTm2814qcyImxwieHkAVZN8pFBNVSPFprMBFE9QwRbYiXQhWdCZs7TY9HGncEdqkfoGwE4qTJDXg54xMhF_KQ4n0qJAWv_gAI685YOyC1B_AXpBKrlMHSq76hRXj8q1bo0xWOPkOgtz0iWy6Qf2zzz-fJ7wfBjLe634MwtGhPWs9wYAAP__AwCopHCv"></object></p>
<hr>
<h2 id="erd"><a href="#/?id=erd" data-id="erd" class="anchor"><span>erd</span></a></h2>
<p data-lang="erd"><object type="image/svg+xml" data="//kroki.io/erd/svg/eJw0jEEKgCAQRff_FK0NF92jRXsJMZMcKAd0Irx9grX6PPjvmSXkwmmFSu4KiIGOKHj6jBtlifZk74Q4WdoBM3_UlMaepKKIkwDPd5JcgZ4clNbT8L9fAAAA__8DAIUCJBc="></object></p>
<hr>
<h2 id="ditaa"><a href="#/?id=ditaa" data-id="ditaa" class="anchor"><span>ditaa</span></a></h2>
<p data-lang="ditaa"><object type="image/svg+xml" data="//kroki.io/ditaa/svg/eJyUkLEOwjAQQ_d8hfeIv2BjZq0UoUOKQBSS0Ok-HlLSy11Rh1odGse2ngJU-UOTd_MZjCbuxjlTMoZN_G1UDd__RK835SLBqsmpgrQYWrw4pzTeonF6pjVXWwoLw_wtecTH9R4KOTHUonQmvej3sB5jCWGbdQPWvA06MOOZxgvlbK95zfuTF7wPAAAA__8DAJJuU9c="></object></p>
<hr>
<h2 id="c4plantuml"><a href="#/?id=c4plantuml" data-id="c4plantuml" class="anchor"><span>c4plantuml</span></a></h2>
<p data-lang="c4plantuml"><object type="image/svg+xml" data="//kroki.io/c4plantuml/svg/eJx8Ur1uwjAQ3vMUVyYqUaY-AAUxdKBChc6RMZfEwrGR7yLo2_dinBAEZYvP39998YxYBW5qm70Yp22zR1i85wvvGM88PbYXGRu2CJtfYqwhXcHeqDKoGgof4FNGwSHDXLmDcWXCZtkaA3k31g2xrzFMYNQhFmk0ktkHdADwBXCFsBPUBE6GKzhGCWXjDJTWvnFM09FrdjEZ7y6KOcWjyP2TJjpZ60_U2xGwB12hPrSuJtzIJ_18eeZxrYy9Gizf2jNQL7uVyCa6Ss6V0cGTLxiWZ10pVyLgkHCN3km7QopE0Vl13w-ib9gHJFDWdiVpGUDaXuzlR9SKjXcx_DfaQe13Hf0QksAElc-VPgygt6tu0O0p5W_bSpwvNGW18-Gu_CfsuMRqu75IPGL2PaR0M6HLA_wDAAD__wMAKi3tXg=="></object></p>
<hr>
<h2 id="rackdiag"><a href="#/?id=rackdiag" data-id="rackdiag" class="anchor"><span>rackdiag</span></a></h2>
<p data-lang="rackdiag"><object type="image/svg+xml" data="//kroki.io/rackdiag/svg/eJxcyL0OQDAYRuG9V_Hegn-pTYwGSdMYxPCpBiEkjTCIe6exSKeT8zBDau4nGnAxwItlZsMhK4HGl63dgKPIIbQ5tLEfctS6-0HkQuxCwlFu1COnhVb1WfpaAHFOuxozdj8AAAD__wMA5sIliw=="></object></p>
<hr>

<h2 id="packetdiag"><a href="#/?id=packetdiag" data-id="packetdiag" class="anchor"><span>packetdiag</span></a></h2>
<p data-lang="packetdiag"><object type="image/svg+xml" data="//kroki.io/packetdiag/svg/eJxskU9Pg0AQxe9-ijnqYRN2QVowHkyNf2LSErAxpjFmZaewoexWWORg_O4OkDQ9cH2_mXkzb44yr9ApLQv4vQDI7aHXypVwC764IcFYhZ8l6qJ0pC1II9Fj_DqGzHZNjpDYxg2VPGQ-j-EeW6eNdNqaE_IFC31qwO8ODbWsu_oLm4GEAYto1F1eGdsfUBU1GnfGo5BFEQ2VTsJmv29xsvJoA4_6Umyx-UE1iWEM2_QRdo110iGtKxbex4QW5LF6mUXLGJLsaRaRc5q9ziHu0Tnv61lEITw8zyPBuKBV3rRRth8lsWQ8oGxWJeZV29WjGAQUMJlvm2KII7HauCkPHtLlETlcbo5DxC1IoyCRSmlTXI0VkWBC0EQ1ZLajh56-59MWf_8AAAD__wMATgqIvQ=="></object></p>
<hr>

<h2 id="nwdiag"><a href="#/?id=nwdiag" data-id="nwdiag" class="anchor"><span>nwdiag</span></a></h2>
<p data-lang="nwdiag"><object type="image/svg+xml" data="//kroki.io/nwdiag/svg/eJx8zk0KgzAQhuF9TvGRA7RmKHQhPUnpImWCiBohChHFu_tHVPCHbBLyMO9Yz6lO0AnAmtqXLgMX7fwGNLMzVYUPJKno0UznSS8p5l9v_pHC9wQp-YtXQqeEFtLvuqmtjbM6P8bVm7Z4fFUP6qYeCAXC45D1RstGvRgAAAD__wMAi8RJVg=="></object></p>
<hr>

<h2 id="actdiag"><a href="#/?id=actdiag" data-id="actdiag" class="anchor"><span>actdiag</span></a></h2>
<p data-lang="actdiag"><object type="image/svg+xml" data="//kroki.io/actdiag/svg/eJxUTjkOwkAM7POK0fa8AEFDQUGNKBCFCdbKItmVjDkklL-zRwKks-em1i5CHu8GeKoYY7FGG8OD1fIpPXluEtlRYNxvrEWa_zN3WMHtE-YKVP3HL3NIvwQP45e507JoSt6fZsuGPECpr1wVDlPjTuNVxspp1s-9GZHcAIvzhOEDAAD__wMAAD5DgA=="></object></p>
<hr>

<h2 id="blockdiag"><a href="#/?id=blockdiag" data-id="blockdiag" class="anchor"><span>blockdiag</span></a></h2>
<p data-lang="blockdiag"><object type="image/svg+xml" data="//kroki.io/blockdiag/svg/eJxczDEKQjEQhOHeU4zpPYFoYesRxGJ9DiEkZmUjShDvrosi4ZXDfPynolM-J4l4LoC9aU5YbRFZaXJj8xF2juDK5NLCepTpS-60Dkrry8_9_w-TFjVsEKKRtbMUfYSjB-bRwV5TzT80ZAegJjXSyesNAAD__wMAptc71w=="></object></p>
<hr>

<h2 id="seqdiag"><a href="#/?id=seqdiag" data-id="seqdiag" class="anchor"><span>seqdiag</span></a></h2>
<p data-lang="seqdiag"><object type="image/svg+xml" data="//kroki.io/seqdiag/svg/eJxczrEKg0AMBuDdp_hxP24pXa7tUkpfoFvpcNeGQ7BNvYgK4rsbEVRcQsKfD36h6lP4iD4DQuJWKAHmgpaCro1ez9IHKnFGfr89YGUGVppogxc6HvKXU7yCif8Tv0mEt_zKP41r1NTpYBRfH2mPT8as2G1KTcHy5rJhBAAA__8DADXfPVE="></object></p>

`;
  console.log(result);
  assertEquals(result, expectResult);
});

it("plant", async () => {
  const md = `
@startuml
!include C4_Context.puml

title System Context diagram for Internet Banking System

Person(customer, "Banking Customer", "A customer of the bank, with personal bank accounts.")
System(banking_system, "Internet Banking System", "Allows customers to check their accounts.")

System_Ext(mail_system, "E-mail system", "The internal Microsoft Exchange e-mail system.")
System_Ext(mainframe, "Mainframe Banking System", "Stores all of the core banking information.")

Rel(customer, banking_system, "Uses")
Rel_Back(customer, mail_system, "Sends e-mails to")
Rel_Neighbor(banking_system, mail_system, "Sends e-mails", "SMTP")
Rel(banking_system, mainframe, "Uses")
@enduml
  `;

  const result = await plant(md, "plantuml", defaultConfig);
  console.log(result);

  const expectResult =
    `<object type="image/svg+xml" data="//kroki.io/plantuml/svg/eJx8Ur1uwjAQ3vMUVyYqUaY-AAUxdKBChc6RMZfEwrGR7yLo2_dinBAEZYvP3999cTYjVoGb2mYvxmnb7BEW7_nCO8YzT4_tRcaGLcLmlxhrSFewN6oMqobCB_iUUXDIMFfuYFyZsFm2xkDejXVD7GsMExh1iEUajWT2AR0AfAFcIewENYGT4QqOUULZOAOltW8c03T0ml1MxruLYk7xKHL_pIlO1voT9XYE7EFXqA-tqwk38kk_X555XCtjrwbLt_YM1MtuJbKJrpJzZXTw5AuG5VlXypUIOCRco3fSrpAiUXRW3feD6Bv2AQmUtV1JWgaQthd7-RG1YuNdDP-NdlD7XUc_hCQwQeVzpQ8D6O2qG3R7SvnbthLnC01Z7Xy4K_8JOy6x2q4vEo-YfQ8p3Uzo7QME-AMAAP__AwANee2y" />`;

  assertEquals(result, expectResult);
});
