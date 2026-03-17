import { useState, useRef } from "react";

const Q = [
  { n:1,  p:"Leadership",            w:3,   t:"Executive Sponsorship", sub:"How involved is executive leadership?",
    a:["No executive sponsor. Leadership is unaware of experimentation as a capability.","A sponsor exists but is minimally involved with little strategic direction.","Leadership provides some support but engagement is inconsistent.","Executives actively support experimentation, allocate resources, and set expectations.","Leadership champions experimentation as a core capability across the organization."]},
  { n:2,  p:"Leadership",            w:2.5, t:"Team Capability and Influence", sub:"How skilled and influential is the experimentation team?",
    a:["No dedicated expertise. Tools may exist but the team cannot use them effectively.","One or two people own it part-time with limited influence and organizational barriers.","A small team exists but their influence on strategy is still limited.","The team is experienced, respected, and helps guide strategy and remove obstacles.","The team is a center of excellence shaping product, marketing, and CX strategy."]},
  { n:3,  p:"Culture",               w:3,   t:"Culture and Learning Orientation", sub:"How does the organization view experimentation and learning?",
    a:["Testing is used mainly to validate opinions or justify decisions already made.","Ideas are tested but hierarchy and strong opinions still drive many decisions.","The org is becoming more open to challenging assumptions, though not universally.","Teams are comfortable being wrong and view experimentation as a way to learn.","Experimentation is deeply embedded. Teams pursue learning as much as wins."]},
  { n:4,  p:"Culture",               w:3,   t:"Data-Driven Decision Making", sub:"How strongly does data influence experimentation decisions?",
    a:["Decisions are driven by opinions or assumptions rather than data.","Data is available but often ignored or used selectively to support decisions already made.","Data informs many decisions but analytics mistrust sometimes limits its influence.","Reliable analytics are used to identify opportunities, prioritize tests, and interpret results.","Data consistently drives decisions across the entire experimentation lifecycle."]},
  { n:5,  p:"Strategy",              w:3,   t:"Goals and Strategic Alignment", sub:"How well are experiments aligned with business goals?",
    a:["Experiments lack defined success metrics and have no clear strategic direction.","Metrics are defined inconsistently and experimentation is largely opportunistic.","Most experiments have defined metrics but alignment with objectives is inconsistent.","Experiments are aligned with KPIs tied to business objectives.","Experimentation is a core mechanism for executing business strategy."]},
  { n:6,  p:"Strategy",              w:2,   t:"Research and User Understanding", sub:"How well does the org understand customer behavior and needs?",
    a:["Little or no research is conducted to understand user behavior or customer needs.","Basic analytics are reviewed occasionally but deeper behavioral insights are limited.","Both quantitative and qualitative insights are sometimes used to inform experimentation.","Customer insights from analytics, research, and VoC regularly inform experimentation.","Deep customer understanding drives experimentation strategy continuously."]},
  { n:7,  p:"Strategy",              w:2,   t:"Funnel and Journey Analysis", sub:"How well does the org analyze and optimize the customer journey?",
    a:["Customer journeys and funnels are not analyzed.","Basic funnel reports exist but rarely influence experimentation.","Key funnel stages are monitored and occasionally guide testing opportunities.","Funnel analysis regularly identifies friction points and guides experimentation strategy.","The entire customer journey is continuously analyzed and optimized through experimentation."]},
  { n:8,  p:"Strategy",              w:2,   t:"Ideation and Hypothesis Quality", sub:"How are experiment ideas generated and structured?",
    a:["Ideas are based mostly on opinions without clear problem definition.","Some data informs ideas but hypotheses are vague or poorly defined.","Ideas are increasingly supported by evidence and hypotheses begin to guide experimentation.","Experiments are based on clearly defined problems and structured hypotheses.","Ideation is systematic and insight-driven with hypotheses that guide iterative learning."]},
  { n:9,  p:"Strategy",              w:1.5, t:"Prioritization and Roadmap", sub:"How are experiments prioritized and planned?",
    a:["No structured roadmap. Experiments occur randomly or reactively.","Ideas are tracked but prioritization is inconsistent or influenced by internal pressure.","Experiments are prioritized using basic criteria such as impact and effort.","Prioritization considers business value, effort, customer impact, and strategic alignment.","A shared roadmap evolves continuously as insights emerge and priorities shift."]},
  { n:10, p:"Strategy",              w:1.5, t:"Content and Messaging Experimentation", sub:"How systematically does the org test messaging and content?",
    a:["Content decisions are made by opinion. Nothing is tested.","Some content elements are occasionally tested with no structured approach.","Headlines, CTAs, and value props are tested periodically with some learnings applied.","Content experimentation is integrated into the roadmap and systematically iterated.","Content strategy is tightly integrated with experimentation across all channels."]},
  { n:11, p:"Methodology & Process", w:2.5, t:"Testing Methodology", sub:"How strong is the experimentation methodology?",
    a:["Experiments are simple comparisons with no structured methodology.","Some practices exist but are applied inconsistently.","Basic experimentation methods are understood though design quality varies.","Experiments are thoughtfully designed using appropriate methods and clear hypotheses.","A strong methodology guides all tests and evolves through continuous learning."]},
  { n:12, p:"Methodology & Process", w:1.5, t:"Personalization and Segmentation", sub:"How sophisticated is segmentation and personalization?",
    a:["No targeting or personalization is used.","Basic segmentation is used but decisions are largely opinion-based.","Some personalization is based on meaningful behavioral differences between segments.","Segmentation and personalization are strategically applied where they create measurable value.","Personalization is integrated across key experiences and informed by data and experimentation."]},
  { n:13, p:"Methodology & Process", w:1.5, t:"Technical Capability", sub:"How well does the technology environment support experimentation?",
    a:["Technical limitations make experimentation difficult or slow.","Simple tests can be implemented but complex experiments are challenging.","Technical capabilities support most experimentation needs, though some constraints remain.","The technology stack is well structured to support experimentation efficiently.","Systems and architecture are designed to enable fast, flexible experimentation."]},
  { n:14, p:"Methodology & Process", w:2,   t:"Statistical Discipline", sub:"How well are experiment results interpreted?",
    a:["Results are misunderstood or decisions are made prematurely.","Surface-level indicators drive decisions without statistical understanding.","Basic statistical concepts are understood, though interpretation is sometimes inconsistent.","Teams apply sound statistical principles when evaluating experiment results.","The org demonstrates strong statistical discipline and understands variance and significance."]},
  { n:15, p:"Methodology & Process", w:2.5, t:"Execution Velocity", sub:"How quickly can experiments move from idea to launch?",
    a:["Experiments take months to launch due to process or technical constraints.","Experiments launch occasionally but require significant coordination and effort.","Experiments launch regularly but speed is limited by processes or dependencies.","Experiments move quickly from concept to launch with efficient processes.","The org can run multiple experiments simultaneously with quality and measurement integrity."]},
  { n:16, p:"Methodology & Process", w:1.5, t:"Testing Scope and Channel Reach", sub:"How broadly does experimentation extend across channels?",
    a:["Experimentation is limited to a single channel and does not extend to other touchpoints.","Occasional tests occur on additional channels but there is no coordinated approach.","Experimentation spans several channels though each operates somewhat independently.","Experimentation is coordinated across multiple channels with some unified strategy.","A unified strategy spans all relevant digital channels and platforms."]},
  { n:17, p:"Methodology & Process", w:2,   t:"Operationalizing Winners", sub:"How effectively are experiment results implemented?",
    a:["Experiment results rarely lead to permanent changes.","Winning experiences are sometimes implemented but often delayed or abandoned.","A process exists to implement winners but execution is inconsistent.","Winning experiences are regularly implemented within normal release cycles.","Experimentation results consistently drive product and experience improvements."]},
  { n:18, p:"Methodology & Process", w:2,   t:"Documentation and Knowledge Management", sub:"How well are experiment learnings captured and shared?",
    a:["Experiment results are poorly documented and rarely shared.","Results are communicated informally and knowledge is easily lost.","Results are documented but sharing and reuse of learnings is inconsistent.","Results and insights are regularly shared and stored in accessible repositories.","Experimentation knowledge is systematically captured, shared, and used to guide future decisions."]},
  { n:19, p:"People & Skills",       w:1.5, t:"Team Development", sub:"How well does the org invest in growing experimentation skills?",
    a:["No investment in training. The team learns through trial and error with no structured support.","Occasional informal training happens but skill development is not intentional or consistent.","Some training resources are used but there is no formal development plan.","The org actively invests in building skills through training, mentorship, and structured onboarding.","Experimentation expertise is continuously developed and spread across teams."]},
  { n:20, p:"People & Skills",       w:2.5, t:"Organizational Alignment", sub:"How well is the org structured to support experimentation?",
    a:["Resources and incentives are misaligned and experimentation struggles for support.","Experimentation receives limited resources and competes with other priorities.","Some resources are allocated but organizational coordination is inconsistent.","Teams across the org support experimentation and collaborate effectively.","Experimentation is supported across business units with aligned incentives and shared goals."]},
];

