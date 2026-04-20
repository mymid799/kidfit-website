# AI Magic Story: Visual Style Definitions

This document is the **Single Source of Truth** for how all images should look in the AI Magic Story system. 

## 1. The Aesthetic Goal: Magical, Vibrant & Safe
For a kindergarten audience, the visual style must evoke wonder and magic. We previously considered "Pixar 3D", but 3D renders of children's drawings often fall into the uncanny valley, looking bizarre or heavily distorted. 

Instead, our aesthetic target is the **"Magical Watercolor Storybook"**—heavily inspired by the lush, vibrant, and breathtaking art of **Studio Ghibli** (like *My Neighbor Totoro* or *Ponyo*).

## 2. The Copyright Challenge & Solution
Using the terms `Studio Ghibli` or `Hayao Miyazaki` directly in an AI prompt for a commercial/educational app carries significant copyright and brand-safety risks. 

**The Solution? Deconstructed Prompting.**
We do not use trademarked names. Instead, we instruct the AI (FLUX) to recreate the *techniques* that make Ghibli look magical. We ask for:
*   Lush, hand-painted watercolor backgrounds.
*   Cel-shaded, soft 2D characters.
*   Incredibly vibrant nature (bright greens, deep blues).
*   Fluffy, massive cumulus clouds.

This achieves the exact same breathtaking, magical Ghibli feel, but it is 100% legally safe and unique to Trạng Nguyên Kids.

---

## 3. The Core Visual Shell
This is the only style that will be used across the app. It is highly forgiving of a child's wobbly drawing while generating stunning backdrops.

**The Base Prompt Shell:**
> `whimsical 2D anime background art, lush vibrant watercolor painting, cel-shaded smooth characters, magical realism, highly detailed foliage, soft warm glowing light, fluffy clouds, storybook illustration, breathtaking and cute, --no 3d, realistic, photorealistic, harsh shadows, scary, dark, gritty`

---

## 4. How to Construct the Final API Prompt

The backend should construct the prompt by strictly combining three elements, avoiding any repetition:

`[THE BASE STYLE SHELL] + [THE BIOME ELEMENTS] + [THE FOREGROUND ACTION/CHARACTER]`

### Example Composition:
*   **Base Style:** `whimsical 2D anime background art, lush vibrant watercolor painting, cel-shaded...`
*   **Biome Elements:** `lush Whispering Forest, giant glowing mushrooms, dappled sunlight falling through trees...`
*   **Foreground:** `a cute scruffy dog talking to a tiny white rabbit.`

## 5. Visual Absolute Bans (Negative Prompts)
FLUX *must* be instructed to never generate the following:
*   `photorealistic, hyper-realistic, 8k resolution, cinematic lighting, dramatic shadows` (These destroy the 2D watercolor illusion).
*   `3D render, octane render, plastic` (These cause the "uncanny valley" effect with kids' drawings).
*   `text, watermarks, fonts, signatures` (AI is bad at spelling, it distracts kids).
*   `creepy, deformed, scary, dark, muted colors`.
