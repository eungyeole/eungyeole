# Repository guidance

## Sandbox article voice

Apply these rules whenever creating or editing `src/sandboxes/**/*.mdx` or legacy content in `src/articles/**/*.mdx`.

- Use the teaching voice established by `mona-lisa-effect.mdx` as the default.
- Put the real result or an interactive demo before the implementation details.
- Teach one observable problem at a time. Prefer this sequence: observation → smallest useful model → short code → interactive example → judgment or tradeoff.
- Explain what each value changes on screen. Invite the reader to move, type, or tune something when a demo can make the idea tangible.
- Build explanations from first principles with short, declarative Korean sentences. Keep headings concrete and descriptive.
- Prefer real product output over a recreated mock when the product can be embedded safely.
- Remove marketing copy, decorative setup, and generic retrospective language.
- Leave out framework-specific optimization and incidental implementation details unless the concept depends on them.
- Do not foreground arbitrary coordinate corrections, offsets, or other implementation artifacts. Describe the underlying visual rule instead.
- Preserve accessibility, legacy URLs, and product truth without interrupting the main teaching flow.
- Do not reveal the location of an easter egg; invite the reader to find it.
