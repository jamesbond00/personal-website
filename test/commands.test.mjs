import assert from 'node:assert/strict';
import test from 'node:test';
import { CommandHistory, parseCommand } from '../src/data/commands.mjs';

test('resolves aliases, case and repeated whitespace', () => {
  assert.deepEqual(parseCommand('  LS  Projects/ '), parseCommand('projects'));
  assert.deepEqual(parseCommand('about'), parseCommand('whoami'));
  assert.deepEqual(parseCommand('SKILLS'), parseCommand('stack'));
});

test('handles blank input, clear and unknown commands', () => {
  assert.equal(parseCommand('  '), null);
  assert.deepEqual(parseCommand('clear'), { clear: true });
  for (const input of ['constructor', '<img src=x>', 'whoami && contact']) {
    assert.equal(parseCommand(input).output, 'command not found — try help');
  }
});

test('bounds command history and restores the draft', () => {
  const history = new CommandHistory();
  assert.equal(history.move(-1, 'draft'), 'draft');
  for (let i = 0; i < 51; i += 1) history.add(String(i));
  assert.equal(history.move(-1, 'draft'), '50');
  assert.equal(history.move(1, '50'), 'draft');
  for (let i = 0; i < 55; i += 1) history.move(-1, 'draft');
  assert.equal(history.move(-1, 'draft'), '1');
});
