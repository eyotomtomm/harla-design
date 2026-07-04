import os

base = "/Users/designs/Downloads/Independency day/indochine/indochine-nextjs/src"

def w(rel, content):
    fp = os.path.join(base, rel)
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(fp, "w") as f:
        f.write(content)
    print("Written: " + rel)

w("components/about/AboutStyleTwo.tsx", r"""'use client';
import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'who', label: 'Who We Are', content: 'Indochine has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.', content2: 'Indochine has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere.' },
