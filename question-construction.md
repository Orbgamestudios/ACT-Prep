# ACT-Like Reading Question Construction Guide

You are generating unofficial ACT-style reading practice. Do not mention ACT branding in the generated passage set except in neutral labels such as "ACT-like".

## Output Contract

Return only valid JSON matching this shape:

```json
{
  "title": "short passage title",
  "source": "author and public-domain source",
  "passageType": "Literary Narrative | Informational",
  "difficulty": "Medium | Hard",
  "estimatedWords": 650,
  "passage": "the exact excerpt supplied by the app, lightly cleaned only if necessary",
  "questions": [
    {
      "id": 1,
      "category": "Key Ideas & Details | Craft & Structure | Integration of Knowledge & Ideas",
      "skill": "specific skill tested",
      "question": "question text",
      "choices": {
        "A": "choice text",
        "B": "choice text",
        "C": "choice text",
        "D": "choice text"
      },
      "answer": "A",
      "evidence": "short explanation anchored in the passage",
      "rationale": {
        "A": "why correct or incorrect",
        "B": "why correct or incorrect",
        "C": "why correct or incorrect",
        "D": "why correct or incorrect"
      }
    }
  ]
}
```

## Passage Rules

- Use the passage supplied by the app. Do not invent events, names, or claims.
- Preserve the original meaning and order.
- If the passage is literary, focus on narrator/character perspective, relationships, setting, implication, and authorial method.
- If the passage is informational, focus on central claim, organization, evidence, cause/effect, comparison, and author perspective.

## Question Set

Create exactly 9 multiple-choice questions with 4 choices each.

Target mix:

- 4 Key Ideas & Details questions
- 3 Craft & Structure questions
- 2 Integration of Knowledge & Ideas questions

Use a mix of these practical types:

- Main idea or central purpose
- Specific detail
- Inference that stays close to the text
- Vocabulary in context
- Function or purpose of a sentence/paragraph/detail
- Tone, attitude, or point of view
- Relationship between ideas
- Claim/evidence or argument structure

## Correct Answer Rules

- Exactly one answer must be correct.
- The correct answer must be directly supportable from the passage.
- Correct answers should often paraphrase the passage rather than copy exact wording.
- Inference answers should be a small step from textual evidence, not a speculative leap.
- Do not require outside knowledge.
- Do not ask isolated vocabulary questions; every word-meaning question must depend on context.

## Distractor Rules

Each wrong answer should be plausible but clearly eliminable. Use these ACT-like trap patterns:

- Familiar language: copies passage wording but answers the wrong question.
- Distortion: starts with a real detail but changes the meaning.
- True but irrelevant: states something true from the passage that does not answer the question.
- Too broad or too narrow.
- Extreme wording: adds "always", "never", "only", "best", or similar force not supported by the passage.
- Opposite meaning: reverses the passage's logic.
- Concept jumble: combines details from different parts of the passage incorrectly.
- Plausible interpretation: sounds literary or intelligent but lacks evidence.

Avoid joke answers, obviously absurd answers, or choices that are wrong only because of tiny grammar differences.

## Style Rules

- Use concise, formal test language.
- Avoid "Which of the following is NOT/EXCEPT" unless one such question is genuinely useful.
- Do not number lines because the supplied passage has no stable line numbers.
- Do not reveal the answer in the wording of the question.
- Explanations should be brief and useful for study.