const PILLARS = ["Leadership","Culture","Strategy","Methodology & Process","People & Skills"];
const PCOL = {"Leadership":"#553C9A","Culture":"#2C7A7B","Strategy":"#2B6CB0","Methodology & Process":"#276749","People & Skills":"#C05621"};
const LETTERS = ["A","B","C","D","E"];
const MAX = 215;

function score(ans) {
  let tot = 0;
  const pt = {}, pm = {};
  PILLARS.forEach(p => { pt[p]=0; pm[p]=0; });
  Q.forEach((q,i) => {
    const v = (ans[i]+1)*q.w;
    tot += v;
    pt[q.p] += v;
    pm[q.p] += 5*q.w;
  });
  const overall = Math.round((tot/MAX)*100);
  const pillar = {};
  PILLARS.forEach(p => { pillar[p] = Math.round((pt[p]/pm[p])*100); });
  const perQ = Q.map((_,i) => Math.round(((ans[i]+1)/5)*100));
  return { overall, pillar, perQ };
}

function stage(s) {
  if (s>=90) return { label:"Optimized",    color:"#2B6CB0" };
  if (s>=75) return { label:"Advanced",     color:"#276749" };
  if (s>=60) return { label:"Progressing",  color:"#B7791F" };
  if (s>=40) return { label:"Developing",   color:"#C05621" };
  return              { label:"Foundational",color:"#C53030" };
}

