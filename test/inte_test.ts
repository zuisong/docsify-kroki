import { assertEquals } from "deno_std/assert/assert_equals.ts";
import { beforeEach, it } from "deno_std/testing/bdd.ts";
import { defaultConfig, plant, replace } from "../src/kroki.ts";
import { init } from "./common/dom-env-init.ts";

beforeEach(async () => {
  await init();
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

<p data-lang="plantuml" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNpzKC5JLCopzc3hctS1c-JySM1LAXIAV58HhA=="></object></p>
<hr>
<h2 id="svgbob"><a href="#/?id=svgbob" data-id="svgbob" class="anchor"><span>svgbob</span></a></h2>

<p data-lang="svgbob" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/svgbob/svg/eNqFj0sOgDAIRPeegl01Edyb1IsYw0Xm8A6oib_oLEqbNx1AHjLtW5GuV2v4cnceByE41CWfyRdUiOp0grtlK7Ts4odhHAeBI0m5BJoWxug0u5l5HLLECDcVtTbNL-yqaJnly1miZY4DQa34TUXE0svbr5fbbvs6VtbNPic="></object></p>
<hr>
<h2 id="mermaid"><a href="#/?id=mermaid" data-id="mermaid" class="anchor"><span>mermaid</span></a></h2>
<p data-lang="mermaid" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eNpNzr0OwiAcBPDdp7hRh9o30PTDj1ndmg6UEiBV_gRBU63vLnQwzr-7y0nHrMKlXgBFg8KMZARaZNlmqpiBEleLCeUSB4InSO1V6NacbvkYXsELrvLB0aCxigtl6qF640jPlOZkvNNdjG3xiV7NXjc4CUvOayPRBXlH-7Ndg7NiLonuBfunfbzXP4izudd-Aa8aOC8="></object></p>
<hr>
<h2 id="vega"><a href="#/?id=vega" data-id="vega" class="anchor"><span>vega</span></a></h2>
<p data-lang="vega" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/vega/svg/eNqNVUuSmzAQ3fsUlJLlxMb2uDLjKi_yzy4HSM1CBgFKBKJAOHa5fPeoG4QkPp7xBtN6_X2vxXURBOR9HWUsp2QfkEypst6vVieW0mXKVdYcl1yuWgBaV6fd8k8tC_IArv94rDLt-BiG-J4xnmZKGzadoaRxzItUW3YPCzDEVEGm3_p_EEB6-JGC5gzyK3oUDEOj-URFw-oeji4kooqlsroA_hN5CAjNZVNg0qebcR0CP3vA3W4W-MUDPm5ngV894PN6FvjNAz7NA7_7Nc6n_uEB18-zwJ9-6o-3DveCT3h7aVmpeVpQYSc9JkZKoXg5oEafXPvkRIvCZ4qdWKEgKKlYpPa6jprJE6ugqqbUSsDQ-tnkxOth0rFR2s91vN7IfEMRFY5yRv2cEWDbUZcS7UdaxNYay5xy6OpqdGsUGpCEMxGDpR-4nURFixTDtfvR2-02hMtQL4SBa4IglKoa1jbSHo2qvgyqflN9Hf-2uoJHEA2yjSvuNng4T3p2p6m5rrimCCcmlZI5ZGyLs8Pt23DhgiXAowV3PbnJclr9neDOcASasDNIKp3dTqAbgO2WFZGMUam9wLRNaRW6Jm08Y5RhE_eZRkdzCU46o6D0kvousJ0O3PB6h7XWbTPnZ9YxNBvRiwgd-6XxOk64EBjQeJNaMSaO8DIdJ8P1fTVMxWI3QPevfQ61bVhV7Oyw-mbWqNBXl589aoH-6I60ZoIXGNJCO_H60HE_77bb7cxEpic7q6X2onVu1GUvKiuWcOl-n-7JZRyu040-k0lSM9i5Dxs_Gk4aA855j-fxq6QRV1CHveDbu1qxGhcbr_HgcDgE_bfClaUbEdzMydqO1VzjE5qBu2FxWyz-A2qSNnk="></object></p>
<hr>
<h2 id="vegalite"><a href="#/?id=vegalite" data-id="vegalite" class="anchor"><span>vegalite</span></a></h2>
<p data-lang="vegalite" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/vegalite/svg/eNrtVklz2yAUvvtXMEyPrvc0Tm7d02NnevPkgBGSXoPABezWzvi_94EkLMlpWveQZSYHIXjf2xeJ2x4h9JXluSgYvSQ0d25lL4fDjcjYIAOXr5cD0MOSIVBfS3BiuJkNvlutaN_LJ8JyAysHSEAdV9rATivHpNwSrhVnTih8EsJzZpwlLmeO2Fz_JAmkqTBCOeK2K2GJTpGEyoSDHaiMWM6ksIPKDHPeR-8ynjZMroXF8yKcCbmlIYK3tE_oEneT-d6LNaB3NXR21oXe19Bs2oU-1NDFuAt9rKH5EfQp2jpS-LmGxhdd6CoqPO9CX6LCyT4g17gGJpqXSY65KDOEQMHMjZflYLgUIYuBLhTXCeY3ZjNQt60jElIQMvHyyyga6L5Wnqx0AYrJNmi18Z6otZQtOvsFvlpNA14V8BtPTpm0osnv660LBr6j7gIdOIyotNNAytSE3UGAWth53pOC-7FmCo0wB5tD5kptvinvCKUliAb_6hbXUpuH96uTyZ0wGnFn1qLpcUu1FJlQ3quj8pVVoF_vD7rale9K9UuXPn6XNtJd4YapzDMs5qM-Gb_BZTLDZTrBZTYa-Y_O02vq4zDCDytwFCzDX9vJnZ1qU4RPKk26ujtNj_uXpn8eTe9yI_Degcr_FM9iin1-Prq-byomo3Igntos_Hd0h2HZgAG8gJ0-LnEmvkUn_mUocA3OUBTSEuON17turDGXFFQiVugE3hoPY1O1UQuMJva9fe834ft4Og=="></object></p>
<hr>
<h2 id="wavedrom"><a href="#/?id=wavedrom" data-id="wavedrom" class="anchor"><span>wavedrom</span></a></h2>
<p data-lang="wavedrom" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/wavedrom/svg/eNpdTs0KwjAMvu8pQs8jdKiXgQfBJ_AqO8S1zLG6KZuusu7dTaBDXSCE5PvJN0FfVy25HM4JwAQt3WwOqnSNSmGpkV5yvKNU4FYwp7_0Iw305Ue6x81258MePUOGGfxDXS0ZXtWlM2-ZA9VOpuCqWNme7ONp-yE6R1uNGaIOGeolxb_oUDZtNzprKsvCKGKJRNeZRE-K-QOPW0Gr"></object></p>
<hr>
<h2 id="nomnoml"><a href="#/?id=nomnoml" data-id="nomnoml" class="anchor"><span>nomnoml</span></a></h2>
<p data-lang="nomnoml" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/nomnoml/svg/eNpdjzELgzAQhff8ioxaULoVrLh06lDoHjKcGjUlGrlcKEJ-fBWRpoUbHu--d48TT41AKqhF3ayfqOD3iQKCbpP0OmtjoFdJGhjnolaArcwyMQOiJRl5RSU66w0fradBMsmYKKF2hNBQ9QAE3yqUZbGG9z7JDpHxc55fxKhdM2jVrYuXNWaZlHMyq774j4t-_Lecnvp1osMVP21gIHCkN2z_zb11n6QxF2UPVR4lH_bvZbY="></object></p>
<hr>
<h2 id="graphviz"><a href="#/?id=graphviz" data-id="graphviz" class="anchor"><span>graphviz</span></a></h2>
<p data-lang="graphviz" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/graphviz/svg/eNp9kMsKwjAQRff5iiEfoOhWXFkUnwh-QEnToY1NTZg-NtJ_F5s-ooVuBu5l7pnLsFglJGwKAbwZQFFFTkpdFSVSaFsbQIsINWyBn8lkim9ac7ItV926F3gg1UhdAmCvNEYoyl5PGIkMR4rHCYzMkJZ_OICTqEWvmhnoegZ6RcqFij0qv5kYF8_Ct-6VtVjiz3W-S8nkODiugZvT94wdhga7y3EIH4wWr8SpL6JhDfsAqKRwrw=="></object></p>
<hr>
<h2 id="erd"><a href="#/?id=erd" data-id="erd" class="anchor"><span>erd</span></a></h2>
<p data-lang="erd" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/erd/svg/eNqLDkgtKs7Pi-XSykvMTeXKSM1MzyjhKodQ2kmZRSUZ8Tn5yYklmfl58ZkpXFzRPlAeUAuQn5xZUslVXJJYksqVnF-aV1JUycUFMVJBS1fXUAGmGgCFAiQX"></object></p>
<hr>
<h2 id="ditaa"><a href="#/?id=ditaa" data-id="ditaa" class="anchor"><span>ditaa</span></a></h2>
<p data-lang="ditaa" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/ditaa/svg/eNpTAANtXSjQ5oII1EAoIAMhEFqcWoQigKoCwwwQiAOyi1ILS1OLS-AKQaAMyIZrgOuCmwk3GCziXZSfnYkiglAD1YlmFpKzFOLACKZeITMvLSexJBUmCzQOYSJcTxmyiVjMx-1Wl8ySxETcbsXhWJSwgbgZ6rqCovzk1OJiVGmYuWi6YOZqcwEAkm5T1w=="></object></p>
<hr>
<h2 id="c4plantuml"><a href="#/?id=c4plantuml" data-id="c4plantuml" class="anchor"><span>c4plantuml</span></a></h2>
<p data-lang="c4plantuml" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/c4plantuml/svg/eNp9UktuwjAQ3ecUU1ZUoqx6AApi0QUVKnQdGTNJLBwPsieC3r5j4_ARlF38_H5-yiSw8ty1tngxTttuizB7L2fkGI883seLgg1bhNVvYGwhX8HWqNqrFiry8CmQd8gwVW5nXJ25RbFEH8gNdReYWvQjGPSMWYYGgn1ATwCqgBuEjbBGcDDcwD5ZKJswUFpT5ziMB6_FKWQYcXEsQzqK3T9tUpK1dAjnuABMoBvUu5hq_I199i_nRx62ythLwPwtnuF0jrZrqWxSqvRcGO0pUMUwP-pGuRoBrwWX6r21q2RIFJ9F__2g-orJYwBlbT-SFiCtEokiJN8qNuRS-W-0V7PfbfQTMAhNWOVU6d0V9fapK3TbkPvHtbLmC03dbMjfjf9EnR6xWC9PFo-U5x1yu4nI5Qf8Ayot7V4="></object></p>
<hr>
<h2 id="rackdiag"><a href="#/?id=rackdiag" data-id="rackdiag" class="anchor"><span>rackdiag</span></a></h2>
<p data-lang="rackdiag" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/rackdiag/svg/eNrjKkpMzk7JTExXqOZSUDA0C7UGUVYKoQHBCtFGobEgrrGVgouTQnBqUVlqEYhvYqUQnpqEJGCKLmCGLmBupeCTn5ii4JSYk5iXDBGzAIoZKwSXZ5YkZ1hz1QIA5sIliw=="></object></p>
<hr>

<h2 id="packetdiag"><a href="#/?id=packetdiag" data-id="packetdiag" class="anchor"><span>packetdiag</span></a></h2>
<p data-lang="packetdiag" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/packetdiag/svg/eNptkU9Pg0AQxe9-ijnqYRN2QVowHkyNf2LSErAxpjFmZaewoexWWORg_O4OkDQ9cH2_mXkzb44yr9ApLQv4vQDI7aHXypVwC764IcFYhZ8l6qJ0pC1II9Fj_DqGzHZNjpDYxg2VPGQ-j-EeW6eNdNqaE_IFC31qwO8ODbWsu_oLm4GEAYto1F1eGdsfUBU1GnfGo5BFEQ2VTsJmv29xsvJoA4_6Umyx-UE1iWEM2_QRdo110iGtKxbex4QW5LF6mUXLGJLsaRaRc5q9ziHu0Tnv61lEITw8zyPBuKBV3rRRth8lsWQ8oGxWJeZV29WjGAQUMJlvm2KII7HauCkPHtLlETlcbo5DxC1IoyCRSmlTXI0VkWBC0EQ1ZLajh56-59MWf_9OCoi9"></object></p>
<hr>

<h2 id="nwdiag"><a href="#/?id=nwdiag" data-id="nwdiag" class="anchor"><span>nwdiag</span></a></h2>
<p data-lang="nwdiag" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/nwdiag/svg/eNrLK0_JTExXqOZSUMhLLSnPL8pWSMmtAvMVFBJTUopSi4sVbBWUjAwN9CpAUN_IRIkLLFuemmRgqBCNRZGhUqw1XIkRViVGECW1SPZm5pWkFuUl5mBabmhuhLDcGpftMFV4bIcpgdquoJACNATOMoK4qJYLAIvESVY="></object></p>
<hr>

<h2 id="actdiag"><a href="#/?id=actdiag" data-id="actdiag" class="anchor"><span>actdiag</span></a></h2>
<p data-lang="actdiag" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/actdiag/svg/eNpVTjkOwkAM7POK0fa8AEFDQUGNKBCFCdbKItmVjDkklL-zRwKks-em1i5CHu8GeKoYY7FGG8OD1fIpPXluEtlRYNxvrEWa_zN3WMHtE-YKVP3HL3NIvwQP45e507JoSt6fZsuGPECpr1wVDlPjTuNVxspp1s-9GZHcAIvzhOEDAD5DgA=="></object></p>
<hr>

<h2 id="blockdiag"><a href="#/?id=blockdiag" data-id="blockdiag" class="anchor"><span>blockdiag</span></a></h2>
<p data-lang="blockdiag" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/blockdiag/svg/eNpdzDEKQjEQhOHeU4zpPYFoYesRxGJ9DiEkZmUjShDvrosi4ZXDfPynolM-J4l4LoC9aU5YbRFZaXJj8xF2juDK5NLCepTpS-60Dkrry8_9_w-TFjVsEKKRtbMUfYSjB-bRwV5TzT80ZAegJjXSyesNptc71w=="></object></p>
<hr>

<h2 id="seqdiag"><a href="#/?id=seqdiag" data-id="seqdiag" class="anchor"><span>seqdiag</span></a></h2>
<p data-lang="seqdiag" style="max-width: inherit;"><object type="image/svg+xml" data="//kroki.io/seqdiag/svg/eNorTi1MyUxMV6jmUlBIKsovL04tUlDQtVMoT00CMsuAvOicxKTUHAVbBSV31xAFfagG_eKydP2kxOJUMxOlWGugZoQGkPaCovzk1OLifGTtzvl5QOkShZLUCiCRr5CZm5ieiq7ZRlcXoRkkBXMUSAKuzJqrFgA13z1R"></object></p>

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

  const result = await plant(md, "plantuml", defaultConfig.serverPath);
  console.log(result);

  const expectResult = `<object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNp9UktuwjAQ3ecUU1ZUoqx6AApi0QUVKnQdGTNJLBwPsieC3r5j4_ARlF38_H5-SjEJrDx3rS1ejNO22yLM3ssZOcYjj_fxomDDFmH1GxhbyFewNar2qoWKPHwK5B0yTJXbGVdnblEs0QdyQ90Fphb9CAY9Y5ahgWAf0BOAKuAGYSOsERwMN7BPFsomDJTW1DkO48FrcQoZRlwcy5COYvdPm5RkLR3COS4AE-gG9S6mGn9jn_3L-ZGHrTL2EjB_i2c4naPtWiqblCo9F0Z7ClQxzI-6Ua5GwGvBpXpv7SoZEsVn0X8_qL5i8hhAWduPpAVIq0SiCMm3ig25VP4b7dXsdxv9BAxCE1Y5VXp3Rb196grdNuT-ca2s-UJTNxvyd-M_UadHLNbLk8Uj5XmH3G4i8vgDAvwBDXntsg==" />`;

  assertEquals(result, expectResult);
});
