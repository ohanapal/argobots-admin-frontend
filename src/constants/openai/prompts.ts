export const threadSummaryPrompt = messagesTogether => {
  return `Analyze the provided messages from a user's conversation with their AI agent to extract key insights.

Extract relevant information to help understand the interaction, assess the quality, and identify possible improvements for a better user experience.

${messagesTogether}

# Steps

1. *Identify Key Points*: Summarize the main topics and specific subjects mentioned in the chat.
2. *Extract Action Items*: Note down any tasks or follow-ups derived from the conversation for the AI agent or the user.
3. *Analyze Sentiment*: Evaluate the tone of the conversation, whether it is positive, neutral, or negative, and provide reasoning.
4. *Assess Usefulness*: Rate the usefulness of the conversation on a scale of 1-10, and explain the reasoning including level of clarity, efficacy, and information provided.
5. *Evaluate Outcome*: Determine if the user was able to achieve their desired objective, stating whether the outcome was successful or not.
6. *Customer Service Insights*: Provide additional details that could help improve future responses, user satisfaction, or tailor the service experience.

# Output Format

Provide the results in a text-based report with the following structure:

- *Key Points*: [Concise highlights from the conversation].
- *Action Items*: [List of tasks or follow-ups derived from the interaction].
- *Sentiment*: 
  - *Type*: [positive/neutral/negative].
  - *Reasoning*: [Reason for the given sentiment evaluation].
- *Usefulness Rating*: 
  - *Score*: [Number from 1 to 10].
  - *Reasoning*: [Explanation regarding why this score was provided].
- *Outcome*: 
  - *Achieved*: [true/false].
  - *Reasoning*: [An explanation about whether or not the objective was achieved].
- *Customer Service Insights*: [Additional ways to improve the response or experience].

# Examples

*Example 1 Input*:

User: Can you help me organize my schedule for next week?  
AI: Absolutely! Do you have any specific tasks or events coming up that need to be prioritized?  
User: I have a meeting on Wednesday and a deadline on Friday. Rest is just routine work.  
AI: Noted. Let's set your priority for the meeting first, then meet the deadline on Friday. I'll help you add those to your calendar.

*Example 1 Output*:

- *Key Points*: The user wanted to organize their schedule for the upcoming week and provided details about a meeting and a deadline.
- *Action Items*: Add meeting on Wednesday and deadline on Friday to the calendar.
- *Sentiment*: 
  - *Type*: Positive.
  - *Reasoning*: The interaction was productive and the user openly shared information while the AI provided supportive responses.
- *Usefulness Rating*: 
  - *Score*: 9.
  - *Reasoning*: The conversation was highly specific to the user's needs and resulted in actionable items with clear follow-up.
- *Outcome*: 
  - *Achieved*: True.
  - *Reasoning*: The AI successfully helped organize the user's schedule with specific tasks being noted.
- *Customer Service Insights*: Ensure the AI offers to automatically add items to calendars for convenience and suggests potential time slots.

# Notes

- Always summarize the key points concisely.
- Sentiment analysis requires both classification (positive/neutral/negative) and reasoning.
- The 'usefulness' rating should be rational with an explanation behind the score.
- Return the response in html format like this <ul><li><strong>Key Points</strong>: [Concise highlights from the conversation].</li>... ... ...</ul>. and don't start and end with backticks.
`
}