function focusAreas(ans, n=5) {
  return Q.map((q,i) => {
    const gap = 5-(ans[i]+1);
    const tier = q.w>=3?1:q.w>=2.5?2:q.w>=2?3:4;
    const boost = tier===1?1.4:tier===2?1.15:1;
    return { i, score: gap*q.w*boost };
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,n).map(x=>x.i);
}

// CALL 1: narrative sections
function buildNarrativePrompt(ans, sc, fi) {
  const allA = Q.map((q,i)=>
    `Q${q.n} (${q.p}, ${q.w}x): "${q.t}" - Answer ${LETTERS[ans[i]]}: "${q.a[ans[i]]}"`
  ).join("\n");
  const focTitles = fi.map(i=>`Q${Q[i].n}: "${Q[i].t}"`).join(", ");
  const pil = PILLARS.map(p=>`${p}: ${sc.pillar[p]}/100`).join(" | ");
  return `You are an experimentation program consultant with 20+ years of experience. Direct, empathetic, authoritative. No hedging. No flattery. Second person throughout. No bullet points. No em dashes.

A marketing leader completed a 20-question experimentation maturity assessment.

OVERALL SCORE: ${sc.overall}/100
PILLAR SCORES: ${pil}

ALL ANSWERS:
${allA}

PRIORITY FOCUS AREAS (titles only, for reference): ${focTitles}

Write EXACTLY these four sections:

## What Your Score Reveals
Exactly 3 sentences. Sentence 1: state their score and maturity stage by name. Sentence 2: describe what the specific combination of high and low answers reveals. Sentence 3: one honest observation about what this pattern means at this stage.

## The Pattern in Your Program
Exactly 4 sentences. Identify the single systemic pattern running through all their answers that they probably cannot name themselves. Reference specific question titles. Be precise. Make them say "that is exactly what we are dealing with."

## Where You Are Strong
Exactly 2 sentences. Name 1 to 2 genuine strengths visible in their answers. Reference actual question titles. Do not flatter.

## What a Deeper Diagnostic Would Uncover
Exactly 3 sentences. Frame honestly what a 20-question tool cannot do that a real diagnostic engagement would. Be specific about what they would gain. Do not pitch.

No bullet points. No em dashes. Every sentence must be specific to this person's actual answers.`;
}

// CALL 2: single focus area
function buildFocusPrompt(ans, sc, qIdx) {
  const q = Q[qIdx];
  const pil = PILLARS.map(p=>`${p}: ${sc.pillar[p]}/100`).join(" | ");
  const allA = Q.map((q2,i)=>
    `Q${q2.n}: "${q2.t}" - ${LETTERS[ans[i]]}: "${q2.a[ans[i]]}"`
  ).join("\n");
  return `You are an experimentation program consultant with 20+ years of experience. Direct, authoritative. No hedging. No flattery. Second person. No bullet points. No em dashes.

Scores: ${pil}

All answers for context:
${allA}

FOCUS AREA:
Q${q.n}: "${q.t}" (${q.p}, weight ${q.w}x)
Their answer - ${LETTERS[ans[qIdx]]}: "${q.a[ans[qIdx]]}"

Write ONLY the following. Start with the ### heading, then exactly 3 sentences.

### ${q.t}
Sentence 1: name the specific problem this answer reveals and what it costs them. Be direct.
Sentence 2: one concrete actionable next step - a specific direction, not a menu of options.
Sentence 3: name exactly what stays broken if they do not address this.

Output only the ### heading and the 3 sentences. Nothing else at all.`;
}

const FOCUS_RECS = {
  1: "Executive involvement is the single biggest predictor of whether a program survives or quietly gets defunded. Your executive sponsor does not need to be an expert in testing, but they need to understand that experimentation is a business strategy, not a marketing task. Start by getting them aligned on the top-level KPIs and what success looks like, then build a simple communication cadence: a short monthly summary covering what was tested, what was learned, and where the roadmap is headed. When an executive can speak to the program's direction, it changes how every other team treats the work. Without that cover, you will keep running into roadblocks that no amount of methodology improvement can fix.",
  2: "The optimization team is the connective tissue between business strategy, customer data, and execution. A strong team needs to be able to communicate upward to executives, laterally to product and marketing, and downward to developers and creatives. If your team is limited in influence or capacity, the place to start is not with better tools but with building credibility: document results clearly, connect wins to revenue, and make the program's value visible. As influence grows, so does the ability to remove roadblocks, shape roadmaps, and get experimentation treated as a core business function rather than a side project.",
  3: "The biggest obstacle to a real experimentation culture is the habit of using tests to validate decisions that have already been made. When ideas come from opinions and hierarchy rather than evidence, the program is producing activity but not learning. The shift starts with a simple discipline: before any test launches, the team commits in writing to what result would constitute a win and what they will do with it. Making that pre-commitment visible removes the political pressure to interpret results selectively. Being wrong should be treated as useful information, not a failure.",
  4: "Being truly data-driven means letting data change your mind. Many organizations say they are data-driven but selectively engage with data, ignoring findings that challenge strongly held opinions or calling tests early when the numbers start trending the right way. The standard to aim for is data informing every phase of experimentation: research and opportunity discovery, hypothesis building, test design, and post-test interpretation. That requires both trustworthy analytics infrastructure and the cultural discipline to follow what the data says even when it is inconvenient.",
  5: "Experimentation without strategic alignment is organized guessing. If your tests are not explicitly connected to the business goals your leadership cares about most, you will always be fighting for resources, and the program will always feel like a nice-to-have rather than a growth driver. The executive's role is to define the focus areas. The optimization team's role is to translate those strategic priorities into hypotheses and a roadmap. When that connection is tight, every test has a reason to exist beyond someone's opinion, and results have a natural audience that is already invested in the outcome.",
  6: "The best test ideas come from understanding where customers are struggling and why. That means digging into your analytics for high-traffic pages with high exit rates, looking at funnel drop-off points, reviewing pathing flows, and layering in qualitative signals like session recordings and survey responses. Ideas that start with a real, data-backed problem produce stronger hypotheses and more meaningful results than ideas that start with what if we tried. Building a structured research practice that feeds the ideation process is one of the highest-leverage investments a program can make early in its development.",
  7: "You cannot optimize what you have not mapped. Understanding the customer journey means knowing where people enter, where they hesitate, where they fall out, and what triggers them to move forward or leave. When funnel analysis is treated as a continuous practice rather than an occasional audit, it surfaces specific, addressable friction points that become the raw material for your testing roadmap. The goal is not a perfect funnel map but a clear picture of where the biggest gaps between customer intent and customer action exist, because those gaps are where your highest-impact experiments live.",
  8: "A hypothesis is not a hunch dressed up in formal language. It is a specific, falsifiable prediction grounded in evidence about what is causing a problem and what change might fix it. Most programs underinvest here, moving too quickly from we should test this to let's build it. The discipline of writing a proper problem statement and hypothesis forces clarity that prevents scope creep during build and makes post-test analysis far more useful. When the whole team agrees on what question the test is trying to answer before a single pixel is moved, the results are much harder to misinterpret or dismiss.",
  9: "A roadmap is more than a prioritized list of ideas. It is a statement of strategic intent. The best roadmaps are aligned to business goals, sequenced around themes rather than scattered across random ideas, and flexible enough to absorb learnings from live tests without falling apart. Prioritization should weigh business impact, expected learning value, traffic availability, and implementation effort, not who asked the loudest or whose idea got there first. A living roadmap that is regularly reviewed and connected to what the business is trying to achieve this quarter is one of the clearest signs of a program built to compound.",
  10: "Messaging and copy are often the most underleveraged testing territory in a program. A headline, a CTA, a subject line, or a value statement can move conversion rates as dramatically as a layout change, sometimes more. Integrating content experimentation into the roadmap means treating messaging as a hypothesis-driven discipline, not a creative preference. Over time, systematic testing of how you talk about your product, your offer, and your audience builds a messaging framework grounded in what actually works rather than what someone in a conference room liked best.",
  11: "A sound testing methodology is the difference between results you can learn from and results you can argue about forever. That means writing clear hypotheses before building anything, designing tests to answer one question at a time, and running tests to proper statistical significance rather than calling them early when the numbers look good. When methodology is inconsistent, results become political and the program loses credibility. When methodology is sound and consistently applied, the data becomes the authority in the room, and the program earns the trust it needs to grow.",
  12: "Personalization without a foundation in real customer understanding is segmentation theater. Before investing in personalization sophistication, the program needs to answer: what meaningful behavioral differences exist between our segments, and do those differences warrant a different experience? Start with the segments that show the most divergent behavior in your analytics and test whether tailoring the experience to those differences produces measurable improvement. That is the evidence base that justifies broader personalization investment.",
  13: "Technical limitations are a program ceiling. If getting a test live requires weeks of developer time, navigating lengthy approval chains, or working around a fragile tech stack, velocity suffers and a slow program does not compound. The first priority is understanding where the bottlenecks actually live: is it the experimentation tool, the instrumentation, the deployment process, or the organizational approvals? The fix is usually a combination of a dedicated technical resource, a clear and efficient QA and launch process, and a gradual investment in instrumentation that makes testing faster and more flexible over time.",
  14: "Statistical discipline is what separates a program that learns from one that just produces numbers to argue about. The most common failure modes are calling tests early when they appear to be trending positively and misreading statistical significance as business significance. The standard to hold is simple: decide before the test launches what the minimum detectable effect is, what significance threshold you will require, and how long you will run it regardless of early results, and then stick to it. When those decisions are made in advance and respected, the results become trustworthy, and the program earns the credibility to influence real decisions.",
  15: "Test velocity is not about moving fast for its own sake. It is about increasing your rate of learning. A program that launches two well-designed tests per month learns faster than one that spends three months on a single test, and the compounding effect of that learning advantage is enormous over time. The barriers to velocity are usually process and technical, not strategic: development queues, approval chains, QA bottlenecks. Identifying the single biggest constraint in your current launch process and removing it is almost always the highest-leverage operational investment a maturing program can make.",
  16: "Most programs start on the website and never leave. But the customer journey moves through paid media, email, landing pages, onboarding flows, and sometimes mobile apps, and inconsistency across those touchpoints creates friction that no single-channel program can fully address. Expanding experimentation scope does not mean doing everything at once. It means identifying the channel where the gap between what the customer experiences and what the business intends is largest, and extending the program's reach there first. Over time, a coordinated multi-channel strategy produces a more consistent and optimized customer experience than isolated testing on any single channel.",
  17: "A winning test result that never gets implemented is not a win. It is a missed opportunity with a documented price tag. One of the most common and costly failures in experimentation programs is the gap between a called winner and a permanent change to the live experience. Fixing this requires a formal process: a winner gets an implementation ticket within a defined timeframe, there is a named person responsible for seeing it through, and the result is tracked until the change is live and confirmed. Without that process, the program generates learning that never reaches the customer.",
  18: "A testing program that does not document its results is a program that keeps starting over. Every test contains three things worth preserving: what was tested and why, what happened, and what the program learned and should do next. When that knowledge lives in someone's head or a Slack thread, it disappears when people change roles or priorities shift. A simple, accessible repository completed at the end of every test becomes the institutional memory of what your customers respond to, and it prevents the program from testing the same things repeatedly without building on prior learning.",
  19: "Experimentation is a skill, and skills atrophy without investment. When a program relies on one or two individuals who figured things out through trial and error, it is one personnel change away from losing years of accumulated knowledge. Building internal capability means creating structured onboarding for new team members, documenting the methodology so the program does not live only in people's heads, and creating ongoing learning opportunities so the team's skills keep pace with the program's ambitions. The goal is a program that is teachable, transferable, and resilient.",
  20: "Organizational alignment is what determines whether an experimentation program is a function or a force. When teams across the business understand what experimentation is trying to accomplish, know how to contribute to it, and are structured and incentivized to support it, the program can operate at a scale and speed that an isolated team never could. The barriers here are usually definitional: unclear ownership, competing priorities, misaligned incentives. An executive who actively coordinates across those teams and communicates that experimentation is part of how this organization makes decisions changes the structural reality the program is operating in.",
};

function parseReport(text) {
  const secs = [];
  let cur = null;
  for (const line of text.split("\n")) {
    if (line.startsWith("## ")) {
      if (cur) secs.push(cur);
      cur = { h: line.slice(3).trim(), subs: [], body: [] };
    } else if (line.startsWith("### ") && cur) {
      cur.subs.push({ h: line.slice(4).trim(), body: [] });
    } else if (line.trim() && cur) {
      if (cur.subs.length) cur.subs[cur.subs.length-1].body.push(line.trim());
      else cur.body.push(line.trim());
    }
  }
  if (cur) secs.push(cur);
  return secs;
}

function Ring({ s, st, size=110 }) {
  const r = size*0.42, cx = size/2, cy = size/2;
  const c = 2*Math.PI*r;
  const d = (s/100)*c;
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8edf2" strokeWidth={size*0.08}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={st.color} strokeWidth={size*0.08}
        strokeDasharray={`${d} ${c}`} strokeDashoffset={c*0.25} strokeLinecap="round"/>
      <text x={cx} y={cy-4} textAnchor="middle" fill={st.color} fontSize={size*0.19} fontWeight="700" fontFamily="Georgia,serif">{s}</text>
      <text x={cx} y={cy+size*0.13} textAnchor="middle" fill="#8896a7" fontSize={size*0.09} fontFamily="sans-serif">{st.label.toUpperCase()}</text>
    </svg>
  );
}

