That is an incredibly sharp observation. You are thinking exactly like a Lead Product Manager right now. If both features just say "Hey, you drew a bad dog, here is how to fix it," they absolutely conflict. They would cannibalize each other, and it would confuse both the child and the parent.

We must rigidly separate their educational purposes so they complement each other instead of competing. We need to target two entirely different sides of the child's brain.

Here is how we perfectly separate them so there is zero overlap:

1. Drawing Explorer 3D: "The Scientist" (Focus: Science & Observation)
The Goal: Teaching Nouns, Anatomy, and Structure in Isolation.
The Vibe: Like examining a bug under a microscope or viewing a museum exhibit.
What it does NOT do: It does not care about what the animal is doing, where it lives, or how it feels.
The Interaction: It is purely structural. "This is a Cat. Touch the Whiskers (Râu). Touch the Paws (Chân)."
The Feedback Loop: It teaches them to observe the physical world in 3D space. If they missed drawing the whiskers, the lesson is purely anatomical.
2. AI Magic Story: "The Director" (Focus: Literacy, Logic & Emotion)
The Goal: Teaching Verbs, Context, Cause & Effect, and Sequencing.
The Vibe: Like sitting around a campfire telling a tale or watching a movie.
What it does NOT do: It does not critique the physical drawing. Even if the child draws a messy blob and calls it a Dog, the Magic Story accepts it perfectly. It doesn't say "You forgot the dog's legs."
The Interaction: It is purely contextual. The AI takes their "Dog" and places it in a world. The AI asks: "Trời đang râm mát, chú Chó của con đang đi đâu thế?" (It's a cloudy day, where is your dog going?). The child has to draw a "Park" or a "House". Then the AI asks: "Chú chó cảm thấy thế nào?" (How does the dog feel?).
The Feedback Loop: It teaches narrative logic (Beginning $\rightarrow$ Middle $\rightarrow$ End) and Emotional Intelligence (EQ). The child learns that actions have consequences and characters have feelings.
The Perfect Synergy (Why Parents Will Love This)
By strictly separating them, they become a complete educational journey:

Morning Activity (Left Brain): The child draws a bird. They use the 3D Explorer to learn that a bird has Feathers, a Beak, and Wings (Vocabulary & Biology).
Afternoon Activity (Right Brain): The child uses the Magic Story to decide that their bird is flying to the moon because it wants to eat cheese (Creativity, Verbs, & Logic).


Notice!!

Please when designing the frontend, follow the theme already set, look at the other pages to understand the design system, colors, fonts, and overall style. Do not create a new design system.

The current structure architecture is quite messy and not correct. Should follow by
The controller, service will be done in the pages/routes then it just route to the actual work that is in src/features folder, that where you put most of the important work in, the frontend will be done in the pages/ itself.
You can look at the current AR or AI Magic Story flow to understand the structure.

✅ Frontend page: AIStoryPage.tsx with navbar, hero, and AIStoryboardTab component
✅ Feature layer: src/features/storyboard/ with types, hooks, services, and components (StoryboardUpload, StoryboardPlayer)
✅ Backend route: storyboardRoutes.ts with Gemini story generation + image generation
✅ Demo data: 5 demo scene images at public/assets/story-ai/demo/
✅ Route in App.tsx: /ai-story already registered