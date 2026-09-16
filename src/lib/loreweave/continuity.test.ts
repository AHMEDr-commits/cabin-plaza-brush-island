import assert from "node:assert/strict";
import test from "node:test";
import { scanContinuity } from "./continuity.ts";
import type { CharacterProfile, TimelineEvent } from "./types.ts";

function char(over: Partial<CharacterProfile>): CharacterProfile {
  return {
    id: "c",
    name: "Mara Keel",
    aliases: [],
    age: "29",
    appearance: "black hair",
    personality: "",
    goals: "",
    fears: "",
    strengths: "",
    weaknesses: "",
    abilities: "cannot cast",
    relationships: "",
    speechPatterns: "",
    importantEvents: "",
    arc: "",
    knownFacts: [],
    secrets: [],
    currentStatus: "dead",
    voiceNotes: "",
    createdAt: "",
    updatedAt: "",
    locked: false,
    ...over,
  };
}

test("flags a dead character treated as alive", () => {
  const issues = scanContinuity({
    text: "Mara Keel laughed and breathed the salt air.",
    characters: [char({})],
    world: [],
    timeline: [],
  });
  assert.equal(issues.some((i) => i.severity === "high"), true);
});

test("flags timeline resurrection without flashback", () => {
  const timeline: TimelineEvent[] = [
    {
      id: "1",
      chapter: "1",
      position: 1,
      characters: ["Mara Keel"],
      location: "Pier",
      description: "Mara Keel died in the fog.",
      consequences: "",
    },
    {
      id: "2",
      chapter: "2",
      position: 2,
      characters: ["Mara Keel"],
      location: "Pier",
      description: "Mara Keel survived and laughed.",
      consequences: "",
    },
  ];
  const issues = scanContinuity({
    text: "later",
    characters: [char({ currentStatus: "Alive" })],
    world: [],
    timeline,
  });
  assert.equal(issues.some((i) => i.issue.includes("Timeline")), true);
});
