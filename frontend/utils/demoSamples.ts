export interface DemoSample {
  id: string;
  label: string;
  text: string;
  language: string;
}

export const demoSamples: DemoSample[] = [
  {
    id: 'low',
    label: 'Low Risk',
    language: 'en',
    text: "I'm just so tired of my job. Everything feels like a chore and I don't see any career growth here. I just want to quit and move to a different city.",
  },
  {
    id: 'medium',
    label: 'Medium Risk',
    language: 'en',
    text: "I've been feeling so worthless lately. It feels like nobody would even notice if I just stopped showing up. The world is a dark place and I don't see any hope for things getting better.",
  },
  {
    id: 'high',
    label: 'High Risk',
    language: 'en',
    text: "I can't take this pain anymore. I have the pills and I'm planning to end it all tonight. There is no other way out for me.",
  },
];