function Bar({ v, color, h=5 }) {
  return (
    <div style={{background:"#e8edf2",borderRadius:99,height:h,overflow:"hidden"}}>
      <div style={{width:`${Math.min(v,100)}%`,background:color,height:"100%",borderRadius:99}}/>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("intro");
  const [cur, setCur] = useState(0);
  const [ans, setAns] = useState(Array(20).fill(null));
  const [sc, setSc] = useState(null);
  const [fi, setFi] = useState([]);
  const [narrative, setNarrative] = useState("");
  const [focusRecs, setFocusRecs] = useState([]);
  const [loadingNarrative, setLoadingNarrative] = useState(false);
  const [loadingFocus, setLoadingFocus] = useState(false);
  const [loadingFocusIdx, setLoadingFocusIdx] = useState(-1);
  const topRef = useRef(null);
  const SN = "'system-ui',sans-serif";
  const BASE = {fontFamily:"Georgia,serif",background:"#f4f2ee",minHeight:"100vh",color:"#1a202c"};

  // stream a single API call, appending text via a setter callback
  async function streamCall(prompt, onChunk, maxTokens=800) {
    const res = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: maxTokens,
        stream: true,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const d = line.slice(6).trim();
        if (d === "[DONE]") continue;
        try {
          const j = JSON.parse(d);
          if (j.type === "content_block_delta" && j.delta?.text)
            onChunk(j.delta.text);
        } catch(_) {}
      }
    }
  }

  async function generate(finalAns) {
    const s = score(finalAns);
    const f = focusAreas(finalAns);
    setSc(s); setFi(f);
    setStep("loading");
    setNarrative(""); setFocusRecs([]);

    try {
      // CALL 1: narrative sections — flip to report on first chunk
      setLoadingNarrative(true);
      let flipped = false;
      await streamCall(
        buildNarrativePrompt(finalAns, s, f),
        chunk => {
          if (!flipped) {
            flipped = true;
            setStep("report");
            if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
          }
          setNarrative(p => p + chunk);
        },
        2000
      );
      setLoadingNarrative(false);

      // CALL 2: one call per focus area, sequentially
      setLoadingFocus(true);
      for (let k = 0; k < f.length; k++) {
        setLoadingFocusIdx(k);
        let text = "";
        await streamCall(
          buildFocusPrompt(finalAns, s, f[k]),
          chunk => {
            text += chunk;
            setFocusRecs(prev => {
              const next = [...prev];
              next[k] = text;
              return next;
            });
          }
        );
      }
      setLoadingFocusIdx(-1);
      setLoadingFocus(false);

    } catch(e) {
      setStep("report");
      setNarrative("## Error\n\nUnable to generate report. Please try again.");
      setLoadingNarrative(false);
      setLoadingFocus(false);
    }
  }

  function pick(i) {
    const next = [...ans]; next[cur] = i; setAns(next);
    if (cur < 19) setTimeout(()=>setCur(c=>c+1), 240);
    else setTimeout(()=>generate(next), 240);
  }

  function restart() {
    setStep("intro"); setCur(0); setAns(Array(20).fill(null));
    setSc(null); setFi([]); setNarrative(""); setFocusRecs([]);
    setLoadingNarrative(false); setLoadingFocus(false); setLoadingFocusIdx(-1);
  }

  // INTRO
  if (step==="intro") return (
    <div style={{...BASE,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 20px"}}>
      <div style={{maxWidth:600,width:"100%"}}>
        <div style={{fontFamily:SN,fontSize:10,letterSpacing:4,color:"#8896a7",textTransform:"uppercase",marginBottom:16}}>Growth Systems</div>
        <h1 style={{fontSize:"clamp(26px,5vw,40px)",fontWeight:700,lineHeight:1.15,margin:"0 0 20px",color:"#0f1923"}}>
          Experimentation Program<br/><span style={{color:"#2B6CB0"}}>Maturity Assessment</span>
        </h1>
        <p style={{fontSize:16,lineHeight:1.75,color:"#4a5568",margin:"0 0 14px"}}>
          Most companies run tests. Very few have a real experimentation program. The gap is costing you growth you cannot see.
        </p>
        <p style={{fontSize:16,lineHeight:1.75,color:"#4a5568",margin:"0 0 32px"}}>
          This 20-question assessment scores your program across five dimensions and generates a personalized diagnostic report with your scores, the pattern in your program you may not have named yet, and the specific areas that will move the needle most.
        </p>
        <div style={{display:"flex",gap:28,marginBottom:36,flexWrap:"wrap"}}>
          {[["20","Questions"],["5","Dimensions"],["~8 min","Duration"],["Free","Report"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:"#2B6CB0",fontFamily:SN}}>{v}</div>
              <div style={{fontSize:11,color:"#8896a7",fontFamily:SN,letterSpacing:1,textTransform:"uppercase"}}>{l}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:13,color:"#8896a7",fontStyle:"italic",marginBottom:28,fontFamily:SN}}>
          Answer honestly. Describe where you are today, not where you aspire to be.
        </p>
        <button onClick={()=>setStep("quiz")} style={{background:"#1a365d",color:"#fff",border:"none",borderRadius:8,padding:"14px 36px",fontSize:15,fontFamily:SN,fontWeight:600,cursor:"pointer"}}>
          Begin Assessment
        </button>
      </div>
    </div>
  );

  // QUIZ
  if (step==="quiz") {
    const q = Q[cur];
    const done = ans.filter(x=>x!==null).length;
    const bgC = ["#FFF5F5","#FFFAF0","#FFFFF0","#F0FFF4","#EBF8FF"];
    const bdC = ["#FC8181","#F6AD55","#F6E05E","#68D391","#63B3ED"];
    const lbC = ["#C53030","#C05621","#975A16","#276749","#2B6CB0"];
    return (
      <div style={{...BASE,padding:"32px 20px"}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
            <div style={{fontFamily:SN,fontSize:10,letterSpacing:4,color:"#8896a7",textTransform:"uppercase"}}>Growth Systems</div>
            <div style={{fontFamily:SN,fontSize:12,color:"#8896a7"}}>{cur+1} / 20</div>
          </div>
          <div style={{background:"#e8edf2",borderRadius:99,height:4,overflow:"hidden",marginBottom:24}}>
            <div style={{width:`${(done/20)*100}%`,background:"#2B6CB0",height:"100%",borderRadius:99}}/>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:`1px solid ${PCOL[q.p]}33`,borderRadius:99,padding:"4px 14px",marginBottom:18}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:PCOL[q.p]}}/>
            <span style={{fontFamily:SN,fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:PCOL[q.p]}}>{q.p}</span>
          </div>
          <div style={{background:"#fff",borderRadius:12,padding:"20px 24px",marginBottom:20,border:"1px solid #e8edf2"}}>
            <h2 style={{fontSize:"clamp(16px,3vw,20px)",fontWeight:700,margin:"0 0 6px",lineHeight:1.3}}>{q.t}</h2>
            <p style={{fontFamily:SN,fontSize:13,color:"#718096",margin:0,fontStyle:"italic"}}>{q.sub}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {q.a.map((txt,i)=>{
              const sel = ans[cur]===i;
              return (
                <button key={i} onClick={()=>pick(i)} style={{
                  display:"flex",gap:12,alignItems:"flex-start",
                  background:sel?bgC[i]:"#fff",
                  border:`1.5px solid ${sel?bdC[i]:"#e2e8f0"}`,
                  borderRadius:10,padding:"12px 16px",cursor:"pointer",textAlign:"left",outline:"none"
                }}>
                  <span style={{minWidth:26,height:26,borderRadius:"50%",background:sel?lbC[i]:"#f0f4f8",color:sel?"#fff":"#8896a7",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,fontFamily:SN,flexShrink:0}}>
                    {LETTERS[i]}
                  </span>
                  <span style={{fontSize:13,lineHeight:1.65,color:"#2d3748",fontFamily:SN}}>{txt}</span>
                </button>
              );
            })}
          </div>
          <div style={{display:"flex",gap:10,marginTop:20}}>
            {cur>0 && <button onClick={()=>setCur(c=>c-1)} style={{background:"none",border:"1px solid #e2e8f0",borderRadius:8,padding:"9px 18px",fontSize:13,fontFamily:SN,cursor:"pointer",color:"#718096"}}>Back</button>}
            {ans[cur]!==null && cur<19 && <button onClick={()=>setCur(c=>c+1)} style={{background:"#1a365d",color:"#fff",border:"none",borderRadius:8,padding:"9px 22px",fontSize:13,fontFamily:SN,fontWeight:600,cursor:"pointer"}}>Next</button>}
            {ans[cur]!==null && cur===19 && <button onClick={()=>generate(ans)} style={{background:"#2B6CB0",color:"#fff",border:"none",borderRadius:8,padding:"9px 24px",fontSize:13,fontFamily:SN,fontWeight:600,cursor:"pointer"}}>Generate Report</button>}
          </div>
        </div>
      </div>
    );
  }

  // LOADING
  if (step==="loading") return (
    <div style={{...BASE,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{width:40,height:40,border:"3px solid #e2e8f0",borderTopColor:"#2B6CB0",borderRadius:"50%",margin:"0 auto 20px",animation:"spin 0.8s linear infinite"}}/>
        <p style={{color:"#8896a7",fontFamily:SN,fontSize:14}}>Analyzing your program...</p>
      </div>
    </div>
  );

  // REPORT
  if (!sc) return null;
  const st = stage(sc.overall);
  const narrativeSecs = parseReport(narrative);
  const loading = loadingNarrative || loadingFocus;

  return (
    <div style={{...BASE,padding:"40px 20px"}} ref={topRef}>
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <div style={{fontFamily:SN,fontSize:10,letterSpacing:4,color:"#8896a7",textTransform:"uppercase",marginBottom:24}}>Growth Systems - Diagnostic Report</div>

        {/* Score panel */}
        <div style={{background:"#fff",border:"1px solid #e8edf2",borderRadius:16,padding:"28px 32px",marginBottom:20}}>
          <div style={{display:"flex",gap:28,alignItems:"center",flexWrap:"wrap",marginBottom:24}}>
            <Ring s={sc.overall} st={st} size={110}/>
            <div>
              <div style={{fontFamily:SN,fontSize:10,letterSpacing:3,color:"#8896a7",textTransform:"uppercase",marginBottom:6}}>Overall Maturity Score</div>
              <div style={{fontSize:28,fontWeight:700,color:st.color,lineHeight:1,marginBottom:4}}>{st.label}</div>
              <div style={{fontFamily:SN,fontSize:13,color:"#8896a7"}}>{sc.overall} out of 100</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid #f0f4f8",paddingTop:20}}>
            <div style={{fontFamily:SN,fontSize:10,letterSpacing:3,color:"#8896a7",textTransform:"uppercase",marginBottom:14}}>Scores by Dimension</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {PILLARS.map(p=>{
                const ps=sc.pillar[p], pst=stage(ps);
                return (
                  <div key={p}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontFamily:SN,fontSize:12,color:"#2d3748",fontWeight:600}}>{p}</span>
                      <span style={{fontFamily:SN,fontSize:12,fontWeight:700,color:pst.color}}>{ps} <span style={{color:"#b0bac6",fontWeight:400}}>- {pst.label}</span></span>
                    </div>
                    <Bar v={ps} color={PCOL[p]} h={5}/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* All 20 scores */}
        <div style={{background:"#fff",border:"1px solid #e8edf2",borderRadius:16,padding:"24px 28px",marginBottom:20}}>
          <div style={{fontFamily:SN,fontSize:10,letterSpacing:3,color:"#8896a7",textTransform:"uppercase",marginBottom:18}}>All 20 Characteristic Scores</div>
          {PILLARS.map(pil=>{
            const qs = Q.map((q,i)=>({...q,i,qs:sc.perQ[i]})).filter(q=>q.p===pil);
            return (
              <div key={pil} style={{marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:PCOL[pil]}}/>
                  <span style={{fontFamily:SN,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:PCOL[pil]}}>{pil}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {qs.map(({n,t,i,qs:qsc})=>{
                    const isFocus = fi.includes(i);
                    const qst = stage(qsc);
                    const focusRank = fi.indexOf(i);
                    const focusText = focusRecs[focusRank];
                    const focusParsed = focusText ? parseReport(focusText) : null;
                    return (
                      <div key={n} style={{borderRadius:7,background:isFocus?"#FFF9E6":"#f8fafc",border:`1px solid ${isFocus?"#F6AD55":"#f0f4f8"}`,overflow:"hidden"}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px"}}>
                          <div style={{minWidth:16,textAlign:"center",fontSize:11,color:"#D69E2E"}}>{isFocus?"★":""}</div>
                          <div style={{fontFamily:SN,fontSize:11,fontWeight:700,color:"#8896a7",minWidth:24}}>Q{n}</div>
                          <div style={{flex:1,fontFamily:SN,fontSize:12,color:"#2d3748",fontWeight:isFocus?600:400}}>{t}</div>
                          <div style={{fontFamily:SN,fontSize:12,fontWeight:700,color:qst.color,minWidth:20,textAlign:"center"}}>{LETTERS[ans[i]]}</div>
                          <div style={{width:56,background:"#e8edf2",borderRadius:99,height:4,overflow:"hidden",flexShrink:0}}>
                            <div style={{width:`${qsc}%`,background:qst.color,height:"100%",borderRadius:99}}/>
                          </div>
                          <div style={{fontFamily:SN,fontSize:11,fontWeight:700,color:qst.color,minWidth:28,textAlign:"right"}}>{qsc}</div>
                        </div>
                        {isFocus && (
                          <div style={{borderTop:"1px solid #F6E05E",padding:"12px 14px 14px 40px",background:"#FFFEF5"}}>
                            <div style={{fontFamily:SN,fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"#B7791F",marginBottom:6}}>What to focus on</div>
                            {FOCUS_RECS[n] && <p style={{fontFamily:"Georgia,serif",fontSize:13,lineHeight:1.8,color:"#4a3f20",margin:0}}>{FOCUS_RECS[n]}</p>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:10,paddingTop:10,borderTop:"1px solid #f0f4f8"}}>
            <span style={{fontSize:12,color:"#D69E2E"}}>★</span>
            <span style={{fontFamily:SN,fontSize:11,color:"#8896a7"}}>Starred rows are your priority focus areas - detailed AI recommendations below</span>
          </div>
        </div>

        {/* Narrative sections (Call 1) */}
        {loadingNarrative && narrativeSecs.length===0 && (
          <div style={{background:"#fff",border:"1px solid #e8edf2",borderRadius:16,padding:32,fontFamily:SN,fontSize:14,color:"#8896a7"}}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:18,height:18,border:"2px solid #e2e8f0",borderTopColor:"#2B6CB0",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
              Generating your diagnostic report...
            </div>
          </div>
        )}
        {narrativeSecs.map((sec,si)=>{
          const isLastSec = si === narrativeSecs.length - 1;
          const isCTA = sec.h.toLowerCase().includes("deeper");
          const isPattern = sec.h.toLowerCase().includes("pattern")||sec.h.toLowerCase().includes("reveals");
          return (
            <div key={si} style={{
              background:isCTA?"#1a365d":"#fff",
              border:`1px solid ${isCTA?"#2c5282":isPattern?"#BEE3F8":"#e8edf2"}`,
              borderLeft:isPattern?"4px solid #2B6CB0":undefined,
              borderRadius:16,padding:"26px 30px",marginBottom:16
            }}>
              <h2 style={{fontFamily:SN,fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 14px",color:isCTA?"#90cdf4":isPattern?"#2B6CB0":"#1a202c"}}>
                {sec.h}
              </h2>
              {sec.body.map((p,pi)=>(
                <p key={pi} style={{fontSize:15,lineHeight:1.85,color:isCTA?"#e2e8f0":"#2d3748",margin:"0 0 10px",fontFamily:"Georgia,serif"}}>{p}</p>
              ))}
              {loadingNarrative && isLastSec && (
                <span style={{display:"inline-block",width:2,height:"1em",background:"#2B6CB0",marginLeft:2,verticalAlign:"text-bottom",animation:"blink 1s step-end infinite"}}/>
              )}
              <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
            </div>
          );
        })}

        {/* Focus area recommendations (Call 2 loop) */}
        {(loadingFocus || focusRecs.length > 0) && (
          <div style={{background:"#fff",border:"1px solid #e8edf2",borderRadius:16,padding:"26px 30px",marginBottom:16}}>
            <h2 style={{fontFamily:SN,fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 20px",color:"#1a202c"}}>
              Your Priority Focus Areas
            </h2>
            {fi.map((qIdx, k)=>{
              const q = Q[qIdx];
              const recText = focusRecs[k] || "";
              const isCurrentlyLoading = loadingFocusIdx === k;
              const parsed = parseReport(recText);
              const sub = parsed.length > 0 ? parsed[0] : null;
              const bodyLines = sub ? sub.body : recText.split("\n").filter(l=>l.trim() && !l.startsWith("###"));
              return (
                <div key={qIdx} style={{marginBottom: k < fi.length-1 ? 24 : 0, paddingBottom: k < fi.length-1 ? 24 : 0, borderBottom: k < fi.length-1 ? "1px solid #f0f4f8" : "none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{background:"#1a365d",color:"#fff",fontFamily:SN,fontSize:11,fontWeight:700,borderRadius:99,padding:"3px 10px",flexShrink:0}}>Q{q.n}</div>
                    <h3 style={{fontFamily:SN,fontSize:14,fontWeight:700,margin:0,color:"#1a365d"}}>{q.t}</h3>
                  </div>
                  <div style={{fontFamily:SN,fontSize:11,color:"#8896a7",marginBottom:10,fontStyle:"italic"}}>
                    Your answer: "{q.a[ans[qIdx]]}"
                  </div>
                  {isCurrentlyLoading && bodyLines.length === 0 && (
                    <div style={{display:"flex",alignItems:"center",gap:10,color:"#8896a7",fontFamily:SN,fontSize:13}}>
                      <div style={{width:14,height:14,border:"2px solid #e2e8f0",borderTopColor:"#2B6CB0",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
                      Analyzing...
                    </div>
                  )}
                  <div style={{borderLeft:"3px solid #BEE3F8",paddingLeft:16}}>
                    {bodyLines.map((line,li)=>(
                      <p key={li} style={{fontFamily:"Georgia,serif",fontSize:14,lineHeight:1.8,color:"#2d3748",margin:"0 0 8px"}}>{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Final CTA */}
        {!loading && narrative.length > 0 && (
          <>
            <div style={{background:"#1a365d",border:"1px solid #2c5282",borderRadius:16,padding:"36px 32px",marginBottom:16}}>
              <div style={{fontFamily:SN,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#90cdf4",marginBottom:16}}>Ready to Go Deeper?</div>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(20px,3vw,26px)",fontWeight:700,lineHeight:1.3,color:"#fff",margin:"0 0 16px"}}>
                Your scores tell part of the story. The rest takes a real conversation.
              </h2>
              <p style={{fontFamily:"Georgia,serif",fontSize:15,lineHeight:1.85,color:"#e2e8f0",margin:"0 0 12px"}}>
                A 20-question assessment surfaces signals. It cannot show you the root causes beneath your gaps, the specific organizational dynamics at play, or the sequenced 90-day plan that would actually move your program forward.
              </p>
              <p style={{fontFamily:"Georgia,serif",fontSize:15,lineHeight:1.85,color:"#e2e8f0",margin:"0 0 24px"}}>
                Thirty minutes. You bring your context, the history, the constraints, the politics. I bring 20 years of building and diagnosing programs like yours. No slides. No pitch. Just an honest conversation about your program and where it goes from here.
              </p>
              <button onClick={() => window.open("https://calendly.com/jason-haddock-hbej/30min", "_blank")} style={{background:"#2B6CB0",color:"#fff",border:"none",borderRadius:8,padding:"14px 28px",fontSize:15,fontFamily:SN,fontWeight:600,cursor:"pointer"}}>
                Let's Talk About Your Program
              </button>
            </div>
            <div style={{textAlign:"center",padding:"20px 0 48px"}}>
              <button onClick={restart} style={{background:"none",border:"1px solid #e2e8f0",borderRadius:8,padding:"11px 22px",fontSize:13,fontFamily:SN,cursor:"pointer",color:"#8896a7"}}>
                Retake Assessment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
