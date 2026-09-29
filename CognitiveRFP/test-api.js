async function test() {
  const payload = {
    requirement: "Describe your service level agreements (SLAs), guaranteed uptime availability percentages, definition of service downtime, scheduled maintenance windows, and the financial remedies or service credits offered in the event of an unscheduled breach. Detail your Disaster Recovery (DR) architecture, including RPO and RTO commitments, multi-region failover protocols, and recent audit certifications.",
    industry: "FinTech & Investment Banking",
    client: "Morgan Stanley Digital",
    opportunitySize: "$2.4M"
  };

  console.log("Calling /api/generate/adaptive...");
  const res = await fetch("http://localhost:3001/api/generate/adaptive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Recalled Memories Count:", data.recalledMemories?.length);
  console.log("Pipeline Trace:", data.pipelineTrace);
  console.log("Strategic Summary:", data.reflection?.strategicSummary);
  console.log("Top Recalled Memory:", data.recalledMemories?.[0]?.title, "Score:", data.recalledMemories?.[0]?.relevanceScore);
  console.log("Baseline Risks:", data.baseline?.risks);
  console.log("Adaptive Diff Highlights:", data.adaptive?.diffHighlights);
}

test().catch(console.error);
