const commands = new Map([
  ['help', { output: 'whoami   Profile\nexperience   Trading engineering\nprojects   Project list\ntraderlab   Featured project\nstack   Technical stack\ncontact   Contact links\nclear   Clear this transcript\n\nUse ↑ and ↓ to recall commands.' }],
  ['whoami', { target: 'whoami', output: 'Alexander Khundoev · Electronic Trading Engineer · London, UK' }],
  ['experience', { target: 'experience', output: 'Opening experience.' }],
  ['projects', { target: 'projects', output: 'TraderLab' }],
  ['traderlab', { target: 'traderlab', output: 'TraderLab · Experimental trading systems lab' }],
  ['stack', { target: 'stack', output: 'Opening technical stack.' }],
  ['contact', { target: 'contact', output: 'Opening contact.' }],
  ['clear', { clear: true }],
  ['uname -a', { output: 'PortfolioOS 1.0 · fictional system info' }],
  ['sudo hire alex', { output: 'Request queued. Try contact to follow up.' }],
]);

const aliases = new Map([
  ['about', 'whoami'], ['cat about.txt', 'whoami'], ['ls projects/', 'projects'],
  ['ls -la projects/', 'projects'], ['skills', 'stack'],
]);

export function parseCommand(input) {
  const key = input.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!key) return null;
  return commands.get(aliases.get(key) ?? key) ?? { output: 'command not found — try help' };
}

export class CommandHistory {
  #items = [];
  #index = 0;
  #draft = '';

  add(command) {
    this.#items.push(command);
    if (this.#items.length > 50) this.#items.shift();
    this.#index = this.#items.length;
    this.#draft = '';
  }

  move(step, current) {
    if (this.#index === this.#items.length) this.#draft = current;
    this.#index = Math.max(0, Math.min(this.#items.length, this.#index + step));
    return this.#items[this.#index] ?? this.#draft;
  }
}
