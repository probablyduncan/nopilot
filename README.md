here is my basic structure here:
I have a variety of md files - each one is a response that can be randomly returned.
if `suggested` is set, response can be included as a suggested prompt
if `random` is set, response can be randomly returned

submitting a prompt or suggestion sets a question bubble (your prompt) and a spinner starts spinning
requests return html and a key to mark this response as visited/seen


### (feature) prompt bubble

- on submitting a prompt, should show a bubble in top right with the prompt the user entered
- or the suggested input, if this is a suggested prompt

### (feature) markdown tokens

- need to support variables in markdown
- {0} represents something from the prompt (or just the prompt)
- {pause} represents a spinner that waits before displaying more of the response
- maybe {region} or {date} if there's a use case?


### (feature) saving seen prompts

- need to store a list in localstorage of all visited keys
- need to prioritize unseen keys when picking a random one
- need to show when a suggested item has been selected before
- (and maybe also prioritize unselected suggestions)
- need a way to see all possible responses, like an achievements list