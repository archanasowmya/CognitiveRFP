import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_MEMORIES, DEFAULT_GUARDRAILS } from './default-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MEMORIES_FILE = path.join(DATA_DIR, 'memories.json');
const GUARDRAILS_FILE = path.join(DATA_DIR, 'guardrails.json');
const PROPOSALS_FILE = path.join(DATA_DIR, 'proposals.json');

function readJsonFile(filePath, fallbackData) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
  }
  // Initialize with fallback
  writeJsonFile(filePath, fallbackData);
  return fallbackData;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
    return false;
  }
}

export class MemoryStore {
  static getMemories() {
    return readJsonFile(MEMORIES_FILE, DEFAULT_MEMORIES);
  }

  static saveMemories(memories) {
    return writeJsonFile(MEMORIES_FILE, memories);
  }

  static addMemory(memory) {
    const memories = this.getMemories();
    const newMemory = {
      id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      impactScore: Math.floor(Math.random() * 15) + 85, // 85-99
      ...memory
    };
    memories.unshift(newMemory);
    this.saveMemories(memories);
    return newMemory;
  }

  static deleteMemory(id) {
    const memories = this.getMemories();
    const filtered = memories.filter(m => m.id !== id);
    this.saveMemories(filtered);
    return filtered;
  }

  static resetMemories() {
    writeJsonFile(MEMORIES_FILE, DEFAULT_MEMORIES);
    return DEFAULT_MEMORIES;
  }

  static getGuardrails() {
    return readJsonFile(GUARDRAILS_FILE, DEFAULT_GUARDRAILS);
  }

  static saveGuardrails(guardrails) {
    return writeJsonFile(GUARDRAILS_FILE, guardrails);
  }

  static addGuardrail(guardrail) {
    const guardrails = this.getGuardrails();
    const newGuardrail = {
      id: `guard-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      ...guardrail
    };
    guardrails.unshift(newGuardrail);
    this.saveGuardrails(guardrails);
    return newGuardrail;
  }

  static toggleGuardrail(id) {
    const guardrails = this.getGuardrails();
    const updated = guardrails.map(g => {
      if (g.id === id) {
        return { ...g, isActive: !g.isActive };
      }
      return g;
    });
    this.saveGuardrails(updated);
    return updated;
  }

  static getProposals() {
    return readJsonFile(PROPOSALS_FILE, []);
  }

  static saveProposal(proposal) {
    const proposals = this.getProposals();
    const item = {
      id: `prop-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...proposal
    };
    proposals.unshift(item);
    writeJsonFile(PROPOSALS_FILE, proposals.slice(0, 50)); // keep last 50
    return item;
  }
}
