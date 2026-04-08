---
name: semrush-eeat-basecamp
description: analyze semrush ai visibility, site audit, competitor, prompt, brand performance, perception, narrative, question, and related report exports or pasted report content, then turn the findings into a prioritised markdown action plan and basecamp to-do list. use when a user wants semrush findings converted into concrete llm visibility or e-e-a-t improvement tasks grouped into quick wins, content, trust, authority, and technical work, especially when the tasks should also be published into basecamp automatically.
---

# Semrush E-E-A-T Basecamp

Use this skill to turn SEMrush report inputs into an action plan that a small agency can execute immediately.

## Workflow

1. Gather the report inputs.
2. Normalise the inputs with `scripts/inspect_reports.py` when files are provided.
3. Read the client context before making recommendations.
4. Convert findings into a prioritised action plan using the template in `references/action-plan-template.md`.
5. Convert the plan into Basecamp tasks using the publishing rules below.
6. Publish to Basecamp automatically unless the user explicitly asks for draft-only output.

## Supported inputs

Accept any combination of these:
- CSV, TSV, JSON, TXT, or Markdown exports from SEMrush
- pasted report tables or summaries
- folders containing multiple SEMrush exports
- client context files such as `_context/brand.md`, `_context/audience.md`, `_context/goals.md`, or equivalent

Treat the following report families as valid sources even if column names vary:
- ai analysis
- visibility overview
- competitor research
- prompt research
- brand performance
- perception
- narrative drivers
- questions
- growth actions
- site audit
- prompt tracking

If the user mentions a SEMrush API key, assume it may be available through environment variables or local scripts, but do not block the workflow on API access. Prefer analysing the supplied exports first.

## Required behaviour

Always do the following before publishing anything:
- identify which report types were supplied
- state the strongest 3 to 7 findings in plain language
- map each finding to one or more categories: quick wins, content, trust, authority, technical
- turn every recommendation into a concrete task with an owner suggestion, a deliverable, and a reason
- remove vague advice such as "improve content" unless it is rewritten as a specific task

Always tailor recommendations to llm visibility and e-e-a-t signals, including:
- entity clarity and topic coverage
- named experts, bios, credentials, and review processes
- case studies, proof, citations, and first-hand evidence
- brand consistency across pages and supporting content
- internal linking and topic clusters
- crawlability, indexability, structured content, and page quality issues
- off-site authority, mentions, and reference-worthy assets

## Client-context rules

Before writing tasks, inspect any available client context files. Prioritise these if present:
- `_context/brand.*`
- `_context/audience.*`
- `_context/goals.*`
- `_context/offers.*`
- `_context/notes.*`

If no client context is provided, proceed but note the missing context in the summary and avoid over-specific brand claims.

## File inspection

When files are available, run:

```bash
python scripts/inspect_reports.py <path>
```

Use the JSON output to quickly understand:
- file names and likely report types
- headers/keys
- row counts
- a small preview of each file

If the user pasted text instead of files, inspect it directly without the script.

## Prioritisation rules

Score recommendations mentally using this order:
1. highest business impact on discoverability, trust, or conversion-supporting evidence
2. lowest implementation friction for quick wins
3. strongest alignment to the supplied SEMrush findings
4. dependencies that unblock other work

For every task, assign one of these priorities:
- now
- next
- later

## Output format

Produce two outputs unless the user asks otherwise:

1. **Markdown action plan** using `references/action-plan-template.md`
2. **Basecamp to-do list content** grouped into:
   - quick wins
   - content
   - trust
   - authority
   - technical

When a category has no meaningful work, omit it instead of padding the output.

## Basecamp publishing

Default behaviour: publish automatically.

When Basecamp access is available, do this:
1. find or confirm the target project
2. create a to-do list named `LLM & E-E-A-T Improvements`
3. create grouped to-dos beneath that list using the category prefixes below
4. keep each to-do title under about 90 characters
5. put the why, deliverable, and any source evidence in the notes/body

Use these title prefixes:
- `[Quick win]`
- `[Content]`
- `[Trust]`
- `[Authority]`
- `[Technical]`

If a matching to-do list already exists, append only clearly new tasks and avoid duplicates.

If Basecamp access is unavailable, still produce the publish-ready task list in markdown.

## Publishing safeguards

Before creating live tasks:
- deduplicate near-identical items
- merge tiny sub-tasks into one outcome-based task when sensible
- keep the list actionable for a small agency team
- prefer 8 to 20 strong tasks over an exhaustive brain dump

## Example user requests

- "Analyse this SEMrush visibility overview and turn it into Basecamp tasks."
- "Use these AI Visibility exports to create an llm visibility action plan."
- "Review this site audit and competitor research, then publish the priorities into Basecamp."
- "Turn these prompt research findings into quick wins, content, trust, authority, and technical tasks."

## Resources

- Use `scripts/inspect_reports.py` to inspect mixed report folders quickly.
- Use `references/action-plan-template.md` for the markdown structure.
- Use `references/report-mapping.md` to map SEMrush report families to llm visibility and e-e-a-t task types.
