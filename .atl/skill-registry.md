# Skill Registry — website (oliver_kilby)

Generated: 2026-04-19

## User Skills

| Skill | Trigger |
|-------|---------|
| `branch-pr` | Creating a PR, opening a pull request, preparing changes for review |
| `issue-creation` | Creating a GitHub issue, reporting a bug, requesting a feature |
| `judgment-day` | "judgment day", "dual review", "adversarial review", "juzgar" |
| `skill-creator` | Creating a new skill, adding agent instructions |
| `skill-registry` | "update skills", "skill registry", "actualizar skills" |
| `go-testing` | Go tests, Bubbletea TUI testing (not applicable to this project) |

## SDD Skills (auto-invoked by orchestrator)

`sdd-explore` · `sdd-propose` · `sdd-spec` · `sdd-design` · `sdd-tasks` · `sdd-apply` · `sdd-verify` · `sdd-archive`

## Project Conventions

No project-level CLAUDE.md, AGENTS.md, or .cursorrules detected.

## Compact Rules

### branch-pr
- Follow issue-first enforcement: issue must exist before opening PR
- PR title: short (<70 chars), body: Summary + Test Plan sections

### issue-creation
- Issue-first: create issue before any PR for this project
- Include reproduction steps for bugs, acceptance criteria for features

### judgment-day
- Launch two independent blind judge sub-agents simultaneously
- Synthesize findings, apply fixes, re-judge until both pass or escalate after 2 iterations

### General (from global CLAUDE.md)
- Never add "Co-Authored-By" or AI attribution to commits
- Never use cat/grep/find/sed/ls — use bat/rg/fd/sd/eza
- Conventional commits only
- Never build after changes
- When asking a question: STOP and wait — never continue or assume answers
- Verify technical claims before stating them
